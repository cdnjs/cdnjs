(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.stickybits = factory());
}(this, (function () { 'use strict';

/*
  STICKYBITS 💉
  --------
  a lightweight alternative to `position: sticky` polyfills 🍬
*/
function Stickybit(target, o) {
  /*
    defaults 🔌
    --------
    - target = el (DOM element)
    - se = scroll element (DOM element used for scroll event)
    - offset = 0 || dealer's choice
    - verticalPosition = top || bottom
    - useStickyClasses = boolean
  */
  this.el = target;
  this.se = o && o.scrollEl || window;
  this.offset = o && o.stickyBitStickyOffset || 0;
  this.vp = o && o.verticalPosition || 'top';
  this.useClasses = o && o.useStickyClasses || false;
  this.styles = this.el.style;
  this.setStickyPosition();
  if (this.positionVal === 'fixed' || this.useClasses === true) {
    this.manageStickiness();
  }
  return this;
}

/*
  setStickyPosition ✔️
  --------
  — most basic thing stickybits does
  => checks to see if position sticky is supported
  => stickybits works accordingly
*/
Stickybit.prototype.setStickyPosition = function setStickyPosition() {
  var prefix = ['', '-o-', '-webkit-', '-moz-', '-ms-'];
  var styles = this.styles;
  var vp = this.vp;
  for (var i = 0; i < prefix.length; i += 1) {
    styles.position = prefix[i] + 'sticky';
  }
  if (styles.position !== '') {
    this.positionVal = styles.position;
    if (vp === 'top') {
      styles[vp] = this.offset + 'px';
    }
  } else this.positionVal = 'fixed';
  return this;
};

/*
  manageStickiness ✔️
  --------
  — manages stickybit state
  => checks to see if the element is sticky || stuck
  => based on window scroll
*/
Stickybit.prototype.manageStickiness = function manageStickiness() {
  // cache variables
  var el = this.el;
  var parent = el.parentNode;
  var pv = this.positionVal;
  var vp = this.vp;
  var styles = this.styles;
  var se = this.se;
  var isWin = se === window;
  var seOffset = !isWin && this.positionVal === 'fixed' ? se.getBoundingClientRect().top : 0;
  var offset = seOffset + this.offset;
  var rAF = typeof se.requestAnimationFrame !== 'undefined' ? se.requestAnimationFrame : function rAFDummy(f) {
    f();
  };

  // setup css classes
  parent.className += ' js-stickybit-parent';
  var stickyClass = 'js-is-sticky';
  var stuckClass = 'js-is-stuck';
  // r arg = removeClass
  // a arg = addClass
  function toggleClasses(r, a) {
    var cArray = el.className.split(' ');
    if (a && cArray.indexOf(a) === -1) cArray.push(a);
    var rItem = cArray.indexOf(r);
    if (rItem !== -1) cArray.splice(rItem, 1);
    el.className = cArray.join(' ');
  }

  // manageState
  /* stickyStart =>
    -  checks if stickyBits is using window
        -  if it is using window, it gets the top offset of the parent
        -  if it is not using window,
           -  it gets the top offset of the scrollEl - the top offset of the parent
  */
  var stickyStart = isWin ? parent.getBoundingClientRect().top : parent.getBoundingClientRect().top - seOffset;
  var stickyStop = stickyStart + parent.offsetHeight - (el.offsetHeight - offset);
  var state = 'default';

  this.manageState = function () {
    var scroll = isWin ? se.scrollY || se.pageYOffset : se.scrollTop;
    var notSticky = scroll > stickyStart && scroll < stickyStop && (state === 'default' || state === 'stuck');
    var isSticky = scroll < stickyStart && state === 'sticky';
    var isStuck = scroll > stickyStop && state === 'sticky';
    if (notSticky) {
      state = 'sticky';
      rAF(function () {
        toggleClasses(stuckClass, stickyClass);
        styles.bottom = '';
        styles.position = pv;
        styles[vp] = offset + 'px';
      });
    } else if (isSticky) {
      state = 'default';
      rAF(function () {
        toggleClasses(stickyClass);
        if (pv === 'fixed') styles.position = '';
      });
    } else if (isStuck) {
      state = 'stuck';
      rAF(function () {
        toggleClasses(stickyClass, stuckClass);
        if (pv !== 'fixed') return;
        styles.top = '';
        styles.bottom = '0';
        styles.position = 'absolute';
      });
    }
  };

  se.addEventListener('scroll', this.manageState);
  return this;
};

/*
  cleanup 🛁
  --------
  - target = el (DOM element)
  - scrolltarget = window || 'dealer's chose'
  - scroll = removes scroll event listener
*/
Stickybit.prototype.cleanup = function cleanup() {
  var el = this.el;
  var styles = this.styles;
  // cleanup styles
  styles.position = '';
  styles[this.vp] = '';
  // cleanup CSS classes
  function removeClass(selector, c) {
    var s = selector;
    var cArray = s.className.split(' ');
    var cItem = cArray.indexOf(c);
    if (cItem !== -1) cArray.splice(cItem, 1);
    s.className = cArray.join(' ');
  }
  removeClass(el, 'js-is-sticky');
  removeClass(el, 'js-is-stuck');
  removeClass(el.parentNode, 'js-stickybit-parent');
  // remove scroll event listener
  this.se.removeEventListener('scroll', this.manageState);
  // turn of sticky invocation
  this.manageState = false;
};

function MultiBits(userInstances) {
  this.privateInstances = userInstances || [];
  var instances = this.privateInstances;
  this.cleanup = function () {
    for (var i = 0; i < instances.length; i += 1) {
      var instance = instances[i];
      instance.cleanup();
    }
  };
}

function stickybits(target, o) {
  var els = typeof target === 'string' ? document.querySelectorAll(target) : target;
  if (!('length' in els)) els = [els];
  var instances = [];
  for (var i = 0; i < els.length; i += 1) {
    var el = els[i];
    instances.push(new Stickybit(el, o));
  }
  return new MultiBits(instances);
}

return stickybits;

})));
