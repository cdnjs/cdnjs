/*! Buefy v0.9.7 | MIT License | github.com/buefy/buefy */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = global || self, factory(global.Steps = {}));
}(this, function (exports) { 'use strict';

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
   * Checks if the flag is set
   * @param val
   * @param flag
   * @returns {boolean}
   */

  function hasFlag(val, flag) {
    return (val & flag) === flag;
  }
  /**
   * Asserts a value is beetween min and max
   * @param val
   * @param min
   * @param max
   * @returns {number}
   */


  function bound(val, min, max) {
    return Math.max(min, Math.min(max, val));
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
  function isVueComponent(c) {
    return c && c._isVue;
  }

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

  var script = {
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
  var __vue_render__ = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('span',{staticClass:"icon",class:[_vm.newType, _vm.size]},[(!_vm.useIconComponent)?_c('i',{class:[_vm.newPack, _vm.newIcon, _vm.newCustomSize, _vm.customClass]}):_c(_vm.useIconComponent,{tag:"component",class:[_vm.customClass],attrs:{"icon":[_vm.newPack, _vm.newIcon],"size":_vm.newCustomSize}})],1)};
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
    

    
    var Icon = normalizeComponent_1(
      { render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ },
      __vue_inject_styles__,
      __vue_script__,
      __vue_scope_id__,
      __vue_is_functional_template__,
      __vue_module_identifier__,
      undefined,
      undefined
    );

  var SlotComponent = {
    name: 'BSlotComponent',
    props: {
      component: {
        type: Object,
        required: true
      },
      name: {
        type: String,
        default: 'default'
      },
      scoped: {
        type: Boolean
      },
      props: {
        type: Object
      },
      tag: {
        type: String,
        default: 'div'
      },
      event: {
        type: String,
        default: 'hook:updated'
      }
    },
    methods: {
      refresh: function refresh() {
        this.$forceUpdate();
      }
    },
    created: function created() {
      if (isVueComponent(this.component)) {
        this.component.$on(this.event, this.refresh);
      }
    },
    beforeDestroy: function beforeDestroy() {
      if (isVueComponent(this.component)) {
        this.component.$off(this.event, this.refresh);
      }
    },
    render: function render(createElement) {
      if (isVueComponent(this.component)) {
        return createElement(this.tag, {}, this.scoped ? this.component.$scopedSlots[this.name](this.props) : this.component.$slots[this.name]);
      }
    }
  };

  var items = 1;
  var sorted = 3;
  var Sorted = sorted;
  var ProviderParentMixin = (function (itemName) {
    var flags = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    var mixin = {
      provide: function provide() {
        return _defineProperty({}, 'b' + itemName, this);
      }
    };

    if (hasFlag(flags, items)) {
      mixin.data = function () {
        return {
          childItems: []
        };
      };

      mixin.methods = {
        _registerItem: function _registerItem(item) {
          this.childItems.push(item);
        },
        _unregisterItem: function _unregisterItem(item) {
          this.childItems = this.childItems.filter(function (i) {
            return i !== item;
          });
        }
      };

      if (hasFlag(flags, sorted)) {
        mixin.watch = {
          /**
           * When items are added/removed deep search in the elements default's slot
           * And mark the items with their index
           */
          childItems: function childItems(items) {
            if (items.length > 0 && this.$scopedSlots.default) {
              var tag = items[0].$vnode.tag;
              var index = 0;

              var deepSearch = function deepSearch(children) {
                var _iteratorNormalCompletion = true;
                var _didIteratorError = false;
                var _iteratorError = undefined;

                try {
                  var _loop = function _loop() {
                    var child = _step.value;

                    if (child.tag === tag) {
                      // An item with the same tag will for sure be found
                      var it = items.find(function (i) {
                        return i.$vnode === child;
                      });

                      if (it) {
                        it.index = index++;
                      }
                    } else if (child.tag) {
                      var sub = child.componentInstance ? child.componentInstance.$scopedSlots.default ? child.componentInstance.$scopedSlots.default() : child.componentInstance.$children : child.children;

                      if (Array.isArray(sub) && sub.length > 0) {
                        deepSearch(sub.map(function (e) {
                          return e.$vnode;
                        }));
                      }
                    }
                  };

                  for (var _iterator = children[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    _loop();
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

                return false;
              };

              deepSearch(this.$scopedSlots.default());
            }
          }
        };
        mixin.computed = {
          /**
           * When items are added/removed sort them according to their position
           */
          sortedItems: function sortedItems() {
            return this.childItems.slice().sort(function (i1, i2) {
              return i1.index - i2.index;
            });
          }
        };
      }
    }

    return mixin;
  });

  var TabbedMixin = (function (cmp) {
    var _components;

    return {
      mixins: [ProviderParentMixin(cmp, Sorted)],
      components: (_components = {}, _defineProperty(_components, Icon.name, Icon), _defineProperty(_components, SlotComponent.name, SlotComponent), _components),
      props: {
        value: {
          type: [String, Number],
          default: undefined
        },
        size: String,
        animated: {
          type: Boolean,
          default: true
        },
        animation: String,
        animateInitially: Boolean,
        vertical: {
          type: Boolean,
          default: false
        },
        position: String,
        destroyOnHide: {
          type: Boolean,
          default: false
        }
      },
      data: function data() {
        return {
          activeId: this.value,
          // Internal state
          defaultSlots: [],
          contentHeight: 0,
          isTransitioning: false
        };
      },
      mounted: function mounted() {
        if (typeof this.value === 'number') {
          // Backward compatibility: converts the index value to an id
          var value = bound(this.value, 0, this.items.length - 1);
          this.activeId = this.items[value].value;
        } else {
          this.activeId = this.value;
        }
      },
      computed: {
        activeItem: function activeItem() {
          var _this = this;

          return this.activeId === undefined ? this.items[0] : this.activeId === null ? null : this.childItems.find(function (i) {
            return i.value === _this.activeId;
          });
        },
        items: function items() {
          return this.sortedItems;
        }
      },
      watch: {
        /**
         * When v-model is changed set the new active tab.
         */
        value: function value(_value) {
          if (typeof _value === 'number') {
            // Backward compatibility: converts the index value to an id
            _value = bound(_value, 0, this.items.length - 1);
            this.activeId = this.items[_value].value;
          } else {
            this.activeId = _value;
          }
        },

        /**
         * Sync internal state with external state
         */
        activeId: function activeId(val, oldValue) {
          var oldTab = oldValue !== undefined && oldValue !== null ? this.childItems.find(function (i) {
            return i.value === oldValue;
          }) : null;

          if (oldTab && this.activeItem) {
            oldTab.deactivate(this.activeItem.index);
            this.activeItem.activate(oldTab.index);
          }

          val = this.activeItem ? typeof this.value === 'number' ? this.items.indexOf(this.activeItem) : this.activeItem.value : undefined;

          if (val !== this.value) {
            this.$emit('input', val);
          }
        }
      },
      methods: {
        /**
        * Child click listener, emit input event and change active child.
        */
        childClick: function childClick(child) {
          this.activeId = child.value;
        },
        getNextItemIdx: function getNextItemIdx(fromIdx) {
          var skipDisabled = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
          var nextItemIdx = null;
          var idx = fromIdx + 1;

          for (; idx < this.items.length; idx++) {
            var item = this.items[idx];

            if (item.visible && (!skipDisabled || skipDisabled && !item.disabled)) {
              nextItemIdx = idx;
              break;
            }
          }

          return nextItemIdx;
        },
        getPrevItemIdx: function getPrevItemIdx(fromIdx) {
          var skipDisabled = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
          var prevItemIdx = null;

          for (var idx = fromIdx - 1; idx >= 0; idx--) {
            var item = this.items[idx];

            if (item.visible && (!skipDisabled || skipDisabled && !item.disabled)) {
              prevItemIdx = idx;
              break;
            }
          }

          return prevItemIdx;
        }
      }
    };
  });

  var script$1 = {
    name: 'BSteps',
    components: _defineProperty({}, Icon.name, Icon),
    mixins: [TabbedMixin('step')],
    props: {
      type: [String, Object],
      iconPack: String,
      iconPrev: {
        type: String,
        default: function _default() {
          return config.defaultIconPrev;
        }
      },
      iconNext: {
        type: String,
        default: function _default() {
          return config.defaultIconNext;
        }
      },
      hasNavigation: {
        type: Boolean,
        default: true
      },
      labelPosition: {
        type: String,
        validator: function validator(value) {
          return ['bottom', 'right', 'left'].indexOf(value) > -1;
        },
        default: 'bottom'
      },
      rounded: {
        type: Boolean,
        default: true
      },
      mobileMode: {
        type: String,
        validator: function validator(value) {
          return ['minimalist', 'compact'].indexOf(value) > -1;
        },
        default: 'minimalist'
      },
      ariaNextLabel: String,
      ariaPreviousLabel: String
    },
    computed: {
      // Override mixin implementation to always have a value
      activeItem: function activeItem() {
        var _this = this;

        return this.childItems.filter(function (i) {
          return i.value === _this.activeId;
        })[0] || this.items[0];
      },
      wrapperClasses: function wrapperClasses() {
        return [this.size, _defineProperty({
          'is-vertical': this.vertical
        }, this.position, this.position && this.vertical)];
      },
      mainClasses: function mainClasses() {
        return [this.type, _defineProperty({
          'has-label-right': this.labelPosition === 'right',
          'has-label-left': this.labelPosition === 'left',
          'is-animated': this.animated,
          'is-rounded': this.rounded
        }, "mobile-".concat(this.mobileMode), this.mobileMode !== null)];
      },

      /**
       * Check if previous button is available.
       */
      hasPrev: function hasPrev() {
        return this.prevItemIdx !== null;
      },

      /**
       * Retrieves the next visible item index
       */
      nextItemIdx: function nextItemIdx() {
        var idx = this.activeItem ? this.items.indexOf(this.activeItem) : 0;
        return this.getNextItemIdx(idx);
      },

      /**
       * Retrieves the next visible item
       */
      nextItem: function nextItem() {
        var nextItem = null;

        if (this.nextItemIdx !== null) {
          nextItem = this.items[this.nextItemIdx];
        }

        return nextItem;
      },

      /**
      * Retrieves the next visible item index
      */
      prevItemIdx: function prevItemIdx() {
        if (!this.activeItem) {
          return null;
        }

        var idx = this.items.indexOf(this.activeItem);
        return this.getPrevItemIdx(idx);
      },

      /**
       * Retrieves the previous visible item
       */
      prevItem: function prevItem() {
        if (!this.activeItem) {
          return null;
        }

        var prevItem = null;

        if (this.prevItemIdx !== null) {
          prevItem = this.items[this.prevItemIdx];
        }

        return prevItem;
      },

      /**
       * Check if next button is available.
       */
      hasNext: function hasNext() {
        return this.nextItemIdx !== null;
      },
      navigationProps: function navigationProps() {
        return {
          previous: {
            disabled: !this.hasPrev,
            action: this.prev
          },
          next: {
            disabled: !this.hasNext,
            action: this.next
          }
        };
      }
    },
    methods: {
      /**
       * Return if the step should be clickable or not.
       */
      isItemClickable: function isItemClickable(stepItem) {
        if (stepItem.clickable === undefined) {
          return stepItem.index < this.activeItem.index;
        }

        return stepItem.clickable;
      },

      /**
       * Previous button click listener.
       */
      prev: function prev() {
        if (this.hasPrev) {
          this.activeId = this.prevItem.value;
        }
      },

      /**
       * Previous button click listener.
       */
      next: function next() {
        if (this.hasNext) {
          this.activeId = this.nextItem.value;
        }
      }
    }
  };

  /* script */
  const __vue_script__$1 = script$1;

  /* template */
  var __vue_render__$1 = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"b-steps",class:_vm.wrapperClasses},[_c('nav',{staticClass:"steps",class:_vm.mainClasses},[_c('ul',{staticClass:"step-items"},_vm._l((_vm.items),function(childItem){return _c('li',{directives:[{name:"show",rawName:"v-show",value:(childItem.visible),expression:"childItem.visible"}],key:childItem.value,staticClass:"step-item",class:[childItem.type || _vm.type, childItem.headerClass, {
                      'is-active': childItem.isActive,
                      'is-previous': _vm.activeItem.index > childItem.index
              }]},[_c('a',{staticClass:"step-link",class:{'is-clickable': _vm.isItemClickable(childItem)},on:{"click":function($event){_vm.isItemClickable(childItem) && _vm.childClick(childItem);}}},[_c('div',{staticClass:"step-marker"},[(childItem.icon)?_c('b-icon',{attrs:{"icon":childItem.icon,"pack":childItem.iconPack,"size":_vm.size}}):(childItem.step)?_c('span',[_vm._v(_vm._s(childItem.step))]):_vm._e()],1),_c('div',{staticClass:"step-details"},[_c('span',{staticClass:"step-title"},[_vm._v(_vm._s(childItem.label))])])])])}),0)]),_c('section',{staticClass:"step-content",class:{'is-transitioning': _vm.isTransitioning}},[_vm._t("default")],2),_vm._t("navigation",[(_vm.hasNavigation)?_c('nav',{staticClass:"step-navigation"},[_c('a',{staticClass:"pagination-previous",attrs:{"role":"button","disabled":_vm.navigationProps.previous.disabled,"aria-label":_vm.ariaPreviousLabel},on:{"click":function($event){$event.preventDefault();return _vm.navigationProps.previous.action($event)}}},[_c('b-icon',{attrs:{"icon":_vm.iconPrev,"pack":_vm.iconPack,"both":"","aria-hidden":"true"}})],1),_c('a',{staticClass:"pagination-next",attrs:{"role":"button","disabled":_vm.navigationProps.next.disabled,"aria-label":_vm.ariaNextLabel},on:{"click":function($event){$event.preventDefault();return _vm.navigationProps.next.action($event)}}},[_c('b-icon',{attrs:{"icon":_vm.iconNext,"pack":_vm.iconPack,"both":"","aria-hidden":"true"}})],1)]):_vm._e()],{"previous":_vm.navigationProps.previous,"next":_vm.navigationProps.next})],2)};
  var __vue_staticRenderFns__$1 = [];

    /* style */
    const __vue_inject_styles__$1 = undefined;
    /* scoped */
    const __vue_scope_id__$1 = undefined;
    /* module identifier */
    const __vue_module_identifier__$1 = undefined;
    /* functional template */
    const __vue_is_functional_template__$1 = false;
    /* style inject */
    
    /* style inject SSR */
    

    
    var Steps = normalizeComponent_1(
      { render: __vue_render__$1, staticRenderFns: __vue_staticRenderFns__$1 },
      __vue_inject_styles__$1,
      __vue_script__$1,
      __vue_scope_id__$1,
      __vue_is_functional_template__$1,
      __vue_module_identifier__$1,
      undefined,
      undefined
    );

  var sorted$1 = 1;
  var optional = 2;
  var Sorted$1 = sorted$1;
  var InjectedChildMixin = (function (parentItemName) {
    var flags = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    var mixin = {
      inject: {
        parent: {
          from: 'b' + parentItemName,
          default: false
        }
      },
      created: function created() {
        if (!this.parent) {
          if (!hasFlag(flags, optional)) {
            this.$destroy();
            throw new Error('You should wrap ' + this.$options.name + ' in a ' + parentItemName);
          }
        } else if (this.parent._registerItem) {
          this.parent._registerItem(this);
        }
      },
      beforeDestroy: function beforeDestroy() {
        if (this.parent && this.parent._unregisterItem) {
          this.parent._unregisterItem(this);
        }
      }
    };

    if (hasFlag(flags, sorted$1)) {
      mixin.data = function () {
        return {
          index: null
        };
      };
    }

    return mixin;
  });

  var TabbedChildMixin = (function (parentCmp) {
    return {
      mixins: [InjectedChildMixin(parentCmp, Sorted$1)],
      props: {
        label: String,
        icon: String,
        iconPack: String,
        visible: {
          type: Boolean,
          default: true
        },
        value: {
          type: String,
          default: function _default() {
            return this._uid.toString();
          }
        },
        headerClass: {
          type: [String, Array, Object],
          default: null
        }
      },
      data: function data() {
        return {
          transitionName: null,
          elementClass: 'item',
          elementRole: null
        };
      },
      computed: {
        isActive: function isActive() {
          return this.parent.activeItem === this;
        }
      },
      methods: {
        /**
         * Activate element, alter animation name based on the index.
         */
        activate: function activate(oldIndex) {
          this.transitionName = this.index < oldIndex ? this.parent.vertical ? 'slide-down' : 'slide-next' : this.parent.vertical ? 'slide-up' : 'slide-prev';
        },

        /**
         * Deactivate element, alter animation name based on the index.
         */
        deactivate: function deactivate(newIndex) {
          this.transitionName = newIndex < this.index ? this.parent.vertical ? 'slide-down' : 'slide-next' : this.parent.vertical ? 'slide-up' : 'slide-prev';
        }
      },
      render: function render(createElement) {
        var _this = this;

        // if destroy apply v-if
        if (this.parent.destroyOnHide) {
          if (!this.isActive || !this.visible) {
            return;
          }
        }

        var vnode = createElement('div', {
          directives: [{
            name: 'show',
            value: this.isActive && this.visible
          }],
          attrs: {
            'class': this.elementClass,
            'role': this.elementRole,
            'id': "".concat(this.value, "-content"),
            'aria-labelledby': this.elementRole ? "".concat(this.value, "-label") : null,
            'tabindex': this.isActive ? 0 : -1
          }
        }, this.$slots.default); // check animated prop

        if (this.parent.animated) {
          return createElement('transition', {
            props: {
              'name': this.parent.animation || this.transitionName,
              'appear': this.parent.animateInitially === true || undefined
            },
            on: {
              'before-enter': function beforeEnter() {
                _this.parent.isTransitioning = true;
              },
              'after-enter': function afterEnter() {
                _this.parent.isTransitioning = false;
              }
            }
          }, [vnode]);
        }

        return vnode;
      }
    };
  });

  var script$2 = {
    name: 'BStepItem',
    mixins: [TabbedChildMixin('step')],
    props: {
      step: [String, Number],
      type: [String, Object],
      clickable: {
        type: Boolean,
        default: undefined
      }
    },
    data: function data() {
      return {
        elementClass: 'step-item'
      };
    }
  };

  /* script */
  const __vue_script__$2 = script$2;

  /* template */

    /* style */
    const __vue_inject_styles__$2 = undefined;
    /* scoped */
    const __vue_scope_id__$2 = undefined;
    /* module identifier */
    const __vue_module_identifier__$2 = undefined;
    /* functional template */
    const __vue_is_functional_template__$2 = undefined;
    /* style inject */
    
    /* style inject SSR */
    

    
    var StepItem = normalizeComponent_1(
      {},
      __vue_inject_styles__$2,
      __vue_script__$2,
      __vue_scope_id__$2,
      __vue_is_functional_template__$2,
      __vue_module_identifier__$2,
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
      registerComponent(Vue, Steps);
      registerComponent(Vue, StepItem);
    }
  };
  use(Plugin);

  exports.BStepItem = StepItem;
  exports.BSteps = Steps;
  exports.default = Plugin;

  Object.defineProperty(exports, '__esModule', { value: true });

}));
