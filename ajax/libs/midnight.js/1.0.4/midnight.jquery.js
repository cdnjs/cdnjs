/*!
 * Midnight.js 1.0.3
 * jQuery plugin to switch between multiple fixed header designs on the fly, so it looks in line with the content below it.
 * http://aerolab.github.io/midnight.js/
 *
 * Copyright (c) 2014 Aerolab <info@aerolab.co>
 *
 * Released under the MIT license
 * http://aerolab.github.io/midnight.js/LICENSE.txt
 */
 ((function ( $ ) {

  "use strict";

  $.fn.midnight = function( customOptions ) {

    if( typeof customOptions !== "object" ) {
      customOptions = {};
    }

    return this.each(function() {
      
      // Settings
      var settings = {
        // The class that wraps each header. Used as a clipping mask.
        headerClass: 'midnightHeader',
        // The class that wraps the contents of each header. Also used as a clipping mask.
        innerClass: 'midnightInner',
        // The class used by the default header (useful when adding multiple headers with different markup).
        defaultClass: 'default',
        // Unused: Add a prefix to the header classes (so if you set the "thingy-" prefix, a section with data-midnight="butterfly" will use the "thingy-butterfly" header)
        classPrefix: ''
      };

      $.extend(settings, customOptions);


      // Scroll Cache
      var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      var documentHeight = $(document).height();

      // Cache all the switchable headers (different colors)
      var $originalHeader = $(this);

      var headers = {};

      var headerInfo = {
        // Todo: Add support for this (though it's mostly unnecessary)
        top: 0,
        height: $originalHeader.outerHeight()
      };

      // Sections that affect the color of the header (and cache)
      var $sections = $('[data-midnight]');
      var sections = [];

      var getSupportedTransform = function() {
        var prefixes = ['transform','WebkitTransform','MozTransform','OTransform','msTransform'];
        for(var ix = 0; ix < prefixes.length; ix++) {
          if(document.createElement('div').style[prefixes[ix]] !== undefined) {
            return prefixes[ix];
          }
        }
        return false;
      }

      var transformMode = getSupportedTransform();


      // We need at least one section for this to work.
      if( $sections.length == 0 ){ return; }


      var getContainerHeight = function(){
        var $customHeaders = $originalHeader.find('> .'+settings['headerClass']);
        var maxHeight = 0;
        var height = 0;
        if( $customHeaders.length ) {
          $customHeaders.each(function() {

            var $header = $(this);
            var $inner = $header.find('> .'+settings['innerClass']);

            // Disable the fixed height and trigger a reflow to get the proper height
            // Get the inner height or just the height of the container
            if( $inner.length ) {
              $inner.css('bottom', 'auto');
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
          maxHeight = height = $originalHeader.outerHeight();
        }
        return maxHeight;
      };


      var updateHeaderHeight = function(){
        headerInfo.height = getContainerHeight();
        $originalHeader.css('height', headerInfo.height+'px');
      };


      var setupHeaders = function(){

        // Get all the different header colors
        headers['default'] = {};

        $sections.each(function(){
          var $section = $(this);
          var headerClass = $section.data('midnight');

          if( typeof headerClass !== 'string' ){ return; }

          headerClass = headerClass.trim();

          if( headerClass === '' ){ return; }

          headers[headerClass] = {};
        });


        // Get the padding of the original Header. It will be applied to the internal headers.
        // Todo: Implement this
        var defaultPaddings = {
          top: $originalHeader.css("padding-top"),
          right: $originalHeader.css("padding-right"),
          bottom: $originalHeader.css("padding-bottom"),
          left: $originalHeader.css("padding-left")
        };


        // Create the fake headers
        $originalHeader
          .css({
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            overflow: 'hidden'
          });

        updateHeaderHeight();

        var $customHeaders = $originalHeader.find('> .'+settings['headerClass']);
        if( $customHeaders.length ) {
          if( ! $customHeaders.filter('.'+ settings['defaultClass']).length ) {
            // If there's no default header, just pick the first one, duplicate it, and set the correct class
            $customHeaders.filter('.'+ settings['headerClass'] +':first').clone(true, true).attr('class', settings['headerClass'] +' '+ settings['defaultClass']);
          }
        } else {
          // If there are no custom headers, just wrap the content and make that the default header
          $originalHeader.wrapInner('<div class="'+ settings['headerClass'] +' '+ settings['defaultClass'] +'"></div>');
        }

        // Make a copy of the default header for use in the generic ones.
        var $customHeaders = $originalHeader.find('> .'+ settings['headerClass']);
        var $defaultHeader = $customHeaders.filter('.'+ settings['defaultClass']).clone(true, true);



        for( var headerClass in headers ) {
          if( ! headers.hasOwnProperty(headerClass) ){ continue; }
          if( typeof headers[headerClass].element === 'undefined' ) {

            // Create the outer clipping mask
            // If there's some custom markup, use it, or else just clone the default header
            var $existingHeader = $customHeaders.filter('.'+headerClass);
            if( $existingHeader.length ) {
              headers[headerClass].element = $existingHeader;
            } else {
              headers[headerClass].element = $defaultHeader.clone(true, true).removeClass( settings['defaultClass'] ).addClass(headerClass).appendTo( $originalHeader );
            }

            var resetStyles = {
              position: 'absolute',
              overflow: 'hidden',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0
            };
            headers[headerClass].element.css(resetStyles);

            if( transformMode !== false ) {
              headers[headerClass].element.css(transformMode, 'translateZ(0)');
            }

            // Create the inner clipping mask
            if( ! headers[headerClass].element.find('> .'+ settings['innerClass']).length ) {
              headers[headerClass].element.wrapInner('<div class="'+ settings['innerClass'] +'"></div>');
            }
            headers[headerClass].inner = headers[headerClass].element.find('> .'+ settings['innerClass'])
            headers[headerClass].inner.css(resetStyles);

            if( transformMode !== false ) {
              headers[headerClass].inner.css(transformMode, 'translateZ(0)');
            }

            // Set the default clipping variables
            headers[headerClass].from = '';
            headers[headerClass].progress = 0.0;
          }
        }


        // Headers that weren't initialized have to be hidden
        $customHeaders.each(function(){
          var $header = $(this);
          var hasAnyClass = false;
          for( var headerClass in headers ) {
            if( ! headers.hasOwnProperty(headerClass) ){ continue; }
            if( $header.hasClass(headerClass) ){ hasAnyClass = true; }
          }

          // Add the inner clipping mask just in case
          if( ! $header.find('> .'+ settings['innerClass']).length ) {
            $header.wrapInner('<div class="'+ settings['innerClass'] +'"></div>');
          }

          if( ! hasAnyClass ){ $header.hide(); }
        });

      };

      setupHeaders();


      var recalculateSections = function(){

        documentHeight = $(document).height();

        // Cache all the sections and their start/end positions (where the class starts and ends)
        sections = [];

        for( var ix=0; ix<$sections.length; ix++ ) {
          var $section = $($sections[ix]);

          sections.push({
            element: $section,
            className: $section.data('midnight'),
            start: $section.offset().top,
            end: $section.offset().top + $section.outerHeight()
          });
        }

      };


      // NANANANANANANANA GRASAAAAA
      // (This is the ghetto way of keeping the section values updated after any kind of reflow. The overhead is minimal)
      setInterval(recalculateSections, 1000);


      var recalculateHeaders = function(){

        // Check classes are currently active in the header (including the current percentage of each)
        scrollTop = window.pageYOffset || document.body.scrollTop || document.documentElement.scrollTop;
        // Some browsers (e.g on OS X) allow scrolling past the top/bottom.
        scrollTop = Math.max(scrollTop, 0);
        scrollTop = Math.min(scrollTop, documentHeight);

        // Get the header's position relative to the document (given that it's fixed)
        var headerHeight = headerInfo.height;
        var headerStart = scrollTop + headerInfo.top;
        var headerEnd = scrollTop + headerInfo.top + headerHeight;

        // Reset the header status
        for( var headerClass in headers ) {
          if( ! headers.hasOwnProperty(headerClass) ){ continue; }
          // from == '' signals that the section is inactive
          headers[ headerClass ].from = '';
          headers[ headerClass ].progress = 0.0;
        }

        // Set the header status
        for( var ix = 0; ix < sections.length; ix++ ) {

          // Todo: This isn't exactly the best code.

          // If there's some kind of overlap between the header and a section, that class becomes active
          if( headerEnd >= sections[ix].start && headerStart <= sections[ix].end ) {

            headers[ sections[ix].className ].visible = true;

            // If the header sits neatly within the section, this is the only active class
            if( headerStart >= sections[ix].start && headerEnd <= sections[ix].end ) {
              headers[ sections[ix].className ].from = 'top';
              headers[ sections[ix].className ].progress += 1.0;
            }
            // If the header is in the middle of the end of a section, it comes from the top
            else if( headerEnd > sections[ix].end && headerStart < sections[ix].end ) {
              headers[ sections[ix].className ].from = 'top';
              headers[ sections[ix].className ].progress = 1.0 - (headerEnd - sections[ix].end) / headerHeight;
            }
            // If the header is in the middle of the start of a section, it comes from the bottom
            else if( headerEnd > sections[ix].start && headerStart < sections[ix].start ) {
              // If the same color continues in the next section, just add the progress to it so we don't switch
              if( headers[ sections[ix].className ].from === 'top' ) {
                headers[ sections[ix].className ].progress += (headerEnd - sections[ix].start) / headerHeight;
              }
              else {
                headers[ sections[ix].className ].from = 'bottom';
                headers[ sections[ix].className ].progress = (headerEnd - sections[ix].start) / headerHeight;
              }
            }

          }

        }

      };



      /**
       * Update the headers based on the previously calculated values
       */
      var updateHeaders = function(){

        // Do some preprocessing to ensure a header is always shown (even if some sections haven't been assigned)
        var totalProgress = 0.0;
        var lastActiveClass = '';
        for( var headerClass in headers ) {
          if( ! headers.hasOwnProperty(headerClass) ){ continue; }
          if( ! headers[headerClass].from === '' ){ continue; }
          totalProgress += headers[headerClass].progress;
          lastActiveClass = headerClass;
        }


        if( totalProgress < 1.0 ) {
          // Complete the header at the bottom with the default class
          if( headers[ settings['defaultClass'] ].from === '' ) {
            headers[ settings['defaultClass'] ].from = ( headers[lastActiveClass].from === 'top' ) ? 'bottom' : 'top';
            headers[ settings['defaultClass'] ].progress = 1.0 - totalProgress;
          }
          else {
            headers[ settings['defaultClass'] ].progress += 1.0 - totalProgress;
          }
        }


        for( var ix in headers ) {
          if( ! headers.hasOwnProperty(ix) ){ continue; }
          if( ! headers[ix].from === '' ){ continue; }

          var offset = (1.0 - headers[ix].progress) * 100.0;

          if( headers[ix].from === 'top' ){
            if( transformMode !== false ) {
              headers[ix].element[0].style[transformMode] = 'translateY(-'+ offset +'%) translateZ(0)';
              headers[ix].inner[0].style[transformMode]   = 'translateY(+'+ offset +'%) translateZ(0)';
            } else {
              headers[ix].element[0].style['top'] = '-'+ offset +'%';
              headers[ix].inner[0].style['top']   = '+'+ offset +'%';
            }
          }
          else {
            if( transformMode !== false ) {
              headers[ix].element[0].style[transformMode] = 'translateY(+'+ offset +'%) translateZ(0)';
              headers[ix].inner[0].style[transformMode]   = 'translateY(-'+ offset +'%) translateZ(0)';
            } else {
              headers[ix].element.style['top'] = '+'+ offset +'%';
              headers[ix].inner.style['top']   = '-'+ offset +'%';
            }
          }

        }

      };



      // We need to recalculate all sections and headers on resize.
      $(window).resize(function(){
        recalculateSections();
        updateHeaderHeight();

        recalculateHeaders();
        updateHeaders();
      }).trigger('resize');




      // This works using requestAnimationFrame for better compatibility with iOS/Android
      var requestAnimationFrame = window.requestAnimationFrame || (function(){
        return  window.requestAnimationFrame ||
                window.webkitRequestAnimationFrame ||
                window.mozRequestAnimationFrame ||
                function( callback ){
                  window.setTimeout(callback, 1000 / 60);
                };
      })();


      // Start the loop
      var updateHeadersLoop = function(){
        requestAnimationFrame(updateHeadersLoop);

        recalculateHeaders();
        updateHeaders();
      };

      updateHeadersLoop();


    });

  };

})(jQuery));
