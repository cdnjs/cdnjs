/*
  Highcharts JS v7.0.3 (2019-02-06)

 Indicator series type for Highstock

 (c) 2010-2019 Kacper Madej

 License: www.highcharts.com/license
*/
(function(a){"object"===typeof module&&module.exports?(a["default"]=a,module.exports=a):"function"===typeof define&&define.amd?define(function(){return a}):a("undefined"!==typeof Highcharts?Highcharts:void 0)})(function(a){(function(a){var f=a.seriesType,m=a.isArray;f("roc","sma",{params:{index:3,period:9}},{nameBase:"Rate of Change",getValues:function(a,c){var d=c.period,g=a.xData,f=(a=a.yData)?a.length:0,h=[],k=[],l=[],e=-1,b;if(g.length<=d)return!1;m(a[0])&&(e=c.index);for(c=d;c<f;c++)b=0>e?(b=
a[c-d])?(a[c]-b)/b*100:null:(b=a[c-d][e])?(a[c][e]-b)/b*100:null,b=[g[c],b],h.push(b),k.push(b[0]),l.push(b[1]);return{values:h,xData:k,yData:l}}})})(a)});
//# sourceMappingURL=roc.js.map