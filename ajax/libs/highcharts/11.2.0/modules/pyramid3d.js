/**
 * Highcharts JS v11.2.0 (2023-10-30)
 *
 * Highcharts 3D funnel module
 *
 * (c) 2010-2021 Kacper Madej
 *
 * License: www.highcharts.com/license
 */!function(e){"object"==typeof module&&module.exports?(e.default=e,module.exports=e):"function"==typeof define&&define.amd?define("highcharts/modules/pyramid3d",["highcharts","highcharts/highcharts-3d","highcharts/modules/cylinder","highcharts/modules/funnel3d"],function(i){return e(i),e.Highcharts=i,e}):e("undefined"!=typeof Highcharts?Highcharts:void 0)}(function(e){"use strict";var i=e?e._modules:{};function t(e,i,t,s){e.hasOwnProperty(i)||(e[i]=s.apply(null,t),"function"==typeof CustomEvent&&window.dispatchEvent(new CustomEvent("HighchartsModuleLoaded",{detail:{path:i,module:e[i]}})))}t(i,"Series/Pyramid3D/Pyramid3DSeriesDefaults.js",[],function(){return{reversed:!0,neckHeight:0,neckWidth:0,dataLabels:{verticalAlign:"top"}}}),t(i,"Series/Pyramid3D/Pyramid3DSeries.js",[i["Series/Pyramid3D/Pyramid3DSeriesDefaults.js"],i["Core/Series/SeriesRegistry.js"],i["Core/Utilities.js"]],function(e,i,t){let{funnel3d:s}=i.seriesTypes,{merge:r}=t;class d extends s{constructor(){super(...arguments),this.data=void 0,this.options=void 0,this.points=void 0}}return d.defaultOptions=r(s.defaultOptions,e),i.registerSeriesType("pyramid3d",d),d}),t(i,"masters/modules/pyramid3d.src.js",[],function(){})});//# sourceMappingURL=pyramid3d.js.map