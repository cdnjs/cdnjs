/**
 * React Router DOM v7.0.0-pre.1
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('react-router')) :
	typeof define === 'function' && define.amd ? define(['exports', 'react-router'], factory) :
	(global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.ReactRouterDOM = {}, global.ReactRouter));
})(this, (function (exports, reactRouter) { 'use strict';

	Object.keys(reactRouter).forEach(function (k) {
		if (k !== 'default' && !exports.hasOwnProperty(k)) Object.defineProperty(exports, k, {
			enumerable: true,
			get: function () { return reactRouter[k]; }
		});
	});

	Object.defineProperty(exports, '__esModule', { value: true });

}));
//# sourceMappingURL=react-router-dom.development.js.map
