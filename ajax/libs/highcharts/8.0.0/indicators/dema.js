/*
 Highstock JS v8.0.0 (2019-12-10)

 Indicator series type for Highstock

 (c) 2010-2019 Rafa Sebestjaski

 License: www.highcharts.com/license
*/
(function(a){"object"===typeof module&&module.exports?(a["default"]=a,module.exports=a):"function"===typeof define&&define.amd?define("highcharts/indicators/dema",["highcharts","highcharts/modules/stock"],function(b){a(b);a.Highcharts=b;return a}):a("undefined"!==typeof Highcharts?Highcharts:void 0)})(function(a){function b(a,d,k,f){a.hasOwnProperty(d)||(a[d]=f.apply(null,k))}a=a?a._modules:{};b(a,"mixins/indicator-required.js",[a["parts/Globals.js"]],function(a){var d=a.error;return{isParentLoaded:function(a,
f,b,l,m){if(a)return l?l(a):!0;d(m||this.generateMessage(b,f));return!1},generateMessage:function(a,b){return'Error: "'+a+'" indicator type requires "'+b+'" indicator loaded before. Please read docs: https://api.highcharts.com/highstock/plotOptions.'+a}}});b(a,"indicators/dema.src.js",[a["parts/Globals.js"],a["parts/Utilities.js"],a["mixins/indicator-required.js"]],function(a,b,k){var f=b.correctFloat,d=b.isArray,l=a.seriesTypes.ema;a.seriesType("dema","ema",{},{init:function(){var a=arguments,b=
this;k.isParentLoaded(l,"ema",b.type,function(m){m.prototype.init.apply(b,a)})},getEMA:function(a,b,c,d,f,g){return l.prototype.calculateEma(g||[],a,"undefined"===typeof f?1:f,this.chart.series[0].EMApercent,b,"undefined"===typeof d?-1:d,c)},getValues:function(a,b){var c=b.period,k=2*c,m=a.xData,g=a.yData,n=g?g.length:0,p=-1,r=[],t=[],u=[],h=0,v=[],e;a.EMApercent=2/(c+1);if(!(n<2*c-1)){d(g[0])&&(p=b.index?b.index:0);a=l.prototype.accumulatePeriodPoints(c,p,g);b=a/c;a=0;for(e=c;e<n+2;e++){e<n+1&&(h=
this.getEMA(g,x,b,p,e)[1],v.push(h));var x=h;if(e<k)a+=h;else{e===k&&(b=a/c);h=v[e-c-1];var w=this.getEMA([h],w,b)[1];var q=[m[e-2],f(2*h-w)];r.push(q);t.push(q[0]);u.push(q[1])}}return{values:r,xData:t,yData:u}}}});""});b(a,"masters/indicators/dema.src.js",[],function(){})});
//# sourceMappingURL=dema.js.map