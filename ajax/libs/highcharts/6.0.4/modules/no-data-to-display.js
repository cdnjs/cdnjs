/*
 Highcharts JS v6.0.4 (2017-12-15)
 Plugin for displaying a message when there is no data visible in chart.

 (c) 2010-2017 Highsoft AS
 Author: Oystein Moseng

 License: www.highcharts.com/license
*/
(function(c){"object"===typeof module&&module.exports?module.exports=c:c(Highcharts)})(function(c){(function(d){var c=d.seriesTypes,e=d.Chart.prototype,f=d.getOptions(),g=d.extend,h=d.each;g(f.lang,{noData:"No data to display"});f.noData={position:{x:0,y:0,align:"center",verticalAlign:"middle"}};f.noData.style={fontWeight:"bold",fontSize:"12px",color:"#666666"};h("bubble gauge heatmap pie sankey treemap waterfall".split(" "),function(b){c[b]&&(c[b].prototype.hasData=function(){return!!this.points.length})});
d.Series.prototype.hasData=function(){return this.visible&&void 0!==this.dataMax&&void 0!==this.dataMin};e.showNoData=function(b){var a=this.options;b=b||a.lang.noData;a=a.noData;this.noDataLabel||(this.noDataLabel=this.renderer.label(b,0,0,null,null,null,a.useHTML,null,"no-data"),this.noDataLabel.attr(a.attr).css(a.style),this.noDataLabel.add(),this.noDataLabel.align(g(this.noDataLabel.getBBox(),a.position),!1,"plotBox"))};e.hideNoData=function(){this.noDataLabel&&(this.noDataLabel=this.noDataLabel.destroy())};
e.hasData=function(){for(var b=this.series,a=b.length;a--;)if(b[a].hasData()&&!b[a].options.isInternal)return!0;return this.loadingShown};d.addEvent(e,"render",function(){this.hasData()?this.hideNoData():this.showNoData()})})(c)});
