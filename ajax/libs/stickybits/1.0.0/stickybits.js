(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global.stickybits = factory());
}(this, (function () { 'use strict';

function Stickybit(target, o) {
  var opts = {
    scrollTarget: window,
    stickyBitStickyOffset: 0,
    customVerticalPosition: false,
    monitorStickiness: false
  };
  this.el = target;
  this.scrollTarget = o && o.scrollTarget || opts.scrollTarget;
  this.stickyBitStickyOffset = o && o.stickyBitStickyOffset || opts.stickyBitStickyOffset;
  this.customVerticalPosition = o && o.customVerticalPosition || opts.customVerticalPosition;
  this.monitorStickiness = o && o.monitorStickiness || opts.monitorStickiness;
  var browserPrefix = ['', '-o-', '-webkit-', '-moz-', '-ms-'];
  for (var i = 0; i < browserPrefix.length; i += 1) {
    this.el.style.position = browserPrefix[i] + 'sticky';
  }
  var positionStickyVal = 'fixed';
  if (this.el.style.position !== '') {
    positionStickyVal = this.el.style.position;
    if (this.customVerticalPosition === false) {
      this.el.style.top = this.stickyBitStickyOffset + 'px';
    }
    if (this.monitorStickiness === false) return;
  }
  var el = this.el;
  var customVerticalPosition = this.customVerticalPosition;
  var stickyBitStickyOffset = this.stickyBitStickyOffset;
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
        el.style.position = '';
      }
      return;
    } else if (scroll > stickyBitStart && scroll < stickyBitStop) {
      if (!elClasses.contains(stickyBitClass)) elClasses.add(stickyBitClass);
      if (elClasses.contains(stickyBitIsStuckClass)) {
        elClasses.remove(stickyBitIsStuckClass);
        el.style.bottom = '';
      }
      el.style.position = positionStickyVal;
      if (customVerticalPosition === false) {
        el.style.top = stickyBitStickyOffset + 'px';
      }
      return;
    } else if (scroll > stickyBitStop && !elClasses.contains(stickyBitIsStuckClass)) {
      elClasses.remove(stickyBitClass);
      elClasses.add(stickyBitIsStuckClass);
      el.style.top = '';
      el.style.bottom = '0';
      el.style.position = 'absolute';
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
