/* Flot plugin for computing bottoms for filled line and bar charts.

Copyright (c) 2007-2013 IOLA and Ole Laursen.
Licensed under the MIT license.

The case: you've got two series that you want to fill the area between. In Flot
terms, you need to use one as the fill bottom of the other. You can specify the
bottom of each data point as the third coordinate manually, or you can use this
plugin to compute it for you.

In order to name the other series, you need to give it an id, like this:

	var dataset = [
		{ data: [ ... ], id: "foo" } ,         // use default bottom
		{ data: [ ... ], fillBetween: "foo" }, // use first dataset as bottom
	];

	$.plot($("#placeholder"), dataset, { lines: { show: true, fill: true }});

As a convenience, if the id given is a number that doesn't appear as an id in
the series, it is interpreted as the index in the array instead (so fillBetween:
0 can also mean the first series).

Internally, the plugin modifies the datapoints in each series. For line series,
extra data points might be inserted through interpolation. Note that at points
where the bottom line is not defined (due to a null point or start/end of line),
the current line will show a gap too. The algorithm comes from the
jquery.flot.stack.js plugin, possibly some code could be shared.

*/(function(e){function n(e){function t(e,t){var n;for(n=0;n<t.length;++n)if(t[n].id===e.fillBetween)return t[n];return typeof e.fillBetween=="number"?e.fillBetween<0||e.fillBetween>=t.length?null:t[e.fillBetween]:null}function n(e,n,r){if(n.fillBetween==null)return;var i=t(n,e.getData());if(!i)return;var s=r.pointsize,o=r.points,u=i.datapoints.pointsize,a=i.datapoints.points,f=[],l,c,h,p,d,v,m=n.lines.show,g=s>2&&r.format[2].y,y=m&&n.lines.steps,b=!0,w=0,E=0,S,x;for(;;){if(w>=o.length)break;S=f.length;if(o[w]==null){for(x=0;x<s;++x)f.push(o[w+x]);w+=s}else if(E>=a.length){if(!m)for(x=0;x<s;++x)f.push(o[w+x]);w+=s}else if(a[E]==null){for(x=0;x<s;++x)f.push(null);b=!0,E+=u}else{l=o[w],c=o[w+1],p=a[E],d=a[E+1],v=0;if(l===p){for(x=0;x<s;++x)f.push(o[w+x]);v=d,w+=s,E+=u}else if(l>p){if(m&&w>0&&o[w-s]!=null){h=c+(o[w-s+1]-c)*(p-l)/(o[w-s]-l),f.push(p),f.push(h);for(x=2;x<s;++x)f.push(o[w+x]);v=d}E+=u}else{if(b&&m){w+=s;continue}for(x=0;x<s;++x)f.push(o[w+x]);m&&E>0&&a[E-u]!=null&&(v=d+(a[E-u+1]-d)*(l-p)/(a[E-u]-p)),w+=s}b=!1,S!==f.length&&g&&(f[S+2]=v)}if(y&&S!==f.length&&S>0&&f[S]!==null&&f[S]!==f[S-s]&&f[S+1]!==f[S-s+1]){for(x=0;x<s;++x)f[S+s+x]=f[S+x];f[S+1]=f[S-s+1]}}r.points=f}e.hooks.processDatapoints.push(n)}var t={series:{fillBetween:null}};e.plot.plugins.push({init:n,options:t,name:"fillbetween",version:"1.0"})})(jQuery);