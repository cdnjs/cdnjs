(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.stickybits = factory());
}(this, (function () { 'use strict';

/*
  STICKYBITS 💉
  --------
  > a lightweight alternative to `position: sticky` polyfills 🍬
  --------
  - each method is documented above it our view the readme
  - Stickybits does not manage polymorphic functionality (position like properties)
  * polymorphic functionality: (in the context of describing Stickybits)
    means making things like `position: sticky` be loosely supported with position fixed.
    It also means that features like `useStickyClasses` takes on styles like `position: fixed`.
  --------
  defaults 🔌
  --------
  - version = `package.json` version
  - userAgent = viewer browser agent
  - target = DOM element selector
  - noStyles = boolean
  - offset = number
  - parentClass = 'string'
  - scrollEl = window || DOM element selector
  - stickyClass = 'string'
  - stuckClass = 'string'
  - useStickyClasses = boolean
  - verticalPosition = 'string'
  --------
  props🔌
  --------
  - p = props {object}
  --------
  instance note
  --------
  - stickybits parent methods return this
  - stickybits instance methods return an instance item
  --------
  nomenclature
  --------
  - target => el => e
  - props => o || p
  - instance => item => it
  --------
  methods
  --------
  - .definePosition = defines sticky or fixed
  - .addInstance = an array of objects for each Stickybits Target
  - .getClosestParent = gets the parent for non-window scroll
  - .computeScrollOffsets = computes scroll position
  - .toggleClasses = older browser toggler
  - .manageState = manages sticky state
  - .removeClass = older browser support class remover
  - .removeInstance = removes an instance
  - .cleanup = removes all Stickybits instances and cleans up dom from stickybits
*/
function Stickybits(target, obj) {
  var o = typeof obj !== 'undefined' ? obj : {};
  this.version = '2.0.8';
  this.userAgent = window.navigator.userAgent || 'no `userAgent` provided by the browser';
  this.props = {
    noStyles: o.noStyles || false,
    stickyBitStickyOffset: o.stickyBitStickyOffset || 0,
    parentClass: o.parentClass || 'js-stickybit-parent',
    scrollEl: o.scrollEl || window,
    stickyClass: o.stickyClass || 'js-is-sticky',
    stuckClass: o.stuckClass || 'js-is-stuck',
    useStickyClasses: o.useStickyClasses || false,
    verticalPosition: o.verticalPosition || 'top'
  };
  var p = this.props;
  /*
    define positionVal
    ----
    -  uses a computed (`.definePosition()`)
    -  defined the position
  */
  p.positionVal = this.definePosition() || 'fixed';
  var vp = p.verticalPosition;
  var ns = p.noStyles;
  var pv = p.positionVal;
  this.els = typeof target === 'string' ? document.querySelectorAll(target) : target;
  if (!('length' in this.els)) this.els = [this.els];
  this.instances = [];
  for (var i = 0; i < this.els.length; i += 1) {
    var el = this.els[i];
    var styles = el.style;
    if (vp === 'top' && !ns) styles[vp] = p.stickyBitStickyOffset + 'px';
    if (pv !== 'fixed' && p.useStickyClasses === false) {
      styles.position = pv;
    } else {
      // const stickyManager = new ManageSticky(el, p)
      if (pv !== 'fixed') styles.position = pv;
      var instance = this.addInstance(el, p);
      // instances are an array of objects
      this.instances.push(instance);
    }
  }
  return this;
}

/*
  setStickyPosition ✔️
  --------
  —  most basic thing stickybits does
  => checks to see if position sticky is supported
  => defined the position to be used
  => stickybits works accordingly
*/
Stickybits.prototype.definePosition = function () {
  var prefix = ['', '-o-', '-webkit-', '-moz-', '-ms-'];
  var test = document.head.style;
  for (var i = 0; i < prefix.length; i += 1) {
    test.position = prefix[i] + 'sticky';
  }
  var stickyProp = 'fixed';
  if (typeof test.position !== 'undefined') stickyProp = test.position;
  test.position = '';
  return stickyProp;
};

/*
  addInstance ✔️
  --------
  — manages instances of items
  - takes in an el and props
  - returns an item object
  ---
  - target = el
  - o = {object} = props
    - scrollEl = 'string'
    - verticalPosition = number
    - off = boolean
    - parentClass = 'string'
    - stickyClass = 'string'
    - stuckClass = 'string'
  ---
  - defined later
    - parent = dom element
    - state = 'string'
    - offset = number
    - stickyStart = number
    - stickyStop = number
  - returns an instance object
*/
Stickybits.prototype.addInstance = function addInstance(el, props) {
  var _this = this;

  var item = {
    el: el,
    parent: el.parentNode,
    props: props
  };
  var p = item.props;
  item.parent.className += ' ' + props.parentClass;
  var se = p.scrollEl;
  item.isWin = se === window;
  if (!item.isWin) se = this.getClosestParent(item.el, se);
  this.computeScrollOffsets(item);
  item.state = 'default';
  item.stateContainer = function () {
    _this.manageState(item);
  };
  se.addEventListener('scroll', item.stateContainer);
  return item;
};

/*
  --------
  getParent 👨‍
  --------
  - a helper function that gets the target element's parent selected el
  - only used for non `window` scroll elements
  - supports older browsers
*/
Stickybits.prototype.getClosestParent = function getClosestParent(el, matchSelector) {
  // p = parent element
  var p = document.querySelector(matchSelector);
  var e = el;
  if (e.parentElement === p) return p;
  // traverse up the dom tree until we get to the parent
  while (e.parentElement !== p) {
    e = e.parentElement;
  } // return parent element
  return p;
};

/*
  computeScrollOffsets 📊
  ---
  computeScrollOffsets for Stickybits
  - defines
    - offset
    - start
    - stop
*/
Stickybits.prototype.computeScrollOffsets = function computeScrollOffsets(item) {
  var it = item;
  var p = it.props;
  var parent = it.parent;
  var iw = it.isWin;
  var scrollElOffset = 0;
  var stickyStart = parent.getBoundingClientRect().top;
  if (!iw && p.positionVal === 'fixed') {
    scrollElOffset = p.scrollEl.getBoundingClientRect().top;
    stickyStart = parent.getBoundingClientRect().top - scrollElOffset;
  }
  it.offset = scrollElOffset + p.stickyBitStickyOffset;
  it.stickyStart = stickyStart;
  it.stickyStop = it.stickyStart + parent.offsetHeight - (it.el.offsetHeight - it.offset);
  return it;
};

/*
  toggleClasses ⚖️
  ---
  toggles classes (for older browser support)
  r = removed class
  a = added class
*/
Stickybits.prototype.toggleClasses = function toggleClasses(el, r, a) {
  var e = el;
  var cArray = e.className.split(' ');
  if (a && cArray.indexOf(a) === -1) cArray.push(a);
  var rItem = cArray.indexOf(r);
  if (rItem !== -1) cArray.splice(rItem, 1);
  e.className = cArray.join(' ');
};

/*
  manageState 📝
  ---
  - defines the state
    - normal
    - sticky
    - stuck
*/
Stickybits.prototype.manageState = function manageState(item) {
  // cache object
  var it = item;
  var e = it.el;
  var p = it.props;
  var state = it.state;
  var start = it.stickyStart;
  var stop = it.stickyStop;
  var stl = e.style;
  // cache props
  var ns = p.noStyles;
  var pv = p.positionVal;
  var se = p.scrollEl;
  var sticky = p.stickyClass;
  var stuck = p.stuckClass;
  var vp = p.verticalPosition;
  /*
    requestAnimationFrame
    ---
    - use rAF
    - or stub rAF
  */
  var rAF = se.requestAnimationFrame;
  if (!it.isWin || typeof rAF === 'undefined') {
    rAF = function rAFDummy(f) {
      f();
    };
  }
  /*
    define scroll vars
    ---
    - scroll
    - notSticky
    - isSticky
    - isStuck
  */
  var tC = this.toggleClasses;
  var scroll = it.isWin ? se.scrollY || se.pageYOffset : se.scrollTop;
  var notSticky = scroll > start && scroll < stop && (state === 'default' || state === 'stuck');
  var isSticky = scroll <= start && state === 'sticky';
  var isStuck = scroll >= stop && state === 'sticky';
  /*
    Unnamed arrow functions within this block
    ---
    - help wanted or discussion
    - view test.stickybits.js
      - `stickybits .manageState  `position: fixed` interface` for more awareness 👀
  */
  if (notSticky) {
    it.state = 'sticky';
    rAF(function () {
      tC(e, stuck, sticky);
      stl.position = pv;
      if (ns) return;
      stl.bottom = '';
      stl[vp] = p.stickyBitStickyOffset + 'px';
    });
  } else if (isSticky) {
    it.state = 'default';
    rAF(function () {
      tC(e, sticky);
      if (pv === 'fixed') stl.position = '';
    });
  } else if (isStuck) {
    it.state = 'stuck';
    rAF(function () {
      tC(e, sticky, stuck);
      if (pv !== 'fixed' || ns) return;
      stl.top = '';
      stl.bottom = '0';
      stl.position = 'absolute';
    });
  }
  return it;
};

/*
  removes an instance 👋
  --------
  - cleanup instance
*/
Stickybits.prototype.removeInstance = function removeInstance(instance) {
  var e = instance.el;
  var p = instance.props;
  var tC = this.toggleClasses;
  e.style.position = '';
  e.style[p.verticalPosition] = '';
  tC(e, p.stickyClass);
  tC(e, p.stuckClass);
  tC(e.parentNode, p.parentClass);
};

/*
  cleanup 🛁
  --------
  - cleans up each instance
  - clears instance
*/
Stickybits.prototype.cleanup = function cleanup() {
  for (var i = 0; i < this.instances.length; i += 1) {
    var instance = this.instances[i];
    instance.props.scrollEl.removeEventListener('scroll', instance.stateContainer);
    this.removeInstance(instance);
  }
  this.manageState = false;
  this.instances = [];
};

/*
  export
  --------
  exports StickBits to be used 🏁
*/
function stickybits(target, o) {
  return new Stickybits(target, o);
}

return stickybits;

})));
