/*!
 * Angular-PDF: An Angularjs directive <ng-pdf> to display PDF in the browser with PDFJS.
 * @version 1.6.0
 * @link https://github.com/sayanee/angular-pdf#readme
 * @license MIT License, http://www.opensource.org/licenses/MIT
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("angular"));
	else if(typeof define === 'function' && define.amd)
		define("pdf", ["angular"], factory);
	else if(typeof exports === 'object')
		exports["pdf"] = factory(require("angular"));
	else
		root["pdf"] = factory(root["angular"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_0__) {
return /******/ (function(modules) { // webpackBootstrap
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
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/angular-pdf.module.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/angular-pdf.directive.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var cov_2fg5t5f49d = function () {
  var path = '/Users/denny/git/angularjs-pdf/src/angular-pdf.directive.js',
      hash = 'c1e5fe6dd86903947afef54c11feff53857202dd',
      global = new Function('return this')(),
      gcv = '__coverage__',
      coverageData = {
    path: '/Users/denny/git/angularjs-pdf/src/angular-pdf.directive.js',
    statementMap: {
      '0': {
        start: {
          line: 1,
          column: 21
        },
        end: {
          line: 217,
          column: 1
        }
      },
      '1': {
        start: {
          line: 4,
          column: 23
        },
        end: {
          line: 14,
          column: 3
        }
      },
      '2': {
        start: {
          line: 5,
          column: 16
        },
        end: {
          line: 5,
          column: 39
        }
      },
      '3': {
        start: {
          line: 6,
          column: 16
        },
        end: {
          line: 6,
          column: 45
        }
      },
      '4': {
        start: {
          line: 7,
          column: 16
        },
        end: {
          line: 11,
          column: 37
        }
      },
      '5': {
        start: {
          line: 13,
          column: 4
        },
        end: {
          line: 13,
          column: 21
        }
      },
      '6': {
        start: {
          line: 16,
          column: 30
        },
        end: {
          line: 24,
          column: 3
        }
      },
      '7': {
        start: {
          line: 17,
          column: 18
        },
        end: {
          line: 17,
          column: 38
        }
      },
      '8': {
        start: {
          line: 18,
          column: 4
        },
        end: {
          line: 18,
          column: 41
        }
      },
      '9': {
        start: {
          line: 19,
          column: 4
        },
        end: {
          line: 19,
          column: 42
        }
      },
      '10': {
        start: {
          line: 20,
          column: 4
        },
        end: {
          line: 20,
          column: 46
        }
      },
      '11': {
        start: {
          line: 21,
          column: 4
        },
        end: {
          line: 21,
          column: 47
        }
      },
      '12': {
        start: {
          line: 22,
          column: 4
        },
        end: {
          line: 22,
          column: 67
        }
      },
      '13': {
        start: {
          line: 23,
          column: 4
        },
        end: {
          line: 23,
          column: 18
        }
      },
      '14': {
        start: {
          line: 26,
          column: 2
        },
        end: {
          line: 216,
          column: 3
        }
      },
      '15': {
        start: {
          line: 29,
          column: 6
        },
        end: {
          line: 29,
          column: 74
        }
      },
      '16': {
        start: {
          line: 32,
          column: 23
        },
        end: {
          line: 32,
          column: 27
        }
      },
      '17': {
        start: {
          line: 33,
          column: 26
        },
        end: {
          line: 33,
          column: 30
        }
      },
      '18': {
        start: {
          line: 34,
          column: 18
        },
        end: {
          line: 34,
          column: 23
        }
      },
      '19': {
        start: {
          line: 35,
          column: 16
        },
        end: {
          line: 35,
          column: 28
        }
      },
      '20': {
        start: {
          line: 36,
          column: 24
        },
        end: {
          line: 36,
          column: 41
        }
      },
      '21': {
        start: {
          line: 37,
          column: 19
        },
        end: {
          line: 37,
          column: 23
        }
      },
      '22': {
        start: {
          line: 38,
          column: 26
        },
        end: {
          line: 38,
          column: 73
        }
      },
      '23': {
        start: {
          line: 39,
          column: 20
        },
        end: {
          line: 39,
          column: 46
        }
      },
      '24': {
        start: {
          line: 40,
          column: 18
        },
        end: {
          line: 40,
          column: 51
        }
      },
      '25': {
        start: {
          line: 41,
          column: 21
        },
        end: {
          line: 41,
          column: 51
        }
      },
      '26': {
        start: {
          line: 42,
          column: 19
        },
        end: {
          line: 42,
          column: 56
        }
      },
      '27': {
        start: {
          line: 43,
          column: 18
        },
        end: {
          line: 43,
          column: 38
        }
      },
      '28': {
        start: {
          line: 44,
          column: 6
        },
        end: {
          line: 44,
          column: 66
        }
      },
      '29': {
        start: {
          line: 46,
          column: 16
        },
        end: {
          line: 46,
          column: 39
        }
      },
      '30': {
        start: {
          line: 47,
          column: 21
        },
        end: {
          line: 47,
          column: 45
        }
      },
      '31': {
        start: {
          line: 49,
          column: 6
        },
        end: {
          line: 49,
          column: 38
        }
      },
      '32': {
        start: {
          line: 51,
          column: 6
        },
        end: {
          line: 55,
          column: 9
        }
      },
      '33': {
        start: {
          line: 52,
          column: 8
        },
        end: {
          line: 54,
          column: 11
        }
      },
      '34': {
        start: {
          line: 53,
          column: 10
        },
        end: {
          line: 53,
          column: 45
        }
      },
      '35': {
        start: {
          line: 57,
          column: 6
        },
        end: {
          line: 57,
          column: 33
        }
      },
      '36': {
        start: {
          line: 58,
          column: 6
        },
        end: {
          line: 58,
          column: 36
        }
      },
      '37': {
        start: {
          line: 60,
          column: 6
        },
        end: {
          line: 94,
          column: 8
        }
      },
      '38': {
        start: {
          line: 61,
          column: 8
        },
        end: {
          line: 63,
          column: 9
        }
      },
      '39': {
        start: {
          line: 62,
          column: 10
        },
        end: {
          line: 62,
          column: 50
        }
      },
      '40': {
        start: {
          line: 65,
          column: 8
        },
        end: {
          line: 93,
          column: 11
        }
      },
      '41': {
        start: {
          line: 70,
          column: 10
        },
        end: {
          line: 75,
          column: 11
        }
      },
      '42': {
        start: {
          line: 71,
          column: 12
        },
        end: {
          line: 71,
          column: 43
        }
      },
      '43': {
        start: {
          line: 72,
          column: 31
        },
        end: {
          line: 72,
          column: 65
        }
      },
      '44': {
        start: {
          line: 73,
          column: 12
        },
        end: {
          line: 73,
          column: 63
        }
      },
      '45': {
        start: {
          line: 74,
          column: 12
        },
        end: {
          line: 74,
          column: 35
        }
      },
      '46': {
        start: {
          line: 76,
          column: 10
        },
        end: {
          line: 76,
          column: 45
        }
      },
      '47': {
        start: {
          line: 78,
          column: 10
        },
        end: {
          line: 78,
          column: 71
        }
      },
      '48': {
        start: {
          line: 80,
          column: 10
        },
        end: {
          line: 83,
          column: 12
        }
      },
      '49': {
        start: {
          line: 85,
          column: 10
        },
        end: {
          line: 85,
          column: 50
        }
      },
      '50': {
        start: {
          line: 86,
          column: 10
        },
        end: {
          line: 92,
          column: 13
        }
      },
      '51': {
        start: {
          line: 87,
          column: 12
        },
        end: {
          line: 89,
          column: 13
        }
      },
      '52': {
        start: {
          line: 88,
          column: 14
        },
        end: {
          line: 88,
          column: 35
        }
      },
      '53': {
        start: {
          line: 91,
          column: 12
        },
        end: {
          line: 91,
          column: 29
        }
      },
      '54': {
        start: {
          line: 96,
          column: 6
        },
        end: {
          line: 102,
          column: 8
        }
      },
      '55': {
        start: {
          line: 97,
          column: 8
        },
        end: {
          line: 99,
          column: 9
        }
      },
      '56': {
        start: {
          line: 98,
          column: 10
        },
        end: {
          line: 98,
          column: 17
        }
      },
      '57': {
        start: {
          line: 100,
          column: 8
        },
        end: {
          line: 100,
          column: 64
        }
      },
      '58': {
        start: {
          line: 101,
          column: 8
        },
        end: {
          line: 101,
          column: 44
        }
      },
      '59': {
        start: {
          line: 104,
          column: 6
        },
        end: {
          line: 110,
          column: 8
        }
      },
      '60': {
        start: {
          line: 105,
          column: 8
        },
        end: {
          line: 107,
          column: 9
        }
      },
      '61': {
        start: {
          line: 106,
          column: 10
        },
        end: {
          line: 106,
          column: 17
        }
      },
      '62': {
        start: {
          line: 108,
          column: 8
        },
        end: {
          line: 108,
          column: 64
        }
      },
      '63': {
        start: {
          line: 109,
          column: 8
        },
        end: {
          line: 109,
          column: 44
        }
      },
      '64': {
        start: {
          line: 112,
          column: 6
        },
        end: {
          line: 117,
          column: 8
        }
      },
      '65': {
        start: {
          line: 113,
          column: 8
        },
        end: {
          line: 113,
          column: 24
        }
      },
      '66': {
        start: {
          line: 114,
          column: 8
        },
        end: {
          line: 114,
          column: 40
        }
      },
      '67': {
        start: {
          line: 115,
          column: 8
        },
        end: {
          line: 115,
          column: 46
        }
      },
      '68': {
        start: {
          line: 116,
          column: 8
        },
        end: {
          line: 116,
          column: 21
        }
      },
      '69': {
        start: {
          line: 119,
          column: 6
        },
        end: {
          line: 124,
          column: 8
        }
      },
      '70': {
        start: {
          line: 120,
          column: 8
        },
        end: {
          line: 120,
          column: 24
        }
      },
      '71': {
        start: {
          line: 121,
          column: 8
        },
        end: {
          line: 121,
          column: 40
        }
      },
      '72': {
        start: {
          line: 122,
          column: 8
        },
        end: {
          line: 122,
          column: 46
        }
      },
      '73': {
        start: {
          line: 123,
          column: 8
        },
        end: {
          line: 123,
          column: 21
        }
      },
      '74': {
        start: {
          line: 126,
          column: 6
        },
        end: {
          line: 129,
          column: 7
        }
      },
      '75': {
        start: {
          line: 127,
          column: 8
        },
        end: {
          line: 127,
          column: 23
        }
      },
      '76': {
        start: {
          line: 128,
          column: 8
        },
        end: {
          line: 128,
          column: 46
        }
      },
      '77': {
        start: {
          line: 131,
          column: 6
        },
        end: {
          line: 133,
          column: 8
        }
      },
      '78': {
        start: {
          line: 132,
          column: 8
        },
        end: {
          line: 132,
          column: 46
        }
      },
      '79': {
        start: {
          line: 135,
          column: 6
        },
        end: {
          line: 145,
          column: 8
        }
      },
      '80': {
        start: {
          line: 136,
          column: 8
        },
        end: {
          line: 144,
          column: 9
        }
      },
      '81': {
        start: {
          line: 137,
          column: 10
        },
        end: {
          line: 137,
          column: 51
        }
      },
      '82': {
        start: {
          line: 138,
          column: 15
        },
        end: {
          line: 144,
          column: 9
        }
      },
      '83': {
        start: {
          line: 139,
          column: 10
        },
        end: {
          line: 139,
          column: 52
        }
      },
      '84': {
        start: {
          line: 140,
          column: 15
        },
        end: {
          line: 144,
          column: 9
        }
      },
      '85': {
        start: {
          line: 141,
          column: 10
        },
        end: {
          line: 141,
          column: 52
        }
      },
      '86': {
        start: {
          line: 143,
          column: 10
        },
        end: {
          line: 143,
          column: 50
        }
      },
      '87': {
        start: {
          line: 148,
          column: 8
        },
        end: {
          line: 150,
          column: 9
        }
      },
      '88': {
        start: {
          line: 149,
          column: 10
        },
        end: {
          line: 149,
          column: 59
        }
      },
      '89': {
        start: {
          line: 154,
          column: 8
        },
        end: {
          line: 154,
          column: 22
        }
      },
      '90': {
        start: {
          line: 156,
          column: 21
        },
        end: {
          line: 159,
          column: 9
        }
      },
      '91': {
        start: {
          line: 161,
          column: 8
        },
        end: {
          line: 163,
          column: 9
        }
      },
      '92': {
        start: {
          line: 162,
          column: 10
        },
        end: {
          line: 162,
          column: 43
        }
      },
      '93': {
        start: {
          line: 165,
          column: 8
        },
        end: {
          line: 189,
          column: 9
        }
      },
      '94': {
        start: {
          line: 166,
          column: 10
        },
        end: {
          line: 166,
          column: 52
        }
      },
      '95': {
        start: {
          line: 167,
          column: 10
        },
        end: {
          line: 167,
          column: 54
        }
      },
      '96': {
        start: {
          line: 168,
          column: 10
        },
        end: {
          line: 168,
          column: 54
        }
      },
      '97': {
        start: {
          line: 169,
          column: 10
        },
        end: {
          line: 188,
          column: 12
        }
      },
      '98': {
        start: {
          line: 171,
          column: 14
        },
        end: {
          line: 173,
          column: 15
        }
      },
      '99': {
        start: {
          line: 172,
          column: 16
        },
        end: {
          line: 172,
          column: 31
        }
      },
      '100': {
        start: {
          line: 175,
          column: 14
        },
        end: {
          line: 175,
          column: 31
        }
      },
      '101': {
        start: {
          line: 176,
          column: 14
        },
        end: {
          line: 176,
          column: 52
        }
      },
      '102': {
        start: {
          line: 178,
          column: 14
        },
        end: {
          line: 180,
          column: 17
        }
      },
      '103': {
        start: {
          line: 179,
          column: 16
        },
        end: {
          line: 179,
          column: 51
        }
      },
      '104': {
        start: {
          line: 182,
          column: 14
        },
        end: {
          line: 186,
          column: 15
        }
      },
      '105': {
        start: {
          line: 183,
          column: 16
        },
        end: {
          line: 185,
          column: 17
        }
      },
      '106': {
        start: {
          line: 184,
          column: 18
        },
        end: {
          line: 184,
          column: 39
        }
      },
      '107': {
        start: {
          line: 192,
          column: 6
        },
        end: {
          line: 197,
          column: 9
        }
      },
      '108': {
        start: {
          line: 193,
          column: 8
        },
        end: {
          line: 193,
          column: 47
        }
      },
      '109': {
        start: {
          line: 194,
          column: 8
        },
        end: {
          line: 196,
          column: 9
        }
      },
      '110': {
        start: {
          line: 195,
          column: 10
        },
        end: {
          line: 195,
          column: 48
        }
      },
      '111': {
        start: {
          line: 199,
          column: 6
        },
        end: {
          line: 214,
          column: 9
        }
      },
      '112': {
        start: {
          line: 200,
          column: 8
        },
        end: {
          line: 213,
          column: 9
        }
      },
      '113': {
        start: {
          line: 201,
          column: 10
        },
        end: {
          line: 203,
          column: 11
        }
      },
      '114': {
        start: {
          line: 202,
          column: 12
        },
        end: {
          line: 202,
          column: 69
        }
      },
      '115': {
        start: {
          line: 204,
          column: 10
        },
        end: {
          line: 204,
          column: 23
        }
      },
      '116': {
        start: {
          line: 205,
          column: 10
        },
        end: {
          line: 205,
          column: 62
        }
      },
      '117': {
        start: {
          line: 206,
          column: 10
        },
        end: {
          line: 212,
          column: 11
        }
      },
      '118': {
        start: {
          line: 207,
          column: 12
        },
        end: {
          line: 209,
          column: 15
        }
      },
      '119': {
        start: {
          line: 208,
          column: 14
        },
        end: {
          line: 208,
          column: 26
        }
      },
      '120': {
        start: {
          line: 211,
          column: 12
        },
        end: {
          line: 211,
          column: 24
        }
      }
    },
    fnMap: {
      '0': {
        name: '(anonymous_0)',
        decl: {
          start: {
            line: 1,
            column: 21
          },
          end: {
            line: 1,
            column: 22
          }
        },
        loc: {
          start: {
            line: 1,
            column: 51
          },
          end: {
            line: 217,
            column: 1
          }
        },
        line: 1
      },
      '1': {
        name: '(anonymous_1)',
        decl: {
          start: {
            line: 4,
            column: 23
          },
          end: {
            line: 4,
            column: 24
          }
        },
        loc: {
          start: {
            line: 4,
            column: 33
          },
          end: {
            line: 14,
            column: 3
          }
        },
        line: 4
      },
      '2': {
        name: '(anonymous_2)',
        decl: {
          start: {
            line: 16,
            column: 30
          },
          end: {
            line: 16,
            column: 31
          }
        },
        loc: {
          start: {
            line: 16,
            column: 48
          },
          end: {
            line: 24,
            column: 3
          }
        },
        line: 16
      },
      '3': {
        name: '(anonymous_3)',
        decl: {
          start: {
            line: 51,
            column: 28
          },
          end: {
            line: 51,
            column: 29
          }
        },
        loc: {
          start: {
            line: 51,
            column: 34
          },
          end: {
            line: 55,
            column: 7
          }
        },
        line: 51
      },
      '4': {
        name: '(anonymous_4)',
        decl: {
          start: {
            line: 52,
            column: 21
          },
          end: {
            line: 52,
            column: 22
          }
        },
        loc: {
          start: {
            line: 52,
            column: 27
          },
          end: {
            line: 54,
            column: 9
          }
        },
        line: 52
      },
      '5': {
        name: '(anonymous_5)',
        decl: {
          start: {
            line: 60,
            column: 25
          },
          end: {
            line: 60,
            column: 26
          }
        },
        loc: {
          start: {
            line: 60,
            column: 32
          },
          end: {
            line: 94,
            column: 7
          }
        },
        line: 60
      },
      '6': {
        name: '(anonymous_6)',
        decl: {
          start: {
            line: 65,
            column: 33
          },
          end: {
            line: 65,
            column: 34
          }
        },
        loc: {
          start: {
            line: 65,
            column: 41
          },
          end: {
            line: 93,
            column: 9
          }
        },
        line: 65
      },
      '7': {
        name: '(anonymous_7)',
        decl: {
          start: {
            line: 86,
            column: 34
          },
          end: {
            line: 86,
            column: 35
          }
        },
        loc: {
          start: {
            line: 86,
            column: 40
          },
          end: {
            line: 90,
            column: 11
          }
        },
        line: 86
      },
      '8': {
        name: '(anonymous_8)',
        decl: {
          start: {
            line: 90,
            column: 19
          },
          end: {
            line: 90,
            column: 20
          }
        },
        loc: {
          start: {
            line: 90,
            column: 29
          },
          end: {
            line: 92,
            column: 11
          }
        },
        line: 90
      },
      '9': {
        name: '(anonymous_9)',
        decl: {
          start: {
            line: 96,
            column: 25
          },
          end: {
            line: 96,
            column: 26
          }
        },
        loc: {
          start: {
            line: 96,
            column: 31
          },
          end: {
            line: 102,
            column: 7
          }
        },
        line: 96
      },
      '10': {
        name: '(anonymous_10)',
        decl: {
          start: {
            line: 104,
            column: 21
          },
          end: {
            line: 104,
            column: 22
          }
        },
        loc: {
          start: {
            line: 104,
            column: 27
          },
          end: {
            line: 110,
            column: 7
          }
        },
        line: 104
      },
      '11': {
        name: '(anonymous_11)',
        decl: {
          start: {
            line: 112,
            column: 21
          },
          end: {
            line: 112,
            column: 22
          }
        },
        loc: {
          start: {
            line: 112,
            column: 27
          },
          end: {
            line: 117,
            column: 7
          }
        },
        line: 112
      },
      '12': {
        name: '(anonymous_12)',
        decl: {
          start: {
            line: 119,
            column: 22
          },
          end: {
            line: 119,
            column: 23
          }
        },
        loc: {
          start: {
            line: 119,
            column: 28
          },
          end: {
            line: 124,
            column: 7
          }
        },
        line: 119
      },
      '13': {
        name: '(anonymous_13)',
        decl: {
          start: {
            line: 126,
            column: 18
          },
          end: {
            line: 126,
            column: 19
          }
        },
        loc: {
          start: {
            line: 126,
            column: 24
          },
          end: {
            line: 129,
            column: 7
          }
        },
        line: 126
      },
      '14': {
        name: '(anonymous_14)',
        decl: {
          start: {
            line: 131,
            column: 25
          },
          end: {
            line: 131,
            column: 26
          }
        },
        loc: {
          start: {
            line: 131,
            column: 31
          },
          end: {
            line: 133,
            column: 7
          }
        },
        line: 131
      },
      '15': {
        name: '(anonymous_15)',
        decl: {
          start: {
            line: 135,
            column: 21
          },
          end: {
            line: 135,
            column: 22
          }
        },
        loc: {
          start: {
            line: 135,
            column: 27
          },
          end: {
            line: 145,
            column: 7
          }
        },
        line: 135
      },
      '16': {
        name: 'clearCanvas',
        decl: {
          start: {
            line: 147,
            column: 15
          },
          end: {
            line: 147,
            column: 26
          }
        },
        loc: {
          start: {
            line: 147,
            column: 29
          },
          end: {
            line: 151,
            column: 7
          }
        },
        line: 147
      },
      '17': {
        name: 'renderPDF',
        decl: {
          start: {
            line: 153,
            column: 15
          },
          end: {
            line: 153,
            column: 24
          }
        },
        loc: {
          start: {
            line: 153,
            column: 27
          },
          end: {
            line: 190,
            column: 7
          }
        },
        line: 153
      },
      '18': {
        name: '(anonymous_18)',
        decl: {
          start: {
            line: 170,
            column: 12
          },
          end: {
            line: 170,
            column: 13
          }
        },
        loc: {
          start: {
            line: 170,
            column: 23
          },
          end: {
            line: 181,
            column: 13
          }
        },
        line: 170
      },
      '19': {
        name: '(anonymous_19)',
        decl: {
          start: {
            line: 178,
            column: 27
          },
          end: {
            line: 178,
            column: 28
          }
        },
        loc: {
          start: {
            line: 178,
            column: 33
          },
          end: {
            line: 180,
            column: 15
          }
        },
        line: 178
      },
      '20': {
        name: '(anonymous_20)',
        decl: {
          start: {
            line: 181,
            column: 15
          },
          end: {
            line: 181,
            column: 16
          }
        },
        loc: {
          start: {
            line: 181,
            column: 24
          },
          end: {
            line: 187,
            column: 13
          }
        },
        line: 181
      },
      '21': {
        name: '(anonymous_21)',
        decl: {
          start: {
            line: 192,
            column: 30
          },
          end: {
            line: 192,
            column: 31
          }
        },
        loc: {
          start: {
            line: 192,
            column: 40
          },
          end: {
            line: 197,
            column: 7
          }
        },
        line: 192
      },
      '22': {
        name: '(anonymous_22)',
        decl: {
          start: {
            line: 199,
            column: 29
          },
          end: {
            line: 199,
            column: 30
          }
        },
        loc: {
          start: {
            line: 199,
            column: 39
          },
          end: {
            line: 214,
            column: 7
          }
        },
        line: 199
      },
      '23': {
        name: '(anonymous_23)',
        decl: {
          start: {
            line: 207,
            column: 41
          },
          end: {
            line: 207,
            column: 42
          }
        },
        loc: {
          start: {
            line: 207,
            column: 47
          },
          end: {
            line: 209,
            column: 13
          }
        },
        line: 207
      }
    },
    branchMap: {
      '0': {
        loc: {
          start: {
            line: 6,
            column: 16
          },
          end: {
            line: 6,
            column: 45
          }
        },
        type: 'binary-expr',
        locations: [{
          start: {
            line: 6,
            column: 16
          },
          end: {
            line: 6,
            column: 40
          }
        }, {
          start: {
            line: 6,
            column: 44
          },
          end: {
            line: 6,
            column: 45
          }
        }],
        line: 6
      },
      '1': {
        loc: {
          start: {
            line: 7,
            column: 16
          },
          end: {
            line: 11,
            column: 37
          }
        },
        type: 'binary-expr',
        locations: [{
          start: {
            line: 7,
            column: 16
          },
          end: {
            line: 7,
            column: 48
          }
        }, {
          start: {
            line: 8,
            column: 6
          },
          end: {
            line: 8,
            column: 35
          }
        }, {
          start: {
            line: 9,
            column: 6
          },
          end: {
            line: 9,
            column: 34
          }
        }, {
          start: {
            line: 10,
            column: 6
          },
          end: {
            line: 10,
            column: 33
          }
        }, {
          start: {
            line: 11,
            column: 6
          },
          end: {
            line: 11,
            column: 32
          }
        }, {
          start: {
            line: 11,
            column: 36
          },
          end: {
            line: 11,
            column: 37
          }
        }],
        line: 7
      },
      '2': {
        loc: {
          start: {
            line: 29,
            column: 13
          },
          end: {
            line: 29,
            column: 73
          }
        },
        type: 'cond-expr',
        locations: [{
          start: {
            line: 29,
            column: 32
          },
          end: {
            line: 29,
            column: 48
          }
        }, {
          start: {
            line: 29,
            column: 51
          },
          end: {
            line: 29,
            column: 73
          }
        }],
        line: 29
      },
      '3': {
        loc: {
          start: {
            line: 38,
            column: 26
          },
          end: {
            line: 38,
            column: 73
          }
        },
        type: 'cond-expr',
        locations: [{
          start: {
            line: 38,
            column: 49
          },
          end: {
            line: 38,
            column: 69
          }
        }, {
          start: {
            line: 38,
            column: 72
          },
          end: {
            line: 38,
            column: 73
          }
        }],
        line: 38
      },
      '4': {
        loc: {
          start: {
            line: 40,
            column: 18
          },
          end: {
            line: 40,
            column: 51
          }
        },
        type: 'cond-expr',
        locations: [{
          start: {
            line: 40,
            column: 36
          },
          end: {
            line: 40,
            column: 47
          }
        }, {
          start: {
            line: 40,
            column: 50
          },
          end: {
            line: 40,
            column: 51
          }
        }],
        line: 40
      },
      '5': {
        loc: {
          start: {
            line: 41,
            column: 21
          },
          end: {
            line: 41,
            column: 51
          }
        },
        type: 'binary-expr',
        locations: [{
          start: {
            line: 41,
            column: 21
          },
          end: {
            line: 41,
            column: 35
          }
        }, {
          start: {
            line: 41,
            column: 39
          },
          end: {
            line: 41,
            column: 51
          }
        }],
        line: 41
      },
      '6': {
        loc: {
          start: {
            line: 44,
            column: 14
          },
          end: {
            line: 44,
            column: 65
          }
        },
        type: 'cond-expr',
        locations: [{
          start: {
            line: 44,
            column: 46
          },
          end: {
            line: 44,
            column: 57
          }
        }, {
          start: {
            line: 44,
            column: 60
          },
          end: {
            line: 44,
            column: 65
          }
        }],
        line: 44
      },
      '7': {
        loc: {
          start: {
            line: 61,
            column: 8
          },
          end: {
            line: 63,
            column: 9
          }
        },
        type: 'if',
        locations: [{
          start: {
            line: 61,
            column: 8
          },
          end: {
            line: 63,
            column: 9
          }
        }, {
          start: {
            line: 61,
            column: 8
          },
          end: {
            line: 63,
            column: 9
          }
        }],
        line: 61
      },
      '8': {
        loc: {
          start: {
            line: 70,
            column: 10
          },
          end: {
            line: 75,
            column: 11
          }
        },
        type: 'if',
        locations: [{
          start: {
            line: 70,
            column: 10
          },
          end: {
            line: 75,
            column: 11
          }
        }, {
          start: {
            line: 70,
            column: 10
          },
          end: {
            line: 75,
            column: 11
          }
        }],
        line: 70
      },
      '9': {
        loc: {
          start: {
            line: 87,
            column: 12
          },
          end: {
            line: 89,
            column: 13
          }
        },
        type: 'if',
        locations: [{
          start: {
            line: 87,
            column: 12
          },
          end: {
            line: 89,
            column: 13
          }
        }, {
          start: {
            line: 87,
            column: 12
          },
          end: {
            line: 89,
            column: 13
          }
        }],
        line: 87
      },
      '10': {
        loc: {
          start: {
            line: 97,
            column: 8
          },
          end: {
            line: 99,
            column: 9
          }
        },
        type: 'if',
        locations: [{
          start: {
            line: 97,
            column: 8
          },
          end: {
            line: 99,
            column: 9
          }
        }, {
          start: {
            line: 97,
            column: 8
          },
          end: {
            line: 99,
            column: 9
          }
        }],
        line: 97
      },
      '11': {
        loc: {
          start: {
            line: 105,
            column: 8
          },
          end: {
            line: 107,
            column: 9
          }
        },
        type: 'if',
        locations: [{
          start: {
            line: 105,
            column: 8
          },
          end: {
            line: 107,
            column: 9
          }
        }, {
          start: {
            line: 105,
            column: 8
          },
          end: {
            line: 107,
            column: 9
          }
        }],
        line: 105
      },
      '12': {
        loc: {
          start: {
            line: 136,
            column: 8
          },
          end: {
            line: 144,
            column: 9
          }
        },
        type: 'if',
        locations: [{
          start: {
            line: 136,
            column: 8
          },
          end: {
            line: 144,
            column: 9
          }
        }, {
          start: {
            line: 136,
            column: 8
          },
          end: {
            line: 144,
            column: 9
          }
        }],
        line: 136
      },
      '13': {
        loc: {
          start: {
            line: 138,
            column: 15
          },
          end: {
            line: 144,
            column: 9
          }
        },
        type: 'if',
        locations: [{
          start: {
            line: 138,
            column: 15
          },
          end: {
            line: 144,
            column: 9
          }
        }, {
          start: {
            line: 138,
            column: 15
          },
          end: {
            line: 144,
            column: 9
          }
        }],
        line: 138
      },
      '14': {
        loc: {
          start: {
            line: 140,
            column: 15
          },
          end: {
            line: 144,
            column: 9
          }
        },
        type: 'if',
        locations: [{
          start: {
            line: 140,
            column: 15
          },
          end: {
            line: 144,
            column: 9
          }
        }, {
          start: {
            line: 140,
            column: 15
          },
          end: {
            line: 144,
            column: 9
          }
        }],
        line: 140
      },
      '15': {
        loc: {
          start: {
            line: 148,
            column: 8
          },
          end: {
            line: 150,
            column: 9
          }
        },
        type: 'if',
        locations: [{
          start: {
            line: 148,
            column: 8
          },
          end: {
            line: 150,
            column: 9
          }
        }, {
          start: {
            line: 148,
            column: 8
          },
          end: {
            line: 150,
            column: 9
          }
        }],
        line: 148
      },
      '16': {
        loc: {
          start: {
            line: 161,
            column: 8
          },
          end: {
            line: 163,
            column: 9
          }
        },
        type: 'if',
        locations: [{
          start: {
            line: 161,
            column: 8
          },
          end: {
            line: 163,
            column: 9
          }
        }, {
          start: {
            line: 161,
            column: 8
          },
          end: {
            line: 163,
            column: 9
          }
        }],
        line: 161
      },
      '17': {
        loc: {
          start: {
            line: 165,
            column: 8
          },
          end: {
            line: 189,
            column: 9
          }
        },
        type: 'if',
        locations: [{
          start: {
            line: 165,
            column: 8
          },
          end: {
            line: 189,
            column: 9
          }
        }, {
          start: {
            line: 165,
            column: 8
          },
          end: {
            line: 189,
            column: 9
          }
        }],
        line: 165
      },
      '18': {
        loc: {
          start: {
            line: 165,
            column: 12
          },
          end: {
            line: 165,
            column: 29
          }
        },
        type: 'binary-expr',
        locations: [{
          start: {
            line: 165,
            column: 12
          },
          end: {
            line: 165,
            column: 15
          }
        }, {
          start: {
            line: 165,
            column: 19
          },
          end: {
            line: 165,
            column: 29
          }
        }],
        line: 165
      },
      '19': {
        loc: {
          start: {
            line: 171,
            column: 14
          },
          end: {
            line: 173,
            column: 15
          }
        },
        type: 'if',
        locations: [{
          start: {
            line: 171,
            column: 14
          },
          end: {
            line: 173,
            column: 15
          }
        }, {
          start: {
            line: 171,
            column: 14
          },
          end: {
            line: 173,
            column: 15
          }
        }],
        line: 171
      },
      '20': {
        loc: {
          start: {
            line: 182,
            column: 14
          },
          end: {
            line: 186,
            column: 15
          }
        },
        type: 'if',
        locations: [{
          start: {
            line: 182,
            column: 14
          },
          end: {
            line: 186,
            column: 15
          }
        }, {
          start: {
            line: 182,
            column: 14
          },
          end: {
            line: 186,
            column: 15
          }
        }],
        line: 182
      },
      '21': {
        loc: {
          start: {
            line: 183,
            column: 16
          },
          end: {
            line: 185,
            column: 17
          }
        },
        type: 'if',
        locations: [{
          start: {
            line: 183,
            column: 16
          },
          end: {
            line: 185,
            column: 17
          }
        }, {
          start: {
            line: 183,
            column: 16
          },
          end: {
            line: 185,
            column: 17
          }
        }],
        line: 183
      },
      '22': {
        loc: {
          start: {
            line: 194,
            column: 8
          },
          end: {
            line: 196,
            column: 9
          }
        },
        type: 'if',
        locations: [{
          start: {
            line: 194,
            column: 8
          },
          end: {
            line: 196,
            column: 9
          }
        }, {
          start: {
            line: 194,
            column: 8
          },
          end: {
            line: 196,
            column: 9
          }
        }],
        line: 194
      },
      '23': {
        loc: {
          start: {
            line: 200,
            column: 8
          },
          end: {
            line: 213,
            column: 9
          }
        },
        type: 'if',
        locations: [{
          start: {
            line: 200,
            column: 8
          },
          end: {
            line: 213,
            column: 9
          }
        }, {
          start: {
            line: 200,
            column: 8
          },
          end: {
            line: 213,
            column: 9
          }
        }],
        line: 200
      },
      '24': {
        loc: {
          start: {
            line: 201,
            column: 10
          },
          end: {
            line: 203,
            column: 11
          }
        },
        type: 'if',
        locations: [{
          start: {
            line: 201,
            column: 10
          },
          end: {
            line: 203,
            column: 11
          }
        }, {
          start: {
            line: 201,
            column: 10
          },
          end: {
            line: 203,
            column: 11
          }
        }],
        line: 201
      },
      '25': {
        loc: {
          start: {
            line: 206,
            column: 10
          },
          end: {
            line: 212,
            column: 11
          }
        },
        type: 'if',
        locations: [{
          start: {
            line: 206,
            column: 10
          },
          end: {
            line: 212,
            column: 11
          }
        }, {
          start: {
            line: 206,
            column: 10
          },
          end: {
            line: 212,
            column: 11
          }
        }],
        line: 206
      }
    },
    s: {
      '0': 0,
      '1': 0,
      '2': 0,
      '3': 0,
      '4': 0,
      '5': 0,
      '6': 0,
      '7': 0,
      '8': 0,
      '9': 0,
      '10': 0,
      '11': 0,
      '12': 0,
      '13': 0,
      '14': 0,
      '15': 0,
      '16': 0,
      '17': 0,
      '18': 0,
      '19': 0,
      '20': 0,
      '21': 0,
      '22': 0,
      '23': 0,
      '24': 0,
      '25': 0,
      '26': 0,
      '27': 0,
      '28': 0,
      '29': 0,
      '30': 0,
      '31': 0,
      '32': 0,
      '33': 0,
      '34': 0,
      '35': 0,
      '36': 0,
      '37': 0,
      '38': 0,
      '39': 0,
      '40': 0,
      '41': 0,
      '42': 0,
      '43': 0,
      '44': 0,
      '45': 0,
      '46': 0,
      '47': 0,
      '48': 0,
      '49': 0,
      '50': 0,
      '51': 0,
      '52': 0,
      '53': 0,
      '54': 0,
      '55': 0,
      '56': 0,
      '57': 0,
      '58': 0,
      '59': 0,
      '60': 0,
      '61': 0,
      '62': 0,
      '63': 0,
      '64': 0,
      '65': 0,
      '66': 0,
      '67': 0,
      '68': 0,
      '69': 0,
      '70': 0,
      '71': 0,
      '72': 0,
      '73': 0,
      '74': 0,
      '75': 0,
      '76': 0,
      '77': 0,
      '78': 0,
      '79': 0,
      '80': 0,
      '81': 0,
      '82': 0,
      '83': 0,
      '84': 0,
      '85': 0,
      '86': 0,
      '87': 0,
      '88': 0,
      '89': 0,
      '90': 0,
      '91': 0,
      '92': 0,
      '93': 0,
      '94': 0,
      '95': 0,
      '96': 0,
      '97': 0,
      '98': 0,
      '99': 0,
      '100': 0,
      '101': 0,
      '102': 0,
      '103': 0,
      '104': 0,
      '105': 0,
      '106': 0,
      '107': 0,
      '108': 0,
      '109': 0,
      '110': 0,
      '111': 0,
      '112': 0,
      '113': 0,
      '114': 0,
      '115': 0,
      '116': 0,
      '117': 0,
      '118': 0,
      '119': 0,
      '120': 0
    },
    f: {
      '0': 0,
      '1': 0,
      '2': 0,
      '3': 0,
      '4': 0,
      '5': 0,
      '6': 0,
      '7': 0,
      '8': 0,
      '9': 0,
      '10': 0,
      '11': 0,
      '12': 0,
      '13': 0,
      '14': 0,
      '15': 0,
      '16': 0,
      '17': 0,
      '18': 0,
      '19': 0,
      '20': 0,
      '21': 0,
      '22': 0,
      '23': 0
    },
    b: {
      '0': [0, 0],
      '1': [0, 0, 0, 0, 0, 0],
      '2': [0, 0],
      '3': [0, 0],
      '4': [0, 0],
      '5': [0, 0],
      '6': [0, 0],
      '7': [0, 0],
      '8': [0, 0],
      '9': [0, 0],
      '10': [0, 0],
      '11': [0, 0],
      '12': [0, 0],
      '13': [0, 0],
      '14': [0, 0],
      '15': [0, 0],
      '16': [0, 0],
      '17': [0, 0],
      '18': [0, 0],
      '19': [0, 0],
      '20': [0, 0],
      '21': [0, 0],
      '22': [0, 0],
      '23': [0, 0],
      '24': [0, 0],
      '25': [0, 0]
    },
    _coverageSchema: '332fd63041d2c1bcb487cc26dd0d5f7d97098a6c'
  },
      coverage = global[gcv] || (global[gcv] = {});

  if (coverage[path] && coverage[path].hash === hash) {
    return coverage[path];
  }

  coverageData.hash = hash;
  return coverage[path] = coverageData;
}();

var NgPdf = exports.NgPdf = (++cov_2fg5t5f49d.s[0], ["$window", "$document", "$log", function ($window, $document, $log) {
  'ngInject';

  ++cov_2fg5t5f49d.f[0];
  ++cov_2fg5t5f49d.s[1];
  var backingScale = function backingScale(canvas) {
    ++cov_2fg5t5f49d.f[1];

    var ctx = (++cov_2fg5t5f49d.s[2], canvas.getContext('2d'));
    var dpr = (++cov_2fg5t5f49d.s[3], (++cov_2fg5t5f49d.b[0][0], $window.devicePixelRatio) || (++cov_2fg5t5f49d.b[0][1], 1));
    var bsr = (++cov_2fg5t5f49d.s[4], (++cov_2fg5t5f49d.b[1][0], ctx.webkitBackingStorePixelRatio) || (++cov_2fg5t5f49d.b[1][1], ctx.mozBackingStorePixelRatio) || (++cov_2fg5t5f49d.b[1][2], ctx.msBackingStorePixelRatio) || (++cov_2fg5t5f49d.b[1][3], ctx.oBackingStorePixelRatio) || (++cov_2fg5t5f49d.b[1][4], ctx.backingStorePixelRatio) || (++cov_2fg5t5f49d.b[1][5], 1));

    ++cov_2fg5t5f49d.s[5];
    return dpr / bsr;
  };

  ++cov_2fg5t5f49d.s[6];
  var setCanvasDimensions = function setCanvasDimensions(canvas, w, h) {
    ++cov_2fg5t5f49d.f[2];

    var ratio = (++cov_2fg5t5f49d.s[7], backingScale(canvas));
    ++cov_2fg5t5f49d.s[8];
    canvas.width = Math.floor(w * ratio);
    ++cov_2fg5t5f49d.s[9];
    canvas.height = Math.floor(h * ratio);
    ++cov_2fg5t5f49d.s[10];
    canvas.style.width = Math.floor(w) + 'px';
    ++cov_2fg5t5f49d.s[11];
    canvas.style.height = Math.floor(h) + 'px';
    ++cov_2fg5t5f49d.s[12];
    canvas.getContext('2d').setTransform(ratio, 0, 0, ratio, 0, 0);
    ++cov_2fg5t5f49d.s[13];
    return canvas;
  };

  ++cov_2fg5t5f49d.s[14];
  return {
    restrict: 'E',
    templateUrl: function templateUrl(element, attr) {
      ++cov_2fg5t5f49d.s[15];

      return attr.templateUrl ? (++cov_2fg5t5f49d.b[2][0], attr.templateUrl) : (++cov_2fg5t5f49d.b[2][1], 'partials/viewer.html');
    },
    link: function link(scope, element, attrs) {
      var renderTask = (++cov_2fg5t5f49d.s[16], null);
      var pdfLoaderTask = (++cov_2fg5t5f49d.s[17], null);
      var debug = (++cov_2fg5t5f49d.s[18], false);
      var url = (++cov_2fg5t5f49d.s[19], scope.pdfUrl);
      var httpHeaders = (++cov_2fg5t5f49d.s[20], scope.httpHeaders);
      var pdfDoc = (++cov_2fg5t5f49d.s[21], null);
      var pageToDisplay = (++cov_2fg5t5f49d.s[22], isFinite(attrs.page) ? (++cov_2fg5t5f49d.b[3][0], parseInt(attrs.page)) : (++cov_2fg5t5f49d.b[3][1], 1));
      var pageFit = (++cov_2fg5t5f49d.s[23], attrs.scale === 'page-fit');
      var scale = (++cov_2fg5t5f49d.s[24], attrs.scale > 0 ? (++cov_2fg5t5f49d.b[4][0], attrs.scale) : (++cov_2fg5t5f49d.b[4][1], 1));
      var canvasid = (++cov_2fg5t5f49d.s[25], (++cov_2fg5t5f49d.b[5][0], attrs.canvasid) || (++cov_2fg5t5f49d.b[5][1], 'pdf-canvas'));
      var canvas = (++cov_2fg5t5f49d.s[26], $document[0].getElementById(canvasid));
      var creds = (++cov_2fg5t5f49d.s[27], attrs.usecredentials);
      ++cov_2fg5t5f49d.s[28];
      debug = attrs.hasOwnProperty('debug') ? (++cov_2fg5t5f49d.b[6][0], attrs.debug) : (++cov_2fg5t5f49d.b[6][1], false);

      var ctx = (++cov_2fg5t5f49d.s[29], canvas.getContext('2d'));
      var windowEl = (++cov_2fg5t5f49d.s[30], angular.element($window));

      ++cov_2fg5t5f49d.s[31];
      element.css('display', 'block');

      ++cov_2fg5t5f49d.s[32];
      windowEl.on('scroll', function () {
        ++cov_2fg5t5f49d.f[3];
        ++cov_2fg5t5f49d.s[33];

        scope.$apply(function () {
          ++cov_2fg5t5f49d.f[4];
          ++cov_2fg5t5f49d.s[34];

          scope.scroll = windowEl[0].scrollY;
        });
      });

      ++cov_2fg5t5f49d.s[35];
      PDFJS.disableWorker = true;
      ++cov_2fg5t5f49d.s[36];
      scope.pageNum = pageToDisplay;

      ++cov_2fg5t5f49d.s[37];
      scope.renderPage = function (num) {
        ++cov_2fg5t5f49d.f[5];
        ++cov_2fg5t5f49d.s[38];

        if (renderTask) {
          ++cov_2fg5t5f49d.b[7][0];
          ++cov_2fg5t5f49d.s[39];

          renderTask._internalRenderTask.cancel();
        } else {
          ++cov_2fg5t5f49d.b[7][1];
        }

        ++cov_2fg5t5f49d.s[40];
        pdfDoc.getPage(num).then(function (page) {
          ++cov_2fg5t5f49d.f[6];

          var viewport = void 0;
          var pageWidthScale = void 0;
          var renderContext = void 0;

          ++cov_2fg5t5f49d.s[41];
          if (pageFit) {
            ++cov_2fg5t5f49d.b[8][0];
            ++cov_2fg5t5f49d.s[42];

            viewport = page.getViewport(1);
            var clientRect = (++cov_2fg5t5f49d.s[43], element[0].getBoundingClientRect());
            ++cov_2fg5t5f49d.s[44];
            pageWidthScale = clientRect.width / viewport.width;
            ++cov_2fg5t5f49d.s[45];
            scale = pageWidthScale;
          } else {
            ++cov_2fg5t5f49d.b[8][1];
          }
          ++cov_2fg5t5f49d.s[46];
          viewport = page.getViewport(scale);

          ++cov_2fg5t5f49d.s[47];
          setCanvasDimensions(canvas, viewport.width, viewport.height);

          ++cov_2fg5t5f49d.s[48];
          renderContext = {
            canvasContext: ctx,
            viewport: viewport
          };

          ++cov_2fg5t5f49d.s[49];
          renderTask = page.render(renderContext);
          ++cov_2fg5t5f49d.s[50];
          renderTask.promise.then(function () {
            ++cov_2fg5t5f49d.f[7];
            ++cov_2fg5t5f49d.s[51];

            if (angular.isFunction(scope.onPageRender)) {
              ++cov_2fg5t5f49d.b[9][0];
              ++cov_2fg5t5f49d.s[52];

              scope.onPageRender();
            } else {
              ++cov_2fg5t5f49d.b[9][1];
            }
          }).catch(function (reason) {
            ++cov_2fg5t5f49d.f[8];
            ++cov_2fg5t5f49d.s[53];

            $log.log(reason);
          });
        });
      };

      ++cov_2fg5t5f49d.s[54];
      scope.goPrevious = function () {
        ++cov_2fg5t5f49d.f[9];
        ++cov_2fg5t5f49d.s[55];

        if (scope.pageToDisplay <= 1) {
          ++cov_2fg5t5f49d.b[10][0];
          ++cov_2fg5t5f49d.s[56];

          return;
        } else {
          ++cov_2fg5t5f49d.b[10][1];
        }
        ++cov_2fg5t5f49d.s[57];
        scope.pageToDisplay = parseInt(scope.pageToDisplay) - 1;
        ++cov_2fg5t5f49d.s[58];
        scope.pageNum = scope.pageToDisplay;
      };

      ++cov_2fg5t5f49d.s[59];
      scope.goNext = function () {
        ++cov_2fg5t5f49d.f[10];
        ++cov_2fg5t5f49d.s[60];

        if (scope.pageToDisplay >= pdfDoc.numPages) {
          ++cov_2fg5t5f49d.b[11][0];
          ++cov_2fg5t5f49d.s[61];

          return;
        } else {
          ++cov_2fg5t5f49d.b[11][1];
        }
        ++cov_2fg5t5f49d.s[62];
        scope.pageToDisplay = parseInt(scope.pageToDisplay) + 1;
        ++cov_2fg5t5f49d.s[63];
        scope.pageNum = scope.pageToDisplay;
      };

      ++cov_2fg5t5f49d.s[64];
      scope.zoomIn = function () {
        ++cov_2fg5t5f49d.f[11];
        ++cov_2fg5t5f49d.s[65];

        pageFit = false;
        ++cov_2fg5t5f49d.s[66];
        scale = parseFloat(scale) + 0.2;
        ++cov_2fg5t5f49d.s[67];
        scope.renderPage(scope.pageToDisplay);
        ++cov_2fg5t5f49d.s[68];
        return scale;
      };

      ++cov_2fg5t5f49d.s[69];
      scope.zoomOut = function () {
        ++cov_2fg5t5f49d.f[12];
        ++cov_2fg5t5f49d.s[70];

        pageFit = false;
        ++cov_2fg5t5f49d.s[71];
        scale = parseFloat(scale) - 0.2;
        ++cov_2fg5t5f49d.s[72];
        scope.renderPage(scope.pageToDisplay);
        ++cov_2fg5t5f49d.s[73];
        return scale;
      };

      ++cov_2fg5t5f49d.s[74];
      scope.fit = function () {
        ++cov_2fg5t5f49d.f[13];
        ++cov_2fg5t5f49d.s[75];

        pageFit = true;
        ++cov_2fg5t5f49d.s[76];
        scope.renderPage(scope.pageToDisplay);
      };

      ++cov_2fg5t5f49d.s[77];
      scope.changePage = function () {
        ++cov_2fg5t5f49d.f[14];
        ++cov_2fg5t5f49d.s[78];

        scope.renderPage(scope.pageToDisplay);
      };

      ++cov_2fg5t5f49d.s[79];
      scope.rotate = function () {
        ++cov_2fg5t5f49d.f[15];
        ++cov_2fg5t5f49d.s[80];

        if (canvas.getAttribute('class') === 'rotate0') {
          ++cov_2fg5t5f49d.b[12][0];
          ++cov_2fg5t5f49d.s[81];

          canvas.setAttribute('class', 'rotate90');
        } else {
            ++cov_2fg5t5f49d.b[12][1];
            ++cov_2fg5t5f49d.s[82];
            if (canvas.getAttribute('class') === 'rotate90') {
              ++cov_2fg5t5f49d.b[13][0];
              ++cov_2fg5t5f49d.s[83];

              canvas.setAttribute('class', 'rotate180');
            } else {
                ++cov_2fg5t5f49d.b[13][1];
                ++cov_2fg5t5f49d.s[84];
                if (canvas.getAttribute('class') === 'rotate180') {
                  ++cov_2fg5t5f49d.b[14][0];
                  ++cov_2fg5t5f49d.s[85];

                  canvas.setAttribute('class', 'rotate270');
                } else {
                  ++cov_2fg5t5f49d.b[14][1];
                  ++cov_2fg5t5f49d.s[86];

                  canvas.setAttribute('class', 'rotate0');
                }
              }
          }
      };

      function clearCanvas() {
        ++cov_2fg5t5f49d.f[16];
        ++cov_2fg5t5f49d.s[87];

        if (ctx) {
          ++cov_2fg5t5f49d.b[15][0];
          ++cov_2fg5t5f49d.s[88];

          ctx.clearRect(0, 0, canvas.width, canvas.height);
        } else {
          ++cov_2fg5t5f49d.b[15][1];
        }
      }

      function renderPDF() {
        ++cov_2fg5t5f49d.f[17];
        ++cov_2fg5t5f49d.s[89];

        clearCanvas();

        var params = (++cov_2fg5t5f49d.s[90], {
          'url': url,
          'withCredentials': creds
        });

        ++cov_2fg5t5f49d.s[91];
        if (httpHeaders) {
          ++cov_2fg5t5f49d.b[16][0];
          ++cov_2fg5t5f49d.s[92];

          params.httpHeaders = httpHeaders;
        } else {
          ++cov_2fg5t5f49d.b[16][1];
        }

        ++cov_2fg5t5f49d.s[93];
        if ((++cov_2fg5t5f49d.b[18][0], url) && (++cov_2fg5t5f49d.b[18][1], url.length)) {
          ++cov_2fg5t5f49d.b[17][0];
          ++cov_2fg5t5f49d.s[94];

          pdfLoaderTask = PDFJS.getDocument(params);
          ++cov_2fg5t5f49d.s[95];
          pdfLoaderTask.onProgress = scope.onProgress;
          ++cov_2fg5t5f49d.s[96];
          pdfLoaderTask.onPassword = scope.onPassword;
          ++cov_2fg5t5f49d.s[97];
          pdfLoaderTask.then(function (_pdfDoc) {
            ++cov_2fg5t5f49d.f[18];
            ++cov_2fg5t5f49d.s[98];

            if (angular.isFunction(scope.onLoad)) {
              ++cov_2fg5t5f49d.b[19][0];
              ++cov_2fg5t5f49d.s[99];

              scope.onLoad();
            } else {
              ++cov_2fg5t5f49d.b[19][1];
            }

            ++cov_2fg5t5f49d.s[100];
            pdfDoc = _pdfDoc;
            ++cov_2fg5t5f49d.s[101];
            scope.renderPage(scope.pageToDisplay);

            ++cov_2fg5t5f49d.s[102];
            scope.$apply(function () {
              ++cov_2fg5t5f49d.f[19];
              ++cov_2fg5t5f49d.s[103];

              scope.pageCount = _pdfDoc.numPages;
            });
          }, function (error) {
            ++cov_2fg5t5f49d.f[20];
            ++cov_2fg5t5f49d.s[104];

            if (error) {
              ++cov_2fg5t5f49d.b[20][0];
              ++cov_2fg5t5f49d.s[105];

              if (angular.isFunction(scope.onError)) {
                ++cov_2fg5t5f49d.b[21][0];
                ++cov_2fg5t5f49d.s[106];

                scope.onError(error);
              } else {
                ++cov_2fg5t5f49d.b[21][1];
              }
            } else {
              ++cov_2fg5t5f49d.b[20][1];
            }
          });
        } else {
          ++cov_2fg5t5f49d.b[17][1];
        }
      }

      ++cov_2fg5t5f49d.s[107];
      scope.$watch('pageNum', function (newVal) {
        ++cov_2fg5t5f49d.f[21];
        ++cov_2fg5t5f49d.s[108];

        scope.pageToDisplay = parseInt(newVal);
        ++cov_2fg5t5f49d.s[109];
        if (pdfDoc !== null) {
          ++cov_2fg5t5f49d.b[22][0];
          ++cov_2fg5t5f49d.s[110];

          scope.renderPage(scope.pageToDisplay);
        } else {
          ++cov_2fg5t5f49d.b[22][1];
        }
      });

      ++cov_2fg5t5f49d.s[111];
      scope.$watch('pdfUrl', function (newVal) {
        ++cov_2fg5t5f49d.f[22];
        ++cov_2fg5t5f49d.s[112];

        if (newVal !== '') {
          ++cov_2fg5t5f49d.b[23][0];
          ++cov_2fg5t5f49d.s[113];

          if (debug) {
            ++cov_2fg5t5f49d.b[24][0];
            ++cov_2fg5t5f49d.s[114];

            $log.log('pdfUrl value change detected: ', scope.pdfUrl);
          } else {
            ++cov_2fg5t5f49d.b[24][1];
          }
          ++cov_2fg5t5f49d.s[115];
          url = newVal;
          ++cov_2fg5t5f49d.s[116];
          scope.pageNum = scope.pageToDisplay = pageToDisplay;
          ++cov_2fg5t5f49d.s[117];
          if (pdfLoaderTask) {
            ++cov_2fg5t5f49d.b[25][0];
            ++cov_2fg5t5f49d.s[118];

            pdfLoaderTask.destroy().then(function () {
              ++cov_2fg5t5f49d.f[23];
              ++cov_2fg5t5f49d.s[119];

              renderPDF();
            });
          } else {
            ++cov_2fg5t5f49d.b[25][1];
            ++cov_2fg5t5f49d.s[120];

            renderPDF();
          }
        } else {
          ++cov_2fg5t5f49d.b[23][1];
        }
      });
    }
  };
}]);

/***/ }),

/***/ "./src/angular-pdf.module.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Pdf = undefined;

var cov_1rmvbbu9ah = function () {
  var path = '/Users/denny/git/angularjs-pdf/src/angular-pdf.module.js',
      hash = '0e2d9432ed38b7f829d9e27ba392ee3abb9e801f',
      global = new Function('return this')(),
      gcv = '__coverage__',
      coverageData = {
    path: '/Users/denny/git/angularjs-pdf/src/angular-pdf.module.js',
    statementMap: {
      '0': {
        start: {
          line: 4,
          column: 19
        },
        end: {
          line: 7,
          column: 7
        }
      }
    },
    fnMap: {},
    branchMap: {},
    s: {
      '0': 0
    },
    f: {},
    b: {},
    _coverageSchema: '332fd63041d2c1bcb487cc26dd0d5f7d97098a6c'
  },
      coverage = global[gcv] || (global[gcv] = {});

  if (coverage[path] && coverage[path].hash === hash) {
    return coverage[path];
  }

  coverageData.hash = hash;
  return coverage[path] = coverageData;
}();

var _angular = __webpack_require__(0);

var _angular2 = _interopRequireDefault(_angular);

var _angularPdf = __webpack_require__("./src/angular-pdf.directive.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Pdf = exports.Pdf = (++cov_1rmvbbu9ah.s[0], _angular2.default.module('pdf', []).directive('ngPdf', _angularPdf.NgPdf).name);

/***/ }),

/***/ 0:
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_0__;

/***/ })

/******/ });
});
//# sourceMappingURL=angular-pdf.js.map