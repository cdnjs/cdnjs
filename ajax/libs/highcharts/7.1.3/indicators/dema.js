/*
 Highstock JS v7.1.3 (2019-08-14)

 Indicator series type for Highstock

 (c) 2010-2019 Rafa Sebestjaski

 License: www.highcharts.com/license
*/
(function(a){"object"===typeof module&&module.exports?(a["default"]=a,module.exports=a):"function"===typeof define&&define.amd?define("highcharts/indicators/dema",["highcharts","highcharts/modules/stock"],function(b){a(b);a.Highcharts=b;return a}):a("undefined"!==typeof Highcharts?Highcharts:void 0)})(function(a){function b(a,b,k,e){a.hasOwnProperty(b)||(a[b]=e.apply(null,k))}a=a?a._modules:{};b(a,"mixins/indicator-required.js",[a["parts/Globals.js"]],function(a){var b=a.error;return{isParentLoaded:function(a,
e,l,f,m){if(a)return f?f(a):!0;b(m||this.generateMessage(l,e));return!1},generateMessage:function(a,b){return'Error: "'+a+'" indicator type requires "'+b+'" indicator loaded before. Please read docs: https://api.highcharts.com/highstock/plotOptions.'+a}}});b(a,"indicators/dema.src.js",[a["parts/Globals.js"],a["parts/Utilities.js"],a["mixins/indicator-required.js"]],function(a,b,k){var e=b.isArray,l=a.seriesTypes.ema,f=a.correctFloat;a.seriesType("dema","ema",{},{init:function(){var a=arguments,b=
this;k.isParentLoaded(l,"ema",b.type,function(m){m.prototype.init.apply(b,a)})},getEMA:function(a,b,c,e,f,g){return l.prototype.calculateEma(g||[],a,void 0===f?1:f,this.chart.series[0].EMApercent,b,void 0===e?-1:e,c)},getValues:function(a,b){var c=b.period,k=2*c,m=a.xData,g=a.yData,n=g?g.length:0,p=-1,r=[],t=[],u=[],h=0,v=[],d;a.EMApercent=2/(c+1);if(n<2*c-1)return!1;e(g[0])&&(p=b.index?b.index:0);a=l.prototype.accumulatePeriodPoints(c,p,g);b=a/c;a=0;for(d=c;d<n+2;d++){d<n+1&&(h=this.getEMA(g,x,b,
p,d)[1],v.push(h));var x=h;if(d<k)a+=h;else{d===k&&(b=a/c);h=v[d-c-1];var w=this.getEMA([h],w,b)[1];var q=[m[d-2],f(2*h-w)];r.push(q);t.push(q[0]);u.push(q[1])}}return{values:r,xData:t,yData:u}}})});b(a,"masters/indicators/dema.src.js",[],function(){})});
//# sourceMappingURL=dema.js.map