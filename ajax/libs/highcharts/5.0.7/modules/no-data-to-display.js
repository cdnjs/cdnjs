/*
 Highcharts JS v5.0.7 (2017-01-17)
 Plugin for displaying a message when there is no data visible in chart.

 (c) 2010-2016 Highsoft AS
 Author: Oystein Moseng

 License: www.highcharts.com/license
*/
(function(d){"object"===typeof module&&module.exports?module.exports=d:d(Highcharts)})(function(d){(function(c){function d(){return!!this.points.length}function g(){this.hasData()?this.hideNoData():this.showNoData()}var h=c.seriesTypes,e=c.Chart.prototype,f=c.getOptions(),k=c.extend,l=c.each;k(f.lang,{noData:"No data to display"});f.noData={position:{x:0,y:0,align:"center",verticalAlign:"middle"}};f.noData.style={fontWeight:"bold",fontSize:"12px",color:"#666666"};l(["pie","gauge","waterfall","bubble",
"treemap"],function(a){h[a]&&(h[a].prototype.hasData=d)});c.Series.prototype.hasData=function(){return this.visible&&void 0!==this.dataMax&&void 0!==this.dataMin};e.showNoData=function(a){var b=this.options;a=a||b.lang.noData;b=b.noData;this.noDataLabel||(this.noDataLabel=this.renderer.label(a,0,0,null,null,null,b.useHTML,null,"no-data"),this.noDataLabel.attr(b.attr).css(b.style),this.noDataLabel.add(),this.noDataLabel.align(k(this.noDataLabel.getBBox(),b.position),!1,"plotBox"))};e.hideNoData=function(){this.noDataLabel&&
(this.noDataLabel=this.noDataLabel.destroy())};e.hasData=function(){for(var a=this.series,b=a.length;b--;)if(a[b].hasData()&&!a[b].options.isInternal)return!0;return!1};e.callbacks.push(function(a){c.addEvent(a,"load",g);c.addEvent(a,"redraw",g)})})(d)});
