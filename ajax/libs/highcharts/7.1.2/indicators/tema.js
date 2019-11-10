/*
  Highcharts JS v7.1.2 (2019-06-03)

 Indicator series type for Highstock

 (c) 2010-2019 Rafal Sebestjanski

 License: www.highcharts.com/license
*/
(function(a){"object"===typeof module&&module.exports?(a["default"]=a,module.exports=a):"function"===typeof define&&define.amd?define("highcharts/indicators/tema",["highcharts","highcharts/modules/stock"],function(b){a(b);a.Highcharts=b;return a}):a("undefined"!==typeof Highcharts?Highcharts:void 0)})(function(a){function b(a,b,r,f){a.hasOwnProperty(b)||(a[b]=f.apply(null,r))}a=a?a._modules:{};b(a,"mixins/indicator-required.js",[a["parts/Globals.js"]],function(a){var b=a.error;return{isParentLoaded:function(a,
f,h,l,g){if(a)return l?l(a):!0;b(g||this.generateMessage(h,f));return!1},generateMessage:function(a,b){return'Error: "'+a+'" indicator type requires "'+b+'" indicator loaded before. Please read docs: https://api.highcharts.com/highstock/plotOptions.'+a}}});b(a,"indicators/tema.src.js",[a["parts/Globals.js"],a["mixins/indicator-required.js"]],function(a,b){var r=a.isArray,f=a.seriesTypes.ema,h=a.correctFloat;a.seriesType("tema","ema",{},{init:function(){var a=arguments,g=this;b.isParentLoaded(f,"ema",
g.type,function(d){d.prototype.init.apply(g,a)})},getEMA:function(a,g,d,b,k,h){return f.prototype.calculateEma(h||[],a,void 0===k?1:k,this.chart.series[0].EMApercent,g,void 0===b?-1:b,d)},getPoint:function(a,b,d,f){return[a[f-3],h(3*d.level1-3*d.level2+d.level3)]},getValues:function(a,b){var d=b.period,g=2*d,k=3*d,h=a.xData,m=a.yData,n=m?m.length:0,t=-1,l=[],w=[],x=[],y,u,p=[],v=[],e,q,c={};a.EMApercent=2/(d+1);if(n<3*d-2)return!1;r(m[0])&&(t=b.index?b.index:0);a=f.prototype.accumulatePeriodPoints(d,
t,m);b=a/d;a=0;for(e=d;e<n+3;e++)if(e<n+1&&(c.level1=this.getEMA(m,y,b,t,e)[1],p.push(c.level1)),y=c.level1,e<g)a+=c.level1;else if(e===g&&(b=a/d,a=0),c.level1=p[e-d-1],c.level2=this.getEMA([c.level1],u,b)[1],v.push(c.level2),u=c.level2,e<k)a+=c.level2;else{e===k&&(b=a/d);e===n+1&&(c.level1=p[e-d-1],c.level2=this.getEMA([c.level1],u,b)[1],v.push(c.level2));c.level1=p[e-d-2];c.level2=v[e-2*d-1];c.level3=this.getEMA([c.level2],c.prevLevel3,b)[1];if(q=this.getPoint(h,k,c,e))l.push(q),w.push(q[0]),x.push(q[1]);
c.prevLevel3=c.level3}return{values:l,xData:w,yData:x}}})});b(a,"masters/indicators/tema.src.js",[],function(){})});
//# sourceMappingURL=tema.js.map