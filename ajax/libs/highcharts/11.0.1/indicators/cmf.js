/*
 Highstock JS v11.0.1 (2023-05-08)

 (c) 2010-2021 Highsoft AS
 Author: Sebastian Domas

 License: www.highcharts.com/license
*/
'use strict';(function(a){"object"===typeof module&&module.exports?(a["default"]=a,module.exports=a):"function"===typeof define&&define.amd?define("highcharts/indicators/cmf",["highcharts","highcharts/modules/stock"],function(b){a(b);a.Highcharts=b;return a}):a("undefined"!==typeof Highcharts?Highcharts:void 0)})(function(a){function b(a,e,b,g){a.hasOwnProperty(e)||(a[e]=g.apply(null,b),"function"===typeof CustomEvent&&window.dispatchEvent(new CustomEvent("HighchartsModuleLoaded",{detail:{path:e,
module:a[e]}})))}a=a?a._modules:{};b(a,"Stock/Indicators/CMF/CMFIndicator.js",[a["Core/Series/SeriesRegistry.js"],a["Core/Utilities.js"]],function(a,e){const {sma:b}=a.seriesTypes;({merge:e}=e);class g extends b{constructor(){super(...arguments);this.yData=this.linkedParent=this.volumeSeries=this.points=this.options=this.data=void 0;this.nameBase="Chaikin Money Flow"}isValid(){var a=this.chart;const b=this.options,d=this.linkedParent;a=this.volumeSeries||(this.volumeSeries=a.get(b.params.volumeSeriesID));
const f=d&&d.yData&&4===d.yData[0].length;return!!(d&&a&&d.xData&&d.xData.length>=b.params.period&&a.xData&&a.xData.length>=b.params.period&&f)}getValues(a,b){if(this.isValid())return this.getMoneyFlow(a.xData,a.yData,this.volumeSeries.yData,b.period)}getMoneyFlow(a,b,d,f){function e(a,b){const d=a[1],e=a[2];a=a[3];return null!==b&&null!==d&&null!==e&&null!==a&&d!==e?(a-e-(d-a))/(d-e)*b:(q=c,null)}const g=b.length,k=[],n=[],p=[],r=[];let c,l,q=-1,h=0,m=0;if(0<f&&f<=g){for(c=0;c<f;c++)k[c]=e(b[c],
d[c]),h+=d[c],m+=k[c];n.push(a[c-1]);p.push(c-q>=f&&0!==h?m/h:null);for(r.push([n[0],p[0]]);c<g;c++)k[c]=e(b[c],d[c]),h-=d[c-f],h+=d[c],m-=k[c-f],m+=k[c],l=[a[c],c-q>=f?m/h:null],n.push(l[0]),p.push(l[1]),r.push([l[0],l[1]])}return{values:r,xData:n,yData:p}}}g.defaultOptions=e(b.defaultOptions,{params:{index:void 0,volumeSeriesID:"volume"}});a.registerSeriesType("cmf",g);"";return g});b(a,"masters/indicators/cmf.src.js",[],function(){})});
//# sourceMappingURL=cmf.js.map