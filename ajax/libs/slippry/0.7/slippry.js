/**
 * slippry v0.7 - Simple responsive content slider
 * http://slippry.com
 *
 * Author(s): Lukas Jakob Hafner - @saftsaak 
 *
 * Copyright 2013, booncon oy - http://booncon.com
 *
 * Released under the MIT license - http://opensource.org/licenses/MIT
 */

(function ($) {
  "use strict";
  var defaults;

  defaults = {
    // general elements & wrapper
    slippryWrapper: '<div class="slippry_box" />', // wrapper to wrap everything, including pager
    slideWrapper: '<div class="slide_box" />', // wrapper to wrap sildes & controls
    boxClass: 'slippry_list', // class that goes to original element
    elements: 'li', // elments cointaining slide content
    activeClass: 'active', // class for current slide
    fillerClass: 'filler', // class for element that acts as intrinsic placholder

    // options
    adaptHeight: true, // height of the sliders adapts to current slide
    randomStart: false, // start at a random position
    loop: true, // first -> last & last -> first arrows
    captions: 'overlay', // overlay, below, custom (selector), false
    initSingle: true, // initialise even if there is only one slide

    // pager
    usePager: true,
    pagerClass: 'pager',

    // controls
    useControls: true,
    controlClass: 'controls',
    prevClass: 'slip_prev',
    prevText: 'Previous',
    nextClass: 'slip_next',
    nextText: 'Next',

    // transitions
    transition: 'slide', // fade, slide, false, kenburns?
    transSpace: 0, // spacing between slides (in %)
    transClass: 'transition',
    transTime: 1200, // time the transition takes
    transEase: 'swing', // easing to use in the animation
    continuous: true, // seamless first/ last transistion, only works with loop

    // callback functions
    onSlideBefore: function () { // before page transition starts
      return this;
    },
    onSlideAfter: function () {  // after page tarnsition happened
      return this;
    }
  };

  $.fn.slippry = function (options) {
    var slip, el, refresh, prepareFiller, setFillerProportions, init, goToSlide,
      initPager, initControls, initCaptions, updatePager, doTransition, updateSlide, updateControls, updatePos;

    // reference to the object calling the function
    el = this;

    // if no elements just stop
    if (el.length === 0) {
      return this;
    }
    // support mutltiple elements
    if (el.length > 1) {
      el.each(function () {
        $(this).slippry(options);
      });
      return this;
    }
    // variable to access the slider settings across the plugin
    slip = {};
    slip.vars = {};

    // sets the aspect ratio of the filler element
    setFillerProportions = function ($slide) {
      var width, height, ratio, p_top;
      width = $slide.width();
      height = $slide.height();
      ratio = width / height;
      p_top = 1 / ratio * 100 + '%';  //cool intrinsic trick: http://alistapart.com/article/creating-intrinsic-ratios-for-video
      $('.' + slip.settings.fillerClass, slip.vars.slideWrapper).css({paddingTop: p_top}); // resizing without the need of js, true responsiveness :)      
    };

    // prepares a div to occupy the needed space
    prepareFiller = function () {
      if ($('.' + slip.settings.fillerClass, slip.vars.slideWrapper).length === 0) {
        slip.vars.slideWrapper.append($('<div class="' + slip.settings.fillerClass + '" />'));
      }
      if (slip.settings.adaptHeight === true) {  // if the slides shoud alwas adapt to their content
        setFillerProportions($('.' + slip.settings.activeClass, el));  // set the filler height on the active element
      } else {  // otherwise get the highest element
        var slides, $highest, height, count, loop;
        slides = $(slip.settings.elements, el);
        height = 0;
        loop = 0;
        count = slides.length;
        $(slides).each(function () {
          if ($(this).height() > height) {
            $highest = $(this);
            height = $highest.height();
          }
          loop = loop + 1;
          if (loop === count) {
            if ($highest === undefined) {
              $highest = $($(slides)[0]);
            }
            setFillerProportions($highest);
          }
        });
      }
    };

    updatePager = function () {
      if (slip.settings.usePager) {
        $('.pager li', slip.vars.slippryWrapper).removeClass('active');
        $($('.pager li', slip.vars.slippryWrapper)[slip.vars.active.index()]).addClass(slip.settings.activeClass);
      }
    };

    updateControls = function () {
      if (!slip.settings.loop) {
        $('.' + slip.settings.prevClass, slip.vars.slippryWrapper)[slip.vars.first ? 'hide' : 'show']();
        $('.' + slip.settings.nextClass, slip.vars.slippryWrapper)[slip.vars.last ? 'hide' : 'show']();
      }
    };

    // refreshes the already initialised slider
    refresh = function () {
      $(slip.settings.elements, el).removeClass(slip.settings.activeClass);
      slip.vars.active.addClass(slip.settings.activeClass).removeClass(slip.settings.transClass);
      prepareFiller();
      updateControls();
      updatePager();
      if (slip.settings.captions !== false) {
        $('.caption', slip.vars.slippryWrapper).html(slip.vars.active.attr('title'));
      }
    };

    updateSlide = function () {
      refresh();
      slip.settings.onSlideAfter.call(slip.vars.active);
    };

    doTransition = function () {
      var pos, jump, old_left, old_pos;
      slip.settings.onSlideBefore.call(slip.vars.active);
      slip.vars.moving = true;
      if (slip.settings.transition !== false) {
        if (slip.settings.transition === 'fade') {
          slip.vars.old.addClass(slip.settings.transClass).stop().animate({
            opacity: 0
          }, slip.settings.transTime, function () {
            $(this).removeClass(slip.settings.transClass);
            slip.vars.moving = false;
          });
          slip.vars.active.addClass(slip.settings.transClass).css('opacity', 0).stop().animate({
            opacity: 1
          }, slip.settings.transTime, slip.settings.transEase, function () {
            $(this).removeClass(slip.settings.transClass);
          });
          updateSlide();
        } else if (slip.settings.transition === 'slide') {
          pos = '-' + slip.vars.active.index() * (100 + slip.settings.transSpace) + '%';
          if (slip.settings.continuous) {
            if (slip.vars.jump && (slip.vars.trigger === 'controls')) {
              jump = true;
              old_pos = pos;
              if (slip.vars.first) {
                old_left = 0;
                slip.vars.active.css('left', slip.vars.count * (100 + slip.settings.transSpace) + '%');
                pos = '-' + slip.vars.count * (100 + slip.settings.transSpace) + '%';
              } else {
                old_left = (slip.vars.count - 1) * (100 + slip.settings.transSpace) + '%';
                slip.vars.active.css('left', -(100 + slip.settings.transSpace) + '%');
                pos = (100 + slip.settings.transSpace) + '%';
              }
            }
          }
          slip.vars.active.addClass(slip.settings.transClass);
          el.stop().animate({
            left: pos
          }, slip.settings.transTime, slip.settings.transEase, function () {
            if (jump) {
              slip.vars.active.css('left', old_left);
              el.css('left', old_pos);
            }
            slip.vars.moving = false;
            return this;
          });
          updateSlide();
        }
      } else {
        updateSlide();
      }
    };

    updatePos = function (slide) {
      slip.vars.first = false;
      slip.vars.last = false;
      if ((slide === 'prev') || (slide === 0)) {
        slip.vars.first = true;
      } else if ((slide === 'next') || (slide === slip.vars.count - 1)) {
        slip.vars.last = true;
      }
    };

    goToSlide = function (slide) {
      var current;
      if (!slip.vars.moving) {
        current = slip.vars.active.index();
        if (slide === 'prev') {
          if (current > 0) {
            slide = current - 1;
          } else if (slip.settings.loop) {
            slide = slip.vars.count - 1;
          }
        } else if (slide === 'next') {
          if (current < slip.vars.count - 1) {
            slide = current + 1;
          } else if (slip.settings.loop) {
            slide = 0;
          }
        }
        slip.vars.jump = false;
        if ((slide !== 'prev') && (slide !== 'next')) {
          updatePos(slide);
          slip.vars.old = slip.vars.active;
          slip.vars.active = $($(slip.settings.elements, el)[slide]);
          if (((current === 0) && (slide === slip.vars.count - 1)) || ((current === slip.vars.count - 1) && (slide === 0))) {
            slip.vars.jump = true;
          }
          doTransition();
        }
      }
    };

    initPager = function () {
      if ((slip.settings.usePager) && (slip.vars.count > 1)) {
        var count, loop, pager;
        count = $(slip.settings.elements, el).length;
        pager = $('<ul class="' + slip.settings.pagerClass + '" />');
        for (loop = 0; loop < count; loop = loop + 1) {
          pager.append($('<li />').append($('<a href="#' + loop + '"></a>')));
        }
        slip.vars.slippryWrapper.append(pager);
        $('.' + slip.settings.pagerClass + ' a', slip.vars.slippryWrapper).click(function () {
          slip.vars.trigger = 'pager';
          goToSlide(parseInt(this.hash.split('#')[1], 10));
          return false;
        });
        updatePager();
      }
    };

    initControls = function () {
      if ((slip.settings.useControls) && (slip.vars.count > 1)) {
        slip.vars.slideWrapper.append(
          $('<ul class="' + slip.settings.controlClass + '" />')
            .append('<li class="' + slip.settings.prevClass + '"><a href="#prev">' + slip.settings.prevText + '</a></li>')
            .append('<li class="' + slip.settings.nextClass + '"><a href="#next">' + slip.settings.nextText + '</a></li>')
        );
        $('.' + slip.settings.controlClass + ' a', slip.vars.slippryWrapper).click(function () {
          slip.vars.trigger = 'controls';
          goToSlide(this.hash.split('#')[1]);
          return false;
        });
        updateControls();
      }
    };

    initCaptions = function () {
      if (slip.settings.captions !== false) {
        if (slip.settings.captions === 'overlay') {
          slip.vars.slideWrapper.append('<div class="caption_wrap"><div class="caption"></div></div>');
        } else if (slip.settings.captions === 'below') {
          slip.vars.slippryWrapper.append('<div class="caption" />');
        }
        $('.caption', slip.vars.slippryWrapper).html(slip.vars.active.attr('title'));
      }
    };

    // initialises the slider, creates needed markup
    init = function () {
      var start;
      slip.settings = $.extend({}, defaults, options);
      slip.vars.count = $(slip.settings.elements, el).length;
      if ((slip.vars.count !== 1) || (slip.settings.initSingle)) {
        if ($('.' + slip.settings.activeClass, el).index() === -1) {
          if (slip.settings.randomStart) {
            start = Math.round(Math.random() * (slip.vars.count - 1));
          } else {
            start = 0;
          }
          $($(slip.settings.elements, el)[start]).addClass(slip.settings.activeClass);
          slip.vars.active = $($(slip.settings.elements, el)[start]);
        } else {
          slip.vars.active = $('.' + slip.settings.activeClass, el);
        }
        updatePos(slip.vars.active.index());
        if (slip.settings.transition === 'slide') {
          $(slip.settings.elements, el).each(function () {
            $(this).css('left', $(this).index() * (100 + slip.settings.transSpace) + '%').addClass('slide');
          });
        }
        el.addClass(slip.settings.boxClass).wrap(slip.settings.slippryWrapper).wrap(slip.settings.slideWrapper);
        slip.vars.slideWrapper = el.parent();
        slip.vars.slippryWrapper = slip.vars.slideWrapper.parent();
        initControls();
        initPager();
        initCaptions();
        refresh();
      } else {
        return this;
      }
    };

    this.reset = function () {
      console.log('reset');
      // el.parent().parent().append(el).remove(el.parent()); // implement this properly todo : delete all the created objects
      // init(); // re-initialise
    };

    init(); // on startup initialise the slider

    return this;
  };
}(jQuery));