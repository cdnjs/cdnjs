/*
  Highcharts JS v7.1.2 (2019-06-03)

 Indicator series type for Highstock

 (c) 2010-2019 Rafa Sebestjaski

 License: www.highcharts.com/license
*/
(function(a){"object"===typeof module&&module.exports?(a["default"]=a,module.exports=a):"function"===typeof define&&define.amd?define("highcharts/indicators/dema",["highcharts","highcharts/modules/stock"],function(b){a(b);a.Highcharts=b;return a}):a("undefined"!==typeof Highcharts?Highcharts:void 0)})(function(a){function b(a,b,p,e){a.hasOwnProperty(b)||(a[b]=e.apply(null,p))}a=a?a._modules:{};b(a,"mixins/indicator-required.js",[a["parts/Globals.js"]],function(a){var b=a.error;return{isParentLoaded:function(a,
e,n,k,h){if(a)return k?k(a):!0;b(h||this.generateMessage(n,e));return!1},generateMessage:function(a,b){return'Error: "'+a+'" indicator type requires "'+b+'" indicator loaded before. Please read docs: https://api.highcharts.com/highstock/plotOptions.'+a}}});b(a,"indicators/dema.src.js",[a["parts/Globals.js"],a["mixins/indicator-required.js"]],function(a,b){var p=a.isArray,e=a.seriesTypes.ema,n=a.correctFloat;a.seriesType("dema","ema",{},{init:function(){var a=arguments,h=this;b.isParentLoaded(e,"ema",
h.type,function(b){b.prototype.init.apply(h,a)})},getEMA:function(a,b,c,l,u,f){return e.prototype.calculateEma(f||[],a,void 0===u?1:u,this.chart.series[0].EMApercent,b,void 0===l?-1:l,c)},getValues:function(a,b){var c=b.period,l=2*c,h=a.xData,f=a.yData,q=f?f.length:0,r=-1,k=[],v=[],w=[],g=0,t,x,y=[],d,m;a.EMApercent=2/(c+1);if(q<2*c-1)return!1;p(f[0])&&(r=b.index?b.index:0);a=e.prototype.accumulatePeriodPoints(c,r,f);b=a/c;a=0;for(d=c;d<q+2;d++)d<q+1&&(g=this.getEMA(f,x,b,r,d)[1],y.push(g)),x=g,d<
l?a+=g:(d===l&&(b=a/c),g=y[d-c-1],t=this.getEMA([g],t,b)[1],m=[h[d-2],n(2*g-t)],k.push(m),v.push(m[0]),w.push(m[1]));return{values:k,xData:v,yData:w}}})});b(a,"masters/indicators/dema.src.js",[],function(){})});
//# sourceMappingURL=dema.js.map