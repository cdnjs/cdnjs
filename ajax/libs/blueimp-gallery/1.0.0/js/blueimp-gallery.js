/*
 * blueimp Gallery JS 1.0
 * https://github.com/blueimp/Gallery
 *
 * Copyright 2013, Sebastian Tschan
 * https://blueimp.net
 *
 * Licensed under the MIT license:
 * http://www.opensource.org/licenses/MIT
 */

/*global define, window, document */

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
        var that = this,
            helper = this.helper,
            callback = options && options.callback;
        this.list = list;
        // Create a copy of the prototype options:
        this.options = helper.extend({}, this.options);
        // Check if carousel mode is enabled:
        if ((options && options.carousel) ||
                (this.options.carousel && (!options || options.carousel !== false))) {
            helper.extend(this.options, this.carouselOptions);
        }
        // Override any given options:
        helper.extend(this.options, options);
        // Make sure onslide is called on every slide change,
        // but preserve the given callback option:
        this.options.callback = function (index, slide) {
            that.onslide(index, slide);
            if (callback) {
                callback(index, slide);
            }
        };
        this.container = document.getElementById(this.options.containerId);
        // The container wrap is always the first container child element:
        this.containerWrap = this.container.children[0];
        // Turn the titleElement tag name into a DOM node:
        this.options.titleElement = helper.query(
            this.container,
            this.options.titleElement
        );
        // Turn the indicatorContainer tag name into a DOM node:
        this.options.indicatorContainer = helper.query(
            this.container,
            this.options.indicatorContainer
        );
        this.initEventListeners();
        this.initElements();
        this.requestFullScreen();
        if (this.options.hidePageScrollbars) {
            // Hide the page scrollbars:
            this.bodyOverflowStyle = document.body.style.overflow;
            document.body.style.overflow = 'hidden';
        }
        this.container.style.display = 'block';
        // Force reflow:
        this.noop = this.container.offsetWidth;
        if (this.list.length === 1) {
            helper.addClass(this.container, this.options.singleClass);
        }
        helper.addClass(this.container, this.options.displayClass);
        this.swipe = window.Swipe(this.container, this.options);
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
                return container.getElementsByTagName(element)[0];
            }
            return element;
        }
    };

    helper.extend(Gallery.prototype, {
        helper: helper,
        options: {
            // Carousel mode (shortcut for the carouselOptions):
            carousel: false,
            // The number of elements to load around the current index:
            preloadRange: 2,
            // The document ID of the gallery widget:
            containerId: 'blueimp-gallery',
            // The class to add when the gallery is visible:
            displayClass: 'blueimp-gallery-display',
            // The class to add when the gallery controls are visible:
            controlsClass: 'blueimp-gallery-controls',
            // The class to add when the gallery only displays one element:
            singleClass: 'blueimp-gallery-single',
            // The slide class for loading elements:
            loadingClass: 'loading',
            // The slide class for elements that failed to load:
            errorClass: 'error',
            // The class for the "prev" control:
            prevClass: 'prev',
            // The class for the "next" control:
            nextClass: 'next',
            // The class for the "close" control:
            closeClass: 'close',
            // The class for the active indicator:
            activeClass: 'active',
            // The tag name of the title element:
            titleElement: 'h3',
            // The tag name of the indicator container:
            indicatorContainer: 'ol',
            // The gallery object property (or data attribute) with the
            // thumbnail URL, used as alternative to a thumbnail child element:
            thumbnailProperty: 'thumbnail',
            // Defines if the gallery indicators should display a thumbnail:
            thumbnailIndicators: true,
            // Defines if the gallery elements are cleared from the gallery modal,
            // or reused for the next gallery initialization:
            clearElements: false,
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
            // The threshold to define a touch move as swiping up or down:
            touchMoveThreshold: 50,
            // Hide the page scrollbars: 
            hidePageScrollbars: true,
            // Disable scrolling on the gallery container (Swipe option):
            disableScroll: true,
            // The starting index (Swipe option):
            startSlide: 0
        },
        carouselOptions: {
            hidePageScrollbars: false,
            toggleControlsOnReturn: false,
            enableKeyboardNavigation: false,
            closeOnEscape: false,
            closeOnSlideClick: false,
            closeOnSwipeUpOrDown: false,
            disableScroll: false,
            // Start the slideshow with the given
            // delay between slides (Swipe option):
            auto: 5000 // 5 seconds
        },
        prev: function () {
            return this.swipe.prev();
        },
        next: function () {
            return this.swipe.next();
        },
        getPos: function () {
            return this.swipe.getPos();
        },
        getNumSlides: function () {
            return this.slides.length;
        },
        slide: function (index, duration) {
            return this.swipe.slide(index, duration);
        },
        onslide: function (index) {
            // Handle Swipe's special case of two continuous slides:
            if (this.list.length === 2 && index > 1) {
                index -= 2;
            }
            this.loadElements(index);
            this.setTitle(index);
            this.setActiveIndicator(index);
        },
        setTitle: function (index) {
            var text = this.elements[index].title,
                titleElement = this.options.titleElement;
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
        createElement: function (obj, callback) {
            var img = this.imgPrototype.cloneNode(false),
                url = typeof obj === 'string' ? obj : obj.href;
            if (obj.title) {
                img.title = obj.title;
            }
            this.helper.addListener(img, 'load', callback);
            this.helper.addListener(img, 'error', callback);
            img.src = url;
            // Fix for IE7 not firing load events for cached images:
            if (img.complete) {
                window.setTimeout(function () {
                    callback({
                        type: 'load',
                        target: img
                    });
                }, 1);
            }
            return img;
        },
        createIndicator: function (obj) {
            var indicator = this.indicatorPrototype.cloneNode(false),
                thumbnailProperty = this.options.thumbnailProperty,
                thumbnailUrl,
                thumbnail;
            if (this.options.thumbnailIndicators) {
                if (obj.firstChild && obj.firstChild.src) {
                    thumbnail = obj.firstChild.cloneNode(false);
                } else if (thumbnailProperty) {
                    thumbnailUrl = obj[thumbnailProperty] ||
                        (obj.getAttribute && obj.getAttribute(
                            'data-' + thumbnailProperty
                        ));
                    if (thumbnailUrl) {
                        thumbnail = this.imgPrototype.cloneNode(false);
                        thumbnail.src = thumbnailUrl;
                    }
                }
                if (thumbnail) {
                    if (!thumbnail.title && obj.title) {
                        thumbnail.title = obj.title;
                    }
                    indicator.appendChild(thumbnail);
                }
            }
            return indicator;
        },
        loadElement: function (index) {
            if (!this.elements[index]) {
                if (this.slides[index].firstChild) {
                    this.elements[index] = this.slides[index].firstChild;
                } else {
                    this.helper.addClass(this.slides[index], this.options.loadingClass);
                    this.elements[index] = this.createElement(
                        this.list[index],
                        this.proxyListener
                    );
                    this.slides[index].appendChild(this.elements[index]);
                }
            }
        },
        loadElements: function (index) {
            if (this.loaded[index]) {
                return;
            }
            this.loaded[index] = true;
            var length = this.list.length,
                limit = Math.min(length, this.options.preloadRange * 2 + 1),
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
                if (j < 0) {
                    j = length + j;
                } else if (j >= length) {
                    j = j - length;
                }
                this.loadElement(j);
            }
        },
        initElements: function () {
            var clearElements,
                slideElement,
                indicator;
            this.slides = this.containerWrap.children;
            this.imgPrototype = document.createElement('img');
            this.elements = [];
            this.elements.length = this.list.length;
            clearElements = this.options.clearElements ||
                this.list.length !== this.slides.length;
            if (clearElements) {
                this.helper.empty(this.containerWrap);
                if (this.options.indicatorContainer) {
                    this.helper.empty(this.options.indicatorContainer);
                }
                this.slidePrototype = document.createElement('div');
                this.slides = [];
                if (this.options.indicatorContainer) {
                    this.indicatorPrototype = document.createElement('li');
                    this.indicators = [];
                }
                while (this.list.length > this.slides.length) {
                    slideElement = this.slidePrototype.cloneNode(false);
                    this.containerWrap.appendChild(slideElement);
                    this.slides.push(slideElement);
                    if (this.indicators) {
                        indicator = this.createIndicator(
                            this.list[this.indicators.length]
                        );
                        this.options.indicatorContainer.appendChild(indicator);
                        indicator.setAttribute('data-index', this.indicators.length);
                        this.indicators.push(indicator);
                    }
                }
            } else if (this.options.indicatorContainer) {
                this.indicators = this.options.indicatorContainer.children;
            }
            this.loaded = [];
            this.loaded.length = this.elements.length;
            this.onslide(this.options.startSlide);
        },
        getFullScreenElement: function () {
            return document.fullscreenElement ||
                document.webkitFullscreenElement ||
                document.mozFullScreenElement;
        },
        requestFullScreen: function () {
            if (!this.getFullScreenElement() && this.options.fullScreen) {
                if (this.container.requestFullscreen) {
                    this.container.requestFullscreen();
                } else if (this.container.webkitRequestFullscreen) {
                    this.container.webkitRequestFullscreen();
                } else if (this.container.mozRequestFullScreen) {
                    this.container.mozRequestFullScreen();
                }
            }
        },
        exitFullScreen: function () {
            if (this.getFullScreenElement() === this.container) {
                if (document.exitFullscreen) {
                    document.exitFullscreen();
                } else if (document.webkitCancelFullScreen) {
                    document.webkitCancelFullScreen();
                } else if (document.mozCancelFullScreen) {
                    document.mozCancelFullScreen();
                }
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
        oncomplete: function (event) {
            var target = event.target || event.srcElement,
                clonedSlide;
            if (!target || !target.parentNode) {
                return;
            }
            this.helper.removeClass(target.parentNode, this.options.loadingClass);
            // Handle Swipe's special case of two continuous slides:
            if (this.list.length === 2 && this.containerWrap.children.length > 2) {
                clonedSlide = this.containerWrap.children[
                    this.getNodeIndex(target.parentNode) + 2
                ];
                if (!clonedSlide.firstChild) {
                    clonedSlide.appendChild(target.cloneNode(true));
                }
                this.helper.removeClass(clonedSlide, this.options.loadingClass);
            }
            if (event.type === 'error') {
                this.helper.addClass(target.parentNode, this.options.errorClass);
                if (clonedSlide) {
                    this.helper.addClass(clonedSlide, this.options.errorClass);
                }
            }
            // Fix for IE7's lack of support for percentage max-height:
            if (target.clientHeight > this.container.clientHeight) {
                target.style.maxHeight = this.container.clientHeight;
            }
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
            var target = event.target || event.srcElement,
                parent = target.parentNode,
                helper = this.helper,
                isTarget = function (className) {
                    return helper.hasClass(target, className) ||
                        helper.hasClass(parent, className);
                };
            if (parent === this.containerWrap) {
                // Click on slide background
                helper.preventDefault(event);
                if (this.options.closeOnSlideClick) {
                    this.close();
                } else {
                    this.toggleControls();
                }
            } else if (parent.parentNode &&
                    parent.parentNode === this.containerWrap) {
                // Click on displayed element
                helper.preventDefault(event);
                this.toggleControls();
            } else if (parent === this.options.indicatorContainer) {
                // Click on indicator element
                helper.preventDefault(event);
                this.slide(this.getNodeIndex(target));
            } else if (parent.parentNode === this.options.indicatorContainer) {
                // Click on indicator child element
                helper.preventDefault(event);
                this.slide(this.getNodeIndex(parent));
            } else if (isTarget(this.options.prevClass)) {
                // Click on "prev" control
                helper.preventDefault(event);
                this.prev();
            } else if (isTarget(this.options.nextClass)) {
                // Click on "next" control
                helper.preventDefault(event);
                this.next();
            } else if (isTarget(this.options.closeClass)) {
                // Click on "close" control
                helper.preventDefault(event);
                this.close();
            }
        },
        ontouchstart: function (event) {
            this.touchStartPageY = event.touches.length === 1 &&
                event.touches[0].pageY;
        },
        ontouchmove: function (event) {
            if (this.touchStartPageY && event.touches.length === 1 &&
                    Math.abs(this.touchStartPageY - event.touches[0].pageY) >
                        this.options.touchMoveThreshold) {
                // Close on swipe up or swipe down:
                this.close();
            }
        },
        initEventListeners: function () {
            var that = this,
                helper = this.helper;
            this.proxyListener = function (event) {
                that['on' + event.type](event);
            };
            helper.addListener(document.body, 'keydown', this.proxyListener);
            helper.addListener(this.container, 'click', this.proxyListener);
            if (this.options.closeOnSwipeUpOrDown) {
                helper.addListener(this.container, 'touchstart', this.proxyListener);
                helper.addListener(this.container, 'touchmove', this.proxyListener);
            }
        },
        destroyEventListeners: function () {
            var helper = this.helper;
            helper.removeListener(document.body, 'keydown', this.proxyListener);
            helper.removeListener(this.container, 'click', this.proxyListener);
            if (this.options.closeOnSwipeUpOrDown) {
                helper.removeListener(this.container, 'touchstart', this.proxyListener);
                helper.removeListener(this.container, 'touchmove', this.proxyListener);
            }
        },
        close: function () {
            var helper = this.helper;
            this.exitFullScreen();
            this.container.style.display = 'none';
            helper.removeClass(this.container, this.options.displayClass);
            if (this.options.hidePageScrollbars) {
                document.body.style.overflow = this.bodyOverflowStyle;
            }
            this.destroyEventListeners();
            this.swipe.kill();
            if (this.options.clearElements) {
                helper.empty(this.containerWrap);
                if (this.options.indicatorContainer) {
                    helper.empty(this.options.indicatorContainer);
                }
            } else if (this.activeIndicator) {
                helper.removeClass(this.activeIndicator, this.options.activeClass);
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
