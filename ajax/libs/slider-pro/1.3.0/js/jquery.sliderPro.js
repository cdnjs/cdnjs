/*!
*  - v1.3
* Homepage: http://bqworks.com/slider-pro/
* Author: bqworks
* Author URL: http://bqworks.com/
*/
;(function( window, $ ) {

	"use strict";

	// Static methods for Slider Pro
	$.SliderPro = {

		// List of added modules
		modules: [],

		// Add a module by extending the core prototype
		addModule: function( name, module ) {
			this.modules.push( name );
			$.extend( SliderPro.prototype, module );
		}
	};

	// namespace
	var NS = $.SliderPro.namespace = 'SliderPro';

	var SliderPro = function( instance, options ) {

		// Reference to the slider instance
		this.instance = instance;

		// Reference to the slider jQuery element
		this.$slider = $( this.instance );

		// Reference to the slides (sp-slides) jQuery element
		this.$slides = null;

		// Reference to the mask (sp-mask) jQuery element
		this.$slidesMask = null;

		// Reference to the slides (sp-slides-container) jQuery element
		this.$slidesContainer = null;

		// Array of SliderProSlide objects, ordered by their DOM index
		this.slides = [];

		// Array of SliderProSlide objects, ordered by their left/top position in the slider.
		// This will be updated continuously if the slider is loopable.
		this.slidesOrder = [];

		// Holds the options passed to the slider when it was instantiated
		this.options = options;

		// Holds the final settings of the slider after merging the specified
		// ones with the default ones.
		this.settings = {};

		// Another reference to the settings which will not be altered by breakpoints or by other means
		this.originalSettings = {};

		// Reference to the original 'gotoSlide' method
		this.originalGotoSlide = null;

		// The index of the currently selected slide (starts with 0)
		this.selectedSlideIndex = 0;

		// The index of the previously selected slide
		this.previousSlideIndex = 0;

		// Indicates the position of the slide considered to be in the middle.
		// If there are 5 slides (0, 1, 2, 3, 4) the middle position will be 2.
		// If there are 6 slides (0, 1, 2, 3, 4, 5) the middle position will be approximated to 2.
		this.middleSlidePosition = 0;

		// Indicates the type of supported transition (CSS3 2D, CSS3 3D or JavaScript)
		this.supportedAnimation = null;

		// Indicates the required vendor prefix for CSS (i.e., -webkit, -moz, etc.)
		this.vendorPrefix = null;

		// Indicates the name of the CSS transition's complete event (i.e., transitionend, webkitTransitionEnd, etc.)
		this.transitionEvent = null;

		// Indicates the 'left' or 'top' position, depending on the orientation of the slides
		this.positionProperty = null;

		// Indicates the 'width' or 'height', depending on the orientation of the slides
		this.sizeProperty = null;

		// Indicates if the current browser is IE
		this.isIE = null;

		// The position of the slides container
		this.slidesPosition = 0;

		// The total width/height of the slides
		this.slidesSize = 0;

		// The average width/height of a slide
		this.averageSlideSize = 0;

		// The width of the individual slide
		this.slideWidth = 0;

		// The height of the individual slide
		this.slideHeight = 0;

		// Reference to the old slide width, used to check if the width has changed
		this.previousSlideWidth = 0;

		// Reference to the old slide height, used to check if the height has changed
		this.previousSlideHeight = 0;
		
		// Reference to the old window width, used to check if the window width has changed
		this.previousWindowWidth = 0;
		
		// Reference to the old window height, used to check if the window height has changed
		this.previousWindowHeight = 0;

		// Property used for deferring the resizing of the slider
		this.allowResize = true;

		// Unique ID to be used for event listening
		this.uniqueId = new Date().valueOf();

		// Stores size breakpoints
		this.breakpoints = [];

		// Indicates the current size breakpoint
		this.currentBreakpoint = -1;

		// An array of shuffled indexes, based on which the slides will be shuffled
		this.shuffledIndexes = [];

		// Initialize the slider
		this._init();
	};

	SliderPro.prototype = {

		// The starting place for the slider
		_init: function() {
			var that = this;

			this.supportedAnimation = SliderProUtils.getSupportedAnimation();
			this.vendorPrefix = SliderProUtils.getVendorPrefix();
			this.transitionEvent = SliderProUtils.getTransitionEvent();
			this.isIE = SliderProUtils.checkIE();

			// Remove the 'sp-no-js' when the slider's JavaScript code starts running
			this.$slider.removeClass( 'sp-no-js' );

			// Add the 'ios' class if it's an iOS device
			if ( window.navigator.userAgent.match( /(iPad|iPhone|iPod)/g ) ) {
				this.$slider.addClass( 'ios' );
			}

			// Check if IE (older than 11) is used and add the version number as a class to the slider since
			// older IE versions might need CSS tweaks.
			var rmsie = /(msie) ([\w.]+)/,
				ieVersion = rmsie.exec( window.navigator.userAgent.toLowerCase() );
			
			if ( this.isIE ) {
				this.$slider.addClass( 'ie' );
			}

			if ( ieVersion !== null ) {
				this.$slider.addClass( 'ie' + parseInt( ieVersion[2], 10 ) );
			}

			// Set up the slides containers
			// slider-pro > sp-slides-container > sp-mask > sp-slides > sp-slide
			this.$slidesContainer = $( '<div class="sp-slides-container"></div>' ).appendTo( this.$slider );
			this.$slidesMask = $( '<div class="sp-mask"></div>' ).appendTo( this.$slidesContainer );
			this.$slides = this.$slider.find( '.sp-slides' ).appendTo( this.$slidesMask );
			this.$slider.find( '.sp-slide' ).appendTo( this.$slides );
			
			var modules = $.SliderPro.modules;

			// Merge the modules' default settings with the core's default settings
			if ( typeof modules !== 'undefined' ) {
				for ( var i = 0; i < modules.length; i++ ) {
					var defaults = modules[ i ].substring( 0, 1 ).toLowerCase() + modules[ i ].substring( 1 ) + 'Defaults';

					if ( typeof this[ defaults ] !== 'undefined' ) {
						$.extend( this.defaults, this[ defaults ] );
					}
				}
			}

			// Merge the specified setting with the default ones
			this.settings = $.extend( {}, this.defaults, this.options );

			// Initialize the modules
			if ( typeof modules !== 'undefined' ) {
				for ( var j = 0; j < modules.length; j++ ) {
					if ( typeof this[ 'init' + modules[ j ] ] !== 'undefined' ) {
						this[ 'init' + modules[ j ] ]();
					}
				}
			}

			// Keep a reference of the original settings and use it
			// to restore the settings when the breakpoints are used.
			this.originalSettings = $.extend( {}, this.settings );

			// Get the reference to the 'gotoSlide' method
			this.originalGotoSlide = this.gotoSlide;

			// Parse the breakpoints object and store the values into an array,
			// sorting them in ascending order based on the specified size.
			if ( this.settings.breakpoints !== null ) {
				for ( var sizes in this.settings.breakpoints ) {
					this.breakpoints.push({ size: parseInt( sizes, 10 ), properties:this.settings.breakpoints[ sizes ] });
				}

				this.breakpoints = this.breakpoints.sort(function( a, b ) {
					return a.size >= b.size ? 1: -1;
				});
			}

			// Set which slide should be selected initially
			this.selectedSlideIndex = this.settings.startSlide;

			// Shuffle/randomize the slides
			if ( this.settings.shuffle === true ) {
				var slides = this.$slides.find( '.sp-slide' ),
					shuffledSlides = [];

				// Populate the 'shuffledIndexes' with index numbers
				slides.each(function( index ) {
					that.shuffledIndexes.push( index );
				});

				for ( var k = this.shuffledIndexes.length - 1; k > 0; k-- ) {
					var l = Math.floor( Math.random() * ( k + 1 ) ),
						temp = this.shuffledIndexes[ k ];

					this.shuffledIndexes[ k ] = this.shuffledIndexes[ l ];
					this.shuffledIndexes[ l ] = temp;
				}

				// Reposition the slides based on the order of the indexes in the
				// 'shuffledIndexes' array
				$.each( this.shuffledIndexes, function( index, element ) {
					shuffledSlides.push( slides[ element ] );
				});
				
				// Append the sorted slides to the slider
				this.$slides.empty().append( shuffledSlides ) ;
			}
			
			// Resize the slider when the browser window resizes.
			// Also, deffer the resizing in order to not allow multiple
			// resizes in a 200 milliseconds interval.
			$( window ).on( 'resize.' + this.uniqueId + '.' + NS, function() {
			
				// Get the current width and height of the window
				var newWindowWidth = $( window ).width(),
					newWindowHeight = $( window ).height();
				
				// If the resize is not allowed yet or if the window size hasn't changed (this needs to be verified
				// because in IE8 and lower the resize event is triggered whenever an element from the page changes
				// its size) return early.
				if ( that.allowResize === false ||
					( that.previousWindowWidth === newWindowWidth && that.previousWindowHeight === newWindowHeight ) ) {
					return;
				}
				
				// Assign the new values for the window width and height
				that.previousWindowWidth = newWindowWidth;
				that.previousWindowHeight = newWindowHeight;
			
				that.allowResize = false;

				setTimeout(function() {
					that.resize();
					that.allowResize = true;
				}, 200 );
			});

			// Resize the slider when the 'update' method is called.
			this.on( 'update.' + NS, function() {

				// Reset the previous slide width
				that.previousSlideWidth = 0;

				// Some updates might require a resize
				that.resize();
			});

			this.update();

			// add the 'sp-selected' class to the initially selected slide
			this.$slides.find( '.sp-slide' ).eq( this.selectedSlideIndex ).addClass( 'sp-selected' );

			// Fire the 'init' event
			this.trigger({ type: 'init' });
			if ( $.isFunction( this.settings.init ) ) {
				this.settings.init.call( this, { type: 'init' });
			}
		},

		// Update the slider by checking for setting changes and for slides
		// that weren't initialized yet.
		update: function() {
			var that = this;

			// Check the current slider orientation and reset CSS that might have been
			// added for a different orientation, since the orientation can be changed
			// at runtime.
			if ( this.settings.orientation === 'horizontal' ) {
				this.$slider.removeClass( 'sp-vertical' ).addClass( 'sp-horizontal' );
				this.$slider.css({ 'height': '', 'max-height': '' });
				this.$slides.find( '.sp-slide' ).css( 'top', '' );
			} else if ( this.settings.orientation === 'vertical' ) {
				this.$slider.removeClass( 'sp-horizontal' ).addClass( 'sp-vertical' );
				this.$slides.find( '.sp-slide' ).css( 'left', '' );
			}

			if ( this.settings.rightToLeft === true ) {
				this.$slider.addClass( 'sp-rtl' );
			} else {
				this.$slider.removeClass( 'sp-rtl' );
			}

			this.positionProperty = this.settings.orientation === 'horizontal' ? 'left' : 'top';
			this.sizeProperty = this.settings.orientation === 'horizontal' ? 'width' : 'height';

			// Reset the 'gotoSlide' method
			this.gotoSlide = this.originalGotoSlide;

			// Loop through the array of SliderProSlide objects and if a stored slide is found
			// which is not in the DOM anymore, destroy that slide.
			for ( var i = this.slides.length - 1; i >= 0; i-- ) {
				if ( this.$slider.find( '.sp-slide[data-index="' + i + '"]' ).length === 0 ) {
					var slide = this.slides[ i ];

					slide.off( 'imagesLoaded.' + NS );
					slide.destroy();
					this.slides.splice( i, 1 );
				}
			}

			this.slidesOrder.length = 0;

			// Loop through the list of slides and initialize newly added slides if any,
			// and reset the index of each slide.
			this.$slider.find( '.sp-slide' ).each(function( index ) {
				var $slide = $( this );

				if ( typeof $slide.attr( 'data-init' ) === 'undefined' ) {
					that._createSlide( index, $slide );
				} else {
					that.slides[ index ].setIndex( index );
				}

				that.slidesOrder.push( index );
			});

			// Calculate the position/index of the middle slide
			this.middleSlidePosition = parseInt( ( that.slidesOrder.length - 1 ) / 2, 10 );

			// Arrange the slides in a loop
			if ( this.settings.loop === true ) {
				this._updateSlidesOrder();
			}

			// Fire the 'update' event
			this.trigger({ type: 'update' });
			if ( $.isFunction( this.settings.update ) ) {
				this.settings.update.call( this, { type: 'update' } );
			}
		},

		// Create a SliderProSlide instance for the slide passed as a jQuery element
		_createSlide: function( index, element ) {
			var that = this,
				slide = new SliderProSlide( $( element ), index, this.settings );

			this.slides.splice( index, 0, slide );

			slide.on( 'imagesLoaded.' + NS, function( event ) {
				if ( that.$slides.hasClass( 'sp-animated' ) === false ) {
					that._resetSlidesPosition();
				}

				that._calculateSlidesSize();
				
				if ( that.settings.autoHeight === true && event.index === that.selectedSlideIndex ) {
					that._resizeHeightTo( slide.getSize().height);
				}
			});
		},

		// Arrange the slide elements in a loop inside the 'slidesOrder' array
		_updateSlidesOrder: function() {
			var	slicedItems,
				i,

				// Calculate the distance between the selected element and the middle position
				distance = $.inArray( this.selectedSlideIndex, this.slidesOrder ) - this.middleSlidePosition;

			// If the distance is negative it means that the selected slider is before the middle position, so
			// slides from the end of the array will be added at the beginning, in order to shift the selected slide
			// forward.
			// 
			// If the distance is positive, slides from the beginning of the array will be added at the end.
			if ( distance < 0 ) {
				slicedItems = this.slidesOrder.splice( distance, Math.abs( distance ) );

				for ( i = slicedItems.length - 1; i >= 0; i-- ) {
					this.slidesOrder.unshift( slicedItems[ i ] );
				}
			} else if ( distance > 0 ) {
				slicedItems = this.slidesOrder.splice( 0, distance );

				for ( i = 0; i <= slicedItems.length - 1; i++ ) {
					this.slidesOrder.push( slicedItems[ i ] );
				}
			}
		},

		// Set the left/top position of the slides based on their position in the 'slidesOrder' array
		_updateSlidesPosition: function() {
			var selectedSlidePixelPosition = parseInt( this.$slides.find( '.sp-slide' ).eq( this.selectedSlideIndex ).css( this.positionProperty ), 10 ),
				slide,
				$slideElement,
				slideIndex,
				slideSize,
				previousPosition = selectedSlidePixelPosition;
				
			if ( this.settings.rightToLeft === true && this.settings.orientation === 'horizontal' ) {
				for ( slideIndex = this.middleSlidePosition; slideIndex >= 0; slideIndex-- ) {
					slide = this.getSlideAt( this.slidesOrder[ slideIndex ] );
					$slideElement = slide.$slide;
					$slideElement.css( this.positionProperty, previousPosition );
					previousPosition = parseInt( $slideElement.css( this.positionProperty ), 10 ) + slide.getSize()[ this.sizeProperty ] + this.settings.slideDistance;
				}

				previousPosition = selectedSlidePixelPosition;

				for ( slideIndex = this.middleSlidePosition + 1; slideIndex < this.slidesOrder.length; slideIndex++ ) {
					slide = this.getSlideAt( this.slidesOrder[ slideIndex ] );
					$slideElement = slide.$slide;
					$slideElement.css( this.positionProperty, previousPosition - ( slide.getSize()[ this.sizeProperty ] + this.settings.slideDistance ) );
					previousPosition = parseInt( $slideElement.css( this.positionProperty ), 10 );
				}
			} else {
				for ( slideIndex = this.middleSlidePosition - 1; slideIndex >= 0; slideIndex-- ) {
					slide = this.getSlideAt( this.slidesOrder[ slideIndex ] );
					$slideElement = slide.$slide;
					$slideElement.css( this.positionProperty, previousPosition - ( slide.getSize()[ this.sizeProperty ] + this.settings.slideDistance ) );
					previousPosition = parseInt( $slideElement.css( this.positionProperty ), 10 );
				}

				previousPosition = selectedSlidePixelPosition;

				for ( slideIndex = this.middleSlidePosition; slideIndex < this.slidesOrder.length; slideIndex++ ) {
					slide = this.getSlideAt( this.slidesOrder[ slideIndex ] );
					$slideElement = slide.$slide;
					$slideElement.css( this.positionProperty, previousPosition );
					previousPosition = parseInt( $slideElement.css( this.positionProperty ), 10 ) + slide.getSize()[ this.sizeProperty ] + this.settings.slideDistance;
				}
			}
		},

		// Set the left/top position of the slides based on their position in the 'slidesOrder' array,
		// and also set the position of the slides container.
		_resetSlidesPosition: function() {
			var previousPosition = 0,
				slide,
				$slideElement,
				slideIndex;

			if ( this.settings.rightToLeft === true && this.settings.orientation === 'horizontal' ) {
				for ( slideIndex = 0; slideIndex < this.slidesOrder.length; slideIndex++ ) {
					slide = this.getSlideAt( this.slidesOrder[ slideIndex ] );
					$slideElement = slide.$slide;
					$slideElement.css( this.positionProperty, previousPosition - ( slide.getSize()[ this.sizeProperty ] + this.settings.slideDistance ) );
					previousPosition = parseInt( $slideElement.css( this.positionProperty ), 10 );
				}
			} else {
				for ( slideIndex = 0; slideIndex < this.slidesOrder.length; slideIndex++ ) {
					slide = this.getSlideAt( this.slidesOrder[ slideIndex ] );
					$slideElement = slide.$slide;
					$slideElement.css( this.positionProperty, previousPosition );
					previousPosition = parseInt( $slideElement.css( this.positionProperty ), 10 ) + slide.getSize()[ this.sizeProperty ] + this.settings.slideDistance;
				}
			}

			var selectedSlideOffset = this.settings.centerSelectedSlide === true ? Math.round( ( parseInt( this.$slidesMask.css( this.sizeProperty ), 10 ) - this.getSlideAt( this.selectedSlideIndex ).getSize()[ this.sizeProperty ] ) / 2 ) : 0,
				newSlidesPosition = - parseInt( this.$slides.find( '.sp-slide' ).eq( this.selectedSlideIndex ).css( this.positionProperty ), 10 ) + selectedSlideOffset;
			
			this._moveTo( newSlidesPosition, true );
		},

		// Calculate the total size of the slides and the average size of a single slide
		_calculateSlidesSize: function() {
			var firstSlide = this.$slides.find( '.sp-slide' ).eq( this.slidesOrder[ 0 ] ),
				firstSlidePosition = parseInt( firstSlide.css( this.positionProperty ), 10 ),
				lastSlide = this.$slides.find( '.sp-slide' ).eq( this.slidesOrder[ this.slidesOrder.length - 1 ] ),
				lastSlidePosition = parseInt( lastSlide.css( this.positionProperty ), 10 ) + ( this.settings.rightToLeft === true && this.settings.orientation === 'horizontal' ? -1 : 1 ) * parseInt( lastSlide.css( this.sizeProperty ), 10 );
			
			this.slidesSize = Math.abs( lastSlidePosition - firstSlidePosition );
			this.averageSlideSize = Math.round( this.slidesSize / this.slides.length );
		},

		// Called when the slider needs to resize
		resize: function() {
			var that = this;

			// Check if the current window width is bigger than the biggest breakpoint
			// and if necessary reset the properties to the original settings.
			// 
			// If the window width is smaller than a certain breakpoint, apply the settings specified
			// for that breakpoint but only after merging them with the original settings
			// in order to make sure that only the specified settings for the breakpoint are applied
			if ( this.settings.breakpoints !== null && this.breakpoints.length > 0 ) {
				if ( $( window ).width() > this.breakpoints[ this.breakpoints.length - 1 ].size && this.currentBreakpoint !== -1 ) {
					this.currentBreakpoint = -1;
					this._setProperties( this.originalSettings, false );
				} else {
					for ( var i = 0, n = this.breakpoints.length; i < n; i++ ) {
						if ( $( window ).width() <= this.breakpoints[ i ].size ) {
							if ( this.currentBreakpoint !== this.breakpoints[ i ].size ) {
								var eventObject = { type: 'breakpointReach', size: this.breakpoints[ i ].size, settings: this.breakpoints[ i ].properties };
								this.trigger( eventObject );
								if ( $.isFunction( this.settings.breakpointReach ) )
									this.settings.breakpointReach.call( this, eventObject );

								this.currentBreakpoint = this.breakpoints[ i ].size;
								var settings = $.extend( {}, this.originalSettings, this.breakpoints[ i ].properties );
								this._setProperties( settings, false );
								
								return;
							}

							break;
						}
					}
				}
			}

			// Set the width of the main slider container based on whether or not the slider is responsive,
			// full width or full size
			if ( this.settings.responsive === true ) {
				if ( ( this.settings.forceSize === 'fullWidth' || this.settings.forceSize === 'fullWindow' ) &&
					( this.settings.visibleSize === 'auto' || this.settings.visibleSize !== 'auto' && this.settings.orientation === 'vertical' )
				) {
					this.$slider.css( 'margin', 0 );
					this.$slider.css({ 'width': $( window ).width(), 'max-width': '', 'marginLeft': - this.$slider.offset().left });
				} else {
					this.$slider.css({ 'width': '100%', 'max-width': this.settings.width, 'marginLeft': '' });
				}
			} else {
				this.$slider.css({ 'width': this.settings.width });
			}

			// Calculate the aspect ratio of the slider
			if ( this.settings.aspectRatio === -1 ) {
				this.settings.aspectRatio = this.settings.width / this.settings.height;
			}
			
			// Initially set the slide width to the size of the slider.
			// Later, this will be set to less if there are multiple visible slides.
			this.slideWidth = this.$slider.width();

			// Set the height to the same size as the browser window if the slider is set to be 'fullWindow',
			// or calculate the height based on the width and the aspect ratio.
			if ( this.settings.forceSize === 'fullWindow' ) {
				this.slideHeight = $( window ).height();
			} else {
				this.slideHeight = isNaN( this.settings.aspectRatio ) ? this.settings.height : this.slideWidth / this.settings.aspectRatio;
			}

			// Resize the slider only if the size of the slider has changed
			// If it hasn't, return.
			if ( this.previousSlideWidth !== this.slideWidth ||
				this.previousSlideHeight !== this.slideHeight ||
				this.settings.visibleSize !== 'auto' ||
				this.$slider.outerWidth() > this.$slider.parent().width() ||
				this.$slider.width() !== this.$slidesMask.width()
			) {
				this.previousSlideWidth = this.slideWidth;
				this.previousSlideHeight = this.slideHeight;
			} else {
				return;
			}

			this._resizeSlides();

			// Set the initial size of the mask container to the size of an individual slide
			this.$slidesMask.css({ 'width': this.slideWidth, 'height': this.slideHeight });

			// Adjust the height if it's set to 'auto'
			if ( this.settings.autoHeight === true ) {

				// Delay the resizing of the height to allow for other resize handlers
				// to execute first before calculating the final height of the slide
				setTimeout( function() {
					that._resizeHeight();
				}, 1 );
			} else {
				this.$slidesMask.css( this.vendorPrefix + 'transition', '' );
			}

			// The 'visibleSize' option can be set to fixed or percentage size to make more slides
			// visible at a time.
			// By default it's set to 'auto'.
			if ( this.settings.visibleSize !== 'auto' ) {
				if ( this.settings.orientation === 'horizontal' ) {

					// If the size is forced to full width or full window, the 'visibleSize' option will be
					// ignored and the slider will become as wide as the browser window.
					if ( this.settings.forceSize === 'fullWidth' || this.settings.forceSize === 'fullWindow' ) {
						this.$slider.css( 'margin', 0 );
						this.$slider.css({ 'width': $( window ).width(), 'max-width': '', 'marginLeft': - this.$slider.offset().left });
					} else {
						this.$slider.css({ 'width': this.settings.visibleSize, 'max-width': '100%', 'marginLeft': 0 });
					}
					
					this.$slidesMask.css( 'width', this.$slider.width() );
				} else {

					// If the size is forced to full window, the 'visibleSize' option will be
					// ignored and the slider will become as high as the browser window.
					if ( this.settings.forceSize === 'fullWindow' ) {
						this.$slider.css({ 'height': $( window ).height(), 'max-height': '' });
					} else {
						this.$slider.css({ 'height': this.settings.visibleSize, 'max-height': '100%' });
					}

					this.$slidesMask.css( 'height', this.$slider.height() );
				}
			}

			this._resetSlidesPosition();
			this._calculateSlidesSize();

			// Fire the 'sliderResize' event
			this.trigger({ type: 'sliderResize' });
			if ( $.isFunction( this.settings.sliderResize ) ) {
				this.settings.sliderResize.call( this, { type: 'sliderResize' });
			}
		},

		// Resize each individual slide
		_resizeSlides: function() {
			var slideWidth = this.slideWidth,
				slideHeight = this.slideHeight;

			if ( this.settings.autoSlideSize === true ) {
				if ( this.settings.orientation === 'horizontal' ) {
					slideWidth = 'auto';
				} else if ( this.settings.orientation === 'vertical' ) {
					slideHeight = 'auto';
				}
			} else if ( this.settings.autoHeight === true ) {
				slideHeight = 'auto';
			}

			// Loop through the existing slides and reset their size.
			$.each( this.slides, function( index, element ) {
				element.setSize( slideWidth, slideHeight );
			});
		},

		// Resize the height of the slider to the height of the selected slide.
		// It's used when the 'autoHeight' option is set to 'true'.
		_resizeHeight: function() {
			var that = this,
				selectedSlide = this.getSlideAt( this.selectedSlideIndex );

			this._resizeHeightTo( selectedSlide.getSize().height );
		},

		// Open the slide at the specified index
		gotoSlide: function( index ) {
			if ( index === this.selectedSlideIndex || typeof this.slides[ index ] === 'undefined' ) {
				return;
			}

			var that = this;

			this.previousSlideIndex = this.selectedSlideIndex;
			this.selectedSlideIndex = index;

			// Re-assign the 'sp-selected' class to the currently selected slide
			this.$slides.find( '.sp-selected' ).removeClass( 'sp-selected' );
			this.$slides.find( '.sp-slide' ).eq( this.selectedSlideIndex ).addClass( 'sp-selected' );

			// If the slider is loopable reorder the slides to have the selected slide in the middle
			// and update the slides' position.
			if ( this.settings.loop === true ) {
				this._updateSlidesOrder();
				this._updateSlidesPosition();
			}

			// Adjust the height of the slider
			if ( this.settings.autoHeight === true ) {
				this._resizeHeight();
			}

			var selectedSlideOffset = this.settings.centerSelectedSlide === true ? Math.round( ( parseInt( this.$slidesMask.css( this.sizeProperty ), 10 ) - this.getSlideAt( this.selectedSlideIndex ).getSize()[ this.sizeProperty ] ) / 2 ) : 0,
				newSlidesPosition = - parseInt( this.$slides.find( '.sp-slide' ).eq( this.selectedSlideIndex ).css( this.positionProperty ), 10 ) + selectedSlideOffset;

			// Move the slides container to the new position
			this._moveTo( newSlidesPosition, false, function() {
				that._resetSlidesPosition();

				// Fire the 'gotoSlideComplete' event
				that.trigger({ type: 'gotoSlideComplete', index: index, previousIndex: that.previousSlideIndex });
				if ( $.isFunction( that.settings.gotoSlideComplete ) ) {
					that.settings.gotoSlideComplete.call( that, { type: 'gotoSlideComplete', index: index, previousIndex: that.previousSlideIndex } );
				}
			});

			// Fire the 'gotoSlide' event
			this.trigger({ type: 'gotoSlide', index: index, previousIndex: this.previousSlideIndex });
			if ( $.isFunction( this.settings.gotoSlide ) ) {
				this.settings.gotoSlide.call( this, { type: 'gotoSlide', index: index, previousIndex: this.previousSlideIndex } );
			}
		},

		// Open the next slide
		nextSlide: function() {
			var index = ( this.selectedSlideIndex >= this.getTotalSlides() - 1 ) ? 0 : ( this.selectedSlideIndex + 1 );
			this.gotoSlide( index );
		},

		// Open the previous slide
		previousSlide: function() {
			var index = this.selectedSlideIndex <= 0 ? ( this.getTotalSlides() - 1 ) : ( this.selectedSlideIndex - 1 );
			this.gotoSlide( index );
		},

		// Move the slides container to the specified position.
		// The movement can be instant or animated.
		_moveTo: function( position, instant, callback ) {
			var that = this,
				css = {};

			if ( position === this.slidesPosition ) {
				return;
			}
			
			this.slidesPosition = position;
			
			if ( ( this.supportedAnimation === 'css-3d' || this.supportedAnimation === 'css-2d' ) && this.isIE === false ) {
				var transition,
					left = this.settings.orientation === 'horizontal' ? position : 0,
					top = this.settings.orientation === 'horizontal' ? 0 : position;

				if ( this.supportedAnimation === 'css-3d' ) {
					css[ this.vendorPrefix + 'transform' ] = 'translate3d(' + left + 'px, ' + top + 'px, 0)';
				} else {
					css[ this.vendorPrefix + 'transform' ] = 'translate(' + left + 'px, ' + top + 'px)';
				}

				if ( typeof instant !== 'undefined' && instant === true ) {
					transition = '';
				} else {
					this.$slides.addClass( 'sp-animated' );
					transition = this.vendorPrefix + 'transform ' + this.settings.slideAnimationDuration / 1000 + 's';

					this.$slides.on( this.transitionEvent, function( event ) {
						if ( event.target !== event.currentTarget ) {
							return;
						}

						that.$slides.off( that.transitionEvent );
						that.$slides.removeClass( 'sp-animated' );
						
						if ( typeof callback === 'function' ) {
							callback();
						}
					});
				}

				css[ this.vendorPrefix + 'transition' ] = transition;

				this.$slides.css( css );
			} else {
				css[ 'margin-' + this.positionProperty ] = position;

				if ( typeof instant !== 'undefined' && instant === true ) {
					this.$slides.css( css );
				} else {
					this.$slides.addClass( 'sp-animated' );
					this.$slides.animate( css, this.settings.slideAnimationDuration, function() {
						that.$slides.removeClass( 'sp-animated' );

						if ( typeof callback === 'function' ) {
							callback();
						}
					});
				}
			}
		},

		// Stop the movement of the slides
		_stopMovement: function() {
			var css = {};

			if ( ( this.supportedAnimation === 'css-3d' || this.supportedAnimation === 'css-2d' ) && this.isIE === false) {

				// Get the current position of the slides by parsing the 'transform' property
				var	matrixString = this.$slides.css( this.vendorPrefix + 'transform' ),
					matrixType = matrixString.indexOf( 'matrix3d' ) !== -1 ? 'matrix3d' : 'matrix',
					matrixArray = matrixString.replace( matrixType, '' ).match( /-?[0-9\.]+/g ),
					left = matrixType === 'matrix3d' ? parseInt( matrixArray[ 12 ], 10 ) : parseInt( matrixArray[ 4 ], 10 ),
					top = matrixType === 'matrix3d' ? parseInt( matrixArray[ 13 ], 10 ) : parseInt( matrixArray[ 5 ], 10 );
					
				// Set the transform property to the value that the transform had when the function was called
				if ( this.supportedAnimation === 'css-3d' ) {
					css[ this.vendorPrefix + 'transform' ] = 'translate3d(' + left + 'px, ' + top + 'px, 0)';
				} else {
					css[ this.vendorPrefix + 'transform' ] = 'translate(' + left + 'px, ' + top + 'px)';
				}

				css[ this.vendorPrefix + 'transition' ] = '';

				this.$slides.css( css );
				this.$slides.off( this.transitionEvent );
				this.slidesPosition = this.settings.orientation === 'horizontal' ? left : top;
			} else {
				this.$slides.stop();
				this.slidesPosition = parseInt( this.$slides.css( 'margin-' + this.positionProperty ), 10 );
			}

			this.$slides.removeClass( 'sp-animated' );
		},

		// Resize the height of the slider to the specified value
		_resizeHeightTo: function( height ) {
			var that = this,
				css = { 'height': height };

			if ( this.supportedAnimation === 'css-3d' || this.supportedAnimation === 'css-2d' ) {
				css[ this.vendorPrefix + 'transition' ] = 'height ' + this.settings.heightAnimationDuration / 1000 + 's';

				this.$slidesMask.off( this.transitionEvent );
				this.$slidesMask.on( this.transitionEvent, function( event ) {
					if ( event.target !== event.currentTarget ) {
						return;
					}

					that.$slidesMask.off( that.transitionEvent );

					// Fire the 'resizeHeightComplete' event
					that.trigger({ type: 'resizeHeightComplete' });
					if ( $.isFunction( that.settings.resizeHeightComplete ) ) {
						that.settings.resizeHeightComplete.call( that, { type: 'resizeHeightComplete' } );
					}
				});

				this.$slidesMask.css( css );
			} else {
				this.$slidesMask.stop().animate( css, this.settings.heightAnimationDuration, function( event ) {
					// Fire the 'resizeHeightComplete' event
					that.trigger({ type: 'resizeHeightComplete' });
					if ( $.isFunction( that.settings.resizeHeightComplete ) ) {
						that.settings.resizeHeightComplete.call( that, { type: 'resizeHeightComplete' } );
					}
				});
			}
		},

		// Destroy the slider instance
		destroy: function() {
			// Remove the stored reference to this instance
			this.$slider.removeData( 'sliderPro' );
			
			// Clean the CSS
			this.$slider.removeAttr( 'style' );
			this.$slides.removeAttr( 'style' );

			// Remove event listeners
			this.off( 'update.' + NS );
			$( window ).off( 'resize.' + this.uniqueId + '.' + NS );

			// Destroy modules
			var modules = $.SliderPro.modules;

			if ( typeof modules !== 'undefined' ) {
				for ( var i = 0; i < modules.length; i++ ) {
					if ( typeof this[ 'destroy' + modules[ i ] ] !== 'undefined' ) {
						this[ 'destroy' + modules[ i ] ]();
					}
				}
			}

			// Destroy all slides
			$.each( this.slides, function( index, element ) {
				element.destroy();
			});

			this.slides.length = 0;

			// Move the slides to their initial position in the DOM and 
			// remove the container elements created dynamically.
			this.$slides.prependTo( this.$slider );
			this.$slidesContainer.remove();
		},

		// Set properties on runtime
		_setProperties: function( properties, store ) {
			// Parse the properties passed as an object
			for ( var prop in properties ) {
				this.settings[ prop ] = properties[ prop ];

				// Alter the original settings as well unless 'false' is passed to the 'store' parameter
				if ( store !== false ) {
					this.originalSettings[ prop ] = properties[ prop ];
				}
			}

			this.update();
		},

		// Attach an event handler to the slider
		on: function( type, callback ) {
			return this.$slider.on( type, callback );
		},

		// Detach an event handler
		off: function( type ) {
			return this.$slider.off( type );
		},

		// Trigger an event on the slider
		trigger: function( data ) {
			return this.$slider.triggerHandler( data );
		},

		// Return the slide at the specified index
		getSlideAt: function( index ) {
			return this.slides[ index ];
		},

		// Return the index of the currently opened slide
		getSelectedSlide: function() {
			return this.selectedSlideIndex;
		},

		// Return the total amount of slides
		getTotalSlides: function() {
			return this.slides.length;
		},

		// The default options of the slider
		defaults: {
			// Width of the slide
			width: 500,

			// Height of the slide
			height: 300,

			// Indicates if the slider is responsive
			responsive: true,

			// The aspect ratio of the slider (width/height)
			aspectRatio: -1,

			// The scale mode for images (cover, contain, exact and none)
			imageScaleMode: 'cover',

			// Indicates if the image will be centered
			centerImage: true,

			// Indicates if the image can be scaled up more than its original size
			allowScaleUp: true,

			// Indicates if height of the slider will be adjusted to the
			// height of the selected slide
			autoHeight: false,

			// Will maintain all the slides at the same height, but will allow the width
			// of the slides to be variable if the orientation of the slides is horizontal
			// and vice-versa if the orientation is vertical
			autoSlideSize: false,

			// Indicates the initially selected slide
			startSlide: 0,

			// Indicates if the slides will be shuffled
			shuffle: false,

			// Indicates whether the slides will be arranged horizontally
			// or vertically. Can be set to 'horizontal' or 'vertical'.
			orientation: 'horizontal',

			// Indicates if the size of the slider will be forced to 'fullWidth' or 'fullWindow'
			forceSize: 'none',

			// Indicates if the slider will be loopable
			loop: true,

			// The distance between slides
			slideDistance: 10,

			// The duration of the slide animation
			slideAnimationDuration: 700,

			// The duration of the height animation
			heightAnimationDuration: 700,

			// Sets the size of the visible area, allowing the increase of it in order
			// to make more slides visible.
			// By default, only the selected slide will be visible. 
			visibleSize: 'auto',

			// Indicates whether the selected slide will be in the center of the slider, when there
			// are more slides visible at a time. If set to false, the selected slide will be in the
			// left side of the slider.
			centerSelectedSlide: true,

			// Indicates if the direction of the slider will be from right to left,
			// instead of the default left to right
			rightToLeft: false,

			// Breakpoints for allowing the slider's options to be changed
			// based on the size of the window.
			breakpoints: null,

			// Called when the slider is initialized
			init: function() {},

			// Called when the slider is updates
			update: function() {},

			// Called when the slider is resized
			sliderResize: function() {},

			// Called when a new slide is selected
			gotoSlide: function() {},

			// Called when the navigation to the newly selected slide is complete
			gotoSlideComplete: function() {},

			// Called when the height animation of the slider is complete
			resizeHeightComplete: function() {},

			// Called when a breakpoint is reached
			breakpointReach: function() {}
		}
	};

	var SliderProSlide = function( slide, index, settings ) {

		// Reference to the slide jQuery element
		this.$slide = slide;

		// Reference to the main slide image
		this.$mainImage = null;

		// Reference to the container that will hold the main image
		this.$imageContainer = null;

		// Indicates whether the slide has a main image
		this.hasMainImage = false;

		// Indicates whether the main image is loaded
		this.isMainImageLoaded = false;

		// Indicates whether the main image is in the process of being loaded
		this.isMainImageLoading = false;

		// Indicates whether the slide has any image. There could be other images (i.e., in layers)
		// besides the main slide image.
		this.hasImages = false;

		// Indicates if all the images in the slide are loaded
		this.areImagesLoaded = false;

		// Indicates if the images inside the slide are in the process of being loaded
		this.areImagesLoading = false;

		// The width and height of the slide
		this.width = 0;
		this.height = 0;

		// Reference to the global settings of the slider
		this.settings = settings;

		// Set the index of the slide
		this.setIndex( index );

		// Initialize the slide
		this._init();
	};

	SliderProSlide.prototype = {

		// The starting point for the slide
		_init: function() {
			var that = this;

			// Mark the slide as initialized
			this.$slide.attr( 'data-init', true );

			// Get the main slide image if there is one
			this.$mainImage = this.$slide.find( '.sp-image' ).length !== 0 ? this.$slide.find( '.sp-image' ) : null;

			// If there is a main slide image, create a container for it and add the image to this container.
			// The container will allow the isolation of the image from the rest of the slide's content. This is
			// helpful when you want to show some content below the image and not cover it.
			if ( this.$mainImage !== null ) {
				this.hasMainImage = true;

				this.$imageContainer = $( '<div class="sp-image-container"></div>' ).prependTo( this.$slide );

				if ( this.$mainImage.parent( 'a' ).length !== 0 ) {
					this.$mainImage.parent( 'a' ).appendTo( this.$imageContainer );
				} else {
					this.$mainImage.appendTo( this.$imageContainer );
				}
			}

			this.hasImages = this.$slide.find( 'img' ).length !== 0 ? true : false;
		},

		// Set the size of the slide
		setSize: function( width, height ) {
			var that = this;

			this.width = width;
			this.height = height;

			this.$slide.css({
				'width': this.width,
				'height': this.height
			});

			if ( this.hasMainImage === true ) {

				// Initially set the width and height of the container to the width and height
				// specified in the settings. This will prevent content overflowing if the width or height
				// are 'auto'. The 'auto' value will be passed only after the image is loaded.
				this.$imageContainer.css({
					'width': this.settings.width,
					'height': this.settings.height
				});

				// Resize the main image if it's loaded. If the 'data-src' attribute is present it means
				// that the image will be lazy-loaded
				if ( typeof this.$mainImage.attr( 'data-src' ) === 'undefined' ) {
					this.resizeMainImage();
				}
			}
		},

		// Get the size (width and height) of the slide
		getSize: function() {
			var that = this,
				size;

			// Check if all images have loaded, and if they have, return the size, else, return
			// the original width and height of the slide
			if ( this.hasImages === true && this.areImagesLoaded === false && this.areImagesLoading === false ) {
				this.areImagesLoading = true;
				
				var status = SliderProUtils.checkImagesStatus( this.$slide );

				if ( status !== 'complete' ) {
					SliderProUtils.checkImagesComplete( this.$slide, function() {
						that.areImagesLoaded = true;
						that.areImagesLoading = false;
						that.trigger({ type: 'imagesLoaded.' + NS, index: that.index });
					});

					// if the image is not loaded yet, return the original width and height of the slider
					return {
						'width': this.settings.width,
						'height': this.settings.height
					};
				}
			}

			size = this.calculateSize();

			return {
				'width': size.width,
				'height': size.height
			};
		},

		// Calculate the width and height of the slide by going
		// through all the child elements and measuring their 'bottom'
		// and 'right' properties. The element with the biggest
		// 'right'/'bottom' property will determine the slide's
		// width/height.
		calculateSize: function() {
			var width = this.$slide.width(),
				height = this.$slide.height();

			this.$slide.children().each(function( index, element ) {
				var child = $( element );

				if ( child.is( ':hidden' ) === true ) {
					return;
				}

				var	rect = element.getBoundingClientRect(),
					bottom = child.position().top + ( rect.bottom - rect.top ),
					right = child.position().left + ( rect.right - rect.left );

				if ( bottom > height ) {
					height = bottom;
				}

				if ( right > width ) {
					width = right;
				}
			});

			return {
				width: width,
				height: height
			};
		},

		// Resize the main image.
		// 
		// Call this when the slide resizes or when the main image has changed to a different image.
		resizeMainImage: function( isNewImage ) {
			var that = this;

			// If the main image has changed, reset the 'flags'
			if ( isNewImage === true ) {
				this.isMainImageLoaded = false;
				this.isMainImageLoading = false;
			}

			// If the image was not loaded yet and it's not in the process of being loaded, load it
			if ( this.isMainImageLoaded === false && this.isMainImageLoading === false ) {
				this.isMainImageLoading = true;

				SliderProUtils.checkImagesComplete( this.$mainImage, function() {
					that.isMainImageLoaded = true;
					that.isMainImageLoading = false;
					that.resizeMainImage();
					that.trigger({ type: 'imagesLoaded.' + NS, index: that.index });
				});

				return;
			}

			// Set the size of the image container element to the proper 'width' and 'height'
			// values, as they were calculated. Previous values were the 'width' and 'height'
			// from the settings. 
			this.$imageContainer.css({
				'width': this.width,
				'height': this.height
			});

			if ( this.settings.allowScaleUp === false ) {
				// reset the image to its natural size
				this.$mainImage.css({ 'width': '', 'height': '', 'maxWidth': '', 'maxHeight': '' });

				// set the boundaries
				this.$mainImage.css({ 'maxWidth': this.$mainImage.width(), 'maxHeight': this.$mainImage.height() });
			}

			// After the main image has loaded, resize it
			if ( this.settings.autoSlideSize === true ) {
				if ( this.settings.orientation === 'horizontal' ) {
					this.$mainImage.css({ width: 'auto', height: '100%' });
				} else if ( this.settings.orientation === 'vertical' ) {
					this.$mainImage.css({ width: '100%', height: 'auto' });
				}
			} else if ( this.settings.autoHeight === true ) {
				this.$mainImage.css({ width: '100%', height: 'auto' });
			} else {
				if ( this.settings.imageScaleMode === 'cover' ) {
					if ( this.$mainImage.width() / this.$mainImage.height() <= this.width / this.height ) {
						this.$mainImage.css({ width: '100%', height: 'auto' });
					} else {
						this.$mainImage.css({ width: 'auto', height: '100%' });
					}
				} else if ( this.settings.imageScaleMode === 'contain' ) {
					if ( this.$mainImage.width() / this.$mainImage.height() >= this.width / this.height ) {
						this.$mainImage.css({ width: '100%', height: 'auto' });
					} else {
						this.$mainImage.css({ width: 'auto', height: '100%' });
					}
				} else if ( this.settings.imageScaleMode === 'exact' ) {
					this.$mainImage.css({ width: '100%', height: '100%' });
				}

				if ( this.settings.centerImage === true ) {
					this.$mainImage.css({ 'marginLeft': ( this.$imageContainer.width() - this.$mainImage.width() ) * 0.5, 'marginTop': ( this.$imageContainer.height() - this.$mainImage.height() ) * 0.5 });
				}
			}
		},

		// Destroy the slide
		destroy: function() {
			// Clean the slide element from attached styles and data
			this.$slide.removeAttr( 'style' );
			this.$slide.removeAttr( 'data-init' );
			this.$slide.removeAttr( 'data-index' );
			this.$slide.removeAttr( 'data-loaded' );

			// If there is a main image, remove its container
			if ( this.hasMainImage === true ) {
				this.$slide.find( '.sp-image' )
					.removeAttr( 'style' )
					.appendTo( this.$slide );

				this.$slide.find( '.sp-image-container' ).remove();
			}
		},

		// Return the index of the slide
		getIndex: function() {
			return this.index;
		},

		// Set the index of the slide
		setIndex: function( index ) {
			this.index = index;
			this.$slide.attr( 'data-index', this.index );
		},

		// Attach an event handler to the slide
		on: function( type, callback ) {
			return this.$slide.on( type, callback );
		},

		// Detach an event handler to the slide
		off: function( type ) {
			return this.$slide.off( type );
		},

		// Trigger an event on the slide
		trigger: function( data ) {
			return this.$slide.triggerHandler( data );
		}
	};

	window.SliderPro = SliderPro;
	window.SliderProSlide = SliderProSlide;

	$.fn.sliderPro = function( options ) {
		var args = Array.prototype.slice.call( arguments, 1 );

		return this.each(function() {
			// Instantiate the slider or alter it
			if ( typeof $( this ).data( 'sliderPro' ) === 'undefined' ) {
				var newInstance = new SliderPro( this, options );

				// Store a reference to the instance created
				$( this ).data( 'sliderPro', newInstance );
			} else if ( typeof options !== 'undefined' ) {
				var	currentInstance = $( this ).data( 'sliderPro' );

				// Check the type of argument passed
				if ( typeof currentInstance[ options ] === 'function' ) {
					currentInstance[ options ].apply( currentInstance, args );
				} else if ( typeof currentInstance.settings[ options ] !== 'undefined' ) {
					var obj = {};
					obj[ options ] = args[ 0 ];
					currentInstance._setProperties( obj );
				} else if ( typeof options === 'object' ) {
					currentInstance._setProperties( options );
				} else {
					$.error( options + ' does not exist in sliderPro.' );
				}
			}
		});
	};

	// Contains useful utility functions
	var SliderProUtils = {

		// Indicates what type of animations are supported in the current browser
		// Can be CSS 3D, CSS 2D or JavaScript
		supportedAnimation: null,

		// Indicates the required vendor prefix for the current browser
		vendorPrefix: null,

		// Indicates the name of the transition's complete event for the current browser
		transitionEvent: null,

		// Indicates if the current browser is Internet Explorer (any version)
		isIE: null,

		// Check whether CSS3 3D or 2D transforms are supported. If they aren't, use JavaScript animations
		getSupportedAnimation: function() {
			if ( this.supportedAnimation !== null ) {
				return this.supportedAnimation;
			}

			var element = document.body || document.documentElement,
				elementStyle = element.style,
				isCSSTransitions = typeof elementStyle.transition !== 'undefined' ||
									typeof elementStyle.WebkitTransition !== 'undefined' ||
									typeof elementStyle.MozTransition !== 'undefined' ||
									typeof elementStyle.OTransition !== 'undefined';

			if ( isCSSTransitions === true ) {
				var div = document.createElement( 'div' );

				// Check if 3D transforms are supported
				if ( typeof div.style.WebkitPerspective !== 'undefined' || typeof div.style.perspective !== 'undefined' ) {
					this.supportedAnimation = 'css-3d';
				}

				// Additional checks for Webkit
				if ( this.supportedAnimation === 'css-3d' && typeof div.styleWebkitPerspective !== 'undefined' ) {
					var style = document.createElement( 'style' );
					style.textContent = '@media (transform-3d),(-webkit-transform-3d){#test-3d{left:9px;position:absolute;height:5px;margin:0;padding:0;border:0;}}';
					document.getElementsByTagName( 'head' )[0].appendChild( style );

					div.id = 'test-3d';
					document.body.appendChild( div );

					if ( ! ( div.offsetLeft === 9 && div.offsetHeight === 5 ) ) {
						this.supportedAnimation = null;
					}

					style.parentNode.removeChild( style );
					div.parentNode.removeChild( div );
				}

				// If CSS 3D transforms are not supported, check if 2D transforms are supported
				if ( this.supportedAnimation === null && ( typeof div.style['-webkit-transform'] !== 'undefined' || typeof div.style.transform !== 'undefined' ) ) {
					this.supportedAnimation = 'css-2d';
				}
			} else {
				this.supportedAnimation = 'javascript';
			}
			
			return this.supportedAnimation;
		},

		// Check what vendor prefix should be used in the current browser
		getVendorPrefix: function() {
			if ( this.vendorPrefix !== null ) {
				return this.vendorPrefix;
			}

			var div = document.createElement( 'div' ),
				prefixes = [ 'Webkit', 'Moz', 'ms', 'O' ];
			
			if ( 'transform' in div.style ) {
				this.vendorPrefix = '';
				return this.vendorPrefix;
			}
			
			for ( var i = 0; i < prefixes.length; i++ ) {
				if ( ( prefixes[ i ] + 'Transform' ) in div.style ) {
					this.vendorPrefix = '-' + prefixes[ i ].toLowerCase() + '-';
					break;
				}
			}
			
			return this.vendorPrefix;
		},

		// Check the name of the transition's complete event in the current browser
		getTransitionEvent: function() {
			if ( this.transitionEvent !== null ) {
				return this.transitionEvent;
			}

			var div = document.createElement( 'div' ),
				transitions = {
					'transition': 'transitionend',
					'WebkitTransition': 'webkitTransitionEnd',
					'MozTransition': 'transitionend',
					'OTransition': 'oTransitionEnd'
				};

			for ( var transition in transitions ) {
				if ( transition in div.style ) {
					this.transitionEvent = transitions[ transition ];
					break;
				}
			}

			return this.transitionEvent;
		},

		// If a single image is passed, check if it's loaded.
		// If a different element is passed, check if there are images
		// inside it, and check if these images are loaded.
		checkImagesComplete: function( target, callback ) {
			var that = this,

				// Check the initial status of the image(s)
				status = this.checkImagesStatus( target );

			// If there are loading images, wait for them to load.
			// If the images are loaded, call the callback function directly.
			if ( status === 'loading' ) {
				var checkImages = setInterval(function() {
					status = that.checkImagesStatus( target );

					if ( status === 'complete' ) {
						clearInterval( checkImages );

						if ( typeof callback === 'function' ) {
							callback();
						}
					}
				}, 100 );
			} else if ( typeof callback === 'function' ) {
				callback();
			}

			return status;
		},

		checkImagesStatus: function( target ) {
			var status = 'complete';

			if ( target.is( 'img' ) && target[0].complete === false ) {
				status = 'loading';
			} else {
				target.find( 'img' ).each(function( index ) {
					var image = $( this )[0];

					if ( image.complete === false ) {
						status = 'loading';
					}
				});
			}

			return status;
		},

		checkIE: function() {
			if ( this.isIE !== null ) {
				return this.isIE;
			}

			var userAgent = window.navigator.userAgent,
				msie = userAgent.indexOf( 'MSIE' );

			if ( userAgent.indexOf( 'MSIE' ) !== -1 || userAgent.match( /Trident.*rv\:11\./ ) ) {
				this.isIE = true;
			} else {
				this.isIE = false;
			}

			return this.isIE;
		}
	};

	window.SliderProUtils = SliderProUtils;

})( window, jQuery );

// Thumbnails module for Slider Pro.
// 
// Adds the possibility to create a thumbnail scroller, each thumbnail
// corresponding to a slide.
;(function( window, $ ) {

	"use strict";

	var NS = 'Thumbnails.' + $.SliderPro.namespace;

	var Thumbnails = {

		// Reference to the thumbnail scroller 
		$thumbnails: null,

		// Reference to the container of the thumbnail scroller
		$thumbnailsContainer: null,

		// List of Thumbnail objects
		thumbnails: null,

		// Index of the selected thumbnail
		selectedThumbnailIndex: 0,

		// Total size (width or height, depending on the orientation) of the thumbnails
		thumbnailsSize: 0,

		// Size of the thumbnail's container
		thumbnailsContainerSize: 0,

		// The position of the thumbnail scroller inside its container
		thumbnailsPosition: 0,

		// Orientation of the thumbnails
		thumbnailsOrientation: null,

		// Indicates the 'left' or 'top' position based on the orientation of the thumbnails
		thumbnailsPositionProperty: null,

		// Indicates if there are thumbnails in the slider
		isThumbnailScroller: false,

		initThumbnails: function() {
			var that = this;

			this.thumbnails = [];

			this.on( 'update.' + NS, $.proxy( this._thumbnailsOnUpdate, this ) );
			this.on( 'sliderResize.' + NS, $.proxy( this._thumbnailsOnResize, this ) );
			this.on( 'gotoSlide.' + NS, function( event ) {
				that._gotoThumbnail( event.index );
			});
		},

		// Called when the slider is updated
		_thumbnailsOnUpdate: function() {
			var that = this;

			if ( this.$slider.find( '.sp-thumbnail' ).length === 0 && this.thumbnails.length === 0 ) {
				this.isThumbnailScroller = false;
				return;
			}

			this.isThumbnailScroller = true;

			// Create the container of the thumbnail scroller, if it wasn't created yet
			if ( this.$thumbnailsContainer === null ) {
				this.$thumbnailsContainer = $( '<div class="sp-thumbnails-container"></div>' ).insertAfter( this.$slidesContainer );
			}

			// If the thumbnails' main container doesn't exist, create it, and get a reference to it
			if ( this.$thumbnails === null ) {
				if ( this.$slider.find( '.sp-thumbnails' ).length !== 0 ) {
					this.$thumbnails = this.$slider.find( '.sp-thumbnails' ).appendTo( this.$thumbnailsContainer );

					// Shuffle/randomize the thumbnails
					if ( this.settings.shuffle === true ) {
						var thumbnails = this.$thumbnails.find( '.sp-thumbnail' ),
							shuffledThumbnails = [];

						// Reposition the thumbnails based on the order of the indexes in the
						// 'shuffledIndexes' array
						$.each( this.shuffledIndexes, function( index, element ) {
							var $thumbnail = $( thumbnails[ element ] );

							if ( $thumbnail.parent( 'a' ).length !== 0 ) {
								$thumbnail = $thumbnail.parent( 'a' );
							}

							shuffledThumbnails.push( $thumbnail );
						});
						
						// Append the sorted thumbnails to the thumbnail scroller
						this.$thumbnails.empty().append( shuffledThumbnails ) ;
					}
				} else {
					this.$thumbnails = $( '<div class="sp-thumbnails"></div>' ).appendTo( this.$thumbnailsContainer );
				}
			}

			// Check if there are thumbnails inside the slides and move them in the thumbnails container
			this.$slides.find( '.sp-thumbnail' ).each( function( index ) {
				var $thumbnail = $( this ),
					thumbnailIndex = $thumbnail.parents( '.sp-slide' ).index(),
					lastThumbnailIndex = that.$thumbnails.find( '.sp-thumbnail' ).length - 1;

				if ( $thumbnail.parent( 'a' ).length !== 0 ) {
					$thumbnail = $thumbnail.parent( 'a' );
				}

				// If the index of the slide that contains the thumbnail is greater than the total number
				// of thumbnails from the thumbnails container, position the thumbnail at the end.
				// Otherwise, add the thumbnails at the corresponding position.
				if ( thumbnailIndex > lastThumbnailIndex ) {
					$thumbnail.appendTo( that.$thumbnails );
				} else {
					$thumbnail.insertBefore( that.$thumbnails.find( '.sp-thumbnail' ).eq( thumbnailIndex ) );
				}
			});

			// Loop through the Thumbnail objects and if a corresponding element is not found in the DOM,
			// it means that the thumbnail might have been removed. In this case, destroy that Thumbnail instance.
			for ( var i = this.thumbnails.length - 1; i >= 0; i-- ) {
				if ( this.$thumbnails.find( '.sp-thumbnail[data-index="' + i + '"]' ).length === 0 ) {
					var thumbnail = this.thumbnails[ i ];

					thumbnail.destroy();
					this.thumbnails.splice( i, 1 );
				}
			}

			// Loop through the thumbnails and if there is any uninitialized thumbnail,
			// initialize it, else update the thumbnail's index.
			this.$thumbnails.find( '.sp-thumbnail' ).each(function( index ) {
				var $thumbnail = $( this );

				if ( typeof $thumbnail.attr( 'data-init' ) === 'undefined' ) {
					that._createThumbnail( $thumbnail, index );
				} else {
					that.thumbnails[ index ].setIndex( index );
				}
			});

			// Remove the previous class that corresponds to the position of the thumbnail scroller
			this.$thumbnailsContainer.removeClass( 'sp-top-thumbnails sp-bottom-thumbnails sp-left-thumbnails sp-right-thumbnails' );

			// Check the position of the thumbnail scroller and assign it the appropriate class and styling
			if ( this.settings.thumbnailsPosition === 'top' ) {
				this.$thumbnailsContainer.addClass( 'sp-top-thumbnails' );
				this.thumbnailsOrientation = 'horizontal';
			} else if ( this.settings.thumbnailsPosition === 'bottom' ) {
				this.$thumbnailsContainer.addClass( 'sp-bottom-thumbnails' );
				this.thumbnailsOrientation = 'horizontal';
			} else if ( this.settings.thumbnailsPosition === 'left' ) {
				this.$thumbnailsContainer.addClass( 'sp-left-thumbnails' );
				this.thumbnailsOrientation = 'vertical';
			} else if ( this.settings.thumbnailsPosition === 'right' ) {
				this.$thumbnailsContainer.addClass( 'sp-right-thumbnails' );
				this.thumbnailsOrientation = 'vertical';
			}

			// Check if the pointer needs to be created
			if ( this.settings.thumbnailPointer === true ) {
				this.$thumbnailsContainer.addClass( 'sp-has-pointer' );
			} else {
				this.$thumbnailsContainer.removeClass( 'sp-has-pointer' );
			}

			// Mark the thumbnail that corresponds to the selected slide
			this.selectedThumbnailIndex = this.selectedSlideIndex;
			this.$thumbnails.find( '.sp-thumbnail-container' ).eq( this.selectedThumbnailIndex ).addClass( 'sp-selected-thumbnail' );
			
			// Calculate the total size of the thumbnails
			this.thumbnailsSize = 0;

			$.each( this.thumbnails, function( index, thumbnail ) {
				thumbnail.setSize( that.settings.thumbnailWidth, that.settings.thumbnailHeight );
				that.thumbnailsSize += that.thumbnailsOrientation === 'horizontal' ? thumbnail.getSize().width : thumbnail.getSize().height;
			});

			// Set the size of the thumbnails
			if ( this.thumbnailsOrientation === 'horizontal' ) {
				this.$thumbnails.css({ 'width': this.thumbnailsSize, 'height': this.settings.thumbnailHeight });
				this.$thumbnailsContainer.css( 'height', '' );
				this.thumbnailsPositionProperty = 'left';
			} else {
				this.$thumbnails.css({ 'width': this.settings.thumbnailWidth, 'height': this.thumbnailsSize });
				this.$thumbnailsContainer.css( 'width', '' );
				this.thumbnailsPositionProperty = 'top';
			}

			// Fire the 'thumbnailsUpdate' event
			this.trigger({ type: 'thumbnailsUpdate' });
			if ( $.isFunction( this.settings.thumbnailsUpdate ) ) {
				this.settings.thumbnailsUpdate.call( this, { type: 'thumbnailsUpdate' } );
			}
		},

		// Create an individual thumbnail
		_createThumbnail: function( element, index ) {
			var that = this,
				thumbnail = new Thumbnail( element, this.$thumbnails, index );

			// When the thumbnail is clicked, navigate to the corresponding slide
			thumbnail.on( 'thumbnailClick.' + NS, function( event ) {
				that.gotoSlide( event.index );
			});

			// Add the thumbnail at the specified index
			this.thumbnails.splice( index, 0, thumbnail );
		},

		// Called when the slider is resized.
		// Resets the size and position of the thumbnail scroller container.
		_thumbnailsOnResize: function() {
			if ( this.isThumbnailScroller === false ) {
				return;
			}

			var that = this,
				newThumbnailsPosition;

			if ( this.thumbnailsOrientation === 'horizontal' ) {
				this.thumbnailsContainerSize = Math.min( this.$slidesMask.width(), this.thumbnailsSize );
				this.$thumbnailsContainer.css( 'width', this.thumbnailsContainerSize );

				// Reduce the slide mask's height, to make room for the thumbnails
				if ( this.settings.forceSize === 'fullWindow' ) {
					this.$slidesMask.css( 'height', this.$slidesMask.height() - this.$thumbnailsContainer.outerHeight( true ) );

					// Resize the slides
					this.slideHeight = this.$slidesMask.height();
					this._resizeSlides();

					// Re-arrange the slides
					this._resetSlidesPosition();
				}
			} else if ( this.thumbnailsOrientation === 'vertical' ) {

				// Check if the width of the slide mask plus the width of the thumbnail scroller is greater than
				// the width of the slider's container and if that's the case, reduce the slides container width
				// in order to make the entire slider fit inside the slider's container.
				if ( this.$slidesMask.width() + this.$thumbnailsContainer.outerWidth( true ) > this.$slider.parent().width() ) {
					// Reduce the slider's width, to make room for the thumbnails
					if ( this.settings.forceSize === 'fullWidth' || this.settings.forceSize === 'fullWindow' ) {
						this.$slider.css( 'max-width', $( window ).width() - this.$thumbnailsContainer.outerWidth( true ) );
					} else {
						this.$slider.css( 'max-width', this.$slider.parent().width() - this.$thumbnailsContainer.outerWidth( true ) );
					}
					
					this.$slidesMask.css( 'width', this.$slider.width() );

					// If the slides are vertically oriented, update the width and height (to maintain the aspect ratio)
					// of the slides.
					if ( this.settings.orientation === 'vertical' ) {
						this.slideWidth = this.$slider.width();

						this._resizeSlides();
					}

					// Re-arrange the slides
					this._resetSlidesPosition();
				}

				this.thumbnailsContainerSize = Math.min( this.$slidesMask.height(), this.thumbnailsSize );
				this.$thumbnailsContainer.css( 'height', this.thumbnailsContainerSize );
			}

			// If the total size of the thumbnails is smaller than the thumbnail scroller' container (which has
			// the same size as the slides container), it means that all the thumbnails will be visible, so set
			// the position of the thumbnail scroller to 0.
			// 
			// If that's not the case, the thumbnail scroller will be positioned based on which thumbnail is selected.
			if ( this.thumbnailsSize <= this.thumbnailsContainerSize || this.$thumbnails.find( '.sp-selected-thumbnail' ).length === 0 ) {
				newThumbnailsPosition = 0;
			} else {
				newThumbnailsPosition = Math.max( - this.thumbnails[ this.selectedThumbnailIndex ].getPosition()[ this.thumbnailsPositionProperty ], this.thumbnailsContainerSize - this.thumbnailsSize );
			}

			// Add a padding to the slider, based on the thumbnail scroller's orientation, to make room
			// for the thumbnails.
			if ( this.settings.thumbnailsPosition === 'top' ) {
				this.$slider.css({ 'paddingTop': this.$thumbnailsContainer.outerHeight( true ), 'paddingLeft': '', 'paddingRight': '' });
			} else if ( this.settings.thumbnailsPosition === 'bottom' ) {
				this.$slider.css({ 'paddingTop': '', 'paddingLeft': '', 'paddingRight': '' });
			} else if ( this.settings.thumbnailsPosition === 'left' ) {
				this.$slider.css({ 'paddingTop': '', 'paddingLeft': this.$thumbnailsContainer.outerWidth( true ), 'paddingRight': '' });
			} else if ( this.settings.thumbnailsPosition === 'right' ) {
				this.$slider.css({ 'paddingTop': '', 'paddingLeft': '', 'paddingRight': this.$thumbnailsContainer.outerWidth( true ) });
			}

			this._moveThumbnailsTo( newThumbnailsPosition, true );
		},

		// Selects the thumbnail at the indicated index and moves the thumbnail scroller
		// accordingly.
		_gotoThumbnail: function( index ) {
			if ( this.isThumbnailScroller === false || typeof this.thumbnails[ index ] === 'undefined' ) {
				return;
			}

			var previousIndex = this.selectedThumbnailIndex,
				newThumbnailsPosition = this.thumbnailsPosition;

			this.selectedThumbnailIndex = index;

			// Set the 'selected' class to the appropriate thumbnail
			this.$thumbnails.find( '.sp-selected-thumbnail' ).removeClass( 'sp-selected-thumbnail' );
			this.$thumbnails.find( '.sp-thumbnail-container' ).eq( this.selectedThumbnailIndex ).addClass( 'sp-selected-thumbnail' );

			// Calculate the new position that the thumbnail scroller needs to go to.
			// 
			// If the selected thumbnail has a higher index than the previous one, make sure that the thumbnail
			// that comes after the selected thumbnail will be visible, if the selected thumbnail is not the
			// last thumbnail in the list.
			// 
			// If the selected thumbnail has a lower index than the previous one, make sure that the thumbnail
			// that's before the selected thumbnail will be visible, if the selected thumbnail is not the
			// first thumbnail in the list.
			if ( this.settings.rightToLeft === true && this.thumbnailsOrientation === 'horizontal' ) {
				if ( this.selectedThumbnailIndex >= previousIndex ) {
					var rtlNextThumbnailIndex = this.selectedThumbnailIndex === this.thumbnails.length - 1 ? this.selectedThumbnailIndex : this.selectedThumbnailIndex + 1,
						rtlNextThumbnail = this.thumbnails[ rtlNextThumbnailIndex ];

					if ( rtlNextThumbnail.getPosition().left < - this.thumbnailsPosition ) {
						newThumbnailsPosition = - rtlNextThumbnail.getPosition().left;
					}
				} else if ( this.selectedThumbnailIndex < previousIndex ) {
					var rtlPreviousThumbnailIndex = this.selectedThumbnailIndex === 0 ? this.selectedThumbnailIndex : this.selectedThumbnailIndex - 1,
						rtlPreviousThumbnail = this.thumbnails[ rtlPreviousThumbnailIndex ],
						rtlThumbnailsRightPosition = - this.thumbnailsPosition + this.thumbnailsContainerSize;

					if ( rtlPreviousThumbnail.getPosition().right > rtlThumbnailsRightPosition ) {
						newThumbnailsPosition = this.thumbnailsPosition - ( rtlPreviousThumbnail.getPosition().right - rtlThumbnailsRightPosition );
					}
				}
			} else {
				if ( this.selectedThumbnailIndex >= previousIndex ) {
					var nextThumbnailIndex = this.selectedThumbnailIndex === this.thumbnails.length - 1 ? this.selectedThumbnailIndex : this.selectedThumbnailIndex + 1,
						nextThumbnail = this.thumbnails[ nextThumbnailIndex ],
						nextThumbnailPosition = this.thumbnailsOrientation === 'horizontal' ? nextThumbnail.getPosition().right : nextThumbnail.getPosition().bottom,
						thumbnailsRightPosition = - this.thumbnailsPosition + this.thumbnailsContainerSize;

					if ( nextThumbnailPosition > thumbnailsRightPosition ) {
						newThumbnailsPosition = this.thumbnailsPosition - ( nextThumbnailPosition - thumbnailsRightPosition );
					}
				} else if ( this.selectedThumbnailIndex < previousIndex ) {
					var previousThumbnailIndex = this.selectedThumbnailIndex === 0 ? this.selectedThumbnailIndex : this.selectedThumbnailIndex - 1,
						previousThumbnail = this.thumbnails[ previousThumbnailIndex ],
						previousThumbnailPosition = this.thumbnailsOrientation === 'horizontal' ? previousThumbnail.getPosition().left : previousThumbnail.getPosition().top;

					if ( previousThumbnailPosition < - this.thumbnailsPosition ) {
						newThumbnailsPosition = - previousThumbnailPosition;
					}
				}
			}

			// Move the thumbnail scroller to the calculated position
			this._moveThumbnailsTo( newThumbnailsPosition );

			// Fire the 'gotoThumbnail' event
			this.trigger({ type: 'gotoThumbnail' });
			if ( $.isFunction( this.settings.gotoThumbnail ) ) {
				this.settings.gotoThumbnail.call( this, { type: 'gotoThumbnail' });
			}
		},

		// Move the thumbnail scroller to the indicated position
		_moveThumbnailsTo: function( position, instant, callback ) {
			var that = this,
				css = {};

			// Return if the position hasn't changed
			if ( position === this.thumbnailsPosition ) {
				return;
			}

			this.thumbnailsPosition = position;

			// Use CSS transitions if they are supported. If not, use JavaScript animation
			if ( this.supportedAnimation === 'css-3d' || this.supportedAnimation === 'css-2d' ) {
				var transition,
					left = this.thumbnailsOrientation === 'horizontal' ? position : 0,
					top = this.thumbnailsOrientation === 'horizontal' ? 0 : position;

				if ( this.supportedAnimation === 'css-3d' ) {
					css[ this.vendorPrefix + 'transform' ] = 'translate3d(' + left + 'px, ' + top + 'px, 0)';
				} else {
					css[ this.vendorPrefix + 'transform' ] = 'translate(' + left + 'px, ' + top + 'px)';
				}

				if ( typeof instant !== 'undefined' && instant === true ) {
					transition = '';
				} else {
					this.$thumbnails.addClass( 'sp-animated' );
					transition = this.vendorPrefix + 'transform ' + 700 / 1000 + 's';

					this.$thumbnails.on( this.transitionEvent, function( event ) {
						if ( event.target !== event.currentTarget ) {
							return;
						}

						that.$thumbnails.off( that.transitionEvent );
						that.$thumbnails.removeClass( 'sp-animated' );

						if ( typeof callback === 'function' ) {
							callback();
						}

						// Fire the 'thumbnailsMoveComplete' event
						that.trigger({ type: 'thumbnailsMoveComplete' });
						if ( $.isFunction( that.settings.thumbnailsMoveComplete ) ) {
							that.settings.thumbnailsMoveComplete.call( that, { type: 'thumbnailsMoveComplete' });
						}
					});
				}

				css[ this.vendorPrefix + 'transition' ] = transition;

				this.$thumbnails.css( css );
			} else {
				css[ 'margin-' + this.thumbnailsPositionProperty ] = position;

				if ( typeof instant !== 'undefined' && instant === true ) {
					this.$thumbnails.css( css );
				} else {
					this.$thumbnails
						.addClass( 'sp-animated' )
						.animate( css, 700, function() {
							that.$thumbnails.removeClass( 'sp-animated' );

							if ( typeof callback === 'function' ) {
								callback();
							}

							// Fire the 'thumbnailsMoveComplete' event
							that.trigger({ type: 'thumbnailsMoveComplete' });
							if ( $.isFunction( that.settings.thumbnailsMoveComplete ) ) {
								that.settings.thumbnailsMoveComplete.call( that, { type: 'thumbnailsMoveComplete' });
							}
						});
				}
			}
		},

		// Stop the movement of the thumbnail scroller
		_stopThumbnailsMovement: function() {
			var css = {};

			if ( this.supportedAnimation === 'css-3d' || this.supportedAnimation === 'css-2d' ) {
				var	matrixString = this.$thumbnails.css( this.vendorPrefix + 'transform' ),
					matrixType = matrixString.indexOf( 'matrix3d' ) !== -1 ? 'matrix3d' : 'matrix',
					matrixArray = matrixString.replace( matrixType, '' ).match( /-?[0-9\.]+/g ),
					left = matrixType === 'matrix3d' ? parseInt( matrixArray[ 12 ], 10 ) : parseInt( matrixArray[ 4 ], 10 ),
					top = matrixType === 'matrix3d' ? parseInt( matrixArray[ 13 ], 10 ) : parseInt( matrixArray[ 5 ], 10 );

				if ( this.supportedAnimation === 'css-3d' ) {
					css[ this.vendorPrefix + 'transform' ] = 'translate3d(' + left + 'px, ' + top + 'px, 0)';
				} else {
					css[ this.vendorPrefix + 'transform' ] = 'translate(' + left + 'px, ' + top + 'px)';
				}

				css[ this.vendorPrefix + 'transition' ] = '';

				this.$thumbnails.css( css );
				this.$thumbnails.off( this.transitionEvent );
				this.thumbnailsPosition = this.thumbnailsOrientation === 'horizontal' ? parseInt( matrixArray[ 4 ] , 10 ) : parseInt( matrixArray[ 5 ] , 10 );
			} else {
				this.$thumbnails.stop();
				this.thumbnailsPosition = parseInt( this.$thumbnails.css( 'margin-' + this.thumbnailsPositionProperty ), 10 );
			}

			this.$thumbnails.removeClass( 'sp-animated' );
		},

		// Destroy the module
		destroyThumbnails: function() {
			var that = this;

			// Remove event listeners
			this.off( 'update.' + NS );

			if ( this.isThumbnailScroller === false ) {
				return;
			}
			
			this.off( 'sliderResize.' + NS );
			this.off( 'gotoSlide.' + NS );
			$( window ).off( 'resize.' + this.uniqueId + '.' + NS );

			// Destroy the individual thumbnails
			this.$thumbnails.find( '.sp-thumbnail' ).each( function() {
				var $thumbnail = $( this ),
					index = parseInt( $thumbnail.attr( 'data-index' ), 10 ),
					thumbnail = that.thumbnails[ index ];

				thumbnail.off( 'thumbnailClick.' + NS );
				thumbnail.destroy();
			});

			this.thumbnails.length = 0;

			// Add the thumbnail scroller directly in the slider and
			// remove the thumbnail scroller container
			this.$thumbnails.appendTo( this.$slider );
			this.$thumbnailsContainer.remove();
			
			// Remove any created padding
			this.$slider.css({ 'paddingTop': '', 'paddingLeft': '', 'paddingRight': '' });
		},

		thumbnailsDefaults: {

			// Sets the width of the thumbnail
			thumbnailWidth: 100,

			// Sets the height of the thumbnail
			thumbnailHeight: 80,

			// Sets the position of the thumbnail scroller (top, bottom, right, left)
			thumbnailsPosition: 'bottom',

			// Indicates if a pointer will be displayed for the selected thumbnail
			thumbnailPointer: false,

			// Called when the thumbnails are updated
			thumbnailsUpdate: function() {},

			// Called when a new thumbnail is selected
			gotoThumbnail: function() {},

			// Called when the thumbnail scroller has moved
			thumbnailsMoveComplete: function() {}
		}
	};

	var Thumbnail = function( thumbnail, thumbnails, index ) {

		// Reference to the thumbnail jQuery element
		this.$thumbnail = thumbnail;

		// Reference to the thumbnail scroller
		this.$thumbnails = thumbnails;

		// Reference to the thumbnail's container, which will be 
		// created dynamically.
		this.$thumbnailContainer = null;

		// The width and height of the thumbnail
		this.width = 0;
		this.height = 0;

		// Indicates whether the thumbnail's image is loaded
		this.isImageLoaded = false;

		// Set the index of the slide
		this.setIndex( index );

		// Initialize the thumbnail
		this._init();
	};

	Thumbnail.prototype = {

		_init: function() {
			var that = this;

			// Mark the thumbnail as initialized
			this.$thumbnail.attr( 'data-init', true );

			// Create a container for the thumbnail and add the original thumbnail to this container.
			// Having a container will help crop the thumbnail image if it's too large.
			this.$thumbnailContainer = $( '<div class="sp-thumbnail-container"></div>' ).appendTo( this.$thumbnails );

			if ( this.$thumbnail.parent( 'a' ).length !== 0 ) {
				this.$thumbnail.parent( 'a' ).appendTo( this.$thumbnailContainer );
			} else {
				this.$thumbnail.appendTo( this.$thumbnailContainer );
			}

			// When the thumbnail container is clicked, fire an event
			this.$thumbnailContainer.on( 'click.' + NS, function() {
				that.trigger({ type: 'thumbnailClick.' + NS, index: that.index });
			});
		},

		// Set the width and height of the thumbnail
		setSize: function( width, height ) {
			this.width = width;
			this.height = height;

			// Apply the width and height to the thumbnail's container
			this.$thumbnailContainer.css({ 'width': this.width, 'height': this.height });

			// If there is an image, resize it to fit the thumbnail container
			if ( this.$thumbnail.is( 'img' ) && typeof this.$thumbnail.attr( 'data-src' ) === 'undefined' ) {
				this.resizeImage();
			}
		},

		// Return the width and height of the thumbnail
		getSize: function() {
			return {
				width: this.$thumbnailContainer.outerWidth( true ),
				height: this.$thumbnailContainer.outerHeight( true )
			};
		},

		// Return the top, bottom, left and right position of the thumbnail
		getPosition: function() {
			return {
				left: this.$thumbnailContainer.position().left + parseInt( this.$thumbnailContainer.css( 'marginLeft' ) , 10 ),
				right: this.$thumbnailContainer.position().left + parseInt( this.$thumbnailContainer.css( 'marginLeft' ) , 10 ) + this.$thumbnailContainer.outerWidth(),
				top: this.$thumbnailContainer.position().top + parseInt( this.$thumbnailContainer.css( 'marginTop' ) , 10 ),
				bottom: this.$thumbnailContainer.position().top + parseInt( this.$thumbnailContainer.css( 'marginTop' ) , 10 ) + this.$thumbnailContainer.outerHeight()
			};
		},

		// Set the index of the thumbnail
		setIndex: function( index ) {
			this.index = index;
			this.$thumbnail.attr( 'data-index', this.index );
		},

		// Resize the thumbnail's image
		resizeImage: function() {
			var that = this;

			// If the image is not loaded yet, load it
			if ( this.isImageLoaded === false ) {
				SliderProUtils.checkImagesComplete( this.$thumbnailContainer , function() {
					that.isImageLoaded = true;
					that.resizeImage();
				});

				return;
			}

			// Get the reference to the thumbnail image again because it was replaced by
			// another img element during the loading process
			this.$thumbnail = this.$thumbnailContainer.find( '.sp-thumbnail' );

			// Calculate whether the image should stretch horizontally or vertically
			var imageWidth = this.$thumbnail.width(),
				imageHeight = this.$thumbnail.height();

			if ( imageWidth / imageHeight <= this.width / this.height ) {
				this.$thumbnail.css({ width: '100%', height: 'auto' });
			} else {
				this.$thumbnail.css({ width: 'auto', height: '100%' });
			}

			this.$thumbnail.css({ 'marginLeft': ( this.$thumbnailContainer.width() - this.$thumbnail.width() ) * 0.5, 'marginTop': ( this.$thumbnailContainer.height() - this.$thumbnail.height() ) * 0.5 });
		},

		// Destroy the thumbnail
		destroy: function() {
			this.$thumbnailContainer.off( 'click.' + NS );

			// Remove added attributes
			this.$thumbnail.removeAttr( 'data-init' );
			this.$thumbnail.removeAttr( 'data-index' );

			// Remove the thumbnail's container and add the thumbnail
			// back to the thumbnail scroller container
			if ( this.$thumbnail.parent( 'a' ).length !== 0 ) {
				this.$thumbnail.parent( 'a' ).insertBefore( this.$thumbnailContainer );
			} else {
				this.$thumbnail.insertBefore( this.$thumbnailContainer );
			}
			
			this.$thumbnailContainer.remove();
		},

		// Attach an event handler to the slide
		on: function( type, callback ) {
			return this.$thumbnailContainer.on( type, callback );
		},

		// Detach an event handler to the slide
		off: function( type ) {
			return this.$thumbnailContainer.off( type );
		},

		// Trigger an event on the slide
		trigger: function( data ) {
			return this.$thumbnailContainer.triggerHandler( data );
		}
	};

	$.SliderPro.addModule( 'Thumbnails', Thumbnails );

})( window, jQuery );

// ConditionalImages module for Slider Pro.
// 
// Adds the possibility to specify multiple sources for each image and
// load the image that's the most appropriate for the size of the slider.
// For example, instead of loading a large image even if the slider will be small
// you can specify a smaller image that will be loaded instead.
;(function( window, $ ) {

	"use strict";

	var NS = 'ConditionalImages.' + $.SliderPro.namespace;

	var ConditionalImages = {

		// Reference to the previous size
		previousImageSize: null,

		// Reference to the current size
		currentImageSize: null,

		// Indicates if the current display supports high PPI
		isRetinaScreen: false,

		initConditionalImages: function() {
			this.currentImageSize = this.previousImageSize = 'default';
			this.isRetinaScreen = ( typeof this._isRetina !== 'undefined' ) && ( this._isRetina() === true );

			this.on( 'update.' + NS, $.proxy( this._conditionalImagesOnUpdate, this ) );
			this.on( 'sliderResize.' + NS, $.proxy( this._conditionalImagesOnResize, this ) );
		},

		// Loop through all the existing images and specify the original path of the image
		// inside the 'data-default' attribute.
		_conditionalImagesOnUpdate: function() {
			$.each( this.slides, function( index, element ) {
				var $slide = element.$slide;

				$slide.find( 'img:not([ data-default ])' ).each(function() {
					var $image = $( this );

					if ( typeof $image.attr( 'data-src' ) !== 'undefined' ) {
						$image.attr( 'data-default', $image.attr( 'data-src' ) );
					} else {
						$image.attr( 'data-default', $image.attr( 'src' ) );
					}
				});
			});
		},

		// When the window resizes, identify the applyable image size based on the current size of the slider
		// and apply it to all images that have a version of the image specified for this size.
		_conditionalImagesOnResize: function() {
			if ( this.slideWidth <= this.settings.smallSize ) {
				this.currentImageSize = 'small';
			} else if ( this.slideWidth <= this.settings.mediumSize ) {
				this.currentImageSize = 'medium';
			} else if ( this.slideWidth <= this.settings.largeSize ) {
				this.currentImageSize = 'large';
			} else {
				this.currentImageSize = 'default';
			}

			if ( this.previousImageSize !== this.currentImageSize ) {
				var that = this;

				$.each( this.slides, function( index, element ) {
					var $slide = element.$slide;

					$slide.find( 'img' ).each(function() {
						var $image = $( this ),
							imageSource = '';

						// Check if the current display supports high PPI and if a retina version of the current size was specified
						if ( that.isRetinaScreen === true && typeof $image.attr( 'data-retina' + that.currentImageSize ) !== 'undefined' ) {
							imageSource = $image.attr( 'data-retina' + that.currentImageSize );

							// If the retina image was not loaded yet, replace the default image source with the one
							// that corresponds to the current slider size
							if ( typeof $image.attr( 'data-retina' ) !== 'undefined' && $image.attr( 'data-retina' ) !== imageSource ) {
								$image.attr( 'data-retina', imageSource );
							}
						} else if ( ( that.isRetinaScreen === false || that.isRetinaScreen === true && typeof $image.attr( 'data-retina' ) === 'undefined' ) && typeof $image.attr( 'data-' + that.currentImageSize ) !== 'undefined' ) {
							imageSource = $image.attr( 'data-' + that.currentImageSize );

							// If the image is set to lazy load, replace the image source with the one
							// that corresponds to the current slider size
							if ( typeof $image.attr( 'data-src' ) !== 'undefined' && $image.attr( 'data-src' ) !== imageSource ) {
								$image.attr( 'data-src', imageSource );
							}
						}

						// If a new image was found
						if ( imageSource !== '' ) {

							// The existence of the 'data-src' attribute indicates that the image
							// will be lazy loaded, so don't load the new image yet
							if ( typeof $image.attr( 'data-src' ) === 'undefined' && $image.attr( 'src' ) !== imageSource  ) {
								that._loadConditionalImage( $image, imageSource, function( newImage ) {
									if ( newImage.hasClass( 'sp-image' ) ) {
										element.$mainImage = newImage;
										element.resizeMainImage( true );
									}
								});
							}
						}
					});
				});

				this.previousImageSize = this.currentImageSize;
			}
		},

		// Replace the target image with a new image
		_loadConditionalImage: function( image, source, callback ) {

			// Create a new image element
			var newImage = $( new Image() );

			// Copy the class(es) and inline style
			newImage.attr( 'class', image.attr( 'class' ) );
			newImage.attr( 'style', image.attr( 'style' ) );

			// Copy the data attributes
			$.each( image.data(), function( name, value ) {
				newImage.attr( 'data-' + name, value );
			});

			// Copy the width and height attributes if they exist
			if ( typeof image.attr( 'width' ) !== 'undefined') {
				newImage.attr( 'width', image.attr( 'width' ) );
			}

			if ( typeof image.attr( 'height' ) !== 'undefined') {
				newImage.attr( 'height', image.attr( 'height' ) );
			}

			if ( typeof image.attr( 'alt' ) !== 'undefined' ) {
				newImage.attr( 'alt', image.attr( 'alt' ) );
			}

			if ( typeof image.attr( 'title' ) !== 'undefined' ) {
				newImage.attr( 'title', image.attr( 'title' ) );
			}

			newImage.attr( 'src', source );

			// Add the new image in the same container and remove the older image
			newImage.insertAfter( image );
			image.remove();
			image = null;
				
			if ( typeof callback === 'function' ) {
				callback( newImage );
			}
		},

		// Destroy the module
		destroyConditionalImages: function() {
			this.off( 'update.' + NS );
			this.off( 'sliderResize.' + NS );
		},

		conditionalImagesDefaults: {

			// If the slider size is below this size, the small version of the images will be used
			smallSize: 480,

			// If the slider size is below this size, the small version of the images will be used
			mediumSize: 768,

			// If the slider size is below this size, the small version of the images will be used
			largeSize: 1024
		}
	};

	$.SliderPro.addModule( 'ConditionalImages', ConditionalImages );

})( window, jQuery );

// Retina module for Slider Pro.
// 
// Adds the possibility to load a different image when the slider is
// viewed on a retina screen.
;(function( window, $ ) {

	"use strict";
	
	var NS = 'Retina.' + $.SliderPro.namespace;

	var Retina = {

		initRetina: function() {
			var that = this;

			// Return if it's not a retina screen
			if ( this._isRetina() === false ) {
				return;
			}
			
			this.on( 'update.' + NS, $.proxy( this._checkRetinaImages, this ) );

			if ( this.$slider.find( '.sp-thumbnail' ).length !== 0 ) {
				this.on( 'update.Thumbnails.' + NS, $.proxy( this._checkRetinaThumbnailImages, this ) );
			}
		},

		// Checks if the current display supports high PPI
		_isRetina: function() {
			if ( window.devicePixelRatio >= 2 ) {
				return true;
			}

			if ( window.matchMedia && ( window.matchMedia( "(-webkit-min-device-pixel-ratio: 2),(min-resolution: 2dppx)" ).matches ) ) {
				return true;
			}

			return false;
		},

		// Loop through the slides and replace the images with their retina version
		_checkRetinaImages: function() {
			var that = this;

			$.each( this.slides, function( index, element ) {
				var $slide = element.$slide;

				if ( typeof $slide.attr( 'data-retina-loaded' ) === 'undefined' ) {
					$slide.attr( 'data-retina-loaded', true );

					$slide.find( 'img[data-retina]' ).each(function() {
						var $image = $( this );

						if ( typeof $image.attr( 'data-src' ) !== 'undefined' ) {
							$image.attr( 'data-src', $image.attr( 'data-retina' ) );
						} else {
							that._loadRetinaImage( $image, function( newImage ) {
								if ( newImage.hasClass( 'sp-image' ) ) {
									element.$mainImage = newImage;
									element.resizeMainImage( true );
								}
							});
						}
					});
				}
			});
		},

		// Loop through the thumbnails and replace the images with their retina version
		_checkRetinaThumbnailImages: function() {
			var that = this;

			$.each( this.thumbnails, function( index, element ) {
				var $thumbnail = element.$thumbnailContainer;

				if ( typeof $thumbnail.attr( 'data-retina-loaded' ) === 'undefined' ) {
					$thumbnail.attr( 'data-retina-loaded', true );

					$thumbnail.find( 'img[data-retina]' ).each(function() {
						var $image = $( this );

						if ( typeof $image.attr( 'data-src' ) !== 'undefined' ) {
							$image.attr( 'data-src', $image.attr( 'data-retina' ) );
						} else {
							that._loadRetinaImage( $image, function( newImage ) {
								if ( newImage.hasClass( 'sp-thumbnail' ) ) {
									element.resizeImage();
								}
							});
						}
					});
				}
			});
		},

		// Load the retina image
		_loadRetinaImage: function( image, callback ) {
			var retinaFound = false,
				newImagePath = '';

			// Check if there is a retina image specified
			if ( typeof image.attr( 'data-retina' ) !== 'undefined' ) {
				retinaFound = true;

				newImagePath = image.attr( 'data-retina' );
			}

			// Check if there is a lazy loaded, non-retina, image specified
			if ( typeof image.attr( 'data-src' ) !== 'undefined' ) {
				if ( retinaFound === false ) {
					newImagePath = image.attr( 'data-src') ;
				}

				image.removeAttr('data-src');
			}

			// Return if there isn't a retina or lazy loaded image
			if ( newImagePath === '' ) {
				return;
			}

			// Create a new image element
			var newImage = $( new Image() );

			// Copy the class(es) and inline style
			newImage.attr( 'class', image.attr('class') );
			newImage.attr( 'style', image.attr('style') );

			// Copy the data attributes
			$.each( image.data(), function( name, value ) {
				newImage.attr( 'data-' + name, value );
			});

			// Copy the width and height attributes if they exist
			if ( typeof image.attr( 'width' ) !== 'undefined' ) {
				newImage.attr( 'width', image.attr( 'width' ) );
			}

			if ( typeof image.attr( 'height' ) !== 'undefined' ) {
				newImage.attr( 'height', image.attr( 'height' ) );
			}

			if ( typeof image.attr( 'alt' ) !== 'undefined' ) {
				newImage.attr( 'alt', image.attr( 'alt' ) );
			}

			if ( typeof image.attr( 'title' ) !== 'undefined' ) {
				newImage.attr( 'title', image.attr( 'title' ) );
			}

			// Add the new image in the same container and remove the older image
			newImage.insertAfter( image );
			image.remove();
			image = null;

			// Assign the source of the image
			newImage.attr( 'src', newImagePath );

			if ( typeof callback === 'function' ) {
				callback( newImage );
			}
		},

		// Destroy the module
		destroyRetina: function() {
			this.off( 'update.' + NS );
			this.off( 'update.Thumbnails.' + NS );
		}
	};

	$.SliderPro.addModule( 'Retina', Retina );
	
})( window, jQuery );

// Lazy Loading module for Slider Pro.
// 
// Adds the possibility to delay the loading of the images until the slides/thumbnails
// that contain them become visible. This technique improves the initial loading
// performance.
;(function( window, $ ) {

	"use strict";

	var NS = 'LazyLoading.' + $.SliderPro.namespace;

	var LazyLoading = {

		allowLazyLoadingCheck: true,

		initLazyLoading: function() {
			var that = this;

			// The 'resize' event is fired after every update, so it's possible to use it for checking
			// if the update made new slides become visible
			// 
			// Also, resizing the slider might make new slides or thumbnails visible
			this.on( 'sliderResize.' + NS, $.proxy( this._lazyLoadingOnResize, this ) );

			// Check visible images when a new slide is selected
			this.on( 'gotoSlide.' + NS, $.proxy( this._checkAndLoadVisibleImages, this ) );

			// Check visible thumbnail images when the thumbnails are updated because new thumbnail
			// might have been added or the settings might have been changed so that more thumbnail
			// images become visible
			// 
			// Also, check visible thumbnail images after the thumbnails have moved because new thumbnails might
			// have become visible
			this.on( 'thumbnailsUpdate.' + NS + ' ' + 'thumbnailsMoveComplete.' + NS, $.proxy( this._checkAndLoadVisibleThumbnailImages, this ) );
		},

		_lazyLoadingOnResize: function() {
			var that = this;

			if ( this.allowLazyLoadingCheck === false ) {
				return;
			}

			this.allowLazyLoadingCheck = false;
			
			this._checkAndLoadVisibleImages();

			if ( this.$slider.find( '.sp-thumbnail' ).length !== 0 ) {
				this._checkAndLoadVisibleThumbnailImages();
			}

			// Use a timer to deffer the loading of images in order to prevent too many
			// checking attempts
			setTimeout(function() {
				that.allowLazyLoadingCheck = true;
			}, 500 );
		},

		// Check visible slides and load their images
		_checkAndLoadVisibleImages: function() {
			if ( this.$slider.find( '.sp-slide:not([ data-loaded ])' ).length === 0 ) {
				return;
			}

			var that = this,

				// Use either the middle position or the index of the selected slide as a reference, depending on
				// whether the slider is loopable
				referencePosition = this.settings.loop === true ? this.middleSlidePosition : this.selectedSlideIndex,

				// Calculate how many slides are visible at the sides of the selected slide
				visibleOnSides = Math.ceil( ( parseInt( this.$slidesMask.css( this.sizeProperty ), 10) - this.averageSlideSize ) / 2 / this.averageSlideSize ),

				// Calculate the indexes of the first and last slide that will be checked
				from = referencePosition - visibleOnSides - 1 > 0 ? referencePosition - visibleOnSides - 1 : 0,
				to = referencePosition + visibleOnSides + 1 < this.getTotalSlides() - 1 ? referencePosition + visibleOnSides + 1 : this.getTotalSlides() - 1,
				
				// Get all the slides that need to be checked
				slidesToCheck = this.slidesOrder.slice( from, to + 1 );

			// Loop through the selected slides and if the slide is not marked as having
			// been loaded yet, loop through its images and load them.
			$.each( slidesToCheck, function( index, element ) {
				var slide = that.slides[ element ],
					$slide = slide.$slide;

				if ( typeof $slide.attr( 'data-loaded' ) === 'undefined' ) {
					$slide.attr( 'data-loaded', true );

					$slide.find( 'img[ data-src ]' ).each(function() {
						var image = $( this );
						that._loadImage( image, function( newImage ) {
							if ( newImage.hasClass( 'sp-image' ) ) {
								slide.$mainImage = newImage;
								slide.resizeMainImage( true );
							}
						});
					});
				}
			});
		},

		// Check visible thumbnails and load their images
		_checkAndLoadVisibleThumbnailImages: function() {
			if ( this.$slider.find( '.sp-thumbnail-container:not([ data-loaded ])' ).length === 0 ) {
				return;
			}

			var that = this,
				thumbnailSize = this.thumbnailsSize / this.thumbnails.length,

				// Calculate the indexes of the first and last thumbnail that will be checked
				from = Math.floor( Math.abs( this.thumbnailsPosition / thumbnailSize ) ),
				to = Math.floor( ( - this.thumbnailsPosition + this.thumbnailsContainerSize ) / thumbnailSize ),

				// Get all the thumbnails that need to be checked
				thumbnailsToCheck = this.thumbnails.slice( from, to + 1 );

			// Loop through the selected thumbnails and if the thumbnail is not marked as having
			// been loaded yet, load its image.
			$.each( thumbnailsToCheck, function( index, element ) {
				var $thumbnailContainer = element.$thumbnailContainer;

				if ( typeof $thumbnailContainer.attr( 'data-loaded' ) === 'undefined' ) {
					$thumbnailContainer.attr( 'data-loaded', true );

					$thumbnailContainer.find( 'img[ data-src ]' ).each(function() {
						var image = $( this );

						that._loadImage( image, function() {
							element.resizeImage();
						});
					});
				}
			});
		},

		// Load an image
		_loadImage: function( image, callback ) {
			// Create a new image element
			var newImage = $( new Image() );

			// Copy the class(es) and inline style
			newImage.attr( 'class', image.attr( 'class' ) );
			newImage.attr( 'style', image.attr( 'style' ) );

			// Copy the data attributes
			$.each( image.data(), function( name, value ) {
				newImage.attr( 'data-' + name, value );
			});

			// Copy the width and height attributes if they exist
			if ( typeof image.attr( 'width' ) !== 'undefined') {
				newImage.attr( 'width', image.attr( 'width' ) );
			}

			if ( typeof image.attr( 'height' ) !== 'undefined') {
				newImage.attr( 'height', image.attr( 'height' ) );
			}

			if ( typeof image.attr( 'alt' ) !== 'undefined' ) {
				newImage.attr( 'alt', image.attr( 'alt' ) );
			}

			if ( typeof image.attr( 'title' ) !== 'undefined' ) {
				newImage.attr( 'title', image.attr( 'title' ) );
			}

			// Assign the source of the image
			newImage.attr( 'src', image.attr( 'data-src' ) );
			newImage.removeAttr( 'data-src' );

			// Add the new image in the same container and remove the older image
			newImage.insertAfter( image );
			image.remove();
			image = null;
			
			if ( typeof callback === 'function' ) {
				callback( newImage );
			}
		},

		// Destroy the module
		destroyLazyLoading: function() {
			this.off( 'update.' + NS );
			this.off( 'gotoSlide.' + NS );
			this.off( 'sliderResize.' + NS );
			this.off( 'thumbnailsUpdate.' + NS );
			this.off( 'thumbnailsMoveComplete.' + NS );
		}
	};

	$.SliderPro.addModule( 'LazyLoading', LazyLoading );

})( window, jQuery );

// Layers module for Slider Pro.
// 
// Adds support for animated and static layers. The layers can contain any content,
// from simple text for video elements.
;(function( window, $ ) {

	"use strict";

	var NS = 'Layers.' +  $.SliderPro.namespace;

	var Layers = {

		// Reference to the original 'gotoSlide' method
		layersGotoSlideReference: null,

		// Reference to the timer that will delay the overriding
		// of the 'gotoSlide' method
		waitForLayersTimer: null,

		initLayers: function() {
			this.on( 'update.' + NS, $.proxy( this._layersOnUpdate, this ) );
			this.on( 'sliderResize.' + NS, $.proxy( this._layersOnResize, this ) );
			this.on( 'gotoSlide.' + NS, $.proxy( this._layersOnGotoSlide, this ) );
		},

		// Loop through the slides and initialize all layers
		_layersOnUpdate: function( event ) {
			var that = this;

			$.each( this.slides, function( index, element ) {
				var $slide = element.$slide;

				// Initialize the layers
				this.$slide.find( '.sp-layer:not([ data-layer-init ])' ).each(function() {
					var layer = new Layer( $( this ) );

					// Add the 'layers' array to the slide objects (instance of SliderProSlide)
					if ( typeof element.layers === 'undefined' ) {
						element.layers = [];
					}

					element.layers.push( layer );

					if ( $( this ).hasClass( 'sp-static' ) === false ) {

						// Add the 'animatedLayers' array to the slide objects (instance of SliderProSlide)
						if ( typeof element.animatedLayers === 'undefined' ) {
							element.animatedLayers = [];
						}

						element.animatedLayers.push( layer );
					}
				});
			});

			// If the 'waitForLayers' option is enabled, the slider will not move to another slide
			// until all the layers from the previous slide will be hidden. To achieve this,
			// replace the current 'gotoSlide' function with another function that will include the 
			// required functionality.
			// 
			// Since the 'gotoSlide' method might be overridden by other modules as well, delay this
			// override to make sure it's the last override.
			if ( this.settings.waitForLayers === true ) {
				clearTimeout( this.waitForLayersTimer );

				this.waitForLayersTimer = setTimeout(function() {
					that.layersGotoSlideReference = that.gotoSlide;
					that.gotoSlide = that._layersGotoSlide;
				}, 1 );
			}

			// Show the layers for the initial slide
			// Delay the call in order to make sure the layers
			// are scaled properly before displaying them
			setTimeout(function() {
				that.showLayers( that.selectedSlideIndex );
			}, 1);
		},

		// When the slider resizes, try to scale down the layers proportionally. The automatic scaling
		// will make use of an option, 'autoScaleReference', by comparing the current width of the slider
		// with the reference width. So, if the reference width is 1000 pixels and the current width is
		// 500 pixels, it means that the layers will be scaled down to 50% of their size.
		_layersOnResize: function() {
			var that = this,
				autoScaleReference,
				useAutoScale = this.settings.autoScaleLayers,
				scaleRatio;

			if ( this.settings.autoScaleLayers === false ) {
				return;
			}

			// If there isn't a reference for how the layers should scale down automatically, use the 'width'
			// option as a reference, unless the width was set to a percentage. If there isn't a set reference and
			// the width was set to a percentage, auto scaling will not be used because it's not possible to
			// calculate how much should the layers scale.
			if ( this.settings.autoScaleReference === -1 ) {
				if ( typeof this.settings.width === 'string' && this.settings.width.indexOf( '%' ) !== -1 ) {
					useAutoScale = false;
				} else {
					autoScaleReference = parseInt( this.settings.width, 10 );
				}
			} else {
				autoScaleReference = this.settings.autoScaleReference;
			}

			if ( useAutoScale === true && this.slideWidth < autoScaleReference ) {
				scaleRatio = that.slideWidth / autoScaleReference;
			} else {
				scaleRatio = 1;
			}

			$.each( this.slides, function( index, slide ) {
				if ( typeof slide.layers !== 'undefined' ) {
					$.each( slide.layers, function( index, layer ) {
						layer.scale( scaleRatio );
					});
				}
			});
		},

		// Replace the 'gotoSlide' method with this one, which makes it possible to 
		// change the slide only after the layers from the previous slide are hidden.
		_layersGotoSlide: function( index ) {
			var that = this,
				animatedLayers = this.slides[ this.selectedSlideIndex ].animatedLayers;

			// If the slider is dragged, don't wait for the layer to hide
			if ( this.$slider.hasClass( 'sp-swiping' ) || typeof animatedLayers === 'undefined' || animatedLayers.length === 0  ) {
				this.layersGotoSlideReference( index );
			} else {
				this.on( 'hideLayersComplete.' + NS, function() {
					that.off( 'hideLayersComplete.' + NS );
					that.layersGotoSlideReference( index );
				});

				this.hideLayers( this.selectedSlideIndex );
			}
		},

		// When a new slide is selected, hide the layers from the previous slide
		// and show the layers from the current slide.
		_layersOnGotoSlide: function( event ) {
			if ( this.previousSlideIndex !== this.selectedSlideIndex ) {
				this.hideLayers( this.previousSlideIndex );
			}

			this.showLayers( this.selectedSlideIndex );
		},

		// Show the animated layers from the slide at the specified index,
		// and fire an event when all the layers from the slide become visible.
		showLayers: function( index ) {
			var that = this,
				animatedLayers = this.slides[ index ].animatedLayers,
				layerCounter = 0;

			if ( typeof animatedLayers === 'undefined' ) {
				return;
			}

			$.each( animatedLayers, function( index, element ) {

				// If the layer is already visible, increment the counter directly, else wait 
				// for the layer's showing animation to complete.
				if ( element.isVisible() === true ) {
					layerCounter++;

					if ( layerCounter === animatedLayers.length ) {
						that.trigger({ type: 'showLayersComplete', index: index });
						if ( $.isFunction( that.settings.showLayersComplete ) ) {
							that.settings.showLayersComplete.call( that, { type: 'showLayersComplete', index: index });
						}
					}
				} else {
					element.show(function() {
						layerCounter++;

						if ( layerCounter === animatedLayers.length ) {
							that.trigger({ type: 'showLayersComplete', index: index });
							if ( $.isFunction( that.settings.showLayersComplete ) ) {
								that.settings.showLayersComplete.call( that, { type: 'showLayersComplete', index: index });
							}
						}
					});
				}
			});
		},

		// Hide the animated layers from the slide at the specified index,
		// and fire an event when all the layers from the slide become invisible.
		hideLayers: function( index ) {
			var that = this,
				animatedLayers = this.slides[ index ].animatedLayers,
				layerCounter = 0;

			if ( typeof animatedLayers === 'undefined' ) {
				return;
			}

			$.each( animatedLayers, function( index, element ) {

				// If the layer is already invisible, increment the counter directly, else wait 
				// for the layer's hiding animation to complete.
				if ( element.isVisible() === false ) {
					layerCounter++;

					if ( layerCounter === animatedLayers.length ) {
						that.trigger({ type: 'hideLayersComplete', index: index });
						if ( $.isFunction( that.settings.hideLayersComplete ) ) {
							that.settings.hideLayersComplete.call( that, { type: 'hideLayersComplete', index: index });
						}
					}
				} else {
					element.hide(function() {
						layerCounter++;

						if ( layerCounter === animatedLayers.length ) {
							that.trigger({ type: 'hideLayersComplete', index: index });
							if ( $.isFunction( that.settings.hideLayersComplete ) ) {
								that.settings.hideLayersComplete.call( that, { type: 'hideLayersComplete', index: index });
							}
						}
					});
				}
			});
		},

		// Destroy the module
		destroyLayers: function() {
			this.off( 'update.' + NS );
			this.off( 'resize.' + NS );
			this.off( 'gotoSlide.' + NS );
			this.off( 'hideLayersComplete.' + NS );
		},

		layersDefaults: {

			// Indicates whether the slider will wait for the layers to disappear before
			// going to a new slide
			waitForLayers: false,

			// Indicates whether the layers will be scaled automatically
			autoScaleLayers: true,

			// Sets a reference width which will be compared to the current slider width
			// in order to determine how much the layers need to scale down. By default,
			// the reference width will be equal to the slide width. However, if the slide width
			// is set to a percentage value, then it's necessary to set a specific value for 'autoScaleReference'.
			autoScaleReference: -1,

			// Called when all animated layers become visible
			showLayersComplete: function() {},

			// Called when all animated layers become invisible
			hideLayersComplete: function() {}
		}
	};

	// Override the slide's 'destroy' method in order to destroy the 
	// layers that where added to the slide as well.
	var slideDestroy = window.SliderProSlide.prototype.destroy;

	window.SliderProSlide.prototype.destroy = function() {
		if ( typeof this.layers !== 'undefined' ) {
			$.each( this.layers, function( index, element ) {
				element.destroy();
			});

			this.layers.length = 0;
		}

		if ( typeof this.animatedLayers !== 'undefined' ) {
			this.animatedLayers.length = 0;
		}

		slideDestroy.apply( this );
	};

	var Layer = function( layer ) {

		// Reference to the layer jQuery element
		this.$layer = layer;

		// Indicates whether a layer is currently visible or hidden
		this.visible = false;

		// Indicates whether the layer was styled
		this.styled = false;

		// Holds the data attributes added to the layer
		this.data = null;

		// Indicates the layer's reference point (topLeft, bottomLeft, topRight or bottomRight)
		this.position = null;
		
		// Indicates which CSS property (left or right) will be used for positioning the layer 
		this.horizontalProperty = null;
		
		// Indicates which CSS property (top or bottom) will be used for positioning the layer 
		this.verticalProperty = null;

		// Indicates the value of the horizontal position
		this.horizontalPosition = null;
		
		// Indicates the value of the vertical position
		this.verticalPosition = null;

		// Indicates how much the layers needs to be scaled
		this.scaleRatio = 1;

		// Indicates the type of supported transition (CSS3 2D, CSS3 3D or JavaScript)
		this.supportedAnimation = SliderProUtils.getSupportedAnimation();

		// Indicates the required vendor prefix for CSS (i.e., -webkit, -moz, etc.)
		this.vendorPrefix = SliderProUtils.getVendorPrefix();

		// Indicates the name of the CSS transition's complete event (i.e., transitionend, webkitTransitionEnd, etc.)
		this.transitionEvent = SliderProUtils.getTransitionEvent();

		// Reference to the timer that will be used to hide the layers automatically after a given time interval
		this.stayTimer = null;

		this._init();
	};

	Layer.prototype = {

		// Initialize the layers
		_init: function() {
			this.$layer.attr( 'data-layer-init', true );

			if ( this.$layer.hasClass( 'sp-static' ) ) {
				this._setStyle();
			} else {
				this.$layer.css({ 'visibility': 'hidden' });
			}
		},

		// Set the size and position of the layer
		_setStyle: function() {
			this.styled = true;

			// Get the data attributes specified in HTML
			this.data = this.$layer.data();
			
			if ( typeof this.data.width !== 'undefined' ) {
				this.$layer.css( 'width', this.data.width );
			}

			if ( typeof this.data.height !== 'undefined' ) {
				this.$layer.css( 'height', this.data.height );
			}

			if ( typeof this.data.depth !== 'undefined' ) {
				this.$layer.css( 'z-index', this.data.depth );
			}

			this.position = this.data.position ? ( this.data.position ).toLowerCase() : 'topleft';

			if ( this.position.indexOf( 'right' ) !== -1 ) {
				this.horizontalProperty = 'right';
			} else if ( this.position.indexOf( 'left' ) !== -1 ) {
				this.horizontalProperty = 'left';
			} else {
				this.horizontalProperty = 'center';
			}

			if ( this.position.indexOf( 'bottom' ) !== -1 ) {
				this.verticalProperty = 'bottom';
			} else if ( this.position.indexOf( 'top' ) !== -1 ) {
				this.verticalProperty = 'top';
			} else {
				this.verticalProperty = 'center';
			}

			this._setPosition();

			this.scale( this.scaleRatio );
		},

		// Set the position of the layer
		_setPosition: function() {
			var inlineStyle = this.$layer.attr( 'style' );

			this.horizontalPosition = typeof this.data.horizontal !== 'undefined' ? this.data.horizontal : 0;
			this.verticalPosition = typeof this.data.vertical !== 'undefined' ? this.data.vertical : 0;

			// Set the horizontal position of the layer based on the data set
			if ( this.horizontalProperty === 'center' ) {
				
				// prevent content wrapping while setting the width
				if ( this.$layer.is( 'img' ) === false && ( typeof inlineStyle === 'undefined' || ( typeof inlineStyle !== 'undefined' && inlineStyle.indexOf( 'width' ) === -1 ) ) ) {
					this.$layer.css( 'white-space', 'nowrap' );
					this.$layer.css( 'width', this.$layer.outerWidth( true ) );
				}

				this.$layer.css({ 'marginLeft': 'auto', 'marginRight': 'auto', 'left': this.horizontalPosition, 'right': 0 });
			} else {
				this.$layer.css( this.horizontalProperty, this.horizontalPosition );
			}

			// Set the vertical position of the layer based on the data set
			if ( this.verticalProperty === 'center' ) {

				// prevent content wrapping while setting the height
				if ( this.$layer.is( 'img' ) === false && ( typeof inlineStyle === 'undefined' || ( typeof inlineStyle !== 'undefined' && inlineStyle.indexOf( 'height' ) === -1 ) ) ) {
					this.$layer.css( 'white-space', 'nowrap' );
					this.$layer.css( 'height', this.$layer.outerHeight( true ) );
				}

				this.$layer.css({ 'marginTop': 'auto', 'marginBottom': 'auto', 'top': this.verticalPosition, 'bottom': 0 });
			} else {
				this.$layer.css( this.verticalProperty, this.verticalPosition );
			}
		},

		// Scale the layer
		scale: function( ratio ) {

			// Return if the layer is set to be unscalable
			if ( this.$layer.hasClass( 'sp-no-scale' ) ) {
				return;
			}

			// Store the ratio (even if the layer is not ready to be scaled yet)
			this.scaleRatio = ratio;

			// Return if the layer is not styled yet
			if ( this.styled === false ) {
				return;
			}

			var horizontalProperty = this.horizontalProperty === 'center' ? 'left' : this.horizontalProperty,
				verticalProperty = this.verticalProperty === 'center' ? 'top' : this.verticalProperty,
				css = {};

			// Apply the scaling
			css[ this.vendorPrefix + 'transform-origin' ] = this.horizontalProperty + ' ' + this.verticalProperty;
			css[ this.vendorPrefix + 'transform' ] = 'scale(' + this.scaleRatio + ')';

			// If the position is not set to a percentage value, apply the scaling to the position
			if ( typeof this.horizontalPosition !== 'string' ) {
				css[ horizontalProperty ] = this.horizontalPosition * this.scaleRatio;
			}

			// If the position is not set to a percentage value, apply the scaling to the position
			if ( typeof this.verticalPosition !== 'string' ) {
				css[ verticalProperty ] = this.verticalPosition * this.scaleRatio;
			}

			// If the width or height is set to a percentage value, increase the percentage in order to
			// maintain the same layer to slide proportions. This is necessary because otherwise the scaling
			// transform would minimize the layers more than intended.
			if ( typeof this.data.width === 'string' && this.data.width.indexOf( '%' ) !== -1 ) {
				css.width = ( parseInt( this.data.width, 10 ) / this.scaleRatio ).toString() + '%';
			}

			if ( typeof this.data.height === 'string' && this.data.height.indexOf( '%' ) !== -1 ) {
				css.height = ( parseInt( this.data.height, 10 ) / this.scaleRatio ).toString() + '%';
			}

			this.$layer.css( css );
		},

		// Show the layer
		show: function( callback ) {
			if ( this.visible === true ) {
				return;
			}

			this.visible = true;

			// First, style the layer if it's not already styled
			if ( this.styled === false ) {
				this._setStyle();
			}

			var that = this,
				offset = typeof this.data.showOffset !== 'undefined' ? this.data.showOffset : 50,
				duration = typeof this.data.showDuration !== 'undefined' ? this.data.showDuration / 1000 : 0.4,
				delay = typeof this.data.showDelay !== 'undefined' ? this.data.showDelay : 10,
				stayDuration = typeof that.data.stayDuration !== 'undefined' ? parseInt( that.data.stayDuration, 10 ) : -1;

			// Animate the layers with CSS3 or with JavaScript
			if ( this.supportedAnimation === 'javascript' ) {
				this.$layer
					.stop()
					.delay( delay )
					.css({ 'opacity': 0, 'visibility': 'visible' })
					.animate( { 'opacity': 1 }, duration * 1000, function() {

						// Hide the layer after a given time interval
						if ( stayDuration !== -1 ) {
							that.stayTimer = setTimeout(function() {
								that.hide();
								that.stayTimer = null;
							}, stayDuration );
						}

						if ( typeof callback !== 'undefined' ) {
							callback();
						}
					});
			} else {
				var start = { 'opacity': 0, 'visibility': 'visible' },
					target = { 'opacity': 1 },
					transformValues = '';

				start[ this.vendorPrefix + 'transform' ] = 'scale(' + this.scaleRatio + ')';
				target[ this.vendorPrefix + 'transform' ] = 'scale(' + this.scaleRatio + ')';
				target[ this.vendorPrefix + 'transition' ] = 'opacity ' + duration + 's';

				if ( typeof this.data.showTransition !== 'undefined' ) {
					if ( this.data.showTransition === 'left' ) {
						transformValues = offset + 'px, 0';
					} else if ( this.data.showTransition === 'right' ) {
						transformValues = '-' + offset + 'px, 0';
					} else if ( this.data.showTransition === 'up' ) {
						transformValues = '0, ' + offset + 'px';
					} else if ( this.data.showTransition === 'down') {
						transformValues = '0, -' + offset + 'px';
					}

					start[ this.vendorPrefix + 'transform' ] += this.supportedAnimation === 'css-3d' ? ' translate3d(' + transformValues + ', 0)' : ' translate(' + transformValues + ')';
					target[ this.vendorPrefix + 'transform' ] += this.supportedAnimation === 'css-3d' ? ' translate3d(0, 0, 0)' : ' translate(0, 0)';
					target[ this.vendorPrefix + 'transition' ] += ', ' + this.vendorPrefix + 'transform ' + duration + 's';
				}

				// Listen when the layer animation is complete
				this.$layer.on( this.transitionEvent, function( event ) {
					if ( event.target !== event.currentTarget ) {
						return;
					}

					that.$layer
						.off( that.transitionEvent )
						.css( that.vendorPrefix + 'transition', '' );

					// Hide the layer after a given time interval
					if ( stayDuration !== -1 ) {
						that.stayTimer = setTimeout(function() {
							that.hide();
							that.stayTimer = null;
						}, stayDuration );
					}

					if ( typeof callback !== 'undefined' ) {
						callback();
					}
				});

				this.$layer.css( start );

				setTimeout( function() {
					that.$layer.css( target );
				}, delay );
			}
		},

		// Hide the layer
		hide: function( callback ) {
			if ( this.visible === false ) {
				return;
			}

			var that = this,
				offset = typeof this.data.hideOffset !== 'undefined' ? this.data.hideOffset : 50,
				duration = typeof this.data.hideDuration !== 'undefined' ? this.data.hideDuration / 1000 : 0.4,
				delay = typeof this.data.hideDelay !== 'undefined' ? this.data.hideDelay : 10;

			this.visible = false;

			// If the layer is hidden before it hides automatically, clear the timer
			if ( this.stayTimer !== null ) {
				clearTimeout( this.stayTimer );
			}

			// Animate the layers with CSS3 or with JavaScript
			if ( this.supportedAnimation === 'javascript' ) {
				this.$layer
					.stop()
					.delay( delay )
					.animate({ 'opacity': 0 }, duration * 1000, function() {
						$( this ).css( 'visibility', 'hidden' );

						if ( typeof callback !== 'undefined' ) {
							callback();
						}
					});
			} else {
				var transformValues = '',
					target = { 'opacity': 0 };

				target[ this.vendorPrefix + 'transform' ] = 'scale(' + this.scaleRatio + ')';
				target[ this.vendorPrefix + 'transition' ] = 'opacity ' + duration + 's';

				if ( typeof this.data.hideTransition !== 'undefined' ) {
					if ( this.data.hideTransition === 'left' ) {
						transformValues = '-' + offset + 'px, 0';
					} else if ( this.data.hideTransition === 'right' ) {
						transformValues = offset + 'px, 0';
					} else if ( this.data.hideTransition === 'up' ) {
						transformValues = '0, -' + offset + 'px';
					} else if ( this.data.hideTransition === 'down' ) {
						transformValues = '0, ' + offset + 'px';
					}

					target[ this.vendorPrefix + 'transform' ] += this.supportedAnimation === 'css-3d' ? ' translate3d(' + transformValues + ', 0)' : ' translate(' + transformValues + ')';
					target[ this.vendorPrefix + 'transition' ] += ', ' + this.vendorPrefix + 'transform ' + duration + 's';
				}

				// Listen when the layer animation is complete
				this.$layer.on( this.transitionEvent, function( event ) {
					if ( event.target !== event.currentTarget ) {
						return;
					}

					that.$layer
						.off( that.transitionEvent )
						.css( that.vendorPrefix + 'transition', '' );

					// Hide the layer after transition
					if ( that.visible === false ) {
						that.$layer.css( 'visibility', 'hidden' );
					}

					if ( typeof callback !== 'undefined' ) {
						callback();
					}
				});

				setTimeout( function() {
					that.$layer.css( target );
				}, delay );
			}
		},

		isVisible: function() {
			if ( this.visible === false || this.$layer.is( ':hidden' ) ) {
				return false;
			}

			return true;
		},

		// Destroy the layer
		destroy: function() {
			this.$layer.removeAttr( 'style' );
			this.$layer.removeAttr( 'data-layer-init' );
		}
	};

	$.SliderPro.addModule( 'Layers', Layers );
	
})( window, jQuery );

// Fade module for Slider Pro.
// 
// Adds the possibility to navigate through slides using a cross-fade effect.
;(function( window, $ ) {

	"use strict";

	var NS = 'Fade.' + $.SliderPro.namespace;

	var Fade = {

		// Reference to the original 'gotoSlide' method
		fadeGotoSlideReference: null,

		initFade: function() {
			this.on( 'update.' + NS, $.proxy( this._fadeOnUpdate, this ) );
		},

		// If fade is enabled, store a reference to the original 'gotoSlide' method
		// and then assign a new function to 'gotoSlide'.
		_fadeOnUpdate: function() {
			if ( this.settings.fade === true ) {
				this.fadeGotoSlideReference = this.gotoSlide;
				this.gotoSlide = this._fadeGotoSlide;
			}
		},

		// Will replace the original 'gotoSlide' function by adding a cross-fade effect
		// between the previous and the next slide.
		_fadeGotoSlide: function( index ) {
			if ( index === this.selectedSlideIndex ) {
				return;
			}
			
			// If the slides are being swiped/dragged, don't use fade, but call the original method instead.
			// If not, which means that a new slide was selected through a button, arrows or direct call, then
			// use fade.
			if ( this.$slider.hasClass( 'sp-swiping' ) ) {
				this.fadeGotoSlideReference( index );
			} else {
				var that = this,
					$nextSlide,
					$previousSlide,
					newIndex = index;

				// Loop through all the slides and overlap the previous and next slide,
				// and hide the other slides.
				$.each( this.slides, function( index, element ) {
					var slideIndex = element.getIndex(),
						$slide = element.$slide;

					if ( slideIndex === newIndex ) {
						$slide.css({ 'opacity': 0, 'left': 0, 'top': 0, 'z-index': 20, visibility: 'visible' });
						$nextSlide = $slide;
					} else if ( slideIndex === that.selectedSlideIndex ) {
						$slide.css({ 'opacity': 1, 'left': 0, 'top': 0, 'z-index': 10, visibility: 'visible' });
						$previousSlide = $slide;
					} else {
						$slide.css({ 'opacity': 1, visibility: 'hidden', 'z-index': '' });
					}
				});

				// Set the new indexes for the previous and selected slides
				this.previousSlideIndex = this.selectedSlideIndex;
				this.selectedSlideIndex = index;

				// Re-assign the 'sp-selected' class to the currently selected slide
				this.$slides.find( '.sp-selected' ).removeClass( 'sp-selected' );
				this.$slides.find( '.sp-slide' ).eq( this.selectedSlideIndex ).addClass( 'sp-selected' );
			
				// Rearrange the slides if the slider is loop-able
				if ( that.settings.loop === true ) {
					that._updateSlidesOrder();
				}

				// Move the slides container so that the cross-fading slides (which now have the top and left
				// position set to 0) become visible.
				this._moveTo( 0, true );

				// Fade in the selected slide
				this._fadeSlideTo( $nextSlide, 1, function() {

					// This flag will indicate if all the fade transitions are complete,
					// in case there are multiple running at the same time, which happens
					// when the slides are navigated very quickly
					var allTransitionsComplete = true;

					// Go through all the slides and check if there is at least one slide 
					// that is still transitioning.
					$.each( that.slides, function( index, element ) {
						if ( typeof element.$slide.attr( 'data-transitioning' ) !== 'undefined' ) {
							allTransitionsComplete = false;
						}
					});

					if ( allTransitionsComplete === true ) {

						// After all the transitions are complete, make all the slides visible again
						$.each( that.slides, function( index, element ) {
							var $slide = element.$slide;
							$slide.css({ 'visibility': '', 'opacity': '', 'z-index': '' });
						});
						
						// Reset the position of the slides and slides container
						that._resetSlidesPosition();
					}

					// Fire the 'gotoSlideComplete' event
					that.trigger({ type: 'gotoSlideComplete', index: index, previousIndex: that.previousSlideIndex });
					if ( $.isFunction( that.settings.gotoSlideComplete ) ) {
						that.settings.gotoSlideComplete.call( that, { type: 'gotoSlideComplete', index: index, previousIndex: that.previousSlideIndex } );
					}
				});

				// Fade out the previous slide, if indicated, in addition to fading in the next slide
				if ( this.settings.fadeOutPreviousSlide === true ) {
					this._fadeSlideTo( $previousSlide, 0 );
				}

				if ( this.settings.autoHeight === true ) {
					this._resizeHeight();
				}

				// Fire the 'gotoSlide' event
				this.trigger({ type: 'gotoSlide', index: index, previousIndex: this.previousSlideIndex });
				if ( $.isFunction( this.settings.gotoSlide ) ) {
					this.settings.gotoSlide.call( this, { type: 'gotoSlide', index: index, previousIndex: this.previousSlideIndex });
				}
			}
		},

		// Fade the target slide to the specified opacity (0 or 1)
		_fadeSlideTo: function( target, opacity, callback ) {
			var that = this;

			// apply the attribute only to slides that fade in
			if ( opacity === 1 ) {
				target.attr( 'data-transitioning', true );
			}

			// Use CSS transitions if they are supported. If not, use JavaScript animation.
			if ( this.supportedAnimation === 'css-3d' || this.supportedAnimation === 'css-2d' ) {

				// There needs to be a delay between the moment the opacity is set
				// and the moment the transitions starts.
				setTimeout(function(){
					var css = { 'opacity': opacity };
					css[ that.vendorPrefix + 'transition' ] = 'opacity ' + that.settings.fadeDuration / 1000 + 's';
					target.css( css );
				}, 100 );

				target.on( this.transitionEvent, function( event ) {
					if ( event.target !== event.currentTarget ) {
						return;
					}
					
					target.off( that.transitionEvent );
					target.css( that.vendorPrefix + 'transition', '' );
					target.removeAttr( 'data-transitioning');

					if ( typeof callback === 'function' ) {
						callback();
					}
				});
			} else {
				target.stop().animate({ 'opacity': opacity }, this.settings.fadeDuration, function() {
					target.removeAttr( 'data-transitioning' );

					if ( typeof callback === 'function' ) {
						callback();
					}
				});
			}
		},

		// Destroy the module
		destroyFade: function() {
			this.off( 'update.' + NS );

			if ( this.fadeGotoSlideReference !== null ) {
				this.gotoSlide = this.fadeGotoSlideReference;
			}
		},

		fadeDefaults: {

			// Indicates if fade will be used
			fade: false,

			// Indicates if the previous slide will be faded out (in addition to the next slide being faded in)
			fadeOutPreviousSlide: true,

			// Sets the duration of the fade effect
			fadeDuration: 500
		}
	};

	$.SliderPro.addModule( 'Fade', Fade );

})( window, jQuery );

// Touch Swipe module for Slider Pro.
// 
// Adds touch-swipe functionality for slides.
;(function( window, $ ) {

	"use strict";
	
	var NS = 'TouchSwipe.' + $.SliderPro.namespace;

	var TouchSwipe = {

		// The x and y coordinates of the pointer/finger's starting position
		touchStartPoint: {x: 0, y: 0},

		// The x and y coordinates of the pointer/finger's end position
		touchEndPoint: {x: 0, y: 0},

		// The distance from the starting to the end position on the x and y axis
		touchDistance: {x: 0, y: 0},

		// The position of the slides when the touch swipe starts
		touchStartPosition: 0,

		// Indicates if the slides are being swiped
		isTouchMoving: false,

		// Stores the names of the events
		touchSwipeEvents: { startEvent: '', moveEvent: '', endEvent: '' },

		initTouchSwipe: function() {
			var that = this;

			// check if touch swipe is enabled
			if ( this.settings.touchSwipe === false ) {
				return;
			}

			this.touchSwipeEvents.startEvent = 'touchstart' + '.' + NS + ' mousedown' + '.' + NS;
			this.touchSwipeEvents.moveEvent = 'touchmove' + '.' + NS + ' mousemove' + '.' + NS;
			this.touchSwipeEvents.endEvent = 'touchend' + '.' + this.uniqueId + '.' + NS + ' mouseup' + '.' + this.uniqueId + '.' + NS;

			// Listen for touch swipe/mouse move events
			this.$slidesMask.on( this.touchSwipeEvents.startEvent, $.proxy( this._onTouchStart, this ) );
			this.$slidesMask.on( 'dragstart.' + NS, function( event ) {
				event.preventDefault();
			});

			// Add the grabbing icon
			this.$slidesMask.addClass( 'sp-grab' );
		},

		// Called when the slides starts being dragged
		_onTouchStart: function( event ) {
		
			// Disable dragging if the element is set to allow selections
			if ( $( event.target ).closest( '.sp-selectable' ).length >= 1 ) {
				return;
			}

			var that = this,
				eventObject = typeof event.originalEvent.touches !== 'undefined' ? event.originalEvent.touches[0] : event.originalEvent;

			// Prevent default behavior only for mouse events
			if ( typeof event.originalEvent.touches === 'undefined' ) {
				event.preventDefault();
			}

			// Disable click events on links
			$( event.target ).parents( '.sp-slide' ).find( 'a' ).one( 'click.' + NS, function( event ) {
				event.preventDefault();
			});

			// Get the initial position of the mouse pointer and the initial position
			// of the slides' container
			this.touchStartPoint.x = eventObject.pageX || eventObject.clientX;
			this.touchStartPoint.y = eventObject.pageY || eventObject.clientY;
			this.touchStartPosition = this.slidesPosition;

			// Clear the previous distance values
			this.touchDistance.x = this.touchDistance.y = 0;

			// If the slides are being grabbed while they're still animating, stop the
			// current movement
			if ( this.$slides.hasClass( 'sp-animated' ) ) {
				this.isTouchMoving = true;
				this._stopMovement();
				this.touchStartPosition = this.slidesPosition;
			}

			// Listen for move and end events
			this.$slidesMask.on( this.touchSwipeEvents.moveEvent, $.proxy( this._onTouchMove, this ) );
			$( document ).on( this.touchSwipeEvents.endEvent, $.proxy( this._onTouchEnd, this ) );

			// Swap grabbing icons
			this.$slidesMask.removeClass( 'sp-grab' ).addClass( 'sp-grabbing' );

			// Add 'sp-swiping' class to indicate that the slides are being swiped
			this.$slider.addClass( 'sp-swiping' );
		},

		// Called during the slides' dragging
		_onTouchMove: function( event ) {
			var eventObject = typeof event.originalEvent.touches !== 'undefined' ? event.originalEvent.touches[0] : event.originalEvent;

			// Indicate that the move event is being fired
			this.isTouchMoving = true;

			// Get the current position of the mouse pointer
			this.touchEndPoint.x = eventObject.pageX || eventObject.clientX;
			this.touchEndPoint.y = eventObject.pageY || eventObject.clientY;

			// Calculate the distance of the movement on both axis
			this.touchDistance.x = this.touchEndPoint.x - this.touchStartPoint.x;
			this.touchDistance.y = this.touchEndPoint.y - this.touchStartPoint.y;
			
			// Calculate the distance of the swipe that takes place in the same direction as the orientation of the slides
			// and calculate the distance from the opposite direction.
			// 
			// For a swipe to be valid there should more distance in the same direction as the orientation of the slides.
			var distance = this.settings.orientation === 'horizontal' ? this.touchDistance.x : this.touchDistance.y,
				oppositeDistance = this.settings.orientation === 'horizontal' ? this.touchDistance.y : this.touchDistance.x;

			// If the movement is in the same direction as the orientation of the slides, the swipe is valid
			if ( Math.abs( distance ) > Math.abs( oppositeDistance ) ) {
				event.preventDefault();
			} else {
				return;
			}

			if ( this.settings.loop === false ) {
				// Make the slides move slower if they're dragged outside its bounds
				if ( ( this.slidesPosition > this.touchStartPosition && this.selectedSlideIndex === 0 ) ||
					( this.slidesPosition < this.touchStartPosition && this.selectedSlideIndex === this.getTotalSlides() - 1 )
				) {
					distance = distance * 0.2;
				}
			}

			this._moveTo( this.touchStartPosition + distance, true );
		},

		// Called when the slides are released
		_onTouchEnd: function( event ) {
			var that = this,
				touchDistance = this.settings.orientation === 'horizontal' ? this.touchDistance.x : this.touchDistance.y;

			// Remove the move and end listeners
			this.$slidesMask.off( this.touchSwipeEvents.moveEvent );
			$( document ).off( this.touchSwipeEvents.endEvent );

			// Swap grabbing icons
			this.$slidesMask.removeClass( 'sp-grabbing' ).addClass( 'sp-grab' );

			// Check if there is intention for a tap
			if ( this.isTouchMoving === false || this.isTouchMoving === true && Math.abs( this.touchDistance.x ) < 10 && Math.abs( this.touchDistance.y ) < 10 ) {
				// Re-enable click events on links
				$( event.target ).parents( '.sp-slide' ).find( 'a' ).off( 'click.' + NS );
				this.$slider.removeClass( 'sp-swiping' );
			}

			// Remove the 'sp-swiping' class but with a delay
			// because there might be other event listeners that check
			// the existence of this class, and this class should still be 
			// applied for those listeners, since there was a swipe event
			setTimeout(function() {
				that.$slider.removeClass( 'sp-swiping' );
			}, 1 );

			// Return if the slides didn't move
			if ( this.isTouchMoving === false ) {
				return;
			}

			this.isTouchMoving = false;

			$( event.target ).parents( '.sp-slide' ).one( 'click', function( event ) {
				event.preventDefault();
			});

			// Calculate the old position of the slides in order to return to it if the swipe
			// is below the threshold
			var selectedSlideOffset = this.settings.centerSelectedSlide === true ? Math.round( ( parseInt( this.$slidesMask.css( this.sizeProperty ), 10 ) - this.getSlideAt( this.selectedSlideIndex ).getSize()[ this.sizeProperty ] ) / 2 ) : 0,
				oldSlidesPosition = - parseInt( this.$slides.find( '.sp-slide' ).eq( this.selectedSlideIndex ).css( this.positionProperty ), 10 ) + selectedSlideOffset;

			if ( Math.abs( touchDistance ) < this.settings.touchSwipeThreshold ) {
				this._moveTo( oldSlidesPosition );
			} else {
				
				// Calculate by how many slides the slides container has moved
				var	slideArrayDistance = ( this.settings.rightToLeft === true && this.settings.orientation === 'horizontal' ? -1 : 1 ) * touchDistance / ( this.averageSlideSize + this.settings.slideDistance );

				// Floor the obtained value and add or subtract 1, depending on the direction of the swipe
				slideArrayDistance = parseInt( slideArrayDistance, 10 ) + ( slideArrayDistance > 0 ? 1 : - 1 );

				// Get the index of the currently selected slide and subtract the position index in order to obtain
				// the new index of the selected slide. 
				var nextSlideIndex = this.slidesOrder[ $.inArray( this.selectedSlideIndex, this.slidesOrder ) - slideArrayDistance ];

				if ( this.settings.loop === true ) {
					this.gotoSlide( nextSlideIndex );
				} else {
					if ( typeof nextSlideIndex !== 'undefined' ) {
						this.gotoSlide( nextSlideIndex );
					} else {
						this._moveTo( oldSlidesPosition );
					}
				}
			}
		},

		// Destroy the module
		destroyTouchSwipe: function() {
			this.$slidesMask.off( this.touchSwipeEvents.startEvent );
			this.$slidesMask.off( this.touchSwipeEvents.moveEvent );
			this.$slidesMask.off( 'dragstart.' + NS );
			$( document ).off( this.touchSwipeEvents.endEvent );
			this.$slidesMask.removeClass( 'sp-grab' );
		},

		touchSwipeDefaults: {
			
			// Indicates whether the touch swipe will be enabled
			touchSwipe: true,

			// Sets the minimum amount that the slides should move
			touchSwipeThreshold: 50
		}
	};

	$.SliderPro.addModule( 'TouchSwipe', TouchSwipe );
	
})( window, jQuery );

// Caption module for Slider Pro.
// 
// Adds a corresponding caption for each slide. The caption
// will appear and disappear with the slide.
;(function( window, $ ) {

	"use strict";
	
	var NS = 'Caption.' + $.SliderPro.namespace;

	var Caption = {

		// Reference to the container element that will hold the caption
		$captionContainer: null,

		// The caption content/text
		captionContent: '',

		initCaption: function() {
			this.on( 'update.' + NS, $.proxy( this._captionOnUpdate, this ) );
			this.on( 'gotoSlide.' + NS, $.proxy( this._updateCaptionContent, this ) );
		},

		// Create the caption container and hide the captions inside the slides
		_captionOnUpdate: function() {
			this.$captionContainer = this.$slider.find( '.sp-caption-container' );

			if ( this.$slider.find( '.sp-caption' ).length && this.$captionContainer.length === 0 ) {
				this.$captionContainer = $( '<div class="sp-caption-container"></div>' ).appendTo( this.$slider );

				// Show the caption for the selected slide
				this._updateCaptionContent();
			}

			// Hide the captions inside the slides
			this.$slides.find( '.sp-caption' ).each(function() {
				$( this ).css( 'display', 'none' );
			});
		},

		// Show the caption content for the selected slide
		_updateCaptionContent: function() {
			var that = this,
				newCaptionField = this.$slider.find( '.sp-slide' ).eq( this.selectedSlideIndex ).find( '.sp-caption' ),
				newCaptionContent = newCaptionField.length !== 0 ? newCaptionField.html() : '';

			// Either use a fade effect for swapping the captions or use an instant change
			if ( this.settings.fadeCaption === true ) {
				
				// If the previous slide had a caption, fade out that caption first and when the animation is over
				// fade in the current caption.
				// If the previous slide didn't have a caption, fade in the current caption directly.
				if ( this.captionContent !== '' ) {

					// If the caption container has 0 opacity when the fade out transition starts, set it
					// to 1 because the transition wouldn't work if the initial and final values are the same,
					// and the callback functions wouldn't fire in this case.
					if ( parseFloat( this.$captionContainer.css( 'opacity' ), 10 ) === 0 ) {
						this.$captionContainer.css( this.vendorPrefix + 'transition', '' );
						this.$captionContainer.css( 'opacity', 1 );
					}

					this._fadeCaptionTo( 0, function() {
						that.captionContent = newCaptionContent;

						if ( newCaptionContent !== '' ) {
							that.$captionContainer.html( that.captionContent );
							that._fadeCaptionTo( 1 );
						} else {
							that.$captionContainer.empty();
						}
					});
				} else {
					this.captionContent = newCaptionContent;
					this.$captionContainer.html( this.captionContent );
					this.$captionContainer.css( 'opacity', 0 );
					this._fadeCaptionTo( 1 );
				}
			} else {
				this.captionContent = newCaptionContent;
				this.$captionContainer.html( this.captionContent );
			}
		},

		// Fade the caption container to the specified opacity
		_fadeCaptionTo: function( opacity, callback ) {
			var that = this;

			// Use CSS transitions if they are supported. If not, use JavaScript animation.
			if ( this.supportedAnimation === 'css-3d' || this.supportedAnimation === 'css-2d' ) {
				
				// There needs to be a delay between the moment the opacity is set
				// and the moment the transitions starts.
				setTimeout(function(){
					var css = { 'opacity': opacity };
					css[ that.vendorPrefix + 'transition' ] = 'opacity ' + that.settings.captionFadeDuration / 1000 + 's';
					that.$captionContainer.css( css );
				}, 1 );

				this.$captionContainer.on( this.transitionEvent, function( event ) {
					if ( event.target !== event.currentTarget ) {
						return;
					}

					that.$captionContainer.off( that.transitionEvent );
					that.$captionContainer.css( that.vendorPrefix + 'transition', '' );

					if ( typeof callback === 'function' ) {
						callback();
					}
				});
			} else {
				this.$captionContainer.stop().animate({ 'opacity': opacity }, this.settings.captionFadeDuration, function() {
					if ( typeof callback === 'function' ) {
						callback();
					}
				});
			}
		},

		// Destroy the module
		destroyCaption: function() {
			this.off( 'update.' + NS );
			this.off( 'gotoSlide.' + NS );

			this.$captionContainer.remove();

			this.$slider.find( '.sp-caption' ).each(function() {
				$( this ).css( 'display', '' );
			});
		},

		captionDefaults: {

			// Indicates whether or not the captions will be faded
			fadeCaption: true,

			// Sets the duration of the fade animation
			captionFadeDuration: 500
		}
	};

	$.SliderPro.addModule( 'Caption', Caption );
	
})( window, jQuery );

// Deep Linking module for Slider Pro.
// 
// Updates the hash of the URL as the user navigates through the slides.
// Also, allows navigating to a specific slide by indicating it in the hash.
;(function( window, $ ) {

	"use strict";

	var NS = 'DeepLinking.' + $.SliderPro.namespace;

	var DeepLinking = {

		initDeepLinking: function() {
			var that = this;

			// Parse the initial hash
			this.on( 'init.' + NS, function() {
				that._gotoHash( window.location.hash );
			});

			// Update the hash when a new slide is selected
			this.on( 'gotoSlide.' + NS, function( event ) {
				if ( that.settings.updateHash === true ) {

					// get the 'id' attribute of the slide
					var slideId = that.$slider.find( '.sp-slide' ).eq( event.index ).attr( 'id' );

					// if the slide doesn't have an 'id' attribute, use the slide index
					if ( typeof slideId === 'undefined' ) {
						slideId = event.index;
					}

					window.location.hash = that.$slider.attr( 'id' ) + '/' + slideId;
				}
			});

			// Check when the hash changes and navigate to the indicated slide
			$( window ).on( 'hashchange.' + this.uniqueId + '.' + NS, function() {
				that._gotoHash( window.location.hash );
			});
		},

		// Parse the hash and return the slider id and the slide id
		_parseHash: function( hash ) {
			if ( hash !== '' ) {
				// Eliminate the # symbol
				hash = hash.substring(1);

				// Get the specified slider id and slide id
				var values = hash.split( '/' ),
					slideId = values.pop(),
					sliderId = hash.slice( 0, - slideId.toString().length - 1 );

				if ( this.$slider.attr( 'id' ) === sliderId ) {
					return { 'sliderID': sliderId, 'slideId': slideId };
				}
			}

			return false;
		},

		// Navigate to the appropriate slide, based on the specified hash
		_gotoHash: function( hash ) {
			var result = this._parseHash( hash );

			if ( result === false ) {
				return;
			}

			var slideId = result.slideId,
				slideIdNumber = parseInt( slideId, 10 );

			// check if the specified slide id is a number or string
			if ( isNaN( slideIdNumber ) ) {
				// get the index of the slide based on the specified id
				var slideIndex = this.$slider.find( '.sp-slide#' + slideId ).index();

				if ( slideIndex !== -1 && slideIndex !== this.selectedSlideIndex ) {
					this.gotoSlide( slideIndex );
				}
			} else if ( slideIdNumber !== this.selectedSlideIndex ) {
				this.gotoSlide( slideIdNumber );
			}
		},

		// Destroy the module
		destroyDeepLinking: function() {
			this.off( 'init.' + NS );
			this.off( 'gotoSlide.' + NS );
			$( window ).off( 'hashchange.' + this.uniqueId + '.' + NS );
		},

		deepLinkingDefaults: {

			// Indicates whether the hash will be updated when a new slide is selected
			updateHash: false
		}
	};

	$.SliderPro.addModule( 'DeepLinking', DeepLinking );
	
})( window, jQuery );

// Autoplay module for Slider Pro.
// 
// Adds automatic navigation through the slides by calling the
// 'nextSlide' or 'previousSlide' methods at certain time intervals.
;(function( window, $ ) {

	"use strict";
	
	var NS = 'Autoplay.' + $.SliderPro.namespace;

	var Autoplay = {

		autoplayTimer: null,

		isTimerRunning: false,

		isTimerPaused: false,

		initAutoplay: function() {
			this.on( 'update.' + NS, $.proxy( this._autoplayOnUpdate, this ) );
		},

		// Start the autoplay if it's enabled, or stop it if it's disabled but running 
		_autoplayOnUpdate: function( event ) {
			if ( this.settings.autoplay === true ) {
				this.on( 'gotoSlide.' + NS, $.proxy( this._autoplayOnGotoSlide, this ) );
				this.on( 'mouseenter.' + NS, $.proxy( this._autoplayOnMouseEnter, this ) );
				this.on( 'mouseleave.' + NS, $.proxy( this._autoplayOnMouseLeave, this ) );

				this.startAutoplay();
			} else {
				this.off( 'gotoSlide.' + NS );
				this.off( 'mouseenter.' + NS );
				this.off( 'mouseleave.' + NS );

				this.stopAutoplay();
			}
		},

		// Restart the autoplay timer when a new slide is selected
		_autoplayOnGotoSlide: function( event ) {
			// stop previous timers before starting a new one
			if ( this.isTimerRunning === true ) {
				this.stopAutoplay();
			}
			
			if ( this.isTimerPaused === false ) {
				this.startAutoplay();
			}
		},

		// Pause the autoplay when the slider is hovered
		_autoplayOnMouseEnter: function( event ) {
			if ( this.isTimerRunning && ( this.settings.autoplayOnHover === 'pause' || this.settings.autoplayOnHover === 'stop' ) ) {
				this.stopAutoplay();
				this.isTimerPaused = true;
			}
		},

		// Start the autoplay when the mouse moves away from the slider
		_autoplayOnMouseLeave: function( event ) {
			if ( this.settings.autoplay === true && this.isTimerRunning === false && this.settings.autoplayOnHover !== 'stop' ) {
				this.startAutoplay();
				this.isTimerPaused = false;
			}
		},

		// Starts the autoplay
		startAutoplay: function() {
			var that = this;
			
			this.isTimerRunning = true;

			this.autoplayTimer = setTimeout(function() {
				if ( that.settings.autoplayDirection === 'normal' ) {
					that.nextSlide();
				} else if ( that.settings.autoplayDirection === 'backwards' ) {
					that.previousSlide();
				}
			}, this.settings.autoplayDelay );
		},

		// Stops the autoplay
		stopAutoplay: function() {
			this.isTimerRunning = false;
			this.isTimerPaused = false;

			clearTimeout( this.autoplayTimer );
		},

		// Destroy the module
		destroyAutoplay: function() {
			clearTimeout( this.autoplayTimer );

			this.off( 'update.' + NS );
			this.off( 'gotoSlide.' + NS );
			this.off( 'mouseenter.' + NS );
			this.off( 'mouseleave.' + NS );
		},

		autoplayDefaults: {
			// Indicates whether or not autoplay will be enabled
			autoplay: true,

			// Sets the delay/interval at which the autoplay will run
			autoplayDelay: 5000,

			// Indicates whether autoplay will navigate to the next slide or previous slide
			autoplayDirection: 'normal',

			// Indicates if the autoplay will be paused or stopped when the slider is hovered.
			// Possible values are 'pause', 'stop' or 'none'.
			autoplayOnHover: 'pause'
		}
	};

	$.SliderPro.addModule( 'Autoplay', Autoplay );
	
})(window, jQuery);

// Keyboard module for Slider Pro.
// 
// Adds the possibility to navigate through slides using the keyboard arrow keys, or
// open the link attached to the main slide image by using the Enter key.
;(function( window, $ ) {

	"use strict";
	
	var NS = 'Keyboard.' + $.SliderPro.namespace;

	var Keyboard = {

		initKeyboard: function() {
			var that = this,
				hasFocus = false;

			if ( this.settings.keyboard === false ) {
				return;
			}

			// Detect when the slide is in focus and when it's not, and, optionally, make it
			// responsive to keyboard input only when it's in focus
			this.$slider.on( 'focus.' + NS, function() {
				hasFocus = true;
			});

			this.$slider.on( 'blur.' + NS, function() {
				hasFocus = false;
			});

			$( document ).on( 'keydown.' + this.uniqueId + '.' + NS, function( event ) {
				if ( that.settings.keyboardOnlyOnFocus === true && hasFocus === false ) {
					return;
				}

				// If the left arrow key is pressed, go to the previous slide.
				// If the right arrow key is pressed, go to the next slide.
				// If the Enter key is pressed, open the link attached to the main slide image.
				if ( event.which === 37 ) {
					that.previousSlide();
				} else if ( event.which === 39 ) {
					that.nextSlide();
				} else if ( event.which === 13 ) {
					var link = that.$slider.find( '.sp-slide' ).eq( that.selectedSlideIndex ).find( '.sp-image-container a' );
					
					if ( link.length !== 0 ) {
						link[0].click();
					}
				}
			});
		},

		// Destroy the module
		destroyKeyboard: function() {
			this.$slider.off( 'focus.' + NS );
			this.$slider.off( 'blur.' + NS );
			$( document ).off( 'keydown.' + this.uniqueId + '.' + NS );
		},

		keyboardDefaults: {

			// Indicates whether keyboard navigation will be enabled
			keyboard: true,

			// Indicates whether the slider will respond to keyboard input only when
			// the slider is in focus.
			keyboardOnlyOnFocus: false
		}
	};

	$.SliderPro.addModule( 'Keyboard', Keyboard );
	
})( window, jQuery );

// Full Screen module for Slider Pro.
// 
// Adds the possibility to open the slider full-screen, using the HMTL5 FullScreen API.
;(function( window, $ ) {

	"use strict";

	var NS = 'FullScreen.' + $.SliderPro.namespace;

	var FullScreen = {

		// Indicates whether the slider is currently in full-screen mode
		isFullScreen: false,

		// Reference to the full-screen button
		$fullScreenButton: null,

		// Reference to a set of settings that influence the slider's size
		// before it goes full-screen
		sizeBeforeFullScreen: {},

		initFullScreen: function() {
			if ( ! ( document.fullscreenEnabled ||
				document.webkitFullscreenEnabled ||
				document.mozFullScreenEnabled ||
				document.msFullscreenEnabled ) ) {
				return;
			}
		
			this.on( 'update.' + NS, $.proxy( this._fullScreenOnUpdate, this ) );
		},

		// Create or remove the full-screen button depending on the value of the 'fullScreen' option
		_fullScreenOnUpdate: function() {
			if ( this.settings.fullScreen === true && this.$fullScreenButton === null ) {
				this._addFullScreen();
			} else if ( this.settings.fullScreen === false && this.$fullScreenButton !== null ) {
				this._removeFullScreen();
			}

			if ( this.settings.fullScreen === true ) {
				if ( this.settings.fadeFullScreen === true ) {
					this.$fullScreenButton.addClass( 'sp-fade-full-screen' );
				} else if ( this.settings.fadeFullScreen === false ) {
					this.$fullScreenButton.removeClass( 'sp-fade-full-screen' );
				}
			}
		},

		// Create the full-screen button
		_addFullScreen: function() {
			this.$fullScreenButton = $('<div class="sp-full-screen-button"></div>').appendTo( this.$slider );
			this.$fullScreenButton.on( 'click.' + NS, $.proxy( this._onFullScreenButtonClick, this ) );

			document.addEventListener( 'fullscreenchange', $.proxy( this._onFullScreenChange, this ) );
			document.addEventListener( 'mozfullscreenchange', $.proxy( this._onFullScreenChange, this ) );
			document.addEventListener( 'webkitfullscreenchange', $.proxy( this._onFullScreenChange, this ) );
			document.addEventListener( 'MSFullscreenChange', $.proxy( this._onFullScreenChange, this ) );
		},

		// Remove the full-screen button
		_removeFullScreen: function() {
			if ( this.$fullScreenButton !== null ) {
				this.$fullScreenButton.off( 'click.' + NS );
				this.$fullScreenButton.remove();
				this.$fullScreenButton = null;
				document.removeEventListener( 'fullscreenchange', this._onFullScreenChange );
				document.removeEventListener( 'mozfullscreenchange', this._onFullScreenChange );
				document.removeEventListener( 'webkitfullscreenchange', this._onFullScreenChange );
				document.removeEventListener( 'MSFullscreenChange', this._onFullScreenChange );
			}
		},

		// When the full-screen button is clicked, put the slider into full-screen mode, and
		// take it out of the full-screen mode when it's clicked again.
		_onFullScreenButtonClick: function() {
			if ( this.isFullScreen === false ) {
				if ( this.instance.requestFullScreen ) {
					this.instance.requestFullScreen();
				} else if ( this.instance.mozRequestFullScreen ) {
					this.instance.mozRequestFullScreen();
				} else if ( this.instance.webkitRequestFullScreen ) {
					this.instance.webkitRequestFullScreen();
				} else if ( this.instance.msRequestFullscreen ) {
					this.instance.msRequestFullscreen();
				}
			} else {
				if ( document.exitFullScreen ) {
					document.exitFullScreen();
				} else if ( document.mozCancelFullScreen ) {
					document.mozCancelFullScreen();
				} else if ( document.webkitCancelFullScreen ) {
					document.webkitCancelFullScreen();
				} else if ( document.msExitFullscreen ) {
					document.msExitFullscreen();
				}
			}
		},

		// This will be called whenever the full-screen mode changes.
		// If the slider is in full-screen mode, set it to 'full window', and if it's
		// not in full-screen mode anymore, set it back to the original size.
		_onFullScreenChange: function() {
			this.isFullScreen = document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement || document.msFullscreenElement ? true : false;

			if ( this.isFullScreen === true ) {
				this.sizeBeforeFullScreen = { forceSize: this.settings.forceSize, autoHeight: this.settings.autoHeight };
				this.$slider.addClass( 'sp-full-screen' );
				this.settings.forceSize = 'fullWindow';
				this.settings.autoHeight = false;
			} else {
				this.$slider.css( 'margin', '' );
				this.$slider.removeClass( 'sp-full-screen' );
				this.settings.forceSize = this.sizeBeforeFullScreen.forceSize;
				this.settings.autoHeight = this.sizeBeforeFullScreen.autoHeight;
			}

			this.resize();
		},

		// Destroy the module
		destroyFullScreen: function() {
			this.off( 'update.' + NS );
			this._removeFullScreen();
		},

		fullScreenDefaults: {

			// Indicates whether the full-screen button is enabled
			fullScreen: false,

			// Indicates whether the button will fade in only on hover
			fadeFullScreen: true
		}
	};

	$.SliderPro.addModule( 'FullScreen', FullScreen );

})( window, jQuery );

// Buttons module for Slider Pro.
// 
// Adds navigation buttons at the bottom of the slider.
;(function( window, $ ) {

	"use strict";
	
	var NS = 'Buttons.' + $.SliderPro.namespace;

	var Buttons = {

		// Reference to the buttons container
		$buttons: null,

		initButtons: function() {
			this.on( 'update.' + NS, $.proxy( this._buttonsOnUpdate, this ) );
		},

		_buttonsOnUpdate: function() {
			this.$buttons = this.$slider.find('.sp-buttons');
			
			// If there is more that one slide but the buttons weren't created yet, create the buttons.
			// If the buttons were created but their number differs from the total number of slides, re-create the buttons.
			// If the buttons were created but there are less than one slide, remove the buttons.s
			if ( this.settings.buttons === true && this.getTotalSlides() > 1 && this.$buttons.length === 0 ) {
				this._createButtons();
			} else if ( this.settings.buttons === true && this.getTotalSlides() !== this.$buttons.find( '.sp-button' ).length && this.$buttons.length !== 0 ) {
				this._adjustButtons();
			} else if ( this.settings.buttons === false || ( this.getTotalSlides() <= 1 && this.$buttons.length !== 0 ) ) {
				this._removeButtons();
			}
		},

		// Create the buttons
		_createButtons: function() {
			var that = this;

			// Create the buttons' container
			this.$buttons = $( '<div class="sp-buttons"></div>' ).appendTo( this.$slider );

			// Create the buttons
			for ( var i = 0; i < this.getTotalSlides(); i++ ) {
				$( '<div class="sp-button"></div>' ).appendTo( this.$buttons );
			}

			// Listen for button clicks 
			this.$buttons.on( 'click.' + NS, '.sp-button', function() {
				that.gotoSlide( $( this ).index() );
			});

			// Set the initially selected button
			this.$buttons.find( '.sp-button' ).eq( this.selectedSlideIndex ).addClass( 'sp-selected-button' );

			// Select the corresponding button when the slide changes
			this.on( 'gotoSlide.' + NS, function( event ) {
				that.$buttons.find( '.sp-selected-button' ).removeClass( 'sp-selected-button' );
				that.$buttons.find( '.sp-button' ).eq( event.index ).addClass( 'sp-selected-button' );
			});

			// Indicate that the slider has buttons 
			this.$slider.addClass( 'sp-has-buttons' );
		},

		// Re-create the buttons. This is calles when the number of slides changes.
		_adjustButtons: function() {
			this.$buttons.empty();

			// Create the buttons
			for ( var i = 0; i < this.getTotalSlides(); i++ ) {
				$( '<div class="sp-button"></div>' ).appendTo( this.$buttons );
			}

			// Change the selected the buttons
			this.$buttons.find( '.sp-selected-button' ).removeClass( 'sp-selected-button' );
			this.$buttons.find( '.sp-button' ).eq( this.selectedSlideIndex ).addClass( 'sp-selected-button' );
		},

		// Remove the buttons
		_removeButtons: function() {
			this.$buttons.off( 'click.' + NS, '.sp-button' );
			this.off( 'gotoSlide.' + NS );
			this.$buttons.remove();
			this.$slider.removeClass( 'sp-has-buttons' );
		},

		destroyButtons: function() {
			this._removeButtons();
			this.off( 'update.' + NS );
		},

		buttonsDefaults: {
			
			// Indicates whether the buttons will be created
			buttons: true
		}
	};

	$.SliderPro.addModule( 'Buttons', Buttons );

})( window, jQuery );

// Arrows module for Slider Pro.
// 
// Adds arrows for navigating to the next or previous slide.
;(function( window, $ ) {

	"use strict";

	var NS = 'Arrows.' + $.SliderPro.namespace;

	var Arrows = {

		// Reference to the arrows container
		$arrows: null,

		// Reference to the previous arrow
		$previousArrow: null,

		// Reference to the next arrow
		$nextArrow: null,

		initArrows: function() {
			this.on( 'update.' + NS, $.proxy( this._arrowsOnUpdate, this ) );
			this.on( 'gotoSlide.' + NS, $.proxy( this._checkArrowsVisibility, this ) );
		},

		_arrowsOnUpdate: function() {
			var that = this;

			// Create the arrows if the 'arrows' option is set to true
			if ( this.settings.arrows === true && this.$arrows === null ) {
				this.$arrows = $( '<div class="sp-arrows"></div>' ).appendTo( this.$slidesContainer );
				
				this.$previousArrow = $( '<div class="sp-arrow sp-previous-arrow"></div>' ).appendTo( this.$arrows );
				this.$nextArrow = $( '<div class="sp-arrow sp-next-arrow"></div>' ).appendTo( this.$arrows );

				this.$previousArrow.on( 'click.' + NS, function() {
					that.previousSlide();
				});

				this.$nextArrow.on( 'click.' + NS, function() {
					that.nextSlide();
				});

				this._checkArrowsVisibility();
			} else if ( this.settings.arrows === false && this.$arrows !== null ) {
				this._removeArrows();
			}

			if ( this.settings.arrows === true ) {
				if ( this.settings.fadeArrows === true ) {
					this.$arrows.addClass( 'sp-fade-arrows' );
				} else if ( this.settings.fadeArrows === false ) {
					this.$arrows.removeClass( 'sp-fade-arrows' );
				}
			}
		},

		// Show or hide the arrows depending on the position of the selected slide
		_checkArrowsVisibility: function() {
			if ( this.settings.arrows === false || this.settings.loop === true ) {
				return;
			}

			if ( this.selectedSlideIndex === 0 ) {
				this.$previousArrow.css( 'display', 'none' );
			} else {
				this.$previousArrow.css( 'display', 'block' );
			}

			if ( this.selectedSlideIndex === this.getTotalSlides() - 1 ) {
				this.$nextArrow.css( 'display', 'none' );
			} else {
				this.$nextArrow.css( 'display', 'block' );
			}
		},
		
		_removeArrows: function() {
			if ( this.$arrows !== null ) {
				this.$previousArrow.off( 'click.' + NS );
				this.$nextArrow.off( 'click.' + NS );
				this.$arrows.remove();
				this.$arrows = null;
			}
		},

		destroyArrows: function() {
			this._removeArrows();
			this.off( 'update.' + NS );
			this.off( 'gotoSlide.' + NS );
		},

		arrowsDefaults: {

			// Indicates whether the arrow buttons will be created
			arrows: false,

			// Indicates whether the arrows will fade in only on hover
			fadeArrows: true
		}
	};

	$.SliderPro.addModule( 'Arrows', Arrows );

})( window, jQuery );

// Thumbnail Touch Swipe module for Slider Pro.
// 
// Adds touch-swipe functionality for thumbnails.
;(function( window, $ ) {

	"use strict";
	
	var NS = 'ThumbnailTouchSwipe.' + $.SliderPro.namespace;

	var ThumbnailTouchSwipe = {

		// The x and y coordinates of the pointer/finger's starting position
		thumbnailTouchStartPoint: { x: 0, y: 0 },

		// The x and y coordinates of the pointer/finger's end position
		thumbnailTouchEndPoint: { x: 0, y: 0 },

		// The distance from the starting to the end position on the x and y axis
		thumbnailTouchDistance: { x: 0, y: 0 },

		// The position of the thumbnail scroller when the touch swipe starts
		thumbnailTouchStartPosition: 0,

		// Indicates if the thumbnail scroller is being swiped
		isThumbnailTouchMoving: false,

		// Indicates if the touch swipe was initialized
		isThumbnailTouchSwipe: false,

		// Stores the names of the events
		thumbnailTouchSwipeEvents: { startEvent: '', moveEvent: '', endEvent: '' },

		initThumbnailTouchSwipe: function() {
			this.on( 'update.' + NS, $.proxy( this._thumbnailTouchSwipeOnUpdate, this ) );
		},

		_thumbnailTouchSwipeOnUpdate: function() {

			// Return if there are no thumbnails
			if ( this.isThumbnailScroller === false ) {
				return;
			}

			// Initialize the touch swipe functionality if it wasn't initialized yet
			if ( this.settings.thumbnailTouchSwipe === true && this.isThumbnailTouchSwipe === false ) {
				this.isThumbnailTouchSwipe = true;

				this.thumbnailTouchSwipeEvents.startEvent = 'touchstart' + '.' + NS + ' mousedown' + '.' + NS;
				this.thumbnailTouchSwipeEvents.moveEvent = 'touchmove' + '.' + NS + ' mousemove' + '.' + NS;
				this.thumbnailTouchSwipeEvents.endEvent = 'touchend' + '.' + this.uniqueId + '.' + NS + ' mouseup' + '.' + this.uniqueId + '.' + NS;
				
				// Listen for touch swipe/mouse move events
				this.$thumbnails.on( this.thumbnailTouchSwipeEvents.startEvent, $.proxy( this._onThumbnailTouchStart, this ) );
				this.$thumbnails.on( 'dragstart.' + NS, function( event ) {
					event.preventDefault();
				});
			
				// Add the grabbing icon
				this.$thumbnails.addClass( 'sp-grab' );
			}

			// Remove the default thumbnailClick
			$.each( this.thumbnails, function( index, thumbnail ) {
				thumbnail.off( 'thumbnailClick' );
			});
		},

		// Called when the thumbnail scroller starts being dragged
		_onThumbnailTouchStart: function( event ) {
			// Disable dragging if the element is set to allow selections
			if ( $( event.target ).closest( '.sp-selectable' ).length >= 1 ) {
				return;
			}

			var that = this,
				eventObject = typeof event.originalEvent.touches !== 'undefined' ? event.originalEvent.touches[0] : event.originalEvent;

			// Prevent default behavior for mouse events
			if ( typeof event.originalEvent.touches === 'undefined' ) {
				event.preventDefault();
			}

			// Disable click events on links
			$( event.target ).parents( '.sp-thumbnail-container' ).find( 'a' ).one( 'click.' + NS, function( event ) {
				event.preventDefault();
			});

			// Get the initial position of the mouse pointer and the initial position
			// of the thumbnail scroller
			this.thumbnailTouchStartPoint.x = eventObject.pageX || eventObject.clientX;
			this.thumbnailTouchStartPoint.y = eventObject.pageY || eventObject.clientY;
			this.thumbnailTouchStartPosition = this.thumbnailsPosition;

			// Clear the previous distance values
			this.thumbnailTouchDistance.x = this.thumbnailTouchDistance.y = 0;

			// If the thumbnail scroller is being grabbed while it's still animating, stop the
			// current movement
			if ( this.$thumbnails.hasClass( 'sp-animated' ) ) {
				this.isThumbnailTouchMoving = true;
				this._stopThumbnailsMovement();
				this.thumbnailTouchStartPosition = this.thumbnailsPosition;
			}

			// Listen for move and end events
			this.$thumbnails.on( this.thumbnailTouchSwipeEvents.moveEvent, $.proxy( this._onThumbnailTouchMove, this ) );
			$( document ).on( this.thumbnailTouchSwipeEvents.endEvent, $.proxy( this._onThumbnailTouchEnd, this ) );

			// Swap grabbing icons
			this.$thumbnails.removeClass( 'sp-grab' ).addClass( 'sp-grabbing' );

			// Add 'sp-swiping' class to indicate that the thumbnail scroller is being swiped
			this.$thumbnailsContainer.addClass( 'sp-swiping' );
		},

		// Called during the thumbnail scroller's dragging
		_onThumbnailTouchMove: function( event ) {
			var eventObject = typeof event.originalEvent.touches !== 'undefined' ? event.originalEvent.touches[0] : event.originalEvent;

			// Indicate that the move event is being fired
			this.isThumbnailTouchMoving = true;

			// Get the current position of the mouse pointer
			this.thumbnailTouchEndPoint.x = eventObject.pageX || eventObject.clientX;
			this.thumbnailTouchEndPoint.y = eventObject.pageY || eventObject.clientY;

			// Calculate the distance of the movement on both axis
			this.thumbnailTouchDistance.x = this.thumbnailTouchEndPoint.x - this.thumbnailTouchStartPoint.x;
			this.thumbnailTouchDistance.y = this.thumbnailTouchEndPoint.y - this.thumbnailTouchStartPoint.y;
			
			// Calculate the distance of the swipe that takes place in the same direction as the orientation of the thumbnails
			// and calculate the distance from the opposite direction.
			// 
			// For a swipe to be valid there should more distance in the same direction as the orientation of the thumbnails.
			var distance = this.thumbnailsOrientation === 'horizontal' ? this.thumbnailTouchDistance.x : this.thumbnailTouchDistance.y,
				oppositeDistance = this.thumbnailsOrientation === 'horizontal' ? this.thumbnailTouchDistance.y : this.thumbnailTouchDistance.x;

			// If the movement is in the same direction as the orientation of the thumbnails, the swipe is valid
			if ( Math.abs( distance ) > Math.abs( oppositeDistance ) ) {
				event.preventDefault();
			} else {
				return;
			}

			// Make the thumbnail scroller move slower if it's dragged outside its bounds
			if ( this.thumbnailsPosition >= 0 ) {
				var infOffset = - this.thumbnailTouchStartPosition;
				distance = infOffset + ( distance - infOffset ) * 0.2;
			} else if ( this.thumbnailsPosition <= - this.thumbnailsSize + this.thumbnailsContainerSize ) {
				var supOffset = this.thumbnailsSize - this.thumbnailsContainerSize + this.thumbnailTouchStartPosition;
				distance = - supOffset + ( distance + supOffset ) * 0.2;
			}
			
			this._moveThumbnailsTo( this.thumbnailTouchStartPosition + distance, true );
		},

		// Called when the thumbnail scroller is released
		_onThumbnailTouchEnd: function( event ) {
			var that = this,
				thumbnailTouchDistance = this.thumbnailsOrientation === 'horizontal' ? this.thumbnailTouchDistance.x : this.thumbnailTouchDistance.y;

			// Remove the move and end listeners
			this.$thumbnails.off( this.thumbnailTouchSwipeEvents.moveEvent );
			$( document ).off( this.thumbnailTouchSwipeEvents.endEvent );

			// Swap grabbing icons
			this.$thumbnails.removeClass( 'sp-grabbing' ).addClass( 'sp-grab' );

			// Check if there is intention for a tap/click
			if ( this.isThumbnailTouchMoving === false ||
				this.isThumbnailTouchMoving === true &&
				Math.abs( this.thumbnailTouchDistance.x ) < 10 &&
				Math.abs( this.thumbnailTouchDistance.y ) < 10
			) {
				var targetThumbnail = $( event.target ).hasClass( 'sp-thumbnail-container' ) ? $( event.target ) : $( event.target ).parents( '.sp-thumbnail-container' ),
					index = targetThumbnail.index();

				// If a link is cliked, navigate to that link, else navigate to the slide that corresponds to the thumbnail
				if ( $( event.target ).parents( 'a' ).length !== 0 ) {
					$( event.target ).parents( 'a' ).off( 'click.' + NS );
					this.$thumbnailsContainer.removeClass( 'sp-swiping' );
				} else if ( index !== this.selectedThumbnailIndex && index !== -1 ) {
					this.gotoSlide( index );
				}

				return;
			}

			this.isThumbnailTouchMoving = false;

			$( event.target ).parents( '.sp-thumbnail' ).one( 'click', function( event ) {
				event.preventDefault();
			});

			// Remove the 'sp-swiping' class but with a delay
			// because there might be other event listeners that check
			// the existence of this class, and this class should still be 
			// applied for those listeners, since there was a swipe event
			setTimeout(function() {
				that.$thumbnailsContainer.removeClass( 'sp-swiping' );
			}, 1 );

			// Keep the thumbnail scroller inside the bounds
			if ( this.thumbnailsPosition > 0 ) {
				this._moveThumbnailsTo( 0 );
			} else if ( this.thumbnailsPosition < this.thumbnailsContainerSize - this.thumbnailsSize ) {
				this._moveThumbnailsTo( this.thumbnailsContainerSize - this.thumbnailsSize );
			}

			// Fire the 'thumbnailsMoveComplete' event
			this.trigger({ type: 'thumbnailsMoveComplete' });
			if ( $.isFunction( this.settings.thumbnailsMoveComplete ) ) {
				this.settings.thumbnailsMoveComplete.call( this, { type: 'thumbnailsMoveComplete' });
			}
		},

		// Destroy the module
		destroyThumbnailTouchSwipe: function() {
			this.off( 'update.' + NS );

			if ( this.isThumbnailScroller === false ) {
				return;
			}

			this.$thumbnails.off( this.thumbnailTouchSwipeEvents.startEvent );
			this.$thumbnails.off( this.thumbnailTouchSwipeEvents.moveEvent );
			this.$thumbnails.off( 'dragstart.' + NS );
			$( document ).off( this.thumbnailTouchSwipeEvents.endEvent );
			this.$thumbnails.removeClass( 'sp-grab' );
		},

		thumbnailTouchSwipeDefaults: {

			// Indicates whether the touch swipe will be enabled for thumbnails
			thumbnailTouchSwipe: true
		}
	};

	$.SliderPro.addModule( 'ThumbnailTouchSwipe', ThumbnailTouchSwipe );

})( window, jQuery );

// Thumbnail Arrows module for Slider Pro.
// 
// Adds thumbnail arrows for moving the thumbnail scroller.
;(function( window, $ ) {

	"use strict";
	
	var NS = 'ThumbnailArrows.' + $.SliderPro.namespace;

	var ThumbnailArrows = {

		// Reference to the arrows container
		$thumbnailArrows: null,

		// Reference to the 'previous' thumbnail arrow
		$previousThumbnailArrow: null,

		// Reference to the 'next' thumbnail arrow
		$nextThumbnailArrow: null,

		initThumbnailArrows: function() {
			var that = this;

			this.on( 'update.' + NS, $.proxy( this._thumbnailArrowsOnUpdate, this ) );
			
			// Check if the arrows need to be visible or invisible when the thumbnail scroller
			// resizes and when the thumbnail scroller moves.
			this.on( 'sliderResize.' + NS + ' ' + 'thumbnailsMoveComplete.' + NS, function() {
				if ( that.isThumbnailScroller === true && that.settings.thumbnailArrows === true ) {
					that._checkThumbnailArrowsVisibility();
				}
			});
		},
		
		// Called when the slider is updated
		_thumbnailArrowsOnUpdate: function() {
			var that = this;
			
			if ( this.isThumbnailScroller === false ) {
				return;
			}

			// Create or remove the thumbnail scroller arrows
			if ( this.settings.thumbnailArrows === true && this.$thumbnailArrows === null ) {
				this.$thumbnailArrows = $( '<div class="sp-thumbnail-arrows"></div>' ).appendTo( this.$thumbnailsContainer );
				
				this.$previousThumbnailArrow = $( '<div class="sp-thumbnail-arrow sp-previous-thumbnail-arrow"></div>' ).appendTo( this.$thumbnailArrows );
				this.$nextThumbnailArrow = $( '<div class="sp-thumbnail-arrow sp-next-thumbnail-arrow"></div>' ).appendTo( this.$thumbnailArrows );

				this.$previousThumbnailArrow.on( 'click.' + NS, function() {
					var previousPosition = Math.min( 0, that.thumbnailsPosition + that.thumbnailsContainerSize );
					that._moveThumbnailsTo( previousPosition );
				});

				this.$nextThumbnailArrow.on( 'click.' + NS, function() {
					var nextPosition = Math.max( that.thumbnailsContainerSize - that.thumbnailsSize, that.thumbnailsPosition - that.thumbnailsContainerSize );
					that._moveThumbnailsTo( nextPosition );
				});
			} else if ( this.settings.thumbnailArrows === false && this.$thumbnailArrows !== null ) {
				this._removeThumbnailArrows();
			}

			// Add fading functionality and check if the arrows need to be visible or not
			if ( this.settings.thumbnailArrows === true ) {
				if ( this.settings.fadeThumbnailArrows === true ) {
					this.$thumbnailArrows.addClass( 'sp-fade-thumbnail-arrows' );
				} else if ( this.settings.fadeThumbnailArrows === false ) {
					this.$thumbnailArrows.removeClass( 'sp-fade-thumbnail-arrows' );
				}

				this._checkThumbnailArrowsVisibility();
			}
		},

		// Checks if the 'next' or 'previous' arrows need to be visible or hidden,
		// based on the position of the thumbnail scroller
		_checkThumbnailArrowsVisibility: function() {
			if ( this.thumbnailsPosition === 0 ) {
				this.$previousThumbnailArrow.css( 'display', 'none' );
			} else {
				this.$previousThumbnailArrow.css( 'display', 'block' );
			}

			if ( this.thumbnailsPosition === this.thumbnailsContainerSize - this.thumbnailsSize ) {
				this.$nextThumbnailArrow.css( 'display', 'none' );
			} else {
				this.$nextThumbnailArrow.css( 'display', 'block' );
			}
		},

		// Remove the thumbnail arrows
		_removeThumbnailArrows: function() {
			if ( this.$thumbnailArrows !== null ) {
				this.$previousThumbnailArrow.off( 'click.' + NS );
				this.$nextThumbnailArrow.off( 'click.' + NS );
				this.$thumbnailArrows.remove();
				this.$thumbnailArrows = null;
			}
		},

		// Destroy the module
		destroyThumbnailArrows: function() {
			this._removeThumbnailArrows();
			this.off( 'update.' + NS );
			this.off( 'sliderResize.' + NS );
			this.off( 'thumbnailsMoveComplete.' + NS );
		},

		thumbnailArrowsDefaults: {

			// Indicates whether the thumbnail arrows will be enabled
			thumbnailArrows: false,

			// Indicates whether the thumbnail arrows will be faded
			fadeThumbnailArrows: true
		}
	};

	$.SliderPro.addModule( 'ThumbnailArrows', ThumbnailArrows );

})( window, jQuery );

// Video module for Slider Pro
//
// Adds automatic control for several video players and providers
;(function( window, $ ) {

	"use strict";

	var NS = 'Video.' + $.SliderPro.namespace;
	
	var Video = {

		firstInit: false,

		initVideo: function() {
			this.on( 'update.' + NS, $.proxy( this._videoOnUpdate, this ) );
			this.on( 'gotoSlideComplete.' + NS, $.proxy( this._videoOnGotoSlideComplete, this ) );
		},

		_videoOnUpdate: function() {
			var that = this;

			// Find all the inline videos and initialize them
			this.$slider.find( '.sp-video' ).not( 'a, [data-video-init]' ).each(function() {
				var video = $( this );
				that._initVideo( video );
			});

			// Find all the lazy-loaded videos and preinitialize them. They will be initialized
			// only when their play button is clicked.
			this.$slider.find( 'a.sp-video' ).not( '[data-video-preinit]' ).each(function() {
				var video = $( this );
				that._preinitVideo( video );
			});

			// call the 'gotoSlideComplete' method in case the first slide contains a video that
			// needs to play automatically
			if ( this.firstInit === false ) {
				this.firstInit = true;
				this._videoOnGotoSlideComplete({ index: this.selectedSlideIndex, previousIndex: -1 });
			}
		},

		// Initialize the target video
		_initVideo: function( video ) {
			var that = this;

			video.attr( 'data-video-init', true )
				.videoController();

			// When the video starts playing, pause the autoplay if it's running
			video.on( 'videoPlay.' + NS, function() {
				if ( that.settings.playVideoAction === 'stopAutoplay' && typeof that.stopAutoplay !== 'undefined' ) {
					that.stopAutoplay();
					that.settings.autoplay = false;
				}

				// Fire the 'videoPlay' event
				var eventObject = { type: 'videoPlay', video: video };
				that.trigger( eventObject );
				if ( $.isFunction( that.settings.videoPlay ) ) {
					that.settings.videoPlay.call( that, eventObject );
				}
			});

			// When the video is paused, restart the autoplay
			video.on( 'videoPause.' + NS, function() {
				if ( that.settings.pauseVideoAction === 'startAutoplay' && typeof that.startAutoplay !== 'undefined' ) {
					that.startAutoplay();
					that.settings.autoplay = true;
				}

				// Fire the 'videoPause' event
				var eventObject = { type: 'videoPause', video: video };
				that.trigger( eventObject );
				if ( $.isFunction( that.settings.videoPause ) ) {
					that.settings.videoPause.call( that, eventObject );
				}
			});

			// When the video ends, restart the autoplay (which was paused during the playback), or
			// go to the next slide, or replay the video
			video.on( 'videoEnded.' + NS, function() {
				if ( that.settings.endVideoAction === 'startAutoplay' && typeof that.startAutoplay !== 'undefined' ) {
					that.startAutoplay();
					that.settings.autoplay = true;
				} else if ( that.settings.endVideoAction === 'nextSlide' ) {
					that.nextSlide();
				} else if ( that.settings.endVideoAction === 'replayVideo' ) {
					video.videoController( 'replay' );
				}

				// Fire the 'videoEnd' event
				var eventObject = { type: 'videoEnd', video: video };
				that.trigger( eventObject );
				if ( $.isFunction(that.settings.videoEnd ) ) {
					that.settings.videoEnd.call( that, eventObject );
				}
			});
		},

		// Pre-initialize the video. This is for lazy loaded videos.
		_preinitVideo: function( video ) {
			var that = this;

			video.attr( 'data-video-preinit', true );

			// When the video poster is clicked, remove the poster and create
			// the inline video
			video.on( 'click.' + NS, function( event ) {

				// If the video is being dragged, don't start the video
				if ( that.$slider.hasClass( 'sp-swiping' ) ) {
					return;
				}

				event.preventDefault();

				var href = video.attr( 'href' ),
					iframe,
					provider,
					regExp,
					match,
					id,
					src,
					videoAttributes,
					videoWidth = video.children( 'img' ).attr( 'width' ) || video.children( 'img' ).width(),
					videoHeight = video.children( 'img' ).attr( 'height') || video.children( 'img' ).height();

				// Check if it's a youtube or vimeo video
				if ( href.indexOf( 'youtube' ) !== -1 || href.indexOf( 'youtu.be' ) !== -1 ) {
					provider = 'youtube';
				} else if ( href.indexOf( 'vimeo' ) !== -1 ) {
					provider = 'vimeo';
				}

				// Get the id of the video
				regExp = provider === 'youtube' ? /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/ : /http:\/\/(www\.)?vimeo.com\/(\d+)/;
				match = href.match( regExp );
				id = match[2];

				// Get the source of the iframe that will be created
				src = provider === 'youtube' ? '//www.youtube.com/embed/' + id + '?enablejsapi=1&wmode=opaque' : '//player.vimeo.com/video/'+ id +'?api=1';
				
				// Get the attributes passed to the video link and then pass them to the iframe's src
				videoAttributes = href.split( '?' )[ 1 ];

				if ( typeof videoAttributes !== 'undefined' ) {
					videoAttributes = videoAttributes.split( '&' );

					$.each( videoAttributes, function( index, value ) {
						if ( value.indexOf( id ) === -1 ) {
							src += '&' + value;
						}
					});
				}

				// Create the iframe
				iframe = $( '<iframe></iframe>' )
					.attr({
						'src': src,
						'width': videoWidth,
						'height': videoHeight,
						'class': video.attr( 'class' ),
						'frameborder': 0,
						'allowfullscreen': 'allowfullscreen'
					}).insertBefore( video );

				// Initialize the video and play it
				that._initVideo( iframe );
				iframe.videoController( 'play' );

				// Hide the video poster
				video.css( 'display', 'none' );
			});
		},

		// Called when a new slide is selected
		_videoOnGotoSlideComplete: function( event ) {

			// Get the video from the previous slide
			var previousVideo = this.$slides.find( '.sp-slide' ).eq( event.previousIndex ).find( '.sp-video[data-video-init]' );

			// Handle the video from the previous slide by stopping it, or pausing it,
			// or remove it, depending on the value of the 'leaveVideoAction' option.
			if ( event.previousIndex !== -1 && previousVideo.length !== 0 ) {
				if ( this.settings.leaveVideoAction === 'stopVideo' ) {
					previousVideo.videoController( 'stop' );
				} else if ( this.settings.leaveVideoAction === 'pauseVideo' ) {
					previousVideo.videoController( 'pause' );
				} else if ( this.settings.leaveVideoAction === 'removeVideo'  ) {
					// If the video was lazy-loaded, remove it and show the poster again. If the video
					// was not lazy-loaded, but inline, stop the video.
					if ( previousVideo.siblings( 'a.sp-video' ).length !== 0 ) {
						previousVideo.siblings( 'a.sp-video' ).css( 'display', '' );
						previousVideo.videoController( 'destroy' );
						previousVideo.remove();
					} else {
						previousVideo.videoController( 'stop' );
					}
				}
			}

			// Handle the video from the selected slide
			if ( this.settings.reachVideoAction === 'playVideo' ) {
				var loadedVideo = this.$slides.find( '.sp-slide' ).eq( event.index ).find( '.sp-video[data-video-init]' ),
					unloadedVideo = this.$slides.find( '.sp-slide' ).eq( event.index ).find( '.sp-video[data-video-preinit]' );

				// If the video was already initialized, play it. If it's not initialized (because
				// it's lazy loaded) initialize it and play it.
				if ( loadedVideo.length !== 0 ) {
					loadedVideo.videoController( 'play' );
				} else if ( unloadedVideo.length !== 0 ) {
					unloadedVideo.trigger( 'click.' + NS );
				}
			}
		},

		// Destroy the module
		destroyVideo: function() {
			this.$slider.find( '.sp-video[ data-video-preinit ]' ).each(function() {
				var video = $( this );
				video.removeAttr( 'data-video-preinit' );
				video.off( 'click.' + NS );
			});

			// Loop through the all the videos and destroy them
			this.$slider.find( '.sp-video[ data-video-init ]' ).each(function() {
				var video = $( this );
				video.removeAttr( 'data-video-init' );
				video.off( 'Video' );
				video.videoController( 'destroy' );
			});

			this.off( 'update.' + NS );
			this.off( 'gotoSlideComplete.' + NS );
		},

		videoDefaults: {

			// Sets the action that the video will perform when its slide container is selected
			// ( 'playVideo' and 'none' )
			reachVideoAction: 'none',

			// Sets the action that the video will perform when another slide is selected
			// ( 'stopVideo', 'pauseVideo', 'removeVideo' and 'none' )
			leaveVideoAction: 'pauseVideo',

			// Sets the action that the slider will perform when the video starts playing
			// ( 'stopAutoplay' and 'none' )
			playVideoAction: 'stopAutoplay',

			// Sets the action that the slider will perform when the video is paused
			// ( 'startAutoplay' and 'none' )
			pauseVideoAction: 'none',

			// Sets the action that the slider will perform when the video ends
			// ( 'startAutoplay', 'nextSlide', 'replayVideo' and 'none' )
			endVideoAction: 'none',

			// Called when the video starts playing
			videoPlay: function() {},

			// Called when the video is paused
			videoPause: function() {},

			// Called when the video ends
			videoEnd: function() {}
		}
	};

	$.SliderPro.addModule( 'Video', Video );
	
})( window, jQuery );

// Video Controller jQuery plugin
// Creates a universal controller for multiple video types and providers
;(function( $ ) {

	"use strict";

// Check if an iOS device is used.
// This information is important because a video can not be
// controlled programmatically unless the user has started the video manually.
var	isIOS = window.navigator.userAgent.match( /(iPad|iPhone|iPod)/g ) ? true : false;

var VideoController = function( instance, options ) {
	this.$video = $( instance );
	this.options = options;
	this.settings = {};
	this.player = null;

	this._init();
};

VideoController.prototype = {

	_init: function() {
		this.settings = $.extend( {}, this.defaults, this.options );

		var that = this,
			players = $.VideoController.players,
			videoID = this.$video.attr( 'id' );

		// Loop through the available video players
		// and check if the targeted video element is supported by one of the players.
		// If a compatible type is found, store the video type.
		for ( var name in players ) {
			if ( typeof players[ name ] !== 'undefined' && players[ name ].isType( this.$video ) ) {
				this.player = new players[ name ]( this.$video );
				break;
			}
		}

		// Return if the player could not be instantiated
		if ( this.player === null ) {
			return;
		}

		// Add event listeners
		var events = [ 'ready', 'start', 'play', 'pause', 'ended' ];
		
		$.each( events, function( index, element ) {
			var event = 'video' + element.charAt( 0 ).toUpperCase() + element.slice( 1 );

			that.player.on( element, function() {
				that.trigger({ type: event, video: videoID });
				if ( $.isFunction( that.settings[ event ] ) ) {
					that.settings[ event ].call( that, { type: event, video: videoID } );
				}
			});
		});
	},
	
	play: function() {
		if ( isIOS === true && this.player.isStarted() === false || this.player.getState() === 'playing' ) {
			return;
		}

		this.player.play();
	},
	
	stop: function() {
		if ( isIOS === true && this.player.isStarted() === false || this.player.getState() === 'stopped' ) {
			return;
		}

		this.player.stop();
	},
	
	pause: function() {
		if ( isIOS === true && this.player.isStarted() === false || this.player.getState() === 'paused' ) {
			return;
		}

		this.player.pause();
	},

	replay: function() {
		if ( isIOS === true && this.player.isStarted() === false ) {
			return;
		}
		
		this.player.replay();
	},

	on: function( type, callback ) {
		return this.$video.on( type, callback );
	},
	
	off: function( type ) {
		return this.$video.off( type );
	},

	trigger: function( data ) {
		return this.$video.triggerHandler( data );
	},

	destroy: function() {
		if ( this.player.isStarted() === true ) {
			this.stop();
		}

		this.player.off( 'ready' );
		this.player.off( 'start' );
		this.player.off( 'play' );
		this.player.off( 'pause' );
		this.player.off( 'ended' );

		this.$video.removeData( 'videoController' );
	},

	defaults: {
		videoReady: function() {},
		videoStart: function() {},
		videoPlay: function() {},
		videoPause: function() {},
		videoEnded: function() {}
	}
};

$.VideoController = {
	players: {},

	addPlayer: function( name, player ) {
		this.players[ name ] = player;
	}
};

$.fn.videoController = function( options ) {
	var args = Array.prototype.slice.call( arguments, 1 );

	return this.each(function() {
		// Instantiate the video controller or call a function on the current instance
		if ( typeof $( this ).data( 'videoController' ) === 'undefined' ) {
			var newInstance = new VideoController( this, options );

			// Store a reference to the instance created
			$( this ).data( 'videoController', newInstance );
		} else if ( typeof options !== 'undefined' ) {
			var	currentInstance = $( this ).data( 'videoController' );

			// Check the type of argument passed
			if ( typeof currentInstance[ options ] === 'function' ) {
				currentInstance[ options ].apply( currentInstance, args );
			} else {
				$.error( options + ' does not exist in videoController.' );
			}
		}
	});
};

// Base object for the video players
var Video = function( video ) {
	this.$video = video;
	this.player = null;
	this.ready = false;
	this.started = false;
	this.state = '';
	this.events = $({});

	this._init();
};

Video.prototype = {
	_init: function() {},

	play: function() {},

	pause: function() {},

	stop: function() {},

	replay: function() {},

	isType: function() {},

	isReady: function() {
		return this.ready;
	},

	isStarted: function() {
		return this.started;
	},

	getState: function() {
		return this.state;
	},

	on: function( type, callback ) {
		return this.events.on( type, callback );
	},
	
	off: function( type ) {
		return this.events.off( type );
	},

	trigger: function( data ) {
		return this.events.triggerHandler( data );
	}
};

// YouTube video
var YoutubeVideoHelper = {
	youtubeAPIAdded: false,
	youtubeVideos: []
};

var YoutubeVideo = function( video ) {
	this.init = false;
	var youtubeAPILoaded = window.YT && window.YT.Player;

	if ( typeof youtubeAPILoaded !== 'undefined' ) {
		Video.call( this, video );
	} else {
		YoutubeVideoHelper.youtubeVideos.push({ 'video': video, 'scope': this });
		
		if ( YoutubeVideoHelper.youtubeAPIAdded === false ) {
			YoutubeVideoHelper.youtubeAPIAdded = true;

			var tag = document.createElement( 'script' );
			tag.src = "//www.youtube.com/player_api";
			var firstScriptTag = document.getElementsByTagName( 'script' )[0];
			firstScriptTag.parentNode.insertBefore( tag, firstScriptTag );

			window.onYouTubePlayerAPIReady = function() {
				$.each( YoutubeVideoHelper.youtubeVideos, function( index, element ) {
					Video.call( element.scope, element.video );
				});
			};
		}
	}
};

YoutubeVideo.prototype = new Video();
YoutubeVideo.prototype.constructor = YoutubeVideo;
$.VideoController.addPlayer( 'YoutubeVideo', YoutubeVideo );

YoutubeVideo.isType = function( video ) {
	if ( video.is( 'iframe' ) ) {
		var src = video.attr( 'src' );

		if ( src.indexOf( 'youtube.com' ) !== -1 || src.indexOf( 'youtu.be' ) !== -1 ) {
			return true;
		}
	}

	return false;
};

YoutubeVideo.prototype._init = function() {
	this.init = true;
	this._setup();
};
	
YoutubeVideo.prototype._setup = function() {
	var that = this;

	// Get a reference to the player
	this.player = new YT.Player( this.$video[0], {
		events: {
			'onReady': function() {
				that.trigger({ type: 'ready' });
				that.ready = true;
			},
			
			'onStateChange': function( event ) {
				switch ( event.data ) {
					case YT.PlayerState.PLAYING:
						if (that.started === false) {
							that.started = true;
							that.trigger({ type: 'start' });
						}

						that.state = 'playing';
						that.trigger({ type: 'play' });
						break;
					
					case YT.PlayerState.PAUSED:
						that.state = 'paused';
						that.trigger({ type: 'pause' });
						break;
					
					case YT.PlayerState.ENDED:
						that.state = 'ended';
						that.trigger({ type: 'ended' });
						break;
				}
			}
		}
	});
};

YoutubeVideo.prototype.play = function() {
	var that = this;

	if ( this.ready === true ) {
		this.player.playVideo();
	} else {
		var timer = setInterval(function() {
			if ( that.ready === true ) {
				clearInterval( timer );
				that.player.playVideo();
			}
		}, 100 );
	}
};

YoutubeVideo.prototype.pause = function() {
	// On iOS, simply pausing the video can make other videos unresponsive
	// so we stop the video instead.
	if ( isIOS === true ) {
		this.stop();
	} else {
		this.player.pauseVideo();
	}
};

YoutubeVideo.prototype.stop = function() {
	this.player.seekTo( 1 );
	this.player.stopVideo();
	this.state = 'stopped';
};

YoutubeVideo.prototype.replay = function() {
	this.player.seekTo( 1 );
	this.player.playVideo();
};

YoutubeVideo.prototype.on = function( type, callback ) {
	var that = this;

	if ( this.init === true ) {
		Video.prototype.on.call( this, type, callback );
	} else {
		var timer = setInterval(function() {
			if ( that.init === true ) {
				clearInterval( timer );
				Video.prototype.on.call( that, type, callback );
			}
		}, 100 );
	}
};

// Vimeo video
var VimeoVideoHelper = {
	vimeoAPIAdded: false,
	vimeoVideos: []
};

var VimeoVideo = function( video ) {
	this.init = false;

	if ( typeof window.Froogaloop !== 'undefined' ) {
		Video.call( this, video );
	} else {
		VimeoVideoHelper.vimeoVideos.push({ 'video': video, 'scope': this });

		if ( VimeoVideoHelper.vimeoAPIAdded === false ) {
			VimeoVideoHelper.vimeoAPIAdded = true;

			var tag = document.createElement('script');
			tag.src = "//a.vimeocdn.com/js/froogaloop2.min.js";
			var firstScriptTag = document.getElementsByTagName( 'script' )[0];
			firstScriptTag.parentNode.insertBefore( tag, firstScriptTag );
		
			var checkVimeoAPITimer = setInterval(function() {
				if ( typeof window.Froogaloop !== 'undefined' ) {
					clearInterval( checkVimeoAPITimer );
					
					$.each( VimeoVideoHelper.vimeoVideos, function( index, element ) {
						Video.call( element.scope, element.video );
					});
				}
			}, 100 );
		}
	}
};

VimeoVideo.prototype = new Video();
VimeoVideo.prototype.constructor = VimeoVideo;
$.VideoController.addPlayer( 'VimeoVideo', VimeoVideo );

VimeoVideo.isType = function( video ) {
	if ( video.is( 'iframe' ) ) {
		var src = video.attr('src');

		if ( src.indexOf( 'vimeo.com' ) !== -1 ) {
			return true;
		}
	}

	return false;
};

VimeoVideo.prototype._init = function() {
	this.init = true;
	this._setup();
};

VimeoVideo.prototype._setup = function() {
	var that = this;

	// Get a reference to the player
	this.player = $f( this.$video[0] );
	
	this.player.addEvent( 'ready', function() {
		that.ready = true;
		that.trigger({ type: 'ready' });
		
		that.player.addEvent( 'play', function() {
			if ( that.started === false ) {
				that.started = true;
				that.trigger({ type: 'start' });
			}

			that.state = 'playing';
			that.trigger({ type: 'play' });
		});
		
		that.player.addEvent( 'pause', function() {
			that.state = 'paused';
			that.trigger({ type: 'pause' });
		});
		
		that.player.addEvent( 'finish', function() {
			that.state = 'ended';
			that.trigger({ type: 'ended' });
		});
	});
};

VimeoVideo.prototype.play = function() {
	var that = this;

	if ( this.ready === true ) {
		this.player.api( 'play' );
	} else {
		var timer = setInterval(function() {
			if ( that.ready === true ) {
				clearInterval( timer );
				that.player.api( 'play' );
			}
		}, 100 );
	}
};

VimeoVideo.prototype.pause = function() {
	this.player.api( 'pause' );
};

VimeoVideo.prototype.stop = function() {
	this.player.api( 'seekTo', 0 );
	this.player.api( 'pause' );
	this.state = 'stopped';
};

VimeoVideo.prototype.replay = function() {
	this.player.api( 'seekTo', 0 );
	this.player.api( 'play' );
};

VimeoVideo.prototype.on = function( type, callback ) {
	var that = this;

	if ( this.init === true ) {
		Video.prototype.on.call( this, type, callback );
	} else {
		var timer = setInterval(function() {
			if ( that.init === true ) {
				clearInterval( timer );
				Video.prototype.on.call( that, type, callback );
			}
		}, 100 );
	}
};

// HTML5 video
var HTML5Video = function( video ) {
	Video.call( this, video );
};

HTML5Video.prototype = new Video();
HTML5Video.prototype.constructor = HTML5Video;
$.VideoController.addPlayer( 'HTML5Video', HTML5Video );

HTML5Video.isType = function( video ) {
	if ( video.is( 'video' ) && video.hasClass( 'video-js' ) === false && video.hasClass( 'sublime' ) === false ) {
		return true;
	}

	return false;
};

HTML5Video.prototype._init = function() {
	var that = this;

	// Get a reference to the player
	this.player = this.$video[0];
	
	var checkVideoReady = setInterval(function() {
		if ( that.player.readyState === 4 ) {
			clearInterval( checkVideoReady );

			that.ready = true;
			that.trigger({ type: 'ready' });

			that.player.addEventListener( 'play', function() {
				if ( that.started === false ) {
					that.started = true;
					that.trigger({ type: 'start' });
				}

				that.state = 'playing';
				that.trigger({ type: 'play' });
			});
			
			that.player.addEventListener( 'pause', function() {
				that.state = 'paused';
				that.trigger({ type: 'pause' });
			});
			
			that.player.addEventListener( 'ended', function() {
				that.state = 'ended';
				that.trigger({ type: 'ended' });
			});
		}
	}, 100 );
};

HTML5Video.prototype.play = function() {
	var that = this;

	if ( this.ready === true ) {
		this.player.play();
	} else {
		var timer = setInterval(function() {
			if ( that.ready === true ) {
				clearInterval( timer );
				that.player.play();
			}
		}, 100 );
	}
};

HTML5Video.prototype.pause = function() {
	this.player.pause();
};

HTML5Video.prototype.stop = function() {
	this.player.currentTime = 0;
	this.player.pause();
	this.state = 'stopped';
};

HTML5Video.prototype.replay = function() {
	this.player.currentTime = 0;
	this.player.play();
};

// VideoJS video
var VideoJSVideo = function( video ) {
	Video.call( this, video );
};

VideoJSVideo.prototype = new Video();
VideoJSVideo.prototype.constructor = VideoJSVideo;
$.VideoController.addPlayer( 'VideoJSVideo', VideoJSVideo );

VideoJSVideo.isType = function( video ) {
	if ( ( typeof video.attr( 'data-videojs-id' ) !== 'undefined' || video.hasClass( 'video-js' ) ) && typeof videojs !== 'undefined' ) {
		return true;
	}

	return false;
};

VideoJSVideo.prototype._init = function() {
	var that = this,
		videoID = this.$video.hasClass( 'video-js' ) ? this.$video.attr( 'id' ) : this.$video.attr( 'data-videojs-id' );
	
	this.player = videojs( videoID );

	this.player.ready(function() {
		that.ready = true;
		that.trigger({ type: 'ready' });

		that.player.on( 'play', function() {
			if ( that.started === false ) {
				that.started = true;
				that.trigger({ type: 'start' });
			}

			that.state = 'playing';
			that.trigger({ type: 'play' });
		});
		
		that.player.on( 'pause', function() {
			that.state = 'paused';
			that.trigger({ type: 'pause' });
		});
		
		that.player.on( 'ended', function() {
			that.state = 'ended';
			that.trigger({ type: 'ended' });
		});
	});
};

VideoJSVideo.prototype.play = function() {
	this.player.play();
};

VideoJSVideo.prototype.pause = function() {
	this.player.pause();
};

VideoJSVideo.prototype.stop = function() {
	this.player.currentTime( 0 );
	this.player.pause();
	this.state = 'stopped';
};

VideoJSVideo.prototype.replay = function() {
	this.player.currentTime( 0 );
	this.player.play();
};

// Sublime video
var SublimeVideo = function( video ) {
	Video.call( this, video );
};

SublimeVideo.prototype = new Video();
SublimeVideo.prototype.constructor = SublimeVideo;
$.VideoController.addPlayer( 'SublimeVideo', SublimeVideo );

SublimeVideo.isType = function( video ) {
	if ( video.hasClass( 'sublime' ) && typeof sublime !== 'undefined' ) {
		return true;
	}

	return false;
};

SublimeVideo.prototype._init = function() {
	var that = this;

	sublime.ready(function() {
		// Get a reference to the player
		that.player = sublime.player( that.$video.attr( 'id' ) );

		that.ready = true;
		that.trigger({ type: 'ready' });

		that.player.on( 'play', function() {
			if ( that.started === false ) {
				that.started = true;
				that.trigger({ type: 'start' });
			}

			that.state = 'playing';
			that.trigger({ type: 'play' });
		});

		that.player.on( 'pause', function() {
			that.state = 'paused';
			that.trigger({ type: 'pause' });
		});

		that.player.on( 'stop', function() {
			that.state = 'stopped';
			that.trigger({ type: 'stop' });
		});

		that.player.on( 'end', function() {
			that.state = 'ended';
			that.trigger({ type: 'ended' });
		});
	});
};

SublimeVideo.prototype.play = function() {
	this.player.play();
};

SublimeVideo.prototype.pause = function() {
	this.player.pause();
};

SublimeVideo.prototype.stop = function() {
	this.player.stop();
};

SublimeVideo.prototype.replay = function() {
	this.player.stop();
	this.player.play();
};

// JWPlayer video
var JWPlayerVideo = function( video ) {
	Video.call( this, video );
};

JWPlayerVideo.prototype = new Video();
JWPlayerVideo.prototype.constructor = JWPlayerVideo;
$.VideoController.addPlayer( 'JWPlayerVideo', JWPlayerVideo );

JWPlayerVideo.isType = function( video ) {
	if ( ( typeof video.attr( 'data-jwplayer-id' ) !== 'undefined' || video.hasClass( 'jwplayer' ) || video.find( "object[data*='jwplayer']" ).length !== 0 ) &&
		typeof jwplayer !== 'undefined') {
		return true;
	}

	return false;
};

JWPlayerVideo.prototype._init = function() {
	var that = this,
		videoID;

	if ( this.$video.hasClass( 'jwplayer' ) ) {
		videoID = this.$video.attr( 'id' );
	} else if ( typeof this.$video.attr( 'data-jwplayer-id' ) !== 'undefined' ) {
		videoID = this.$video.attr( 'data-jwplayer-id');
	} else if ( this.$video.find( "object[data*='jwplayer']" ).length !== 0 ) {
		videoID = this.$video.find( 'object' ).attr( 'id' );
	}

	// Get a reference to the player
	this.player = jwplayer( videoID );

	this.player.onReady(function() {
		that.ready = true;
		that.trigger({ type: 'ready' });
	
		that.player.onPlay(function() {
			if ( that.started === false ) {
				that.started = true;
				that.trigger({ type: 'start' });
			}

			that.state = 'playing';
			that.trigger({ type: 'play' });
		});

		that.player.onPause(function() {
			that.state = 'paused';
			that.trigger({ type: 'pause' });
		});
		
		that.player.onComplete(function() {
			that.state = 'ended';
			that.trigger({ type: 'ended' });
		});
	});
};

JWPlayerVideo.prototype.play = function() {
	this.player.play( true );
};

JWPlayerVideo.prototype.pause = function() {
	this.player.pause( true );
};

JWPlayerVideo.prototype.stop = function() {
	this.player.stop();
	this.state = 'stopped';
};

JWPlayerVideo.prototype.replay = function() {
	this.player.seek( 0 );
	this.player.play( true );
};

})( jQuery );