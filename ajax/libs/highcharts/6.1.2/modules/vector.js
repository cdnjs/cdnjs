/*
  Highcharts JS v6.1.2 (2018-08-31)
 Vector plot series module

 (c) 2010-2017 Torstein Honsi

 License: www.highcharts.com/license
*/
(function(d){"object"===typeof module&&module.exports?module.exports=d:"function"===typeof define&&define.amd?define(function(){return d}):d(Highcharts)})(function(d){(function(c){var d=c.each,e=c.seriesType;e("vector","scatter",{lineWidth:2,marker:null,rotationOrigin:"center",states:{hover:{lineWidthPlus:1}},tooltip:{pointFormat:"\x3cb\x3e[{point.x}, {point.y}]\x3c/b\x3e\x3cbr/\x3eLength: \x3cb\x3e{point.length}\x3c/b\x3e\x3cbr/\x3eDirection: \x3cb\x3e{point.direction}\u00b0\x3c/b\x3e\x3cbr/\x3e"},
vectorLength:20},{pointArrayMap:["y","length","direction"],parallelArrays:["x","y","length","direction"],pointAttribs:function(a,b){var c=this.options;a=a.color||this.color;var d=this.options.lineWidth;b&&(a=c.states[b].color||a,d=(c.states[b].lineWidth||d)+(c.states[b].lineWidthPlus||0));return{stroke:a,"stroke-width":d}},markerAttribs:c.noop,getSymbol:c.noop,arrow:function(a){a=a.length/this.lengthMax*this.options.vectorLength/20;var b={start:10*a,center:0,end:-10*a}[this.options.rotationOrigin]||
0;return["M",0,7*a+b,"L",-1.5*a,7*a+b,0,10*a+b,1.5*a,7*a+b,0,7*a+b,0,-10*a+b]},translate:function(){c.Series.prototype.translate.call(this);this.lengthMax=c.arrayMax(this.lengthData)},drawPoints:function(){var a=this.chart;d(this.points,function(b){var c=b.plotX,d=b.plotY;a.isInsidePlot(c,d,a.inverted)?(b.graphic||(b.graphic=this.chart.renderer.path().add(this.markerGroup)),b.graphic.attr({d:this.arrow(b),translateX:c,translateY:d,rotation:b.direction}).attr(this.pointAttribs(b))):b.graphic&&(b.graphic=
b.graphic.destroy())},this)},drawGraph:c.noop,animate:function(a){a?this.markerGroup.attr({opacity:.01}):(this.markerGroup.animate({opacity:1},c.animObject(this.options.animation)),this.animate=null)}})})(d)});
