/*
  Highcharts JS v6.0.6 (2018-02-05)
 Streamgraph module

 (c) 2010-2017 Torstein Honsi

 License: www.highcharts.com/license
*/
(function(a){"object"===typeof module&&module.exports?module.exports=a:a(Highcharts)})(function(a){(function(a){var c=a.seriesType;c("streamgraph","areaspline",{fillOpacity:1,lineWidth:0,marker:{enabled:!1},stacking:"stream"},{negStacks:!1,streamStacker:function(b,d,c){var e=a.pick(this.yAxis.options.reversedStacks,!0);b[0]-=d.total/2;b[1]-=d.total/2;this.stackedYData[c]=0===this.index?b[+e]:b[+!e]}})})(a)});
