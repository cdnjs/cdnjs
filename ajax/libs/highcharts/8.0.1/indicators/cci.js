/*
 Highstock JS v8.0.1 (2020-03-02)

 Indicator series type for Highstock

 (c) 2010-2019 Sebastian Bochan

 License: www.highcharts.com/license
*/
(function(a){"object"===typeof module&&module.exports?(a["default"]=a,module.exports=a):"function"===typeof define&&define.amd?define("highcharts/indicators/cci",["highcharts","highcharts/modules/stock"],function(c){a(c);a.Highcharts=c;return a}):a("undefined"!==typeof Highcharts?Highcharts:void 0)})(function(a){function c(a,c,k,l){a.hasOwnProperty(c)||(a[c]=l.apply(null,k))}a=a?a._modules:{};c(a,"indicators/cci.src.js",[a["parts/Utilities.js"]],function(a){function c(a){return a.reduce(function(a,
c){return a+c},0)}var k=a.isArray;a=a.seriesType;a("cci","sma",{params:{period:14}},{getValues:function(a,e){e=e.period;var m=a.xData,l=(a=a.yData)?a.length:0,n=[],d=1,p=[],q=[],r=[];if(!(m.length<=e)&&k(a[0])&&4===a[0].length){for(;d<e;){var b=a[d-1];n.push((b[1]+b[2]+b[3])/3);d++}for(d=e;d<=l;d++){b=a[d-1];b=(b[1]+b[2]+b[3])/3;var g=n.push(b);var f=n.slice(g-e);g=c(f)/e;var h,u=f.length,t=0;for(h=0;h<u;h++)t+=Math.abs(g-f[h]);f=t/e;b=(b-g)/(.015*f);p.push([m[d-1],b]);q.push(m[d-1]);r.push(b)}return{values:p,
xData:q,yData:r}}}});""});c(a,"masters/indicators/cci.src.js",[],function(){})});
//# sourceMappingURL=cci.js.map