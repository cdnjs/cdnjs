/*!
 * Response (jQuery responsive design toolkit)
 * http://responsejs.com
 * (c) 2011 Ryan Van Etten
 * @license  Dual MIT/BSD
 * @version  0.2.9
 * @requires jQuery 1.4.3+
 */

window.Response = (function($, window, document, undefined) {

    "use strict"; // invoke strict mode
    
    // Combine local vars/funcs into one statement:
    
    var Response = {}            // declare object
    
        // Cache selectors:
      , $window = $(window)
      , $document = $(document)
      
        // Custom breakpoints override these defaults. Custom breakpoints can be entered
        // in any order. They get sorted highest to lowest by sortNums, but the defaults 
        // here are presorted so that we can skip the need to sort when using the defaults.
        // Omit trailing decimal zeros, b/c for example if you put 1.0 as a devicePixelRatio
        // breakpoint, then the target would be data-pre1 (NOT data-pre1.0) so drop the zeros.
      , defaultBreakpoints = {
              width: [1281, 1025, 961, 641, 481, 320, 0]     // recommended (ideal for 960 grids)
            , height: [481, 0]                               // 801 seems like a good one too
            , devicePixelRatio: [2, 1.5, 1]                  // common ratios (omit trailing zeros)
        }
       
      , doError = function(msg) { 
            // Error handling. (Throws exception.)
            // Devs can use Ctrl+F to find @errors
            throw 'Error in use of Response.' + msg; 
        }
        
      , isNumber = function(anyType) {
            return typeof anyType === 'number'; // boolean
        }
    
      , sortNums = function(arr) {
            // Sort an array of numbers from highest to lowest. Array should be all numeric. If not, throw exception.
            if ( !$.isArray(arr) ) { return undefined; } // Return undefined if arr is not an array.
            var L = arr.length; // Count # values in arr.
            arr = $.map(arr, function(v) {if (isNumber(v)) {return v;}}); // Remove non-numbers.
            if (L !== arr.length) { doError('create @breakpoints'); } // Throw error if arr had non-numeric values.
            return arr.sort( function(a, b) {return (b - a); } ); // Sort highest to lowest.
        }
        
      , getDefaults = function(prop) {
            // Get default breakpoints for the specified prop.
            var lastChar = prop[prop.length - 1]; // Get last character of prop.
            // The last char makes it easy to handle prefixed props (e.g. device-width) just like the non-prefixed one.
            return 'h' === lastChar ? defaultBreakpoints.width : ('t' === lastChar ? defaultBreakpoints.height : defaultBreakpoints.devicePixelRatio);
        }
        
     , getTest = function(prop) {
            // Identify the test needed for specified prop.
            var len = prop.length // Count # chars in prop.
              , tests = []
            ;
            //    #     METHOD                   PROP
            tests[5]  = Response.band;        // width
            tests[6]  = Response.wave;        // height
            tests[12] = Response.device.band; // device-width
            tests[13] = Response.device.wave; // device-height
            tests[19] = Response.dpr;         // device-pixel-ratio
            if ( tests[len] ) { return tests[len]; }
            else { doError('create @prop'); }
        }

        // Techically custom data attr keys can contain uppercase in HTML, but, b/c the DOM lowercases them, they need
        // to be lowercase regardless when we target them in jQuery. So here we force them to lowercase from the start. 
        // We're removing all punc marks except for dashes, underscores, and periods. While some others may be valid, 
        // they may cause issues when when we try to target them. (Periods are escaped later in Response.target)
        // Rules @link dev.w3.org/html5/spec/Overview.html#custom-data-attribute
      , sanitizeKey = function( key ) {
            // Allow lowercase alphanumerics, dashes, underscores, and periods:
            return key.toLowerCase().replace( /[^a-z0-9\-\_\.]/g, '' );
        }
        
        // Local boolean function for handling range comparisons @since 0.2.8
        // Returns true if curr equals min or max, or is any number in between.
      , inORout = function (curr, min, max) {
            min = min || 0; // Default min.
            return !max ? ( curr >= min ) : ( curr >= min && curr <= max );
        }
        
      , mapBool = function (arr, boolTest) { 
            // Map a boolean callback through an array and return the resulting array.
            if ( !$.isArray(arr) ) { doError('mapBool'); } // Quit if array is not an array.
            return $.map( arr, function( v ) { return boolTest(v); } ); // Array of booleans
      }
      
        // Apply the method that performs the actual swap.
      , applyActive = function(selector, value, mode) {
            return 'src' === mode ? selector.attr('src', value) : selector.html(value);
        }
        
        // Iterate through selected elems to determine and apply active value.
      , swapEach = function(mode, selector, keys, okey, breakpoints, test) {
            var bools = mapBool(breakpoints, test);
            $.each(selector, function() {
                var $this = $(this) // cache selector
                    , ovalue = $this.data(okey) // orig (no-js) value
                    , values = Response.access( $this, keys ) // array
                    , value = Response.decide ( bools, values, ovalue )
                ;
                applyActive( $this, value, mode ); // apply active value
            });
        }
        
        // Backwards compatible function for accepting args both as strings (0.2.5) and as an object (0.2.6+)
      , doCreate = function(a, b, c, d) {

            // Since 0.2.6 we only need the first arg (it should be an object).
            // Pre 0.2.5, we used strings a, b, c, d. So handle both scenarios:
            var mode = a.mode || a
              , prefix = a.prefix || b || doError('create @prefix')
              , prop = (a.mode ? a.prop : c) || 'width' // Base tests on 'width' by default.
                // Sort breakpoints if properly specified. Otherwise get defaults for that prop.
                // Throw an exception if the prop is invalid or if breakpoints are not an array.
              , breakpoints = (a.breakpoints ? sortNums(a.breakpoints) : sortNums(d)) || getDefaults(prop) || doError('create @breakpoints')
              , okey = 'o' + sanitizeKey(prefix) // Create key for fallback (orig) value.
              , keys = $.map( breakpoints, function(n) { return sanitizeKey(prefix + n); } ) // Generate data-* keys.
              , test = getTest(prop) // Identify the test callback. (Throws exception on invalid props.)
            ;
            
            $document.ready(function() {
                var selector = Response.target(keys); // Target elems with Response data atts.
                Response.store(selector, okey, mode); // Store fallback (no-js) value to data key.
                // The device-* props are static and only need to be tested once.
                // The others are dynamic and need to be tested on ready and resize.
                // If prop's 1st char is 'd' for device then we treat it as static.
                if ( 'd' !== prop[0] ) {// DYNAMIC
                    // Since we're already inside a ready function, triggering the resize handlers at
                    // the end of this next part makes it so the the swap occurs on ready *and* resize.
                    $window.resize(function() { 
                        swapEach(mode, selector, keys, okey, breakpoints, test); 
                    }).resize(); // Trigger resize handlers.
                }
                else {// STATIC
                    swapEach(mode, selector, keys, okey, breakpoints, test);
                }
            });//ready    
        }//doCreate
        
    ;// var
    
    // Define methods that get exposed on the Response object:
    // Docs for these are @link http://responsejs.com

    /**
     * Response.action()         A hook for calling functions on both the ready and resize events.
     *
     * @link     http://responsejs.com/#action
     * @since    0.1.3
     * @param    callback|array  action  is the callback name or array of callback names to call.
     *
     * @example  Response.action(myFunc1);            // call myFunc1() on ready/resize
     * @example  Response.action([myFunc1, myFunc2]); // call myFunc1(), myFunc2() ...
     */    

    Response.action = function (action) {
        var isFunction = $.isFunction(action); // Cache boolean. (We need it twice here.)
        if ( !isFunction && !$.isArray(action) ) { doError('action'); } // Quit if arg is wrong type.
        // If action is a function, execute it asap and on resize:
        if ( isFunction ) { $(function () { action(); $window.resize( action ); }); }
        // Otherwise action must be an array => execute valid functions asap and on resize:
        else { $.each(action, function() { if ( $.isFunction(this) ) { this(); $window.resize( this ); } }); }
        return action;
    };
    
    /**
     * Response.band()       Test if a min/max-width breakpoint range is active. 
     *
     * @since   0.1.1
     * @param   integer      min    is the min-width in pixels
     * @param   integer      max    is the max-width in pixels
     * @return  boolean
     * @example w/ min only:    Response.band(481)   // true when viewport width is 481px+
     * @example w/ min and max: Response.band(0,480) // true when viewport width is 0-480px
     */

    Response.band = function (min, max) {
        return inORout($window.width(), min, max);
    };
    
    /**
     * Response.wave()       Test if a min/max-height breakpoint range is active. 
     *
     * @since   0.2.9
     * @param   integer      min    is the min-height in pixels
     * @param   integer      max    is the max-height in pixels
     * @return  boolean
     * @example w/ min only:    Response.wave(481)   // true when viewport height is 481px+
     * @example w/ min and max: Response.wave(0,480) // true when viewport height is 0-480px
     */    
     
    Response.wave = function (min, max) {
        return inORout($window.height(), min, max);
    };
    
    // Device size methods are stored in an object called Response.device, and they work
    // just like the methods above except that these measure the actual physical properties 
    // of the screen rather than its viewport. They are useful for determining the maximum
    // capable size of a screen. These do NOT change when the viewport is resized.
    
    Response.device = {};        // Declare object to store device-based methods.

    /**
     * Response.device.band()       Test if a min/max-device-width range is active. 
     *
     * @since   0.2.9
     * @param   integer      min    is the min-device-width in pixels
     * @param   integer      max    is the max-device-width in pixels
     * @return  boolean
     */

    Response.device.band = function (min, max) {
        return inORout(window.screen.width, min, max);
    };
    
    /**
     * Response.device.wave()       Test if a min/max-device-height range is active. 
     *
     * @since   0.2.9
     * @param   integer      min    is the min-device-height in pixels
     * @param   integer      max    is the max-device-height in pixels
     * @return  boolean
     */

    Response.device.wave = function (min, max) {
        return inORout(window.screen.height, min, max);
    };
    
    /**
     * Response.dpr(decimal) tests if a minimum device pixel ratio is active. 
     * The arg (decimal) must be a number (not a string). 
     * @return   boolean
     * @example  Response.dpr(1.5); // true when device-pixel-ratio is 1.5+
     * @example  Response.dpr(2);   // true when device-pixel-ratio is 2+
     */
    
    Response.dpr = function(decimal) {
        decimal = decimal || 0; // default = 0
        if ( !isNumber(decimal) ) { doError('dpr'); } // Quit if decimal is not a number.     
        
        // Use .devicePixelRatio if supported. 
        // Supported by Webkit (Safari/Chrome/Android) and Presto 2.8+ (Opera) browsers.
        if ( window.devicePixelRatio ) { return window.devicePixelRatio >= decimal; } // boolean
        
        // Fallback to .matchMedia as alternative.
        // Supported by Gecko (FF6+) and more listed here:
        // @link developer.mozilla.org/en/DOM/window.matchMedia
        // -webkit-min- and -o-min- omitted (Webkit/Opera supported above.)
        // The generic min-device-pixel-ratio is expected to be added to the W3 spec.
        var mM = window.matchMedia, str = 'device-pixel-ratio:' + decimal + ')';
        if ( mM ) { return mM('(min--moz-' + str ).matches || mM( '(min-' + str ).matches; }
        
        // If neither method is supported:
        return false;
    }; 
    
    /**
     * Response.mapBool()
     * @param   array       arr
     * @param   callback    boolTest
     * @since   0.1.9
     * @return  array of booleans
     */
    // INTERNAL USE ONLY. To be depreciated in 0.3.0
    Response.mapBool = function (arr, boolTest) { 
        return mapBool(arr, boolTest); 
    };
    
    /**
     * Response.store()
     * @since 0.1.9
     * Store a data value on each elem targeted by a jQuery selector. We use this for storing an 
     * elem's orig (no-js) state. This gives us the ability to return the elem to its orig state.
     * @param selector (required) is the jQuery selector.
     * @param key (required) is the key for the value we want to store with @link api.jquery.com/data/
     * @param mode (required) should be 'src' or 'markup' (default)
     */
    
    Response.store = function (selector, key, mode) {
        if ( !selector || !key ) { doError('store'); } // Quit if req'd args are missing.
        return $.each(selector, function() { 
            var value = 'src' === mode ? $(this).attr('src') : $(this).html();
            $.data(this, key, value);
        });
    };

    /**
     * Response.target()           Get the corresponding data attributes for an array of data keys.
     * @since    0.1.9
     * @param    array     keys    is the array of data keys whose attributes you want to select.
     * @return   jQuery selector
     * @example  Response.target(['a', 'b', 'c'])  //  $('[data-a],[data-b],[data-c]')
     */
    
    Response.target = function(keys) {
        // The .replace is needed to escape periods. @link github.com/jquery/sizzle/issues/76
        var target = $.map( keys, function( key ) { return '[data-' + key.replace( /\./g, '\\.' ) + ']'; } );
        return $( target.join() );
    };
    
    /**
     * Response.access()        Access data-* values for element(s) from an array of data-* keys. 
     * @since 0.1.9
     * @param    selector       is the jQuery selector for elems you want to target.
     * @param    keys           is an array of data keys whose values you want to access.
     * @return   array          is an array of values corresponding to each key.
     */
    
    Response.access = function(selector, keys) {
        if ( !selector || !$.isArray(keys) ) { return undefined; } // Quit if keys is not an array.
        return $.map( keys, function(key) { return selector.data(key) || ''; } ); // Return array of values.
    };
    
    /**
     * Response.decide()
     * @since 0.1.9
     * stackoverflow.com/questions/7424757/loop-arrays-to-set-value-vals0-vals1-vals2-in-jquery
     */
    // INTERNAL USE ONLY for now. Subject to change.
    Response.decide = function(bools, values, fallback) {
        // The args here are two arrays and a fallback value.
        // We use a series of if/elseif checks to zero in on the proper value.
        var value
          , i = 0
          , bL = bools.length
          , vL = values.length
        ;
        if ( bL !== vL ) { doError('decide @length'); } // arrs must be same length
        while( !bools[i] && ++i < bL ) {};
        while( !(value = values[i]) && ++i < vL ) {};
        return value || fallback || '';
    };
     
    /**
     * Response.create()          Create their own Response attribute sets, with custom 
     *                            breakpoints and data-* names.
     * @since   0.1.9
     * @link    http://responsejs.com/#create
     */
     
    Response.create = function(a, b, c, d) {         // See doCreate()
        if ( !a ) { doError('create @arg1'); }
        return $.isArray(a) ? $.map( a, function(ukn) { doCreate( ukn ); } ) : doCreate(a, b, c, d);
    };
    
    // If body tag contains custom data (data-responsejs), parse it as JSON.
    // If there's a "create" prop in the object, pass it to Response.create().
    // This needs to be in a ready func in order to make it work when Response
    // is loaded in the head, b/c we can't read the data attr until it's there.
    $document.ready(function() {
        var customData = $('body').data('responsejs'); // Read data-responsejs attr.
        if ( customData ) {
            var custom = $.parseJSON(customData); 
            if (custom.create) {
                Response.create(custom.create); 
            }
        }
    });
    
    return Response; // Bam!
    
}(jQuery, window, window.document)); // no conflict wrap // self-invoking function // @link vimeo.com/12529436