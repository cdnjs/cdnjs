/**
 * simplyScroll 2 - a scroll-tastic jQuery plugin
 *
 * http://logicbox.net/jquery/simplyscroll/
 *
 * Copyright (c) 2009-2018 Will Kelly - http://logicbox.net
 *
 * @license MIT
 *
 */

(function (factory) {
  if(typeof module === "object" && typeof module.exports === "object") {
    module.exports = factory(require("jquery"), window, document);
  } else {
    factory(jQuery, window, document);
  }
}(function($, window, document, undefined) {

  $.fn.simplyScroll = function(options) {
    return this.each(function() {
      // check to see if already attached to element
      if (typeof $(this).data('simplyScroll') === "undefined") {
        // access  methods and properties like
        // element.data('simplyScroll').method(arg1, arg2, ...)
        var simplyScroll = new $.simplyScroll(this, options);
        $(this).data('simplyScroll', simplyScroll);
      }
    });
  };

  var defaults = {
    customClass: 'simply-scroll',
    frameRate: 24, //No of movements per second
    speed: 1, //Intended no. of pixels per frame (/w scroller size & requestAnimationFrame this may not be honoured)
    orientation: 'horizontal', //'horizontal or 'vertical' - not to be confused with device orientation
    auto: true,
    autoMode: 'loop', //if auto == true, use 'loop' or 'bounce',
    manualMode: 'end', //if auto == false, use 'loop' or 'end'
    direction: 'forwards', //'forwards' or 'backwards'.
    pauseOnHover: true, //if autoMode == loop || bounce only
    pauseOnTouch: true, //" touch device only
    pauseButton: false, //" generates an extra element to allow manual pausing
    startOnLoad: false, //use this to delay starting of plugin until all page assets have loaded
    initialOffset: 0
  };

  $.simplyScroll = function(el,options) {

    var self = this;

    this.o = $.extend({}, defaults, options || {});
    this.isAuto = this.o.auto !== false && this.o.autoMode.match(/^loop|bounce$/) !== null;
    this.isHorizontal =
      this.o.orientation.match(/^horizontal|vertical$/) !== null && this.o.orientation === defaults.orientation;
    this.isRTL = this.isHorizontal && $("html").attr('dir') === 'rtl';
    this.isForwards = !this.isAuto && !this.isRTL ||
      (this.isAuto && this.o.direction.match(/^forwards|backwards$/) !== null && this.o.direction === defaults.direction);
    this.isLoop = this.isAuto && this.o.autoMode === 'loop' || !this.isAuto && this.o.manualMode === 'loop';

    this.supportsTouch = ('createTouch' in document);

    this.events = this.supportsTouch ?
      {start:'touchstart MozTouchDown',move:'touchmove MozTouchMove',end:'touchend touchcancel MozTouchRelease'} :
      {start:'mouseenter',end:'mouseleave'};

    this.$list = $(el); //called on ul/ol/div etc
    var $items = this.$list.children();

    //generate extra markup
    this.$list.addClass('simply-scroll-list')
      .wrap('<div class="simply-scroll-clip"></div>')
      .parent().wrap('<div class="' + this.o.customClass + ' simply-scroll-container"></div>');

    if (!this.isAuto) { //button placeholders
      this.$list.parent().parent()
        .prepend('<div class="simply-scroll-forward"></div>')
        .prepend('<div class="simply-scroll-back"></div>');
    } else {
      if (this.o.pauseButton) {
        this.$list.parent().parent()
          .prepend('<div class="simply-scroll-btn simply-scroll-btn-pause"></div>');
        this.o.pauseOnHover = false;
      }
    }

    //wrap an extra div around the whole lot if elements scrolled aren't equal
    if ($items.length > 1) {
      var extra_wrap = false,
        total = 0;

      if (this.isHorizontal) {
        $items.each(function() { total+=$(this).outerWidth(true); });
        extra_wrap = $items.eq(0).outerWidth(true) * $items.length !== total;
      } else {
        $items.each(function() { total+=$(this).outerHeight(true); });
        extra_wrap = $items.eq(0).outerHeight(true) * $items.length !== total;
      }

      if (extra_wrap) {
        this.$list = this.$list.wrap('<div></div>').parent().addClass('simply-scroll-list');
        if (this.isHorizontal) {
          this.$list.children().css({"float":'left',width: total + 'px'});
        } else {
          this.$list.children().css({height: total + 'px'});
        }
      }
    }

    if (!this.o.startOnLoad) {
      this.init();
    } else {
      //wait for load before completing setup
      $(window).load(function() { self.init();  });
    }

  };

  $.simplyScroll.fn = $.simplyScroll.prototype = {};

  $.simplyScroll.fn.extend = $.extend;

  $.simplyScroll.fn.extend({
    init: function() {
      var self = this;

      this.$items = this.$list.children();
      this.$clip = this.$list.parent(); //this is the element that scrolls
      this.$container = this.$clip.parent();
      this.$btnBack = $('.simply-scroll-back',this.$container);
      this.$btnForward = $('.simply-scroll-forward',this.$container);

      if (!this.isHorizontal) {
        this.itemMax = this.$items.eq(0).outerHeight(true);
        this.clipMax = this.$clip.height();
        this.dimension = 'height';
        this.moveBackClass = 'simply-scroll-btn-up';
        this.moveForwardClass = 'simply-scroll-btn-down';
        this.scrollPos = 'Top';
      } else {
        this.itemMax = this.$items.eq(0).outerWidth(true);
        this.clipMax = this.$clip.width();
        this.dimension = 'width';
        this.moveBackClass = 'simply-scroll-btn-left';
        this.moveForwardClass = 'simply-scroll-btn-right';
        this.scrollPos = 'Left';
      }

      this.posMin = 0;

      this.posMax = this.$items.length * this.itemMax;

      var addItems = Math.ceil(this.clipMax / this.itemMax);

      //auto scroll loop & manual scroll bounce or end(to-end)
      if (this.isAuto && this.o.autoMode === 'loop') {

        this.$list.css(this.dimension,this.posMax+(this.itemMax*addItems) +'px');

        this.posMax += (this.clipMax - this.o.speed);

        if (this.isForwards) {
          this.$items.slice(0,addItems).clone(true).appendTo(this.$list);
          this.resetPosition = 0;

        } else {
          this.$items.slice(-addItems).clone(true).prependTo(this.$list);
          this.resetPosition = this.$items.length * this.itemMax;
          //due to inconsistent RTL implementation force back to LTR then fake
          if (this.isRTL) {
            this.$clip[0].dir = 'ltr';
            //based on feedback seems a good idea to force float right
            this.$items.css('float','right');
          }
        }

        //manual and loop
      } else if (!this.isAuto && this.o.manualMode === 'loop') {

        this.posMax += this.itemMax * addItems;

        this.$list.css(this.dimension,this.posMax+(this.itemMax*addItems) +'px');

        this.posMax += (this.clipMax - this.o.speed);

        this.$items.slice(0,addItems).clone(true).appendTo(this.$list);
        this.$items.slice(-addItems).clone(true).prependTo(this.$list);

        this.resetPositionForwards = this.resetPosition = addItems * this.itemMax;
        this.resetPositionBackwards = this.$items.length * this.itemMax;

        //extra events to force scroll direction change
        this.$btnBack.bind(this.events.start, function() {
          self.isForwards = false;
          self.resetPosition = self.resetPositionBackwards;
        });

        this.$btnForward.bind(this.events.start, function() {
          self.isForwards = true;
          self.resetPosition = self.resetPositionForwards;
        });

      } else { //(!this.isAuto && this.o.manualMode=='end')

        this.$list.css(this.dimension,this.posMax +'px');

        if (this.isForwards) {
          this.resetPosition = 0;

        } else {
          this.resetPosition = this.$items.length * this.itemMax;
          //due to inconsistent RTL implementation force back to LTR then fake
          if (this.isRTL) {
            this.$clip[0].dir = 'ltr';
            //based on feedback seems a good idea to force float right
            this.$items.css('float','right');
          }
        }
      }

      this.resetPos(this.o.initialOffset);  //ensure scroll position is reset

      this.timestamp = null;
      this.interval = null;

      if (!(!this.isAuto && this.o.manualMode === 'end')) { //loop mode
        //ensure that speed is divisible by item width. Helps to always make images even not odd widths!
        while (this.itemMax % this.o.speed !== 0) {
          this.o.speed--;
          if (this.o.speed===0) {
            this.o.speed=1; break;
          }
        }
      }

      this.trigger = null;

      this.funcMoveBack = function(e) {
        if (e !== undefined) {
          e.preventDefault();
        }
        self.trigger = !self.isAuto && self.o.manualMode === 'end' ? this : null;
        if (self.isAuto) {
          self.isForwards ? self.moveBack() : self.moveForward();
        } else {
          self.moveBack();
        }
      };

      this.funcMoveForward = function(e) {
        if (e !== undefined) {
          e.preventDefault();
        }
        self.trigger = !self.isAuto && self.o.manualMode === 'end' ? this : null;
        if (self.isAuto) {
          self.isForwards ? self.moveForward() : self.moveBack();
        } else {
          self.moveForward();
        }
      };

      this.funcMovePause = function() { self.movePause(); };
      this.funcMoveStop = function() { self.moveStop(); };
      this.funcMoveResume = function() { self.moveResume(); };

      if (this.isAuto) {

        this.paused = false;

        function togglePause() {
          if (self.paused===false) {
            self.paused=true;
            self.funcMovePause();
          } else {
            self.paused=false;
            self.funcMoveResume();
          }
          return self.paused;
        }

        //disable pauseTouch when links are present
        if (this.supportsTouch && this.$items.find('a').length) {
          this.supportsTouch=false;
        }

        if (this.isAuto && this.o.pauseOnHover && !this.supportsTouch) {
          this.$clip
            .bind(this.events.start, this.funcMovePause)
            .bind(this.events.end, this.funcMoveResume);
        } else if (this.isAuto && this.o.pauseOnTouch && !this.o.pauseButton && this.supportsTouch) {

          var touchStartPos, scrollStartPos;

          this.$clip.bind(this.events.start, function(e) {
            togglePause();
            var touch = e.originalEvent.touches[0];
            touchStartPos = self.isHorizontal ? touch.pageX : touch.pageY;
            scrollStartPos = self.$clip[0]['scroll' + self.scrollPos];
            e.stopPropagation();
            e.preventDefault();

          }).bind(this.events.move,function(e) {

            e.stopPropagation();
            e.preventDefault();

            var touch = e.originalEvent.touches[0],
              endTouchPos = self.isHorizontal ? touch.pageX : touch.pageY,
              pos = (touchStartPos - endTouchPos) + scrollStartPos;

            if (pos < 0) pos = 0;
            else if (pos > self.posMax) pos = self.posMax;

            self.$clip[0]['scroll' + self.scrollPos] = pos;

            //force pause
            self.funcMovePause();
            self.paused = true;
          });
        } else {
          if (this.o.pauseButton) {

            this.$btnPause = $(".simply-scroll-btn-pause",this.$container)
              .bind('click', function(e) {
                e.preventDefault();
                togglePause() ? $(this).addClass('active') : $(this).removeClass('active');
              });
          }
        }
        this.funcMoveForward();
      } else {

        this.$btnBack
          .addClass('simply-scroll-btn' + ' ' + this.moveBackClass)
          .bind(this.events.start, this.funcMoveBack)
          .bind(this.events.end, this.funcMoveStop);
        this.$btnForward
          .addClass('simply-scroll-btn' + ' ' + this.moveForwardClass)
          .bind(this.events.start,this.funcMoveForward)
          .bind(this.events.end, this.funcMoveStop);

        if (this.o.manualMode === 'end') {
          !this.isRTL ? this.$btnBack.addClass('disabled') : this.$btnForward.addClass('disabled');
        }
      }
    },

    moveForward: function() {
      var self = this;
      this.movement = 'forward';
      if (this.trigger !== null) {
        this.$btnBack.removeClass('disabled');
      }
      var frame = function(timestamp) {
        if (self.$clip[0]['scroll' + self.scrollPos] < (self.posMax-self.clipMax)) {
          var delta = (timestamp - (self.timestamp || timestamp)) * self.o.speed/self.o.frameRate;
          self.$clip[0]['scroll' + self.scrollPos] += Math.ceil(delta); //scroll pos. needs to be an int
        } else if (self.isLoop) {
          self.resetPos();
        } else {
          self.moveStop(self.movement);
        }
        self.timestamp = timestamp;
        self.interval = requestAnimationFrame(frame);
      };
      requestAnimationFrame(frame);
    },

    moveBack: function() {
      var self = this;
      this.movement = 'back';
      if (this.trigger !== null) {
        this.$btnForward.removeClass('disabled');
      }
      var frame = function(timestamp) {
        if (self.$clip[0]['scroll' + self.scrollPos] > self.posMin) {
          var delta = (timestamp - (self.timestamp || timestamp)) * self.o.speed/self.o.frameRate;
          self.$clip[0]['scroll' + self.scrollPos] -= Math.ceil(delta);
        } else if (self.isLoop) {
          self.resetPos();
        } else {
          self.moveStop(self.movement);
        }
        self.timestamp = timestamp;
        self.interval = requestAnimationFrame(frame);
      };
      requestAnimationFrame(frame);
    },

    movePause: function() {
      cancelAnimationFrame(this.interval);
      this.timestamp = null;
    },

    moveStop: function(moveDir) {
      this.movePause();
      this.timestamp = null;
      if (this.trigger!==null) {
        if (typeof moveDir !== 'undefined') {
          $(this.trigger).addClass('disabled');
        }
        this.trigger = null;
      }
      if (this.isAuto) {
        if (this.o.autoMode === 'bounce') {
          moveDir === 'forward' ? this.moveBack() : this.moveForward();
        }
      }
    },

    moveResume: function() {
      this.movement === 'forward' ? this.moveForward() : this.moveBack();
    },

    resetPos: function(resetPos) {
      this.$clip[0]['scroll' + this.scrollPos] = resetPos ? resetPos : this.resetPosition;
    }
  });

}));
