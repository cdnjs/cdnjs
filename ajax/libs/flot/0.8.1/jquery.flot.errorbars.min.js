/* Flot plugin for plotting error bars.

Copyright (c) 2007-2013 IOLA and Ole Laursen.
Licensed under the MIT license.

Error bars are used to show standard deviation and other statistical
properties in a plot.

* Created by Rui Pereira  -  rui (dot) pereira (at) gmail (dot) com

This plugin allows you to plot error-bars over points. Set "errorbars" inside
the points series to the axis name over which there will be error values in
your data array (*even* if you do not intend to plot them later, by setting
"show: null" on xerr/yerr).

The plugin supports these options:

	series: {
		points: {
			errorbars: "x" or "y" or "xy",
			xerr: {
				show: null/false or true,
				asymmetric: null/false or true,
				upperCap: null or "-" or function,
				lowerCap: null or "-" or function,
				color: null or color,
				radius: null or number
			},
			yerr: { same options as xerr }
		}
	}

Each data point array is expected to be of the type:

	"x"  [ x, y, xerr ]
	"y"  [ x, y, yerr ]
	"xy" [ x, y, xerr, yerr ]

Where xerr becomes xerr_lower,xerr_upper for the asymmetric error case, and
equivalently for yerr. Eg., a datapoint for the "xy" case with symmetric
error-bars on X and asymmetric on Y would be:

	[ x, y, xerr, yerr_lower, yerr_upper ]

By default no end caps are drawn. Setting upperCap and/or lowerCap to "-" will
draw a small cap perpendicular to the error bar. They can also be set to a
user-defined drawing function, with (ctx, x, y, radius) as parameters, as eg.

	function drawSemiCircle( ctx, x, y, radius ) {
		ctx.beginPath();
		ctx.arc( x, y, radius, 0, Math.PI, false );
		ctx.moveTo( x - radius, y );
		ctx.lineTo( x + radius, y );
		ctx.stroke();
	}

Color and radius both default to the same ones of the points series if not
set. The independent radius parameter on xerr/yerr is useful for the case when
we may want to add error-bars to a line, without showing the interconnecting
points (with radius: 0), and still showing end caps on the error-bars.
shadowSize and lineWidth are derived as well from the points series.

*/(function(e){function n(e,t,n,r){if(!t.points.errorbars)return;var i=[{x:!0,number:!0,required:!0},{y:!0,number:!0,required:!0}],s=t.points.errorbars;if(s=="x"||s=="xy")t.points.xerr.asymmetric?(i.push({x:!0,number:!0,required:!0}),i.push({x:!0,number:!0,required:!0})):i.push({x:!0,number:!0,required:!0});if(s=="y"||s=="xy")t.points.yerr.asymmetric?(i.push({y:!0,number:!0,required:!0}),i.push({y:!0,number:!0,required:!0})):i.push({y:!0,number:!0,required:!0});r.format=i}function r(e,t){var n=e.datapoints.points,r=null,i=null,s=null,o=null,u=e.points.xerr,a=e.points.yerr,f=e.points.errorbars;f=="x"||f=="xy"?u.asymmetric?(r=n[t+2],i=n[t+3],f=="xy"&&(a.asymmetric?(s=n[t+4],o=n[t+5]):s=n[t+4])):(r=n[t+2],f=="xy"&&(a.asymmetric?(s=n[t+3],o=n[t+4]):s=n[t+3])):f=="y"&&(a.asymmetric?(s=n[t+2],o=n[t+3]):s=n[t+2]),i==null&&(i=r),o==null&&(o=s);var l=[r,i,s,o];return u.show||(l[0]=null,l[1]=null),a.show||(l[2]=null,l[3]=null),l}function i(e,t,n){var i=n.datapoints.points,o=n.datapoints.pointsize,u=[n.xaxis,n.yaxis],a=n.points.radius,f=[n.points.xerr,n.points.yerr],l=!1;if(u[0].p2c(u[0].max)<u[0].p2c(u[0].min)){l=!0;var c=f[0].lowerCap;f[0].lowerCap=f[0].upperCap,f[0].upperCap=c}var h=!1;if(u[1].p2c(u[1].min)<u[1].p2c(u[1].max)){h=!0;var c=f[1].lowerCap;f[1].lowerCap=f[1].upperCap,f[1].upperCap=c}for(var p=0;p<n.datapoints.points.length;p+=o){var d=r(n,p);for(var v=0;v<f.length;v++){var m=[u[v].min,u[v].max];if(d[v*f.length]){var g=i[p],y=i[p+1],b=[g,y][v]+d[v*f.length+1],w=[g,y][v]-d[v*f.length];if(f[v].err=="x")if(y>u[1].max||y<u[1].min||b<u[0].min||w>u[0].max)continue;if(f[v].err=="y")if(g>u[0].max||g<u[0].min||b<u[1].min||w>u[1].max)continue;var E=!0,S=!0;b>m[1]&&(E=!1,b=m[1]),w<m[0]&&(S=!1,w=m[0]);if(f[v].err=="x"&&l||f[v].err=="y"&&h){var c=w;w=b,b=c,c=S,S=E,E=c,c=m[0],m[0]=m[1],m[1]=c}g=u[0].p2c(g),y=u[1].p2c(y),b=u[v].p2c(b),w=u[v].p2c(w),m[0]=u[v].p2c(m[0]),m[1]=u[v].p2c(m[1]);var x=f[v].lineWidth?f[v].lineWidth:n.points.lineWidth,T=n.points.shadowSize!=null?n.points.shadowSize:n.shadowSize;if(x>0&&T>0){var N=T/2;t.lineWidth=N,t.strokeStyle="rgba(0,0,0,0.1)",s(t,f[v],g,y,b,w,E,S,a,N+N/2,m),t.strokeStyle="rgba(0,0,0,0.2)",s(t,f[v],g,y,b,w,E,S,a,N/2,m)}t.strokeStyle=f[v].color?f[v].color:n.color,t.lineWidth=x,s(t,f[v],g,y,b,w,E,S,a,0,m)}}}}function s(t,n,r,i,s,u,a,f,l,c,h){i+=c,s+=c,u+=c,n.err=="x"?(s>r+l?o(t,[[s,i],[Math.max(r+l,h[0]),i]]):a=!1,u<r-l?o(t,[[Math.min(r-l,h[1]),i],[u,i]]):f=!1):(s<i-l?o(t,[[r,s],[r,Math.min(i-l,h[0])]]):a=!1,u>i+l?o(t,[[r,Math.max(i+l,h[1])],[r,u]]):f=!1),l=n.radius!=null?n.radius:l,a&&(n.upperCap=="-"?n.err=="x"?o(t,[[s,i-l],[s,i+l]]):o(t,[[r-l,s],[r+l,s]]):e.isFunction(n.upperCap)&&(n.err=="x"?n.upperCap(t,s,i,l):n.upperCap(t,r,s,l))),f&&(n.lowerCap=="-"?n.err=="x"?o(t,[[u,i-l],[u,i+l]]):o(t,[[r-l,u],[r+l,u]]):e.isFunction(n.lowerCap)&&(n.err=="x"?n.lowerCap(t,u,i,l):n.lowerCap(t,r,u,l)))}function o(e,t){e.beginPath(),e.moveTo(t[0][0],t[0][1]);for(var n=1;n<t.length;n++)e.lineTo(t[n][0],t[n][1]);e.stroke()}function u(t,n){var r=t.getPlotOffset();n.save(),n.translate(r.left,r.top),e.each(t.getData(),function(e,r){r.points.errorbars&&(r.points.xerr.show||r.points.yerr.show)&&i(t,n,r)}),n.restore()}function a(e){e.hooks.processRawData.push(n),e.hooks.draw.push(u)}var t={series:{points:{errorbars:null,xerr:{err:"x",show:null,asymmetric:null,upperCap:null,lowerCap:null,color:null,radius:null},yerr:{err:"y",show:null,asymmetric:null,upperCap:null,lowerCap:null,color:null,radius:null}}}};e.plot.plugins.push({init:a,options:t,name:"errorbars",version:"1.0"})})(jQuery);