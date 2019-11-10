
/*!
 * inferno-test-utils v1.3.0-rc.8
 * (c) 2017 Dominic Gannaway'
 * Released under the MIT License.
 */

(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('inferno'), require('inferno-create-class'), require('inferno-create-element')) :
	typeof define === 'function' && define.amd ? define(['exports', 'inferno', 'inferno-create-class', 'inferno-create-element'], factory) :
	(factory((global['inferno-test-utils'] = global['inferno-test-u