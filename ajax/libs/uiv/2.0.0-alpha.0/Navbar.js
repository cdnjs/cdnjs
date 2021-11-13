import { h, resolveComponent, openBlock, createElementBlock, normalizeClass, createElementVNode, renderSlot, createVNode, withCtx } from 'vue';

function isElement(el) {
  return el && el.nodeType === Node.ELEMENT_NODE
}

function addClass(el, className) {
  if (!isElement(el)) {
    return
  }
  if (el.className) {
    var classes = el.className.split(' ');
    if (classes.indexOf(className) < 0) {
      classes.push(className);
      el.className = classes.join(' ');
    }
  } else {
    el.className = className;
  }
}

function removeClass(el, className) {
  if (!isElement(el)) {
    return
  }
  if (el.className) {
    var classes = el.className.split(' ');
    var newClasses = [];
    for (var i = 0, l = classes.length; i < l; i++) {
      if (classes[i] !== className) {
        newClasses.push(classes[i]);
      }
    }
    el.className = newClasses.join(' ');
  }
}

var COLLAPSE = 'collapse';
var IN = 'in';
var COLLAPSING = 'collapsing';

var Collapse = {
  render: function render() {
    return h(this.tag, {}, this.$slots.default && this.$slots.default())
  },
  props: {
    tag: {
      type: String,
      default: 'div',
    },
    modelValue: {
      type: Boolean,
      default: false,
    },
    transition: {
      type: Number,
      default: 350,
    },
  },
  data: function data() {
    return {
      timeoutId: 0,
    }
  },
  watch: {
    modelValue: function modelValue(show) {
      this.toggle(show);
    },
  },
  mounted: function mounted() {
    var el = this.$el;
    addClass(el, COLLAPSE);
    if (this.modelValue) {
      addClass(el, IN);
    }
  },
  methods: {
    toggle: function toggle(show) {
      var this$1$1 = this;

      clearTimeout(this.timeoutId);
      var el = this.$el;
      if (show) {
        this.$emit('show');
        removeClass(el, COLLAPSE);
        el.style.height = 'auto';
        var height = window.getComputedStyle(el).height;
        el.style.height = null;
        addClass(el, COLLAPSING);
        el.offsetHeight; // force repaint
        el.style.height = height;
        this.timeoutId = setTimeout(function () {
          removeClass(el, COLLAPSING);
          addClass(el, COLLAPSE);
          addClass(el, IN);
          el.style.height = null;
          this$1$1.timeoutId = 0;
          this$1$1.$emit('shown');
        }, this.transition);
      } else {
        this.$emit('hide');
        el.style.height = window.getComputedStyle(el).height;
        removeClass(el, IN);
        removeClass(el, COLLAPSE);
        el.offsetHeight;
        el.style.height = null;
        addClass(el, COLLAPSING);
        this.timeoutId = setTimeout(function () {
          addClass(el, COLLAPSE);
          removeClass(el, COLLAPSING);
          el.style.height = null;
          this$1$1.timeoutId = 0;
          this$1$1.$emit('hidden');
        }, this.transition);
      }
    },
  },
};

var script = {
  components: { Collapse: Collapse },
  props: {
    modelValue: Boolean,
    fluid: {
      type: Boolean,
      default: true,
    },
    fixedTop: Boolean,
    fixedBottom: Boolean,
    staticTop: Boolean,
    inverse: Boolean,
  },
  emits: ['update:modalValue'],
  data: function data() {
    return {
      show: false,
    }
  },
  computed: {
    navClasses: function navClasses() {
      return {
        navbar: true,
        'navbar-default': !this.inverse,
        'navbar-inverse': this.inverse,
        'navbar-static-top': this.staticTop,
        'navbar-fixed-bottom': this.fixedBottom,
        'navbar-fixed-top': this.fixedTop,
      }
    },
  },
  watch: {
    modelValue: function modelValue(v) {
      this.show = v;
    },
  },
  mounted: function mounted() {
    this.show = !!this.modelValue;
  },
  methods: {
    toggle: function toggle() {
      this.show = !this.show;
      this.$emit('update:modalValue', this.show);
    },
  },
};

var _hoisted_1 = { class: "navbar-header" };
var _hoisted_2 = /*#__PURE__*/createElementVNode("span", { class: "sr-only" }, "Toggle navigation", -1 /* HOISTED */);
var _hoisted_3 = /*#__PURE__*/createElementVNode("span", { class: "icon-bar" }, null, -1 /* HOISTED */);
var _hoisted_4 = /*#__PURE__*/createElementVNode("span", { class: "icon-bar" }, null, -1 /* HOISTED */);
var _hoisted_5 = /*#__PURE__*/createElementVNode("span", { class: "icon-bar" }, null, -1 /* HOISTED */);
var _hoisted_6 = [
  _hoisted_2,
  _hoisted_3,
  _hoisted_4,
  _hoisted_5
];

function render(_ctx, _cache, $props, $setup, $data, $options) {
  var _component_collapse = resolveComponent("collapse");

  return (openBlock(), createElementBlock("nav", {
    class: normalizeClass($options.navClasses)
  }, [
    createElementVNode("div", {
      class: normalizeClass($props.fluid ? 'container-fluid' : 'container')
    }, [
      createElementVNode("div", _hoisted_1, [
        renderSlot(_ctx.$slots, "collapse-btn", {}, function () { return [
          createElementVNode("button", {
            type: "button",
            class: "navbar-toggle collapsed",
            onClick: _cache[0] || (_cache[0] = function () {
              var args = [], len = arguments.length;
              while ( len-- ) args[ len ] = arguments[ len ];

              return ($options.toggle && $options.toggle.apply($options, args));
          })
          }, _hoisted_6)
        ]; }),
        renderSlot(_ctx.$slots, "brand")
      ]),
      renderSlot(_ctx.$slots, "default"),
      createVNode(_component_collapse, {
        modelValue: $data.show,
        "onUpdate:modelValue": _cache[1] || (_cache[1] = function ($event) { return (($data.show) = $event); }),
        class: "navbar-collapse"
      }, {
        default: withCtx(function () { return [
          renderSlot(_ctx.$slots, "collapse")
        ]; }),
        _: 3 /* FORWARDED */
      }, 8 /* PROPS */, ["modelValue"])
    ], 2 /* CLASS */)
  ], 2 /* CLASS */))
}

script.render = render;
script.__file = "src/components/navbar/Navbar.vue";

export { script as default };
//# sourceMappingURL=Navbar.js.map
