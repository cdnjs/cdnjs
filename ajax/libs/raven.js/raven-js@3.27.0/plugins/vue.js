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

(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g=(g.Raven||(g.Raven = {}));g=(g.Plugins||(g.Plugins = {}));g.Vue = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(_dereq_,module,exports){
/**
 * Vue.js 2.0 plugin
 *
 */

function formatComponentName(vm) {
  if (vm.$root === vm) {
    return 'root instance';
  }
  var name = vm._isVue ? vm.$options.name || vm.$options._componentTag : vm.name;
  return (
    (name ? 'component <' + name + '>' : 'anonymous component') +
    (vm._isVue && vm.$options.__file ? ' at ' + vm.$options.__file : '')
  );
}

function vuePlugin(Raven, Vue) {
  Vue = Vue || window.Vue;

  // quit if Vue isn't on the page
  if (!Vue || !Vue.config) return;

  var _oldOnError = Vue.config.errorHandler;
  Vue.config.errorHandler = function VueErrorHandler(error, vm, info) {
    var metaData = {};

    // vm and lifecycleHook are not always available
    if (Object.prototype.toString.call(vm) === '[object Object]') {
      metaData.componentName = formatComponentName(vm);
      metaData.propsData = vm.$options.propsData;
    }

    if (typeof info !== 'undefined') {
      metaData.lifecycleHook = info;
    }

    Raven.captureException(error, {
      extra: metaData
    });

    if (typeof _oldOnError === 'function') {
      _oldOnError.call(this, error, vm, info);
    }
  };
}

module.exports = vuePlugin;

},{}]},{},[1])(1)
});
