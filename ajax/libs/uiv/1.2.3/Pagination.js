function range (end, start, step) {
  if ( start === void 0 ) start = 0;
  if ( step === void 0 ) step = 1;

  var arr = [];
  for (var i = start; i < end; i += step) {
    arr.push(i);
  }
  return arr
}

var script = {
  props: {
    value: {
      type: Number,
      required: true,
      validator: function (v) { return v >= 1; }
    },
    boundaryLinks: {
      type: Boolean,
      default: false
    },
    directionLinks: {
      type: Boolean,
      default: true
    },
    size: String,
    align: String,
    totalPage: {
      type: Number,
      required: true,
      validator: function (v) { return v >= 0; }
    },
    maxSize: {
      type: Number,
      default: 5,
      validator: function (v) { return v >= 0; }
    },
    disabled: Boolean
  },
  data: function data () {
    return {
      sliceStart: 0
    }
  },
  computed: {
    navClasses: function navClasses () {
      var obj;

      return ( obj = {}, obj[("text-" + (this.align))] = Boolean(this.align), obj )
    },
    classes: function classes () {
      var obj;

      return ( obj = {}, obj[("pagination-" + (this.size))] = Boolean(this.size), obj )
    },
    sliceArray: function sliceArray () {
      return range(this.totalPage).slice(this.sliceStart, this.sliceStart + this.maxSize)
    }
  },
  methods: {
    calculateSliceStart: function calculateSliceStart () {
      var currentPage = this.value;
      var chunkSize = this.maxSize;
      var currentChunkStart = this.sliceStart;
      var currentChunkEnd = currentChunkStart + chunkSize;
      if (currentPage > currentChunkEnd) {
        var lastChunkStart = this.totalPage - chunkSize;
        if (currentPage > lastChunkStart) {
          this.sliceStart = lastChunkStart;
        } else {
          this.sliceStart = currentPage - 1;
        }
      } else if (currentPage < currentChunkStart + 1) {
        if (currentPage > chunkSize) {
          this.sliceStart = currentPage - chunkSize;
        } else {
          this.sliceStart = 0;
        }
      }
    },
    onPageChange: function onPageChange (page) {
      if (!this.disabled && page > 0 && page <= this.totalPage && page !== this.value) {
        this.$emit('input', page);
        this.$emit('change', page);
      }
    },
    toPage: function toPage (pre) {
      if (this.disabled) {
        return
      }
      var chunkSize = this.maxSize;
      var currentChunkStart = this.sliceStart;
      var lastChunkStart = this.totalPage - chunkSize;
      var start = pre ? currentChunkStart - chunkSize : currentChunkStart + chunkSize;
      if (start < 0) {
        this.sliceStart = 0;
      } else if (start > lastChunkStart) {
        this.sliceStart = lastChunkStart;
      } else {
        this.sliceStart = start;
      }
    }
  },
  created: function created () {
    this.$watch(function (vm) { return [vm.value, vm.maxSize, vm.totalPage].join(); }, this.calculateSliceStart, {
      immediate: true
    });
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
    "nav",
    { class: _vm.navClasses, attrs: { "aria-label": "Page navigation" } },
    [
      _c(
        "ul",
        { staticClass: "pagination", class: _vm.classes },
        [
          _vm.boundaryLinks
            ? _c(
                "li",
                { class: { disabled: _vm.value <= 1 || _vm.disabled } },
                [
                  _c(
                    "a",
                    {
                      attrs: {
                        href: "#",
                        role: "button",
                        "aria-label": "First"
                      },
                      on: {
                        click: function($event) {
                          $event.preventDefault();
                          return _vm.onPageChange(1)
                        }
                      }
                    },
                    [
                      _c("span", { attrs: { "aria-hidden": "true" } }, [
                        _vm._v("«")
                      ])
                    ]
                  )
                ]
              )
            : _vm._e(),
          _vm._v(" "),
          _vm.directionLinks
            ? _c(
                "li",
                { class: { disabled: _vm.value <= 1 || _vm.disabled } },
                [
                  _c(
                    "a",
                    {
                      attrs: {
                        href: "#",
                        role: "button",
                        "aria-label": "Previous"
                      },
                      on: {
                        click: function($event) {
                          $event.preventDefault();
                          return _vm.onPageChange(_vm.value - 1)
                        }
                      }
                    },
                    [
                      _c("span", { attrs: { "aria-hidden": "true" } }, [
                        _vm._v("‹")
                      ])
                    ]
                  )
                ]
              )
            : _vm._e(),
          _vm._v(" "),
          _vm.sliceStart > 0
            ? _c("li", { class: { disabled: _vm.disabled } }, [
                _c(
                  "a",
                  {
                    attrs: {
                      href: "#",
                      role: "button",
                      "aria-label": "Previous group"
                    },
                    on: {
                      click: function($event) {
                        $event.preventDefault();
                        return _vm.toPage(1)
                      }
                    }
                  },
                  [
                    _c("span", { attrs: { "aria-hidden": "true" } }, [
                      _vm._v("…")
                    ])
                  ]
                )
              ])
            : _vm._e(),
          _vm._v(" "),
          _vm._l(_vm.sliceArray, function(item) {
            return _c(
              "li",
              {
                key: item,
                class: {
                  active: _vm.value === item + 1,
                  disabled: _vm.disabled
                }
              },
              [
                _c(
                  "a",
                  {
                    attrs: { href: "#", role: "button" },
                    on: {
                      click: function($event) {
                        $event.preventDefault();
                        return _vm.onPageChange(item + 1)
                      }
                    }
                  },
                  [_vm._v(_vm._s(item + 1))]
                )
              ]
            )
          }),
          _vm._v(" "),
          _vm.sliceStart < _vm.totalPage - _vm.maxSize
            ? _c("li", { class: { disabled: _vm.disabled } }, [
                _c(
                  "a",
                  {
                    attrs: {
                      href: "#",
                      role: "button",
                      "aria-label": "Next group"
                    },
                    on: {
                      click: function($event) {
                        $event.preventDefault();
                        return _vm.toPage(0)
                      }
                    }
                  },
                  [
                    _c("span", { attrs: { "aria-hidden": "true" } }, [
                      _vm._v("…")
                    ])
                  ]
                )
              ])
            : _vm._e(),
          _vm._v(" "),
          _vm.directionLinks
            ? _c(
                "li",
                {
                  class: {
                    disabled: _vm.value >= _vm.totalPage || _vm.disabled
                  }
                },
                [
                  _c(
                    "a",
                    {
                      attrs: {
                        href: "#",
                        role: "button",
                        "aria-label": "Next"
                      },
                      on: {
                        click: function($event) {
                          $event.preventDefault();
                          return _vm.onPageChange(_vm.value + 1)
                        }
                      }
                    },
                    [
                      _c("span", { attrs: { "aria-hidden": "true" } }, [
                        _vm._v("›")
                      ])
                    ]
                  )
                ]
              )
            : _vm._e(),
          _vm._v(" "),
          _vm.boundaryLinks
            ? _c(
                "li",
                {
                  class: {
                    disabled: _vm.value >= _vm.totalPage || _vm.disabled
                  }
                },
                [
                  _c(
                    "a",
                    {
                      attrs: {
                        href: "#",
                        role: "button",
                        "aria-label": "Last"
                      },
                      on: {
                        click: function($event) {
                          $event.preventDefault();
                          return _vm.onPageChange(_vm.totalPage)
                        }
                      }
                    },
                    [
                      _c("span", { attrs: { "aria-hidden": "true" } }, [
                        _vm._v("»")
                      ])
                    ]
                  )
                ]
              )
            : _vm._e()
        ],
        2
      )
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

export default __vue_component__;
//# sourceMappingURL=Pagination.js.map
