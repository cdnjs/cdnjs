/*
 Highstock JS v8.0.1 (2020-03-02)

 Indicator series type for Highstock

 (c) 2010-2019 Kacper Madej

 License: www.highcharts.com/license
*/
(function(a){"object"===typeof module&&module.exports?(a["default"]=a,module.exports=a):"function"===typeof define&&define.amd?define("highcharts/indicators/roc",["highcharts","highcharts/modules/stock"],function(d){a(d);a.Highcharts=d;return a}):a("undefined"!==typeof Highcharts?Highcharts:void 0)})(function(a){function d(a,d,g,b){a.hasOwnProperty(d)||(a[d]=b.apply(null,g))}a=a?a._modules:{};d(a,"indicators/roc.src.js",[a["parts/Utilities.js"]],function(a){var d=a.isArray;a=a.seriesType;a("roc",
"sma",{params:{index:3,period:9}},{nameBase:"Rate of Change",getValues:function(a,b){var e=b.period,h=a.xData,g=(a=a.yData)?a.length:0,k=[],l=[],m=[],f=-1;if(!(h.length<=e)){d(a[0])&&(f=b.index);for(b=e;b<g;b++){var c=0>f?(c=a[b-e])?(a[b]-c)/c*100:null:(c=a[b-e][f])?(a[b][f]-c)/c*100:null;c=[h[b],c];k.push(c);l.push(c[0]);m.push(c[1])}return{values:k,xData:l,yData:m}}}});""});d(a,"masters/indicators/roc.src.js",[],function(){})});
//# sourceMappingURL=roc.js.map