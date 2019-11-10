//! OpenSeadragon 1.0.0
//! Built on 2017-05-09
//! Git commit: v1.0.0-0-g6315977
//! http://openseadragon.github.io
//! License: http://openseadragon.github.io/license/

/*
 * OpenSeadragon
 *
 * Copyright (C) 2009 CodePlex Foundation
 * Copyright (C) 2010-2013 OpenSeadragon contributors
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are
 * met:
 *
 * - Redistributions of source code must retain the above copyright notice,
 *   this list of conditions and the following disclaimer.
 *
 * - Redistributions in binary form must reproduce the above copyright
 *   notice, this list of conditions and the following disclaimer in the
 *   documentation and/or other materials provided with the distribution.
 *
 * - Neither the name of CodePlex Foundation nor the names of its
 *   contributors may be used to endorse or promote products derived from
 *   this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
 * "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
 * LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
 * A PARTICULAR PURPOSE ARE DISCLAIMED.  IN NO EVENT SHALL THE COPYRIGHT
 * OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
 * SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED
 * TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
 * PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
 * LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 * NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

/*
 * Portions of this source file taken from jQuery:
 *
 * Copyright 2011 John Resig
 *
 * Permission is hereby granted, free of charge, to any person obtaining
 * a copy of this software and associated documentation files (the
 * "Software"), to deal in the Software without restriction, including
 * without limitation the rights to use, copy, modify, merge, publish,
 * distribute, sublicense, and/or sell copies of the Software, and to
 * permit persons to whom the Software is furnished to do so, subject to
 * the following conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
 * MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
 * LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
 * OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
 * WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

/*
 * Portions of this source file taken from mattsnider.com:
 *
 * Copyright (c) 2006-2013 Matt Snider
 *
 * Permission is hereby granted, free of charge, to any person obtaining a
 * copy of this software and associated documentation files (the "Software"),
 * to deal in the Software without restriction, including without limitation
 * the rights to use, copy, modify, merge, publish, distribute, sublicense,
 * and/or sell copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included
 * in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
 * OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
 * MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
 * IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
 * CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT
 * OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR
 * THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */


/**
 * @version  OpenSeadragon 1.0.0
 *
 * @file
 * <h2><strong>OpenSeadragon - Javascript Deep Zooming</strong></h2>
 * <p>
 * OpenSeadragon provides an html interface for creating
 * deep zoom user interfaces.  The simplest examples include deep
 * zoom for large resolution images, and complex examples include
 * zoomable map interfaces driven by SVG files.
 * </p>
 *
 */

/**
 * @module OpenSeadragon
 *
 */

/**
 * @namespace OpenSeadragon
 *
 * @classdesc The root namespace for OpenSeadragon.  All utility methods
 * and classes are defined on or below this namespace.
 *
 */


// Typedefs

 /**
  * All required and optional settings for instantiating a new instance of an OpenSeadragon image viewer.
  *
  * @typedef {Object} Options
  * @memberof OpenSeadragon
  *
  * @property {String} id
  *     Id of the element to append the viewer's container element to. If not provided, the 'element' property must be provided.
  *     If both the element and id properties are specified, the viewer is appended to the element provided in the element property.
  *
  * @property {Element} element
  *     The element to append the viewer's container element to. If not provided, the 'id' property must be provided.
  *     If both the element and id properties are specified, the viewer is appended to the element provided in the element property.
  *
  * @property {Array|String|Function|Object[]|Array[]|String[]|Function[]} [tileSources=null]
  *     As an Array, the tileSource can hold either Objects or mixed
  *     types of Arrays of Objects, Strings, or Functions. When a value is a String,
  *     the tileSource is used to create a {@link OpenSeadragon.DziTileSource}.
  *     When a value is a Function, the function is used to create a new
  *     {@link OpenSeadragon.TileSource} whose abstract method
  *     getUrl( level, x, y ) is implemented by the function. Finally, when it
  *     is an Array of objects, it is used to create a
  *     {@link OpenSeadragon.LegacyTileSource}.
  *
  * @property {String} [xmlPath=null]
  *     <strong>DEPRECATED</strong>. A relative path to load a DZI file from the server.
  *     Prefer the newer Options.tileSources.
  *
  * @property {String} [prefixUrl='/images/']
  *     Prepends the prefixUrl to navImages paths, which is very useful
  *     since the default paths are rarely useful for production
  *     environments.
  *
  * @property {OpenSeadragon.NavImages} [navImages]
  *     An object with a property for each button or other built-in navigation
  *     control, eg the current 'zoomIn', 'zoomOut', 'home', and 'fullpage'.
  *     Each of those in turn provides an image path for each state of the button
  *     or navigation control, eg 'REST', 'GROUP', 'HOVER', 'PRESS'. Finally the
  *     image paths, by default assume there is a folder on the servers root path
  *     called '/images', eg '/images/zoomin_rest.png'.  If you need to adjust
  *     these paths, prefer setting the option.prefixUrl rather than overriding
  *     every image path directly through this setting.
  *
  * @property {Object} [tileHost=null]
  *     TODO: Implement this. Currently not used.
  *
  * @property {Boolean} [debugMode=false]
  *     TODO: provide an in-screen panel providing event detail feedback.
  *
  * @property {String} [debugGridColor='#437AB2']
  *
  * @property {Number} [animationTime=1.2]
  *     Specifies the animation duration per each {@link OpenSeadragon.Spring}
  *     which occur when the image is dragged or zoomed.
  *
  * @property {Number} [blendTime=0]
  *     Specifies the duration of animation as higher or lower level tiles are
  *     replacing the existing tile.
  *
  * @property {Boolean} [alwaysBlend=false]
  *     Forces the tile to always blend.  By default the tiles skip blending
  *     when the blendTime is surpassed and the current animation frame would
  *     not complete the blend.
  *
  * @property {Boolean} [autoHideControls=true]
  *     If the user stops interacting with the viewport, fade the navigation
  *     controls.  Useful for presentation since the controls are by default
  *     floated on top of the image the user is viewing.
  *
  * @property {Boolean} [immediateRender=false]
  *     Render the best closest level first, ignoring the lowering levels which
  *     provide the effect of very blurry to sharp. It is recommended to change
  *     setting to true for mobile devices.
  *
  * @property {Number} [defaultZoomLevel=0]
  *     Zoom level to use when image is first opened or the home button is clicked.
  *     If 0, adjusts to fit viewer.
  *
  * @property {Number} [degrees=0]
  *     Initial rotation.
  *
  * @property {Number} [minZoomLevel=null]
  *
  * @property {Number} [maxZoomLevel=null]
  *
  * @property {Boolean} [panHorizontal=true]
  *     Allow horizontal pan.
  *
  * @property {Boolean} [panVertical=true]
  *     Allow vertical pan.
  *
  * @property {Boolean} [constrainDuringPan=false]
  *
  * @property {Boolean} [wrapHorizontal=false]
  *     Set to true to force the image to wrap horizontally within the viewport.
  *     Useful for maps or images representing the surface of a sphere or cylinder.
  *
  * @property {Boolean} [wrapVertical=false]
  *     Set to true to force the image to wrap vertically within the viewport.
  *     Useful for maps or images representing the surface of a sphere or cylinder.
  *
  * @property {Number} [minZoomImageRatio=0.9]
  *     The minimum percentage ( expressed as a number between 0 and 1 ) of
  *     the viewport height or width at which the zoom out will be constrained.
  *     Setting it to 0, for example will allow you to zoom out infinitly.
  *
  * @property {Number} [maxZoomPixelRatio=1.1]
  *     The maximum ratio to allow a zoom-in to affect the highest level pixel
  *     ratio. This can be set to Infinity to allow 'infinite' zooming into the
  *     image though it is less effective visually if the HTML5 Canvas is not
  *     availble on the viewing device.
  *
  * @property {Boolean} [autoResize=true]
  *     Set to false to prevent polling for viewer size changes. Useful for providing custom resize behavior.
  *
  * @property {Number} [pixelsPerWheelLine=40]
  *     For pixel-resolution scrolling devices, the number of pixels equal to one scroll line.
  *
  * @property {Number} [visibilityRatio=0.5]
  *     The percentage ( as a number from 0 to 1 ) of the source image which
  *     must be kept within the viewport.  If the image is dragged beyond that
  *     limit, it will 'bounce' back until the minimum visibility ration is
  *     achieved.  Setting this to 0 and wrapHorizontal ( or wrapVertical ) to
  *     true will provide the effect of an infinitely scrolling viewport.
  *
  * @property {Number} [springStiffness=7.0]
  *
  * @property {Number} [imageLoaderLimit=0]
  *     The maximum number of image requests to make concurrently.  By default
  *     it is set to 0 allowing the browser to make the maximum number of
  *     image requests in parallel as allowed by the browsers policy.
  *
  * @property {Number} [clickTimeThreshold=300]
  *     If multiple mouse clicks occurs within less than this number of
  *     milliseconds, treat them as a single click.
  *
  * @property {Number} [clickDistThreshold=5]
  *     If a mouse or touch drag occurs and the distance to the starting drag
  *     point is less than this many pixels, ignore the drag event.
  *
  * @property {Number} [zoomPerClick=2.0]
  *     The "zoom distance" per mouse click or touch tap. <em><strong>Note:</strong> Setting this to 1.0 effectively disables the click-to-zoom feature.</em>
  *
  * @property {Number} [zoomPerScroll=1.2]
  *     The "zoom distance" per mouse scroll or touch pinch. <em><strong>Note:</strong> Setting this to 1.0 effectively disables the mouse-wheel zoom feature.</em>
  *
  * @property {Number} [zoomPerSecond=1.0]
  *     The number of seconds to animate a single zoom event over.
  *
  * @property {Boolean} [showNavigationControl=true]
  *     Set to false to prevent the appearance of the default navigation controls.
  *
  * @property {Boolean} [showNavigator=false]
  *     Set to true to make the navigator minimap appear.
  *
  * @property {Boolean} [navigatorId=navigator-GENERATED DATE]
  *     Set the ID of a div to hold the navigator minimap.  If one is not specified,
  *     one will be generated and placed on top of the main image
  *
  * @property {Number} [navigatorHeight=null]
  *     TODO: Implement this. Currently not used.
  *
  * @property {Number} [navigatorWidth=null]
  *     TODO: Implement this. Currently not used.
  *
  * @property {Number} [navigatorPosition=null]
  *     TODO: Implement this. Currently not used.
  *
  * @property {Number} [navigatorSizeRatio=0.2]
  *     Ratio of navigator size to viewer size.
  *
  * @property {Number} [controlsFadeDelay=2000]
  *     The number of milliseconds to wait once the user has stopped interacting
  *     with the interface before begining to fade the controls. Assumes
  *     showNavigationControl and autoHideControls are both true.
  *
  * @property {Number} [controlsFadeLength=1500]
  *     The number of milliseconds to animate the controls fading out.
  *
  * @property {Number} [maxImageCacheCount=200]
  *     The max number of images we should keep in memory (per drawer).
  *
  * @property {Number} [timeout=30000]
  *
  * @property {Boolean} [useCanvas=true]
  *     Set to false to not use an HTML canvas element for image rendering even if canvas is supported.
  *
  * @property {Number} [minPixelRatio=0.5]
  *     The higher the minPixelRatio, the lower the quality of the image that
  *     is considered sufficient to stop rendering a given zoom level.  For
  *     example, if you are targeting mobile devices with less bandwith you may
  *     try setting this to 1.5 or higher.
  *
  * @property {Boolean} [mouseNavEnabled=true]
  *     Is the user able to interact with the image via mouse or touch. Default
  *     interactions include draging the image in a plane, and zooming in toward
  *     and away from the image.
  *
  * @property {Boolean} [navPrevNextWrap=false]
  *     If the 'previous' button will wrap to the last image when viewing the first
  *     image and if the 'next' button will wrap to the first image when viewing
  *     the last image.
  *
  * @property {Boolean} [showSequenceControl=true]
  *     If the viewer has been configured with a sequence of tile sources, then
  *     provide buttons for navigating forward and backward through the images.
  *
  * @property {Number} [initialPage=0]
  *     If the viewer has been configured with a sequence of tile sources, display this page initially.
  *
  * @property {Boolean} [preserveViewport=false]
  *     If the viewer has been configured with a sequence of tile sources, then
  *     normally navigating to through each image resets the viewport to 'home'
  *     position.  If preserveViewport is set to true, then the viewport position
  *     is preserved when navigating between images in the sequence.
  *
  * @property {Boolean} [showReferenceStrip=false]
  *     If the viewer has been configured with a sequence of tile sources, then
  *     display a scrolling strip of image thumbnails for navigating through the images.
  *
  * @property {String} [referenceStripScroll='horizontal']
  *
  * @property {Element} [referenceStripElement=null]
  *
  * @property {Number} [referenceStripHeight=null]
  *
  * @property {Number} [referenceStripWidth=null]
  *
  * @property {String} [referenceStripPosition='BOTTOM_LEFT']
  *
  * @property {Number} [referenceStripSizeRatio=0.2]
  *
  * @property {Boolean} [collectionMode=false]
  *
  * @property {Number} [collectionRows=3]
  *
  * @property {String} [collectionLayout='horizontal']
  *
  * @property {Number} [collectionTileSize=800]
  *
  */

/**
  * The names for the image resources used for the image navigation buttons.
  *
  * @typedef {Object} NavImages
  * @memberof OpenSeadragon
  *
  * @property {Object} zoomIn - Images for the zoom-in button.
  * @property {String} zoomIn.REST
  * @property {String} zoomIn.GROUP
  * @property {String} zoomIn.HOVER
  * @property {String} zoomIn.DOWN
  *
  * @property {Object} zoomOut - Images for the zoom-out button.
  * @property {String} zoomOut.REST
  * @property {String} zoomOut.GROUP
  * @property {String} zoomOut.HOVER
  * @property {String} zoomOut.DOWN
  *
  * @property {Object} home - Images for the home button.
  * @property {String} home.REST
  * @property {String} home.GROUP
  * @property {String} home.HOVER
  * @property {String} home.DOWN
  *
  * @property {Object} fullpage - Images for the full-page button.
  * @property {String} fullpage.REST
  * @property {String} fullpage.GROUP
  * @property {String} fullpage.HOVER
  * @property {String} fullpage.DOWN
  *
  * @property {Object} previous - Images for the previous button.
  * @property {String} previous.REST
  * @property {String} previous.GROUP
  * @property {String} previous.HOVER
  * @property {String} previous.DOWN
  *
  * @property {Object} next - Images for the next button.
  * @property {String} next.REST
  * @property {String} next.GROUP
  * @property {String} next.HOVER
  * @property {String} next.DOWN
  *
  */


 /**
  * This function serves as a single point of instantiation for an {@link OpenSeadragon.Viewer}, including all
  * combinations of out-of-the-box configurable features.
  *
  * @function OpenSeadragon
  * @memberof module:OpenSeadragon
  * @param {OpenSeadragon.Options} options - Viewer options.
  * @returns {OpenSeadragon.Viewer}
  */
window.OpenSeadragon = window.OpenSeadragon || function( options ){

    return new OpenSeadragon.Viewer( options );

};


(function( $ ){


    /**
     * The OpenSeadragon version.
     *
     * @member {Object} OpenSeadragon.version
     * @property {String} versionStr - The version number as a string ('major.minor.revision').
     * @property {Number} major - The major version number.
     * @property {Number} minor - The minor version number.
     * @property {Number} revision - The revision number.
     * @since 1.0.0
     */
    /* jshint ignore:start */
    $.version = {
        versionStr: '1.0.0',
        major: 1,
        minor: 0,
        revision: 0
    };
    /* jshint ignore:end */


    /**
     * Taken from jquery 1.6.1
     * [[Class]] -> type pairs
     * @private
     */
    var class2type = {
            '[object Boolean]':     'boolean',
            '[object Number]':      'number',
            '[object String]':      'string',
            '[object Function]':    'function',
            '[object Array]':       'array',
            '[object Date]':        'date',
            '[object RegExp]':      'regexp',
            '[object Object]':      'object'
        },
        // Save a reference to some core methods
        toString    = Object.prototype.toString,
        hasOwn      = Object.prototype.hasOwnProperty;

    /**
     * Taken from jQuery 1.6.1
     * @function isFunction
     * @memberof OpenSeadragon
     * @see {@link http://www.jquery.com/ jQuery}
     */
    $.isFunction = function( obj ) {
        return $.type(obj) === "function";
    };


    /**
     * Taken from jQuery 1.6.1
     * @function isArray
     * @memberof OpenSeadragon
     * @see {@link http://www.jquery.com/ jQuery}
     */
    $.isArray = Array.isArray || function( obj ) {
        return $.type(obj) === "array";
    };


    /**
     * A crude way of determining if an object is a window.
     * Taken from jQuery 1.6.1
     * @function isWindow
     * @memberof OpenSeadragon
     * @see {@link http://www.jquery.com/ jQuery}
     */
    $.isWindow = function( obj ) {
        return obj && typeof obj === "object" && "setInterval" in obj;
    };


    /**
     * Taken from jQuery 1.6.1
     * @function type
     * @memberof OpenSeadragon
     * @see {@link http://www.jquery.com/ jQuery}
     */
    $.type = function( obj ) {
        return ( obj === null ) || ( obj === undefined ) ?
            String( obj ) :
            class2type[ toString.call(obj) ] || "object";
    };


    /**
     * Taken from jQuery 1.6.1
     * @function isPlainObject
     * @memberof OpenSeadragon
     * @see {@link http://www.jquery.com/ jQuery}
     */
    $.isPlainObject = function( obj ) {
        // Must be an Object.
        // Because of IE, we also have to check the presence of the constructor property.
        // Make sure that DOM nodes and window objects don't pass through, as well
        if ( !obj || OpenSeadragon.type(obj) !== "object" || obj.nodeType || $.isWindow( obj ) ) {
            return false;
        }

        // Not own constructor property must be Object
        if ( obj.constructor &&
            !hasOwn.call(obj, "constructor") &&
            !hasOwn.call(obj.constructor.prototype, "isPrototypeOf") ) {
            return false;
        }

        // Own properties are enumerated firstly, so to speed up,
        // if last one is own, then all properties are own.

        var key;
        for ( key in obj ) {}

        return key === undefined || hasOwn.call( obj, key );
    };


    /**
     * Taken from jQuery 1.6.1
     * @function isEmptyObject
     * @memberof OpenSeadragon
     * @see {@link http://www.jquery.com/ jQuery}
     */
    $.isEmptyObject = function( obj ) {
        for ( var name in obj ) {
            return false;
        }
        return true;
    };


    /**
     * True if the browser supports the HTML5 canvas element
     * @member {Boolean} supportsCanvas
     * @memberof OpenSeadragon
     */
    $.supportsCanvas = (function () {
        var canvasElement = document.createElement( 'canvas' );
        return !!( $.isFunction( canvasElement.getContext ) &&
                    canvasElement.getContext( '2d' ) );
    }());


}( OpenSeadragon ));

/**
 *  This closure defines all static methods available to the OpenSeadragon
 *  namespace.  Many, if not most, are taked directly from jQuery for use
 *  to simplify and reduce common programming patterns.  More static methods
 *  from jQuery may eventually make their way into this though we are
 *  attempting to avoid an explicit dependency on jQuery only because
 *  OpenSeadragon is a broadly useful code base and would be made less broad
 *  by requiring jQuery fully.
 *
 *  Some static methods have also been refactored from the original OpenSeadragon
 *  project.
 */
(function( $ ){

    /**
     * Taken from jQuery 1.6.1
     * @function extend
     * @memberof OpenSeadragon
     * @see {@link http://www.jquery.com/ jQuery}
     */
    $.extend = function() {
        var options,
            name,
            src,
            copy,
            copyIsArray,
            clone,
            target  = arguments[ 0 ] || {},
            length  = arguments.length,
            deep    = false,
            i       = 1;

        // Handle a deep copy situation
        if ( typeof target === "boolean" ) {
            deep    = target;
            target  = arguments[ 1 ] || {};
            // skip the boolean and the target
            i = 2;
        }

        // Handle case when target is a string or something (possible in deep copy)
        if ( typeof target !== "object" && !OpenSeadragon.isFunction( target ) ) {
            target = {};
        }

        // extend jQuery itself if only one argument is passed
        if ( length === i ) {
            target = this;
            --i;
        }

        for ( ; i < length; i++ ) {
            // Only deal with non-null/undefined values
            options = arguments[ i ];
            if ( options !== null || options !== undefined ) {
                // Extend the base object
                for ( name in options ) {
                    src = target[ name ];
                    copy = options[ name ];

                    // Prevent never-ending loop
                    if ( target === copy ) {
                        continue;
                    }

                    // Recurse if we're merging plain objects or arrays
                    if ( deep && copy && ( OpenSeadragon.isPlainObject( copy ) || ( copyIsArray = OpenSeadragon.isArray( copy ) ) ) ) {
                        if ( copyIsArray ) {
                            copyIsArray = false;
                            clone = src && OpenSeadragon.isArray( src ) ? src : [];

                        } else {
                            clone = src && OpenSeadragon.isPlainObject( src ) ? src : {};
                        }

                        // Never move original objects, clone them
                        target[ name ] = OpenSeadragon.extend( deep, clone, copy );

                    // Don't bring in undefined values
                    } else if ( copy !== undefined ) {
                        target[ name ] = copy;
                    }
                }
            }
        }

        // Return the modified object
        return target;
    };


    $.extend( $, /** @lends OpenSeadragon */{
        /**
         * The default values for the optional settings documented at {@link OpenSeadragon.Options}.
         * @static
         * @type {Object}
         */
        DEFAULT_SETTINGS: {
            //DATA SOURCE DETAILS
            xmlPath:                null,
            tileSources:            null,
            tileHost:               null,
            initialPage:            0,
            
            //PAN AND ZOOM SETTINGS AND CONSTRAINTS
            panHorizontal:          true,
            panVertical:            true,
            constrainDuringPan:     false,
            wrapHorizontal:         false,
            wrapVertical:           false,
            visibilityRatio:        0.5, //-> how much of the viewer can be negative space
            minPixelRatio:          0.5, //->closer to 0 draws tiles meant for a higher zoom at this zoom
            defaultZoomLevel:       0,
            minZoomLevel:           null,
            maxZoomLevel:           null,

            //UI RESPONSIVENESS AND FEEL
            springStiffness:        7.0,
            clickTimeThreshold:     300,
            clickDistThreshold:     5,
            zoomPerClick:           2,
            zoomPerScroll:          1.2,
            zoomPerSecond:          1.0,
            animationTime:          1.2,
            blendTime:              0,
            alwaysBlend:            false,
            autoHideControls:       true,
            immediateRender:        false,
            minZoomImageRatio:      0.9, //-> closer to 0 allows zoom out to infinity
            maxZoomPixelRatio:      1.1, //-> higher allows 'over zoom' into pixels
            pixelsPerWheelLine:     40,
            autoResize:             true,

            //DEFAULT CONTROL SETTINGS
            showSequenceControl:    true,  //SEQUENCE
            preserveViewport:       false, //SEQUENCE
            showNavigationControl:  true,  //ZOOM/HOME/FULL/SEQUENCE
            controlsFadeDelay:      2000,  //ZOOM/HOME/FULL/SEQUENCE
            controlsFadeLength:     1500,  //ZOOM/HOME/FULL/SEQUENCE
            mouseNavEnabled:        true,  //GENERAL MOUSE INTERACTIVITY

            //VIEWPORT NAVIGATOR SETTINGS
            showNavigator:          false,
            navigatorId:            null,
            navigatorHeight:        null,
            navigatorWidth:         null,
            navigatorPosition:      null,
            navigatorSizeRatio:     0.2,

            // INITIAL ROTATION
            degrees:                0,

            //REFERENCE STRIP SETTINGS
            showReferenceStrip:          false,
            referenceStripScroll:       'horizontal',
            referenceStripElement:       null,
            referenceStripHeight:        null,
            referenceStripWidth:         null,
            referenceStripPosition:      'BOTTOM_LEFT',
            referenceStripSizeRatio:     0.2,

            //COLLECTION VISUALIZATION SETTINGS
            collectionRows:         3, //or columns depending on layout
            collectionLayout:       'horizontal', //vertical
            collectionMode:         false,
            collectionTileSize:     800,

            //PERFORMANCE SETTINGS
            imageLoaderLimit:       0,
            maxImageCacheCount:     200,
            timeout:                30000,
            useCanvas:              true,  // Use canvas element for drawing if available

            //INTERFACE RESOURCE SETTINGS
            prefixUrl:              "/images/",
            navImages: {
                zoomIn: {
                    REST:   'zoomin_rest.png',
                    GROUP:  'zoomin_grouphover.png',
                    HOVER:  'zoomin_hover.png',
                    DOWN:   'zoomin_pressed.png'
                },
                zoomOut: {
                    REST:   'zoomout_rest.png',
                    GROUP:  'zoomout_grouphover.png',
                    HOVER:  'zoomout_hover.png',
                    DOWN:   'zoomout_pressed.png'
                },
                home: {
                    REST:   'home_rest.png',
                    GROUP:  'home_grouphover.png',
                    HOVER:  'home_hover.png',
                    DOWN:   'home_pressed.png'
                },
                fullpage: {
                    REST:   'fullpage_rest.png',
                    GROUP:  'fullpage_grouphover.png',
                    HOVER:  'fullpage_hover.png',
                    DOWN:   'fullpage_pressed.png'
                },
                previous: {
                    REST:   'previous_rest.png',
                    GROUP:  'previous_grouphover.png',
                    HOVER:  'previous_hover.png',
                    DOWN:   'previous_pressed.png'
                },
                next: {
                    REST:   'next_rest.png',
                    GROUP:  'next_grouphover.png',
                    HOVER:  'next_hover.png',
                    DOWN:   'next_pressed.png'
                }
            },
            navPrevNextWrap:        false,

            //DEVELOPER SETTINGS
            debugMode:              false,
            debugGridColor:         '#437AB2'
        },


        /**
         * TODO: get rid of this.  I can't see how it's required at all.  Looks
         *       like an early legacy code artifact.
         * @static
         * @ignore
         */
        SIGNAL: "----seadragon----",


        /**
         * Returns a function which invokes the method as if it were a method belonging to the object.
         * @function
         * @param {Object} object
         * @param {Function} method
         * @returns {Function}
         */
        delegate: function( object, method ) {
            return function(){
                var args = arguments;
                if ( args === undefined ){
                    args = [];
                }
                return method.apply( object, args );
            };
        },


        /**
         * An enumeration of Browser vendors.
         * @static
         * @type {Object}
         * @property {Number} UNKNOWN
         * @property {Number} IE
         * @property {Number} FIREFOX
         * @property {Number} SAFARI
         * @property {Number} CHROME
         * @property {Number} OPERA
         */
        BROWSERS: {
            UNKNOWN:    0,
            IE:         1,
            FIREFOX:    2,
            SAFARI:     3,
            CHROME:     4,
            OPERA:      5
        },


        /**
         * Returns a DOM Element for the given id or element.
         * @function
         * @param {String|Element} element Accepts an id or element.
         * @returns {Element} The element with the given id, null, or the element itself.
         */
        getElement: function( element ) {
            if ( typeof ( element ) == "string" ) {
                element = document.getElementById( element );
            }
            return element;
        },


        /**
         * Determines the position of the upper-left corner of the element.
         * @function
         * @param {Element|String} element - the elemenet we want the position for.
         * @returns {OpenSeadragon.Point} - the position of the upper left corner of the element.
         */
        getElementPosition: function( element ) {
            var result = new $.Point(),
                isFixed,
                offsetParent;

            element      = $.getElement( element );
            isFixed      = $.getElementStyle( element ).position == "fixed";
            offsetParent = getOffsetParent( element, isFixed );

            while ( offsetParent ) {

                result.x += element.offsetLeft;
                result.y += element.offsetTop;

                if ( isFixed ) {
                    result = result.plus( $.getPageScroll() );
                }

                element = offsetParent;
                isFixed = $.getElementStyle( element ).position == "fixed";
                offsetParent = getOffsetParent( element, isFixed );
            }

            return result;
        },


        /**
         * Determines the position of the upper-left corner of the element adjusted for current page and/or element scroll.
         * @function
         * @param {Element|String} element - the element we want the position for.
         * @returns {OpenSeadragon.Point} - the position of the upper left corner of the element adjusted for current page and/or element scroll.
         */
        getElementOffset: function( element ) {
            element = $.getElement( element );

            var doc = element && element.ownerDocument,
                docElement,
                win,
                boundingRect = { top: 0, left: 0 };

            if ( !doc ) {
                return new $.Point();
            }

            docElement = doc.documentElement;

            if ( typeof element.getBoundingClientRect !== typeof undefined ) {
                boundingRect = element.getBoundingClientRect();
            }

            win = ( doc == doc.window ) ?
                doc :
                ( doc.nodeType === 9 ) ?
                    doc.defaultView || doc.parentWindow :
                    false;

            return new $.Point(
                boundingRect.left + ( win.pageXOffset || docElement.scrollLeft ) - ( docElement.clientLeft || 0 ),
                boundingRect.top + ( win.pageYOffset || docElement.scrollTop ) - ( docElement.clientTop || 0 )
            );
        },


        /**
         * Determines the height and width of the given element.
         * @function
         * @param {Element|String} element
         * @returns {OpenSeadragon.Point}
         */
        getElementSize: function( element ) {
            element = $.getElement( element );

            return new $.Point(
                element.clientWidth,
                element.clientHeight
            );
        },


        /**
         * Returns the CSSStyle object for the given element.
         * @function
         * @param {Element|String} element
         * @returns {CSSStyle}
         */
        getElementStyle:
            document.documentElement.currentStyle ?
            function( element ) {
                element = $.getElement( element );
                return element.currentStyle;
            } :
            function( element ) {
                element = $.getElement( element );
                return window.getComputedStyle( element, "" );
            },


        /**
         * Gets the latest event, really only useful internally since its
         * specific to IE behavior.
         * @function
         * @param {Event} [event]
         * @returns {Event}
         * @deprecated For internal use only
         * @private
         */
        getEvent: function( event ) {
            if( event ){
                $.getEvent = function( event ) {
                    return event;
                };
            } else {
                $.getEvent = function() {
                    return window.event;
                };
            }
            return $.getEvent( event );
        },


        /**
         * Gets the position of the mouse on the screen for a given event.
         * @function
         * @param {Event} [event]
         * @returns {OpenSeadragon.Point}
         */
        getMousePosition: function( event ) {

            if ( typeof( event.pageX ) == "number" ) {
                $.getMousePosition = function( event ){
                    var result = new $.Point();

                    event = $.getEvent( event );
                    result.x = event.pageX;
                    result.y = event.pageY;

                    return result;
                };
            } else if ( typeof( event.clientX ) == "number" ) {
                $.getMousePosition = function( event ){
                    var result = new $.Point();

                    event = $.getEvent( event );
                    result.x =
                        event.clientX +
                        document.body.scrollLeft +
                        document.documentElement.scrollLeft;
                    result.y =
                        event.clientY +
                        document.body.scrollTop +
                        document.documentElement.scrollTop;

                    return result;
                };
            } else {
                throw new Error(
                    "Unknown event mouse position, no known technique."
                );
            }

            return $.getMousePosition( event );
        },


        /**
         * Determines the page's current scroll position.
         * @function
         * @returns {OpenSeadragon.Point}
         */
        getPageScroll: function() {
            var docElement  = document.documentElement || {},
                body        = document.body || {};

            if ( typeof( window.pageXOffset ) == "number" ) {
                $.getPageScroll = function(){
                    return new $.Point(
                        window.pageXOffset,
                        window.pageYOffset
                    );
                };
            } else if ( body.scrollLeft || body.scrollTop ) {
                $.getPageScroll = function(){
                    return new $.Point(
                        document.body.scrollLeft,
                        document.body.scrollTop
                    );
                };
            } else if ( docElement.scrollLeft || docElement.scrollTop ) {
                $.getPageScroll = function(){
                    return new $.Point(
                        document.documentElement.scrollLeft,
                        document.documentElement.scrollTop
                    );
                };
            } else {
                // We can't reassign the function yet, as there was no scroll.
                return new $.Point(0,0);
            }

            return $.getPageScroll();
        },

        /**
         * Set the page scroll position.
         * @function
         * @returns {OpenSeadragon.Point}
         */
        setPageScroll: function( scroll ) {
            if ( typeof ( window.scrollTo ) !== "undefined" ) {
                $.setPageScroll = function( scroll ) {
                    window.scrollTo( scroll.x, scroll.y );
                };
            } else {
                var originalScroll = $.getPageScroll();
                if ( originalScroll.x === scroll.x &&
                    originalScroll.y === scroll.y ) {
                    // We are already correctly positioned and there
                    // is no way to detect the correct method.
                    return;
                }

                document.body.scrollLeft = scroll.x;
                document.body.scrollTop = scroll.y;
                var currentScroll = $.getPageScroll();
                if ( currentScroll.x !== originalScroll.x &&
                    currentScroll.y !== originalScroll.y ) {
                    $.setPageScroll = function( scroll ) {
                        document.body.scrollLeft = scroll.x;
                        document.body.scrollTop = scroll.y;
                    };
                    return;
                }

                document.documentElement.scrollLeft = scroll.x;
                document.documentElement.scrollTop = scroll.y;
                currentScroll = $.getPageScroll();
                if ( currentScroll.x !== originalScroll.x &&
                    currentScroll.y !== originalScroll.y ) {
                    $.setPageScroll = function( scroll ) {
                        document.documentElement.scrollLeft = scroll.x;
                        document.documentElement.scrollTop = scroll.y;
                    };
                    return;
                }

                // We can't find anything working, so we do nothing.
                $.setPageScroll = function( scroll ) {
                };
            }

            return $.setPageScroll( scroll );
        },

        /**
         * Determines the size of the browsers window.
         * @function
         * @returns {OpenSeadragon.Point}
         */
        getWindowSize: function() {
            var docElement = document.documentElement || {},
                body    = document.body || {};

            if ( typeof( window.innerWidth ) == 'number' ) {
                $.getWindowSize = function(){
                    return new $.Point(
                        window.innerWidth,
                        window.innerHeight
                    );
                };
            } else if ( docElement.clientWidth || docElement.clientHeight ) {
                $.getWindowSize = function(){
                    return new $.Point(
                        document.documentElement.clientWidth,
                        document.documentElement.clientHeight
                    );
                };
            } else if ( body.clientWidth || body.clientHeight ) {
                $.getWindowSize = function(){
                    return new $.Point(
                        document.body.clientWidth,
                        document.body.clientHeight
                    );
                };
            } else {
                throw new Error("Unknown window size, no known technique.");
            }

            return $.getWindowSize();
        },


        /**
         * Wraps the given element in a nest of divs so that the element can
         * be easily centered using CSS tables
         * @function
         * @param {Element|String} element
         * @returns {Element} outermost wrapper element
         */
        makeCenteredNode: function( element ) {
            // Convert a possible ID to an actual HTMLElement
            element = $.getElement( element );

            /*
                CSS tables require you to have a display:table/row/cell hierarchy so we need to create
                three nested wrapper divs:
             */

            var wrappers = [
                $.makeNeutralElement( 'div' ),
                $.makeNeutralElement( 'div' ),
                $.makeNeutralElement( 'div' )
            ];

            // It feels like we should be able to pass style dicts to makeNeutralElement:
            $.extend(wrappers[0].style, {
                display: "table",
                height: "100%",
                width: "100%"
            });

            $.extend(wrappers[1].style, {
                display: "table-row"
            });

            $.extend(wrappers[2].style, {
                display: "table-cell",
                verticalAlign: "middle",
                textAlign: "center"
            });

            wrappers[0].appendChild(wrappers[1]);
            wrappers[1].appendChild(wrappers[2]);
            wrappers[2].appendChild(element);

            return wrappers[0];
        },


        /**
         * Creates an easily positionable element of the given type that therefor
         * serves as an excellent container element.
         * @function
         * @param {String} tagName
         * @returns {Element}
         */
        makeNeutralElement: function( tagName ) {
            var element = document.createElement( tagName ),
                style   = element.style;

            style.background = "transparent none";
            style.border     = "none";
            style.margin     = "0px";
            style.padding    = "0px";
            style.position   = "static";

            return element;
        },


        /**
         * Returns the current milliseconds, using Date.now() if available
         * @function
         */
        now: function( ) {
          if (Date.now) {
            $.now = Date.now;
          } else {
            $.now = function() { return new Date().getTime(); };
          }

          return $.now();
        },


        /**
         * Ensures an image is loaded correctly to support alpha transparency.
         * Generally only IE has issues doing this correctly for formats like
         * png.
         * @function
         * @param {String} src
         * @returns {Element}
         */
        makeTransparentImage: function( src ) {

            $.makeTransparentImage = function( src ){
                var img = $.makeNeutralElement( "img" );

                img.src = src;

                return img;
            };

            if ( $.Browser.vendor == $.BROWSERS.IE && $.Browser.version < 7 ) {

                $.makeTransparentImage = function( src ){
                    var img     = $.makeNeutralElement( "img" ),
                        element = null;

                    element = $.makeNeutralElement("span");
                    element.style.display = "inline-block";

                    img.onload = function() {
                        element.style.width  = element.style.width || img.width + "px";
                        element.style.height = element.style.height || img.height + "px";

                        img.onload = null;
                        img = null;     // to prevent memory leaks in IE
                    };

                    img.src = src;
                    element.style.filter =
                        "progid:DXImageTransform.Microsoft.AlphaImageLoader(src='" +
                        src +
                        "', sizingMethod='scale')";

                    return element;
                };

            }

            return $.makeTransparentImage( src );
        },


        /**
         * Sets the opacity of the specified element.
         * @function
         * @param {Element|String} element
         * @param {Number} opacity
         * @param {Boolean} [usesAlpha]
         */
        setElementOpacity: function( element, opacity, usesAlpha ) {

            var ieOpacity,
                ieFilter;

            element = $.getElement( element );

            if ( usesAlpha && !$.Browser.alpha ) {
                opacity = Math.round( opacity );
            }

            if ( $.Browser.opacity ) {
                element.style.opacity = opacity < 1 ? opacity : "";
            } else {
                if ( opacity < 1 ) {
                    ieOpacity = Math.round( 100 * opacity );
                    ieFilter  = "alpha(opacity=" + ieOpacity + ")";
                    element.style.filter = ieFilter;
                } else {
                    element.style.filter = "";
                }
            }
        },


        /**
         * Add the specified CSS class to the element if not present.
         * @function
         * @param {Element|String} element
         * @param {String} className
         */
        addClass: function( element, className ) {
            element = $.getElement( element );

            if ( ! element.className ) {
                element.className = className;
            } else if ( ( ' ' + element.className + ' ' ).
                indexOf( ' ' + className + ' ' ) === -1 ) {
                element.className += ' ' + className;
            }
        },


        /**
         * Remove the specified CSS class from the element.
         * @function
         * @param {Element|String} element
         * @param {String} className
         */
        removeClass: function( element, className ) {
            var oldClasses,
                newClasses = [],
                i;

            element = $.getElement( element );
            oldClasses = element.className.split( /\s+/ );
            for ( i = 0; i < oldClasses.length; i++ ) {
                if ( oldClasses[ i ] && oldClasses[ i ] !== className ) {
                    newClasses.push( oldClasses[ i ] );
                }
            }
            element.className = newClasses.join(' ');
        },


        /**
         * Adds an event listener for the given element, eventName and handler.
         * @function
         * @param {Element|String} element
         * @param {String} eventName
         * @param {Function} handler
         * @param {Boolean} [useCapture]
         */
        addEvent: (function () {
            if ( window.addEventListener ) {
                return function ( element, eventName, handler, useCapture ) {
                    element = $.getElement( element );
                    element.addEventListener( eventName, handler, useCapture );
                };
            } else if ( window.attachEvent ) {
                return function ( element, eventName, handler, useCapture ) {
                    element = $.getElement( element );
                    element.attachEvent( 'on' + eventName, handler );
                    if ( useCapture && element.setCapture ) {
                        element.setCapture();
                    }
                };
            } else {
                throw new Error( "No known event model." );
            }
        }()),


        /**
         * Remove a given event listener for the given element, event type and
         * handler.
         * @function
         * @param {Element|String} element
         * @param {String} eventName
         * @param {Function} handler
         * @param {Boolean} [useCapture]
         */
        removeEvent: (function () {
            if ( window.removeEventListener ) {
                return function ( element, eventName, handler, useCapture ) {
                    element = $.getElement( element );
                    element.removeEventListener( eventName, handler, useCapture );
                };
            } else if ( window.detachEvent ) {
                return function( element, eventName, handler, useCapture ) {
                    element = $.getElement( element );
                    element.detachEvent( 'on' + eventName, handler );
                    if ( useCapture && element.releaseCapture ) {
                        element.releaseCapture();
                    }
                };
            } else {
                throw new Error( "No known event model." );
            }
        }()),


        /**
         * Cancels the default browser behavior had the event propagated all
         * the way up the DOM to the window object.
         * @function
         * @param {Event} [event]
         */
        cancelEvent: function( event ) {
            event = $.getEvent( event );

            if ( event.preventDefault ) {
                $.cancelEvent = function( event ){
                    // W3C for preventing default
                    event.preventDefault();
                };
            } else {
                $.cancelEvent = function( event ){
                    event = $.getEvent( event );
                    // legacy for preventing default
                    event.cancel = true;
                    // IE for preventing default
                    event.returnValue = false;
                };
            }
            $.cancelEvent( event );
        },


        /**
         * Stops the propagation of the event up the DOM.
         * @function
         * @param {Event} [event]
         */
        stopEvent: function( event ) {
            event = $.getEvent( event );

            if ( event.stopPropagation ) {
                // W3C for stopping propagation
                $.stopEvent = function( event ){
                    event.stopPropagation();
                };
            } else {
                // IE for stopping propagation
                $.stopEvent = function( event ){
                    event = $.getEvent( event );
                    event.cancelBubble = true;
                };

            }

            $.stopEvent( event );
        },


        /**
         * Similar to OpenSeadragon.delegate, but it does not immediately call
         * the method on the object, returning a function which can be called
         * repeatedly to delegate the method. It also allows additonal arguments
         * to be passed during construction which will be added during each
         * invocation, and each invocation can add additional arguments as well.
         *
         * @function
         * @param {Object} object
         * @param {Function} method
         * @param [args] any additional arguments are passed as arguments to the
         *  created callback
         * @returns {Function}
         */
        createCallback: function( object, method ) {
            //TODO: This pattern is painful to use and debug.  It's much cleaner
            //      to use pinning plus anonymous functions.  Get rid of this
            //      pattern!
            var initialArgs = [],
                i;
            for ( i = 2; i < arguments.length; i++ ) {
                initialArgs.push( arguments[ i ] );
            }

            return function() {
                var args = initialArgs.concat( [] ),
                    i;
                for ( i = 0; i < arguments.length; i++ ) {
                    args.push( arguments[ i ] );
                }

                return method.apply( object, args );
            };
        },


        /**
         * Retreives the value of a url parameter from the window.location string.
         * @function
         * @param {String} key
         * @returns {String} The value of the url parameter or null if no param matches.
         */
        getUrlParameter: function( key ) {
            var value = URLPARAMS[ key ];
            return value ? value : null;
        },


        createAjaxRequest: function(){
            var request;

            if ( window.XMLHttpRequest ) {
                $.createAjaxRequest = function( ){
                    return new XMLHttpRequest();
                };
                request = new XMLHttpRequest();
            } else if ( window.ActiveXObject ) {
                /*jshint loopfunc:true*/
                /* global ActiveXObject:true */
                for ( var i = 0; i < ACTIVEX.length; i++ ) {
                    try {
                        request = new ActiveXObject( ACTIVEX[ i ] );
                        $.createAjaxRequest = function( ){
                            return new ActiveXObject( ACTIVEX[ i ] );
                        };
                        break;
                    } catch (e) {
                        continue;
                    }
                }
            }

            if ( !request ) {
                throw new Error( "Browser doesn't support XMLHttpRequest." );
            }

            return request;
        },


        /**
         * Makes an AJAX request.
         * @function
         * @param {String} url - the url to request
         * @param {Function} onSuccess - a function to call on a successful response
         * @param {Function} onError - a function to call on when an error occurs
         * @throws {Error}
         */
        makeAjaxRequest: function( url, onSuccess, onError ) {
            var request = $.createAjaxRequest();

            if ( !$.isFunction( onSuccess ) ) {
                throw new Error( "makeAjaxRequest requires a success callback" );
            }

            request.onreadystatechange = function() {
                // 4 = DONE (https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest#Properties)
                if ( request.readyState == 4 ) {
                    request.onreadystatechange = function(){};

                    if ( request.status == 200 ) {
                        onSuccess( request );
                    } else {
                        $.console.log( "AJAX request returned %s: %s", request.status, url );

                        if ( $.isFunction( onError ) ) {
                            onError( request );
                        }
                    }
                }
            };

            try {
                request.open( "GET", url, true );
                request.send( null );
            } catch (e) {
                var msg = e.message;

                /*
                    IE < 10 does not support CORS and an XHR request to a different origin will fail as soon
                    as send() is called. This is particularly easy to miss during development and appear in
                    production if you use a CDN or domain sharding and the security policy is likely to break
                    exception handlers since any attempt to access a property of the request object will
                    raise an access denied TypeError inside the catch block.

                    To be friendlier, we'll check for this specific error and add a documentation pointer
                    to point developers in the right direction. We test the exception number because IE's
                    error messages are localized.
                */
                var oldIE = $.Browser.vendor == $.BROWSERS.IE && $.Browser.version < 10;
                if ( oldIE && typeof( e.number ) != "undefined" && e.number == -2147024891 ) {
                    msg += "\nSee http://msdn.microsoft.com/en-us/library/ms537505(v=vs.85).aspx#xdomain";
                }

                $.console.log( "%s while making AJAX request: %s", e.name, msg );

                request.onreadystatechange = function(){};

                if ( $.isFunction( onError ) ) {
                    onError( request, e );
                }
            }
        },

        /**
         * Taken from jQuery 1.6.1
         * @function
         * @param {Object} options
         * @param {String} options.url
         * @param {Function} options.callback
         * @param {String} [options.param='callback'] The name of the url parameter
         *      to request the jsonp provider with.
         * @param {String} [options.callbackName=] The name of the callback to
         *      request the jsonp provider with.
         */
        jsonp: function( options ){
            var script,
                url     = options.url,
                head    = document.head ||
                    document.getElementsByTagName( "head" )[ 0 ] ||
                    document.documentElement,
                jsonpCallback = options.callbackName || 'openseadragon' + $.now(),
                previous      = window[ jsonpCallback ],
                replace       = "$1" + jsonpCallback + "$2",
                callbackParam = options.param || 'callback',
                callback      = options.callback;

            url = url.replace( /(\=)\?(&|$)|\?\?/i, replace );
            // Add callback manually
            url += (/\?/.test( url ) ? "&" : "?") + callbackParam + "=" + jsonpCallback;

            // Install callback
            window[ jsonpCallback ] = function( response ) {
                if ( !previous ){
                    try{
                        delete window[ jsonpCallback ];
                    }catch(e){
                        //swallow
                    }
                } else {
                    window[ jsonpCallback ] = previous;
                }
                if( callback && $.isFunction( callback ) ){
                    callback( response );
                }
            };

            script = document.createElement( "script" );

            //TODO: having an issue with async info requests
            if( undefined !== options.async || false !== options.async ){
                script.async = "async";
            }

            if ( options.scriptCharset ) {
                script.charset = options.scriptCharset;
            }

            script.src = url;

            // Attach handlers for all browsers
            script.onload = script.onreadystatechange = function( _, isAbort ) {

                if ( isAbort || !script.readyState || /loaded|complete/.test( script.readyState ) ) {

                    // Handle memory leak in IE
                    script.onload = script.onreadystatechange = null;

                    // Remove the script
                    if ( head && script.parentNode ) {
                        head.removeChild( script );
                    }

                    // Dereference the script
                    script = undefined;
                }
            };
            // Use insertBefore instead of appendChild  to circumvent an IE6 bug.
            // This arises when a base node is used (#2709 and #4378).
            head.insertBefore( script, head.firstChild );

        },


        /**
         * Fully deprecated. Will throw an error.
         * @function
         * @deprecated use {@link OpenSeadragon.Viewer#open}
         */
        createFromDZI: function() {
            throw "OpenSeadragon.createFromDZI is deprecated, use Viewer.open.";
        },

        /**
         * Parses an XML string into a DOM Document.
         * @function
         * @param {String} string
         * @returns {Document}
         */
        parseXml: function( string ) {
            //TODO: yet another example where we can determine the correct
            //      implementation once at start-up instead of everytime we use
            //      the function. DONE.
            if ( window.ActiveXObject ) {

                $.parseXml = function( string ){
                    var xmlDoc = null;

                    xmlDoc = new ActiveXObject( "Microsoft.XMLDOM" );
                    xmlDoc.async = false;
                    xmlDoc.loadXML( string );
                    return xmlDoc;
                };

            } else if ( window.DOMParser ) {

                $.parseXml = function( string ){
                    var xmlDoc = null,
                        parser;

                    parser = new DOMParser();
                    xmlDoc = parser.parseFromString( string, "text/xml" );
                    return xmlDoc;
                };

            } else {
                throw new Error( "Browser doesn't support XML DOM." );
            }

            return $.parseXml( string );
        },


        /**
         * Reports whether the image format is supported for tiling in this
         * version.
         * @function
         * @param {String} [extension]
         * @returns {Boolean}
         */
        imageFormatSupported: function( extension ) {
            extension = extension ? extension : "";
            return !!FILEFORMATS[ extension.toLowerCase() ];
        }

    });


    /**
     * The current browser vendor, version, and related information regarding detected features.
     * @member {Object} Browser
     * @memberof OpenSeadragon
     * @static
     * @type {Object}
     * @property {OpenSeadragon.BROWSERS} vendor - One of the {@link OpenSeadragon.BROWSERS} enumeration values.
     * @property {Number} version
     * @property {Boolean} alpha - Does the browser support image alpha transparency.
     */
    $.Browser = {
        vendor:     $.BROWSERS.UNKNOWN,
        version:    0,
        alpha:      true
    };


    var ACTIVEX = [
            "Msxml2.XMLHTTP",
            "Msxml3.XMLHTTP",
            "Microsoft.XMLHTTP"
        ],
        FILEFORMATS = {
            "bmp":  false,
            "jpeg": true,
            "jpg":  true,
            "png":  true,
            "tif":  false,
            "wdp":  false
        },
        URLPARAMS = {};

    (function() {
        //A small auto-executing routine to determine the browser vendor,
        //version and supporting feature sets.
        var app = navigator.appName,
            ver = navigator.appVersion,
            ua  = navigator.userAgent;

        //console.error( 'appName: ' + navigator.appName );
        //console.error( 'appVersion: ' + navigator.appVersion );
        //console.error( 'userAgent: ' + navigator.userAgent );

        switch( navigator.appName ){
            case "Microsoft Internet Explorer":
                if( !!window.attachEvent &&
                    !!window.ActiveXObject ) {

                    $.Browser.vendor = $.BROWSERS.IE;
                    $.Browser.version = parseFloat(
                        ua.substring(
                            ua.indexOf( "MSIE" ) + 5,
                            ua.indexOf( ";", ua.indexOf( "MSIE" ) ) )
                        );
                }
                break;
            case "Netscape":
                if( !!window.addEventListener ){
                    if ( ua.indexOf( "Firefox" ) >= 0 ) {
                        $.Browser.vendor = $.BROWSERS.FIREFOX;
                        $.Browser.version = parseFloat(
                            ua.substring( ua.indexOf( "Firefox" ) + 8 )
                        );
                    } else if ( ua.indexOf( "Safari" ) >= 0 ) {
                        $.Browser.vendor = ua.indexOf( "Chrome" ) >= 0 ?
                            $.BROWSERS.CHROME :
                            $.BROWSERS.SAFARI;
                        $.Browser.version = parseFloat(
                            ua.substring(
                                ua.substring( 0, ua.indexOf( "Safari" ) ).lastIndexOf( "/" ) + 1,
                                ua.indexOf( "Safari" )
                            )
                        );
                    }
                }
                break;
            case "Opera":
                $.Browser.vendor = $.BROWSERS.OPERA;
                $.Browser.version = parseFloat( ver );
                break;
        }

            // ignore '?' portion of query string
        var query = window.location.search.substring( 1 ),
            parts = query.split('&'),
            part,
            sep,
            i;

        for ( i = 0; i < parts.length; i++ ) {
            part = parts[ i ];
            sep  = part.indexOf( '=' );

            if ( sep > 0 ) {
                URLPARAMS[ part.substring( 0, sep ) ] =
                    decodeURIComponent( part.substring( sep + 1 ) );
            }
        }

        //determine if this browser supports image alpha transparency
        $.Browser.alpha = !(
            (
                $.Browser.vendor == $.BROWSERS.IE &&
                $.Browser.version < 9
            ) || (
                $.Browser.vendor == $.BROWSERS.CHROME &&
                $.Browser.version < 2
            )
        );

        //determine if this browser supports element.style.opacity
        $.Browser.opacity = !(
            $.Browser.vendor == $.BROWSERS.IE &&
            $.Browser.version < 9
        );

    })();


    //TODO: $.console is often used inside a try/catch block which generally
    //      prevents allowings errors to occur with detection until a debugger
    //      is attached.  Although I've been guilty of the same anti-pattern
    //      I eventually was convinced that errors should naturally propogate in
    //      all but the most special cases.
    /**
     * A convenient alias for console when available, and a simple null
     * function when console is unavailable.
     * @static
     * @private
     */
    var nullfunction = function( msg ){
            //document.location.hash = msg;
        };

    $.console = window.console || {
        log:    nullfunction,
        debug:  nullfunction,
        info:   nullfunction,
        warn:   nullfunction,
        error:  nullfunction
    };


    // Adding support for HTML5's requestAnimationFrame as suggested by acdha.
    // Implementation taken from matt synder's post here:
    // http://mattsnider.com/cross-browser-and-legacy-supported-requestframeanimation/
    (function( w ) {

        // most browsers have an implementation
        var requestAnimationFrame = w.requestAnimationFrame ||
            w.mozRequestAnimationFrame ||
            w.webkitRequestAnimationFrame ||
            w.msRequestAnimationFrame;

        var cancelAnimationFrame = w.cancelAnimationFrame ||
            w.mozCancelAnimationFrame ||
            w.webkitCancelAnimationFrame ||
            w.msCancelAnimationFrame;

        // polyfill, when necessary
        if ( requestAnimationFrame && cancelAnimationFrame ) {
            // We can't assign these window methods directly to $ because they
            // expect their "this" to be "window", so we call them in wrappers.
            $.requestAnimationFrame = function(){
                return requestAnimationFrame.apply( w, arguments );
            };
            $.cancelAnimationFrame = function(){
                return cancelAnimationFrame.apply( w, arguments );
            };
        } else {
            var aAnimQueue = [],
                processing = [],
                iRequestId = 0,
                iIntervalId;

            // create a mock requestAnimationFrame function
            $.requestAnimationFrame = function( callback ) {
                aAnimQueue.push( [ ++iRequestId, callback ] );

                if ( !iIntervalId ) {
                    iIntervalId = setInterval( function() {
                        if ( aAnimQueue.length ) {
                            var time = $.now();
                            // Process all of the currently outstanding frame
                            // requests, but none that get added during the
                            // processing.
                            // Swap the arrays so we don't have to create a new
                            // array every frame.
                            var temp = processing;
                            processing = aAnimQueue;
                            aAnimQueue = temp;
                            while ( processing.length ) {
                                processing.shift()[ 1 ]( time );
                            }
                        } else {
                            // don't continue the interval, if unnecessary
                            clearInterval( iIntervalId );
                            iIntervalId = undefined;
                        }
                    }, 1000 / 50);  // estimating support for 50 frames per second
                }

                return iRequestId;
            };

            // create a mock cancelAnimationFrame function
            $.cancelAnimationFrame = function( requestId ) {
                // find the request ID and remove it
                var i, j;
                for ( i = 0, j = aAnimQueue.length; i < j; i += 1 ) {
                    if ( aAnimQueue[ i ][ 0 ] === requestId ) {
                        aAnimQueue.splice( i, 1 );
                        return;
                    }
                }

                // If it's not in the queue, it may be in the set we're currently
                // processing (if cancelAnimationFrame is called from within a
                // requestAnimationFrame callback).
                for ( i = 0, j = processing.length; i < j; i += 1 ) {
                    if ( processing[ i ][ 0 ] === requestId ) {
                        processing.splice( i, 1 );
                        return;
                    }
                }
            };
        }
    })( window );

    /**
     * @private
     * @inner
     * @function
     * @param {Element} element
     * @param {Boolean} [isFixed]
     * @returns {Element}
     */
    function getOffsetParent( element, isFixed ) {
        if ( isFixed && element != document.body ) {
            return document.body;
        } else {
            return element.offsetParent;
        }
    }

    /**
     * @private
     * @inner
     * @function
     * @param {XMLHttpRequest} xhr
     * @param {String} tilesUrl
     * @deprecated
     */
    function processDZIResponse( xhr, tilesUrl ) {
        var status,
            statusText,
            doc = null;

        if ( !xhr ) {
            throw new Error( $.getString( "Errors.Security" ) );
        } else if ( xhr.status !== 200 && xhr.status !== 0 ) {
            status     = xhr.status;
            statusText = ( status == 404 ) ?
                "Not Found" :
                xhr.statusText;
            throw new Error( $.getString( "Errors.Status", status, statusText ) );
        }

        if ( xhr.responseXML && xhr.responseXML.documentElement ) {
            doc = xhr.responseXML;
        } else if ( xhr.responseText ) {
            doc = $.parseXml( xhr.responseText );
        }

        return processDZIXml( doc, tilesUrl );
    }

    /**
     * @private
     * @inner
     * @function
     * @param {Document} xmlDoc
     * @param {String} tilesUrl
     * @deprecated
     */
    function processDZIXml( xmlDoc, tilesUrl ) {

        if ( !xmlDoc || !xmlDoc.documentElement ) {
            throw new Error( $.getString( "Errors.Xml" ) );
        }

        var root     = xmlDoc.documentElement,
            rootName = root.tagName;

        if ( rootName == "Image" ) {
            try {
                return processDZI( root, tilesUrl );
            } catch ( e ) {
                throw (e instanceof Error) ?
                    e :
                    new Error( $.getString("Errors.Dzi") );
            }
        } else if ( rootName == "Collection" ) {
            throw new Error( $.getString( "Errors.Dzc" ) );
        } else if ( rootName == "Error" ) {
            return $._processDZIError( root );
        }

        throw new Error( $.getString( "Errors.Dzi" ) );
    }

    /**
     * @private
     * @inner
     * @function
     * @param {Element} imageNode
     * @param {String} tilesUrl
     * @deprecated
     */
    function processDZI( imageNode, tilesUrl ) {
        var fileFormat    = imageNode.getAttribute( "Format" ),
            sizeNode      = imageNode.getElementsByTagName( "Size" )[ 0 ],
            dispRectNodes = imageNode.getElementsByTagName( "DisplayRect" ),
            width         = parseInt( sizeNode.getAttribute( "Width" ), 10 ),
            height        = parseInt( sizeNode.getAttribute( "Height" ), 10 ),
            tileSize      = parseInt( imageNode.getAttribute( "TileSize" ), 10 ),
            tileOverlap   = parseInt( imageNode.getAttribute( "Overlap" ), 10 ),
            dispRects     = [],
            dispRectNode,
            rectNode,
            i;

        if ( !$.imageFormatSupported( fileFormat ) ) {
            throw new Error(
                $.getString( "Errors.ImageFormat", fileFormat.toUpperCase() )
            );
        }

        for ( i = 0; i < dispRectNodes.length; i++ ) {
            dispRectNode = dispRectNodes[ i ];
            rectNode     = dispRectNode.getElementsByTagName( "Rect" )[ 0 ];

            dispRects.push( new $.DisplayRect(
                parseInt( rectNode.getAttribute( "X" ), 10 ),
                parseInt( rectNode.getAttribute( "Y" ), 10 ),
                parseInt( rectNode.getAttribute( "Width" ), 10 ),
                parseInt( rectNode.getAttribute( "Height" ), 10 ),
                0,  // ignore MinLevel attribute, bug in Deep Zoom Composer
                parseInt( dispRectNode.getAttribute( "MaxLevel" ), 10 )
            ));
        }
        return new $.DziTileSource(
            width,
            height,
            tileSize,
            tileOverlap,
            tilesUrl,
            fileFormat,
            dispRects
        );
    }

    /**
     * @private
     * @inner
     * @function
     * @param {Element} imageNode
     * @param {String} tilesUrl
     * @deprecated
     */
    function processDZIJSON( imageData, tilesUrl ) {
        var fileFormat    = imageData.Format,
            sizeData      = imageData.Size,
            dispRectData  = imageData.DisplayRect || [],
            width         = parseInt( sizeData.Width, 10 ),
            height        = parseInt( sizeData.Height, 10 ),
            tileSize      = parseInt( imageData.TileSize, 10 ),
            tileOverlap   = parseInt( imageData.Overlap, 10 ),
            dispRects     = [],
            rectData,
            i;

        if ( !$.imageFormatSupported( fileFormat ) ) {
            throw new Error(
                $.getString( "Errors.ImageFormat", fileFormat.toUpperCase() )
            );
        }

        for ( i = 0; i < dispRectData.length; i++ ) {
            rectData     = dispRectData[ i ].Rect;

            dispRects.push( new $.DisplayRect(
                parseInt( rectData.X, 10 ),
                parseInt( rectData.Y, 10 ),
                parseInt( rectData.Width, 10 ),
                parseInt( rectData.Height, 10 ),
                0,  // ignore MinLevel attribute, bug in Deep Zoom Composer
                parseInt( rectData.MaxLevel, 10 )
            ));
        }
        return new $.DziTileSource(
            width,
            height,
            tileSize,
            tileOverlap,
            tilesUrl,
            fileFormat,
            dispRects
        );
    }

    /**
     * @private
     * @inner
     * @function
     * @param {Document} errorNode
     * @throws {Error}
     * @deprecated
     */
    $._processDZIError = function ( errorNode ) {
        var messageNode = errorNode.getElementsByTagName( "Message" )[ 0 ],
            message     = messageNode.firstChild.nodeValue;

        throw new Error(message);
    };

}( OpenSeadragon ));

/*
 * OpenSeadragon - full-screen support functions
 *
 * Copyright (C) 2009 CodePlex Foundation
 * Copyright (C) 2010-2013 OpenSeadragon contributors
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are
 * met:
 *
 * - Redistributions of source code must retain the above copyright notice,
 *   this list of conditions and the following disclaimer.
 *
 * - Redistributions in binary form must reproduce the above copyright
 *   notice, this list of conditions and the following disclaimer in the
 *   documentation and/or other materials provided with the distribution.
 *
 * - Neither the name of CodePlex Foundation nor the names of its
 *   contributors may be used to endorse or promote products derived from
 *   this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
 * "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
 * LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
 * A PARTICULAR PURPOSE ARE DISCLAIMED.  IN NO EVENT SHALL THE COPYRIGHT
 * OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
 * SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED
 * TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
 * PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
 * LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 * NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

/*
 * Implementation and research by John Dyer in:
 * http://johndyer.name/native-fullscreen-javascript-api-plus-jquery-plugin/
 * John Dyer has released this fullscreen code under the MIT license; see
 * <https://github.com/openseadragon/openseadragon/issues/81>.
 *
 * Copyright (C) 2011 John Dyer
 *
 * Permission is hereby granted, free of charge, to any person obtaining a
 * copy of this software and associated documentation files (the "Software"),
 * to deal in the Software without restriction, including without limitation
 * the rights to use, copy, modify, merge, publish, distribute, sublicense,
 * and/or sell copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included
 * in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
 * OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
 * MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
 * IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
 * CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT
 * OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR
 * THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */


(function( $ ) {
    /**
     * Determined native full screen support we can get from the browser.
     * @member fullScreenApi
     * @memberof OpenSeadragon
     * @type {object}
     * @property {Boolean} supportsFullScreen
     * @property {Function} isFullScreen
     * @property {Function} requestFullScreen
     * @property {Function} cancelFullScreen
     * @property {String} fullScreenEventName
     * @property {String} fullScreenErrorEventName
     * @property {String} prefix
     */
    var fullScreenApi = {
            supportsFullScreen: false,
            isFullScreen: function() { return false; },
            requestFullScreen: function() {},
            cancelFullScreen: function() {},
            fullScreenEventName: '',
            fullScreenErrorEventName: '',
            prefix: ''
        },
        browserPrefixes = 'webkit moz o ms khtml'.split(' ');

    // check for native support
    if (typeof document.cancelFullScreen != 'undefined') {
        fullScreenApi.supportsFullScreen = true;
    } else {
        // check for fullscreen support by vendor prefix
        for (var i = 0, il = browserPrefixes.length; i < il; i++ ) {
            fullScreenApi.prefix = browserPrefixes[i];

            if (typeof document[fullScreenApi.prefix + 'CancelFullScreen' ] != 'undefined' ) {
                fullScreenApi.supportsFullScreen = true;

                break;
            }
        }
    }

    // update methods to do something useful
    if (fullScreenApi.supportsFullScreen) {
        fullScreenApi.fullScreenEventName = fullScreenApi.prefix + 'fullscreenchange';
        fullScreenApi.fullScreenErrorEventName = fullScreenApi.prefix + 'fullscreenerror';

        fullScreenApi.isFullScreen = function() {
            switch (this.prefix) {
                case '':
                    return document.fullScreen;
                case 'webkit':
                    return document.webkitIsFullScreen;
                default:
                    return document[this.prefix + 'FullScreen'];
            }
        };
        fullScreenApi.requestFullScreen = function( element ) {
            return (this.prefix === '') ?
                element.requestFullScreen() :
                element[this.prefix + 'RequestFullScreen']();

        };
        fullScreenApi.cancelFullScreen = function() {
            return (this.prefix === '') ?
                document.cancelFullScreen() :
                document[this.prefix + 'CancelFullScreen']();
        };
    } else if ( typeof window.ActiveXObject !== "undefined" ){
        // Older IE.  Support based on:
        // http://stackoverflow.com/questions/1125084/how-to-make-in-javascript-full-screen-windows-stretching-all-over-the-screen/7525760
        fullScreenApi.requestFullScreen = function(){
            /* global ActiveXObject:true */
            var wscript = new ActiveXObject("WScript.Shell");
            if ( wscript !== null ) {
                wscript.SendKeys("{F11}");
            }
            return false;
        };
        fullScreenApi.cancelFullScreen = fullScreenApi.requestFullScreen;
    }

    // export api
    $.extend( $, fullScreenApi );

})( OpenSeadragon );

/*
 * OpenSeadragon - EventSource
 *
 * Copyright (C) 2009 CodePlex Foundation
 * Copyright (C) 2010-2013 OpenSeadragon contributors
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are
 * met:
 *
 * - Redistributions of source code must retain the above copyright notice,
 *   this list of conditions and the following disclaimer.
 *
 * - Redistributions in binary form must reproduce the above copyright
 *   notice, this list of conditions and the following disclaimer in the
 *   documentation and/or other materials provided with the distribution.
 *
 * - Neither the name of CodePlex Foundation nor the names of its
 *   contributors may be used to endorse or promote products derived from
 *   this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
 * "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
 * LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
 * A PARTICULAR PURPOSE ARE DISCLAIMED.  IN NO EVENT SHALL THE COPYRIGHT
 * OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
 * SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED
 * TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
 * PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
 * LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 * NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

(function($){

/**
 * Event handler method signature used by all OpenSeadragon events.
 *
 * @callback EventHandler
 * @memberof OpenSeadragon
 * @param {Object} event - See individual events for event-specific properties.
 */


/**
 * @class EventSource
 * @classdesc For use by classes which want to support custom, non-browser events.
 *
 * @memberof OpenSeadragon
 */
$.EventSource = function() {
    this.events = {};
};

$.EventSource.prototype = /** @lends OpenSeadragon.EventSource.prototype */{

    // TODO: Add a method 'one' which automatically unbinds a listener after the first triggered event that matches.

    /**
     * Add an event handler for a given event.
     * @function
     * @param {String} eventName - Name of event to register.
     * @param {OpenSeadragon.EventHandler} handler - Function to call when event is triggered.
     * @param {Object} [userData=null] - Arbitrary object to be passed unchanged to the handler.
     */
    addHandler: function ( eventName, handler, userData ) {
        var events = this.events[ eventName ];
        if ( !events ) {
            this.events[ eventName ] = events = [];
        }
        if ( handler && $.isFunction( handler ) ) {
            events[ events.length ] = { handler: handler, userData: userData || null };
        }
    },

    /**
     * Remove a specific event handler for a given event.
     * @function
     * @param {String} eventName - Name of event for which the handler is to be removed.
     * @param {OpenSeadragon.EventHandler} handler - Function to be removed.
     */
    removeHandler: function ( eventName, handler ) {
        var events = this.events[ eventName ],
            handlers = [],
            i;
        if ( !events ) {
            return;
        }
        if ( $.isArray( events ) ) {
            for ( i = 0; i < events.length; i++ ) {
                if ( events[i].handler !== handler ) {
                    handlers.push( events[ i ] );
                }
            }
            this.events[ eventName ] = handlers;
        }
    },


    /**
     * Remove all event handlers for a given event type. If no type is given all
     * event handlers for every event type are removed.
     * @function
     * @param {String} eventName - Name of event for which all handlers are to be removed.
     */
    removeAllHandlers: function( eventName ) {
        if ( eventName ){
            this.events[ eventName ] = [];
        } else{
            for ( var eventType in this.events ) {
                this.events[ eventType ] = [];
            }
        }
    },

    /**
     * Get a function which iterates the list of all handlers registered for a given event, calling the handler for each.
     * @function
     * @param {String} eventName - Name of event to get handlers for.
     */
    getHandler: function ( eventName ) {
        var events = this.events[ eventName ];
        if ( !events || !events.length ) {
            return null;
        }
        events = events.length === 1 ?
            [ events[ 0 ] ] :
            Array.apply( null, events );
        return function ( source, args ) {
            var i,
                length = events.length;
            for ( i = 0; i < length; i++ ) {
                if ( events[ i ] ) {
                    args.eventSource = source;
                    args.userData = events[ i ].userData;
                    events[ i ].handler( args );
                }
            }
        };
    },

    /**
     * Trigger an event, optionally passing additional information.
     * @function
     * @param {String} eventName - Name of event to register.
     * @param {Object} eventArgs - Event-specific data.
     */
    raiseEvent: function( eventName, eventArgs ) {
        //uncomment if you want to get a log of all events
        //$.console.log( eventName );
        var handler = this.getHandler( eventName );

        if ( handler ) {
            if ( !eventArgs ) {
                eventArgs = {};
            }

            handler( this, eventArgs );
        }
    }
};

}( OpenSeadragon ));

/*
 * OpenSeadragon - MouseTracker
 *
 * Copyright (C) 2009 CodePlex Foundation
 * Copyright (C) 2010-2013 OpenSeadragon contributors
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are
 * met:
 *
 * - Redistributions of source code must retain the above copyright notice,
 *   this list of conditions and the following disclaimer.
 *
 * - Redistributions in binary form must reproduce the above copyright
 *   notice, this list of conditions and the following disclaimer in the
 *   documentation and/or other materials provided with the distribution.
 *
 * - Neither the name of CodePlex Foundation nor the names of its
 *   contributors may be used to endorse or promote products derived from
 *   this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
 * "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
 * LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
 * A PARTICULAR PURPOSE ARE DISCLAIMED.  IN NO EVENT SHALL THE COPYRIGHT
 * OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
 * SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED
 * TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
 * PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
 * LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 * NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

(function ( $ ) {

        // is any button currently being pressed while mouse events occur
    var IS_BUTTON_DOWN = false,
        // is any tracker currently capturing?
        IS_CAPTURING   = false,
        // dictionary from hash to MouseTracker
        ACTIVE         = {},
        // list of trackers interested in capture
        CAPTURING      = [],
        // dictionary from hash to private properties
        THIS           = {};

    /**
     * @class MouseTracker
     * @classdesc Provides simplified handling of common mouse, touch, and keyboard
     * events on a specific element, like 'enter', 'exit', 'press', 'release',
     * 'scroll', 'click', and 'drag'.
     *
     * @memberof OpenSeadragon
     * @param {Object} options
     *      Allows configurable properties to be entirely specified by passing
     *      an options object to the constructor.  The constructor also supports
     *      the original positional arguments 'element', 'clickTimeThreshold',
     *      and 'clickDistThreshold' in that order.
     * @param {Element|String} options.element
     *      A reference to an element or an element id for which the mouse/touch/key
     *      events will be monitored.
     * @param {Number} options.clickTimeThreshold
     *      The number of milliseconds within which multiple mouse clicks
     *      will be treated as a single event.
     * @param {Number} options.clickDistThreshold
     *      The distance between mouse click within multiple mouse clicks
     *      will be treated as a single event.
     * @param {Number} [options.stopDelay=50]
     *      The number of milliseconds without mouse move before the mouse stop
     *      event is fired.
     * @param {OpenSeadragon.EventHandler} [options.enterHandler=null]
     *      An optional handler for mouse enter.
     * @param {OpenSeadragon.EventHandler} [options.exitHandler=null]
     *      An optional handler for mouse exit.
     * @param {OpenSeadragon.EventHandler} [options.pressHandler=null]
     *      An optional handler for mouse press.
     * @param {OpenSeadragon.EventHandler} [options.releaseHandler=null]
     *      An optional handler for mouse release.
     * @param {OpenSeadragon.EventHandler} [options.moveHandler=null]
     *      An optional handler for mouse move.
     * @param {OpenSeadragon.EventHandler} [options.scrollHandler=null]
     *      An optional handler for mouse scroll.
     * @param {OpenSeadragon.EventHandler} [options.clickHandler=null]
     *      An optional handler for mouse click.
     * @param {OpenSeadragon.EventHandler} [options.dragHandler=null]
     *      An optional handler for mouse drag.
     * @param {OpenSeadragon.EventHandler} [options.keyHandler=null]
     *      An optional handler for keypress.
     * @param {OpenSeadragon.EventHandler} [options.focusHandler=null]
     *      An optional handler for focus.
     * @param {OpenSeadragon.EventHandler} [options.blurHandler=null]
     *      An optional handler for blur.
     * @param {Object} [options.userData=null]
     *      Arbitrary object to be passed unchanged to any attached handler methods.
     */
    $.MouseTracker = function ( options ) {

        var args = arguments;

        if ( !$.isPlainObject( options ) ) {
            options = {
                element:            args[ 0 ],
                clickTimeThreshold: args[ 1 ],
                clickDistThreshold: args[ 2 ]
            };
        }

        this.hash               = Math.random(); // An unique hash for this tracker.
        /**
         * The element for which mouse/touch/key events are being monitored.
         * @member {Element} element
         * @memberof OpenSeadragon.MouseTracker#
         */
        this.element            = $.getElement( options.element );
        /**
         * The number of milliseconds within which mutliple mouse clicks will be treated as a single event.
         * @member {Number} clickTimeThreshold
         * @memberof OpenSeadragon.MouseTracker#
         */
        this.clickTimeThreshold = options.clickTimeThreshold;
        /**
         * The distance between mouse click within multiple mouse clicks will be treated as a single event.
         * @member {Number} clickDistThreshold
         * @memberof OpenSeadragon.MouseTracker#
         */
        this.clickDistThreshold = options.clickDistThreshold;
        this.userData           = options.userData       || null;
        this.stopDelay          = options.stopDelay      || 50;

        this.enterHandler       = options.enterHandler   || null;
        this.exitHandler        = options.exitHandler    || null;
        this.pressHandler       = options.pressHandler   || null;
        this.releaseHandler     = options.releaseHandler || null;
        this.moveHandler        = options.moveHandler    || null;
        this.scrollHandler      = options.scrollHandler  || null;
        this.clickHandler       = options.clickHandler   || null;
        this.dragHandler        = options.dragHandler    || null;
        this.stopHandler        = options.stopHandler    || null;
        this.keyHandler         = options.keyHandler     || null;
        this.focusHandler       = options.focusHandler   || null;
        this.blurHandler        = options.blurHandler    || null;

        //Store private properties in a scope sealed hash map
        var _this = this;

        /**
         * @private
         * @property {Boolean} tracking
         *      Are we currently tracking mouse events.
         * @property {Boolean} capturing
         *      Are we curruently capturing mouse events.
         * @property {Boolean} insideElementPressed
         *      True if the left mouse button is currently being pressed and was
         *      initiated inside the tracked element, otherwise false.
         * @property {Boolean} insideElement
         *      Are we currently inside the screen area of the tracked element.
         * @property {OpenSeadragon.Point} lastPoint
         *      Position of last mouse down/move
         * @property {Number} lastMouseDownTime
         *      Time of last mouse down.
         * @property {OpenSeadragon.Point} lastMouseDownPoint
         *      Position of last mouse down
         */
        THIS[ this.hash ] = {
            mouseover:             function ( event ) { onMouseOver( _this, event, false ); },
            mouseout:              function ( event ) { onMouseOut( _this, event, false ); },
            mousedown:             function ( event ) { onMouseDown( _this, event ); },
            mouseup:               function ( event ) { onMouseUp( _this, event, false ); },
            mousemove:             function ( event ) { onMouseMove( _this, event ); },
            click:                 function ( event ) { onMouseClick( _this, event ); },
            wheel:                 function ( event ) { onWheel( _this, event ); },
            mousewheel:            function ( event ) { onMouseWheel( _this, event ); },
            DOMMouseScroll:        function ( event ) { onMouseWheel( _this, event ); },
            MozMousePixelScroll:   function ( event ) { onMouseWheel( _this, event ); },
            mouseupie:             function ( event ) { onMouseUpIE( _this, event ); },
            mousemovecapturedie:   function ( event ) { onMouseMoveCapturedIE( _this, event ); },
            mouseupcaptured:       function ( event ) { onMouseUpCaptured( _this, event ); },
            mousemovecaptured:     function ( event ) { onMouseMoveCaptured( _this, event, false ); },
            touchstart:            function ( event ) { onTouchStart( _this, event ); },
            touchmove:             function ( event ) { onTouchMove( _this, event ); },
            touchend:              function ( event ) { onTouchEnd( _this, event ); },
            keypress:              function ( event ) { onKeyPress( _this, event ); },
            focus:                 function ( event ) { onFocus( _this, event ); },
            blur:                  function ( event ) { onBlur( _this, event ); },
            tracking:              false,
            capturing:             false,
            insideElementPressed:  false,
            insideElement:         false,
            lastPoint:             null,
            lastMouseDownTime:     null,
            lastMouseDownPoint:    null,
            lastPinchDelta:        0
        };

    };

    $.MouseTracker.prototype = /** @lends OpenSeadragon.MouseTracker.prototype */{

        /**
         * Clean up any events or objects created by the mouse tracker.
         * @function
         */
        destroy: function () {
            stopTracking( this );
            this.element = null;
        },

        /**
         * Are we currently tracking events on this element.
         * @deprecated Just use this.tracking
         * @function
         * @returns {Boolean} Are we currently tracking events on this element.
         */
        isTracking: function () {
            return THIS[ this.hash ].tracking;
        },

        /**
         * Enable or disable whether or not we are tracking events on this element.
         * @function
         * @param {Boolean} track True to start tracking, false to stop tracking.
         * @returns {OpenSeadragon.MouseTracker} Chainable.
         */
        setTracking: function ( track ) {
            if ( track ) {
                startTracking( this );
            } else {
                stopTracking( this );
            }
            //chain
            return this;
        },

        /**
         * Implement or assign implementation to these handlers during or after
         * calling the constructor.
         * @function
         * @param {Object} event
         * @param {OpenSeadragon.MouseTracker} event.eventSource
         *      A reference to the tracker instance.
         * @param {OpenSeadragon.Point} event.position
         *      The position of the event relative to the tracked element.
         * @param {Boolean} event.insideElementPressed
         *      True if the left mouse button is currently being pressed and was
         *      initiated inside the tracked element, otherwise false.
         * @param {Boolean} event.buttonDownAny
         *      Was the button down anywhere in the screen during the event.
         * @param {Boolean} event.isTouchEvent
         *      True if the original event is a touch event, otherwise false.
         * @param {Object} event.originalEvent
         *      The original event object.
         * @param {Boolean} event.preventDefaultAction
         *      Set to true to prevent the tracker subscriber from performing its default action (subscriber implementation dependent). Default: false.
         * @param {Object} event.userData
         *      Arbitrary user-defined object.
         */
        enterHandler: function () { },

        /**
         * Implement or assign implementation to these handlers during or after
         * calling the constructor.
         * @function
         * @param {Object} event
         * @param {OpenSeadragon.MouseTracker} event.eventSource
         *      A reference to the tracker instance.
         * @param {OpenSeadragon.Point} event.position
         *      The position of the event relative to the tracked element.
         * @param {Boolean} event.insideElementPressed
         *      True if the left mouse button is currently being pressed and was
         *      initiated inside the tracked element, otherwise false.
         * @param {Boolean} event.buttonDownAny
         *      Was the button down anywhere in the screen during the event.
         * @param {Boolean} event.isTouchEvent
         *      True if the original event is a touch event, otherwise false.
         * @param {Object} event.originalEvent
         *      The original event object.
         * @param {Boolean} event.preventDefaultAction
         *      Set to true to prevent the tracker subscriber from performing its default action (subscriber implementation dependent). Default: false.
         * @param {Object} event.userData
         *      Arbitrary user-defined object.
         */
        exitHandler: function () { },

        /**
         * Implement or assign implementation to these handlers during or after
         * calling the constructor.
         * @function
         * @param {Object} event
         * @param {OpenSeadragon.MouseTracker} event.eventSource
         *      A reference to the tracker instance.
         * @param {OpenSeadragon.Point} event.position
         *      The position of the event relative to the tracked element.
         * @param {Boolean} event.isTouchEvent
         *      True if the original event is a touch event, otherwise false.
         * @param {Object} event.originalEvent
         *      The original event object.
         * @param {Boolean} event.preventDefaultAction
         *      Set to true to prevent the tracker subscriber from performing its default action (subscriber implementation dependent). Default: false.
         * @param {Object} event.userData
         *      Arbitrary user-defined object.
         */
        pressHandler: function () { },

        /**
         * Implement or assign implementation to these handlers during or after
         * calling the constructor.
         * @function
         * @param {Object} event
         * @param {OpenSeadragon.MouseTracker} event.eventSource
         *      A reference to the tracker instance.
         * @param {OpenSeadragon.Point} event.position
         *      The position of the event relative to the tracked element.
         * @param {Boolean} event.insideElementPressed
         *      True if the left mouse button is currently being pressed and was
         *      initiated inside the tracked element, otherwise false.
         * @param {Boolean} event.insideElementReleased
         *      True if the cursor still inside the tracked element when the button was released.
         * @param {Boolean} event.isTouchEvent
         *      True if the original event is a touch event, otherwise false.
         * @param {Object} event.originalEvent
         *      The original event object.
         * @param {Boolean} event.preventDefaultAction
         *      Set to true to prevent the tracker subscriber from performing its default action (subscriber implementation dependent). Default: false.
         * @param {Object} event.userData
         *      Arbitrary user-defined object.
         */
        releaseHandler: function () { },

        /**
         * Implement or assign implementation to these handlers during or after
         * calling the constructor.
         * @function
         * @param {Object} event
         * @param {OpenSeadragon.MouseTracker} event.eventSource
         *      A reference to the tracker instance.
         * @param {OpenSeadragon.Point} event.position
         *      The position of the event relative to the tracked element.
         * @param {Boolean} event.isTouchEvent
         *      True if the original event is a touch event, otherwise false.
         * @param {Object} event.originalEvent
         *      The original event object.
         * @param {Boolean} event.preventDefaultAction
         *      Set to true to prevent the tracker subscriber from performing its default action (subscriber implementation dependent). Default: false.
         * @param {Object} event.userData
         *      Arbitrary user-defined object.
         */
        moveHandler: function () { },

        /**
         * Implement or assign implementation to these handlers during or after
         * calling the constructor.
         * @function
         * @param {Object} event
         * @param {OpenSeadragon.MouseTracker} event.eventSource
         *      A reference to the tracker instance.
         * @param {OpenSeadragon.Point} event.position
         *      The position of the event relative to the tracked element.
         * @param {Number} event.scroll
         *      The scroll delta for the event.
         * @param {Boolean} event.shift
         *      True if the shift key was pressed during this event.
         * @param {Boolean} event.isTouchEvent
         *      True if the original event is a touch event, otherwise false.
         * @param {Object} event.originalEvent
         *      The original event object.
         * @param {Boolean} event.preventDefaultAction
         *      Set to true to prevent the tracker subscriber from performing its default action (subscriber implementation dependent). Default: false.
         * @param {Object} event.userData
         *      Arbitrary user-defined object.
         */
        scrollHandler: function () { },

        /**
         * Implement or assign implementation to these handlers during or after
         * calling the constructor.
         * @function
         * @param {Object} event
         * @param {OpenSeadragon.MouseTracker} event.eventSource
         *      A reference to the tracker instance.
         * @param {OpenSeadragon.Point} event.position
         *      The position of the event relative to the tracked element.
         * @param {Number} event.quick
         *      True only if the clickDistThreshold and clickDeltaThreshold are both passed. Useful for ignoring events.
         * @param {Boolean} event.shift
         *      True if the shift key was pressed during this event.
         * @param {Boolean} event.isTouchEvent
         *      True if the original event is a touch event, otherwise false.
         * @param {Object} event.originalEvent
         *      The original event object.
         * @param {Boolean} event.preventDefaultAction
         *      Set to true to prevent the tracker subscriber from performing its default action (subscriber implementation dependent). Default: false.
         * @param {Object} event.userData
         *      Arbitrary user-defined object.
         */
        clickHandler: function () { },

        /**
         * Implement or assign implementation to these handlers during or after
         * calling the constructor.
         * @function
         * @param {Object} event
         * @param {OpenSeadragon.MouseTracker} event.eventSource
         *      A reference to the tracker instance.
         * @param {OpenSeadragon.Point} event.position
         *      The position of the event relative to the tracked element.
         * @param {OpenSeadragon.Point} event.delta
         *      The x,y components of the difference between start drag and end drag.  Usefule for ignoring or weighting the events.
         * @param {Boolean} event.shift
         *      True if the shift key was pressed during this event.
         * @param {Boolean} event.isTouchEvent
         *      True if the original event is a touch event, otherwise false.
         * @param {Object} event.originalEvent
         *      The original event object.
         * @param {Boolean} event.preventDefaultAction
         *      Set to true to prevent the tracker subscriber from performing its default action (subscriber implementation dependent). Default: false.
         * @param {Object} event.userData
         *      Arbitrary user-defined object.
         */
        dragHandler: function () { },

        /**
         * Implement or assign implementation to these handlers during or after
         * calling the constructor.
         * @function
         * @param {Object} event
         * @param {OpenSeadragon.MouseTracker} event.eventSource
         *      A reference to the tracker instance.
         * @param {OpenSeadragon.Point} event.position
         *      The position of the event relative to the tracked element.
         * @param {Boolean} event.isTouchEvent
         *      True if the original event is a touch event, otherwise false.
         * @param {Object} event.originalEvent
         *      The original event object.
         * @param {Boolean} event.preventDefaultAction
         *      Set to true to prevent the tracker subscriber from performing its default action (subscriber implementation dependent). Default: false.
         * @param {Object} event.userData
         *      Arbitrary user-defined object.
         */
        stopHandler: function () { },

        /**
         * Implement or assign implementation to these handlers during or after
         * calling the constructor.
         * @function
         * @param {Object} event
         * @param {OpenSeadragon.MouseTracker} event.eventSource
         *      A reference to the tracker instance.
         * @param {Number} event.keyCode
         *      The key code that was pressed.
         * @param {Boolean} event.shift
         *      True if the shift key was pressed during this event.
         * @param {Object} event.originalEvent
         *      The original event object.
         * @param {Boolean} event.preventDefaultAction
         *      Set to true to prevent the tracker subscriber from performing its default action (subscriber implementation dependent). Default: false.
         * @param {Object} event.userData
         *      Arbitrary user-defined object.
         */
        keyHandler: function () { },

        /**
         * Implement or assign implementation to these handlers during or after
         * calling the constructor.
         * @function
         * @param {Object} event
         * @param {OpenSeadragon.MouseTracker} event.eventSource
         *      A reference to the tracker instance.
         * @param {Object} event.originalEvent
         *      The original event object.
         * @param {Boolean} event.preventDefaultAction
         *      Set to true to prevent the tracker subscriber from performing its default action (subscriber implementation dependent). Default: false.
         * @param {Object} event.userData
         *      Arbitrary user-defined object.
         */
        focusHandler: function () { },

        /**
         * Implement or assign implementation to these handlers during or after
         * calling the constructor.
         * @function
         * @param {Object} event
         * @param {OpenSeadragon.MouseTracker} event.eventSource
         *      A reference to the tracker instance.
         * @param {Object} event.originalEvent
         *      The original event object.
         * @param {Boolean} event.preventDefaultAction
         *      Set to true to prevent the tracker subscriber from performing its default action (subscriber implementation dependent). Default: false.
         * @param {Object} event.userData
         *      Arbitrary user-defined object.
         */
        blurHandler: function () { }
    };

    /**
     * Detect available mouse wheel event.
     */
    $.MouseTracker.wheelEventName = ( $.Browser.vendor == $.BROWSERS.IE && $.Browser.version > 8 ) ||
                                                ( 'onwheel' in document.createElement( 'div' ) ) ? 'wheel' : // Modern browsers support 'wheel'
                                    document.onmousewheel !== undefined ? 'mousewheel' :                     // Webkit and IE support at least 'mousewheel'
                                    'DOMMouseScroll';                                                        // Assume old Firefox

    /**
     * Starts tracking mouse events on this element.
     * @private
     * @inner
     */
    function startTracking( tracker ) {
        var events = [
                "mouseover", "mouseout", "mousedown", "mouseup", "mousemove",
                "click",
                $.MouseTracker.wheelEventName,
                "touchstart", "touchmove", "touchend",
                "keypress",
                "focus", "blur"
            ],
            delegate = THIS[ tracker.hash ],
            event,
            i;

        // Add 'MozMousePixelScroll' event handler for older Firefox
        if( $.MouseTracker.wheelEventName == "DOMMouseScroll" ) {
            events.push( "MozMousePixelScroll" );
        }

        if ( !delegate.tracking ) {
            for ( i = 0; i < events.length; i++ ) {
                event = events[ i ];
                $.addEvent(
                    tracker.element,
                    event,
                    delegate[ event ],
                    false
                );
            }
            delegate.tracking = true;
            ACTIVE[ tracker.hash ] = tracker;
        }
    }

    /**
     * Stops tracking mouse events on this element.
     * @private
     * @inner
     */
    function stopTracking( tracker ) {
        var events = [
                "mouseover", "mouseout", "mousedown", "mouseup", "mousemove",
                "click",
                $.MouseTracker.wheelEventName,
                "touchstart", "touchmove", "touchend",
                "keypress",
                "focus", "blur"
            ],
            delegate = THIS[ tracker.hash ],
            event,
            i;

        // Remove 'MozMousePixelScroll' event handler for older Firefox
        if( $.MouseTracker.wheelEventName == "DOMMouseScroll" ) {
            events.push( "MozMousePixelScroll" );
        }

        if ( delegate.tracking ) {
            for ( i = 0; i < events.length; i++ ) {
                event = events[ i ];
                $.removeEvent(
                    tracker.element,
                    event,
                    delegate[ event ],
                    false
                );
            }

            releaseMouse( tracker );
            delegate.tracking = false;
            delete ACTIVE[ tracker.hash ];
        }
    }

    /**
     * @private
     * @inner
     */
    function hasMouse( tracker ) {
        return THIS[ tracker.hash ].insideElement;
    }

    /**
     * Begin capturing mouse events on this element.
     * @private
     * @inner
     */
    function captureMouse( tracker ) {
        var delegate = THIS[ tracker.hash ];
        if ( !delegate.capturing ) {

            if ( $.Browser.vendor == $.BROWSERS.IE && $.Browser.version < 9 ) {
                $.removeEvent(
                    tracker.element,
                    "mouseup",
                    delegate.mouseup,
                    false
                );
                $.addEvent(
                    tracker.element,
                    "mouseup",
                    delegate.mouseupie,
                    true
                );
                $.addEvent(
                    tracker.element,
                    "mousemove",
                    delegate.mousemovecapturedie,
                    true
                );
            } else {
                $.addEvent(
                    window,
                    "mouseup",
                    delegate.mouseupcaptured,
                    true
                );
                $.addEvent(
                    window,
                    "mousemove",
                    delegate.mousemovecaptured,
                    true
                );
            }
            delegate.capturing = true;
        }
    }


    /**
     * Stop capturing mouse events on this element.
     * @private
     * @inner
     */
    function releaseMouse( tracker ) {
        var delegate = THIS[ tracker.hash ];
        if ( delegate.capturing ) {

            if ( $.Browser.vendor == $.BROWSERS.IE && $.Browser.version < 9 ) {
                $.removeEvent(
                    tracker.element,
                    "mousemove",
                    delegate.mousemovecapturedie,
                    true
                );
                $.removeEvent(
                    tracker.element,
                    "mouseup",
                    delegate.mouseupie,
                    true
                );
                $.addEvent(
                    tracker.element,
                    "mouseup",
                    delegate.mouseup,
                    false
                );
            } else {
                $.removeEvent(
                    window,
                    "mousemove",
                    delegate.mousemovecaptured,
                    true
                );
                $.removeEvent(
                    window,
                    "mouseup",
                    delegate.mouseupcaptured,
                    true
                );
            }
            delegate.capturing = false;
        }
    }


    /**
     * @private
     * @inner
     */
    function triggerOthers( tracker, handler, event, isTouch ) {
        var otherHash;
        for ( otherHash in ACTIVE ) {
            if ( ACTIVE.hasOwnProperty( otherHash ) && tracker.hash != otherHash ) {
                handler( ACTIVE[ otherHash ], event, isTouch );
            }
        }
    }


    /**
     * @private
     * @inner
     */
    function onFocus( tracker, event ) {
        //console.log( "focus %s", event );
        var propagate;
        if ( tracker.focusHandler ) {
            propagate = tracker.focusHandler(
                {
                    eventSource:          tracker,
                    originalEvent:        event,
                    preventDefaultAction: false,
                    userData:             tracker.userData
                }
            );
            if ( propagate === false ) {
                $.cancelEvent( event );
            }
        }
    }


    /**
     * @private
     * @inner
     */
    function onBlur( tracker, event ) {
        //console.log( "blur %s", event );
        var propagate;
        if ( tracker.blurHandler ) {
            propagate = tracker.blurHandler(
                {
                    eventSource:          tracker,
                    originalEvent:        event,
                    preventDefaultAction: false,
                    userData:             tracker.userData
                }
            );
            if ( propagate === false ) {
                $.cancelEvent( event );
            }
        }
    }


    /**
     * @private
     * @inner
     */
    function onKeyPress( tracker, event ) {
        //console.log( "keypress %s %s %s %s %s", event.keyCode, event.charCode, event.ctrlKey, event.shiftKey, event.altKey );
        var propagate;
        if ( tracker.keyHandler ) {
            propagate = tracker.keyHandler(
                {
                    eventSource:          tracker,
                    position:             getMouseRelative( event, tracker.element ),
                    keyCode:              event.keyCode ? event.keyCode : event.charCode,
                    shift:                event.shiftKey,
                    originalEvent:        event,
                    preventDefaultAction: false,
                    userData:             tracker.userData
                }
            );
            if ( !propagate ) {
                $.cancelEvent( event );
            }
        }
    }


    /**
     * @private
     * @inner
     */
    function onMouseOver( tracker, event, isTouch ) {

        var delegate = THIS[ tracker.hash ],
            propagate;

        isTouch = isTouch || false;

        event = $.getEvent( event );

        if ( !isTouch ) {
            if ( $.Browser.vendor == $.BROWSERS.IE &&
                 $.Browser.version < 9 &&
                 delegate.capturing &&
                 !isChild( event.srcElement, tracker.element ) ) {

                triggerOthers( tracker, onMouseOver, event, isTouch );
            }

            var to = event.target ?
                    event.target :
                    event.srcElement,
                from = event.relatedTarget ?
                    event.relatedTarget :
                    event.fromElement;

            if ( !isChild( tracker.element, to ) ||
                  isChild( tracker.element, from ) ) {
                return;
            }
        }

        delegate.insideElement = true;

        if ( tracker.enterHandler ) {
            propagate = tracker.enterHandler(
                {
                    eventSource:          tracker,
                    position:             getMouseRelative( isTouch ? event.changedTouches[ 0 ] : event, tracker.element ),
                    insideElementPressed: delegate.insideElementPressed,
                    buttonDownAny:        IS_BUTTON_DOWN,
                    isTouchEvent:         isTouch,
                    originalEvent:        event,
                    preventDefaultAction: false,
                    userData:             tracker.userData
                }
            );
            if ( propagate === false ) {
                $.cancelEvent( event );
            }
        }
    }


    /**
     * @private
     * @inner
     */
    function onMouseOut( tracker, event, isTouch ) {
        var delegate = THIS[ tracker.hash ],
            propagate;

        isTouch = isTouch || false;

        event = $.getEvent( event );

        if ( !isTouch ) {
            if ( $.Browser.vendor == $.BROWSERS.IE &&
                 $.Browser.version < 9 &&
                 delegate.capturing &&
                 !isChild( event.srcElement, tracker.element ) ) {

                triggerOthers( tracker, onMouseOut, event, isTouch );

            }

            var from = event.target ?
                    event.target :
                    event.srcElement,
                to = event.relatedTarget ?
                    event.relatedTarget :
                    event.toElement;

            if ( !isChild( tracker.element, from ) ||
                  isChild( tracker.element, to ) ) {
                return;
            }
        }

        delegate.insideElement = false;

        if ( tracker.exitHandler ) {
            propagate = tracker.exitHandler(
                {
                    eventSource:          tracker,
                    position:             getMouseRelative( isTouch ? event.changedTouches[ 0 ] : event, tracker.element ),
                    insideElementPressed: delegate.insideElementPressed,
                    buttonDownAny:        IS_BUTTON_DOWN,
                    isTouchEvent:         isTouch,
                    originalEvent:        event,
                    preventDefaultAction: false,
                    userData:             tracker.userData
                }
            );

            if ( propagate === false ) {
                $.cancelEvent( event );
            }
        }
    }


    /**
     * @private
     * @inner
     */
    function onMouseDown( tracker, event, noCapture, isTouch ) {
        var delegate = THIS[ tracker.hash ],
            propagate;

        isTouch = isTouch || false;

        event = $.getEvent(event);

        var eventOrTouchPoint = isTouch ? event.touches[ 0 ] : event;

        if ( event.button == 2 ) {
            return;
        }

        delegate.insideElementPressed = true;

        delegate.lastPoint = getMouseAbsolute( eventOrTouchPoint );
        delegate.lastMouseDownPoint = delegate.lastPoint;
        delegate.lastMouseDownTime = $.now();

        if ( tracker.pressHandler ) {
            propagate = tracker.pressHandler(
                {
                    eventSource:          tracker,
                    position:             getMouseRelative( eventOrTouchPoint, tracker.element ),
                    isTouchEvent:         isTouch,
                    originalEvent:        event,
                    preventDefaultAction: false,
                    userData:             tracker.userData
                }
            );
            if ( propagate === false ) {
                $.cancelEvent( event );
            }
        }

        if ( tracker.pressHandler || tracker.dragHandler ) {
            $.cancelEvent( event );
        }

        if ( noCapture ) {
            return;
        }

        if ( isTouch ||
             !( $.Browser.vendor == $.BROWSERS.IE && $.Browser.version < 9 ) ||
             !IS_CAPTURING ) {
            captureMouse( tracker );
            IS_CAPTURING = true;
            // reset to empty & add us
            CAPTURING = [ tracker ];
        } else if ( $.Browser.vendor == $.BROWSERS.IE && $.Browser.version < 9 ) {
            // add us to the list
            CAPTURING.push( tracker );
        }
    }

    /**
     * @private
     * @inner
     */
    function onTouchStart( tracker, event ) {
        var touchA,
            touchB;

        if ( event.touches.length == 1 &&
            event.targetTouches.length == 1 &&
            event.changedTouches.length == 1 ) {

            THIS[ tracker.hash ].lastTouch = event.touches[ 0 ];
            onMouseOver( tracker, event, true );
            // call with no capture as the onMouseMoveCaptured will 
            // be triggered by onTouchMove
            onMouseDown( tracker, event, true, true );
        }

        if ( event.touches.length == 2 ) {

            touchA = getMouseAbsolute( event.touches[ 0 ] );
            touchB = getMouseAbsolute( event.touches[ 1 ] );
            THIS[ tracker.hash ].lastPinchDelta =
                Math.abs( touchA.x - touchB.x ) +
                Math.abs( touchA.y - touchB.y );
            THIS[ tracker.hash ].pinchMidpoint = new $.Point(
                ( touchA.x + touchB.x ) / 2,
                ( touchA.y + touchB.y ) / 2
            );
            //$.console.debug("pinch start : "+THIS[ tracker.hash ].lastPinchDelta);
        }

        event.preventDefault();
    }


    /**
     * @private
     * @inner
     */
    function onMouseUp( tracker, event, isTouch ) {
        var delegate = THIS[ tracker.hash ],
            //were we inside the tracked element when we were pressed
            insideElementPressed = delegate.insideElementPressed,
            //are we still inside the tracked element when we released
            insideElementReleased = delegate.insideElement,
            propagate;

        isTouch = isTouch || false;

        event = $.getEvent(event);

        if ( event.button == 2 ) {
            return;
        }

        delegate.insideElementPressed = false;

        if ( tracker.releaseHandler ) {
            propagate = tracker.releaseHandler(
                {
                    eventSource:           tracker,
                    position:              getMouseRelative( isTouch ? event.changedTouches[ 0 ] : event, tracker.element ),
                    insideElementPressed:  insideElementPressed,
                    insideElementReleased: insideElementReleased,
                    isTouchEvent:          isTouch,
                    originalEvent:         event,
                    preventDefaultAction:  false,
                    userData:              tracker.userData
                }
            );
            if ( propagate === false ) {
                $.cancelEvent( event );
            }
        }

        if ( insideElementPressed && insideElementReleased ) {
            handleMouseClick( tracker, event, isTouch );
        }
    }


    /**
     * @private
     * @inner
     */
    function onTouchEnd( tracker, event ) {

        if ( event.touches.length === 0 &&
            event.targetTouches.length === 0 &&
            event.changedTouches.length == 1 ) {

            THIS[ tracker.hash ].lastTouch = null;

            // call with no release, as the mouse events are 
            // not registered in onTouchStart
            onMouseUpCaptured( tracker, event, true, true );
            onMouseOut( tracker, event, true );
        }
        if ( event.touches.length + event.changedTouches.length == 2 ) {
            THIS[ tracker.hash ].lastPinchDelta = null;
            THIS[ tracker.hash ].pinchMidpoint = null;
            //$.console.debug("pinch end");
        }
        event.preventDefault();
    }


    /**
     * Only triggered once by the deepest element that initially received
     * the mouse down event. We want to make sure THIS event doesn't bubble.
     * Instead, we want to trigger the elements that initially received the
     * mouse down event (including this one) only if the mouse is no longer
     * inside them. Then, we want to release capture, and emulate a regular
     * mouseup on the event that this event was meant for.
     * @private
     * @inner
     */
    function onMouseUpIE( tracker, event ) {
        var othertracker,
            i;

        event = $.getEvent( event );

        if ( event.button == 2 ) {
            return;
        }

        for ( i = 0; i < CAPTURING.length; i++ ) {
            othertracker = CAPTURING[ i ];
            if ( !hasMouse( othertracker ) ) {
                onMouseUp( othertracker, event, false );
            }
        }

        releaseMouse( tracker );
        IS_CAPTURING = false;
        event.srcElement.fireEvent(
            "on" + event.type,
            document.createEventObject( event )
        );

        $.stopEvent( event );
    }


    /**
     * Only triggered in W3C browsers by elements within which the mouse was
     * initially pressed, since they are now listening to the window for
     * mouseup during the capture phase. We shouldn't handle the mouseup
     * here if the mouse is still inside this element, since the regular
     * mouseup handler will still fire.
     * @private
     * @inner
     */
    function onMouseUpCaptured( tracker, event, noRelease, isTouch ) {
        isTouch = isTouch || false;

        if ( !THIS[ tracker.hash ].insideElement || isTouch ) {
            onMouseUp( tracker, event, isTouch );
        }

        if ( noRelease ) {
            return;
        }

        releaseMouse( tracker );
    }


    /**
     * @private
     * @inner
     */
    function onMouseMove( tracker, event ) {
        if ( tracker.moveHandler ) {
            event = $.getEvent( event );

            var propagate = tracker.moveHandler(
                {
                    eventSource:          tracker,
                    position:             getMouseRelative( event, tracker.element ),
                    isTouchEvent:         false,
                    originalEvent:        event,
                    preventDefaultAction: false,
                    userData:             tracker.userData
                }
            );
            if ( propagate === false ) {
                $.cancelEvent( event );
            }
        }
        if ( tracker.stopHandler ) {
            clearTimeout( tracker.stopTimeOut );
            tracker.stopTimeOut = setTimeout( function() {
                onMouseStop( tracker, event );
            }, tracker.stopDelay );
        }
    }
    
    /**
     * @private
     * @inner
     */
    function onMouseStop( tracker, originalMoveEvent ) {
        if ( tracker.stopHandler ) {
            tracker.stopHandler( {
                eventSource:          tracker,
                position:             getMouseRelative( originalMoveEvent, tracker.element ),
                isTouchEvent:         false,
                originalEvent:        originalMoveEvent,
                preventDefaultAction: false,
                userData:             tracker.userData
            } );
        }
    }

    /**
     * @private
     * @inner
     */
    function onMouseClick( tracker, event ) {
        if ( tracker.clickHandler ) {
            $.cancelEvent( event );
        }
    }


    /**
     * Handler for 'wheel' events
     *
     * @private
     * @inner
     */
    function onWheel( tracker, event ) {
        handleWheelEvent( tracker, event, event, false );
    }


    /**
     * Handler for 'mousewheel', 'DOMMouseScroll', and 'MozMousePixelScroll' events
     *
     * @private
     * @inner
     */
    function onMouseWheel( tracker, event ) {
        // For legacy IE, access the global (window) event object
        event = event || window.event;

        // Simulate a 'wheel' event
        var simulatedEvent = {
            target:     event.target || event.srcElement,
            type:       "wheel",
            shiftKey:   event.shiftKey || false,
            clientX:    event.clientX,
            clientY:    event.clientY,
            pageX:      event.pageX ? event.pageX : event.clientX,
            pageY:      event.pageY ? event.pageY : event.clientY,
            deltaMode:  event.type == "MozMousePixelScroll" ? 0 : 1, // 0=pixel, 1=line, 2=page
            deltaX:     0,
            deltaZ:     0
        };

        // Calculate deltaY
        if ( $.MouseTracker.wheelEventName == "mousewheel" ) {
            simulatedEvent.deltaY = - 1 / $.DEFAULT_SETTINGS.pixelsPerWheelLine * event.wheelDelta;
        } else {
            simulatedEvent.deltaY = event.detail;
        }

        handleWheelEvent( tracker, simulatedEvent, event, false );
    }


    /**
     * Handles 'wheel' events. 
     * The event may be simulated by the legacy mouse wheel event handler (onMouseWheel()) or onTouchMove().
     *
     * @private
     * @inner
     */
    function handleWheelEvent( tracker, event, originalEvent, isTouch ) {
        var nDelta = 0,
            propagate;

        isTouch = isTouch || false;

        // The nDelta variable is gated to provide smooth z-index scrolling
        //   since the mouse wheel allows for substantial deltas meant for rapid
        //   y-index scrolling.
        // event.deltaMode: 0=pixel, 1=line, 2=page
        // TODO: Deltas in pixel mode should be accumulated then a scroll value computed after $.DEFAULT_SETTINGS.pixelsPerWheelLine threshold reached
        nDelta = event.deltaY < 0 ? 1 : -1;

        if ( tracker.scrollHandler ) {
            propagate = tracker.scrollHandler(
                {
                    eventSource:          tracker,
                    position:             getMouseRelative( event, tracker.element ),
                    scroll:               nDelta,
                    shift:                event.shiftKey,
                    isTouchEvent:         isTouch,
                    originalEvent:        originalEvent,
                    preventDefaultAction: false,
                    userData:             tracker.userData
                }
            );
            if ( propagate === false ) {
                $.cancelEvent( originalEvent );
            }
        }
    }


    /**
     * @private
     * @inner
     */
    function handleMouseClick( tracker, event, isTouch ) {
        var delegate = THIS[ tracker.hash ],
            propagate;

        isTouch = isTouch || false;

        event = $.getEvent( event );

        var eventOrTouchPoint = isTouch ? event.changedTouches[ 0 ] : event;

        if ( event.button == 2 ) {
            return;
        }

        var time = $.now() - delegate.lastMouseDownTime,
            point = getMouseAbsolute( eventOrTouchPoint ),
            distance = delegate.lastMouseDownPoint.distanceTo( point ),
            quick = time <= tracker.clickTimeThreshold &&
                       distance <= tracker.clickDistThreshold;

        if ( tracker.clickHandler ) {
            propagate = tracker.clickHandler(
                {
                    eventSource:          tracker,
                    position:             getMouseRelative( eventOrTouchPoint, tracker.element ),
                    quick:                quick,
                    shift:                event.shiftKey,
                    isTouchEvent:         isTouch,
                    originalEvent:        event,
                    preventDefaultAction: false,
                    userData:             tracker.userData
                }
            );
            if ( propagate === false ) {
                $.cancelEvent( event );
            }
        }
    }


    /**
     * @private
     * @inner
     */
    function onMouseMoveCaptured( tracker, event, isTouch ) {
        var delegate = THIS[ tracker.hash ],
            delta,
            propagate,
            point;

        isTouch = isTouch || false;

        event = $.getEvent(event);
        var eventOrTouchPoint = isTouch ? event.touches[ 0 ] : event;
        point = getMouseAbsolute( eventOrTouchPoint );
        delta = point.minus( delegate.lastPoint );

        delegate.lastPoint = point;

        if ( tracker.dragHandler ) {
            propagate = tracker.dragHandler(
                {
                    eventSource:          tracker,
                    position:             getMouseRelative( eventOrTouchPoint, tracker.element ),
                    delta:                delta,
                    shift:                event.shiftKey,
                    isTouchEvent:         isTouch,
                    originalEvent:        event,
                    preventDefaultAction: false,
                    userData:             tracker.userData
                }
            );
            if ( propagate === false ) {
                $.cancelEvent( event );
            }
        }
    }


    /**
     * @private
     * @inner
     */
    function onTouchMove( tracker, event ) {
        var touchA,
            touchB,
            pinchDelta;

        if ( !THIS[ tracker.hash ].lastTouch ) {
            return;
        }

        if ( event.touches.length === 1 &&
            event.targetTouches.length === 1 &&
            event.changedTouches.length === 1 &&
            THIS[ tracker.hash ].lastTouch.identifier === event.touches[ 0 ].identifier ) {

            onMouseMoveCaptured( tracker, event, true );

        } else if ( event.touches.length === 2 ) {

            touchA = getMouseAbsolute( event.touches[ 0 ] );
            touchB = getMouseAbsolute( event.touches[ 1 ] );
            pinchDelta =
                Math.abs( touchA.x - touchB.x ) +
                Math.abs( touchA.y - touchB.y );

            //TODO: make the 75px pinch threshold configurable
            if ( Math.abs( THIS[ tracker.hash ].lastPinchDelta - pinchDelta ) > 75 ) {
                //$.console.debug( "pinch delta : " + pinchDelta + " | previous : " + THIS[ tracker.hash ].lastPinchDelta);

                // Simulate a 'wheel' event
                var simulatedEvent = {
                    target:     event.target || event.srcElement,
                    type:       "wheel",
                    shiftKey:   event.shiftKey || false,
                    clientX:    THIS[ tracker.hash ].pinchMidpoint.x,
                    clientY:    THIS[ tracker.hash ].pinchMidpoint.y,
                    pageX:      THIS[ tracker.hash ].pinchMidpoint.x,
                    pageY:      THIS[ tracker.hash ].pinchMidpoint.y,
                    deltaMode:  1, // 0=pixel, 1=line, 2=page
                    deltaX:     0,
                    deltaY:     ( THIS[ tracker.hash ].lastPinchDelta > pinchDelta ) ? 1 : -1,
                    deltaZ:     0
                };

                handleWheelEvent( tracker, simulatedEvent, event, true );

                THIS[ tracker.hash ].lastPinchDelta = pinchDelta;
            }
        }
        event.preventDefault();
    }

    /**
     * Only triggered once by the deepest element that initially received
     * the mouse down event. Since no other element has captured the mouse,
     * we want to trigger the elements that initially received the mouse
     * down event (including this one). The the param tracker isn't used
     * but for consistency with the other event handlers we include it.
     * @private
     * @inner
     */
    function onMouseMoveCapturedIE( tracker, event ) {
        var i;
        for ( i = 0; i < CAPTURING.length; i++ ) {
            onMouseMoveCaptured( CAPTURING[ i ], event, false );
        }

        $.stopEvent( event );
    }

    /**
     * @private
     * @inner
     */
    function getMouseAbsolute( event ) {
        return $.getMousePosition( event );
    }

    /**
     * @private
     * @inner
     */
    function getMouseRelative( event, element ) {
        var mouse  = $.getMousePosition( event ),
            offset = $.getElementOffset( element );

        return mouse.minus( offset );
    }

    /**
     * @private
     * @inner
     * Returns true if elementB is a child node of elementA, or if they're equal.
     */
    function isChild( elementA, elementB ) {
        var body = document.body;
        while ( elementB && elementA != elementB && body != elementB ) {
            try {
                elementB = elementB.parentNode;
            } catch ( e ) {
                return false;
            }
        }
        return elementA == elementB;
    }

    /**
     * @private
     * @inner
     */
    function onGlobalMouseDown() {
        IS_BUTTON_DOWN = true;
    }

    /**
     * @private
     * @inner
     */
    function onGlobalMouseUp() {
        IS_BUTTON_DOWN = false;
    }


    (function () {
        if ( $.Browser.vendor == $.BROWSERS.IE && $.Browser.version < 9 ) {
            $.addEvent( document, "mousedown", onGlobalMouseDown, false );
            $.addEvent( document, "mouseup", onGlobalMouseUp, false );
        } else {
            $.addEvent( window, "mousedown", onGlobalMouseDown, true );
            $.addEvent( window, "mouseup", onGlobalMouseUp, true );
        }
    } )();

} ( OpenSeadragon ) );

/*
 * OpenSeadragon - Control
 *
 * Copyright (C) 2009 CodePlex Foundation
 * Copyright (C) 2010-2013 OpenSeadragon contributors
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are
 * met:
 *
 * - Redistributions of source code must retain the above copyright notice,
 *   this list of conditions and the following disclaimer.
 *
 * - Redistributions in binary form must reproduce the above copyright
 *   notice, this list of conditions and the following disclaimer in the
 *   documentation and/or other materials provided with the distribution.
 *
 * - Neither the name of CodePlex Foundation nor the names of its
 *   contributors may be used to endorse or promote products derived from
 *   this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
 * "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
 * LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
 * A PARTICULAR PURPOSE ARE DISCLAIMED.  IN NO EVENT SHALL THE COPYRIGHT
 * OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
 * SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED
 * TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
 * PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
 * LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 * NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

(function( $ ){

/**
 * An enumeration of supported locations where controls can be anchored.
 * The anchoring is always relative to the container.
 * @member ControlAnchor
 * @memberof OpenSeadragon
 * @static
 * @type {Object}
 * @property {Number} NONE
 * @property {Number} TOP_LEFT
 * @property {Number} TOP_RIGHT
 * @property {Number} BOTTOM_LEFT
 * @property {Number} BOTTOM_RIGHT
 */
$.ControlAnchor = {
    NONE: 0,
    TOP_LEFT: 1,
    TOP_RIGHT: 2,
    BOTTOM_RIGHT: 3,
    BOTTOM_LEFT: 4
};

/**
 * @class Control
 * @classdesc A Control represents any interface element which is meant to allow the user
 * to interact with the zoomable interface. Any control can be anchored to any
 * element.
 *
 * @memberof OpenSeadragon
 * @param {Element} element - the control element to be anchored in the container.
 * @param {Object } options - All required and optional settings for configuring a control element.
 * @param {OpenSeadragon.ControlAnchor} [options.anchor=OpenSeadragon.ControlAnchor.NONE] - the position of the control
 *  relative to the container.
 * @param {Boolean} [options.attachToViewer=true] - Whether the control should be added directly to the viewer, or
 *  directly to the container
 * @param {Boolean} [options.autoFade=true] - Whether the control should have the autofade behavior
 * @param {Element} container - the element to control will be anchored too.
 */
$.Control = function ( element, options, container ) {
    var parent = element.parentNode;
    if (typeof options === 'number')
    {
        $.console.error("Passing an anchor directly into the OpenSeadragon.Control constructor is deprecated; " +
                        "please use an options object instead.  " +
                        "Support for this deprecated variant is scheduled for removal in December 2013");
         options = {anchor: options};
    }
    options.attachToViewer = (typeof options.attachToViewer === 'undefined') ? true : options.attachToViewer;
    /**
     * True if the control should have autofade behavior.
     * @member {Boolean} autoFade
     * @memberof OpenSeadragon.Control#
     */
    this.autoFade = (typeof options.autoFade === 'undefined') ? true : options.autoFade;
    /**
     * The element providing the user interface with some type of control (e.g. a zoom-in button).
     * @member {Element} element
     * @memberof OpenSeadragon.Control#
     */
    this.element    = element;
    /**
     * The position of the Control relative to its container.
     * @member {OpenSeadragon.ControlAnchor} anchor
     * @memberof OpenSeadragon.Control#
     */
    this.anchor     = options.anchor;
    /**
     * The Control's containing element.
     * @member {Element} container
     * @memberof OpenSeadragon.Control#
     */
    this.container  = container;
    /**
     * A neutral element surrounding the control element.
     * @member {Element} wrapper
     * @memberof OpenSeadragon.Control#
     */
    this.wrapper    = $.makeNeutralElement( "span" );
    this.wrapper.style.display = "inline-block";
    this.wrapper.appendChild( this.element );

    if ( this.anchor == $.ControlAnchor.NONE ) {
        // IE6 fix
        this.wrapper.style.width = this.wrapper.style.height = "100%";
    }

    if (options.attachToViewer ) {
        if ( this.anchor == $.ControlAnchor.TOP_RIGHT ||
             this.anchor == $.ControlAnchor.BOTTOM_RIGHT ) {
            this.container.insertBefore(
                this.wrapper,
                this.container.firstChild
            );
        } else {
            this.container.appendChild( this.wrapper );
        }
    } else {
        parent.appendChild( this.wrapper );
    }
};

$.Control.prototype = /** @lends OpenSeadragon.Control.prototype */{

    /**
     * Removes the control from the container.
     * @function
     */
    destroy: function() {
        this.wrapper.removeChild( this.element );
        this.container.removeChild( this.wrapper );
    },

    /**
     * Determines if the control is currently visible.
     * @function
     * @return {Boolean} true if currenly visible, false otherwise.
     */
    isVisible: function() {
        return this.wrapper.style.display != "none";
    },

    /**
     * Toggles the visibility of the control.
     * @function
     * @param {Boolean} visible - true to make visible, false to hide.
     */
    setVisible: function( visible ) {
        this.wrapper.style.display = visible ?
            "inline-block" :
            "none";
    },

    /**
     * Sets the opacity level for the control.
     * @function
     * @param {Number} opactiy - a value between 1 and 0 inclusively.
     */
    setOpacity: function( opacity ) {
        if ( this.element[ $.SIGNAL ] && $.Browser.vendor == $.BROWSERS.IE ) {
            $.setElementOpacity( this.element, opacity, true );
        } else {
            $.setElementOpacity( this.wrapper, opacity, true );
        }
    }
};

}( OpenSeadragon ));

/*
 * OpenSeadragon - ControlDock
 *
 * Copyright (C) 2009 CodePlex Foundation
 * Copyright (C) 2010-2013 OpenSeadragon contributors
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are
 * met:
 *
 * - Redistributions of source code must retain the above copyright notice,
 *   this list of conditions and the following disclaimer.
 *
 * - Redistributions in binary form must reproduce the above copyright
 *   notice, this list of conditions and the following disclaimer in the
 *   documentation and/or other materials provided with the distribution.
 *
 * - Neither the name of CodePlex Foundation nor the names of its
 *   contributors may be used to endorse or promote products derived from
 *   this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
 * "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
 * LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
 * A PARTICULAR PURPOSE ARE DISCLAIMED.  IN NO EVENT SHALL THE COPYRIGHT
 * OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
 * SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED
 * TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
 * PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
 * LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 * NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

(function( $ ){
    /**
     * @class ControlDock
     * @classdesc Provides a container element (a &lt;form&gt; element) with support for the layout of control elements.
     *
     * @memberof OpenSeadragon
     */
    $.ControlDock = function( options ){
        var layouts = [ 'topleft', 'topright', 'bottomright', 'bottomleft'],
            layout,
            i;

        $.extend( true, this, {
            id: 'controldock-'+$.now()+'-'+Math.floor(Math.random()*1000000),
            container: $.makeNeutralElement('form'),
            controls: []
        }, options );

        // Disable the form's submit; otherwise button clicks and return keys
        // can trigger it.
        this.container.onsubmit = function() {
            return false;
        };

        if( this.element ){
            this.element = $.getElement( this.element );
            this.element.appendChild( this.container );
            this.element.style.position = 'relative';
            this.container.style.width = '100%';
            this.container.style.height = '100%';
        }

        for( i = 0; i < layouts.length; i++ ){
            layout = layouts[ i ];
            this.controls[ layout ] = $.makeNeutralElement( "div" );
            this.controls[ layout ].style.position = 'absolute';
            if ( layout.match( 'left' ) ){
                this.controls[ layout ].style.left = '0px';
            }
            if ( layout.match( 'right' ) ){
                this.controls[ layout ].style.right = '0px';
            }
            if ( layout.match( 'top' ) ){
                this.controls[ layout ].style.top = '0px';
            }
            if ( layout.match( 'bottom' ) ){
                this.controls[ layout ].style.bottom = '0px';
            }
        }

        this.container.appendChild( this.controls.topleft );
        this.container.appendChild( this.controls.topright );
        this.container.appendChild( this.controls.bottomright );
        this.container.appendChild( this.controls.bottomleft );
    };

    $.ControlDock.prototype = /** @lends OpenSeadragon.ControlDock.prototype */{

        /**
         * @function
         */
        addControl: function ( element, controlOptions ) {
            element = $.getElement( element );
            var div = null;

            if ( getControlIndex( this, element ) >= 0 ) {
                return;     // they're trying to add a duplicate control
            }

            switch ( controlOptions.anchor ) {
                case $.ControlAnchor.TOP_RIGHT:
                    div = this.controls.topright;
                    element.style.position = "relative";
                    element.style.paddingRight = "0px";
                    element.style.paddingTop = "0px";
                    break;
                case $.ControlAnchor.BOTTOM_RIGHT:
                    div = this.controls.bottomright;
                    element.style.position = "relative";
                    element.style.paddingRight = "0px";
                    element.style.paddingBottom = "0px";
                    break;
                case $.ControlAnchor.BOTTOM_LEFT:
                    div = this.controls.bottomleft;
                    element.style.position = "relative";
                    element.style.paddingLeft = "0px";
                    element.style.paddingBottom = "0px";
                    break;
                case $.ControlAnchor.TOP_LEFT:
                    div = this.controls.topleft;
                    element.style.position = "relative";
                    element.style.paddingLeft = "0px";
                    element.style.paddingTop = "0px";
                    break;
                default:
                case $.ControlAnchor.NONE:
                    div = this.container;
                    element.style.margin = "0px";
                    element.style.padding = "0px";
                    break;
            }

            this.controls.push(
                new $.Control( element, controlOptions, div )
            );
            element.style.display = "inline-block";
        },


        /**
         * @function
         * @return {OpenSeadragon.ControlDock} Chainable.
         */
        removeControl: function ( element ) {
            element = $.getElement( element );
            var i = getControlIndex( this, element );

            if ( i >= 0 ) {
                this.controls[ i ].destroy();
                this.controls.splice( i, 1 );
            }

            return this;
        },

        /**
         * @function
         * @return {OpenSeadragon.ControlDock} Chainable.
         */
        clearControls: function () {
            while ( this.controls.length > 0 ) {
                this.controls.pop().destroy();
            }

            return this;
        },


        /**
         * @function
         * @return {Boolean}
         */
        areControlsEnabled: function () {
            var i;

            for ( i = this.controls.length - 1; i >= 0; i-- ) {
                if ( this.controls[ i ].isVisible() ) {
                    return true;
                }
            }

            return false;
        },


        /**
         * @function
         * @return {OpenSeadragon.ControlDock} Chainable.
         */
        setControlsEnabled: function( enabled ) {
            var i;

            for ( i = this.controls.length - 1; i >= 0; i-- ) {
                this.controls[ i ].setVisible( enabled );
            }

            return this;
        }

    };


    ///////////////////////////////////////////////////////////////////////////////
    // Utility methods
    ///////////////////////////////////////////////////////////////////////////////
    function getControlIndex( dock, element ) {
        var controls = dock.controls,
            i;

        for ( i = controls.length - 1; i >= 0; i-- ) {
            if ( controls[ i ].element == element ) {
                return i;
            }
        }

        return -1;
    }

}( OpenSeadragon ));

/*
 * OpenSeadragon - Viewer
 *
 * Copyright (C) 2009 CodePlex Foundation
 * Copyright (C) 2010-2013 OpenSeadragon contributors
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are
 * met:
 *
 * - Redistributions of source code must retain the above copyright notice,
 *   this list of conditions and the following disclaimer.
 *
 * - Redistributions in binary form must reproduce the above copyright
 *   notice, this list of conditions and the following disclaimer in the
 *   documentation and/or other materials provided with the distribution.
 *
 * - Neither the name of CodePlex Foundation nor the names of its
 *   contributors may be used to endorse or promote products derived from
 *   this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
 * "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
 * LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
 * A PARTICULAR PURPOSE ARE DISCLAIMED.  IN NO EVENT SHALL THE COPYRIGHT
 * OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
 * SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED
 * TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
 * PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
 * LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 * NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

(function( $ ){

// dictionary from hash to private properties
var THIS = {},
// We keep a list of viewers so we can 'wake-up' each viewer on
// a page after toggling between fullpage modes
    VIEWERS = {};

/**
 *
 * The main point of entry into creating a zoomable image on the page.
 *
 * We have provided an idiomatic javascript constructor which takes
 * a single object, but still support the legacy positional arguments.
 *
 * The options below are given in order that they appeared in the constructor
 * as arguments and we translate a positional call into an idiomatic call.
 *
 * @class Viewer
 * @classdesc The main OpenSeadragon viewer class.
 *
 * @memberof OpenSeadragon
 * @extends OpenSeadragon.EventSource
 * @extends OpenSeadragon.ControlDock
 * @param {OpenSeadragon.Options} options - Viewer options.
 *
 **/
$.Viewer = function( options ) {

    var args  = arguments,
        _this = this,
        i;


    //backward compatibility for positional args while prefering more
    //idiomatic javascript options object as the only argument
    if( !$.isPlainObject( options ) ){
        options = {
            id:                 args[ 0 ],
            xmlPath:            args.length > 1 ? args[ 1 ] : undefined,
            prefixUrl:          args.length > 2 ? args[ 2 ] : undefined,
            controls:           args.length > 3 ? args[ 3 ] : undefined,
            overlays:           args.length > 4 ? args[ 4 ] : undefined,
            overlayControls:    args.length > 5 ? args[ 5 ] : undefined
        };
    }

    //options.config and the general config argument are deprecated
    //in favor of the more direct specification of optional settings
    //being pass directly on the options object
    if ( options.config ){
        $.extend( true, options, options.config );
        delete options.config;
    }

    //Public properties
    //Allow the options object to override global defaults
    $.extend( true, this, {

        //internal state and dom identifiers
        id:             options.id,
        hash:           options.hash || options.id,

        //dom nodes
        /**
         * The parent element of this Viewer instance, passed in when the Viewer was created.
         * @member {Element} element
         * @memberof OpenSeadragon.Viewer#
         */
        element:        null,
        /**
         * A &lt;form&gt; element (provided by {@link OpenSeadragon.ControlDock}), the base element of this Viewer instance.<br><br>
         * Child element of {@link OpenSeadragon.Viewer#element}.
         * @member {Element} container
         * @memberof OpenSeadragon.Viewer#
         */
        container:      null,
        /**
         * A &lt;textarea&gt; element, the element where keyboard events are handled.<br><br>
         * Child element of {@link OpenSeadragon.Viewer#container},
         * positioned below {@link OpenSeadragon.Viewer#canvas}. 
         * @member {Element} keyboardCommandArea
         * @memberof OpenSeadragon.Viewer#
         */
        keyboardCommandArea: null,
        /**
         * A &lt;div&gt; element, the element where user-input events are handled for panning and zooming.<br><br>
         * Child element of {@link OpenSeadragon.Viewer#container},
         * positioned on top of {@link OpenSeadragon.Viewer#keyboardCommandArea}.<br><br>
         * The parent of {@link OpenSeadragon.Drawer#canvas} instances. 
         * @member {Element} canvas
         * @memberof OpenSeadragon.Viewer#
         */
        canvas:         null,

        //TODO: not sure how to best describe these
        overlays:       [],
        overlayControls:[],

        //private state properties
        previousBody:   [],

        //This was originally initialized in the constructor and so could never
        //have anything in it.  now it can because we allow it to be specified
        //in the options and is only empty by default if not specified. Also
        //this array was returned from get_controls which I find confusing
        //since this object has a controls property which is treated in other
        //functions like clearControls.  I'm removing the accessors.
        customControls: [],

        //These are originally not part options but declared as members
        //in initialize.  It's still considered idiomatic to put them here
        source:         null,
        /**
         * Handles rendering of tiles in the viewer. Created for each TileSource opened.
         * @member {OpenSeadragon.Drawer} drawer
         * @memberof OpenSeadragon.Viewer#
         */
        drawer:         null,
        drawers:        [],
        /**
         * Handles coordinate-related functionality - zoom, pan, rotation, etc. Created for each TileSource opened.
         * @member {OpenSeadragon.Viewport} viewport
         * @memberof OpenSeadragon.Viewer#
         */
        viewport:       null,
        /**
         * @member {OpenSeadragon.Navigator} navigator
         * @memberof OpenSeadragon.Viewer#
         */
        navigator:      null,

        //A collection viewport is a separate viewport used to provide
        //simultaneous rendering of sets of tiles
        collectionViewport:     null,
        collectionDrawer:       null,

        //UI image resources
        //TODO: rename navImages to uiImages
        navImages:      null,

        //interface button controls
        buttons:        null,

        //TODO: this is defunct so safely remove it
        profiler:       null

    }, $.DEFAULT_SETTINGS, options );

    if ( typeof( this.hash) === "undefined" ) {
        throw new Error("A hash must be defined, either by specifying options.id or options.hash.");
    }
    if ( typeof( THIS[ this.hash ] ) !== "undefined" ) {
        // We don't want to throw an error here, as the user might have discarded
        // the previous viewer with the same hash and now want to recreate it.
        $.console.warn("Hash " + this.hash + " has already been used.");
    }

    //Private state properties
    THIS[ this.hash ] = {
        "fsBoundsDelta":     new $.Point( 1, 1 ),
        "prevContainerSize": null,
        "animating":         false,
        "forceRedraw":       false,
        "mouseInside":       false,
        "group":             null,
        // whether we should be continuously zooming
        "zooming":           false,
        // how much we should be continuously zooming by
        "zoomFactor":        null,
        "lastZoomTime":      null,
        // did we decide this viewer has a sequence of tile sources
        "sequenced":         false,
        "sequence":          0,
        "fullPage":          false,
        "onfullscreenchange": null
    };

    this._updateRequestId = null;

    //Inherit some behaviors and properties
    $.EventSource.call( this );

    this.addHandler( 'open-failed', function ( event ) {
        var msg = $.getString( "Errors.OpenFailed", event.eventSource, event.message);
        _this._showMessage( msg );
    });

    $.ControlDock.call( this, options );

    //Deal with tile sources
    var initialTileSource;

    if ( this.xmlPath  ){
        //Deprecated option.  Now it is preferred to use the tileSources option
        this.tileSources = [ this.xmlPath ];
    }

    if ( this.tileSources  ){
        // tileSources is a complex option...
        //
        // It can be a string, object, or an array of any of strings and objects.
        // At this point we only care about if it is an Array or not.
        //
        if( $.isArray( this.tileSources ) ){

            //must be a sequence of tileSource since the first item
            //is a legacy tile source
            if( this.tileSources.length > 1 ){
                THIS[ this.hash ].sequenced = true;
            }
            
            //Keeps the initial page within bounds
            if ( this.initialPage > this.tileSources.length - 1 ){
                this.initialPage = this.tileSources.length - 1;
            }
            
            initialTileSource = this.tileSources[ this.initialPage ];
            
            //Update the sequence (aka currrent page) property
            THIS[ this.hash ].sequence = this.initialPage;
        } else {
            initialTileSource = this.tileSources;
        }
    }

    this.element              = this.element || document.getElementById( this.id );
    this.canvas               = $.makeNeutralElement( "div" );
    this.keyboardCommandArea  = $.makeNeutralElement( "textarea" );

    this.canvas.className = "openseadragon-canvas";
    (function( style ){
        style.width    = "100%";
        style.height   = "100%";
        style.overflow = "hidden";
        style.position = "absolute";
        style.top      = "0px";
        style.left     = "0px";
    }(  this.canvas.style ));

    //the container is created through applying the ControlDock constructor above
    this.container.className = "openseadragon-container";
    (function( style ){
        style.width     = "100%";
        style.height    = "100%";
        style.position  = "relative";
        style.overflow  = "hidden";
        style.left      = "0px";
        style.top       = "0px";
        style.textAlign = "left";  // needed to protect against
    }( this.container.style ));

    this.keyboardCommandArea.className = "keyboard-command-area";
    (function( style ){
        style.width    = "100%";
        style.height   = "100%";
        style.overflow = "hidden";
        style.position = "absolute";
        style.top      = "0px";
        style.left     = "0px";
        style.resize   = "none";
    }(  this.keyboardCommandArea.style ));

    this.container.insertBefore( this.canvas, this.container.firstChild );
    this.container.insertBefore( this.keyboardCommandArea, this.container.firstChild );
    this.element.appendChild( this.container );

    //Used for toggling between fullscreen and default container size
    //TODO: these can be closure private and shared across Viewer
    //      instances.
    this.bodyWidth      = document.body.style.width;
    this.bodyHeight     = document.body.style.height;
    this.bodyOverflow   = document.body.style.overflow;
    this.docOverflow    = document.documentElement.style.overflow;

    this.keyboardCommandArea.innerTracker = new $.MouseTracker({
            _this : this,
            element:            this.keyboardCommandArea,
            focusHandler:       function( event ){
                if ( !event.preventDefaultAction ) {
                    var point    = $.getElementPosition( this.element );
                    window.scrollTo( 0, point.y );
                }
            },

            keyHandler:         function( event ){
                if ( !event.preventDefaultAction ) {
                    switch( event.keyCode ){
                        case 61://=|+
                            _this.viewport.zoomBy(1.1);
                            _this.viewport.applyConstraints();
                            return false;
                        case 45://-|_
                            _this.viewport.zoomBy(0.9);
                            _this.viewport.applyConstraints();
                            return false;
                        case 48://0|)
                            _this.viewport.goHome();
                            _this.viewport.applyConstraints();
                            return false;
                        case 119://w
                        case 87://W
                        case 38://up arrow
                            if ( event.shift ) {
                                _this.viewport.zoomBy(1.1);
                            } else {
                                _this.viewport.panBy(new $.Point(0, -0.05));
                            }
                            _this.viewport.applyConstraints();
                            return false;
                        case 115://s
                        case 83://S
                        case 40://down arrow
                            if ( event.shift ) {
                                _this.viewport.zoomBy(0.9);
                            } else {
                                _this.viewport.panBy(new $.Point(0, 0.05));
                            }
                            _this.viewport.applyConstraints();
                            return false;
                        case 97://a
                        case 37://left arrow
                            _this.viewport.panBy(new $.Point(-0.05, 0));
                            _this.viewport.applyConstraints();
                            return false;
                        case 100://d
                        case 39://right arrow
                            _this.viewport.panBy(new $.Point(0.05, 0));
                            _this.viewport.applyConstraints();
                            return false;
                        default:
                            //console.log( 'navigator keycode %s', event.keyCode );
                            return true;
                    }
                }
            }
        }).setTracking( true ); // default state


    this.innerTracker = new $.MouseTracker({
        element:            this.canvas,
        clickTimeThreshold: this.clickTimeThreshold,
        clickDistThreshold: this.clickDistThreshold,
        clickHandler:       $.delegate( this, onCanvasClick ),
        dragHandler:        $.delegate( this, onCanvasDrag ),
        releaseHandler:     $.delegate( this, onCanvasRelease ),
        scrollHandler:      $.delegate( this, onCanvasScroll )
    }).setTracking( this.mouseNavEnabled ? true : false ); // default state

    this.outerTracker = new $.MouseTracker({
        element:            this.container,
        clickTimeThreshold: this.clickTimeThreshold,
        clickDistThreshold: this.clickDistThreshold,
        enterHandler:       $.delegate( this, onContainerEnter ),
        exitHandler:        $.delegate( this, onContainerExit ),
        releaseHandler:     $.delegate( this, onContainerRelease )
    }).setTracking( this.mouseNavEnabled ? true : false ); // always tracking

    if( this.toolbar ){
        this.toolbar = new $.ControlDock({ element: this.toolbar });
    }

    this.bindStandardControls();
    this.bindSequenceControls();

    if ( initialTileSource ) {
        this.open( initialTileSource );

        if ( this.tileSources.length > 1 ) {
            this._updateSequenceButtons( this.initialPage );
        }
    }

    for ( i = 0; i < this.customControls.length; i++ ) {
        this.addControl(
            this.customControls[ i ].id,
            {anchor: this.customControls[ i ].anchor}
        );
    }

    $.requestAnimationFrame( function(){
        beginControlsAutoHide( _this );
    } );    // initial fade out

};

$.extend( $.Viewer.prototype, $.EventSource.prototype, $.ControlDock.prototype, /** @lends OpenSeadragon.Viewer.prototype */{


    /**
     * @function
     * @return {Boolean}
     */
    isOpen: function () {
        return !!this.source;
    },

    /**
     * A deprecated function, renamed to 'open' to match event name and
     * match current 'close' method.
     * @function
     * @param {String} dzi xml string or the url to a DZI xml document.
     * @return {OpenSeadragon.Viewer} Chainable.
     *
     * @deprecated - use {@link OpenSeadragon.Viewer#open} instead.
     */
    openDzi: function ( dzi ) {
        return this.open( dzi );
    },

    /**
     * A deprecated function, renamed to 'open' to match event name and
     * match current 'close' method.
     * @function
     * @param {String|Object|Function} See OpenSeadragon.Viewer.prototype.open
     * @return {OpenSeadragon.Viewer} Chainable.
     *
     * @deprecated - use {@link OpenSeadragon.Viewer#open} instead.
     */
    openTileSource: function ( tileSource ) {
        return this.open( tileSource );
    },

    /**
     * Open a TileSource object into the viewer.
     *
     * tileSources is a complex option...
     *
     * It can be a string, object, function, or an array of any of these:
     *
     * - A String implies a url used to determine the tileSource implementation
     *      based on the file extension of url. JSONP is implied by *.js,
     *      otherwise the url is retrieved as text and the resulting text is
     *      introspected to determine if its json, xml, or text and parsed.
     * - An Object implies an inline configuration which has a single
     *      property sufficient for being able to determine tileSource
     *      implementation. If the object has a property which is a function
     *      named 'getTileUrl', it is treated as a custom TileSource.
     * @function
     * @param {String|Object|Function}
     * @return {OpenSeadragon.Viewer} Chainable.
     * @fires OpenSeadragon.Viewer.event:open
     * @fires OpenSeadragon.Viewer.event:open-failed
     */
    open: function ( tileSource ) {
        var _this = this,
            customTileSource,
            readySource,
            $TileSource,
            options;

        _this._hideMessage();

        //allow plain xml strings or json strings to be parsed here
        if( $.type( tileSource ) == 'string' ){
            if( tileSource.match(/\s*<.*/) ){
                tileSource = $.parseXml( tileSource );
            }else if( tileSource.match(/\s*[\{\[].*/) ){
                /*jshint evil:true*/
                tileSource = eval( '('+tileSource+')' );
            }
        }

        setTimeout(function(){
            if ( $.type( tileSource ) == 'string') {
                //If its still a string it means it must be a url at this point
                tileSource = new $.TileSource( tileSource, function( event ){
                    openTileSource( _this, event.tileSource );
                });
                tileSource.addHandler( 'open-failed', function ( event ) {
                    /**
                     * Raised when an error occurs loading a TileSource.
                     *
                     * @event open-failed
                     * @memberof OpenSeadragon.Viewer
                     * @type {object}
                     * @property {OpenSeadragon.Viewer} eventSource - A reference to the Viewer which raised the event.
                     * @property {String} message
                     * @property {String} source
                     * @property {?Object} userData - Arbitrary subscriber-defined object.
                     */
                    _this.raiseEvent( 'open-failed', event );
                });

            } else if ( $.isPlainObject( tileSource ) || tileSource.nodeType ){
                if( $.isFunction( tileSource.getTileUrl ) ){
                    //Custom tile source
                    customTileSource = new $.TileSource(tileSource);
                    customTileSource.getTileUrl = tileSource.getTileUrl;
                    openTileSource( _this, customTileSource );
                } else {
                    //inline configuration
                    $TileSource = $.TileSource.determineType( _this, tileSource );
                    if ( !$TileSource ) {
                        /***
                         * Raised when an error occurs loading a TileSource.
                         *
                         * @event open-failed
                         * @memberof OpenSeadragon.Viewer
                         * @type {object}
                         * @property {OpenSeadragon.Viewer} eventSource - A reference to the Viewer which raised the event.
                         * @property {String} message
                         * @property {String} source
                         * @property {?Object} userData - Arbitrary subscriber-defined object.
                         */
                        _this.raiseEvent( 'open-failed', {
                            message: "Unable to load TileSource",
                            source: tileSource
                        });
                        return;
                    }
                    options = $TileSource.prototype.configure.apply( _this, [ tileSource ]);
                    readySource = new $TileSource( options );
                    openTileSource( _this, readySource );
                }
            } else {
                //can assume it's already a tile source implementation
                openTileSource( _this, tileSource );
            }
        }, 1);

        return this;
    },


    /**
     * @function
     * @return {OpenSeadragon.Viewer} Chainable.
     * @fires OpenSeadragon.Viewer.event:close
     */
    close: function ( ) {
        if ( this._updateRequestId !== null ) {
            $.cancelAnimationFrame( this._updateRequestId );
            this._updateRequestId = null;
        }

        if ( this.navigator ) {
            this.navigator.close();
        }

        if ( this.drawer ) {
            this.drawer.clearOverlays();
        }

        this.source     = null;
        this.drawer     = null;

        this.viewport   = this.preserveViewport ? this.viewport : null;
        //this.profiler   = null;
        if (this.canvas){
            this.canvas.innerHTML = "";
        }

        VIEWERS[ this.hash ] = null;
        delete VIEWERS[ this.hash ];

        /**
         * Raised when the viewer is closed (see {@link OpenSeadragon.Viewer#close}).
         *
         * @event close
         * @memberof OpenSeadragon.Viewer
         * @type {object}
         * @property {OpenSeadragon.Viewer} eventSource - A reference to the Viewer which raised the event.
         * @property {?Object} userData - Arbitrary subscriber-defined object.
         */
        this.raiseEvent( 'close' );

        return this;
    },


    /**
     * Function to destroy the viewer and clean up everything created by
     * OpenSeadragon.
     * @function
     */
    destroy: function( ) {
        this.close();

        this.removeAllHandlers();

        // Go through top element (passed to us) and remove all children
        // Use removeChild to make sure it handles SVG or any non-html
        // also it performs better - http://jsperf.com/innerhtml-vs-removechild/15
        if (this.element){
            while (this.element.firstChild) {
                this.element.removeChild(this.element.firstChild);
            }
        }

        // destroy the mouse trackers
        if (this.keyboardCommandArea){
            this.keyboardCommandArea.innerTracker.destroy();
        }
        if (this.innerTracker){
            this.innerTracker.destroy();
        }
        if (this.outerTracker){
            this.outerTracker.destroy();
        }

        // clear all our references to dom objects
        this.canvas = null;
        this.keyboardCommandArea = null;
        this.container = null;

        // clear our reference to the main element - they will need to pass it in again, creating a new viewer
        this.element = null;
    },


    /**
     * @function
     * @return {Boolean}
     */
    isMouseNavEnabled: function () {
        return this.innerTracker.isTracking();
    },

    /**
     * @function
     * @param {Boolean} enabled - true to enable, false to disable
     * @return {OpenSeadragon.Viewer} Chainable.
     * @fires OpenSeadragon.Viewer.event:mouse-enabled
     */
    setMouseNavEnabled: function( enabled ){
        this.innerTracker.setTracking( enabled );
        /**
         * Raised when mouse/touch navigation is enabled or disabled (see {@link OpenSeadragon.Viewer#setMouseNavEnabled}).
         *
         * @event mouse-enabled
         * @memberof OpenSeadragon.Viewer
         * @type {object}
         * @property {OpenSeadragon.Viewer} eventSource - A reference to the Viewer which raised the event.
         * @property {Boolean} enabled
         * @property {?Object} userData - Arbitrary subscriber-defined object.
         */
        this.raiseEvent( 'mouse-enabled', { enabled: enabled } );
        return this;
    },


    /**
     * @function
     * @return {Boolean}
     */
    areControlsEnabled: function () {
        var enabled = this.controls.length,
            i;
        for( i = 0; i < this.controls.length; i++ ){
            enabled = enabled && this.controls[ i ].isVisibile();
        }
        return enabled;
    },


    /**
     * Shows or hides the controls (e.g. the default navigation buttons).
     *
     * @function
     * @param {Boolean} true to show, false to hide.
     * @return {OpenSeadragon.Viewer} Chainable.
     * @fires OpenSeadragon.Viewer.event:controls-enabled
     */
    setControlsEnabled: function( enabled ) {
        if( enabled ){
            abortControlsAutoHide( this );
        } else {
            beginControlsAutoHide( this );
        }
        /**
         * Raised when the navigation controls are shown or hidden (see {@link OpenSeadragon.Viewer#setControlsEnabled}).
         *
         * @event controls-enabled
         * @memberof OpenSeadragon.Viewer
         * @type {object}
         * @property {OpenSeadragon.Viewer} eventSource - A reference to the Viewer which raised the event.
         * @property {Boolean} enabled
         * @property {?Object} userData - Arbitrary subscriber-defined object.
         */
        this.raiseEvent( 'controls-enabled', { enabled: enabled } );
        return this;
    },


    /**
     * @function
     * @return {Boolean}
     */
    isFullPage: function () {
        return THIS[ this.hash ].fullPage;
    },


    /**
     * Toggle full page mode.
     * @function
     * @param {Boolean} fullPage
     *      If true, enter full page mode.  If false, exit full page mode.
     * @return {OpenSeadragon.Viewer} Chainable.
     * @fires OpenSeadragon.Viewer.event:pre-full-page
     * @fires OpenSeadragon.Viewer.event:full-page
     */
    setFullPage: function( fullPage ) {

        var body = document.body,
            bodyStyle = body.style,
            docStyle = document.documentElement.style,
            _this = this,
            hash,
            nodes,
            i;

        //dont bother modifying the DOM if we are already in full page mode.
        if ( fullPage == this.isFullPage() ) {
            return this;
        }

        var fullPageEventArgs = {
            fullPage: fullPage,
            preventDefaultAction: false
        };
        /**
         * Raised when the viewer is about to change to/from full-page mode (see {@link OpenSeadragon.Viewer#setFullPage}).
         *
         * @event pre-full-page
         * @memberof OpenSeadragon.Viewer
         * @type {object}
         * @property {OpenSeadragon.Viewer} eventSource - A reference to the Viewer which raised the event.
         * @property {Boolean} fullPage - True if entering full-page mode, false if exiting full-page mode.
         * @property {Boolean} preventDefaultAction - Set to true to prevent full-page mode change. Default: false.
         * @property {?Object} userData - Arbitrary subscriber-defined object.
         */
        this.raiseEvent( 'pre-full-page', fullPageEventArgs );
        if ( fullPageEventArgs.preventDefaultAction ) {
            return this;
        }

        if ( fullPage ) {

            this.elementSize = $.getElementSize( this.element );
            this.pageScroll = $.getPageScroll();

            this.elementMargin = this.element.style.margin;
            this.element.style.margin = "0";
            this.elementPadding = this.element.style.padding;
            this.element.style.padding = "0";

            this.bodyMargin = bodyStyle.margin;
            this.docMargin = docStyle.margin;
            bodyStyle.margin = "0";
            docStyle.margin = "0";

            this.bodyPadding = bodyStyle.padding;
            this.docPadding = docStyle.padding;
            bodyStyle.padding = "0";
            docStyle.padding = "0";

            this.bodyWidth = bodyStyle.width;
            this.bodyHeight = bodyStyle.height;
            bodyStyle.width = "100%";
            bodyStyle.height = "100%";

            //when entering full screen on the ipad it wasnt sufficient to leave
            //the body intact as only only the top half of the screen would
            //respond to touch events on the canvas, while the bottom half treated
            //them as touch events on the document body.  Thus we remove and store
            //the bodies elements and replace them when we leave full screen.
            this.previousBody = [];
            THIS[ this.hash ].prevElementParent = this.element.parentNode;
            THIS[ this.hash ].prevNextSibling = this.element.nextSibling;
            THIS[ this.hash ].prevElementWidth = this.element.style.width;
            THIS[ this.hash ].prevElementHeight = this.element.style.height;
            nodes = body.childNodes.length;
            for ( i = 0; i < nodes; i++ ) {
                this.previousBody.push( body.childNodes[ 0 ] );
                body.removeChild( body.childNodes[ 0 ] );
            }

            //If we've got a toolbar, we need to enable the user to use css to
            //preserve it in fullpage mode
            if ( this.toolbar && this.toolbar.element ) {
                //save a reference to the parent so we can put it back
                //in the long run we need a better strategy
                this.toolbar.parentNode = this.toolbar.element.parentNode;
                this.toolbar.nextSibling = this.toolbar.element.nextSibling;
                body.appendChild( this.toolbar.element );

                //Make sure the user has some ability to style the toolbar based
                //on the mode
                $.addClass( this.toolbar.element, 'fullpage' );
            }

            $.addClass( this.element, 'fullpage' );
            body.appendChild( this.element );

            this.element.style.height = $.getWindowSize().y + 'px';
            this.element.style.width = $.getWindowSize().x + 'px';

            if ( this.toolbar && this.toolbar.element ) {
                this.element.style.height = (
                    $.getElementSize( this.element ).y - $.getElementSize( this.toolbar.element ).y
                ) + 'px';
            }

            THIS[ this.hash ].fullPage = true;

            // mouse will be inside container now
            $.delegate( this, onContainerEnter )( {} );

        } else {

            this.element.style.margin = this.elementMargin;
            this.element.style.padding = this.elementPadding;

            bodyStyle.margin = this.bodyMargin;
            docStyle.margin = this.docMargin;

            bodyStyle.padding = this.bodyPadding;
            docStyle.padding = this.docPadding;

            bodyStyle.width = this.bodyWidth;
            bodyStyle.height = this.bodyHeight;

            body.removeChild( this.element );
            nodes = this.previousBody.length;
            for ( i = 0; i < nodes; i++ ) {
                body.appendChild( this.previousBody.shift() );
            }

            $.removeClass( this.element, 'fullpage' );
            THIS[ this.hash ].prevElementParent.insertBefore(
                this.element,
                THIS[ this.hash ].prevNextSibling
            );

            //If we've got a toolbar, we need to enable the user to use css to
            //reset it to its original state
            if ( this.toolbar && this.toolbar.element ) {
                body.removeChild( this.toolbar.element );

                //Make sure the user has some ability to style the toolbar based
                //on the mode
                $.removeClass( this.toolbar.element, 'fullpage' );

                this.toolbar.parentNode.insertBefore(
                    this.toolbar.element,
                    this.toolbar.nextSibling
                );
                delete this.toolbar.parentNode;
                delete this.toolbar.nextSibling;
            }

            this.element.style.width = THIS[ this.hash ].prevElementWidth;
            this.element.style.height = THIS[ this.hash ].prevElementHeight;

            // After exiting fullPage or fullScreen, it can take some time
            // before the browser can actually set the scroll.
            var restoreScrollCounter = 0;
            var restoreScroll = function() {
                $.setPageScroll( _this.pageScroll );
                var pageScroll = $.getPageScroll();
                restoreScrollCounter++;
                if ( restoreScrollCounter < 10 &&
                    pageScroll.x !== _this.pageScroll.x ||
                    pageScroll.y !== _this.pageScroll.y ) {
                    $.requestAnimationFrame( restoreScroll );
                }
            };
            $.requestAnimationFrame( restoreScroll );

            THIS[ this.hash ].fullPage = false;

            // mouse will likely be outside now
            $.delegate( this, onContainerExit )( { } );

        }

        /**
         * Raised when the viewer has changed to/from full-page mode (see {@link OpenSeadragon.Viewer#setFullPage}).
         *
         * @event full-page
         * @memberof OpenSeadragon.Viewer
         * @type {object}
         * @property {OpenSeadragon.Viewer} eventSource - A reference to the Viewer which raised the event.
         * @property {Boolean} fullPage - True if changed to full-page mode, false if exited full-page mode.
         * @property {?Object} userData - Arbitrary subscriber-defined object.
         */
        this.raiseEvent( 'full-page', { fullPage: fullPage } );

        return this;
    },

    /**
     * Toggle full screen mode if supported. Toggle full page mode otherwise.
     * @function
     * @param {Boolean} fullScreen
     *      If true, enter full screen mode.  If false, exit full screen mode.
     * @return {OpenSeadragon.Viewer} Chainable.
     * @fires OpenSeadragon.Viewer.event:pre-full-screen
     * @fires OpenSeadragon.Viewer.event:full-screen
     */
    setFullScreen: function( fullScreen ) {
        var _this = this;

        if ( !$.supportsFullScreen ) {
            return this.setFullPage( fullScreen );
        }

        if ( $.isFullScreen() === fullScreen ) {
            return this;
        }

        var fullScreeEventArgs = {
            fullScreen: fullScreen,
            preventDefaultAction: false
        };
        /**
         * Raised when the viewer is about to change to/from full-screen mode (see {@link OpenSeadragon.Viewer#setFullScreen}).
         *
         * @event pre-full-screen
         * @memberof OpenSeadragon.Viewer
         * @type {object}
         * @property {OpenSeadragon.Viewer} eventSource - A reference to the Viewer which raised the event.
         * @property {Boolean} fullScreen - True if entering full-screen mode, false if exiting full-screen mode.
         * @property {Boolean} preventDefaultAction - Set to true to prevent full-screen mode change. Default: false.
         * @property {?Object} userData - Arbitrary subscriber-defined object.
         */
        this.raiseEvent( 'pre-full-screen', fullScreeEventArgs );
        if ( fullScreeEventArgs.preventDefaultAction ) {
            return this;
        }

        if ( fullScreen ) {

            this.setFullPage( true );
            // If the full page mode is not actually entered, we need to prevent
            // the full screen mode.
            if ( !this.isFullPage() ) {
                return this;
            }

            this.fullPageStyleWidth = this.element.style.width;
            this.fullPageStyleHeight = this.element.style.height;
            this.element.style.width = '100%';
            this.element.style.height = '100%';

            var onFullScreenChange = function() {
                var isFullScreen = $.isFullScreen();
                if ( !isFullScreen ) {
                    $.removeEvent( document, $.fullScreenEventName, onFullScreenChange );
                    $.removeEvent( document, $.fullScreenErrorEventName, onFullScreenChange );

                    _this.setFullPage( false );
                    if ( _this.isFullPage() ) {
                        _this.element.style.width = _this.fullPageStyleWidth;
                        _this.element.style.height = _this.fullPageStyleHeight;
                    }
                }
                /**
                 * Raised when the viewer has changed to/from full-screen mode (see {@link OpenSeadragon.Viewer#setFullScreen}).
                 *
                 * @event full-screen
                 * @memberof OpenSeadragon.Viewer
                 * @type {object}
                 * @property {OpenSeadragon.Viewer} eventSource - A reference to the Viewer which raised the event.
                 * @property {Boolean} fullScreen - True if changed to full-screen mode, false if exited full-screen mode.
                 * @property {?Object} userData - Arbitrary subscriber-defined object.
                 */
                _this.raiseEvent( 'full-screen', { fullScreen: isFullScreen } );
            };
            $.addEvent( document, $.fullScreenEventName, onFullScreenChange );
            $.addEvent( document, $.fullScreenErrorEventName, onFullScreenChange );

            $.requestFullScreen( document.body );

        } else {
            $.cancelFullScreen();
        }
        return this;
    },

    /**
     * @function
     * @return {Boolean}
     */
    isVisible: function () {
        return this.container.style.visibility != "hidden";
    },


    /**
     * @function
     * @param {Boolean} visible
     * @return {OpenSeadragon.Viewer} Chainable.
     * @fires OpenSeadragon.Viewer.event:visible
     */
    setVisible: function( visible ){
        this.container.style.visibility = visible ? "" : "hidden";
        /**
         * Raised when the viewer is shown or hidden (see {@link OpenSeadragon.Viewer#setVisible}).
         *
         * @event visible
         * @memberof OpenSeadragon.Viewer
         * @type {object}
         * @property {OpenSeadragon.Viewer} eventSource - A reference to the Viewer which raised the event.
         * @property {Boolean} visible
         * @property {?Object} userData - Arbitrary subscriber-defined object.
         */
        this.raiseEvent( 'visible', { visible: visible } );
        return this;
    },


    /**
     * @function
     * @return {OpenSeadragon.Viewer} Chainable.
     */
    bindSequenceControls: function(){

        //////////////////////////////////////////////////////////////////////////
        // Image Sequence Controls
        //////////////////////////////////////////////////////////////////////////
        var onFocusHandler          = $.delegate( this, onFocus ),
            onBlurHandler           = $.delegate( this, onBlur ),
            onNextHandler           = $.delegate( this, onNext ),
            onPreviousHandler       = $.delegate( this, onPrevious ),
            navImages               = this.navImages,
            useGroup                = true ;

        if( this.showSequenceControl && THIS[ this.hash ].sequenced ){

            if( this.previousButton || this.nextButton ){
                //if we are binding to custom buttons then layout and
                //grouping is the responsibility of the page author
                useGroup = false;
            }

            this.previousButton = new $.Button({
                element:    this.previousButton ? $.getElement( this.previousButton ) : null,
                clickTimeThreshold: this.clickTimeThreshold,
                clickDistThreshold: this.clickDistThreshold,
                tooltip:    $.getString( "Tooltips.PreviousPage" ),
                srcRest:    resolveUrl( this.prefixUrl, navImages.previous.REST ),
                srcGroup:   resolveUrl( this.prefixUrl, navImages.previous.GROUP ),
                srcHover:   resolveUrl( this.prefixUrl, navImages.previous.HOVER ),
                srcDown:    resolveUrl( this.prefixUrl, navImages.previous.DOWN ),
                onRelease:  onPreviousHandler,
                onFocus:    onFocusHandler,
                onBlur:     onBlurHandler
            });

            this.nextButton = new $.Button({
                element:    this.nextButton ? $.getElement( this.nextButton ) : null,
                clickTimeThreshold: this.clickTimeThreshold,
                clickDistThreshold: this.clickDistThreshold,
                tooltip:    $.getString( "Tooltips.NextPage" ),
                srcRest:    resolveUrl( this.prefixUrl, navImages.next.REST ),
                srcGroup:   resolveUrl( this.prefixUrl, navImages.next.GROUP ),
                srcHover:   resolveUrl( this.prefixUrl, navImages.next.HOVER ),
                srcDown:    resolveUrl( this.prefixUrl, navImages.next.DOWN ),
                onRelease:  onNextHandler,
                onFocus:    onFocusHandler,
                onBlur:     onBlurHandler
            });

            if( !this.navPrevNextWrap ){
                this.previousButton.disable();
            }

            if( useGroup ){
                this.paging = new $.ButtonGroup({
                    buttons: [
                        this.previousButton,
                        this.nextButton
                    ],
                    clickTimeThreshold: this.clickTimeThreshold,
                    clickDistThreshold: this.clickDistThreshold
                });

                this.pagingControl = this.paging.element;

                if( this.toolbar ){
                    this.toolbar.addControl(
                        this.pagingControl,
                        {anchor: $.ControlAnchor.BOTTOM_RIGHT}
                    );
                }else{
                    this.addControl(
                        this.pagingControl,
                        {anchor: $.ControlAnchor.TOP_LEFT}
                    );
                }
            }
        }
        return this;
    },


    /**
     * @function
     * @return {OpenSeadragon.Viewer} Chainable.
     */
    bindStandardControls: function(){
        //////////////////////////////////////////////////////////////////////////
        // Navigation Controls
        //////////////////////////////////////////////////////////////////////////
        var beginZoomingInHandler   = $.delegate( this, beginZoomingIn ),
            endZoomingHandler       = $.delegate( this, endZooming ),
            doSingleZoomInHandler   = $.delegate( this, doSingleZoomIn ),
            beginZoomingOutHandler  = $.delegate( this, beginZoomingOut ),
            doSingleZoomOutHandler  = $.delegate( this, doSingleZoomOut ),
            onHomeHandler           = $.delegate( this, onHome ),
            onFullScreenHandler     = $.delegate( this, onFullScreen ),
            onFocusHandler          = $.delegate( this, onFocus ),
            onBlurHandler           = $.delegate( this, onBlur ),
            navImages               = this.navImages,
            buttons                 = [],
            useGroup                = true ;


        if( this.showNavigationControl ){

            if( this.zoomInButton || this.zoomOutButton || this.homeButton || this.fullPageButton ){
                //if we are binding to custom buttons then layout and
                //grouping is the responsibility of the page author
                useGroup = false;
            }

            buttons.push( this.zoomInButton = new $.Button({
                element:    this.zoomInButton ? $.getElement( this.zoomInButton ) : null,
                clickTimeThreshold: this.clickTimeThreshold,
                clickDistThreshold: this.clickDistThreshold,
                tooltip:    $.getString( "Tooltips.ZoomIn" ),
                srcRest:    resolveUrl( this.prefixUrl, navImages.zoomIn.REST ),
                srcGroup:   resolveUrl( this.prefixUrl, navImages.zoomIn.GROUP ),
                srcHover:   resolveUrl( this.prefixUrl, navImages.zoomIn.HOVER ),
                srcDown:    resolveUrl( this.prefixUrl, navImages.zoomIn.DOWN ),
                onPress:    beginZoomingInHandler,
                onRelease:  endZoomingHandler,
                onClick:    doSingleZoomInHandler,
                onEnter:    beginZoomingInHandler,
                onExit:     endZoomingHandler,
                onFocus:    onFocusHandler,
                onBlur:     onBlurHandler
            }));

            buttons.push( this.zoomOutButton = new $.Button({
                element:    this.zoomOutButton ? $.getElement( this.zoomOutButton ) : null,
                clickTimeThreshold: this.clickTimeThreshold,
                clickDistThreshold: this.clickDistThreshold,
                tooltip:    $.getString( "Tooltips.ZoomOut" ),
                srcRest:    resolveUrl( this.prefixUrl, navImages.zoomOut.REST ),
                srcGroup:   resolveUrl( this.prefixUrl, navImages.zoomOut.GROUP ),
                srcHover:   resolveUrl( this.prefixUrl, navImages.zoomOut.HOVER ),
                srcDown:    resolveUrl( this.prefixUrl, navImages.zoomOut.DOWN ),
                onPress:    beginZoomingOutHandler,
                onRelease:  endZoomingHandler,
                onClick:    doSingleZoomOutHandler,
                onEnter:    beginZoomingOutHandler,
                onExit:     endZoomingHandler,
                onFocus:    onFocusHandler,
                onBlur:     onBlurHandler
            }));

            buttons.push( this.homeButton = new $.Button({
                element:    this.homeButton ? $.getElement( this.homeButton ) : null,
                clickTimeThreshold: this.clickTimeThreshold,
                clickDistThreshold: this.clickDistThreshold,
                tooltip:    $.getString( "Tooltips.Home" ),
                srcRest:    resolveUrl( this.prefixUrl, navImages.home.REST ),
                srcGroup:   resolveUrl( this.prefixUrl, navImages.home.GROUP ),
                srcHover:   resolveUrl( this.prefixUrl, navImages.home.HOVER ),
                srcDown:    resolveUrl( this.prefixUrl, navImages.home.DOWN ),
                onRelease:  onHomeHandler,
                onFocus:    onFocusHandler,
                onBlur:     onBlurHandler
            }));

            buttons.push( this.fullPageButton = new $.Button({
                element:    this.fullPageButton ? $.getElement( this.fullPageButton ) : null,
                clickTimeThreshold: this.clickTimeThreshold,
                clickDistThreshold: this.clickDistThreshold,
                tooltip:    $.getString( "Tooltips.FullPage" ),
                srcRest:    resolveUrl( this.prefixUrl, navImages.fullpage.REST ),
                srcGroup:   resolveUrl( this.prefixUrl, navImages.fullpage.GROUP ),
                srcHover:   resolveUrl( this.prefixUrl, navImages.fullpage.HOVER ),
                srcDown:    resolveUrl( this.prefixUrl, navImages.fullpage.DOWN ),
                onRelease:  onFullScreenHandler,
                onFocus:    onFocusHandler,
                onBlur:     onBlurHandler
            }));

            if( useGroup ){
                this.buttons = new $.ButtonGroup({
                    buttons:            buttons,
                    clickTimeThreshold: this.clickTimeThreshold,
                    clickDistThreshold: this.clickDistThreshold
                });

                this.navControl  = this.buttons.element;
                this.addHandler( 'open', $.delegate( this, lightUp ) );

                if( this.toolbar ){
                    this.toolbar.addControl(
                        this.navControl,
                        {anchor: $.ControlAnchor.TOP_LEFT}
                    );
                }else{
                    this.addControl(
                        this.navControl,
                        {anchor: $.ControlAnchor.TOP_LEFT}
                    );
                }
            }

        }
        return this;
    },
    
    /**
     * Gets the active page of a sequence
     * @function
     * @return {Number}
     */
    currentPage: function () {
        return THIS[ this.hash ].sequence;
      },

    /**
     * @function
     * @return {OpenSeadragon.Viewer} Chainable.
     * @fires OpenSeadragon.Viewer.event:page
     */
    goToPage: function( page ){
        if( page >= 0 && page < this.tileSources.length ){
            /**
             * Raised when the page is changed on a viewer configured with multiple image sources (see {@link OpenSeadragon.Viewer#goToPage}).
             *
             * @event page
             * @memberof OpenSeadragon.Viewer
             * @type {Object}
             * @property {OpenSeadragon.Viewer} eventSource - A reference to the Viewer which raised the event.
             * @property {Number} page - The page index.
             * @property {?Object} userData - Arbitrary subscriber-defined object.
             */
            this.raiseEvent( 'page', { page: page } );

            THIS[ this.hash ].sequence = page;

            this._updateSequenceButtons( page );

            this.open( this.tileSources[ page ] );

            if( this.referenceStrip ){
                this.referenceStrip.setFocus( page );
            }
        }

        return this;
    },

    /**
     * Updates the sequence buttons.
     * @function OpenSeadragon.Viewer.prototype._updateSequenceButtons
     * @private
     * @param {Number} Sequence Value
     */
    _updateSequenceButtons: function (page) {

            if( this.nextButton ){
                if( ( this.tileSources.length - 1 ) === page  ){
                    //Disable next button
                    if(!this.navPrevNextWrap){
                        this.nextButton.disable();
                    }
                } else {
                    this.nextButton.enable();
                }
            }
            if( this.previousButton ){
                if( page > 0 ){
                    //Enable previous button
                    this.previousButton.enable();
                } else {
                    if(!this.navPrevNextWrap){
                        this.previousButton.disable();
                    }
                }
            }
      },
      
    /**
     * Display a message in the viewport
     * @function OpenSeadragon.Viewer.prototype._showMessage
     * @private
     * @param {String} text message
     */
    _showMessage: function ( message ) {
        this._hideMessage();

        var div = $.makeNeutralElement( "div" );
        div.appendChild( document.createTextNode( message ) );

        this.messageDiv = $.makeCenteredNode( div );

        $.addClass(this.messageDiv, "openseadragon-message");

        this.container.appendChild( this.messageDiv );
    },

    /**
     * Hide any currently displayed viewport message
     * @function OpenSeadragon.Viewer.prototype._hideMessage
     * @private
     */
    _hideMessage: function () {
        var div = this.messageDiv;
        if (div) {
            div.parentNode.removeChild(div);
            delete this.messageDiv;
        }
    }
});


/**
 * _getSafeElemSize is like getElementSize(), but refuses to return 0 for x or y,
 * which was causing some calling operations in updateOnce and openTileSource to
 * return NaN.
 * @returns {Point}
 * @private
 */
function _getSafeElemSize (oElement) {
    oElement = $.getElement( oElement );

    return new $.Point(
        (oElement.clientWidth === 0 ? 1 : oElement.clientWidth),
        (oElement.clientHeight === 0 ? 1 : oElement.clientHeight)
    );
}

/**
 * @function
 * @private
 */
function openTileSource( viewer, source ) {
    var _this = viewer,
        overlay,
        i;

    if ( _this.source ) {
        _this.close( );
    }

    _this.canvas.innerHTML = "";
    THIS[ _this.hash ].prevContainerSize = _getSafeElemSize( _this.container );


    if( _this.collectionMode ){
        _this.source = new $.TileSourceCollection({
            rows: _this.collectionRows,
            layout: _this.collectionLayout,
            tileSize: _this.collectionTileSize,
            tileSources: _this.tileSources,
            tileMargin: _this.collectionTileMargin
        });
        _this.viewport = _this.viewport ? _this.viewport : new $.Viewport({
            collectionMode:         true,
            collectionTileSource:   _this.source,
            containerSize:          THIS[ _this.hash ].prevContainerSize,
            contentSize:            _this.source.dimensions,
            springStiffness:        _this.springStiffness,
            animationTime:          _this.animationTime,
            showNavigator:          false,
            minZoomImageRatio:      1,
            maxZoomPixelRatio:      1,
            viewer:                 _this //,
            //TODO: figure out how to support these in a way that makes sense
            //minZoomLevel:           this.minZoomLevel,
            //maxZoomLevel:           this.maxZoomLevel
        });
    }else{
        if( source ){
            _this.source = source;
        }
        _this.viewport = _this.viewport ? _this.viewport : new $.Viewport({
            containerSize:      THIS[ _this.hash ].prevContainerSize,
            contentSize:        _this.source.dimensions,
            springStiffness:    _this.springStiffness,
            animationTime:      _this.animationTime,
            minZoomImageRatio:  _this.minZoomImageRatio,
            maxZoomPixelRatio:  _this.maxZoomPixelRatio,
            visibilityRatio:    _this.visibilityRatio,
            wrapHorizontal:     _this.wrapHorizontal,
            wrapVertical:       _this.wrapVertical,
            defaultZoomLevel:   _this.defaultZoomLevel,
            minZoomLevel:       _this.minZoomLevel,
            maxZoomLevel:       _this.maxZoomLevel,
            viewer:             _this
        });
    }

    if( _this.preserveViewport ){
        _this.viewport.resetContentSize( _this.source.dimensions );
    }

    _this.source.overlays = _this.source.overlays || [];

    _this.drawer = new $.Drawer({
        viewer:             _this,
        source:             _this.source,
        viewport:           _this.viewport,
        element:            _this.canvas,
        overlays:           [].concat( _this.overlays ).concat( _this.source.overlays ),
        maxImageCacheCount: _this.maxImageCacheCount,
        imageLoaderLimit:   _this.imageLoaderLimit,
        minZoomImageRatio:  _this.minZoomImageRatio,
        wrapHorizontal:     _this.wrapHorizontal,
        wrapVertical:       _this.wrapVertical,
        immediateRender:    _this.immediateRender,
        blendTime:          _this.blendTime,
        alwaysBlend:        _this.alwaysBlend,
        minPixelRatio:      _this.collectionMode ? 0 : _this.minPixelRatio,
        timeout:            _this.timeout,
        debugMode:          _this.debugMode,
        debugGridColor:     _this.debugGridColor
    });

    //Instantiate a navigator if configured
    if ( _this.showNavigator  && !_this.collectionMode ){
        // Note: By passing the fully parsed source, the navigator doesn't
        // have to load it again.
        if ( _this.navigator ) {
            _this.navigator.open( source );
        } else {
            _this.navigator = new $.Navigator({
                id:          _this.navigatorId,
                position:    _this.navigatorPosition,
                sizeRatio:   _this.navigatorSizeRatio,
                height:      _this.navigatorHeight,
                width:       _this.navigatorWidth,
                tileSources: source,
                tileHost:    _this.tileHost,
                prefixUrl:   _this.prefixUrl,
                overlays:    _this.overlays,
                viewer:      _this
            });
        }
    }

    //Instantiate a referencestrip if configured
    if ( _this.showReferenceStrip  && !_this.referenceStrip ){
        _this.referenceStrip = new $.ReferenceStrip({
            id:          _this.referenceStripElement,
            position:    _this.referenceStripPosition,
            sizeRatio:   _this.referenceStripSizeRatio,
            scroll:      _this.referenceStripScroll,
            height:      _this.referenceStripHeight,
            width:       _this.referenceStripWidth,
            tileSources: _this.tileSources,
            tileHost:    _this.tileHost,
            prefixUrl:   _this.prefixUrl,
            overlays:    _this.overlays,
            viewer:      _this
        });
    }

    //this.profiler = new $.Profiler();

    THIS[ _this.hash ].animating = false;
    THIS[ _this.hash ].forceRedraw = true;
    _this._updateRequestId = scheduleUpdate( _this, updateMulti );

    //Assuming you had programatically created a bunch of overlays
    //and added them via configuration
    for ( i = 0; i < _this.overlayControls.length; i++ ) {

        overlay = _this.overlayControls[ i ];

        if ( overlay.point ) {

            _this.drawer.addOverlay(
                overlay.id,
                new $.Point(
                    overlay.point.X,
                    overlay.point.Y
                ),
                $.OverlayPlacement.TOP_LEFT
            );

        } else {

            _this.drawer.addOverlay(
                overlay.id,
                new $.Rect(
                    overlay.rect.Point.X,
                    overlay.rect.Point.Y,
                    overlay.rect.Width,
                    overlay.rect.Height
                ),
                overlay.placement
            );

        }
    }
    VIEWERS[ _this.hash ] = _this;

    /**
     * Raised when the viewer has opened and loaded one or more TileSources.
     *
     * @event open
     * @memberof OpenSeadragon.Viewer
     * @type {object}
     * @property {OpenSeadragon.Viewer} eventSource - A reference to the Viewer which raised the event.
     * @property {OpenSeadragon.TileSource} source
     * @property {?Object} userData - Arbitrary subscriber-defined object.
     */
    _this.raiseEvent( 'open', { source: source } );

    return _this;
}




///////////////////////////////////////////////////////////////////////////////
// Schedulers provide the general engine for animation
///////////////////////////////////////////////////////////////////////////////
function scheduleUpdate( viewer, updateFunc ){
    return $.requestAnimationFrame( function(){
        updateFunc( viewer );
    } );
}


//provides a sequence in the fade animation
function scheduleControlsFade( viewer ) {
    $.requestAnimationFrame( function(){
        updateControlsFade( viewer );
    });
}


//initiates an animation to hide the controls
function beginControlsAutoHide( viewer ) {
    if ( !viewer.autoHideControls ) {
        return;
    }
    viewer.controlsShouldFade = true;
    viewer.controlsFadeBeginTime =
        $.now() +
        viewer.controlsFadeDelay;

    window.setTimeout( function(){
        scheduleControlsFade( viewer );
    }, viewer.controlsFadeDelay );
}


//determines if fade animation is done or continues the animation
function updateControlsFade( viewer ) {
    var currentTime,
        deltaTime,
        opacity,
        i;
    if ( viewer.controlsShouldFade ) {
        currentTime = $.now();
        deltaTime = currentTime - viewer.controlsFadeBeginTime;
        opacity = 1.0 - deltaTime / viewer.controlsFadeLength;

        opacity = Math.min( 1.0, opacity );
        opacity = Math.max( 0.0, opacity );

        for ( i = viewer.controls.length - 1; i >= 0; i--) {
            if (viewer.controls[ i ].autoFade) {
                viewer.controls[ i ].setOpacity( opacity );
            }
        }

        if ( opacity > 0 ) {
            // fade again
            scheduleControlsFade( viewer );
        }
    }
}


//stop the fade animation on the controls and show them
function abortControlsAutoHide( viewer ) {
    var i;
    viewer.controlsShouldFade = false;
    for ( i = viewer.controls.length - 1; i >= 0; i-- ) {
        viewer.controls[ i ].setOpacity( 1.0 );
    }
}



///////////////////////////////////////////////////////////////////////////////
// Default view event handlers.
///////////////////////////////////////////////////////////////////////////////
function onFocus(){
    abortControlsAutoHide( this );
}

function onBlur(){
    beginControlsAutoHide( this );

}

function onCanvasClick( event ) {
    var zoomPerClick,
        factor;
    if ( !event.preventDefaultAction && this.viewport && event.quick ) {    // ignore clicks where mouse moved
        zoomPerClick = this.zoomPerClick;
        factor = event.shift ? 1.0 / zoomPerClick : zoomPerClick;
        this.viewport.zoomBy(
            factor,
            this.viewport.pointFromPixel( event.position, true )
        );
        this.viewport.applyConstraints();
    }
    /**
     * Raised when a mouse press/release or touch/remove occurs on the {@link OpenSeadragon.Viewer#canvas} element.
     *
     * @event canvas-click
     * @memberof OpenSeadragon.Viewer
     * @type {object}
     * @property {OpenSeadragon.Viewer} eventSource - A reference to the Viewer which raised this event.
     * @property {OpenSeadragon.MouseTracker} tracker - A reference to the MouseTracker which originated this event.
     * @property {OpenSeadragon.Point} position - The position of the event relative to the tracked element.
     * @property {Boolean} quick - True only if the clickDistThreshold and clickDeltaThreshold are both passed. Useful for differentiating between clicks and drags.
     * @property {Boolean} shift - True if the shift key was pressed during this event.
     * @property {Object} originalEvent - The original DOM event.
     * @property {?Object} userData - Arbitrary subscriber-defined object.
     */
    this.raiseEvent( 'canvas-click', {
        tracker: event.eventSource,
        position: event.position,
        quick: event.quick,
        shift: event.shift,
        originalEvent: event.originalEvent
    });
}

function onCanvasDrag( event ) {
    if ( !event.preventDefaultAction && this.viewport ) {
        if( !this.panHorizontal ){
            event.delta.x = 0;
        }
        if( !this.panVertical ){
            event.delta.y = 0;
        }
        this.viewport.panBy(
            this.viewport.deltaPointsFromPixels(
                event.delta.negate()
            )
        );
        if( this.constrainDuringPan ){
            this.viewport.applyConstraints();
        }
    }
    /**
     * Raised when a mouse or touch drag operation occurs on the {@link OpenSeadragon.Viewer#canvas} element.
     *
     * @event canvas-drag
     * @memberof OpenSeadragon.Viewer
     * @type {object}
     * @property {OpenSeadragon.Viewer} eventSource - A reference to the Viewer which raised this event.
     * @property {OpenSeadragon.MouseTracker} tracker - A reference to the MouseTracker which originated this event.
     * @property {OpenSeadragon.Point} position - The position of the event relative to the tracked element.
     * @property {OpenSeadragon.Point} delta - The x,y components of the difference between start drag and end drag.
     * @property {Boolean} shift - True if the shift key was pressed during this event.
     * @property {Object} originalEvent - The original DOM event.
     * @property {?Object} userData - Arbitrary subscriber-defined object.
     */
    this.raiseEvent( 'canvas-drag', {
        tracker: event.eventSource,
        position: event.position,
        delta: event.delta,
        shift: event.shift,
        originalEvent: event.originalEvent
    });
}

function onCanvasRelease( event ) {
    if ( event.insideElementPressed && this.viewport ) {
        this.viewport.applyConstraints();
    }
    /**
     * Raised when the mouse button is released or touch ends on the {@link OpenSeadragon.Viewer#canvas} element.
     *
     * @event canvas-release
     * @memberof OpenSeadragon.Viewer
     * @type {object}
     * @property {OpenSeadragon.Viewer} eventSource - A reference to the Viewer which raised this event.
     * @property {OpenSeadragon.MouseTracker} tracker - A reference to the MouseTracker which originated this event.
     * @property {OpenSeadragon.Point} position - The position of the event relative to the tracked element.
     * @property {Boolean} insideElementPressed - True if the left mouse button is currently being pressed and was initiated inside the tracked element, otherwise false.
     * @property {Boolean} insideElementReleased - True if the cursor still inside the tracked element when the button was released.
     * @property {Object} originalEvent - The original DOM event.
     * @property {?Object} userData - Arbitrary subscriber-defined object.
     */
    this.raiseEvent( 'canvas-release', {
        tracker: event.eventSource,
        position: event.position,
        insideElementPressed: event.insideElementPressed,
        insideElementReleased: event.insideElementReleased,
        originalEvent: event.originalEvent
    });
}

function onCanvasScroll( event ) {
    var factor;
    if ( !event.preventDefaultAction && this.viewport ) {
        factor = Math.pow( this.zoomPerScroll, event.scroll );
        this.viewport.zoomBy(
            factor,
            this.viewport.pointFromPixel( event.position, true )
        );
        this.viewport.applyConstraints();
    }
    /**
     * Raised when a scroll event occurs on the {@link OpenSeadragon.Viewer#canvas} element (mouse wheel, touch pinch, etc.).
     *
     * @event canvas-scroll
     * @memberof OpenSeadragon.Viewer
     * @type {object}
     * @property {OpenSeadragon.Viewer} eventSource - A reference to the Viewer which raised this event.
     * @property {OpenSeadragon.MouseTracker} tracker - A reference to the MouseTracker which originated this event.
     * @property {OpenSeadragon.Point} position - The position of the event relative to the tracked element.
     * @property {Number} scroll - The scroll delta for the event.
     * @property {Boolean} shift - True if the shift key was pressed during this event.
     * @property {Object} originalEvent - The original DOM event.
     * @property {?Object} userData - Arbitrary subscriber-defined object.
     */
    this.raiseEvent( 'canvas-scroll', {
        tracker: event.eventSource,
        position: event.position,
        scroll: event.scroll,
        shift: event.shift,
        originalEvent: event.originalEvent
    });
    //cancels event
    return false;
}

function onContainerExit( event ) {
    if ( !event.insideElementPressed ) {
        THIS[ this.hash ].mouseInside = false;
        if ( !THIS[ this.hash ].animating ) {
            beginControlsAutoHide( this );
        }
    }
    /**
     * Raised when the cursor leaves the {@link OpenSeadragon.Viewer#container} element.
     *
     * @event container-exit
     * @memberof OpenSeadragon.Viewer
     * @type {object}
     * @property {OpenSeadragon.Viewer} eventSource - A reference to the Viewer which raised this event.
     * @property {OpenSeadragon.MouseTracker} tracker - A reference to the MouseTracker which originated this event.
     * @property {OpenSeadragon.Point} position - The position of the event relative to the tracked element.
     * @property {Boolean} insideElementPressed - True if the left mouse button is currently being pressed and was initiated inside the tracked element, otherwise false.
     * @property {Boolean} buttonDownAny - Was the button down anywhere in the screen during the event.
     * @property {Object} originalEvent - The original DOM event.
     * @property {?Object} userData - Arbitrary subscriber-defined object.
     */
    this.raiseEvent( 'container-exit', {
        tracker: event.eventSource,
        position: event.position,
        insideElementPressed: event.insideElementPressed,
        buttonDownAny: event.buttonDownAny,
        originalEvent: event.originalEvent
    });
}

function onContainerRelease( event ) {
    if ( !event.insideElementReleased ) {
        THIS[ this.hash ].mouseInside = false;
        if ( !THIS[ this.hash ].animating ) {
            beginControlsAutoHide( this );
        }
    }
    /**
     * Raised when the mouse button is released or touch ends on the {@link OpenSeadragon.Viewer#container} element.
     *
     * @event container-release
     * @memberof OpenSeadragon.Viewer
     * @type {object}
     * @property {OpenSeadragon.Viewer} eventSource - A reference to the Viewer which raised this event.
     * @property {OpenSeadragon.MouseTracker} tracker - A reference to the MouseTracker which originated this event.
     * @property {OpenSeadragon.Point} position - The position of the event relative to the tracked element.
     * @property {Boolean} insideElementPressed - True if the left mouse button is currently being pressed and was initiated inside the tracked element, otherwise false.
     * @property {Boolean} insideElementReleased - True if the cursor still inside the tracked element when the button was released.
     * @property {Object} originalEvent - The original DOM event.
     * @property {?Object} userData - Arbitrary subscriber-defined object.
     */
    this.raiseEvent( 'container-release', {
        tracker: event.eventSource,
        position: event.position,
        insideElementPressed: event.insideElementPressed,
        insideElementReleased: event.insideElementReleased,
        originalEvent: event.originalEvent
    });
}

function onContainerEnter( event ) {
    THIS[ this.hash ].mouseInside = true;
    abortControlsAutoHide( this );
    /**
     * Raised when the cursor enters the {@link OpenSeadragon.Viewer#container} element.
     *
     * @event container-enter
     * @memberof OpenSeadragon.Viewer
     * @type {object}
     * @property {OpenSeadragon.Viewer} eventSource - A reference to the Viewer which raised this event.
     * @property {OpenSeadragon.MouseTracker} tracker - A reference to the MouseTracker which originated this event.
     * @property {OpenSeadragon.Point} position - The position of the event relative to the tracked element.
     * @property {Boolean} insideElementPressed - True if the left mouse button is currently being pressed and was initiated inside the tracked element, otherwise false.
     * @property {Boolean} buttonDownAny - Was the button down anywhere in the screen during the event.
     * @property {Object} originalEvent - The original DOM event.
     * @property {?Object} userData - Arbitrary subscriber-defined object.
     */
    this.raiseEvent( 'container-enter', {
        tracker: event.eventSource,
        position: event.position,
        insideElementPressed: event.insideElementPressed,
        buttonDownAny: event.buttonDownAny,
        originalEvent: event.originalEvent
    });
}


///////////////////////////////////////////////////////////////////////////////
// Page update routines ( aka Views - for future reference )
///////////////////////////////////////////////////////////////////////////////

function updateMulti( viewer ) {
    if ( !viewer.source ) {
        viewer._updateRequestId = null;
        return;
    }

    updateOnce( viewer );

    // Request the next frame, unless we've been closed during the updateOnce()
    if ( viewer.source ) {
        viewer._updateRequestId = scheduleUpdate( viewer, updateMulti );
    }
}

function updateOnce( viewer ) {

    var containerSize,
        animated;

    if ( !viewer.source ) {
        return;
    }

    //viewer.profiler.beginUpdate();

    if ( viewer.autoResize ) {
        containerSize = _getSafeElemSize( viewer.container );
        if ( !containerSize.equals( THIS[ viewer.hash ].prevContainerSize ) ) {
            // maintain image position
            var oldBounds = viewer.viewport.getBounds();
            var oldCenter = viewer.viewport.getCenter();
            resizeViewportAndRecenter(viewer, containerSize, oldBounds, oldCenter);
            THIS[ viewer.hash ].prevContainerSize = containerSize;
            THIS[ viewer.hash ].forceRedraw = true;
        }
    }

    animated = viewer.viewport.update();

    if( viewer.referenceStrip ){
        animated = viewer.referenceStrip.update( viewer.viewport ) || animated;
    }

    if ( !THIS[ viewer.hash ].animating && animated ) {
        /**
         * Raised when any spring animation starts (zoom, pan, etc.).
         *
         * @event animation-start
         * @memberof OpenSeadragon.Viewer
         * @type {object}
         * @property {OpenSeadragon.Viewer} eventSource - A reference to the Viewer which raised this event.
         * @property {?Object} userData - Arbitrary subscriber-defined object.
         */
        viewer.raiseEvent( "animation-start" );
        abortControlsAutoHide( viewer );
    }

    if ( animated ) {
        viewer.drawer.update();
        if( viewer.navigator ){
            viewer.navigator.update( viewer.viewport );
        }
        /**
         * Raised when any spring animation update occurs (zoom, pan, etc.).
         *
         * @event animation
         * @memberof OpenSeadragon.Viewer
         * @type {object}
         * @property {OpenSeadragon.Viewer} eventSource - A reference to the Viewer which raised this event.
         * @property {?Object} userData - Arbitrary subscriber-defined object.
         */
        viewer.raiseEvent( "animation" );
    } else if ( THIS[ viewer.hash ].forceRedraw || viewer.drawer.needsUpdate() ) {
        viewer.drawer.update();
        if( viewer.navigator ){
            viewer.navigator.update( viewer.viewport );
        }
        THIS[ viewer.hash ].forceRedraw = false;
    }

    if ( THIS[ viewer.hash ].animating && !animated ) {
        /**
         * Raised when any spring animation ends (zoom, pan, etc.).
         *
         * @event animation-finish
         * @memberof OpenSeadragon.Viewer
         * @type {object}
         * @property {OpenSeadragon.Viewer} eventSource - A reference to the Viewer which raised this event.
         * @property {?Object} userData - Arbitrary subscriber-defined object.
         */
        viewer.raiseEvent( "animation-finish" );

        if ( !THIS[ viewer.hash ].mouseInside ) {
            beginControlsAutoHide( viewer );
        }
    }

    THIS[ viewer.hash ].animating = animated;

    //viewer.profiler.endUpdate();
}

// This function resizes the viewport and recenters the image
// as it was before resizing.
// TODO: better adjust width and height. The new width and height
// should depend on the image dimensions and on the dimensions
// of the viewport before and after switching mode.
function resizeViewportAndRecenter( viewer, containerSize, oldBounds, oldCenter ) {
    var viewport = viewer.viewport;

    viewport.resize( containerSize, true );

    // We try to remove blanks as much as possible
    var imageHeight = 1 / viewer.source.aspectRatio;
    var newWidth = oldBounds.width <= 1 ? oldBounds.width : 1;
    var newHeight = oldBounds.height <= imageHeight ?
        oldBounds.height : imageHeight;

    var newBounds = new $.Rect(
        oldCenter.x - ( newWidth / 2.0 ),
        oldCenter.y - ( newHeight / 2.0 ),
        newWidth,
        newHeight
        );
    viewport.fitBounds( newBounds, true );
}

///////////////////////////////////////////////////////////////////////////////
// Navigation Controls
///////////////////////////////////////////////////////////////////////////////
function resolveUrl( prefix, url ) {
    return prefix ? prefix + url : url;
}



function beginZoomingIn() {
    THIS[ this.hash ].lastZoomTime = $.now();
    THIS[ this.hash ].zoomFactor = this.zoomPerSecond;
    THIS[ this.hash ].zooming = true;
    scheduleZoom( this );
}


function beginZoomingOut() {
    THIS[ this.hash ].lastZoomTime = $.now();
    THIS[ this.hash ].zoomFactor = 1.0 / this.zoomPerSecond;
    THIS[ this.hash ].zooming = true;
    scheduleZoom( this );
}


function endZooming() {
    THIS[ this.hash ].zooming = false;
}


function scheduleZoom( viewer ) {
    $.requestAnimationFrame( $.delegate( viewer, doZoom ) );
}


function doZoom() {
    var currentTime,
        deltaTime,
        adjustedFactor;

    if ( THIS[ this.hash ].zooming && this.viewport) {
        currentTime     = $.now();
        deltaTime       = currentTime - THIS[ this.hash ].lastZoomTime;
        adjustedFactor  = Math.pow( THIS[ this.hash ].zoomFactor, deltaTime / 1000 );

        this.viewport.zoomBy( adjustedFactor );
        this.viewport.applyConstraints();
        THIS[ this.hash ].lastZoomTime = currentTime;
        scheduleZoom( this );
    }
}


function doSingleZoomIn() {
    if ( this.viewport ) {
        THIS[ this.hash ].zooming = false;
        this.viewport.zoomBy(
            this.zoomPerClick / 1.0
        );
        this.viewport.applyConstraints();
    }
}


function doSingleZoomOut() {
    if ( this.viewport ) {
        THIS[ this.hash ].zooming = false;
        this.viewport.zoomBy(
            1.0 / this.zoomPerClick
        );
        this.viewport.applyConstraints();
    }
}


function lightUp() {
    this.buttons.emulateEnter();
    this.buttons.emulateExit();
}


function onHome() {
    if ( this.viewport ) {
        this.viewport.goHome();
    }
}


function onFullScreen() {
    if ( this.isFullPage() && !$.isFullScreen() ) {
        // Is fullPage but not fullScreen
        this.setFullPage( false );
    } else {
        this.setFullScreen( !this.isFullPage() );
    }
    // correct for no mouseout event on change
    if ( this.buttons ) {
        this.buttons.emulateExit();
    }
    this.fullPageButton.element.focus();
    if ( this.viewport ) {
        this.viewport.applyConstraints();
    }
}


function onPrevious(){
    var previous = THIS[ this.hash ].sequence - 1;
    if(this.navPrevNextWrap && previous < 0){
        previous += this.tileSources.length;
    }
    this.goToPage( previous );
}


function onNext(){
    var next = THIS[ this.hash ].sequence + 1;
    if(this.navPrevNextWrap && next >= this.tileSources.length){
        next = 0;
    }
    this.goToPage( next );
}


}( OpenSeadragon ));

/*
 * OpenSeadragon - Navigator
 *
 * Copyright (C) 2009 CodePlex Foundation
 * Copyright (C) 2010-2013 OpenSeadragon contributors
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are
 * met:
 *
 * - Redistributions of source code must retain the above copyright notice,
 *   this list of conditions and the following disclaimer.
 *
 * - Redistributions in binary form must reproduce the above copyright
 *   notice, this list of conditions and the following disclaimer in the
 *   documentation and/or other materials provided with the distribution.
 *
 * - Neither the name of CodePlex Foundation nor the names of its
 *   contributors may be used to endorse or promote products derived from
 *   this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
 * "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
 * LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
 * A PARTICULAR PURPOSE ARE DISCLAIMED.  IN NO EVENT SHALL THE COPYRIGHT
 * OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
 * SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED
 * TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
 * PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
 * LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 * NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

(function( $ ){

/**
 * @class Navigator
 * @classdesc The Navigator provides a small view of the current image as fixed
 * while representing the viewport as a moving box serving as a frame
 * of reference in the larger viewport as to which portion of the image
 * is currently being examined.  The navigator's viewport can be interacted
 * with using the keyboard or the mouse.
 *
 * @memberof OpenSeadragon
 * @extends OpenSeadragon.Viewer
 * @extends OpenSeadragon.EventSource
 * @param {Object} options
 */
$.Navigator = function( options ){

    var viewer      = options.viewer,
        viewerSize  = $.getElementSize( viewer.element),
        unneededElement;

    //We may need to create a new element and id if they did not
    //provide the id for the existing element
    if( !options.id ){
        options.id              = 'navigator-' + $.now();
        this.element            = $.makeNeutralElement( "div" );
        options.controlOptions  = {
            anchor:           $.ControlAnchor.TOP_RIGHT,
            attachToViewer:   true,
            autoFade:         true
        };

        if( options.position ){
            if( 'BOTTOM_RIGHT' == options.position ){
               options.controlOptions.anchor = $.ControlAnchor.BOTTOM_RIGHT;
            } else if( 'BOTTOM_LEFT' == options.position ){
               options.controlOptions.anchor = $.ControlAnchor.BOTTOM_LEFT;
            } else if( 'TOP_RIGHT' == options.position ){
               options.controlOptions.anchor = $.ControlAnchor.TOP_RIGHT;
            } else if( 'TOP_LEFT' == options.position ){
               options.controlOptions.anchor = $.ControlAnchor.TOP_LEFT;
            }
        }
        
    } else {
        this.element            = document.getElementById( options.id );
        options.controlOptions  = {
            anchor:           $.ControlAnchor.NONE,
            attachToViewer:   false,
            autoFade:         false
        };
    }
    this.element.id         = options.id;
    this.element.className  += ' navigator';

    options = $.extend( true, {
        sizeRatio:     $.DEFAULT_SETTINGS.navigatorSizeRatio
    }, options, {
        element:                this.element,
        //These need to be overridden to prevent recursion since
        //the navigator is a viewer and a viewer has a navigator
        showNavigator:          false,
        mouseNavEnabled:        false,
        showNavigationControl:  false,
        showSequenceControl:    false,
        immediateRender:        true,
        blendTime:              0,
        animationTime:          0
    });

    options.minPixelRatio = this.minPixelRatio = viewer.minPixelRatio;

    this.viewerSizeInPoints = viewer.viewport.deltaPointsFromPixels(viewerSize);
    this.borderWidth = 2;
    //At some browser magnification levels the display regions lines up correctly, but at some there appears to
    //be a one pixel gap.
    this.fudge = new $.Point(1, 1);
    this.totalBorderWidths = new $.Point(this.borderWidth*2, this.borderWidth*2).minus(this.fudge);


    (function( style, borderWidth ){
        style.margin        = '0px';
        style.border        = borderWidth + 'px solid #555';
        style.padding       = '0px';
        style.background    = '#000';
        style.opacity       = 0.8;
        style.overflow      = 'hidden';
    }( this.element.style, this.borderWidth));

    this.displayRegion           = $.makeNeutralElement( "div" );
    this.displayRegion.id        = this.element.id + '-displayregion';
    this.displayRegion.className = 'displayregion';

    (function( style, borderWidth ){
        style.position      = 'relative';
        style.top           = '0px';
        style.left          = '0px';
        style.fontSize      = '0px';
        style.overflow      = 'hidden';
        style.border        = borderWidth + 'px solid #900';
        style.margin        = '0px';
        style.padding       = '0px';
        //TODO: IE doesnt like this property being set
        //try{ style.outline  = '2px auto #909'; }catch(e){/*ignore*/}

        style.background    = 'transparent';

        // We use square bracket notation on the statement below, because float is a keyword.
        // This is important for the Google Closure compiler, if nothing else.
        /*jshint sub:true */
        style['float']      = 'left'; //Webkit

        style.cssFloat      = 'left'; //Firefox
        style.styleFloat    = 'left'; //IE
        style.zIndex        = 999999999;
        style.cursor        = 'default';
    }( this.displayRegion.style, this.borderWidth ));


    this.element.innerTracker = new $.MouseTracker({
        element:        this.element,
        dragHandler:        $.delegate( this, onCanvasDrag ),
        clickHandler:       $.delegate( this, onCanvasClick ),
        releaseHandler:     $.delegate( this, onCanvasRelease ),
        scrollHandler:  function(){
            //dont scroll the page up and down if the user is scrolling
            //in the navigator
            return false;
        }
    }).setTracking( true );

    /*this.displayRegion.outerTracker = new $.MouseTracker({
        element:            this.container,
        clickTimeThreshold: this.clickTimeThreshold,
        clickDistThreshold: this.clickDistThreshold,
        enterHandler:       $.delegate( this, onContainerEnter ),
        exitHandler:        $.delegate( this, onContainerExit ),
        releaseHandler:     $.delegate( this, onContainerRelease )
    }).setTracking( this.mouseNavEnabled ? true : false ); // always tracking*/


    viewer.addControl(
        this.element,
        options.controlOptions
    );

    if( options.width && options.height ){
        this.element.style.width  = options.width + 'px';
        this.element.style.height = options.height + 'px';
    } else {
        this.element.style.width  = ( viewerSize.x * options.sizeRatio ) + 'px';
        this.element.style.height = ( viewerSize.y * options.sizeRatio ) + 'px';
    }

    $.Viewer.apply( this, [ options ] );

    this.element.getElementsByTagName('form')[0].appendChild( this.displayRegion );
    unneededElement = this.element.getElementsByTagName('textarea')[0];
    if (unneededElement) {
        unneededElement.parentNode.removeChild(unneededElement);
    }

};

$.extend( $.Navigator.prototype, $.EventSource.prototype, $.Viewer.prototype, /** @lends OpenSeadragon.Navigator.prototype */{

    /**
     * @function
     */
    update: function( viewport ){

        var bounds,
            topleft,
            bottomright;

        if( viewport && this.viewport ){
            bounds      = viewport.getBounds( true );
            topleft     = this.viewport.pixelFromPoint( bounds.getTopLeft());
            bottomright = this.viewport.pixelFromPoint( bounds.getBottomRight()).minus(this.totalBorderWidths);

            //update style for navigator-box
            (function(style) {

                style.top    = topleft.y + 'px';
                style.left   = topleft.x + 'px';

                var width = Math.abs( topleft.x - bottomright.x );
                var height = Math.abs( topleft.y - bottomright.y );
                // make sure width and height are non-negative so IE doesn't throw
                style.width  = Math.max( width, 0 ) + 'px';
                style.height = Math.max( height, 0 ) + 'px';

            }( this.displayRegion.style ));
        }

    },

    open: function( source ){
        var containerSize = this.viewer.viewport.containerSize.times( this.sizeRatio );
        if( source.tileSize > containerSize.x ||
            source.tileSize > containerSize.y ){
            this.minPixelRatio = Math.min(
                containerSize.x,
                containerSize.y
            ) / source.tileSize;
        } else {
            this.minPixelRatio = this.viewer.minPixelRatio;
        }
        return $.Viewer.prototype.open.apply( this, [ source ] );
    }

});

/**
 * @private
 * @inner
 * @function
 */
function onCanvasClick( event ) {
    var newBounds,
        viewerPosition,
        dimensions;
    if (! this.drag) {
        if ( this.viewer.viewport ) {
            viewerPosition = this.viewport.deltaPointsFromPixels( event.position );
            dimensions = this.viewer.viewport.getBounds().getSize();
            newBounds = new $.Rect(
                viewerPosition.x - dimensions.x/2,
                viewerPosition.y - dimensions.y/2,
                dimensions.x,
                dimensions.y
            );
            if (this.viewer.source.aspectRatio > this.viewer.viewport.getAspectRatio()) {
                newBounds.y = newBounds.y -  ((this.viewerSizeInPoints.y - (1/this.viewer.source.aspectRatio)) /2 );
            }
            else  {
                newBounds.x = newBounds.x -  ((this.viewerSizeInPoints.x -1) /2 );
            }
            this.viewer.viewport.fitBounds(newBounds);
            this.viewer.viewport.applyConstraints();
        }
    }
    else {
        this.drag = false;
    }
}

/**
 * @private
 * @inner
 * @function
 */
function onCanvasDrag( event ) {
    if ( this.viewer.viewport ) {
        this.drag = true;
        if( !this.panHorizontal ){
            event.delta.x = 0;
        }
        if( !this.panVertical ){
            event.delta.y = 0;
        }
        this.viewer.viewport.panBy(
            this.viewport.deltaPointsFromPixels(
                event.delta
            )
        );
    }
}


/**
 * @private
 * @inner
 * @function
 */
function onCanvasRelease( event ) {
    if ( event.insideElementPressed && this.viewer.viewport ) {
        this.viewer.viewport.applyConstraints();
    }
}


/**
 * @private
 * @inner
 * @function
 */
function onCanvasScroll( event ) {
    var factor;
    if ( this.viewer.viewport ) {
        factor = Math.pow( this.zoomPerScroll, event.scroll );
        this.viewer.viewport.zoomBy(
            factor,
            this.viewport.getCenter()
        );
        this.viewer.viewport.applyConstraints();
    }
    //cancels event
    return false;
}


}( OpenSeadragon ));

/*
 * OpenSeadragon - getString/setString
 *
 * Copyright (C) 2009 CodePlex Foundation
 * Copyright (C) 2010-2013 OpenSeadragon contributors
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are
 * met:
 *
 * - Redistributions of source code must retain the above copyright notice,
 *   this list of conditions and the following disclaimer.
 *
 * - Redistributions in binary form must reproduce the above copyright
 *   notice, this list of conditions and the following disclaimer in the
 *   documentation and/or other materials provided with the distribution.
 *
 * - Neither the name of CodePlex Foundation nor the names of its
 *   contributors may be used to endorse or promote products derived from
 *   this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
 * "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
 * LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
 * A PARTICULAR PURPOSE ARE DISCLAIMED.  IN NO EVENT SHALL THE COPYRIGHT
 * OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
 * SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED
 * TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
 * PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
 * LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 * NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

(function( $ ){

//TODO: I guess this is where the i18n needs to be reimplemented.  I'll look
//      into existing patterns for i18n in javascript but i think that mimicking
//      pythons gettext might be a reasonable approach.
var I18N = {
    Errors: {
        Dzc:            "Sorry, we don't support Deep Zoom Collections!",
        Dzi:            "Hmm, this doesn't appear to be a valid Deep Zoom Image.",
        Xml:            "Hmm, this doesn't appear to be a valid Deep Zoom Image.",
        ImageFormat:    "Sorry, we don't support {0}-based Deep Zoom Images.",
        Security:       "It looks like a security restriction stopped us from " +
                        "loading this Deep Zoom Image.",
        Status:         "This space unintentionally left blank ({0} {1}).",
        OpenFailed:     "Unable to open {0}: {1}"
    },

    Tooltips: {
        FullPage:       "Toggle full page",
        Home:           "Go home",
        ZoomIn:         "Zoom in",
        ZoomOut:        "Zoom out",
        NextPage:       "Next page",
        PreviousPage:   "Previous page"
    }
};

$.extend( $, /** @lends OpenSeadragon */{

    /**
     * @function
     * @param {String} property
     */
    getString: function( prop ) {

        var props   = prop.split('.'),
            string  = null,
            args    = arguments,
            container = I18N,
            i;

        for ( i = 0; i < props.length-1; i++ ) {
            // in case not a subproperty
            container = container[ props[ i ] ] || {};
        }
        string = container[ props[ i ] ];

        if ( typeof( string ) != "string" ) {
            $.console.debug( "Untranslated source string:", prop );
            string = ""; // FIXME: this breaks gettext()-style convention, which would return source
        }

        return string.replace(/\{\d+\}/g, function(capture) {
            var i = parseInt( capture.match( /\d+/ ), 10 ) + 1;
            return i < args.length ?
                args[ i ] :
                "";
        });
    },

    /**
     * @function
     * @param {String} property
     * @param {*} value
     */
    setString: function( prop, value ) {

        var props     = prop.split('.'),
            container = I18N,
            i;

        for ( i = 0; i < props.length - 1; i++ ) {
            if ( !container[ props[ i ] ] ) {
                container[ props[ i ] ] = {};
            }
            container = container[ props[ i ] ];
        }

        container[ props[ i ] ] = value;
    }

});

}( OpenSeadragon ));

/*
 * OpenSeadragon - Point
 *
 * Copyright (C) 2009 CodePlex Foundation
 * Copyright (C) 2010-2013 OpenSeadragon contributors
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are
 * met:
 *
 * - Redistributions of source code must retain the above copyright notice,
 *   this list of conditions and the following disclaimer.
 *
 * - Redistributions in binary form must reproduce the above copyright
 *   notice, this list of conditions and the following disclaimer in the
 *   documentation and/or other materials provided with the distribution.
 *
 * - Neither the name of CodePlex Foundation nor the names of its
 *   contributors may be used to endorse or promote products derived from
 *   this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
 * "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
 * LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
 * A PARTICULAR PURPOSE ARE DISCLAIMED.  IN NO EVENT SHALL THE COPYRIGHT
 * OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
 * SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED
 * TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
 * PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
 * LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 * NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

(function( $ ){

/**
 * @class Point
 * @classdesc A Point is really used as a 2-dimensional vector, equally useful for
 * representing a point on a plane, or the height and width of a plane
 * not requiring any other frame of reference.
 *
 * @memberof OpenSeadragon
 * @param {Number} [x] The vector component 'x'. Defaults to the origin at 0.
 * @param {Number} [y] The vector component 'y'. Defaults to the origin at 0.
 */
$.Point = function( x, y ) {
    /**
     * The vector component 'x'.
     * @member {Number} x
     * @memberof OpenSeadragon.Point#
     */
    this.x = typeof ( x ) == "number" ? x : 0;
    /**
     * The vector component 'y'.
     * @member {Number} y
     * @memberof OpenSeadragon.Point#
     */
    this.y = typeof ( y ) == "number" ? y : 0;
};

$.Point.prototype = /** @lends OpenSeadragon.Point.prototype */{

    /**
     * Add another Point to this point and return a new Point.
     * @function
     * @param {OpenSeadragon.Point} point The point to add vector components.
     * @returns {OpenSeadragon.Point} A new point representing the sum of the
     *  vector components
     */
    plus: function( point ) {
        return new $.Point(
            this.x + point.x,
            this.y + point.y
        );
    },

    /**
     * Add another Point to this point and return a new Point.
     * @function
     * @param {OpenSeadragon.Point} point The point to add vector components.
     * @returns {OpenSeadragon.Point} A new point representing the sum of the
     *  vector components
     */
    minus: function( point ) {
        return new $.Point(
            this.x - point.x,
            this.y - point.y
        );
    },

    /**
     * Add another Point to this point and return a new Point.
     * @function
     * @param {OpenSeadragon.Point} point The point to add vector components.
     * @returns {OpenSeadragon.Point} A new point representing the sum of the
     *  vector components
     */
    times: function( factor ) {
        return new $.Point(
            this.x * factor,
            this.y * factor
        );
    },

    /**
     * Add another Point to this point and return a new Point.
     * @function
     * @param {OpenSeadragon.Point} point The point to add vector components.
     * @returns {OpenSeadragon.Point} A new point representing the sum of the
     *  vector components
     */
    divide: function( factor ) {
        return new $.Point(
            this.x / factor,
            this.y / factor
        );
    },

    /**
     * Add another Point to this point and return a new Point.
     * @function
     * @param {OpenSeadragon.Point} point The point to add vector components.
     * @returns {OpenSeadragon.Point} A new point representing the sum of the
     *  vector components
     */
    negate: function() {
        return new $.Point( -this.x, -this.y );
    },

    /**
     * Add another Point to this point and return a new Point.
     * @function
     * @param {OpenSeadragon.Point} point The point to add vector components.
     * @returns {OpenSeadragon.Point} A new point representing the sum of the
     *  vector components
     */
    distanceTo: function( point ) {
        return Math.sqrt(
            Math.pow( this.x - point.x, 2 ) +
            Math.pow( this.y - point.y, 2 )
        );
    },

    /**
     * Add another Point to this point and return a new Point.
     * @function
     * @param {OpenSeadragon.Point} point The point to add vector components.
     * @returns {OpenSeadragon.Point} A new point representing the sum of the
     *  vector components
     */
    apply: function( func ) {
        return new $.Point( func( this.x ), func( this.y ) );
    },

    /**
     * Add another Point to this point and return a new Point.
     * @function
     * @param {OpenSeadragon.Point} point The point to add vector components.
     * @returns {OpenSeadragon.Point} A new point representing the sum of the
     *  vector components
     */
    equals: function( point ) {
        return (
            point instanceof $.Point
        ) && (
            this.x === point.x
        ) && (
            this.y === point.y
        );
    },

    /**
     * Rotates the point around the specified pivot
     * From http://stackoverflow.com/questions/4465931/rotate-rectangle-around-a-point
     * @function
     * @param {Number} degress to rotate around the pivot.
     * @param {OpenSeadragon.Point} pivot Point about which to rotate.
     * @returns {OpenSeadragon.Point}. A new point representing the point rotated around the specified pivot
     */
    rotate: function ( degrees, pivot ) {
        var angle = degrees * Math.PI / 180.0,
            x = Math.cos( angle ) * ( this.x - pivot.x ) - Math.sin( angle ) * ( this.y - pivot.y ) + pivot.x,
            y = Math.sin( angle ) * ( this.x - pivot.x ) + Math.cos( angle ) * ( this.y - pivot.y ) + pivot.y;
        return new $.Point( x, y );
    },

    /**
     * Add another Point to this point and return a new Point.
     * @function
     * @param {OpenSeadragon.Point} point The point to add vector components.
     * @returns {OpenSeadragon.Point} A new point representing the sum of the
     *  vector components
     */
    toString: function() {
        return "(" + Math.round(this.x) + "," + Math.round(this.y) + ")";
    }
};

}( OpenSeadragon ));

/*
 * OpenSeadragon - TileSource
 *
 * Copyright (C) 2009 CodePlex Foundation
 * Copyright (C) 2010-2013 OpenSeadragon contributors
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are
 * met:
 *
 * - Redistributions of source code must retain the above copyright notice,
 *   this list of conditions and the following disclaimer.
 *
 * - Redistributions in binary form must reproduce the above copyright
 *   notice, this list of conditions and the following disclaimer in the
 *   documentation and/or other materials provided with the distribution.
 *
 * - Neither the name of CodePlex Foundation nor the names of its
 *   contributors may be used to endorse or promote products derived from
 *   this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
 * "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
 * LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
 * A PARTICULAR PURPOSE ARE DISCLAIMED.  IN NO EVENT SHALL THE COPYRIGHT
 * OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
 * SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED
 * TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
 * PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
 * LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 * NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

(function( $ ){


/**
 * @class TileSource
 * @classdesc The TileSource contains the most basic implementation required to create a
 * smooth transition between layer in an image pyramid. It has only a single key
 * interface that must be implemented to complete it key functionality:
 * 'getTileUrl'.  It also has several optional interfaces that can be
 * implemented if a new TileSource wishes to support configuration via a simple
 * object or array ('configure') and if the tile source supports or requires
 * configuration via retreival of a document on the network ala AJAX or JSONP,
 * ('getImageInfo').
 * <br/>
 * By default the image pyramid is split into N layers where the images longest
 * side in M (in pixels), where N is the smallest integer which satisfies
 *      <strong>2^(N+1) >= M</strong>.
 *
 * @memberof OpenSeadragon
 * @extends OpenSeadragon.EventSource
 * @param {Number|Object|Array|String} width
 *      If more than a single argument is supplied, the traditional use of
 *      positional parameters is supplied and width is expected to be the width
 *      source image at it's max resolution in pixels.  If a single argument is supplied and
 *      it is an Object or Array, the construction is assumed to occur through
 *      the extending classes implementation of 'configure'.  Finally if only a
 *      single argument is supplied and it is a String, the extending class is
 *      expected to implement 'getImageInfo' and 'configure'.
 * @param {Number} height
 *      Width of the source image at max resolution in pixels.
 * @param {Number} tileSize
 *      The size of the tiles to assumed to make up each pyramid layer in pixels.
 *      Tile size determines the point at which the image pyramid must be
 *      divided into a matrix of smaller images.
 * @param {Number} tileOverlap
 *      The number of pixels each tile is expected to overlap touching tiles.
 * @param {Number} minLevel
 *      The minimum level to attempt to load.
 * @param {Number} maxLevel
 *      The maximum level to attempt to load.
 */
$.TileSource = function( width, height, tileSize, tileOverlap, minLevel, maxLevel ) {
    var callback = null,
        args = arguments,
        options,
        i;

    if( $.isPlainObject( width ) ){
        options = width;
    }else{
        options = {
            width: args[0],
            height: args[1],
            tileSize: args[2],
            tileOverlap: args[3],
            minLevel: args[4],
            maxLevel: args[5]
        };
    }

    //Tile sources supply some events, namely 'ready' when they must be configured
    //by asyncronously fetching their configuration data.
    $.EventSource.call( this );

    //we allow options to override anything we dont treat as
    //required via idiomatic options or which is functionally
    //set depending on the state of the readiness of this tile
    //source
    $.extend( true, this, options );

    //Any functions that are passed as arguments are bound to the ready callback
    /*jshint loopfunc:true*/
    for ( i = 0; i < arguments.length; i++ ) {
        if ( $.isFunction( arguments[ i ] ) ) {
            callback = arguments[ i ];
            this.addHandler( 'ready', function ( event ) {
                callback( event );
            } );
            //only one callback per constructor
            break;
        }
    }

    /**
     * Ratio of width to height
     * @member {Number} aspectRatio
     * @memberof OpenSeadragon.TileSource#
     */
    /**
     * Vector storing x and y dimensions ( width and height respectively ).
     * @member {OpenSeadragon.Point} dimensions
     * @memberof OpenSeadragon.TileSource#
     */
    /**
     * The size of the image tiles used to compose the image.
     * @member {Number} tileSize
     * @memberof OpenSeadragon.TileSource#
     */
    /**
     * The overlap in pixels each tile shares with it's adjacent neighbors.
     * @member {Number} tileOverlap
     * @memberof OpenSeadragon.TileSource#
     */
    /**
     * The minimum pyramid level this tile source supports or should attempt to load.
     * @member {Number} minLevel
     * @memberof OpenSeadragon.TileSource#
     */
    /**
     * The maximum pyramid level this tile source supports or should attempt to load.
     * @member {Number} maxLevel
     * @memberof OpenSeadragon.TileSource#
     */
    /**
     * 
     * @member {Boolean} ready
     * @memberof OpenSeadragon.TileSource#
     */

    if( 'string' == $.type( arguments[ 0 ] ) ){
        //in case the getImageInfo method is overriden and/or implies an
        //async mechanism set some safe defaults first
        this.aspectRatio = 1;
        this.dimensions  = new $.Point( 10, 10 );
        this.tileSize    = 0;
        this.tileOverlap = 0;
        this.minLevel    = 0;
        this.maxLevel    = 0;
        this.ready       = false;
        //configuration via url implies the extending class
        //implements and 'configure'
        this.getImageInfo( arguments[ 0 ] );

    } else {

        //explicit configuration via positional args in constructor
        //or the more idiomatic 'options' object
        this.ready       = true;
        this.aspectRatio = ( options.width && options.height ) ?
            (  options.width / options.height ) : 1;
        this.dimensions  = new $.Point( options.width, options.height );
        this.tileSize    = options.tileSize ? options.tileSize : 0;
        this.tileOverlap = options.tileOverlap ? options.tileOverlap : 0;
        this.minLevel    = options.minLevel ? options.minLevel : 0;
        this.maxLevel    = ( undefined !== options.maxLevel && null !== options.maxLevel ) ?
            options.maxLevel : (
                ( options.width && options.height ) ? Math.ceil(
                    Math.log( Math.max( options.width, options.height ) ) /
                    Math.log( 2 )
                ) : 0
            );
        if( callback && $.isFunction( callback ) ){
            callback( this );
        }
    }


};


$.TileSource.prototype = /** @lends OpenSeadragon.TileSource.prototype */{

    /**
     * @function
     * @param {Number} level
     */
    getLevelScale: function( level ) {

        // see https://github.com/openseadragon/openseadragon/issues/22
        // we use the tilesources implementation of getLevelScale to generate
        // a memoized re-implementation
        var levelScaleCache = {},
            i;
        for( i = 0; i <= this.maxLevel; i++ ){
            levelScaleCache[ i ] = 1 / Math.pow(2, this.maxLevel - i);
        }
        this.getLevelScale = function( _level ){
            return levelScaleCache[ _level ];
        };
        return this.getLevelScale( level );
    },

    /**
     * @function
     * @param {Number} level
     */
    getNumTiles: function( level ) {
        var scale = this.getLevelScale( level ),
            x = Math.ceil( scale * this.dimensions.x / this.tileSize ),
            y = Math.ceil( scale * this.dimensions.y / this.tileSize );

        return new $.Point( x, y );
    },

    /**
     * @function
     * @param {Number} level
     */
    getPixelRatio: function( level ) {
        var imageSizeScaled = this.dimensions.times( this.getLevelScale( level ) ),
            rx = 1.0 / imageSizeScaled.x,
            ry = 1.0 / imageSizeScaled.y;

        return new $.Point(rx, ry);
    },


    /**
     * @function
     * @param {Number} level
     */
    getClosestLevel: function( rect ) {
        var i,
            tilesPerSide = Math.floor( Math.max( rect.x, rect.y ) / this.tileSize ),
            tiles;
        for( i = this.minLevel; i < this.maxLevel; i++ ){
            tiles = this.getNumTiles( i );
            if( Math.max( tiles.x, tiles.y ) + 1 >= tilesPerSide ){
                break;
            }
        }
        return Math.max( 0, i - 1 );
    },

    /**
     * @function
     * @param {Number} level
     * @param {OpenSeadragon.Point} point
     */
    getTileAtPoint: function( level, point ) {
        var pixel = point.times( this.dimensions.x ).times( this.getLevelScale(level ) ),
            tx = Math.floor( pixel.x / this.tileSize ),
            ty = Math.floor( pixel.y / this.tileSize );

        return new $.Point( tx, ty );
    },

    /**
     * @function
     * @param {Number} level
     * @param {Number} x
     * @param {Number} y
     */
    getTileBounds: function( level, x, y ) {
        var dimensionsScaled = this.dimensions.times( this.getLevelScale( level ) ),
            px = ( x === 0 ) ? 0 : this.tileSize * x - this.tileOverlap,
            py = ( y === 0 ) ? 0 : this.tileSize * y - this.tileOverlap,
            sx = this.tileSize + ( x === 0 ? 1 : 2 ) * this.tileOverlap,
            sy = this.tileSize + ( y === 0 ? 1 : 2 ) * this.tileOverlap,
            scale = 1.0 / dimensionsScaled.x;

        sx = Math.min( sx, dimensionsScaled.x - px );
        sy = Math.min( sy, dimensionsScaled.y - py );

        return new $.Rect( px * scale, py * scale, sx * scale, sy * scale );
    },


    /**
     * Responsible for retrieving, and caching the
     * image metadata pertinent to this TileSources implementation.
     * @function
     * @param {String} url
     * @throws {Error}
     */
    getImageInfo: function( url ) {
        var _this = this,
            callbackName,
            callback,
            readySource,
            options,
            urlParts,
            filename,
            lastDot;


        if( url ) {
            urlParts = url.split( '/' );
            filename = urlParts[ urlParts.length - 1 ];
            lastDot  = filename.lastIndexOf( '.' );
            if ( lastDot > -1 ) {
                urlParts[ urlParts.length - 1 ] = filename.slice( 0, lastDot );
            }
        }

        callback = function( data ){
            if( typeof(data) === "string" ) {
                data = $.parseXml( data );
            }
            var $TileSource = $.TileSource.determineType( _this, data, url );
            if ( !$TileSource ) {
                /**
                 * Raised when an error occurs loading a TileSource.
                 *
                 * @event open-failed
                 * @memberof OpenSeadragon.TileSource
                 * @type {object}
                 * @property {OpenSeadragon.TileSource} eventSource - A reference to the TileSource which raised the event.
                 * @property {String} message
                 * @property {String} source
                 * @property {?Object} userData - Arbitrary subscriber-defined object.
                 */
                _this.raiseEvent( 'open-failed', { message: "Unable to load TileSource", source: url } );
                return;
            }

            options = $TileSource.prototype.configure.apply( _this, [ data, url ]);
            readySource = new $TileSource( options );
            _this.ready = true;
            /**
             * Raised when a TileSource is opened and initialized.
             *
             * @event ready
             * @memberof OpenSeadragon.TileSource
             * @type {object}
             * @property {OpenSeadragon.TileSource} eventSource - A reference to the TileSource which raised the event.
             * @property {Object} tileSource
             * @property {?Object} userData - Arbitrary subscriber-defined object.
             */
            _this.raiseEvent( 'ready', { tileSource: readySource } );
        };

        if( url.match(/\.js$/) ){
            //TODO: Its not very flexible to require tile sources to end jsonp
            //      request for info  with a url that ends with '.js' but for
            //      now it's the only way I see to distinguish uniformly.
            callbackName = url.split( '/' ).pop().replace('.js','');
            $.jsonp({
                url: url,
                async: false,
                callbackName: callbackName,
                callback: callback
            });
        } else {
            // request info via xhr asyncronously.
            $.makeAjaxRequest( url, function( xhr ) {
                var data = processResponse( xhr );
                callback( data );
            }, function ( xhr, exc ) {
                var msg;

                /*
                    IE < 10 will block XHR requests to different origins. Any property access on the request
                    object will raise an exception which we'll attempt to handle by formatting the original
                    exception rather than the second one raised when we try to access xhr.status
                 */
                try {
                    msg = "HTTP " + xhr.status + " attempting to load TileSource";
                } catch ( e ) {
                    var formattedExc;
                    if ( typeof( exc ) == "undefined" || !exc.toString ) {
                        formattedExc = "Unknown error";
                    } else {
                        formattedExc = exc.toString();
                    }

                    msg = formattedExc + " attempting to load TileSource";
                }

                /***
                 * Raised when an error occurs loading a TileSource.
                 *
                 * @event open-failed
                 * @memberof OpenSeadragon.TileSource
                 * @type {object}
                 * @property {OpenSeadragon.TileSource} eventSource - A reference to the TileSource which raised the event.
                 * @property {String} message
                 * @property {String} source
                 * @property {?Object} userData - Arbitrary subscriber-defined object.
                 */
                _this.raiseEvent( 'open-failed', {
                    message: msg,
                    source: url
                });
            });
        }

    },

    /**
     * Responsible determining if a the particular TileSource supports the
     * data format ( and allowed to apply logic against the url the data was
     * loaded from, if any ). Overriding implementations are expected to do
     * something smart with data and / or url to determine support.  Also
     * understand that iteration order of TileSources is not guarunteed so
     * please make sure your data or url is expressive enough to ensure a simple
     * and sufficient mechanisim for clear determination.
     * @function
     * @param {String|Object|Array|Document} data
     * @param {String} url - the url the data was loaded
     *      from if any.
     * @return {Boolean}
     */
    supports: function( data, url ) {
        return false;
    },

    /**
     * Responsible for parsing and configuring the
     * image metadata pertinent to this TileSources implementation.
     * This method is not implemented by this class other than to throw an Error
     * announcing you have to implement it.  Because of the variety of tile
     * server technologies, and various specifications for building image
     * pyramids, this method is here to allow easy integration.
     * @function
     * @param {String|Object|Array|Document} data
     * @param {String} url - the url the data was loaded
     *      from if any.
     * @return {Object} options - A dictionary of keyword arguments sufficient
     *      to configure this tile sources constructor.
     * @throws {Error}
     */
    configure: function( data, url ) {
        throw new Error( "Method not implemented." );
    },

    /**
     * Responsible for retriving the url which will return an image for the
     * region speified by the given x, y, and level components.
     * This method is not implemented by this class other than to throw an Error
     * announcing you have to implement it.  Because of the variety of tile
     * server technologies, and various specifications for building image
     * pyramids, this method is here to allow easy integration.
     * @function
     * @param {Number} level
     * @param {Number} x
     * @param {Number} y
     * @throws {Error}
     */
    getTileUrl: function( level, x, y ) {
        throw new Error( "Method not implemented." );
    },

    /**
     * @function
     * @param {Number} level
     * @param {Number} x
     * @param {Number} y
     */
    tileExists: function( level, x, y ) {
        var numTiles = this.getNumTiles( level );
        return  level >= this.minLevel &&
                level <= this.maxLevel &&
                x >= 0 &&
                y >= 0 &&
                x < numTiles.x &&
                y < numTiles.y;
    }
};


$.extend( true, $.TileSource.prototype, $.EventSource.prototype );


/**
 * Decides whether to try to process the response as xml, json, or hand back
 * the text
 * @private
 * @inner
 * @function
 * @param {XMLHttpRequest} xhr - the completed network request
 */
function processResponse( xhr ){
    var responseText = xhr.responseText,
        status       = xhr.status,
        statusText,
        data;

    if ( !xhr ) {
        throw new Error( $.getString( "Errors.Security" ) );
    } else if ( xhr.status !== 200 && xhr.status !== 0 ) {
        status     = xhr.status;
        statusText = ( status == 404 ) ?
            "Not Found" :
            xhr.statusText;
        throw new Error( $.getString( "Errors.Status", status, statusText ) );
    }

    if( responseText.match(/\s*<.*/) ){
        try{
        data = ( xhr.responseXML && xhr.responseXML.documentElement ) ?
            xhr.responseXML :
            $.parseXml( responseText );
        } catch (e){
            data = xhr.responseText;
        }
    }else if( responseText.match(/\s*[\{\[].*/) ){
        /*jshint evil:true*/
        data = eval( '('+responseText+')' );
    }else{
        data = responseText;
    }
    return data;
}


/**
 * Determines the TileSource Implementation by introspection of OpenSeadragon
 * namespace, calling each TileSource implementation of 'isType'
 * @private
 * @inner
 * @function
 * @param {Object|Array|Document} data - the tile source configuration object
 * @param {String} url - the url where the tile source configuration object was
 *      loaded from, if any.
 */
$.TileSource.determineType = function( tileSource, data, url ){
    var property;
    for( property in OpenSeadragon ){
        if( property.match(/.+TileSource$/) &&
            $.isFunction( OpenSeadragon[ property ] ) &&
            $.isFunction( OpenSeadragon[ property ].prototype.supports ) &&
            OpenSeadragon[ property ].prototype.supports.call( tileSource, data, url )
        ){
            return OpenSeadragon[ property ];
        }
    }

    $.console.error( "No TileSource was able to open %s %s", url, data );
};


}( OpenSeadragon ));

/*
 * OpenSeadragon - DziTileSource
 *
 * Copyright (C) 2009 CodePlex Foundation
 * Copyright (C) 2010-2013 OpenSeadragon contributors
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are
 * met:
 *
 * - Redistributions of source code must retain the above copyright notice,
 *   this list of conditions and the following disclaimer.
 *
 * - Redistributions in binary form must reproduce the above copyright
 *   notice, this list of conditions and the following disclaimer in the
 *   documentation and/or other materials provided with the distribution.
 *
 * - Neither the name of CodePlex Foundation nor the names of its
 *   contributors may be used to endorse or promote products derived from
 *   this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
 * "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
 * LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
 * A PARTICULAR PURPOSE ARE DISCLAIMED.  IN NO EVENT SHALL THE COPYRIGHT
 * OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
 * SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED
 * TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
 * PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
 * LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 * NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

(function( $ ){

/**
 * @class DziTileSource
 * @memberof OpenSeadragon
 * @extends OpenSeadragon.TileSource
 * @param {Number|Object} width - the pixel width of the image or the idiomatic
 *      options object which is used instead of positional arguments.
 * @param {Number} height
 * @param {Number} tileSize
 * @param {Number} tileOverlap
 * @param {String} tilesUrl
 * @param {String} fileFormat
 * @param {OpenSeadragon.DisplayRect[]} displayRects
 * @property {String} tilesUrl
 * @property {String} fileFormat
 * @property {OpenSeadragon.DisplayRect[]} displayRects
 */
$.DziTileSource = function( width, height, tileSize, tileOverlap, tilesUrl, fileFormat, displayRects, minLevel, maxLevel ) {
    var i,
        rect,
        level,
        options;

    if( $.isPlainObject( width ) ){
        options = width;
    }else{
        options = {
            width: arguments[ 0 ],
            height: arguments[ 1 ],
            tileSize: arguments[ 2 ],
            tileOverlap: arguments[ 3 ],
            tilesUrl: arguments[ 4 ],
            fileFormat: arguments[ 5 ],
            displayRects: arguments[ 6 ],
            minLevel: arguments[ 7 ],
            maxLevel: arguments[ 8 ]
        };
    }

    this._levelRects  = {};
    this.tilesUrl     = options.tilesUrl;
    this.fileFormat   = options.fileFormat;
    this.displayRects = options.displayRects;

    if ( this.displayRects ) {
        for ( i = this.displayRects.length - 1; i >= 0; i-- ) {
            rect = this.displayRects[ i ];
            for ( level = rect.minLevel; level <= rect.maxLevel; level++ ) {
                if ( !this._levelRects[ level ] ) {
                    this._levelRects[ level ] = [];
                }
                this._levelRects[ level ].push( rect );
            }
        }
    }

    $.TileSource.apply( this, [ options ] );

};

$.extend( $.DziTileSource.prototype, $.TileSource.prototype, /** @lends OpenSeadragon.DziTileSource.prototype */{


    /**
     * Determine if the data and/or url imply the image service is supported by
     * this tile source.
     * @function
     * @param {Object|Array} data
     * @param {String} optional - url
     */
    supports: function( data, url ){
        var ns;
        if ( data.Image ) {
            ns = data.Image.xmlns;
        } else if ( data.documentElement && "Image" == data.documentElement.tagName ) {
            ns = data.documentElement.namespaceURI;
        }

        return ( "http://schemas.microsoft.com/deepzoom/2008" == ns ||
            "http://schemas.microsoft.com/deepzoom/2009" == ns );
    },

    /**
     *
     * @function
     * @param {Object|XMLDocument} data - the raw configuration
     * @param {String} url - the url the data was retreived from if any.
     * @return {Object} options - A dictionary of keyword arguments sufficient
     *      to configure this tile sources constructor.
     */
    configure: function( data, url ){

        var options;

        if( !$.isPlainObject(data) ){

            options = configureFromXML( this, data );

        }else{

            options = configureFromObject( this, data );
        }

        if (url && !options.tilesUrl) {
            options.tilesUrl = url.replace(/([^\/]+)\.(dzi|xml|js)$/, '$1_files/');
        }

        return options;
    },


    /**
     * @function
     * @param {Number} level
     * @param {Number} x
     * @param {Number} y
     */
    getTileUrl: function( level, x, y ) {
        return [ this.tilesUrl, level, '/', x, '_', y, '.', this.fileFormat ].join( '' );
    },


    /**
     * @function
     * @param {Number} level
     * @param {Number} x
     * @param {Number} y
     */
    tileExists: function( level, x, y ) {
        var rects = this._levelRects[ level ],
            rect,
            scale,
            xMin,
            yMin,
            xMax,
            yMax,
            i;

        if ( !rects || !rects.length ) {
            return true;
        }

        for ( i = rects.length - 1; i >= 0; i-- ) {
            rect = rects[ i ];

            if ( level < rect.minLevel || level > rect.maxLevel ) {
                continue;
            }

            scale = this.getLevelScale( level );
            xMin = rect.x * scale;
            yMin = rect.y * scale;
            xMax = xMin + rect.width * scale;
            yMax = yMin + rect.height * scale;

            xMin = Math.floor( xMin / this.tileSize );
            yMin = Math.floor( yMin / this.tileSize );
            xMax = Math.ceil( xMax / this.tileSize );
            yMax = Math.ceil( yMax / this.tileSize );

            if ( xMin <= x && x < xMax && yMin <= y && y < yMax ) {
                return true;
            }
        }

        return false;
    }
});


/**
 * @private
 * @inner
 * @function
 */
function configureFromXML( tileSource, xmlDoc ){

    if ( !xmlDoc || !xmlDoc.documentElement ) {
        throw new Error( $.getString( "Errors.Xml" ) );
    }

    var root           = xmlDoc.documentElement,
        rootName       = root.tagName,
        configuration  = null,
        displayRects   = [],
        dispRectNodes,
        dispRectNode,
        rectNode,
        sizeNode,
        i;

    if ( rootName == "Image" ) {

        try {
            sizeNode = root.getElementsByTagName( "Size" )[ 0 ];
            configuration = {
                Image: {
                    xmlns:       "http://schemas.microsoft.com/deepzoom/2008",
                    Url:         root.getAttribute( "Url" ),
                    Format:      root.getAttribute( "Format" ),
                    DisplayRect: null,
                    Overlap:     parseInt( root.getAttribute( "Overlap" ), 10 ),
                    TileSize:    parseInt( root.getAttribute( "TileSize" ), 10 ),
                    Size: {
                        Height: parseInt( sizeNode.getAttribute( "Height" ), 10 ),
                        Width:  parseInt( sizeNode.getAttribute( "Width" ), 10 )
                    }
                }
            };

            if ( !$.imageFormatSupported( configuration.Image.Format ) ) {
                throw new Error(
                    $.getString( "Errors.ImageFormat", configuration.Image.Format.toUpperCase() )
                );
            }

            dispRectNodes = root.getElementsByTagName( "DisplayRect" );
            for ( i = 0; i < dispRectNodes.length; i++ ) {
                dispRectNode = dispRectNodes[ i ];
                rectNode     = dispRectNode.getElementsByTagName( "Rect" )[ 0 ];

                displayRects.push({
                    Rect: {
                        X: parseInt( rectNode.getAttribute( "X" ), 10 ),
                        Y: parseInt( rectNode.getAttribute( "Y" ), 10 ),
                        Width: parseInt( rectNode.getAttribute( "Width" ), 10 ),
                        Height: parseInt( rectNode.getAttribute( "Height" ), 10 ),
                        MinLevel: parseInt( dispRectNode.getAttribute( "MinLevel" ), 10 ),
                        MaxLevel: parseInt( dispRectNode.getAttribute( "MaxLevel" ), 10 )
                    }
                });
            }

            if( displayRects.length ){
                configuration.Image.DisplayRect = displayRects;
            }

            return configureFromObject( tileSource, configuration );

        } catch ( e ) {
            throw (e instanceof Error) ?
                e :
                new Error( $.getString("Errors.Dzi") );
        }
    } else if ( rootName == "Collection" ) {
        throw new Error( $.getString( "Errors.Dzc" ) );
    } else if ( rootName == "Error" ) {
        return $._processDZIError( root );
    }

    throw new Error( $.getString( "Errors.Dzi" ) );
}

/**
 * @private
 * @inner
 * @function
 */
function configureFromObject( tileSource, configuration ){
    var imageData     = configuration.Image,
        tilesUrl      = imageData.Url,
        fileFormat    = imageData.Format,
        sizeData      = imageData.Size,
        dispRectData  = imageData.DisplayRect || [],
        width         = parseInt( sizeData.Width, 10 ),
        height        = parseInt( sizeData.Height, 10 ),
        tileSize      = parseInt( imageData.TileSize, 10 ),
        tileOverlap   = parseInt( imageData.Overlap, 10 ),
        displayRects  = [],
        rectData,
        i;

    //TODO: need to figure out out to better handle image format compatibility
    //      which actually includes additional file formats like xml and pdf
    //      and plain text for various tilesource implementations to avoid low
    //      level errors.
    //
    //      For now, just don't perform the check.
    //
    /*if ( !imageFormatSupported( fileFormat ) ) {
        throw new Error(
            $.getString( "Errors.ImageFormat", fileFormat.toUpperCase() )
        );
    }*/

    for ( i = 0; i < dispRectData.length; i++ ) {
        rectData = dispRectData[ i ].Rect;

        displayRects.push( new $.DisplayRect(
            parseInt( rectData.X, 10 ),
            parseInt( rectData.Y, 10 ),
            parseInt( rectData.Width, 10 ),
            parseInt( rectData.Height, 10 ),
            parseInt( rectData.MinLevel, 10 ),
            parseInt( rectData.MaxLevel, 10 )
        ));
    }

    return $.extend(true, {
        width: width, /* width *required */
        height: height, /* height *required */
        tileSize: tileSize, /* tileSize *required */
        tileOverlap: tileOverlap, /* tileOverlap *required */
        minLevel: null, /* minLevel */
        maxLevel: null, /* maxLevel */
        tilesUrl: tilesUrl, /* tilesUrl */
        fileFormat: fileFormat, /* fileFormat */
        displayRects: displayRects /* displayRects */
    }, configuration );

}

}( OpenSeadragon ));

/*
 * OpenSeadragon - IIIFTileSource
 *
 * Copyright (C) 2009 CodePlex Foundation
 * Copyright (C) 2010-2013 OpenSeadragon contributors
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are
 * met:
 *
 * - Redistributions of source code must retain the above copyright notice,
 *   this list of conditions and the following disclaimer.
 *
 * - Redistributions in binary form must reproduce the above copyright
 *   notice, this list of conditions and the following disclaimer in the
 *   documentation and/or other materials provided with the distribution.
 *
 * - Neither the name of CodePlex Foundation nor the names of its
 *   contributors may be used to endorse or promote products derived from
 *   this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
 * "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
 * LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
 * A PARTICULAR PURPOSE ARE DISCLAIMED.  IN NO EVENT SHALL THE COPYRIGHT
 * OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
 * SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED
 * TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
 * PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
 * LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 * NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

/*
 * The getTileUrl implementation is based on Jon Stroop's Python version,
 * which is released under the New BSD license:
 * https://gist.github.com/jpstroop/4624253
 */


(function( $ ){

/**
 * @class IIIFTileSource
 * @classdesc A client implementation of the International Image Interoperability
 * Format: Image API Draft 0.2
 *
 * @memberof OpenSeadragon
 * @extends OpenSeadragon.TileSource
 * @see http://library.stanford.edu/iiif/image-api/
 */
$.IIIFTileSource = function( options ){

    $.extend( true, this, options );

    if( !(this.height && this.width && this.identifier && this.tilesUrl ) ){
        throw new Error('IIIF required parameters not provided.');
    }

    //TODO: at this point the base tile source implementation assumes
    //      a tile is a square and so only has one property tileSize
    //      to store it.  It may be possible to make tileSize a vector
    //      OpenSeadraon.Point but would require careful implementation
    //      to preserve backward compatibility.
    options.tileSize = this.tile_width;

    if (! options.maxLevel ) {
        var mf = -1;
        var scfs = this.scale_factors || this.scale_factor;
        if ( scfs instanceof Array ) {
            for ( var i = 0; i < scfs.length; i++ ) {
                var cf = Number( scfs[i] );
                if ( !isNaN( cf ) && cf > mf ) { mf = cf; }
            }
        }
        if ( mf < 0 ) { options.maxLevel = Number(Math.ceil(Math.log(Math.max(this.width, this.height), 2))); }
        else { options.maxLevel = mf; }
    }

    $.TileSource.apply( this, [ options ] );
};

$.extend( $.IIIFTileSource.prototype, $.TileSource.prototype, /** @lends OpenSeadragon.IIIFTileSource.prototype */{
    /**
     * Determine if the data and/or url imply the image service is supported by
     * this tile source.
     * @method
     * @param {Object|Array} data
     * @param {String} optional - url
     */
    supports: function( data, url ){
        return (
            data.ns &&
            "http://library.stanford.edu/iiif/image-api/ns/" == data.ns
        ) || (
            data.profile && (
                "http://library.stanford.edu/iiif/image-api/compliance.html#level1" == data.profile ||
                "http://library.stanford.edu/iiif/image-api/compliance.html#level2" == data.profile ||
                "http://library.stanford.edu/iiif/image-api/compliance.html#level3" == data.profile ||
                "http://library.stanford.edu/iiif/image-api/compliance.html" == data.profile
            )
        ) || (
            data.documentElement &&
            "info" == data.documentElement.tagName &&
            "http://library.stanford.edu/iiif/image-api/ns/" ==
                data.documentElement.namespaceURI
        );
    },

   /**
     *
     * @method
     * @param {Object|XMLDocument} data - the raw configuration
     * @param {String} url - the url the data was retreived from if any.
     * @return {Object} options - A dictionary of keyword arguments sufficient
     *      to configure this tile source via it's constructor.
     */
    configure: function( data, url ){
        var service,
            options,
            host;

        if( !$.isPlainObject(data) ){

            options = configureFromXml( this, data );

        }else{

            options = configureFromObject( this, data );
        }

        if( url && !options.tilesUrl ){
            service = url.split('/');
            service.pop(); //info.json or info.xml
            service = service.join('/');
            if( 'http' !== url.substring( 0, 4 ) ){
                host = location.protocol + '//' + location.host;
                service = host + service;
            }
            options.tilesUrl = service.replace(
                data.identifier,
                ''
            );
        }

        return options;
    },

    /**
     * Responsible for retreiving the url which will return an image for the
     * region speified by the given x, y, and level components.
     * @method
     * @param {Number} level - z index
     * @param {Number} x
     * @param {Number} y
     * @throws {Error}
     */
    getTileUrl: function( level, x, y ){

        //# constants
        var IIIF_ROTATION = '0',
            IIIF_QUALITY = 'native.jpg',

            //## get the scale (level as a decimal)
            scale = Math.pow( 0.5, this.maxLevel - level ),

            //## get iiif size
            // iiif_size = 'pct:' + ( scale * 100 ),

            //# image dimensions at this level
            level_width = Math.ceil( this.width * scale ),
            level_height = Math.ceil( this.height * scale ),

            //## iiif region
            iiif_tile_size_width = Math.ceil( this.tileSize / scale ),
            iiif_tile_size_height = Math.ceil( this.tileSize / scale ),
            iiif_region,
            iiif_tile_x,
            iiif_tile_y,
            iiif_tile_w,
            iiif_tile_h,
            iiif_size;


        if ( level_width < this.tile_width && level_height < this.tile_height ){
            iiif_size = level_width + ","; // + level_height; only one dim. for IIIF level 1 compliance
            iiif_region = 'full';
        } else {
            iiif_tile_x = x * iiif_tile_size_width;
            iiif_tile_y = y * iiif_tile_size_height;
            iiif_tile_w = Math.min( iiif_tile_size_width, this.width - iiif_tile_x );
            iiif_tile_h = Math.min( iiif_tile_size_height, this.height - iiif_tile_y );
            iiif_size = Math.ceil(iiif_tile_w * scale) + ",";
            iiif_region = [ iiif_tile_x, iiif_tile_y, iiif_tile_w, iiif_tile_h ].join(',');
        }

        return [
            this.tilesUrl,
            this.identifier,
            iiif_region,
            iiif_size,
            IIIF_ROTATION,
            IIIF_QUALITY
        ].join('/');
    }


});

/**
 * @private
 * @inner
 * @function
 * @example
 *   <?xml version="1.0" encoding="UTF-8"?>
 *   <info xmlns="http://library.stanford.edu/iiif/image-api/ns/">
 *     <identifier>1E34750D-38DB-4825-A38A-B60A345E591C</identifier>
 *     <width>6000</width>
 *     <height>4000</height>
 *     <scale_factors>
 *       <scale_factor>1</scale_factor>
 *       <scale_factor>2</scale_factor>
 *       <scale_factor>4</scale_factor>
 *     </scale_factors>
 *     <tile_width>1024</tile_width>
 *     <tile_height>1024</tile_height>
 *     <formats>
 *       <format>jpg</format>
 *       <format>png</format>
 *     </formats>
 *     <qualities>
 *       <quality>native</quality>
 *       <quality>grey</quality>
 *     </qualities>
 *   </info>
 */
function configureFromXml( tileSource, xmlDoc ){

    //parse the xml
    if ( !xmlDoc || !xmlDoc.documentElement ) {
        throw new Error( $.getString( "Errors.Xml" ) );
    }

    var root            = xmlDoc.documentElement,
        rootName        = root.tagName,
        configuration   = null;

    if ( rootName == "info" ) {

        try {

            configuration = {
                "ns": root.namespaceURI
            };

            parseXML( root, configuration );

            return configureFromObject( tileSource, configuration );

        } catch ( e ) {
            throw (e instanceof Error) ?
                e :
                new Error( $.getString("Errors.IIIF") );
        }
    }

    throw new Error( $.getString( "Errors.IIIF" ) );

}


/**
 * @private
 * @inner
 * @function
 */
function parseXML( node, configuration, property ){
    var i,
        value;
    if( node.nodeType == 3 && property ){//text node
        value = node.nodeValue.trim();
        if( value.match(/^\d*$/)){
            value = Number( value );
        }
        if( !configuration[ property ] ){
            configuration[ property ] = value;
        }else{
            if( !$.isArray( configuration[ property ] ) ){
                configuration[ property ] = [ configuration[ property ] ];
            }
            configuration[ property ].push( value );
        }
    } else if( node.nodeType == 1 ){
        for( i = 0; i < node.childNodes.length; i++ ){
            parseXML( node.childNodes[ i ], configuration, node.nodeName );
        }
    }
}


/**
 * @private
 * @inner
 * @function
 * @example
 *   {
 *       "profile" : "http://library.stanford.edu/iiif/image-api/compliance.html#level1",
 *       "identifier" : "1E34750D-38DB-4825-A38A-B60A345E591C",
 *       "width" : 6000,
 *       "height" : 4000,
 *       "scale_factors" : [ 1, 2, 4 ],
 *       "tile_width" : 1024,
 *       "tile_height" : 1024,
 *       "formats" : [ "jpg", "png" ],
 *       "quality" : [ "native", "grey" ]
 *   }
 */
function configureFromObject( tileSource, configuration ){
    //the image_host property is not part of the iiif standard but is included here to
    //allow the info.json and info.xml specify a different server to load the
    //images from so we can test the implementation.
    if( configuration.image_host ){
        configuration.tilesUrl = configuration.image_host;
    }
    return configuration;
}

}( OpenSeadragon ));

/*
 * OpenSeadragon - IIIF1_1TileSource
 *
 * Copyright (C) 2009 CodePlex Foundation
 * Copyright (C) 2010-2013 OpenSeadragon contributors
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are
 * met:
 *
 * - Redistributions of source code must retain the above copyright notice,
 *   this list of conditions and the following disclaimer.
 *
 * - Redistributions in binary form must reproduce the above copyright
 *   notice, this list of conditions and the following disclaimer in the
 *   documentation and/or other materials provided with the distribution.
 *
 * - Neither the name of CodePlex Foundation nor the names of its
 *   contributors may be used to endorse or promote products derived from
 *   this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
 * "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
 * LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
 * A PARTICULAR PURPOSE ARE DISCLAIMED.  IN NO EVENT SHALL THE COPYRIGHT
 * OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
 * SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED
 * TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
 * PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
 * LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 * NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

(function( $ ){

/**
 * @class IIIF1_1TileSource
 * @classdesc A client implementation of the International Image Interoperability
 * Format: Image API 1.1
 *
 * @memberof OpenSeadragon
 * @extends OpenSeadragon.TileSource
 * @see http://library.stanford.edu/iiif/image-api/
 */
$.IIIF1_1TileSource = function( options ){

    $.extend( true, this, options );

    if( !(this.height && this.width && this['@id'] ) ){
        throw new Error('IIIF required parameters not provided.');
    }

    if ( !(this.tile_width && this.tile_height) ) {
        // use the short dimension if there aren't tile sizes provided.
        options.tileSize = Math.min(this.height, this.width);
    } else {
        options.tileSize = this.tile_width;
    }

    if (! options.maxLevel ) {
        var mf = -1;
        var scfs = this.scale_factors || this.scale_factor;
        if ( scfs instanceof Array ) {
            for ( var i = 0; i < scfs.length; i++ ) {
                var cf = Number( scfs[i] );
                if ( !isNaN( cf ) && cf > mf ) { mf = cf; }
            }
        }
        if ( mf < 0 ) { options.maxLevel = Number(Math.ceil(Math.log(Math.max(this.width, this.height), 2))); }
        else { options.maxLevel = mf; }
    }

    $.TileSource.apply( this, [ options ] );
};

$.extend( $.IIIF1_1TileSource.prototype, $.TileSource.prototype, /** @lends OpenSeadragon.IIIF1_1TileSource.prototype */{
    /**
     * Determine if the data and/or url imply the image service is supported by
     * this tile source.
     * @function
     * @param {Object|Array} data
     * @param {String} optional - url
     */
    supports: function( data, url ){
        return data.profile && (
            "http://library.stanford.edu/iiif/image-api/1.1/compliance.html#level0" == data.profile ||
            "http://library.stanford.edu/iiif/image-api/1.1/compliance.html#level1" == data.profile ||
            "http://library.stanford.edu/iiif/image-api/1.1/compliance.html#level2" == data.profile ||
            "http://library.stanford.edu/iiif/image-api/1.1/compliance.html" == data.profile
        );
    },

    /**
     *
     * @function
     * @param {Object} data - the raw configuration
     * @example <caption>IIIF 1.1 Info Looks like this (XML syntax is no more)</caption>
     * {
     *   "@context" : "http://library.stanford.edu/iiif/image-api/1.1/context.json",
     *   "@id" : "http://iiif.example.com/prefix/1E34750D-38DB-4825-A38A-B60A345E591C",
     *   "width" : 6000,
     *   "height" : 4000,
     *   "scale_factors" : [ 1, 2, 4 ],
     *   "tile_width" : 1024,
     *   "tile_height" : 1024,
     *   "formats" : [ "jpg", "png" ],
     *   "qualities" : [ "native", "grey" ]
     *   "profile" : "http://library.stanford.edu/iiif/image-api/1.1/compliance.html#level0" 
     * } 
     */
    configure: function( data ){
      return data;
    },
    /**
     * Responsible for retreiving the url which will return an image for the
     * region specified by the given x, y, and level components.
     * @function
     * @param {Number} level - z index
     * @param {Number} x
     * @param {Number} y
     * @throws {Error}
     */
    getTileUrl: function( level, x, y ){

        //# constants
        var IIIF_ROTATION = '0',
            IIIF_QUALITY = 'native.jpg',

            //## get the scale (level as a decimal)
            scale = Math.pow( 0.5, this.maxLevel - level ),

            //# image dimensions at this level
            level_width = Math.ceil( this.width * scale ),
            level_height = Math.ceil( this.height * scale ),

            //## iiif region
            iiif_tile_size_width = Math.ceil( this.tileSize / scale ),
            iiif_tile_size_height = Math.ceil( this.tileSize / scale ),
            iiif_region,
            iiif_tile_x,
            iiif_tile_y,
            iiif_tile_w,
            iiif_tile_h,
            iiif_size,
            uri;

        if ( level_width < this.tile_width && level_height < this.tile_height ){
            iiif_size = level_width + "," + level_height;
            iiif_region = 'full';
        } else {
            iiif_tile_x = x * iiif_tile_size_width;
            iiif_tile_y = y * iiif_tile_size_height;
            iiif_tile_w = Math.min( iiif_tile_size_width, this.width - iiif_tile_x );
            iiif_tile_h = Math.min( iiif_tile_size_height, this.height - iiif_tile_y );
            iiif_size = Math.ceil(iiif_tile_w * scale) + "," +  Math.ceil(iiif_tile_h * scale);
            iiif_region = [ iiif_tile_x, iiif_tile_y, iiif_tile_w, iiif_tile_h ].join(',');
        }
        uri = [ this['@id'], iiif_region, iiif_size, IIIF_ROTATION, IIIF_QUALITY ].join('/');
        return uri;
    }
  });

}( OpenSeadragon ));

/*
 * OpenSeadragon - OsmTileSource
 *
 * Copyright (C) 2009 CodePlex Foundation
 * Copyright (C) 2010-2013 OpenSeadragon contributors
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are
 * met:
 *
 * - Redistributions of source code must retain the above copyright notice,
 *   this list of conditions and the following disclaimer.
 *
 * - Redistributions in binary form must reproduce the above copyright
 *   notice, this list of conditions and the following disclaimer in the
 *   documentation and/or other materials provided with the distribution.
 *
 * - Neither the name of CodePlex Foundation nor the names of its
 *   contributors may be used to endorse or promote products derived from
 *   this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
 * "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
 * LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
 * A PARTICULAR PURPOSE ARE DISCLAIMED.  IN NO EVENT SHALL THE COPYRIGHT
 * OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
 * SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED
 * TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
 * PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
 * LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 * NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

/*
 * Derived from the OSM tile source in Rainer Simon's seajax-utils project
 * <http://github.com/rsimon/seajax-utils>.  Rainer Simon has contributed
 * the included code to the OpenSeadragon project under the New BSD license;
 * see <https://github.com/openseadragon/openseadragon/issues/58>.
 */


(function( $ ){

/**
 * @class OsmTileSource
 * @classdesc A tilesource implementation for OpenStreetMap.<br><br>
 *
 * Note 1. Zoomlevels. Deep Zoom and OSM define zoom levels differently. In  Deep
 * Zoom, level 0 equals an image of 1x1 pixels. In OSM, level 0 equals an image of
 * 256x256 levels (see http://gasi.ch/blog/inside-deep-zoom-2). I.e. there is a
 * difference of log2(256)=8 levels.<br><br>
 *
 * Note 2. Image dimension. According to the OSM Wiki
 * (http://wiki.openstreetmap.org/wiki/Slippy_map_tilenames#Zoom_levels)
 * the highest Mapnik zoom level has 256.144x256.144 tiles, with a 256x256
 * pixel size. I.e. the Deep Zoom image dimension is 65.572.864x65.572.864
 * pixels.
 *
 * @memberof OpenSeadragon
 * @extends OpenSeadragon.TileSource
 * @param {Number|Object} width - the pixel width of the image or the idiomatic
 *      options object which is used instead of positional arguments.
 * @param {Number} height
 * @param {Number} tileSize
 * @param {Number} tileOverlap
 * @param {String} tilesUrl
 */
$.OsmTileSource = function( width, height, tileSize, tileOverlap, tilesUrl ) {
    var options;

    if( $.isPlainObject( width ) ){
        options = width;
    }else{
        options = {
            width: arguments[0],
            height: arguments[1],
            tileSize: arguments[2],
            tileOverlap: arguments[3],
            tilesUrl: arguments[4]
        };
    }
    //apply default setting for standard public OpenStreatMaps service
    //but allow them to be specified so fliks can host there own instance
    //or apply against other services supportting the same standard
    if( !options.width || !options.height ){
        options.width = 65572864;
        options.height = 65572864;
    }
    if( !options.tileSize ){
        options.tileSize = 256;
        options.tileOverlap = 0;
    }
    if( !options.tilesUrl ){
        options.tilesUrl = "http://tile.openstreetmap.org/";
    }
    options.minLevel = 8;

    $.TileSource.apply( this, [ options ] );

};

$.extend( $.OsmTileSource.prototype, $.TileSource.prototype, /** @lends OpenSeadragon.OsmTileSource.prototype */{


    /**
     * Determine if the data and/or url imply the image service is supported by
     * this tile source.
     * @function
     * @param {Object|Array} data
     * @param {String} optional - url
     */
    supports: function( data, url ){
        return (
            data.type &&
            "openstreetmaps" == data.type
        );
    },

    /**
     *
     * @function
     * @param {Object} data - the raw configuration
     * @param {String} url - the url the data was retreived from if any.
     * @return {Object} options - A dictionary of keyword arguments sufficient
     *      to configure this tile sources constructor.
     */
    configure: function( data, url ){
        return data;
    },


    /**
     * @function
     * @param {Number} level
     * @param {Number} x
     * @param {Number} y
     */
    getTileUrl: function( level, x, y ) {
        return this.tilesUrl + (level - 8) + "/" + x + "/" + y + ".png";
    }
});


}( OpenSeadragon ));

/*
 * OpenSeadragon - TmsTileSource
 *
 * Copyright (C) 2009 CodePlex Foundation
 * Copyright (C) 2010-2013 OpenSeadragon contributors
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are
 * met:
 *
 * - Redistributions of source code must retain the above copyright notice,
 *   this list of conditions and the following disclaimer.
 *
 * - Redistributions in binary form must reproduce the above copyright
 *   notice, this list of conditions and the following disclaimer in the
 *   documentation and/or other materials provided with the distribution.
 *
 * - Neither the name of CodePlex Foundation nor the names of its
 *   contributors may be used to endorse or promote products derived from
 *   this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
 * "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
 * LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
 * A PARTICULAR PURPOSE ARE DISCLAIMED.  IN NO EVENT SHALL THE COPYRIGHT
 * OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
 * SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED
 * TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
 * PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
 * LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 * NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

/*
 * Derived from the TMS tile source in Rainer Simon's seajax-utils project
 * <http://github.com/rsimon/seajax-utils>.  Rainer Simon has contributed
 * the included code to the OpenSeadragon project under the New BSD license;
 * see <https://github.com/openseadragon/openseadragon/issues/58>.
 */


(function( $ ){

/**
 * @class TmsTileSource
 * @classdesc A tilesource implementation for Tiled Map Services (TMS).
 * TMS tile scheme ( [ as supported by OpenLayers ] is described here
 * ( http://openlayers.org/dev/examples/tms.html ).
 *
 * @memberof OpenSeadragon
 * @extends OpenSeadragon.TileSource
 * @param {Number|Object} width - the pixel width of the image or the idiomatic
 *      options object which is used instead of positional arguments.
 * @param {Number} height
 * @param {Number} tileSize
 * @param {Number} tileOverlap
 * @param {String} tilesUrl
 */
$.TmsTileSource = function( width, height, tileSize, tileOverlap, tilesUrl ) {
    var options;

    if( $.isPlainObject( width ) ){
        options = width;
    }else{
        options = {
            width: arguments[0],
            height: arguments[1],
            tileSize: arguments[2],
            tileOverlap: arguments[3],
            tilesUrl: arguments[4]
        };
    }
    // TMS has integer multiples of 256 for width/height and adds buffer
    // if necessary -> account for this!
    var bufferedWidth = Math.ceil(options.width / 256) * 256,
        bufferedHeight = Math.ceil(options.height / 256) * 256,
        max;

    // Compute number of zoomlevels in this tileset
    if (bufferedWidth > bufferedHeight) {
        max = bufferedWidth / 256;
    } else {
        max = bufferedHeight / 256;
    }
    options.maxLevel = Math.ceil(Math.log(max)/Math.log(2)) - 1;
    options.tileSize = 256;
    options.width = bufferedWidth;
    options.height = bufferedHeight;

    $.TileSource.apply( this, [ options ] );

};

$.extend( $.TmsTileSource.prototype, $.TileSource.prototype, /** @lends OpenSeadragon.TmsTileSource.prototype */{


    /**
     * Determine if the data and/or url imply the image service is supported by
     * this tile source.
     * @function
     * @param {Object|Array} data
     * @param {String} optional - url
     */
    supports: function( data, url ){
        return ( data.type && "tiledmapservice" == data.type );
    },

    /**
     *
     * @function
     * @param {Object} data - the raw configuration
     * @param {String} url - the url the data was retreived from if any.
     * @return {Object} options - A dictionary of keyword arguments sufficient
     *      to configure this tile sources constructor.
     */
    configure: function( data, url ){
        return data;
    },


    /**
     * @function
     * @param {Number} level
     * @param {Number} x
     * @param {Number} y
     */
    getTileUrl: function( level, x, y ) {
        // Convert from Deep Zoom definition to TMS zoom definition
        var yTiles = this.getNumTiles( level ).y - 1;

        return this.tilesUrl + level + "/" + x + "/" +  (yTiles - y) + ".png";
    }
});


}( OpenSeadragon ));

/*
 * OpenSeadragon - LegacyTileSource
 *
 * Copyright (C) 2009 CodePlex Foundation
 * Copyright (C) 2010-2013 OpenSeadragon contributors
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are
 * met:
 *
 * - Redistributions of source code must retain the above copyright notice,
 *   this list of conditions and the following disclaimer.
 *
 * - Redistributions in binary form must reproduce the above copyright
 *   notice, this list of conditions and the following disclaimer in the
 *   documentation and/or other materials provided with the distribution.
 *
 * - Neither the name of CodePlex Foundation nor the names of its
 *   contributors may be used to endorse or promote products derived from
 *   this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
 * "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
 * LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
 * A PARTICULAR PURPOSE ARE DISCLAIMED.  IN NO EVENT SHALL THE COPYRIGHT
 * OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
 * SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED
 * TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
 * PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
 * LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 * NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

(function( $ ){

/**
 * @class LegacyTileSource
 * @classdesc The LegacyTileSource allows simple, traditional image pyramids to be loaded
 * into an OpenSeadragon Viewer.  Basically, this translates to the historically
 * common practice of starting with a 'master' image, maybe a tiff for example,
 * and generating a set of 'service' images like one or more thumbnails, a medium
 * resolution image and a high resolution image in standard web formats like
 * png or jpg.
 *
 * @memberof OpenSeadragon
 * @extends OpenSeadragon.TileSource
 * @param {Array} levels An array of file descriptions, each is an object with
 *      a 'url', a 'width', and a 'height'.  Overriding classes can expect more
 *      properties but these properties are sufficient for this implementation.
 *      Additionally, the levels are required to be listed in order from
 *      smallest to largest.
 * @property {Number} aspectRatio
 * @property {Number} dimensions
 * @property {Number} tileSize
 * @property {Number} tileOverlap
 * @property {Number} minLevel
 * @property {Number} maxLevel
 * @property {Array}  levels
 */
$.LegacyTileSource = function( levels ) {

    var options,
        width,
        height;

    if( $.isArray( levels ) ){
        options = {
            type: 'legacy-image-pyramid',
            levels: levels
        };
    }

    //clean up the levels to make sure we support all formats
    options.levels = filterFiles( options.levels );

    if ( options.levels.length > 0 ) {
        width = options.levels[ options.levels.length - 1 ].width;
        height = options.levels[ options.levels.length - 1 ].height;
    }
    else {
        width = 0;
        height = 0;
        $.console.error( "No supported image formats found" );
    }

    $.extend( true, options, {
        width: width,
        height: height,
        tileSize: Math.max( height, width ),
        tileOverlap: 0,
        minLevel: 0,
        maxLevel: options.levels.length > 0 ? options.levels.length - 1 : 0
    } );

    $.TileSource.apply( this, [ options ] );

    this.levels = options.levels;
};

$.extend( $.LegacyTileSource.prototype, $.TileSource.prototype, /** @lends OpenSeadragon.LegacyTileSource.prototype */{
    /**
     * Determine if the data and/or url imply the image service is supported by
     * this tile source.
     * @function
     * @param {Object|Array} data
     * @param {String} optional - url
     */
    supports: function( data, url ){
        return (
            data.type &&
            "legacy-image-pyramid" == data.type
        ) || (
            data.documentElement &&
            "legacy-image-pyramid" == data.documentElement.getAttribute('type')
        );
    },


    /**
     *
     * @function
     * @param {Object|XMLDocument} configuration - the raw configuration
     * @param {String} dataUrl - the url the data was retreived from if any.
     * @return {Object} options - A dictionary of keyword arguments sufficient
     *      to configure this tile sources constructor.
     */
    configure: function( configuration, dataUrl ){

        var options;

        if( !$.isPlainObject(configuration) ){

            options = configureFromXML( this, configuration );

        }else{

            options = configureFromObject( this, configuration );
        }

        return options;

    },

    /**
     * @function
     * @param {Number} level
     */
    getLevelScale: function ( level ) {
        var levelScale = NaN;
        if ( this.levels.length > 0 && level >= this.minLevel && level <= this.maxLevel ) {
            levelScale =
                this.levels[ level ].width /
                this.levels[ this.maxLevel ].width;
        }
        return levelScale;
    },

    /**
     * @function
     * @param {Number} level
     */
    getNumTiles: function( level ) {
        var scale = this.getLevelScale( level );
        if ( scale ){
            return new $.Point( 1, 1 );
        } else {
            return new $.Point( 0, 0 );
        }
    },

    /**
     * @function
     * @param {Number} level
     * @param {OpenSeadragon.Point} point
     */
    getTileAtPoint: function( level, point ) {
        return new $.Point( 0, 0 );
    },


    /**
     * This method is not implemented by this class other than to throw an Error
     * announcing you have to implement it.  Because of the variety of tile
     * server technologies, and various specifications for building image
     * pyramids, this method is here to allow easy integration.
     * @function
     * @param {Number} level
     * @param {Number} x
     * @param {Number} y
     * @throws {Error}
     */
    getTileUrl: function ( level, x, y ) {
        var url = null;
        if ( this.levels.length > 0 && level >= this.minLevel && level <= this.maxLevel ) {
            url = this.levels[ level ].url;
        }
        return url;
    }
} );

/**
 * This method removes any files from the Array which dont conform to our
 * basic requirements for a 'level' in the LegacyTileSource.
 * @private
 * @inner
 * @function
 */
function filterFiles( files ){
    var filtered = [],
        file,
        i;
    for( i = 0; i < files.length; i++ ){
        file = files[ i ];
        if( file.height &&
            file.width &&
            file.url && (
                file.url.toLowerCase().match(/^.*\.(png|jpg|jpeg|gif)$/) || (
                    file.mimetype &&
                    file.mimetype.toLowerCase().match(/^.*\/(png|jpg|jpeg|gif)$/)
                )
            ) ){
            //This is sufficient to serve as a level
            filtered.push({
                url: file.url,
                width: Number( file.width ),
                height: Number( file.height )
            });
        }
        else {
            $.console.error( 'Unsupported image format: %s', file.url ? file.url : '<no URL>' );
        }
    }

    return filtered.sort(function(a,b){
        return a.height - b.height;
    });

}

/**
 * @private
 * @inner
 * @function
 */
function configureFromXML( tileSource, xmlDoc ){

    if ( !xmlDoc || !xmlDoc.documentElement ) {
        throw new Error( $.getString( "Errors.Xml" ) );
    }

    var root         = xmlDoc.documentElement,
        rootName     = root.tagName,
        conf         = null,
        levels       = [],
        level,
        i;

    if ( rootName == "image" ) {

        try {
            conf = {
                type:        root.getAttribute( "type" ),
                levels:      []
            };

            levels = root.getElementsByTagName( "level" );
            for ( i = 0; i < levels.length; i++ ) {
                level = levels[ i ];

                conf.levels .push({
                    url:    level.getAttribute( "url" ),
                    width:  parseInt( level.getAttribute( "width" ), 10 ),
                    height: parseInt( level.getAttribute( "height" ), 10 )
                });
            }

            return configureFromObject( tileSource, conf );

        } catch ( e ) {
            throw (e instanceof Error) ?
                e :
                new Error( 'Unknown error parsing Legacy Image Pyramid XML.' );
        }
    } else if ( rootName == "collection" ) {
        throw new Error( 'Legacy Image Pyramid Collections not yet supported.' );
    } else if ( rootName == "error" ) {
        throw new Error( 'Error: ' + xmlDoc );
    }

    throw new Error( 'Unknown element ' + rootName );
}

/**
 * @private
 * @inner
 * @function
 */
function configureFromObject( tileSource, configuration ){

    return configuration.levels;

}

}( OpenSeadragon ));

/*
 * OpenSeadragon - TileSourceCollection
 *
 * Copyright (C) 2009 CodePlex Foundation
 * Copyright (C) 2010-2013 OpenSeadragon contributors
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are
 * met:
 *
 * - Redistributions of source code must retain the above copyright notice,
 *   this list of conditions and the following disclaimer.
 *
 * - Redistributions in binary form must reproduce the above copyright
 *   notice, this list of conditions and the following disclaimer in the
 *   documentation and/or other materials provided with the distribution.
 *
 * - Neither the name of CodePlex Foundation nor the names of its
 *   contributors may be used to endorse or promote products derived from
 *   this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
 * "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
 * LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
 * A PARTICULAR PURPOSE ARE DISCLAIMED.  IN NO EVENT SHALL THE COPYRIGHT
 * OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
 * SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED
 * TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
 * PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
 * LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 * NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

(function( $ ){

/**
 * @class TileSourceCollection
 * @memberof OpenSeadragon
 * @extends OpenSeadragon.TileSource
 */
$.TileSourceCollection = function( tileSize, tileSources, rows, layout  ) {
    var options;

    if( $.isPlainObject( tileSize ) ){
        options = tileSize;
    }else{
        options = {
            tileSize: arguments[ 0 ],
            tileSources: arguments[ 1 ],
            rows: arguments[ 2 ],
            layout: arguments[ 3 ]
        };
    }

    if( !options.layout ){
        options.layout = 'horizontal';
    }

    var minLevel = 0,
        levelSize = 1.0,
        tilesPerRow = Math.ceil( options.tileSources.length / options.rows ),
        longSide = tilesPerRow >= options.rows ?
            tilesPerRow :
            options.rows;

    if( 'horizontal' == options.layout ){
        options.width = ( options.tileSize ) * tilesPerRow;
        options.height = ( options.tileSize ) * options.rows;
    } else {
        options.height = ( options.tileSize ) * tilesPerRow;
        options.width = ( options.tileSize ) * options.rows;
    }

    options.tileOverlap = -options.tileMargin;
    options.tilesPerRow = tilesPerRow;

    //Set min level to avoid loading sublevels since collection is a
    //different kind of abstraction

    while( levelSize  <  ( options.tileSize ) * longSide ){
        //$.console.log( '%s levelSize %s minLevel %s', options.tileSize * longSide, levelSize, minLevel );
        levelSize = levelSize * 2.0;
        minLevel++;
    }
    options.minLevel = minLevel;

    //for( var name in options ){
    //    $.console.log( 'Collection %s %s', name, options[ name ] );
    //}

    $.TileSource.apply( this, [ options ] );

};

$.extend( $.TileSourceCollection.prototype, $.TileSource.prototype, /** @lends OpenSeadragon.TileSourceCollection.prototype */{

    /**
     * @function
     * @param {Number} level
     * @param {Number} x
     * @param {Number} y
     */
    getTileBounds: function( level, x, y ) {
        var dimensionsScaled = this.dimensions.times( this.getLevelScale( level ) ),
            px = this.tileSize * x - this.tileOverlap,
            py = this.tileSize * y - this.tileOverlap,
            sx = this.tileSize + 1 * this.tileOverlap,
            sy = this.tileSize + 1 * this.tileOverlap,
            scale = 1.0 / dimensionsScaled.x;

        sx = Math.min( sx, dimensionsScaled.x - px );
        sy = Math.min( sy, dimensionsScaled.y - py );

        return new $.Rect( px * scale, py * scale, sx * scale, sy * scale );
    },

    /**
     *
     * @function
     */
    configure: function( data, url ){
        return;
    },


    /**
     * @function
     * @param {Number} level
     * @param {Number} x
     * @param {Number} y
     */
    getTileUrl: function( level, x, y ) {
        //$.console.log([  level, '/', x, '_', y ].join( '' ));
        return null;
    }



});


}( OpenSeadragon ));

/*
 * OpenSeadragon - Button
 *
 * Copyright (C) 2009 CodePlex Foundation
 * Copyright (C) 2010-2013 OpenSeadragon contributors
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are
 * met:
 *
 * - Redistributions of source code must retain the above copyright notice,
 *   this list of conditions and the following disclaimer.
 *
 * - Redistributions in binary form must reproduce the above copyright
 *   notice, this list of conditions and the following disclaimer in the
 *   documentation and/or other materials provided with the distribution.
 *
 * - Neither the name of CodePlex Foundation nor the names of its
 *   contributors may be used to endorse or promote products derived from
 *   this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
 * "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
 * LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
 * A PARTICULAR PURPOSE ARE DISCLAIMED.  IN NO EVENT SHALL THE COPYRIGHT
 * OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
 * SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED
 * TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
 * PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
 * LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 * NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

(function( $ ){

/**
 * An enumeration of button states
 * @member ButtonState
 * @memberof OpenSeadragon
 * @static
 * @type {Object}
 * @property {Number} REST
 * @property {Number} GROUP
 * @property {Number} HOVER
 * @property {Number} DOWN
 */
$.ButtonState = {
    REST:   0,
    GROUP:  1,
    HOVER:  2,
    DOWN:   3
};

/**
 * @class Button
 * @classdesc Manages events, hover states for individual buttons, tool-tips, as well
 * as fading the buttons out when the user has not interacted with them
 * for a specified period.
 *
 * @memberof OpenSeadragon
 * @extends OpenSeadragon.EventSource
 * @param {Object} options
 * @param {Element} [options.element=null] Element to use as the button. If not specified, an HTML &lt;button&gt; element is created.
 * @param {String} [options.tooltip=null] Provides context help for the button when the
 *  user hovers over it.
 * @param {String} [options.srcRest=null] URL of image to use in 'rest' state.
 * @param {String} [options.srcGroup=null] URL of image to use in 'up' state.
 * @param {String} [options.srcHover=null] URL of image to use in 'hover' state.
 * @param {String} [options.srcDown=null] URL of image to use in 'down' state.
 * @param {Number} [options.fadeDelay=0] How long to wait before fading.
 * @param {Number} [options.fadeLength=2000] How long should it take to fade the button.
 * @param {OpenSeadragon.EventHandler} [options.onPress=null] Event handler callback for {@link OpenSeadragon.Button.event:press}.
 * @param {OpenSeadragon.EventHandler} [options.onRelease=null] Event handler callback for {@link OpenSeadragon.Button.event:release}.
 * @param {OpenSeadragon.EventHandler} [options.onClick=null] Event handler callback for {@link OpenSeadragon.Button.event:click}.
 * @param {OpenSeadragon.EventHandler} [options.onEnter=null] Event handler callback for {@link OpenSeadragon.Button.event:enter}.
 * @param {OpenSeadragon.EventHandler} [options.onExit=null] Event handler callback for {@link OpenSeadragon.Button.event:exit}.
 * @param {OpenSeadragon.EventHandler} [options.onFocus=null] Event handler callback for {@link OpenSeadragon.Button.event:focus}.
 * @param {OpenSeadragon.EventHandler} [options.onBlur=null] Event handler callback for {@link OpenSeadragon.Button.event:blur}.
 */
$.Button = function( options ) {

    var _this = this;

    $.EventSource.call( this );

    $.extend( true, this, {

        tooltip:            null,
        srcRest:            null,
        srcGroup:           null,
        srcHover:           null,
        srcDown:            null,
        clickTimeThreshold: $.DEFAULT_SETTINGS.clickTimeThreshold,
        clickDistThreshold: $.DEFAULT_SETTINGS.clickDistThreshold,
        /**
         * How long to wait before fading.
         * @member {Number} fadeDelay
         * @memberof OpenSeadragon.Button#
         */
        fadeDelay:          0,
        /**
         * How long should it take to fade the button.
         * @member {Number} fadeLength
         * @memberof OpenSeadragon.Button#
         */
        fadeLength:         2000,
        onPress:            null,
        onRelease:          null,
        onClick:            null,
        onEnter:            null,
        onExit:             null,
        onFocus:            null,
        onBlur:             null

    }, options );

    /**
     * The button element.
     * @member {Element} element
     * @memberof OpenSeadragon.Button#
     */
    this.element        = options.element   || $.makeNeutralElement( "button" );

    //if the user has specified the element to bind the control to explicitly
    //then do not add the default control images
    if( !options.element ){
        this.imgRest      = $.makeTransparentImage( this.srcRest );
        this.imgGroup     = $.makeTransparentImage( this.srcGroup );
        this.imgHover     = $.makeTransparentImage( this.srcHover );
        this.imgDown      = $.makeTransparentImage( this.srcDown );

        this.element.appendChild( this.imgRest );
        this.element.appendChild( this.imgGroup );
        this.element.appendChild( this.imgHover );
        this.element.appendChild( this.imgDown );

        this.imgGroup.style.position =
        this.imgHover.style.position =
        this.imgDown.style.position  =
            "absolute";

        this.imgGroup.style.top =
        this.imgHover.style.top =
        this.imgDown.style.top  =
            "0px";

        this.imgGroup.style.left =
        this.imgHover.style.left =
        this.imgDown.style.left  =
            "0px";

        this.imgHover.style.visibility =
        this.imgDown.style.visibility  =
            "hidden";

        if ( $.Browser.vendor == $.BROWSERS.FIREFOX  && $.Browser.version < 3 ){
            this.imgGroup.style.top =
            this.imgHover.style.top =
            this.imgDown.style.top  =
                "";
        }
    }


    this.addHandler( "press",     this.onPress );
    this.addHandler( "release",   this.onRelease );
    this.addHandler( "click",     this.onClick );
    this.addHandler( "enter",     this.onEnter );
    this.addHandler( "exit",      this.onExit );
    this.addHandler( "focus",     this.onFocus );
    this.addHandler( "blur",      this.onBlur );

    /**
     * The button's current state.
     * @member {OpenSeadragon.ButtonState} currentState
     * @memberof OpenSeadragon.Button#
     */
    this.currentState = $.ButtonState.GROUP;

    // When the button last began to fade.
    this.fadeBeginTime  = null;
    // Whether this button should fade after user stops interacting with the viewport.
    this.shouldFade     = false;

    this.element.style.display  = "inline-block";
    this.element.style.position = "relative";
    this.element.title          = this.tooltip;

    /**
     * Tracks mouse/touch/key events on the button.
     * @member {OpenSeadragon.MouseTracker} tracker
     * @memberof OpenSeadragon.Button#
     */
    this.tracker = new $.MouseTracker({

        element:            this.element,
        clickTimeThreshold: this.clickTimeThreshold,
        clickDistThreshold: this.clickDistThreshold,

        enterHandler: function( event ) {
            if ( event.insideElementPressed ) {
                inTo( _this, $.ButtonState.DOWN );
                /**
                 * Raised when the cursor enters the Button element.
                 *
                 * @event enter
                 * @memberof OpenSeadragon.Button
                 * @type {object}
                 * @property {OpenSeadragon.Button} eventSource - A reference to the Button which raised the event.
                 * @property {Object} originalEvent - The original DOM event.
                 * @property {?Object} userData - Arbitrary subscriber-defined object.
                 */
                _this.raiseEvent( "enter", { originalEvent: event.originalEvent } );
            } else if ( !event.buttonDownAny ) {
                inTo( _this, $.ButtonState.HOVER );
            }
        },

        focusHandler: function ( event ) {
            this.enterHandler( event );
            /**
             * Raised when the Button element receives focus.
             *
             * @event focus
             * @memberof OpenSeadragon.Button
             * @type {object}
             * @property {OpenSeadragon.Button} eventSource - A reference to the Button which raised the event.
             * @property {Object} originalEvent - The original DOM event.
             * @property {?Object} userData - Arbitrary subscriber-defined object.
             */
            _this.raiseEvent( "focus", { originalEvent: event.originalEvent } );
        },

        exitHandler: function( event ) {
            outTo( _this, $.ButtonState.GROUP );
            if ( event.insideElementPressed ) {
                /**
                 * Raised when the cursor leaves the Button element.
                 *
                 * @event exit
                 * @memberof OpenSeadragon.Button
                 * @type {object}
                 * @property {OpenSeadragon.Button} eventSource - A reference to the Button which raised the event.
                 * @property {Object} originalEvent - The original DOM event.
                 * @property {?Object} userData - Arbitrary subscriber-defined object.
                 */
                _this.raiseEvent( "exit", { originalEvent: event.originalEvent } );
            }
        },

        blurHandler: function ( event ) {
            this.exitHandler( event );
            /**
             * Raised when the Button element loses focus.
             *
             * @event blur
             * @memberof OpenSeadragon.Button
             * @type {object}
             * @property {OpenSeadragon.Button} eventSource - A reference to the Button which raised the event.
             * @property {Object} originalEvent - The original DOM event.
             * @property {?Object} userData - Arbitrary subscriber-defined object.
             */
            _this.raiseEvent( "blur", { originalEvent: event.originalEvent } );
        },

        pressHandler: function ( event ) {
            inTo( _this, $.ButtonState.DOWN );
            /**
             * Raised when a mouse button is pressed or touch occurs in the Button element.
             *
             * @event press
             * @memberof OpenSeadragon.Button
             * @type {object}
             * @property {OpenSeadragon.Button} eventSource - A reference to the Button which raised the event.
             * @property {Object} originalEvent - The original DOM event.
             * @property {?Object} userData - Arbitrary subscriber-defined object.
             */
            _this.raiseEvent( "press", { originalEvent: event.originalEvent } );
        },

        releaseHandler: function( event ) {
            if ( event.insideElementPressed && event.insideElementReleased ) {
                outTo( _this, $.ButtonState.HOVER );
                /**
                 * Raised when the mouse button is released or touch ends in the Button element.
                 *
                 * @event release
                 * @memberof OpenSeadragon.Button
                 * @type {object}
                 * @property {OpenSeadragon.Button} eventSource - A reference to the Button which raised the event.
                 * @property {Object} originalEvent - The original DOM event.
                 * @property {?Object} userData - Arbitrary subscriber-defined object.
                 */
                _this.raiseEvent( "release", { originalEvent: event.originalEvent } );
            } else if ( event.insideElementPressed ) {
                outTo( _this, $.ButtonState.GROUP );
            } else {
                inTo( _this, $.ButtonState.HOVER );
            }
        },

        clickHandler: function( event ) {
            if ( event.quick ) {
                /**
                 * Raised when a mouse button is pressed and released or touch is initiated and ended in the Button element within the time and distance threshold.
                 *
                 * @event click
                 * @memberof OpenSeadragon.Button
                 * @type {object}
                 * @property {OpenSeadragon.Button} eventSource - A reference to the Button which raised the event.
                 * @property {Object} originalEvent - The original DOM event.
                 * @property {?Object} userData - Arbitrary subscriber-defined object.
                 */
                _this.raiseEvent("click", { originalEvent: event.originalEvent });
            }
        },

        keyHandler: function( event ){
            //console.log( "%s : handling key %s!", _this.tooltip, event.keyCode);
            if( 13 === event.keyCode ){
                /***
                 * Raised when a mouse button is pressed and released or touch is initiated and ended in the Button element within the time and distance threshold.
                 *
                 * @event click
                 * @memberof OpenSeadragon.Button
                 * @type {object}
                 * @property {OpenSeadragon.Button} eventSource - A reference to the Button which raised the event.
                 * @property {Object} originalEvent - The original DOM event.
                 * @property {?Object} userData - Arbitrary subscriber-defined object.
                 */
                _this.raiseEvent( "click", { originalEvent: event.originalEvent } );
                /***
                 * Raised when the mouse button is released or touch ends in the Button element.
                 *
                 * @event release
                 * @memberof OpenSeadragon.Button
                 * @type {object}
                 * @property {OpenSeadragon.Button} eventSource - A reference to the Button which raised the event.
                 * @property {Object} originalEvent - The original DOM event.
                 * @property {?Object} userData - Arbitrary subscriber-defined object.
                 */
                _this.raiseEvent( "release", { originalEvent: event.originalEvent } );
                return false;
            }
            return true;
        }

    }).setTracking( true );

    outTo( this, $.ButtonState.REST );
};

$.extend( $.Button.prototype, $.EventSource.prototype, /** @lends OpenSeadragon.Button.prototype */{

    /**
     * TODO: Determine what this function is intended to do and if it's actually
     * useful as an API point.
     * @function
     */
    notifyGroupEnter: function() {
        inTo( this, $.ButtonState.GROUP );
    },

    /**
     * TODO: Determine what this function is intended to do and if it's actually
     * useful as an API point.
     * @function
     */
    notifyGroupExit: function() {
        outTo( this, $.ButtonState.REST );
    },

    /**
     * @function
     */
    disable: function(){
        this.notifyGroupExit();
        this.element.disabled = true;
        $.setElementOpacity( this.element, 0.2, true );
    },

    /**
     * @function
     */
    enable: function(){
        this.element.disabled = false;
        $.setElementOpacity( this.element, 1.0, true );
        this.notifyGroupEnter();
    }

});


function scheduleFade( button ) {
    $.requestAnimationFrame(function(){
        updateFade( button );
    });
}

function updateFade( button ) {
    var currentTime,
        deltaTime,
        opacity;

    if ( button.shouldFade ) {
        currentTime = $.now();
        deltaTime   = currentTime - button.fadeBeginTime;
        opacity     = 1.0 - deltaTime / button.fadeLength;
        opacity     = Math.min( 1.0, opacity );
        opacity     = Math.max( 0.0, opacity );

        if( button.imgGroup ){
            $.setElementOpacity( button.imgGroup, opacity, true );
        }
        if ( opacity > 0 ) {
            // fade again
            scheduleFade( button );
        }
    }
}

function beginFading( button ) {
    button.shouldFade = true;
    button.fadeBeginTime = $.now() + button.fadeDelay;
    window.setTimeout( function(){
        scheduleFade( button );
    }, button.fadeDelay );
}

function stopFading( button ) {
    button.shouldFade = false;
    if( button.imgGroup ){
        $.setElementOpacity( button.imgGroup, 1.0, true );
    }
}

function inTo( button, newState ) {

    if( button.element.disabled ){
        return;
    }

    if ( newState >= $.ButtonState.GROUP &&
         button.currentState == $.ButtonState.REST ) {
        stopFading( button );
        button.currentState = $.ButtonState.GROUP;
    }

    if ( newState >= $.ButtonState.HOVER &&
         button.currentState == $.ButtonState.GROUP ) {
        if( button.imgHover ){
            button.imgHover.style.visibility = "";
        }
        button.currentState = $.ButtonState.HOVER;
    }

    if ( newState >= $.ButtonState.DOWN &&
         button.currentState == $.ButtonState.HOVER ) {
        if( button.imgDown ){
            button.imgDown.style.visibility = "";
        }
        button.currentState = $.ButtonState.DOWN;
    }
}


function outTo( button, newState ) {

    if( button.element.disabled ){
        return;
    }

    if ( newState <= $.ButtonState.HOVER &&
         button.currentState == $.ButtonState.DOWN ) {
        if( button.imgDown ){
            button.imgDown.style.visibility = "hidden";
        }
        button.currentState = $.ButtonState.HOVER;
    }

    if ( newState <= $.ButtonState.GROUP &&
         button.currentState == $.ButtonState.HOVER ) {
        if( button.imgHover ){
            button.imgHover.style.visibility = "hidden";
        }
        button.currentState = $.ButtonState.GROUP;
    }

    if ( newState <= $.ButtonState.REST &&
         button.currentState == $.ButtonState.GROUP ) {
        beginFading( button );
        button.currentState = $.ButtonState.REST;
    }
}



}( OpenSeadragon ));

/*
 * OpenSeadragon - ButtonGroup
 *
 * Copyright (C) 2009 CodePlex Foundation
 * Copyright (C) 2010-2013 OpenSeadragon contributors
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are
 * met:
 *
 * - Redistributions of source code must retain the above copyright notice,
 *   this list of conditions and the following disclaimer.
 *
 * - Redistributions in binary form must reproduce the above copyright
 *   notice, this list of conditions and the following disclaimer in the
 *   documentation and/or other materials provided with the distribution.
 *
 * - Neither the name of CodePlex Foundation nor the names of its
 *   contributors may be used to endorse or promote products derived from
 *   this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
 * "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
 * LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
 * A PARTICULAR PURPOSE ARE DISCLAIMED.  IN NO EVENT SHALL THE COPYRIGHT
 * OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
 * SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED
 * TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
 * PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
 * LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 * NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

(function( $ ){
/**
 * @class ButtonGroup
 * @classdesc Manages events on groups of buttons.
 *
 * @memberof OpenSeadragon
 * @param {Object} options - A dictionary of settings applied against the entire group of buttons.
 * @param {Array} options.buttons Array of buttons
 * @param {Element} [options.element] Element to use as the container
 **/
$.ButtonGroup = function( options ) {

    $.extend( true, this, {
        /**
         * An array containing the buttons themselves.
         * @member {Array} buttons
         * @memberof OpenSeadragon.ButtonGroup#
         */
        buttons:            [],
        clickTimeThreshold: $.DEFAULT_SETTINGS.clickTimeThreshold,
        clickDistThreshold: $.DEFAULT_SETTINGS.clickDistThreshold,
        labelText:          ""
    }, options );

    // copy the button elements  TODO: Why?
    var buttons = this.buttons.concat([]),
        _this = this,
        i;

    /**
     * The shared container for the buttons.
     * @member {Element} element
     * @memberof OpenSeadragon.ButtonGroup#
     */
    this.element = options.element || $.makeNeutralElement( "fieldgroup" );

    // TODO What if there IS an options.group specified? 
    if( !options.group ){
        this.label   = $.makeNeutralElement( "label" );
        //TODO: support labels for ButtonGroups
        //this.label.innerHTML = this.labelText;
        this.element.style.display = "inline-block";
        this.element.appendChild( this.label );
        for ( i = 0; i < buttons.length; i++ ) {
            this.element.appendChild( buttons[ i ].element );
        }
    }

    /**
     * Tracks mouse/touch/key events accross the group of buttons.
     * @member {OpenSeadragon.MouseTracker} tracker
     * @memberof OpenSeadragon.ButtonGroup#
     */
    this.tracker = new $.MouseTracker({
        element:            this.element,
        clickTimeThreshold: this.clickTimeThreshold,
        clickDistThreshold: this.clickDistThreshold,
        enterHandler: function ( event ) {
            var i;
            for ( i = 0; i < _this.buttons.length; i++ ) {
                _this.buttons[ i ].notifyGroupEnter();
            }
        },
        exitHandler: function ( event ) {
            var i;
            if ( !event.insideElementPressed ) {
                for ( i = 0; i < _this.buttons.length; i++ ) {
                    _this.buttons[ i ].notifyGroupExit();
                }
            }
        },
        releaseHandler: function ( event ) {
            var i;
            if ( !event.insideElementReleased ) {
                for ( i = 0; i < _this.buttons.length; i++ ) {
                    _this.buttons[ i ].notifyGroupExit();
                }
            }
        }
    }).setTracking( true );
};

$.ButtonGroup.prototype = /** @lends OpenSeadragon.ButtonGroup.prototype */{

    /**
     * TODO: Figure out why this is used on the public API and if a more useful
     * api can be created.
     * @function
     * @private
     */
    emulateEnter: function() {
        this.tracker.enterHandler( { eventSource: this.tracker } );
    },

    /**
     * TODO: Figure out why this is used on the public API and if a more useful
     * api can be created.
     * @function
     * @private
     */
    emulateExit: function() {
        this.tracker.exitHandler( { eventSource: this.tracker } );
    }
};


}( OpenSeadragon ));

/*
 * OpenSeadragon - Rect
 *
 * Copyright (C) 2009 CodePlex Foundation
 * Copyright (C) 2010-2013 OpenSeadragon contributors
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are
 * met:
 *
 * - Redistributions of source code must retain the above copyright notice,
 *   this list of conditions and the following disclaimer.
 *
 * - Redistributions in binary form must reproduce the above copyright
 *   notice, this list of conditions and the following disclaimer in the
 *   documentation and/or other materials provided with the distribution.
 *
 * - Neither the name of CodePlex Foundation nor the names of its
 *   contributors may be used to endorse or promote products derived from
 *   this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
 * "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
 * LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
 * A PARTICULAR PURPOSE ARE DISCLAIMED.  IN NO EVENT SHALL THE COPYRIGHT
 * OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
 * SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED
 * TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
 * PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
 * LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 * NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

(function( $ ){

/**
 * @class Rect
 * @classdesc A Rectangle really represents a 2x2 matrix where each row represents a
 * 2 dimensional vector component, the first is (x,y) and the second is
 * (width, height).  The latter component implies the equation of a simple
 * plane.
 *
 * @memberof OpenSeadragon
 * @param {Number} x The vector component 'x'.
 * @param {Number} y The vector component 'y'.
 * @param {Number} width The vector component 'height'.
 * @param {Number} height The vector component 'width'.
 */
$.Rect = function( x, y, width, height ) {
    /**
     * The vector component 'x'.
     * @member {Number} x
     * @memberof OpenSeadragon.Rect#
     */
    this.x = typeof ( x ) == "number" ? x : 0;
    /**
     * The vector component 'y'.
     * @member {Number} y
     * @memberof OpenSeadragon.Rect#
     */
    this.y = typeof ( y ) == "number" ? y : 0;
    /**
     * The vector component 'width'.
     * @member {Number} width
     * @memberof OpenSeadragon.Rect#
     */
    this.width  = typeof ( width )  == "number" ? width : 0;
    /**
     * The vector component 'height'.
     * @member {Number} height
     * @memberof OpenSeadragon.Rect#
     */
    this.height = typeof ( height ) == "number" ? height : 0;
};

$.Rect.prototype = /** @lends OpenSeadragon.Rect.prototype */{

    /**
     * The aspect ratio is simply the ratio of width to height.
     * @function
     * @returns {Number} The ratio of width to height.
     */
    getAspectRatio: function() {
        return this.width / this.height;
    },

    /**
     * Provides the coordinates of the upper-left corner of the rectangle as a
     * point.
     * @function
     * @returns {OpenSeadragon.Point} The coordinate of the upper-left corner of
     *  the rectangle.
     */
    getTopLeft: function() {
        return new $.Point(
            this.x,
            this.y
        );
    },

    /**
     * Provides the coordinates of the bottom-right corner of the rectangle as a
     * point.
     * @function
     * @returns {OpenSeadragon.Point} The coordinate of the bottom-right corner of
     *  the rectangle.
     */
    getBottomRight: function() {
        return new $.Point(
            this.x + this.width,
            this.y + this.height
        );
    },

    /**
     * Provides the coordinates of the top-right corner of the rectangle as a
     * point.
     * @function
     * @returns {OpenSeadragon.Point} The coordinate of the top-right corner of
     *  the rectangle.
     */
    getTopRight: function() {
        return new $.Point(
            this.x + this.width,
            this.y
        );
    },

    /**
     * Provides the coordinates of the bottom-left corner of the rectangle as a
     * point.
     * @function
     * @returns {OpenSeadragon.Point} The coordinate of the bottom-left corner of
     *  the rectangle.
     */
    getBottomLeft: function() {
        return new $.Point(
            this.x,
            this.y + this.height
        );
    },

    /**
     * Computes the center of the rectangle.
     * @function
     * @returns {OpenSeadragon.Point} The center of the rectangle as represented
     *  as represented by a 2-dimensional vector (x,y)
     */
    getCenter: function() {
        return new $.Point(
            this.x + this.width / 2.0,
            this.y + this.height / 2.0
        );
    },

    /**
     * Returns the width and height component as a vector OpenSeadragon.Point
     * @function
     * @returns {OpenSeadragon.Point} The 2 dimensional vector representing the
     *  the width and height of the rectangle.
     */
    getSize: function() {
        return new $.Point( this.width, this.height );
    },

    /**
     * Determines if two Rectangles have equivalent components.
     * @function
     * @param {OpenSeadragon.Rect} rectangle The Rectangle to compare to.
     * @return {Boolean} 'true' if all components are equal, otherwise 'false'.
     */
    equals: function( other ) {
        return ( other instanceof $.Rect ) &&
            ( this.x === other.x ) &&
            ( this.y === other.y ) &&
            ( this.width === other.width ) &&
            ( this.height === other.height );
    },

    /**
     * Rotates a rectangle around a point. Currently only 90, 180, and 270
     * degrees are supported.
     * @function
     * @param {Number} degrees The angle in degrees to rotate.
     * @param {OpenSeadragon.Point} pivot The point about which to rotate.
     * Defaults to the center of the rectangle.
     * @return {OpenSeadragon.Rect}
     */
    rotate: function( degrees, pivot ) {
        // TODO support arbitrary rotation
        var width = this.width,
            height = this.height,
            newTopLeft;

        degrees = ( degrees + 360 ) % 360;
        if( degrees % 90 !== 0 ) {
            throw new Error('Currently only 0, 90, 180, and 270 degrees are supported.');
        }

        if( degrees === 0 ){
            return new $.Rect(
                this.x,
                this.y,
                this.width,
                this.height
            );
        }

        pivot = pivot || this.getCenter();

        switch ( degrees ) {
            case 90:
                newTopLeft = this.getBottomLeft();
                width = this.height;
                height = this.width;
                break;
            case 180:
                newTopLeft = this.getBottomRight();
                break;
            case 270:
                newTopLeft = this.getTopRight();
                width = this.height;
                height = this.width;
                break;
            default:
                newTopLeft = this.getTopLeft();
                break;
        }

        newTopLeft = newTopLeft.rotate(degrees, pivot);

        return new $.Rect(newTopLeft.x, newTopLeft.y, width, height);
    },

    /**
     * Provides a string representation of the rectangle which is useful for
     * debugging.
     * @function
     * @returns {String} A string representation of the rectangle.
     */
    toString: function() {
        return "[" +
            Math.round(this.x*100) + "," +
            Math.round(this.y*100) + "," +
            Math.round(this.width*100) + "x" +
            Math.round(this.height*100) +
        "]";
    }
};


}( OpenSeadragon ));

/*
 * OpenSeadragon - ReferenceStrip
 *
 * Copyright (C) 2009 CodePlex Foundation
 * Copyright (C) 2010-2013 OpenSeadragon contributors
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are
 * met:
 *
 * - Redistributions of source code must retain the above copyright notice,
 *   this list of conditions and the following disclaimer.
 *
 * - Redistributions in binary form must reproduce the above copyright
 *   notice, this list of conditions and the following disclaimer in the
 *   documentation and/or other materials provided with the distribution.
 *
 * - Neither the name of CodePlex Foundation nor the names of its
 *   contributors may be used to endorse or promote products derived from
 *   this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
 * "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
 * LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
 * A PARTICULAR PURPOSE ARE DISCLAIMED.  IN NO EVENT SHALL THE COPYRIGHT
 * OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
 * SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED
 * TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
 * PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
 * LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 * NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

(function ( $ ) {

// dictionary from id to private properties
var THIS = {};

/**
 *  The CollectionDrawer is a reimplementation if the Drawer API that
 *  focuses on allowing a viewport to be redefined as a collection
 *  of smaller viewports, defined by a clear number of rows and / or
 *  columns of which each item in the matrix of viewports has its own
 *  source.
 *
 *  This idea is a reexpression of the idea of dzi collections
 *  which allows a clearer algorithm to reuse the tile sources already
 *  supported by OpenSeadragon, in heterogenious or homogenious
 *  sequences just like mixed groups already supported by the viewer
 *  for the purpose of image sequnces.
 *
 *  TODO:   The difficult part of this feature is figuring out how to express
 *          this functionality as a combination of the functionality already
 *          provided by Drawer, Viewport, TileSource, and Navigator.  It may
 *          require better abstraction at those points in order to effeciently
 *          reuse those paradigms.
 */
/**
 * @class ReferenceStrip
 * @memberof OpenSeadragon
 * @param {Object} options
 */
$.ReferenceStrip = function ( options ) {

    var _this       = this,
        viewer      = options.viewer,
        viewerSize  = $.getElementSize( viewer.element ),
        element,
        style,
        i;

    //We may need to create a new element and id if they did not
    //provide the id for the existing element
    if ( !options.id ) {
        options.id              = 'referencestrip-' + $.now();
        this.element            = $.makeNeutralElement( "div" );
        this.element.id         = options.id;
        this.element.className  = 'referencestrip';
    }

    options = $.extend( true, {
        sizeRatio:  $.DEFAULT_SETTINGS.referenceStripSizeRatio,
        position:   $.DEFAULT_SETTINGS.referenceStripPosition,
        scroll:     $.DEFAULT_SETTINGS.referenceStripScroll,
        clickTimeThreshold:  $.DEFAULT_SETTINGS.clickTimeThreshold
    }, options, {
        //required overrides
        element:                this.element,
        //These need to be overridden to prevent recursion since
        //the navigator is a viewer and a viewer has a navigator
        showNavigator:          false,
        mouseNavEnabled:        false,
        showNavigationControl:  false,
        showSequenceControl:    false
    } );

    $.extend( this, options );
    //Private state properties
    THIS[this.id] = {
        "animating":           false
    };

    this.minPixelRatio = this.viewer.minPixelRatio;

    style = this.element.style;
    style.marginTop     = '0px';
    style.marginRight   = '0px';
    style.marginBottom  = '0px';
    style.marginLeft    = '0px';
    style.left          = '0px';
    style.bottom        = '0px';
    style.border        = '0px';
    style.background    = '#000';
    style.position      = 'relative';

    $.setElementOpacity( this.element, 0.8 );

    this.viewer = viewer;
    this.innerTracker = new $.MouseTracker( {
        element:        this.element,
        dragHandler:    $.delegate( this, onStripDrag ),
        scrollHandler:  $.delegate( this, onStripScroll ),
        enterHandler:   $.delegate( this, onStripEnter ),
        exitHandler:    $.delegate( this, onStripExit ),
        keyHandler:     $.delegate( this, onKeyPress )
    } ).setTracking( true );

    //Controls the position and orientation of the reference strip and sets the
    //appropriate width and height
    if ( options.width && options.height ) {
        this.element.style.width  = options.width + 'px';
        this.element.style.height = options.height + 'px';
        viewer.addControl(
            this.element,
            { anchor: $.ControlAnchor.BOTTOM_LEFT }
        );
    } else {
        if ( "horizontal" == options.scroll ) {
            this.element.style.width = (
                viewerSize.x *
                options.sizeRatio *
                viewer.tileSources.length
            ) + ( 12 * viewer.tileSources.length ) + 'px';

            this.element.style.height = (
                viewerSize.y *
                options.sizeRatio
            ) + 'px';

            viewer.addControl(
                this.element,
                { anchor: $.ControlAnchor.BOTTOM_LEFT }
            );
        } else {
            this.element.style.height = (
                viewerSize.y *
                options.sizeRatio *
                viewer.tileSources.length
            ) + ( 12 * viewer.tileSources.length ) + 'px';

            this.element.style.width = (
                viewerSize.x *
                options.sizeRatio
            ) + 'px';

            viewer.addControl(
                this.element,
                { anchor: $.ControlAnchor.TOP_LEFT }
            );

        }
    }

    this.panelWidth = ( viewerSize.x * this.sizeRatio ) + 8;
    this.panelHeight = ( viewerSize.y * this.sizeRatio ) + 8;
    this.panels = [];

    /*jshint loopfunc:true*/
    for ( i = 0; i < viewer.tileSources.length; i++ ) {

        element = $.makeNeutralElement( 'div' );
        element.id = this.element.id + "-" + i;

        element.style.width         = _this.panelWidth + 'px';
        element.style.height        = _this.panelHeight + 'px';
        element.style.display       = 'inline';
        element.style.float         = 'left'; //Webkit
        element.style.cssFloat      = 'left'; //Firefox
        element.style.styleFloat    = 'left'; //IE
        element.style.padding       = '2px';

        element.innerTracker = new $.MouseTracker( {
            element:            element,
            clickTimeThreshold: this.clickTimeThreshold,
            clickDistThreshold: this.clickDistThreshold,
            pressHandler: function ( event ) {
                event.eventSource.dragging = $.now();
            },
            releaseHandler: function ( event ) {
                var tracker = event.eventSource,
                    id      = tracker.element.id,
                    page    = Number( id.split( '-' )[2] ),
                    now     = $.now();

                if ( event.insideElementPressed &&
                     event.insideElementReleased &&
                     tracker.dragging &&
                     ( now - tracker.dragging ) < tracker.clickTimeThreshold ) {
                    tracker.dragging = null;
                    viewer.goToPage( page );
                }
            }
        } ).setTracking( true );

        this.element.appendChild( element );

        element.activePanel = false;

        this.panels.push( element );

    }
    loadPanels( this, this.scroll == 'vertical' ? viewerSize.y : viewerSize.y, 0 );
    this.setFocus( 0 );

};

$.extend( $.ReferenceStrip.prototype, $.EventSource.prototype, $.Viewer.prototype, /** @lends OpenSeadragon.ReferenceStrip.prototype */{

    /**
     * @function
     */
    setFocus: function ( page ) {
        var element      = $.getElement( this.element.id + '-' + page ),
            viewerSize   = $.getElementSize( this.viewer.canvas ),
            scrollWidth  = Number( this.element.style.width.replace( 'px', '' ) ),
            scrollHeight = Number( this.element.style.height.replace( 'px', '' ) ),
            offsetLeft   = -Number( this.element.style.marginLeft.replace( 'px', '' ) ),
            offsetTop    = -Number( this.element.style.marginTop.replace( 'px', '' ) ),
            offset;

        if ( this.currentSelected !== element ) {
            if ( this.currentSelected ) {
                this.currentSelected.style.background = '#000';
            }
            this.currentSelected = element;
            this.currentSelected.style.background = '#999';

            if ( 'horizontal' == this.scroll ) {
                //right left
                offset = ( Number( page ) ) * ( this.panelWidth + 3 );
                if ( offset > offsetLeft + viewerSize.x - this.panelWidth ) {
                    offset = Math.min( offset, ( scrollWidth - viewerSize.x ) );
                    this.element.style.marginLeft = -offset + 'px';
                    loadPanels( this, viewerSize.x, -offset );
                } else if ( offset < offsetLeft ) {
                    offset = Math.max( 0, offset - viewerSize.x / 2 );
                    this.element.style.marginLeft = -offset + 'px';
                    loadPanels( this, viewerSize.x, -offset );
                }
            } else {
                offset = ( Number( page ) ) * ( this.panelHeight + 3 );
                if ( offset > offsetTop + viewerSize.y - this.panelHeight ) {
                    offset = Math.min( offset, ( scrollHeight - viewerSize.y ) );
                    this.element.style.marginTop = -offset + 'px';
                    loadPanels( this, viewerSize.y, -offset );
                } else if ( offset < offsetTop ) {
                    offset = Math.max( 0, offset - viewerSize.y / 2 );
                    this.element.style.marginTop = -offset + 'px';
                    loadPanels( this, viewerSize.y, -offset );
                }
            }

            this.currentPage = page;
            $.getElement( element.id + '-displayregion' ).focus();
            onStripEnter.call( this, { eventSource: this.innerTracker } );
        }
    },

    /**
     * @function
     */
    update: function () {
        if ( THIS[this.id].animating ) {
            $.console.log( 'image reference strip update' );
            return true;
        }
        return false;
    }

} );




/**
 * @private
 * @inner
 * @function
 */
function onStripDrag( event ) {

    var offsetLeft   = Number( this.element.style.marginLeft.replace( 'px', '' ) ),
        offsetTop    = Number( this.element.style.marginTop.replace( 'px', '' ) ),
        scrollWidth  = Number( this.element.style.width.replace( 'px', '' ) ),
        scrollHeight = Number( this.element.style.height.replace( 'px', '' ) ),
        viewerSize   = $.getElementSize( this.viewer.canvas );
    this.dragging = true;
    if ( this.element ) {
        if ( 'horizontal' == this.scroll ) {
            if ( -event.delta.x > 0 ) {
                //forward
                if ( offsetLeft > -( scrollWidth - viewerSize.x ) ) {
                    this.element.style.marginLeft = ( offsetLeft + ( event.delta.x * 2 ) ) + 'px';
                    loadPanels( this, viewerSize.x, offsetLeft + ( event.delta.x * 2 ) );
                }
            } else if ( -event.delta.x < 0 ) {
                //reverse
                if ( offsetLeft < 0 ) {
                    this.element.style.marginLeft = ( offsetLeft + ( event.delta.x * 2 ) ) + 'px';
                    loadPanels( this, viewerSize.x, offsetLeft + ( event.delta.x * 2 ) );
                }
            }
        } else {
            if ( -event.delta.y > 0 ) {
                //forward
                if ( offsetTop > -( scrollHeight - viewerSize.y ) ) {
                    this.element.style.marginTop = ( offsetTop + ( event.delta.y * 2 ) ) + 'px';
                    loadPanels( this, viewerSize.y, offsetTop + ( event.delta.y * 2 ) );
                }
            } else if ( -event.delta.y < 0 ) {
                //reverse
                if ( offsetTop < 0 ) {
                    this.element.style.marginTop = ( offsetTop + ( event.delta.y * 2 ) ) + 'px';
                    loadPanels( this, viewerSize.y, offsetTop + ( event.delta.y * 2 ) );
                }
            }
        }
    }
    return false;

}



/**
 * @private
 * @inner
 * @function
 */
function onStripScroll( event ) {
    var offsetLeft   = Number( this.element.style.marginLeft.replace( 'px', '' ) ),
        offsetTop    = Number( this.element.style.marginTop.replace( 'px', '' ) ),
        scrollWidth  = Number( this.element.style.width.replace( 'px', '' ) ),
        scrollHeight = Number( this.element.style.height.replace( 'px', '' ) ),
        viewerSize   = $.getElementSize( this.viewer.canvas );
    if ( this.element ) {
        if ( 'horizontal' == this.scroll ) {
            if ( event.scroll > 0 ) {
                //forward
                if ( offsetLeft > -( scrollWidth - viewerSize.x ) ) {
                    this.element.style.marginLeft = ( offsetLeft - ( event.scroll * 60 ) ) + 'px';
                    loadPanels( this, viewerSize.x, offsetLeft - ( event.scroll * 60 ) );
                }
            } else if ( event.scroll < 0 ) {
                //reverse
                if ( offsetLeft < 0 ) {
                    this.element.style.marginLeft = ( offsetLeft - ( event.scroll * 60 ) ) + 'px';
                    loadPanels( this, viewerSize.x, offsetLeft - ( event.scroll * 60 ) );
                }
            }
        } else {
            if ( event.scroll < 0 ) {
                //scroll up
                if ( offsetTop > viewerSize.y - scrollHeight ) {
                    this.element.style.marginTop = ( offsetTop + ( event.scroll * 60 ) ) + 'px';
                    loadPanels( this, viewerSize.y, offsetTop + ( event.scroll * 60 ) );
                }
            } else if ( event.scroll > 0 ) {
                //scroll dowm
                if ( offsetTop < 0 ) {
                    this.element.style.marginTop = ( offsetTop + ( event.scroll * 60 ) ) + 'px';
                    loadPanels( this, viewerSize.y, offsetTop + ( event.scroll * 60 ) );
                }
            }
        }
    }
    //cancels event
    return false;
}


function loadPanels( strip, viewerSize, scroll ) {
    var panelSize,
        activePanelsStart,
        activePanelsEnd,
        miniViewer,
        style,
        i,
        element;
    if ( 'horizontal' == strip.scroll ) {
        panelSize = strip.panelWidth;
    } else {
        panelSize = strip.panelHeight;
    }
    activePanelsStart = Math.ceil( viewerSize / panelSize ) + 5;
    activePanelsEnd = Math.ceil( ( Math.abs( scroll ) + viewerSize ) / panelSize ) + 1;
    activePanelsStart = activePanelsEnd - activePanelsStart;
    activePanelsStart = activePanelsStart < 0 ? 0 : activePanelsStart;

    for ( i = activePanelsStart; i < activePanelsEnd && i < strip.panels.length; i++ ) {
        element = strip.panels[i];
        if ( !element.activePanel ) {
            miniViewer = new $.Viewer( {
                id:                     element.id,
                tileSources:            [strip.viewer.tileSources[i]],
                element:                element,
                navigatorSizeRatio:     strip.sizeRatio,
                showNavigator:          false,
                mouseNavEnabled:        false,
                showNavigationControl:  false,
                showSequenceControl:    false,
                immediateRender:        true,
                blendTime:              0,
                animationTime:          0
            } );

            miniViewer.displayRegion           = $.makeNeutralElement( "textarea" );
            miniViewer.displayRegion.id        = element.id + '-displayregion';
            miniViewer.displayRegion.className = 'displayregion';

            style               = miniViewer.displayRegion.style;
            style.position      = 'relative';
            style.top           = '0px';
            style.left          = '0px';
            style.fontSize      = '0px';
            style.overflow      = 'hidden';
            style.float         = 'left'; //Webkit
            style.cssFloat      = 'left'; //Firefox
            style.styleFloat    = 'left'; //IE
            style.zIndex        = 999999999;
            style.cursor        = 'default';
            style.width         = ( strip.panelWidth - 4 ) + 'px';
            style.height        = ( strip.panelHeight - 4 ) + 'px';

            miniViewer.displayRegion.innerTracker = new $.MouseTracker( {
                element: miniViewer.displayRegion
            } );

            element.getElementsByTagName( 'form' )[0].appendChild(
                miniViewer.displayRegion
            );

            element.activePanel = true;
        }
    }
}


/**
 * @private
 * @inner
 * @function
 */
function onStripEnter( event ) {
    var element = event.eventSource.element;
    
    //$.setElementOpacity(element, 0.8);

    //element.style.border = '1px solid #555';
    //element.style.background = '#000';

    if ( 'horizontal' == this.scroll ) {

        //element.style.paddingTop = "0px";
        element.style.marginBottom = "0px";

    } else {

        //element.style.paddingRight = "0px";
        element.style.marginLeft = "0px";

    }
    return false;
}


/**
 * @private
 * @inner
 * @function
 */
function onStripExit( event ) {
    var element = event.eventSource.element;
    
    if ( 'horizontal' == this.scroll ) {

        //element.style.paddingTop = "10px";
        element.style.marginBottom = "-" + ( $.getElementSize( element ).y / 2 ) + "px";

    } else {

        //element.style.paddingRight = "10px";
        element.style.marginLeft = "-" + ( $.getElementSize( element ).x / 2 ) + "px";

    }
    return false;
}



/**
 * @private
 * @inner
 * @function
 */
function onKeyPress( event ) {
    //console.log( event.keyCode );

    switch ( event.keyCode ) {
        case 61: //=|+
            onStripScroll.call( this, { eventSource: this.tracker, position: null, scroll: 1, shift: null } );
            return false;
        case 45: //-|_
            onStripScroll.call( this, { eventSource: this.tracker, position: null, scroll: -1, shift: null } );
            return false;
        case 48: //0|)
        case 119: //w
        case 87: //W
        case 38: //up arrow
            onStripScroll.call( this, { eventSource: this.tracker, position: null, scroll: 1, shift: null } );
            return false;
        case 115: //s
        case 83: //S
        case 40: //down arrow
            onStripScroll.call( this, { eventSource: this.tracker, position: null, scroll: -1, shift: null } );
            return false;
        case 97: //a
        case 37: //left arrow
            onStripScroll.call( this, { eventSource: this.tracker, position: null, scroll: -1, shift: null } );
            return false;
        case 100: //d
        case 39: //right arrow
            onStripScroll.call( this, { eventSource: this.tracker, position: null, scroll: 1, shift: null } );
            return false;
        default:
            //console.log( 'navigator keycode %s', event.keyCode );
            return true;
    }
}



} ( OpenSeadragon ) );

/*
 * OpenSeadragon - DisplayRect
 *
 * Copyright (C) 2009 CodePlex Foundation
 * Copyright (C) 2010-2013 OpenSeadragon contributors
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are
 * met:
 *
 * - Redistributions of source code must retain the above copyright notice,
 *   this list of conditions and the following disclaimer.
 *
 * - Redistributions in binary form must reproduce the above copyright
 *   notice, this list of conditions and the following disclaimer in the
 *   documentation and/or other materials provided with the distribution.
 *
 * - Neither the name of CodePlex Foundation nor the names of its
 *   contributors may be used to endorse or promote products derived from
 *   this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
 * "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
 * LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
 * A PARTICULAR PURPOSE ARE DISCLAIMED.  IN NO EVENT SHALL THE COPYRIGHT
 * OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
 * SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED
 * TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
 * PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
 * LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 * NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

(function( $ ){

/**
 * @class DisplayRect
 * @classdesc A display rectangle is very similar to {@link OpenSeadragon.Rect} but adds two
 * fields, 'minLevel' and 'maxLevel' which denote the supported zoom levels
 * for this rectangle.
 *
 * @memberof OpenSeadragon
 * @extends OpenSeadragon.Rect
 * @param {Number} x The vector component 'x'.
 * @param {Number} y The vector component 'y'.
 * @param {Number} width The vector component 'height'.
 * @param {Number} height The vector component 'width'.
 * @param {Number} minLevel The lowest zoom level supported.
 * @param {Number} maxLevel The highest zoom level supported.
 */
$.DisplayRect = function( x, y, width, height, minLevel, maxLevel ) {
    $.Rect.apply( this, [ x, y, width, height ] );

    /**
     * The lowest zoom level supported.
     * @member {Number} minLevel
     * @memberof OpenSeadragon.DisplayRect#
     */
    this.minLevel = minLevel;
    /**
     * The highest zoom level supported.
     * @member {Number} maxLevel
     * @memberof OpenSeadragon.DisplayRect#
     */
    this.maxLevel = maxLevel;
};

$.extend( $.DisplayRect.prototype, $.Rect.prototype );

}( OpenSeadragon ));

/*
 * OpenSeadragon - Spring
 *
 * Copyright (C) 2009 CodePlex Foundation
 * Copyright (C) 2010-2013 OpenSeadragon contributors
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are
 * met:
 *
 * - Redistributions of source code must retain the above copyright notice,
 *   this list of conditions and the following disclaimer.
 *
 * - Redistributions in binary form must reproduce the above copyright
 *   notice, this list of conditions and the following disclaimer in the
 *   documentation and/or other materials provided with the distribution.
 *
 * - Neither the name of CodePlex Foundation nor the names of its
 *   contributors may be used to endorse or promote products derived from
 *   this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
 * "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
 * LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
 * A PARTICULAR PURPOSE ARE DISCLAIMED.  IN NO EVENT SHALL THE COPYRIGHT
 * OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
 * SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED
 * TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
 * PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
 * LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 * NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

(function( $ ){

/**
 * @class Spring
 * @memberof OpenSeadragon
 * @param {Object} options - Spring configuration settings.
 * @param {Number} options.initial - Initial value of spring, default to 0 so
 *  spring is not in motion initally by default.
 * @param {Number} options.springStiffness - Spring stiffness.
 * @param {Number} options.animationTime - Animation duration per spring.
 */
$.Spring = function( options ) {
    var args = arguments;

    if( typeof( options ) != 'object' ){
        //allows backward compatible use of ( initialValue, config ) as
        //constructor parameters
        options = {
            initial: args.length && typeof ( args[ 0 ] ) == "number" ?
                args[ 0 ] :
                0,
            /**
             * Spring stiffness.
             * @member {Number} springStiffness
             * @memberof OpenSeadragon.Spring#
             */
            springStiffness: args.length > 1 ?
                args[ 1 ].springStiffness :
                5.0,
            /**
             * Animation duration per spring.
             * @member {Number} animationTime
             * @memberof OpenSeadragon.Spring#
             */
            animationTime: args.length > 1 ?
                args[ 1 ].animationTime :
                1.5
        };
    }

    $.extend( true, this, options);

    /**
     * @member {Object} current
     * @memberof OpenSeadragon.Spring#
     * @property {Number} value
     * @property {Number} time
     */
    this.current = {
        value: typeof ( this.initial ) == "number" ?
            this.initial :
            0,
        time:  $.now() // always work in milliseconds
    };

    /**
     * @member {Object} start
     * @memberof OpenSeadragon.Spring#
     * @property {Number} value
     * @property {Number} time
     */
    this.start = {
        value: this.current.value,
        time:  this.current.time
    };

    /**
     * @member {Object} target
     * @memberof OpenSeadragon.Spring#
     * @property {Number} value
     * @property {Number} time
     */
    this.target = {
        value: this.current.value,
        time:  this.current.time
    };
};

$.Spring.prototype = /** @lends OpenSeadragon.Spring.prototype */{

    /**
     * @function
     * @param {Number} target
     */
    resetTo: function( target ) {
        this.target.value = target;
        this.target.time  = this.current.time;
        this.start.value  = this.target.value;
        this.start.time   = this.target.time;
    },

    /**
     * @function
     * @param {Number} target
     */
    springTo: function( target ) {
        this.start.value  = this.current.value;
        this.start.time   = this.current.time;
        this.target.value = target;
        this.target.time  = this.start.time + 1000 * this.animationTime;
    },

    /**
     * @function
     * @param {Number} delta
     */
    shiftBy: function( delta ) {
        this.start.value  += delta;
        this.target.value += delta;
    },

    /**
     * @function
     */
    update: function() {
        this.current.time  = $.now();
        this.current.value = (this.current.time >= this.target.time) ?
            this.target.value :
            this.start.value +
                ( this.target.value - this.start.value ) *
                transform(
                    this.springStiffness,
                    ( this.current.time - this.start.time ) /
                    ( this.target.time  - this.start.time )
                );
    }
};

/**
 * @private
 */
function transform( stiffness, x ) {
    return ( 1.0 - Math.exp( stiffness * -x ) ) /
        ( 1.0 - Math.exp( -stiffness ) );
}

}( OpenSeadragon ));

/*
 * OpenSeadragon - Tile
 *
 * Copyright (C) 2009 CodePlex Foundation
 * Copyright (C) 2010-2013 OpenSeadragon contributors
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are
 * met:
 *
 * - Redistributions of source code must retain the above copyright notice,
 *   this list of conditions and the following disclaimer.
 *
 * - Redistributions in binary form must reproduce the above copyright
 *   notice, this list of conditions and the following disclaimer in the
 *   documentation and/or other materials provided with the distribution.
 *
 * - Neither the name of CodePlex Foundation nor the names of its
 *   contributors may be used to endorse or promote products derived from
 *   this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
 * "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
 * LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
 * A PARTICULAR PURPOSE ARE DISCLAIMED.  IN NO EVENT SHALL THE COPYRIGHT
 * OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
 * SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED
 * TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
 * PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
 * LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 * NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

(function( $ ){
    var TILE_CACHE       = {};
/**
 * @class Tile
 * @memberof OpenSeadragon
 * @param {Number} level The zoom level this tile belongs to.
 * @param {Number} x The vector component 'x'.
 * @param {Number} y The vector component 'y'.
 * @param {OpenSeadragon.Point} bounds Where this tile fits, in normalized
 *      coordinates.
 * @param {Boolean} exists Is this tile a part of a sparse image? ( Also has
 *      this tile failed to load? )
 * @param {String} url The URL of this tile's image.
 */
$.Tile = function(level, x, y, bounds, exists, url) {
    /**
     * The zoom level this tile belongs to.
     * @member {Number} level
     * @memberof OpenSeadragon.Tile#
     */
    this.level   = level;
    /**
     * The vector component 'x'.
     * @member {Number} x
     * @memberof OpenSeadragon.Tile#
     */
    this.x       = x;
    /**
     * The vector component 'y'.
     * @member {Number} y
     * @memberof OpenSeadragon.Tile#
     */
    this.y       = y;
    /**
     * Where this tile fits, in normalized coordinates
     * @member {OpenSeadragon.Point} bounds
     * @memberof OpenSeadragon.Tile#
     */
    this.bounds  = bounds;
    /**
     * Is this tile a part of a sparse image? Also has this tile failed to load?
     * @member {Boolean} exists
     * @memberof OpenSeadragon.Tile#
     */
    this.exists  = exists;
    /**
     * The URL of this tile's image.
     * @member {String} url
     * @memberof OpenSeadragon.Tile#
     */
    this.url     = url;
    /**
     * Is this tile loaded?
     * @member {Boolean} loaded
     * @memberof OpenSeadragon.Tile#
     */
    this.loaded  = false;
    /**
     * Is this tile loading?
     * @member {Boolean} loading
     * @memberof OpenSeadragon.Tile#
     */
    this.loading = false;

    /**
     * The HTML div element for this tile
     * @member {Element} element
     * @memberof OpenSeadragon.Tile#
     */
    this.element    = null;
    /**
     * The HTML img element for this tile.
     * @member {Element} imgElement
     * @memberof OpenSeadragon.Tile#
     */
    this.imgElement = null;
    /**
     * The Image object for this tile.
     * @member {Object} image
     * @memberof OpenSeadragon.Tile#
     */
    this.image      = null;

    /**
     * The alias of this.element.style.
     * @member {String} style
     * @memberof OpenSeadragon.Tile#
     */
    this.style      = null;
    /**
     * This tile's position on screen, in pixels.
     * @member {OpenSeadragon.Point} position
     * @memberof OpenSeadragon.Tile#
     */
    this.position   = null;
    /**
     * This tile's size on screen, in pixels.
     * @member {OpenSeadragon.Point} size
     * @memberof OpenSeadragon.Tile#
     */
    this.size       = null;
    /**
     * The start time of this tile's blending.
     * @member {Number} blendStart
     * @memberof OpenSeadragon.Tile#
     */
    this.blendStart = null;
    /**
     * The current opacity this tile should be.
     * @member {Number} opacity
     * @memberof OpenSeadragon.Tile#
     */
    this.opacity    = null;
    /**
     * The distance of this tile to the viewport center.
     * @member {Number} distance
     * @memberof OpenSeadragon.Tile#
     */
    this.distance   = null;
    /**
     * The visibility score of this tile.
     * @member {Number} visibility
     * @memberof OpenSeadragon.Tile#
     */
    this.visibility = null;

    /**
     * Whether this tile is currently being drawn.
     * @member {Boolean} beingDrawn
     * @memberof OpenSeadragon.Tile#
     */
    this.beingDrawn     = false;
    /**
     * Timestamp the tile was last touched.
     * @member {Number} lastTouchTime
     * @memberof OpenSeadragon.Tile#
     */
    this.lastTouchTime  = 0;
};

$.Tile.prototype = /** @lends OpenSeadragon.Tile.prototype */{

    /**
     * Provides a string representation of this tiles level and (x,y)
     * components.
     * @function
     * @returns {String}
     */
    toString: function() {
        return this.level + "/" + this.x + "_" + this.y;
    },

    /**
     * Renders the tile in an html container.
     * @function
     * @param {Element} container
     */
    drawHTML: function( container ) {
        if ( !this.loaded || !this.image ) {
            $.console.warn(
                "Attempting to draw tile %s when it's not yet loaded.",
                this.toString()
            );
            return;
        }

        //EXPERIMENTAL - trying to figure out how to scale the container
        //               content during animation of the container size.

        if ( !this.element ) {
            this.element                              = $.makeNeutralElement( "div" );
            this.imgElement                           = $.makeNeutralElement( "img" );
            this.imgElement.src                       = this.url;
            this.imgElement.style.msInterpolationMode = "nearest-neighbor";
            this.imgElement.style.width               = "100%";
            this.imgElement.style.height              = "100%";

            this.style                     = this.element.style;
            this.style.position            = "absolute";
        }
        if ( this.element.parentNode != container ) {
            container.appendChild( this.element );
        }
        if ( this.imgElement.parentNode != this.element ) {
            this.element.appendChild( this.imgElement );
        }

        this.style.top     = this.position.y + "px";
        this.style.left    = this.position.x + "px";
        this.style.height  = this.size.y + "px";
        this.style.width   = this.size.x + "px";

        $.setElementOpacity( this.element, this.opacity );
    },

    /**
     * Renders the tile in a canvas-based context.
     * @function
     * @param {Canvas} context
     */
    drawCanvas: function( context ) {

        var position = this.position,
            size     = this.size,
            rendered,
            canvas;

        if ( !this.loaded || !( this.image || TILE_CACHE[ this.url ] ) ){
            $.console.warn(
                "Attempting to draw tile %s when it's not yet loaded.",
                this.toString()
            );
            return;
        }
        context.globalAlpha = this.opacity;

        //context.save();

        //if we are supposed to be rendering fully opaque rectangle,
        //ie its done fading or fading is turned off, and if we are drawing
        //an image with an alpha channel, then the only way
        //to avoid seeing the tile underneath is to clear the rectangle
        if( context.globalAlpha == 1 && this.url.match('.png') ){
            //clearing only the inside of the rectangle occupied
            //by the png prevents edge flikering
            context.clearRect(
                position.x+1,
                position.y+1,
                size.x-2,
                size.y-2
            );

        }

        if( !TILE_CACHE[ this.url ] ){
            canvas = document.createElement( 'canvas' );
            canvas.width = this.image.width;
            canvas.height = this.image.height;
            rendered = canvas.getContext('2d');
            rendered.drawImage( this.image, 0, 0 );
            TILE_CACHE[ this.url ] = rendered;
            //since we are caching the prerendered image on a canvas
            //allow the image to not be held in memory
            this.image = null;
        }

        rendered = TILE_CACHE[ this.url ];

        //rendered.save();
        context.drawImage(
            rendered.canvas,
            0,
            0,
            rendered.canvas.width,
            rendered.canvas.height,
            position.x,
            position.y,
            size.x,
            size.y
        );
        //rendered.restore();

        //context.restore();
    },

    /**
     * Removes tile from it's contianer.
     * @function
     */
    unload: function() {
        if ( this.imgElement && this.imgElement.parentNode ) {
            this.imgElement.parentNode.removeChild( this.imgElement );
        }
        if ( this.element && this.element.parentNode ) {
            this.element.parentNode.removeChild( this.element );
        }
        if ( TILE_CACHE[ this.url ]){
            delete TILE_CACHE[ this.url ];
        }

        this.element    = null;
        this.imgElement = null;
        this.image      = null;
        this.loaded     = false;
        this.loading    = false;
    }
};

}( OpenSeadragon ));

/*
 * OpenSeadragon - Overlay
 *
 * Copyright (C) 2009 CodePlex Foundation
 * Copyright (C) 2010-2013 OpenSeadragon contributors
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are
 * met:
 *
 * - Redistributions of source code must retain the above copyright notice,
 *   this list of conditions and the following disclaimer.
 *
 * - Redistributions in binary form must reproduce the above copyright
 *   notice, this list of conditions and the following disclaimer in the
 *   documentation and/or other materials provided with the distribution.
 *
 * - Neither the name of CodePlex Foundation nor the names of its
 *   contributors may be used to endorse or promote products derived from
 *   this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
 * "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
 * LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
 * A PARTICULAR PURPOSE ARE DISCLAIMED.  IN NO EVENT SHALL THE COPYRIGHT
 * OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
 * SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED
 * TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
 * PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
 * LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 * NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

(function( $ ){

    /**
     * An enumeration of positions that an overlay may be assigned relative to the viewport.
     * @member OverlayPlacement
     * @memberof OpenSeadragon
     * @static
     * @type {Object}
     * @property {Number} CENTER
     * @property {Number} TOP_LEFT
     * @property {Number} TOP
     * @property {Number} TOP_RIGHT
     * @property {Number} RIGHT
     * @property {Number} BOTTOM_RIGHT
     * @property {Number} BOTTOM
     * @property {Number} BOTTOM_LEFT
     * @property {Number} LEFT
     */
    $.OverlayPlacement = {
        CENTER:       0,
        TOP_LEFT:     1,
        TOP:          2,
        TOP_RIGHT:    3,
        RIGHT:        4,
        BOTTOM_RIGHT: 5,
        BOTTOM:       6,
        BOTTOM_LEFT:  7,
        LEFT:         8
    };

    /**
     * @class Overlay
     * @classdesc Provides a way to float an HTML element on top of the viewer element.
     *
     * @memberof OpenSeadragon
     * @param {Object} options
     * @param {Element} options.element
     * @param {OpenSeadragon.Point|OpenSeadragon.Rect} options.location
     * @param {OpenSeadragon.OverlayPlacement} options.placement - Only used if location is an {@link OpenSeadragon.Point}.
     * @param {OpenSeadragon.Overlay.OnDrawCallback} options.onDraw
     */
    $.Overlay = function( element, location, placement ) {

        /**
         * onDraw callback signature used by {@link OpenSeadragon.Overlay}.
         *
         * @callback OnDrawCallback
         * @memberof OpenSeadragon.Overlay
         * @param {OpenSeadragon.Point} position
         * @param {OpenSeadragon.Point} size
         * @param {Element} element
         */

        var options;
        if( $.isPlainObject( element ) ){
            options = element;
        } else{
            options = {
                element: element,
                location: location,
                placement: placement
            };
        }
        
        this.element    = options.element;
        this.scales     = options.location instanceof $.Rect;
        this.bounds     = new $.Rect(
            options.location.x,
            options.location.y,
            options.location.width,
            options.location.height
        );
        this.position   = new $.Point(
            options.location.x,
            options.location.y
        );
        this.size       = new $.Point(
            options.location.width,
            options.location.height
        );
        this.style      = options.element.style;
        // rects are always top-left
        this.placement  = options.location instanceof $.Point ?
            options.placement :
            $.OverlayPlacement.TOP_LEFT;
        this.onDraw = options.onDraw;
    };

    $.Overlay.prototype = /** @lends OpenSeadragon.Overlay.prototype */{

        /**
         * @function
         * @param {OpenSeadragon.OverlayPlacement} position
         * @param {OpenSeadragon.Point} size
         */
        adjust: function( position, size ) {
            switch ( this.placement ) {
                case $.OverlayPlacement.TOP_LEFT:
                    break;
                case $.OverlayPlacement.TOP:
                    position.x -= size.x / 2;
                    break;
                case $.OverlayPlacement.TOP_RIGHT:
                    position.x -= size.x;
                    break;
                case $.OverlayPlacement.RIGHT:
                    position.x -= size.x;
                    position.y -= size.y / 2;
                    break;
                case $.OverlayPlacement.BOTTOM_RIGHT:
                    position.x -= size.x;
                    position.y -= size.y;
                    break;
                case $.OverlayPlacement.BOTTOM:
                    position.x -= size.x / 2;
                    position.y -= size.y;
                    break;
                case $.OverlayPlacement.BOTTOM_LEFT:
                    position.y -= size.y;
                    break;
                case $.OverlayPlacement.LEFT:
                    position.y -= size.y / 2;
                    break;
                default:
                case $.OverlayPlacement.CENTER:
                    position.x -= size.x / 2;
                    position.y -= size.y / 2;
                    break;
            }
        },

        /**
         * @function
         */
        destroy: function() {
            var element = this.element,
                style   = this.style;

            if ( element.parentNode ) {
                element.parentNode.removeChild( element );
                //this should allow us to preserve overlays when required between
                //pages
                if( element.prevElementParent ){
                    style.display = 'none';
                    //element.prevElementParent.insertBefore(
                    //    element,
                    //    element.prevNextSibling
                    //);
                    document.body.appendChild( element );
                }
            }

            // clear the onDraw callback
            this.onDraw = null;

            style.top = "";
            style.left = "";
            style.position = "";

            if ( this.scales ) {
                style.width = "";
                style.height = "";
            }
        },

        /**
         * @function
         * @param {Element} container
         */
        drawHTML: function( container, viewport ) {
            var element = this.element,
                style   = this.style,
                scales  = this.scales,
                drawerCenter = new $.Point(
                    viewport.viewer.drawer.canvas.width / 2,
                    viewport.viewer.drawer.canvas.height / 2
                ),
                degrees = viewport.degrees,
                position,
                size,
                overlayCenter;

            if ( element.parentNode != container ) {
                //save the source parent for later if we need it
                element.prevElementParent  = element.parentNode;
                element.prevNextSibling    = element.nextSibling;
                container.appendChild( element );
            }

            if ( !scales ) {
                this.size = $.getElementSize( element );
            }

            position = this.position;
            size     = this.size;

            this.adjust( position, size );

            position = position.apply( Math.floor );
            size     = size.apply( Math.ceil );

            // rotate the position of the overlay
            // TODO only rotate overlays if in canvas mode
            // TODO replace the size rotation with CSS3 transforms
            // TODO add an option to overlays to not rotate with the image
            // Currently only rotates position and size
            if( degrees !== 0 && this.scales ) {
                overlayCenter = new $.Point( size.x / 2, size.y / 2 );

                position = position.plus( overlayCenter ).rotate(
                    degrees,
                    drawerCenter
                ).minus( overlayCenter );

                size = size.rotate( degrees, new $.Point( 0, 0 ) );
                size = new $.Point( Math.abs( size.x ), Math.abs( size.y ) );
            }

            // call the onDraw callback if there is one to allow, this allows someone to overwrite
            // the drawing/positioning/sizing of the overlay
            if (this.onDraw) {
                this.onDraw(position, size, element);
            } else {
                style.left     = position.x + "px";
                style.top      = position.y + "px";
                style.position = "absolute";
                style.display  = 'block';

                if ( scales ) {
                    style.width  = size.x + "px";
                    style.height = size.y + "px";
                }
            }
        },

        /**
         * @function
         * @param {OpenSeadragon.Point|OpenSeadragon.Rect} location
         * @param {OpenSeadragon.OverlayPlacement} position
         */
        update: function( location, placement ) {
            this.scales     = location instanceof $.Rect;
            this.bounds     = new $.Rect(
                location.x,
                location.y,
                location.width,
                location.height
            );
            // rects are always top-left
            this.placement  = location instanceof $.Point ?
                placement :
                $.OverlayPlacement.TOP_LEFT;
        }

    };

}( OpenSeadragon ));

/*
 * OpenSeadragon - Drawer
 *
 * Copyright (C) 2009 CodePlex Foundation
 * Copyright (C) 2010-2013 OpenSeadragon contributors
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are
 * met:
 *
 * - Redistributions of source code must retain the above copyright notice,
 *   this list of conditions and the following disclaimer.
 *
 * - Redistributions in binary form must reproduce the above copyright
 *   notice, this list of conditions and the following disclaimer in the
 *   documentation and/or other materials provided with the distribution.
 *
 * - Neither the name of CodePlex Foundation nor the names of its
 *   contributors may be used to endorse or promote products derived from
 *   this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
 * "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
 * LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
 * A PARTICULAR PURPOSE ARE DISCLAIMED.  IN NO EVENT SHALL THE COPYRIGHT
 * OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
 * SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED
 * TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
 * PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
 * LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 * NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

(function( $ ){

var DEVICE_SCREEN       = $.getWindowSize(),
    BROWSER             = $.Browser.vendor,
    BROWSER_VERSION     = $.Browser.version,

    SUBPIXEL_RENDERING = (
        ( BROWSER == $.BROWSERS.FIREFOX ) ||
        ( BROWSER == $.BROWSERS.OPERA )   ||
        ( BROWSER == $.BROWSERS.SAFARI && BROWSER_VERSION >= 4 ) ||
        ( BROWSER == $.BROWSERS.CHROME && BROWSER_VERSION >= 2 ) ||
        ( BROWSER == $.BROWSERS.IE     && BROWSER_VERSION >= 9 )
    );


/**
 * @class Drawer
 * @classdesc Handles rendering of tiles for an {@link OpenSeadragon.Viewer}. 
 * A new instance is created for each TileSource opened (see {@link OpenSeadragon.Viewer#drawer}).
 *
 * @memberof OpenSeadragon
 * @param {OpenSeadragon.TileSource} source - Reference to Viewer tile source.
 * @param {OpenSeadragon.Viewport} viewport - Reference to Viewer viewport.
 * @param {Element} element - Parent element.
 */
$.Drawer = function( options ) {

    //backward compatibility for positional args while prefering more
    //idiomatic javascript options object as the only argument
    var args  = arguments,
        i;

    if( !$.isPlainObject( options ) ){
        options = {
            source:     args[ 0 ], // Reference to Viewer tile source.
            viewport:   args[ 1 ], // Reference to Viewer viewport.
            element:    args[ 2 ]  // Parent element.
        };
    }

    $.extend( true, this, {

        //internal state properties
        viewer:         null,
        downloading:    0,     // How many images are currently being loaded in parallel.
        tilesMatrix:    {},    // A '3d' dictionary [level][x][y] --> Tile.
        tilesLoaded:    [],    // An unordered list of Tiles with loaded images.
        coverage:       {},    // A '3d' dictionary [level][x][y] --> Boolean.
        lastDrawn:      [],    // An unordered list of Tiles drawn last frame.
        lastResetTime:  0,     // Last time for which the drawer was reset.
        midUpdate:      false, // Is the drawer currently updating the viewport?
        updateAgain:    true,  // Does the drawer need to update the viewort again?


        //internal state / configurable settings
        overlays:           [], // An unordered list of Overlays added.
        collectionOverlays: {},

        //configurable settings
        maxImageCacheCount: $.DEFAULT_SETTINGS.maxImageCacheCount,
        imageLoaderLimit:   $.DEFAULT_SETTINGS.imageLoaderLimit,
        minZoomImageRatio:  $.DEFAULT_SETTINGS.minZoomImageRatio,
        wrapHorizontal:     $.DEFAULT_SETTINGS.wrapHorizontal,
        wrapVertical:       $.DEFAULT_SETTINGS.wrapVertical,
        immediateRender:    $.DEFAULT_SETTINGS.immediateRender,
        blendTime:          $.DEFAULT_SETTINGS.blendTime,
        alwaysBlend:        $.DEFAULT_SETTINGS.alwaysBlend,
        minPixelRatio:      $.DEFAULT_SETTINGS.minPixelRatio,
        debugMode:          $.DEFAULT_SETTINGS.debugMode,
        timeout:            $.DEFAULT_SETTINGS.timeout

    }, options );

    this.useCanvas  = $.supportsCanvas && ( this.viewer ? this.viewer.useCanvas : true );
    /**
     * The parent element of this Drawer instance, passed in when the Drawer was created.
     * The parent of {@link OpenSeadragon.Drawer#canvas}.
     * @member {Element} container
     * @memberof OpenSeadragon.Drawer#
     */
    this.container  = $.getElement( this.element );
    /**
     * A &lt;canvas&gt; element if the browser supports them, otherwise a &lt;div&gt; element.
     * Child element of {@link OpenSeadragon.Drawer#container}.
     * @member {Element} canvas
     * @memberof OpenSeadragon.Drawer#
     */
    this.canvas     = $.makeNeutralElement( this.useCanvas ? "canvas" : "div" );
    /**
     * 2d drawing context for {@link OpenSeadragon.Drawer#canvas} if it's a &lt;canvas&gt; element, otherwise null.
     * @member {Object} context
     * @memberof OpenSeadragon.Drawer#
     */
    this.context    = this.useCanvas ? this.canvas.getContext( "2d" ) : null;
    // Ratio of zoomable image height to width.
    this.normHeight = this.source.dimensions.y / this.source.dimensions.x;
    /**
     * @member {Element} element
     * @memberof OpenSeadragon.Drawer#
     * @deprecated Alias for {@link OpenSeadragon.Drawer#container}.
     */
    this.element    = this.container;

    // We force our container to ltr because our drawing math doesn't work in rtl.
    // This issue only affects our canvas renderer, but we do it always for consistency.
    // Note that this means overlays you want to be rtl need to be explicitly set to rtl.
    this.container.dir = 'ltr';

    this.canvas.style.width     = "100%";
    this.canvas.style.height    = "100%";
    this.canvas.style.position  = "absolute";

    // explicit left-align
    this.container.style.textAlign = "left";
    this.container.appendChild( this.canvas );

    //create the correct type of overlay by convention if the overlays
    //are not already OpenSeadragon.Overlays
    for( i = 0; i < this.overlays.length; i++ ){
        if( $.isPlainObject( this.overlays[ i ] ) ){

            this.overlays[ i ] = addOverlayFromConfiguration( this, this.overlays[ i ]);

        } else if ( $.isFunction( this.overlays[ i ] ) ){
            //TODO
        }
    }

    //this.profiler    = new $.Profiler();
};

$.Drawer.prototype = /** @lends OpenSeadragon.Drawer.prototype */{

    /**
     * Adds an html element as an overlay to the current viewport.  Useful for
     * highlighting words or areas of interest on an image or other zoomable
     * interface.
     * @method
     * @param {Element|String|Object} element - A reference to an element or an id for
     *      the element which will overlayed. Or an Object specifying the configuration for the overlay
     * @param {OpenSeadragon.Point|OpenSeadragon.Rect} location - The point or
     *      rectangle which will be overlayed.
     * @param {OpenSeadragon.OverlayPlacement} placement - The position of the
     *      viewport which the location coordinates will be treated as relative
     *      to.
     * @param {function} onDraw - If supplied the callback is called when the overlay 
     *      needs to be drawn. It it the responsibility of the callback to do any drawing/positioning.
     *      It is passed position, size and element.
     * @fires OpenSeadragon.Viewer.event:add-overlay
     */
    addOverlay: function( element, location, placement, onDraw ) {
        var options;
        if( $.isPlainObject( element ) ){
            options = element;
        } else {
            options = {
                element: element,
                location: location,
                placement: placement,
                onDraw: onDraw
            };
        }

        element = $.getElement(options.element);

        if ( getOverlayIndex( this.overlays, element ) >= 0 ) {
            // they're trying to add a duplicate overlay
            return;
        }

        this.overlays.push( new $.Overlay({
            element: element,
            location: options.location,
            placement: options.placement,
            onDraw: options.onDraw
        }) );
        this.updateAgain = true;
        if( this.viewer ){
            /**
             * Raised when an overlay is added to the viewer (see {@link OpenSeadragon.Drawer#addOverlay}).
             *
             * @event add-overlay
             * @memberof OpenSeadragon.Viewer
             * @type {object}
             * @property {OpenSeadragon.Viewer} eventSource - A reference to the Viewer which raised the event.
             * @property {Element} element - The overlay element.
             * @property {OpenSeadragon.Point|OpenSeadragon.Rect} location
             * @property {OpenSeadragon.OverlayPlacement} placement
             * @property {?Object} userData - Arbitrary subscriber-defined object.
             */
            this.viewer.raiseEvent( 'add-overlay', {
                element: element,
                location: options.location,
                placement: options.placement
            });
        }
        return this;
    },

    /**
     * Updates the overlay represented by the reference to the element or
     * element id moving it to the new location, relative to the new placement.
     * @method
     * @param {OpenSeadragon.Point|OpenSeadragon.Rect} location - The point or
     *      rectangle which will be overlayed.
     * @param {OpenSeadragon.OverlayPlacement} placement - The position of the
     *      viewport which the location coordinates will be treated as relative
     *      to.
     * @return {OpenSeadragon.Drawer} Chainable.
     * @fires OpenSeadragon.Viewer.event:update-overlay
     */
    updateOverlay: function( element, location, placement ) {
        var i;

        element = $.getElement( element );
        i = getOverlayIndex( this.overlays, element );

        if ( i >= 0 ) {
            this.overlays[ i ].update( location, placement );
            this.updateAgain = true;
        }
        if( this.viewer ){
            /**
             * Raised when an overlay's location or placement changes (see {@link OpenSeadragon.Drawer#updateOverlay}).
             *
             * @event update-overlay
             * @memberof OpenSeadragon.Viewer
             * @type {object}
             * @property {OpenSeadragon.Viewer} eventSource - A reference to the Viewer which raised the event.
             * @property {Element} element
             * @property {OpenSeadragon.Point|OpenSeadragon.Rect} location
             * @property {OpenSeadragon.OverlayPlacement} placement
             * @property {?Object} userData - Arbitrary subscriber-defined object.
             */
            this.viewer.raiseEvent( 'update-overlay', {
                element: element,
                location: location,
                placement: placement
            });
        }
        return this;
    },

    /**
     * Removes and overlay identified by the reference element or element id
     *      and schedules and update.
     * @method
     * @param {Element|String} element - A reference to the element or an
     *      element id which represent the ovelay content to be removed.
     * @return {OpenSeadragon.Drawer} Chainable.
     * @fires OpenSeadragon.Viewer.event:remove-overlay
     */
    removeOverlay: function( element ) {
        var i;

        element = $.getElement( element );
        i = getOverlayIndex( this.overlays, element );

        if ( i >= 0 ) {
            this.overlays[ i ].destroy();
            this.overlays.splice( i, 1 );
            this.updateAgain = true;
        }
        if( this.viewer ){
            /**
             * Raised when an overlay is removed from the viewer (see {@link OpenSeadragon.Drawer#removeOverlay}).
             *
             * @event remove-overlay
             * @memberof OpenSeadragon.Viewer
             * @type {object}
             * @property {OpenSeadragon.Viewer} eventSource - A reference to the Viewer which raised the event.
             * @property {Element} element - The overlay element.
             * @property {?Object} userData - Arbitrary subscriber-defined object.
             */
            this.viewer.raiseEvent( 'remove-overlay', {
                element: element
            });
        }
        return this;
    },

    /**
     * Removes all currently configured Overlays from this Drawer and schedules
     *      and update.
     * @method
     * @return {OpenSeadragon.Drawer} Chainable.
     * @fires OpenSeadragon.Viewer.event:clear-overlay
     */
    clearOverlays: function() {
        while ( this.overlays.length > 0 ) {
            this.overlays.pop().destroy();
            this.updateAgain = true;
        }
        if( this.viewer ){
            /**
             * Raised when all overlays are removed from the viewer (see {@link OpenSeadragon.Drawer#clearOverlays}).
             *
             * @event clear-overlay
             * @memberof OpenSeadragon.Viewer
             * @type {object}
             * @property {OpenSeadragon.Viewer} eventSource - A reference to the Viewer which raised the event.
             * @property {?Object} userData - Arbitrary subscriber-defined object.
             */
            this.viewer.raiseEvent( 'clear-overlay', {} );
        }
        return this;
    },


    /**
     * Returns whether the Drawer is scheduled for an update at the
     *      soonest possible opportunity.
     * @method
     * @returns {Boolean} - Whether the Drawer is scheduled for an update at the
     *      soonest possible opportunity.
     */
    needsUpdate: function() {
        return this.updateAgain;
    },

    /**
     * Returns the total number of tiles that have been loaded by this Drawer.
     * @method
     * @returns {Number} - The total number of tiles that have been loaded by
     *      this Drawer.
     */
    numTilesLoaded: function() {
        return this.tilesLoaded.length;
    },

    /**
     * Clears all tiles and triggers an update on the next call to
     * Drawer.prototype.update().
     * @method
     * @return {OpenSeadragon.Drawer} Chainable.
     */
    reset: function() {
        clearTiles( this );
        this.lastResetTime = $.now();
        this.updateAgain = true;
        return this;
    },

    /**
     * Forces the Drawer to update.
     * @method
     * @return {OpenSeadragon.Drawer} Chainable.
     */
    update: function() {
        //this.profiler.beginUpdate();
        this.midUpdate = true;
        updateViewport( this );
        this.midUpdate = false;
        //this.profiler.endUpdate();
        return this;
    },

    /**
     * Used internally to load images when required.  May also be used to
     * preload a set of images so the browser will have them available in
     * the local cache to optimize user experience in certain cases. Because
     * the number of parallel image loads is configurable, if too many images
     * are currently being loaded, the request will be ignored.  Since by
     * default drawer.imageLoaderLimit is 0, the native browser parallel
     * image loading policy will be used.
     * @method
     * @param {String} src - The url of the image to load.
     * @param {Function} callback - The function that will be called with the
     *      Image object as the only parameter if it was loaded successfully.
     *      If an error occured, or the request timed out or was aborted,
     *      the parameter is null instead.
     * @return {Boolean} loading - Whether the request was submitted or ignored
     *      based on OpenSeadragon.DEFAULT_SETTINGS.imageLoaderLimit.
     */
    loadImage: function( src, callback ) {
        var _this = this,
            loading = false,
            image,
            jobid,
            complete;

        if ( !this.imageLoaderLimit ||
              this.downloading < this.imageLoaderLimit ) {

            this.downloading++;

            image = new Image();

            complete = function( imagesrc, resultingImage ){
                _this.downloading--;
                if (typeof ( callback ) == "function") {
                    try {
                        callback( resultingImage );
                    } catch ( e ) {
                        $.console.error(
                            "%s while executing %s callback: %s",
                            e.name,
                            src,
                            e.message,
                            e
                        );
                    }
                }
            };

            image.onload = function(){
                finishLoadingImage( image, complete, true, jobid );
            };

            image.onabort = image.onerror = function(){
                finishLoadingImage( image, complete, false, jobid );
            };

            jobid = window.setTimeout( function(){
                finishLoadingImage( image, complete, false, jobid );
            }, this.timeout );

            loading   = true;
            image.src = src;
        }

        return loading;
    },

    /**
     * Returns whether rotation is supported or not.
     * @method
     * @return {Boolean} True if rotation is supported.
     */
    canRotate: function() {
        return this.useCanvas;
    }
};

/**
 * @private
 * @inner
 */
 function addOverlayFromConfiguration( drawer, overlay ){

    var element  = null,
        rect = ( overlay.height && overlay.width ) ? new $.Rect(
            overlay.x || overlay.px,
            overlay.y || overlay.py,
            overlay.width,
            overlay.height
        ) : new $.Point(
            overlay.x || overlay.px,
            overlay.y || overlay.py
        ),
        id = overlay.id ?
            overlay.id :
            "openseadragon-overlay-"+Math.floor(Math.random()*10000000);

    element = $.getElement(overlay.id);
    if( !element ){
        element         = document.createElement("a");
        element.href    = "#/overlay/"+id;
    }
    element.id        = id;
    $.addClass( element, overlay.className ?
        overlay.className :
        "openseadragon-overlay"
    );


    if(overlay.px !== undefined){
        //if they specified 'px' so it's in pixel coordinates so
        //we need to translate to viewport coordinates
        rect = drawer.viewport.imageToViewportRectangle( rect );
    }
    
    if( overlay.placement ){
        return new $.Overlay({
            element: element,
            location: drawer.viewport.pointFromPixel(rect),
            placement: $.OverlayPlacement[overlay.placement.toUpperCase()],
            onDraw: overlay.onDraw
        });
    }else{
        return new $.Overlay({
            element: element,
            location: rect,
            onDraw: overlay.onDraw
        });
    }

}

/**
 * @private
 * @inner
 * Pretty much every other line in this needs to be documented so it's clear
 * how each piece of this routine contributes to the drawing process.  That's
 * why there are so many TODO's inside this function.
 */
function updateViewport( drawer ) {

    drawer.updateAgain = false;

    if( drawer.viewer ){
        /**
         * <em>- Needs documentation -</em>
         *
         * @event update-viewport
         * @memberof OpenSeadragon.Viewer
         * @type {object}
         * @property {OpenSeadragon.Viewer} eventSource - A reference to the Viewer which raised the event.
         * @property {?Object} userData - Arbitrary subscriber-defined object.
         */
        drawer.viewer.raiseEvent( 'update-viewport', {} );
    }

    var tile,
        level,
        best            = null,
        haveDrawn       = false,
        currentTime     = $.now(),
        viewportSize    = drawer.viewport.getContainerSize(),
        viewportBounds  = drawer.viewport.getBounds( true ),
        viewportTL      = viewportBounds.getTopLeft(),
        viewportBR      = viewportBounds.getBottomRight(),
        zeroRatioC      = drawer.viewport.deltaPixelsFromPoints(
            drawer.source.getPixelRatio( 0 ),
            true
        ).x,
        lowestLevel     = Math.max(
            drawer.source.minLevel,
            Math.floor(
                Math.log( drawer.minZoomImageRatio ) /
                Math.log( 2 )
            )
        ),
        highestLevel    = Math.min(
            Math.abs(drawer.source.maxLevel),
            Math.abs(Math.floor(
                Math.log( zeroRatioC / drawer.minPixelRatio ) /
                Math.log( 2 )
            ))
        ),
        degrees         = drawer.viewport.degrees,
        renderPixelRatioC,
        renderPixelRatioT,
        zeroRatioT,
        optimalRatio,
        levelOpacity,
        levelVisibility;

    //TODO
    while ( drawer.lastDrawn.length > 0 ) {
        tile = drawer.lastDrawn.pop();
        tile.beingDrawn = false;
    }

    //TODO
    drawer.canvas.innerHTML   = "";
    if ( drawer.useCanvas ) {
        if( drawer.canvas.width  != viewportSize.x ||
            drawer.canvas.height != viewportSize.y ){
            drawer.canvas.width  = viewportSize.x;
            drawer.canvas.height = viewportSize.y;
        }
        drawer.context.clearRect( 0, 0, viewportSize.x, viewportSize.y );
    }

    //Change bounds for rotation
    if (degrees === 90 || degrees === 270) {
        var rotatedBounds = viewportBounds.rotate( degrees );
        viewportTL = rotatedBounds.getTopLeft();
        viewportBR = rotatedBounds.getBottomRight();
    }

    //Don't draw if completely outside of the viewport
    if  ( !drawer.wrapHorizontal &&
        ( viewportBR.x < 0 || viewportTL.x > 1 ) ) {
        return;
    } else if
        ( !drawer.wrapVertical &&
        ( viewportBR.y < 0 || viewportTL.y > drawer.normHeight ) ) {
        return;
    }

    //TODO
    if ( !drawer.wrapHorizontal ) {
        viewportTL.x = Math.max( viewportTL.x, 0 );
        viewportBR.x = Math.min( viewportBR.x, 1 );
    }
    if ( !drawer.wrapVertical ) {
        viewportTL.y = Math.max( viewportTL.y, 0 );
        viewportBR.y = Math.min( viewportBR.y, drawer.normHeight );
    }

    //TODO
    lowestLevel = Math.min( lowestLevel, highestLevel );

    //TODO
    var drawLevel; // FIXME: drawLevel should have a more explanatory name
    for ( level = highestLevel; level >= lowestLevel; level-- ) {
        drawLevel = false;

        //Avoid calculations for draw if we have already drawn this
        renderPixelRatioC = drawer.viewport.deltaPixelsFromPoints(
            drawer.source.getPixelRatio( level ),
            true
        ).x;

        if ( ( !haveDrawn && renderPixelRatioC >= drawer.minPixelRatio ) ||
             ( level == lowestLevel ) ) {
            drawLevel = true;
            haveDrawn = true;
        } else if ( !haveDrawn ) {
            continue;
        }

        //Perform calculations for draw if we haven't drawn this
        renderPixelRatioT = drawer.viewport.deltaPixelsFromPoints(
            drawer.source.getPixelRatio( level ),
            false
        ).x;

        zeroRatioT      = drawer.viewport.deltaPixelsFromPoints(
            drawer.source.getPixelRatio(
                Math.max(
                    drawer.source.getClosestLevel( drawer.viewport.containerSize ) - 1,
                    0
                )
            ),
            false
        ).x;

        optimalRatio    = drawer.immediateRender ?
            1 :
            zeroRatioT;

        levelOpacity    = Math.min( 1, ( renderPixelRatioC - 0.5 ) / 0.5 );

        levelVisibility = optimalRatio / Math.abs(
            optimalRatio - renderPixelRatioT
        );

        //TODO
        best = updateLevel(
            drawer,
            haveDrawn,
            drawLevel,
            level,
            levelOpacity,
            levelVisibility,
            viewportTL,
            viewportBR,
            currentTime,
            best
        );

        //TODO
        if (  providesCoverage( drawer.coverage, level ) ) {
            break;
        }
    }

    //TODO
    drawTiles( drawer, drawer.lastDrawn );
    drawOverlays( drawer.viewport, drawer.overlays, drawer.container );

    //TODO
    if ( best ) {
        loadTile( drawer, best, currentTime );
        // because we haven't finished drawing, so
        drawer.updateAgain = true;
    }

}


function updateLevel( drawer, haveDrawn, drawLevel, level, levelOpacity, levelVisibility, viewportTL, viewportBR, currentTime, best ){

    var x, y,
        tileTL,
        tileBR,
        numberOfTiles,
        viewportCenter  = drawer.viewport.pixelFromPoint( drawer.viewport.getCenter() );


    if( drawer.viewer ){
        /**
         * <em>- Needs documentation -</em>
         *
         * @event update-level
         * @memberof OpenSeadragon.Viewer
         * @type {object}
         * @property {OpenSeadragon.Viewer} eventSource - A reference to the Viewer which raised the event.
         * @property {Object} havedrawn
         * @property {Object} level
         * @property {Object} opacity
         * @property {Object} visibility
         * @property {Object} topleft
         * @property {Object} bottomright
         * @property {Object} currenttime
         * @property {Object} best
         * @property {?Object} userData - Arbitrary subscriber-defined object.
         */
        drawer.viewer.raiseEvent( 'update-level', {
            havedrawn: haveDrawn,
            level: level,
            opacity: levelOpacity,
            visibility: levelVisibility,
            topleft: viewportTL,
            bottomright: viewportBR,
            currenttime: currentTime,
            best: best
        });
    }

    //OK, a new drawing so do your calculations
    tileTL    = drawer.source.getTileAtPoint( level, viewportTL );
    tileBR    = drawer.source.getTileAtPoint( level, viewportBR );
    numberOfTiles  = drawer.source.getNumTiles( level );

    resetCoverage( drawer.coverage, level );

    if ( !drawer.wrapHorizontal ) {
        tileBR.x = Math.min( tileBR.x, numberOfTiles.x - 1 );
    }
    if ( !drawer.wrapVertical ) {
        tileBR.y = Math.min( tileBR.y, numberOfTiles.y - 1 );
    }

    for ( x = tileTL.x; x <= tileBR.x; x++ ) {
        for ( y = tileTL.y; y <= tileBR.y; y++ ) {

            best = updateTile(
                drawer,
                drawLevel,
                haveDrawn,
                x, y,
                level,
                levelOpacity,
                levelVisibility,
                viewportCenter,
                numberOfTiles,
                currentTime,
                best
            );

        }
    }

    return best;
}

function updateTile( drawer, drawLevel, haveDrawn, x, y, level, levelOpacity, levelVisibility, viewportCenter, numberOfTiles, currentTime, best){

    var tile = getTile(
            x, y,
            level,
            drawer.source,
            drawer.tilesMatrix,
            currentTime,
            numberOfTiles,
            drawer.normHeight
        ),
        drawTile = drawLevel;

    if( drawer.viewer ){
        /**
         * <em>- Needs documentation -</em>
         *
         * @event update-tile
         * @memberof OpenSeadragon.Viewer
         * @type {object}
         * @property {OpenSeadragon.Viewer} eventSource - A reference to the Viewer which raised the event.
         * @property {OpenSeadragon.Tile} tile
         * @property {?Object} userData - Arbitrary subscriber-defined object.
         */
        drawer.viewer.raiseEvent( 'update-tile', {
            tile: tile
        });
    }

    setCoverage( drawer.coverage, level, x, y, false );

    if ( !tile.exists ) {
        return best;
    }

    if ( haveDrawn && !drawTile ) {
        if ( isCovered( drawer.coverage, level, x, y ) ) {
            setCoverage( drawer.coverage, level, x, y, true );
        } else {
            drawTile = true;
        }
    }

    if ( !drawTile ) {
        return best;
    }

    positionTile(
        tile,
        drawer.source.tileOverlap,
        drawer.viewport,
        viewportCenter,
        levelVisibility
    );

    if ( tile.loaded ) {
        var needsUpdate = blendTile(
            drawer,
            tile,
            x, y,
            level,
            levelOpacity,
            currentTime
        );

        if ( needsUpdate ) {
            drawer.updateAgain = true;
        }
    } else if ( tile.loading ) {
        // the tile is already in the download queue
        // thanks josh1093 for finally translating this typo
    } else {
        best = compareTiles( best, tile );
    }

    return best;
}

function getTile( x, y, level, tileSource, tilesMatrix, time, numTiles, normHeight ) {
    var xMod,
        yMod,
        bounds,
        exists,
        url,
        tile;

    if ( !tilesMatrix[ level ] ) {
        tilesMatrix[ level ] = {};
    }
    if ( !tilesMatrix[ level ][ x ] ) {
        tilesMatrix[ level ][ x ] = {};
    }

    if ( !tilesMatrix[ level ][ x ][ y ] ) {
        xMod    = ( numTiles.x + ( x % numTiles.x ) ) % numTiles.x;
        yMod    = ( numTiles.y + ( y % numTiles.y ) ) % numTiles.y;
        bounds  = tileSource.getTileBounds( level, xMod, yMod );
        exists  = tileSource.tileExists( level, xMod, yMod );
        url     = tileSource.getTileUrl( level, xMod, yMod );

        bounds.x += 1.0 * ( x - xMod ) / numTiles.x;
        bounds.y += normHeight * ( y - yMod ) / numTiles.y;

        tilesMatrix[ level ][ x ][ y ] = new $.Tile(
            level,
            x,
            y,
            bounds,
            exists,
            url
        );
    }

    tile = tilesMatrix[ level ][ x ][ y ];
    tile.lastTouchTime = time;

    return tile;
}


function loadTile( drawer, tile, time ) {
    if( drawer.viewport.collectionMode ){
        drawer.midUpdate = false;
        onTileLoad( drawer, tile, time );
    } else {
        tile.loading = drawer.loadImage(
            tile.url,
            function( image ){
                onTileLoad( drawer, tile, time, image );
            }
        );
    }
}

function onTileLoad( drawer, tile, time, image ) {
    var insertionIndex,
        cutoff,
        worstTile,
        worstTime,
        worstLevel,
        worstTileIndex,
        prevTile,
        prevTime,
        prevLevel,
        i;

    tile.loading = false;

    if ( drawer.midUpdate ) {
        $.console.warn( "Tile load callback in middle of drawing routine." );
        return;
    } else if ( !image  && !drawer.viewport.collectionMode ) {
        $.console.log( "Tile %s failed to load: %s", tile, tile.url );
        if( !drawer.debugMode ){
            tile.exists = false;
            return;
        }
    } else if ( time < drawer.lastResetTime ) {
        $.console.log( "Ignoring tile %s loaded before reset: %s", tile, tile.url );
        return;
    }

    tile.loaded = true;
    tile.image  = image;


    insertionIndex = drawer.tilesLoaded.length;

    if ( drawer.tilesLoaded.length >= drawer.maxImageCacheCount ) {
        cutoff = Math.ceil( Math.log( drawer.source.tileSize ) / Math.log( 2 ) );

        worstTile       = null;
        worstTileIndex  = -1;

        for ( i = drawer.tilesLoaded.length - 1; i >= 0; i-- ) {
            prevTile = drawer.tilesLoaded[ i ];

            if ( prevTile.level <= drawer.cutoff || prevTile.beingDrawn ) {
                continue;
            } else if ( !worstTile ) {
                worstTile       = prevTile;
                worstTileIndex  = i;
                continue;
            }

            prevTime    = prevTile.lastTouchTime;
            worstTime   = worstTile.lastTouchTime;
            prevLevel   = prevTile.level;
            worstLevel  = worstTile.level;

            if ( prevTime < worstTime ||
               ( prevTime == worstTime && prevLevel > worstLevel ) ) {
                worstTile       = prevTile;
                worstTileIndex  = i;
            }
        }

        if ( worstTile && worstTileIndex >= 0 ) {
            worstTile.unload();
            insertionIndex = worstTileIndex;
        }
    }

    drawer.tilesLoaded[ insertionIndex ] = tile;
    drawer.updateAgain = true;
}


function positionTile( tile, overlap, viewport, viewportCenter, levelVisibility ){
    var boundsTL     = tile.bounds.getTopLeft(),
        boundsSize   = tile.bounds.getSize(),
        positionC    = viewport.pixelFromPoint( boundsTL, true ),
        positionT    = viewport.pixelFromPoint( boundsTL, false ),
        sizeC        = viewport.deltaPixelsFromPoints( boundsSize, true ),
        sizeT        = viewport.deltaPixelsFromPoints( boundsSize, false ),
        tileCenter   = positionT.plus( sizeT.divide( 2 ) ),
        tileDistance = viewportCenter.distanceTo( tileCenter );

    if ( !overlap ) {
        sizeC = sizeC.plus( new $.Point( 1, 1 ) );
    }

    tile.position   = positionC;
    tile.size       = sizeC;
    tile.distance   = tileDistance;
    tile.visibility = levelVisibility;
}


function blendTile( drawer, tile, x, y, level, levelOpacity, currentTime ){
    var blendTimeMillis = 1000 * drawer.blendTime,
        deltaTime,
        opacity;

    if ( !tile.blendStart ) {
        tile.blendStart = currentTime;
    }

    deltaTime   = currentTime - tile.blendStart;
    opacity     = blendTimeMillis ? Math.min( 1, deltaTime / ( blendTimeMillis ) ) : 1;

    if ( drawer.alwaysBlend ) {
        opacity *= levelOpacity;
    }

    tile.opacity = opacity;

    drawer.lastDrawn.push( tile );

    if ( opacity == 1 ) {
        setCoverage( drawer.coverage, level, x, y, true );
    } else if ( deltaTime < blendTimeMillis ) {
        return true;
    }

    return false;
}


function clearTiles( drawer ) {
    drawer.tilesMatrix = {};
    drawer.tilesLoaded = [];
}

/**
 * @private
 * @inner
 * Returns true if the given tile provides coverage to lower-level tiles of
 * lower resolution representing the same content. If neither x nor y is
 * given, returns true if the entire visible level provides coverage.
 *
 * Note that out-of-bounds tiles provide coverage in this sense, since
 * there's no content that they would need to cover. Tiles at non-existent
 * levels that are within the image bounds, however, do not.
 */
function providesCoverage( coverage, level, x, y ) {
    var rows,
        cols,
        i, j;

    if ( !coverage[ level ] ) {
        return false;
    }

    if ( x === undefined || y === undefined ) {
        rows = coverage[ level ];
        for ( i in rows ) {
            if ( rows.hasOwnProperty( i ) ) {
                cols = rows[ i ];
                for ( j in cols ) {
                    if ( cols.hasOwnProperty( j ) && !cols[ j ] ) {
                        return false;
                    }
                }
            }
        }

        return true;
    }

    return (
        coverage[ level ][ x] === undefined ||
        coverage[ level ][ x ][ y ] === undefined ||
        coverage[ level ][ x ][ y ] === true
    );
}

/**
 * @private
 * @inner
 * Returns true if the given tile is completely covered by higher-level
 * tiles of higher resolution representing the same content. If neither x
 * nor y is given, returns true if the entire visible level is covered.
 */
function isCovered( coverage, level, x, y ) {
    if ( x === undefined || y === undefined ) {
        return providesCoverage( coverage, level + 1 );
    } else {
        return (
             providesCoverage( coverage, level + 1, 2 * x, 2 * y ) &&
             providesCoverage( coverage, level + 1, 2 * x, 2 * y + 1 ) &&
             providesCoverage( coverage, level + 1, 2 * x + 1, 2 * y ) &&
             providesCoverage( coverage, level + 1, 2 * x + 1, 2 * y + 1 )
        );
    }
}

/**
 * @private
 * @inner
 * Sets whether the given tile provides coverage or not.
 */
function setCoverage( coverage, level, x, y, covers ) {
    if ( !coverage[ level ] ) {
        $.console.warn(
            "Setting coverage for a tile before its level's coverage has been reset: %s",
            level
        );
        return;
    }

    if ( !coverage[ level ][ x ] ) {
        coverage[ level ][ x ] = {};
    }

    coverage[ level ][ x ][ y ] = covers;
}

/**
 * @private
 * @inner
 * Resets coverage information for the given level. This should be called
 * after every draw routine. Note that at the beginning of the next draw
 * routine, coverage for every visible tile should be explicitly set.
 */
function resetCoverage( coverage, level ) {
    coverage[ level ] = {};
}

/**
 * @private
 * @inner
 * Determines the 'z-index' of the given overlay.  Overlays are ordered in
 * a z-index based on the order they are added to the Drawer.
 */
function getOverlayIndex( overlays, element ) {
    var i;
    for ( i = overlays.length - 1; i >= 0; i-- ) {
        if ( overlays[ i ].element == element ) {
            return i;
        }
    }

    return -1;
}

/**
 * @private
 * @inner
 * Determines whether the 'last best' tile for the area is better than the
 * tile in question.
 */
function compareTiles( previousBest, tile ) {
    if ( !previousBest ) {
        return tile;
    }

    if ( tile.visibility > previousBest.visibility ) {
        return tile;
    } else if ( tile.visibility == previousBest.visibility ) {
        if ( tile.distance < previousBest.distance ) {
            return tile;
        }
    }

    return previousBest;
}

function finishLoadingImage( image, callback, successful, jobid ){

    image.onload = null;
    image.onabort = null;
    image.onerror = null;

    if ( jobid ) {
        window.clearTimeout( jobid );
    }
    $.requestAnimationFrame( function() {
        callback( image.src, successful ? image : null);
    });

}


function drawOverlays( viewport, overlays, container ){
    var i,
        length = overlays.length;
    for ( i = 0; i < length; i++ ) {
        drawOverlay( viewport, overlays[ i ], container );
    }
}

function drawOverlay( viewport, overlay, container ){

    overlay.position = viewport.pixelFromPoint(
        overlay.bounds.getTopLeft(),
        true
    );
    overlay.size     = viewport.deltaPixelsFromPoints(
        overlay.bounds.getSize(),
        true
    );
    overlay.drawHTML( container, viewport );
}

function drawTiles( drawer, lastDrawn ){
    var i,
        tile,
        tileKey,
        viewer,
        viewport,
        position,
        tileSource,
        collectionTileSource;

    for ( i = lastDrawn.length - 1; i >= 0; i-- ) {
        tile = lastDrawn[ i ];

        //We dont actually 'draw' a collection tile, rather its used to house
        //an overlay which does the drawing in its own viewport
        if( drawer.viewport.collectionMode ){

            tileKey = tile.x + '/' + tile.y;
            viewport = drawer.viewport;
            collectionTileSource = viewport.collectionTileSource;

            if( !drawer.collectionOverlays[ tileKey ] ){

                position = collectionTileSource.layout == 'horizontal' ?
                    tile.y + ( tile.x * collectionTileSource.rows ) :
                    tile.x + ( tile.y * collectionTileSource.rows );

                if (position < collectionTileSource.tileSources.length) {
                    tileSource = collectionTileSource.tileSources[ position ];
                } else {
                    tileSource = null;
                }

                //$.console.log("Rendering collection tile %s | %s | %s", tile.y, tile.y, position);
                if( tileSource ){
                    drawer.collectionOverlays[ tileKey ] = viewer = new $.Viewer({
                        hash:                   viewport.viewer.hash + "-" + tileKey,
                        element:                $.makeNeutralElement( "div" ),
                        mouseNavEnabled:        false,
                        showNavigator:          false,
                        showSequenceControl:    false,
                        showNavigationControl:  false,
                        tileSources: [
                            tileSource
                        ]
                    });

                    //TODO: IE seems to barf on this, not sure if its just the border
                    //      but we probably need to clear this up with a better
                    //      test of support for various css features
                    if( SUBPIXEL_RENDERING ){
                        viewer.element.style.border = '1px solid rgba(255,255,255,0.38)';
                        viewer.element.style['-webkit-box-reflect'] =
                            'below 0px -webkit-gradient('+
                                'linear,left '+
                                'top,left '+
                                'bottom,from(transparent),color-stop(62%,transparent),to(rgba(255,255,255,0.62))'+
                            ')';
                    }

                    drawer.addOverlay(
                        viewer.element,
                        tile.bounds
                    );
                }

            }else{
                viewer = drawer.collectionOverlays[ tileKey ];
                if( viewer.viewport ){
                    viewer.viewport.resize( tile.size, true );
                    viewer.viewport.goHome( true );
                }
            }

        } else {

            if ( drawer.useCanvas ) {
                // TODO do this in a more performant way
                // specifically, don't save,rotate,restore every time we draw a tile
                if( drawer.viewport.degrees !== 0 ) {
                    offsetForRotation( tile, drawer.canvas, drawer.context, drawer.viewport.degrees );
                    tile.drawCanvas( drawer.context );
                    restoreRotationChanges( tile, drawer.canvas, drawer.context );
                } else {
                    tile.drawCanvas( drawer.context );
                }
            } else {
                tile.drawHTML( drawer.canvas );
            }


            tile.beingDrawn = true;
        }

        if( drawer.debugMode ){
            try{
                drawDebugInfo( drawer, tile, lastDrawn.length, i );
            }catch(e){
                $.console.error(e);
            }
        }

        if( drawer.viewer ){
            /**
             * <em>- Needs documentation -</em>
             *
             * @event tile-drawn
             * @memberof OpenSeadragon.Viewer
             * @type {object}
             * @property {OpenSeadragon.Viewer} eventSource - A reference to the Viewer which raised the event.
             * @property {OpenSeadragon.Tile} tile
             * @property {?Object} userData - Arbitrary subscriber-defined object.
             */
            drawer.viewer.raiseEvent( 'tile-drawn', {
                tile: tile
            });
        }
    }
}

function offsetForRotation( tile, canvas, context, degrees ){
    var cx = canvas.width / 2,
        cy = canvas.height / 2,
        px = tile.position.x - cx,
        py = tile.position.y - cy;

    context.save();

    context.translate(cx, cy);
    context.rotate( Math.PI / 180 * degrees);
    tile.position.x = px;
    tile.position.y = py;
}

function restoreRotationChanges( tile, canvas, context ){
    var cx = canvas.width / 2,
        cy = canvas.height / 2,
        px = tile.position.x + cx,
        py = tile.position.y + cy;

    tile.position.x = px;
    tile.position.y = py;

    context.restore();
}


function drawDebugInfo( drawer, tile, count, i ){

    if ( drawer.useCanvas ) {
        drawer.context.save();
        drawer.context.lineWidth = 2;
        drawer.context.font = 'small-caps bold 13px ariel';
        drawer.context.strokeStyle = drawer.debugGridColor;
        drawer.context.fillStyle = drawer.debugGridColor;
        drawer.context.strokeRect(
            tile.position.x,
            tile.position.y,
            tile.size.x,
            tile.size.y
        );
        if( tile.x === 0 && tile.y === 0 ){
            drawer.context.fillText(
                "Zoom: " + drawer.viewport.getZoom(),
                tile.position.x,
                tile.position.y - 30
            );
            drawer.context.fillText(
                "Pan: " + drawer.viewport.getBounds().toString(),
                tile.position.x,
                tile.position.y - 20
            );
        }
        drawer.context.fillText(
            "Level: " + tile.level,
            tile.position.x + 10,
            tile.position.y + 20
        );
        drawer.context.fillText(
            "Column: " + tile.x,
            tile.position.x + 10,
            tile.position.y + 30
        );
        drawer.context.fillText(
            "Row: " + tile.y,
            tile.position.x + 10,
            tile.position.y + 40
        );
        drawer.context.fillText(
            "Order: " + i + " of " + count,
            tile.position.x + 10,
            tile.position.y + 50
        );
        drawer.context.fillText(
            "Size: " + tile.size.toString(),
            tile.position.x + 10,
            tile.position.y + 60
        );
        drawer.context.fillText(
            "Position: " + tile.position.toString(),
            tile.position.x + 10,
            tile.position.y + 70
        );
        drawer.context.restore();
    }
}


}( OpenSeadragon ));

/*
 * OpenSeadragon - Viewport
 *
 * Copyright (C) 2009 CodePlex Foundation
 * Copyright (C) 2010-2013 OpenSeadragon contributors
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are
 * met:
 *
 * - Redistributions of source code must retain the above copyright notice,
 *   this list of conditions and the following disclaimer.
 *
 * - Redistributions in binary form must reproduce the above copyright
 *   notice, this list of conditions and the following disclaimer in the
 *   documentation and/or other materials provided with the distribution.
 *
 * - Neither the name of CodePlex Foundation nor the names of its
 *   contributors may be used to endorse or promote products derived from
 *   this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
 * "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
 * LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
 * A PARTICULAR PURPOSE ARE DISCLAIMED.  IN NO EVENT SHALL THE COPYRIGHT
 * OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
 * SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED
 * TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
 * PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
 * LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 * NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

(function( $ ){


/**
 * @class Viewport
 * @classdesc Handles coordinate-related functionality (zoom, pan, rotation, etc.) for an {@link OpenSeadragon.Viewer}.
 * A new instance is created for each TileSource opened (see {@link OpenSeadragon.Viewer#viewport}).
 *
 * @memberof OpenSeadragon
 */
$.Viewport = function( options ) {

    //backward compatibility for positional args while prefering more
    //idiomatic javascript options object as the only argument
    var args = arguments;
    if(  args.length && args[ 0 ] instanceof $.Point ){
        options = {
            containerSize:  args[ 0 ],
            contentSize:    args[ 1 ],
            config:         args[ 2 ]
        };
    }

    //options.config and the general config argument are deprecated
    //in favor of the more direct specification of optional settings
    //being passed directly on the options object
    if ( options.config ){
        $.extend( true, options, options.config );
        delete options.config;
    }

    $.extend( true, this, {

        //required settings
        containerSize:      null,
        contentSize:        null,

        //internal state properties
        zoomPoint:          null,
        viewer:           null,

        //configurable options
        springStiffness:    $.DEFAULT_SETTINGS.springStiffness,
        animationTime:      $.DEFAULT_SETTINGS.animationTime,
        minZoomImageRatio:  $.DEFAULT_SETTINGS.minZoomImageRatio,
        maxZoomPixelRatio:  $.DEFAULT_SETTINGS.maxZoomPixelRatio,
        visibilityRatio:    $.DEFAULT_SETTINGS.visibilityRatio,
        wrapHorizontal:     $.DEFAULT_SETTINGS.wrapHorizontal,
        wrapVertical:       $.DEFAULT_SETTINGS.wrapVertical,
        defaultZoomLevel:   $.DEFAULT_SETTINGS.defaultZoomLevel,
        minZoomLevel:       $.DEFAULT_SETTINGS.minZoomLevel,
        maxZoomLevel:       $.DEFAULT_SETTINGS.maxZoomLevel,
        degrees:            $.DEFAULT_SETTINGS.degrees

    }, options );

    this.centerSpringX = new $.Spring({
        initial: 0,
        springStiffness: this.springStiffness,
        animationTime:   this.animationTime
    });
    this.centerSpringY = new $.Spring({
        initial: 0,
        springStiffness: this.springStiffness,
        animationTime:   this.animationTime
    });
    this.zoomSpring    = new $.Spring({
        initial: 1,
        springStiffness: this.springStiffness,
        animationTime:   this.animationTime
    });

    this.resetContentSize( this.contentSize );
    this.goHome( true );
    this.update();
};

$.Viewport.prototype = /** @lends OpenSeadragon.Viewport.prototype */{

    /**
     * @function
     * @return {OpenSeadragon.Viewport} Chainable.
     * @fires OpenSeadragon.Viewer.event:reset-size
     */
    resetContentSize: function( contentSize ){
        this.contentSize    = contentSize;
        this.contentAspectX = this.contentSize.x / this.contentSize.y;
        this.contentAspectY = this.contentSize.y / this.contentSize.x;
        this.fitWidthBounds = new $.Rect( 0, 0, 1, this.contentAspectY );
        this.fitHeightBounds = new $.Rect( 0, 0, this.contentAspectY, this.contentAspectY);

        this.homeBounds = new $.Rect( 0, 0, 1, this.contentAspectY );

        if( this.viewer ){
            /**
             * Raised when the viewer's content size is reset (see {@link OpenSeadragon.Viewport#resetContentSize}).
             *
             * @event reset-size
             * @memberof OpenSeadragon.Viewer
             * @type {object}
             * @property {OpenSeadragon.Viewer} eventSource - A reference to the Viewer which raised this event.
             * @property {OpenSeadragon.Point} contentSize
             * @property {?Object} userData - Arbitrary subscriber-defined object.
             */
            this.viewer.raiseEvent( 'reset-size', {
                contentSize: contentSize
            });
        }

        return this;
    },

    /**
     * @function
     */
    getHomeZoom: function() {
        var aspectFactor =
            this.contentAspectX / this.getAspectRatio();

        if( this.defaultZoomLevel ){
            return this.defaultZoomLevel;
        } else {
            return ( aspectFactor >= 1 ) ?
                1 :
                aspectFactor;
        }
    },

    /**
     * @function
     */
    getHomeBounds: function() {
        var center = this.homeBounds.getCenter( ),
            width  = 1.0 / this.getHomeZoom( ),
            height = width / this.getAspectRatio();

        return new $.Rect(
            center.x - ( width / 2.0 ),
            center.y - ( height / 2.0 ),
            width,
            height
        );
    },

    /**
     * @function
     * @param {Boolean} immediately
     * @fires OpenSeadragon.Viewer.event:home
     */
    goHome: function( immediately ) {
        if( this.viewer ){
            /**
             * Raised when the "home" operation occurs (see {@link OpenSeadragon.Viewport#goHome}).
             *
             * @event home
             * @memberof OpenSeadragon.Viewer
             * @type {object}
             * @property {OpenSeadragon.Viewer} eventSource - A reference to the Viewer which raised this event.
             * @property {Boolean} immediately
             * @property {?Object} userData - Arbitrary subscriber-defined object.
             */
            this.viewer.raiseEvent( 'home', {
                immediately: immediately
            });
        }
        return this.fitBounds( this.getHomeBounds(), immediately );
    },

    /**
     * @function
     */
    getMinZoom: function() {
        var homeZoom = this.getHomeZoom(),
            zoom = this.minZoomLevel ?
            this.minZoomLevel :
                this.minZoomImageRatio * homeZoom;

        return Math.min( zoom, homeZoom );
    },

    /**
     * @function
     */
    getMaxZoom: function() {
        var zoom = this.maxZoomLevel ?
            this.maxZoomLevel :
                ( this.contentSize.x * this.maxZoomPixelRatio / this.containerSize.x );

        return Math.max( zoom, this.getHomeZoom() );
    },

    /**
     * @function
     */
    getAspectRatio: function() {
        return this.containerSize.x / this.containerSize.y;
    },

    /**
     * @function
     */
    getContainerSize: function() {
        return new $.Point(
            this.containerSize.x,
            this.containerSize.y
        );
    },

    /**
     * @function
     * @param {Boolean} current - Pass true for the current location; defaults to false (target location).
     */
    getBounds: function( current ) {
        var center = this.getCenter( current ),
            width  = 1.0 / this.getZoom( current ),
            height = width / this.getAspectRatio();

        return new $.Rect(
            center.x - ( width / 2.0 ),
            center.y - ( height / 2.0 ),
            width,
            height
        );
    },

    /**
     * @function
     * @param {Boolean} current - Pass true for the current location; defaults to false (target location).
     */
    getCenter: function( current ) {
        var centerCurrent = new $.Point(
                this.centerSpringX.current.value,
                this.centerSpringY.current.value
            ),
            centerTarget = new $.Point(
                this.centerSpringX.target.value,
                this.centerSpringY.target.value
            ),
            oldZoomPixel,
            zoom,
            width,
            height,
            bounds,
            newZoomPixel,
            deltaZoomPixels,
            deltaZoomPoints;

        if ( current ) {
            return centerCurrent;
        } else if ( !this.zoomPoint ) {
            return centerTarget;
        }

        oldZoomPixel = this.pixelFromPoint(this.zoomPoint, true);

        zoom    = this.getZoom();
        width   = 1.0 / zoom;
        height  = width / this.getAspectRatio();
        bounds  = new $.Rect(
            centerCurrent.x - width / 2.0,
            centerCurrent.y - height / 2.0,
            width,
            height
        );

        newZoomPixel    = this.zoomPoint.minus(
            bounds.getTopLeft()
        ).times(
            this.containerSize.x / bounds.width
        );
        deltaZoomPixels = newZoomPixel.minus( oldZoomPixel );
        deltaZoomPoints = deltaZoomPixels.divide( this.containerSize.x * zoom );

        return centerTarget.plus( deltaZoomPoints );
    },

    /**
     * @function
     * @param {Boolean} current - Pass true for the current location; defaults to false (target location).
     */
    getZoom: function( current ) {
        if ( current ) {
            return this.zoomSpring.current.value;
        } else {
            return this.zoomSpring.target.value;
        }
    },

    /**
     * @function
     * @return {OpenSeadragon.Viewport} Chainable.
     * @fires OpenSeadragon.Viewer.event:constrain
     */
    applyConstraints: function( immediately ) {
        var actualZoom = this.getZoom(),
            constrainedZoom = Math.max(
                Math.min( actualZoom, this.getMaxZoom() ),
                this.getMinZoom()
            ),
            bounds,
            horizontalThreshold,
            verticalThreshold,
            left,
            right,
            top,
            bottom,
            dx = 0,
            dy = 0;

        if ( actualZoom != constrainedZoom ) {
            this.zoomTo( constrainedZoom, this.zoomPoint, immediately );
        }

        bounds = this.getBounds();

        horizontalThreshold = this.visibilityRatio * bounds.width;
        verticalThreshold   = this.visibilityRatio * bounds.height;

        left   = bounds.x + bounds.width;
        right  = 1 - bounds.x;
        top    = bounds.y + bounds.height;
        bottom = this.contentAspectY - bounds.y;

        if ( this.wrapHorizontal ) {
            //do nothing
        } else {
            if ( left < horizontalThreshold ) {
                dx = horizontalThreshold - left;
            }
            if ( right < horizontalThreshold ) {
                dx = dx ?
                    ( dx + right - horizontalThreshold ) / 2 :
                    ( right - horizontalThreshold );
            }
        }

        if ( this.wrapVertical ) {
            //do nothing
        } else {
            if ( top < verticalThreshold ) {
                dy = ( verticalThreshold - top );
            }
            if ( bottom < verticalThreshold ) {
                dy =  dy ?
                    ( dy + bottom - verticalThreshold ) / 2 :
                    ( bottom - verticalThreshold );
            }
        }

        if ( dx || dy || immediately ) {
            bounds.x += dx;
            bounds.y += dy;
            if( bounds.width > 1  ){
                bounds.x = 0.5 - bounds.width/2;
            }
            if( bounds.height > this.contentAspectY ){
                bounds.y = this.contentAspectY/2 - bounds.height/2;
            }
            this.fitBounds( bounds, immediately );
        }

        if( this.viewer ){
            /**
             * Raised when the viewport constraints are applied (see {@link OpenSeadragon.Viewport#applyConstraints}).
             *
             * @event constrain
             * @memberof OpenSeadragon.Viewer
             * @type {object}
             * @property {OpenSeadragon.Viewer} eventSource - A reference to the Viewer which raised this event.
             * @property {Boolean} immediately
             * @property {?Object} userData - Arbitrary subscriber-defined object.
             */
            this.viewer.raiseEvent( 'constrain', {
                immediately: immediately
            });
        }

        return this;
    },

    /**
     * @function
     * @param {Boolean} immediately
     */
    ensureVisible: function( immediately ) {
        return this.applyConstraints( immediately );
    },

    /**
     * @function
     * @param {OpenSeadragon.Rect} bounds
     * @param {Boolean} immediately
     * @return {OpenSeadragon.Viewport} Chainable.
     */
    fitBounds: function( bounds, immediately ) {
        var aspect = this.getAspectRatio(),
            center = bounds.getCenter(),
            newBounds = new $.Rect(
                bounds.x,
                bounds.y,
                bounds.width,
                bounds.height
            ),
            oldBounds,
            oldZoom,
            newZoom,
            referencePoint;

        if ( newBounds.getAspectRatio() >= aspect ) {
            newBounds.height = bounds.width / aspect;
            newBounds.y      = center.y - newBounds.height / 2;
        } else {
            newBounds.width = bounds.height * aspect;
            newBounds.x     = center.x - newBounds.width / 2;
        }

        this.panTo( this.getCenter( true ), true );
        this.zoomTo( this.getZoom( true ), null, true );

        oldBounds = this.getBounds();
        oldZoom   = this.getZoom();
        newZoom   = 1.0 / newBounds.width;
        if ( newZoom == oldZoom || newBounds.width == oldBounds.width ) {
            return this.panTo( center, immediately );
        }

        referencePoint = oldBounds.getTopLeft().times(
            this.containerSize.x / oldBounds.width
        ).minus(
            newBounds.getTopLeft().times(
                this.containerSize.x / newBounds.width
            )
        ).divide(
            this.containerSize.x / oldBounds.width -
            this.containerSize.x / newBounds.width
        );

        return this.zoomTo( newZoom, referencePoint, immediately );
    },


    /**
     * @function
     * @param {Boolean} immediately
     * @return {OpenSeadragon.Viewport} Chainable.
     */
    fitVertically: function( immediately ) {
        var center = this.getCenter();

        if ( this.wrapHorizontal ) {
            center.x = ( 1 + ( center.x % 1 ) ) % 1;
            this.centerSpringX.resetTo( center.x );
            this.centerSpringX.update();
        }

        if ( this.wrapVertical ) {
            center.y = (
                this.contentAspectY + ( center.y % this.contentAspectY )
            ) % this.contentAspectY;
            this.centerSpringY.resetTo( center.y );
            this.centerSpringY.update();
        }

        return this.fitBounds( this.fitHeightBounds, immediately );
    },

    /**
     * @function
     * @param {Boolean} immediately
     * @return {OpenSeadragon.Viewport} Chainable.
     */
    fitHorizontally: function( immediately ) {
        var center = this.getCenter();

        if ( this.wrapHorizontal ) {
            center.x = (
                this.contentAspectX + ( center.x % this.contentAspectX )
            ) % this.contentAspectX;
            this.centerSpringX.resetTo( center.x );
            this.centerSpringX.update();
        }

        if ( this.wrapVertical ) {
            center.y = ( 1 + ( center.y % 1 ) ) % 1;
            this.centerSpringY.resetTo( center.y );
            this.centerSpringY.update();
        }

        return this.fitBounds( this.fitWidthBounds, immediately );
    },


    /**
     * @function
     * @param {OpenSeadragon.Point} delta
     * @param {Boolean} immediately
     * @return {OpenSeadragon.Viewport} Chainable.
     * @fires OpenSeadragon.Viewer.event:pan
     */
    panBy: function( delta, immediately ) {
        var center = new $.Point(
            this.centerSpringX.target.value,
            this.centerSpringY.target.value
        );
        delta = delta.rotate( -this.degrees, new $.Point( 0, 0 ) );
        return this.panTo( center.plus( delta ), immediately );
    },

    /**
     * @function
     * @param {OpenSeadragon.Point} center
     * @param {Boolean} immediately
     * @return {OpenSeadragon.Viewport} Chainable.
     * @fires OpenSeadragon.Viewer.event:pan
     */
    panTo: function( center, immediately ) {
        if ( immediately ) {
            this.centerSpringX.resetTo( center.x );
            this.centerSpringY.resetTo( center.y );
        } else {
            this.centerSpringX.springTo( center.x );
            this.centerSpringY.springTo( center.y );
        }

        if( this.viewer ){
            /**
             * Raised when the viewport is panned (see {@link OpenSeadragon.Viewport#panBy} and {@link OpenSeadragon.Viewport#panTo}).
             *
             * @event pan
             * @memberof OpenSeadragon.Viewer
             * @type {object}
             * @property {OpenSeadragon.Viewer} eventSource - A reference to the Viewer which raised this event.
             * @property {OpenSeadragon.Point} center
             * @property {Boolean} immediately
             * @property {?Object} userData - Arbitrary subscriber-defined object.
             */
            this.viewer.raiseEvent( 'pan', {
                center: center,
                immediately: immediately
            });
        }

        return this;
    },

    /**
     * @function
     * @return {OpenSeadragon.Viewport} Chainable.
     * @fires OpenSeadragon.Viewer.event:zoom
     */
    zoomBy: function( factor, refPoint, immediately ) {
        if( refPoint instanceof $.Point && !isNaN( refPoint.x ) && !isNaN( refPoint.y ) ) {
            refPoint = refPoint.rotate(
                -this.degrees,
                new $.Point( this.centerSpringX.target.value, this.centerSpringY.target.value )
            );
        }
        return this.zoomTo( this.zoomSpring.target.value * factor, refPoint, immediately );
    },

    /**
     * @function
     * @return {OpenSeadragon.Viewport} Chainable.
     * @fires OpenSeadragon.Viewer.event:zoom
     */
    zoomTo: function( zoom, refPoint, immediately ) {

        this.zoomPoint = refPoint instanceof $.Point &&
            !isNaN(refPoint.x) &&
            !isNaN(refPoint.y) ?
            refPoint :
            null;

        if ( immediately ) {
            this.zoomSpring.resetTo( zoom );
        } else {
            this.zoomSpring.springTo( zoom );
        }

        if( this.viewer ){
            /**
             * Raised when the viewport zoom level changes (see {@link OpenSeadragon.Viewport#zoomBy} and {@link OpenSeadragon.Viewport#zoomTo}).
             *
             * @event zoom
             * @memberof OpenSeadragon.Viewer
             * @type {object}
             * @property {OpenSeadragon.Viewer} eventSource - A reference to the Viewer which raised this event.
             * @property {Number} zoom
             * @property {OpenSeadragon.Point} refPoint
             * @property {Boolean} immediately
             * @property {?Object} userData - Arbitrary subscriber-defined object.
             */
            this.viewer.raiseEvent( 'zoom', {
                zoom: zoom,
                refPoint: refPoint,
                immediately: immediately
            });
        }

        return this;
    },

    /**
     * Currently only 90 degree rotation is supported and it only works
     * with the canvas. Additionally, the navigator does not rotate yet,
     * debug mode doesn't rotate yet, and overlay rotation is only
     * partially supported.
     * @function
     * @return {OpenSeadragon.Viewport} Chainable.
     */
    setRotation: function( degrees ) {
        if( !( this.viewer && this.viewer.drawer.canRotate() ) ) {
            return this;
        }

        degrees = ( degrees + 360 ) % 360;
        if( degrees % 90 !== 0 ) {
            throw new Error('Currently only 0, 90, 180, and 270 degrees are supported.');
        }
        this.degrees = degrees;
        this.viewer.drawer.update();
        
        return this;
    },

    /**
     * Gets the current rotation in degrees.
     * @function
     * @return {Number} The current rotation in degrees.
     */
    getRotation: function() {
        return this.degrees;
    },

    /**
     * @function
     * @return {OpenSeadragon.Viewport} Chainable.
     * @fires OpenSeadragon.Viewer.event:resize
     */
    resize: function( newContainerSize, maintain ) {
        var oldBounds = this.getBounds(),
            newBounds = oldBounds,
            widthDeltaFactor;

        this.containerSize = new $.Point(
            newContainerSize.x,
            newContainerSize.y
        );

        if ( maintain ) {
            widthDeltaFactor = newContainerSize.x / this.containerSize.x;
            newBounds.width  = oldBounds.width * widthDeltaFactor;
            newBounds.height = newBounds.width / this.getAspectRatio();
        }

        if( this.viewer ){
            /**
             * Raised when the viewer is resized (see {@link OpenSeadragon.Viewport#resize}).
             *
             * @event resize
             * @memberof OpenSeadragon.Viewer
             * @type {object}
             * @property {OpenSeadragon.Viewer} eventSource - A reference to the Viewer which raised this event.
             * @property {OpenSeadragon.Point} newContainerSize
             * @property {Boolean} maintain
             * @property {?Object} userData - Arbitrary subscriber-defined object.
             */
            this.viewer.raiseEvent( 'resize', {
                newContainerSize: newContainerSize,
                maintain: maintain
            });
        }

        return this.fitBounds( newBounds, true );
    },

    /**
     * @function
     */
    update: function() {
        var oldCenterX = this.centerSpringX.current.value,
            oldCenterY = this.centerSpringY.current.value,
            oldZoom    = this.zoomSpring.current.value,
            oldZoomPixel,
            newZoomPixel,
            deltaZoomPixels,
            deltaZoomPoints;

        if (this.zoomPoint) {
            oldZoomPixel = this.pixelFromPoint( this.zoomPoint, true );
        }

        this.zoomSpring.update();

        if (this.zoomPoint && this.zoomSpring.current.value != oldZoom) {
            newZoomPixel    = this.pixelFromPoint( this.zoomPoint, true );
            deltaZoomPixels = newZoomPixel.minus( oldZoomPixel );
            deltaZoomPoints = this.deltaPointsFromPixels( deltaZoomPixels, true );

            this.centerSpringX.shiftBy( deltaZoomPoints.x );
            this.centerSpringY.shiftBy( deltaZoomPoints.y );
        } else {
            this.zoomPoint = null;
        }

        this.centerSpringX.update();
        this.centerSpringY.update();

        return this.centerSpringX.current.value != oldCenterX ||
            this.centerSpringY.current.value != oldCenterY ||
            this.zoomSpring.current.value != oldZoom;
    },


    /**
     * Convert a delta (translation vector) from pixels coordinates to viewport coordinates
     * @function
     * @param {Boolean} current - Pass true for the current location; defaults to false (target location).
     */
    deltaPixelsFromPoints: function( deltaPoints, current ) {
        return deltaPoints.times(
            this.containerSize.x * this.getZoom( current )
        );
    },

    /**
     * Convert a delta (translation vector) from viewport coordinates to pixels coordinates.
     * @function
     * @param {Boolean} current - Pass true for the current location; defaults to false (target location).
     */
    deltaPointsFromPixels: function( deltaPixels, current ) {
        return deltaPixels.divide(
            this.containerSize.x * this.getZoom( current )
        );
    },

    /**
     * Convert image pixel coordinates to viewport coordinates.
     * @function
     * @param {Boolean} current - Pass true for the current location; defaults to false (target location).
     */
    pixelFromPoint: function( point, current ) {
        var bounds = this.getBounds( current );
        return point.minus(
            bounds.getTopLeft()
        ).times(
            this.containerSize.x / bounds.width
        );
    },

    /**
     * Convert viewport coordinates to image pixel coordinates.
     * @function
     * @param {Boolean} current - Pass true for the current location; defaults to false (target location).
     */
    pointFromPixel: function( pixel, current ) {
        var bounds = this.getBounds( current );
        return pixel.divide(
            this.containerSize.x / bounds.width
        ).plus(
            bounds.getTopLeft()
        );
    },

    /**
     * Translates from OpenSeadragon viewer coordinate system to image coordinate system.
     * This method can be called either by passing X,Y coordinates or an
     * OpenSeadragon.Point
     * @function
     * @param {OpenSeadragon.Point} viewerX the point in viewport coordinate system.
     * @param {Number} viewerX X coordinate in viewport coordinate system.
     * @param {Number} viewerY Y coordinate in viewport coordinate system.
     * @return {OpenSeadragon.Point} a point representing the coordinates in the image.
     */
    viewportToImageCoordinates: function( viewerX, viewerY ) {
        if ( arguments.length == 1 ) {
            //they passed a point instead of individual components
            return this.viewportToImageCoordinates( viewerX.x, viewerX.y );
        }
        return new $.Point( viewerX * this.contentSize.x, viewerY * this.contentSize.y * this.contentAspectX );
    },

    /**
     * Translates from image coordinate system to OpenSeadragon viewer coordinate system
     * This method can be called either by passing X,Y coordinates or an
     * OpenSeadragon.Point
     * @function
     * @param {OpenSeadragon.Point} imageX the point in image coordinate system.
     * @param {Number} imageX X coordinate in image coordinate system.
     * @param {Number} imageY Y coordinate in image coordinate system.
     * @return {OpenSeadragon.Point} a point representing the coordinates in the viewport.
     */
    imageToViewportCoordinates: function( imageX, imageY ) {
        if ( arguments.length == 1 ) {
            //they passed a point instead of individual components
            return this.imageToViewportCoordinates( imageX.x, imageX.y );
        }
        return new $.Point( imageX / this.contentSize.x, imageY / this.contentSize.y / this.contentAspectX );
    },

    /**
     * Translates from a rectangle which describes a portion of the image in
     * pixel coordinates to OpenSeadragon viewport rectangle coordinates.
     * This method can be called either by passing X,Y,width,height or an
     * OpenSeadragon.Rect
     * @function
     * @param {OpenSeadragon.Rect} imageX the rectangle in image coordinate system.
     * @param {Number} imageX the X coordinate of the top left corner of the rectangle
     * in image coordinate system.
     * @param {Number} imageY the Y coordinate of the top left corner of the rectangle
     * in image coordinate system.
     * @param {Number} pixelWidth the width in pixel of the rectangle.
     * @param {Number} pixelHeight the height in pixel of the rectangle.
     */
    imageToViewportRectangle: function( imageX, imageY, pixelWidth, pixelHeight ) {
        var coordA,
            coordB,
            rect;
        if( arguments.length == 1 ) {
            //they passed a rectangle instead of individual components
            rect = imageX;
            return this.imageToViewportRectangle(
                rect.x, rect.y, rect.width, rect.height
            );
        }
        coordA = this.imageToViewportCoordinates(
            imageX, imageY
        );
        coordB = this.imageToViewportCoordinates(
            pixelWidth, pixelHeight
        );
        return new $.Rect(
            coordA.x,
            coordA.y,
            coordB.x,
            coordB.y
        );
    },

    /**
     * Translates from a rectangle which describes a portion of
     * the viewport in point coordinates to image rectangle coordinates.
     * This method can be called either by passing X,Y,width,height or an
     * OpenSeadragon.Rect
     * @function
     * @param {OpenSeadragon.Rect} viewerX the rectangle in viewport coordinate system.
     * @param {Number} viewerX the X coordinate of the top left corner of the rectangle
     * in viewport coordinate system.
     * @param {Number} imageY the Y coordinate of the top left corner of the rectangle
     * in viewport coordinate system.
     * @param {Number} pointWidth the width of the rectangle in viewport coordinate system.
     * @param {Number} pointHeight the height of the rectangle in viewport coordinate system.
     */
    viewportToImageRectangle: function( viewerX, viewerY, pointWidth, pointHeight ) {
        var coordA,
            coordB,
            rect;
        if ( arguments.length == 1 ) {
            //they passed a rectangle instead of individual components
            rect = viewerX;
            return this.viewportToImageRectangle(
                rect.x, rect.y, rect.width, rect.height
            );
        }
        coordA = this.viewportToImageCoordinates( viewerX, viewerY );
        coordB = this.viewportToImageCoordinates( pointWidth, pointHeight );
        return new $.Rect(
            coordA.x,
            coordA.y,
            coordB.x,
            coordB.y
        );
    },

    /**
     * Convert pixel coordinates relative to the viewer element to image
     * coordinates.
     * @param {OpenSeadragon.Point} pixel
     * @returns {OpenSeadragon.Point}
     */
    viewerElementToImageCoordinates: function( pixel ) {
        var point = this.pointFromPixel( pixel, true );
        return this.viewportToImageCoordinates( point );
    },

    /**
     * Convert pixel coordinates relative to the image to
     * viewer element coordinates.
     * @param {OpenSeadragon.Point} point
     * @returns {OpenSeadragon.Point}
     */
    imageToViewerElementCoordinates: function( point ) {
        var pixel = this.pixelFromPoint( point, true );
        return this.imageToViewportCoordinates( pixel );
    },

    /**
     * Convert pixel coordinates relative to the window to image coordinates.
     * @param {OpenSeadragon.Point} pixel
     * @returns {OpenSeadragon.Point}
     */
    windowToImageCoordinates: function( pixel ) {
        var viewerCoordinates = pixel.minus(
                OpenSeadragon.getElementPosition( this.viewer.element ));
        return this.viewerElementToImageCoordinates( viewerCoordinates );
    },

    /**
     * Convert image coordinates to pixel coordinates relative to the window.
     * @param {OpenSeadragon.Point} pixel
     * @returns {OpenSeadragon.Point}
     */
    imageToWindowCoordinates: function( pixel ) {
        var viewerCoordinates = this.imageToViewerElementCoordinates( pixel );
        return viewerCoordinates.plus(
                OpenSeadragon.getElementPosition( this.viewer.element ));
    },

    /**
     * Convert pixel coordinates relative to the viewer element to viewport
     * coordinates.
     * @param {OpenSeadragon.Point} pixel
     * @returns {OpenSeadragon.Point}
     */
    viewerElementToViewportCoordinates: function( pixel ) {
        return this.pointFromPixel( pixel, true );
    },

    /**
     * Convert viewport coordinates to pixel coordinates relative to the
     * viewer element.
     * @param {OpenSeadragon.Point} point
     * @returns {OpenSeadragon.Point}
     */
    viewportToViewerElementCoordinates: function( point ) {
        return this.pixelFromPoint( point, true );
    },

    /**
     * Convert pixel coordinates relative to the window to viewport coordinates.
     * @param {OpenSeadragon.Point} pixel
     * @returns {OpenSeadragon.Point}
     */
    windowToViewportCoordinates: function( pixel ) {
        var viewerCoordinates = pixel.minus(
                OpenSeadragon.getElementPosition( this.viewer.element ));
        return this.viewerElementToViewportCoordinates( viewerCoordinates );
    },

    /**
     * Convert viewport coordinates to pixel coordinates relative to the window.
     * @param {OpenSeadragon.Point} point
     * @returns {OpenSeadragon.Point}
     */
    viewportToWindowCoordinates: function( point ) {
        var viewerCoordinates = this.viewportToViewerElementCoordinates( point );
        return viewerCoordinates.plus(
                OpenSeadragon.getElementPosition( this.viewer.element ));
    },
    
    /**
     * Convert a viewport zoom to an image zoom.
     * Image zoom: ratio of the original image size to displayed image size.
     * 1 means original image size, 0.5 half size...
     * Viewport zoom: ratio of the displayed image's width to viewport's width.
     * 1 means identical width, 2 means image's width is twice the viewport's width...
     * @function
     * @param {Number} viewportZoom The viewport zoom
     * target zoom.
     * @returns {Number} imageZoom The image zoom
     */
    viewportToImageZoom: function( viewportZoom ) {
        var imageWidth = this.viewer.source.dimensions.x;
        var containerWidth = this.getContainerSize().x;
        var viewportToImageZoomRatio = containerWidth / imageWidth;
        return viewportZoom * viewportToImageZoomRatio;
    },
    
    /**
     * Convert an image zoom to a viewport zoom.
     * Image zoom: ratio of the original image size to displayed image size.
     * 1 means original image size, 0.5 half size...
     * Viewport zoom: ratio of the displayed image's width to viewport's width.
     * 1 means identical width, 2 means image's width is twice the viewport's width...
     * @function
     * @param {Number} imageZoom The image zoom
     * target zoom.
     * @returns {Number} viewportZoom The viewport zoom
     */
    imageToViewportZoom: function( imageZoom ) {
        var imageWidth = this.viewer.source.dimensions.x;
        var containerWidth = this.getContainerSize().x;
        var viewportToImageZoomRatio = imageWidth / containerWidth;
        return imageZoom * viewportToImageZoomRatio;
    }
};

}( OpenSeadragon ));
