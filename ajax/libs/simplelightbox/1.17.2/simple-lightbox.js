/*!
	By André Rinas, www.andrerinas.de
	Documentation, www.simplelightbox.de
	Available for use under the MIT License
	1.17.2
*/
;( function( $, window, document, undefined )
{
	'use strict';

$.fn.simpleLightbox = function( options )
{

	var options = $.extend({
		sourceAttr: 'href',
		overlay: true,
		spinner: true,
		nav: true,
		navText: ['&lsaquo;', '&rsaquo;'],
		captions: true,
		captionDelay: 0,
		captionSelector: 'img',
		captionType: 'attr',
		captionsData: 'title',
		captionPosition: 'bottom',
		captionClass: '',
		close: true,
		closeText: '&times;',
		swipeClose: true,
		showCounter: true,
		fileExt: 'png|jpg|jpeg|gif|webp',
		animationSlide: true,
		animationSpeed: 250,
		preloading: true,
		enableKeyboard: true,
		loop: true,
		rel: false,
		docClose: true,
		swipeTolerance: 50,
		className: 'simple-lightbox',
		widthRatio: 0.8,
		heightRatio: 0.9,
		scaleImageToRatio: false,
		disableRightClick: false,
		disableScroll: true,
		alertError: true,
		alertErrorMessage: 'Image not found, next image will be loaded',
		additionalHtml: false,
		history: true,
		throttleInterval: 0,
		doubleTapZoom: 2,
		maxZoom: 10,
		htmlClass: 'has-lightbox'
	}, options);

	// global variables
	var touchDevice	= ( 'ontouchstart' in window ),
		pointerEnabled = window.navigator.pointerEnabled || window.navigator.msPointerEnabled,
		touched = function( event ){
			if( touchDevice ) return true;
			if( !pointerEnabled || typeof event === 'undefined' || typeof event.pointerType === 'undefined' ) return false;
			if( typeof event.MSPOINTER_TYPE_MOUSE !== 'undefined' ) {
				if( event.MSPOINTER_TYPE_MOUSE != event.pointerType ) return true;
			}
			else {
				if( event.pointerType != 'mouse' ) return true;
			}
			return false;
		},
		swipeDiff = 0,
		swipeYDiff = 0,
		curImg = $(),
		transPrefix = function(){
			var s = document.body || document.documentElement;
			s = s.style;
			if( s.WebkitTransition === '' ) return '-webkit-';
			if( s.MozTransition === '' ) return '-moz-';
			if( s.OTransition === '' ) return '-o-';
			if( s.transition === '' ) return '';
			return false;
		},
		opened = false,
		loaded = [],
		getRelated = function(rel, jqObj) {
			var $related = jqObj.filter(function () {
				return ($(this).attr('rel') === rel);
			});
			return $related;
		},
		objects = (options.rel && options.rel !== false) ? getRelated(options.rel, $(this)) : this,
		tagname = objects.get()[0].tagName,
		transPrefix = transPrefix(),
		globalScrollbarwidth = 0,
		canTransisions = (transPrefix !== false) ? true : false,
		supportsPushState = ('pushState' in history),
		historyhasChanged = false,
		historyUpdateTimeout,
		winLoc = window.location,
		getHash = function(){
			return winLoc.hash.substring(1);
		},
		initialHash = getHash(),
		updateHash = function(){
			var hash = getHash(),
			newHash = 'pid='+(index+1);
			var newURL = winLoc.href.split('#')[0] + '#' + newHash;

			if(supportsPushState){
				history[historyhasChanged ? 'replaceState' : 'pushState']('', document.title, newURL);
			}else {
				if(historyhasChanged) {
					winLoc.replace( newURL );
				} else {
					winLoc.hash = newHash;
				}
			}
			historyhasChanged = true;
		},
		resetHash = function() {
			if (supportsPushState) {
				history.pushState('', document.title, winLoc.pathname + winLoc.search );
			} else {
				winLoc.hash = '';
			}
			clearTimeout(historyUpdateTimeout);

		},
		updateURL = function(){
			if(!historyhasChanged) {
				updateHash(); // first time
			} else {
				historyUpdateTimeout = setTimeout(updateHash, 800);
			}
		},
		throttle = function(func, limit) {
			var inThrottle;
			return function() {
				var args = arguments;
				var context = this;
				if (!inThrottle) {
					func.apply(context, args);
					inThrottle = true;
					setTimeout(function() {
						return inThrottle = false;
					}, limit);
				}
			};
		},
		prefix = 'simplelb',
		overlay = $('<div>').addClass('sl-overlay'),
		closeBtn = $('<button>').addClass('sl-close').html(options.closeText),
		spinner = $('<div>').addClass('sl-spinner').html('<div></div>'),
		nav = $('<div>').addClass('sl-navigation').html('<button class="sl-prev">'+options.navText[0]+'</button><button class="sl-next">'+options.navText[1]+'</button>'),
		counter = $('<div>').addClass('sl-counter').html('<span class="sl-current"></span>/<span class="sl-total"></span>'),
		animating = false,
		index = 0,
		startIndex = 0,
		caption = $('<div>').addClass('sl-caption '+options.captionClass+' pos-'+options.captionPosition),
		image = $('<div>').addClass('sl-image'),
		wrapper = $('<div>').addClass('sl-wrapper').addClass(options.className),
		isValidLink = function( element ){
			if(!options.fileExt) return true;
			var filEext = /\.([0-9a-z]+)(?=[?#])|(\.)(?:[\w]+)$/gmi;
			var testExt = $( element ).attr( options.sourceAttr ).match(filEext);
			return testExt && $( element ).prop( 'tagName' ).toUpperCase() == tagname && ( new RegExp( '\.(' + options.fileExt + ')$', 'i' ) ).test( testExt );
		},
		setup = function(){
			if(options.close) closeBtn.appendTo(wrapper);
			if(options.showCounter){
				if(objects.length > 1){
					counter.appendTo(wrapper);
					counter.find('.sl-total').text(objects.length);
				}
			}
			if(options.nav) nav.appendTo(wrapper);
			if(options.spinner) spinner.appendTo(wrapper);
		},
		openImage = function(elem){
			elem.trigger($.Event('show.simplelightbox'));
			if(options.disableScroll) globalScrollbarwidth = handleScrollbar('hide');
			if(options.htmlClass && options.htmlClass != '') $('html').addClass(options.htmlClass);
			wrapper.appendTo('body');
			image.appendTo(wrapper);
			if(options.overlay) overlay.appendTo($('body'));
			animating = true;
			index = objects.index(elem);
			curImg = $( '<img/>' )
				.hide()
				.attr('src', elem.attr(options.sourceAttr))
				.attr('data-scale', 1)
				.attr('data-translate-x', 0)
				.attr('data-translate-y', 0);
			if(loaded.indexOf(elem.attr(options.sourceAttr)) == -1){
				loaded.push(elem.attr(options.sourceAttr));
			}
			image.html('').attr('style','');
			curImg.appendTo(image);
			addEvents();
			overlay.fadeIn('fast');
			$('.sl-close').fadeIn('fast');
			spinner.show();
			nav.fadeIn('fast');
			$('.sl-wrapper .sl-counter .sl-current').text(index +1);
			counter.fadeIn('fast');
			adjustImage();
			if(options.preloading) preload();
			setTimeout( function(){ elem.trigger($.Event('shown.simplelightbox')); } ,options.animationSpeed);
		},
		adjustImage = function(dir){
			if(!curImg.length) return;
			var tmpImage 	 = new Image(),
			windowWidth	 = window.innerWidth * options.widthRatio,
			windowHeight = window.innerHeight * options.heightRatio;
			tmpImage.src	= curImg.attr( 'src' );
			curImg.data('scale',1);
			curImg.data('translate-x',0);
			curImg.data('translate-y',0);
			zoomPanElement(0,0,1);
			$(tmpImage).on('error',function(ev){
				//no image was found
				objects.eq(index).trigger($.Event('error.simplelightbox'));
				animating = false;
				opened = true;
				spinner.hide();
				var dirDefinined = (dir == 1 || dir == -1);
				if(startIndex === index && dirDefinined){
					close();
					return;
				}
				if(options.alertError){
					alert(options.alertErrorMessage);
				}
				if(dirDefinined){
					loadImage(dir);
				} else {
					loadImage(1);
				}
				return;
			});


			tmpImage.onload = function() {
				if (typeof dir !== 'undefined') {
					objects.eq(index)
						.trigger($.Event('changed.simplelightbox'))
						.trigger($.Event( (dir===1?'nextDone':'prevDone')+'.simplelightbox'));
				}

				// history
				if(options.history){
					updateURL();
				}

				if(loaded.indexOf(curImg.attr( 'src' )) == -1){
					loaded.push(curImg.attr( 'src' ));
				}
				var imageWidth	 = tmpImage.width,
					imageHeight	 = tmpImage.height;

				if( options.scaleImageToRatio || imageWidth > windowWidth || imageHeight > windowHeight ){
					var ratio	 = imageWidth / imageHeight > windowWidth / windowHeight ? imageWidth / windowWidth : imageHeight / windowHeight;
					imageWidth	/= ratio;
					imageHeight	/= ratio;
				}

				$('.sl-image').css({
					'top':    ( window.innerHeight - imageHeight ) / 2 + 'px',
					'left':   ( window.innerWidth - imageWidth - globalScrollbarwidth)/ 2 + 'px',
					'width':  imageWidth + 'px',
					'height': imageHeight + 'px'
				});
				spinner.hide();
				curImg
				.fadeIn('fast');
				opened = true;
				var cSel = (options.captionSelector == 'self') ? objects.eq(index) : objects.eq(index).find(options.captionSelector);
				var captionText;
				if(options.captionType == 'data'){
					captionText = cSel.data(options.captionsData);
				} else if(options.captionType == 'text'){
					captionText = cSel.html();
				} else {
					captionText = cSel.prop(options.captionsData);
				}

				if(!options.loop) {
					if(index === 0){ $('.sl-prev').hide();}
					if(index >= objects.length -1) {$('.sl-next').hide();}
					if(index > 0){ $('.sl-prev').show(); }
					if(index < objects.length -1){ $('.sl-next').show(); }
				}

				if(objects.length == 1) $('.sl-prev, .sl-next').hide();

				if(dir == 1 || dir == -1){
					var css = { 'opacity': 1.0 };
					if( options.animationSlide ) {
						if( canTransisions ) {
							slide(0, 100 * dir + 'px');
							setTimeout( function(){ slide( options.animationSpeed / 1000, 0 + 'px'); }, 50 );
						}
						else {
							css.left = parseInt( $('.sl-image').css( 'left' ) ) + 100 * dir + 'px';
						}
					}

					$('.sl-image').animate( css, options.animationSpeed, function(){
						animating = false;
						setCaption(captionText, imageWidth);
					});
				} else {
					animating = false;
					setCaption(captionText, imageWidth);
				}
				if(options.additionalHtml && $('.sl-additional-html').length === 0){
					$('<div>').html(options.additionalHtml).addClass('sl-additional-html').appendTo($('.sl-image'));
				}
			};
		},
		setCaption = function(captiontext, imageWidth){
			if(captiontext !== '' && typeof captiontext !== "undefined" && options.captions){
				caption.html(captiontext).css({'width': imageWidth + 'px'}).hide().appendTo($('.sl-image')).delay(options.captionDelay).fadeIn('fast');
			}
		},
		slide = function(speed, pos){
			var styles = {};
				styles[transPrefix + 'transform'] = 'translateX(' + pos + ')';
				styles[transPrefix + 'transition'] = transPrefix + 'transform ' + speed + 's linear';
				$('.sl-image').css(styles);
		},
		zoomPanElement = function(targetOffsetX, targetOffsetY, targetScale) {
			var styles = {};
			styles[transPrefix + 'transform'] = 'translate(' + targetOffsetX + ',' + targetOffsetY+ ') scale('+targetScale+')';
			curImg.css(styles);
		},
		minMax = function(value, min, max) {
			return (value < min) ? min : (value > max) ? max : value;
		},
		setZoomData = function(initialScale,targetOffsetX,targetOffsetY) {
			curImg.data('scale',initialScale);
			curImg.data('translate-x',targetOffsetX);
			curImg.data('translate-y',targetOffsetY);
		},
		addEvents = function(){
			// resize/responsive
			$( window ).on( 'resize.'+prefix, adjustImage );

			// close lightbox on close btn
			$( document ).on('click.'+prefix+ ' touchstart.'+prefix, '.sl-close', function(e){
				e.preventDefault();
				if(opened){ close();}
			});

			if(options.history){
				setTimeout(function() {
					$(window).on('hashchange.'+prefix,function(){
						if(opened){
							if(getHash() === initialHash) {
								close();
								return;
							}
						}
					});
				}, 40);
			}

			// nav-buttons
			nav.on('click.'+prefix, 'button', throttle(function(e){
				e.preventDefault();
				swipeDiff = 0;
				loadImage( $(this).hasClass('sl-next') ? 1 : -1 );
			}, options.throttleInterval));

			// touch helpers
			var swipeStart	 = 0,
				swipeEnd	 = 0,
				swipeYStart = 0,
				swipeYEnd = 0,
				zoomed = false,
				mousedown = false,
				imageLeft = 0,
				containerHeight,
				containerWidth,
				containerOffsetX,
				containerOffsetY,
				imgHeight,
				imgWidth,
				capture = false,
				initialOffsetX,
				initialOffsetY,
				initialPointerOffsetX,
				initialPointerOffsetY,
				initialPointerOffsetX2,
				initialPointerOffsetY2,
				initialScale = minMax(1, 1, options.maxZoom),
				initialPinchDistance,
				pointerOffsetX,
				pointerOffsetY,
				pointerOffsetX2,
				pointerOffsetY2,
				targetOffsetX,
				targetOffsetY,
				targetScale,
				pinchOffsetX,
				pinchOffsetY,
				limitOffsetX,
				limitOffsetY,
				scaleDifference,
				targetPinchDistance,
				touchCount,
				doubleTapped = false,
				touchmoveCount = 0;

			image
			.on( 'touchstart.'+prefix+' mousedown.'+prefix, function(e)
			{
				if (e.target.tagName === 'A' && e.type == 'touchstart') {
					return true;
				}
				e = e.originalEvent;
				if(e.type == 'mousedown') {
					initialPointerOffsetX = e.clientX;
					initialPointerOffsetY = e.clientY;
					containerHeight = image.height();
					containerWidth = image.width();
					imgHeight = curImg.height();
					imgWidth = curImg.width();
					containerOffsetX = image.position().left;
					containerOffsetY = image.position().top;

					initialOffsetX = parseFloat(curImg.data('translate-x'));
					initialOffsetY = parseFloat(curImg.data('translate-y'));

					capture = true;
				} else {
					touchCount = e.touches.length;
					initialPointerOffsetX = e.touches[0].clientX;
					initialPointerOffsetY = e.touches[0].clientY;
					containerHeight = image.height();
					containerWidth = image.width();
					imgHeight = curImg.height();
					imgWidth = curImg.width();
					containerOffsetX = image.position().left;
					containerOffsetY = image.position().top;

					if (touchCount === 1) /* Single touch */ {
						if(!doubleTapped) {
							doubleTapped = true;
							setTimeout(function(){
								doubleTapped = false;
							}, 300);
						} else {
							curImg.addClass('sl-transition');
							if(!zoomed) {
								initialScale = options.doubleTapZoom;
								setZoomData(0,0, initialScale);
								zoomPanElement(0 + "px", 0 + "px", initialScale);
								$('.sl-caption').fadeOut(200);
								zoomed = true;
							} else {
								initialScale = 1;
								setZoomData(0,0,initialScale);
								zoomPanElement(0 + "px", 0 + "px", initialScale);
								zoomed = false;
							}

							setTimeout(function(){
								curImg.removeClass('sl-transition');
							}, 200);
							return false;
						}

						initialOffsetX = parseFloat(curImg.data('translate-x'));
						initialOffsetY = parseFloat(curImg.data('translate-y'));
					}
					else if (touchCount === 2) /* Pinch */ {
						initialPointerOffsetX2 = e.touches[1].clientX;
						initialPointerOffsetY2 = e.touches[1].clientY;
						initialOffsetX = parseFloat(curImg.data('translate-x'));
						initialOffsetY = parseFloat(curImg.data('translate-y'));
						pinchOffsetX = (initialPointerOffsetX + initialPointerOffsetX2) / 2;
						pinchOffsetY = (initialPointerOffsetY + initialPointerOffsetY2) / 2;
						initialPinchDistance = Math.sqrt(((initialPointerOffsetX - initialPointerOffsetX2) * (initialPointerOffsetX - initialPointerOffsetX2)) + ((initialPointerOffsetY - initialPointerOffsetY2) * (initialPointerOffsetY - initialPointerOffsetY2)));
					}
					capture = true;
				}

				if(mousedown) return true;
				if( canTransisions ) imageLeft = parseInt( image.css( 'left' ) );
				mousedown = true;
				swipeDiff = 0;
				swipeYDiff = 0;
				swipeStart = e.pageX || e.touches[ 0 ].pageX;
				swipeYStart = e.pageY || e.touches[ 0 ].pageY;
				return false;
			})
			.on( 'touchmove.'+prefix+' mousemove.'+prefix+' MSPointerMove', function(e)
			{
				if(!mousedown) return true;
				e.preventDefault();
				e = e.originalEvent;
				/* Initialize helpers */
				if(e.type == 'touchmove') {
					if(capture === false) return false;
					pointerOffsetX = e.touches[0].clientX;
					pointerOffsetY = e.touches[0].clientY;
					touchCount = e.touches.length;
					touchmoveCount++;

					if (touchCount > 1) /* Pinch */ {
						pointerOffsetX2 = e.touches[1].clientX;
						pointerOffsetY2 = e.touches[1].clientY;
						targetPinchDistance = Math.sqrt(((pointerOffsetX - pointerOffsetX2) * (pointerOffsetX - pointerOffsetX2)) + ((pointerOffsetY - pointerOffsetY2) * (pointerOffsetY - pointerOffsetY2)));
						if (initialPinchDistance === null) {
							initialPinchDistance = targetPinchDistance;
						}

						if (Math.abs(initialPinchDistance - targetPinchDistance) >= 1) {
							/* Initialize helpers */
							targetScale = minMax(targetPinchDistance / initialPinchDistance * initialScale, 1, options.maxZoom);
							limitOffsetX = ((imgWidth * targetScale) - containerWidth) / 2;
							limitOffsetY = ((imgHeight * targetScale) - containerHeight) / 2;
							scaleDifference = targetScale - initialScale;
							targetOffsetX = (imgWidth * targetScale) <= containerWidth ? 0: minMax(initialOffsetX - ((((((pinchOffsetX - containerOffsetX) - (containerWidth / 2)) - initialOffsetX) / (targetScale - scaleDifference))) * scaleDifference), limitOffsetX * (-1), limitOffsetX);
							targetOffsetY = (imgHeight * targetScale) <= containerHeight ? 0 : minMax(initialOffsetY - ((((((pinchOffsetY - containerOffsetY) - (containerHeight / 2)) - initialOffsetY) / (targetScale - scaleDifference))) * scaleDifference), limitOffsetY * (-1), limitOffsetY);

							zoomPanElement(targetOffsetX + "px", targetOffsetY + "px", targetScale);

							if (targetScale > 1) {
								zoomed = true;
								$('.sl-caption').fadeOut(200);
							}

							initialPinchDistance = targetPinchDistance;
							initialScale = targetScale;
							initialOffsetX = targetOffsetX;
							initialOffsetY = targetOffsetY;
						}
					} else {
						targetScale = initialScale;
						limitOffsetX = ((imgWidth * targetScale) - containerWidth) / 2;
						limitOffsetY = ((imgHeight * targetScale) - containerHeight) / 2;
						targetOffsetX = (imgWidth * targetScale) <= containerWidth ? 0 : minMax(pointerOffsetX - (initialPointerOffsetX - initialOffsetX), limitOffsetX * (-1), limitOffsetX);
						targetOffsetY = (imgHeight * targetScale) <= containerHeight ? 0 : minMax(pointerOffsetY - (initialPointerOffsetY - initialOffsetY), limitOffsetY * (-1), limitOffsetY);

						if (Math.abs(targetOffsetX) === Math.abs(limitOffsetX)) {
							initialOffsetX = targetOffsetX;
							initialPointerOffsetX = pointerOffsetX;
						}

						if (Math.abs(targetOffsetY) === Math.abs(limitOffsetY)) {
							initialOffsetY = targetOffsetY;
							initialPointerOffsetY = pointerOffsetY;
						}

						setZoomData(initialScale,targetOffsetX,targetOffsetY);
						zoomPanElement(targetOffsetX + "px", targetOffsetY + "px", targetScale);
					}
				}
				/* Mouse Move implementation */
				if(e.type == 'mousemove' && mousedown){
					if(e.type == 'touchmove') return true;
					if(capture === false) return false;
					pointerOffsetX = e.clientX;
					pointerOffsetY = e.clientY;
					targetScale = initialScale;
					limitOffsetX = ((imgWidth * targetScale) - containerWidth) / 2;
					limitOffsetY = ((imgHeight * targetScale) - containerHeight) / 2;
					targetOffsetX = (imgWidth * targetScale) <= containerWidth ? 0 : minMax(pointerOffsetX - (initialPointerOffsetX - initialOffsetX), limitOffsetX * (-1), limitOffsetX);
					targetOffsetY = (imgHeight * targetScale) <= containerHeight ? 0 : minMax(pointerOffsetY - (initialPointerOffsetY - initialOffsetY), limitOffsetY * (-1), limitOffsetY);

					if (Math.abs(targetOffsetX) === Math.abs(limitOffsetX)) {
						initialOffsetX = targetOffsetX;
						initialPointerOffsetX = pointerOffsetX;
					}

					if (Math.abs(targetOffsetY) === Math.abs(limitOffsetY)) {
						initialOffsetY = targetOffsetY;
						initialPointerOffsetY = pointerOffsetY;
					}

					setZoomData(initialScale,targetOffsetX,targetOffsetY);
					zoomPanElement(targetOffsetX + "px", targetOffsetY + "px", targetScale);
				}
				if(!zoomed) {
					swipeEnd = e.pageX || e.touches[ 0 ].pageX;
					swipeYEnd = e.pageY || e.touches[ 0 ].pageY;
					swipeDiff = swipeStart - swipeEnd;
					swipeYDiff = swipeYStart - swipeYEnd;
					if( options.animationSlide ) {
						if( canTransisions ) slide( 0, -swipeDiff + 'px' );
						else image.css( 'left', imageLeft - swipeDiff + 'px' );
					}
				}
			})
			.on( 'touchend.'+prefix+' mouseup.'+prefix+' touchcancel.'+prefix+' mouseleave.'+prefix+' pointerup pointercancel MSPointerUp MSPointerCancel',function(e)
			{
				e = e.originalEvent;
				if(touchDevice && e.type =='touchend') {
					touchCount = e.touches.length;
					if (touchCount === 0) /* No touch */ {
						/* Set attributes */
						setZoomData(initialScale,targetOffsetX,targetOffsetY);
						if(initialScale == 1) {
							zoomed = false;
							$('.sl-caption').fadeIn(200);
						}
						initialPinchDistance = null;
						capture = false;
					} else if (touchCount === 1) /* Single touch */ {
						initialPointerOffsetX = e.touches[0].clientX;
						initialPointerOffsetY = e.touches[0].clientY;
					} else if (touchCount > 1) /* Pinch */ {
						initialPinchDistance = null;
					}
				}

				if(mousedown){
					mousedown = false;
					var possibleDir = true;
					if(!options.loop) {
						if(index === 0 && swipeDiff < 0){ possibleDir = false; }
						if(index >= objects.length -1 && swipeDiff > 0) { possibleDir = false; }
					}
					if( Math.abs( swipeDiff ) > options.swipeTolerance && possibleDir ) {
						loadImage( swipeDiff > 0 ? 1 : -1 );
					}
					else if( options.animationSlide )
					{
						if( canTransisions ) slide( options.animationSpeed / 1000, 0 + 'px' );
						else image.animate({ 'left': imageLeft + 'px' }, options.animationSpeed / 2 );
					}

					if( options.swipeClose && Math.abs(swipeYDiff) > 50 && Math.abs( swipeDiff ) < options.swipeTolerance) {
						close();
					}
				}
			})
			/** Detect Double click on image*/
			.on( 'dblclick', function(e)
			{
				initialPointerOffsetX = e.clientX;
				initialPointerOffsetY = e.clientY;
				containerHeight = image.height();
				containerWidth = image.width();
				imgHeight = curImg.height();
				imgWidth = curImg.width();
				containerOffsetX = image.position().left;
				containerOffsetY = image.position().top;

				curImg.addClass('sl-transition');
				if(!zoomed) {
					initialScale = options.doubleTapZoom;
					setZoomData(0,0, initialScale);
					zoomPanElement(0 + "px", 0 + "px", initialScale);
					$('.sl-caption').fadeOut(200);
					zoomed = true;
				} else {
					initialScale = 1;
					setZoomData(0,0,initialScale);
					zoomPanElement(0 + "px", 0 + "px", initialScale);
					zoomed = false;
					$('.sl-caption').fadeIn(200);
				}

				setTimeout(function(){
					curImg.removeClass('sl-transition');
				}, 200);
				capture = true;
				return false;
			});
		},
		removeEvents = function(){
			nav.off('click', 'button');
			$( document ).off('click.'+prefix, '.sl-close');
			$( window ).off( 'resize.'+prefix);
			$( window ).off( 'hashchange.'+prefix);
		},
		preload = function(){
			var next = (index+1 < 0) ? objects.length -1: (index+1 >= objects.length -1) ? 0 : index+1,
				prev = (index-1 < 0) ? objects.length -1: (index-1 >= objects.length -1) ? 0 : index-1;
			$( '<img />' ).attr( 'src', objects.eq(next).attr( options.sourceAttr ) ).on('load', function(){
				if(loaded.indexOf($(this).attr('src')) == -1){
					loaded.push($(this).attr('src'));
				}
				objects.eq(index).trigger($.Event('nextImageLoaded.simplelightbox'));
			});
			$( '<img />' ).attr( 'src', objects.eq(prev).attr( options.sourceAttr ) ).on('load', function(){
				if(loaded.indexOf($(this).attr('src')) == -1){
					loaded.push($(this).attr('src'));
				}
				objects.eq(index).trigger($.Event('prevImageLoaded.simplelightbox'));
			});

		},
		loadImage = function(dir){
			objects.eq(index)
			.trigger($.Event('change.simplelightbox'))
			.trigger($.Event( (dir===1?'next':'prev')+'.simplelightbox'));

		var newIndex = index + dir;
			if(animating || (newIndex < 0 || newIndex >= objects.length) && options.loop === false ) return;
			index = (newIndex < 0) ? objects.length -1: (newIndex > objects.length -1) ? 0 : newIndex;
			$('.sl-wrapper .sl-counter .sl-current').text(index +1);
				var css = { 'opacity': 0 };
			if( options.animationSlide ) {
				if( canTransisions ) slide(options.animationSpeed / 1000, ( -100 * dir ) - swipeDiff + 'px');
				else css.left = parseInt( $('.sl-image').css( 'left' ) ) + -100 * dir + 'px';
			}

			$('.sl-image').animate( css, options.animationSpeed, function(){
				setTimeout( function(){
					// fadeout old image
					var elem = objects.eq(index);
					curImg
					.attr('src', elem.attr(options.sourceAttr));

					if(loaded.indexOf(elem.attr(options.sourceAttr)) == -1){
						spinner.show();
					}
					$('.sl-caption').remove();
					adjustImage(dir);
					if(options.preloading) preload();
				}, 100);
			});
		},
		close = function(){
			if(animating) return;
			var elem = objects.eq(index),
			triggered = false;

			elem.trigger($.Event('close.simplelightbox'));
			if(options.history){
				resetHash();
			}
			$('.sl-image img, .sl-overlay, .sl-close, .sl-navigation, .sl-image .sl-caption, .sl-counter').fadeOut('fast', function(){
				if(options.disableScroll) handleScrollbar('show');
				if(options.htmlClass && options.htmlClass != '') $('html').removeClass(options.htmlClass);
				$('.sl-wrapper, .sl-overlay').remove();
				removeEvents();
				if(!triggered) elem.trigger($.Event('closed.simplelightbox'));
				triggered = true;
			});
			curImg = $();
			opened = false;
			animating = false;
		},
		handleScrollbar = function(type){
			var scrollbarWidth = 0;
			if(type == 'hide'){
				var fullWindowWidth = window.innerWidth;
				if (!fullWindowWidth) {
					var documentElementRect = document.documentElement.getBoundingClientRect();
					fullWindowWidth = documentElementRect.right - Math.abs(documentElementRect.left);
				}
				if(document.body.clientWidth < fullWindowWidth){
					var scrollDiv = document.createElement('div'),
					padding = parseInt($('body').css('padding-right'),10);
					scrollDiv.className = 'sl-scrollbar-measure';
					$('body').append(scrollDiv);
					scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth;
					$(document.body)[0].removeChild(scrollDiv);
					$('body').data('padding',padding);
					if(scrollbarWidth > 0){
						$('body').addClass('hidden-scroll').css({'padding-right':padding+scrollbarWidth});
					}
				}
			} else {
				$('body').removeClass('hidden-scroll').css({'padding-right':$('body').data('padding')});
			}
			return scrollbarWidth;
		};

	// events
	setup();

	// open lightbox
	objects.on( 'click.'+prefix, function( e ){
		if(isValidLink(this)){
			e.preventDefault();
			if(animating) return false;
			var elem = $(this);
			startIndex = objects.index(elem);
			openImage(elem);
		}
	});

	// close on click on doc
	$( document ).on('click.'+prefix+ ' touchstart.'+prefix, function(e){
		if(opened){
			if((options.docClose && $(e.target).closest('.sl-image').length === 0 && $(e.target).closest('.sl-navigation').length === 0)){
				close();
			}
		}
	});

	// disable rightclick
	if(options.disableRightClick){
		$( document ).on('contextmenu', '.sl-image img', function(e){
			return false;
		});
	}


	// keyboard-control
	if( options.enableKeyboard ){
		$( document ).on( 'keyup.'+prefix, throttle(function( e ){
			swipeDiff = 0;
			// keyboard control only if lightbox is open
			var key = e.keyCode;
			if(animating && key == 27) {
				curImg.attr('src', '');
				animating = false;
				close();
			}

			if(opened){
				e.preventDefault();
				if( key == 27 ) {
					close();
				}
				if( key == 37 || e.keyCode == 39 ) {
					loadImage( e.keyCode == 39 ? 1 : -1 );
				}
			}
		}, options.throttleInterval));
	}

	// Public methods
	this.open = function(elem){
		elem = elem || $(this[0]);
		startIndex = objects.index(elem);
		openImage(elem);
	};

	this.next = function(){
		loadImage( 1 );
	};

	this.prev = function(){
		loadImage( -1 );
	};

	this.close = function(){
		close();
	};

	this.destroy = function(){
		$( document ).off('click.'+prefix).off('keyup.'+prefix);
		close();
		$('.sl-overlay, .sl-wrapper').remove();
		this.off('click');
	};

	this.refresh = function(){
		this.destroy();
		$(this).simpleLightbox(options);
	};

	return this;

};
})( jQuery, window, document );
