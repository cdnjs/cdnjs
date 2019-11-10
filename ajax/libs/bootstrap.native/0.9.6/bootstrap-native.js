// Native Javascript for Bootstrap 3 | All in One Pack
// by dnp_theme


// (function(w,d){
	
	//MODAL DEFINITION
    var Modal = function(element, options) { // element is the trigger button / options.target is the modal
        this.opened = false;

        this.modal = typeof element === 'object' ? element : document.querySelector(element);
		
        this.options = {};
		this.options.backdrop = options.backdrop === 'false' ? false : true;
		this.options.keyboard = options.keyboard === 'false' ? false : true;
		this.options.content = options.content;
		this.duration = options.duration || 300; // the default modal fade duration option
		this.options.duration = document.documentElement.classList.contains('ie') ? 0 : this.duration;
						
        this.dialog = this.modal.querySelector('.modal-dialog');	
		this.timer = 0;
		
		this.init()
    }

    Modal.prototype.init = function() {
		if ( this.options.content && this.options.content !== undefined ) {
			this.content( this.options.content );
		}
		this.resize();
		this.dismiss();
		this.keydown();
		this.trigger();		
	}

    Modal.prototype.open = function() {
        this._open();
    }

    Modal.prototype.close = function() {
        this._close();
    }

    Modal.prototype._open = function() {
        var self = this;
		
		if ( this.options.backdrop ) {
			this.createOverlay();
		} else { this.overlay = null }	

		document.body.classList.add('modal-open');	
		this.modal.style.display = 'block';
		
		clearTimeout(self.modal.getAttribute('data-timer'));
		this.timer = setTimeout( function() {

			if ( self.overlay !== null ) { 
				self._resize(); 
				self.overlay.classList.add('in'); 
			}
			self.modal.classList.add('in');
			self.modal.setAttribute('aria-hidden', false);   
		}, self.options.duration/2);
		this.modal.setAttribute('data-timer',self.timer);

        this.opened = true;
    }

    Modal.prototype._close = function() {
        var self = this;

        this.modal.classList.remove('in');
		this.modal.setAttribute('aria-hidden', true);

        if ( this.overlay ) this.overlay.classList.remove('in');
        document.body.classList.remove('modal-open');

		clearTimeout(self.modal.getAttribute('data-timer'));
		this.timer = setTimeout( function() {
            self.modal.style.display = 'none';
			self.removeOverlay();
        }, self.options.duration/2);		
		this.modal.setAttribute('data-timer',self.timer);
		
        this.opened = false;
    }

    Modal.prototype.content = function( content ) {
        return this.modal.querySelector('.modal-content').innerHTML = content;
    }

    Modal.prototype.createOverlay = function() {
		var backdrop = document.createElement('div'), overlay = document.querySelector('.modal-backdrop');
		backdrop.setAttribute('class','modal-backdrop fade');
		
		if ( overlay ) {
			this.overlay = overlay;
		} else {
			this.overlay = backdrop;
			document.body.appendChild(backdrop);			
		}	
	}
	
    Modal.prototype.removeOverlay = function() {
		var overlay = document.querySelector('.modal-backdrop');
		if ( overlay !== null && overlay !== undefined ) {
			document.body.removeChild(overlay)
		}	
	}
	
    Modal.prototype.keydown = function() {
		var self = this;
		document.addEventListener('keydown', function(e) {
			if (self.options.keyboard && e.which == 27) {
				self.close();
			}
		}, false);			
    }

    Modal.prototype.trigger = function() {
		var self = this;
		var triggers = document.querySelectorAll('[data-toggle="modal"]');
		[].forEach.call(triggers, function(btn,idx) {
			btn.addEventListener('click', function(e) {
				var b = e.target, 
				s = b.getAttribute('data-target') && b.getAttribute('data-target').replace('#','') 
				 || b.getAttribute('href') && b.getAttribute('href').replace('#','');
				if ( document.getElementById( s ) === self.modal ) {
					self.open()
				}
			})	
		})		
    }

    Modal.prototype._resize = function() {
		var self = this, overlay = this.overlay||document.querySelector('.modal-backdrop'), 
			dim = { w: document.documentElement.clientWidth + 'px', h: document.documentElement.clientHeight + 'px' };
		setTimeout(function() {
			if ( overlay !== null && overlay.classList.contains('in') ) { 
				overlay.style.height = dim.h; overlay.style.width = dim.w 
			}
		}, self.options.duration/2)
    }

    Modal.prototype.resize = function() {
		var self = this;
		window.addEventListener('resize',  function() {
			setTimeout(function() {
				self._resize()
			}, 50)
		}, false);
    }

    Modal.prototype.dismiss = function() {
		var self = this;
		this.modal.addEventListener('click', function(e){
			if ( e.target.parentNode.getAttribute('data-dismiss') === 'modal' || e.target.getAttribute('data-dismiss') === 'modal' || e.target === self.modal ) {
				e.preventDefault(); self.close()
			}
		})
    }

	var Modals = document.querySelectorAll('.modal');
	[].forEach.call(Modals,function(modal,idx) {
		var options = {};
		options.keyboard = modal.getAttribute('data-keyboard');
		options.backdrop = modal.getAttribute('data-backdrop');
		options.duration = modal.getAttribute('data-duration');
		return new Modal(modal,options)
	});
	

	//AFFIX DEFINITION
	var Affix = function(element,options) {
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
			if ( this.element.classList && !this.element.classList.contains('affix') ) this.element.classList.add('affix');
			this.affixed = true
		},
		unPinTop: function () { 
			if ( this.element.classList && this.element.classList.contains('affix') ) this.element.classList.remove('affix');
			this.affixed = false
		},
		pinBottom: function () {
			if ( this.element.classList && !this.element.classList.contains('affix-bottom') ) this.element.classList.add('affix-bottom');
			this.affixedBottom = true
		},
		unPinBottom: function () { 
			if ( this.element.classList && this.element.classList.contains('affix-bottom') ) this.element.classList.remove('affix-bottom');
			this.affixedBottom = false
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
			return Math.max( document.body.scrollHeight, document.body.offsetHeight, document.documentElement.clientHeight, document.documentElement.scrollHeight, document.documentElement.offsetHeight )
		},

		scrollEvent : function(){
			var self = this;
			window.addEventListener('scroll', affOnScroll = function() {
				self.updatePin()
			}, false);

		},
		resizeEvent : function(){
			var self = this;
			window.addEventListener('resize', affOnResize = function () {
				setTimeout(function(){
					self.updateAffix()
				},100);
			}, false);

		}
	};
	
	var Affixes = document.querySelectorAll('[data-spy="affix"]');
	[].forEach.call(Affixes, function (item) {
		var options = {};
			options.offsetTop		= item.getAttribute('data-offset-top');
			options.offsetBottom	= item.getAttribute('data-offset-bottom');
			options.target			= item.getAttribute('data-target');

		if ( item && (options.offsetTop !== null || options.offsetBottom !== null || options.target !== null) ) { //don't do anything unless we have something valid to pin
			return new Affix(item, options);
		}
	});
	
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
			var self = this;
			this.actions();
			document.addEventListener('click', this.close, false); //delegate to all alerts, including those inserted later into the DOM
		},
	
		actions : function() {
			var self = this;
			
			this.close = function(e) {
				var target = e.target;
				self.btn = target.getAttribute('data-dismiss') === 'alert' && target.className === 'close' ? target : target.parentNode;
				self.alert = self.btn.parentNode;
					
				if ( self.alert !== null && self.btn.getAttribute('data-dismiss') === 'alert' && self.alert.classList.contains('in') ) {
					self.alert.classList.remove('in');
					setTimeout(function() {
						self.alert && self.alert.parentNode.removeChild(self.alert);
					}, self.duration);						
				}

			}
		}
    }
    
	// ALERT DATA API
	// =================
    var Alerts = document.querySelectorAll('[data-dismiss="alert"]');
	[].forEach.call(Alerts, function (item) {
		return new Alert(item);
	});
	
	//SCROLLSPY DEFINITION
	var ScrollSpy = function(element,item,options) {
		
		//this is the container element we spy it's elements on
		this.element = typeof element === 'object' ? element : document.querySelector(element);
		
		this.options = {};
		
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
				this.resizeEvent();
			}
		},
		topLimit: function () { // the target offset
			var s = this.tg.currentStyle || window.getComputedStyle(this.tg);
			var els = this.element.currentStyle || window.getComputedStyle(this.element);
			if ( this.scrollTarget === window ) {
				return this.tg.getBoundingClientRect().top + this.scrollOffset()
			} else {
				return this.tg.offsetTop;
			}
				
		},
		bottomLimit: function () {
			var s = this.tg.currentStyle || window.getComputedStyle(this.tg);
			var els = this.element.currentStyle || window.getComputedStyle(this.element);
			return this.topLimit() + this.tg.offsetHeight
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
			if ( this.parent && this.parent.tagName === 'LI' && !this.parent.classList.contains('active') ) {
				this.parent.classList.add('active'); 
				if ( this.parentParent && this.parentParent.tagName === 'LI' // activate the dropdown as well
					&& this.parentParent.classList.contains('dropdown') 
					&& !this.parentParent.classList.contains('active') ) { this.parentParent.classList.add('active');}
				this.active = true
			}
		},
		deactivate: function () { 
			if ( this.parent && this.parent.tagName === 'LI' && this.parent.classList.contains('active') ) {
				this.parent.classList.remove('active');
				if ( this.parentParent && this.parentParent.tagName === 'LI' // deactivate the dropdown as well
					&& this.parentParent.classList.contains('dropdown') 
					&& this.parentParent.classList.contains('active') ) { this.parentParent.classList.remove('active'); }
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
				return Math.max( document.body.scrollHeight, document.body.offsetHeight, document.documentElement.clientHeight, document.documentElement.scrollHeight, document.documentElement.offsetHeight );
			} else {
				return this.element.scrollHeight
			}
		}
	};

	
	//SCROLLSPY API
	//=============
	var scrollSpyes = document.querySelectorAll('[data-spy="scroll"]'); // mostly is the document.body or a large container with many elements having id="not-null-id"
	[].forEach.call(scrollSpyes, function (spy,idx) {
		var options = {};
		options.target = spy.getAttribute('data-target') || null;	// this must be a .nav component with id="not-null"	
		if ( options.target !== null ) {
			var menu = options.target === 'object' ?  options.target : document.querySelector(options.target);
			var items = menu.querySelectorAll('a');
			[].forEach.call(items, function (item,i) {
				if ( item.href && item.getAttribute('href') !== '#' )
				return new ScrollSpy(spy, item, options);
			})	
		}
	});

	// TAB DEFINITION
	// ===================
	var Tab = function( element,options ) {
		this.tab = typeof element === 'object' ? element : document.querySelector(element);
		this.tabs = this.tab.parentNode.parentNode;
		this.dropdown = this.tabs.querySelector('.dropdown');
		if ( this.tabs.classList.contains('dropdown-menu') ) {
			this.dropdown = this.tabs.parentNode;
			this.tabs = this.tabs.parentNode.parentNode;			
		}
		this.options = {};
		
		// default tab transition duration
		this.duration = 150;
		this.options.duration = document.documentElement.classList.contains('ie') ? 0 : (options.duration || this.duration);
		this.init();
	}
	
	// TAB METHODS
	// ================
	Tab.prototype = {
		
		init : function() {
			var self = this;
			self.actions();
			self.tab.addEventListener('click', self.action, false);
		},
	
		actions : function() {
			var self = this;
			
			this.action = function(e) {
				e = e || window.e;
				var next = e.target; //the tab we clicked is now the next tab
				var nextContent = document.getElementById(next.getAttribute('href').replace('#','')); //this is the actual object, the next tab content to activate
				
				var activeTab = self.getActiveTab();
				var activeContent = self.getActiveContent();
				
				//toggle "active" class name
				activeTab.classList.remove('active');
				next.parentNode.classList.add('active');
				
				//handle dropdown menu "active" class name
				if ( !self.tab.parentNode.parentNode.classList.contains('dropdown-menu')){
					self.dropdown && self.dropdown.classList.remove('active');
				} else {
					self.dropdown && self.dropdown.classList.add('active');
				}
				
				//1. hide current active content first
				activeContent.classList.remove('in');
				
				setTimeout(function() {
					//2. toggle current active content from view
					activeContent.classList.remove('active');
					nextContent.classList.add('active');
				}, self.options.duration);	
				setTimeout(function() {
					//3. show next active content
					nextContent.classList.add('in');
				}, self.options.duration*2);	
				e.preventDefault();
			},
		
			this.getActiveTab = function() {
				var activeTabs = self.tabs.querySelectorAll('.active');
				if ( activeTabs.length === 1 && !activeTabs[0].classList.contains('dropdown') ) {
					return activeTabs[0]
				} else if ( activeTabs.length > 1 ) {
					return activeTabs[activeTabs.length-1]
				}
				
				console.log(activeTabs.length)
			},
			this.getActiveContent = function() {
				var a = self.getActiveTab().getElementsByTagName('A')[0].getAttribute('href').replace('#','');
				return a && document.getElementById(a)
			}
		}
	}	
    
	// TAB DATA API
	// =================
    var Tabs = document.querySelectorAll("[data-toggle='tab'], [data-toggle='pill']");
	[].forEach.call(Tabs, function (tab) {
		var options = {};
		options.duration = tab.getAttribute('data-duration') && tab.getAttribute('data-duration') || false;
		return new Tab(tab,options);
	});
	

	// POPOVER DEFINITION
	// ===================
	var Popover = function( element,options ) {
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
		this.duration = 150;
		this.options.duration = document.documentElement.classList.contains('ie') ? 0 : (options.duration || this.duration);		
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
				this.link.addEventListener('mouseleave', this.close, false);
			} else if (this.options.trigger === 'click') {
				this.link.addEventListener('click', this.toggle, false);
				this.link.addEventListener('blur', this.close, false);				
			} else if (this.options.trigger === 'focus') {
				this.link.addEventListener('focus', this.toggle, false);
				this.link.addEventListener('blur', this.close, false);				
			}
			if (!document.documentElement.classList.contains('ie') && (this.options.trigger === 'focus' || this.options.trigger === 'click') ) 
				window.addEventListener('resize', this.close, false ); // dismiss on window resize
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
			
			this.close = function(e) {			
				clearTimeout(self.link.getAttribute('data-timer'));
				self.timer = setTimeout( function() { 
					if (self.popover && self.popover !== null && self.popover.classList.contains('in')) {
						self.popover.classList.remove('in');
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
						popoverTitle.innerHTML = this.title
						this.popover.appendChild(popoverTitle);
					}
					
					var popoverContent = document.createElement('div');
					popoverContent.setAttribute('class','popover-content');

					this.popover.appendChild(popoverArrow);
					this.popover.appendChild(popoverContent);
					
					//set popover content
					popoverContent.innerHTML = this.content;
					
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
				// var scrollYOffset = this.options.container === document.body ? window.pageYOffset || document.documentElement.scrollTop : this.options.container.offsetTop;
				// var scrollXOffset = this.options.container === document.body ? window.pageXOffset || document.documentElement.scrollLeft : this.options.container.offsetLeft;
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
				
				self.popover.classList.add('in');
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
    var Popovers = document.querySelectorAll('[data-toggle=popover]');
	[].forEach.call(Popovers, function (item,index) {
		var options = {};
		options.trigger = item.getAttribute('data-trigger'); // click / hover / focus
		options.animation = item.getAttribute('data-animation'); // true / false
		options.duration = item.getAttribute('data-duration');
		options.placement = item.getAttribute('data-placement');
		options.delay = item.getAttribute('data-delay');
		return new Popover(item,options);
	});
	
		
	// BUTTON DEFINITION
	// ===================
	var Button = function( element, option ) {
		this.btn = typeof element === 'object' ? element : document.querySelector(element);
		this.option = typeof option === 'string' ? option : null;		

		this.init();
	}
	
	// BUTTON METHODS
	// ================
	Button.prototype = {
		
		init : function() {
			var self = this;
			this.actions();
			
			if ( this.btn.classList.contains('btn') ) {
				if ( this.option && this.option !== 'reset' ) {
					
					this.state = this.btn.getAttribute('data-'+this.option+'-text') || null;
					
					!this.btn.getAttribute('data-original-text') && this.btn.setAttribute('data-original-text',self.btn.innerHTML.replace(/^\s+|\s+$/g, '')); 
					this.setState();

				} else if ( this.option === 'reset' ) {
					this.reset();
				}
			}
			
			if (this.btn.classList.contains('btn-group')) {
				this.btn.addEventListener('click', this.toggle, false);				
			}
		},
	
		actions : function() {
			var self = this;
			
			this.setState = function() {
				if ( self.option === 'loading' ) {
					self.btn.classList.add('disabled'); 
					self.btn.setAttribute('disabled','disabled'); 
				}
				self.btn.innerHTML = self.state;
			},

			this.reset = function() {			
				if ( self.btn.classList.contains('disabled') || self.btn.getAttribute('disabled') === 'disabled' ) {
					self.btn.classList.remove('disabled'); 
					self.btn.removeAttribute('disabled'); 
				}
				self.btn.innerHTML = self.btn.getAttribute('data-original-text');
			},

			this.toggle = function(e) {
				var label = e.target.tagName === 'INPUT' ? e.target.parentNode : e.target; // the .btn label
				var target = e.currentTarget || e.srcElement; // the button group, the target of the Button function
				var labels = target.querySelectorAll('.btn'); // all the button group buttons
				var input = label.getElementsByTagName('INPUT')[0];
				
				// The built in event that will be triggered on demand				
				var changeEvent;
				if ( Event !== undefined && typeof Event === 'function' && typeof Event !== 'object' ) {
					changeEvent = new Event('change');
				} else { // define event type, new Event('type') does not work in any IE
					changeEvent = document.createEvent('HTMLEvents');
					changeEvent.initEvent('change', true, true);
				}				
				
				// assign event to a trigger function
				function triggerChange(t) { t.dispatchEvent(changeEvent) }

				//manage the dom manipulation
				if ( input.type === 'checkbox' ) { //checkboxes
					
					if ( input.checked )  {
						label.classList.remove('active');
						input.removeAttribute('checked');
					} else {
						label.classList.add('active');						
						input.setAttribute('checked','checked');
					}
					triggerChange(input); //trigger the change for the input
					triggerChange(self.btn) //trigger the change for the btn-group
				}

				if ( input.type === 'radio' ){ // radio buttons
				
					if ( !input.checked ) { // don't trigger if already active
						label.classList.add('active');
						input.setAttribute('checked','checked');				

						triggerChange(input); //trigger the change
						triggerChange(self.btn);

						[].forEach.call(labels, function(l) {
							if ( l !== label && l.classList.contains('active') )  {
								var inp = l.getElementsByTagName('INPUT')[0];
								l.classList.remove('active');
								inp.removeAttribute('checked');				
								triggerChange(inp)	//trigger the change
							}				
						})
					}
				}
			}
		}
    }
    
	// BUTTON DATA API
	// =================
    var Buttons = document.querySelectorAll('[data-toggle=button]');
	[].forEach.call(Buttons, function (b) {
		return new Button(b);
	})
    var ButtonGroups = document.querySelectorAll('[data-toggle=buttons]');
	[].forEach.call(ButtonGroups, function(g) {
		return new Button(g);
	});
	

	// COLLAPSE DEFINITION
	// ===================
	var Collapse = function( element, options ) {
		this.btn = typeof element === 'object' ? element : document.querySelector(element);
		this.accordion = null;
		this.collapse = null;
		this.options = {};
		this.duration = 300; // default collapse transition duration
		this.options.duration = document.documentElement.classList.contains('ie') ? 0 : (options.duration || this.duration);		
		this.init();
	}
	
	// COLLAPSE METHODS
	// ================
	Collapse.prototype = {
		
		init : function() {
			var self = this;
			this.actions();
			this.btn.addEventListener('click', this.toggle, false);
			
			// allows the collapse to expand 
			// ** when window gets resized 
			// ** or via internal clicks handers such as dropwowns or any other
			document.addEventListener('click', this.update, false); 
			window.addEventListener('resize', this.update, false)
		},
	
		actions : function() {
			var self = this;
			
			this.toggle = function(e) {
				self.btn = self.getTarget(e).btn;
				self.collapse = self.getTarget(e).collapse;
								
				if (!self.collapse.classList.contains('in')) {
					self.open(e)
				} else {
					self.close(e)					
				}
			},
			this.close = function(e) {
				e.preventDefault();
				self.btn = self.getTarget(e).btn;
				self.collapse = self.getTarget(e).collapse;
				self._close(self.collapse);
				self.btn.classList.remove('collapsed');
			},
			this.open = function(e) {
				e.preventDefault();
				self.btn = self.getTarget(e).btn;
				self.collapse = self.getTarget(e).collapse;
				self.accordion = self.btn.getAttribute('data-parent') && self.getClosest(self.btn, self.btn.getAttribute('data-parent'));
				
				self._open(self.collapse);
				self.btn.classList.add('collapsed');
				
				if ( self.accordion !== null ) {
					var active = self.accordion.querySelectorAll('.collapse.in');
					[].forEach.call(active,function(a) {
						if ( a !== self.collapse) self._close(a)						
					})
				}
			},
			this._open = function(c) {

				c.classList.add('in');
				c.style.height = 0;
				c.style.overflow = 'hidden';
				c.setAttribute('area-expanded','true');
				
				// the collapse MUST have a childElement div to wrap them all inside, just like accordion/well
				var oh = this.getMaxHeight(c).oh;
				var br = this.getMaxHeight(c).br;

				c.style.height = oh + br + 'px';
				setTimeout(function() {
					c.style.overflow = '';
				}, self.options.duration)				
			},
			this._close = function(c) {

				c.style.overflow = 'hidden';
				c.style.height = 0;
				setTimeout(function() {
					c.classList.remove('in');
					c.style.overflow = '';
					c.setAttribute('area-expanded','false');
				}, self.options.duration)				
			},
			this.update = function(e) {
				var evt = e.type;
				var tg = e.target;
				var itms = document.querySelectorAll('.collapse.in');
				[].forEach.call(itms, function(itm) {
					var oh = self.getMaxHeight(itm).oh;
					var br = self.getMaxHeight(itm).br;

					if ( evt === 'resize' || ( evt === 'click' && self.getClosest(tg,'.collapse') === itm ) ) {
						setTimeout(function() {
							itm.style.height =  oh + br + 'px'
						}, 300)
					}
				})
			},
			this.getMaxHeight = function(l) { // get collapse trueHeight and border
				var t = l.children[0]; 
				var cs = l.currentStyle || window.getComputedStyle(l);
				
				return {
					oh : getOuterHeight(t),
					br : parseInt(cs.borderTop||0) + parseInt(cs.borderBottom||0)
				}
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
				}
			},
			
			this.getClosest = function (el, s) { //el is the element and s the selector of the closest item to find
			// source http://gomakethings.com/climbing-up-and-down-the-dom-tree-with-vanilla-javascript/
				var f = s.charAt(0);
			
				for ( ; el && el !== document; el = el.parentNode ) {// Get closest match
					
					if ( f === '.' ) {// If selector is a class
						if ( el.classList.contains( s.substr(1) ) ) {
							return el;
						}
					}
	
					if ( f === '#' ) { // If selector is an ID
						if ( el.id === s.substr(1) ) {
							return el;
						}
					}
				}
				return false;
			}
		}
    }
	
	var getOuterHeight = function (el) {
		var s = el.currentStyle || window.getComputedStyle(el);
		
		return el.offsetHeight  //we need an accurate margin value
			+ parseInt( /px/.test(s.marginTop)		? Math.round(s.marginTop.replace('px',''))		: 0 ) 
			+ parseInt( /px/.test(s.marginBottom)	? Math.round(s.marginBottom.replace('px',''))	: 0 )
			+ parseInt( /em/.test(s.marginTop)		? Math.round(s.marginTop.replace('em','')		* parseInt(s.fontSize)) : 0 )
			+ parseInt( /em/.test(s.marginBottom)	? Math.round(s.marginBottom.replace('em','')	* parseInt(s.fontSize)) : 0 )
	}	
    
	// COLLAPSE DATA API
	// =================
    var Collapses = document.querySelectorAll('[data-toggle="collapse"]');
	[].forEach.call(Collapses, function (item) {
		var options = {};
		options.duration = item.getAttribute('data-duration');
		return new Collapse(item,options);
	});
	
	//we must add the height to the pre-opened collapses
	window.addEventListener('load', function() {
		var openedCollapses = document.querySelectorAll('.collapse');
		[].forEach.call(openedCollapses, function(oc) {
			if (oc.classList.contains('in')) {
				var s = oc.currentStyle || window.getComputedStyle(oc);
				var oh = getOuterHeight(oc.children[0]);
				var br = parseInt(s.borderTop||0) + parseInt(s.borderBottom||0);
				oc.style.height = oh + br + 'px'
			}
		})
	});

	// CAROUSEL DEFINITION
	// ===================
	var Carousel = function( element, options ) {
		this.carousel = (typeof element === 'object') ? element : document.querySelector( element );
		this.options = {}; //replace extend
		this.options.keyboard = options && options.keyboard === 'true' ? true : false;
		this.options.pause = options && options.pause ? options.pause : 'hover'; // false / hover
		
		// bootstrap carousel default transition duration / option
		this.duration = 600;
		this.options.duration = document.documentElement.classList.contains('ie') ? 0 : (options.duration || this.duration);
		
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
			pauseHandler = function () {
				if ( self.options.interval !==false && !self.carousel.classList.contains('paused')) {
					self.carousel.classList.add('paused');
					clearInterval( self.timer );
					self.timer = null;
				}
			}
			resumeHandler = function() {			
				if ( self.options.interval !==false && self.carousel.classList.contains('paused')) {
					self.cycle();
					self.carousel.classList.remove('paused');
				}
				
			}
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
			var type = direction === 'left' ? 'next' : 'prev';
						
			//register events
			var slid = new CustomEvent("slid.bs.carousel");
			var slide = new CustomEvent("slide.bs.carousel");
						
			self.carousel.dispatchEvent(slid); //here we go with the slid
			
			self._removeEventListeners();
			clearInterval(self.timer);
			self.timer = null;			
			self._curentPage( self.indicators[next] );
			
			if ( this.carousel.classList.contains('slide') && !document.documentElement.classList.contains('ie') ) {	
				self.slides[next].classList.add(type);
				self.slides[next].offsetWidth;
				self.slides[next].classList.add(direction);		
				self.slides[active].classList.add(direction);
									
				setTimeout(function() { //we're gonna fake waiting for the animation to finish, cleaner and better
					self._addEventListeners();
					
					self.slides[next].classList.add('active');
					self.slides[active].classList.remove('active');
					
					self.slides[next].classList.remove(type);
					self.slides[next].classList.remove(direction);
					self.slides[active].classList.remove(direction);
					

					if ( self.options.interval !== false && !self.carousel.classList.contains('paused') ){
						clearInterval(self.timer); self.cycle();
					}
					self.carousel.dispatchEvent(slide) //here we go with the slide
				}, self.options.duration + 100 );
			} else {
				self.slides[next].classList.add('active');
				self.slides[next].offsetWidth;
				self.slides[active].classList.remove('active');
				setTimeout(function() {
					self._addEventListeners();
					if ( self.options.interval !== false && !self.carousel.classList.contains('paused') ){
						clearInterval(self.timer); self.cycle();
					}
					self.carousel.dispatchEvent(slide) //here we go with the slide
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
			var oldTs = 0, oldKTs = 0;
			
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
				var active = self._getActiveIndex(); // the current active
		
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
	var Carousels = document.querySelectorAll('[data-ride="carousel"]');
	[].forEach.call(Carousels, function (item) {
		var c = item;
		var options = {};
			options.interval = c.getAttribute('data-interval') && c.getAttribute('data-interval');
			options.pause = c.getAttribute('data-pause') && c.getAttribute('data-pause') || 'hover';
			options.keyboard = c.getAttribute('data-keyboard') && c.getAttribute('data-keyboard') || false;
			options.duration = c.getAttribute('data-duration') && c.getAttribute('data-duration') || false;
		return new Carousel(c, options)
	});
	

	// TOOLTIP DEFINITION
	// ===================
	var Tooltip = function( element,options ) {
		this.link = typeof element === 'object' ? element : document.querySelector(element);
		this.title = this.link.getAttribute('title') || this.link.getAttribute('data-original-title');
		this.tooltip = null;
		this.options = {};
		this.options.animation = options.animation && options.animation !== 'fade' ? options.animation : 'fade';
		this.options.placement = options.placement ? options.placement : 'top';
		this.options.delay = parseInt(options.delay) || 100;
		
		this.duration = 150;
		this.options.duration = document.documentElement.classList.contains('ie') ? 0 : (options.duration || this.duration);		
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
						self.tooltip.classList.remove('in');
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
				// var scrollYOffset = this.options.container === document.body ? window.pageYOffset || document.documentElement.scrollTop : this.options.container.scrollTop;
				// var scrollXOffset = this.options.container === document.body ? window.pageXOffset || document.documentElement.scrollLeft : this.options.container.scrollLeft;
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
				this.tooltip.classList.add('in');
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
    var Tooltips = document.querySelectorAll('[data-toggle=tooltip]');
	[].forEach.call(Tooltips, function (item,index) {
		var options = {};
		options.animation = item.getAttribute('data-animation');
		options.placement = item.getAttribute('data-placement');
		options.duration = item.getAttribute('data-duration');
		options.delay = item.getAttribute('data-delay');
		return new Tooltip(item,options);
	});
	
	
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
				target.parentNode.classList.toggle('open');
				e.preventDefault();
				return false;
			}
			
			self.close = function(e) {
				var target = e.currentTarget || e.srcElement;
				
				setTimeout(function() { // links inside dropdown-menu don't fire without a short delay
					target.parentNode.classList.remove('open');
				}, 200);				
			}
		}
    }
    
	// DROPDOWN DATA API
	// =================
    var Dropdowns = document.querySelectorAll('[data-toggle=dropdown]');
	[].forEach.call(Dropdowns, function (item,index) {
		return new Dropdown(item);
	});	
		
// })(window,document);
