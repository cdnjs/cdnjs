/**___________________________________________________________________________________

RESPONSE is a lightweight, jQuery plugin, that gives designers/devs tools for producing 
performance-optimized, mobile-first responsive websites. It provides easy-to-use action 
hooks for dynamically swapping code blocks based on screen sizes and  semantic methods 
for progressively serving images/media via HTML5 data attributes. Response's methods are 
available as object properties, making them useful tools in OOP-minded custom development.
@author Ryan Van Etten/2011
@license Dual MIT/BSD license
@link http://responsejs.com
@version 0.2.5
___________________________________________________________________________________**/

window.Response = (function($, window, undefined) {

    "use strict"; // for error diagnosis
    
    var Response = {}, // start w/ empty object
        // cache selectors as vars:
        $window = $(window),
        $document = $(document);  
            
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

    Response.action = function ( action ) {
        // Quit if action is not a function or array.
        if ( typeof action !== 'function' && !$.isArray(action) ) { return false; }
        // If action is a function, execute it on ready and resize.
        if ( typeof action === 'function' ) { $(function () { action(); $window.resize( action ); }); } 
        // Else, we know action is an array, so iterate. Execute functions on ready and resize.
        else { $.each(action, function() {                                                        
            if ( typeof this === 'function' ) { this(); $window.resize( this ); }
        }); }
        return action;
    };// Response.action
        
    /********
    Response.band()
    @since 0.1.1
    Response.band() tests width-based media queries via .matchMedia (or faux media 
    queries via window width) to check if a min/max-width breakpoint range is active. 
    The args (min, max) should be numbers in pixels. The return is boolean.
    EXAMPLE w/ min only:    Response.band(481)   // true @ 481px wide and up. 
    EXAMPLE w/ min and max: Response.band(0,480) // true @ 0-480px wide. 
    *****/
    
    Response.band = function ( min, max ) {
        var min = min || 0    // default min: 0
          , max = max || 9999 // default max: 9999px
          , bool = ( window.matchMedia ) ? // Use matchMedia if supported. Fallback to window width.
               ( ( window.matchMedia('(min-width: ' + min + 'px) and (max-width: ' + max + 'px)').matches ? true : false ) ) :
               ( ( $window.width() >= min && $window.width() <= max ) ? true : false )
        ;       
        return bool;
    };// Response.band

    /********
    Response.dpr(decimal) tests if a minimum device pixel ratio is active. 
    Returns true or false. The arg (decimal) must be a number (not a string). 
    EXAMPLE: Response.dpr(1.5);
    EXAMPLE: Response.dpr(2);
    *****/
    
    Response.dpr = function( decimal ) {
        var decimal = decimal || 0; // default = 0
        if ( typeof decimal !== 'number' ) { return false; } // Return false if decimal is not a number.      
        
        // Use .devicePixelRatio if supported. 
        // Supported by Webkit (Safari/Chrome/Android) and Presto 2.8+ (Opera) browsers.
        else if ( window.devicePixelRatio ) { 
            return ( window.devicePixelRatio >= decimal ) ? true : false ; 
        }
        
        // Fallback to .matchMedia as alternative.
        // Supported by Gecko (FF6+) and more listed here:
        // @link developer.mozilla.org/en/DOM/window.matchMedia
        else { 
            var prefixes = ['min-', '-webkit-min-', 'min--moz-'] // -o-min- omitted (Opera supported above.)
              , open = 'all and ('
              , prop = 'device-pixel-ratio:'
              , mediaqueries = Response.affix( open, prefixes, prop + decimal.toString() + ')' )
              , bool = (  window.matchMedia  ) ?
                       (  window.matchMedia( mediaqueries[0] ).matches // generic
                       || window.matchMedia( mediaqueries[2] ).matches // moz
                       || window.matchMedia( mediaqueries[1] ).matches // webkit
                       )  ? true : false :
                      false // If neither of these methods is supported => set bool to false.
            ;
            return bool;
        }//Close else
    };// Response.dpr
    
    
    /********
    Response.mins()
    @since 0.1.9
    ##needs desc
    // output is an array of booleans
    *****/
    
    Response.mins = function ( array, prop ) {
        // Quit if array is not an array.
        if ( !$.isArray(array) ) { return false; }
        // prop 'band' or undefined => map thru Response.band:
        else if ( !prop || prop === 'band' ) { return $.map( array, function( min ) { return Response.band(min) } ); } 
        // prop 'dpr'  => map thru Response.dpr:
        else if ( prop === 'dpr' ) { return $.map( array, function( min ) { return Response.dpr(min) } ); }
        else { return false; }
    };// Response.mins

    
    /********
    Response.store()
    @since 0.1.9
    Traverse the DOM and store ##needs desc
    *****/
    
    Response.store = function ( selector, key, mode ) {
        if ( !selector || !key || !mode ) { return false; } // Quit if any of the args missing.
        return $.each(selector, function() { 
        var $this = $(this); 
        var value = ( mode === 'src' ) ? $this.attr('src') : $this.html(); 
        $this.data( key, value ); 
        });
    };// Response.store

    /********
    Response.target()
    @since 0.1.9
    ##needs desc
    *****/
    
    Response.target = function( keys ) {
        var target = $.map( keys, function(key) { return '[data-' + key + ']'; } )
          , target = $( target.join() );
        return target;
    };// Response.target
    
    /********
    Response.access()
    @since 0.1.9
    @uses jQuery's .data() method.
    Access data-* values from an array of data-* keys. 
    The required arg is an array of data keys to access.
    The output is an array containing each key's value.

        EXAMPLE
        Imagine you have element(s) w/ multiple custom data attributes:
            <img data-custom0="value 0" data-custom1="value 1" src="example.png" alt=""/>
        Then you'd use the line below to save each attribute's *value* to an array:
            var myArray = Response.access( 'custom0', 'custom1'); 
        and...:
            myArray[0] would equal 'value 0'
            myArray[1] would equal 'value 1'        
    *****/
    
    Response.access = function( selector, keys ) {
        if ( !$.isArray(keys) ) { return false; } // Quit if keys is not an array.
        var values = $.map( keys, function(key) { return selector.data(key) || ''; } );
        return values;
    };// Response.access
    
    
    /********
    Response.decide()
    @since 0.1.9
    ##needs desc
    *****/
    
    Response.decide = function( bools, values, fallback ) {
        // The args here are two arrays and a fallback value.
        // We use a series of if/elseif checks to zero in on the proper value.
        // ##update desc
        var value, i = 0;
        while( !bools[i] && ++i < bools.length ) {};
        while( !(value = values[i]) && ++i < values.length ) {};
        return value || fallback || '';
    }; // Response.decide

    
    /********
    Response.send()
    @since 0.1.9
    ##needs desc
    *****/
    
    Response.send = function( selector, value, mode ) {
        if ( !selector || !value ) { return false; }
        var send = ( mode === 'src' ) ? selector.attr( 'src', value ) : selector.html(value);
        return send;
    }; // Response.send
    
    
    /********
    Response.swap()
    @since 0.1.9
    ##needs desc
    *****/
    Response.swap = function( mode, selector, keys, okey, bools ) {
        $.each(selector, function() {    
            var $this = $(this) // cache selector
                , ovalue = $this.data(okey)
                , values = Response.access( $this, keys )
                , value = Response.decide ( bools, values, ovalue )
            ;
            Response.send( $this, value, mode ); // apply swap
        });
    };// Response.swap


    
    /********
    Response.format()
    @since 0.2.1
    ##needs desc
     // Sort breakpoint array from highest to lowest.
     // Remove non-numeric breakpoints.
    *****/
    Response.format = function( array, sort ) {
        if ( !$.isArray(array) ) { return false; } // Quit if array is not an array.
        var sort = sort || 'desc'; // Default sort order = descending = highest to lowest.
        ( sort === 'asc' ) ? array.sort( function( a, b ) {return (a - b) } ) : array.sort( function( a, b ) {return (b - a) } );
        return $.map( array, function(item) { if ( typeof item === 'number' ) { return item; } } ) // Remove non-numeric array items.
    };// Response.format
    
    
    /********
    Response.affix()
    @since 0.2.1
    ##needs desc
     // used to create data-* keys.
    *****/
    Response.affix = function( prefix, array, suffix ) {
        if ( !prefix || !$.isArray(array) ) { return false; } // Quit if args are wrong.
        var suffix = suffix || '';
        return $.map( array, function(value) { return prefix + value + suffix; } ) // Affix each value and return array.
    };// Response.affix
    
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
    Response.create = function( mode, prefix, breakpoints, prop ) {
        if ( !mode || !prefix ) { return false; }                  // Quit if required args are missing.
        var prop = prop || 'width'                                 // Tests are based on 'width' by default.
          , defaults = ( prop === 'dpr' ) ? [2, 1.5, 1] : [1281, 1025, 961, 641, 481, 320, 0] // 'dpr' defaults : 'width' defaults
          , breakpoints = Response.format(breakpoints) || defaults // Format breakpoints. Use defaults if none are set.+
          , prefix = prefix.toLowerCase()                          // Force lowercase. (Custom data attribute keys cannot use uppercase.)
          , okey = 'o' + prefix                                    // Create key for fallback value. (o stands for original.)
          , keys = Response.affix( prefix, breakpoints )           // Generate data-* keys.
        ;
        $document.ready(function() {
            var selector = Response.target(keys);                  // Target elements containing Response data attributes.
            Response.store(selector, okey, mode);                  // Store fallback value to data key.
            $window.resize(function() {                            // Start resize function. (These actions trigger on ready and resize.)
                var mins = Response.mins(breakpoints);             // Test each breakpoint. (Response.mins returns an array of booleans.)
                Response.swap( mode, selector, keys, okey, mins ); // Send args to Response.swap and perform swap.
            }).resize();// Trigger resize handlers.
        });// Close ready function.
    };// Response.create

    return Response;
    
}(jQuery, window)); // jQuery no conflict wrapper ## add Response as property of global window object


/********
Response :: Customize your build
## NEEDS DESC
Use these defaults or create your own.
(see the Response.create source for documentation on how to use)
*****/
Response.create('markup', 'r'); // Create markup mode functionalty for (default) data-r* attributes.
Response.create('src', 'src');  // Create src mode functionalty set for (default) data-src* attributes.
