// Native Javascript for Bootstrap 3
// by dnp_theme

(function(factory){

	// CommonJS/RequireJS and "native" compatibility
	if(typeof module !== "undefined" && typeof exports == "object") {
		// A commonJS/RequireJS environment
		if(typeof window != "undefined") {
			// Window and document exist, so return the factory's return value.
			module.exports = factory();
		} else {
			// Let the user give the factory a Window and Document.
			module.exports = factory;
		}
	} else {
		// Assume a traditional browser.
		window.Affix = factory();
	}

})(function(){

	//AFFIX DEFINITION
	var Affix = function(element,options) {
		options = options || {};
		
		this.element = typeof element === 'object' ? element : document.querySelector(element);
		this.options = {};
		this.options.target = options.target ? ((typeof(options.target) === 'object') ? options.target : document.querySelector(options.target)) : null; // target is an object
		this.options.offsetTop = options.offsetTop && options.offsetTop ? ( options.offsetTop === 'function' ? options.offsetTop() : parseInt(options.offsetTop,0) ) : 0; // offset option is an integer number or function to determine that number
		this.options.offsetBottom = options.offsetBottom && options.offsetBottom ? ( options.offsetBottom === 'function' ? options.offsetBottom() : parseInt(options.offsetBottom,0) ) : null;

		if (this.element && (this.options.target || this.options.offsetTop || this.options.offsetBottom ) ) { this.init(); }
	}

	//AFFIX METHODS
	Affix.prototype = {
		init: function () {
			this.affixed = false;
			this.affixedBottom = false;
			this.getPinOffsetTop = 0;
			this.getPinOffsetBottom = null;

			//actions
			this.checkPosition();
			this.updateAffix();
			this.scrollEvent();
			this.resizeEvent()
		},
		processOffsetTop: function () {
			if ( this.options.target !== null ) {
				return this.targetRect().top + this.scrollOffset();
			} else if ( this.options.offsetTop !== null ) {
				return this.options.offsetTop
			}
		},
		processOffsetBottom: function () {
			if ( this.options.offsetBottom !== null ) {
				var maxScroll = this.getMaxScroll();
				return maxScroll - this.elementHeight() - this.options.offsetBottom
			}
		},
		offsetTop: function () {
			return this.processOffsetTop()
		},
		offsetBottom: function () {
			return this.processOffsetBottom()
		},
		checkPosition: function () {
			this.getPinOffsetTop = this.offsetTop
			this.getPinOffsetBottom = this.offsetBottom
		},
		scrollOffset: function () {
			return window.pageYOffset || document.documentElement.scrollTop
		},
		pinTop: function () {
			if ( !/affix/.test(this.element.className) ) {
				this.element.className += ' affix';
				this.affixed = true
			}
		},
		unPinTop: function () {
			if ( /affix/.test(this.element.className) ) {
				this.element.className = this.element.className.replace(' affix','');
				this.affixed = false
			}
		},
		pinBottom: function () {
			if ( !/'affix-bottom'/.test(this.element.className) ) {
				this.element.className += ' affix-bottom';
				this.affixedBottom = true
			}
		},
		unPinBottom: function () {
			if ( /'affix-bottom'/.test(this.element.className) ) { 
				this.element.className = this.element.className.replace(' affix-bottom','');
				this.affixedBottom = false
			}
		},
		updatePin: function () {
			if (this.affixed === false && (parseInt(this.offsetTop(),0) - parseInt(this.scrollOffset(),0) < 0)) {
				this.pinTop();
			} else if (this.affixed === true && (parseInt(this.scrollOffset(),0) <= parseInt(this.getPinOffsetTop(),0) )) {
				this.unPinTop()
			}

			if (this.affixedBottom === false && (parseInt(this.offsetBottom(),0) - parseInt(this.scrollOffset(),0) < 0)) {
				this.pinBottom();
			} else if (this.affixedBottom === true && (parseInt(this.scrollOffset(),0) <= parseInt(this.getPinOffsetBottom(),0) )) {
				this.unPinBottom()
			}
		},

		updateAffix : function () { // Unpin and check position again
			this.unPinTop();
			this.unPinBottom();
			this.checkPosition()

			this.updatePin() // If any case update values again
		},

		elementHeight : function(){
			return this.element.offsetHeight
		},

		targetRect : function(){
			return this.options.target.getBoundingClientRect()
		},

		getMaxScroll : function(){
			return Math.max( document.body.scrollHeight, document.body.offsetHeight, 
				document.documentElement.clientHeight, document.documentElement.scrollHeight, document.documentElement.offsetHeight )
		},

		scrollEvent : function(){
			var self = this;
			window.addEventListener('scroll', function() {
				self.updatePin()
			}, false);

		},
		resizeEvent : function(){
			var self = this, 
				isIE = (new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})").exec(navigator.userAgent) != null) ? parseFloat( RegExp.$1 ) : false, 
				dl = (isIE && isIE < 10) ? 500 : 50;
			window.addEventListener('resize', function () {
				setTimeout(function(){
					self.updateAffix()
				},dl);
			}, false);

		}
	};

	// AFFIX DATA API
	// =================
	var Affixes = document.querySelectorAll('[data-spy="affix"]'), i = 0, afl = Affixes.length;
	for (i;i<afl;i++) {
		var item = Affixes[i], options = {};
			options.offsetTop		= item.getAttribute('data-offset-top');
			options.offsetBottom	= item.getAttribute('data-offset-bottom');
			options.target			= item.getAttribute('data-target');

		if ( item && (options.offsetTop !== null || options.offsetBottom !== null || options.target !== null) ) { //don't do anything unless we have something valid to pin
			new Affix(item, options);
		}
	}

	return Affix;
});


(function(factory){

	// CommonJS/RequireJS and "native" compatibility
	if(typeof module !== "undefined" && typeof exports == "object") {
		// A commonJS/RequireJS environment
		if(typeof window != "undefined") {
			// Window and document exist, so return the factory's return value.
			module.exports = factory();
		} else {
			// Let the user give the factory a Window and Document.
			module.exports = factory;
		}
	} else {
		// Assume a traditional browser.
		window.Alert = factory();
	}

})(function(root){

	// ALERT DEFINITION
	// ===================
	var Alert = function( element ) {
		this.btn = typeof element === 'object' ? element : document.querySelector(element);
		this.alert = null;
		this.duration = 150; // default alert transition duration
		this.init();
	}

	// ALERT METHODS
	// ================
	Alert.prototype = {

		init : function() {
			this.actions();
			document.addEventListener('click', this.close, false); //delegate to all alerts, including those inserted later into the DOM
		},

		actions : function() {
			var self = this;

			this.close = function(e) {
				var target = e.target;
				self.btn = target.getAttribute('data-dismiss') === 'alert' && target.className === 'close' ? target : target.parentNode;
				self.alert = self.btn.parentNode;

				if ( self.alert !== null && self.btn.getAttribute('data-dismiss') === 'alert' && /in/.test(self.alert.className) ) {
					self.alert.className = self.alert.className.replace(' in','');
					setTimeout(function() {
						self.alert && self.alert.parentNode.removeChild(self.alert);
					}, self.duration);
				}

			}
		}
    }

	// ALERT DATA API
	// =================
    var Alerts = document.querySelectorAll('[data-dismiss="alert"]'), i = 0, all = Alerts.length;
	for (i;i<all;i++) {
		new Alert(Alerts[i]);
	}

	return Alert;

});


(function(factory){

	// CommonJS/RequireJS and "native" compatibility
	if(typeof module !== "undefined" && typeof exports == "object") {
		// A commonJS/RequireJS environment
		if(typeof window != "undefined") {
			// Window and document exist, so return the factory's return value.
			module.exports = factory();
		} else {
			// Let the user give the factory a Window and Document.
			module.exports = factory;
		}
	} else {
		// Assume a traditional browser.
		window.Button = factory();
	}

})(function(){

	// BUTTON DEFINITION
	// ===================
	var Button = function( element, option ) {
		this.btn = typeof element === 'object' ? element : document.querySelector(element);
		this.option = typeof option === 'string' ? option : null;

		this.init();
	};

	// BUTTON METHODS
	// ================
	Button.prototype = {

		init : function() {
			var self = this;
			this.actions();

			if ( /btn/.test(this.btn.className) ) {
				if ( this.option && this.option !== 'reset' ) {

					this.state = this.btn.getAttribute('data-'+this.option+'-text') || null;

					!this.btn.getAttribute('data-original-text') && this.btn.setAttribute('data-original-text',self.btn.innerHTML.replace(/^\s+|\s+$/g, ''));
					this.setState();

				} else if ( this.option === 'reset' ) {
					this.reset();
				}
			}

			if ( /btn-group/.test(this.btn.className) ) {
				this.btn.addEventListener('click', this.toggle, false);
			}
		},

		actions : function() {
			var self = this,
				changeEvent = (('CustomEvent' in window) && window.dispatchEvent) 
					? new CustomEvent('bs.button.change') : null; // The custom event that will be triggered on demand

			// assign event to a trigger function
			function triggerChange(t) { if (changeEvent) { t.dispatchEvent(changeEvent); } }

			this.setState = function() {
				if ( this.option === 'loading' ) {
					this.addClass(this.btn,'disabled');					
					this.btn.setAttribute('disabled','disabled');
				}
				this.btn.innerHTML = this.state;
			},

			this.reset = function() {
				if ( /disabled/.test(self.btn.className) || self.btn.getAttribute('disabled') === 'disabled' ) {
					this.removeClass(this.btn,'disabled');	
					self.btn.removeAttribute('disabled');
				}
				self.btn.innerHTML = self.btn.getAttribute('data-original-text');
			},

			this.toggle = function(e) {
				var parent = e.target.parentNode,
					label = e.target.tagName === 'LABEL' ? e.target : parent.tagName === 'LABEL' ? parent : null; // the .btn label
				
				if ( !label ) return; //react if a label or its immediate child is clicked
				
				var target = this, //e.currentTarget || e.srcElement; // the button group, the target of the handler function
					labels = target.querySelectorAll('.btn'), ll = labels.length, i = 0, // all the button group buttons
					input = label.getElementsByTagName('INPUT')[0];
					
				if ( !input ) return; //return if no input found

				//manage the dom manipulation
				if ( input.type === 'checkbox' ) { //checkboxes					
					if ( !input.checked ) {
						self.addClass(label,'active');
						input.getAttribute('checked');					
						input.setAttribute('checked','checked');
						input.checked = true;
					} else {
						self.removeClass(label,'active');
						input.getAttribute('checked');						
						input.removeAttribute('checked');
						input.checked = false;
					}
					triggerChange(input); //trigger the change for the input
					triggerChange(self.btn); //trigger the change for the btn-group
				}

				if ( input.type === 'radio' ) { // radio buttons
					if ( !input.checked ) { // don't trigger if already active
						self.addClass(label,'active');
						input.setAttribute('checked','checked');
						input.checked = true;					
						triggerChange(self.btn); 		
						triggerChange(input); //trigger the change
						
						for (i;i<ll;i++) {
							var l = labels[i];
							if ( l !== label && /active/.test(l.className) )  {
								var inp = l.getElementsByTagName('INPUT')[0];
								self.removeClass(l,'active');
								inp.removeAttribute('checked');
								inp.checked = false;
								triggerChange(inp); // trigger the change								
							}				
						}
					}								
				}
			},
			this.addClass = function(el,c) { // where modern browsers fail, use classList	
				if (el.classList) { el.classList.add(c); } else { el.className += ' '+c; el.offsetWidth; }
			},
			this.removeClass = function(el,c) {
				if (el.classList) { el.classList.remove(c); } else { el.className = el.className.replace(c,'').replace(/^\s+|\s+$/g,''); el.offsetWidth; }
			}
		}
    }

	// BUTTON DATA API
	// =================
    var Buttons = document.querySelectorAll('[data-toggle=button]'), i = 0, btl = Buttons.length;
	for (i;i<btl;i++) {
		new Button(Buttons[i]);
	}
	
    var ButtonGroups = document.querySelectorAll('[data-toggle=buttons]'), j = 0, bgl = ButtonGroups.length;
	for (j;j<bgl;j++) {
		new Button(ButtonGroups[j]);
	}

	return Button;

});


(function(factory){

	// CommonJS/RequireJS and "native" compatibility
	if(typeof module !== "undefined" && typeof exports == "object") {
		// A commonJS/RequireJS environment
		if(typeof window != "undefined") {
			// Window and document exist, so return the factory's return value.
			module.exports = factory();
		} else {
			// Let the user give the factory a Window and Document.
			module.exports = factory;
		}
	} else {
		// Assume a traditional browser.
		window.Carousel = factory();
	}

})(function(){

	// CAROUSEL DEFINITION
	// ===================
	var Carousel = function( element, options ) {
		options = options || {};

		this.carousel = (typeof element === 'object') ? element : document.querySelector( element );
		this.options = {}; //replace extend
		this.options.keyboard = options.keyboard === 'true' ? true : false;
		this.options.pause = options.pause ? options.pause : 'hover'; // false / hover

		// bootstrap carousel default transition duration / option
		this.duration = 600;
		this.isIE = (new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})").exec(navigator.userAgent) != null) ? parseFloat( RegExp.$1 ) : false; 
		this.options.duration = (this.isIE && this.isIE < 10) ? 0 : (options.duration || this.duration);

		var items = this.carousel.querySelectorAll('.item'), il=items.length; //this is an object
		this.controls = this.carousel.querySelectorAll('.carousel-control');
		this.prev = this.controls[0];
		this.next = this.controls[1];
		this.slides = []; for (var i = 0; i < il; i++) { this.slides.push(items[i]); } // this is an array
		this.indicator = this.carousel.querySelector( ".carousel-indicators" ); // object
		this.indicators = this.carousel.querySelectorAll( ".carousel-indicators li" ); // object
		this.total		= this.slides.length;
		this.timer		= null;
		this.direction	= null;
		this.index		= 0;

		if (options.interval === 'false' ) {
			this.options.interval = false;
		} else {
			this.options.interval = parseInt(options.interval) || 5000;
		}

		this.init();
	};

	// CAROUSEL METHODS
	// ================
	Carousel.prototype = {
		init: function() {
			if ( this.options.interval !== false ){
				this.cycle();
			}

			if ( this.options && this.options.pause === 'hover' && this.options.interval !== false ) {
				this.pause();
			}
			this.actions();
			this._addEventListeners();
		},
		cycle: function(e) {
			var self = this;

			self.direction = 'left';
			self.timer = setInterval(function() {
				self.index++;
				if( self.index == self.slides.length ) {
					self.index = 0;
				}
				self._slideTo( self.index, e );

			}, self.options.interval);
		},
		pause: function() {
			var self = this;
			var pauseHandler = function () {
				if ( self.options.interval !==false && !/paused/.test(self.carousel.className) ) {
					self.carousel.className += ' paused';
					clearInterval( self.timer );
					self.timer = null;
				}
			};
			var resumeHandler = function() {
				if ( self.options.interval !==false && /paused/.test(self.carousel.className) ) {
					self.cycle();
					self.carousel.className = self.carousel.className.replace(' paused','');
				}
			};
			self.carousel.addEventListener( "mouseenter", pauseHandler, false);
			self.carousel.addEventListener( "mouseleave", resumeHandler, false);
			self.carousel.addEventListener( "touchstart", pauseHandler, false);
			self.carousel.addEventListener( "touchend", resumeHandler, false);
		},
		_slideTo: function( next, e ) {
			var self = this;
			var active = self._getActiveIndex(); // the current active
			//determine type
			var direction = self.direction;
			var dr = direction === 'left' ? 'next' : 'prev';
			var slid = null, slide=null;
			
			//register events
			if (('CustomEvent' in window) && window.dispatchEvent) {
				slid =  new CustomEvent("slid.bs.carousel");
				slide = new CustomEvent("slide.bs.carousel");
			}
			if (slid) { self.carousel.dispatchEvent(slid); } //here we go with the slid

			self._removeEventListeners();
			clearInterval(self.timer);
			self.timer = null;
			self._curentPage( self.indicators[next] );

			if ( /slide/.test(this.carousel.className) && !(this.isIE && this.isIE < 10) ) {
				self.slides[next].className += (' '+dr);
				self.slides[next].offsetWidth;
				self.slides[next].className += (' '+direction);
				self.slides[active].className += (' '+direction);

				setTimeout(function() { //we're gonna fake waiting for the animation to finish, cleaner and better
					self._addEventListeners();

					self.slides[next].className += ' active';
					self.slides[active].className = self.slides[active].className.replace(' active','');

					self.slides[next].className = self.slides[next].className.replace(' '+dr,'');
					self.slides[next].className = self.slides[next].className.replace(' '+direction,'');
					self.slides[active].className = self.slides[active].className.replace(' '+direction,'');

					if ( self.options.interval !== false && !/paused/.test(self.carousel.className) ){
						clearInterval(self.timer); self.cycle();
					}
					if (slide) { self.carousel.dispatchEvent(slide); } //here we go with the slide
				}, self.options.duration + 100 );
			} else {
				self.slides[next].className += ' active';
				self.slides[next].offsetWidth;
				self.slides[active].className = self.slides[active].className.replace(' active','');
				setTimeout(function() {
					self._addEventListeners();
					if ( self.options.interval !== false && !/paused/.test(self.carousel.className) ){
						clearInterval(self.timer); self.cycle();
					}
					if (slide) { self.carousel.dispatchEvent(slide); } //here we go with the slide
				}, self.options.duration + 100 );
			}
		},
		_addEventListeners : function () {
			var self = this;

			self.next && self.next.addEventListener( "click", self.controlsHandler, false);
			self.prev && self.prev.addEventListener( "click", self.controlsHandler, false);

			self.indicator && self.indicator.addEventListener( "click", self.indicatorHandler, false);

			if (self.options.keyboard === true) {
				window.addEventListener('keydown', self.keyHandler, false);
			}
		},
		_removeEventListeners : function () { // prevent mouse bubbles while animating
			var self = this;

			self.next && self.next.removeEventListener( "click", self.controlsHandler, false);
			self.prev && self.prev.removeEventListener( "click", self.controlsHandler, false);

			self.indicator && self.indicator.removeEventListener( "click", self.indicatorHandler, false);

			if (self.options.keyboard === true) {
				window.removeEventListener('keydown', self.keyHandler, false);
			}
		},
		_getActiveIndex : function () {
			return this.slides.indexOf(this.carousel.querySelector('.item.active'))
		},
		_curentPage: function( p ) {
			for( var i = 0; i < this.indicators.length; ++i ) {
				var a = this.indicators[i];
				a.className = "";
			}
			if (p) p.className = "active";
		},
		actions: function() {
			var self = this;
			self.indicatorHandler = function(e) {
				e.preventDefault();
				var target = e.target;
				var active = self._getActiveIndex(); // the current active

				if ( target && !/active/.test(target.className) && target.getAttribute('data-slide-to') ) {
					var n = parseInt( target.getAttribute('data-slide-to'), 10 );

					self.index = n;

					if( self.index == 0 ) {
						self.index = 0;
					} else if ( self.index == self.total - 1 ) {
						self.index = self.total - 1;
					}

					 //determine direction first
					if  ( (active < self.index ) || (active === self.total - 1 && self.index === 0 ) ) {
						self.direction = 'left'; // next
					} else if  ( (active > self.index) || (active === 0 && self.index === self.total -1 ) ) {
						self.direction = 'right'; // prev
					}
				} else { return false; }

				self._slideTo( self.index, e ); //Do the slide

			},

			self.controlsHandler = function (e) {
				var target = e.currentTarget || e.srcElement;
				e.preventDefault();

				if ( target === self.next ) {
					self.index++;
					self.direction = 'left'; //set direction first

					if( self.index == self.total - 1 ) {
						self.index = self.total - 1;
					} else if ( self.index == self.total ){
						self.index = 0
					}
				} else if ( target === self.prev ) {
					self.index--;
					self.direction = 'right'; //set direction first

					if( self.index == 0 ) {
						self.index = 0;
					} else if ( self.index < 0 ){
						self.index = self.total - 1
					}
				}

				self._slideTo( self.index, e ); //Do the slide
			}

			self.keyHandler = function (e) {

				switch (e.which) {
					case 39:
						e.preventDefault();
						self.index++;
						self.direction = 'left';
						if( self.index == self.total - 1 ) { self.index = self.total - 1; } else
						if ( self.index == self.total ){ self.index = 0 }
						break;
					case 37:
						e.preventDefault();
						self.index--;
						self.direction = 'right';
						if( self.index == 0 ) { self.index = 0; } else
						if ( self.index < 0 ){ self.index = self.total - 1 }
						break;
					default: return;
				}
				self._slideTo( self.index, e ); //Do the slide
			}
		}
	}

	// CAROUSEL DATA API
	// =================
	var Carousels = document.querySelectorAll('[data-ride="carousel"]'), i = 0, crl = Carousels.length;
	for (i;i<crl;i++) {
		var c = Carousels[i], options = {};
		options.interval = c.getAttribute('data-interval') && c.getAttribute('data-interval');
		options.pause = c.getAttribute('data-pause') && c.getAttribute('data-pause') || 'hover';
		options.keyboard = c.getAttribute('data-keyboard') && c.getAttribute('data-keyboard') || false;
		options.duration = c.getAttribute('data-duration') && c.getAttribute('data-duration') || false;
		new Carousel(c, options)
	}

	return Carousel;

});


// Native Javascript for Bootstrap 3 | Collapse
// by dnp_theme

(function(factory){

	// CommonJS/RequireJS and "native" compatibility
	if(typeof module !== "undefined" && typeof exports == "object") {
		// A commonJS/RequireJS environment
		if(typeof window != "undefined") {
			// Window and document exist, so return the factory's return value.
			module.exports = factory();
		} else {
			// Let the user give the factory a Window and Document.
			module.exports = factory;
		}
	} else {
		// Assume a traditional browser.
		window.Collapse = factory();
	}

})(function(){

	// COLLAPSE DEFINITION
	// ===================
	var Collapse = function( element, options ) {
		options = options || {};
		this.isIE = (new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})").exec(navigator.userAgent) != null) ? parseFloat( RegExp.$1 ) : false;
		this.btn = typeof element === 'object' ? element : document.querySelector(element);
		this.accordion = null;
		this.collapse = null;
		this.duration = 300; // default collapse transition duration
		this.options = {};
		this.options.duration = (this.isIE && this.isIE < 10) ? 0 : (options.duration || this.duration);
		this.init();
	};

	// COLLAPSE METHODS
	// ================
	Collapse.prototype = {

		init : function() {
			this.actions();
			this.btn.addEventListener('click', this.toggle, false);
		},

		actions : function() {
			var self = this;
			var getOuterHeight = function (el) {
				var s = el && el.currentStyle || window.getComputedStyle(el), // the getComputedStyle polyfill would do this for us, but we want to make sure it does
					btp = s.borderTopWidth || 0,
					mtp = /px/.test(s.marginTop)	? Math.round(s.marginTop.replace('px',''))		: 0,
					mbp = /px/.test(s.marginBottom)	? Math.round(s.marginBottom.replace('px',''))	: 0,
					mte = /em/.test(s.marginTop)	? Math.round(s.marginTop.replace('em','')		* parseInt(s.fontSize)) : 0,
					mbe = /em/.test(s.marginBottom)	? Math.round(s.marginBottom.replace('em','')	* parseInt(s.fontSize)) : 0;

				return el.clientHeight + parseInt( btp ) + parseInt( mtp ) + parseInt( mbp ) + parseInt( mte ) + parseInt( mbe ); //we need an accurate margin value
			};

			this.toggle = function(e) {
				self.btn = self.getTarget(e).btn;
				self.collapse = self.getTarget(e).collapse;

				if (!/in/.test(self.collapse.className)) {
					self.open(e);
				} else {
					self.close(e);
				}
			},
			this.close = function(e) {
				e.preventDefault();
				self.btn = self.getTarget(e).btn;
				self.collapse = self.getTarget(e).collapse;
				self._close(self.collapse);
				self.removeClass(self.btn,'collapsed');
			},
			this.open = function(e) {
				e.preventDefault();
				self.btn = self.getTarget(e).btn;
				self.collapse = self.getTarget(e).collapse;
				self.accordion = self.btn.getAttribute('data-parent') && self.getClosest(self.btn, self.btn.getAttribute('data-parent'));

				self._open(self.collapse);
				self.addClass(self.btn,'collapsed');

				if ( self.accordion !== null ) {
					var active = self.accordion.querySelectorAll('.collapse.in'), al = active.length, i = 0;
					for (i;i<al;i++) {
						if ( active[i] !== self.collapse) self._close(active[i]);
					}
				}
			},
			this._open = function(c) {
				this.addClass(c,'in');
				c.setAttribute('area-expanded','true');
				self.addClass(c,'collapsing');
				setTimeout(function() {
					c.style.height = self.getMaxHeight(c) + 'px';										
					c.style.overflowY = 'hidden';						
				}, 0);	
				setTimeout(function() {
					c.style.height = ''; 
					c.style.overflowY = '';
					self.removeClass(c,'collapsing');
				}, self.options.duration);
			},
			this._close = function(c) {
				c.setAttribute('area-expanded','false');
				c.style.height = this.getMaxHeight(c) + 'px';				
				setTimeout(function() {
					self.addClass(c,'collapsing');
					c.style.overflowY = 'hidden';
					c.style.height = '';					
				}, 0);
				
				setTimeout(function() {
					c.style.overflowY = '';
					self.removeClass(c,'in'); 
					self.removeClass(c,'collapsing');
				}, self.options.duration);
			},
			this.getMaxHeight = function(l) { // get collapse trueHeight and border
				var h = 0;
				for (var k = 0; k < l.children.length; k++) {
					h += getOuterHeight(l.children[k]);
				}
				return h;
			},
			this.getTarget = function(e) {
				var t = e.currentTarget || e.srcElement,
					h = t.href && t.getAttribute('href').replace('#',''),
					d = t.getAttribute('data-target') && ( t.getAttribute('data-target') ),
					id = h || ( d && /#/.test(d)) && d.replace('#',''),
					cl = (d && d.charAt(0) === '.') && d, //the navbar collapse trigger targets a class
					c = id && document.getElementById(id) || cl && document.querySelector(cl);

				return {
					btn : t,
					collapse : c
				};
			},

			this.getClosest = function (el, s) { //el is the element and s the selector of the closest item to find
			// source http://gomakethings.com/climbing-up-and-down-the-dom-tree-with-vanilla-javascript/
				var f = s.charAt(0);
				for ( ; el && el !== document; el = el.parentNode ) {// Get closest match
					if ( f === '.' ) {// If selector is a class
						if ( document.querySelector(s) !== undefined ) { return el; }
					}
					if ( f === '#' ) { // If selector is an ID
						if ( el.id === s.substr(1) ) { return el; }
					}
				}
				return false;
			};
			this.addClass = function(el,c) {	
				if (el.classList) { el.classList.add(c); } else { el.className += ' '+c; }
			};
			this.removeClass = function(el,c) {
				if (el.classList) { el.classList.remove(c); } else { el.className = el.className.replace(c,'').replace(/^\s+|\s+$/g,''); }				
			};
		}
	};

	// COLLAPSE DATA API
	// =================
	var Collapses = document.querySelectorAll('[data-toggle="collapse"]'), i = 0, cll = Collapses.length;
	for (i;i<cll;i++) {
		var item = Collapses[i], options = {};
		options.duration = item.getAttribute('data-duration');
		new Collapse(item,options);
	}

	return Collapse;

});


(function(factory){

	// CommonJS/RequireJS and "native" compatibility
	if(typeof module !== "undefined" && typeof exports == "object") {
		// A commonJS/RequireJS environment
		if(typeof window != "undefined") {
			// Window and document exist, so return the factory's return value.
			module.exports = factory();
		} else {
			// Let the user give the factory a Window and Document.
			module.exports = factory;
		}
	} else {
		// Assume a traditional browser.
		window.Dropdown = factory();
	}

})(function(root){

	// DROPDOWN DEFINITION
	// ===================
	var Dropdown = function( element) {
		this.menu = typeof element === 'object' ? element : document.querySelector(element);
		this.init();
	}

	// DROPDOWN METHODS
	// ================
	Dropdown.prototype = {

		init : function() {
			var self = this;
			self.actions();
			self.menu.setAttribute('tabindex', '0'); // Fix onblur on Chrome
			self.menu.addEventListener('click', self.toggle, false);
			self.menu.addEventListener('blur', self.close, false);
		},

		actions : function() {
			var self = this;

			self.toggle = function(e) {
				var target = e.currentTarget || e.srcElement;
				if (/open/.test(target.parentNode.className)) {
					target.parentNode.className = target.parentNode.className.replace(' open','');
				} else {
					target.parentNode.className += ' open';
				}
				
				e.preventDefault();
				return false;
			}

			self.close = function(e) {
				var target = e.currentTarget || e.srcElement;

				setTimeout(function() { // links inside dropdown-menu don't fire without a short delay
					target.parentNode.className = target.parentNode.className.replace(' open','');
				}, 200);
			}
		}
    }

	// DROPDOWN DATA API
	// =================
    var Dropdowns = document.querySelectorAll('[data-toggle=dropdown]'), i = 0, ddl = Dropdowns.length;
	for (i;i<ddl;i++) {
		new Dropdown(Dropdowns[i]);
	}

	return Dropdown;

});


(function(factory){

	// CommonJS/RequireJS and "native" compatibility
	if(typeof module !== "undefined" && typeof exports == "object") {
		// A commonJS/RequireJS environment
		if(typeof window != "undefined") {
			// Window and document exist, so return the factory's return value.
			module.exports = factory();
		} else {
			// Let the user give the factory a Window and Document.
			module.exports = factory;
		}
	} else {
		// Assume a traditional browser.
		window.Modal = factory();
	}

})(function(){

	//MODAL DEFINITION
    var Modal = function(element, options) { // element is the trigger button / options.target is the modal
        options = options || {};
        this.isIE = (new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})").exec(navigator.userAgent) != null) ? parseFloat( RegExp.$1 ) : false; 
        this.opened = false;
        this.modal = typeof element === 'object' ? element : document.querySelector(element);
        this.options = {};
		this.options.backdrop = options.backdrop === 'false' ? false : true;
		this.options.keyboard = options.keyboard === 'false' ? false : true;
		this.options.content = options.content;
		this.duration = options.duration || 300; // the default modal fade duration option
		this.options.duration = (this.isIE && this.isIE < 10) ? 0 : this.duration;

		this.scrollbarWidth		= 0;
        this.dialog = this.modal.querySelector('.modal-dialog');
		this.timer = 0;

		this.init();
    };
	
	var getWindowWidth = function() {
		var htmlRect = document.documentElement.getBoundingClientRect(), 
			fullWindowWidth = window.innerWidth || (htmlRect.right - Math.abs(htmlRect.left));
		return fullWindowWidth;
	};
    Modal.prototype = {
		
		init : function() {			
				
			this.actions();
			this.trigger();	
			if ( this.options.content && this.options.content !== undefined ) {				
				this.content( this.options.content );
			}
		},
		
		actions : function() {
			var self = this;
			this.open = function() {
				this._open();
			},
		
			this.close = function() {
				this._close();
			},
		
			this._open = function() {
		
				if ( this.options.backdrop ) {
					this.createOverlay();
				} else { this.overlay = null }
				
				if ( this.overlay ) {
					setTimeout( function() {																
						self.addClass(self.overlay,'in');
					}, 0);						
				}
								
				clearTimeout(self.modal.getAttribute('data-timer'));
				this.timer = setTimeout( function() {
					self.modal.style.display = 'block';
					self.opened = true;
					
					self.checkScrollbar();
					self.adjustDialog();
					self.setScrollbar();
					
					self.resize();
					self.dismiss();
					self.keydown();			
					
					self.addClass(document.body,'modal-open');
					self.addClass(self.modal,'in');
					self.modal.setAttribute('aria-hidden', false);
				}, self.options.duration/2);
				this.modal.setAttribute('data-timer',self.timer);
			},
		
			this._close = function() {
							
				if ( this.overlay ) {					
					this.removeClass(this.overlay,'in');
				}			
				this.removeClass(this.modal,'in');
				this.modal.setAttribute('aria-hidden', true);
								
				clearTimeout(self.modal.getAttribute('data-timer'));
				this.timer = setTimeout( function() {
					self.opened = false;				
					self.removeClass(document.body,'modal-open');
					self.resize();
					self.resetAdjustments();
					self.resetScrollbar();			
					
					self.dismiss();
					self.keydown();										
					self.modal.style.display = '';
				}, self.options.duration/2);
				this.modal.setAttribute('data-timer',self.timer);
				
				setTimeout( function() {
					if (!document.querySelector('.modal.in')) {	self.removeOverlay(); }
				}, self.options.duration);	
			},
		
			this.content = function( content ) {
				return this.modal.querySelector('.modal-content').innerHTML = content;
			},
		
			this.createOverlay = function() {
				var backdrop = document.createElement('div'), overlay = document.querySelector('.modal-backdrop');
				backdrop.setAttribute('class','modal-backdrop fade');
		
				if ( overlay ) {
					this.overlay = overlay;
				} else {
					this.overlay = backdrop;
					document.body.appendChild(backdrop);
				}
			},
		
			this.removeOverlay = function() {
				var overlay = document.querySelector('.modal-backdrop');
				if ( overlay !== null && overlay !== undefined ) {
					document.body.removeChild(overlay)
				}
			},
		
			this.keydown = function() {
				function keyHandler(e) {
					if (self.options.keyboard && e.which == 27) {
						self.close();
					}					
				}
				if (this.opened) {
					document.addEventListener('keydown', keyHandler, false);
				} else {
					document.removeEventListener('keydown', keyHandler, false);
				}	
			},
		
			this.trigger = function() {
				var triggers = document.querySelectorAll('[data-toggle="modal"]'), tgl = triggers.length, i = 0;
				for ( i;i<tgl;i++ ) {
					triggers[i].addEventListener('click', function(e) {
						var b = e.target,
						s = b.getAttribute('data-target') && b.getAttribute('data-target').replace('#','')
						|| b.getAttribute('href') && b.getAttribute('href').replace('#','');
						if ( document.getElementById( s ) === self.modal ) {
							self.open()
						}
					})
				}
			},
		
			this._resize = function() {
				var overlay = this.overlay||document.querySelector('.modal-backdrop'),
					dim = { w: document.documentElement.clientWidth + 'px', h: document.documentElement.clientHeight + 'px' };
				// setTimeout(function() {
					if ( overlay !== null && /in/.test(overlay.className) ) {
						overlay.style.height = dim.h; overlay.style.width = dim.w;
					}
				// }, self.options.duration/2)
			},
			
			this.oneResize = function() {
				function oneResize() {
					self._resize();
					self.handleUpdate();
					window.removeEventListener('resize', oneResize, false);
				}
				window.addEventListener('resize', oneResize, false);			
			},
		
			this.resize = function() {
				function resizeHandler() {
					// setTimeout(function() {
						self._resize();
						self.handleUpdate();
						console.log('offresize')
					// }, 100)
				}			

				if (this.opened) {
					window.addEventListener('resize', this.oneResize, false);
				} else {
					window.removeEventListener('resize', this.oneResize, false);
				}
					
			},
		
			this.dismiss = function() {
				function dismissHandler(e) {
					if ( e.target.parentNode.getAttribute('data-dismiss') === 'modal' || e.target.getAttribute('data-dismiss') === 'modal' || e.target === self.modal ) {
						e.preventDefault(); self.close()
					}
				}					
				if (this.opened) {
					this.modal.addEventListener('click', dismissHandler, false);
				} else {
					this.modal.removeEventListener('click', dismissHandler, false);
				}	
			},
		
			// these following methods are used to handle overflowing modals
			
			this.handleUpdate = function () {
				this.adjustDialog(); 
			},
			
			this.adjustDialog = function () {
				this.modal.style.paddingLeft = !this.bodyIsOverflowing && this.modalIsOverflowing ? this.scrollbarWidth + 'px' : '';
				this.modal.style.paddingRight = this.bodyIsOverflowing && !this.modalIsOverflowing ? this.scrollbarWidth + 'px' : '';

				// console.log(this.bodyIsOverflowing + ' ' + this.modal.id);
				// this.modal.offsetWidth;
			},
			
			this.resetAdjustments = function () {
				this.modal.style.paddingLeft = '';
				this.modal.style.paddingRight = '';
			},
			
			this.checkScrollbar = function () {	
				this.bodyIsOverflowing = document.body.clientWidth < getWindowWidth();
				this.modalIsOverflowing = this.modal.scrollHeight > document.documentElement.clientHeight;
				this.scrollbarWidth = this.measureScrollbar();
			},
			
			this.setScrollbar = function () {
				var bodyStyle = window.getComputedStyle(document.body), bodyPad = parseInt((bodyStyle.paddingRight), 10);
				if (this.bodyIsOverflowing) { document.body.style.paddingRight = (bodyPad + this.scrollbarWidth) + 'px'; }
			},
			
			this.resetScrollbar = function () {
				document.body.style.paddingRight = '';
			},
			
			this.measureScrollbar = function () { // thx walsh
				var scrollDiv = document.createElement('div');
				scrollDiv.className = 'modal-scrollbar-measure';
				document.body.appendChild(scrollDiv);
				var scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth;
				document.body.removeChild(scrollDiv);
				return scrollbarWidth;
			},
			
			this.addClass = function(el,c) {	
				if (el.classList) { el.classList.add(c); } else { el.className += ' '+c; }
			},
			
			this.removeClass = function(el,c) {
				if (el.classList) { el.classList.remove(c); } else { el.className = el.className.replace(c,'').replace(/^\s+|\s+$/g,''); }
			}
		}
	};	
	
	// DATA API
	var Modals = document.querySelectorAll('.modal'), mdl = Modals.length, i = 0;
	for ( i;i<mdl;i++ ) {
		var modal = Modals[i], options = {};
		options.keyboard = modal.getAttribute('data-keyboard');
		options.backdrop = modal.getAttribute('data-backdrop');
		options.duration = modal.getAttribute('data-duration');
		new Modal(modal,options)
	}

	return Modal;

});


(function(factory){

	// CommonJS/RequireJS and "native" compatibility
	if(typeof module !== "undefined" && typeof exports == "object") {
		// A commonJS/RequireJS environment
		if(typeof window != "undefined") {
			// Window and document exist, so return the factory's return value.
			module.exports = factory();
		} else {
			// Let the user give the factory a Window and Document.
			module.exports = factory;
		}
	} else {
		// Assume a traditional browser.
		window.Popover = factory();
	}

})(function(){

	// POPOVER DEFINITION
	// ===================
	var Popover = function( element,options ) {
		options = options || {};
		this.isIE = (new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})").exec(navigator.userAgent) != null) ? parseFloat( RegExp.$1 ) : false; 
		this.link = typeof element === 'object' ? element : document.querySelector(element);
		this.title = this.link.getAttribute('data-title') || null;
		this.content = this.link.getAttribute('data-content') || null;
		this.popover = null;
		this.options = {};
		this.options.template = options.template ? options.template : null;
		this.options.trigger = options.trigger ? options.trigger : 'hover';
		this.options.animation = options.animation && options.animation !== 'true' ? options.animation : 'true';
		this.options.placement = options.placement ? options.placement : 'top';
		this.options.delay = parseInt(options.delay) || 100;
		this.options.dismiss = options.dismiss && options.dismiss === 'true' ? true : false;		
		this.duration = 150;
		this.options.duration = (this.isIE && this.isIE < 10) ? 0 : (options.duration || this.duration);
		this.options.container = document.body;
		if ( this.content || this.options.template ) this.init();
		this.timer = 0 // the link own event timer
		this.rect = null;
	}

	// POPOVER METHODS
	// ================
	Popover.prototype = {

		init : function() {
			this.actions();
			if (this.options.trigger === 'hover') {
				this.link.addEventListener('mouseenter', this.open, false);
				if (!this.options.dismiss) { this.link.addEventListener('mouseleave', this.close, false); }
			} else if (this.options.trigger === 'click') {
				this.link.addEventListener('click', this.toggle, false);
				if (!this.options.dismiss) { this.link.addEventListener('blur', this.close, false); }					
			} else if (this.options.trigger === 'focus') {
				this.link.addEventListener('focus', this.toggle, false);
				if (!this.options.dismiss) { this.link.addEventListener('blur', this.close, false);	}
			}
			
			if (this.options.dismiss) {	document.addEventListener('click', this.dismiss, false); }
				
			if (!(this.isIE && this.isIE < 9) && (this.options.trigger === 'focus' || this.options.trigger === 'click') ) {
				window.addEventListener('resize', this.close, false ); } // dismiss on window resize 
		},

		actions : function() {
			var self = this;

			this.toggle = function(e) {
				if (self.popover === null) {
					self.open()
				} else {
					self.close()
				}
			},
			this.open = function(e) {
				clearTimeout(self.link.getAttribute('data-timer'));
				self.timer = setTimeout( function() {
					if (self.popover === null) {
						self.createPopover();
						self.stylePopover();
						self.updatePopover()
					}
				}, self.options.duration );
				self.link.setAttribute('data-timer',self.timer);
			},
			this.dismiss = function(e) {
				if (self.popover && e.target === self.popover.querySelector('.close')) {					
					self.close();
				}
			},
			this.close = function(e) {
				clearTimeout(self.link.getAttribute('data-timer'));
				self.timer = setTimeout( function() {
					if (self.popover && self.popover !== null && /in/.test(self.popover.className)) {
						self.popover.className = self.popover.className.replace(' in','');
						setTimeout(function() {
							self.removePopover(); // for performance/testing reasons we can keep the popovers if we want
						}, self.options.duration);
					}

				}, self.options.delay + self.options.duration);
				self.link.setAttribute('data-timer',self.timer);
			},

			//remove the popover
			this.removePopover = function() {
				this.popover && this.options.container.removeChild(this.popover);
				this.popover = null;
				this.timer = null
			},

			this.createPopover = function() {
				this.popover = document.createElement('div');

				if ( this.content !== null && this.options.template === null ) { //create the popover from data attributes

					this.popover.setAttribute('role','tooltip');

					var popoverArrow = document.createElement('div');
					popoverArrow.setAttribute('class','arrow');

					if (this.title !== null) {
						var popoverTitle = document.createElement('h3');
						popoverTitle.setAttribute('class','popover-title');
						
						if (this.options.dismiss) {
							popoverTitle.innerHTML = this.title + '<button type="button" class="close">×</button>';
						} else {
							popoverTitle.innerHTML = this.title;
						}
						this.popover.appendChild(popoverTitle);
					}

					var popoverContent = document.createElement('div');
					popoverContent.setAttribute('class','popover-content');

					this.popover.appendChild(popoverArrow);
					this.popover.appendChild(popoverContent);

					//set popover content
					if (this.options.dismiss && this.title === null) {
						popoverContent.innerHTML = this.content + '<button type="button" class="close">×</button>';
					} else {
						popoverContent.innerHTML = this.content;
					}

				} else {  // or create the popover from template
					var template = document.createElement('div');
					template.innerHTML = this.options.template;
					this.popover.innerHTML = template.firstChild.innerHTML;
				}

				//append to the container
				this.options.container.appendChild(this.popover);
				this.popover.style.display = 'block';
			},

			this.stylePopover = function(pos) {
				this.rect = this.getRect();
				var placement = pos || this.options.placement;
				var animation = this.options.animation === 'true' ? 'fade' : '';
				this.popover.setAttribute('class','popover '+placement+' '+animation);

				var linkDim = { w: this.link.offsetWidth, h: this.link.offsetHeight }; //link real dimensions

				// all popover dimensions
				var pd = this.popoverDimensions(this.popover);
				var toolDim = { w : pd.w, h: pd.h }; //popover real dimensions


				//window vertical and horizontal scroll

				var scrollYOffset = this.getScroll().y;
				var scrollXOffset =  this.getScroll().x;

				//apply styling
				if ( /top/.test(placement) ) { //TOP
					this.popover.style.top = this.rect.top + scrollYOffset - toolDim.h + 'px';
					this.popover.style.left = this.rect.left + scrollXOffset - toolDim.w/2 + linkDim.w/2 + 'px'

				} else if ( /bottom/.test(placement) ) { //BOTTOM
					this.popover.style.top = this.rect.top + scrollYOffset + linkDim.h + 'px';
					this.popover.style.left = this.rect.left + scrollXOffset - toolDim.w/2 + linkDim.w/2 + 'px';

				} else if ( /left/.test(placement) ) { //LEFT
					this.popover.style.top = this.rect.top + scrollYOffset - toolDim.h/2 + linkDim.h/2 + 'px';
					this.popover.style.left = this.rect.left + scrollXOffset - toolDim.w + 'px';

				} else if ( /right/.test(placement) ) { //RIGHT
					this.popover.style.top = this.rect.top + scrollYOffset - toolDim.h/2 + linkDim.h/2 + 'px';
					this.popover.style.left = this.rect.left + scrollXOffset + linkDim.w + 'px';
				}
			},

			this.updatePopover = function() {
				var placement = null;
				if ( !self.isElementInViewport(self.popover) ) {
					placement = self.updatePlacement();
				} else {
					placement = self.options.placement;
				}

				self.stylePopover(placement);

				self.popover.className += ' in';
			},
			this.updatePlacement = function() {
				var pos = this.options.placement;
				if ( /top/.test(pos) ) { //TOP
					return 'bottom';
				} else if ( /bottom/.test(pos) ) { //BOTTOM
					return 'top';
				} else if ( /left/.test(pos) ) { //LEFT
					return 'right';
				} else if ( /right/.test(pos) ) { //RIGHT
					return 'left';
				}
			},
			this.getRect = function() {
				return this.link.getBoundingClientRect()
			},
			this.getScroll = function() {
				return {
					y : window.pageYOffset || document.documentElement.scrollTop,
					x : window.pageXOffset || document.documentElement.scrollLeft
				}
			},
			this.popoverDimensions	= function(p) {//check popover width and height
				return {
					w : p.offsetWidth,
					h : p.offsetHeight
				}
			},
			this.isElementInViewport = function(t) { // check if this.popover is in viewport
				var r = t.getBoundingClientRect();
				return (
					r.top >= 0 &&
					r.left >= 0 &&
					r.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
					r.right <= (window.innerWidth || document.documentElement.clientWidth)
				)
			}
		}
    }

	// POPOVER DATA API
	// =================
    var Popovers = document.querySelectorAll('[data-toggle=popover]'), i = 0, ppl = Popovers.length;
	for (i;i<ppl;i++){	
		var item = Popovers[i], options = {};
		options.trigger = item.getAttribute('data-trigger'); // click / hover / focus
		options.animation = item.getAttribute('data-animation'); // true / false
		options.duration = item.getAttribute('data-duration');
		options.placement = item.getAttribute('data-placement');
		options.dismiss = item.getAttribute('data-dismiss');
		options.delay = item.getAttribute('data-delay');
		new Popover(item,options);
	}

	return Popover;

});


(function(factory){

	// CommonJS/RequireJS and "native" compatibility
	if(typeof module !== "undefined" && typeof exports == "object") {
		// A commonJS/RequireJS environment
		if(typeof window != "undefined") {
			// Window and document exist, so return the factory's return value.
			module.exports = factory();
		} else {
			// Let the user give the factory a Window and Document.
			module.exports = factory;
		}
	} else {
		// Assume a traditional browser.
		window.ScrollSpy = factory();
	}

})(function(){

	//SCROLLSPY DEFINITION
	var ScrollSpy = function(element,item,options) {
		options = options || {};
		
		//this is the container element we spy it's elements on
		this.element = typeof element === 'object' ? element : document.querySelector(element);

		this.options = {};
		this.isIE = (new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})").exec(navigator.userAgent) != null) ? parseFloat( RegExp.$1 ) : false;
		// this is the UL menu component our scrollSpy object will target, configure and required by the container element
		this.options.target = options.target ? (typeof options.target === 'object' ? options.target : document.querySelector(options.target)) : null;

		//we need to determine the index of each menu item
		this.items = this.options.target && this.options.target.getElementsByTagName('A');

		this.item = item;
		// the parent LI element
		this.parent = this.item.parentNode;

		// the upper level LI ^ UL ^ LI, this is required for dropdown menus
		this.parentParent = this.parent.parentNode.parentNode;

		this.tg = this.item.href && document.getElementById(this.item.getAttribute('href').replace('#',''));
		this.active = false;
		this.topEdge = 0;
		this.bottomEdge = 0;

		//determine which is the real scrollTarget
		if ( this.element.offsetHeight < this.element.scrollHeight ) { // or this.scrollHeight()
			this.scrollTarget = this.element;
		} else {
			this.scrollTarget = window;
		}

		if ( this.options.target ) {
			this.init();
		}
	};

	//SCROLLSPY METHODS
	ScrollSpy.prototype = {
		init: function () {
			if ( this.item.getAttribute('href') && this.item.getAttribute('href').indexOf('#') > -1 ) {
				//actions
				this.checkEdges();
				this.refresh()
				this.scrollEvent();
				if (!(this.isIE && this.isIE < 9)) { this.resizeEvent(); }
			}
		},
		topLimit: function () { // the target offset
			if ( this.scrollTarget === window ) {
				return this.tg.getBoundingClientRect().top + this.scrollOffset() - 5
			} else {
				return this.tg.offsetTop;
			}

		},
		bottomLimit: function () {
			return this.topLimit() + this.tg.clientHeight
		},
		checkEdges: function () {
			this.topEdge = this.topLimit();
			this.bottomEdge = this.bottomLimit()
		},
		scrollOffset: function () {
			if ( this.scrollTarget === window ) {
				return window.pageYOffset || document.documentElement.scrollTop
			} else {
				return this.element.scrollTop
			}
		},
		activate: function () {
			if ( this.parent && this.parent.tagName === 'LI' && !/active/.test(this.parent.className) ) {
				this.addClass(this.parent,'active');
				if ( this.parentParent && this.parentParent.tagName === 'LI' // activate the dropdown as well
					&& /dropdown/.test(this.parentParent.className)
					&& !/active/.test(this.parentParent.className) ) { this.addClass(this.parentParent,'active'); }
				this.active = true
			}
		},
		deactivate: function () {
			if ( this.parent && this.parent.tagName === 'LI' && /active/.test(this.parent.className) ) {
				this.removeClass(this.parent,'active');
				if ( this.parentParent && this.parentParent.tagName === 'LI' // deactivate the dropdown as well
					&& /dropdown/.test(this.parentParent.className)
					&& /active/.test(this.parentParent.className) ) { this.removeClass(this.parentParent,'active'); }
				this.active = false
			}
		},
		toggle: function () {
			if ( this.active === false
				&& ( this.bottomEdge > this.scrollOffset() && this.scrollOffset() >= this.topEdge )) { //regular use, scroll just entered the element's topLimit or bottomLimit
					this.activate();
			} else if (this.active === true && (this.bottomEdge <= this.scrollOffset() && this.scrollOffset() < this.topEdge )) {
				this.deactivate()
			}
		},
		refresh : function () { // check edges again
			this.deactivate();
			this.checkEdges();

			this.toggle() // If any case update values again
		},
		scrollEvent : function(){
			var self = this;
			this.scrollTarget.addEventListener('scroll', onSpyScroll, false);
			function onSpyScroll() {
				self.refresh();
			}
		},
		resizeEvent : function(){
			var self = this;
			window.addEventListener('resize', onSpyResize, false);
			function onSpyResize() {
				self.refresh()
			}
		},
		scrollHeight : function() {
			if ( this.scrollTarget === window ) {
				return Math.max( document.body.scrollHeight, document.body.offsetHeight, 
					document.documentElement.clientHeight, document.documentElement.scrollHeight, document.documentElement.offsetHeight );
			} else {
				return this.element.scrollHeight
			}
		},
		addClass : function(el,c) {	
			if (el.classList) { el.classList.add(c); } else { el.className += ' '+c; }
		},
		removeClass : function(el,c) {
			if (el.classList) { el.classList.remove(c); } else { el.className = el.className.replace(c,'').replace(/^\s+|\s+$/g,''); }
		}	
	};


	//SCROLLSPY API
	//=============
	var scrollSpyes = document.querySelectorAll('[data-spy="scroll"]'), i = 0, ssl = scrollSpyes.length; // mostly is the document.body or a large container with many elements having id="not-null-id"
	for (i;i<ssl;i++) {
		var spy = scrollSpyes[i], options = {};
		options.target = spy.getAttribute('data-target') || null;	// this must be a .nav component with id="not-null"	
		if ( options.target !== null ) {
			var menu = options.target === 'object' ?  options.target : document.querySelector(options.target),
				items = menu.querySelectorAll('a'), j = 0, il = items.length;
			for (j;j<il;j++) {
				var item = items[j];
				if ( item.href && item.getAttribute('href') !== '#' )
				new ScrollSpy(spy, item, options);
			}
		}
	}

	return ScrollSpy;

});


(function(factory){

	// CommonJS/RequireJS and "native" compatibility
	if(typeof module !== "undefined" && typeof exports == "object") {
		// A commonJS/RequireJS environment
		if(typeof window != "undefined") {
			// Window and document exist, so return the factory's return value.
			module.exports = factory();
		} else {
			// Let the user give the factory a Window and Document.
			module.exports = factory;
		}
	} else {
		// Assume a traditional browser.
		window.Tab = factory();
	}

})(function(){

	// TAB DEFINITION
	// ===================
	var Tab = function( element,options ) {
		options = options || {};
		this.isIE = (new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})").exec(navigator.userAgent) != null) ? parseFloat( RegExp.$1 ) : false; 		
		this.tab = typeof element === 'object' ? element : document.querySelector(element);
		this.tabs = this.tab.parentNode.parentNode;
		this.dropdown = this.tabs.querySelector('.dropdown');
		if ( /dropdown-menu/.test(this.tabs.className) ) {
			this.dropdown = this.tabs.parentNode;
			this.tabs = this.tabs.parentNode.parentNode;
		}
		this.options = options;

		// default tab transition duration
		this.duration = 150;
		this.options.duration = (this.isIE && this.isIE < 10)  ? 0 : (options.duration || this.duration);
		this.init();
	}

	// TAB METHODS
	// ================
	Tab.prototype = {

		init : function() {
			this.actions();
			this.tab.addEventListener('click', this.action, false);
		},

		actions : function() {
			var self = this;

			this.action = function(e) {
				e = e || window.e; e.preventDefault();
				var next = e.target; //the tab we clicked is now the next tab
				var nextContent = document.getElementById(next.getAttribute('href').replace('#','')); //this is the actual object, the next tab content to activate
				var isDropDown = new RegExp('(?:^|\\s)'+ 'dropdown-menu' +'(?!\\S)');
				
				// get current active tab and content
				var activeTab = self.getActiveTab();
				var activeContent = self.getActiveContent();

				if ( !/active/.test(next.parentNode.className) ) {
					// toggle "active" class name
					self.removeClass(activeTab,'active');
					self.addClass(next.parentNode,'active');		
	
					// handle dropdown menu "active" class name		
					if ( !(isDropDown.test(self.tab.parentNode.parentNode.className)) ) {
						if (/active/.test(self.dropdown.className)) self.removeClass(self.dropdown,'active');
					} else {
						if (!/active/.test(self.dropdown.className)) self.addClass(self.dropdown,'active');
					}
	
					//1. hide current active content first
					self.removeClass(activeContent,'in');
					
					setTimeout(function() { // console.log(self)
						//2. toggle current active content from view
						self.removeClass(activeContent,'active');
						self.addClass(nextContent,'active');
					}, self.options.duration);
					setTimeout(function() {
						//3. show next active content
						self.addClass(nextContent,'in');
					}, self.options.duration*2);
				}
			},
			this.addClass = function(el,c) {
				if (el.classList) { el.classList.add(c); } else { el.className += ' '+c; }
			},
			this.removeClass = function(el,c) {
				if (el.classList) { el.classList.remove(c); } else { el.className = el.className.replace(c,'').replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,''); }
			},
			this.getActiveTab = function() {
				var activeTabs = this.tabs.querySelectorAll('.active');
				if ( activeTabs.length === 1 && !/dropdown/.test(activeTabs[0].className) ) {
					return activeTabs[0]
				} else if ( activeTabs.length > 1 ) {
					return activeTabs[activeTabs.length-1]
				}
			},
			this.getActiveContent = function() {
				var a = this.getActiveTab().getElementsByTagName('A')[0].getAttribute('href').replace('#','');
				return a && document.getElementById(a)
			}
		}
	}


	// TAB DATA API
	// =================
    var Tabs = document.querySelectorAll("[data-toggle='tab'], [data-toggle='pill']"), tbl = Tabs.length, i=0;
	for ( i;i<tbl;i++ ) {
		var tab = Tabs[i], options = {};
		options.duration = tab.getAttribute('data-duration') && tab.getAttribute('data-duration') || false;
		new Tab(tab,options);
	}

	return Tab;

});


(function(factory){

	// CommonJS/RequireJS and "native" compatibility
	if(typeof module !== "undefined" && typeof exports == "object") {
		// A commonJS/RequireJS environment
		if(typeof window != "undefined") {
			// Window and document exist, so return the factory's return value.
			module.exports = factory();
		} else {
			// Let the user give the factory a Window and Document.
			module.exports = factory;
		}
	} else {
		// Assume a traditional browser.
		window.Tooltip = factory();
	}

})(function(root){

	// TOOLTIP DEFINITION
	// ===================
	var Tooltip = function( element,options ) {
		options = options || {};
		
		this.link = typeof element === 'object' ? element : document.querySelector(element);
		this.title = this.link.getAttribute('title') || this.link.getAttribute('data-original-title');
		this.tooltip = null;
		this.options = {};
		this.options.animation = options.animation && options.animation !== 'fade' ? options.animation : 'fade';
		this.options.placement = options.placement ? options.placement : 'top';
		this.options.delay = parseInt(options.delay) || 100;
		this.isIE = (new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})").exec(navigator.userAgent) != null) ? parseFloat( RegExp.$1 ) : false;
		this.duration = 150;
		this.options.duration = this.isIE && this.isIE < 10 ? 0 : (options.duration || this.duration);
		this.options.container = options.container || document.body;
		if ( this.title ) this.init();
		this.timer = 0 // the link own event timer
	}

	// TOOLTIP METHODS
	// ================
	Tooltip.prototype = {

		init : function() {
			this.actions();
			this.rect = null;
			this.link.addEventListener('mouseenter', this.open, false);
			this.link.addEventListener('mouseleave', this.close, false);

			//remove title from link
			this.link.setAttribute('data-original-title',this.title);
			this.link.removeAttribute('title');

		},

		actions : function() {
			var self = this;

			this.open = function(e) {
				clearTimeout(self.link.getAttribute('data-timer'));
				self.timer = setTimeout( function() {
					if (self.tooltip === null) {
						self.createToolTip();
						self.styleTooltip();
						self.updateTooltip()
					}
				}, self.options.duration );
				self.link.setAttribute('data-timer',self.timer);
			},

			this.close = function(e) {
				clearTimeout(self.link.getAttribute('data-timer'));
				self.timer = setTimeout( function() {
					if (self.tooltip && self.tooltip !== null) {
						self.tooltip.className = self.tooltip.className.replace(' in','');
						setTimeout(function() {
							self.removeToolTip(); // for performance/testing reasons we can keep the tooltips if we want
						}, self.options.duration);
					}

				}, self.options.delay + self.options.duration);
				self.link.setAttribute('data-timer',self.timer);
			},

			//remove the tooltip
			this.removeToolTip = function() {
				this.tooltip && this.options.container.removeChild(this.tooltip);
				this.tooltip = null;
			},

			//create the tooltip structure
			this.createToolTip = function() {
				this.tooltip = document.createElement('div');
				this.tooltip.setAttribute('role','tooltip');

				var tooltipArrow = document.createElement('div');
				tooltipArrow.setAttribute('class','tooltip-arrow');
				var tooltipInner = document.createElement('div');
				tooltipInner.setAttribute('class','tooltip-inner');

				this.tooltip.appendChild(tooltipArrow);
				this.tooltip.appendChild(tooltipInner);

				//set tooltip content
				tooltipInner.innerHTML = this.title;

				//append to the container
				this.options.container.appendChild(this.tooltip);
			},

			this.styleTooltip = function(pos) {
				this.rect = this.getRect();
				var placement = pos || this.options.placement;
				this.tooltip.setAttribute('class','tooltip '+placement+' '+this.options.animation);

				var linkDim = { w: this.link.offsetWidth, h: this.link.offsetHeight }; //link real dimensions

				// all tooltip dimensions
				var td = this.tooltipDimensions(this.tooltip);
				var toolDim = { w : td.w, h: td.h }; //tooltip real dimensions

				//window vertical and horizontal scroll
				var scrollYOffset = this.getScroll().y;
				var scrollXOffset =  this.getScroll().x;

				//apply styling
				if ( /top/.test(placement) ) { //TOP
					this.tooltip.style.top = this.rect.top + scrollYOffset - toolDim.h + 'px';
					this.tooltip.style.left = this.rect.left + scrollXOffset - toolDim.w/2 + linkDim.w/2 + 'px'

				} else if ( /bottom/.test(placement) ) { //BOTTOM
					this.tooltip.style.top = this.rect.top + scrollYOffset + linkDim.h + 'px';
					this.tooltip.style.left = this.rect.left + scrollXOffset - toolDim.w/2 + linkDim.w/2 + 'px';

				} else if ( /left/.test(placement) ) { //LEFT
					this.tooltip.style.top = this.rect.top + scrollYOffset - toolDim.h/2 + linkDim.h/2 + 'px';
					this.tooltip.style.left = this.rect.left + scrollXOffset - toolDim.w + 'px';

				} else if ( /right/.test(placement) ) { //RIGHT
					this.tooltip.style.top = this.rect.top + scrollYOffset - toolDim.h/2 + linkDim.h/2 + 'px';
					this.tooltip.style.left = this.rect.left + scrollXOffset + linkDim.w + 'px';
				}
			},

			this.updateTooltip = function() {
				var placement = null;
				if ( !this.isElementInViewport(this.tooltip) ) {
					placement = this.updatePlacement();
				} else {
					placement = this.options.placement;
				}

				this.styleTooltip(placement);
				this.tooltip.className += ' in';
			},
			this.updatePlacement = function() {
				var pos = this.options.placement;
				if ( /top/.test(pos) ) { //TOP
					return 'bottom';
				} else if ( /bottom/.test(pos) ) { //BOTTOM
					return 'top';
				} else if ( /left/.test(pos) ) { //LEFT
					return 'right';
				} else if ( /right/.test(pos) ) { //RIGHT
					return 'left';
				}
			},
			this.getRect = function() {
				return this.link.getBoundingClientRect()
			},
			this.getScroll = function() {
				return {
					y : window.pageYOffset || document.documentElement.scrollTop,
					x : window.pageXOffset || document.documentElement.scrollLeft
				}
			},
			this.tooltipDimensions	= function(t) {//check tooltip width and height
				return {
					w : t.offsetWidth,
					h : t.offsetHeight
				}
			},
			this.isElementInViewport = function(t) { // check if this.tooltip is in viewport
				var r = t.getBoundingClientRect();
				return (
					r.top >= 0 &&
					r.left >= 0 &&
					r.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
					r.right <= (window.innerWidth || document.documentElement.clientWidth)
				)
			}
		}
    }

	// TOOLTIP DATA API
	// =================
    var Tooltips = document.querySelectorAll('[data-toggle=tooltip]'), i = 0, tpl = Tooltips.length;
	for (i;i<tpl;i++){	
		var item = Tooltips[i], options = {};
		options.animation = item.getAttribute('data-animation');
		options.placement = item.getAttribute('data-placement');
		options.duration = item.getAttribute('data-duration');
		options.delay = item.getAttribute('data-delay');
		new Tooltip(item,options);
	}

	return Tooltip;

});
