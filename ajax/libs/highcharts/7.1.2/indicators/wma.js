/*
  Highcharts JS v7.1.2 (2019-06-03)

 Indicator series type for Highstock

 (c) 2010-2019 Kacper Madej

 License: www.highcharts.com/license
*/
(function(a){"object"===typeof module&&module.exports?(a["default"]=a,module.exports=a):"function"===typeof define&&define.amd?define("highcharts/indicators/wma",["highcharts","highcharts/modules/stock"],function(c){a(c);a.Highcharts=c;return a}):a("undefined"!==typeof Highcharts?Highcharts:void 0)})(function(a){function c(a,c,g,h){a.hasOwnProperty(c)||(a[c]=h.apply(null,g))}a=a?a._modules:{};c(a,"indicators/wma.src.js",[a["parts/Globals.js"]],function(a){function c(a,b){b*=(b+1)/2;return a.reduce(function(a,
k,b){return[null,a[1]+k[1]*(b+1)]})[1]/b}function g(a,b,e,q){e=c(a,a.length);b=b[q-1];a.shift();return[b,e]}var h=a.isArray;a=a.seriesType;a("wma","sma",{params:{index:3,period:9}},{getValues:function(a,b){var e=b.period,c=a.xData,k=(a=a.yData)?a.length:0,d=1,r=c[0],p=a[0],l=[],m=[],n=[],f=-1;if(c.length<e)return!1;h(a[0])&&(f=b.index,p=a[0][f]);for(b=[[r,p]];d!==e;)b.push([c[d],0>f?a[d]:a[d][f]]),d++;for(e=d;e<k;e++)d=g(b,c,a,e),l.push(d),m.push(d[0]),n.push(d[1]),b.push([c[e],0>f?a[e]:a[e][f]]);
d=g(b,c,a,e);l.push(d);m.push(d[0]);n.push(d[1]);return{values:l,xData:m,yData:n}}})});c(a,"masters/indicators/wma.src.js",[],function(){})});
//# sourceMappingURL=wma.js.map