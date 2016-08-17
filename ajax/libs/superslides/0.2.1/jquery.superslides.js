
/*
  Superslides 0.2.1
  Fullscreen slideshow plugin for jQuery
  by Nic Aitch @nicinabox
  http://nicinabox.github.com/superslides/
*/

(function() {
  var $;

  $ = jQuery;

  $.fn.superslides = function(options) {
    var $children, $nav, $this, adjust_image_position, adjust_slides_size, animate, animating, current, first_load, height, img, interval, next, prev, size, start, stop, width;
    options = $.extend({
      delay: 5000,
      play: false,
      slide_speed: 'normal',
      slide_easing: 'linear',
      nav_class: 'slides-navigation'
    }, options);
    $this = $(this).children('ul');
    $children = $this.children();
    $nav = $("." + options.nav_class);
    width = window.innerWidth || document.body.clientWidth;
    height = window.innerHeight || document.body.clientHeight;
    current = 0;
    size = $children.length;
    prev = 0;
    next = 0;
    first_load = true;
    interval = 0;
    animating = false;
    img = {
      width: 0,
      height: 0
    };
    start = function() {
      animate(0);
      if (options.play) {
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
        img.height = $img.height();
        $img.removeAttr('height');
      }
      if ($img.attr('width')) {
        img.width = $img.width();
        $img.removeAttr('width');
      }
      if (height < img.height) {
        $img.css({
          top: -(img.height - height) / 2
        });
      }
      if (width < img.width) {
        $img.css({
          left: -(img.width - width) / 2
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
        return $this.animate({
          left: -position
        }, options.slide_speed, options.slide_easing, function() {
          $this.css({
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
          if (first_load) $this.trigger('slides.initialized');
          first_load = false;
          animating = false;
          return $this.trigger('slides.animated');
        });
      }
    };
    return this.each(function() {
      var $container;
      $this.width(width * size);
      $container = $this.parent();
      $children.css({
        position: 'absolute',
        top: 0,
        left: width,
        zIndex: 0,
        display: 'none'
      });
      $this.css({
        position: 'relative',
        width: width * 3,
        height: height,
        left: -width
      });
      adjust_slides_size($children);
      start();
      $(window).resize(function(e) {
        width = window.innerWidth || document.body.clientWidth;
        height = window.innerHeight || document.body.clientHeight;
        adjust_slides_size($children);
        return $this.width(width * 3).css({
          left: -width,
          height: height
        });
      });
      return $('a', $nav).click(function(e) {
        e.preventDefault();
        stop();
        if ($(this).hasClass('next')) {
          return animate('next');
        } else {
          return animate('prev');
        }
      });
    });
  };

}).call(this);
