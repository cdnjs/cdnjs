/*
 Highstock JS v11.0.1 (2023-05-08)

 Indicator series type for Highcharts Stock

 (c) 2010-2021 Rafal Sebestjanski

 License: www.highcharts.com/license
*/
'use strict';(function(a){"object"===typeof module&&module.exports?(a["default"]=a,module.exports=a):"function"===typeof define&&define.amd?define("highcharts/indicators/tema",["highcharts","highcharts/modules/stock"],function(b){a(b);a.Highcharts=b;return a}):a("undefined"!==typeof Highcharts?Highcharts:void 0)})(function(a){function b(a,f,b,g){a.hasOwnProperty(f)||(a[f]=g.apply(null,b),"function"===typeof CustomEvent&&window.dispatchEvent(new CustomEvent("HighchartsModuleLoaded",{detail:{path:f,
module:a[f]}})))}a=a?a._modules:{};b(a,"Stock/Indicators/TEMA/TEMAIndicator.js",[a["Core/Series/SeriesRegistry.js"],a["Core/Utilities.js"]],function(a,b){const {ema:f}=a.seriesTypes,{correctFloat:g,isArray:x,merge:y}=b;class k extends f{constructor(){super(...arguments);this.points=this.options=this.data=this.EMApercent=void 0}getEMA(a,l,d,b,f,g){return super.calculateEma(g||[],a,"undefined"===typeof f?1:f,this.EMApercent,l,"undefined"===typeof b?-1:b,d)}getTemaPoint(a,l,d,b){return[a[b-3],g(3*d.level1-
3*d.level2+d.level3)]}getValues(a,b){const d=b.period,f=2*d,g=3*d,k=a.xData,m=(a=a.yData)?a.length:0,l=[],u=[],v=[],n=[],q=[],c={};let r=-1,h,w,t,e,p;this.EMApercent=2/(d+1);if(!(m<3*d-2)){x(a[0])&&(r=b.index?b.index:0);b=super.accumulatePeriodPoints(d,r,a);h=b/d;b=0;for(e=d;e<m+3;e++)if(e<m+1&&(c.level1=this.getEMA(a,w,h,r,e)[1],n.push(c.level1)),w=c.level1,e<f)b+=c.level1;else if(e===f&&(h=b/d,b=0),c.level1=n[e-d-1],c.level2=this.getEMA([c.level1],t,h)[1],q.push(c.level2),t=c.level2,e<g)b+=c.level2;
else{e===g&&(h=b/d);e===m+1&&(c.level1=n[e-d-1],c.level2=this.getEMA([c.level1],t,h)[1],q.push(c.level2));c.level1=n[e-d-2];c.level2=q[e-2*d-1];c.level3=this.getEMA([c.level2],c.prevLevel3,h)[1];if(p=this.getTemaPoint(k,g,c,e))l.push(p),u.push(p[0]),v.push(p[1]);c.prevLevel3=c.level3}return{values:l,xData:u,yData:v}}}}k.defaultOptions=y(f.defaultOptions);a.registerSeriesType("tema",k);"";return k});b(a,"masters/indicators/tema.src.js",[],function(){})});
//# sourceMappingURL=tema.js.map