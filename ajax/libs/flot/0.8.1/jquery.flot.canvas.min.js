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

*/(function(e){function o(t,o){var u=o.Canvas;n==null&&(r=u.prototype.getTextInfo,i=u.prototype.addText,n=u.prototype.render),u.prototype.render=function(){if(!t.getOptions().canvas)return n.call(this);var e=this.context,r=this._textCache;e.save(),e.textBaseline="middle";for(var i in r)if(s.call(r,i)){var o=r[i];for(var u in o)if(s.call(o,u)){var a=o[u],f=!0;for(var l in a)if(s.call(a,l)){var c=a[l],h=c.positions,p=c.lines;f&&(e.fillStyle=c.font.color,e.font=c.font.definition,f=!1);for(var d=0,v;v=h[d];d++)if(v.active)for(var m=0,g;g=v.lines[m];m++)e.fillText(p[m].text,g[0],g[1]);else h.splice(d--,1);h.length==0&&delete a[l]}}}e.restore()},u.prototype.getTextInfo=function(n,i,s,o,u){if(!t.getOptions().canvas)return r.call(this,n,i,s,o,u);var a,f,l,c;i=""+i,typeof s=="object"?a=s.style+" "+s.variant+" "+s.weight+" "+s.size+"px "+s.family:a=s,f=this._textCache[n],f==null&&(f=this._textCache[n]={}),l=f[a],l==null&&(l=f[a]={}),c=l[i];if(c==null){var h=this.context;if(typeof s!="object"){var p=e("<div>&nbsp;</div>").css("position","absolute").addClass(typeof s=="string"?s:null).appendTo(this.getTextLayer(n));s={lineHeight:p.height(),style:p.css("font-style"),variant:p.css("font-variant"),weight:p.css("font-weight"),family:p.css("font-family"),color:p.css("color")},s.size=p.css("line-height",1).height(),p.remove()}a=s.style+" "+s.variant+" "+s.weight+" "+s.size+"px "+s.family,c=l[i]={width:0,height:0,positions:[],lines:[],font:{definition:a,color:s.color}},h.save(),h.font=a;var d=(i+"").replace(/<br ?\/?>|\r\n|\r/g,"\n").split("\n");for(var v=0;v<d.length;++v){var m=d[v],g=h.measureText(m);c.width=Math.max(g.width,c.width),c.height+=s.lineHeight,c.lines.push({text:m,width:g.width,height:s.lineHeight})}h.restore()}return c},u.prototype.addText=function(e,n,r,s,o,u,a,f,l){if(!t.getOptions().canvas)return i.call(this,e,n,r,s,o,u,a,f,l);var c=this.getTextInfo(e,s,o,u,a),h=c.positions,p=c.lines;r+=c.height/p.length/2,l=="middle"?r=Math.round(r-c.height/2):l=="bottom"?r=Math.round(r-c.height):r=Math.round(r),!(window.opera&&window.opera.version().split(".")[0]<12)||(r-=2);for(var d=0,v;v=h[d];d++)if(v.x==n&&v.y==r){v.active=!0;return}v={active:!0,lines:[],x:n,y:r},h.push(v);for(var d=0,m;m=p[d];d++)f=="center"?v.lines.push([Math.round(n-m.width/2),r]):f=="right"?v.lines.push([Math.round(n-m.width),r]):v.lines.push([Math.round(n),r]),r+=m.height}}var t={canvas:!0},n,r,i,s=Object.prototype.hasOwnProperty;e.plot.plugins.push({init:o,options:t,name:"canvas",version:"1.0"})})(jQuery);