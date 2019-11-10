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
(function(f){f.jqplot.Trendline=function(){this.show=f.jqplot.config.enablePlugins;this.color="#666666";this.renderer=new f.jqplot.LineRenderer();this.rendererOptions={marker:{show:false}};this.label="";this.type="linear";this.shadow=true;this.markerRenderer={show:false};this.lineWidth=1.5;this.shadowAngle=45;this.shadowOffset=1;this.shadowAlpha=0.07;this.shadowDepth=3;this.isTrendline=true};f.jqplot.postSeriesInitHooks.push(e);f.jqplot.postDrawSeriesHooks.push(g);f.jqplot.addLegendRowHooks.push(a);function a(k){var j=null;if(k.trendline&&k.trendline.show){var i=k.trendline.label.toString();if(i){j={label:i,color:k.trendline.color}}}return j}function e(m,k,j,i,l){if(this._type&&(this._type==="line"||this._type=="bar")){this.trendline=new f.jqplot.Trendline();i=i||{};f.extend(true,this.trendline,{color:this.color},j.trendline,i.trendline);this.trendline.renderer.init.call(this.trendline,null)}}function g(m,i){i=f.extend(true,{},this.trendline,i);if(this.trendline&&i.show){var k;var l=i.data||this.data;k=c(l,this.trendline.type);var j=i.gridData||this.renderer.makeGridData.call(this,k.data);this.trendline.renderer.draw.call(this.trendline,m,j,{showLine:true,shadow:this.trendline.shadow})}}function b(w,v,n){var u=(n==null)?"linear":n;var s=w.length;var t;var z;var o=0;var m=0;var r=0;var q=0;var l=0;var j=[];var k=[];if(u=="linear"){k=w;j=v}else{if(u=="exp"||u=="exponential"){for(var p=0;p<v.length;p++){if(v[p]<=0){s--}else{k.push(w[p]);j.push(Math.log(v[p]))}}}}for(var p=0;p<s;p++){o=o+k[p];m=m+j[p];q=q+k[p]*j[p];r=r+k[p]*k[p];l=l+j[p]*j[p]}t=(s*q-o*m)/(s*r-o*o);z=(m-t*o)/s;return[t,z]}function h(k,j){var i;i=b(k,j,"linear");return[i[0],i[1]]}function d(o,m){var k;var i=o;var n=m;k=b(i,n,"exp");var l=Math.exp(k[0]);var j=Math.exp(k[1]);return[l,j]}function c(l,j){var p=(j==null)?"linear":j;var n;var o;var r=[];var q=[];var m=[];for(k=0;k<l.length;k++){if(l[k]!=null&&l[k][0]!=null&&l[k][1]!=null){r.push(l[k][0]);q.push(l[k][1])}}if(p=="linear"){n=h(r,q);for(var k=0;k<r.length;k++){o=n[0]*r[k]+n[1];m.push([r[k],o])}}else{if(p=="exp"||p=="exponential"){n=d(r,q);for(var k=0;k<r.length;k++){o=n[1]*Math.pow(n[0],r[k]);m.push([r[k],o])}}}return{data:m,slope:n[0],intercept:n[1]}}})(jQuery);