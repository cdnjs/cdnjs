/**
 * jqPlot
 * Pure JavaScript plotting plugin using jQuery
 *
 * Version: 1.0.0r1095
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
(function(c){c.jqplot.EnhancedLegendRenderer=function(){c.jqplot.TableLegendRenderer.call(this)};c.jqplot.EnhancedLegendRenderer.prototype=new c.jqplot.TableLegendRenderer();c.jqplot.EnhancedLegendRenderer.prototype.constructor=c.jqplot.EnhancedLegendRenderer;c.jqplot.EnhancedLegendRenderer.prototype.init=function(d){this.numberRows=null;this.numberColumns=null;this.seriesToggle="normal";this.seriesToggleReplot=false;this.disableIEFading=true;c.extend(true,this,d);if(this.seriesToggle){c.jqplot.postDrawHooks.push(b)}};c.jqplot.EnhancedLegendRenderer.prototype.draw=function(m,y){var f=this;if(this.show){var r=this._series;var u;var w="position:absolute;";w+=(this.background)?"background:"+this.background+";":"";w+=(this.border)?"border:"+this.border+";":"";w+=(this.fontSize)?"font-size:"+this.fontSize+";":"";w+=(this.fontFamily)?"font-family:"+this.fontFamily+";":"";w+=(this.textColor)?"color:"+this.textColor+";":"";w+=(this.marginTop!=null)?"margin-top:"+this.marginTop+";":"";w+=(this.marginBottom!=null)?"margin-bottom:"+this.marginBottom+";":"";w+=(this.marginLeft!=null)?"margin-left:"+this.marginLeft+";":"";w+=(this.marginRight!=null)?"margin-right:"+this.marginRight+";":"";this._elem=c('<table class="jqplot-table-legend" style="'+w+'"></table>');if(this.seriesToggle){this._elem.css("z-index","3")}var C=false,q=false,d,o;if(this.numberRows){d=this.numberRows;if(!this.numberColumns){o=Math.ceil(r.length/d)}else{o=this.numberColumns}}else{if(this.numberColumns){o=this.numberColumns;d=Math.ceil(r.length/this.numberColumns)}else{d=r.length;o=1}}var B,z,e,l,k,n,p,t,h,g;var v=0;for(B=r.length-1;B>=0;B--){if(o==1&&r[B]._stack||r[B].renderer.constructor==c.jqplot.BezierCurveRenderer){q=true}}for(B=0;B<d;B++){e=c(document.createElement("tr"));e.addClass("jqplot-table-legend");if(q){e.prependTo(this._elem)}else{e.appendTo(this._elem)}for(z=0;z<o;z++){if(v<r.length&&(r[v].show||r[v].showLabel)){u=r[v];n=this.labels[v]||u.label.toString();if(n){var x=u.color;if(!q){if(B>0){C=true}else{C=false}}else{if(B==d-1){C=false}else{C=true}}p=(C)?this.rowSpacing:"0";l=c(document.createElement("td"));l.addClass("jqplot-table-legend jqplot-table-legend-swatch");l.css({textAlign:"center",paddingTop:p});h=c(document.createElement("div"));h.addClass("jqplot-table-legend-swatch-outline");g=c(document.createElement("div"));g.addClass("jqplot-table-legend-swatch");g.css({backgroundColor:x,borderColor:x});l.append(h.append(g));k=c(document.createElement("td"));k.addClass("jqplot-table-legend jqplot-table-legend-label");k.css("paddingTop",p);if(this.escapeHtml){k.text(n)}else{k.html(n)}if(q){if(this.showLabels){k.prependTo(e)}if(this.showSwatches){l.prependTo(e)}}else{if(this.showSwatches){l.appendTo(e)}if(this.showLabels){k.appendTo(e)}}if(this.seriesToggle){var A;if(typeof(this.seriesToggle)==="string"||typeof(this.seriesToggle)==="number"){if(!c.jqplot.use_excanvas||!this.disableIEFading){A=this.seriesToggle}}if(this.showSwatches){l.bind("click",{series:u,speed:A,plot:y,replot:this.seriesToggleReplot},a);l.addClass("jqplot-seriesToggle")}if(this.showLabels){k.bind("click",{series:u,speed:A,plot:y,replot:this.seriesToggleReplot},a);k.addClass("jqplot-seriesToggle")}if(!u.show&&u.showLabel){l.addClass("jqplot-series-hidden");k.addClass("jqplot-series-hidden")}}C=true}}v++}l=k=h=g=null}}return this._elem};var a=function(j){var i=j.data,m=i.series,k=i.replot,h=i.plot,f=i.speed,l=m.index,g=false;if(m.canvas._elem.is(":hidden")||!m.show){g=true}var e=function(){if(k){var n={};if(c.isPlainObject(k)){c.extend(true,n,k)}h.replot(n);if(g&&f){var d=h.series[l];if(d.shadowCanvas._elem){d.shadowCanvas._elem.hide().fadeIn(f)}d.canvas._elem.hide().fadeIn(f);d.canvas._elem.nextAll(".jqplot-point-label.jqplot-series-"+d.index).hide().fadeIn(f)}}else{var d=h.series[l];if(d.canvas._elem.is(":hidden")||!d.show){if(typeof h.options.legend.showSwatches==="undefined"||h.options.legend.showSwatches===true){h.legend._elem.find("td").eq(l*2).addClass("jqplot-series-hidden")}if(typeof h.options.legend.showLabels==="undefined"||h.options.legend.showLabels===true){h.legend._elem.find("td").eq((l*2)+1).addClass("jqplot-series-hidden")}}else{if(typeof h.options.legend.showSwatches==="undefined"||h.options.legend.showSwatches===true){h.legend._elem.find("td").eq(l*2).removeClass("jqplot-series-hidden")}if(typeof h.options.legend.showLabels==="undefined"||h.options.legend.showLabels===true){h.legend._elem.find("td").eq((l*2)+1).removeClass("jqplot-series-hidden")}}}};m.toggleDisplay(j,e)};var b=function(){if(this.legend.renderer.constructor==c.jqplot.EnhancedLegendRenderer&&this.legend.seriesToggle){var d=this.legend._elem.detach();this.eventCanvas._elem.after(d)}}})(jQuery);