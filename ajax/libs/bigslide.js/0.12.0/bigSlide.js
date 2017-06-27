/*! bigSlide - v0.12.0 - 2016-08-01
* http://ascott1.github.io/bigSlide.js/
* Copyright (c) 2016 Adam D. Scott; Licensed MIT */
(function (factory) {
  'use strict';
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(['jquery'], factory);
  } else if (typeof exports === 'object') {
    // Node/CommonJS
    module.exports = factory(require('jquery'));
  } else {
    // Browser globals
    factory(jQuery);
  }
}(function($) {
  'use strict';

  // where inlineCSS is the string value of an element's style attribute
  // and toRemove is a string of space-separated CSS properties,
  // _cleanInlineCSS removes the CSS declaration for each property in toRemove from inlineCSS
  // and returns the resulting string
  function _cleanInlineCSS(inlineCSS, toRemove){
    var inlineCSSArray  = inlineCSS.split(';');
    var toRemoveArray   = toRemove.split(' ');

    var cleaned         = '';
    var keep;

    for (var i = 0, j = inlineCSSArray.length; i < j; i++) {
      keep = true;
      for (var a = 0, b = toRemoveArray.length; a < b; a++) {
        if (inlineCSSArray[i] === '' || inlineCSSArray[i].indexOf(toRemoveArray[a]) !== -1) {
          keep = false;
        }
      }
      if(keep) {cleaned += inlineCSSArray[i] + '; ';}
    }

    return cleaned;
  }


  $.fn.bigSlide = function(options) {
    // store the menuLink in a way that is globally accessible
    var menuLink = this;

    // plugin settings
    var settings = $.extend({
      'menu': ('#menu'),
      'push': ('.push'),
      'shrink': ('.shrink'),
      'hiddenThin': ('.hiddenThin'),
      'side': 'left',
      'menuWidth': '15.625em',
      'semiOpenMenuWidth': '4em',
      'speed': '300',
      'state': 'closed',
      'activeBtn': 'active',
      'easyClose': false,
      'saveState': false,
      'semiOpenStatus': false,
      'semiOpenScreenWidth': 480,
      'beforeOpen': function () {},
      'afterOpen': function() {},
      'beforeClose': function() {},
      'afterClose': function() {}
    }, options);

    // CSS properties set by bigSlide.js on all implicated DOM elements
    var baseCSSDictionary = 'transition -o-transition -ms-transition -moz-transitions webkit-transition ' + settings.side;

    var model = {
      //CSS properties set by bigSlide.js on this.$menu
      menuCSSDictionary: baseCSSDictionary + ' position top bottom height width',
      //CSS properties set by bigSlide.js on this.$push
      pushCSSDictionary: baseCSSDictionary,
      // store the menu's state in the model
      'state': settings.state
    };

    // talk back and forth between the view and state
    var controller = {
      init: function(){
        view.init();
      },

      // remove bigSlide behavior from the menu
      _destroy: function(){
        view._destroy();

        delete menuLink.bigSlideAPI;

        // return a reference to the DOM selection bigSlide.js was called on
        // so that the destroy method is chainable
        return menuLink;
      },

      // update the menu's state
      changeState: function(){
        if (model.state === 'closed') {
          model.state = 'open'
        } else {
          model.state = 'closed'
        }
      },

      // set the menu's state
      setState: function(state){
        model.state = state;
      },

      // check the menu's state
      getState: function(){
        return model.state;
      }
    };

    // the view contains all of the visual interactions
    var view = {
      init: function(){
        // cache DOM values
        this.$menu = $(settings.menu);
        this.$push = $(settings.push);
        this.$shrink = $(settings.shrink);
        this.$hiddenThin = $(settings.hiddenThin);
        this.width = settings.menuWidth;
        this.semiOpenMenuWidth = settings.semiOpenMenuWidth;

        // CSS for how the menu will be positioned off screen
        var positionOffScreen = {
          'position': 'fixed',
          'top': '0',
          'bottom': '0',
          'height': '100%'
        };

        // css for the sliding animation
        var animateSlide = {
          '-webkit-transition': settings.side + ' ' + settings.speed + 'ms ease',
          '-moz-transition': settings.side + ' ' + settings.speed + 'ms ease',
          '-ms-transition': settings.side + ' ' + settings.speed + 'ms ease',
          '-o-transition': settings.side + ' ' + settings.speed + 'ms ease',
          'transition': settings.side + ' ' + settings.speed + 'ms ease'
        };

        // css for the shrink animation
        var animateShrink = {
          '-webkit-transition': 'all ' + settings.speed + 'ms ease',
          '-moz-transition': 'all ' + settings.speed + 'ms ease',
          '-ms-transition': 'all ' + settings.speed + 'ms ease',
          '-o-transition': 'all ' + settings.speed + 'ms ease',
          'transition': 'all ' + settings.speed + 'ms ease'
        };

        // we want to add the css sliding animation when the page is loaded (on the first menu link click)
        var animationApplied = false;

        // manually add the settings values
        positionOffScreen[settings.side] = '-' + settings.menuWidth;
        positionOffScreen.width = settings.menuWidth;

        // get the initial state based on the last saved state or on the state option
        var initialState = 'closed';
        if (settings.saveState) {
          initialState = localStorage.getItem('bigSlide-savedState');
          if (!initialState) initialState = settings.state;
        } else {
          initialState = settings.state;
        }

        // set the initial state on the controller
        controller.setState(initialState);

        // add the css values to position things offscreen or inscreen depending on the initial state value
        this.$menu.css(positionOffScreen);

        var initialScreenWidth = $(window).width();
        if (initialState === 'closed') {
          if (settings.semiOpenStatus && initialScreenWidth > settings.semiOpenScreenWidth) {
            this.$hiddenThin.hide();
            this.$menu.css(settings.side, '0');
            this.$menu.css('width', this.semiOpenMenuWidth);
            this.$push.css(settings.side, this.semiOpenMenuWidth);
            this.$shrink.css({
              'width': 'calc(100% - ' + this.semiOpenMenuWidth + ')'
            });
            this.$menu.addClass('semiOpen');
          } else {
            this.$push.css(settings.side, '0');
          }
        } else if (initialState === 'open') {
          this.$menu.css(settings.side, '0');
          this.$push.css(settings.side, this.width);
          this.$shrink.css({
            'width': 'calc(100% - ' + this.width + ')'
          });
          menuLink.addClass(settings.activeBtn);
        }

        var that = this;

        // register a click listener for desktop & touchstart for mobile
        menuLink.on('click.bigSlide touchstart.bigSlide', function(e) {
          // add the animation css if not present
          if (!animationApplied) {
            that.$menu.css(animateSlide);
            that.$push.css(animateSlide);
            that.$shrink.css(animateShrink);
            animationApplied = true;
          }

          e.preventDefault();
          if (controller.getState() === 'open') {
            view.toggleClose();
          } else {
            view.toggleOpen();
          }
        });

        // register a window resize listener for tracking the semi open status states
        // This could be more efficently or even there are people that could consider it unnecessary. We can think about it
        if (settings.semiOpenStatus) {
            $(window).resize(function() {
                var screenWidth = $(window).width();
                if (screenWidth > settings.semiOpenScreenWidth) {
                    if (controller.getState() === 'closed') {
                        that.$hiddenThin.hide();
                        that.$menu.css({ width: that.semiOpenMenuWidth});
                        that.$menu.css(settings.side, '0');
                        that.$push.css(settings.side, that.semiOpenMenuWidth);
                        that.$shrink.css({
                          'width': 'calc(100% - ' + that.semiOpenMenuWidth + ')'
                        });
                        that.$menu.addClass('semiOpen');
                    }
                } else {
                    that.$menu.removeClass('semiOpen');
                    if (controller.getState() === 'closed') {
                        that.$menu.css(settings.side, '-' + that.width).css({width: that.width});
                        that.$push.css(settings.side, '0');
                        that.$shrink.css('width', '100%');
                        that.$hiddenThin.show();
                    }
                }
            });
        }

        // this makes my eyes bleed, but adding it back in as it's a highly requested feature
        if (settings.easyClose) {
          $(document).on('click.bigSlide', function(e) {
           if (!$(e.target).parents().addBack().is(menuLink) && !$(e.target).closest(settings.menu).length && controller.getState() === 'open')  {
             view.toggleClose();
           }
          });
        }
      },

      _destroy: function(){
        //remove inline styles generated by bigSlide.js while preserving any other inline styles
        this.$menu.each(function(){
          var $this = $(this);
          $this.attr( 'style', _cleanInlineCSS($this.attr('style'), model.menuCSSDictionary).trim() );
        });

        this.$push.each(function(){
          var $this = $(this);
          $this.attr( 'style', _cleanInlineCSS($this.attr('style'), model.pushCSSDictionary).trim() );
        });

        this.$shrink.each(function(){
          var $this = $(this);
          $this.attr( 'style', _cleanInlineCSS($this.attr('style'), model.pushCSSDictionary).trim() );
        });

        //remove active class and unbind bigSlide event handlers
        menuLink
          .removeClass(settings.activeBtn)
          .off('click.bigSlide touchstart.bigSlide');

        //release DOM references to avoid memory leaks
        this.$menu = null;
        this.$push = null;
        this.$shrink = null;

        //remove the local storage state
        localStorage.removeItem('bigSlide-savedState');
      },

      // toggle the menu open
      toggleOpen: function() {
        settings.beforeOpen();
        controller.changeState();
        view.applyOpenStyles();
        menuLink.addClass(settings.activeBtn);
        settings.afterOpen();

        // save the state
        if (settings.saveState) {
          localStorage.setItem('bigSlide-savedState', 'open');
        }
      },

      // toggle the menu closed
      toggleClose: function() {
        settings.beforeClose();
        controller.changeState();
        view.applyClosedStyles();
        menuLink.removeClass(settings.activeBtn);
        settings.afterClose();

        // save the state
        if (settings.saveState) {
          localStorage.setItem('bigSlide-savedState', 'closed');
        }
      },

      applyOpenStyles: function() {
        var screenWidth = $(window).width();
        if (settings.semiOpenStatus && screenWidth > settings.semiOpenScreenWidth) {
          this.$hiddenThin.show();
          this.$menu.animate({ width: this.width}, {duration: Math.abs(settings.speed - 100), easing: 'linear'});
          this.$push.css(settings.side, this.width);
          this.$shrink.css({
            'width': 'calc(100% - ' + this.width + ')'
          });
          this.$menu.removeClass('semiOpen');
        } else {
          this.$menu.css(settings.side, '0');
          this.$push.css(settings.side, this.width);
          this.$shrink.css({
            'width': 'calc(100% - ' + this.width + ')'
          });
        }
      },

      applyClosedStyles: function() {
        var screenWidth = $(window).width();
        if (settings.semiOpenStatus && screenWidth > settings.semiOpenScreenWidth) {
          this.$hiddenThin.hide();
          this.$menu.animate({ width: this.semiOpenMenuWidth}, {duration: Math.abs(settings.speed - 100), easing: 'linear'});
          this.$push.css(settings.side, this.semiOpenMenuWidth);
          this.$shrink.css({
            'width': 'calc(100% - ' + this.semiOpenMenuWidth + ')'
          });
          this.$menu.addClass('semiOpen');
        } else {
          this.$menu.css(settings.side, '-' + this.width);
          this.$push.css(settings.side, '0');
          this.$shrink.css('width', '100%');
        }
      }

    }

    controller.init();

    this.bigSlideAPI = {
      settings: settings,
      model: model,
      controller: controller,
      view: view,
      destroy: controller._destroy
    };

    return this;
  };

}));
