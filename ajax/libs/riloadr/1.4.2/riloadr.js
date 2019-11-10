/*! 
 * Riloadr.js 1.4.2 (c) 2013 Tubal Martin - MIT license
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
      , TOP = 'top'
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
      , CLIENT = 'client'
      , RESIZE = 'resize'
      , ONLOAD = ON+LOAD
      , ONERROR = ON+ERROR
      , RETRIES = 'retries'
      , MINWIDTH = 'minWidth'
      , MAXWIDTH = 'maxWidth'
      , COMPLETE = 'complete'
      , RILOADED = 'riloaded'
      , FALLBACK = 'fallback'
      , CLASSNAME = 'className'
      , IMGFORMAT = 'imgFormat'
      , PROTOTYPE = 'prototype'
      , UNDEFINED = 'undefined'
      , SCROLLTOP = SCROLL+'Top'
      , ONCOMPLETE = ON+COMPLETE
      , READYSTATE = 'readyState'
      , SCROLLLEFT = SCROLL+'Left'
      , LOADIMAGES = LOAD+'Images'
      , PAGEYOFFSET = 'pageYOffset'
      , PAGEXOFFSET = 'pageXOffset'
      , ORIENTATION = 'orientation'
      , ATTACHEVENT = 'attachEvent'
      , EVENTLISTENER = 'EventListener'
      , GETELEMENTBYID = 'getElementById'
      , DOCUMENTELEMENT = 'documentElement'
      , READYSTATECHANGE = 'readystatechange'
      , QUERYSELECTORALL = 'querySelectorAll'
      , ADDEVENTLISTENER = 'add'+EVENTLISTENER
      , ORIENTATIONCHANGE = ORIENTATION+'change'
      , MINDEVICEPIXELRATIO = 'minDevicePixelRatio'
      , GETBOUNDINGCLIENTRECT = 'getBoundingClientRect'
      
      , body
      , win = window
      , doc = win.document
      , docElm = doc[DOCUMENTELEMENT]

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
          , scrollListener = deferInvisibleEnabled && throttle(function() {
                instance[LOADIMAGES]();
            }, DELAY)

            // Reduce to 1 the # of times loadImages is called when resizing 
          , resizeListener = (deferInvisibleEnabled || watchViewportEnabled) && debounce(function() {
                // On resize update viewport dependant values if watchViewport mode is enabled
                watchViewportEnabled && setVwidthAndBreakpoints();

                // Update image list onresize if watchViewport mode is enabled
                instance[LOADIMAGES]( watchViewportEnabled );
            }, DELAY)

            // Reduce to 1 the # of times loadImages is called when orientation changes.  
          , orientationchangeListener = deferInvisibleEnabled && debounce(function(){
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
            resizeListener && addEvent(win, RESIZE, resizeListener);
            
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

            // Only remove the resize event if watchViewport mode is disabled/done
            if ( ! watchViewportEnabled ) {
                resizeListener && removeEvent(win, RESIZE, resizeListener);
            }

            // Only remove the scroll/orientation events if defer 'invisible' mode
            // is enabled & watchViewport mode is disabled/done
            if (deferInvisibleEnabled && ! watchViewportEnabled) {
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
            img.src = getImageSrc(img, base, breakpoint);
            
            // Reduce the images array for shorter loops
            images.splice(idx, 1);
        }
        
        
        /*
         * Image onload Callback
         */
        function imageOnloadCallback() {
            var img = this;
            img[ONLOAD] = img[ONERROR] = NULL;
            img[RILOADED] && (img[CLASSNAME] = img[CLASSNAME].replace(classNameRegexp, '$1$2'));
            deferInvisibleEnabled && (img.style.visibility = 'visible');
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
                img.src = getImageSrc(img, base, (img[FALLBACK] ? fallbackBreakpoint : breakpoint), TRUE);
            } else if (FALLBACK in breakpoint && !img[FALLBACK]) {
                img[RETRIES] = 0;
                img[FALLBACK] = TRUE;
                img.src = getImageSrc(img, base, fallbackBreakpoint);
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

            if (imagesPendingLoad == 0) {
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
            defer(function(imageList, current, i) {
                // If initial collection is not done or watch mode is forced or
                // new images have been added to the DOM, collect them.
                if (!images[LENGTH] || update === TRUE) {
                    
                    // Add event listeners on update
                    update && addEventListeners();

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
                            
                            // Push image if:
                            // - Watch mode is disabled/done
                            // - Watch mode is enabled and it's the first breakpoint processed or
                            // - Watch mode 'wider' is enabled and current breakpoint is wider than previous one or
                            // - Watch mode '*' is enabled and current breakpoint differs from previous one
                            if (! watchViewportEnabled || 
                                watchViewportEnabled && (
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
                        i++;
                    }

                    // If watch mode is 'wider' & current breakpoint matches the widest breakpoint
                    // disable watch mode.
                    currentBreakpointIsWidest && (watchViewportEnabled = FALSE);     

                    // Remember the breakpoint used
                    watchViewportEnabled && (prevBreakpoint = breakpoint);
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
                imageList = current = NULL;     
            });
        };
        
        // INITIALIZATION
        // --------------
        
        onDomReady(function(){
            body = doc[BODY];
            root = doc[GETELEMENTBYID](root) || body;
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
    Riloadr.version = '1.4.2';
    
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
    function getImageSrc(img, base, breakpoint, reload) {
        var src = (img.getAttribute('data-base') || base) +
            (img.getAttribute('data-src') || EMPTYSTRING);

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
        return !isBelowTheFold(img, threshold) && !isAboveTheTop(img, threshold) && 
            !isRightOfFold(img, threshold) && !isLeftOfBegin(img, threshold);
    }


    function isBelowTheFold(img, threshold) {
        return getDimension(HEIGHT, win) + getScroll(TOP, win) <= getOffset(TOP, img) - threshold;                 
    }


    function isAboveTheTop(img, threshold) {
        return getScroll(TOP, win) >= getOffset(TOP, img) + threshold + getDimension(HEIGHT, img);                 
    }


    function isRightOfFold(img, threshold) {
        return getDimension(WIDTH, win) + getScroll(LEFT, win) <= getOffset(LEFT, img) - threshold;
    }


    function isLeftOfBegin(img, threshold) {
        return getScroll(LEFT, win) >= getOffset(LEFT, img) + threshold + getDimension(WIDTH, img);
    }


    /*
     * Following "css" functions taken from jQuery 1.10
     */
    function getOffset( name, elem ) {
        var box = { top: 0, left: 0 }
          , doc = elem && elem.ownerDocument
          , win, offsets;

        if ( !doc ) {
            return;
        }  

        if ( typeof elem[GETBOUNDINGCLIENTRECT] !== UNDEFINED ) {
            box = elem[GETBOUNDINGCLIENTRECT]();
        }

        win = getWindow( doc );
        offsets = {
            top: box[TOP]  + ( win[PAGEYOFFSET] || docElm[SCROLLTOP] )  - ( docElm.clientTop  || 0 ),
            left: box[LEFT] + ( win[PAGEXOFFSET] || docElm[SCROLLLEFT] ) - ( docElm.clientLeft || 0 )
        };

        return offsets[name];
    }


    function getScroll( name, elem ) {
        var names = {
              top: {method: SCROLLTOP, prop: PAGEYOFFSET},  
              left: {method: SCROLLLEFT, prop: PAGEXOFFSET}
            }
          , method = names[name].method
          , prop = names[name].prop
          , win = getWindow( elem );

        return win ? (prop in win) ? win[ prop ] :
            docElm[ method ] :
            elem[ method ];
    }


    function getDimension( name, elem ) {
        var names = { height: 'Height', width: 'Width'}
          , doc, val, styles;

        name = names[name];

        if ( isWindow( elem ) ) {
            return docElm[ CLIENT + name ];
        }

        // Get document width or height (not needed for Riloadr)
        /*
        if ( elem.nodeType === 9 ) {
            doc = elem[DOCUMENTELEMENT];

            // Either scroll[Width/Height] or offset[Width/Height] or client[Width/Height], whichever is greatest
            // unfortunately, this causes bug #3838 in IE6/8 only, but there is currently no good, small way to fix it.
            return Math.max(
                elem[BODY][ SCROLL + name ], doc[ SCROLL + name ],
                elem[BODY][ OFFSET + name ], doc[ OFFSET + name ],
                doc[ CLIENT + name ]
            );
        }
        */

        // Get width or height on the element
        // Start with offset property, which is equivalent to the border-box value
        val = elem[ OFFSET + name ];
        name = name.toLowerCase();

        if ( val <= 0 || val == NULL ) {
            // Fall back to computed then uncomputed css if necessary
            if (win.getComputedStyle) {
                styles = win.getComputedStyle( elem, NULL );
            } else if ( docElm.currentStyle ) {
                styles = elem.currentStyle;
            } 

            if (styles) {
                val = styles[ name ];
            }

            if ( val < 0 || val == NULL ) {
                val = elem.style[ name ];
            }
        }

        return parseFloat( val ) || 0;
    }


    function isWindow( obj ) {
        return obj != NULL && obj == obj.window;
    }


    function getWindow( elem ) {
        return isWindow( elem ) ?
            elem :
            elem.nodeType === 9 ?
                elem.defaultView || elem.parentWindow :
                FALSE;
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
     */
    function addEvent(elem, type, fn) {
        elem[add](pre + type, fn, FALSE);
    }
    

    function removeEvent(elem, type, fn) {
        elem[rem](pre + type, fn, FALSE);
    }
    
    
    /*
     * onDomReady.js 1.3 (c) 2013 Tubal Martin - MIT license
     * https://github.com/tubalmartin/ondomready
     * Notes:
     * - Slightly adapted for Riloadr
     * - Compatible with async script loading
     */
    onDomReady = (function(){
        var DOMCONTENTLOADED = 'DOMContentLoaded'
          , top = FALSE
            // isReady: Is the DOM ready to be used? Set to true once it occurs.
          , isReady = FALSE  
            // Callbacks pending execution until DOM is ready
          , callbacks = [];
        
        // Handle when the DOM is ready
        function ready( fn ) {
            if ( !isReady ) {

                // Make sure body exists, at least, in case IE gets a little overzealous (ticket #5443).
                if ( !doc[BODY] ) {
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

        // The ready event handler
        function completed( event ) {
            // readyState === "complete" is good enough for us to call the dom ready in oldIE
            if ( w3c || event.type === LOAD || doc[READYSTATE] === COMPLETE ) {
                detach();
                ready();
            }
        }

        // Clean-up method for dom ready events
        function detach() {
            removeEvent( doc, w3c ? DOMCONTENTLOADED : READYSTATECHANGE, completed );
            removeEvent( win, LOAD, completed );
        }
        
        // Attach the listeners:

        // Catch cases where onDomReady is called after the browser event has already occurred.
        // we once tried to use readyState "interactive" here, but it caused issues like the one
        // discovered by ChrisS here: http://bugs.jquery.com/ticket/12282#comment:15
        if ( doc[READYSTATE] === COMPLETE ) {
            // Handle it asynchronously to allow scripts the opportunity to delay ready
            defer( ready );

        } else {
            // Standards-based browsers support DOMContentLoaded    
            if ( w3c ) {                
                // Use the handy event callback
                addEvent( doc, DOMCONTENTLOADED, completed );
        
            // If IE event model is used
            } else {                
                // Ensure firing before onload, maybe late but safe also for iframes
                addEvent( doc, READYSTATECHANGE, completed );

                // If IE and not a frame
                // continually check to see if the document is ready
                try {
                    top = win.frameElement == NULL && docElem;
                } catch(e) {}

                if ( top && top.doScroll ) {
                    (function doScrollCheck() {
                        if ( !isReady ) {
                            try {
                                // Use the trick by Diego Perini
                                // http://javascript.nwbox.com/IEContentLoaded/
                                top.doScroll('left');
                            } catch(e) {
                                return delay( doScrollCheck, 50 );
                            }

                            // detach all dom ready events
                            detach();

                            // and execute any waiting functions
                            ready();
                        }
                    })();
                }
            }
            
            // A fallback to window.onload, that will always work
            addEvent( win, LOAD, completed );
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
            defer(fn);
        } else {
            var _fn = function() {
                removeEvent(win, LOAD, _fn);
                defer(fn);
            };
            addEvent(win, LOAD, _fn);
        }    
    }

    
    return Riloadr; 
        
});