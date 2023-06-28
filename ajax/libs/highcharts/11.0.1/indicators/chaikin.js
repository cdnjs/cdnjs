/*
 Highstock JS v11.0.1 (2023-05-08)

 Indicator series type for Highcharts Stock

 (c) 2010-2021 Wojciech Chmiel

 License: www.highcharts.com/license
*/
'use strict';(function(a){"object"===typeof module&&module.exports?(a["default"]=a,module.exports=a):"function"===typeof define&&define.amd?define("highcharts/indicators/chaikin",["highcharts","highcharts/modules/stock"],function(b){a(b);a.Highcharts=b;return a}):a("undefined"!==typeof Highcharts?Highcharts:void 0)})(function(a){function b(a,g,b,n){a.hasOwnProperty(g)||(a[g]=n.apply(null,b),"function"===typeof CustomEvent&&window.dispatchEvent(new CustomEvent("HighchartsModuleLoaded",{detail:{path:g,
module:a[g]}})))}a=a?a._modules:{};b(a,"Stock/Indicators/AD/ADIndicator.js",[a["Core/Series/SeriesRegistry.js"],a["Core/Utilities.js"]],function(a,g){const {sma:b}=a.seriesTypes,{error:n,extend:m,merge:p}=g;class h extends b{constructor(){super(...arguments);this.points=this.options=this.data=void 0}static populateAverage(a,e,k,c,d){d=e[c][1];const f=e[c][2];e=e[c][3];k=k[c];return[a[c],e===d&&e===f||d===f?0:(2*e-f-d)/(d-f)*k]}getValues(a,e){const k=e.period,c=a.xData,d=a.yData;var f=e.volumeSeriesID,
l=a.chart.get(f);e=l&&l.yData;const b=d?d.length:0,g=[],q=[],m=[];if(!(c.length<=k&&b&&4!==d[0].length)){if(l){for(f=k;f<b;f++)a=g.length,l=h.populateAverage(c,d,e,f,k),0<a&&(l[1]+=g[a-1][1]),g.push(l),q.push(l[0]),m.push(l[1]);return{values:g,xData:q,yData:m}}n("Series "+f+" not found! Check `volumeSeriesID`.",!0,a.chart)}}}h.defaultOptions=p(b.defaultOptions,{params:{index:void 0,volumeSeriesID:"volume"}});m(h.prototype,{nameComponents:!1,nameBase:"Accumulation/Distribution"});a.registerSeriesType("ad",
h);"";return h});b(a,"Stock/Indicators/Chaikin/ChaikinIndicator.js",[a["Stock/Indicators/AD/ADIndicator.js"],a["Core/Series/SeriesRegistry.js"],a["Core/Utilities.js"]],function(a,b,r){const {ema:g}=b.seriesTypes,{correctFloat:m,extend:p,merge:h,error:t}=r;class e extends g{constructor(){super(...arguments);this.points=this.options=this.data=void 0}getValues(b,c){var d=c.periods,f=c.period;const e=[],g=[],h=[];if(2!==d.length||d[1]<=d[0])t('Error: "Chaikin requires two periods. Notice, first period should be lower than the second one."');
else if(c=a.prototype.getValues.call(this,b,{volumeSeriesID:c.volumeSeriesID,period:f}))if(b=super.getValues.call(this,c,{period:d[0]}),c=super.getValues.call(this,c,{period:d[1]}),b&&c){var k=d[1]-d[0];for(f=0;f<c.yData.length;f++)d=m(b.yData[f+k]-c.yData[f]),e.push([c.xData[f],d]),g.push(c.xData[f]),h.push(d);return{values:e,xData:g,yData:h}}}}e.defaultOptions=h(g.defaultOptions,{params:{index:void 0,volumeSeriesID:"volume",period:9,periods:[3,10]}});p(e.prototype,{nameBase:"Chaikin Osc",nameComponents:["periods"]});
b.registerSeriesType("chaikin",e);"";return e});b(a,"masters/indicators/chaikin.src.js",[],function(){})});
//# sourceMappingURL=chaikin.js.map