/*
  Highcharts JS v6.1.1 (2018-06-27)

 Indicator series type for Highstock

 (c) 2010-2017 Kacper Madej

 License: www.highcharts.com/license
*/
(function(c){"object"===typeof module&&module.exports?module.exports=c:c(Highcharts)})(function(c){(function(f){function c(a,b){b*=(b+1)/2;return h(a,function(a,b,c){return[null,a[1]+b[1]*(c+1)]})[1]/b}function n(a,b,e,q){e=c(a,a.length);b=b[q-1];a.shift();return[b,e]}var r=f.isArray,h=f.reduce;f=f.seriesType;f("wma","sma",{params:{index:3,period:9}},{getValues:function(a,b){var e=b.period,c=a.xData,f=(a=a.yData)?a.length:0,d=1,h=c[0],p=a[0],k=[],l=[],m=[],g=-1;if(c.length<e)return!1;r(a[0])&&(g=
b.index,p=a[0][g]);for(b=[[h,p]];d!==e;)b.push([c[d],0>g?a[d]:a[d][g]]),d++;for(e=d;e<f;e++)d=n(b,c,a,e),k.push(d),l.push(d[0]),m.push(d[1]),b.push([c[e],0>g?a[e]:a[e][g]]);d=n(b,c,a,e);k.push(d);l.push(d[0]);m.push(d[1]);return{values:k,xData:l,yData:m}}})})(c)});
