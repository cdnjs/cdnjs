/**
 * simple-module v3.0.3
 * http://mycolorway.github.io/simple-module
 *
 * Copyright Mycolorway Design
 * Released under the MIT license
 * http://mycolorway.github.io/simple-module/license.html
 *
 * Date: 2016-06-20
 */
;(function(root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory(require('jquery'));
  } else {
    root.SimpleModule = factory(root.jQuery);
  }
}(this, function ($) {
var define, module, exports;
var b = (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var SimpleModule,
  slice = [].slice;

SimpleModule = (function() {
  SimpleModule.extend = function(obj) {
    var key, ref, val;
    if (!(obj && typeof obj === 'object')) {
      throw new Error('SimpleModule.extend: param should be an object');
    }
    for (key in obj) {
      val = obj[key];
      if (key !== 'included' && key !== 'extended') {
        this[key] = val;
      }
    }
    if ((ref = obj.extended) != null) {
      ref.call(this);
    }
    return this;
  };

  SimpleModule.include = function(obj) {
    var key, ref, val;
    if (!(obj && typeof obj === 'object')) {
      throw new Error('SimpleModule.include: param should be an object');
    }
    for (key in obj) {
      val = obj[key];
      if (key !== 'included' && key !== 'extended') {
        this.prototype[key] = val;
      }
    }
    if ((ref = obj.included) != null) {
      ref.call(this);
    }
    return this;
  };

  SimpleModule.plugins = {};

  SimpleModule.plugin = function(name, cls) {
    if (!(name && typeof name === 'string')) {
      throw new Error('SimpleModule.plugin: first param should be a string');
    }
    if (typeof cls !== 'function') {
      throw new Error('SimpleModule.plugin: second param should be a class');
    }
    this.plugins[name] = cls;
    return this;
  };

  SimpleModule.opts = {
    plugins: []
  };

  SimpleModule.prototype.plugins = {};

  function SimpleModule(opts) {
    this.opts = $.extend({}, SimpleModule.opts, opts);
    this.opts.plugins.forEach((function(_this) {
      return function(name) {
        return _this.plugins[name] = new SimpleModule.plugins[name](_this);
      };
    })(this));
  }

  SimpleModule.prototype.on = function() {
    var args, ref;
    args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
    return (ref = $(this)).on.apply(ref, args);
  };

  SimpleModule.prototype.off = function() {
    var args, ref;
    args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
    return (ref = $(this)).off.apply(ref, args);
  };

  SimpleModule.prototype.trigger = function() {
    var args, ref;
    args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
    return (ref = $(this)).triggerHandler.apply(ref, args);
  };

  SimpleModule.prototype.one = function() {
    var args, ref;
    args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
    return (ref = $(this)).one.apply(ref, args);
  };

  return SimpleModule;

})();

module.exports = SimpleModule;

},{}]},{},[1]);

return b(1);
}));
