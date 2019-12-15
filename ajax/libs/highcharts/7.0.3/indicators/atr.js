/*
  Highcharts JS v7.0.3 (2019-02-06)

 Indicator series type for Highstock

 (c) 2010-2019 Sebastian Bochan

 License: www.highcharts.com/license
*/
(function(a){"object"===typeof module&&module.exports?(a["default"]=a,module.exports=a):"function"===typeof define&&define.amd?define(function(){return a}):a("undefined"!==typeof Highcharts?Highcharts:void 0)})(function(a){(function(a){function p(d,a){return Math.max(d[1]-d[2],a===g?0:Math.abs(d[1]-a[3]),a===g?0:Math.abs(d[2]-a[3]))}var r=a.isArray;a=a.seriesType;var g;a("atr","sma",{params:{period:14}},{getValues:function(a,e){e=e.period;var f=a.xData,d=(a=a.yData)?a.length:0,k=1,h=0,g=0,l=[],m=
[],n=[],c,b,q;q=[[f[0],a[0]]];if(f.length<=e||!r(a[0])||4!==a[0].length)return!1;for(b=1;b<=d;b++)if(q.push([f[b],a[b]]),e<k){c=e;var t=f[b-1],u=p(a[b-1],a[b-2]);c=[t,(h*(c-1)+u)/c];h=c[1];l.push(c);m.push(c[0]);n.push(c[1])}else e===k?(h=g/(b-1),l.push([f[b-1],h]),m.push(f[b-1]),n.push(h)):g+=p(a[b-1],a[b-2]),k++;return{values:l,xData:m,yData:n}}})})(a)});
//# sourceMappingURL=atr.js.map