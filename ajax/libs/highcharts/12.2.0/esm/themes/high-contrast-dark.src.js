/**
 * @license Highcharts JS v12.2.0 (2025-04-07)
 * @module highcharts/themes/high-contrast-dark
 * @requires highcharts
 *
 * (c) 2009-2025 Highsoft AS
 *
 * License: www.highcharts.com/license
 */
import * as __WEBPACK_EXTERNAL_MODULE__highcharts_src_js_8202131d__ from "../highcharts.src.js";
/******/ // The require scope
/******/ var __webpack_require__ = {};
/******/ 
/************************************************************************/
/******/ /* webpack/runtime/compat get default export */
/******/ (() => {
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = (module) => {
/******/ 		var getter = module && module.__esModule ?
/******/ 			() => (module['default']) :
/******/ 			() => (module);
/******/ 		__webpack_require__.d(getter, { a: getter });
/******/ 		return getter;
/******/ 	};
/******/ })();
/******/ 
/******/ /* webpack/runtime/define property getters */
/******/ (() => {
/******/ 	// define getter functions for harmony exports
/******/ 	__webpack_require__.d = (exports, definition) => {
/******/ 		for(var key in definition) {
/******/ 			if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 				Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 			}
/******/ 		}
/******/ 	};
/******/ })();
/******/ 
/******/ /* webpack/runtime/hasOwnProperty shorthand */
/******/ (() => {
/******/ 	__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ })();
/******/ 
/************************************************************************/

;// external ["../highcharts.src.js","default"]
const external_highcharts_src_js_default_namespaceObject = __WEBPACK_EXTERNAL_MODULE__highcharts_src_js_8202131d__["default"];
var external_highcharts_src_js_default_default = /*#__PURE__*/__webpack_require__.n(external_highcharts_src_js_default_namespaceObject);
;// ./code/es-modules/Extensions/Themes/HighContrastDark.js
/* *
 *
 *  (c) 2010-2025 Highsoft AS
 *
 *  Author: Øystein Moseng
 *
 *  License: www.highcharts.com/license
 *
 *  Accessible high-contrast dark theme for Highcharts. Specifically tailored
 *  towards 3:1 contrast against black/off-black backgrounds. Neighboring
 *  colors are tested for color blindness.
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 * */


const { setOptions } = (external_highcharts_src_js_default_default());
/* *
 *
 *  Theme
 *
 * */
var HighContrastDarkTheme;
(function (HighContrastDarkTheme) {
    /* *
     *
     *  Constants
     *
     * */
    const textBright = '#F0F0F3';
    HighContrastDarkTheme.options = {
        colors: [
            '#67B9EE',
            '#CEEDA5',
            '#9F6AE1',
            '#FEA26E',
            '#6BA48F',
            '#EA3535',
            '#8D96B7',
            '#ECCA15',
            '#20AA09',
            '#E0C3E4'
        ],
        chart: {
            backgroundColor: '#1f1f20',
            plotBorderColor: '#606063'
        },
        title: {
            style: {
                color: textBright
            }
        },
        subtitle: {
            style: {
                color: textBright
            }
        },
        xAxis: {
            gridLineColor: '#707073',
            labels: {
                style: {
                    color: textBright
                }
            },
            lineColor: '#707073',
            minorGridLineColor: '#505053',
            tickColor: '#707073',
            title: {
                style: {
                    color: textBright
                }
            }
        },
        yAxis: {
            gridLineColor: '#707073',
            labels: {
                style: {
                    color: textBright
                }
            },
            lineColor: '#707073',
            minorGridLineColor: '#505053',
            tickColor: '#707073',
            title: {
                style: {
                    color: textBright
                }
            }
        },
        tooltip: {
            backgroundColor: 'rgba(0, 0, 0, 0.85)',
            style: {
                color: textBright
            }
        },
        plotOptions: {
            series: {
                dataLabels: {
                    color: textBright
                },
                marker: {
                    lineColor: '#333'
                }
            },
            boxplot: {
                fillColor: '#505053'
            },
            candlestick: {
                lineColor: 'white'
            },
            errorbar: {
                color: 'white'
            },
            map: {
                nullColor: '#353535'
            }
        },
        legend: {
            backgroundColor: 'transparent',
            itemStyle: {
                color: textBright
            },
            itemHoverStyle: {
                color: '#FFF'
            },
            itemHiddenStyle: {
                color: '#606063'
            },
            title: {
                style: {
                    color: '#D0D0D0'
                }
            }
        },
        credits: {
            style: {
                color: textBright
            }
        },
        drilldown: {
            activeAxisLabelStyle: {
                color: textBright
            },
            activeDataLabelStyle: {
                color: textBright
            }
        },
        navigation: {
            buttonOptions: {
                symbolStroke: '#DDDDDD',
                theme: {
                    fill: '#505053'
                }
            }
        },
        rangeSelector: {
            buttonTheme: {
                fill: '#505053',
                stroke: '#000000',
                style: {
                    color: '#eee'
                },
                states: {
                    hover: {
                        fill: '#707073',
                        stroke: '#000000',
                        style: {
                            color: textBright
                        }
                    },
                    select: {
                        fill: '#303030',
                        stroke: '#101010',
                        style: {
                            color: textBright
                        }
                    }
                }
            },
            inputBoxBorderColor: '#505053',
            inputStyle: {
                backgroundColor: '#333',
                color: textBright
            },
            labelStyle: {
                color: textBright
            }
        },
        navigator: {
            handles: {
                backgroundColor: '#666',
                borderColor: '#AAA'
            },
            outlineColor: '#CCC',
            maskFill: 'rgba(180,180,255,0.2)',
            series: {
                color: '#7798BF',
                lineColor: '#A6C7ED'
            },
            xAxis: {
                gridLineColor: '#505053'
            }
        },
        scrollbar: {
            barBackgroundColor: '#808083',
            barBorderColor: '#808083',
            buttonArrowColor: '#CCC',
            buttonBackgroundColor: '#606063',
            buttonBorderColor: '#606063',
            rifleColor: '#FFF',
            trackBackgroundColor: '#404043',
            trackBorderColor: '#404043'
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
        setOptions(HighContrastDarkTheme.options);
    }
    HighContrastDarkTheme.apply = apply;
})(HighContrastDarkTheme || (HighContrastDarkTheme = {}));
/* *
 *
 *  Default Export
 *
 * */
/* harmony default export */ const HighContrastDark = (HighContrastDarkTheme);

;// ./code/es-modules/masters/themes/high-contrast-dark.src.js




(external_highcharts_src_js_default_default()).theme = HighContrastDark.options;
HighContrastDark.apply();
/* harmony default export */ const high_contrast_dark_src = ((external_highcharts_src_js_default_default()));

export { high_contrast_dark_src as default };
