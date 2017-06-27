/**
 * jqPlot
 * Pure JavaScript plotting plugin using jQuery
 *
 * Version: 1.0.2r1108
 *
 * Copyright (c) 2009-2011 Chris Leonello
 * jqPlot is currently available for use in all personal or commercial projects 
 * under both the MIT (http://www.opensource.org/licenses/mit-license.php) and GPL 
 * version 2.0 (http://www.gnu.org/licenses/gpl-2.0.html) licenses. This means that you can 
 * choose the license that best suits your project and use it accordingly. 
 *
 * Although not required, the author would appreciate an email letting him 
 * know of any substantial use of jqPlot.  You can reach the author at: 
 * chris at jqplot dot com or see http://www.jqplot.com/info.php .
 *
 * If you are feeling kind and generous, consider supporting the project by
 * making a donation at: http://www.jqplot.com/donate.php .
 *
 * sprintf functions contained in jqplot.sprintf.js by Ash Searle:
 *
 *     version 2007.04.27
 *     author Ash Searle
 *     http://hexmen.com/blog/2007/03/printf-sprintf/
 *     http://hexmen.com/js/sprintf.js
 *     The author (Ash Searle) has placed this code in the public domain:
 *     "This code is unrestricted: you are free to use it however you like."
 *
 * included jsDate library by Chris Leonello:
 *
 * Copyright (c) 2010-2011 Chris Leonello
 *
 * jsDate is currently available for use in all personal or commercial projects 
 * under both the MIT and GPL version 2.0 licenses. This means that you can 
 * choose the license that best suits your project and use it accordingly.
 *
 * jsDate borrows many concepts and ideas from the Date Instance 
 * Methods by Ken Snyder along with some parts of Ken's actual code.
 * 
 * Ken's origianl Date Instance Methods and copyright notice:
 * 
 * Ken Snyder (ken d snyder at gmail dot com)
 * 2008-09-10
 * version 2.0.2 (http://kendsnyder.com/sandbox/date/)     
 * Creative Commons Attribution License 3.0 (http://creativecommons.org/licenses/by/3.0/)
 *
 * jqplotToImage function based on Larry Siden's export-jqplot-to-png.js.
 * Larry has generously given permission to adapt his code for inclusion
 * into jqPlot.
 *
 * Larry's original code can be found here:
 *
 * https://github.com/lsiden/export-jqplot-to-png
 * 
 * 
 */
(function(d){d.jqplot.eventListenerHooks.push(["jqplotMouseMove",f]);d.jqplot.Highlighter=function(h){this.show=d.jqplot.config.enablePlugins;this.markerRenderer=new d.jqplot.MarkerRenderer({shadow:false});this.showMarker=true;this.lineWidthAdjust=2.5;this.sizeAdjust=5;this.showTooltip=true;this.tooltipLocation="nw";this.fadeTooltip=true;this.tooltipFadeSpeed="fast";this.tooltipOffset=2;this.tooltipAxes="both";this.tooltipSeparator=", ";this.tooltipContentEditor=null;this.useAxesFormatters=true;this.tooltipFormatString="%.5P";this.formatString=null;this.yvalues=1;this.bringSeriesToFront=false;this._tooltipElem;this.isHighlighting=false;this.currentNeighbor=null;d.extend(true,this,h)};var b=["nw","n","ne","e","se","s","sw","w"];var e={nw:0,n:1,ne:2,e:3,se:4,s:5,sw:6,w:7};var c=["se","s","sw","w","nw","n","ne","e"];d.jqplot.Highlighter.init=function(k,j,i){var h=i||{};this.plugins.highlighter=new d.jqplot.Highlighter(h.highlighter)};d.jqplot.Highlighter.parseOptions=function(i,h){this.showHighlight=true};d.jqplot.Highlighter.postPlotDraw=function(){if(this.plugins.highlighter&&this.plugins.highlighter.highlightCanvas){this.plugins.highlighter.highlightCanvas.resetCanvas();this.plugins.highlighter.highlightCanvas=null}if(this.plugins.highlighter&&this.plugins.highlighter._tooltipElem){this.plugins.highlighter._tooltipElem.emptyForce();this.plugins.highlighter._tooltipElem=null}this.plugins.highlighter.highlightCanvas=new d.jqplot.GenericCanvas();this.eventCanvas._elem.before(this.plugins.highlighter.highlightCanvas.createElement(this._gridPadding,"jqplot-highlight-canvas",this._plotDimensions,this));this.plugins.highlighter.highlightCanvas.setContext();var h=document.createElement("div");this.plugins.highlighter._tooltipElem=d(h);h=null;this.plugins.highlighter._tooltipElem.addClass("jqplot-highlighter-tooltip");this.plugins.highlighter._tooltipElem.css({position:"absolute",display:"none"});this.eventCanvas._elem.before(this.plugins.highlighter._tooltipElem)};d.jqplot.preInitHooks.push(d.jqplot.Highlighter.init);d.jqplot.preParseSeriesOptionsHooks.push(d.jqplot.Highlighter.parseOptions);d.jqplot.postDrawHooks.push(d.jqplot.Highlighter.postPlotDraw);function a(m,o){var j=m.plugins.highlighter;var p=m.series[o.seriesIndex];var h=p.markerRenderer;var i=j.markerRenderer;i.style=h.style;i.lineWidth=h.lineWidth+j.lineWidthAdjust;i.size=h.size+j.sizeAdjust;var l=d.jqplot.getColorComponents(h.color);var n=[l[0],l[1],l[2]];var k=(l[3]>=0.6)?l[3]*0.6:l[3]*(2-l[3]);i.color="rgba("+n[0]+","+n[1]+","+n[2]+","+k+")";i.init();i.draw(p.gridData[o.pointIndex][0],p.gridData[o.pointIndex][1],j.highlightCanvas._ctx)}function g(A,q,m){var k=A.plugins.highlighter;var D=k._tooltipElem;var r=q.highlighter||{};var t=d.extend(true,{},k,r);if(t.useAxesFormatters){var w=q._xaxis._ticks[0].formatter;var h=q._yaxis._ticks[0].formatter;var E=q._xaxis._ticks[0].formatString;var s=q._yaxis._ticks[0].formatString;var z;var u=w(E,m.data[0]);var l=[];for(var B=1;B<t.yvalues+1;B++){l.push(h(s,m.data[B]))}if(typeof t.formatString==="string"){switch(t.tooltipAxes){case"both":case"xy":l.unshift(u);l.unshift(t.formatString);z=d.jqplot.sprintf.apply(d.jqplot.sprintf,l);break;case"yx":l.push(u);l.unshift(t.formatString);z=d.jqplot.sprintf.apply(d.jqplot.sprintf,l);break;case"x":z=d.jqplot.sprintf.apply(d.jqplot.sprintf,[t.formatString,u]);break;case"y":l.unshift(t.formatString);z=d.jqplot.sprintf.apply(d.jqplot.sprintf,l);break;default:l.unshift(u);l.unshift(t.formatString);z=d.jqplot.sprintf.apply(d.jqplot.sprintf,l);break}}else{switch(t.tooltipAxes){case"both":case"xy":z=u;for(var B=0;B<l.length;B++){z+=t.tooltipSeparator+l[B]}break;case"yx":z="";for(var B=0;B<l.length;B++){z+=l[B]+t.tooltipSeparator}z+=u;break;case"x":z=u;break;case"y":z=l.join(t.tooltipSeparator);break;default:z=u;for(var B=0;B<l.length;B++){z+=t.tooltipSeparator+l[B]}break}}}else{var z;if(typeof t.formatString==="string"){z=d.jqplot.sprintf.apply(d.jqplot.sprintf,[t.formatString].concat(m.data))}else{if(t.tooltipAxes=="both"||t.tooltipAxes=="xy"){z=d.jqplot.sprintf(t.tooltipFormatString,m.data[0])+t.tooltipSeparator+d.jqplot.sprintf(t.tooltipFormatString,m.data[1])}else{if(t.tooltipAxes=="yx"){z=d.jqplot.sprintf(t.tooltipFormatString,m.data[1])+t.tooltipSeparator+d.jqplot.sprintf(t.tooltipFormatString,m.data[0])}else{if(t.tooltipAxes=="x"){z=d.jqplot.sprintf(t.tooltipFormatString,m.data[0])}else{if(t.tooltipAxes=="y"){z=d.jqplot.sprintf(t.tooltipFormatString,m.data[1])}}}}}}if(d.isFunction(t.tooltipContentEditor)){z=t.tooltipContentEditor(z,m.seriesIndex,m.pointIndex,A)}D.html(z);var C={x:m.gridData[0],y:m.gridData[1]};var v=0;var j=0.707;if(q.markerRenderer.show==true){v=(q.markerRenderer.size+t.sizeAdjust)/2}var o=b;if(q.fillToZero&&q.fill&&m.data[1]<0){o=c}switch(o[e[t.tooltipLocation]]){case"nw":var p=C.x+A._gridPadding.left-D.outerWidth(true)-t.tooltipOffset-j*v;var n=C.y+A._gridPadding.top-t.tooltipOffset-D.outerHeight(true)-j*v;break;case"n":var p=C.x+A._gridPadding.left-D.outerWidth(true)/2;var n=C.y+A._gridPadding.top-t.tooltipOffset-D.outerHeight(true)-v;break;case"ne":var p=C.x+A._gridPadding.left+t.tooltipOffset+j*v;var n=C.y+A._gridPadding.top-t.tooltipOffset-D.outerHeight(true)-j*v;break;case"e":var p=C.x+A._gridPadding.left+t.tooltipOffset+v;var n=C.y+A._gridPadding.top-D.outerHeight(true)/2;break;case"se":var p=C.x+A._gridPadding.left+t.tooltipOffset+j*v;var n=C.y+A._gridPadding.top+t.tooltipOffset+j*v;break;case"s":var p=C.x+A._gridPadding.left-D.outerWidth(true)/2;var n=C.y+A._gridPadding.top+t.tooltipOffset+v;break;case"sw":var p=C.x+A._gridPadding.left-D.outerWidth(true)-t.tooltipOffset-j*v;var n=C.y+A._gridPadding.top+t.tooltipOffset+j*v;break;case"w":var p=C.x+A._gridPadding.left-D.outerWidth(true)-t.tooltipOffset-v;var n=C.y+A._gridPadding.top-D.outerHeight(true)/2;break;default:var p=C.x+A._gridPadding.left-D.outerWidth(true)-t.tooltipOffset-j*v;var n=C.y+A._gridPadding.top-t.tooltipOffset-D.outerHeight(true)-j*v;break}D.css("left",p);D.css("top",n);if(t.fadeTooltip){D.stop(true,true).fadeIn(t.tooltipFadeSpeed)}else{D.show()}D=null}function f(n,j,i,p,l){var h=l.plugins.highlighter;var m=l.plugins.cursor;if(h.show){if(p==null&&h.isHighlighting){var o=jQuery.Event("jqplotHighlighterUnhighlight");l.target.trigger(o);var q=h.highlightCanvas._ctx;q.clearRect(0,0,q.canvas.width,q.canvas.height);if(h.fadeTooltip){h._tooltipElem.fadeOut(h.tooltipFadeSpeed)}else{h._tooltipElem.hide()}if(h.bringSeriesToFront){l.restorePreviousSeriesOrder()}h.isHighlighting=false;h.currentNeighbor=null;q=null}else{if(p!=null&&l.series[p.seriesIndex].showHighlight&&!h.isHighlighting){var o=jQuery.Event("jqplotHighlighterHighlight");o.which=n.which;o.pageX=n.pageX;o.pageY=n.pageY;var k=[p.seriesIndex,p.pointIndex,p.data,l];l.target.trigger(o,k);h.isHighlighting=true;h.currentNeighbor=p;if(h.showMarker){a(l,p)}if(h.showTooltip&&(!m||!m._zoom.started)){g(l,l.series[p.seriesIndex],p)}if(h.bringSeriesToFront){l.moveSeriesToFront(p.seriesIndex)}}else{if(p!=null&&h.isHighlighting&&h.currentNeighbor!=p){if(l.series[p.seriesIndex].showHighlight){var q=h.highlightCanvas._ctx;q.clearRect(0,0,q.canvas.width,q.canvas.height);h.isHighlighting=true;h.currentNeighbor=p;if(h.showMarker){a(l,p)}if(h.showTooltip&&(!m||!m._zoom.started)){g(l,l.series[p.seriesIndex],p)}if(h.bringSeriesToFront){l.moveSeriesToFront(p.seriesIndex)}}}}}}}})(jQuery);