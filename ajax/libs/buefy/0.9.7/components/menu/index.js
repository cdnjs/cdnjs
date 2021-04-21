/*! Buefy v0.9.7 | MIT License | github.com/buefy/buefy */
(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
    typeof define === 'function' && define.amd ? define(['exports'], factory) :
    (global = global || self, factory(global.Menu = {}));
}(this, function (exports) { 'use strict';

    //
    //
    //
    //
    //
    //
    var script = {
      name: 'BMenu',
      props: {
        accordion: {
          type: Boolean,
          default: true
        },
        activable: {
          type: Boolean,
          default: true
        }
      },
      data: function data() {
        return {
          _isMenu: true // Used by MenuItem

        };
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
    var __vue_render__ = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"menu"},[_vm._t("default")],2)};
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
      

      
      var Menu = normalizeComponent_1(
        { render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ },
        __vue_inject_styles__,
        __vue_script__,
        __vue_scope_id__,
        __vue_is_functional_template__,
        __vue_module_identifier__,
        undefined,
        undefined
      );

    var script$1 = {
      name: 'BMenuList',
      functional: true,
      props: {
        label: String,
        icon: String,
        iconPack: String,
        ariaRole: {
          type: String,
          default: ''
        },
        size: {
          type: String,
          default: 'is-small'
        }
      },
      render: function render(createElement, context) {
        var vlabel = null;
        var slots = context.slots();

        if (context.props.label || slots.label) {
          vlabel = createElement('p', {
            attrs: {
              'class': 'menu-label'
            }
          }, context.props.label ? context.props.icon ? [createElement('b-icon', {
            props: {
              'icon': context.props.icon,
              'pack': context.props.iconPack,
              'size': context.props.size
            }
          }), createElement('span', {}, context.props.label)] : context.props.label : slots.label);
        }

        var vnode = createElement('ul', {
          attrs: {
            'class': 'menu-list',
            'role': context.props.ariaRole === 'menu' ? context.props.ariaRole : null
          }
        }, slots.default);
        return vlabel ? [vlabel, vnode] : vnode;
      }
    };

    /* script */
    const __vue_script__$1 = script$1;

    /* template */

      /* style */
      const __vue_inject_styles__$1 = undefined;
      /* scoped */
      const __vue_scope_id__$1 = undefined;
      /* module identifier */
      const __vue_module_identifier__$1 = undefined;
      /* functional template */
      const __vue_is_functional_template__$1 = undefined;
      /* style inject */
      
      /* style inject SSR */
      

      
      var MenuList = normalizeComponent_1(
        {},
        __vue_inject_styles__$1,
        __vue_script__$1,
        __vue_scope_id__$1,
        __vue_is_functional_template__$1,
        __vue_module_identifier__$1,
        undefined,
        undefined
      );

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

    function _toArray(arr) {
      return _arrayWithHoles(arr) || _iterableToArray(arr) || _nonIterableRest();
    }

    function _arrayWithHoles(arr) {
      if (Array.isArray(arr)) return arr;
    }

    function _iterableToArray(iter) {
      if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter);
    }

    function _nonIterableRest() {
      throw new TypeError("Invalid attempt to destructure non-iterable instance");
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

    var mdiIcons = {
      sizes: {
        'default': 'mdi-24px',
        'is-small': null,
        'is-medium': 'mdi-36px',
        'is-large': 'mdi-48px'
      },
      iconPrefix: 'mdi-'
    };

    var faIcons = function faIcons() {
      var faIconPrefix = config && config.defaultIconComponent ? '' : 'fa-';
      return {
        sizes: {
          'default': null,
          'is-small': null,
          'is-medium': faIconPrefix + 'lg',
          'is-large': faIconPrefix + '2x'
        },
        iconPrefix: faIconPrefix,
        internalIcons: {
          'information': 'info-circle',
          'alert': 'exclamation-triangle',
          'alert-circle': 'exclamation-circle',
          'chevron-right': 'angle-right',
          'chevron-left': 'angle-left',
          'chevron-down': 'angle-down',
          'eye-off': 'eye-slash',
          'menu-down': 'caret-down',
          'menu-up': 'caret-up',
          'close-circle': 'times-circle'
        }
      };
    };

    var getIcons = function getIcons() {
      var icons = {
        mdi: mdiIcons,
        fa: faIcons(),
        fas: faIcons(),
        far: faIcons(),
        fad: faIcons(),
        fab: faIcons(),
        fal: faIcons()
      };

      if (config && config.customIconPacks) {
        icons = merge(icons, config.customIconPacks, true);
      }

      return icons;
    };

    var script$2 = {
      name: 'BIcon',
      props: {
        type: [String, Object],
        component: String,
        pack: String,
        icon: String,
        size: String,
        customSize: String,
        customClass: String,
        both: Boolean // This is used internally to show both MDI and FA icon

      },
      computed: {
        iconConfig: function iconConfig() {
          var allIcons = getIcons();
          return allIcons[this.newPack];
        },
        iconPrefix: function iconPrefix() {
          if (this.iconConfig && this.iconConfig.iconPrefix) {
            return this.iconConfig.iconPrefix;
          }

          return '';
        },

        /**
        * Internal icon name based on the pack.
        * If pack is 'fa', gets the equivalent FA icon name of the MDI,
        * internal icons are always MDI.
        */
        newIcon: function newIcon() {
          return "".concat(this.iconPrefix).concat(this.getEquivalentIconOf(this.icon));
        },
        newPack: function newPack() {
          return this.pack || config.defaultIconPack;
        },
        newType: function newType() {
          if (!this.type) return;
          var splitType = [];

          if (typeof this.type === 'string') {
            splitType = this.type.split('-');
          } else {
            for (var key in this.type) {
              if (this.type[key]) {
                splitType = key.split('-');
                break;
              }
            }
          }

          if (splitType.length <= 1) return;

          var _splitType = splitType,
              _splitType2 = _toArray(_splitType),
              type = _splitType2.slice(1);

          return "has-text-".concat(type.join('-'));
        },
        newCustomSize: function newCustomSize() {
          return this.customSize || this.customSizeByPack;
        },
        customSizeByPack: function customSizeByPack() {
          if (this.iconConfig && this.iconConfig.sizes) {
            if (this.size && this.iconConfig.sizes[this.size] !== undefined) {
              return this.iconConfig.sizes[this.size];
            } else if (this.iconConfig.sizes.default) {
              return this.iconConfig.sizes.default;
            }
          }

          return null;
        },
        useIconComponent: function useIconComponent() {
          return this.component || config.defaultIconComponent;
        }
      },
      methods: {
        /**
        * Equivalent icon name of the MDI.
        */
        getEquivalentIconOf: function getEquivalentIconOf(value) {
          // Only transform the class if the both prop is set to true
          if (!this.both) {
            return value;
          }

          if (this.iconConfig && this.iconConfig.internalIcons && this.iconConfig.internalIcons[value]) {
            return this.iconConfig.internalIcons[value];
          }

          return value;
        }
      }
    };

    /* script */
    const __vue_script__$2 = script$2;

    /* template */
    var __vue_render__$1 = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('span',{staticClass:"icon",class:[_vm.newType, _vm.size]},[(!_vm.useIconComponent)?_c('i',{class:[_vm.newPack, _vm.newIcon, _vm.newCustomSize, _vm.customClass]}):_c(_vm.useIconComponent,{tag:"component",class:[_vm.customClass],attrs:{"icon":[_vm.newPack, _vm.newIcon],"size":_vm.newCustomSize}})],1)};
    var __vue_staticRenderFns__$1 = [];

      /* style */
      const __vue_inject_styles__$2 = undefined;
      /* scoped */
      const __vue_scope_id__$2 = undefined;
      /* module identifier */
      const __vue_module_identifier__$2 = undefined;
      /* functional template */
      const __vue_is_functional_template__$2 = false;
      /* style inject */
      
      /* style inject SSR */
      

      
      var Icon = normalizeComponent_1(
        { render: __vue_render__$1, staticRenderFns: __vue_staticRenderFns__$1 },
        __vue_inject_styles__$2,
        __vue_script__$2,
        __vue_scope_id__$2,
        __vue_is_functional_template__$2,
        __vue_module_identifier__$2,
        undefined,
        undefined
      );

    var script$3 = {
      name: 'BMenuItem',
      components: _defineProperty({}, Icon.name, Icon),
      inheritAttrs: false,
      // deprecated, to replace with default 'value' in the next breaking change
      model: {
        prop: 'active',
        event: 'update:active'
      },
      props: {
        label: String,
        active: Boolean,
        expanded: Boolean,
        disabled: Boolean,
        iconPack: String,
        icon: String,
        animation: {
          type: String,
          default: 'slide'
        },
        tag: {
          type: String,
          default: 'a',
          validator: function validator(value) {
            return config.defaultLinkTags.indexOf(value) >= 0;
          }
        },
        ariaRole: {
          type: String,
          default: ''
        },
        size: {
          type: String,
          default: 'is-small'
        }
      },
      data: function data() {
        return {
          newActive: this.active,
          newExpanded: this.expanded
        };
      },
      computed: {
        ariaRoleMenu: function ariaRoleMenu() {
          return this.ariaRole === 'menuitem' ? this.ariaRole : null;
        }
      },
      watch: {
        active: function active(value) {
          this.newActive = value;
        },
        expanded: function expanded(value) {
          this.newExpanded = value;
        }
      },
      methods: {
        onClick: function onClick(event) {
          if (this.disabled) return;
          var menu = this.getMenu();
          this.reset(this.$parent, menu);
          this.newExpanded = !this.newExpanded;
          this.$emit('update:expanded', this.newExpanded);

          if (menu && menu.activable) {
            this.newActive = true;
            this.$emit('update:active', this.newActive);
          }
        },
        reset: function reset(parent, menu) {
          var _this = this;

          var items = parent.$children.filter(function (c) {
            return c.name === _this.name;
          });
          items.forEach(function (item) {
            if (item !== _this) {
              _this.reset(item, menu);

              if (!parent.$data._isMenu || parent.$data._isMenu && parent.accordion) {
                item.newExpanded = false;
                item.$emit('update:expanded', item.newActive);
              }

              if (menu && menu.activable) {
                item.newActive = false;
                item.$emit('update:active', item.newActive);
              }
            }
          });
        },
        getMenu: function getMenu() {
          var parent = this.$parent;

          while (parent && !parent.$data._isMenu) {
            parent = parent.$parent;
          }

          return parent;
        }
      }
    };

    /* script */
    const __vue_script__$3 = script$3;

    /* template */
    var __vue_render__$2 = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('li',{attrs:{"role":_vm.ariaRoleMenu}},[_c(_vm.tag,_vm._g(_vm._b({tag:"component",class:{
                'is-active': _vm.newActive,
                'is-expanded': _vm.newExpanded,
                'is-disabled': _vm.disabled,
                'icon-text': _vm.icon,
            },on:{"click":function($event){return _vm.onClick($event)}}},'component',_vm.$attrs,false),_vm.$listeners),[(_vm.icon)?_c('b-icon',{attrs:{"icon":_vm.icon,"pack":_vm.iconPack,"size":_vm.size}}):_vm._e(),(_vm.label)?_c('span',[_vm._v(" "+_vm._s(_vm.label)+" ")]):_vm._t("label",null,{"expanded":_vm.newExpanded,"active":_vm.newActive})],2),(_vm.$slots.default)?[_c('transition',{attrs:{"name":_vm.animation}},[_c('ul',{directives:[{name:"show",rawName:"v-show",value:(_vm.newExpanded),expression:"newExpanded"}]},[_vm._t("default")],2)])]:_vm._e()],2)};
    var __vue_staticRenderFns__$2 = [];

      /* style */
      const __vue_inject_styles__$3 = undefined;
      /* scoped */
      const __vue_scope_id__$3 = undefined;
      /* module identifier */
      const __vue_module_identifier__$3 = undefined;
      /* functional template */
      const __vue_is_functional_template__$3 = false;
      /* style inject */
      
      /* style inject SSR */
      

      
      var MenuItem = normalizeComponent_1(
        { render: __vue_render__$2, staticRenderFns: __vue_staticRenderFns__$2 },
        __vue_inject_styles__$3,
        __vue_script__$3,
        __vue_scope_id__$3,
        __vue_is_functional_template__$3,
        __vue_module_identifier__$3,
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
        registerComponent(Vue, Menu);
        registerComponent(Vue, MenuList);
        registerComponent(Vue, MenuItem);
      }
    };
    use(Plugin);

    exports.BMenu = Menu;
    exports.BMenuItem = MenuItem;
    exports.BMenuList = MenuList;
    exports.default = Plugin;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
