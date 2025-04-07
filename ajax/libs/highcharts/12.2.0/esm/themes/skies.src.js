/**
 * @license Highcharts JS v12.2.0 (2025-04-07)
 * @module highcharts/themes/skies
 * @requires highcharts
 *
 * (c) 2009-2025 Torstein Honsi
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
;// ./code/es-modules/Extensions/Themes/Skies.js
/* *
 *
 *  (c) 2010-2025 Torstein Honsi
 *
 *  License: www.highcharts.com/license
 *
 *  Skies theme for Highcharts JS
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




(external_highcharts_src_js_default_default()).theme = Skies.options;
Skies.apply();
/* harmony default export */ const skies_src = ((external_highcharts_src_js_default_default()));

export { skies_src as default };
