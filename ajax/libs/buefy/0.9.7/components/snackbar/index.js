/*! Buefy v0.9.7 | MIT License | github.com/buefy/buefy */
(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
    typeof define === 'function' && define.amd ? define(['exports'], factory) :
    (global = global || self, factory(global.Snackbar = {}));
}(this, function (exports) { 'use strict';

    var config = {
      defaultContainerElement: null,
      defaultIconPack: 'mdi',
      defaultIconComponent: null,
      defaultIconPrev: 'chevron-left',
      defaultIconNext: 'chevron-right',
      defaultLocale: undefined,
      defaultDialogConfirmText: null,
      defaultDialogCancelText: null,
      defaultSnackbarDuration: 3500,
      defaultSnackbarPosition: null,
      defaultToastDuration: 2000,
      defaultToastPosition: null,
      defaultNotificationDuration: 2000,
      defaultNotificationPosition: null,
      defaultTooltipType: 'is-primary',
      defaultTooltipDelay: null,
      defaultInputAutocomplete: 'on',
      defaultDateFormatter: null,
      defaultDateParser: null,
      defaultDateCreator: null,
      defaultTimeCreator: null,
      defaultDayNames: null,
      defaultMonthNames: null,
      defaultFirstDayOfWeek: null,
      defaultUnselectableDaysOfWeek: null,
      defaultTimeFormatter: null,
      defaultTimeParser: null,
      defaultModalCanCancel: ['escape', 'x', 'outside', 'button'],
      defaultModalScroll: null,
      defaultDatepickerMobileNative: true,
      defaultTimepickerMobileNative: true,
      defaultNoticeQueue: true,
      defaultInputHasCounter: true,
      defaultTaginputHasCounter: true,
      defaultUseHtml5Validation: true,
      defaultDropdownMobileModal: true,
      defaultFieldLabelPosition: null,
      defaultDatepickerYearsRange: [-100, 10],
      defaultDatepickerNearbyMonthDays: true,
      defaultDatepickerNearbySelectableMonthDays: false,
      defaultDatepickerShowWeekNumber: false,
      defaultDatepickerWeekNumberClickable: false,
      defaultDatepickerMobileModal: true,
      defaultTrapFocus: true,
      defaultAutoFocus: true,
      defaultButtonRounded: false,
      defaultSwitchRounded: true,
      defaultCarouselInterval: 3500,
      defaultTabsExpanded: false,
      defaultTabsAnimated: true,
      defaultTabsType: null,
      defaultStatusIcon: true,
      defaultProgrammaticPromise: false,
      defaultLinkTags: ['a', 'button', 'input', 'router-link', 'nuxt-link', 'n-link', 'RouterLink', 'NuxtLink', 'NLink'],
      defaultImageWebpFallback: null,
      defaultImageLazy: true,
      defaultImageResponsive: true,
      defaultImageRatio: null,
      defaultImageSrcsetFormatter: null,
      customIconPacks: null
    };
    var VueInstance;

    function _typeof(obj) {
      "@babel/helpers - typeof";

      if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
        _typeof = function (obj) {
          return typeof obj;
        };
      } else {
        _typeof = function (obj) {
          return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
        };
      }

      return _typeof(obj);
    }

    function _defineProperty(obj, key, value) {
      if (key in obj) {
        Object.defineProperty(obj, key, {
          value: value,
          enumerable: true,
          configurable: true,
          writable: true
        });
      } else {
        obj[key] = value;
      }

      return obj;
    }

    function ownKeys(object, enumerableOnly) {
      var keys = Object.keys(object);

      if (Object.getOwnPropertySymbols) {
        var symbols = Object.getOwnPropertySymbols(object);
        if (enumerableOnly) symbols = symbols.filter(function (sym) {
          return Object.getOwnPropertyDescriptor(object, sym).enumerable;
        });
        keys.push.apply(keys, symbols);
      }

      return keys;
    }

    function _objectSpread2(target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i] != null ? arguments[i] : {};

        if (i % 2) {
          ownKeys(Object(source), true).forEach(function (key) {
            _defineProperty(target, key, source[key]);
          });
        } else if (Object.getOwnPropertyDescriptors) {
          Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
        } else {
          ownKeys(Object(source)).forEach(function (key) {
            Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
          });
        }
      }

      return target;
    }

    /**
     * Merge function to replace Object.assign with deep merging possibility
     */

    var isObject = function isObject(item) {
      return _typeof(item) === 'object' && !Array.isArray(item);
    };

    var mergeFn = function mergeFn(target, source) {
      var deep = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

      if (deep || !Object.assign) {
        var isDeep = function isDeep(prop) {
          return isObject(source[prop]) && target !== null && target.hasOwnProperty(prop) && isObject(target[prop]);
        };

        var replaced = Object.getOwnPropertyNames(source).map(function (prop) {
          return _defineProperty({}, prop, isDeep(prop) ? mergeFn(target[prop], source[prop], deep) : source[prop]);
        }).reduce(function (a, b) {
          return _objectSpread2({}, a, {}, b);
        }, {});
        return _objectSpread2({}, target, {}, replaced);
      } else {
        return Object.assign(target, source);
      }
    };

    var merge = mergeFn;
    function removeElement(el) {
      if (typeof el.remove !== 'undefined') {
        el.remove();
      } else if (typeof el.parentNode !== 'undefined' && el.parentNode !== null) {
        el.parentNode.removeChild(el);
      }
    }

    var NoticeMixin = {
      props: {
        type: {
          type: String,
          default: 'is-dark'
        },
        message: [String, Array],
        duration: Number,
        queue: {
          type: Boolean,
          default: undefined
        },
        indefinite: {
          type: Boolean,
          default: false
        },
        position: {
          type: String,
          default: 'is-top',
          validator: function validator(value) {
            return ['is-top-right', 'is-top', 'is-top-left', 'is-bottom-right', 'is-bottom', 'is-bottom-left'].indexOf(value) > -1;
          }
        },
        container: String
      },
      data: function data() {
        return {
          isActive: false,
          parentTop: null,
          parentBottom: null,
          newContainer: this.container || config.defaultContainerElement
        };
      },
      computed: {
        correctParent: function correctParent() {
          switch (this.position) {
            case 'is-top-right':
            case 'is-top':
            case 'is-top-left':
              return this.parentTop;

            case 'is-bottom-right':
            case 'is-bottom':
            case 'is-bottom-left':
              return this.parentBottom;
          }
        },
        transition: function transition() {
          switch (this.position) {
            case 'is-top-right':
            case 'is-top':
            case 'is-top-left':
              return {
                enter: 'fadeInDown',
                leave: 'fadeOut'
              };

            case 'is-bottom-right':
            case 'is-bottom':
            case 'is-bottom-left':
              return {
                enter: 'fadeInUp',
                leave: 'fadeOut'
              };
          }
        }
      },
      methods: {
        shouldQueue: function shouldQueue() {
          var queue = this.queue !== undefined ? this.queue : config.defaultNoticeQueue;
          if (!queue) return false;
          return this.parentTop.childElementCount > 0 || this.parentBottom.childElementCount > 0;
        },
        close: function close() {
          var _this = this;

          clearTimeout(this.timer);
          this.isActive = false;
          this.$emit('close'); // Timeout for the animation complete before destroying

          setTimeout(function () {
            _this.$destroy();

            removeElement(_this.$el);
          }, 150);
        },
        showNotice: function showNotice() {
          var _this2 = this;

          if (this.shouldQueue()) {
            // Call recursively if should queue
            setTimeout(function () {
              return _this2.showNotice();
            }, 250);
            return;
          }

          this.correctParent.insertAdjacentElement('afterbegin', this.$el);
          this.isActive = true;

          if (!this.indefinite) {
            this.timer = setTimeout(function () {
              return _this2.close();
            }, this.newDuration);
          }
        },
        setupContainer: function setupContainer() {
          this.parentTop = document.querySelector((this.newContainer ? this.newContainer : 'body') + '>.notices.is-top');
          this.parentBottom = document.querySelector((this.newContainer ? this.newContainer : 'body') + '>.notices.is-bottom');
          if (this.parentTop && this.parentBottom) return;

          if (!this.parentTop) {
            this.parentTop = document.createElement('div');
            this.parentTop.className = 'notices is-top';
          }

          if (!this.parentBottom) {
            this.parentBottom = document.createElement('div');
            this.parentBottom.className = 'notices is-bottom';
          }

          var container = document.querySelector(this.newContainer) || document.body;
          container.appendChild(this.parentTop);
          container.appendChild(this.parentBottom);

          if (this.newContainer) {
            this.parentTop.classList.add('has-custom-container');
            this.parentBottom.classList.add('has-custom-container');
          }
        }
      },
      beforeMount: function beforeMount() {
        this.setupContainer();
      },
      mounted: function mounted() {
        this.showNotice();
      }
    };

    //
    var script = {
      name: 'BSnackbar',
      mixins: [NoticeMixin],
      props: {
        actionText: {
          type: String,
          default: 'OK'
        },
        onAction: {
          type: Function,
          default: function _default() {}
        },
        cancelText: {
          type: String | null,
          default: null
        }
      },
      data: function data() {
        return {
          newDuration: this.duration || config.defaultSnackbarDuration
        };
      },
      methods: {
        /**
        * Click listener.
        * Call action prop before closing (from Mixin).
        */
        action: function action() {
          this.onAction();
          this.close();
        }
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
    var __vue_render__ = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('transition',{attrs:{"enter-active-class":_vm.transition.enter,"leave-active-class":_vm.transition.leave}},[_c('div',{directives:[{name:"show",rawName:"v-show",value:(_vm.isActive),expression:"isActive"}],staticClass:"snackbar",class:[_vm.type,_vm.position],attrs:{"role":_vm.actionText ? 'alertdialog' : 'alert'}},[(_vm.$slots.default)?[_vm._t("default")]:[_c('div',{staticClass:"text",domProps:{"innerHTML":_vm._s(_vm.message)}})],(_vm.cancelText)?_c('div',{staticClass:"action is-light is-cancel",on:{"click":_vm.close}},[_c('button',{staticClass:"button"},[_vm._v(_vm._s(_vm.cancelText))])]):_vm._e(),(_vm.actionText)?_c('div',{staticClass:"action",class:_vm.type,on:{"click":_vm.action}},[_c('button',{staticClass:"button"},[_vm._v(_vm._s(_vm.actionText))])]):_vm._e()],2)])};
    var __vue_staticRenderFns__ = [];

      /* style */
      const __vue_inject_styles__ = undefined;
      /* scoped */
      const __vue_scope_id__ = undefined;
      /* module identifier */
      const __vue_module_identifier__ = undefined;
      /* functional template */
      const __vue_is_functional_template__ = false;
      /* style inject */
      
      /* style inject SSR */
      

      
      var Snackbar = normalizeComponent_1(
        { render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ },
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
    var registerComponentProgrammatic = function registerComponentProgrammatic(Vue, property, component) {
      if (!Vue.prototype.$buefy) Vue.prototype.$buefy = {};
      Vue.prototype.$buefy[property] = component;
    };

    var localVueInstance;
    var SnackbarProgrammatic = {
      open: function open(params) {
        var parent;

        if (typeof params === 'string') {
          params = {
            message: params
          };
        }

        var defaultParam = {
          type: 'is-success',
          position: config.defaultSnackbarPosition || 'is-bottom-right'
        };

        if (params.parent) {
          parent = params.parent;
          delete params.parent;
        }

        var slot;

        if (Array.isArray(params.message)) {
          slot = params.message;
          delete params.message;
        }

        var propsData = merge(defaultParam, params);
        var vm = typeof window !== 'undefined' && window.Vue ? window.Vue : localVueInstance || VueInstance;
        var SnackbarComponent = vm.extend(Snackbar);
        var component = new SnackbarComponent({
          parent: parent,
          el: document.createElement('div'),
          propsData: propsData
        });

        if (slot) {
          component.$slots.default = slot;
          component.$forceUpdate();
        }

        return component;
      }
    };
    var Plugin = {
      install: function install(Vue) {
        localVueInstance = Vue;
        registerComponentProgrammatic(Vue, 'snackbar', SnackbarProgrammatic);
      }
    };
    use(Plugin);

    exports.BSnackbar = Snackbar;
    exports.SnackbarProgrammatic = SnackbarProgrammatic;
    exports.default = Plugin;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
