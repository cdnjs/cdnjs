!/**
 * Highcharts JS v11.4.8 (2024-08-29)
 *
 * Streamgraph module
 *
 * (c) 2010-2024 Torstein Honsi
 *
 * License: www.highcharts.com/license
 */function(e){"object"==typeof module&&module.exports?(e.default=e,module.exports=e):"function"==typeof define&&define.amd?define("highcharts/modules/streamgraph",["highcharts"],function(t){return e(t),e.Highcharts=t,e}):e("undefined"!=typeof Highcharts?Highcharts:void 0)}(function(e){"use strict";var t=e?e._modules:{};function r(t,r,s,a){t.hasOwnProperty(r)||(t[r]=a.apply(null,s),"function"==typeof CustomEvent&&e.win.dispatchEvent(new CustomEvent("HighchartsModuleLoaded",{detail:{path:r,module:t[r]}})))}r(t,"Series/Streamgraph/StreamgraphSeriesDefaults.js",[],function(){return{fillOpacity:1,lineWidth:0,marker:{enabled:!1},stacking:"stream"}}),r(t,"Series/Streamgraph/StreamgraphSeries.js",[t["Core/Series/SeriesRegistry.js"],t["Series/Streamgraph/StreamgraphSeriesDefaults.js"],t["Core/Utilities.js"]],function(e,t,r){let{areaspline:s}=e.seriesTypes,{merge:a,extend:i}=r;class n extends s{streamStacker(e,t,r){e[0]-=t.total/2,e[1]-=t.total/2,this.stackedYData[r]=e}}return n.defaultOptions=a(s.defaultOptions,t),i(n.prototype,{negStacks:!1}),e.registerSeriesType("streamgraph",n),n}),r(t,"masters/modules/streamgraph.src.js",[t["Core/Globals.js"]],function(e){return e})});