/*
PIE: CSS3 rendering for IE
Version 2.0beta1
http://css3pie.com
Dual-licensed for use under the Apache License Version 2.0 or the General Public License (GPL) Version 2.
*/
(function( win, doc ) {
    var PIE = win[ 'PIE' ] || ( win[ 'PIE' ] = {} );
/**
 * Simple utility for merging objects
 * @param {Object} obj1 The main object into which all others will be merged
 * @param {...Object} var_args Other objects which will be merged into the first, in order
 */
PIE.merge = function( obj1 ) {
    var i, len, p, objN, args = arguments;
    for( i = 1, len = args.length; i < len; i++ ) {
        objN = args[i];
        for( p in objN ) {
            if( objN.hasOwnProperty( p ) ) {
                obj1[ p ] = objN[ p ];
            }
        }
    }
    return obj1;
};


PIE.merge(PIE, {

    // Constants
    CSS_PREFIX: '-pie-',
    STYLE_PREFIX: 'Pie',
    CLASS_PREFIX: 'pie_',

    tableCellTags: {
        'TD': 1,
        'TH': 1
    },

    /**
     * Lookup table of elements which cannot take custom children.
     */
    childlessElements: {
        'TABLE':1,
        'THEAD':1,
        'TBODY':1,
        'TFOOT':1,
        'TR':1,
        'INPUT':1,
        'TEXTAREA':1,
        'SELECT':1,
        'OPTION':1,
        'IMG':1,
        'HR':1
    },

    /**
     * Elements that can receive user focus
     */
    focusableElements: {
        'A':1,
        'INPUT':1,
        'TEXTAREA':1,
        'SELECT':1,
        'BUTTON':1
    },

    /**
     * Values of the type attribute for input elements displayed as buttons
     */
    inputButtonTypes: {
        'submit':1,
        'button':1,
        'reset':1
    },

    emptyFn: function() {}
});

// Force the background cache to be used. No reason it shouldn't be.
try {
    doc.execCommand( 'BackgroundImageCache', false, true );
} catch(e) {}

(function() {
    /*
     * IE version detection approach by James Padolsey, with modifications -- from
     * http://james.padolsey.com/javascript/detect-ie-in-js-using-conditional-comments/
     */
    var ieVersion = 4,
        div = doc.createElement('div'),
        all = div.getElementsByTagName('i'),
        shape;
    while (
        div.innerHTML = '<!--[if gt IE ' + (++ieVersion) + ']><i></i><![endif]-->',
        all[0]
    ) {}
    PIE.ieVersion = ieVersion;

    // Detect IE6
    if( ieVersion === 6 ) {
        // IE6 can't access properties with leading dash, but can without it.
        PIE.CSS_PREFIX = PIE.CSS_PREFIX.replace( /^-/, '' );
    }

    PIE.ieDocMode = doc.documentMode || PIE.ieVersion;

    // Detect VML support (a small number of IE installs don't have a working VML engine)
    div.innerHTML = '<v:shape adj="1"/>';
    shape = div.firstChild;
    shape.style['behavior'] = 'url(#default#VML)';
    PIE.supportsVML = (typeof shape['adj'] === "object");
})();
/**
 * Utility functions
 */
(function() {
    var idNum = 0,
        imageSizes = {};


    PIE.Util = {

        /**
         * Generate and return a unique ID for a given object. The generated ID is stored
         * as a property of the object for future reuse. For DOM Elements, don't use this
         * but use the IE-native uniqueID property instead.
         * @param {Object} obj
         */
        getUID: function( obj ) {
            return obj && obj[ '_pieId' ] || ( obj[ '_pieId' ] = '_' + idNum++ );
        },


        /**
         * Execute a callback function, passing it the dimensions of a given image once
         * they are known.
         * @param {string} src The source URL of the image
         * @param {function({w:number, h:number})} func The callback function to be called once the image dimensions are known
         * @param {Object} ctx A context object which will be used as the 'this' value within the executed callback function
         */
        withImageSize: function( src, func, ctx ) {
            var size = imageSizes[ src ], img, queue;
            if( size ) {
                // If we have a queue, add to it
                if( Object.prototype.toString.call( size ) === '[object Array]' ) {
                    size.push( [ func, ctx ] );
                }
                // Already have the size cached, call func right away
                else {
                    func.call( ctx, size );
                }
            } else {
                queue = imageSizes[ src ] = [ [ func, ctx ] ]; //create queue
                img = new Image();
                img.onload = function() {
                    size = imageSizes[ src ] = { w: img.width, h: img.height };
                    for( var i = 0, len = queue.length; i < len; i++ ) {
                        queue[ i ][ 0 ].call( queue[ i ][ 1 ], size );
                    }
                    img.onload = null;
                };
                img.src = src;
            }
        }
    };
})();/**
 * Utility functions for handling gradients
 */
PIE.GradientUtil = {

    toSideAngles: {
        'top': 0,
        'right': 90,
        'bottom': 180,
        'left': 270
    },

    getGradientMetrics: function( el, width, height, gradientInfo ) {
        var angle = gradientInfo.angle,
            toPos = gradientInfo.gradientTo,
            dX, dY,
            endPoint,
            startX, startY,
            endX, endY;

        // If an angle was specified, just use it
        if (angle) {
            angle = angle.degrees();
        }
        // If a to-position was specified, find the appropriate angle for it
        else if (toPos) {
            // To a corner; find the adjacent corners and use the angle perpendicular to them
            if (toPos[1]) {
                dX = ( toPos[0] == 'top' || toPos[1] == 'top' ) ? width : -width;
                dY = ( toPos[0] == 'left' || toPos[1] == 'left' ) ? -height : height;
                angle = Math.atan2(dY, dX) * 180 / Math.PI;
            }
            // To a side; map to a vertical/horizontal angle
            else {
                angle = this.toSideAngles[toPos[0]];
            }
        }
        // Neither specified; default is top to bottom
        else {
            angle = 180;
        }

        // Normalize the angle to a value between [0, 360)
        while( angle < 0 ) {
            angle += 360;
        }
        angle = angle % 360;

        // Find the end point of the gradient line, extending the angle from the center point
        // to where it intersects the perpendicular line passing through the nearest corner.
        endPoint = PIE.GradientUtil.perpendicularIntersect(width / 2, height / 2, angle,
            ( angle >= 180 ? 0 : width ), ( angle < 90 || angle > 270 ? 0 : height )
        );
        endX = endPoint[0];
        endY = endPoint[1];
        startX = width - endX;
        startY = height - endY;

        return {
            angle: angle,
            endX: endX,
            endY: endY,
            startX: startX,
            startY: startY,
            lineLength: PIE.GradientUtil.distance( startX, startY, endX, endY )
        };
    },

    /**
     * Find the point along a given line (defined by a starting point and an angle), at which
     * that line is intersected by a perpendicular line extending through another point.
     * @param x1 - x coord of the starting point
     * @param y1 - y coord of the starting point
     * @param angle - angle of the line extending from the starting point (in degrees)
     * @param x2 - x coord of point along the perpendicular line
     * @param y2 - y coord of point along the perpendicular line
     * @return [ x, y ]
     */
    perpendicularIntersect: function( x1, y1, angle, x2, y2 ) {
        // Handle straight vertical and horizontal angles, for performance and to avoid
        // divide-by-zero errors.
        if( angle === 0 || angle === 180 ) {
            return [ x1, y2 ];
        }
        else if( angle === 90 || angle === 270 ) {
            return [ x2, y1 ];
        }
        else {
            // General approach: determine the Ax+By=C formula for each line (the slope of the second
            // line is the negative inverse of the first) and then solve for where both formulas have
            // the same x/y values.
            var a1 = Math.tan( ( angle - 90 ) * Math.PI / 180 ),
                c1 = a1 * x1 - y1,
                a2 = -1 / a1,
                c2 = a2 * x2 - y2,
                d = a2 - a1,
                endX = ( c2 - c1 ) / d,
                endY = ( a1 * c2 - a2 * c1 ) / d;
            return [ endX, endY ];
        }
    },

    /**
     * Find the distance between two points
     * @param {Number} p1x
     * @param {Number} p1y
     * @param {Number} p2x
     * @param {Number} p2y
     * @return {Number} the distance
     */
    distance: function( p1x, p1y, p2x, p2y ) {
        var dx = p2x - p1x,
            dy = p2y - p1y;
        return Math.abs(
            dx === 0 ? dy :
            dy === 0 ? dx :
            Math.sqrt( dx * dx + dy * dy )
        );
    }

};/**
 * 
 */
PIE.Observable = function() {
    /**
     * List of registered observer functions
     */
    this.observers = [];

    /**
     * Hash of function ids to their position in the observers list, for fast lookup
     */
    this.indexes = {};
};
PIE.Observable.prototype = {

    observe: function( fn ) {
        var id = PIE.Util.getUID( fn ),
            indexes = this.indexes,
            observers = this.observers;
        if( !( id in indexes ) ) {
            indexes[ id ] = observers.length;
            observers.push( fn );
        }
    },

    unobserve: function( fn ) {
        var id = PIE.Util.getUID( fn ),
            indexes = this.indexes;
        if( id && id in indexes ) {
            delete this.observers[ indexes[ id ] ];
            delete indexes[ id ];
        }
    },

    fire: function() {
        var o = this.observers,
            i = o.length;
        while( i-- ) {
            o[ i ] && o[ i ]();
        }
    }

};/*
 * Simple heartbeat timer - this is a brute-force workaround for syncing issues caused by IE not
 * always firing the onmove and onresize events when elements are moved or resized. We check a few
 * times every second to make sure the elements have the correct position and size. See Element.js
 * which adds heartbeat listeners based on the custom -pie-poll flag, which defaults to true in IE8-9
 * and false elsewhere.
 */

PIE.Heartbeat = new PIE.Observable();
PIE.Heartbeat.run = function() {
    var me = this,
        interval;
    if( !me.running ) {
        interval = doc.documentElement.currentStyle.getAttribute( PIE.CSS_PREFIX + 'poll-interval' ) || 250;
        (function beat() {
            me.fire();
            setTimeout(beat, interval);
        })();
        me.running = 1;
    }
};
/**
 * Create an observable listener for the onunload event
 */
(function() {
    PIE.OnUnload = new PIE.Observable();

    function handleUnload() {
        PIE.OnUnload.fire();
        win.detachEvent( 'onunload', handleUnload );
        win[ 'PIE' ] = null;
    }

    win.attachEvent( 'onunload', handleUnload );

    /**
     * Attach an event which automatically gets detached onunload
     */
    PIE.OnUnload.attachManagedEvent = function( target, name, handler ) {
        target.attachEvent( name, handler );
        this.observe( function() {
            target.detachEvent( name, handler );
        } );
    };
})()/**
 * Create a single observable listener for window resize events.
 */
PIE.OnResize = new PIE.Observable();

PIE.OnUnload.attachManagedEvent( win, 'onresize', function() { PIE.OnResize.fire(); } );
/**
 * Create a single observable listener for scroll events. Used for lazy loading based
 * on the viewport, and for fixed position backgrounds.
 */
(function() {
    PIE.OnScroll = new PIE.Observable();

    function scrolled() {
        PIE.OnScroll.fire();
    }

    PIE.OnUnload.attachManagedEvent( win, 'onscroll', scrolled );

    PIE.OnResize.observe( scrolled );
})();
/**
 * Listen for printing events, destroy all active PIE instances when printing, and
 * restore them afterward.
 */
(function() {

    var elements;

    function beforePrint() {
        elements = PIE.Element.destroyAll();
    }

    function afterPrint() {
        if( elements ) {
            for( var i = 0, len = elements.length; i < len; i++ ) {
                PIE[ 'attach' ]( elements[i] );
            }
            elements = 0;
        }
    }

    PIE.OnUnload.attachManagedEvent( win, 'onbeforeprint', beforePrint );
    PIE.OnUnload.attachManagedEvent( win, 'onafterprint', afterPrint );

})();/**
 * Create a single observable listener for document mouseup events.
 */
PIE.OnMouseup = new PIE.Observable();

PIE.OnUnload.attachManagedEvent( doc, 'onmouseup', function() { PIE.OnMouseup.fire(); } );
/**
 * Wrapper for length and percentage style values. The value is immutable. A singleton instance per unique
 * value is returned from PIE.getLength() - always use that instead of instantiating directly.
 * @constructor
 * @param {string} val The CSS string representing the length. It is assumed that this will already have
 *                 been validated as a valid length or percentage syntax.
 */
PIE.Length = (function() {
    var lengthCalcEl = doc.createElement( 'length-calc' ),
        parent = doc.body || doc.documentElement,
        s = lengthCalcEl.style,
        conversions = {},
        units = [ 'mm', 'cm', 'in', 'pt', 'pc' ],
        i = units.length,
        instances = {};

    s.position = 'absolute';
    s.top = s.left = '-9999px';

    parent.appendChild( lengthCalcEl );
    while( i-- ) {
        s.width = '100' + units[i];
        conversions[ units[i] ] = lengthCalcEl.offsetWidth / 100;
    }
    parent.removeChild( lengthCalcEl );

    // All calcs from here on will use 1em
    s.width = '1em';


    function Length( val ) {
        this.val = val;
    }
    Length.prototype = {
        /**
         * Regular expression for matching the length unit
         * @private
         */
        unitRE: /(px|em|ex|mm|cm|in|pt|pc|%)$/,

        /**
         * Get the numeric value of the length
         * @return {number} The value
         */
        getNumber: function() {
            var num = this.num,
                UNDEF;
            if( num === UNDEF ) {
                num = this.num = parseFloat( this.val );
            }
            return num;
        },

        /**
         * Get the unit of the length
         * @return {string} The unit
         */
        getUnit: function() {
            var unit = this.unit,
                m;
            if( !unit ) {
                m = this.val.match( this.unitRE );
                unit = this.unit = ( m && m[0] ) || 'px';
            }
            return unit;
        },

        /**
         * Determine whether this is a percentage length value
         * @return {boolean}
         */
        isPercentage: function() {
            return this.getUnit() === '%';
        },

        /**
         * Resolve this length into a number of pixels.
         * @param {Element} el - the context element, used to resolve font-relative values
         * @param {(function():number|number)=} pct100 - the number of pixels that equal a 100% percentage. This can be either a number or a
         *                  function which will be called to return the number.
         */
        pixels: function( el, pct100 ) {
            var num = this.getNumber(),
                unit = this.getUnit();
            switch( unit ) {
                case "px":
                    return num;
                case "%":
                    return num * ( typeof pct100 === 'function' ? pct100() : pct100 ) / 100;
                case "em":
                    return num * this.getEmPixels( el );
                case "ex":
                    return num * this.getEmPixels( el ) / 2;
                default:
                    return num * conversions[ unit ];
            }
        },

        /**
         * The em and ex units are relative to the font-size of the current element,
         * however if the font-size is set using non-pixel units then we get that value
         * rather than a pixel conversion. To get around this, we keep a floating element
         * with width:1em which we insert into the target element and then read its offsetWidth.
         * For elements that won't accept a child we insert into the parent node and perform
         * additional calculation. If the font-size *is* specified in pixels, then we use that
         * directly to avoid the expensive DOM manipulation.
         * @param {Element} el
         * @return {number}
         */
        getEmPixels: function( el ) {
            var fs = el.currentStyle.fontSize,
                px, parent, me;

            if( fs.indexOf( 'px' ) > 0 ) {
                return parseFloat( fs );
            }
            else if( el.tagName in PIE.childlessElements ) {
                me = this;
                parent = el.parentNode;
                return PIE.getLength( fs ).pixels( parent, function() {
                    return me.getEmPixels( parent );
                } );
            }
            else {
                el.appendChild( lengthCalcEl );
                px = lengthCalcEl.offsetWidth;
                if( lengthCalcEl.parentNode === el ) { //not sure how this could be false but it sometimes is
                    el.removeChild( lengthCalcEl );
                }
                return px;
            }
        }
    };

    /**
     * Convert a pixel length into a point length
     */
    Length.pxToPt = function( px ) {
        return px / conversions[ 'pt' ];
    };


    /**
     * Retrieve a PIE.Length instance for the given value. A shared singleton instance is returned for each unique value.
     * @param {string} val The CSS string representing the length. It is assumed that this will already have
     *                 been validated as a valid length or percentage syntax.
     */
    PIE.getLength = function( val ) {
        return instances[ val ] || ( instances[ val ] = new Length( val ) );
    };

    return Length;
})();
/**
 * Wrapper for a CSS3 bg-position value. Takes up to 2 position keywords and 2 lengths/percentages.
 * @constructor
 * @param {Array.<PIE.Tokenizer.Token>} tokens The tokens making up the background position value.
 */
PIE.BgPosition = (function() {

    var length_fifty = PIE.getLength( '50%' ),
        vert_idents = { 'top': 1, 'center': 1, 'bottom': 1 },
        horiz_idents = { 'left': 1, 'center': 1, 'right': 1 };


    function BgPosition( tokens ) {
        this.tokens = tokens;
    }
    BgPosition.prototype = {
        /**
         * Normalize the values into the form:
         * [ xOffsetSide, xOffsetLength, yOffsetSide, yOffsetLength ]
         * where: xOffsetSide is either 'left' or 'right',
         *        yOffsetSide is either 'top' or 'bottom',
         *        and x/yOffsetLength are both PIE.Length objects.
         * @return {Array}
         */
        getValues: function() {
            if( !this._values ) {
                var tokens = this.tokens,
                    len = tokens.length,
                    Tokenizer = PIE.Tokenizer,
                    identType = Tokenizer.Type,
                    length_zero = PIE.getLength( '0' ),
                    type_ident = identType.IDENT,
                    type_length = identType.LENGTH,
                    type_percent = identType.PERCENT,
                    type, value,
                    vals = [ 'left', length_zero, 'top', length_zero ];

                // If only one value, the second is assumed to be 'center'
                if( len === 1 ) {
                    tokens.push( new Tokenizer.Token( type_ident, 'center' ) );
                    len++;
                }

                // Two values - CSS2
                if( len === 2 ) {
                    // If both idents, they can appear in either order, so switch them if needed
                    if( type_ident & ( tokens[0].tokenType | tokens[1].tokenType ) &&
                        tokens[0].tokenValue in vert_idents && tokens[1].tokenValue in horiz_idents ) {
                        tokens.push( tokens.shift() );
                    }
                    if( tokens[0].tokenType & type_ident ) {
                        if( tokens[0].tokenValue === 'center' ) {
                            vals[1] = length_fifty;
                        } else {
                            vals[0] = tokens[0].tokenValue;
                        }
                    }
                    else if( tokens[0].isLengthOrPercent() ) {
                        vals[1] = PIE.getLength( tokens[0].tokenValue );
                    }
                    if( tokens[1].tokenType & type_ident ) {
                        if( tokens[1].tokenValue === 'center' ) {
                            vals[3] = length_fifty;
                        } else {
                            vals[2] = tokens[1].tokenValue;
                        }
                    }
                    else if( tokens[1].isLengthOrPercent() ) {
                        vals[3] = PIE.getLength( tokens[1].tokenValue );
                    }
                }

                // Three or four values - CSS3
                else {
                    // TODO
                }

                this._values = vals;
            }
            return this._values;
        },

        /**
         * Find the coordinates of the background image from the upper-left corner of the background area.
         * Note that these coordinate values are not rounded.
         * @param {Element} el
         * @param {number} width - the width for percentages (background area width minus image width)
         * @param {number} height - the height for percentages (background area height minus image height)
         * @return {Object} { x: Number, y: Number }
         */
        coords: function( el, width, height ) {
            var vals = this.getValues(),
                pxX = vals[1].pixels( el, width ),
                pxY = vals[3].pixels( el, height );

            return {
                x: vals[0] === 'right' ? width - pxX : pxX,
                y: vals[2] === 'bottom' ? height - pxY : pxY
            };
        }
    };

    return BgPosition;
})();
/**
 * Wrapper for a CSS3 background-size value.
 * @constructor
 * @param {String|PIE.Length} w The width parameter
 * @param {String|PIE.Length} h The height parameter, if any
 */
PIE.BgSize = (function() {

    var CONTAIN = 'contain',
        COVER = 'cover',
        AUTO = 'auto';


    function BgSize( w, h ) {
        this.w = w;
        this.h = h;
    }
    BgSize.prototype = {

        pixels: function( el, areaW, areaH, imgW, imgH ) {
            var me = this,
                w = me.w,
                h = me.h,
                areaRatio = areaW / areaH,
                imgRatio = imgW / imgH;

            if ( w === CONTAIN ) {
                w = imgRatio > areaRatio ? areaW : areaH * imgRatio;
                h = imgRatio > areaRatio ? areaW / imgRatio : areaH;
            }
            else if ( w === COVER ) {
                w = imgRatio < areaRatio ? areaW : areaH * imgRatio;
                h = imgRatio < areaRatio ? areaW / imgRatio : areaH;
            }
            else if ( w === AUTO ) {
                h = ( h === AUTO ? imgH : h.pixels( el, areaH ) );
                w = h * imgRatio;
            }
            else {
                w = w.pixels( el, areaW );
                h = ( h === AUTO ? w / imgRatio : h.pixels( el, areaH ) );
            }

            return { w: w, h: h };
        }

    };

    BgSize.DEFAULT = new BgSize( AUTO, AUTO );

    return BgSize;
})();
/**
 * Wrapper for angle values; handles conversion to degrees from all allowed angle units
 * @constructor
 * @param {string} val The raw CSS value for the angle. It is assumed it has been pre-validated.
 */
PIE.Angle = (function() {
    function Angle( val ) {
        this.val = val;
    }
    Angle.prototype = {
        unitRE: /[a-z]+$/i,

        /**
         * @return {string} The unit of the angle value
         */
        getUnit: function() {
            return this._unit || ( this._unit = this.val.match( this.unitRE )[0].toLowerCase() );
        },

        /**
         * Get the numeric value of the angle in degrees.
         * @return {number} The degrees value
         */
        degrees: function() {
            var deg = this._deg, u, n;
            if( deg === undefined ) {
                u = this.getUnit();
                n = parseFloat( this.val, 10 );
                deg = this._deg = ( u === 'deg' ? n : u === 'rad' ? n / Math.PI * 180 : u === 'grad' ? n / 400 * 360 : u === 'turn' ? n * 360 : 0 );
            }
            return deg;
        }
    };

    return Angle;
})();/**
 * Abstraction for colors values. Allows detection of rgba values. A singleton instance per unique
 * value is returned from PIE.getColor() - always use that instead of instantiating directly.
 * @constructor
 * @param {string} val The raw CSS string value for the color
 */
PIE.Color = (function() {

    /*
     * hsl2rgb from http://codingforums.com/showthread.php?t=11156
     * code by Jason Karl Davis (http://www.jasonkarldavis.com)
     * swiped from cssSandpaper by Zoltan Hawryluk (http://www.useragentman.com/blog/csssandpaper-a-css3-javascript-library/)
     * modified for formatting and size optimizations
     */
    function hsl2rgb( h, s, l ) {
        var m1, m2, r, g, b,
            round = Math.round;
        s /= 100;
        l /= 100;
        if ( !s ) { r = g = b = l * 255; }
        else {
            if ( l <= 0.5 ) { m2 = l * ( s + 1 ); }
            else { m2 = l + s - l * s; }
            m1 = l * 2 - m2;
            h = ( h % 360 ) / 360;
            r = hueToRgb( m1, m2, h + 1/3 );
            g = hueToRgb( m1, m2, h );
            b = hueToRgb( m1, m2, h - 1/3 );
        }
        return { r: round( r ), g: round( g ), b: round( b ) };
    }
    function hueToRgb( m1, m2, hue ) {
        var v;
        if ( hue < 0 ) { hue += 1; }
        else if ( hue > 1 ) { hue -= 1; }
        if ( 6 * hue < 1 ) { v = m1 + ( m2 - m1 ) * hue * 6; }
        else if ( 2 * hue < 1 ) { v = m2; }
        else if ( 3 * hue < 2 ) { v = m1 + ( m2 - m1 ) * ( 2/3 - hue ) * 6; }
        else { v = m1; }
        return 255 * v;
    }




    var instances = {};

    function Color( val ) {
        this.val = val;
    }

    /**
     * Regular expression for matching rgba colors and extracting their components
     * @type {RegExp}
     */
    Color.rgbOrRgbaRE = /\s*rgba?\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*(,\s*(\d+|\d*\.\d+))?\s*\)\s*/;
    Color.hslOrHslaRE = /\s*hsla?\(\s*(\d*\.?\d+)\s*,\s*(\d{1,3})%\s*,\s*(\d{1,3})%\s*(,\s*(\d+|\d*\.\d+))?\s*\)\s*/;

    /**
     * Hash of color keyword names to their corresponding hex values. Encoded for
     * small size and expanded into a hash on startup.
     */
    Color.names = {};

    var names = 'black|0|navy|3k|darkblue|b|mediumblue|1u|blue|1e|darkgreen|jk1|green|5j4|teal|3k|darkcyan|26j|deepskyblue|ad0|darkturquoise|2xe|mediumspringgreen|8nd|lime|va|springgreen|3j|aqua|3k|cyan|0|midnightblue|xunl|dodgerblue|7ogf|lightseagreen|2zsb|forestgreen|2lbs|seagreen|guut|darkslategray|12pk|limegreen|4wkj|mediumseagreen|dwlb|turquoise|5v8f|royalblue|r2p|steelblue|75qr|darkslateblue|2fh3|mediumturquoise|ta9|indigo|32d2|darkolivegreen|emr1|cadetblue|ebu9|cornflowerblue|6z4d|mediumaquamarine|3459|dimgray|3nwf|slateblue|1bok|olivedrab|1opi|slategray|6y5p|lightslategray|9vk9|mediumslateblue|5g0l|lawngreen|27ma|chartreuse|48ao|aquamarine|5w|maroon|18|purple|3k|olive|p6o|gray|3k|lightslateblue|5j7j|skyblue|4q98|lightskyblue|f|blueviolet|3bhk|darkred|15we|darkmagenta|3v|saddlebrown|djc|darkseagreen|69vg|lightgreen|1og1|mediumpurple|3ivc|darkviolet|sfv|palegreen|6zt1|darkorchid|awk|yellowgreen|292e|sienna|7r3v|brown|6sxp|darkgray|6bgf|lightblue|5vlp|greenyellow|7k9|paleturquoise|2pxb|lightsteelblue|169c|powderblue|5jc|firebrick|1rgc|darkgoldenrod|8z55|mediumorchid|2jm0|rosybrown|34jg|darkkhaki|1mfw|silver|49jp|mediumvioletred|8w5h|indianred|8tef|peru|82r|violetred|3ntd|feldspar|212d|chocolate|16eh|tan|ewe|lightgrey|1kqv|palevioletred|6h8g|metle|fnp|orchid|2dj2|goldenrod|abu|crimson|20ik|gainsboro|13mo|plum|12pt|burlywood|1j8q|lightcyan|3794|lavender|8agr|darksalmon|3rsw|violet|6wz8|palegoldenrod|k3g|lightcoral|28k6|khaki|k5o|aliceblue|3n7|honeydew|1dd|azure|f|sandybrown|5469|wheat|1q37|beige|4kp|whitesmoke|p|mintcream|1z9|ghostwhite|46bp|salmon|25bn|antiquewhite|l7p|linen|zz|lightgoldenrodyellow|1yk|oldlace|46qc|red|1gka|magenta|73|fuchsia|0|deeppink|3v8|orangered|9kd|tomato|5zb|hotpink|19p|coral|49o|darkorange|2i8|lightsalmon|41m|orange|w6|lightpink|3i9|pink|1ze|gold|4dx|peachpuff|qh|navajowhite|s4|moccasin|16w|bisque|f|mistyrose|t|blanchedalmond|1d8|papayawhip|so|lavenderblush|80|seashell|zd|cornsilk|ku|lemonchiffon|dt|floralwhite|z|snow|a|yellow|sm|lightyellow|68|ivory|g|white|f'.split('|'),
        i = 0, len = names.length, color = 0, hexColor;
    for(; i < len; i += 2) {
        color += parseInt(names[i + 1], 36);
        hexColor = color.toString(16);
        Color.names[names[i]] = '#000000'.slice(0, -hexColor.length) + hexColor;
    }

    Color.prototype = {
        /**
         * @private
         */
        parse: function() {
            if( !this._color ) {
                var me = this,
                    color = me.val,
                    alpha, vLower, m, rgb;

                // RGB or RGBA colors
                if( m = color.match( Color.rgbOrRgbaRE ) ) {
                    color = me.rgbToHex( +m[1], +m[2], +m[3] );
                    alpha = m[5] ? +m[5] : 1;
                }
                // HSL or HSLA colors
                else if( m = color.match( Color.hslOrHslaRE ) ) {
                    rgb = hsl2rgb( m[1], m[2], m[3] );
                    color = me.rgbToHex( rgb.r, rgb.g, rgb.b );
                    alpha = m[5] ? +m[5] : 1;
                }
                else {
                    if( Color.names.hasOwnProperty( vLower = color.toLowerCase() ) ) {
                        color = Color.names[vLower];
                    }
                    alpha = ( color === 'transparent' ? 0 : 1 );
                }
                me._color = color;
                me._alpha = alpha;
            }
        },

        /**
         * Converts RGB color channels to a hex value string
         */
        rgbToHex: function( r, g, b ) {
            return '#' + ( r < 16 ? '0' : '' ) + r.toString( 16 ) +
                         ( g < 16 ? '0' : '' ) + g.toString( 16 ) +
                         ( b < 16 ? '0' : '' ) + b.toString( 16 );
        },

        /**
         * Retrieve the value of the color in a format usable by IE natively. This will be the same as
         * the raw input value, except for rgb(a) and hsl(a) values which will be converted to a hex value.
         * @param {Element} el The context element, used to get 'currentColor' keyword value.
         * @return {string} Color value
         */
        colorValue: function( el ) {
            this.parse();
            return this._color === 'currentColor' ? PIE.getColor( el.currentStyle.color ).colorValue( el ) : this._color;
        },

        /**
         * Retrieve the value of the color in a normalized six-digit hex format.
         * @param el
         */
        hexValue: function( el ) {
            var color = this.colorValue( el );
            // At this point the color should be either a 3- or 6-digit hex value, or the string "transparent".

            function ch( i ) {
                return color.charAt( i );
            }

            // Fudge transparent to black - should be ignored anyway since its alpha will be 0
            if( color === 'transparent' ) {
                color = '#000';
            }
            // Expand 3-digit to 6-digit hex
            if( ch(0) === '#' && color.length === 4 ) {
                color = '#' + ch(1) + ch(1) + ch(2) + ch(2) + ch(3) + ch(3);
            }
            return color;
        },

        /**
         * Retrieve the alpha value of the color. Will be 1 for all values except for rgba values
         * with an alpha component.
         * @return {number} The alpha value, from 0 to 1.
         */
        alpha: function() {
            this.parse();
            return this._alpha;
        }
    };


    /**
     * Retrieve a PIE.Color instance for the given value. A shared singleton instance is returned for each unique value.
     * @param {string} val The CSS string representing the color. It is assumed that this will already have
     *                 been validated as a valid color syntax.
     */
    PIE.getColor = function(val) {
        return instances[ val ] || ( instances[ val ] = new Color( val ) );
    };

    return Color;
})();/**
 * A tokenizer for CSS value strings.
 * @constructor
 * @param {string} css The CSS value string
 */
PIE.Tokenizer = (function() {
    function Tokenizer( css ) {
        this.css = css;
        this.ch = 0;
        this.tokens = [];
        this.tokenIndex = 0;
    }

    /**
     * Enumeration of token type constants.
     * @enum {number}
     */
    var Type = Tokenizer.Type = {
        ANGLE: 1,
        CHARACTER: 2,
        COLOR: 4,
        DIMEN: 8,
        FUNCTION: 16,
        IDENT: 32,
        LENGTH: 64,
        NUMBER: 128,
        OPERATOR: 256,
        PERCENT: 512,
        STRING: 1024,
        URL: 2048
    };

    /**
     * A single token
     * @constructor
     * @param {number} type The type of the token - see PIE.Tokenizer.Type
     * @param {string} value The value of the token
     */
    Tokenizer.Token = function( type, value ) {
        this.tokenType = type;
        this.tokenValue = value;
    };
    Tokenizer.Token.prototype = {
        isLength: function() {
            return this.tokenType & Type.LENGTH || ( this.tokenType & Type.NUMBER && this.tokenValue === '0' );
        },
        isLengthOrPercent: function() {
            return this.isLength() || this.tokenType & Type.PERCENT;
        }
    };

    Tokenizer.prototype = {
        whitespace: /\s/,
        number: /^[\+\-]?(\d*\.)?\d+/,
        url: /^url\(\s*("([^"]*)"|'([^']*)'|([!#$%&*-~]*))\s*\)/i,
        ident: /^\-?[_a-z][\w-]*/i,
        string: /^("([^"]*)"|'([^']*)')/,
        operator: /^[\/,]/,
        hash: /^#[\w]+/,
        hashColor: /^#([\da-f]{6}|[\da-f]{3})/i,

        unitTypes: {
            'px': Type.LENGTH, 'em': Type.LENGTH, 'ex': Type.LENGTH,
            'mm': Type.LENGTH, 'cm': Type.LENGTH, 'in': Type.LENGTH,
            'pt': Type.LENGTH, 'pc': Type.LENGTH,
            'deg': Type.ANGLE, 'rad': Type.ANGLE, 'grad': Type.ANGLE
        },

        colorFunctions: {
            'rgb': 1, 'rgba': 1, 'hsl': 1, 'hsla': 1
        },


        /**
         * Advance to and return the next token in the CSS string. If the end of the CSS string has
         * been reached, null will be returned.
         * @param {boolean} forget - if true, the token will not be stored for the purposes of backtracking with prev().
         * @return {PIE.Tokenizer.Token}
         */
        next: function( forget ) {
            var css, ch, firstChar, match, val,
                me = this;

            function newToken( type, value ) {
                var tok = new Tokenizer.Token( type, value );
                if( !forget ) {
                    me.tokens.push( tok );
                    me.tokenIndex++;
                }
                return tok;
            }
            function failure() {
                me.tokenIndex++;
                return null;
            }

            // In case we previously backed up, return the stored token in the next slot
            if( this.tokenIndex < this.tokens.length ) {
                return this.tokens[ this.tokenIndex++ ];
            }

            // Move past leading whitespace characters
            while( this.whitespace.test( this.css.charAt( this.ch ) ) ) {
                this.ch++;
            }
            if( this.ch >= this.css.length ) {
                return failure();
            }

            ch = this.ch;
            css = this.css.substring( this.ch );
            firstChar = css.charAt( 0 );
            switch( firstChar ) {
                case '#':
                    if( match = css.match( this.hashColor ) ) {
                        this.ch += match[0].length;
                        return newToken( Type.COLOR, match[0] );
                    }
                    break;

                case '"':
                case "'":
                    if( match = css.match( this.string ) ) {
                        this.ch += match[0].length;
                        return newToken( Type.STRING, match[2] || match[3] || '' );
                    }
                    break;

                case "/":
                case ",":
                    this.ch++;
                    return newToken( Type.OPERATOR, firstChar );

                case 'u':
                    if( match = css.match( this.url ) ) {
                        this.ch += match[0].length;
                        return newToken( Type.URL, match[2] || match[3] || match[4] || '' );
                    }
            }

            // Numbers and values starting with numbers
            if( match = css.match( this.number ) ) {
                val = match[0];
                this.ch += val.length;

                // Check if it is followed by a unit
                if( css.charAt( val.length ) === '%' ) {
                    this.ch++;
                    return newToken( Type.PERCENT, val + '%' );
                }
                if( match = css.substring( val.length ).match( this.ident ) ) {
                    val += match[0];
                    this.ch += match[0].length;
                    return newToken( this.unitTypes[ match[0].toLowerCase() ] || Type.DIMEN, val );
                }

                // Plain ol' number
                return newToken( Type.NUMBER, val );
            }

            // Identifiers
            if( match = css.match( this.ident ) ) {
                val = match[0];
                this.ch += val.length;

                // Named colors
                if( val.toLowerCase() in PIE.Color.names || val === 'currentColor' || val === 'transparent' ) {
                    return newToken( Type.COLOR, val );
                }

                // Functions
                if( css.charAt( val.length ) === '(' ) {
                    this.ch++;

                    // Color values in function format: rgb, rgba, hsl, hsla
                    if( val.toLowerCase() in this.colorFunctions ) {
                        function isNum( tok ) {
                            return tok && tok.tokenType & Type.NUMBER;
                        }
                        function isNumOrPct( tok ) {
                            return tok && ( tok.tokenType & ( Type.NUMBER | Type.PERCENT ) );
                        }
                        function isValue( tok, val ) {
                            return tok && tok.tokenValue === val;
                        }
                        function next() {
                            return me.next( 1 );
                        }

                        if( ( val.charAt(0) === 'r' ? isNumOrPct( next() ) : isNum( next() ) ) &&
                            isValue( next(), ',' ) &&
                            isNumOrPct( next() ) &&
                            isValue( next(), ',' ) &&
                            isNumOrPct( next() ) &&
                            ( val === 'rgb' || val === 'hsa' || (
                                isValue( next(), ',' ) &&
                                isNum( next() )
                            ) ) &&
                            isValue( next(), ')' ) ) {
                            return newToken( Type.COLOR, this.css.substring( ch, this.ch ) );
                        }
                        return failure();
                    }

                    return newToken( Type.FUNCTION, val );
                }

                // Other identifier
                return newToken( Type.IDENT, val );
            }

            // Standalone character
            this.ch++;
            return newToken( Type.CHARACTER, firstChar );
        },

        /**
         * Determine whether there is another token
         * @return {boolean}
         */
        hasNext: function() {
            var next = this.next();
            this.prev();
            return !!next;
        },

        /**
         * Back up and return the previous token
         * @return {PIE.Tokenizer.Token}
         */
        prev: function() {
            return this.tokens[ this.tokenIndex-- - 2 ];
        },

        /**
         * Retrieve all the tokens in the CSS string
         * @return {Array.<PIE.Tokenizer.Token>}
         */
        all: function() {
            while( this.next() ) {}
            return this.tokens;
        },

        /**
         * Return a list of tokens from the current position until the given function returns
         * true. The final token will not be included in the list.
         * @param {function():boolean} func - test function
         * @param {boolean} require - if true, then if the end of the CSS string is reached
         *        before the test function returns true, null will be returned instead of the
         *        tokens that have been found so far.
         * @return {Array.<PIE.Tokenizer.Token>}
         */
        until: function( func, require ) {
            var list = [], t, hit;
            while( t = this.next() ) {
                if( func( t ) ) {
                    hit = true;
                    this.prev();
                    break;
                }
                list.push( t );
            }
            return require && !hit ? null : list;
        }
    };

    return Tokenizer;
})();/**
 * Handles calculating, caching, and detecting changes to size and position of the element.
 * @constructor
 * @param {Element} el the target element
 */
PIE.BoundsInfo = function( el ) {
    this.targetElement = el;
};
PIE.BoundsInfo.prototype = {

    _locked: 0,

    /**
     * Determines if the element's position has changed since the last update.
     * TODO this does a simple getBoundingClientRect comparison for detecting the
     * changes in position, which may not always be accurate; it's possible that
     * an element will actually move relative to its positioning parent, but its position
     * relative to the viewport will stay the same. Need to come up with a better way to
     * track movement. The most accurate would be the same logic used in RootRenderer.updatePos()
     * but that is a more expensive operation since it performs DOM walking, and we want this
     * check to be as fast as possible. Perhaps introduce a -pie-* flag to trigger the slower
     * but more accurate method?
     */
    positionChanged: function() {
        var last = this._lastBounds,
            bounds;
        return !last || ( ( bounds = this.getBounds() ) && ( last.x !== bounds.x || last.y !== bounds.y ) );
    },

    sizeChanged: function() {
        var last = this._lastBounds,
            bounds;
        return !last || ( ( bounds = this.getBounds() ) && ( last.w !== bounds.w || last.h !== bounds.h ) );
    },

    getLiveBounds: function() {
        var el = this.targetElement,
            rect = el.getBoundingClientRect(),
            isIE9 = PIE.ieDocMode === 9,
            isIE7 = PIE.ieVersion === 7,
            width = rect.right - rect.left;
        return {
            x: rect.left,
            y: rect.top,
            // In some cases scrolling the page will cause IE9 to report incorrect dimensions
            // in the rect returned by getBoundingClientRect, so we must query offsetWidth/Height
            // instead. Also IE7 is inconsistent in using logical vs. device pixels in measurements
            // so we must calculate the ratio and use it in certain places as a position adjustment.
            w: isIE9 || isIE7 ? el.offsetWidth : width,
            h: isIE9 || isIE7 ? el.offsetHeight : rect.bottom - rect.top,
            logicalZoomRatio: ( isIE7 && width ) ? el.offsetWidth / width : 1
        };
    },

    getBounds: function() {
        return this._locked ? 
                ( this._lockedBounds || ( this._lockedBounds = this.getLiveBounds() ) ) :
                this.getLiveBounds();
    },

    hasBeenQueried: function() {
        return !!this._lastBounds;
    },

    lock: function() {
        ++this._locked;
    },

    unlock: function() {
        if( !--this._locked ) {
            if( this._lockedBounds ) this._lastBounds = this._lockedBounds;
            this._lockedBounds = null;
        }
    }

};
(function() {

function cacheWhenLocked( fn ) {
    var uid = PIE.Util.getUID( fn );
    return function() {
        if( this._locked ) {
            var cache = this._lockedValues || ( this._lockedValues = {} );
            return ( uid in cache ) ? cache[ uid ] : ( cache[ uid ] = fn.call( this ) );
        } else {
            return fn.call( this );
        }
    }
}


PIE.StyleInfoBase = {

    _locked: 0,

    /**
     * Create a new StyleInfo class, with the standard constructor, and augmented by
     * the StyleInfoBase's members.
     * @param proto
     */
    newStyleInfo: function( proto ) {
        function StyleInfo( el ) {
            this.targetElement = el;
            this._lastCss = this.getCss();
        }
        PIE.merge( StyleInfo.prototype, PIE.StyleInfoBase, proto );
        StyleInfo._propsCache = {};
        return StyleInfo;
    },

    /**
     * Get an object representation of the target CSS style, caching it for each unique
     * CSS value string.
     * @return {Object}
     */
    getProps: function() {
        var css = this.getCss(),
            cache = this.constructor._propsCache;
        return css ? ( css in cache ? cache[ css ] : ( cache[ css ] = this.parseCss( css ) ) ) : null;
    },

    /**
     * Get the raw CSS value for the target style
     * @return {string}
     */
    getCss: cacheWhenLocked( function() {
        var el = this.targetElement,
            ctor = this.constructor,
            s = el.style,
            cs = el.currentStyle,
            cssProp = this.cssProperty,
            styleProp = this.styleProperty,
            prefixedCssProp = ctor._prefixedCssProp || ( ctor._prefixedCssProp = PIE.CSS_PREFIX + cssProp ),
            prefixedStyleProp = ctor._prefixedStyleProp || ( ctor._prefixedStyleProp = PIE.STYLE_PREFIX + styleProp.charAt(0).toUpperCase() + styleProp.substring(1) );
        return s[ prefixedStyleProp ] || cs.getAttribute( prefixedCssProp ) || s[ styleProp ] || cs.getAttribute( cssProp );
    } ),

    /**
     * Determine whether the target CSS style is active.
     * @return {boolean}
     */
    isActive: cacheWhenLocked( function() {
        return !!this.getProps();
    } ),

    /**
     * Determine whether the target CSS style has changed since the last time it was used.
     * @return {boolean}
     */
    changed: cacheWhenLocked( function() {
        var currentCss = this.getCss(),
            changed = currentCss !== this._lastCss;
        this._lastCss = currentCss;
        return changed;
    } ),

    cacheWhenLocked: cacheWhenLocked,

    lock: function() {
        ++this._locked;
    },

    unlock: function() {
        if( !--this._locked ) {
            delete this._lockedValues;
        }
    }
};

})();/**
 * Handles parsing, caching, and detecting changes to background (and -pie-background) CSS
 * @constructor
 * @param {Element} el the target element
 */
PIE.BackgroundStyleInfo = PIE.StyleInfoBase.newStyleInfo( {

    cssProperty: PIE.CSS_PREFIX + 'background',
    styleProperty: PIE.STYLE_PREFIX + 'Background',

    attachIdents: { 'scroll':1, 'fixed':1, 'local':1 },
    repeatIdents: { 'repeat-x':1, 'repeat-y':1, 'repeat':1, 'no-repeat':1 },
    originAndClipIdents: { 'padding-box':1, 'border-box':1, 'content-box':1 },
    positionIdents: { 'top':1, 'right':1, 'bottom':1, 'left':1, 'center':1 },
    sizeIdents: { 'contain':1, 'cover':1 },
    tbIdents: { 'top': 1, 'bottom': 1 },
    lrIdents: { 'left': 1, 'right': 1 },
    propertyNames: {
        CLIP: 'backgroundClip',
        COLOR: 'backgroundColor',
        IMAGE: 'backgroundImage',
        ORIGIN: 'backgroundOrigin',
        POSITION: 'backgroundPosition',
        REPEAT: 'backgroundRepeat',
        SIZE: 'backgroundSize'
    },

    /**
     * For background styles, we support the -pie-background property but fall back to the standard
     * backround* properties.  The reason we have to use the prefixed version is that IE natively
     * parses the standard properties and if it sees something it doesn't know how to parse, for example
     * multiple values or gradient definitions, it will throw that away and not make it available through
     * currentStyle.
     *
     * Format of return object:
     * {
     *     color: <PIE.Color>,
     *     colorClip: <'border-box' | 'padding-box'>,
     *     bgImages: [
     *         {
     *             imgType: 'image',
     *             imgUrl: 'image.png',
     *             imgRepeat: <'no-repeat' | 'repeat-x' | 'repeat-y' | 'repeat'>,
     *             bgPosition: <PIE.BgPosition>,
     *             bgAttachment: <'scroll' | 'fixed' | 'local'>,
     *             bgOrigin: <'border-box' | 'padding-box' | 'content-box'>,
     *             bgClip: <'border-box' | 'padding-box'>,
     *             bgSize: <PIE.BgSize>,
     *             origString: 'url(img.png) no-repeat top left'
     *         },
     *         {
     *             imgType: 'linear-gradient',
     *             gradientTo: [<'top' | 'bottom'>, <'left' | 'right'>?],
     *             angle: <PIE.Angle>,
     *             stops: [
     *                 { color: <PIE.Color>, offset: <PIE.Length> },
     *                 { color: <PIE.Color>, offset: <PIE.Length> }, ...
     *             ]
     *         }
     *     ]
     * }
     * @param {String} css
     * @override
     */
    parseCss: function( css ) {
        var el = this.targetElement,
            cs = el.currentStyle,
            tokenizer, token, image,
            tok_type = PIE.Tokenizer.Type,
            type_operator = tok_type.OPERATOR,
            type_ident = tok_type.IDENT,
            type_color = tok_type.COLOR,
            tokType, tokVal,
            beginCharIndex = 0,
            positionIdents = this.positionIdents,
            gradient, stop, width, height, gradientTo, len, tbIdents, lrIdents,
            props = { bgImages: [] };

        function isBgPosToken( token ) {
            return token && token.isLengthOrPercent() || ( token.tokenType & type_ident && token.tokenValue in positionIdents );
        }

        function sizeToken( token ) {
            return token && ( ( token.isLengthOrPercent() && PIE.getLength( token.tokenValue ) ) || ( token.tokenValue === 'auto' && 'auto' ) );
        }

        // If the CSS3-specific -pie-background property is present, parse it
        if( this.getCss3() ) {
            tokenizer = new PIE.Tokenizer( css );
            image = {};

            while( token = tokenizer.next() ) {
                tokType = token.tokenType;
                tokVal = token.tokenValue;

                if( !image.imgType && tokType & tok_type.FUNCTION && tokVal === 'linear-gradient' ) {
                    gradient = { stops: [], imgType: tokVal };
                    stop = {};
                    while( token = tokenizer.next() ) {
                        tokType = token.tokenType;
                        tokVal = token.tokenValue;

                        // If we reached the end of the function and had at least 2 stops, flush the info
                        if( tokType & tok_type.CHARACTER && tokVal === ')' ) {
                            if( stop.color ) {
                                gradient.stops.push( stop );
                            }
                            if( gradient.stops.length > 1 ) {
                                PIE.merge( image, gradient );
                            }
                            break;
                        }

                        // Color stop - must start with color
                        if( tokType & type_color ) {
                            // if we already have an angle/position, make sure that the previous token was a comma
                            if( gradient.angle || gradient.gradientTo ) {
                                token = tokenizer.prev();
                                if( token.tokenType !== type_operator ) {
                                    break; //fail
                                }
                                tokenizer.next();
                            }

                            stop = {
                                color: PIE.getColor( tokVal )
                            };
                            // check for offset following color
                            token = tokenizer.next();
                            if( token.isLengthOrPercent() ) {
                                stop.offset = PIE.getLength( token.tokenValue );
                            } else {
                                tokenizer.prev();
                            }
                        }
                        // Angle - can only appear in first spot
                        else if( tokType & tok_type.ANGLE && !gradient.angle && !gradient.gradientTo && !stop.color && !gradient.stops.length ) {
                            gradient.angle = new PIE.Angle( token.tokenValue );
                        }
                        // "to <side-or-corner>" - can only appear in first spot
                        else if( tokType & tok_type.IDENT && tokVal === 'to' && !gradient.gradientTo && !gradient.angle && !stop.color && !gradient.stops.length ) {
                            tbIdents = this.tbIdents;
                            lrIdents = this.lrIdents;

                            gradientTo = tokenizer.until( function( t ) {
                                return !(t && t.tokenType & tok_type.IDENT && ( t.tokenValue in tbIdents || t.tokenValue in lrIdents ));
                            } );
                            len = gradientTo.length;
                            gradientTo = [ gradientTo[0] && gradientTo[0].tokenValue, gradientTo[1] && gradientTo[1].tokenValue ];

                            // bail unless there are 1 or 2 values, or if the 2 values are from the same pair of sides
                            if ( len < 1 || len > 2 || ( len > 1 && (
                                ( gradientTo[0] in tbIdents && gradientTo[1] in tbIdents ) ||
                                ( gradientTo[0] in lrIdents && gradientTo[1] in lrIdents )
                            ) ) ) {
                                break;
                            }
                            gradient.gradientTo = gradientTo;
                        }
                        else if( tokType & type_operator && tokVal === ',' ) {
                            if( stop.color ) {
                                gradient.stops.push( stop );
                                stop = {};
                            }
                        }
                        else {
                            // Found something we didn't recognize; fail without adding image
                            break;
                        }
                    }
                }
                else if( !image.imgType && tokType & tok_type.URL ) {
                    image.imgUrl = tokVal;
                    image.imgType = 'image';
                }
                else if( isBgPosToken( token ) && !image.bgPosition ) {
                    tokenizer.prev();
                    image.bgPosition = new PIE.BgPosition(
                        tokenizer.until( function( t ) {
                            return !isBgPosToken( t );
                        }, false )
                    );
                }
                else if( tokType & type_ident ) {
                    if( tokVal in this.repeatIdents && !image.imgRepeat ) {
                        image.imgRepeat = tokVal;
                    }
                    else if( tokVal in this.originAndClipIdents && !image.bgOrigin ) {
                        image.bgOrigin = tokVal;
                        if( ( token = tokenizer.next() ) && ( token.tokenType & type_ident ) &&
                            token.tokenValue in this.originAndClipIdents ) {
                            image.bgClip = token.tokenValue;
                        } else {
                            image.bgClip = tokVal;
                            tokenizer.prev();
                        }
                    }
                    else if( tokVal in this.attachIdents && !image.bgAttachment ) {
                        image.bgAttachment = tokVal;
                    }
                    else {
                        return null;
                    }
                }
                else if( tokType & type_color && !props.color ) {
                    props.color = PIE.getColor( tokVal );
                }
                else if( tokType & type_operator && tokVal === '/' && !image.bgSize && image.bgPosition ) {
                    // background size
                    token = tokenizer.next();
                    if( token.tokenType & type_ident && token.tokenValue in this.sizeIdents ) {
                        image.bgSize = new PIE.BgSize( token.tokenValue );
                    }
                    else if( width = sizeToken( token ) ) {
                        height = sizeToken( tokenizer.next() );
                        if ( !height ) {
                            height = width;
                            tokenizer.prev();
                        }
                        image.bgSize = new PIE.BgSize( width, height );
                    }
                    else {
                        return null;
                    }
                }
                // new layer
                else if( tokType & type_operator && tokVal === ',' && image.imgType ) {
                    image.origString = css.substring( beginCharIndex, tokenizer.ch - 1 );
                    beginCharIndex = tokenizer.ch;
                    props.bgImages.push( image );
                    image = {};
                }
                else {
                    // Found something unrecognized; chuck everything
                    return null;
                }
            }

            // leftovers
            if( image.imgType ) {
                image.origString = css.substring( beginCharIndex );
                props.bgImages.push( image );
            }

            props.colorClip = image.bgClip;
        }

        // Otherwise, use the standard background properties; let IE give us the values rather than parsing them
        else {
            this.withActualBg( PIE.ieDocMode < 9 ?
                function() {
                    var propNames = this.propertyNames,
                        posX = cs[propNames.POSITION + 'X'],
                        posY = cs[propNames.POSITION + 'Y'],
                        img = cs[propNames.IMAGE],
                        color = cs[propNames.COLOR];

                    if( color !== 'transparent' ) {
                        props.color = PIE.getColor( color )
                    }
                    if( img !== 'none' ) {
                        props.bgImages = [ {
                            imgType: 'image',
                            imgUrl: new PIE.Tokenizer( img ).next().tokenValue,
                            imgRepeat: cs[propNames.REPEAT],
                            bgPosition: new PIE.BgPosition( new PIE.Tokenizer( posX + ' ' + posY ).all() )
                        } ];
                    }
                } :
                function() {
                    var propNames = this.propertyNames,
                        splitter = /\s*,\s*/,
                        images = cs[propNames.IMAGE].split( splitter ),
                        color = cs[propNames.COLOR],
                        repeats, positions, origins, clips, sizes, i, len, image, sizeParts;

                    if( color !== 'transparent' ) {
                        props.color = PIE.getColor( color )
                    }

                    len = images.length;
                    if( len && images[0] !== 'none' ) {
                        repeats = cs[propNames.REPEAT].split( splitter );
                        positions = cs[propNames.POSITION].split( splitter );
                        origins = cs[propNames.ORIGIN].split( splitter );
                        clips = cs[propNames.CLIP].split( splitter );
                        sizes = cs[propNames.SIZE].split( splitter );

                        props.bgImages = [];
                        for( i = 0; i < len; i++ ) {
                            image = images[ i ];
                            if( image && image !== 'none' ) {
                                sizeParts = sizes[i].split( ' ' );
                                props.bgImages.push( {
                                    origString: image + ' ' + repeats[ i ] + ' ' + positions[ i ] + ' / ' + sizes[ i ] + ' ' +
                                                origins[ i ] + ' ' + clips[ i ],
                                    imgType: 'image',
                                    imgUrl: new PIE.Tokenizer( image ).next().tokenValue,
                                    imgRepeat: repeats[ i ],
                                    bgPosition: new PIE.BgPosition( new PIE.Tokenizer( positions[ i ] ).all() ),
                                    bgOrigin: origins[ i ],
                                    bgClip: clips[ i ],
                                    bgSize: new PIE.BgSize( sizeParts[ 0 ], sizeParts[ 1 ] )
                                } );
                            }
                        }
                    }
                }
            );
        }

        return ( props.color || props.bgImages[0] ) ? props : null;
    },

    /**
     * Execute a function with the actual background styles (not overridden with runtimeStyle
     * properties set by the renderers) available via currentStyle.
     * @param fn
     */
    withActualBg: function( fn ) {
        var isIE9 = PIE.ieDocMode > 8,
            propNames = this.propertyNames,
            rs = this.targetElement.runtimeStyle,
            rsImage = rs[propNames.IMAGE],
            rsColor = rs[propNames.COLOR],
            rsRepeat = rs[propNames.REPEAT],
            rsClip, rsOrigin, rsSize, rsPosition, ret;

        if( rsImage ) rs[propNames.IMAGE] = '';
        if( rsColor ) rs[propNames.COLOR] = '';
        if( rsRepeat ) rs[propNames.REPEAT] = '';
        if( isIE9 ) {
            rsClip = rs[propNames.CLIP];
            rsOrigin = rs[propNames.ORIGIN];
            rsPosition = rs[propNames.POSITION];
            rsSize = rs[propNames.SIZE];
            if( rsClip ) rs[propNames.CLIP] = '';
            if( rsOrigin ) rs[propNames.ORIGIN] = '';
            if( rsPosition ) rs[propNames.POSITION] = '';
            if( rsSize ) rs[propNames.SIZE] = '';
        }

        ret = fn.call( this );

        if( rsImage ) rs[propNames.IMAGE] = rsImage;
        if( rsColor ) rs[propNames.COLOR] = rsColor;
        if( rsRepeat ) rs[propNames.REPEAT] = rsRepeat;
        if( isIE9 ) {
            if( rsClip ) rs[propNames.CLIP] = rsClip;
            if( rsOrigin ) rs[propNames.ORIGIN] = rsOrigin;
            if( rsPosition ) rs[propNames.POSITION] = rsPosition;
            if( rsSize ) rs[propNames.SIZE] = rsSize;
        }

        return ret;
    },

    getCss: PIE.StyleInfoBase.cacheWhenLocked( function() {
        return this.getCss3() ||
               this.withActualBg( function() {
                   var cs = this.targetElement.currentStyle,
                       propNames = this.propertyNames;
                   return cs[propNames.COLOR] + ' ' + cs[propNames.IMAGE] + ' ' + cs[propNames.REPEAT] + ' ' +
                   cs[propNames.POSITION + 'X'] + ' ' + cs[propNames.POSITION + 'Y'];
               } );
    } ),

    getCss3: PIE.StyleInfoBase.cacheWhenLocked( function() {
        var el = this.targetElement;
        return el.style[ this.styleProperty ] || el.currentStyle.getAttribute( this.cssProperty );
    } ),


    /**
     * For a given background-origin value, return the dimensions of the background area.
     * @param {String} bgOrigin
     * @param {PIE.BoundsInfo} boundsInfo
     * @param {PIE.BorderStyleInfo} borderInfo
     */
    getBgAreaSize: function( bgOrigin, boundsInfo, borderInfo, paddingInfo ) {
        var el = this.targetElement,
            bounds = boundsInfo.getBounds(),
            w = bounds.w,
            h = bounds.h,
            borders, paddings;

        if( bgOrigin !== 'border-box' ) {
            borders = borderInfo.getProps();
            if( borders && ( borders = borders.widths ) ) {
                w -= borders[ 'l' ].pixels( el ) + borders[ 'l' ].pixels( el );
                h -= borders[ 't' ].pixels( el ) + borders[ 'b' ].pixels( el );
            }
        }

        if ( bgOrigin === 'content-box' ) {
            paddings = paddingInfo.getProps();
            if ( paddings ) {
                w -= paddings[ 'l' ].pixels( el ) + paddings[ 'l' ].pixels( el );
                h -= paddings[ 't' ].pixels( el ) + paddings[ 'b' ].pixels( el );
            }
        }

        return { w: w, h: h };
    },


    /**
     * Tests if style.PiePngFix or the -pie-png-fix property is set to true in IE6.
     */
    isPngFix: function() {
        var val = 0, el;
        if( PIE.ieVersion < 7 ) {
            el = this.targetElement;
            val = ( '' + ( el.style[ PIE.STYLE_PREFIX + 'PngFix' ] || el.currentStyle.getAttribute( PIE.CSS_PREFIX + 'png-fix' ) ) === 'true' );
        }
        return val;
    },
    
    /**
     * The isActive logic is slightly different, because getProps() always returns an object
     * even if it is just falling back to the native background properties.  But we only want
     * to report is as being "active" if either the -pie-background override property is present
     * and parses successfully or '-pie-png-fix' is set to true in IE6.
     */
    isActive: PIE.StyleInfoBase.cacheWhenLocked( function() {
        return (this.getCss3() || this.isPngFix()) && !!this.getProps();
    } )

} );/**
 * Handles parsing, caching, and detecting changes to border CSS
 * @constructor
 * @param {Element} el the target element
 */
PIE.BorderStyleInfo = PIE.StyleInfoBase.newStyleInfo( {

    sides: [ 'Top', 'Right', 'Bottom', 'Left' ],
    namedWidths: {
        'thin': '1px',
        'medium': '3px',
        'thick': '5px'
    },

    parseCss: function( css ) {
        var w = {},
            s = {},
            c = {},
            active = false,
            colorsSame = true,
            stylesSame = true,
            widthsSame = true;

        this.withActualBorder( function() {
            var el = this.targetElement,
                cs = el.currentStyle,
                i = 0,
                style, color, width, lastStyle, lastColor, lastWidth, side, ltr;
            for( ; i < 4; i++ ) {
                side = this.sides[ i ];

                ltr = side.charAt(0).toLowerCase();
                style = s[ ltr ] = cs[ 'border' + side + 'Style' ];
                color = cs[ 'border' + side + 'Color' ];
                width = cs[ 'border' + side + 'Width' ];

                if( i > 0 ) {
                    if( style !== lastStyle ) { stylesSame = false; }
                    if( color !== lastColor ) { colorsSame = false; }
                    if( width !== lastWidth ) { widthsSame = false; }
                }
                lastStyle = style;
                lastColor = color;
                lastWidth = width;

                c[ ltr ] = PIE.getColor( color );

                width = w[ ltr ] = PIE.getLength( s[ ltr ] === 'none' ? '0' : ( this.namedWidths[ width ] || width ) );
                if( width.pixels( this.targetElement ) > 0 ) {
                    active = true;
                }
            }
        } );

        return active ? {
            widths: w,
            styles: s,
            colors: c,
            widthsSame: widthsSame,
            colorsSame: colorsSame,
            stylesSame: stylesSame
        } : null;
    },

    getCss: PIE.StyleInfoBase.cacheWhenLocked( function() {
        var el = this.targetElement,
            cs = el.currentStyle,
            css;

        // Don't redraw or hide borders for cells in border-collapse:collapse tables
        if( !( el.tagName in PIE.tableCellTags && el.offsetParent.currentStyle.borderCollapse === 'collapse' ) ) {
            this.withActualBorder( function() {
                css = cs.borderWidth + '|' + cs.borderStyle + '|' + cs.borderColor;
            } );
        }
        return css;
    } ),

    /**
     * Execute a function with the actual border styles (not overridden with runtimeStyle
     * properties set by the renderers) available via currentStyle.
     * @param fn
     */
    withActualBorder: function( fn ) {
        var rs = this.targetElement.runtimeStyle,
            rsWidth = rs.borderWidth,
            rsColor = rs.borderColor,
            ret;

        if( rsWidth ) rs.borderWidth = '';
        if( rsColor ) rs.borderColor = '';

        ret = fn.call( this );

        if( rsWidth ) rs.borderWidth = rsWidth;
        if( rsColor ) rs.borderColor = rsColor;

        return ret;
    }

} );
/**
 * Handles parsing, caching, and detecting changes to border-radius CSS
 * @constructor
 * @param {Element} el the target element
 */
(function() {

PIE.BorderRadiusStyleInfo = PIE.StyleInfoBase.newStyleInfo( {

    cssProperty: 'border-radius',
    styleProperty: 'borderRadius',

    parseCss: function( css ) {
        var p = null, x, y,
            tokenizer, token, length,
            hasNonZero = false;

        if( css ) {
            tokenizer = new PIE.Tokenizer( css );

            function collectLengths() {
                var arr = [], num;
                while( ( token = tokenizer.next() ) && token.isLengthOrPercent() ) {
                    length = PIE.getLength( token.tokenValue );
                    num = length.getNumber();
                    if( num < 0 ) {
                        return null;
                    }
                    if( num > 0 ) {
                        hasNonZero = true;
                    }
                    arr.push( length );
                }
                return arr.length > 0 && arr.length < 5 ? {
                        'tl': arr[0],
                        'tr': arr[1] || arr[0],
                        'br': arr[2] || arr[0],
                        'bl': arr[3] || arr[1] || arr[0]
                    } : null;
            }

            // Grab the initial sequence of lengths
            if( x = collectLengths() ) {
                // See if there is a slash followed by more lengths, for the y-axis radii
                if( token ) {
                    if( token.tokenType & PIE.Tokenizer.Type.OPERATOR && token.tokenValue === '/' ) {
                        y = collectLengths();
                    }
                } else {
                    y = x;
                }

                // Treat all-zero values the same as no value
                if( hasNonZero && x && y ) {
                    p = { x: x, y : y };
                }
            }
        }

        return p;
    }
} );

var zero = PIE.getLength( '0' ),
    zeros = { 'tl': zero, 'tr': zero, 'br': zero, 'bl': zero };
PIE.BorderRadiusStyleInfo.ALL_ZERO = { x: zeros, y: zeros };

})();/**
 * Handles parsing, caching, and detecting changes to border-image CSS
 * @constructor
 * @param {Element} el the target element
 */
PIE.BorderImageStyleInfo = PIE.StyleInfoBase.newStyleInfo( {

    cssProperty: 'border-image',
    styleProperty: 'borderImage',

    repeatIdents: { 'stretch':1, 'round':1, 'repeat':1, 'space':1 },

    parseCss: function( css ) {
        var p = null, tokenizer, token, type, value,
            slices, widths, outsets,
            slashCount = 0,
            Type = PIE.Tokenizer.Type,
            IDENT = Type.IDENT,
            NUMBER = Type.NUMBER,
            PERCENT = Type.PERCENT;

        if( css ) {
            tokenizer = new PIE.Tokenizer( css );
            p = {};

            function isSlash( token ) {
                return token && ( token.tokenType & Type.OPERATOR ) && ( token.tokenValue === '/' );
            }

            function isFillIdent( token ) {
                return token && ( token.tokenType & IDENT ) && ( token.tokenValue === 'fill' );
            }

            function collectSlicesEtc() {
                slices = tokenizer.until( function( tok ) {
                    return !( tok.tokenType & ( NUMBER | PERCENT ) );
                } );

                if( isFillIdent( tokenizer.next() ) && !p.fill ) {
                    p.fill = true;
                } else {
                    tokenizer.prev();
                }

                if( isSlash( tokenizer.next() ) ) {
                    slashCount++;
                    widths = tokenizer.until( function( token ) {
                        return !token.isLengthOrPercent() && !( ( token.tokenType & IDENT ) && token.tokenValue === 'auto' );
                    } );

                    if( isSlash( tokenizer.next() ) ) {
                        slashCount++;
                        outsets = tokenizer.until( function( token ) {
                            return !token.isLength();
                        } );
                    }
                } else {
                    tokenizer.prev();
                }
            }

            while( token = tokenizer.next() ) {
                type = token.tokenType;
                value = token.tokenValue;

                // Numbers and/or 'fill' keyword: slice values. May be followed optionally by width values, followed optionally by outset values
                if( type & ( NUMBER | PERCENT ) && !slices ) {
                    tokenizer.prev();
                    collectSlicesEtc();
                }
                else if( isFillIdent( token ) && !p.fill ) {
                    p.fill = true;
                    collectSlicesEtc();
                }

                // Idents: one or values for 'repeat'
                else if( ( type & IDENT ) && this.repeatIdents[value] && !p.repeat ) {
                    p.repeat = { h: value };
                    if( token = tokenizer.next() ) {
                        if( ( token.tokenType & IDENT ) && this.repeatIdents[token.tokenValue] ) {
                            p.repeat.v = token.tokenValue;
                        } else {
                            tokenizer.prev();
                        }
                    }
                }

                // URL of the image
                else if( ( type & Type.URL ) && !p.src ) {
                    p.src =  value;
                }

                // Found something unrecognized; exit.
                else {
                    return null;
                }
            }

            // Validate what we collected
            if( !p.src || !slices || slices.length < 1 || slices.length > 4 ||
                ( widths && widths.length > 4 ) || ( slashCount === 1 && widths.length < 1 ) ||
                ( outsets && outsets.length > 4 ) || ( slashCount === 2 && outsets.length < 1 ) ) {
                return null;
            }

            // Fill in missing values
            if( !p.repeat ) {
                p.repeat = { h: 'stretch' };
            }
            if( !p.repeat.v ) {
                p.repeat.v = p.repeat.h;
            }

            function distributeSides( tokens, convertFn ) {
                return {
                    't': convertFn( tokens[0] ),
                    'r': convertFn( tokens[1] || tokens[0] ),
                    'b': convertFn( tokens[2] || tokens[0] ),
                    'l': convertFn( tokens[3] || tokens[1] || tokens[0] )
                };
            }

            p.slice = distributeSides( slices, function( tok ) {
                return PIE.getLength( ( tok.tokenType & NUMBER ) ? tok.tokenValue + 'px' : tok.tokenValue );
            } );

            if( widths && widths[0] ) {
                p.widths = distributeSides( widths, function( tok ) {
                    return tok.isLengthOrPercent() ? PIE.getLength( tok.tokenValue ) : tok.tokenValue;
                } );
            }

            if( outsets && outsets[0] ) {
                p.outset = distributeSides( outsets, function( tok ) {
                    return tok.isLength() ? PIE.getLength( tok.tokenValue ) : tok.tokenValue;
                } );
            }
        }

        return p;
    }

} );/**
 * Handles parsing, caching, and detecting changes to box-shadow CSS
 * @constructor
 * @param {Element} el the target element
 */
PIE.BoxShadowStyleInfo = PIE.StyleInfoBase.newStyleInfo( {

    cssProperty: 'box-shadow',
    styleProperty: 'boxShadow',

    parseCss: function( css ) {
        var props,
            getLength = PIE.getLength,
            Type = PIE.Tokenizer.Type,
            tokenizer;

        if( css ) {
            tokenizer = new PIE.Tokenizer( css );
            props = { outset: [], inset: [] };

            function parseItem() {
                var token, type, value, color, lengths, inset, len;

                while( token = tokenizer.next() ) {
                    value = token.tokenValue;
                    type = token.tokenType;

                    if( type & Type.OPERATOR && value === ',' ) {
                        break;
                    }
                    else if( token.isLength() && !lengths ) {
                        tokenizer.prev();
                        lengths = tokenizer.until( function( token ) {
                            return !token.isLength();
                        } );
                    }
                    else if( type & Type.COLOR && !color ) {
                        color = value;
                    }
                    else if( type & Type.IDENT && value === 'inset' && !inset ) {
                        inset = true;
                    }
                    else { //encountered an unrecognized token; fail.
                        return false;
                    }
                }

                len = lengths && lengths.length;
                if( len > 1 && len < 5 ) {
                    ( inset ? props.inset : props.outset ).push( {
                        xOffset: getLength( lengths[0].tokenValue ),
                        yOffset: getLength( lengths[1].tokenValue ),
                        blur: getLength( lengths[2] ? lengths[2].tokenValue : '0' ),
                        spread: getLength( lengths[3] ? lengths[3].tokenValue : '0' ),
                        color: PIE.getColor( color || 'currentColor' )
                    } );
                    return true;
                }
                return false;
            }

            while( parseItem() ) {}
        }

        return props && ( props.inset.length || props.outset.length ) ? props : null;
    }
} );
/**
 * Handles parsing, caching, and detecting changes to padding CSS
 * @constructor
 * @param {Element} el the target element
 */
PIE.PaddingStyleInfo = PIE.StyleInfoBase.newStyleInfo( {

    parseCss: function( css ) {
        var tokenizer = new PIE.Tokenizer( css ),
            arr = [],
            token;

        while( ( token = tokenizer.next() ) && token.isLengthOrPercent() ) {
            arr.push( PIE.getLength( token.tokenValue ) );
        }
        return arr.length > 0 && arr.length < 5 ? {
                't': arr[0],
                'r': arr[1] || arr[0],
                'b': arr[2] || arr[0],
                'l': arr[3] || arr[1] || arr[0]
            } : null;
    },

    getCss: PIE.StyleInfoBase.cacheWhenLocked( function() {
        var el = this.targetElement,
            rs = el.runtimeStyle,
            rsPadding = rs.padding,
            padding;
        if( rsPadding ) rs.padding = '';
        padding = el.currentStyle.padding;
        if( rsPadding ) rs.padding = rsPadding;
        return padding;
    } )

} );
/**
 * Retrieves the state of the element's visibility and display
 * @constructor
 * @param {Element} el the target element
 */
PIE.VisibilityStyleInfo = PIE.StyleInfoBase.newStyleInfo( {

    getCss: PIE.StyleInfoBase.cacheWhenLocked( function() {
        var el = this.targetElement,
            rs = el.runtimeStyle,
            cs = el.currentStyle,
            rsVis = rs.visibility,
            ret;
        rs.visibility = '';
        ret = cs.visibility + '|' + cs.display;
        rs.visibility = rsVis;
        return ret;
    } ),

    parseCss: function() {
        var info = this.getCss().split('|');
        return {
            visible: info[0] !== 'hidden',
            displayed: info[1] !== 'none'
        };
    },

    /**
     * Always return false for isActive, since this property alone will not trigger
     * a renderer to do anything.
     */
    isActive: function() {
        return false;
    }

} );
/**
 * Abstraction for a VML shape element. Allows assembling a VML shape's properties in
 * a non-DOM structure, which can then both generate itself as a single HTML string, and/or
 * update itself incrementally if its DOM element already exists.
 */
PIE.VmlShape = (function() {

    var nsPrefix = 'pievml',
        attrsPrefix = '_attrs_',
        objectSetters = {
            'colors': function( fill, name, value ) {
                if( fill[ name ] ) { //sometimes the colors object isn't initialized so we have to assign it directly (?)
                    fill[ name ].value = value;
                } else {
                    fill[ name ] = value;
                }
            },

            'size': function( fill, name, value ) {
                if ( !value ) {
                    delete fill[ name ];
                } else {
                    fill[ name ][ 'x' ] = 1; //Can be any value, just has to be set to "prime" it so the next line works. Weird!
                    fill[ name ] = value;
                }
            },

            'o:opacity2': function( fill, name, value ) {
                // The VML DOM does not allow dynamic setting of o:opacity2, so we must regenerate
                // the entire shape from markup instead.
                var me = this;
                if( value !== me.lastOpacity2 ) {
                    me.getShape().insertAdjacentHTML( 'afterEnd', me.getMarkup() );
                    me.destroy();
                    me.lastOpacity2 = value;
                }
            }
        };

    function createSetter( objName ) {
        return function() {
            var args = arguments,
                i, len = args.length,
                obj, name, setter;

            // Store the property locally
            obj = this[ attrsPrefix + objName ] || ( this[ attrsPrefix + objName ] = {} );
            for( i = 0; i < len; i += 2 ) {
                obj[ args[ i ] ] = args[ i + 1 ];
            }

            // If there is a rendered VML shape already, set the property directly via the VML DOM
            obj = this.getShape();
            if( obj ) {
                if( objName ) {
                    obj = obj[ objName ];
                }
                for( i = 0; i < len; i += 2 ) {
                    name = args[ i ];
                    setter = objectSetters[ name ]; //if there is a custom setter for this property, use it
                    if ( setter ) {
                        setter.call( this, obj, name, args[ i + 1 ]);
                    } else {
                        obj[ name ] = args[ i + 1 ];
                    }
                }
            }
        }
    }


    /**
     * The VML namespace has to be registered with the document, or the shapes will be invisible
     * on initial render sometimes. This results in the infamous "Unspecified error" if called
     * at certain times, so catch that and retry after a delay.
     */
    (function addVmlNamespace() {
        try {
            doc.namespaces.add(nsPrefix, 'urn:schemas-microsoft-com:vml', '#default#VML');
        }
        catch (e) {
            setTimeout(addVmlNamespace, 1);
        }
    })();



    function VmlShape( idSeed, ordinalGroup ) {
        this.elId = '_pie_' + ( idSeed || 'shape' ) + PIE.Util.getUID(this);
        this.ordinalGroup = ordinalGroup || 0;
    }
    VmlShape.prototype = {
        behaviorStyle: 'behavior:url(#default#VML);',
        defaultStyles: 'position:absolute;top:0px;left:0px;',
        defaultAttrs: 'coordorigin="1,1" stroked="false" ',
        tagName: 'shape',
        mightBeRendered: 0,

        getShape: function() {
            return this.mightBeRendered ?
                ( this._shape || ( this._shape = doc.getElementById( this.elId ) ) ) : null;
        },

        setAttrs: createSetter( '' ),
        setStyles: createSetter( 'style' ),
        setFillAttrs: createSetter( 'fill' ),

        setSize: function( w, h ) {
            this.setStyles(
                'width', w + 'px',
                'height', h + 'px'
            );
            this.setAttrs(
                'coordsize', w * 2 + ',' + h * 2
            );
        },

        getStyleCssText: function() {
            var styles = this[ attrsPrefix + 'style' ] || {},
                cssText = [], p;

            for( p in styles ) {
                if( styles.hasOwnProperty( p ) ) {
                    cssText.push( p + ':' + styles[p] );
                }
            }

            return this.behaviorStyle + this.defaultStyles + cssText.join( ';' );
        },

        getMarkup: function() {
            var m,
                me = this,
                tag = me.tagName,
                tagStart = '<' + nsPrefix + ':',
                subElEnd = ' style="' + me.behaviorStyle + '" />';

            me.mightBeRendered = 1;

            function pushAttrs( keyVals ) {
                if( keyVals ) {
                    for( var key in keyVals ) {
                        if( keyVals.hasOwnProperty( key ) ) {
                            m.push( ' ' + key + '="' + keyVals[key] + '"' );
                        }
                    }
                }
            }

            function pushElement( name ) {
                var attrs = me[ attrsPrefix + name ];
                if( attrs ) {
                    m.push( tagStart + name );
                    pushAttrs( attrs );
                    m.push( subElEnd );
                }
            }

            m = [ tagStart, tag, ' id="', me.elId, '" style="', me.getStyleCssText(), '" ', me.defaultAttrs ];
            pushAttrs( me[ attrsPrefix ] );
            m.push( '>' );

            pushElement( 'fill' );

            m.push( '</' + nsPrefix + ':' + tag + '>' );

            return m.join( '' );
        },

        destroy: function() {
            var shape = this.getShape(),
                par = shape && shape.parentNode;
            if( par ) {
                par.removeChild(shape);
                delete this._shape;
            }
        }
    };

    return VmlShape;
})();PIE.RendererBase = {

    /**
     * Create a new Renderer class, with the standard constructor, and augmented by
     * the RendererBase's members.
     * @param proto
     */
    newRenderer: function( proto ) {
        function Renderer( el, boundsInfo, styleInfos, parent ) {
            this.targetElement = el;
            this.boundsInfo = boundsInfo;
            this.styleInfos = styleInfos;
            this.parent = parent;
        }
        PIE.merge( Renderer.prototype, PIE.RendererBase, proto );
        return Renderer;
    },

    /**
     * Determine if the renderer needs to be updated
     * @return {boolean}
     */
    needsUpdate: function() {
        return false;
    },

    /**
     * Run any preparation logic that would affect the main update logic of this
     * renderer or any of the other renderers, e.g. things that might affect the
     * element's size or style properties.
     */
    prepareUpdate: PIE.emptyFn,

    /**
     * Tell the renderer to update based on modified properties or element dimensions
     */
    updateRendering: function() {
        if( this.isActive() ) {
            this.draw();
        } else {
            this.destroy();
        }
    },

    /**
     * Hide the target element's border
     */
    hideBorder: function() {
        this.targetElement.runtimeStyle.borderColor = 'transparent';
    },

    /**
     * Destroy the rendered objects. This is a base implementation which handles common renderer
     * structures, but individual renderers may override as necessary.
     */
    destroy: function() {
    }
};
PIE.merge(PIE.RendererBase, {

    /**
     * Get a VmlShape by name, creating it if necessary.
     * @param {string} name A name identifying the element
     * @param {number} zIndex Specifies the target z-index of the shape. This will be used when rendering
     *                 the shape to ensure it is inserted in the correct order with other shapes to give
     *                 correct stacking order without using actual CSS z-index.
     * @return {PIE.VmlShape}
     */
    getShape: function( name, zIndex ) {
        var shapes = this._shapes || ( this._shapes = {} ),
            shape = shapes[ name ];
        if( !shape ) {
            shape = shapes[ name ] = new PIE.VmlShape( name, zIndex );
            this.parent.enqueueShapeForRender( shape );
        }
        return shape;
    },

    /**
     * Delete a named shape which was created by getShape(). Returns true if a shape with the
     * given name was found and deleted, or false if there was no shape of that name.
     * @param {string} name
     * @return {boolean}
     */
    deleteShape: function( name ) {
        var shapes = this._shapes,
            shape = shapes && shapes[ name ];
        if( shape ) {
            shape.destroy();
            this.parent.removeShape( shape );
            delete shapes[ name ];
        }
        return !!shape;
    },


    /**
     * For a given set of border radius length/percentage values, convert them to concrete pixel
     * values based on the current size of the target element.
     * @param {Object} radii
     * @return {Object}
     */
    getRadiiPixels: function( radii ) {
        var el = this.targetElement,
            bounds = this.boundsInfo.getBounds(),
            w = bounds.w,
            h = bounds.h,
            tlX, tlY, trX, trY, brX, brY, blX, blY, f;

        tlX = radii.x['tl'].pixels( el, w );
        tlY = radii.y['tl'].pixels( el, h );
        trX = radii.x['tr'].pixels( el, w );
        trY = radii.y['tr'].pixels( el, h );
        brX = radii.x['br'].pixels( el, w );
        brY = radii.y['br'].pixels( el, h );
        blX = radii.x['bl'].pixels( el, w );
        blY = radii.y['bl'].pixels( el, h );

        // If any corner ellipses overlap, reduce them all by the appropriate factor. This formula
        // is taken straight from the CSS3 Backgrounds and Borders spec.
        f = Math.min(
            w / ( tlX + trX ),
            h / ( trY + brY ),
            w / ( blX + brX ),
            h / ( tlY + blY )
        );
        if( f < 1 ) {
            tlX *= f;
            tlY *= f;
            trX *= f;
            trY *= f;
            brX *= f;
            brY *= f;
            blX *= f;
            blY *= f;
        }

        return {
            x: {
                'tl': tlX,
                'tr': trX,
                'br': brX,
                'bl': blX
            },
            y: {
                'tl': tlY,
                'tr': trY,
                'br': brY,
                'bl': blY
            }
        }
    },

    /**
     * Return the VML path string for the element's background box, with corners rounded.
     * @param {number} shrinkT - number of pixels to shrink the box path inward from the element's top side.
     * @param {number} shrinkR - number of pixels to shrink the box path inward from the element's right side.
     * @param {number} shrinkB - number of pixels to shrink the box path inward from the element's bottom side.
     * @param {number} shrinkL - number of pixels to shrink the box path inward from the element's left side.
     * @param {number} mult All coordinates will be multiplied by this number
     * @param {Object=} radii If specified, this will be used for the corner radii instead of the properties
     *        from this renderer's borderRadiusInfo object.
     * @return {string} the VML path
     */
    getBoxPath: function( shrinkT, shrinkR, shrinkB, shrinkL, mult, radii ) {
        var coords = this.getBoxPathCoords( shrinkT, shrinkR, shrinkB, shrinkL, mult, radii );
        return 'm' + coords[ 0 ] + ',' + coords[ 1 ] +
               'qy' + coords[ 2 ] + ',' + coords[ 3 ] +
               'l' + coords[ 4 ] + ',' + coords[ 5 ] +
               'qx' + coords[ 6 ] + ',' + coords[ 7 ] +
               'l' + coords[ 8 ] + ',' + coords[ 9 ] +
               'qy' + coords[ 10 ] + ',' + coords[ 11 ] +
               'l' + coords[ 12 ] + ',' + coords[ 13 ] +
               'qx' + coords[ 14 ] + ',' + coords[ 15 ] +
               'x';
    },

    /**
     * Return the VML coordinates for all the vertices in the rounded box path.
     * @param {number} shrinkT - number of pixels to shrink the box path inward from the element's top side.
     * @param {number} shrinkR - number of pixels to shrink the box path inward from the element's right side.
     * @param {number} shrinkB - number of pixels to shrink the box path inward from the element's bottom side.
     * @param {number} shrinkL - number of pixels to shrink the box path inward from the element's left side.
     * @param {number=} mult If specified, all coordinates will be multiplied by this number
     * @param {Object=} radii If specified, this will be used for the corner radii instead of the properties
     *        from this renderer's borderRadiusInfo object.
     * @return {Array.<number>} all the coordinates going clockwise, starting with the top-left corner's lower vertex
     */
    getBoxPathCoords: function( shrinkT, shrinkR, shrinkB, shrinkL, mult, radii ) {
        var bounds = this.boundsInfo.getBounds(),
            w = bounds.w * mult,
            h = bounds.h * mult,
            M = Math,
            floor = M.floor, ceil = M.ceil,
            max = M.max, min = M.min,
            coords;

        shrinkT *= mult;
        shrinkR *= mult;
        shrinkB *= mult;
        shrinkL *= mult;

        if ( !radii ) {
            radii = this.styleInfos.borderRadiusInfo.getProps();
        }

        if ( radii ) {
            radii = this.getRadiiPixels( radii );

            var tlRadiusX = radii.x['tl'] * mult,
                tlRadiusY = radii.y['tl'] * mult,
                trRadiusX = radii.x['tr'] * mult,
                trRadiusY = radii.y['tr'] * mult,
                brRadiusX = radii.x['br'] * mult,
                brRadiusY = radii.y['br'] * mult,
                blRadiusX = radii.x['bl'] * mult,
                blRadiusY = radii.y['bl'] * mult;

            coords = [
                floor( shrinkL ),                                       // top-left lower x
                floor( min( max( tlRadiusY, shrinkT ), h - shrinkB ) ), // top-left lower y
                floor( min( max( tlRadiusX, shrinkL ), w - shrinkR ) ), // top-left upper x
                floor( shrinkT ),                                       // top-left upper y
                ceil( max( shrinkL, w - max( trRadiusX, shrinkR ) ) ),  // top-right upper x
                floor( shrinkT ),                                       // top-right upper y
                ceil( w - shrinkR ),                                    // top-right lower x
                floor( min( max( trRadiusY, shrinkT ), h - shrinkB ) ), // top-right lower y
                ceil( w - shrinkR ),                                    // bottom-right upper x
                ceil( max( shrinkT, h - max( brRadiusY, shrinkB ) ) ),  // bottom-right upper y
                ceil( max( shrinkL, w - max( brRadiusX, shrinkR ) ) ),  // bottom-right lower x
                ceil( h - shrinkB ),                                    // bottom-right lower y
                floor( min( max( blRadiusX, shrinkL ), w - shrinkR ) ), // bottom-left lower x
                ceil( h - shrinkB ),                                    // bottom-left lower y
                floor( shrinkL ),                                       // bottom-left upper x
                ceil( max( shrinkT, h - max( blRadiusY, shrinkB ) ) )   // bottom-left upper y
            ];
        } else {
            // Skip most of the heavy math for a simple non-rounded box
            var t = floor( shrinkT ),
                r = ceil( w - shrinkR ),
                b = ceil( h - shrinkB ),
                l = floor( shrinkL );

            coords = [ l, t, l, t, r, t, r, t, r, b, r, b, l, b, l, b ];
        }

        return coords;
    },


    /**
     * Hide the actual border of the element. In IE7 and up we can just set its color to transparent;
     * however IE6 does not support transparent borders so we have to get tricky with it. Also, some elements
     * like form buttons require removing the border width altogether, so for those we increase the padding
     * by the border size.
     */
    hideBorder: function() {
        var el = this.targetElement,
            cs = el.currentStyle,
            rs = el.runtimeStyle,
            tag = el.tagName,
            isIE6 = PIE.ieVersion === 6,
            sides, side, i;

        if( ( isIE6 && ( tag in PIE.childlessElements || tag === 'FIELDSET' ) ) ||
                tag === 'BUTTON' || ( tag === 'INPUT' && el.type in PIE.inputButtonTypes ) ) {
            rs.borderWidth = '';
            sides = this.styleInfos.borderInfo.sides;
            for( i = sides.length; i--; ) {
                side = sides[ i ];
                rs[ 'padding' + side ] = '';
                rs[ 'padding' + side ] = ( PIE.getLength( cs[ 'padding' + side ] ) ).pixels( el ) +
                                         ( PIE.getLength( cs[ 'border' + side + 'Width' ] ) ).pixels( el ) +
                                         ( PIE.ieVersion !== 8 && i % 2 ? 1 : 0 ); //needs an extra horizontal pixel to counteract the extra "inner border" going away
            }
            rs.borderWidth = 0;
        }
        else if( isIE6 ) {
            // Wrap all the element's children in a custom element, set the element to visiblity:hidden,
            // and set the wrapper element to visiblity:visible. This hides the outer element's decorations
            // (background and border) but displays all the contents.
            // TODO find a better way to do this that doesn't mess up the DOM parent-child relationship,
            // as this can interfere with other author scripts which add/modify/delete children. Also, this
            // won't work for elements which cannot take children, e.g. input/button/textarea/img/etc. Look into
            // using a compositor filter or some other filter which masks the border.
            if( el.childNodes.length !== 1 || el.firstChild.tagName !== 'ie6-mask' ) {
                var cont = doc.createElement( 'ie6-mask' ),
                    s = cont.style, child;
                s.visibility = 'visible';
                s.zoom = 1;
                while( child = el.firstChild ) {
                    cont.appendChild( child );
                }
                el.appendChild( cont );
                rs.visibility = 'hidden';
            }
        }
        else {
            rs.borderColor = 'transparent';
        }
    },

    unhideBorder: function() {

    },


    /**
     * Destroy the rendered objects. This is a base implementation which handles common renderer
     * structures, but individual renderers may override as necessary.
     */
    destroy: function() {
        var shapes = this._shapes, s;
        if ( shapes ) {
            for( s in shapes ) {
                if( shapes.hasOwnProperty( s ) ) {
                    this.deleteShape( s );
                }
            }
        }
    }
});
/**
 * Root renderer; creates the outermost container element and handles keeping it aligned
 * with the target element's size and position.
 * @param {Element} el The target element
 * @param {Object} styleInfos The StyleInfo objects
 */
PIE.RootRenderer = PIE.RendererBase.newRenderer( {

    isActive: function() {
        var children = this.childRenderers;
        for( var i in children ) {
            if( children.hasOwnProperty( i ) && children[ i ].isActive() ) {
                return true;
            }
        }
        return false;
    },

    getBoxCssText: function() {
        var el = this.getPositioningElement(),
            par = el,
            docEl,
            parRect,
            tgtCS = el.currentStyle,
            tgtPos = tgtCS.position,
            boxPos,
            cs,
            x = 0, y = 0,
            elBounds = this.boundsInfo.getBounds(),
            vis = this.styleInfos.visibilityInfo.getProps(),
            logicalZoomRatio = elBounds.logicalZoomRatio;

        if( tgtPos === 'fixed' && PIE.ieVersion > 6 ) {
            x = elBounds.x * logicalZoomRatio;
            y = elBounds.y * logicalZoomRatio;
            boxPos = tgtPos;
        } else {
            // Get the element's offsets from its nearest positioned ancestor. Uses
            // getBoundingClientRect for accuracy and speed.
            do {
                par = par.offsetParent;
            } while( par && ( par.currentStyle.position === 'static' ) );
            if( par ) {
                parRect = par.getBoundingClientRect();
                cs = par.currentStyle;
                x = ( elBounds.x - parRect.left ) * logicalZoomRatio - ( parseFloat(cs.borderLeftWidth) || 0 );
                y = ( elBounds.y - parRect.top ) * logicalZoomRatio - ( parseFloat(cs.borderTopWidth) || 0 );
            } else {
                docEl = doc.documentElement;
                x = ( elBounds.x + docEl.scrollLeft - docEl.clientLeft ) * logicalZoomRatio;
                y = ( elBounds.y + docEl.scrollTop - docEl.clientTop ) * logicalZoomRatio;
            }
            boxPos = 'absolute';
        }

        return 'direction:ltr;' +
               'position:absolute;' +
               'behavior:none !important;' +
               'position:' + boxPos + ';' +
               'left:' + x + 'px;' +
               'top:' + y + 'px;' +
               'z-index:' + ( tgtPos === 'static' ? -1 : tgtCS.zIndex ) + ';' +
               'display:' + ( vis.visible && vis.displayed ? 'block' : 'none' );
    },

    updateBoxStyles: function() {
        var me = this,
            boxEl = me.getBoxEl();
        if( boxEl && ( me.boundsInfo.positionChanged() || me.styleInfos.visibilityInfo.changed() ) ) {
            boxEl.style.cssText = me.getBoxCssText();
        }
    },

    getPositioningElement: function() {
        var el = this.targetElement;
        return el.tagName in PIE.tableCellTags ? el.offsetParent : el;
    },

    /**
     * Get a reference to the css3pie container element that contains the VML shapes,
     * if it has been inserted.
     */
    getBoxEl: function() {
        var box = this._box;
        if( !box ) {
            box = this._box = doc.getElementById( '_pie' + PIE.Util.getUID( this ) );
        }
        return box;
    },

    /**
     * Render any child rendrerer shapes which have not already been rendered into the DOM.
     */
    updateRendering: function() {
        var me = this,
            queue = me._shapeRenderQueue,
            renderedShapes, markup, i, len, j,
            ref, pos, vis;

        if (me.isActive()) {
            if( queue ) {
                // We've already rendered something once, so do incremental insertion of new shapes
                renderedShapes = me._renderedShapes;
                if( renderedShapes ) {
                    for( i = 0, len = queue.length; i < len; i++ ) {
                        for( j = renderedShapes.length; j--; ) {
                            if( renderedShapes[ j ].ordinalGroup < queue[ i ].ordinalGroup ) {
                                break;
                            }
                        }

                        if ( j < 0 ) {
                            ref = me.getBoxEl();
                            pos = 'afterBegin';
                        } else {
                            ref = renderedShapes[ j ].getShape();
                            pos = 'afterEnd';
                        }
                        ref.insertAdjacentHTML( pos, queue[ i ].getMarkup() );
                        renderedShapes.splice( j < 0 ? 0 : j, 0, queue[ i ] );
                    }
                    me._shapeRenderQueue = 0;
                    me.updateBoxStyles();
                }
                // This is the first render, so build up a single markup string and insert it all at once
                else {
                    vis = me.styleInfos.visibilityInfo.getProps();
                    if( vis.visible && vis.displayed ) {
                        queue.sort( me.shapeSorter );
                        markup = [ '<css3pie id="_pie' + PIE.Util.getUID( me ) + '" style="' + me.getBoxCssText() + '">' ];
                        for( i = 0, len = queue.length; i < len; i++ ) {
                            markup.push( queue[ i ].getMarkup() );
                        }
                        markup.push( '</css3pie>' );

                        me.getPositioningElement().insertAdjacentHTML( 'beforeBegin', markup.join( '' ) );

                        me._renderedShapes = queue;
                        me._shapeRenderQueue = 0;
                    }
                }
            } else {
                me.updateBoxStyles();
            }
        } else {
            me.destroy();
        }
    },

    shapeSorter: function( shape1, shape2 ) {
        return shape1.ordinalGroup - shape2.ordinalGroup;
    },

    /**
     * Add a VmlShape into the queue to get rendered in finishUpdate
     */
    enqueueShapeForRender: function( shape ) {
        var me = this,
            queue = me._shapeRenderQueue || ( me._shapeRenderQueue = [] );
        queue.push( shape );
    },

    /**
     * Remove a VmlShape from the DOM and also from the internal list of rendered shapes.
     */
    removeShape: function( shape ) {
        var shapes = this._renderedShapes, i;
        if ( shapes ) {
            for( i = shapes.length; i--; ) {
                if( shapes[ i ] === shape ) {
                    shapes.splice( i, 1 );
                    break;
                }
            }
        }
    },

    destroy: function() {
        var box = this._box, par;
        if( box && ( par = box.parentNode ) ) {
            par.removeChild( box );
        }
        delete this._box;
        delete this._renderedShapes;
    }

} );

// Prime IE for recognizing the custom <css3pie> element
doc.createElement( 'css3pie' );
/**
 * Renderer for element backgrounds.
 * @constructor
 * @param {Element} el The target element
 * @param {Object} styleInfos The StyleInfo objects
 * @param {PIE.RootRenderer} parent
 */
PIE.BackgroundRenderer = PIE.RendererBase.newRenderer( {

    shapeZIndex: 2,

    needsUpdate: function() {
        var si = this.styleInfos;
        return si.backgroundInfo.changed() || si.borderRadiusInfo.changed();
    },

    isActive: function() {
        var si = this.styleInfos;
        return si.borderImageInfo.isActive() ||
               si.borderRadiusInfo.isActive() ||
               si.backgroundInfo.isActive() ||
               ( si.boxShadowInfo.isActive() && si.boxShadowInfo.getProps().inset );
    },

    /**
     * Draw the shapes
     */
    draw: function() {
        var bounds = this.boundsInfo.getBounds();
        if( bounds.w && bounds.h ) {
            this.drawBgColor();
            this.drawBgImages();
        }
    },

    /**
     * Draw the background color shape
     */
    drawBgColor: function() {
        var props = this.styleInfos.backgroundInfo.getProps(),
            bounds = this.boundsInfo.getBounds(),
            el = this.targetElement,
            color = props && props.color,
            shape, alpha;

        if( color && color.alpha() > 0 ) {
            this.hideBackground();

            shape = this.getShape( 'bgColor', this.shapeZIndex );

            shape.setSize( bounds.w, bounds.h );
            shape.setAttrs(
                'path', this.getBgClipPath( bounds, props.colorClip )
            );
            shape.setFillAttrs( 'color', color.colorValue( el ) );
            alpha = color.alpha();
            if( alpha < 1 ) {
                shape.setFillAttrs( 'opacity', alpha );
            }
        } else {
            this.deleteShape( 'bgColor' );
        }
    },

    /**
     * Draw all the background image layers
     */
    drawBgImages: function() {
        var props = this.styleInfos.backgroundInfo.getProps(),
            bounds = this.boundsInfo.getBounds(),
            images = props && props.bgImages,
            img, shape, w, h, i;

        if( images ) {
            this.hideBackground();

            w = bounds.w;
            h = bounds.h;

            i = images.length;
            while( i-- ) {
                img = images[i];
                shape = this.getShape( 'bgImage' + i, this.shapeZIndex + ( .5 - i / 1000 ) );

                shape.setAttrs(
                    'path', this.getBgClipPath( bounds, img.bgClip )
                );
                shape.setSize( w, h );

                if( img.imgType === 'linear-gradient' ) {
                    this.addLinearGradient( shape, img );
                }
                else {
                    shape.setFillAttrs(
                        'type', 'tile',
                        'color', 'none'
                    );
                    this.positionBgImage( shape, img.imgUrl, i );
                }
            }
        }

        // Delete any bgImage shapes previously created which weren't used above
        i = images ? images.length : 0;
        while( this.deleteShape( 'bgImage' + i++ ) ) {}
    },


    /**
     * Set the position and clipping of the background image for a layer
     * @param {Element} shape
     * @param {String} src
     * @param {number} index
     */
    positionBgImage: function( shape, src, index ) {
        PIE.Util.withImageSize( src, function( imgSize ) {
            var me = this,
                el = me.targetElement,
                bounds = me.boundsInfo.getBounds(),
                elW = bounds.w,
                elH = bounds.h;

            // It's possible that the element dimensions are zero now but weren't when the original
            // update executed, make sure that's not the case to avoid divide-by-zero error
            if( elW && elH ) {
                var styleInfos = me.styleInfos,
                    bgInfo = styleInfos.backgroundInfo,
                    bg = bgInfo.getProps().bgImages[ index ],
                    bgAreaSize = bgInfo.getBgAreaSize( bg.bgOrigin, me.boundsInfo, styleInfos.borderInfo, styleInfos.paddingInfo ),
                    adjustedImgSize = ( bg.bgSize || PIE.BgSize.DEFAULT ).pixels(
                        me.targetElement, bgAreaSize.w, bgAreaSize.h, imgSize.w, imgSize.h
                    ),
                    bgOriginXY = me.getBgOriginXY( bg.bgOrigin ),
                    bgPos = bg.bgPosition ? bg.bgPosition.coords( el, bgAreaSize.w - adjustedImgSize.w, bgAreaSize.h - adjustedImgSize.h ) : { x:0, y:0 },
                    repeat = bg.imgRepeat,
                    pxX, pxY,
                    clipT = 0, clipL = 0,
                    clipR = elW + 1, clipB = elH + 1, //make sure the default clip region is not inside the box (by a subpixel)
                    clipAdjust = PIE.ieVersion === 8 ? 0 : 1; //prior to IE8 requires 1 extra pixel in the image clip region

                // Positioning - find the pixel offset from the top/left and convert to a ratio
                // The position is shifted by half a pixel, to adjust for the half-pixel coordorigin shift which is
                // needed to fix antialiasing but makes the bg image fuzzy.
                pxX = Math.round( bgOriginXY.x + bgPos.x ) + 0.5;
                pxY = Math.round( bgOriginXY.y + bgPos.y ) + 0.5;
                shape.setFillAttrs(
                    'src', src,
                    'position', ( pxX / elW ) + ',' + ( pxY / elH ),

                    // Set the size of the image. We only set it if the image is scaled via background-size or by
                    // the user changing the browser zoom level, to avoid fuzzy images at normal size. For some reason
                    // using px units doesn't work in VML markup so we must convert to pt.
                    'size', ( adjustedImgSize.w !== imgSize.w || adjustedImgSize.h !== imgSize.h ||
                        bounds.logicalZoomRatio !== 1 || screen['logicalXDPI'] / screen['deviceXDPI'] !== 1 ) ?
                        PIE.Length.pxToPt( adjustedImgSize.w ) + 'pt,' + PIE.Length.pxToPt( adjustedImgSize.h ) + 'pt' : ''
                );

                // Repeating - clip the image shape
                if( repeat && repeat !== 'repeat' ) {
                    if( repeat === 'repeat-x' || repeat === 'no-repeat' ) {
                        clipT = pxY + 1;
                        clipB = pxY + adjustedImgSize.h + clipAdjust;
                    }
                    if( repeat === 'repeat-y' || repeat === 'no-repeat' ) {
                        clipL = pxX + 1;
                        clipR = pxX + adjustedImgSize.w + clipAdjust;
                    }
                    shape.setStyles( 'clip', 'rect(' + clipT + 'px,' + clipR + 'px,' + clipB + 'px,' + clipL + 'px)' );
                }
            }
        }, this );
    },


    /**
     * For a given background-clip value, return the VML path for that clip area.
     * @param {Object} bounds
     * @param {String} bgClip
     */
    getBgClipPath: function( bounds, bgClip ) {
        var me = this,
            shrinkT = 0,
            shrinkR = 0,
            shrinkB = 0,
            shrinkL = 0,
            el = me.targetElement,
            styleInfos = me.styleInfos,
            borders, paddings;

        if ( bgClip && bgClip !== 'border-box' ) {
            borders = styleInfos.borderInfo.getProps();
            if ( borders && ( borders = borders.widths ) ) {
                shrinkT += borders[ 't' ].pixels( el );
                shrinkR += borders[ 'r' ].pixels( el );
                shrinkB += borders[ 'b' ].pixels( el );
                shrinkL += borders[ 'l' ].pixels( el );
            }
        }

        if ( bgClip === 'content-box' ) {
            paddings = styleInfos.paddingInfo.getProps();
            if( paddings ) {
                shrinkT += paddings[ 't' ].pixels( el );
                shrinkR += paddings[ 'r' ].pixels( el );
                shrinkB += paddings[ 'b' ].pixels( el );
                shrinkL += paddings[ 'l' ].pixels( el );
            }
        }

        // Add points at 0,0 and w,h so that the image size/position will still be
        // based on the full element area.
        return 'm0,0r0,0m' + bounds.w * 2 + ',' + bounds.h * 2 + 'r0,0' +
               me.getBoxPath( shrinkT, shrinkR, shrinkB, shrinkL, 2 );
    },


    /**
     * For a given background-origin value, return the x/y position of the origin
     * from the top-left of the element bounds.
     * @param {String} bgOrigin
     */
    getBgOriginXY: function( bgOrigin ) {
        var me = this,
            el = me.targetElement,
            styleInfos = me.styleInfos,
            x = 0,
            y = 0,
            borders, paddings;

        if( bgOrigin !== 'border-box' ) {
            borders = styleInfos.borderInfo.getProps();
            if( borders && ( borders = borders.widths ) ) {
                x += borders[ 'l' ].pixels( el );
                y += borders[ 't' ].pixels( el );
            }
        }

        if ( bgOrigin === 'content-box' ) {
            paddings = styleInfos.paddingInfo.getProps();
            if( paddings ) {
                x += paddings[ 'l' ].pixels( el );
                y += paddings[ 't' ].pixels( el );
            }
        }

        return { x: x, y: y };
    },


    /**
     * Draw the linear gradient for a gradient layer
     * @param {Element} shape
     * @param {Object} info The object holding the information about the gradient
     */
    addLinearGradient: function( shape, info ) {
        var el = this.targetElement,
            bounds = this.boundsInfo.getBounds(),
            w = bounds.w,
            h = bounds.h,
            stops = info.stops,
            stopCount = stops.length,
            PI = Math.PI,
            metrics = PIE.GradientUtil.getGradientMetrics( el, w, h, info ),
            angle = metrics.angle,
            lineLength = metrics.lineLength,
            vmlAngle, vmlColors,
            stopPx, i, j, before, after;

        // In VML land, the angle of the rendered gradient depends on the aspect ratio of the shape's
        // bounding box; for example specifying a 45 deg angle actually results in a gradient
        // drawn diagonally from one corner to its opposite corner, which will only appear to the
        // viewer as 45 degrees if the shape is equilateral. We adjust for this by taking the x/y deltas
        // between the start and end points, multiply one of them by the shape's aspect ratio,
        // and get their arctangent, resulting in an appropriate VML angle. If the angle is perfectly
        // horizontal or vertical then we don't need to do this conversion.
        // VML angles go in the opposite direction from CSS angles.
        vmlAngle = ( angle % 90 ) ?
            Math.atan2( metrics.startY - metrics.endY, ( metrics.endX - metrics.startX ) * w / h ) / PI * 180 - 90 :
            -angle;
        while( vmlAngle < 0 ) {
            vmlAngle += 360;
        }
        vmlAngle = vmlAngle % 360;

        // Add all the stops to the VML 'colors' list, including the first and last stops.
        // For each, we find its pixel offset along the gradient-line; if the offset of a stop is less
        // than that of its predecessor we increase it to be equal.
        vmlColors = [];

        // Find the pixel offsets along the CSS3 gradient-line for each stop.
        stopPx = [];
        for( i = 0; i < stopCount; i++ ) {
            stopPx.push( stops[i].offset ? stops[i].offset.pixels( el, lineLength ) :
                         i === 0 ? 0 : i === stopCount - 1 ? lineLength : null );
        }
        // Fill in gaps with evenly-spaced offsets
        for( i = 1; i < stopCount; i++ ) {
            if( stopPx[ i ] === null ) {
                before = stopPx[ i - 1 ];
                j = i;
                do {
                    after = stopPx[ ++j ];
                } while( after === null );
                stopPx[ i ] = before + ( after - before ) / ( j - i + 1 );
            }
            // Make sure each stop's offset is no less than the one before it
            stopPx[ i ] = Math.max( stopPx[ i ], stopPx[ i - 1 ] );
        }

        // Convert to percentage along the gradient line and add to the VML 'colors' value
        for( i = 0; i < stopCount; i++ ) {
            vmlColors.push(
                ( stopPx[ i ] / lineLength * 100 ) + '% ' + stops[i].color.colorValue( el )
            );
        }

        // Now, finally, we're ready to render the gradient fill. Set the start and end colors to
        // the first and last stop colors; this just sets outer bounds for the gradient.
        shape.setFillAttrs(
            'angle', vmlAngle,
            'type', 'gradient',
            'method', 'sigma',
            'color', stops[0].color.colorValue( el ),
            'color2', stops[stopCount - 1].color.colorValue( el ),
            'colors', vmlColors.join( ',' )
        );

        // Set opacity; right now we only support this for two-stop gradients, multi-stop
        // opacity will require chopping up each segment into its own shape.
        // Note these seem backwards but they must be that way since VML strangely reverses
        // them when the 'colors' property is present.
        if ( stopCount === 2 ) {
            shape.setFillAttrs(
                'opacity', stops[1].color.alpha(),
                'o:opacity2', stops[0].color.alpha()
            );
        }
    },


    /**
     * Hide the actual background image and color of the element.
     */
    hideBackground: function() {
        var rs = this.targetElement.runtimeStyle;
        rs.backgroundImage = 'url(about:blank)'; //ensures the background area reacts to mouse events
        rs.backgroundColor = 'transparent';
    },

    destroy: function() {
        PIE.RendererBase.destroy.call( this );
        var rs = this.targetElement.runtimeStyle;
        rs.backgroundImage = rs.backgroundColor = '';
    }

} );
/**
 * Renderer for element borders.
 * @constructor
 * @param {Element} el The target element
 * @param {Object} styleInfos The StyleInfo objects
 * @param {PIE.RootRenderer} parent
 */
PIE.BorderRenderer = PIE.RendererBase.newRenderer( {

    shapeZIndex: 4,

    /**
     * Single definition of arguments for use by the per-side creation loop in
     * getBorderSegmentsInfo. Arguments are, in order:
     * centerX1, centerY1, outerX1, outerY1, centerX2, centerY2, outerX2, outerY2, baseAngle
     */
    sideArgs: {
        't': [ 2, 1, 0, 3, 4, 7, 6, 5, 90 ],
        'r': [ 4, 7, 6, 5, 10, 9, 8, 11, 0 ],
        'b': [ 10, 9, 8, 11, 12, 15, 14, 13, 270 ],
        'l': [ 12, 15, 14, 13, 2, 1, 0, 3, 180 ]
    },

    dashedStyles: {
        'dotted': 1,
        'dashed': 1
    },
    colorManipStyles: {
        'groove': 1,
        'ridge': 1,
        'inset': 1,
        'outset': 1
    },
    doubleStyles: {
        'groove': 1,
        'ridge': 1,
        'double': 1
    },


    needsUpdate: function() {
        var si = this.styleInfos;
        return si.borderInfo.changed() || si.borderRadiusInfo.changed();
    },

    isActive: function() {
        var si = this.styleInfos;
        return si.borderRadiusInfo.isActive() &&
               !si.borderImageInfo.isActive() &&
               si.borderInfo.isActive(); //check BorderStyleInfo last because it's the most expensive
    },

    /**
     * Draw the border shape(s)
     */
    draw: function() {
        var me = this,
            props = me.styleInfos.borderInfo.getProps(),
            bounds = me.boundsInfo.getBounds(),
            shape, segmentsInfo, i, j, len;

        if( props ) {
            me.hideBorder();

            segmentsInfo = me.getBorderSegmentsInfo();
            for( i = j = 0, len = segmentsInfo.length; i < len; i += 2) {
                shape = me.getShape( 'border' + j++, me.shapeZIndex );
                shape.setSize( bounds.w, bounds.h );
                shape.setAttrs(
                    'path', segmentsInfo[ i ]
                );
                shape.setFillAttrs(
                    'color', segmentsInfo[ i + 1 ]
                );
            }

            // remove any previously-created border shapes which didn't get used above
            while( me.deleteShape( 'border' + j++ ) ) {}
        }
    },


    /**
     * Adds rectangular sub-paths at intervals along a given side which serve to "cut out"
     * those areas, forming the spaces in a dashed or dotted border.
     * @param {Array.<string>} path The path string array to which the extra sub-paths will be added
     * @param {number} startCoord The x or y coordinate at which the dashing starts
     * @param {number} endCoord The x or y coordinate at which the dashing ends
     * @param {number} sideWidth The width of the border on the target side
     * @param {number} shift A shift of the perpendicular coordinate
     * @param {boolean} isVertical True if this is a vertical border (left or right)
     * @param {string} style The border style, either 'dotted' or 'dashed'
     */
    dashify: function( path, startCoord, endCoord, sideWidth, shift, isVertical, style ) {
        var dashLength = sideWidth * ( style === 'dashed' ? 3 : 1 ),
            shift2 = shift + sideWidth,
            dashEndCoord;

        // If dash is longer than the box edge, don't make any cutouts
        if( dashLength < endCoord - startCoord ) {
            // adjust the start to keep the dash pattern centered on the box edge, favoring full
            // spaces over full dashes, like WebKit does.
            startCoord += ( endCoord - startCoord - dashLength ) / 2 % dashLength;

            // add rectangular sub-paths to cut out each dash's space
            while( startCoord < endCoord ) {
                dashEndCoord = Math.min( startCoord + dashLength, endCoord );
                path.push(
                    isVertical ? (
                        'm' + shift + ',' + startCoord +
                        'l' + shift + ',' + dashEndCoord +
                        'l' + shift2 + ',' + dashEndCoord +
                        'l' + shift2 + ',' + startCoord + 'x'
                    ) : (
                        'm' + startCoord + ',' + shift +
                        'l' + dashEndCoord + ',' + shift +
                        'l' + dashEndCoord + ',' + shift2 +
                        'l' + startCoord + ',' + shift2 + 'x'
                    )
                );
                startCoord += dashLength * 2;
            }
        }
    },


    /**
     * Get the VML path definitions for the border segment(s).
     * @return {Array.<string>} Pairs of segment info: 1st item in each pair is the path string, 2nd is the fill color
     */
    getBorderSegmentsInfo: function() {
        var me = this,
            borderInfo = me.styleInfos.borderInfo,
            segmentsInfo = [];

        if( borderInfo.isActive() ) {
            var mult = 2,
                el = me.targetElement,
                bounds = me.boundsInfo.getBounds(),
                borderProps = borderInfo.getProps(),
                widths = borderProps.widths,
                styles = borderProps.styles,
                colors = borderProps.colors,
                M = Math,
                abs = M.abs,
                round = M.round,
                wT = round( widths['t'].pixels( el ) ),
                wR = round( widths['r'].pixels( el ) ),
                wB = round( widths['b'].pixels( el ) ),
                wL = round( widths['l'].pixels( el ) ),
                path = [],
                innerCoords, outerCoords, doubleOuterCoords, doubleInnerCoords,
                sideArgs = me.sideArgs,
                side,
                deg = 65535,
                dashedStyles = me.dashedStyles,
                style, color;

            // When the border has uniform color and style all the way around, we can get
            // away with a single VML path shape, otherwise we need four separate shapes.
            if ( borderProps.stylesSame && borderProps.colorsSame && !( styles[ 't' ] in me.colorManipStyles ) ) {
                if( colors['t'].alpha() > 0 ) {
                    // Outer path
                    path[ 0 ] = me.getBoxPath( 0, 0, 0, 0, mult );

                    // If double style, add the middle cutout sub-paths
                    style = styles[ 't' ];
                    if( style === 'double' ) {
                        path.push(
                            me.getBoxPath( wT / 3, wR / 3, wB / 3, wL / 3, mult ) +
                            me.getBoxPath( wT * 2 / 3, wR * 2 / 3, wB * 2 / 3, wL * 2 / 3, mult )
                        );
                    }
                    // If dashed, add the dash cutout sub-paths
                    else if( style in dashedStyles ) {
                        innerCoords = me.getBoxPathCoords( wT, wR, wB, wL, mult );
                        me.dashify( path, innerCoords[ 2 ], innerCoords[ 4 ], wT * mult, 0, 0, styles[ 't' ] );
                        me.dashify( path, innerCoords[ 7 ], innerCoords[ 9 ], wR * mult, ( bounds.w - wR ) * mult, 1, styles[ 'r' ] );
                        me.dashify( path, innerCoords[ 12 ], innerCoords[ 10 ], wB * mult, ( bounds.h - wB ) * mult, 0, styles[ 'b' ] );
                        me.dashify( path, innerCoords[ 1 ], innerCoords[ 15 ], wL * mult, 0, 1, styles[ 'l' ] );
                    }

                    // Inner path
                    path.push( me.getBoxPath( wT, wR, wB, wL, mult ) );

                    segmentsInfo.push( path.join( '' ), colors['t'].colorValue( el ) );
                }
            }
            else {
                outerCoords = me.getBoxPathCoords( 0, 0, 0, 0, mult );
                innerCoords = me.getBoxPathCoords( wT, wR, wB, wL, mult );

                // Build the segment for each side
                for( side in sideArgs ) {
                    if ( sideArgs.hasOwnProperty( side ) && colors[ side ].alpha() > 0 ) {
                        var args = sideArgs[ side ],
                            centerX1 = args[ 0 ],
                            centerY1 = args[ 1 ],
                            outerX1 = args[ 2 ],
                            outerY1 = args[ 3 ],
                            centerX2 = args[ 4 ],
                            centerY2 = args[ 5 ],
                            outerX2 = args[ 6 ],
                            outerY2 = args[ 7 ],
                            baseAngle = args[ 8 ],
                            isTopLeft = side === 't' || side === 'l';

                        style = styles[ side ];

                        // Outer edge
                        path[ 0 ] = 'al' + outerCoords[ centerX1 ] + ',' + outerCoords[ centerY1 ] + ',' +
                                abs( outerCoords[ outerX1 ] - outerCoords[ centerX1 ] ) + ',' +
                                abs( outerCoords[ outerY1 ] - outerCoords[ centerY1 ] ) + ',' +
                                ( baseAngle + 45 ) * deg + ',' + -45 * deg +
                            'ae' + outerCoords[ centerX2 ] + ',' + outerCoords[ centerY2 ] + ',' +
                                abs( outerCoords[ outerX2 ] - outerCoords[ centerX2 ] ) + ',' +
                                abs( outerCoords[ outerY2 ] - outerCoords[ centerY2 ] ) + ',' +
                                baseAngle * deg + ',' + -45 * deg;

                        // If double style, add the middle sub-paths
                        if( style in me.doubleStyles ) {
                            if( !doubleOuterCoords ) {
                                if ( style === 'double' ) {
                                    doubleOuterCoords = me.getBoxPathCoords( wT / 3, wR / 3, wB / 3, wL / 3, mult );
                                    doubleInnerCoords = me.getBoxPathCoords( wT * 2 / 3, wR * 2 / 3, wB * 2 / 3, wL * 2 / 3, mult );
                                } else {
                                    doubleOuterCoords = doubleInnerCoords = me.getBoxPathCoords( wT / 2, wR / 2, wB / 2, wL / 2, mult );
                                }
                            }
                            path.push(
                                'ae' + doubleOuterCoords[ centerX2 ] + ',' + doubleOuterCoords[ centerY2 ] + ',' +
                                    abs( doubleOuterCoords[ outerX2 ] - doubleOuterCoords[ centerX2 ] ) + ',' +
                                    abs( doubleOuterCoords[ outerY2 ] - doubleOuterCoords[ centerY2 ] ) + ',' +
                                    ( baseAngle - 45 ) * deg + ',' + 45 * deg +
                                'ae' + doubleOuterCoords[ centerX1 ] + ',' + doubleOuterCoords[ centerY1 ] + ',' +
                                    abs( doubleOuterCoords[ outerX1 ] - doubleOuterCoords[ centerX1 ] ) + ',' +
                                    abs( doubleOuterCoords[ outerY1 ] - doubleOuterCoords[ centerY1 ] ) + ',' +
                                    baseAngle * deg + ',' + 45 * deg +
                                'x'
                            );

                            // Actual 'double' style with have both paths as a single shape, but 'ridge' and
                            // 'groove' need separate shapes for the different colors
                            if( style !== 'double' ) {
                                color = colors[ side ].colorValue( el ) + (
                                    ( style === 'groove' ? isTopLeft : !isTopLeft ) ? ' darken(128)' : ' lighten(128)'
                                );
                                segmentsInfo.push( path.join( '' ), color );
                                path.length = 0; //reuse same array for next loop
                            }

                            path.push(
                                'al' + doubleInnerCoords[ centerX1 ] + ',' + doubleInnerCoords[ centerY1 ] + ',' +
                                    abs( doubleInnerCoords[ outerX1 ] - doubleInnerCoords[ centerX1 ] ) + ',' +
                                    abs( doubleInnerCoords[ outerY1 ] - doubleInnerCoords[ centerY1 ] ) + ',' +
                                    ( baseAngle + 45 ) * deg + ',' + -45 * deg +
                                'ae' + doubleInnerCoords[ centerX2 ] + ',' + doubleInnerCoords[ centerY2 ] + ',' +
                                    abs( doubleInnerCoords[ outerX2 ] - doubleInnerCoords[ centerX2 ] ) + ',' +
                                    abs( doubleInnerCoords[ outerY2 ] - doubleInnerCoords[ centerY2 ] ) + ',' +
                                    baseAngle * deg + ',' + -45 * deg
                            );
                        }

                        // Inner edge
                        path.push(
                            'ae' + innerCoords[ centerX2 ] + ',' + innerCoords[ centerY2 ] + ',' +
                                abs( innerCoords[ outerX2 ] - innerCoords[ centerX2 ] ) + ',' +
                                abs( innerCoords[ outerY2 ] - innerCoords[ centerY2 ] ) + ',' +
                                ( baseAngle - 45 ) * deg + ',' + 45 * deg +
                            'ae' + innerCoords[ centerX1 ] + ',' + innerCoords[ centerY1 ] + ',' +
                                abs( innerCoords[ outerX1 ] - innerCoords[ centerX1 ] ) + ',' +
                                abs( innerCoords[ outerY1 ] - innerCoords[ centerY1 ] ) + ',' +
                                baseAngle * deg + ',' + 45 * deg +
                            'x'
                        );

                        // For dashed/dotted styles, add the dash cutout sub-paths
                        if ( style in dashedStyles ) {
                            side === 't' ?
                                me.dashify( path, innerCoords[ 2 ], innerCoords[ 4 ], wT * mult, 0, 0, style ) :
                            side === 'r' ?
                                me.dashify( path, innerCoords[ 7 ], innerCoords[ 9 ], wR * mult, ( bounds.w - wR ) * mult, 1, style ) :
                            side === 'b' ?
                                me.dashify( path, innerCoords[ 12 ], innerCoords[ 10 ], wB * mult, ( bounds.h - wB ) * mult, 0, style ) :
                            //side === 'l' ?
                                me.dashify( path, innerCoords[ 1 ], innerCoords[ 15 ], wL * mult, 0, 1, style );
                        }

                        color = colors[ side ].colorValue( el );
                        if ( style in me.colorManipStyles ) {
                            // lighten or darken as appropriate
                            color += (
                                ( ( style === 'groove' || style === 'outset' ) ? isTopLeft : !isTopLeft ) ?
                                ' lighten(128)' : ' darken(128)'
                            );
                        }
                        segmentsInfo.push( path.join( '' ), color );
                        path.length = 0; //reuse same array for next loop
                    }
                }
            }
        }

        return segmentsInfo;
    },

    destroy: function() {
        var me = this;
        if (me.finalized || !me.styleInfos.borderImageInfo.isActive()) {
            me.targetElement.runtimeStyle.borderColor = '';
        }
        PIE.RendererBase.destroy.call( me );
    }


} );
/**
 * Renderer for border-image
 * @constructor
 * @param {Element} el The target element
 * @param {Object} styleInfos The StyleInfo objects
 * @param {PIE.RootRenderer} parent
 */
PIE.BorderImageRenderer = PIE.RendererBase.newRenderer( {

    shapeZIndex: 5,

    needsUpdate: function() {
        return this.styleInfos.borderImageInfo.changed();
    },

    isActive: function() {
        return this.styleInfos.borderImageInfo.isActive();
    },

    draw: function() {
        var me = this,
            props = me.styleInfos.borderImageInfo.getProps(),
            borderProps = me.styleInfos.borderInfo.getProps(),
            bounds = me.boundsInfo.getBounds(),
            el = me.targetElement;

        PIE.Util.withImageSize( props.src, function( imgSize ) {
            var me = this,
                elW = bounds.w,
                elH = bounds.h,
                zero = PIE.getLength( '0' ),
                widths = props.widths || ( borderProps ? borderProps.widths : { 't': zero, 'r': zero, 'b': zero, 'l': zero } ),
                widthT = widths['t'].pixels( el ),
                widthR = widths['r'].pixels( el ),
                widthB = widths['b'].pixels( el ),
                widthL = widths['l'].pixels( el ),
                slices = props.slice,
                sliceT = slices['t'].pixels( el ),
                sliceR = slices['r'].pixels( el ),
                sliceB = slices['b'].pixels( el ),
                sliceL = slices['l'].pixels( el ),
                src = props.src,
                imgW = imgSize.w,
                imgH = imgSize.h;

            function setSizeAndPos( rect, rectX, rectY, rectW, rectH, sliceX, sliceY, sliceW, sliceH ) {
                // Hide the piece entirely if we have zero dimensions for the image, the rect, or the slice
                var max = Math.max;
                if ( !imgW || !imgH || !rectW || !rectH || !sliceW || !sliceH ) {
                    rect.setStyles( 'display', 'none' );
                } else {
                    rectW = max( rectW, 0 );
                    rectH = max( rectH, 0 );
                    rect.setAttrs(
                        'path', 'm0,0l' + rectW * 2 + ',0l' + rectW * 2 + ',' + rectH * 2 + 'l0,' + rectH * 2 + 'x'
                    );
                    rect.setFillAttrs(
                        'src', src,
                        'type', 'tile',
                        'position', '0,0',
                        'origin', ( ( sliceX - 0.5 ) / imgW ) + ',' + ( ( sliceY - 0.5 ) / imgH ),
                        // For some reason using px units doesn't work in VML markup so we must convert to pt.
                        'size', PIE.Length.pxToPt( rectW * imgW / sliceW ) + 'pt,' + PIE.Length.pxToPt( rectH * imgH / sliceH ) + 'pt'
                    );
                    rect.setSize( rectW, rectH );
                    rect.setStyles(
                        'left', rectX + 'px',
                        'top', rectY + 'px',
                        'display', ''
                    );
                }
            }

            // Piece positions and sizes
            // TODO right now this treats everything like 'stretch', need to support other schemes
            setSizeAndPos( me.getRect( 'tl' ), 0, 0, widthL, widthT, 0, 0, sliceL, sliceT );
            setSizeAndPos( me.getRect( 't' ), widthL, 0, elW - widthL - widthR, widthT, sliceL, 0, imgW - sliceL - sliceR, sliceT );
            setSizeAndPos( me.getRect( 'tr' ), elW - widthR, 0, widthR, widthT, imgW - sliceR, 0, sliceR, sliceT );
            setSizeAndPos( me.getRect( 'r' ), elW - widthR, widthT, widthR, elH - widthT - widthB, imgW - sliceR, sliceT, sliceR, imgH - sliceT - sliceB );
            setSizeAndPos( me.getRect( 'br' ), elW - widthR, elH - widthB, widthR, widthB, imgW - sliceR, imgH - sliceB, sliceR, sliceB );
            setSizeAndPos( me.getRect( 'b' ), widthL, elH - widthB, elW - widthL - widthR, widthB, sliceL, imgH - sliceB, imgW - sliceL - sliceR, sliceB );
            setSizeAndPos( me.getRect( 'bl' ), 0, elH - widthB, widthL, widthB, 0, imgH - sliceB, sliceL, sliceB );
            setSizeAndPos( me.getRect( 'l' ), 0, widthT, widthL, elH - widthT - widthB, 0, sliceT, sliceL, imgH - sliceT - sliceB );
            setSizeAndPos( me.getRect( 'c' ), widthL, widthT, elW - widthL - widthR, elH - widthT - widthB, sliceL, sliceT, props.fill ? imgW - sliceL - sliceR : 0, imgH - sliceT - sliceB );
        }, me );
    },

    getRect: function( name ) {
        return this.getShape( 'borderImage_' + name, this.shapeZIndex );
    },

    prepareUpdate: function() {
        if (this.isActive()) {
            var me = this,
                el = me.targetElement,
                rs = el.runtimeStyle,
                widths = me.styleInfos.borderImageInfo.getProps().widths;

            // Force border-style to solid so it doesn't collapse
            rs.borderStyle = 'solid';

            // If widths specified in border-image shorthand, override border-width
            if ( widths ) {
                rs.borderTopWidth = widths['t'].pixels( el );
                rs.borderRightWidth = widths['r'].pixels( el );
                rs.borderBottomWidth = widths['b'].pixels( el );
                rs.borderLeftWidth = widths['l'].pixels( el );
            }

            // Make the border transparent
            me.hideBorder();
        }
    },

    destroy: function() {
        var me = this,
            rs = me.targetElement.runtimeStyle;
        rs.borderStyle = '';
        if (me.finalized || !me.styleInfos.borderInfo.isActive()) {
            rs.borderColor = rs.borderWidth = '';
        }
        PIE.RendererBase.destroy.call( me );
    }

} );
/**
 * Renderer for outset box-shadows
 * @constructor
 * @param {Element} el The target element
 * @param {Object} styleInfos The StyleInfo objects
 * @param {PIE.RootRenderer} parent
 */
PIE.BoxShadowOutsetRenderer = PIE.RendererBase.newRenderer( {

    shapeZIndex: 1,

    needsUpdate: function() {
        var si = this.styleInfos;
        return si.boxShadowInfo.changed() || si.borderRadiusInfo.changed();
    },

    isActive: function() {
        var boxShadowInfo = this.styleInfos.boxShadowInfo;
        return boxShadowInfo.isActive() && boxShadowInfo.getProps().outset[0];
    },

    draw: function() {
        var me = this,
            el = me.targetElement,
            styleInfos = me.styleInfos,
            shadowInfos = styleInfos.boxShadowInfo.getProps().outset,
            radii = styleInfos.borderRadiusInfo.getProps(),
            len = shadowInfos.length,
            i = len,
            bounds = me.boundsInfo.getBounds(),
            w = bounds.w,
            h = bounds.h,
            shadowInfo, shape, xOff, yOff, spread, blur, shrink, color, alpha, path,
            totalW, totalH, focusX, focusY, focusAdjustRatio;

        while( i-- ) {
            shadowInfo = shadowInfos[ i ];
            xOff = shadowInfo.xOffset.pixels( el );
            yOff = shadowInfo.yOffset.pixels( el );
            spread = shadowInfo.spread.pixels( el );
            blur = shadowInfo.blur.pixels( el );
            color = shadowInfo.color;
            alpha = color.alpha();
            color = color.colorValue( el );

            // Shape path
            shrink = -spread - blur;
            if( !radii && blur ) {
                // If blurring, use a non-null border radius info object so that getBoxPath will
                // round the corners of the expanded shadow shape rather than squaring them off.
                radii = PIE.BorderRadiusStyleInfo.ALL_ZERO;
            }
            path = me.getBoxPath( shrink, shrink, shrink, shrink, 2, radii );

            // Create the shape object
            shape = me.getShape( 'shadow' + i, me.shapeZIndex + ( .5 - i / 1000 ) );

            if( blur ) {
                totalW = ( spread + blur ) * 2 + w;
                totalH = ( spread + blur ) * 2 + h;
                focusX = totalW ? blur * 2 / totalW : 0;
                focusY = totalH ? blur * 2 / totalH : 0;

                // If the blur is larger than half the element's narrowest dimension, then its focussize
                // will to be less than zero which results in ugly artifacts. To get around this, we adjust
                // the focus to keep it centered and then bump the center opacity down to match.
                if (focusX > 0.5 || focusY > 0.5) {
                    focusAdjustRatio = 0.5 / Math.max(focusX, focusY);
                    focusX *= focusAdjustRatio;
                    focusY *= focusAdjustRatio;
                    alpha *= focusAdjustRatio * focusAdjustRatio; //this is a rough eyeball-adjustment, could be refined
                }

                shape.setFillAttrs(
                    'type', 'gradienttitle', //makes the VML gradient follow the shape's outline - hooray for undocumented features?!?!
                    'color2', color,
                    'focusposition', focusX + ',' + focusY,
                    'focussize', ( 1 - focusX * 2 ) + ',' + ( 1 - focusY * 2 ),
                    'opacity', 0,
                    'o:opacity2', alpha
                );
            } else {
                shape.setFillAttrs(
                    'type', 'solid',
                    'opacity', alpha
                );
            }

            shape.setAttrs(
                'path', path
            );
            shape.setFillAttrs( 'color', color );
            shape.setStyles(
                'left', xOff + 'px',
                'top', yOff + 'px'
            );
            shape.setSize( w, h );
        }

        // Delete any shadow shapes previously created which weren't reused above
        while( me.deleteShape( 'shadow' + len++ ) ) {}
    }

} );
/**
 * Renderer for re-rendering img elements using VML. Kicks in if the img has
 * a border-radius applied, or if the -pie-png-fix flag is set.
 * @constructor
 * @param {Element} el The target element
 * @param {Object} styleInfos The StyleInfo objects
 * @param {PIE.RootRenderer} parent
 */
PIE.ImgRenderer = PIE.RendererBase.newRenderer( {

    shapeZIndex: 6,

    needsUpdate: function() {
        var si = this.styleInfos;
        return this.targetElement.src !== this._lastSrc || si.borderRadiusInfo.changed();
    },

    isActive: function() {
        var si = this.styleInfos;
        return si.borderRadiusInfo.isActive() || si.backgroundInfo.isPngFix();
    },

    draw: function() {
        this._lastSrc = src;
        this.hideActualImg();

        var shape = this.getShape( 'img', this.shapeZIndex ),
            bounds = this.boundsInfo.getBounds(),
            w = bounds.w,
            h = bounds.h,
            borderProps = this.styleInfos.borderInfo.getProps(),
            borderWidths = borderProps && borderProps.widths,
            el = this.targetElement,
            src = el.src,
            round = Math.round,
            paddings = this.styleInfos.paddingInfo.getProps(),
            zero;

        // In IE6, the BorderRenderer will have hidden the border by moving the border-width to
        // the padding; therefore we want to pretend the borders have no width so they aren't doubled
        // when adding in the current padding value below.
        if( !borderWidths || PIE.ieVersion < 7 ) {
            zero = PIE.getLength( '0' );
            borderWidths = { 't': zero, 'r': zero, 'b': zero, 'l': zero };
        }

        shape.setAttrs(
            'path', this.getBoxPath(
                round( borderWidths['t'].pixels( el ) + paddings[ 't' ].pixels( el ) ),
                round( borderWidths['r'].pixels( el ) + paddings[ 'r' ].pixels( el ) ),
                round( borderWidths['b'].pixels( el ) + paddings[ 'b' ].pixels( el ) ),
                round( borderWidths['l'].pixels( el ) + paddings[ 'l' ].pixels( el ) ),
                2
            )
        );
        shape.setFillAttrs(
            'type', 'frame',
            'src', src,
            'position', (w ? 0.5 / w : 0) + ',' + (h ? 0.5 / h : 0)
        );
        shape.setSize( w, h );
    },

    hideActualImg: function() {
        this.targetElement.runtimeStyle.filter = 'alpha(opacity=0)';
    },

    destroy: function() {
        PIE.RendererBase.destroy.call( this );
        this.targetElement.runtimeStyle.filter = '';
    }

} );

PIE.Element = (function() {

    var wrappers = {},
        lazyInitCssProp = PIE.CSS_PREFIX + 'lazy-init',
        pollCssProp = PIE.CSS_PREFIX + 'poll',
        trackActiveCssProp = PIE.CSS_PREFIX + 'track-active',
        trackHoverCssProp = PIE.CSS_PREFIX + 'track-hover',
        hoverClass = PIE.CLASS_PREFIX + 'hover',
        activeClass = PIE.CLASS_PREFIX + 'active',
        focusClass = PIE.CLASS_PREFIX + 'focus',
        firstChildClass = PIE.CLASS_PREFIX + 'first-child',
        ignorePropertyNames = { 'background':1, 'bgColor':1, 'display': 1 },
        classNameRegExes = {},
        dummyArray = [];


    function addClass( el, className ) {
        el.className += ' ' + className;
    }

    function removeClass( el, className ) {
        var re = classNameRegExes[ className ] ||
            ( classNameRegExes[ className ] = new RegExp( '\\b' + className + '\\b', 'g' ) );
        el.className = el.className.replace( re, '' );
    }

    function delayAddClass( el, className /*, className2*/ ) {
        var classes = dummyArray.slice.call( arguments, 1 ),
            i = classes.length;
        setTimeout( function() {
            if( el ) {
                while( i-- ) {
                    addClass( el, classes[ i ] );
                }
            }
        }, 0 );
    }

    function delayRemoveClass( el, className /*, className2*/ ) {
        var classes = dummyArray.slice.call( arguments, 1 ),
            i = classes.length;
        setTimeout( function() {
            if( el ) {
                while( i-- ) {
                    removeClass( el, classes[ i ] );
                }
            }
        }, 0 );
    }



    function Element( el ) {
        var me = this,
            childRenderers,
            rootRenderer,
            boundsInfo = new PIE.BoundsInfo( el ),
            styleInfos,
            styleInfosArr,
            initializing,
            initialized,
            eventsAttached,
            eventListeners = [],
            delayed,
            destroyed,
            poll;

        me.el = el;

        /**
         * Initialize PIE for this element.
         */
        function init() {
            if( !initialized ) {
                var docEl,
                    bounds,
                    ieDocMode = PIE.ieDocMode,
                    cs = el.currentStyle,
                    lazy = cs.getAttribute( lazyInitCssProp ) === 'true',
                    trackActive = cs.getAttribute( trackActiveCssProp ) !== 'false',
                    trackHover = cs.getAttribute( trackHoverCssProp ) !== 'false';

                // Polling for size/position changes: default to on in IE8, off otherwise, overridable by -pie-poll
                poll = cs.getAttribute( pollCssProp );
                poll = ieDocMode > 7 ? poll !== 'false' : poll === 'true';

                // Force layout so move/resize events will fire. Set this as soon as possible to avoid layout changes
                // after load, but make sure it only gets called the first time through to avoid recursive calls to init().
                if( !initializing ) {
                    initializing = 1;
                    el.runtimeStyle.zoom = 1;
                    initFirstChildPseudoClass();
                }

                boundsInfo.lock();

                // If the -pie-lazy-init:true flag is set, check if the element is outside the viewport and if so, delay initialization
                if( lazy && ( bounds = boundsInfo.getBounds() ) && ( docEl = doc.documentElement || doc.body ) &&
                        ( bounds.y > docEl.clientHeight || bounds.x > docEl.clientWidth || bounds.y + bounds.h < 0 || bounds.x + bounds.w < 0 ) ) {
                    if( !delayed ) {
                        delayed = 1;
                        PIE.OnScroll.observe( init );
                    }
                } else {
                    initialized = 1;
                    delayed = initializing = 0;
                    PIE.OnScroll.unobserve( init );

                    // Create the style infos and renderers
                    if ( ieDocMode === 9 ) {
                        styleInfos = {
                            backgroundInfo: new PIE.BackgroundStyleInfo( el ),
                            borderImageInfo: new PIE.BorderImageStyleInfo( el ),
                            borderInfo: new PIE.BorderStyleInfo( el ),
                            paddingInfo: new PIE.PaddingStyleInfo( el )
                        };
                        styleInfosArr = [
                            styleInfos.backgroundInfo,
                            styleInfos.borderInfo,
                            styleInfos.borderImageInfo,
                            styleInfos.paddingInfo
                        ];
                        rootRenderer = new PIE.IE9RootRenderer( el, boundsInfo, styleInfos );
                        childRenderers = [
                            new PIE.IE9BackgroundRenderer( el, boundsInfo, styleInfos, rootRenderer ),
                            new PIE.IE9BorderImageRenderer( el, boundsInfo, styleInfos, rootRenderer )
                        ];
                    } else {

                        styleInfos = {
                            backgroundInfo: new PIE.BackgroundStyleInfo( el ),
                            borderInfo: new PIE.BorderStyleInfo( el ),
                            borderImageInfo: new PIE.BorderImageStyleInfo( el ),
                            borderRadiusInfo: new PIE.BorderRadiusStyleInfo( el ),
                            boxShadowInfo: new PIE.BoxShadowStyleInfo( el ),
                            paddingInfo: new PIE.PaddingStyleInfo( el ),
                            visibilityInfo: new PIE.VisibilityStyleInfo( el )
                        };
                        styleInfosArr = [
                            styleInfos.backgroundInfo,
                            styleInfos.borderInfo,
                            styleInfos.borderImageInfo,
                            styleInfos.borderRadiusInfo,
                            styleInfos.boxShadowInfo,
                            styleInfos.paddingInfo,
                            styleInfos.visibilityInfo
                        ];
                        rootRenderer = new PIE.RootRenderer( el, boundsInfo, styleInfos );
                        childRenderers = [
                            new PIE.BoxShadowOutsetRenderer( el, boundsInfo, styleInfos, rootRenderer ),
                            new PIE.BackgroundRenderer( el, boundsInfo, styleInfos, rootRenderer ),
                            //new PIE.BoxShadowInsetRenderer( el, boundsInfo, styleInfos, rootRenderer ),
                            new PIE.BorderRenderer( el, boundsInfo, styleInfos, rootRenderer ),
                            new PIE.BorderImageRenderer( el, boundsInfo, styleInfos, rootRenderer )
                        ];
                        if( el.tagName === 'IMG' ) {
                            childRenderers.push( new PIE.ImgRenderer( el, boundsInfo, styleInfos, rootRenderer ) );
                        }
                        rootRenderer.childRenderers = childRenderers; // circular reference, can't pass in constructor; TODO is there a cleaner way?
                    }

                    // Add property change listeners to ancestors if requested
                    initAncestorEventListeners();

                    // Add to list of polled elements when -pie-poll:true
                    if( poll ) {
                        PIE.Heartbeat.observe( update );
                        PIE.Heartbeat.run();
                    }

                    // Trigger rendering
                    update( 0, 1 );
                }

                if( !eventsAttached ) {
                    eventsAttached = 1;
                    if( ieDocMode < 9 ) {
                        addListener( el, 'onmove', handleMoveOrResize );
                    }
                    addListener( el, 'onresize', handleMoveOrResize );
                    addListener( el, 'onpropertychange', propChanged );
                    if( trackHover ) {
                        addListener( el, 'onmouseenter', mouseEntered );
                    }
                    if( trackHover || trackActive ) {
                        addListener( el, 'onmouseleave', mouseLeft );
                    }
                    if( trackActive ) {
                        addListener( el, 'onmousedown', mousePressed );
                    }
                    if( el.tagName in PIE.focusableElements ) {
                        addListener( el, 'onfocus', focused );
                        addListener( el, 'onblur', blurred );
                    }
                    PIE.OnResize.observe( handleMoveOrResize );

                    PIE.OnUnload.observe( removeEventListeners );
                }

                boundsInfo.unlock();
            }
        }




        /**
         * Event handler for onmove and onresize events. Invokes update() only if the element's
         * bounds have previously been calculated, to prevent multiple runs during page load when
         * the element has no initial CSS3 properties.
         */
        function handleMoveOrResize() {
            if( boundsInfo && boundsInfo.hasBeenQueried() ) {
                update();
            }
        }


        /**
         * Update position and/or size as necessary. Both move and resize events call
         * this rather than the updatePos/Size functions because sometimes, particularly
         * during page load, one will fire but the other won't.
         */
        function update( isPropChange, force ) {
            if( !destroyed ) {
                if( initialized ) {
                    lockAll();

                    var i = 0, len = childRenderers.length,
                        sizeChanged = boundsInfo.sizeChanged();
                    for( ; i < len; i++ ) {
                        childRenderers[i].prepareUpdate();
                    }
                    for( i = 0; i < len; i++ ) {
                        if( force || sizeChanged || ( isPropChange && childRenderers[i].needsUpdate() ) ) {
                            childRenderers[i].updateRendering();
                        }
                    }
                    if( force || sizeChanged || isPropChange || boundsInfo.positionChanged() ) {
                        rootRenderer.updateRendering();
                    }

                    unlockAll();
                }
                else if( !initializing ) {
                    init();
                }
            }
        }

        /**
         * Handle property changes to trigger update when appropriate.
         */
        function propChanged() {
            // Some elements like <table> fire onpropertychange events for old-school background properties
            // ('background', 'bgColor') when runtimeStyle background properties are changed, which
            // results in an infinite loop; therefore we filter out those property names. Also, 'display'
            // is ignored because size calculations don't work correctly immediately when its onpropertychange
            // event fires, and because it will trigger an onresize event anyway.
            if( initialized && !( event && event.propertyName in ignorePropertyNames ) ) {
                update( 1 );
            }
        }


        /**
         * Handle mouseenter events. Adds a custom class to the element to allow IE6 to add
         * hover styles to non-link elements, and to trigger a propertychange update.
         */
        function mouseEntered() {
            //must delay this because the mouseenter event fires before the :hover styles are added.
            delayAddClass( el, hoverClass );
        }

        /**
         * Handle mouseleave events
         */
        function mouseLeft() {
            //must delay this because the mouseleave event fires before the :hover styles are removed.
            delayRemoveClass( el, hoverClass, activeClass );
        }

        /**
         * Handle mousedown events. Adds a custom class to the element to allow IE6 to add
         * active styles to non-link elements, and to trigger a propertychange update.
         */
        function mousePressed() {
            //must delay this because the mousedown event fires before the :active styles are added.
            delayAddClass( el, activeClass );

            // listen for mouseups on the document; can't just be on the element because the user might
            // have dragged out of the element while the mouse button was held down
            PIE.OnMouseup.observe( mouseReleased );
        }

        /**
         * Handle mouseup events
         */
        function mouseReleased() {
            //must delay this because the mouseup event fires before the :active styles are removed.
            delayRemoveClass( el, activeClass );

            PIE.OnMouseup.unobserve( mouseReleased );
        }

        /**
         * Handle focus events. Adds a custom class to the element to trigger a propertychange update.
         */
        function focused() {
            //must delay this because the focus event fires before the :focus styles are added.
            delayAddClass( el, focusClass );
        }

        /**
         * Handle blur events
         */
        function blurred() {
            //must delay this because the blur event fires before the :focus styles are removed.
            delayRemoveClass( el, focusClass );
        }


        /**
         * Handle property changes on ancestors of the element; see initAncestorEventListeners()
         * which adds these listeners as requested with the -pie-watch-ancestors CSS property.
         */
        function ancestorPropChanged() {
            var name = event.propertyName;
            if( name === 'className' || name === 'id' || name.indexOf( 'style.' ) === 0 ) {
                propChanged();
            }
        }

        function lockAll() {
            boundsInfo.lock();
            for( var i = styleInfosArr.length; i--; ) {
                styleInfosArr[i].lock();
            }
        }

        function unlockAll() {
            for( var i = styleInfosArr.length; i--; ) {
                styleInfosArr[i].unlock();
            }
            boundsInfo.unlock();
        }


        function addListener( targetEl, type, handler ) {
            targetEl.attachEvent( type, handler );
            eventListeners.push( [ targetEl, type, handler ] );
        }

        /**
         * Remove all event listeners from the element and any monitored ancestors.
         */
        function removeEventListeners() {
            if (eventsAttached) {
                var i = eventListeners.length,
                    listener;

                while( i-- ) {
                    listener = eventListeners[ i ];
                    listener[ 0 ].detachEvent( listener[ 1 ], listener[ 2 ] );
                }

                PIE.OnUnload.unobserve( removeEventListeners );
                eventsAttached = 0;
                eventListeners = [];
            }
        }


        /**
         * Clean everything up when the behavior is removed from the element, or the element
         * is manually destroyed.
         */
        function destroy() {
            if( !destroyed ) {
                var i, len;

                removeEventListeners();

                destroyed = 1;

                // destroy any active renderers
                if( childRenderers ) {
                    for( i = 0, len = childRenderers.length; i < len; i++ ) {
                        childRenderers[i].finalized = 1;
                        childRenderers[i].destroy();
                    }
                }
                rootRenderer.destroy();

                // Remove from list of polled elements in IE8
                if( poll ) {
                    PIE.Heartbeat.unobserve( update );
                }
                // Stop onresize listening
                PIE.OnResize.unobserve( update );

                // Kill references
                childRenderers = rootRenderer = boundsInfo = styleInfos = styleInfosArr = el = null;
                me.el = me = 0;
            }
        }


        /**
         * If requested via the custom -pie-watch-ancestors CSS property, add onpropertychange and
         * other event listeners to ancestor(s) of the element so we can pick up style changes
         * based on CSS rules using descendant selectors.
         */
        function initAncestorEventListeners() {
            var watch = el.currentStyle.getAttribute( PIE.CSS_PREFIX + 'watch-ancestors' ),
                i, a;
            if( watch ) {
                watch = parseInt( watch, 10 );
                i = 0;
                a = el.parentNode;
                while( a && ( watch === 'NaN' || i++ < watch ) ) {
                    addListener( a, 'onpropertychange', ancestorPropChanged );
                    addListener( a, 'onmouseenter', mouseEntered );
                    addListener( a, 'onmouseleave', mouseLeft );
                    addListener( a, 'onmousedown', mousePressed );
                    if( a.tagName in PIE.focusableElements ) {
                        addListener( a, 'onfocus', focused );
                        addListener( a, 'onblur', blurred );
                    }
                    a = a.parentNode;
                }
            }
        }


        /**
         * If the target element is a first child, add a pie_first-child class to it. This allows using
         * the added class as a workaround for the fact that PIE's rendering element breaks the :first-child
         * pseudo-class selector.
         */
        function initFirstChildPseudoClass() {
            var tmpEl = el,
                isFirst = 1;
            while( tmpEl = tmpEl.previousSibling ) {
                if( tmpEl.nodeType === 1 ) {
                    isFirst = 0;
                    break;
                }
            }
            if( isFirst ) {
                addClass( el, firstChildClass );
            }
        }


        // These methods are all already bound to this instance so there's no need to wrap them
        // in a closure to maintain the 'this' scope object when calling them.
        me.init = init;
        me.destroy = destroy;
    }

    Element.getInstance = function( el ) {
        var id = el[ 'uniqueID' ];
        return wrappers[ id ] || ( wrappers[ id ] = new Element( el ) );
    };

    Element.destroy = function( el ) {
        var id = el[ 'uniqueID' ],
            wrapper = wrappers[ id ];
        if( wrapper ) {
            wrapper.destroy();
            delete wrappers[ id ];
        }
    };

    Element.destroyAll = function() {
        var els = [], wrapper;
        if( wrappers ) {
            for( var w in wrappers ) {
                if( wrappers.hasOwnProperty( w ) ) {
                    wrapper = wrappers[ w ];
                    els.push( wrapper.el );
                    wrapper.destroy();
                }
            }
            wrappers = {};
        }
        return els;
    };

    return Element;
})();

/*
 * This file exposes the public API for invoking PIE.
 */


/**
 * The version number of this PIE build.
 */
PIE[ 'version' ] = '2.0beta1';


/**
 * @property supportsVML
 * True if the current IE browser environment has a functioning VML engine. Should be true
 * in most IEs, but in rare cases may be false. If false, PIE will exit immediately when
 * attached to an element (for IE<9) to prevent errors; this property may also be used for
 * debugging or by external scripts to perform some special action when VML support is absent.
 * @type {boolean}
 */
PIE[ 'supportsVML' ] = PIE.supportsVML;


/**
 * Programatically attach PIE to a single element.
 * @param {Element} el
 */
PIE[ 'attach' ] = function( el ) {
    if ( PIE.ieDocMode === 9 || ( PIE.ieDocMode < 9 && PIE.supportsVML ) ) {
        PIE.Element.getInstance( el ).init();
    }
};


/**
 * Programatically detach PIE from a single element.
 * @param {Element} el
 */
PIE[ 'detach' ] = function( el ) {
    PIE.Element.destroy( el );
};

})( window, document );
