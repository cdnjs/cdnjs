/*
* jQuery Mobile Framework : scrollview plugin
* Copyright (c) 2010 Adobe Systems Incorporated - Kin Blas (jblas@adobe.com)
* Dual licensed under the MIT (MIT-LICENSE.txt) and GPL (GPL-LICENSE.txt) licenses.
* Note: Code is in draft form and is subject to change 
*/
(function($,window,document,undefined){

jQuery.widget( "mobile.scrollview", jQuery.mobile.widget, {
	options: {
		fps:               60,    // Frames per second in msecs.
		direction:         null,  // "x", "y", or null for both.
	
		scrollDuration:    2000,  // Duration of the scrolling animation in msecs.
		overshootDuration: 250,   // Duration of the overshoot animation in msecs.
		snapbackDuration:  500,   // Duration of the snapback animation in msecs.
	
		moveThreshold:     10,   // User must move this many pixels in any direction to trigger a scroll.
		moveIntervalThreshold:     150,   // Time between mousemoves must not exceed this threshold.
	
		scrollMethod:      "translate",  // "translate", "position", "scroll"
	
		startEventName:    "scrollstart",
		updateEventName:   "scrollupdate",
		stopEventName:     "scrollstop",
	
		eventType:         $.support.touch ? "touch" : "mouse",
	
		showScrollBars:    true,
		
		pagingEnabled:     false,
		delayedClickSelector: "a,input,textarea,select,button,.ui-btn",
		delayedClickEnabled: true
	},

	_makePositioned: function($ele)
	{
		if ($ele.css("position") == "static")
			$ele.css("position", "relative");
	},

	_create: function()
	{ 
		this._$clip = $(this.element).addClass("ui-scrollview-clip");
		var $child = this._$clip.children();
		if ($child.length > 1) {
			$child = this._$clip.wrapInner("<div></div>").children();
		}
		this._$view = $child.addClass("ui-scrollview-view");

		this._$clip.css("overflow", this.options.scrollMethod === "scroll" ? "scroll" : "hidden");
		this._makePositioned(this._$clip);

		this._$view.css("overflow", "hidden");

		// Turn off our faux scrollbars if we are using native scrolling
		// to position the view.

		this.options.showScrollBars = this.options.scrollMethod === "scroll" ? false : this.options.showScrollBars;

		// We really don't need this if we are using a translate transformation
		// for scrolling. We set it just in case the user wants to switch methods
		// on the fly.

		this._makePositioned(this._$view);
		this._$view.css({ left: 0, top: 0 });

		this._sx = 0;
		this._sy = 0;
	
		var direction = this.options.direction;
		this._hTracker = (direction !== "y")   ? new MomentumTracker(this.options) : null;
		this._vTracker = (direction !== "x") ? new MomentumTracker(this.options) : null;
	
		this._timerInterval = 1000/this.options.fps;
		this._timerID = 0;
	
		var self = this;
		this._timerCB = function(){ self._handleMomentumScroll(); };
	
		this._addBehaviors();
	},

	_startMScroll: function(speedX, speedY)
	{
		this._stopMScroll();
		this._showScrollBars();

		var keepGoing = false;
		var duration = this.options.scrollDuration;

		this._$clip.trigger(this.options.startEventName);

		var ht = this._hTracker;
		if (ht)
		{
			var c = this._$clip.width();
			
			// XXX: Mikko - use the real element width
			//var v = this._$view.width();
			var v = this._$view.get(0).scrollWidth;
			
			ht.start(this._sx, speedX, duration, (v > c) ? -(v - c) : 0, 0);
			keepGoing = !ht.done();
		}

		var vt = this._vTracker;
		if (vt)
		{
			var c = this._$clip.height();
			var v = this._$view.height();
			vt.start(this._sy, speedY, duration, (v > c) ? -(v - c) : 0, 0);
			keepGoing = keepGoing || !vt.done();
		}

		if (keepGoing)
			this._timerID = setTimeout(this._timerCB, this._timerInterval);
		else
			this._stopMScroll();
	},

	_stopMScroll: function()
	{
		if (this._timerID)
		{
			this._$clip.trigger(this.options.stopEventName);
			clearTimeout(this._timerID);
		}
		this._timerID = 0;

		if (this._vTracker)
			this._vTracker.reset();

		if (this._hTracker)
			this._hTracker.reset();

		this._hideScrollBars();
	},

	_handleMomentumScroll: function()
	{
		var keepGoing = false;
		var v = this._$view;

		var x = 0, y = 0;

		var vt = this._vTracker;
		if (vt)
		{
			vt.update();
			y = vt.getPosition();
			keepGoing = !vt.done();
		}

		var ht = this._hTracker;
		if (ht)
		{
			ht.update();
			x = ht.getPosition();
			keepGoing = keepGoing || !ht.done();
		}

		this._setScrollPosition(x, y);
		this._$clip.trigger(this.options.updateEventName, [ { x: x, y: y } ]);

		if (keepGoing)
			this._timerID = setTimeout(this._timerCB, this._timerInterval);	
		else
			this._stopMScroll();
	},

	_setScrollPosition: function(x, y)
	{
		this._sx = x;
		this._sy = y;

		var $v = this._$view;

		var sm = this.options.scrollMethod;

		switch (sm)
		{
			case "translate":
				setElementTransform($v, x + "px", y + "px");
				break;
			case "position":
				$v.css({left: x + "px", top: y + "px"});
				break;
			case "scroll":
				var c = this._$clip[0];
				c.scrollLeft = -x;
				c.scrollTop = -y;
				break;
		}

		var $vsb = this._$vScrollBar;
		var $hsb = this._$hScrollBar;

		if ($vsb)
		{
			var $sbt = $vsb.find(".ui-scrollbar-thumb");
			if (sm === "translate")
				setElementTransform($sbt, "0px", -y/$v.height() * $sbt.parent().height() + "px");
			else
				$sbt.css("top", -y/$v.height()*100 + "%");
		}

		if ($hsb)
		{
			var width = $v.get(0).scrollWidth;
			var $sbt = $hsb.find(".ui-scrollbar-thumb");
			if (sm === "translate")
				setElementTransform($sbt,  -x/width * $sbt.parent().width() + "px", "0px");
			else
				$sbt.css("left", -x/width*100 + "%");
		}
	},

	scrollTo: function(x, y, duration)
	{
		this._stopMScroll();
		if (!duration)
			return this._setScrollPosition(x, y);

		x = -x;
		y = -y;

		var self = this;
		var start = getCurrentTime();
		var efunc = $.easing["easeOutQuad"];
		var sx = this._sx;
		var sy = this._sy;
		var dx = x - sx;
		var dy = y - sy;
		var tfunc = function(){
			var elapsed = getCurrentTime() - start;
			if (elapsed >= duration)
			{
				self._timerID = 0;
				self._setScrollPosition(x, y);
			}
			else
			{
				var ec = efunc(elapsed/duration, elapsed, 0, 1, duration);
				self._setScrollPosition(sx + (dx * ec), sy + (dy * ec));
				self._timerID = setTimeout(tfunc, self._timerInterval);
			}
		};

		this._timerID = setTimeout(tfunc, this._timerInterval);
	},

	getScrollPosition: function()
	{
		return { x: -this._sx, y: -this._sy };
	},

	_getScrollHierarchy: function()
	{
		var svh = [];
		this._$clip.parents(".ui-scrollview-clip").each(function(){
			var d = $(this).jqmData("scrollview");
			if (d) svh.unshift(d);
		});
		return svh;
	},

	_getAncestorByDirection: function(dir)
	{
		var svh = this._getScrollHierarchy();
		var n = svh.length;
		while (0 < n--)
		{
			var sv = svh[n];
			var svdir = sv.options.direction;

			if (!svdir || svdir == dir)
				return sv;
		}
		return null;
	},

	_handleDragStart: function(e, ex, ey)
	{
		
		// Stop any scrolling of elements in our parent hierarcy.
		$.each(this._getScrollHierarchy(),function(i,sv){ sv._stopMScroll(); });
		this._stopMScroll();

		var c = this._$clip;
		var v = this._$view;

		if (this.options.delayedClickEnabled) {
			this._$clickEle = $(e.target).closest(this.options.delayedClickSelector);
		}
		this._lastX = ex;
		this._lastY = ey;
		this._doSnapBackX = false;
		this._doSnapBackY = false;
		this._speedX = 0;
		this._speedY = 0;
		this._directionLock = "";
		this._didDrag = false;

		if (this._hTracker)
		{
			var cw = parseInt(c.css("width"), 10);
			var vw = parseInt(v.css("width"), 10);
			this._maxX = cw - vw;
			
			// XXX: Mikko 
			// Seems like this is correct way to get the element width if it is not explicitly set 
			var elem = v.get(0);
			vw = elem.scrollWidth;
									
			if (this._maxX > 0) this._maxX = 0;
			if (this._$hScrollBar)
				this._$hScrollBar.find(".ui-scrollbar-thumb").css("width", (cw >= vw ? "100%" : Math.floor(cw/vw*100)+ "%"));
		}

		if (this._vTracker)
		{
			var ch = parseInt(c.css("height"), 10);
			var vh = parseInt(v.css("height"), 10);
			this._maxY = ch - vh;
			if (this._maxY > 0) this._maxY = 0;
			if (this._$vScrollBar)
				this._$vScrollBar.find(".ui-scrollbar-thumb").css("height", (ch >= vh ? "100%" : Math.floor(ch/vh*100)+ "%"));
		}

		var svdir = this.options.direction;

		this._pageDelta = 0;
		this._pageSize = 0;
		this._pagePos = 0; 

		if (this.options.pagingEnabled && (svdir === "x" || svdir === "y"))
		{
			this._pageSize = svdir === "x" ? cw : ch;
			this._pagePos = svdir === "x" ? this._sx : this._sy;
			this._pagePos -= this._pagePos % this._pageSize;
		}
		this._lastMove = 0;
		this._enableTracking();

		// If we're using mouse events, we need to prevent the default
		// behavior to suppress accidental selection of text, etc. We
		// can't do this on touch devices because it will disable the
		// generation of "click" events.
		//
		// XXX: We should test if this has an effect on links! - kin

		if (this.options.eventType == "mouse" || this.options.delayedClickEnabled)
			e.preventDefault();
		e.stopPropagation();
		
		// XXX: Mikko
		// Inform the clip element that scroll process has started
		//alert("xxx");
		this.element.trigger("scrollstart", e);
	},

	_propagateDragMove: function(sv, e, ex, ey, dir)
	{
		this._hideScrollBars();
		this._disableTracking();
		sv._handleDragStart(e,ex,ey);
		sv._directionLock = dir;
		sv._didDrag = this._didDrag;
	},

	_handleDragMove: function(e, ex, ey)
	{
		this._lastMove = getCurrentTime();

		var v = this._$view;

		var dx = ex - this._lastX;
		var dy = ey - this._lastY;
		var svdir = this.options.direction;

		if (!this._directionLock)
		{
			var x = Math.abs(dx);
			var y = Math.abs(dy);
			var mt = this.options.moveThreshold;

			if (x < mt && y < mt) {
				return false;
			}

			var dir = null;
			var r = 0;
			if (x < y && (x/y) < 0.5) {
				dir = "y";
			}
			else if (x > y && (y/x) < 0.5) {
				dir = "x";
			}

			if (svdir && dir && svdir != dir)
			{
				// This scrollview can't handle the direction the user
				// is attempting to scroll. Find an ancestor scrollview
				// that can handle the request.

				var sv = this._getAncestorByDirection(dir);
				if (sv)
				{
					this._propagateDragMove(sv, e, ex, ey, dir);
					return false;
				}
			}

			this._directionLock = svdir ? svdir : (dir ? dir : "none");
		}

		var newX = this._sx;
		var newY = this._sy;

		if (this._directionLock !== "y" && this._hTracker)
		{
			var x = this._sx;
			this._speedX = dx;
			newX = x + dx;

			// Simulate resistance.

			this._doSnapBackX = false;
			if (newX > 0 || newX < this._maxX)
			{
				if (this._directionLock === "x")
				{
					var sv = this._getAncestorByDirection("x");
					if (sv)
					{
						this._setScrollPosition(newX > 0 ? 0 : this._maxX, newY);
						this._propagateDragMove(sv, e, ex, ey, dir);
						return false;
					}
				}
				newX = x + (dx/2);
				this._doSnapBackX = true;
			}
		}

		if (this._directionLock !== "x" && this._vTracker)
		{
			var y = this._sy;
			this._speedY = dy;
			newY = y + dy;

			// Simulate resistance.

			this._doSnapBackY = false;
			if (newY > 0 || newY < this._maxY)
			{
				if (this._directionLock === "y")
				{
					var sv = this._getAncestorByDirection("y");
					if (sv)
					{
						this._setScrollPosition(newX, newY > 0 ? 0 : this._maxY);
						this._propagateDragMove(sv, e, ex, ey, dir);
						return false;
					}
				}

				newY = y + (dy/2);
				this._doSnapBackY = true;
			}

		}

		if (this.options.pagingEnabled && (svdir === "x" || svdir === "y"))
		{
			if (this._doSnapBackX || this._doSnapBackY)
				this._pageDelta = 0;
			else
			{
				var opos = this._pagePos;
				var cpos = svdir === "x" ? newX : newY;
				var delta = svdir === "x" ? dx : dy;

				this._pageDelta = (opos > cpos && delta < 0) ? this._pageSize : ((opos < cpos && delta > 0) ? -this._pageSize : 0);
			}
		}

		this._didDrag = true;
		this._lastX = ex;
		this._lastY = ey;

		this._setScrollPosition(newX, newY);

		this._showScrollBars();

		// Call preventDefault() to prevent touch devices from
		// scrolling the main window.

		// e.preventDefault();
		
		// XXX: Mikko
		this.element.trigger("scrollmove", e);
		
		return false;
	},

	_handleDragStop: function(e)
	{
		var l = this._lastMove;
		var t = getCurrentTime();
		var doScroll = l && (t - l) <= this.options.moveIntervalThreshold;

		var sx = (this._hTracker && this._speedX && doScroll) ? this._speedX : (this._doSnapBackX ? 1 : 0);
		var sy = (this._vTracker && this._speedY && doScroll) ? this._speedY : (this._doSnapBackY ? 1 : 0);

		var svdir = this.options.direction;
		if (this.options.pagingEnabled && (svdir === "x" || svdir === "y") && !this._doSnapBackX && !this._doSnapBackY)
		{
			var x = this._sx;
			var y = this._sy;
			if (svdir === "x")
				x = -this._pagePos + this._pageDelta;
			else
				y = -this._pagePos + this._pageDelta;

			this.scrollTo(x, y, this.options.snapbackDuration);
		}
		else if (sx || sy)
			this._startMScroll(sx, sy);
		else
			this._hideScrollBars();

		this._disableTracking();

		if (!this._didDrag && this.options.delayedClickEnabled && this._$clickEle.length) {
			this._$clickEle
				.trigger("mousedown")
				//.trigger("focus")
				.trigger("mouseup")
				.trigger("click");
		}

		// XXX: Mikko
		// Inform the clip element that scroll process has started
		this._$clip.trigger("scrollend", e);
		
		// If a view scrolled, then we need to absorb
		// the event so that links etc, underneath our
		// cursor/finger don't fire.
				

		return this._didDrag ? false : undefined;
	},

	_enableTracking: function()
	{
		$(document).bind(this._dragMoveEvt, this._dragMoveCB);
		$(document).bind(this._dragStopEvt, this._dragStopCB);
	},

	_disableTracking: function()
	{
		$(document).unbind(this._dragMoveEvt, this._dragMoveCB);
		$(document).unbind(this._dragStopEvt, this._dragStopCB);
	},

	_showScrollBars: function()
	{
		var vclass = "ui-scrollbar-visible";
		if (this._$vScrollBar) this._$vScrollBar.addClass(vclass);
		if (this._$hScrollBar) this._$hScrollBar.addClass(vclass);
	},

	_hideScrollBars: function()
	{
		var vclass = "ui-scrollbar-visible";
		if (this._$vScrollBar) this._$vScrollBar.removeClass(vclass);
		if (this._$hScrollBar) this._$hScrollBar.removeClass(vclass);
	},

	_addBehaviors: function()
	{
		
		var self = this;
		if (this.options.eventType === "mouse")
		{
			this._dragStartEvt = "mousedown";
			this._dragStartCB = function(e){ return self._handleDragStart(e, e.clientX, e.clientY); };

			this._dragMoveEvt = "mousemove";
			this._dragMoveCB = function(e){ return self._handleDragMove(e, e.clientX, e.clientY); };

			this._dragStopEvt = "mouseup";
			this._dragStopCB = function(e){ return self._handleDragStop(e); };
		}
		else // "touch"
		{
			this._dragStartEvt = "touchstart";
			this._dragStartCB = function(e)
			{
				var t = e.originalEvent.targetTouches[0];
				return self._handleDragStart(e, t.pageX, t.pageY);
			};

			this._dragMoveEvt = "touchmove";
			this._dragMoveCB = function(e)
			{
				var t = e.originalEvent.targetTouches[0];
				return self._handleDragMove(e, t.pageX, t.pageY);
			};

			this._dragStopEvt = "touchend";
			this._dragStopCB = function(e){ return self._handleDragStop(e); };
		}

		
		this._$view.bind(this._dragStartEvt, this._dragStartCB);

		if (this.options.showScrollBars)
		{
			var $c = this._$clip;
			var prefix = "<div class=\"ui-scrollbar ui-scrollbar-";
			var suffix = "\"><div class=\"ui-scrollbar-track\"><div class=\"ui-scrollbar-thumb\"></div></div></div>";
			if (this._vTracker)
			{
				$c.append(prefix + "y" + suffix);
				this._$vScrollBar = $c.children(".ui-scrollbar-y");
			}
			if (this._hTracker)
			{
				$c.append(prefix + "x" + suffix);
				this._$hScrollBar = $c.children(".ui-scrollbar-x");
			}
		}
	}
});

function setElementTransform($ele, x, y)
{
	var v = "translate3d(" + x + "," + y + ", 0px)";
	$ele.css({
		"-moz-transform": v,
		"-webkit-transform": v,
		"transform": v
	});
}


function MomentumTracker(options)
{
	this.options = $.extend({}, options);
	this.easing = "easeOutQuad";
	this.reset();
}

var tstates = {
	scrolling: 0,
	overshot:  1,
	snapback:  2,
	done:      3
};

function getCurrentTime() { return (new Date()).getTime(); }

$.extend(MomentumTracker.prototype, {
	start: function(pos, speed, duration, minPos, maxPos)
	{
		this.state = (speed != 0) ? ((pos < minPos || pos > maxPos) ? tstates.snapback : tstates.scrolling) : tstates.done;
		this.pos = pos;
		this.speed = speed;
		this.duration = (this.state == tstates.snapback) ? this.options.snapbackDuration : duration;
		this.minPos = minPos;
		this.maxPos = maxPos;

		this.fromPos = (this.state == tstates.snapback) ? this.pos : 0;
		this.toPos = (this.state == tstates.snapback) ? ((this.pos < this.minPos) ? this.minPos : this.maxPos) : 0;

		this.startTime = getCurrentTime();
	},

	reset: function()
	{
		this.state = tstates.done;
		this.pos = 0;
		this.speed = 0;
		this.minPos = 0;
		this.maxPos = 0;
		this.duration = 0;
	},

	update: function()
	{
		var state = this.state;
		if (state == tstates.done)
			return this.pos;

		var duration = this.duration;
		var elapsed = getCurrentTime() - this.startTime;
		elapsed = elapsed > duration ? duration : elapsed;

		if (state == tstates.scrolling || state == tstates.overshot)
		{
			var dx = this.speed * (1 - $.easing[this.easing](elapsed/duration, elapsed, 0, 1, duration));
	
			var x = this.pos + dx;
	
			var didOverShoot = (state == tstates.scrolling) && (x < this.minPos || x > this.maxPos);
			if (didOverShoot)
				x = (x < this.minPos) ? this.minPos : this.maxPos;
		
			this.pos = x;
	
			if (state == tstates.overshot)
			{
				if (elapsed >= duration)
				{
					this.state = tstates.snapback;
					this.fromPos = this.pos;
					this.toPos = (x < this.minPos) ? this.minPos : this.maxPos;
					this.duration = this.options.snapbackDuration;
					this.startTime = getCurrentTime();
					elapsed = 0;
				}
			}
			else if (state == tstates.scrolling)
			{
				if (didOverShoot)
				{
					this.state = tstates.overshot;
					this.speed = dx / 2;
					this.duration = this.options.overshootDuration;
					this.startTime = getCurrentTime();
				}
				else if (elapsed >= duration)
					this.state = tstates.done;
			}
		}
		else if (state == tstates.snapback)
		{
			if (elapsed >= duration)
			{
				this.pos = this.toPos;
				this.state = tstates.done;		
			}
			else
				this.pos = this.fromPos + ((this.toPos - this.fromPos) * $.easing[this.easing](elapsed/duration, elapsed, 0, 1, duration));
		}

		return this.pos;
	},

	done: function() { return this.state == tstates.done; },
	getPosition: function(){ return this.pos; }
});

jQuery.widget( "mobile.scrolllistview", jQuery.mobile.scrollview, {
	options: {
		direction: "y"
	},

	_create: function() {
		$.mobile.scrollview.prototype._create.call(this);
	
		// Cache the dividers so we don't have to search for them everytime the
		// view is scrolled.
		//
		// XXX: Note that we need to update this cache if we ever support lists
		//      that can dynamically update their content.
	
		this._$dividers = this._$view.find(":jqmData(role='list-divider')");
		this._lastDivider = null;
	},

	_setScrollPosition: function(x, y)
	{
		// Let the view scroll like it normally does.
	
		$.mobile.scrollview.prototype._setScrollPosition.call(this, x, y);

		y = -y;

		// Find the dividers for the list.

		var $divs = this._$dividers;
		var cnt = $divs.length;
		var d = null;
		var dy = 0;
		var nd = null;

		for (var i = 0; i < cnt; i++)
		{
			nd = $divs.get(i);
			var t = nd.offsetTop;
			if (y >= t)
			{
				d = nd;
				dy = t;
			}
			else if (d)
				break;
		}

		// If we found a divider to move position it at the top of the
		// clip view.

		if (d)
		{
			var h = d.offsetHeight;
			var mxy = (d != nd) ? nd.offsetTop : (this._$view.get(0).offsetHeight);
			if (y + h >= mxy)
				y = (mxy - h) - dy;
			else
				y = y - dy;

			// XXX: Need to convert this over to using $().css() and supporting the non-transform case.

			var ld = this._lastDivider;
			if (ld && d != ld) {
				setElementTransform($(ld), 0, 0);
			}
			setElementTransform($(d), 0, y + "px");
			this._lastDivider = d;

		}
	}
});

})(jQuery,window,document); // End Component
