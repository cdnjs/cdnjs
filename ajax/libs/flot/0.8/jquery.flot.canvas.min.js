/* Flot plugin for drawing all elements of a plot on the canvas.

Copyright (c) 2007-2013 IOLA and Ole Laursen.
Licensed under the MIT license.

Flot normally produces certain elements, like axis labels and the legend, using
HTML elements. This permits greater interactivity and customization, and often
looks better, due to cross-browser canvas text inconsistencies and limitations.

It can also be desirable to render the plot entirely in canvas, particularly
if the goal is to save it as an image, or if Flot is being used in a context
where the HTML DOM does not exist, as is the case within Node.js. This plugin
switches out Flot's standard drawing operations for canvas-only replacements.

Currently the plugin supports only axis labels, but it will eventually allow
every element of the plot to be rendered directly to canvas.

The plugin supports these options:

{
    canvas: boolean
}

The "canvas" option controls whether full canvas drawing is enabled, making it
possible to toggle on and off. This is useful when a plot uses HTML text in the
browser, but needs to redraw with canvas text when exporting as an image.

*/(function(e){function o(t,o){var u=o.Canvas;n==null&&(r=u.prototype.getTextInfo,i=u.prototype.addText,n=u.prototype.render),u.prototype.render=function(){if(!t.getOptions().canvas)return n.call(this);var e=this.context,r=this._textCache;e.save(),e.textBaseline="middle";for(var i in r)if(s.call(r,i)){var o=r[i];for(var u in o)if(s.call(o,u)){var a=o[u],f=!0;for(var l in a)if(s.call(a,l)){var c=a[l];if(!c.active){delete a[l];continue}f&&(e.fillStyle=c.font.color,e.font=c.font.definition,f=!1);var h=c.lines;for(var p=0;p<h.length;++p){var d=h[p];e.fillText(d.text,d.x,d.y)}}}}e.restore()},u.prototype.getTextInfo=function(n,i,s,o){if(!t.getOptions().canvas)return r.call(this,n,i,s,o);var u,a,f,l;i=""+i,typeof s=="object"?u=s.style+" "+s.variant+" "+s.weight+" "+s.size+"px "+s.family:u=s,a=this._textCache[n],a==null&&(a=this._textCache[n]={}),f=a[u],f==null&&(f=a[u]={}),l=f[i];if(l==null){var c=this.context;if(typeof s!="object"){var h=e("<div>&nbsp;</div>").css("position","absolute").addClass(typeof s=="string"?s:null).appendTo(this.getTextLayer(n));s={lineHeight:h.height(),style:h.css("font-style"),variant:h.css("font-variant"),weight:h.css("font-weight"),family:h.css("font-family"),color:h.css("color")},s.size=h.css("line-height",1).height(),h.remove()}u=s.style+" "+s.variant+" "+s.weight+" "+s.size+"px "+s.family,l=f[i]={width:0,height:0,active:!1,lines:[],font:{definition:u,color:s.color}},c.save(),c.font=u;var p=(i+"").replace(/<br ?\/?>|\r\n|\r/g,"\n").split("\n");for(var d=0;d<p.length;++d){var v=p[d],m=c.measureText(v);l.width=Math.max(m.width,l.width),l.height+=s.lineHeight,l.lines.push({text:v,width:m.width,height:s.lineHeight})}c.restore()}return l},u.prototype.addText=function(e,n,r,s,o,u,a,f){if(!t.getOptions().canvas)return i.call(this,e,n,r,s,o,u,a,f);var l=this.getTextInfo(e,s,o,u),c=l.lines;l.active=!0,r+=l.height/c.length/2,f=="middle"?r=Math.round(r-l.height/2):f=="bottom"?r=Math.round(r-l.height):r=Math.round(r),!(window.opera&&window.opera.version().split(".")[0]<12)||(r-=2);for(var h=0;h<c.length;++h){var p=c[h];p.y=r,r+=p.height,a=="center"?p.x=Math.round(n-p.width/2):a=="right"?p.x=Math.round(n-p.width):p.x=Math.round(n)}}}var t={canvas:!0},n,r,i,s=Object.prototype.hasOwnProperty;e.plot.plugins.push({init:o,options:t,name:"canvas",version:"1.0"})})(jQuery);