/*! Buefy v0.9.7 | MIT License | github.com/buefy/buefy */
(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
    typeof define === 'function' && define.amd ? define(['exports'], factory) :
    (global = global || self, factory(global.Skeleton = {}));
}(this, function (exports) { 'use strict';

    var script = {
      name: 'BSkeleton',
      functional: true,
      props: {
        active: {
          type: Boolean,
          default: true
        },
        animated: {
          type: Boolean,
          default: true
        },
        width: [Number, String],
        height: [Number, String],
        circle: Boolean,
        rounded: {
          type: Boolean,
          default: true
        },
        count: {
          type: Number,
          default: 1
        },
        position: {
          type: String,
          default: '',
          validator: function validator(value) {
            return ['', 'is-centered', 'is-right'].indexOf(value) > -1;
          }
        },
        size: String
      },
      render: function render(createElement, context) {
        if (!context.props.active) return;
        var items = [];
        var width = context.props.width;
        var height = context.props.height;

        for (var i = 0; i < context.props.count; i++) {
          items.push(createElement('div', {
            staticClass: 'b-skeleton-item',
            class: {
              'is-rounded': context.props.rounded
            },
            key: i,
            style: {
              height: height === undefined ? null : isNaN(height) ? height : height + 'px',
              width: width === undefined ? null : isNaN(width) ? width : width + 'px',
              borderRadius: context.props.circle ? '50%' : null
            }
          }));
        }

        return createElement('div', {
          staticClass: 'b-skeleton',
          class: [context.props.size, context.props.position, {
            'is-animated': context.props.animated
          }]
        }, items);
      }
    };

    function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier
    /* server only */
    , shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
      if (typeof shadowMode !== 'boolean') {
        createInjectorSSR = createInjector;
        createInjector = shadowMode;
        shadowMode = false;
      } // Vue.extend constructor export interop.


      var options = typeof script === 'function' ? script.options : script; // render functions

      if (template && template.render) {
        options.render = template.render;
        options.staticRenderFns = template.staticRenderFns;
        options._compiled = true; // functional template

        if (isFunctionalTemplate) {
          options.functional = true;
        }
      } // scopedId


      if (scopeId) {
        options._scopeId = scopeId;
      }

      var hook;

      if (moduleIdentifier) {
        // server build
        hook = function hook(context) {
          // 2.3 injection
          context = context || // cached call
          this.$vnode && this.$vnode.ssrContext || // stateful
          this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext; // functional
          // 2.2 with runInNewContext: true

          if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
            context = __VUE_SSR_CONTEXT__;
          } // inject component styles


          if (style) {
            style.call(this, createInjectorSSR(context));
          } // register component module identifier for async chunk inference


          if (context && context._registeredComponents) {
            context._registeredComponents.add(moduleIdentifier);
          }
        }; // used by ssr in case component is cached and beforeCreate
        // never gets called


        options._ssrRegister = hook;
      } else if (style) {
        hook = shadowMode ? function () {
          style.call(this, createInjectorShadow(this.$root.$options.shadowRoot));
        } : function (context) {
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
        } else {
          // inject component registration as beforeCreate hook
          var existing = options.beforeCreate;
          options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
        }
      }

      return script;
    }

    var normalizeComponent_1 = normalizeComponent;

    /* script */
    const __vue_script__ = script;

    /* template */

      /* style */
      const __vue_inject_styles__ = undefined;
      /* scoped */
      const __vue_scope_id__ = undefined;
      /* module identifier */
      const __vue_module_identifier__ = undefined;
      /* functional template */
      const __vue_is_functional_template__ = undefined;
      /* style inject */
      
      /* style inject SSR */
      

      
      var Skeleton = normalizeComponent_1(
        {},
        __vue_inject_styles__,
        __vue_script__,
        __vue_scope_id__,
        __vue_is_functional_template__,
        __vue_module_identifier__,
        undefined,
        undefined
      );

    var use = function use(plugin) {
      if (typeof window !== 'undefined' && window.Vue) {
        window.Vue.use(plugin);
      }
    };
    var registerComponent = function registerComponent(Vue, component) {
      Vue.component(component.name, component);
    };

    var Plugin = {
      install: function install(Vue) {
        registerComponent(Vue, Skeleton);
      }
    };
    use(Plugin);

    exports.BSkeleton = Skeleton;
    exports.default = Plugin;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
