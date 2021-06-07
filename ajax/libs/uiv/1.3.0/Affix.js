// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign#Polyfill

function isFunction (obj) {
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
  TOUCH_END: 'touchend'
};

function on (element, event, handler) {
  /* istanbul ignore next */
  element.addEventListener(event, handler);
}

function off (element, event, handler) {
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

var scroll = { bind: bind, unbind: unbind, update: update };

var script = {
  directives: {
    scroll: scroll
  },
  props: {
    offset: {
      type: Number,
      default: 0
    }
  },
  data: function data () {
    return {
      affixed: false
    }
  },
  computed: {
    classes: function classes () {
      return {
        affix: this.affixed
      }
    },
    styles: function styles () {
      return {
        top: this.affixed ? this.offset + 'px' : null
      }
    }
  },
  methods: {
    // from https://github.com/ant-design/ant-design/blob/master/components/affix/index.jsx#L20
    onScroll: function onScroll () {
      var this$1 = this;

      // if is hidden don't calculate anything
      if (!(this.$el.offsetWidth || this.$el.offsetHeight || this.$el.getClientRects().length)) {
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
        element[t] = scroll[t] + rect[t] - (this$1.$el['client' + type] || body['client' + type] || 0);
      });
      var fix = scroll.top > element.top - this.offset;
      if (this.affixed !== fix) {
        this.affixed = fix;
        this.$emit(this.affixed ? 'affix' : 'unfix');
        this.$nextTick(function () {
          this$1.$emit(this$1.affixed ? 'affixed' : 'unfixed');
        });
      }
    }
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
var __vue_script__ = script;

/* template */
var __vue_render__ = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c("div", { staticClass: "hidden-print" }, [
    _c(
      "div",
      {
        directives: [
          {
            name: "scroll",
            rawName: "v-scroll",
            value: _vm.onScroll,
            expression: "onScroll"
          }
        ],
        class: _vm.classes,
        style: _vm.styles
      },
      [_vm._t("default")],
      2
    )
  ])
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

export default __vue_component__;
//# sourceMappingURL=Affix.js.map
