/*!
 * multiscroll.js 0.2.2
 * https://github.com/alvarotrigo/multiscroll.js
 * @license MIT licensed
 *
 * Copyright (C) 2016 alvarotrigo.com - A project by Alvaro Trigo
 */
(function($, window, document, Math, undefined) {

    $.fn.multiscroll = function(options) {
        var MS = $.fn.multiscroll;

        // Create some defaults, extending them with any options that were provided
        options = $.extend({
            'verticalCentered' : true,
            'scrollingSpeed': 700,
            'easing': 'easeInQuart',
            'menu': false,
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
            'fixedElements': null,
            'normalScrollElements': null,
            'keyboardScrolling': true,
            'touchSensitivity': 5,

            // Custom selectors
            'sectionSelector': '.ms-section',
            'leftSelector': '.ms-left',
            'rightSelector': '.ms-right',

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

        var isTouchDevice = navigator.userAgent.match(/(iPhone|iPod|iPad|Android|playbook|silk|BlackBerry|BB10|Windows Phone|Tizen|Bada|webOS|IEMobile|Opera Mini)/);
        var isTouch = (('ontouchstart' in window) || (navigator.msMaxTouchPoints > 0) || (navigator.maxTouchPoints));

        // adding class namef for right and left blocks
        if (options.rightSelector !== '.ms-right') {
            $(options.rightSelector).addClass('ms-right');
        }

        if (options.leftSelector !== '.ms-left') {
            $(options.leftSelector).addClass('ms-left');
        }

        var numberSections = $('.ms-left').find('.ms-section').length;
        var isMoving = false;
        var nav;
        var windowHeight = $(window).height();
        var MSPointer = getMSPointer();
        var events = {
            touchmove: 'ontouchmove' in window ? 'touchmove' :  MSPointer.move,
            touchstart: 'ontouchstart' in window ? 'touchstart' :  MSPointer.down
        };

        //timeouts
        var resizeId;

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

        //adding class names to each sections
        if (options.sectionSelector !== '.ms-section') {
            $(options.sectionSelector).each(function(){
                $(this).addClass('ms-section');
            });
        }

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
            'height': '100%',
            '-ms-touch-action': 'none'
        });

        $('.ms-right').css({
            'right': '1px', //http://stackoverflow.com/questions/23675457/chrome-and-opera-creating-small-padding-when-using-displaytable
            'top': '0',
            '-ms-touch-action': 'none',
            'touch-action': 'none'
        });

        $('.ms-left').css({
            'left': '0',
            'top': '0',
            '-ms-touch-action': 'none',
            'touch-action': 'none'
        });


        $('.ms-left .ms-section, .ms-right .ms-section').each(function(){
            var sectionIndex = $(this).index();

            if(options.paddingTop || options.paddingBottom){
                $(this).css('padding', options.paddingTop  + ' 0 ' + options.paddingBottom + ' 0');
            }

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

            $(this).css({
                'height': '100%'
            });


            if(!sectionIndex && options.navigation ){
                //activating the navigation bullet
                nav.find('li').eq(sectionIndex).find('a').addClass('active');
            }
        }).promise().done(function(){

            //if no active section is defined, the 1st one will be the default one
            if(!$('.ms-left .ms-section.active').length){
                $('.ms-right').find('.ms-section').last().addClass('active');
                $('.ms-left').find('.ms-section').first().addClass('active');
            }

            //vertical centered of the navigation + first bullet active
            if(options.navigation){
                nav.css('margin-top', '-' + (nav.height()/2) + 'px');
            }
            $.isFunction( options.afterRender ) && options.afterRender.call( this);

            //scrolling to the defined active section and adjusting right and left panels
            silentScroll();

            //setting the class for the body element
            setBodyClass();

            $(window).on('load', function() {
                scrollToAnchor();
            });
        });


        //detecting any change on the URL to scroll to the given anchor link
        //(a way to detect back history button as we play with the hashes on the URL)
        $(window).on('hashchange', hashChangeHandler);

        function hashChangeHandler(){
            var value =  window.location.hash.replace('#', '');
            var sectionAnchor = value;

            if(sectionAnchor.length){
                var section = $('.ms-left').find('[data-anchor="'+sectionAnchor+'"]');

                var isFirstScrollMove = (typeof lastScrolledDestiny === 'undefined' );

                if (isFirstScrollMove || sectionAnchor !== lastScrolledDestiny){
                    scrollPage(section);
                }
            }
        };


        /**
        * Sliding with arrow keys, both, vertical and horizontal
        */
        $(document).keydown(keydownHandler);


        var keydownId;
        function keydownHandler(e) {
            clearTimeout(keydownId);

            var activeElement = $(document.activeElement);

            if(!activeElement.is('textarea') && !activeElement.is('input') && !activeElement.is('select') &&
                options.keyboardScrolling){
                var keyCode = e.which;

                //preventing the scroll with arrow keys & spacebar & Page Up & Down keys
                var keyControls = [40, 38, 32, 33, 34];
                if($.inArray(keyCode, keyControls) > -1){
                    e.preventDefault();
                }

                keydownId = setTimeout(function(){
                    onkeydown(e);
                },150);
            }
        }

        /**
         * Sliding with arrow keys, both, vertical and horizontal
         */
        function onkeydown(e){
            var shiftPressed = e.shiftKey;

            switch (e.which) {
                //up
                case 38:
                case 33:
                    MS.moveSectionUp();
                    break;

                //down
                case 32: //spacebar
                    if(shiftPressed){
                        MS.moveSectionUp();
                        break;
                    }
                case 40:
                case 34:
                    MS.moveSectionDown();
                    break;

                //Home
                case 36:
                    MS.moveTo(1);
                    break;

                //End
                case 35:
                    MS.moveTo( $('.ms-left .ms-section').length);
                    break;

                default:
                    return; // exit this handler for other keys
            }
        }

        /**
         * Disabling any action when pressing of the mouse wheel (Chrome, IE, Opera, Safari)
         */
        $(document).mousedown(function(e) {
            if(e.button == 1){
                e.preventDefault();
                return false;
            }
        });

        function navClickHandler(e) {
            e.preventDefault();
            var index = $(this).parent().index();
            scrollPage($('.ms-left .ms-section').eq(index));
        }

        //navigation action
        $(document).on('click', '#multiscroll-nav a', navClickHandler);

        function navMouseEnterHandler() {
            var tooltip = $(this).data('tooltip');
            $('<div class="multiscroll-tooltip ' + options.navigationPosition +'">' + tooltip + '</div>').hide().appendTo($(this)).fadeIn(200);
        }

        function navMouseLeaveHandler() {
            $(this).find('.multiscroll-tooltip').fadeOut(200, function() {
                $(this).remove();
            });
        }

        //navigation tooltips
        $(document).on({
            mouseenter: navMouseEnterHandler,
            mouseleave: navMouseLeaveHandler
        }, '#multiscroll-nav li');


        if(options.normalScrollElements){
            $(document).on('mouseenter', options.normalScrollElements, function () {
                MS.setMouseWheelScrolling(false);
            });

            $(document).on('mouseleave', options.normalScrollElements, function(){
                MS.setMouseWheelScrolling(true);
            });
        }


        //when resizing the site, we adjust the heights of the sections
        $(window).on('resize', resizeHandler);


        var previousHeight = windowHeight;

        /**
         * When resizing is finished, we adjust the slides sizes and positions
         */
        function resizeHandler() {
            // rebuild immediately on touch devices
            if (isTouchDevice) {
                var activeElement = $(document.activeElement);

                //if the keyboard is NOT visible
                if (!activeElement.is('textarea') && !activeElement.is('input') && !activeElement.is('select')) {
                    var currentHeight = $(window).height();

                    //making sure the change in the viewport size is enough to force a rebuild. (20 % of the window to avoid problems when hidding scroll bars)
                    if( Math.abs(currentHeight - previousHeight) > (20 * Math.max(previousHeight, currentHeight) / 100) ){
                        reBuild(true);
                        previousHeight = currentHeight;
                    }
                }
            }else{
                //in order to call the functions only when the resize is finished
                //http://stackoverflow.com/questions/4298612/jquery-how-to-call-resize-event-only-once-its-finished-resizing
                clearTimeout(resizeId);

                resizeId = setTimeout(function(){
                    reBuild(true);
                }, 350);
            }
        }

        /**
         * When resizing is finished, we adjust the slides sizes and positions
         */
        function reBuild(resizing){
            windowHeight = $(window).height();
            $('.ms-tableCell').each(function() {
                $(this).css({ height: getTableHeight($(this).parent()) });
            });

            if(options.scrollOverflow){
                scrollBarHandler.createScrollBarForAll();
            }

            silentScroll();
            $.isFunction( options.afterResize ) && options.afterResize.call( this);
        }

        function silentScroll(){
            //moving the right section to the bottom
            if(options.css3){
                transformContainer($('.ms-left'), 'translate3d(0px, -' + $('.ms-left').find('.ms-section.active').position().top + 'px, 0px)', false);
                transformContainer($('.ms-right'), 'translate3d(0px, -' + $('.ms-right').find('.ms-section.active').position().top + 'px, 0px)', false);
            }else{
                $('.ms-left').css('top', -$('.ms-left').find('.ms-section.active').position().top );
                $('.ms-right').css('top', -$('.ms-right').find('.ms-section.active').position().top );
            }
        }

        MS.moveSectionUp = function(){
            var prev = $('.ms-left .ms-section.active').prev('.ms-section');

            if(!prev.length && options.loopTop){
                prev = $('.ms-left .ms-section').last();
            }

            if (prev.length) {
                scrollPage(prev);
            }
        };

        MS.moveSectionDown = function (){
            var next = $('.ms-left .ms-section.active').next('.ms-section');

            if(!next.length && options.loopBottom ){
                next = $('.ms-left .ms-section').first();
            }

            if(next.length){
                scrollPage(next);
            }
        };

        MS.moveTo = function (section){
            var destiny = '';

            if(isNaN(section)){
                destiny = $('.ms-left [data-anchor="'+section+'"]');
            }else{
                destiny = $('.ms-left .ms-section').eq( (section -1) );
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

            var topPos = {
                'left' : leftDestination.position().top,
                'right': rightDestination.position().top
            };

            rightDestination.addClass('active').siblings().removeClass('active');
            leftDestination.addClass('active').siblings().removeClass('active');

            setURLHash(anchorLink);

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
                    MS.moveSectionDown();
                }

                //scrolling up?
                else {
                    MS.moveSectionUp();
                }
            }


            return false;
        }

        /**
        * Adds a css3 transform property to the container class with or without animation depending on the animated param.
        */
        function transformContainer(container, translate3d, animated){
            container.toggleClass('ms-easing', animated);

            container.css(getTransforms(translate3d));
        }


        /**
        * Returns the transform styles for all browsers
        */
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

            setBodyClass();
        }

         /**
        * Sets a class for the body of the page depending on the active section / slide
        */
        function setBodyClass(){
            var section = $('.ms-left .ms-section.active');
            var sectionAnchor = section.data('anchor');
            var sectionIndex = section.index();

            var text = String(sectionIndex);

            if(options.anchors.length){
                text = sectionAnchor;
            }

            //changing slash for dash to make it a valid CSS style
            text = text.replace('/', '-').replace('#','');

            //removing previous anchor classes
            var classRe = new RegExp('\\b\\s?' + 'ms-viewing' + '-[^\\s]+\\b', "g");
            $('body')[0].className = $('body')[0].className.replace(classRe, '');

            //adding the current anchor
            $('body').addClass('ms-viewing-' + text);
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

        /**
        * Wraps an element in order to center it vertically by using a class style.
        */
        function addTableClass(element){
            element.addClass('ms-table').wrapInner('<div class="ms-tableCell" style="height: ' + getTableHeight(element) + 'px" />');
        }

        /**
        * Gets the height of the section after removing the paddings.
        */
        function getTableHeight(section){
            var sectionHeight = windowHeight;

            if(options.paddingTop || options.paddingBottom){
                var paddings = parseInt(section.css('padding-top')) + parseInt(section.css('padding-bottom'));
                sectionHeight = (windowHeight - paddings);
            }

            return sectionHeight;
        }


        /**
        * Scrolls the page to the existent anchor in the URL
        */
        function scrollToAnchor(){
            //getting the anchor link in the URL and deleting the `#`
            var sectionAnchor =  window.location.hash.replace('#', '');
            var section = $('.ms-left .ms-section[data-anchor="'+sectionAnchor+'"]');

            if(sectionAnchor.length){  //if theres any #
                scrollPage(section);
            }
        }

        /**
        * Adds or remove the possiblity of scrolling through sections by using the keyboard arrow keys
        */
        MS.setKeyboardScrolling = function (value){
            options.keyboardScrolling = value;
        };

        /**
        * Adds or remove the possiblity of scrolling through sections by using the mouse wheel or the trackpad.
        */
        MS.setMouseWheelScrolling = function (value){
            if(value){
                addMouseWheelHandler();
            }else{
                removeMouseWheelHandler();
            }
        };

        /**
        * Defines the scrolling speed
        */
        MS.setScrollingSpeed = function(value){
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
        function touchMoveHandler(e){

            if(isReallyTouch(e)){
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
                            MS.moveSectionDown();

                        } else if (touchEndY > touchStartY) {
                            MS.moveSectionUp();
                        }
                    }
                }
            }
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
        * Handler to get he coordinates of the starting touch
        */
        function touchStartHandler(e){

            if(isReallyTouch(e)){
                var touchEvents = getEventsPage(e);
                touchStartY = touchEvents['y'];
                touchStartX = touchEvents['x'];
            }
        }


        /**
        * Adds the possibility to auto scroll through sections on touch devices.
        */
        function addTouchHandler(){
            if(isTouch || isTouchDevice){
                document.removeEventListener(events.touchstart, touchStartHandler);
                document.removeEventListener(events.touchmove, touchMoveHandler, {passive: false});

                document.addEventListener(events.touchstart, touchStartHandler);
                document.addEventListener(events.touchmove, touchMoveHandler, {passive: false});
            }
        }

        /**
        * Removes the auto scrolling for touch devices.
        */
        function removeTouchHandler(){
            if(isTouch || isTouchDevice){
                document.removeEventListener(events.touchstart, touchStartHandler);
                document.removeEventListener(events.touchmove, touchMoveHandler, {passive: false});
            }
        }

        /*
        * Returns and object with Microsoft pointers (for IE<11 and for IE >= 11)
        * http://msdn.microsoft.com/en-us/library/ie/dn304886(v=vs.85).aspx
        */
        function getMSPointer(){
            var pointer;

            //IE >= 11
            if(window.PointerEvent){
                pointer = { down: "pointerdown", move: "pointermove"};
            }

            //IE < 11
            else{
                pointer = { down: "MSPointerDown", move: "MSPointerMove"};
            }

            return pointer;
        }

        /**
        * Gets the pageX and pageY properties depending on the browser.
        * https://github.com/alvarotrigo/fullPage.js/issues/194#issuecomment-34069854
        */
        function getEventsPage(e){
            var events = [];

            events.y = (typeof e.pageY !== 'undefined' && (e.pageY || e.pageX) ? e.pageY : e.touches[0].pageY);
            events.x = (typeof e.pageX !== 'undefined' && (e.pageY || e.pageX) ? e.pageX : e.touches[0].pageX);

            //in touch devices with scrollBar:true, e.pageY is detected, but we have to deal with touch events. #1008
            if(isTouch && isReallyTouch(e) && typeof e.touches !== 'undefined'){
                events.y = e.touches[0].pageY;
                events.x = e.touches[0].pageX;
            }

            return events;
        }

        /**
        * Destroy multiscroll.js plugin's events
        */
        MS.destroy = function() {
            MS.setKeyboardScrolling(false);
            MS.setMouseWheelScrolling(false);
            removeTouchHandler();

            $(window)
                .off('hashchange', hashChangeHandler)
                .off('resize', resizeHandler);

            $(document)
                .off('mouseenter', '#multiscroll-nav li')
                .off('mouseleave', '#multiscroll-nav li')
                .off('click', '#multiscroll-nav a');
        };

        /**
        * Build multiscroll.js plugin's events after destroy
        */
        MS.build = function() {
            MS.setKeyboardScrolling(true);
            MS.setMouseWheelScrolling(true);
            addTouchHandler();

            $(window)
                .on('hashchange', hashChangeHandler)
                .on('resize', resizeHandler);

            $(document)
                .on('mouseenter', '#multiscroll-nav li', navMouseEnterHandler)
                .on('mouseleave', '#multiscroll-nav li', navMouseLeaveHandler)
                .on('click', '#multiscroll-nav a', navClickHandler);
        };

    };
})(jQuery, window, document, Math);
