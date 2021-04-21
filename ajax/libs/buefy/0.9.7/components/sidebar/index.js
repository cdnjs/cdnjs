/*! Buefy v0.9.7 | MIT License | github.com/buefy/buefy */
(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
    typeof define === 'function' && define.amd ? define(['exports'], factory) :
    (global = global || self, factory(global.Sidebar = {}));
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

    function removeElement(el) {
      if (typeof el.remove !== 'undefined') {
        el.remove();
      } else if (typeof el.parentNode !== 'undefined' && el.parentNode !== null) {
        el.parentNode.removeChild(el);
      }
    }
    function isCustomElement(vm) {
      return 'shadowRoot' in vm.$root.$options;
    }

    //
    var script = {
      name: 'BSidebar',
      // deprecated, to replace with default 'value' in the next breaking change
      model: {
        prop: 'open',
        event: 'update:open'
      },
      props: {
        open: Boolean,
        type: [String, Object],
        overlay: Boolean,
        position: {
          type: String,
          default: 'fixed',
          validator: function validator(value) {
            return ['fixed', 'absolute', 'static'].indexOf(value) >= 0;
          }
        },
        fullheight: Boolean,
        fullwidth: Boolean,
        right: Boolean,
        mobile: {
          type: String
        },
        reduce: Boolean,
        expandOnHover: Boolean,
        expandOnHoverFixed: Boolean,
        canCancel: {
          type: [Array, Boolean],
          default: function _default() {
            return ['escape', 'outside'];
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
        }
      },
      data: function data() {
        return {
          isOpen: this.open,
          transitionName: null,
          animating: true,
          savedScrollTop: null
        };
      },
      computed: {
        rootClasses: function rootClasses() {
          return [this.type, {
            'is-fixed': this.isFixed,
            'is-static': this.isStatic,
            'is-absolute': this.isAbsolute,
            'is-fullheight': this.fullheight,
            'is-fullwidth': this.fullwidth,
            'is-right': this.right,
            'is-mini': this.reduce,
            'is-mini-expand': this.expandOnHover,
            'is-mini-expand-fixed': this.expandOnHover && this.expandOnHoverFixed,
            'is-mini-mobile': this.mobile === 'reduce',
            'is-hidden-mobile': this.mobile === 'hide',
            'is-fullwidth-mobile': this.mobile === 'fullwidth'
          }];
        },
        cancelOptions: function cancelOptions() {
          return typeof this.canCancel === 'boolean' ? this.canCancel ? ['escape', 'outside'] : [] : this.canCancel;
        },
        isStatic: function isStatic() {
          return this.position === 'static';
        },
        isFixed: function isFixed() {
          return this.position === 'fixed';
        },
        isAbsolute: function isAbsolute() {
          return this.position === 'absolute';
        }
      },
      watch: {
        open: {
          handler: function handler(value) {
            this.isOpen = value;

            if (this.overlay) {
              this.handleScroll();
            }

            var open = this.right ? !value : value;
            this.transitionName = !open ? 'slide-prev' : 'slide-next';
          },
          immediate: true
        }
      },
      methods: {
        /**
        * White-listed items to not close when clicked.
        * Add sidebar content and all children.
        */
        getWhiteList: function getWhiteList() {
          var whiteList = [];
          whiteList.push(this.$refs.sidebarContent); // Add all chidren from dropdown

          if (this.$refs.sidebarContent !== undefined) {
            var children = this.$refs.sidebarContent.querySelectorAll('*');
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
              for (var _iterator = children[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                var child = _step.value;
                whiteList.push(child);
              }
            } catch (err) {
              _didIteratorError = true;
              _iteratorError = err;
            } finally {
              try {
                if (!_iteratorNormalCompletion && _iterator.return != null) {
                  _iterator.return();
                }
              } finally {
                if (_didIteratorError) {
                  throw _iteratorError;
                }
              }
            }
          }

          return whiteList;
        },

        /**
        * Keypress event that is bound to the document.
        */
        keyPress: function keyPress(_ref) {
          var key = _ref.key;

          if (this.isFixed) {
            if (this.isOpen && (key === 'Escape' || key === 'Esc')) this.cancel('escape');
          }
        },

        /**
        * Close the Sidebar if canCancel and call the onCancel prop (function).
        */
        cancel: function cancel(method) {
          if (this.cancelOptions.indexOf(method) < 0) return;
          if (this.isStatic) return;
          this.onCancel.apply(null, arguments);
          this.close();
        },

        /**
        * Call the onCancel prop (function) and emit events
        */
        close: function close() {
          this.isOpen = false;
          this.$emit('close');
          this.$emit('update:open', false);
        },

        /**
         * Close fixed sidebar if clicked outside.
         */
        clickedOutside: function clickedOutside(event) {
          if (this.isFixed) {
            if (this.isOpen && !this.animating) {
              var target = isCustomElement(this) ? event.composedPath()[0] : event.target;

              if (this.getWhiteList().indexOf(target) < 0) {
                this.cancel('outside');
              }
            }
          }
        },

        /**
        * Transition before-enter hook
        */
        beforeEnter: function beforeEnter() {
          this.animating = true;
        },

        /**
        * Transition after-leave hook
        */
        afterEnter: function afterEnter() {
          this.animating = false;
        },
        handleScroll: function handleScroll() {
          if (typeof window === 'undefined') return;

          if (this.scroll === 'clip') {
            if (this.open) {
              document.documentElement.classList.add('is-clipped');
            } else {
              document.documentElement.classList.remove('is-clipped');
            }

            return;
          }

          this.savedScrollTop = !this.savedScrollTop ? document.documentElement.scrollTop : this.savedScrollTop;

          if (this.open) {
            document.body.classList.add('is-noscroll');
          } else {
            document.body.classList.remove('is-noscroll');
          }

          if (this.open) {
            document.body.style.top = "-".concat(this.savedScrollTop, "px");
            return;
          }

          document.documentElement.scrollTop = this.savedScrollTop;
          document.body.style.top = null;
          this.savedScrollTop = null;
        }
      },
      created: function created() {
        if (typeof window !== 'undefined') {
          document.addEventListener('keyup', this.keyPress);
          document.addEventListener('click', this.clickedOutside);
        }
      },
      mounted: function mounted() {
        if (typeof window !== 'undefined') {
          if (this.isFixed) {
            document.body.appendChild(this.$el);
          }
        }

        if (this.overlay && this.open) {
          this.handleScroll();
        }
      },
      beforeDestroy: function beforeDestroy() {
        if (typeof window !== 'undefined') {
          document.removeEventListener('keyup', this.keyPress);
          document.removeEventListener('click', this.clickedOutside);

          if (this.overlay) {
            // reset scroll
            document.documentElement.classList.remove('is-clipped');
            var savedScrollTop = !this.savedScrollTop ? document.documentElement.scrollTop : this.savedScrollTop;
            document.body.classList.remove('is-noscroll');
            document.documentElement.scrollTop = savedScrollTop;
            document.body.style.top = null;
          }
        }

        if (this.isFixed) {
          removeElement(this.$el);
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
    var __vue_render__ = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"b-sidebar"},[(_vm.overlay && _vm.isOpen)?_c('div',{staticClass:"sidebar-background"}):_vm._e(),_c('transition',{attrs:{"name":_vm.transitionName},on:{"before-enter":_vm.beforeEnter,"after-enter":_vm.afterEnter}},[_c('div',{directives:[{name:"show",rawName:"v-show",value:(_vm.isOpen),expression:"isOpen"}],ref:"sidebarContent",staticClass:"sidebar-content",class:_vm.rootClasses},[_vm._t("default")],2)])],1)};
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
      

      
      var Sidebar = normalizeComponent_1(
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

    var Plugin = {
      install: function install(Vue) {
        registerComponent(Vue, Sidebar);
      }
    };
    use(Plugin);

    exports.BSidebar = Sidebar;
    exports.default = Plugin;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
