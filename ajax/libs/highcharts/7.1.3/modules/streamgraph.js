/*
 Highcharts JS v7.1.3 (2019-08-14)

 Streamgraph module

 (c) 2010-2019 Torstein Honsi

 License: www.highcharts.com/license
*/
(function(a){"object"===typeof module&&module.exports?(a["default"]=a,module.exports=a):"function"===typeof define&&define.amd?define("highcharts/modules/streamgraph",["highcharts"],function(b){a(b);a.Highcharts=b;return a}):a("undefined"!==typeof Highcharts?Highcharts:void 0)})(function(a){function b(a,d,b,c){a.hasOwnProperty(d)||(a[d]=c.apply(null,b))}a=a?a._modules:{};b(a,"modules/streamgraph.src.js",[a["parts/Globals.js"]],function(a){a=a.seriesType;a("streamgraph","areaspline",{fillOpacity:1,
lineWidth:0,marker:{enabled:!1},stacking:"stream"},{negStacks:!1,streamStacker:function(a,b,c){a[0]-=b.total/2;a[1]-=b.total/2;this.stackedYData[c]=a}})});b(a,"masters/modules/streamgraph.src.js",[],function(){})});
//# sourceMappingURL=streamgraph.js.map