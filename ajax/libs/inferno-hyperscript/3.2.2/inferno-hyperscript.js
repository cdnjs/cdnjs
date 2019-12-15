
/*!
 * Inferno.h v3.2.2
 * (c) 2017 Dominic Gannaway'
 * Released under the MIT License.
 */

(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('inferno')) :
	typeof define === 'function' && define.amd ? define(['inferno'], factory) :
	(global.Inferno = global.Inferno || {}, global.Inferno.h = factory(global.Inferno));
}(this, (function (inferno) { 'use strict';

// This should be boolean and not reference to window.document


