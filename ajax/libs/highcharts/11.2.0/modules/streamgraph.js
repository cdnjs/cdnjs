/**
 * Highcharts JS v11.2.0 (2023-10-30)
 *
 * Streamgraph module
 *
 * (c) 2010-2021 Torstein Honsi
 *
 * License: www.highcharts.com/license
 */!function(e){"object"==typeof module&&module.exports?(e.default=e,module.exports=e):"function"==typeof define&&define.amd?define("highcharts/modules/streamgraph",["highcharts"],function(t){return e(t),e.Highcharts=t,e}):e("undefined"!=typeof Highcharts?Highcharts:void 0)}(function(e){"use strict";var t=e?e._modules:{};function s(e,t,s,r){e.hasOwnProperty(t)||(e[t]=r.apply(null,s),"function"==typeof CustomEvent&&window.dispatchEvent(new CustomEvent("HighchartsModuleLoaded",{detail:{path:t,module:e[t]}})))}s(t,"Series/Streamgraph/StreamgraphSeriesDefaults.js",[],function(){return{fillOpacity:1,lineWidth:0,marker:{enabled:!1},stacking:"stream"}}),s(t,"Series/Streamgraph/StreamgraphSeries.js",[t["Core/Series/SeriesRegistry.js"],t["Series/Streamgraph/StreamgraphSeriesDefaults.js"],t["Core/Utilities.js"]],function(e,t,s){let{areaspline:r}=e.seriesTypes,{merge:a,extend:i}=s;class o extends r{constructor(){super(...arguments),this.data=void 0,this.points=void 0,this.options=void 0}streamStacker(e,t,s){e[0]-=t.total/2,e[1]-=t.total/2,this.stackedYData[s]=e}}return o.defaultOptions=a(r.defaultOptions,t),i(o.prototype,{negStacks:!1}),e.registerSeriesType("streamgraph",o),o}),s(t,"masters/modules/streamgraph.src.js",[],function(){})});//# sourceMappingURL=streamgraph.js.map