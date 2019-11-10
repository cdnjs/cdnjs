/*
  Highcharts JS v7.0.3 (2019-02-06)

 Indicator series type for Highstock

 (c) 2010-2019 Rafa Sebestjaski

 License: www.highcharts.com/license
*/
(function(a){"object"===typeof module&&module.exports?(a["default"]=a,module.exports=a):"function"===typeof define&&define.amd?define(function(){return a}):a("undefined"!==typeof Highcharts?Highcharts:void 0)})(function(a){var f=function(a){var n=a.error;return{isParentLoaded:function(a,e,p,k,b){if(a)return k?k(a):!0;n(b||this.generateMessage(p,e));return!1},generateMessage:function(a,e){return'Error: "'+a+'" indicator type requires "'+e+'" indicator loaded before. Please read docs: https://api.highcharts.com/highstock/plotOptions.'+
a}}}(a);(function(a,f){var n=a.isArray,e=a.seriesTypes.ema,p=a.correctFloat;a.seriesType("dema","ema",{},{init:function(){var a=arguments,b=this;f.isParentLoaded(e,"ema",b.type,function(k){k.prototype.init.apply(b,a)})},getEMA:function(a,b,c,l,t,g){return e.prototype.calculateEma(g||[],a,void 0===t?1:t,this.chart.series[0].EMApercent,b,void 0===l?-1:l,c)},getValues:function(a,b){var c=b.period,l=2*c,k=a.xData,g=a.yData,f=g?g.length:0,q=-1,u=[],v=[],w=[],h=0,r,x,y=[],d,m;a.EMApercent=2/(c+1);if(f<
2*c-1)return!1;n(g[0])&&(q=b.index?b.index:0);a=e.prototype.accumulatePeriodPoints(c,q,g);b=a/c;a=0;for(d=c;d<f+2;d++)d<f+1&&(h=this.getEMA(g,x,b,q,d)[1],y.push(h)),x=h,d<l?a+=h:(d===l&&(b=a/c),h=y[d-c-1],r=this.getEMA([h],r,b)[1],m=[k[d-2],p(2*h-r)],u.push(m),v.push(m[0]),w.push(m[1]));return{values:u,xData:v,yData:w}}})})(a,f)});
//# sourceMappingURL=dema.js.map