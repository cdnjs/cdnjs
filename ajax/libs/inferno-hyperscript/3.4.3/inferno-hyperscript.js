
/*!
 * Inferno.h v3.4.3
 * (c) 2017 Dominic Gannaway'
 * Released under the MIT License.
 */

(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('inferno')) :
	typeof define === 'function' && define.amd ? define(['exports', 'inferno'], factory) :
	(factory((global.Inferno = global.Inferno || {}, global.Inferno.h = global.Inferno.h || {}),global.Inferno));
}(this, (function (exports,inferno) { 'use strict';

// This should be boolean and no