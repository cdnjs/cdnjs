/*
 Highstock JS v7.1.3 (2019-08-14)

 Indicator series type for Highstock

 (c) 2010-2019 Sebastian Bochan

 License: www.highcharts.com/license
*/
(function(a){"object"===typeof module&&module.exports?(a["default"]=a,module.exports=a):"function"===typeof define&&define.amd?define("highcharts/indicators/momentum",["highcharts","highcharts/modules/stock"],function(b){a(b);a.Highcharts=b;return a}):a("undefined"!==typeof Highcharts?Highcharts:void 0)})(function(a){function b(a,b,g,h){a.hasOwnProperty(b)||(a[b]=h.apply(null,g))}a=a?a._modules:{};b(a,"indicators/momentum.src.js",[a["parts/Globals.js"],a["parts/Utilities.js"]],function(a,b){function g(a,
b,c,f,d){c=c[f-1][3]-c[f-d-1][3];b=b[f-1];a.shift();return[b,c]}var h=b.isArray;a=a.seriesType;a("momentum","sma",{params:{period:14}},{nameBase:"Momentum",getValues:function(a,b){b=b.period;var c=a.xData,f=(a=a.yData)?a.length:0,d=c[0],k=[],l=[],m=[];if(c.length<=b||!h(a[0]))return!1;var n=[[d,a[0][3]]];for(d=b+1;d<f;d++){var e=g(n,c,a,d,b,void 0);k.push(e);l.push(e[0]);m.push(e[1])}e=g(n,c,a,d,b,void 0);k.push(e);l.push(e[0]);m.push(e[1]);return{values:k,xData:l,yData:m}}})});b(a,"masters/indicators/momentum.src.js",
[],function(){})});
//# sourceMappingURL=momentum.js.map