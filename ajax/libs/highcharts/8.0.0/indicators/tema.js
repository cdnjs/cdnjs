/*
 Highstock JS v8.0.0 (2019-12-10)

 Indicator series type for Highstock

 (c) 2010-2019 Rafal Sebestjanski

 License: www.highcharts.com/license
*/
(function(a){"object"===typeof module&&module.exports?(a["default"]=a,module.exports=a):"function"===typeof define&&define.amd?define("highcharts/indicators/tema",["highcharts","highcharts/modules/stock"],function(b){a(b);a.Highcharts=b;return a}):a("undefined"!==typeof Highcharts?Highcharts:void 0)})(function(a){function b(a,f,l,g){a.hasOwnProperty(f)||(a[f]=g.apply(null,l))}a=a?a._modules:{};b(a,"mixins/indicator-required.js",[a["parts/Globals.js"]],function(a){var f=a.error;return{isParentLoaded:function(a,
g,b,k,r){if(a)return k?k(a):!0;f(r||this.generateMessage(b,g));return!1},generateMessage:function(a,b){return'Error: "'+a+'" indicator type requires "'+b+'" indicator loaded before. Please read docs: https://api.highcharts.com/highstock/plotOptions.'+a}}});b(a,"indicators/tema.src.js",[a["parts/Globals.js"],a["parts/Utilities.js"],a["mixins/indicator-required.js"]],function(a,b,l){var g=b.correctFloat,f=b.isArray,k=a.seriesTypes.ema;a.seriesType("tema","ema",{},{init:function(){var a=arguments,h=
this;l.isParentLoaded(k,"ema",h.type,function(d){d.prototype.init.apply(h,a)})},getEMA:function(a,h,d,b,f,g){return k.prototype.calculateEma(g||[],a,"undefined"===typeof f?1:f,this.chart.series[0].EMApercent,h,"undefined"===typeof b?-1:b,d)},getTemaPoint:function(a,b,d,f){return[a[f-3],g(3*d.level1-3*d.level2+d.level3)]},getValues:function(a,b){var d=b.period,g=2*d,h=3*d,l=a.xData,m=a.yData,n=m?m.length:0,t=-1,v=[],w=[],x=[],p=[],u=[],e,q,c={};a.EMApercent=2/(d+1);if(!(n<3*d-2)){f(m[0])&&(t=b.index?
b.index:0);a=k.prototype.accumulatePeriodPoints(d,t,m);b=a/d;a=0;for(e=d;e<n+3;e++){e<n+1&&(c.level1=this.getEMA(m,r,b,t,e)[1],p.push(c.level1));var r=c.level1;if(e<g)a+=c.level1;else{e===g&&(b=a/d,a=0);c.level1=p[e-d-1];c.level2=this.getEMA([c.level1],y,b)[1];u.push(c.level2);var y=c.level2;if(e<h)a+=c.level2;else{e===h&&(b=a/d);e===n+1&&(c.level1=p[e-d-1],c.level2=this.getEMA([c.level1],y,b)[1],u.push(c.level2));c.level1=p[e-d-2];c.level2=u[e-2*d-1];c.level3=this.getEMA([c.level2],c.prevLevel3,
b)[1];if(q=this.getTemaPoint(l,h,c,e))v.push(q),w.push(q[0]),x.push(q[1]);c.prevLevel3=c.level3}}}return{values:v,xData:w,yData:x}}}});""});b(a,"masters/indicators/tema.src.js",[],function(){})});
//# sourceMappingURL=tema.js.map