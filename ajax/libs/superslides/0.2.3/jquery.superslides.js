
/*
  Superslides 0.2.3
  Fullscreen slideshow plugin for jQuery
  by Nic Aitch @nicinabox
  http://nicinabox.github.com/superslides/
*/

(function() {
  var $;

  $ = jQuery;

  $.fn.superslides = function(options) {
    var $children, $container, $control, $nav, $this, adjust_image_position, adjust_slides_size, animate, animating, current, first_load, height, interval, next, prev, size, start, stop, width;
    options = $.extend({
      delay: 5000,
      play: false,
      slide_speed: 'normal',
      slide_easing: 'linear',
      nav_class: 'slides-navigation',
      container: 'slides-container'
    }, options);
    $("." + options.container, this).wrap('<div class="slides-control" />');
    $this = $(this);
    $control = $('.slides-control', $this);
    $container = $("." + options.container);
    $children = $container.children();
    $nav = $("." + options.nav_class);
    size = $children.length;
    width = window.innerWidth || document.body.clientWidth;
    height = window.innerHeight || document.body.clientHeight;
    current = 0;
    prev = 0;
    next = 0;
    first_load = true;
    interval = 0;
    animating = false;
    start = function() {
      animate((first_load ? 0 : "next"));
      if (options.play) {
        if (interval) stop();
        return interval = setInterval(function() {
          var direction;
          direction = (first_load ? 0 : "next");
          return animate(direction);
        }, options.delay);
      }
    };
    stop = function() {
      return clearInterval(interval);
    };
    adjust_image_position = function($el) {
      var $img;
      $img = $('img', $el);
      if ($img.attr('height')) {
        $img.data('original-height', $img.height()).removeAttr('height');
      }
      if ($img.attr('width')) {
        $img.data('original-width', $img.width()).removeAttr('width');
      }
      if (height < $img.data('original-height')) {
        $img.css({
          top: -($img.data('original-height') - height) / 2
        });
      }
      if (width < $img.data('original-width')) {
        $img.css({
          left: -($img.data('original-width') - width) / 2
        });
      } else {
        $img.css({
          left: 0
        });
      }
      return $this.trigger('slides.image_adjusted');
    };
    adjust_slides_size = function($el) {
      $el.each(function(i) {
        $(this).width(width).height(height).css({
          left: width
        });
        return adjust_image_position($(this));
      });
      return $this.trigger('slides.sized');
    };
    animate = function(direction) {
      var position;
      if (!animating) {
        prev = current;
        animating = true;
        switch (direction) {
          case 'next':
            position = width * 2;
            direction = -width * 2;
            next = current + 1;
            if (size === next) next = 0;
            break;
          case 'prev':
            position = 0;
            direction = 0;
            next = current - 1;
            if (next === -1) next = size - 1;
            break;
          default:
            prev = -1;
            next = direction;
        }
        current = next;
        $children.removeClass('current');
        $children.eq(current).css({
          left: position,
          display: 'block'
        });
        return $control.animate({
          left: -position,
          avoidTransforms: false
        }, options.slide_speed, options.slide_easing, function() {
          $control.css({
            left: -width
          });
          $children.eq(next).css({
            left: width,
            zIndex: 2
          });
          $children.eq(prev).css({
            left: width,
            display: 'none',
            zIndex: 0
          });
          $children.eq(current).addClass('current');
          if (first_load) {
            $container.fadeIn('fast');
            $this.trigger('slides.initialized');
            first_load = false;
          }
          animating = false;
          return $this.trigger('slides.animated');
        });
      }
    };
    return this.each(function() {
      $control.css({
        position: 'relative',
        width: width * 3,
        height: height,
        left: -width
      });
      $container.hide();
      $children.css({
        display: 'none',
        position: 'absolute',
        overflow: 'hidden',
        top: 0,
        left: width,
        zIndex: 0
      });
      adjust_slides_size($children);
      $(window).resize(function(e) {
        width = window.innerWidth || document.body.clientWidth;
        height = window.innerHeight || document.body.clientHeight;
        adjust_slides_size($children);
        return $control.width(width * 3).css({
          left: -width,
          height: height
        });
      });
      $('a', $nav).click(function(e) {
        e.preventDefault();
        stop();
        if ($(this).hasClass('next')) {
          return animate('next');
        } else {
          return animate('prev');
        }
      });
      $('body').on('slides.start', function(e) {
        return start();
      });
      $('body').on('slides.stop', function(e) {
        return stop();
      });
      return $this.trigger('slides.start');
    });
  };

}).call(this);
