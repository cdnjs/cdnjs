/*
 Highstock JS v7.1.3 (2019-08-14)

 Indicator series type for Highstock

 (c) 2010-2019 Rafal Sebestjanski

 License: www.highcharts.com/license
*/
(function(a){"object"===typeof module&&module.exports?(a["default"]=a,module.exports=a):"function"===typeof define&&define.amd?define("highcharts/indicators/tema",["highcharts","highcharts/modules/stock"],function(b){a(b);a.Highcharts=b;return a}):a("undefined"!==typeof Highcharts?Highcharts:void 0)})(function(a){function b(a,b,g,f){a.hasOwnProperty(b)||(a[b]=f.apply(null,g))}a=a?a._modules:{};b(a,"mixins/indicator-required.js",[a["parts/Globals.js"]],function(a){var b=a.error;return{isParentLoaded:function(a,
f,m,h,t){if(a)return h?h(a):!0;b(t||this.generateMessage(m,f));return!1},generateMessage:function(a,b){return'Error: "'+a+'" indicator type requires "'+b+'" indicator loaded before. Please read docs: https://api.highcharts.com/highstock/plotOptions.'+a}}});b(a,"indicators/tema.src.js",[a["parts/Globals.js"],a["parts/Utilities.js"],a["mixins/indicator-required.js"]],function(a,b,g){var f=b.isArray,m=a.seriesTypes.ema,h=a.correctFloat;a.seriesType("tema","ema",{},{init:function(){var a=arguments,k=
this;g.isParentLoaded(m,"ema",k.type,function(d){d.prototype.init.apply(k,a)})},getEMA:function(a,k,d,b,l,f){return m.prototype.calculateEma(f||[],a,void 0===l?1:l,this.chart.series[0].EMApercent,k,void 0===b?-1:b,d)},getTemaPoint:function(a,b,d,f){return[a[f-3],h(3*d.level1-3*d.level2+d.level3)]},getValues:function(a,b){var d=b.period,h=2*d,l=3*d,k=a.xData,n=a.yData,p=n?n.length:0,g=-1,v=[],w=[],x=[],q=[],u=[],e,r,c={};a.EMApercent=2/(d+1);if(p<3*d-2)return!1;f(n[0])&&(g=b.index?b.index:0);a=m.prototype.accumulatePeriodPoints(d,
g,n);b=a/d;a=0;for(e=d;e<p+3;e++){e<p+1&&(c.level1=this.getEMA(n,t,b,g,e)[1],q.push(c.level1));var t=c.level1;if(e<h)a+=c.level1;else{e===h&&(b=a/d,a=0);c.level1=q[e-d-1];c.level2=this.getEMA([c.level1],y,b)[1];u.push(c.level2);var y=c.level2;if(e<l)a+=c.level2;else{e===l&&(b=a/d);e===p+1&&(c.level1=q[e-d-1],c.level2=this.getEMA([c.level1],y,b)[1],u.push(c.level2));c.level1=q[e-d-2];c.level2=u[e-2*d-1];c.level3=this.getEMA([c.level2],c.prevLevel3,b)[1];if(r=this.getTemaPoint(k,l,c,e))v.push(r),w.push(r[0]),
x.push(r[1]);c.prevLevel3=c.level3}}}return{values:v,xData:w,yData:x}}})});b(a,"masters/indicators/tema.src.js",[],function(){})});
//# sourceMappingURL=tema.js.map