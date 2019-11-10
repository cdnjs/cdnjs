/*! Raven.js 3.27.0 (200cffcc) | github.com/getsentry/raven-js */

/*
 * Includes TraceKit
 * https://github.com/getsentry/TraceKit
 *
 * Copyright (c) 2018 Sentry (https://sentry.io) and individual contributors.
 * All rights reserved.
 * https://github.com/getsentry/sentry-javascript/blob/master/packages/raven-js/LICENSE
 *
 */

(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g=(g.Raven||(g.Raven = {}));g=(g.Plugins||(g.Plugins = {}));g.Require = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(_dereq_,module,exports){
/*global define*/
/**
 * require.js plugin
 *
 * Automatically wrap define/require callbacks. (Experimental)
 */
function requirePlugin(Raven) {
  if (typeof define === 'function' && define.amd) {
    window.define = Raven.wrap({deep: false}, define);
    window.require = Raven.wrap({deep: false}, _dereq_);
  }
}

module.exports = requirePlugin;

},{}]},{},[1])(1)
});
