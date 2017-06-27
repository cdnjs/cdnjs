/*
YUI 3.17.1 (build 0eb5a52)
Copyright 2014 Yahoo! Inc. All rights reserved.
Licensed under the BSD License.
http://yuilibrary.com/license/
*/

YUI.add('widget-skin', function (Y, NAME) {

/**
 * Provides skin related utlility methods.
 *
 * @module widget
 * @submodule widget-skin
 */
var BOUNDING_BOX = "boundingBox",
    CONTENT_BOX = "contentBox",
    SKIN = "skin",
    _getClassName = Y.ClassNameManager.getClassName;

/**
 * Returns the name of the skin that's currently applied to the widget.
 *
 * Searches up the Widget's ancestor axis for, by default, a class
 * yui3-skin-(name), and returns the (name) portion. Otherwise, returns null.
 *
 * This is only really useful after the widget's DOM structure is in the
 * document, either by render or by progressive enhancement.
 *
 * @method getSkinName
 * @for Widget
 * @param {String} [skinPrefix] The prefix which the implementation uses for the skin
 * ("yui3-skin-" is the default).
 *
 * NOTE: skinPrefix will be used as part of a regular expression:
 *
 *     new RegExp('\\b' + skinPrefix + '(\\S+)')
 *
 * Although an unlikely use case, literal characters which may result in an invalid
 * regular expression should be escaped.
 *
 * @return {String} The name of the skin, or null, if a matching skin class is not found.
 */

Y.Widget.prototype.getSkinName = function (skinPrefix) {

    var root = this.get( CONTENT_BOX ) || this.get( BOUNDING_BOX ),
        match,
        search;

    skinPrefix = skinPrefix || _getClassName(SKIN, "");

    search = new RegExp( '\\b' + skinPrefix + '(\\S+)' );

    if ( root ) {
        root.ancestor( function ( node ) {
            match = node.get( 'className' ).match( search );
            return match;
        } );
    }

    return ( match ) ? match[1] : null;
};


}, '3.17.1', {"requires": ["widget-base"]});
