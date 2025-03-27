/**
 * @license Highcharts JS v12.1.2 (2024-12-21)
 * @module highcharts/themes/brand-dark
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
		define("highcharts/themes/brand-dark", ["highcharts/highcharts"], function (amd1) {return factory(amd1);});
	else if(typeof exports === 'object')
		exports["highcharts/themes/brand-dark"] = factory(root["_Highcharts"]);
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
  "default": () => (/* binding */ brand_dark_src)
});

// EXTERNAL MODULE: external {"amd":["highcharts/highcharts"],"commonjs":["highcharts"],"commonjs2":["highcharts"],"root":["Highcharts"]}
var highcharts_commonjs_highcharts_commonjs2_highcharts_root_Highcharts_ = __webpack_require__(944);
var highcharts_commonjs_highcharts_commonjs2_highcharts_root_Highcharts_default = /*#__PURE__*/__webpack_require__.n(highcharts_commonjs_highcharts_commonjs2_highcharts_root_Highcharts_);
;// ./code/es-modules/Extensions/Themes/BrandDark.js
/* *
 *
 *   (c) 2010-2024 Highsoft AS
 *
 *  Author: Nancy Dillon
 *
 *  License: www.highcharts.com/license
 *
 *  Dark theme based on Highcharts brand system
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
var BrandDarkTheme;
(function (BrandDarkTheme) {
    /* *
     *
     *  Constants
     *
     * */
    BrandDarkTheme.options = {
        colors: [
            '#8087E8', '#A3EDBA', '#F19E53', '#6699A1',
            '#E1D369', '#87B4E7', '#DA6D85', '#BBBAC5'
        ],
        chart: {
            backgroundColor: {
                linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
                stops: [
                    [0, '#1f1836'],
                    [1, '#45445d']
                ]
            },
            style: {
                fontFamily: 'IBM Plex Sans, sans-serif'
            }
        },
        title: {
            style: {
                fontSize: '22px',
                fontWeight: '500',
                color: '#fff'
            }
        },
        subtitle: {
            style: {
                fontSize: '16px',
                fontWeight: '400',
                color: '#fff'
            }
        },
        credits: {
            style: {
                color: '#f0f0f0'
            }
        },
        caption: {
            style: {
                color: '#f0f0f0'
            }
        },
        tooltip: {
            borderWidth: 0,
            backgroundColor: '#f0f0f0',
            shadow: true
        },
        legend: {
            backgroundColor: 'transparent',
            itemStyle: {
                fontWeight: '400',
                fontSize: '12px',
                color: '#fff'
            },
            itemHoverStyle: {
                fontWeight: '700',
                color: '#fff'
            }
        },
        plotOptions: {
            series: {
                dataLabels: {
                    color: '#46465C',
                    style: {
                        fontSize: '13px'
                    }
                },
                marker: {
                    lineColor: '#333'
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
            dumbbell: {
                lowColor: '#f0f0f0'
            },
            map: {
                borderColor: '#909090',
                nullColor: '#78758C'
            }
        },
        drilldown: {
            activeAxisLabelStyle: {
                color: '#F0F0F3'
            },
            activeDataLabelStyle: {
                color: '#F0F0F3'
            },
            drillUpButton: {
                theme: {
                    fill: '#fff'
                }
            }
        },
        xAxis: {
            gridLineColor: '#707073',
            labels: {
                style: {
                    color: '#fff',
                    fontSize: '12px'
                }
            },
            lineColor: '#707073',
            minorGridLineColor: '#505053',
            tickColor: '#707073',
            title: {
                style: {
                    color: '#fff'
                }
            }
        },
        yAxis: {
            gridLineColor: '#707073',
            labels: {
                style: {
                    color: '#fff',
                    fontSize: '12px'
                }
            },
            lineColor: '#707073',
            minorGridLineColor: '#505053',
            tickColor: '#707073',
            tickWidth: 1,
            title: {
                style: {
                    color: '#fff',
                    fontWeight: '300'
                }
            }
        },
        colorAxis: {
            gridLineColor: '#45445d',
            labels: {
                style: {
                    color: '#fff',
                    fontSize: '12px'
                }
            },
            minColor: '#342f95',
            maxColor: '#2caffe',
            tickColor: '#45445d'
        },
        mapNavigation: {
            enabled: true,
            buttonOptions: {
                theme: {
                    fill: '#46465C',
                    'stroke-width': 1,
                    stroke: '#BBBAC5',
                    r: 2,
                    style: {
                        color: '#fff'
                    },
                    states: {
                        hover: {
                            fill: '#000',
                            'stroke-width': 1,
                            stroke: '#f0f0f0',
                            style: {
                                color: '#fff'
                            }
                        },
                        select: {
                            fill: '#000',
                            'stroke-width': 1,
                            stroke: '#f0f0f0',
                            style: {
                                color: '#fff'
                            }
                        }
                    }
                }
            }
        },
        // Scroll charts
        rangeSelector: {
            buttonTheme: {
                fill: '#46465C',
                stroke: '#BBBAC5',
                'stroke-width': 1,
                style: {
                    color: '#fff'
                },
                states: {
                    hover: {
                        fill: '#1f1836',
                        style: {
                            color: '#fff'
                        },
                        'stroke-width': 1,
                        stroke: 'white'
                    },
                    select: {
                        fill: '#1f1836',
                        style: {
                            color: '#fff'
                        },
                        'stroke-width': 1,
                        stroke: 'white'
                    }
                }
            },
            inputBoxBorderColor: '#BBBAC5',
            inputStyle: {
                backgroundColor: '#2F2B38',
                color: '#fff'
            },
            labelStyle: {
                color: '#fff'
            }
        },
        navigator: {
            handles: {
                backgroundColor: '#BBBAC5',
                borderColor: '#2F2B38'
            },
            outlineColor: '#CCC',
            maskFill: 'rgba(255,255,255,0.1)',
            series: {
                color: '#A3EDBA',
                lineColor: '#A3EDBA'
            },
            xAxis: {
                gridLineColor: '#505053'
            }
        },
        scrollbar: {
            barBackgroundColor: '#BBBAC5',
            barBorderColor: '#808083',
            buttonArrowColor: '#2F2B38',
            buttonBackgroundColor: '#BBBAC5',
            buttonBorderColor: '#2F2B38',
            rifleColor: '#2F2B38',
            trackBackgroundColor: '#78758C',
            trackBorderColor: '#2F2B38'
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
        setOptions(BrandDarkTheme.options);
    }
    BrandDarkTheme.apply = apply;
})(BrandDarkTheme || (BrandDarkTheme = {}));
/* *
 *
 *  Default Export
 *
 * */
/* harmony default export */ const BrandDark = (BrandDarkTheme);

;// ./code/es-modules/masters/themes/brand-dark.src.js




(highcharts_commonjs_highcharts_commonjs2_highcharts_root_Highcharts_default()).theme = BrandDark.options;
BrandDark.apply();
/* harmony default export */ const brand_dark_src = ((highcharts_commonjs_highcharts_commonjs2_highcharts_root_Highcharts_default()));

__webpack_exports__ = __webpack_exports__["default"];
/******/ 	return __webpack_exports__;
/******/ })()
;
});