/**
 * @license Highcharts JS v12.2.0 (2025-04-07)
 * @module highcharts/themes/brand-light
 * @requires highcharts
 *
 * (c) 2009-2025 Torstein Honsi
 *
 * License: www.highcharts.com/license
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(root["_Highcharts"]);
	else if(typeof define === 'function' && define.amd)
		define("highcharts/themes/brand-light", ["highcharts/highcharts"], function (amd1) {return factory(amd1);});
	else if(typeof exports === 'object')
		exports["highcharts/themes/brand-light"] = factory(root["_Highcharts"]);
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
  "default": () => (/* binding */ brand_light_src)
});

// EXTERNAL MODULE: external {"amd":["highcharts/highcharts"],"commonjs":["highcharts"],"commonjs2":["highcharts"],"root":["Highcharts"]}
var highcharts_commonjs_highcharts_commonjs2_highcharts_root_Highcharts_ = __webpack_require__(944);
var highcharts_commonjs_highcharts_commonjs2_highcharts_root_Highcharts_default = /*#__PURE__*/__webpack_require__.n(highcharts_commonjs_highcharts_commonjs2_highcharts_root_Highcharts_);
;// ./code/es-modules/Extensions/Themes/BrandLight.js
/* *
 *
 *   (c) 2010-2025 Highsoft AS
 *
 *  Author: Nancy Dillon
 *
 *  License: www.highcharts.com/license
 *
 *  Light theme based on Highcharts brand system
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 * */


const { setOptions } = (highcharts_commonjs_highcharts_commonjs2_highcharts_root_Highcharts_default());

const { createElement } = (highcharts_commonjs_highcharts_commonjs2_highcharts_root_Highcharts_default());
/* *
 *
 *  Theme
 *
 * */
var BrandLightTheme;
(function (BrandLightTheme) {
    /* *
     *
     *  Constants
     *
     * */
    BrandLightTheme.options = {
        colors: [
            '#8087E8', '#A3EDBA', '#F19E53', '#6699A1',
            '#E1D369', '#87B4E7', '#DA6D85', '#BBBAC5'
        ],
        chart: {
            backgroundColor: '#f0f0f0',
            style: {
                fontFamily: 'IBM Plex Sans, sans-serif'
            }
        },
        title: {
            style: {
                fontSize: '22px',
                fontWeight: '500',
                color: '#2F2B38'
            }
        },
        subtitle: {
            style: {
                fontSize: '16px',
                fontWeight: '400',
                color: '#2F2B38'
            }
        },
        tooltip: {
            borderWidth: 0,
            backgroundColor: '#46465C',
            style: {
                color: '#f0f0f0'
            },
            shadow: true
        },
        legend: {
            backgroundColor: '#f0f0f0',
            borderColor: '#BBBAC5',
            borderWidth: 1,
            borderRadius: 2,
            itemStyle: {
                fontWeight: '400',
                fontSize: '12px',
                color: '#2F2B38'
            },
            itemHoverStyle: {
                fontWeight: '700',
                color: '#46465C'
            }
        },
        navigation: {
            buttonOptions: {
                symbolStroke: '#2F2B38',
                theme: {
                    fill: '#fff',
                    states: {
                        hover: {
                            stroke: '#46465C',
                            fill: '#fff'
                        },
                        select: {
                            stroke: '#46465C',
                            fill: '#fff'
                        }
                    }
                }
            }
        },
        credits: {
            style: {
                color: '#46465C'
            }
        },
        drilldown: {
            activeAxisLabelStyle: {
                color: '#2F2B38'
            },
            activeDataLabelStyle: {
                color: '#2F2B38'
            },
            drillUpButton: {
                theme: {
                    fill: '#2F2B38',
                    style: {
                        color: '#fff'
                    }
                }
            }
        },
        xAxis: {
            gridLineColor: '#ccc',
            labels: {
                style: {
                    color: '#46465C',
                    fontSize: '12px'
                }
            },
            lineColor: '#ccc',
            minorGridLineColor: '#ebebeb',
            tickColor: '#ccc',
            title: {
                style: {
                    color: '#2F2B38'
                }
            }
        },
        yAxis: {
            gridLineColor: '#ccc',
            labels: {
                style: {
                    color: '#46465C',
                    fontSize: '12px'
                }
            },
            lineColor: '#ccc',
            minorGridLineColor: '#ebebeb',
            tickColor: '#ccc',
            tickWidth: 1,
            title: {
                style: {
                    color: '#2F2B38',
                    fontWeight: '300'
                }
            }
        },
        // Scroll charts
        rangeSelector: {
            buttonTheme: {
                fill: '#fff',
                style: {
                    color: '#46465C',
                    stroke: 'transparent'
                },
                states: {
                    hover: {
                        fill: '#fff',
                        style: {
                            color: '#46465C'
                        },
                        'stroke-width': 1,
                        stroke: '#46465C'
                    },
                    select: {
                        fill: '#fff',
                        style: {
                            color: '#46465C'
                        },
                        'stroke-width': 1,
                        stroke: '#46465C'
                    }
                }
            },
            inputBoxBorderColor: '#BBBAC5',
            inputStyle: {
                backgroundColor: '#fff',
                color: '#46465C'
            },
            labelStyle: {
                color: '#46465C'
            }
        },
        scrollbar: {
            barBackgroundColor: '#BBBAC5',
            barBorderColor: '#808083',
            buttonArrowColor: '#fff',
            buttonBackgroundColor: '#BBBAC5',
            buttonBorderColor: '#46465C',
            rifleColor: '#FFF',
            trackBackgroundColor: '#dedede',
            trackBorderColor: '#BBBAC5'
        },
        plotOptions: {
            series: {
                borderWidth: 1,
                borderColor: '#BBBAC5',
                dataLabels: {
                    color: '#46465C',
                    style: {
                        fontSize: '13px'
                    }
                },
                marker: {
                    lineColor: '#46465C'
                }
            },
            boxplot: {
                fillColor: '#505053'
            },
            candlestick: {
                lineColor: null,
                upColor: '#DA6D85',
                upLineColor: '#DA6D85'
            },
            errorbar: {
                color: 'white'
            },
            map: {
                borderColor: 'rgba(200, 200, 200, 0.3)',
                nullColor: 'rgba(200, 200, 200, 0.3)'
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
        // Load the fonts
        createElement('link', {
            href: 'https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@200;300;400;600;700',
            rel: 'stylesheet',
            type: 'text/css'
        }, null, document.getElementsByTagName('head')[0]);
        // Apply the theme
        setOptions(BrandLightTheme.options);
    }
    BrandLightTheme.apply = apply;
})(BrandLightTheme || (BrandLightTheme = {}));
/* *
 *
 *  Default Export
 *
 * */
/* harmony default export */ const BrandLight = (BrandLightTheme);

;// ./code/es-modules/masters/themes/brand-light.src.js




(highcharts_commonjs_highcharts_commonjs2_highcharts_root_Highcharts_default()).theme = BrandLight.options;
BrandLight.apply();
/* harmony default export */ const brand_light_src = ((highcharts_commonjs_highcharts_commonjs2_highcharts_root_Highcharts_default()));

__webpack_exports__ = __webpack_exports__["default"];
/******/ 	return __webpack_exports__;
/******/ })()
;
});