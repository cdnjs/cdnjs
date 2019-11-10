/**
 * turn.js
 * turnjs.com
 *
 * Copyright (C) 2012 Emmanuel Garcia
 * MIT Licensed
 *
 **/

(function($) {

var pi = Math.PI,

	a90 = pi/2,

	has3d = ('WebKitCSSMatrix' in window && 'm11' in new WebKitCSSMatrix()),

	isTouch = 'Touch' in window,

	// Contansts used for defining each corner
	// tl *** tr
	// *       *
	// bl *** br

	corners = {
		backward: ['bl', 'tl'],
		forward: ['br', 'tr'],
		all: ['tl', 'bl', 'tr', 'br']
	},

	// Default options used by turn

	turnOptions = {

		// First page

		page: 1,
		
		// Enables shadows (Only available for desktops)

		shadows: true,

		// Duration of transition in milliseconds

		duration: 600,

		// Enables hardware acceleration

		acceleration: true
	},

	// Default options used by flip

	flipOptions = {

		// Back page
		
		back: null,

		// Corners allowed
		// backward: Activates both tl and bl corners
		// forward: Activates both tr and br corners
		// all: Activates all the corners

		corners: 'forward',
		
		// Size of the active zone of each corner

		cornerSize: 100,

		// Enables shadows (Only available for desktops)

		shadows: true,

		// Duration of transition in milliseconds

		duration: 600,

		// Enables hardware acceleration

		acceleration: true
	},
	
	// Gets basic attributes for a layer

	divAtt = function(top, left, zindex, overf) {
		return {'css': {
					position: 'absolute',
					top: top,
					left: left,
					overflow: overf || 'hidden',
					'z-index': zindex || 'auto'
					}
			};
	},

	// Gets the 2D point from a bezier curve of four points
	// This function is called in order to interpolate the position of the piece of page.

	bezier = function(p1, p2, p3, p4, t) {
		var mum1 = 1 - t,
			mum13 = mum1 * mum1 * mum1;
			mu3 = t * t * t;

		return P(Math.round(mum13*p1.x + 3*t*mum1*mum1*p2.x + 3*t*t*mum1*p3.x + mu3*p4.x),
				 Math.round(mum13*p1.y + 3*t*mum1*mum1*p2.y + 3*t*t*mum1*p3.y + mu3*p4.y));
	},
	
	// Converts an angle from degrees to radians

	rad = function(a) {
		return a/180*pi;	
	},

	// Converts an angle from radians to degrees

	deg = function(rad) {
		return rad/pi*180;	
	},

	// Gets a 2D point

	P = function(x, y) {
		return {x: x, y: y};	
	},


	translate = function(x, y, a) {
		return (has3d && a) ? ' translate3d(' + x + 'px,' + y + 'px, 0px) ' : ' translate(' + x + 'px, ' + y + 'px) ';
	},

	rotate = function(r) {
		return ' rotate(' + r + 'deg) ';	
	},

	
// Methods and properties for turn
// Methods or properties name started by underscore are private

turnMethods = {

	init: function(opt) {

		var p, pair, d = this.data(), ch = this.children(), l = ch.length;

	
		opt = $.extend({width: this.width(), height: this.height()}, turnOptions, opt);
		d.opt = opt;
		d.pageObjs = {}
		d.pages = {};
		d.pageWrap = {};
		d.pagePlace  = {};
		d.pageMv    = [];
		d.totalPages = l;

	
		this.css({position: 'relative'});

		// This will avoid the blue screen in webkit-based browsers caused by hardware acceleration

		if (has3d && !isTouch && opt.acceleration)
			this.transform(translate(0, 0, true));


		for (p = 1; p <= l; p++) {
			d.pagePlace[p] = p;
			d.pageObjs[p] = $(ch[p-1]).addClass('turn-page p'+p);
			d.pageWrap[p] = $('<div/>', {'class': 'turn-page-wrapper', css: {position: 'absolute'}}).
					attr('page', p).
						appendTo(this).
							prepend(d.pageObjs[p]);
		}

		for (p = 1; p <= l; p++) {
			pair = p%2==0;
			d.pages[p] = d.pageWrap[p].
				css((pair) ? {top: 0, left: 0} : {top: 0, right: 0}).
					children(':first').
						flip({
							next: (pair) ? p-1 : p+1,
							page : p,
							turn: this,
							duration: opt.duration,
							acceleration : opt.acceleration,
							corners: (pair) ? 'backward' : 'forward',
							back: (pair) ? d.pageObjs[p-1] : d.pageObjs[p+1],
							backShadow: opt.shadows && p!=2 && p!=l-1,
							frontShadow: opt.shadows
							}).bind('pressed', turnMethods._pressed).
								bind('released', turnMethods._released).
										bind('start', turnMethods._start).
											bind('end', turnMethods._end).
												bind('flip', turnMethods._flip);

		}

		turnMethods.page.call(this, opt.page);

		d.done = true;

		this.turn('size', opt.width, opt.height);

		return this;

	},

	size: function(width, height) {

		if (width && height) {

			var d = this.data(), pageWidth = width/2, p;

			this.css({width: width, height: height});
			
			for (p = 1; p <= d.totalPages; p++) {
				d.pageWrap[p].css({width: pageWidth, height: height});
				if (d.pages[p])
					d.pages[p].css({width: pageWidth, height: height});
			}

			this.turn('resize');

			return this;

		} else {
			
			return {width: this.width(), height: this.height()};

		}	
	},

	_visiblePages: function(page) {
	
		var page = page || this.data().page;
		return (page%2==0) ? [page, page+1] : [page-1, page];

	},

	_removeMv: function(page) {
	
		var i, d = this.data();
			
		for (i=0; i<d.pageMv.length; i++) {
			if (d.pageMv[i]==page) {
				d.pageMv.splice(i, 1);
				i--;
			}
		}
	},
	
	_addMv: function(page) {

		var d = this.data();
		turnMethods._removeMv.call(this, page);
		d.pageMv.push(page);

	},

	view: function(page) {

		var  d = this.data(), v = turnMethods._visiblePages.call(this, page);
		return [(d.pages[v[0]]) ? v[0] : 0, (d.pages[v[1]]) ? v[1] : 0];

	},

	stop: function() {
	
		var d = this.data(), p;

		d.pageMv = [];

		if (d.tpage) {
			d.page = d.tpage;
			delete d['tpage'];
		}

		this.turn('update');

		for (p=1; p<=d.totalPages; p++) {
			var dd = d.pages[p].data(), o = dd.pageFlip.opt;
			d.pages[p].flip('hideThumbIndex');
			flipMethods._moveBackPage.call(d.pages[p], null);
			d.pagePlace[o.next] = o.next;

			if (o.force) {
				o.next = (o.page%2==0) ? o.page-1 : o.page+1;
				d.pages[p].flip('setBackPage', d.pageObjs[o.next]);
				delete o['force'];
			}
		}

		return this;
	},

	page: function(page) {
	
		var d = this.data(), view = this.turn('view');

		if (pg = d.pages[page]) {

			if ( !d.done || (!view[0] || page>=view[0]) && (!view[1] || page<=view[1])) {

				d.tpage = page;
				this.turn('stop');

				this.trigger('turned', [page, pg]);

			} else {
				
				d.tpage = page;

				this.turn('stop');
			
				var current, next, newView = this.turn('view', page);

				if (view[1] && page>view[1]) {
					current = view[1];
					next = newView[0];
				} else if (view[0] && page<view[0]) {
					current = view[0];
					next = newView[1];
				}

				var o = d.pages[current].data().pageFlip.opt, p;

				d.tpage =  next;

				if (o.next!=next) {
					o.next = next; 
					d.pagePlace[o.next] = o.page;
					o.force = true;
					flipMethods._moveBackPage.call(d.pages[current], false);
					d.pages[current].flip('setBackPage', d.pageObjs[next]);
				}

					d.pages[current].flip('turnPage');

			}
		
		} else 
			return view[0] || view[1];

		return this;

	},

	next: function() {

		turnMethods._moveTo.call(this, 1);

		return this;
	
	},

	previous: function() {

		turnMethods._moveTo.call(this, -1);

		return this;

	},

	_moveTo: function(direction) {

		var i,
			d = this.data(),
			page = turnMethods._visiblePages.call(this, d.tpage || d.page)[(direction==1) ? 1 : 0],
			prev = page + direction,
			data = function(p) { return d.pages[p].data().pageFlip; };

		for (i=0; i<d.pageMv.length; i++) {
		 	if (data(d.pageMv[i]).opt.force){
				this.turn('stop');
				break;
		 	}
		}
	
		if (d.pages[prev]) {
			if (d.pages[prev])
				if (d.pages[prev].flip('moving') || d.pagePlace[page]==prev) {

					var o = data(prev).opt;

					turnMethods._removeMv.call(this, o.pageMv);
					turnMethods._addMv.call(this, page);

					d.tpage = prev;
					o.pageMv = page;
				
		
					d.pages[prev].flip('hideThumbIndex', true);
					d.pages[page].trigger('flip');
					this.turn('update');

				} else {

					d.tpage = prev;
					
					if (data(page).fwrapper.is(":visible")) {
						var o = data(page).opt;
						turnMethods._removeMv.call(this, o.pageMv);
						turnMethods._addPage.call(d.pages[page]);
					}

					d.pages[page].flip('turnPage');
				}
			}
				
	},

	_addPage: function() {

		var o = $(this).data().pageFlip.opt,
			turn = o.turn,
			dd = turn.data();

		o.pageMv = o.page;

		turnMethods._addMv.call(turn, o.pageMv);
		dd.pagePlace[o.next] = o.page;
		turn.turn('update');

	},

	_start: function(e) {
	
		var o = $(this).data().pageFlip.opt;
		e.stopPropagation();

		turnMethods._addPage.call(this);

		o.turn.trigger('start', [o.page]);

	}, 

	_end: function(e, turned) {
	
		e.stopPropagation();

		var that = $(this),
			o = that.data().pageFlip.opt, 
			turn = o.turn,
            dd = turn.data();


        if (turned || dd.tpage) {

       		if (dd.tpage==o.next || dd.pageMv.length==0) { 
      
         		dd.page = dd.tpage || o.next;
         		delete dd['tpage'];
         		turn.turn('page', dd.page);

         	}

         	if (o.force) {

         		o.next = (o.page%2==0) ? o.page-1 : o.page+1;
         		that.flip('setBackPage', turn.data().pageObjs[o.next]);
         		delete o['force'];

         	}

         } else {
         	turnMethods._removeMv.call(turn, o.pageMv);
         	turn.turn('update');
         }

        // console.trace();
		turn.trigger('end', [o.page, this]);
	
	},

	resize: function() {

		var d = this.data();

		for (p = 1; p <= d.totalPages; p++)
			d.pages[p].flip('resize', true);

	},

	calculateZ: function(mv) {

		var that = this,
			d = this.data(),
			page,
			nextPage,
			placePage,
			dpage,
			z,
			minZ =  d.totalPages,
			pagesMoving = mv.length,
		 	r = {pageZ: {}, partZ: {}, pageV: {}},

			next = function(pg) {
				return pg.data().pageFlip.opt.next;
			},

			addView = function(pg) {
				var view = that.turn('view', pg);
				if (view[0]) r.pageV[view[0]] = true;
				if (view[1]) r.pageV[view[1]] = true;
			};

		var view = this.turn('view'), pp = view[0] || view[1];

		for (var i = 0; i < pagesMoving; i++) {

			page = mv[i];
			nextPage = next(d.pages[page]);
			placePage = d.pagePlace[page];

			addView(page);
			addView(nextPage);

			dpage = (d.pagePlace[nextPage]==nextPage) ? nextPage : page;

			z = d.totalPages - Math.abs(pp-dpage);

			r.pageZ[dpage] = z;
			r.partZ[placePage] = d.totalPages*2 + Math.abs(pp-dpage);

			if (dpage%2!=0 && d.pages[dpage-1]) {
				z = z - (pagesMoving-1);
				r.pageZ[dpage-1] = z;
			} else if (dpage%2==0 && d.pages[dpage+1]) {
				z = z - (dpage-1);
				r.pageZ[dpage+1] = z;
			}

			if (z<minZ) minZ = z;

		}

		for (var pg in r.pageV) {
			if (!r.pageZ[pg]) {
				r.pageZ[pg] = --minZ;
			}
		}

		return r;
	},

	update: function() {

		var p, d = this.data();

		if (d.pageMv.length) {

			// Update motion

			var pos = this.turn('calculateZ', d.pageMv), view = this.turn('view', d.tpage), apage;

			if (d.pagePlace[view[0]]==view[0]) apage = view[0];
			else if (d.pagePlace[view[1]]==view[1]) apage = view[1];

        	for (p = 1; p <= d.totalPages; p++) { 

        		d.pageWrap[p].css({display: (pos.pageV[p]) ? '' : 'none', 'z-index': pos.pageZ[p] || 0});
        		d.pages[p].flip('z', pos.partZ[p] || null);

        		if (pos.pageV[p])
					d.pages[p].flip('resize');

        		if (d.tpage)
        			d.pages[p].flip('disable', p!=apage);
        	}
		
		} else {
        	
        	// Update static pages 

			var isFront, view = this.turn('view');

			for (p = 1; p <= d.totalPages; p++) {

				if (isFront = (p==view[0] || p==view[1]))
					d.pageWrap[p].css({'z-index': d.totalPages, display: ''});
				else if(p==view[0]-2 || p==view[1]+2)
					d.pageWrap[p].css({'z-index': d.totalPages-1, display: ''});
				else 
					d.pageWrap[p].css({'z-index': 0, display: 'none'});
			
				d.pages[p].flip('z', null);
				d.pages[p].flip('disable', !isFront);
			}

		}

	},

	_pressed: function() {

		var p, 
			that = $(this),
			d = that.data().pageFlip, 
			turn = d.opt.turn,
			page = d.opt.page,
			pages = turn.data().pages;
	
		for (p in pages)
			if (p!=page)
				pages[p].flip('disable', true);

		return this.time = new Date().getTime();

	},

	_released: function(e, p) {

		var that = $(this),
			dtime = new Date().getTime() - this.time,
			d = that.data().pageFlip;

		if (dtime<200 || p.x<0 || p.x>$(this).width()) {
			e.stopPropagation();
			d.opt.turn.data().tpage = d.opt.next;
			d.opt.turn.turn('update');
			$(that).flip('turnPage');
		}

	},

	_flip: function() {

		var o = $(this).data().pageFlip.opt;

		o.turn.trigger('turning', [o.next]);

	},

	disable: function(bool) {

		var d = this.data(),
			bool = (typeof(bool)=='undefined') ? true : bool===true;

		for (p = 1; p <= d.totalPages; p++) 
        	d.pages[p].flip('disable', bool);

	}
},


// Methods and properties for the flip page effect

flipMethods = {

	// Constructor

	init: function(opt) {

		if (opt.shadows) {
			opt.frontShadow = true;
			opt.backShadow = true;
		}

		flipMethods.setData.call(this, {opt: $.extend({}, flipOptions, opt) });
		flipMethods._addEvents.call(this);
		flipMethods._addPageWrapper.call(this);

		return this;
	},
	
	setData: function(data) {
		
		var d = this.data();
		d.pageFlip = $.extend(d.pageFlip||{}, data);

	},

	// Detects which corner was activated, this event is called right after mousedown

	_cAllowed: function() {
		
		return corners[this.data().pageFlip.opt.corners] || this.data().pageFlip.opt.corners;

	},

	_cornerActivated: function(e) {
	
		e = (isTouch) ? e.originalEvent.touches : [e];

		var corner,
			d = this.data().pageFlip,
			pos = d.parent.offset(),
			width = this.width(), 
			height = this.height(), 
			x = Math.max(0, e[0].pageX-pos.left), 
			y = Math.max(0, e[0].pageY-pos.top), 
			csz = d.opt.cornerSize,
			cAllowed = flipMethods._cAllowed.call(this);

			if (!d.opt.back || x<=0 || y<=0 || x>=width || y>=height) corner = false;
			else if (x<=csz && y<=csz) corner = 'tl';
			else if (x>=width-csz && y<=csz) corner = 'tr';
			else if (x<=csz && y>=height-csz) corner = 'bl';
			else if (x>=width-csz && y>=height-csz) corner = 'br';
			else return false;

		return (jQuery.inArray(corner, cAllowed)!=-1) ? {corner: corner, x: x, y: y} : false;

	},

	_c: function(corner, o) {

		o = o || 0; 
		return ({tl: P(o, o), tr: P(this.width()-o, o), bl: P(o, this.height()-o), br: P(this.width()-o, this.height()-o)})[corner];

	},

	_c2: function(corner) {

		return {tl: P(this.width()*2, 0), tr: P(-this.width(), 0), bl: P(this.width()*2, this.height()), br: P(-this.width(), this.height())}[corner];

	},


    z: function(z) {
   		
   		var d = this.data().pageFlip;
        d.opt['z-index'] = z;
        d.fwrapper.css({'z-index': z || parseInt(d.parent.css('z-index')) || 0});

    },

	resize: function(full) {
        var d = this.data().pageFlip,
        	width = this.width(),
        	height = this.height(),
        	size = Math.round(Math.sqrt(Math.pow(width, 2)+Math.pow(height, 2)));

        if (full) {
        	d.wrapper.css({width: size, height: size});

        	d.fwrapper.css({width: size, height: size}).
        		children(':first-child').
        			css({width: width, height: height});

        	d.fpage.css({width: height, height: width});

        	if (d.opt.frontShadow)
        		d.ashadow.css({width: height, height: width});
        	
        	if (d.opt.backShadow)
        		d.bshadow.css({width: width, height: height});
        }

        if (d.parent.is(':visible')) {
    		d.fwrapper.css({top: d.parent.offset().top,
    						left: d.parent.offset().left});

    		if (d.opt.turn)
    			d.fparent.css({top: -d.opt.turn.offset().top, left: -d.opt.turn.offset().left});
        }
       
         this.flip('z', d.opt['z-index']);

	},
    
    // Prepares the page by adding a general wrapper and another objects

	_addPageWrapper: function() {

		var att,
			d = this.data().pageFlip, 
			parent = this.parent();

		if (!d.wrapper) {

			var left = this.css('left'),
				top = this.css('top'),
				width = this.width(),
				height = this.height(),
				size = Math.round(Math.sqrt(Math.pow(width, 2)+Math.pow(height, 2)));
			

			d.parent = parent;
			d.fparent = (d.opt.turn) ? d.opt.turn.data().fparent : $('#turn-fwrappers');

			if (!d.fparent) {
				var fparent = $('<div/>').hide();
					fparent.data().flips = 0;

				if (d.opt.turn) {
					fparent.css(divAtt(-d.opt.turn.offset().top, -d.opt.turn.offset().left, 'auto', 'visible').css).appendTo(d.opt.turn);
					d.opt.turn.data().fparent = fparent;
				} else {
					fparent.css(divAtt(0, 0, 'auto', 'visible').css).attr('id', 'turn-fwrappers').appendTo($('body'));
				}

				d.fparent = fparent;
			}
		

			this.css({position: 'absolute', top: 0, left: 0, bottom: 'auto', right: 'auto'});

			d.wrapper = $('<div/>', divAtt(0, 0, this.css('z-index'))).
								appendTo(parent).
									prepend(this);

			d.fwrapper = $('<div/>', divAtt(parent.offset().top, parent.offset().left)).
								hide().
									appendTo(d.fparent);

			d.fpage = $('<div/>', {css: {cursor: 'default'}}).
					appendTo($('<div/>', divAtt(0, 0, 0, 'visible')).
								appendTo(d.fwrapper));

			if (d.opt.frontShadow)
				d.ashadow = $('<div/>', divAtt(0, 0,  1)).
					appendTo(d.fpage);

			if (d.opt.backShadow)
				d.bshadow = $('<div/>', divAtt(0, 0, 1)).
					css({'position': ''}).
						appendTo(parent);
			
			// Save data

			flipMethods.setData.call(this, d);

			// Set size
			flipMethods.resize.call(this, true);
		}

	},

	_displayCorner: function(p) {


		var that = this,
			a = 0,
			alpha = 0,
			beta,
			px,
			gradientEndPointA,
			gradientEndPointB,
			gradientStartV,
			gradientOpacity,
			mv = P(0, 0),
			df = P(0, 0),
			tr = P(0, 0),
			width = this.width(),
			height = this.height(),
			tan = Math.tan(alpha),
			d = this.data().pageFlip,
			ac = d.opt.acceleration,
			h = d.wrapper.height(),
			o = flipMethods._c.call(this, p.corner),
			top = p.corner.substr(0, 1) == 't',
			left = p.corner.substr(1, 1) == 'l',

			compute = function() {
				var rel = P((o.x) ? o.x - p.x : p.x, (o.y) ? o.y - p.y : p.y),
				    tan = (Math.atan2(rel.y, rel.x)), 
					middle;
			
				alpha = a90 - tan;
				a = deg(alpha);
				middle = P((left) ? width - rel.x/2 : p.x + rel.x/2, rel.y/2);

				var gamma = alpha - Math.atan2(middle.y, middle.x), 
					distance =  Math.max(0, Math.sin(gamma) * Math.sqrt(Math.pow(middle.x, 2) + Math.pow(middle.y, 2)));

					tr = P(distance * Math.sin(alpha), distance * Math.cos(alpha));

					if (alpha > a90) {
					
						tr.x = tr.x + Math.abs(tr.y * Math.tan(tan));
						tr.y = 0;

						if (Math.round(tr.x*Math.tan(pi-alpha)) < height) {

							p.y = Math.sqrt(Math.pow(height, 2)+2 * middle.x * rel.x);
							if (top) p.y =  height - p.y;
							return compute();

						}
					}
			

				px = Math.round(tr.y/Math.tan(alpha) + tr.x);
				if (left) px =  width - px;

				var side = (left) ? px : width - px, 
					sideX = side*Math.cos(alpha*2), sideY = side*Math.sin(alpha*2),
					gradientSize = side*Math.sin(alpha),
					endingPoint = flipMethods._c2.call(that, p.corner),
					far = Math.sqrt(Math.pow(endingPoint.x-p.x, 2)+Math.pow(endingPoint.y-p.y, 2));
					df = P(Math.round(px + (left ? -sideX : sideX)), Math.round((top) ? sideY : height - sideY));
				
					gradientOpacity = (far<width) ? far/width : 1;

				if (alpha>a90) {
				
					var beta = pi-alpha, dd = h - height/Math.sin(beta);
					mv = P(Math.round(dd*Math.cos(beta)), Math.round(dd*Math.sin(beta)));
					if (left) mv.x = - mv.x;
					if (top) mv.y = - mv.y;

				}
				
				if (d.opt.frontShadow) {

					gradientStartV = gradientSize>100 ? (gradientSize-100)/gradientSize : 0;
					gradientEndPointA = P(gradientSize*Math.sin(a90-alpha)/height*100, gradientSize*Math.cos(a90-alpha)/width*100);
				
					if (top) gradientEndPointA.y = 100-gradientEndPointA.y;
					if (left) gradientEndPointA.x = 100-gradientEndPointA.x;
				}

				if (d.opt.backShadow) {

					gradientEndPointB = P(gradientSize*Math.sin(alpha)/width*100, gradientSize*Math.cos(alpha)/height*100);
					if (!left) gradientEndPointB.x = 100-gradientEndPointB.x;
					if (!top) gradientEndPointB.y = 100-gradientEndPointB.y;
				}

				tr.x = Math.round(tr.x);
				tr.y = Math.round(tr.y);

				return true;
			},

			transform = function(tr, c, x, a) {
			
				var f = ['0', 'auto'], mvW = (width-h)*x[0]/100, mvH = (height-h)*x[1]/100, x = x[0] + '% ' + x[1] + '%',
					v = {left: f[c[0]], top: f[c[1]], right: f[c[2]], bottom: f[c[3]]};

				that.css(v).transform(rotate(a) + translate(tr.x, tr.y, ac), x);

				d.fpage.parent().css(v);
				d.wrapper.transform(translate(-tr.x + mvW, -tr.y + mvH, ac) + rotate(-a), x);

				d.fwrapper.transform(translate(-tr.x + mv.x + mvW, -tr.y + mv.y + mvH, ac) + rotate(-a), x);
				d.fpage.parent().transform(rotate(a) + translate(tr.x + df.x - mv.x, tr.y + df.y - mv.y, ac), x);

				if (d.opt.frontShadow)
					d.ashadow.css({'background-image':
									'-webkit-gradient(linear, ' + (left?100:0)+'% '+(top?100:0)+'%, ' + gradientEndPointA.x + '% ' + gradientEndPointA.y + '%, color-stop(' + gradientStartV + ',rgba(0,0,0,0)), color-stop(' + (((1-gradientStartV)*0.8)+gradientStartV) + ',rgba(0,0,0,'+(0.2*gradientOpacity)+')), to(rgba(255,255,255,'+(0.2*gradientOpacity)+')) )'});
			
		
				if (d.opt.backShadow)
					d.bshadow.css({'background-image': 
									'-webkit-gradient(linear, ' + (left?0:100)+'% '+(top?0:100)+'%, ' + gradientEndPointB.x + '% ' + gradientEndPointB.y + '%,  color-stop(0.8,rgba(0,0,0,0)), color-stop(1, rgba(0,0,0,'+(0.2*gradientOpacity)+')), to(rgba(0,0,0,0)) )'});

			};


		switch (p.corner) {
			case 'tl' :
				p.x = Math.max(p.x, 1);

				compute();

				transform(tr, [1,0,0,1], [100, 0], a);
				d.fpage.transform(translate(-height, -width, ac) + rotate(90-a*2) , '100% 100%');
				d.opt.back.transform(rotate(90) + translate(0, -height, ac), '0% 0%');

			break;
			case 'tr' :
				p.x = Math.min(p.x, width-1);

				compute();

				transform(P(-tr.x, tr.y), [0,0,0,1], [0, 0], -a);
				d.fpage.transform(translate(0, -width, ac) + rotate(-90+a*2) , '0% 100%');
				d.opt.back.transform(rotate(270) + translate(-width, 0, ac), '0% 0%');

			break;
			case 'bl' :
				p.x = Math.max(p.x, 1);

				compute();

				transform(P(tr.x, -tr.y), [1,1,0,0], [100, 100], -a);
				d.fpage.transform(translate(-height, 0, ac) + rotate(-90+a*2 ), '100% 0%');
				d.opt.back.transform(rotate(270) + translate(-width, 0, ac), '0% 0%');

			break;
			case 'br' :
				p.x = Math.min(p.x, width-1);
				
				compute();

				transform(P(-tr.x, -tr.y), [0,1,1,0], [0, 100], a);
				d.fpage.transform(rotate(90-a*2), '0% 0%');
				d.opt.back.transform(rotate(90) + translate(0, -height, ac), '0% 0%');

			break;
		}

		d.p = p;
	
	},

	setBackPage: function(back) {

		var d = this.data().pageFlip;
		d.opt.back = back;
		d.backParent = back.parent();

	},

	_moveBackPage: function(bool) {

		var d = this.data().pageFlip;

		if (d.opt.back) {

			// Chrome 17-18 beta bug
			// http://code.google.com/p/chromium/issues/detail?id=114617

			var user = navigator.userAgent;

			if (user.indexOf('Chrome/17.')!=-1 || user.indexOf('Chrome/18.')!=-1) {
				var bg = d.opt.back.css('background-image');
				d.opt.back.css({'background-image': ''}).css({'background-image': bg});
			}
			// end

			if (bool) {
				if (!( (d.ashadow? '1' : '0') in d.fpage.children())) {
					flipMethods.setData.call(this, {backParent: d.opt.back.parent() });
					d.fpage.prepend(d.opt.back);
				}
			} else {
				if (d.backParent)
					d.backParent.prepend(d.opt.back);

			}
		}	

	},

	_showThumbIndex: function(c, interpolate) {

		var dd = this.data(),
			d = dd.pageFlip;

		if (d.opt.back) {

			if (interpolate) {

				var that = this, p = d.p || flipMethods._c.call(this, c.corner, 1);

				this.animatef({from: [p.x, p.y], to:[c.x, c.y], duration: 500, frame: function(v) { 
					flipMethods._displayCorner.call(that, {corner: c.corner, x: v[0], y: v[1]});
				}});

			} else	{

				flipMethods._displayCorner.call(this, c);
				if (dd.effect && !dd.effect.turning)
					this.animatef(false);

			}


			if (!d.fwrapper.is(':visible')) {
				d.fparent.show().data().flips++;

				flipMethods._moveBackPage.call(this, true);
				d.fwrapper.show();

				if (d.opt.backShadow)
					d.bshadow.show();

				this.trigger('start');
			}
		}

	},

	hide: function() {

		var d = this.data().pageFlip;

		if ((--d.fparent.data().flips)==0)
			d.fparent.hide();

		this.css({left: 0, top: 0, right: 'auto', bottom: 'auto'}).transform('', '0% 100%');

		d.wrapper.transform('', '0% 100%');
		d.fwrapper.hide();

		if (d.opt.backShadow)
			d.bshadow.hide();

		d.opt.back.transform('', '0% 0%');

	},

	hideThumbIndex: function(interpolate) {

		var d = this.data().pageFlip;

		if (!d.p) return;

		var that = this,
			p1 = d.p,
			hide = function() {
				d.p = null;
				that.flip('hide');
				that.trigger('end', [false]);
			};

		if (interpolate) {
			var p2, p3, p4 = flipMethods._c.call(this, p1.corner), top = (p1.corner.substr(0,1)=='t'), 
				delta = Math.abs((p1.y-p4.y)/2);
				
			p2 = P(p1.x, p1.y+delta);
			p3 = P(p4.x, (top)? p4.y+delta : p4.y-delta);
		
			this.animatef({
				from: 0,
				to: 1, 
				frame: function(v) {
					var np = bezier(p1, p2, p3, p4, v);
					np.corner = p1.corner;
					flipMethods._displayCorner.call(that, np);
				},
				complete: hide,
				duration: 800,
				hiding: true
				});

		} else {
			this.animatef(false);
			hide();
		}
	},

	turnPage: function() {
		
		var that = this,
			d = this.data().pageFlip,
			corner = (d.cornerActivated) ? d.cornerActivated.corner : flipMethods._cAllowed.call(this)[0],
			p1 = d.p || flipMethods._c.call(this, corner), 
			p4 = flipMethods._c2.call(this, corner);

	
			this.trigger('flip');

			this.animatef({
				from: 0,
				to: 1,
				frame: function(v) {

					var np = bezier(p1, p1, p4, p4, v);
					np.corner = corner;
					flipMethods._showThumbIndex.call(that, np);

				},
				
				complete: function() {

					that.trigger('end', [true]);

				},
				duration: d.opt.duration,
				turning: true
			});

			d.cornerActivated = null;
	},

	moving: function() {

		return 'effect' in this.data();	
	
	},

	isTurning: function() {

		return (this.flip('moving') && this.data().effect.turning);
	
	},

	_addEvents: function() {
	
		var that = this, 
			events = (isTouch) ? {start: 'touchstart', move: 'touchmove', end: 'touchend'} : {start: 'mousedown', move: 'mousemove', end: 'mouseup'};

			$(document).bind(events.start, function() { 
				return flipMethods._eventStart.apply(that, arguments); 
			}).
			bind(events.move, function() {
				flipMethods._eventMove.apply(that, arguments);
			}).
			bind(events.end, function() {
				flipMethods._eventEnd.apply(that, arguments);
			});

	},

	_eventStart: function(e) {

		var d = this.data().pageFlip;

		if (!d.disabled && !this.flip('isTurning')) {
			d.cornerActivated = flipMethods._cornerActivated.call(this, e);
			if (d.cornerActivated) {
				flipMethods._moveBackPage.call(this, true);
				this.trigger('pressed', [d.p]);	
				return false;
			}
		}

	},

	_eventMove: function(e) {

		var dd = this.data(), d = dd.pageFlip, e = (isTouch) ? e.originalEvent.touches : [e];

		if (!d.disabled)
			if (d.cornerActivated) {

				var pos = d.parent.offset();
				flipMethods._showThumbIndex.call(this, {corner: d.cornerActivated.corner, x: e[0].pageX-pos.left,  y: e[0].pageY-pos.top});
			
			} else if (!dd.effect && !isTouch) {
			
				if (corner = flipMethods._cornerActivated.call(this, e[0])){
					var c = flipMethods._c.call(this, corner.corner, d.opt.cornerSize/2);
					flipMethods._showThumbIndex.call(this, {corner: corner.corner, x: c.x, y: c.y}, true);
				} else
					flipMethods.hideThumbIndex.call(this, true);

			}
	},

	_eventEnd: function() {

		var d = this.data().pageFlip;

		if (!d.disabled && d.cornerActivated) {
			var event = jQuery.Event('released');
			this.trigger(event, [d.p]);
			if (!event.isPropagationStopped())
				flipMethods.hideThumbIndex.call(this, true);
		}

		d.cornerActivated = null;

	},

	disable: function(disable) {

		flipMethods.setData.call(this, {'disabled': disable});

	}
},

cla = function(that, methods, args) {

	if (!args[0] || typeof(args[0])=='object')
		return methods.init.apply(that, args);
	else if(methods[args[0]] && args[0].toString().substr(0, 1)!='_')
		return methods[args[0]].apply(that, Array.prototype.slice.call(args, 1));
	else 
		throw args[0] + ' is an invalid value';
}

$.extend($.fn, {

	flip: function(req, opt) {
		return cla(this, flipMethods, arguments);
	},

	turn: function(req) {
		return cla(this, turnMethods, arguments);
	},

	transform: function(t, o) {
		if (o) 
			this.css({'transform-origin': o, '-moz-transform-origin': o, '-o-transform-origin': o, '-webkit-transform-origin': o, '-ms-transform-origin': o});
	
		return this.css({'transform': t, '-moz-transform': t, '-o-transform': t, '-webkit-transform': t, '-ms-transform': t });
	},

 	animatef: function(p) {

 		var d = this.data();

 		if (d.effect)
 			clearInterval(d.effect.handle);

 		if (p) {

	 		if (!p.to.length) p.to = [p.to];
	 		if (!p.from.length) p.from = [p.from];
	 		if (!p.easing) p.easing = function (x, t, b, c, d) { return c * Math.sqrt(1 - (t=t/d-1)*t) + b; };

	 		var j,
	 			diff = [],
	 			len = p.to.length,
	 			that = this,
	 			fps = p.fps || 30,
	 			time = - fps,
	 			f = function() { 
	 				var j, v = [];
	 				time = Math.min(p.duration, time + fps);
	
	 				for (j = 0; j < len; j++)
	 					v.push(p.easing(1, time, p.from[j], diff[j], p.duration));
	 			
	 				p.frame((len==1) ? v[0] : v);

	 				if (time==p.duration) {
	 					clearInterval(d.effect.handle);
	 					delete d['effect'];
	 					that.data(d);
	 					if (p.complete) 
	 						p.complete();
	 				}
		 		};
		 	
		 	for (j = 0; j < len; j++)
		 		diff.push(p.to[j] - p.from[j]);

		 	d.effect = p;
		 	d.effect.handle = setInterval(f, fps);
			this.data(d);
			f();
		} else {
			delete d['effect'];
		}
 	}
});

$.has3d = has3d;
$.isTouch = isTouch;

})(jQuery);