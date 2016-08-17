/*! Superslides - v0.5.2 - 2013-01-20
* https://github.com/nicinabox/superslides
* Copyright (c) 2013 Nic Aitch; Licensed MIT */

(function() {
  var $, Superslides, plugin;

  plugin = 'superslides';

  $ = jQuery;

  Superslides = function(el, options) {
    var $children, $container, $control, $pagination, $window, addPagination, addPaginationItem, adjustImagePosition, adjustSlidesSize, animator, findMultiplier, height, init, initialize, loadImage, multiplier, next, parseHash, positions, prev, setHorizontalPosition, setVerticalPosition, setupChildren, setupContainers, setupCss, setupNextPrev, that, toggleNav, upcomingSlide, width,
      _this = this;
    if (options == null) {
      options = {};
    }
    this.options = $.extend({
      play: false,
      slide_speed: 'normal',
      slide_easing: 'linear',
      pagination: true,
      hashchange: false,
      scrollable: true,
      classes: {
        preserve: 'preserve',
        nav: 'slides-navigation',
        container: 'slides-container',
        pagination: 'slides-pagination'
      }
    }, options);
    that = this;
    $window = $(window);
    this.el = $(el);
    $container = $("." + this.options.classes.container, el);
    $children = $container.children();
    $pagination = $("<nav>", {
      "class": this.options.classes.pagination
    });
    $control = $('<div>', {
      "class": 'slides-control'
    });
    multiplier = 1;
    init = false;
    width = $window.width();
    height = $window.height();
    initialize = function() {
      if (init) {
        return;
      }
      multiplier = findMultiplier();
      positions();
      _this.mobile = /mobile/i.test(navigator.userAgent);
      $control = $container.wrap($control).parent('.slides-control');
      setupCss();
      setupContainers();
      toggleNav();
      addPagination();
      _this.start();
      return _this;
    };
    setupCss = function() {
      $('body').css({
        margin: 0
      });
      _this.el.css({
        position: 'relative',
        overflowX: 'hidden',
        width: '100%'
      });
      $control.css({
        position: 'relative',
        transform: 'translate3d(0)'
      });
      $container.css({
        display: 'none',
        margin: '0',
        padding: '0',
        listStyle: 'none',
        position: 'relative'
      });
      return $container.find('img').not("." + _this.options.classes.preserve).css({
        "-webkit-backface-visibility": 'hidden',
        "-ms-interpolation-mode": 'bicubic',
        "position": 'absolute',
        "left": '0',
        "top": '0',
        "z-index": '-1'
      });
    };
    setupContainers = function() {
      $('body').css({
        margin: 0,
        overflow: 'hidden'
      });
      _this.el.css({
        height: height
      });
      $control.css({
        width: width * multiplier,
        left: -width
      });
      if (_this.options.scrollable) {
        return $children.each(function() {
          if ($('.scrollable', this).length) {
            return;
          }
          $(this).wrapInner('<div class="scrollable" />');
          return $(this).find('img').not("." + _this.options.classes.preserve).insertBefore($('.scrollable', this));
        });
      }
    };
    setupChildren = function() {
      if ($children.is('img')) {
        $children.wrap('<div>');
        $children = $container.children();
      }
      $children.css({
        display: 'none',
        position: 'absolute',
        overflow: 'hidden',
        top: 0,
        left: width,
        zIndex: 0
      });
      return adjustSlidesSize($children);
    };
    toggleNav = function() {
      if (_this.size() > 1) {
        return $("." + _this.options.classes.nav).show();
      } else {
        return $("." + _this.options.classes.nav).hide();
      }
    };
    setupNextPrev = function() {
      return $("." + _this.options.classes.nav + " a").each(function() {
        if ($(this).hasClass('next')) {
          return this.hash = that.next;
        } else {
          return this.hash = that.prev;
        }
      });
    };
    addPaginationItem = function(i) {
      if (!(i >= 0)) {
        i = _this.size() - 1;
      }
      return $pagination.append($("<a>", {
        href: "#" + i,
        "class": _this.current === $pagination.children().length ? "current" : void 0
      }));
    };
    addPagination = function() {
      var array, last_index;
      if (!_this.options.pagination || _this.size() === 1) {
        return;
      }
      if ($(el).find("." + _this.options.classes.pagination).length) {
        last_index = $pagination.children().last().index();
        array = $children;
      } else {
        last_index = 0;
        array = new Array(_this.size() - last_index);
        $pagination = $pagination.appendTo(_this.el);
      }
      return $.each(array, function(i) {
        return addPaginationItem(i);
      });
    };
    loadImage = function($img, callback) {
      return $("<img>", {
        src: $img.attr('src')
      }).load(function() {
        if (callback instanceof Function) {
          return callback(this);
        }
      });
    };
    setVerticalPosition = function($img) {
      var scale_height;
      scale_height = width / $img.data('aspect-ratio');
      if (scale_height >= height) {
        return $img.css({
          top: -(scale_height - height) / 2
        });
      } else {
        return $img.css({
          top: 0
        });
      }
    };
    setHorizontalPosition = function($img) {
      var scale_width;
      scale_width = height * $img.data('aspect-ratio');
      if (scale_width >= width) {
        return $img.css({
          left: -(scale_width - width) / 2
        });
      } else {
        return $img.css({
          left: 0
        });
      }
    };
    adjustImagePosition = function($img) {
      if (!$img.data('aspect-ratio')) {
        loadImage($img, function(image) {
          $img.removeAttr('width').removeAttr('height');
          $img.data('aspect-ratio', image.width / image.height);
          return adjustImagePosition($img);
        });
        return;
      }
      if ((width / height) >= $img.data('aspect-ratio')) {
        $img.css({
          height: "auto",
          width: "100%"
        });
      } else {
        $img.css({
          height: "100%",
          width: "auto"
        });
      }
      setHorizontalPosition($img);
      return setVerticalPosition($img);
    };
    adjustSlidesSize = function($el) {
      return $el.each(function(i) {
        $(this).width(width).height(height);
        $(this).css({
          left: width
        });
        return adjustImagePosition($('img', this).not("." + that.options.classes.preserve));
      });
    };
    findMultiplier = function() {
      if (_this.size() === 1) {
        return 1;
      } else {
        return 3;
      }
    };
    next = function() {
      var index;
      index = _this.current + 1;
      if (index === _this.size()) {
        index = 0;
      }
      return index;
    };
    prev = function() {
      var index;
      index = _this.current - 1;
      if (index < 0) {
        index = _this.size() - 1;
      }
      return index;
    };
    upcomingSlide = function(direction) {
      switch (true) {
        case /next/.test(direction):
          return next();
        case /prev/.test(direction):
          return prev();
        case /\d/.test(direction):
          return direction;
        default:
          return false;
      }
    };
    parseHash = function(hash) {
      if (hash == null) {
        hash = window.location.hash;
      }
      hash = hash.replace(/^#/, '');
      if (hash) {
        return +hash;
      }
    };
    positions = function(current) {
      if (current == null) {
        current = -1;
      }
      if (init && _this.current >= 0) {
        if (current < 0) {
          current = _this.current;
        }
      }
      _this.current = current;
      _this.next = next();
      _this.prev = prev();
      return false;
    };
    animator = function(direction, callback) {
      var offset, outgoing_slide, position, upcoming_position, upcoming_slide;
      upcoming_slide = upcomingSlide(direction);
      if (upcoming_slide > _this.size() - 1) {
        return;
      }
      position = width * 2;
      offset = -position;
      outgoing_slide = _this.current;
      if (direction === 'prev' || direction < outgoing_slide) {
        position = 0;
        offset = 0;
      }
      upcoming_position = position;
      $children.removeClass('current').eq(upcoming_slide).addClass('current').css({
        left: upcoming_position,
        display: 'block'
      });
      $pagination.children().removeClass('current').eq(upcoming_slide).addClass('current');
      return $control.animate({
        useTranslate3d: _this.mobile,
        left: offset
      }, _this.options.slide_speed, _this.options.slide_easing, function() {
        positions(upcoming_slide);
        if (_this.size() > 1) {
          $control.css({
            left: -width
          });
          $children.eq(upcoming_slide).css({
            left: width,
            zIndex: 2
          });
          if (outgoing_slide >= 0) {
            $children.eq(outgoing_slide).css({
              left: width,
              display: 'none',
              zIndex: 0
            });
          }
        }
        if (_this.options.hashchange) {
          window.location.hash = _this.current;
        }
        if (typeof callback === 'function') {
          callback();
        }
        setupNextPrev();
        _this.animating = false;
        if (init) {
          return $container.trigger('animated.slides');
        } else {
          init = true;
          $('body').css('overflow', 'visible');
          $container.fadeIn('fast');
          return $container.trigger('init.slides');
        }
      });
    };
    this.$el = $(el);
    this.animate = function(direction, callback) {
      if (direction == null) {
        direction = 'next';
      }
      if (_this.animating) {
        return;
      }
      _this.animating = true;
      return animator(direction, callback);
    };
    this.update = function() {
      positions(_this.current);
      addPagination();
      toggleNav();
      return $container.trigger('updated.slides');
    };
    this.destroy = function() {
      return $(el).removeData();
    };
    this.size = function() {
      return $container.children().length;
    };
    this.stop = function() {
      clearInterval(_this.play_id);
      delete _this.play_id;
      return $container.trigger('stopped.slides');
    };
    this.start = function() {
      setupChildren();
      if (_this.options.hashchange) {
        $window.trigger('hashchange');
      }
      _this.animate('next');
      if (_this.options.play) {
        if (_this.play_id) {
          _this.stop();
        }
        _this.play_id = setInterval(function() {
          return _this.animate('next');
        }, _this.options.play);
      }
      return $container.trigger('started.slides');
    };
    $window.on('hashchange', function(e) {
      var index;
      index = parseHash();
      if (index >= 0 && index !== _this.current) {
        return _this.animate(index);
      }
    }).on('resize', function(e) {
      width = $window.width();
      height = $window.height();
      setupContainers();
      return adjustSlidesSize($children);
    });
    $(document).on('click', "." + this.options.classes.nav + " a", function(e) {
      if (!that.options.hashchange) {
        e.preventDefault();
      }
      that.stop();
      if ($(this).hasClass('next')) {
        return that.animate('next');
      } else {
        return that.animate('prev');
      }
    }).on('click', "." + this.options.classes.pagination + " a", function(e) {
      var index;
      if (!that.options.hashchange) {
        e.preventDefault();
        index = parseHash(this.hash);
        return that.animate(index);
      }
    });
    return initialize();
  };

  $.fn[plugin] = function(option, args) {
    var result;
    result = [];
    this.each(function() {
      var $this, data, options;
      $this = $(this);
      data = $this.data(plugin);
      options = typeof option === 'object' && option;
      if (!data) {
        result = $this.data(plugin, (data = new Superslides(this, options)));
      }
      if (typeof option === "string") {
        result = data[option];
        if (typeof result === 'function') {
          return result = result.call(this, args);
        }
      }
    });
    return result;
  };

}).call(this);
