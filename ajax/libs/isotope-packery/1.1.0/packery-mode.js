/*!
 * Packery layout mode v1.1.0
 * sub-classes Packery
 * http://packery.metafizzy.co
 */

/*jshint browser: true, strict: true, undef: true, unused: true */

( function( window ) {

'use strict';

// -------------------------- helpers -------------------------- //

// extend objects
function extend( a, b ) {
  for ( var prop in b ) {
    a[ prop ] = b[ prop ];
  }
  return a;
}

// -------------------------- masonryDefinition -------------------------- //

// used for AMD definition and requires
function packeryDefinition( LayoutMode, Packery, getSize ) {
  // create an Outlayer layout class
  var PackeryMode = LayoutMode.create('packery');

  // save on to these methods
  var _getElementOffset = PackeryMode.prototype._getElementOffset;
  // var layout = PackeryMode.prototype.layout;
  var _getMeasurement = PackeryMode.prototype._getMeasurement;

  // sub-class Masonry
  extend( PackeryMode.prototype, Packery.prototype );

  // set back, as it was overwritten by Packery
  PackeryMode.prototype._getElementOffset = _getElementOffset;
  // PackeryMode.prototype.layout = layout;
  PackeryMode.prototype._getMeasurement = _getMeasurement;

  // set packery in _resetLayout
  var _resetLayout = PackeryMode.prototype._resetLayout;
  PackeryMode.prototype._resetLayout = function() {
    this.packer = this.packer || new Packery.Packer();
    _resetLayout.apply( this, arguments );
  };

  var _getItemLayoutPosition = PackeryMode.prototype._getItemLayoutPosition;
  PackeryMode.prototype._getItemLayoutPosition = function( item ) {
    // set packery rect
    item.rect = item.rect || new Packery.Rect();
    return _getItemLayoutPosition.call( this, item );
  };

  // HACK copy over isOriginLeft/Top options
  var _manageStamp = PackeryMode.prototype._manageStamp;
  PackeryMode.prototype._manageStamp = function() {
    this.options.isOriginLeft = this.isotope.options.isOriginLeft;
    this.options.isOriginTop = this.isotope.options.isOriginTop;
    _manageStamp.apply( this, arguments );
  };

  PackeryMode.prototype.needsResizeLayout = function() {
    // don't trigger if size did not change
    var size = getSize( this.element );
    // check that this.size and size are there
    // IE8 triggers resize on body size change, so they might not be
    var hasSizes = this.size && size;
    var innerSize = this.options.isHorizontal ? 'innerHeight' : 'innerWidth';
    return hasSizes && size[ innerSize ] !== this.size[ innerSize ];
  };

  return PackeryMode;
}

// -------------------------- transport -------------------------- //

if ( typeof define === 'function' && define.amd ) {
  // AMD
  define( [
      'isotope/js/layout-mode',
      'packery/js/packery',
      'get-size/get-size'
    ],
    packeryDefinition );
} else if ( typeof exports === 'object' ) {
  // CommonJS
  module.exports = packeryDefinition(
    require('isotope-layout/js/layout-mode'),
    require('packery'),
    require('get-size')
  );
} else {
  // browser global
  packeryDefinition(
    window.Isotope.LayoutMode,
    window.Packery,
    window.getSize
  );
}

})( window );
