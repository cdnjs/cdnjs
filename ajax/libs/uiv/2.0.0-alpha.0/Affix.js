import { resolveDirective, openBlock, createElementBlock, withDirectives, createElementVNode, normalizeClass, normalizeStyle, renderSlot } from 'vue';

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign#Polyfill

function isFunction(obj) {
  return typeof obj === 'function'
}

var EVENTS = {
  MOUSE_ENTER: 'mouseenter',
  MOUSE_LEAVE: 'mouseleave',
  MOUSE_DOWN: 'mousedown',
  MOUSE_UP: 'mouseup',
  FOCUS: 'focus',
  BLUR: 'blur',
  CLICK: 'click',
  INPUT: 'input',
  KEY_DOWN: 'keydown',
  KEY_UP: 'keyup',
  KEY_PRESS: 'keypress',
  RESIZE: 'resize',
  SCROLL: 'scroll',
  TOUCH_START: 'touchstart',
  TOUCH_END: 'touchend',
};

function on(element, event, handler) {
  /* istanbul ignore next */
  element.addEventListener(event, handler);
}

function off(element, event, handler) {
  /* istanbul ignore next */
  element.removeEventListener(event, handler);
}

var HANDLER = '_uiv_scroll_handler';
var events = [EVENTS.RESIZE, EVENTS.SCROLL];

var bind = function (el, binding) {
  var callback = binding.value;
  if (!isFunction(callback)) {
    return
  }
  unbind(el);
  el[HANDLER] = callback;
  events.forEach(function (event) {
    on(window, event, el[HANDLER]);
  });
};

var unbind = function (el) {
  events.forEach(function (event) {
    off(window, event, el[HANDLER]);
  });
  delete el[HANDLER];
};

var update = function (el, binding) {
  if (binding.value !== binding.oldValue) {
    bind(el, binding);
  }
};

var scroll = { mounted: bind, unmounted: unbind, updated: update };

var script = {
  directives: {
    scroll: scroll,
  },
  props: {
    offset: {
      type: Number,
      default: 0,
    },
  },
  data: function data() {
    return {
      affixed: false,
    }
  },
  computed: {
    classes: function classes() {
      return {
        affix: this.affixed,
      }
    },
    styles: function styles() {
      return {
        top: this.affixed ? this.offset + 'px' : null,
      }
    },
  },
  methods: {
    // from https://github.com/ant-design/ant-design/blob/master/components/affix/index.jsx#L20
    onScroll: function onScroll() {
      var this$1$1 = this;

      // if is hidden don't calculate anything
      if (
        !(
          this.$el.offsetWidth ||
          this.$el.offsetHeight ||
          this.$el.getClientRects().length
        )
      ) {
        return
      }
      // get window scroll and element position to detect if have to be normal or affixed
      var scroll = {};
      var element = {};
      var rect = this.$el.getBoundingClientRect();
      var body = document.body;
      var types = ['Top', 'Left'];
      types.forEach(function (type) {
        var t = type.toLowerCase();
        scroll[t] = window['page' + (type === 'Top' ? 'Y' : 'X') + 'Offset'];
        element[t] =
          scroll[t] +
          rect[t] -
          (this$1$1.$el['client' + type] || body['client' + type] || 0);
      });
      var fix = scroll.top > element.top - this.offset;
      if (this.affixed !== fix) {
        this.affixed = fix;
        this.$emit(this.affixed ? 'affix' : 'unfix');
        this.$nextTick(function () {
          this$1$1.$emit(this$1$1.affixed ? 'affixed' : 'unfixed');
        });
      }
    },
  },
};

var _hoisted_1 = { class: "hidden-print" };

function render(_ctx, _cache, $props, $setup, $data, $options) {
  var _directive_scroll = resolveDirective("scroll");

  return (openBlock(), createElementBlock("div", _hoisted_1, [
    withDirectives(createElementVNode("div", {
      class: normalizeClass($options.classes),
      style: normalizeStyle($options.styles)
    }, [
      renderSlot(_ctx.$slots, "default")
    ], 6 /* CLASS, STYLE */), [
      [_directive_scroll, $options.onScroll]
    ])
  ]))
}

script.render = render;
script.__file = "src/components/affix/Affix.vue";

export { script as default };
//# sourceMappingURL=Affix.js.map
