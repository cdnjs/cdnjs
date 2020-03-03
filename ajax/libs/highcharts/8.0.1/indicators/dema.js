/*
 Highstock JS v8.0.1 (2020-03-02)

 Indicator series type for Highstock

 (c) 2010-2019 Rafa Sebestjaski

 License: www.highcharts.com/license
*/
(function(a){"object"===typeof module&&module.exports?(a["default"]=a,module.exports=a):"function"===typeof define&&define.amd?define("highcharts/indicators/dema",["highcharts","highcharts/modules/stock"],function(c){a(c);a.Highcharts=c;return a}):a("undefined"!==typeof Highcharts?Highcharts:void 0)})(function(a){function c(a,b,m,e){a.hasOwnProperty(b)||(a[b]=e.apply(null,m))}a=a?a._modules:{};c(a,"mixins/indicator-required.js",[a["parts/Utilities.js"]],function(a){var b=a.error;return{isParentLoaded:function(a,
e,c,h,k){if(a)return h?h(a):!0;b(k||this.generateMessage(c,e));return!1},generateMessage:function(a,b){return'Error: "'+a+'" indicator type requires "'+b+'" indicator loaded before. Please read docs: https://api.highcharts.com/highstock/plotOptions.'+a}}});c(a,"indicators/dema.src.js",[a["parts/Globals.js"],a["parts/Utilities.js"],a["mixins/indicator-required.js"]],function(a,b,c){var e=b.correctFloat,m=b.isArray;b=b.seriesType;var h=a.seriesTypes.ema;b("dema","ema",{},{init:function(){var a=arguments,
b=this;c.isParentLoaded(h,"ema",b.type,function(k){k.prototype.init.apply(b,a)})},getEMA:function(a,b,c,e,l,f){return h.prototype.calculateEma(f||[],a,"undefined"===typeof l?1:l,this.chart.series[0].EMApercent,b,"undefined"===typeof e?-1:e,c)},getValues:function(a,b){var c=b.period,k=2*c,l=a.xData,f=a.yData,n=f?f.length:0,p=-1,r=[],t=[],u=[],g=0,v=[],d;a.EMApercent=2/(c+1);if(!(n<2*c-1)){m(f[0])&&(p=b.index?b.index:0);a=h.prototype.accumulatePeriodPoints(c,p,f);b=a/c;a=0;for(d=c;d<n+2;d++){d<n+1&&
(g=this.getEMA(f,x,b,p,d)[1],v.push(g));var x=g;if(d<k)a+=g;else{d===k&&(b=a/c);g=v[d-c-1];var w=this.getEMA([g],w,b)[1];var q=[l[d-2],e(2*g-w)];r.push(q);t.push(q[0]);u.push(q[1])}}return{values:r,xData:t,yData:u}}}});""});c(a,"masters/indicators/dema.src.js",[],function(){})});
//# sourceMappingURL=dema.js.map