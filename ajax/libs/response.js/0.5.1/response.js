/*!
 * Response   Responsive design toolkit
 * @link      http://responsejs.com
 * @author    Ryan Van Etten (c) 2011-2012
 * @license   MIT
 * @version   0.5.1
 * @requires  jQuery 1.7+
 *            -or- Jeesh (ender.no.de/#jeesh)
 *            -or- Zepto 0.8+ (zeptojs.com)
 */

;this.Response = (function( window, undef ) {// this === window in the global scope

    // Combine local vars/funcs into one statement:    

    var Response
      , namespace = 'Response'            // used for event namespacing
      , initContentKey = 'i' + namespace  // key for storing initial (no-js) content
      , doc = window.document             // document root
      , docElem = doc.documentElement     // <html>

      , $ = window.jQuery || window.Zepto || window.ender
      , ready = $.domReady || $
      , $win = $(window)                  // cache selector
      , slice = [].slice                  // jsperf.com/arrayify-slice/2
      , screen = window.screen            // local for better minification and scope traversal
      , max = Math.max                    // local for better minification and scope traversal
      , isFinite = window.isFinite        // local for better minification and scope traversal
          
        // these are defined later
      , Elemset, band, wave, device = {}
      , propTests = {}
      , sets = { all: [] }

        // responsejs.com/labs/dimensions/#device
        // device dims stay the same regardless of viewport size or rotation
      , screenW = screen.width   
      , screenH = screen.height  
      , screenMax = max(screenW, screenH)
      , screenMin = screenW + screenH - screenMax
      , deviceW = function() {
            return screenW; 
        }
      , deviceH = function() { 
            return screenH; 
        }
      
        // cache expressions
      , regexFunkyPunc = /[^a-z0-9_\-\.]/gi
      , regexCamels = /([a-z])([A-Z])/g
      , regexDashB4 = /-(.)/g
      , regexDataPrefix = /^data-(.+)$/
      , regexSpace = /\s+/
      , regexTrimPunc = /^[\W\s]+|[\W\s]+$|/g
        //, regexSelectorOps = /([^a-z0-9_\-\s])/gi  // dicey => revert back to simple escape in selectify

        // Response.media (normalized matchMedia)
        // @example Response.media("(orientation:landscape)").matches
        // If both versions are undefined, .matches will equal undefined 
        // Also see: band / wave / device.band / device.wave / dpr
      , media  = window.matchMedia || window.msMatchMedia || function() {
            return {}; 
        }
    
        // Use isArray when available. With inspiration from
        // github.com/ded/valentine and github.com/documentcloud/underscore
      , isArray = Array.isArray || function(ukn) {
            return ukn instanceof Array; 
        }
        
        // Local version of Object.create with polyfill that supports only the first arg.
        // It creates an empty object whose prototype is set to the specified proto param.
        // developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Object/create
        // FYI there is a full polyfill @link github.com/kriskowal/es5-shim
        // This gets exposed as Response.object since 0.4.0

      , objectCreate = Object.create || function (proto) {
            function Type () {}      // Function to output empty object.
            Type.prototype = proto;  // Set prototype property to the proto.
            return new Type();       // Instantiate the new object.
        }

      , namespaceIt = function(eventName, customNamespace) {// namepace defaults to 'Response'
            customNamespace = customNamespace || namespace;
            return eventName.replace(regexTrimPunc, '') + '.' + customNamespace.replace(regexTrimPunc, '');
        }

      , event = {// Custom Events
            allLoaded: namespaceIt('allLoaded') // fires on lazy elemsets when all elems in a set have been loaded once
            //, update: namespaceIt('update')       // fires on each elem in a set each time that elem is updated
          , crossover: namespaceIt('crossover') // fires on window each time dynamic breakpoint bands is crossed
        }

    ;//var
    
    // responsejs.com/labs/dimensions/#viewport    
    function viewportW() {
        return docElem.clientWidth; 
    }
    
    function viewportH() { 
        return docElem.clientHeight; 
    }
    
    function doError(msg) {
        // Error handling. (Throws exception.)
        // Use Ctrl+F to find specific @errors
        throw 'Error using Response.' + (msg || '');
    }

    function ssvToArr(ukn) {
        // Convert space separated values to array. Always returns an array:
        return typeof ukn === 'string' ? ukn.split(regexSpace) : isArray(ukn) ? ukn : [];
    }
        
    /**
     * Response.camelize       Converts data-pulp-fiction to pulpFiction
     *                         via camelize @link github.com/ded/bonzo
     *                         Used in dataset methods.
     *
     * @example   Response.camelize('data-casa-blanca')  // casaBlanca
     */

    function camelize(s) {
        // Remove data- prefix and convert remaining dashed string to camelCase:
        return s.replace(regexDataPrefix, '$1').replace(regexDashB4, function (m, m1) {
            return m1.toUpperCase();
        });
    }

    /**
     * Response.datatize       Converts pulpFiction (or data-pulpFiction) to data-pulp-fiction
     *                         Adapted from decamelize @link github.com/ded/bonzo
     *                         Used in dataset methods.
     *
     * @example   Response.datatize('casaBlanca')  // data-casa-blanca
     */

    function datatize(s) {
        // Make sure there's no data- already in s for it to work right in IE8.
        return 'data-' + (s ? s.replace(regexDataPrefix, '$1').replace(regexCamels, '$1-$2').toLowerCase() : s);
    }
        
    // Isolate native element:
    function getNative(e) {
        // stackoverflow.com/questions/9119823/safest-way-to-detect-native-dom-element
        // See @link jsperf.com/get-native
        // If e is a native element then return it. If not check if index 0 exists and is
        // a native elem. If so then return that. Otherwise return false.
        return !e ? false : e.nodeType === 1 ? e : e[0] && e[0].nodeType === 1 ? e[0] : false;
    }

    // Local map func adapted from github.com/ded/valentine
    // A lot of maps ar eused here so I want a local version here faster than $.map
    // Could use native version where avail and fallback to jQuery like...
    //, map = 'map' in arrPrototype ? function (arr, callback) { return arrPrototype.map.call(arr, callback); } : $.map
    // see v.map @link github.com/ded/valentine
    // ...but the loop below works everywhere, is as fast as the native call, and ends up using about the same amount of code overall.

    function map(arr, callback, scope) {
        var r = []
          , i = -1
          , len = arr.length;
        while ( i++ < len ) {
            if (i in arr) {
                r[i] = callback.call(scope, arr[i]);
            }
        }
        return r;
    }

    // Adapted from the native forEach / Valentine (v.each) / Optimized for use here. Callbacks
    // the form (index, value) as args. Scope (thisArg) not supported. Works on arrays/selectors.
    // It's like [].forEach.call(arr, callback) but slightly faster and w/o support for the thisArg.
    // jsperf.com/each-loops
    // github.com/ded/valentine
    // developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Array/forEach

    // renamed to forEach locally to avoid confusion with $.each and also
    // reversed callback args to be same as native forEach rather than $.each
    // Since version 0.4.0, this gets exposed as Response.each()

    function forEach(arr, callback) {
        var i
          , len = arr.length;
        for (i = 0; i < len; i++) {
            if (i in arr) {
                callback(arr[i], i, arr);
            }
        }
        return arr; // chainable
    }

    // revamped affix method reintroduced in version 0.4.0:
    function affix(arr, prefix, suffix) {
        // Return array that is a copy of arr with the prefix/suffix added to each value.
        var r = []
          , i = arr.length;
        prefix = prefix || '';
        suffix = suffix || '';
        while ( i && i-- ) {
            if (i in arr) {
                r[i] = prefix + arr[i] + suffix;
            }
        }
        return r;
    }

    /**
     * Response.sift                 Filter out array values that don't pass a callback,
     *                               or (if no callback provided) filter out falsey values.
     *                               When the callback param is provided, this method is
     *                               equivalent to jQuery.grep including the option to 
     *                               invert the output. Performance @link jsperf.com/sift
     *
     * @since   0.4.0
     *
     * @param   array      arr
     * @param   callback   callback   (optional)
     * @param   boolean    invert     (optional)
     *
     * @return  array 
     *
     * @example Response.sift([5, 0, 'seven'], isFinite)    // [5, 0]
     * @example Response.sift([5, 0, '', undefined, null])  // [5]
     *
     */

    function sift(arr, callback, invert) {
        var i = -1
          , ret = []
          , len = arr.length
        ;
        if (callback) {
            invert = !!invert; // ensure boolean
            while ( i++ < len ) {// Filter out values that don't pass callback:
                if (invert === !callback(arr[i], i)) {
                    ret.push(arr[i]);
                }
            }
        }
        else {
            while ( i++ < len ) {// Filter out all falsey values:
                if (arr[i]) {
                    ret.push(arr[i]);
                }
            }
        }
        return ret;
    }

    /**
     * Response.render                Converts stringified primitives back to JavaScript.
     *                                Adapted from dataValue() @link github.com/ded/bonzo
     * @since   0.3.0
     *
     * @param   string|other    s     String to render back to its correct JavaScript value.
     *                                If s is not a string then it is returned unaffected. 
     * @return  converted data
     *
     */

    function render(s) {
        var n;
        return (!s || typeof s === 'string' ? s              // unchanged
                        : 'true' === s      ? true           // convert "true" to true
                        : 'false' === s     ? false          // convert "false" to false
                        : 'undefined' === s ? undef          // convert "undefined" to undefined
                        : 'null' === s      ? null           // convert "null" to null
                        : isFinite((n = parseFloat(s))) ? n  // convert "1000" to 1000
                        : s                                  // unchanged
        );
    }//render

    /**
     * Response.merge
     * @since 0.3.0
     * Generic method for merging objects and/or arrays.
     * This is fast and simple method. For deep merges see jQuery.extend()
     * Falsey values in adds do not overwrite values in base, unless
     * the optional overwrite param is explicitly set to true.
     * @param   object|array   base
     * @param   object|array   adds
     * @param   boolean        overwrite
     */
     
    function merge(base, adds, overwrite) {
        if (base && adds) {
            var k
              , len = adds.length
              , has = 'hasOwnProperty'
              , hasHas;

            if ( !isFinite(len) || typeof adds === 'function' ) {// plain object or object func
                hasHas = !!adds[has];
                for (k in adds) {
                    if ((!hasHas || adds[has](k)) && (overwrite || adds[k])) {
                        base[k] = adds[k];
                    }
                }
            }
            else {// array or arr-like obj
                for (k = 0; k < len; k++) {
                    if (k in adds && (overwrite || adds[k])) {
                        base[k] = adds[k];
                    }
                }
            }
        }
        return base;
    }

    /**
     * Response.route()                      Handler method for accepting args as arrays or singles, for 
     *                                       callbacks 
     * @since   0.3.0
     *   
     * @param   array|mixed     ukn          If ukn is an array then the callback gets called on each
     *                                       array member. Otherwise the callback is called on ukn itself.
     * @param   callback        fn           The function to call on ukn(s).
     *
     * @return  array|mixed
     *
     */     

    function route(ukn, fn) {
        // If ukn is an array or array-like then call the callback on each ukn. Otherwise call it on ukn:
        return ukn && typeof ukn === 'object' && typeof ukn.length === 'number' ? forEach(ukn, fn) : fn(ukn);
    }

    // Handler for defining range comparison booleans:
    function ranger(fn) {
        // In previous versions we used inORout() for this but this
        // is better because the resulting functions are faster
        // because they don't require an extra function call.
        return function(min, max) {
            var curr = fn();
            min = curr >= (min || 0); // Default to zero and repurpose as boolean.
            return !max ? min : min && curr <= max;        
        };
    }

    /** 
     * Range comparison booleans
     * @link responsejs.com/#booleans
     */
    band = ranger(viewportW);      // Response.band
    wave = ranger(viewportH);      // Response.wave
    device.band = ranger(deviceW); // Response.device.band
    device.wave = ranger(deviceH); // Response.device.wave

    /**
     * .dataset()          Cross browser implementation of HTML5 dataset
     *                     The chainable syntax is disabled by default and can be 
     *                     enabled by calling Response.chain() (See Response.chain)
     *
     * @since 0.3.0
     * 
     * Chainable form:  $('div').dataset(key)               // get (from first matched element)
     *                  $('div').dataset([key])             // get and render (See Response.render)
     *                  $('div').dataset(key, value)        // set (sets all matched elems)
     *                  $('div').dataset({k1:val, k2:val})  // set multiple attrs at once (on all matched elems)
     *                  $('div').deletes(keys)              // delete attrs (space-separated string)
     * 
     * Non-chainable:   Response.dataset(elem, key)               // get (elem can be native or jQuery elem)
     *                  Response.dataset(elem, [key])             // get and render (See Response.render)
     *                  Response.dataset(elem, key, value)        // set
     *                  Response.dataset(elem, {k1:val, k2:val})  // set multiple attrs at once
     *                  Response.deletes(elem, keys)              // delete attrs (space-separated string)
     * 
     */

    function datasetChainable(key, value) {

        var numOfArgs = arguments.length
          , elem = getNative(this) // || doError('dataset @elem') let this fall thru naturally
          , ret = {}
          , renderData = false
          , n;

        if ( numOfArgs ) {
                
            if ( isArray(key) ) {
                renderData = true;
                key = key[0];
            }
    
            if ( typeof key === 'string' ) {

                // key || doError('dataset @key'); // Make sure key is not an empty string.

                key = datatize(key);

                if ( 1 === numOfArgs ) {//GET
                    ret = elem.getAttribute(key);
                    return renderData ? render(ret) : ret;
                }

                if ( this === elem || 2 > (n = this.length || 1) ) {//SET single elem
                    elem.setAttribute(key, value);
                }

                else {//SET for group of selected elems
                    while( n-- ) {// n starts as # of elems in selector and stops at 0
                        if (n in this) {
                            datasetChainable.apply(this[n], arguments);
                        }
                    }
                }
            }

            else if ( key instanceof Object ) {//SET
                // Plain object containing key/value pairs:
                for (n in key) {
                    if (key.hasOwnProperty(n)) {
                        datasetChainable.call(this, n, key[n]);
                    }
                }
            }
                
            return this; // chain

        }//1 or more args

        // ** Zero args **
        // Return object containing all the data attributes.
        // Use the native dataset when available:
            
        if ( elem.dataset && DOMStringMap ) {
           return elem.dataset;
        }
            
        // adapted from Bonzo @link github.com/ded/bonzo/blob/master/bonzo.js
        forEach(elem.attributes, function(a) {
            if (a && (n = String(a.name).match(regexDataPrefix))) {
                ret[camelize(n[1])] = a.value;
            }
        });

        return ret; // plain object

    }//datasetChainable
        
    /**
     * .deletes()
     * 
     *
     * @since 0.3.0
     */
         
    function deletesChainable(keys) {
    
        // Could make this take a little less code using sending the space-separated string 
        // straight to removeAttr but Zepto's removeAttr doesn't support space-separated keys
        // it'd have to be like:

        /* if ( 'string' === typeof keys ) {
            var $elems = selectOnce(this);
            forEach(ssvToArr(keys), function(key) {
                if (key) {
                    $elems.removeAttr(datatize(key)); 
                }
            });
        }*/
        // Or, just use native removeAttribute:
        
        if (this && typeof keys === 'string') {
            keys = ssvToArr(keys);
            route(this, function(el) {
                forEach(keys, function(key) {
                    if (key) {
                        el.removeAttribute(datatize(key));
                    }
                });
            });
        }

        return this;
    }//deletesChainable

    /**
     * Response.dataset()        See datasetChainable above
     *                           This is the non-chainable version. It grabs the thisArg
     *                           and calls the chainable version
     *
     * @since 0.3.0
     */

    function dataset(elem, key, value) {
        return datasetChainable.apply(elem, slice.call(arguments, 1));
    }

    /**
     * Response.deletes(elem, keys)           Delete HTML5 data attributes (remove them from them DOM)
     * 
     * @since 0.3.0
     *                             Where native DOM dataset is supported you can do: `delete elem.dataset.foo`
     * 
     * @param   object   elem     is a native element or jQuery object e.g. document.body or $('body')
     * 
     * @param   string   keys     one or more space-separated data attribute keys (names) to delete (removed
     *                            from the DOM) Should be camelCased or lowercase.
     * 
     * @example  Response.deletes(document.body, 'casaBlanca movie'); // Removes data-casa-blanca and data-movie
     *                                                                // from the <body> element.
     * 
     * @example  Response.deletes($(div), 'casaBlanca movie')         // Removes data-casa-blanca and data-movie
     *                                                                // from all divs.
     */

    function deletes(elem, keys) {
        return deletesChainable.call(elem, keys);
    }

    /** 
     * Response.overflowX()      Get the number of pixels that the document width exceeds viewport width.
     *
     * @return  integer   pixel amount that horizontal content overflows viewport (or 0 if there's no overflow).
     */
         
    function overflowX() {
        var html = docElem
          , difference = max(html.offsetWidth, html.scrollWidth, doc.body.scrollWidth) - viewportW();
        return 0 < difference ? difference : 0;
    }

    /** 
     * Response.overflowY()       Get the number of pixels that the document height exceeds viewport height.
     *
     * @return  integer   pixel amount that vertical content overflows the viewport (or 0 if there's no overflow).
     */
     
    function overflowY() {
        var html = docElem
          , difference = max(html.offsetHeight, html.scrollHeight, doc.body.scrollHeight) - viewportH();
        return 0 < difference ? difference : 0;
    }

    // Cross-browser versions of window.scrollX and window.scrollY
    // Compatibiliy notes @link developer.mozilla.org/en/DOM/window.scrollY
    // Performance tests @link jsperf.com/scrollx-cross-browser-compatible
    // Using native here b/c Zepto doesn't support .scrollLeft() /scrollTop()
    // In jQuery you can do $(window).scrollLeft() and $(window).scrollTop()

    /** 
     * Response.scrollX()     Cross-browser version of window.scrollX
     *
     * @since   0.3.0
     * @return  integer
     */
     
    function scrollX(){
        return window.pageXOffset || docElem.scrollLeft; 
    }

    /** 
     * Response.scrollY()     Cross-browser version of window.scrollY
     *                       
     * @since   0.3.0
     * @return  integer
     */

    function scrollY(){ 
        return window.pageYOffset || docElem.scrollTop; 
    }

    /**
     * area methods inX/inY/inViewport
     * 
     * In non-chainable contexts, these are booleans.
     * In chainable contexts, they are filters.
     *
     * @since   0.3.0
     *
     * Inspired by @link appelsiini.net/projects/viewport
     *
     */

    function rectangle(el, verge) {
        // Local handler for area methods:
        // adapted from github.com/ryanve/dime
        // The native object is read-only so we 
        // have use a copy in order to modify it.
        var r = el.getBoundingClientRect ? el.getBoundingClientRect() : {};
        verge = 'number' === typeof verge ? verge : 0;
        return {
            top: (r.top || 0) - verge
          , left: (r.left || 0) - verge
          , bottom: (r.bottom || 0) + verge
          , right: (r.right || 0) + verge
        };
    }
         
    // The verge is the amount of pixels to act as a cushion around the viewport. It can be any 
    // integer. If verge is zero, then the inX/inY/inViewport methods are exact. If verge is set to 100, 
    // then those methods return true when for elements that are are in the viewport *or* near it, 
    // with *near* being defined as within 100 pixels outside the viewport edge. Elements immediately 
    // outside the viewport are 'on the verge' of being scrolled to.

    function inX(elem, verge) {
        var r = rectangle(getNative(elem), verge);
        return r.right >= 0 && r.left <= scrollX() + viewportW();        
    }

    function inY(elem, verge) {
        var r = rectangle(getNative(elem), verge);
        return r.bottom >= 0 && r.top <= scrollY() + viewportH();
    }

    function inViewport(elem, verge) {
        // equiv to: inX(elem, verge) && inY(elem, verge)
        // But just manually do both to avoid calling rectangle() and getNative() twice.
        // It actually gzips smaller this way too:
        var r = rectangle(getNative(elem), verge);
        return r.bottom >= 0 && r.top <= scrollY() + viewportH() && r.right >= 0 && r.left <= scrollX() + viewportW();
    }
    
    /**
     * Response.dpr(decimal)         Tests if a minimum device pixel ratio is active. 
     *                               Or (version added in 0.3.0) returns the device-pixel-ratio
     *
     *
     * @param    number    decimal   is the integer or float to test.
     *
     * @return   boolean|number
     * @example  Response.dpr();     // get the device-pixel-ratio (or 0 if undetectable)
     * @example  Response.dpr(1.5);  // true when device-pixel-ratio is 1.5+
     * @example  Response.dpr(2);    // true when device-pixel-ratio is 2+
     * @example  Response.dpr(3/2);  // [!] FAIL (Gotta be a decimal or integer)
     *
     */

    function dpr(decimal) {

        var dPR = window.devicePixelRatio;

        if ( !arguments.length ) {//Return exact value or kinda iterate for approx:
            return dPR || (dpr(2) ? 2 : dpr(1.5) ? 1.5 : dpr(1) ? 1 : 0);
        }

        if ( !isFinite(decimal) ) {// Shh. Actually allows numeric strings too. ;)
            return false;
        }

        // Use window.devicePixelRatio if supported - supported by Webkit 
        // (Safari/Chrome/Android) and Presto 2.8+ (Opera) browsers.         

        if ( dPR ) {
            return dPR >= decimal; 
        }

        // Fallback to .matchMedia/.msMatchMedia. Supported by Gecko (FF6+) and more:
        // @link developer.mozilla.org/en/DOM/window.matchMedia
        // -webkit-min- and -o-min- omitted (Webkit/Opera supported above)
        // The generic min-device-pixel-ratio is expected to be added to the W3 spec.
        // Return false if neither method is available.

        decimal = 'only all and (min--moz-device-pixel-ratio:' + decimal + ')';
        return !media ? false : media(decimal).matches || media(decimal.replace('-moz-', '')).matches;

    }//dpr
             
    function detectMode(elem) {

        // Detect whether elem should act in src or markup mode.
        //
        // @param   elem      is a native dom element
        // @return  boolean   true (src mode) or false (markup mode) depending on whether there is a
        //                     src attr *and* whether the spec allows it on the elem in question.
        //
        // @link dev.w3.org/html5/spec-author-view/index.html#attributes-1
        // @link stackoverflow.com/questions/8715689/check-if-element-legally-supports-the-src-attribute-or-innerhtml
        //
        // In jQuery you can also use $(elem).prop('tagName') to get the tagName. 
        // This uses developer.mozilla.org/en/DOM/element.tagName
        //
        // In HTML5, element.tagName returns the tagName in uppercase.
        // We force the case here to make it compatible with XHTML.
        // These are the elems that can use src attr per the W3 spec:
            
        var srcElems = {img:1, input:1, source:3, embed:3, track:3, iframe:5, audio:5, video:5, script:5}
          , modeID = srcElems[elem.tagName.toLowerCase()] || -1
        ;

        // -5 => markup mode for video/audio/iframe w/o src attr.
        // -1 => markup mode for any elem not in the array above.
        //  1 => src mode    for img/input (empty content model). Images.
        //  3 => src mode    for source/embed/track (empty content model). Media *or* time data.
        //  5 => src mode    for audio/video/iframe/script *with* src attr.
        //  If we at some point we need to differentiate <track> we'll use 4, but for now
        //  it's grouped with the other non-image empty content elems that use src.
        //  hasAttribute is not supported in IE7 so check typeof elem.getAttribute('src')

        return 4 > modeID ? modeID : typeof elem.getAttribute('src') === 'string' ? 5 : -5; // integer
    }//detectMode

    /**
     * Response.store()
     * @since 0.1.9
     *
     * Store a data value on each elem targeted by a jQuery selector. We use this for storing an 
     * elem's orig (no-js) state. This gives us the ability to return the elem to its orig state.
     * The data it stores is either the src attr or the innerHTML based on result of detectMode().
     *
     * @param          $elems     is the jQuery selector.
     * @param  string  key        is the key to use to store the orig value w/ @link api.jquery.com/data/
     * @param  string  overwrite  (optional, @since 0.3.0) gives the option for overwriting the key if it 
     *                            already exists. Does not overwrite by default. To overwrite, set to true.
     *
     */

    function store($elems, key, overwrite) {
    
        ($elems && key) || doError('store');
            
        var el, i = $elems.length;
        overwrite = !!overwrite;
            
        // Could use: 
            //forEach($elems, function(el) {
            //    if ( overwrite || !dataset(el, key) ) {
            //        dataset(el, key, (0 < detectMode(el) ? el.getAttribute('src') : $(el).html()||'' ));
            //    }
            //});
        // but instead opted for a manual loop here for slightly faster performance,
        // b/c this happens early (before any swaps) so should be really fast:

        if ( i ) {
            while ( i-- ) {
                if (i in $elems) {
                    el = $elems[i]; // Use local so that array lookup is only done once.
                    if (overwrite || !dataset(el, key)) {
                        // Check mode and store appropriate value. If detectMode(el) is 
                        // positive then we know getAttribute will return a string:
                        dataset(el, key, (0 < detectMode(el) ? el.getAttribute('src') : $(el).html()||'' ));
                    }
                }
            }
        }
        
        return Response;
    }//store
        
    function selectify(keys) {
        // Convert an array of data keys into a selector string
        // Converts ["a","b","c"] into "[data-a],[data-b],[data-c]"
        // Double-slash escapes periods so that attrs like data-density-1.5 will work
        // @link api.jquery.com/category/selectors/
        // @link github.com/jquery/sizzle/issues/76
        var r = []
          , i = keys.length;
        while ( i && i-- ) {
            if (keys[i]) {
                // r[i] = '[' + datatize(keys[i].replace(regexTrimPunc, '').replace(regexSelectorOps, '\\\\$1')) + ']';
                r[i] = '[' + datatize(keys[i].replace(regexTrimPunc, '').replace('.', '\\.')) + ']';
            }
        }
        return r.join();
    }

    /**
     * Response.target()           Get the corresponding data attributes for an array of data keys.
     * @since    0.1.9
     * @param    array     keys    is the array of data keys whose attributes you want to select.
     * @return   object            jQuery selector
     * @example  Response.target(['a', 'b', 'c'])  //  $('[data-a],[data-b],[data-c]')
     * @example  Response.target('a b c'])         //  $('[data-a],[data-b],[data-c]')
     */
    
    function target(keys) {
        return $(selectify(ssvToArr(keys)));    
    }

    /**
     * Response.access()               Access data-* values for element from an array of data-* keys. 
     * 
     * @since   0.1.9                 (added support for space-separated strings in 0.3.1)
     *
     * @param   object         elem   is a native or jQuery element whose values to access.
     * @param   array|string   keys   is an array or space-separated string of data keys whose 
     *                                values you want to access.
     *
     * @return  array                 of dataset values corresponding to each key. Since 0.4.0 if
     *                                the params are wrong then the return is an empty array.
     */

    function access(elem, keys) {
        // elem becomes thisArg for datasetChainable:
        return elem && keys && keys.length ? map(ssvToArr(keys), datasetChainable, elem) : [];
    }
    
    /**
     * Response.addTest
     *
     */
      
    function addTest(prop, fn) {
        if (typeof prop === 'string' && typeof fn === 'function') {
            propTests[prop] = fn;
        }
        return Response;
    }
        
        /*
         * Elemset                      Prototype object for element sets used in Response.create
         *                              Each element in the set inherits this as well, so some of the 
         *                              methods apply to the set, while others apply to single elements.
         */

    Elemset = (function() {
    
        var crossover = event.crossover
          //, update = event.update
          , memoizeCache = []
          , min = Math.min;

        // Techically data attributes names can contain uppercase in HTML, but, The DOM lowercases 
        // attributes, so they must be lowercase regardless when we target them in jQuery. Force them 
        // lowercase here to prevent issues. Removing all punc marks except for dashes, underscores,
        // and periods so that we don't have to worry about escaping anything crazy.
        // Rules @link dev.w3.org/html5/spec/Overview.html#custom-data-attribute
        // jQuery selectors @link api.jquery.com/category/selectors/ 
            
        function sanitize (key) {
            // Allow lowercase alphanumerics, dashes, underscores, and periods:
            return typeof key === 'string' ? key.toLowerCase().replace(regexFunkyPunc, '') : '';
        }

        return {
            e: 0                      // object    the native element
          , $e: 0                     // object    jQuery/Zepto element
          , mode: 0                   // integer   defined per element
          , breakpoints: 0            // array     validated @ configure()
          , prefix: 0                 // string    validated @ configure()
          , prop: 'width'             // string    validated @ configure()
          , keys: []                  // array     defined @ configure()
          , dynamic: 0                // boolean   defined @ configure()
          , values: []                // array     available values
          , fn: 0                     // callback  the test fn, defined @ configure()
          , verge: undef              // integer   defaults to Math.min(screenMax, 500)
          , newValue: 0
          , currValue: 1
          , aka: 0
          , lazy: 0
          , i: 0                      // integer   the index of the current highest active breakpoint min
          , selector: 0
    
          , valid8: function(arr, prop, defaultBreakpoints) {
              
                arr = this.breakpoints;
                   
                if (isArray(arr)) {// Custom Breakpoints:
                    // Filter out non numerics and sort lowest to highest:
                    arr = sift(arr, isFinite).sort(function(a, b){ return (a - b); });
                    arr.length || doError('create @breakpoints');
                }

                else {// Default Breakpoints:
                    
                    // The defaults are presorted so we can skip the need to sort when using the defaults. Omit
                    // trailing decimal zeros b/c for example if you put 1.0 as a devicePixelRatio breakpoint, 
                    // then the target would be data-pre1 (NOT data-pre1.0) so drop the zeros.

                    defaultBreakpoints = {
                        width: [0, 320, 481, 641, 961, 1025, 1281]  // width  | device-width  (ideal for 960 grids)
                      , height: [0, 481]                            // height | device-height (maybe add 801 too)
                      , ratio: [1, 1.5, 2]                          // device-pixel-ratio     (!omit trailing zeros!)
                    };
                    
                    // If no breakpoints are supplied, then get the default breakpoints for the specified prop.
                    // Supported props: 'width', 'height', 'device-width', 'device-height', 'device-pixel-ratio'
                    prop = this.prop;
                    arr = defaultBreakpoints[prop] || defaultBreakpoints[prop.split('-').pop()] || doError('create @prop'); 
                }

                // Remove breakpoints that are above the device's max dimension,
                // in order to reduce the number of iterations needed later.
                this.breakpoints = sift(arr, function(n) { return n <= screenMax; });
            }
              
          , reset: function() {// Reset memoize cache -and- fire crossover events:
          
                  var subjects = this.breakpoints
                  , i = subjects.length
                  , tempIndex = 0;
          
                  // Reset memoize cache. It's safe to set index zero to true b/c all the the test
                memoizeCache = [true]; // methods (see propTests) return true for zero. E.g. b/c band(0) === true // always
                
                // This is similar to the decideValue loop
                while( !tempIndex && i-- ) {
                    if ( this.memoize(subjects[i]) ) {
                        tempIndex = i;
                    }
                }

                // Fire the crossover event if crossover has occured:
                if (tempIndex !== this.i) {
                    $win.trigger(crossover) // fires for each set
                        .trigger(this.prop + crossover); // fires 
                    this.i = tempIndex || 0;
                }
            
                return this;           // chainable
            }

          , memoize: function(breakpoint) {
                // Prevents repeating tests:
                var bool = memoizeCache[breakpoint];
                if ( bool !== !!bool ) {// If bool is not boolean:
                    memoizeCache[breakpoint] = bool = !!this.fn(breakpoint);
                }
                return bool;
            }

          , configure: function(options) {
                var i 
                  , prefix
                  , context = this
                  , aliases
                  , aliasKeys
                    , combinedKeys
                ;

                merge(context, options, true); // Merge properties from options object into this object.

                context.verge = isFinite(context.verge) ? context.verge : min(screenMax, 500);
                    
                context.fn = propTests[context.prop] || doError('create @fn');

                // If we get to here then we know the prop is one one our supported props:
                // 'width', 'height', 'device-width', 'device-height', 'device-pixel-ratio'
                // device- props => NOT dynamic
                    
                if (context.dynamic === 0) {
                    context.dynamic = !!('device' !== context.prop.substring(0, 6));
                }

                prefix = context.prefix ? sift(map(ssvToArr(context.prefix), sanitize)) : ['min-' + context.prop + '-'];
                aliases = 1 < prefix.length ? prefix.slice(1) : 0;
                context.prefix = prefix[0];

                // Sort and validate custom breakpoints if supplied. Otherwise grab the defaults.
                // Must be done before Elemset keys are created so that the keys match:
                context.valid8();

                // Use the breakpoints array to create array of data keys:
                context.keys = affix(context.breakpoints, context.prefix);
                context.aka = undef; // Reset to undef just in case a value was merged in.

                if (aliases) {// There may be one of more aliases:
                    aliasKeys = [];
                    i = aliases.length;
                    while ( i-- ) {
                        aliasKeys.push(affix(context.breakpoints, aliases[i]));
                    }
                    context.aka = aliasKeys; // context.aka is an array of arrays (one for each alias)
                }
                    
                // If there are aliases, flatten them into one array with this.keys before creating 
                // the selector string. Also push the combinedKeys array onto the sets object.
                sets[context.prop] = combinedKeys = [].concat.apply(context.keys, context.aka||[]);
                sets.all = sets.all.concat(combinedKeys);
                context.selector = selectify(combinedKeys);
                
                return context; // chainable
            }

          , target: function() {// Stuff that can't happen until the DOM is ready:
                this.$e = $(this.selector);      // Cache jQuery object for the set.
                store(this.$e, initContentKey);  // Store original (no-js) value to data key.
                this.keys.push(initContentKey);  // Add key onto end of keys array. (# keys now equals # breakpoints + 1)
                return this; // chainable
            }

            // The rest of the methods are designed for use with single elements.
            // They are for use in a cloned instances within a loop.

          , decideValue: function() {
                // Return the first value from the values array that passes the boolean
                // test callback. If none pass the test, then return the fallback value.
                // this.breakpoints.length === this.values.length + 1  
                // The extra member in the values array is the initContentKey value.
                var val = 0
                  , subjects = this.breakpoints
                  , sL = subjects.length
                  , i = sL
                ;
                // similar to lastIndexOf:
                while( !val && i-- ) {
                    if ( this.memoize(subjects[i]) ) {
                        val = this.values[i];
                    }
                }
                this.newValue = val || this.values[sL];
                return this; // chainable
            }

          , prepareData: function(elem) {
             
                this.e = elem;                      // native element
                this.$e = $(elem);                   // jQuery selector
                this.mode = detectMode(this.e);     // Detect the mode of the element.
                this.values = access(this.$e, this.keys); // Access Response data- values for the element.
                    
                if (this.aka) {
                    var i = this.aka.length;
                    // If there are alias keys then there may be alias values. Merge the values from 
                    // all the aliases into the values array. The merge method only merges in truthy values
                    // and prevents falsey values from overwriting truthy ones. (See Response.merge)
                    while ( i-- ) {// loops down and stops at index 0
                        // Each of the this.aka arrays has the same length as the this.values
                        // array, so no new indexes will be added, just filled if there's truthy values.
                        this.values = merge(this.values, access(this.$e, this.aka[i]));
                    }
                }

                return this.decideValue();          // chainable
            }

          , updateDOM: function() {
                // Apply the method that performs the actual swap. When updateDOM called this.$e and this.e refer
                // to single elements. Only update the DOM when the new value is different than the current value.
                if (this.currValue === this.newValue) { return this; }
                this.currValue = this.newValue;
                0 < this.mode ? this.e.setAttribute('src', this.newValue) : this.$e.html(this.newValue);
                // this.$e.trigger(update); // may add this event in future
                return this;
            }

        };//return
    }());//Elemset
    
    // The keys are the prop and the values are the method that tests that prop.
    // The props with dashes in them are added via array notation below.
    // Props marked as dynamic change when the viewport is resized:
    
    propTests.width = band;   // dynamic
    propTests.height = wave;  // dynamic
    propTests['device-width'] = device.band;
    propTests['device-height'] = device.wave;
    propTests['device-pixel-ratio'] = dpr;
    
    /**
     * Response.resize
     *
     */
     
    function resize(fn, namespace) {
        var name = 'resize';
        name = !namespace ? name : namespaceIt(name, namespace);
        $win.on(name, fn);
        return Response; // chainable
    }
    
    /**
     * Response.crossover
     *
     */
    
    function crossover(fn, prop) {
        var eventCrossover = event.crossover
          , eventToFire = prop ? prop + eventCrossover : eventCrossover;
        $win.on(eventToFire, fn);
        return Response; // chainable
    }

    /**
     * Response.action           A hook for calling functions on both the ready and resize events.
     *
     * @link     http://responsejs.com/#action
     * @since    0.1.3
     * @param    callback|array  action  is the callback name or array of callback names to call.
     *
     * @example  Response.action(myFunc1);            // call myFunc1() on ready/resize
     * @example  Response.action([myFunc1, myFunc2]); // call myFunc1(), myFunc2() ...
     */
         
    function action(fnOrArr) {
        route(fnOrArr, function (fn) {
            ready(fn);
            resize(fn);
        });
        return Response; // chainable
    }
    
    /**
     * Response.create()              Create their own Response attribute sets, with custom 
     *                                breakpoints and data-* names.
     * @since    0.1.9
     *
     * @param    object|array   args   is an options object or an array of options objects.
     *
     * @link     http://responsejs.com/#create
     *
     * @example  Ideally this method is only called once:
     *           To create a single set,  use the form:  Response.create(object);
     *           To create multiple sets, use the form:  Response.create([object1, object2]); 
     */

    function create(args) {

        route(args, function (options) {

            options === Object(options) || doError('create @args');

            var elemset = objectCreate(Elemset).configure(options)
              , lowestNonZeroBP
              , verge = elemset.verge
              , breakpoints = elemset.breakpoints
              , scrollName = namespaceIt('scroll')
              , resizeName = namespaceIt('resize')
            ;

            if ( !breakpoints.length ) { return; }    // Quit if there are zero breakpoints.

            // Identify the lowest nonzero breakpoint. (They're already sorted low to high by now.)
            lowestNonZeroBP = breakpoints[0] || breakpoints[1] || false;
        
            ready(function() {                  // Ready. Yea mofo.

                var allLoaded = event.allLoaded
                  , lazy = !!elemset.lazy;

                // Target elements containing this set's Response data attributes and chain into the 
                // loop that occurs on ready. The selector is cached to elemset.$e for later use.

                forEach(elemset.target().$e, function(el, i) {
                    elemset[i] = objectCreate(elemset).prepareData(el);// Inherit from elemset
                    if (!lazy || inViewport(elemset[i].$e, verge)) {
                        // If not lazy update all the elems in the set. If
                        // lazy, only update elems in the current viewport.
                        elemset[i].updateDOM(); 
                    }
                });

                function resizeHandler() {   // Only runs for dynamic props.
                    elemset.reset();
                    forEach(elemset.$e, function(el, i) {// Reset memoize cache and then loop thru the set.
                        elemset[i].decideValue().updateDOM(); // Grab elem object from cache and update all.
                    }).trigger(allLoaded);
                }

                // device-* props are static and only need to be tested once. The others are
                // dynamic, meaning they need to be tested on resize. Also if a device so small
                // that it doesn't support the lowestNonZeroBP then we don't need to listen for 
                // resize events b/c we know the device can't resize beyond that breakpoint.

                if (elemset.dynamic && lowestNonZeroBP < screenMax) {
                   resize(resizeHandler, resizeName);
                }

                // We don't have to re-decide the content on scrolls because neither the viewport or device
                // properties change from a scroll. This setup minimizes the operations binded to the scroll 
                // event. Once everything in the set has been swapped once, the scroll handler is deactivated
                // through the use of a custom event.

                if ( !lazy ) { return; }

                function scrollHandler() {
                    forEach(elemset.$e, function(el, i) {
                        if (inViewport(elemset[i].$e, verge)) {
                            elemset[i].updateDOM();
                        }
                    });
                }

                $win.on(scrollName, scrollHandler);
                elemset.$e.one(allLoaded, function() {
                    $win.off(scrollName, scrollHandler);
                });

            });//ready
        });//route
        return Response; // chainable
    }//create
        
    // Handler for adding inx/inY/inViewport to $.fn (or another prototype).
    function exposeAreaFilters(engine, proto) {
        forEach(['inX', 'inY', 'inViewport'], function(methodName) {
            proto[methodName] = function(verge, invert) {
                return engine(sift(this, function(el) {
                    return el && !invert === Response[methodName](el, verge); 
                }));
            };
        });
    }
    
    /**
     * Response.chain
     * @since 0.3.0
     * Expose chainable methods to jQuery.
     */

    function chain(engine, proto) {
        if (!chain.on) {
            proto = proto || $.fn;
            engine = engine || $;
            
            // Expose .dataset() and .deletes() to jQuery:
            proto.dataset = datasetChainable;
            proto.deletes = deletesChainable;
            
            // Expose .inX() .inY() .inViewport()
            exposeAreaFilters(engine, proto);
            
            chain.on = 1; // Prevent running more than once.
        }
        return Response; // chainable
    }

    Response = { // Expose these as props/methods on Response:
        deviceMin: function() { 
            return screenMin; 
        }
      , deviceMax: function() {
            return screenMax; 
        }
      , sets: function(prop) {
            return $(selectify(sets[prop] || sets.all));
        }
      , chain: chain
      , create: create
      , addTest: addTest
      , datatize: datatize
      , camelize: camelize
      , render: render
      , store: store
      , access: access
      , target: target
      , overflowX: overflowX
      , overflowY: overflowY
      , object: objectCreate
      , crossover: crossover
      , action: action
      , resize: resize
      , ready: ready
      , affix: affix
      , sift: sift
      , dpr: dpr
      , deletes: deletes
      , scrollX: scrollX
      , scrollY: scrollY
      , deviceW: deviceW
      , deviceH: deviceH
      , device: device
      , inX: inX
      , inY: inY
      , route: route
      , merge: merge
      , media: media
      , wave: wave
      , band: band
      , map: map
      , each: forEach
      , inViewport: inViewport
      , dataset: dataset
      , viewportH: viewportH
      , viewportW: viewportW
      // jsperf.com/object-order-lookup/2
    };// Response

    /**
     * Initialize
     */

    ready(function(customData) {
        customData = dataset(doc.body, 'responsejs'); // Read data-responsejs attr.            
        if ( customData ) {
            var supportsNativeJSON = window.JSON && JSON.parse;
            customData = supportsNativeJSON ? JSON.parse(customData) : $.parseJSON ? $.parseJSON(customData) : {};
            if ( customData.create ) {
                create(customData.create); 
            }
        }
        // Remove .no-responsejs class from html tag (if it's there) and add .responsejs
        docElem.className = docElem.className.replace(/(^|\s)(no-)?responsejs(\s|$)/, '$1$3') + ' responsejs ';
    });

    return Response;  // Bam!

}( window )); // Watch @link vimeo.com/12529436

/*jslint browser: true, white: true, plusplus: true, regexp: true, maxerr: 50, indent: 4 */