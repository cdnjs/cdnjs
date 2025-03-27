/**
 * @license Highcharts JS v12.1.2 (2024-12-21)
 * @module highcharts/themes/skies
 * @requires highcharts
 *
 * (c) 2009-2024 Torstein Honsi
 *
 * License: www.highcharts.com/license
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(root["_Highcharts"]);
	else if(typeof define === 'function' && define.amd)
		define("highcharts/themes/skies", ["highcharts/highcharts"], function (amd1) {return factory(amd1);});
	else if(typeof exports === 'object')
		exports["highcharts/themes/skies"] = factory(root["_Highcharts"]);
	else
		root["Highcharts"] = factory(root["Highcharts"]);
})(typeof window === 'undefined' ? this : window, (__WEBPACK_EXTERNAL_MODULE__944__) => {
return /******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ 944:
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_MODULE__944__;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ skies_src)
});

// EXTERNAL MODULE: external {"amd":["highcharts/highcharts"],"commonjs":["highcharts"],"commonjs2":["highcharts"],"root":["Highcharts"]}
var highcharts_commonjs_highcharts_commonjs2_highcharts_root_Highcharts_ = __webpack_require__(944);
var highcharts_commonjs_highcharts_commonjs2_highcharts_root_Highcharts_default = /*#__PURE__*/__webpack_require__.n(highcharts_commonjs_highcharts_commonjs2_highcharts_root_Highcharts_);
;// ./code/es-modules/Extensions/Themes/Skies.js
/* *
 *
 *  (c) 2010-2024 Torstein Honsi
 *
 *  License: www.highcharts.com/license
 *
 *  Skies theme for Highcharts JS
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 * */


const { setOptions } = (highcharts_commonjs_highcharts_commonjs2_highcharts_root_Highcharts_default());
/* *
 *
 *  Theme
 *
 * */
var SkiesTheme;
(function (SkiesTheme) {
    /* *
     *
     *  Constants
     *
     * */
    SkiesTheme.options = {
        colors: [
            '#514F78', '#42A07B', '#9B5E4A', '#72727F', '#1F949A',
            '#82914E', '#86777F', '#42A07B'
        ],
        chart: {
            className: 'skies',
            borderWidth: 0,
            plotShadow: true,
            plotBackgroundImage: 'https://www.highcharts.com/samples/graphics/skies.jpg',
            plotBackgroundColor: {
                linearGradient: { x1: 0, y1: 0, x2: 1, y2: 1 },
                stops: [
                    [0, 'rgba(255, 255, 255, 1)'],
                    [1, 'rgba(255, 255, 255, 0)']
                ]
            },
            plotBorderWidth: 1
        },
        title: {
            style: {
                color: '#3E576F',
                font: '16px Lucida Grande, Lucida Sans Unicode,' +
                    ' Verdana, Arial, Helvetica, sans-serif'
            }
        },
        subtitle: {
            style: {
                color: '#6D869F',
                font: '12px Lucida Grande, Lucida Sans Unicode,' +
                    ' Verdana, Arial, Helvetica, sans-serif'
            }
        },
        xAxis: {
            gridLineWidth: 0,
            lineColor: '#C0D0E0',
            tickColor: '#C0D0E0',
            labels: {
                style: {
                    color: '#666',
                    fontWeight: 'bold'
                }
            },
            title: {
                style: {
                    color: '#666',
                    font: '12px Lucida Grande, Lucida Sans Unicode,' +
                        ' Verdana, Arial, Helvetica, sans-serif'
                }
            }
        },
        yAxis: {
            alternateGridColor: 'rgba(255, 255, 255, .5)',
            lineColor: '#C0D0E0',
            tickColor: '#C0D0E0',
            tickWidth: 1,
            labels: {
                style: {
                    color: '#666',
                    fontWeight: 'bold'
                }
            },
            title: {
                style: {
                    color: '#666',
                    font: '12px Lucida Grande, Lucida Sans Unicode,' +
                        ' Verdana, Arial, Helvetica, sans-serif'
                }
            }
        },
        legend: {
            itemStyle: {
                font: '9pt Trebuchet MS, Verdana, sans-serif',
                color: '#3E576F'
            },
            itemHoverStyle: {
                color: 'black'
            },
            itemHiddenStyle: {
                color: 'silver'
            }
        }
    };
    /* *
     *
     *  Functions
     *
     * */
    /**
     * Apply the theme.
     */
    function apply() {
        setOptions(SkiesTheme.options);
    }
    SkiesTheme.apply = apply;
})(SkiesTheme || (SkiesTheme = {}));
/* *
 *
 *  Default Export
 *
 * */
/* harmony default export */ const Skies = (SkiesTheme);

;// ./code/es-modules/masters/themes/skies.src.js




(highcharts_commonjs_highcharts_commonjs2_highcharts_root_Highcharts_default()).theme = Skies.options;
Skies.apply();
/* harmony default export */ const skies_src = ((highcharts_commonjs_highcharts_commonjs2_highcharts_root_Highcharts_default()));

__webpack_exports__ = __webpack_exports__["default"];
/******/ 	return __webpack_exports__;
/******/ })()
;
});