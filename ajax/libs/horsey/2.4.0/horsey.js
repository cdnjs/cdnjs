!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var f;"undefined"!=typeof window?f=window:"undefined"!=typeof global?f=global:"undefined"!=typeof self&&(f=self),f.horsey=e()}}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function (global){
'use strict';

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
  var set = o.set || defaultSetter;
  var form = o.form;
  var suggestions = o.suggestions;
  var filter = o.filter || defaultFilter;
  var ul = tag('ul', 'sey-list');
  var selection = null;
  var oneload = once(loading);
  var eye;
  var deferredFiltering = defer(filtering);
  var attachment = el;
  var textInput;
  var anyInput;

  if (o.autoHideOnBlur === void 0) { o.autoHideOnBlur = true; }
  if (o.autoHideOnClick === void 0) { o.autoHideOnClick = true; }
  if (o.autoShowOnUpDown === void 0) { o.autoShowOnUpDown = el.tagName === 'INPUT'; }

  var api = {
    add: add,
    clear: clear,
    show: show,
    hide: hide,
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
    ul.appendChild(li);
    api.suggestions.push(suggestion);
    return li;

    function clickedSuggestion () {
      set(getValue(suggestion));
      hide();
      attachment.focus();
      crossvent.fabricate(attachment, 'horsey-selected');
    }

    function filterItem () {
      var value = textInput ? el.value : el.innerHTML;
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
      crossvent.fabricate(attachment, 'horsey-show');
    }
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
    if (anyInput) {
      crossvent[op](attachment, 'keypress', deferredShow);
      crossvent[op](attachment, 'keypress', deferredFiltering);
      crossvent[op](attachment, 'keydown', deferredFilteringNoEnter);
      crossvent[op](attachment, 'paste', deferredFiltering);
      crossvent[op](attachment, 'keydown', keydown);
      if (o.autoHideOnBlur) { crossvent[op](docElement, 'focus', hideOnBlur, true); }
    } else {
      crossvent[op](attachment, 'click', toggle);
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
}

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
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImhvcnNleS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG5cbnZhciBjcm9zc3ZlbnQgPSByZXF1aXJlKCdjcm9zc3ZlbnQnKTtcbnZhciBidWxsc2V5ZSA9IHJlcXVpcmUoJ2J1bGxzZXllJyk7XG52YXIgZnV6enlzZWFyY2ggPSByZXF1aXJlKCdmdXp6eXNlYXJjaCcpO1xudmFyIEtFWV9FTlRFUiA9IDEzO1xudmFyIEtFWV9FU0MgPSAyNztcbnZhciBLRVlfVVAgPSAzODtcbnZhciBLRVlfRE9XTiA9IDQwO1xudmFyIGNhY2hlID0gW107XG52YXIgZG9jID0gZG9jdW1lbnQ7XG52YXIgZG9jRWxlbWVudCA9IGRvYy5kb2N1bWVudEVsZW1lbnQ7XG52YXIgd2luID0gZ2xvYmFsO1xuXG5mdW5jdGlvbiBmaW5kIChlbCkge1xuICB2YXIgZW50cnk7XG4gIHZhciBpO1xuICBmb3IgKGkgPSAwOyBpIDwgY2FjaGUubGVuZ3RoOyBpKyspIHtcbiAgICBlbnRyeSA9IGNhY2hlW2ldO1xuICAgIGlmIChlbnRyeS5lbCA9PT0gZWwpIHtcbiAgICAgIHJldHVybiBlbnRyeS5hcGk7XG4gICAgfVxuICB9XG4gIHJldHVybiBudWxsO1xufVxuXG5mdW5jdGlvbiBob3JzZXkgKGVsLCBvcHRpb25zKSB7XG4gIHZhciBjYWNoZWQgPSBmaW5kKGVsKTtcbiAgaWYgKGNhY2hlZCkge1xuICAgIHJldHVybiBjYWNoZWQ7XG4gIH1cblxuICB2YXIgbyA9IG9wdGlvbnMgfHwge307XG4gIHZhciBwYXJlbnQgPSBvLmFwcGVuZFRvIHx8IGRvYy5ib2R5O1xuICB2YXIgcmVuZGVyID0gby5yZW5kZXIgfHwgZGVmYXVsdFJlbmRlcmVyO1xuICB2YXIgZ2V0VGV4dCA9IG8uZ2V0VGV4dCB8fCBkZWZhdWx0R2V0VGV4dDtcbiAgdmFyIGdldFZhbHVlID0gby5nZXRWYWx1ZSB8fCBkZWZhdWx0R2V0VmFsdWU7XG4gIHZhciBnZXRTZWxlY3Rpb24gPSBvLmdldFNlbGVjdGlvbiB8fCB3aW4uZ2V0U2VsZWN0aW9uO1xuICB2YXIgc2V0ID0gby5zZXQgfHwgZGVmYXVsdFNldHRlcjtcbiAgdmFyIGZvcm0gPSBvLmZvcm07XG4gIHZhciBzdWdnZXN0aW9ucyA9IG8uc3VnZ2VzdGlvbnM7XG4gIHZhciBmaWx0ZXIgPSBvLmZpbHRlciB8fCBkZWZhdWx0RmlsdGVyO1xuICB2YXIgdWwgPSB0YWcoJ3VsJywgJ3NleS1saXN0Jyk7XG4gIHZhciBzZWxlY3Rpb24gPSBudWxsO1xuICB2YXIgb25lbG9hZCA9IG9uY2UobG9hZGluZyk7XG4gIHZhciBleWU7XG4gIHZhciBkZWZlcnJlZEZpbHRlcmluZyA9IGRlZmVyKGZpbHRlcmluZyk7XG4gIHZhciBhdHRhY2htZW50ID0gZWw7XG4gIHZhciB0ZXh0SW5wdXQ7XG4gIHZhciBhbnlJbnB1dDtcblxuICBpZiAoby5hdXRvSGlkZU9uQmx1ciA9PT0gdm9pZCAwKSB7IG8uYXV0b0hpZGVPbkJsdXIgPSB0cnVlOyB9XG4gIGlmIChvLmF1dG9IaWRlT25DbGljayA9PT0gdm9pZCAwKSB7IG8uYXV0b0hpZGVPbkNsaWNrID0gdHJ1ZTsgfVxuICBpZiAoby5hdXRvU2hvd09uVXBEb3duID09PSB2b2lkIDApIHsgby5hdXRvU2hvd09uVXBEb3duID0gZWwudGFnTmFtZSA9PT0gJ0lOUFVUJzsgfVxuXG4gIHZhciBhcGkgPSB7XG4gICAgYWRkOiBhZGQsXG4gICAgY2xlYXI6IGNsZWFyLFxuICAgIHNob3c6IHNob3csXG4gICAgaGlkZTogaGlkZSxcbiAgICBkZXN0cm95OiBkZXN0cm95LFxuICAgIHJlZnJlc2hQb3NpdGlvbjogcmVmcmVzaFBvc2l0aW9uLFxuICAgIGRlZmF1bHRSZW5kZXJlcjogZGVmYXVsdFJlbmRlcmVyLFxuICAgIGRlZmF1bHRHZXRUZXh0OiBkZWZhdWx0R2V0VGV4dCxcbiAgICBkZWZhdWx0R2V0VmFsdWU6IGRlZmF1bHRHZXRWYWx1ZSxcbiAgICBkZWZhdWx0U2V0dGVyOiBkZWZhdWx0U2V0dGVyLFxuICAgIGRlZmF1bHRGaWx0ZXI6IGRlZmF1bHRGaWx0ZXIsXG4gICAgcmV0YXJnZXQ6IHJldGFyZ2V0LFxuICAgIGF0dGFjaG1lbnQ6IGF0dGFjaG1lbnQsXG4gICAgbGlzdDogdWwsXG4gICAgc3VnZ2VzdGlvbnM6IFtdXG4gIH07XG4gIHZhciBlbnRyeSA9IHsgZWw6IGVsLCBhcGk6IGFwaSB9O1xuXG4gIHJldGFyZ2V0KGVsKTtcbiAgY2FjaGUucHVzaChlbnRyeSk7XG4gIHBhcmVudC5hcHBlbmRDaGlsZCh1bCk7XG4gIGVsLnNldEF0dHJpYnV0ZSgnYXV0b2NvbXBsZXRlJywgJ29mZicpO1xuXG4gIGlmIChBcnJheS5pc0FycmF5KHN1Z2dlc3Rpb25zKSkge1xuICAgIGxvYWRlZChzdWdnZXN0aW9ucyk7XG4gIH1cblxuICByZXR1cm4gYXBpO1xuXG4gIGZ1bmN0aW9uIHJldGFyZ2V0IChlbCkge1xuICAgIGlucHV0RXZlbnRzKHRydWUpO1xuICAgIGF0dGFjaG1lbnQgPSBhcGkuYXR0YWNobWVudCA9IGVsO1xuICAgIHRleHRJbnB1dCA9IGF0dGFjaG1lbnQudGFnTmFtZSA9PT0gJ0lOUFVUJyB8fCBhdHRhY2htZW50LnRhZ05hbWUgPT09ICdURVhUQVJFQSc7XG4gICAgYW55SW5wdXQgPSB0ZXh0SW5wdXQgfHwgaXNFZGl0YWJsZShhdHRhY2htZW50KTtcbiAgICBpbnB1dEV2ZW50cygpO1xuICB9XG5cbiAgZnVuY3Rpb24gcmVmcmVzaFBvc2l0aW9uICgpIHtcbiAgICBpZiAoZXllKSB7IGV5ZS5yZWZyZXNoKCk7IH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGxvYWRpbmcgKCkge1xuICAgIGNyb3NzdmVudC5yZW1vdmUoYXR0YWNobWVudCwgJ2ZvY3VzJywgb25lbG9hZCk7XG4gICAgc3VnZ2VzdGlvbnMobG9hZGVkKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGxvYWRlZCAoc3VnZ2VzdGlvbnMpIHtcbiAgICBzdWdnZXN0aW9ucy5mb3JFYWNoKGFkZCk7XG4gICAgYXBpLnN1Z2dlc3Rpb25zID0gc3VnZ2VzdGlvbnM7XG4gIH1cblxuICBmdW5jdGlvbiBjbGVhciAoKSB7XG4gICAgd2hpbGUgKHVsLmxhc3RDaGlsZCkge1xuICAgICAgdWwucmVtb3ZlQ2hpbGQodWwubGFzdENoaWxkKTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBhZGQgKHN1Z2dlc3Rpb24pIHtcbiAgICB2YXIgbGkgPSB0YWcoJ2xpJywgJ3NleS1pdGVtJyk7XG4gICAgcmVuZGVyKGxpLCBzdWdnZXN0aW9uKTtcbiAgICBjcm9zc3ZlbnQuYWRkKGxpLCAnY2xpY2snLCBjbGlja2VkU3VnZ2VzdGlvbik7XG4gICAgY3Jvc3N2ZW50LmFkZChsaSwgJ2hvcnNleS1maWx0ZXInLCBmaWx0ZXJJdGVtKTtcbiAgICB1bC5hcHBlbmRDaGlsZChsaSk7XG4gICAgYXBpLnN1Z2dlc3Rpb25zLnB1c2goc3VnZ2VzdGlvbik7XG4gICAgcmV0dXJuIGxpO1xuXG4gICAgZnVuY3Rpb24gY2xpY2tlZFN1Z2dlc3Rpb24gKCkge1xuICAgICAgc2V0KGdldFZhbHVlKHN1Z2dlc3Rpb24pKTtcbiAgICAgIGhpZGUoKTtcbiAgICAgIGF0dGFjaG1lbnQuZm9jdXMoKTtcbiAgICAgIGNyb3NzdmVudC5mYWJyaWNhdGUoYXR0YWNobWVudCwgJ2hvcnNleS1zZWxlY3RlZCcpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGZpbHRlckl0ZW0gKCkge1xuICAgICAgdmFyIHZhbHVlID0gdGV4dElucHV0ID8gZWwudmFsdWUgOiBlbC5pbm5lckhUTUw7XG4gICAgICBpZiAoZmlsdGVyKHZhbHVlLCBzdWdnZXN0aW9uKSkge1xuICAgICAgICBsaS5jbGFzc05hbWUgPSBsaS5jbGFzc05hbWUucmVwbGFjZSgvIHNleS1oaWRlL2csICcnKTtcbiAgICAgIH0gZWxzZSBpZiAoIWhpZGRlbihsaSkpIHtcbiAgICAgICAgbGkuY2xhc3NOYW1lICs9ICcgc2V5LWhpZGUnO1xuICAgICAgICBpZiAoc2VsZWN0aW9uID09PSBsaSkge1xuICAgICAgICAgIHVuc2VsZWN0KCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiB2aXNpYmxlICgpIHtcbiAgICByZXR1cm4gdWwuY2xhc3NOYW1lLmluZGV4T2YoJ3NleS1zaG93JykgIT09IC0xO1xuICB9XG5cbiAgZnVuY3Rpb24gaGlkZGVuIChsaSkge1xuICAgIHJldHVybiBsaS5jbGFzc05hbWUuaW5kZXhPZignc2V5LWhpZGUnKSAhPT0gLTE7XG4gIH1cblxuICBmdW5jdGlvbiBzaG93ICgpIHtcbiAgICBpZiAoIXZpc2libGUoKSkge1xuICAgICAgdWwuY2xhc3NOYW1lICs9ICcgc2V5LXNob3cnO1xuICAgICAgZXllLnJlZnJlc2goKTtcbiAgICAgIGNyb3NzdmVudC5mYWJyaWNhdGUoYXR0YWNobWVudCwgJ2hvcnNleS1zaG93Jyk7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gdG9nZ2xlICgpIHtcbiAgICBpZiAoIXZpc2libGUoKSkge1xuICAgICAgc2hvdygpO1xuICAgIH0gZWxzZSB7XG4gICAgICBoaWRlKCk7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gc2VsZWN0IChzdWdnZXN0aW9uKSB7XG4gICAgdW5zZWxlY3QoKTtcbiAgICBpZiAoc3VnZ2VzdGlvbikge1xuICAgICAgc2VsZWN0aW9uID0gc3VnZ2VzdGlvbjtcbiAgICAgIHNlbGVjdGlvbi5jbGFzc05hbWUgKz0gJyBzZXktc2VsZWN0ZWQnO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHVuc2VsZWN0ICgpIHtcbiAgICBpZiAoc2VsZWN0aW9uKSB7XG4gICAgICBzZWxlY3Rpb24uY2xhc3NOYW1lID0gc2VsZWN0aW9uLmNsYXNzTmFtZS5yZXBsYWNlKC8gc2V5LXNlbGVjdGVkL2csICcnKTtcbiAgICAgIHNlbGVjdGlvbiA9IG51bGw7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gbW92ZSAodXAsIG1vdmVzKSB7XG4gICAgdmFyIHRvdGFsID0gdWwuY2hpbGRyZW4ubGVuZ3RoO1xuICAgIGlmICh0b3RhbCA8IG1vdmVzKSB7XG4gICAgICB1bnNlbGVjdCgpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAodG90YWwgPT09IDApIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdmFyIGZpcnN0ID0gdXAgPyAnbGFzdENoaWxkJyA6ICdmaXJzdENoaWxkJztcbiAgICB2YXIgbmV4dCA9IHVwID8gJ3ByZXZpb3VzU2libGluZycgOiAnbmV4dFNpYmxpbmcnO1xuICAgIHZhciBzdWdnZXN0aW9uID0gc2VsZWN0aW9uICYmIHNlbGVjdGlvbltuZXh0XSB8fCB1bFtmaXJzdF07XG5cbiAgICBzZWxlY3Qoc3VnZ2VzdGlvbik7XG5cbiAgICBpZiAoaGlkZGVuKHN1Z2dlc3Rpb24pKSB7XG4gICAgICBtb3ZlKHVwLCBtb3ZlcyA/IG1vdmVzICsgMSA6IDEpO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGhpZGUgKCkge1xuICAgIGV5ZS5zbGVlcCgpO1xuICAgIHVsLmNsYXNzTmFtZSA9IHVsLmNsYXNzTmFtZS5yZXBsYWNlKC8gc2V5LXNob3cvZywgJycpO1xuICAgIHVuc2VsZWN0KCk7XG4gICAgY3Jvc3N2ZW50LmZhYnJpY2F0ZShhdHRhY2htZW50LCAnaG9yc2V5LWhpZGUnKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGtleWRvd24gKGUpIHtcbiAgICB2YXIgc2hvd24gPSB2aXNpYmxlKCk7XG4gICAgdmFyIHdoaWNoID0gZS53aGljaCB8fCBlLmtleUNvZGU7XG4gICAgaWYgKHdoaWNoID09PSBLRVlfRE9XTikge1xuICAgICAgaWYgKGFueUlucHV0ICYmIG8uYXV0b1Nob3dPblVwRG93bikge1xuICAgICAgICBzaG93KCk7XG4gICAgICB9XG4gICAgICBpZiAoc2hvd24pIHtcbiAgICAgICAgbW92ZSgpO1xuICAgICAgICBzdG9wKGUpO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAod2hpY2ggPT09IEtFWV9VUCkge1xuICAgICAgaWYgKGFueUlucHV0ICYmIG8uYXV0b1Nob3dPblVwRG93bikge1xuICAgICAgICBzaG93KCk7XG4gICAgICB9XG4gICAgICBpZiAoc2hvd24pIHtcbiAgICAgICAgbW92ZSh0cnVlKTtcbiAgICAgICAgc3RvcChlKTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKHNob3duKSB7XG4gICAgICBpZiAod2hpY2ggPT09IEtFWV9FTlRFUikge1xuICAgICAgICBpZiAoc2VsZWN0aW9uKSB7XG4gICAgICAgICAgY3Jvc3N2ZW50LmZhYnJpY2F0ZShzZWxlY3Rpb24sICdjbGljaycpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGhpZGUoKTtcbiAgICAgICAgfVxuICAgICAgICBzdG9wKGUpO1xuICAgICAgfSBlbHNlIGlmICh3aGljaCA9PT0gS0VZX0VTQykge1xuICAgICAgICBoaWRlKCk7XG4gICAgICAgIHN0b3AoZSk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gc3RvcCAoZSkge1xuICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICB9XG5cbiAgZnVuY3Rpb24gZmlsdGVyaW5nICgpIHtcbiAgICBpZiAoIXZpc2libGUoKSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBjcm9zc3ZlbnQuZmFicmljYXRlKGF0dGFjaG1lbnQsICdob3JzZXktZmlsdGVyJyk7XG4gICAgdmFyIGxpID0gdWwuZmlyc3RDaGlsZDtcbiAgICB3aGlsZSAobGkpIHtcbiAgICAgIGNyb3NzdmVudC5mYWJyaWNhdGUobGksICdob3JzZXktZmlsdGVyJyk7XG4gICAgICBsaSA9IGxpLm5leHRTaWJsaW5nO1xuICAgIH1cbiAgICBpZiAoIXNlbGVjdGlvbikge1xuICAgICAgbW92ZSgpO1xuICAgIH1cbiAgICBpZiAoIXNlbGVjdGlvbikge1xuICAgICAgaGlkZSgpO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGRlZmVycmVkRmlsdGVyaW5nTm9FbnRlciAoZSkge1xuICAgIHZhciB3aGljaCA9IGUud2hpY2ggfHwgZS5rZXlDb2RlO1xuICAgIGlmICh3aGljaCA9PT0gS0VZX0VOVEVSKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGRlZmVycmVkRmlsdGVyaW5nKCk7XG4gIH1cblxuICBmdW5jdGlvbiBkZWZlcnJlZFNob3cgKGUpIHtcbiAgICB2YXIgd2hpY2ggPSBlLndoaWNoIHx8IGUua2V5Q29kZTtcbiAgICBpZiAod2hpY2ggPT09IEtFWV9FTlRFUikge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBzZXRUaW1lb3V0KHNob3csIDApO1xuICB9XG5cbiAgZnVuY3Rpb24gaG9yc2V5RXZlbnRUYXJnZXQgKGUpIHtcbiAgICB2YXIgdGFyZ2V0ID0gZS50YXJnZXQ7XG4gICAgaWYgKHRhcmdldCA9PT0gYXR0YWNobWVudCkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIHdoaWxlICh0YXJnZXQpIHtcbiAgICAgIGlmICh0YXJnZXQgPT09IHVsIHx8IHRhcmdldCA9PT0gYXR0YWNobWVudCkge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cbiAgICAgIHRhcmdldCA9IHRhcmdldC5wYXJlbnROb2RlO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGhpZGVPbkJsdXIgKGUpIHtcbiAgICBpZiAoaG9yc2V5RXZlbnRUYXJnZXQoZSkpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaGlkZSgpO1xuICB9XG5cbiAgZnVuY3Rpb24gaGlkZU9uQ2xpY2sgKGUpIHtcbiAgICBpZiAoaG9yc2V5RXZlbnRUYXJnZXQoZSkpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaGlkZSgpO1xuICB9XG5cbiAgZnVuY3Rpb24gaW5wdXRFdmVudHMgKHJlbW92ZSkge1xuICAgIHZhciBvcCA9IHJlbW92ZSA/ICdyZW1vdmUnIDogJ2FkZCc7XG4gICAgaWYgKGV5ZSkge1xuICAgICAgZXllLmRlc3Ryb3koKTtcbiAgICAgIGV5ZSA9IG51bGw7XG4gICAgfVxuICAgIGlmICghcmVtb3ZlKSB7XG4gICAgICBleWUgPSBidWxsc2V5ZSh1bCwgYXR0YWNobWVudCwgeyBjYXJldDogYW55SW5wdXQgJiYgYXR0YWNobWVudC50YWdOYW1lICE9PSAnSU5QVVQnLCBnZXRTZWxlY3Rpb246IGdldFNlbGVjdGlvbiB9KTtcbiAgICAgIGlmICghdmlzaWJsZSgpKSB7IGV5ZS5zbGVlcCgpOyB9XG4gICAgfVxuICAgIGlmICh0eXBlb2Ygc3VnZ2VzdGlvbnMgPT09ICdmdW5jdGlvbicgJiYgIW9uZWxvYWQudXNlZCkge1xuICAgICAgaWYgKHJlbW92ZSB8fCAoYW55SW5wdXQgJiYgZG9jLmFjdGl2ZUVsZW1lbnQgIT09IGF0dGFjaG1lbnQpKSB7XG4gICAgICAgIGNyb3NzdmVudFtvcF0oYXR0YWNobWVudCwgJ2ZvY3VzJywgb25lbG9hZCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBvbmVsb2FkKCk7XG4gICAgICB9XG4gICAgfVxuICAgIGlmIChhbnlJbnB1dCkge1xuICAgICAgY3Jvc3N2ZW50W29wXShhdHRhY2htZW50LCAna2V5cHJlc3MnLCBkZWZlcnJlZFNob3cpO1xuICAgICAgY3Jvc3N2ZW50W29wXShhdHRhY2htZW50LCAna2V5cHJlc3MnLCBkZWZlcnJlZEZpbHRlcmluZyk7XG4gICAgICBjcm9zc3ZlbnRbb3BdKGF0dGFjaG1lbnQsICdrZXlkb3duJywgZGVmZXJyZWRGaWx0ZXJpbmdOb0VudGVyKTtcbiAgICAgIGNyb3NzdmVudFtvcF0oYXR0YWNobWVudCwgJ3Bhc3RlJywgZGVmZXJyZWRGaWx0ZXJpbmcpO1xuICAgICAgY3Jvc3N2ZW50W29wXShhdHRhY2htZW50LCAna2V5ZG93bicsIGtleWRvd24pO1xuICAgICAgaWYgKG8uYXV0b0hpZGVPbkJsdXIpIHsgY3Jvc3N2ZW50W29wXShkb2NFbGVtZW50LCAnZm9jdXMnLCBoaWRlT25CbHVyLCB0cnVlKTsgfVxuICAgIH0gZWxzZSB7XG4gICAgICBjcm9zc3ZlbnRbb3BdKGF0dGFjaG1lbnQsICdjbGljaycsIHRvZ2dsZSk7XG4gICAgICBjcm9zc3ZlbnRbb3BdKGRvY0VsZW1lbnQsICdrZXlkb3duJywga2V5ZG93bik7XG4gICAgfVxuICAgIGlmIChvLmF1dG9IaWRlT25DbGljaykgeyBjcm9zc3ZlbnRbb3BdKGRvYywgJ2NsaWNrJywgaGlkZU9uQ2xpY2spOyB9XG4gICAgaWYgKGZvcm0pIHsgY3Jvc3N2ZW50W29wXShmb3JtLCAnc3VibWl0JywgaGlkZSk7IH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGRlc3Ryb3kgKCkge1xuICAgIGlucHV0RXZlbnRzKHRydWUpO1xuICAgIGlmIChwYXJlbnQuY29udGFpbnModWwpKSB7IHBhcmVudC5yZW1vdmVDaGlsZCh1bCk7IH1cbiAgICBjYWNoZS5zcGxpY2UoY2FjaGUuaW5kZXhPZihlbnRyeSksIDEpO1xuICB9XG5cbiAgZnVuY3Rpb24gZGVmYXVsdFNldHRlciAodmFsdWUpIHtcbiAgICBpZiAodGV4dElucHV0KSB7XG4gICAgICBlbC52YWx1ZSA9IHZhbHVlO1xuICAgIH0gZWxzZSB7XG4gICAgICBlbC5pbm5lckhUTUwgPSB2YWx1ZTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBkZWZhdWx0UmVuZGVyZXIgKGxpLCBzdWdnZXN0aW9uKSB7XG4gICAgbGkuaW5uZXJUZXh0ID0gbGkudGV4dENvbnRlbnQgPSBnZXRUZXh0KHN1Z2dlc3Rpb24pO1xuICB9XG5cbiAgZnVuY3Rpb24gZGVmYXVsdEZpbHRlciAocSwgc3VnZ2VzdGlvbikge1xuICAgIHZhciB0ZXh0ID0gZ2V0VGV4dChzdWdnZXN0aW9uKSB8fCAnJztcbiAgICB2YXIgdmFsdWUgPSBnZXRWYWx1ZShzdWdnZXN0aW9uKSB8fCAnJztcbiAgICByZXR1cm4gZnV6enlzZWFyY2gocSwgdGV4dC50b0xvd2VyQ2FzZSgpKSB8fCBmdXp6eXNlYXJjaChxLCB2YWx1ZS50b0xvd2VyQ2FzZSgpKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBkZWZhdWx0R2V0VmFsdWUgKHN1Z2dlc3Rpb24pIHtcbiAgcmV0dXJuIHR5cGVvZiBzdWdnZXN0aW9uID09PSAnc3RyaW5nJyA/IHN1Z2dlc3Rpb24gOiBzdWdnZXN0aW9uLnZhbHVlO1xufVxuXG5mdW5jdGlvbiBkZWZhdWx0R2V0VGV4dCAoc3VnZ2VzdGlvbikge1xuICByZXR1cm4gdHlwZW9mIHN1Z2dlc3Rpb24gPT09ICdzdHJpbmcnID8gc3VnZ2VzdGlvbiA6IHN1Z2dlc3Rpb24udGV4dDtcbn1cblxuZnVuY3Rpb24gdGFnICh0eXBlLCBjbGFzc05hbWUpIHtcbiAgdmFyIGVsID0gZG9jLmNyZWF0ZUVsZW1lbnQodHlwZSk7XG4gIGVsLmNsYXNzTmFtZSA9IGNsYXNzTmFtZTtcbiAgcmV0dXJuIGVsO1xufVxuXG5mdW5jdGlvbiBvbmNlIChmbikge1xuICB2YXIgZGlzcG9zZWQ7XG4gIGZ1bmN0aW9uIGRpc3Bvc2FibGUgKCkge1xuICAgIGlmIChkaXNwb3NlZCkgeyByZXR1cm47IH1cbiAgICBkaXNwb3NhYmxlLnVzZWQgPSBkaXNwb3NlZCA9IHRydWU7XG4gICAgKGZuIHx8IG5vb3ApLmFwcGx5KG51bGwsIGFyZ3VtZW50cyk7XG4gIH1cbiAgcmV0dXJuIGRpc3Bvc2FibGU7XG59XG5mdW5jdGlvbiBkZWZlciAoZm4pIHsgcmV0dXJuIGZ1bmN0aW9uICgpIHsgc2V0VGltZW91dChmbiwgMCk7IH07IH1cbmZ1bmN0aW9uIG5vb3AgKCkge31cblxuZnVuY3Rpb24gaXNFZGl0YWJsZSAoZWwpIHtcbiAgdmFyIHZhbHVlID0gZWwuZ2V0QXR0cmlidXRlKCdjb250ZW50RWRpdGFibGUnKTtcbiAgaWYgKHZhbHVlID09PSAnZmFsc2UnKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIGlmICh2YWx1ZSA9PT0gJ3RydWUnKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cbiAgaWYgKGVsLnBhcmVudEVsZW1lbnQpIHtcbiAgICByZXR1cm4gaXNFZGl0YWJsZShlbC5wYXJlbnRFbGVtZW50KTtcbiAgfVxuICByZXR1cm4gZmFsc2U7XG59XG5cbmhvcnNleS5maW5kID0gZmluZDtcbm1vZHVsZS5leHBvcnRzID0gaG9yc2V5O1xuIl19
},{"bullseye":2,"crossvent":7,"fuzzysearch":9}],2:[function(require,module,exports){
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

},{"./tailormade":5,"./throttle":6,"crossvent":3}],3:[function(require,module,exports){
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
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9idWxsc2V5ZS9ub2RlX21vZHVsZXMvY3Jvc3N2ZW50L3NyYy9jcm9zc3ZlbnQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcblxudmFyIGRvYyA9IGRvY3VtZW50O1xudmFyIGFkZEV2ZW50ID0gYWRkRXZlbnRFYXN5O1xudmFyIHJlbW92ZUV2ZW50ID0gcmVtb3ZlRXZlbnRFYXN5O1xudmFyIGhhcmRDYWNoZSA9IFtdO1xuXG5pZiAoIWdsb2JhbC5hZGRFdmVudExpc3RlbmVyKSB7XG4gIGFkZEV2ZW50ID0gYWRkRXZlbnRIYXJkO1xuICByZW1vdmVFdmVudCA9IHJlbW92ZUV2ZW50SGFyZDtcbn1cblxuZnVuY3Rpb24gYWRkRXZlbnRFYXN5IChlbCwgdHlwZSwgZm4sIGNhcHR1cmluZykge1xuICByZXR1cm4gZWwuYWRkRXZlbnRMaXN0ZW5lcih0eXBlLCBmbiwgY2FwdHVyaW5nKTtcbn1cblxuZnVuY3Rpb24gYWRkRXZlbnRIYXJkIChlbCwgdHlwZSwgZm4pIHtcbiAgcmV0dXJuIGVsLmF0dGFjaEV2ZW50KCdvbicgKyB0eXBlLCB3cmFwKGVsLCB0eXBlLCBmbikpO1xufVxuXG5mdW5jdGlvbiByZW1vdmVFdmVudEVhc3kgKGVsLCB0eXBlLCBmbiwgY2FwdHVyaW5nKSB7XG4gIHJldHVybiBlbC5yZW1vdmVFdmVudExpc3RlbmVyKHR5cGUsIGZuLCBjYXB0dXJpbmcpO1xufVxuXG5mdW5jdGlvbiByZW1vdmVFdmVudEhhcmQgKGVsLCB0eXBlLCBmbikge1xuICByZXR1cm4gZWwuZGV0YWNoRXZlbnQoJ29uJyArIHR5cGUsIHVud3JhcChlbCwgdHlwZSwgZm4pKTtcbn1cblxuZnVuY3Rpb24gZmFicmljYXRlRXZlbnQgKGVsLCB0eXBlKSB7XG4gIHZhciBlO1xuICBpZiAoZG9jLmNyZWF0ZUV2ZW50KSB7XG4gICAgZSA9IGRvYy5jcmVhdGVFdmVudCgnRXZlbnQnKTtcbiAgICBlLmluaXRFdmVudCh0eXBlLCB0cnVlLCB0cnVlKTtcbiAgICBlbC5kaXNwYXRjaEV2ZW50KGUpO1xuICB9IGVsc2UgaWYgKGRvYy5jcmVhdGVFdmVudE9iamVjdCkge1xuICAgIGUgPSBkb2MuY3JlYXRlRXZlbnRPYmplY3QoKTtcbiAgICBlbC5maXJlRXZlbnQoJ29uJyArIHR5cGUsIGUpO1xuICB9XG59XG5cbmZ1bmN0aW9uIHdyYXBwZXJGYWN0b3J5IChlbCwgdHlwZSwgZm4pIHtcbiAgcmV0dXJuIGZ1bmN0aW9uIHdyYXBwZXIgKG9yaWdpbmFsRXZlbnQpIHtcbiAgICB2YXIgZSA9IG9yaWdpbmFsRXZlbnQgfHwgZ2xvYmFsLmV2ZW50O1xuICAgIGUudGFyZ2V0ID0gZS50YXJnZXQgfHwgZS5zcmNFbGVtZW50O1xuICAgIGUucHJldmVudERlZmF1bHQgID0gZS5wcmV2ZW50RGVmYXVsdCAgfHwgZnVuY3Rpb24gcHJldmVudERlZmF1bHQgKCkgeyBlLnJldHVyblZhbHVlID0gZmFsc2U7IH07XG4gICAgZS5zdG9wUHJvcGFnYXRpb24gPSBlLnN0b3BQcm9wYWdhdGlvbiB8fCBmdW5jdGlvbiBzdG9wUHJvcGFnYXRpb24gKCkgeyBlLmNhbmNlbEJ1YmJsZSA9IHRydWU7IH07XG4gICAgZm4uY2FsbChlbCwgZSk7XG4gIH07XG59XG5cbmZ1bmN0aW9uIHdyYXAgKGVsLCB0eXBlLCBmbikge1xuICB2YXIgd3JhcHBlciA9IHVud3JhcChlbCwgdHlwZSwgZm4pIHx8IHdyYXBwZXJGYWN0b3J5KGVsLCB0eXBlLCBmbik7XG4gIGhhcmRDYWNoZS5wdXNoKHtcbiAgICB3cmFwcGVyOiB3cmFwcGVyLFxuICAgIGVsZW1lbnQ6IGVsLFxuICAgIHR5cGU6IHR5cGUsXG4gICAgZm46IGZuXG4gIH0pO1xuICByZXR1cm4gd3JhcHBlcjtcbn1cblxuZnVuY3Rpb24gdW53cmFwIChlbCwgdHlwZSwgZm4pIHtcbiAgdmFyIGkgPSBmaW5kKGVsLCB0eXBlLCBmbik7XG4gIGlmIChpKSB7XG4gICAgdmFyIHdyYXBwZXIgPSBoYXJkQ2FjaGVbaV0ud3JhcHBlcjtcbiAgICBoYXJkQ2FjaGUuc3BsaWNlKGksIDEpOyAvLyBmcmVlIHVwIGEgdGFkIG9mIG1lbW9yeVxuICAgIHJldHVybiB3cmFwcGVyO1xuICB9XG59XG5cbmZ1bmN0aW9uIGZpbmQgKGVsLCB0eXBlLCBmbikge1xuICB2YXIgaSwgaXRlbTtcbiAgZm9yIChpID0gMDsgaSA8IGhhcmRDYWNoZS5sZW5ndGg7IGkrKykge1xuICAgIGl0ZW0gPSBoYXJkQ2FjaGVbaV07XG4gICAgaWYgKGl0ZW0uZWxlbWVudCA9PT0gZWwgJiYgaXRlbS50eXBlID09PSB0eXBlICYmIGl0ZW0uZm4gPT09IGZuKSB7XG4gICAgICByZXR1cm4gaTtcbiAgICB9XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIGFkZDogYWRkRXZlbnQsXG4gIHJlbW92ZTogcmVtb3ZlRXZlbnQsXG4gIGZhYnJpY2F0ZTogZmFicmljYXRlRXZlbnRcbn07XG4iXX0=
},{}],4:[function(require,module,exports){
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

},{}],5:[function(require,module,exports){
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
},{"./throttle":6,"crossvent":3,"sell":4}],6:[function(require,module,exports){
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

},{}],7:[function(require,module,exports){
(function (global){
'use strict';

var customEvent = require('custom-event');
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
  var e = new customEvent(type, { detail: model });
  if (el.dispatchEvent) {
    el.dispatchEvent(e);
  } else {
    el.fireEvent('on' + type, e);
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
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9jcm9zc3ZlbnQvc3JjL2Nyb3NzdmVudC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcblxudmFyIGN1c3RvbUV2ZW50ID0gcmVxdWlyZSgnY3VzdG9tLWV2ZW50Jyk7XG52YXIgZG9jID0gZG9jdW1lbnQ7XG52YXIgYWRkRXZlbnQgPSBhZGRFdmVudEVhc3k7XG52YXIgcmVtb3ZlRXZlbnQgPSByZW1vdmVFdmVudEVhc3k7XG52YXIgaGFyZENhY2hlID0gW107XG5cbmlmICghZ2xvYmFsLmFkZEV2ZW50TGlzdGVuZXIpIHtcbiAgYWRkRXZlbnQgPSBhZGRFdmVudEhhcmQ7XG4gIHJlbW92ZUV2ZW50ID0gcmVtb3ZlRXZlbnRIYXJkO1xufVxuXG5mdW5jdGlvbiBhZGRFdmVudEVhc3kgKGVsLCB0eXBlLCBmbiwgY2FwdHVyaW5nKSB7XG4gIHJldHVybiBlbC5hZGRFdmVudExpc3RlbmVyKHR5cGUsIGZuLCBjYXB0dXJpbmcpO1xufVxuXG5mdW5jdGlvbiBhZGRFdmVudEhhcmQgKGVsLCB0eXBlLCBmbikge1xuICByZXR1cm4gZWwuYXR0YWNoRXZlbnQoJ29uJyArIHR5cGUsIHdyYXAoZWwsIHR5cGUsIGZuKSk7XG59XG5cbmZ1bmN0aW9uIHJlbW92ZUV2ZW50RWFzeSAoZWwsIHR5cGUsIGZuLCBjYXB0dXJpbmcpIHtcbiAgcmV0dXJuIGVsLnJlbW92ZUV2ZW50TGlzdGVuZXIodHlwZSwgZm4sIGNhcHR1cmluZyk7XG59XG5cbmZ1bmN0aW9uIHJlbW92ZUV2ZW50SGFyZCAoZWwsIHR5cGUsIGZuKSB7XG4gIHJldHVybiBlbC5kZXRhY2hFdmVudCgnb24nICsgdHlwZSwgdW53cmFwKGVsLCB0eXBlLCBmbikpO1xufVxuXG5mdW5jdGlvbiBmYWJyaWNhdGVFdmVudCAoZWwsIHR5cGUsIG1vZGVsKSB7XG4gIHZhciBlID0gbmV3IGN1c3RvbUV2ZW50KHR5cGUsIHsgZGV0YWlsOiBtb2RlbCB9KTtcbiAgaWYgKGVsLmRpc3BhdGNoRXZlbnQpIHtcbiAgICBlbC5kaXNwYXRjaEV2ZW50KGUpO1xuICB9IGVsc2Uge1xuICAgIGVsLmZpcmVFdmVudCgnb24nICsgdHlwZSwgZSk7XG4gIH1cbn1cblxuZnVuY3Rpb24gd3JhcHBlckZhY3RvcnkgKGVsLCB0eXBlLCBmbikge1xuICByZXR1cm4gZnVuY3Rpb24gd3JhcHBlciAob3JpZ2luYWxFdmVudCkge1xuICAgIHZhciBlID0gb3JpZ2luYWxFdmVudCB8fCBnbG9iYWwuZXZlbnQ7XG4gICAgZS50YXJnZXQgPSBlLnRhcmdldCB8fCBlLnNyY0VsZW1lbnQ7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCA9IGUucHJldmVudERlZmF1bHQgfHwgZnVuY3Rpb24gcHJldmVudERlZmF1bHQgKCkgeyBlLnJldHVyblZhbHVlID0gZmFsc2U7IH07XG4gICAgZS5zdG9wUHJvcGFnYXRpb24gPSBlLnN0b3BQcm9wYWdhdGlvbiB8fCBmdW5jdGlvbiBzdG9wUHJvcGFnYXRpb24gKCkgeyBlLmNhbmNlbEJ1YmJsZSA9IHRydWU7IH07XG4gICAgZS53aGljaCA9IGUud2hpY2ggfHwgZS5rZXlDb2RlO1xuICAgIGZuLmNhbGwoZWwsIGUpO1xuICB9O1xufVxuXG5mdW5jdGlvbiB3cmFwIChlbCwgdHlwZSwgZm4pIHtcbiAgdmFyIHdyYXBwZXIgPSB1bndyYXAoZWwsIHR5cGUsIGZuKSB8fCB3cmFwcGVyRmFjdG9yeShlbCwgdHlwZSwgZm4pO1xuICBoYXJkQ2FjaGUucHVzaCh7XG4gICAgd3JhcHBlcjogd3JhcHBlcixcbiAgICBlbGVtZW50OiBlbCxcbiAgICB0eXBlOiB0eXBlLFxuICAgIGZuOiBmblxuICB9KTtcbiAgcmV0dXJuIHdyYXBwZXI7XG59XG5cbmZ1bmN0aW9uIHVud3JhcCAoZWwsIHR5cGUsIGZuKSB7XG4gIHZhciBpID0gZmluZChlbCwgdHlwZSwgZm4pO1xuICBpZiAoaSkge1xuICAgIHZhciB3cmFwcGVyID0gaGFyZENhY2hlW2ldLndyYXBwZXI7XG4gICAgaGFyZENhY2hlLnNwbGljZShpLCAxKTsgLy8gZnJlZSB1cCBhIHRhZCBvZiBtZW1vcnlcbiAgICByZXR1cm4gd3JhcHBlcjtcbiAgfVxufVxuXG5mdW5jdGlvbiBmaW5kIChlbCwgdHlwZSwgZm4pIHtcbiAgdmFyIGksIGl0ZW07XG4gIGZvciAoaSA9IDA7IGkgPCBoYXJkQ2FjaGUubGVuZ3RoOyBpKyspIHtcbiAgICBpdGVtID0gaGFyZENhY2hlW2ldO1xuICAgIGlmIChpdGVtLmVsZW1lbnQgPT09IGVsICYmIGl0ZW0udHlwZSA9PT0gdHlwZSAmJiBpdGVtLmZuID09PSBmbikge1xuICAgICAgcmV0dXJuIGk7XG4gICAgfVxuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBhZGQ6IGFkZEV2ZW50LFxuICByZW1vdmU6IHJlbW92ZUV2ZW50LFxuICBmYWJyaWNhdGU6IGZhYnJpY2F0ZUV2ZW50XG59O1xuIl19
},{"custom-event":8}],8:[function(require,module,exports){
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

},{}]},{},[1])(1)
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJob3JzZXkuanMiLCJub2RlX21vZHVsZXMvYnVsbHNleWUvYnVsbHNleWUuanMiLCJub2RlX21vZHVsZXMvYnVsbHNleWUvbm9kZV9tb2R1bGVzL2Nyb3NzdmVudC9zcmMvY3Jvc3N2ZW50LmpzIiwibm9kZV9tb2R1bGVzL2J1bGxzZXllL25vZGVfbW9kdWxlcy9zZWxsL3NlbGwuanMiLCJub2RlX21vZHVsZXMvYnVsbHNleWUvdGFpbG9ybWFkZS5qcyIsIm5vZGVfbW9kdWxlcy9idWxsc2V5ZS90aHJvdHRsZS5qcyIsIm5vZGVfbW9kdWxlcy9jcm9zc3ZlbnQvc3JjL2Nyb3NzdmVudC5qcyIsIm5vZGVfbW9kdWxlcy9jdXN0b20tZXZlbnQvaW5kZXguanMiLCJub2RlX21vZHVsZXMvZnV6enlzZWFyY2gvaW5kZXguanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDMVpBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN0RkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN4RkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaEdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2pMQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMzQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdkZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ25EQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIoZnVuY3Rpb24gKGdsb2JhbCl7XG4ndXNlIHN0cmljdCc7XG5cbnZhciBjcm9zc3ZlbnQgPSByZXF1aXJlKCdjcm9zc3ZlbnQnKTtcbnZhciBidWxsc2V5ZSA9IHJlcXVpcmUoJ2J1bGxzZXllJyk7XG52YXIgZnV6enlzZWFyY2ggPSByZXF1aXJlKCdmdXp6eXNlYXJjaCcpO1xudmFyIEtFWV9FTlRFUiA9IDEzO1xudmFyIEtFWV9FU0MgPSAyNztcbnZhciBLRVlfVVAgPSAzODtcbnZhciBLRVlfRE9XTiA9IDQwO1xudmFyIGNhY2hlID0gW107XG52YXIgZG9jID0gZG9jdW1lbnQ7XG52YXIgZG9jRWxlbWVudCA9IGRvYy5kb2N1bWVudEVsZW1lbnQ7XG52YXIgd2luID0gZ2xvYmFsO1xuXG5mdW5jdGlvbiBmaW5kIChlbCkge1xuICB2YXIgZW50cnk7XG4gIHZhciBpO1xuICBmb3IgKGkgPSAwOyBpIDwgY2FjaGUubGVuZ3RoOyBpKyspIHtcbiAgICBlbnRyeSA9IGNhY2hlW2ldO1xuICAgIGlmIChlbnRyeS5lbCA9PT0gZWwpIHtcbiAgICAgIHJldHVybiBlbnRyeS5hcGk7XG4gICAgfVxuICB9XG4gIHJldHVybiBudWxsO1xufVxuXG5mdW5jdGlvbiBob3JzZXkgKGVsLCBvcHRpb25zKSB7XG4gIHZhciBjYWNoZWQgPSBmaW5kKGVsKTtcbiAgaWYgKGNhY2hlZCkge1xuICAgIHJldHVybiBjYWNoZWQ7XG4gIH1cblxuICB2YXIgbyA9IG9wdGlvbnMgfHwge307XG4gIHZhciBwYXJlbnQgPSBvLmFwcGVuZFRvIHx8IGRvYy5ib2R5O1xuICB2YXIgcmVuZGVyID0gby5yZW5kZXIgfHwgZGVmYXVsdFJlbmRlcmVyO1xuICB2YXIgZ2V0VGV4dCA9IG8uZ2V0VGV4dCB8fCBkZWZhdWx0R2V0VGV4dDtcbiAgdmFyIGdldFZhbHVlID0gby5nZXRWYWx1ZSB8fCBkZWZhdWx0R2V0VmFsdWU7XG4gIHZhciBnZXRTZWxlY3Rpb24gPSBvLmdldFNlbGVjdGlvbiB8fCB3aW4uZ2V0U2VsZWN0aW9uO1xuICB2YXIgc2V0ID0gby5zZXQgfHwgZGVmYXVsdFNldHRlcjtcbiAgdmFyIGZvcm0gPSBvLmZvcm07XG4gIHZhciBzdWdnZXN0aW9ucyA9IG8uc3VnZ2VzdGlvbnM7XG4gIHZhciBmaWx0ZXIgPSBvLmZpbHRlciB8fCBkZWZhdWx0RmlsdGVyO1xuICB2YXIgdWwgPSB0YWcoJ3VsJywgJ3NleS1saXN0Jyk7XG4gIHZhciBzZWxlY3Rpb24gPSBudWxsO1xuICB2YXIgb25lbG9hZCA9IG9uY2UobG9hZGluZyk7XG4gIHZhciBleWU7XG4gIHZhciBkZWZlcnJlZEZpbHRlcmluZyA9IGRlZmVyKGZpbHRlcmluZyk7XG4gIHZhciBhdHRhY2htZW50ID0gZWw7XG4gIHZhciB0ZXh0SW5wdXQ7XG4gIHZhciBhbnlJbnB1dDtcblxuICBpZiAoby5hdXRvSGlkZU9uQmx1ciA9PT0gdm9pZCAwKSB7IG8uYXV0b0hpZGVPbkJsdXIgPSB0cnVlOyB9XG4gIGlmIChvLmF1dG9IaWRlT25DbGljayA9PT0gdm9pZCAwKSB7IG8uYXV0b0hpZGVPbkNsaWNrID0gdHJ1ZTsgfVxuICBpZiAoby5hdXRvU2hvd09uVXBEb3duID09PSB2b2lkIDApIHsgby5hdXRvU2hvd09uVXBEb3duID0gZWwudGFnTmFtZSA9PT0gJ0lOUFVUJzsgfVxuXG4gIHZhciBhcGkgPSB7XG4gICAgYWRkOiBhZGQsXG4gICAgY2xlYXI6IGNsZWFyLFxuICAgIHNob3c6IHNob3csXG4gICAgaGlkZTogaGlkZSxcbiAgICBkZXN0cm95OiBkZXN0cm95LFxuICAgIHJlZnJlc2hQb3NpdGlvbjogcmVmcmVzaFBvc2l0aW9uLFxuICAgIGRlZmF1bHRSZW5kZXJlcjogZGVmYXVsdFJlbmRlcmVyLFxuICAgIGRlZmF1bHRHZXRUZXh0OiBkZWZhdWx0R2V0VGV4dCxcbiAgICBkZWZhdWx0R2V0VmFsdWU6IGRlZmF1bHRHZXRWYWx1ZSxcbiAgICBkZWZhdWx0U2V0dGVyOiBkZWZhdWx0U2V0dGVyLFxuICAgIGRlZmF1bHRGaWx0ZXI6IGRlZmF1bHRGaWx0ZXIsXG4gICAgcmV0YXJnZXQ6IHJldGFyZ2V0LFxuICAgIGF0dGFjaG1lbnQ6IGF0dGFjaG1lbnQsXG4gICAgbGlzdDogdWwsXG4gICAgc3VnZ2VzdGlvbnM6IFtdXG4gIH07XG4gIHZhciBlbnRyeSA9IHsgZWw6IGVsLCBhcGk6IGFwaSB9O1xuXG4gIHJldGFyZ2V0KGVsKTtcbiAgY2FjaGUucHVzaChlbnRyeSk7XG4gIHBhcmVudC5hcHBlbmRDaGlsZCh1bCk7XG4gIGVsLnNldEF0dHJpYnV0ZSgnYXV0b2NvbXBsZXRlJywgJ29mZicpO1xuXG4gIGlmIChBcnJheS5pc0FycmF5KHN1Z2dlc3Rpb25zKSkge1xuICAgIGxvYWRlZChzdWdnZXN0aW9ucyk7XG4gIH1cblxuICByZXR1cm4gYXBpO1xuXG4gIGZ1bmN0aW9uIHJldGFyZ2V0IChlbCkge1xuICAgIGlucHV0RXZlbnRzKHRydWUpO1xuICAgIGF0dGFjaG1lbnQgPSBhcGkuYXR0YWNobWVudCA9IGVsO1xuICAgIHRleHRJbnB1dCA9IGF0dGFjaG1lbnQudGFnTmFtZSA9PT0gJ0lOUFVUJyB8fCBhdHRhY2htZW50LnRhZ05hbWUgPT09ICdURVhUQVJFQSc7XG4gICAgYW55SW5wdXQgPSB0ZXh0SW5wdXQgfHwgaXNFZGl0YWJsZShhdHRhY2htZW50KTtcbiAgICBpbnB1dEV2ZW50cygpO1xuICB9XG5cbiAgZnVuY3Rpb24gcmVmcmVzaFBvc2l0aW9uICgpIHtcbiAgICBpZiAoZXllKSB7IGV5ZS5yZWZyZXNoKCk7IH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGxvYWRpbmcgKCkge1xuICAgIGNyb3NzdmVudC5yZW1vdmUoYXR0YWNobWVudCwgJ2ZvY3VzJywgb25lbG9hZCk7XG4gICAgc3VnZ2VzdGlvbnMobG9hZGVkKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGxvYWRlZCAoc3VnZ2VzdGlvbnMpIHtcbiAgICBzdWdnZXN0aW9ucy5mb3JFYWNoKGFkZCk7XG4gICAgYXBpLnN1Z2dlc3Rpb25zID0gc3VnZ2VzdGlvbnM7XG4gIH1cblxuICBmdW5jdGlvbiBjbGVhciAoKSB7XG4gICAgd2hpbGUgKHVsLmxhc3RDaGlsZCkge1xuICAgICAgdWwucmVtb3ZlQ2hpbGQodWwubGFzdENoaWxkKTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBhZGQgKHN1Z2dlc3Rpb24pIHtcbiAgICB2YXIgbGkgPSB0YWcoJ2xpJywgJ3NleS1pdGVtJyk7XG4gICAgcmVuZGVyKGxpLCBzdWdnZXN0aW9uKTtcbiAgICBjcm9zc3ZlbnQuYWRkKGxpLCAnY2xpY2snLCBjbGlja2VkU3VnZ2VzdGlvbik7XG4gICAgY3Jvc3N2ZW50LmFkZChsaSwgJ2hvcnNleS1maWx0ZXInLCBmaWx0ZXJJdGVtKTtcbiAgICB1bC5hcHBlbmRDaGlsZChsaSk7XG4gICAgYXBpLnN1Z2dlc3Rpb25zLnB1c2goc3VnZ2VzdGlvbik7XG4gICAgcmV0dXJuIGxpO1xuXG4gICAgZnVuY3Rpb24gY2xpY2tlZFN1Z2dlc3Rpb24gKCkge1xuICAgICAgc2V0KGdldFZhbHVlKHN1Z2dlc3Rpb24pKTtcbiAgICAgIGhpZGUoKTtcbiAgICAgIGF0dGFjaG1lbnQuZm9jdXMoKTtcbiAgICAgIGNyb3NzdmVudC5mYWJyaWNhdGUoYXR0YWNobWVudCwgJ2hvcnNleS1zZWxlY3RlZCcpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGZpbHRlckl0ZW0gKCkge1xuICAgICAgdmFyIHZhbHVlID0gdGV4dElucHV0ID8gZWwudmFsdWUgOiBlbC5pbm5lckhUTUw7XG4gICAgICBpZiAoZmlsdGVyKHZhbHVlLCBzdWdnZXN0aW9uKSkge1xuICAgICAgICBsaS5jbGFzc05hbWUgPSBsaS5jbGFzc05hbWUucmVwbGFjZSgvIHNleS1oaWRlL2csICcnKTtcbiAgICAgIH0gZWxzZSBpZiAoIWhpZGRlbihsaSkpIHtcbiAgICAgICAgbGkuY2xhc3NOYW1lICs9ICcgc2V5LWhpZGUnO1xuICAgICAgICBpZiAoc2VsZWN0aW9uID09PSBsaSkge1xuICAgICAgICAgIHVuc2VsZWN0KCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiB2aXNpYmxlICgpIHtcbiAgICByZXR1cm4gdWwuY2xhc3NOYW1lLmluZGV4T2YoJ3NleS1zaG93JykgIT09IC0xO1xuICB9XG5cbiAgZnVuY3Rpb24gaGlkZGVuIChsaSkge1xuICAgIHJldHVybiBsaS5jbGFzc05hbWUuaW5kZXhPZignc2V5LWhpZGUnKSAhPT0gLTE7XG4gIH1cblxuICBmdW5jdGlvbiBzaG93ICgpIHtcbiAgICBpZiAoIXZpc2libGUoKSkge1xuICAgICAgdWwuY2xhc3NOYW1lICs9ICcgc2V5LXNob3cnO1xuICAgICAgZXllLnJlZnJlc2goKTtcbiAgICAgIGNyb3NzdmVudC5mYWJyaWNhdGUoYXR0YWNobWVudCwgJ2hvcnNleS1zaG93Jyk7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gdG9nZ2xlICgpIHtcbiAgICBpZiAoIXZpc2libGUoKSkge1xuICAgICAgc2hvdygpO1xuICAgIH0gZWxzZSB7XG4gICAgICBoaWRlKCk7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gc2VsZWN0IChzdWdnZXN0aW9uKSB7XG4gICAgdW5zZWxlY3QoKTtcbiAgICBpZiAoc3VnZ2VzdGlvbikge1xuICAgICAgc2VsZWN0aW9uID0gc3VnZ2VzdGlvbjtcbiAgICAgIHNlbGVjdGlvbi5jbGFzc05hbWUgKz0gJyBzZXktc2VsZWN0ZWQnO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHVuc2VsZWN0ICgpIHtcbiAgICBpZiAoc2VsZWN0aW9uKSB7XG4gICAgICBzZWxlY3Rpb24uY2xhc3NOYW1lID0gc2VsZWN0aW9uLmNsYXNzTmFtZS5yZXBsYWNlKC8gc2V5LXNlbGVjdGVkL2csICcnKTtcbiAgICAgIHNlbGVjdGlvbiA9IG51bGw7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gbW92ZSAodXAsIG1vdmVzKSB7XG4gICAgdmFyIHRvdGFsID0gdWwuY2hpbGRyZW4ubGVuZ3RoO1xuICAgIGlmICh0b3RhbCA8IG1vdmVzKSB7XG4gICAgICB1bnNlbGVjdCgpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAodG90YWwgPT09IDApIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdmFyIGZpcnN0ID0gdXAgPyAnbGFzdENoaWxkJyA6ICdmaXJzdENoaWxkJztcbiAgICB2YXIgbmV4dCA9IHVwID8gJ3ByZXZpb3VzU2libGluZycgOiAnbmV4dFNpYmxpbmcnO1xuICAgIHZhciBzdWdnZXN0aW9uID0gc2VsZWN0aW9uICYmIHNlbGVjdGlvbltuZXh0XSB8fCB1bFtmaXJzdF07XG5cbiAgICBzZWxlY3Qoc3VnZ2VzdGlvbik7XG5cbiAgICBpZiAoaGlkZGVuKHN1Z2dlc3Rpb24pKSB7XG4gICAgICBtb3ZlKHVwLCBtb3ZlcyA/IG1vdmVzICsgMSA6IDEpO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGhpZGUgKCkge1xuICAgIGV5ZS5zbGVlcCgpO1xuICAgIHVsLmNsYXNzTmFtZSA9IHVsLmNsYXNzTmFtZS5yZXBsYWNlKC8gc2V5LXNob3cvZywgJycpO1xuICAgIHVuc2VsZWN0KCk7XG4gICAgY3Jvc3N2ZW50LmZhYnJpY2F0ZShhdHRhY2htZW50LCAnaG9yc2V5LWhpZGUnKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGtleWRvd24gKGUpIHtcbiAgICB2YXIgc2hvd24gPSB2aXNpYmxlKCk7XG4gICAgdmFyIHdoaWNoID0gZS53aGljaCB8fCBlLmtleUNvZGU7XG4gICAgaWYgKHdoaWNoID09PSBLRVlfRE9XTikge1xuICAgICAgaWYgKGFueUlucHV0ICYmIG8uYXV0b1Nob3dPblVwRG93bikge1xuICAgICAgICBzaG93KCk7XG4gICAgICB9XG4gICAgICBpZiAoc2hvd24pIHtcbiAgICAgICAgbW92ZSgpO1xuICAgICAgICBzdG9wKGUpO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAod2hpY2ggPT09IEtFWV9VUCkge1xuICAgICAgaWYgKGFueUlucHV0ICYmIG8uYXV0b1Nob3dPblVwRG93bikge1xuICAgICAgICBzaG93KCk7XG4gICAgICB9XG4gICAgICBpZiAoc2hvd24pIHtcbiAgICAgICAgbW92ZSh0cnVlKTtcbiAgICAgICAgc3RvcChlKTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKHNob3duKSB7XG4gICAgICBpZiAod2hpY2ggPT09IEtFWV9FTlRFUikge1xuICAgICAgICBpZiAoc2VsZWN0aW9uKSB7XG4gICAgICAgICAgY3Jvc3N2ZW50LmZhYnJpY2F0ZShzZWxlY3Rpb24sICdjbGljaycpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGhpZGUoKTtcbiAgICAgICAgfVxuICAgICAgICBzdG9wKGUpO1xuICAgICAgfSBlbHNlIGlmICh3aGljaCA9PT0gS0VZX0VTQykge1xuICAgICAgICBoaWRlKCk7XG4gICAgICAgIHN0b3AoZSk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gc3RvcCAoZSkge1xuICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICB9XG5cbiAgZnVuY3Rpb24gZmlsdGVyaW5nICgpIHtcbiAgICBpZiAoIXZpc2libGUoKSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBjcm9zc3ZlbnQuZmFicmljYXRlKGF0dGFjaG1lbnQsICdob3JzZXktZmlsdGVyJyk7XG4gICAgdmFyIGxpID0gdWwuZmlyc3RDaGlsZDtcbiAgICB3aGlsZSAobGkpIHtcbiAgICAgIGNyb3NzdmVudC5mYWJyaWNhdGUobGksICdob3JzZXktZmlsdGVyJyk7XG4gICAgICBsaSA9IGxpLm5leHRTaWJsaW5nO1xuICAgIH1cbiAgICBpZiAoIXNlbGVjdGlvbikge1xuICAgICAgbW92ZSgpO1xuICAgIH1cbiAgICBpZiAoIXNlbGVjdGlvbikge1xuICAgICAgaGlkZSgpO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGRlZmVycmVkRmlsdGVyaW5nTm9FbnRlciAoZSkge1xuICAgIHZhciB3aGljaCA9IGUud2hpY2ggfHwgZS5rZXlDb2RlO1xuICAgIGlmICh3aGljaCA9PT0gS0VZX0VOVEVSKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGRlZmVycmVkRmlsdGVyaW5nKCk7XG4gIH1cblxuICBmdW5jdGlvbiBkZWZlcnJlZFNob3cgKGUpIHtcbiAgICB2YXIgd2hpY2ggPSBlLndoaWNoIHx8IGUua2V5Q29kZTtcbiAgICBpZiAod2hpY2ggPT09IEtFWV9FTlRFUikge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBzZXRUaW1lb3V0KHNob3csIDApO1xuICB9XG5cbiAgZnVuY3Rpb24gaG9yc2V5RXZlbnRUYXJnZXQgKGUpIHtcbiAgICB2YXIgdGFyZ2V0ID0gZS50YXJnZXQ7XG4gICAgaWYgKHRhcmdldCA9PT0gYXR0YWNobWVudCkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIHdoaWxlICh0YXJnZXQpIHtcbiAgICAgIGlmICh0YXJnZXQgPT09IHVsIHx8IHRhcmdldCA9PT0gYXR0YWNobWVudCkge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cbiAgICAgIHRhcmdldCA9IHRhcmdldC5wYXJlbnROb2RlO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGhpZGVPbkJsdXIgKGUpIHtcbiAgICBpZiAoaG9yc2V5RXZlbnRUYXJnZXQoZSkpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaGlkZSgpO1xuICB9XG5cbiAgZnVuY3Rpb24gaGlkZU9uQ2xpY2sgKGUpIHtcbiAgICBpZiAoaG9yc2V5RXZlbnRUYXJnZXQoZSkpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaGlkZSgpO1xuICB9XG5cbiAgZnVuY3Rpb24gaW5wdXRFdmVudHMgKHJlbW92ZSkge1xuICAgIHZhciBvcCA9IHJlbW92ZSA/ICdyZW1vdmUnIDogJ2FkZCc7XG4gICAgaWYgKGV5ZSkge1xuICAgICAgZXllLmRlc3Ryb3koKTtcbiAgICAgIGV5ZSA9IG51bGw7XG4gICAgfVxuICAgIGlmICghcmVtb3ZlKSB7XG4gICAgICBleWUgPSBidWxsc2V5ZSh1bCwgYXR0YWNobWVudCwgeyBjYXJldDogYW55SW5wdXQgJiYgYXR0YWNobWVudC50YWdOYW1lICE9PSAnSU5QVVQnLCBnZXRTZWxlY3Rpb246IGdldFNlbGVjdGlvbiB9KTtcbiAgICAgIGlmICghdmlzaWJsZSgpKSB7IGV5ZS5zbGVlcCgpOyB9XG4gICAgfVxuICAgIGlmICh0eXBlb2Ygc3VnZ2VzdGlvbnMgPT09ICdmdW5jdGlvbicgJiYgIW9uZWxvYWQudXNlZCkge1xuICAgICAgaWYgKHJlbW92ZSB8fCAoYW55SW5wdXQgJiYgZG9jLmFjdGl2ZUVsZW1lbnQgIT09IGF0dGFjaG1lbnQpKSB7XG4gICAgICAgIGNyb3NzdmVudFtvcF0oYXR0YWNobWVudCwgJ2ZvY3VzJywgb25lbG9hZCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBvbmVsb2FkKCk7XG4gICAgICB9XG4gICAgfVxuICAgIGlmIChhbnlJbnB1dCkge1xuICAgICAgY3Jvc3N2ZW50W29wXShhdHRhY2htZW50LCAna2V5cHJlc3MnLCBkZWZlcnJlZFNob3cpO1xuICAgICAgY3Jvc3N2ZW50W29wXShhdHRhY2htZW50LCAna2V5cHJlc3MnLCBkZWZlcnJlZEZpbHRlcmluZyk7XG4gICAgICBjcm9zc3ZlbnRbb3BdKGF0dGFjaG1lbnQsICdrZXlkb3duJywgZGVmZXJyZWRGaWx0ZXJpbmdOb0VudGVyKTtcbiAgICAgIGNyb3NzdmVudFtvcF0oYXR0YWNobWVudCwgJ3Bhc3RlJywgZGVmZXJyZWRGaWx0ZXJpbmcpO1xuICAgICAgY3Jvc3N2ZW50W29wXShhdHRhY2htZW50LCAna2V5ZG93bicsIGtleWRvd24pO1xuICAgICAgaWYgKG8uYXV0b0hpZGVPbkJsdXIpIHsgY3Jvc3N2ZW50W29wXShkb2NFbGVtZW50LCAnZm9jdXMnLCBoaWRlT25CbHVyLCB0cnVlKTsgfVxuICAgIH0gZWxzZSB7XG4gICAgICBjcm9zc3ZlbnRbb3BdKGF0dGFjaG1lbnQsICdjbGljaycsIHRvZ2dsZSk7XG4gICAgICBjcm9zc3ZlbnRbb3BdKGRvY0VsZW1lbnQsICdrZXlkb3duJywga2V5ZG93bik7XG4gICAgfVxuICAgIGlmIChvLmF1dG9IaWRlT25DbGljaykgeyBjcm9zc3ZlbnRbb3BdKGRvYywgJ2NsaWNrJywgaGlkZU9uQ2xpY2spOyB9XG4gICAgaWYgKGZvcm0pIHsgY3Jvc3N2ZW50W29wXShmb3JtLCAnc3VibWl0JywgaGlkZSk7IH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGRlc3Ryb3kgKCkge1xuICAgIGlucHV0RXZlbnRzKHRydWUpO1xuICAgIGlmIChwYXJlbnQuY29udGFpbnModWwpKSB7IHBhcmVudC5yZW1vdmVDaGlsZCh1bCk7IH1cbiAgICBjYWNoZS5zcGxpY2UoY2FjaGUuaW5kZXhPZihlbnRyeSksIDEpO1xuICB9XG5cbiAgZnVuY3Rpb24gZGVmYXVsdFNldHRlciAodmFsdWUpIHtcbiAgICBpZiAodGV4dElucHV0KSB7XG4gICAgICBlbC52YWx1ZSA9IHZhbHVlO1xuICAgIH0gZWxzZSB7XG4gICAgICBlbC5pbm5lckhUTUwgPSB2YWx1ZTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBkZWZhdWx0UmVuZGVyZXIgKGxpLCBzdWdnZXN0aW9uKSB7XG4gICAgbGkuaW5uZXJUZXh0ID0gbGkudGV4dENvbnRlbnQgPSBnZXRUZXh0KHN1Z2dlc3Rpb24pO1xuICB9XG5cbiAgZnVuY3Rpb24gZGVmYXVsdEZpbHRlciAocSwgc3VnZ2VzdGlvbikge1xuICAgIHZhciB0ZXh0ID0gZ2V0VGV4dChzdWdnZXN0aW9uKSB8fCAnJztcbiAgICB2YXIgdmFsdWUgPSBnZXRWYWx1ZShzdWdnZXN0aW9uKSB8fCAnJztcbiAgICByZXR1cm4gZnV6enlzZWFyY2gocSwgdGV4dC50b0xvd2VyQ2FzZSgpKSB8fCBmdXp6eXNlYXJjaChxLCB2YWx1ZS50b0xvd2VyQ2FzZSgpKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBkZWZhdWx0R2V0VmFsdWUgKHN1Z2dlc3Rpb24pIHtcbiAgcmV0dXJuIHR5cGVvZiBzdWdnZXN0aW9uID09PSAnc3RyaW5nJyA/IHN1Z2dlc3Rpb24gOiBzdWdnZXN0aW9uLnZhbHVlO1xufVxuXG5mdW5jdGlvbiBkZWZhdWx0R2V0VGV4dCAoc3VnZ2VzdGlvbikge1xuICByZXR1cm4gdHlwZW9mIHN1Z2dlc3Rpb24gPT09ICdzdHJpbmcnID8gc3VnZ2VzdGlvbiA6IHN1Z2dlc3Rpb24udGV4dDtcbn1cblxuZnVuY3Rpb24gdGFnICh0eXBlLCBjbGFzc05hbWUpIHtcbiAgdmFyIGVsID0gZG9jLmNyZWF0ZUVsZW1lbnQodHlwZSk7XG4gIGVsLmNsYXNzTmFtZSA9IGNsYXNzTmFtZTtcbiAgcmV0dXJuIGVsO1xufVxuXG5mdW5jdGlvbiBvbmNlIChmbikge1xuICB2YXIgZGlzcG9zZWQ7XG4gIGZ1bmN0aW9uIGRpc3Bvc2FibGUgKCkge1xuICAgIGlmIChkaXNwb3NlZCkgeyByZXR1cm47IH1cbiAgICBkaXNwb3NhYmxlLnVzZWQgPSBkaXNwb3NlZCA9IHRydWU7XG4gICAgKGZuIHx8IG5vb3ApLmFwcGx5KG51bGwsIGFyZ3VtZW50cyk7XG4gIH1cbiAgcmV0dXJuIGRpc3Bvc2FibGU7XG59XG5mdW5jdGlvbiBkZWZlciAoZm4pIHsgcmV0dXJuIGZ1bmN0aW9uICgpIHsgc2V0VGltZW91dChmbiwgMCk7IH07IH1cbmZ1bmN0aW9uIG5vb3AgKCkge31cblxuZnVuY3Rpb24gaXNFZGl0YWJsZSAoZWwpIHtcbiAgdmFyIHZhbHVlID0gZWwuZ2V0QXR0cmlidXRlKCdjb250ZW50RWRpdGFibGUnKTtcbiAgaWYgKHZhbHVlID09PSAnZmFsc2UnKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIGlmICh2YWx1ZSA9PT0gJ3RydWUnKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cbiAgaWYgKGVsLnBhcmVudEVsZW1lbnQpIHtcbiAgICByZXR1cm4gaXNFZGl0YWJsZShlbC5wYXJlbnRFbGVtZW50KTtcbiAgfVxuICByZXR1cm4gZmFsc2U7XG59XG5cbmhvcnNleS5maW5kID0gZmluZDtcbm1vZHVsZS5leHBvcnRzID0gaG9yc2V5O1xuXG59KS5jYWxsKHRoaXMsdHlwZW9mIGdsb2JhbCAhPT0gXCJ1bmRlZmluZWRcIiA/IGdsb2JhbCA6IHR5cGVvZiBzZWxmICE9PSBcInVuZGVmaW5lZFwiID8gc2VsZiA6IHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgPyB3aW5kb3cgOiB7fSlcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtjaGFyc2V0OnV0Zi04O2Jhc2U2NCxleUoyWlhKemFXOXVJam96TENKemIzVnlZMlZ6SWpwYkltaHZjbk5sZVM1cWN5SmRMQ0p1WVcxbGN5STZXMTBzSW0xaGNIQnBibWR6SWpvaU8wRkJRVUU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CSWl3aVptbHNaU0k2SW1kbGJtVnlZWFJsWkM1cWN5SXNJbk52ZFhKalpWSnZiM1FpT2lJaUxDSnpiM1Z5WTJWelEyOXVkR1Z1ZENJNld5SW5kWE5sSUhOMGNtbGpkQ2M3WEc1Y2JuWmhjaUJqY205emMzWmxiblFnUFNCeVpYRjFhWEpsS0NkamNtOXpjM1psYm5RbktUdGNiblpoY2lCaWRXeHNjMlY1WlNBOUlISmxjWFZwY21Vb0oySjFiR3h6WlhsbEp5azdYRzUyWVhJZ1puVjZlbmx6WldGeVkyZ2dQU0J5WlhGMWFYSmxLQ2RtZFhwNmVYTmxZWEpqYUNjcE8xeHVkbUZ5SUV0RldWOUZUbFJGVWlBOUlERXpPMXh1ZG1GeUlFdEZXVjlGVTBNZ1BTQXlOenRjYm5aaGNpQkxSVmxmVlZBZ1BTQXpPRHRjYm5aaGNpQkxSVmxmUkU5WFRpQTlJRFF3TzF4dWRtRnlJR05oWTJobElEMGdXMTA3WEc1MllYSWdaRzlqSUQwZ1pHOWpkVzFsYm5RN1hHNTJZWElnWkc5alJXeGxiV1Z1ZENBOUlHUnZZeTVrYjJOMWJXVnVkRVZzWlcxbGJuUTdYRzUyWVhJZ2QybHVJRDBnWjJ4dlltRnNPMXh1WEc1bWRXNWpkR2x2YmlCbWFXNWtJQ2hsYkNrZ2UxeHVJQ0IyWVhJZ1pXNTBjbms3WEc0Z0lIWmhjaUJwTzF4dUlDQm1iM0lnS0drZ1BTQXdPeUJwSUR3Z1kyRmphR1V1YkdWdVozUm9PeUJwS3lzcElIdGNiaUFnSUNCbGJuUnllU0E5SUdOaFkyaGxXMmxkTzF4dUlDQWdJR2xtSUNobGJuUnllUzVsYkNBOVBUMGdaV3dwSUh0Y2JpQWdJQ0FnSUhKbGRIVnliaUJsYm5SeWVTNWhjR2s3WEc0Z0lDQWdmVnh1SUNCOVhHNGdJSEpsZEhWeWJpQnVkV3hzTzF4dWZWeHVYRzVtZFc1amRHbHZiaUJvYjNKelpYa2dLR1ZzTENCdmNIUnBiMjV6S1NCN1hHNGdJSFpoY2lCallXTm9aV1FnUFNCbWFXNWtLR1ZzS1R0Y2JpQWdhV1lnS0dOaFkyaGxaQ2tnZTF4dUlDQWdJSEpsZEhWeWJpQmpZV05vWldRN1hHNGdJSDFjYmx4dUlDQjJZWElnYnlBOUlHOXdkR2x2Ym5NZ2ZId2dlMzA3WEc0Z0lIWmhjaUJ3WVhKbGJuUWdQU0J2TG1Gd2NHVnVaRlJ2SUh4OElHUnZZeTVpYjJSNU8xeHVJQ0IyWVhJZ2NtVnVaR1Z5SUQwZ2J5NXlaVzVrWlhJZ2ZId2daR1ZtWVhWc2RGSmxibVJsY21WeU8xeHVJQ0IyWVhJZ1oyVjBWR1Y0ZENBOUlHOHVaMlYwVkdWNGRDQjhmQ0JrWldaaGRXeDBSMlYwVkdWNGREdGNiaUFnZG1GeUlHZGxkRlpoYkhWbElEMGdieTVuWlhSV1lXeDFaU0I4ZkNCa1pXWmhkV3gwUjJWMFZtRnNkV1U3WEc0Z0lIWmhjaUJuWlhSVFpXeGxZM1JwYjI0Z1BTQnZMbWRsZEZObGJHVmpkR2x2YmlCOGZDQjNhVzR1WjJWMFUyVnNaV04wYVc5dU8xeHVJQ0IyWVhJZ2MyVjBJRDBnYnk1elpYUWdmSHdnWkdWbVlYVnNkRk5sZEhSbGNqdGNiaUFnZG1GeUlHWnZjbTBnUFNCdkxtWnZjbTA3WEc0Z0lIWmhjaUJ6ZFdkblpYTjBhVzl1Y3lBOUlHOHVjM1ZuWjJWemRHbHZibk03WEc0Z0lIWmhjaUJtYVd4MFpYSWdQU0J2TG1acGJIUmxjaUI4ZkNCa1pXWmhkV3gwUm1sc2RHVnlPMXh1SUNCMllYSWdkV3dnUFNCMFlXY29KM1ZzSnl3Z0ozTmxlUzFzYVhOMEp5azdYRzRnSUhaaGNpQnpaV3hsWTNScGIyNGdQU0J1ZFd4c08xeHVJQ0IyWVhJZ2IyNWxiRzloWkNBOUlHOXVZMlVvYkc5aFpHbHVaeWs3WEc0Z0lIWmhjaUJsZVdVN1hHNGdJSFpoY2lCa1pXWmxjbkpsWkVacGJIUmxjbWx1WnlBOUlHUmxabVZ5S0dacGJIUmxjbWx1WnlrN1hHNGdJSFpoY2lCaGRIUmhZMmh0Wlc1MElEMGdaV3c3WEc0Z0lIWmhjaUIwWlhoMFNXNXdkWFE3WEc0Z0lIWmhjaUJoYm5sSmJuQjFkRHRjYmx4dUlDQnBaaUFvYnk1aGRYUnZTR2xrWlU5dVFteDFjaUE5UFQwZ2RtOXBaQ0F3S1NCN0lHOHVZWFYwYjBocFpHVlBia0pzZFhJZ1BTQjBjblZsT3lCOVhHNGdJR2xtSUNodkxtRjFkRzlJYVdSbFQyNURiR2xqYXlBOVBUMGdkbTlwWkNBd0tTQjdJRzh1WVhWMGIwaHBaR1ZQYmtOc2FXTnJJRDBnZEhKMVpUc2dmVnh1SUNCcFppQW9ieTVoZFhSdlUyaHZkMDl1VlhCRWIzZHVJRDA5UFNCMmIybGtJREFwSUhzZ2J5NWhkWFJ2VTJodmQwOXVWWEJFYjNkdUlEMGdaV3d1ZEdGblRtRnRaU0E5UFQwZ0owbE9VRlZVSnpzZ2ZWeHVYRzRnSUhaaGNpQmhjR2tnUFNCN1hHNGdJQ0FnWVdSa09pQmhaR1FzWEc0Z0lDQWdZMnhsWVhJNklHTnNaV0Z5TEZ4dUlDQWdJSE5vYjNjNklITm9iM2NzWEc0Z0lDQWdhR2xrWlRvZ2FHbGtaU3hjYmlBZ0lDQmtaWE4wY205NU9pQmtaWE4wY205NUxGeHVJQ0FnSUhKbFpuSmxjMmhRYjNOcGRHbHZiam9nY21WbWNtVnphRkJ2YzJsMGFXOXVMRnh1SUNBZ0lHUmxabUYxYkhSU1pXNWtaWEpsY2pvZ1pHVm1ZWFZzZEZKbGJtUmxjbVZ5TEZ4dUlDQWdJR1JsWm1GMWJIUkhaWFJVWlhoME9pQmtaV1poZFd4MFIyVjBWR1Y0ZEN4Y2JpQWdJQ0JrWldaaGRXeDBSMlYwVm1Gc2RXVTZJR1JsWm1GMWJIUkhaWFJXWVd4MVpTeGNiaUFnSUNCa1pXWmhkV3gwVTJWMGRHVnlPaUJrWldaaGRXeDBVMlYwZEdWeUxGeHVJQ0FnSUdSbFptRjFiSFJHYVd4MFpYSTZJR1JsWm1GMWJIUkdhV3gwWlhJc1hHNGdJQ0FnY21WMFlYSm5aWFE2SUhKbGRHRnlaMlYwTEZ4dUlDQWdJR0YwZEdGamFHMWxiblE2SUdGMGRHRmphRzFsYm5Rc1hHNGdJQ0FnYkdsemREb2dkV3dzWEc0Z0lDQWdjM1ZuWjJWemRHbHZibk02SUZ0ZFhHNGdJSDA3WEc0Z0lIWmhjaUJsYm5SeWVTQTlJSHNnWld3NklHVnNMQ0JoY0drNklHRndhU0I5TzF4dVhHNGdJSEpsZEdGeVoyVjBLR1ZzS1R0Y2JpQWdZMkZqYUdVdWNIVnphQ2hsYm5SeWVTazdYRzRnSUhCaGNtVnVkQzVoY0hCbGJtUkRhR2xzWkNoMWJDazdYRzRnSUdWc0xuTmxkRUYwZEhKcFluVjBaU2duWVhWMGIyTnZiWEJzWlhSbEp5d2dKMjltWmljcE8xeHVYRzRnSUdsbUlDaEJjbkpoZVM1cGMwRnljbUY1S0hOMVoyZGxjM1JwYjI1ektTa2dlMXh1SUNBZ0lHeHZZV1JsWkNoemRXZG5aWE4wYVc5dWN5azdYRzRnSUgxY2JseHVJQ0J5WlhSMWNtNGdZWEJwTzF4dVhHNGdJR1oxYm1OMGFXOXVJSEpsZEdGeVoyVjBJQ2hsYkNrZ2UxeHVJQ0FnSUdsdWNIVjBSWFpsYm5SektIUnlkV1VwTzF4dUlDQWdJR0YwZEdGamFHMWxiblFnUFNCaGNHa3VZWFIwWVdOb2JXVnVkQ0E5SUdWc08xeHVJQ0FnSUhSbGVIUkpibkIxZENBOUlHRjBkR0ZqYUcxbGJuUXVkR0ZuVG1GdFpTQTlQVDBnSjBsT1VGVlVKeUI4ZkNCaGRIUmhZMmh0Wlc1MExuUmhaMDVoYldVZ1BUMDlJQ2RVUlZoVVFWSkZRU2M3WEc0Z0lDQWdZVzU1U1c1d2RYUWdQU0IwWlhoMFNXNXdkWFFnZkh3Z2FYTkZaR2wwWVdKc1pTaGhkSFJoWTJodFpXNTBLVHRjYmlBZ0lDQnBibkIxZEVWMlpXNTBjeWdwTzF4dUlDQjlYRzVjYmlBZ1puVnVZM1JwYjI0Z2NtVm1jbVZ6YUZCdmMybDBhVzl1SUNncElIdGNiaUFnSUNCcFppQW9aWGxsS1NCN0lHVjVaUzV5WldaeVpYTm9LQ2s3SUgxY2JpQWdmVnh1WEc0Z0lHWjFibU4wYVc5dUlHeHZZV1JwYm1jZ0tDa2dlMXh1SUNBZ0lHTnliM056ZG1WdWRDNXlaVzF2ZG1Vb1lYUjBZV05vYldWdWRDd2dKMlp2WTNWekp5d2diMjVsYkc5aFpDazdYRzRnSUNBZ2MzVm5aMlZ6ZEdsdmJuTW9iRzloWkdWa0tUdGNiaUFnZlZ4dVhHNGdJR1oxYm1OMGFXOXVJR3h2WVdSbFpDQW9jM1ZuWjJWemRHbHZibk1wSUh0Y2JpQWdJQ0J6ZFdkblpYTjBhVzl1Y3k1bWIzSkZZV05vS0dGa1pDazdYRzRnSUNBZ1lYQnBMbk4xWjJkbGMzUnBiMjV6SUQwZ2MzVm5aMlZ6ZEdsdmJuTTdYRzRnSUgxY2JseHVJQ0JtZFc1amRHbHZiaUJqYkdWaGNpQW9LU0I3WEc0Z0lDQWdkMmhwYkdVZ0tIVnNMbXhoYzNSRGFHbHNaQ2tnZTF4dUlDQWdJQ0FnZFd3dWNtVnRiM1psUTJocGJHUW9kV3d1YkdGemRFTm9hV3hrS1R0Y2JpQWdJQ0I5WEc0Z0lIMWNibHh1SUNCbWRXNWpkR2x2YmlCaFpHUWdLSE4xWjJkbGMzUnBiMjRwSUh0Y2JpQWdJQ0IyWVhJZ2JHa2dQU0IwWVdjb0oyeHBKeXdnSjNObGVTMXBkR1Z0SnlrN1hHNGdJQ0FnY21WdVpHVnlLR3hwTENCemRXZG5aWE4wYVc5dUtUdGNiaUFnSUNCamNtOXpjM1psYm5RdVlXUmtLR3hwTENBblkyeHBZMnNuTENCamJHbGphMlZrVTNWbloyVnpkR2x2YmlrN1hHNGdJQ0FnWTNKdmMzTjJaVzUwTG1Ga1pDaHNhU3dnSjJodmNuTmxlUzFtYVd4MFpYSW5MQ0JtYVd4MFpYSkpkR1Z0S1R0Y2JpQWdJQ0IxYkM1aGNIQmxibVJEYUdsc1pDaHNhU2s3WEc0Z0lDQWdZWEJwTG5OMVoyZGxjM1JwYjI1ekxuQjFjMmdvYzNWbloyVnpkR2x2YmlrN1hHNGdJQ0FnY21WMGRYSnVJR3hwTzF4dVhHNGdJQ0FnWm5WdVkzUnBiMjRnWTJ4cFkydGxaRk4xWjJkbGMzUnBiMjRnS0NrZ2UxeHVJQ0FnSUNBZ2MyVjBLR2RsZEZaaGJIVmxLSE4xWjJkbGMzUnBiMjRwS1R0Y2JpQWdJQ0FnSUdocFpHVW9LVHRjYmlBZ0lDQWdJR0YwZEdGamFHMWxiblF1Wm05amRYTW9LVHRjYmlBZ0lDQWdJR055YjNOemRtVnVkQzVtWVdKeWFXTmhkR1VvWVhSMFlXTm9iV1Z1ZEN3Z0oyaHZjbk5sZVMxelpXeGxZM1JsWkNjcE8xeHVJQ0FnSUgxY2JseHVJQ0FnSUdaMWJtTjBhVzl1SUdacGJIUmxja2wwWlcwZ0tDa2dlMXh1SUNBZ0lDQWdkbUZ5SUhaaGJIVmxJRDBnZEdWNGRFbHVjSFYwSUQ4Z1pXd3VkbUZzZFdVZ09pQmxiQzVwYm01bGNraFVUVXc3WEc0Z0lDQWdJQ0JwWmlBb1ptbHNkR1Z5S0haaGJIVmxMQ0J6ZFdkblpYTjBhVzl1S1NrZ2UxeHVJQ0FnSUNBZ0lDQnNhUzVqYkdGemMwNWhiV1VnUFNCc2FTNWpiR0Z6YzA1aGJXVXVjbVZ3YkdGalpTZ3ZJSE5sZVMxb2FXUmxMMmNzSUNjbktUdGNiaUFnSUNBZ0lIMGdaV3h6WlNCcFppQW9JV2hwWkdSbGJpaHNhU2twSUh0Y2JpQWdJQ0FnSUNBZ2JHa3VZMnhoYzNOT1lXMWxJQ3M5SUNjZ2MyVjVMV2hwWkdVbk8xeHVJQ0FnSUNBZ0lDQnBaaUFvYzJWc1pXTjBhVzl1SUQwOVBTQnNhU2tnZTF4dUlDQWdJQ0FnSUNBZ0lIVnVjMlZzWldOMEtDazdYRzRnSUNBZ0lDQWdJSDFjYmlBZ0lDQWdJSDFjYmlBZ0lDQjlYRzRnSUgxY2JseHVJQ0JtZFc1amRHbHZiaUIyYVhOcFlteGxJQ2dwSUh0Y2JpQWdJQ0J5WlhSMWNtNGdkV3d1WTJ4aGMzTk9ZVzFsTG1sdVpHVjRUMllvSjNObGVTMXphRzkzSnlrZ0lUMDlJQzB4TzF4dUlDQjlYRzVjYmlBZ1puVnVZM1JwYjI0Z2FHbGtaR1Z1SUNoc2FTa2dlMXh1SUNBZ0lISmxkSFZ5YmlCc2FTNWpiR0Z6YzA1aGJXVXVhVzVrWlhoUFppZ25jMlY1TFdocFpHVW5LU0FoUFQwZ0xURTdYRzRnSUgxY2JseHVJQ0JtZFc1amRHbHZiaUJ6YUc5M0lDZ3BJSHRjYmlBZ0lDQnBaaUFvSVhacGMybGliR1VvS1NrZ2UxeHVJQ0FnSUNBZ2RXd3VZMnhoYzNOT1lXMWxJQ3M5SUNjZ2MyVjVMWE5vYjNjbk8xeHVJQ0FnSUNBZ1pYbGxMbkpsWm5KbGMyZ29LVHRjYmlBZ0lDQWdJR055YjNOemRtVnVkQzVtWVdKeWFXTmhkR1VvWVhSMFlXTm9iV1Z1ZEN3Z0oyaHZjbk5sZVMxemFHOTNKeWs3WEc0Z0lDQWdmVnh1SUNCOVhHNWNiaUFnWm5WdVkzUnBiMjRnZEc5bloyeGxJQ2dwSUh0Y2JpQWdJQ0JwWmlBb0lYWnBjMmxpYkdVb0tTa2dlMXh1SUNBZ0lDQWdjMmh2ZHlncE8xeHVJQ0FnSUgwZ1pXeHpaU0I3WEc0Z0lDQWdJQ0JvYVdSbEtDazdYRzRnSUNBZ2ZWeHVJQ0I5WEc1Y2JpQWdablZ1WTNScGIyNGdjMlZzWldOMElDaHpkV2RuWlhOMGFXOXVLU0I3WEc0Z0lDQWdkVzV6Wld4bFkzUW9LVHRjYmlBZ0lDQnBaaUFvYzNWbloyVnpkR2x2YmlrZ2UxeHVJQ0FnSUNBZ2MyVnNaV04wYVc5dUlEMGdjM1ZuWjJWemRHbHZianRjYmlBZ0lDQWdJSE5sYkdWamRHbHZiaTVqYkdGemMwNWhiV1VnS3owZ0p5QnpaWGt0YzJWc1pXTjBaV1FuTzF4dUlDQWdJSDFjYmlBZ2ZWeHVYRzRnSUdaMWJtTjBhVzl1SUhWdWMyVnNaV04wSUNncElIdGNiaUFnSUNCcFppQW9jMlZzWldOMGFXOXVLU0I3WEc0Z0lDQWdJQ0J6Wld4bFkzUnBiMjR1WTJ4aGMzTk9ZVzFsSUQwZ2MyVnNaV04wYVc5dUxtTnNZWE56VG1GdFpTNXlaWEJzWVdObEtDOGdjMlY1TFhObGJHVmpkR1ZrTDJjc0lDY25LVHRjYmlBZ0lDQWdJSE5sYkdWamRHbHZiaUE5SUc1MWJHdzdYRzRnSUNBZ2ZWeHVJQ0I5WEc1Y2JpQWdablZ1WTNScGIyNGdiVzkyWlNBb2RYQXNJRzF2ZG1WektTQjdYRzRnSUNBZ2RtRnlJSFJ2ZEdGc0lEMGdkV3d1WTJocGJHUnlaVzR1YkdWdVozUm9PMXh1SUNBZ0lHbG1JQ2gwYjNSaGJDQThJRzF2ZG1WektTQjdYRzRnSUNBZ0lDQjFibk5sYkdWamRDZ3BPMXh1SUNBZ0lDQWdjbVYwZFhKdU8xeHVJQ0FnSUgxY2JpQWdJQ0JwWmlBb2RHOTBZV3dnUFQwOUlEQXBJSHRjYmlBZ0lDQWdJSEpsZEhWeWJqdGNiaUFnSUNCOVhHNGdJQ0FnZG1GeUlHWnBjbk4wSUQwZ2RYQWdQeUFuYkdGemRFTm9hV3hrSnlBNklDZG1hWEp6ZEVOb2FXeGtKenRjYmlBZ0lDQjJZWElnYm1WNGRDQTlJSFZ3SUQ4Z0ozQnlaWFpwYjNWelUybGliR2x1WnljZ09pQW5ibVY0ZEZOcFlteHBibWNuTzF4dUlDQWdJSFpoY2lCemRXZG5aWE4wYVc5dUlEMGdjMlZzWldOMGFXOXVJQ1ltSUhObGJHVmpkR2x2Ymx0dVpYaDBYU0I4ZkNCMWJGdG1hWEp6ZEYwN1hHNWNiaUFnSUNCelpXeGxZM1FvYzNWbloyVnpkR2x2YmlrN1hHNWNiaUFnSUNCcFppQW9hR2xrWkdWdUtITjFaMmRsYzNScGIyNHBLU0I3WEc0Z0lDQWdJQ0J0YjNabEtIVndMQ0J0YjNabGN5QS9JRzF2ZG1WeklDc2dNU0E2SURFcE8xeHVJQ0FnSUgxY2JpQWdmVnh1WEc0Z0lHWjFibU4wYVc5dUlHaHBaR1VnS0NrZ2UxeHVJQ0FnSUdWNVpTNXpiR1ZsY0NncE8xeHVJQ0FnSUhWc0xtTnNZWE56VG1GdFpTQTlJSFZzTG1Oc1lYTnpUbUZ0WlM1eVpYQnNZV05sS0M4Z2MyVjVMWE5vYjNjdlp5d2dKeWNwTzF4dUlDQWdJSFZ1YzJWc1pXTjBLQ2s3WEc0Z0lDQWdZM0p2YzNOMlpXNTBMbVpoWW5KcFkyRjBaU2hoZEhSaFkyaHRaVzUwTENBbmFHOXljMlY1TFdocFpHVW5LVHRjYmlBZ2ZWeHVYRzRnSUdaMWJtTjBhVzl1SUd0bGVXUnZkMjRnS0dVcElIdGNiaUFnSUNCMllYSWdjMmh2ZDI0Z1BTQjJhWE5wWW14bEtDazdYRzRnSUNBZ2RtRnlJSGRvYVdOb0lEMGdaUzUzYUdsamFDQjhmQ0JsTG10bGVVTnZaR1U3WEc0Z0lDQWdhV1lnS0hkb2FXTm9JRDA5UFNCTFJWbGZSRTlYVGlrZ2UxeHVJQ0FnSUNBZ2FXWWdLR0Z1ZVVsdWNIVjBJQ1ltSUc4dVlYVjBiMU5vYjNkUGJsVndSRzkzYmlrZ2UxeHVJQ0FnSUNBZ0lDQnphRzkzS0NrN1hHNGdJQ0FnSUNCOVhHNGdJQ0FnSUNCcFppQW9jMmh2ZDI0cElIdGNiaUFnSUNBZ0lDQWdiVzkyWlNncE8xeHVJQ0FnSUNBZ0lDQnpkRzl3S0dVcE8xeHVJQ0FnSUNBZ2ZWeHVJQ0FnSUgwZ1pXeHpaU0JwWmlBb2QyaHBZMmdnUFQwOUlFdEZXVjlWVUNrZ2UxeHVJQ0FnSUNBZ2FXWWdLR0Z1ZVVsdWNIVjBJQ1ltSUc4dVlYVjBiMU5vYjNkUGJsVndSRzkzYmlrZ2UxeHVJQ0FnSUNBZ0lDQnphRzkzS0NrN1hHNGdJQ0FnSUNCOVhHNGdJQ0FnSUNCcFppQW9jMmh2ZDI0cElIdGNiaUFnSUNBZ0lDQWdiVzkyWlNoMGNuVmxLVHRjYmlBZ0lDQWdJQ0FnYzNSdmNDaGxLVHRjYmlBZ0lDQWdJSDFjYmlBZ0lDQjlJR1ZzYzJVZ2FXWWdLSE5vYjNkdUtTQjdYRzRnSUNBZ0lDQnBaaUFvZDJocFkyZ2dQVDA5SUV0RldWOUZUbFJGVWlrZ2UxeHVJQ0FnSUNBZ0lDQnBaaUFvYzJWc1pXTjBhVzl1S1NCN1hHNGdJQ0FnSUNBZ0lDQWdZM0p2YzNOMlpXNTBMbVpoWW5KcFkyRjBaU2h6Wld4bFkzUnBiMjRzSUNkamJHbGpheWNwTzF4dUlDQWdJQ0FnSUNCOUlHVnNjMlVnZTF4dUlDQWdJQ0FnSUNBZ0lHaHBaR1VvS1R0Y2JpQWdJQ0FnSUNBZ2ZWeHVJQ0FnSUNBZ0lDQnpkRzl3S0dVcE8xeHVJQ0FnSUNBZ2ZTQmxiSE5sSUdsbUlDaDNhR2xqYUNBOVBUMGdTMFZaWDBWVFF5a2dlMXh1SUNBZ0lDQWdJQ0JvYVdSbEtDazdYRzRnSUNBZ0lDQWdJSE4wYjNBb1pTazdYRzRnSUNBZ0lDQjlYRzRnSUNBZ2ZWeHVJQ0I5WEc1Y2JpQWdablZ1WTNScGIyNGdjM1J2Y0NBb1pTa2dlMXh1SUNBZ0lHVXVjM1J2Y0ZCeWIzQmhaMkYwYVc5dUtDazdYRzRnSUNBZ1pTNXdjbVYyWlc1MFJHVm1ZWFZzZENncE8xeHVJQ0I5WEc1Y2JpQWdablZ1WTNScGIyNGdabWxzZEdWeWFXNW5JQ2dwSUh0Y2JpQWdJQ0JwWmlBb0lYWnBjMmxpYkdVb0tTa2dlMXh1SUNBZ0lDQWdjbVYwZFhKdU8xeHVJQ0FnSUgxY2JpQWdJQ0JqY205emMzWmxiblF1Wm1GaWNtbGpZWFJsS0dGMGRHRmphRzFsYm5Rc0lDZG9iM0p6WlhrdFptbHNkR1Z5SnlrN1hHNGdJQ0FnZG1GeUlHeHBJRDBnZFd3dVptbHljM1JEYUdsc1pEdGNiaUFnSUNCM2FHbHNaU0FvYkdrcElIdGNiaUFnSUNBZ0lHTnliM056ZG1WdWRDNW1ZV0p5YVdOaGRHVW9iR2tzSUNkb2IzSnpaWGt0Wm1sc2RHVnlKeWs3WEc0Z0lDQWdJQ0JzYVNBOUlHeHBMbTVsZUhSVGFXSnNhVzVuTzF4dUlDQWdJSDFjYmlBZ0lDQnBaaUFvSVhObGJHVmpkR2x2YmlrZ2UxeHVJQ0FnSUNBZ2JXOTJaU2dwTzF4dUlDQWdJSDFjYmlBZ0lDQnBaaUFvSVhObGJHVmpkR2x2YmlrZ2UxeHVJQ0FnSUNBZ2FHbGtaU2dwTzF4dUlDQWdJSDFjYmlBZ2ZWeHVYRzRnSUdaMWJtTjBhVzl1SUdSbFptVnljbVZrUm1sc2RHVnlhVzVuVG05RmJuUmxjaUFvWlNrZ2UxeHVJQ0FnSUhaaGNpQjNhR2xqYUNBOUlHVXVkMmhwWTJnZ2ZId2daUzVyWlhsRGIyUmxPMXh1SUNBZ0lHbG1JQ2gzYUdsamFDQTlQVDBnUzBWWlgwVk9WRVZTS1NCN1hHNGdJQ0FnSUNCeVpYUjFjbTQ3WEc0Z0lDQWdmVnh1SUNBZ0lHUmxabVZ5Y21Wa1JtbHNkR1Z5YVc1bktDazdYRzRnSUgxY2JseHVJQ0JtZFc1amRHbHZiaUJrWldabGNuSmxaRk5vYjNjZ0tHVXBJSHRjYmlBZ0lDQjJZWElnZDJocFkyZ2dQU0JsTG5kb2FXTm9JSHg4SUdVdWEyVjVRMjlrWlR0Y2JpQWdJQ0JwWmlBb2QyaHBZMmdnUFQwOUlFdEZXVjlGVGxSRlVpa2dlMXh1SUNBZ0lDQWdjbVYwZFhKdU8xeHVJQ0FnSUgxY2JpQWdJQ0J6WlhSVWFXMWxiM1YwS0hOb2IzY3NJREFwTzF4dUlDQjlYRzVjYmlBZ1puVnVZM1JwYjI0Z2FHOXljMlY1UlhabGJuUlVZWEpuWlhRZ0tHVXBJSHRjYmlBZ0lDQjJZWElnZEdGeVoyVjBJRDBnWlM1MFlYSm5aWFE3WEc0Z0lDQWdhV1lnS0hSaGNtZGxkQ0E5UFQwZ1lYUjBZV05vYldWdWRDa2dlMXh1SUNBZ0lDQWdjbVYwZFhKdUlIUnlkV1U3WEc0Z0lDQWdmVnh1SUNBZ0lIZG9hV3hsSUNoMFlYSm5aWFFwSUh0Y2JpQWdJQ0FnSUdsbUlDaDBZWEpuWlhRZ1BUMDlJSFZzSUh4OElIUmhjbWRsZENBOVBUMGdZWFIwWVdOb2JXVnVkQ2tnZTF4dUlDQWdJQ0FnSUNCeVpYUjFjbTRnZEhKMVpUdGNiaUFnSUNBZ0lIMWNiaUFnSUNBZ0lIUmhjbWRsZENBOUlIUmhjbWRsZEM1d1lYSmxiblJPYjJSbE8xeHVJQ0FnSUgxY2JpQWdmVnh1WEc0Z0lHWjFibU4wYVc5dUlHaHBaR1ZQYmtKc2RYSWdLR1VwSUh0Y2JpQWdJQ0JwWmlBb2FHOXljMlY1UlhabGJuUlVZWEpuWlhRb1pTa3BJSHRjYmlBZ0lDQWdJSEpsZEhWeWJqdGNiaUFnSUNCOVhHNGdJQ0FnYUdsa1pTZ3BPMXh1SUNCOVhHNWNiaUFnWm5WdVkzUnBiMjRnYUdsa1pVOXVRMnhwWTJzZ0tHVXBJSHRjYmlBZ0lDQnBaaUFvYUc5eWMyVjVSWFpsYm5SVVlYSm5aWFFvWlNrcElIdGNiaUFnSUNBZ0lISmxkSFZ5Ymp0Y2JpQWdJQ0I5WEc0Z0lDQWdhR2xrWlNncE8xeHVJQ0I5WEc1Y2JpQWdablZ1WTNScGIyNGdhVzV3ZFhSRmRtVnVkSE1nS0hKbGJXOTJaU2tnZTF4dUlDQWdJSFpoY2lCdmNDQTlJSEpsYlc5MlpTQS9JQ2R5WlcxdmRtVW5JRG9nSjJGa1pDYzdYRzRnSUNBZ2FXWWdLR1Y1WlNrZ2UxeHVJQ0FnSUNBZ1pYbGxMbVJsYzNSeWIza29LVHRjYmlBZ0lDQWdJR1Y1WlNBOUlHNTFiR3c3WEc0Z0lDQWdmVnh1SUNBZ0lHbG1JQ2doY21WdGIzWmxLU0I3WEc0Z0lDQWdJQ0JsZVdVZ1BTQmlkV3hzYzJWNVpTaDFiQ3dnWVhSMFlXTm9iV1Z1ZEN3Z2V5QmpZWEpsZERvZ1lXNTVTVzV3ZFhRZ0ppWWdZWFIwWVdOb2JXVnVkQzUwWVdkT1lXMWxJQ0U5UFNBblNVNVFWVlFuTENCblpYUlRaV3hsWTNScGIyNDZJR2RsZEZObGJHVmpkR2x2YmlCOUtUdGNiaUFnSUNBZ0lHbG1JQ2doZG1semFXSnNaU2dwS1NCN0lHVjVaUzV6YkdWbGNDZ3BPeUI5WEc0Z0lDQWdmVnh1SUNBZ0lHbG1JQ2gwZVhCbGIyWWdjM1ZuWjJWemRHbHZibk1nUFQwOUlDZG1kVzVqZEdsdmJpY2dKaVlnSVc5dVpXeHZZV1F1ZFhObFpDa2dlMXh1SUNBZ0lDQWdhV1lnS0hKbGJXOTJaU0I4ZkNBb1lXNTVTVzV3ZFhRZ0ppWWdaRzlqTG1GamRHbDJaVVZzWlcxbGJuUWdJVDA5SUdGMGRHRmphRzFsYm5RcEtTQjdYRzRnSUNBZ0lDQWdJR055YjNOemRtVnVkRnR2Y0Ywb1lYUjBZV05vYldWdWRDd2dKMlp2WTNWekp5d2diMjVsYkc5aFpDazdYRzRnSUNBZ0lDQjlJR1ZzYzJVZ2UxeHVJQ0FnSUNBZ0lDQnZibVZzYjJGa0tDazdYRzRnSUNBZ0lDQjlYRzRnSUNBZ2ZWeHVJQ0FnSUdsbUlDaGhibmxKYm5CMWRDa2dlMXh1SUNBZ0lDQWdZM0p2YzNOMlpXNTBXMjl3WFNoaGRIUmhZMmh0Wlc1MExDQW5hMlY1Y0hKbGMzTW5MQ0JrWldabGNuSmxaRk5vYjNjcE8xeHVJQ0FnSUNBZ1kzSnZjM04yWlc1MFcyOXdYU2hoZEhSaFkyaHRaVzUwTENBbmEyVjVjSEpsYzNNbkxDQmtaV1psY25KbFpFWnBiSFJsY21sdVp5azdYRzRnSUNBZ0lDQmpjbTl6YzNabGJuUmJiM0JkS0dGMGRHRmphRzFsYm5Rc0lDZHJaWGxrYjNkdUp5d2daR1ZtWlhKeVpXUkdhV3gwWlhKcGJtZE9iMFZ1ZEdWeUtUdGNiaUFnSUNBZ0lHTnliM056ZG1WdWRGdHZjRjBvWVhSMFlXTm9iV1Z1ZEN3Z0ozQmhjM1JsSnl3Z1pHVm1aWEp5WldSR2FXeDBaWEpwYm1jcE8xeHVJQ0FnSUNBZ1kzSnZjM04yWlc1MFcyOXdYU2hoZEhSaFkyaHRaVzUwTENBbmEyVjVaRzkzYmljc0lHdGxlV1J2ZDI0cE8xeHVJQ0FnSUNBZ2FXWWdLRzh1WVhWMGIwaHBaR1ZQYmtKc2RYSXBJSHNnWTNKdmMzTjJaVzUwVzI5d1hTaGtiMk5GYkdWdFpXNTBMQ0FuWm05amRYTW5MQ0JvYVdSbFQyNUNiSFZ5TENCMGNuVmxLVHNnZlZ4dUlDQWdJSDBnWld4elpTQjdYRzRnSUNBZ0lDQmpjbTl6YzNabGJuUmJiM0JkS0dGMGRHRmphRzFsYm5Rc0lDZGpiR2xqYXljc0lIUnZaMmRzWlNrN1hHNGdJQ0FnSUNCamNtOXpjM1psYm5SYmIzQmRLR1J2WTBWc1pXMWxiblFzSUNkclpYbGtiM2R1Snl3Z2EyVjVaRzkzYmlrN1hHNGdJQ0FnZlZ4dUlDQWdJR2xtSUNodkxtRjFkRzlJYVdSbFQyNURiR2xqYXlrZ2V5QmpjbTl6YzNabGJuUmJiM0JkS0dSdll5d2dKMk5zYVdOckp5d2dhR2xrWlU5dVEyeHBZMnNwT3lCOVhHNGdJQ0FnYVdZZ0tHWnZjbTBwSUhzZ1kzSnZjM04yWlc1MFcyOXdYU2htYjNKdExDQW5jM1ZpYldsMEp5d2dhR2xrWlNrN0lIMWNiaUFnZlZ4dVhHNGdJR1oxYm1OMGFXOXVJR1JsYzNSeWIza2dLQ2tnZTF4dUlDQWdJR2x1Y0hWMFJYWmxiblJ6S0hSeWRXVXBPMXh1SUNBZ0lHbG1JQ2h3WVhKbGJuUXVZMjl1ZEdGcGJuTW9kV3dwS1NCN0lIQmhjbVZ1ZEM1eVpXMXZkbVZEYUdsc1pDaDFiQ2s3SUgxY2JpQWdJQ0JqWVdOb1pTNXpjR3hwWTJVb1kyRmphR1V1YVc1a1pYaFBaaWhsYm5SeWVTa3NJREVwTzF4dUlDQjlYRzVjYmlBZ1puVnVZM1JwYjI0Z1pHVm1ZWFZzZEZObGRIUmxjaUFvZG1Gc2RXVXBJSHRjYmlBZ0lDQnBaaUFvZEdWNGRFbHVjSFYwS1NCN1hHNGdJQ0FnSUNCbGJDNTJZV3gxWlNBOUlIWmhiSFZsTzF4dUlDQWdJSDBnWld4elpTQjdYRzRnSUNBZ0lDQmxiQzVwYm01bGNraFVUVXdnUFNCMllXeDFaVHRjYmlBZ0lDQjlYRzRnSUgxY2JseHVJQ0JtZFc1amRHbHZiaUJrWldaaGRXeDBVbVZ1WkdWeVpYSWdLR3hwTENCemRXZG5aWE4wYVc5dUtTQjdYRzRnSUNBZ2JHa3VhVzV1WlhKVVpYaDBJRDBnYkdrdWRHVjRkRU52Ym5SbGJuUWdQU0JuWlhSVVpYaDBLSE4xWjJkbGMzUnBiMjRwTzF4dUlDQjlYRzVjYmlBZ1puVnVZM1JwYjI0Z1pHVm1ZWFZzZEVacGJIUmxjaUFvY1N3Z2MzVm5aMlZ6ZEdsdmJpa2dlMXh1SUNBZ0lIWmhjaUIwWlhoMElEMGdaMlYwVkdWNGRDaHpkV2RuWlhOMGFXOXVLU0I4ZkNBbkp6dGNiaUFnSUNCMllYSWdkbUZzZFdVZ1BTQm5aWFJXWVd4MVpTaHpkV2RuWlhOMGFXOXVLU0I4ZkNBbkp6dGNiaUFnSUNCeVpYUjFjbTRnWm5WNmVubHpaV0Z5WTJnb2NTd2dkR1Y0ZEM1MGIweHZkMlZ5UTJGelpTZ3BLU0I4ZkNCbWRYcDZlWE5sWVhKamFDaHhMQ0IyWVd4MVpTNTBiMHh2ZDJWeVEyRnpaU2dwS1R0Y2JpQWdmVnh1ZlZ4dVhHNW1kVzVqZEdsdmJpQmtaV1poZFd4MFIyVjBWbUZzZFdVZ0tITjFaMmRsYzNScGIyNHBJSHRjYmlBZ2NtVjBkWEp1SUhSNWNHVnZaaUJ6ZFdkblpYTjBhVzl1SUQwOVBTQW5jM1J5YVc1bkp5QS9JSE4xWjJkbGMzUnBiMjRnT2lCemRXZG5aWE4wYVc5dUxuWmhiSFZsTzF4dWZWeHVYRzVtZFc1amRHbHZiaUJrWldaaGRXeDBSMlYwVkdWNGRDQW9jM1ZuWjJWemRHbHZiaWtnZTF4dUlDQnlaWFIxY200Z2RIbHdaVzltSUhOMVoyZGxjM1JwYjI0Z1BUMDlJQ2R6ZEhKcGJtY25JRDhnYzNWbloyVnpkR2x2YmlBNklITjFaMmRsYzNScGIyNHVkR1Y0ZER0Y2JuMWNibHh1Wm5WdVkzUnBiMjRnZEdGbklDaDBlWEJsTENCamJHRnpjMDVoYldVcElIdGNiaUFnZG1GeUlHVnNJRDBnWkc5akxtTnlaV0YwWlVWc1pXMWxiblFvZEhsd1pTazdYRzRnSUdWc0xtTnNZWE56VG1GdFpTQTlJR05zWVhOelRtRnRaVHRjYmlBZ2NtVjBkWEp1SUdWc08xeHVmVnh1WEc1bWRXNWpkR2x2YmlCdmJtTmxJQ2htYmlrZ2UxeHVJQ0IyWVhJZ1pHbHpjRzl6WldRN1hHNGdJR1oxYm1OMGFXOXVJR1JwYzNCdmMyRmliR1VnS0NrZ2UxeHVJQ0FnSUdsbUlDaGthWE53YjNObFpDa2dleUJ5WlhSMWNtNDdJSDFjYmlBZ0lDQmthWE53YjNOaFlteGxMblZ6WldRZ1BTQmthWE53YjNObFpDQTlJSFJ5ZFdVN1hHNGdJQ0FnS0dadUlIeDhJRzV2YjNBcExtRndjR3g1S0c1MWJHd3NJR0Z5WjNWdFpXNTBjeWs3WEc0Z0lIMWNiaUFnY21WMGRYSnVJR1JwYzNCdmMyRmliR1U3WEc1OVhHNW1kVzVqZEdsdmJpQmtaV1psY2lBb1ptNHBJSHNnY21WMGRYSnVJR1oxYm1OMGFXOXVJQ2dwSUhzZ2MyVjBWR2x0Wlc5MWRDaG1iaXdnTUNrN0lIMDdJSDFjYm1aMWJtTjBhVzl1SUc1dmIzQWdLQ2tnZTMxY2JseHVablZ1WTNScGIyNGdhWE5GWkdsMFlXSnNaU0FvWld3cElIdGNiaUFnZG1GeUlIWmhiSFZsSUQwZ1pXd3VaMlYwUVhSMGNtbGlkWFJsS0NkamIyNTBaVzUwUldScGRHRmliR1VuS1R0Y2JpQWdhV1lnS0haaGJIVmxJRDA5UFNBblptRnNjMlVuS1NCN1hHNGdJQ0FnY21WMGRYSnVJR1poYkhObE8xeHVJQ0I5WEc0Z0lHbG1JQ2gyWVd4MVpTQTlQVDBnSjNSeWRXVW5LU0I3WEc0Z0lDQWdjbVYwZFhKdUlIUnlkV1U3WEc0Z0lIMWNiaUFnYVdZZ0tHVnNMbkJoY21WdWRFVnNaVzFsYm5RcElIdGNiaUFnSUNCeVpYUjFjbTRnYVhORlpHbDBZV0pzWlNobGJDNXdZWEpsYm5SRmJHVnRaVzUwS1R0Y2JpQWdmVnh1SUNCeVpYUjFjbTRnWm1Gc2MyVTdYRzU5WEc1Y2JtaHZjbk5sZVM1bWFXNWtJRDBnWm1sdVpEdGNibTF2WkhWc1pTNWxlSEJ2Y25SeklEMGdhRzl5YzJWNU8xeHVJbDE5IiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgY3Jvc3N2ZW50ID0gcmVxdWlyZSgnY3Jvc3N2ZW50Jyk7XG52YXIgdGhyb3R0bGUgPSByZXF1aXJlKCcuL3Rocm90dGxlJyk7XG52YXIgdGFpbG9ybWFkZSA9IHJlcXVpcmUoJy4vdGFpbG9ybWFkZScpO1xuXG5mdW5jdGlvbiBidWxsc2V5ZSAoZWwsIHRhcmdldCwgb3B0aW9ucykge1xuICB2YXIgbyA9IG9wdGlvbnM7XG4gIHZhciBkb21UYXJnZXQgPSB0YXJnZXQgJiYgdGFyZ2V0LnRhZ05hbWU7XG5cbiAgaWYgKCFkb21UYXJnZXQgJiYgYXJndW1lbnRzLmxlbmd0aCA9PT0gMikge1xuICAgIG8gPSB0YXJnZXQ7XG4gIH1cbiAgaWYgKCFkb21UYXJnZXQpIHtcbiAgICB0YXJnZXQgPSBlbDtcbiAgfVxuICBpZiAoIW8pIHsgbyA9IHt9OyB9XG5cbiAgdmFyIGRlc3Ryb3llZCA9IGZhbHNlO1xuICB2YXIgdGhyb3R0bGVkV3JpdGUgPSB0aHJvdHRsZSh3cml0ZSwgMzApO1xuICB2YXIgdGFpbG9yT3B0aW9ucyA9IHsgdXBkYXRlOiBvLmF1dG91cGRhdGVUb0NhcmV0ICE9PSBmYWxzZSAmJiB1cGRhdGUgfTtcbiAgdmFyIHRhaWxvciA9IG8uY2FyZXQgJiYgdGFpbG9ybWFkZSh0YXJnZXQsIHRhaWxvck9wdGlvbnMpO1xuXG4gIHdyaXRlKCk7XG5cbiAgaWYgKG8udHJhY2tpbmcgIT09IGZhbHNlKSB7XG4gICAgY3Jvc3N2ZW50LmFkZCh3aW5kb3csICdyZXNpemUnLCB0aHJvdHRsZWRXcml0ZSk7XG4gIH1cblxuICByZXR1cm4ge1xuICAgIHJlYWQ6IHJlYWROdWxsLFxuICAgIHJlZnJlc2g6IHdyaXRlLFxuICAgIGRlc3Ryb3k6IGRlc3Ryb3ksXG4gICAgc2xlZXA6IHNsZWVwXG4gIH07XG5cbiAgZnVuY3Rpb24gc2xlZXAgKCkge1xuICAgIHRhaWxvck9wdGlvbnMuc2xlZXBpbmcgPSB0cnVlO1xuICB9XG5cbiAgZnVuY3Rpb24gcmVhZE51bGwgKCkgeyByZXR1cm4gcmVhZCgpOyB9XG5cbiAgZnVuY3Rpb24gcmVhZCAocmVhZGluZ3MpIHtcbiAgICB2YXIgYm91bmRzID0gdGFyZ2V0LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgIHZhciBzY3JvbGxUb3AgPSBkb2N1bWVudC5ib2R5LnNjcm9sbFRvcCB8fCBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc2Nyb2xsVG9wO1xuICAgIGlmICh0YWlsb3IpIHtcbiAgICAgIHJlYWRpbmdzID0gdGFpbG9yLnJlYWQoKTtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIHg6IChyZWFkaW5ncy5hYnNvbHV0ZSA/IDAgOiBib3VuZHMubGVmdCkgKyByZWFkaW5ncy54LFxuICAgICAgICB5OiAocmVhZGluZ3MuYWJzb2x1dGUgPyAwIDogYm91bmRzLnRvcCkgKyBzY3JvbGxUb3AgKyByZWFkaW5ncy55ICsgMjBcbiAgICAgIH07XG4gICAgfVxuICAgIHJldHVybiB7XG4gICAgICB4OiBib3VuZHMubGVmdCxcbiAgICAgIHk6IGJvdW5kcy50b3AgKyBzY3JvbGxUb3BcbiAgICB9O1xuICB9XG5cbiAgZnVuY3Rpb24gdXBkYXRlIChyZWFkaW5ncykge1xuICAgIHdyaXRlKHJlYWRpbmdzKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHdyaXRlIChyZWFkaW5ncykge1xuICAgIGlmIChkZXN0cm95ZWQpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignQnVsbHNleWUgY2FuXFwndCByZWZyZXNoIGFmdGVyIGJlaW5nIGRlc3Ryb3llZC4gQ3JlYXRlIGFub3RoZXIgaW5zdGFuY2UgaW5zdGVhZC4nKTtcbiAgICB9XG4gICAgaWYgKHRhaWxvciAmJiAhcmVhZGluZ3MpIHtcbiAgICAgIHRhaWxvck9wdGlvbnMuc2xlZXBpbmcgPSBmYWxzZTtcbiAgICAgIHRhaWxvci5yZWZyZXNoKCk7IHJldHVybjtcbiAgICB9XG4gICAgdmFyIHAgPSByZWFkKHJlYWRpbmdzKTtcbiAgICBpZiAoIXRhaWxvciAmJiB0YXJnZXQgIT09IGVsKSB7XG4gICAgICBwLnkgKz0gdGFyZ2V0Lm9mZnNldEhlaWdodDtcbiAgICB9XG4gICAgZWwuc3R5bGUubGVmdCA9IHAueCArICdweCc7XG4gICAgZWwuc3R5bGUudG9wID0gcC55ICsgJ3B4JztcbiAgfVxuXG4gIGZ1bmN0aW9uIGRlc3Ryb3kgKCkge1xuICAgIGlmICh0YWlsb3IpIHsgdGFpbG9yLmRlc3Ryb3koKTsgfVxuICAgIGNyb3NzdmVudC5yZW1vdmUod2luZG93LCAncmVzaXplJywgdGhyb3R0bGVkV3JpdGUpO1xuICAgIGRlc3Ryb3llZCA9IHRydWU7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBidWxsc2V5ZTtcbiIsIihmdW5jdGlvbiAoZ2xvYmFsKXtcbid1c2Ugc3RyaWN0JztcblxudmFyIGRvYyA9IGRvY3VtZW50O1xudmFyIGFkZEV2ZW50ID0gYWRkRXZlbnRFYXN5O1xudmFyIHJlbW92ZUV2ZW50ID0gcmVtb3ZlRXZlbnRFYXN5O1xudmFyIGhhcmRDYWNoZSA9IFtdO1xuXG5pZiAoIWdsb2JhbC5hZGRFdmVudExpc3RlbmVyKSB7XG4gIGFkZEV2ZW50ID0gYWRkRXZlbnRIYXJkO1xuICByZW1vdmVFdmVudCA9IHJlbW92ZUV2ZW50SGFyZDtcbn1cblxuZnVuY3Rpb24gYWRkRXZlbnRFYXN5IChlbCwgdHlwZSwgZm4sIGNhcHR1cmluZykge1xuICByZXR1cm4gZWwuYWRkRXZlbnRMaXN0ZW5lcih0eXBlLCBmbiwgY2FwdHVyaW5nKTtcbn1cblxuZnVuY3Rpb24gYWRkRXZlbnRIYXJkIChlbCwgdHlwZSwgZm4pIHtcbiAgcmV0dXJuIGVsLmF0dGFjaEV2ZW50KCdvbicgKyB0eXBlLCB3cmFwKGVsLCB0eXBlLCBmbikpO1xufVxuXG5mdW5jdGlvbiByZW1vdmVFdmVudEVhc3kgKGVsLCB0eXBlLCBmbiwgY2FwdHVyaW5nKSB7XG4gIHJldHVybiBlbC5yZW1vdmVFdmVudExpc3RlbmVyKHR5cGUsIGZuLCBjYXB0dXJpbmcpO1xufVxuXG5mdW5jdGlvbiByZW1vdmVFdmVudEhhcmQgKGVsLCB0eXBlLCBmbikge1xuICByZXR1cm4gZWwuZGV0YWNoRXZlbnQoJ29uJyArIHR5cGUsIHVud3JhcChlbCwgdHlwZSwgZm4pKTtcbn1cblxuZnVuY3Rpb24gZmFicmljYXRlRXZlbnQgKGVsLCB0eXBlKSB7XG4gIHZhciBlO1xuICBpZiAoZG9jLmNyZWF0ZUV2ZW50KSB7XG4gICAgZSA9IGRvYy5jcmVhdGVFdmVudCgnRXZlbnQnKTtcbiAgICBlLmluaXRFdmVudCh0eXBlLCB0cnVlLCB0cnVlKTtcbiAgICBlbC5kaXNwYXRjaEV2ZW50KGUpO1xuICB9IGVsc2UgaWYgKGRvYy5jcmVhdGVFdmVudE9iamVjdCkge1xuICAgIGUgPSBkb2MuY3JlYXRlRXZlbnRPYmplY3QoKTtcbiAgICBlbC5maXJlRXZlbnQoJ29uJyArIHR5cGUsIGUpO1xuICB9XG59XG5cbmZ1bmN0aW9uIHdyYXBwZXJGYWN0b3J5IChlbCwgdHlwZSwgZm4pIHtcbiAgcmV0dXJuIGZ1bmN0aW9uIHdyYXBwZXIgKG9yaWdpbmFsRXZlbnQpIHtcbiAgICB2YXIgZSA9IG9yaWdpbmFsRXZlbnQgfHwgZ2xvYmFsLmV2ZW50O1xuICAgIGUudGFyZ2V0ID0gZS50YXJnZXQgfHwgZS5zcmNFbGVtZW50O1xuICAgIGUucHJldmVudERlZmF1bHQgID0gZS5wcmV2ZW50RGVmYXVsdCAgfHwgZnVuY3Rpb24gcHJldmVudERlZmF1bHQgKCkgeyBlLnJldHVyblZhbHVlID0gZmFsc2U7IH07XG4gICAgZS5zdG9wUHJvcGFnYXRpb24gPSBlLnN0b3BQcm9wYWdhdGlvbiB8fCBmdW5jdGlvbiBzdG9wUHJvcGFnYXRpb24gKCkgeyBlLmNhbmNlbEJ1YmJsZSA9IHRydWU7IH07XG4gICAgZm4uY2FsbChlbCwgZSk7XG4gIH07XG59XG5cbmZ1bmN0aW9uIHdyYXAgKGVsLCB0eXBlLCBmbikge1xuICB2YXIgd3JhcHBlciA9IHVud3JhcChlbCwgdHlwZSwgZm4pIHx8IHdyYXBwZXJGYWN0b3J5KGVsLCB0eXBlLCBmbik7XG4gIGhhcmRDYWNoZS5wdXNoKHtcbiAgICB3cmFwcGVyOiB3cmFwcGVyLFxuICAgIGVsZW1lbnQ6IGVsLFxuICAgIHR5cGU6IHR5cGUsXG4gICAgZm46IGZuXG4gIH0pO1xuICByZXR1cm4gd3JhcHBlcjtcbn1cblxuZnVuY3Rpb24gdW53cmFwIChlbCwgdHlwZSwgZm4pIHtcbiAgdmFyIGkgPSBmaW5kKGVsLCB0eXBlLCBmbik7XG4gIGlmIChpKSB7XG4gICAgdmFyIHdyYXBwZXIgPSBoYXJkQ2FjaGVbaV0ud3JhcHBlcjtcbiAgICBoYXJkQ2FjaGUuc3BsaWNlKGksIDEpOyAvLyBmcmVlIHVwIGEgdGFkIG9mIG1lbW9yeVxuICAgIHJldHVybiB3cmFwcGVyO1xuICB9XG59XG5cbmZ1bmN0aW9uIGZpbmQgKGVsLCB0eXBlLCBmbikge1xuICB2YXIgaSwgaXRlbTtcbiAgZm9yIChpID0gMDsgaSA8IGhhcmRDYWNoZS5sZW5ndGg7IGkrKykge1xuICAgIGl0ZW0gPSBoYXJkQ2FjaGVbaV07XG4gICAgaWYgKGl0ZW0uZWxlbWVudCA9PT0gZWwgJiYgaXRlbS50eXBlID09PSB0eXBlICYmIGl0ZW0uZm4gPT09IGZuKSB7XG4gICAgICByZXR1cm4gaTtcbiAgICB9XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIGFkZDogYWRkRXZlbnQsXG4gIHJlbW92ZTogcmVtb3ZlRXZlbnQsXG4gIGZhYnJpY2F0ZTogZmFicmljYXRlRXZlbnRcbn07XG5cbn0pLmNhbGwodGhpcyx0eXBlb2YgZ2xvYmFsICE9PSBcInVuZGVmaW5lZFwiID8gZ2xvYmFsIDogdHlwZW9mIHNlbGYgIT09IFwidW5kZWZpbmVkXCIgPyBzZWxmIDogdHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiA/IHdpbmRvdyA6IHt9KVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ6dXRmLTg7YmFzZTY0LGV5SjJaWEp6YVc5dUlqb3pMQ0p6YjNWeVkyVnpJanBiSW01dlpHVmZiVzlrZFd4bGN5OWlkV3hzYzJWNVpTOXViMlJsWDIxdlpIVnNaWE12WTNKdmMzTjJaVzUwTDNOeVl5OWpjbTl6YzNabGJuUXVhbk1pWFN3aWJtRnRaWE1pT2x0ZExDSnRZWEJ3YVc1bmN5STZJanRCUVVGQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRWlMQ0ptYVd4bElqb2laMlZ1WlhKaGRHVmtMbXB6SWl3aWMyOTFjbU5sVW05dmRDSTZJaUlzSW5OdmRYSmpaWE5EYjI1MFpXNTBJanBiSWlkMWMyVWdjM1J5YVdOMEp6dGNibHh1ZG1GeUlHUnZZeUE5SUdSdlkzVnRaVzUwTzF4dWRtRnlJR0ZrWkVWMlpXNTBJRDBnWVdSa1JYWmxiblJGWVhONU8xeHVkbUZ5SUhKbGJXOTJaVVYyWlc1MElEMGdjbVZ0YjNabFJYWmxiblJGWVhONU8xeHVkbUZ5SUdoaGNtUkRZV05vWlNBOUlGdGRPMXh1WEc1cFppQW9JV2RzYjJKaGJDNWhaR1JGZG1WdWRFeHBjM1JsYm1WeUtTQjdYRzRnSUdGa1pFVjJaVzUwSUQwZ1lXUmtSWFpsYm5SSVlYSmtPMXh1SUNCeVpXMXZkbVZGZG1WdWRDQTlJSEpsYlc5MlpVVjJaVzUwU0dGeVpEdGNibjFjYmx4dVpuVnVZM1JwYjI0Z1lXUmtSWFpsYm5SRllYTjVJQ2hsYkN3Z2RIbHdaU3dnWm00c0lHTmhjSFIxY21sdVp5a2dlMXh1SUNCeVpYUjFjbTRnWld3dVlXUmtSWFpsYm5STWFYTjBaVzVsY2loMGVYQmxMQ0JtYml3Z1kyRndkSFZ5YVc1bktUdGNibjFjYmx4dVpuVnVZM1JwYjI0Z1lXUmtSWFpsYm5SSVlYSmtJQ2hsYkN3Z2RIbHdaU3dnWm00cElIdGNiaUFnY21WMGRYSnVJR1ZzTG1GMGRHRmphRVYyWlc1MEtDZHZiaWNnS3lCMGVYQmxMQ0IzY21Gd0tHVnNMQ0IwZVhCbExDQm1iaWtwTzF4dWZWeHVYRzVtZFc1amRHbHZiaUJ5WlcxdmRtVkZkbVZ1ZEVWaGMza2dLR1ZzTENCMGVYQmxMQ0JtYml3Z1kyRndkSFZ5YVc1bktTQjdYRzRnSUhKbGRIVnliaUJsYkM1eVpXMXZkbVZGZG1WdWRFeHBjM1JsYm1WeUtIUjVjR1VzSUdadUxDQmpZWEIwZFhKcGJtY3BPMXh1ZlZ4dVhHNW1kVzVqZEdsdmJpQnlaVzF2ZG1WRmRtVnVkRWhoY21RZ0tHVnNMQ0IwZVhCbExDQm1iaWtnZTF4dUlDQnlaWFIxY200Z1pXd3VaR1YwWVdOb1JYWmxiblFvSjI5dUp5QXJJSFI1Y0dVc0lIVnVkM0poY0NobGJDd2dkSGx3WlN3Z1ptNHBLVHRjYm4xY2JseHVablZ1WTNScGIyNGdabUZpY21sallYUmxSWFpsYm5RZ0tHVnNMQ0IwZVhCbEtTQjdYRzRnSUhaaGNpQmxPMXh1SUNCcFppQW9aRzlqTG1OeVpXRjBaVVYyWlc1MEtTQjdYRzRnSUNBZ1pTQTlJR1J2WXk1amNtVmhkR1ZGZG1WdWRDZ25SWFpsYm5RbktUdGNiaUFnSUNCbExtbHVhWFJGZG1WdWRDaDBlWEJsTENCMGNuVmxMQ0IwY25WbEtUdGNiaUFnSUNCbGJDNWthWE53WVhSamFFVjJaVzUwS0dVcE8xeHVJQ0I5SUdWc2MyVWdhV1lnS0dSdll5NWpjbVZoZEdWRmRtVnVkRTlpYW1WamRDa2dlMXh1SUNBZ0lHVWdQU0JrYjJNdVkzSmxZWFJsUlhabGJuUlBZbXBsWTNRb0tUdGNiaUFnSUNCbGJDNW1hWEpsUlhabGJuUW9KMjl1SnlBcklIUjVjR1VzSUdVcE8xeHVJQ0I5WEc1OVhHNWNibVoxYm1OMGFXOXVJSGR5WVhCd1pYSkdZV04wYjNKNUlDaGxiQ3dnZEhsd1pTd2dabTRwSUh0Y2JpQWdjbVYwZFhKdUlHWjFibU4wYVc5dUlIZHlZWEJ3WlhJZ0tHOXlhV2RwYm1Gc1JYWmxiblFwSUh0Y2JpQWdJQ0IyWVhJZ1pTQTlJRzl5YVdkcGJtRnNSWFpsYm5RZ2ZId2daMnh2WW1Gc0xtVjJaVzUwTzF4dUlDQWdJR1V1ZEdGeVoyVjBJRDBnWlM1MFlYSm5aWFFnZkh3Z1pTNXpjbU5GYkdWdFpXNTBPMXh1SUNBZ0lHVXVjSEpsZG1WdWRFUmxabUYxYkhRZ0lEMGdaUzV3Y21WMlpXNTBSR1ZtWVhWc2RDQWdmSHdnWm5WdVkzUnBiMjRnY0hKbGRtVnVkRVJsWm1GMWJIUWdLQ2tnZXlCbExuSmxkSFZ5YmxaaGJIVmxJRDBnWm1Gc2MyVTdJSDA3WEc0Z0lDQWdaUzV6ZEc5d1VISnZjR0ZuWVhScGIyNGdQU0JsTG5OMGIzQlFjbTl3WVdkaGRHbHZiaUI4ZkNCbWRXNWpkR2x2YmlCemRHOXdVSEp2Y0dGbllYUnBiMjRnS0NrZ2V5QmxMbU5oYm1ObGJFSjFZbUpzWlNBOUlIUnlkV1U3SUgwN1hHNGdJQ0FnWm00dVkyRnNiQ2hsYkN3Z1pTazdYRzRnSUgwN1hHNTlYRzVjYm1aMWJtTjBhVzl1SUhkeVlYQWdLR1ZzTENCMGVYQmxMQ0JtYmlrZ2UxeHVJQ0IyWVhJZ2QzSmhjSEJsY2lBOUlIVnVkM0poY0NobGJDd2dkSGx3WlN3Z1ptNHBJSHg4SUhkeVlYQndaWEpHWVdOMGIzSjVLR1ZzTENCMGVYQmxMQ0JtYmlrN1hHNGdJR2hoY21SRFlXTm9aUzV3ZFhOb0tIdGNiaUFnSUNCM2NtRndjR1Z5T2lCM2NtRndjR1Z5TEZ4dUlDQWdJR1ZzWlcxbGJuUTZJR1ZzTEZ4dUlDQWdJSFI1Y0dVNklIUjVjR1VzWEc0Z0lDQWdabTQ2SUdadVhHNGdJSDBwTzF4dUlDQnlaWFIxY200Z2QzSmhjSEJsY2p0Y2JuMWNibHh1Wm5WdVkzUnBiMjRnZFc1M2NtRndJQ2hsYkN3Z2RIbHdaU3dnWm00cElIdGNiaUFnZG1GeUlHa2dQU0JtYVc1a0tHVnNMQ0IwZVhCbExDQm1iaWs3WEc0Z0lHbG1JQ2hwS1NCN1hHNGdJQ0FnZG1GeUlIZHlZWEJ3WlhJZ1BTQm9ZWEprUTJGamFHVmJhVjB1ZDNKaGNIQmxjanRjYmlBZ0lDQm9ZWEprUTJGamFHVXVjM0JzYVdObEtHa3NJREVwT3lBdkx5Qm1jbVZsSUhWd0lHRWdkR0ZrSUc5bUlHMWxiVzl5ZVZ4dUlDQWdJSEpsZEhWeWJpQjNjbUZ3Y0dWeU8xeHVJQ0I5WEc1OVhHNWNibVoxYm1OMGFXOXVJR1pwYm1RZ0tHVnNMQ0IwZVhCbExDQm1iaWtnZTF4dUlDQjJZWElnYVN3Z2FYUmxiVHRjYmlBZ1ptOXlJQ2hwSUQwZ01Ec2dhU0E4SUdoaGNtUkRZV05vWlM1c1pXNW5kR2c3SUdrckt5a2dlMXh1SUNBZ0lHbDBaVzBnUFNCb1lYSmtRMkZqYUdWYmFWMDdYRzRnSUNBZ2FXWWdLR2wwWlcwdVpXeGxiV1Z1ZENBOVBUMGdaV3dnSmlZZ2FYUmxiUzUwZVhCbElEMDlQU0IwZVhCbElDWW1JR2wwWlcwdVptNGdQVDA5SUdadUtTQjdYRzRnSUNBZ0lDQnlaWFIxY200Z2FUdGNiaUFnSUNCOVhHNGdJSDFjYm4xY2JseHViVzlrZFd4bExtVjRjRzl5ZEhNZ1BTQjdYRzRnSUdGa1pEb2dZV1JrUlhabGJuUXNYRzRnSUhKbGJXOTJaVG9nY21WdGIzWmxSWFpsYm5Rc1hHNGdJR1poWW5KcFkyRjBaVG9nWm1GaWNtbGpZWFJsUlhabGJuUmNibjA3WEc0aVhYMD0iLCIndXNlIHN0cmljdCc7XG5cbnZhciBnZXQgPSBlYXN5R2V0O1xudmFyIHNldCA9IGVhc3lTZXQ7XG5cbmlmIChkb2N1bWVudC5zZWxlY3Rpb24gJiYgZG9jdW1lbnQuc2VsZWN0aW9uLmNyZWF0ZVJhbmdlKSB7XG4gIGdldCA9IGhhcmRHZXQ7XG4gIHNldCA9IGhhcmRTZXQ7XG59XG5cbmZ1bmN0aW9uIGVhc3lHZXQgKGVsKSB7XG4gIHJldHVybiB7XG4gICAgc3RhcnQ6IGVsLnNlbGVjdGlvblN0YXJ0LFxuICAgIGVuZDogZWwuc2VsZWN0aW9uRW5kXG4gIH07XG59XG5cbmZ1bmN0aW9uIGhhcmRHZXQgKGVsKSB7XG4gIHZhciBhY3RpdmUgPSBkb2N1bWVudC5hY3RpdmVFbGVtZW50O1xuICBpZiAoYWN0aXZlICE9PSBlbCkge1xuICAgIGVsLmZvY3VzKCk7XG4gIH1cblxuICB2YXIgcmFuZ2UgPSBkb2N1bWVudC5zZWxlY3Rpb24uY3JlYXRlUmFuZ2UoKTtcbiAgdmFyIGJvb2ttYXJrID0gcmFuZ2UuZ2V0Qm9va21hcmsoKTtcbiAgdmFyIG9yaWdpbmFsID0gZWwudmFsdWU7XG4gIHZhciBtYXJrZXIgPSBnZXRVbmlxdWVNYXJrZXIob3JpZ2luYWwpO1xuICB2YXIgcGFyZW50ID0gcmFuZ2UucGFyZW50RWxlbWVudCgpO1xuICBpZiAocGFyZW50ID09PSBudWxsIHx8ICFpbnB1dHMocGFyZW50KSkge1xuICAgIHJldHVybiByZXN1bHQoMCwgMCk7XG4gIH1cbiAgcmFuZ2UudGV4dCA9IG1hcmtlciArIHJhbmdlLnRleHQgKyBtYXJrZXI7XG5cbiAgdmFyIGNvbnRlbnRzID0gZWwudmFsdWU7XG5cbiAgZWwudmFsdWUgPSBvcmlnaW5hbDtcbiAgcmFuZ2UubW92ZVRvQm9va21hcmsoYm9va21hcmspO1xuICByYW5nZS5zZWxlY3QoKTtcblxuICByZXR1cm4gcmVzdWx0KGNvbnRlbnRzLmluZGV4T2YobWFya2VyKSwgY29udGVudHMubGFzdEluZGV4T2YobWFya2VyKSAtIG1hcmtlci5sZW5ndGgpO1xuXG4gIGZ1bmN0aW9uIHJlc3VsdCAoc3RhcnQsIGVuZCkge1xuICAgIGlmIChhY3RpdmUgIT09IGVsKSB7IC8vIGRvbid0IGRpc3J1cHQgcHJlLWV4aXN0aW5nIHN0YXRlXG4gICAgICBpZiAoYWN0aXZlKSB7XG4gICAgICAgIGFjdGl2ZS5mb2N1cygpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZWwuYmx1cigpO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4geyBzdGFydDogc3RhcnQsIGVuZDogZW5kIH07XG4gIH1cbn1cblxuZnVuY3Rpb24gZ2V0VW5pcXVlTWFya2VyIChjb250ZW50cykge1xuICB2YXIgbWFya2VyO1xuICBkbyB7XG4gICAgbWFya2VyID0gJ0BAbWFya2VyLicgKyBNYXRoLnJhbmRvbSgpICogbmV3IERhdGUoKTtcbiAgfSB3aGlsZSAoY29udGVudHMuaW5kZXhPZihtYXJrZXIpICE9PSAtMSk7XG4gIHJldHVybiBtYXJrZXI7XG59XG5cbmZ1bmN0aW9uIGlucHV0cyAoZWwpIHtcbiAgcmV0dXJuICgoZWwudGFnTmFtZSA9PT0gJ0lOUFVUJyAmJiBlbC50eXBlID09PSAndGV4dCcpIHx8IGVsLnRhZ05hbWUgPT09ICdURVhUQVJFQScpO1xufVxuXG5mdW5jdGlvbiBlYXN5U2V0IChlbCwgcCkge1xuICBlbC5zZWxlY3Rpb25TdGFydCA9IHBhcnNlKGVsLCBwLnN0YXJ0KTtcbiAgZWwuc2VsZWN0aW9uRW5kID0gcGFyc2UoZWwsIHAuZW5kKTtcbn1cblxuZnVuY3Rpb24gaGFyZFNldCAoZWwsIHApIHtcbiAgdmFyIHJhbmdlID0gZWwuY3JlYXRlVGV4dFJhbmdlKCk7XG5cbiAgaWYgKHAuc3RhcnQgPT09ICdlbmQnICYmIHAuZW5kID09PSAnZW5kJykge1xuICAgIHJhbmdlLmNvbGxhcHNlKGZhbHNlKTtcbiAgICByYW5nZS5zZWxlY3QoKTtcbiAgfSBlbHNlIHtcbiAgICByYW5nZS5jb2xsYXBzZSh0cnVlKTtcbiAgICByYW5nZS5tb3ZlRW5kKCdjaGFyYWN0ZXInLCBwYXJzZShlbCwgcC5lbmQpKTtcbiAgICByYW5nZS5tb3ZlU3RhcnQoJ2NoYXJhY3RlcicsIHBhcnNlKGVsLCBwLnN0YXJ0KSk7XG4gICAgcmFuZ2Uuc2VsZWN0KCk7XG4gIH1cbn1cblxuZnVuY3Rpb24gcGFyc2UgKGVsLCB2YWx1ZSkge1xuICByZXR1cm4gdmFsdWUgPT09ICdlbmQnID8gZWwudmFsdWUubGVuZ3RoIDogdmFsdWUgfHwgMDtcbn1cblxuZnVuY3Rpb24gc2VsbCAoZWwsIHApIHtcbiAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDIpIHtcbiAgICBzZXQoZWwsIHApO1xuICB9XG4gIHJldHVybiBnZXQoZWwpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHNlbGw7XG4iLCIoZnVuY3Rpb24gKGdsb2JhbCl7XG4ndXNlIHN0cmljdCc7XG5cbnZhciBzZWxsID0gcmVxdWlyZSgnc2VsbCcpO1xudmFyIGNyb3NzdmVudCA9IHJlcXVpcmUoJ2Nyb3NzdmVudCcpO1xudmFyIHRocm90dGxlID0gcmVxdWlyZSgnLi90aHJvdHRsZScpO1xudmFyIHByb3BzID0gW1xuICAnZGlyZWN0aW9uJyxcbiAgJ2JveFNpemluZycsXG4gICd3aWR0aCcsXG4gICdoZWlnaHQnLFxuICAnb3ZlcmZsb3dYJyxcbiAgJ292ZXJmbG93WScsXG4gICdib3JkZXJUb3BXaWR0aCcsXG4gICdib3JkZXJSaWdodFdpZHRoJyxcbiAgJ2JvcmRlckJvdHRvbVdpZHRoJyxcbiAgJ2JvcmRlckxlZnRXaWR0aCcsXG4gICdwYWRkaW5nVG9wJyxcbiAgJ3BhZGRpbmdSaWdodCcsXG4gICdwYWRkaW5nQm90dG9tJyxcbiAgJ3BhZGRpbmdMZWZ0JyxcbiAgJ2ZvbnRTdHlsZScsXG4gICdmb250VmFyaWFudCcsXG4gICdmb250V2VpZ2h0JyxcbiAgJ2ZvbnRTdHJldGNoJyxcbiAgJ2ZvbnRTaXplJyxcbiAgJ2ZvbnRTaXplQWRqdXN0JyxcbiAgJ2xpbmVIZWlnaHQnLFxuICAnZm9udEZhbWlseScsXG4gICd0ZXh0QWxpZ24nLFxuICAndGV4dFRyYW5zZm9ybScsXG4gICd0ZXh0SW5kZW50JyxcbiAgJ3RleHREZWNvcmF0aW9uJyxcbiAgJ2xldHRlclNwYWNpbmcnLFxuICAnd29yZFNwYWNpbmcnXG5dO1xudmFyIHdpbiA9IGdsb2JhbDtcbnZhciBkb2MgPSBkb2N1bWVudDtcbnZhciBmZiA9IHdpbi5tb3pJbm5lclNjcmVlblggIT09IG51bGwgJiYgd2luLm1veklubmVyU2NyZWVuWCAhPT0gdm9pZCAwO1xuXG5mdW5jdGlvbiB0YWlsb3JtYWRlIChlbCwgb3B0aW9ucykge1xuICB2YXIgdGV4dElucHV0ID0gZWwudGFnTmFtZSA9PT0gJ0lOUFVUJyB8fCBlbC50YWdOYW1lID09PSAnVEVYVEFSRUEnO1xuICB2YXIgdGhyb3R0bGVkUmVmcmVzaCA9IHRocm90dGxlKHJlZnJlc2gsIDMwKTtcbiAgdmFyIG8gPSBvcHRpb25zIHx8IHt9O1xuXG4gIGJpbmQoKTtcblxuICByZXR1cm4ge1xuICAgIHJlYWQ6IHJlYWRQb3NpdGlvbixcbiAgICByZWZyZXNoOiB0aHJvdHRsZWRSZWZyZXNoLFxuICAgIGRlc3Ryb3k6IGRlc3Ryb3lcbiAgfTtcblxuICBmdW5jdGlvbiBub29wICgpIHt9XG4gIGZ1bmN0aW9uIHJlYWRQb3NpdGlvbiAoKSB7IHJldHVybiAodGV4dElucHV0ID8gY29vcmRzVGV4dCA6IGNvb3Jkc0hUTUwpKCk7IH1cblxuICBmdW5jdGlvbiByZWZyZXNoICgpIHtcbiAgICBpZiAoby5zbGVlcGluZykge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICByZXR1cm4gKG8udXBkYXRlIHx8IG5vb3ApKHJlYWRQb3NpdGlvbigpKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGNvb3Jkc1RleHQgKCkge1xuICAgIHZhciBwID0gc2VsbChlbCk7XG4gICAgdmFyIGNvbnRleHQgPSBwcmVwYXJlKCk7XG4gICAgdmFyIHJlYWRpbmdzID0gcmVhZFRleHRDb29yZHMoY29udGV4dCwgcC5zdGFydCk7XG4gICAgZG9jLmJvZHkucmVtb3ZlQ2hpbGQoY29udGV4dC5taXJyb3IpO1xuICAgIHJldHVybiByZWFkaW5ncztcbiAgfVxuXG4gIGZ1bmN0aW9uIGNvb3Jkc0hUTUwgKCkge1xuICAgIHZhciBzZWwgPSAoby5nZXRTZWxlY3Rpb24gfHwgd2luLmdldFNlbGVjdGlvbikoKTtcbiAgICBpZiAoc2VsLnJhbmdlQ291bnQpIHtcbiAgICAgIHZhciByYW5nZSA9IHNlbC5nZXRSYW5nZUF0KDApO1xuICAgICAgdmFyIG5lZWRzVG9Xb3JrQXJvdW5kTmV3bGluZUJ1ZyA9IHJhbmdlLnN0YXJ0Q29udGFpbmVyLm5vZGVOYW1lID09PSAnUCcgJiYgcmFuZ2Uuc3RhcnRPZmZzZXQgPT09IDA7XG4gICAgICBpZiAobmVlZHNUb1dvcmtBcm91bmROZXdsaW5lQnVnKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgeDogcmFuZ2Uuc3RhcnRDb250YWluZXIub2Zmc2V0TGVmdCxcbiAgICAgICAgICB5OiByYW5nZS5zdGFydENvbnRhaW5lci5vZmZzZXRUb3AsXG4gICAgICAgICAgYWJzb2x1dGU6IHRydWVcbiAgICAgICAgfTtcbiAgICAgIH1cbiAgICAgIGlmIChyYW5nZS5nZXRDbGllbnRSZWN0cykge1xuICAgICAgICB2YXIgcmVjdHMgPSByYW5nZS5nZXRDbGllbnRSZWN0cygpO1xuICAgICAgICBpZiAocmVjdHMubGVuZ3RoID4gMCkge1xuICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB4OiByZWN0c1swXS5sZWZ0LFxuICAgICAgICAgICAgeTogcmVjdHNbMF0udG9wLFxuICAgICAgICAgICAgYWJzb2x1dGU6IHRydWVcbiAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB7IHg6IDAsIHk6IDAgfTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHJlYWRUZXh0Q29vcmRzIChjb250ZXh0LCBwKSB7XG4gICAgdmFyIHJlc3QgPSBkb2MuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICAgIHZhciBtaXJyb3IgPSBjb250ZXh0Lm1pcnJvcjtcbiAgICB2YXIgY29tcHV0ZWQgPSBjb250ZXh0LmNvbXB1dGVkO1xuXG4gICAgd3JpdGUobWlycm9yLCByZWFkKGVsKS5zdWJzdHJpbmcoMCwgcCkpO1xuXG4gICAgaWYgKGVsLnRhZ05hbWUgPT09ICdJTlBVVCcpIHtcbiAgICAgIG1pcnJvci50ZXh0Q29udGVudCA9IG1pcnJvci50ZXh0Q29udGVudC5yZXBsYWNlKC9cXHMvZywgJ1xcdTAwYTAnKTtcbiAgICB9XG5cbiAgICB3cml0ZShyZXN0LCByZWFkKGVsKS5zdWJzdHJpbmcocCkgfHwgJy4nKTtcblxuICAgIG1pcnJvci5hcHBlbmRDaGlsZChyZXN0KTtcblxuICAgIHJldHVybiB7XG4gICAgICB4OiByZXN0Lm9mZnNldExlZnQgKyBwYXJzZUludChjb21wdXRlZFsnYm9yZGVyTGVmdFdpZHRoJ10pLFxuICAgICAgeTogcmVzdC5vZmZzZXRUb3AgKyBwYXJzZUludChjb21wdXRlZFsnYm9yZGVyVG9wV2lkdGgnXSlcbiAgICB9O1xuICB9XG5cbiAgZnVuY3Rpb24gcmVhZCAoZWwpIHtcbiAgICByZXR1cm4gdGV4dElucHV0ID8gZWwudmFsdWUgOiBlbC5pbm5lckhUTUw7XG4gIH1cblxuICBmdW5jdGlvbiBwcmVwYXJlICgpIHtcbiAgICB2YXIgY29tcHV0ZWQgPSB3aW4uZ2V0Q29tcHV0ZWRTdHlsZSA/IGdldENvbXB1dGVkU3R5bGUoZWwpIDogZWwuY3VycmVudFN0eWxlO1xuICAgIHZhciBtaXJyb3IgPSBkb2MuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgdmFyIHN0eWxlID0gbWlycm9yLnN0eWxlO1xuXG4gICAgZG9jLmJvZHkuYXBwZW5kQ2hpbGQobWlycm9yKTtcblxuICAgIGlmIChlbC50YWdOYW1lICE9PSAnSU5QVVQnKSB7XG4gICAgICBzdHlsZS53b3JkV3JhcCA9ICdicmVhay13b3JkJztcbiAgICB9XG4gICAgc3R5bGUud2hpdGVTcGFjZSA9ICdwcmUtd3JhcCc7XG4gICAgc3R5bGUucG9zaXRpb24gPSAnYWJzb2x1dGUnO1xuICAgIHN0eWxlLnZpc2liaWxpdHkgPSAnaGlkZGVuJztcbiAgICBwcm9wcy5mb3JFYWNoKGNvcHkpO1xuXG4gICAgaWYgKGZmKSB7XG4gICAgICBzdHlsZS53aWR0aCA9IHBhcnNlSW50KGNvbXB1dGVkLndpZHRoKSAtIDIgKyAncHgnO1xuICAgICAgaWYgKGVsLnNjcm9sbEhlaWdodCA+IHBhcnNlSW50KGNvbXB1dGVkLmhlaWdodCkpIHtcbiAgICAgICAgc3R5bGUub3ZlcmZsb3dZID0gJ3Njcm9sbCc7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHN0eWxlLm92ZXJmbG93ID0gJ2hpZGRlbic7XG4gICAgfVxuICAgIHJldHVybiB7IG1pcnJvcjogbWlycm9yLCBjb21wdXRlZDogY29tcHV0ZWQgfTtcblxuICAgIGZ1bmN0aW9uIGNvcHkgKHByb3ApIHtcbiAgICAgIHN0eWxlW3Byb3BdID0gY29tcHV0ZWRbcHJvcF07XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gd3JpdGUgKGVsLCB2YWx1ZSkge1xuICAgIGlmICh0ZXh0SW5wdXQpIHtcbiAgICAgIGVsLnRleHRDb250ZW50ID0gdmFsdWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIGVsLmlubmVySFRNTCA9IHZhbHVlO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGJpbmQgKHJlbW92ZSkge1xuICAgIHZhciBvcCA9IHJlbW92ZSA/ICdyZW1vdmUnIDogJ2FkZCc7XG4gICAgY3Jvc3N2ZW50W29wXShlbCwgJ2tleWRvd24nLCB0aHJvdHRsZWRSZWZyZXNoKTtcbiAgICBjcm9zc3ZlbnRbb3BdKGVsLCAna2V5dXAnLCB0aHJvdHRsZWRSZWZyZXNoKTtcbiAgICBjcm9zc3ZlbnRbb3BdKGVsLCAnaW5wdXQnLCB0aHJvdHRsZWRSZWZyZXNoKTtcbiAgICBjcm9zc3ZlbnRbb3BdKGVsLCAncGFzdGUnLCB0aHJvdHRsZWRSZWZyZXNoKTtcbiAgICBjcm9zc3ZlbnRbb3BdKGVsLCAnY2hhbmdlJywgdGhyb3R0bGVkUmVmcmVzaCk7XG4gIH1cblxuICBmdW5jdGlvbiBkZXN0cm95ICgpIHtcbiAgICBiaW5kKHRydWUpO1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gdGFpbG9ybWFkZTtcblxufSkuY2FsbCh0aGlzLHR5cGVvZiBnbG9iYWwgIT09IFwidW5kZWZpbmVkXCIgPyBnbG9iYWwgOiB0eXBlb2Ygc2VsZiAhPT0gXCJ1bmRlZmluZWRcIiA/IHNlbGYgOiB0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiID8gd2luZG93IDoge30pXG4vLyMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247Y2hhcnNldDp1dGYtODtiYXNlNjQsZXlKMlpYSnphVzl1SWpvekxDSnpiM1Z5WTJWeklqcGJJbTV2WkdWZmJXOWtkV3hsY3k5aWRXeHNjMlY1WlM5MFlXbHNiM0p0WVdSbExtcHpJbDBzSW01aGJXVnpJanBiWFN3aWJXRndjR2x1WjNNaU9pSTdRVUZCUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRU0lzSW1acGJHVWlPaUpuWlc1bGNtRjBaV1F1YW5NaUxDSnpiM1Z5WTJWU2IyOTBJam9pSWl3aWMyOTFjbU5sYzBOdmJuUmxiblFpT2xzaUozVnpaU0J6ZEhKcFkzUW5PMXh1WEc1MllYSWdjMlZzYkNBOUlISmxjWFZwY21Vb0ozTmxiR3duS1R0Y2JuWmhjaUJqY205emMzWmxiblFnUFNCeVpYRjFhWEpsS0NkamNtOXpjM1psYm5RbktUdGNiblpoY2lCMGFISnZkSFJzWlNBOUlISmxjWFZwY21Vb0p5NHZkR2h5YjNSMGJHVW5LVHRjYm5aaGNpQndjbTl3Y3lBOUlGdGNiaUFnSjJScGNtVmpkR2x2Ymljc1hHNGdJQ2RpYjNoVGFYcHBibWNuTEZ4dUlDQW5kMmxrZEdnbkxGeHVJQ0FuYUdWcFoyaDBKeXhjYmlBZ0oyOTJaWEptYkc5M1dDY3NYRzRnSUNkdmRtVnlabXh2ZDFrbkxGeHVJQ0FuWW05eVpHVnlWRzl3VjJsa2RHZ25MRnh1SUNBblltOXlaR1Z5VW1sbmFIUlhhV1IwYUNjc1hHNGdJQ2RpYjNKa1pYSkNiM1IwYjIxWGFXUjBhQ2NzWEc0Z0lDZGliM0prWlhKTVpXWjBWMmxrZEdnbkxGeHVJQ0FuY0dGa1pHbHVaMVJ2Y0Njc1hHNGdJQ2R3WVdSa2FXNW5VbWxuYUhRbkxGeHVJQ0FuY0dGa1pHbHVaMEp2ZEhSdmJTY3NYRzRnSUNkd1lXUmthVzVuVEdWbWRDY3NYRzRnSUNkbWIyNTBVM1I1YkdVbkxGeHVJQ0FuWm05dWRGWmhjbWxoYm5RbkxGeHVJQ0FuWm05dWRGZGxhV2RvZENjc1hHNGdJQ2RtYjI1MFUzUnlaWFJqYUNjc1hHNGdJQ2RtYjI1MFUybDZaU2NzWEc0Z0lDZG1iMjUwVTJsNlpVRmthblZ6ZENjc1hHNGdJQ2RzYVc1bFNHVnBaMmgwSnl4Y2JpQWdKMlp2Ym5SR1lXMXBiSGtuTEZ4dUlDQW5kR1Y0ZEVGc2FXZHVKeXhjYmlBZ0ozUmxlSFJVY21GdWMyWnZjbTBuTEZ4dUlDQW5kR1Y0ZEVsdVpHVnVkQ2NzWEc0Z0lDZDBaWGgwUkdWamIzSmhkR2x2Ymljc1hHNGdJQ2RzWlhSMFpYSlRjR0ZqYVc1bkp5eGNiaUFnSjNkdmNtUlRjR0ZqYVc1bkoxeHVYVHRjYm5aaGNpQjNhVzRnUFNCbmJHOWlZV3c3WEc1MllYSWdaRzlqSUQwZ1pHOWpkVzFsYm5RN1hHNTJZWElnWm1ZZ1BTQjNhVzR1Ylc5NlNXNXVaWEpUWTNKbFpXNVlJQ0U5UFNCdWRXeHNJQ1ltSUhkcGJpNXRiM3BKYm01bGNsTmpjbVZsYmxnZ0lUMDlJSFp2YVdRZ01EdGNibHh1Wm5WdVkzUnBiMjRnZEdGcGJHOXliV0ZrWlNBb1pXd3NJRzl3ZEdsdmJuTXBJSHRjYmlBZ2RtRnlJSFJsZUhSSmJuQjFkQ0E5SUdWc0xuUmhaMDVoYldVZ1BUMDlJQ2RKVGxCVlZDY2dmSHdnWld3dWRHRm5UbUZ0WlNBOVBUMGdKMVJGV0ZSQlVrVkJKenRjYmlBZ2RtRnlJSFJvY205MGRHeGxaRkpsWm5KbGMyZ2dQU0IwYUhKdmRIUnNaU2h5WldaeVpYTm9MQ0F6TUNrN1hHNGdJSFpoY2lCdklEMGdiM0IwYVc5dWN5QjhmQ0I3ZlR0Y2JseHVJQ0JpYVc1a0tDazdYRzVjYmlBZ2NtVjBkWEp1SUh0Y2JpQWdJQ0J5WldGa09pQnlaV0ZrVUc5emFYUnBiMjRzWEc0Z0lDQWdjbVZtY21WemFEb2dkR2h5YjNSMGJHVmtVbVZtY21WemFDeGNiaUFnSUNCa1pYTjBjbTk1T2lCa1pYTjBjbTk1WEc0Z0lIMDdYRzVjYmlBZ1puVnVZM1JwYjI0Z2JtOXZjQ0FvS1NCN2ZWeHVJQ0JtZFc1amRHbHZiaUJ5WldGa1VHOXphWFJwYjI0Z0tDa2dleUJ5WlhSMWNtNGdLSFJsZUhSSmJuQjFkQ0EvSUdOdmIzSmtjMVJsZUhRZ09pQmpiMjl5WkhOSVZFMU1LU2dwT3lCOVhHNWNiaUFnWm5WdVkzUnBiMjRnY21WbWNtVnphQ0FvS1NCN1hHNGdJQ0FnYVdZZ0tHOHVjMnhsWlhCcGJtY3BJSHRjYmlBZ0lDQWdJSEpsZEhWeWJqdGNiaUFnSUNCOVhHNGdJQ0FnY21WMGRYSnVJQ2h2TG5Wd1pHRjBaU0I4ZkNCdWIyOXdLU2h5WldGa1VHOXphWFJwYjI0b0tTazdYRzRnSUgxY2JseHVJQ0JtZFc1amRHbHZiaUJqYjI5eVpITlVaWGgwSUNncElIdGNiaUFnSUNCMllYSWdjQ0E5SUhObGJHd29aV3dwTzF4dUlDQWdJSFpoY2lCamIyNTBaWGgwSUQwZ2NISmxjR0Z5WlNncE8xeHVJQ0FnSUhaaGNpQnlaV0ZrYVc1bmN5QTlJSEpsWVdSVVpYaDBRMjl2Y21SektHTnZiblJsZUhRc0lIQXVjM1JoY25RcE8xeHVJQ0FnSUdSdll5NWliMlI1TG5KbGJXOTJaVU5vYVd4a0tHTnZiblJsZUhRdWJXbHljbTl5S1R0Y2JpQWdJQ0J5WlhSMWNtNGdjbVZoWkdsdVozTTdYRzRnSUgxY2JseHVJQ0JtZFc1amRHbHZiaUJqYjI5eVpITklWRTFNSUNncElIdGNiaUFnSUNCMllYSWdjMlZzSUQwZ0tHOHVaMlYwVTJWc1pXTjBhVzl1SUh4OElIZHBiaTVuWlhSVFpXeGxZM1JwYjI0cEtDazdYRzRnSUNBZ2FXWWdLSE5sYkM1eVlXNW5aVU52ZFc1MEtTQjdYRzRnSUNBZ0lDQjJZWElnY21GdVoyVWdQU0J6Wld3dVoyVjBVbUZ1WjJWQmRDZ3dLVHRjYmlBZ0lDQWdJSFpoY2lCdVpXVmtjMVJ2VjI5eWEwRnliM1Z1WkU1bGQyeHBibVZDZFdjZ1BTQnlZVzVuWlM1emRHRnlkRU52Ym5SaGFXNWxjaTV1YjJSbFRtRnRaU0E5UFQwZ0oxQW5JQ1ltSUhKaGJtZGxMbk4wWVhKMFQyWm1jMlYwSUQwOVBTQXdPMXh1SUNBZ0lDQWdhV1lnS0c1bFpXUnpWRzlYYjNKclFYSnZkVzVrVG1WM2JHbHVaVUoxWnlrZ2UxeHVJQ0FnSUNBZ0lDQnlaWFIxY200Z2UxeHVJQ0FnSUNBZ0lDQWdJSGc2SUhKaGJtZGxMbk4wWVhKMFEyOXVkR0ZwYm1WeUxtOW1abk5sZEV4bFpuUXNYRzRnSUNBZ0lDQWdJQ0FnZVRvZ2NtRnVaMlV1YzNSaGNuUkRiMjUwWVdsdVpYSXViMlptYzJWMFZHOXdMRnh1SUNBZ0lDQWdJQ0FnSUdGaWMyOXNkWFJsT2lCMGNuVmxYRzRnSUNBZ0lDQWdJSDA3WEc0Z0lDQWdJQ0I5WEc0Z0lDQWdJQ0JwWmlBb2NtRnVaMlV1WjJWMFEyeHBaVzUwVW1WamRITXBJSHRjYmlBZ0lDQWdJQ0FnZG1GeUlISmxZM1J6SUQwZ2NtRnVaMlV1WjJWMFEyeHBaVzUwVW1WamRITW9LVHRjYmlBZ0lDQWdJQ0FnYVdZZ0tISmxZM1J6TG14bGJtZDBhQ0ErSURBcElIdGNiaUFnSUNBZ0lDQWdJQ0J5WlhSMWNtNGdlMXh1SUNBZ0lDQWdJQ0FnSUNBZ2VEb2djbVZqZEhOYk1GMHViR1ZtZEN4Y2JpQWdJQ0FnSUNBZ0lDQWdJSGs2SUhKbFkzUnpXekJkTG5SdmNDeGNiaUFnSUNBZ0lDQWdJQ0FnSUdGaWMyOXNkWFJsT2lCMGNuVmxYRzRnSUNBZ0lDQWdJQ0FnZlR0Y2JpQWdJQ0FnSUNBZ2ZWeHVJQ0FnSUNBZ2ZWeHVJQ0FnSUgxY2JpQWdJQ0J5WlhSMWNtNGdleUI0T2lBd0xDQjVPaUF3SUgwN1hHNGdJSDFjYmx4dUlDQm1kVzVqZEdsdmJpQnlaV0ZrVkdWNGRFTnZiM0prY3lBb1kyOXVkR1Y0ZEN3Z2NDa2dlMXh1SUNBZ0lIWmhjaUJ5WlhOMElEMGdaRzlqTG1OeVpXRjBaVVZzWlcxbGJuUW9KM053WVc0bktUdGNiaUFnSUNCMllYSWdiV2x5Y205eUlEMGdZMjl1ZEdWNGRDNXRhWEp5YjNJN1hHNGdJQ0FnZG1GeUlHTnZiWEIxZEdWa0lEMGdZMjl1ZEdWNGRDNWpiMjF3ZFhSbFpEdGNibHh1SUNBZ0lIZHlhWFJsS0cxcGNuSnZjaXdnY21WaFpDaGxiQ2t1YzNWaWMzUnlhVzVuS0RBc0lIQXBLVHRjYmx4dUlDQWdJR2xtSUNobGJDNTBZV2RPWVcxbElEMDlQU0FuU1U1UVZWUW5LU0I3WEc0Z0lDQWdJQ0J0YVhKeWIzSXVkR1Y0ZEVOdmJuUmxiblFnUFNCdGFYSnliM0l1ZEdWNGRFTnZiblJsYm5RdWNtVndiR0ZqWlNndlhGeHpMMmNzSUNkY1hIVXdNR0V3SnlrN1hHNGdJQ0FnZlZ4dVhHNGdJQ0FnZDNKcGRHVW9jbVZ6ZEN3Z2NtVmhaQ2hsYkNrdWMzVmljM1J5YVc1bktIQXBJSHg4SUNjdUp5azdYRzVjYmlBZ0lDQnRhWEp5YjNJdVlYQndaVzVrUTJocGJHUW9jbVZ6ZENrN1hHNWNiaUFnSUNCeVpYUjFjbTRnZTF4dUlDQWdJQ0FnZURvZ2NtVnpkQzV2Wm1aelpYUk1aV1owSUNzZ2NHRnljMlZKYm5Rb1kyOXRjSFYwWldSYkoySnZjbVJsY2t4bFpuUlhhV1IwYUNkZEtTeGNiaUFnSUNBZ0lIazZJSEpsYzNRdWIyWm1jMlYwVkc5d0lDc2djR0Z5YzJWSmJuUW9ZMjl0Y0hWMFpXUmJKMkp2Y21SbGNsUnZjRmRwWkhSb0oxMHBYRzRnSUNBZ2ZUdGNiaUFnZlZ4dVhHNGdJR1oxYm1OMGFXOXVJSEpsWVdRZ0tHVnNLU0I3WEc0Z0lDQWdjbVYwZFhKdUlIUmxlSFJKYm5CMWRDQS9JR1ZzTG5aaGJIVmxJRG9nWld3dWFXNXVaWEpJVkUxTU8xeHVJQ0I5WEc1Y2JpQWdablZ1WTNScGIyNGdjSEpsY0dGeVpTQW9LU0I3WEc0Z0lDQWdkbUZ5SUdOdmJYQjFkR1ZrSUQwZ2QybHVMbWRsZEVOdmJYQjFkR1ZrVTNSNWJHVWdQeUJuWlhSRGIyMXdkWFJsWkZOMGVXeGxLR1ZzS1NBNklHVnNMbU4xY25KbGJuUlRkSGxzWlR0Y2JpQWdJQ0IyWVhJZ2JXbHljbTl5SUQwZ1pHOWpMbU55WldGMFpVVnNaVzFsYm5Rb0oyUnBkaWNwTzF4dUlDQWdJSFpoY2lCemRIbHNaU0E5SUcxcGNuSnZjaTV6ZEhsc1pUdGNibHh1SUNBZ0lHUnZZeTVpYjJSNUxtRndjR1Z1WkVOb2FXeGtLRzFwY25KdmNpazdYRzVjYmlBZ0lDQnBaaUFvWld3dWRHRm5UbUZ0WlNBaFBUMGdKMGxPVUZWVUp5a2dlMXh1SUNBZ0lDQWdjM1I1YkdVdWQyOXlaRmR5WVhBZ1BTQW5ZbkpsWVdzdGQyOXlaQ2M3WEc0Z0lDQWdmVnh1SUNBZ0lITjBlV3hsTG5kb2FYUmxVM0JoWTJVZ1BTQW5jSEpsTFhkeVlYQW5PMXh1SUNBZ0lITjBlV3hsTG5CdmMybDBhVzl1SUQwZ0oyRmljMjlzZFhSbEp6dGNiaUFnSUNCemRIbHNaUzUyYVhOcFltbHNhWFI1SUQwZ0oyaHBaR1JsYmljN1hHNGdJQ0FnY0hKdmNITXVabTl5UldGamFDaGpiM0I1S1R0Y2JseHVJQ0FnSUdsbUlDaG1aaWtnZTF4dUlDQWdJQ0FnYzNSNWJHVXVkMmxrZEdnZ1BTQndZWEp6WlVsdWRDaGpiMjF3ZFhSbFpDNTNhV1IwYUNrZ0xTQXlJQ3NnSjNCNEp6dGNiaUFnSUNBZ0lHbG1JQ2hsYkM1elkzSnZiR3hJWldsbmFIUWdQaUJ3WVhKelpVbHVkQ2hqYjIxd2RYUmxaQzVvWldsbmFIUXBLU0I3WEc0Z0lDQWdJQ0FnSUhOMGVXeGxMbTkyWlhKbWJHOTNXU0E5SUNkelkzSnZiR3duTzF4dUlDQWdJQ0FnZlZ4dUlDQWdJSDBnWld4elpTQjdYRzRnSUNBZ0lDQnpkSGxzWlM1dmRtVnlabXh2ZHlBOUlDZG9hV1JrWlc0bk8xeHVJQ0FnSUgxY2JpQWdJQ0J5WlhSMWNtNGdleUJ0YVhKeWIzSTZJRzFwY25KdmNpd2dZMjl0Y0hWMFpXUTZJR052YlhCMWRHVmtJSDA3WEc1Y2JpQWdJQ0JtZFc1amRHbHZiaUJqYjNCNUlDaHdjbTl3S1NCN1hHNGdJQ0FnSUNCemRIbHNaVnR3Y205d1hTQTlJR052YlhCMWRHVmtXM0J5YjNCZE8xeHVJQ0FnSUgxY2JpQWdmVnh1WEc0Z0lHWjFibU4wYVc5dUlIZHlhWFJsSUNobGJDd2dkbUZzZFdVcElIdGNiaUFnSUNCcFppQW9kR1Y0ZEVsdWNIVjBLU0I3WEc0Z0lDQWdJQ0JsYkM1MFpYaDBRMjl1ZEdWdWRDQTlJSFpoYkhWbE8xeHVJQ0FnSUgwZ1pXeHpaU0I3WEc0Z0lDQWdJQ0JsYkM1cGJtNWxja2hVVFV3Z1BTQjJZV3gxWlR0Y2JpQWdJQ0I5WEc0Z0lIMWNibHh1SUNCbWRXNWpkR2x2YmlCaWFXNWtJQ2h5WlcxdmRtVXBJSHRjYmlBZ0lDQjJZWElnYjNBZ1BTQnlaVzF2ZG1VZ1B5QW5jbVZ0YjNabEp5QTZJQ2RoWkdRbk8xeHVJQ0FnSUdOeWIzTnpkbVZ1ZEZ0dmNGMG9aV3dzSUNkclpYbGtiM2R1Snl3Z2RHaHliM1IwYkdWa1VtVm1jbVZ6YUNrN1hHNGdJQ0FnWTNKdmMzTjJaVzUwVzI5d1hTaGxiQ3dnSjJ0bGVYVndKeXdnZEdoeWIzUjBiR1ZrVW1WbWNtVnphQ2s3WEc0Z0lDQWdZM0p2YzNOMlpXNTBXMjl3WFNobGJDd2dKMmx1Y0hWMEp5d2dkR2h5YjNSMGJHVmtVbVZtY21WemFDazdYRzRnSUNBZ1kzSnZjM04yWlc1MFcyOXdYU2hsYkN3Z0ozQmhjM1JsSnl3Z2RHaHliM1IwYkdWa1VtVm1jbVZ6YUNrN1hHNGdJQ0FnWTNKdmMzTjJaVzUwVzI5d1hTaGxiQ3dnSjJOb1lXNW5aU2NzSUhSb2NtOTBkR3hsWkZKbFpuSmxjMmdwTzF4dUlDQjlYRzVjYmlBZ1puVnVZM1JwYjI0Z1pHVnpkSEp2ZVNBb0tTQjdYRzRnSUNBZ1ltbHVaQ2gwY25WbEtUdGNiaUFnZlZ4dWZWeHVYRzV0YjJSMWJHVXVaWGh3YjNKMGN5QTlJSFJoYVd4dmNtMWhaR1U3WEc0aVhYMD0iLCIndXNlIHN0cmljdCc7XG5cbmZ1bmN0aW9uIHRocm90dGxlIChmbiwgYm91bmRhcnkpIHtcbiAgdmFyIGxhc3QgPSAtSW5maW5pdHk7XG4gIHZhciB0aW1lcjtcbiAgcmV0dXJuIGZ1bmN0aW9uIGJvdW5jZWQgKCkge1xuICAgIGlmICh0aW1lcikge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB1bmJvdW5kKCk7XG5cbiAgICBmdW5jdGlvbiB1bmJvdW5kICgpIHtcbiAgICAgIGNsZWFyVGltZW91dCh0aW1lcik7XG4gICAgICB0aW1lciA9IG51bGw7XG4gICAgICB2YXIgbmV4dCA9IGxhc3QgKyBib3VuZGFyeTtcbiAgICAgIHZhciBub3cgPSBEYXRlLm5vdygpO1xuICAgICAgaWYgKG5vdyA+IG5leHQpIHtcbiAgICAgICAgbGFzdCA9IG5vdztcbiAgICAgICAgZm4oKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRpbWVyID0gc2V0VGltZW91dCh1bmJvdW5kLCBuZXh0IC0gbm93KTtcbiAgICAgIH1cbiAgICB9XG4gIH07XG59XG5cbm1vZHVsZS5leHBvcnRzID0gdGhyb3R0bGU7XG4iLCIoZnVuY3Rpb24gKGdsb2JhbCl7XG4ndXNlIHN0cmljdCc7XG5cbnZhciBjdXN0b21FdmVudCA9IHJlcXVpcmUoJ2N1c3RvbS1ldmVudCcpO1xudmFyIGRvYyA9IGRvY3VtZW50O1xudmFyIGFkZEV2ZW50ID0gYWRkRXZlbnRFYXN5O1xudmFyIHJlbW92ZUV2ZW50ID0gcmVtb3ZlRXZlbnRFYXN5O1xudmFyIGhhcmRDYWNoZSA9IFtdO1xuXG5pZiAoIWdsb2JhbC5hZGRFdmVudExpc3RlbmVyKSB7XG4gIGFkZEV2ZW50ID0gYWRkRXZlbnRIYXJkO1xuICByZW1vdmVFdmVudCA9IHJlbW92ZUV2ZW50SGFyZDtcbn1cblxuZnVuY3Rpb24gYWRkRXZlbnRFYXN5IChlbCwgdHlwZSwgZm4sIGNhcHR1cmluZykge1xuICByZXR1cm4gZWwuYWRkRXZlbnRMaXN0ZW5lcih0eXBlLCBmbiwgY2FwdHVyaW5nKTtcbn1cblxuZnVuY3Rpb24gYWRkRXZlbnRIYXJkIChlbCwgdHlwZSwgZm4pIHtcbiAgcmV0dXJuIGVsLmF0dGFjaEV2ZW50KCdvbicgKyB0eXBlLCB3cmFwKGVsLCB0eXBlLCBmbikpO1xufVxuXG5mdW5jdGlvbiByZW1vdmVFdmVudEVhc3kgKGVsLCB0eXBlLCBmbiwgY2FwdHVyaW5nKSB7XG4gIHJldHVybiBlbC5yZW1vdmVFdmVudExpc3RlbmVyKHR5cGUsIGZuLCBjYXB0dXJpbmcpO1xufVxuXG5mdW5jdGlvbiByZW1vdmVFdmVudEhhcmQgKGVsLCB0eXBlLCBmbikge1xuICByZXR1cm4gZWwuZGV0YWNoRXZlbnQoJ29uJyArIHR5cGUsIHVud3JhcChlbCwgdHlwZSwgZm4pKTtcbn1cblxuZnVuY3Rpb24gZmFicmljYXRlRXZlbnQgKGVsLCB0eXBlLCBtb2RlbCkge1xuICB2YXIgZSA9IG5ldyBjdXN0b21FdmVudCh0eXBlLCB7IGRldGFpbDogbW9kZWwgfSk7XG4gIGlmIChlbC5kaXNwYXRjaEV2ZW50KSB7XG4gICAgZWwuZGlzcGF0Y2hFdmVudChlKTtcbiAgfSBlbHNlIHtcbiAgICBlbC5maXJlRXZlbnQoJ29uJyArIHR5cGUsIGUpO1xuICB9XG59XG5cbmZ1bmN0aW9uIHdyYXBwZXJGYWN0b3J5IChlbCwgdHlwZSwgZm4pIHtcbiAgcmV0dXJuIGZ1bmN0aW9uIHdyYXBwZXIgKG9yaWdpbmFsRXZlbnQpIHtcbiAgICB2YXIgZSA9IG9yaWdpbmFsRXZlbnQgfHwgZ2xvYmFsLmV2ZW50O1xuICAgIGUudGFyZ2V0ID0gZS50YXJnZXQgfHwgZS5zcmNFbGVtZW50O1xuICAgIGUucHJldmVudERlZmF1bHQgPSBlLnByZXZlbnREZWZhdWx0IHx8IGZ1bmN0aW9uIHByZXZlbnREZWZhdWx0ICgpIHsgZS5yZXR1cm5WYWx1ZSA9IGZhbHNlOyB9O1xuICAgIGUuc3RvcFByb3BhZ2F0aW9uID0gZS5zdG9wUHJvcGFnYXRpb24gfHwgZnVuY3Rpb24gc3RvcFByb3BhZ2F0aW9uICgpIHsgZS5jYW5jZWxCdWJibGUgPSB0cnVlOyB9O1xuICAgIGUud2hpY2ggPSBlLndoaWNoIHx8IGUua2V5Q29kZTtcbiAgICBmbi5jYWxsKGVsLCBlKTtcbiAgfTtcbn1cblxuZnVuY3Rpb24gd3JhcCAoZWwsIHR5cGUsIGZuKSB7XG4gIHZhciB3cmFwcGVyID0gdW53cmFwKGVsLCB0eXBlLCBmbikgfHwgd3JhcHBlckZhY3RvcnkoZWwsIHR5cGUsIGZuKTtcbiAgaGFyZENhY2hlLnB1c2goe1xuICAgIHdyYXBwZXI6IHdyYXBwZXIsXG4gICAgZWxlbWVudDogZWwsXG4gICAgdHlwZTogdHlwZSxcbiAgICBmbjogZm5cbiAgfSk7XG4gIHJldHVybiB3cmFwcGVyO1xufVxuXG5mdW5jdGlvbiB1bndyYXAgKGVsLCB0eXBlLCBmbikge1xuICB2YXIgaSA9IGZpbmQoZWwsIHR5cGUsIGZuKTtcbiAgaWYgKGkpIHtcbiAgICB2YXIgd3JhcHBlciA9IGhhcmRDYWNoZVtpXS53cmFwcGVyO1xuICAgIGhhcmRDYWNoZS5zcGxpY2UoaSwgMSk7IC8vIGZyZWUgdXAgYSB0YWQgb2YgbWVtb3J5XG4gICAgcmV0dXJuIHdyYXBwZXI7XG4gIH1cbn1cblxuZnVuY3Rpb24gZmluZCAoZWwsIHR5cGUsIGZuKSB7XG4gIHZhciBpLCBpdGVtO1xuICBmb3IgKGkgPSAwOyBpIDwgaGFyZENhY2hlLmxlbmd0aDsgaSsrKSB7XG4gICAgaXRlbSA9IGhhcmRDYWNoZVtpXTtcbiAgICBpZiAoaXRlbS5lbGVtZW50ID09PSBlbCAmJiBpdGVtLnR5cGUgPT09IHR5cGUgJiYgaXRlbS5mbiA9PT0gZm4pIHtcbiAgICAgIHJldHVybiBpO1xuICAgIH1cbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgYWRkOiBhZGRFdmVudCxcbiAgcmVtb3ZlOiByZW1vdmVFdmVudCxcbiAgZmFicmljYXRlOiBmYWJyaWNhdGVFdmVudFxufTtcblxufSkuY2FsbCh0aGlzLHR5cGVvZiBnbG9iYWwgIT09IFwidW5kZWZpbmVkXCIgPyBnbG9iYWwgOiB0eXBlb2Ygc2VsZiAhPT0gXCJ1bmRlZmluZWRcIiA/IHNlbGYgOiB0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiID8gd2luZG93IDoge30pXG4vLyMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247Y2hhcnNldDp1dGYtODtiYXNlNjQsZXlKMlpYSnphVzl1SWpvekxDSnpiM1Z5WTJWeklqcGJJbTV2WkdWZmJXOWtkV3hsY3k5amNtOXpjM1psYm5RdmMzSmpMMk55YjNOemRtVnVkQzVxY3lKZExDSnVZVzFsY3lJNlcxMHNJbTFoY0hCcGJtZHpJam9pTzBGQlFVRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFaUxDSm1hV3hsSWpvaVoyVnVaWEpoZEdWa0xtcHpJaXdpYzI5MWNtTmxVbTl2ZENJNklpSXNJbk52ZFhKalpYTkRiMjUwWlc1MElqcGJJaWQxYzJVZ2MzUnlhV04wSnp0Y2JseHVkbUZ5SUdOMWMzUnZiVVYyWlc1MElEMGdjbVZ4ZFdseVpTZ25ZM1Z6ZEc5dExXVjJaVzUwSnlrN1hHNTJZWElnWkc5aklEMGdaRzlqZFcxbGJuUTdYRzUyWVhJZ1lXUmtSWFpsYm5RZ1BTQmhaR1JGZG1WdWRFVmhjM2s3WEc1MllYSWdjbVZ0YjNabFJYWmxiblFnUFNCeVpXMXZkbVZGZG1WdWRFVmhjM2s3WEc1MllYSWdhR0Z5WkVOaFkyaGxJRDBnVzEwN1hHNWNibWxtSUNnaFoyeHZZbUZzTG1Ga1pFVjJaVzUwVEdsemRHVnVaWElwSUh0Y2JpQWdZV1JrUlhabGJuUWdQU0JoWkdSRmRtVnVkRWhoY21RN1hHNGdJSEpsYlc5MlpVVjJaVzUwSUQwZ2NtVnRiM1psUlhabGJuUklZWEprTzF4dWZWeHVYRzVtZFc1amRHbHZiaUJoWkdSRmRtVnVkRVZoYzNrZ0tHVnNMQ0IwZVhCbExDQm1iaXdnWTJGd2RIVnlhVzVuS1NCN1hHNGdJSEpsZEhWeWJpQmxiQzVoWkdSRmRtVnVkRXhwYzNSbGJtVnlLSFI1Y0dVc0lHWnVMQ0JqWVhCMGRYSnBibWNwTzF4dWZWeHVYRzVtZFc1amRHbHZiaUJoWkdSRmRtVnVkRWhoY21RZ0tHVnNMQ0IwZVhCbExDQm1iaWtnZTF4dUlDQnlaWFIxY200Z1pXd3VZWFIwWVdOb1JYWmxiblFvSjI5dUp5QXJJSFI1Y0dVc0lIZHlZWEFvWld3c0lIUjVjR1VzSUdadUtTazdYRzU5WEc1Y2JtWjFibU4wYVc5dUlISmxiVzkyWlVWMlpXNTBSV0Z6ZVNBb1pXd3NJSFI1Y0dVc0lHWnVMQ0JqWVhCMGRYSnBibWNwSUh0Y2JpQWdjbVYwZFhKdUlHVnNMbkpsYlc5MlpVVjJaVzUwVEdsemRHVnVaWElvZEhsd1pTd2dabTRzSUdOaGNIUjFjbWx1WnlrN1hHNTlYRzVjYm1aMWJtTjBhVzl1SUhKbGJXOTJaVVYyWlc1MFNHRnlaQ0FvWld3c0lIUjVjR1VzSUdadUtTQjdYRzRnSUhKbGRIVnliaUJsYkM1a1pYUmhZMmhGZG1WdWRDZ25iMjRuSUNzZ2RIbHdaU3dnZFc1M2NtRndLR1ZzTENCMGVYQmxMQ0JtYmlrcE8xeHVmVnh1WEc1bWRXNWpkR2x2YmlCbVlXSnlhV05oZEdWRmRtVnVkQ0FvWld3c0lIUjVjR1VzSUcxdlpHVnNLU0I3WEc0Z0lIWmhjaUJsSUQwZ2JtVjNJR04xYzNSdmJVVjJaVzUwS0hSNWNHVXNJSHNnWkdWMFlXbHNPaUJ0YjJSbGJDQjlLVHRjYmlBZ2FXWWdLR1ZzTG1ScGMzQmhkR05vUlhabGJuUXBJSHRjYmlBZ0lDQmxiQzVrYVhOd1lYUmphRVYyWlc1MEtHVXBPMXh1SUNCOUlHVnNjMlVnZTF4dUlDQWdJR1ZzTG1acGNtVkZkbVZ1ZENnbmIyNG5JQ3NnZEhsd1pTd2daU2s3WEc0Z0lIMWNibjFjYmx4dVpuVnVZM1JwYjI0Z2QzSmhjSEJsY2taaFkzUnZjbmtnS0dWc0xDQjBlWEJsTENCbWJpa2dlMXh1SUNCeVpYUjFjbTRnWm5WdVkzUnBiMjRnZDNKaGNIQmxjaUFvYjNKcFoybHVZV3hGZG1WdWRDa2dlMXh1SUNBZ0lIWmhjaUJsSUQwZ2IzSnBaMmx1WVd4RmRtVnVkQ0I4ZkNCbmJHOWlZV3d1WlhabGJuUTdYRzRnSUNBZ1pTNTBZWEpuWlhRZ1BTQmxMblJoY21kbGRDQjhmQ0JsTG5OeVkwVnNaVzFsYm5RN1hHNGdJQ0FnWlM1d2NtVjJaVzUwUkdWbVlYVnNkQ0E5SUdVdWNISmxkbVZ1ZEVSbFptRjFiSFFnZkh3Z1puVnVZM1JwYjI0Z2NISmxkbVZ1ZEVSbFptRjFiSFFnS0NrZ2V5QmxMbkpsZEhWeWJsWmhiSFZsSUQwZ1ptRnNjMlU3SUgwN1hHNGdJQ0FnWlM1emRHOXdVSEp2Y0dGbllYUnBiMjRnUFNCbExuTjBiM0JRY205d1lXZGhkR2x2YmlCOGZDQm1kVzVqZEdsdmJpQnpkRzl3VUhKdmNHRm5ZWFJwYjI0Z0tDa2dleUJsTG1OaGJtTmxiRUoxWW1Kc1pTQTlJSFJ5ZFdVN0lIMDdYRzRnSUNBZ1pTNTNhR2xqYUNBOUlHVXVkMmhwWTJnZ2ZId2daUzVyWlhsRGIyUmxPMXh1SUNBZ0lHWnVMbU5oYkd3b1pXd3NJR1VwTzF4dUlDQjlPMXh1ZlZ4dVhHNW1kVzVqZEdsdmJpQjNjbUZ3SUNobGJDd2dkSGx3WlN3Z1ptNHBJSHRjYmlBZ2RtRnlJSGR5WVhCd1pYSWdQU0IxYm5keVlYQW9aV3dzSUhSNWNHVXNJR1p1S1NCOGZDQjNjbUZ3Y0dWeVJtRmpkRzl5ZVNobGJDd2dkSGx3WlN3Z1ptNHBPMXh1SUNCb1lYSmtRMkZqYUdVdWNIVnphQ2g3WEc0Z0lDQWdkM0poY0hCbGNqb2dkM0poY0hCbGNpeGNiaUFnSUNCbGJHVnRaVzUwT2lCbGJDeGNiaUFnSUNCMGVYQmxPaUIwZVhCbExGeHVJQ0FnSUdadU9pQm1ibHh1SUNCOUtUdGNiaUFnY21WMGRYSnVJSGR5WVhCd1pYSTdYRzU5WEc1Y2JtWjFibU4wYVc5dUlIVnVkM0poY0NBb1pXd3NJSFI1Y0dVc0lHWnVLU0I3WEc0Z0lIWmhjaUJwSUQwZ1ptbHVaQ2hsYkN3Z2RIbHdaU3dnWm00cE8xeHVJQ0JwWmlBb2FTa2dlMXh1SUNBZ0lIWmhjaUIzY21Gd2NHVnlJRDBnYUdGeVpFTmhZMmhsVzJsZExuZHlZWEJ3WlhJN1hHNGdJQ0FnYUdGeVpFTmhZMmhsTG5Od2JHbGpaU2hwTENBeEtUc2dMeThnWm5KbFpTQjFjQ0JoSUhSaFpDQnZaaUJ0WlcxdmNubGNiaUFnSUNCeVpYUjFjbTRnZDNKaGNIQmxjanRjYmlBZ2ZWeHVmVnh1WEc1bWRXNWpkR2x2YmlCbWFXNWtJQ2hsYkN3Z2RIbHdaU3dnWm00cElIdGNiaUFnZG1GeUlHa3NJR2wwWlcwN1hHNGdJR1p2Y2lBb2FTQTlJREE3SUdrZ1BDQm9ZWEprUTJGamFHVXViR1Z1WjNSb095QnBLeXNwSUh0Y2JpQWdJQ0JwZEdWdElEMGdhR0Z5WkVOaFkyaGxXMmxkTzF4dUlDQWdJR2xtSUNocGRHVnRMbVZzWlcxbGJuUWdQVDA5SUdWc0lDWW1JR2wwWlcwdWRIbHdaU0E5UFQwZ2RIbHdaU0FtSmlCcGRHVnRMbVp1SUQwOVBTQm1iaWtnZTF4dUlDQWdJQ0FnY21WMGRYSnVJR2s3WEc0Z0lDQWdmVnh1SUNCOVhHNTlYRzVjYm0xdlpIVnNaUzVsZUhCdmNuUnpJRDBnZTF4dUlDQmhaR1E2SUdGa1pFVjJaVzUwTEZ4dUlDQnlaVzF2ZG1VNklISmxiVzkyWlVWMlpXNTBMRnh1SUNCbVlXSnlhV05oZEdVNklHWmhZbkpwWTJGMFpVVjJaVzUwWEc1OU8xeHVJbDE5IiwiKGZ1bmN0aW9uIChnbG9iYWwpe1xuXG52YXIgTmF0aXZlQ3VzdG9tRXZlbnQgPSBnbG9iYWwuQ3VzdG9tRXZlbnQ7XG5cbmZ1bmN0aW9uIHVzZU5hdGl2ZSAoKSB7XG4gIHRyeSB7XG4gICAgdmFyIHAgPSBuZXcgTmF0aXZlQ3VzdG9tRXZlbnQoJ2NhdCcsIHsgZGV0YWlsOiB7IGZvbzogJ2JhcicgfSB9KTtcbiAgICByZXR1cm4gICdjYXQnID09PSBwLnR5cGUgJiYgJ2JhcicgPT09IHAuZGV0YWlsLmZvbztcbiAgfSBjYXRjaCAoZSkge1xuICB9XG4gIHJldHVybiBmYWxzZTtcbn1cblxuLyoqXG4gKiBDcm9zcy1icm93c2VyIGBDdXN0b21FdmVudGAgY29uc3RydWN0b3IuXG4gKlxuICogaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvQVBJL0N1c3RvbUV2ZW50LkN1c3RvbUV2ZW50XG4gKlxuICogQHB1YmxpY1xuICovXG5cbm1vZHVsZS5leHBvcnRzID0gdXNlTmF0aXZlKCkgPyBOYXRpdmVDdXN0b21FdmVudCA6XG5cbi8vIElFID49IDlcbidmdW5jdGlvbicgPT09IHR5cGVvZiBkb2N1bWVudC5jcmVhdGVFdmVudCA/IGZ1bmN0aW9uIEN1c3RvbUV2ZW50ICh0eXBlLCBwYXJhbXMpIHtcbiAgdmFyIGUgPSBkb2N1bWVudC5jcmVhdGVFdmVudCgnQ3VzdG9tRXZlbnQnKTtcbiAgaWYgKHBhcmFtcykge1xuICAgIGUuaW5pdEN1c3RvbUV2ZW50KHR5cGUsIHBhcmFtcy5idWJibGVzLCBwYXJhbXMuY2FuY2VsYWJsZSwgcGFyYW1zLmRldGFpbCk7XG4gIH0gZWxzZSB7XG4gICAgZS5pbml0Q3VzdG9tRXZlbnQodHlwZSwgZmFsc2UsIGZhbHNlLCB2b2lkIDApO1xuICB9XG4gIHJldHVybiBlO1xufSA6XG5cbi8vIElFIDw9IDhcbmZ1bmN0aW9uIEN1c3RvbUV2ZW50ICh0eXBlLCBwYXJhbXMpIHtcbiAgdmFyIGUgPSBkb2N1bWVudC5jcmVhdGVFdmVudE9iamVjdCgpO1xuICBlLnR5cGUgPSB0eXBlO1xuICBpZiAocGFyYW1zKSB7XG4gICAgZS5idWJibGVzID0gQm9vbGVhbihwYXJhbXMuYnViYmxlcyk7XG4gICAgZS5jYW5jZWxhYmxlID0gQm9vbGVhbihwYXJhbXMuY2FuY2VsYWJsZSk7XG4gICAgZS5kZXRhaWwgPSBwYXJhbXMuZGV0YWlsO1xuICB9IGVsc2Uge1xuICAgIGUuYnViYmxlcyA9IGZhbHNlO1xuICAgIGUuY2FuY2VsYWJsZSA9IGZhbHNlO1xuICAgIGUuZGV0YWlsID0gdm9pZCAwO1xuICB9XG4gIHJldHVybiBlO1xufVxuXG59KS5jYWxsKHRoaXMsdHlwZW9mIGdsb2JhbCAhPT0gXCJ1bmRlZmluZWRcIiA/IGdsb2JhbCA6IHR5cGVvZiBzZWxmICE9PSBcInVuZGVmaW5lZFwiID8gc2VsZiA6IHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgPyB3aW5kb3cgOiB7fSlcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtjaGFyc2V0OnV0Zi04O2Jhc2U2NCxleUoyWlhKemFXOXVJam96TENKemIzVnlZMlZ6SWpwYkltNXZaR1ZmYlc5a2RXeGxjeTlqZFhOMGIyMHRaWFpsYm5RdmFXNWtaWGd1YW5NaVhTd2libUZ0WlhNaU9sdGRMQ0p0WVhCd2FXNW5jeUk2SWp0QlFVRkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQklpd2labWxzWlNJNkltZGxibVZ5WVhSbFpDNXFjeUlzSW5OdmRYSmpaVkp2YjNRaU9pSWlMQ0p6YjNWeVkyVnpRMjl1ZEdWdWRDSTZXeUpjYm5aaGNpQk9ZWFJwZG1WRGRYTjBiMjFGZG1WdWRDQTlJR2RzYjJKaGJDNURkWE4wYjIxRmRtVnVkRHRjYmx4dVpuVnVZM1JwYjI0Z2RYTmxUbUYwYVhabElDZ3BJSHRjYmlBZ2RISjVJSHRjYmlBZ0lDQjJZWElnY0NBOUlHNWxkeUJPWVhScGRtVkRkWE4wYjIxRmRtVnVkQ2duWTJGMEp5d2dleUJrWlhSaGFXdzZJSHNnWm05dk9pQW5ZbUZ5SnlCOUlIMHBPMXh1SUNBZ0lISmxkSFZ5YmlBZ0oyTmhkQ2NnUFQwOUlIQXVkSGx3WlNBbUppQW5ZbUZ5SnlBOVBUMGdjQzVrWlhSaGFXd3VabTl2TzF4dUlDQjlJR05oZEdOb0lDaGxLU0I3WEc0Z0lIMWNiaUFnY21WMGRYSnVJR1poYkhObE8xeHVmVnh1WEc0dktpcGNiaUFxSUVOeWIzTnpMV0p5YjNkelpYSWdZRU4xYzNSdmJVVjJaVzUwWUNCamIyNXpkSEoxWTNSdmNpNWNiaUFxWEc0Z0tpQm9kSFJ3Y3pvdkwyUmxkbVZzYjNCbGNpNXRiM3BwYkd4aExtOXlaeTlsYmkxVlV5OWtiMk56TDFkbFlpOUJVRWt2UTNWemRHOXRSWFpsYm5RdVEzVnpkRzl0UlhabGJuUmNiaUFxWEc0Z0tpQkFjSFZpYkdsalhHNGdLaTljYmx4dWJXOWtkV3hsTG1WNGNHOXlkSE1nUFNCMWMyVk9ZWFJwZG1Vb0tTQS9JRTVoZEdsMlpVTjFjM1J2YlVWMlpXNTBJRHBjYmx4dUx5OGdTVVVnUGowZ09WeHVKMloxYm1OMGFXOXVKeUE5UFQwZ2RIbHdaVzltSUdSdlkzVnRaVzUwTG1OeVpXRjBaVVYyWlc1MElEOGdablZ1WTNScGIyNGdRM1Z6ZEc5dFJYWmxiblFnS0hSNWNHVXNJSEJoY21GdGN5a2dlMXh1SUNCMllYSWdaU0E5SUdSdlkzVnRaVzUwTG1OeVpXRjBaVVYyWlc1MEtDZERkWE4wYjIxRmRtVnVkQ2NwTzF4dUlDQnBaaUFvY0dGeVlXMXpLU0I3WEc0Z0lDQWdaUzVwYm1sMFEzVnpkRzl0UlhabGJuUW9kSGx3WlN3Z2NHRnlZVzF6TG1KMVltSnNaWE1zSUhCaGNtRnRjeTVqWVc1alpXeGhZbXhsTENCd1lYSmhiWE11WkdWMFlXbHNLVHRjYmlBZ2ZTQmxiSE5sSUh0Y2JpQWdJQ0JsTG1sdWFYUkRkWE4wYjIxRmRtVnVkQ2gwZVhCbExDQm1ZV3h6WlN3Z1ptRnNjMlVzSUhadmFXUWdNQ2s3WEc0Z0lIMWNiaUFnY21WMGRYSnVJR1U3WEc1OUlEcGNibHh1THk4Z1NVVWdQRDBnT0Z4dVpuVnVZM1JwYjI0Z1EzVnpkRzl0UlhabGJuUWdLSFI1Y0dVc0lIQmhjbUZ0Y3lrZ2UxeHVJQ0IyWVhJZ1pTQTlJR1J2WTNWdFpXNTBMbU55WldGMFpVVjJaVzUwVDJKcVpXTjBLQ2s3WEc0Z0lHVXVkSGx3WlNBOUlIUjVjR1U3WEc0Z0lHbG1JQ2h3WVhKaGJYTXBJSHRjYmlBZ0lDQmxMbUoxWW1Kc1pYTWdQU0JDYjI5c1pXRnVLSEJoY21GdGN5NWlkV0ppYkdWektUdGNiaUFnSUNCbExtTmhibU5sYkdGaWJHVWdQU0JDYjI5c1pXRnVLSEJoY21GdGN5NWpZVzVqWld4aFlteGxLVHRjYmlBZ0lDQmxMbVJsZEdGcGJDQTlJSEJoY21GdGN5NWtaWFJoYVd3N1hHNGdJSDBnWld4elpTQjdYRzRnSUNBZ1pTNWlkV0ppYkdWeklEMGdabUZzYzJVN1hHNGdJQ0FnWlM1allXNWpaV3hoWW14bElEMGdabUZzYzJVN1hHNGdJQ0FnWlM1a1pYUmhhV3dnUFNCMmIybGtJREE3WEc0Z0lIMWNiaUFnY21WMGRYSnVJR1U3WEc1OVhHNGlYWDA9IiwiJ3VzZSBzdHJpY3QnO1xuXG5mdW5jdGlvbiBmdXp6eXNlYXJjaCAobmVlZGxlLCBoYXlzdGFjaykge1xuICB2YXIgdGxlbiA9IGhheXN0YWNrLmxlbmd0aDtcbiAgdmFyIHFsZW4gPSBuZWVkbGUubGVuZ3RoO1xuICBpZiAocWxlbiA+IHRsZW4pIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgaWYgKHFsZW4gPT09IHRsZW4pIHtcbiAgICByZXR1cm4gbmVlZGxlID09PSBoYXlzdGFjaztcbiAgfVxuICBvdXRlcjogZm9yICh2YXIgaSA9IDAsIGogPSAwOyBpIDwgcWxlbjsgaSsrKSB7XG4gICAgdmFyIG5jaCA9IG5lZWRsZS5jaGFyQ29kZUF0KGkpO1xuICAgIHdoaWxlIChqIDwgdGxlbikge1xuICAgICAgaWYgKGhheXN0YWNrLmNoYXJDb2RlQXQoaisrKSA9PT0gbmNoKSB7XG4gICAgICAgIGNvbnRpbnVlIG91dGVyO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgcmV0dXJuIHRydWU7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZnV6enlzZWFyY2g7XG4iXX0=
