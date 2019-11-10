/*
 Highstock JS v7.1.3 (2019-08-14)

 Indicator series type for Highstock

 (c) 2010-2019 Kacper Madej

 License: www.highcharts.com/license
*/
(function(a){"object"===typeof module&&module.exports?(a["default"]=a,module.exports=a):"function"===typeof define&&define.amd?define("highcharts/indicators/wma",["highcharts","highcharts/modules/stock"],function(b){a(b);a.Highcharts=b;return a}):a("undefined"!==typeof Highcharts?Highcharts:void 0)})(function(a){function b(a,b,g,h){a.hasOwnProperty(b)||(a[b]=h.apply(null,g))}a=a?a._modules:{};b(a,"indicators/wma.src.js",[a["parts/Globals.js"],a["parts/Utilities.js"]],function(a,b){function g(a,c){c*=
(c+1)/2;return a.reduce(function(a,k,c){return[null,a[1]+k[1]*(c+1)]})[1]/c}function h(a,c,e,b){e=g(a,a.length);c=c[b-1];a.shift();return[c,e]}var q=b.isArray;a=a.seriesType;a("wma","sma",{params:{index:3,period:9}},{getValues:function(a,c){var e=c.period,b=a.xData,g=(a=a.yData)?a.length:0,d=1,k=b[0],p=a[0],l=[],m=[],n=[],f=-1;if(b.length<e)return!1;q(a[0])&&(f=c.index,p=a[0][f]);for(c=[[k,p]];d!==e;)c.push([b[d],0>f?a[d]:a[d][f]]),d++;for(e=d;e<g;e++)d=h(c,b,a,e),l.push(d),m.push(d[0]),n.push(d[1]),
c.push([b[e],0>f?a[e]:a[e][f]]);d=h(c,b,a,e);l.push(d);m.push(d[0]);n.push(d[1]);return{values:l,xData:m,yData:n}}})});b(a,"masters/indicators/wma.src.js",[],function(){})});
//# sourceMappingURL=wma.js.map