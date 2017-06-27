/*! 
 * Riloadr.js 1.1.0 (c) 2012 Tubal Martin - MIT license
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
      , RILOADED = 'riloaded'
      , CLASSNAME = 'className'
      , PROTOTYPE = 'prototype'
      , LOADIMAGES = 'loadImages'
      , ORIENTATION = 'orientation'
      , EVENTLISTENER = 'EventListener'
      , ADDEVENTLISTENER = 'add'+EVENTLISTENER
      , ORIENTATIONCHANGE = ORIENTATION+'change'
      
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
      , screenWidth = win.screen.width
      , devicePixelRatio = win.devicePixelRatio || 1
      
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
        
            // Defer load: disabled by default, if enabled falls back to "load". 
            // Possible values: 'belowfold' & 'load'.
          , deferMode = options.defer && (options.defer).toLowerCase() || FALSE

            // Setting foldDistance to n causes image to load n pixels before it is visible.
            // Falls back to 100px
          , foldDistance = options.foldDistance || 100
          
            // # of times to retry to load an image if initial loading failed.
            // Falls back to 0 (no retries)
          , retries = options[RETRIES] || 0
          
            // Id of a DOM node where Riloadr must look for 'responsive' images.
            // Falls back to body if not set.
          , root = options.root || NULL  
            
            // 'belowfold' defer mode?
          , belowfoldEnabled = deferMode === 'belowfold' && !operaMini
          
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
            
            // Size of images to use.
          , imgSize;
        
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
            // Flag to avoid reprocessing
            img[RILOADED] = TRUE;
            
            // Initial # of times we tried to reload this image
            img[RETRIES] = 0;
            
            // Callbacks
            img[ONLOAD] = imageOnloadCallback;
            img[ONERROR] = imageOnerrorCallback;
                    
            // Load it    
            img.src = getImageSrc(img, base, imgSize);
            
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
        }
        
        
        /*
         * Image onerror Callback
         * If user sets 'retries' > 0, Riloadr will try to load an image n times 
         * if an image fails to load.
         */
        function imageOnerrorCallback() {
            var img = this;
            if (retries > 0 && img[RETRIES] < retries) {
                img[RETRIES]++;
                img.src = getImageSrc(img, base, imgSize, TRUE);
            }    
            ONERROR in options && options[ONERROR][CALL](img); 
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
                // If initial collection is done and 
                // no new images have been added to the DOM, do nothing.
                if (!images[LENGTH] || update === TRUE) {
                    // Add event listeners
                    belowfoldEnabled && addBelowfoldListeners();

                    // Create a static list
                    $('img.'+className, root).each(function(idx, elm) {
                        // If we haven't processed this image yet and it is a responsive image
                        elm && !elm[RILOADED] && images.push(elm);
                    });
                }
                
                // Load images
                if (images[LENGTH]) {
                    i = 0;
                    while (current = images[i]) {
                        if (current && !current[RILOADED] && 
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
                current = NULL;     
            });
        };
        
        // INITIALIZATION
        // --------------
        
        onDomReady(function(){
            $win = $(win);
            body = doc.body;
            root = root && $('#'+root) || body;
            viewportWidth = viewportWidth || getViewportWidthInCssPixels(); 
            imgSize = getSizeOfImages(breakpoints, viewportWidth); 
            
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
    Riloadr.version = '1.1.0';
    
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
     * Returns the breakpoint name (image size to use).
     * Uses the viewport width to mimic CSS behavior.
     */
    function getSizeOfImages(breakpoints, vWidth) {
        var imgSize = EMPTYSTRING
          , _vWidth = vWidth
          , i = 0
          , breakpoint, name, minWidth, maxWidth, minDpr;  
        
        while (breakpoint = breakpoints[i]) {
            name     = breakpoint['name'];
            minWidth = breakpoint['minWidth'];
            maxWidth = breakpoint['maxWidth'];
            minDpr   = breakpoint['minDevicePixelRatio'];
            
            // Viewport width found
            if (vWidth > 0) {
                if (minWidth && maxWidth  && vWidth >= minWidth && vWidth <= maxWidth || 
                    minWidth && !maxWidth && vWidth >= minWidth || 
                    maxWidth && !minWidth && vWidth <= maxWidth) {
                    if (!minDpr || minDpr && devicePixelRatio >= minDpr) {
                        imgSize = name;
                    }
                }
            // Viewport width not found so let's find the smallest image size
            // (mobile first approach).  
            } else if (_vWidth <= 0 || minWidth < _vWidth || maxWidth < _vWidth) {
                _vWidth = minWidth || maxWidth || _vWidth;
                imgSize = name;
            }
            i++;
        }    
        
        // Cast to string
        return imgSize + EMPTYSTRING;
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
    function getImageSrc(img, base, imgSize, reload) {
        var src = (img.getAttribute('data-base') || base) +
            (img.getAttribute('data-src') || EMPTYSTRING);
        
        if (reload) {
            src += (QUESTION_MARK_REGEX.test(src) ? '&' : '?') + 
                'riloadrts='+(new Date).getTime();
        }

        return src.replace(BREAKPOINT_NAME_REGEX, imgSize);    
    } 
    
    
    /*
     * Tells if an image is visible to the user or not. 
     */
    function isBelowTheFold(img, foldDistance) {
        return $win.height() + $win.scrollTop() <= $(img).offset().top - foldDistance;                 
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
        if (doc['readyState'] === 'complete') {
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