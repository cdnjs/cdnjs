/*
 Highstock JS v7.1.3 (2019-08-14)

 Indicator series type for Highstock

 (c) 2010-2019 Kacper Madej

 License: www.highcharts.com/license
*/
(function(a){"object"===typeof module&&module.exports?(a["default"]=a,module.exports=a):"function"===typeof define&&define.amd?define("highcharts/indicators/roc",["highcharts","highcharts/modules/stock"],function(b){a(b);a.Highcharts=b;return a}):a("undefined"!==typeof Highcharts?Highcharts:void 0)})(function(a){function b(a,b,f,g){a.hasOwnProperty(b)||(a[b]=g.apply(null,f))}a=a?a._modules:{};b(a,"indicators/roc.src.js",[a["parts/Globals.js"],a["parts/Utilities.js"]],function(a,b){var f=b.isArray;
a=a.seriesType;a("roc","sma",{params:{index:3,period:9}},{nameBase:"Rate of Change",getValues:function(a,b){var d=b.period,h=a.xData,g=(a=a.yData)?a.length:0,k=[],l=[],m=[],e=-1;if(h.length<=d)return!1;f(a[0])&&(e=b.index);for(b=d;b<g;b++){var c=0>e?(c=a[b-d])?(a[b]-c)/c*100:null:(c=a[b-d][e])?(a[b][e]-c)/c*100:null;c=[h[b],c];k.push(c);l.push(c[0]);m.push(c[1])}return{values:k,xData:l,yData:m}}})});b(a,"masters/indicators/roc.src.js",[],function(){})});
//# sourceMappingURL=roc.js.map