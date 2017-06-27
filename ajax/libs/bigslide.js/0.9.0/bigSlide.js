/*! bigSlide - v0.9.0 - 2015-06-17
* http://ascott1.github.io/bigSlide.js/
* Copyright (c) 2015 Adam D. Scott; Licensed MIT */
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
      'side': 'left',
      'menuWidth': '15.625em',
      'speed': '300',
      'state': 'closed',
      'activeBtn': 'active',
      'easyClose': false,
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
      destroy: function(){
        view.destroy();

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
          'height': '100%'
        };

        // manually add the settings values
        positionOffScreen[settings.side] = '-' + settings.menuWidth;
        positionOffScreen.width = settings.menuWidth;

        // add the css values to position things offscreen
        if (settings.state === 'closed') {
          this.$menu.css(positionOffScreen);
          this.$push.css(settings.side, '0');
        }

        // css for the sliding animation
        var animateSlide = {
          '-webkit-transition': settings.side + ' ' + settings.speed + 'ms ease',
          '-moz-transition': settings.side + ' ' + settings.speed + 'ms ease',
          '-ms-transition': settings.side + ' ' + settings.speed + 'ms ease',
          '-o-transition': settings.side + ' ' + settings.speed + 'ms ease',
          'transition': settings.side + ' ' + settings.speed + 'ms ease'
        };

        // add the animation css
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

        // this makes my eyes bleed, but adding it back in as it's a highly requested feature
        if (settings.easyClose) {
          $('body').on('click.bigSlide', function(e) {
           if (!$(e.target).parents().andSelf().is(menuLink) && controller.getState() === 'open')  {
             view.toggleClose();
           }
          });
        }
      },
      
      destroy: function(){
        //remove inline styles generated by bigSlide.js while preserving any other inline styles
        this.$menu.each(function(){
          var $this = $(this);
          $this.attr( 'style', _cleanInlineCSS($this.attr('style'), model.menuCSSDictionary).trim() );
        });

        this.$push.each(function(){
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
      },
      
      // toggle the menu open
      toggleOpen: function() {
        settings.beforeOpen();
        controller.changeState();
        this.$menu.css(settings.side, '0');
        this.$push.css(settings.side, this.width);
        menuLink.addClass(settings.activeBtn);
        settings.afterOpen();
      },

      // toggle the menu closed
      toggleClose: function() {
        settings.beforeClose();
        controller.changeState();
        this.$menu.css(settings.side, '-' + this.width);
        this.$push.css(settings.side, '0');
        menuLink.removeClass(settings.activeBtn);
        settings.afterClose();
      }

    }

    controller.init();

    this.bigSlideAPI = {
      settings: settings,
      model: model,
      controller: controller,
      view: view
    };

    return this;
  };

}));
