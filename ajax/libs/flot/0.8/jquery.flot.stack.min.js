/* Flot plugin for stacking data sets rather than overlyaing them.

Copyright (c) 2007-2013 IOLA and Ole Laursen.
Licensed under the MIT license.

The plugin assumes the data is sorted on x (or y if stacking horizontally).
For line charts, it is assumed that if a line has an undefined gap (from a
null point), then the line above it should have the same gap - insert zeros
instead of "null" if you want another behaviour. This also holds for the start
and end of the chart. Note that stacking a mix of positive and negative values
in most instances doesn't make sense (so it looks weird).

Two or more series are stacked when their "stack" attribute is set to the same
key (which can be any number or string or just "true"). To specify the default
stack, you can set the stack option like this:

	series: {
		stack: null/false, true, or a key (number/string)
	}

You can also specify it for a single series, like this:

	$.plot( $("#placeholder"), [{
		data: [ ... ],
		stack: true
	}])

The stacking order is determined by the order of the data series in the array
(later series end up on top of the previous).

Internally, the plugin modifies the datapoints in each series, adding an
offset to the y value. For line series, extra data points are inserted through
interpolation. If there's a second y value, it's also adjusted (e.g for bar
charts or filled areas).

*/(function(e){function n(e){function t(e,t){var n=null;for(var r=0;r<t.length;++r){if(e==t[r])break;t[r].stack==e.stack&&(n=t[r])}return n}function n(e,n,r){if(n.stack==null||n.stack===!1)return;var i=t(n,e.getData());if(!i)return;var s=r.pointsize,o=r.points,u=i.datapoints.pointsize,a=i.datapoints.points,f=[],l,c,h,p,d,v,m=n.lines.show,g=n.bars.horizontal,y=s>2&&(g?r.format[2].x:r.format[2].y),b=m&&n.lines.steps,w=!0,E=g?1:0,S=g?0:1,x=0,T=0,N,C;for(;;){if(x>=o.length)break;N=f.length;if(o[x]==null){for(C=0;C<s;++C)f.push(o[x+C]);x+=s}else if(T>=a.length){if(!m)for(C=0;C<s;++C)f.push(o[x+C]);x+=s}else if(a[T]==null){for(C=0;C<s;++C)f.push(null);w=!0,T+=u}else{l=o[x+E],c=o[x+S],p=a[T+E],d=a[T+S],v=0;if(l==p){for(C=0;C<s;++C)f.push(o[x+C]);f[N+S]+=d,v=d,x+=s,T+=u}else if(l>p){if(m&&x>0&&o[x-s]!=null){h=c+(o[x-s+S]-c)*(p-l)/(o[x-s+E]-l),f.push(p),f.push(h+d);for(C=2;C<s;++C)f.push(o[x+C]);v=d}T+=u}else{if(w&&m){x+=s;continue}for(C=0;C<s;++C)f.push(o[x+C]);m&&T>0&&a[T-u]!=null&&(v=d+(a[T-u+S]-d)*(l-p)/(a[T-u+E]-p)),f[N+S]+=v,x+=s}w=!1,N!=f.length&&y&&(f[N+2]+=v)}if(b&&N!=f.length&&N>0&&f[N]!=null&&f[N]!=f[N-s]&&f[N+1]!=f[N-s+1]){for(C=0;C<s;++C)f[N+s+C]=f[N+C];f[N+1]=f[N-s+1]}}r.points=f}e.hooks.processDatapoints.push(n)}var t={series:{stack:null}};e.plot.plugins.push({init:n,options:t,name:"stack",version:"1.2"})})(jQuery);