// Native Javascript for Bootstrap 3 v1.1.0 | © dnp_theme | MIT-License
(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD support:
    define([], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like:
    module.exports = factory();
  } else {
    // Browser globals (root is window)
    var bsn = factory();
    root.Affix = bsn.Affix;
    root.Alert = bsn.Alert;
    root.Button = bsn.Button;
    root.Carousel = bsn.Carousel;
    root.Collapse = bsn.Collapse;
    root.Dropdown = bsn.Dropdown;
    root.Modal = bsn.Modal;
    root.Popover = bsn.Popover;
    root.ScrollSpy = bsn.ScrollSpy;
    root.Tab = bsn.Tab;
    root.Tooltip = bsn.Tooltip;
  }
}(this, function () {
  // Native Javascript for Bootstrap 3 | Internal Utility Functions
  // by dnp_theme
  
  var addClass = function(el,c) { // where modern browsers fail, use classList
      if (el.classList) { el.classList.add(c); } else { el.className += ' '+c; el.offsetWidth; }
    },
    removeClass = function(el,c) {
      if (el.classList) { el.classList.remove(c); } else { el.className = el.className.replace(c,'').replace(/^\s+|\s+$/g,''); }
    },
    isIE = (new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})").exec(navigator.userAgent) != null) ? parseFloat( RegExp.$1 ) : false,
    getClosest = function (el, s) { //el is the element and s the selector of the closest item to find
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
    },
    // tooltip / popover stuff
    isElementInViewport = function(t) { // check if this.tooltip is in viewport
      var r = t.getBoundingClientRect();
      return (
        r.top >= 0 &&
        r.left >= 0 &&
        r.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        r.right <= (window.innerWidth || document.documentElement.clientWidth)
      )
    },
    getScroll = function() { // also Affix and scrollSpy uses it
      return {
        y : window.pageYOffset || document.documentElement.scrollTop,
        x : window.pageXOffset || document.documentElement.scrollLeft
      }
    },
    mouseHover = ('onmouseleave' in document) ? [ 'mouseenter', 'mouseleave'] : [ 'mouseover', 'mouseout' ],
    tipPositions = /\b(top|bottom|left|top)+/;
  
  // Native Javascript for Bootstrap 3 | Affix
  // by dnp_theme
  
  //AFFIX DEFINITION
  var Affix = function(element,options) {
    options = options || {};
  
    this.element = typeof element === 'object' ? element : document.querySelector(element);
    this.options = {};
    this.options.target = options.target ? ((typeof(options.target) === 'object') ? options.target : document.querySelector(options.target)) : null; // target is an object
    this.options.offsetTop = options.offsetTop && options.offsetTop ? ( options.offsetTop === 'function' ? options.offsetTop() : parseInt(options.offsetTop,0) ) : 0; // offset option is an integer number or function to determine that number
    this.options.offsetBottom = options.offsetBottom && options.offsetBottom ? ( options.offsetBottom === 'function' ? options.offsetBottom() : parseInt(options.offsetBottom,0) ) : null;
  
    if (!this.element && !(this.options.target || this.options.offsetTop || this.options.offsetBottom ) ) { return; }
  
    var self = this;
  
    this.processOffsetTop = function () {
      if ( this.options.target !== null ) {
        return this.options.target.getBoundingClientRect().top + getScroll().y;
      } else if ( this.options.offsetTop !== null ) {
        return this.options.offsetTop
      }
    };
    this.processOffsetBottom = function () {
      if ( this.options.offsetBottom !== null ) {
        var maxScroll = this.getMaxScroll();
        return maxScroll - this.element.offsetHeight - this.options.offsetBottom;
      }
    };
    this.checkPosition = function () {
      this.getPinOffsetTop = this.processOffsetTop;
      this.getPinOffsetBottom = this.processOffsetBottom;
    };
    this.pinTop = function () {
      if ( !/\baffix/.test(this.element.className) ) {
        this.element.className += ' affix';
        this.affixed = true
      }
    };
    this.unPinTop = function () {
      if ( /\baffix/.test(this.element.className) ) {
        this.element.className = this.element.className.replace(' affix','');
        this.affixed = false
      }
    };
    this.pinBottom = function () {
      if ( !/\baffix-bottom/.test(this.element.className) ) {
        this.element.className += ' affix-bottom';
        this.affixedBottom = true
      }
    };
    this.unPinBottom = function () {
      if ( /\baffix-bottom/.test(this.element.className) ) {
        this.element.className = this.element.className.replace(' affix-bottom','');
        this.affixedBottom = false
      }
    };
    this.updatePin = function () {
      if (this.affixed === false && (parseInt(this.processOffsetTop(),0) - parseInt(getScroll().y,0) < 0)) {
        this.pinTop();
      } else if (this.affixed === true && (parseInt(getScroll().y,0) <= parseInt(this.getPinOffsetTop(),0) )) {
        this.unPinTop()
      }
  
      if (this.affixedBottom === false && (parseInt(this.processOffsetBottom(),0) - parseInt(getScroll().y,0) < 0)) {
        this.pinBottom();
      } else if (this.affixedBottom === true && (parseInt(getScroll().y,0) <= parseInt(this.getPinOffsetBottom(),0) )) {
        this.unPinBottom()
      }
    };
    this.updateAffix = function () { // Unpin and check position again
      this.unPinTop();
      this.unPinBottom();
      this.checkPosition()
  
      this.updatePin() // If any case update values again
    };
    this.getMaxScroll = function(){
      return Math.max( document.body.scrollHeight, document.body.offsetHeight,
        document.documentElement.clientHeight, document.documentElement.scrollHeight, document.documentElement.offsetHeight )
    };
    this.scrollEvent = function(){
      window.addEventListener('scroll', function() {
        self.updatePin()
      }, false);
    };
    this.resizeEvent = function(){
      var dl = (isIE && isIE < 10) ? 500 : 50;
      window.addEventListener('resize', function () {
        setTimeout(function(){
          self.updateAffix()
        },dl);
      }, false);
    };
    // init
    this.affixed = false;
    this.affixedBottom = false;
    this.getPinOffsetTop = 0;
    this.getPinOffsetBottom = null;
  
    //actions
    this.checkPosition();
    this.updateAffix();
    this.scrollEvent();
    this.resizeEvent()
  };
  
  // AFFIX DATA API
  // =================
  var Affixes = document.querySelectorAll('[data-spy="affix"]');
  for (var a=0, afl = Affixes.length; a<afl; a++) {
    var affix = Affixes[a], options = {};
      options.offsetTop     = affix.getAttribute('data-offset-top');
      options.offsetBottom  = affix.getAttribute('data-offset-bottom');
      options.target        = affix.getAttribute('data-target');
  
    if ( affix && (options.offsetTop !== null || options.offsetBottom !== null || options.target !== null) ) { //don't do anything unless we have something valid to pin
      new Affix(affix, options);
    }
  }
  // Native Javascript for Bootstrap 3 | Alert
  // by dnp_theme
  
  // ALERT DEFINITION
  // ===================
  var Alert = function( element ) {
    this.btn = typeof element === 'object' ? element : document.querySelector(element);
    this.alert = null;
    this.duration = 150; // default alert transition duration
  
    var self = this;
  
    this.close = function(e) {
      var target = e.target;
      self.btn = target.getAttribute('data-dismiss') === 'alert' && target.className === 'close' ? target : target.parentNode;
      self.alert = self.btn.parentNode;
  
      if ( self.alert !== null && self.btn.getAttribute('data-dismiss') === 'alert' && /\bin/.test(self.alert.className) ) {
        self.alert.className = self.alert.className.replace(' in','');
        setTimeout(function() {
          self.alert && self.alert.parentNode.removeChild(self.alert);
        }, self.duration);
      }
    };
    document.addEventListener('click', this.close, false); //delegate to all alerts, including those inserted later into the DOM
  };
  
  // ALERT DATA API
  // =================
  var Alerts = document.querySelectorAll('[data-dismiss="alert"]');
  for (var e=0, all = Alerts.length; e<all; e++) {
    new Alert(Alerts[e]);
  }
  // Native Javascript for Bootstrap 3 | Button
  // by dnp_theme
  
  // BUTTON DEFINITION
  // ===================
  var Button = function( element, option ) {
    this.btn = typeof element === 'object' ? element : document.querySelector(element);
    this.option = typeof option === 'string' ? option : null;
  
    var self = this,
      changeEvent = (('CustomEvent' in window) && window.dispatchEvent)
        ? new CustomEvent('bs.button.change') : null; // The custom event that will be triggered on demand
  
    // assign event to a trigger function
    function triggerChange(t) { if (changeEvent) { t.dispatchEvent(changeEvent); } }
  
    this.setState = function() {
      if ( this.option === 'loading' ) {
        addClass(this.btn,'disabled');
        this.btn.setAttribute('disabled','disabled');
      }
      this.btn.innerHTML = this.state;
    };
  
    this.reset = function() {
      if ( /\bdisabled/.test(this.btn.className) || this.btn.getAttribute('disabled') === 'disabled' ) {
        removeClass(this.btn,'disabled');
        this.btn.removeAttribute('disabled');
      }
      this.btn.innerHTML = this.btn.getAttribute('data-original-text');
    };
  
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
          addClass(label,'active');
          input.getAttribute('checked');
          input.setAttribute('checked','checked');
          input.checked = true;
        } else {
          removeClass(label,'active');
          input.getAttribute('checked');
          input.removeAttribute('checked');
          input.checked = false;
        }
        triggerChange(input); //trigger the change for the input
        triggerChange(self.btn); //trigger the change for the btn-group
      }
  
      if ( input.type === 'radio' ) { // radio buttons
        if ( !input.checked ) { // don't trigger if already active
          addClass(label,'active');
          input.setAttribute('checked','checked');
          input.checked = true;
          triggerChange(self.btn);
          triggerChange(input); //trigger the change
  
          for (i;i<ll;i++) {
            var l = labels[i];
            if ( l !== label && /\bactive/.test(l.className) )  {
              var inp = l.getElementsByTagName('INPUT')[0];
              removeClass(l,'active');
              inp.removeAttribute('checked');
              inp.checked = false;
              triggerChange(inp); // trigger the change
            }
          }
        }
      }
    };
  
    // init
    if ( /\bbtn/.test(this.btn.className) ) {
      if ( this.option && this.option !== 'reset' ) {
  
        this.state = this.btn.getAttribute('data-'+this.option+'-text') || null;
  
        !this.btn.getAttribute('data-original-text') && this.btn.setAttribute('data-original-text',self.btn.innerHTML.replace(/^\s+|\s+$/g, ''));
        this.setState();
  
      } else if ( this.option === 'reset' ) {
        this.reset();
      }
    }
    if ( /\bbtn-group/.test(this.btn.className) ) {
      this.btn.addEventListener('click', this.toggle, false);
    }
  };
  
  // BUTTON DATA API
  // =================
  var Buttons = document.querySelectorAll('[data-toggle=button]');
  for (var b=0, btl = Buttons.length; b<btl; b++) {
    new Button(Buttons[b]);
  }
  
  var ButtonGroups = document.querySelectorAll('[data-toggle=buttons]');
  for (var g=0, bgl = ButtonGroups.length; g<bgl; g++) {
    new Button(ButtonGroups[g]);
  }
  // Native Javascript for Bootstrap 3 | Carousel
  // by dnp_theme
  
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
    this.options.duration = (isIE && isIE < 10) ? 0 : (parseInt(options.duration) || this.duration);
  
    var items = this.carousel.querySelectorAll('.item'), il=items.length; //this is an object
    this.controls = this.carousel.querySelectorAll('.carousel-control');
    this.prev = this.controls[0];
    this.next = this.controls[1];
    this.slides = []; for (var i = 0; i < il; i++) { this.slides.push(items[i]); } // this is an array
    this.indicator = this.carousel.querySelector( ".carousel-indicators" ); // object
    this.indicators = this.carousel.querySelectorAll( ".carousel-indicators li" ); // object
    this.total    = this.slides.length;
    this.direction  = null;
    this.index    = 0;
  
    var self = this, timer = 0;
  
    if (options.interval === 'false' ) {
      this.options.interval = false;
    } else {
      this.options.interval = parseInt(options.interval) || 5000;
    }
  
    this.cycle = function(e) {
      this.direction = 'left';
      timer = setInterval(function() {
        self.index++;
        if( self.index == self.slides.length ) {
          self.index = 0;
        }
        self._slideTo( self.index, e );
  
      }, this.options.interval);
    };
    this.pause = function() {
      var pauseHandler = function () {
        if ( self.options.interval !==false && !/\bpaused/.test(self.carousel.className) ) {
          self.carousel.className += ' paused';
          clearInterval( timer );
          timer = null;
        }
      };
      var resumeHandler = function() {
        if ( self.options.interval !==false && /\bpaused/.test(self.carousel.className) ) {
          self.cycle();
          removeClass(self.carousel,'paused');
        }
      };
      self.carousel.addEventListener( "mouseenter", pauseHandler, false);
      self.carousel.addEventListener( "mouseleave", resumeHandler, false);
      self.carousel.addEventListener( "touchstart", pauseHandler, false);
      self.carousel.addEventListener( "touchend", resumeHandler, false);
    };
    this._slideTo = function( next, e ) {
      var active = this._getActiveIndex(); // the current active
      //determine type
      var direction = this.direction;
      var dr = direction === 'left' ? 'next' : 'prev';
      var slid = null, slide = null;
  
      //register events
      if (('CustomEvent' in window) && window.dispatchEvent) {
        slid =  new CustomEvent("slid.bs.carousel");
        slide = new CustomEvent("slide.bs.carousel");
      }
      if (slide) { this.carousel.dispatchEvent(slide); } //here we go with the slide
  
      this._removeEventListeners();
      clearInterval(timer);
      timer = null;
      this._curentPage( this.indicators[next] );
  
      if ( /\bslide/.test(this.carousel.className) && !(isIE && isIE < 10) ) {
        addClass(this.slides[next],dr);
        this.slides[next].offsetWidth;
        addClass(this.slides[next],direction);
        addClass(this.slides[active],direction);
  
        setTimeout(function() { //we're gonna fake waiting for the animation to finish, cleaner and better
          self._addEventListeners();
  
          addClass(self.slides[next],'active');
          removeClass(self.slides[active],'active');
  
          removeClass(self.slides[next],dr);
          removeClass(self.slides[next],direction);
          removeClass(self.slides[active],direction);
  
          if ( self.options.interval !== false && !/\bpaused/.test(self.carousel.className) ){
            clearInterval(timer); self.cycle();
          }
          if (slid) { self.carousel.dispatchEvent(slid); } //here we go with the slid
        }, this.options.duration + 100 );
      } else {
        addClass(this.slides[next],'active');
        this.slides[next].offsetWidth;
        removeClass(this.slides[active],'active');
        setTimeout(function() {
          self._addEventListeners();
          if ( self.options.interval !== false && !/\bpaused/.test(self.carousel.className) ){
            clearInterval(timer); self.cycle();
          }
          if (slid) { self.carousel.dispatchEvent(slid); } //here we go with the slid
        }, this.options.duration + 100 );
      }
    };
    this._addEventListeners = function () {
      this.next && this.next.addEventListener( "click", this.controlsHandler, false);
      this.prev && this.prev.addEventListener( "click", this.controlsHandler, false);
  
      this.indicator && this.indicator.addEventListener( "click", this.indicatorHandler, false);
  
      this.options.keyboard === true && window.addEventListener('keydown', this.keyHandler, false);
    };
    this._removeEventListeners = function () { // prevent mouse bubbles while animating
      this.next && this.next.removeEventListener( "click", this.controlsHandler, false);
      this.prev && this.prev.removeEventListener( "click", this.controlsHandler, false);
  
      this.indicator && this.indicator.removeEventListener( "click", this.indicatorHandler, false);
  
      this.options.keyboard === true && window.removeEventListener('keydown', this.keyHandler, false);
    };
    this._getActiveIndex = function () {
      return this.slides.indexOf(this.carousel.querySelector('.item.active'));
    };
    this._curentPage = function( p ) {
      for( var i = 0; i < this.indicators.length; ++i ) {
        removeClass(this.indicators[i],'active');
      }
      if (p) addClass(p,"active");
    };
    this.indicatorHandler = function(e) {
      e.preventDefault();
      var target = e.target;
      var active = self._getActiveIndex(); // the current active
  
      if ( target && !/\bactive/.test(target.className) && target.getAttribute('data-slide-to') ) {
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
    };
    this.controlsHandler = function (e) {
      var target = e.currentTarget || e.srcElement;
  
      if ( target === self.next ) {
        self.index++;
        self.direction = 'left'; //set direction first
  
        if( self.index == self.total - 1 ) {
          self.index = self.total - 1;
        } else if ( self.index == self.total ){
          self.index = 0;
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
    };
    this.keyHandler = function (e) {
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
    };
  
    // init
    if ( this.options.interval !== false ){
      this.cycle();
    }
  
    if ( this.options && this.options.pause === 'hover' && this.options.interval !== false ) {
      this.pause();
    }
    this._addEventListeners();
    this.next && this.next.addEventListener( "click", function(e){e.preventDefault()}, false);
    this.prev && this.prev.addEventListener( "click", function(e){e.preventDefault()}, false);
  };
  
  // CAROUSEL DATA API
  // =================
  var Carousels = document.querySelectorAll('[data-ride="carousel"]');
  for (var c=0, crl = Carousels.length; c<crl; c++) {
    var carousel = Carousels[c], options = {};
    options.interval = carousel.getAttribute('data-interval') && carousel.getAttribute('data-interval');
    options.pause = carousel.getAttribute('data-pause') && carousel.getAttribute('data-pause') || 'hover';
    options.keyboard = carousel.getAttribute('data-keyboard') && carousel.getAttribute('data-keyboard') || false;
    options.duration = carousel.getAttribute('data-duration') && carousel.getAttribute('data-duration') || false;
    new Carousel(carousel, options)
  }
  // Native Javascript for Bootstrap 3 | Collapse
  // by dnp_theme
  
  // COLLAPSE DEFINITION
  // ===================
  var Collapse = function( element, options ) {
    options = options || {};
  
    this.btn = typeof element === 'object' ? element : document.querySelector(element);
    this.accordion = null;
    this.collapse = null;
    this.duration = 300; // default collapse transition duration
    this.options = {};
    this.options.duration = (isIE && isIE < 10) ? 0 : (options.duration || this.duration);
    var self = this;
    var getOuterHeight = function (el) {
      var s = el && (el.currentStyle || window.getComputedStyle(el)), // the getComputedStyle polyfill would do this for us, but we want to make sure it does
        btp = /px/.test(s.borderTopWidth) ? Math.round(s.borderTopWidth.replace('px','')) : 0,
        mtp = /px/.test(s.marginTop)  ? Math.round(s.marginTop.replace('px',''))    : 0,
        mbp = /px/.test(s.marginBottom)  ? Math.round(s.marginBottom.replace('px',''))  : 0,
        mte = /em/.test(s.marginTop)  ? Math.round(s.marginTop.replace('em','')    * parseInt(s.fontSize)) : 0,
        mbe = /em/.test(s.marginBottom)  ? Math.round(s.marginBottom.replace('em','')  * parseInt(s.fontSize)) : 0;
      return el.clientHeight + parseInt( btp ) + parseInt( mtp ) + parseInt( mbp ) + parseInt( mte ) + parseInt( mbe ); //we need an accurate margin value
    };
  
    this.toggle = function(e) {
      e.preventDefault();
  
      if (!/\bin/.test(self.collapse.className)) {
        self.open();
      } else {
        self.close();
      }
    };
    this.close = function() {
      this._close(this.collapse);
      addClass(this.btn,'collapsed');
    };
    this.open = function() {
      this._open(this.collapse);
      removeClass(this.btn,'collapsed');
  
      if ( this.accordion !== null ) {
        var active = this.accordion.querySelectorAll('.collapse.in'), al = active.length, i = 0;
        for (i;i<al;i++) {
          if ( active[i] !== this.collapse) this._close(active[i]);
        }
      }
    };
    this._open = function(c) {
      this.removeEvent();
      addClass(c,'in');
      c.setAttribute('aria-expanded','true');
      addClass(c,'collapsing');
      setTimeout(function() {
        c.style.height = self.getMaxHeight(c) + 'px'
        c.style.overflowY = 'hidden';
      }, 0);
      setTimeout(function() {
        c.style.height = '';
        c.style.overflowY = '';
        removeClass(c,'collapsing');
        self.addEvent();
      }, this.options.duration);
    };
    this._close = function(c) {
      this.removeEvent();
      c.setAttribute('aria-expanded','false');
      c.style.height = this.getMaxHeight(c) + 'px'
      setTimeout(function() {
        c.style.height = '0px';
        c.style.overflowY = 'hidden';
        addClass(c,'collapsing');
      }, 0);
  
      setTimeout(function() {
        removeClass(c,'collapsing');
        removeClass(c,'in');
        c.style.overflowY = '';
        c.style.height = '';
        self.addEvent();
      }, this.options.duration);
    };
    this.getMaxHeight = function(l) { // get collapse trueHeight and border
      var h = 0;
      for (var k = 0, ll = l.children.length; k < ll; k++) {
        h += getOuterHeight(l.children[k]);
      }
      return h;
    };
    this.removeEvent = function() {
      this.btn.removeEventListener('click', this.toggle, false);
    };
    this.addEvent = function() {
      this.btn.addEventListener('click', this.toggle, false);
    };
    this.getTarget = function() {
      var t = this.btn,
        h = t.href && t.getAttribute('href').replace('#',''),
        d = t.getAttribute('data-target') && ( t.getAttribute('data-target') ),
        id = h || ( d && /#/.test(d)) && d.replace('#',''),
        cl = (d && d.charAt(0) === '.') && d, //the navbar collapse trigger targets a class
        c = id && document.getElementById(id) || cl && document.querySelector(cl);
      return c;
    };
  
    // init
    this.addEvent();
    this.collapse = this.getTarget();
    this.accordion = this.btn.getAttribute('data-parent')
      && getClosest(this.btn, this.btn.getAttribute('data-parent'));
  };
  
  // COLLAPSE DATA API
  // =================
  var Collapses = document.querySelectorAll('[data-toggle="collapse"]');
  for (var o=0, cll = Collapses.length; o<cll; o++) {
    var collapse = Collapses[o], options = {};
    options.duration = collapse.getAttribute('data-duration');
    new Collapse(collapse,options);
  }
  // Native Javascript for Bootstrap 3 | Dropdown
  // by dnp_theme
  
  // DROPDOWN DEFINITION
  // ===================
  var Dropdown = function( element) {
    this.menu = typeof element === 'object' ? element : document.querySelector(element);
    var self = this;
  
    this.handle = function(e) { // fix some Safari bug with <button>
      var target = e.target || e.currentTarget,
          children = [], c = self.menu.parentNode.getElementsByTagName('*');
      (/\#$/g.test(target.href) || /\#$/g.test(target.parentNode.href)) && e.preventDefault();
  
      for ( var i=0, l = c.length||0; i<l; i++) { l && children.push(c[i]); }
      if ( target === self.menu || target.parentNode === self.menu || target.parentNode.parentNode === self.menu ) {
        self.toggle(e);
      }  else if ( children && children.indexOf(target) > -1  ) {
        return;
      } else { self.close(); }
    };
    this.toggle = function(e) {
      if (/\bopen/.test(this.menu.parentNode.className)) {
        this.close();
        document.removeEventListener('keydown', this.key, false);
      } else {
        this.menu.parentNode.className += ' open';
        this.menu.setAttribute('aria-expanded',true);
        document.addEventListener('keydown', this.key, false);
      }
    };
    this.key = function(e) {
      if (e.which == 27) {self.close();}
    };
    this.close = function() {
      self.menu.parentNode.className = self.menu.parentNode.className.replace(/\bopen/,'');
      self.menu.setAttribute('aria-expanded',false);
    };
    this.menu.setAttribute('tabindex', '0'); // Fix onblur on Chrome | Safari
    document.addEventListener('click', this.handle, false);
  };
  
  // DROPDOWN DATA API
  // =================
  var Dropdowns = document.querySelectorAll('[data-toggle=dropdown]');
  for (var d=0, ddl = Dropdowns.length; d<ddl; d++) {
    new Dropdown(Dropdowns[d]);
  }
  // Native Javascript for Bootstrap 3 | Modal
  // by dnp_theme
  
  //MODAL DEFINITION
  // ===============
  var Modal = function(element, options) { // element is the is the modal
    options = options || {};
    this.modal = typeof element === 'object' ? element : document.querySelector(element);
    this.options = {};
    this.options.backdrop = options.backdrop === 'false' ? false : true;
    this.options.keyboard = options.keyboard === 'false' ? false : true;
    this.options.content = options.content;
    this.duration = options.duration || 300; // the default modal fade duration option
    this.options.duration = (isIE && isIE < 10) ? 0 : this.duration;
    this.scrollbarWidth = 0;
    this.dialog = this.modal.querySelector('.modal-dialog');
  
    var self = this, timer = 0,
      getWindowWidth = function() {
        var htmlRect = document.documentElement.getBoundingClientRect(),
          fullWindowWidth = window.innerWidth || (htmlRect.right - Math.abs(htmlRect.left));
        return fullWindowWidth;
      },
      setScrollbar = function () {
        var bodyStyle = window.getComputedStyle(document.body), bodyPad = parseInt((bodyStyle.paddingRight), 10);
        if (self.bodyIsOverflowing) { document.body.style.paddingRight = (bodyPad + self.scrollbarWidth) + 'px'; }
      },
      resetScrollbar = function () {
        document.body.style.paddingRight = '';
      },
      measureScrollbar = function () { // thx walsh
        var scrollDiv = document.createElement('div');
        scrollDiv.className = 'modal-scrollbar-measure';
        document.body.appendChild(scrollDiv);
        var scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth;
        document.body.removeChild(scrollDiv);
        return scrollbarWidth;
      },
      checkScrollbar = function () {
        self.bodyIsOverflowing = document.body.clientWidth < getWindowWidth();
        self.modalIsOverflowing = self.modal.scrollHeight > document.documentElement.clientHeight;
        self.scrollbarWidth = measureScrollbar();
      };
  
    this.open = function() {
      var currentOpen = document.querySelector('.modal.in');
      if (currentOpen){
        clearTimeout(currentOpen.getAttribute('data-timer'));
        removeClass(currentOpen,'in');
        setTimeout( function() {
          currentOpen.setAttribute('aria-hidden', true);
          currentOpen.style.display = '';
        }, this.options.duration/2);
      }
  
      if ( this.options.backdrop ) {
        this.createOverlay();
      } else { this.overlay = null }
  
      if ( this.overlay ) {
        setTimeout( function() {
          addClass(self.overlay,'in');
        }, 0);
      }
  
      clearTimeout(timer);
      timer = setTimeout( function() {
        self.modal.style.display = 'block';
  
        checkScrollbar();
        self.adjustDialog();
        setScrollbar();
  
        self.resize();
        self.dismiss();
        self.keydown();
  
        addClass(document.body,'modal-open');
        addClass(self.modal,'in');
        self.modal.setAttribute('aria-hidden', false);
      }, this.options.duration/2);
    };
    this.close = function() {
  
      if ( this.overlay ) {
        removeClass(this.overlay,'in');
      }
      removeClass(this.modal,'in');
      this.modal.setAttribute('aria-hidden', true);
  
      clearTimeout(timer);
      timer = setTimeout( function() {
        removeClass(document.body,'modal-open');
        self.resize();
        self.resetAdjustments();
        resetScrollbar();
  
        self.dismiss();
        self.keydown();
        self.modal.style.display = '';
      }, this.options.duration/2);
  
      setTimeout( function() {
        if (!document.querySelector('.modal.in')) {  self.removeOverlay(); }
      }, this.options.duration);
    };
    this.content = function( content ) {
      return this.modal.querySelector('.modal-content').innerHTML = content;
    };
    this.createOverlay = function() {
      var backdrop = document.createElement('div'), overlay = document.querySelector('.modal-backdrop');
      backdrop.setAttribute('class','modal-backdrop fade');
  
      if ( overlay ) {
        this.overlay = overlay;
      } else {
        this.overlay = backdrop;
        document.body.appendChild(backdrop);
      }
    };
    this.removeOverlay = function() {
      var overlay = document.querySelector('.modal-backdrop');
      if ( overlay !== null && overlay !== undefined ) {
        document.body.removeChild(overlay)
      }
    };
    this.keydown = function() {
      function keyHandler(e) {
        if (self.options.keyboard && e.which == 27) {
          self.close();
        }
      }
      if (!/\bin/.test(this.modal.className)) {
        document.addEventListener('keydown', keyHandler, false);
      } else {
        document.removeEventListener('keydown', keyHandler, false);
      }
    };
    this.trigger = function() {
      var triggers = document.querySelectorAll('[data-toggle="modal"]'), tgl = triggers.length, i = 0;
      for ( i;i<tgl;i++ ) {
        triggers[i].addEventListener('click', function(e) {
          e.preventDefault();
          var b = this, // var b = e.target,
          s = b.getAttribute('data-target') && b.getAttribute('data-target').replace('#','')
          || b.getAttribute('href') && b.getAttribute('href').replace('#','');
          if ( document.getElementById( s ) === self.modal ) {
            self.open()
          }
        })
      }
    };
    this._resize = function() {
      var overlay = this.overlay||document.querySelector('.modal-backdrop'),
        dim = { w: document.documentElement.clientWidth + 'px', h: document.documentElement.clientHeight + 'px' };
      if ( overlay !== null && /\bin/.test(overlay.className) ) {
        overlay.style.height = dim.h; overlay.style.width = dim.w;
      }
    };
    this.oneResize = function() {
      function oneResize() {
        self._resize();
        self.handleUpdate();
        window.removeEventListener('resize', oneResize, false);
      }
      window.addEventListener('resize', oneResize, false);
    };
    this.resize = function() {
      function resizeHandler() {
        self._resize();
        self.handleUpdate();
      }
  
      if (!/\bin/.test(this.modal.className)) {
        window.addEventListener('resize', this.oneResize, false);
      } else {
        window.removeEventListener('resize', this.oneResize, false);
      }
    };
    this.dismiss = function() {
      function dismissHandler(e) {
        if ( e.target.parentNode.getAttribute('data-dismiss') === 'modal' || e.target.getAttribute('data-dismiss') === 'modal' || e.target === self.modal ) {
          e.preventDefault(); self.close()
        }
      }
      if (!/\bin/.test(this.modal.className)) {
        this.modal.addEventListener('click', dismissHandler, false);
      } else {
        this.modal.removeEventListener('click', dismissHandler, false);
      }
    };
    // these following methods are used to handle overflowing modals
    this.handleUpdate = function () {
      this.adjustDialog();
    };
    this.adjustDialog = function () {
      this.modal.style.paddingLeft = !this.bodyIsOverflowing && this.modalIsOverflowing ? this.scrollbarWidth + 'px' : '';
      this.modal.style.paddingRight = this.bodyIsOverflowing && !this.modalIsOverflowing ? this.scrollbarWidth + 'px' : '';
    };
    this.resetAdjustments = function () {
      this.modal.style.paddingLeft = '';
      this.modal.style.paddingRight = '';
    };
    //init
    this.trigger();
    if ( this.options.content && this.options.content !== undefined ) {
      this.content( this.options.content );
    }
  };
  
  // DATA API
  var Modals = document.querySelectorAll('.modal');
  for ( var m = 0, mdl = Modals.length; m<mdl; m++ ) {
    var modal = Modals[m], options = {};
    options.keyboard = modal.getAttribute('data-keyboard');
    options.backdrop = modal.getAttribute('data-backdrop');
    options.duration = modal.getAttribute('data-duration');
    new Modal(modal,options)
  }
  // Native Javascript for Bootstrap 3 | Popover
  // by dnp_theme
  
  // POPOVER DEFINITION
  // ===================
  var Popover = function( element,options ) {
    options = options || {};
    this.link = typeof element === 'object' ? element : document.querySelector(element);
    this.title = this.link.getAttribute('data-title') || null;
    this.content = this.link.getAttribute('data-content') || null;
    this.popover = null;
    this.options = {};
    this.options.template = options.template ? options.template : null;
    this.options.trigger = options.trigger ? options.trigger : 'hover';
    this.options.animation = options.animation && options.animation !== 'fade' ? options.animation : 'fade';
    this.options.placement = options.placement ? options.placement : 'top';
    this.options.delay = parseInt(options.delay) || 100;
    this.options.dismiss = options.dismiss && options.dismiss === 'true' ? true : false;
    this.duration = 150;
    this.options.duration = (isIE && isIE < 10) ? 0 : (options.duration || this.duration);
    this.options.container = document.body;
    if ( !this.content && !this.options.template ) return;
  
    var self = this, timer = 0, placement = this.options.placement;
  
    this.toggle = function(e) {
      if (self.popover === null) {
        self.open()
      } else {
        self.close()
      }
    };
    this.dismiss = function(e) {
      if (self.popover && e.target === self.popover.querySelector('.close')) {
        self.close();
      }
    };
    this.open = function(e) {
      clearTimeout(timer);
      timer = setTimeout( function() {
        if (self.popover === null) {
          placement = self.options.placement; // we reset placement in all cases
          self.createPopover();
          self.updatePopover();
          self.showPopover();
        }
      }, 20 );
    };
    this.close = function(e) {
      clearTimeout(timer);
      timer = setTimeout( function() {
        if (self.popover && self.popover !== null && /\bin/.test(self.popover.className)) {
          removeClass(self.popover,'in');
          setTimeout(function() {
            self.removePopover();
          }, self.options.duration);
        }
  
      }, self.options.delay + self.options.duration);
    };
    //remove the popover
    this.removePopover = function() {
      this.popover && this.options.container.removeChild(this.popover);
      this.popover = null;
      timer = null
    };
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
      this.popover.setAttribute('class', 'popover ' + placement + ' ' + this.options.animation);
    };
    this.showPopover = function () {
      !/\bin/.test(this.popover.className) && ( addClass(this.popover,'in') );
    };
    this.stylePopover = function() {
      var rect = this.link.getBoundingClientRect(), scroll = getScroll(), // link rect | window vertical and horizontal scroll
          linkDimensions = { w: rect.right - rect.left, h: rect.bottom - rect.top }, //link real dimensions
          popoverDimensions = { w : this.popover.offsetWidth, h: this.popover.offsetHeight }; //popover real dimensions
  
      //apply styling
      if ( /top/.test(placement) ) { //TOP
        this.popover.style.top = rect.top + scroll.y - popoverDimensions.h + 'px';
        this.popover.style.left = rect.left + scroll.x - popoverDimensions.w/2 + linkDimensions.w/2 + 'px'
  
      } else if ( /bottom/.test(placement) ) { //BOTTOM
        this.popover.style.top = rect.top + scroll.y + linkDimensions.h + 'px';
        this.popover.style.left = rect.left + scroll.x - popoverDimensions.w/2 + linkDimensions.w/2 + 'px';
  
      } else if ( /left/.test(placement) ) { //LEFT
        this.popover.style.top = rect.top + scroll.y - popoverDimensions.h/2 + linkDimensions.h/2 + 'px';
        this.popover.style.left = rect.left + scroll.x - popoverDimensions.w + 'px';
  
      } else if ( /right/.test(placement) ) { //RIGHT
        this.popover.style.top = rect.top + scroll.y - popoverDimensions.h/2 + linkDimensions.h/2 + 'px';
        this.popover.style.left = rect.left + scroll.x + linkDimensions.w + 'px';
      }
      this.popover.className.indexOf(placement) === -1 && (this.popover.className = this.popover.className.replace(tipPositions,placement));
    };
    this.updatePopover = function() {
      this.stylePopover();
      if (!isElementInViewport(this.popover) ) { placement = this.updatePlacement(); this.stylePopover(); }
    };
    this.updatePlacement = function() {
      if ( /top/.test(placement) ) { //TOP
        return 'bottom';
      } else if ( /bottom/.test(placement) ) { //BOTTOM
        return 'top';
      } else if ( /left/.test(placement) ) { //LEFT
        return 'right';
      } else if ( /right/.test(placement) ) { //RIGHT
        return 'left';
      }
    };
  
    // init
    if (this.options.trigger === 'hover') {
      this.link.addEventListener(mouseHover[0], this.open, false);
      if (!this.options.dismiss) { this.link.addEventListener(mouseHover[1], this.close, false); }
    } else if (this.options.trigger === 'click') {
      this.link.addEventListener('click', this.toggle, false);
      if (!this.options.dismiss) { this.link.addEventListener('blur', this.close, false); }
    } else if (this.options.trigger === 'focus') {
      this.link.addEventListener('focus', this.toggle, false);
      if (!this.options.dismiss) { this.link.addEventListener('blur', this.close, false);  }
    }
  
    if (this.options.dismiss) {  document.addEventListener('click', this.dismiss, false); }
  
    if (!(isIE && isIE < 9) ) { // dismiss on window resize
      window.addEventListener('resize', this.close, false );
    }
  };
  
  // POPOVER DATA API
  // =================
  var Popovers = document.querySelectorAll('[data-toggle=popover]');
  for (var p=0, ppl = Popovers.length; p<ppl; p++){
    var popover = Popovers[p], options = {};
    options.trigger = popover.getAttribute('data-trigger'); // click / hover / focus
    options.animation = popover.getAttribute('data-animation'); // true / false
    options.duration = popover.getAttribute('data-duration');
    options.placement = popover.getAttribute('data-placement');
    options.dismiss = popover.getAttribute('data-dismiss');
    options.delay = popover.getAttribute('data-delay');
    new Popover(popover,options);
  }
  // Native Javascript for Bootstrap 3 | ScrollSpy
  // by dnp_theme
  
  //SCROLLSPY DEFINITION
  var ScrollSpy = function(element,item,options) {
    options = options || {};
  
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
    var self = this;
  
    //determine which is the real scrollTarget
    if ( this.element.offsetHeight < this.element.scrollHeight ) { // or this.scrollHeight()
      this.scrollTarget = this.element;
    } else {
      this.scrollTarget = window;
    }
  
    if ( !this.options.target ) { return; }
  
    this.topLimit = function () { // the target offset
      if ( this.scrollTarget === window ) {
        return this.tg.getBoundingClientRect().top + this.scrollOffset() - 5
      } else {
        return this.tg.offsetTop;
      }
    }
    this.bottomLimit = function () {
      return this.topLimit() + this.tg.clientHeight
    }
    this.checkEdges = function () {
      this.topEdge = this.topLimit();
      this.bottomEdge = this.bottomLimit()
    }
    this.scrollOffset = function () {
      if ( this.scrollTarget === window ) {
        return getScroll().y;
      } else {
        return this.element.scrollTop;
      }
    }
    this.activate = function () {
      if ( this.parent && this.parent.tagName === 'LI' && !/\bactive/.test(this.parent.className) ) {
        addClass(this.parent,'active');
        if ( this.parentParent && this.parentParent.tagName === 'LI' // activate the dropdown as well
          && /\bdropdown/.test(this.parentParent.className)
          && !/\bactive/.test(this.parentParent.className) ) { addClass(this.parentParent,'active'); }
        this.active = true
      }
    }
    this.deactivate = function () {
      if ( this.parent && this.parent.tagName === 'LI' && /\bactive/.test(this.parent.className) ) {
        removeClass(this.parent,'active');
        if ( this.parentParent && this.parentParent.tagName === 'LI' // deactivate the dropdown as well
          && /\bdropdown/.test(this.parentParent.className)
          && /\bactive/.test(this.parentParent.className) ) { removeClass(this.parentParent,'active'); }
        this.active = false
      }
    }
    this.toggle = function () {
      if ( this.active === false
        && ( this.bottomEdge > this.scrollOffset() && this.scrollOffset() >= this.topEdge )) { //regular use, scroll just entered the element's topLimit or bottomLimit
          this.activate();
      } else if (this.active === true && (this.bottomEdge <= this.scrollOffset() && this.scrollOffset() < this.topEdge )) {
        this.deactivate()
      }
    }
    this.refresh = function () { // check edges again
      this.deactivate();
      this.checkEdges();
  
      this.toggle() // If any case update values again
    }
    this.scrollEvent = function(){
      function onSpyScroll() {
        self.refresh();
      }
      this.scrollTarget.addEventListener('scroll', onSpyScroll, false);
    }
    this.resizeEvent = function(){
      function onSpyResize() {
        self.refresh()
      }
      window.addEventListener('resize', onSpyResize, false);
    }
    this.scrollHeight = function() {
      if ( this.scrollTarget === window ) {
        return Math.max( document.body.scrollHeight, document.body.offsetHeight,
          document.documentElement.clientHeight, document.documentElement.scrollHeight, document.documentElement.offsetHeight );
      } else {
        return this.element.scrollHeight
      }
    }
  
    // init
    if ( this.item.getAttribute('href') && this.item.getAttribute('href').indexOf('#') > -1 ) {
      //actions
      this.checkEdges();
      this.refresh()
      this.scrollEvent();
      if (!(isIE && isIE < 9)) { this.resizeEvent(); }
    }
  };
  
  //SCROLLSPY DATA API
  //=============
  var scrollSpyes = document.querySelectorAll('[data-spy="scroll"]'); // mostly is the document.body or a large container with many elements having id="not-null-id"
  for (var s=0, ssl = scrollSpyes.length; s<ssl; s++) {
    var spy = scrollSpyes[s], options = {};
    options.target = spy.getAttribute('data-target') || null;  // this must be a .nav component with id="not-null"
    if ( options.target !== null ) {
      var menu = options.target === 'object' ?  options.target : document.querySelector(options.target),
        spyTriggers = menu.querySelectorAll('a');
      for (var tr=0, stl = spyTriggers.length; tr<stl; tr++) {
        var spyTrigger = spyTriggers[tr];
        if ( spyTrigger.href && spyTrigger.getAttribute('href') !== '#' )
        new ScrollSpy(spy, spyTrigger, options);
      }
    }
  }
  // Native Javascript for Bootstrap 3 | Tab
  // by dnp_theme
  
  // TAB DEFINITION
  // ===================
  var Tab = function( element,options ) {
    options = options || {};
    this.tab = typeof element === 'object' ? element : document.querySelector(element);
    this.tabs = this.tab.parentNode.parentNode;
    this.dropdown = this.tabs.querySelector('.dropdown');
    if ( /\bdropdown-menu/.test(this.tabs.className) ) {
      this.dropdown = this.tabs.parentNode;
      this.tabs = this.tabs.parentNode.parentNode;
    }
    this.options = options;
  
    // default tab transition duration
    this.duration = 150;
    this.options.duration = (isIE && isIE < 10)  ? 0 : (options.duration || this.duration);
  
    var self = this;
  
    this.handle = function(e) {
      e = e || window.e; e.preventDefault();
      var next = e.target; //the tab we clicked is now the next tab
      var nextContent = document.getElementById(next.getAttribute('href').replace('#','')); //this is the actual object, the next tab content to activate
  
      // get current active tab and content
      var activeTab = self.getActiveTab();
      var activeContent = self.getActiveContent();
  
      if ( !/\bactive/.test(next.parentNode.className) ) {
        // toggle "active" class name
        removeClass(activeTab,'active');
        addClass(next.parentNode,'active');
  
        // handle dropdown menu "active" class name
        if ( self.dropdown ) {
          if ( !(/\bdropdown-menu/.test(self.tab.parentNode.parentNode.className)) ) {
            if (/\bactive/.test(self.dropdown.className)) removeClass(self.dropdown,'active');
          } else {
            if (!/\bactive/.test(self.dropdown.className)) addClass(self.dropdown,'active');
          }
        }
  
        //1. hide current active content first
        removeClass(activeContent,'in');
  
        setTimeout(function() {
          //2. toggle current active content from view
          removeClass(activeContent,'active');
          addClass(nextContent,'active');
        }, self.options.duration);
        setTimeout(function() {
          //3. show next active content
          addClass(nextContent,'in');
        }, self.options.duration*2);
      }
    };
    this.getActiveTab = function() {
      var activeTabs = this.tabs.querySelectorAll('.active');
      if ( activeTabs.length === 1 && !/\bdropdown/.test(activeTabs[0].className) ) {
        return activeTabs[0]
      } else if ( activeTabs.length > 1 ) {
        return activeTabs[activeTabs.length-1]
      }
    };
    this.getActiveContent = function() {
      var active = this.getActiveTab().getElementsByTagName('A')[0].getAttribute('href').replace('#','');
      return active && document.getElementById(active)
    };
  
    // init
    this.tab.addEventListener('click', this.handle, false);
  };
  
  // TAB DATA API
  // =================
  var Tabs = document.querySelectorAll("[data-toggle='tab'], [data-toggle='pill']");
  for ( var tb = 0, tbl = Tabs.length; tb<tbl; tb++ ) {
    var tab = Tabs[tb], options = {};
    options.duration = tab.getAttribute('data-duration') && tab.getAttribute('data-duration') || false;
    new Tab(tab,options);
  }
  // Native Javascript for Bootstrap 3 | Tooltip
  // by dnp_theme
  
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
    this.duration = 150;
    this.options.duration = isIE && isIE < 10 ? 0 : (options.duration || this.duration);
    this.options.container = options.container || document.body;
    if ( !this.title ) return;
  
    var self = this, timer = 0, placement = this.options.placement;
  
    this.open = function(e) {
      clearTimeout(timer);
      timer = setTimeout( function() {
        placement = self.options.placement; // we reset placement in all cases
        if (self.tooltip === null) {
          self.createToolTip();
          self.updateTooltip();
          self.showTooltip();
        }
      }, 20 );
    };
    this.close = function(e) {
      clearTimeout(timer);
      timer = setTimeout( function() {
        if (self.tooltip && self.tooltip !== null) {
          removeClass(self.tooltip,'in');
          setTimeout(function() {
            self.removeToolTip();
          }, self.options.duration);
        }
      }, self.options.delay + self.options.duration);
    };
    //remove the tooltip
    this.removeToolTip = function() {
      this.tooltip && this.options.container.removeChild(this.tooltip);
      this.tooltip = null;
    };
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
      this.tooltip.setAttribute('class', 'tooltip ' + placement + ' ' + this.options.animation);
    };
    this.styleTooltip = function() {
      var rect = this.link.getBoundingClientRect(), scroll = getScroll(), // link rect | window vertical and horizontal scroll
          linkDimensions = { w: rect.right - rect.left, h: rect.bottom - rect.top }, //link real dimensions
          tooltipDimensions = { w : this.tooltip.offsetWidth, h: this.tooltip.offsetHeight }; //tooltip real dimensions
  
      //apply styling
      if ( /top/.test(placement) ) { //TOP
        this.tooltip.style.top = rect.top + scroll.y - tooltipDimensions.h + 'px';
        this.tooltip.style.left = rect.left + scroll.x - tooltipDimensions.w/2 + linkDimensions.w/2 + 'px'
  
      } else if ( /bottom/.test(placement) ) { //BOTTOM
        this.tooltip.style.top = rect.top + scroll.y + linkDimensions.h + 'px';
        this.tooltip.style.left = rect.left + scroll.x - tooltipDimensions.w/2 + linkDimensions.w/2 + 'px';
  
      } else if ( /left/.test(placement) ) { //LEFT
        this.tooltip.style.top = rect.top + scroll.y - tooltipDimensions.h/2 + linkDimensions.h/2 + 'px';
        this.tooltip.style.left = rect.left + scroll.x - tooltipDimensions.w + 'px';
  
      } else if ( /right/.test(placement) ) { //RIGHT
        this.tooltip.style.top = rect.top + scroll.y - tooltipDimensions.h/2 + linkDimensions.h/2 + 'px';
        this.tooltip.style.left = rect.left + scroll.x + linkDimensions.w + 'px';
      }
      this.tooltip.className.indexOf(placement) === -1 && (this.tooltip.className = this.tooltip.className.replace(tipPositions,placement));
    };
    this.updateTooltip = function () {
      this.styleTooltip();
      if (!isElementInViewport(this.tooltip) ) { placement = this.updatePlacement(); this.styleTooltip(); }
    };
    this.showTooltip = function () {
      !/\bin/.test(this.tooltip.className) && ( addClass(this.tooltip,'in') );
    };
    this.updatePlacement = function() {
      if ( /top/.test(placement) ) { //TOP
        return 'bottom';
      } else if ( /bottom/.test(placement) ) { //BOTTOM
        return 'top';
      } else if ( /left/.test(placement) ) { //LEFT
        return 'right';
      } else if ( /right/.test(placement) ) { //RIGHT
        return 'left';
      }
    };
  
    // init
    this.link.addEventListener(mouseHover[0], this.open, false);
    this.link.addEventListener(mouseHover[1], this.close, false);
    //remove title from link
    this.link.setAttribute('data-original-title',this.title);
    this.link.removeAttribute('title');
  };
  
  // TOOLTIP DATA API
  // =================
  var Tooltips = document.querySelectorAll('[data-toggle=tooltip]');
  for (var t=0, tpl = Tooltips.length; t<tpl; t++){
    var tooltip = Tooltips[t], options = {};
    options.animation = tooltip.getAttribute('data-animation');
    options.placement = tooltip.getAttribute('data-placement');
    options.duration = tooltip.getAttribute('data-duration');
    options.delay = tooltip.getAttribute('data-delay');
    new Tooltip(tooltip,options);
  }
  
  return {
    Affix: Affix,
    Alert: Alert,
    Button: Button,
    Carousel: Carousel,
    Collapse: Collapse,
    Dropdown: Dropdown,
    Modal: Modal,
    Popover: Popover,
    ScrollSpy: ScrollSpy,
    Tab: Tab,
    Tooltip: Tooltip
  };
}));
