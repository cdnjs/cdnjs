/*
 Highstock JS v7.1.3 (2019-08-14)

 (c) 2010-2019 Highsoft AS
 Author: Sebastian Domas

 License: www.highcharts.com/license
*/
(function(a){"object"===typeof module&&module.exports?(a["default"]=a,module.exports=a):"function"===typeof define&&define.amd?define("highcharts/indicators/cmf",["highcharts","highcharts/modules/stock"],function(f){a(f);a.Highcharts=f;return a}):a("undefined"!==typeof Highcharts?Highcharts:void 0)})(function(a){function f(a,h,d,c){a.hasOwnProperty(h)||(a[h]=c.apply(null,d))}a=a?a._modules:{};f(a,"indicators/cmf.src.js",[a["parts/Globals.js"]],function(a){a.seriesType("cmf","sma",{params:{period:14,
volumeSeriesID:"volume"}},{nameBase:"Chaikin Money Flow",isValid:function(){var a=this.chart,d=this.options,c=this.linkedParent;a=this.volumeSeries||(this.volumeSeries=a.get(d.params.volumeSeriesID));var e=c&&c.yData&&4===c.yData[0].length;return!!(c&&a&&c.xData&&c.xData.length>=d.params.period&&a.xData&&a.xData.length>=d.params.period&&e)},getValues:function(a,d){return this.isValid()?this.getMoneyFlow(a.xData,a.yData,this.volumeSeries.yData,d.period):!1},getMoneyFlow:function(a,d,c,e){function f(a,
c){var d=a[1],e=a[2];a=a[3];return null!==c&&null!==d&&null!==e&&null!==a&&d!==e?(a-e-(d-a))/(d-e)*c:(q=b,null)}var h=d.length,k=[],g=0,l=0,m=[],n=[],r=[],b,q=-1;if(0<e&&e<=h){for(b=0;b<e;b++)k[b]=f(d[b],c[b]),g+=c[b],l+=k[b];m.push(a[b-1]);n.push(b-q>=e&&0!==g?l/g:null);for(r.push([m[0],n[0]]);b<h;b++){k[b]=f(d[b],c[b]);g-=c[b-e];g+=c[b];l-=k[b-e];l+=k[b];var p=[a[b],b-q>=e?l/g:null];m.push(p[0]);n.push(p[1]);r.push([p[0],p[1]])}}return{values:r,xData:m,yData:n}}})});f(a,"masters/indicators/cmf.src.js",
[],function(){})});
//# sourceMappingURL=cmf.js.map