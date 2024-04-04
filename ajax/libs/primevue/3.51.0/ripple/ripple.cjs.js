'use strict';

var utils = require('primevue/utils');
var BaseDirective = require('primevue/basedirective');
var RippleStyle = require('primevue/ripple/style');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var BaseDirective__default = /*#__PURE__*/_interopDefaultLegacy(BaseDirective);
var RippleStyle__default = /*#__PURE__*/_interopDefaultLegacy(RippleStyle);

var BaseRipple = BaseDirective__default["default"].extend({
  style: RippleStyle__default["default"]
});

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
var Ripple = BaseRipple.extend('ripple', {
  mounted: function mounted(el) {
    var _el$$instance;
    var config = el === null || el === void 0 || (_el$$instance = el.$instance) === null || _el$$instance === void 0 ? void 0 : _el$$instance.$config;
    if (config && config.ripple) {
      this.create(el);
      this.bindEvents(el);
      el.setAttribute('data-pd-ripple', true);
    }
  },
  unmounted: function unmounted(el) {
    this.remove(el);
  },
  timeout: undefined,
  methods: {
    bindEvents: function bindEvents(el) {
      el.addEventListener('mousedown', this.onMouseDown.bind(this));
    },
    unbindEvents: function unbindEvents(el) {
      el.removeEventListener('mousedown', this.onMouseDown.bind(this));
    },
    create: function create(el) {
      var ink = utils.DomHandler.createElement('span', {
        role: 'presentation',
        'aria-hidden': true,
        'data-p-ink': true,
        'data-p-ink-active': false,
        "class": !this.isUnstyled() && this.cx('root'),
        onAnimationEnd: this.onAnimationEnd.bind(this),
        'p-bind': this.ptm('root')
      });
      el.appendChild(ink);
      this.$el = ink;
    },
    remove: function remove(el) {
      var ink = this.getInk(el);
      if (ink) {
        this.unbindEvents(el);
        ink.removeEventListener('animationend', this.onAnimationEnd);
        ink.remove();
      }
    },
    onMouseDown: function onMouseDown(event) {
      var _this = this;
      var target = event.currentTarget;
      var ink = this.getInk(target);
      if (!ink || getComputedStyle(ink, null).display === 'none') {
        return;
      }
      !this.isUnstyled() && utils.DomHandler.removeClass(ink, 'p-ink-active');
      ink.setAttribute('data-p-ink-active', 'false');
      if (!utils.DomHandler.getHeight(ink) && !utils.DomHandler.getWidth(ink)) {
        var d = Math.max(utils.DomHandler.getOuterWidth(target), utils.DomHandler.getOuterHeight(target));
        ink.style.height = d + 'px';
        ink.style.width = d + 'px';
      }
      var offset = utils.DomHandler.getOffset(target);
      var x = event.pageX - offset.left + document.body.scrollTop - utils.DomHandler.getWidth(ink) / 2;
      var y = event.pageY - offset.top + document.body.scrollLeft - utils.DomHandler.getHeight(ink) / 2;
      ink.style.top = y + 'px';
      ink.style.left = x + 'px';
      !this.isUnstyled() && utils.DomHandler.addClass(ink, 'p-ink-active');
      ink.setAttribute('data-p-ink-active', 'true');
      this.timeout = setTimeout(function () {
        if (ink) {
          !_this.isUnstyled() && utils.DomHandler.removeClass(ink, 'p-ink-active');
          ink.setAttribute('data-p-ink-active', 'false');
        }
      }, 401);
    },
    onAnimationEnd: function onAnimationEnd(event) {
      if (this.timeout) {
        clearTimeout(this.timeout);
      }
      !this.isUnstyled() && utils.DomHandler.removeClass(event.currentTarget, 'p-ink-active');
      event.currentTarget.setAttribute('data-p-ink-active', 'false');
    },
    getInk: function getInk(el) {
      return el && el.children ? _toConsumableArray(el.children).find(function (child) {
        return utils.DomHandler.getAttribute(child, 'data-pc-name') === 'ripple';
      }) : undefined;
    }
  }
});

module.exports = Ripple;
