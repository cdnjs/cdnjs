/*! Buefy v0.9.7 | MIT License | github.com/buefy/buefy */
(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
    typeof define === 'function' && define.amd ? define(['exports'], factory) :
    (global = global || self, factory(global.Modal = {}));
}(this, function (exports) { 'use strict';

    var findFocusable = function findFocusable(element) {
      var programmatic = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

      if (!element) {
        return null;
      }

      if (programmatic) {
        return element.querySelectorAll("*[tabindex=\"-1\"]");
      }

      return element.querySelectorAll("a[href]:not([tabindex=\"-1\"]),\n                                     area[href],\n                                     input:not([disabled]),\n                                     select:not([disabled]),\n                                     textarea:not([disabled]),\n                                     button:not([disabled]),\n                                     iframe,\n                                     object,\n                                     embed,\n                                     *[tabindex]:not([tabindex=\"-1\"]),\n                                     *[contenteditable]");
    };

    var onKeyDown;

    var bind = function bind(el, _ref) {
      var _ref$value = _ref.value,
          value = _ref$value === void 0 ? true : _ref$value;

      if (value) {
        var focusable = findFocusable(el);
        var focusableProg = findFocusable(el, true);

        if (focusable && focusable.length > 0) {
          onKeyDown = function onKeyDown(event) {
            // Need to get focusable each time since it can change between key events
            // ex. changing month in a datepicker
            focusable = findFocusable(el);
            focusableProg = findFocusable(el, true);
            var firstFocusable = focusable[0];
            var lastFocusable = focusable[focusable.length - 1];

            if (event.target === firstFocusable && event.shiftKey && event.key === 'Tab') {
              event.preventDefault();
              lastFocusable.focus();
            } else if ((event.target === lastFocusable || Array.from(focusableProg).indexOf(event.target) >= 0) && !event.shiftKey && event.key === 'Tab') {
              event.preventDefault();
              firstFocusable.focus();
            }
          };

          el.addEventListener('keydown', onKeyDown);
        }
      }
    };

    var unbind = function unbind(el) {
      el.removeEventListener('keydown', onKeyDown);
    };

    var directive = {
      bind: bind,
      unbind: unbind
    };

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

    //
    var script = {
      name: 'BModal',
      directives: {
        trapFocus: directive
      },
      // deprecated, to replace with default 'value' in the next breaking change
      model: {
        prop: 'active',
        event: 'update:active'
      },
      props: {
        active: Boolean,
        component: [Object, Function, String],
        content: [String, Array],
        programmatic: Boolean,
        props: Object,
        events: Object,
        width: {
          type: [String, Number],
          default: 960
        },
        hasModalCard: Boolean,
        animation: {
          type: String,
          default: 'zoom-out'
        },
        canCancel: {
          type: [Array, Boolean],
          default: function _default() {
            return config.defaultModalCanCancel;
          }
        },
        onCancel: {
          type: Function,
          default: function _default() {}
        },
        scroll: {
          type: String,
          default: function _default() {
            return config.defaultModalScroll ? config.defaultModalScroll : 'clip';
          },
          validator: function validator(value) {
            return ['clip', 'keep'].indexOf(value) >= 0;
          }
        },
        fullScreen: Boolean,
        trapFocus: {
          type: Boolean,
          default: function _default() {
            return config.defaultTrapFocus;
          }
        },
        autoFocus: {
          type: Boolean,
          default: function _default() {
            return config.defaultAutoFocus;
          }
        },
        customClass: String,
        ariaRole: {
          type: String,
          validator: function validator(value) {
            return ['dialog', 'alertdialog'].indexOf(value) >= 0;
          }
        },
        ariaModal: Boolean,
        ariaLabel: {
          type: String,
          validator: function validator(value) {
            return Boolean(value);
          }
        },
        destroyOnHide: {
          type: Boolean,
          default: true
        }
      },
      data: function data() {
        return {
          isActive: this.active || false,
          savedScrollTop: null,
          newWidth: typeof this.width === 'number' ? this.width + 'px' : this.width,
          animating: !this.active,
          destroyed: !this.active
        };
      },
      computed: {
        cancelOptions: function cancelOptions() {
          return typeof this.canCancel === 'boolean' ? this.canCancel ? config.defaultModalCanCancel : [] : this.canCancel;
        },
        showX: function showX() {
          return this.cancelOptions.indexOf('x') >= 0;
        },
        customStyle: function customStyle() {
          if (!this.fullScreen) {
            return {
              maxWidth: this.newWidth
            };
          }

          return null;
        }
      },
      watch: {
        active: function active(value) {
          this.isActive = value;
        },
        isActive: function isActive(value) {
          var _this = this;

          if (value) this.destroyed = false;
          this.handleScroll();
          this.$nextTick(function () {
            if (value && _this.$el && _this.$el.focus && _this.autoFocus) {
              _this.$el.focus();
            }
          });
        }
      },
      methods: {
        handleScroll: function handleScroll() {
          if (typeof window === 'undefined') return;

          if (this.scroll === 'clip') {
            if (this.isActive) {
              document.documentElement.classList.add('is-clipped');
            } else {
              document.documentElement.classList.remove('is-clipped');
            }

            return;
          }

          this.savedScrollTop = !this.savedScrollTop ? document.documentElement.scrollTop : this.savedScrollTop;

          if (this.isActive) {
            document.body.classList.add('is-noscroll');
          } else {
            document.body.classList.remove('is-noscroll');
          }

          if (this.isActive) {
            document.body.style.top = "-".concat(this.savedScrollTop, "px");
            return;
          }

          document.documentElement.scrollTop = this.savedScrollTop;
          document.body.style.top = null;
          this.savedScrollTop = null;
        },

        /**
        * Close the Modal if canCancel and call the onCancel prop (function).
        */
        cancel: function cancel(method) {
          if (this.cancelOptions.indexOf(method) < 0) return;
          this.$emit('cancel', arguments);
          this.onCancel.apply(null, arguments);
          this.close();
        },

        /**
        * Call the onCancel prop (function).
        * Emit events, and destroy modal if it's programmatic.
        */
        close: function close() {
          var _this2 = this;

          this.$emit('close');
          this.$emit('update:active', false); // Timeout for the animation complete before destroying

          if (this.programmatic) {
            this.isActive = false;
            setTimeout(function () {
              _this2.$destroy();

              removeElement(_this2.$el);
            }, 150);
          }
        },

        /**
        * Keypress event that is bound to the document.
        */
        keyPress: function keyPress(_ref) {
          var key = _ref.key;
          if (this.isActive && (key === 'Escape' || key === 'Esc')) this.cancel('escape');
        },

        /**
        * Transition after-enter hook
        */
        afterEnter: function afterEnter() {
          this.animating = false;
          this.$emit('after-enter');
        },

        /**
        * Transition before-leave hook
        */
        beforeLeave: function beforeLeave() {
          this.animating = true;
        },

        /**
        * Transition after-leave hook
        */
        afterLeave: function afterLeave() {
          if (this.destroyOnHide) {
            this.destroyed = true;
          }

          this.$emit('after-leave');
        }
      },
      created: function created() {
        if (typeof window !== 'undefined') {
          document.addEventListener('keyup', this.keyPress);
        }
      },
      beforeMount: function beforeMount() {
        // Insert the Modal component in body tag
        // only if it's programmatic
        this.programmatic && document.body.appendChild(this.$el);
      },
      mounted: function mounted() {
        if (this.programmatic) this.isActive = true;else if (this.isActive) this.handleScroll();
      },
      beforeDestroy: function beforeDestroy() {
        if (typeof window !== 'undefined') {
          document.removeEventListener('keyup', this.keyPress); // reset scroll

          document.documentElement.classList.remove('is-clipped');
          var savedScrollTop = !this.savedScrollTop ? document.documentElement.scrollTop : this.savedScrollTop;
          document.body.classList.remove('is-noscroll');
          document.documentElement.scrollTop = savedScrollTop;
          document.body.style.top = null;
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
    var __vue_render__ = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('transition',{attrs:{"name":_vm.animation},on:{"after-enter":_vm.afterEnter,"before-leave":_vm.beforeLeave,"after-leave":_vm.afterLeave}},[(!_vm.destroyed)?_c('div',{directives:[{name:"show",rawName:"v-show",value:(_vm.isActive),expression:"isActive"},{name:"trap-focus",rawName:"v-trap-focus",value:(_vm.trapFocus),expression:"trapFocus"}],staticClass:"modal is-active",class:[{'is-full-screen': _vm.fullScreen}, _vm.customClass],attrs:{"tabindex":"-1","role":_vm.ariaRole,"aria-label":_vm.ariaLabel,"aria-modal":_vm.ariaModal}},[_c('div',{staticClass:"modal-background",on:{"click":function($event){return _vm.cancel('outside')}}}),_c('div',{staticClass:"animation-content",class:{ 'modal-content': !_vm.hasModalCard },style:(_vm.customStyle)},[(_vm.component)?_c(_vm.component,_vm._g(_vm._b({tag:"component",attrs:{"can-cancel":_vm.canCancel},on:{"close":_vm.close}},'component',_vm.props,false),_vm.events)):(_vm.content)?[_c('div',{domProps:{"innerHTML":_vm._s(_vm.content)}})]:_vm._t("default",null,{"canCancel":_vm.canCancel,"close":_vm.close}),(_vm.showX)?_c('button',{directives:[{name:"show",rawName:"v-show",value:(!_vm.animating),expression:"!animating"}],staticClass:"modal-close is-large",attrs:{"type":"button"},on:{"click":function($event){return _vm.cancel('x')}}}):_vm._e()],2)]):_vm._e()])};
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
      

      
      var Modal = normalizeComponent_1(
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
    var registerComponent = function registerComponent(Vue, component) {
      Vue.component(component.name, component);
    };
    var registerComponentProgrammatic = function registerComponentProgrammatic(Vue, property, component) {
      if (!Vue.prototype.$buefy) Vue.prototype.$buefy = {};
      Vue.prototype.$buefy[property] = component;
    };

    var localVueInstance;
    var ModalProgrammatic = {
      open: function open(params) {
        var parent;

        if (typeof params === 'string') {
          params = {
            content: params
          };
        }

        var defaultParam = {
          programmatic: true
        };

        if (params.parent) {
          parent = params.parent;
          delete params.parent;
        }

        var slot;

        if (Array.isArray(params.content)) {
          slot = params.content;
          delete params.content;
        }

        var propsData = merge(defaultParam, params);
        var vm = typeof window !== 'undefined' && window.Vue ? window.Vue : localVueInstance || VueInstance;
        var ModalComponent = vm.extend(Modal);
        var component = new ModalComponent({
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
        registerComponent(Vue, Modal);
        registerComponentProgrammatic(Vue, 'modal', ModalProgrammatic);
      }
    };
    use(Plugin);

    exports.BModal = Modal;
    exports.ModalProgrammatic = ModalProgrammatic;
    exports.default = Plugin;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
