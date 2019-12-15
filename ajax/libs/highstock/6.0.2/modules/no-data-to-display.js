/*
 Highcharts JS v6.0.2 (2017-10-20)
 Plugin for displaying a message when there is no data visible in chart.

 (c) 2010-2017 Highsoft AS
 Author: Oystein Moseng

 License: www.highcharts.com/license
*/
(function(d){"object"===typeof module&&module.exports?module.exports=d:d(Highcharts)})(function(d){(function(c){function d(){this.hasData()?this.hideNoData():this.showNoData()}var g=c.seriesTypes,e=c.Chart.prototype,f=c.getOptions(),h=c.extend,k=c.each;h(f.lang,{noData:"No data to display"});f.noData={position:{x:0,y:0,align:"center",verticalAlign:"middle"}};f.noData.style={fontWeight:"bold",fontSize:"12px",color:"#666666"};k("bubble gauge heatmap pie treemap waterfall".split(" "),function(a){g[a]&&
(g[a].prototype.hasData=function(){return!!this.points.length})});c.Series.prototype.hasData=function(){return this.visible&&void 0!==this.dataMax&&void 0!==this.dataMin};e.showNoData=function(a){var b=this.options;a=a||b.lang.noData;b=b.noData;this.noDataLabel||(this.noDataLabel=this.renderer.label(a,0,0,null,null,null,b.useHTML,null,"no-data"),this.noDataLabel.attr(b.attr).css(b.style),this.noDataLabel.add(),this.noDataLabel.align(h(this.noDataLabel.getBBox(),b.position),!1,"plotBox"))};e.hideNoData=
function(){this.noDataLabel&&(this.noDataLabel=this.noDataLabel.destroy())};e.hasData=function(){for(var a=this.series,b=a.length;b--;)if(a[b].hasData()&&!a[b].options.isInternal)return!0;return this.loadingShown};e.callbacks.push(function(a){c.addEvent(a,"load",d);c.addEvent(a,"redraw",d)})})(d)});
