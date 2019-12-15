/*
  Highcharts JS v6.1.0 (2018-04-13)

 (c) 2010-2017 Highsoft AS
 Author: Sebastian Domas

 License: www.highcharts.com/license
*/
(function(c){"object"===typeof module&&module.exports?module.exports=c:c(Highcharts)})(function(c){(function(c){c.seriesType("cmf","sma",{params:{period:14,volumeSeriesID:"volume"}},{nameBase:"Chaikin Money Flow",isValid:function(){var d=this.chart,e=this.options,b=this.linkedParent,d=this.volumeSeries||(this.volumeSeries=d.get(e.params.volumeSeriesID)),f=b&&b.yData&&4===b.yData[0].length;return!!(b&&d&&b.xData&&b.xData.length>=e.params.period&&d.xData&&d.xData.length>=e.params.period&&f)},getValues:function(d,
e){return this.isValid()?this.getMoneyFlow(d.xData,d.yData,this.volumeSeries.yData,e.period):!1},getMoneyFlow:function(d,e,b,f){function c(b,d){var c=b[1],e=b[2];b=b[3];return null!==d&&null!==c&&null!==e&&null!==b&&c!==e?(b-e-(c-b))/(c-e)*d:(p=a,null)}var r=e.length,h=[],g=0,k=0,m=[],n=[],q=[],a,l,p=-1;if(0<f&&f<=r){for(a=0;a<f;a++)h[a]=c(e[a],b[a]),g+=b[a],k+=h[a];m.push(d[a-1]);n.push(a-p>=f&&0!==g?k/g:null);for(q.push([m[0],n[0]]);a<r;a++)h[a]=c(e[a],b[a]),g-=b[a-f],g+=b[a],k-=h[a-f],k+=h[a],
l=[d[a],a-p>=f?k/g:null],m.push(l[0]),n.push(l[1]),q.push([l[0],l[1]])}return{values:q,xData:m,yData:n}}})})(c)});
