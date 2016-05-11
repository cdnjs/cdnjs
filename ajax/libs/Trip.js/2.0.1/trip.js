/**
 *  Trip.js
 *
 *  This is a jQuery plugin that can help you customize your tutorial trip
 *  with full flexibilities.
 *
 *  Version: 2.0.1
 *
 *  Author: EragonJ <eragonj@eragonj.me>
 *  Blog: http://eragonj.me
 *
 *  @preserve
 */
(function(window, $) {

  var CHECKED_ANIMATIONS = [
    'flash', 'bounce', 'shake', 'tada',
    'fadeIn', 'fadeInUp', 'fadeInDown',
    'fadeInLeft', 'fadeInRight', 'fadeInUpBig', 'fadeInDownBig',
    'fadeInLeftBig', 'fadeInRightBig', 'bounceIn', 'bounceInDown',
    'bounceInUp', 'bounceInLeft', 'bounceInRight', 'rotateIn',
    'rotateInDownLeft', 'rotateInDownRight', 'rotateInUpLeft',
    'rotateInUpRight'
  ];

  /**
   * Trip
   *
   * @class Trip
   * @param {Array.<Object>} tripData
   * @param {Object} userOptions
   */
  var Trip = function(tripData, userOptions) {

    /**
     * It is used to keep user and default settings.
     *
     * @memberOf Trip
     * @type {Object}
     */
    this.settings = $.extend({
      // basic config
      tripIndex: 0,
      tripTheme: 'black',
      backToTopWhenEnded: false,
      overlayZindex: 99999,
      delay: 1000,
      enableKeyBinding: true,
      enableAnimation: true,
      showCloseBox: false,
      showHeader: false,
      skipUndefinedTrip: false,

      // navigation
      showNavigation: false,
      canGoNext: true,
      canGoPrev: true,

      // labels
      nextLabel: 'Next',
      prevLabel: 'Back',
      finishLabel: 'Dismiss',
      closeBoxLabel: '&#215;',
      header: 'Step {{tripIndex}}',

      // callbacks for whole process
      onStart: $.noop,
      onEnd: $.noop,

      // callbacks for each trip
      onTripStart: $.noop,
      onTripEnd: $.noop,
      onTripStop: $.noop,
      onTripPause: $.noop,
      onTripResume: $.noop,
      onTripChange: $.noop,
      onTripClose: $.noop,

      // animation
      animation: 'tada',

      // customizable HTML
			tripBlockHTML: [
				'<div class="trip-block">',
					'<a href="#" class="trip-close"></a>',
          '<div class="trip-header"></div>',
					'<div class="trip-content"></div>',
					'<div class="trip-progress-wrapper">',
						'<div class="trip-progress-bar"></div>',
						'<a href="#" class="trip-prev"></a>',
						'<a href="#" class="trip-next"></a>',
					'</div>',
				'</div>'
			]
    }, userOptions);

    this.tripData = tripData;

    // used SELs
    this.$tripBlock = null;
    this.$overlay = null;
    this.$bar = null;
    this.$root = $('body, html');

    // save the current trip index
    this.tripIndex = this.settings.tripIndex;
    this.tripDirection = 'next';
    this.timer = null;
    this.progressing = false;

    // about expose
    this.hasExpose = false;

    // contants
    this.CONSTANTS = {
      LEFT_ARROW: 37,
      UP_ARROW: 38,
      RIGHT_ARROW: 39,
      DOWN_ARROW: 40,
      ESC: 27,
      SPACE: 32,
      TRIP_BLOCK_OFFSET_VERTICAL: 10,
      TRIP_BLOCK_OFFSET_HORIZONTAL: 10
    };

    this.console = window.console || {};
  };

  Trip.prototype = {
    /**
     * This is used to preInit Trip.js. For current use, we will try to
     * override this.console if there is no window.console like IE.
     *
     * @memberOf Trip
     * @type {Function}
     */
    preInit: function() {
      if (typeof this.console === 'undefined') {
        var self = this;
        var methods = ['log', 'warn', 'debug', 'info', 'error'];

        $.each(methods, function(i, methodName) {
          self.console[methodName] = $.noop;
        });
      }
    },

    /**
     * Expose element which has hasExpose property.
     *
     * @memberOf Trip
     * @type {Funtion}
     * @param {jQuery} $sel
     */
    showExpose: function($sel) {
      var oldCSS;
      var newCSS;

      this.hasExpose = true;

      oldCSS = {
        position: $sel.css('position'),
        zIndex: $sel.css('z-Index')
      };

      // we have to make it higher than the overlay
      newCSS = {
        position: 'relative',
        zIndex: this.settings.overlayZindex + 1
      };

      $sel
        .data('trip-old-css', oldCSS)
        .css(newCSS)
        .addClass('trip-exposed');

      this.$overlay.show();
    },

    /**
     * Make exposed element back to normal state and hide overlay.
     *
     * @memberOf Trip
     * @type {Funtion}
     */
    hideExpose: function() {
      var $exposedSel = $('.trip-exposed');
      var oldCSS = $exposedSel.data('trip-old-css');

      this.hasExpose = false;

      $exposedSel
        .css(oldCSS)
        .removeClass('trip-exposed');

      this.$overlay.hide();
    },

    /**
     * When users resize its browser, we will rerun Trip and restart the timer.
     * TODO: We have to debounce this function later to make performance better.
     *
     * @memberOf Trip
     * @type {Function}
     */
    bindResizeEvents: function() {
      var that = this;
      $(window).on('resize.Trip', function() {
        that.run();
      });
    },

    /**
     * Remove resize event from window.
     *
     * @memberOf Trip
     * @type {Function}
     */
    unbindResizeEvents: function() {
      $(window).off('resize.Trip');
    },

    /**
     * Bind keydown events on document.
     *
     * @memberOf Trip
     * @type {Function}
     */
    bindKeyEvents: function() {
      var that = this;
      $(document).on({
        'keydown.Trip': function(e) {
          // `this` will be bound to #document DOM element here
          that.keyEvent.call(that, e);
        }
      });
    },

    /**
     * Remove keydown events from document.
     *
     * @memberOf Trip
     * @type {Function}
     */
    unbindKeyEvents: function() {
      $(document).off('keydown.Trip');
    },

    /**
     * Bound keydown events. We will do specific actions when matched keys
     * are pressed by user.
     *
     * @memberOf Trip
     * @type {function}
     * @param {Event} e
     */
    keyEvent: function(e) {
      switch(e.which) {
        case this.CONSTANTS.ESC:
          this.stop();
          break;

        case this.CONSTANTS.SPACE:
          // space will make the page jump
          e.preventDefault();
          this.pause();
          break;

        case this.CONSTANTS.LEFT_ARROW:
        case this.CONSTANTS.UP_ARROW:
          this.prev();
          break;

        case this.CONSTANTS.RIGHT_ARROW:
        case this.CONSTANTS.DOWN_ARROW:
          this.next();
          break;
      }
    },

    /**
     * Stop API, which will stop the trip.
     *
     * @memberOf Trip
     * @type {Function}
     * @public
     */
    stop: function() {
      if (this.timer) {
        this.timer.stop();
      }

      if (this.hasExpose) {
        this.hideExpose();
      }

      this.hideTripBlock();
      this.unbindKeyEvents();
      this.unbindResizeEvents();

      var tripObject = this.getCurrentTripObject();
      var tripStop = tripObject.onTripStop || this.settings.onTripStop;
      tripStop(this.tripIndex, tripObject);

      this.settings.onEnd();
    },

    /**
     * This is an wrapper for pause and resume API.
     *
     * @memberOf Trip
     * @type {Function}
     */
    pauseAndResume: function() {
      if (this.progressing) {
        this.timer.pause();
        this.pauseProgressBar();
      }
      else {
        var remainingTime = this.timer.resume();
        this.resumeProgressBar(remainingTime);
      }
      this.progressing = !this.progressing;
    },

    /**
     * pause API, which will pause the trip.
     *
     * @memberOf Trip
     * @type {Function}
     * @public
     */
    pause: function() {
      this.pauseAndResume();
      var tripObject = this.getCurrentTripObject();
      var tripPause = tripObject.onTripPause || this.settings.onTripPause;
      tripPause(this.tripIndex, tripObject);
    },

    /**
     * pause API, which will pause the trip.
     *
     * @memberOf Trip
     * @type {Function}
     * @public
     */
    resume: function() {
      this.pauseAndResume();
      var tripObject = this.getCurrentTripObject();
      var tripResume = tripObject.onTripResume || this.settings.onTripResume;
      tripResume(this.tripIndex, tripObject);
    },

    /**
     * next API, which will jump to next the trip.
     *
     * @memberOf Trip
     * @type {Function}
     * @public
     */
    next: function() {
      this.tripDirection = 'next';

      if (!this.canGoNext()) {
        return this.run();
      }

      if (this.hasCallback()) {
        this.callCallback();
      }

      if (this.isLast()) {
        this.doLastOperation();
      }
      else {
        this.increaseIndex();
        this.run();
      }
    },

    /**
     * prev API, which will jump to previous trip.
     *
     * @memberOf Trip
     * @type {Function}
     * @public
     */
    prev: function() {
      this.tripDirection = 'prev';

      if (!this.isFirst() && this.canGoPrev()) {
        this.decreaseIndex();
      }
      this.run();
    },

    /**
     * Show current trip. In this method, we will control all stuffs about
     * current trip including animation, timer, expose, progress bar.
     *
     * @memberOf Trip
     * @type {Function}
     * @param {Object} o
     */
    showCurrentTrip: function(o) {
      if (this.settings.enableAnimation) {
        this.removeAnimation();
      }

      // preprocess when we have to show trip block
      if (this.timer) {
        this.timer.stop();
      }

      if (this.hasExpose) {
        this.hideExpose();
      }

      if (this.progressing) {
        this.hideProgressBar();

        // not doing the progress effect
        this.progressing = false;
      }

      this.setTripBlock(o);
      this.showTripBlock(o);

      if (this.settings.enableAnimation) {
        this.addAnimation(o);
      }

      if (o.expose) {
        this.showExpose($(o.sel));
      }
    },

    /**
     * This is the last operation when we successfully finish all trips in
     * the end.
     *
     * @memberOf Trip
     * @type {Function}
     */
    doLastOperation: function() {
      if (this.timer) {
        this.timer.stop();
      }

      if (this.settings.enableKeyBinding) {
        this.unbindKeyEvents();
      }

      this.hideTripBlock();
      this.unbindResizeEvents();

      if (this.hasExpose) {
        this.hideExpose();
      }

      if (this.settings.backToTopWhenEnded) {
        this.$root.animate({ scrollTop: 0 }, 'slow');
      }

      this.tripIndex = this.settings.tripIndex;
      this.settings.onEnd();

      return false;
    },

    /**
     * This is used to show progress bar UI. We will use jQuery to manipulate
     * the animation.
     *
     * @memberOf Trip
     * @type {Function}
     * @param {Number} delay
     */
    showProgressBar: function(delay) {
      var that = this;

      this.$bar.animate({
        width: '100%'
      }, delay, 'linear', function() {
        that.$bar.width(0);
      });
    },

    /**
     * Hide the progress bar and stop animations.
     *
     * @memberOf Trip
     * @type {Function}
     */
    hideProgressBar: function() {
      this.$bar.width(0);
      this.$bar.stop(true);
    },

    /**
     * Pause the progress bar.
     *
     * @memberOf Trip
     * @type {Function}
     */
    pauseProgressBar: function() {
      this.$bar.stop(true);
    },

    /**
     * Resumse the progress bar.
     *
     * @memberOf Trip
     * @type {Function}
     * @param {Number} remainingTime
     */
    resumeProgressBar: function(remainingTime) {
      this.showProgressBar(remainingTime);
    },

    /**
     * This is the main function to control each trip. In this method, we will
     * make sure every tripData is valid and use that to do following works like
     * showing trip, setup timer and trigger registered callbacks at the right
     * timing.
     *
     * @memberOf Trip
     * @type {Function}
     */
    run: function() {
      var that = this;
      var tripObject = this.getCurrentTripObject();
      var tripStart = tripObject.onTripStart || this.settings.onTripStart;
      var tripChange = tripObject.onTripChange || this.settings.onTripChange;
      var tripEnd = tripObject.onTripEnd || this.settings.onTripEnd;
      var delay = tripObject.delay || this.settings.delay;

      if (!this.isTripDataValid(tripObject)) {
        // force developers to double check tripData again
        if (this.settings.skipUndefinedTrip === false) {
          this.console.error(
            'Your tripData is not valid at index: ' + this.tripIndex);
          this.stop();
          return false;
        }
        // let it go
        else {
          return this[this.tripDirection]();
        }
      }

      this.showCurrentTrip(tripObject);
      this.showProgressBar(delay);
      this.progressing = true;

      tripChange(this.tripIndex, tripObject);
      tripStart(this.tripIndex, tripObject);

      // set timer to show next, if the timer is less than zero we expect
      // it to be manually advanced
      if (delay >= 0) {
        this.timer = new Timer(function() {
          tripEnd(that.tripIndex, tripObject);
          that.next();
        }, delay);
      }
    },

    /**
     * Check whether current trip is the first one.
     *
     * @memberOf Trip
     * @type {Function}
     * @return {Boolean} whether current trip is the first one
     */
    isFirst: function() {
      return (this.tripIndex === 0) ? true: false;
    },

    /**
     * Check whether current trip is the last one.
     *
     * @memberOf Trip
     * @type {Function}
     * @return {Boolean} whether current trip is the last one
     */
    isLast: function() {
      return (this.tripIndex === this.tripData.length - 1) ? true: false;
    },

    /**
     * Check whether tripData is valid
     *
     * @memberOf Trip
     * @type {Function}
     * @param {Object} o tripData
     * @return {Boolean} whether tripData is valid
     */
    isTripDataValid: function(o) {
      var specialDirections = [
        'screen-ne',
        'screen-se',
        'screen-sw',
        'screen-nw',
        'screen-center'
      ];

      // if we have set special direction,
      // we don't need to check sel
      if ($.inArray(o.position, specialDirections) >= 0) {
        return true;
      }

      // have to check `sel` & `content` two required fields
      if (typeof o.content === 'undefined' ||
        typeof o.sel === 'undefined' ||
        o.sel === null ||
        o.sel.length === 0 ||
        $(o.sel).length === 0) {
          return false;
      }
      return true;
    },

    /**
     * Check whether current trip has callback or not.
     *
     * @memberOf Trip
     * @type {Function}
     * @return {Boolean} whether current trip has callback
     */
    hasCallback: function() {
      return (typeof this.tripData[this.tripIndex].callback !== 'undefined');
    },

    /**
     * If current trip has callback, we will call it directly.
     *
     * @memberOf Trip
     * @type {Function}
     */
    callCallback: function() {
      this.tripData[this.tripIndex].callback(this.tripIndex);
    },

    /**
     * Check whether we can go to previous trip or not.
     *
     * @memberOf Trip
     * @type {Function}
     * @return {Boolean} whether we can go to previous trip
     */
    canGoPrev: function() {
      var trip = this.tripData[this.tripIndex];
      var canGoPrev = trip.canGoPrev || this.settings.canGoPrev;

      if (typeof canGoPrev === 'function') {
        canGoPrev = canGoPrev.call(trip);
      }

      return canGoPrev;
    },

    /**
     * Check whether we can go to next trip or not.
     *
     * @memberOf Trip
     * @type {Function}
     * @return {Boolean} whether we can go to next trip
     */
    canGoNext: function() {
      var trip = this.tripData[this.tripIndex];
      var canGoNext = trip.canGoNext || this.settings.canGoNext;

      if (typeof canGoNext === 'function') {
        canGoNext = canGoNext.call(trip);
      }

      return canGoNext;
    },

    /**
     * We can call this method to increase tripIndex because we are not allowed
     * to manipualte the value directly.
     *
     * @memberOf Trip
     * @type {Function}
     */
    increaseIndex: function() {
      if (this.tripIndex >= this.tripData.length - 1) {
        // how about hitting the last item ?
        // do nothing
      }
      else {
        this.tripIndex += 1;
      }
    },

    /**
     * We can call this method to decrease tripIndex because we are not allowed
     * to manipualte the value directly.
     *
     * @memberOf Trip
     * @type {Function}
     */
    decreaseIndex: function() {
      if (this.tripIndex <= 0) {
        // how about hitting the first item ?
        // do nothing
      }
      else {
        this.tripIndex -= 1;
      }
    },

    /**
     * This method is used to get current trip data.
     *
     * @memberOf Trip
     * @type {Function}
     * @return {Object} current trip data
     */
    getCurrentTripObject: function() {
      return this.tripData[this.tripIndex];
    },

    /**
     * This method is used to get current trip title. Because users may need
     * to show the tripIndex in the title, we will process passed title and
     * replace any string matching {{tripIndex}} with current tripIndex.
     *
     * @memberOf Trip
     * @type {Function}
     * @param {String} title
     * @return {String} current title
     */
    getCurrentHeader: function(title) {
      var reTripIndex = /\{\{(tripIndex)\}\}/g;
      return title.replace(reTripIndex, this.tripIndex + 1);
    },

    /**
     * Based on current trip data, we will use this method to set all stuffs
     * we want like content, prev / next labels, close button, used animations.
     *
     * @memberOf Trip
     * @type {Function}
     * @param {Object} o
     */
    setTripBlock: function(o) {
      var $tripBlock = this.$tripBlock;

      // toggle used settings
      var showCloseBox = o.showCloseBox || this.settings.showCloseBox;
      var showNavigation = o.showNavigation || this.settings.showNavigation;
      var showHeader = o.showHeader || this.settings.showHeader;

      // labels
      var closeBoxLabel = o.closeBoxLabel || this.settings.closeBoxLabel;
      var prevLabel = o.prevLabel || this.settings.prevLabel;
      var nextLabel = o.nextLabel || this.settings.nextLabel;
      var finishLabel = o.finishLabel || this.settings.finishLabel;

      // other user customized contents
      var header = o.header || this.settings.header;

      $tripBlock
        .find('.trip-header')
        .html(this.getCurrentHeader(header))
        .toggle(showHeader);

      $tripBlock
        .find('.trip-content')
        .html(o.content);

      $tripBlock
        .find('.trip-prev')
        .html(prevLabel)
        .toggle(showNavigation && !this.isFirst());

      $tripBlock
        .find('.trip-next')
        .html(this.isLast() ? finishLabel: nextLabel)
        .toggle(showNavigation);

      $tripBlock
        .find('.trip-close')
        .html(closeBoxLabel)
        .toggle(showCloseBox);

      // remove old styles then add new one
      $tripBlock.removeClass(
        'e s w n screen-ne screen-se screen-sw screen-nw screen-center');
      $tripBlock.addClass(o.position);

      // NOTE: issue #27
      // we have to set position left first then position top
      // because when tripBlock hits the page margin, it will become
      // multi-lined and this will break cached attributes.
      //
      // In this way, we have to count these attributes at runtime.
      this.setTripBlockPosition(o, 'horizontal');
      this.setTripBlockPosition(o, 'vertical');
    },

    /**
     * This method is mainly used to help us position the trip block. As you can
     * see, we will find out the $sel and its positions first then put our trip
     * block at the right location.
     *
     * @memberOf Trip
     * @type {Function}
     * @param {Object} o
     * @param {String} horizontalOrVertical
     */
    setTripBlockPosition: function(o, horizontalOrVertical) {
      var $tripBlock = this.$tripBlock;
      var $sel = $(o.sel);
      var selWidth = $sel && $sel.outerWidth();
      var selHeight = $sel && $sel.outerHeight();
      var blockWidth = $tripBlock.outerWidth();
      var blockHeight = $tripBlock.outerHeight();
      var arrowHeight = 10;
      var arrowWidth = 10;
      var cssHorizontal;
      var cssVertical;

      switch (o.position) {
        case 'screen-center':
          cssHorizontal = '50%';
          cssVertical = '50%';
          break;
        case 'screen-ne':
        case 'screen-se':
        case 'screen-nw':
        case 'screen-sw':
          cssHorizontal = this.CONSTANTS.TRIP_BLOCK_OFFSET_HORIZONTAL;
          cssVertical = this.CONSTANTS.TRIP_BLOCK_OFFSET_VERTICAL;
          break;
        case 'e':
          cssHorizontal = $sel.offset().left + selWidth + arrowWidth;
          cssVertical = $sel.offset().top - ((blockHeight - selHeight) / 2);
          break;
        case 's':
          cssHorizontal = $sel.offset().left + ((selWidth - blockWidth) / 2);
          cssVertical = $sel.offset().top + selHeight + arrowHeight;
          break;
        case 'w':
          cssHorizontal = $sel.offset().left - (arrowWidth + blockWidth);
          cssVertical = $sel.offset().top - ((blockHeight - selHeight) / 2);
          break;
        case 'n':
          /* falls through */
        default:
          cssHorizontal = $sel.offset().left + ((selWidth - blockWidth) / 2);
          cssVertical = $sel.offset().top - arrowHeight - blockHeight;
          break;
      }

      if (horizontalOrVertical === 'horizontal') {
        // reset styles first
        $tripBlock.css({
          left: '',
          right: '',
          marginLeft: '',
        });

        switch (o.position) {
          case 'screen-center':
            $tripBlock.css({
              left: cssHorizontal,
              marginLeft: -0.5 * blockWidth
            });
            break;
          case 'screen-se':
          case 'screen-ne':
            $tripBlock.css({
              right: cssHorizontal
            });
            break;
          case 'screen-sw':
          case 'screen-nw':
          case 'e':
          case 's':
          case 'w':
          case 'n':
            /* falls through */
          default:
            $tripBlock.css({
              left: cssHorizontal
            });
            break;
        }
      }
      else if (horizontalOrVertical === 'vertical') {
        // reset styles first
        $tripBlock.css({
          top: '',
          bottom: '',
          marginTop: '',
        });

        switch (o.position) {
          case 'screen-center':
            $tripBlock.css({
              top: cssVertical,
              marginTop: -0.5 * blockHeight
            });
            break;
          case 'screen-sw':
          case 'screen-se':
            $tripBlock.css({
              bottom: cssVertical
            });
            break;
          case 'screen-nw':
          case 'screen-ne':
          case 'e':
          case 's':
          case 'w':
          case 'n':
            /* falls through */
          default:
            $tripBlock.css({
              top: cssVertical
            });
            break;
        }
      }
    },

    /**
     * Add animation on the trip block.
     *
     * @memberOf Trip
     * @type {Function}
     * @param {Object} o
     */
    addAnimation: function(o) {
      var animation = o.animation || this.settings.animation;
      if ($.inArray(animation, CHECKED_ANIMATIONS) >= 0) {
        this.$tripBlock.addClass('animated');
        this.$tripBlock.addClass(animation);
      }
    },

    /**
     * Remove animation from the trip block.
     *
     * @memberOf Trip
     * @type {Function}
     */
    removeAnimation: function() {
      this.$tripBlock.removeClass(CHECKED_ANIMATIONS.join(' '));
      this.$tripBlock.removeClass('animated');
    },

    /**
     * After we positioned our trip block, we have to show it on the screen. If
     * the trip block is not on the screen, we will scroll the $root element and
     * then make sure it is definitely on the screen.
     *
     * @memberOf Trip
     * @type {Function}
     * @param {Object} o
     */
    showTripBlock: function(o) {
      this.$tripBlock.css({
        display: 'inline-block',
        // we have to make it higher than the overlay
        zIndex: this.settings.overlayZindex + 1
      });

      var windowHeight = $(window).height();
      var windowTop = $(window).scrollTop();
      var tripBlockTop = this.$tripBlock.offset().top;
      var OFFSET = 100; // make it look nice

      if (tripBlockTop < windowTop + windowHeight &&
        tripBlockTop >= windowTop) {
          // tripBlock is located inside the current screen,
          // so we don't have to scroll
      }
      else {
        this.$root.animate({ scrollTop: tripBlockTop - OFFSET }, 'slow');
      }
    },

    /**
     * Hide the trip block.
     *
     * @memberOf Trip
     * @type {Function}
     */
    hideTripBlock: function() {
      this.$tripBlock.fadeOut('slow');
    },

    /**
     * This is a method wrapper.
     *
     * @memberOf Trip
     * @type {Function}
     */
    create: function() {
      this.createTripBlock();
      this.createOverlay();
    },


    /**
     * This method is used to create a trip block at the first time when
     * start. If the trip block already exists on the DOM tree, we will
     * not create it again.
     *
     * @memberOf Trip
     * @type {Function}
     */
    createTripBlock: function() {
      // make sure the element doesn't exist in the DOM tree
      if (typeof $('.trip-block').get(0) === 'undefined') {
        var that = this;
        var tripBlockHTML = this.settings.tripBlockHTML.join('');
        var $tripBlock = $(tripBlockHTML).addClass(this.settings.tripTheme);

        $('body').append($tripBlock);

        $tripBlock.find('.trip-close').on('click', function(e) {
          e.preventDefault();
          var tripObject = that.getCurrentTripObject();
          var tripClose = tripObject.onTripClose || that.settings.onTripClose;
          tripClose(that.tripIndex, tripObject);
          that.stop();
        });

        $tripBlock.find('.trip-prev').on('click', function(e) {
          e.preventDefault();
          // Force IE/FF to lose focus
          $(this).blur();
          that.prev();
        });

        $tripBlock.find('.trip-next').on('click', function(e) {
          e.preventDefault();
          // Force IE/FF to lose focus
          $(this).blur();
          that.next();
        });
      }
    },

    /**
     * This method is used to create overlay. If the overlay is in the DOM tree,
     * we will not create it again.
     *
     * @memberOf Trip
     * @type {Function}
     */
    createOverlay: function() {
      // make sure the element doesn't exist in the DOM tree
      if (typeof $('.trip-overlay').get(0) === 'undefined') {
        var html = [
          '<div class="trip-overlay">',
          '</div>'
        ].join('');

        var $overlay = $(html);
        $overlay
          .height($(window).height())
          .css({
            zIndex: this.settings.overlayZindex
          });

        $('body').append($overlay);
      }
    },

    /**
     * Clean up all stuffs when we are going to start / restart a trip, so we
     * can make we won't mess up with old stuffs.
     *
     * @memberOf Trip
     * @type {Function}
     */
    cleanup: function() {
      $('.trip-overlay, .trip-block').remove();
    },

    /**
     * Initialize Trip.
     *
     * @memberOf Trip
     * @type {Function}
     */
    init: function() {
      this.preInit();

      if (this.settings.enableKeyBinding) {
        this.bindKeyEvents();
      }

      this.bindResizeEvents();

      // set refs
      this.$tripBlock = $('.trip-block');
      this.$bar = $('.trip-progress-bar');
      this.$overlay = $('.trip-overlay');
    },

    /**
     * Start Trip.
     *
     * @memberOf Trip
     * @type {Function}
     */
    start: function() {
      // cleanup old DOM first
      this.cleanup();

      // we will call this before initializing all stuffs
      this.settings.onStart();

      // create some necessary DOM elements at the first time like jQuery UI
      this.create();

      // init some necessary stuffs like events, late DOM refs
      // after creating DOMs
      this.init();

      // main entry
      this.run();
    }
  };

  // Expose to window
  window.Trip = Trip;

  /**
   * 3rd party libraries / toolkits
   *
   * We will keep our 3rd party libraries / toolkits here to make sure we can
   * track where did we get the code from and its usage.
   *
   * See also:
   * http://stackoverflow.com/questions/3969475/javascript-pause-settimeout
   */
  function Timer(callback, delay) {
    var timerId;
    var start;
    var remaining = delay;

    this.pause = function() {
      window.clearTimeout(timerId);
      remaining -= new Date() - start;
    };

    this.resume = function() {
      start = new Date();
      timerId = window.setTimeout(callback, remaining);
      return remaining;
    };

    this.stop = function() {
      window.clearTimeout(timerId);
    };

    this.resume();
  }

}(window, jQuery));
