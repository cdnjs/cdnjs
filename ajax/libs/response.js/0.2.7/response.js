/*!
 * RESPONSE is a lightweight, jQuery plugin, that gives designers/devs tools for producing 
 * performance-optimized, mobile-first responsive websites. It provides easy-to-use action 
 * hooks for dynamically swapping code blocks based on screen sizes and  semantic methods 
 * for progressively serving images/media via HTML5 data attributes. Response's methods are 
 * available as object properties, making them useful tools in OOP-minded custom development.
 * @author Ryan Van Etten/2011
 * @license Dual MIT/BSD license
 * @link http://responsejs.com
 * @version 0.2.7
 * @requires jQuery 1.4.3+
 */

window.Response = (function($, window, undefined) {

    "use strict"; // invoke strict mode
    
    var Response = {}           // declare object
      , $window = $(window)     // cache selector
      , $document = $(document) // cache selector
      
      , customData = $('body').data('responsejs') // Read data-responsejs attr.
      
        // Custom breakpoints override these defaults. Custom breakpoints can be entered
        // in any order. They get sorted highest to lowest by sortNums, but the defaults 
        // here are presorted so that we can skip the need to sort when using the defaults.
      , defaultBreakpoints = {
            width: [1281, 1025, 961, 641, 481, 320, 0], // recommended (ideal for 960 grids)
            devicePixelRatio: [2, 1.5, 1]                  // common ratios 
        } // Drop trailing decimal zeros. If 1.0 is used, the target attr is still data-pre1 (not data-pre1.0)
          // @link stackoverflow.com/questions/7907180/retain-precision-during-numeric-sort
        
        // Store property identifiers as local object (mainly for maintainability).
      , propHandles = {
            width: 'width',
            dpr: 'device-pixel-ratio'
        }
        
        // Error handling. (Throws exception.)
        // Devs can use Ctrl+F to find @errors
      , doError = function(msg) { 
            throw 'Error in use of Response.' + msg; 
        }
        
      , isNumber = function(anyType) {
            return typeof anyType === 'number'; // boolean
        }
    
        // Sort an array of numbers from highest to lowest. Array should be all numeric. If not, throw exception.
      , sortNums = function(arr) {
            if ( !$.isArray(arr) ) { return undefined; } // Return undefined if arr is not an array.
            var L = arr.length, arr = $.map(arr, function(v) {if (isNumber(v)) {return v;}}); // Remove non-numbers.
            if ( arr.length !== L ) { doError('create @breakpoints'); } // Throw error if arr had non-numeric values.
            return arr.sort( function(a, b) {return (b - a); } ); // Sort highest to lowest.
        }
        
        // Get (breakpoint) defaults.
      , getDefaults = function(prop) {
            return prop !== propHandles.dpr ? defaultBreakpoints.width : defaultBreakpoints.devicePixelRatio;
        }

        // Techically custom data attribute keys can contain uppercase in HTML, but, b/c the DOM lowercases them, they need 
        // to be lowercase regardless when we target them in jQuery. So here we're forcing them to lowercase from the start. 
        // We're removing all punctuation except for dashes, underscores, and periods. While some other chars may be valid, 
        // they may cause issues when when we try to target them. (Periods are escaped later in Response.target)
        // Rules @link dev.w3.org/html5/spec/Overview.html#custom-data-attribute
      , sanitizeKey = function( key ) {
            return key.toLowerCase().replace( /[^a-z0-9\-\_\.]/g, '' ); // Lowercase alphanumerics, dashes, underscores, and periods.
        }
      
        // Apply the method that performs the actual swap.
      , applyActive = function(selector, value, mode) {
            // I think we can remove this check b/c this is local now, and if a user's args are bad, we'll know before this:
            // if ( !selector || !value ) { doError('create @applyActive'); }
            return mode === 'src' ? selector.attr( 'src', value ) : selector.html(value);
        }
        
        // Iterate through selected elems to determine and apply active value.
      , swapEach = function(mode, selector, keys, okey, bools) {
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
              , prefix = a.prefix || b
              , prop = a.mode ? a.prop : c
              , breakpoints = a.mode ? a.breakpoints : d
            ;
            if ( !mode || !prefix ) { doError('create @mode OR @prefix'); } // Throw error if req'd args are wrong.
            var prop = prop || 'width'                                      // Base tests on 'width' by default.
               // Breakpoints unspecified? Use defaults. Specified? Sort them *if* in an array. Otherwise => error.
                , breakpoints = !breakpoints ? getDefaults(prop) : sortNums(breakpoints) || doError('create @breakpoints')
              , okey = 'o' + sanitizeKey(prefix)                            // Create key for fallback (orig) value.
              , keys = $.map( breakpoints, function(n) { return sanitizeKey(prefix + n); } ) // Generate data-* keys.
            ;
            $document.ready(function() {                                 // Ready? Yea.
                var selector = Response.target(keys);                    // Target elems containing Response data atts.
                Response.store(selector, okey, mode);                    // Store fallback (no-js) value to data key.
                if ( prop === propHandles.width ) {                      // Check if prop is width. (Most likely.)
                    var test = Response.band;                            // Store test as local outside of resize function.
                    $window.resize(function() {                          // Actions inside this happen on ready and resize.
                        var bools = Response.mapBool(breakpoints, test); // Use Response.band to test each breakpoint.
                        swapEach(mode, selector, keys, okey, bools);     // Perform swap.
                    }).resize();// Trigger resize handlers.
                }
                else if ( prop === propHandles.dpr ) {                   // Check if prop is device-pixel-ratio. 
                        var bools = Response.mapBool(breakpoints, Response.dpr); // Use Response.dpr to test each breakpoint.
                        swapEach(mode, selector, keys, okey, bools);     // Perform swap.
                }
                else { 
                    doError('create @prop'); 
                }
            });// Close ready function.
        }// doCreate
        
    ;// var
    
    // Response.sanitize = { key: sanitizeKey }; // May add something like this as a method in a later version.
            
    /********
    Response.action()
    @since 0.1.3
    Response.action() is an action hook for easily adding code that triggers both 
    when the DOM is ready *and* anytime the viewport (window) is resized. The arg 
    must be a function name or an array or function names. The function(s) must 
    *not* contain the () call.

            EXAMPLE
            Response.action( myfunction );
            function myfunction() { // do stuff }
            
            EXAMPLE
            Response.action( [myfunction1, myfunction2] );
            function myfunction1() { // do stuff 1 }
            function myfunction2() { // do stuff 2 }
    *****/    

    Response.action = function (action) {
        var isFunction = $.isFunction(action); // Cache boolean. (We need it twice here.)
        if ( !isFunction && !$.isArray(action) ) { doError('action'); } // Quit if arg is wrong type.
        // If action is a function, execute it asap and on resize:
        if ( isFunction ) { $(function () { action(); $window.resize( action ); }); }
        // Otherwise action must be an array => execute valid functions asap and on resize:
        else { $.each(action, function() { if ( $.isFunction(this) ) { this(); $window.resize( this ); } }); }
        return action;
    };// Response.action

    
    /********
    Response.affix()
    @since 0.2.1
    @depreciated
    Was used to create/concatenate data-* keys.
    No longer needed in 0.2.7. To be removed in later version.
    https://github.com/ryanve/response.js/issues/1
    *****/
    Response.affix = function(prefix, array, suffix) {
        if ( !prefix || !$.isArray(array) ) { doError('affix'); } // Quit if args are wrong.
        var suffix = suffix || '';
        return $.map( array, function(value) { return prefix + value + suffix; } ) // Affix each value and return array.
    };// Response.affix
    
    
    /********
    Response.band()
    @since 0.1.1
    Response.band() tests if a min/max-width breakpoint range is active. 
    The args (min, max) should be numbers in pixels. The return is boolean.
    EXAMPLE w/ min only:    Response.band(481)   // true @ 481px wide and up. 
    EXAMPLE w/ min and max: Response.band(0,480) // true @ 0-480px wide. 
    *****/
    
    Response.band = function (min, max) {
        var min = min || 0 // Default min.
          , curr = $window.width() // Current width.
          , bool = !max ? ( curr >= min ) : // No max.
                          ( curr >= min && curr <= max )
        ;
        return bool;
    };// Response.band

    /********
    Response.dpr(decimal) tests if a minimum device pixel ratio is active. 
    Returns true or false. The arg (decimal) must be a number (not a string). 
    EXAMPLE: Response.dpr(1.5); // true when device-pixel-ratio is 1.5+
    EXAMPLE: Response.dpr(2);   // true when device-pixel-ratio is 2+
    *****/
    
    Response.dpr = function(decimal) {
        var decimal = decimal || 0; // default = 0
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
    };// Response.dpr
    
    
    /********
    Response.mapBool()
    @since 0.1.9
    ##needs desc
    // output is an array of booleans
    *****/
    
    Response.mapBool = function (array, boolTest) {
        if ( !$.isArray(array) ) { doError('mapBool'); } // Quit if array is not an array.
        return $.map( array, function( v ) { return boolTest(v); } ); // Array of booleans
    };// Response.
    
    /********
    Response.store()
    @since 0.1.9
    Store a data value on each elem targeted by a jQuery selector. We use this for storing an 
    elem's orig (no-js) state. This gives us the ability to return the elem to its orig state.
    @param selector (required) is the jQuery selector.
    @param key (required) is the key for the value we want to store with @link api.jquery.com/data/
    @param mode (required) should be 'src' or 'markup' (default)
    *****/
    
    Response.store = function (selector, key, mode) {
        if ( !selector || !key || !mode ) { doError('store'); } // Quit if any of the args missing.
        return $.each(selector, function() { 
            var $this = $(this); // These two var statements need to be separate.
            var value = mode === 'src' ? $this.attr('src') : $this.html(); 
            $this.data(key, value);
        });
    };// Response.store

    /********
    Response.target()
    @since 0.1.9
    ##needs desc
    *****/
    
    Response.target = function(keys) {
        // The .replace is needed to escape periods. @link github.com/jquery/sizzle/issues/76
        var target = $.map( keys, function( key ) { return '[data-' + key.replace( /\./g, '\\.' ) + ']'; } );
        return $( target.join() );
    };// Response.target
    
    /********
    Response.access()
    Access data-* values from an array of data-* keys. 
    @since 0.1.9
    @uses jQuery's .data() method.
    @param selector (required) is the jQuery selector for elems you want to target.
    @param keys (required) is an array of data keys whose values you want to access.
    @return is an array of values corresponding to each key.

        EXAMPLE
        Imagine you have element(s) w/ multiple custom data attributes:
            <img data-custom0="value 0" data-custom1="value 1" src="example.png" alt=""/>
        #needs example
    *****/
    
    Response.access = function(selector, keys) {
        if ( !selector || !$.isArray(keys) ) { return undefined; } // Quit if keys is not an array.
        return $.map( keys, function(key) { return selector.data(key) || ''; } ); // Return array of values.
    };// Response.access
    
    /********
    Response.decide()
    @since 0.1.9
    ##needs desc
    *****/
    
    Response.decide = function(bools, values, fallback) {
        // The args here are two arrays and a fallback value.
        // We use a series of if/elseif checks to zero in on the proper value.
        // ##update desc
        if ( bools.length !== values.length ) { doError('decide @length'); } // users won't hit this, for testing only
        var value, i = 0;
        while( !bools[i] && ++i < bools.length ) {};
        while( !(value = values[i]) && ++i < values.length ) {};
        return value || fallback || '';
    }; // Response.decide

        
    /********
    Response.create()
    @since 0.1.9
    Devs can use Response.create to create their own Response attribute sets, with custom 
    breakpoints and data-* names.
    ##NEEDS DESC
    Response's attributes come in two flavors. The first works on *any* element with a 
    *src* attribute and is ideal for use with images. The second is a bit more general, 
    as it provides the ability to swap entire code blocks. Both are powerful, front-end 
    techniques for conditional resource loading. (Full attribute list coming soon.)
    EXAMPLE w/ src: <img src="lo_res.png" data-src481="med_res.png" data-src961="hi_res.png" alt=""/>                    
    EXAMPLE w/ inner markup: <div data-r641="<p>641+ markup</p>"><p>optional default markup</p></div>
    (Escape quotes in markup as needed or mix single/double quotes.)
    
            REQUIRED ARGS
            mode:        The mode can be 'markup' or 'src'
          
            prefix:      The prefix should be a lowercase string. Shorter is better. 
                         For example, setting the prefix to 'my' would create enable attributes of the form: 
                             <p data-my481="" data-my641="" ...>
                         See 3.2.3.8 in the HTML5 spec for full details on the allowable names:
                         @link dev.w3.org/html5/spec/Overview.html#embedding-custom-non-visible-data-with-the-data-attributes

            OPTIONAL ARGS
            breakpoints: Use this to set custom *min* breakpoints.
                         Defaults to [1281, 1025, 961, 641, 481, 320, 0]
                         This should be an array of numbers (not strings)
                         The array can be in any order. (It gets sorted.)                         
                         There is no limit to the number of breakpoints. Less is (slightly) faster.
                         
            prop:        This is the property that the min tests are based on.
                         Can be either 'width' or 'dpr' (dpr = device-pixel-ratio)
                         Defaults to 'width'
    
    *****/
    //Response.create = function( mode, prefix, breakpoints, prop ) {
    Response.create = function(a, b, c, d) {
        if ( !a ) { doError('create @arg1'); }
        return $.isArray(a) ? $.map( a, function(ukn) { doCreate( ukn ); } ) : doCreate(a, b, c, d);
    };// Response.create

    // If body tag contains custom data (data-responsejs), parse it as JSON.
    // If there's a "create" prop in the object, pass it to Response.create().
    if ( customData ) {
        var custom = $.parseJSON(customData); 
        if ( custom.create ) { Response.create( custom.create ); }
    }

    return Response;
    
}(jQuery, window)); // jQuery no conflict wrapper ## add Response as property of global window object