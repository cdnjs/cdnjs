"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _DomHandler = _interopRequireDefault(require("../utils/DomHandler"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function bindEvents(el) {
  el.addEventListener('mousedown', onMouseDown);
}
function unbindEvents(el) {
  el.removeEventListener('mousedown', onMouseDown);
}
function create(el) {
  var ink = document.createElement('span');
  ink.className = 'p-ink';
  el.appendChild(ink);
  ink.addEventListener('animationend', onAnimationEnd);
}
function remove(el) {
  var ink = getInk(el);
  if (ink) {
    unbindEvents(el);
    ink.removeEventListener('animationend', onAnimationEnd);
    ink.remove();
  }
}
function onMouseDown(event) {
  var target = event.currentTarget;
  var ink = getInk(target);
  if (!ink || getComputedStyle(ink, null).display === 'none') {
    return;
  }
  _DomHandler.default.removeClass(ink, 'p-ink-active');
  if (!_DomHandler.default.getHeight(ink) && !_DomHandler.default.getWidth(ink)) {
    var d = Math.max(_DomHandler.default.getOuterWidth(target), _DomHandler.default.getOuterHeight(target));
    ink.style.height = d + 'px';
    ink.style.width = d + 'px';
  }
  var offset = _DomHandler.default.getOffset(target);
  var x = event.pageX - offset.left + document.body.scrollTop - _DomHandler.default.getWidth(ink) / 2;
  var y = event.pageY - offset.top + document.body.scrollLeft - _DomHandler.default.getHeight(ink) / 2;
  ink.style.top = y + 'px';
  ink.style.left = x + 'px';
  _DomHandler.default.addClass(ink, 'p-ink-active');
}
function onAnimationEnd(event) {
  _DomHandler.default.removeClass(event.currentTarget, 'p-ink-active');
}
function getInk(el) {
  for (var i = 0; i < el.children.length; i++) {
    if (typeof el.children[i].className === 'string' && el.children[i].className.indexOf('p-ink') !== -1) {
      return el.children[i];
    }
  }
  return null;
}
var Ripple = {
  inserted: function inserted(el, binding, vnode) {
    if (vnode.context.$primevue && vnode.context.$primevue.config.ripple) {
      create(el);
      bindEvents(el);
    }
  },
  unbind: function unbind(el) {
    remove(el);
  }
};
var _default = exports.default = Ripple;
