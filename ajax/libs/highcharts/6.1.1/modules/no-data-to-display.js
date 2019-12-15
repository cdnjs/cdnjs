/*
 Highcharts JS v6.1.1 (2018-06-27)
 Plugin for displaying a message when there is no data visible in chart.

 (c) 2010-2017 Highsoft AS
 Author: Oystein Moseng

 License: www.highcharts.com/license
*/
(function(d){"object"===typeof module&&module.exports?module.exports=d:d(Highcharts)})(function(d){(function(c){var d=c.seriesTypes,e=c.Chart.prototype,f=c.getOptions(),g=c.extend,h=c.each;g(f.lang,{noData:"No data to display"});f.noData={position:{x:0,y:0,align:"center",verticalAlign:"middle"}};f.noData.style={fontWeight:"bold",fontSize:"12px",color:"#666666"};h("bubble gauge heatmap pie sankey treemap waterfall".split(" "),function(b){d[b]&&(d[b].prototype.hasData=function(){return!!this.points.length})});
c.Series.prototype.hasData=function(){return this.visible&&void 0!==this.dataMax&&void 0!==this.dataMin};e.showNoData=function(b){var a=this.options;b=b||a&&a.lang.noData;a=a&&a.noData;!this.noDataLabel&&this.renderer&&(this.noDataLabel=this.renderer.label(b,0,0,null,null,null,a.useHTML,null,"no-data"),this.noDataLabel.attr(a.attr).css(a.style),this.noDataLabel.add(),this.noDataLabel.align(g(this.noDataLabel.getBBox(),a.position),!1,"plotBox"))};e.hideNoData=function(){this.noDataLabel&&(this.noDataLabel=
this.noDataLabel.destroy())};e.hasData=function(){for(var b=this.series||[],a=b.length;a--;)if(b[a].hasData()&&!b[a].options.isInternal)return!0;return this.loadingShown};c.addEvent(c.Chart,"render",function(){this.hasData()?this.hideNoData():this.showNoData()})})(d)});
