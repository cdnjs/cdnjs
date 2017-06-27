/*!
 * pagepiling.js 1.5.3
 *
 * https://github.com/alvarotrigo/pagePiling.js
 * MIT licensed
 *
 * Copyright (C) 2013 alvarotrigo.com - A project by Alvaro Trigo
 */
(function ($, document, window, undefined) {
    'use strict';

    $.fn.pagepiling = function (custom) {
        var PP = $.fn.pagepiling;
        var container = $(this);
        var lastScrolledDestiny;
        var lastAnimation = 0;
        var isTouch = (('ontouchstart' in window) || (navigator.msMaxTouchPoints > 0) || (navigator.maxTouchPoints));
        var touchStartY = 0, touchStartX = 0, touchEndY = 0, touchEndX = 0;
        var scrollings = [];

        //Defines the delay to take place before being able to scroll to the next section
        //BE CAREFUL! Not recommened to change it under 400 for a good behavior in laptops and
        //Apple devices (laptops, mouses...)
        var scrollDelay = 600;

        // Create some defaults, extending them with any options that were provided
        var options = $.extend(true, {
            direction: 'vertical',
            menu: null,
            verticalCentered: true,
            sectionsColor: [],
            anchors: [],
            scrollingSpeed: 700,
            easing: 'easeInQuart',
            loopBottom: false,
            loopTop: false,
            css3: true,
            navigation: {
                textColor: '#000',
                bulletsColor: '#000',
                position: 'right',
                tooltips: []
            },
            normalScrollElements: null,
            normalScrollElementTouchThreshold: 5,
            touchSensitivity: 5,
            keyboardScrolling: true,
            sectionSelector: '.section',
            animateAnchor: false,

            //events
            afterLoad: null,
            onLeave: null,
            afterRender: null
        }, custom);


        //easeInQuart animation included in the plugin
        $.extend($.easing,{ easeInQuart: function (x, t, b, c, d) { return c*(t/=d)*t*t*t + b; }});

        /**
        * Defines the scrolling speed
        */
        PP.setScrollingSpeed = function(value){
           options.scrollingSpeed = value;
        };

        /**
        * Adds or remove the possiblity of scrolling through sections by using the mouse wheel or the trackpad.
        */
        PP.setMouseWheelScrolling = function (value){
            if(value){
                addMouseWheelHandler();
            }else{
                removeMouseWheelHandler();
            }
        };

        /**
        * Adds or remove the possiblity of scrolling through sections by using the mouse wheel/trackpad or touch gestures.
        */
        PP.setAllowScrolling = function (value){
            if(value){
                PP.setMouseWheelScrolling(true);
                addTouchHandler();
            }else{
                PP.setMouseWheelScrolling(false);
                removeTouchHandler();
            }
        };

        /**
        * Adds or remove the possiblity of scrolling through sections by using the keyboard arrow keys
        */
        PP.setKeyboardScrolling = function (value){
            options.keyboardScrolling = value;
        };

        /**
        * Moves sectio up
        */
        PP.moveSectionUp = function () {
            var prev = $('.pp-section.active').prev('.pp-section');

            //looping to the bottom if there's no more sections above
            if (!prev.length && options.loopTop) {
                prev = $('.pp-section').last();
            }

            if (prev.length) {
                scrollPage(prev);
            }
        };

        /**
        * Moves sectio down
        */
        PP.moveSectionDown = function () {
            var next = $('.pp-section.active').next('.pp-section');

            //looping to the top if there's no more sections below
            if(!next.length && options.loopBottom){
                next = $('.pp-section').first();
            }

            if (next.length) {
                scrollPage(next);
            }
        };

        /**
        * Moves the site to the given anchor or index
        */
        PP.moveTo = function (section){
            var destiny = '';

            if(isNaN(section)){
                destiny = $(document).find('[data-anchor="'+section+'"]');
            }else{
                destiny = $('.pp-section').eq( (section -1) );
            }


            if(destiny.length > 0){
                scrollPage(destiny);
            }
        };

        //adding internal class names to void problem with common ones
        $(options.sectionSelector).each(function(){
            $(this).addClass('pp-section');
        });

        //if css3 is not supported, it will use jQuery animations
        if(options.css3){
            options.css3 = support3d();
        }

        $(container).css({
            'overflow' : 'hidden',
            '-ms-touch-action': 'none',  /* Touch detection for Windows 8 */
            'touch-action': 'none'       /* IE 11 on Windows Phone 8.1*/
        });

        //init
        PP.setAllowScrolling(true);

        //creating the navigation dots
        if (!$.isEmptyObject(options.navigation) ) {
            addVerticalNavigation();
        }

         var zIndex = $('.pp-section').length;

        $('.pp-section').each(function (index) {
            $(this).data('data-index', index);
            $(this).css('z-index', zIndex);

            //if no active section is defined, the 1st one will be the default one
            if (!index && $('.pp-section.active').length === 0) {
                $(this).addClass('active');
            }

            if (typeof options.anchors[index] !== 'undefined') {
                $(this).attr('data-anchor', options.anchors[index]);
            }

            if (typeof options.sectionsColor[index] !== 'undefined') {
                $(this).css('background-color', options.sectionsColor[index]);
            }

            if(options.verticalCentered && !$(this).hasClass('pp-scrollable')){
                addTableClass($(this));
            }

            zIndex = zIndex - 1;
        }).promise().done(function(){
            //vertical centered of the navigation + first bullet active
            if(options.navigation){
                $('#pp-nav').css('margin-top', '-' + ($('#pp-nav').height()/2) + 'px');
                $('#pp-nav').find('li').eq($('.pp-section.active').index('.pp-section')).find('a').addClass('active');
            }

            $(window).on('load', function() {
                scrollToAnchor();
            });

            $.isFunction( options.afterRender ) && options.afterRender.call( this);
        });

        /**
        * Enables vertical centering by wrapping the content and the use of table and table-cell
        */
        function addTableClass(element){
            element.addClass('pp-table').wrapInner('<div class="pp-tableCell" style="height:100%" />');
        }


       /**
        * Retuns `up` or `down` depending on the scrolling movement to reach its destination
        * from the current section.
        */
        function getYmovement(destiny){
            var fromIndex = $('.pp-section.active').index('.pp-section');
            var toIndex = destiny.index('.pp-section');

            if(fromIndex > toIndex){
                return 'up';
            }
            return 'down';
        }

        /**
        * Scrolls the page to the given destination
        */
        function scrollPage(destination, animated) {
            var v ={
                destination: destination,
                animated: animated,
                activeSection: $('.pp-section.active'),
                anchorLink: destination.data('anchor'),
                sectionIndex: destination.index('.pp-section'),
                toMove: destination,
                yMovement: getYmovement(destination),
                leavingSection: $('.pp-section.active').index('.pp-section') + 1
            };

            //quiting when activeSection is the target element
            if(v.activeSection.is(destination)){ return; }

            if(typeof v.animated === 'undefined'){
                v.animated = true;
            }

            if(typeof v.anchorLink !== 'undefined'){
                setURLHash(v.anchorLink, v.sectionIndex);
            }

            v.destination.addClass('active').siblings().removeClass('active');

            v.sectionsToMove = getSectionsToMove(v);

            //scrolling down (moving sections up making them disappear)
            if (v.yMovement === 'down') {
                v.translate3d = getTranslate3d();
                v.scrolling = '-100%';

                if(!options.css3){
                    v.sectionsToMove.each(function(index){
                        if(index != v.activeSection.index('.pp-section')){
                            $(this).css(getScrollProp(v.scrolling));
                        }
                    });
                }

                v.animateSection = v.activeSection;
            }

            //scrolling up (moving section down to the viewport)
            else {
                v.translate3d = 'translate3d(0px, 0px, 0px)';
                v.scrolling = '0';

                v.animateSection = destination;
            }

            $.isFunction(options.onLeave) && options.onLeave.call(this, v.leavingSection, (v.sectionIndex + 1), v.yMovement);

            performMovement(v);

            activateMenuElement(v.anchorLink);
            activateNavDots(v.anchorLink, v.sectionIndex);
            lastScrolledDestiny = v.anchorLink;

            var timeNow = new Date().getTime();
            lastAnimation = timeNow;
        }

        /**
        * Performs the movement (by CSS3 or by jQuery)
        */
        function performMovement(v){
            if(options.css3){
                transformContainer(v.animateSection, v.translate3d, v.animated);

                v.sectionsToMove.each(function(){
                    transformContainer($(this), v.translate3d, v.animated);
                });

                setTimeout(function () {
                    afterSectionLoads(v);
                }, options.scrollingSpeed);
            }else{
                v.scrollOptions = getScrollProp(v.scrolling);

                if(v.animated){
                    v.animateSection.animate(
                        v.scrollOptions,
                    options.scrollingSpeed, options.easing, function () {
                        readjustSections(v);
                        afterSectionLoads(v);
                    });
                }else{
                    v.animateSection.css(getScrollProp(v.scrolling));
                    setTimeout(function(){
                        readjustSections(v);
                        afterSectionLoads(v);
                    },400);
                }
            }
        }

        /**
        * Actions to execute after a secion is loaded
        */
        function afterSectionLoads(v){
            //callback (afterLoad) if the site is not just resizing and readjusting the slides
            $.isFunction(options.afterLoad) && options.afterLoad.call(this, v.anchorLink, (v.sectionIndex + 1));
        }


        function getSectionsToMove(v){
            var sectionToMove;

            if(v.yMovement === 'down'){
                sectionToMove = $('.pp-section').map(function(index){
                    if (index < v.destination.index('.pp-section')){
                        return $(this);
                    }
                });
            }else{
                sectionToMove = $('.pp-section').map(function(index){
                    if (index > v.destination.index('.pp-section')){
                        return $(this);
                    }
                });
            }

            return sectionToMove;
        }

        /**
        * Returns the sections to re-adjust in the background after the section loads.
        */
        function readjustSections(v){
            if(v.yMovement === 'up'){
                v.sectionsToMove.each(function(index){
                    $(this).css(getScrollProp(v.scrolling));
                });
            }
        }

        /**
        * Gets the property used to create the scrolling effect when using jQuery animations
        * depending on the plugin direction option.
        */
        function getScrollProp(propertyValue){
            if(options.direction === 'vertical'){
                return {'top': propertyValue};
            }
            return {'left': propertyValue};
        }

        /**
        * Scrolls the site without anymations (usually used in the background without the user noticing it)
        */
        function silentScroll(section, offset){
            if (options.css3) {
                transformContainer(section, getTranslate3d(), false);
            }
            else{
                section.css(getScrollProp(offset));
            }
        }

        /**
        * Sets the URL hash for a section with slides
        */
        function setURLHash(anchorLink, sectionIndex){
            if(options.anchors.length){
                location.hash = anchorLink;

                setBodyClass(location.hash);
            }else{
                setBodyClass(String(sectionIndex));
            }
        }

        /**
        * Sets a class for the body of the page depending on the active section / slide
        */
        function setBodyClass(text){
            //removing the #
            text = text.replace('#','');

            //removing previous anchor classes
            $('body')[0].className = $('body')[0].className.replace(/\b\s?pp-viewing-[^\s]+\b/g, '');

            //adding the current anchor
            $('body').addClass('pp-viewing-' + text);
        }

        //TO DO
        function scrollToAnchor(){
            //getting the anchor link in the URL and deleting the `#`
            var value =  window.location.hash.replace('#', '');
            var sectionAnchor = value;
            var section = $(document).find('.pp-section[data-anchor="'+sectionAnchor+'"]');

            if(section.length > 0){  //if theres any #
                scrollPage(section, options.animateAnchor);
            }
        }

        /**
        * Determines if the transitions between sections still taking place.
        * The variable `scrollDelay` adds a "save zone" for devices such as Apple laptops and Apple magic mouses
        */
        function isMoving(){
            var timeNow = new Date().getTime();
            // Cancel scroll if currently animating or within quiet period
            if (timeNow - lastAnimation < scrollDelay + options.scrollingSpeed) {
                return true;
            }
            return false;
        }

        //detecting any change on the URL to scroll to the given anchor link
        //(a way to detect back history button as we play with the hashes on the URL)
        $(window).on('hashchange', hashChangeHandler);

        /**
        * Actions to do when the hash (#) in the URL changes.
        */
        function hashChangeHandler(){
            var value =  window.location.hash.replace('#', '').split('/');
            var sectionAnchor = value[0];

            if(sectionAnchor.length){
                /*in order to call scrollpage() only once for each destination at a time
                It is called twice for each scroll otherwise, as in case of using anchorlinks `hashChange`
                event is fired on every scroll too.*/
                if (sectionAnchor && sectionAnchor !== lastScrolledDestiny)  {
                    var section;

                    if(isNaN(sectionAnchor)){
                        section = $(document).find('[data-anchor="'+sectionAnchor+'"]');
                    }else{
                        section = $('.pp-section').eq( (sectionAnchor -1) );
                    }
                    scrollPage(section);
                }
            }
        }

        /**
        * Cross browser transformations
        */
        function getTransforms(translate3d) {
            return {
                '-webkit-transform': translate3d,
                    '-moz-transform': translate3d,
                    '-ms-transform': translate3d,
                    'transform': translate3d
            };
        }

        /**
         * Adds a css3 transform property to the container class with or without animation depending on the animated param.
         */
        function transformContainer(element, translate3d, animated) {
            element.toggleClass('pp-easing', animated);

            element.css(getTransforms(translate3d));
        }

        /**
         * Sliding with arrow keys, both, vertical and horizontal
         */
        $(document).keydown(function (e) {
            if(options.keyboardScrolling && !isMoving()){
                //Moving the main page with the keyboard arrows if keyboard scrolling is enabled
                switch (e.which) {
                        //up
                    case 38:
                    case 33:
                        PP.moveSectionUp();
                        break;

                        //down
                    case 40:
                    case 34:
                        PP.moveSectionDown();
                        break;

                        //Home
                    case 36:
                        PP.moveTo(1);
                        break;

                        //End
                    case 35:
                        PP.moveTo($('.pp-section').length);
                        break;

                        //left
                    case 37:
                        PP.moveSectionUp();
                        break;

                        //right
                    case 39:
                        PP.moveSectionDown();
                        break;

                    default:
                        return; // exit this handler for other keys
                }
            }
        });

        /**
        * If `normalScrollElements` is used, the mouse wheel scrolling will scroll normally
        * over the defined elements in the option.
        */
        if(options.normalScrollElements){
            $(document).on('mouseenter', options.normalScrollElements, function () {
                PP.setMouseWheelScrolling(false);
            });

            $(document).on('mouseleave', options.normalScrollElements, function(){
                PP.setMouseWheelScrolling(true);
            });
        }

        /**
         * Detecting mousewheel scrolling
         *
         * http://blogs.sitepointstatic.com/examples/tech/mouse-wheel/index.html
         * http://www.sitepoint.com/html5-javascript-mouse-wheel/
         */
        var prevTime = new Date().getTime();

        function MouseWheelHandler(e) {
        	var curTime = new Date().getTime();

        	// cross-browser wheel delta
            e = e || window.event;
            var value = e.wheelDelta || -e.deltaY || -e.detail;
            var delta = Math.max(-1, Math.min(1, value));

            var horizontalDetection = typeof e.wheelDeltaX !== 'undefined' || typeof e.deltaX !== 'undefined';
            var isScrollingVertically = (Math.abs(e.wheelDeltaX) < Math.abs(e.wheelDelta)) || (Math.abs(e.deltaX ) < Math.abs(e.deltaY) || !horizontalDetection);

			//Limiting the array to 150 (lets not waste memory!)
            if(scrollings.length > 149){
                scrollings.shift();
            }

            //keeping record of the previous scrollings
            scrollings.push(Math.abs(value));

            //time difference between the last scroll and the current one
            var timeDiff = curTime-prevTime;
            prevTime = curTime;

            //haven't they scrolled in a while?
            //(enough to be consider a different scrolling action to scroll another section)
            if(timeDiff > 200){
                //emptying the array, we dont care about old scrollings for our averages
                scrollings = [];
            }

            if(!isMoving()){
                var activeSection = $('.pp-section.active');
                var scrollable = isScrollable(activeSection);

                var averageEnd = getAverage(scrollings, 10);
                var averageMiddle = getAverage(scrollings, 70);
                var isAccelerating = averageEnd >= averageMiddle;

                if(isAccelerating && isScrollingVertically){
	                //scrolling down?
	                if (delta < 0) {
	                    scrolling('down', scrollable);

	                //scrolling up?
	                }else if(delta>0){
	                    scrolling('up', scrollable);
	                }
	            }

                return false;
            }
         }

        /**
        * Gets the average of the last `number` elements of the given array.
        */
        function getAverage(elements, number){
            var sum = 0;

            //taking `number` elements from the end to make the average, if there are not enought, 1
            var lastElements = elements.slice(Math.max(elements.length - number, 1));

            for(var i = 0; i < lastElements.length; i++){
                sum = sum + lastElements[i];
            }

            return Math.ceil(sum/number);
        }

        /**
        * Determines the way of scrolling up or down:
        * by 'automatically' scrolling a section or by using the default and normal scrolling.
        */
        function scrolling(type, scrollable){
            var check;
            var scrollSection;

            if(type == 'down'){
                check = 'bottom';
                scrollSection = PP.moveSectionDown;
            }else{
                check = 'top';
                scrollSection = PP.moveSectionUp;
            }

            if(scrollable.length > 0 ){
                //is the scrollbar at the start/end of the scroll?
                if(isScrolled(check, scrollable)){
                    scrollSection();
                }else{
                    return true;
                }
            }else{
                //moved up/down
                scrollSection();
            }
        }

        /**
        * Return a boolean depending on whether the scrollable element is at the end or at the start of the scrolling
        * depending on the given type.
        */
        function isScrolled(type, scrollable){
            if(type === 'top'){
                return !scrollable.scrollTop();
            }else if(type === 'bottom'){
                return scrollable.scrollTop() + 1 + scrollable.innerHeight() >= scrollable[0].scrollHeight;
            }
        }

         /**
        * Determines whether the active section or slide is scrollable through and scrolling bar
        */
        function isScrollable(activeSection){
            return activeSection.filter('.pp-scrollable');
        }

        /**
        * Removes the auto scrolling action fired by the mouse wheel and tackpad.
        * After this function is called, the mousewheel and trackpad movements won't scroll through sections.
        */
        function removeMouseWheelHandler(){
            if (container.get(0).addEventListener) {
                container.get(0).removeEventListener('mousewheel', MouseWheelHandler, false); //IE9, Chrome, Safari, Oper
                container.get(0).removeEventListener('wheel', MouseWheelHandler, false); //Firefox
            } else {
                container.get(0).detachEvent('onmousewheel', MouseWheelHandler); //IE 6/7/8
            }
        }

        /**
        * Adds the auto scrolling action for the mouse wheel and tackpad.
        * After this function is called, the mousewheel and trackpad movements will scroll through sections
        */
        function addMouseWheelHandler(){
            if (container.get(0).addEventListener) {
                container.get(0).addEventListener('mousewheel', MouseWheelHandler, false); //IE9, Chrome, Safari, Oper
                container.get(0).addEventListener('wheel', MouseWheelHandler, false); //Firefox
            } else {
                container.get(0).attachEvent('onmousewheel', MouseWheelHandler); //IE 6/7/8
            }
        }

        /**
        * Adds the possibility to auto scroll through sections on touch devices.
        */
        function addTouchHandler(){
            if(isTouch){
                //Microsoft pointers
                var MSPointer = getMSPointer();

                container.off('touchstart ' +  MSPointer.down).on('touchstart ' + MSPointer.down, touchStartHandler);
                container.off('touchmove ' + MSPointer.move).on('touchmove ' + MSPointer.move, touchMoveHandler);
            }
        }

        /**
        * Removes the auto scrolling for touch devices.
        */
        function removeTouchHandler(){
            if(isTouch){
                //Microsoft pointers
                var MSPointer = getMSPointer();

                container.off('touchstart ' + MSPointer.down);
                container.off('touchmove ' + MSPointer.move);
            }
        }

        /*
        * Returns and object with Microsoft pointers (for IE<11 and for IE >= 11)
        * http://msdn.microsoft.com/en-us/library/ie/dn304886(v=vs.85).aspx
        */
        function getMSPointer(){
            var pointer;

            //IE >= 11 & rest of browsers
            if(window.PointerEvent){
                pointer = { down: 'pointerdown', move: 'pointermove', up: 'pointerup'};
            }

            //IE < 11
            else{
                pointer = { down: 'MSPointerDown', move: 'MSPointerMove', up: 'MSPointerUp'};
            }

            return pointer;
        }

        /**
        * Gets the pageX and pageY properties depending on the browser.
        * https://github.com/alvarotrigo/fullPage.js/issues/194#issuecomment-34069854
        */
        function getEventsPage(e){
            var events = new Array();

            events.y = (typeof e.pageY !== 'undefined' && (e.pageY || e.pageX) ? e.pageY : e.touches[0].pageY);
            events.x = (typeof e.pageX !== 'undefined' && (e.pageY || e.pageX) ? e.pageX : e.touches[0].pageX);

            return events;
        }

        /**
        * As IE >= 10 fires both touch and mouse events when using a mouse in a touchscreen
        * this way we make sure that is really a touch event what IE is detecting.
        */
        function isReallyTouch(e){
            //if is not IE   ||  IE is detecting `touch` or `pen`
            return typeof e.pointerType === 'undefined' || e.pointerType != 'mouse';
        }

        /**
        * Getting the starting possitions of the touch event
        */
        function touchStartHandler(event){
            var e = event.originalEvent;

            if(isReallyTouch(e)){
                var touchEvents = getEventsPage(e);
                touchStartY = touchEvents.y;
                touchStartX = touchEvents.x;
            }
        }

        /* Detecting touch events
        */
        function touchMoveHandler(event){
            var e = event.originalEvent;

            // additional: if one of the normalScrollElements isn't within options.normalScrollElementTouchThreshold hops up the DOM chain
            if ( !checkParentForNormalScrollElement(event.target) && isReallyTouch(e) ) {

                var activeSection = $('.pp-section.active');
                var scrollable = isScrollable(activeSection);

                if(!scrollable.length){
                    event.preventDefault();
                }

                if (!isMoving()) {
                    var touchEvents = getEventsPage(e);
                    touchEndY = touchEvents.y;
                    touchEndX = touchEvents.x;

                  //$('body').append('<span style="position:fixed; top: 250px; left: 20px; z-index:88; font-size: 25px; color: #000;">touchEndY: ' + touchEndY  + '</div>');

                    //X movement bigger than Y movement?
                    if (options.direction === 'horizontal' && Math.abs(touchStartX - touchEndX) > (Math.abs(touchStartY - touchEndY))) {
                        //is the movement greater than the minimum resistance to scroll?
                        if (Math.abs(touchStartX - touchEndX) > (container.width() / 100 * options.touchSensitivity)) {
                            if (touchStartX > touchEndX) {
                                scrolling('down', scrollable);
                            } else if (touchEndX > touchStartX) {
                                scrolling('up', scrollable);
                            }
                        }
                    } else {
                        if (Math.abs(touchStartY - touchEndY) > (container.height() / 100 * options.touchSensitivity)) {
                            if (touchStartY > touchEndY) {
                                scrolling('down', scrollable);
                            } else if (touchEndY > touchStartY) {
                                scrolling('up', scrollable);
                            }
                        }
                    }
                }
            }
        }

        /**
         * recursive function to loop up the parent nodes to check if one of them exists in options.normalScrollElements
         * Currently works well for iOS - Android might need some testing
         * @param  {Element} el  target element / jquery selector (in subsequent nodes)
         * @param  {int}     hop current hop compared to options.normalScrollElementTouchThreshold
         * @return {boolean} true if there is a match to options.normalScrollElements
         */
        function checkParentForNormalScrollElement (el, hop) {
            hop = hop || 0;
            var parent = $(el).parent();

            if (hop < options.normalScrollElementTouchThreshold &&
                parent.is(options.normalScrollElements) ) {
                return true;
            } else if (hop == options.normalScrollElementTouchThreshold) {
                return false;
            } else {
                return checkParentForNormalScrollElement(parent, ++hop);
            }
        }


        /**
        * Creates a vertical navigation bar.
        */
        function addVerticalNavigation(){
            $('body').append('<div id="pp-nav"><ul></ul></div>');
            var nav = $('#pp-nav');

            nav.css('color', options.navigation.textColor);

            nav.addClass(options.navigation.position);

            for(var cont = 0; cont < $('.pp-section').length; cont++){
                var link = '';
                if(options.anchors.length){
                    link = options.anchors[cont];
                }
                if(options.navigation.tooltips !== 'undefined'){
                    var tooltip = options.navigation.tooltips[cont];
                    if(typeof tooltip === 'undefined'){
                        tooltip = '';
                    }
                }

                nav.find('ul').append('<li data-tooltip="' + tooltip + '"><a href="#' + link + '"><span></span></a></li>');
            }

            nav.find('span').css('border-color', options.navigation.bulletsColor);
        }

        /**
        * Scrolls to the section when clicking the navigation bullet
        */
        $(document).on('click touchstart', '#pp-nav a', function(e){
            e.preventDefault();
            var index = $(this).parent().index();

            scrollPage($('.pp-section').eq(index));
        });

        /**
        * Navigation tooltips
        */
        $(document).on({
            mouseenter: function(){
                var tooltip = $(this).data('tooltip');
                $('<div class="pp-tooltip ' + options.navigation.position +'">' + tooltip + '</div>').hide().appendTo($(this)).fadeIn(200);
            },
            mouseleave: function(){
                $(this).find('.pp-tooltip').fadeOut(200, function() {
                    $(this).remove();
                });
            }
        }, '#pp-nav li');

         /**
         * Activating the website navigation dots according to the given slide name.
         */
        function activateNavDots(name, sectionIndex){
            if(options.navigation){
                $('#pp-nav').find('.active').removeClass('active');
                if(name){
                    $('#pp-nav').find('a[href="#' + name + '"]').addClass('active');
                }else{
                    $('#pp-nav').find('li').eq(sectionIndex).find('a').addClass('active');
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
                    el.style[t] = 'translate3d(1px,1px,1px)';
                    has3d = window.getComputedStyle(el).getPropertyValue(transforms[t]);
                }
            }

            document.body.removeChild(el);

            return (has3d !== undefined && has3d.length > 0 && has3d !== 'none');
        }

        /**
        * Gets the translate3d property to apply when using css3:true depending on the `direction` option.
        */
        function getTranslate3d(){
            if (options.direction !== 'vertical') {
                  return 'translate3d(-100%, 0px, 0px)';
            }

            return 'translate3d(0px, -100%, 0px)';
        }

    };
})(jQuery, document, window);