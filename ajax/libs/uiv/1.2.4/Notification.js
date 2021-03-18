import Vue from 'vue';

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign#Polyfill
function assign (target, varArgs) {
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

function isExist (obj) {
  return typeof obj !== 'undefined' && obj !== null
}

function isFunction (obj) {
  return typeof obj === 'function'
}

function isString (obj) {
  return typeof obj === 'string'
}

function isPromiseSupported () {
  return typeof window !== 'undefined' && isExist(window.Promise)
}

function hasOwnProperty (o, k) {
  return Object.prototype.hasOwnProperty.call(o, k)
}

function spliceIfExist (arr, item) {
  if (Array.isArray(arr)) {
    var index = arr.indexOf(item);
    if (index >= 0) {
      arr.splice(index, 1);
    }
  }
}

function isElement (el) {
  return el && el.nodeType === Node.ELEMENT_NODE
}

function removeFromDom (el) {
  isElement(el) && isElement(el.parentNode) && el.parentNode.removeChild(el);
}

function addClass (el, className) {
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

function removeClass (el, className) {
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
      default: false
    },
    duration: {
      type: Number,
      default: 0
    },
    type: {
      type: String,
      default: 'info'
    }
  },
  data: function data () {
    return {
      timeout: 0
    }
  },
  computed: {
    alertClass: function alertClass () {
      var obj;

      return ( obj = {
        alert: true
      }, obj[("alert-" + (this.type))] = Boolean(this.type), obj['alert-dismissible'] = this.dismissible, obj )
    }
  },
  methods: {
    closeAlert: function closeAlert () {
      clearTimeout(this.timeout);
      this.$emit('dismissed');
    }
  },
  mounted: function mounted () {
    if (this.duration > 0) {
      this.timeout = setTimeout(this.closeAlert, this.duration);
    }
  },
  destroyed: function destroyed () {
    clearTimeout(this.timeout);
  }
};

function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier /* server only */, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
    if (typeof shadowMode !== 'boolean') {
        createInjectorSSR = createInjector;
        createInjector = shadowMode;
        shadowMode = false;
    }
    // Vue.extend constructor export interop.
    var options = typeof script === 'function' ? script.options : script;
    // render functions
    if (template && template.render) {
        options.render = template.render;
        options.staticRenderFns = template.staticRenderFns;
        options._compiled = true;
        // functional template
        if (isFunctionalTemplate) {
            options.functional = true;
        }
    }
    // scopedId
    if (scopeId) {
        options._scopeId = scopeId;
    }
    var hook;
    if (moduleIdentifier) {
        // server build
        hook = function (context) {
            // 2.3 injection
            context =
                context || // cached call
                    (this.$vnode && this.$vnode.ssrContext) || // stateful
                    (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext); // functional
            // 2.2 with runInNewContext: true
            if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
                context = __VUE_SSR_CONTEXT__;
            }
            // inject component styles
            if (style) {
                style.call(this, createInjectorSSR(context));
            }
            // register component module identifier for async chunk inference
            if (context && context._registeredComponents) {
                context._registeredComponents.add(moduleIdentifier);
            }
        };
        // used by ssr in case component is cached and beforeCreate
        // never gets called
        options._ssrRegister = hook;
    }
    else if (style) {
        hook = shadowMode
            ? function (context) {
                style.call(this, createInjectorShadow(context, this.$root.$options.shadowRoot));
            }
            : function (context) {
                style.call(this, createInjector(context));
            };
    }
    if (hook) {
        if (options.functional) {
            // register for functional component in vue file
            var originalRender = options.render;
            options.render = function renderWithStyleInjection(h, context) {
                hook.call(context);
                return originalRender(h, context);
            };
        }
        else {
            // inject component registration as beforeCreate hook
            var existing = options.beforeCreate;
            options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
        }
    }
    return script;
}

/* script */
var __vue_script__$1 = script$1;

/* template */
var __vue_render__$1 = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "div",
    { class: _vm.alertClass, attrs: { role: "alert" } },
    [
      _vm.dismissible
        ? _c(
            "button",
            {
              staticClass: "close",
              attrs: { type: "button", "aria-label": "Close" },
              on: { click: _vm.closeAlert }
            },
            [_c("span", { attrs: { "aria-hidden": "true" } }, [_vm._v("×")])]
          )
        : _vm._e(),
      _vm._v(" "),
      _vm._t("default")
    ],
    2
  )
};
var __vue_staticRenderFns__$1 = [];
__vue_render__$1._withStripped = true;

  /* style */
  var __vue_inject_styles__$1 = undefined;
  /* scoped */
  var __vue_scope_id__$1 = undefined;
  /* module identifier */
  var __vue_module_identifier__$1 = undefined;
  /* functional template */
  var __vue_is_functional_template__$1 = false;
  /* style inject */
  
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  var __vue_component__$1 = /*#__PURE__*/normalizeComponent(
    { render: __vue_render__$1, staticRenderFns: __vue_staticRenderFns__$1 },
    __vue_inject_styles__$1,
    __vue_script__$1,
    __vue_scope_id__$1,
    __vue_is_functional_template__$1,
    __vue_module_identifier__$1,
    false,
    undefined,
    undefined,
    undefined
  );

var TYPES = {
  SUCCESS: 'success',
  INFO: 'info',
  DANGER: 'danger',
  WARNING: 'warning'
};

var PLACEMENTS = {
  TOP_LEFT: 'top-left',
  TOP_RIGHT: 'top-right',
  BOTTOM_LEFT: 'bottom-left',
  BOTTOM_RIGHT: 'bottom-right'
};

var IN_CLASS = 'in';
var ICON = 'glyphicon';
var WIDTH = 300;
var TRANSITION_DURATION = 300;

var script = {
  components: { Alert: __vue_component__$1 },
  props: {
    title: String,
    content: String,
    html: {
      type: Boolean,
      default: false
    },
    duration: {
      type: Number,
      default: 5000
    },
    dismissible: {
      type: Boolean,
      default: true
    },
    type: String,
    placement: String,
    icon: String,
    customClass: null,
    cb: {
      type: Function,
      required: true
    },
    queue: {
      type: Array,
      required: true
    },
    offsetY: {
      type: Number,
      default: 15
    },
    offsetX: {
      type: Number,
      default: 15
    },
    offset: {
      type: Number,
      default: 15
    }
  },
  data: function data () {
    return {
      height: 0,
      top: 0,
      horizontal: this.placement === PLACEMENTS.TOP_LEFT || this.placement === PLACEMENTS.BOTTOM_LEFT ? 'left' : 'right',
      vertical: this.placement === PLACEMENTS.TOP_LEFT || this.placement === PLACEMENTS.TOP_RIGHT ? 'top' : 'bottom'
    }
  },
  created: function created () {
    // get prev notifications total height in the queue
    this.top = this.getTotalHeightOfQueue(this.queue);
  },
  mounted: function mounted () {
    var this$1 = this;

    var el = this.$el;
    el.style[this.vertical] = this.top + 'px';
    this.$nextTick(function () {
      el.style[this$1.horizontal] = "-" + WIDTH + "px";
      this$1.height = el.offsetHeight;
      el.style[this$1.horizontal] = (this$1.offsetX) + "px";
      addClass(el, IN_CLASS);
    });
  },
  computed: {
    styles: function styles () {
      var obj;

      var queue = this.queue;
      var thisIndex = queue.indexOf(this);
      return ( obj = {
        position: 'fixed'
      }, obj[this.vertical] = ((this.getTotalHeightOfQueue(queue, thisIndex)) + "px"), obj.width = (WIDTH + "px"), obj.transition = ("all " + (TRANSITION_DURATION / 1000) + "s ease-in-out"), obj )
    },
    icons: function icons () {
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
    }
  },
  methods: {
    getTotalHeightOfQueue: function getTotalHeightOfQueue (queue, lastIndex) {
      if ( lastIndex === void 0 ) lastIndex = queue.length;

      var totalHeight = this.offsetY;
      for (var i = 0; i < lastIndex; i++) {
        totalHeight += queue[i].height + this.offset;
      }
      return totalHeight
    },
    onDismissed: function onDismissed () {
      removeClass(this.$el, IN_CLASS);
      setTimeout(this.cb, TRANSITION_DURATION);
    }
  }
};

/* script */
var __vue_script__ = script;

/* template */
var __vue_render__ = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "alert",
    {
      staticClass: "fade",
      class: _vm.customClass,
      style: _vm.styles,
      attrs: {
        type: _vm.type,
        duration: _vm.duration,
        dismissible: _vm.dismissible
      },
      on: { dismissed: _vm.onDismissed }
    },
    [
      _c("div", { staticClass: "media", staticStyle: { margin: "0" } }, [
        _vm.icons
          ? _c("div", { staticClass: "media-left" }, [
              _c("span", {
                class: _vm.icons,
                staticStyle: { "font-size": "1.5em" }
              })
            ])
          : _vm._e(),
        _vm._v(" "),
        _c("div", { staticClass: "media-body" }, [
          _vm.title
            ? _c("div", { staticClass: "media-heading" }, [
                _c("b", [_vm._v(_vm._s(_vm.title))])
              ])
            : _vm._e(),
          _vm._v(" "),
          _vm.html
            ? _c("div", { domProps: { innerHTML: _vm._s(_vm.content) } })
            : _c("div", [_vm._v(_vm._s(_vm.content))])
        ])
      ])
    ]
  )
};
var __vue_staticRenderFns__ = [];
__vue_render__._withStripped = true;

  /* style */
  var __vue_inject_styles__ = undefined;
  /* scoped */
  var __vue_scope_id__ = undefined;
  /* module identifier */
  var __vue_module_identifier__ = undefined;
  /* functional template */
  var __vue_is_functional_template__ = false;
  /* style inject */
  
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  var __vue_component__ = /*#__PURE__*/normalizeComponent(
    { render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ },
    __vue_inject_styles__,
    __vue_script__,
    __vue_scope_id__,
    __vue_is_functional_template__,
    __vue_module_identifier__,
    false,
    undefined,
    undefined,
    undefined
  );

var queues = {};
queues[PLACEMENTS.TOP_LEFT] = [];
queues[PLACEMENTS.TOP_RIGHT] = [];
queues[PLACEMENTS.BOTTOM_LEFT] = [];
queues[PLACEMENTS.BOTTOM_RIGHT] = [];

var destroy = function (queue, instance) {
  // console.log('destroyNotification')
  removeFromDom(instance.$el);
  instance.$destroy();
  spliceIfExist(queue, instance);
};

var init = function (options, cb, resolve, reject) {
  if ( resolve === void 0 ) resolve = null;
  if ( reject === void 0 ) reject = null;

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
  var instance = new Vue({
    extends: __vue_component__,
    propsData: assign({}, { queue: queue, placement: placement }, options, {
      cb: function cb$1 (msg) {
        destroy(queue, instance);
        if (isFunction(cb)) {
          cb(msg);
        } else if (resolve && reject) {
          resolve(msg);
        }
      }
    })
  });
  instance.$mount();
  document.body.appendChild(instance.$el);
  queue.push(instance);
};

// eslint-disable-next-line default-param-last
var _notify = function (options, cb) {
  if ( options === void 0 ) options = {};

  // simplify usage: pass string as option.content
  if (isString(options)) {
    options = {
      content: options
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

function _notify2 (type, args) {
  if (isString(args)) {
    _notify({
      content: args,
      type: type
    });
  } else {
    _notify(assign({}, args, {
      type: type
    }));
  }
}

var notify = Object.defineProperties(_notify, {
  success: {
    configurable: false,
    writable: false,
    value: function value (args) {
      _notify2('success', args);
    }
  },
  info: {
    configurable: false,
    writable: false,
    value: function value (args) {
      _notify2('info', args);
    }
  },
  warning: {
    configurable: false,
    writable: false,
    value: function value (args) {
      _notify2('warning', args);
    }
  },
  danger: {
    configurable: false,
    writable: false,
    value: function value (args) {
      _notify2('danger', args);
    }
  },
  error: {
    configurable: false,
    writable: false,
    value: function value (args) {
      _notify2('danger', args);
    }
  },
  dismissAll: {
    configurable: false,
    writable: false,
    value: function value () {
      for (var key in queues) {
        /* istanbul ignore else */
        if (hasOwnProperty(queues, key)) {
          queues[key].forEach(function (instance) {
            instance.onDismissed();
          });
        }
      }
    }
  }
});

var Notification = { notify: notify };

export default Notification;
//# sourceMappingURL=Notification.js.map
