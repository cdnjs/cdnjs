/**
 * turn.js 3rd release
 * www.turnjs.com
 *
 * Copyright (C) 2012, Emmanuel Garcia.
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions
 * are met:
 *
 * 1. Redistributions of source code must retain the above copyright
 * notice, this list of conditions and the following disclaimer.
 *
 * 2. Any redistribution, use, or modification is done solely for personal 
 * benefit and not for any commercial purpose or for monetary gain.
 * 
 **/

(function($) {

'use strict';

var has3d,

	vendor ='',

	PI = Math.PI,

	A90 = PI/2,

	isTouch = 'Touch' in window,

	events = (isTouch) ? {start: 'touchstart', move: 'touchmove', end: 'touchend'}
			: {start: 'mousedown', move: 'mousemove', end: 'mouseup'},

	// Contansts used for each corner
	// tl * tr
	// *     *
	// bl * br

	corners = {
		backward: ['bl', 'tl'],
		forward: ['br', 'tr'],
		all: ['tl', 'bl', 'tr', 'br']
	},

	displays = ['single', 'double'],

	// Default options

	turnOptions = {

		// First page

		page: 1,
		
		// Enables gradients

		gradients: true,

		// Duration of transition in milliseconds

		duration: 600,

		// Enables hardware acceleration

		acceleration: true,

		// Display

		display: 'double',

		// Events

		when: null
	},

	flipOptions = {

		// Back page
		
		folding: null,

		// Corners
		// backward: Activates both tl and bl corners
		// forward: Activates both tr and br corners
		// all: Activates all the corners

		corners: 'forward',
		
		// Size of the active zone of each corner

		cornerSize: 100,

		// Enables gradients

		gradients: true,

		// Duration of transition in milliseconds

		duration: 600,

		// Enables hardware acceleration

		acceleration: true
	},

	// Number of pages in the DOM, minimum value: 6

	pagesInDOM = 6,
	
	pagePosition = {0: {top: 0, left: 0, right: 'auto', bottom: 'auto'},
					1: {top: 0, right: 0, left: 'auto', bottom: 'auto'}},

	// Gets basic attributes for a layer

	divAtt = function(top, left, zIndex, overf) {
		return {'css': {
					position: 'absolute',
					top: top,
					left: left,
					'overflow': overf || 'hidden',
					'z-index': zIndex || 'auto'
					}
			};
	},

	// Gets a 2D point from a bezier curve of four points

	bezier = function(p1, p2, p3, p4, t) {
		var mum1 = 1 - t,
			mum13 = mum1 * mum1 * mum1,
			mu3 = t * t * t;

		return point2D(Math.round(mum13*p1.x + 3*t*mum1*mum1*p2.x + 3*t*t*mum1*p3.x + mu3*p4.x),
						Math.round(mum13*p1.y + 3*t*mum1*mum1*p2.y + 3*t*t*mum1*p3.y + mu3*p4.y));
	},
	
	// Converts an angle from degrees to radians

	rad = function(degrees) {
		return degrees/180*PI;
	},

	// Converts an angle from radians to degrees

	deg = function(radians) {
		return radians/PI*180;
	},

	// Gets a 2D point

	point2D = function(x, y) {
		return {x: x, y: y};
	},

	// Returns the traslate value

	translate = function(x, y, use3d) {
		return (has3d && use3d) ? ' translate3d(' + x + 'px,' + y + 'px, 0px) ' : ' translate(' + x + 'px, ' + y + 'px) ';
	},

	// Returns the rotation value

	rotate = function(degrees) {
		return ' rotate(' + degrees + 'deg) ';
	},

	// Checks if a property belongs to an object

	has = function(property, object) {
		return Object.prototype.hasOwnProperty.call(object, property);
	},

	// Gets the CSS3 vendor prefix

	getPrefix = function() {
		var vendorPrefixes = ['Moz','Webkit','Khtml','O','ms'],
			len = vendorPrefixes.length,
			vendor = '';

		while (len--)
			if ((vendorPrefixes[len] + 'Transform') in document.body.style)
				vendor='-'+vendorPrefixes[len].toLowerCase()+'-';

		return vendor;
	},

	// Adds gradients

	gradient = function(obj, p0, p1, colors, numColors) {
	
		var j, cols = [];

		if (vendor=='-webkit-') {
		
			for (j = 0; j<numColors; j++)
					cols.push('color-stop('+colors[j][0]+', '+colors[j][1]+')');
			
			obj.css({'background-image': '-webkit-gradient(linear, '+p0.x+'% '+p0.y+'%,  '+p1.x+'% '+p1.y+'%, '+ cols.join(',') +' )'});

		} else {

			// This procedure makes the gradients for non-webkit browsers
			// It will be reduced to one unique way for gradients in next versions
			
			p0 = {x:p0.x/100 * obj.width(), y:p0.y/100 * obj.height()};
			p1 = {x:p1.x/100 * obj.width(), y:p1.y/100 * obj.height()};

			var dx = p1.x-p0.x,
				dy = p1.y-p0.y,
				angle = Math.atan2(dy, dx),
				angle2 = angle - Math.PI/2,
				diagonal = Math.abs(obj.width()*Math.sin(angle2)) + Math.abs(obj.height()*Math.cos(angle2)),
				gradientDiagonal = Math.sqrt(dy*dy + dx*dx),
				corner = point2D((p1.x<p0.x) ? obj.width() : 0, (p1.y<p0.y) ? obj.height() : 0),
				slope = Math.tan(angle),
				inverse = -1/slope,
				x = (inverse*corner.x - corner.y - slope*p0.x + p0.y) / (inverse-slope),
				c = {x: x, y: inverse*x - inverse*corner.x + corner.y},
				segA = (Math.sqrt( Math.pow(c.x-p0.x,2) + Math.pow(c.y-p0.y,2)));

				for (j = 0; j<numColors; j++)
					cols.push(' '+colors[j][1]+' '+(( segA + gradientDiagonal*colors[j][0] )*100/diagonal)+'%');
		
				obj.css({'background-image': vendor+'linear-gradient(' + (-angle) + 'rad,' + cols.join(',') + ')'});
		}
	},

turnMethods = {

	// Singleton constructor
	// $('#selector').turn([options]);

	init: function(opts) {

		// Define constants
		if (has3d===undefined) {
			has3d = 'WebKitCSSMatrix' in window || 'MozPerspective' in document.body.style;
			vendor = getPrefix();
		}

		var i, data = this.data(), ch = this.children();
	
		opts = $.extend({width: this.width(), height: this.height()}, turnOptions, opts);
		data.opts = opts;
		data.pageObjs = {};
		data.pages = {};
		data.pageWrap = {};
		data.pagePlace = {};
		data.pageMv = [];
		data.totalPages = opts.pages || 0;

		if (opts.when)
			for (i in opts.when)
				if (has(i, opts.when))
					this.bind(i, opts.when[i]);


		this.css({position: 'relative', width: opts.width, height: opts.height});

		this.turn('display', opts.display);

		if (has3d && !isTouch && opts.acceleration)
			this.transform(translate(0, 0, true));
	
		for (i = 0; i<ch.length; i++)
			this.turn('addPage', ch[i], i+1);
	
		this.turn('page', opts.page);

        // allow setting active corners as an option
        corners = $.extend({}, corners, opts.corners);

		// Event listeners

		$(this).bind(events.start, function(e) {
			for (var page in data.pages)
				if (has(page, data.pages) && flipMethods._eventStart.call(data.pages[page], e)===false)
					return false;
		});
			
		$(document).bind(events.move, function(e) {
			for (var page in data.pages)
				if (has(page, data.pages))
					flipMethods._eventMove.call(data.pages[page], e);
		}).
		bind(events.end, function(e) {
			for (var page in data.pages)
				if (has(page, data.pages))
					flipMethods._eventEnd.call(data.pages[page], e);

		});

		data.done = true;

		return this;
	},

	// Adds a page from external data

	addPage: function(element, page) {

		var incPages = false,
			data = this.data(),
			lastPage = data.totalPages+1;

		if (page) {
			if (page==lastPage) {
				page = lastPage;
				incPages = true;
			} else if (page>lastPage)
				throw new Error ('It is impossible to add the page "'+page+'", the maximum value is: "'+lastPage+'"');

		} else {
			page = lastPage;
			incPages = true;
		}

		if (page>=1 && page<=lastPage) {

			// Stop animations
			if (data.done) this.turn('stop');

			// Move pages if it's necessary
			if (page in data.pageObjs)
				turnMethods._movePages.call(this, page, 1);

			// Update number of pages
			if (incPages)
				data.totalPages = lastPage;

			// Add element
			data.pageObjs[page] = $(element).addClass('turn-page p' + page);

			// Add page
			turnMethods._addPage.call(this, page);

			// Update view
			if (data.done)
				this.turn('update');

			turnMethods._removeFromDOM.call(this);
		}

		return this;
	},

	// Adds a page from internal data

	_addPage: function(page) {
		
		var data = this.data(),
			element = data.pageObjs[page];

		if (element)
			if (turnMethods._necessPage.call(this, page)) {
				
				if (!data.pageWrap[page]) {

					var pageWidth = (data.display=='double') ? this.width()/2 : this.width(),
						pageHeight = this.height();

					element.css({width:pageWidth, height:pageHeight});

					// Place
					data.pagePlace[page] = page;

					// Wrapper
					data.pageWrap[page] = $('<div/>', {'class': 'turn-page-wrapper',
													page: page,
													css: {position: 'absolute',
													overflow: 'hidden',
													width: pageWidth,
													height: pageHeight}}).
													css(pagePosition[(data.display=='double') ? page%2 : 0]);

					// Append to this
					this.append(data.pageWrap[page]);

					// Move data.pageObjs[page] (element) to wrapper
					data.pageWrap[page].prepend(data.pageObjs[page]);
				}

				// If the page is in the current view, create the flip effect
				if (!page || turnMethods._setPageLoc.call(this, page)==1)
					turnMethods._makeFlip.call(this, page);
				
			} else {

				// Place
				data.pagePlace[page] = 0;

				// Remove element from the DOM
				if (data.pageObjs[page])
					data.pageObjs[page].remove();

			}

	},

	// Checks if a page is in memory
	
	hasPage: function(page) {

		return page in this.data().pageObjs;
	
	},

	// Prepares the flip effect for a page

	_makeFlip: function(page) {

		var data = this.data();

		if (!data.pages[page] && data.pagePlace[page]==page) {

			var single = data.display=='single',
				even = page%2;
			
			data.pages[page] = data.pageObjs[page].
								css({width: (single) ? this.width() : this.width()/2, height: this.height()}).
								flip({page: page,
									next: (single && page === data.totalPages) ? page -1 : ((even || single) ? page+1 : page-1),
									turn: this,
									duration: data.opts.duration,
									acceleration : data.opts.acceleration,
									corners: (single) ? 'all' : ((even) ? 'forward' : 'backward'),
									backGradient: data.opts.gradients,
									frontGradient: data.opts.gradients
									}).
									flip('disable', data.disabled).
									bind('pressed', turnMethods._pressed).
									bind('released', turnMethods._released).
									bind('start', turnMethods._start).
									bind('end', turnMethods._end).
									bind('flip', turnMethods._flip);
		}
		return data.pages[page];
	},

	// Makes pages within a range

	_makeRange: function() {

		var page,
			data = this.data(),
			range = this.turn('range');

			for (page = range[0]; page<=range[1]; page++)
				turnMethods._addPage.call(this, page);

	},

	// Returns a range of `pagesInDOM` pages that should be in the DOM
	// Example:
	// - page of the current view, return true
	// * page is in the range, return true
	// 0 page is not in the range, return false
	//
	// 1 2-3 4-5 6-7 8-9 10-11 12-13
	//    **  **  --   **  **

	range: function(page) {

		var remainingPages, left, right,
			data = this.data();
			page = page || data.tpage || data.page;
			var view = turnMethods._view.call(this, page);

			if (page<1 || page>data.totalPages)
				throw new Error ('"'+page+'" is not a page for range');
		
			view[1] = view[1] || view[0];
			
			if (view[0]>=1 && view[1]<=data.totalPages) {

				remainingPages = Math.floor((pagesInDOM-2)/2);

				if (data.totalPages-view[1] > view[0]) {
					left = Math.min(view[0]-1, remainingPages);
					right = 2*remainingPages-left;
				} else {
					right = Math.min(data.totalPages-view[1], remainingPages);
					left = 2*remainingPages-right;
				}

			} else {
				left = pagesInDOM-1;
				right = pagesInDOM-1;
			}

			return [Math.max(1, view[0]-left), Math.min(data.totalPages, view[1]+right)];

	},

	// Detects if a page is within the range of `pagesInDOM` from the current view

	_necessPage: function(page) {
		
		if (page===0)
			return true;

		var range = this.turn('range');

		return page>=range[0] && page<=range[1];
		
	},

	// Releases memory by removing pages from the DOM

	_removeFromDOM: function() {

		var page, data = this.data();

		for (page in data.pageWrap)
			if (has(page, data.pageWrap) && !turnMethods._necessPage.call(this, page))
				turnMethods._removePageFromDOM.call(this, page);
		

	},

	// Removes a page from DOM and its internal references

	_removePageFromDOM: function(page) {

		var data = this.data();

		if (data.pages[page]) {
			var dd = data.pages[page].data();
			if (dd.f && dd.f.fwrapper)
				dd.f.fwrapper.remove();
			data.pages[page].remove();
			delete data.pages[page];
		}

		if (data.pageObjs[page])
			data.pageObjs[page].remove();

		if (data.pageWrap[page]) {
			data.pageWrap[page].remove();
			delete data.pageWrap[page];
		}

		delete data.pagePlace[page];

	},

	// Removes a page

	removePage: function(page) {

		var data = this.data();

		if (data.pageObjs[page]) {
			// Stop animations
			this.turn('stop');

			// Remove `page`
			turnMethods._removePageFromDOM.call(this, page);
			delete data.pageObjs[page];

			// Move the pages behind `page`
			turnMethods._movePages.call(this, page, -1);

			// Resize the size of this magazine
			data.totalPages = data.totalPages-1;
			turnMethods._makeRange.call(this);

			// Check the current view
			if (data.page>data.totalPages)
				this.turn('page', data.totalPages);
		}

		return this;
	
	},

	// Moves pages

	_movePages: function(from, change) {

		var page,
			data = this.data(),
			single = data.display=='single',
			move = function(page) {

				var next = page + change,
					odd = next%2;

				if (data.pageObjs[page])
					data.pageObjs[next] = data.pageObjs[page].removeClass('page' + page).addClass('page' + next);

				if (data.pagePlace[page] && data.pageWrap[page]) {
					data.pagePlace[next] = next;
					data.pageWrap[next] = data.pageWrap[page].css(pagePosition[(single) ? 0 : odd]).attr('page', next);
					
					if (data.pages[page])
						data.pages[next] = data.pages[page].flip('options', {
							page: next,
							next: (single || odd) ? next+1 : next-1,
							corners: (single) ? 'all' : ((odd) ? 'forward' : 'backward')
						});

					if (change) {
						delete data.pages[page];
						delete data.pagePlace[page];
						delete data.pageObjs[page];
						delete data.pageWrap[page];
						delete data.pageObjs[page];
					}
			}
		};

		if (change>0)
			for (page=data.totalPages; page>=from; page--) move(page);
		else
			for (page=from; page<=data.totalPages; page++) move(page);

	},

	// Sets or Gets the display mode

	display: function(display) {

		var data = this.data(),
			currentDisplay = data.display;

		if (display) {

			if ($.inArray(display, displays)==-1)
				throw new Error ('"'+display + '" is not a value for display');
			
			if (display=='single') {
				if (!data.pageObjs[0]) {
					this.turn('stop').
						css({'overflow': 'hidden'});
					data.pageObjs[0] = $('<div />', {'class': 'turn-page p-temporal'}).
									css({width: this.width(), height: this.height()}).
										appendTo(this);
				}
			} else {
				if (data.pageObjs[0]) {
					this.turn('stop').
						css({'overflow': ''});
					data.pageObjs[0].remove();
					delete data.pageObjs[0];
				}
			}

			data.display = display;

			if (currentDisplay) {
				var size = this.turn('size');
				turnMethods._movePages.call(this, 1, 0);
				this.turn('size', size.width, size.height).
						turn('update');
			}

			return this;

		} else
			return currentDisplay;
	
	},

	// Detects if the pages are being animated

	animating: function() {

		return this.data().pageMv.length>0;

	},

	// Disables and enables the effect

	disable: function(bool) {

		var page,
			data = this.data(),
			view = this.turn('view');

			data.disabled = bool===undefined || bool===true;

		for (page in data.pages)
			if (has(page, data.pages))
				data.pages[page].flip('disable', bool ? $.inArray(page, view) : false );

		return this;

	},

	// Gets and sets the size

	size: function(width, height) {

		if (width && height) {

			var data = this.data(), pageWidth = (data.display=='double') ? width/2 : width, page;

			this.css({width: width, height: height});

			if (data.pageObjs[0])
				data.pageObjs[0].css({width: pageWidth, height: height});
			
			for (page in data.pageWrap) {
				if (!has(page, data.pageWrap)) continue;
				data.pageObjs[page].css({width: pageWidth, height: height});
				data.pageWrap[page].css({width: pageWidth, height: height});
				if (data.pages[page])
					data.pages[page].css({width: pageWidth, height: height});
			}

			this.turn('resize');

			return this;

		} else {
			
			return {width: this.width(), height: this.height()};

		}
	},

	// Resizes each page

	resize: function() {

		var page, data = this.data();

		if (data.pages[0]) {
			data.pageWrap[0].css({left: -this.width()});
			data.pages[0].flip('resize', true);
		}

		for (page = 1; page <= data.totalPages; page++)
			if (data.pages[page])
				data.pages[page].flip('resize', true);


	},

	// Removes an animation from the cache

	_removeMv: function(page) {

		var i, data = this.data();
			
		for (i=0; i<data.pageMv.length; i++)
			if (data.pageMv[i]==page) {
				data.pageMv.splice(i, 1);
				return true;
			}

		return false;

	},

	// Adds an animation to the cache
	
	_addMv: function(page) {

		var data = this.data();

		turnMethods._removeMv.call(this, page);
		data.pageMv.push(page);

	},

	// Gets indexes for a view

	_view: function(page) {
	
		var data = this.data();
		page = page || data.page;

		if (data.display=='double')
			return (page%2) ? [page-1, page] : [page, page+1];
		else
			return [page];

	},

	// Gets a view

	view: function(page) {

		var data = this.data(), view = turnMethods._view.call(this, page);

		return (data.display=='double') ? [(view[0]>0) ? view[0] : 0, (view[1]<=data.totalPages) ? view[1] : 0]
				: [(view[0]>0 && view[0]<=data.totalPages) ? view[0] : 0];

	},

	// Stops animations

	stop: function(ok) {

		var i, opts, data = this.data(), pages = data.pageMv;

		data.pageMv = [];

		if (data.tpage) {
			data.page = data.tpage;
			delete data['tpage'];
		}

		for (i in pages) {
			if (!has(i, pages)) continue;
			opts = data.pages[pages[i]].data().f.opts;
			flipMethods._moveFoldingPage.call(data.pages[pages[i]], null);
			data.pages[pages[i]].flip('hideFoldedPage');
			data.pagePlace[opts.next] = opts.next;
			
			if (opts.force) {
				opts.next = (opts.page%2===0) ? opts.page-1 : opts.page+1;
				delete opts['force'];
			}

		}

		this.turn('update');

		return this;
	},

	// Gets and sets the number of pages

	pages: function(pages) {

		var data = this.data();

		if (pages) {
			if (pages<data.totalPages) {

				for (var page = pages+1; page<=data.totalPages; page++)
					this.turn('removePage', page);

				if (this.turn('page')>pages)
					this.turn('page', pages);
			}

			data.totalPages = pages;

			return this;
		} else
			return data.totalPages;

	},

	// Sets a page without effect

	_fitPage: function(page, ok) {
		
		var data = this.data(), newView = this.turn('view', page);
		
		if (data.page!=page) {
			this.trigger('turning', [page, newView]);
			if ($.inArray(1, newView)!=-1) this.trigger('first');
			if ($.inArray(data.totalPages, newView)!=-1) this.trigger('last');
		}

		if (!data.pageObjs[page])
			return;

		data.tpage = page;

		this.turn('stop', ok);
		turnMethods._removeFromDOM.call(this);
		turnMethods._makeRange.call(this);
		this.trigger('turned', [page, newView]);

	},
	
	// Turns to a page

	_turnPage: function(page) {

		var current, next,
			data = this.data(),
			view = this.turn('view'),
			newView = this.turn('view', page);
	
		if (data.page!=page) {
			this.trigger('turning', [page, newView]);
			if ($.inArray(1, newView)!=-1) this.trigger('first');
			if ($.inArray(data.totalPages, newView)!=-1) this.trigger('last');
		}

		if (!data.pageObjs[page])
			return;

		data.tpage = page;

		this.turn('stop');

		turnMethods._makeRange.call(this);

		if (data.display=='single') {
			current = view[0];
			next = newView[0];
		} else if (view[1] && page>view[1]) {
			current = view[1];
			next = newView[0];
		} else if (view[0] && page<view[0]) {
			current = view[0];
			next = newView[1];
		}

		if (data.pages[current]) {

			var opts = data.pages[current].data().f.opts;
			data.tpage = next;
			
			if (opts.next!=next) {
				opts.next = next;
				data.pagePlace[next] = opts.page;
				opts.force = true;
			}

			if (data.display=='single')
				data.pages[current].flip('turnPage', (newView[0] > view[0]) ? 'br' : 'bl');
			else
				data.pages[current].flip('turnPage');
		}

	},

	// Gets and sets a page

	page: function(page) {

		page = parseInt(page, 10);

		var data = this.data();

		if (page>0 && page<=data.totalPages) {
			if (!data.done || $.inArray(page, this.turn('view'))!=-1)
				turnMethods._fitPage.call(this, page);
			else
				turnMethods._turnPage.call(this, page);
		
			return this;

		} else
			return data.page;
	
	},

	// Turns to the next view

	next: function() {

		var data = this.data();
		return this.turn('page', turnMethods._view.call(this, data.page).pop() + 1);
	
	},

	// Turns to the previous view

	previous: function() {
		
		var data = this.data();
		return this.turn('page', turnMethods._view.call(this, data.page).shift() - 1);

	},

	// Adds a motion to the internal list

	_addMotionPage: function() {

		var opts = $(this).data().f.opts,
			turn = opts.turn,
			dd = turn.data();

		opts.pageMv = opts.page;
		turnMethods._addMv.call(turn, opts.pageMv);
		dd.pagePlace[opts.next] = opts.page;
		turn.turn('update');

	},

	// This event is called in context of flip

	_start: function(e, opts, corner) {

			var data = opts.turn.data(),
				event = $.Event('start');

			e.stopPropagation();

			opts.turn.trigger(event, [opts, corner]);

			if (event.isDefaultPrevented()) {
				e.preventDefault();
				return;
			}
		
		if (data.display=='single') {

			var left = corner.charAt(1)=='l';
			if ((opts.page==1 && left) || (opts.page==data.totalPages && !left))
				e.preventDefault();
			else {
				if (left) {
					opts.next = (opts.next<opts.page) ? opts.next : opts.page-1;
					opts.force = true;
				} else
					opts.next = (opts.next>opts.page) ? opts.next : opts.page+1;
			}

		}

		turnMethods._addMotionPage.call(this);
	},

	// This event is called in context of flip

	_end: function(e, turned) {
		
		var that = $(this),
			data = that.data().f,
			opts = data.opts,
			turn = opts.turn,
			dd = turn.data();

		e.stopPropagation();

		if (turned || dd.tpage) {

			if (dd.tpage==opts.next || dd.tpage==opts.page) {
				delete dd['tpage'];
				turnMethods._fitPage.call(turn, dd.tpage || opts.next, true);
			}

		} else {
			turnMethods._removeMv.call(turn, opts.pageMv);
			turn.turn('update');
		}
		
	},
	
	// This event is called in context of flip

	_pressed: function() {

		var page,
			that = $(this),
			data = that.data().f,
			turn = data.opts.turn,
			pages = turn.data().pages;
	
		for (page in pages)
			if (page!=data.opts.page)
				pages[page].flip('disable', true);

		return data.time = new Date().getTime();

	},

	// This event is called in context of flip

	_released: function(e, point) {
		
		var that = $(this),
			data = that.data().f;

			e.stopPropagation();

		if ((new Date().getTime())-data.time<200 || point.x<0 || point.x>$(this).width()) {
			e.preventDefault();
			data.opts.turn.data().tpage = data.opts.next;
			data.opts.turn.turn('update');
			$(that).flip('turnPage');
		}

	},

	// This event is called in context of flip
	
	_flip: function() {

		var opts = $(this).data().f.opts;

		opts.turn.trigger('turn', [opts.next]);

	},

	// Calculate the z-index value for pages during the animation

	calculateZ: function(mv) {

		var i, page, nextPage, placePage, dpage,
			that = this,
			data = this.data(),
			view = this.turn('view'),
			currentPage = view[0] || view[1],
			r = {pageZ: {}, partZ: {}, pageV: {}},

			addView = function(page) {
				var view = that.turn('view', page);
				if (view[0]) r.pageV[view[0]] = true;
				if (view[1]) r.pageV[view[1]] = true;
			};
		
			for (i = 0; i<mv.length; i++) {
				page = mv[i];
				nextPage = data.pages[page].data().f.opts.next;
				placePage = data.pagePlace[page];
				addView(page);
				addView(nextPage);
				dpage = (data.pagePlace[nextPage]==nextPage) ? nextPage : page;
				r.pageZ[dpage] = data.totalPages - Math.abs(currentPage-dpage);
				r.partZ[placePage] = data.totalPages*2 + Math.abs(currentPage-dpage);
			}

		return r;
	},

	// Updates the z-index and display property of every page

	update: function() {

		var page,
			data = this.data();

		if (data.pageMv.length && data.pageMv[0]!==0) {

			// Update motion

			var apage,
				pos = this.turn('calculateZ', data.pageMv),
				view = this.turn('view', data.tpage);
		
			if (data.pagePlace[view[0]]==view[0]) apage = view[0];
			else if (data.pagePlace[view[1]]==view[1]) apage = view[1];
		
			for (page in data.pageWrap) {

				if (!has(page, data.pageWrap)) continue;

				data.pageWrap[page].css({display: (pos.pageV[page]) ? '' : 'none', 'z-index': pos.pageZ[page] || 0});

				if (data.pages[page]) {
					data.pages[page].flip('z', pos.partZ[page] || null);

					if (pos.pageV[page])
						data.pages[page].flip('resize');

					if (data.tpage)
						data.pages[page].flip('disable', true); // data.disabled || page!=apage
				}
			}
				
		} else {

			// Update static pages

			for (page in data.pageWrap) {
				if (!has(page, data.pageWrap)) continue;
					var pageLocation = turnMethods._setPageLoc.call(this, page);
					if (data.pages[page])
						data.pages[page].flip('disable', data.disabled || pageLocation!=1).flip('z', null);
			}
		}
	},

	// Sets the z-index and display property of a page
	// It depends on the current view

	_setPageLoc: function(page) {

		var data = this.data(),
			view = this.turn('view');

		if (page==view[0] || page==view[1]) {
			data.pageWrap[page].css({'z-index': data.totalPages, display: ''});
			return 1;
		} else if ((data.display=='single' && page==view[0]+1) || (data.display=='double' && page==view[0]-2 || page==view[1]+2)) {
			data.pageWrap[page].css({'z-index': data.totalPages-1, display: ''});
			return 2;
		} else {
			data.pageWrap[page].css({'z-index': 0, display: 'none'});
			return 0;
		}
	}
},

// Methods and properties for the flip page effect

flipMethods = {

	// Constructor

	init: function(opts) {

		if (opts.gradients) {
			opts.frontGradient = true;
			opts.backGradient = true;
		}

		this.data({f: {}});
		this.flip('options', opts);

		flipMethods._addPageWrapper.call(this);

		return this;
	},

	setData: function(d) {
		
		var data = this.data();

		data.f = $.extend(data.f, d);

		return this;
	},

	options: function(opts) {
		
		var data = this.data().f;

		if (opts) {
			flipMethods.setData.call(this, {opts: $.extend({}, data.opts || flipOptions, opts) });
			return this;
		} else
			return data.opts;

	},

	z: function(z) {

		var data = this.data().f;
		data.opts['z-index'] = z;
		data.fwrapper.css({'z-index': z || parseInt(data.parent.css('z-index'), 10) || 0});

		return this;
	},

	_cAllowed: function() {

		return corners[this.data().f.opts.corners] || this.data().f.opts.corners;

	},

	_cornerActivated: function(e) {
		if (e.originalEvent === undefined) {
			return false;
		}		

		e = (isTouch) ? e.originalEvent.touches : [e];

		var data = this.data().f,
			pos = data.parent.offset(),
			width = this.width(),
			height = this.height(),
			c = {x: Math.max(0, e[0].pageX-pos.left), y: Math.max(0, e[0].pageY-pos.top)},
			csz = data.opts.cornerSize,
			allowedCorners = flipMethods._cAllowed.call(this);

			if (c.x<=0 || c.y<=0 || c.x>=width || c.y>=height) return false;

			if (c.y<csz) c.corner = 't';
			else if (c.y>=height-csz) c.corner = 'b';
			else return false;
			
			if (c.x<=csz) c.corner+= 'l';
			else if (c.x>=width-csz) c.corner+= 'r';
			else return false;

		return ($.inArray(c.corner, allowedCorners)==-1) ? false : c;

	},

	_c: function(corner, opts) {

		opts = opts || 0;
		return ({tl: point2D(opts, opts),
				tr: point2D(this.width()-opts, opts),
				bl: point2D(opts, this.height()-opts),
				br: point2D(this.width()-opts, this.height()-opts)})[corner];

	},

	_c2: function(corner) {

		return {tl: point2D(this.width()*2, 0),
				tr: point2D(-this.width(), 0),
				bl: point2D(this.width()*2, this.height()),
				br: point2D(-this.width(), this.height())}[corner];

	},

	_foldingPage: function(corner) {

		var opts = this.data().f.opts;
		
		if (opts.folding) return opts.folding;
		else if(opts.turn) {
			var data = opts.turn.data();
			if (data.display == 'single')
				return (data.pageObjs[opts.next]) ? data.pageObjs[0] : null;
			else
				return data.pageObjs[opts.next];
		}

	},

	_backGradient: function() {

		var data =	this.data().f,
			turn = data.opts.turn,
			gradient = data.opts.backGradient &&
						(!turn || turn.data().display=='single' || (data.opts.page!=2 && data.opts.page!=turn.data().totalPages-1) );


		if (gradient && !data.bshadow)
			data.bshadow = $('<div/>', divAtt(0, 0, 1)).
				css({'position': '', width: this.width(), height: this.height()}).
					appendTo(data.parent);

		return gradient;

	},

	resize: function(full) {
		
		var data = this.data().f,
			width = this.width(),
			height = this.height(),
			size = Math.round(Math.sqrt(Math.pow(width, 2)+Math.pow(height, 2)));

		if (full) {
			data.wrapper.css({width: size, height: size});
			data.fwrapper.css({width: size, height: size}).
				children(':first-child').
					css({width: width, height: height});

			data.fpage.css({width: height, height: width});

			if (data.opts.frontGradient)
				data.ashadow.css({width: height, height: width});

			if (flipMethods._backGradient.call(this))
				data.bshadow.css({width: width, height: height});
		}

		if (data.parent.is(':visible')) {
			data.fwrapper.css({top: data.parent.offset().top,
				left: data.parent.offset().left});

			if (data.opts.turn)
				data.fparent.css({top: -data.opts.turn.offset().top, left: -data.opts.turn.offset().left});
		}

		this.flip('z', data.opts['z-index']);

	},

	// Prepares the page by adding a general wrapper and another objects

	_addPageWrapper: function() {

		var att,
			data = this.data().f,
			parent = this.parent();

		if (!data.wrapper) {

			var left = this.css('left'),
				top = this.css('top'),
				width = this.width(),
				height = this.height(),
				size = Math.round(Math.sqrt(Math.pow(width, 2)+Math.pow(height, 2)));
			
			data.parent = parent;
			data.fparent = (data.opts.turn) ? data.opts.turn.data().fparent : $('#turn-fwrappers');

			if (!data.fparent) {
				var fparent = $('<div/>', {css: {'pointer-events': 'none'}}).hide();
					fparent.data().flips = 0;

				if (data.opts.turn) {
					fparent.css(divAtt(-data.opts.turn.offset().top, -data.opts.turn.offset().left, 'auto', 'visible').css).
							appendTo(data.opts.turn);
					
					data.opts.turn.data().fparent = fparent;
				} else {
					fparent.css(divAtt(0, 0, 'auto', 'visible').css).
						attr('id', 'turn-fwrappers').
							appendTo($('body'));
				}

				data.fparent = fparent;
			}

			this.css({position: 'absolute', top: 0, left: 0, bottom: 'auto', right: 'auto'});

			data.wrapper = $('<div/>', divAtt(0, 0, this.css('z-index'))).
								appendTo(parent).
									prepend(this);

			data.fwrapper = $('<div/>', divAtt(parent.offset().top, parent.offset().left)).
								hide().
									appendTo(data.fparent);

			data.fpage = $('<div/>', {css: {cursor: 'default'}}).
					appendTo($('<div/>', divAtt(0, 0, 0, 'visible')).
								appendTo(data.fwrapper));

			if (data.opts.frontGradient)
				data.ashadow = $('<div/>', divAtt(0, 0,  1)).
					appendTo(data.fpage);

			// Save data

			flipMethods.setData.call(this, data);

			// Set size
			flipMethods.resize.call(this, true);
		}

	},

	// Takes a 2P point from the screen and applies the transformation

	_fold: function(point) {

		var that = this,
			a = 0,
			alpha = 0,
			beta,
			px,
			gradientEndPointA,
			gradientEndPointB,
			gradientStartV,
			gradientSize,
			gradientOpacity,
			mv = point2D(0, 0),
			df = point2D(0, 0),
			tr = point2D(0, 0),
			width = this.width(),
			height = this.height(),
			folding = flipMethods._foldingPage.call(this),
			tan = Math.tan(alpha),
			data = this.data().f,
			ac = data.opts.acceleration,
			h = data.wrapper.height(),
			o = flipMethods._c.call(this, point.corner),
			top = point.corner.substr(0, 1) == 't',
			left = point.corner.substr(1, 1) == 'l',

			compute = function() {
				var rel = point2D((o.x) ? o.x - point.x : point.x, (o.y) ? o.y - point.y : point.y),
					tan = (Math.atan2(rel.y, rel.x)),
					middle;

				alpha = A90 - tan;
				a = deg(alpha);
				middle = point2D((left) ? width - rel.x/2 : point.x + rel.x/2, rel.y/2);

				var gamma = alpha - Math.atan2(middle.y, middle.x),
					distance =  Math.max(0, Math.sin(gamma) * Math.sqrt(Math.pow(middle.x, 2) + Math.pow(middle.y, 2)));

					tr = point2D(distance * Math.sin(alpha), distance * Math.cos(alpha));

					if (alpha > A90) {
					
						tr.x = tr.x + Math.abs(tr.y * Math.tan(tan));
						tr.y = 0;

						if (Math.round(tr.x*Math.tan(PI-alpha)) < height) {

							point.y = Math.sqrt(Math.pow(height, 2)+2 * middle.x * rel.x);
							if (top) point.y =  height - point.y;
							return compute();

						}
					}
			
				if (alpha>A90) {
					var beta = PI-alpha, dd = h - height/Math.sin(beta);
					mv = point2D(Math.round(dd*Math.cos(beta)), Math.round(dd*Math.sin(beta)));
					if (left) mv.x = - mv.x;
					if (top) mv.y = - mv.y;
				}

				px = Math.round(tr.y/Math.tan(alpha) + tr.x);
			
				var side = width - px,
					sideX = side*Math.cos(alpha*2),
					sideY = side*Math.sin(alpha*2);
					df = point2D(Math.round( (left ? side -sideX : px+sideX)), Math.round((top) ? sideY : height - sideY));
					
				
				// GRADIENTS

					gradientSize = side*Math.sin(alpha);
						var endingPoint = flipMethods._c2.call(that, point.corner),
						far = Math.sqrt(Math.pow(endingPoint.x-point.x, 2)+Math.pow(endingPoint.y-point.y, 2));

					gradientOpacity = (far<width) ? far/width : 1;


				if (data.opts.frontGradient) {

					gradientStartV = gradientSize>100 ? (gradientSize-100)/gradientSize : 0;
					gradientEndPointA = point2D(gradientSize*Math.sin(A90-alpha)/height*100, gradientSize*Math.cos(A90-alpha)/width*100);
				
					if (top) gradientEndPointA.y = 100-gradientEndPointA.y;
					if (left) gradientEndPointA.x = 100-gradientEndPointA.x;
				}

				if (flipMethods._backGradient.call(that)) {

					gradientEndPointB = point2D(gradientSize*Math.sin(alpha)/width*100, gradientSize*Math.cos(alpha)/height*100);
					if (!left) gradientEndPointB.x = 100-gradientEndPointB.x;
					if (!top) gradientEndPointB.y = 100-gradientEndPointB.y;
				}
				//

				tr.x = Math.round(tr.x);
				tr.y = Math.round(tr.y);

				return true;
			},

			transform = function(tr, c, x, a) {
			
				var f = ['0', 'auto'], mvW = (width-h)*x[0]/100, mvH = (height-h)*x[1]/100,
					v = {left: f[c[0]], top: f[c[1]], right: f[c[2]], bottom: f[c[3]]},
					aliasingFk = (a!=90 && a!=-90) ? (left ? -1 : 1) : 0;

					x = x[0] + '% ' + x[1] + '%';

				that.css(v).transform(rotate(a) + translate(tr.x + aliasingFk, tr.y, ac), x);

				data.fpage.parent().css(v);
				data.wrapper.transform(translate(-tr.x + mvW-aliasingFk, -tr.y + mvH, ac) + rotate(-a), x);

				data.fwrapper.transform(translate(-tr.x + mv.x + mvW, -tr.y + mv.y + mvH, ac) + rotate(-a), x);
				data.fpage.parent().transform(rotate(a) + translate(tr.x + df.x - mv.x, tr.y + df.y - mv.y, ac), x);

				if (data.opts.frontGradient)
					gradient(data.ashadow,
							point2D(left?100:0, top?100:0),
							point2D(gradientEndPointA.x, gradientEndPointA.y),
							[[gradientStartV, 'rgba(0,0,0,0)'],
							[((1-gradientStartV)*0.8)+gradientStartV, 'rgba(0,0,0,'+(0.2*gradientOpacity)+')'],
							[1, 'rgba(255,255,255,'+(0.2*gradientOpacity)+')']],
							3,
							alpha);
		
				if (flipMethods._backGradient.call(that))
					gradient(data.bshadow,
							point2D(left?0:100, top?0:100),
							point2D(gradientEndPointB.x, gradientEndPointB.y),
							[[0.8, 'rgba(0,0,0,0)'],
							[1, 'rgba(0,0,0,'+(0.3*gradientOpacity)+')'],
							[1, 'rgba(0,0,0,0)']],
							3);
				
			};

		switch (point.corner) {
			case 'tl' :
				point.x = Math.max(point.x, 1);
				compute();
				transform(tr, [1,0,0,1], [100, 0], a);
				data.fpage.transform(translate(-height, -width, ac) + rotate(90-a*2) , '100% 100%');
				folding.transform(rotate(90) + translate(0, -height, ac), '0% 0%');
			break;
			case 'tr' :
				point.x = Math.min(point.x, width-1);
				compute();
				transform(point2D(-tr.x, tr.y), [0,0,0,1], [0, 0], -a);
				data.fpage.transform(translate(0, -width, ac) + rotate(-90+a*2) , '0% 100%');
				folding.transform(rotate(270) + translate(-width, 0, ac), '0% 0%');
			break;
			case 'bl' :
				point.x = Math.max(point.x, 1);
				compute();
				transform(point2D(tr.x, -tr.y), [1,1,0,0], [100, 100], -a);
				data.fpage.transform(translate(-height, 0, ac) + rotate(-90+a*2), '100% 0%');
				folding.transform(rotate(270) + translate(-width, 0, ac), '0% 0%');
			break;
			case 'br' :
				point.x = Math.min(point.x, width-1);
				compute();
				transform(point2D(-tr.x, -tr.y), [0,1,1,0], [0, 100], a);
				data.fpage.transform(rotate(90-a*2), '0% 0%');
				folding.transform(rotate(90) + translate(0, -height, ac), '0% 0%');

			break;
		}

		data.point = point;
	
	},

	_moveFoldingPage: function(bool) {

		var data = this.data().f,
			folding = flipMethods._foldingPage.call(this);

		if (folding) {
			if (bool) {
				if (!data.fpage.children()[data.ashadow? '1' : '0']) {
					flipMethods.setData.call(this, {backParent: folding.parent()});
					data.fpage.prepend(folding);
				}
			} else {
				if (data.backParent)
					data.backParent.prepend(folding);

			}
		}

	},

	_showFoldedPage: function(c, animate) {

		var folding = flipMethods._foldingPage.call(this),
			dd = this.data(),
			data = dd.f;

		if (!data.point || data.point.corner!=c.corner) {
			var event = $.Event('start');
			this.trigger(event, [data.opts, c.corner]);

			if (event.isDefaultPrevented())
				return false;
		}


		if (folding) {

			if (animate) {

				var that = this, point = (data.point && data.point.corner==c.corner) ? data.point : flipMethods._c.call(this, c.corner, 1);
			
				this.animatef({from: [point.x, point.y], to:[c.x, c.y], duration: 500, frame: function(v) {
					c.x = Math.round(v[0]);
					c.y = Math.round(v[1]);
					flipMethods._fold.call(that, c);
				}});

			} else	{

				flipMethods._fold.call(this, c);
				if (dd.effect && !dd.effect.turning)
					this.animatef(false);

			}

			if (!data.fwrapper.is(':visible')) {
				data.fparent.show().data().flips++;
				flipMethods._moveFoldingPage.call(this, true);
				data.fwrapper.show();

				if (data.bshadow)
					data.bshadow.show();
			}

			return true;
		}

		return false;
	},

	hide: function() {

		var data = this.data().f,
			folding = flipMethods._foldingPage.call(this);

		if ((--data.fparent.data().flips)===0)
			data.fparent.hide();

		this.css({left: 0, top: 0, right: 'auto', bottom: 'auto'}).transform('', '0% 100%');

		data.wrapper.transform('', '0% 100%');

		data.fwrapper.hide();

		if (data.bshadow)
			data.bshadow.hide();

		folding.transform('', '0% 0%');

		return this;
	},

	hideFoldedPage: function(animate) {

		var data = this.data().f;

		if (!data.point) return;

		var that = this,
			p1 = data.point,
			hide = function() {
				data.point = null;
				that.flip('hide');
				that.trigger('end', [false]);
			};

		if (animate) {
			var p4 = flipMethods._c.call(this, p1.corner),
				top = (p1.corner.substr(0,1)=='t'),
				delta = (top) ? Math.min(0, p1.y-p4.y)/2 : Math.max(0, p1.y-p4.y)/2,
				p2 = point2D(p1.x, p1.y+delta),
				p3 = point2D(p4.x, p4.y-delta);
		
			this.animatef({
				from: 0,
				to: 1,
				frame: function(v) {
					var np = bezier(p1, p2, p3, p4, v);
					p1.x = np.x;
					p1.y = np.y;
					flipMethods._fold.call(that, p1);
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

	turnPage: function(corner) {

		var that = this,
			data = this.data().f;

		corner = {corner: (data.corner) ? data.corner.corner : corner || flipMethods._cAllowed.call(this)[0]};

		var p1 = data.point || flipMethods._c.call(this, corner.corner, (data.opts.turn) ? data.opts.turn.data().opts.elevation : 0),
			p4 = flipMethods._c2.call(this, corner.corner);

			this.trigger('flip').
				animatef({
					from: 0,
					to: 1,
					frame: function(v) {
						var np = bezier(p1, p1, p4, p4, v);
						corner.x = np.x;
						corner.y = np.y;
						flipMethods._showFoldedPage.call(that, corner);
					},
					
					complete: function() {
						that.trigger('end', [true]);
					},
					duration: data.opts.duration,
					turning: true
				});

			data.corner = null;
	},

	moving: function() {

		return 'effect' in this.data();
	
	},

	isTurning: function() {

		return this.flip('moving') && this.data().effect.turning;
	
	},

	_eventStart: function(e) {

		var data = this.data().f;

		if (!data.disabled && !this.flip('isTurning')) {
			data.corner = flipMethods._cornerActivated.call(this, e);
			if (data.corner && flipMethods._foldingPage.call(this, data.corner)) {
				flipMethods._moveFoldingPage.call(this, true);
				this.trigger('pressed', [data.point]);
				return false;
			} else
				data.corner = null;
		}

	},

	_eventMove: function(e) {

		var data = this.data().f;

		if (!data.disabled) {
			e = (isTouch) ? e.originalEvent.touches : [e];
		
			if (data.corner) {

				var pos = data.parent.offset();

				data.corner.x = e[0].pageX-pos.left;
				data.corner.y = e[0].pageY-pos.top;

				flipMethods._showFoldedPage.call(this, data.corner);
			
			} else if (!this.data().effect && this.is(':visible')) { // roll over
				
				var corner = flipMethods._cornerActivated.call(this, e[0]);
				if (corner) {
					var origin = flipMethods._c.call(this, corner.corner, data.opts.cornerSize/2);
					corner.x = origin.x;
					corner.y = origin.y;
					flipMethods._showFoldedPage.call(this, corner, true);
				} else
					flipMethods.hideFoldedPage.call(this, true);

			}
		}
	},

	_eventEnd: function() {

		var data = this.data().f;

		if (!data.disabled && data.point) {
			var event = $.Event('released');
			this.trigger(event, [data.point]);
			if (!event.isDefaultPrevented())
				flipMethods.hideFoldedPage.call(this, true);
		}

		data.corner = null;

	},

	disable: function(disable) {

		flipMethods.setData.call(this, {'disabled': disable});
		return this;

	}
},

cla = function(that, methods, args) {

	if (!args[0] || typeof(args[0])=='object')
		return methods.init.apply(that, args);
	else if(methods[args[0]] && args[0].toString().substr(0, 1)!='_')
		return methods[args[0]].apply(that, Array.prototype.slice.call(args, 1));
	else
		throw args[0] + ' is an invalid value';
};

$.extend($.fn, {

	flip: function(req, opts) {
		return cla(this, flipMethods, arguments);
	},

	turn: function(req) {
		return cla(this, turnMethods, arguments);
	},

	transform: function(transform, origin) {

		var properties = {};
		
		if (origin)
			properties[vendor+'transform-origin'] = origin;
		
		properties[vendor+'transform'] = transform;
	
		return this.css(properties);

	},

	animatef: function(point) {

		var data = this.data();

		if (data.effect)
			clearInterval(data.effect.handle);

		if (point) {

			if (!point.to.length) point.to = [point.to];
			if (!point.from.length) point.from = [point.from];
			if (!point.easing) point.easing = function (x, t, b, c, data) { return c * Math.sqrt(1 - (t=t/data-1)*t) + b; };

			var j, diff = [],
				len = point.to.length,
				that = this,
				fps = point.fps || 30,
				time = - fps,
				f = function() {
					var j, v = [];
					time = Math.min(point.duration, time + fps);
	
					for (j = 0; j < len; j++)
						v.push(point.easing(1, time, point.from[j], diff[j], point.duration));

					point.frame((len==1) ? v[0] : v);

					if (time==point.duration) {
						clearInterval(data.effect.handle);
						delete data['effect'];
						that.data(data);
						if (point.complete)
							point.complete();
						}
					};

			for (j = 0; j < len; j++)
				diff.push(point.to[j] - point.from[j]);

			data.effect = point;
			data.effect.handle = setInterval(f, fps);
			this.data(data);
			f();
		} else {
			delete data['effect'];
		}
	}
});


$.isTouch = isTouch;

})(jQuery);