/*
  Highcharts JS v6.0.7 (2018-02-16)

 Indicator series type for Highstock

 (c) 2010-2017 Kacper Madej

 License: www.highcharts.com/license
*/
(function(a){"object"===typeof module&&module.exports?module.exports=a:a(Highcharts)})(function(a){(function(a){function g(b,c){c*=(c+1)/2;return b.reduce(function(b,c,a){return[null,b[1]+c[1]*(a+1)]})[1]/c}function n(b,c,m,a){m=g(b,b.length);c=c[a-1];b.shift();return[c,m]}var q=a.isArray;a=a.seriesType;a("wma","sma",{params:{index:3,period:9}},{getValues:function(b,c){var a=c.period,e=b.xData,g=(b=b.yData)?b.length:0,d=1,r=e[0],p=b[0],h=[],k=[],l=[],f=-1;if(e.length<a)return!1;q(b[0])&&(f=c.index,
p=b[0][f]);for(c=[[r,p]];d!==a;)c.push([e[d],0>f?b[d]:b[d][f]]),d++;for(a=d;a<g;a++)d=n(c,e,b,a),h.push(d),k.push(d[0]),l.push(d[1]),c.push([e[a],0>f?b[a]:b[a][f]]);d=n(c,e,b,a);h.push(d);k.push(d[0]);l.push(d[1]);return{values:h,xData:k,yData:l}}})})(a)});
