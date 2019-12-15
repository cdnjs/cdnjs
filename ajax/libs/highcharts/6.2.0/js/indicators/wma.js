/*
  Highcharts JS v6.2.0 (2018-10-17)

 Indicator series type for Highstock

 (c) 2010-2017 Kacper Madej

 License: www.highcharts.com/license
*/
(function(a){"object"===typeof module&&module.exports?module.exports=a:"function"===typeof define&&define.amd?define(function(){return a}):a(Highcharts)})(function(a){(function(a){function g(b,c){c*=(c+1)/2;return h(b,function(b,c,a){return[null,b[1]+c[1]*(a+1)]})[1]/c}function n(b,c,a,e){a=g(b,b.length);c=c[e-1];b.shift();return[c,a]}var q=a.isArray,h=a.reduce;a=a.seriesType;a("wma","sma",{params:{index:3,period:9}},{getValues:function(b,c){var a=c.period,e=b.xData,g=(b=b.yData)?b.length:0,d=1,h=
e[0],p=b[0],k=[],l=[],m=[],f=-1;if(e.length<a)return!1;q(b[0])&&(f=c.index,p=b[0][f]);for(c=[[h,p]];d!==a;)c.push([e[d],0>f?b[d]:b[d][f]]),d++;for(a=d;a<g;a++)d=n(c,e,b,a),k.push(d),l.push(d[0]),m.push(d[1]),c.push([e[a],0>f?b[a]:b[a][f]]);d=n(c,e,b,a);k.push(d);l.push(d[0]);m.push(d[1]);return{values:k,xData:l,yData:m}}})})(a)});
//# sourceMappingURL=wma.js.map
