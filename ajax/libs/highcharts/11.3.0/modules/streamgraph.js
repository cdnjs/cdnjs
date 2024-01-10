/**
 * Highcharts JS v11.3.0 (2024-01-10)
 *
 * Streamgraph module
 *
 * (c) 2010-2024 Torstein Honsi
 *
 * License: www.highcharts.com/license
 */!function(e){"object"==typeof module&&module.exports?(e.default=e,module.exports=e):"function"==typeof define&&define.amd?define("highcharts/modules/streamgraph",["highcharts"],function(t){return e(t),e.Highcharts=t,e}):e("undefined"!=typeof Highcharts?Highcharts:void 0)}(function(e){"use strict";var t=e?e._modules:{};function r(e,t,r,s){e.hasOwnProperty(t)||(e[t]=s.apply(null,r),"function"==typeof CustomEvent&&window.dispatchEvent(new CustomEvent("HighchartsModuleLoaded",{detail:{path:t,module:e[t]}})))}r(t,"Series/Streamgraph/StreamgraphSeriesDefaults.js",[],function(){return{fillOpacity:1,lineWidth:0,marker:{enabled:!1},stacking:"stream"}}),r(t,"Series/Streamgraph/StreamgraphSeries.js",[t["Core/Series/SeriesRegistry.js"],t["Series/Streamgraph/StreamgraphSeriesDefaults.js"],t["Core/Utilities.js"]],function(e,t,r){let{areaspline:s}=e.seriesTypes,{merge:a,extend:i}=r;class n extends s{streamStacker(e,t,r){e[0]-=t.total/2,e[1]-=t.total/2,this.stackedYData[r]=e}}return n.defaultOptions=a(s.defaultOptions,t),i(n.prototype,{negStacks:!1}),e.registerSeriesType("streamgraph",n),n}),r(t,"masters/modules/streamgraph.src.js",[],function(){})});