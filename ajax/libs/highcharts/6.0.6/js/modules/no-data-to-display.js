/*
 Highcharts JS v6.0.6 (2018-02-05)
 Plugin for displaying a message when there is no data visible in chart.

 (c) 2010-2017 Highsoft AS
 Author: Oystein Moseng

 License: www.highcharts.com/license
*/
(function(c){"object"===typeof module&&module.exports?module.exports=c:c(Highcharts)})(function(c){(function(d){var c=d.seriesTypes,e=d.Chart.prototype,f=d.getOptions(),g=d.extend,h=d.each;g(f.lang,{noData:"No data to display"});f.noData={position:{x:0,y:0,align:"center",verticalAlign:"middle"}};h("bubble gauge heatmap pie sankey treemap waterfall".split(" "),function(a){c[a]&&(c[a].prototype.hasData=function(){return!!this.points.length})});d.Series.prototype.hasData=function(){return this.visible&&
void 0!==this.dataMax&&void 0!==this.dataMin};e.showNoData=function(a){var b=this.options;a=a||b.lang.noData;b=b.noData;this.noDataLabel||(this.noDataLabel=this.renderer.label(a,0,0,null,null,null,b.useHTML,null,"no-data"),this.noDataLabel.add(),this.noDataLabel.align(g(this.noDataLabel.getBBox(),b.position),!1,"plotBox"))};e.hideNoData=function(){this.noDataLabel&&(this.noDataLabel=this.noDataLabel.destroy())};e.hasData=function(){for(var a=this.series,b=a.length;b--;)if(a[b].hasData()&&!a[b].options.isInternal)return!0;
return this.loadingShown};d.addEvent(e,"render",function(){this.hasData()?this.hideNoData():this.showNoData()})})(c)});
