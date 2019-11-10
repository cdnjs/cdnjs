/*!
 * Riloadr.js 1.5.1 (c) 2014 Tubal Martin - MIT license
 */
!function(definition) {
    if (typeof define === 'function' && define.amd) {
        // Register as an AMD module.
        define(['jquery'], definition);
    } else {
        // Browser globals
        window.Riloadr = definition(jQuery);
    }
}(function($) {

    'use strict';

    var ON = 'on'
      , TOP = 'top'
      , SRC = 'src'
      , TRUE = !0
      , BODY = 'body'
      , LEFT = 'left'
      , FALSE = !1
      , DELAY = 250
      , NULL = null
      , LOAD = 'load'
      , CALL = 'call'
      , APPLY = 'apply'
      , ERROR = 'error'
      , WIDTH = 'width'
      , EMPTYSTRING = ''
      , HEIGHT = 'height'
      , LENGTH = 'length'
      , SCROLL = 'scroll'
      , OFFSET = 'offset'
      , RESIZE = 'resize'
      , ONLOAD = ON+LOAD
      , ONERROR = ON+ERROR
      , ONABORT = ON+'abort'
      , RETRIES = 'retries'
      , MINWIDTH = 'minWidth'
      , MAXWIDTH = 'maxWidth'
      , COMPLETE = 'complete'
      , RILOADED = 'riloaded'
      , FALLBACK = 'fallback'
      , CLASSNAME = 'className'
      , IMGFORMAT = 'imgFormat'
      , PROTOTYPE = 'prototype'
      , SCROLLTOP = SCROLL+'Top'
      , ONCOMPLETE = ON+COMPLETE
      , SCROLLLEFT = SCROLL+'Left'
      , LOADIMAGES = LOAD+'Images'
      , ORIENTATION = 'orientation'
      , EVENTLISTENER = 'EventListener'
      , GETELEMENTBYID = 'getElementById'
      , ADDEVENTLISTENER = 'add'+EVENTLISTENER
      , ORIENTATIONCHANGE = ORIENTATION+'change'
      , MINDEVICEPIXELRATIO = 'minDevicePixelRatio'

      , $win, body
      , win = window
      , doc = win.document
      , docElm = doc.documentElement

        // Event model
      , w3c = ADDEVENTLISTENER in doc
      , pre = w3c ? EMPTYSTRING : ON
      , add = w3c ? ADDEVENTLISTENER : 'attachEvent'
      , rem = w3c ? 'remove'+EVENTLISTENER : 'detachEvent'

        // REGEXPS
      , QUESTION_MARK_REGEX = /\?/
      , BREAKPOINT_NAME_REGEX = /{breakpoint-name}/gi

        // Feature support
      , orientationSupported = ORIENTATION in win && ON+ORIENTATIONCHANGE in win

        // Screen info
      , viewportWidth
      , screenWidth = win.screen[WIDTH]
      , devicePixelRatio = win.devicePixelRatio || 1

        // Bandwidth info (bool)
      , hasLowBandwidth = hasLowBandwidth()

        // Support for Opera Mini (executes Js on the server)
      , operaMini = Object[PROTOTYPE].toString[CALL](win.operamini) === '[object OperaMini]'

        // Other uninitialized vars
      , lastOrientation;


    // Remove "no-js" class from <html> element, if it exists:
    docElm[CLASSNAME] = docElm[CLASSNAME].replace(/(^|\s)no-js(\s|$)/, '$1$2');


    /*
     * Constructor: Riloadr
     *    Creates a Riloadr object
     * Parameters:
     *    options - Object containing configuration options
     */
    function Riloadr(options) {

        // PRIVATE PROPERTIES
        // ------------------

        var instance = this

            // Base path
          , base = options.base || EMPTYSTRING

            // CSS-like breakpoints configuration (required)
          , breakpoints = options.breakpoints || error('"breakpoints" not defined.')

            // Group name: a name to identify images that must be processed by Riloadr.
            // Specified in the 'class' attribute of 'img' tags.
          , className = options.name || 'responsive'
          , classNameRegexp = new RegExp('(^|\\s)'+className+'(\\s|$)')

            // defer & foldDistance retro-compatibility definition
          , deferObj = options.defer && (typeof options.defer == 'string' ?
                {'mode': options.defer, 'threshold': options.foldDistance, 'overflownElemsIds': []} :
                options.defer)

            // Defer load: disabled by default. If enabled it falls back to "load".
            // Possible values: 'invisible', 'belowfold' (deprecated) & 'load'.
          , deferMode = deferObj && deferObj.mode.toLowerCase()

            // Setting threshold to n causes image to load n pixels before it is visible.
            // Falls back to 100px.
          , threshold = deferObj && deferObj.threshold || 100

            // Array of Overflown elements IDs that contain images only visible if user scrolls on that element
            // (elements with overflow:auto or overflow(-xy):scroll CSS properties)
          , overflownElemsIds = deferObj && deferObj.overflownElemsIds

            // Dynamic Art direction. Intended for desktop/large screens.
            // Mobile browsers cannot be resized although some of them fire the
            // resize event when certain actions occur but the viewport width
            // isn't likely to change so it's safe to assume this setting targets
            // desktop browsers only.
            // Possible values: 'wider', '*'
          , watchViewportMode = options.watchViewportWidth
          , watchViewportEnabled = !!watchViewportMode
          , watchViewportUp = watchViewportMode == 'wider'
          , watchViewportBoth = watchViewportMode == '*'

            // Set to true to deliver Hi-Res images despite connection speed.
            // Defaults to false, meaning connection speed is not ignored so
            // Hi-Res images will only be requested if connection speed is fast enough.
          , ignoreLowBandwidth = options.ignoreLowBandwidth || FALSE

            // # of times to retry to load an image if initial loading failed.
            // Falls back to 0 (no retries)
          , retries = options[RETRIES] || 0

            // Id of a DOM node where Riloadr must look for 'responsive' images.
            // Falls back to body if not set.
          , root = options.root || NULL

            // 'invisible' defer mode? (support 'belowfold' for retro compatibility)
          , deferInvisibleEnabled = (deferMode == 'invisible' || deferMode == 'belowfold') && !operaMini

            // Reduce by 5.5x the # of times loadImages is called when scrolling
          , scrollListener = throttle(function() {
                instance[LOADIMAGES]();
            }, DELAY)

            // Reduce to 1 the # of times loadImages is called when resizing
          , resizeListener = debounce(function() {
                // On resize update viewport dependant values if watchViewport mode is enabled
                watchViewportEnabled && setVwidthAndBreakpoints();

                // Update image list onresize if watchViewport mode is enabled
                instance[LOADIMAGES]( watchViewportEnabled );
            }, DELAY)

            // Reduce to 1 the # of times loadImages is called when orientation changes.
          , orientationchangeListener = debounce(function(){
                if (win[ORIENTATION] !== lastOrientation) {
                    lastOrientation = win[ORIENTATION];
                    instance[LOADIMAGES]();
                }
            }, DELAY)

            // Static list (array) of images.
          , images = []

            // # of images not completely loaded
          , imagesPendingLoad = 0

            // Breakpoint that applies
          , breakpoint

            // Previous breakpoint used before a resize event
          , prevBreakpoint

            // Fallback breakpoint
          , fallbackBreakpoint = {}

            // Widest breakpoint from those supplied
          , widestBreakpoint

            // Boolean flag
          , currentBreakpointIsWidest;


        // PRIVATE METHODS
        // ---------------


        /*
         * Sets viewportWidth, breakpoint, fallbackBreakpoint & currentBreakpointIsWidest vars
         */
        function setVwidthAndBreakpoints() {
            viewportWidth = getViewportWidthInCssPixels();
            breakpoint = getBreakpoint(breakpoints, viewportWidth, ignoreLowBandwidth);
            fallbackBreakpoint = breakpoint[FALLBACK] && getFallbackBreakpoint(breakpoints, breakpoint[FALLBACK]);
            widestBreakpoint = widestBreakpoint || watchViewportEnabled && getWidestBreakpoint(breakpoints);

            // If watch mode is enabled & is set to 'wider', test whether the current
            // breakpoint is equal to the widest breakpoint.
            currentBreakpointIsWidest = watchViewportUp && areBreakpointsEqual(breakpoint, widestBreakpoint);
        }


        /*
         * Registers event listeners
         * React on scroll, resize and orientationchange events
         */
        function addEventListeners() {
            var i = 0, current;

            // Event shared by defer & watchViewport modes
            if (deferInvisibleEnabled || watchViewportEnabled) {
                addEvent(win, RESIZE, resizeListener);
            }

            if (deferInvisibleEnabled) {
                addEvent(win, SCROLL, scrollListener);

                // Is orientationchange event supported? If so, let's try to avoid false
                // positives by checking if win.orientation has actually changed.
                if (orientationSupported) {
                    lastOrientation = win[ORIENTATION];
                    addEvent(win, ORIENTATIONCHANGE, orientationchangeListener);
                }

                // Scroll events on overflown elements
                if (overflownElemsIds) {
                    while (current = overflownElemsIds[i]) {
                        addEvent(doc[GETELEMENTBYID](current), SCROLL, scrollListener);
                        i++;
                    }
                }
            }
        }


        /*
         * Removes event listeners
         */
        function removeEventListeners() {
            var i = 0, current;

            // Only remove events if watchViewport mode is disabled/done
            if ( ! watchViewportEnabled ) {
                removeEvent(win, RESIZE, resizeListener);

                // Only remove the scroll/orientation events if defer 'invisible' mode
                // is enabled & watchViewport mode is disabled/done
                if (deferInvisibleEnabled) {
                    removeEvent(win, SCROLL, scrollListener);

                    // Scroll events on overflown elements
                    if (overflownElemsIds) {
                        while (current = overflownElemsIds[i]) {
                            removeEvent(doc[GETELEMENTBYID](current), SCROLL, scrollListener);
                            i++;
                        }
                    }

                    // Is orientationchange event supported? If so, remove the listener
                    orientationSupported && removeEvent(win, ORIENTATIONCHANGE, orientationchangeListener);
                }
            }
        }


        /*
         * Loads an image (DOM)
         */
        function loadImage(img, idx) {
            // Initial # of times we tried to reload this image
            img[RETRIES] = 0;

            // fallback image flag
            img[FALLBACK] = FALSE;

            // Register event listeners
            img[ONLOAD] = imageOnloadCallback;
            img[ONERROR] = img[ONABORT] = imageOnerrorCallback;

            // Load it
            // The first time the "src" attribute is assigned with JS, image events
            // will be fired cross-browser. However, if an error occurs and we
            // need to set again the "src" attribute using JS, image events might
            // not be fired in some browsers such as some versions of Google Chrome.
            // See imageOnerrorCallback for a workaround that works cross-browser.
            img[SRC] = getImageSrc(img, base, breakpoint);

            // Reduce the images array for shorter loops
            images.splice(idx, 1);
        }


        /*
         * Image onload Callback
         */
        function imageOnloadCallback() {
            var img = this, _img, dim;

            // Avoid false positives: Some browsers may fire the "onload" image
            // event after the "onerror" or "onabort" events have fired.

            // Modern browsers
            if ('naturalWidth' in img) {
                dim = img['naturalWidth'] + img['naturalHeight'];
            } else {
                // Older browsers (IE < 9)
                _img = new Image;
                _img[SRC] = img[SRC]; // Response already cached, nevermind.
                dim = _img[WIDTH] + _img[HEIGHT];
                _img = NULL;
            }

            // Did image load correctly?
            if (+dim > 0) {
                img[ONLOAD] = img[ONERROR] = img[ONABORT] = NULL;
                img[RILOADED] && (img[CLASSNAME] = img[CLASSNAME].replace(classNameRegexp, '$1$2'));
                deferInvisibleEnabled && (img.style.visibility = 'visible');
                ONLOAD in options && options[ONLOAD][CALL](img);
                onCompleteCallback();
            }
        }


        /*
         * Image onerror Callback
         * If user sets 'retries' > 0, Riloadr will try to load an image n times
         * if an image fails to load.
         */
        function imageOnerrorCallback() {
            var img = this
              , loadImage = function(src) {
                    var _img = new Image;
                    _img[ONLOAD] = function() {
                        img[SRC] = _img[SRC];
                        imageOnloadCallback[CALL](img);
                    };
                    _img[ONERROR] = img[ONABORT] = function() {
                        imageOnerrorCallback[CALL](img);
                    };
                    _img[SRC] = src;
                }
              , src;

            // Remove event listeners from DOM image since events might not be
            // fired anymore.
            img[ONLOAD] = img[ONERROR] = img[ONABORT] = NULL;

            ONERROR in options && options[ONERROR][CALL](img);

            if (img[RETRIES] < retries) {
                img[RETRIES]++;
                src = getImageSrc(img, base, (img[FALLBACK] ? fallbackBreakpoint : breakpoint), TRUE);
                loadImage(src);
            } else if (FALLBACK in breakpoint && !img[FALLBACK]) {
                img[RETRIES] = 0;
                img[FALLBACK] = TRUE;
                src = getImageSrc(img, base, fallbackBreakpoint);
                loadImage(src);
            } else {
                // If an image fails to load consider it loaded.
                onCompleteCallback();
            }
        }


        /*
         * oncomplete Callback
         * Executes when all images in a group are 100% (down)loaded.
         */
        function onCompleteCallback() {
            imagesPendingLoad--;

            if (imagesPendingLoad === 0) {
                // No more images to load? remove event listeners
                removeEventListeners();

                ONCOMPLETE in options && options[ONCOMPLETE]();
            }
        }

        // PUBLIC PRIVILEGED METHODS
        // -------------------------

        /*
         * Collects and loads all 'responsive' images from the DOM node specified.
         * If no DOM node is specified, it falls back to body.
         * Notes:
         * - Friendly with other scripts running.
         * - Must be publicly accesible but should not be called directly.
         */
        instance[LOADIMAGES] = function(update) {
            // Schedule it to run after the current call stack has cleared.
            defer(function(current, i){
                // If initial collection is not done or watch mode is forced or
                // new images have been added to the DOM, collect them.
                if (!images[LENGTH] || update === TRUE) {

                    // Add event listeners on update
                    update && addEventListeners();

                    // Create a static list
                    $('img.'+className, root).each(function(idx, current) {
                        // If we haven't processed this image yet and it is a responsive image
                        if (current && !current[RILOADED]) {
                            // Push image if:
                            // - Watch mode is disabled/done
                            // - Watch mode is enabled and new images have been added to the DOM or
                            // - Watch mode is enabled and it's the first breakpoint processed or
                            // - Watch mode 'wider' is enabled and current breakpoint is wider than previous one or
                            // - Watch mode '*' is enabled and current breakpoint differs from previous one
                            if (! watchViewportEnabled ||
                                watchViewportEnabled && (
                                    update === TRUE ||
                                    ! prevBreakpoint || (
                                    watchViewportUp && isBreakpointWider(breakpoint, prevBreakpoint) ||
                                    watchViewportBoth && ! areBreakpointsEqual(breakpoint, prevBreakpoint)
                                ))) {
                                // Add image to the list
                                images.push(current);
                                // Increment counter
                                imagesPendingLoad++;
                            }

                            // Flag images as RILOADED if watch mode is disabled/done or
                            // if watch mode is 'wider' & current breakpoint matches the widest breakpoint
                            if ( ! watchViewportEnabled || currentBreakpointIsWidest) {
                                // Flag to avoid reprocessing
                                current[RILOADED] = TRUE;
                            }
                        }
                    });

                    if (watchViewportEnabled) {
                        // If watch mode is 'wider' & current breakpoint matches the widest breakpoint
                        // disable watch mode.
                        if (currentBreakpointIsWidest) {
                            watchViewportEnabled = FALSE;
                        }

                        // Remember the breakpoint used
                        prevBreakpoint = breakpoint;
                    }
                }

                // Load images
                if (images[LENGTH]) {
                    i = 0;
                    while (current = images[i]) {
                        if (current &&
                            (!deferInvisibleEnabled || (deferInvisibleEnabled && isInViewport(current, threshold)))
                        ) {
                            loadImage(current, i);
                            i--;
                        }
                        i++;
                    }
                }

                // Clean up
                current = NULL;
            });
        };

        // INITIALIZATION
        // --------------

        onDomReady(function(){
            $win = $(win);
            body = doc[BODY];
            root = root && $('#'+root) || body;
            setVwidthAndBreakpoints();

            // Add event listeners
            addEventListeners();

            if (!deferMode || deferInvisibleEnabled) {
                // No defer mode: load all images now! OR
                // 'belowfold'-'invisible' mode enabled: Load initial "visible" images
                instance[LOADIMAGES]();
            } else {
                // defer mode = 'load': Load all images after window is loaded OR
                // 'belowfold'-'invisible' not supported: 'load' fallback
                onWindowReady(instance[LOADIMAGES]);
            }
        });
    }

    // PUBLIC STATIC PROPERTIES
    // ------------------------

    // Versioning guidelines: http://semver.org/
    Riloadr.version = '1.5.1';

    // PUBLIC METHODS (SHARED)
    // ------------------------

    /*
     * The "riload" method allows you to load responsive images inserted into the
     * document after the DOM is ready or after window is loaded (useful for AJAX
     * content & markup created dynamically with javascript).
     * Call this method after new markup is inserted into the document.
     */
    Riloadr[PROTOTYPE].riload = function() {
        this[LOADIMAGES](TRUE);
    };

    // HELPER FUNCTIONS
    // ----------------

    /*
     * Returns the breakpoint to apply.
     * Uses the viewport width to mimic CSS behavior.
     */
    function getBreakpoint(breakpoints, vWidth, ignoreLowBandwidth) {
        var _vWidth = vWidth
          , i = 0
          , breakpoint = {}
          , _breakpoint, minWidth, maxWidth, minDpr;

        while (_breakpoint = breakpoints[i]) {
            minWidth = _breakpoint[MINWIDTH];
            maxWidth = _breakpoint[MAXWIDTH];
            minDpr   = _breakpoint[MINDEVICEPIXELRATIO];

            // Viewport width found
            if (vWidth > 0) {
                if (minWidth && maxWidth  && vWidth >= minWidth && vWidth <= maxWidth ||
                    minWidth && !maxWidth && vWidth >= minWidth ||
                    maxWidth && !minWidth && vWidth <= maxWidth) {
                    if (!minDpr || minDpr && devicePixelRatio >= minDpr &&
                        (ignoreLowBandwidth || !ignoreLowBandwidth && !hasLowBandwidth)) {
                        breakpoint = _breakpoint;
                    }
                }
            // Viewport width not found so let's find the smallest image size
            // (mobile first approach).
            } else if (_vWidth <= 0 || minWidth < _vWidth || maxWidth < _vWidth) {
                _vWidth = minWidth || maxWidth || _vWidth;
                breakpoint = _breakpoint;
            }
            i++;
        }

        return breakpoint;
    }


    /*
     * Returns the widest breakpoint from those supplied.
     */
    function getWidestBreakpoint(breakpoints) {
        var i = 0, widestBreakpoint = {}, current;

        while (current = breakpoints[i]) {
            isBreakpointWider(current, widestBreakpoint) && (widestBreakpoint = current);
            i++;
        }

        return widestBreakpoint;
    }


    /*
     * Returns the fallback breakpoint to apply.
     */
    function getFallbackBreakpoint(breakpoints, fallbackBreakpointName) {
        var i = 0, current;

        while (current = breakpoints[i]) {
            if (current.name == fallbackBreakpointName) {
                return current;
            }
            i++;
        }
    }


    /*
     * Tests if two breakpoints are equal
     */
    function areBreakpointsEqual(a, b) {
        return a.name === b.name &&
               a[MINWIDTH] === b[MINWIDTH] &&
               a[MAXWIDTH] === b[MAXWIDTH] &&
               a[MINDEVICEPIXELRATIO] === b[MINDEVICEPIXELRATIO] &&
               a[IMGFORMAT] === b[IMGFORMAT];
    }


    /*
     * Tests if breakpoint A is 'wider' than breakpoint B
     */
    function isBreakpointWider(a, b) {
        var aMinDpr = +a[MINDEVICEPIXELRATIO] || 1
          , bMinDpr = +b[MINDEVICEPIXELRATIO] || 1;

        a = Math.max(+a[MINWIDTH] || 0, +a[MAXWIDTH] || 0) * (devicePixelRatio >= aMinDpr ? aMinDpr : 1);
        b = Math.max(+b[MINWIDTH] || 0, +b[MAXWIDTH] || 0) * (devicePixelRatio >= bMinDpr ? bMinDpr : 1);

        return a > b;
    }


    /*
     * Returns the layout viewport width in CSS pixels.
     * To achieve a precise result the following meta must be included at least:
     * <meta name="viewport" content="width=device-width">
     * See:
     * - http://www.quirksmode.org/mobile/viewports2.html
     * - http://www.quirksmode.org/mobile/tableViewport.html
     * - https://github.com/h5bp/mobile-boilerplate/wiki/The-Markup
     */
    function getViewportWidthInCssPixels() {
        var math = Math
          , widths = [win.innerWidth, docElm.clientWidth, docElm.offsetWidth, body.clientWidth]
          , l = widths[LENGTH]
          , i = 0
          , width;

        for (; i < l; i++) {
            // If not a number remove it
            if (isNaN(widths[i])) {
                widths.splice(i, 1);
                i--;
            }
        }

        if (widths[LENGTH]) {
            width = math.max[APPLY](math, widths);

            // Catch cases where the viewport is wider than the screen
            if (!isNaN(screenWidth)) {
                width = math.min(screenWidth, width);
            }
        }

        return width || screenWidth || 0;
    }


    /*
     * Returns the URL of an image
     * If reload is TRUE, a timestamp is added to avoid caching.
     */
    function getImageSrc(img, base, breakpoint, reload) {
        var src = (img.getAttribute('data-base') || base) +
            (img.getAttribute('data-src') || img.getAttribute('data-src-' + breakpoint.name) || EMPTYSTRING);

        if (breakpoint[IMGFORMAT]) {
            src = src.split('.');
            src.pop();
            src = src.join('.') + '.' + breakpoint[IMGFORMAT];
        }

        if (reload) {
            src += (QUESTION_MARK_REGEX.test(src) ? '&' : '?') +
                'riloadrts='+(new Date).getTime();
        }

        return src.replace(BREAKPOINT_NAME_REGEX, breakpoint.name);
    }


    /*
     * Tells whether user's device connection is slow or not.
     * Fast connection assumed if not detected or offline.
     * Based on the Network Api:
     * - MDN: https://developer.mozilla.org/en/DOM/window.navigator.connection
     * - W3C Working draft: http://www.w3.org/TR/netinfo-api/
     * - W3C Editor's draft: http://dvcs.w3.org/hg/dap/raw-file/tip/network-api/Overview.html
     * List of device bandwidths: http://en.wikipedia.org/wiki/List_of_device_bandwidths#Mobile_telephone_interfaces
     */
    function hasLowBandwidth() {
        var navigator = win.navigator
          , connection = navigator.connection || navigator.mozConnection ||
                navigator.webkitConnection || navigator.oConnection ||
                navigator.msConnection || {}
          , type = connection.type || 'unknown' // polyfill
          , bandwidth = +connection.bandwidth || Infinity; // polyfill

        // 2G, 3G and KB/s < 100 are considered slow connections.
        // Offline mode is considered fast connection (bandwidth = 0 or type = none).
        // According to the W3C, 'bandwidth' is reported in MB/s.
        // 0.09765625 MB/s = 100 KB/s = 800 kbps. Let's round up to 0.1 MB/s.
        return bandwidth > 0 && bandwidth < 0.1 || /^[23]g|3|4$/.test(type + EMPTYSTRING);
    }


    /*
     * Tells if an image is in the viewport area or not (visible to the user).
     */
    function isInViewport(img, threshold) {
        var $img = $(img);
        return !isBelowTheFold($img, threshold) && !isAboveTheTop($img, threshold) &&
            !isRightOfFold($img, threshold) && !isLeftOfBegin($img, threshold);
    }


    function isBelowTheFold($img, threshold) {
        return $win[HEIGHT]() + $win[SCROLLTOP]() <= $img[OFFSET]()[TOP] - threshold;
    }


    function isAboveTheTop($img, threshold) {
        return $win[SCROLLTOP]() >= $img[OFFSET]()[TOP] + threshold + $img[HEIGHT]();
    }


    function isRightOfFold($img, threshold) {
        return $win[WIDTH]() + $win[SCROLLLEFT]() <= $img[OFFSET]()[LEFT] - threshold;
    }


    function isLeftOfBegin($img, threshold) {
        return $win[SCROLLLEFT]() >= $img[OFFSET]()[LEFT] + threshold + $img[WIDTH]();
    }


    /*
     * Thanks to underscore.js and lodash.js
     * Returns a function, that, when invoked, will only be triggered at most once
     * during a given window of time.
     */
    function throttle(func, wait) {
        var args
          , result
          , thisArg
          , timeoutId
          , lastCalled = 0;

        function trailingCall() {
            lastCalled = new Date;
            timeoutId = NULL;
            func[APPLY](thisArg, args);
        }

        return function() {
            var now = new Date
              , remain = wait - (now - lastCalled);

            args = arguments;
            thisArg = this;

            if (remain <= 0) {
                lastCalled = now;
                result = func[APPLY](thisArg, args);
            } else if (!timeoutId) {
                timeoutId = delay(trailingCall, remain);
            }
            return result;
        };
    }


    /*
     * Thanks to underscore.js and lodash.js
     * Returns a function, that, as long as it continues to be invoked, will not
     * be triggered. The function will be called after it stops being called for
     * N milliseconds. If `immediate` is passed, trigger the function on the
     * leading edge, instead of the trailing.
     */
    function debounce(func, wait, immediate) {
        var args
          , result
          , thisArg
          , timeoutId;

        function delayed() {
            timeoutId = NULL;
            if (!immediate) {
                func[APPLY](thisArg, args);
            }
        }

        return function() {
            var isImmediate = immediate && !timeoutId;
            args = arguments;
            thisArg = this;

            clearTimeout(timeoutId);
            timeoutId = delay(delayed, wait);

            if (isImmediate) {
                result = func[APPLY](thisArg, args);
            }
            return result;
        };
    }


    /*
     * Thanks to underscore.js and lodash.js
     * Delays a function for the given number of milliseconds, and then calls
     * it with the arguments supplied.
     */
    function delay(func, wait) {
        var args = Array[PROTOTYPE].slice[CALL](arguments, 2);
        return win.setTimeout(function(){ return func[APPLY](NULL, args); }, wait);
    }


    /*
     * Thanks to underscore.js and lodash.js
     * Defers a function, scheduling it to run after the current call stack has cleared.
     */
    function defer(func) {
        return delay[APPLY](NULL, [func, 1].concat(Array[PROTOTYPE].slice[CALL](arguments, 1)));
    }


    /*
     * Error reporting function
     */
    function error(msg) {
        throw new Error( 'Riloadr: ' + msg );
    }


    /*
     * Simple event attachment/detachment
     * Since we attach listeners to the window scroll, resize and
     * orientationchange events, native functions are 6x faster than jQuery's
     * event handling system.
     */
    function addEvent(elem, type, fn) {
        elem[add](pre + type, fn, FALSE);
    }


    function removeEvent(elem, type, fn) {
        elem[rem](pre + type, fn, FALSE);
    }


    /*
     * Wrapper to DOMContentLoaded event
     */
    function onDomReady(fn) {
        $(fn);
    }


    /*
     * Wrapper to attach load event handlers to the window
     * Notes:
     * - Compatible with async script loading
     */
    function onWindowReady(fn) {
        // Catch cases where onWindowReady is called after
        // the browser event has already occurred.
        if (doc['readyState'] === COMPLETE) {
            fn();
        } else {
            var _fn = function() {
                removeEvent(win, LOAD, _fn);
                fn();
            };
            addEvent(win, LOAD, _fn);
        }
    }


    return Riloadr;

});