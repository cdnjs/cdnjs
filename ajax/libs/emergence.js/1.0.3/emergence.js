/*! emergence.js v1.0.3 | (c) 2016 @xtianmiller | https://github.com/xtianmiller/emergence.js */
(function(root, factory) {

    // AMD
    if (typeof define === 'function' && define.amd) {
        define(function() {
            return factory(root);
        });
    }

    // Node.js or CommonJS
    else if (typeof exports === 'object') {
        module.exports = factory;
    }

    // Browser globals
    else {
        root.emergence = factory(root);
    }

})(this, function(root) {

    'use strict';

    var emergence = {};
    var poll, container, throttle, reset, handheld, elemCushion, offsetTop, offsetRight, offsetBottom, offsetLeft;
    var callback = function() {};

    // Browser feature test to include any browser APIs required for >= IE8
    // @see http://webfieldmanual.com/guides/cutting-the-mustard.html
    // @return {bool} true if supported, otherwise false
    var cutsTheMustard = function() {
        return ('querySelectorAll' in document) ? true : false;
    };

    // Checks if user is on a handheld
    // @return {bool} true if it's a handheld, otherwise false
    var isHandheld = function() {
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    };

    // Get the offset of a DOMElement
    // @param {DOMElement} elem the container or element
    // @return {int} the top, left, width and height values in pixels
    var getElemOffset = function(elem) {

        // Default top and left position of container or element
        var topPos = 0;
        var leftPos = 0;

        // Width and height of container or element
        var w = elem.offsetWidth;
        var h = elem.offsetHeight;

        // Get total distance of container or element to document's top and left origin
        do {
            if (!isNaN(elem.offsetTop)) {
                topPos += elem.offsetTop;
            }
            if (!isNaN(elem.offsetLeft)) {
                leftPos += elem.offsetLeft;
            }
        } while ((elem = elem.offsetParent) !== null);

        return {
            top: topPos,
            left: leftPos,
            width: w,
            height: h
        };
    };

    // Get the custom container size if provided, otherwise the documents
    // @return {int} the width and height in pixels
    var getContainerSize = function(container) {
        var w, h;

        if (container) {
            w = container.clientWidth;
            h = container.clientHeight;
        } else {
            w = root.innerWidth || document.documentElement.clientWidth;
            h = root.innerHeight || document.documentElement.clientHeight;
        }
        return {
            width: w,
            height: h
        };
    };

    // Get the X and Y scroll positions of the container, otherwise the documents
    // @return {int} the X and Y values in pixels
    var getContainerScroll = function(container) {
        if (container) {
            return {
                x: container.scrollLeft + getElemOffset(container).left,
                y: container.scrollTop + getElemOffset(container).top
            };
        } else {
            return {
                x: window.pageXOffset,
                y: window.pageYOffset
            };
        }
    };

    // Check if element's closest parent is hidden (display: none)
    // @param {DOMElement} elem the element
    // @return {bool} true if hidden, false otherwise
    var isHidden = function(elem) {
        return (elem.offsetParent === null);
    };

    // Check if element has visible
    // @param {DOMElement} elem the element
    // @return {bool} true if visible, false otherwise
    var isVisible = function(elem) {

        // Don't continue if element's closest parent is hidden
        if (isHidden(elem)) {
            return false;
        }

        // Get info from other functions
        var elemOffset = getElemOffset(elem);
        var containerSize = getContainerSize();
        var containerScroll = getContainerScroll();

        // Determine element size
        var elemWidth = elemOffset.width;
        var elemHeight = elemOffset.height;

        // Determine element position from rect points
        var elemTop = elemOffset.top;
        var elemLeft = elemOffset.left;
        var elemBottom = elemTop + elemHeight;
        var elemRight = elemLeft + elemWidth;

        // Determine boundaries of container and element
        // @return {bool} true if element is found within boundaries, false otherwise
        var checkBoundaries = function() {

            // Determine element boundaries including custom cushion
            var eTop = elemTop + elemHeight * elemCushion;
            var eRight = elemRight - elemWidth * elemCushion;
            var eBottom = elemBottom - elemHeight * elemCushion;
            var eLeft = elemLeft + elemWidth * elemCushion;

            // Determine container boundaries including custom offset
            var cTop = containerScroll.y + offsetTop;
            var cRight = containerScroll.x - offsetRight + containerSize.width;
            var cBottom = containerScroll.y - offsetBottom + containerSize.height;
            var cLeft = containerScroll.x + offsetLeft;

            return (eTop < cBottom) && (eBottom > cTop) && (eLeft > cLeft) && (eRight < cRight);
        };

        return checkBoundaries();
    };

    // Throttling for load, scroll and resize events
    var useThrottle = function() {
        if (!!poll) {
            return;
        }
        clearTimeout(poll);
        poll = setTimeout(function() {
            emergence.render();
            poll = null;
        }, throttle);
    };

    // Initialize emergence with options, do feature test and create event listeners
    // @param {Object} options Custom settings
    emergence.init = function(options) {
        options = options || {};
        var optionInt = function (option, fallback) {
            return parseInt(option || fallback, 10);
        };
        var optionFloat = function (option, fallback) {
            return parseFloat(option || fallback);
        };
        container = options.container || null;
        throttle = optionInt(options.throttle, 250);
        reset = !options.reset;
        handheld = !options.handheld;
        elemCushion = optionFloat(options.elemCushion, 0.15);
        offsetTop = optionInt(options.offsetTop, 0);
        offsetRight = optionInt(options.offsetRight, 0);
        offsetBottom = optionInt(options.offsetBottom, 0);
        offsetLeft = optionInt(options.offsetLeft, 0);
        callback = options.callback || callback;

        // If browser doesn't pass feature test, provide console.log
        if (!cutsTheMustard()) {
            console.log('emergence.js is not supported in this browser.');
        }
        // Else if this is a handheld device AND handheld option is true, or not a handheld device
        else if (isHandheld() && handheld || !isHandheld()) {

            // Add ".emergence" class to document for conditional CSS
            document.documentElement.className += ' emergence';

            // Run object loop the first time
            emergence.render();

            // Listeners for scroll, resize, and load events
            // Invoke useThrottle() to throttle the events
            if (document.addEventListener) {
                root.addEventListener('scroll', useThrottle, false);
                root.addEventListener('resize', useThrottle, false);
                root.addEventListener('load', useThrottle, false);
            } else {
                root.attachEvent('onscroll', useThrottle);
                root.attachEvent('onresize', useThrottle);
                root.attachEvent('onload', useThrottle);
            }
        }
    };

    // Loop through objects with data-emergence attribute
    // Invoke isVisible() to determine if element has visible
    emergence.render = function() {
        var nodes = document.querySelectorAll('[data-emergence]');
        var length = nodes.length;
        var elem;

        for (var i = 0; i < length; i++) {
            elem = nodes[i];

            // If Element has visible
            // @param {Object} elem The element with data attribute
            if (isVisible(elem)) {

                // If reset option is false, remove the attribute from element
                // to prevent it from going hidden again
                if (!reset) {
                    elem.removeAttribute('data-emergence');
                }

                // Change the state of the attribute to "visible"
                elem.setAttribute('data-emergence', 'visible');

                // Providing a callback for when element has visible
                callback(elem, 'visible');
            }
            // Else if reset option is true
            else if (reset) {

                // Change the state of the attribute to "hidden"
                elem.setAttribute('data-emergence', 'hidden');

                // Providing a callback for when element has reset
                callback(elem, 'reset');
            }
        }

        // If no element with data attribute exists, disengage
        if (!length) {
            emergence.disengage();
        }
    };

    emergence.disengage = function() {

        // Provide console.log
        console.log('emergence.js found no elements with required data attribute.');

        // Remove and detach event listeners
        if (document.removeEventListener) {
            root.removeEventListener('scroll', useThrottle);
            root.removeEventListener('resize', useThrottle);
        } 
        else {
            root.detachEvent('onscroll', useThrottle);
            root.detachEvent('onresize', useThrottle);
        }

        // Clear timeout from throttle
        clearTimeout(poll);
    };

    return emergence;

});
