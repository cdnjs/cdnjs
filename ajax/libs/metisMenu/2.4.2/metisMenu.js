/*
 * metismenu - v2.4.2
 * A jQuery menu plugin
 * https://github.com/onokumus/metisMenu#readme
 *
 * Made by Osman Nuri Okumuş <onokumus@gmail.com> (https://github.com/onokumus)
 * Under MIT License
 */

(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['jquery'], factory);
  } else if (typeof exports === 'object') {
    module.exports = factory(require('jquery'));
  } else {
    root.sortable = factory(root.jQuery);
  }
}(this, function($) {
  'use strict';

  function transitionEnd() {
    var el = document.createElement('mm');

    var transEndEventNames = {
      WebkitTransition: 'webkitTransitionEnd',
      MozTransition: 'transitionend',
      OTransition: 'oTransitionEnd otransitionend',
      transition: 'transitionend'
    };

    for (var name in transEndEventNames) {
      if (el.style[name] !== undefined) {
        return {
          end: transEndEventNames[name]
        };
      }
    }
    return false;
  }

  $.fn.emulateTransitionEnd = function(duration) {
    var called = false;
    var $el = this;
    $(this).one('mmTransitionEnd', function() {
      called = true;
    });
    var callback = function() {
      if (!called) {
        $($el).trigger($transition.end);
      }
    };
    setTimeout(callback, duration);
    return this;
  };

  var $transition = transitionEnd();
  if (!!$transition) {
    $.event.special.mmTransitionEnd = {
      bindType: $transition.end,
      delegateType: $transition.end,
      handle: function(e) {
        if ($(e.target).is(this)) {
          return e.
          handleObj.
          handler.
          apply(this, arguments);
        }
      }
    };
  }

  var MetisMenu = function(element, options) {
    this.$element = $(element);
    this.options = $.extend({}, MetisMenu.DEFAULTS, options);
    this.transitioning = null;

    this.init();
  };

  MetisMenu.TRANSITION_DURATION = 350;

  MetisMenu.DEFAULTS = {
    toggle: true,
    doubleTapToGo: false,
    preventDefault: true,
    activeClass: 'active',
    collapseClass: 'collapse',
    collapseInClass: 'in',
    collapsingClass: 'collapsing',
    onTransitionStart: false,
    onTransitionEnd: false
  };

  MetisMenu.prototype.init = function() {
    var $this = this;
    var activeClass = this.options.activeClass;
    var collapseClass = this.options.collapseClass;
    var collapseInClass = this.options.collapseInClass;

    this
      .$element
      .find('li.' + activeClass)
      .has('ul')
      .children('ul')
      .attr('aria-expanded', true)
      .addClass(collapseClass + ' ' + collapseInClass);

    this
      .$element
      .find('li')
      .not('.' + activeClass)
      .has('ul')
      .children('ul')
      .attr('aria-expanded', false)
      .addClass(collapseClass);

    //add the 'doubleTapToGo' class to active items if needed
    if (this.options.doubleTapToGo) {
      this
        .$element
        .find('li.' + activeClass)
        .has('ul')
        .children('a')
        .addClass('doubleTapToGo');
    }

    this
      .$element
      .find('li')
      .has('ul')
      .children('a')
      .on('click.metisMenu', function(e) {
        var self = $(this);
        var $parent = self.parent('li');
        var $list = $parent.children('ul');
        if($this.options.preventDefault){
          e.preventDefault();
        }
        if(self.attr('aria-disabled') === 'true'){
            return;
        }
        if ($parent.hasClass(activeClass) && !$this.options.doubleTapToGo) {
          $this.hide($list);
          self.attr('aria-expanded',false);
        } else {
          $this.show($list);
          self.attr('aria-expanded',true);
        }

        if($this.options.onTransitionStart) {
          $this.options.onTransitionStart();
        }

        //Do we need to enable the double tap
        if ($this.options.doubleTapToGo) {
          //if we hit a second time on the link and the href is valid, navigate to that url
          if ($this.doubleTapToGo(self) && self.attr('href') !== '#' && self.attr('href') !== '') {
            e.stopPropagation();
            document.location = self.attr('href');
            return;
          }
        }
      });
  };

  MetisMenu.prototype.doubleTapToGo = function(elem) {
    var $this = this.$element;
    //if the class 'doubleTapToGo' exists, remove it and return
    if (elem.hasClass('doubleTapToGo')) {
      elem.removeClass('doubleTapToGo');
      return true;
    }
    //does not exists, add a new class and return false
    if (elem.parent().children('ul').length) {
      //first remove all other class
      $this
        .find('.doubleTapToGo')
        .removeClass('doubleTapToGo');
      //add the class on the current element
      elem.addClass('doubleTapToGo');
      return false;
    }
  };

  MetisMenu.prototype.show = function(el) {
    var activeClass = this.options.activeClass;
    var collapseClass = this.options.collapseClass;
    var collapseInClass = this.options.collapseInClass;
    var collapsingClass = this.options.collapsingClass;
    var $this = $(el);
    var $parent = $this.parent('li');
    if (this.transitioning || $this.hasClass(collapseInClass)) {
      return;
    }

    $parent.addClass(activeClass);

    if (this.options.toggle) {
      this.hide($parent.siblings().children('ul.' + collapseInClass).attr('aria-expanded', false));
    }

    $this
      .removeClass(collapseClass)
      .addClass(collapsingClass)
      .height(0);

    this.transitioning = 1;
    var complete = function() {
      if(this.transitioning && this.options.onTransitionEnd) {
        this.options.onTransitionEnd();
      }
      $this
        .removeClass(collapsingClass)
        .addClass(collapseClass + ' ' + collapseInClass)
        .height('')
        .attr('aria-expanded', true);
      this.transitioning = 0;
    };
    if (!$transition) {
      return complete.call(this);
    }
    $this
      .one('mmTransitionEnd', $.proxy(complete, this))
      .emulateTransitionEnd(MetisMenu.TRANSITION_DURATION)
      .height($this[0].scrollHeight);
  };

  MetisMenu.prototype.hide = function(el) {
    var activeClass = this.options.activeClass;
    var collapseClass = this.options.collapseClass;
    var collapseInClass = this.options.collapseInClass;
    var collapsingClass = this.options.collapsingClass;
    var $this = $(el);

    if (this.transitioning || !$this.hasClass(collapseInClass)) {
      return;
    }

    $this.parent('li').removeClass(activeClass);
    $this.height($this.height())[0].offsetHeight;

    $this
      .addClass(collapsingClass)
      .removeClass(collapseClass)
      .removeClass(collapseInClass);

    this.transitioning = 1;

    var complete = function() {
      if(this.transitioning && this.options.onTransitionEnd) {
        this.options.onTransitionEnd();
      }
      this.transitioning = 0;
      $this
        .removeClass(collapsingClass)
        .addClass(collapseClass)
        .attr('aria-expanded', false);
    };

    if (!$transition) {
      return complete.call(this);
    }
    $this
      .height(0)
      .one('mmTransitionEnd', $.proxy(complete, this))
      .emulateTransitionEnd(MetisMenu.TRANSITION_DURATION);
  };

  function Plugin(option) {
    return this.each(function() {
      var $this = $(this);
      var data = $this.data('mm');
      var options = $.extend({},
        MetisMenu.DEFAULTS,
        $this.data(),
        typeof option === 'object' && option
      );

      if (!data) {
        $this.data('mm', (data = new MetisMenu(this, options)));
      }
      if (typeof option === 'string') {
        data[option]();
      }
    });
  }

  var old = $.fn.metisMenu;

  $.fn.metisMenu = Plugin;
  $.fn.metisMenu.Constructor = MetisMenu;

  $.fn.metisMenu.noConflict = function() {
    $.fn.metisMenu = old;
    return this;
  };
}));
