/*
 Highstock JS v7.1.3 (2019-08-14)

 Indicator series type for Highstock

 (c) 2010-2019 Sebastian Bochan

 License: www.highcharts.com/license
*/
(function(a){"object"===typeof module&&module.exports?(a["default"]=a,module.exports=a):"function"===typeof define&&define.amd?define("highcharts/indicators/cci",["highcharts","highcharts/modules/stock"],function(b){a(b);a.Highcharts=b;return a}):a("undefined"!==typeof Highcharts?Highcharts:void 0)})(function(a){function b(a,b,h,k){a.hasOwnProperty(b)||(a[b]=k.apply(null,h))}a=a?a._modules:{};b(a,"indicators/cci.src.js",[a["parts/Globals.js"],a["parts/Utilities.js"]],function(a,b){function h(a){return a.reduce(function(a,
b){return a+b},0)}var k=b.isArray;a=a.seriesType;a("cci","sma",{params:{period:14}},{getValues:function(a,b){b=b.period;var l=a.xData,t=(a=a.yData)?a.length:0,m=[],d=1,n=[],p=[],q=[];if(l.length<=b||!k(a[0])||4!==a[0].length)return!1;for(;d<b;){var c=a[d-1];m.push((c[1]+c[2]+c[3])/3);d++}for(d=b;d<=t;d++){c=a[d-1];c=(c[1]+c[2]+c[3])/3;var f=m.push(c);var e=m.slice(f-b);f=h(e)/b;var g,u=e.length,r=0;for(g=0;g<u;g++)r+=Math.abs(f-e[g]);e=r/b;c=(c-f)/(.015*e);n.push([l[d-1],c]);p.push(l[d-1]);q.push(c)}return{values:n,
xData:p,yData:q}}})});b(a,"masters/indicators/cci.src.js",[],function(){})});
//# sourceMappingURL=cci.js.map