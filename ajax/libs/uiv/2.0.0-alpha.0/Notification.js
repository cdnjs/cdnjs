import { openBlock, createElementBlock, normalizeClass, createCommentVNode, renderSlot, createElementVNode, resolveComponent, createBlock, normalizeStyle, withCtx, toDisplayString, reactive, h, render as render$2 } from 'vue';

function spliceIfExist(arr, item) {
  if (Array.isArray(arr)) {
    var index = arr.indexOf(item);
    if (index >= 0) {
      arr.splice(index, 1);
    }
  }
}

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign#Polyfill
function assign(target, varArgs) {
  var arguments$1 = arguments;

  if (target === null || target === undefined) {
    throw new TypeError('Cannot convert undefined or null to object')
  }
  var to = Object(target);
  for (var index = 1; index < arguments.length; index++) {
    var nextSource = arguments$1[index];
    if (nextSource !== null && nextSource !== undefined) {
      for (var nextKey in nextSource) {
        // Avoid bugs when hasOwnProperty is shadowed
        /* istanbul ignore else */
        if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
          to[nextKey] = nextSource[nextKey];
        }
      }
    }
  }
  return to
}

function isExist(obj) {
  return typeof obj !== 'undefined' && obj !== null
}

function isFunction(obj) {
  return typeof obj === 'function'
}

function isString(obj) {
  return typeof obj === 'string'
}

function isPromiseSupported() {
  return typeof window !== 'undefined' && isExist(window.Promise)
}

function hasOwnProperty(o, k) {
  return Object.prototype.hasOwnProperty.call(o, k)
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

var script$1 = {
  props: {
    dismissible: {
      type: Boolean,
      default: false,
    },
    duration: {
      type: Number,
      default: 0,
    },
    type: {
      type: String,
      default: 'info',
    },
  },
  emits: ['dismissed'],
  data: function data() {
    return {
      timeout: 0,
    }
  },
  computed: {
    alertClass: function alertClass() {
      var obj;

      return ( obj = {
        alert: true
      }, obj[("alert-" + (this.type))] = Boolean(this.type), obj['alert-dismissible'] = this.dismissible, obj )
    },
  },
  mounted: function mounted() {
    if (this.duration > 0) {
      this.timeout = setTimeout(this.closeAlert, this.duration);
    }
  },
  unmounted: function unmounted() {
    clearTimeout(this.timeout);
  },
  methods: {
    closeAlert: function closeAlert() {
      clearTimeout(this.timeout);
      this.$emit('dismissed');
    },
  },
};

var _hoisted_1$1 = /*#__PURE__*/createElementVNode("span", { "aria-hidden": "true" }, "×", -1 /* HOISTED */);
var _hoisted_2$1 = [
  _hoisted_1$1
];

function render$1(_ctx, _cache, $props, $setup, $data, $options) {
  return (openBlock(), createElementBlock("div", {
    role: "alert",
    class: normalizeClass($options.alertClass)
  }, [
    ($props.dismissible)
      ? (openBlock(), createElementBlock("button", {
          key: 0,
          type: "button",
          class: "close",
          "aria-label": "Close",
          onClick: _cache[0] || (_cache[0] = function () {
            var args = [], len = arguments.length;
            while ( len-- ) args[ len ] = arguments[ len ];

            return ($options.closeAlert && $options.closeAlert.apply($options, args));
  })
        }, _hoisted_2$1))
      : createCommentVNode("v-if", true),
    renderSlot(_ctx.$slots, "default")
  ], 2 /* CLASS */))
}

script$1.render = render$1;
script$1.__file = "src/components/alert/Alert.vue";

var TYPES = {
  SUCCESS: 'success',
  INFO: 'info',
  DANGER: 'danger',
  WARNING: 'warning',
};

var PLACEMENTS = {
  TOP_LEFT: 'top-left',
  TOP_RIGHT: 'top-right',
  BOTTOM_LEFT: 'bottom-left',
  BOTTOM_RIGHT: 'bottom-right',
};

var IN_CLASS = 'in';
var ICON = 'glyphicon';
var WIDTH = 300;
var TRANSITION_DURATION = 300;

var script = {
  components: { Alert: script$1 },
  props: {
    title: { type: String, default: undefined },
    content: { type: String, default: undefined },
    html: {
      type: Boolean,
      default: false,
    },
    duration: {
      type: Number,
      default: 5000,
    },
    dismissible: {
      type: Boolean,
      default: true,
    },
    type: { type: String, default: undefined },
    placement: { type: String, default: undefined },
    icon: { type: String, default: undefined },
    customClass: { type: null, default: undefined },
    cb: {
      type: Function,
      required: true,
    },
    queue: {
      type: Array,
      required: true,
    },
    offsetY: {
      type: Number,
      default: 15,
    },
    offsetX: {
      type: Number,
      default: 15,
    },
    offset: {
      type: Number,
      default: 15,
    },
  },
  data: function data() {
    return {
      height: 0,
      top: 0,
      horizontal:
        this.placement === PLACEMENTS.TOP_LEFT ||
        this.placement === PLACEMENTS.BOTTOM_LEFT
          ? 'left'
          : 'right',
      vertical:
        this.placement === PLACEMENTS.TOP_LEFT ||
        this.placement === PLACEMENTS.TOP_RIGHT
          ? 'top'
          : 'bottom',
    }
  },
  computed: {
    styles: function styles() {
      var this$1$1 = this;
      var obj;

      var queue = this.queue;
      var thisIndex = queue.findIndex(function (vm) { return vm._.uid === this$1$1._.uid; });
      return ( obj = {
        position: 'fixed'
      }, obj[this.vertical] = ((this.getTotalHeightOfQueue(queue, thisIndex)) + "px"), obj.width = (WIDTH + "px"), obj.transition = ("all " + (TRANSITION_DURATION / 1000) + "s ease-in-out"), obj )
    },
    icons: function icons() {
      if (isString(this.icon)) {
        return this.icon
      }
      switch (this.type) {
        case TYPES.INFO:
        case TYPES.WARNING:
          return (ICON + " " + ICON + "-info-sign")
        case TYPES.SUCCESS:
          return (ICON + " " + ICON + "-ok-sign")
        case TYPES.DANGER:
          return (ICON + " " + ICON + "-remove-sign")
        default:
          return null
      }
    },
  },
  created: function created() {
    // get prev notifications total height in the queue
    this.top = this.getTotalHeightOfQueue(this.queue);
  },
  mounted: function mounted() {
    var this$1$1 = this;

    var el = this.$el;
    el.style[this.vertical] = this.top + 'px';
    this.$nextTick(function () {
      el.style[this$1$1.horizontal] = "-" + WIDTH + "px";
      this$1$1.height = el.offsetHeight;
      el.style[this$1$1.horizontal] = (this$1$1.offsetX) + "px";
      addClass(el, IN_CLASS);
    });
  },
  // unmounted() {
  //   console.log('unmounted')
  // },
  methods: {
    getTotalHeightOfQueue: function getTotalHeightOfQueue(queue, lastIndex) {
      if ( lastIndex === void 0 ) lastIndex = queue.length;

      var totalHeight = this.offsetY;
      for (var i = 0; i < lastIndex; i++) {
        totalHeight += queue[i].height + this.offset;
      }
      return totalHeight
    },
    onDismissed: function onDismissed() {
      removeClass(this.$el, IN_CLASS);
      setTimeout(this.cb, TRANSITION_DURATION);
    },
  },
};

var _hoisted_1 = {
  class: "media",
  style: {"margin":"0"}
};
var _hoisted_2 = {
  key: 0,
  class: "media-left"
};
var _hoisted_3 = { class: "media-body" };
var _hoisted_4 = {
  key: 0,
  class: "media-heading"
};
var _hoisted_5 = ["innerHTML"];
var _hoisted_6 = { key: 2 };

function render(_ctx, _cache, $props, $setup, $data, $options) {
  var _component_alert = resolveComponent("alert");

  return (openBlock(), createBlock(_component_alert, {
    class: normalizeClass(["fade", $props.customClass]),
    style: normalizeStyle($options.styles),
    type: $props.type,
    duration: $props.duration,
    dismissible: $props.dismissible,
    onDismissed: $options.onDismissed
  }, {
    default: withCtx(function () { return [
      createElementVNode("div", _hoisted_1, [
        ($options.icons)
          ? (openBlock(), createElementBlock("div", _hoisted_2, [
              createElementVNode("span", {
                class: normalizeClass($options.icons),
                style: {"font-size":"1.5em"}
              }, null, 2 /* CLASS */)
            ]))
          : createCommentVNode("v-if", true),
        createElementVNode("div", _hoisted_3, [
          ($props.title)
            ? (openBlock(), createElementBlock("div", _hoisted_4, [
                createElementVNode("b", null, toDisplayString($props.title), 1 /* TEXT */)
              ]))
            : createCommentVNode("v-if", true),
          ($props.html)
            ? (openBlock(), createElementBlock("div", {
                key: 1,
                innerHTML: $props.content
              }, null, 8 /* PROPS */, _hoisted_5))
            : (openBlock(), createElementBlock("div", _hoisted_6, toDisplayString($props.content), 1 /* TEXT */))
        ])
      ])
    ]; }),
    _: 1 /* STABLE */
  }, 8 /* PROPS */, ["class", "style", "type", "duration", "dismissible", "onDismissed"]))
}

script.render = render;
script.__file = "src/components/notification/Notification.vue";

var obj;

var queues = reactive(( obj = {}, obj[PLACEMENTS.TOP_LEFT] = [], obj[PLACEMENTS.TOP_RIGHT] = [], obj[PLACEMENTS.BOTTOM_LEFT] = [], obj[PLACEMENTS.BOTTOM_RIGHT] = [], obj ));

var destroy = function (queue, ref) {
  var vNode = ref.vNode;
  var container = ref.container;

  // console.log('destroyNotification')
  render$2(null, container);
  spliceIfExist(queue, vNode.component.ctx);
};

var init = function (options, cb, resolve, reject) {
  if ( resolve === void 0 ) resolve = null;
  if ( reject === void 0 ) reject = null;

  var container = document.createElement('div');
  var placement = options.placement;
  var queue = queues[placement];
  // check if placement is valid
  if (!isExist(queue)) {
    return
  }
  /* istanbul ignore else */
  // `error` alias of `danger`
  if (options.type === 'error') {
    options.type = 'danger';
  }
  var vNode = h(script, Object.assign({}, {queue: queue,
    placement: placement},
    options,
    {cb: function cb$1(msg) {
      destroy(queue, { vNode: vNode, container: container });
      if (isFunction(cb)) {
        cb(msg);
      } else if (resolve && reject) {
        resolve(msg);
      }
    }}));
  render$2(vNode, container);
  document.body.appendChild(container.firstElementChild);
  queue.push(vNode.component.ctx);
};

// eslint-disable-next-line default-param-last
var _notify = function (options, cb) {
  if ( options === void 0 ) options = {};

  // simplify usage: pass string as option.content
  if (isString(options)) {
    options = {
      content: options,
    };
  }
  // set default placement as top-right
  if (!isExist(options.placement)) {
    options.placement = PLACEMENTS.TOP_RIGHT;
  }
  if (isPromiseSupported()) {
    return new Promise(function (resolve, reject) {
      init(options, cb, resolve, reject);
    })
  } else {
    init(options, cb);
  }
};

function _notify2(type, args) {
  if (isString(args)) {
    _notify({
      content: args,
      type: type,
    });
  } else {
    _notify(
      assign({}, args, {
        type: type,
      })
    );
  }
}

var notify = Object.defineProperties(_notify, {
  success: {
    configurable: false,
    writable: false,
    value: function value(args) {
      _notify2('success', args);
    },
  },
  info: {
    configurable: false,
    writable: false,
    value: function value(args) {
      _notify2('info', args);
    },
  },
  warning: {
    configurable: false,
    writable: false,
    value: function value(args) {
      _notify2('warning', args);
    },
  },
  danger: {
    configurable: false,
    writable: false,
    value: function value(args) {
      _notify2('danger', args);
    },
  },
  error: {
    configurable: false,
    writable: false,
    value: function value(args) {
      _notify2('danger', args);
    },
  },
  dismissAll: {
    configurable: false,
    writable: false,
    value: function value() {
      for (var key in queues) {
        /* istanbul ignore else */
        if (hasOwnProperty(queues, key)) {
          queues[key].forEach(function (instance) {
            instance.onDismissed();
          });
        }
      }
    },
  },
});

var Notification = { notify: notify };

export { Notification as default };
//# sourceMappingURL=Notification.js.map
