/*
  Highcharts JS v7.0.3 (2019-02-06)
 Streamgraph module

 (c) 2010-2019 Torstein Honsi

 License: www.highcharts.com/license
*/
(function(a){"object"===typeof module&&module.exports?(a["default"]=a,module.exports=a):"function"===typeof define&&define.amd?define(function(){return a}):a("undefined"!==typeof Highcharts?Highcharts:void 0)})(function(a){(function(a){a=a.seriesType;a("streamgraph","areaspline",{fillOpacity:1,lineWidth:0,marker:{enabled:!1},stacking:"stream"},{negStacks:!1,streamStacker:function(a,b,c){a[0]-=b.total/2;a[1]-=b.total/2;this.stackedYData[c]=a}})})(a)});
//# sourceMappingURL=streamgraph.js.map