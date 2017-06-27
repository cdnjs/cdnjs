/*!
 * Midnight.js 1.1.1
 * jQuery plugin to switch between multiple fixed header designs on the fly, so it looks in line with the content below it.
 * http://aerolab.github.io/midnight.js/
 *
 * Copyright (c) 2014 Aerolab <info@aerolab.co>
 *
 * Released under the MIT license
 * http://aerolab.github.io/midnight.js/LICENSE.txt
 */
 // jQuery Widget
(function(e){"function"==typeof define&&define.amd?define(["jquery"],e):e(jQuery)})(function(e){var t=0,i=Array.prototype.slice;e.cleanData=function(t){return function(i){var s,n,a;for(a=0;null!=(n=i[a]);a++)try{s=e._data(n,"events"),s&&s.remove&&e(n).triggerHandler("remove")}catch(o){}t(i)}}(e.cleanData),e.widget=function(t,i,s){var n,a,o,r,h={},l=t.split(".")[0];return t=t.split(".")[1],n=l+"-"+t,s||(s=i,i=e.Widget),e.expr[":"][n.toLowerCase()]=function(t){return!!e.data(t,n)},e[l]=e[l]||{},a=e[l][t],o=e[l][t]=function(e,t){return this._createWidget?(arguments.length&&this._createWidget(e,t),void 0):new o(e,t)},e.extend(o,a,{version:s.version,_proto:e.extend({},s),_childConstructors:[]}),r=new i,r.options=e.widget.extend({},r.options),e.each(s,function(t,s){return e.isFunction(s)?(h[t]=function(){var e=function(){return i.prototype[t].apply(this,arguments)},n=function(e){return i.prototype[t].apply(this,e)};return function(){var t,i=this._super,a=this._superApply;return this._super=e,this._superApply=n,t=s.apply(this,arguments),this._super=i,this._superApply=a,t}}(),void 0):(h[t]=s,void 0)}),o.prototype=e.widget.extend(r,{widgetEventPrefix:a?r.widgetEventPrefix||t:t},h,{constructor:o,namespace:l,widgetName:t,widgetFullName:n}),a?(e.each(a._childConstructors,function(t,i){var s=i.prototype;e.widget(s.namespace+"."+s.widgetName,o,i._proto)}),delete a._childConstructors):i._childConstructors.push(o),e.widget.bridge(t,o),o},e.widget.extend=function(t){for(var s,n,a=i.call(arguments,1),o=0,r=a.length;r>o;o++)for(s in a[o])n=a[o][s],a[o].hasOwnProperty(s)&&void 0!==n&&(t[s]=e.isPlainObject(n)?e.isPlainObject(t[s])?e.widget.extend({},t[s],n):e.widget.extend({},n):n);return t},e.widget.bridge=function(t,s){var n=s.prototype.widgetFullName||t;e.fn[t]=function(a){var o="string"==typeof a,r=i.call(arguments,1),h=this;return a=!o&&r.length?e.widget.extend.apply(null,[a].concat(r)):a,o?this.each(function(){var i,s=e.data(this,n);return"instance"===a?(h=s,!1):s?e.isFunction(s[a])&&"_"!==a.charAt(0)?(i=s[a].apply(s,r),i!==s&&void 0!==i?(h=i&&i.jquery?h.pushStack(i.get()):i,!1):void 0):e.error("no such method '"+a+"' for "+t+" widget instance"):e.error("cannot call methods on "+t+" prior to initialization; "+"attempted to call method '"+a+"'")}):this.each(function(){var t=e.data(this,n);t?(t.option(a||{}),t._init&&t._init()):e.data(this,n,new s(a,this))}),h}},e.Widget=function(){},e.Widget._childConstructors=[],e.Widget.prototype={widgetName:"widget",widgetEventPrefix:"",defaultElement:"<div>",options:{disabled:!1,create:null},_createWidget:function(i,s){s=e(s||this.defaultElement||this)[0],this.element=e(s),this.uuid=t++,this.eventNamespace="."+this.widgetName+this.uuid,this.bindings=e(),this.hoverable=e(),this.focusable=e(),s!==this&&(e.data(s,this.widgetFullName,this),this._on(!0,this.element,{remove:function(e){e.target===s&&this.destroy()}}),this.document=e(s.style?s.ownerDocument:s.document||s),this.window=e(this.document[0].defaultView||this.document[0].parentWindow)),this.options=e.widget.extend({},this.options,this._getCreateOptions(),i),this._create(),this._trigger("create",null,this._getCreateEventData()),this._init()},_getCreateOptions:e.noop,_getCreateEventData:e.noop,_create:e.noop,_init:e.noop,destroy:function(){this._destroy(),this.element.unbind(this.eventNamespace).removeData(this.widgetFullName).removeData(e.camelCase(this.widgetFullName)),this.widget().unbind(this.eventNamespace).removeAttr("aria-disabled").removeClass(this.widgetFullName+"-disabled "+"ui-state-disabled"),this.bindings.unbind(this.eventNamespace),this.hoverable.removeClass("ui-state-hover"),this.focusable.removeClass("ui-state-focus")},_destroy:e.noop,widget:function(){return this.element},option:function(t,i){var s,n,a,o=t;if(0===arguments.length)return e.widget.extend({},this.options);if("string"==typeof t)if(o={},s=t.split("."),t=s.shift(),s.length){for(n=o[t]=e.widget.extend({},this.options[t]),a=0;s.length-1>a;a++)n[s[a]]=n[s[a]]||{},n=n[s[a]];if(t=s.pop(),1===arguments.length)return void 0===n[t]?null:n[t];n[t]=i}else{if(1===arguments.length)return void 0===this.options[t]?null:this.options[t];o[t]=i}return this._setOptions(o),this},_setOptions:function(e){var t;for(t in e)this._setOption(t,e[t]);return this},_setOption:function(e,t){return this.options[e]=t,"disabled"===e&&(this.widget().toggleClass(this.widgetFullName+"-disabled",!!t),t&&(this.hoverable.removeClass("ui-state-hover"),this.focusable.removeClass("ui-state-focus"))),this},enable:function(){return this._setOptions({disabled:!1})},disable:function(){return this._setOptions({disabled:!0})},_on:function(t,i,s){var n,a=this;"boolean"!=typeof t&&(s=i,i=t,t=!1),s?(i=n=e(i),this.bindings=this.bindings.add(i)):(s=i,i=this.element,n=this.widget()),e.each(s,function(s,o){function r(){return t||a.options.disabled!==!0&&!e(this).hasClass("ui-state-disabled")?("string"==typeof o?a[o]:o).apply(a,arguments):void 0}"string"!=typeof o&&(r.guid=o.guid=o.guid||r.guid||e.guid++);var h=s.match(/^([\w:-]*)\s*(.*)$/),l=h[1]+a.eventNamespace,u=h[2];u?n.delegate(u,l,r):i.bind(l,r)})},_off:function(t,i){i=(i||"").split(" ").join(this.eventNamespace+" ")+this.eventNamespace,t.unbind(i).undelegate(i),this.bindings=e(this.bindings.not(t).get()),this.focusable=e(this.focusable.not(t).get()),this.hoverable=e(this.hoverable.not(t).get())},_delay:function(e,t){function i(){return("string"==typeof e?s[e]:e).apply(s,arguments)}var s=this;return setTimeout(i,t||0)},_hoverable:function(t){this.hoverable=this.hoverable.add(t),this._on(t,{mouseenter:function(t){e(t.currentTarget).addClass("ui-state-hover")},mouseleave:function(t){e(t.currentTarget).removeClass("ui-state-hover")}})},_focusable:function(t){this.focusable=this.focusable.add(t),this._on(t,{focusin:function(t){e(t.currentTarget).addClass("ui-state-focus")},focusout:function(t){e(t.currentTarget).removeClass("ui-state-focus")}})},_trigger:function(t,i,s){var n,a,o=this.options[t];if(s=s||{},i=e.Event(i),i.type=(t===this.widgetEventPrefix?t:this.widgetEventPrefix+t).toLowerCase(),i.target=this.element[0],a=i.originalEvent)for(n in a)n in i||(i[n]=a[n]);return this.element.trigger(i,s),!(e.isFunction(o)&&o.apply(this.element[0],[i].concat(s))===!1||i.isDefaultPrevented())}},e.each({show:"fadeIn",hide:"fadeOut"},function(t,i){e.Widget.prototype["_"+t]=function(s,n,a){"string"==typeof n&&(n={effect:n});var o,r=n?n===!0||"number"==typeof n?i:n.effect||i:t;n=n||{},"number"==typeof n&&(n={duration:n}),o=!e.isEmptyObject(n),n.complete=a,n.delay&&s.delay(n.delay),o&&e.effects&&e.effects.effect[r]?s[t](n):r!==t&&s[r]?s[r](n.duration,n.easing,a):s.queue(function(i){e(this)[t](),a&&a.call(s[0]),i()})}}),e.widget});

((function ( $ ) {

  "use strict";

  $.widget('aerolab.midnight', {

    options: {
      // The class that wraps each header. Used as a clipping mask.
      headerClass: 'midnightHeader',
      // The class that wraps the contents of each header. Also used as a clipping mask.
      innerClass: 'midnightInner',
      // The class used by the default header (useful when adding multiple headers with different markup).
      defaultClass: 'default',
      // Unused: Add a prefix to the header classes (so if you set the "thingy-" prefix, a section with data-midnight="butterfly" will use the "thingy-butterfly" header)
      classPrefix: ''
    },

    // Cache all the switchable headers (different colors)
    _headers: {},
    _headerInfo: {top:0, height:0},

    // Cache all the sections which cause the header to change colors
    _$sections: [],
    _sections: [],

    // Scroll Cache
    _scrollTop: 0,
    _documentHeight: 0,

    // Tools
    _transformMode: false,


    refresh: function() {

      this._headerInfo = {
        // Todo: Add support for top (though it's mostly unnecessary)
        top: 0,
        height: this.element.outerHeight()
      };

      // Sections that affect the color of the header (and cache)
      this._$sections = $('[data-midnight]');
      this._sections = [];

      this._setupHeaders();

      this.recalculate();

    },

    _create: function() {
      
      var context = this;
      this._scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      this._documentHeight = $(document).height();
      this._headers = {};

      this._transformMode = this._getSupportedTransform();

      // Calculate all sections and create the necessary headers
      this.refresh();


      // NANANANANANANANA GRASAAAAA
      // (This is the ghetto way of keeping the section values updated after any kind of reflow. The overhead is minimal)
      setInterval(function(){
        context._recalculateSections();
      }, 1000);


      // We need to recalculate all this._sections and headers
      context.recalculate();


      // and at every resize
      $(window).resize(function(){
        context.recalculate();
      });


      // Start the RequestAnimationFrame loop. This should be done just once.
      this._updateHeadersLoop();

    },


    recalculate: function() {
      this._recalculateSections();
      this._updateHeaderHeight();

      this._recalculateHeaders();
      this._updateHeaders();
    },


    /**
     * This is to offer the optimal transform format when updating the header
     */
    _getSupportedTransform: function() {
      var prefixes = ['transform','WebkitTransform','MozTransform','OTransform','msTransform'];
      for(var ix = 0; ix < prefixes.length; ix++) {
        if(document.createElement('div').style[prefixes[ix]] !== undefined) {
          return prefixes[ix];
        }
      }
      return false;
    },


    /**
     * Get the size of the header.
     */
    _getContainerHeight: function(){
      var $customHeaders = this.element.find('> .'+this.options['headerClass']);
      var maxHeight = 0;
      var height = 0;
      var context = this;

      if( $customHeaders.length ) {
        $customHeaders.each(function() {

          var $header = $(this);
          var $inner = $header.find('> .'+context.options['innerClass']);

          // Disable the fixed height and trigger a reflow to get the proper height
          // Get the inner height or just the height of the container
          if( $inner.length ) {
            // Overflow: Auto fixes an issue with Chrome 41, where outerHeight() no longer takes into account 
            // the margins of internal elements, creating a smaller container than necessary
            $inner.css('bottom', 'auto').css('overflow', 'auto');
            height = $inner.outerHeight();
            $inner.css('bottom', '0');
          } else {
            $header.css('bottom', 'auto');
            height = $header.outerHeight();
            $header.css('bottom', '0');
          }

          maxHeight = (height > maxHeight) ? height : maxHeight;
        });
      } else {
        maxHeight = height = this.element.outerHeight();
      }
      return maxHeight;
    },


    _setupHeaders: function(){

      // Get all the different header colors
      var context = this;
      this._headers[this.options['defaultClass']] = {};

      this._$sections.each(function(){
        var $section = $(this);
        var headerClass = $section.data('midnight');

        if( typeof headerClass !== 'string' ){ return; }

        headerClass = headerClass.trim();

        if( headerClass === '' ){ return; }

        context._headers[headerClass] = {};
      });


      // Get the padding of the original Header. It will be applied to the internal headers.
      // Todo: Implement this
      var defaultPaddings = {
        top: this.element.css("padding-top"),
        right: this.element.css("padding-right"),
        bottom: this.element.css("padding-bottom"),
        left: this.element.css("padding-left")
      };


      // Create the fake headers
      this.element
        .css({
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          overflow: 'hidden'
        });

      this._updateHeaderHeight();

      var $customHeaders = this.element.find('> .'+this.options['headerClass']);
      if( $customHeaders.length ) {
        if( ! $customHeaders.filter('.'+ this.options['defaultClass']).length ) {
          // If there's no default header, just pick the first one, duplicate it, and set the correct class
          $customHeaders.filter('.'+ this.options['headerClass'] +':first').clone(true, true).attr('class', this.options['headerClass'] +' '+ this.options['defaultClass']);
        }
      } else {
        // If there are no custom headers, just wrap the content and make that the default header

        this.element.wrapInner('<div class="'+ this.options['headerClass'] +' '+ this.options['defaultClass'] +'"></div>');
      }

      // Make a copy of the default header for use in the generic ones.
      var $customHeaders = this.element.find('> .'+ this.options['headerClass']);
      var $defaultHeader = $customHeaders.filter('.'+ this.options['defaultClass']).clone(true, true);



      for( var headerClass in this._headers ) {
        if( ! this._headers.hasOwnProperty(headerClass) ){ continue; }
        if( typeof this._headers[headerClass].element === 'undefined' ) {

          // Create the outer clipping mask
          // If there's some custom markup, use it, or else just clone the default header
          var $existingHeader = $customHeaders.filter('.'+headerClass);
          if( $existingHeader.length ) {
            this._headers[headerClass].element = $existingHeader;
          } else {
            this._headers[headerClass].element = $defaultHeader.clone(true, true).removeClass( this.options['defaultClass'] ).addClass(headerClass).appendTo( this.element );
          }

          var resetStyles = {
            position: 'absolute',
            overflow: 'hidden',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0
          };
          this._headers[headerClass].element.css(resetStyles);

          if( this._transformMode !== false ) {
            this._headers[headerClass].element.css(this._transformMode, 'translateZ(0)');
          }

          // Create the inner clipping mask
          if( ! this._headers[headerClass].element.find('> .'+ this.options['innerClass']).length ) {
            this._headers[headerClass].element.wrapInner('<div class="'+ this.options['innerClass'] +'"></div>');
          }
          this._headers[headerClass].inner = this._headers[headerClass].element.find('> .'+ this.options['innerClass'])
          this._headers[headerClass].inner.css(resetStyles);

          if( this._transformMode !== false ) {
            this._headers[headerClass].inner.css(this._transformMode, 'translateZ(0)');
          }

          // Set the default clipping variables
          this._headers[headerClass].from = '';
          this._headers[headerClass].progress = 0.0;
        }
      }


      // Headers that weren't initialized have to be hidden
      $customHeaders.each(function(){
        var $header = $(this);
        var hasAnyClass = false;
        for( var headerClass in context._headers ) {
          if( ! context._headers.hasOwnProperty(headerClass) ){ continue; }
          if( $header.hasClass(headerClass) ){ hasAnyClass = true; }
        }

        // Add the inner clipping mask just in case
        if( ! $header.find('> .'+ context.options['innerClass']).length ) {
          $header.wrapInner('<div class="'+ context.options['innerClass'] +'"></div>');
        }

        if( hasAnyClass ) {
          $header.show();
        } else {
          $header.hide(); 
        }
      });

    },


    /**
     * Recalculate which headers should be visible at this time based on the scroll position and the (cached) position of each section.
     * This doesn't update
     */
    _recalculateHeaders: function(){

      // Check classes are currently active in the header (including the current percentage of each)
      this._scrollTop = window.pageYOffset || document.body.scrollTop || document.documentElement.scrollTop;
      // Some browsers (e.g on OS X) allow scrolling past the top/bottom.
      this._scrollTop = Math.max(this._scrollTop, 0);
      this._scrollTop = Math.min(this._scrollTop, this._documentHeight);

      // Get the header's position relative to the document (given that it's fixed)
      var headerHeight = this._headerInfo.height;
      var headerStart = this._scrollTop + this._headerInfo.top;
      var headerEnd = headerStart + headerHeight;

      // Add support for transforms (for plugins like Headroom or general css stuff)
      if( typeof window.getComputedStyle === 'function' ) {
        var style = window.getComputedStyle(this.element[0], null);
        var top = 0.0;
        var transformY = 0.0;

        if( this._transformMode !== false && typeof style.transform === 'string' ) {
          // Convert the transform matrix to an array
          var transformArray = (style.transform).match(/(-?[0-9\.]+)/g);
          if( transformArray !== null &&  transformArray.length >= 6 && ! isNaN(parseFloat(transformArray[5])) ) {
            transformY = parseFloat(transformArray[5]);
          }
        }
        if( (style.top).indexOf('px') >= 0 && ! isNaN(parseFloat(style.top)) ) {
          top = parseFloat(style.top);
        }

        headerStart += top + transformY;
        headerEnd += top + transformY;
      }

      // Reset the header status
      for( var headerClass in this._headers ) {
        if( ! this._headers.hasOwnProperty(headerClass) ){ continue; }
        // from == '' signals that the section is inactive
        this._headers[ headerClass ].from = '';
        this._headers[ headerClass ].progress = 0.0;
      }

      // Set the header status
      for( var ix = 0; ix < this._sections.length; ix++ ) {

        // Todo: This isn't exactly the best code.

        // If there's some kind of overlap between the header and a section, that class becomes active
        if( headerEnd >= this._sections[ix].start && headerStart <= this._sections[ix].end ) {

          this._headers[ this._sections[ix].className ].visible = true;

          // If the header sits neatly within the section, this is the only active class
          if( headerStart >= this._sections[ix].start && headerEnd <= this._sections[ix].end ) {
            this._headers[ this._sections[ix].className ].from = 'top';
            this._headers[ this._sections[ix].className ].progress += 1.0;
          }
          // If the header is in the middle of the end of a section, it comes from the top
          else if( headerEnd > this._sections[ix].end && headerStart < this._sections[ix].end ) {
            this._headers[ this._sections[ix].className ].from = 'top';
            this._headers[ this._sections[ix].className ].progress = 1.0 - (headerEnd - this._sections[ix].end) / headerHeight;
          }
          // If the header is in the middle of the start of a section, it comes from the bottom
          else if( headerEnd > this._sections[ix].start && headerStart < this._sections[ix].start ) {
            // If the same color continues in the next section, just add the progress to it so we don't switch
            if( this._headers[ this._sections[ix].className ].from === 'top' ) {
              this._headers[ this._sections[ix].className ].progress += (headerEnd - this._sections[ix].start) / headerHeight;
            }
            else {
              this._headers[ this._sections[ix].className ].from = 'bottom';
              this._headers[ this._sections[ix].className ].progress = (headerEnd - this._sections[ix].start) / headerHeight;
            }
          }

        }

      }

    },


    /**
     * Update the headers based on the position of each section
     */
    _updateHeaders: function(){

      // Don't do anything if there are no headers
      if( typeof this._headers[ this.options['defaultClass'] ] === 'undefined' ){ return; }

      // Do some preprocessing to ensure a header is always shown (even if some this._sections haven't been assigned)
      var totalProgress = 0.0;
      var lastActiveClass = '';
      for( var headerClass in this._headers ) {
        if( ! this._headers.hasOwnProperty(headerClass) ){ continue; }
        if( ! this._headers[headerClass].from === '' ){ continue; }
        totalProgress += this._headers[headerClass].progress;
        lastActiveClass = headerClass;
      }

      if( totalProgress < 1.0 ) {
        // Complete the header at the bottom with the default class
        if( this._headers[ this.options['defaultClass'] ].from === '' ) {
          this._headers[ this.options['defaultClass'] ].from = ( this._headers[lastActiveClass].from === 'top' ) ? 'bottom' : 'top';
          this._headers[ this.options['defaultClass'] ].progress = 1.0 - totalProgress;
        }
        else {
          this._headers[ this.options['defaultClass'] ].progress += 1.0 - totalProgress;
        }
      }


      for( var ix in this._headers ) {
        if( ! this._headers.hasOwnProperty(ix) ){ continue; }
        if( ! this._headers[ix].from === '' ){ continue; }

        var offset = (1.0 - this._headers[ix].progress) * 100.0;

        // Add an extra offset when an area is hidden to prevent clipping/rounding issues.
        if( offset >= 100.0 ) { offset = 110.0; }
        if( offset <= -100.0 ) { offset = -110.0; }

        if( this._headers[ix].from === 'top' ){
          if( this._transformMode !== false ) {
            this._headers[ix].element[0].style[this._transformMode] = 'translateY(-'+ offset +'%) translateZ(0)';
            this._headers[ix].inner[0].style[this._transformMode]   = 'translateY(+'+ offset +'%) translateZ(0)';
          } else {
            this._headers[ix].element[0].style['top'] = '-'+ offset +'%';
            this._headers[ix].inner[0].style['top']   = '+'+ offset +'%';
          }
        }
        else {
          if( this._transformMode !== false ) {
            this._headers[ix].element[0].style[this._transformMode] = 'translateY(+'+ offset +'%) translateZ(0)';
            this._headers[ix].inner[0].style[this._transformMode]   = 'translateY(-'+ offset +'%) translateZ(0)';
          } else {
            this._headers[ix].element[0].style['top'] = '+'+ offset +'%';
            this._headers[ix].inner[0].style['top']   = '-'+ offset +'%';
          }
        }

      }

    },


    /**
     * Update the size of all the sections.
     * This doesn't look for new sections. It only updates the ones that were around when the plugin was started. 
     * Use .midnight('refresh') to do a full update.
     */
    _recalculateSections: function(){

      this._documentHeight = $(document).height();

      // Cache all the this._sections and their start/end positions (where the class starts and ends)
      this._sections = [];

      for( var ix=0; ix<this._$sections.length; ix++ ) {
        var $section = $(this._$sections[ix]);

        this._sections.push({
          element: $section,
          className: $section.data('midnight'),
          start: $section.offset().top,
          end: $section.offset().top + $section.outerHeight()
        });
      }

    },

    _updateHeaderHeight: function(){
      this._headerInfo.height = this._getContainerHeight();
      this.element.css('height', this._headerInfo.height+'px');
    },

    _updateHeadersLoop: function(){

      // This works using requestAnimationFrame for better compatibility with iOS/Android
      var context = this;
      this._requestAnimationFrame(function(){
        context._updateHeadersLoop();
      });

      this._recalculateHeaders();
      this._updateHeaders();

    },

    _requestAnimationFrame: function(callback){
      // Todo: This should be moved somewhere else
      var requestAnimationFrame = (requestAnimationFrame || (function(){
        return  window.requestAnimationFrame ||
                window.webkitRequestAnimationFrame ||
                window.mozRequestAnimationFrame ||
                function( callback ){
                  window.setTimeout(callback, 1000 / 60);
                };
      })());

      requestAnimationFrame(callback);
    }


  });

})(jQuery));
