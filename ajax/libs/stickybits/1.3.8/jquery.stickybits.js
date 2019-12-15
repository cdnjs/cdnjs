(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(factory());
}(this, (function () { 'use strict';

/*
  STICKYBITS 💉
  --------
  a lightweight alternative to `position: sticky` polyfills 🍬
*/
function Stickybit(target, o) {
  if (typeof window === 'undefined') throw Error('stickybits requires `window`');
  /*
    defaults 🔌
    --------
    - target = el (DOM element)
    - offset = 0 || 'dealer's choice'
    - verticalPosition = top || bottom
    - useStickyClasses =
    - elStyles = CSS Styles
    - positionVal = fixed || sticky
  */
  this.el = target;
  this.offset = o && o.stickyBitStickyOffset || 0;
  this.vp = o && o.verticalPosition || 'top';
  this.useClasses = o && o.useStickyClasses || false;
  this.styles = this.el.style;
  this.positionVal = 'fixed';
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
  }
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
  var offset = this.offset;
  var styles = this.styles;
  var classes = el.classList;
  var win = window;
  var rAF = win.requestAnimationFrame;

  // setup css classes
  parent.classList.add('js-stickybit-parent');
  var stickyClass = 'js-is-sticky';
  var stuckClass = 'js-is-stuck';

  // manageState
  var stickyStart = parent.getBoundingClientRect().top;
  var stickyStop = stickyStart + parent.offsetHeight - (el.offsetHeight - offset);
  var state = 'default';

  this.manageState = function () {
    var scroll = win.scrollY || win.pageYOffset;
    var notSticky = scroll > stickyStart && scroll < stickyStop && (state === 'default' || state === 'stuck');
    var isSticky = scroll < stickyStart && state === 'sticky';
    var isStuck = scroll > stickyStop && state === 'sticky';
    if (notSticky) {
      state = 'sticky';
      rAF(function () {
        classes.add(stickyClass);
        if (classes.contains(stuckClass)) classes.remove(stuckClass);
        styles.bottom = '';
        styles.position = pv;
        styles[vp] = offset + 'px';
      });
    } else if (isSticky) {
      state = 'default';
      rAF(function () {
        classes.remove(stickyClass);
        if (pv === 'fixed') styles.position = '';
      });
    } else if (isStuck) {
      state = 'stuck';
      rAF(function () {
        classes.remove(stickyClass);
        classes.add(stuckClass);
        if (pv !== 'fixed') return;
        styles.top = '';
        styles.bottom = '0';
        styles.position = 'absolute';
      });
    }
  };

  win.addEventListener('scroll', this.manageState);
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
  el.classList.remove('js-is-sticky', 'js-is-stuck');
  el.parentNode.classList.remove('js-stickybit-parent');
  // remove scroll event listener
  window.removeEventListener('scroll', this.manageState);
  // turn of sticky invocation
  this.manageState = false;
};

function MultiBits(userInstances) {
  var _this = this;

  this.privateInstances = userInstances || [];
  this.cleanup = function () {
    return _this.privateInstances.forEach(function (instance) {
      return instance.cleanup();
    });
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

if (typeof window !== 'undefined') {
  var plugin = window.$ || window.jQuery || window.Zepto;
  if (plugin) {
    plugin.fn.stickybits = function stickybitsPlugin(opts) {
      stickybits(this, opts);
    };
  }
}

})));
