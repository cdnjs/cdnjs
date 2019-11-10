/*
  Highcharts JS v6.0.3 (2017-11-14)

 Indicator series type for Highstock

 (c) 2010-2017 Sebastian Bochan

 License: www.highcharts.com/license
*/
(function(a){"object"===typeof module&&module.exports?module.exports=a:a(Highcharts)})(function(a){(function(a){var q=a.isArray;a=a.seriesType;a("ema","sma",{name:"EMA (14)",params:{index:0,period:14}},{getValues:function(a,g){var b=g.period,h=a.xData,c=a.yData,r=c?c.length:0;a=2/(b+1);var d=0,f=0,n=0,k=[],l=[],m=[],e=-1,p=[];if(h.length<b)return!1;for(q(c[0])&&(e=g.index?g.index:0);f<b;)p.push([h[f],0>e?c[f]:c[f][e]]),n+=0>e?c[f]:c[f][e],f++;g=n/b;for(b=f;b<r;b++)f=0>e?c[b-1]:c[b-1][e],d=[h[b-1],
0===d?g:f*a+d*(1-a)],k.push(d),l.push(d[0]),m.push(d[1]),d=d[1],p.push([h[b],0>e?c[b]:c[b][e]]);c=0>e?c[b-1]:c[b-1][e];d=[h[b-1],0===d?void 0:c*a+d*(1-a)];k.push(d);l.push(d[0]);m.push(d[1]);return{values:k,xData:l,yData:m}}})})(a)});
