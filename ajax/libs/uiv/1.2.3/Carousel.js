// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign#Polyfill

function isExist (obj) {
  return typeof obj !== 'undefined' && obj !== null
}

var script = {
  props: {
    value: Number,
    indicators: {
      type: Boolean,
      default: true
    },
    controls: {
      type: Boolean,
      default: true
    },
    interval: {
      type: Number,
      default: 5000
    },
    iconControlLeft: {
      type: String,
      default: 'glyphicon glyphicon-chevron-left'
    },
    iconControlRight: {
      type: String,
      default: 'glyphicon glyphicon-chevron-right'
    }
  },
  data: function data () {
    return {
      slides: [],
      activeIndex: 0, // Make v-model not required
      timeoutId: 0,
      intervalId: 0
    }
  },
  watch: {
    interval: function interval () {
      this.startInterval();
    },
    value: function value (index, oldValue) {
      this.run(index, oldValue);
      this.activeIndex = index;
    }
  },
  mounted: function mounted () {
    if (isExist(this.value)) {
      this.activeIndex = this.value;
    }
    if (this.slides.length > 0) {
      this.$select(this.activeIndex);
    }
    this.startInterval();
  },
  beforeDestroy: function beforeDestroy () {
    this.stopInterval();
  },
  methods: {
    run: function run (newIndex, oldIndex) {
      var this$1 = this;

      var currentActiveIndex = oldIndex || 0;
      var direction;
      if (newIndex > currentActiveIndex) {
        direction = ['next', 'left'];
      } else {
        direction = ['prev', 'right'];
      }
      this.slides[newIndex].slideClass[direction[0]] = true;
      this.$nextTick(function () {
        this$1.slides[newIndex].$el.offsetHeight;
        this$1.slides.forEach(function (slide, i) {
          if (i === currentActiveIndex) {
            slide.slideClass.active = true;
            slide.slideClass[direction[1]] = true;
          } else if (i === newIndex) {
            slide.slideClass[direction[1]] = true;
          }
        });
        this$1.timeoutId = setTimeout(function () {
          this$1.$select(newIndex);
          this$1.$emit('change', newIndex);
          this$1.timeoutId = 0;
        }, 600);
      });
    },
    startInterval: function startInterval () {
      var this$1 = this;

      this.stopInterval();
      if (this.interval > 0) {
        this.intervalId = setInterval(function () {
          this$1.next();
        }, this.interval);
      }
    },
    stopInterval: function stopInterval () {
      clearInterval(this.intervalId);
      this.intervalId = 0;
    },
    resetAllSlideClass: function resetAllSlideClass () {
      this.slides.forEach(function (slide) {
        slide.slideClass.active = false;
        slide.slideClass.left = false;
        slide.slideClass.right = false;
        slide.slideClass.next = false;
        slide.slideClass.prev = false;
      });
    },
    $select: function $select (index) {
      this.resetAllSlideClass();
      this.slides[index].slideClass.active = true;
    },
    select: function select (index) {
      if (this.timeoutId !== 0 || index === this.activeIndex) {
        return
      }
      if (isExist(this.value)) {
        this.$emit('input', index);
      } else {
        this.run(index, this.activeIndex);
        this.activeIndex = index;
      }
    },
    prev: function prev () {
      this.select(this.activeIndex === 0 ? this.slides.length - 1 : this.activeIndex - 1);
    },
    next: function next () {
      this.select(this.activeIndex === this.slides.length - 1 ? 0 : this.activeIndex + 1);
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
  return _c(
    "div",
    {
      staticClass: "carousel slide",
      attrs: { "data-ride": "carousel" },
      on: { mouseenter: _vm.stopInterval, mouseleave: _vm.startInterval }
    },
    [
      _vm.indicators
        ? _vm._t(
            "indicators",
            [
              _c(
                "ol",
                { staticClass: "carousel-indicators" },
                _vm._l(_vm.slides, function(slide, index) {
                  return _c("li", {
                    class: { active: index === _vm.activeIndex },
                    on: {
                      click: function($event) {
                        return _vm.select(index)
                      }
                    }
                  })
                }),
                0
              )
            ],
            { select: _vm.select, activeIndex: _vm.activeIndex }
          )
        : _vm._e(),
      _vm._v(" "),
      _c(
        "div",
        { staticClass: "carousel-inner", attrs: { role: "listbox" } },
        [_vm._t("default")],
        2
      ),
      _vm._v(" "),
      _vm.controls
        ? _c(
            "a",
            {
              staticClass: "left carousel-control",
              attrs: { href: "#", role: "button" },
              on: {
                click: function($event) {
                  $event.preventDefault();
                  return _vm.prev()
                }
              }
            },
            [
              _c("span", {
                class: _vm.iconControlLeft,
                attrs: { "aria-hidden": "true" }
              }),
              _vm._v(" "),
              _c("span", { staticClass: "sr-only" }, [_vm._v("Previous")])
            ]
          )
        : _vm._e(),
      _vm._v(" "),
      _vm.controls
        ? _c(
            "a",
            {
              staticClass: "right carousel-control",
              attrs: { href: "#", role: "button" },
              on: {
                click: function($event) {
                  $event.preventDefault();
                  return _vm.next()
                }
              }
            },
            [
              _c("span", {
                class: _vm.iconControlRight,
                attrs: { "aria-hidden": "true" }
              }),
              _vm._v(" "),
              _c("span", { staticClass: "sr-only" }, [_vm._v("Next")])
            ]
          )
        : _vm._e()
    ],
    2
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

export default __vue_component__;
//# sourceMappingURL=Carousel.js.map
