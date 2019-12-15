/*jshint curly:false, eqeqeq:true, laxbreak:true, noempty:false */
/* AUTO-GENERATED. DO NOT MODIFY. */
/*

  The MIT License (MIT)

  Copyright (c) 2007-2018 Einar Lielmanis, Liam Newman, and contributors.

  Permission is hereby granted, free of charge, to any person
  obtaining a copy of this software and associated documentation files
  (the "Software"), to deal in the Software without restriction,
  including without limitation the rights to use, copy, modify, merge,
  publish, distribute, sublicense, and/or sell copies of the Software,
  and to permit persons to whom the Software is furnished to do so,
  subject to the following conditions:

  The above copyright notice and this permission notice shall be
  included in all copies or substantial portions of the Software.

  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
  EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
  MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
  NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS
  BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
  ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
  CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
  SOFTWARE.


 Style HTML
---------------

  Written by Nochum Sossonko, (nsossonko@hotmail.com)

  Based on code initially developed by: Einar Lielmanis, <einar@jsbeautifier.org>
    http://jsbeautifier.org/

  Usage:
    style_html(html_source);

    style_html(html_source, options);

  The options are:
    indent_inner_html (default false)  — indent <head> and <body> sections,
    indent_size (default 4)          — indentation size,
    indent_char (default space)      — character to indent with,
    wrap_line_length (default 250)            -  maximum amount of characters per line (0 = disable)
    brace_style (default "collapse") - "collapse" | "expand" | "end-expand" | "none"
            put braces on the same line as control statements (default), or put braces on own line (Allman / ANSI style), or just put end braces on own line, or attempt to keep them where they are.
    inline (defaults to inline tags) - list of tags to be considered inline tags
    unformatted (defaults to inline tags) - list of tags, that shouldn't be reformatted
    content_unformatted (defaults to ["pre", "textarea"] tags) - list of tags, whose content shouldn't be reformatted
    indent_scripts (default normal)  - "keep"|"separate"|"normal"
    preserve_newlines (default true) - whether existing line breaks before elements should be preserved
                                        Only works before elements, not inside tags or for text.
    max_preserve_newlines (default unlimited) - maximum number of line breaks to be preserved in one chunk
    indent_handlebars (default false) - format and indent {{#foo}} and {{/foo}}
    end_with_newline (false)          - end with a newline
    extra_liners (default [head,body,/html]) -List of tags that should have an extra newline before them.

    e.g.

    style_html(html_source, {
      'indent_inner_html': false,
      'indent_size': 2,
      'indent_char': ' ',
      'wrap_line_length': 78,
      'brace_style': 'expand',
      'preserve_newlines': true,
      'max_preserve_newlines': 5,
      'indent_handlebars': false,
      'extra_liners': ['/html']
    });
*/

(function() {
var legacy_beautify_html =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 13);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */,
/* 1 */,
/* 2 */
/***/ (function(module, exports) {

/*jshint curly:true, eqeqeq:true, laxbreak:true, noempty:false */
/*

    The MIT License (MIT)

    Copyright (c) 2007-2018 Einar Lielmanis, Liam Newman, and contributors.

    Permission is hereby granted, free of charge, to any person
    obtaining a copy of this software and associated documentation files
    (the "Software"), to deal in the Software without restriction,
    including without limitation the rights to use, copy, modify, merge,
    publish, distribute, sublicense, and/or sell copies of the Software,
    and to permit persons to whom the Software is furnished to do so,
    subject to the following conditions:

    The above copyright notice and this permission notice shall be
    included in all copies or substantial portions of the Software.

    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
    EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
    MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
    NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS
    BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
    ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
    CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
    SOFTWARE.
*/

// merges child options up with the parent options object
// Example: obj = {a: 1, b: {a: 2}}
//          mergeOpts(obj, 'b')
//
//          Returns: {a: 2, b: {a: 2}}
function mergeOpts(allOptions, childFieldName) {
  var finalOpts = {};
  var name;

  for (name in allOptions) {
    if (name !== childFieldName) {
      finalOpts[name] = allOptions[name];
    }
  }

  //merge in the per type settings for the childFieldName
  if (childFieldName in allOptions) {
    for (name in allOptions[childFieldName]) {
      finalOpts[name] = allOptions[childFieldName][name];
    }
  }
  return finalOpts;
}

module.exports.mergeOpts = mergeOpts;

/***/ }),
/* 3 */
/***/ (function(module, exports) {

/* jshint curly: false */
// This section of code is taken from acorn.
//
// Acorn was written by Marijn Haverbeke and released under an MIT
// license. The Unicode regexps (for identifiers and whitespace) were
// taken from [Esprima](http://esprima.org) by Ariya Hidayat.
//
// Git repositories for Acorn are available at
//
//     http://marijnhaverbeke.nl/git/acorn
//     https://github.com/marijnh/acorn.git

// ## Character categories

// Big ugly regular expressions that match characters in the
// whitespace, identifier, and identifier-start categories. These
// are only applied when a character is found to actually have a
// code point above 128.

var nonASCIIwhitespace = /[\u1680\u180e\u2000-\u200a\u202f\u205f\u3000\ufeff]/; // jshint ignore:line
var baseASCIIidentifierStartChars = "\x24\x40\x41-\x5a\x5f\x61-\x7a";
var nonASCIIidentifierStartChars = "\xaa\xb5\xba\xc0-\xd6\xd8-\xf6\xf8-\u02c1\u02c6-\u02d1\u02e0-\u02e4\u02ec\u02ee\u0370-\u0374\u0376\u0377\u037a-\u037d\u0386\u0388-\u038a\u038c\u038e-\u03a1\u03a3-\u03f5\u03f7-\u0481\u048a-\u0527\u0531-\u0556\u0559\u0561-\u0587\u05d0-\u05ea\u05f0-\u05f2\u0620-\u064a\u066e\u066f\u0671-\u06d3\u06d5\u06e5\u06e6\u06ee\u06ef\u06fa-\u06fc\u06ff\u0710\u0712-\u072f\u074d-\u07a5\u07b1\u07ca-\u07ea\u07f4\u07f5\u07fa\u0800-\u0815\u081a\u0824\u0828\u0840-\u0858\u08a0\u08a2-\u08ac\u0904-\u0939\u093d\u0950\u0958-\u0961\u0971-\u0977\u0979-\u097f\u0985-\u098c\u098f\u0990\u0993-\u09a8\u09aa-\u09b0\u09b2\u09b6-\u09b9\u09bd\u09ce\u09dc\u09dd\u09df-\u09e1\u09f0\u09f1\u0a05-\u0a0a\u0a0f\u0a10\u0a13-\u0a28\u0a2a-\u0a30\u0a32\u0a33\u0a35\u0a36\u0a38\u0a39\u0a59-\u0a5c\u0a5e\u0a72-\u0a74\u0a85-\u0a8d\u0a8f-\u0a91\u0a93-\u0aa8\u0aaa-\u0ab0\u0ab2\u0ab3\u0ab5-\u0ab9\u0abd\u0ad0\u0ae0\u0ae1\u0b05-\u0b0c\u0b0f\u0b10\u0b13-\u0b28\u0b2a-\u0b30\u0b32\u0b33\u0b35-\u0b39\u0b3d\u0b5c\u0b5d\u0b5f-\u0b61\u0b71\u0b83\u0b85-\u0b8a\u0b8e-\u0b90\u0b92-\u0b95\u0b99\u0b9a\u0b9c\u0b9e\u0b9f\u0ba3\u0ba4\u0ba8-\u0baa\u0bae-\u0bb9\u0bd0\u0c05-\u0c0c\u0c0e-\u0c10\u0c12-\u0c28\u0c2a-\u0c33\u0c35-\u0c39\u0c3d\u0c58\u0c59\u0c60\u0c61\u0c85-\u0c8c\u0c8e-\u0c90\u0c92-\u0ca8\u0caa-\u0cb3\u0cb5-\u0cb9\u0cbd\u0cde\u0ce0\u0ce1\u0cf1\u0cf2\u0d05-\u0d0c\u0d0e-\u0d10\u0d12-\u0d3a\u0d3d\u0d4e\u0d60\u0d61\u0d7a-\u0d7f\u0d85-\u0d96\u0d9a-\u0db1\u0db3-\u0dbb\u0dbd\u0dc0-\u0dc6\u0e01-\u0e30\u0e32\u0e33\u0e40-\u0e46\u0e81\u0e82\u0e84\u0e87\u0e88\u0e8a\u0e8d\u0e94-\u0e97\u0e99-\u0e9f\u0ea1-\u0ea3\u0ea5\u0ea7\u0eaa\u0eab\u0ead-\u0eb0\u0eb2\u0eb3\u0ebd\u0ec0-\u0ec4\u0ec6\u0edc-\u0edf\u0f00\u0f40-\u0f47\u0f49-\u0f6c\u0f88-\u0f8c\u1000-\u102a\u103f\u1050-\u1055\u105a-\u105d\u1061\u1065\u1066\u106e-\u1070\u1075-\u1081\u108e\u10a0-\u10c5\u10c7\u10cd\u10d0-\u10fa\u10fc-\u1248\u124a-\u124d\u1250-\u1256\u1258\u125a-\u125d\u1260-\u1288\u128a-\u128d\u1290-\u12b0\u12b2-\u12b5\u12b8-\u12be\u12c0\u12c2-\u12c5\u12c8-\u12d6\u12d8-\u1310\u1312-\u1315\u1318-\u135a\u1380-\u138f\u13a0-\u13f4\u1401-\u166c\u166f-\u167f\u1681-\u169a\u16a0-\u16ea\u16ee-\u16f0\u1700-\u170c\u170e-\u1711\u1720-\u1731\u1740-\u1751\u1760-\u176c\u176e-\u1770\u1780-\u17b3\u17d7\u17dc\u1820-\u1877\u1880-\u18a8\u18aa\u18b0-\u18f5\u1900-\u191c\u1950-\u196d\u1970-\u1974\u1980-\u19ab\u19c1-\u19c7\u1a00-\u1a16\u1a20-\u1a54\u1aa7\u1b05-\u1b33\u1b45-\u1b4b\u1b83-\u1ba0\u1bae\u1baf\u1bba-\u1be5\u1c00-\u1c23\u1c4d-\u1c4f\u1c5a-\u1c7d\u1ce9-\u1cec\u1cee-\u1cf1\u1cf5\u1cf6\u1d00-\u1dbf\u1e00-\u1f15\u1f18-\u1f1d\u1f20-\u1f45\u1f48-\u1f4d\u1f50-\u1f57\u1f59\u1f5b\u1f5d\u1f5f-\u1f7d\u1f80-\u1fb4\u1fb6-\u1fbc\u1fbe\u1fc2-\u1fc4\u1fc6-\u1fcc\u1fd0-\u1fd3\u1fd6-\u1fdb\u1fe0-\u1fec\u1ff2-\u1ff4\u1ff6-\u1ffc\u2071\u207f\u2090-\u209c\u2102\u2107\u210a-\u2113\u2115\u2119-\u211d\u2124\u2126\u2128\u212a-\u212d\u212f-\u2139\u213c-\u213f\u2145-\u2149\u214e\u2160-\u2188\u2c00-\u2c2e\u2c30-\u2c5e\u2c60-\u2ce4\u2ceb-\u2cee\u2cf2\u2cf3\u2d00-\u2d25\u2d27\u2d2d\u2d30-\u2d67\u2d6f\u2d80-\u2d96\u2da0-\u2da6\u2da8-\u2dae\u2db0-\u2db6\u2db8-\u2dbe\u2dc0-\u2dc6\u2dc8-\u2dce\u2dd0-\u2dd6\u2dd8-\u2dde\u2e2f\u3005-\u3007\u3021-\u3029\u3031-\u3035\u3038-\u303c\u3041-\u3096\u309d-\u309f\u30a1-\u30fa\u30fc-\u30ff\u3105-\u312d\u3131-\u318e\u31a0-\u31ba\u31f0-\u31ff\u3400-\u4db5\u4e00-\u9fcc\ua000-\ua48c\ua4d0-\ua4fd\ua500-\ua60c\ua610-\ua61f\ua62a\ua62b\ua640-\ua66e\ua67f-\ua697\ua6a0-\ua6ef\ua717-\ua71f\ua722-\ua788\ua78b-\ua78e\ua790-\ua793\ua7a0-\ua7aa\ua7f8-\ua801\ua803-\ua805\ua807-\ua80a\ua80c-\ua822\ua840-\ua873\ua882-\ua8b3\ua8f2-\ua8f7\ua8fb\ua90a-\ua925\ua930-\ua946\ua960-\ua97c\ua984-\ua9b2\ua9cf\uaa00-\uaa28\uaa40-\uaa42\uaa44-\uaa4b\uaa60-\uaa76\uaa7a\uaa80-\uaaaf\uaab1\uaab5\uaab6\uaab9-\uaabd\uaac0\uaac2\uaadb-\uaadd\uaae0-\uaaea\uaaf2-\uaaf4\uab01-\uab06\uab09-\uab0e\uab11-\uab16\uab20-\uab26\uab28-\uab2e\uabc0-\uabe2\uac00-\ud7a3\ud7b0-\ud7c6\ud7cb-\ud7fb\uf900-\ufa6d\ufa70-\ufad9\ufb00-\ufb06\ufb13-\ufb17\ufb1d\ufb1f-\ufb28\ufb2a-\ufb36\ufb38-\ufb3c\ufb3e\ufb40\ufb41\ufb43\ufb44\ufb46-\ufbb1\ufbd3-\ufd3d\ufd50-\ufd8f\ufd92-\ufdc7\ufdf0-\ufdfb\ufe70-\ufe74\ufe76-\ufefc\uff21-\uff3a\uff41-\uff5a\uff66-\uffbe\uffc2-\uffc7\uffca-\uffcf\uffd2-\uffd7\uffda-\uffdc";
var baseASCIIidentifierChars = "\x24\x30-\x39\x41-\x5a\x5f\x61-\x7a";
var nonASCIIidentifierChars = "\u0300-\u036f\u0483-\u0487\u0591-\u05bd\u05bf\u05c1\u05c2\u05c4\u05c5\u05c7\u0610-\u061a\u0620-\u0649\u0672-\u06d3\u06e7-\u06e8\u06fb-\u06fc\u0730-\u074a\u0800-\u0814\u081b-\u0823\u0825-\u0827\u0829-\u082d\u0840-\u0857\u08e4-\u08fe\u0900-\u0903\u093a-\u093c\u093e-\u094f\u0951-\u0957\u0962-\u0963\u0966-\u096f\u0981-\u0983\u09bc\u09be-\u09c4\u09c7\u09c8\u09d7\u09df-\u09e0\u0a01-\u0a03\u0a3c\u0a3e-\u0a42\u0a47\u0a48\u0a4b-\u0a4d\u0a51\u0a66-\u0a71\u0a75\u0a81-\u0a83\u0abc\u0abe-\u0ac5\u0ac7-\u0ac9\u0acb-\u0acd\u0ae2-\u0ae3\u0ae6-\u0aef\u0b01-\u0b03\u0b3c\u0b3e-\u0b44\u0b47\u0b48\u0b4b-\u0b4d\u0b56\u0b57\u0b5f-\u0b60\u0b66-\u0b6f\u0b82\u0bbe-\u0bc2\u0bc6-\u0bc8\u0bca-\u0bcd\u0bd7\u0be6-\u0bef\u0c01-\u0c03\u0c46-\u0c48\u0c4a-\u0c4d\u0c55\u0c56\u0c62-\u0c63\u0c66-\u0c6f\u0c82\u0c83\u0cbc\u0cbe-\u0cc4\u0cc6-\u0cc8\u0cca-\u0ccd\u0cd5\u0cd6\u0ce2-\u0ce3\u0ce6-\u0cef\u0d02\u0d03\u0d46-\u0d48\u0d57\u0d62-\u0d63\u0d66-\u0d6f\u0d82\u0d83\u0dca\u0dcf-\u0dd4\u0dd6\u0dd8-\u0ddf\u0df2\u0df3\u0e34-\u0e3a\u0e40-\u0e45\u0e50-\u0e59\u0eb4-\u0eb9\u0ec8-\u0ecd\u0ed0-\u0ed9\u0f18\u0f19\u0f20-\u0f29\u0f35\u0f37\u0f39\u0f41-\u0f47\u0f71-\u0f84\u0f86-\u0f87\u0f8d-\u0f97\u0f99-\u0fbc\u0fc6\u1000-\u1029\u1040-\u1049\u1067-\u106d\u1071-\u1074\u1082-\u108d\u108f-\u109d\u135d-\u135f\u170e-\u1710\u1720-\u1730\u1740-\u1750\u1772\u1773\u1780-\u17b2\u17dd\u17e0-\u17e9\u180b-\u180d\u1810-\u1819\u1920-\u192b\u1930-\u193b\u1951-\u196d\u19b0-\u19c0\u19c8-\u19c9\u19d0-\u19d9\u1a00-\u1a15\u1a20-\u1a53\u1a60-\u1a7c\u1a7f-\u1a89\u1a90-\u1a99\u1b46-\u1b4b\u1b50-\u1b59\u1b6b-\u1b73\u1bb0-\u1bb9\u1be6-\u1bf3\u1c00-\u1c22\u1c40-\u1c49\u1c5b-\u1c7d\u1cd0-\u1cd2\u1d00-\u1dbe\u1e01-\u1f15\u200c\u200d\u203f\u2040\u2054\u20d0-\u20dc\u20e1\u20e5-\u20f0\u2d81-\u2d96\u2de0-\u2dff\u3021-\u3028\u3099\u309a\ua640-\ua66d\ua674-\ua67d\ua69f\ua6f0-\ua6f1\ua7f8-\ua800\ua806\ua80b\ua823-\ua827\ua880-\ua881\ua8b4-\ua8c4\ua8d0-\ua8d9\ua8f3-\ua8f7\ua900-\ua909\ua926-\ua92d\ua930-\ua945\ua980-\ua983\ua9b3-\ua9c0\uaa00-\uaa27\uaa40-\uaa41\uaa4c-\uaa4d\uaa50-\uaa59\uaa7b\uaae0-\uaae9\uaaf2-\uaaf3\uabc0-\uabe1\uabec\uabed\uabf0-\uabf9\ufb20-\ufb28\ufe00-\ufe0f\ufe20-\ufe26\ufe33\ufe34\ufe4d-\ufe4f\uff10-\uff19\uff3f";
//var nonASCIIidentifierStart = new RegExp("[" + nonASCIIidentifierStartChars + "]");
//var nonASCIIidentifier = new RegExp("[" + nonASCIIidentifierStartChars + nonASCIIidentifierChars + "]");

var identifierStart = new RegExp("[" + baseASCIIidentifierStartChars + nonASCIIidentifierStartChars + "]");
var identifierChars = new RegExp("[" + baseASCIIidentifierChars + nonASCIIidentifierStartChars + nonASCIIidentifierChars + "]");

exports.identifier = new RegExp("[" + baseASCIIidentifierStartChars + nonASCIIidentifierStartChars + "][" + baseASCIIidentifierChars + nonASCIIidentifierStartChars + nonASCIIidentifierChars + "]*", 'g');


// Whether a single character denotes a newline.

exports.newline = /[\n\r\u2028\u2029]/;

// Matches a whole line break (where CRLF is considered a single
// line break). Used to count lines.

// in javascript, these two differ
// in python they are the same, different methods are called on them
exports.lineBreak = new RegExp('\r\n|' + exports.newline.source);
exports.allLineBreaks = new RegExp(exports.lineBreak.source, 'g');


// Test whether a given character code starts an identifier.

exports.isIdentifierStart = function(code) {
  // // permit $ (36) and @ (64). @ is used in ES7 decorators.
  // if (code < 65) return code === 36 || code === 64;
  // // 65 through 91 are uppercase letters.
  // if (code < 91) return true;
  // // permit _ (95).
  // if (code < 97) return code === 95;
  // // 97 through 123 are lowercase letters.
  // if (code < 123) return true;
  return identifierStart.test(String.fromCharCode(code));
};

// Test whether a given character is part of an identifier.

exports.isIdentifierChar = function(code) {
  // if (code < 48) return code === 36;
  // if (code < 58) return true;
  // if (code < 65) return false;
  // if (code < 91) return true;
  // if (code < 97) return code === 95;
  // if (code < 123) return true;
  return identifierChars.test(String.fromCharCode(code));
};

/***/ }),
/* 4 */,
/* 5 */,
/* 6 */
/***/ (function(module, exports) {

/*jshint curly:true, eqeqeq:true, laxbreak:true, noempty:false */
/*

  The MIT License (MIT)

  Copyright (c) 2007-2018 Einar Lielmanis, Liam Newman, and contributors.

  Permission is hereby granted, free of charge, to any person
  obtaining a copy of this software and associated documentation files
  (the "Software"), to deal in the Software without restriction,
  including without limitation the rights to use, copy, modify, merge,
  publish, distribute, sublicense, and/or sell copies of the Software,
  and to permit persons to whom the Software is furnished to do so,
  subject to the following conditions:

  The above copyright notice and this permission notice shall be
  included in all copies or substantial portions of the Software.

  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
  EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
  MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
  NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS
  BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
  ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
  CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
  SOFTWARE.
*/

function InputScanner(input_string) {
  this._input = input_string || '';
  this._input_length = this._input.length;
  this._position = 0;
}

InputScanner.prototype.restart = function() {
  this._position = 0;
};

InputScanner.prototype.back = function() {
  if (this._position > 0) {
    this._position -= 1;
  }
};

InputScanner.prototype.hasNext = function() {
  return this._position < this._input_length;
};

InputScanner.prototype.next = function() {
  var val = null;
  if (this.hasNext()) {
    val = this._input.charAt(this._position);
    this._position += 1;
  }
  return val;
};

InputScanner.prototype.peek = function(index) {
  var val = null;
  index = index || 0;
  index += this._position;
  if (index >= 0 && index < this._input_length) {
    val = this._input.charAt(index);
  }
  return val;
};

InputScanner.prototype.test = function(pattern, index) {
  index = index || 0;
  index += this._position;
  pattern.lastIndex = index;

  if (index >= 0 && index < this._input_length) {
    var pattern_match = pattern.exec(this._input);
    return pattern_match && pattern_match.index === index;
  } else {
    return false;
  }
};

InputScanner.prototype.testChar = function(pattern, index) {
  // test one character regex match
  var val = this.peek(index);
  return val !== null && pattern.test(val);
};

InputScanner.prototype.match = function(pattern) {
  pattern.lastIndex = this._position;
  var pattern_match = pattern.exec(this._input);
  if (pattern_match && pattern_match.index === this._position) {
    this._position += pattern_match[0].length;
  } else {
    pattern_match = null;
  }
  return pattern_match;
};

InputScanner.prototype.read = function(pattern) {
  var val = '';
  var match = this.match(pattern);
  if (match) {
    val = match[0];
  }
  return val;
};

InputScanner.prototype.readUntil = function(pattern, include_match) {
  var val = '';
  var match_index = this._position;
  pattern.lastIndex = this._position;
  var pattern_match = pattern.exec(this._input);
  if (pattern_match) {
    if (include_match) {
      match_index = pattern_match.index + pattern_match[0].length;
    } else {
      match_index = pattern_match.index;
    }
  } else {
    match_index = this._input_length;
  }

  val = this._input.substring(this._position, match_index);
  this._position = match_index;
  return val;
};

InputScanner.prototype.readUntilAfter = function(pattern) {
  return this.readUntil(pattern, true);
};

/* css beautifier legacy helpers */
InputScanner.prototype.peekUntilAfter = function(pattern) {
  var start = this._position;
  var val = this.readUntilAfter(pattern);
  this._position = start;
  return val;
};

InputScanner.prototype.lookBack = function(testVal) {
  var start = this._position - 1;
  return start >= testVal.length && this._input.substring(start - testVal.length, start)
    .toLowerCase() === testVal;
};


module.exports.InputScanner = InputScanner;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

/*jshint curly:true, eqeqeq:true, laxbreak:true, noempty:false */
/*

    The MIT License (MIT)

    Copyright (c) 2007-2018 Einar Lielmanis, Liam Newman, and contributors.

    Permission is hereby granted, free of charge, to any person
    obtaining a copy of this software and associated documentation files
    (the "Software"), to deal in the Software without restriction,
    including without limitation the rights to use, copy, modify, merge,
    publish, distribute, sublicense, and/or sell copies of the Software,
    and to permit persons to whom the Software is furnished to do so,
    subject to the following conditions:

    The above copyright notice and this permission notice shall be
    included in all copies or substantial portions of the Software.

    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
    EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
    MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
    NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS
    BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
    ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
    CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
    SOFTWARE.
*/

var InputScanner = __webpack_require__(6).InputScanner;
var Token = __webpack_require__(8).Token;
var TokenStream = __webpack_require__(9).TokenStream;

var TOKEN = {
  START: 'TK_START',
  RAW: 'TK_RAW',
  EOF: 'TK_EOF'
};

var Tokenizer = function(input_string) { // jshint unused:false
  this._input = new InputScanner(input_string);
  this._tokens = null;
  this._newline_count = 0;
  this._whitespace_before_token = '';

  this._whitespace_pattern = /[\n\r\u2028\u2029\t ]+/g;
  this._newline_pattern = /([\t ]*)(\r\n|[\n\r\u2028\u2029])?/g;
};

Tokenizer.prototype.tokenize = function() {
  this._input.restart();
  this._tokens = new TokenStream();

  this.reset();

  var current;
  var previous = new Token(TOKEN.START, '');
  var open_token = null;
  var open_stack = [];
  var comments = new TokenStream();

  while (previous.type !== TOKEN.EOF) {
    current = this.get_next_token(previous, open_token);
    while (this.is_comment(current)) {
      comments.add(current);
      current = this.get_next_token(previous, open_token);
    }

    if (!comments.isEmpty()) {
      current.comments_before = comments;
      comments = new TokenStream();
    }

    current.parent = open_token;

    if (this.is_opening(current)) {
      current.opened = open_token;
      open_stack.push(open_token);
      open_token = current;
    } else if (open_token && this.is_closing(current, open_token)) {
      current.opened = open_token;
      open_token = open_stack.pop();
      current.parent = open_token;
    }

    current.previous = previous;

    this._tokens.add(current);
    previous = current;
  }

  return this._tokens;
};


Tokenizer.prototype.reset = function() {};

Tokenizer.prototype.get_next_token = function(previous_token, open_token) { // jshint unused:false
  this.readWhitespace();
  var resulting_string = this._input.read(/.+/g);
  if (resulting_string) {
    return this.create_token(TOKEN.RAW, resulting_string);
  } else {
    return this.create_token(TOKEN.EOF, '');
  }
};


Tokenizer.prototype.is_comment = function(current_token) { // jshint unused:false
  return false;
};

Tokenizer.prototype.is_opening = function(current_token) { // jshint unused:false
  return false;
};

Tokenizer.prototype.is_closing = function(current_token, open_token) { // jshint unused:false
  return false;
};

Tokenizer.prototype.create_token = function(type, text) {
  var token = new Token(type, text, this._newline_count, this._whitespace_before_token);
  this._newline_count = 0;
  this._whitespace_before_token = '';
  return token;
};

Tokenizer.prototype.readWhitespace = function() {
  var resulting_string = this._input.read(this._whitespace_pattern);
  if (resulting_string !== '') {
    if (resulting_string === ' ') {
      this._whitespace_before_token = resulting_string;
    } else {
      this._newline_pattern.lastIndex = 0;
      var nextMatch = this._newline_pattern.exec(resulting_string);
      while (nextMatch[2]) {
        this._newline_count += 1;
        nextMatch = this._newline_pattern.exec(resulting_string);
      }
      this._whitespace_before_token = nextMatch[1];
    }
  }
};



module.exports.Tokenizer = Tokenizer;
module.exports.TOKEN = TOKEN;

/***/ }),
/* 8 */
/***/ (function(module, exports) {

/*jshint curly:true, eqeqeq:true, laxbreak:true, noempty:false */
/*

  The MIT License (MIT)

  Copyright (c) 2007-2018 Einar Lielmanis, Liam Newman, and contributors.

  Permission is hereby granted, free of charge, to any person
  obtaining a copy of this software and associated documentation files
  (the "Software"), to deal in the Software without restriction,
  including without limitation the rights to use, copy, modify, merge,
  publish, distribute, sublicense, and/or sell copies of the Software,
  and to permit persons to whom the Software is furnished to do so,
  subject to the following conditions:

  The above copyright notice and this permission notice shall be
  included in all copies or substantial portions of the Software.

  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
  EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
  MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
  NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS
  BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
  ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
  CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
  SOFTWARE.
*/

function Token(type, text, newlines, whitespace_before) {
  this.type = type;
  this.text = text;

  // comments_before are
  // comments that have a new line before them
  // and may or may not have a newline after
  // this is a set of comments before
  this.comments_before = null; /* inline comment*/


  // this.comments_after =  new TokenStream(); // no new line before and newline after
  this.newlines = newlines || 0;
  this.whitespace_before = whitespace_before || '';
  this.parent = null;
  this.previous = null;
  this.opened = null;
  this.directives = null;
}


module.exports.Token = Token;

/***/ }),
/* 9 */
/***/ (function(module, exports) {

/*jshint curly:true, eqeqeq:true, laxbreak:true, noempty:false */
/*

    The MIT License (MIT)

    Copyright (c) 2007-2018 Einar Lielmanis, Liam Newman, and contributors.

    Permission is hereby granted, free of charge, to any person
    obtaining a copy of this software and associated documentation files
    (the "Software"), to deal in the Software without restriction,
    including without limitation the rights to use, copy, modify, merge,
    publish, distribute, sublicense, and/or sell copies of the Software,
    and to permit persons to whom the Software is furnished to do so,
    subject to the following conditions:

    The above copyright notice and this permission notice shall be
    included in all copies or substantial portions of the Software.

    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
    EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
    MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
    NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS
    BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
    ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
    CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
    SOFTWARE.
*/

function TokenStream(parent_token) {
  // private
  this._tokens = [];
  this._tokens_length = this._tokens.length;
  this._position = 0;
  this._parent_token = parent_token;
}

TokenStream.prototype.restart = function() {
  this._position = 0;
};

TokenStream.prototype.isEmpty = function() {
  return this._tokens_length === 0;
};

TokenStream.prototype.hasNext = function() {
  return this._position < this._tokens_length;
};

TokenStream.prototype.next = function() {
  var val = null;
  if (this.hasNext()) {
    val = this._tokens[this._position];
    this._position += 1;
  }
  return val;
};

TokenStream.prototype.peek = function(index) {
  var val = null;
  index = index || 0;
  index += this._position;
  if (index >= 0 && index < this._tokens_length) {
    val = this._tokens[index];
  }
  return val;
};

TokenStream.prototype.add = function(token) {
  if (this._parent_token) {
    token.parent = this._parent_token;
  }
  this._tokens.push(token);
  this._tokens_length += 1;
};

module.exports.TokenStream = TokenStream;

/***/ }),
/* 10 */
/***/ (function(module, exports) {

/*jshint curly:true, eqeqeq:true, laxbreak:true, noempty:false */
/*

    The MIT License (MIT)

    Copyright (c) 2007-2018 Einar Lielmanis, Liam Newman, and contributors.

    Permission is hereby granted, free of charge, to any person
    obtaining a copy of this software and associated documentation files
    (the "Software"), to deal in the Software without restriction,
    including without limitation the rights to use, copy, modify, merge,
    publish, distribute, sublicense, and/or sell copies of the Software,
    and to permit persons to whom the Software is furnished to do so,
    subject to the following conditions:

    The above copyright notice and this permission notice shall be
    included in all copies or substantial portions of the Software.

    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
    EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
    MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
    NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS
    BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
    ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
    CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
    SOFTWARE.
*/


function Directives(start_block_pattern, end_block_pattern) {
  start_block_pattern = typeof start_block_pattern === 'string' ? start_block_pattern : start_block_pattern.source;
  end_block_pattern = typeof end_block_pattern === 'string' ? end_block_pattern : end_block_pattern.source;
  this._directives_block_pattern = new RegExp(start_block_pattern + / beautify( \w+[:]\w+)+ /.source + end_block_pattern, 'g');
  this._directive_pattern = / (\w+)[:](\w+)/g;

  this._directives_end_ignore_pattern = new RegExp('(?:[\\s\\S]*?)((?:' + start_block_pattern + /\sbeautify\signore:end\s/.source + end_block_pattern + ')|$)', 'g');
}

Directives.prototype.get_directives = function(text) {
  if (!text.match(this._directives_block_pattern)) {
    return null;
  }

  var directives = {};
  this._directive_pattern.lastIndex = 0;
  var directive_match = this._directive_pattern.exec(text);

  while (directive_match) {
    directives[directive_match[1]] = directive_match[2];
    directive_match = this._directive_pattern.exec(text);
  }

  return directives;
};

Directives.prototype.readIgnored = function(input) {
  return input.read(this._directives_end_ignore_pattern);
};


module.exports.Directives = Directives;

/***/ }),
/* 11 */,
/* 12 */,
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

/*jshint curly:true, eqeqeq:true, laxbreak:true, noempty:false */
/*

    The MIT License (MIT)

    Copyright (c) 2007-2018 Einar Lielmanis, Liam Newman, and contributors.

    Permission is hereby granted, free of charge, to any person
    obtaining a copy of this software and associated documentation files
    (the "Software"), to deal in the Software without restriction,
    including without limitation the rights to use, copy, modify, merge,
    publish, distribute, sublicense, and/or sell copies of the Software,
    and to permit persons to whom the Software is furnished to do so,
    subject to the following conditions:

    The above copyright notice and this permission notice shall be
    included in all copies or substantial portions of the Software.

    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
    EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
    MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
    NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS
    BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
    ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
    CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
    SOFTWARE.
*/

var Beautifier = __webpack_require__(14).Beautifier;

function style_html(html_source, options, js_beautify, css_beautify) {
  var beautifier = new Beautifier(html_source, options, js_beautify, css_beautify);
  return beautifier.beautify();
}

module.exports = style_html;

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

/*jshint curly:true, eqeqeq:true, laxbreak:true, noempty:false */
/*

  The MIT License (MIT)

  Copyright (c) 2007-2018 Einar Lielmanis, Liam Newman, and contributors.

  Permission is hereby granted, free of charge, to any person
  obtaining a copy of this software and associated documentation files
  (the "Software"), to deal in the Software without restriction,
  including without limitation the rights to use, copy, modify, merge,
  publish, distribute, sublicense, and/or sell copies of the Software,
  and to permit persons to whom the Software is furnished to do so,
  subject to the following conditions:

  The above copyright notice and this permission notice shall be
  included in all copies or substantial portions of the Software.

  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
  EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
  MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
  NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS
  BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
  ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
  CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
  SOFTWARE.
*/

var mergeOpts = __webpack_require__(2).mergeOpts;
var acorn = __webpack_require__(3);
var InputScanner = __webpack_require__(6).InputScanner;
var Tokenizer = __webpack_require__(15).Tokenizer;
var TOKEN = __webpack_require__(15).TOKEN;

var lineBreak = acorn.lineBreak;
var allLineBreaks = acorn.allLineBreaks;

// function trim(s) {
//     return s.replace(/^\s+|\s+$/g, '');
// }

function ltrim(s) {
  return s.replace(/^\s+/g, '');
}

function rtrim(s) {
  return s.replace(/\s+$/g, '');
}

function Beautifier(html_source, options, js_beautify, css_beautify) {
  //Wrapper function to invoke all the necessary constructors and deal with the output.
  html_source = html_source || '';
  options = options || {};

  var multi_parser,
    indent_inner_html,
    indent_body_inner_html,
    indent_head_inner_html,
    indent_size,
    indent_character,
    wrap_line_length,
    brace_style,
    inline_tags,
    unformatted,
    content_unformatted,
    preserve_newlines,
    max_preserve_newlines,
    indent_handlebars,
    wrap_attributes,
    wrap_attributes_indent_size,
    is_wrap_attributes_force,
    is_wrap_attributes_force_expand_multiline,
    is_wrap_attributes_force_aligned,
    is_wrap_attributes_aligned_multiple,
    end_with_newline,
    extra_liners,
    eol;

  // Allow the setting of language/file-type specific options
  // with inheritance of overall settings
  options = mergeOpts(options, 'html');

  // backwards compatibility to 1.3.4
  if ((options.wrap_line_length === undefined || parseInt(options.wrap_line_length, 10) === 0) &&
    (options.max_char !== undefined && parseInt(options.max_char, 10) !== 0)) {
    options.wrap_line_length = options.max_char;
  }

  indent_inner_html = (options.indent_inner_html === undefined) ? false : options.indent_inner_html;
  indent_body_inner_html = (options.indent_body_inner_html === undefined) ? true : options.indent_body_inner_html;
  indent_head_inner_html = (options.indent_head_inner_html === undefined) ? true : options.indent_head_inner_html;
  indent_size = (options.indent_size === undefined) ? 4 : parseInt(options.indent_size, 10);
  indent_character = (options.indent_char === undefined) ? ' ' : options.indent_char;
  brace_style = (options.brace_style === undefined) ? 'collapse' : options.brace_style;
  wrap_line_length = parseInt(options.wrap_line_length, 10) === 0 ? 32786 : parseInt(options.wrap_line_length || 250, 10);
  inline_tags = options.inline || [
    // https://www.w3.org/TR/html5/dom.html#phrasing-content
    'a', 'abbr', 'area', 'audio', 'b', 'bdi', 'bdo', 'br', 'button', 'canvas', 'cite',
    'code', 'data', 'datalist', 'del', 'dfn', 'em', 'embed', 'i', 'iframe', 'img',
    'input', 'ins', 'kbd', 'keygen', 'label', 'map', 'mark', 'math', 'meter', 'noscript',
    'object', 'output', 'progress', 'q', 'ruby', 's', 'samp', /* 'script', */ 'select', 'small',
    'span', 'strong', 'sub', 'sup', 'svg', 'template', 'textarea', 'time', 'u', 'var',
    'video', 'wbr', 'text',
    // prexisting - not sure of full effect of removing, leaving in
    'acronym', 'address', 'big', 'dt', 'ins', 'strike', 'tt'
  ];
  unformatted = options.unformatted || [];
  content_unformatted = options.content_unformatted || [
    'pre', 'textarea'
  ];
  preserve_newlines = (options.preserve_newlines === undefined) ? true : options.preserve_newlines;
  max_preserve_newlines = preserve_newlines ?
    (isNaN(parseInt(options.max_preserve_newlines, 10)) ? 32786 : parseInt(options.max_preserve_newlines, 10)) :
    0;
  indent_handlebars = (options.indent_handlebars === undefined) ? false : options.indent_handlebars;
  wrap_attributes = (options.wrap_attributes === undefined) ? 'auto' : options.wrap_attributes;
  wrap_attributes_indent_size = (isNaN(parseInt(options.wrap_attributes_indent_size, 10))) ? indent_size : parseInt(options.wrap_attributes_indent_size, 10);
  is_wrap_attributes_force = wrap_attributes.substr(0, 'force'.length) === 'force';
  is_wrap_attributes_force_expand_multiline = (wrap_attributes === 'force-expand-multiline');
  is_wrap_attributes_force_aligned = (wrap_attributes === 'force-aligned');
  is_wrap_attributes_aligned_multiple = (wrap_attributes === 'aligned-multiple');
  end_with_newline = (options.end_with_newline === undefined) ? false : options.end_with_newline;
  extra_liners = (typeof options.extra_liners === 'object') && options.extra_liners ?
    options.extra_liners.concat() : (typeof options.extra_liners === 'string') ?
    options.extra_liners.split(',') : 'head,body,/html'.split(',');
  eol = options.eol ? options.eol : 'auto';

  if (options.indent_with_tabs) {
    indent_character = '\t';
    indent_size = 1;
  }

  if (eol === 'auto') {
    eol = '\n';
    if (html_source && lineBreak.test(html_source || '')) {
      eol = html_source.match(lineBreak)[0];
    }
  }

  eol = eol.replace(/\\r/, '\r').replace(/\\n/, '\n');

  // HACK: newline parsing inconsistent. This brute force normalizes the input.
  html_source = html_source.replace(allLineBreaks, '\n');

  this._tokens = null;

  this._options = {};
  this._options.indent_handlebars = indent_handlebars;
  this._options.unformatted = unformatted || [];
  this._options.content_unformatted = content_unformatted || [];



  function Parser() {

    this.parser_token = '';
    this.tags = { //An object to hold tags, their position, and their parent-tags, initiated with default values
      parent: null,
      tag: '',
      indent_level: 0,
      parser_token: null
    };
    this.last_token = {
      text: '',
      type: ''
    };
    this.token_text = '';
    this.newlines = 0;
    this.indent_content = indent_inner_html;
    this.indent_body_inner_html = indent_body_inner_html;
    this.indent_head_inner_html = indent_head_inner_html;

    this.Utils = { //Uilities made available to the various functions
      whitespace: "\n\r\t ".split(''),

      single_token: options.void_elements || [
        // HTLM void elements - aka self-closing tags - aka singletons
        // https://www.w3.org/html/wg/drafts/html/master/syntax.html#void-elements
        'area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'keygen',
        'link', 'menuitem', 'meta', 'param', 'source', 'track', 'wbr',
        // NOTE: Optional tags - are not understood.
        // https://www.w3.org/TR/html5/syntax.html#optional-tags
        // The rules for optional tags are too complex for a simple list
        // Also, the content of these tags should still be indented in many cases.
        // 'li' is a good exmple.

        // Doctype and xml elements
        '!doctype', '?xml',
        // ?php and ?= tags
        '?php', '?=',
        // other tags that were in this list, keeping just in case
        'basefont', 'isindex'
      ],
      extra_liners: extra_liners, //for tags that need a line of whitespace before them
      in_array: function(what, arr) {
        return arr.indexOf(what) !== -1;
      }
    };

    this.record_tag = function(tag, parser_token) { //function to record a tag and its parent in this.tags Object
      var new_tag = {
        parent: this.tags,
        tag: tag,
        indent_level: this.indent_level,
        parser_token: parser_token
      };

      this.tags = new_tag;
    };

    this.retrieve_tag = function(tag) { //function to retrieve the opening tag to the corresponding closer
      var parser_token = null;
      var temp_parent = this.tags;

      while (temp_parent) { //till we reach '' (the initial value);
        if (temp_parent.tag === tag) { //if this is it use it
          break;
        }
        temp_parent = temp_parent.parent;
      }


      if (temp_parent) {
        parser_token = temp_parent.parser_token;
        this.indent_level = temp_parent.indent_level;
        this.tags = temp_parent.parent;

      }
      return parser_token;
    };

    this.indent_to_tag = function(tag_list) {
      var temp_parent = this.tags;

      while (temp_parent) { //till we reach '' (the initial value);
        if (tag_list.indexOf(temp_parent.tag) !== -1) { //if this is it use it
          break;
        }
        temp_parent = temp_parent.parent;
      }

      if (temp_parent) {
        this.indent_level = temp_parent.indent_level;
      }
    };

    this.get_tag = function(raw_token) { //function to get a full tag and parse its type
      var parser_token = {
          parent: this.tags.parser_token,
          text: '',
          type: '',
          tag_name: '',
          is_inline_tag: false,
          is_unformatted: false,
          is_content_unformatted: false,
          is_opening_tag: false,
          is_closing_tag: false,
          multiline_content: false,
          start_tag_token: null
        },
        content = [],
        space = false,
        attr_count = 0,
        has_wrapped_attrs = false,
        tag_reading_finished = false,
        tag_start_char,
        tag_check = '',
        alignment_size = wrap_attributes_indent_size,
        alignment_string = '',
        custom_beautifier = false;

      tag_start_char = raw_token.text[0];
      if (tag_start_char === '<') {
        tag_check = raw_token.text.match(/^<([^\s>]*)/)[1];
      } else {
        tag_check = raw_token.text.match(/^{{\#?([^\s}]+)/)[1];
      }
      tag_check = tag_check.toLowerCase();

      if (raw_token.type === TOKEN.COMMENT) {
        tag_reading_finished = true;
      } else if (raw_token.type === TOKEN.TAG_OPEN) {
        space = tag_start_char === '<' || this._tokens.peek().type !== TOKEN.TAG_CLOSE;
      } else {
        throw "Unhandled token!";
      }

      parser_token.is_closing_tag = tag_check.charAt(0) === '/';
      parser_token.tag_name = parser_token.is_closing_tag ? tag_check.substr(1) : tag_check;
      parser_token.is_inline_tag = this.Utils.in_array(parser_token.tag_name, inline_tags) || tag_start_char === '{';
      parser_token.is_unformatted = this.Utils.in_array(tag_check, unformatted);
      parser_token.is_content_unformatted = this.Utils.in_array(tag_check, content_unformatted);

      if (parser_token.is_unformatted || parser_token.is_content_unformatted) {
        // do not assign type to unformatted yet.
      } else if (this.Utils.in_array(tag_check, this.Utils.single_token)) { //if this tag name is a single tag type (either in the list or has a closing /)
        parser_token.type = 'TK_TAG_SINGLE';
        parser_token.is_closing_tag = true;
      } else if (indent_handlebars && tag_start_char === '{' && tag_check === 'else') {
        this.indent_to_tag(['if', 'unless']);
        parser_token.type = 'TK_TAG_HANDLEBARS_ELSE';
        this.indent_content = true;
      } else if (indent_handlebars && tag_start_char === '{' && (/[^#\^\/]/.test(raw_token.text.charAt(2)))) {
        parser_token.type = 'TK_TAG_SINGLE';
        parser_token.is_closing_tag = true;
      } else if (tag_check.charAt(0) === '!') { //peek for <! comment
        // for comments content is already correct.
        parser_token.type = 'TK_TAG_SINGLE';
      } else if (parser_token.is_closing_tag) { //this tag is a double tag so check for tag-ending
        parser_token.start_tag_token = this.retrieve_tag(tag_check.substring(1)); //remove it and all ancestors
        parser_token.type = 'TK_TAG_END';
      }

      this.traverse_whitespace(raw_token);

      if (this.Utils.in_array(tag_check, this.Utils.extra_liners)) { //check if this double needs an extra line
        this.print_newline(false, this.output);
        if (this.output.length && this.output[this.output.length - 2] !== '\n') {
          this.print_newline(true, this.output);
        }
      }

      this.print_indentation(this.output);

      this.add_text_item(content, raw_token.text);

      if (!tag_reading_finished && this._tokens.peek().type !== TOKEN.EOF) {
        //indent attributes an auto, forced, aligned or forced-align line-wrap
        if (is_wrap_attributes_force_aligned || is_wrap_attributes_aligned_multiple) {
          alignment_size = raw_token.text.length + 1;
        }

        // only ever further indent with spaces since we're trying to align characters
        alignment_string = Array(alignment_size + 1).join(' ');

        // By default, use the custom beautifiers for script and style
        custom_beautifier = tag_check === 'script' || tag_check === 'style';

        raw_token = this._tokens.next();
        while (raw_token.type !== TOKEN.EOF) {

          if (parser_token.is_unformatted) {
            this.add_raw_token(content, raw_token);
            if (raw_token.type === TOKEN.TAG_CLOSE || this._tokens.peek().type === TOKEN.EOF) {
              break;
            }

            raw_token = this._tokens.next();
            continue;
          }

          if (tag_start_char === '<') {
            if (raw_token.type === TOKEN.ATTRIBUTE) {
              space = true;
              attr_count += 1;

              if ((tag_check === 'script' || tag_check === 'style') && raw_token.text === 'type') {
                // For script and style tags that have a type attribute, only enable custom beautifiers for matching values
                custom_beautifier = false;
                var peekEquals = this._tokens.peek();
                var peekValue = this._tokens.peek(1);
                if (peekEquals && peekEquals.type === TOKEN.EQUALS && peekValue && peekValue.type === TOKEN.VALUE) {
                  custom_beautifier = custom_beautifier ||
                    (tag_check === 'script' && peekValue.text.search(/(text|application|dojo)\/(x-)?(javascript|ecmascript|jscript|livescript|(ld\+)?json|method|aspect)/) > -1) ||
                    (tag_check === 'style' && peekValue.text.search('text/css') > -1);
                }
              } else if (raw_token.type === TOKEN.EQUALS) { //no space before =
                space = false;
              } else if (raw_token.type === TOKEN.VALUE && raw_token.previous.type === TOKEN.EQUALS) { //no space before value
                space = false;
              }
            } else if (raw_token.type === TOKEN.TEXT) {
              space = true;
            } else if (raw_token.type === TOKEN.TAG_CLOSE) {
              space = raw_token.text[0] === '/'; // space before />, no space before >
            } else {
              space = raw_token.newlines || raw_token.whitespace_before !== '';
            }

            if (is_wrap_attributes_force_expand_multiline && has_wrapped_attrs && raw_token.type === TOKEN.TAG_CLOSE) {
              space = false;
              this.print_newline(false, content);
              this.print_indentation(content);
            }

          }

          if (space) {
            space = false;
            if (tag_start_char === '{') {
              content[content.length - 1] += ' ';
              this.line_char_count++;
            } else {
              var wrapped = this.print_space_or_wrap(content, raw_token.text);
              if (raw_token.type === TOKEN.ATTRIBUTE) {
                var indentAttrs = wrapped && !is_wrap_attributes_force;

                if (is_wrap_attributes_force) {
                  var force_first_attr_wrap = false;
                  if (is_wrap_attributes_force_expand_multiline && attr_count === 1) {
                    var is_only_attribute = true;
                    var peek_index = 0;
                    var peek_token;
                    do {
                      peek_token = this._tokens.peek(peek_index);
                      if (peek_token.type === TOKEN.ATTRIBUTE) {
                        is_only_attribute = false;
                        break;
                      }
                      peek_index += 1;
                    } while (peek_index < 4 && peek_token.type !== TOKEN.EOF && peek_token.type !== TOKEN.TAG_CLOSE);

                    force_first_attr_wrap = !is_only_attribute;
                  }

                  if (attr_count > 1 || force_first_attr_wrap) {
                    this.print_newline(false, content);
                    this.print_indentation(content);
                    indentAttrs = true;
                  }
                }
                if (indentAttrs) {
                  has_wrapped_attrs = true;
                  content.push(alignment_string);
                  this.line_char_count += alignment_size;
                }
              }
            }
          }

          this.add_text_item(content, raw_token.text);
          if (raw_token.type === TOKEN.TAG_CLOSE || this._tokens.peek().type === TOKEN.EOF) {
            break;
          }

          raw_token = this._tokens.next();
        }
      }
      var tag_complete;

      if (tag_check === 'script' || tag_check === 'style') {
        tag_complete = content.join('');
      }

      if (!parser_token.type) {
        if (content.length > 1 && content[content.length - 1] === '/>') {
          parser_token.type = 'TK_TAG_SINGLE';
          parser_token.is_closing_tag = true;
        } else if (parser_token.is_unformatted || parser_token.is_content_unformatted) {
          // do not reformat the "unformatted" or "content_unformatted" tags
          if (this._tokens.peek().type === TOKEN.TEXT) {
            this.add_raw_token(content, this._tokens.next());
          }

          if (this._tokens.peek().type === TOKEN.TAG_OPEN) {
            this.add_raw_token(content, this._tokens.next());
            if (this._tokens.peek().type === TOKEN.TAG_CLOSE) {
              this.add_raw_token(content, this._tokens.next());
            }
          }
          parser_token.type = 'TK_TAG_SINGLE';
          parser_token.is_closing_tag = true;
        } else if (custom_beautifier) {
          this.record_tag(tag_check);
          if (tag_check === 'script') {
            parser_token.type = 'TK_TAG_SCRIPT';
          } else {
            parser_token.type = 'TK_TAG_STYLE';
          }
        } else if (!parser_token.is_closing_tag) { // it's a start-tag
          this.record_tag(tag_check, parser_token); //push it on the tag stack
          if (tag_check !== 'html') {
            this.indent_content = true;
          }
          parser_token.type = 'TK_TAG_START';
          parser_token.is_opening_tag = true;
        }
      }

      parser_token.text = content.join('');

      return parser_token; //returns fully formatted tag
    };

    this.get_full_indent = function(level) {
      level = this.indent_level + (level || 0);
      if (level < 1) {
        return '';
      }

      return Array(level + 1).join(this.indent_string);
    };

    this.printer = function(source_text, tokens, indent_character, indent_size, wrap_line_length, brace_style) { //handles input/output and some other printing functions

      source_text = source_text || '';

      // HACK: newline parsing inconsistent. This brute force normalizes the input.
      source_text = source_text.replace(/\r\n|[\r\u2028\u2029]/g, '\n');

      this.input = new InputScanner(source_text); //gets the input for the Parser
      this._tokens = tokens;
      this.output = [];
      this.indent_character = indent_character;
      this.indent_string = '';
      this.indent_size = indent_size;
      this.brace_style = brace_style;
      this.indent_level = 0;
      this.wrap_line_length = wrap_line_length;
      this.line_char_count = 0; //count to see if wrap_line_length was exceeded

      for (var i = 0; i < this.indent_size; i++) {
        this.indent_string += this.indent_character;
      }

      this.add_text_item = function(arr, text) {
        if (text) {
          arr.push(text);
          this.line_char_count += text.length;
        }
      };

      this.add_raw_token = function(arr, token) {
        for (var x = 0; x < token.newlines; x++) {
          this.print_newline(true, arr);
        }
        this.add_text_item(arr, token.whitespace_before);
        this.add_multiline_item(arr, token.text);
      };

      this.add_multiline_item = function(arr, text) {
        if (text) {
          this.add_text_item(arr, text);
          var last_newline_index = text.lastIndexOf('\n');
          if (last_newline_index !== -1) {
            this.line_char_count = text.length - last_newline_index;
          }
        }
      };

      this.traverse_whitespace = function(raw_token) {
        if (raw_token.whitespace_before || raw_token.newlines) {
          if (this.output.length) {

            var newlines = 0;

            if (raw_token.type !== TOKEN.TEXT && raw_token.previous.type !== TOKEN.TEXT) {
              newlines = raw_token.newlines ? 1 : 0;
            }

            if (preserve_newlines) {
              newlines = raw_token.newlines < max_preserve_newlines + 1 ? raw_token.newlines : max_preserve_newlines + 1;
            }

            for (var n = 0; n < newlines; n++) {
              this.print_newline(n > 0, this.output);
            }
            this.print_space_or_wrap(this.output, raw_token.text);
          }
          return true;
        }
        return false;
      };

      // Append a space to the given content (string array) or, if we are
      // at the wrap_line_length, append a newline/indentation.
      // return true if a newline was added, false if a space was added
      this.print_space_or_wrap = function(content, text) {
        if (content && content.length) {
          if (this.line_char_count + text.length + 1 >= this.wrap_line_length) { //insert a line when the wrap_line_length is reached
            this.print_newline(false, content);
            this.print_indentation(content);
            return true;
          } else {
            var previous = content[content.length - 1];
            if (!this.Utils.in_array(previous[previous.length - 1], this.Utils.whitespace)) {
              this.line_char_count++;
              content[content.length - 1] += ' ';
            }
          }
        }
        return false;
      };

      this.print_newline = function(force, arr) {
        if (!arr || !arr.length) {
          return;
        }
        var previous = arr[arr.length - 1];
        var previous_rtrim = rtrim(previous);

        if (force || (previous_rtrim !== '')) { //we might want the extra line
          this.line_char_count = 0;
          if (previous !== '\n') {
            arr[arr.length - 1] = previous_rtrim;
          }
          arr.push('\n');
        }
      };

      this.print_indentation = function(arr) {
        if (arr && arr.length) {
          var previous = arr[arr.length - 1];
          if (previous === '\n') {
            this.add_text_item(arr, this.get_full_indent());
          }
        }
      };

      this.print_token = function(text, count_chars) {
        // Avoid printing initial whitespace.
        if (text || text !== '') {
          if (this.output.length) {
            this.print_indentation(this.output);
            var previous = this.output[this.output.length - 1];
            if (this.Utils.in_array(previous[previous.length - 1], this.Utils.whitespace)) {
              text = ltrim(text);
            }
          } else {
            text = ltrim(text);
          }
        }
        if (count_chars) {
          this.line_char_count += text.length;
        }
        this.print_token_raw(text);
      };

      this.print_token_raw = function(text) {
        if (text && text !== '') {
          if (text.length > 1 && text.charAt(text.length - 1) === '\n') {
            // unformatted tags can grab newlines as their last character
            this.output.push(text.slice(0, -1));
            this.print_newline(false, this.output);
          } else {
            this.output.push(text);
          }
        }

      };

      this.indent = function() {
        this.indent_level++;
      };

      this.unindent = function() {
        if (this.indent_level > 0) {
          this.indent_level--;
        }
      };
    };
    return this;
  }

  /*_____________________--------------------_____________________*/

  this.beautify = function() {
    multi_parser = new Parser(); //wrapping functions Parser
    this._tokens = new Tokenizer(html_source, this._options).tokenize();
    multi_parser.printer(html_source, this._tokens, indent_character, indent_size, wrap_line_length, brace_style); //initialize starting values d  d

    var parser_token = null;
    var last_tag_token = {
      text: '',
      type: '',
      tag_name: '',
      is_opening_tag: false,
      is_closing_tag: false,
      is_inline_tag: false
    };
    raw_token = this._tokens.next();
    while (raw_token.type !== TOKEN.EOF) {

      if (multi_parser.last_token.type === 'TK_TAG_SCRIPT' || multi_parser.last_token.type === 'TK_TAG_STYLE') { //check if we need to format javascript
        var type = multi_parser.last_token.type.substr(7);
        parser_token = { text: raw_token.text, type: 'TK_' + type };
      } else if (raw_token.type === TOKEN.TAG_OPEN || raw_token.type === TOKEN.COMMENT) {
        parser_token = multi_parser.get_tag(raw_token);
      } else if (raw_token.type === TOKEN.TEXT) {
        parser_token = { text: raw_token.text, type: 'TK_CONTENT' };
      }

      switch (parser_token.type) {
        case 'TK_TAG_START':
          if (!parser_token.is_inline_tag && multi_parser.last_token.type !== 'TK_CONTENT') {
            if (parser_token.parent) {
              parser_token.parent.multiline_content = true;
            }
            multi_parser.print_newline(false, multi_parser.output);

          }
          multi_parser.print_token(parser_token.text);
          if (multi_parser.indent_content) {
            if ((multi_parser.indent_body_inner_html || parser_token.tag_name !== 'body') &&
              (multi_parser.indent_head_inner_html || parser_token.tag_name !== 'head')) {

              multi_parser.indent();
            }

            multi_parser.indent_content = false;
          }
          last_tag_token = parser_token;
          break;
        case 'TK_TAG_STYLE':
        case 'TK_TAG_SCRIPT':
          multi_parser.print_newline(false, multi_parser.output);
          multi_parser.print_token(parser_token.text);
          last_tag_token = parser_token;
          break;
        case 'TK_TAG_END':
          if ((parser_token.start_tag_token && parser_token.start_tag_token.multiline_content) ||
            !(parser_token.is_inline_tag ||
              (last_tag_token.is_inline_tag) ||
              (multi_parser.last_token === last_tag_token && last_tag_token.is_opening_tag && parser_token.is_closing_tag && last_tag_token.tag_name === parser_token.tag_name) ||
              (multi_parser.last_token.type === 'TK_CONTENT')
            )) {
            multi_parser.print_newline(false, multi_parser.output);
          }
          multi_parser.print_token(parser_token.text);
          last_tag_token = parser_token;
          break;
        case 'TK_TAG_SINGLE':
          // Don't add a newline before elements that should remain unformatted.
          if (parser_token.tag_name === '!--' && multi_parser.last_token.is_closing_tag && parser_token.text.indexOf('\n') === -1) {
            //Do nothing. Leave comments on same line.
          } else if (!parser_token.is_inline_tag && !parser_token.is_unformatted) {
            multi_parser.print_newline(false, multi_parser.output);
          }
          multi_parser.print_token(parser_token.text);
          last_tag_token = parser_token;
          break;
        case 'TK_TAG_HANDLEBARS_ELSE':
          // Don't add a newline if opening {{#if}} tag is on the current line
          var foundIfOnCurrentLine = false;
          for (var lastCheckedOutput = multi_parser.output.length - 1; lastCheckedOutput >= 0; lastCheckedOutput--) {
            if (multi_parser.output[lastCheckedOutput] === '\n') {
              break;
            } else {
              if (multi_parser.output[lastCheckedOutput].match(/{{#if/)) {
                foundIfOnCurrentLine = true;
                break;
              }
            }
          }
          if (!foundIfOnCurrentLine) {
            multi_parser.print_newline(false, multi_parser.output);
          }
          multi_parser.print_token(parser_token.text);
          if (multi_parser.indent_content) {
            multi_parser.indent();
            multi_parser.indent_content = false;
          }
          last_tag_token = parser_token;
          break;
        case 'TK_TAG_HANDLEBARS_COMMENT':
          multi_parser.print_token(parser_token.text);
          break;
        case 'TK_CONTENT':
          multi_parser.traverse_whitespace(raw_token);
          multi_parser.print_token(parser_token.text, true);
          break;
        case 'TK_STYLE':
        case 'TK_SCRIPT':
          if (parser_token.text !== '') {
            multi_parser.print_newline(false, multi_parser.output);
            var text = parser_token.text,
              _beautifier,
              script_indent_level = 1;
            if (parser_token.type === 'TK_SCRIPT') {
              _beautifier = typeof js_beautify === 'function' && js_beautify;
            } else if (parser_token.type === 'TK_STYLE') {
              _beautifier = typeof css_beautify === 'function' && css_beautify;
            }

            if (options.indent_scripts === "keep") {
              script_indent_level = 0;
            } else if (options.indent_scripts === "separate") {
              script_indent_level = -multi_parser.indent_level;
            }

            var indentation = multi_parser.get_full_indent(script_indent_level);
            if (_beautifier) {

              // call the Beautifier if avaliable
              var Child_options = function() {
                this.eol = '\n';
              };
              Child_options.prototype = options;
              var child_options = new Child_options();
              text = _beautifier(text.replace(/^\s*/, indentation), child_options);
            } else {
              // simply indent the string otherwise
              var white = text.match(/^\s*/)[0];
              var _level = white.match(/[^\n\r]*$/)[0].split(multi_parser.indent_string).length - 1;
              var reindent = multi_parser.get_full_indent(script_indent_level - _level);
              text = text.replace(/^\s*/, indentation)
                .replace(/\r\n|\r|\n/g, '\n' + reindent)
                .replace(/\s+$/, '');
            }
            if (text) {
              multi_parser.print_token_raw(text);
              multi_parser.print_newline(true, multi_parser.output);
            }
          }
          break;
        default:
          // We should not be getting here but we don't want to drop input on the floor
          // Just output the text and move on
          if (parser_token.text !== '') {
            multi_parser.print_token(parser_token.text);
          }
          break;
      }
      multi_parser.last_token = parser_token;

      raw_token = this._tokens.next();
    }
    var sweet_code = multi_parser.output.join('').replace(/[\r\n\t ]+$/, '');

    // establish end_with_newline
    if (end_with_newline) {
      sweet_code += '\n';
    }

    if (eol !== '\n') {
      sweet_code = sweet_code.replace(/[\n]/g, eol);
    }

    return sweet_code;
  };
}

module.exports.Beautifier = Beautifier;

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

/*jshint curly:true, eqeqeq:true, laxbreak:true, noempty:false */
/*

  The MIT License (MIT)

  Copyright (c) 2007-2018 Einar Lielmanis, Liam Newman, and contributors.

  Permission is hereby granted, free of charge, to any person
  obtaining a copy of this software and associated documentation files
  (the "Software"), to deal in the Software without restriction,
  including without limitation the rights to use, copy, modify, merge,
  publish, distribute, sublicense, and/or sell copies of the Software,
  and to permit persons to whom the Software is furnished to do so,
  subject to the following conditions:

  The above copyright notice and this permission notice shall be
  included in all copies or substantial portions of the Software.

  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
  EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
  MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
  NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS
  BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
  ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
  CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
  SOFTWARE.
*/

var BaseTokenizer = __webpack_require__(7).Tokenizer;
var BASETOKEN = __webpack_require__(7).TOKEN;
var Directives = __webpack_require__(10).Directives;
var acorn = __webpack_require__(3);

var TOKEN = {
  TAG_OPEN: 'TK_TAG_OPEN',
  TAG_CLOSE: 'TK_TAG_CLOSE',
  ATTRIBUTE: 'TK_ATTRIBUTE',
  EQUALS: 'TK_EQUALS',
  VALUE: 'TK_VALUE',
  COMMENT: 'TK_COMMENT',
  TEXT: 'TK_TEXT',
  UNKNOWN: 'TK_UNKNOWN',
  START: BASETOKEN.START,
  RAW: BASETOKEN.RAW,
  EOF: BASETOKEN.EOF
};

var directives_core = new Directives(/<\!--/, /-->/);

var Tokenizer = function(input_string, opts) {
  BaseTokenizer.call(this, input_string);
  this._opts = opts || {};
  this._current_tag_name = '';

  // Words end at whitespace or when a tag starts
  // if we are indenting handlebars, they are considered tags
  this._word_pattern = this._opts.indent_handlebars ? /[\s<]|{{/g : /[\s<]/g;
};
Tokenizer.prototype = new BaseTokenizer();

Tokenizer.prototype.is_comment = function(current_token) { // jshint unused:false
  return false; //current_token.type === TOKEN.COMMENT || current_token.type === TOKEN.UNKNOWN;
};

Tokenizer.prototype.is_opening = function(current_token) {
  return current_token.type === TOKEN.TAG_OPEN;
};

Tokenizer.prototype.is_closing = function(current_token, open_token) {
  return current_token.type === TOKEN.TAG_CLOSE &&
    (open_token && (
      ((current_token.text === '>' || current_token.text === '/>') && open_token.text[0] === '<') ||
      (current_token.text === '}}' && open_token.text[0] === '{' && open_token.text[1] === '{')));
};

Tokenizer.prototype.reset = function() {
  this._current_tag_name = '';
};

Tokenizer.prototype.get_next_token = function(previous_token, open_token) { // jshint unused:false
  this.readWhitespace();
  var token = null;
  var c = this._input.peek();

  if (c === null) {
    return this.create_token(TOKEN.EOF, '');
  }

  token = token || this._read_attribute(c, previous_token, open_token);
  token = token || this._read_raw_content(previous_token, open_token);
  token = token || this._read_comment(c);
  token = token || this._read_open_close(c, open_token);
  token = token || this._read_content_word();
  token = token || this.create_token(TOKEN.UNKNOWN, this._input.next());

  return token;
};


Tokenizer.prototype._read_comment = function(c) { // jshint unused:false
  var token = null;
  if (c === '<' || c === '{') {
    var peek1 = this._input.peek(1);
    var peek2 = this._input.peek(2);
    if ((c === '<' && (peek1 === '!' || peek1 === '?' || peek1 === '%')) ||
      this._opts.indent_handlebars && c === '{' && peek1 === '{' && peek2 === '!') {
      //if we're in a comment, do something special
      // We treat all comments as literals, even more than preformatted tags
      // we just look for the appropriate close tag

      // this is will have very poor perf, but will work for now.
      var comment = '',
        delimiter = '>',
        matched = false;

      var input_char = this._input.next();

      while (input_char) {
        comment += input_char;

        // only need to check for the delimiter if the last chars match
        if (comment.charAt(comment.length - 1) === delimiter.charAt(delimiter.length - 1) &&
          comment.indexOf(delimiter) !== -1) {
          break;
        }

        // only need to search for custom delimiter for the first few characters
        if (!matched) {
          matched = comment.length > 10;
          if (comment.indexOf('<![if') === 0) { //peek for <![if conditional comment
            delimiter = '<![endif]>';
            matched = true;
          } else if (comment.indexOf('<![cdata[') === 0) { //if it's a <[cdata[ comment...
            delimiter = ']]>';
            matched = true;
          } else if (comment.indexOf('<![') === 0) { // some other ![ comment? ...
            delimiter = ']>';
            matched = true;
          } else if (comment.indexOf('<!--') === 0) { // <!-- comment ...
            delimiter = '-->';
            matched = true;
          } else if (comment.indexOf('{{!--') === 0) { // {{!-- handlebars comment
            delimiter = '--}}';
            matched = true;
          } else if (comment.indexOf('{{!') === 0) { // {{! handlebars comment
            if (comment.length === 5 && comment.indexOf('{{!--') === -1) {
              delimiter = '}}';
              matched = true;
            }
          } else if (comment.indexOf('<?') === 0) { // {{! handlebars comment
            delimiter = '?>';
            matched = true;
          } else if (comment.indexOf('<%') === 0) { // {{! handlebars comment
            delimiter = '%>';
            matched = true;
          }
        }

        input_char = this._input.next();
      }

      var directives = directives_core.get_directives(comment);
      if (directives && directives.ignore === 'start') {
        comment += directives_core.readIgnored(this._input);
      }
      comment = comment.replace(acorn.allLineBreaks, '\n');
      token = this.create_token(TOKEN.COMMENT, comment);
      token.directives = directives;
    }
  }

  return token;
};

Tokenizer.prototype._read_open_close = function(c, open_token) { // jshint unused:false
  var resulting_string = null;
  if (open_token && open_token.text[0] === '<' && (c === '>' || (c === '/' && this._input.peek(1) === '>'))) {
    resulting_string = this._input.next();
    if (this._input.peek() === '>') {
      resulting_string += this._input.next();
    }
    return this.create_token(TOKEN.TAG_CLOSE, resulting_string);
  } else if (open_token && open_token.text[0] === '{' && c === '}' && this._input.peek(1) === '}') {
    this._input.next();
    this._input.next();
    return this.create_token(TOKEN.TAG_CLOSE, '}}');
  } else if (!open_token) {
    if (c === '<') {
      resulting_string = this._input.next();
      resulting_string += this._input.read(/[^\s>{][^\s>{/]*/g);
      return this.create_token(TOKEN.TAG_OPEN, resulting_string);
    } else if (this._opts.indent_handlebars && c === '{' && this._input.peek(1) === '{') {
      this._input.next();
      this._input.next();
      resulting_string = '{{';
      resulting_string += this._input.readUntil(/[\s}]/g);
      return this.create_token(TOKEN.TAG_OPEN, resulting_string);
    }
  }
  return null;
};

Tokenizer.prototype._read_attribute = function(c, previous_token, open_token) { // jshint unused:false
  if (open_token && open_token.text[0] === '<') {
    if (c === '=') {
      return this.create_token(TOKEN.EQUALS, this._input.next());
    } else if (c === '"' || c === "'") {
      var content = this._input.next();
      var input_string = '';
      var string_pattern = new RegExp(c + '|{{', 'g');
      while (this._input.hasNext()) {
        input_string = this._input.readUntilAfter(string_pattern);
        content += input_string;
        if (input_string[input_string.length - 1] === '"' || input_string[input_string.length - 1] === "'") {
          break;
        } else if (this._input.hasNext()) {
          content += this._input.readUntilAfter(/}}/g);
        }
      }

      return this.create_token(TOKEN.VALUE, content);
    }

    var resulting_string = '';

    if (c === '{' && this._input.peek(1) === '{') {
      resulting_string = this._input.readUntilAfter(/}}/g);
    } else {
      resulting_string = this._input.readUntil(/[\s=\/>]/g);
    }

    if (resulting_string) {
      if (previous_token.type === TOKEN.EQUALS) {
        return this.create_token(TOKEN.VALUE, resulting_string);
      } else {
        return this.create_token(TOKEN.ATTRIBUTE, resulting_string);
      }
    }
  }
  return null;
};

Tokenizer.prototype._read_raw_content = function(previous_token, open_token) { // jshint unused:false
  var resulting_string = '';
  if (open_token && open_token.text[0] === '{') {
    resulting_string = this._input.readUntil(/}}/g);
    if (resulting_string) {
      return this.create_token(TOKEN.TEXT, resulting_string);
    }
  } else if (previous_token.type === TOKEN.TAG_CLOSE && (previous_token.opened.text[0] === '<')) {
    var tag_name = previous_token.opened.text.substr(1).toLowerCase();
    if (tag_name === 'script' || tag_name === 'style' ||
      this._opts.content_unformatted.indexOf(tag_name) !== -1 ||
      this._opts.unformatted.indexOf(tag_name) !== -1) {
      return this.create_token(TOKEN.TEXT, this._input.readUntil(new RegExp('</' + tag_name + '\\s*?>', 'ig')));
    }
  }
  return null;
};

Tokenizer.prototype._read_content_word = function() {
  // if we get here and we see handlebars treat them as a
  var resulting_string = this._input.readUntil(this._word_pattern);
  if (resulting_string) {
    return this.create_token(TOKEN.TEXT, resulting_string);
  }
};

module.exports.Tokenizer = Tokenizer;
module.exports.TOKEN = TOKEN;

/***/ })
/******/ ]);
var style_html = legacy_beautify_html;
/* Footer */
if (typeof define === "function" && define.amd) {
    // Add support for AMD ( https://github.com/amdjs/amdjs-api/wiki/AMD#defineamd-property- )
    define(["require", "./beautify", "./beautify-css"], function(requireamd) {
        var js_beautify = requireamd("./beautify");
        var css_beautify = requireamd("./beautify-css");

        return {
            html_beautify: function(html_source, options) {
                return style_html(html_source, options, js_beautify.js_beautify, css_beautify.css_beautify);
            }
        };
    });
} else if (typeof exports !== "undefined") {
    // Add support for CommonJS. Just put this file somewhere on your require.paths
    // and you will be able to `var html_beautify = require("beautify").html_beautify`.
    var js_beautify = require('./beautify.js');
    var css_beautify = require('./beautify-css.js');

    exports.html_beautify = function(html_source, options) {
        return style_html(html_source, options, js_beautify.js_beautify, css_beautify.css_beautify);
    };
} else if (typeof window !== "undefined") {
    // If we're running a web page and don't have either of the above, add our one global
    window.html_beautify = function(html_source, options) {
        return style_html(html_source, options, window.js_beautify, window.css_beautify);
    };
} else if (typeof global !== "undefined") {
    // If we don't even have window, try global.
    global.html_beautify = function(html_source, options) {
        return style_html(html_source, options, global.js_beautify, global.css_beautify);
    };
}

}());
