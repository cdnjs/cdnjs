/*      
 *         ________                                                            ________        
 *         ______(_)_____ ____  __________________  __ _____________________   ______(_)_______
 *         _____  /_  __ `/  / / /  _ \_  ___/_  / / / ___  __ \  _ \__  __ \  _____  /__  ___/
 *         ____  / / /_/ // /_/ //  __/  /   _  /_/ /____  /_/ /  __/_  /_/ /______  / _(__  ) 
 *         ___  /  \__, / \__,_/ \___//_/    _\__, /_(_)  .___/\___/_  .___/_(_)__  /  /____/  
 *         /___/     /_/                     /____/    /_/          /_/        /___/           
 *      
 *        http://briangonzalez.org/pep
 *        Kinetic drag for mobile/desktop.
 *        
 *        Copyright (c) 2012 Brian Gonzalez
 *        Licensed under the MIT license.
 *
 *        Title generated using "Speed" @ 
 *        http://patorjk.com/software/taag/#p=display&f=Speed&t=jquery.pep.js
 */
      


// the semi-colon before function invocation is a safety net against concatenated 
// scripts and/or other plugins which may not be closed properly.
;(function ( $, window, undefined ) {

  //  undefined is used here as the undefined global variable in ECMAScript 3 is
  //  mutable (ie. it can be changed by someone else). undefined isn't really being
  //  passed in so we can ensure the value of it is truly undefined. In ES5, undefined
  //  can no longer be modified.
  
  //  window and document are passed through as local variables rather than globals
  //  as this (slightly) quickens the resolution process and can be more efficiently
  //  minified (especially when both are regularly referenced in your plugin).
  
  //  create the defaults once
  var pluginName = 'pep',
  document = window.document,
  defaults = {
                                                                            // OPTIONS W/ DEFAULTS
                                                                            // --------------------------------------------------------------------------------
    debug:                  false,                                        // debug via a small div in the lower-righthand corner of the document 
    activeClass:            'active',                                     // class to add to the DOM el while dragging
    multiplier:             1,                                            // +/- this number to modify to 1:1 ratio of finger/mouse movement to el movement 
  
    shouldPreventDefault:   true,                                         // in some cases, we don't want to prevent the default on our Pep object. your call.
    stopEvents:             '',                                           // space delimited set of events which programmatically cause the object to stop
    
    hardwareAccelerate:     true,                                         // apply the CSS3 silver bullet method to accelerate the pep object: http://indiegamr.com/ios6-html-hardware-acceleration-changes-and-how-to-fix-them/
    useCSSTranslation:      false,                                        // EXPERIMENTAL: use CSS transform translations as opposed to top/left
    disableSelect:          true,                                         // apply `user-select: none` (CSS) to the object
  
    cssEaseString:          "cubic-bezier(0.190, 1.000, 0.220, 1.000)",   // get more css ease params from [ http://matthewlein.com/ceaser/ ]
    cssEaseDuration:        750,                                          // how long should it take (in ms) for the object to get from stop to rest?
    shouldEase:             true,                                         // disable/enable easing
  
    constrainToWindow:      false,                                        // constrain object to the window
    constrainToParent:      false,                                        // constrain object to its parent
    axis:                   null,                                         // constrain object to either 'x' or 'y' axis
    forceNonCSS3Movement:   false,                                        // DO NOT USE: this is subject to come/go. Use at your own ri
    drag:                   function(){},                                 // called continuously while the object is dragging 
    start:                  function(){},                                 // called when dragging starts
    stop:                   function(){},                                 // called when dragging stops
    rest:                   function(){}                                  // called after dragging stops, and object has come to rest
  };

  //  ---------------------------------
  //  -----  Our main Pep object  -----
  //  ---------------------------------
  function Pep( el, options ) {

    // reference to our DOM object 
    // and it's jQuery equivalent.
    this.el  = el;
    this.$el = $(el);

    //  jQuery has an extend method which merges the contents of two or 
    //  more objects, storing the result in the first object. 

    //  the first object is generally empty as we don't want to 
    //  alter the default options for
    //  future instances of the plugin.
    this.options    = $.extend( {}, defaults, options) ;

    // store document/window so we don't need to keep grabbing it
    // throughout the code
    this.$document  = $(document);
    this.$window  = $(window); 

    this._defaults  = defaults;
    this._name      = 'Pep';

    //  Create our triggers based on touch/click device 
    this.moveTrigger  = this.isTouch() ? "touchmove"   : "mousemove";
    this.startTrigger = this.isTouch() ? "touchstart"  : "mousedown";
    this.stopTrigger  = this.isTouch() ? "touchend"    : "mouseup";

    this.stopEvents   = [ this.stopTrigger, this.options.stopEvents ].join(' ');
    this.$container   = this.options.constrainToParent ? this.$el.parent() : this.$document;

    this.CSSEaseHash    = this.getCSSEaseHash();
    this.velocityQueue  = new Array(5);
    this.scale          = 1;
    this.disabled       = false;

    this.init();
  }

  //  init();
  //    initialization logic 
  //    you already have access to the DOM el and the options via the instance, 
  //    e.g., this.el and this.options
  Pep.prototype.init = function () {
    var self = this;

    if ( this.options.hardwareAccelerate ){
      this.hardwareAccelerate();
    }

    if ( this.options.debug )
      this.buildDebugDiv();

    if ( this.options.disableSelect )
      this.disableSelect();

    this.ev = {}        // to store our event movements
    this.pos = {}       // to store positions
    this.placeObject();
    this.subscribe();
  };

  //  subscribe(); 
  //    useful in the event we want to programmatically 
  //    interact with our Pep object.
  //      e.g.:     $('#pep').trigger('stop')
  Pep.prototype.subscribe = function () {
    var self = this;

    // ★★★  Subscribe to our start event  ★★★★★★★★★★
    this.$el.bind( this.startTrigger, function(ev){
      self.handleStart(ev);
    });

    this.$document.bind( this.stopEvents, function(ev) {
      self.handleStop(ev);
    });

    // subscribe to move event.
    this.$document.bind( this.moveTrigger, function(ev){
      self.moveEvent = ev;
    });
  };

  //  handleStart();
  //    once this.startTrigger occurs, handle all of the logic
  //    that must go on. This is where Pep's heavy lifting is done. 
  Pep.prototype.handleStart = function(ev) {
    var self = this;

    // only continue chugging if our start event is a valid move event. 
    if ( this.isValidMoveEvent(ev) && !this.disabled ){

            // log it
            this.log({ type: 'event', event: ev.type });

            // fire user's stop event.
            this.options.start(ev, this);

            // add active class and reset css animation, if necessary
            this.$el.addClass( this.options.activeClass );
            this.removeCSSEasing();

            // store x & y values for later use
            this.ev.x = this.isTouch() ? ev.originalEvent.pageX : ev.pageX;
            this.ev.y = this.isTouch() ? ev.originalEvent.pageY : ev.pageY;

            // store the initial touch event, used to calculate the inital delta values.
            this.moveEvent = ev;

            // make object active, so watchMoveLoop starts looping.
            this.active     = true;

            // preventDefault(), is necessary
            if ( this.options.shouldPreventDefault )
              ev.preventDefault();

            // animation loop to ensure we don't fire 
            // too many unneccessary repaints  
            (function watchMoveLoop(){
                if ( !self.active ) return;
                self.handleMove();
                self.requestAnimationFrame( watchMoveLoop );
            })($, self);

    }
  };

  //  handleMove();
  //    the logic for when the move events occur 
  Pep.prototype.handleMove = function() {

    // setup our event object
    var ev = this.moveEvent;
    if ( typeof(ev) === 'undefined' ) return;

    // get our move event's x & y
    var curX    = (this.isTouch() ? ev.originalEvent.touches[0].pageX : ev.pageX);
    var curY    = (this.isTouch() ? ev.originalEvent.touches[0].pageY : ev.pageY);

    // last in, first out (LIFO) queue to help us manage velocity
    this.addToLIFO( { time: ev.timeStamp, x: curX, y: curY } );

    // calculate values necessary to moving
    var dx, dy;

    if ( ev.type == this.startTrigger ){
      dx = 0;
      dy = 0;
    } else{
      dx = curX - this.ev.x;
      dy = curY - this.ev.y;
    }

    this.ev.x = curX;
    this.ev.y = curY;

    // no movement in either direction -- so return
    if (dx === 0 && dy === 0){
      this.log({ type: 'event', event: '** stopped **' });
      return;
    }

    // fire user's drag event.
    this.options.drag(ev, this);

    // log the move trigger & event position
    this.log({ type: 'event', event: ev.type });
    this.log({ type: 'event-coords', x: this.ev.x, y: this.ev.y });
    this.log({ type: 'velocity' })

    var hash = this.handleConstraint(dx, dy);

    // if using not using CSS transforms, move object via absolute position
    if ( !this.shouldUseCSSTranslation() ){  
      var xOp     = ( dx >= 0 ) ? "+=" + Math.abs(dx/this.scale)*this.options.multiplier : "-=" + Math.abs(dx/this.scale)*this.options.multiplier;
      var yOp     = ( dy >= 0 ) ? "+=" + Math.abs(dy/this.scale)*this.options.multiplier : "-=" + Math.abs(dy/this.scale)*this.options.multiplier;

      if ( this.options.constrainToParent || this.options.constrainToWindow ) {
        xOp = (hash.x !== false) ? hash.x : xOp;
        yOp = (hash.y !== false) ? hash.y : yOp;
      }

      //  If `constrainToParent` option is set, return if
      //  we hit the edge and we're moving in that direction    
      this.moveTo(xOp, yOp);
    }
    else {
      if ( this.options.constrainToParent || this.options.constrainToWindow ) {
        dx = (hash.x === false) ? dx : 0 ;
        dy = (hash.y === false) ? dy : 0 ;
      }     
      this.moveToUsingTransforms( dx, dy );
    }
  };

  //  handleStop();
  //    the logic for when the stop events occur
  Pep.prototype.handleStop = function(ev) {

    // no need to handle stop event if we're not active
    if (!this.active) 
      return;

    // log it
    this.log({ type: 'event', event: ev.type });

    // make object inactive, so watchMoveLoop returns
    this.active = false;

    // ease the object, if necessary
    if (this.options.shouldEase)
      this.ease(ev);
    
    // fire user's stop event.
    this.options.stop(ev, this);

    // reset the velocity queue 
    this.velocityQueue = new Array(5);

  };

  //  moveTo();
  //    move the object to an x and/or y value
  //    using jQuery's .css function -- this fxn uses the 
  //    .css({top: "+=20", left: "-=30"}) syntax
  Pep.prototype.moveTo = function(x,y, animate) {

    animate = ( animate === false || typeof(animate) === 'undefined' ) ? 
      false : true; 

    if ( this.options.axis  === 'x' ){
      y = "+=0" 
    } 
    else if ( this.options.axis  === 'y' ){
      x = "+=0"
    }

    var animateDuration = 300;
    this.log({ type: 'delta', x: x, y: y });
    animate ? this.$el.animate({ top: y, left: x }, animateDuration, 'easeOutCirc', {queue: false}) : this.$el.stop(true, false).css({ top: y , left: x });
  };

  //  moveToUsingTransforms();
  //    move the object to an x and/or y value
  Pep.prototype.moveToUsingTransforms = function(x,y) {

    // only move along single axis, if necessary
    if ( this.options.axis  === 'x' ){
      y = 0;
    } 
    else if ( this.options.axis  === 'y' ){
      x = 0 
    }

    // CSS3 transforms are additive from current position
    this.cssX = this.cssX  ? (this.cssX + x) : x;
    this.cssY = this.cssY  ? (this.cssY + y) : y;

    this.log({ type: 'delta', x: x, y: y });

    this.translation = "translate("+ this.cssX +"px, " + this.cssY + "px)";
    this.$el.css({ 
        '-webkit-transform': this.translation,
           '-moz-transform': this.translation,
            '-ms-transform': this.translation,
             '-o-transform': this.translation,
                'transform': this.translation });
  };

  //  addToLIFO();
  //    a Last-In/First-Out array of the 5 most recent 
  //    velocity points, which is used for easing
  Pep.prototype.addToLIFO = function(val){
    // last in, first out
    var arr = this.velocityQueue;
    arr = arr.slice(1, arr.length);
    arr.push(val);
    this.velocityQueue = arr;
  };

  //  ease();
  //    used in conjunction with the LIFO queue 
  //    to ease the object after stop
  Pep.prototype.ease = function(ev){

    var pos       = this.$el.position();
    var vel       = this.velocity();
    var dt        = this.dt;
    var x         = vel.x * this.options.multiplier;
    var y         = vel.y * this.options.multiplier
    var hash      = this.handleConstraint(x, y)

    // ✪  Apple the CSS3 animation easing magic  ✪
    if ( this.cssAnimationsSupported() )
      this.$el.css( this.getCSSEaseHash() );
    
    var xOp = ( vel.x > 0 ) ? "+=" + x : "-=" + Math.abs(x);
    var yOp = ( vel.y > 0 ) ? "+=" + y : "-=" + Math.abs(y);

    if ( this.options.constrainToParent || this.options.constrainToWindow ) {
      xOp = (hash.x !== false) ? hash.x : xOp;
      yOp = (hash.y !== false) ? hash.y : yOp;
    }

    // ease it via JS, the last true tells it to animate..........
    var jsAnimateFallback = !this.cssAnimationsSupported() || this.options.forceNonCSS3Movement;
           this.moveTo(xOp, yOp, jsAnimateFallback);

    // when the rest occurs, remove active class and call
    // user's rest event.
    var self = this;
    this.timeout = setTimeout( function(){ 
      
      // call users rest event.
      self.options.rest(ev, self);

      // remove active class 
      self.$el.removeClass( self.options.activeClass ); 
                                
    }, this.options.cssEaseDuration );
    

  }; 

  //  velocity();
  //    using the LIFO, calculate velocity and return
  //    velocity in each direction (x & y)
  Pep.prototype.velocity = function(){
    var sumX = 0;
    var sumY = 0;

    for ( var i = 0; i < this.velocityQueue.length -1; i++  ){
      if ( this.velocityQueue[i] ){
        sumX        = sumX + (this.velocityQueue[i+1].x - this.velocityQueue[i].x);
        sumY        = sumY + (this.velocityQueue[i+1].y - this.velocityQueue[i].y);
        this.dt    = ( this.velocityQueue[i+1].time - this.velocityQueue[i].time );
      }
    }

    // a value to fine tune velocity
    var velocityMultiplier = 1.6;

    // return velocity in each direction.
    return { x: sumX*velocityMultiplier, y: sumY*velocityMultiplier};
  };

  //  requestAnimationFrame();
  //    requestAnimationFrame Polyfill
  //    More info:
  //    http://paulirish.com/2011/requestanimationframe-for-smart-animating/
  Pep.prototype.requestAnimationFrame = function(callback) {
    return  window.requestAnimationFrame        && window.requestAnimationFrame(callback)         || 
            window.webkitRequestAnimationFrame  && window.webkitRequestAnimationFrame(callback)   || 
            window.mozRequestAnimationFrame     && window.mozRequestAnimationFrame(callback)      || 
            window.oRequestAnimationFrame       && window.mozRequestAnimationFrame(callback)      || 
            window.msRequestAnimationFrame      && window.msRequestAnimationFrame(callback)       || 
            window.setTimeout(callback, 1000 / 60);
  };

  //  placeObject();
  //    place object right where it is, but make it movable
  //    via `position: absolute`
  Pep.prototype.placeObject = function() {

    // make `relative` parent if necessary
    if ( this.options.constrainToParent ) {
      this.$container.css({ position: 'relative' });
    } else {
      this.$container.css({ position: 'static' });
    }

    var positionType = this.options.constrainToParent ? 'position' : 'offset';
    this.offset = this.$el[positionType]();
    this.$el.css({ 
      position:   'absolute', 
      top:        this.offset.top, 
      left:       this.offset.left, 
      zIndex:     1
    });

  };

  //  setScale()
  //    set the scale of the object being moved.
  Pep.prototype.setScale = function(val) {
    this.scale = val;
  };

  //  removeCSSEasing();
  //    remove CSS easing properties, if necessary
  Pep.prototype.removeCSSEasing = function() {
    if ( this.cssAnimationsSupported() )
      this.$el.css( this.getCSSEaseHash(true) );
  };

  //  disableSelect();
  //    add the property which causes the object
  //    to no be selected user drags over text areas
  Pep.prototype.disableSelect = function() {

    this.$el.css({ 
      '-webkit-touch-callout' : 'none',
        '-webkit-user-select' : 'none',
         '-khtml-user-select' : 'none',
           '-moz-user-select' : 'none',
            '-ms-user-select' : 'none',
                'user-select' : 'none'
    });

  };

  //  handleConstraint();
  //    returns a hash of where to move to
  //    when we constrain to parent/window
  Pep.prototype.handleConstraint = function(dx, dy) {
    var pos               = this.$el.position();
    this.pos.x            = pos.left;
    this.pos.y            = pos.top;

    // log our positions
    this.log({ type: "pos-coords", x: this.pos.x, y: this.pos.y})

    var upperXLimit       = this.$container.width()  - this.$el.outerWidth();
    var upperYLimit       = this.$container.height() - this.$el.outerHeight();
    var hash              = { x: false, y: false };

    // is our object trying to move outside upper X & Y limits?
    if ( this.pos.x + dx > upperXLimit )    hash.x = upperXLimit
    if ( this.pos.x + dx < 0 )              hash.x = 0  
    if ( this.pos.y + dy > upperYLimit )    hash.y = upperYLimit
    if ( this.pos.y + dy < 0 )              hash.y = 0;

    return hash;
  };

  //  getCSSEaseHash();
  //    returns a hash of params used in conjunction 
  //    with this.options.cssEaseString
  Pep.prototype.getCSSEaseHash = function(reset){    
    if ( typeof(reset) === 'undefined' ) reset = false;

    if (reset){
      var cssEaseString = '';
    } else if ( this.CSSEaseHash ) {
      return this.CSSEaseHash;
    } else {
      var cssEaseString = ['all', this.options.cssEaseDuration + 'ms', this.options.cssEaseString].join(' ');
    }

    return {
                  '-webkit-transition'   : cssEaseString,   // chrome, safari, etc.
                     '-moz-transition'   : cssEaseString,   // firefox
                      '-ms-transition'   : cssEaseString,   // microsoft
                       '-o-transition'   : cssEaseString,   // opera
                          'transition'   : cssEaseString    // future
          };
  };

  //  isTouch();
  //    returns whether or not our device is touch-ready
  Pep.prototype.isTouch = function(reset){    
    if ( typeof(Modernizr) !== 'undefined' )
      return Modernizr.touch

    if ( 'ontouchstart' in window || (window.DocumentTouch && document instanceof DocumentTouch) ) { 
      return true;
    } else{
      return false;
    }
  };

  //  isValidMoveEvent();
  //    returns true if we're on a non-touch device -- or -- 
  //    if the event is a non-pinch event on a touch device
  Pep.prototype.isValidMoveEvent = function(ev){   
    if ( !this.isTouch() || ( this.isTouch() && ev.originalEvent.hasOwnProperty('touches') && ev.originalEvent.touches.length == 1 ) ){
      return true;
    } else{
      return false
    }
  };

  //  shouldUseCSSTranslation();
  //    return true if we should use CSS transforms for move the object
  Pep.prototype.shouldUseCSSTranslation = function() {

    if ( typeof(this.useCSSTranslation) !== "undefined" )
      return this.useCSSTranslation;

    var useCSSTranslation = false;

    if ( !this.options.useCSSTranslation || ( typeof(Modernizr) !== "undefined" && !Modernizr.csstransforms)){
      useCSSTranslation = false;
    } 
    else{
      useCSSTranslation = true;
    }

    this.useCSSTranslation = useCSSTranslation;
    return useCSSTranslation;
  };

  //  cssAnimationsSupported():
  //    returns true if the browser supports CSS animations
  //    which are used for easing..
  Pep.prototype.cssAnimationsSupported = function() {

    if ( typeof(this.cssAnimationsSupport) !== "undefined" ){
      return this.cssAnimationsSupport
    }

    // If the page has Modernizr, let them do the heavy lifting.
    if ( ( typeof(Modernizr) !== "undefined" && Modernizr.cssanimations) ){
      this.cssAnimationsSupport = true;
      return true;
    }

    var animation = false,
        elm = document.createElement('div'),
        animationstring = 'animation',
        keyframeprefix = '',
        domPrefixes = 'Webkit Moz O ms Khtml'.split(' '),
        pfx  = '';
    
    if( elm.style.animationName ) { animation = true; }    
     
    if( animation === false ) {
      for( var i = 0; i < domPrefixes.length; i++ ) {
        if( elm.style[ domPrefixes[i] + 'AnimationName' ] !== undefined ) {
          pfx = domPrefixes[ i ];
          animationstring = pfx + 'Animation';
          keyframeprefix = '-' + pfx.toLowerCase() + '-';
          animation = true;
          break;
        }
      }
    }

    this.cssAnimationsSupport = animation;
    return animation;
  };

  //  hardwareAccelerate();
  //    add fool-proof CSS3 hardware acceleration.
  Pep.prototype.hardwareAccelerate = function() {
    this.$el.css({      '-webkit-transform':            'translateZ(0)',
                        'transform':                    'translateZ(0)',
                        '-webkit-perspective':          1000,
                        'perspective':                  1000,
                        '-webkit-backface-visibility':  'hidden',
                        'backface-visibility':          'hidden'  })
   }; 

  //  getMovementValues();
  //    returns object pos, event position, and velocity in each direction.
  Pep.prototype.getMovementValues = function() {
    return { ev: this.ev, pos: this.pos, velocity: this.velocity() };
   }; 

  //  buildDebugDiv();
  //    Create a little div in the lower right corner of the window
  //    for extra info about the object currently moving
  Pep.prototype.buildDebugDiv = function() {

    // Build the debugDiv and it's inner HTML -- if necessary
    if ( $('#pep-debug').length === 0 ){
      var $debugDiv = $('<div></div>')
      $debugDiv
        .attr('id', 'pep-debug')
        .append("<div style='font-weight:bold; background: red; color: white;'>DEBUG MODE</div>")
        .append("<div id='pep-debug-event'>no event</div>")
        .append("<div id='pep-debug-ev-coords'>event coords: <span class='pep-x'>-</span>, <span class='pep-y'>-</span></div>")
        .append("<div id='pep-debug-pos-coords'>position coords: <span class='pep-x'>-</span>, <span class='pep-y'>-</span></div>")
        .append("<div id='pep-debug-velocity'>velocity: <span class='pep-x'>-</span>, <span class='pep-y'>-</span></div>")
        .append("<div id='pep-debug-delta'>&Delta; movement: <span class='pep-x'>-</span>, <span class='pep-y'>-</span></div>")
        .css({
          position:   'fixed',
          bottom:     5,
          right:      5,
          zIndex:     99999,    
          textAlign:  'right',
          fontFamily: 'Arial, sans',
          fontSize:   10,
          border:     '1px solid #DDD',
          padding:    '3px',
          background: 'white',
          color:      '#333'
        });
    }

    var self = this;
    setTimeout(function(){
      self.debugElements = {
        $event:      $("#pep-debug-event"),
        $velocityX:  $("#pep-debug-velocity .pep-x"),
        $velocityY:  $("#pep-debug-velocity .pep-y"),
        $dX:         $("#pep-debug-delta .pep-x"),
        $dY:         $("#pep-debug-delta .pep-y"),
        $evCoordsX:  $("#pep-debug-ev-coords .pep-x"),
        $evCoordsY:  $("#pep-debug-ev-coords .pep-y"),
        $posCoordsX: $("#pep-debug-pos-coords .pep-x"),
        $posCoordsY: $("#pep-debug-pos-coords .pep-y")
      }
    }, 0)

    $('body').append( $debugDiv );
  };

  // log()
  Pep.prototype.log = function(opts) {
    if ( !this.options.debug ) return;

    switch (opts.type){
    case "event": 
      this.debugElements.$event.text(opts.event);
      break;
    case "pos-coords": 
      this.debugElements.$posCoordsX.text(opts.x);
      this.debugElements.$posCoordsY.text(opts.y);
      break;
    case "event-coords": 
      this.debugElements.$evCoordsX.text(opts.x);
      this.debugElements.$evCoordsY.text(opts.y);
      break;
    case "delta": 
      this.debugElements.$dX.text(opts.x);
      this.debugElements.$dY.text(opts.y);
      break;
    case "velocity": 
      var vel = this.velocity()
      this.debugElements.$velocityX.text( Math.round(vel.x) );
      this.debugElements.$velocityY.text( Math.round(vel.y) );
      break;
    }
  };

  //  *** Special Easings functions ***
  //    Used for JS easing fallback 
  //    We can use any of these for a 
  //    good intertia ease
  $.extend($.easing, 
  {
    easeOutQuad: function (x, t, b, c, d) {
      return -c *(t/=d)*(t-2) + b;
    },
    easeOutCirc: function (x, t, b, c, d) {
      return c * Math.sqrt(1 - (t=t/d-1)*t) + b;
    },
    easeOutExpo: function (x, t, b, c, d) {
      return (t==d) ? b+c : c * (-Math.pow(2, -10 * t/d) + 1) + b;
    }
  });

  // toggle()
  //  toggle the pep object
  Pep.prototype.toggle = function(on) {
    if ( typeof(on) === "undefined"){
      this.disabled = !this.disabled;
    }
    else {
      this.disabled = !on;
    }   
  };

  //  wrap it 
  //    A really lightweight plugin wrapper around the constructor, 
  //    preventing against multiple instantiations.
  $.fn[pluginName] = function ( options ) {
    return this.each(function () {
      if (!$.data(this, 'plugin_' + pluginName)) {
        var pepObj = new Pep( this, options );
        $.data(this, 'plugin_' + pluginName, pepObj);
        $.pep.peps.push(pepObj)
      }
    });
  };

  //  The   _   ___ ___ 
  //       /_\ | _ \_ _|
  //      / _ \|  _/| | 
  //     /_/ \_\_| |___|
  //
  $.pep = {}
  $.pep.peps = [];
  $.pep.toggleAll = function(on){
    $.each(this.peps, function(index, pepObj){
      pepObj.toggle(on);
    }); 
  };

}(jQuery, window));
