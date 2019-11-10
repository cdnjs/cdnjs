/*
  Highcharts JS v7.0.3 (2019-02-06)

 Indicator series type for Highstock

 (c) 2010-2019 Kacper Madej

 License: www.highcharts.com/license
*/
(function(a){"object"===typeof module&&module.exports?(a["default"]=a,module.exports=a):"function"===typeof define&&define.amd?define(function(){return a}):a("undefined"!==typeof Highcharts?Highcharts:void 0)})(function(a){(function(a){function g(b,c){c*=(c+1)/2;return b.reduce(function(b,c,a){return[null,b[1]+c[1]*(a+1)]})[1]/c}function m(b,c,a,e){a=g(b,b.length);c=c[e-1];b.shift();return[c,a]}var p=a.isArray;a=a.seriesType;a("wma","sma",{params:{index:3,period:9}},{getValues:function(b,c){var a=
c.period,e=b.xData,g=(b=b.yData)?b.length:0,d=1,q=e[0],n=b[0],h=[],k=[],l=[],f=-1;if(e.length<a)return!1;p(b[0])&&(f=c.index,n=b[0][f]);for(c=[[q,n]];d!==a;)c.push([e[d],0>f?b[d]:b[d][f]]),d++;for(a=d;a<g;a++)d=m(c,e,b,a),h.push(d),k.push(d[0]),l.push(d[1]),c.push([e[a],0>f?b[a]:b[a][f]]);d=m(c,e,b,a);h.push(d);k.push(d[0]);l.push(d[1]);return{values:h,xData:k,yData:l}}})})(a)});
//# sourceMappingURL=wma.js.map