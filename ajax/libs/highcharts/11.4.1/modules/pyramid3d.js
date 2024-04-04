!/**
 * Highcharts JS v11.4.1 (2024-04-04)
 *
 * Highcharts 3D funnel module
 *
 * (c) 2010-2024 Kacper Madej
 *
 * License: www.highcharts.com/license
 */function(e){"object"==typeof module&&module.exports?(e.default=e,module.exports=e):"function"==typeof define&&define.amd?define("highcharts/modules/pyramid3d",["highcharts","highcharts/highcharts-3d","highcharts/modules/cylinder","highcharts/modules/funnel3d"],function(t){return e(t),e.Highcharts=t,e}):e("undefined"!=typeof Highcharts?Highcharts:void 0)}(function(e){"use strict";var t=e?e._modules:{};function i(e,t,i,s){e.hasOwnProperty(t)||(e[t]=s.apply(null,i),"function"==typeof CustomEvent&&window.dispatchEvent(new CustomEvent("HighchartsModuleLoaded",{detail:{path:t,module:e[t]}})))}i(t,"Series/Pyramid3D/Pyramid3DSeriesDefaults.js",[],function(){return{reversed:!0,neckHeight:0,neckWidth:0,dataLabels:{verticalAlign:"top"}}}),i(t,"Series/Pyramid3D/Pyramid3DSeries.js",[t["Series/Pyramid3D/Pyramid3DSeriesDefaults.js"],t["Core/Series/SeriesRegistry.js"],t["Core/Utilities.js"]],function(e,t,i){let{funnel3d:s}=t.seriesTypes,{merge:r}=i;class d extends s{}return d.defaultOptions=r(s.defaultOptions,e),t.registerSeriesType("pyramid3d",d),d}),i(t,"masters/modules/pyramid3d.src.js",[t["Core/Globals.js"]],function(e){return e})});