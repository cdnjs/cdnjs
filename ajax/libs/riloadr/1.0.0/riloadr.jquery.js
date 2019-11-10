/*! 
 * Riloadr.js 1.0.0 (c) 2012 Tubal Martin - MIT license
 */
!function(definition) {
    if (typeof define === 'function' && define.amd) {
        // Register as an AMD module.
        define(['jquery'], definition);
    } else {
        // Browser globals
        window.Riloadr = definition();
    }
}(function(){
    
    'use strict';
    
    var ON = 'on'
      , TRUE = !0
      , FALSE = !1
      , NULL = null
      , LOAD = 'load'
      , ERROR = 'error'
      , EMPTYSTRING = ''
      , LENGTH = 'length'
      , JQUERY = 'jQuery'
      , SCROLL = 'scroll'
      , RESIZE = 'resize'
      , ONLOAD = ON+LOAD
      , ONERROR = ON+ERROR
      , RETRIES = 'retries'
      , RILOADED = 'riloaded'
      , CLASSNAME = 'className'
      , ORIENTATION = 'orientation'
      , EVENTLISTENER = 'EventListener'
      , ORIENTATIONCHANGE = ORIENTATION+'change'
      
      , win = window
      , $win // jQuery wrapped window
      , doc = win.document
      , docElm = doc.documentElement
      , body // Initialized when DOM is ready
      
      , $ = JQUERY in win && win[JQUERY] || error(JQUERY+' not found.')
      
      // REGEXPS
      , QUESTION_MARK_REGEX = /\?/
      , BREAKPOINT_NAME_REGEX = /{breakpoint-name}/gi
      
      // Feature support
      , orientationSupported = ORIENTATION in win && ON+ORIENTATIONCHANGE in win
      
      // Screen info 
      , screenWidth = win.screen.width
      , devicePixelRatio = win.devicePixelRatio || 1
      , viewportWidth // Initialized when DOM is ready
      
      // Topics/subscriptions map (Pub/Sub)
      , topics = {}
      
      // Support for Opera Mini (executes Js on the server)
      , operaMini = Object.prototype.toString.call(win.operamini) === '[object OperaMini]'
      
      // Other uninitialized vars
      , addEvent, removeEvent
      , lastOrientation
      , scrollEventRegistered, resizeEventRegistered, orientationEventRegistered;
      
    
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
            
           // CSS-like breakpoints configuration (required)
          , breakpoints = options.breakpoints || error('"breakpoints" not defined.')  
            
            // Name to identify images that must be processed by Riloadr.
            // Specified in the 'class' attribute of 'img' tags.
          , className = options.name || 'responsive'
          , classNameRegexp = new RegExp('(^|\\s)'+className+'(\\s|$)')
          
            // Base path
          , base = options.base || EMPTYSTRING
        
            // Defer load: disabled by default, if enabled falls back to "load". 
            // Possible values: 'belowfold' & 'load'.
          , deferMode = (options.defer + EMPTYSTRING).toLowerCase() || FALSE
            
            // 'belowfold' defer mode?
          , belowfoldEnabled = deferMode === 'belowfold' && !operaMini
            
            // Setting foldDistance to n causes image to load n pixels before it is visible.
            // Falls back to 100px
          , foldDistance = +options.foldDistance || 100
          
            // # of times to retry to load an image if initial loading failed.
            // Falls back to 0 (no retries)
          , retries = +options[RETRIES] || 0
          
            // Id of a DOM node where Riloadr must look for 'responsive' images.
            // Falls back to body if not set.
          , parentNode
            
            // Size of images to use.
          , imgSize
            
            // Static list (array) of images.
          , images;
        
        // PRIVATE METHODS
        // ---------------
        
        function init() {
            if (deferMode === 'belowfold') {
                // React on scroll, resize and orientationchange events
                // Attach event listeners just once & notify Riloadr instances of events.
                if (belowfoldEnabled) {
                    // Reduce by 5.5x the # of times loadImages is called when scrolling
                    if (!scrollEventRegistered) {
                        scrollEventRegistered = TRUE;
                        addEvent(win, SCROLL, throttle(function() {
                            publish(SCROLL);
                        }, 250));
                    }
                    subscribe(SCROLL, instance.loadImages);
                    
                    // Reduce to 1 the # of times loadImages is called when resizing
                    if (!resizeEventRegistered) {
                        resizeEventRegistered = TRUE;
                        addEvent(win, RESIZE, debounce(function() {
                            publish(RESIZE);
                        }, 250));
                    }
                    subscribe(RESIZE, instance.loadImages);
                    
                    // Is orientationchange event supported? If so, let's try to avoid false 
                    // positives by checking if win.orientation has actually changed.
                    // Reduce to 1 the # of times loadImages is called when orientation changes.
                    if (orientationSupported) {
                        if (!orientationEventRegistered) {
                            orientationEventRegistered = TRUE;
                            lastOrientation = win[ORIENTATION];
                            addEvent(win, ORIENTATIONCHANGE, debounce(function(){
                                if (win[ORIENTATION] !== lastOrientation) {
                                    lastOrientation = win[ORIENTATION];
                                    publish(ORIENTATIONCHANGE);
                                }
                            }, 250));
                        }
                        subscribe(ORIENTATIONCHANGE, instance.loadImages);
                    }
                 
                    // Load initial "above the fold" images
                    instance.loadImages();
                
                // 'load' Fallback   
                } else {
                    // Load all images after window is loaded if the browser 
                    // does not support the 'getBoundingClientRect' method or 
                    // if it's Opera Mini.
                    onWindowReady(instance.loadImages);
                }
                
            } else if (deferMode === LOAD) {
                // Load all images after win is loaded
                onWindowReady(instance.loadImages);
                
            } else {
                // No defer mode, load all images now!  
                instance.loadImages();
            }
        }
        
        
        /*
         * Collects all 'responsive' images from the DOM node specified.
         * If no DOM node is specified, it falls back to body.
         */
        function getImages(update) {
            // If initial collection is done and 
            // no new images have been added to the DOM, do nothing.
            if (!images || update === TRUE) {
                images = images || [];
                
                // Create a static list
                $('img.'+className, parentNode).each(function(idx, elm) {
                    // If we haven't processed this image yet and it is a responsive image
                    elm && !elm[RILOADED] && images.push(elm);
                });
            }
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
            img.src = getImageSrc(img);
            
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
            ONLOAD in options && options[ONLOAD].call(img); 
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
                img.src = getImageSrc(img, TRUE);
            }    
            ONERROR in options && options[ONERROR].call(img); 
        }
        
        
        /*
         * Returns the URL of an image
         * If reload is TRUE, a timestamp is added to avoid caching.
         */
        function getImageSrc(img, reload) {
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
        function isBelowTheFold(img) {
            return $win.height() + $win.scrollTop() <= $(img).offset().top - foldDistance;                 
        }

        // PUBLIC PRIVILEGED METHODS
        // -------------------------
        
        /*
         * Loads 'responsive' images
         * Notes:
         * - Friendly with other scripts running.
         * - Must be publicly accesible for Pub/Sub but should not be called directly.
         */ 
        instance.loadImages = function () {
            var args = arguments;

            // Schedule it to run after the current call stack has cleared.
            defer(function(current, i){
                getImages.apply(NULL, args);
                
                // No images to load? finish!
                if (images[LENGTH]) {
                    i = 0;
                    while (current = images[i]) {
                        if (current && !current[RILOADED]) {
                            if (belowfoldEnabled) { 
                                if (!isBelowTheFold(current)) {
                                    loadImage(current, i);
                                    i--;
                                }
                            } else {
                                loadImage(current, i);
                                i--;
                            }
                        }
                        i++;
                    }
    
                    // Clean up
                    current = NULL;
                }    
            });
        };
        
        
        /* 
         * The "riload" method allows you to load responsive images inserted into the 
         * document after the DOM is ready or after window is loaded (useful for AJAX 
         * content & markup created dynamically with javascript). 
         * Call this method after new markup is inserted into the document.
         */
        instance.riload = function() {
            instance.loadImages(TRUE);           
        };
        
        // INITIALIZATION
        // --------------
        
        onDomReady(function(){
            $win = $(win);
            body = doc.body;
            parentNode = options.root && $('#'+options.root) || body;
            viewportWidth = viewportWidth || getViewportWidthInCssPixels(); 
            imgSize = getSizeOfImages(breakpoints, viewportWidth); 
            init();
        });
    };
    
    // PUBLIC STATIC PROPERTIES
    // ------------------------
    
    // Versioning guidelines: http://semver.org/
    Riloadr.version = '1.0.0';
    
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
                    if (minDpr) {
                        if (devicePixelRatio >= minDpr) {
                            imgSize = name;
                        }
                    } else {
                        imgSize = name;
                    }
                }
            // Viewport width not found so let's find the smallest image size
            // (mobile first approach).  
            } else {
                // Initial value
                if (_vWidth <= 0) {
                    _vWidth = minWidth ? minWidth : maxWidth ? maxWidth : _vWidth;
                    imgSize = name;
                } else {
                    if (minWidth < _vWidth) {
                        _vWidth = minWidth;
                        imgSize = name;
                    }
                    if (maxWidth < _vWidth) {
                        _vWidth = maxWidth;
                        imgSize = name;
                    }
                }
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
            width = math.max.apply(math, widths);
            
            // Catch cases where the viewport is wider than the screen
            if (!isNaN(screenWidthFallback)) {
                width = math.min(screenWidthFallback, width);
            }
        }
        
        return width || screenWidthFallback || 0;
    } 
    
    
    /* 
     * Thanks to underscore.js
     * Returns a function, that, when invoked, will only be triggered at most once
     * during a given win of time.
     */
    function throttle(func, wait) {
        var context, args, timeout, throttling, more, result
          , whenDone = debounce(function(){ more = throttling = FALSE; }, wait);
        return function() {
            context = this; args = arguments;
            var later = function() {
                timeout = NULL;
                if (more) func.apply(context, args);
                whenDone();
            };
            if (!timeout) timeout = setTimeout(later, wait);
            if (throttling) {
                more = TRUE;
            } else {
                result = func.apply(context, args);
            }
            whenDone();
            throttling = TRUE;
            return result;
        };
    }
    
    
    /* 
     * Thanks to underscore.js
     * Returns a function, that, as long as it continues to be invoked, will not
     * be triggered. The function will be called after it stops being called for
     * N milliseconds. If `immediate` is passed, trigger the function on the
     * leading edge, instead of the trailing.
     */
    function debounce(func, wait, immediate) {
        var timeout;
        return function() {
            var context = this, args = arguments
              , later = function() {
                    timeout = NULL;
                    if (!immediate) func.apply(context, args);
                };
            if (immediate && !timeout) func.apply(context, args);
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
    
    
    /*
     * Inspired by underscore.js
     * Defers a function, scheduling it to run after the current call stack has cleared.
     */
    function defer(func) {
        var args = Array.prototype.slice.call(arguments, 1);
        setTimeout(function(){ return func.apply(NULL, args); }, 1);
    }
    
    
    /*
     * Error reporting function
     */
    function error(msg) {
        throw new Error( 'Riloadr: ' + msg );
    }
    
    
    /*
     * Barebones Pub/Sub
     */
    function publish(topic) {
        var subscribers = topics[topic]
          , i = 0
          , current;
        
        if (subscribers) {
            while (current = subscribers[i]) {
                current();
                i++;
            }
        }
    }
    
    
    function subscribe(topic, fn) {
        (topics[topic] = topics[topic] || []).push(fn);
    }


    /*
     * Simple event attachment/detachment
     * Since we attach listeners to the window scroll, resize and 
     * orientationchange events, native functions are 6x faster than jQuery's
     * event handling system.
     */
    !function() {
        var w3c = 'add'+EVENTLISTENER in doc
          , add = w3c ? 'add'+EVENTLISTENER : 'attachEvent'
          , rem = w3c ? 'remove'+EVENTLISTENER : 'detachEvent'
          , pre = w3c ? EMPTYSTRING : ON;
        
        addEvent = function(elem, type, fn) {
            elem[add](pre + type, fn, FALSE);
        };
        
        removeEvent = function(elem, type, fn) {
            elem[rem](pre + type, fn, FALSE);
        };
    }();
    
    
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