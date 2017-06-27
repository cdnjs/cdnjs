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

  function Layzr(options) {
    // debounce
    this._lastScroll = 0;
    this._ticking = false;

    // options
    this._optionsSelector = options.selector || '[data-layzr]';
    this._optionsAttr = options.attr || 'data-layzr';
    this._optionsAttrRetina = options.retinaAttr || 'data-layzr-retina';
    this._optionsAttrBg = options.bgAttr || 'data-layzr-bg';
    this._optionsThreshold = options.threshold || 0;
    this._optionsCallback = options.callback || null;

    // properties
    this._retina = window.devicePixelRatio > 1;
    this._srcAttr = this._retina ? this._optionsAttrRetina : this._optionsAttr;

    // nodelist
    this._nodes = document.querySelectorAll(this._optionsSelector);

    // call to create
    this._create();
  }

  // DEBOUNCE HELPERS
  // adapted from: http://www.html5rocks.com/en/tutorials/speed/animations/

  Layzr.prototype._requestScroll = function() {
    this._lastScroll = window.scrollY || window.pageYOffset;
    this._requestTick();
  };

  Layzr.prototype._requestTick = function() {
    if(!this._ticking) {
      requestAnimationFrame(this.update.bind(this));
      this._ticking = true;
    }
  };

  // OFFSET HELPER
  // borrowed from: http://stackoverflow.com/questions/5598743/finding-elements-position-relative-to-the-document

  Layzr.prototype._getOffset = function(element) {
    var offsetTop  = 0;

    do {
      if(!isNaN(element.offsetTop)) {
        offsetTop  += element.offsetTop;
      }
    } while (element = element.offsetParent);

    return offsetTop;
  };

  // LAYZR METHODS

  Layzr.prototype._create = function() {
    // fire scroll event once
    this._requestScroll();

    // bind scroll and resize event
    window.addEventListener('scroll', this._requestScroll.bind(this), false);
    window.addEventListener('resize', this._requestScroll.bind(this), false);
  };

  Layzr.prototype._destroy = function() {
    // possibly remove attributes, and set all sources?

    // unbind scroll and resize event
    window.removeEventListener('scroll', this._requestScroll.bind(this), false);
    window.removeEventListener('resize', this._requestScroll.bind(this), false);
  };

  Layzr.prototype._inViewport = function(node) {
    // get viewport top and bottom offset
    var viewportTop = this._lastScroll;
    var viewportBottom = viewportTop + window.innerHeight;

    // get node top and bottom offset
    var elementTop = this._getOffset(node);
    var elementBottom = elementTop + node.offsetHeight;

    // calculate threshold, convert percentage to pixel value
    var threshold = (this._optionsThreshold / 100) * window.innerHeight;

    // return if element in viewport
    return elementBottom >= viewportTop - threshold && elementBottom <= viewportBottom + threshold;
  };

  Layzr.prototype._reveal = function(node) {
    // get node source
    var source = node.getAttribute(this._srcAttr) || node.getAttribute(this._optionsAttr);

    // set node src or bg image
    if(node.hasAttribute(this._optionsAttrBg)) {
      node.style.backgroundImage = 'url(' + source + ')';
    }
    else {
      node.setAttribute('src', source);
    }

    // call the callback
    if(typeof this._optionsCallback === 'function') {
      // "this" will be the node in the callback
      this._optionsCallback.call(node);
    }

    // remove node data attributes
    node.removeAttribute(this._optionsAttr);
    node.removeAttribute(this._optionsAttrRetina);
    node.removeAttribute(this._optionsAttrBg);
  };

  Layzr.prototype.updateSelector = function() {
    // update cached list of elements matching selector
    this._nodes = document.querySelectorAll(this._optionsSelector);
  };

  Layzr.prototype.update = function() {
    // cache nodelist length
    var nodesLength = this._nodes.length;

    // loop through nodes
    for(var i = 0; i < nodesLength; i++) {
      // cache node
      var node = this._nodes[i];

      // check if node has mandatory attribute
      if(node.hasAttribute(this._optionsAttr)) {
        // check if node in viewport
        if(this._inViewport(node)) {
          // reveal node
          this._reveal(node);
        }
      }
    }

    // allow for more animation frames
    this._ticking = false;
  };

  return Layzr;
}));
