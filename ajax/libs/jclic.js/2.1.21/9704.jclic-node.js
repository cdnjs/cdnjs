"use strict";
exports.id = 9704;
exports.ids = [9704];
exports.modules = {

/***/ 9704:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/*!
 *  File    : init-jsdom.js
 *  Created : 12/11/2024
 *  By      : Francesc Busquets <francesc@gmail.com>
 *
 *  JClic.js
 *  An HTML5 player of JClic activities
 *  https://projectestac.github.io/jclic.js
 *
 *  @source https://github.com/projectestac/jclic.js
 *
 *  @license EUPL-1.2
 *  @licstart
 *  (c) 2000-2024 Educational Telematic Network of Catalonia (XTEC)
 *
 *  Licensed under the EUPL, Version 1.1 or -as soon they will be approved by
 *  the European Commission- subsequent versions of the EUPL (the "Licence");
 *  You may not use this work except in compliance with the Licence.
 *
 *  You may obtain a copy of the Licence at:
 *  https://joinup.ec.europa.eu/software/page/eupl
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the Licence is distributed on an "AS IS" basis, WITHOUT
 *  WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 *  Licence for the specific language governing permissions and limitations
 *  under the Licence.
 *  @licend
 *  @module
 */

/* global global, console */

/**
 * Initializes some global variables needed for JClic in order to be used in nodeJS
 */

// import jsdom from 'jsdom';
const { default: jsdom } = await Promise.resolve(/* import() */).then(__webpack_require__.t.bind(__webpack_require__, 2325, 23));

// import { DOMParser } from '@xmldom/xmldom';
const { default: xmlDOM } = await Promise.resolve(/* import() */).then(__webpack_require__.t.bind(__webpack_require__, 511, 23));
const { DOMParser } = xmlDOM;

const dom = await new jsdom.JSDOM('<!DOCTYPE html><head></head><body></body>', { url: 'https://example.com' });

console.log('Hola!');
console.log(dom.window);

global.window = dom.window;
global.document = dom.window.document;
global.navigator = dom.window.navigator;
global.Image = dom.window.Image;
global.Audio = dom.window.Audio;
global.XMLHttpRequest = dom.window.XMLHttpRequest;
global.DOMParser = DOMParser;

// This is just a side-effect module
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({});

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } }, 1);

/***/ })

};
;
//# sourceMappingURL=9704.jclic-node.js.map