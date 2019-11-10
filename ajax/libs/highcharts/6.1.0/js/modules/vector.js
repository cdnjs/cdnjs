/*
  Highcharts JS v6.1.0 (2018-04-13)
 Vector plot series module

 (c) 2010-2017 Torstein Honsi

 License: www.highcharts.com/license
*/
(function(d){"object"===typeof module&&module.exports?module.exports=d:d(Highcharts)})(function(d){(function(c){var d=c.each,e=c.seriesType;e("vector","scatter",{lineWidth:2,marker:null,rotationOrigin:"center",states:{hover:{lineWidthPlus:1}},tooltip:{pointFormat:"\x3cb\x3e[{point.x}, {point.y}]\x3c/b\x3e\x3cbr/\x3eLength: \x3cb\x3e{point.length}\x3c/b\x3e\x3cbr/\x3eDirection: \x3cb\x3e{point.direction}\u00b0\x3c/b\x3e\x3cbr/\x3e"},vectorLength:20},{pointArrayMap:["y","length","direction"],parallelArrays:["x",
"y","length","direction"],pointAttribs:function(b,a){var c=this.options;b=b.color||this.color;var d=this.options.lineWidth;a&&(b=c.states[a].color||b,d=(c.states[a].lineWidth||d)+(c.states[a].lineWidthPlus||0));return{stroke:b,"stroke-width":d}},markerAttribs:c.noop,getSymbol:c.noop,arrow:function(b){var a={start:10,center:0,end:-10}[this.options.rotationOrigin]||0;b=b.length/this.lengthMax*this.options.vectorLength/20;return["M",0,7*b+a,"L",-1.5*b,7*b+a,0,10*b+a,1.5*b,7*b+a,0,7*b+a,0,-10*b+a]},translate:function(){c.Series.prototype.translate.call(this);
this.lengthMax=c.arrayMax(this.lengthData)},drawPoints:function(){var b=this.chart;d(this.points,function(a){var c=a.plotX,d=a.plotY;b.isInsidePlot(c,d,b.inverted)?(a.graphic||(a.graphic=this.chart.renderer.path().add(this.markerGroup)),a.graphic.attr({d:this.arrow(a),translateX:c,translateY:d,rotation:a.direction}).attr(this.pointAttribs(a))):a.graphic&&(a.graphic=a.graphic.destroy())},this)},drawGraph:c.noop,animate:function(b){b?this.markerGroup.attr({opacity:.01}):(this.markerGroup.animate({opacity:1},
c.animObject(this.options.animation)),this.animate=null)}})})(d)});
