!/**
 * Highcharts JS v11.4.1 (2024-04-04)
 *
 * (c) 2009-2024 Torstein Honsi
 *
 * License: www.highcharts.com/license
 */function(e){"object"==typeof module&&module.exports?(e.default=e,module.exports=e):"function"==typeof define&&define.amd?define("highcharts/modules/overlapping-datalabels",["highcharts"],function(a){return e(a),e.Highcharts=a,e}):e("undefined"!=typeof Highcharts?Highcharts:void 0)}(function(e){"use strict";var a,t,n,o=e?e._modules:{};a="masters/modules/overlapping-datalabels.src.js",t=[o["Core/Globals.js"],o["Extensions/OverlappingDataLabels.js"]],n=function(e,a){return e.OverlappingDataLabels=e.OverlappingDataLabels||a,e.OverlappingDataLabels.compose(e.Chart),e},o.hasOwnProperty(a)||(o[a]=n.apply(null,t),"function"==typeof CustomEvent&&window.dispatchEvent(new CustomEvent("HighchartsModuleLoaded",{detail:{path:a,module:o[a]}})))});