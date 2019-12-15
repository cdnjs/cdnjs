
/*!
 * inferno-hyperscript v1.3.0-rc.10
 * (c) 2017 Dominic Gannaway'
 * Released under the MIT License.
 */

(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('inferno')) :
	typeof define === 'function' && define.amd ? define(['inferno'], factory) :
	(global['inferno-hyperscript'] = factory(global.Inferno));
}(this, (function (inferno) { 'use strict';

// this is MUCH faster than .constructor === Array and instanceof Array
// in