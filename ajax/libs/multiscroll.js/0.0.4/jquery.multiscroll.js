/**
 * multiscroll.js 0.0.4 Beta
 * https://github.com/alvarotrigo/multiscroll.js
 * MIT licensed
 *
 * Copyright (C) 2013 alvarotrigo.com - A project by Alvaro Trigo
 */

(function($) {
	$.fn.multiscroll = function(options) {
		// Create some defaults, extending them with any options that were provided
		options = $.extend({
			'verticalCentered' : true,
			'scrollingSpeed': 700,
			'easing': 'easeInQuart',
			'menu': true,
			'sectionsColor': [],
			'anchors':[],
			'navigation': false,
			'navigationPosition': 'right',
			'navigationColor': '#000',
			'navigationTooltips': [],
			'loopBottom': false,
			'loopTop': false,
			'css3': false,
			'paddingTop': 0,
			'paddingBottom': 0,
			'normalScrollElements': null, 
			'keyboardScrolling': true,
			'touchSensitivity': 5,

			//events
			'afterLoad': null,
			'onLeave': null,
			'afterRender': null,
			'afterResize': null
		}, options);		
		

		//Defines the delay to take place before being able to scroll to the next section
		//BE CAREFUL! Not recommened to change it under 400 for a good behavior in laptops and 
		//Apple devices (laptops, mouses...)
		var scrollDelay = 600;

		var numberSections = $('.ms-left').find('.ms-section').length;
		var isMoving = false;
		var nav;
		var windowHeight = $(window).height();


		addMouseWheelHandler();
		addTouchHandler();

		//if css3 is not supported, it will use jQuery animations
		if(options.css3){
			options.css3 = support3d();
		}

		$('html, body').css({
			'overflow' : 'hidden',
			'height' : '100%'
		});

		//creating the navigation dots 
		if (options.navigation) {
			$('body').append('<div id="multiscroll-nav"><ul></ul></div>');
			nav = $('#multiscroll-nav');

			nav.css('color', options.navigationColor);
			nav.addClass(options.navigationPosition);
		}
		
		$('.ms-right, .ms-left').css({
			'width': '50%',
			'position': 'absolute',
			'height': '100%'
		});

		$('.ms-right').css({
			'right': '0',
			'top': '0' 
		});

		$('.ms-left').css({
			'left': '0',
			'top': '0' 
		});


		$('.ms-left .ms-section, .ms-right .ms-section').each(function(){
			var sectionIndex = $(this).index();

			if (typeof options.sectionsColor[sectionIndex] !==  'undefined') {
				$(this).css('background-color', options.sectionsColor[sectionIndex]);
			}

			if (typeof options.anchors[sectionIndex] !== 'undefined') {
				$(this).attr('data-anchor', options.anchors[sectionIndex]);
			}	

			if(options.verticalCentered){
				addTableClass($(this));
			}

			//only for the left panel
			if($(this).closest('.ms-left').length && options.navigation) {
				var link = '';
				if(options.anchors.length){
					link = options.anchors[sectionIndex];
				}
				var tooltip = options.navigationTooltips[sectionIndex];
				if(typeof tooltip === 'undefined'){
					tooltip = '';
				}
				if (options.navigation) {
					nav.find('ul').append('<li data-tooltip="' + tooltip + '"><a href="#' + link + '"><span></span></a></li>');
				}
			}
		});

		//inverting the right panel
		$('.ms-right').html( $('.ms-right').find('.ms-section').get().reverse());

		$('.ms-left .ms-section, .ms-right .ms-section').each(function(){
			var sectionIndex = $(this).index();
			fromTop = sectionIndex  * 100;

			$(this).css({
				'height': '100%',
				'display': 'block'
			});
	
			if(!sectionIndex && options.navigation ){
				//activating the navigation bullet
				nav.find('li').eq(sectionIndex).find('a').addClass('active');
			}
		}).promise().done(function(){	
			 $('.ms-right').find('.ms-section').last().addClass('active');
			 $('.ms-left').find('.ms-section').first().addClass('active');

			$.isFunction( options.afterRender ) && options.afterRender.call( this);
		});


		positionRightPanel();

		
		
		//detecting any change on the URL to scroll to the given anchor link
		//(a way to detect back history button as we play with the hashes on the URL)
		$(window).on('hashchange',function(){
			var value =  window.location.hash.replace('#', '');
			var sectionAnchor = value;

			if(isNaN(sectionAnchor)){
				var section = $('.ms-left').find('[data-anchor="'+sectionAnchor+'"]');
			}else{
				var section = $('.ms-left .ms-section').eq( (destiny -1) );
			} 
			
			var isFirstScrollMove = (typeof lastScrolledDestiny === 'undefined' );

			if (isFirstScrollMove || sectionAnchor !== lastScrolledDestiny){
				scrollPage(section);
			}
		});
		

		/**
		 * Sliding with arrow keys, both, vertical and horizontal
		 */
		$(document).keydown(function(e) {
			//Moving the main page with the keyboard arrows if keyboard scrolling is enabled
			if (options.keyboardScrolling && !isMoving) {
				switch (e.which) {
					//up
					case 38:
					case 33:
						$.fn.multiscroll.moveSectionUp();
						break;

					//down
					case 40:
					case 34:
						$.fn.multiscroll.moveSectionDown();
						break;
			
					default:
						return; // exit this handler for other keys
				}
			}
		});

		//navigation action 
		$(document).on('click', '#multiscroll-nav a', function(e){
			e.preventDefault();
			var index = $(this).parent().index();
			scrollPage($('.ms-left .ms-section').eq(index));
		});
		
		//navigation tooltips 
		$(document).on({
			mouseenter: function(){
				var tooltip = $(this).data('tooltip');
				$('<div class="multiscroll-tooltip ' + options.navigationPosition +'">' + tooltip + '</div>').hide().appendTo($(this)).fadeIn(200);
			},
			mouseleave: function(){
				$(this).find('.multiscroll-tooltip').fadeOut().remove();
			}
		}, '#multiscroll-nav li');


		if(options.normalScrollElements){
			$(document).on('mouseover', options.normalScrollElements, function () {
				$.fn.multiscroll.setMouseWheelScrolling(false);
			});
			
			$(document).on('mouseout', options.normalScrollElements, function(){
				$.fn.multiscroll.setMouseWheelScrolling(true);
			});
		}


		//when resizing the site, we adjust the heights of the sections
		$(window).resize(function() {
			doneResizing();
		});

		/**
		 * When resizing is finished, we adjust the slides sizes and positions
		 */
		function doneResizing() {
			windowHeight = $(window).height();

			positionRightPanel();
			$.isFunction( options.afterResize ) && options.afterResize.call( this);
		}

		function positionRightPanel(){
			//moving the right section to the bottom
			if(options.css3){
				transformContainer($('.ms-left'), 'translate3d(0px, -' + $('.ms-left').find('.ms-section.active').position().top + 'px, 0px)', false);
				transformContainer($('.ms-right'), 'translate3d(0px, -' + $('.ms-right').find('.ms-section.active').position().top + 'px, 0px)', false);
			}else{
				$('.ms-left').css('top', -$('.ms-left').find('.ms-section.active').position().top );
				$('.ms-right').css('top', -$('.ms-right').find('.ms-section.active').position().top );
			}
		}

		$.fn.multiscroll.moveSectionUp = function(){
			var prev = $('.ms-left .ms-section.active').prev('.ms-section');

			if(!prev.length && options.loopTop){
				prev = $('.ms-left .ms-section').last();
			}

			if (prev.length) {
				scrollPage(prev);
			}
		};

		$.fn.multiscroll.moveSectionDown = function (){
			var next = $('.ms-left .ms-section.active').next('.ms-section');

			if(!next.length && options.loopBottom ){
				next = $('.ms-left .ms-section').first();
			}

			if(next.length){
				scrollPage(next);
			}
		};

		$.fn.multiscroll.moveTo = function (section){
			var destiny = '';
			
			if(isNaN(section)){
				destiny = $('.ms-left [data-anchor="'+section+'"]');
			}else{
				destiny = $('.section').eq( (section -1) );
			}
			
			scrollPage(destiny);
		};

		function scrollPage(leftDestination){
			var leftDestinationIndex = leftDestination.index();
			var rightDestination = $('.ms-right').find('.ms-section').eq( numberSections -1 - leftDestinationIndex);
			var rightDestinationIndex = numberSections - 1 - leftDestinationIndex;
			var anchorLink  = leftDestination.data('anchor');
			var activeSection = $('.ms-left .ms-section.active');
			var leavingSection = activeSection.index() + 1;
			var yMovement = getYmovement(leftDestination);

			//preventing from activating the MouseWheelHandler event
			//more than once if the page is scrolling
			isMoving = true;

			setURLHash(anchorLink);

			var topPos = {
				'left' : leftDestination.position().top,
				'right': rightDestination.position().top
			};

			rightDestination.addClass('active').siblings().removeClass('active');
			leftDestination.addClass('active').siblings().removeClass('active');

			// Use CSS3 translate functionality or...
			if (options.css3){				
				//callback (onLeave) 
				$.isFunction(options.onLeave) && options.onLeave.call(this, leavingSection, (leftDestinationIndex + 1), yMovement);

				var translate3dLeft = 'translate3d(0px, -' + topPos['left'] + 'px, 0px)';
				var translate3dRight = 'translate3d(0px, -' + topPos['right'] + 'px, 0px)';

				transformContainer($('.ms-left'), translate3dLeft, true);
				transformContainer($('.ms-right'), translate3dRight, true);

				setTimeout(function () {
					//callback (afterLoad) 
					$.isFunction(options.afterLoad) && options.afterLoad.call(this, anchorLink, (leftDestinationIndex + 1));

					setTimeout(function () {
						isMoving = false;
					}, scrollDelay);
				}, options.scrollingSpeed);
			}else{
				//callback (onLeave) 
				$.isFunction(options.onLeave) && options.onLeave.call(this, leavingSection, (leftDestinationIndex + 1), yMovement);

				$('.ms-left').animate({
					'top': -topPos['left']
				}, options.scrollingSpeed, options.easing, function(){
					$.isFunction(options.afterLoad) && options.afterLoad.call(this, anchorLink, (leftDestinationIndex + 1));

					setTimeout(function () {
						isMoving = false;
					}, scrollDelay);
				});

				$('.ms-right').animate({
					'top': -topPos['right']
				}, options.scrollingSpeed, options.easing);
			}
			
			//flag to avoid callingn `scrollPage()` twice in case of using anchor links
			lastScrolledDestiny = anchorLink;

			//avoid firing it twice (as it does also on scroll)
			activateMenuElement(anchorLink);
			activateNavDots(anchorLink, leftDestinationIndex);
			
		}

		/**
		* Removes the auto scrolling action fired by the mouse wheel and tackpad.
		* After this function is called, the mousewheel and trackpad movements won't scroll through sections.
		*/
		function removeMouseWheelHandler(){
			if (document.addEventListener) {
				document.removeEventListener('mousewheel', MouseWheelHandler, false); //IE9, Chrome, Safari, Oper
				document.removeEventListener('wheel', MouseWheelHandler, false); //Firefox
			} else {
				document.detachEvent("onmousewheel", MouseWheelHandler); //IE 6/7/8
			}
		}

		/**
		* Adds the auto scrolling action for the mouse wheel and tackpad.
		* After this function is called, the mousewheel and trackpad movements will scroll through sections
		*/
		function addMouseWheelHandler(){
			if (document.addEventListener) {
				document.addEventListener("mousewheel", MouseWheelHandler, false); //IE9, Chrome, Safari, Oper
				document.addEventListener("wheel", MouseWheelHandler, false); //Firefox
			} else {
				document.attachEvent("onmousewheel", MouseWheelHandler); //IE 6/7/8
			}
		}

		/**
		 * Detecting mousewheel scrolling
		 * 
		 * http://blogs.sitepointstatic.com/examples/tech/mouse-wheel/index.html
		 * http://www.sitepoint.com/html5-javascript-mouse-wheel/
		 */
		function MouseWheelHandler(e) {
			// cross-browser wheel delta
			e = window.event || e;
			var delta = Math.max(-1, Math.min(1,
					(e.wheelDelta || -e.deltaY || -e.detail)));

			if (!isMoving) { //if theres any #

				//scrolling down?
				if (delta < 0) {
					$.fn.multiscroll.moveSectionDown();
				}

				//scrolling up?
				else {
					$.fn.multiscroll.moveSectionUp();
				}
			}
		

			return false;
		}

		/**
		* Adds a css3 transform property to the container class with or without animation depending on the animated param.
		*/
		function transformContainer(container, translate3d, animated){
			container.toggleClass('easing', animated);
			
			container.css(getTransforms(translate3d));
		}


		function getTransforms(translate3d){
			return {
				'-webkit-transform': translate3d,
				'-moz-transform': translate3d,
				'-ms-transform':translate3d,
				'transform': translate3d
			};
		}

		/**
		 * Activating the website navigation dots according to the given slide name.
		 */
		function activateNavDots(name, sectionIndex){
			if(options.navigation){
				$('#multiscroll-nav').find('.active').removeClass('active');
				if(name){ 
					$('#multiscroll-nav').find('a[href="#' + name + '"]').addClass('active');
				}else{
					$('#multiscroll-nav').find('li').eq(sectionIndex).find('a').addClass('active');
				}
			}
		}

		/**
		 * Activating the website main menu elements according to the given slide name.
		 */
		function activateMenuElement(name){
			if(options.menu){
				$(options.menu).find('.active').removeClass('active');
				$(options.menu).find('[data-menuanchor="'+name+'"]').addClass('active');
			}
		}

		/**
		* Retuns `up` or `down` depending on the scrolling movement to reach its destination
		* from the current section.
		*/
		function getYmovement(destiny){
			var fromIndex = $('.ms-left .ms-section.active').index();
			var toIndex = destiny.index();

			if(fromIndex > toIndex){
				return 'up';
			}
			return 'down';
		}	


		/**
		* Sets the URL hash for a section with slides
		*/
		function setURLHash(anchorLink){
			if(options.anchors.length){
				location.hash = anchorLink;
			}
		}


		/**
		* Checks for translate3d support 
		* @return boolean
		* http://stackoverflow.com/questions/5661671/detecting-transform-translate3d-support
		*/
		function support3d() {
			var el = document.createElement('p'), 
				has3d,
				transforms = {
					'webkitTransform':'-webkit-transform',
					'OTransform':'-o-transform',
					'msTransform':'-ms-transform',
					'MozTransform':'-moz-transform',
					'transform':'transform'
				};

			// Add it to the body to get the computed style.
			document.body.insertBefore(el, null);

			for (var t in transforms) {
				if (el.style[t] !== undefined) {
					el.style[t] = "translate3d(1px,1px,1px)";
					has3d = window.getComputedStyle(el).getPropertyValue(transforms[t]);
				}
			}
			
			document.body.removeChild(el);

			return (has3d !== undefined && has3d.length > 0 && has3d !== "none");
		}

		function addTableClass(element){
			element.addClass('ms-table').wrapInner('<div class="ms-tableCell" style="height: ' + getTableHeight(element) + 'px" />');
		}

		function getTableHeight(section){
			var sectionHeight = windowHeight;

			if(options.paddingTop || options.paddingBottom){			
				var paddings = parseInt(section.css('padding-top')) + parseInt(section.css('padding-bottom'));
				sectionHeight = (windowHeight - paddings);
			}

			return sectionHeight;
		}


		/**
		* Adds or remove the possiblity of scrolling through sections by using the keyboard arrow keys
		*/
		$.fn.multiscroll.setKeyboardScrolling = function (value){
			options.keyboardScrolling = value;
		};

		/**
		* Adds or remove the possiblity of scrolling through sections by using the mouse wheel or the trackpad. 
		*/
		$.fn.multiscroll.setMouseWheelScrolling = function (value){
			if(value){
				addMouseWheelHandler();
			}else{
				removeMouseWheelHandler();
			}
		};

		/**
		* Defines the scrolling speed 
		*/
		$.fn.multiscroll.setScrollingSpeed = function(value){
		   options.scrollingSpeed = value;
		};



		var touchStartY = 0;
		var touchStartX = 0;
		var touchEndY = 0;
		var touchEndX = 0;
	
		/* Detecting touch events 
		
		* As we are changing the top property of the page on scrolling, we can not use the traditional way to detect it.
		* This way, the touchstart and the touch moves shows an small difference between them which is the
		* used one to determine the direction.
		*/		
		function touchMoveHandler(event){
			var e = event.originalEvent;

			//preventing the easing on iOS devices 
			event.preventDefault();

			var activeSection = $('.ms-left .ms-section.active');

			if (!isMoving) { //if theres any #
				var touchEvents = getEventsPage(e);
				touchEndY = touchEvents['y'];
				touchEndX = touchEvents['x'];
									

				//is the movement greater than the minimum resistance to scroll?
				if (Math.abs(touchStartY - touchEndY) > ($(window).height() / 100 * options.touchSensitivity)) {

					if (touchStartY > touchEndY) {
						$.fn.multiscroll.moveSectionDown();

					} else if (touchEndY > touchStartY) {
						$.fn.multiscroll.moveSectionUp();
					}
				}
			}
		}



		function touchStartHandler(event){
			var e = event.originalEvent;
			var touchEvents = getEventsPage(e);
			touchStartY = touchEvents['y'];
			touchStartX = touchEvents['x'];
		}


		/**
		* Adds the possibility to auto scroll through sections on touch devices.
		*/
		function addTouchHandler(){
			$(document).off('touchstart MSPointerDown').on('touchstart MSPointerDown', touchStartHandler);
			$(document).off('touchmove MSPointerMove').on('touchmove MSPointerMove', touchMoveHandler);
		}
		
		/**
		* Removes the auto scrolling for touch devices.
		*/
		function removeTouchHandler(){
			$(document).off('touchstart MSPointerDown');
			$(document).off('touchmove MSPointerMove');
		}

		/**
		* Gets the pageX and pageY properties depending on the browser.
		* https://github.com/alvarotrigo/fullPage.js/issues/194#issuecomment-34069854
		*/
		function getEventsPage(e){
			var events = new Array();
			if (window.navigator.msPointerEnabled){
				events['y'] = e.pageY;
				events['x'] = e.pageX;
			}else{
				events['y'] = e.touches[0].pageY;
				events['x'] =  e.touches[0].pageX;
			}

			return events;
		}

	};	
})(jQuery);
