/*
  Highcharts JS v6.0.1 (2017-10-05)
 Vector plot series module

 (c) 2010-2017 Torstein Honsi

 License: www.highcharts.com/license
*/
(function(d){"object"===typeof module&&module.exports?module.exports=d:d(Highcharts)})(function(d){(function(b){var d=b.each,e=b.seriesType;e("vector","scatter",{lineWidth:2,marker:null,rotationOrigin:"center",states:{hover:{lineWidthPlus:1}},tooltip:{pointFormat:"\x3cb\x3e[{point.x}, {point.y}]\x3c/b\x3e\x3cbr/\x3eLength: \x3cb\x3e{point.length}\x3c/b\x3e\x3cbr/\x3eDirection: \x3cb\x3e{point.direction}\u00b0\x3c/b\x3e\x3cbr/\x3e"},vectorLength:20},{pointArrayMap:["y","length","direction"],parallelArrays:["x",
"y","length","direction"],pointAttribs:function(a,c){a=this.options;var b=this.color,d=this.options.lineWidth;c&&(b=a.states[c].color||b,d=(a.states[c].lineWidth||d)+(a.states[c].lineWidthPlus||0));return{stroke:b,"stroke-width":d}},markerAttribs:b.noop,getSymbol:b.noop,arrow:function(a){var c={start:10,center:0,end:-10}[this.options.rotationOrigin]||0;a=a.length/this.lengthMax*this.options.vectorLength/20;return["M",0,7*a+c,"L",-1.5*a,7*a+c,0,10*a+c,1.5*a,7*a+c,0,7*a+c,0,-10*a+c]},translate:function(){b.Series.prototype.translate.call(this);
this.lengthMax=b.arrayMax(this.lengthData)},drawPoints:function(){d(this.points,function(a){var c=a.plotX,b=a.plotY;a.graphic||(a.graphic=this.chart.renderer.path().add(this.markerGroup));a.graphic.attr({d:this.arrow(a),translateX:c,translateY:b,rotation:a.direction}).attr(this.pointAttribs(a))},this)},drawGraph:b.noop,animate:function(a){a?this.markerGroup.attr({opacity:.01}):(this.markerGroup.animate({opacity:1},b.animObject(this.options.animation)),this.animate=null)}})})(d)});
