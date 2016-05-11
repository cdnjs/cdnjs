/*! 
 * Riloadr.js 1.3.0 (c) 2012 Tubal Martin - MIT license
 */
!function(definition) {
    if (typeof define === 'function' && define.amd) {
        // Register as an AMD module.
        define(definition);
    } else {
        // Browser globals
        window.Riloadr = definition();
    }
}(function(){
    
    'use strict';
    
    var ON = 'on'
      , TRUE = !0
      , FALSE = !1
      , DELAY = 250
      , NULL = null
      , LOAD = 'load'
      , CALL = 'call'
      , APPLY = 'apply'
      , ERROR = 'error'
      , EMPTYSTRING = ''
      , LENGTH = 'length'
      , SCROLL = 'scroll'
      , RESIZE = 'resize'
      , ONLOAD = ON+LOAD
      , ONERROR = ON+ERROR
      , RETRIES = 'retries'
      , COMPLETE = 'complete'
      , RILOADED = 'riloaded'
      , FALLBACK = 'fallback'
      , CLASSNAME = 'className'
      , PROTOTYPE = 'prototype'
      , CLIENTTOP = 'clientTop'
      , ONCOMPLETE = ON+COMPLETE
      , LOADIMAGES = 'loadImages'
      , READYSTATE = 'readyState'
      , ORIENTATION = 'orientation'
      , ATTACHEVENT = 'attachEvent'
      , CLIENTHEIGHT = 'clientHeight'
      , EVENTLISTENER = 'EventListener'
      , READYSTATECHANGE = 'readystatechange'
      , QUERYSELECTORALL = 'querySelectorAll'
      , ADDEVENTLISTENER = 'add'+EVENTLISTENER
      , ORIENTATIONCHANGE = ORIENTATION+'change'
      , GETBOUNDINGCLIENTRECT = 'getBoundingClientRect'
      
      , body
      , win = window
      , doc = win.document
      , docElm = doc.documentElement

        // Event model
      , w3c = ADDEVENTLISTENER in doc
      , pre = w3c ? EMPTYSTRING : ON
      , add = w3c ? ADDEVENTLISTENER : ATTACHEVENT
      , rem = w3c ? 'remove'+EVENTLISTENER : 'detachEvent'
      
        // REGEXPS
      , QUESTION_MARK_REGEX = /\?/
      , BREAKPOINT_NAME_REGEX = /{breakpoint-name}/gi
      
        // Feature support
      , selectorsApiSupported = QUERYSELECTORALL in doc
      , belowfoldSupported = GETBOUNDINGCLIENTRECT in docElm
      , orientationSupported = ORIENTATION in win && ON+ORIENTATIONCHANGE in win
      
        // Screen info 
      , viewportWidth
      , screenWidth = win.screen.width
      , devicePixelRatio = win.devicePixelRatio || 1

        // Bandwidth info (bool)
      , hasLowBandwidth = hasLowBandwidth()
      
        // Support for Opera Mini (executes Js on the server)
      , operaMini = Object[PROTOTYPE].toString[CALL](win.operamini) === '[object OperaMini]'
      
        // Other uninitialized vars
      , onDomReady, lastOrientation;
      
    
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
        
            // Defer load: disabled by default, if enabled falls back to "load". 
            // Possible values: 'belowfold' & 'load'.
          , deferMode = options.defer && (options.defer).toLowerCase() || FALSE

            // Setting foldDistance to n causes image to load n pixels before it is visible.
            // Falls back to 100px
          , foldDistance = options.foldDistance || 100
            
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
            
            // 'belowfold' defer mode?
          , belowfoldEnabled = deferMode === 'belowfold' && belowfoldSupported && !operaMini
          
            // Reduce by 5.5x the # of times loadImages is called when scrolling
          , scrollListener = belowfoldEnabled && throttle(function() {
                instance[LOADIMAGES]();
            }, DELAY)

            // Reduce to 1 the # of times loadImages is called when resizing 
          , resizeListener = belowfoldEnabled && debounce(function() {
                instance[LOADIMAGES]();
            }, DELAY)

            // Reduce to 1 the # of times loadImages is called when orientation changes.  
          , orientationchangeListener = belowfoldEnabled && debounce(function(){
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

            // Name of the breakpoint
          , breakpointName

            // Name of the fallback breakpoint
          , fallbackBreakpointName; 
        
        // PRIVATE METHODS
        // ---------------
        
        /*
         * Adds event listeners if defer mode is 'belowfold'
         * React on scroll, resize and orientationchange events
         */  
        function addBelowfoldListeners() {
            addEvent(win, SCROLL, scrollListener);        
            addEvent(win, RESIZE, resizeListener);

            // Is orientationchange event supported? If so, let's try to avoid false 
            // positives by checking if win.orientation has actually changed.
            if (orientationSupported) {
                lastOrientation = win[ORIENTATION];
                addEvent(win, ORIENTATIONCHANGE, orientationchangeListener);
            }    
        }


        /*
         * Removes event listeners if defer mode is 'belowfold'
         */  
        function removeBelowfoldListeners() {
            removeEvent(win, SCROLL, scrollListener);        
            removeEvent(win, RESIZE, resizeListener);

            // Is orientationchange event supported? If so, remove the listener 
            orientationSupported && removeEvent(win, ORIENTATIONCHANGE, orientationchangeListener);
        }


        /*
         * Loads an image.
         */
        function loadImage(img, idx) {   
            // Initial # of times we tried to reload this image
            img[RETRIES] = 0;

            // fallback image flag
            img[FALLBACK] = FALSE;
            
            // Image callbacks
            img[ONLOAD] = imageOnloadCallback;
            img[ONERROR] = imageOnerrorCallback;
                    
            // Load it    
            img.src = getImageSrc(img, base, breakpointName);
            
            // Reduce the images array for shorter loops
            images.splice(idx, 1);
        }
        
        
        /*
         * Image onload Callback
         */
        function imageOnloadCallback() {
            var img = this;
            img[ONLOAD] = img[ONERROR] = NULL;
            img[CLASSNAME] = img[CLASSNAME].replace(classNameRegexp, '$1$2');
            ONLOAD in options && options[ONLOAD][CALL](img);
            onCompleteCallback(); 
        }
        
        
        /*
         * Image onerror Callback
         * If user sets 'retries' > 0, Riloadr will try to load an image n times 
         * if an image fails to load.
         */
        function imageOnerrorCallback() {
            var img = this;  
            ONERROR in options && options[ONERROR][CALL](img); 
            if (img[RETRIES] < retries) {
                img[RETRIES]++;
                img.src = getImageSrc(img, base, (img[FALLBACK] ? fallbackBreakpointName : breakpointName), TRUE);
            } else if (FALLBACK in breakpoint && !img[FALLBACK]) {
                img[RETRIES] = 0;
                img[FALLBACK] = TRUE;
                img.src = getImageSrc(img, base, fallbackBreakpointName);
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
            imagesPendingLoad == 0 && ONCOMPLETE in options && options[ONCOMPLETE]();
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
            defer(function(imageList, current, i){
                // If initial collection is not done or 
                // new images have been added to the DOM, collect them.
                if (!images[LENGTH] || update === TRUE) {
                    // Add event listeners
                    belowfoldEnabled && addBelowfoldListeners();

                    imageList = selectorsApiSupported && 
                        root[QUERYSELECTORALL]('img.'+className) || 
                        root.getElementsByTagName('img');         
                    
                    // Create a static list
                    i = 0;
                    while (current = imageList[i]) {
                        // If we haven't processed this image yet and it is a responsive image
                        if (current && !current[RILOADED] &&
                            (selectorsApiSupported || 
                             current[CLASSNAME].indexOf(className) >= 0)) {
                            // Flag to avoid reprocessing
                            current[RILOADED] = TRUE;
                            // Add image to the list
                            images.push(current);
                            // Increment counter
                            imagesPendingLoad++;
                        }
                        i++;
                    }
                }
                
                // Load images
                if (images[LENGTH]) {
                    i = 0;
                    while (current = images[i]) {
                        if (current && 
                            (!belowfoldEnabled || belowfoldEnabled && 
                             !isBelowTheFold(current, foldDistance))) { 
                            loadImage(current, i);
                            i--;
                        }
                        i++;
                    }
                } 

                // No more images to load? remove event listeners
                belowfoldEnabled && !images[LENGTH] && removeBelowfoldListeners();

                // Clean up
                imageList = current = NULL;     
            });
        };
        
        // INITIALIZATION
        // --------------
        
        onDomReady(function(){
            body = doc.body;
            root = doc.getElementById(root) || body;
            viewportWidth = viewportWidth || getViewportWidthInCssPixels(); 
            breakpoint = getBreakpoint(breakpoints, viewportWidth, ignoreLowBandwidth);
            breakpointName = breakpoint.name;
            fallbackBreakpointName = breakpoint[FALLBACK]; 

            if (!deferMode || belowfoldEnabled) {
                // No defer mode: load all images now! OR 
                // 'belowfold' mode enabled: Load initial "above the fold" images
                instance[LOADIMAGES](); 
            } else {
                // defer mode = 'load': Load all images after window is loaded OR 
                // 'belowfold' not supported: 'load' fallback
                onWindowReady(instance[LOADIMAGES]);
            }
        });
    }
    
    // PUBLIC STATIC PROPERTIES
    // ------------------------
    
    // Versioning guidelines: http://semver.org/
    Riloadr.version = '1.3.0';
    
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
     * Returns the breakpoint data to apply.
     * Uses the viewport width to mimic CSS behavior.
     */
    function getBreakpoint(breakpoints, vWidth, ignoreLowBandwidth) {
        var _vWidth = vWidth
          , i = 0
          , breakpoint = {}
          , _breakpoint, minWidth, maxWidth, minDpr;  
        
        while (_breakpoint = breakpoints[i]) {
            minWidth = _breakpoint['minWidth'];
            maxWidth = _breakpoint['maxWidth'];
            minDpr   = _breakpoint['minDevicePixelRatio'];
            
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
          , widths = [docElm.clientWidth, docElm.offsetWidth, body.clientWidth]
          , screenWidthFallback = math.ceil(screenWidth / devicePixelRatio)
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
            if (!isNaN(screenWidthFallback)) {
                width = math.min(screenWidthFallback, width);
            }
        }
        
        return width || screenWidthFallback || 0;
    }
    
    
    /*
     * Returns the URL of an image
     * If reload is TRUE, a timestamp is added to avoid caching.
     */
    function getImageSrc(img, base, breakpointName, reload) {
        var src = (img.getAttribute('data-base') || base) +
            (img.getAttribute('data-src') || EMPTYSTRING);
        
        if (reload) {
            src += (QUESTION_MARK_REGEX.test(src) ? '&' : '?') + 
                'riloadrts='+(new Date).getTime();
        }

        return src.replace(BREAKPOINT_NAME_REGEX, breakpointName);    
    }
    
    
    /*
     * Tells if an image is visible to the user or not.
     * Thanks to jQuery 
     */
    function isBelowTheFold(img, foldDistance) {
        var clientTop = docElm[CLIENTTOP] || body[CLIENTTOP] || 0
          , clientHeight = doc.compatMode === 'CSS1Compat' && docElm[CLIENTHEIGHT] || 
                body && body[CLIENTHEIGHT] || docElm[CLIENTHEIGHT];
    
        return clientHeight <= img[GETBOUNDINGCLIENTRECT]().top - clientTop - foldDistance;                 
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
                timeoutId = setTimeout(trailingCall, remain);
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
            timeoutId = setTimeout(delayed, wait);

            if (isImmediate) {
                result = func[APPLY](thisArg, args);
            }
            return result;
        };
    }
    
    
    /*
     * Thanks to underscore.js and lodash.js
     * Defers a function, scheduling it to run after the current call stack has cleared.
     */
    function defer(func) {
        var args = Array[PROTOTYPE].slice[CALL](arguments, 1);
        setTimeout(function(){ return func[APPLY](NULL, args); }, 1);
    }
    
    
    /*
     * Error reporting function
     */
    function error(msg) {
        throw new Error( 'Riloadr: ' + msg );
    }
    

    /*
     * Simple event attachment/detachment
     */
    function addEvent(elem, type, fn) {
        elem[add](pre + type, fn, FALSE);
    }
    

    function removeEvent(elem, type, fn) {
        elem[rem](pre + type, fn, FALSE);
    }
    
    
    /*
     * onDomReady.js 1.0 (c) 2012 Tubal Martin - MIT license
     * https://github.com/tubalmartin/ondomready
     * Notes:
     * - Slightly adapted for Riloadr
     * - Compatible with async script loading
     */
    onDomReady = (function(){
        var DOMContentLoaded = 'DOMContentLoaded'
          , toplevel = FALSE
            
            // Callbacks pending execution until DOM is ready
          , callbacks = []
            
            // Is the DOM ready to be used? Set to true once it occurs.
          , isReady = FALSE
            
            // The document ready event handler
          , DOMContentLoadedHandler;
        
        // Handle when the DOM is ready
        function ready( fn ) {
            if ( !isReady ) {
                // Make sure body exists, at least, in case IE gets a little overzealous.
                if ( !doc.body ) {
                    return defer( ready );
                }
                
                // Remember that the DOM is ready
                isReady = TRUE;
        
                // Execute all callbacks
                while ( fn = callbacks.shift() ) {
                    defer( fn );
                }   
            }
        }
        
        // The DOM ready check for Internet Explorer
        function doScrollCheck() {
            if ( !isReady ) {
                try {
                    // If IE is used, use the trick by Diego Perini
                    // http://javascript.nwbox.com/IEContentLoaded/
                    docElm.doScroll('left');
                } catch(e) {
                    return defer( doScrollCheck );
                }
            
                // and execute any waiting functions
                ready();
            }
        }
        
        // Attach the listeners:
        // Catch cases where onDomReady is called after the
        // browser event has already occurred.
        if ( doc[READYSTATE] === COMPLETE ) {
            ready();
        } else {
            // W3C event model
            if ( doc[ADDEVENTLISTENER] ) {
                DOMContentLoadedHandler = function() {
                    removeEvent( doc, DOMContentLoaded, DOMContentLoadedHandler );
                    ready();
                };
                
                // Use the handy event callback
                addEvent( doc, DOMContentLoaded, DOMContentLoadedHandler );
        
            // IE event model
            } else if ( doc[ATTACHEVENT] ) {
                DOMContentLoadedHandler = function() {
                    if ( doc[READYSTATE] === COMPLETE ) {
                        removeEvent( doc, READYSTATECHANGE, DOMContentLoadedHandler );
                        ready();
                    }
                };
                
                // ensure firing before onload,
                // maybe late but safe also for iframes
                addEvent( doc, READYSTATECHANGE, DOMContentLoadedHandler );

                // If IE and not a frame
                // continually check to see if the document is ready
                try {
                    toplevel = win.frameElement == NULL;
                } catch(e) {}
        
                if ( docElm.doScroll && toplevel ) {
                    doScrollCheck();
                }
            }
            
            // A fallback to window.onload, that will always work
            addEvent( win, LOAD, ready );
        } 
        
        return function( fn ) { 
            // If DOM is ready, execute the function (async), otherwise wait
            isReady ? defer( fn ) : callbacks.push( fn );
        };
    }()); 
    
    
    /*
     * Wrapper to attach load event handlers to the window
     * Notes: 
     * - Compatible with async script loading
     */
    function onWindowReady(fn) {
        // Catch cases where onWindowReady is called after 
        // the browser event has already occurred.
        if (doc[READYSTATE] === COMPLETE) {
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