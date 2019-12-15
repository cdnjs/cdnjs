/*
  Highcharts JS v7.0.1 (2018-12-19)

 Indicator series type for Highstock

 (c) 2010-2018 Rafal Sebestjanski

 License: www.highcharts.com/license
*/
(function(a){"object"===typeof module&&module.exports?module.exports=a:"function"===typeof define&&define.amd?define(function(){return a}):a("undefined"!==typeof Highcharts?Highcharts:void 0)})(function(a){var k=function(a){var m=a.error;return{isParentLoaded:function(a,f,g,h,d){if(a)return h?h(a):!0;m(d||this.generateMessage(g,f));return!1},generateMessage:function(a,f){return'Error: "'+a+'" indicator type requires "'+f+'" indicator loaded before. Please read docs: https://api.highcharts.com/highstock/plotOptions.'+
a}}}(a);(function(a,k){var m=a.isArray,f=a.seriesTypes.ema,g=a.correctFloat;a.seriesType("tema","ema",{},{init:function(){var h=arguments,a=this;k.isParentLoaded(f,"ema",a.type,function(c){c.prototype.init.apply(a,h)})},getEMA:function(a,d,c,n,l,m){return f.prototype.calculateEma(m||[],a,void 0===l?1:l,this.chart.series[0].EMApercent,d,void 0===n?-1:n,c)},getPoint:function(a,d,c,f){return[a[f-3],g(3*c.level1-3*c.level2+c.level3)]},getValues:function(a,d){var c=d.period,n=2*c,l=3*c,h=a.xData,p=a.yData,
q=p?p.length:0,g=-1,k=[],w=[],x=[],y,u,r=[],v=[],e,t,b={};a.EMApercent=2/(c+1);if(q<3*c-2)return!1;m(p[0])&&(g=d.index?d.index:0);a=f.prototype.accumulatePeriodPoints(c,g,p);d=a/c;a=0;for(e=c;e<q+3;e++)if(e<q+1&&(b.level1=this.getEMA(p,y,d,g,e)[1],r.push(b.level1)),y=b.level1,e<n)a+=b.level1;else if(e===n&&(d=a/c,a=0),b.level1=r[e-c-1],b.level2=this.getEMA([b.level1],u,d)[1],v.push(b.level2),u=b.level2,e<l)a+=b.level2;else{e===l&&(d=a/c);e===q+1&&(b.level1=r[e-c-1],b.level2=this.getEMA([b.level1],
u,d)[1],v.push(b.level2));b.level1=r[e-c-2];b.level2=v[e-2*c-1];b.level3=this.getEMA([b.level2],b.prevLevel3,d)[1];if(t=this.getPoint(h,l,b,e))k.push(t),w.push(t[0]),x.push(t[1]);b.prevLevel3=b.level3}return{values:k,xData:w,yData:x}}})})(a,k)});
//# sourceMappingURL=tema.js.map