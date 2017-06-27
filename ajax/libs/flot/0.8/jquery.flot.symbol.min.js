/* Flot plugin that adds some extra symbols for plotting points.

Copyright (c) 2007-2013 IOLA and Ole Laursen.
Licensed under the MIT license.

The symbols are accessed as strings through the standard symbol options:

	series: {
		points: {
			symbol: "square" // or "diamond", "triangle", "cross"
		}
	}

*/(function(e){function t(e,t,n){var r={square:function(e,t,n,r,i){var s=r*Math.sqrt(Math.PI)/2;e.rect(t-s,n-s,s+s,s+s)},diamond:function(e,t,n,r,i){var s=r*Math.sqrt(Math.PI/2);e.moveTo(t-s,n),e.lineTo(t,n-s),e.lineTo(t+s,n),e.lineTo(t,n+s),e.lineTo(t-s,n)},triangle:function(e,t,n,r,i){var s=r*Math.sqrt(2*Math.PI/Math.sin(Math.PI/3)),o=s*Math.sin(Math.PI/3);e.moveTo(t-s/2,n+o/2),e.lineTo(t+s/2,n+o/2),i||(e.lineTo(t,n-o/2),e.lineTo(t-s/2,n+o/2))},cross:function(e,t,n,r,i){var s=r*Math.sqrt(Math.PI)/2;e.moveTo(t-s,n-s),e.lineTo(t+s,n+s),e.moveTo(t-s,n+s),e.lineTo(t+s,n-s)}},i=t.points.symbol;r[i]&&(t.points.symbol=r[i])}function n(e){e.hooks.processDatapoints.push(t)}e.plot.plugins.push({init:n,name:"symbols",version:"1.0"})})(jQuery);