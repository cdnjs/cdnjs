/* Flot plugin for adding the ability to pan and zoom the plot.

Copyright (c) 2007-2013 IOLA and Ole Laursen.
Licensed under the MIT license.

The default behaviour is double click and scrollwheel up/down to zoom in, drag
to pan. The plugin defines plot.zoom({ center }), plot.zoomOut() and
plot.pan( offset ) so you easily can add custom controls. It also fires
"plotpan" and "plotzoom" events, useful for synchronizing plots.

The plugin supports these options:

	zoom: {
		interactive: false
		trigger: "dblclick" // or "click" for single click
		amount: 1.5         // 2 = 200% (zoom in), 0.5 = 50% (zoom out)
	}

	pan: {
		interactive: false
		cursor: "move"      // CSS mouse cursor value used when dragging, e.g. "pointer"
		frameRate: 20
	}

	xaxis, yaxis, x2axis, y2axis: {
		zoomRange: null  // or [ number, number ] (min range, max range) or false
		panRange: null   // or [ number, number ] (min, max) or false
	}

"interactive" enables the built-in drag/click behaviour. If you enable
interactive for pan, then you'll have a basic plot that supports moving
around; the same for zoom.

"amount" specifies the default amount to zoom in (so 1.5 = 150%) relative to
the current viewport.

"cursor" is a standard CSS mouse cursor string used for visual feedback to the
user when dragging.

"frameRate" specifies the maximum number of times per second the plot will
update itself while the user is panning around on it (set to null to disable
intermediate pans, the plot will then not update until the mouse button is
released).

"zoomRange" is the interval in which zooming can happen, e.g. with zoomRange:
[1, 100] the zoom will never scale the axis so that the difference between min
and max is smaller than 1 or larger than 100. You can set either end to null
to ignore, e.g. [1, null]. If you set zoomRange to false, zooming on that axis
will be disabled.

"panRange" confines the panning to stay within a range, e.g. with panRange:
[-10, 20] panning stops at -10 in one end and at 20 in the other. Either can
be null, e.g. [-10, null]. If you set panRange to false, panning on that axis
will be disabled.

Example API usage:

	plot = $.plot(...);

	// zoom default amount in on the pixel ( 10, 20 )
	plot.zoom({ center: { left: 10, top: 20 } });

	// zoom out again
	plot.zoomOut({ center: { left: 10, top: 20 } });

	// zoom 200% in on the pixel (10, 20)
	plot.zoom({ amount: 2, center: { left: 10, top: 20 } });

	// pan 100 pixels to the left and 20 down
	plot.pan({ left: -100, top: 20 })

Here, "center" specifies where the center of the zooming should happen. Note
that this is defined in pixel space, not the space of the data points (you can
use the p2c helpers on the axes in Flot to help you convert between these).

"amount" is the amount to zoom the viewport relative to the current range, so
1 is 100% (i.e. no change), 1.5 is 150% (zoom in), 0.7 is 70% (zoom out). You
can set the default in the options.

*/// First two dependencies, jquery.event.drag.js and
// jquery.mousewheel.js, we put them inline here to save people the
// effort of downloading them.
/*
jquery.event.drag.js ~ v1.5 ~ Copyright (c) 2008, Three Dub Media (http://threedubmedia.com)
Licensed under the MIT License ~ http://threedubmedia.googlecode.com/files/MIT-LICENSE.txt
*/(function(e){function t(i){var l,h=this,p=i.data||{};if(p.elem)h=i.dragTarget=p.elem,i.dragProxy=a.proxy||h,i.cursorOffsetX=p.pageX-p.left,i.cursorOffsetY=p.pageY-p.top,i.offsetX=i.pageX-i.cursorOffsetX,i.offsetY=i.pageY-i.cursorOffsetY;else if(a.dragging||p.which>0&&i.which!=p.which||e(i.target).is(p.not))return;switch(i.type){case"mousedown":return e.extend(p,e(h).offset(),{elem:h,target:i.target,pageX:i.pageX,pageY:i.pageY}),o.add(document,"mousemove mouseup",t,p),s(h,!1),a.dragging=null,!1;case!a.dragging&&"mousemove":if(r(i.pageX-p.pageX)+r(i.pageY-p.pageY)<p.distance)break;i.target=p.target,l=n(i,"dragstart",h),l!==!1&&(a.dragging=h,a.proxy=i.dragProxy=e(l||h)[0]);case"mousemove":if(a.dragging){if(l=n(i,"drag",h),u.drop&&(u.drop.allowed=l!==!1,u.drop.handler(i)),l!==!1)break;i.type="mouseup"};case"mouseup":o.remove(document,"mousemove mouseup",t),a.dragging&&(u.drop&&u.drop.handler(i),n(i,"dragend",h)),s(h,!0),a.dragging=a.proxy=p.elem=!1}return!0}function n(t,n,r){t.type=n;var i=e.event.dispatch.call(r,t);return i===!1?!1:i||t.result}function r(e){return Math.pow(e,2)}function i(){return a.dragging===!1}function s(e,t){e&&(e.unselectable=t?"off":"on",e.onselectstart=function(){return t},e.style&&(e.style.MozUserSelect=t?"":"none"))}e.fn.drag=function(e,t,n){return t&&this.bind("dragstart",e),n&&this.bind("dragend",n),e?this.bind("drag",t?t:e):this.trigger("drag")};var o=e.event,u=o.special,a=u.drag={not:":input",distance:0,which:1,dragging:!1,setup:function(n){n=e.extend({distance:a.distance,which:a.which,not:a.not},n||{}),n.distance=r(n.distance),o.add(this,"mousedown",t,n),this.attachEvent&&this.attachEvent("ondragstart",i)},teardown:function(){o.remove(this,"mousedown",t),this===a.dragging&&(a.dragging=a.proxy=!1),s(this,!0),this.detachEvent&&this.detachEvent("ondragstart",i)}};u.dragstart=u.dragend={setup:function(){},teardown:function(){}}})(jQuery),function(e){function t(t){var n=t||window.event,r=[].slice.call(arguments,1),i=0,s=0,o=0,t=e.event.fix(n);return t.type="mousewheel",n.wheelDelta&&(i=n.wheelDelta/120),n.detail&&(i=-n.detail/3),o=i,void 0!==n.axis&&n.axis===n.HORIZONTAL_AXIS&&(o=0,s=-1*i),void 0!==n.wheelDeltaY&&(o=n.wheelDeltaY/120),void 0!==n.wheelDeltaX&&(s=-1*n.wheelDeltaX/120),r.unshift(t,i,s,o),(e.event.dispatch||e.event.handle).apply(this,r)}var n=["DOMMouseScroll","mousewheel"];if(e.event.fixHooks)for(var r=n.length;r;)e.event.fixHooks[n[--r]]=e.event.mouseHooks;e.event.special.mousewheel={setup:function(){if(this.addEventListener)for(var e=n.length;e;)this.addEventListener(n[--e],t,!1);else this.onmousewheel=t},teardown:function(){if(this.removeEventListener)for(var e=n.length;e;)this.removeEventListener(n[--e],t,!1);else this.onmousewheel=null}},e.fn.extend({mousewheel:function(e){return e?this.bind("mousewheel",e):this.trigger("mousewheel")},unmousewheel:function(e){return this.unbind("mousewheel",e)}})}(jQuery),function(e){function n(t){function n(e,n){var r=t.offset();r.left=e.pageX-r.left,r.top=e.pageY-r.top,n?t.zoomOut({center:r}):t.zoom({center:r})}function r(e,t){return e.preventDefault(),n(e,t<0),!1}function a(e){if(e.which!=1)return!1;var n=t.getPlaceholder().css("cursor");n&&(i=n),t.getPlaceholder().css("cursor",t.getOptions().pan.cursor),s=e.pageX,o=e.pageY}function f(e){var n=t.getOptions().pan.frameRate;if(u||!n)return;u=setTimeout(function(){t.pan({left:s-e.pageX,top:o-e.pageY}),s=e.pageX,o=e.pageY,u=null},1/n*1e3)}function l(e){u&&(clearTimeout(u),u=null),t.getPlaceholder().css("cursor",i),t.pan({left:s-e.pageX,top:o-e.pageY})}function c(e,t){var i=e.getOptions();i.zoom.interactive&&(t[i.zoom.trigger](n),t.mousewheel(r)),i.pan.interactive&&(t.bind("dragstart",{distance:10},a),t.bind("drag",f),t.bind("dragend",l))}function h(e,t){t.unbind(e.getOptions().zoom.trigger,n),t.unbind("mousewheel",r),t.unbind("dragstart",a),t.unbind("drag",f),t.unbind("dragend",l),u&&clearTimeout(u)}var i="default",s=0,o=0,u=null;t.zoomOut=function(e){e||(e={}),e.amount||(e.amount=t.getOptions().zoom.amount),e.amount=1/e.amount,t.zoom(e)},t.zoom=function(n){n||(n={});var r=n.center,i=n.amount||t.getOptions().zoom.amount,s=t.width(),o=t.height();r||(r={left:s/2,top:o/2});var u=r.left/s,a=r.top/o,f={x:{min:r.left-u*s/i,max:r.left+(1-u)*s/i},y:{min:r.top-a*o/i,max:r.top+(1-a)*o/i}};e.each(t.getAxes(),function(e,t){var n=t.options,r=f[t.direction].min,i=f[t.direction].max,s=n.zoomRange,o=n.panRange;if(s===!1)return;r=t.c2p(r),i=t.c2p(i);if(r>i){var u=r;r=i,i=u}o&&(o[0]!=null&&r<o[0]&&(r=o[0]),o[1]!=null&&i>o[1]&&(i=o[1]));var a=i-r;if(s&&(s[0]!=null&&a<s[0]||s[1]!=null&&a>s[1]))return;n.min=r,n.max=i}),t.setupGrid(),t.draw(),n.preventEvent||t.getPlaceholder().trigger("plotzoom",[t,n])},t.pan=function(n){var r={x:+n.left,y:+n.top};isNaN(r.x)&&(r.x=0),isNaN(r.y)&&(r.y=0),e.each(t.getAxes(),function(e,t){var n=t.options,i,s,o=r[t.direction];i=t.c2p(t.p2c(t.min)+o),s=t.c2p(t.p2c(t.max)+o);var u=n.panRange;if(u===!1)return;u&&(u[0]!=null&&u[0]>i&&(o=u[0]-i,i+=o,s+=o),u[1]!=null&&u[1]<s&&(o=u[1]-s,i+=o,s+=o)),n.min=i,n.max=s}),t.setupGrid(),t.draw(),n.preventEvent||t.getPlaceholder().trigger("plotpan",[t,n])},t.hooks.bindEvents.push(c),t.hooks.shutdown.push(h)}var t={xaxis:{zoomRange:null,panRange:null},zoom:{interactive:!1,trigger:"dblclick",amount:1.5},pan:{interactive:!1,cursor:"move",frameRate:20}};e.plot.plugins.push({init:n,options:t,name:"navigate",version:"1.3"})}(jQuery);