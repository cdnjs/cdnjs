
/*
	By André Knieriem, www.andreknieriem.de
	Available for use under the MIT License
*/

;( function( $, window, document, undefined )
{
	'use strict';
	
$.fn.simpleLightbox = function( options )
{
	
	var options = $.extend({
		overlay:		true,
		spinner:		true,
		nav:			true,
		navText:		['&larr;','&rarr;'],
		captions:		true,
		captionsData:	'title',
		close:			true,
		closeText:		'X',
		showCounter:	true,
	 	fileExt:		'png|jpg|jpeg|gif',
	 	animationSpeed:	250,
	 	preloading:		true,
	 	enableKeyboard:	true,
	 	loop:			true,
	 	docClose: 		true,
	 	swipeTolerance: 50,
	 	className:		'simple-lightbox',
	 	widthRatio: 	0.8,
	 	heightRatio: 	0.9
	 	
	 }, options );
	
	// global variables
	var touchDevice	= ( 'ontouchstart' in window ),
	    pointerEnabled = window.navigator.pointerEnabled || window.navigator.msPointerEnabled,
	    touched = function( event ){
            if( touchDevice ) return true;

            if( !pointerEnabled || typeof event === 'undefined' || typeof event.pointerType === 'undefined' )
                return false;

            if( typeof event.MSPOINTER_TYPE_MOUSE !== 'undefined' )
            {
                if( event.MSPOINTER_TYPE_MOUSE != event.pointerType )
                    return true;
            }
            else
                if( event.pointerType != 'mouse' )
                    return true;

            return false;
        },
        swipeDiff = 0,
		curImg = $(),
	    transPrefix = function(){
	        var s = document.body || document.documentElement, s = s.style;
	        if( s.WebkitTransition == '' ) return '-webkit-';
	        if( s.MozTransition == '' ) return '-moz-';
	        if( s.OTransition == '' ) return '-o-';
	        if( s.transition == '' ) return '';
	        return false;
		},
		opened = false,
		selector = this.selector,
		transPrefix = transPrefix(),
		canTransisions = (transPrefix !== false) ? true : false,
		prefix = 'simplelb',
		overlay = $('<div>').addClass('sl-overlay'),
		closeBtn = $('<button>').addClass('sl-close').html(options.closeText),
		spinner = $('<div>').addClass('sl-spinner').html('<div></div>'),
		nav = $('<div>').addClass('sl-navigation').html('<button class="sl-prev">'+options.navText[0]+'</button><button class="sl-next">'+options.navText[1]+'</button>'),
		counter = $('<div>').addClass('sl-counter').html('<span class="sl-current"></span>/<span class="sl-total"></span>'),
		animating = false,
		index = 0,
		image = $(),
		caption = $('<div>').addClass('sl-caption'),
		isValidLink = function( element ){
			return $( element ).prop( 'tagName' ).toLowerCase() == 'a' && ( new RegExp( '\.(' + options.fileExt + ')$', 'i' ) ).test( $( element ).attr( 'href' ) );
		},
		setup = function(){
			if(options.overlay) overlay.appendTo($('body'));
	        $('<div>')
	        	.addClass('sl-wrapper').addClass(options.className)
	        	.html('<div class="sl-image"></div>')
	        	.appendTo('body');
	        image = $('.sl-image');
	        if(options.close) closeBtn.appendTo($('.sl-wrapper'));
	        if(options.showCounter){
	        	if($(selector).length > 1){
	        		counter.appendTo($('.sl-wrapper'));
	        		$('.sl-wrapper .sl-counter .sl-total').text($(selector).length);
	        	}
	        	
	        }
	        if(options.nav) nav.appendTo($('.sl-wrapper'));
	        if(options.spinner) spinner.appendTo($('.sl-wrapper'));
		},
		openImage = function(elem){
			elem.trigger($.Event('show.simplelightbox'));
			animating = true;
			index = $(selector).index(elem);
	        curImg = $( '<img/>' )
	        .hide()
	        .attr('src', elem.attr('href'));
	        $('.sl-image').html('');
        	curImg.appendTo($('.sl-image'));
        	overlay.fadeIn('fast');
        	$('.sl-close').fadeIn('fast');
        	spinner.show();
        	nav.fadeIn('fast');
        	$('.sl-wrapper .sl-counter .sl-current').text(index +1);
        	counter.fadeIn('fast');
        	adjustImage();
        	if(options.preloading){
		    	preload();
		    }
		    setTimeout( function(){ elem.trigger($.Event('shown.simplelightbox'));} ,options.animationSpeed);
		},
		adjustImage = function(dir){
			if(!curImg.length) return;
      	var tmpImage 	 = new Image(),
			windowWidth	 = $( window ).width() * options.widthRatio,
			windowHeight = $( window ).height() * options.heightRatio;
        	tmpImage.src	= curImg.attr( 'src' );
        	
        	tmpImage.onload = function() {
				var imageWidth	 = tmpImage.width,
					imageHeight	 = tmpImage.height;
				
				if( imageWidth > windowWidth || imageHeight > windowHeight ){
					var ratio	 = imageWidth / imageHeight > windowWidth / windowHeight ? imageWidth / windowWidth : imageHeight / windowHeight;
					imageWidth	/= ratio;
					imageHeight	/= ratio;
				}
				
				$('.sl-image').css({
					'top':    ( $( window ).height() - imageHeight ) / 2 + 'px',
					'left':   ( $( window ).width() - imageWidth ) / 2 + 'px'
				});
				spinner.hide();
				curImg
				.css({
					'width':  imageWidth + 'px',
					'height': imageHeight + 'px'
				})
				.fadeIn('fast');
				opened = true;
				
				var captionText = (options.captionsData == 'data-title') ? $(selector).eq(index).find('img').data('title') : $(selector).eq(index).find('img').prop(options.captionsData);
				if(dir == 1 || dir == -1){
					var css = { 'opacity': 1.0 };
					if( canTransisions ) {
						slide(0, 100 * dir + 'px');
						setTimeout( function(){ slide( options.animationSpeed / 1000, 0 + 'px'), 50 });
					}
					else {
						css.left = parseInt( $('.sl-image').css( 'left' ) ) + 100 * dir + 'px';
					}
					$('.sl-image').animate( css, options.animationSpeed, function(){
						animating = false;
						setCaption(captionText);
					});
					
				} else {
					animating = false;
					setCaption(captionText);
				}
			}
		},
		setCaption = function(captiontext){
			if(captiontext != '' && options.captions){
				caption.html(captiontext).hide().appendTo($('.sl-image')).fadeIn('fast');
			}
		},
		slide = function(speed, pos){
		var styles = {};
			styles[transPrefix + 'transform'] = 'translateX(' + pos + ')';
			styles[transPrefix + 'transition'] = transPrefix + 'transform ' + speed + 's linear';
			$('.sl-image').css(styles);
		},
		preload = function(){
			var next = (index+1 < 0) ? $(selector).length -1: (index+1 >= $(selector).length -1) ? 0 : index+1,
				prev = (index-1 < 0) ? $(selector).length -1: (index-1 >= $(selector).length -1) ? 0 : index-1;
			$( '<img />' ).attr( 'src', $(selector).eq(next).attr( 'href' ) ).load();
			$( '<img />' ).attr( 'src', $(selector).eq(prev).attr( 'href' ) ).load();
				
		},
		loadImage = function(dir){
		    spinner.show();
		var newIndex = index + dir;
			if(animating || (newIndex < 0 || newIndex >= $(selector).length) && options.loop == false ) return;
			animating = true;
			index = (newIndex < 0) ? $(selector).length -1: (newIndex > $(selector).length -1) ? 0 : newIndex;
			$('.sl-wrapper .sl-counter .sl-current').text(index +1);
      	var css = { 'opacity': 0 };
			if( canTransisions ) slide(options.animationSpeed / 1000, ( -100 * dir ) - swipeDiff + 'px');
			else css.left = parseInt( $('.sl-image').css( 'left' ) ) + -100 * dir + 'px';
			$('.sl-image').animate( css, options.animationSpeed, function(){
				setTimeout( function(){
					// fadeout old image
					var elem = $(selector).eq(index);
					curImg
					.attr('src', elem.attr('href'));
					$('.sl-caption').remove();
					adjustImage(dir);
					if(options.preloading) preload();
				}, 100);
			});
		},
		close = function(){
			var elem = $(selector).eq(index), 
				triggered = false;
			elem.trigger($.Event('close.simplelightbox'));
		    $('.sl-image img, .sl-overlay, .sl-close, .sl-navigation, .sl-image .sl-caption, .sl-counter').fadeOut('fast', function(){
		    	if(!triggered) elem.trigger($.Event('closed.simplelightbox'));
		    	triggered = true;
		    });
		    curImg = $();
		    opened = false;
		}
		  
	// events
	setup();
	
	// resize/responsive
	$( window ).on( 'resize', adjustImage );	
	
	// open lightbox
	$( document ).on( 'click.'+prefix, this.selector, function( e ){
	  if(isValidLink(this)){
	    e.preventDefault();
	    if(animating) return false;
	    openImage($(this));
	  }
	});
	
	// close lightbox on close btn
	$(document).on('click', '.sl-close', function(e){
		e.preventDefault();
		if(opened){ close();}
	});
	
	// close on click on doc
	$(document).click(function(e){
		if(opened){
			if((options.docClose && $(e.target).closest('.sl-image').length == 0 && $(e.target).closest('.sl-navigation').length == 0)
			){				close();
			}
		}
	});
	
	// nav-buttons
	$(document).on('click', '.sl-navigation button', function(e){
		e.preventDefault();
		swipeDiff = 0;
		loadImage( $(this).hasClass('sl-next') ? 1 : -1 );
	});
	
	// keyboard-control
	if( options.enableKeyboard ){
		$( document ).on( 'keyup.'+prefix, function( e ){
			e.preventDefault();
			swipeDiff = 0;
			// keyboard control only if lightbox is open
			if(opened){
				var key = e.keyCode;
				if( key == 27 ) {
					close();
				}
				if( key == 37 || e.keyCode == 39 ) {
					loadImage( e.keyCode == 39 ? 1 : -1 );
				}
			}
		});
	}
	
	// touchcontrols
	var swipeStart	 = 0,
		swipeEnd	 = 0,
		mousedown = false,
		imageLeft = 0;
    
	$(document)
	.on( 'touchstart mousedown pointerdown MSPointerDown', '.sl-image', function(e)
	{
	    if(mousedown) return true;
		if( canTransisions ) imageLeft = parseInt( image.css( 'left' ) );
		mousedown = true;
		swipeStart = e.originalEvent.pageX || e.originalEvent.touches[ 0 ].pageX;
	})
	.on( 'touchmove mousemove pointermove MSPointerMove', '.sl-image', function(e)
	{
		if(!mousedown) return true;
		e.preventDefault();
		swipeEnd = e.originalEvent.pageX || e.originalEvent.touches[ 0 ].pageX;
		swipeDiff = swipeStart - swipeEnd;
		if( canTransisions ) slide( 0, -swipeDiff + 'px' );
		else image.css( 'left', imageLeft - swipeDiff + 'px' );
	})
	.on( 'touchend mouseup touchcancel pointerup pointercancel MSPointerUp MSPointerCancel', '.sl-image' ,function(e)
	{
		mousedown = false;
		if( Math.abs( swipeDiff ) > options.swipeTolerance ) {
			loadImage( swipeDiff > 0 ? 1 : -1 );	
		}
		else
		{
			if( canTransisions ) slide( options.animationSpeed / 1000, 0 + 'px' );
			else image.animate({ 'left': imageLeft + 'px' }, options.animationSpeed / 2 );
		}
	});
	
	// Public methods
	this.open = function(elem){
		openImage(elem);
	}
	
	this.next = function(){
		loadImage( 1 );
	}
	
	this.prev = function(){
		loadImage( -1 );
	}
	
	this.close = function(){
		close();
	}
	
	this.destroy = function(){
		$(document).unbind('click.'+prefix).unbind('keyup.'+prefix);
		close();
		$('.sl-overlay, .sl-wrapper').remove();
	}
	
	return this;
	
};
})( jQuery, window, document );