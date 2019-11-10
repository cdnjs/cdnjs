/*
  Highcharts JS v7.0.3 (2019-02-06)

 Indicator series type for Highstock

 (c) 2010-2019 Rafal Sebestjanski

 License: www.highcharts.com/license
*/
(function(a){"object"===typeof module&&module.exports?(a["default"]=a,module.exports=a):"function"===typeof define&&define.amd?define(function(){return a}):a("undefined"!==typeof Highcharts?Highcharts:void 0)})(function(a){var g=function(a){var k=a.error;return{isParentLoaded:function(a,f,l,m,d){if(a)return m?m(a):!0;k(d||this.generateMessage(l,f));return!1},generateMessage:function(a,f){return'Error: "'+a+'" indicator type requires "'+f+'" indicator loaded before. Please read docs: https://api.highcharts.com/highstock/plotOptions.'+
a}}}(a);(function(a,g){var k=a.isArray,f=a.seriesTypes.ema,l=a.correctFloat;a.seriesType("tema","ema",{},{init:function(){var a=arguments,d=this;g.isParentLoaded(f,"ema",d.type,function(c){c.prototype.init.apply(d,a)})},getEMA:function(a,d,c,n,h,k){return f.prototype.calculateEma(k||[],a,void 0===h?1:h,this.chart.series[0].EMApercent,d,void 0===n?-1:n,c)},getPoint:function(a,d,c,f){return[a[f-3],l(3*c.level1-3*c.level2+c.level3)]},getValues:function(a,d){var c=d.period,n=2*c,h=3*c,l=a.xData,p=a.yData,
q=p?p.length:0,g=-1,m=[],w=[],x=[],y,u,r=[],v=[],e,t,b={};a.EMApercent=2/(c+1);if(q<3*c-2)return!1;k(p[0])&&(g=d.index?d.index:0);a=f.prototype.accumulatePeriodPoints(c,g,p);d=a/c;a=0;for(e=c;e<q+3;e++)if(e<q+1&&(b.level1=this.getEMA(p,y,d,g,e)[1],r.push(b.level1)),y=b.level1,e<n)a+=b.level1;else if(e===n&&(d=a/c,a=0),b.level1=r[e-c-1],b.level2=this.getEMA([b.level1],u,d)[1],v.push(b.level2),u=b.level2,e<h)a+=b.level2;else{e===h&&(d=a/c);e===q+1&&(b.level1=r[e-c-1],b.level2=this.getEMA([b.level1],
u,d)[1],v.push(b.level2));b.level1=r[e-c-2];b.level2=v[e-2*c-1];b.level3=this.getEMA([b.level2],b.prevLevel3,d)[1];if(t=this.getPoint(l,h,b,e))m.push(t),w.push(t[0]),x.push(t[1]);b.prevLevel3=b.level3}return{values:m,xData:w,yData:x}}})})(a,g)});
//# sourceMappingURL=tema.js.map