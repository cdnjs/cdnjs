/*
  Highcharts JS v7.0.3 (2019-02-06)

 Indicator series type for Highstock

 (c) 2010-2019 Sebastian Bochan

 License: www.highcharts.com/license
*/
(function(a){"object"===typeof module&&module.exports?(a["default"]=a,module.exports=a):"function"===typeof define&&define.amd?define(function(){return a}):a("undefined"!==typeof Highcharts?Highcharts:void 0)})(function(a){(function(a){function r(a){return a.reduce(function(a,h){return a+h},0)}var t=a.isArray;a=a.seriesType;a("cci","sma",{params:{period:14}},{getValues:function(a,d){d=d.period;var k=a.xData,h=(a=a.yData)?a.length:0,l=[],e,c=1,m=[],n=[],p=[],b,f;if(k.length<=d||!t(a[0])||4!==a[0].length)return!1;
for(;c<d;)b=a[c-1],l.push((b[1]+b[2]+b[3])/3),c++;for(c=d;c<=h;c++){b=a[c-1];b=(b[1]+b[2]+b[3])/3;f=l.push(b);e=l.slice(f-d);f=r(e)/d;var u=e.length,q=0,g;for(g=0;g<u;g++)q+=Math.abs(f-e[g]);e=q/d;b=(b-f)/(.015*e);m.push([k[c-1],b]);n.push(k[c-1]);p.push(b)}return{values:m,xData:n,yData:p}}})})(a)});
//# sourceMappingURL=cci.js.map