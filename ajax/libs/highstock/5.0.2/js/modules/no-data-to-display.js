/*
 Highcharts JS v5.0.2 (2016-10-26)
 Plugin for displaying a message when there is no data visible in chart.

 (c) 2010-2016 Highsoft AS
 Author: Oystein Moseng

 License: www.highcharts.com/license
*/
(function(d){"object"===typeof module&&module.exports?module.exports=d:d(Highcharts)})(function(d){(function(c){function d(){return!!this.points.length}function f(){this.hasData()?this.hideNoData():this.showNoData()}var g=c.seriesTypes,e=c.Chart.prototype,h=c.getOptions(),k=c.extend,l=c.each;k(h.lang,{noData:"No data to display"});h.noData={position:{x:0,y:0,align:"center",verticalAlign:"middle"}};l(["pie","gauge","waterfall","bubble","treemap"],function(a){g[a]&&(g[a].prototype.hasData=d)});c.Series.prototype.hasData=
function(){return this.visible&&void 0!==this.dataMax&&void 0!==this.dataMin};e.showNoData=function(a){var b=this.options;a=a||b.lang.noData;b=b.noData;this.noDataLabel||(this.noDataLabel=this.renderer.label(a,0,0,null,null,null,b.useHTML,null,"no-data"),this.noDataLabel.add(),this.noDataLabel.align(k(this.noDataLabel.getBBox(),b.position),!1,"plotBox"))};e.hideNoData=function(){this.noDataLabel&&(this.noDataLabel=this.noDataLabel.destroy())};e.hasData=function(){for(var a=this.series,b=a.length;b--;)if(a[b].hasData()&&
!a[b].options.isInternal)return!0;return!1};e.callbacks.push(function(a){c.addEvent(a,"load",f);c.addEvent(a,"redraw",f)})})(d)});
