/*
 Highcharts JS v9.0.0 (2021-02-02)

 Plugin for displaying a message when there is no data visible in chart.

 (c) 2010-2019 Highsoft AS
 Author: Oystein Moseng

 License: www.highcharts.com/license
*/
(function(a){"object"===typeof module&&module.exports?(a["default"]=a,module.exports=a):"function"===typeof define&&define.amd?define("highcharts/modules/no-data-to-display",["highcharts"],function(b){a(b);a.Highcharts=b;return a}):a("undefined"!==typeof Highcharts?Highcharts:void 0)})(function(a){function b(a,b,f,c){a.hasOwnProperty(b)||(a[b]=c.apply(null,f))}a=a?a._modules:{};b(a,"Extensions/NoDataToDisplay.js",[a["Core/Renderer/HTML/AST.js"],a["Core/Chart/Chart.js"],a["Core/Color/Palette.js"],
a["Core/Utilities.js"]],function(a,b,f,c){var h=c.addEvent,g=c.extend,e=c.getOptions;c=b.prototype;e=e();g(e.lang,{noData:"No data to display"});e.noData={attr:{zIndex:1},position:{x:0,y:0,align:"center",verticalAlign:"middle"},style:{fontWeight:"bold",fontSize:"12px",color:f.neutralColor60}};c.showNoData=function(b){var d=this.options;b=b||d&&d.lang.noData;d=d&&(d.noData||{});this.renderer&&(this.noDataLabel||(this.noDataLabel=this.renderer.label(b,0,0,void 0,void 0,void 0,d.useHTML,void 0,"no-data").add()),
this.styledMode||this.noDataLabel.attr(a.filterUserAttributes(d.attr||{})).css(d.style||{}),this.noDataLabel.align(g(this.noDataLabel.getBBox(),d.position||{}),!1,"plotBox"))};c.hideNoData=function(){this.noDataLabel&&(this.noDataLabel=this.noDataLabel.destroy())};c.hasData=function(){for(var a=this.series||[],b=a.length;b--;)if(a[b].hasData()&&!a[b].options.isInternal)return!0;return this.loadingShown};h(b,"render",function(){this.hasData()?this.hideNoData():this.showNoData()})});b(a,"masters/modules/no-data-to-display.src.js",
[],function(){})});
//# sourceMappingURL=no-data-to-display.js.map