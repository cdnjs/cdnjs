/*
  Highcharts JS v6.1.1 (2018-06-27)

 Indicator series type for Highstock

 (c) 2010-2017 Sebastian Bochan

 License: www.highcharts.com/license
*/
(function(a){"object"===typeof module&&module.exports?module.exports=a:a(Highcharts)})(function(a){(function(a){function r(c){return a.reduce(c,function(c,a){return c+a},0)}var t=a.isArray,k=a.seriesType;k("cci","sma",{params:{period:14}},{getValues:function(c,a){a=a.period;var h=c.xData,k=(c=c.yData)?c.length:0,l=[],e,d=1,m=[],n=[],p=[],b,f;if(h.length<=a||!t(c[0])||4!==c[0].length)return!1;for(;d<a;)b=c[d-1],l.push((b[1]+b[2]+b[3])/3),d++;for(d=a;d<=k;d++){b=c[d-1];b=(b[1]+b[2]+b[3])/3;f=l.push(b);
e=l.slice(f-a);f=r(e)/a;var u=e.length,q=0,g;for(g=0;g<u;g++)q+=Math.abs(f-e[g]);e=q/a;b=(b-f)/(.015*e);m.push([h[d-1],b]);n.push(h[d-1]);p.push(b)}return{values:m,xData:n,yData:p}}})})(a)});
