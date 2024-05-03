import { DomHandler } from 'primevue/utils';
import BaseDirective from 'primevue/basedirective';
import RippleStyle from 'primevue/ripple/style';

var BaseRipple = BaseDirective.extend({
  style: RippleStyle
});

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
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
      var ink = DomHandler.createElement('span', _defineProperty(_defineProperty({
        role: 'presentation',
        'aria-hidden': true,
        'data-p-ink': true,
        'data-p-ink-active': false,
        "class": !this.isUnstyled() && this.cx('root'),
        onAnimationEnd: this.onAnimationEnd.bind(this)
      }, this.$attrSelector, ''), 'p-bind', this.ptm('root')));
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
      !this.isUnstyled() && DomHandler.removeClass(ink, 'p-ink-active');
      ink.setAttribute('data-p-ink-active', 'false');
      if (!DomHandler.getHeight(ink) && !DomHandler.getWidth(ink)) {
        var d = Math.max(DomHandler.getOuterWidth(target), DomHandler.getOuterHeight(target));
        ink.style.height = d + 'px';
        ink.style.width = d + 'px';
      }
      var offset = DomHandler.getOffset(target);
      var x = event.pageX - offset.left + document.body.scrollTop - DomHandler.getWidth(ink) / 2;
      var y = event.pageY - offset.top + document.body.scrollLeft - DomHandler.getHeight(ink) / 2;
      ink.style.top = y + 'px';
      ink.style.left = x + 'px';
      !this.isUnstyled() && DomHandler.addClass(ink, 'p-ink-active');
      ink.setAttribute('data-p-ink-active', 'true');
      this.timeout = setTimeout(function () {
        if (ink) {
          !_this.isUnstyled() && DomHandler.removeClass(ink, 'p-ink-active');
          ink.setAttribute('data-p-ink-active', 'false');
        }
      }, 401);
    },
    onAnimationEnd: function onAnimationEnd(event) {
      if (this.timeout) {
        clearTimeout(this.timeout);
      }
      !this.isUnstyled() && DomHandler.removeClass(event.currentTarget, 'p-ink-active');
      event.currentTarget.setAttribute('data-p-ink-active', 'false');
    },
    getInk: function getInk(el) {
      return el && el.children ? _toConsumableArray(el.children).find(function (child) {
        return DomHandler.getAttribute(child, 'data-pc-name') === 'ripple';
      }) : undefined;
    }
  }
});

export { Ripple as default };
