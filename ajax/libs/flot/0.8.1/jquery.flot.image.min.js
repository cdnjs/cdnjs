/* Flot plugin for plotting images.

Copyright (c) 2007-2013 IOLA and Ole Laursen.
Licensed under the MIT license.

The data syntax is [ [ image, x1, y1, x2, y2 ], ... ] where (x1, y1) and
(x2, y2) are where you intend the two opposite corners of the image to end up
in the plot. Image must be a fully loaded Javascript image (you can make one
with new Image()). If the image is not complete, it's skipped when plotting.

There are two helpers included for retrieving images. The easiest work the way
that you put in URLs instead of images in the data, like this:

	[ "myimage.png", 0, 0, 10, 10 ]

Then call $.plot.image.loadData( data, options, callback ) where data and
options are the same as you pass in to $.plot. This loads the images, replaces
the URLs in the data with the corresponding images and calls "callback" when
all images are loaded (or failed loading). In the callback, you can then call
$.plot with the data set. See the included example.

A more low-level helper, $.plot.image.load(urls, callback) is also included.
Given a list of URLs, it calls callback with an object mapping from URL to
Image object when all images are loaded or have failed loading.

The plugin supports these options:

	series: {
		images: {
			show: boolean
			anchor: "corner" or "center"
			alpha: [ 0, 1 ]
		}
	}

They can be specified for a specific series:

	$.plot( $("#placeholder"), [{
		data: [ ... ],
		images: { ... }
	])

Note that because the data format is different from usual data points, you
can't use images with anything else in a specific data series.

Setting "anchor" to "center" causes the pixels in the image to be anchored at
the corner pixel centers inside of at the pixel corners, effectively letting
half a pixel stick out to each side in the plot.

A possible future direction could be support for tiling for large images (like
Google Maps).

*/(function(e){function n(e,t,n){var r=e.getPlotOffset();if(!n.images||!n.images.show)return;var i=n.datapoints.points,s=n.datapoints.pointsize;for(var o=0;o<i.length;o+=s){var u=i[o],a=i[o+1],f=i[o+2],l=i[o+3],c=i[o+4],h=n.xaxis,p=n.yaxis,d;if(!u||u.width<=0||u.height<=0)continue;a>l&&(d=l,l=a,a=d),f>c&&(d=c,c=f,f=d),n.images.anchor=="center"&&(d=.5*(l-a)/(u.width-1),a-=d,l+=d,d=.5*(c-f)/(u.height-1),f-=d,c+=d);if(a==l||f==c||a>=h.max||l<=h.min||f>=p.max||c<=p.min)continue;var v=0,m=0,g=u.width,y=u.height;a<h.min&&(v+=(g-v)*(h.min-a)/(l-a),a=h.min),l>h.max&&(g+=(g-v)*(h.max-l)/(l-a),l=h.max),f<p.min&&(y+=(m-y)*(p.min-f)/(c-f),f=p.min),c>p.max&&(m+=(m-y)*(p.max-c)/(c-f),c=p.max),a=h.p2c(a),l=h.p2c(l),f=p.p2c(f),c=p.p2c(c),a>l&&(d=l,l=a,a=d),f>c&&(d=c,c=f,f=d),d=t.globalAlpha,t.globalAlpha*=n.images.alpha,t.drawImage(u,v,m,g-v,y-m,a+r.left,f+r.top,l-a,c-f),t.globalAlpha=d}}function r(e,t,n,r){if(!t.images.show)return;r.format=[{required:!0},{x:!0,number:!0,required:!0},{y:!0,number:!0,required:!0},{x:!0,number:!0,required:!0},{y:!0,number:!0,required:!0}]}function i(e){e.hooks.processRawData.push(r),e.hooks.drawSeries.push(n)}var t={series:{images:{show:!1,alpha:1,anchor:"corner"}}};e.plot.image={},e.plot.image.loadDataImages=function(t,n,r){var i=[],s=[],o=n.series.images.show;e.each(t,function(t,n){if(!o&&!n.images.show)return;n.data&&(n=n.data),e.each(n,function(e,t){typeof t[0]=="string"&&(i.push(t[0]),s.push(t))})}),e.plot.image.load(i,function(t){e.each(s,function(e,n){var r=n[0];t[r]&&(n[0]=t[r])}),r()})},e.plot.image.load=function(t,n){var r=t.length,i={};r==0&&n({}),e.each(t,function(t,s){var o=function(){--r,i[s]=this,r==0&&n(i)};e("<img />").load(o).error(o).attr("src",s)})},e.plot.plugins.push({init:i,options:t,name:"image",version:"1.1"})})(jQuery);