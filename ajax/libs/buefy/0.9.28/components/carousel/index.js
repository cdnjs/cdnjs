/*! Buefy v0.9.28 | MIT License | github.com/buefy/buefy */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.Carousel = {}));
})(this, (function (exports) { 'use strict';

  function ownKeys(e, r) {
    var t = Object.keys(e);
    if (Object.getOwnPropertySymbols) {
      var o = Object.getOwnPropertySymbols(e);
      r && (o = o.filter(function (r) {
        return Object.getOwnPropertyDescriptor(e, r).enumerable;
      })), t.push.apply(t, o);
    }
    return t;
  }
  function _objectSpread2(e) {
    for (var r = 1; r < arguments.length; r++) {
      var t = null != arguments[r] ? arguments[r] : {};
      r % 2 ? ownKeys(Object(t), !0).forEach(function (r) {
        _defineProperty(e, r, t[r]);
      }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) {
        Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
      });
    }
    return e;
  }
  function _toPrimitive(t, r) {
    if ("object" != typeof t || !t) return t;
    var e = t[Symbol.toPrimitive];
    if (void 0 !== e) {
      var i = e.call(t, r || "default");
      if ("object" != typeof i) return i;
      throw new TypeError("@@toPrimitive must return a primitive value.");
    }
    return ("string" === r ? String : Number)(t);
  }
  function _toPropertyKey(t) {
    var i = _toPrimitive(t, "string");
    return "symbol" == typeof i ? i : String(i);
  }
  function _typeof(o) {
    "@babel/helpers - typeof";

    return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) {
      return typeof o;
    } : function (o) {
      return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
    }, _typeof(o);
  }
  function _defineProperty(obj, key, value) {
    key = _toPropertyKey(key);
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
  function _toArray(arr) {
    return _arrayWithHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableRest();
  }
  function _arrayWithHoles(arr) {
    if (Array.isArray(arr)) return arr;
  }
  function _iterableToArray(iter) {
    if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
  }
  function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
  }
  function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;
    for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
    return arr2;
  }
  function _nonIterableRest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  function _createForOfIteratorHelper(o, allowArrayLike) {
    var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"];
    if (!it) {
      if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
        if (it) o = it;
        var i = 0;
        var F = function () {};
        return {
          s: F,
          n: function () {
            if (i >= o.length) return {
              done: true
            };
            return {
              done: false,
              value: o[i++]
            };
          },
          e: function (e) {
            throw e;
          },
          f: F
        };
      }
      throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }
    var normalCompletion = true,
      didErr = false,
      err;
    return {
      s: function () {
        it = it.call(o);
      },
      n: function () {
        var step = it.next();
        normalCompletion = step.done;
        return step;
      },
      e: function (e) {
        didErr = true;
        err = e;
      },
      f: function () {
        try {
          if (!normalCompletion && it.return != null) it.return();
        } finally {
          if (didErr) throw err;
        }
      }
    };
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
    defaultTooltipCloseDelay: null,
    defaultSidebarDelay: null,
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
    defaultTimepickerMobileModal: true,
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
    defaultBreadcrumbTag: 'a',
    defaultBreadcrumbAlign: 'is-left',
    defaultBreadcrumbSeparator: '',
    defaultBreadcrumbSize: 'is-medium',
    customIconPacks: null
  };

  /**
   * +/- function to native math sign
   */
  function signPoly(value) {
    if (value < 0) return -1;
    return value > 0 ? 1 : 0;
  }
  var sign = Math.sign || signPoly;

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
   * Native modulo bug with negative numbers
   * @param n
   * @param mod
   * @returns {number}
   */
  function mod(n, mod) {
    return (n % mod + mod) % mod;
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
        return _objectSpread2(_objectSpread2({}, a), b);
      }, {});
      return _objectSpread2(_objectSpread2({}, target), replaced);
    } else {
      return Object.assign(target, source);
    }
  };
  var merge = mergeFn;

  /**
   * Based on
   * https://github.com/fregante/supports-webp
   */
  function isWebpSupported() {
    return new Promise(function (resolve) {
      var image = new Image();
      image.onerror = function () {
        return resolve(false);
      };
      image.onload = function () {
        return resolve(image.width === 1);
      };
      image.src = 'data:image/webp;base64,UklGRiQAAABXRUJQVlA4IBgAAAAwAQCdASoBAAEAAwA0JaQAA3AA/vuUAAA=';
    }).catch(function () {
      return false;
    });
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
      fal: faIcons(),
      'fa-solid': faIcons(),
      'fa-regular': faIcons(),
      'fa-light': faIcons(),
      'fa-thin': faIcons(),
      'fa-duotone': faIcons(),
      'fa-brands': faIcons()
    };
    if (config && config.customIconPacks) {
      icons = merge(icons, config.customIconPacks, true);
    }
    return icons;
  };
  var getIcons$1 = getIcons;

  var script$4 = {
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
        var allIcons = getIcons$1();
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

  function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier /* server only */, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
      if (typeof shadowMode !== 'boolean') {
          createInjectorSSR = createInjector;
          createInjector = shadowMode;
          shadowMode = false;
      }
      // Vue.extend constructor export interop.
      const options = typeof script === 'function' ? script.options : script;
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
      let hook;
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
              const originalRender = options.render;
              options.render = function renderWithStyleInjection(h, context) {
                  hook.call(context);
                  return originalRender(h, context);
              };
          }
          else {
              // inject component registration as beforeCreate hook
              const existing = options.beforeCreate;
              options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
          }
      }
      return script;
  }

  /* script */
  const __vue_script__$4 = script$4;

  /* template */
  var __vue_render__$4 = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('span',{staticClass:"icon",class:[_vm.newType, _vm.size]},[(!_vm.useIconComponent)?_c('i',{class:[_vm.newPack, _vm.newIcon, _vm.newCustomSize, _vm.customClass]}):_c(_vm.useIconComponent,{tag:"component",class:[_vm.customClass],attrs:{"icon":[_vm.newPack, _vm.newIcon],"size":_vm.newCustomSize}})],1)};
  var __vue_staticRenderFns__$4 = [];

    /* style */
    const __vue_inject_styles__$4 = undefined;
    /* scoped */
    const __vue_scope_id__$4 = undefined;
    /* module identifier */
    const __vue_module_identifier__$4 = undefined;
    /* functional template */
    const __vue_is_functional_template__$4 = false;
    /* style inject */
    
    /* style inject SSR */
    
    /* style inject shadow dom */
    

    
    const __vue_component__$4 = /*#__PURE__*/normalizeComponent(
      { render: __vue_render__$4, staticRenderFns: __vue_staticRenderFns__$4 },
      __vue_inject_styles__$4,
      __vue_script__$4,
      __vue_scope_id__$4,
      __vue_is_functional_template__$4,
      __vue_module_identifier__$4,
      false,
      undefined,
      undefined,
      undefined
    );

    var Icon = __vue_component__$4;

  var items = 1;
  var sorted$1 = 3;
  var Sorted$1 = sorted$1;
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
      if (hasFlag(flags, sorted$1)) {
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
                var _iterator = _createForOfIteratorHelper(children),
                  _step;
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
                  for (_iterator.s(); !(_step = _iterator.n()).done;) {
                    _loop();
                  }
                } catch (err) {
                  _iterator.e(err);
                } finally {
                  _iterator.f();
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

  var script$3 = {
    name: 'BCarousel',
    components: _defineProperty({}, Icon.name, Icon),
    mixins: [ProviderParentMixin('carousel', Sorted$1)],
    props: {
      value: {
        type: Number,
        default: 0
      },
      animated: {
        type: String,
        default: 'slide'
      },
      interval: Number,
      hasDrag: {
        type: Boolean,
        default: true
      },
      autoplay: {
        type: Boolean,
        default: true
      },
      pauseHover: {
        type: Boolean,
        default: true
      },
      pauseInfo: {
        type: Boolean,
        default: true
      },
      pauseInfoType: {
        type: String,
        default: 'is-white'
      },
      pauseText: {
        type: String,
        default: 'Pause'
      },
      arrow: {
        type: Boolean,
        default: true
      },
      arrowHover: {
        type: Boolean,
        default: true
      },
      repeat: {
        type: Boolean,
        default: true
      },
      iconPack: String,
      iconSize: String,
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
      indicator: {
        type: Boolean,
        default: true
      },
      indicatorBackground: Boolean,
      indicatorCustom: Boolean,
      indicatorCustomSize: {
        type: String,
        default: 'is-small'
      },
      indicatorInside: {
        type: Boolean,
        default: true
      },
      indicatorMode: {
        type: String,
        default: 'click'
      },
      indicatorPosition: {
        type: String,
        default: 'is-bottom'
      },
      indicatorStyle: {
        type: String,
        default: 'is-dots'
      },
      overlay: Boolean,
      progress: Boolean,
      progressType: {
        type: String,
        default: 'is-primary'
      },
      withCarouselList: Boolean
    },
    data: function data() {
      return {
        transition: 'next',
        activeChild: this.value || 0,
        isPause: false,
        dragX: false,
        timer: null
      };
    },
    computed: {
      indicatorClasses: function indicatorClasses() {
        return [{
          'has-background': this.indicatorBackground,
          'has-custom': this.indicatorCustom,
          'is-inside': this.indicatorInside
        }, this.indicatorCustom && this.indicatorCustomSize, this.indicatorInside && this.indicatorPosition];
      },
      // checking arrows
      hasPrev: function hasPrev() {
        return this.repeat || this.activeChild !== 0;
      },
      hasNext: function hasNext() {
        return this.repeat || this.activeChild < this.childItems.length - 1;
      }
    },
    watch: {
      /**
       * When v-model is changed set the new active item.
       */
      value: function value(_value) {
        this.changeActive(_value);
      },
      /**
       * When carousel-items are updated, set active one.
       */
      sortedItems: function sortedItems(items) {
        if (this.activeChild >= items.length && this.activeChild > 0) {
          this.changeActive(this.activeChild - 1);
        }
      },
      /**
       *  When autoplay is changed, start or pause timer accordingly
       */
      autoplay: function autoplay(status) {
        status ? this.startTimer() : this.pauseTimer();
      },
      /**
       *  Since the timer can get paused at the end, if repeat is changed we need to restart it
       */
      repeat: function repeat(status) {
        if (status) {
          this.startTimer();
        }
      }
    },
    methods: {
      startTimer: function startTimer() {
        var _this = this;
        if (!this.autoplay || this.timer) return;
        this.isPause = false;
        this.timer = setInterval(function () {
          if (!_this.repeat && _this.activeChild >= _this.childItems.length - 1) {
            _this.pauseTimer();
          } else {
            _this.next();
          }
        }, this.interval || config.defaultCarouselInterval);
      },
      pauseTimer: function pauseTimer() {
        this.isPause = true;
        if (this.timer) {
          clearInterval(this.timer);
          this.timer = null;
        }
      },
      restartTimer: function restartTimer() {
        this.pauseTimer();
        this.startTimer();
      },
      checkPause: function checkPause() {
        if (this.pauseHover && this.autoplay) {
          this.pauseTimer();
        }
      },
      /**
       * Change the active item and emit change event.
       * action only for animated slide, there true = next, false = prev
       */
      changeActive: function changeActive(newIndex) {
        var direction = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
        if (this.activeChild === newIndex || isNaN(newIndex)) return;
        direction = direction || newIndex - this.activeChild;
        newIndex = this.repeat ? mod(newIndex, this.childItems.length) : bound(newIndex, 0, this.childItems.length - 1);
        this.transition = direction > 0 ? 'prev' : 'next';
        // Transition names are reversed from the actual direction for correct effect

        this.activeChild = newIndex;
        if (newIndex !== this.value) {
          this.$emit('input', newIndex);
        }
        this.restartTimer();
        this.$emit('change', newIndex); // BC
      },
      // Indicator trigger when change active item.
      modeChange: function modeChange(trigger, value) {
        if (this.indicatorMode === trigger) {
          return this.changeActive(value);
        }
      },
      prev: function prev() {
        this.changeActive(this.activeChild - 1, -1);
      },
      next: function next() {
        this.changeActive(this.activeChild + 1, 1);
      },
      // handle drag event
      dragStart: function dragStart(event) {
        if (!this.hasDrag || !event.target.draggable) return;
        this.dragX = event.touches ? event.changedTouches[0].pageX : event.pageX;
        if (event.touches) {
          this.pauseTimer();
        } else {
          event.preventDefault();
        }
      },
      dragEnd: function dragEnd(event) {
        if (this.dragX === false) return;
        var detected = event.touches ? event.changedTouches[0].pageX : event.pageX;
        var diffX = detected - this.dragX;
        if (Math.abs(diffX) > 30) {
          if (diffX < 0) {
            this.next();
          } else {
            this.prev();
          }
        } else {
          event.target.click();
          this.sortedItems[this.activeChild].$emit('click');
          this.$emit('click');
        }
        if (event.touches) {
          this.startTimer();
        }
        this.dragX = false;
      }
    },
    mounted: function mounted() {
      this.startTimer();
    },
    beforeDestroy: function beforeDestroy() {
      this.pauseTimer();
    }
  };

  /* script */
  const __vue_script__$3 = script$3;

  /* template */
  var __vue_render__$3 = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"carousel",class:{'is-overlay': _vm.overlay},on:{"mouseenter":_vm.checkPause,"mouseleave":_vm.startTimer}},[(_vm.progress)?_c('progress',{staticClass:"progress",class:_vm.progressType,attrs:{"max":_vm.childItems.length - 1},domProps:{"value":_vm.activeChild}},[_vm._v(" "+_vm._s(_vm.childItems.length - 1)+" ")]):_vm._e(),_c('div',{staticClass:"carousel-items",on:{"mousedown":_vm.dragStart,"mouseup":_vm.dragEnd,"touchstart":function($event){$event.stopPropagation();return _vm.dragStart($event)},"touchend":function($event){$event.stopPropagation();return _vm.dragEnd($event)}}},[_vm._t("default"),(_vm.arrow)?_c('div',{staticClass:"carousel-arrow",class:{'is-hovered': _vm.arrowHover}},[_c('b-icon',{directives:[{name:"show",rawName:"v-show",value:(_vm.hasPrev),expression:"hasPrev"}],staticClass:"has-icons-left",attrs:{"pack":_vm.iconPack,"icon":_vm.iconPrev,"size":_vm.iconSize,"both":""},nativeOn:{"click":function($event){return _vm.prev($event)}}}),_c('b-icon',{directives:[{name:"show",rawName:"v-show",value:(_vm.hasNext),expression:"hasNext"}],staticClass:"has-icons-right",attrs:{"pack":_vm.iconPack,"icon":_vm.iconNext,"size":_vm.iconSize,"both":""},nativeOn:{"click":function($event){return _vm.next($event)}}})],1):_vm._e()],2),(_vm.autoplay && _vm.pauseHover && _vm.pauseInfo && _vm.isPause)?_c('div',{staticClass:"carousel-pause"},[_c('span',{staticClass:"tag",class:_vm.pauseInfoType},[_vm._v(" "+_vm._s(_vm.pauseText)+" ")])]):_vm._e(),(_vm.withCarouselList && !_vm.indicator)?[_vm._t("list",null,{"active":_vm.activeChild,"switch":_vm.changeActive})]:_vm._e(),(_vm.indicator)?_c('div',{staticClass:"carousel-indicator",class:_vm.indicatorClasses},_vm._l((_vm.sortedItems),function(item,index){return _c('a',{key:item._uid,staticClass:"indicator-item",class:{'is-active': item.isActive},on:{"mouseover":function($event){return _vm.modeChange('hover', index)},"click":function($event){return _vm.modeChange('click', index)}}},[_vm._t("indicators",[_c('span',{staticClass:"indicator-style",class:_vm.indicatorStyle})],{"i":index})],2)}),0):_vm._e(),(_vm.overlay)?[_vm._t("overlay")]:_vm._e()],2)};
  var __vue_staticRenderFns__$3 = [];

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
    
    /* style inject shadow dom */
    

    
    const __vue_component__$3 = /*#__PURE__*/normalizeComponent(
      { render: __vue_render__$3, staticRenderFns: __vue_staticRenderFns__$3 },
      __vue_inject_styles__$3,
      __vue_script__$3,
      __vue_scope_id__$3,
      __vue_is_functional_template__$3,
      __vue_module_identifier__$3,
      false,
      undefined,
      undefined,
      undefined
    );

    var Carousel = __vue_component__$3;

  var sorted = 1;
  var optional = 2;
  var Sorted = sorted;
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
    if (hasFlag(flags, sorted)) {
      mixin.data = function () {
        return {
          index: null
        };
      };
    }
    return mixin;
  });

  //
  var script$2 = {
    name: 'BCarouselItem',
    mixins: [InjectedChildMixin('carousel', Sorted)],
    data: function data() {
      return {
        transitionName: null
      };
    },
    computed: {
      transition: function transition() {
        if (this.parent.animated === 'fade') {
          return 'fade';
        } else if (this.parent.transition) {
          return 'slide-' + this.parent.transition;
        }
      },
      isActive: function isActive() {
        return this.parent.activeChild === this.index;
      }
    }
  };

  /* script */
  const __vue_script__$2 = script$2;

  /* template */
  var __vue_render__$2 = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('transition',{attrs:{"name":_vm.transition}},[_c('div',{directives:[{name:"show",rawName:"v-show",value:(_vm.isActive),expression:"isActive"}],staticClass:"carousel-item"},[_vm._t("default")],2)])};
  var __vue_staticRenderFns__$2 = [];

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
    
    /* style inject shadow dom */
    

    
    const __vue_component__$2 = /*#__PURE__*/normalizeComponent(
      { render: __vue_render__$2, staticRenderFns: __vue_staticRenderFns__$2 },
      __vue_inject_styles__$2,
      __vue_script__$2,
      __vue_scope_id__$2,
      __vue_is_functional_template__$2,
      __vue_module_identifier__$2,
      false,
      undefined,
      undefined,
      undefined
    );

    var CarouselItem = __vue_component__$2;

  var script$1 = {
    name: 'BImage',
    props: {
      src: String,
      alt: String,
      srcFallback: String,
      webpFallback: {
        type: String,
        default: function _default() {
          return config.defaultImageWebpFallback;
        }
      },
      lazy: {
        type: Boolean,
        default: function _default() {
          return config.defaultImageLazy;
        }
      },
      responsive: {
        type: Boolean,
        default: function _default() {
          return config.defaultImageResponsive;
        }
      },
      ratio: {
        type: String,
        default: function _default() {
          return config.defaultImageRatio;
        }
      },
      placeholder: String,
      srcset: String,
      srcsetSizes: Array,
      srcsetFormatter: {
        type: Function,
        default: function _default(src, size, vm) {
          {
            return vm.formatSrcset(src, size);
          }
        }
      },
      rounded: {
        type: Boolean,
        default: false
      },
      captionFirst: {
        type: Boolean,
        default: false
      },
      customClass: String
    },
    data: function data() {
      return {
        clientWidth: 0,
        webpSupportVerified: false,
        webpSupported: false,
        useNativeLazy: false,
        observer: null,
        inViewPort: false,
        bulmaKnownRatio: ['square', '1by1', '5by4', '4by3', '3by2', '5by3', '16by9', 'b2y1', '3by1', '4by5', '3by4', '2by3', '3by5', '9by16', '1by2', '1by3'],
        loaded: false,
        failed: false
      };
    },
    computed: {
      ratioPattern: function ratioPattern() {
        return new RegExp(/([0-9]+)by([0-9]+)/);
      },
      hasRatio: function hasRatio() {
        return this.ratio && this.ratioPattern.test(this.ratio);
      },
      figureClasses: function figureClasses() {
        var classes = {
          image: this.responsive
        };
        if (this.hasRatio && this.bulmaKnownRatio.indexOf(this.ratio) >= 0) {
          classes["is-".concat(this.ratio)] = true;
        }
        return classes;
      },
      figureStyles: function figureStyles() {
        if (this.hasRatio && this.bulmaKnownRatio.indexOf(this.ratio) < 0) {
          var ratioValues = this.ratioPattern.exec(this.ratio);
          return {
            paddingTop: "".concat(ratioValues[2] / ratioValues[1] * 100, "%")
          };
        }
      },
      imgClasses: function imgClasses() {
        return _defineProperty({
          'is-rounded': this.rounded,
          'has-ratio': this.hasRatio
        }, this.customClass, !!this.customClass);
      },
      srcExt: function srcExt() {
        return this.getExt(this.src);
      },
      isWepb: function isWepb() {
        return this.srcExt === 'webp';
      },
      computedSrc: function computedSrc() {
        var src = this.src;
        if (this.failed && this.srcFallback) {
          src = this.srcFallback;
        }
        if (!this.webpSupported && this.isWepb && this.webpFallback) {
          if (this.webpFallback.startsWith('.')) {
            return src.replace(/\.webp/gi, "".concat(this.webpFallback));
          }
          return this.webpFallback;
        }
        return src;
      },
      computedWidth: function computedWidth() {
        if (this.responsive && this.clientWidth > 0) {
          return this.clientWidth;
        }
      },
      computedNativeLazy: function computedNativeLazy() {
        if (this.lazy && this.useNativeLazy) {
          return 'lazy';
        }
      },
      isDisplayed: function isDisplayed() {
        return (this.webpSupportVerified || !this.isWepb) && (!this.lazy || this.useNativeLazy || this.inViewPort);
      },
      placeholderExt: function placeholderExt() {
        if (this.placeholder) {
          return this.getExt(this.placeholder);
        }
      },
      isPlaceholderWepb: function isPlaceholderWepb() {
        if (this.placeholder) {
          return this.placeholderExt === 'webp';
        }
      },
      computedPlaceholder: function computedPlaceholder() {
        if (!this.webpSupported && this.isPlaceholderWepb && this.webpFallback && this.webpFallback.startsWith('.')) {
          return this.placeholder.replace(/\.webp/gi, "".concat(this.webpFallback));
        }
        return this.placeholder;
      },
      isPlaceholderDisplayed: function isPlaceholderDisplayed() {
        return !this.loaded && (this.$slots.placeholder || this.placeholder && (this.webpSupportVerified || !this.isPlaceholderWepb));
      },
      computedSrcset: function computedSrcset() {
        var _this = this;
        if (this.srcset) {
          if (!this.webpSupported && this.isWepb && this.webpFallback && this.webpFallback.startsWith('.')) {
            return this.srcset.replace(/\.webp/gi, "".concat(this.webpFallback));
          }
          return this.srcset;
        }
        if (this.srcsetSizes && Array.isArray(this.srcsetSizes) && this.srcsetSizes.length > 0) {
          return this.srcsetSizes.map(function (size) {
            return "".concat(_this.srcsetFormatter(_this.computedSrc, size, _this), " ").concat(size, "w");
          }).join(',');
        }
      },
      computedSizes: function computedSizes() {
        if (this.computedSrcset && this.computedWidth) {
          return "".concat(this.computedWidth, "px");
        }
      },
      isCaptionFirst: function isCaptionFirst() {
        return this.$slots.caption && this.captionFirst;
      },
      isCaptionLast: function isCaptionLast() {
        return this.$slots.caption && !this.captionFirst;
      }
    },
    methods: {
      getExt: function getExt(filename) {
        var clean = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
        if (filename) {
          var noParam = clean ? filename.split('?')[0] : filename;
          return noParam.split('.').pop();
        }
        return '';
      },
      setWidth: function setWidth() {
        this.clientWidth = this.$el.clientWidth;
      },
      formatSrcset: function formatSrcset(src, size) {
        var ext = this.getExt(src, false);
        var name = src.split('.').slice(0, -1).join('.');
        return "".concat(name, "-").concat(size, ".").concat(ext);
      },
      onLoad: function onLoad(event) {
        this.loaded = true;
        this.emit('load', event);
      },
      onError: function onError(event) {
        this.emit('error', event);
        if (!this.failed) {
          this.failed = true;
        }
      },
      emit: function emit(eventName, event) {
        var target = event.target;
        this.$emit(eventName, event, target.currentSrc || target.src || this.computedSrc);
      }
    },
    created: function created() {
      var _this2 = this;
      if (this.isWepb) {
        isWebpSupported().then(function (supported) {
          _this2.webpSupportVerified = true;
          _this2.webpSupported = supported;
        });
      }
      if (this.lazy) {
        // We use native lazy loading if supported
        // We try to use Intersection Observer if native lazy loading is not supported
        // We use the lazy attribute anyway if we cannot detect support (SSR for example).
        var nativeLazySupported = typeof window !== 'undefined' && 'HTMLImageElement' in window && 'loading' in HTMLImageElement.prototype;
        var intersectionObserverSupported = typeof window !== 'undefined' && 'IntersectionObserver' in window;
        if (!nativeLazySupported && intersectionObserverSupported) {
          this.observer = new IntersectionObserver(function (events) {
            var _events$ = events[0],
              target = _events$.target,
              isIntersecting = _events$.isIntersecting;
            if (isIntersecting && !_this2.inViewPort) {
              _this2.inViewPort = true;
              _this2.observer.unobserve(target);
            }
          });
        } else {
          this.useNativeLazy = true;
        }
      }
    },
    mounted: function mounted() {
      if (this.lazy && this.observer) {
        this.observer.observe(this.$el);
      }
      this.setWidth();
      if (typeof window !== 'undefined') {
        window.addEventListener('resize', this.setWidth);
      }
    },
    beforeDestroy: function beforeDestroy() {
      if (this.observer) {
        this.observer.disconnect();
      }
      if (typeof window !== 'undefined') {
        window.removeEventListener('resize', this.setWidth);
      }
    }
  };

  /* script */
  const __vue_script__$1 = script$1;

  /* template */
  var __vue_render__$1 = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('figure',{staticClass:"b-image-wrapper",class:_vm.figureClasses,style:(_vm.figureStyles)},[(_vm.isCaptionFirst)?_c('figcaption',[_vm._t("caption")],2):_vm._e(),_c('transition',{attrs:{"name":"fade"}},[(_vm.isDisplayed)?_c('img',{class:_vm.imgClasses,attrs:{"srcset":_vm.computedSrcset,"src":_vm.computedSrc,"alt":_vm.alt,"width":_vm.computedWidth,"sizes":_vm.computedSizes,"loading":_vm.computedNativeLazy},on:{"load":_vm.onLoad,"error":_vm.onError}}):_vm._e()]),_c('transition',{attrs:{"name":"fade"}},[(_vm.isPlaceholderDisplayed)?_vm._t("placeholder",[_c('img',{staticClass:"placeholder",class:_vm.imgClasses,attrs:{"src":_vm.computedPlaceholder,"alt":_vm.alt}})]):_vm._e()],2),(_vm.isCaptionLast)?_c('figcaption',[_vm._t("caption")],2):_vm._e()],1)};
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
    
    /* style inject shadow dom */
    

    
    const __vue_component__$1 = /*#__PURE__*/normalizeComponent(
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

    var Image$1 = __vue_component__$1;

  var script = {
    name: 'BCarouselList',
    components: _defineProperty(_defineProperty({}, Icon.name, Icon), Image$1.name, Image$1),
    props: {
      data: {
        type: Array,
        default: function _default() {
          return [];
        }
      },
      value: {
        type: Number,
        default: 0
      },
      scrollValue: {
        type: Number,
        default: 0
      },
      hasDrag: {
        type: Boolean,
        default: true
      },
      hasGrayscale: Boolean,
      hasOpacity: Boolean,
      repeat: Boolean,
      itemsToShow: {
        type: Number,
        default: 4
      },
      itemsToList: {
        type: Number,
        default: 1
      },
      asIndicator: Boolean,
      arrow: {
        type: Boolean,
        default: true
      },
      arrowHover: {
        type: Boolean,
        default: true
      },
      iconPack: String,
      iconSize: String,
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
      breakpoints: {
        type: Object,
        default: function _default() {
          return {};
        }
      }
    },
    data: function data() {
      return {
        activeItem: this.value,
        scrollIndex: this.asIndicator ? this.scrollValue : this.value,
        delta: 0,
        dragX: false,
        hold: 0,
        windowWidth: 0,
        touch: false,
        observer: null,
        refresh_: 0
      };
    },
    computed: {
      dragging: function dragging() {
        return this.dragX !== false;
      },
      listClass: function listClass() {
        return [{
          'has-grayscale': this.settings.hasGrayscale,
          'has-opacity': this.settings.hasOpacity,
          'is-dragging': this.dragging
        }];
      },
      itemStyle: function itemStyle() {
        return "width: ".concat(this.itemWidth, "px;");
      },
      translation: function translation() {
        return -bound(this.delta + this.scrollIndex * this.itemWidth, 0, (this.data.length - this.settings.itemsToShow) * this.itemWidth);
      },
      total: function total() {
        return this.data.length - this.settings.itemsToShow;
      },
      hasPrev: function hasPrev() {
        return this.settings.repeat || this.scrollIndex > 0;
      },
      hasNext: function hasNext() {
        return this.settings.repeat || this.scrollIndex < this.total;
      },
      breakpointKeys: function breakpointKeys() {
        return Object.keys(this.breakpoints).sort(function (a, b) {
          return b - a;
        });
      },
      settings: function settings() {
        var _this = this;
        var breakpoint = this.breakpointKeys.filter(function (breakpoint) {
          if (_this.windowWidth >= breakpoint) {
            return true;
          }
        })[0];
        if (breakpoint) {
          return _objectSpread2(_objectSpread2({}, this.$props), this.breakpoints[breakpoint]);
        }
        return this.$props;
      },
      itemWidth: function itemWidth() {
        if (this.windowWidth) {
          // Ensure component is mounted
          /* eslint-disable-next-line */
          this.refresh_; // We force the computed property to refresh if this prop is changed

          var rect = this.$el.getBoundingClientRect();
          return rect.width / this.settings.itemsToShow;
        }
        return 0;
      }
    },
    watch: {
      /**
       * When v-model is changed set the new active item.
       */
      value: function value(_value) {
        this.switchTo(this.asIndicator ? _value - (this.itemsToShow - 3) / 2 : _value);
        if (this.activeItem !== _value) {
          this.activeItem = bound(_value, 0, this.data.length - 1);
        }
      },
      scrollValue: function scrollValue(value) {
        this.switchTo(value);
      }
    },
    methods: {
      resized: function resized() {
        this.windowWidth = window.innerWidth;
      },
      switchTo: function switchTo(newIndex) {
        if (newIndex === this.scrollIndex || isNaN(newIndex)) {
          return;
        }
        if (this.settings.repeat) {
          newIndex = mod(newIndex, this.total + 1);
        }
        newIndex = bound(newIndex, 0, this.total);
        this.scrollIndex = newIndex;
        if (!this.asIndicator && this.value !== newIndex) {
          this.$emit('input', newIndex);
        } else if (this.scrollIndex !== newIndex) {
          this.$emit('updated:scroll', newIndex);
        }
      },
      next: function next() {
        this.switchTo(this.scrollIndex + this.settings.itemsToList);
      },
      prev: function prev() {
        this.switchTo(this.scrollIndex - this.settings.itemsToList);
      },
      checkAsIndicator: function checkAsIndicator(value, event) {
        if (!this.asIndicator) return;
        var dragEndX = event.changedTouches ? event.changedTouches[0].clientX : event.clientX;
        if (this.hold - Date.now() > 2000 || Math.abs(this.dragX - dragEndX) > 10) return;
        this.dragX = false;
        this.hold = 0;
        event.preventDefault();

        // Make the item appear in the middle
        this.activeItem = value;
        this.$emit('switch', value);
      },
      // handle drag event
      dragStart: function dragStart(event) {
        if (this.dragging || !this.settings.hasDrag || event.button !== 0 && event.type !== 'touchstart') return;
        this.hold = Date.now();
        this.touch = !!event.touches;
        this.dragX = this.touch ? event.touches[0].clientX : event.clientX;
        window.addEventListener(this.touch ? 'touchmove' : 'mousemove', this.dragMove);
        window.addEventListener(this.touch ? 'touchend' : 'mouseup', this.dragEnd);
      },
      dragMove: function dragMove(event) {
        if (!this.dragging) return;
        var dragEndX = event.touches ? (event.changedTouches[0] || event.touches[0]).clientX : event.clientX;
        this.delta = this.dragX - dragEndX;
        if (!event.touches) {
          event.preventDefault();
        }
      },
      dragEnd: function dragEnd() {
        if (!this.dragging && !this.hold) return;
        if (this.hold) {
          var signCheck = sign(this.delta);
          var results = Math.round(Math.abs(this.delta / this.itemWidth) + 0.15); // Hack
          this.switchTo(this.scrollIndex + signCheck * results);
        }
        this.delta = 0;
        this.dragX = false;
        window.removeEventListener(this.touch ? 'touchmove' : 'mousemove', this.dragMove);
        window.removeEventListener(this.touch ? 'touchend' : 'mouseup', this.dragEnd);
      },
      refresh: function refresh() {
        var _this2 = this;
        this.$nextTick(function () {
          _this2.refresh_++;
        });
      }
    },
    mounted: function mounted() {
      if (typeof window !== 'undefined') {
        if (window.ResizeObserver) {
          this.observer = new ResizeObserver(this.refresh);
          this.observer.observe(this.$el);
        }
        window.addEventListener('resize', this.resized);
        document.addEventListener('animationend', this.refresh);
        document.addEventListener('transitionend', this.refresh);
        document.addEventListener('transitionstart', this.refresh);
        this.resized();
      }
      if (this.$attrs.config) {
        throw new Error('The config prop was removed, you need to use v-bind instead');
      }
    },
    beforeDestroy: function beforeDestroy() {
      if (typeof window !== 'undefined') {
        if (window.ResizeObserver) {
          this.observer.disconnect();
        }
        window.removeEventListener('resize', this.resized);
        document.removeEventListener('animationend', this.refresh);
        document.removeEventListener('transitionend', this.refresh);
        document.removeEventListener('transitionstart', this.refresh);
        this.dragEnd();
      }
    }
  };

  /* script */
  const __vue_script__ = script;

  /* template */
  var __vue_render__ = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"carousel-list",class:{'has-shadow': _vm.scrollIndex > 0},on:{"mousedown":function($event){$event.preventDefault();return _vm.dragStart($event)},"touchstart":_vm.dragStart}},[_c('div',{staticClass:"carousel-slides",class:_vm.listClass,style:('transform:translateX('+_vm.translation+'px)')},_vm._l((_vm.data),function(list,index){return _c('div',{key:index,staticClass:"carousel-slide",class:{'is-active': _vm.asIndicator ? _vm.activeItem === index : _vm.scrollIndex === index},style:(_vm.itemStyle),on:{"mouseup":function($event){return _vm.checkAsIndicator(index, $event)},"touchend":function($event){return _vm.checkAsIndicator(index, $event)}}},[_vm._t("item",[_c('b-image',_vm._b({attrs:{"src":list.image}},'b-image',list,false))],{"index":index,"active":_vm.activeItem,"scroll":_vm.scrollIndex,"list":list},list)],2)}),0),(_vm.arrow)?_c('div',{staticClass:"carousel-arrow",class:{'is-hovered': _vm.settings.arrowHover}},[_c('b-icon',{directives:[{name:"show",rawName:"v-show",value:(_vm.hasPrev),expression:"hasPrev"}],staticClass:"has-icons-left",attrs:{"pack":_vm.settings.iconPack,"icon":_vm.settings.iconPrev,"size":_vm.settings.iconSize,"both":""},nativeOn:{"click":function($event){$event.preventDefault();return _vm.prev($event)}}}),_c('b-icon',{directives:[{name:"show",rawName:"v-show",value:(_vm.hasNext),expression:"hasNext"}],staticClass:"has-icons-right",attrs:{"pack":_vm.settings.iconPack,"icon":_vm.settings.iconNext,"size":_vm.settings.iconSize,"both":""},nativeOn:{"click":function($event){$event.preventDefault();return _vm.next($event)}}})],1):_vm._e()])};
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
    
    /* style inject shadow dom */
    

    
    const __vue_component__ = /*#__PURE__*/normalizeComponent(
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

    var CarouselList = __vue_component__;

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
      registerComponent(Vue, Carousel);
      registerComponent(Vue, CarouselItem);
      registerComponent(Vue, CarouselList);
    }
  };
  use(Plugin);

  exports.BCarousel = Carousel;
  exports.BCarouselItem = CarouselItem;
  exports.BCarouselList = CarouselList;
  exports["default"] = Plugin;

  Object.defineProperty(exports, '__esModule', { value: true });

}));
