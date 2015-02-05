/* Flot plugin for thresholding data.

Copyright (c) 2007-2013 IOLA and Ole Laursen.
Licensed under the MIT license.

The plugin supports these options:

	series: {
		threshold: {
			below: number
			color: colorspec
		}
	}

It can also be applied to a single series, like this:

	$.plot( $("#placeholder"), [{
		data: [ ... ],
		threshold: { ... }
	}])

An array can be passed for multiple thresholding, like this:

	threshold: [{
		below: number1
		color: color1
	},{
		below: number2
		color: color2
	}]

These multiple threshold objects can be passed in any order since they are
sorted by the processing function.

The data points below "below" are drawn with the specified color. This makes
it easy to mark points below 0, e.g. for budget data.

Internally, the plugin works by splitting the data into two series, above and
below the threshold. The extra series below the threshold will have its label
cleared and the special "originSeries" attribute set to the original series.
You may need to check for this in hover events.

*/(function(e){function n(t){function n(t,n,r,i,s){var o=r.pointsize,u,a,f,l,c,h=e.extend({},n);h.datapoints={points:[],pointsize:o,format:r.format},h.label=null,h.color=s,h.threshold=null,h.originSeries=n,h.data=[];var p=r.points,d=n.lines.show,v=[],m=[],g;for(u=0;u<p.length;u+=o){a=p[u],f=p[u+1],c=l,f<i?l=v:l=m;if(d&&c!=l&&a!=null&&u>0&&p[u-o]!=null){var y=a+(i-f)*(a-p[u-o])/(f-p[u-o+1]);c.push(y),c.push(i);for(g=2;g<o;++g)c.push(p[u+g]);l.push(null),l.push(null);for(g=2;g<o;++g)l.push(p[u+g]);l.push(y),l.push(i);for(g=2;g<o;++g)l.push(p[u+g])}l.push(a),l.push(f);for(g=2;g<o;++g)l.push(p[u+g])}r.points=m,h.datapoints.points=v;if(h.datapoints.points.length>0){var b=e.inArray(n,t.getData());t.getData().splice(b+1,0,h)}}function r(t,r,i){if(!r.threshold)return;r.threshold instanceof Array?(r.threshold.sort(function(e,t){return e.below-t.below}),e(r.threshold).each(function(e,o){n(t,r,i,o.below,o.color)})):n(t,r,i,r.threshold.below,r.threshold.color)}t.hooks.processDatapoints.push(r)}var t={series:{threshold:null}};e.plot.plugins.push({init:n,options:t,name:"threshold",version:"1.2"})})(jQuery);