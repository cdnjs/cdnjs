/*
  Highcharts JS v6.1.0 (2018-04-13)

 Indicator series type for Highstock

 (c) 2010-2017 Sebastian Bochan

 License: www.highcharts.com/license
*/
(function(a){"object"===typeof module&&module.exports?module.exports=a:a(Highcharts)})(function(a){(function(a){function r(b,a,c,f,k,h,e,l){b=0>e?c[f-1]:c[f-1][e];return[a[f-1],void 0===h?l:b*k+h*(1-k)]}var t=a.isArray;a=a.seriesType;a("ema","sma",{params:{index:0,period:14}},{getValues:function(b,a){var c=a.period,f=b.xData,k=(b=b.yData)?b.length:0,h=2/(c+1),e=0,l=0,n=[],p=[],q=[],g=-1,m=[],d;if(f.length<c)return!1;for(t(b[0])&&(g=a.index?a.index:0);e<c;)m.push([f[e],0>g?b[e]:b[e][g]]),l+=0>g?b[e]:
b[e][g],e++;a=l/c;for(c=e;c<k;c++)d=r(m,f,b,c,h,d,g,a),n.push(d),p.push(d[0]),q.push(d[1]),d=d[1],m.push([f[c],0>g?b[c]:b[c][g]]);d=r(m,f,b,c,h,d,g);n.push(d);p.push(d[0]);q.push(d[1]);return{values:n,xData:p,yData:q}}})})(a)});
