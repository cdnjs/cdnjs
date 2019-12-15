
/*!
 * inferno-component v1.3.0-rc.8
 * (c) 2017 Dominic Gannaway'
 * Released under the MIT License.
 */

(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('inferno')) :
	typeof define === 'function' && define.amd ? define(['inferno'], factory) :
	(global['inferno-component'] = factory(global.Inferno));
}(this, (function (inferno) { 'use strict';

var NO_OP = '$NO_OP';
var ERROR_MSG = 'a runtime error occured! Use Inferno in deve