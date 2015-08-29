/*!
 * animsition v3.6.0
 * A simple and easy jQuery plugin for CSS animated page transitions.
 * http://blivesta.github.io/animsition
 * License : MIT
 * Author : blivesta (http://blivesta.com/)
 */
;(function (factory) {
  'use strict';
  if (typeof define === 'function' && define.amd) {
    define(['jquery'], factory);
  } else if (typeof exports === 'object') {
    module.exports = factory(require('jquery'));
  } else {
    factory(jQuery);
  }
}(function ($) {
  'use strict';
  var namespace = 'animsition';
  var methods = {
    init: function(options){
      options = $.extend({
        inClass               :   'fade-in',
        outClass              :   'fade-out',
        inDuration            :    1500,
        outDuration           :    800,
        linkElement           :   '.animsition-link',
        // e.g. linkElement   :   'a:not([target="_blank"]):not([href^=#])'
        loading               :    true,
        loadingParentElement  :   'body', //animsition wrapper element
        loadingClass          :   'animsition-loading',
        unSupportCss          : [ 'animation-duration',
                                  '-webkit-animation-duration',
                                  '-o-animation-duration'],
        overlay               :   false,
        overlayClass          :   'animsition-overlay-slide',
        overlayParentElement  :   'body'
      }, options);

      // Remove the "Animsition" in a browser
      // that does not support the "animaition-duration".
      var support = methods.supportCheck.call(this, options);

      if(!support && options.unSupportCss.length > 0){
        if(!support || !this.length){
          // If do not have a console object to object window
          if (!('console' in window)) {
            window.console = {};
            window.console.log = function(str){ return str; };
          }
          if(!this.length){
            console.log('Animsition: Element does not exist on page.');
          }
          if(!support){
            console.log('Animsition: Does not support this browser.');
          }
          return methods.destroy.call(this);
        }
      }

      var overlayMode = methods.optionCheck.call(this, options);
      if(overlayMode) {
        methods.addOverlay.call(this, options);
      }

      if(options.loading) {
        methods.addLoading.call(this, options);
      }

      return this.each(function(){
        var _this = this;
        var $this = $(this);
        var $window = $(window);
        var data = $this.data(namespace);

        if (!data) {
          options = $.extend({}, options);

          $this.data(namespace, {
            options: options
          });

          $window.on('load.' + namespace + ' pageshow.' + namespace, function() {
            methods.pageIn.call( _this );
          });

          // Firefox back button issue #4
          $window.on('unload.' + namespace, function() { });

          $(options.linkElement).on('click.' + namespace, function(event) {
            event.preventDefault();
            var $self = $(this);
            var url = $self.attr('href');

            // middle mouse button issue #24
            // if(middle mouse button || command key || shift key || win control key)
            if (event.which === 2 || event.metaKey || event.shiftKey || navigator.platform.toUpperCase().indexOf('WIN') !== -1 && event.ctrlKey) {
              window.open(url, '_blank');
            } else {
              methods.pageOut.call(_this,$self,url);
            }

          });
        }
      }); // end each
    },

    addOverlay: function(options){
      $(options.overlayParentElement).prepend('<div class="'+options.overlayClass+'"></div>');
    },

    addLoading: function(options){
      $(options.loadingParentElement).append('<div class="'+options.loadingClass+'"></div>');
    },

    removeLoading: function(){
      var $this     = $(this);
      var options   = $this.data(namespace).options;
      var $loading  = $(options.loadingParentElement).children('.' + options.loadingClass);
      $loading.fadeOut().remove();
    },

    supportCheck: function(options){
      var $this = $(this);
      var props = options.unSupportCss;
      var propsNum = props.length;
      var support  = false;

      if (propsNum === 0) {
        support = true;
      }
      for (var i = 0; i < propsNum; i++) {
        if (typeof $this.css(props[i]) === 'string') {
          support = true;
          break;
        }
      }
      return support;
    },

    optionCheck: function(options){
      var $this = $(this);
      var overlayMode;
      if(options.overlay || $this.data('animsition-overlay')){
        overlayMode = true;
      } else {
        overlayMode = false;
      }
      return overlayMode;
    },

    animationCheck : function(data, stateClass, stateIn){
      var $this = $(this);
      var options = $this.data(namespace).options;
      var dataType = typeof data;
      var dataDuration = !stateClass && dataType === 'number';
      var dataClass = stateClass && dataType === 'string' && data.length > 0;

      if(dataDuration || dataClass){
        data = data;
      } else if(stateClass && stateIn) {
        data = options.inClass;
      } else if(!stateClass && stateIn) {
        data = options.inDuration;
      } else if(stateClass && !stateIn) {
        data = options.outClass;
      } else if(!stateClass && !stateIn) {
        data = options.outDuration;
      }
      return data;
    },

    pageIn: function(){
      var _this = this;
      var $this = $(this);
      var options = $this.data(namespace).options;
      var thisInDuration = $this.data('animsition-in-duration');
      var thisInClass = $this.data('animsition-in');
      var inDuration = methods.animationCheck.call(_this,thisInDuration,false,true);
      var inClass = methods.animationCheck.call(_this,thisInClass,true,true);
      var overlayMode = methods.optionCheck.call(_this, options);

      if(options.loading) {
        methods.removeLoading.call(_this);
      }

      if(overlayMode) {
        methods.pageInOverlay.call(_this,inClass,inDuration);
      } else {
        methods.pageInBasic.call(_this,inClass,inDuration);
      }
    },

    pageInBasic: function(inClass,inDuration){
      var $this = $(this);

      $this
        .trigger('animsition.start')
        .css({ 'animation-duration' : (inDuration / 1000) + 's' })
        .addClass(inClass)
        .animateCallback(function(){
          $this
            .removeClass(inClass)
            .css({ 'opacity' : 1 })
            .trigger('animsition.end');
        });
    },

    pageInOverlay: function(inClass,inDuration){
      var $this = $(this);
      var options = $this.data(namespace).options;

      $this
        .trigger('animsition.start')
        .css({ 'opacity' : 1 });

      $(options.overlayParentElement)
        .children('.' + options.overlayClass)
        .css({ 'animation-duration' : (inDuration / 1000) + 's' })
        .addClass(inClass)
        .animateCallback(function(){
          $this.trigger('animsition.end');
        });
    },

    pageOut: function($self,url){
      var _this = this;
      var $this = $(this);
      var options = $this.data(namespace).options;
      var selfOutClass = $self.data('animsition-out');
      var thisOutClass = $this.data('animsition-out');
      var selfOutDuration = $self.data('animsition-out-duration');
      var thisOutDuration = $this.data('animsition-out-duration');
      var isOutClass = selfOutClass ? selfOutClass : thisOutClass;
      var isOutDuration = selfOutDuration ? selfOutDuration : thisOutDuration;
      var outClass = methods.animationCheck.call(_this,isOutClass,true,false);
      var outDuration = methods.animationCheck.call(_this, isOutDuration,false,false);
      var overlayMode = methods.optionCheck.call(_this, options);

      if(overlayMode) {
        methods.pageOutOverlay.call(_this,outClass,outDuration,url);
      } else {
        methods.pageOutBasic.call(_this,outClass,outDuration,url);
      }
    },

    pageOutBasic: function(outClass,outDuration,url){
      var $this = $(this);

      $this
        .css({ 'animation-duration' : (outDuration / 1000) + 's' })
        .addClass(outClass)
        .animateCallback(function(){
          location.href = url;
        });
    },

    pageOutOverlay: function(outClass,outDuration,url){
      var _this = this;
      var $this = $(this);
      var options = $this.data(namespace).options;
      var thisInClass = $this.data('animsition-in');
      var inClass = methods.animationCheck.call(_this,thisInClass,true,true);

      $(options.overlayParentElement).children('.' + options.overlayClass)
        .css({ 'animation-duration' : (outDuration / 1000) + 's' })
        .removeClass(inClass)
        .addClass(outClass)
        .animateCallback(function(){
          location.href = url;
        });
    },

    destroy: function(){
      return this.each(function(){
        var $this = $(this);
        $(window).unbind('.'+namespace);
        $this
          .css({'opacity':1})
          .removeData(namespace);
      });
    }

  };

  $.fn.animateCallback = function(callback){
    var end = 'animationend webkitAnimationEnd mozAnimationEnd oAnimationEnd MSAnimationEnd';
    return this.each(function() {
      $(this).bind(end, function(){
        $(this).unbind(end);
        return callback.call(this);
      });
    });
  };

  $.fn.animsition = function(method){
    if ( methods[method] ) {
      return methods[method].apply( this, Array.prototype.slice.call( arguments, 1 ));
    } else if ( typeof method === 'object' || ! method ) {
      return methods.init.apply( this, arguments );
    } else {
      $.error( 'Method ' +  method + ' does not exist on jQuery.'+namespace);
    }
  };

}));
