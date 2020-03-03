/*
 Highstock JS v8.0.1 (2020-03-02)

 Indicator series type for Highstock

 (c) 2010-2019 Rafal Sebestjanski

 License: www.highcharts.com/license
*/
(function(a){"object"===typeof module&&module.exports?(a["default"]=a,module.exports=a):"function"===typeof define&&define.amd?define("highcharts/indicators/tema",["highcharts","highcharts/modules/stock"],function(e){a(e);a.Highcharts=e;return a}):a("undefined"!==typeof Highcharts?Highcharts:void 0)})(function(a){function e(a,b,q,g){a.hasOwnProperty(b)||(a[b]=g.apply(null,q))}a=a?a._modules:{};e(a,"mixins/indicator-required.js",[a["parts/Utilities.js"]],function(a){var b=a.error;return{isParentLoaded:function(a,
g,e,k,r){if(a)return k?k(a):!0;b(r||this.generateMessage(e,g));return!1},generateMessage:function(a,b){return'Error: "'+a+'" indicator type requires "'+b+'" indicator loaded before. Please read docs: https://api.highcharts.com/highstock/plotOptions.'+a}}});e(a,"indicators/tema.src.js",[a["parts/Globals.js"],a["parts/Utilities.js"],a["mixins/indicator-required.js"]],function(a,b,e){var g=b.correctFloat,q=b.isArray;b=b.seriesType;var k=a.seriesTypes.ema;b("tema","ema",{},{init:function(){var a=arguments,
h=this;e.isParentLoaded(k,"ema",h.type,function(d){d.prototype.init.apply(h,a)})},getEMA:function(a,h,d,b,e,g){return k.prototype.calculateEma(g||[],a,"undefined"===typeof e?1:e,this.chart.series[0].EMApercent,h,"undefined"===typeof b?-1:b,d)},getTemaPoint:function(a,h,d,b){return[a[b-3],g(3*d.level1-3*d.level2+d.level3)]},getValues:function(a,b){var d=b.period,e=2*d,g=3*d,h=a.xData,l=a.yData,m=l?l.length:0,t=-1,v=[],w=[],x=[],n=[],u=[],f,p,c={};a.EMApercent=2/(d+1);if(!(m<3*d-2)){q(l[0])&&(t=b.index?
b.index:0);a=k.prototype.accumulatePeriodPoints(d,t,l);b=a/d;a=0;for(f=d;f<m+3;f++){f<m+1&&(c.level1=this.getEMA(l,r,b,t,f)[1],n.push(c.level1));var r=c.level1;if(f<e)a+=c.level1;else{f===e&&(b=a/d,a=0);c.level1=n[f-d-1];c.level2=this.getEMA([c.level1],y,b)[1];u.push(c.level2);var y=c.level2;if(f<g)a+=c.level2;else{f===g&&(b=a/d);f===m+1&&(c.level1=n[f-d-1],c.level2=this.getEMA([c.level1],y,b)[1],u.push(c.level2));c.level1=n[f-d-2];c.level2=u[f-2*d-1];c.level3=this.getEMA([c.level2],c.prevLevel3,
b)[1];if(p=this.getTemaPoint(h,g,c,f))v.push(p),w.push(p[0]),x.push(p[1]);c.prevLevel3=c.level3}}}return{values:v,xData:w,yData:x}}}});""});e(a,"masters/indicators/tema.src.js",[],function(){})});
//# sourceMappingURL=tema.js.map