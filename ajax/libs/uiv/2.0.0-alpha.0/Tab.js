import { openBlock, createElementBlock, normalizeClass, renderSlot, createBlock, Teleport, createCommentVNode } from 'vue';

function spliceIfExist(arr, item) {
  if (Array.isArray(arr)) {
    var index = arr.indexOf(item);
    if (index >= 0) {
      arr.splice(index, 1);
    }
  }
}

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

var ACTIVE_CLASS = 'active';
var IN_CLASS = 'in';

var id = 0;

var script = {
  props: {
    title: {
      type: String,
      default: 'Tab Title',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    tabClasses: {
      type: Object,
      default: function () {
        return {}
      },
    },
    group: { type: String, default: undefined },
    pullRight: {
      type: Boolean,
      default: false,
    },
    hidden: {
      type: Boolean,
      default: false,
    },
  },
  data: function data() {
    return {
      active: null,
      transition: 150,
      uid: ("tab_" + (++id)),
      isMounted: false,
    }
  },
  watch: {
    active: function active(active$1) {
      var this$1$1 = this;

      if (active$1) {
        setTimeout(function () {
          addClass(this$1$1.$el, ACTIVE_CLASS);
          this$1$1.$el.offsetHeight;
          addClass(this$1$1.$el, IN_CLASS);
          try {
            this$1$1.$parent.$emit('changed', this$1$1.$parent.activeIndex);
          } catch (e) {
            throw new Error('<tab> parent must be <tabs>.')
          }
        }, this.transition);
      } else {
        removeClass(this.$el, IN_CLASS);
        setTimeout(function () {
          removeClass(this$1$1.$el, ACTIVE_CLASS);
        }, this.transition);
      }
    },
  },
  created: function created() {
    try {
      this.$parent.tabs.push(this);
    } catch (e) {
      throw new Error('<tab> parent must be <tabs>.')
    }
  },
  mounted: function mounted() {
    this.isMounted = true;
  },
  beforeUnmount: function beforeUnmount() {
    var tabs = this.$parent && this.$parent.tabs;
    spliceIfExist(tabs, this);
  },
  methods: {
    show: function show() {
      var this$1$1 = this;

      this.$nextTick(function () {
        addClass(this$1$1.$el, ACTIVE_CLASS);
        addClass(this$1$1.$el, IN_CLASS);
      });
    },
  },
};

function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (openBlock(), createElementBlock("div", {
    class: normalizeClass(["tab-pane", { fade: $data.transition > 0 }]),
    role: "tabpanel"
  }, [
    renderSlot(_ctx.$slots, "default"),
    ($data.isMounted && _ctx.$slots.title)
      ? (openBlock(), createBlock(Teleport, {
          key: 0,
          to: '#' + $data.uid.toString()
        }, [
          renderSlot(_ctx.$slots, "title")
        ], 8 /* PROPS */, ["to"]))
      : createCommentVNode("v-if", true)
  ], 2 /* CLASS */))
}

script.render = render;
script.__file = "src/components/tabs/Tab.vue";

export { script as default };
//# sourceMappingURL=Tab.js.map
