/*
  Highcharts JS v7.0.3 (2019-02-06)

 (c) 2010-2019 Highsoft AS
 Author: Sebastian Domas

 License: www.highcharts.com/license
*/
(function(a){"object"===typeof module&&module.exports?(a["default"]=a,module.exports=a):"function"===typeof define&&define.amd?define(function(){return a}):a("undefined"!==typeof Highcharts?Highcharts:void 0)})(function(a){(function(a){a.seriesType("cmf","sma",{params:{period:14,volumeSeriesID:"volume"}},{nameBase:"Chaikin Money Flow",isValid:function(){var e=this.chart,a=this.options,c=this.linkedParent,e=this.volumeSeries||(this.volumeSeries=e.get(a.params.volumeSeriesID)),d=c&&c.yData&&4===c.yData[0].length;
return!!(c&&e&&c.xData&&c.xData.length>=a.params.period&&e.xData&&e.xData.length>=a.params.period&&d)},getValues:function(a,g){return this.isValid()?this.getMoneyFlow(a.xData,a.yData,this.volumeSeries.yData,g.period):!1},getMoneyFlow:function(a,g,c,d){function e(a,c){var d=a[1],e=a[2];a=a[3];return null!==c&&null!==d&&null!==e&&null!==a&&d!==e?(a-e-(d-a))/(d-e)*c:(p=b,null)}var r=g.length,h=[],f=0,k=0,m=[],n=[],q=[],b,l,p=-1;if(0<d&&d<=r){for(b=0;b<d;b++)h[b]=e(g[b],c[b]),f+=c[b],k+=h[b];m.push(a[b-
1]);n.push(b-p>=d&&0!==f?k/f:null);for(q.push([m[0],n[0]]);b<r;b++)h[b]=e(g[b],c[b]),f-=c[b-d],f+=c[b],k-=h[b-d],k+=h[b],l=[a[b],b-p>=d?k/f:null],m.push(l[0]),n.push(l[1]),q.push([l[0],l[1]])}return{values:q,xData:m,yData:n}}})})(a)});
//# sourceMappingURL=cmf.js.map