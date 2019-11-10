/*
  Highcharts JS v6.0.2 (2017-10-20)
 Streamgraph module

 (c) 2010-2017 Torstein Honsi

 License: www.highcharts.com/license
*/
(function(a){"object"===typeof module&&module.exports?module.exports=a:a(Highcharts)})(function(a){(function(a){a=a.seriesType;a("streamgraph","areaspline",{fillOpacity:1,lineWidth:0,marker:{enabled:!1},stacking:"stream"},{negStacks:!1,streamStacker:function(a,b,c){a[0]-=b.total/2;a[1]-=b.total/2;this.stackedYData[c]=0===this.index?a[1]:a[0]}})})(a)});
