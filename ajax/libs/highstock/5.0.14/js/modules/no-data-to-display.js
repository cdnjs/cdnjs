/*
 Highcharts JS v5.0.14 (2017-07-28)
 Plugin for displaying a message when there is no data visible in chart.

 (c) 2010-2017 Highsoft AS
 Author: Oystein Moseng

 License: www.highcharts.com/license
*/
(function(d){"object"===typeof module&&module.exports?module.exports=d:d(Highcharts)})(function(d){(function(c){function d(){this.hasData()?this.hideNoData():this.showNoData()}var f=c.seriesTypes,e=c.Chart.prototype,g=c.getOptions(),h=c.extend,k=c.each;h(g.lang,{noData:"No data to display"});g.noData={position:{x:0,y:0,align:"center",verticalAlign:"middle"}};k("bubble gauge heatmap pie treemap waterfall".split(" "),function(a){f[a]&&(f[a].prototype.hasData=function(){return!!this.points.length})});
c.Series.prototype.hasData=function(){return this.visible&&void 0!==this.dataMax&&void 0!==this.dataMin};e.showNoData=function(a){var b=this.options;a=a||b.lang.noData;b=b.noData;this.noDataLabel||(this.noDataLabel=this.renderer.label(a,0,0,null,null,null,b.useHTML,null,"no-data"),this.noDataLabel.add(),this.noDataLabel.align(h(this.noDataLabel.getBBox(),b.position),!1,"plotBox"))};e.hideNoData=function(){this.noDataLabel&&(this.noDataLabel=this.noDataLabel.destroy())};e.hasData=function(){for(var a=
this.series,b=a.length;b--;)if(a[b].hasData()&&!a[b].options.isInternal)return!0;return this.loadingShown};e.callbacks.push(function(a){c.addEvent(a,"load",d);c.addEvent(a,"redraw",d)})})(d)});
