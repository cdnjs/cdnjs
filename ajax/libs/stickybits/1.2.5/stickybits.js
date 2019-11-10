(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global.stickybits = factory());
}(this, (function () { 'use strict';

var browserPrefix = ['', '-o-', '-webkit-', '-moz-', '-ms-'];
var stickyBitClass = 'js-is-sticky';
var stickyBitIsStuckClass = 'js-is-stuck';

function Stickybit(target, o) {
  this.el = target;
  this.scrollTarget = o && o.scrollTarget || window;
  this.stickyBitStickyOffset = o && o.stickyBitStickyOffset || 0;
  this.verticalPosition = o && o.verticalPosition || 'top';
  this.useStickyClasses = o && o.useStickyClasses || false;
  this.elStyle = this.el.style;
  this.positionStickyVal = 'fixed';
}

Stickybit.prototype.setStickyPosition = function setStickyPosition() {
  var elStyle = this.elStyle;
  var verticalPosition = this.verticalPosition;
  for (var i = 0; i < browserPrefix.length; i += 1) {
    elStyle.position = browserPrefix[i] + 'sticky';
  }
  if (elStyle.position !== '') {
    this.positionStickyVal = elStyle.position;
    if (verticalPosition === 'top') {
      elStyle[verticalPosition] = this.stickyBitStickyOffset + 'px';
    }
  }
};

Stickybit.prototype.manageStickiness = function manageStickiness() {
  var el = this.el;
  var scrollTarget = this.scrollTarget;
  var positionStickyVal = this.positionStickyVal;
  var verticalPosition = this.verticalPosition;
  var stickyBitStickyOffset = this.stickyBitStickyOffset;
  var elStyle = this.elStyle;
  var elClasses = el.classList;
  var elParent = el.parentNode;
  var stickyBitStart = el.getBoundingClientRect().top;
  var stickyBitStop = stickyBitStart + elParent.offsetHeight - el.offsetHeight;
  elParent.classList.add('js-stickybit-parent');
  function stickiness() {
    var scroll = scrollTarget.scrollY;
    if (scroll < stickyBitStart) {
      if (elClasses.contains(stickyBitClass)) {
        elClasses.remove(stickyBitClass);
        elStyle.position = '';
      }
    } else if (scroll > stickyBitStart && scroll < stickyBitStop) {
      if (!elClasses.contains(stickyBitClass)) elClasses.add(stickyBitClass);
      if (elClasses.contains(stickyBitIsStuckClass)) {
        elClasses.remove(stickyBitIsStuckClass);
        elStyle.bottom = '';
      }
      elStyle.position = positionStickyVal;
      elStyle[verticalPosition] = stickyBitStickyOffset + 'px';
    } else if (scroll > stickyBitStop && !elClasses.contains(stickyBitIsStuckClass)) {
      elClasses.remove(stickyBitClass);
      elClasses.add(stickyBitIsStuckClass);
      if (positionStickyVal !== 'fixed') return;
      elStyle.top = '';
      elStyle.bottom = '0';
      elStyle.position = 'absolute';
    }
  }
  var invoked = void 0;
  function checkStickiness() {
    if (invoked) return;
    invoked = true;
    stickiness();
    window.setTimeout(function () {
      invoked = false;
    }, 0);
  }
  scrollTarget.addEventListener('scroll', function () {
    return scrollTarget.requestAnimationFrame(checkStickiness);
  });
};

function stickybits(target, o) {
  var els = typeof target === 'string' ? document.querySelectorAll(target) : target;
  if (!('length' in els)) els = [els];
  var stickyBit = void 0;
  for (var i = 0; i < els.length; i += 1) {
    var el = els[i];
    stickyBit = new Stickybit(el, o);
    stickyBit.setStickyPosition();
    console.log(stickyBit.positionStickyVal);
    if (stickyBit.positionStickyVal === 'fixed' || stickyBit.useStickyClasses === true) {
      stickyBit.manageStickiness();
    }
  }
}

return stickybits;

})));
