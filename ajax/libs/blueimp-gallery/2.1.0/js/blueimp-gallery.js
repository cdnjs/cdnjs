/*
 * blueimp Gallery JS 2.1.0
 * https://github.com/blueimp/Gallery
 *
 * Copyright 2013, Sebastian Tschan
 * https://blueimp.net
 *
 * Swipe implementation based on
 * https://github.com/bradbirdsall/Swipe
 *
 * Licensed under the MIT license:
 * http://www.opensource.org/licenses/MIT
 */

/*jslint regexp: true */
/*global define, window, document, DocumentTouch */

(function () {
    'use strict';

    function Gallery(list, options) {
        if (!list || !list.length || document.body.style.maxHeight === undefined) {
            // document.body.style.maxHeight is undefined on IE6 and lower
            return false;
        }
        if (!this || this.options !== Gallery.prototype.options) {
            // Called as function instead of as constructor,
            // so we simply return a new instance:
            return new Gallery(list, options);
        }
        this.list = list;
        this.num = list.length;
        this.initOptions(options);
        this.initStartIndex();
        if (this.initWidget() === false) {
            return false;
        }
        this.initEventListeners();
        // Load the slide at the given index:
        this.onslide(this.index);
        // start the automatic slideshow if applicable:
        if (this.options.interval) {
            this.play();
        }
        if (this.options.fullScreen && !this.getFullScreenElement()) {
            this.requestFullScreen(this.container);
        }
    }

    var helper = {

        extend: function (obj1, obj2) {
            var prop;
            for (prop in obj2) {
                if (obj2.hasOwnProperty(prop)) {
                    obj1[prop] = obj2[prop];
                }
            }
            return obj1;
        },

        hasClass: function (element, className) {
            return new RegExp('(^|\\s+)' + className + '(\\s+|$)').test(element.className);
        },

        addClass: function (element, className) {
            if (!element.className) {
                element.className = className;
                return;
            }
            if (this.hasClass(element, className)) {
                return;
            }
            element.className += ' ' + className;
        },

        removeClass: function (element, className) {
            var regexp = new RegExp('(^|\\s+)' + className + '(\\s+|$)');
            element.className = element.className.replace(regexp, ' ');
        },

        addListener: function (element, eventName, handler) {
            if (element.addEventListener) {
                element.addEventListener(eventName, handler, false);
            } else if (element.attachEvent) {
                element.attachEvent('on' + eventName, handler);
            }
        },

        removeListener: function (element, eventName, handler) {
            if (element.removeEventListener) {
                element.removeEventListener(eventName, handler, false);
            } else if (element.detachEvent) {
                element.detachEvent('on' + eventName, handler);
            }
        },

        preventDefault: function (event) {
            if (event.preventDefault) {
                event.preventDefault();
            } else {
                event.returnValue = false;
            }
        },

        empty: function (element) {
            while (element.hasChildNodes()) {
                element.removeChild(element.lastChild);
            }
        },

        query: function (container, element) {
            if (typeof element === 'string') {
                if (container.querySelector) {
                    return container.querySelector(element);
                }
                if (element.charAt(0) === '#') {
                    return container.getElementById(element.slice(1));
                }
                return container.getElementsByTagName(element)[0];
            }
            return element;
        },

        contains: function (container, element) {
            do {
                element = element.parentNode;
                if (element === container) {
                    return true;
                }
            } while (element);
            return false;
        },

        parseJSON: function (string) {
            return window.JSON && JSON.parse(string);
        },

        getNestedProperty: function (obj, property) {
            property.replace(
                // Matches native JavaScript notation in a String,
                // e.g. '["doubleQuoteProp"].dotProp[2]'
                /\[(?:'([^']+)'|"([^"]+)"|(\d+))\]|(?:(?:^|\.)([^\.\[]+))/g,
                function (str, singleQuoteProp, doubleQuoteProp, arrayIndex, dotProp) {
                    var prop = dotProp || singleQuoteProp || doubleQuoteProp ||
                            (arrayIndex && parseInt(arrayIndex, 10));
                    if (str && obj) {
                        obj = obj[prop];
                    }
                }
            );
            return obj;
        }

    };

    helper.extend(Gallery.prototype, {

        helper: helper,

        options: {
            // The Id, element or querySelector of the gallery widget:
            container: '#blueimp-gallery',
            // The tag name, Id, element or querySelector of the slides container:
            slidesContainer: 'div',
            // The tag name, Id, element or querySelector of the title element:
            titleElement: 'h3',
            // The tag name, Id, element or querySelector of the indicator container:
            indicatorContainer: 'ol',
            // The class to add when the gallery is visible:
            displayClass: 'blueimp-gallery-display',
            // The class to add when the gallery controls are visible:
            controlsClass: 'blueimp-gallery-controls',
            // The class to add when the gallery only displays one element:
            singleClass: 'blueimp-gallery-single',
            // The class to add when the left edge has been reached:
            leftEdgeClass: 'blueimp-gallery-left',
            // The class to add when the right edge has been reached:
            rightEdgeClass: 'blueimp-gallery-right',
            // The class for all slides:
            slideClass: 'slide',
            // The slide class for loading elements:
            slideLoadingClass: 'slide-loading',
            // The slide class for elements that failed to load:
            slideErrorClass: 'slide-error',
            // The class for the content element loaded into each slide:
            slideContentClass: 'slide-content',
            // The class for video content elements:
            videoContentClass: 'video-content',
            // The class for video when it is loading:
            videoLoadingClass: 'video-loading',
            // The class for video when it is playing:
            videoPlayingClass: 'video-playing',
            // The class for the "toggle" control:
            toggleClass: 'toggle',
            // The class for the "prev" control:
            prevClass: 'prev',
            // The class for the "next" control:
            nextClass: 'next',
            // The class for the "close" control:
            closeClass: 'close',
            // The class for the active indicator:
            activeClass: 'active',
            // The list object property (or data attribute) with the object type:
            typeProperty: 'type',
            // The list object property (or data attribute) with the object title:
            titleProperty: 'title',
            // The list object property (or data attribute) with the object URL:
            urlProperty: 'href',
            // The list object property (or data attribute) with the thumbnail URL,
            // used as alternative to a thumbnail child element:
            thumbnailProperty: 'thumbnail',
            // The list object property (or data attribute) for the video poster URL:
            videoPosterProperty: 'poster',
            // The list object property (or data attribute) for the video sources array:
            videoSourcesProperty: 'sources',
            // Defines if the gallery indicators should display a thumbnail:
            thumbnailIndicators: true,
            // Defines if the gallery slides are cleared from the gallery modal,
            // or reused for the next gallery initialization:
            clearSlides: true,
            // Defines if the gallery should open in fullscreen mode:
            fullScreen: false,
            // Toggle the controls on pressing the Return key:
            toggleControlsOnReturn: true,
            // Navigate the gallery by pressing left and right on the keyboard:
            enableKeyboardNavigation: true,
            // Close the gallery on pressing the ESC key:
            closeOnEscape: true,
            // Close the gallery when clicking on an empty slide area:
            closeOnSlideClick: true,
            // Close the gallery by swiping up or down:
            closeOnSwipeUpOrDown: true,
            // Emulate touch events on mouse-pointer devices such as desktop browsers:
            emulateTouchEvents: true,
            // Hide the page scrollbars: 
            hidePageScrollbars: true,
            // Stops any touches on the container from scrolling the page:
            disableScroll: true,
            // Carousel mode (shortcut for carousel specific options):
            carousel: false,
            // Allow continuous navigation, moving from last to first
            // and from first to last slide:
            continuous: true,
            // The number of elements to load around the current index:
            preloadRange: 2,
            // The starting index as integer.
            // Can also be an object of the given list,
            // or an equal object with the same url property:
            index: 0,
            // Delay in milliseconds between slides for an automatic slideshow,
            // is disabled if set to a falsy value (e.g. 0, false, null):
            interval: 0,
            // The transition speed between slide changes in milliseconds:
            speed: 400,
            // Callback function executed on slide change.
            // Is called with the list object as "this" object and the
            // current index and slide as arguments:
            onslide: undefined,
            // Callback function executed after the slide change transition.
            // Is called with the list object as "this" object and the
            // current index and slide as arguments:
            onslideend: undefined,
            // Callback function executed on slide content load.
            // Is called with the list object as "this" object and the
            // slide index and slide element as arguments:
            onslidecomplete: undefined
        },

        carouselOptions: {
            hidePageScrollbars: false,
            toggleControlsOnReturn: false,
            enableKeyboardNavigation: false,
            closeOnEscape: false,
            closeOnSlideClick: false,
            closeOnSwipeUpOrDown: false,
            disableScroll: false,
            interval: 5000 // 5 seconds
        },

        // Detect touch, transition and transform support:
        support: (function (element) {
            var support = {
                    touch: window.ontouchstart !== undefined ||
                        (window.DocumentTouch && document instanceof DocumentTouch)
                },
                transitions = {
                    webkitTransition: {
                        end: 'webkitTransitionEnd',
                        prefix: '-webkit-'
                    },
                    MozTransition: {
                        end: 'transitionend',
                        prefix: '-moz-'
                    },
                    OTransition: {
                        end: 'otransitionend',
                        prefix: '-o-'
                    },
                    transition: {
                        end: 'transitionend',
                        prefix: ''
                    }
                },
                prop,
                transition,
                translateZ;
            for (prop in transitions) {
                if (transitions.hasOwnProperty(prop) &&
                        element.style[prop] !== undefined) {
                    transition = transitions[prop];
                    transition.name = prop;
                    support.transition = transition;
                    break;
                }
            }
            if (transition) {
                document.body.appendChild(element);
                prop = transition.name.slice(0, -9) + 'ransform';
                if (element.style[prop] !== undefined) {
                    element.style[prop] = 'translateZ(0)';
                    translateZ = window.getComputedStyle(element)
                        .getPropertyValue(transition.prefix + 'transform');
                    support.transform = {
                        prefix: transition.prefix,
                        name: prop,
                        translate: true,
                        translateZ: translateZ && translateZ !== 'none'
                    };
                }
                document.body.removeChild(element);
            }
            return support;
            // Test element, has to be standard HTML and must not be hidden
            // for the CSS3 transform translateZ test to be applicable:
        }(document.createElement('div'))),

        slide: function (to, speed) {
            window.clearTimeout(this.timeout);
            var index = this.index,
                direction,
                natural_direction,
                diff;
            if (index === to || this.num === 1) {
                return;
            }
            if (!speed) {
                speed = this.options.speed;
            }
            if (this.support.transition) {
                if (!this.options.continuous) {
                    to = this.circle(to);
                }
                // 1: backward, -1: forward:
                direction = Math.abs(index - to) / (index - to);
                // Get the actual position of the slide:
                if (this.options.continuous) {
                    natural_direction = direction;
                    direction = -this.positions[this.circle(to)] / this.slideWidth;
                    // If going forward but to < index, use to = slides.length + to
                    // If going backward but to > index, use to = -slides.length + to
                    if (direction !== natural_direction) {
                        to = -direction * this.num + to;
                    }
                }
                diff = Math.abs(index - to) - 1;
                // Move all the slides between index and to in the right direction:
                while (diff) {
                    diff -= 1;
                    this.move(
                        this.circle((to > index ? to : index) - diff - 1),
                        this.slideWidth * direction,
                        0
                    );
                }
                to = this.circle(to);
                this.move(index, this.slideWidth * direction, speed);
                this.move(to, 0, speed);
                if (this.options.continuous) {
                    this.move(
                        this.circle(to - direction),
                        -(this.slideWidth * direction),
                        0
                    );
                }
            } else {
                to = this.circle(to);
                this.animate(index * -this.slideWidth, to * -this.slideWidth, speed);
            }
            this.index = to;
            this.onslide(to);
        },

        getIndex: function () {
            return this.index;
        },

        getNumber: function () {
            return this.num;
        },

        prev: function () {
            if (this.options.continuous || this.index) {
                this.slide(this.index - 1);
            }
        },

        next: function () {
            if (this.options.continuous || this.index < this.num - 1) {
                this.slide(this.index + 1);
            }
        },

        play: function (time) {
            window.clearTimeout(this.timeout);
            this.interval = time || this.options.interval;
            if (this.status[this.index] > 1) {
                this.timeout = this.setTimeout(
                    this.slide,
                    [this.index + 1],
                    this.interval
                );
            }
        },

        pause: function () {
            window.clearTimeout(this.timeout);
            this.interval = null;
        },

        add: function (list) {
            var i;
            this.list = this.list.concat(list);
            this.num = this.list.length;
            if (this.num > 2 && this.options.continuous === null) {
                this.options.continuous = true;
                this.helper.removeClass(this.container, this.options.leftEdgeClass);
            }
            this.helper.removeClass(this.container, this.options.rightEdgeClass);
            this.helper.removeClass(this.container, this.options.singleClass);
            for (i = this.num - list.length; i < this.num; i += 1) {
                this.addSlide(i);
                this.positionSlide(i);
                this.addIndicator(i);
            }
            this.elements.length =
                this.status.length =
                this.positions.length = this.num;
            this.initSlides(true);
        },

        close: function () {
            var helper = this.helper,
                options = this.options;
            if (this.getFullScreenElement() === this.container) {
                this.exitFullScreen();
            }
            this.container.style.display = 'none';
            helper.removeClass(this.container, options.displayClass);
            helper.removeClass(this.container, options.singleClass);
            helper.removeClass(this.container, options.leftEdgeClass);
            helper.removeClass(this.container, options.rightEdgeClass);
            if (options.hidePageScrollbars) {
                document.body.style.overflow = this.bodyOverflowStyle;
            }
            this.destroyEventListeners();
            // Cancel the slideshow:
            this.pause();
            // Reset the slides container:
            this.slidesContainer.style.width = 'auto';
            this.slidesContainer.style.left = 0;
            if (options.clearSlides) {
                helper.empty(this.slidesContainer);
                if (this.indicatorContainer) {
                    helper.empty(this.indicatorContainer);
                }
            } else if (this.activeIndicator) {
                helper.removeClass(this.activeIndicator, options.activeClass);
            }
        },

        circle: function (index) {
            // Always return a number inside of the slides index range:
            return (this.num + (index % this.num)) % this.num;
        },

        move: function (index, dist, speed) {
            this.translateX(index, dist, speed);
            this.positions[index] = dist;
        },

        translate: function (index, x, y, speed) {
            var style = this.slides[index].style,
                transition = this.support.transition,
                transform = this.support.transform;
            style[transition.name + 'Duration'] = speed + 'ms';
            style[transform.name] = 'translate(' + x + 'px, ' + y + 'px)' +
                (transform.translateZ ? ' translateZ(0)' : '');
        },

        translateX: function (index, x, speed) {
            this.translate(index, x, 0, speed);
        },

        translateY: function (index, y, speed) {
            this.translate(index, 0, y, speed);
        },

        animate: function (from, to, speed) {
            if (!speed) {
                this.slidesContainer.style.left = to + 'px';
                return;
            }
            var that = this,
                start = new Date().getTime(),
                timer = window.setInterval(function () {
                    var timeElap = new Date().getTime() - start;
                    if (timeElap > speed) {
                        that.slidesContainer.style.left = to + 'px';
                        that.ontransitionend();
                        window.clearInterval(timer);
                        return;
                    }
                    that.slidesContainer.style.left = (((to - from) *
                        (Math.floor((timeElap / speed) * 100) / 100)) + from) + 'px';
                }, 4);
        },

        onresize: function () {
            this.initSlides(true);
        },

        onmousedown: function (event) {
            // Trigger on clicks of the left mouse button only:
            if (event.which && event.which === 1) {
                event.touches = [{
                    pageX: event.pageX,
                    pageY: event.pageY
                }];
                this.ontouchstart(event);
            }
        },

        onmousemove: function (event) {
            if (this.touchStart) {
                event.touches = [{
                    pageX: event.pageX,
                    pageY: event.pageY
                }];
                this.ontouchmove(event);
            }
        },

        onmouseup: function (event) {
            if (this.touchStart) {
                this.ontouchend(event);
                delete this.touchStart;
            }
        },

        onmouseout: function (event) {
            if (this.touchStart) {
                var target = event.target,
                    related = event.relatedTarget;
                if (!related || (related !== target &&
                        !this.helper.contains(target, related))) {
                    this.onmouseup(event);
                }
            }
        },

        ontouchstart: function (event) {
            var touches = event.touches[0];
            this.touchStart = {
                // Remember the initial touch coordinates:
                x: touches.pageX,
                y: touches.pageY,
                // Store the time to determine touch duration:
                time: Date.now()
            };
            // Helper variable to detect scroll movement:
            this.isScrolling = undefined;
            // Reset delta values:
            this.touchDelta = {};
        },

        ontouchmove: function (event) {
            // Ensure this is a one touch swipe and not, e.g. a pinch:
            if (event.touches.length > 1 || (event.scale && event.scale !== 1)) {
                return;
            }
            if (this.options.disableScroll) {
                event.preventDefault();
            }
            var touches = event.touches[0],
                index = this.index,
                touchDeltaX,
                indices;
            // Measure change in x and y coordinates:
            this.touchDelta = {
                x: touches.pageX - this.touchStart.x,
                y: touches.pageY - this.touchStart.y
            };
            touchDeltaX = this.touchDelta.x;
            // Detect if this is a vertical scroll movement (run only once per touch):
            if (this.isScrolling === undefined) {
                this.isScrolling = this.isScrolling ||
                    Math.abs(touchDeltaX) < Math.abs(this.touchDelta.y);
            }
            if (!this.isScrolling) {
                // Always prevent horizontal scroll:
                event.preventDefault();
                // Stop the slideshow:
                window.clearTimeout(this.timeout);
                if (this.options.continuous) {
                    indices = [
                        this.circle(index + 1),
                        index,
                        this.circle(index - 1)
                    ];
                } else {
                    // Increase resistance if first slide and sliding left
                    // or last slide and sliding right:
                    this.touchDelta.x = touchDeltaX =
                        touchDeltaX /
                        (((!index && touchDeltaX > 0) ||
                            (index === this.num - 1 && touchDeltaX < 0)) ?
                                (Math.abs(touchDeltaX) / this.slideWidth + 1) : 1);
                    indices = [index];
                    if (index) {
                        indices.push(index - 1);
                    }
                    if (index < this.num - 1) {
                        indices.unshift(index + 1);
                    }
                }
                while (indices.length) {
                    index = indices.pop();
                    this.translateX(index, touchDeltaX + this.positions[index], 0);
                }
            } else if (this.options.closeOnSwipeUpOrDown) {
                this.translateY(index, this.touchDelta.y + this.positions[index], 0);
            }
        },

        ontouchend: function () {
            var index = this.index,
                speed = this.options.speed,
                slideWidth = this.slideWidth,
                isShortDuration = Number(Date.now() - this.touchStart.time) < 250,
                // Determine if slide attempt triggers next/prev slide:
                isValidSlide = (isShortDuration && Math.abs(this.touchDelta.x) > 20) ||
                    Math.abs(this.touchDelta.x) > slideWidth / 2,
                // Determine if slide attempt is past start or end:
                isPastBounds = (!index && this.touchDelta.x > 0)
                        || (index === this.num - 1 && this.touchDelta.x < 0),
                isValidClose = !isValidSlide && this.options.closeOnSwipeUpOrDown &&
                    ((isShortDuration && Math.abs(this.touchDelta.y) > 20) ||
                        Math.abs(this.touchDelta.y) > this.slideHeight / 2),
                direction,
                indexForward,
                indexBackward,
                distanceForward,
                distanceBackward;
            if (this.options.continuous) {
                isPastBounds = false;
            }
            // Determine direction of swipe (true: right, false: left):
            direction = this.touchDelta.x < 0 ? -1 : 1;
            if (!this.isScrolling) {
                if (isValidSlide && !isPastBounds) {
                    indexForward = index + direction;
                    indexBackward = index - direction;
                    distanceForward = slideWidth * direction;
                    distanceBackward = -slideWidth * direction;
                    if (this.options.continuous) {
                        this.move(this.circle(indexForward), distanceForward, 0);
                        this.move(this.circle(index - 2 * direction), distanceBackward, 0);
                    } else if (indexForward >= 0 &&
                            indexForward < this.num) {
                        this.move(indexForward, distanceForward, 0);
                    }
                    this.move(index, this.positions[index] + distanceForward, speed);
                    this.move(
                        this.circle(indexBackward),
                        this.positions[this.circle(indexBackward)] + distanceForward,
                        speed
                    );
                    index = this.circle(indexBackward);
                    this.onslide(index);
                } else {
                    // Move back into position
                    if (this.options.continuous) {
                        this.move(this.circle(index - 1), -slideWidth, speed);
                        this.move(index, 0, speed);
                        this.move(this.circle(index + 1), slideWidth, speed);
                    } else {
                        if (index) {
                            this.move(index - 1, -slideWidth, speed);
                        }
                        this.move(index, 0, speed);
                        if (index < this.num - 1) {
                            this.move(index + 1, slideWidth, speed);
                        }
                    }
                }
            } else {
                if (isValidClose) {
                    this.close();
                } else {
                    // Move back into position
                    this.translateY(index, 0, speed);
                }
            }
            this.index = index;
        },

        ontransitionend: function (event) {
            var slide = this.slides[this.index];
            if (!event || slide === event.target) {
                if (this.interval) {
                    this.play();
                }
                this.setTimeout(
                    this.options.onslideend,
                    [this.index, slide]
                );
            }
        },

        oncomplete: function (event) {
            var target = event.target || event.srcElement,
                parent = target && target.parentNode,
                index;
            if (!target || !parent) {
                return;
            }
            index = this.getNodeIndex(parent);
            this.helper.removeClass(parent, this.options.slideLoadingClass);
            if (event.type === 'error') {
                this.helper.addClass(parent, this.options.slideErrorClass);
                this.status[index] = 3; // Fail
            } else {
                this.status[index] = 2; // Done
            }
            // Fix for IE7's lack of support for percentage max-height:
            if (target.clientHeight > this.container.clientHeight) {
                target.style.maxHeight = this.container.clientHeight;
            }
            if (this.interval && this.slides[this.index] === parent) {
                this.play();
            }
            this.setTimeout(
                this.options.onslidecomplete,
                [index, parent]
            );
        },

        onload: function (event) {
            this.oncomplete(event);
        },

        onerror: function (event) {
            this.oncomplete(event);
        },

        onkeydown: function (event) {
            switch (event.which || event.keyCode) {
            case 13: // Return
                if (this.options.toggleControlsOnReturn) {
                    this.helper.preventDefault(event);
                    this.toggleControls();
                }
                break;
            case 27: // ESC
                if (this.options.closeOnEscape) {
                    this.close();
                }
                break;
            case 37: // left
                if (this.options.enableKeyboardNavigation) {
                    this.helper.preventDefault(event);
                    this.prev();
                }
                break;
            case 39: // right
                if (this.options.enableKeyboardNavigation) {
                    this.helper.preventDefault(event);
                    this.next();
                }
                break;
            }
        },

        onclick: function (event) {
            if (this.options.emulateTouchEvents &&
                    this.touchDelta && (Math.abs(this.touchDelta.x) > 20 ||
                        Math.abs(this.touchDelta.y) > 20)) {
                delete this.touchDelta;
                return;
            }
            var options = this.options,
                target = event.target || event.srcElement,
                parent = target.parentNode,
                helper = this.helper,
                isTarget = function (className) {
                    return helper.hasClass(target, className) ||
                        helper.hasClass(parent, className);
                };
            if (parent === this.slidesContainer) {
                // Click on slide background
                helper.preventDefault(event);
                if (options.closeOnSlideClick) {
                    this.close();
                } else {
                    this.toggleControls();
                }
            } else if (parent.parentNode &&
                    parent.parentNode === this.slidesContainer) {
                // Click on displayed element
                helper.preventDefault(event);
                this.toggleControls();
            } else if (parent === this.indicatorContainer) {
                // Click on indicator element
                helper.preventDefault(event);
                this.slide(this.getNodeIndex(target));
            } else if (parent.parentNode === this.indicatorContainer) {
                // Click on indicator child element
                helper.preventDefault(event);
                this.slide(this.getNodeIndex(parent));
            } else if (isTarget(options.toggleClass)) {
                // Click on "toggle" control
                helper.preventDefault(event);
                this.toggleControls();
            } else if (isTarget(options.prevClass)) {
                // Click on "prev" control
                helper.preventDefault(event);
                this.prev();
            } else if (isTarget(options.nextClass)) {
                // Click on "next" control
                helper.preventDefault(event);
                this.next();
            } else if (isTarget(options.closeClass)) {
                // Click on "close" control
                helper.preventDefault(event);
                this.close();
            }
        },

        updateEdgeClasses: function (index) {
            if (!index) {
                this.helper.addClass(this.container, this.options.leftEdgeClass);
            } else {
                this.helper.removeClass(this.container, this.options.leftEdgeClass);
            }
            if (index === this.num - 1) {
                this.helper.addClass(this.container, this.options.rightEdgeClass);
            } else {
                this.helper.removeClass(this.container, this.options.rightEdgeClass);
            }
        },

        onslide: function (index) {
            if (!this.options.continuous) {
                this.updateEdgeClasses(index);
            }
            this.loadElements(index);
            this.setTitle(index);
            this.setActiveIndicator(index);
            this.setTimeout(this.options.onslide, [index, this.slides[index]]);
        },

        setTitle: function (index) {
            var text = this.elements[index].title,
                titleElement = this.titleElement;
            if (titleElement) {
                this.helper.empty(titleElement);
                if (text) {
                    titleElement.appendChild(document.createTextNode(text));
                }
            }
        },

        setActiveIndicator: function (index) {
            if (this.indicators) {
                if (this.activeIndicator) {
                    this.helper.removeClass(this.activeIndicator, this.options.activeClass);
                }
                this.activeIndicator = this.indicators[index];
                this.helper.addClass(this.activeIndicator, this.options.activeClass);
            }
        },

        setTimeout: function (func, args, wait) {
            var that = this;
            return func && window.setTimeout(function () {
                func.apply(that, args || []);
            }, wait || 0);
        },

        videoFactory: function (obj, callback) {
            var that = this,
                options = this.options,
                videoContainer = document.createElement('div'),
                errorArgs = [{
                    type: 'error',
                    target: videoContainer
                }],
                video = document.createElement('video'),
                url = this.getItemProperty(obj, options.urlProperty),
                type = this.getItemProperty(obj, options.typeProperty),
                title = this.getItemProperty(obj, options.titleProperty),
                posterUrl = this.getItemProperty(obj, options.videoPosterProperty),
                posterImage,
                sources = this.getItemProperty(
                    obj,
                    options.videoSourcesProperty
                ),
                source,
                playMediaControl,
                isLoading,
                hasControls;
            this.helper.addClass(videoContainer, options.videoContentClass);
            if (title) {
                videoContainer.title = title;
            }
            if (video.canPlayType) {
                if (url && type && video.canPlayType(type)) {
                    video.src = url;
                } else if (sources) {
                    if (typeof sources === 'string') {
                        sources = this.helper.parseJSON(sources);
                    }
                    while (sources && sources.length) {
                        source = sources.shift();
                        url = this.getItemProperty(source, options.urlProperty);
                        type = this.getItemProperty(source, options.typeProperty);
                        if (url && type && video.canPlayType(type)) {
                            video.src = url;
                            break;
                        }
                    }
                }
            }
            if (posterUrl) {
                video.setAttribute('poster', posterUrl);
                posterImage = document.createElement('img');
                this.helper.addClass(posterImage, options.toggleClass);
                posterImage.src = posterUrl;
                posterImage.draggable = false;
                videoContainer.appendChild(posterImage);
            }
            playMediaControl = document.createElement('a');
            playMediaControl.setAttribute('target', '_blank');
            playMediaControl.setAttribute('download', title);
            playMediaControl.href = url;
            if (video.src) {
                video.controls = true;
                this.helper.addListener(video, 'error', function () {
                    that.setTimeout(callback, errorArgs);
                });
                this.helper.addListener(video, 'pause', function () {
                    isLoading = false;
                    that.helper.removeClass(videoContainer, that.options.videoLoadingClass);
                    that.helper.removeClass(videoContainer, that.options.videoPlayingClass);
                    if (hasControls) {
                        that.helper.addClass(that.container, that.options.controlsClass);
                    }
                    if (that.interval) {
                        that.play();
                    }
                });
                this.helper.addListener(video, 'playing', function () {
                    isLoading = false;
                    that.helper.removeClass(videoContainer, that.options.videoLoadingClass);
                    that.helper.addClass(videoContainer, that.options.videoPlayingClass);
                    if (that.helper.hasClass(that.container, that.options.controlsClass)) {
                        hasControls = true;
                        that.helper.removeClass(that.container, that.options.controlsClass);
                    } else {
                        hasControls = false;
                    }
                });
                this.helper.addListener(video, 'play', function () {
                    window.clearTimeout(that.timeout);
                    isLoading = true;
                    that.helper.addClass(videoContainer, that.options.videoLoadingClass);
                });
                this.helper.addListener(playMediaControl, 'click', function (event) {
                    event.preventDefault();
                    if (isLoading) {
                        video.pause();
                    } else {
                        video.play();
                    }
                });
                videoContainer.appendChild(video);
            }
            videoContainer.appendChild(playMediaControl);
            this.setTimeout(callback, [{
                type: 'load',
                target: videoContainer
            }]);
            return videoContainer;
        },

        imageFactory: function (obj, callback) {
            var img = this.imagePrototype.cloneNode(false),
                url = obj,
                title;
            if (typeof url !== 'string') {
                url = this.getItemProperty(obj, this.options.urlProperty);
                title = this.getItemProperty(obj, this.options.titleProperty);
            }
            if (title) {
                img.title = title;
            }
            this.helper.addListener(img, 'load', callback);
            this.helper.addListener(img, 'error', callback);
            img.src = url;
            img.draggable = false;
            // Fix for IE7 not firing load events for cached images:
            if (img.complete) {
                this.setTimeout(callback, [{
                    type: 'load',
                    target: img
                }]);
            }
            return img;
        },

        createElement: function (obj, callback) {
            var type = obj && this.getItemProperty(obj, this.options.typeProperty),
                factory = (type && this[type.split('/')[0] + 'Factory']) ||
                    this.imageFactory,
                element = obj && factory.call(this, obj, callback);
            if (!element) {
                element = this.elementPrototype.cloneNode(false);
                this.setTimeout(callback, [{
                    type: 'error',
                    target: element
                }]);
            }
            this.helper.addClass(element, this.options.slideContentClass);
            return element;
        },

        createIndicator: function (obj) {
            var indicator = this.indicatorPrototype.cloneNode(false),
                thumbnailProperty = this.options.thumbnailProperty,
                thumbnailUrl,
                thumbnail,
                title = this.getItemProperty(obj, this.options.titleProperty);
            if (this.options.thumbnailIndicators) {
                thumbnail = obj.getElementsByTagName && this.helper.query(obj, 'img');
                if (thumbnail) {
                    thumbnail = thumbnail.cloneNode(false);
                } else if (thumbnailProperty) {
                    thumbnailUrl = this.getItemProperty(obj, thumbnailProperty);
                    if (thumbnailUrl) {
                        thumbnail = this.thumbnailPrototype.cloneNode(false);
                        thumbnail.src = thumbnailUrl;
                    }
                }
                if (thumbnail) {
                    indicator.appendChild(thumbnail);
                }
            }
            if (title && !(thumbnail && thumbnail.title)) {
                indicator.title = title;
            }
            return indicator;
        },

        loadElement: function (index) {
            if (!this.elements[index]) {
                if (this.slides[index].firstChild) {
                    this.elements[index] = this.slides[index].firstChild;
                } else {
                    this.helper.addClass(this.slides[index], this.options.slideLoadingClass);
                    this.elements[index] = this.createElement(
                        this.list[index],
                        this.proxyListener
                    );
                    this.slides[index].appendChild(this.elements[index]);
                }
            }
        },

        loadElements: function (index) {
            if (this.status[index]) {
                return;
            }
            this.status[index] = 1; // Loading
            var limit = Math.min(this.num, this.options.preloadRange * 2 + 1),
                j = index,
                i;
            for (i = 0; i < limit; i += 1) {
                // First load the current slide element (0),
                // then the next one (+1),
                // then the previous one (-2),
                // then the next after next (+2), etc.:
                j += i * (i % 2 === 0 ? -1 : 1);
                // Connect the ends of the list to load slide elements for
                // continuous navigation:
                j = this.circle(j);
                this.loadElement(j);
            }
        },

        addIndicator: function (index) {
            if (this.indicators) {
                var indicator = this.createIndicator(this.list[index]);
                this.indicatorContainer.appendChild(indicator);
                indicator.setAttribute('data-index', index);
                this.indicators.push(indicator);
            }
        },

        addSlide: function (index) {
            var slide = this.slidePrototype.cloneNode(false);
            slide.setAttribute('data-index', index);
            this.slidesContainer.appendChild(slide);
            this.slides.push(slide);
        },

        positionSlide: function (index) {
            var slide = this.slides[index];
            slide.style.width = this.slideWidth + 'px';
            if (this.support.transition) {
                slide.style.left = (index * -this.slideWidth) + 'px';
                this.move(index, this.index > index ? -this.slideWidth :
                        (this.index < index ? this.slideWidth : 0), 0);
            }
        },

        initSlides: function (reload) {
            var clearSlides,
                i;
            if (!reload) {
                this.elements = [];
                this.status = [];
                this.positions = [];
                this.elements.length =
                    this.status.length =
                    this.positions.length = this.num;
                this.imagePrototype = document.createElement('img');
                this.elementPrototype = document.createElement('div');
                this.slides = this.slidesContainer.children;
                if (this.indicatorContainer) {
                    this.indicators = this.indicatorContainer.children;
                }
                clearSlides = this.options.clearSlides || this.slides.length !== this.num;
            }
            this.slideWidth = this.container.offsetWidth;
            this.slideHeight = this.container.offsetHeight;
            this.slidesContainer.style.width = (this.num * this.slideWidth) + 'px';
            if (clearSlides || reload) {
                if (!reload) {
                    this.helper.empty(this.slidesContainer);
                    if (this.indicatorContainer) {
                        this.helper.empty(this.indicatorContainer);
                    }
                    this.slidePrototype = document.createElement('div');
                    this.helper.addClass(this.slidePrototype, this.options.slideClass);
                    this.slides = [];
                    if (this.indicatorContainer) {
                        this.indicatorPrototype = document.createElement('li');
                        this.indicators = [];
                        if (this.options.thumbnailIndicators) {
                            this.thumbnailPrototype = this.imagePrototype.cloneNode(false);
                        }
                    }
                }
                for (i = 0; i < this.num; i += 1) {
                    if (!reload) {
                        this.addIndicator(i);
                        this.addSlide(i);
                    }
                    this.positionSlide(i);
                }
            }
            // Reposition the slides before and after the given index:
            if (this.options.continuous && this.support.transition) {
                this.move(this.circle(this.index - 1), -this.slideWidth, 0);
                this.move(this.circle(this.index + 1), this.slideWidth, 0);
            }
            if (!this.support.transition) {
                this.slidesContainer.style.left = (this.index * -this.slideWidth) + 'px';
            }
        },

        getFullScreenElement: function () {
            return document.fullscreenElement ||
                document.webkitFullscreenElement ||
                document.mozFullScreenElement;
        },

        requestFullScreen: function (element) {
            if (element.requestFullscreen) {
                element.requestFullscreen();
            } else if (element.webkitRequestFullscreen) {
                element.webkitRequestFullscreen();
            } else if (element.mozRequestFullScreen) {
                element.mozRequestFullScreen();
            }
        },

        exitFullScreen: function () {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            } else if (document.webkitCancelFullScreen) {
                document.webkitCancelFullScreen();
            } else if (document.mozCancelFullScreen) {
                document.mozCancelFullScreen();
            }
        },

        toggleControls: function () {
            var controlsClass = this.options.controlsClass;
            if (this.helper.hasClass(this.container, controlsClass)) {
                this.helper.removeClass(this.container, controlsClass);
            } else {
                this.helper.addClass(this.container, controlsClass);
            }
        },

        getNodeIndex: function (element) {
            return parseInt(element.getAttribute('data-index'), 10);
        },

        getItemProperty: function (obj, property) {
            return obj[property] || (obj.getAttribute &&
                obj.getAttribute('data-' + property)) ||
                this.helper.getNestedProperty(obj, property);
        },

        initStartIndex: function () {
            var index = this.options.index,
                urlProperty = this.options.urlProperty,
                i;
            // Check if the index is given as a list object:
            if (index && typeof index !== 'number') {
                for (i = 0; i < this.num; i += 1) {
                    if (this.list[i] === index ||
                            this.getItemProperty(this.list[i], urlProperty) ===
                                this.getItemProperty(index, urlProperty)) {
                        index  = i;
                        break;
                    }
                }
            }
            // Make sure the index is in the list range:
            this.index = this.circle(parseInt(index, 10) || 0);
        },

        initEventListeners: function () {
            var that = this,
                helper = this.helper,
                slidesContainer = this.slidesContainer,
                proxyListener = function (event) {
                    var type = that.support.transition &&
                            that.support.transition.end === event.type ?
                                    'transitionend' : event.type;
                    that['on' + type](event);
                };
            helper.addListener(window, 'resize', proxyListener);
            helper.addListener(document.body, 'keydown', proxyListener);
            helper.addListener(this.container, 'click', proxyListener);
            if (this.support.touch) {
                slidesContainer.addEventListener('touchstart', proxyListener, false);
                slidesContainer.addEventListener('touchmove', proxyListener, false);
                slidesContainer.addEventListener('touchend', proxyListener, false);
            } else if (this.options.emulateTouchEvents && slidesContainer.addEventListener) {
                slidesContainer.addEventListener('mousedown', proxyListener, false);
                slidesContainer.addEventListener('mousemove', proxyListener, false);
                slidesContainer.addEventListener('mouseup', proxyListener, false);
                slidesContainer.addEventListener('mouseout', proxyListener, false);
            }
            if (this.support.transition) {
                slidesContainer.addEventListener(
                    this.support.transition.end,
                    proxyListener,
                    false
                );
            }
            this.proxyListener = proxyListener;
        },

        destroyEventListeners: function () {
            var helper = this.helper,
                slidesContainer = this.slidesContainer,
                proxyListener = this.proxyListener;
            helper.removeListener(window, 'resize', proxyListener);
            helper.removeListener(document.body, 'keydown', proxyListener);
            helper.removeListener(this.container, 'click', proxyListener);
            if (this.support.touch) {
                slidesContainer.removeEventListener('touchstart', proxyListener, false);
                slidesContainer.removeEventListener('touchmove', proxyListener, false);
                slidesContainer.removeEventListener('touchend', proxyListener, false);
            } else if (this.options.emulateTouchEvents && slidesContainer.removeEventListener) {
                slidesContainer.removeEventListener('mousedown', proxyListener, false);
                slidesContainer.removeEventListener('mousemove', proxyListener, false);
                slidesContainer.removeEventListener('mouseup', proxyListener, false);
                slidesContainer.removeEventListener('mouseout', proxyListener, false);
            }
            if (this.support.transition) {
                slidesContainer.removeEventListener(
                    this.support.transition.end,
                    proxyListener,
                    false
                );
            }
        },

        initWidget: function () {
            this.container = this.helper.query(
                document,
                this.options.container
            );
            if (!this.container) {
                return false;
            }
            this.slidesContainer = this.helper.query(
                this.container,
                this.options.slidesContainer
            );
            if (!this.slidesContainer) {
                return false;
            }
            this.titleElement = this.helper.query(
                this.container,
                this.options.titleElement
            );
            this.indicatorContainer = this.helper.query(
                this.container,
                this.options.indicatorContainer
            );
            if (this.options.hidePageScrollbars) {
                // Hide the page scrollbars:
                this.bodyOverflowStyle = document.body.style.overflow;
                document.body.style.overflow = 'hidden';
            }
            if (this.num === 1) {
                this.helper.addClass(this.container, this.options.singleClass);
            }
            this.container.style.display = 'block';
            this.initSlides();
            this.helper.addClass(this.container, this.options.displayClass);
        },

        initOptions: function (options) {
            // Create a copy of the prototype options:
            this.options = this.helper.extend({}, this.options);
            // Check if carousel mode is enabled:
            if ((options && options.carousel) ||
                    (this.options.carousel && (!options || options.carousel !== false))) {
                this.helper.extend(this.options, this.carouselOptions);
            }
            // Override any given options:
            this.helper.extend(this.options, options);
            if (this.num < 3) {
                // 1 or 2 slides cannot be displayed continuous,
                // remember the original option by setting to null instead of false:
                this.options.continuous = this.options.continuous ? null : false;
            }
            if (!this.support.transition) {
                this.options.emulateTouchEvents = false;
            }
        }

    });

    if (typeof define === 'function' && define.amd) {
        define(function () {
            return Gallery;
        });
    } else {
        window.blueimp = window.blueimp || {};
        window.blueimp.Gallery = Gallery;
    }
}());
