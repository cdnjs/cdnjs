import { DomHandler } from 'primevue/utils';
import BaseDirective from 'primevue/basedirective';
import { useStyle } from 'primevue/usestyle';

var styles = "\n.p-ripple {\n    overflow: hidden;\n    position: relative;\n}\n\n.p-ink {\n    display: block;\n    position: absolute;\n    background: rgba(255, 255, 255, 0.5);\n    border-radius: 100%;\n    transform: scale(0);\n    pointer-events: none;\n}\n\n.p-ink-active {\n    animation: ripple 0.4s linear;\n}\n\n.p-ripple-disabled .p-ink {\n    display: none !important;\n}\n\n@keyframes ripple {\n    100% {\n        opacity: 0;\n        transform: scale(2.5);\n    }\n}\n";
var classes = {
  root: 'p-ink'
};
var _useStyle = useStyle(styles, {
    name: 'ripple',
    manual: true
  }),
  loadStyle = _useStyle.load;
var BaseRipple = BaseDirective.extend({
  css: {
    classes: classes,
    loadStyle: loadStyle
  }
});

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
var Ripple = BaseRipple.extend('ripple', {
  mounted: function mounted(el, binding) {
    var primevue = binding.instance.$primevue;
    if (primevue && primevue.config && primevue.config.ripple) {
      var _binding$value;
      el.unstyled = primevue.config.unstyled || ((_binding$value = binding.value) === null || _binding$value === void 0 ? void 0 : _binding$value.unstyled) || false;
      this.create(el);
      this.bindEvents(el);
    }
    el.setAttribute('data-pd-ripple', true);
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
      var ink = DomHandler.createElement('span', {
        role: 'presentation',
        'aria-hidden': true,
        'data-p-ink': true,
        'data-p-ink-active': false,
        "class": !el.unstyled && this.cx('root'),
        onAnimationEnd: this.onAnimationEnd,
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
      var target = event.currentTarget;
      var ink = this.getInk(target);
      if (!ink || getComputedStyle(ink, null).display === 'none') {
        return;
      }
      !target.unstyled && DomHandler.removeClass(ink, 'p-ink-active');
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
      !target.unstyled && DomHandler.addClass(ink, 'p-ink-active');
      ink.setAttribute('data-p-ink-active', 'true');
      this.timeout = setTimeout(function () {
        if (ink) {
          !target.unstyled && DomHandler.removeClass(ink, 'p-ink-active');
          ink.setAttribute('data-p-ink-active', 'false');
        }
      }, 401);
    },
    onAnimationEnd: function onAnimationEnd(event) {
      if (this.timeout) {
        clearTimeout(this.timeout);
      }
      !event.currentTarget.unstyled && DomHandler.removeClass(event.currentTarget, 'p-ink-active');
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
