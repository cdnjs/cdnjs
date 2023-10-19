'use strict';

var utils = require('primevue/utils');
var BaseDirective = require('primevue/basedirective');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var BaseDirective__default = /*#__PURE__*/_interopDefaultLegacy(BaseDirective);

var BaseAnimate = BaseDirective__default["default"].extend({});

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
var Animate = BaseAnimate.extend('animate', {
  mounted: function mounted(el, binding) {
    el.setAttribute('data-pd-animate', true);
    !this.isUnstyled() && utils.DomHandler.addClass(el, 'p-animate');
    this.bindIntersectionObserver(el, binding);
  },
  unmounted: function unmounted(el) {
    this.unbindIntersectionObserver(el);
    clearTimeout(this.timeout);
  },
  timeout: null,
  observer: null,
  methods: {
    bindIntersectionObserver: function bindIntersectionObserver(el, binding) {
      var _this = this;
      var options = {
        root: null,
        rootMargin: '0px',
        threshold: 1.0
      };
      this.observer = new IntersectionObserver(function (element) {
        return _this.isVisible(element, el, binding);
      }, options);
      this.observer.observe(el);
    },
    isVisible: function isVisible(target, el, binding) {
      var _target = _slicedToArray(target, 1),
        intersectionObserverEntry = _target[0];
      intersectionObserverEntry.isIntersecting ? this.enter(el, binding) : this.leave(el, binding);
    },
    enter: function enter(el, binding) {
      el.style.visibility = 'visible';
      utils.DomHandler.addMultipleClasses(el, binding.value.enterClass);
      binding.modifiers.once && this.unbindIntersectionObserver(el);
    },
    leave: function leave(el, binding) {
      utils.DomHandler.removeClass(el, binding.value.enterClass);
      if (binding.value.leaveClass) {
        utils.DomHandler.addMultipleClasses(el, binding.value.leaveClass);
      }
      var animationDuration = el.style.animationDuration || 500;
      this.timeout = setTimeout(function () {
        el.style.visibility = 'hidden';
      }, animationDuration);
    },
    unbindIntersectionObserver: function unbindIntersectionObserver(el) {
      if (this.observer) {
        this.observer.unobserve(el);
      }
    }
  }
});

module.exports = Animate;
