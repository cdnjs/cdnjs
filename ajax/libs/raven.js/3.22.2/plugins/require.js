/*! Raven.js 3.22.2 (1b6187b) | github.com/getsentry/raven-js */

/*
 * Includes TraceKit
 * https://github.com/getsentry/TraceKit
 *
 * Copyright 2018 Matt Robenolt and other contributors
 * Released under the BSD license
 * https://github.com/getsentry/raven-js/blob/master/LICENSE
 *
 */

(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.Raven = global.Raven || {}, global.Raven.Plugins = global.Raven.Plugins || {}, global.Raven.Plugins.Require = factory());
}(this, (function () { 'use strict';

function commonjsRequire () {
	throw new Error('Dynamic requires are not currently supported by rollup-plugin-commonjs');
}

/*global define*/

/**
 * require.js plugin
 *
 * Automatically wrap define/require callbacks. (Experimental)
 */

function requirePlugin(Raven) {
  if (typeof undefined === 'function' && undefined.amd) {
    window.define = Raven.wrap({
      deep: false
    }, undefined);
    window.require = Raven.wrap({
      deep: false
    }, commonjsRequire);
  }
}

var require_1 = requirePlugin;

return require_1;

})));
