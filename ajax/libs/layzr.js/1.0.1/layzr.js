(function(root, factory) {
  if(typeof define === 'function' && define.amd) {
    define([], factory);
  } else if(typeof exports === 'object') {
    module.exports = factory();
  } else {
    root.Layzr = factory();
  }
}(this, function() {
  'use strict';

  // CONSTRUCTOR

  function Layzr( options ) {
    // debounce
    this._lastScroll = 0;
    this._ticking = false;

    // options
    this._optionsAttr = options.attr || 'data-layzr';
    this._optionsAttrRetina = options.retinaAttr || 'data-layzr-retina';
    this._optionsThreshold = options.threshold || 0;
    this._optionsCallback = options.callback || null;

    // properties
    this._retina = window.devicePixelRatio > 1 ? true : false;
    this._imgAttr = this._retina ? this._optionsAttrRetina : this._optionsAttr;

    // images nodelist
    this._images = document.getElementsByTagName('img');

    // call to create
    document.addEventListener('DOMContentLoaded', this._create(), false);
  }

  // DEBOUNCE METHODS
  // adapted from: http://www.html5rocks.com/en/tutorials/speed/animations/

  Layzr.prototype._requestScroll = function() {
    this._lastScroll = window.scrollY || window.pageYOffset;
    this._requestTick();
  }

  Layzr.prototype._requestTick = function() {
    if(!this._ticking) {
      requestAnimationFrame(this.update.bind(this));
      this._ticking = true;
    }
  }

  // Layzr METHODS

  Layzr.prototype._create = function() {
    // fire scroll event once
    this._requestScroll();

    // bind scroll and resize event
    window.addEventListener('scroll', this._requestScroll.bind(this), false);
    window.addEventListener('resize', this._requestScroll.bind(this), false);
  }

  Layzr.prototype._destroy = function() {
    // possibly remove attributes, and set all sources?

    // unbind scroll and resize event
    window.removeEventListener('scroll', this._requestScroll.bind(this), false);
    window.removeEventListener('resize', this._requestScroll.bind(this), false);
  }

  // offset helper
  // borrowed from: http://stackoverflow.com/questions/5598743/finding-elements-position-relative-to-the-document

  Layzr.prototype._getOffset = function( element ) {
    var offsetTop  = 0;

    do {
      if(!isNaN(element.offsetTop)) {
        offsetTop  += element.offsetTop;
      }
    } while (element = element.offsetParent);

    return offsetTop;
  }

  Layzr.prototype._inViewport = function( imageNode ) {
    // get viewport top and bottom offset
    var viewportTop = this._lastScroll;
    var viewportBottom = viewportTop + window.innerHeight;

    // get image top and bottom offset
    var elementTop = this._getOffset(imageNode);
    var elementBottom = elementTop + imageNode.offsetHeight;

    // calculate threshold, convert percentage to pixel value
    var threshold = (this._optionsThreshold / 100) * window.innerHeight;

    // return if element in viewport
    return elementBottom >= viewportTop - threshold && elementBottom <= viewportBottom + threshold;
  }

  Layzr.prototype.update = function() {
    // cache image nodelist length
    var imagesLength = this._images.length;

    // loop through images
    for(var i = 0; i < imagesLength; i++) {
      // cache image
      var image = this._images[i];

      // check if image has attribute
      if(image.hasAttribute(this._imgAttr) || image.hasAttribute(this._optionsAttr)) {
        // check if image in viewport
        if(this._inViewport(image)) {
          // reveal image
          this.reveal(image);
        }
      }
    }

    // allow for more animation frames
    this._ticking = false;
  }

  Layzr.prototype.reveal = function( imageNode ) {
    // get image source
    var source = imageNode.getAttribute(this._imgAttr) || imageNode.getAttribute(this._optionsAttr);

    // remove image data attributes
    imageNode.removeAttribute(this._optionsAttr);
    imageNode.removeAttribute(this._optionsAttrRetina);

    // set image source, if it has one
    if(source) {
      imageNode.setAttribute('src', source);

      // call the callback
      if(typeof this._optionsCallback === 'function') {
        // this will be the image node in the callback
        this._optionsCallback.call(imageNode);
      }
    }
  }

  return Layzr;
}));
