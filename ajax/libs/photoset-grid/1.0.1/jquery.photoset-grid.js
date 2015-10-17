/**
 * photoset-grid - v1.0.1
 * 2014-04-08
 * jQuery plugin to arrange images into a flexible grid
 * http://stylehatch.github.com/photoset-grid/
 *
 * Copyright 2014 Jonathan Moore - Style Hatch
 */

 /*jshint browser: true, curly: true, eqeqeq: true, forin: false, immed: false, newcap: true, noempty: true, strict: true, undef: true, devel: true */
;(function ( $, window, document, undefined ) { 

  'use strict';

  // Plugin name and default settings
  var pluginName = "photosetGrid",
    defaults = {
      // Required
      // set the width of the container
      width         : '100%',
      // the space between the rows / columns
      gutter        : '0px',

      // Optional
      // wrap the images in a vs. div and link to the data-highres images
      highresLinks  : false,
      // threshold for the lowres image, if container is > swap the data-highres
      lowresWidth   : 500,
      // relational attr to apply to the links for lightbox use
      rel           : '',

      // Call back events
      onInit        : function(){},
      onComplete    : function(){}
    };

    // Plugin constructor
    function Plugin( element, options ) {
      this.element = element;
      this.options = $.extend( {}, defaults, options );

      this._defaults = defaults;
      this._name = pluginName;

      this.init();
    }

    Plugin.prototype = {

      init: function() {
        // Call the optional onInit event set when the plugin is called
        this.options.onInit();

        this._setupRows(this.element, this.options);
        this._setupColumns(this.element, this.options);
        
      },

      _callback: function(elem){
        // Call the optional onComplete event after the plugin has been completed
        this.options.onComplete(elem);
      },

      _setupRows: function(  elem, options ){
        // Convert the layout string into an array to build the DOM structures
        if(options.layout) {
          // Check for layout defined in plugin call
          this.layout = options.layout;
        } else if($(elem).attr('data-layout')) {
          // If not defined in the options, check for the data-layout attr
          this.layout = $(elem).attr('data-layout');
        } else {
          // Otherwise give it a stacked layout (no grids for you)
          // Generate a layout string of all ones based on the number of images
          var stackedLayout = "";
          var defaultColumns = 1;
          for (var imgs=0; imgs<$(elem).find('img').length; imgs++ ) {
            stackedLayout = stackedLayout + defaultColumns.toString();
          }
          this.layout = stackedLayout;
        }

        // Dump the layout into a rows array
        // Convert the array into all numbers vs. strings
        this.rows = this.layout.split('');
        for (var i in this.rows ) {
          this.rows[i] = parseInt(this.rows[i], 10);
        }

        var $images = $(elem).find('img');
        var imageIndex = 0;

        $.each(this.rows, function(i, val){
          var rowStart = imageIndex;
          var rowEnd = imageIndex + val;

          // Wrap each set of images in a row into a container div
          $images.slice(rowStart, rowEnd).wrapAll('<div class="photoset-row cols-' + val + '"></div>');
          
          imageIndex = rowEnd;
        });

        $(elem).find('.photoset-row:not(:last-child)').css({
          'margin-bottom': options.gutter
        });
      },

      _setupColumns: function(  elem, options ){

        // Reference to this Plugin
        var $this = this;

        var setupStyles = function(waitForImagesLoaded){
          var $rows = $(elem).find('.photoset-row');
          var $images = $(elem).find('img');

          // Wrap the images in links to the highres or regular image
          // Otherwise wrap in div.photoset-cell
          if(options.highresLinks){
            $images.each(function(){
              var highres;
              // If a highres image exists link it up!
              if($(this).attr('data-highres')){
                  highres = $(this).attr('data-highres');
              } else {
                  highres = $(this).attr('src');
              }
              $(this).wrapAll('<a href="' + highres + '" class="photoset-cell highres-link" />');
            });

            // Apply the optional rel
            if(options.rel){
              $images.parent().attr('rel', options.rel);
            }

          } else {
            $images.each(function(){
              $(this).wrapAll('<div class="photoset-cell" />');
            });
          }

          var $cells = $(elem).find('.photoset-cell');
          var $cols1 = $(elem).find('.cols-1 .photoset-cell');
          var $cols2 = $(elem).find('.cols-2 .photoset-cell');
          var $cols3 = $(elem).find('.cols-3 .photoset-cell');
          var $cols4 = $(elem).find('.cols-4 .photoset-cell');
          var $cols5 = $(elem).find('.cols-5 .photoset-cell');

          // Apply styles initial structure styles to the grid
          $(elem).css({
            'width': options.width
          });
          $rows.css({
            'clear': 'left',
            'display': 'block',
            'overflow': 'hidden'
          });
          $cells.css({
            'float': 'left',
            'display': 'block',
            'line-height': '0',
            '-webkit-box-sizing': 'border-box',
            '-moz-box-sizing': 'border-box',
            'box-sizing': 'border-box'
          });
          $images.css({
            'width': '100%',
            'height': 'auto'
          });

          // if the imaged did not have height/width attr set them
          if (waitForImagesLoaded) {
            $images.each(function(){
              $(this).attr('height', $(this).height());
              $(this).attr('width', $(this).width());
            });
          }

          // Set the width of the cells based on the number of columns in the row
          $cols1.css({ 'width': '100%' });
          $cols2.css({ 'width': '50%' });
          $cols3.css({ 'width': '33.3%' });
          $cols4.css({ 'width': '25%' });
          $cols5.css({ 'width': '20%' });


          var gutterVal = parseInt(options.gutter, 10);
          // Apply 50% gutter to left and right
          // this provides equal gutters a high values
          $(elem).find('.photoset-cell:not(:last-child)').css({
            'padding-right': (gutterVal / 2) + 'px'
          });
          $(elem).find('.photoset-cell:not(:first-child)').css({
            'padding-left': (gutterVal / 2) + 'px'
          });


          function resizePhotosetGrid(){

            // Give the values a floor to prevent misfires
            var w = $(elem).width().toString();

            if( w !== $(elem).attr('data-width') ) {
              $rows.each(function(){
                var $shortestImg = $(this).find('img:eq(0)');

                $(this).find('img').each(function(){
                  var $img = $(this);
                  if( $img.attr('height') < $shortestImg.attr('height') ){
                      $shortestImg = $(this);
                  }

                  if(parseInt($img.css('width'), 10) > options.lowresWidth && $img.attr('data-highres')){
                      $img.attr('src', $img.attr('data-highres'));
                  }
                });

                // Get the row height from the calculated/real height/width of the shortest image
                var rowHeight = ( $shortestImg.attr('height') * parseInt($shortestImg.css('width'), 10) ) / $shortestImg.attr('width');
                // Adding a buffer to shave off a few pixels in height
                var bufferHeight = Math.floor(rowHeight * 0.025);
                $(this).height( rowHeight - bufferHeight );

                $(this).find('img').each(function(){
                  // Get the image height from the calculated/real height/width
                  var imageHeight = ( $(this).attr('height') * parseInt($(this).css('width'), 10) ) / $(this).attr('width');
                  var marginOffset = ( (rowHeight - imageHeight) * 0.5 ) + 'px';
                  $(this).css({
                    'margin-top' : marginOffset
                  });
                });

              });
              $(elem).attr('data-width', w );
            } 

          }
          resizePhotosetGrid();

          $(window).on("resize", function() {
            resizePhotosetGrid();
          }); 

        };

        // By default the plugin will wait until all of the images are loaded to setup the styles
        var waitForImagesLoaded = true;
        var hasDimensions = true;

        // Loops through all of the images in the photoset
        // if the height and width exists for all images set waitForImagesLoaded to false
        $(elem).find('img').each(function(){
          hasDimensions = hasDimensions & ( !!$(this).attr('height') & !!$(this).attr('width') );
        });

        waitForImagesLoaded = !hasDimensions;

        // Only use imagesLoaded() if waitForImagesLoaded
        if(waitForImagesLoaded) {
          $(elem).imagesLoaded(function(){
            setupStyles(waitForImagesLoaded);
            $this._callback(elem);
          });
        } else {
          setupStyles(waitForImagesLoaded);
          $this._callback(elem);
        }

        
      }

    };

    // plugin wrapper around the constructor
    $.fn[pluginName] = function ( options ) {
      return this.each(function () {
        if (!$.data(this, "plugin_" + pluginName)) {
          $.data(this, "plugin_" + pluginName, new Plugin( this, options ));
        }
      });
    };

    /*!
     * jQuery imagesLoaded plugin v2.1.1
     * http://github.com/desandro/imagesloaded
     *
     * MIT License. by Paul Irish et al.
     */

    /*jshint curly: true, eqeqeq: true, noempty: true, strict: true, undef: true, browser: true */
    /*global jQuery: false */

    // blank image data-uri bypasses webkit log warning (thx doug jones)
    var BLANK = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==';

    $.fn.imagesLoaded = function( callback ) {
      var $this = this,
        deferred = $.isFunction($.Deferred) ? $.Deferred() : 0,
        hasNotify = $.isFunction(deferred.notify),
        $images = $this.find('img').add( $this.filter('img') ),
        loaded = [],
        proper = [],
        broken = [];

      // Register deferred callbacks
      if ($.isPlainObject(callback)) {
        $.each(callback, function (key, value) {
          if (key === 'callback') {
            callback = value;
          } else if (deferred) {
            deferred[key](value);
          }
        });
      }

      function doneLoading() {
        var $proper = $(proper),
          $broken = $(broken);

        if ( deferred ) {
          if ( broken.length ) {
            deferred.reject( $images, $proper, $broken );
          } else {
            deferred.resolve( $images );
          }
        }

        if ( $.isFunction( callback ) ) {
          callback.call( $this, $images, $proper, $broken );
        }
      }

      function imgLoadedHandler( event ) {
        imgLoaded( event.target, event.type === 'error' );
      }

      function imgLoaded( img, isBroken ) {
        // don't proceed if BLANK image, or image is already loaded
        if ( img.src === BLANK || $.inArray( img, loaded ) !== -1 ) {
          return;
        }

        // store element in loaded images array
        loaded.push( img );

        // keep track of broken and properly loaded images
        if ( isBroken ) {
          broken.push( img );
        } else {
          proper.push( img );
        }

        // cache image and its state for future calls
        $.data( img, 'imagesLoaded', { isBroken: isBroken, src: img.src } );

        // trigger deferred progress method if present
        if ( hasNotify ) {
          deferred.notifyWith( $(img), [ isBroken, $images, $(proper), $(broken) ] );
        }

        // call doneLoading and clean listeners if all images are loaded
        if ( $images.length === loaded.length ) {
          setTimeout( doneLoading );
          $images.unbind( '.imagesLoaded', imgLoadedHandler );
        }
      }

      // if no images, trigger immediately
      if ( !$images.length ) {
        doneLoading();
      } else {
        $images.bind( 'load.imagesLoaded error.imagesLoaded', imgLoadedHandler )
        .each( function( i, el ) {
          var src = el.src;

          // find out if this image has been already checked for status
          // if it was, and src has not changed, call imgLoaded on it
          var cached = $.data( el, 'imagesLoaded' );
          if ( cached && cached.src === src ) {
            imgLoaded( el, cached.isBroken );
            return;
          }

          // if complete is true and browser supports natural sizes, try
          // to check for image status manually
          if ( el.complete && el.naturalWidth !== undefined ) {
            imgLoaded( el, el.naturalWidth === 0 || el.naturalHeight === 0 );
            return;
          }

          // cached images don't fire load sometimes, so we reset src, but only when
          // dealing with IE, or image is complete (loaded) and failed manual check
          // webkit hack from http://groups.google.com/group/jquery-dev/browse_thread/thread/eee6ab7b2da50e1f
          if ( el.readyState || el.complete ) {
            el.src = BLANK;
            el.src = src;
          }
        });
      }

      return deferred ? deferred.promise( $this ) : $this;
    };

    /*
     * throttledresize: special jQuery event that happens at a reduced rate compared to "resize"
     *
     * latest version and complete README available on Github:
     * https://github.com/louisremi/jquery-smartresize
     *
     * Copyright 2012 @louis_remi
     * Licensed under the MIT license.
     *
     * This saved you an hour of work? 
     * Send me music http://www.amazon.co.uk/wishlist/HNTU0468LQON
     */

    var $event = $.event,
      $special,
      dummy = {_:0},
      frame = 0,
      wasResized, animRunning;

    $special = $event.special.throttledresize = {
      setup: function() {
        $( this ).on( "resize", $special.handler );
      },
      teardown: function() {
        $( this ).off( "resize", $special.handler );
      },
      handler: function( event, execAsap ) {
        // Save the context
        var context = this,
          args = arguments;

        wasResized = true;

        if ( !animRunning ) {
          setInterval(function(){
            frame++;

            if ( frame > $special.threshold && wasResized || execAsap ) {
              // set correct event type
              event.type = "throttledresize";
              $event.dispatch.apply( context, args );
              wasResized = false;
              frame = 0;
            }
            if ( frame > 9 ) {
              $(dummy).stop();
              animRunning = false;
              frame = 0;
            }
          }, 30);
          animRunning = true;
        }
      },
      threshold: 0
    };


})( jQuery, window, document );
