/*! bigSlide - v0.6.0 - 2015-02-11
* http://ascott1.github.io/bigSlide.js/
* Copyright (c) 2015 Adam D. Scott; Licensed MIT */
(function($) {
  'use strict';

  $.fn.bigSlide = function(options) {
    // store the menuLink in a way that is globally accessible
    var menuLink = this;

    // plugin settings
    var settings = $.extend({
      'menu': ('#menu'),
      'push': ('.push'),
      'side': 'left',
      'menuWidth': '15.625em',
      'speed': '300',
      'state': 'closed'
    }, options);

    // store the menu's state in the model
    var model = {
      'state': settings.state
    };

    // talk back and forth between the view and state
    var controller = {
      init: function(){
        view.init();
      },
      // update the menu's state
      changeState: function(){
        //model.state === 'closed' ? model.state = 'open' : model.state = 'closed';
        if (model.state === 'closed') {
          model.state = 'open'
        } else {
          model.state = 'closed'
        }
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
        this.width = settings.menuWidth;

        // CSS for how the menu will be positioned off screen
        var positionOffScreen = {
          'position': 'fixed',
          'top': '0',
          'bottom': '0',
          'settings.side': '-' + settings.menuWidth,
          'width': settings.menuWidth,
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

        // add the css values to the menu and 'push' class
        this.$menu.css(positionOffScreen);
        this.$push.css(settings.side, '0');
        this.$menu.css(animateSlide);
        this.$push.css(animateSlide);

        // register a click listener for desktop & touchstart for mobile
        menuLink.on('click.bigSlide touchstart.bigSlide', function(e) {
          e.preventDefault();
          if (controller.getState() === 'open') {
            view.toggleClose();
          } else {
            view.toggleOpen();
          }
        });
      },

      // toggle the menu open
      toggleOpen: function() {
        controller.changeState();
        this.$menu.css(settings.side, '0');
        this.$push.css(settings.side, this.width);
        //menuLink.addClass(settings.activeBtn);
      },

      // toggle the menu closed
      toggleClose: function() {
        controller.changeState();
        this.$menu.css(settings.side, '-' + this.width);
        this.$push.css(settings.side, '0');
        //menuLink.removeClass(settings.activeBtn);
      }

    }

    controller.init();

  };

}(jQuery));
