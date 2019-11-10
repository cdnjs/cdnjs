(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global.stickybits = factory());
}(this, (function () { 'use strict';

function Stickybit(target, o) {
  var defaults = {
    scrollTarget: window,
    stickyBitStickyOffset: 0,
    customVerticalPosition: false
  };
  this.el = target;
  this.scrollTarget = o && o.scrollTarget || defaults.scrollTarget;
  this.stickyBitStickyOffset = o && o.stickyBitStickyOffset || defaults.stickyBitStickyOffset;
  this.customVerticalPosition = o && o.customVerticalPosition || defaults.customVerticalPosition;
  var browserPrefix = ['', '-o-', '-webkit-', '-moz-', '-ms-'];
  for (var i = 0; i < browserPrefix.length; i += 1) {
    this.el.style.position = browserPrefix[i] + 'sticky';
  }
  if (this.el.style.postion !== '') {
    if (this.customVerticalPosition === false) {
      this.el.style.top = this.stickyBitStickyOffset + 'px';
    }
    return;
  }
  var elClasses = this.el.classList;
  var elParent = this.el.parentNode;
  var scrollTarget = this.scrollTarget;
  var stickyBitClass = 'js-is-sticky';
  var stickyBitIsStuckClass = 'js-is-stuck';
  var stickyBitStart = this.el.getBoundingClientRect().top;
  var stickyBitStop = stickyBitStart + elParent.offsetHeight - this.el.offsetHeight;
  elParent.classList.add('js-stickybit-parent');
  function stickiness() {
    var scroll = scrollTarget.scrollY;
    if (scroll < stickyBitStart) {
      if (elClasses.contains(stickyBitClass)) {
        elClasses.remove(stickyBitClass);
        this.el.style.position = '';
      }
      return;
    } else if (scroll > stickyBitStart && scroll < stickyBitStop) {
      if (!elClasses.contains(stickyBitClass)) elClasses.add(stickyBitClass);
      if (elClasses.contains(stickyBitIsStuckClass)) {
        elClasses.remove(stickyBitIsStuckClass);
        this.el.style.bottom = '';
      }
      this.el.style.position = 'fixed';
      if (this.customVerticalPosition === false) {
        this.el.style.top = this.opts.stickyBitStickyOffset + 'px';
      }
      return;
    } else if (scroll > stop && !elClasses.contains(stickyBitIsStuckClass)) {
      elClasses.remove(stickyBitClass);
      elClasses.add(stickyBitIsStuckClass);
      this.el.style.top = '';
      this.el.style.bottom = '0';
      this.el.style.position = 'absolute';
      return;
    }
    return;
  }
  scrollTarget.addEventListener('scroll', function () {
    return scrollTarget.requestAnimationFrame(stickiness);
  });
}
function stickybits(target, o) {
  var els = typeof target === 'string' ? document.querySelectorAll(target) : target;
  if (!('length' in els)) els = [els];
  var stickyBit = void 0;
  for (var i = 0; i < els.length; i += 1) {
    var el = els[i];
    stickyBit = new Stickybit(el, o);
  }
  return stickyBit;
}

return stickybits;

})));
