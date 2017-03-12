/** @preserve
 *
 * slippry v1.4.0 - Responsive content slider for jQuery
 * http://slippry.com
 *
 * Authors: Lukas Jakob Hafner - @saftsaak
 *          Thomas Hurd - @SeenNotHurd
 *
 * Copyright 2016, booncon oy - http://booncon.com
 *
 *
 * Released under the MIT license - http://opensource.org/licenses/MIT
 */

(function ($) {
  "use strict";
  var defaults;

  defaults = {
    // general elements & wrapper
    slippryWrapper: '<div class="sy-box" />', // wrapper to wrap everything, including pager
    slideWrapper: '<div class="sy-slides-wrap" />', // wrapper to wrap sildes & controls
    slideCrop: '<div class="sy-slides-crop" />', //additional wrapper around just the slides
    boxClass: 'sy-list', // class that goes to original element
    elements: 'li', // elments cointaining slide content
    activeClass: 'sy-active', // class for current slide
    fillerClass: 'sy-filler', // class for element that acts as intrinsic placholder
    loadingClass: 'sy-loading',

    // options
    adaptiveHeight: true, // height of the sliders adapts to current slide
    start: 1, // num (starting from 1), random
    loop: true, // first -> last & last -> first arrows
    captionsSrc: 'img', // img, el [img takes caption from alt or title, el from title of slide element]
    captions: 'overlay', // Position: overlay, below, custom, false
    captionsEl: '.sy-caption', // $ selector for captions wrapper
    initSingle: true, // initialise even if there is only one slide
    responsive: true,
    preload: 'visible', // visible, all | resources to wait for until showing slider

    // pager
    pager: true,
    pagerClass: 'sy-pager',

    // controls
    controls: true,
    controlClass: 'sy-controls',
    prevClass: 'sy-prev',
    prevText: 'Previous',
    nextClass: 'sy-next',
    nextText: 'Next',
    hideOnEnd: true,

    // transitions
    transition: 'fade', // fade, horizontal, vertical, kenburns, false
    kenZoom: 120, // max zoom for kenburns (in %)
    slideMargin: 0, // spacing between slides (in %)
    transClass: 'transition', // [Class applied to [element] while a transition is taking place.]
    speed: 800, // time the transition takes (ms)
    easing: 'swing', // easing to use in the animation [(see... [jquery www])]
    continuous: true, // seamless first/ last transistion, only works with loop
    useCSS: true, // true, false -> fallback to js if no browser support

    //slideshow
    auto: true,
    autoDirection: 'next',
    autoHover: true,
    autoHoverDelay: 100,
    autoDelay: 500,
    pause: 4000,

    // callback functions
    onSliderLoad: function () { // when slider loaded
      return this;
    },
    onSlideBefore: function () { // before page transition starts
      return this;
    },
    onSlideAfter: function () {  // after page transition happened
      return this;
    }
  };

  $.fn.slippry = function (options) {
    var slip, el, prepareFiller, getFillerProportions, init, updateCaption, initPager, initControls, ready, transitionDone, whichTransitionEvent,
      initCaptions, updatePager, setFillerProportions, doTransition, updateSlide, openSlide, updateControls, updatePos, supports, preload, start, elFromSel, doKens;

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

    whichTransitionEvent = function () { // Thanks! http://stackoverflow.com/a/18672988
      var t, div, transitions;
      div = document.createElement('div');
      transitions = {
        'WebkitTransition' : 'webkitTransitionEnd',
        'MozTransition'    : 'transitionend',
        'MSTransition'     : 'msTransitionEnd',
        'OTransition'      : 'oTransitionEnd',
        'transition'       : 'transitionEnd transitionend'
      };
      for (t in transitions) {
        if (div.style[t] !== undefined) {
          return transitions[t];
        }
      }
    };

    supports = (function () {  // Thanks! http://net.tutsplus.com/tutorials/html-css-techniques/quick-tip-detect-css-support-in-browsers-with-javascript/
      var div = document.createElement('div'),
        vendors = ['Khtml', 'Ms', 'O', 'Moz', 'Webkit'],
        len = vendors.length;
      return function (prop) {
        if (prop in div.style) {
          return true;
        }
        prop = prop.replace(/^[a-z]/, function (val) {
          return val.toUpperCase();
        });
        while (len--) {
          if (vendors[len] + prop in div.style) {
            return true;
          }
        }
        return false;
      };
    }());

    elFromSel = function (sel, prop) {
      var props, newelement, id, className;
      props = prop.split('.');
      newelement = $(sel);
      id = '';
      className = '';
      $.each(props, function (i, val) {
        if (val.indexOf('#') >= 0) {
          id += val.replace(/^#/, '');
        } else {
          className += val + ' ';
        }
      });
      if (id.length) {
        newelement.attr('id', id);
      }
      if (className.length) {
        newelement.attr('class', $.trim(className));
      }
      return newelement;
    };

    doKens = function () {
      var kenStart, kenTime, animProp, cssProp;
      animProp = {};
      cssProp = {};
      kenStart = 100 - slip.settings.kenZoom;
      cssProp.width = slip.settings.kenZoom + '%';
      if (slip.vars.active.index() % 2 === 0) {
        cssProp.left = kenStart + '%';
        cssProp.top = kenStart + '%';
        animProp.left = '0%';
        animProp.top = '0%';
      } else {
        cssProp.left = '0%';
        cssProp.top = '0%';
        animProp.left = kenStart + '%';
        animProp.top = kenStart + '%';
      }
      kenTime = slip.settings.pause + slip.settings.speed * 2;
      slip.vars.active.css(cssProp);
      slip.vars.active.animate(animProp, {duration: kenTime, easing: slip.settings.easing, queue: false});
    };

    ready = function () {
      if (slip.vars.fresh) {
        slip.vars.slippryWrapper.removeClass(slip.settings.loadingClass);
        slip.vars.fresh = false;
        if (slip.settings.auto) {
          el.startAuto();
        }
        if (!slip.settings.useCSS && slip.settings.transition === 'kenburns') {
          doKens();
        }
        slip.settings.onSliderLoad.call(undefined, slip.vars.active.index());
      } else {
        $('.' + slip.settings.fillerClass, slip.vars.slideWrapper).addClass('ready');
      }
    };

    setFillerProportions = function (width, height) {
      var ratio, p_top, $filler;
      ratio = width / height;
      p_top = 1 / ratio * 100 + '%';  //cool intrinsic trick: http://alistapart.com/article/creating-intrinsic-ratios-for-video
      $filler = $('.' + slip.settings.fillerClass, slip.vars.slideWrapper);
      $filler.css({paddingTop: p_top}); // resizing without the need of js, true responsiveness :)
      ready();
    };

    // gets the aspect ratio of the filler element
    getFillerProportions = function ($slide) {
      var width, height;
      if (($('img', $slide).attr("src") !== undefined)) {
        $("<img />").on("load", function () {
          width = $slide.width();
          height = $slide.height();
          setFillerProportions(width, height);
        }).attr("src", $('img', $slide).attr("src"));
      } else {
        width = $slide.width();
        height = $slide.height();
        setFillerProportions(width, height);
      }
    };

    // prepares a div to occupy the needed space
    prepareFiller = function () {
      if ($('.' + slip.settings.fillerClass, slip.vars.slideWrapper).length === 0) {
        slip.vars.slideWrapper.append($('<div class="' + slip.settings.fillerClass + '" />'));
      }
      if (slip.settings.adaptiveHeight === true) {  // if the slides shoud alwas adapt to their content
        getFillerProportions($('.' + slip.settings.activeClass, el));  // set the filler height on the active element
      } else {  // otherwise get the highest element
        var $highest, height, loop;
        height = 0;
        loop = 0;
        $(slip.vars.slides).each(function () {
          if ($(this).height() > height) {
            $highest = $(this);
            height = $highest.height();
          }
          loop = loop + 1;
          if (loop === slip.vars.count) {
            if ($highest === undefined) {
              $highest = $($(slip.vars.slides)[0]);
            }
            getFillerProportions($highest);
          }
        });
      }
    };

    updatePager = function () {
      if (slip.settings.pager) {
        $('.' + slip.settings.pagerClass + ' li', slip.vars.slippryWrapper).removeClass(slip.settings.activeClass);
        $($('.' + slip.settings.pagerClass + ' li', slip.vars.slippryWrapper)[slip.vars.active.index()]).addClass(slip.settings.activeClass);
      }
    };

    updateControls = function () {
      if (!slip.settings.loop && slip.settings.hideOnEnd) {
        $('.' + slip.settings.prevClass, slip.vars.slippryWrapper)[slip.vars.first ? 'hide' : 'show']();
        $('.' + slip.settings.nextClass, slip.vars.slippryWrapper)[slip.vars.last ? 'hide' : 'show']();
      }
    };

    updateCaption = function () {
      var caption, wrapper;
      if (slip.settings.captions !== false) {
        if (slip.settings.captionsSrc !== 'img') {
          caption = slip.vars.active.attr('title');
        } else {
          caption = $('img', slip.vars.active).attr('title') !== undefined ? $('img', slip.vars.active).attr('title') : $('img', slip.vars.active).attr('alt');
        }
        if (slip.settings.captions !== 'custom') {
          wrapper = $(slip.settings.captionsEl, slip.vars.slippryWrapper);
        } else {
          wrapper = $(slip.settings.captionsEl);
        }
        if ((caption !== undefined) && (caption !== '')) {
          wrapper.html(caption).show();
        } else {
          wrapper.hide();
        }
      }
    };

    el.startAuto = function () {
      if ((slip.vars.timer === undefined) && (slip.vars.delay === undefined)) {
        slip.vars.delay = window.setTimeout(function () {
          slip.vars.autodelay = false;
          slip.vars.timer = window.setInterval(function () {
            slip.vars.trigger = 'auto';
            openSlide(slip.settings.autoDirection);
          }, slip.settings.pause);
        }, slip.vars.autodelay ? slip.settings.autoHoverDelay : slip.settings.autoDelay);
        if (slip.settings.autoHover) {
          slip.vars.slideWrapper.unbind('mouseenter').unbind('mouseleave').bind('mouseenter', function () {
            if (slip.vars.timer !== undefined) {
              slip.vars.hoverStop = true;
              el.stopAuto();
            } else {
              slip.vars.hoverStop = false;
            }
          }).bind('mouseleave', function () {
            if (slip.vars.hoverStop) {
              slip.vars.autodelay = true;
              el.startAuto();
            }
          });
        }
      }
    };

    el.stopAuto = function () {
      window.clearInterval(slip.vars.timer);
      slip.vars.timer = undefined;
      window.clearTimeout(slip.vars.delay);
      slip.vars.delay = undefined;
    };

    // refreshes the already initialised slider
    el.refresh = function () {
      slip.vars.slides.removeClass(slip.settings.activeClass);
      slip.vars.active.addClass(slip.settings.activeClass);
      if (slip.settings.responsive) {
        prepareFiller();
      } else {
        ready();
      }
      updateControls();
      updatePager();
      updateCaption();
    };

    updateSlide = function () {
      el.refresh();
    };

    transitionDone = function () {
      slip.vars.moving = false;
      slip.vars.active.removeClass(slip.settings.transClass);
      if (!slip.vars.fresh) {
        slip.vars.old.removeClass('sy-ken');
      }
      slip.vars.old.removeClass(slip.settings.transClass);
      slip.settings.onSlideAfter.call(undefined, slip.vars.active, slip.vars.old.index(), slip.vars.active.index());
      if (slip.settings.auto) {
        if (!slip.vars.hoverStop || slip.vars.hoverStop === undefined){
          el.startAuto();
        }
      }
    };

    doTransition = function () {
      var pos, jump, old_left, old_pos, kenTime, ref, cssProp;
      slip.settings.onSlideBefore.call(undefined, slip.vars.active, slip.vars.old.index(), slip.vars.active.index());
      if (slip.settings.transition !== false) {
        slip.vars.moving = true;
        if ((slip.settings.transition === 'fade') || (slip.settings.transition === 'kenburns')) {
          if (slip.vars.fresh) {
            if (slip.settings.useCSS) {
              slip.vars.slides.css({transitionDuration: slip.settings.speed + 'ms', opacity: 0});
            } else {
              slip.vars.slides.css({opacity: 0});
            }
            slip.vars.active.css('opacity', 1);
            if (slip.settings.transition === 'kenburns') {
              if (slip.settings.useCSS) {
                kenTime = slip.settings.pause + slip.settings.speed * 2;
                slip.vars.slides.css({animationDuration: kenTime + 'ms'});
                slip.vars.active.addClass('sy-ken');
              }
            }
            transitionDone();
          } else {
            if (slip.settings.useCSS) {
              slip.vars.old.addClass(slip.settings.transClass).css('opacity', 0);
              slip.vars.active.addClass(slip.settings.transClass).css('opacity', 1);
              if (slip.settings.transition === 'kenburns') {
                slip.vars.active.addClass('sy-ken');
              }
              $(window).off('focus').on('focus', function () { // bugfix for safari 7 which doesn't always trigger ontransitionend when switching tab
                if (slip.vars.moving) {
                  slip.vars.old.trigger(slip.vars.transition);
                }
              });
              slip.vars.old.one(slip.vars.transition, function () {
                transitionDone();
                return this;
              });
            } else {
              if (slip.settings.transition === 'kenburns') {
                doKens();
              }
              slip.vars.old.addClass(slip.settings.transClass).animate({
                opacity: 0
              }, slip.settings.speed, slip.settings.easing, function () {
                transitionDone();
              });
              slip.vars.active.addClass(slip.settings.transClass).css('opacity', 0).animate({
                opacity: 1
              }, slip.settings.speed, slip.settings.easing);
            }
          }
          updateSlide();
        } else if ((slip.settings.transition === 'horizontal') || (slip.settings.transition === 'vertical')) {
          ref = (slip.settings.transition === 'horizontal') ? 'left' : 'top';
          pos = '-' + slip.vars.active.index() * (100 + slip.settings.slideMargin) + '%';
          if (slip.vars.fresh) {
            el.css(ref, pos);
            transitionDone();
          } else {
            cssProp = {};
            if (slip.settings.continuous) {
              if (slip.vars.jump && ((slip.vars.trigger === 'controls') || (slip.vars.trigger === 'auto'))) {
                jump = true;
                old_pos = pos;
                if (slip.vars.first) {
                  old_left = 0;
                  slip.vars.active.css(ref, slip.vars.count * (100 + slip.settings.slideMargin) + '%');
                  pos = '-' + slip.vars.count * (100 + slip.settings.slideMargin) + '%';
                } else {
                  old_left = (slip.vars.count - 1) * (100 + slip.settings.slideMargin) + '%';
                  slip.vars.active.css(ref, -(100 + slip.settings.slideMargin) + '%');
                  pos = (100 + slip.settings.slideMargin) + '%';
                }
              }
            }
            slip.vars.active.addClass(slip.settings.transClass);
            if (slip.settings.useCSS) {
              cssProp[ref] = pos;
              cssProp.transitionDuration = slip.settings.speed + 'ms';
              el.addClass(slip.settings.transition);
              el.css(cssProp);
              $(window).off('focus').on('focus', function () { // bugfix for safari 7 which doesn't always trigger ontransitionend when switching tab
                if (slip.vars.moving) {
                  el.trigger(slip.vars.transition);
                }
              });
              el.one(slip.vars.transition, function () {
                el.removeClass(slip.settings.transition);
                if (jump) {
                  slip.vars.active.css(ref, old_left);
                  cssProp[ref] = old_pos;
                  cssProp.transitionDuration = '0ms';
                  el.css(cssProp);
                }
                transitionDone();
                return this;
              });
            } else {
              cssProp[ref] = pos;
              el.stop().animate(cssProp, slip.settings.speed, slip.settings.easing, function () {
                if (jump) {
                  slip.vars.active.css(ref, old_left);
                  el.css(ref, old_pos);
                }
                transitionDone();
                return this;
              });
            }
          }
          updateSlide();
        }
      } else {
        updateSlide();
        transitionDone();
      }
    };

    updatePos = function (slide) {
      slip.vars.first = slip.vars.last = false;
      if ((slide === 'prev') || (slide === 0)) {
        slip.vars.first = true;
      } else if ((slide === 'next') || (slide === slip.vars.count - 1)) {
        slip.vars.last = true;
      }
    };

    openSlide = function (slide) {
      var current, direction;
      if (!slip.vars.moving) {
        if (slip.vars.trigger !== 'auto') {
          el.stopAuto();
        }
        current = slip.vars.active.index();
        if (slide === 'prev') {
          direction = slide;
          if (current > 0) {
            slide = current - 1;
          } else if (slip.settings.loop) {
            slide = slip.vars.count - 1;
          }
        } else if (slide === 'next') {
          direction = slide;
          if (current < slip.vars.count - 1) {
            slide = current + 1;
          } else if (slip.settings.loop) {
            slide = 0;
          }
        } else {
          slide = slide - 1;
          direction = slide < current ? 'prev' : 'next';
        }
        slip.vars.jump = false;
        if ((slide !== 'prev') && (slide !== 'next') && ((slide !== current) || (slip.vars.fresh))) {
          updatePos(slide);
          slip.vars.old = slip.vars.active;
          slip.vars.active = $(slip.vars.slides[slide]);
          if (((current === 0) && (direction === 'prev')) || ((current === slip.vars.count - 1) && (direction === 'next'))) {
            slip.vars.jump = true;
          }
          doTransition();
        }
      }
    };

    el.goToSlide = function (slide) {
      slip.vars.trigger = 'external';
      openSlide(slide);
    };

    el.goToNextSlide = function () {
      slip.vars.trigger = 'external';
      openSlide('next');
    };

    el.goToPrevSlide = function () {
      slip.vars.trigger = 'external';
      openSlide('prev');
    };

    initPager = function () {
      if ((slip.settings.pager) && (slip.vars.count > 1)) {
        var count, loop, pager;
        count = slip.vars.slides.length;
        pager = $('<ul class="' + slip.settings.pagerClass + '" />');
        for (loop = 1; loop < count + 1; loop = loop + 1) {
          pager.append($('<li />').append($('<a href="#' + loop + '">' + loop + '</a>')));
        }
        slip.vars.slippryWrapper.append(pager);
        $('.' + slip.settings.pagerClass + ' a', slip.vars.slippryWrapper).click(function () {
          slip.vars.trigger = 'pager';
          openSlide(parseInt(this.hash.split('#')[1], 10));
          return false;
        });
        updatePager();
      }
    };

    initControls = function () {
      if ((slip.settings.controls) && (slip.vars.count > 1)) {
        slip.vars.slideWrapper.append(
          $('<ul class="' + slip.settings.controlClass + '" />')
            .append('<li class="' + slip.settings.prevClass + '"><a href="#prev">' + slip.settings.prevText + '</a></li>')
            .append('<li class="' + slip.settings.nextClass + '"><a href="#next">' + slip.settings.nextText + '</a></li>')
        );
        $('.' + slip.settings.controlClass + ' a', slip.vars.slippryWrapper).click(function () {
          slip.vars.trigger = 'controls';
          openSlide(this.hash.split('#')[1]);
          return false;
        });
        updateControls();
      }
    };

    initCaptions = function () {
      if (slip.settings.captions !== false) {
        if (slip.settings.captions === 'overlay') {
          slip.vars.slideWrapper.append($('<div class="sy-caption-wrap" />').html(elFromSel('<div />', slip.settings.captionsEl)));
        } else if (slip.settings.captions === 'below') {
          slip.vars.slippryWrapper.append($('<div class="sy-caption-wrap" />').html(elFromSel('<div />', slip.settings.captionsEl)));
        }
      }
    };

    // actually show the first slide
    start = function () {
      openSlide(slip.vars.active.index() + 1);
    };

    // wait for images, iframes to be loaded
    preload = function (slides) {
      var count, loop, elements, container;
      container = (slip.settings.preload === 'all') ? slides : slip.vars.active;
      elements = $('img, iframe', container);
      count = elements.length;
      if (count === 0) {
        start();
        return;
      }
      loop = 0;
      elements.each(function () {
        $(this).one('load error', function () {
          if (++loop === count) {
            start();
          }
        }).each(function () {
          if (this.complete) {
            $(this).trigger('load');
          }
        });
      });
    };

    el.getCurrentSlide = function () {
      return slip.vars.active;
    };

    el.getSlideCount = function () {
      return slip.vars.count;
    };

    el.destroySlider = function () {
      if (slip.vars.fresh === false) {
        el.stopAuto();
        slip.vars.moving = false;
        slip.vars.slides.each(function () {
          if ($(this).data("sy-cssBckup") !== undefined) {
            $(this).attr("style", $(this).data("sy-cssBckup"));
          } else {
            $(this).removeAttr('style');
          }
          if ($(this).data("sy-classBckup") !== undefined) {
            $(this).attr("class", $(this).data("sy-classBckup"));
          } else {
            $(this).removeAttr('class');
          }
        });
        if (el.data("sy-cssBckup") !== undefined) {
          el.attr("style", el.data("sy-cssBckup"));
        } else {
          el.removeAttr('style');
        }
        if (el.data("sy-classBckup") !== undefined) {
          el.attr("class", el.data("sy-classBckup"));
        } else {
          el.removeAttr('class');
        }
        slip.vars.slippryWrapper.before(el);
        slip.vars.slippryWrapper.remove();
        slip.vars.fresh = undefined;
      }
    };

    el.reloadSlider = function () {
      el.destroySlider();
      init();
    };

    // initialises the slider, creates needed markup
    init = function () {
      var first;
      slip.settings = $.extend({}, defaults, options);
      slip.vars.slides = $(slip.settings.elements, el);
      slip.vars.count = slip.vars.slides.length;
      if (slip.settings.useCSS) { // deactivate css transitions on unsupported browsers
        if (!supports('transition')) {
          slip.settings.useCSS = false;
        }
        slip.vars.transition = whichTransitionEvent();
      }
      el.data('sy-cssBckup', el.attr('style'));
      el.data('sy-classBackup', el.attr('class'));
      el.addClass(slip.settings.boxClass).wrap(slip.settings.slippryWrapper).wrap(slip.settings.slideWrapper).wrap(slip.settings.slideCrop);
      slip.vars.slideWrapper = el.parent().parent();
      slip.vars.slippryWrapper = slip.vars.slideWrapper.parent().addClass(slip.settings.loadingClass);
      slip.vars.fresh = true;
      slip.vars.slides.each(function () {
        $(this).addClass('sy-slide ' + slip.settings.transition);
        if (slip.settings.useCSS) {
          $(this).addClass('useCSS');
        }
        if (slip.settings.transition === 'horizontal') {
          $(this).css('left', $(this).index() * (100 + slip.settings.slideMargin) + '%');
        } else if (slip.settings.transition === 'vertical') {
          $(this).css('top', $(this).index() * (100 + slip.settings.slideMargin) + '%');
        }
      });
      if ((slip.vars.count > 1) || (slip.settings.initSingle)) {
        if ($('.' + slip.settings.activeClass, el).index() === -1) {
          if (slip.settings.start === 'random') {
            first = Math.round(Math.random() * (slip.vars.count - 1));
          } else if (slip.settings.start > 0 && slip.settings.start <= slip.vars.count) {
            first = slip.settings.start - 1;
          } else {
            first = 0;
          }
          slip.vars.active = $(slip.vars.slides[first]).addClass(slip.settings.activeClass);
        } else {
          slip.vars.active = $('.' + slip.settings.activeClass, el);
        }
        initControls();
        initPager();
        initCaptions();
        preload(slip.vars.slides);
      } else {
        return this;
      }
    };

    init(); // on startup initialise the slider

    return this;
  };
}(jQuery));
