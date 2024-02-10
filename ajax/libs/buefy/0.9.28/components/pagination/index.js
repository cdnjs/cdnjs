/*! Buefy v0.9.28 | MIT License | github.com/buefy/buefy */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.Pagination = {}));
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

  //
  var script$2 = {
    name: 'BPaginationButton',
    props: {
      page: {
        type: Object,
        required: true
      },
      tag: {
        type: String,
        default: 'a',
        validator: function validator(value) {
          return config.defaultLinkTags.indexOf(value) >= 0;
        }
      },
      disabled: {
        type: Boolean,
        default: false
      }
    },
    computed: {
      href: function href() {
        if (this.tag === 'a') {
          return '#';
        }
      },
      isDisabled: function isDisabled() {
        return this.disabled || this.page.disabled;
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
  const __vue_script__$2 = script$2;

  /* template */
  var __vue_render__$2 = function () {
  var _obj;
  var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c(_vm.tag,_vm._b({tag:"component",staticClass:"pagination-link",class:( _obj = { 'is-current': _vm.page.isCurrent }, _obj[_vm.page.class] = true, _obj ),attrs:{"role":"button","href":_vm.href,"disabled":_vm.isDisabled,"aria-label":_vm.page['aria-label'],"aria-current":_vm.page.isCurrent},on:{"click":function($event){$event.preventDefault();return _vm.page.click($event)}}},'component',_vm.$attrs,false),[_vm._t("default",[_vm._v(_vm._s(_vm.page.number))])],2)};
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

    var PaginationButton = __vue_component__$2;

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

  var script$1 = {
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

  /* script */
  const __vue_script__$1 = script$1;

  /* template */
  var __vue_render__$1 = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('span',{staticClass:"icon",class:[_vm.newType, _vm.size]},[(!_vm.useIconComponent)?_c('i',{class:[_vm.newPack, _vm.newIcon, _vm.newCustomSize, _vm.customClass]}):_c(_vm.useIconComponent,{tag:"component",class:[_vm.customClass],attrs:{"icon":[_vm.newPack, _vm.newIcon],"size":_vm.newCustomSize}})],1)};
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

    var Icon = __vue_component__$1;

  function debounce (func, wait, immediate) {
    var timeout;
    return function () {
      var context = this;
      var args = arguments;
      var later = function later() {
        timeout = null;
        if (!immediate) func.apply(context, args);
      };
      var callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) func.apply(context, args);
    };
  }

  var script = {
    name: 'BPagination',
    components: _defineProperty(_defineProperty({}, Icon.name, Icon), PaginationButton.name, PaginationButton),
    // deprecated, to replace with default 'value' in the next breaking change
    model: {
      prop: 'current',
      event: 'update:current'
    },
    props: {
      total: [Number, String],
      perPage: {
        type: [Number, String],
        default: 20
      },
      current: {
        type: [Number, String],
        default: 1
      },
      rangeBefore: {
        type: [Number, String],
        default: 1
      },
      rangeAfter: {
        type: [Number, String],
        default: 1
      },
      size: String,
      simple: Boolean,
      rounded: Boolean,
      order: String,
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
      ariaNextLabel: String,
      ariaPreviousLabel: String,
      ariaPageLabel: String,
      ariaCurrentLabel: String,
      pageInput: {
        type: Boolean,
        default: false
      },
      pageInputPosition: String,
      debouncePageInput: [Number, String]
    },
    data: function data() {
      return {
        inputValue: this.current
      };
    },
    computed: {
      rootClasses: function rootClasses() {
        return [this.order, this.size, this.pageInputPosition, {
          'is-simple': this.simple,
          'is-rounded': this.rounded,
          'has-input': this.pageInput
        }];
      },
      beforeCurrent: function beforeCurrent() {
        return parseInt(this.rangeBefore);
      },
      afterCurrent: function afterCurrent() {
        return parseInt(this.rangeAfter);
      },
      /**
      * Total page size (count).
      */
      pageCount: function pageCount() {
        return Math.ceil(this.total / this.perPage);
      },
      /**
      * First item of the page (count).
      */
      firstItem: function firstItem() {
        var firstItem = this.current * this.perPage - this.perPage + 1;
        return firstItem >= 0 ? firstItem : 0;
      },
      /**
      * Check if previous button is available.
      */
      hasPrev: function hasPrev() {
        return this.current > 1;
      },
      /**
       * Check if first page button should be visible.
      */
      hasFirst: function hasFirst() {
        return this.current >= 2 + this.beforeCurrent;
      },
      /**
      * Check if first ellipsis should be visible.
      */
      hasFirstEllipsis: function hasFirstEllipsis() {
        return this.current >= this.beforeCurrent + 4;
      },
      /**
      * Check if last page button should be visible.
      */
      hasLast: function hasLast() {
        return this.current <= this.pageCount - (1 + this.afterCurrent);
      },
      /**
      * Check if last ellipsis should be visible.
      */
      hasLastEllipsis: function hasLastEllipsis() {
        return this.current < this.pageCount - (2 + this.afterCurrent);
      },
      /**
      * Check if next button is available.
      */
      hasNext: function hasNext() {
        return this.current < this.pageCount;
      },
      /**
      * Get near pages, 1 before and 1 after the current.
      * Also add the click event to the array.
      */
      pagesInRange: function pagesInRange() {
        if (this.simple) return;
        var left = Math.max(1, this.current - this.beforeCurrent);
        if (left - 1 === 2) {
          left--; // Do not show the ellipsis if there is only one to hide
        }
        var right = Math.min(this.current + this.afterCurrent, this.pageCount);
        if (this.pageCount - right === 2) {
          right++; // Do not show the ellipsis if there is only one to hide
        }
        var pages = [];
        for (var i = left; i <= right; i++) {
          pages.push(this.getPage(i));
        }
        return pages;
      }
    },
    watch: {
      /**
      * If current page is trying to be greater than page count, set to last.
      */
      pageCount: function pageCount(value) {
        if (this.current > value) this.last();
      },
      current: function current(value) {
        this.inputValue = value;
      },
      debouncePageInput: {
        handler: function handler(value) {
          this.debounceHandlePageInput = debounce(this.handleOnInputPageChange, value);
        },
        immediate: true
      }
    },
    methods: {
      /**
      * Previous button click listener.
      */
      prev: function prev(event) {
        this.changePage(this.current - 1, event);
      },
      /**
       * Next button click listener.
      */
      next: function next(event) {
        this.changePage(this.current + 1, event);
      },
      /**
       * First button click listener.
      */
      first: function first(event) {
        this.changePage(1, event);
      },
      /**
      * Last button click listener.
      */
      last: function last(event) {
        this.changePage(this.pageCount, event);
      },
      changePage: function changePage(num, event) {
        if (this.current === num || num < 1 || num > this.pageCount) return;
        this.$emit('update:current', num);
        this.$emit('change', num);

        // Set focus on element to keep tab order
        if (event && event.target) {
          this.$nextTick(function () {
            return event.target.focus();
          });
        }
      },
      getPage: function getPage(num) {
        var _this = this;
        var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
        return {
          number: num,
          isCurrent: this.current === num,
          click: function click(event) {
            return _this.changePage(num, event);
          },
          input: function input(event, inputNum) {
            return _this.changePage(+inputNum, event);
          },
          disabled: options.disabled || false,
          class: options.class || '',
          'aria-label': options['aria-label'] || this.getAriaPageLabel(num, this.current === num)
        };
      },
      /**
      * Get text for aria-label according to page number.
      */
      getAriaPageLabel: function getAriaPageLabel(pageNumber, isCurrent) {
        if (this.ariaPageLabel && (!isCurrent || !this.ariaCurrentLabel)) {
          return this.ariaPageLabel + ' ' + pageNumber + '.';
        } else if (this.ariaPageLabel && isCurrent && this.ariaCurrentLabel) {
          return this.ariaCurrentLabel + ', ' + this.ariaPageLabel + ' ' + pageNumber + '.';
        }
        return null;
      },
      handleOnInputPageChange: function handleOnInputPageChange(event) {
        this.getPage(this.inputValue).input(event, this.inputValue);
      },
      handleOnInputDebounce: function handleOnInputDebounce(event) {
        if (this.debouncePageInput) {
          this.debounceHandlePageInput(event);
        } else {
          this.handleOnInputPageChange(event);
        }
      },
      handleOnKeyPress: function handleOnKeyPress(event) {
        // --- This is required to only allow numeric inputs for the page input - --- //
        // --- size attribute does not work with input type number. --- //
        var ASCIICode = event.which || event.keyCode;
        if (ASCIICode >= 48 && ASCIICode <= 57) {
          return true;
        } else {
          return event.preventDefault();
        }
      },
      handleAllowableInputPageRange: function handleAllowableInputPageRange(event) {
        if (+event.target.value > 0 && +event.target.value <= this.pageCount) {
          this.handleOnInputValue(event);
        } else {
          // --- It is nessacery to set inputValue to 1 and then to '' so that the DOM- --- //
          // --- will update the input component even when Backspace is used and then-
          // --- 0 us entered. --- //
          this.inputValue = 1;
          this.inputValue = '';
        }
      },
      handleOnInputValue: function handleOnInputValue(event) {
        var inputValue = +event.target.value;
        this.inputValue = inputValue;
        if (Number.isInteger(this.inputValue)) {
          this.handleOnInputDebounce(event);
        } else {
          // --- if NaN, then set inputValue back to current --- //
          this.inputValue = this.current;
        }
      }
    }
  };

  /* script */
  const __vue_script__ = script;

  /* template */
  var __vue_render__ = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('nav',{staticClass:"pagination",class:_vm.rootClasses},[(_vm.$scopedSlots.previous)?_vm._t("previous",[_c('b-icon',{attrs:{"icon":_vm.iconPrev,"pack":_vm.iconPack,"both":"","aria-hidden":"true"}})],{"page":_vm.getPage(_vm.current - 1, {
                  disabled: !_vm.hasPrev,
                  class: 'pagination-previous',
                  'aria-label': _vm.ariaPreviousLabel,
              })}):_c('BPaginationButton',{staticClass:"pagination-previous",attrs:{"disabled":!_vm.hasPrev,"page":_vm.getPage(_vm.current - 1),"aria-label":_vm.ariaPreviousLabel}},[_c('b-icon',{attrs:{"icon":_vm.iconPrev,"pack":_vm.iconPack,"both":"","aria-hidden":"true"}})],1),(_vm.$scopedSlots.next)?_vm._t("next",[_c('b-icon',{attrs:{"icon":_vm.iconNext,"pack":_vm.iconPack,"both":"","aria-hidden":"true"}})],{"page":_vm.getPage(_vm.current + 1, {
                  disabled: !_vm.hasNext,
                  class: 'pagination-next',
                  'aria-label': _vm.ariaNextLabel,
              })}):_c('BPaginationButton',{staticClass:"pagination-next",attrs:{"disabled":!_vm.hasNext,"page":_vm.getPage(_vm.current + 1),"aria-label":_vm.ariaNextLabel}},[_c('b-icon',{attrs:{"icon":_vm.iconNext,"pack":_vm.iconPack,"both":"","aria-hidden":"true"}})],1),_c('div',{staticClass:"control pagination-input"},[(_vm.pageInput)?_c('input',{staticClass:"input",attrs:{"size":_vm.pageCount.toString().length,"maxlength":_vm.pageCount.toString().length},domProps:{"value":_vm.inputValue},on:{"input":_vm.handleAllowableInputPageRange,"keypress":_vm.handleOnKeyPress}}):_vm._e()]),(_vm.simple)?_c('small',{staticClass:"info"},[(_vm.perPage == 1)?[_vm._v(" "+_vm._s(_vm.firstItem)+" / "+_vm._s(_vm.total)+" ")]:[_vm._v(" "+_vm._s(_vm.firstItem)+"-"+_vm._s(Math.min(_vm.current * _vm.perPage, _vm.total))+" / "+_vm._s(_vm.total)+" ")]],2):_c('ul',{staticClass:"pagination-list"},[(_vm.hasFirst)?_c('li',[(_vm.$scopedSlots.default)?_vm._t("default",null,{"page":_vm.getPage(1)}):_c('BPaginationButton',{attrs:{"page":_vm.getPage(1)}})],2):_vm._e(),(_vm.hasFirstEllipsis)?_c('li',[_c('span',{staticClass:"pagination-ellipsis"},[_vm._v("…")])]):_vm._e(),_vm._l((_vm.pagesInRange),function(page){return _c('li',{key:page.number},[(_vm.$scopedSlots.default)?_vm._t("default",null,{"page":page}):_c('BPaginationButton',{attrs:{"page":page}})],2)}),(_vm.hasLastEllipsis)?_c('li',[_c('span',{staticClass:"pagination-ellipsis"},[_vm._v("…")])]):_vm._e(),(_vm.hasLast)?_c('li',[(_vm.$scopedSlots.default)?_vm._t("default",null,{"page":_vm.getPage(_vm.pageCount)}):_c('BPaginationButton',{attrs:{"page":_vm.getPage(_vm.pageCount)}})],2):_vm._e()],2)],2)};
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

    var Pagination = __vue_component__;

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
      registerComponent(Vue, Pagination);
      registerComponent(Vue, PaginationButton);
    }
  };
  use(Plugin);

  exports.BPagination = Pagination;
  exports.BPaginationButton = PaginationButton;
  exports["default"] = Plugin;

  Object.defineProperty(exports, '__esModule', { value: true });

}));
