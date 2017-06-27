/*!
 * Microbe JavaScript Library v0.4.13
 * http://m.icro.be
 *
 * Copyright 2014-2015 Sociomantic Labs and other contributors
 * Released under the MIT license
 * http://m.icro.be/license
 *
 * Date: Sat Nov 28 2015
 */
!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var f;"undefined"!=typeof window?f=window:"undefined"!=typeof global?f=global:"undefined"!=typeof self&&(f=self),f.µ=e()}}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/**
 * ## Microbe
 *
 * Builds the Microbe object
 *
 * @author  Mouse Braun         <mouse@knoblau.ch>
 * @author  Nicolas Brugneaux   <nicolas.brugneaux@gmail.com>
 *
 * @package Microbe
 */
 /*jshint globalstrict: true*/
'use strict';

var _type       = '[object Microbe]';
var _version    = '0.4.13-selectorEngine';


var Microbe = function( selector, scope, elements )
{
    return new Microbe.core.__init__( selector, scope, elements );
};


require( './selectorEngine/init' )( Microbe, _type );


Microbe.version     = Microbe.core.__init__.prototype.version = _version;
module.exports      = Microbe.core.constructor = Microbe;

},{"./selectorEngine/init":4}],2:[function(require,module,exports){
/**
 * array.js
 *
 * methods based on the array prototype
 *
 * @author  Mouse Braun         <mouse@knoblau.ch>
 * @author  Nicolas Brugneaux   <nicolas.brugneaux@gmail.com>
 *
 * @package Microbe
 */

 /*jshint globalstrict: true*/
'use strict';
module.exports = function( Microbe )
{
    Microbe.core.every          = Array.prototype.every;
    Microbe.core.findIndex      = Array.prototype.findIndex;
    Microbe.core.each           = Array.prototype.forEach;
    Microbe.core.forEach        = Array.prototype.forEach;
    Microbe.core.includes       = Array.prototype.includes;
    Microbe.core.indexOf        = Array.prototype.indexOf;
    Microbe.core.lastIndexOf    = Array.prototype.lastIndexOf;
    Microbe.core.map            = Array.prototype.map;
    Microbe.core.pop            = Array.prototype.pop;
    Microbe.core.push           = Array.prototype.push;
    Microbe.core.reverse        = Array.prototype.reverse;
    Microbe.core.shift          = Array.prototype.shift;
    Microbe.core.slice          = Array.prototype.slice;
    Microbe.core.some           = Array.prototype.some;
    Microbe.core.sort           = Array.prototype.sort;
    Microbe.core.unshift        = Array.prototype.unshift;

    /*
     * needed to be modified slightly to output a microbe
     */
    Microbe.core.splice         = function( start, deleteCount )
    {
        return this.constructor( Array.prototype.splice.call( this, start, deleteCount ) );
    };
};

},{}],3:[function(require,module,exports){
/**
 * pseudo.js
 *
 * @author  Mouse Braun         <mouse@knoblau.ch>
 * @author  Nicolas Brugneaux   <nicolas.brugneaux@gmail.com>
 *
 * @package Microbe
 */
var _cleanArray = function( _r ){ return !!( _r ); };

module.exports = function( Microbe )
{
    'use strict';

    /**
     * ## children
     *
     * Gets a microbe of all the given element's children
     *
     * @param {String} selector css selector string filter
     *
     * @example µ( '.example' ).children();
     * @example µ( '.example' ).children( 'div' );
     *
     * @return _Array_  array of microbes (value)
     */
    Microbe.core.children = function( selector )
    {
        var _constructor = this.constructor;

        var _children = function( _el )
        {
            _el = _constructor( _el.children );

            if ( typeof selector === 'string' )
            {
                return _el.filter( selector );
            }

            return  _el;
        };

        return this.map( _children );
    };


    /**
     * ## childrenFlat
     *
     * Gets an microbe of all children of all element's given
     *
     * @param {String} selector css selector string filter
     *
     * @example µ( '.example' ).childrenFlat();
     * @example µ( '.example' ).childrenFlat( 'div' );
     *
     * @return _Microbe_ value array of combined children
     */
    Microbe.core.childrenFlat = function( selector )
    {
        var i = 0, childrenArray = [];

        var _childrenFlat = function( _el )
        {
            var arr         = _el.children;
            var arrLength   = arr.length;

            for ( var j = 0; j < arrLength; j++ )
            {
                childrenArray[ i ] = arr[ j ];
                i++;
            }
        };

        this.each( _childrenFlat );

        var _el = this.constructor( childrenArray );

        if ( typeof selector === 'string' )
        {
            return _el.filter( selector );
        }

        return _el;
    };


    /**
     * ## filter
     *
     * Filters the microbe by the given given selector or function.  In the case
     * of a function, the element is passed as this. The inclusion on an element
     * into the set is based on the return of the function
     *
     * @param {Mixed} selector selector or function to filter by
     *
     * @example µ( '.example' ).filter( 'div' );
     * @example µ( '.example' ).filter( function( _el ){ return _el.tagName === 'div'; } );
     *
     * @return _Microbe_ new microbe containing only the filtered values
     */
    Microbe.core.filter = function( filter )
    {
        var pseudo, filters, self = this, _el, method;

        if ( this.length === 0 )
        {
            return this;
        }

        if ( typeof filter === 'function' )
        {
            var res = [];

            for ( var i = 0, lenI = this.length; i < lenI; i++ )
            {
                res[ i ] = filter.call( this[ i ], i ) ? this[ i ] : null;
            }
            res = res.filter( _cleanArray );

            return this.constructor( res );
        }
        else
        {
            var _filter = function( _f, _self, i )
            {
                if ( Microbe.pseudo[ _f[ 0 ] ] )
                {
                    return Microbe.pseudo[ _f[ 0 ] ]( _self, _f[ 1 ] );
                }
                else
                {
                    var resArray = [], _selector;
                    _selector = i === 0 ? _f[ 0 ] : ':' + _f[ 0 ];
                    if ( _selector !== '' )
                    {
                        if ( _f[ 1 ] !== '' )
                        {
                            _selector += '(' + _f[ 1 ] + ')';
                        }
                        for ( var j = 0, lenJ = _self.length; j < lenJ; j++ )
                        {
                            _el = _self[ j ];
                            resArray[ j ] = Microbe.matches( _el, _selector ) === true ? _el : null;
                        }
                        resArray = resArray.filter( _cleanArray );
                    }

                    return new Microbe( resArray );
                }
            };

            if ( filter && filter.indexOf( ':' ) !== -1 )
            {
                pseudo  = filter.split( ':' );
                filters = [ [ pseudo.splice( 0, 1 ).toString(), '' ] ];

                var _p, pseudoArray;

                for ( var h = 0, lenH = pseudo.length; h < lenH; h++ )
                {
                    _p = pseudo[ h ];

                    if ( _p.indexOf( '(' ) !== - 1 )
                    {
                        _p      = _p.split( '(' );
                        _p[ 1 ] = _p[ 1 ].replace( ')', '' );
                    }
                    else
                    {
                        _p      = [ _p, '' ];
                    }

                    filters.push( _p );
                }
            }
            else if ( filter )
            {
                filters = [ [ filter, '' ] ];
            }
            else
            {
                return this;
            }

            for ( var k = 0, lenK = filters.length; k < lenK; k++ )
            {
                if ( self.length !== 0 )
                {
                    if ( filters[ k ][ 0 ] !== '' )
                    {
                        self = _filter( filters[ k ], self, k );
                    }
                }
                else
                {
                    return self;
                }
            }

            return self;
        }
    };


    /**
     * ## find
     *
     * Finds a child element with the given selector inside the scope of the current microbe
     *
     * @param {String} selector            selector to search for
     *
     * @example µ( '.example' ).find( 'div' );
     *
     * @return _Microbe_ new microbe containing only the found children values
     */
    Microbe.core.find = function( _selector )
    {
        var _s          = _selector[ 0 ];

        if ( _s === ' ' )
        {
            _selector   = _selector.trim();
            _s          = _selector[ 0 ];
        }

        if ( _s === '>' )
        {
            _selector = _selector.slice( 1 ).trim();
            return this.childrenFlat().filter( _selector );
        }
        else if ( _s === '~' )
        {
            _selector = _selector.slice( 1 ).trim();
            return this.siblingsFlat().filter( _selector );
        }
        else if ( _s === '!' )
        {
            return this.parent();
        }
        else if ( _s === '+' )
        {
            _selector       = _selector.slice( 1 ).trim();
            var resArray    = [],
                _el, els    = this.children();

            for ( var i = 0, lenI = els.length; i < lenI; i++ )
            {
                _el = els[ i ][ 0 ];

                resArray[ i ] = _el ? _el : null;
            }

            resArray.filter( _cleanArray );

            return new Microbe( resArray ).filter( _selector );
        }
        else if ( _selector.indexOf( ':' ) !== -1 )
        {
            return this.constructor( _selector, this );
        }

        var _children = new Microbe( _selector ), res = [], r = 0;

        for ( var j = 0, lenJ = this.length; j < lenJ; j++ )
        {
            for ( var k = 0, lenK = _children.length; k < lenK; k++ )
            {
                if ( Microbe.contains( _children[ k ], this[ j ] ) )
                {
                    res[ r ] = _children[ k ];
                    r++;
                }
            }
        }

        return this.constructor( res );
    };


    /**
     * ## first
     *
     * gets the first Element and wraps it in Microbe.
     *
     * @example µ( '.example' ).first();
     *
     * @return _Microbe_ new Microbe containing only the first value
     */
    Microbe.core.first = function()
    {
        if ( this.length !== 0 )
        {
            return this.constructor( this[ 0 ] );
        }

        return this.constructor( [] );
    };


    /**
     * ## last
     *
     * Gets the last Element and wraps it in Microbe.
     *
     * @example µ( '.example' ).last();
     *
     * @return _Microbe_ new microbe containing only the last value
     */
    Microbe.core.last = function()
    {
        var len = this.length;

        if ( len === 1 )
        {
            return this;
        }
        else if ( len !== 0 )
        {
            return this.constructor( this[ len - 1 ] );
        }

        return this.constructor( [] );
    };


    /**
     * ## parent
     *
     * gets all elements in a microbe's parent nodes
     *
     * @example µ( '.example' ).parent();
     *
     * @return _Microbe_ new microbe containing parent elements (index-preserved)
     */
    Microbe.core.parent = function()
    {
        var _parent = function( _el )
        {
            return _el.parentNode;
        };

        var i, len, parentArray = new Array( this.length );

        for ( i = 0, len = this.length; i < len; i++ )
        {
            parentArray[ i ] = _parent( this[ i ] );
        }

        return this.constructor( parentArray );
    };


    /**
     * ## siblings
     *
     * Gets an microbe of all of each given element's siblings
     *
     * @param {String} selector css selector string filter
     *
     * @example µ( '.example' ).siblings();;
     * @example µ( '.example' ).siblings( 'div' );
     *
     * @return _Array_ array of microbes (value)
     */
    Microbe.core.siblings = function( selector )
    {
        var _constructor = this.constructor;

        var _siblings = function( _el )
        {
            var res     = [], r = 0;
            var sibling = _el.parentNode.firstElementChild;
            for ( ; sibling; )
            {
                if ( sibling !== _el )
                {
                    res[ r ] = sibling;
                    r++;
                }
                sibling = sibling.nextElementSibling;
                if ( !sibling )
                {
                    res = _constructor( res );

                    if ( typeof selector === 'string' )
                    {
                        return res.filter( selector );
                    }

                    return res;
                }
            }
        };

        return this.map( _siblings );
    };


    /**
     * ## siblingsFlat
     *
     * Gets an microbe of all siblings of all element's given. 'next' and 'prev'
     * passed as direction return only the next or previous siblings of each element
     *
     * @param {String} direction direction modifier (optional)
     *
     * @example µ( '.example' ).siblingsFlat();
     * @example µ( '.example' ).siblingsFlat( 'div' );
     *
     * @return _Microbe_ value array of combined siblings
     */
    Microbe.core.siblingsFlat = function( selector )
    {
        var i = 0, siblingsArray = [];
        var isSiblingConnector = ( selector === '+' || selector === '~' );

        var _siblingsFlat = function( _el )
        {
            var sibling = _el;

            if ( !isSiblingConnector )
            {
                sibling = _el.parentNode.firstElementChild;
            }
            else
            {
                sibling = _el.nextElementSibling;
            }

            for ( ; sibling; )
            {
                if ( sibling !== _el && siblingsArray.indexOf( sibling ) === -1 )
                {
                    siblingsArray[ i ] = sibling;
                    i++;
                }
                sibling = sibling.nextElementSibling;

                if ( !sibling || selector === '+' )
                {
                    break;
                }
            }
        };

        this.each( _siblingsFlat );

        var _el = this.constructor( siblingsArray );

        if ( typeof selector === 'string' && !isSiblingConnector )
        {
            return _el.filter( selector );
        }

        return _el;
    };


    /**
     * ## toString
     *
     * Methods returns the type of Microbe.
     *
     * @example µ( '.example' ).toString();
     *
     * @return _String_
     */
    Microbe.core.toString = function()
    {
        return this.type;
    };
};
},{}],4:[function(require,module,exports){
/**
 * Microbe.js
 *
 * @author  Mouse Braun         <mouse@knoblau.ch>
 * @author  Nicolas Brugneaux   <nicolas.brugneaux@gmail.com>
 *
 * @package Microbe
 */

var slice = Array.prototype.slice;

module.exports = function( Microbe, _type )
{
    'use strict';

    Microbe.core        = {};
    var trigger, _shortSelector;

    var selectorRegex = Microbe.prototype.__selectorRegex =  /(?:[\s]*\.([\w-_\.]+)|#([\w-_]+)|([^#\.:<][\w-_]*)|(<[\w-_#\.]+>)|:([^#\.<][\w-()_]*))/g;

    // TODO: Check if we hit the duck

    /**
     * ## _build
     *
     * Builds and returns the final Microbe
     *
     * @param {Array} _elements array of elements
     * @param {String} _selector selector
     *
     * @return _Microbe_ Microbe wrapped elements
     */
    function _build( _elements, self )
    {
        var i = 0, lenI = _elements.length;

        for ( ; i < lenI; i++ )
        {
            self[ i ]           = _elements[ i ];
        }

        self.length     = i;

        return self;
    }


    /**
     * ## _create
     *
     * Method creates Microbe from a passed string, and returns it
     *
     * @param {String} _el element to create
     * @param {Object} this reference to pass on to _build
     *
     * @return _Microbe_
     */
    function _create( _el, self )
    {
        var resultsRegex    = _el.match( selectorRegex ),
            _id = '', _tag = '', _class = '';

        var i = 0, lenI = resultsRegex.length;
        for ( ; i < lenI; i++ )
        {
            var trigger = resultsRegex[ i ][ 0 ];
            switch ( trigger )
            {
                case '#':
                    _id     += resultsRegex[ i ];
                    break;

                case '.':
                    _class  += resultsRegex[ i ];
                    break;

                default:
                    _tag    += resultsRegex[ i ];
                    break;
            }
        }

        if ( typeof _tag === 'string' )
        {
            _el = document.createElement( _tag );

            if ( _id )
            {
                _el.id = _id.slice( 1 );
            }

            if ( _class )
            {
                _class = _class.split( '.' );

                for ( i = 1, lenI = _class.length; i < lenI; i++ )
                {
                    _el.classList.add( _class[ i ] );
                }
            }

        }

        return _build( [ _el ], self );
    }


    /**
     * ## _createHtml
     *
     * Method creates a Microbe from an html string, and returns it
     *
     * @param {String} _el element to create
     * @param {Object} this reference to pass on to _build
     *
     * @return _Microbe_
     */
    function _createHtml( _el, self )
    {
        var _ghost          = document.createElement( 'div' );
        _ghost.innerHTML    = _el;
        _el                 = slice.call( _ghost.children );

        for ( var i = 0, lenI = _el.length; i < lenI; i++ )
        {
            _ghost.removeChild( _el[ i ] );
        }

        return _build( _el, self );
    }


    /**
     * ## _css4StringReplace
     *
     * translates css4 strings
     *
     * @param {String} _string pre substitution string
     *
     * @return _String_ post substitution string
     */
    function _css4StringReplace( _string )
    {
        if ( _string.indexOf( '>>' ) !== -1 )
        {
            _string = _string.replace( />>/g, ' ' );
        }
        if ( _string.indexOf( '!' ) !== -1 )
        {
            _string = _string.replace( /!/g, ':parent' );
        }

        return _string;
    }


    /**
     * ## _noScopeSimple
     *
     * if ther is no scope and there is only a simple selector
     *
     * @param {String} _s   selector string
     * @param {Object} self this empty Microbe
     *
     * @return _Microbe_
     */
    function _noScopeSimple( _s, self )
    {
        if ( typeof _s === 'string' && _s.indexOf( ':' ) === -1 &&
                _s.indexOf( '!' ) === -1 && _s.indexOf( ' ' ) === -1 )
        {
            switch ( _s[0] )
            {
                case '#':
                    if ( _s.indexOf( '.' ) === -1 )
                    {
                        var id = document.getElementById( _s.slice( 1 ) );
                        return id === null ? _build( [], self ) : _build( [ id ], self );
                    }
                    break;
                case '.':
                    if ( _s.indexOf( '#' ) === -1 )
                    {
                        var clss = _s.slice( 1 );

                        if ( clss.indexOf( '.' ) === -1 )
                        {
                            return _build( document.getElementsByClassName( clss ), self );
                        }
                        else
                        {
                            clss = clss.split( '.' );

                            var res, _r, _el = document.getElementsByClassName( clss[ 0 ] );
                            for ( var c = 1, lenC = clss.length; c < lenC; c++ )
                            {
                                res = slice.call( document.getElementsByClassName( clss[ c ] ) );

                                for ( var r = 0, lenR = _el.length; r < lenR; r++ )
                                {
                                    _r = _el[ r ];

                                   if ( res.indexOf( _r ) === -1 )
                                   {
                                        _el[ r ] = null;
                                   }
                                }
                            }

                            return _build( _el, self ).filter( function( _e ){ return _e !== null; } );
                        }
                    }
                    break;
                default:
                    if ( _s && _s.indexOf( '[' ) === -1 && _s.indexOf( '<' ) === -1 &&
                            _s.indexOf( '#' ) === -1 && _s.indexOf( '.' ) === -1 )
                    {
                        return _build( document.getElementsByTagName( _s ), self );
                    }
                    break;
            }
        }
        else if ( typeof _s === 'function' && Microbe && typeof Microbe.ready === 'function' )
        {
            Microbe.ready( _s );
        }

        return false;
    }


    /**
     * ## \_\_init\_\_
     *
     * Constructor.
     *
     * Either selects or creates an HTML element and wraps it into a Microbe instance.
     *
     * @param {Mixed} _selector HTML selector (Element String Array)
     * @param {Mixed} _scope scope to look inside (Element String Microbe)
     * @param {Mixed} _elements elements to fill Microbe with (optional) (Element or Array)
     *
     * @example µ()                             ---> empty
     * @example µ( '' )                         ---> empty
     * @example µ( [] )                         ---> empty
     * @example µ( 'div#test' )                 ---> selection
     * @example µ( elDiv )                      ---> selection
     * @example µ( [ elDiv1, elDiv2, elDiv3 ] ) ---> selection
     * @example µ( '&lt;div#test>' )               ---> creation
     * @example µ( '&lt;div id="test">&lt;/div>' )    ---> creation
     *
     * @return _Microbe_
     */
    var Init = Microbe.core.__init__ =  function( _selector, _scope, _elements )
    {
        var res;
        if ( !_scope )
        {
            res = _noScopeSimple( _selector, this );

            if ( res )
            {
                return res;
            }
        }

        if ( typeof _selector === 'string' )
        {
            _selector = _css4StringReplace( _selector );
        }

        if ( typeof _scope === 'string' )
        {
            _scope = _css4StringReplace( _scope );
        }

        _selector = _selector || '';

        if ( _scope && _scope.type === _type )
        {
            res = _build( [], this );

            var next;

            for ( var n = 0, lenN = _scope.length; n < lenN; n++ )
            {
                next = new Init( _selector, _scope[ n ] );

                for ( var i = 0, lenI = next.length; i < lenI; i++ )
                {
                    if ( Array.prototype.indexOf.call( res, next[ i ] ) === -1 )
                    {
                        res[ res.length ] = next[ i ];
                        res.length++;
                    }
                }
            }

            return res;
        }


        /*
         * fast tracks element based queries
         */
        var isArr, isHTMLCollection;
        if ( _selector.nodeType === 1 || ( isArr = Array.isArray( _selector ) ) ||
            _selector === window || _selector === document ||
            ( isHTMLCollection = _selector.toString() === '[object HTMLCollection]' ) )
        {
            if ( !isArr && !isHTMLCollection )
            {
                _selector = [ _selector ];
            }

            return _build( _selector, this );
        }

        _scope = _scope === undefined ?  document : _scope;

        if ( _scope !== document )
        {
            if ( typeof _scope === 'string' && typeof _selector === 'string' )
            {
                return this.constructor( _scope ).find( _selector );
            }
        }

        var scopeNodeType   = _scope.nodeType;

        if ( ( !_selector || typeof _selector !== 'string' ) ||
            ( scopeNodeType !== 1 && scopeNodeType !== 9 ) )
        {
            return _build( [], this );
        }

        var resultsRegex = _selector.match( selectorRegex );

        if ( resultsRegex && resultsRegex.length === 1 && resultsRegex[ 0 ][ 0 ] !== ':'  )
        {
            trigger         = resultsRegex[0][0];

            _shortSelector  = _selector.slice( 1 );

            switch( trigger )
            {
                case '.': // non-document scoped classname search
                    var _classesCount   = ( _selector || '' ).slice( 1 ).split( '.' ).length;

                    if ( _classesCount === 1 )
                    {
                        return _build( _scope.getElementsByClassName( _shortSelector ), this );
                    }
                    break;
                case '#': // non-document scoped id search
                    var _id = document.getElementById( _shortSelector );

                    if ( _scope.ownerDocument && this.contains( _id, _scope ) )
                    {
                        return _build( [ _id ], this );
                    }
                    else
                    {
                        return _build( [], this );
                    }
                    break;
                case '<': // element creation
                    return _create( _selector.substring( 1, _selector.length - 1 ), this );
                default:
                    return _build( _scope.getElementsByTagName( _selector ), this );
            }
        }

        if ( !( this instanceof Init ) )
        {
            return new Init( _selector, _scope, _elements );
        }

        if ( _selector.indexOf( ':' ) !== -1 && _pseudo )
        {
            return _pseudo( this, _selector, _scope, _build );
        }

        // html creation string
        if ( _selector.indexOf( '/' ) !== -1 )
        {
            return _createHtml( _selector, this );
        }

        return _build( _scope.querySelectorAll( _selector ), this );
    };

    Microbe.core.type                 = _type;
    Microbe.core.__init__.prototype   = Microbe.core;

    require( './core' )( Microbe );
    require( './root' )( Microbe );
    require( './pseudo' )( Microbe );
    require( './array' )( Microbe );

    var _pseudo = Microbe.constructor.pseudo;
};

},{"./array":2,"./core":3,"./pseudo":5,"./root":6}],5:[function(require,module,exports){
/**
 * pseudo.js
 *
 * @author  Mouse Braun         <mouse@knoblau.ch>
 * @author  Nicolas Brugneaux   <nicolas.brugneaux@gmail.com>
 *
 * @package Microbe
 */

module.exports = function( Microbe )
{
    'use strict';

    /**
     * ## _parseNth
     *
     * when supplied with a Microbe and a css style n selector (2n1), filters
     * and returns the result
     *
     * @param {Microbe} _el Microbe to be filtered
     * @param {String} _var number string
     * @param {Boolean} _last counting from the font or back
     *
     * @return _Microbe_
     */
    var _parseNth = function( _el, _var, _last )
    {
        if ( _var === 'odd' )
        {
            _var = '2n';
        }
        else if ( _var === 'even' )
        {
            _var = '2n1';
        }

        if ( _var.indexOf( 'n' ) === -1 )
        {
            switch ( _last )
            {
                case true:
                case 'last':
                    return new Microbe( _el[ _el.length - parseInt( _var ) ] );
            }
            return new Microbe( _el[ parseInt( _var ) - 1 ] );
        }
        else
        {
            _var            = _var.split( 'n' );
            var increment   = parseInt( _var[0] ) || 1;
            var offset      = parseInt( _var[1] );

            var top;
            if ( _last === true || _last === 'last' )
            {
                top         = _el.length - parseInt( _var[1] );
                offset      = top % increment;
            }

            var _e, resArray = [];
            for ( var i = offset || 0, lenI = top || _el.length; i < lenI; )
            {
                _e = _el[ i ];

                if ( _e )
                {
                    resArray.push( _e );
                }

                i += increment;
            }
            return new Microbe( resArray );
        }
    };


    /**
     * ## pseudo
     *
     * an extension to core.__init_ to handle custom pseusoselectors
     *
     * @param  {Microbe} self half built Microbe
     * @param  {String} selector pseudo-selector string
     * @param  {Object} _scope scope element
     * @param  {Function} _build build function from core
     *
     * @return _Microbe_
     */
    var pseudo = function( self, selector, _scope, _build )
    {
        /**
         * ## _breakUpSelector
         *
         * pushes each selector through the pseudo-selector engine
         *
         * @param  {Array} _selectors split selectors
         *
         * @return _Microbe_
         */
        function _breakUpSelector( _selectors )
        {
            var next, resArray = [];
            for ( var i = 0, lenI = _selectors.length; i < lenI; i++ )
            {
                if ( i === 0 )
                {
                    resArray = pseudo( self, _selectors[ i ], _scope, _build );
                }
                else
                {
                    next = pseudo( self, _selectors[ i ], _scope, _build );

                    for ( var j = 0, lenJ = next.length; j < lenJ; j++ )
                    {
                        if ( Array.prototype.indexOf.call( resArray, next[ j ] ) === -1 )
                        {
                            resArray[ resArray.length ] = next[ j ];
                            resArray.length++;
                        }
                    }
                }
            }

            return resArray;
        }


        /**
         * ## _buildObject
         *
         * builds the Microbe ready for return
         *
         * @return _Microbe_
         */
        function _buildObject()
        {
            var _pseudo = _parsePseudo( _selector );

            var obj = _build( _scope.querySelectorAll( _pseudo[0] ), self );
            _pseudo = _pseudo[ 1 ];

            var _sel, _var;
            for ( var h = 0, lenH = _pseudo.length; h < lenH; h++ )
            {
                _sel = _pseudo[ h ].split( '(' );
                _var = _sel[ 1 ];
                if ( _var )
                {
                    _var = _var.slice( 0, _var.length - 1 );
                }
                _sel = _sel[ 0 ];

                if ( Microbe.constructor.pseudo[ _sel ] )
                {
                    obj = Microbe.constructor.pseudo[ _sel ]( obj, _var, selector );
                }
            }

            return obj;
        }


        /**
         * ## _cycleFilters
         *
         * filters multiple pseudo-selector selectors
         *
         * @param {Array} res array of results to be filtered
         *
         * @return _Microbe_
         */
        function _cycleFilters( res )
        {
            var obj = Microbe.constructor.pseudo( self, res[ 0 ], _scope, _build );

            var filter, connect = false;
            for ( var i = 1, lenI = res.length; i < lenI; i++ )
            {
                filter = res[ i ].trim();

                if ( filter[ 0 ] === '~' )
                {
                    obj = obj.siblingsFlat( '~' );
                    connect = true;
                }
                else if ( filter[ 0 ] === '+' )
                {
                    obj = obj.siblingsFlat( '+' );
                    connect = true;
                }
                else if ( connect )
                {
                    obj = obj.filter( filter );
                    connect = false;
                }
                else
                {
                    obj = obj.find( filter );
                    connect = false;
                }

                if ( obj.length === 0 )
                {
                    return obj;
                }
            }
            return obj;
        }


        /**
         * ## _parsePseudo
         *
         * checks all pseudo-selectors to see if they're custom and
         * otherwise it reattaches it
         *
         * @param {String} _sel selector string
         *
         * @return _String_ modified selector
         */
        function _parsePseudo( _sel )
        {
            var _pseudoArray;
            var _pseudo = _sel.split( ':' );
            _sel        = _pseudo[ 0 ];
            _pseudo.splice( 0, 1 );

            for ( var k = 0, lenK = _pseudo.length; k < lenK; k++ )
            {
                _pseudoArray = _pseudo[ k ].split( '(' );

                if ( !Microbe.constructor.pseudo[ _pseudoArray[ 0 ] ] )
                {
                    _sel += ':' + _pseudo[ k ];
                    _pseudo.splice( k, 1 );
                }
            }

            return [ _sel, _pseudo ];
        }

        if ( selector.indexOf( ',' ) !== -1 )
        {
            selector = selector.split( /,(?![a-zA-Z0-9-#.,\s]+\))/g );

            if ( selector.length > 1 )
            {
                return _breakUpSelector( selector );
            }
            else
            {
                selector = selector[ 0 ];
            }
        }

        var _selector = selector;

        if ( _selector[ 0 ] === ':' )
        {
            _selector = '*' + _selector;
        }

        if ( _selector.trim().indexOf( ' ' ) !== -1 )
        {
            var filterFunction = function( e ){ return e === ' ' ? false : e; };
            var res = _selector.split( /((?:[A-Za-z0-9.#*\-_]+)?(?:\:[A-Za-z\-]+(?:\([\s\S]+\))?)?)?( )?/ );
                res = res.filter( filterFunction );

            if ( res.length > 1 )
            {
                return _cycleFilters( res );
            }
            else
            {
                _selector = res[ 0 ];
            }
        }

        return _buildObject();
    };


    /**
     * ## _filteredIteration
     *
     * special iterator that dumps all results ito one array
     *
     * @param  {Microbe} _el elements to cycle through
     * @param  {Function} _cb callback
     *
     * @return _Microbe_ filtered microbe
     */
    function _filteredIteration( _el, _cb, _recursive )
    {
        var _r, resArray = [], _f = 0;
        for ( var i = 0, lenI = _el.length; i < lenI; i++ )
        {
            _r = _cb( _el[ i ], resArray, i );

            if ( _r )
            {
                resArray[ _f ] = _r;
                _f++;
            }
        }

        if ( _recursive )
        {
            return resArray;
        }

        return _el.constructor( resArray );
    }


    /**
     * ## any-link
     *
     * match elements that act as the source anchors of hyperlinks
     *
     * @param {Microbe} _el Microbe to be filtered
     *
     * @example µ( '.example:any-link' );
     *
     * @return _Microbe_
     */
    pseudo[ 'any-link' ] = function( _el )
    {
        return _el.filter( 'a' );
    };


    /**
     * ## blank
     *
     * matches elements that only contain content which consists of whitespace
     *
     * @param {Microbe} _el Microbe to be filtered
     *
     * @example µ( '.example:blank' );
     *
     * @return _Microbe_
     */
    pseudo.blank = function( _el )
    {
        var _blank = function( _e, resArray )
        {
            var _t = document.all ? _e.innerText : _e.textContent;

            if ( resArray.indexOf( _e ) === -1 )
            {
                if ( /^\s*$/.test( _t || _e.value ) )
                {
                    return _e;
                }
            }
        };

        return _filteredIteration( _el, _blank );
    };


    /**
     * ## column
     *
     * filters for columns with a suplied selector
     *
     * @param {Microbe} _el Microbe to be filtered
     * @param {String} _var string to search for
     *
     * @example µ( '.example:column' );
     *
     * @return _Microbe_
     */
    pseudo.column = function( _el, _var )
    {
        return _el.filter( 'col' ).filter( _var );
    };


    /**
     * ## contains
     *
     * Returns only elements that contain the given text.  The supplied text
     * is compared ignoring case
     *
     * @param {Microbe} _el Microbe to be filtered
     * @param {String} _var string to search for
     *
     * @example µ( '.example:contains(moon)' );
     *
     * @return _Microbe_
     */
    pseudo.contains = function( _el, _var )
    {
        _var = _var.toLowerCase();

        var _contains = function( _e )
        {
            var _getText = function( _el )
            {
                return document.all ? _el.innerText : _el.textContent; // ff
            };

            var _elText = _getText( _e );

            if ( _elText.toLowerCase().indexOf( _var ) !== -1 )
            {
                return _e;
            }
        };

        return _filteredIteration( _el, _contains );
    };


    /**
     * ## default
     *
     * selects all inputs and select boxes that are checked by dafeult
     *
     * @param {Microbe} _el Microbe to be filtered
     *
     * @example µ( '.example:default' );
     *
     * @return _Microbe_
     */
    pseudo.default = function( _el )
    {
        _el = _el.filter( 'input, option' );

        var _default = function( _e )
        {
            if ( _e.defaultChecked === true )
            {
                return _e;
            }
        };

        return _filteredIteration( _el, _default );
    };


    /**
     * ## dir
     *
     * match elements by its directionality based on the document language
     *
     * @param {Microbe} _el Microbe to be filtered
     * @param {String} _var string to search for
     *
     * @example µ( '.example:dir(ltr)' );
     *
     * @return _Microbe_
     */
    pseudo.dir = function( _el, _var )
    {
        var _dir = function( _e )
        {
            if ( getComputedStyle( _e ).direction === _var )
            {
                return _e;
            }
        };

        return _filteredIteration( _el, _dir );
    };


    /**
     * ## drop
     *
     * returns all elements that are drop targets. HTML has a dropzone
     * attribute which specifies that an element is a drop target.
     *
     * @param {Microbe} _el Microbe to be filtered
     * @param {String} _var trigger string
     *
     * @example µ( '.example:drop' );
     *
     * @return _Microbe_
     */
    pseudo.drop = function( _el, _var )
    {
        _el = _el.filter( '[dropzone]' );

        if ( !_var )
        {
            return _el;
        }
        else
        {
            switch ( _var )
            {
                case 'active':
                    return _el.filter( ':active' );
                case 'invalid':
                    return _el.filter();
                case 'valid':
                    return _el.filter();
            }
        }
    };


    /**
     * ## even
     *
     * Returns the even indexed elements of a Microbe (starting at 0)
     *
     * @param {Microbe} _el Microbe to be filtered
     *
     * @example µ( '.example:even' );
     *
     * @return _Microbe_
     */
    pseudo.even = function( _el )
    {
        var _even = function( _e, resArray, i )
        {
            if ( ( i + 1 ) % 2 === 0 )
            {
                return _e;
            }
        };

        return _filteredIteration( _el, _even );
    };


    /**
     * ## first
     *
     * returns the first element of a Microbe
     *
     * @param {Microbe} _el Microbe to be filtered
     *
     * @example µ( '.example:first' );
     *
     * @return _Microbe_
     */
    pseudo.first = function( _el )
    {
        return _el.first();
    };


    /**
     * ## gt
     *
     * returns the last {_var} element
     *
     * @param {Microbe} _el Microbe to be filtered
     * @param {String} _var number of elements to return
     *
     * @example µ( '.example:gt(4)' );
     *
     * @return _Microbe_
     */
    pseudo.gt = function( _el, _var )
    {
        return _el.splice( _var, _el.length );
    };


    /**
     * ## has
     *
     * returns elements that have the passed selector as a child
     *
     * @param {Microbe} _el Microbe to be filtered
     * @param {String} _var selector string
     *
     * @example µ( '.example:has(span)' );
     *
     * @return _Microbe_
     */
    pseudo.has = function( _el, _var )
    {
        var _has = function( _e )
        {
            if ( _e.querySelector( _var ) )
            {
                return _e;
            }
        };

        return _filteredIteration( _el, _has );
    };


    /**
     * ## in-range
     *
     * select the elements with a value inside the specified range
     *
     * @param {Microbe} _el Microbe to be filtered
     *
     * @example µ( '.example:in-range' );
     *
     * @return _Microbe_
     */
    pseudo[ 'in-range' ] = function( _el )
    {
        _el = _el.filter( '[max],[min]' );

        var _inRange = function( _e )
        {
            var min = _e.getAttribute( 'min' );
            var max = _e.getAttribute( 'max' );
            var _v  = parseInt( _e.value );

            if ( _v )
            {
                if ( min && max )
                {
                    if ( _v > min && _v < max )
                    {
                        return _e;
                    }
                }
                else if ( min && _v > min || max && _v < max )
                {
                    return _e;
                }
            }
        };

        return _filteredIteration( _el, _inRange );
    };


    /**
     * ## lang
     *
     * match the elements based on the document language
     *
     * @param {Microbe} _el Microbe to be filtered
     * @param {String} _var specified language (accepts wildcards as *)
     *
     * @example µ( '.example:lang(gb-en)' );
     * @example µ( '.example:lang(*-en)' );
     *
     * @return _Microbe_
     */
    pseudo.lang = function( _el, _var )
    {
        if ( _var )
        {
            if ( _var.indexOf( '*' ) !== -1 )
            {
                _el     = _el.filter( '[lang]' );
                _var    = _var.replace( '*', '' );

                var _lang = function( _e )
                {
                    if ( _e.getAttribute( 'lang' ).indexOf( _var ) !== -1 )
                    {
                        return _e;
                    }
                };

                return _filteredIteration( _el, _lang );
            }

            var res = document.querySelectorAll( ':lang(' + _var + ')' );
            return _el.constructor( Array.prototype.slice.call( res ) );
        }
        else
        {
            return _el.constructor( [] );
        }
    };


    /**
     * ## last
     *
     * returns the last element of a Microbe
     *
     * @param {Microbe} _el Microbe to be filtered
     *
     * @example µ( '.example:last' );
     *
     * @return _Microbe_
     */
    pseudo.last = function( _el )
    {
        return _el.last();
    };



    /**
     * ## local-link
     *
     * returns all link tags that go to local links. If specified a depth
     * filter can be added
     *
     * @param {Microbe} _el Microbe to be filtered
     * @param {String} _var specified depth
     *
     * @example µ( '.example:local-link' );
     * @example µ( '.example:local-link(2)' );
     *
     * @return _Microbe_
     */
    pseudo[ 'local-link' ] = function( _el, _var )
    {
        _el = _el.filter( 'a' );
        var here    = document.location;

        var _localLink = function( _e )
        {
            var url         = _e.href;
            var urlShort    = url.replace( here.origin, '' ).replace( here.host, '' );
            urlShort        = urlShort[ 0 ] === '/' ? urlShort.slice( 1 ) : urlShort;
            var depth       = urlShort.split( '/' ).length - 1;

            if ( !_var || parseInt( _var ) === depth )
            {
                return _e;
            }
        };

        return _filteredIteration( _el, _localLink );
    };


    /**
     * ## lt
     *
     * returns the first [_var] elements
     *
     * @param {Microbe} _el Microbe to be filtered
     * @param {String} _var number of elements to return
     *
     * @example µ( '.example:lt(2)' );
     *
     * @return _Microbe_
     */
    pseudo.lt = function( _el, _var )
    {
        return _el.splice( 0, _var );
    };


    /**
     * ## matches
     *
     * returns elements that match either selector
     *
     * @param {Microbe} _el Microbe to be filtered
     * @param {String} _var selector filter
     * @param {String} _selector full original selector
     *
     * @example µ( '.example:matches(div)' );
     *
     * @return _Microbe_
     */
    pseudo.matches = function( _el, _var, _selector )
    {
        var _constructor = _el.constructor;

        var text = ':matches(' + _var + ')';
        _var = _var.split( ',' );

        _selector = _selector.replace(  text, '' );
        _selector = _selector === '*' ? '' : _selector;

        var res = _constructor( _selector + _var[ 0 ].trim() );

        for ( var i = 1, lenI = _var.length; i < lenI; i++ )
        {
            res.merge( _constructor( _selector + _var[ i ].trim() ), true );
        }

        return res;
    };


    /**
     * ## not
     *
     * returns all elements that do not match the given selector. As per
     * CSS4 spec, this accepts complex selectors seperated with a comma
     *
     * @param {Microbe} _el Microbe to be filtered
     * @param {String} _var null selector
     * @param {String} _recursive an indicator that it is calling itself. defines output
     *
     * @example µ( '.example:not(div)' );
     * @example µ( '.example:not(div,#an--id)' );
     *
     * @return _Microbe_
     */
    pseudo.not = function( _el, _var, _selector, _recursive )
    {
        if ( _var.indexOf( ',' ) !== -1 )
        {
            var _constructor = _el.constructor;
            _var = _var.split( ',' );

            for ( var i = 0, lenI = _var.length; i < lenI; i++ )
            {
                _el = this.not( _el, _var[ i ].trim(), _selector, true );
            }

            return _constructor( _el );
        }
        else
        {
            var _not = function( _e )
            {
                if ( ! Microbe.matches( _e, _var ) )
                {
                    return _e;
                }
            };

            return _filteredIteration( _el, _not, _recursive );
        }
    };


    /**
     * ## nth-column
     *
     * returns the nth column of the current Microbe
     *
     * @param {Microbe} _el Microbe to be filtered
     * @param {String} _var column number(s) return
     *
     * @example µ( '.example:nth-column(1)' );
     * @example µ( '.example:nth-column(2n1)' );
     * @example µ( '.example:nth-column(even)' );
     * @example µ( '.example:nth-column(odd)' );
     *
     * @return _Microbe_
     */
    pseudo[ 'nth-column' ] = function( _el, _var )
    {
        _el = _el.filter( 'col' );

        return _parseNth( _el, _var );
    };


    /**
     * ## nth-last-column
     *
     * returns the nth column of the current Microbe starting from the back
     *
     * @param {Microbe} _el Microbe to be filtered
     * @param {String} _var column number(s) return
     *
     * @example µ( '.example:nth-last-column(1)' );
     * @example µ( '.example:nth-last-column(2n1)' );
     * @example µ( '.example:nth-last-column(even)' );
     * @example µ( '.example:nth-last-column(odd)' );
     *
     * @return _Microbe_
     */
    pseudo[ 'nth-last-column' ] = function( _el, _var )
    {
        _el = _el.filter( 'col' );

        return _parseNth( _el, _var, true );
    };


    /**
     * ## nth-last-match
     *
     * returns the nth match(es) of the current Microbe starting from the back
     *
     * @param {Microbe} _el Microbe to be filtered
     * @param {String} _var match number(s) return
     *
     * @example µ( '.example:nth-last-match(1)' );
     * @example µ( '.example:nth-last-match(2n1)' );
     * @example µ( '.example:nth-last-match(even)' );
     * @example µ( '.example:nth-last-match(odd)' );
     *
     * @return _Microbe_
     */
    pseudo[ 'nth-last-match' ] = function( _el, _var )
    {
        return _parseNth( _el, _var, true );
    };


    /**
     * ## nth-match
     *
     * returns the nth match(es) of the current Microbe
     *
     * @param {Microbe} _el Microbe to be filtered
     * @param {String} _var match number(s) return
     *
     * @example µ( '.example:nth-match(1)' );
     * @example µ( '.example:nth-match(2n1)' );
     * @example µ( '.example:nth-match(even)' );
     * @example µ( '.example:nth-match(odd)' );
     *
     * @return _Microbe_
     */
    pseudo[ 'nth-match' ] = function( _el, _var )
    {
        return _parseNth( _el, _var );
    };


    /**
     * ## odd
     *
     * returns the odd indexed elements of a Microbe
     *
     * @param {Microbe} _el Microbe to be filtered
     *
     * @example µ( '.example:odd' );
     *
     * @return _Microbe_
     */
    pseudo.odd = function( _el )
    {
        var _odd = function( _e, resArray, i )
        {
            if ( ( i + 1 ) % 2 !== 0 )
            {
                return _e;
            }
        };

        return _filteredIteration( _el, _odd );
    };


    /**
     * ## optional
     *
     * returns all optional elements
     *
     * @param {Microbe} _el base elements set
     *
     * @example µ( '.example:optional' );
     *
     * @return _Microbe_
     */
    pseudo.optional = function( _el )
    {
        return _el.filter( 'input:not([required=required]), textfield:not([required=required]), [required=optional], [optional]' );
    };


    /**
     * ## out-of-range
     *
     * select the elements with a value inside the specified range
     *
     * @param {Microbe} _el Microbe to be filtered
     *
     * @example µ( '.example:out-of-range' );
     *
     * @return _Microbe_
     */
    pseudo[ 'out-of-range' ] = function( _el )
    {
        _el = _el.filter( '[max],[min]' );

        var _outOfRange = function( _e )
        {
            var min = _e.getAttribute( 'min' );
            var max = _e.getAttribute( 'max' );
            var _v  = parseInt( _e.value );

            if ( _v )
            {
                if ( min && max )
                {
                    if ( _v < min || _v > max )
                    {
                        return _e;
                    }
                }
                else if ( min && _v < min || max && _v > max )
                {
                    return _e;
                }
            }
        };

        return _filteredIteration( _el, _outOfRange );
    };


    /**
     * ## parent
     *
     * returns the parents of an _el match.
     * normally triggered using the ! selector
     *
     * @param {Microbe} _el Microbe to be filtered
     *
     * @example µ( '.example!' );
     * @example µ( '.example:parent' );
     *
     * @return _Microbe_
     */
    pseudo.parent = function( _el )
    {
        _el =  _el.parent();

        var _parent = function( _e, resArray, i )
        {
            if ( resArray.indexOf( _e ) === -1 )
            {
                return _e;
            }
        };

        return _filteredIteration( _el, _parent );
    };


    /**
     * ## read-only
     *
     * user-non-alterable content
     *
     * @param {Microbe} _el Microbe to be filtered
     *
     * @example µ( '.example:read-only' );
     *
     * @return _Microbe_
     */
    pseudo[ 'read-only' ] = function( _el )
    {
        return _el.filter( ':not(input,textfield,[contenteditable=false])' );
    };


    /**
     * ## read-write
     *
     * input elements which are user-alterable or contenteditable
     *
     * @param {Microbe} _el Microbe to be filtered
     *
     * @example µ( '.example:read-write' );
     *
     * @return _Microbe_
     */
    pseudo[ 'read-write' ] = function( _el )
    {
        return _el.filter( 'input,textfield,[contenteditable=true]' );
    };


    /**
     * ## required
     *
     * returns all required elements
     *
     * @param {Microbe} _el Microbe to be filtered
     *
     * @example µ( '.example:required' );
     *
     * @return _Microbe_
     */
    pseudo.required = function( _el )
    {
        return _el.filter( '[required=required]' );
    };


    /**
     * ## root
     *
     * returns the root elements of the document
     *
     * @param {Microbe} _el Microbe to be filtered
     *
     * @example µ( '.example:root );
     *
     * @return _Microbe_
     */
    pseudo.root = function( _el )
    {
        return _el.constructor( document.body.parentNode );
    };



    Microbe.constructor.prototype.pseudo = pseudo;
};


},{}],6:[function(require,module,exports){
/**
 * rootUtils.js
 *
 * @author  Mouse Braun         <mouse@knoblau.ch>
 * @author  Nicolas Brugneaux   <nicolas.brugneaux@gmail.com>
 *
 * @package Microbe
 */

module.exports = function( Microbe )
{
    'use strict';

    /**
     * ## contains
     *
     * Checks if a given element is a child of _scope
     *
     * @param {Element} _el element to check
     * @param {Element} _scope scope
     *
     * @example µ.contains( _el, _parentEl );
     *
     * @return _Boolean_ whether _el is contained in the scope
     */
    Microbe.contains = function( _el, _scope )
    {
        var parent = _el.parentNode;

        while ( parent !== document && parent !== _scope )
        {
            parent = parent.parentNode || _scope.parentNode;
        }

        if ( parent === document )
        {
            return false;
        }

        return true;
    };


    /**
     * ## matches
     *
     * checks element an to see if they match a given css selector
     * unsure if we actually need the webkitMatchSelector and mozMatchSelector
     * http://caniuse.com/#feat=matchesselector
     *
     * @param {Mixed} el element, microbe, or array of elements to match
     *
     * @example µ.matches( _el, 'div.example' );
     *
     * @return _Booblean_ matches or not
     */
    Microbe.matches = function( el, selector )
    {
        var method  = this.matches.__matchesMethod;
        var notForm = ( typeof el !== 'string' && !!( el.length ) &&
                        el.toString() !== '[object HTMLFormElement]' );

        var isArray = Array.isArray( el ) || notForm ? true : false;

        if ( !isArray && !notForm )
        {
            el = [ el ];
        }

        if ( !method && el[ 0 ] )
        {
            if ( el[ 0 ].matches )
            {
                method = this.matches.__matchesMethod = 'matches';
            }
            else if ( el[ 0 ].msMatchesSelector )
            {
                method = this.matches.__matchesMethod = 'msMatchesSelector';
            }
            else if ( el[ 0 ].mozMatchesSelector )
            {
                method = this.matches.__matchesMethod = 'mozMatchesSelector';
            }
            else if ( el[ 0 ].webkitMatchesSelector )
            {
                method = this.matches.__matchesMethod = 'webkitMatchesSelector';
            }
        }

        var resArray = [];
        for ( var i = 0, lenI = el.length; i < lenI; i++ )
        {
            resArray.push( el[ i ][ method ]( selector ) );
        }

        return isArray ? resArray : resArray[ 0 ];
    };
};

},{}]},{},[1])(1)
});