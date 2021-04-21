/*! Buefy v0.9.7 | MIT License | github.com/buefy/buefy */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = global || self, factory(global.Buefy = {}));
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

  function _toConsumableArray(arr) {
    return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread();
  }

  function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) {
      for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

      return arr2;
    }
  }

  function _arrayWithHoles(arr) {
    if (Array.isArray(arr)) return arr;
  }

  function _iterableToArray(iter) {
    if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter);
  }

  function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance");
  }

  function _nonIterableRest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance");
  }

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
   * Get value of an object property/path even if it's nested
   */

  function getValueByPath(obj, path) {
    return path.split('.').reduce(function (o, i) {
      return o ? o[i] : null;
    }, obj);
  }
  /**
   * Extension of indexOf method by equality function if specified
   */

  function indexOf(array, obj, fn) {
    if (!array) return -1;
    if (!fn || typeof fn !== 'function') return array.indexOf(obj);

    for (var i = 0; i < array.length; i++) {
      if (fn(array[i], obj)) {
        return i;
      }
    }

    return -1;
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
  /**
   * Mobile detection
   * https://www.abeautifulsite.net/detecting-mobile-devices-with-javascript
   */

  var isMobile = {
    Android: function Android() {
      return typeof window !== 'undefined' && window.navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function BlackBerry() {
      return typeof window !== 'undefined' && window.navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function iOS() {
      return typeof window !== 'undefined' && window.navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function Opera() {
      return typeof window !== 'undefined' && window.navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function Windows() {
      return typeof window !== 'undefined' && window.navigator.userAgent.match(/IEMobile/i);
    },
    any: function any() {
      return isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows();
    }
  };
  function removeElement(el) {
    if (typeof el.remove !== 'undefined') {
      el.remove();
    } else if (typeof el.parentNode !== 'undefined' && el.parentNode !== null) {
      el.parentNode.removeChild(el);
    }
  }
  function createAbsoluteElement(el) {
    var root = document.createElement('div');
    root.style.position = 'absolute';
    root.style.left = '0px';
    root.style.top = '0px';
    root.style.width = '100%';
    var wrapper = document.createElement('div');
    root.appendChild(wrapper);
    wrapper.appendChild(el);
    document.body.appendChild(root);
    return root;
  }
  function isVueComponent(c) {
    return c && c._isVue;
  }
  /**
   * Escape regex characters
   * http://stackoverflow.com/a/6969486
   */

  function escapeRegExpChars(value) {
    if (!value) return value; // eslint-disable-next-line

    return value.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, '\\$&');
  }
  function multiColumnSort(inputArray, sortingPriority) {
    // clone it to prevent the any watchers from triggering every sorting iteration
    var array = JSON.parse(JSON.stringify(inputArray));

    var fieldSorter = function fieldSorter(fields) {
      return function (a, b) {
        return fields.map(function (o) {
          var dir = 1;

          if (o[0] === '-') {
            dir = -1;
            o = o.substring(1);
          }

          var aValue = getValueByPath(a, o);
          var bValue = getValueByPath(b, o);
          return aValue > bValue ? dir : aValue < bValue ? -dir : 0;
        }).reduce(function (p, n) {
          return p || n;
        }, 0);
      };
    };

    return array.sort(fieldSorter(sortingPriority));
  }
  function createNewEvent(eventName) {
    var event;

    if (typeof Event === 'function') {
      event = new Event(eventName);
    } else {
      event = document.createEvent('Event');
      event.initEvent(eventName, true, true);
    }

    return event;
  }
  function toCssWidth(width) {
    return width === undefined ? null : isNaN(width) ? width : width + 'px';
  }
  /**
   * Return month names according to a specified locale
   * @param  {String} locale A bcp47 localerouter. undefined will use the user browser locale
   * @param  {String} format long (ex. March), short (ex. Mar) or narrow (M)
   * @return {Array<String>} An array of month names
   */

  function getMonthNames() {
    var locale = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : undefined;
    var format = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'long';
    var dates = [];

    for (var i = 0; i < 12; i++) {
      dates.push(new Date(2000, i, 15));
    }

    var dtf = new Intl.DateTimeFormat(locale, {
      month: format,
      timeZone: 'UTC'
    });
    return dates.map(function (d) {
      return dtf.format(d);
    });
  }
  /**
   * Return weekday names according to a specified locale
   * @param  {String} locale A bcp47 localerouter. undefined will use the user browser locale
   * @param  {String} format long (ex. Thursday), short (ex. Thu) or narrow (T)
   * @return {Array<String>} An array of weekday names
   */

  function getWeekdayNames() {
    var locale = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : undefined;
    var format = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'narrow';
    var dates = [];

    for (var i = 0; i < 7; i++) {
      var dt = new Date(2000, 0, i + 1);
      dates[dt.getDay()] = dt;
    }

    var dtf = new Intl.DateTimeFormat(locale, {
      weekday: format
    });
    return dates.map(function (d) {
      return dtf.format(d);
    });
  }
  /**
   * Accept a regex with group names and return an object
   * ex. matchWithGroups(/((?!=<year>)\d+)\/((?!=<month>)\d+)\/((?!=<day>)\d+)/, '2000/12/25')
   * will return { year: 2000, month: 12, day: 25 }
   * @param  {String} includes injections of (?!={groupname}) for each group
   * @param  {String} the string to run regex
   * @return {Object} an object with a property for each group having the group's match as the value
   */

  function matchWithGroups(pattern, str) {
    var matches = str.match(pattern);
    return pattern // get the pattern as a string
    .toString() // suss out the groups
    .match(/<(.+?)>/g) // remove the braces
    .map(function (group) {
      var groupMatches = group.match(/<(.+)>/);

      if (!groupMatches || groupMatches.length <= 0) {
        return null;
      }

      return group.match(/<(.+)>/)[1];
    }) // create an object with a property for each group having the group's match as the value
    .reduce(function (acc, curr, index, arr) {
      if (matches && matches.length > index) {
        acc[curr] = matches[index + 1];
      } else {
        acc[curr] = null;
      }

      return acc;
    }, {});
  }
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
  function isCustomElement(vm) {
    return 'shadowRoot' in vm.$root.$options;
  }
  var isDefined = function isDefined(d) {
    return d !== undefined;
  };

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
  var setOptions = function setOptions(options) {
    config = options;
  };
  var setVueInstance = function setVueInstance(Vue) {
    VueInstance = Vue;
  };
  var VueInstance;

  var FormElementMixin = {
    props: {
      size: String,
      expanded: Boolean,
      loading: Boolean,
      rounded: Boolean,
      icon: String,
      iconPack: String,
      // Native options to use in HTML5 validation
      autocomplete: String,
      maxlength: [Number, String],
      useHtml5Validation: {
        type: Boolean,
        default: function _default() {
          return config.defaultUseHtml5Validation;
        }
      },
      validationMessage: String,
      locale: {
        type: [String, Array],
        default: function _default() {
          return config.defaultLocale;
        }
      },
      statusIcon: {
        type: Boolean,
        default: function _default() {
          return config.defaultStatusIcon;
        }
      }
    },
    data: function data() {
      return {
        isValid: true,
        isFocused: false,
        newIconPack: this.iconPack || config.defaultIconPack
      };
    },
    computed: {
      /**
       * Find parent Field, max 3 levels deep.
       */
      parentField: function parentField() {
        var parent = this.$parent;

        for (var i = 0; i < 3; i++) {
          if (parent && !parent.$data._isField) {
            parent = parent.$parent;
          }
        }

        return parent;
      },

      /**
       * Get the type prop from parent if it's a Field.
       */
      statusType: function statusType() {
        var _ref = this.parentField || {},
            newType = _ref.newType;

        if (!newType) return;

        if (typeof newType === 'string') {
          return newType;
        } else {
          for (var key in newType) {
            if (newType[key]) {
              return key;
            }
          }
        }
      },

      /**
       * Get the message prop from parent if it's a Field.
       */
      statusMessage: function statusMessage() {
        if (!this.parentField) return;
        return this.parentField.newMessage || this.parentField.$slots.message;
      },

      /**
       * Fix icon size for inputs, large was too big
       */
      iconSize: function iconSize() {
        switch (this.size) {
          case 'is-small':
            return this.size;

          case 'is-medium':
            return;

          case 'is-large':
            return this.newIconPack === 'mdi' ? 'is-medium' : '';
        }
      }
    },
    methods: {
      /**
       * Focus method that work dynamically depending on the component.
       */
      focus: function focus() {
        var el = this.getElement();
        if (el === undefined) return;
        this.$nextTick(function () {
          if (el) el.focus();
        });
      },
      onBlur: function onBlur($event) {
        this.isFocused = false;
        this.$emit('blur', $event);
        this.checkHtml5Validity();
      },
      onFocus: function onFocus($event) {
        this.isFocused = true;
        this.$emit('focus', $event);
      },
      getElement: function getElement() {
        var el = this.$refs[this.$data._elementRef];

        while (isVueComponent(el)) {
          el = el.$refs[el.$data._elementRef];
        }

        return el;
      },
      setInvalid: function setInvalid() {
        var type = 'is-danger';
        var message = this.validationMessage || this.getElement().validationMessage;
        this.setValidity(type, message);
      },
      setValidity: function setValidity(type, message) {
        var _this = this;

        this.$nextTick(function () {
          if (_this.parentField) {
            // Set type only if not defined
            if (!_this.parentField.type) {
              _this.parentField.newType = type;
            } // Set message only if not defined


            if (!_this.parentField.message) {
              _this.parentField.newMessage = message;
            }
          }
        });
      },

      /**
       * Check HTML5 validation, set isValid property.
       * If validation fail, send 'is-danger' type,
       * and error message to parent if it's a Field.
       */
      checkHtml5Validity: function checkHtml5Validity() {
        if (!this.useHtml5Validation) return;
        var el = this.getElement();
        if (el === undefined) return;

        if (!el.checkValidity()) {
          this.setInvalid();
          this.isValid = false;
        } else {
          this.setValidity(null, null);
          this.isValid = true;
        }

        return this.isValid;
      }
    }
  };

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

  var script$1 = {
    name: 'BInput',
    components: _defineProperty({}, Icon.name, Icon),
    mixins: [FormElementMixin],
    inheritAttrs: false,
    props: {
      value: [Number, String],
      type: {
        type: String,
        default: 'text'
      },
      lazy: {
        type: Boolean,
        default: false
      },
      passwordReveal: Boolean,
      iconClickable: Boolean,
      hasCounter: {
        type: Boolean,
        default: function _default() {
          return config.defaultInputHasCounter;
        }
      },
      customClass: {
        type: String,
        default: ''
      },
      iconRight: String,
      iconRightClickable: Boolean,
      iconRightType: String
    },
    data: function data() {
      return {
        newValue: this.value,
        newType: this.type,
        newAutocomplete: this.autocomplete || config.defaultInputAutocomplete,
        isPasswordVisible: false,
        _elementRef: this.type === 'textarea' ? 'textarea' : 'input'
      };
    },
    computed: {
      computedValue: {
        get: function get() {
          return this.newValue;
        },
        set: function set(value) {
          this.newValue = value;
          this.$emit('input', value);
        }
      },
      rootClasses: function rootClasses() {
        return [this.iconPosition, this.size, {
          'is-expanded': this.expanded,
          'is-loading': this.loading,
          'is-clearfix': !this.hasMessage
        }];
      },
      inputClasses: function inputClasses() {
        return [this.statusType, this.size, {
          'is-rounded': this.rounded
        }];
      },
      hasIconRight: function hasIconRight() {
        return this.passwordReveal || this.loading || this.statusIcon && this.statusTypeIcon || this.iconRight;
      },
      rightIcon: function rightIcon() {
        if (this.passwordReveal) {
          return this.passwordVisibleIcon;
        } else if (this.iconRight) {
          return this.iconRight;
        }

        return this.statusTypeIcon;
      },
      rightIconType: function rightIconType() {
        if (this.passwordReveal) {
          return 'is-primary';
        } else if (this.iconRight) {
          return this.iconRightType || null;
        }

        return this.statusType;
      },

      /**
      * Position of the icon or if it's both sides.
      */
      iconPosition: function iconPosition() {
        var iconClasses = '';

        if (this.icon) {
          iconClasses += 'has-icons-left ';
        }

        if (this.hasIconRight) {
          iconClasses += 'has-icons-right';
        }

        return iconClasses;
      },

      /**
      * Icon name (MDI) based on the type.
      */
      statusTypeIcon: function statusTypeIcon() {
        switch (this.statusType) {
          case 'is-success':
            return 'check';

          case 'is-danger':
            return 'alert-circle';

          case 'is-info':
            return 'information';

          case 'is-warning':
            return 'alert';
        }
      },

      /**
      * Check if have any message prop from parent if it's a Field.
      */
      hasMessage: function hasMessage() {
        return !!this.statusMessage;
      },

      /**
      * Current password-reveal icon name.
      */
      passwordVisibleIcon: function passwordVisibleIcon() {
        return !this.isPasswordVisible ? 'eye' : 'eye-off';
      },

      /**
      * Get value length
      */
      valueLength: function valueLength() {
        if (typeof this.computedValue === 'string') {
          return this.computedValue.length;
        } else if (typeof this.computedValue === 'number') {
          return this.computedValue.toString().length;
        }

        return 0;
      }
    },
    watch: {
      /**
      * When v-model is changed:
      *   1. Set internal value.
      */
      value: function value(_value) {
        this.newValue = _value;
      }
    },
    methods: {
      /**
      * Toggle the visibility of a password-reveal input
      * by changing the type and focus the input right away.
      */
      togglePasswordVisibility: function togglePasswordVisibility() {
        var _this = this;

        this.isPasswordVisible = !this.isPasswordVisible;
        this.newType = this.isPasswordVisible ? 'text' : 'password';
        this.$nextTick(function () {
          _this.focus();
        });
      },
      iconClick: function iconClick(emit, event) {
        var _this2 = this;

        this.$emit(emit, event);
        this.$nextTick(function () {
          _this2.focus();
        });
      },
      rightIconClick: function rightIconClick(event) {
        if (this.passwordReveal) {
          this.togglePasswordVisibility();
        } else if (this.iconRightClickable) {
          this.iconClick('icon-right-click', event);
        }
      },
      onInput: function onInput(event) {
        if (!this.lazy) {
          var value = event.target.value;
          this.updateValue(value);
        }
      },
      onChange: function onChange(event) {
        if (this.lazy) {
          var value = event.target.value;
          this.updateValue(value);
        }
      },
      updateValue: function updateValue(value) {
        this.computedValue = value;
        !this.isValid && this.checkHtml5Validity();
      }
    }
  };

  /* script */
  const __vue_script__$1 = script$1;

  /* template */
  var __vue_render__$1 = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"control",class:_vm.rootClasses},[(_vm.type !== 'textarea')?_c('input',_vm._b({ref:"input",staticClass:"input",class:[_vm.inputClasses, _vm.customClass],attrs:{"type":_vm.newType,"autocomplete":_vm.newAutocomplete,"maxlength":_vm.maxlength},domProps:{"value":_vm.computedValue},on:{"input":_vm.onInput,"change":_vm.onChange,"blur":_vm.onBlur,"focus":_vm.onFocus}},'input',_vm.$attrs,false)):_c('textarea',_vm._b({ref:"textarea",staticClass:"textarea",class:[_vm.inputClasses, _vm.customClass],attrs:{"maxlength":_vm.maxlength},domProps:{"value":_vm.computedValue},on:{"input":_vm.onInput,"change":_vm.onChange,"blur":_vm.onBlur,"focus":_vm.onFocus}},'textarea',_vm.$attrs,false)),(_vm.icon)?_c('b-icon',{staticClass:"is-left",class:{'is-clickable': _vm.iconClickable},attrs:{"icon":_vm.icon,"pack":_vm.iconPack,"size":_vm.iconSize},nativeOn:{"click":function($event){return _vm.iconClick('icon-click', $event)}}}):_vm._e(),(!_vm.loading && _vm.hasIconRight)?_c('b-icon',{staticClass:"is-right",class:{ 'is-clickable': _vm.passwordReveal || _vm.iconRightClickable },attrs:{"icon":_vm.rightIcon,"pack":_vm.iconPack,"size":_vm.iconSize,"type":_vm.rightIconType,"both":""},nativeOn:{"click":function($event){return _vm.rightIconClick($event)}}}):_vm._e(),(_vm.maxlength && _vm.hasCounter && _vm.type !== 'number')?_c('small',{staticClass:"help counter",class:{ 'is-invisible': !_vm.isFocused }},[_vm._v(" "+_vm._s(_vm.valueLength)+" / "+_vm._s(_vm.maxlength)+" ")]):_vm._e()],1)};
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
    

    
    var Input = normalizeComponent_1(
      { render: __vue_render__$1, staticRenderFns: __vue_staticRenderFns__$1 },
      __vue_inject_styles__$1,
      __vue_script__$1,
      __vue_scope_id__$1,
      __vue_is_functional_template__$1,
      __vue_module_identifier__$1,
      undefined,
      undefined
    );

  var script$2 = {
    name: 'BAutocomplete',
    components: _defineProperty({}, Input.name, Input),
    mixins: [FormElementMixin],
    inheritAttrs: false,
    props: {
      value: [Number, String],
      data: {
        type: Array,
        default: function _default() {
          return [];
        }
      },
      field: {
        type: String,
        default: 'value'
      },
      keepFirst: Boolean,
      clearOnSelect: Boolean,
      openOnFocus: Boolean,
      customFormatter: Function,
      checkInfiniteScroll: Boolean,
      keepOpen: Boolean,
      clearable: Boolean,
      maxHeight: [String, Number],
      dropdownPosition: {
        type: String,
        default: 'auto'
      },
      groupField: String,
      groupOptions: String,
      iconRight: String,
      iconRightClickable: Boolean,
      appendToBody: Boolean,
      confirmKeys: {
        type: Array,
        default: function _default() {
          return ['Tab', 'Enter'];
        }
      }
    },
    data: function data() {
      return {
        selected: null,
        hovered: null,
        isActive: false,
        newValue: this.value,
        newAutocomplete: this.autocomplete || 'off',
        isListInViewportVertically: true,
        hasFocus: false,
        style: {},
        _isAutocomplete: true,
        _elementRef: 'input',
        _bodyEl: undefined // Used to append to body

      };
    },
    computed: {
      computedData: function computedData() {
        var _this = this;

        if (this.groupField) {
          if (this.groupOptions) {
            var newData = [];
            this.data.forEach(function (option) {
              var group = getValueByPath(option, _this.groupField);
              var items = getValueByPath(option, _this.groupOptions);
              newData.push({
                group: group,
                items: items
              });
            });
            return newData;
          } else {
            var tmp = {};
            this.data.forEach(function (option) {
              var group = getValueByPath(option, _this.groupField);
              if (!tmp[group]) tmp[group] = [];
              tmp[group].push(option);
            });
            var _newData = [];
            Object.keys(tmp).forEach(function (group) {
              _newData.push({
                group: group,
                items: tmp[group]
              });
            });
            return _newData;
          }
        }

        return [{
          items: this.data
        }];
      },
      isEmpty: function isEmpty() {
        if (!this.computedData) return true;
        return !this.computedData.some(function (element) {
          return element.items && element.items.length;
        });
      },

      /**
       * White-listed items to not close when clicked.
       * Add input, dropdown and all children.
       */
      whiteList: function whiteList() {
        var whiteList = [];
        whiteList.push(this.$refs.input.$el.querySelector('input'));
        whiteList.push(this.$refs.dropdown); // Add all children from dropdown

        if (this.$refs.dropdown !== undefined) {
          var children = this.$refs.dropdown.querySelectorAll('*');
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

        if (this.$parent.$data._isTaginput) {
          // Add taginput container
          whiteList.push(this.$parent.$el); // Add .tag and .delete

          var tagInputChildren = this.$parent.$el.querySelectorAll('*');
          var _iteratorNormalCompletion2 = true;
          var _didIteratorError2 = false;
          var _iteratorError2 = undefined;

          try {
            for (var _iterator2 = tagInputChildren[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
              var tagInputChild = _step2.value;
              whiteList.push(tagInputChild);
            }
          } catch (err) {
            _didIteratorError2 = true;
            _iteratorError2 = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion2 && _iterator2.return != null) {
                _iterator2.return();
              }
            } finally {
              if (_didIteratorError2) {
                throw _iteratorError2;
              }
            }
          }
        }

        return whiteList;
      },

      /**
       * Check if exists default slot
       */
      hasDefaultSlot: function hasDefaultSlot() {
        return !!this.$scopedSlots.default;
      },

      /**
       * Check if exists group slot
       */
      hasGroupSlot: function hasGroupSlot() {
        return !!this.$scopedSlots.group;
      },

      /**
       * Check if exists "empty" slot
       */
      hasEmptySlot: function hasEmptySlot() {
        return !!this.$slots.empty;
      },

      /**
       * Check if exists "header" slot
       */
      hasHeaderSlot: function hasHeaderSlot() {
        return !!this.$slots.header;
      },

      /**
       * Check if exists "footer" slot
       */
      hasFooterSlot: function hasFooterSlot() {
        return !!this.$slots.footer;
      },

      /**
       * Apply dropdownPosition property
       */
      isOpenedTop: function isOpenedTop() {
        return this.dropdownPosition === 'top' || this.dropdownPosition === 'auto' && !this.isListInViewportVertically;
      },
      newIconRight: function newIconRight() {
        if (this.clearable && this.newValue) {
          return 'close-circle';
        }

        return this.iconRight;
      },
      newIconRightClickable: function newIconRightClickable() {
        if (this.clearable) {
          return true;
        }

        return this.iconRightClickable;
      },
      contentStyle: function contentStyle() {
        return {
          maxHeight: toCssWidth(this.maxHeight)
        };
      }
    },
    watch: {
      /**
       * When dropdown is toggled, check the visibility to know when
       * to open upwards.
       */
      isActive: function isActive(active) {
        var _this2 = this;

        if (this.dropdownPosition === 'auto') {
          if (active) {
            this.calcDropdownInViewportVertical();
          } else {
            // Timeout to wait for the animation to finish before recalculating
            setTimeout(function () {
              _this2.calcDropdownInViewportVertical();
            }, 100);
          }
        }
      },

      /**
       * When updating input's value
       *   1. Emit changes
       *   2. If value isn't the same as selected, set null
       *   3. Close dropdown if value is clear or else open it
       */
      newValue: function newValue(value) {
        this.$emit('input', value); // Check if selected is invalid

        var currentValue = this.getValue(this.selected);

        if (currentValue && currentValue !== value) {
          this.setSelected(null, false);
        } // Close dropdown if input is clear or else open it


        if (this.hasFocus && (!this.openOnFocus || value)) {
          this.isActive = !!value;
        }
      },

      /**
       * When v-model is changed:
       *   1. Update internal value.
       *   2. If it's invalid, validate again.
       */
      value: function value(_value) {
        this.newValue = _value;
      },

      /**
       * Select first option if "keep-first
       */
      data: function data() {
        var _this3 = this;

        // Keep first option always pre-selected
        if (this.keepFirst) {
          this.$nextTick(function () {
            if (_this3.isActive) {
              _this3.selectFirstOption(_this3.computedData);
            }
          });
        }
      }
    },
    methods: {
      /**
       * Set which option is currently hovered.
       */
      setHovered: function setHovered(option) {
        if (option === undefined) return;
        this.hovered = option;
      },

      /**
       * Set which option is currently selected, update v-model,
       * update input value and close dropdown.
       */
      setSelected: function setSelected(option) {
        var _this4 = this;

        var closeDropdown = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
        var event = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : undefined;
        if (option === undefined) return;
        this.selected = option;
        this.$emit('select', this.selected, event);

        if (this.selected !== null) {
          this.newValue = this.clearOnSelect ? '' : this.getValue(this.selected);
          this.setHovered(null);
        }

        closeDropdown && this.$nextTick(function () {
          _this4.isActive = false;
        });
        this.checkValidity();
      },

      /**
       * Select first option
       */
      selectFirstOption: function selectFirstOption(element) {
        var _this5 = this;

        this.$nextTick(function () {
          if (element.length) {
            // If has visible data or open on focus, keep updating the hovered
            var option = element[0].items[0];

            if (_this5.openOnFocus || _this5.newValue !== '' && _this5.hovered !== option) {
              _this5.setHovered(option);
            }
          } else {
            _this5.setHovered(null);
          }
        });
      },
      keydown: function keydown(event) {
        var key = event.key; // cannot destructure preventDefault (https://stackoverflow.com/a/49616808/2774496)
        // prevent emit submit event

        if (key === 'Enter') event.preventDefault(); // Close dropdown on Tab & no hovered

        this.isActive = key !== 'Tab';
        if (this.hovered === null) return;

        if (this.confirmKeys.indexOf(key) >= 0) {
          // If adding by comma, don't add the comma to the input
          if (key === ',') event.preventDefault(); // Close dropdown on select by Tab

          var closeDropdown = !this.keepOpen || key === 'Tab';
          this.setSelected(this.hovered, closeDropdown, event);
        }
      },

      /**
       * Close dropdown if clicked outside.
       */
      clickedOutside: function clickedOutside(event) {
        var target = isCustomElement(this) ? event.composedPath()[0] : event.target;

        if (!this.hasFocus && this.whiteList.indexOf(target) < 0) {
          if (this.keepFirst && this.hovered) {
            this.setSelected(this.hovered, true);
          } else {
            this.isActive = false;
          }
        }
      },

      /**
       * Return display text for the input.
       * If object, get value from path, or else just the value.
       */
      getValue: function getValue(option) {
        if (option === null) return;

        if (typeof this.customFormatter !== 'undefined') {
          return this.customFormatter(option);
        }

        return _typeof(option) === 'object' ? getValueByPath(option, this.field) : option;
      },

      /**
       * Check if the scroll list inside the dropdown
       * reached it's end.
       */
      checkIfReachedTheEndOfScroll: function checkIfReachedTheEndOfScroll(list) {
        if (list.clientHeight !== list.scrollHeight && list.scrollTop + list.clientHeight >= list.scrollHeight) {
          this.$emit('infinite-scroll');
        }
      },

      /**
       * Calculate if the dropdown is vertically visible when activated,
       * otherwise it is openened upwards.
       */
      calcDropdownInViewportVertical: function calcDropdownInViewportVertical() {
        var _this6 = this;

        this.$nextTick(function () {
          /**
           * this.$refs.dropdown may be undefined
           * when Autocomplete is conditional rendered
           */
          if (_this6.$refs.dropdown === undefined) return;

          var rect = _this6.$refs.dropdown.getBoundingClientRect();

          _this6.isListInViewportVertically = rect.top >= 0 && rect.bottom <= (window.innerHeight || document.documentElement.clientHeight);

          if (_this6.appendToBody) {
            _this6.updateAppendToBody();
          }
        });
      },

      /**
       * Arrows keys listener.
       * If dropdown is active, set hovered option, or else just open.
       */
      keyArrows: function keyArrows(direction) {
        var sum = direction === 'down' ? 1 : -1;

        if (this.isActive) {
          var data = this.computedData.map(function (d) {
            return d.items;
          }).reduce(function (a, b) {
            return [].concat(_toConsumableArray(a), _toConsumableArray(b));
          }, []);
          var index = data.indexOf(this.hovered) + sum;
          index = index > data.length - 1 ? data.length - 1 : index;
          index = index < 0 ? 0 : index;
          this.setHovered(data[index]);
          var list = this.$refs.dropdown.querySelector('.dropdown-content');
          var element = list.querySelectorAll('a.dropdown-item:not(.is-disabled)')[index];
          if (!element) return;
          var visMin = list.scrollTop;
          var visMax = list.scrollTop + list.clientHeight - element.clientHeight;

          if (element.offsetTop < visMin) {
            list.scrollTop = element.offsetTop;
          } else if (element.offsetTop >= visMax) {
            list.scrollTop = element.offsetTop - list.clientHeight + element.clientHeight;
          }
        } else {
          this.isActive = true;
        }
      },

      /**
       * Focus listener.
       * If value is the same as selected, select all text.
       */
      focused: function focused(event) {
        if (this.getValue(this.selected) === this.newValue) {
          this.$el.querySelector('input').select();
        }

        if (this.openOnFocus) {
          this.isActive = true;

          if (this.keepFirst) {
            this.selectFirstOption(this.computedData);
          }
        }

        this.hasFocus = true;
        this.$emit('focus', event);
      },

      /**
       * Blur listener.
       */
      onBlur: function onBlur(event) {
        this.hasFocus = false;
        this.$emit('blur', event);
      },
      onInput: function onInput(event) {
        var currentValue = this.getValue(this.selected);
        if (currentValue && currentValue === this.newValue) return;
        this.$emit('typing', this.newValue);
        this.checkValidity();
      },
      rightIconClick: function rightIconClick(event) {
        if (this.clearable) {
          this.newValue = '';
          this.setSelected(null, false);

          if (this.openOnFocus) {
            this.$refs.input.$el.focus();
          }
        } else {
          this.$emit('icon-right-click', event);
        }
      },
      checkValidity: function checkValidity() {
        var _this7 = this;

        if (this.useHtml5Validation) {
          this.$nextTick(function () {
            _this7.checkHtml5Validity();
          });
        }
      },
      updateAppendToBody: function updateAppendToBody() {
        var dropdownMenu = this.$refs.dropdown;
        var trigger = this.$refs.input.$el;

        if (dropdownMenu && trigger) {
          // update wrapper dropdown
          var root = this.$data._bodyEl;
          root.classList.forEach(function (item) {
            return root.classList.remove(item);
          });
          root.classList.add('autocomplete');
          root.classList.add('control');

          if (this.expandend) {
            root.classList.add('is-expandend');
          }

          var rect = trigger.getBoundingClientRect();
          var top = rect.top + window.scrollY;
          var left = rect.left + window.scrollX;

          if (!this.isOpenedTop) {
            top += trigger.clientHeight;
          } else {
            top -= dropdownMenu.clientHeight;
          }

          this.style = {
            position: 'absolute',
            top: "".concat(top, "px"),
            left: "".concat(left, "px"),
            width: "".concat(trigger.clientWidth, "px"),
            maxWidth: "".concat(trigger.clientWidth, "px"),
            zIndex: '99'
          };
        }
      }
    },
    created: function created() {
      if (typeof window !== 'undefined') {
        document.addEventListener('click', this.clickedOutside);

        if (this.dropdownPosition === 'auto') {
          window.addEventListener('resize', this.calcDropdownInViewportVertical);
        }
      }
    },
    mounted: function mounted() {
      var _this8 = this;

      if (this.checkInfiniteScroll && this.$refs.dropdown && this.$refs.dropdown.querySelector('.dropdown-content')) {
        var list = this.$refs.dropdown.querySelector('.dropdown-content');
        list.addEventListener('scroll', function () {
          return _this8.checkIfReachedTheEndOfScroll(list);
        });
      }

      if (this.appendToBody) {
        this.$data._bodyEl = createAbsoluteElement(this.$refs.dropdown);
        this.updateAppendToBody();
      }
    },
    beforeDestroy: function beforeDestroy() {
      if (typeof window !== 'undefined') {
        document.removeEventListener('click', this.clickedOutside);

        if (this.dropdownPosition === 'auto') {
          window.removeEventListener('resize', this.calcDropdownInViewportVertical);
        }
      }

      if (this.checkInfiniteScroll && this.$refs.dropdown && this.$refs.dropdown.querySelector('.dropdown-content')) {
        var list = this.$refs.dropdown.querySelector('.dropdown-content');
        list.removeEventListener('scroll', this.checkIfReachedTheEndOfScroll);
      }

      if (this.appendToBody) {
        removeElement(this.$data._bodyEl);
      }
    }
  };

  /* script */
  const __vue_script__$2 = script$2;

  /* template */
  var __vue_render__$2 = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"autocomplete control",class:{ 'is-expanded': _vm.expanded }},[_c('b-input',_vm._b({ref:"input",attrs:{"type":"text","size":_vm.size,"loading":_vm.loading,"rounded":_vm.rounded,"icon":_vm.icon,"icon-right":_vm.newIconRight,"icon-right-clickable":_vm.newIconRightClickable,"icon-pack":_vm.iconPack,"maxlength":_vm.maxlength,"autocomplete":_vm.newAutocomplete,"use-html5-validation":false},on:{"input":_vm.onInput,"focus":_vm.focused,"blur":_vm.onBlur,"icon-right-click":_vm.rightIconClick,"icon-click":function (event) { return _vm.$emit('icon-click', event); }},nativeOn:{"keyup":function($event){if(!$event.type.indexOf('key')&&_vm._k($event.keyCode,"esc",27,$event.key,["Esc","Escape"])){ return null; }$event.preventDefault();_vm.isActive = false;},"keydown":[function($event){return _vm.keydown($event)},function($event){if(!$event.type.indexOf('key')&&_vm._k($event.keyCode,"up",38,$event.key,["Up","ArrowUp"])){ return null; }$event.preventDefault();return _vm.keyArrows('up')},function($event){if(!$event.type.indexOf('key')&&_vm._k($event.keyCode,"down",40,$event.key,["Down","ArrowDown"])){ return null; }$event.preventDefault();return _vm.keyArrows('down')}]},model:{value:(_vm.newValue),callback:function ($$v) {_vm.newValue=$$v;},expression:"newValue"}},'b-input',_vm.$attrs,false)),_c('transition',{attrs:{"name":"fade"}},[_c('div',{directives:[{name:"show",rawName:"v-show",value:(_vm.isActive && (!_vm.isEmpty || _vm.hasEmptySlot || _vm.hasHeaderSlot)),expression:"isActive && (!isEmpty || hasEmptySlot || hasHeaderSlot)"}],ref:"dropdown",staticClass:"dropdown-menu",class:{ 'is-opened-top': _vm.isOpenedTop && !_vm.appendToBody },style:(_vm.style)},[_c('div',{directives:[{name:"show",rawName:"v-show",value:(_vm.isActive),expression:"isActive"}],staticClass:"dropdown-content",style:(_vm.contentStyle)},[(_vm.hasHeaderSlot)?_c('div',{staticClass:"dropdown-item"},[_vm._t("header")],2):_vm._e(),_vm._l((_vm.computedData),function(element,groupindex){return [(element.group)?_c('div',{key:groupindex + 'group',staticClass:"dropdown-item"},[(_vm.hasGroupSlot)?_vm._t("group",null,{"group":element.group,"index":groupindex}):_c('span',{staticClass:"has-text-weight-bold"},[_vm._v(" "+_vm._s(element.group)+" ")])],2):_vm._e(),_vm._l((element.items),function(option,index){return _c('a',{key:groupindex + ':' + index,staticClass:"dropdown-item",class:{ 'is-hovered': option === _vm.hovered },on:{"click":function($event){return _vm.setSelected(option, undefined, $event)}}},[(_vm.hasDefaultSlot)?_vm._t("default",null,{"option":option,"index":index}):_c('span',[_vm._v(" "+_vm._s(_vm.getValue(option, true))+" ")])],2)})]}),(_vm.isEmpty && _vm.hasEmptySlot)?_c('div',{staticClass:"dropdown-item is-disabled"},[_vm._t("empty")],2):_vm._e(),(_vm.hasFooterSlot)?_c('div',{staticClass:"dropdown-item"},[_vm._t("footer")],2):_vm._e()],2)])])],1)};
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
    

    
    var Autocomplete = normalizeComponent_1(
      { render: __vue_render__$2, staticRenderFns: __vue_staticRenderFns__$2 },
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
  var registerComponentProgrammatic = function registerComponentProgrammatic(Vue, property, component) {
    if (!Vue.prototype.$buefy) Vue.prototype.$buefy = {};
    Vue.prototype.$buefy[property] = component;
  };

  var Plugin = {
    install: function install(Vue) {
      registerComponent(Vue, Autocomplete);
    }
  };
  use(Plugin);

  var script$3 = {
    name: 'BButton',
    components: _defineProperty({}, Icon.name, Icon),
    inheritAttrs: false,
    props: {
      type: [String, Object],
      size: String,
      label: String,
      iconPack: String,
      iconLeft: String,
      iconRight: String,
      rounded: {
        type: Boolean,
        default: function _default() {
          return config.defaultButtonRounded;
        }
      },
      loading: Boolean,
      outlined: Boolean,
      expanded: Boolean,
      inverted: Boolean,
      focused: Boolean,
      active: Boolean,
      hovered: Boolean,
      selected: Boolean,
      nativeType: {
        type: String,
        default: 'button',
        validator: function validator(value) {
          return ['button', 'submit', 'reset'].indexOf(value) >= 0;
        }
      },
      tag: {
        type: String,
        default: 'button',
        validator: function validator(value) {
          return config.defaultLinkTags.indexOf(value) >= 0;
        }
      }
    },
    computed: {
      computedTag: function computedTag() {
        if (this.$attrs.disabled !== undefined && this.$attrs.disabled !== false) {
          return 'button';
        }

        return this.tag;
      },
      iconSize: function iconSize() {
        if (!this.size || this.size === 'is-medium') {
          return 'is-small';
        } else if (this.size === 'is-large') {
          return 'is-medium';
        }

        return this.size;
      }
    }
  };

  /* script */
  const __vue_script__$3 = script$3;

  /* template */
  var __vue_render__$3 = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c(_vm.computedTag,_vm._g(_vm._b({tag:"component",staticClass:"button",class:[_vm.size, _vm.type, {
          'is-rounded': _vm.rounded,
          'is-loading': _vm.loading,
          'is-outlined': _vm.outlined,
          'is-fullwidth': _vm.expanded,
          'is-inverted': _vm.inverted,
          'is-focused': _vm.focused,
          'is-active': _vm.active,
          'is-hovered': _vm.hovered,
          'is-selected': _vm.selected
      }],attrs:{"type":_vm.nativeType}},'component',_vm.$attrs,false),_vm.$listeners),[(_vm.iconLeft)?_c('b-icon',{attrs:{"pack":_vm.iconPack,"icon":_vm.iconLeft,"size":_vm.iconSize}}):_vm._e(),(_vm.label)?_c('span',[_vm._v(_vm._s(_vm.label))]):(_vm.$slots.default)?_c('span',[_vm._t("default")],2):_vm._e(),(_vm.iconRight)?_c('b-icon',{attrs:{"pack":_vm.iconPack,"icon":_vm.iconRight,"size":_vm.iconSize}}):_vm._e()],1)};
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
    

    
    var Button = normalizeComponent_1(
      { render: __vue_render__$3, staticRenderFns: __vue_staticRenderFns__$3 },
      __vue_inject_styles__$3,
      __vue_script__$3,
      __vue_scope_id__$3,
      __vue_is_functional_template__$3,
      __vue_module_identifier__$3,
      undefined,
      undefined
    );

  var Plugin$1 = {
    install: function install(Vue) {
      registerComponent(Vue, Button);
    }
  };
  use(Plugin$1);

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

  var script$4 = {
    name: 'BCarousel',
    components: _defineProperty({}, Icon.name, Icon),
    mixins: [ProviderParentMixin('carousel', Sorted)],
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
        this.transition = direction > 0 ? 'prev' : 'next'; // Transition names are reversed from the actual direction for correct effect

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
  const __vue_script__$4 = script$4;

  /* template */
  var __vue_render__$4 = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"carousel",class:{'is-overlay': _vm.overlay},on:{"mouseenter":_vm.checkPause,"mouseleave":_vm.startTimer}},[(_vm.progress)?_c('progress',{staticClass:"progress",class:_vm.progressType,attrs:{"max":_vm.childItems.length - 1},domProps:{"value":_vm.activeChild}},[_vm._v(" "+_vm._s(_vm.childItems.length - 1)+" ")]):_vm._e(),_c('div',{staticClass:"carousel-items",on:{"mousedown":_vm.dragStart,"mouseup":_vm.dragEnd,"touchstart":function($event){$event.stopPropagation();return _vm.dragStart($event)},"touchend":function($event){$event.stopPropagation();return _vm.dragEnd($event)}}},[_vm._t("default"),(_vm.arrow)?_c('div',{staticClass:"carousel-arrow",class:{'is-hovered': _vm.arrowHover}},[_c('b-icon',{directives:[{name:"show",rawName:"v-show",value:(_vm.hasPrev),expression:"hasPrev"}],staticClass:"has-icons-left",attrs:{"pack":_vm.iconPack,"icon":_vm.iconPrev,"size":_vm.iconSize,"both":""},nativeOn:{"click":function($event){return _vm.prev($event)}}}),_c('b-icon',{directives:[{name:"show",rawName:"v-show",value:(_vm.hasNext),expression:"hasNext"}],staticClass:"has-icons-right",attrs:{"pack":_vm.iconPack,"icon":_vm.iconNext,"size":_vm.iconSize,"both":""},nativeOn:{"click":function($event){return _vm.next($event)}}})],1):_vm._e()],2),(_vm.autoplay && _vm.pauseHover && _vm.pauseInfo && _vm.isPause)?_c('div',{staticClass:"carousel-pause"},[_c('span',{staticClass:"tag",class:_vm.pauseInfoType},[_vm._v(" "+_vm._s(_vm.pauseText)+" ")])]):_vm._e(),(_vm.withCarouselList && !_vm.indicator)?[_vm._t("list",null,{"active":_vm.activeChild,"switch":_vm.changeActive})]:_vm._e(),(_vm.indicator)?_c('div',{staticClass:"carousel-indicator",class:_vm.indicatorClasses},_vm._l((_vm.sortedItems),function(item,index){return _c('a',{key:item._uid,staticClass:"indicator-item",class:{'is-active': item.isActive},on:{"mouseover":function($event){return _vm.modeChange('hover', index)},"click":function($event){return _vm.modeChange('click', index)}}},[_vm._t("indicators",[_c('span',{staticClass:"indicator-style",class:_vm.indicatorStyle})],{"i":index})],2)}),0):_vm._e(),(_vm.overlay)?[_vm._t("overlay")]:_vm._e()],2)};
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
    

    
    var Carousel = normalizeComponent_1(
      { render: __vue_render__$4, staticRenderFns: __vue_staticRenderFns__$4 },
      __vue_inject_styles__$4,
      __vue_script__$4,
      __vue_scope_id__$4,
      __vue_is_functional_template__$4,
      __vue_module_identifier__$4,
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

  //
  var script$5 = {
    name: 'BCarouselItem',
    mixins: [InjectedChildMixin('carousel', Sorted$1)],
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
  const __vue_script__$5 = script$5;

  /* template */
  var __vue_render__$5 = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('transition',{attrs:{"name":_vm.transition}},[_c('div',{directives:[{name:"show",rawName:"v-show",value:(_vm.isActive),expression:"isActive"}],staticClass:"carousel-item"},[_vm._t("default")],2)])};
  var __vue_staticRenderFns__$5 = [];

    /* style */
    const __vue_inject_styles__$5 = undefined;
    /* scoped */
    const __vue_scope_id__$5 = undefined;
    /* module identifier */
    const __vue_module_identifier__$5 = undefined;
    /* functional template */
    const __vue_is_functional_template__$5 = false;
    /* style inject */
    
    /* style inject SSR */
    

    
    var CarouselItem = normalizeComponent_1(
      { render: __vue_render__$5, staticRenderFns: __vue_staticRenderFns__$5 },
      __vue_inject_styles__$5,
      __vue_script__$5,
      __vue_scope_id__$5,
      __vue_is_functional_template__$5,
      __vue_module_identifier__$5,
      undefined,
      undefined
    );

  var script$6 = {
    name: 'BCarouselList',
    components: _defineProperty({}, Icon.name, Icon),
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
          return _objectSpread2({}, this.$props, {}, this.breakpoints[breakpoint]);
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
        event.preventDefault(); // Make the item appear in the middle

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
  const __vue_script__$6 = script$6;

  /* template */
  var __vue_render__$6 = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"carousel-list",class:{'has-shadow': _vm.scrollIndex > 0},on:{"mousedown":function($event){$event.preventDefault();return _vm.dragStart($event)},"touchstart":_vm.dragStart}},[_c('div',{staticClass:"carousel-slides",class:_vm.listClass,style:('transform:translateX('+_vm.translation+'px)')},_vm._l((_vm.data),function(list,index){return _c('div',{key:index,staticClass:"carousel-slide",class:{'is-active': _vm.asIndicator ? _vm.activeItem === index : _vm.scrollIndex === index},style:(_vm.itemStyle),on:{"mouseup":function($event){return _vm.checkAsIndicator(index, $event)},"touchend":function($event){return _vm.checkAsIndicator(index, $event)}}},[_vm._t("item",[_c('b-image',_vm._b({attrs:{"src":list.image}},'b-image',list,false))],{"index":index,"active":_vm.activeItem,"scroll":_vm.scrollIndex,"list":list},list)],2)}),0),(_vm.arrow)?_c('div',{staticClass:"carousel-arrow",class:{'is-hovered': _vm.settings.arrowHover}},[_c('b-icon',{directives:[{name:"show",rawName:"v-show",value:(_vm.hasPrev),expression:"hasPrev"}],staticClass:"has-icons-left",attrs:{"pack":_vm.settings.iconPack,"icon":_vm.settings.iconPrev,"size":_vm.settings.iconSize,"both":""},nativeOn:{"click":function($event){$event.preventDefault();return _vm.prev($event)}}}),_c('b-icon',{directives:[{name:"show",rawName:"v-show",value:(_vm.hasNext),expression:"hasNext"}],staticClass:"has-icons-right",attrs:{"pack":_vm.settings.iconPack,"icon":_vm.settings.iconNext,"size":_vm.settings.iconSize,"both":""},nativeOn:{"click":function($event){$event.preventDefault();return _vm.next($event)}}})],1):_vm._e()])};
  var __vue_staticRenderFns__$6 = [];

    /* style */
    const __vue_inject_styles__$6 = undefined;
    /* scoped */
    const __vue_scope_id__$6 = undefined;
    /* module identifier */
    const __vue_module_identifier__$6 = undefined;
    /* functional template */
    const __vue_is_functional_template__$6 = false;
    /* style inject */
    
    /* style inject SSR */
    

    
    var CarouselList = normalizeComponent_1(
      { render: __vue_render__$6, staticRenderFns: __vue_staticRenderFns__$6 },
      __vue_inject_styles__$6,
      __vue_script__$6,
      __vue_scope_id__$6,
      __vue_is_functional_template__$6,
      __vue_module_identifier__$6,
      undefined,
      undefined
    );

  var Plugin$2 = {
    install: function install(Vue) {
      registerComponent(Vue, Carousel);
      registerComponent(Vue, CarouselItem);
      registerComponent(Vue, CarouselList);
    }
  };
  use(Plugin$2);

  var CheckRadioMixin = {
    props: {
      value: [String, Number, Boolean, Function, Object, Array],
      nativeValue: [String, Number, Boolean, Function, Object, Array],
      type: String,
      disabled: Boolean,
      required: Boolean,
      name: String,
      size: String
    },
    data: function data() {
      return {
        newValue: this.value
      };
    },
    computed: {
      computedValue: {
        get: function get() {
          return this.newValue;
        },
        set: function set(value) {
          this.newValue = value;
          this.$emit('input', value);
        }
      }
    },
    watch: {
      /**
      * When v-model change, set internal value.
      */
      value: function value(_value) {
        this.newValue = _value;
      }
    },
    methods: {
      focus: function focus() {
        // MacOS FireFox and Safari do not focus when clicked
        this.$refs.input.focus();
      }
    }
  };

  //
  var script$7 = {
    name: 'BCheckbox',
    mixins: [CheckRadioMixin],
    props: {
      indeterminate: Boolean,
      trueValue: {
        type: [String, Number, Boolean, Function, Object, Array],
        default: true
      },
      falseValue: {
        type: [String, Number, Boolean, Function, Object, Array],
        default: false
      }
    }
  };

  /* script */
  const __vue_script__$7 = script$7;

  /* template */
  var __vue_render__$7 = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('label',{ref:"label",staticClass:"b-checkbox checkbox",class:[_vm.size, { 'is-disabled': _vm.disabled }],attrs:{"disabled":_vm.disabled},on:{"click":_vm.focus,"keydown":function($event){if(!$event.type.indexOf('key')&&_vm._k($event.keyCode,"enter",13,$event.key,"Enter")){ return null; }$event.preventDefault();return _vm.$refs.label.click()}}},[_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.computedValue),expression:"computedValue"}],ref:"input",attrs:{"type":"checkbox","disabled":_vm.disabled,"required":_vm.required,"name":_vm.name,"true-value":_vm.trueValue,"false-value":_vm.falseValue},domProps:{"indeterminate":_vm.indeterminate,"value":_vm.nativeValue,"checked":Array.isArray(_vm.computedValue)?_vm._i(_vm.computedValue,_vm.nativeValue)>-1:_vm._q(_vm.computedValue,_vm.trueValue)},on:{"click":function($event){$event.stopPropagation();},"change":function($event){var $$a=_vm.computedValue,$$el=$event.target,$$c=$$el.checked?(_vm.trueValue):(_vm.falseValue);if(Array.isArray($$a)){var $$v=_vm.nativeValue,$$i=_vm._i($$a,$$v);if($$el.checked){$$i<0&&(_vm.computedValue=$$a.concat([$$v]));}else{$$i>-1&&(_vm.computedValue=$$a.slice(0,$$i).concat($$a.slice($$i+1)));}}else{_vm.computedValue=$$c;}}}}),_c('span',{staticClass:"check",class:_vm.type}),_c('span',{staticClass:"control-label"},[_vm._t("default")],2)])};
  var __vue_staticRenderFns__$7 = [];

    /* style */
    const __vue_inject_styles__$7 = undefined;
    /* scoped */
    const __vue_scope_id__$7 = undefined;
    /* module identifier */
    const __vue_module_identifier__$7 = undefined;
    /* functional template */
    const __vue_is_functional_template__$7 = false;
    /* style inject */
    
    /* style inject SSR */
    

    
    var Checkbox = normalizeComponent_1(
      { render: __vue_render__$7, staticRenderFns: __vue_staticRenderFns__$7 },
      __vue_inject_styles__$7,
      __vue_script__$7,
      __vue_scope_id__$7,
      __vue_is_functional_template__$7,
      __vue_module_identifier__$7,
      undefined,
      undefined
    );

  //
  var script$8 = {
    name: 'BCheckboxButton',
    mixins: [CheckRadioMixin],
    props: {
      type: {
        type: String,
        default: 'is-primary'
      },
      expanded: Boolean
    },
    data: function data() {
      return {
        isFocused: false
      };
    },
    computed: {
      checked: function checked() {
        if (Array.isArray(this.newValue)) {
          return this.newValue.indexOf(this.nativeValue) >= 0;
        }

        return this.newValue === this.nativeValue;
      }
    }
  };

  /* script */
  const __vue_script__$8 = script$8;

  /* template */
  var __vue_render__$8 = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"control",class:{ 'is-expanded': _vm.expanded }},[_c('label',{ref:"label",staticClass:"b-checkbox checkbox button",class:[_vm.checked ? _vm.type : null, _vm.size, {
              'is-disabled': _vm.disabled,
              'is-focused': _vm.isFocused
          }],attrs:{"disabled":_vm.disabled},on:{"click":_vm.focus,"keydown":function($event){if(!$event.type.indexOf('key')&&_vm._k($event.keyCode,"enter",13,$event.key,"Enter")){ return null; }$event.preventDefault();return _vm.$refs.label.click()}}},[_vm._t("default"),_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.computedValue),expression:"computedValue"}],ref:"input",attrs:{"type":"checkbox","disabled":_vm.disabled,"required":_vm.required,"name":_vm.name},domProps:{"value":_vm.nativeValue,"checked":Array.isArray(_vm.computedValue)?_vm._i(_vm.computedValue,_vm.nativeValue)>-1:(_vm.computedValue)},on:{"click":function($event){$event.stopPropagation();},"focus":function($event){_vm.isFocused = true;},"blur":function($event){_vm.isFocused = false;},"change":function($event){var $$a=_vm.computedValue,$$el=$event.target,$$c=$$el.checked?(true):(false);if(Array.isArray($$a)){var $$v=_vm.nativeValue,$$i=_vm._i($$a,$$v);if($$el.checked){$$i<0&&(_vm.computedValue=$$a.concat([$$v]));}else{$$i>-1&&(_vm.computedValue=$$a.slice(0,$$i).concat($$a.slice($$i+1)));}}else{_vm.computedValue=$$c;}}}})],2)])};
  var __vue_staticRenderFns__$8 = [];

    /* style */
    const __vue_inject_styles__$8 = undefined;
    /* scoped */
    const __vue_scope_id__$8 = undefined;
    /* module identifier */
    const __vue_module_identifier__$8 = undefined;
    /* functional template */
    const __vue_is_functional_template__$8 = false;
    /* style inject */
    
    /* style inject SSR */
    

    
    var CheckboxButton = normalizeComponent_1(
      { render: __vue_render__$8, staticRenderFns: __vue_staticRenderFns__$8 },
      __vue_inject_styles__$8,
      __vue_script__$8,
      __vue_scope_id__$8,
      __vue_is_functional_template__$8,
      __vue_module_identifier__$8,
      undefined,
      undefined
    );

  var Plugin$3 = {
    install: function install(Vue) {
      registerComponent(Vue, Checkbox);
      registerComponent(Vue, CheckboxButton);
    }
  };
  use(Plugin$3);

  var script$9 = {
    name: 'BCollapse',
    // deprecated, to replace with default 'value' in the next breaking change
    model: {
      prop: 'open',
      event: 'update:open'
    },
    props: {
      open: {
        type: Boolean,
        default: true
      },
      animation: {
        type: String,
        default: 'fade'
      },
      ariaId: {
        type: String,
        default: ''
      },
      position: {
        type: String,
        default: 'is-top',
        validator: function validator(value) {
          return ['is-top', 'is-bottom'].indexOf(value) > -1;
        }
      }
    },
    data: function data() {
      return {
        isOpen: this.open
      };
    },
    watch: {
      open: function open(value) {
        this.isOpen = value;
      }
    },
    methods: {
      /**
      * Toggle and emit events
      */
      toggle: function toggle() {
        this.isOpen = !this.isOpen;
        this.$emit('update:open', this.isOpen);
        this.$emit(this.isOpen ? 'open' : 'close');
      }
    },
    render: function render(createElement) {
      var trigger = createElement('div', {
        staticClass: 'collapse-trigger',
        on: {
          click: this.toggle
        }
      }, this.$scopedSlots.trigger ? [this.$scopedSlots.trigger({
        open: this.isOpen
      })] : [this.$slots.trigger]);
      var content = createElement('transition', {
        props: {
          name: this.animation
        }
      }, [createElement('div', {
        staticClass: 'collapse-content',
        attrs: {
          'id': this.ariaId,
          'aria-expanded': this.isOpen
        },
        directives: [{
          name: 'show',
          value: this.isOpen
        }]
      }, this.$slots.default)]);
      return createElement('div', {
        staticClass: 'collapse'
      }, this.position === 'is-top' ? [trigger, content] : [content, trigger]);
    }
  };

  /* script */
  const __vue_script__$9 = script$9;

  /* template */

    /* style */
    const __vue_inject_styles__$9 = undefined;
    /* scoped */
    const __vue_scope_id__$9 = undefined;
    /* module identifier */
    const __vue_module_identifier__$9 = undefined;
    /* functional template */
    const __vue_is_functional_template__$9 = undefined;
    /* style inject */
    
    /* style inject SSR */
    

    
    var Collapse = normalizeComponent_1(
      {},
      __vue_inject_styles__$9,
      __vue_script__$9,
      __vue_scope_id__$9,
      __vue_is_functional_template__$9,
      __vue_module_identifier__$9,
      undefined,
      undefined
    );

  var Plugin$4 = {
    install: function install(Vue) {
      registerComponent(Vue, Collapse);
    }
  };
  use(Plugin$4);

  var AM = 'AM';
  var PM = 'PM';
  var HOUR_FORMAT_24 = '24';
  var HOUR_FORMAT_12 = '12';

  var defaultTimeFormatter = function defaultTimeFormatter(date, vm) {
    return vm.dtf.format(date);
  };

  var defaultTimeParser = function defaultTimeParser(timeString, vm) {
    if (timeString) {
      var d = null;

      if (vm.computedValue && !isNaN(vm.computedValue)) {
        d = new Date(vm.computedValue);
      } else {
        d = vm.timeCreator();
        d.setMilliseconds(0);
      }

      if (vm.dtf.formatToParts && typeof vm.dtf.formatToParts === 'function') {
        var formatRegex = vm.dtf.formatToParts(d).map(function (part) {
          if (part.type === 'literal') {
            return part.value.replace(/ /g, '\\s?');
          } else if (part.type === 'dayPeriod') {
            return "((?!=<".concat(part.type, ">)(").concat(vm.amString, "|").concat(vm.pmString, "|").concat(AM, "|").concat(PM, "|").concat(AM.toLowerCase(), "|").concat(PM.toLowerCase(), ")?)");
          }

          return "((?!=<".concat(part.type, ">)\\d+)");
        }).join('');
        var timeGroups = matchWithGroups(formatRegex, timeString); // We do a simple validation for the group.
        // If it is not valid, it will fallback to Date.parse below

        timeGroups.hour = timeGroups.hour ? parseInt(timeGroups.hour, 10) : null;
        timeGroups.minute = timeGroups.minute ? parseInt(timeGroups.minute, 10) : null;
        timeGroups.second = timeGroups.second ? parseInt(timeGroups.second, 10) : null;

        if (timeGroups.hour && timeGroups.hour >= 0 && timeGroups.hour < 24 && timeGroups.minute && timeGroups.minute >= 0 && timeGroups.minute < 59) {
          if (timeGroups.dayPeriod && (timeGroups.dayPeriod.toLowerCase() === vm.pmString.toLowerCase() || timeGroups.dayPeriod.toLowerCase() === PM.toLowerCase()) && timeGroups.hour < 12) {
            timeGroups.hour += 12;
          }

          d.setHours(timeGroups.hour);
          d.setMinutes(timeGroups.minute);
          d.setSeconds(timeGroups.second || 0);
          return d;
        }
      } // Fallback if formatToParts is not supported or if we were not able to parse a valid date


      var am = false;

      if (vm.hourFormat === HOUR_FORMAT_12) {
        var dateString12 = timeString.split(' ');
        timeString = dateString12[0];
        am = dateString12[1] === vm.amString || dateString12[1] === AM;
      }

      var time = timeString.split(':');
      var hours = parseInt(time[0], 10);
      var minutes = parseInt(time[1], 10);
      var seconds = vm.enableSeconds ? parseInt(time[2], 10) : 0;

      if (isNaN(hours) || hours < 0 || hours > 23 || vm.hourFormat === HOUR_FORMAT_12 && (hours < 1 || hours > 12) || isNaN(minutes) || minutes < 0 || minutes > 59) {
        return null;
      }

      d.setSeconds(seconds);
      d.setMinutes(minutes);

      if (vm.hourFormat === HOUR_FORMAT_12) {
        if (am && hours === 12) {
          hours = 0;
        } else if (!am && hours !== 12) {
          hours += 12;
        }
      }

      d.setHours(hours);
      return new Date(d.getTime());
    }

    return null;
  };

  var TimepickerMixin = {
    mixins: [FormElementMixin],
    inheritAttrs: false,
    props: {
      value: Date,
      inline: Boolean,
      minTime: Date,
      maxTime: Date,
      placeholder: String,
      editable: Boolean,
      disabled: Boolean,
      hourFormat: {
        type: String,
        validator: function validator(value) {
          return value === HOUR_FORMAT_24 || value === HOUR_FORMAT_12;
        }
      },
      incrementHours: {
        type: Number,
        default: 1
      },
      incrementMinutes: {
        type: Number,
        default: 1
      },
      incrementSeconds: {
        type: Number,
        default: 1
      },
      timeFormatter: {
        type: Function,
        default: function _default(date, vm) {
          if (typeof config.defaultTimeFormatter === 'function') {
            return config.defaultTimeFormatter(date);
          } else {
            return defaultTimeFormatter(date, vm);
          }
        }
      },
      timeParser: {
        type: Function,
        default: function _default(date, vm) {
          if (typeof config.defaultTimeParser === 'function') {
            return config.defaultTimeParser(date);
          } else {
            return defaultTimeParser(date, vm);
          }
        }
      },
      mobileNative: {
        type: Boolean,
        default: function _default() {
          return config.defaultTimepickerMobileNative;
        }
      },
      timeCreator: {
        type: Function,
        default: function _default() {
          if (typeof config.defaultTimeCreator === 'function') {
            return config.defaultTimeCreator();
          } else {
            return new Date();
          }
        }
      },
      position: String,
      unselectableTimes: Array,
      openOnFocus: Boolean,
      enableSeconds: Boolean,
      defaultMinutes: Number,
      defaultSeconds: Number,
      focusable: {
        type: Boolean,
        default: true
      },
      tzOffset: {
        type: Number,
        default: 0
      },
      appendToBody: Boolean,
      resetOnMeridianChange: {
        type: Boolean,
        default: false
      }
    },
    data: function data() {
      return {
        dateSelected: this.value,
        hoursSelected: null,
        minutesSelected: null,
        secondsSelected: null,
        meridienSelected: null,
        _elementRef: 'input',
        AM: AM,
        PM: PM,
        HOUR_FORMAT_24: HOUR_FORMAT_24,
        HOUR_FORMAT_12: HOUR_FORMAT_12
      };
    },
    computed: {
      computedValue: {
        get: function get() {
          return this.dateSelected;
        },
        set: function set(value) {
          this.dateSelected = value;
          this.$emit('input', this.dateSelected);
        }
      },
      localeOptions: function localeOptions() {
        return new Intl.DateTimeFormat(this.locale, {
          hour: 'numeric',
          minute: 'numeric',
          second: this.enableSeconds ? 'numeric' : undefined
        }).resolvedOptions();
      },
      dtf: function dtf() {
        return new Intl.DateTimeFormat(this.locale, {
          hour: this.localeOptions.hour || 'numeric',
          minute: this.localeOptions.minute || 'numeric',
          second: this.enableSeconds ? this.localeOptions.second || 'numeric' : undefined,
          hour12: !this.isHourFormat24
        });
      },
      newHourFormat: function newHourFormat() {
        return this.hourFormat || (this.localeOptions.hour12 ? HOUR_FORMAT_12 : HOUR_FORMAT_24);
      },
      sampleTime: function sampleTime() {
        var d = this.timeCreator();
        d.setHours(10);
        d.setSeconds(0);
        d.setMinutes(0);
        d.setMilliseconds(0);
        return d;
      },
      hourLiteral: function hourLiteral() {
        if (this.dtf.formatToParts && typeof this.dtf.formatToParts === 'function') {
          var d = this.sampleTime;
          var parts = this.dtf.formatToParts(d);
          var literal = parts.find(function (part, idx) {
            return idx > 0 && parts[idx - 1].type === 'hour';
          });

          if (literal) {
            return literal.value;
          }
        }

        return ':';
      },
      minuteLiteral: function minuteLiteral() {
        if (this.dtf.formatToParts && typeof this.dtf.formatToParts === 'function') {
          var d = this.sampleTime;
          var parts = this.dtf.formatToParts(d);
          var literal = parts.find(function (part, idx) {
            return idx > 0 && parts[idx - 1].type === 'minute';
          });

          if (literal) {
            return literal.value;
          }
        }

        return ':';
      },
      secondLiteral: function secondLiteral() {
        if (this.dtf.formatToParts && typeof this.dtf.formatToParts === 'function') {
          var d = this.sampleTime;
          var parts = this.dtf.formatToParts(d);
          var literal = parts.find(function (part, idx) {
            return idx > 0 && parts[idx - 1].type === 'second';
          });

          if (literal) {
            return literal.value;
          }
        }
      },
      amString: function amString() {
        if (this.dtf.formatToParts && typeof this.dtf.formatToParts === 'function') {
          var d = this.sampleTime;
          d.setHours(10);
          var dayPeriod = this.dtf.formatToParts(d).find(function (part) {
            return part.type === 'dayPeriod';
          });

          if (dayPeriod) {
            return dayPeriod.value;
          }
        }

        return this.AM;
      },
      pmString: function pmString() {
        if (this.dtf.formatToParts && typeof this.dtf.formatToParts === 'function') {
          var d = this.sampleTime;
          d.setHours(20);
          var dayPeriod = this.dtf.formatToParts(d).find(function (part) {
            return part.type === 'dayPeriod';
          });

          if (dayPeriod) {
            return dayPeriod.value;
          }
        }

        return this.PM;
      },
      hours: function hours() {
        if (!this.incrementHours || this.incrementHours < 1) throw new Error('Hour increment cannot be null or less than 1.');
        var hours = [];
        var numberOfHours = this.isHourFormat24 ? 24 : 12;

        for (var i = 0; i < numberOfHours; i += this.incrementHours) {
          var value = i;
          var label = value;

          if (!this.isHourFormat24) {
            value = i + 1;
            label = value;

            if (this.meridienSelected === this.amString || this.meridienSelected === this.AM) {
              if (value === 12) {
                value = 0;
              }
            } else if (this.meridienSelected === this.pmString || this.meridienSelected === this.PM) {
              if (value !== 12) {
                value += 12;
              }
            }
          }

          hours.push({
            label: this.formatNumber(label),
            value: value
          });
        }

        return hours;
      },
      minutes: function minutes() {
        if (!this.incrementMinutes || this.incrementMinutes < 1) throw new Error('Minute increment cannot be null or less than 1.');
        var minutes = [];

        for (var i = 0; i < 60; i += this.incrementMinutes) {
          minutes.push({
            label: this.formatNumber(i, true),
            value: i
          });
        }

        return minutes;
      },
      seconds: function seconds() {
        if (!this.incrementSeconds || this.incrementSeconds < 1) throw new Error('Second increment cannot be null or less than 1.');
        var seconds = [];

        for (var i = 0; i < 60; i += this.incrementSeconds) {
          seconds.push({
            label: this.formatNumber(i, true),
            value: i
          });
        }

        return seconds;
      },
      meridiens: function meridiens() {
        return [this.amString, this.pmString];
      },
      isMobile: function isMobile$1() {
        return this.mobileNative && isMobile.any();
      },
      isHourFormat24: function isHourFormat24() {
        return this.newHourFormat === HOUR_FORMAT_24;
      }
    },
    watch: {
      hourFormat: function hourFormat() {
        if (this.hoursSelected !== null) {
          this.meridienSelected = this.hoursSelected >= 12 ? this.pmString : this.amString;
        }
      },

      /**
       * When v-model is changed:
       *   1. Update internal value.
       *   2. If it's invalid, validate again.
       */
      value: {
        handler: function handler(value) {
          this.updateInternalState(value);
          !this.isValid && this.$refs.input.checkHtml5Validity();
        },
        immediate: true
      }
    },
    methods: {
      onMeridienChange: function onMeridienChange(value) {
        if (this.hoursSelected !== null && this.resetOnMeridianChange) {
          this.hoursSelected = null;
          this.minutesSelected = null;
          this.secondsSelected = null;
          this.computedValue = null;
        } else if (this.hoursSelected !== null) {
          if (value === this.pmString || value === PM) {
            this.hoursSelected += 12;
          } else if (value === this.amString || value === AM) {
            this.hoursSelected -= 12;
          }
        }

        this.updateDateSelected(this.hoursSelected, this.minutesSelected, this.enableSeconds ? this.secondsSelected : 0, value);
      },
      onHoursChange: function onHoursChange(value) {
        if (!this.minutesSelected && typeof this.defaultMinutes !== 'undefined') {
          this.minutesSelected = this.defaultMinutes;
        }

        if (!this.secondsSelected && typeof this.defaultSeconds !== 'undefined') {
          this.secondsSelected = this.defaultSeconds;
        }

        this.updateDateSelected(parseInt(value, 10), this.minutesSelected, this.enableSeconds ? this.secondsSelected : 0, this.meridienSelected);
      },
      onMinutesChange: function onMinutesChange(value) {
        if (!this.secondsSelected && this.defaultSeconds) {
          this.secondsSelected = this.defaultSeconds;
        }

        this.updateDateSelected(this.hoursSelected, parseInt(value, 10), this.enableSeconds ? this.secondsSelected : 0, this.meridienSelected);
      },
      onSecondsChange: function onSecondsChange(value) {
        this.updateDateSelected(this.hoursSelected, this.minutesSelected, parseInt(value, 10), this.meridienSelected);
      },
      updateDateSelected: function updateDateSelected(hours, minutes, seconds, meridiens) {
        if (hours != null && minutes != null && (!this.isHourFormat24 && meridiens !== null || this.isHourFormat24)) {
          var time = null;

          if (this.computedValue && !isNaN(this.computedValue)) {
            time = new Date(this.computedValue);
          } else {
            time = this.timeCreator();
            time.setMilliseconds(0);
          }

          time.setHours(hours);
          time.setMinutes(minutes);
          time.setSeconds(seconds);
          this.computedValue = new Date(time.getTime());
        }
      },
      updateInternalState: function updateInternalState(value) {
        if (value) {
          this.hoursSelected = value.getHours();
          this.minutesSelected = value.getMinutes();
          this.secondsSelected = value.getSeconds();
          this.meridienSelected = value.getHours() >= 12 ? this.pmString : this.amString;
        } else {
          this.hoursSelected = null;
          this.minutesSelected = null;
          this.secondsSelected = null;
          this.meridienSelected = this.amString;
        }

        this.dateSelected = value;
      },
      isHourDisabled: function isHourDisabled(hour) {
        var _this = this;

        var disabled = false;

        if (this.minTime) {
          var minHours = this.minTime.getHours();
          var noMinutesAvailable = this.minutes.every(function (minute) {
            return _this.isMinuteDisabledForHour(hour, minute.value);
          });
          disabled = hour < minHours || noMinutesAvailable;
        }

        if (this.maxTime) {
          if (!disabled) {
            var maxHours = this.maxTime.getHours();
            disabled = hour > maxHours;
          }
        }

        if (this.unselectableTimes) {
          if (!disabled) {
            var unselectable = this.unselectableTimes.filter(function (time) {
              if (_this.enableSeconds && _this.secondsSelected !== null) {
                return time.getHours() === hour && time.getMinutes() === _this.minutesSelected && time.getSeconds() === _this.secondsSelected;
              } else if (_this.minutesSelected !== null) {
                return time.getHours() === hour && time.getMinutes() === _this.minutesSelected;
              }

              return false;
            });

            if (unselectable.length > 0) {
              disabled = true;
            } else {
              disabled = this.minutes.every(function (minute) {
                return _this.unselectableTimes.filter(function (time) {
                  return time.getHours() === hour && time.getMinutes() === minute.value;
                }).length > 0;
              });
            }
          }
        }

        return disabled;
      },
      isMinuteDisabledForHour: function isMinuteDisabledForHour(hour, minute) {
        var disabled = false;

        if (this.minTime) {
          var minHours = this.minTime.getHours();
          var minMinutes = this.minTime.getMinutes();
          disabled = hour === minHours && minute < minMinutes;
        }

        if (this.maxTime) {
          if (!disabled) {
            var maxHours = this.maxTime.getHours();
            var maxMinutes = this.maxTime.getMinutes();
            disabled = hour === maxHours && minute > maxMinutes;
          }
        }

        return disabled;
      },
      isMinuteDisabled: function isMinuteDisabled(minute) {
        var _this2 = this;

        var disabled = false;

        if (this.hoursSelected !== null) {
          if (this.isHourDisabled(this.hoursSelected)) {
            disabled = true;
          } else {
            disabled = this.isMinuteDisabledForHour(this.hoursSelected, minute);
          }

          if (this.unselectableTimes) {
            if (!disabled) {
              var unselectable = this.unselectableTimes.filter(function (time) {
                if (_this2.enableSeconds && _this2.secondsSelected !== null) {
                  return time.getHours() === _this2.hoursSelected && time.getMinutes() === minute && time.getSeconds() === _this2.secondsSelected;
                } else {
                  return time.getHours() === _this2.hoursSelected && time.getMinutes() === minute;
                }
              });
              disabled = unselectable.length > 0;
            }
          }
        }

        return disabled;
      },
      isSecondDisabled: function isSecondDisabled(second) {
        var _this3 = this;

        var disabled = false;

        if (this.minutesSelected !== null) {
          if (this.isMinuteDisabled(this.minutesSelected)) {
            disabled = true;
          } else {
            if (this.minTime) {
              var minHours = this.minTime.getHours();
              var minMinutes = this.minTime.getMinutes();
              var minSeconds = this.minTime.getSeconds();
              disabled = this.hoursSelected === minHours && this.minutesSelected === minMinutes && second < minSeconds;
            }

            if (this.maxTime) {
              if (!disabled) {
                var maxHours = this.maxTime.getHours();
                var maxMinutes = this.maxTime.getMinutes();
                var maxSeconds = this.maxTime.getSeconds();
                disabled = this.hoursSelected === maxHours && this.minutesSelected === maxMinutes && second > maxSeconds;
              }
            }
          }

          if (this.unselectableTimes) {
            if (!disabled) {
              var unselectable = this.unselectableTimes.filter(function (time) {
                return time.getHours() === _this3.hoursSelected && time.getMinutes() === _this3.minutesSelected && time.getSeconds() === second;
              });
              disabled = unselectable.length > 0;
            }
          }
        }

        return disabled;
      },

      /*
       * Parse string into date
       */
      onChange: function onChange(value) {
        var date = this.timeParser(value, this);
        this.updateInternalState(date);

        if (date && !isNaN(date)) {
          this.computedValue = date;
        } else {
          // Force refresh input value when not valid date
          this.computedValue = null;
          this.$refs.input.newValue = this.computedValue;
        }
      },

      /*
       * Toggle timepicker
       */
      toggle: function toggle(active) {
        if (this.$refs.dropdown) {
          this.$refs.dropdown.isActive = typeof active === 'boolean' ? active : !this.$refs.dropdown.isActive;
        }
      },

      /*
       * Close timepicker
       */
      close: function close() {
        this.toggle(false);
      },

      /*
       * Call default onFocus method and show timepicker
       */
      handleOnFocus: function handleOnFocus() {
        this.onFocus();

        if (this.openOnFocus) {
          this.toggle(true);
        }
      },

      /*
       * Format date into string 'HH-MM-SS'
       */
      formatHHMMSS: function formatHHMMSS(value) {
        var date = new Date(value);

        if (value && !isNaN(date)) {
          var hours = date.getHours();
          var minutes = date.getMinutes();
          var seconds = date.getSeconds();
          return this.formatNumber(hours, true) + ':' + this.formatNumber(minutes, true) + ':' + this.formatNumber(seconds, true);
        }

        return '';
      },

      /*
       * Parse time from string
       */
      onChangeNativePicker: function onChangeNativePicker(event) {
        var date = event.target.value;

        if (date) {
          var time = null;

          if (this.computedValue && !isNaN(this.computedValue)) {
            time = new Date(this.computedValue);
          } else {
            time = new Date();
            time.setMilliseconds(0);
          }

          var t = date.split(':');
          time.setHours(parseInt(t[0], 10));
          time.setMinutes(parseInt(t[1], 10));
          time.setSeconds(t[2] ? parseInt(t[2], 10) : 0);
          this.computedValue = new Date(time.getTime());
        } else {
          this.computedValue = null;
        }
      },
      formatNumber: function formatNumber(value, prependZero) {
        return this.isHourFormat24 || prependZero ? this.pad(value) : value;
      },
      pad: function pad(value) {
        return (value < 10 ? '0' : '') + value;
      },

      /*
       * Format date into string
       */
      formatValue: function formatValue(date) {
        if (date && !isNaN(date)) {
          return this.timeFormatter(date, this);
        } else {
          return null;
        }
      },

      /**
       * Keypress event that is bound to the document.
       */
      keyPress: function keyPress(_ref) {
        var key = _ref.key;

        if (this.$refs.dropdown && this.$refs.dropdown.isActive && (key === 'Escape' || key === 'Esc')) {
          this.toggle(false);
        }
      },

      /**
       * Emit 'blur' event on dropdown is not active (closed)
       */
      onActiveChange: function onActiveChange(value) {
        if (!value) {
          this.onBlur();
        }
      }
    },
    created: function created() {
      if (typeof window !== 'undefined') {
        document.addEventListener('keyup', this.keyPress);
      }
    },
    beforeDestroy: function beforeDestroy() {
      if (typeof window !== 'undefined') {
        document.removeEventListener('keyup', this.keyPress);
      }
    }
  };

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

  var DEFAULT_CLOSE_OPTIONS = ['escape', 'outside'];
  var script$a = {
    name: 'BDropdown',
    directives: {
      trapFocus: directive
    },
    mixins: [ProviderParentMixin('dropdown')],
    props: {
      value: {
        type: [String, Number, Boolean, Object, Array, Function],
        default: null
      },
      disabled: Boolean,
      inline: Boolean,
      scrollable: Boolean,
      maxHeight: {
        type: [String, Number],
        default: 200
      },
      position: {
        type: String,
        validator: function validator(value) {
          return ['is-top-right', 'is-top-left', 'is-bottom-left', 'is-bottom-right'].indexOf(value) > -1;
        }
      },
      triggers: {
        type: Array,
        default: function _default() {
          return ['click'];
        }
      },
      mobileModal: {
        type: Boolean,
        default: function _default() {
          return config.defaultDropdownMobileModal;
        }
      },
      ariaRole: {
        type: String,
        validator: function validator(value) {
          return ['menu', 'list', 'dialog'].indexOf(value) > -1;
        },
        default: null
      },
      animation: {
        type: String,
        default: 'fade'
      },
      multiple: Boolean,
      trapFocus: {
        type: Boolean,
        default: function _default() {
          return config.defaultTrapFocus;
        }
      },
      closeOnClick: {
        type: Boolean,
        default: true
      },
      canClose: {
        type: [Array, Boolean],
        default: true
      },
      expanded: Boolean,
      appendToBody: Boolean,
      appendToBodyCopyParent: Boolean
    },
    data: function data() {
      return {
        selected: this.value,
        style: {},
        isActive: false,
        isHoverable: false,
        _bodyEl: undefined // Used to append to body

      };
    },
    computed: {
      rootClasses: function rootClasses() {
        return [this.position, {
          'is-disabled': this.disabled,
          'is-hoverable': this.hoverable,
          'is-inline': this.inline,
          'is-active': this.isActive || this.inline,
          'is-mobile-modal': this.isMobileModal,
          'is-expanded': this.expanded
        }];
      },
      isMobileModal: function isMobileModal() {
        return this.mobileModal && !this.inline;
      },
      cancelOptions: function cancelOptions() {
        return typeof this.canClose === 'boolean' ? this.canClose ? DEFAULT_CLOSE_OPTIONS : [] : this.canClose;
      },
      contentStyle: function contentStyle() {
        return {
          maxHeight: this.scrollable ? toCssWidth(this.maxHeight) : null,
          overflow: this.scrollable ? 'auto' : null
        };
      },
      hoverable: function hoverable() {
        return this.triggers.indexOf('hover') >= 0;
      }
    },
    watch: {
      /**
      * When v-model is changed set the new selected item.
      */
      value: function value(_value) {
        this.selected = _value;
      },

      /**
      * Emit event when isActive value is changed.
      */
      isActive: function isActive(value) {
        var _this = this;

        this.$emit('active-change', value);

        if (this.appendToBody) {
          this.$nextTick(function () {
            _this.updateAppendToBody();
          });
        }
      }
    },
    methods: {
      /**
       * Click listener from DropdownItem.
       *   1. Set new selected item.
       *   2. Emit input event to update the user v-model.
       *   3. Close the dropdown.
       */
      selectItem: function selectItem(value) {
        if (this.multiple) {
          if (this.selected) {
            if (this.selected.indexOf(value) === -1) {
              // Add value
              this.selected = [].concat(_toConsumableArray(this.selected), [value]);
            } else {
              // Remove value
              this.selected = this.selected.filter(function (val) {
                return val !== value;
              });
            }
          } else {
            this.selected = [value];
          }

          this.$emit('change', this.selected);
        } else {
          if (this.selected !== value) {
            this.selected = value;
            this.$emit('change', this.selected);
          }
        }

        this.$emit('input', this.selected);

        if (!this.multiple) {
          this.isActive = !this.closeOnClick;

          if (this.hoverable && this.closeOnClick) {
            this.isHoverable = false;
          }
        }
      },

      /**
      * White-listed items to not close when clicked.
      */
      isInWhiteList: function isInWhiteList(el) {
        if (el === this.$refs.dropdownMenu) return true;
        if (el === this.$refs.trigger) return true; // All chidren from dropdown

        if (this.$refs.dropdownMenu !== undefined) {
          var children = this.$refs.dropdownMenu.querySelectorAll('*');
          var _iteratorNormalCompletion = true;
          var _didIteratorError = false;
          var _iteratorError = undefined;

          try {
            for (var _iterator = children[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
              var child = _step.value;

              if (el === child) {
                return true;
              }
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
        } // All children from trigger


        if (this.$refs.trigger !== undefined) {
          var _children = this.$refs.trigger.querySelectorAll('*');

          var _iteratorNormalCompletion2 = true;
          var _didIteratorError2 = false;
          var _iteratorError2 = undefined;

          try {
            for (var _iterator2 = _children[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
              var _child = _step2.value;

              if (el === _child) {
                return true;
              }
            }
          } catch (err) {
            _didIteratorError2 = true;
            _iteratorError2 = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion2 && _iterator2.return != null) {
                _iterator2.return();
              }
            } finally {
              if (_didIteratorError2) {
                throw _iteratorError2;
              }
            }
          }
        }

        return false;
      },

      /**
      * Close dropdown if clicked outside.
      */
      clickedOutside: function clickedOutside(event) {
        if (this.cancelOptions.indexOf('outside') < 0) return;
        if (this.inline) return;
        var target = isCustomElement(this) ? event.composedPath()[0] : event.target;
        if (!this.isInWhiteList(target)) this.isActive = false;
      },

      /**
       * Keypress event that is bound to the document
       */
      keyPress: function keyPress(_ref) {
        var key = _ref.key;

        if (this.isActive && (key === 'Escape' || key === 'Esc')) {
          if (this.cancelOptions.indexOf('escape') < 0) return;
          this.isActive = false;
        }
      },
      onClick: function onClick() {
        if (this.triggers.indexOf('click') < 0) return;
        this.toggle();
      },
      onContextMenu: function onContextMenu() {
        if (this.triggers.indexOf('contextmenu') < 0) return;
        this.toggle();
      },
      onHover: function onHover() {
        if (this.triggers.indexOf('hover') < 0) return;
        this.isHoverable = true;
      },
      onFocus: function onFocus() {
        if (this.triggers.indexOf('focus') < 0) return;
        this.toggle();
      },

      /**
      * Toggle dropdown if it's not disabled.
      */
      toggle: function toggle() {
        var _this2 = this;

        if (this.disabled) return;

        if (!this.isActive) {
          // if not active, toggle after clickOutside event
          // this fixes toggling programmatic
          this.$nextTick(function () {
            var value = !_this2.isActive;
            _this2.isActive = value; // Vue 2.6.x ???

            setTimeout(function () {
              return _this2.isActive = value;
            });
          });
        } else {
          this.isActive = !this.isActive;
        }
      },
      updateAppendToBody: function updateAppendToBody() {
        var dropdown = this.$refs.dropdown;
        var dropdownMenu = this.$refs.dropdownMenu;
        var trigger = this.$refs.trigger;

        if (dropdownMenu && trigger) {
          // update wrapper dropdown
          var dropdownWrapper = this.$data._bodyEl.children[0];
          dropdownWrapper.classList.forEach(function (item) {
            return dropdownWrapper.classList.remove(item);
          });
          dropdownWrapper.classList.add('dropdown');
          dropdownWrapper.classList.add('dropdown-menu-animation');

          if (this.$vnode && this.$vnode.data && this.$vnode.data.staticClass) {
            dropdownWrapper.classList.add(this.$vnode.data.staticClass);
          }

          this.rootClasses.forEach(function (item) {
            // skip position prop
            if (item && _typeof(item) === 'object') {
              for (var key in item) {
                if (item[key]) {
                  dropdownWrapper.classList.add(key);
                }
              }
            }
          });

          if (this.appendToBodyCopyParent) {
            var parentNode = this.$refs.dropdown.parentNode;
            var parent = this.$data._bodyEl;
            parent.classList.forEach(function (item) {
              return parent.classList.remove(item);
            });
            parentNode.classList.forEach(function (item) {
              parent.classList.add(item);
            });
          }

          var rect = trigger.getBoundingClientRect();
          var top = rect.top + window.scrollY;
          var left = rect.left + window.scrollX;

          if (!this.position || this.position.indexOf('bottom') >= 0) {
            top += trigger.clientHeight;
          } else {
            top -= dropdownMenu.clientHeight;
          }

          if (this.position && this.position.indexOf('left') >= 0) {
            left -= dropdownMenu.clientWidth - trigger.clientWidth;
          }

          this.style = {
            position: 'absolute',
            top: "".concat(top, "px"),
            left: "".concat(left, "px"),
            zIndex: '99',
            width: this.expanded ? "".concat(dropdown.offsetWidth, "px") : undefined
          };
        }
      }
    },
    mounted: function mounted() {
      if (this.appendToBody) {
        this.$data._bodyEl = createAbsoluteElement(this.$refs.dropdownMenu);
        this.updateAppendToBody();
      }
    },
    created: function created() {
      if (typeof window !== 'undefined') {
        document.addEventListener('click', this.clickedOutside);
        document.addEventListener('keyup', this.keyPress);
      }
    },
    beforeDestroy: function beforeDestroy() {
      if (typeof window !== 'undefined') {
        document.removeEventListener('click', this.clickedOutside);
        document.removeEventListener('keyup', this.keyPress);
      }

      if (this.appendToBody) {
        removeElement(this.$data._bodyEl);
      }
    }
  };

  /* script */
  const __vue_script__$a = script$a;

  /* template */
  var __vue_render__$9 = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{ref:"dropdown",staticClass:"dropdown dropdown-menu-animation",class:_vm.rootClasses},[(!_vm.inline)?_c('div',{ref:"trigger",staticClass:"dropdown-trigger",attrs:{"role":"button","aria-haspopup":"true"},on:{"click":_vm.onClick,"contextmenu":function($event){$event.preventDefault();return _vm.onContextMenu($event)},"mouseenter":_vm.onHover,"!focus":function($event){return _vm.onFocus($event)}}},[_vm._t("trigger",null,{"active":_vm.isActive})],2):_vm._e(),_c('transition',{attrs:{"name":_vm.animation}},[(_vm.isMobileModal)?_c('div',{directives:[{name:"show",rawName:"v-show",value:(_vm.isActive),expression:"isActive"}],staticClass:"background",attrs:{"aria-hidden":!_vm.isActive}}):_vm._e()]),_c('transition',{attrs:{"name":_vm.animation}},[_c('div',{directives:[{name:"show",rawName:"v-show",value:((!_vm.disabled && (_vm.isActive || _vm.isHoverable)) || _vm.inline),expression:"(!disabled && (isActive || isHoverable)) || inline"},{name:"trap-focus",rawName:"v-trap-focus",value:(_vm.trapFocus),expression:"trapFocus"}],ref:"dropdownMenu",staticClass:"dropdown-menu",style:(_vm.style),attrs:{"aria-hidden":!_vm.isActive}},[_c('div',{staticClass:"dropdown-content",style:(_vm.contentStyle),attrs:{"role":_vm.ariaRole}},[_vm._t("default")],2)])])],1)};
  var __vue_staticRenderFns__$9 = [];

    /* style */
    const __vue_inject_styles__$a = undefined;
    /* scoped */
    const __vue_scope_id__$a = undefined;
    /* module identifier */
    const __vue_module_identifier__$a = undefined;
    /* functional template */
    const __vue_is_functional_template__$a = false;
    /* style inject */
    
    /* style inject SSR */
    

    
    var Dropdown = normalizeComponent_1(
      { render: __vue_render__$9, staticRenderFns: __vue_staticRenderFns__$9 },
      __vue_inject_styles__$a,
      __vue_script__$a,
      __vue_scope_id__$a,
      __vue_is_functional_template__$a,
      __vue_module_identifier__$a,
      undefined,
      undefined
    );

  //
  var script$b = {
    name: 'BDropdownItem',
    mixins: [InjectedChildMixin('dropdown')],
    props: {
      value: {
        type: [String, Number, Boolean, Object, Array, Function],
        default: null
      },
      separator: Boolean,
      disabled: Boolean,
      custom: Boolean,
      focusable: {
        type: Boolean,
        default: true
      },
      paddingless: Boolean,
      hasLink: Boolean,
      ariaRole: {
        type: String,
        default: ''
      }
    },
    computed: {
      anchorClasses: function anchorClasses() {
        return {
          'is-disabled': this.parent.disabled || this.disabled,
          'is-paddingless': this.paddingless,
          'is-active': this.isActive
        };
      },
      itemClasses: function itemClasses() {
        return {
          'dropdown-item': !this.hasLink,
          'is-disabled': this.disabled,
          'is-paddingless': this.paddingless,
          'is-active': this.isActive,
          'has-link': this.hasLink
        };
      },
      ariaRoleItem: function ariaRoleItem() {
        return this.ariaRole === 'menuitem' || this.ariaRole === 'listitem' ? this.ariaRole : null;
      },
      isClickable: function isClickable() {
        return !this.parent.disabled && !this.separator && !this.disabled && !this.custom;
      },
      isActive: function isActive() {
        if (this.parent.selected === null) return false;
        if (this.parent.multiple) return this.parent.selected.indexOf(this.value) >= 0;
        return this.value === this.parent.selected;
      },
      isFocusable: function isFocusable() {
        return this.hasLink ? false : this.focusable;
      }
    },
    methods: {
      /**
      * Click listener, select the item.
      */
      selectItem: function selectItem() {
        if (!this.isClickable) return;
        this.parent.selectItem(this.value);
        this.$emit('click');
      }
    }
  };

  /* script */
  const __vue_script__$b = script$b;

  /* template */
  var __vue_render__$a = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return (_vm.separator)?_c('hr',{staticClass:"dropdown-divider"}):(!_vm.custom && !_vm.hasLink)?_c('a',{staticClass:"dropdown-item",class:_vm.anchorClasses,attrs:{"role":_vm.ariaRoleItem,"tabindex":_vm.isFocusable ? 0 : null},on:{"click":_vm.selectItem}},[_vm._t("default")],2):_c('div',{class:_vm.itemClasses,attrs:{"role":_vm.ariaRoleItem,"tabindex":_vm.isFocusable ? 0 : null},on:{"click":_vm.selectItem}},[_vm._t("default")],2)};
  var __vue_staticRenderFns__$a = [];

    /* style */
    const __vue_inject_styles__$b = undefined;
    /* scoped */
    const __vue_scope_id__$b = undefined;
    /* module identifier */
    const __vue_module_identifier__$b = undefined;
    /* functional template */
    const __vue_is_functional_template__$b = false;
    /* style inject */
    
    /* style inject SSR */
    

    
    var DropdownItem = normalizeComponent_1(
      { render: __vue_render__$a, staticRenderFns: __vue_staticRenderFns__$a },
      __vue_inject_styles__$b,
      __vue_script__$b,
      __vue_scope_id__$b,
      __vue_is_functional_template__$b,
      __vue_module_identifier__$b,
      undefined,
      undefined
    );

  var script$c = {
    name: 'BFieldBody',
    props: {
      message: {
        type: [String, Array]
      },
      type: {
        type: [String, Object]
      }
    },
    render: function render(createElement) {
      var _this = this;

      var first = true;
      return createElement('div', {
        attrs: {
          'class': 'field-body'
        }
      }, this.$slots.default.map(function (element) {
        // skip returns and comments
        if (!element.tag) {
          return element;
        }

        var message;

        if (first) {
          message = _this.message;
          first = false;
        }

        return createElement('b-field', {
          attrs: {
            type: _this.type,
            message: message
          }
        }, [element]);
      }));
    }
  };

  /* script */
  const __vue_script__$c = script$c;

  /* template */

    /* style */
    const __vue_inject_styles__$c = undefined;
    /* scoped */
    const __vue_scope_id__$c = undefined;
    /* module identifier */
    const __vue_module_identifier__$c = undefined;
    /* functional template */
    const __vue_is_functional_template__$c = undefined;
    /* style inject */
    
    /* style inject SSR */
    

    
    var FieldBody = normalizeComponent_1(
      {},
      __vue_inject_styles__$c,
      __vue_script__$c,
      __vue_scope_id__$c,
      __vue_is_functional_template__$c,
      __vue_module_identifier__$c,
      undefined,
      undefined
    );

  var script$d = {
    name: 'BField',
    components: _defineProperty({}, FieldBody.name, FieldBody),
    provide: function provide() {
      return {
        'BField': this
      };
    },
    inject: {
      parent: {
        from: 'BField',
        default: false
      }
    },
    // Used internally only when using Field in Field
    props: {
      type: [String, Object],
      label: String,
      labelFor: String,
      message: [String, Array, Object],
      grouped: Boolean,
      groupMultiline: Boolean,
      position: String,
      expanded: Boolean,
      horizontal: Boolean,
      addons: {
        type: Boolean,
        default: true
      },
      customClass: String,
      labelPosition: {
        type: String,
        default: function _default() {
          return config.defaultFieldLabelPosition;
        }
      }
    },
    data: function data() {
      return {
        newType: this.type,
        newMessage: this.message,
        fieldLabelSize: null,
        _isField: true // Used internally by Input and Select

      };
    },
    computed: {
      rootClasses: function rootClasses() {
        return [{
          'is-expanded': this.expanded,
          'is-horizontal': this.horizontal,
          'is-floating-in-label': this.hasLabel && !this.horizontal && this.labelPosition === 'inside',
          'is-floating-label': this.hasLabel && !this.horizontal && this.labelPosition === 'on-border'
        }, this.numberInputClasses];
      },
      innerFieldClasses: function innerFieldClasses() {
        return [this.fieldType(), this.newPosition, {
          'is-grouped-multiline': this.groupMultiline
        }];
      },
      hasInnerField: function hasInnerField() {
        return this.grouped || this.groupMultiline || this.hasAddons();
      },

      /**
      * Correct Bulma class for the side of the addon or group.
      *
      * This is not kept like the others (is-small, etc.),
      * because since 'has-addons' is set automatically it
      * doesn't make sense to teach users what addons are exactly.
      */
      newPosition: function newPosition() {
        if (this.position === undefined) return;
        var position = this.position.split('-');
        if (position.length < 1) return;
        var prefix = this.grouped ? 'is-grouped-' : 'has-addons-';
        if (this.position) return prefix + position[1];
      },

      /**
      * Formatted message in case it's an array
      * (each element is separated by <br> tag)
      */
      formattedMessage: function formattedMessage() {
        if (this.parent && this.parent.hasInnerField) {
          return ''; // Message will be displayed in parent field
        }

        if (typeof this.newMessage === 'string') {
          return [this.newMessage];
        }

        var messages = [];

        if (Array.isArray(this.newMessage)) {
          this.newMessage.forEach(function (message) {
            if (typeof message === 'string') {
              messages.push(message);
            } else {
              for (var key in message) {
                if (message[key]) {
                  messages.push(key);
                }
              }
            }
          });
        } else {
          for (var key in this.newMessage) {
            if (this.newMessage[key]) {
              messages.push(key);
            }
          }
        }

        return messages.filter(function (m) {
          if (m) return m;
        });
      },
      hasLabel: function hasLabel() {
        return this.label || this.$slots.label;
      },
      hasMessage: function hasMessage() {
        return (!this.parent || !this.parent.hasInnerField) && this.newMessage || this.$slots.message;
      },
      numberInputClasses: function numberInputClasses() {
        if (this.$slots.default) {
          var numberinput = this.$slots.default.filter(function (node) {
            return node.tag && node.tag.toLowerCase().indexOf('numberinput') >= 0;
          })[0];

          if (numberinput) {
            var classes = ['has-numberinput'];
            var controlsPosition = numberinput.componentOptions.propsData.controlsPosition;
            var size = numberinput.componentOptions.propsData.size;

            if (controlsPosition) {
              classes.push("has-numberinput-".concat(controlsPosition));
            }

            if (size) {
              classes.push("has-numberinput-".concat(size));
            }

            return classes;
          }
        }

        return null;
      }
    },
    watch: {
      /**
      * Set internal type when prop change.
      */
      type: function type(value) {
        this.newType = value;
      },

      /**
      * Set internal message when prop change.
      */
      message: function message(value) {
        this.newMessage = value;
      },

      /**
      * Set parent message if we use Field in Field.
      */
      newMessage: function newMessage(value) {
        if (this.parent && this.parent.hasInnerField) {
          if (!this.parent.type) {
            this.parent.newType = this.newType;
          }

          this.parent.newMessage = value;
        }
      }
    },
    methods: {
      /**
      * Field has addons if there are more than one slot
      * (element / component) in the Field.
      * Or is grouped when prop is set.
      * Is a method to be called when component re-render.
      */
      fieldType: function fieldType() {
        if (this.grouped) return 'is-grouped';
        if (this.hasAddons()) return 'has-addons';
      },
      hasAddons: function hasAddons() {
        var renderedNode = 0;

        if (this.$slots.default) {
          renderedNode = this.$slots.default.reduce(function (i, node) {
            return node.tag ? i + 1 : i;
          }, 0);
        }

        return renderedNode > 1 && this.addons && !this.horizontal;
      }
    },
    mounted: function mounted() {
      if (this.horizontal) {
        // Bulma docs: .is-normal for any .input or .button
        var elements = this.$el.querySelectorAll('.input, .select, .button, .textarea, .b-slider');

        if (elements.length > 0) {
          this.fieldLabelSize = 'is-normal';
        }
      }
    }
  };

  /* script */
  const __vue_script__$d = script$d;

  /* template */
  var __vue_render__$b = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"field",class:_vm.rootClasses},[(_vm.horizontal)?_c('div',{staticClass:"field-label",class:[_vm.customClass, _vm.fieldLabelSize]},[(_vm.hasLabel)?_c('label',{staticClass:"label",class:_vm.customClass,attrs:{"for":_vm.labelFor}},[(_vm.$slots.label)?_vm._t("label"):[_vm._v(_vm._s(_vm.label))]],2):_vm._e()]):[(_vm.hasLabel)?_c('label',{staticClass:"label",class:_vm.customClass,attrs:{"for":_vm.labelFor}},[(_vm.$slots.label)?_vm._t("label"):[_vm._v(_vm._s(_vm.label))]],2):_vm._e()],(_vm.horizontal)?_c('b-field-body',{attrs:{"message":_vm.newMessage ? _vm.formattedMessage : '',"type":_vm.newType}},[_vm._t("default")],2):(_vm.hasInnerField)?_c('div',{staticClass:"field-body"},[_c('b-field',{class:_vm.innerFieldClasses,attrs:{"addons":false,"type":_vm.newType}},[_vm._t("default")],2)],1):[_vm._t("default")],(_vm.hasMessage && !_vm.horizontal)?_c('p',{staticClass:"help",class:_vm.newType},[(_vm.$slots.message)?_vm._t("message"):[_vm._l((_vm.formattedMessage),function(mess,i){return [_vm._v(" "+_vm._s(mess)+" "),((i + 1) < _vm.formattedMessage.length)?_c('br',{key:i}):_vm._e()]})]],2):_vm._e()],2)};
  var __vue_staticRenderFns__$b = [];

    /* style */
    const __vue_inject_styles__$d = undefined;
    /* scoped */
    const __vue_scope_id__$d = undefined;
    /* module identifier */
    const __vue_module_identifier__$d = undefined;
    /* functional template */
    const __vue_is_functional_template__$d = false;
    /* style inject */
    
    /* style inject SSR */
    

    
    var Field = normalizeComponent_1(
      { render: __vue_render__$b, staticRenderFns: __vue_staticRenderFns__$b },
      __vue_inject_styles__$d,
      __vue_script__$d,
      __vue_scope_id__$d,
      __vue_is_functional_template__$d,
      __vue_module_identifier__$d,
      undefined,
      undefined
    );

  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  // These should match the variables in clockpicker.scss
  var indicatorSize = 40;
  var paddingInner = 5;
  var script$e = {
    name: 'BClockpickerFace',
    props: {
      pickerSize: Number,
      min: Number,
      max: Number,
      double: Boolean,
      value: Number,
      faceNumbers: Array,
      disabledValues: Function
    },
    data: function data() {
      return {
        isDragging: false,
        inputValue: this.value,
        prevAngle: 720
      };
    },
    computed: {
      /**
      * How many number indicators are shown on the face
      */
      count: function count() {
        return this.max - this.min + 1;
      },

      /**
      * How many number indicators are shown per ring on the face
      */
      countPerRing: function countPerRing() {
        return this.double ? this.count / 2 : this.count;
      },

      /**
      * Radius of the clock face
      */
      radius: function radius() {
        return this.pickerSize / 2;
      },

      /**
      * Radius of the outer ring of number indicators
      */
      outerRadius: function outerRadius() {
        return this.radius - paddingInner - indicatorSize / 2;
      },

      /**
      * Radius of the inner ring of number indicators
      */
      innerRadius: function innerRadius() {
        return Math.max(this.outerRadius * 0.6, this.outerRadius - paddingInner - indicatorSize); // 48px gives enough room for the outer ring of numbers
      },

      /**
      * The angle for each selectable value
      * For hours this ends up being 30 degrees, for minutes 6 degrees
      */
      degreesPerUnit: function degreesPerUnit() {
        return 360 / this.countPerRing;
      },

      /**
      * Used for calculating x/y grid location based on degrees
      */
      degrees: function degrees() {
        return this.degreesPerUnit * Math.PI / 180;
      },

      /**
      * Calculates the angle the clock hand should be rotated for the
      * selected value
      */
      handRotateAngle: function handRotateAngle() {
        var currentAngle = this.prevAngle;

        while (currentAngle < 0) {
          currentAngle += 360;
        }

        var targetAngle = this.calcHandAngle(this.displayedValue);
        var degreesDiff = this.shortestDistanceDegrees(currentAngle, targetAngle);
        var angle = this.prevAngle + degreesDiff;
        return angle;
      },

      /**
      * Determines how long the selector hand is based on if the
      * selected value is located along the outer or inner ring
      */
      handScale: function handScale() {
        return this.calcHandScale(this.displayedValue);
      },
      handStyle: function handStyle() {
        return {
          transform: "rotate(".concat(this.handRotateAngle, "deg) scaleY(").concat(this.handScale, ")"),
          transition: '.3s cubic-bezier(.25,.8,.50,1)'
        };
      },

      /**
      * The value the hand should be pointing at
      */
      displayedValue: function displayedValue() {
        return this.inputValue == null ? this.min : this.inputValue;
      }
    },
    watch: {
      value: function value(_value) {
        if (_value !== this.inputValue) {
          this.prevAngle = this.handRotateAngle;
        }

        this.inputValue = _value;
      }
    },
    methods: {
      isDisabled: function isDisabled(value) {
        return this.disabledValues && this.disabledValues(value);
      },

      /**
      * Calculates the distance between two points
      */
      euclidean: function euclidean(p0, p1) {
        var dx = p1.x - p0.x;
        var dy = p1.y - p0.y;
        return Math.sqrt(dx * dx + dy * dy);
      },
      shortestDistanceDegrees: function shortestDistanceDegrees(start, stop) {
        var modDiff = (stop - start) % 360;
        var shortestDistance = 180 - Math.abs(Math.abs(modDiff) - 180);
        return (modDiff + 360) % 360 < 180 ? shortestDistance * 1 : shortestDistance * -1;
      },

      /**
      * Calculates the angle of the line from the center point
      * to the given point.
      */
      coordToAngle: function coordToAngle(center, p1) {
        var value = 2 * Math.atan2(p1.y - center.y - this.euclidean(center, p1), p1.x - center.x);
        return Math.abs(value * 180 / Math.PI);
      },

      /**
      * Generates the inline style translate() property for a
      * number indicator, which determines it's location on the
      * clock face
      */
      getNumberTranslate: function getNumberTranslate(value) {
        var _this$getNumberCoords = this.getNumberCoords(value),
            x = _this$getNumberCoords.x,
            y = _this$getNumberCoords.y;

        return "translate(".concat(x, "px, ").concat(y, "px)");
      },

      /***
      * Calculates the coordinates on the clock face for a number
      * indicator value
      */
      getNumberCoords: function getNumberCoords(value) {
        var radius = this.isInnerRing(value) ? this.innerRadius : this.outerRadius;
        return {
          x: Math.round(radius * Math.sin((value - this.min) * this.degrees)),
          y: Math.round(-radius * Math.cos((value - this.min) * this.degrees))
        };
      },
      getFaceNumberClasses: function getFaceNumberClasses(num) {
        return {
          'active': num.value === this.displayedValue,
          'disabled': this.isDisabled(num.value)
        };
      },

      /**
      * Determines if a value resides on the inner ring
      */
      isInnerRing: function isInnerRing(value) {
        return this.double && value - this.min >= this.countPerRing;
      },
      calcHandAngle: function calcHandAngle(value) {
        var angle = this.degreesPerUnit * (value - this.min);
        if (this.isInnerRing(value)) angle -= 360;
        return angle;
      },
      calcHandScale: function calcHandScale(value) {
        return this.isInnerRing(value) ? this.innerRadius / this.outerRadius : 1;
      },
      onMouseDown: function onMouseDown(e) {
        e.preventDefault();
        this.isDragging = true;
        this.onDragMove(e);
      },
      onMouseUp: function onMouseUp() {
        this.isDragging = false;

        if (!this.isDisabled(this.inputValue)) {
          this.$emit('change', this.inputValue);
        }
      },
      onDragMove: function onDragMove(e) {
        e.preventDefault();
        if (!this.isDragging && e.type !== 'click') return;

        var _this$$refs$clock$get = this.$refs.clock.getBoundingClientRect(),
            width = _this$$refs$clock$get.width,
            top = _this$$refs$clock$get.top,
            left = _this$$refs$clock$get.left;

        var _ref = 'touches' in e ? e.touches[0] : e,
            clientX = _ref.clientX,
            clientY = _ref.clientY;

        var center = {
          x: width / 2,
          y: -width / 2
        };
        var coords = {
          x: clientX - left,
          y: top - clientY
        };
        var handAngle = Math.round(this.coordToAngle(center, coords) + 360) % 360;
        var insideClick = this.double && this.euclidean(center, coords) < (this.outerRadius + this.innerRadius) / 2 - 16;
        var value = Math.round(handAngle / this.degreesPerUnit) + this.min + (insideClick ? this.countPerRing : 0); // Necessary to fix edge case when selecting left part of max value

        if (handAngle >= 360 - this.degreesPerUnit / 2) {
          value = insideClick ? this.max : this.min;
        }

        this.update(value);
      },
      update: function update(value) {
        if (this.inputValue !== value && !this.isDisabled(value)) {
          this.prevAngle = this.handRotateAngle;
          this.inputValue = value;
          this.$emit('input', value);
        }
      }
    }
  };

  /* script */
  const __vue_script__$e = script$e;

  /* template */
  var __vue_render__$c = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"b-clockpicker-face",on:{"mousedown":_vm.onMouseDown,"mouseup":_vm.onMouseUp,"mousemove":_vm.onDragMove,"touchstart":_vm.onMouseDown,"touchend":_vm.onMouseUp,"touchmove":_vm.onDragMove}},[_c('div',{ref:"clock",staticClass:"b-clockpicker-face-outer-ring"},[_c('div',{staticClass:"b-clockpicker-face-hand",style:(_vm.handStyle)}),_vm._l((_vm.faceNumbers),function(num,index){return _c('span',{key:index,staticClass:"b-clockpicker-face-number",class:_vm.getFaceNumberClasses(num),style:({ transform: _vm.getNumberTranslate(num.value) })},[_c('span',[_vm._v(_vm._s(num.label))])])})],2)])};
  var __vue_staticRenderFns__$c = [];

    /* style */
    const __vue_inject_styles__$e = undefined;
    /* scoped */
    const __vue_scope_id__$e = undefined;
    /* module identifier */
    const __vue_module_identifier__$e = undefined;
    /* functional template */
    const __vue_is_functional_template__$e = false;
    /* style inject */
    
    /* style inject SSR */
    

    
    var ClockpickerFace = normalizeComponent_1(
      { render: __vue_render__$c, staticRenderFns: __vue_staticRenderFns__$c },
      __vue_inject_styles__$e,
      __vue_script__$e,
      __vue_scope_id__$e,
      __vue_is_functional_template__$e,
      __vue_module_identifier__$e,
      undefined,
      undefined
    );

  var _components;
  var outerPadding = 12;
  var script$f = {
    name: 'BClockpicker',
    components: (_components = {}, _defineProperty(_components, ClockpickerFace.name, ClockpickerFace), _defineProperty(_components, Input.name, Input), _defineProperty(_components, Field.name, Field), _defineProperty(_components, Icon.name, Icon), _defineProperty(_components, Dropdown.name, Dropdown), _defineProperty(_components, DropdownItem.name, DropdownItem), _components),
    mixins: [TimepickerMixin],
    props: {
      pickerSize: {
        type: Number,
        default: 290
      },
      incrementMinutes: {
        type: Number,
        default: 5
      },
      autoSwitch: {
        type: Boolean,
        default: true
      },
      type: {
        type: String,
        default: 'is-primary'
      },
      hoursLabel: {
        type: String,
        default: function _default() {
          return config.defaultClockpickerHoursLabel || 'Hours';
        }
      },
      minutesLabel: {
        type: String,
        default: function _default() {
          return config.defaultClockpickerMinutesLabel || 'Min';
        }
      }
    },
    data: function data() {
      return {
        isSelectingHour: true,
        isDragging: false,
        _isClockpicker: true
      };
    },
    computed: {
      hoursDisplay: function hoursDisplay() {
        if (this.hoursSelected == null) return '--';
        if (this.isHourFormat24) return this.pad(this.hoursSelected);
        var display = this.hoursSelected;

        if (this.meridienSelected === this.pmString || this.meridienSelected === this.PM) {
          display -= 12;
        }

        if (display === 0) display = 12;
        return display;
      },
      minutesDisplay: function minutesDisplay() {
        return this.minutesSelected == null ? '--' : this.pad(this.minutesSelected);
      },
      minFaceValue: function minFaceValue() {
        return this.isSelectingHour && !this.isHourFormat24 && (this.meridienSelected === this.pmString || this.meridienSelected === this.PM) ? 12 : 0;
      },
      maxFaceValue: function maxFaceValue() {
        return this.isSelectingHour ? !this.isHourFormat24 && (this.meridienSelected === this.amString || this.meridienSelected === this.AM) ? 11 : 23 : 59;
      },
      faceSize: function faceSize() {
        return this.pickerSize - outerPadding * 2;
      },
      faceDisabledValues: function faceDisabledValues() {
        return this.isSelectingHour ? this.isHourDisabled : this.isMinuteDisabled;
      }
    },
    methods: {
      onClockInput: function onClockInput(value) {
        if (this.isSelectingHour) {
          this.hoursSelected = value;
          this.onHoursChange(value);
        } else {
          this.minutesSelected = value;
          this.onMinutesChange(value);
        }
      },
      onClockChange: function onClockChange(value) {
        if (this.autoSwitch && this.isSelectingHour) {
          this.isSelectingHour = !this.isSelectingHour;
        }
      },
      onMeridienClick: function onMeridienClick(value) {
        if (this.meridienSelected !== value) {
          this.meridienSelected = value;
          this.onMeridienChange(value);
        }
      }
    }
  };

  /* script */
  const __vue_script__$f = script$f;

  /* template */
  var __vue_render__$d = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"b-clockpicker control",class:[_vm.size, _vm.type, {'is-expanded': _vm.expanded}]},[(!_vm.isMobile || _vm.inline)?_c('b-dropdown',{ref:"dropdown",attrs:{"position":_vm.position,"disabled":_vm.disabled,"inline":_vm.inline,"append-to-body":_vm.appendToBody,"append-to-body-copy-parent":""},on:{"active-change":_vm.onActiveChange},scopedSlots:_vm._u([(!_vm.inline)?{key:"trigger",fn:function(){return [_vm._t("trigger",[_c('b-input',_vm._b({ref:"input",attrs:{"slot":"trigger","autocomplete":"off","value":_vm.formatValue(_vm.computedValue),"placeholder":_vm.placeholder,"size":_vm.size,"icon":_vm.icon,"icon-pack":_vm.iconPack,"loading":_vm.loading,"disabled":_vm.disabled,"readonly":!_vm.editable,"rounded":_vm.rounded,"use-html5-validation":_vm.useHtml5Validation},on:{"focus":_vm.handleOnFocus,"blur":function($event){return _vm.checkHtml5Validity()}},nativeOn:{"click":function($event){$event.stopPropagation();return _vm.toggle(true)},"keyup":function($event){if(!$event.type.indexOf('key')&&_vm._k($event.keyCode,"enter",13,$event.key,"Enter")){ return null; }return _vm.toggle(true)},"change":function($event){return _vm.onChange($event.target.value)}},slot:"trigger"},'b-input',_vm.$attrs,false))])]},proxy:true}:null],null,true)},[_c('div',{staticClass:"card",attrs:{"disabled":_vm.disabled,"custom":""}},[(_vm.inline)?_c('header',{staticClass:"card-header"},[_c('div',{staticClass:"b-clockpicker-header card-header-title"},[_c('div',{staticClass:"b-clockpicker-time"},[_c('span',{staticClass:"b-clockpicker-btn",class:{ active: _vm.isSelectingHour },on:{"click":function($event){_vm.isSelectingHour = true;}}},[_vm._v(_vm._s(_vm.hoursDisplay))]),_c('span',[_vm._v(_vm._s(_vm.hourLiteral))]),_c('span',{staticClass:"b-clockpicker-btn",class:{ active: !_vm.isSelectingHour },on:{"click":function($event){_vm.isSelectingHour = false;}}},[_vm._v(_vm._s(_vm.minutesDisplay))])]),(!_vm.isHourFormat24)?_c('div',{staticClass:"b-clockpicker-period"},[_c('div',{staticClass:"b-clockpicker-btn",class:{
                                  active: _vm.meridienSelected === _vm.amString || _vm.meridienSelected === _vm.AM
                              },on:{"click":function($event){return _vm.onMeridienClick(_vm.amString)}}},[_vm._v(_vm._s(_vm.amString))]),_c('div',{staticClass:"b-clockpicker-btn",class:{
                                  active: _vm.meridienSelected === _vm.pmString || _vm.meridienSelected === _vm.PM
                              },on:{"click":function($event){return _vm.onMeridienClick(_vm.pmString)}}},[_vm._v(_vm._s(_vm.pmString))])]):_vm._e()])]):_vm._e(),_c('div',{staticClass:"card-content"},[_c('div',{staticClass:"b-clockpicker-body",style:({ width: _vm.faceSize + 'px', height: _vm.faceSize + 'px' })},[(!_vm.inline)?_c('div',{staticClass:"b-clockpicker-time"},[_c('div',{staticClass:"b-clockpicker-btn",class:{ active: _vm.isSelectingHour },on:{"click":function($event){_vm.isSelectingHour = true;}}},[_vm._v(_vm._s(_vm.hoursLabel))]),_c('span',{staticClass:"b-clockpicker-btn",class:{ active: !_vm.isSelectingHour },on:{"click":function($event){_vm.isSelectingHour = false;}}},[_vm._v(_vm._s(_vm.minutesLabel))])]):_vm._e(),(!_vm.isHourFormat24 && !_vm.inline)?_c('div',{staticClass:"b-clockpicker-period"},[_c('div',{staticClass:"b-clockpicker-btn",class:{
                                  active: _vm.meridienSelected === _vm.amString || _vm.meridienSelected === _vm.AM
                              },on:{"click":function($event){return _vm.onMeridienClick(_vm.amString)}}},[_vm._v(_vm._s(_vm.amString))]),_c('div',{staticClass:"b-clockpicker-btn",class:{
                                  active: _vm.meridienSelected === _vm.pmString || _vm.meridienSelected === _vm.PM
                              },on:{"click":function($event){return _vm.onMeridienClick(_vm.pmString)}}},[_vm._v(_vm._s(_vm.pmString))])]):_vm._e(),_c('b-clockpicker-face',{attrs:{"picker-size":_vm.faceSize,"min":_vm.minFaceValue,"max":_vm.maxFaceValue,"face-numbers":_vm.isSelectingHour ? _vm.hours : _vm.minutes,"disabled-values":_vm.faceDisabledValues,"double":_vm.isSelectingHour && _vm.isHourFormat24,"value":_vm.isSelectingHour ? _vm.hoursSelected : _vm.minutesSelected},on:{"input":_vm.onClockInput,"change":_vm.onClockChange}})],1)]),(_vm.$slots.default !== undefined && _vm.$slots.default.length)?_c('footer',{staticClass:"b-clockpicker-footer card-footer"},[_vm._t("default")],2):_vm._e()])]):_c('b-input',_vm._b({ref:"input",attrs:{"type":"time","autocomplete":"off","value":_vm.formatHHMMSS(_vm.computedValue),"placeholder":_vm.placeholder,"size":_vm.size,"icon":_vm.icon,"icon-pack":_vm.iconPack,"loading":_vm.loading,"max":_vm.formatHHMMSS(_vm.maxTime),"min":_vm.formatHHMMSS(_vm.minTime),"disabled":_vm.disabled,"readonly":false,"use-html5-validation":_vm.useHtml5Validation},on:{"focus":_vm.handleOnFocus,"blur":function($event){_vm.onBlur() && _vm.checkHtml5Validity();}},nativeOn:{"click":function($event){$event.stopPropagation();return _vm.toggle(true)},"keyup":function($event){if(!$event.type.indexOf('key')&&_vm._k($event.keyCode,"enter",13,$event.key,"Enter")){ return null; }return _vm.toggle(true)},"change":function($event){return _vm.onChangeNativePicker($event)}}},'b-input',_vm.$attrs,false))],1)};
  var __vue_staticRenderFns__$d = [];

    /* style */
    const __vue_inject_styles__$f = undefined;
    /* scoped */
    const __vue_scope_id__$f = undefined;
    /* module identifier */
    const __vue_module_identifier__$f = undefined;
    /* functional template */
    const __vue_is_functional_template__$f = false;
    /* style inject */
    
    /* style inject SSR */
    

    
    var Clockpicker = normalizeComponent_1(
      { render: __vue_render__$d, staticRenderFns: __vue_staticRenderFns__$d },
      __vue_inject_styles__$f,
      __vue_script__$f,
      __vue_scope_id__$f,
      __vue_is_functional_template__$f,
      __vue_module_identifier__$f,
      undefined,
      undefined
    );

  var Plugin$5 = {
    install: function install(Vue) {
      registerComponent(Vue, Clockpicker);
    }
  };
  use(Plugin$5);

  var script$g = {
    name: 'BSelect',
    components: _defineProperty({}, Icon.name, Icon),
    mixins: [FormElementMixin],
    inheritAttrs: false,
    props: {
      value: {
        type: [String, Number, Boolean, Object, Array, Function, Date],
        default: null
      },
      placeholder: String,
      multiple: Boolean,
      nativeSize: [String, Number]
    },
    data: function data() {
      return {
        selected: this.value,
        _elementRef: 'select'
      };
    },
    computed: {
      computedValue: {
        get: function get() {
          return this.selected;
        },
        set: function set(value) {
          this.selected = value;
          this.$emit('input', value);
          !this.isValid && this.checkHtml5Validity();
        }
      },
      spanClasses: function spanClasses() {
        return [this.size, this.statusType, {
          'is-fullwidth': this.expanded,
          'is-loading': this.loading,
          'is-multiple': this.multiple,
          'is-rounded': this.rounded,
          'is-empty': this.selected === null
        }];
      }
    },
    watch: {
      /**
      * When v-model is changed:
      *   1. Set the selected option.
      *   2. If it's invalid, validate again.
      */
      value: function value(_value) {
        this.selected = _value;
        !this.isValid && this.checkHtml5Validity();
      }
    }
  };

  /* script */
  const __vue_script__$g = script$g;

  /* template */
  var __vue_render__$e = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"control",class:{ 'is-expanded': _vm.expanded, 'has-icons-left': _vm.icon }},[_c('span',{staticClass:"select",class:_vm.spanClasses},[_c('select',_vm._b({directives:[{name:"model",rawName:"v-model",value:(_vm.computedValue),expression:"computedValue"}],ref:"select",attrs:{"multiple":_vm.multiple,"size":_vm.nativeSize},on:{"blur":function($event){_vm.$emit('blur', $event) && _vm.checkHtml5Validity();},"focus":function($event){return _vm.$emit('focus', $event)},"change":function($event){var $$selectedVal = Array.prototype.filter.call($event.target.options,function(o){return o.selected}).map(function(o){var val = "_value" in o ? o._value : o.value;return val}); _vm.computedValue=$event.target.multiple ? $$selectedVal : $$selectedVal[0];}}},'select',_vm.$attrs,false),[(_vm.placeholder)?[(_vm.computedValue == null)?_c('option',{attrs:{"disabled":"","hidden":""},domProps:{"value":null}},[_vm._v(" "+_vm._s(_vm.placeholder)+" ")]):_vm._e()]:_vm._e(),_vm._t("default")],2)]),(_vm.icon)?_c('b-icon',{staticClass:"is-left",attrs:{"icon":_vm.icon,"pack":_vm.iconPack,"size":_vm.iconSize}}):_vm._e()],1)};
  var __vue_staticRenderFns__$e = [];

    /* style */
    const __vue_inject_styles__$g = undefined;
    /* scoped */
    const __vue_scope_id__$g = undefined;
    /* module identifier */
    const __vue_module_identifier__$g = undefined;
    /* functional template */
    const __vue_is_functional_template__$g = false;
    /* style inject */
    
    /* style inject SSR */
    

    
    var Select = normalizeComponent_1(
      { render: __vue_render__$e, staticRenderFns: __vue_staticRenderFns__$e },
      __vue_inject_styles__$g,
      __vue_script__$g,
      __vue_scope_id__$g,
      __vue_is_functional_template__$g,
      __vue_module_identifier__$g,
      undefined,
      undefined
    );

  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  var script$h = {
    name: 'BDatepickerTableRow',
    inject: {
      $datepicker: {
        name: '$datepicker',
        default: false
      }
    },
    props: {
      selectedDate: {
        type: [Date, Array]
      },
      hoveredDateRange: Array,
      day: {
        type: Number
      },
      week: {
        type: Array,
        required: true
      },
      month: {
        type: Number,
        required: true
      },
      minDate: Date,
      maxDate: Date,
      disabled: Boolean,
      unselectableDates: [Array, Function],
      unselectableDaysOfWeek: Array,
      selectableDates: [Array, Function],
      events: Array,
      indicators: String,
      dateCreator: Function,
      nearbyMonthDays: Boolean,
      nearbySelectableMonthDays: Boolean,
      showWeekNumber: Boolean,
      weekNumberClickable: Boolean,
      range: Boolean,
      multiple: Boolean,
      rulesForFirstWeek: Number,
      firstDayOfWeek: Number
    },
    watch: {
      day: function day(_day) {
        var _this = this;

        var refName = "day-".concat(this.month, "-").concat(_day);
        this.$nextTick(function () {
          if (_this.$refs[refName] && _this.$refs[refName].length > 0) {
            if (_this.$refs[refName][0]) {
              _this.$refs[refName][0].focus();
            }
          }
        }); // $nextTick needed when month is changed
      }
    },
    methods: {
      firstWeekOffset: function firstWeekOffset(year, dow, doy) {
        // first-week day -- which january is always in the first week (4 for iso, 1 for other)
        var fwd = 7 + dow - doy; // first-week day local weekday -- which local weekday is fwd

        var firstJanuary = new Date(year, 0, fwd);
        var fwdlw = (7 + firstJanuary.getDay() - dow) % 7;
        return -fwdlw + fwd - 1;
      },
      daysInYear: function daysInYear(year) {
        return this.isLeapYear(year) ? 366 : 365;
      },
      isLeapYear: function isLeapYear(year) {
        return year % 4 === 0 && year % 100 !== 0 || year % 400 === 0;
      },
      getSetDayOfYear: function getSetDayOfYear(input) {
        return Math.round((input - new Date(input.getFullYear(), 0, 1)) / 864e5) + 1;
      },
      weeksInYear: function weeksInYear(year, dow, doy) {
        var weekOffset = this.firstWeekOffset(year, dow, doy);
        var weekOffsetNext = this.firstWeekOffset(year + 1, dow, doy);
        return (this.daysInYear(year) - weekOffset + weekOffsetNext) / 7;
      },
      getWeekNumber: function getWeekNumber(mom) {
        var dow = this.firstDayOfWeek; // first day of week
        // Rules for the first week : 1 for the 1st January, 4 for the 4th January

        var doy = this.rulesForFirstWeek;
        var weekOffset = this.firstWeekOffset(mom.getFullYear(), dow, doy);
        var week = Math.floor((this.getSetDayOfYear(mom) - weekOffset - 1) / 7) + 1;
        var resWeek;
        var resYear;

        if (week < 1) {
          resYear = mom.getFullYear() - 1;
          resWeek = week + this.weeksInYear(resYear, dow, doy);
        } else if (week > this.weeksInYear(mom.getFullYear(), dow, doy)) {
          resWeek = week - this.weeksInYear(mom.getFullYear(), dow, doy);
          resYear = mom.getFullYear() + 1;
        } else {
          resYear = mom.getFullYear();
          resWeek = week;
        }

        return resWeek;
      },
      clickWeekNumber: function clickWeekNumber(week) {
        if (this.weekNumberClickable) {
          this.$datepicker.$emit('week-number-click', week);
        }
      },

      /*
       * Check that selected day is within earliest/latest params and
       * is within this month
       */
      selectableDate: function selectableDate(day) {
        var validity = [];

        if (this.minDate) {
          validity.push(day >= this.minDate);
        }

        if (this.maxDate) {
          validity.push(day <= this.maxDate);
        }

        if (this.nearbyMonthDays && !this.nearbySelectableMonthDays) {
          validity.push(day.getMonth() === this.month);
        }

        if (this.selectableDates) {
          if (typeof this.selectableDates === 'function') {
            if (this.selectableDates(day)) {
              return true;
            } else {
              validity.push(false);
            }
          } else {
            for (var i = 0; i < this.selectableDates.length; i++) {
              var enabledDate = this.selectableDates[i];

              if (day.getDate() === enabledDate.getDate() && day.getFullYear() === enabledDate.getFullYear() && day.getMonth() === enabledDate.getMonth()) {
                return true;
              } else {
                validity.push(false);
              }
            }
          }
        }

        if (this.unselectableDates) {
          if (typeof this.unselectableDates === 'function') {
            validity.push(!this.unselectableDates(day));
          } else {
            for (var _i = 0; _i < this.unselectableDates.length; _i++) {
              var disabledDate = this.unselectableDates[_i];
              validity.push(day.getDate() !== disabledDate.getDate() || day.getFullYear() !== disabledDate.getFullYear() || day.getMonth() !== disabledDate.getMonth());
            }
          }
        }

        if (this.unselectableDaysOfWeek) {
          for (var _i2 = 0; _i2 < this.unselectableDaysOfWeek.length; _i2++) {
            var dayOfWeek = this.unselectableDaysOfWeek[_i2];
            validity.push(day.getDay() !== dayOfWeek);
          }
        }

        return validity.indexOf(false) < 0;
      },

      /*
      * Emit select event with chosen date as payload
      */
      emitChosenDate: function emitChosenDate(day) {
        if (this.disabled) return;

        if (this.selectableDate(day)) {
          this.$emit('select', day);
        }
      },
      eventsDateMatch: function eventsDateMatch(day) {
        if (!this.events || !this.events.length) return false;
        var dayEvents = [];

        for (var i = 0; i < this.events.length; i++) {
          if (this.events[i].date.getDay() === day.getDay()) {
            dayEvents.push(this.events[i]);
          }
        }

        if (!dayEvents.length) {
          return false;
        }

        return dayEvents;
      },

      /*
      * Build classObject for cell using validations
      */
      classObject: function classObject(day) {
        function dateMatch(dateOne, dateTwo, multiple) {
          // if either date is null or undefined, return false
          // if using multiple flag, return false
          if (!dateOne || !dateTwo || multiple) {
            return false;
          }

          if (Array.isArray(dateTwo)) {
            return dateTwo.some(function (date) {
              return dateOne.getDate() === date.getDate() && dateOne.getFullYear() === date.getFullYear() && dateOne.getMonth() === date.getMonth();
            });
          }

          return dateOne.getDate() === dateTwo.getDate() && dateOne.getFullYear() === dateTwo.getFullYear() && dateOne.getMonth() === dateTwo.getMonth();
        }

        function dateWithin(dateOne, dates, multiple) {
          if (!Array.isArray(dates) || multiple) {
            return false;
          }

          return dateOne > dates[0] && dateOne < dates[1];
        }

        return _defineProperty({
          'is-selected': dateMatch(day, this.selectedDate) || dateWithin(day, this.selectedDate, this.multiple),
          'is-first-selected': dateMatch(day, Array.isArray(this.selectedDate) && this.selectedDate[0], this.multiple),
          'is-within-selected': dateWithin(day, this.selectedDate, this.multiple),
          'is-last-selected': dateMatch(day, Array.isArray(this.selectedDate) && this.selectedDate[1], this.multiple),
          'is-within-hovered-range': this.hoveredDateRange && this.hoveredDateRange.length === 2 && (dateMatch(day, this.hoveredDateRange) || dateWithin(day, this.hoveredDateRange)),
          'is-first-hovered': dateMatch(day, Array.isArray(this.hoveredDateRange) && this.hoveredDateRange[0]),
          'is-within-hovered': dateWithin(day, this.hoveredDateRange),
          'is-last-hovered': dateMatch(day, Array.isArray(this.hoveredDateRange) && this.hoveredDateRange[1]),
          'is-today': dateMatch(day, this.dateCreator()),
          'is-selectable': this.selectableDate(day) && !this.disabled,
          'is-unselectable': !this.selectableDate(day) || this.disabled,
          'is-invisible': !this.nearbyMonthDays && day.getMonth() !== this.month,
          'is-nearby': this.nearbySelectableMonthDays && day.getMonth() !== this.month,
          'has-event': this.eventsDateMatch(day)
        }, this.indicators, this.eventsDateMatch(day));
      },
      setRangeHoverEndDate: function setRangeHoverEndDate(day) {
        if (this.range) {
          this.$emit('rangeHoverEndDate', day);
        }
      },
      manageKeydown: function manageKeydown(event, weekDay) {
        // https://developer.mozilla.org/fr/docs/Web/API/KeyboardEvent/key/Key_Values#Navigation_keys
        var key = event.key;
        var preventDefault = true;

        switch (key) {
          case 'Tab':
            {
              preventDefault = false;
              break;
            }

          case ' ':
          case 'Space':
          case 'Spacebar':
          case 'Enter':
            {
              this.emitChosenDate(weekDay);
              break;
            }

          case 'ArrowLeft':
          case 'Left':
            {
              this.changeFocus(weekDay, -1);
              break;
            }

          case 'ArrowRight':
          case 'Right':
            {
              this.changeFocus(weekDay, 1);
              break;
            }

          case 'ArrowUp':
          case 'Up':
            {
              this.changeFocus(weekDay, -7);
              break;
            }

          case 'ArrowDown':
          case 'Down':
            {
              this.changeFocus(weekDay, 7);
              break;
            }
        }

        if (preventDefault) {
          event.preventDefault();
        }
      },
      changeFocus: function changeFocus(day, inc) {
        var nextDay = new Date(day.getTime());
        nextDay.setDate(day.getDate() + inc);

        while ((!this.minDate || nextDay > this.minDate) && (!this.maxDate || nextDay < this.maxDate) && !this.selectableDate(nextDay)) {
          nextDay.setDate(day.getDate() + Math.sign(inc));
        }

        this.setRangeHoverEndDate(nextDay);
        this.$emit('change-focus', nextDay);
      }
    }
  };

  /* script */
  const __vue_script__$h = script$h;

  /* template */
  var __vue_render__$f = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"datepicker-row"},[(_vm.showWeekNumber)?_c('a',{staticClass:"datepicker-cell is-week-number",class:{'is-clickable': _vm.weekNumberClickable },on:{"click":function($event){$event.preventDefault();_vm.clickWeekNumber(_vm.getWeekNumber(_vm.week[6]));}}},[_c('span',[_vm._v(_vm._s(_vm.getWeekNumber(_vm.week[6])))])]):_vm._e(),_vm._l((_vm.week),function(weekDay,index){return [(_vm.selectableDate(weekDay) && !_vm.disabled)?_c('a',{key:index,ref:("day-" + (weekDay.getMonth()) + "-" + (weekDay.getDate())),refInFor:true,staticClass:"datepicker-cell",class:_vm.classObject(weekDay),attrs:{"role":"button","href":"#","disabled":_vm.disabled,"tabindex":_vm.day === weekDay.getDate() ? null : -1},on:{"click":function($event){$event.preventDefault();return _vm.emitChosenDate(weekDay)},"mouseenter":function($event){return _vm.setRangeHoverEndDate(weekDay)},"keydown":function($event){return _vm.manageKeydown($event, weekDay)}}},[_c('span',[_vm._v(_vm._s(weekDay.getDate()))]),(_vm.eventsDateMatch(weekDay))?_c('div',{staticClass:"events"},_vm._l((_vm.eventsDateMatch(weekDay)),function(event,index){return _c('div',{key:index,staticClass:"event",class:event.type})}),0):_vm._e()]):_c('div',{key:index,staticClass:"datepicker-cell",class:_vm.classObject(weekDay)},[_c('span',[_vm._v(_vm._s(weekDay.getDate()))]),(_vm.eventsDateMatch(weekDay))?_c('div',{staticClass:"events"},_vm._l((_vm.eventsDateMatch(weekDay)),function(event,index){return _c('div',{key:index,staticClass:"event",class:event.type})}),0):_vm._e()])]})],2)};
  var __vue_staticRenderFns__$f = [];

    /* style */
    const __vue_inject_styles__$h = undefined;
    /* scoped */
    const __vue_scope_id__$h = undefined;
    /* module identifier */
    const __vue_module_identifier__$h = undefined;
    /* functional template */
    const __vue_is_functional_template__$h = false;
    /* style inject */
    
    /* style inject SSR */
    

    
    var DatepickerTableRow = normalizeComponent_1(
      { render: __vue_render__$f, staticRenderFns: __vue_staticRenderFns__$f },
      __vue_inject_styles__$h,
      __vue_script__$h,
      __vue_scope_id__$h,
      __vue_is_functional_template__$h,
      __vue_module_identifier__$h,
      undefined,
      undefined
    );

  var script$i = {
    name: 'BDatepickerTable',
    components: _defineProperty({}, DatepickerTableRow.name, DatepickerTableRow),
    props: {
      value: {
        type: [Date, Array]
      },
      dayNames: Array,
      monthNames: Array,
      firstDayOfWeek: Number,
      events: Array,
      indicators: String,
      minDate: Date,
      maxDate: Date,
      focused: Object,
      disabled: Boolean,
      dateCreator: Function,
      unselectableDates: [Array, Function],
      unselectableDaysOfWeek: Array,
      selectableDates: [Array, Function],
      nearbyMonthDays: Boolean,
      nearbySelectableMonthDays: Boolean,
      showWeekNumber: Boolean,
      weekNumberClickable: Boolean,
      rulesForFirstWeek: Number,
      range: Boolean,
      multiple: Boolean
    },
    data: function data() {
      return {
        selectedBeginDate: undefined,
        selectedEndDate: undefined,
        hoveredEndDate: undefined
      };
    },
    computed: {
      multipleSelectedDates: {
        get: function get() {
          return this.multiple && this.value ? this.value : [];
        },
        set: function set(value) {
          this.$emit('input', value);
        }
      },
      visibleDayNames: function visibleDayNames() {
        var visibleDayNames = [];
        var index = this.firstDayOfWeek;

        while (visibleDayNames.length < this.dayNames.length) {
          var currentDayName = this.dayNames[index % this.dayNames.length];
          visibleDayNames.push(currentDayName);
          index++;
        }

        if (this.showWeekNumber) visibleDayNames.unshift('');
        return visibleDayNames;
      },
      hasEvents: function hasEvents() {
        return this.events && this.events.length;
      },

      /*
      * Return array of all events in the specified month
      */
      eventsInThisMonth: function eventsInThisMonth() {
        if (!this.events) return [];
        var monthEvents = [];

        for (var i = 0; i < this.events.length; i++) {
          var event = this.events[i];

          if (!event.hasOwnProperty('date')) {
            event = {
              date: event
            };
          }

          if (!event.hasOwnProperty('type')) {
            event.type = 'is-primary';
          }

          if (event.date.getMonth() === this.focused.month && event.date.getFullYear() === this.focused.year) {
            monthEvents.push(event);
          }
        }

        return monthEvents;
      },

      /*
      * Return array of all weeks in the specified month
      */
      weeksInThisMonth: function weeksInThisMonth() {
        this.validateFocusedDay();
        var month = this.focused.month;
        var year = this.focused.year;
        var weeksInThisMonth = [];
        var startingDay = 1;

        while (weeksInThisMonth.length < 6) {
          var newWeek = this.weekBuilder(startingDay, month, year);
          weeksInThisMonth.push(newWeek);
          startingDay += 7;
        }

        return weeksInThisMonth;
      },
      hoveredDateRange: function hoveredDateRange() {
        if (!this.range) {
          return [];
        }

        if (!isNaN(this.selectedEndDate)) {
          return [];
        }

        if (this.hoveredEndDate < this.selectedBeginDate) {
          return [this.hoveredEndDate, this.selectedBeginDate].filter(isDefined);
        }

        return [this.selectedBeginDate, this.hoveredEndDate].filter(isDefined);
      }
    },
    methods: {
      /*
      * Emit input event with selected date as payload for v-model in parent
      */
      updateSelectedDate: function updateSelectedDate(date) {
        if (!this.range && !this.multiple) {
          this.$emit('input', date);
        } else if (this.range) {
          this.handleSelectRangeDate(date);
        } else if (this.multiple) {
          this.handleSelectMultipleDates(date);
        }
      },

      /*
      * If both begin and end dates are set, reset the end date and set the begin date.
      * If only begin date is selected, emit an array of the begin date and the new date.
      * If not set, only set the begin date.
      */
      handleSelectRangeDate: function handleSelectRangeDate(date) {
        if (this.selectedBeginDate && this.selectedEndDate) {
          this.selectedBeginDate = date;
          this.selectedEndDate = undefined;
          this.$emit('range-start', date);
        } else if (this.selectedBeginDate && !this.selectedEndDate) {
          if (this.selectedBeginDate > date) {
            this.selectedEndDate = this.selectedBeginDate;
            this.selectedBeginDate = date;
          } else {
            this.selectedEndDate = date;
          }

          this.$emit('range-end', date);
          this.$emit('input', [this.selectedBeginDate, this.selectedEndDate]);
        } else {
          this.selectedBeginDate = date;
          this.$emit('range-start', date);
        }
      },

      /*
      * If selected date already exists list of selected dates, remove it from the list
      * Otherwise, add date to list of selected dates
      */
      handleSelectMultipleDates: function handleSelectMultipleDates(date) {
        var multipleSelect = this.multipleSelectedDates.filter(function (selectedDate) {
          return selectedDate.getDate() === date.getDate() && selectedDate.getFullYear() === date.getFullYear() && selectedDate.getMonth() === date.getMonth();
        });

        if (multipleSelect.length) {
          this.multipleSelectedDates = this.multipleSelectedDates.filter(function (selectedDate) {
            return selectedDate.getDate() !== date.getDate() || selectedDate.getFullYear() !== date.getFullYear() || selectedDate.getMonth() !== date.getMonth();
          });
        } else {
          this.multipleSelectedDates = [].concat(_toConsumableArray(this.multipleSelectedDates), [date]);
        }
      },

      /*
       * Return array of all days in the week that the startingDate is within
       */
      weekBuilder: function weekBuilder(startingDate, month, year) {
        var thisMonth = new Date(year, month);
        var thisWeek = [];
        var dayOfWeek = new Date(year, month, startingDate).getDay();
        var end = dayOfWeek >= this.firstDayOfWeek ? dayOfWeek - this.firstDayOfWeek : 7 - this.firstDayOfWeek + dayOfWeek;
        var daysAgo = 1;

        for (var i = 0; i < end; i++) {
          thisWeek.unshift(new Date(thisMonth.getFullYear(), thisMonth.getMonth(), startingDate - daysAgo));
          daysAgo++;
        }

        thisWeek.push(new Date(year, month, startingDate));
        var daysForward = 1;

        while (thisWeek.length < 7) {
          thisWeek.push(new Date(year, month, startingDate + daysForward));
          daysForward++;
        }

        return thisWeek;
      },
      validateFocusedDay: function validateFocusedDay() {
        var focusedDate = new Date(this.focused.year, this.focused.month, this.focused.day);
        if (this.selectableDate(focusedDate)) return;
        var day = 0; // Number of days in the current month

        var monthDays = new Date(this.focused.year, this.focused.month + 1, 0).getDate();
        var firstFocusable = null;

        while (!firstFocusable && ++day < monthDays) {
          var date = new Date(this.focused.year, this.focused.month, day);

          if (this.selectableDate(date)) {
            firstFocusable = focusedDate;
            var focused = {
              day: date.getDate(),
              month: date.getMonth(),
              year: date.getFullYear()
            };
            this.$emit('update:focused', focused);
          }
        }
      },

      /*
       * Check that selected day is within earliest/latest params and
       * is within this month
       */
      selectableDate: function selectableDate(day) {
        var validity = [];

        if (this.minDate) {
          validity.push(day >= this.minDate);
        }

        if (this.maxDate) {
          validity.push(day <= this.maxDate);
        }

        if (this.nearbyMonthDays && !this.nearbySelectableMonthDays) {
          validity.push(day.getMonth() === this.focused.month);
        }

        if (this.selectableDates) {
          if (typeof this.selectableDates === 'function') {
            if (this.selectableDates(day)) {
              return true;
            } else {
              validity.push(false);
            }
          } else {
            for (var i = 0; i < this.selectableDates.length; i++) {
              var enabledDate = this.selectableDates[i];

              if (day.getDate() === enabledDate.getDate() && day.getFullYear() === enabledDate.getFullYear() && day.getMonth() === enabledDate.getMonth()) {
                return true;
              } else {
                validity.push(false);
              }
            }
          }
        }

        if (this.unselectableDates) {
          if (typeof this.unselectableDates === 'function') {
            validity.push(!this.unselectableDates(day));
          } else {
            for (var _i = 0; _i < this.unselectableDates.length; _i++) {
              var disabledDate = this.unselectableDates[_i];
              validity.push(day.getDate() !== disabledDate.getDate() || day.getFullYear() !== disabledDate.getFullYear() || day.getMonth() !== disabledDate.getMonth());
            }
          }
        }

        if (this.unselectableDaysOfWeek) {
          for (var _i2 = 0; _i2 < this.unselectableDaysOfWeek.length; _i2++) {
            var dayOfWeek = this.unselectableDaysOfWeek[_i2];
            validity.push(day.getDay() !== dayOfWeek);
          }
        }

        return validity.indexOf(false) < 0;
      },
      eventsInThisWeek: function eventsInThisWeek(week) {
        return this.eventsInThisMonth.filter(function (event) {
          var stripped = new Date(Date.parse(event.date));
          stripped.setHours(0, 0, 0, 0);
          var timed = stripped.getTime();
          return week.some(function (weekDate) {
            return weekDate.getTime() === timed;
          });
        });
      },
      setRangeHoverEndDate: function setRangeHoverEndDate(day) {
        this.hoveredEndDate = day;
      },
      changeFocus: function changeFocus(day) {
        var focused = {
          day: day.getDate(),
          month: day.getMonth(),
          year: day.getFullYear()
        };
        this.$emit('update:focused', focused);
      }
    }
  };

  /* script */
  const __vue_script__$i = script$i;

  /* template */
  var __vue_render__$g = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('section',{staticClass:"datepicker-table"},[_c('header',{staticClass:"datepicker-header"},_vm._l((_vm.visibleDayNames),function(day,index){return _c('div',{key:index,staticClass:"datepicker-cell"},[_c('span',[_vm._v(_vm._s(day))])])}),0),_c('div',{staticClass:"datepicker-body",class:{'has-events':_vm.hasEvents}},_vm._l((_vm.weeksInThisMonth),function(week,index){return _c('b-datepicker-table-row',{key:index,attrs:{"selected-date":_vm.value,"day":_vm.focused.day,"week":week,"month":_vm.focused.month,"min-date":_vm.minDate,"max-date":_vm.maxDate,"disabled":_vm.disabled,"unselectable-dates":_vm.unselectableDates,"unselectable-days-of-week":_vm.unselectableDaysOfWeek,"selectable-dates":_vm.selectableDates,"events":_vm.eventsInThisWeek(week),"indicators":_vm.indicators,"date-creator":_vm.dateCreator,"nearby-month-days":_vm.nearbyMonthDays,"nearby-selectable-month-days":_vm.nearbySelectableMonthDays,"show-week-number":_vm.showWeekNumber,"week-number-clickable":_vm.weekNumberClickable,"first-day-of-week":_vm.firstDayOfWeek,"rules-for-first-week":_vm.rulesForFirstWeek,"range":_vm.range,"hovered-date-range":_vm.hoveredDateRange,"multiple":_vm.multiple},on:{"select":_vm.updateSelectedDate,"rangeHoverEndDate":_vm.setRangeHoverEndDate,"change-focus":_vm.changeFocus}})}),1)])};
  var __vue_staticRenderFns__$g = [];

    /* style */
    const __vue_inject_styles__$i = undefined;
    /* scoped */
    const __vue_scope_id__$i = undefined;
    /* module identifier */
    const __vue_module_identifier__$i = undefined;
    /* functional template */
    const __vue_is_functional_template__$i = false;
    /* style inject */
    
    /* style inject SSR */
    

    
    var DatepickerTable = normalizeComponent_1(
      { render: __vue_render__$g, staticRenderFns: __vue_staticRenderFns__$g },
      __vue_inject_styles__$i,
      __vue_script__$i,
      __vue_scope_id__$i,
      __vue_is_functional_template__$i,
      __vue_module_identifier__$i,
      undefined,
      undefined
    );

  //
  var script$j = {
    name: 'BDatepickerMonth',
    props: {
      value: {
        type: [Date, Array]
      },
      monthNames: Array,
      events: Array,
      indicators: String,
      minDate: Date,
      maxDate: Date,
      focused: Object,
      disabled: Boolean,
      dateCreator: Function,
      unselectableDates: [Array, Function],
      unselectableDaysOfWeek: Array,
      selectableDates: [Array, Function],
      range: Boolean,
      multiple: Boolean
    },
    data: function data() {
      return {
        selectedBeginDate: undefined,
        selectedEndDate: undefined,
        hoveredEndDate: undefined,
        multipleSelectedDates: this.multiple && this.value ? this.value : []
      };
    },
    computed: {
      hasEvents: function hasEvents() {
        return this.events && this.events.length;
      },

      /*
      * Return array of all events in the specified month
      */
      eventsInThisYear: function eventsInThisYear() {
        if (!this.events) return [];
        var yearEvents = [];

        for (var i = 0; i < this.events.length; i++) {
          var event = this.events[i];

          if (!event.hasOwnProperty('date')) {
            event = {
              date: event
            };
          }

          if (!event.hasOwnProperty('type')) {
            event.type = 'is-primary';
          }

          if (event.date.getFullYear() === this.focused.year) {
            yearEvents.push(event);
          }
        }

        return yearEvents;
      },
      monthDates: function monthDates() {
        var year = this.focused.year;
        var months = [];

        for (var i = 0; i < 12; i++) {
          var d = new Date(year, i, 1);
          d.setHours(0, 0, 0, 0);
          months.push(d);
        }

        return months;
      },
      focusedMonth: function focusedMonth() {
        return this.focused.month;
      },
      hoveredDateRange: function hoveredDateRange() {
        if (!this.range) {
          return [];
        }

        if (!isNaN(this.selectedEndDate)) {
          return [];
        }

        if (this.hoveredEndDate < this.selectedBeginDate) {
          return [this.hoveredEndDate, this.selectedBeginDate].filter(isDefined);
        }

        return [this.selectedBeginDate, this.hoveredEndDate].filter(isDefined);
      }
    },
    watch: {
      focusedMonth: function focusedMonth(month) {
        var _this = this;

        var refName = "month-".concat(month);

        if (this.$refs[refName] && this.$refs[refName].length > 0) {
          this.$nextTick(function () {
            if (_this.$refs[refName][0]) {
              _this.$refs[refName][0].focus();
            }
          }); // $nextTick needed when year is changed
        }
      }
    },
    methods: {
      selectMultipleDates: function selectMultipleDates(date) {
        var multipleSelect = this.multipleSelectedDates.filter(function (selectedDate) {
          return selectedDate.getDate() === date.getDate() && selectedDate.getFullYear() === date.getFullYear() && selectedDate.getMonth() === date.getMonth();
        });

        if (multipleSelect.length) {
          this.multipleSelectedDates = this.multipleSelectedDates.filter(function (selectedDate) {
            return selectedDate.getDate() !== date.getDate() || selectedDate.getFullYear() !== date.getFullYear() || selectedDate.getMonth() !== date.getMonth();
          });
        } else {
          this.multipleSelectedDates.push(date);
        }

        this.$emit('input', this.multipleSelectedDates);
      },
      selectableDate: function selectableDate(day) {
        var validity = [];

        if (this.minDate) {
          validity.push(day >= this.minDate);
        }

        if (this.maxDate) {
          validity.push(day <= this.maxDate);
        }

        validity.push(day.getFullYear() === this.focused.year);

        if (this.selectableDates) {
          if (typeof this.selectableDates === 'function') {
            if (this.selectableDates(day)) {
              return true;
            } else {
              validity.push(false);
            }
          } else {
            for (var i = 0; i < this.selectableDates.length; i++) {
              var enabledDate = this.selectableDates[i];

              if (day.getFullYear() === enabledDate.getFullYear() && day.getMonth() === enabledDate.getMonth()) {
                return true;
              } else {
                validity.push(false);
              }
            }
          }
        }

        if (this.unselectableDates) {
          if (typeof this.unselectableDates === 'function') {
            validity.push(!this.unselectableDates(day));
          } else {
            for (var _i = 0; _i < this.unselectableDates.length; _i++) {
              var disabledDate = this.unselectableDates[_i];
              validity.push(day.getFullYear() !== disabledDate.getFullYear() || day.getMonth() !== disabledDate.getMonth());
            }
          }
        }

        if (this.unselectableDaysOfWeek) {
          for (var _i2 = 0; _i2 < this.unselectableDaysOfWeek.length; _i2++) {
            var dayOfWeek = this.unselectableDaysOfWeek[_i2];
            validity.push(day.getDay() !== dayOfWeek);
          }
        }

        return validity.indexOf(false) < 0;
      },
      eventsDateMatch: function eventsDateMatch(day) {
        if (!this.eventsInThisYear.length) return false;
        var monthEvents = [];

        for (var i = 0; i < this.eventsInThisYear.length; i++) {
          if (this.eventsInThisYear[i].date.getMonth() === day.getMonth()) {
            monthEvents.push(this.events[i]);
          }
        }

        if (!monthEvents.length) {
          return false;
        }

        return monthEvents;
      },

      /*
      * Build classObject for cell using validations
      */
      classObject: function classObject(day) {
        function dateMatch(dateOne, dateTwo, multiple) {
          // if either date is null or undefined, return false
          if (!dateOne || !dateTwo || multiple) {
            return false;
          }

          if (Array.isArray(dateTwo)) {
            return dateTwo.some(function (date) {
              return dateOne.getFullYear() === date.getFullYear() && dateOne.getMonth() === date.getMonth();
            });
          }

          return dateOne.getFullYear() === dateTwo.getFullYear() && dateOne.getMonth() === dateTwo.getMonth();
        }

        function dateWithin(dateOne, dates, multiple) {
          if (!Array.isArray(dates) || multiple) {
            return false;
          }

          return dateOne > dates[0] && dateOne < dates[1];
        }

        function dateMultipleSelected(dateOne, dates, multiple) {
          if (!Array.isArray(dates) || !multiple) {
            return false;
          }

          return dates.some(function (date) {
            return dateOne.getDate() === date.getDate() && dateOne.getFullYear() === date.getFullYear() && dateOne.getMonth() === date.getMonth();
          });
        }

        return {
          'is-selected': dateMatch(day, this.value, this.multiple) || dateWithin(day, this.value, this.multiple) || dateMultipleSelected(day, this.multipleSelectedDates, this.multiple),
          'is-first-selected': dateMatch(day, Array.isArray(this.value) && this.value[0], this.multiple),
          'is-within-selected': dateWithin(day, this.value, this.multiple),
          'is-last-selected': dateMatch(day, Array.isArray(this.value) && this.value[1], this.multiple),
          'is-within-hovered-range': this.hoveredDateRange && this.hoveredDateRange.length === 2 && (dateMatch(day, this.hoveredDateRange) || dateWithin(day, this.hoveredDateRange)),
          'is-first-hovered': dateMatch(day, Array.isArray(this.hoveredDateRange) && this.hoveredDateRange[0]),
          'is-within-hovered': dateWithin(day, this.hoveredDateRange),
          'is-last-hovered': dateMatch(day, Array.isArray(this.hoveredDateRange) && this.hoveredDateRange[1]),
          'is-today': dateMatch(day, this.dateCreator()),
          'is-selectable': this.selectableDate(day) && !this.disabled,
          'is-unselectable': !this.selectableDate(day) || this.disabled
        };
      },
      manageKeydown: function manageKeydown(_ref, date) {
        var key = _ref.key;

        // https://developer.mozilla.org/fr/docs/Web/API/KeyboardEvent/key/Key_Values#Navigation_keys
        switch (key) {
          case ' ':
          case 'Space':
          case 'Spacebar':
          case 'Enter':
            {
              this.updateSelectedDate(date);
              break;
            }

          case 'ArrowLeft':
          case 'Left':
            {
              this.changeFocus(date, -1);
              break;
            }

          case 'ArrowRight':
          case 'Right':
            {
              this.changeFocus(date, 1);
              break;
            }

          case 'ArrowUp':
          case 'Up':
            {
              this.changeFocus(date, -3);
              break;
            }

          case 'ArrowDown':
          case 'Down':
            {
              this.changeFocus(date, 3);
              break;
            }
        }
      },

      /*
      * Emit input event with selected date as payload for v-model in parent
      */
      updateSelectedDate: function updateSelectedDate(date) {
        if (!this.range && !this.multiple) {
          this.emitChosenDate(date);
        } else if (this.range) {
          this.handleSelectRangeDate(date);
        } else if (this.multiple) {
          this.selectMultipleDates(date);
        }
      },

      /*
       * Emit select event with chosen date as payload
       */
      emitChosenDate: function emitChosenDate(day) {
        if (this.disabled) return;

        if (!this.multiple) {
          if (this.selectableDate(day)) {
            this.$emit('input', day);
          }
        } else {
          this.selectMultipleDates(day);
        }
      },

      /*
      * If both begin and end dates are set, reset the end date and set the begin date.
      * If only begin date is selected, emit an array of the begin date and the new date.
      * If not set, only set the begin date.
      */
      handleSelectRangeDate: function handleSelectRangeDate(date) {
        if (this.disabled) return;

        if (this.selectedBeginDate && this.selectedEndDate) {
          this.selectedBeginDate = date;
          this.selectedEndDate = undefined;
          this.$emit('range-start', date);
        } else if (this.selectedBeginDate && !this.selectedEndDate) {
          if (this.selectedBeginDate > date) {
            this.selectedEndDate = this.selectedBeginDate;
            this.selectedBeginDate = date;
          } else {
            this.selectedEndDate = date;
          }

          this.$emit('range-end', date);
          this.$emit('input', [this.selectedBeginDate, this.selectedEndDate]);
        } else {
          this.selectedBeginDate = date;
          this.$emit('range-start', date);
        }
      },
      setRangeHoverEndDate: function setRangeHoverEndDate(day) {
        if (this.range) {
          this.hoveredEndDate = day;
        }
      },
      changeFocus: function changeFocus(month, inc) {
        var nextMonth = month;
        nextMonth.setMonth(month.getMonth() + inc);
        this.$emit('change-focus', nextMonth);
      }
    }
  };

  /* script */
  const __vue_script__$j = script$j;

  /* template */
  var __vue_render__$h = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('section',{staticClass:"datepicker-table"},[_c('div',{staticClass:"datepicker-body",class:{'has-events':_vm.hasEvents}},[_c('div',{staticClass:"datepicker-months"},[_vm._l((_vm.monthDates),function(date,index){return [(_vm.selectableDate(date) && !_vm.disabled)?_c('a',{key:index,ref:("month-" + (date.getMonth())),refInFor:true,staticClass:"datepicker-cell",class:[
                          _vm.classObject(date),
                          {'has-event': _vm.eventsDateMatch(date)},
                          _vm.indicators
                      ],attrs:{"role":"button","href":"#","disabled":_vm.disabled,"tabindex":_vm.focused.month === date.getMonth() ? null : -1},on:{"click":function($event){$event.preventDefault();return _vm.updateSelectedDate(date)},"mouseenter":function($event){return _vm.setRangeHoverEndDate(date)},"keydown":function($event){$event.preventDefault();return _vm.manageKeydown($event, date)}}},[_vm._v(" "+_vm._s(_vm.monthNames[date.getMonth()])+" "),(_vm.eventsDateMatch(date))?_c('div',{staticClass:"events"},_vm._l((_vm.eventsDateMatch(date)),function(event,index){return _c('div',{key:index,staticClass:"event",class:event.type})}),0):_vm._e()]):_c('div',{key:index,staticClass:"datepicker-cell",class:_vm.classObject(date)},[_vm._v(" "+_vm._s(_vm.monthNames[date.getMonth()])+" ")])]})],2)])])};
  var __vue_staticRenderFns__$h = [];

    /* style */
    const __vue_inject_styles__$j = undefined;
    /* scoped */
    const __vue_scope_id__$j = undefined;
    /* module identifier */
    const __vue_module_identifier__$j = undefined;
    /* functional template */
    const __vue_is_functional_template__$j = false;
    /* style inject */
    
    /* style inject SSR */
    

    
    var DatepickerMonth = normalizeComponent_1(
      { render: __vue_render__$h, staticRenderFns: __vue_staticRenderFns__$h },
      __vue_inject_styles__$j,
      __vue_script__$j,
      __vue_scope_id__$j,
      __vue_is_functional_template__$j,
      __vue_module_identifier__$j,
      undefined,
      undefined
    );

  var _components$1;

  var defaultDateFormatter = function defaultDateFormatter(date, vm) {
    var targetDates = Array.isArray(date) ? date : [date];
    var dates = targetDates.map(function (date) {
      var d = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 12);
      return !vm.isTypeMonth ? vm.dtf.format(d) : vm.dtfMonth.format(d);
    });
    return !vm.multiple ? dates.join(' - ') : dates.join(', ');
  };

  var defaultDateParser = function defaultDateParser(date, vm) {
    if (vm.dtf.formatToParts && typeof vm.dtf.formatToParts === 'function') {
      var formatRegex = (vm.isTypeMonth ? vm.dtfMonth : vm.dtf).formatToParts(new Date(2000, 11, 25)).map(function (part) {
        if (part.type === 'literal') {
          return part.value;
        }

        return "((?!=<".concat(part.type, ">)\\d+)");
      }).join('');
      var dateGroups = matchWithGroups(formatRegex, date); // We do a simple validation for the group.
      // If it is not valid, it will fallback to Date.parse below

      if (dateGroups.year && dateGroups.year.length === 4 && dateGroups.month && dateGroups.month <= 12) {
        if (vm.isTypeMonth) return new Date(dateGroups.year, dateGroups.month - 1);else if (dateGroups.day && dateGroups.day <= 31) {
          return new Date(dateGroups.year, dateGroups.month - 1, dateGroups.day, 12);
        }
      }
    } // Fallback if formatToParts is not supported or if we were not able to parse a valid date


    if (!vm.isTypeMonth) return new Date(Date.parse(date));

    if (date) {
      var s = date.split('/');
      var year = s[0].length === 4 ? s[0] : s[1];
      var month = s[0].length === 2 ? s[0] : s[1];

      if (year && month) {
        return new Date(parseInt(year, 10), parseInt(month - 1, 10), 1, 0, 0, 0, 0);
      }
    }

    return null;
  };

  var script$k = {
    name: 'BDatepicker',
    components: (_components$1 = {}, _defineProperty(_components$1, DatepickerTable.name, DatepickerTable), _defineProperty(_components$1, DatepickerMonth.name, DatepickerMonth), _defineProperty(_components$1, Input.name, Input), _defineProperty(_components$1, Field.name, Field), _defineProperty(_components$1, Select.name, Select), _defineProperty(_components$1, Icon.name, Icon), _defineProperty(_components$1, Dropdown.name, Dropdown), _defineProperty(_components$1, DropdownItem.name, DropdownItem), _components$1),
    mixins: [FormElementMixin],
    inheritAttrs: false,
    provide: function provide() {
      return {
        $datepicker: this
      };
    },
    props: {
      value: {
        type: [Date, Array]
      },
      dayNames: {
        type: Array,
        default: function _default() {
          if (!Array.isArray(config.defaultDayNames)) {
            return undefined;
          }

          return config.defaultDayNames;
        }
      },
      monthNames: {
        type: Array,
        default: function _default() {
          if (!Array.isArray(config.defaultMonthNames)) {
            return undefined;
          }

          return config.defaultMonthNames;
        }
      },
      firstDayOfWeek: {
        type: Number,
        default: function _default() {
          if (typeof config.defaultFirstDayOfWeek === 'number') {
            return config.defaultFirstDayOfWeek;
          } else {
            return 0;
          }
        }
      },
      inline: Boolean,
      minDate: Date,
      maxDate: Date,
      focusedDate: Date,
      placeholder: String,
      editable: Boolean,
      disabled: Boolean,
      horizontalTimePicker: Boolean,
      unselectableDates: [Array, Function],
      unselectableDaysOfWeek: {
        type: Array,
        default: function _default() {
          return config.defaultUnselectableDaysOfWeek;
        }
      },
      selectableDates: [Array, Function],
      dateFormatter: {
        type: Function,
        default: function _default(date, vm) {
          if (typeof config.defaultDateFormatter === 'function') {
            return config.defaultDateFormatter(date);
          } else {
            return defaultDateFormatter(date, vm);
          }
        }
      },
      dateParser: {
        type: Function,
        default: function _default(date, vm) {
          if (typeof config.defaultDateParser === 'function') {
            return config.defaultDateParser(date);
          } else {
            return defaultDateParser(date, vm);
          }
        }
      },
      dateCreator: {
        type: Function,
        default: function _default() {
          if (typeof config.defaultDateCreator === 'function') {
            return config.defaultDateCreator();
          } else {
            return new Date();
          }
        }
      },
      mobileNative: {
        type: Boolean,
        default: function _default() {
          return config.defaultDatepickerMobileNative;
        }
      },
      position: String,
      iconRight: String,
      events: Array,
      indicators: {
        type: String,
        default: 'dots'
      },
      openOnFocus: Boolean,
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
      yearsRange: {
        type: Array,
        default: function _default() {
          return config.defaultDatepickerYearsRange;
        }
      },
      type: {
        type: String,
        validator: function validator(value) {
          return ['month'].indexOf(value) >= 0;
        }
      },
      nearbyMonthDays: {
        type: Boolean,
        default: function _default() {
          return config.defaultDatepickerNearbyMonthDays;
        }
      },
      nearbySelectableMonthDays: {
        type: Boolean,
        default: function _default() {
          return config.defaultDatepickerNearbySelectableMonthDays;
        }
      },
      showWeekNumber: {
        type: Boolean,
        default: function _default() {
          return config.defaultDatepickerShowWeekNumber;
        }
      },
      weekNumberClickable: {
        type: Boolean,
        default: function _default() {
          return config.defaultDatepickerWeekNumberClickable;
        }
      },
      rulesForFirstWeek: {
        type: Number,
        default: function _default() {
          return 4;
        }
      },
      range: {
        type: Boolean,
        default: false
      },
      closeOnClick: {
        type: Boolean,
        default: true
      },
      multiple: {
        type: Boolean,
        default: false
      },
      mobileModal: {
        type: Boolean,
        default: function _default() {
          return config.defaultDatepickerMobileModal;
        }
      },
      focusable: {
        type: Boolean,
        default: true
      },
      trapFocus: {
        type: Boolean,
        default: function _default() {
          return config.defaultTrapFocus;
        }
      },
      appendToBody: Boolean,
      ariaNextLabel: String,
      ariaPreviousLabel: String
    },
    data: function data() {
      var focusedDate = (Array.isArray(this.value) ? this.value[0] : this.value) || this.focusedDate || this.dateCreator();

      if (!this.value && this.maxDate && this.maxDate.getFullYear() < focusedDate.getFullYear()) {
        focusedDate.setFullYear(this.maxDate.getFullYear());
      }

      return {
        dateSelected: this.value,
        focusedDateData: {
          day: focusedDate.getDate(),
          month: focusedDate.getMonth(),
          year: focusedDate.getFullYear()
        },
        _elementRef: 'input',
        _isDatepicker: true
      };
    },
    computed: {
      computedValue: {
        get: function get() {
          return this.dateSelected;
        },
        set: function set(value) {
          var _this = this;

          this.updateInternalState(value);
          if (!this.multiple) this.togglePicker(false);
          this.$emit('input', value);

          if (this.useHtml5Validation) {
            this.$nextTick(function () {
              _this.checkHtml5Validity();
            });
          }
        }
      },
      formattedValue: function formattedValue() {
        return this.formatValue(this.computedValue);
      },
      localeOptions: function localeOptions() {
        return new Intl.DateTimeFormat(this.locale, {
          year: 'numeric',
          month: 'numeric'
        }).resolvedOptions();
      },
      dtf: function dtf() {
        return new Intl.DateTimeFormat(this.locale, {
          timeZone: 'UTC'
        });
      },
      dtfMonth: function dtfMonth() {
        return new Intl.DateTimeFormat(this.locale, {
          year: this.localeOptions.year || 'numeric',
          month: this.localeOptions.month || '2-digit',
          timeZone: 'UTC'
        });
      },
      newMonthNames: function newMonthNames() {
        if (Array.isArray(this.monthNames)) {
          return this.monthNames;
        }

        return getMonthNames(this.locale);
      },
      newDayNames: function newDayNames() {
        if (Array.isArray(this.dayNames)) {
          return this.dayNames;
        }

        return getWeekdayNames(this.locale);
      },
      listOfMonths: function listOfMonths() {
        var minMonth = 0;
        var maxMonth = 12;

        if (this.minDate && this.focusedDateData.year === this.minDate.getFullYear()) {
          minMonth = this.minDate.getMonth();
        }

        if (this.maxDate && this.focusedDateData.year === this.maxDate.getFullYear()) {
          maxMonth = this.maxDate.getMonth();
        }

        return this.newMonthNames.map(function (name, index) {
          return {
            name: name,
            index: index,
            disabled: index < minMonth || index > maxMonth
          };
        });
      },

      /*
       * Returns an array of years for the year dropdown. If earliest/latest
       * dates are set by props, range of years will fall within those dates.
       */
      listOfYears: function listOfYears() {
        var latestYear = this.focusedDateData.year + this.yearsRange[1];

        if (this.maxDate && this.maxDate.getFullYear() < latestYear) {
          latestYear = Math.max(this.maxDate.getFullYear(), this.focusedDateData.year);
        }

        var earliestYear = this.focusedDateData.year + this.yearsRange[0];

        if (this.minDate && this.minDate.getFullYear() > earliestYear) {
          earliestYear = Math.min(this.minDate.getFullYear(), this.focusedDateData.year);
        }

        var arrayOfYears = [];

        for (var i = earliestYear; i <= latestYear; i++) {
          arrayOfYears.push(i);
        }

        return arrayOfYears.reverse();
      },
      showPrev: function showPrev() {
        if (!this.minDate) return false;

        if (this.isTypeMonth) {
          return this.focusedDateData.year <= this.minDate.getFullYear();
        }

        var dateToCheck = new Date(this.focusedDateData.year, this.focusedDateData.month);
        var date = new Date(this.minDate.getFullYear(), this.minDate.getMonth());
        return dateToCheck <= date;
      },
      showNext: function showNext() {
        if (!this.maxDate) return false;

        if (this.isTypeMonth) {
          return this.focusedDateData.year >= this.maxDate.getFullYear();
        }

        var dateToCheck = new Date(this.focusedDateData.year, this.focusedDateData.month);
        var date = new Date(this.maxDate.getFullYear(), this.maxDate.getMonth());
        return dateToCheck >= date;
      },
      isMobile: function isMobile$1() {
        return this.mobileNative && isMobile.any();
      },
      isTypeMonth: function isTypeMonth() {
        return this.type === 'month';
      },
      ariaRole: function ariaRole() {
        if (!this.inline) {
          return 'dialog';
        }
      }
    },
    watch: {
      /**
       * When v-model is changed:
       *   1. Update internal value.
       *   2. If it's invalid, validate again.
       */
      value: function value(_value) {
        this.updateInternalState(_value);
        if (!this.multiple) this.togglePicker(false);
      },
      focusedDate: function focusedDate(value) {
        if (value) {
          this.focusedDateData = {
            day: value.getDate(),
            month: value.getMonth(),
            year: value.getFullYear()
          };
        }
      },

      /*
       * Emit input event on month and/or year change
       */
      'focusedDateData.month': function focusedDateDataMonth(value) {
        this.$emit('change-month', value);
      },
      'focusedDateData.year': function focusedDateDataYear(value) {
        this.$emit('change-year', value);
      }
    },
    methods: {
      /*
       * Parse string into date
       */
      onChange: function onChange(value) {
        var date = this.dateParser(value, this);

        if (date && (!isNaN(date) || Array.isArray(date) && date.length === 2 && !isNaN(date[0]) && !isNaN(date[1]))) {
          this.computedValue = date;
        } else {
          // Force refresh input value when not valid date
          this.computedValue = null;

          if (this.$refs.input) {
            this.$refs.input.newValue = this.computedValue;
          }
        }
      },

      /*
       * Format date into string
       */
      formatValue: function formatValue(value) {
        if (Array.isArray(value)) {
          var isArrayWithValidDates = Array.isArray(value) && value.every(function (v) {
            return !isNaN(v);
          });
          return isArrayWithValidDates ? this.dateFormatter(_toConsumableArray(value), this) : null;
        }

        return value && !isNaN(value) ? this.dateFormatter(value, this) : null;
      },

      /*
       * Either decrement month by 1 if not January or decrement year by 1
       * and set month to 11 (December) or decrement year when 'month'
       */
      prev: function prev() {
        if (this.disabled) return;

        if (this.isTypeMonth) {
          this.focusedDateData.year -= 1;
        } else {
          if (this.focusedDateData.month > 0) {
            this.focusedDateData.month -= 1;
          } else {
            this.focusedDateData.month = 11;
            this.focusedDateData.year -= 1;
          }
        }
      },

      /*
       * Either increment month by 1 if not December or increment year by 1
       * and set month to 0 (January) or increment year when 'month'
       */
      next: function next() {
        if (this.disabled) return;

        if (this.isTypeMonth) {
          this.focusedDateData.year += 1;
        } else {
          if (this.focusedDateData.month < 11) {
            this.focusedDateData.month += 1;
          } else {
            this.focusedDateData.month = 0;
            this.focusedDateData.year += 1;
          }
        }
      },
      formatNative: function formatNative(value) {
        return this.isTypeMonth ? this.formatYYYYMM(value) : this.formatYYYYMMDD(value);
      },

      /*
       * Format date into string 'YYYY-MM-DD'
       */
      formatYYYYMMDD: function formatYYYYMMDD(value) {
        var date = new Date(value);

        if (value && !isNaN(date)) {
          var year = date.getFullYear();
          var month = date.getMonth() + 1;
          var day = date.getDate();
          return year + '-' + ((month < 10 ? '0' : '') + month) + '-' + ((day < 10 ? '0' : '') + day);
        }

        return '';
      },

      /*
       * Format date into string 'YYYY-MM'
       */
      formatYYYYMM: function formatYYYYMM(value) {
        var date = new Date(value);

        if (value && !isNaN(date)) {
          var year = date.getFullYear();
          var month = date.getMonth() + 1;
          return year + '-' + ((month < 10 ? '0' : '') + month);
        }

        return '';
      },

      /*
       * Parse date from string
       */
      onChangeNativePicker: function onChangeNativePicker(event) {
        var date = event.target.value;
        var s = date ? date.split('-') : [];

        if (s.length === 3) {
          var year = parseInt(s[0], 10);
          var month = parseInt(s[1]) - 1;
          var day = parseInt(s[2]);
          this.computedValue = new Date(year, month, day);
        } else {
          this.computedValue = null;
        }
      },
      updateInternalState: function updateInternalState(value) {
        var currentDate = Array.isArray(value) ? !value.length ? this.dateCreator() : value[value.length - 1] : !value ? this.dateCreator() : value;
        this.focusedDateData = {
          day: currentDate.getDate(),
          month: currentDate.getMonth(),
          year: currentDate.getFullYear()
        };
        this.dateSelected = value;
      },

      /*
       * Toggle datepicker
       */
      togglePicker: function togglePicker(active) {
        if (this.$refs.dropdown) {
          var isActive = typeof active === 'boolean' ? active : !this.$refs.dropdown.isActive;

          if (isActive) {
            this.$refs.dropdown.isActive = isActive;
          } else if (this.closeOnClick) {
            this.$refs.dropdown.isActive = isActive;
          }
        }
      },

      /*
       * Call default onFocus method and show datepicker
       */
      handleOnFocus: function handleOnFocus(event) {
        this.onFocus(event);

        if (this.openOnFocus) {
          this.togglePicker(true);
        }
      },

      /*
       * Toggle dropdown
       */
      toggle: function toggle() {
        if (this.mobileNative && this.isMobile) {
          var input = this.$refs.input.$refs.input;
          input.focus();
          input.click();
          return;
        }

        this.$refs.dropdown.toggle();
      },

      /*
       * Avoid dropdown toggle when is already visible
       */
      onInputClick: function onInputClick(event) {
        if (this.$refs.dropdown.isActive) {
          event.stopPropagation();
        }
      },

      /**
       * Keypress event that is bound to the document.
       */
      keyPress: function keyPress(_ref) {
        var key = _ref.key;

        if (this.$refs.dropdown && this.$refs.dropdown.isActive && (key === 'Escape' || key === 'Esc')) {
          this.togglePicker(false);
        }
      },

      /**
       * Emit 'blur' event on dropdown is not active (closed)
       */
      onActiveChange: function onActiveChange(value) {
        if (!value) {
          this.onBlur();
        }
      },
      changeFocus: function changeFocus(day) {
        this.focusedDateData = {
          day: day.getDate(),
          month: day.getMonth(),
          year: day.getFullYear()
        };
      }
    },
    created: function created() {
      if (typeof window !== 'undefined') {
        document.addEventListener('keyup', this.keyPress);
      }
    },
    beforeDestroy: function beforeDestroy() {
      if (typeof window !== 'undefined') {
        document.removeEventListener('keyup', this.keyPress);
      }
    }
  };

  /* script */
  const __vue_script__$k = script$k;

  /* template */
  var __vue_render__$i = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"datepicker control",class:[_vm.size, {'is-expanded': _vm.expanded}]},[(!_vm.isMobile || _vm.inline)?_c('b-dropdown',{ref:"dropdown",attrs:{"position":_vm.position,"disabled":_vm.disabled,"inline":_vm.inline,"mobile-modal":_vm.mobileModal,"trap-focus":_vm.trapFocus,"aria-role":_vm.ariaRole,"aria-modal":!_vm.inline,"append-to-body":_vm.appendToBody,"append-to-body-copy-parent":""},on:{"active-change":_vm.onActiveChange},scopedSlots:_vm._u([(!_vm.inline)?{key:"trigger",fn:function(){return [_vm._t("trigger",[_c('b-input',_vm._b({ref:"input",attrs:{"autocomplete":"off","value":_vm.formattedValue,"placeholder":_vm.placeholder,"size":_vm.size,"icon":_vm.icon,"icon-right":_vm.iconRight,"icon-pack":_vm.iconPack,"rounded":_vm.rounded,"loading":_vm.loading,"disabled":_vm.disabled,"readonly":!_vm.editable,"use-html5-validation":false},on:{"focus":_vm.handleOnFocus},nativeOn:{"click":function($event){return _vm.onInputClick($event)},"keyup":function($event){if(!$event.type.indexOf('key')&&_vm._k($event.keyCode,"enter",13,$event.key,"Enter")){ return null; }return _vm.togglePicker(true)},"change":function($event){return _vm.onChange($event.target.value)}}},'b-input',_vm.$attrs,false))])]},proxy:true}:null],null,true)},[_c('b-dropdown-item',{class:{'dropdown-horizonal-timepicker': _vm.horizontalTimePicker},attrs:{"disabled":_vm.disabled,"focusable":_vm.focusable,"custom":""}},[_c('div',[_c('header',{staticClass:"datepicker-header"},[(_vm.$slots.header !== undefined && _vm.$slots.header.length)?[_vm._t("header")]:_c('div',{staticClass:"pagination field is-centered",class:_vm.size},[_c('a',{directives:[{name:"show",rawName:"v-show",value:(!_vm.showPrev && !_vm.disabled),expression:"!showPrev && !disabled"}],staticClass:"pagination-previous",attrs:{"role":"button","href":"#","disabled":_vm.disabled,"aria-label":_vm.ariaPreviousLabel},on:{"click":function($event){$event.preventDefault();return _vm.prev($event)},"keydown":[function($event){if(!$event.type.indexOf('key')&&_vm._k($event.keyCode,"enter",13,$event.key,"Enter")){ return null; }$event.preventDefault();return _vm.prev($event)},function($event){if(!$event.type.indexOf('key')&&_vm._k($event.keyCode,"space",32,$event.key,[" ","Spacebar"])){ return null; }$event.preventDefault();return _vm.prev($event)}]}},[_c('b-icon',{attrs:{"icon":_vm.iconPrev,"pack":_vm.iconPack,"both":"","type":"is-primary is-clickable"}})],1),_c('a',{directives:[{name:"show",rawName:"v-show",value:(!_vm.showNext && !_vm.disabled),expression:"!showNext && !disabled"}],staticClass:"pagination-next",attrs:{"role":"button","href":"#","disabled":_vm.disabled,"aria-label":_vm.ariaNextLabel},on:{"click":function($event){$event.preventDefault();return _vm.next($event)},"keydown":[function($event){if(!$event.type.indexOf('key')&&_vm._k($event.keyCode,"enter",13,$event.key,"Enter")){ return null; }$event.preventDefault();return _vm.next($event)},function($event){if(!$event.type.indexOf('key')&&_vm._k($event.keyCode,"space",32,$event.key,[" ","Spacebar"])){ return null; }$event.preventDefault();return _vm.next($event)}]}},[_c('b-icon',{attrs:{"icon":_vm.iconNext,"pack":_vm.iconPack,"both":"","type":"is-primary is-clickable"}})],1),_c('div',{staticClass:"pagination-list"},[_c('b-field',[(!_vm.isTypeMonth)?_c('b-select',{attrs:{"disabled":_vm.disabled,"size":_vm.size},model:{value:(_vm.focusedDateData.month),callback:function ($$v) {_vm.$set(_vm.focusedDateData, "month", $$v);},expression:"focusedDateData.month"}},_vm._l((_vm.listOfMonths),function(month){return _c('option',{key:month.name,attrs:{"disabled":month.disabled},domProps:{"value":month.index}},[_vm._v(" "+_vm._s(month.name)+" ")])}),0):_vm._e(),_c('b-select',{attrs:{"disabled":_vm.disabled,"size":_vm.size},model:{value:(_vm.focusedDateData.year),callback:function ($$v) {_vm.$set(_vm.focusedDateData, "year", $$v);},expression:"focusedDateData.year"}},_vm._l((_vm.listOfYears),function(year){return _c('option',{key:year,domProps:{"value":year}},[_vm._v(" "+_vm._s(year)+" ")])}),0)],1)],1)])],2),(!_vm.isTypeMonth)?_c('div',{staticClass:"datepicker-content",class:{'content-horizonal-timepicker': _vm.horizontalTimePicker}},[_c('b-datepicker-table',{attrs:{"day-names":_vm.newDayNames,"month-names":_vm.newMonthNames,"first-day-of-week":_vm.firstDayOfWeek,"rules-for-first-week":_vm.rulesForFirstWeek,"min-date":_vm.minDate,"max-date":_vm.maxDate,"focused":_vm.focusedDateData,"disabled":_vm.disabled,"unselectable-dates":_vm.unselectableDates,"unselectable-days-of-week":_vm.unselectableDaysOfWeek,"selectable-dates":_vm.selectableDates,"events":_vm.events,"indicators":_vm.indicators,"date-creator":_vm.dateCreator,"type-month":_vm.isTypeMonth,"nearby-month-days":_vm.nearbyMonthDays,"nearby-selectable-month-days":_vm.nearbySelectableMonthDays,"show-week-number":_vm.showWeekNumber,"week-number-clickable":_vm.weekNumberClickable,"range":_vm.range,"multiple":_vm.multiple},on:{"range-start":function (date) { return _vm.$emit('range-start', date); },"range-end":function (date) { return _vm.$emit('range-end', date); },"close":function($event){return _vm.togglePicker(false)},"update:focused":function($event){_vm.focusedDateData = $event;}},model:{value:(_vm.computedValue),callback:function ($$v) {_vm.computedValue=$$v;},expression:"computedValue"}})],1):_c('div',[_c('b-datepicker-month',{attrs:{"month-names":_vm.newMonthNames,"min-date":_vm.minDate,"max-date":_vm.maxDate,"focused":_vm.focusedDateData,"disabled":_vm.disabled,"unselectable-dates":_vm.unselectableDates,"unselectable-days-of-week":_vm.unselectableDaysOfWeek,"selectable-dates":_vm.selectableDates,"events":_vm.events,"indicators":_vm.indicators,"date-creator":_vm.dateCreator,"range":_vm.range,"multiple":_vm.multiple},on:{"range-start":function (date) { return _vm.$emit('range-start', date); },"range-end":function (date) { return _vm.$emit('range-end', date); },"close":function($event){return _vm.togglePicker(false)},"change-focus":_vm.changeFocus,"update:focused":function($event){_vm.focusedDateData = $event;}},model:{value:(_vm.computedValue),callback:function ($$v) {_vm.computedValue=$$v;},expression:"computedValue"}})],1)]),(_vm.$slots.default !== undefined && _vm.$slots.default.length)?_c('footer',{staticClass:"datepicker-footer",class:{'footer-horizontal-timepicker': _vm.horizontalTimePicker}},[_vm._t("default")],2):_vm._e()])],1):_c('b-input',_vm._b({ref:"input",attrs:{"type":!_vm.isTypeMonth ? 'date' : 'month',"autocomplete":"off","value":_vm.formatNative(_vm.computedValue),"placeholder":_vm.placeholder,"size":_vm.size,"icon":_vm.icon,"icon-pack":_vm.iconPack,"rounded":_vm.rounded,"loading":_vm.loading,"max":_vm.formatNative(_vm.maxDate),"min":_vm.formatNative(_vm.minDate),"disabled":_vm.disabled,"readonly":false,"use-html5-validation":false},on:{"focus":_vm.onFocus,"blur":_vm.onBlur},nativeOn:{"change":function($event){return _vm.onChangeNativePicker($event)}}},'b-input',_vm.$attrs,false))],1)};
  var __vue_staticRenderFns__$i = [];

    /* style */
    const __vue_inject_styles__$k = undefined;
    /* scoped */
    const __vue_scope_id__$k = undefined;
    /* module identifier */
    const __vue_module_identifier__$k = undefined;
    /* functional template */
    const __vue_is_functional_template__$k = false;
    /* style inject */
    
    /* style inject SSR */
    

    
    var Datepicker = normalizeComponent_1(
      { render: __vue_render__$i, staticRenderFns: __vue_staticRenderFns__$i },
      __vue_inject_styles__$k,
      __vue_script__$k,
      __vue_scope_id__$k,
      __vue_is_functional_template__$k,
      __vue_module_identifier__$k,
      undefined,
      undefined
    );

  var Plugin$6 = {
    install: function install(Vue) {
      registerComponent(Vue, Datepicker);
    }
  };
  use(Plugin$6);

  var _components$2;
  var script$l = {
    name: 'BTimepicker',
    components: (_components$2 = {}, _defineProperty(_components$2, Input.name, Input), _defineProperty(_components$2, Field.name, Field), _defineProperty(_components$2, Select.name, Select), _defineProperty(_components$2, Icon.name, Icon), _defineProperty(_components$2, Dropdown.name, Dropdown), _defineProperty(_components$2, DropdownItem.name, DropdownItem), _components$2),
    mixins: [TimepickerMixin],
    inheritAttrs: false,
    data: function data() {
      return {
        _isTimepicker: true
      };
    },
    computed: {
      nativeStep: function nativeStep() {
        if (this.enableSeconds) return '1';
      }
    }
  };

  /* script */
  const __vue_script__$l = script$l;

  /* template */
  var __vue_render__$j = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"timepicker control",class:[_vm.size, {'is-expanded': _vm.expanded}]},[(!_vm.isMobile || _vm.inline)?_c('b-dropdown',{ref:"dropdown",attrs:{"position":_vm.position,"disabled":_vm.disabled,"inline":_vm.inline,"append-to-body":_vm.appendToBody,"append-to-body-copy-parent":""},on:{"active-change":_vm.onActiveChange},scopedSlots:_vm._u([(!_vm.inline)?{key:"trigger",fn:function(){return [_vm._t("trigger",[_c('b-input',_vm._b({ref:"input",attrs:{"autocomplete":"off","value":_vm.formatValue(_vm.computedValue),"placeholder":_vm.placeholder,"size":_vm.size,"icon":_vm.icon,"icon-pack":_vm.iconPack,"loading":_vm.loading,"disabled":_vm.disabled,"readonly":!_vm.editable,"rounded":_vm.rounded,"use-html5-validation":_vm.useHtml5Validation},on:{"focus":_vm.handleOnFocus},nativeOn:{"keyup":function($event){if(!$event.type.indexOf('key')&&_vm._k($event.keyCode,"enter",13,$event.key,"Enter")){ return null; }return _vm.toggle(true)},"change":function($event){return _vm.onChange($event.target.value)}}},'b-input',_vm.$attrs,false))])]},proxy:true}:null],null,true)},[_c('b-dropdown-item',{attrs:{"disabled":_vm.disabled,"focusable":_vm.focusable,"custom":""}},[_c('b-field',{attrs:{"grouped":"","position":"is-centered"}},[_c('b-select',{attrs:{"disabled":_vm.disabled,"placeholder":"00"},nativeOn:{"change":function($event){return _vm.onHoursChange($event.target.value)}},model:{value:(_vm.hoursSelected),callback:function ($$v) {_vm.hoursSelected=$$v;},expression:"hoursSelected"}},_vm._l((_vm.hours),function(hour){return _c('option',{key:hour.value,attrs:{"disabled":_vm.isHourDisabled(hour.value)},domProps:{"value":hour.value}},[_vm._v(" "+_vm._s(hour.label)+" ")])}),0),_c('span',{staticClass:"control is-colon"},[_vm._v(_vm._s(_vm.hourLiteral))]),_c('b-select',{attrs:{"disabled":_vm.disabled,"placeholder":"00"},nativeOn:{"change":function($event){return _vm.onMinutesChange($event.target.value)}},model:{value:(_vm.minutesSelected),callback:function ($$v) {_vm.minutesSelected=$$v;},expression:"minutesSelected"}},_vm._l((_vm.minutes),function(minute){return _c('option',{key:minute.value,attrs:{"disabled":_vm.isMinuteDisabled(minute.value)},domProps:{"value":minute.value}},[_vm._v(" "+_vm._s(minute.label)+" ")])}),0),(_vm.enableSeconds)?[_c('span',{staticClass:"control is-colon"},[_vm._v(_vm._s(_vm.minuteLiteral))]),_c('b-select',{attrs:{"disabled":_vm.disabled,"placeholder":"00"},nativeOn:{"change":function($event){return _vm.onSecondsChange($event.target.value)}},model:{value:(_vm.secondsSelected),callback:function ($$v) {_vm.secondsSelected=$$v;},expression:"secondsSelected"}},_vm._l((_vm.seconds),function(second){return _c('option',{key:second.value,attrs:{"disabled":_vm.isSecondDisabled(second.value)},domProps:{"value":second.value}},[_vm._v(" "+_vm._s(second.label)+" ")])}),0),_c('span',{staticClass:"control is-colon"},[_vm._v(_vm._s(_vm.secondLiteral))])]:_vm._e(),(!_vm.isHourFormat24)?_c('b-select',{attrs:{"disabled":_vm.disabled},nativeOn:{"change":function($event){return _vm.onMeridienChange($event.target.value)}},model:{value:(_vm.meridienSelected),callback:function ($$v) {_vm.meridienSelected=$$v;},expression:"meridienSelected"}},_vm._l((_vm.meridiens),function(meridien){return _c('option',{key:meridien,domProps:{"value":meridien}},[_vm._v(" "+_vm._s(meridien)+" ")])}),0):_vm._e()],2),(_vm.$slots.default !== undefined && _vm.$slots.default.length)?_c('footer',{staticClass:"timepicker-footer"},[_vm._t("default")],2):_vm._e()],1)],1):_c('b-input',_vm._b({ref:"input",attrs:{"type":"time","step":_vm.nativeStep,"autocomplete":"off","value":_vm.formatHHMMSS(_vm.computedValue),"placeholder":_vm.placeholder,"size":_vm.size,"icon":_vm.icon,"icon-pack":_vm.iconPack,"rounded":_vm.rounded,"loading":_vm.loading,"max":_vm.formatHHMMSS(_vm.maxTime),"min":_vm.formatHHMMSS(_vm.minTime),"disabled":_vm.disabled,"readonly":false,"reset-on-meridian-change":_vm.isReset,"use-html5-validation":_vm.useHtml5Validation},on:{"focus":_vm.handleOnFocus,"blur":function($event){_vm.onBlur() && _vm.checkHtml5Validity();}},nativeOn:{"change":function($event){return _vm.onChange($event.target.value)}}},'b-input',_vm.$attrs,false))],1)};
  var __vue_staticRenderFns__$j = [];

    /* style */
    const __vue_inject_styles__$l = undefined;
    /* scoped */
    const __vue_scope_id__$l = undefined;
    /* module identifier */
    const __vue_module_identifier__$l = undefined;
    /* functional template */
    const __vue_is_functional_template__$l = false;
    /* style inject */
    
    /* style inject SSR */
    

    
    var Timepicker = normalizeComponent_1(
      { render: __vue_render__$j, staticRenderFns: __vue_staticRenderFns__$j },
      __vue_inject_styles__$l,
      __vue_script__$l,
      __vue_scope_id__$l,
      __vue_is_functional_template__$l,
      __vue_module_identifier__$l,
      undefined,
      undefined
    );

  var _components$3;
  var AM$1 = 'AM';
  var PM$1 = 'PM';
  var script$m = {
    name: 'BDatetimepicker',
    components: (_components$3 = {}, _defineProperty(_components$3, Datepicker.name, Datepicker), _defineProperty(_components$3, Timepicker.name, Timepicker), _components$3),
    mixins: [FormElementMixin],
    inheritAttrs: false,
    props: {
      value: {
        type: Date
      },
      editable: {
        type: Boolean,
        default: false
      },
      placeholder: String,
      horizontalTimePicker: Boolean,
      disabled: Boolean,
      icon: String,
      iconPack: String,
      inline: Boolean,
      openOnFocus: Boolean,
      position: String,
      mobileNative: {
        type: Boolean,
        default: true
      },
      minDatetime: Date,
      maxDatetime: Date,
      datetimeFormatter: {
        type: Function
      },
      datetimeParser: {
        type: Function
      },
      datetimeCreator: {
        type: Function,
        default: function _default(date) {
          if (typeof config.defaultDatetimeCreator === 'function') {
            return config.defaultDatetimeCreator(date);
          } else {
            return date;
          }
        }
      },
      datepicker: Object,
      timepicker: Object,
      tzOffset: {
        type: Number,
        default: 0
      },
      focusable: {
        type: Boolean,
        default: true
      },
      appendToBody: Boolean
    },
    data: function data() {
      return {
        newValue: this.adjustValue(this.value)
      };
    },
    computed: {
      computedValue: {
        get: function get() {
          return this.newValue;
        },
        set: function set(value) {
          if (value) {
            var val = new Date(value.getTime());

            if (this.newValue) {
              // restore time part
              if ((value.getDate() !== this.newValue.getDate() || value.getMonth() !== this.newValue.getMonth() || value.getFullYear() !== this.newValue.getFullYear()) && value.getHours() === 0 && value.getMinutes() === 0 && value.getSeconds() === 0) {
                val.setHours(this.newValue.getHours(), this.newValue.getMinutes(), this.newValue.getSeconds(), 0);
              }
            } else {
              val = this.datetimeCreator(value);
            } // check min and max range


            if (this.minDatetime && val < this.adjustValue(this.minDatetime)) {
              val = this.adjustValue(this.minDatetime);
            } else if (this.maxDatetime && val > this.adjustValue(this.maxDatetime)) {
              val = this.adjustValue(this.maxDatetime);
            }

            this.newValue = new Date(val.getTime());
          } else {
            this.newValue = this.adjustValue(value);
          }

          var adjustedValue = this.adjustValue(this.newValue, true); // reverse adjust

          this.$emit('input', adjustedValue);
        }
      },
      localeOptions: function localeOptions() {
        return new Intl.DateTimeFormat(this.locale, {
          year: 'numeric',
          month: 'numeric',
          day: 'numeric',
          hour: 'numeric',
          minute: 'numeric',
          second: this.enableSeconds() ? 'numeric' : undefined
        }).resolvedOptions();
      },
      dtf: function dtf() {
        return new Intl.DateTimeFormat(this.locale, {
          year: this.localeOptions.year || 'numeric',
          month: this.localeOptions.month || 'numeric',
          day: this.localeOptions.day || 'numeric',
          hour: this.localeOptions.hour || 'numeric',
          minute: this.localeOptions.minute || 'numeric',
          second: this.enableSeconds() ? this.localeOptions.second || 'numeric' : undefined,
          hour12: !this.isHourFormat24()
        });
      },
      isMobileNative: function isMobileNative() {
        return this.mobileNative && this.tzOffset === 0;
      },
      isMobile: function isMobile$1() {
        return this.isMobileNative && isMobile.any();
      },
      minDate: function minDate() {
        if (!this.minDatetime) {
          return this.datepicker ? this.adjustValue(this.datepicker.minDate) : null;
        }

        var adjMinDatetime = this.adjustValue(this.minDatetime);
        return new Date(adjMinDatetime.getFullYear(), adjMinDatetime.getMonth(), adjMinDatetime.getDate(), 0, 0, 0, 0);
      },
      maxDate: function maxDate() {
        if (!this.maxDatetime) {
          return this.datepicker ? this.adjustValue(this.datepicker.maxDate) : null;
        }

        var adjMaxDatetime = this.adjustValue(this.maxDatetime);
        return new Date(adjMaxDatetime.getFullYear(), adjMaxDatetime.getMonth(), adjMaxDatetime.getDate(), 0, 0, 0, 0);
      },
      minTime: function minTime() {
        if (!this.minDatetime || this.newValue === null || typeof this.newValue === 'undefined') {
          return this.timepicker ? this.adjustValue(this.timepicker.minTime) : null;
        }

        var adjMinDatetime = this.adjustValue(this.minDatetime);

        if (adjMinDatetime.getFullYear() === this.newValue.getFullYear() && adjMinDatetime.getMonth() === this.newValue.getMonth() && adjMinDatetime.getDate() === this.newValue.getDate()) {
          return adjMinDatetime;
        }
      },
      maxTime: function maxTime() {
        if (!this.maxDatetime || this.newValue === null || typeof this.newValue === 'undefined') {
          return this.timepicker ? this.adjustValue(this.timepicker.maxTime) : null;
        }

        var adjMaxDatetime = this.adjustValue(this.maxDatetime);

        if (adjMaxDatetime.getFullYear() === this.newValue.getFullYear() && adjMaxDatetime.getMonth() === this.newValue.getMonth() && adjMaxDatetime.getDate() === this.newValue.getDate()) {
          return adjMaxDatetime;
        }
      },
      datepickerSize: function datepickerSize() {
        return this.datepicker && this.datepicker.size ? this.datepicker.size : this.size;
      },
      timepickerSize: function timepickerSize() {
        return this.timepicker && this.timepicker.size ? this.timepicker.size : this.size;
      },
      timepickerDisabled: function timepickerDisabled() {
        return this.timepicker && this.timepicker.disabled ? this.timepicker.disabled : this.disabled;
      }
    },
    watch: {
      value: function value() {
        this.newValue = this.adjustValue(this.value);
      },
      tzOffset: function tzOffset() {
        this.newValue = this.adjustValue(this.value);
      }
    },
    methods: {
      enableSeconds: function enableSeconds() {
        if (this.$refs.timepicker) {
          return this.$refs.timepicker.enableSeconds;
        }

        return false;
      },
      isHourFormat24: function isHourFormat24() {
        if (this.$refs.timepicker) {
          return this.$refs.timepicker.isHourFormat24;
        }

        return !this.localeOptions.hour12;
      },
      adjustValue: function adjustValue(value) {
        var reverse = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
        if (!value) return value;

        if (reverse) {
          return new Date(value.getTime() - this.tzOffset * 60000);
        } else {
          return new Date(value.getTime() + this.tzOffset * 60000);
        }
      },
      defaultDatetimeParser: function defaultDatetimeParser(date) {
        if (typeof this.datetimeParser === 'function') {
          return this.datetimeParser(date);
        } else if (typeof config.defaultDatetimeParser === 'function') {
          return config.defaultDatetimeParser(date);
        } else {
          if (this.dtf.formatToParts && typeof this.dtf.formatToParts === 'function') {
            var dayPeriods = [AM$1, PM$1, AM$1.toLowerCase(), PM$1.toLowerCase()];

            if (this.$refs.timepicker) {
              dayPeriods.push(this.$refs.timepicker.amString);
              dayPeriods.push(this.$refs.timepicker.pmString);
            }

            var parts = this.dtf.formatToParts(new Date());
            var formatRegex = parts.map(function (part, idx) {
              if (part.type === 'literal') {
                if (idx + 1 < parts.length && parts[idx + 1].type === 'hour') {
                  return "[^\\d]+";
                }

                return part.value.replace(/ /g, '\\s?');
              } else if (part.type === 'dayPeriod') {
                return "((?!=<".concat(part.type, ">)(").concat(dayPeriods.join('|'), ")?)");
              }

              return "((?!=<".concat(part.type, ">)\\d+)");
            }).join('');
            var datetimeGroups = matchWithGroups(formatRegex, date); // We do a simple validation for the group.
            // If it is not valid, it will fallback to Date.parse below

            if (datetimeGroups.year && datetimeGroups.year.length === 4 && datetimeGroups.month && datetimeGroups.month <= 12 && datetimeGroups.day && datetimeGroups.day <= 31 && datetimeGroups.hour && datetimeGroups.hour >= 0 && datetimeGroups.hour < 24 && datetimeGroups.minute && datetimeGroups.minute >= 0 && datetimeGroups.minute < 59) {
              var d = new Date(datetimeGroups.year, datetimeGroups.month - 1, datetimeGroups.day, datetimeGroups.hour, datetimeGroups.minute, datetimeGroups.second || 0);
              return d;
            }
          }

          return new Date(Date.parse(date));
        }
      },
      defaultDatetimeFormatter: function defaultDatetimeFormatter(date) {
        if (typeof this.datetimeFormatter === 'function') {
          return this.datetimeFormatter(date);
        } else if (typeof config.defaultDatetimeFormatter === 'function') {
          return config.defaultDatetimeFormatter(date);
        } else {
          return this.dtf.format(date);
        }
      },

      /*
      * Parse date from string
      */
      onChangeNativePicker: function onChangeNativePicker(event) {
        var date = event.target.value;
        var s = date ? date.split(/\D/) : [];

        if (s.length >= 5) {
          var year = parseInt(s[0], 10);
          var month = parseInt(s[1], 10) - 1;
          var day = parseInt(s[2], 10);
          var hours = parseInt(s[3], 10);
          var minutes = parseInt(s[4], 10); // Seconds are omitted intentionally; they are unsupported by input
          // type=datetime-local and cause the control to fail native validation

          this.computedValue = new Date(year, month, day, hours, minutes);
        } else {
          this.computedValue = null;
        }
      },
      formatNative: function formatNative(value) {
        var date = new Date(value);

        if (value && !isNaN(date)) {
          var year = date.getFullYear();
          var month = date.getMonth() + 1;
          var day = date.getDate();
          var hours = date.getHours();
          var minutes = date.getMinutes();
          var seconds = date.getSeconds();
          return year + '-' + ((month < 10 ? '0' : '') + month) + '-' + ((day < 10 ? '0' : '') + day) + 'T' + ((hours < 10 ? '0' : '') + hours) + ':' + ((minutes < 10 ? '0' : '') + minutes) + ':' + ((seconds < 10 ? '0' : '') + seconds);
        }

        return '';
      },
      toggle: function toggle() {
        this.$refs.datepicker.toggle();
      }
    },
    mounted: function mounted() {
      if (!this.isMobile || this.inline) {
        // $refs attached, it's time to refresh datepicker (input)
        if (this.newValue) {
          this.$refs.datepicker.$forceUpdate();
        }
      }
    }
  };

  /* script */
  const __vue_script__$m = script$m;

  /* template */
  var __vue_render__$k = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return (!_vm.isMobile || _vm.inline)?_c('b-datepicker',_vm._b({ref:"datepicker",attrs:{"rounded":_vm.rounded,"open-on-focus":_vm.openOnFocus,"position":_vm.position,"loading":_vm.loading,"inline":_vm.inline,"editable":_vm.editable,"expanded":_vm.expanded,"close-on-click":false,"date-formatter":_vm.defaultDatetimeFormatter,"date-parser":_vm.defaultDatetimeParser,"min-date":_vm.minDate,"max-date":_vm.maxDate,"icon":_vm.icon,"icon-pack":_vm.iconPack,"size":_vm.datepickerSize,"placeholder":_vm.placeholder,"horizontal-time-picker":_vm.horizontalTimePicker,"range":false,"disabled":_vm.disabled,"mobile-native":_vm.isMobileNative,"locale":_vm.locale,"focusable":_vm.focusable,"append-to-body":_vm.appendToBody},on:{"focus":_vm.onFocus,"blur":_vm.onBlur,"change-month":function($event){return _vm.$emit('change-month', $event)},"change-year":function($event){return _vm.$emit('change-year', $event)}},model:{value:(_vm.computedValue),callback:function ($$v) {_vm.computedValue=$$v;},expression:"computedValue"}},'b-datepicker',_vm.datepicker,false),[_c('nav',{staticClass:"level is-mobile"},[(_vm.$slots.left !== undefined)?_c('div',{staticClass:"level-item has-text-centered"},[_vm._t("left")],2):_vm._e(),_c('div',{staticClass:"level-item has-text-centered"},[_c('b-timepicker',_vm._b({ref:"timepicker",attrs:{"inline":"","editable":_vm.editable,"min-time":_vm.minTime,"max-time":_vm.maxTime,"size":_vm.timepickerSize,"disabled":_vm.timepickerDisabled,"focusable":_vm.focusable,"mobile-native":_vm.isMobileNative,"locale":_vm.locale},model:{value:(_vm.computedValue),callback:function ($$v) {_vm.computedValue=$$v;},expression:"computedValue"}},'b-timepicker',_vm.timepicker,false))],1),(_vm.$slots.right !== undefined)?_c('div',{staticClass:"level-item has-text-centered"},[_vm._t("right")],2):_vm._e()])]):_c('b-input',_vm._b({ref:"input",attrs:{"type":"datetime-local","autocomplete":"off","value":_vm.formatNative(_vm.computedValue),"placeholder":_vm.placeholder,"size":_vm.size,"icon":_vm.icon,"icon-pack":_vm.iconPack,"rounded":_vm.rounded,"loading":_vm.loading,"max":_vm.formatNative(_vm.maxDate),"min":_vm.formatNative(_vm.minDate),"disabled":_vm.disabled,"readonly":false,"use-html5-validation":_vm.useHtml5Validation},on:{"focus":_vm.onFocus,"blur":_vm.onBlur},nativeOn:{"change":function($event){return _vm.onChangeNativePicker($event)}}},'b-input',_vm.$attrs,false))};
  var __vue_staticRenderFns__$k = [];

    /* style */
    const __vue_inject_styles__$m = undefined;
    /* scoped */
    const __vue_scope_id__$m = undefined;
    /* module identifier */
    const __vue_module_identifier__$m = undefined;
    /* functional template */
    const __vue_is_functional_template__$m = false;
    /* style inject */
    
    /* style inject SSR */
    

    
    var Datetimepicker = normalizeComponent_1(
      { render: __vue_render__$k, staticRenderFns: __vue_staticRenderFns__$k },
      __vue_inject_styles__$m,
      __vue_script__$m,
      __vue_scope_id__$m,
      __vue_is_functional_template__$m,
      __vue_module_identifier__$m,
      undefined,
      undefined
    );

  var Plugin$7 = {
    install: function install(Vue) {
      registerComponent(Vue, Datetimepicker);
    }
  };
  use(Plugin$7);

  //
  var script$n = {
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

  /* script */
  const __vue_script__$n = script$n;

  /* template */
  var __vue_render__$l = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('transition',{attrs:{"name":_vm.animation},on:{"after-enter":_vm.afterEnter,"before-leave":_vm.beforeLeave,"after-leave":_vm.afterLeave}},[(!_vm.destroyed)?_c('div',{directives:[{name:"show",rawName:"v-show",value:(_vm.isActive),expression:"isActive"},{name:"trap-focus",rawName:"v-trap-focus",value:(_vm.trapFocus),expression:"trapFocus"}],staticClass:"modal is-active",class:[{'is-full-screen': _vm.fullScreen}, _vm.customClass],attrs:{"tabindex":"-1","role":_vm.ariaRole,"aria-label":_vm.ariaLabel,"aria-modal":_vm.ariaModal}},[_c('div',{staticClass:"modal-background",on:{"click":function($event){return _vm.cancel('outside')}}}),_c('div',{staticClass:"animation-content",class:{ 'modal-content': !_vm.hasModalCard },style:(_vm.customStyle)},[(_vm.component)?_c(_vm.component,_vm._g(_vm._b({tag:"component",attrs:{"can-cancel":_vm.canCancel},on:{"close":_vm.close}},'component',_vm.props,false),_vm.events)):(_vm.content)?[_c('div',{domProps:{"innerHTML":_vm._s(_vm.content)}})]:_vm._t("default",null,{"canCancel":_vm.canCancel,"close":_vm.close}),(_vm.showX)?_c('button',{directives:[{name:"show",rawName:"v-show",value:(!_vm.animating),expression:"!animating"}],staticClass:"modal-close is-large",attrs:{"type":"button"},on:{"click":function($event){return _vm.cancel('x')}}}):_vm._e()],2)]):_vm._e()])};
  var __vue_staticRenderFns__$l = [];

    /* style */
    const __vue_inject_styles__$n = undefined;
    /* scoped */
    const __vue_scope_id__$n = undefined;
    /* module identifier */
    const __vue_module_identifier__$n = undefined;
    /* functional template */
    const __vue_is_functional_template__$n = false;
    /* style inject */
    
    /* style inject SSR */
    

    
    var Modal = normalizeComponent_1(
      { render: __vue_render__$l, staticRenderFns: __vue_staticRenderFns__$l },
      __vue_inject_styles__$n,
      __vue_script__$n,
      __vue_scope_id__$n,
      __vue_is_functional_template__$n,
      __vue_module_identifier__$n,
      undefined,
      undefined
    );

  var script$o = {
    name: 'BDialog',
    components: _defineProperty({}, Icon.name, Icon),
    directives: {
      trapFocus: directive
    },
    extends: Modal,
    props: {
      title: String,
      message: [String, Array],
      icon: String,
      iconPack: String,
      hasIcon: Boolean,
      type: {
        type: String,
        default: 'is-primary'
      },
      size: String,
      confirmText: {
        type: String,
        default: function _default() {
          return config.defaultDialogConfirmText ? config.defaultDialogConfirmText : 'OK';
        }
      },
      cancelText: {
        type: String,
        default: function _default() {
          return config.defaultDialogCancelText ? config.defaultDialogCancelText : 'Cancel';
        }
      },
      hasInput: Boolean,
      // Used internally to know if it's prompt
      inputAttrs: {
        type: Object,
        default: function _default() {
          return {};
        }
      },
      onConfirm: {
        type: Function,
        default: function _default() {}
      },
      closeOnConfirm: {
        type: Boolean,
        default: true
      },
      container: {
        type: String,
        default: function _default() {
          return config.defaultContainerElement;
        }
      },
      focusOn: {
        type: String,
        default: 'confirm'
      },
      trapFocus: {
        type: Boolean,
        default: function _default() {
          return config.defaultTrapFocus;
        }
      },
      ariaRole: {
        type: String,
        validator: function validator(value) {
          return ['dialog', 'alertdialog'].indexOf(value) >= 0;
        }
      },
      ariaModal: Boolean
    },
    data: function data() {
      var prompt = this.hasInput ? this.inputAttrs.value || '' : '';
      return {
        prompt: prompt,
        isActive: false,
        validationMessage: ''
      };
    },
    computed: {
      dialogClass: function dialogClass() {
        return [this.size, {
          'has-custom-container': this.container !== null
        }];
      },

      /**
      * Icon name (MDI) based on the type.
      */
      iconByType: function iconByType() {
        switch (this.type) {
          case 'is-info':
            return 'information';

          case 'is-success':
            return 'check-circle';

          case 'is-warning':
            return 'alert';

          case 'is-danger':
            return 'alert-circle';

          default:
            return null;
        }
      },
      showCancel: function showCancel() {
        return this.cancelOptions.indexOf('button') >= 0;
      }
    },
    methods: {
      /**
      * If it's a prompt Dialog, validate the input.
      * Call the onConfirm prop (function) and close the Dialog.
      */
      confirm: function confirm() {
        var _this = this;

        if (this.$refs.input !== undefined) {
          if (!this.$refs.input.checkValidity()) {
            this.validationMessage = this.$refs.input.validationMessage;
            this.$nextTick(function () {
              return _this.$refs.input.select();
            });
            return;
          }
        }

        this.$emit('confirm', this.prompt);
        this.onConfirm(this.prompt, this);
        if (this.closeOnConfirm) this.close();
      },

      /**
      * Close the Dialog.
      */
      close: function close() {
        var _this2 = this;

        this.isActive = false; // Timeout for the animation complete before destroying

        setTimeout(function () {
          _this2.$destroy();

          removeElement(_this2.$el);
        }, 150);
      }
    },
    beforeMount: function beforeMount() {
      var _this3 = this;

      // Insert the Dialog component in the element container
      if (typeof window !== 'undefined') {
        this.$nextTick(function () {
          var container = document.querySelector(_this3.container) || document.body;
          container.appendChild(_this3.$el);
        });
      }
    },
    mounted: function mounted() {
      var _this4 = this;

      this.isActive = true;

      if (typeof this.inputAttrs.required === 'undefined') {
        this.$set(this.inputAttrs, 'required', true);
      }

      this.$nextTick(function () {
        // Handle which element receives focus
        if (_this4.hasInput) {
          _this4.$refs.input.focus();
        } else if (_this4.focusOn === 'cancel' && _this4.showCancel) {
          _this4.$refs.cancelButton.focus();
        } else {
          _this4.$refs.confirmButton.focus();
        }
      });
    }
  };

  /* script */
  const __vue_script__$o = script$o;

  /* template */
  var __vue_render__$m = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('transition',{attrs:{"name":_vm.animation}},[(_vm.isActive)?_c('div',{directives:[{name:"trap-focus",rawName:"v-trap-focus",value:(_vm.trapFocus),expression:"trapFocus"}],staticClass:"dialog modal is-active",class:_vm.dialogClass,attrs:{"role":_vm.ariaRole,"aria-modal":_vm.ariaModal}},[_c('div',{staticClass:"modal-background",on:{"click":function($event){return _vm.cancel('outside')}}}),_c('div',{staticClass:"modal-card animation-content"},[(_vm.title)?_c('header',{staticClass:"modal-card-head"},[_c('p',{staticClass:"modal-card-title"},[_vm._v(_vm._s(_vm.title))])]):_vm._e(),_c('section',{staticClass:"modal-card-body",class:{ 'is-titleless': !_vm.title, 'is-flex': _vm.hasIcon }},[_c('div',{staticClass:"media"},[(_vm.hasIcon && (_vm.icon || _vm.iconByType))?_c('div',{staticClass:"media-left"},[_c('b-icon',{attrs:{"icon":_vm.icon ? _vm.icon : _vm.iconByType,"pack":_vm.iconPack,"type":_vm.type,"both":!_vm.icon,"size":"is-large"}})],1):_vm._e(),_c('div',{staticClass:"media-content"},[_c('p',[(_vm.$slots.default)?[_vm._t("default")]:[_c('div',{domProps:{"innerHTML":_vm._s(_vm.message)}})]],2),(_vm.hasInput)?_c('div',{staticClass:"field"},[_c('div',{staticClass:"control"},[(((_vm.inputAttrs).type)==='checkbox')?_c('input',_vm._b({directives:[{name:"model",rawName:"v-model",value:(_vm.prompt),expression:"prompt"}],ref:"input",staticClass:"input",class:{ 'is-danger': _vm.validationMessage },attrs:{"type":"checkbox"},domProps:{"checked":Array.isArray(_vm.prompt)?_vm._i(_vm.prompt,null)>-1:(_vm.prompt)},on:{"keyup":function($event){if(!$event.type.indexOf('key')&&_vm._k($event.keyCode,"enter",13,$event.key,"Enter")){ return null; }return _vm.confirm($event)},"change":function($event){var $$a=_vm.prompt,$$el=$event.target,$$c=$$el.checked?(true):(false);if(Array.isArray($$a)){var $$v=null,$$i=_vm._i($$a,$$v);if($$el.checked){$$i<0&&(_vm.prompt=$$a.concat([$$v]));}else{$$i>-1&&(_vm.prompt=$$a.slice(0,$$i).concat($$a.slice($$i+1)));}}else{_vm.prompt=$$c;}}}},'input',_vm.inputAttrs,false)):(((_vm.inputAttrs).type)==='radio')?_c('input',_vm._b({directives:[{name:"model",rawName:"v-model",value:(_vm.prompt),expression:"prompt"}],ref:"input",staticClass:"input",class:{ 'is-danger': _vm.validationMessage },attrs:{"type":"radio"},domProps:{"checked":_vm._q(_vm.prompt,null)},on:{"keyup":function($event){if(!$event.type.indexOf('key')&&_vm._k($event.keyCode,"enter",13,$event.key,"Enter")){ return null; }return _vm.confirm($event)},"change":function($event){_vm.prompt=null;}}},'input',_vm.inputAttrs,false)):_c('input',_vm._b({directives:[{name:"model",rawName:"v-model",value:(_vm.prompt),expression:"prompt"}],ref:"input",staticClass:"input",class:{ 'is-danger': _vm.validationMessage },attrs:{"type":(_vm.inputAttrs).type},domProps:{"value":(_vm.prompt)},on:{"keyup":function($event){if(!$event.type.indexOf('key')&&_vm._k($event.keyCode,"enter",13,$event.key,"Enter")){ return null; }return _vm.confirm($event)},"input":function($event){if($event.target.composing){ return; }_vm.prompt=$event.target.value;}}},'input',_vm.inputAttrs,false))]),_c('p',{staticClass:"help is-danger"},[_vm._v(_vm._s(_vm.validationMessage))])]):_vm._e()])])]),_c('footer',{staticClass:"modal-card-foot"},[(_vm.showCancel)?_c('button',{ref:"cancelButton",staticClass:"button",on:{"click":function($event){return _vm.cancel('button')}}},[_vm._v(_vm._s(_vm.cancelText))]):_vm._e(),_c('button',{ref:"confirmButton",staticClass:"button",class:_vm.type,on:{"click":_vm.confirm}},[_vm._v(_vm._s(_vm.confirmText))])])])]):_vm._e()])};
  var __vue_staticRenderFns__$m = [];

    /* style */
    const __vue_inject_styles__$o = undefined;
    /* scoped */
    const __vue_scope_id__$o = undefined;
    /* module identifier */
    const __vue_module_identifier__$o = undefined;
    /* functional template */
    const __vue_is_functional_template__$o = false;
    /* style inject */
    
    /* style inject SSR */
    

    
    var Dialog = normalizeComponent_1(
      { render: __vue_render__$m, staticRenderFns: __vue_staticRenderFns__$m },
      __vue_inject_styles__$o,
      __vue_script__$o,
      __vue_scope_id__$o,
      __vue_is_functional_template__$o,
      __vue_module_identifier__$o,
      undefined,
      undefined
    );

  var localVueInstance;

  function open(propsData) {
    var slot;

    if (Array.isArray(propsData.message)) {
      slot = propsData.message;
      delete propsData.message;
    }

    var vm = typeof window !== 'undefined' && window.Vue ? window.Vue : localVueInstance || VueInstance;
    var DialogComponent = vm.extend(Dialog);
    var component = new DialogComponent({
      el: document.createElement('div'),
      propsData: propsData
    });

    if (slot) {
      component.$slots.default = slot;
      component.$forceUpdate();
    }

    if (!config.defaultProgrammaticPromise) {
      return component;
    } else {
      return new Promise(function (resolve) {
        component.$on('confirm', function (event) {
          return resolve({
            result: event || true,
            dialog: component
          });
        });
        component.$on('cancel', function () {
          return resolve({
            result: false,
            dialog: component
          });
        });
      });
    }
  }

  var DialogProgrammatic = {
    alert: function alert(params) {
      if (typeof params === 'string') {
        params = {
          message: params
        };
      }

      var defaultParam = {
        canCancel: false
      };
      var propsData = merge(defaultParam, params);
      return open(propsData);
    },
    confirm: function confirm(params) {
      var defaultParam = {};
      var propsData = merge(defaultParam, params);
      return open(propsData);
    },
    prompt: function prompt(params) {
      var defaultParam = {
        hasInput: true
      };
      var propsData = merge(defaultParam, params);
      return open(propsData);
    }
  };
  var Plugin$8 = {
    install: function install(Vue) {
      localVueInstance = Vue;
      registerComponent(Vue, Dialog);
      registerComponentProgrammatic(Vue, 'dialog', DialogProgrammatic);
    }
  };
  use(Plugin$8);

  var Plugin$9 = {
    install: function install(Vue) {
      registerComponent(Vue, Dropdown);
      registerComponent(Vue, DropdownItem);
    }
  };
  use(Plugin$9);

  var Plugin$a = {
    install: function install(Vue) {
      registerComponent(Vue, Field);
    }
  };
  use(Plugin$a);

  var Plugin$b = {
    install: function install(Vue) {
      registerComponent(Vue, Icon);
    }
  };
  use(Plugin$b);

  //
  var script$p = {
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
          if (typeof config.defaultImageSrcsetFormatter === 'function') {
            return config.defaultImageSrcsetFormatter(src, size);
          } else {
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
      }
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
        return {
          'is-rounded': this.rounded,
          'has-ratio': this.hasRatio
        };
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
  const __vue_script__$p = script$p;

  /* template */
  var __vue_render__$n = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('figure',{staticClass:"b-image-wrapper",class:_vm.figureClasses,style:(_vm.figureStyles)},[(_vm.isCaptionFirst)?_c('figcaption',[_vm._t("caption")],2):_vm._e(),_c('transition',{attrs:{"name":"fade"}},[(_vm.isDisplayed)?_c('img',{class:_vm.imgClasses,attrs:{"srcset":_vm.computedSrcset,"src":_vm.computedSrc,"alt":_vm.alt,"width":_vm.computedWidth,"sizes":_vm.computedSizes,"loading":_vm.computedNativeLazy},on:{"load":_vm.onLoad,"error":_vm.onError}}):_vm._e()]),_c('transition',{attrs:{"name":"fade"}},[(_vm.isPlaceholderDisplayed)?_vm._t("placeholder",[_c('img',{staticClass:"placeholder",class:_vm.imgClasses,attrs:{"src":_vm.computedPlaceholder,"alt":_vm.alt}})]):_vm._e()],2),(_vm.isCaptionLast)?_c('figcaption',[_vm._t("caption")],2):_vm._e()],1)};
  var __vue_staticRenderFns__$n = [];

    /* style */
    const __vue_inject_styles__$p = undefined;
    /* scoped */
    const __vue_scope_id__$p = undefined;
    /* module identifier */
    const __vue_module_identifier__$p = undefined;
    /* functional template */
    const __vue_is_functional_template__$p = false;
    /* style inject */
    
    /* style inject SSR */
    

    
    var Image$1 = normalizeComponent_1(
      { render: __vue_render__$n, staticRenderFns: __vue_staticRenderFns__$n },
      __vue_inject_styles__$p,
      __vue_script__$p,
      __vue_scope_id__$p,
      __vue_is_functional_template__$p,
      __vue_module_identifier__$p,
      undefined,
      undefined
    );

  var Plugin$c = {
    install: function install(Vue) {
      registerComponent(Vue, Image$1);
    }
  };
  use(Plugin$c);

  var Plugin$d = {
    install: function install(Vue) {
      registerComponent(Vue, Input);
    }
  };
  use(Plugin$d);

  // Polyfills for SSR
  var isSSR = typeof window === 'undefined';
  var HTMLElement = isSSR ? Object : window.HTMLElement;
  var File = isSSR ? Object : window.File;

  //
  var script$q = {
    name: 'BLoading',
    // deprecated, to replace with default 'value' in the next breaking change
    model: {
      prop: 'active',
      event: 'update:active'
    },
    props: {
      active: Boolean,
      programmatic: Boolean,
      container: [Object, Function, HTMLElement],
      isFullPage: {
        type: Boolean,
        default: true
      },
      animation: {
        type: String,
        default: 'fade'
      },
      canCancel: {
        type: Boolean,
        default: false
      },
      onCancel: {
        type: Function,
        default: function _default() {}
      }
    },
    data: function data() {
      return {
        isActive: this.active || false,
        displayInFullPage: this.isFullPage
      };
    },
    watch: {
      active: function active(value) {
        this.isActive = value;
      },
      isFullPage: function isFullPage(value) {
        this.displayInFullPage = value;
      }
    },
    methods: {
      /**
      * Close the Modal if canCancel.
      */
      cancel: function cancel() {
        if (!this.canCancel || !this.isActive) return;
        this.close();
      },

      /**
      * Emit events, and destroy modal if it's programmatic.
      */
      close: function close() {
        var _this = this;

        this.onCancel.apply(null, arguments);
        this.$emit('close');
        this.$emit('update:active', false); // Timeout for the animation complete before destroying

        if (this.programmatic) {
          this.isActive = false;
          setTimeout(function () {
            _this.$destroy();

            removeElement(_this.$el);
          }, 150);
        }
      },

      /**
      * Keypress event that is bound to the document.
      */
      keyPress: function keyPress(_ref) {
        var key = _ref.key;
        if (key === 'Escape' || key === 'Esc') this.cancel();
      }
    },
    created: function created() {
      if (typeof window !== 'undefined') {
        document.addEventListener('keyup', this.keyPress);
      }
    },
    beforeMount: function beforeMount() {
      // Insert the Loading component in body tag
      // only if it's programmatic
      if (this.programmatic) {
        if (!this.container) {
          document.body.appendChild(this.$el);
        } else {
          this.displayInFullPage = false;
          this.$emit('update:is-full-page', false);
          this.container.appendChild(this.$el);
        }
      }
    },
    mounted: function mounted() {
      if (this.programmatic) this.isActive = true;
    },
    beforeDestroy: function beforeDestroy() {
      if (typeof window !== 'undefined') {
        document.removeEventListener('keyup', this.keyPress);
      }
    }
  };

  /* script */
  const __vue_script__$q = script$q;

  /* template */
  var __vue_render__$o = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('transition',{attrs:{"name":_vm.animation}},[(_vm.isActive)?_c('div',{staticClass:"loading-overlay is-active",class:{ 'is-full-page': _vm.displayInFullPage }},[_c('div',{staticClass:"loading-background",on:{"click":_vm.cancel}}),_vm._t("default",[_c('div',{staticClass:"loading-icon"})])],2):_vm._e()])};
  var __vue_staticRenderFns__$o = [];

    /* style */
    const __vue_inject_styles__$q = undefined;
    /* scoped */
    const __vue_scope_id__$q = undefined;
    /* module identifier */
    const __vue_module_identifier__$q = undefined;
    /* functional template */
    const __vue_is_functional_template__$q = false;
    /* style inject */
    
    /* style inject SSR */
    

    
    var Loading = normalizeComponent_1(
      { render: __vue_render__$o, staticRenderFns: __vue_staticRenderFns__$o },
      __vue_inject_styles__$q,
      __vue_script__$q,
      __vue_scope_id__$q,
      __vue_is_functional_template__$q,
      __vue_module_identifier__$q,
      undefined,
      undefined
    );

  var localVueInstance$1;
  var LoadingProgrammatic = {
    open: function open(params) {
      var defaultParam = {
        programmatic: true
      };
      var propsData = merge(defaultParam, params);
      var vm = typeof window !== 'undefined' && window.Vue ? window.Vue : localVueInstance$1 || VueInstance;
      var LoadingComponent = vm.extend(Loading);
      return new LoadingComponent({
        el: document.createElement('div'),
        propsData: propsData
      });
    }
  };
  var Plugin$e = {
    install: function install(Vue) {
      localVueInstance$1 = Vue;
      registerComponent(Vue, Loading);
      registerComponentProgrammatic(Vue, 'loading', LoadingProgrammatic);
    }
  };
  use(Plugin$e);

  //
  //
  //
  //
  //
  //
  var script$r = {
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

  /* script */
  const __vue_script__$r = script$r;

  /* template */
  var __vue_render__$p = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"menu"},[_vm._t("default")],2)};
  var __vue_staticRenderFns__$p = [];

    /* style */
    const __vue_inject_styles__$r = undefined;
    /* scoped */
    const __vue_scope_id__$r = undefined;
    /* module identifier */
    const __vue_module_identifier__$r = undefined;
    /* functional template */
    const __vue_is_functional_template__$r = false;
    /* style inject */
    
    /* style inject SSR */
    

    
    var Menu = normalizeComponent_1(
      { render: __vue_render__$p, staticRenderFns: __vue_staticRenderFns__$p },
      __vue_inject_styles__$r,
      __vue_script__$r,
      __vue_scope_id__$r,
      __vue_is_functional_template__$r,
      __vue_module_identifier__$r,
      undefined,
      undefined
    );

  var script$s = {
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
  const __vue_script__$s = script$s;

  /* template */

    /* style */
    const __vue_inject_styles__$s = undefined;
    /* scoped */
    const __vue_scope_id__$s = undefined;
    /* module identifier */
    const __vue_module_identifier__$s = undefined;
    /* functional template */
    const __vue_is_functional_template__$s = undefined;
    /* style inject */
    
    /* style inject SSR */
    

    
    var MenuList = normalizeComponent_1(
      {},
      __vue_inject_styles__$s,
      __vue_script__$s,
      __vue_scope_id__$s,
      __vue_is_functional_template__$s,
      __vue_module_identifier__$s,
      undefined,
      undefined
    );

  var script$t = {
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
  const __vue_script__$t = script$t;

  /* template */
  var __vue_render__$q = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('li',{attrs:{"role":_vm.ariaRoleMenu}},[_c(_vm.tag,_vm._g(_vm._b({tag:"component",class:{
              'is-active': _vm.newActive,
              'is-expanded': _vm.newExpanded,
              'is-disabled': _vm.disabled,
              'icon-text': _vm.icon,
          },on:{"click":function($event){return _vm.onClick($event)}}},'component',_vm.$attrs,false),_vm.$listeners),[(_vm.icon)?_c('b-icon',{attrs:{"icon":_vm.icon,"pack":_vm.iconPack,"size":_vm.size}}):_vm._e(),(_vm.label)?_c('span',[_vm._v(" "+_vm._s(_vm.label)+" ")]):_vm._t("label",null,{"expanded":_vm.newExpanded,"active":_vm.newActive})],2),(_vm.$slots.default)?[_c('transition',{attrs:{"name":_vm.animation}},[_c('ul',{directives:[{name:"show",rawName:"v-show",value:(_vm.newExpanded),expression:"newExpanded"}]},[_vm._t("default")],2)])]:_vm._e()],2)};
  var __vue_staticRenderFns__$q = [];

    /* style */
    const __vue_inject_styles__$t = undefined;
    /* scoped */
    const __vue_scope_id__$t = undefined;
    /* module identifier */
    const __vue_module_identifier__$t = undefined;
    /* functional template */
    const __vue_is_functional_template__$t = false;
    /* style inject */
    
    /* style inject SSR */
    

    
    var MenuItem = normalizeComponent_1(
      { render: __vue_render__$q, staticRenderFns: __vue_staticRenderFns__$q },
      __vue_inject_styles__$t,
      __vue_script__$t,
      __vue_scope_id__$t,
      __vue_is_functional_template__$t,
      __vue_module_identifier__$t,
      undefined,
      undefined
    );

  var Plugin$f = {
    install: function install(Vue) {
      registerComponent(Vue, Menu);
      registerComponent(Vue, MenuList);
      registerComponent(Vue, MenuItem);
    }
  };
  use(Plugin$f);

  var MessageMixin = {
    components: _defineProperty({}, Icon.name, Icon),
    // deprecated, to replace with default 'value' in the next breaking change
    model: {
      prop: 'active',
      event: 'update:active'
    },
    props: {
      active: {
        type: Boolean,
        default: true
      },
      title: String,
      closable: {
        type: Boolean,
        default: true
      },
      message: String,
      type: String,
      hasIcon: Boolean,
      size: String,
      icon: String,
      iconPack: String,
      iconSize: String,
      autoClose: {
        type: Boolean,
        default: false
      },
      duration: {
        type: Number,
        default: 2000
      }
    },
    data: function data() {
      return {
        isActive: this.active
      };
    },
    watch: {
      active: function active(value) {
        this.isActive = value;
      },
      isActive: function isActive(value) {
        if (value) {
          this.setAutoClose();
        } else {
          if (this.timer) {
            clearTimeout(this.timer);
          }
        }
      }
    },
    computed: {
      /**
       * Icon name (MDI) based on type.
       */
      computedIcon: function computedIcon() {
        if (this.icon) {
          return this.icon;
        }

        switch (this.type) {
          case 'is-info':
            return 'information';

          case 'is-success':
            return 'check-circle';

          case 'is-warning':
            return 'alert';

          case 'is-danger':
            return 'alert-circle';

          default:
            return null;
        }
      }
    },
    methods: {
      /**
       * Close the Message and emit events.
       */
      close: function close() {
        this.isActive = false;
        this.$emit('close');
        this.$emit('update:active', false);
      },

      /**
       * Set timer to auto close message
       */
      setAutoClose: function setAutoClose() {
        var _this = this;

        if (this.autoClose) {
          this.timer = setTimeout(function () {
            if (_this.isActive) {
              _this.close();
            }
          }, this.duration);
        }
      }
    },
    mounted: function mounted() {
      this.setAutoClose();
    }
  };

  //
  var script$u = {
    name: 'BMessage',
    mixins: [MessageMixin],
    props: {
      ariaCloseLabel: String
    },
    data: function data() {
      return {
        newIconSize: this.iconSize || this.size || 'is-large'
      };
    }
  };

  /* script */
  const __vue_script__$u = script$u;

  /* template */
  var __vue_render__$r = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('transition',{attrs:{"name":"fade"}},[(_vm.isActive)?_c('article',{staticClass:"message",class:[_vm.type, _vm.size]},[(_vm.$slots.header || _vm.title)?_c('header',{staticClass:"message-header"},[(_vm.$slots.header)?_c('div',[_vm._t("header")],2):(_vm.title)?_c('p',[_vm._v(_vm._s(_vm.title))]):_vm._e(),(_vm.closable)?_c('button',{staticClass:"delete",attrs:{"type":"button","aria-label":_vm.ariaCloseLabel},on:{"click":_vm.close}}):_vm._e()]):_vm._e(),(_vm.$slots.default)?_c('section',{staticClass:"message-body"},[_c('div',{staticClass:"media"},[(_vm.computedIcon && _vm.hasIcon)?_c('div',{staticClass:"media-left"},[_c('b-icon',{class:_vm.type,attrs:{"icon":_vm.computedIcon,"pack":_vm.iconPack,"both":"","size":_vm.newIconSize}})],1):_vm._e(),_c('div',{staticClass:"media-content"},[_vm._t("default")],2)])]):_vm._e()]):_vm._e()])};
  var __vue_staticRenderFns__$r = [];

    /* style */
    const __vue_inject_styles__$u = undefined;
    /* scoped */
    const __vue_scope_id__$u = undefined;
    /* module identifier */
    const __vue_module_identifier__$u = undefined;
    /* functional template */
    const __vue_is_functional_template__$u = false;
    /* style inject */
    
    /* style inject SSR */
    

    
    var Message = normalizeComponent_1(
      { render: __vue_render__$r, staticRenderFns: __vue_staticRenderFns__$r },
      __vue_inject_styles__$u,
      __vue_script__$u,
      __vue_scope_id__$u,
      __vue_is_functional_template__$u,
      __vue_module_identifier__$u,
      undefined,
      undefined
    );

  var Plugin$g = {
    install: function install(Vue) {
      registerComponent(Vue, Message);
    }
  };
  use(Plugin$g);

  var localVueInstance$2;
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
      var vm = typeof window !== 'undefined' && window.Vue ? window.Vue : localVueInstance$2 || VueInstance;
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
  var Plugin$h = {
    install: function install(Vue) {
      localVueInstance$2 = Vue;
      registerComponent(Vue, Modal);
      registerComponentProgrammatic(Vue, 'modal', ModalProgrammatic);
    }
  };
  use(Plugin$h);

  //
  var script$v = {
    name: 'BNotification',
    mixins: [MessageMixin],
    props: {
      position: String,
      ariaCloseLabel: String,
      animation: {
        type: String,
        default: 'fade'
      }
    }
  };

  /* script */
  const __vue_script__$v = script$v;

  /* template */
  var __vue_render__$s = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('transition',{attrs:{"name":_vm.animation}},[_c('article',{directives:[{name:"show",rawName:"v-show",value:(_vm.isActive),expression:"isActive"}],staticClass:"notification",class:[_vm.type, _vm.position]},[(_vm.closable)?_c('button',{staticClass:"delete",attrs:{"type":"button","aria-label":_vm.ariaCloseLabel},on:{"click":_vm.close}}):_vm._e(),(_vm.$slots.default || _vm.message)?_c('div',{staticClass:"media"},[(_vm.computedIcon && _vm.hasIcon)?_c('div',{staticClass:"media-left"},[_c('b-icon',{attrs:{"icon":_vm.computedIcon,"pack":_vm.iconPack,"both":"","size":"is-large","aria-hidden":""}})],1):_vm._e(),_c('div',{staticClass:"media-content"},[(_vm.$slots.default)?[_vm._t("default")]:[_c('p',{staticClass:"text",domProps:{"innerHTML":_vm._s(_vm.message)}})]],2)]):_vm._e()])])};
  var __vue_staticRenderFns__$s = [];

    /* style */
    const __vue_inject_styles__$v = undefined;
    /* scoped */
    const __vue_scope_id__$v = undefined;
    /* module identifier */
    const __vue_module_identifier__$v = undefined;
    /* functional template */
    const __vue_is_functional_template__$v = false;
    /* style inject */
    
    /* style inject SSR */
    

    
    var Notification = normalizeComponent_1(
      { render: __vue_render__$s, staticRenderFns: __vue_staticRenderFns__$s },
      __vue_inject_styles__$v,
      __vue_script__$v,
      __vue_scope_id__$v,
      __vue_is_functional_template__$v,
      __vue_module_identifier__$v,
      undefined,
      undefined
    );

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
  var script$w = {
    name: 'BNotificationNotice',
    mixins: [NoticeMixin],
    data: function data() {
      return {
        newDuration: this.duration || config.defaultNotificationDuration
      };
    }
  };

  /* script */
  const __vue_script__$w = script$w;

  /* template */
  var __vue_render__$t = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('b-notification',_vm._b({on:{"close":_vm.close}},'b-notification',_vm.$options.propsData,false),[_vm._t("default")],2)};
  var __vue_staticRenderFns__$t = [];

    /* style */
    const __vue_inject_styles__$w = undefined;
    /* scoped */
    const __vue_scope_id__$w = undefined;
    /* module identifier */
    const __vue_module_identifier__$w = undefined;
    /* functional template */
    const __vue_is_functional_template__$w = false;
    /* style inject */
    
    /* style inject SSR */
    

    
    var NotificationNotice = normalizeComponent_1(
      { render: __vue_render__$t, staticRenderFns: __vue_staticRenderFns__$t },
      __vue_inject_styles__$w,
      __vue_script__$w,
      __vue_scope_id__$w,
      __vue_is_functional_template__$w,
      __vue_module_identifier__$w,
      undefined,
      undefined
    );

  var localVueInstance$3;
  var NotificationProgrammatic = {
    open: function open(params) {
      var parent;

      if (typeof params === 'string') {
        params = {
          message: params
        };
      }

      var defaultParam = {
        position: config.defaultNotificationPosition || 'is-top-right'
      };

      if (params.parent) {
        parent = params.parent;
        delete params.parent;
      }

      var slot;

      if (Array.isArray(params.message)) {
        slot = params.message;
        delete params.message;
      } // fix animation


      params.active = false;
      var propsData = merge(defaultParam, params);
      var vm = typeof window !== 'undefined' && window.Vue ? window.Vue : localVueInstance$3 || VueInstance;
      var NotificationNoticeComponent = vm.extend(NotificationNotice);
      var component = new NotificationNoticeComponent({
        parent: parent,
        el: document.createElement('div'),
        propsData: propsData
      });

      if (slot) {
        component.$slots.default = slot;
        component.$forceUpdate();
      } // fix animation


      component.$children[0].isActive = true;
      return component;
    }
  };
  var Plugin$i = {
    install: function install(Vue) {
      localVueInstance$3 = Vue;
      registerComponent(Vue, Notification);
      registerComponentProgrammatic(Vue, 'notification', NotificationProgrammatic);
    }
  };
  use(Plugin$i);

  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  var script$x = {
    name: 'NavbarBurger',
    props: {
      isOpened: {
        type: Boolean,
        default: false
      }
    }
  };

  /* script */
  const __vue_script__$x = script$x;

  /* template */
  var __vue_render__$u = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('a',_vm._g({staticClass:"navbar-burger burger",class:{ 'is-active': _vm.isOpened },attrs:{"role":"button","aria-label":"menu","aria-expanded":_vm.isOpened}},_vm.$listeners),[_c('span',{attrs:{"aria-hidden":"true"}}),_c('span',{attrs:{"aria-hidden":"true"}}),_c('span',{attrs:{"aria-hidden":"true"}})])};
  var __vue_staticRenderFns__$u = [];

    /* style */
    const __vue_inject_styles__$x = undefined;
    /* scoped */
    const __vue_scope_id__$x = undefined;
    /* module identifier */
    const __vue_module_identifier__$x = undefined;
    /* functional template */
    const __vue_is_functional_template__$x = false;
    /* style inject */
    
    /* style inject SSR */
    

    
    var NavbarBurger = normalizeComponent_1(
      { render: __vue_render__$u, staticRenderFns: __vue_staticRenderFns__$u },
      __vue_inject_styles__$x,
      __vue_script__$x,
      __vue_scope_id__$x,
      __vue_is_functional_template__$x,
      __vue_module_identifier__$x,
      undefined,
      undefined
    );

  var isTouch = typeof window !== 'undefined' && ('ontouchstart' in window || navigator.msMaxTouchPoints > 0);
  var events = isTouch ? ['touchstart', 'click'] : ['click'];
  var instances = [];

  function processArgs(bindingValue) {
    var isFunction = typeof bindingValue === 'function';

    if (!isFunction && _typeof(bindingValue) !== 'object') {
      throw new Error("v-click-outside: Binding value should be a function or an object, ".concat(_typeof(bindingValue), " given"));
    }

    return {
      handler: isFunction ? bindingValue : bindingValue.handler,
      middleware: bindingValue.middleware || function (isClickOutside) {
        return isClickOutside;
      },
      events: bindingValue.events || events
    };
  }

  function onEvent(_ref) {
    var el = _ref.el,
        event = _ref.event,
        handler = _ref.handler,
        middleware = _ref.middleware;
    var isClickOutside = event.target !== el && !el.contains(event.target);

    if (!isClickOutside || !middleware(event, el)) {
      return;
    }

    handler(event, el);
  }

  function toggleEventListeners() {
    var _ref2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        eventHandlers = _ref2.eventHandlers;

    var action = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'add';
    eventHandlers.forEach(function (_ref3) {
      var event = _ref3.event,
          handler = _ref3.handler;
      document["".concat(action, "EventListener")](event, handler);
    });
  }

  function bind$1(el, _ref4) {
    var value = _ref4.value;

    var _processArgs = processArgs(value),
        _handler = _processArgs.handler,
        middleware = _processArgs.middleware,
        events = _processArgs.events;

    var instance = {
      el: el,
      eventHandlers: events.map(function (eventName) {
        return {
          event: eventName,
          handler: function handler(event) {
            return onEvent({
              event: event,
              el: el,
              handler: _handler,
              middleware: middleware
            });
          }
        };
      })
    };
    toggleEventListeners(instance, 'add');
    instances.push(instance);
  }

  function update(el, _ref5) {
    var value = _ref5.value;

    var _processArgs2 = processArgs(value),
        _handler2 = _processArgs2.handler,
        middleware = _processArgs2.middleware,
        events = _processArgs2.events; // `filter` instead of `find` for compat with IE


    var instance = instances.filter(function (instance) {
      return instance.el === el;
    })[0];
    toggleEventListeners(instance, 'remove');
    instance.eventHandlers = events.map(function (eventName) {
      return {
        event: eventName,
        handler: function handler(event) {
          return onEvent({
            event: event,
            el: el,
            handler: _handler2,
            middleware: middleware
          });
        }
      };
    });
    toggleEventListeners(instance, 'add');
  }

  function unbind$1(el) {
    // `filter` instead of `find` for compat with IE
    var instance = instances.filter(function (instance) {
      return instance.el === el;
    })[0];
    toggleEventListeners(instance, 'remove');
  }

  var directive$1 = {
    bind: bind$1,
    update: update,
    unbind: unbind$1,
    instances: instances
  };

  var FIXED_TOP_CLASS = 'is-fixed-top';
  var BODY_FIXED_TOP_CLASS = 'has-navbar-fixed-top';
  var BODY_SPACED_FIXED_TOP_CLASS = 'has-spaced-navbar-fixed-top';
  var FIXED_BOTTOM_CLASS = 'is-fixed-bottom';
  var BODY_FIXED_BOTTOM_CLASS = 'has-navbar-fixed-bottom';
  var BODY_SPACED_FIXED_BOTTOM_CLASS = 'has-spaced-navbar-fixed-bottom';
  var BODY_CENTERED_CLASS = 'has-navbar-centered';

  var isFilled = function isFilled(str) {
    return !!str;
  };

  var script$y = {
    name: 'BNavbar',
    components: {
      NavbarBurger: NavbarBurger
    },
    directives: {
      clickOutside: directive$1
    },
    // deprecated, to replace with default 'value' in the next breaking change
    model: {
      prop: 'active',
      event: 'update:active'
    },
    props: {
      type: [String, Object],
      transparent: {
        type: Boolean,
        default: false
      },
      fixedTop: {
        type: Boolean,
        default: false
      },
      fixedBottom: {
        type: Boolean,
        default: false
      },
      active: {
        type: Boolean,
        default: false
      },
      centered: {
        type: Boolean,
        default: false
      },
      wrapperClass: {
        type: String
      },
      closeOnClick: {
        type: Boolean,
        default: true
      },
      mobileBurger: {
        type: Boolean,
        default: true
      },
      spaced: Boolean,
      shadow: Boolean
    },
    data: function data() {
      return {
        internalIsActive: this.active,
        _isNavBar: true // Used internally by NavbarItem

      };
    },
    computed: {
      isOpened: function isOpened() {
        return this.internalIsActive;
      },
      computedClasses: function computedClasses() {
        var _ref;

        return [this.type, (_ref = {}, _defineProperty(_ref, FIXED_TOP_CLASS, this.fixedTop), _defineProperty(_ref, FIXED_BOTTOM_CLASS, this.fixedBottom), _defineProperty(_ref, BODY_CENTERED_CLASS, this.centered), _defineProperty(_ref, 'is-spaced', this.spaced), _defineProperty(_ref, 'has-shadow', this.shadow), _defineProperty(_ref, 'is-transparent', this.transparent), _ref)];
      }
    },
    watch: {
      active: {
        handler: function handler(active) {
          this.internalIsActive = active;
        },
        immediate: true
      },
      fixedTop: function fixedTop(isSet) {
        // toggle body class only on update to handle multiple navbar
        this.setBodyFixedTopClass(isSet);
      },
      bottomTop: function bottomTop(isSet) {
        // toggle body class only on update to handle multiple navbar
        this.setBodyFixedBottomClass(isSet);
      }
    },
    methods: {
      toggleActive: function toggleActive() {
        this.internalIsActive = !this.internalIsActive;
        this.emitUpdateParentEvent();
      },
      closeMenu: function closeMenu() {
        if (this.closeOnClick && this.internalIsActive) {
          this.internalIsActive = false;
          this.emitUpdateParentEvent();
        }
      },
      emitUpdateParentEvent: function emitUpdateParentEvent() {
        this.$emit('update:active', this.internalIsActive);
      },
      setBodyClass: function setBodyClass(className) {
        if (typeof window !== 'undefined') {
          document.body.classList.add(className);
        }
      },
      removeBodyClass: function removeBodyClass(className) {
        if (typeof window !== 'undefined') {
          document.body.classList.remove(className);
        }
      },
      checkIfFixedPropertiesAreColliding: function checkIfFixedPropertiesAreColliding() {
        var areColliding = this.fixedTop && this.fixedBottom;

        if (areColliding) {
          throw new Error('You should choose if the BNavbar is fixed bottom or fixed top, but not both');
        }
      },
      genNavbar: function genNavbar(createElement) {
        var navBarSlots = [this.genNavbarBrandNode(createElement), this.genNavbarSlotsNode(createElement)];

        if (!isFilled(this.wrapperClass)) {
          return this.genNavbarSlots(createElement, navBarSlots);
        } // It wraps the slots into a div with the provided wrapperClass prop


        var navWrapper = createElement('div', {
          class: this.wrapperClass
        }, navBarSlots);
        return this.genNavbarSlots(createElement, [navWrapper]);
      },
      genNavbarSlots: function genNavbarSlots(createElement, slots) {
        return createElement('nav', {
          staticClass: 'navbar',
          class: this.computedClasses,
          attrs: {
            role: 'navigation',
            'aria-label': 'main navigation'
          },
          directives: [{
            name: 'click-outside',
            value: this.closeMenu
          }]
        }, slots);
      },
      genNavbarBrandNode: function genNavbarBrandNode(createElement) {
        return createElement('div', {
          class: 'navbar-brand'
        }, [this.$slots.brand, this.genBurgerNode(createElement)]);
      },
      genBurgerNode: function genBurgerNode(createElement) {
        if (this.mobileBurger) {
          var defaultBurgerNode = createElement('navbar-burger', {
            props: {
              isOpened: this.isOpened
            },
            on: {
              click: this.toggleActive
            }
          });
          var hasBurgerSlot = !!this.$scopedSlots.burger;
          return hasBurgerSlot ? this.$scopedSlots.burger({
            isOpened: this.isOpened,
            toggleActive: this.toggleActive
          }) : defaultBurgerNode;
        }
      },
      genNavbarSlotsNode: function genNavbarSlotsNode(createElement) {
        return createElement('div', {
          staticClass: 'navbar-menu',
          class: {
            'is-active': this.isOpened
          }
        }, [this.genMenuPosition(createElement, 'start'), this.genMenuPosition(createElement, 'end')]);
      },
      genMenuPosition: function genMenuPosition(createElement, positionName) {
        return createElement('div', {
          staticClass: "navbar-".concat(positionName)
        }, this.$slots[positionName]);
      },
      setBodyFixedTopClass: function setBodyFixedTopClass(isSet) {
        this.checkIfFixedPropertiesAreColliding();

        if (isSet) {
          // TODO Apply only one of the classes once PR is merged in Bulma:
          // https://github.com/jgthms/bulma/pull/2737
          this.setBodyClass(BODY_FIXED_TOP_CLASS);
          this.spaced && this.setBodyClass(BODY_SPACED_FIXED_TOP_CLASS);
        } else {
          this.removeBodyClass(BODY_FIXED_TOP_CLASS);
          this.removeBodyClass(BODY_SPACED_FIXED_TOP_CLASS);
        }
      },
      setBodyFixedBottomClass: function setBodyFixedBottomClass(isSet) {
        this.checkIfFixedPropertiesAreColliding();

        if (isSet) {
          // TODO Apply only one of the classes once PR is merged in Bulma:
          // https://github.com/jgthms/bulma/pull/2737
          this.setBodyClass(BODY_FIXED_BOTTOM_CLASS);
          this.spaced && this.setBodyClass(BODY_SPACED_FIXED_BOTTOM_CLASS);
        } else {
          this.removeBodyClass(BODY_FIXED_BOTTOM_CLASS);
          this.removeBodyClass(BODY_SPACED_FIXED_BOTTOM_CLASS);
        }
      }
    },
    beforeMount: function beforeMount() {
      this.fixedTop && this.setBodyFixedTopClass(true);
      this.fixedBottom && this.setBodyFixedBottomClass(true);
    },
    beforeDestroy: function beforeDestroy() {
      if (this.fixedTop) {
        var className = this.spaced ? BODY_SPACED_FIXED_TOP_CLASS : BODY_FIXED_TOP_CLASS;
        this.removeBodyClass(className);
      } else if (this.fixedBottom) {
        var _className = this.spaced ? BODY_SPACED_FIXED_BOTTOM_CLASS : BODY_FIXED_BOTTOM_CLASS;

        this.removeBodyClass(_className);
      }
    },
    render: function render(createElement, fn) {
      return this.genNavbar(createElement);
    }
  };

  /* script */
  const __vue_script__$y = script$y;

  /* template */

    /* style */
    const __vue_inject_styles__$y = undefined;
    /* scoped */
    const __vue_scope_id__$y = undefined;
    /* module identifier */
    const __vue_module_identifier__$y = undefined;
    /* functional template */
    const __vue_is_functional_template__$y = undefined;
    /* style inject */
    
    /* style inject SSR */
    

    
    var Navbar = normalizeComponent_1(
      {},
      __vue_inject_styles__$y,
      __vue_script__$y,
      __vue_scope_id__$y,
      __vue_is_functional_template__$y,
      __vue_module_identifier__$y,
      undefined,
      undefined
    );

  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  var clickableWhiteList = ['div', 'span', 'input'];
  var script$z = {
    name: 'BNavbarItem',
    inheritAttrs: false,
    props: {
      tag: {
        type: String,
        default: 'a'
      },
      active: Boolean
    },
    methods: {
      /**
       * Keypress event that is bound to the document
       */
      keyPress: function keyPress(_ref) {
        var key = _ref.key;

        if (key === 'Escape' || key === 'Esc') {
          this.closeMenuRecursive(this, ['NavBar']);
        }
      },

      /**
       * Close parent if clicked outside.
       */
      handleClickEvent: function handleClickEvent(event) {
        var isOnWhiteList = clickableWhiteList.some(function (item) {
          return item === event.target.localName;
        });

        if (!isOnWhiteList) {
          var parent = this.closeMenuRecursive(this, ['NavbarDropdown', 'NavBar']);
          if (parent && parent.$data._isNavbarDropdown) this.closeMenuRecursive(parent, ['NavBar']);
        }
      },

      /**
       * Close parent recursively
       */
      closeMenuRecursive: function closeMenuRecursive(current, targetComponents) {
        if (!current.$parent) return null;
        var foundItem = targetComponents.reduce(function (acc, item) {
          if (current.$parent.$data["_is".concat(item)]) {
            current.$parent.closeMenu();
            return current.$parent;
          }

          return acc;
        }, null);
        return foundItem || this.closeMenuRecursive(current.$parent, targetComponents);
      }
    },
    mounted: function mounted() {
      if (typeof window !== 'undefined') {
        this.$el.addEventListener('click', this.handleClickEvent);
        document.addEventListener('keyup', this.keyPress);
      }
    },
    beforeDestroy: function beforeDestroy() {
      if (typeof window !== 'undefined') {
        this.$el.removeEventListener('click', this.handleClickEvent);
        document.removeEventListener('keyup', this.keyPress);
      }
    }
  };

  /* script */
  const __vue_script__$z = script$z;

  /* template */
  var __vue_render__$v = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c(_vm.tag,_vm._g(_vm._b({tag:"component",staticClass:"navbar-item",class:{
          'is-active': _vm.active
      }},'component',_vm.$attrs,false),_vm.$listeners),[_vm._t("default")],2)};
  var __vue_staticRenderFns__$v = [];

    /* style */
    const __vue_inject_styles__$z = undefined;
    /* scoped */
    const __vue_scope_id__$z = undefined;
    /* module identifier */
    const __vue_module_identifier__$z = undefined;
    /* functional template */
    const __vue_is_functional_template__$z = false;
    /* style inject */
    
    /* style inject SSR */
    

    
    var NavbarItem = normalizeComponent_1(
      { render: __vue_render__$v, staticRenderFns: __vue_staticRenderFns__$v },
      __vue_inject_styles__$z,
      __vue_script__$z,
      __vue_scope_id__$z,
      __vue_is_functional_template__$z,
      __vue_module_identifier__$z,
      undefined,
      undefined
    );

  //
  var script$A = {
    name: 'BNavbarDropdown',
    directives: {
      clickOutside: directive$1
    },
    props: {
      label: String,
      hoverable: Boolean,
      active: Boolean,
      right: Boolean,
      arrowless: Boolean,
      boxed: Boolean,
      closeOnClick: {
        type: Boolean,
        default: true
      },
      collapsible: Boolean
    },
    data: function data() {
      return {
        newActive: this.active,
        isHoverable: this.hoverable,
        _isNavbarDropdown: true // Used internally by NavbarItem

      };
    },
    watch: {
      active: function active(value) {
        this.newActive = value;
      }
    },
    methods: {
      showMenu: function showMenu() {
        this.newActive = true;
      },

      /**
      * See naming convetion of navbaritem
      */
      closeMenu: function closeMenu() {
        this.newActive = !this.closeOnClick;

        if (this.hoverable && this.closeOnClick) {
          this.isHoverable = false;
        }
      },
      checkHoverable: function checkHoverable() {
        if (this.hoverable) {
          this.isHoverable = true;
        }
      }
    }
  };

  /* script */
  const __vue_script__$A = script$A;

  /* template */
  var __vue_render__$w = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{directives:[{name:"click-outside",rawName:"v-click-outside",value:(_vm.closeMenu),expression:"closeMenu"}],staticClass:"navbar-item has-dropdown",class:{
          'is-hoverable': _vm.isHoverable,
          'is-active': _vm.newActive
      },on:{"mouseenter":_vm.checkHoverable}},[_c('a',{staticClass:"navbar-link",class:{
              'is-arrowless': _vm.arrowless,
              'is-active': _vm.newActive && _vm.collapsible
          },attrs:{"role":"menuitem","aria-haspopup":"true","href":"#"},on:{"click":function($event){$event.preventDefault();_vm.newActive = !_vm.newActive;}}},[(_vm.label)?[_vm._v(_vm._s(_vm.label))]:_vm._t("label")],2),_c('div',{directives:[{name:"show",rawName:"v-show",value:(!_vm.collapsible || (_vm.collapsible && _vm.newActive)),expression:"!collapsible || (collapsible && newActive)"}],staticClass:"navbar-dropdown",class:{
              'is-right': _vm.right,
              'is-boxed': _vm.boxed,
          }},[_vm._t("default")],2)])};
  var __vue_staticRenderFns__$w = [];

    /* style */
    const __vue_inject_styles__$A = undefined;
    /* scoped */
    const __vue_scope_id__$A = undefined;
    /* module identifier */
    const __vue_module_identifier__$A = undefined;
    /* functional template */
    const __vue_is_functional_template__$A = false;
    /* style inject */
    
    /* style inject SSR */
    

    
    var NavbarDropdown = normalizeComponent_1(
      { render: __vue_render__$w, staticRenderFns: __vue_staticRenderFns__$w },
      __vue_inject_styles__$A,
      __vue_script__$A,
      __vue_scope_id__$A,
      __vue_is_functional_template__$A,
      __vue_module_identifier__$A,
      undefined,
      undefined
    );

  var Plugin$j = {
    install: function install(Vue) {
      registerComponent(Vue, Navbar);
      registerComponent(Vue, NavbarItem);
      registerComponent(Vue, NavbarDropdown);
    }
  };
  use(Plugin$j);

  var _components$4;
  var script$B = {
    name: 'BNumberinput',
    components: (_components$4 = {}, _defineProperty(_components$4, Icon.name, Icon), _defineProperty(_components$4, Input.name, Input), _components$4),
    mixins: [FormElementMixin],
    inheritAttrs: false,
    props: {
      value: Number,
      min: {
        type: [Number, String]
      },
      max: [Number, String],
      step: [Number, String],
      minStep: [Number, String],
      exponential: [Boolean, Number],
      disabled: Boolean,
      type: {
        type: String,
        default: 'is-primary'
      },
      editable: {
        type: Boolean,
        default: true
      },
      controls: {
        type: Boolean,
        default: true
      },
      controlsAlignment: {
        type: String,
        default: 'center',
        validator: function validator(value) {
          return ['left', 'right', 'center'].indexOf(value) >= 0;
        }
      },
      controlsRounded: {
        type: Boolean,
        default: false
      },
      controlsPosition: String,
      placeholder: [Number, String],
      ariaMinusLabel: String,
      ariaPlusLabel: String
    },
    data: function data() {
      return {
        newValue: this.value,
        newStep: this.step || 1,
        newMinStep: this.minStep,
        timesPressed: 1,
        _elementRef: 'input'
      };
    },
    computed: {
      computedValue: {
        get: function get() {
          return this.newValue;
        },
        set: function set(value) {
          var newValue = value;

          if (value === '' || value === undefined || value === null) {
            if (this.minNumber !== undefined) {
              newValue = this.minNumber;
            } else {
              newValue = null;
            }
          }

          this.newValue = newValue;

          if (!isNaN(newValue) && newValue !== null && newValue !== '-0') {
            this.$emit('input', Number(newValue));
          }

          !this.isValid && this.$refs.input.checkHtml5Validity();
        }
      },
      controlsLeft: function controlsLeft() {
        if (this.controls && this.controlsAlignment !== 'right') {
          return this.controlsAlignment === 'left' ? ['minus', 'plus'] : ['minus'];
        }

        return [];
      },
      controlsRight: function controlsRight() {
        if (this.controls && this.controlsAlignment !== 'left') {
          return this.controlsAlignment === 'right' ? ['minus', 'plus'] : ['plus'];
        }

        return [];
      },
      fieldClasses: function fieldClasses() {
        return [{
          'has-addons': this.controlsPosition === 'compact'
        }, {
          'is-grouped': this.controlsPosition !== 'compact'
        }, {
          'is-expanded': this.expanded
        }];
      },
      buttonClasses: function buttonClasses() {
        return [this.type, this.size, {
          'is-rounded': this.controlsRounded
        }];
      },
      minNumber: function minNumber() {
        return typeof this.min === 'string' ? parseFloat(this.min) : this.min;
      },
      maxNumber: function maxNumber() {
        return typeof this.max === 'string' ? parseFloat(this.max) : this.max;
      },
      stepNumber: function stepNumber() {
        return typeof this.newStep === 'string' ? parseFloat(this.newStep) : this.newStep;
      },
      minStepNumber: function minStepNumber() {
        var step = typeof this.newMinStep !== 'undefined' ? this.newMinStep : this.newStep;
        return typeof step === 'string' ? parseFloat(step) : step;
      },
      disabledMin: function disabledMin() {
        return this.computedValue - this.stepNumber < this.minNumber;
      },
      disabledMax: function disabledMax() {
        return this.computedValue + this.stepNumber > this.maxNumber;
      },
      stepDecimals: function stepDecimals() {
        var step = this.minStepNumber.toString();
        var index = step.indexOf('.');

        if (index >= 0) {
          return step.substring(index + 1).length;
        }

        return 0;
      }
    },
    watch: {
      /**
       * When v-model is changed:
       *   1. Set internal value.
       */
      value: {
        immediate: true,
        handler: function handler(value) {
          this.newValue = value;
        }
      },
      step: function step(value) {
        this.newStep = value;
      },
      minStep: function minStep(value) {
        this.newMinStep = value;
      }
    },
    methods: {
      isDisabled: function isDisabled(control) {
        return this.disabled || (control === 'plus' ? this.disabledMax : this.disabledMin);
      },
      decrement: function decrement() {
        if (typeof this.minNumber === 'undefined' || this.computedValue - this.stepNumber >= this.minNumber) {
          if (this.computedValue === null || typeof this.computedValue === 'undefined') {
            if (this.maxNumber) {
              this.computedValue = this.maxNumber;
              return;
            }

            this.computedValue = 0;
          }

          var value = this.computedValue - this.stepNumber;
          this.computedValue = parseFloat(value.toFixed(this.stepDecimals));
        }
      },
      increment: function increment() {
        if (typeof this.maxNumber === 'undefined' || this.computedValue + this.stepNumber <= this.maxNumber) {
          if (this.computedValue === null || typeof this.computedValue === 'undefined') {
            if (this.minNumber) {
              this.computedValue = this.minNumber;
              return;
            }

            this.computedValue = 0;
          }

          var value = this.computedValue + this.stepNumber;
          this.computedValue = parseFloat(value.toFixed(this.stepDecimals));
        }
      },
      onControlClick: function onControlClick(event, inc) {
        // IE 11 -> filter click event
        if (event.detail !== 0 || event.type !== 'click') return;
        if (inc) this.increment();else this.decrement();
      },
      longPressTick: function longPressTick(inc) {
        var _this = this;

        if (inc) this.increment();else this.decrement();
        this._$intervalRef = setTimeout(function () {
          _this.longPressTick(inc);
        }, this.exponential ? 250 / (this.exponential * this.timesPressed++) : 250);
      },
      onStartLongPress: function onStartLongPress(event, inc) {
        if (event.button !== 0 && event.type !== 'touchstart') return;
        clearTimeout(this._$intervalRef);
        this.longPressTick(inc);
      },
      onStopLongPress: function onStopLongPress() {
        if (!this._$intervalRef) return;
        this.timesPressed = 1;
        clearTimeout(this._$intervalRef);
        this._$intervalRef = null;
      }
    }
  };

  /* script */
  const __vue_script__$B = script$B;

  /* template */
  var __vue_render__$x = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"b-numberinput field",class:_vm.fieldClasses},[_vm._l((_vm.controlsLeft),function(control){return _c('p',{key:control,class:['control', control],on:{"mouseup":_vm.onStopLongPress,"mouseleave":_vm.onStopLongPress,"touchend":_vm.onStopLongPress,"touchcancel":_vm.onStopLongPress}},[_c('button',{staticClass:"button",class:_vm.buttonClasses,attrs:{"type":"button","disabled":_vm.isDisabled(control),"aria-label":control === 'plus' ? _vm.ariaPlusLabel : _vm.ariaMinusLabel},on:{"mousedown":function($event){!_vm.isDisabled(control) && _vm.onStartLongPress($event, control === 'plus');},"touchstart":function($event){$event.preventDefault();!_vm.isDisabled(control) && _vm.onStartLongPress($event, control === 'plus');},"click":function($event){!_vm.isDisabled(control) && _vm.onControlClick($event, control === 'plus');}}},[_c('b-icon',{attrs:{"both":"","icon":control,"pack":_vm.iconPack,"size":_vm.iconSize}})],1)])}),_c('b-input',_vm._b({ref:"input",attrs:{"type":"number","step":_vm.minStepNumber,"max":_vm.max,"min":_vm.min,"size":_vm.size,"disabled":_vm.disabled,"readonly":!_vm.editable,"loading":_vm.loading,"rounded":_vm.rounded,"icon":_vm.icon,"icon-pack":_vm.iconPack,"autocomplete":_vm.autocomplete,"expanded":_vm.expanded,"placeholder":_vm.placeholder,"use-html5-validation":_vm.useHtml5Validation},on:{"focus":function($event){return _vm.$emit('focus', $event)},"blur":function($event){return _vm.$emit('blur', $event)}},model:{value:(_vm.computedValue),callback:function ($$v) {_vm.computedValue=$$v;},expression:"computedValue"}},'b-input',_vm.$attrs,false)),_vm._l((_vm.controlsRight),function(control){return _c('p',{key:control,class:['control', control],on:{"mouseup":_vm.onStopLongPress,"mouseleave":_vm.onStopLongPress,"touchend":_vm.onStopLongPress,"touchcancel":_vm.onStopLongPress}},[_c('button',{staticClass:"button",class:_vm.buttonClasses,attrs:{"type":"button","disabled":_vm.isDisabled(control),"aria-label":control === 'plus' ? _vm.ariaPlusLabel : _vm.ariaMinusLabel},on:{"mousedown":function($event){!_vm.isDisabled(control) && _vm.onStartLongPress($event, control === 'plus');},"touchstart":function($event){$event.preventDefault();!_vm.isDisabled(control) && _vm.onStartLongPress($event, control === 'plus');},"click":function($event){!_vm.isDisabled(control) && _vm.onControlClick($event, control === 'plus');}}},[_c('b-icon',{attrs:{"both":"","icon":control,"pack":_vm.iconPack,"size":_vm.iconSize}})],1)])})],2)};
  var __vue_staticRenderFns__$x = [];

    /* style */
    const __vue_inject_styles__$B = undefined;
    /* scoped */
    const __vue_scope_id__$B = undefined;
    /* module identifier */
    const __vue_module_identifier__$B = undefined;
    /* functional template */
    const __vue_is_functional_template__$B = false;
    /* style inject */
    
    /* style inject SSR */
    

    
    var Numberinput = normalizeComponent_1(
      { render: __vue_render__$x, staticRenderFns: __vue_staticRenderFns__$x },
      __vue_inject_styles__$B,
      __vue_script__$B,
      __vue_scope_id__$B,
      __vue_is_functional_template__$B,
      __vue_module_identifier__$B,
      undefined,
      undefined
    );

  var Plugin$k = {
    install: function install(Vue) {
      registerComponent(Vue, Numberinput);
    }
  };
  use(Plugin$k);

  //
  var script$C = {
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

  /* script */
  const __vue_script__$C = script$C;

  /* template */
  var __vue_render__$y = function () {
  var _obj;
  var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c(_vm.tag,_vm._b({tag:"component",staticClass:"pagination-link",class:( _obj = { 'is-current': _vm.page.isCurrent }, _obj[_vm.page.class] = true, _obj ),attrs:{"role":"button","href":_vm.href,"disabled":_vm.isDisabled,"aria-label":_vm.page['aria-label'],"aria-current":_vm.page.isCurrent},on:{"click":function($event){$event.preventDefault();return _vm.page.click($event)}}},'component',_vm.$attrs,false),[_vm._t("default",[_vm._v(_vm._s(_vm.page.number))])],2)};
  var __vue_staticRenderFns__$y = [];

    /* style */
    const __vue_inject_styles__$C = undefined;
    /* scoped */
    const __vue_scope_id__$C = undefined;
    /* module identifier */
    const __vue_module_identifier__$C = undefined;
    /* functional template */
    const __vue_is_functional_template__$C = false;
    /* style inject */
    
    /* style inject SSR */
    

    
    var PaginationButton = normalizeComponent_1(
      { render: __vue_render__$y, staticRenderFns: __vue_staticRenderFns__$y },
      __vue_inject_styles__$C,
      __vue_script__$C,
      __vue_scope_id__$C,
      __vue_is_functional_template__$C,
      __vue_module_identifier__$C,
      undefined,
      undefined
    );

  var _components$5;
  var script$D = {
    name: 'BPagination',
    components: (_components$5 = {}, _defineProperty(_components$5, Icon.name, Icon), _defineProperty(_components$5, PaginationButton.name, PaginationButton), _components$5),
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
      ariaCurrentLabel: String
    },
    computed: {
      rootClasses: function rootClasses() {
        return [this.order, this.size, {
          'is-simple': this.simple,
          'is-rounded': this.rounded
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
        this.$emit('change', num); // Set focus on element to keep tab order

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
      }
    }
  };

  /* script */
  const __vue_script__$D = script$D;

  /* template */
  var __vue_render__$z = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('nav',{staticClass:"pagination",class:_vm.rootClasses},[(_vm.$scopedSlots.previous)?_vm._t("previous",[_c('b-icon',{attrs:{"icon":_vm.iconPrev,"pack":_vm.iconPack,"both":"","aria-hidden":"true"}})],{"page":_vm.getPage(_vm.current - 1, {
              disabled: !_vm.hasPrev,
              class: 'pagination-previous',
              'aria-label': _vm.ariaPreviousLabel
      })}):_c('BPaginationButton',{staticClass:"pagination-previous",attrs:{"disabled":!_vm.hasPrev,"page":_vm.getPage(_vm.current - 1),"aria-label":_vm.ariaPreviousLabel}},[_c('b-icon',{attrs:{"icon":_vm.iconPrev,"pack":_vm.iconPack,"both":"","aria-hidden":"true"}})],1),(_vm.$scopedSlots.next)?_vm._t("next",[_c('b-icon',{attrs:{"icon":_vm.iconNext,"pack":_vm.iconPack,"both":"","aria-hidden":"true"}})],{"page":_vm.getPage(_vm.current + 1, {
              disabled: !_vm.hasNext,
              class: 'pagination-next',
              'aria-label': _vm.ariaNextLabel
      })}):_c('BPaginationButton',{staticClass:"pagination-next",attrs:{"disabled":!_vm.hasNext,"page":_vm.getPage(_vm.current + 1),"aria-label":_vm.ariaNextLabel}},[_c('b-icon',{attrs:{"icon":_vm.iconNext,"pack":_vm.iconPack,"both":"","aria-hidden":"true"}})],1),(_vm.simple)?_c('small',{staticClass:"info"},[(_vm.perPage == 1)?[_vm._v(" "+_vm._s(_vm.firstItem)+" / "+_vm._s(_vm.total)+" ")]:[_vm._v(" "+_vm._s(_vm.firstItem)+"-"+_vm._s(Math.min(_vm.current * _vm.perPage, _vm.total))+" / "+_vm._s(_vm.total)+" ")]],2):_c('ul',{staticClass:"pagination-list"},[(_vm.hasFirst)?_c('li',[(_vm.$scopedSlots.default)?_vm._t("default",null,{"page":_vm.getPage(1)}):_c('BPaginationButton',{attrs:{"page":_vm.getPage(1)}})],2):_vm._e(),(_vm.hasFirstEllipsis)?_c('li',[_c('span',{staticClass:"pagination-ellipsis"},[_vm._v("…")])]):_vm._e(),_vm._l((_vm.pagesInRange),function(page){return _c('li',{key:page.number},[(_vm.$scopedSlots.default)?_vm._t("default",null,{"page":page}):_c('BPaginationButton',{attrs:{"page":page}})],2)}),(_vm.hasLastEllipsis)?_c('li',[_c('span',{staticClass:"pagination-ellipsis"},[_vm._v("…")])]):_vm._e(),(_vm.hasLast)?_c('li',[(_vm.$scopedSlots.default)?_vm._t("default",null,{"page":_vm.getPage(_vm.pageCount)}):_c('BPaginationButton',{attrs:{"page":_vm.getPage(_vm.pageCount)}})],2):_vm._e()],2)],2)};
  var __vue_staticRenderFns__$z = [];

    /* style */
    const __vue_inject_styles__$D = undefined;
    /* scoped */
    const __vue_scope_id__$D = undefined;
    /* module identifier */
    const __vue_module_identifier__$D = undefined;
    /* functional template */
    const __vue_is_functional_template__$D = false;
    /* style inject */
    
    /* style inject SSR */
    

    
    var Pagination = normalizeComponent_1(
      { render: __vue_render__$z, staticRenderFns: __vue_staticRenderFns__$z },
      __vue_inject_styles__$D,
      __vue_script__$D,
      __vue_scope_id__$D,
      __vue_is_functional_template__$D,
      __vue_module_identifier__$D,
      undefined,
      undefined
    );

  var Plugin$l = {
    install: function install(Vue) {
      registerComponent(Vue, Pagination);
      registerComponent(Vue, PaginationButton);
    }
  };
  use(Plugin$l);

  var script$E = {
    name: 'BProgress',
    mixins: [ProviderParentMixin('progress')],
    props: {
      type: {
        type: [String, Object],
        default: 'is-darkgrey'
      },
      size: String,
      value: {
        type: Number,
        default: undefined
      },
      max: {
        type: Number,
        default: 100
      },
      showValue: {
        type: Boolean,
        default: false
      },
      format: {
        type: String,
        default: 'raw',
        validator: function validator(value) {
          return ['raw', 'percent'].indexOf(value) >= 0;
        }
      },
      precision: {
        type: Number,
        default: 2
      },
      keepTrailingZeroes: {
        type: Boolean,
        default: false
      },
      locale: {
        type: [String, Array],
        default: function _default() {
          return config.defaultLocale;
        }
      }
    },
    computed: {
      isIndeterminate: function isIndeterminate() {
        return this.value === undefined || this.value === null;
      },
      newType: function newType() {
        return [this.size, this.type, {
          'is-more-than-half': this.value && this.value > this.max / 2
        }];
      },
      newValue: function newValue() {
        return this.calculateValue(this.value);
      },
      isNative: function isNative() {
        return this.$slots.bar === undefined;
      },
      wrapperClasses: function wrapperClasses() {
        return _defineProperty({
          'is-not-native': !this.isNative
        }, this.size, !this.isNative);
      }
    },
    watch: {
      /**
       * When value is changed back to undefined, value of native progress get reset to 0.
       * Need to add and remove the value attribute to have the indeterminate or not.
       */
      isIndeterminate: function isIndeterminate(indeterminate) {
        var _this = this;

        this.$nextTick(function () {
          if (_this.$refs.progress) {
            if (indeterminate) {
              _this.$refs.progress.removeAttribute('value');
            } else {
              _this.$refs.progress.setAttribute('value', _this.value);
            }
          }
        });
      }
    },
    methods: {
      calculateValue: function calculateValue(value) {
        if (value === undefined || value === null || isNaN(value)) {
          return undefined;
        }

        var minimumFractionDigits = this.keepTrailingZeroes ? this.precision : 0;
        var maximumFractionDigits = this.precision;

        if (this.format === 'percent') {
          return new Intl.NumberFormat(this.locale, {
            style: 'percent',
            minimumFractionDigits: minimumFractionDigits,
            maximumFractionDigits: maximumFractionDigits
          }).format(value / this.max);
        }

        return new Intl.NumberFormat(this.locale, {
          minimumFractionDigits: minimumFractionDigits,
          maximumFractionDigits: maximumFractionDigits
        }).format(value);
      }
    }
  };

  /* script */
  const __vue_script__$E = script$E;

  /* template */
  var __vue_render__$A = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"progress-wrapper",class:_vm.wrapperClasses},[(_vm.isNative)?_c('progress',{ref:"progress",staticClass:"progress",class:_vm.newType,attrs:{"max":_vm.max},domProps:{"value":_vm.value}},[_vm._v(_vm._s(_vm.newValue))]):_vm._t("bar"),(_vm.isNative && _vm.showValue)?_c('p',{staticClass:"progress-value"},[_vm._t("default",[_vm._v(_vm._s(_vm.newValue))])],2):_vm._e()],2)};
  var __vue_staticRenderFns__$A = [];

    /* style */
    const __vue_inject_styles__$E = undefined;
    /* scoped */
    const __vue_scope_id__$E = undefined;
    /* module identifier */
    const __vue_module_identifier__$E = undefined;
    /* functional template */
    const __vue_is_functional_template__$E = false;
    /* style inject */
    
    /* style inject SSR */
    

    
    var Progress = normalizeComponent_1(
      { render: __vue_render__$A, staticRenderFns: __vue_staticRenderFns__$A },
      __vue_inject_styles__$E,
      __vue_script__$E,
      __vue_scope_id__$E,
      __vue_is_functional_template__$E,
      __vue_module_identifier__$E,
      undefined,
      undefined
    );

  //
  var script$F = {
    name: 'BProgressBar',
    mixins: [InjectedChildMixin('progress')],
    props: {
      type: {
        type: [String, Object],
        default: undefined
      },
      value: {
        type: Number,
        default: undefined
      },
      showValue: {
        type: Boolean,
        default: false
      }
    },
    computed: {
      newType: function newType() {
        return [this.parent.size, this.type || this.parent.type];
      },
      newShowValue: function newShowValue() {
        return this.showValue || this.parent.showValue;
      },
      newValue: function newValue() {
        return this.parent.calculateValue(this.value);
      },
      barWidth: function barWidth() {
        return "".concat(this.value * 100 / this.parent.max, "%");
      }
    }
  };

  /* script */
  const __vue_script__$F = script$F;

  /* template */
  var __vue_render__$B = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"progress-bar",class:_vm.newType,style:({width: _vm.barWidth}),attrs:{"role":"progressbar","aria-valuenow":_vm.value,"aria-valuemax":_vm.parent.max,"aria-valuemin":"0"}},[(_vm.newShowValue)?_c('p',{staticClass:"progress-value"},[_vm._t("default",[_vm._v(_vm._s(_vm.newValue))])],2):_vm._e()])};
  var __vue_staticRenderFns__$B = [];

    /* style */
    const __vue_inject_styles__$F = undefined;
    /* scoped */
    const __vue_scope_id__$F = undefined;
    /* module identifier */
    const __vue_module_identifier__$F = undefined;
    /* functional template */
    const __vue_is_functional_template__$F = false;
    /* style inject */
    
    /* style inject SSR */
    

    
    var ProgressBar = normalizeComponent_1(
      { render: __vue_render__$B, staticRenderFns: __vue_staticRenderFns__$B },
      __vue_inject_styles__$F,
      __vue_script__$F,
      __vue_scope_id__$F,
      __vue_is_functional_template__$F,
      __vue_module_identifier__$F,
      undefined,
      undefined
    );

  var Plugin$m = {
    install: function install(Vue) {
      registerComponent(Vue, Progress);
      registerComponent(Vue, ProgressBar);
    }
  };
  use(Plugin$m);

  //
  var script$G = {
    name: 'BRadio',
    mixins: [CheckRadioMixin]
  };

  /* script */
  const __vue_script__$G = script$G;

  /* template */
  var __vue_render__$C = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('label',{ref:"label",staticClass:"b-radio radio",class:[_vm.size, { 'is-disabled': _vm.disabled }],attrs:{"disabled":_vm.disabled},on:{"click":_vm.focus,"keydown":function($event){if(!$event.type.indexOf('key')&&_vm._k($event.keyCode,"enter",13,$event.key,"Enter")){ return null; }$event.preventDefault();return _vm.$refs.label.click()}}},[_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.computedValue),expression:"computedValue"}],ref:"input",attrs:{"type":"radio","disabled":_vm.disabled,"required":_vm.required,"name":_vm.name},domProps:{"value":_vm.nativeValue,"checked":_vm._q(_vm.computedValue,_vm.nativeValue)},on:{"click":function($event){$event.stopPropagation();},"change":function($event){_vm.computedValue=_vm.nativeValue;}}}),_c('span',{staticClass:"check",class:_vm.type}),_c('span',{staticClass:"control-label"},[_vm._t("default")],2)])};
  var __vue_staticRenderFns__$C = [];

    /* style */
    const __vue_inject_styles__$G = undefined;
    /* scoped */
    const __vue_scope_id__$G = undefined;
    /* module identifier */
    const __vue_module_identifier__$G = undefined;
    /* functional template */
    const __vue_is_functional_template__$G = false;
    /* style inject */
    
    /* style inject SSR */
    

    
    var Radio = normalizeComponent_1(
      { render: __vue_render__$C, staticRenderFns: __vue_staticRenderFns__$C },
      __vue_inject_styles__$G,
      __vue_script__$G,
      __vue_scope_id__$G,
      __vue_is_functional_template__$G,
      __vue_module_identifier__$G,
      undefined,
      undefined
    );

  //
  var script$H = {
    name: 'BRadioButton',
    mixins: [CheckRadioMixin],
    props: {
      type: {
        type: String,
        default: 'is-primary'
      },
      expanded: Boolean
    },
    data: function data() {
      return {
        isFocused: false
      };
    },
    computed: {
      isSelected: function isSelected() {
        return this.newValue === this.nativeValue;
      },
      labelClass: function labelClass() {
        return [this.isSelected ? this.type : null, this.size, {
          'is-selected': this.isSelected,
          'is-disabled': this.disabled,
          'is-focused': this.isFocused
        }];
      }
    }
  };

  /* script */
  const __vue_script__$H = script$H;

  /* template */
  var __vue_render__$D = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"control",class:{ 'is-expanded': _vm.expanded }},[_c('label',{ref:"label",staticClass:"b-radio radio button",class:_vm.labelClass,attrs:{"disabled":_vm.disabled},on:{"click":_vm.focus,"keydown":function($event){if(!$event.type.indexOf('key')&&_vm._k($event.keyCode,"enter",13,$event.key,"Enter")){ return null; }$event.preventDefault();return _vm.$refs.label.click()}}},[_vm._t("default"),_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.computedValue),expression:"computedValue"}],ref:"input",attrs:{"type":"radio","disabled":_vm.disabled,"required":_vm.required,"name":_vm.name},domProps:{"value":_vm.nativeValue,"checked":_vm._q(_vm.computedValue,_vm.nativeValue)},on:{"click":function($event){$event.stopPropagation();},"focus":function($event){_vm.isFocused = true;},"blur":function($event){_vm.isFocused = false;},"change":function($event){_vm.computedValue=_vm.nativeValue;}}})],2)])};
  var __vue_staticRenderFns__$D = [];

    /* style */
    const __vue_inject_styles__$H = undefined;
    /* scoped */
    const __vue_scope_id__$H = undefined;
    /* module identifier */
    const __vue_module_identifier__$H = undefined;
    /* functional template */
    const __vue_is_functional_template__$H = false;
    /* style inject */
    
    /* style inject SSR */
    

    
    var RadioButton = normalizeComponent_1(
      { render: __vue_render__$D, staticRenderFns: __vue_staticRenderFns__$D },
      __vue_inject_styles__$H,
      __vue_script__$H,
      __vue_scope_id__$H,
      __vue_is_functional_template__$H,
      __vue_module_identifier__$H,
      undefined,
      undefined
    );

  var Plugin$n = {
    install: function install(Vue) {
      registerComponent(Vue, Radio);
      registerComponent(Vue, RadioButton);
    }
  };
  use(Plugin$n);

  var script$I = {
    name: 'BRate',
    components: _defineProperty({}, Icon.name, Icon),
    props: {
      value: {
        type: Number,
        default: 0
      },
      max: {
        type: Number,
        default: 5
      },
      icon: {
        type: String,
        default: 'star'
      },
      iconPack: String,
      size: String,
      spaced: Boolean,
      rtl: Boolean,
      disabled: Boolean,
      showScore: Boolean,
      showText: Boolean,
      customText: String,
      texts: Array,
      locale: {
        type: [String, Array],
        default: function _default() {
          return config.defaultLocale;
        }
      }
    },
    data: function data() {
      return {
        newValue: this.value,
        hoverValue: 0
      };
    },
    computed: {
      halfStyle: function halfStyle() {
        return "width:".concat(this.valueDecimal, "%");
      },
      showMe: function showMe() {
        var result = '';

        if (this.showScore) {
          result = this.disabled ? this.value : this.newValue;

          if (result === 0) {
            result = '';
          } else {
            result = new Intl.NumberFormat(this.locale).format(this.value);
          }
        } else if (this.showText) {
          result = this.texts[Math.ceil(this.newValue) - 1];
        }

        return result;
      },
      valueDecimal: function valueDecimal() {
        return this.value * 100 - Math.floor(this.value) * 100;
      }
    },
    watch: {
      // When v-model is changed set the new value.
      value: function value(_value) {
        this.newValue = _value;
      }
    },
    methods: {
      resetNewValue: function resetNewValue() {
        if (this.disabled) return;
        this.hoverValue = 0;
      },
      previewRate: function previewRate(index, event) {
        if (this.disabled) return;
        this.hoverValue = index;
        event.stopPropagation();
      },
      confirmValue: function confirmValue(index) {
        if (this.disabled) return;
        this.newValue = index;
        this.$emit('change', this.newValue);
        this.$emit('input', this.newValue);
      },
      checkHalf: function checkHalf(index) {
        var showWhenDisabled = this.disabled && this.valueDecimal > 0 && index - 1 < this.value && index > this.value;
        return showWhenDisabled;
      },
      rateClass: function rateClass(index) {
        var output = '';
        var currentValue = this.hoverValue !== 0 ? this.hoverValue : this.newValue;

        if (index <= currentValue) {
          output = 'set-on';
        } else if (this.disabled && Math.ceil(this.value) === index) {
          output = 'set-half';
        }

        return output;
      }
    }
  };

  /* script */
  const __vue_script__$I = script$I;

  /* template */
  var __vue_render__$E = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"rate",class:{ 'is-disabled': _vm.disabled, 'is-spaced': _vm.spaced, 'is-rtl': _vm.rtl }},[_vm._l((_vm.max),function(item,index){return _c('div',{key:index,staticClass:"rate-item",class:_vm.rateClass(item),on:{"mousemove":function($event){return _vm.previewRate(item, $event)},"mouseleave":_vm.resetNewValue,"click":function($event){$event.preventDefault();return _vm.confirmValue(item)}}},[_c('b-icon',{attrs:{"pack":_vm.iconPack,"icon":_vm.icon,"size":_vm.size}}),(_vm.checkHalf(item))?_c('b-icon',{staticClass:"is-half",style:(_vm.halfStyle),attrs:{"pack":_vm.iconPack,"icon":_vm.icon,"size":_vm.size}}):_vm._e()],1)}),(_vm.showText || _vm.showScore || _vm.customText)?_c('div',{staticClass:"rate-text",class:_vm.size},[_c('span',[_vm._v(_vm._s(_vm.showMe))]),(_vm.customText && !_vm.showText)?_c('span',[_vm._v(_vm._s(_vm.customText))]):_vm._e()]):_vm._e()],2)};
  var __vue_staticRenderFns__$E = [];

    /* style */
    const __vue_inject_styles__$I = undefined;
    /* scoped */
    const __vue_scope_id__$I = undefined;
    /* module identifier */
    const __vue_module_identifier__$I = undefined;
    /* functional template */
    const __vue_is_functional_template__$I = false;
    /* style inject */
    
    /* style inject SSR */
    

    
    var Rate = normalizeComponent_1(
      { render: __vue_render__$E, staticRenderFns: __vue_staticRenderFns__$E },
      __vue_inject_styles__$I,
      __vue_script__$I,
      __vue_scope_id__$I,
      __vue_is_functional_template__$I,
      __vue_module_identifier__$I,
      undefined,
      undefined
    );

  var Plugin$o = {
    install: function install(Vue) {
      registerComponent(Vue, Rate);
    }
  };
  use(Plugin$o);

  var Plugin$p = {
    install: function install(Vue) {
      registerComponent(Vue, Select);
    }
  };
  use(Plugin$p);

  var script$J = {
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

  /* script */
  const __vue_script__$J = script$J;

  /* template */

    /* style */
    const __vue_inject_styles__$J = undefined;
    /* scoped */
    const __vue_scope_id__$J = undefined;
    /* module identifier */
    const __vue_module_identifier__$J = undefined;
    /* functional template */
    const __vue_is_functional_template__$J = undefined;
    /* style inject */
    
    /* style inject SSR */
    

    
    var Skeleton = normalizeComponent_1(
      {},
      __vue_inject_styles__$J,
      __vue_script__$J,
      __vue_scope_id__$J,
      __vue_is_functional_template__$J,
      __vue_module_identifier__$J,
      undefined,
      undefined
    );

  var Plugin$q = {
    install: function install(Vue) {
      registerComponent(Vue, Skeleton);
    }
  };
  use(Plugin$q);

  //
  var script$K = {
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

  /* script */
  const __vue_script__$K = script$K;

  /* template */
  var __vue_render__$F = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"b-sidebar"},[(_vm.overlay && _vm.isOpen)?_c('div',{staticClass:"sidebar-background"}):_vm._e(),_c('transition',{attrs:{"name":_vm.transitionName},on:{"before-enter":_vm.beforeEnter,"after-enter":_vm.afterEnter}},[_c('div',{directives:[{name:"show",rawName:"v-show",value:(_vm.isOpen),expression:"isOpen"}],ref:"sidebarContent",staticClass:"sidebar-content",class:_vm.rootClasses},[_vm._t("default")],2)])],1)};
  var __vue_staticRenderFns__$F = [];

    /* style */
    const __vue_inject_styles__$K = undefined;
    /* scoped */
    const __vue_scope_id__$K = undefined;
    /* module identifier */
    const __vue_module_identifier__$K = undefined;
    /* functional template */
    const __vue_is_functional_template__$K = false;
    /* style inject */
    
    /* style inject SSR */
    

    
    var Sidebar = normalizeComponent_1(
      { render: __vue_render__$F, staticRenderFns: __vue_staticRenderFns__$F },
      __vue_inject_styles__$K,
      __vue_script__$K,
      __vue_scope_id__$K,
      __vue_is_functional_template__$K,
      __vue_module_identifier__$K,
      undefined,
      undefined
    );

  var Plugin$r = {
    install: function install(Vue) {
      registerComponent(Vue, Sidebar);
    }
  };
  use(Plugin$r);

  var script$L = {
    name: 'BTooltip',
    props: {
      active: {
        type: Boolean,
        default: true
      },
      type: {
        type: String,
        default: function _default() {
          return config.defaultTooltipType;
        }
      },
      label: String,
      delay: {
        type: Number,
        default: function _default() {
          return config.defaultTooltipDelay;
        }
      },
      position: {
        type: String,
        default: 'is-top',
        validator: function validator(value) {
          return ['is-top', 'is-bottom', 'is-left', 'is-right'].indexOf(value) > -1;
        }
      },
      triggers: {
        type: Array,
        default: function _default() {
          return ['hover'];
        }
      },
      always: Boolean,
      square: Boolean,
      dashed: Boolean,
      multilined: Boolean,
      size: {
        type: String,
        default: 'is-medium'
      },
      appendToBody: Boolean,
      animated: {
        type: Boolean,
        default: true
      },
      animation: {
        type: String,
        default: 'fade'
      },
      contentClass: String,
      autoClose: {
        type: [Array, Boolean],
        default: true
      }
    },
    data: function data() {
      return {
        isActive: false,
        triggerStyle: {},
        timer: null,
        _bodyEl: undefined // Used to append to body

      };
    },
    computed: {
      rootClasses: function rootClasses() {
        return ['b-tooltip', this.type, this.position, this.size, {
          'is-square': this.square,
          'is-always': this.always,
          'is-multiline': this.multilined,
          'is-dashed': this.dashed
        }];
      },
      newAnimation: function newAnimation() {
        return this.animated ? this.animation : undefined;
      }
    },
    watch: {
      isActive: function isActive(value) {
        if (this.appendToBody) {
          this.updateAppendToBody();
        }
      }
    },
    methods: {
      updateAppendToBody: function updateAppendToBody() {
        var tooltip = this.$refs.tooltip;
        var trigger = this.$refs.trigger;

        if (tooltip && trigger) {
          // update wrapper tooltip
          var tooltipEl = this.$data._bodyEl.children[0];
          tooltipEl.classList.forEach(function (item) {
            return tooltipEl.classList.remove(item);
          });

          if (this.$vnode && this.$vnode.data && this.$vnode.data.staticClass) {
            tooltipEl.classList.add(this.$vnode.data.staticClass);
          }

          this.rootClasses.forEach(function (item) {
            if (_typeof(item) === 'object') {
              for (var key in item) {
                if (item[key]) {
                  tooltipEl.classList.add(key);
                }
              }
            } else {
              tooltipEl.classList.add(item);
            }
          });
          tooltipEl.style.width = "".concat(trigger.clientWidth, "px");
          tooltipEl.style.height = "".concat(trigger.clientHeight, "px");
          var rect = trigger.getBoundingClientRect();
          var top = rect.top + window.scrollY;
          var left = rect.left + window.scrollX;
          var wrapper = this.$data._bodyEl;
          wrapper.style.position = 'absolute';
          wrapper.style.top = "".concat(top, "px");
          wrapper.style.left = "".concat(left, "px");
          wrapper.style.zIndex = this.isActive || this.always ? '99' : '-1';
          this.triggerStyle = {
            zIndex: this.isActive || this.always ? '100' : undefined
          };
        }
      },
      onClick: function onClick() {
        var _this = this;

        if (this.triggers.indexOf('click') < 0) return; // if not active, toggle after clickOutside event
        // this fixes toggling programmatic

        this.$nextTick(function () {
          setTimeout(function () {
            return _this.open();
          });
        });
      },
      onHover: function onHover() {
        if (this.triggers.indexOf('hover') < 0) return;
        this.open();
      },
      onContextMenu: function onContextMenu(e) {
        if (this.triggers.indexOf('contextmenu') < 0) return;
        e.preventDefault();
        this.open();
      },
      onFocus: function onFocus() {
        if (this.triggers.indexOf('focus') < 0) return;
        this.open();
      },
      open: function open() {
        var _this2 = this;

        if (this.delay) {
          this.timer = setTimeout(function () {
            _this2.isActive = true;
            _this2.timer = null;
          }, this.delay);
        } else {
          this.isActive = true;
        }
      },
      close: function close() {
        if (typeof this.autoClose === 'boolean') {
          this.isActive = !this.autoClose;
          if (this.autoClose && this.timer) clearTimeout(this.timer);
        }
      },

      /**
      * Close tooltip if clicked outside.
      */
      clickedOutside: function clickedOutside(event) {
        if (this.isActive) {
          if (Array.isArray(this.autoClose)) {
            if (this.autoClose.includes('outside')) {
              if (!this.isInWhiteList(event.target)) {
                this.isActive = false;
                return;
              }
            }

            if (this.autoClose.includes('inside')) {
              if (this.isInWhiteList(event.target)) this.isActive = false;
            }
          }
        }
      },

      /**
       * Keypress event that is bound to the document
       */
      keyPress: function keyPress(_ref) {
        var key = _ref.key;

        if (this.isActive && (key === 'Escape' || key === 'Esc')) {
          if (Array.isArray(this.autoClose)) {
            if (this.autoClose.indexOf('escape') >= 0) this.isActive = false;
          }
        }
      },

      /**
      * White-listed items to not close when clicked.
      */
      isInWhiteList: function isInWhiteList(el) {
        if (el === this.$refs.content) return true; // All chidren from content

        if (this.$refs.content !== undefined) {
          var children = this.$refs.content.querySelectorAll('*');
          var _iteratorNormalCompletion = true;
          var _didIteratorError = false;
          var _iteratorError = undefined;

          try {
            for (var _iterator = children[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
              var child = _step.value;

              if (el === child) {
                return true;
              }
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

        return false;
      }
    },
    mounted: function mounted() {
      if (this.appendToBody && typeof window !== 'undefined') {
        this.$data._bodyEl = createAbsoluteElement(this.$refs.content);
        this.updateAppendToBody();
      }
    },
    created: function created() {
      if (typeof window !== 'undefined') {
        document.addEventListener('click', this.clickedOutside);
        document.addEventListener('keyup', this.keyPress);
      }
    },
    beforeDestroy: function beforeDestroy() {
      if (typeof window !== 'undefined') {
        document.removeEventListener('click', this.clickedOutside);
        document.removeEventListener('keyup', this.keyPress);
      }

      if (this.appendToBody) {
        removeElement(this.$data._bodyEl);
      }
    }
  };

  /* script */
  const __vue_script__$L = script$L;

  /* template */
  var __vue_render__$G = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('span',{ref:"tooltip",class:_vm.rootClasses},[_c('transition',{attrs:{"name":_vm.newAnimation}},[_c('div',{directives:[{name:"show",rawName:"v-show",value:(_vm.active && (_vm.isActive || _vm.always)),expression:"active && (isActive || always)"}],ref:"content",class:['tooltip-content', _vm.contentClass]},[(_vm.label)?[_vm._v(_vm._s(_vm.label))]:(_vm.$slots.content)?[_vm._t("content")]:_vm._e()],2)]),_c('div',{ref:"trigger",staticClass:"tooltip-trigger",style:(_vm.triggerStyle),on:{"click":_vm.onClick,"contextmenu":_vm.onContextMenu,"mouseenter":_vm.onHover,"!focus":function($event){return _vm.onFocus($event)},"!blur":function($event){return _vm.close($event)},"mouseleave":_vm.close}},[_vm._t("default")],2)],1)};
  var __vue_staticRenderFns__$G = [];

    /* style */
    const __vue_inject_styles__$L = undefined;
    /* scoped */
    const __vue_scope_id__$L = undefined;
    /* module identifier */
    const __vue_module_identifier__$L = undefined;
    /* functional template */
    const __vue_is_functional_template__$L = false;
    /* style inject */
    
    /* style inject SSR */
    

    
    var Tooltip = normalizeComponent_1(
      { render: __vue_render__$G, staticRenderFns: __vue_staticRenderFns__$G },
      __vue_inject_styles__$L,
      __vue_script__$L,
      __vue_scope_id__$L,
      __vue_is_functional_template__$L,
      __vue_module_identifier__$L,
      undefined,
      undefined
    );

  var script$M = {
    name: 'BSliderThumb',
    components: _defineProperty({}, Tooltip.name, Tooltip),
    inheritAttrs: false,
    props: {
      value: {
        type: Number,
        default: 0
      },
      type: {
        type: String,
        default: ''
      },
      tooltip: {
        type: Boolean,
        default: true
      },
      indicator: {
        type: Boolean,
        default: false
      },
      customFormatter: Function,
      format: {
        type: String,
        default: 'raw',
        validator: function validator(value) {
          return ['raw', 'percent'].indexOf(value) >= 0;
        }
      },
      locale: {
        type: [String, Array],
        default: function _default() {
          return config.defaultLocale;
        }
      },
      tooltipAlways: {
        type: Boolean,
        default: false
      }
    },
    data: function data() {
      return {
        isFocused: false,
        dragging: false,
        startX: 0,
        startPosition: 0,
        newPosition: null,
        oldValue: this.value
      };
    },
    computed: {
      disabled: function disabled() {
        return this.$parent.disabled;
      },
      max: function max() {
        return this.$parent.max;
      },
      min: function min() {
        return this.$parent.min;
      },
      step: function step() {
        return this.$parent.step;
      },
      precision: function precision() {
        return this.$parent.precision;
      },
      currentPosition: function currentPosition() {
        return "".concat((this.value - this.min) / (this.max - this.min) * 100, "%");
      },
      wrapperStyle: function wrapperStyle() {
        return {
          left: this.currentPosition
        };
      },
      formattedValue: function formattedValue() {
        if (typeof this.customFormatter !== 'undefined') {
          return this.customFormatter(this.value);
        }

        if (this.format === 'percent') {
          return new Intl.NumberFormat(this.locale, {
            style: 'percent'
          }).format((this.value - this.min) / (this.max - this.min));
        }

        return new Intl.NumberFormat(this.locale).format(this.value);
      }
    },
    methods: {
      onFocus: function onFocus() {
        this.isFocused = true;
      },
      onBlur: function onBlur() {
        this.isFocused = false;
      },
      onButtonDown: function onButtonDown(event) {
        if (this.disabled) return;
        event.preventDefault();
        this.onDragStart(event);

        if (typeof window !== 'undefined') {
          document.addEventListener('mousemove', this.onDragging);
          document.addEventListener('touchmove', this.onDragging);
          document.addEventListener('mouseup', this.onDragEnd);
          document.addEventListener('touchend', this.onDragEnd);
          document.addEventListener('contextmenu', this.onDragEnd);
        }
      },
      onLeftKeyDown: function onLeftKeyDown() {
        if (this.disabled || this.value === this.min) return;
        this.newPosition = parseFloat(this.currentPosition) - this.step / (this.max - this.min) * 100;
        this.setPosition(this.newPosition);
        this.$parent.emitValue('change');
      },
      onRightKeyDown: function onRightKeyDown() {
        if (this.disabled || this.value === this.max) return;
        this.newPosition = parseFloat(this.currentPosition) + this.step / (this.max - this.min) * 100;
        this.setPosition(this.newPosition);
        this.$parent.emitValue('change');
      },
      onHomeKeyDown: function onHomeKeyDown() {
        if (this.disabled || this.value === this.min) return;
        this.newPosition = 0;
        this.setPosition(this.newPosition);
        this.$parent.emitValue('change');
      },
      onEndKeyDown: function onEndKeyDown() {
        if (this.disabled || this.value === this.max) return;
        this.newPosition = 100;
        this.setPosition(this.newPosition);
        this.$parent.emitValue('change');
      },
      onDragStart: function onDragStart(event) {
        this.dragging = true;
        this.$emit('dragstart');

        if (event.type === 'touchstart') {
          event.clientX = event.touches[0].clientX;
        }

        this.startX = event.clientX;
        this.startPosition = parseFloat(this.currentPosition);
        this.newPosition = this.startPosition;
      },
      onDragging: function onDragging(event) {
        if (this.dragging) {
          if (event.type === 'touchmove') {
            event.clientX = event.touches[0].clientX;
          }

          var diff = (event.clientX - this.startX) / this.$parent.sliderSize() * 100;
          this.newPosition = this.startPosition + diff;
          this.setPosition(this.newPosition);
        }
      },
      onDragEnd: function onDragEnd() {
        this.dragging = false;
        this.$emit('dragend');

        if (this.value !== this.oldValue) {
          this.$parent.emitValue('change');
        }

        this.setPosition(this.newPosition);

        if (typeof window !== 'undefined') {
          document.removeEventListener('mousemove', this.onDragging);
          document.removeEventListener('touchmove', this.onDragging);
          document.removeEventListener('mouseup', this.onDragEnd);
          document.removeEventListener('touchend', this.onDragEnd);
          document.removeEventListener('contextmenu', this.onDragEnd);
        }
      },
      setPosition: function setPosition(percent) {
        if (percent === null || isNaN(percent)) return;

        if (percent < 0) {
          percent = 0;
        } else if (percent > 100) {
          percent = 100;
        }

        var stepLength = 100 / ((this.max - this.min) / this.step);
        var steps = Math.round(percent / stepLength);
        var value = steps * stepLength / 100 * (this.max - this.min) + this.min;
        value = parseFloat(value.toFixed(this.precision));
        this.$emit('input', value);

        if (!this.dragging && value !== this.oldValue) {
          this.oldValue = value;
        }
      }
    }
  };

  /* script */
  const __vue_script__$M = script$M;

  /* template */
  var __vue_render__$H = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"b-slider-thumb-wrapper",class:{ 'is-dragging': _vm.dragging, 'has-indicator': _vm.indicator},style:(_vm.wrapperStyle)},[_c('b-tooltip',{attrs:{"label":_vm.formattedValue,"type":_vm.type,"always":_vm.dragging || _vm.isFocused || _vm.tooltipAlways,"active":!_vm.disabled && _vm.tooltip}},[_c('div',_vm._b({staticClass:"b-slider-thumb",attrs:{"tabindex":_vm.disabled ? false : 0},on:{"mousedown":_vm.onButtonDown,"touchstart":_vm.onButtonDown,"focus":_vm.onFocus,"blur":_vm.onBlur,"keydown":[function($event){if(!$event.type.indexOf('key')&&_vm._k($event.keyCode,"left",37,$event.key,["Left","ArrowLeft"])){ return null; }if('button' in $event && $event.button !== 0){ return null; }$event.preventDefault();return _vm.onLeftKeyDown($event)},function($event){if(!$event.type.indexOf('key')&&_vm._k($event.keyCode,"right",39,$event.key,["Right","ArrowRight"])){ return null; }if('button' in $event && $event.button !== 2){ return null; }$event.preventDefault();return _vm.onRightKeyDown($event)},function($event){if(!$event.type.indexOf('key')&&_vm._k($event.keyCode,"down",40,$event.key,["Down","ArrowDown"])){ return null; }$event.preventDefault();return _vm.onLeftKeyDown($event)},function($event){if(!$event.type.indexOf('key')&&_vm._k($event.keyCode,"up",38,$event.key,["Up","ArrowUp"])){ return null; }$event.preventDefault();return _vm.onRightKeyDown($event)},function($event){if(!$event.type.indexOf('key')&&_vm._k($event.keyCode,"home",undefined,$event.key,undefined)){ return null; }$event.preventDefault();return _vm.onHomeKeyDown($event)},function($event){if(!$event.type.indexOf('key')&&_vm._k($event.keyCode,"end",undefined,$event.key,undefined)){ return null; }$event.preventDefault();return _vm.onEndKeyDown($event)}]}},'div',_vm.$attrs,false),[(_vm.indicator)?_c('span',[_vm._v(_vm._s(_vm.formattedValue))]):_vm._e()])])],1)};
  var __vue_staticRenderFns__$H = [];

    /* style */
    const __vue_inject_styles__$M = undefined;
    /* scoped */
    const __vue_scope_id__$M = undefined;
    /* module identifier */
    const __vue_module_identifier__$M = undefined;
    /* functional template */
    const __vue_is_functional_template__$M = false;
    /* style inject */
    
    /* style inject SSR */
    

    
    var SliderThumb = normalizeComponent_1(
      { render: __vue_render__$H, staticRenderFns: __vue_staticRenderFns__$H },
      __vue_inject_styles__$M,
      __vue_script__$M,
      __vue_scope_id__$M,
      __vue_is_functional_template__$M,
      __vue_module_identifier__$M,
      undefined,
      undefined
    );

  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  var script$N = {
    name: 'BSliderTick',
    props: {
      value: {
        type: Number,
        default: 0
      }
    },
    computed: {
      position: function position() {
        var pos = (this.value - this.$parent.min) / (this.$parent.max - this.$parent.min) * 100;
        return pos >= 0 && pos <= 100 ? pos : 0;
      },
      hidden: function hidden() {
        return this.value === this.$parent.min || this.value === this.$parent.max;
      }
    },
    methods: {
      getTickStyle: function getTickStyle(position) {
        return {
          'left': position + '%'
        };
      }
    },
    created: function created() {
      if (!this.$parent.$data._isSlider) {
        this.$destroy();
        throw new Error('You should wrap bSliderTick on a bSlider');
      }
    }
  };

  /* script */
  const __vue_script__$N = script$N;

  /* template */
  var __vue_render__$I = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"b-slider-tick",class:{ 'is-tick-hidden': _vm.hidden },style:(_vm.getTickStyle(_vm.position))},[(_vm.$slots.default)?_c('span',{staticClass:"b-slider-tick-label"},[_vm._t("default")],2):_vm._e()])};
  var __vue_staticRenderFns__$I = [];

    /* style */
    const __vue_inject_styles__$N = undefined;
    /* scoped */
    const __vue_scope_id__$N = undefined;
    /* module identifier */
    const __vue_module_identifier__$N = undefined;
    /* functional template */
    const __vue_is_functional_template__$N = false;
    /* style inject */
    
    /* style inject SSR */
    

    
    var SliderTick = normalizeComponent_1(
      { render: __vue_render__$I, staticRenderFns: __vue_staticRenderFns__$I },
      __vue_inject_styles__$N,
      __vue_script__$N,
      __vue_scope_id__$N,
      __vue_is_functional_template__$N,
      __vue_module_identifier__$N,
      undefined,
      undefined
    );

  var _components$6;
  var script$O = {
    name: 'BSlider',
    components: (_components$6 = {}, _defineProperty(_components$6, SliderThumb.name, SliderThumb), _defineProperty(_components$6, SliderTick.name, SliderTick), _components$6),
    props: {
      value: {
        type: [Number, Array],
        default: 0
      },
      min: {
        type: Number,
        default: 0
      },
      max: {
        type: Number,
        default: 100
      },
      step: {
        type: Number,
        default: 1
      },
      type: {
        type: String,
        default: 'is-primary'
      },
      size: String,
      ticks: {
        type: Boolean,
        default: false
      },
      tooltip: {
        type: Boolean,
        default: true
      },
      tooltipType: String,
      rounded: {
        type: Boolean,
        default: false
      },
      disabled: {
        type: Boolean,
        default: false
      },
      lazy: {
        type: Boolean,
        default: false
      },
      customFormatter: Function,
      ariaLabel: [String, Array],
      biggerSliderFocus: {
        type: Boolean,
        default: false
      },
      indicator: {
        type: Boolean,
        default: false
      },
      format: {
        type: String,
        default: 'raw',
        validator: function validator(value) {
          return ['raw', 'percent'].indexOf(value) >= 0;
        }
      },
      locale: {
        type: [String, Array],
        default: function _default() {
          return config.defaultLocale;
        }
      },
      tooltipAlways: {
        type: Boolean,
        default: false
      }
    },
    data: function data() {
      return {
        value1: null,
        value2: null,
        dragging: false,
        isRange: false,
        _isSlider: true // Used by Thumb and Tick

      };
    },
    computed: {
      newTooltipType: function newTooltipType() {
        return this.tooltipType ? this.tooltipType : this.type;
      },
      tickValues: function tickValues() {
        if (!this.ticks || this.min > this.max || this.step === 0) return [];
        var result = [];

        for (var i = this.min + this.step; i < this.max; i = i + this.step) {
          result.push(i);
        }

        return result;
      },
      minValue: function minValue() {
        return Math.min(this.value1, this.value2);
      },
      maxValue: function maxValue() {
        return Math.max(this.value1, this.value2);
      },
      barSize: function barSize() {
        return this.isRange ? "".concat(100 * (this.maxValue - this.minValue) / (this.max - this.min), "%") : "".concat(100 * (this.value1 - this.min) / (this.max - this.min), "%");
      },
      barStart: function barStart() {
        return this.isRange ? "".concat(100 * (this.minValue - this.min) / (this.max - this.min), "%") : '0%';
      },
      precision: function precision() {
        var precisions = [this.min, this.max, this.step].map(function (item) {
          var decimal = ('' + item).split('.')[1];
          return decimal ? decimal.length : 0;
        });
        return Math.max.apply(Math, _toConsumableArray(precisions));
      },
      barStyle: function barStyle() {
        return {
          width: this.barSize,
          left: this.barStart
        };
      },
      rootClasses: function rootClasses() {
        return {
          'is-rounded': this.rounded,
          'is-dragging': this.dragging,
          'is-disabled': this.disabled,
          'slider-focus': this.biggerSliderFocus
        };
      }
    },
    watch: {
      /**
      * When v-model is changed set the new active step.
      */
      value: function value(_value) {
        this.setValues(_value);
      },
      value1: function value1() {
        this.onInternalValueUpdate();
      },
      value2: function value2() {
        this.onInternalValueUpdate();
      },
      min: function min() {
        this.setValues(this.value);
      },
      max: function max() {
        this.setValues(this.value);
      }
    },
    methods: {
      setValues: function setValues(newValue) {
        if (this.min > this.max) {
          return;
        }

        if (Array.isArray(newValue)) {
          this.isRange = true;
          var smallValue = typeof newValue[0] !== 'number' || isNaN(newValue[0]) ? this.min : bound(newValue[0], this.min, this.max);
          var largeValue = typeof newValue[1] !== 'number' || isNaN(newValue[1]) ? this.max : bound(newValue[1], this.min, this.max);
          this.value1 = this.isThumbReversed ? largeValue : smallValue;
          this.value2 = this.isThumbReversed ? smallValue : largeValue;
        } else {
          this.isRange = false;
          this.value1 = isNaN(newValue) ? this.min : bound(newValue, this.min, this.max);
          this.value2 = null;
        }
      },
      onInternalValueUpdate: function onInternalValueUpdate() {
        if (this.isRange) {
          this.isThumbReversed = this.value1 > this.value2;
        }

        if (!this.lazy || !this.dragging) {
          this.emitValue('input');
        }

        if (this.dragging) {
          this.emitValue('dragging');
        }
      },
      sliderSize: function sliderSize() {
        return this.$refs.slider.getBoundingClientRect().width;
      },
      onSliderClick: function onSliderClick(event) {
        if (this.disabled || this.isTrackClickDisabled) return;
        var sliderOffsetLeft = this.$refs.slider.getBoundingClientRect().left;
        var percent = (event.clientX - sliderOffsetLeft) / this.sliderSize() * 100;
        var targetValue = this.min + percent * (this.max - this.min) / 100;
        var diffFirst = Math.abs(targetValue - this.value1);

        if (!this.isRange) {
          if (diffFirst < this.step / 2) return;
          this.$refs.button1.setPosition(percent);
        } else {
          var diffSecond = Math.abs(targetValue - this.value2);

          if (diffFirst <= diffSecond) {
            if (diffFirst < this.step / 2) return;
            this.$refs['button1'].setPosition(percent);
          } else {
            if (diffSecond < this.step / 2) return;
            this.$refs['button2'].setPosition(percent);
          }
        }

        this.emitValue('change');
      },
      onDragStart: function onDragStart() {
        this.dragging = true;
        this.$emit('dragstart');
      },
      onDragEnd: function onDragEnd() {
        var _this = this;

        this.isTrackClickDisabled = true;
        setTimeout(function () {
          // avoid triggering onSliderClick after dragend
          _this.isTrackClickDisabled = false;
        }, 0);
        this.dragging = false;
        this.$emit('dragend');

        if (this.lazy) {
          this.emitValue('input');
        }
      },
      emitValue: function emitValue(type) {
        this.$emit(type, this.isRange ? [this.minValue, this.maxValue] : this.value1);
      }
    },
    created: function created() {
      this.isThumbReversed = false;
      this.isTrackClickDisabled = false;
      this.setValues(this.value);
    }
  };

  /* script */
  const __vue_script__$O = script$O;

  /* template */
  var __vue_render__$J = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"b-slider",class:[_vm.size, _vm.type, _vm.rootClasses ],on:{"click":_vm.onSliderClick}},[_c('div',{ref:"slider",staticClass:"b-slider-track"},[_c('div',{staticClass:"b-slider-fill",style:(_vm.barStyle)}),(_vm.ticks)?_vm._l((_vm.tickValues),function(val,key){return _c('b-slider-tick',{key:key,attrs:{"value":val}})}):_vm._e(),_vm._t("default"),_c('b-slider-thumb',{ref:"button1",attrs:{"tooltip-always":_vm.tooltipAlways,"type":_vm.newTooltipType,"tooltip":_vm.tooltip,"custom-formatter":_vm.customFormatter,"indicator":_vm.indicator,"format":_vm.format,"locale":_vm.locale,"role":"slider","aria-valuenow":_vm.value1,"aria-valuemin":_vm.min,"aria-valuemax":_vm.max,"aria-orientation":"horizontal","aria-label":Array.isArray(_vm.ariaLabel) ? _vm.ariaLabel[0] : _vm.ariaLabel,"aria-disabled":_vm.disabled},on:{"dragstart":_vm.onDragStart,"dragend":_vm.onDragEnd},model:{value:(_vm.value1),callback:function ($$v) {_vm.value1=$$v;},expression:"value1"}}),(_vm.isRange)?_c('b-slider-thumb',{ref:"button2",attrs:{"tooltip-always":_vm.tooltipAlways,"type":_vm.newTooltipType,"tooltip":_vm.tooltip,"custom-formatter":_vm.customFormatter,"indicator":_vm.indicator,"format":_vm.format,"locale":_vm.locale,"role":"slider","aria-valuenow":_vm.value2,"aria-valuemin":_vm.min,"aria-valuemax":_vm.max,"aria-orientation":"horizontal","aria-label":Array.isArray(_vm.ariaLabel) ? _vm.ariaLabel[1] : '',"aria-disabled":_vm.disabled},on:{"dragstart":_vm.onDragStart,"dragend":_vm.onDragEnd},model:{value:(_vm.value2),callback:function ($$v) {_vm.value2=$$v;},expression:"value2"}}):_vm._e()],2)])};
  var __vue_staticRenderFns__$J = [];

    /* style */
    const __vue_inject_styles__$O = undefined;
    /* scoped */
    const __vue_scope_id__$O = undefined;
    /* module identifier */
    const __vue_module_identifier__$O = undefined;
    /* functional template */
    const __vue_is_functional_template__$O = false;
    /* style inject */
    
    /* style inject SSR */
    

    
    var Slider = normalizeComponent_1(
      { render: __vue_render__$J, staticRenderFns: __vue_staticRenderFns__$J },
      __vue_inject_styles__$O,
      __vue_script__$O,
      __vue_scope_id__$O,
      __vue_is_functional_template__$O,
      __vue_module_identifier__$O,
      undefined,
      undefined
    );

  var Plugin$s = {
    install: function install(Vue) {
      registerComponent(Vue, Slider);
      registerComponent(Vue, SliderTick);
    }
  };
  use(Plugin$s);

  //
  var script$P = {
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

  /* script */
  const __vue_script__$P = script$P;

  /* template */
  var __vue_render__$K = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('transition',{attrs:{"enter-active-class":_vm.transition.enter,"leave-active-class":_vm.transition.leave}},[_c('div',{directives:[{name:"show",rawName:"v-show",value:(_vm.isActive),expression:"isActive"}],staticClass:"snackbar",class:[_vm.type,_vm.position],attrs:{"role":_vm.actionText ? 'alertdialog' : 'alert'}},[(_vm.$slots.default)?[_vm._t("default")]:[_c('div',{staticClass:"text",domProps:{"innerHTML":_vm._s(_vm.message)}})],(_vm.cancelText)?_c('div',{staticClass:"action is-light is-cancel",on:{"click":_vm.close}},[_c('button',{staticClass:"button"},[_vm._v(_vm._s(_vm.cancelText))])]):_vm._e(),(_vm.actionText)?_c('div',{staticClass:"action",class:_vm.type,on:{"click":_vm.action}},[_c('button',{staticClass:"button"},[_vm._v(_vm._s(_vm.actionText))])]):_vm._e()],2)])};
  var __vue_staticRenderFns__$K = [];

    /* style */
    const __vue_inject_styles__$P = undefined;
    /* scoped */
    const __vue_scope_id__$P = undefined;
    /* module identifier */
    const __vue_module_identifier__$P = undefined;
    /* functional template */
    const __vue_is_functional_template__$P = false;
    /* style inject */
    
    /* style inject SSR */
    

    
    var Snackbar = normalizeComponent_1(
      { render: __vue_render__$K, staticRenderFns: __vue_staticRenderFns__$K },
      __vue_inject_styles__$P,
      __vue_script__$P,
      __vue_scope_id__$P,
      __vue_is_functional_template__$P,
      __vue_module_identifier__$P,
      undefined,
      undefined
    );

  var localVueInstance$4;
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
      var vm = typeof window !== 'undefined' && window.Vue ? window.Vue : localVueInstance$4 || VueInstance;
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
  var Plugin$t = {
    install: function install(Vue) {
      localVueInstance$4 = Vue;
      registerComponentProgrammatic(Vue, 'snackbar', SnackbarProgrammatic);
    }
  };
  use(Plugin$t);

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

  var script$Q = {
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
  const __vue_script__$Q = script$Q;

  /* template */
  var __vue_render__$L = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"b-steps",class:_vm.wrapperClasses},[_c('nav',{staticClass:"steps",class:_vm.mainClasses},[_c('ul',{staticClass:"step-items"},_vm._l((_vm.items),function(childItem){return _c('li',{directives:[{name:"show",rawName:"v-show",value:(childItem.visible),expression:"childItem.visible"}],key:childItem.value,staticClass:"step-item",class:[childItem.type || _vm.type, childItem.headerClass, {
                      'is-active': childItem.isActive,
                      'is-previous': _vm.activeItem.index > childItem.index
              }]},[_c('a',{staticClass:"step-link",class:{'is-clickable': _vm.isItemClickable(childItem)},on:{"click":function($event){_vm.isItemClickable(childItem) && _vm.childClick(childItem);}}},[_c('div',{staticClass:"step-marker"},[(childItem.icon)?_c('b-icon',{attrs:{"icon":childItem.icon,"pack":childItem.iconPack,"size":_vm.size}}):(childItem.step)?_c('span',[_vm._v(_vm._s(childItem.step))]):_vm._e()],1),_c('div',{staticClass:"step-details"},[_c('span',{staticClass:"step-title"},[_vm._v(_vm._s(childItem.label))])])])])}),0)]),_c('section',{staticClass:"step-content",class:{'is-transitioning': _vm.isTransitioning}},[_vm._t("default")],2),_vm._t("navigation",[(_vm.hasNavigation)?_c('nav',{staticClass:"step-navigation"},[_c('a',{staticClass:"pagination-previous",attrs:{"role":"button","disabled":_vm.navigationProps.previous.disabled,"aria-label":_vm.ariaPreviousLabel},on:{"click":function($event){$event.preventDefault();return _vm.navigationProps.previous.action($event)}}},[_c('b-icon',{attrs:{"icon":_vm.iconPrev,"pack":_vm.iconPack,"both":"","aria-hidden":"true"}})],1),_c('a',{staticClass:"pagination-next",attrs:{"role":"button","disabled":_vm.navigationProps.next.disabled,"aria-label":_vm.ariaNextLabel},on:{"click":function($event){$event.preventDefault();return _vm.navigationProps.next.action($event)}}},[_c('b-icon',{attrs:{"icon":_vm.iconNext,"pack":_vm.iconPack,"both":"","aria-hidden":"true"}})],1)]):_vm._e()],{"previous":_vm.navigationProps.previous,"next":_vm.navigationProps.next})],2)};
  var __vue_staticRenderFns__$L = [];

    /* style */
    const __vue_inject_styles__$Q = undefined;
    /* scoped */
    const __vue_scope_id__$Q = undefined;
    /* module identifier */
    const __vue_module_identifier__$Q = undefined;
    /* functional template */
    const __vue_is_functional_template__$Q = false;
    /* style inject */
    
    /* style inject SSR */
    

    
    var Steps = normalizeComponent_1(
      { render: __vue_render__$L, staticRenderFns: __vue_staticRenderFns__$L },
      __vue_inject_styles__$Q,
      __vue_script__$Q,
      __vue_scope_id__$Q,
      __vue_is_functional_template__$Q,
      __vue_module_identifier__$Q,
      undefined,
      undefined
    );

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

  var script$R = {
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
  const __vue_script__$R = script$R;

  /* template */

    /* style */
    const __vue_inject_styles__$R = undefined;
    /* scoped */
    const __vue_scope_id__$R = undefined;
    /* module identifier */
    const __vue_module_identifier__$R = undefined;
    /* functional template */
    const __vue_is_functional_template__$R = undefined;
    /* style inject */
    
    /* style inject SSR */
    

    
    var StepItem = normalizeComponent_1(
      {},
      __vue_inject_styles__$R,
      __vue_script__$R,
      __vue_scope_id__$R,
      __vue_is_functional_template__$R,
      __vue_module_identifier__$R,
      undefined,
      undefined
    );

  var Plugin$u = {
    install: function install(Vue) {
      registerComponent(Vue, Steps);
      registerComponent(Vue, StepItem);
    }
  };
  use(Plugin$u);

  //
  var script$S = {
    name: 'BSwitch',
    props: {
      value: [String, Number, Boolean, Function, Object, Array, Date],
      nativeValue: [String, Number, Boolean, Function, Object, Array, Date],
      disabled: Boolean,
      type: String,
      passiveType: String,
      name: String,
      required: Boolean,
      size: String,
      trueValue: {
        type: [String, Number, Boolean, Function, Object, Array, Date],
        default: true
      },
      falseValue: {
        type: [String, Number, Boolean, Function, Object, Array, Date],
        default: false
      },
      rounded: {
        type: Boolean,
        default: function _default() {
          return config.defaultSwitchRounded;
        }
      },
      outlined: {
        type: Boolean,
        default: false
      },
      leftLabel: {
        type: Boolean,
        default: false
      }
    },
    data: function data() {
      return {
        newValue: this.value,
        isMouseDown: false
      };
    },
    computed: {
      computedValue: {
        get: function get() {
          return this.newValue;
        },
        set: function set(value) {
          this.newValue = value;
          this.$emit('input', value);
        }
      },
      newClass: function newClass() {
        return [this.size, {
          'is-disabled': this.disabled,
          'is-rounded': this.rounded,
          'is-outlined': this.outlined,
          'has-left-label': this.leftLabel
        }];
      },
      checkClasses: function checkClasses() {
        return [{
          'is-elastic': this.isMouseDown && !this.disabled
        }, this.passiveType && "".concat(this.passiveType, "-passive"), this.type];
      }
    },
    watch: {
      /**
      * When v-model change, set internal value.
      */
      value: function value(_value) {
        this.newValue = _value;
      }
    },
    methods: {
      focus: function focus() {
        // MacOS FireFox and Safari do not focus when clicked
        this.$refs.input.focus();
      }
    }
  };

  /* script */
  const __vue_script__$S = script$S;

  /* template */
  var __vue_render__$M = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('label',{ref:"label",staticClass:"switch",class:_vm.newClass,attrs:{"disabled":_vm.disabled},on:{"click":_vm.focus,"keydown":function($event){if(!$event.type.indexOf('key')&&_vm._k($event.keyCode,"enter",13,$event.key,"Enter")){ return null; }$event.preventDefault();return _vm.$refs.label.click()},"mousedown":function($event){_vm.isMouseDown = true;},"mouseup":function($event){_vm.isMouseDown = false;},"mouseout":function($event){_vm.isMouseDown = false;},"blur":function($event){_vm.isMouseDown = false;}}},[_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.computedValue),expression:"computedValue"}],ref:"input",attrs:{"type":"checkbox","disabled":_vm.disabled,"name":_vm.name,"required":_vm.required,"true-value":_vm.trueValue,"false-value":_vm.falseValue},domProps:{"value":_vm.nativeValue,"checked":Array.isArray(_vm.computedValue)?_vm._i(_vm.computedValue,_vm.nativeValue)>-1:_vm._q(_vm.computedValue,_vm.trueValue)},on:{"click":function($event){$event.stopPropagation();},"change":function($event){var $$a=_vm.computedValue,$$el=$event.target,$$c=$$el.checked?(_vm.trueValue):(_vm.falseValue);if(Array.isArray($$a)){var $$v=_vm.nativeValue,$$i=_vm._i($$a,$$v);if($$el.checked){$$i<0&&(_vm.computedValue=$$a.concat([$$v]));}else{$$i>-1&&(_vm.computedValue=$$a.slice(0,$$i).concat($$a.slice($$i+1)));}}else{_vm.computedValue=$$c;}}}}),_c('span',{staticClass:"check",class:_vm.checkClasses}),_c('span',{staticClass:"control-label"},[_vm._t("default")],2)])};
  var __vue_staticRenderFns__$M = [];

    /* style */
    const __vue_inject_styles__$S = undefined;
    /* scoped */
    const __vue_scope_id__$S = undefined;
    /* module identifier */
    const __vue_module_identifier__$S = undefined;
    /* functional template */
    const __vue_is_functional_template__$S = false;
    /* style inject */
    
    /* style inject SSR */
    

    
    var Switch = normalizeComponent_1(
      { render: __vue_render__$M, staticRenderFns: __vue_staticRenderFns__$M },
      __vue_inject_styles__$S,
      __vue_script__$S,
      __vue_scope_id__$S,
      __vue_is_functional_template__$S,
      __vue_module_identifier__$S,
      undefined,
      undefined
    );

  var Plugin$v = {
    install: function install(Vue) {
      registerComponent(Vue, Switch);
    }
  };
  use(Plugin$v);

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

  var _components$7;
  var script$T = {
    name: 'BTableMobileSort',
    components: (_components$7 = {}, _defineProperty(_components$7, Select.name, Select), _defineProperty(_components$7, Icon.name, Icon), _components$7),
    props: {
      currentSortColumn: Object,
      sortMultipleData: Array,
      isAsc: Boolean,
      columns: Array,
      placeholder: String,
      iconPack: String,
      sortIcon: {
        type: String,
        default: 'arrow-up'
      },
      sortIconSize: {
        type: String,
        default: 'is-small'
      },
      sortMultiple: {
        type: Boolean,
        default: false
      }
    },
    data: function data() {
      return {
        sortMultipleSelect: '',
        mobileSort: this.currentSortColumn,
        defaultEvent: {
          shiftKey: true,
          altKey: true,
          ctrlKey: true
        },
        ignoreSort: false
      };
    },
    computed: {
      showPlaceholder: function showPlaceholder() {
        var _this = this;

        return !this.columns || !this.columns.some(function (column) {
          return column === _this.mobileSort;
        });
      }
    },
    watch: {
      sortMultipleSelect: function sortMultipleSelect(column) {
        if (this.ignoreSort) {
          this.ignoreSort = false;
        } else {
          this.$emit('sort', column, this.defaultEvent);
        }
      },
      mobileSort: function mobileSort(column) {
        if (this.currentSortColumn === column) return;
        this.$emit('sort', column, this.defaultEvent);
      },
      currentSortColumn: function currentSortColumn(column) {
        this.mobileSort = column;
      }
    },
    methods: {
      removePriority: function removePriority() {
        var _this2 = this;

        this.$emit('removePriority', this.sortMultipleSelect); // ignore the watcher to sort when we just change whats displayed in the select
        // otherwise the direction will be flipped
        // The sort event is already triggered by the emit

        this.ignoreSort = true; // Select one of the other options when we reset one

        var remainingFields = this.sortMultipleData.filter(function (data) {
          return data.field !== _this2.sortMultipleSelect.field;
        }).map(function (data) {
          return data.field;
        });
        this.sortMultipleSelect = this.columns.filter(function (column) {
          return remainingFields.includes(column.field);
        })[0];
      },
      getSortingObjectOfColumn: function getSortingObjectOfColumn(column) {
        return this.sortMultipleData.filter(function (i) {
          return i.field === column.field;
        })[0];
      },
      columnIsDesc: function columnIsDesc(column) {
        var sortingObject = this.getSortingObjectOfColumn(column);

        if (sortingObject) {
          return !!(sortingObject.order && sortingObject.order === 'desc');
        }

        return true;
      },
      getLabel: function getLabel(column) {
        var sortingObject = this.getSortingObjectOfColumn(column);

        if (sortingObject) {
          return column.label + '(' + (this.sortMultipleData.indexOf(sortingObject) + 1) + ')';
        }

        return column.label;
      },
      sort: function sort() {
        this.$emit('sort', this.sortMultiple ? this.sortMultipleSelect : this.mobileSort, this.defaultEvent);
      }
    }
  };

  /* script */
  const __vue_script__$T = script$T;

  /* template */
  var __vue_render__$N = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"field table-mobile-sort"},[_c('div',{staticClass:"field has-addons"},[(_vm.sortMultiple)?_c('b-select',{attrs:{"expanded":""},model:{value:(_vm.sortMultipleSelect),callback:function ($$v) {_vm.sortMultipleSelect=$$v;},expression:"sortMultipleSelect"}},_vm._l((_vm.columns),function(column,index){return (column.sortable)?_c('option',{key:index,domProps:{"value":column}},[_vm._v(" "+_vm._s(_vm.getLabel(column))+" "),(_vm.getSortingObjectOfColumn(column))?[(_vm.columnIsDesc(column))?[_vm._v(" ↓ ")]:[_vm._v(" ↑ ")]]:_vm._e()],2):_vm._e()}),0):_c('b-select',{attrs:{"expanded":""},model:{value:(_vm.mobileSort),callback:function ($$v) {_vm.mobileSort=$$v;},expression:"mobileSort"}},[(_vm.placeholder)?[_c('option',{directives:[{name:"show",rawName:"v-show",value:(_vm.showPlaceholder),expression:"showPlaceholder"}],attrs:{"selected":"","disabled":"","hidden":""},domProps:{"value":{}}},[_vm._v(" "+_vm._s(_vm.placeholder)+" ")])]:_vm._e(),_vm._l((_vm.columns),function(column,index){return (column.sortable)?_c('option',{key:index,domProps:{"value":column}},[_vm._v(" "+_vm._s(column.label)+" ")]):_vm._e()})],2),_c('div',{staticClass:"control"},[(_vm.sortMultiple && _vm.sortMultipleData.length > 0)?[_c('button',{staticClass:"button is-primary",on:{"click":_vm.sort}},[_c('b-icon',{class:{ 'is-desc': _vm.columnIsDesc(_vm.sortMultipleSelect) },attrs:{"icon":_vm.sortIcon,"pack":_vm.iconPack,"size":_vm.sortIconSize,"both":""}})],1),_c('button',{staticClass:"button is-primary",on:{"click":_vm.removePriority}},[_c('b-icon',{attrs:{"icon":"delete","size":_vm.sortIconSize,"both":""}})],1)]:(!_vm.sortMultiple)?_c('button',{staticClass:"button is-primary",on:{"click":_vm.sort}},[_c('b-icon',{directives:[{name:"show",rawName:"v-show",value:(_vm.currentSortColumn === _vm.mobileSort),expression:"currentSortColumn === mobileSort"}],class:{ 'is-desc': !_vm.isAsc },attrs:{"icon":_vm.sortIcon,"pack":_vm.iconPack,"size":_vm.sortIconSize,"both":""}})],1):_vm._e()],2)],1)])};
  var __vue_staticRenderFns__$N = [];

    /* style */
    const __vue_inject_styles__$T = undefined;
    /* scoped */
    const __vue_scope_id__$T = undefined;
    /* module identifier */
    const __vue_module_identifier__$T = undefined;
    /* functional template */
    const __vue_is_functional_template__$T = false;
    /* style inject */
    
    /* style inject SSR */
    

    
    var TableMobileSort = normalizeComponent_1(
      { render: __vue_render__$N, staticRenderFns: __vue_staticRenderFns__$N },
      __vue_inject_styles__$T,
      __vue_script__$T,
      __vue_scope_id__$T,
      __vue_is_functional_template__$T,
      __vue_module_identifier__$T,
      undefined,
      undefined
    );

  var script$U = {
    name: 'BTableColumn',
    inject: {
      $table: {
        name: '$table',
        default: false
      }
    },
    props: {
      label: String,
      customKey: [String, Number],
      field: String,
      meta: [String, Number, Boolean, Function, Object, Array],
      width: [Number, String],
      numeric: Boolean,
      centered: Boolean,
      searchable: Boolean,
      sortable: Boolean,
      visible: {
        type: Boolean,
        default: true
      },
      subheading: [String, Number],
      customSort: Function,
      customSearch: Function,
      sticky: Boolean,
      headerSelectable: Boolean,
      headerClass: String,
      cellClass: String,
      thAttrs: {
        type: Function,
        default: function _default() {
          return {};
        }
      },
      tdAttrs: {
        type: Function,
        default: function _default() {
          return {};
        }
      }
    },
    data: function data() {
      return {
        newKey: this.customKey || this.label,
        _isTableColumn: true
      };
    },
    computed: {
      thClasses: function thClasses() {
        var attrs = this.thAttrs(this);
        var classes = [this.headerClass, {
          'is-sortable': this.sortable,
          'is-sticky': this.sticky,
          'is-unselectable': this.isHeaderUnSelectable
        }];

        if (attrs && attrs.class) {
          classes.push(attrs.class);
        }

        return classes;
      },
      thStyle: function thStyle() {
        var attrs = this.thAttrs(this);
        var style = [this.style];

        if (attrs && attrs.style) {
          style.push(attrs.style);
        }

        return style;
      },
      rootClasses: function rootClasses() {
        return [this.cellClass, {
          'has-text-right': this.numeric && !this.centered,
          'has-text-centered': this.centered,
          'is-sticky': this.sticky
        }];
      },
      style: function style() {
        return {
          width: toCssWidth(this.width)
        };
      },
      hasDefaultSlot: function hasDefaultSlot() {
        return !!this.$scopedSlots.default;
      },

      /**
       * Return if column header is un-selectable
       */
      isHeaderUnSelectable: function isHeaderUnSelectable() {
        return !this.headerSelectable && this.sortable;
      }
    },
    methods: {
      getRootClasses: function getRootClasses(row) {
        var attrs = this.tdAttrs(row, this);
        var classes = [this.rootClasses];

        if (attrs && attrs.class) {
          classes.push(attrs.class);
        }

        return classes;
      },
      getRootStyle: function getRootStyle(row) {
        var attrs = this.tdAttrs(row, this);
        var style = [];

        if (attrs && attrs.style) {
          style.push(attrs.style);
        }

        return style;
      }
    },
    created: function created() {
      if (!this.$table) {
        this.$destroy();
        throw new Error('You should wrap bTableColumn on a bTable');
      }

      this.$table.refreshSlots();
    },
    render: function render(createElement) {
      // renderless
      return null;
    }
  };

  /* script */
  const __vue_script__$U = script$U;

  /* template */

    /* style */
    const __vue_inject_styles__$U = undefined;
    /* scoped */
    const __vue_scope_id__$U = undefined;
    /* module identifier */
    const __vue_module_identifier__$U = undefined;
    /* functional template */
    const __vue_is_functional_template__$U = undefined;
    /* style inject */
    
    /* style inject SSR */
    

    
    var TableColumn = normalizeComponent_1(
      {},
      __vue_inject_styles__$U,
      __vue_script__$U,
      __vue_scope_id__$U,
      __vue_is_functional_template__$U,
      __vue_module_identifier__$U,
      undefined,
      undefined
    );

  var script$V = {
    name: 'BTablePagination',
    components: _defineProperty({}, Pagination.name, Pagination),
    props: {
      paginated: Boolean,
      total: [Number, String],
      perPage: [Number, String],
      currentPage: [Number, String],
      paginationSimple: Boolean,
      paginationSize: String,
      rounded: Boolean,
      iconPack: String,
      ariaNextLabel: String,
      ariaPreviousLabel: String,
      ariaPageLabel: String,
      ariaCurrentLabel: String
    },
    data: function data() {
      return {
        newCurrentPage: this.currentPage
      };
    },
    watch: {
      currentPage: function currentPage(newVal) {
        this.newCurrentPage = newVal;
      }
    },
    methods: {
      /**
      * Paginator change listener.
      */
      pageChanged: function pageChanged(page) {
        this.newCurrentPage = page > 0 ? page : 1;
        this.$emit('update:currentPage', this.newCurrentPage);
        this.$emit('page-change', this.newCurrentPage);
      }
    }
  };

  /* script */
  const __vue_script__$V = script$V;

  /* template */
  var __vue_render__$O = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"top level"},[_c('div',{staticClass:"level-left"},[_vm._t("default")],2),_c('div',{staticClass:"level-right"},[(_vm.paginated)?_c('div',{staticClass:"level-item"},[_c('b-pagination',{attrs:{"icon-pack":_vm.iconPack,"total":_vm.total,"per-page":_vm.perPage,"simple":_vm.paginationSimple,"size":_vm.paginationSize,"current":_vm.newCurrentPage,"rounded":_vm.rounded,"aria-next-label":_vm.ariaNextLabel,"aria-previous-label":_vm.ariaPreviousLabel,"aria-page-label":_vm.ariaPageLabel,"aria-current-label":_vm.ariaCurrentLabel},on:{"change":_vm.pageChanged}})],1):_vm._e()])])};
  var __vue_staticRenderFns__$O = [];

    /* style */
    const __vue_inject_styles__$V = undefined;
    /* scoped */
    const __vue_scope_id__$V = undefined;
    /* module identifier */
    const __vue_module_identifier__$V = undefined;
    /* functional template */
    const __vue_is_functional_template__$V = false;
    /* style inject */
    
    /* style inject SSR */
    

    
    var TablePagination = normalizeComponent_1(
      { render: __vue_render__$O, staticRenderFns: __vue_staticRenderFns__$O },
      __vue_inject_styles__$V,
      __vue_script__$V,
      __vue_scope_id__$V,
      __vue_is_functional_template__$V,
      __vue_module_identifier__$V,
      undefined,
      undefined
    );

  var _components$8;
  var script$W = {
    name: 'BTable',
    components: (_components$8 = {}, _defineProperty(_components$8, Checkbox.name, Checkbox), _defineProperty(_components$8, Icon.name, Icon), _defineProperty(_components$8, Input.name, Input), _defineProperty(_components$8, Loading.name, Loading), _defineProperty(_components$8, SlotComponent.name, SlotComponent), _defineProperty(_components$8, TableMobileSort.name, TableMobileSort), _defineProperty(_components$8, TableColumn.name, TableColumn), _defineProperty(_components$8, TablePagination.name, TablePagination), _components$8),
    inheritAttrs: false,
    provide: function provide() {
      return {
        $table: this
      };
    },
    props: {
      data: {
        type: Array,
        default: function _default() {
          return [];
        }
      },
      columns: {
        type: Array,
        default: function _default() {
          return [];
        }
      },
      bordered: Boolean,
      striped: Boolean,
      narrowed: Boolean,
      hoverable: Boolean,
      loading: Boolean,
      detailed: Boolean,
      checkable: Boolean,
      headerCheckable: {
        type: Boolean,
        default: true
      },
      checkboxPosition: {
        type: String,
        default: 'left',
        validator: function validator(value) {
          return ['left', 'right'].indexOf(value) >= 0;
        }
      },
      stickyCheckbox: {
        type: Boolean,
        default: false
      },
      selected: Object,
      isRowSelectable: {
        type: Function,
        default: function _default() {
          return true;
        }
      },
      focusable: Boolean,
      customIsChecked: Function,
      isRowCheckable: {
        type: Function,
        default: function _default() {
          return true;
        }
      },
      checkedRows: {
        type: Array,
        default: function _default() {
          return [];
        }
      },
      mobileCards: {
        type: Boolean,
        default: true
      },
      defaultSort: [String, Array],
      defaultSortDirection: {
        type: String,
        default: 'asc'
      },
      sortIcon: {
        type: String,
        default: 'arrow-up'
      },
      sortIconSize: {
        type: String,
        default: 'is-small'
      },
      sortMultiple: {
        type: Boolean,
        default: false
      },
      sortMultipleData: {
        type: Array,
        default: function _default() {
          return [];
        }
      },
      sortMultipleKey: {
        type: String,
        default: null
      },
      paginated: Boolean,
      currentPage: {
        type: Number,
        default: 1
      },
      perPage: {
        type: [Number, String],
        default: 20
      },
      showDetailIcon: {
        type: Boolean,
        default: true
      },
      paginationPosition: {
        type: String,
        default: 'bottom',
        validator: function validator(value) {
          return ['bottom', 'top', 'both'].indexOf(value) >= 0;
        }
      },
      paginationRounded: Boolean,
      backendSorting: Boolean,
      backendFiltering: Boolean,
      rowClass: {
        type: Function,
        default: function _default() {
          return '';
        }
      },
      openedDetailed: {
        type: Array,
        default: function _default() {
          return [];
        }
      },
      hasDetailedVisible: {
        type: Function,
        default: function _default() {
          return true;
        }
      },
      detailKey: {
        type: String,
        default: ''
      },
      detailTransition: {
        type: String,
        default: ''
      },
      customDetailRow: {
        type: Boolean,
        default: false
      },
      backendPagination: Boolean,
      total: {
        type: [Number, String],
        default: 0
      },
      iconPack: String,
      mobileSortPlaceholder: String,
      customRowKey: String,
      draggable: {
        type: Boolean,
        default: false
      },
      draggableColumn: {
        type: Boolean,
        default: false
      },
      scrollable: Boolean,
      ariaNextLabel: String,
      ariaPreviousLabel: String,
      ariaPageLabel: String,
      ariaCurrentLabel: String,
      stickyHeader: Boolean,
      height: [Number, String],
      filtersEvent: {
        type: String,
        default: ''
      },
      cardLayout: Boolean,
      showHeader: {
        type: Boolean,
        default: true
      },
      debounceSearch: Number
    },
    data: function data() {
      return {
        sortMultipleDataLocal: [],
        getValueByPath: getValueByPath,
        visibleDetailRows: this.openedDetailed,
        newData: this.data,
        newDataTotal: this.backendPagination ? this.total : this.data.length,
        newCheckedRows: _toConsumableArray(this.checkedRows),
        lastCheckedRowIndex: null,
        newCurrentPage: this.currentPage,
        currentSortColumn: {},
        isAsc: true,
        filters: {},
        defaultSlots: [],
        firstTimeSort: true,
        // Used by first time initSort
        _isTable: true,
        // Used by TableColumn
        isDraggingRow: false,
        isDraggingColumn: false
      };
    },
    computed: {
      sortMultipleDataComputed: function sortMultipleDataComputed() {
        return this.backendSorting ? this.sortMultipleData : this.sortMultipleDataLocal;
      },
      tableClasses: function tableClasses() {
        return {
          'is-bordered': this.bordered,
          'is-striped': this.striped,
          'is-narrow': this.narrowed,
          'is-hoverable': (this.hoverable || this.focusable) && this.visibleData.length
        };
      },
      tableWrapperClasses: function tableWrapperClasses() {
        return {
          'has-mobile-cards': this.mobileCards,
          'has-sticky-header': this.stickyHeader,
          'is-card-list': this.cardLayout,
          'table-container': this.isScrollable
        };
      },
      tableStyle: function tableStyle() {
        return {
          height: toCssWidth(this.height)
        };
      },

      /**
      * Splitted data based on the pagination.
      */
      visibleData: function visibleData() {
        if (!this.paginated) return this.newData;
        var currentPage = this.newCurrentPage;
        var perPage = this.perPage;

        if (this.newData.length <= perPage) {
          return this.newData;
        } else {
          var start = (currentPage - 1) * perPage;
          var end = parseInt(start, 10) + parseInt(perPage, 10);
          return this.newData.slice(start, end);
        }
      },
      visibleColumns: function visibleColumns() {
        if (!this.newColumns) return this.newColumns;
        return this.newColumns.filter(function (column) {
          return column.visible || column.visible === undefined;
        });
      },

      /**
      * Check if all rows in the page are checked.
      */
      isAllChecked: function isAllChecked() {
        var _this = this;

        var validVisibleData = this.visibleData.filter(function (row) {
          return _this.isRowCheckable(row);
        });
        if (validVisibleData.length === 0) return false;
        var isAllChecked = validVisibleData.some(function (currentVisibleRow) {
          return indexOf(_this.newCheckedRows, currentVisibleRow, _this.customIsChecked) < 0;
        });
        return !isAllChecked;
      },

      /**
      * Check if all rows in the page are checkable.
      */
      isAllUncheckable: function isAllUncheckable() {
        var _this2 = this;

        var validVisibleData = this.visibleData.filter(function (row) {
          return _this2.isRowCheckable(row);
        });
        return validVisibleData.length === 0;
      },

      /**
      * Check if has any sortable column.
      */
      hasSortablenewColumns: function hasSortablenewColumns() {
        return this.newColumns.some(function (column) {
          return column.sortable;
        });
      },

      /**
      * Check if has any searchable column.
      */
      hasSearchablenewColumns: function hasSearchablenewColumns() {
        return this.newColumns.some(function (column) {
          return column.searchable;
        });
      },

      /**
      * Check if has any column using subheading.
      */
      hasCustomSubheadings: function hasCustomSubheadings() {
        if (this.$scopedSlots && this.$scopedSlots.subheading) return true;
        return this.newColumns.some(function (column) {
          return column.subheading || column.$scopedSlots && column.$scopedSlots.subheading;
        });
      },

      /**
      * Return total column count based if it's checkable or expanded
      */
      columnCount: function columnCount() {
        var count = this.visibleColumns.length;
        count += this.checkable ? 1 : 0;
        count += this.detailed && this.showDetailIcon ? 1 : 0;
        return count;
      },

      /**
      * return if detailed row tabled
      * will be with chevron column & icon or not
      */
      showDetailRowIcon: function showDetailRowIcon() {
        return this.detailed && this.showDetailIcon;
      },

      /**
      * return if scrollable table
      */
      isScrollable: function isScrollable() {
        if (this.scrollable) return true;
        if (!this.newColumns) return false;
        return this.newColumns.some(function (column) {
          return column.sticky;
        });
      },
      newColumns: function newColumns() {
        var _this3 = this;

        if (this.columns && this.columns.length) {
          return this.columns.map(function (column) {
            var TableColumnComponent = VueInstance.extend(TableColumn);
            var component = new TableColumnComponent({
              parent: _this3,
              propsData: column
            });
            component.$scopedSlots = {
              default: function _default(props) {
                var vnode = component.$createElement('span', {
                  domProps: {
                    innerHTML: getValueByPath(props.row, column.field)
                  }
                });
                return [vnode];
              }
            };
            return component;
          });
        }

        return this.defaultSlots.filter(function (vnode) {
          return vnode.componentInstance && vnode.componentInstance.$data && vnode.componentInstance.$data._isTableColumn;
        }).map(function (vnode) {
          return vnode.componentInstance;
        });
      },
      canDragRow: function canDragRow() {
        return this.draggable && !this.isDraggingColumn;
      },
      canDragColumn: function canDragColumn() {
        return this.draggableColumn && !this.isDraggingRow;
      }
    },
    watch: {
      /**
      * When data prop change:
      *   1. Update internal value.
      *   2. Filter data if it's not backend-filtered.
      *   3. Sort again if it's not backend-sorted.
      *   4. Set new total if it's not backend-paginated.
      */
      data: function data(value) {
        var _this4 = this;

        this.newData = value;

        if (!this.backendFiltering) {
          this.newData = value.filter(function (row) {
            return _this4.isRowFiltered(row);
          });
        }

        if (!this.backendSorting) {
          this.sort(this.currentSortColumn, true);
        }

        if (!this.backendPagination) {
          this.newDataTotal = this.newData.length;
        }
      },

      /**
      * When Pagination total change, update internal total
      * only if it's backend-paginated.
      */
      total: function total(newTotal) {
        if (!this.backendPagination) return;
        this.newDataTotal = newTotal;
      },
      currentPage: function currentPage(newVal) {
        this.newCurrentPage = newVal;
      },
      newCurrentPage: function newCurrentPage(newVal) {
        this.$emit('update:currentPage', newVal);
      },

      /**
      * When checkedRows prop change, update internal value without
      * mutating original data.
      */
      checkedRows: function checkedRows(rows) {
        this.newCheckedRows = _toConsumableArray(rows);
      },

      /*
      newColumns(value) {
          this.checkSort()
      },
      */
      debounceSearch: {
        handler: function handler(value) {
          this.debouncedHandleFiltersChange = debounce(this.handleFiltersChange, value);
        },
        immediate: true
      },
      filters: {
        handler: function handler(value) {
          if (this.debounceSearch) {
            this.debouncedHandleFiltersChange(value);
          } else {
            this.handleFiltersChange(value);
          }
        },
        deep: true
      },

      /**
      * When the user wants to control the detailed rows via props.
      * Or wants to open the details of certain row with the router for example.
      */
      openedDetailed: function openedDetailed(expandedRows) {
        this.visibleDetailRows = expandedRows;
      }
    },
    methods: {
      onFiltersEvent: function onFiltersEvent(event) {
        this.$emit("filters-event-".concat(this.filtersEvent), {
          event: event,
          filters: this.filters
        });
      },
      handleFiltersChange: function handleFiltersChange(value) {
        var _this5 = this;

        if (this.backendFiltering) {
          this.$emit('filters-change', value);
        } else {
          this.newData = this.data.filter(function (row) {
            return _this5.isRowFiltered(row);
          });

          if (!this.backendPagination) {
            this.newDataTotal = this.newData.length;
          }

          if (!this.backendSorting) {
            if (this.sortMultiple && this.sortMultipleDataLocal && this.sortMultipleDataLocal.length > 0) {
              this.doSortMultiColumn();
            } else if (Object.keys(this.currentSortColumn).length > 0) {
              this.doSortSingleColumn(this.currentSortColumn);
            }
          }
        }
      },
      findIndexOfSortData: function findIndexOfSortData(column) {
        var sortObj = this.sortMultipleDataComputed.filter(function (i) {
          return i.field === column.field;
        })[0];
        return this.sortMultipleDataComputed.indexOf(sortObj) + 1;
      },
      removeSortingPriority: function removeSortingPriority(column) {
        if (this.backendSorting) {
          this.$emit('sorting-priority-removed', column.field);
        } else {
          this.sortMultipleDataLocal = this.sortMultipleDataLocal.filter(function (priority) {
            return priority.field !== column.field;
          });
          var formattedSortingPriority = this.sortMultipleDataLocal.map(function (i) {
            return (i.order && i.order === 'desc' ? '-' : '') + i.field;
          });
          this.newData = multiColumnSort(this.newData, formattedSortingPriority);
        }
      },
      resetMultiSorting: function resetMultiSorting() {
        this.sortMultipleDataLocal = [];
        this.currentSortColumn = {};
        this.newData = this.data;
      },

      /**
      * Sort an array by key without mutating original data.
      * Call the user sort function if it was passed.
      */
      sortBy: function sortBy(array, key, fn, isAsc) {
        var sorted = []; // Sorting without mutating original data

        if (fn && typeof fn === 'function') {
          sorted = _toConsumableArray(array).sort(function (a, b) {
            return fn(a, b, isAsc);
          });
        } else {
          sorted = _toConsumableArray(array).sort(function (a, b) {
            // Get nested values from objects
            var newA = getValueByPath(a, key);
            var newB = getValueByPath(b, key); // sort boolean type

            if (typeof newA === 'boolean' && typeof newB === 'boolean') {
              return isAsc ? newA - newB : newB - newA;
            }

            if (!newA && newA !== 0) return 1;
            if (!newB && newB !== 0) return -1;
            if (newA === newB) return 0;
            newA = typeof newA === 'string' ? newA.toUpperCase() : newA;
            newB = typeof newB === 'string' ? newB.toUpperCase() : newB;
            return isAsc ? newA > newB ? 1 : -1 : newA > newB ? -1 : 1;
          });
        }

        return sorted;
      },
      sortMultiColumn: function sortMultiColumn(column) {
        this.currentSortColumn = {};

        if (!this.backendSorting) {
          var existingPriority = this.sortMultipleDataLocal.filter(function (i) {
            return i.field === column.field;
          })[0];

          if (existingPriority) {
            existingPriority.order = existingPriority.order === 'desc' ? 'asc' : 'desc';
          } else {
            this.sortMultipleDataLocal.push({
              field: column.field,
              order: column.isAsc
            });
          }

          this.doSortMultiColumn();
        }
      },
      doSortMultiColumn: function doSortMultiColumn() {
        var formattedSortingPriority = this.sortMultipleDataLocal.map(function (i) {
          return (i.order && i.order === 'desc' ? '-' : '') + i.field;
        });
        this.newData = multiColumnSort(this.newData, formattedSortingPriority);
      },

      /**
      * Sort the column.
      * Toggle current direction on column if it's sortable
      * and not just updating the prop.
      */
      sort: function sort(column) {
        var updatingData = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
        var event = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

        if ( // if backend sorting is enabled, just emit the sort press like usual
        // if the correct key combination isnt pressed, sort like usual
        !this.backendSorting && this.sortMultiple && (this.sortMultipleKey && event[this.sortMultipleKey] || !this.sortMultipleKey)) {
          if (updatingData) {
            this.doSortMultiColumn();
          } else {
            this.sortMultiColumn(column);
          }
        } else {
          if (!column || !column.sortable) return; // sort multiple is enabled but the correct key combination isnt pressed so reset

          if (this.sortMultiple) {
            this.sortMultipleDataLocal = [];
          }

          if (!updatingData) {
            this.isAsc = column === this.currentSortColumn ? !this.isAsc : this.defaultSortDirection.toLowerCase() !== 'desc';
          }

          if (!this.firstTimeSort) {
            this.$emit('sort', column.field, this.isAsc ? 'asc' : 'desc', event);
          }

          if (!this.backendSorting) {
            this.doSortSingleColumn(column);
          }

          this.currentSortColumn = column;
        }
      },
      doSortSingleColumn: function doSortSingleColumn(column) {
        this.newData = this.sortBy(this.newData, column.field, column.customSort, this.isAsc);
      },
      isRowSelected: function isRowSelected(row, selected) {
        if (!selected) {
          return false;
        }

        if (this.customRowKey) {
          return row[this.customRowKey] === selected[this.customRowKey];
        }

        return row === selected;
      },

      /**
      * Check if the row is checked (is added to the array).
      */
      isRowChecked: function isRowChecked(row) {
        return indexOf(this.newCheckedRows, row, this.customIsChecked) >= 0;
      },

      /**
      * Remove a checked row from the array.
      */
      removeCheckedRow: function removeCheckedRow(row) {
        var index = indexOf(this.newCheckedRows, row, this.customIsChecked);

        if (index >= 0) {
          this.newCheckedRows.splice(index, 1);
        }
      },

      /**
      * Header checkbox click listener.
      * Add or remove all rows in current page.
      */
      checkAll: function checkAll() {
        var _this6 = this;

        var isAllChecked = this.isAllChecked;
        this.visibleData.forEach(function (currentRow) {
          if (_this6.isRowCheckable(currentRow)) {
            _this6.removeCheckedRow(currentRow);
          }

          if (!isAllChecked) {
            if (_this6.isRowCheckable(currentRow)) {
              _this6.newCheckedRows.push(currentRow);
            }
          }
        });
        this.$emit('check', this.newCheckedRows);
        this.$emit('check-all', this.newCheckedRows); // Emit checked rows to update user variable

        this.$emit('update:checkedRows', this.newCheckedRows);
      },

      /**
      * Row checkbox click listener.
      */
      checkRow: function checkRow(row, index, event) {
        if (!this.isRowCheckable(row)) return;
        var lastIndex = this.lastCheckedRowIndex;
        this.lastCheckedRowIndex = index;

        if (event.shiftKey && lastIndex !== null && index !== lastIndex) {
          this.shiftCheckRow(row, index, lastIndex);
        } else if (!this.isRowChecked(row)) {
          this.newCheckedRows.push(row);
        } else {
          this.removeCheckedRow(row);
        }

        this.$emit('check', this.newCheckedRows, row); // Emit checked rows to update user variable

        this.$emit('update:checkedRows', this.newCheckedRows);
      },

      /**
       * Check row when shift is pressed.
       */
      shiftCheckRow: function shiftCheckRow(row, index, lastCheckedRowIndex) {
        var _this7 = this;

        // Get the subset of the list between the two indicies
        var subset = this.visibleData.slice(Math.min(index, lastCheckedRowIndex), Math.max(index, lastCheckedRowIndex) + 1); // Determine the operation based on the state of the clicked checkbox

        var shouldCheck = !this.isRowChecked(row);
        subset.forEach(function (item) {
          _this7.removeCheckedRow(item);

          if (shouldCheck && _this7.isRowCheckable(item)) {
            _this7.newCheckedRows.push(item);
          }
        });
      },

      /**
      * Row click listener.
      * Emit all necessary events.
      */
      selectRow: function selectRow(row, index) {
        this.$emit('click', row);
        if (this.selected === row) return;
        if (!this.isRowSelectable(row)) return; // Emit new and old row

        this.$emit('select', row, this.selected); // Emit new row to update user variable

        this.$emit('update:selected', row);
      },

      /**
      * Toggle to show/hide details slot
      */
      toggleDetails: function toggleDetails(obj) {
        var found = this.isVisibleDetailRow(obj);

        if (found) {
          this.closeDetailRow(obj);
          this.$emit('details-close', obj);
        } else {
          this.openDetailRow(obj);
          this.$emit('details-open', obj);
        } // Syncs the detailed rows with the parent component


        this.$emit('update:openedDetailed', this.visibleDetailRows);
      },
      openDetailRow: function openDetailRow(obj) {
        var index = this.handleDetailKey(obj);
        this.visibleDetailRows.push(index);
      },
      closeDetailRow: function closeDetailRow(obj) {
        var index = this.handleDetailKey(obj);
        var i = this.visibleDetailRows.indexOf(index);
        this.visibleDetailRows.splice(i, 1);
      },
      isVisibleDetailRow: function isVisibleDetailRow(obj) {
        var index = this.handleDetailKey(obj);
        var result = this.visibleDetailRows.indexOf(index) >= 0;
        return result;
      },
      isActiveDetailRow: function isActiveDetailRow(row) {
        return this.detailed && !this.customDetailRow && this.isVisibleDetailRow(row);
      },
      isActiveCustomDetailRow: function isActiveCustomDetailRow(row) {
        return this.detailed && this.customDetailRow && this.isVisibleDetailRow(row);
      },
      isRowFiltered: function isRowFiltered(row) {
        var _this8 = this;

        var _loop = function _loop(key) {
          // remove key if empty
          if (!_this8.filters[key]) {
            delete _this8.filters[key];
            return {
              v: true
            };
          }

          var input = _this8.filters[key];

          var column = _this8.newColumns.filter(function (c) {
            return c.field === key;
          })[0];

          if (column && column.customSearch && typeof column.customSearch === 'function') {
            return {
              v: column.customSearch(row, input)
            };
          } else {
            var value = _this8.getValueByPath(row, key);

            if (value == null) return {
              v: false
            };

            if (Number.isInteger(value)) {
              if (value !== Number(input)) return {
                v: false
              };
            } else {
              var re = new RegExp(escapeRegExpChars(input), 'i');
              if (!re.test(value)) return {
                v: false
              };
            }
          }
        };

        for (var key in this.filters) {
          var _ret = _loop(key);

          if (_typeof(_ret) === "object") return _ret.v;
        }

        return true;
      },

      /**
      * When the detailKey is defined we use the object[detailKey] as index.
      * If not, use the object reference by default.
      */
      handleDetailKey: function handleDetailKey(index) {
        var key = this.detailKey;
        return !key.length || !index ? index : index[key];
      },
      checkPredefinedDetailedRows: function checkPredefinedDetailedRows() {
        var defaultExpandedRowsDefined = this.openedDetailed.length > 0;

        if (defaultExpandedRowsDefined && !this.detailKey.length) {
          throw new Error('If you set a predefined opened-detailed, you must provide a unique key using the prop "detail-key"');
        }
      },

      /**
      * Call initSort only first time (For example async data).
      */
      checkSort: function checkSort() {
        if (this.newColumns.length && this.firstTimeSort) {
          this.initSort();
          this.firstTimeSort = false;
        } else if (this.newColumns.length) {
          if (Object.keys(this.currentSortColumn).length > 0) {
            for (var i = 0; i < this.newColumns.length; i++) {
              if (this.newColumns[i].field === this.currentSortColumn.field) {
                this.currentSortColumn = this.newColumns[i];
                break;
              }
            }
          }
        }
      },

      /**
      * Check if footer slot has custom content.
      */
      hasCustomFooterSlot: function hasCustomFooterSlot() {
        if (this.$slots.footer.length > 1) return true;
        var tag = this.$slots.footer[0].tag;
        if (tag !== 'th' && tag !== 'td') return false;
        return true;
      },

      /**
      * Check if bottom-left slot exists.
      */
      hasBottomLeftSlot: function hasBottomLeftSlot() {
        return typeof this.$slots['bottom-left'] !== 'undefined';
      },

      /**
      * Table arrow keys listener, change selection.
      */
      pressedArrow: function pressedArrow(pos) {
        if (!this.visibleData.length) return;
        var index = this.visibleData.indexOf(this.selected) + pos; // Prevent from going up from first and down from last

        index = index < 0 ? 0 : index > this.visibleData.length - 1 ? this.visibleData.length - 1 : index;
        var row = this.visibleData[index];

        if (!this.isRowSelectable(row)) {
          var newIndex = null;

          if (pos > 0) {
            for (var i = index; i < this.visibleData.length && newIndex === null; i++) {
              if (this.isRowSelectable(this.visibleData[i])) newIndex = i;
            }
          } else {
            for (var _i = index; _i >= 0 && newIndex === null; _i--) {
              if (this.isRowSelectable(this.visibleData[_i])) newIndex = _i;
            }
          }

          if (newIndex >= 0) {
            this.selectRow(this.visibleData[newIndex]);
          }
        } else {
          this.selectRow(row);
        }
      },

      /**
      * Focus table element if has selected prop.
      */
      focus: function focus() {
        if (!this.focusable) return;
        this.$el.querySelector('table').focus();
      },

      /**
      * Initial sorted column based on the default-sort prop.
      */
      initSort: function initSort() {
        var _this9 = this;

        if (this.sortMultiple && this.sortMultipleData) {
          this.sortMultipleData.forEach(function (column) {
            _this9.sortMultiColumn(column);
          });
        } else {
          if (!this.defaultSort) return;
          var sortField = '';
          var sortDirection = this.defaultSortDirection;

          if (Array.isArray(this.defaultSort)) {
            sortField = this.defaultSort[0];

            if (this.defaultSort[1]) {
              sortDirection = this.defaultSort[1];
            }
          } else {
            sortField = this.defaultSort;
          }

          var sortColumn = this.newColumns.filter(function (column) {
            return column.field === sortField;
          })[0];

          if (sortColumn) {
            this.isAsc = sortDirection.toLowerCase() !== 'desc';
            this.sort(sortColumn, true);
          }
        }
      },

      /**
      * Emits drag start event (row)
      */
      handleDragStart: function handleDragStart(event, row, index) {
        if (!this.canDragRow) return;
        this.isDraggingRow = true;
        this.$emit('dragstart', {
          event: event,
          row: row,
          index: index
        });
      },

      /**
      * Emits drag leave event (row)
      */
      handleDragEnd: function handleDragEnd(event, row, index) {
        if (!this.canDragRow) return;
        this.isDraggingRow = false;
        this.$emit('dragend', {
          event: event,
          row: row,
          index: index
        });
      },

      /**
      * Emits drop event (row)
      */
      handleDrop: function handleDrop(event, row, index) {
        if (!this.canDragRow) return;
        this.$emit('drop', {
          event: event,
          row: row,
          index: index
        });
      },

      /**
      * Emits drag over event (row)
      */
      handleDragOver: function handleDragOver(event, row, index) {
        if (!this.canDragRow) return;
        this.$emit('dragover', {
          event: event,
          row: row,
          index: index
        });
      },

      /**
      * Emits drag leave event (row)
      */
      handleDragLeave: function handleDragLeave(event, row, index) {
        if (!this.canDragRow) return;
        this.$emit('dragleave', {
          event: event,
          row: row,
          index: index
        });
      },
      emitEventForRow: function emitEventForRow(eventName, event, row) {
        return this.$listeners[eventName] ? this.$emit(eventName, row, event) : null;
      },

      /**
      * Emits drag start event (column)
      */
      handleColumnDragStart: function handleColumnDragStart(event, column, index) {
        if (!this.canDragColumn) return;
        this.isDraggingColumn = true;
        this.$emit('columndragstart', {
          event: event,
          column: column,
          index: index
        });
      },

      /**
      * Emits drag leave event (column)
      */
      handleColumnDragEnd: function handleColumnDragEnd(event, column, index) {
        if (!this.canDragColumn) return;
        this.isDraggingColumn = false;
        this.$emit('columndragend', {
          event: event,
          column: column,
          index: index
        });
      },

      /**
      * Emits drop event (column)
      */
      handleColumnDrop: function handleColumnDrop(event, column, index) {
        if (!this.canDragColumn) return;
        this.$emit('columndrop', {
          event: event,
          column: column,
          index: index
        });
      },

      /**
      * Emits drag over event (column)
      */
      handleColumnDragOver: function handleColumnDragOver(event, column, index) {
        if (!this.canDragColumn) return;
        this.$emit('columndragover', {
          event: event,
          column: column,
          index: index
        });
      },

      /**
      * Emits drag leave event (column)
      */
      handleColumnDragLeave: function handleColumnDragLeave(event, column, index) {
        if (!this.canDragColumn) return;
        this.$emit('columndragleave', {
          event: event,
          column: column,
          index: index
        });
      },
      refreshSlots: function refreshSlots() {
        this.defaultSlots = this.$slots.default || [];
      }
    },
    mounted: function mounted() {
      this.refreshSlots();
      this.checkPredefinedDetailedRows();
      this.checkSort();
    }
  };

  /* script */
  const __vue_script__$W = script$W;

  /* template */
  var __vue_render__$P = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"b-table"},[_vm._t("default"),(_vm.mobileCards && _vm.hasSortablenewColumns)?_c('b-table-mobile-sort',{attrs:{"current-sort-column":_vm.currentSortColumn,"sort-multiple":_vm.sortMultiple,"sort-multiple-data":_vm.sortMultipleDataComputed,"is-asc":_vm.isAsc,"columns":_vm.newColumns,"placeholder":_vm.mobileSortPlaceholder,"icon-pack":_vm.iconPack,"sort-icon":_vm.sortIcon,"sort-icon-size":_vm.sortIconSize},on:{"sort":function (column, event) { return _vm.sort(column, null, event); },"removePriority":function (column) { return _vm.removeSortingPriority(column); }}}):_vm._e(),(_vm.paginated && (_vm.paginationPosition === 'top' || _vm.paginationPosition === 'both'))?[_vm._t("pagination",[_c('b-table-pagination',_vm._b({attrs:{"per-page":_vm.perPage,"paginated":_vm.paginated,"rounded":_vm.paginationRounded,"icon-pack":_vm.iconPack,"total":_vm.newDataTotal,"current-page":_vm.newCurrentPage,"aria-next-label":_vm.ariaNextLabel,"aria-previous-label":_vm.ariaPreviousLabel,"aria-page-label":_vm.ariaPageLabel,"aria-current-label":_vm.ariaCurrentLabel},on:{"update:currentPage":function($event){_vm.newCurrentPage=$event;},"update:current-page":function($event){_vm.newCurrentPage=$event;},"page-change":function (event) { return _vm.$emit('page-change', event); }}},'b-table-pagination',_vm.$attrs,false),[_vm._t("top-left")],2)])]:_vm._e(),_c('div',{staticClass:"table-wrapper",class:_vm.tableWrapperClasses,style:(_vm.tableStyle)},[_c('table',{staticClass:"table",class:_vm.tableClasses,attrs:{"tabindex":!_vm.focusable ? false : 0},on:{"keydown":[function($event){if(!$event.type.indexOf('key')&&_vm._k($event.keyCode,"up",38,$event.key,["Up","ArrowUp"])){ return null; }if($event.target !== $event.currentTarget){ return null; }$event.preventDefault();return _vm.pressedArrow(-1)},function($event){if(!$event.type.indexOf('key')&&_vm._k($event.keyCode,"down",40,$event.key,["Down","ArrowDown"])){ return null; }if($event.target !== $event.currentTarget){ return null; }$event.preventDefault();return _vm.pressedArrow(1)}]}},[(_vm.newColumns.length && _vm.showHeader)?_c('thead',[_c('tr',[(_vm.showDetailRowIcon)?_c('th',{attrs:{"width":"40px"}}):_vm._e(),(_vm.checkable && _vm.checkboxPosition === 'left')?_c('th',{class:['checkbox-cell', { 'is-sticky': _vm.stickyCheckbox } ]},[(_vm.headerCheckable)?[_c('b-checkbox',{attrs:{"value":_vm.isAllChecked,"disabled":_vm.isAllUncheckable},nativeOn:{"change":function($event){return _vm.checkAll($event)}}})]:_vm._e()],2):_vm._e(),_vm._l((_vm.visibleColumns),function(column,index){return _c('th',_vm._b({key:column.newKey + ':' + index + 'header',class:[column.thClasses, {
                              'is-current-sort': !_vm.sortMultiple && _vm.currentSortColumn === column,
                          }],style:(column.thStyle),attrs:{"draggable":_vm.canDragColumn},on:{"click":function($event){$event.stopPropagation();return _vm.sort(column, null, $event)},"dragstart":function($event){return _vm.handleColumnDragStart($event, column, index)},"dragend":function($event){return _vm.handleColumnDragEnd($event, column, index)},"drop":function($event){return _vm.handleColumnDrop($event, column, index)},"dragover":function($event){return _vm.handleColumnDragOver($event, column, index)},"dragleave":function($event){return _vm.handleColumnDragLeave($event, column, index)}}},'th',column.thAttrs(column),false),[_c('div',{staticClass:"th-wrap",class:{
                                  'is-numeric': column.numeric,
                                  'is-centered': column.centered
                          }},[(column.$scopedSlots && column.$scopedSlots.header)?[_c('b-slot-component',{attrs:{"component":column,"scoped":"","name":"header","tag":"span","props":{ column: column, index: index }}})]:[_c('span',{staticClass:"is-relative"},[_vm._v(" "+_vm._s(column.label)+" "),(_vm.sortMultiple &&
                                              _vm.sortMultipleDataComputed &&
                                              _vm.sortMultipleDataComputed.length > 0 &&
                                              _vm.sortMultipleDataComputed.filter(function (i) { return i.field === column.field; }).length > 0)?[_c('b-icon',{class:{
                                                  'is-desc': _vm.sortMultipleDataComputed.filter(function (i) { return i.field === column.field; })[0].order === 'desc'},attrs:{"icon":_vm.sortIcon,"pack":_vm.iconPack,"both":"","size":_vm.sortIconSize}}),_vm._v(" "+_vm._s(_vm.findIndexOfSortData(column))+" "),_c('button',{staticClass:"delete is-small multi-sort-cancel-icon",attrs:{"type":"button"},on:{"click":function($event){$event.stopPropagation();return _vm.removeSortingPriority(column)}}})]:_c('b-icon',{staticClass:"sort-icon",class:{
                                              'is-desc': !_vm.isAsc,
                                              'is-invisible': _vm.currentSortColumn !== column
                                          },attrs:{"icon":_vm.sortIcon,"pack":_vm.iconPack,"both":"","size":_vm.sortIconSize}})],2)]],2)])}),(_vm.checkable && _vm.checkboxPosition === 'right')?_c('th',{class:['checkbox-cell', { 'is-sticky': _vm.stickyCheckbox } ]},[(_vm.headerCheckable)?[_c('b-checkbox',{attrs:{"value":_vm.isAllChecked,"disabled":_vm.isAllUncheckable},nativeOn:{"change":function($event){return _vm.checkAll($event)}}})]:_vm._e()],2):_vm._e()],2),(_vm.hasCustomSubheadings)?_c('tr',{staticClass:"is-subheading"},[(_vm.showDetailRowIcon)?_c('th',{attrs:{"width":"40px"}}):_vm._e(),(_vm.checkable && _vm.checkboxPosition === 'left')?_c('th'):_vm._e(),_vm._l((_vm.visibleColumns),function(column,index){return _c('th',{key:column.newKey + ':' + index + 'subheading',style:(column.style)},[_c('div',{staticClass:"th-wrap",class:{
                                  'is-numeric': column.numeric,
                                  'is-centered': column.centered
                          }},[(column.$scopedSlots && column.$scopedSlots.subheading)?[_c('b-slot-component',{attrs:{"component":column,"scoped":"","name":"subheading","tag":"span","props":{ column: column, index: index }}})]:[_vm._v(_vm._s(column.subheading))]],2)])}),(_vm.checkable && _vm.checkboxPosition === 'right')?_c('th'):_vm._e()],2):_vm._e(),(_vm.hasSearchablenewColumns)?_c('tr',[(_vm.showDetailRowIcon)?_c('th',{attrs:{"width":"40px"}}):_vm._e(),(_vm.checkable && _vm.checkboxPosition === 'left')?_c('th'):_vm._e(),_vm._l((_vm.visibleColumns),function(column,index){return _c('th',_vm._b({key:column.newKey + ':' + index + 'searchable',class:{'is-sticky': column.sticky},style:(column.thStyle)},'th',column.thAttrs(column),false),[_c('div',{staticClass:"th-wrap"},[(column.searchable)?[(column.$scopedSlots
                                      && column.$scopedSlots.searchable)?[_c('b-slot-component',{attrs:{"component":column,"scoped":true,"name":"searchable","tag":"span","props":{ column: column, filters: _vm.filters }}})]:_c('b-input',{attrs:{"type":column.numeric ? 'number' : 'text'},nativeOn:_vm._d({},[_vm.filtersEvent,function($event){return _vm.onFiltersEvent($event)}]),model:{value:(_vm.filters[column.field]),callback:function ($$v) {_vm.$set(_vm.filters, column.field, $$v);},expression:"filters[column.field]"}})]:_vm._e()],2)])}),(_vm.checkable && _vm.checkboxPosition === 'right')?_c('th'):_vm._e()],2):_vm._e()]):_vm._e(),_c('tbody',[_vm._l((_vm.visibleData),function(row,index){return [_c('tr',{key:_vm.customRowKey ? row[_vm.customRowKey] : index,class:[_vm.rowClass(row, index), {
                              'is-selected': _vm.isRowSelected(row, _vm.selected),
                              'is-checked': _vm.isRowChecked(row),
                          }],attrs:{"draggable":_vm.canDragRow},on:{"click":function($event){return _vm.selectRow(row)},"dblclick":function($event){return _vm.$emit('dblclick', row)},"mouseenter":function($event){return _vm.emitEventForRow('mouseenter', $event, row)},"mouseleave":function($event){return _vm.emitEventForRow('mouseleave', $event, row)},"contextmenu":function($event){return _vm.$emit('contextmenu', row, $event)},"dragstart":function($event){return _vm.handleDragStart($event, row, index)},"dragend":function($event){return _vm.handleDragEnd($event, row, index)},"drop":function($event){return _vm.handleDrop($event, row, index)},"dragover":function($event){return _vm.handleDragOver($event, row, index)},"dragleave":function($event){return _vm.handleDragLeave($event, row, index)}}},[(_vm.showDetailRowIcon)?_c('td',{staticClass:"chevron-cell"},[(_vm.hasDetailedVisible(row))?_c('a',{attrs:{"role":"button"},on:{"click":function($event){$event.stopPropagation();return _vm.toggleDetails(row)}}},[_c('b-icon',{class:{'is-expanded': _vm.isVisibleDetailRow(row)},attrs:{"icon":"chevron-right","pack":_vm.iconPack,"both":""}})],1):_vm._e()]):_vm._e(),(_vm.checkable && _vm.checkboxPosition === 'left')?_c('td',{class:['checkbox-cell', { 'is-sticky': _vm.stickyCheckbox } ]},[_c('b-checkbox',{attrs:{"disabled":!_vm.isRowCheckable(row),"value":_vm.isRowChecked(row)},nativeOn:{"click":function($event){$event.preventDefault();$event.stopPropagation();return _vm.checkRow(row, index, $event)}}})],1):_vm._e(),_vm._l((_vm.visibleColumns),function(column,colindex){return [(column.$scopedSlots && column.$scopedSlots.default)?[_c('b-slot-component',_vm._b({key:column.newKey + ':' + index + ':' + colindex,class:column.getRootClasses(row),style:(column.getRootStyle(row)),attrs:{"component":column,"scoped":"","name":"default","tag":"td","data-label":column.label,"props":{ row: row, column: column, index: index, colindex: colindex, toggleDetails: _vm.toggleDetails }},nativeOn:{"click":function($event){return _vm.$emit('cellclick',row,column,index,colindex)}}},'b-slot-component',column.tdAttrs(row, column),false))]:_vm._e()]}),(_vm.checkable && _vm.checkboxPosition === 'right')?_c('td',{class:['checkbox-cell', { 'is-sticky': _vm.stickyCheckbox } ]},[_c('b-checkbox',{attrs:{"disabled":!_vm.isRowCheckable(row),"value":_vm.isRowChecked(row)},nativeOn:{"click":function($event){$event.preventDefault();$event.stopPropagation();return _vm.checkRow(row, index, $event)}}})],1):_vm._e()],2),_c('transition',{key:(_vm.customRowKey ? row[_vm.customRowKey] : index) + 'detail',attrs:{"name":_vm.detailTransition}},[(_vm.isActiveDetailRow(row))?_c('tr',{staticClass:"detail"},[_c('td',{attrs:{"colspan":_vm.columnCount}},[_c('div',{staticClass:"detail-container"},[_vm._t("detail",null,{"row":row,"index":index})],2)])]):_vm._e()]),(_vm.isActiveCustomDetailRow(row))?_vm._t("detail",null,{"row":row,"index":index}):_vm._e()]}),(!_vm.visibleData.length)?_c('tr',{staticClass:"is-empty"},[_c('td',{attrs:{"colspan":_vm.columnCount}},[_vm._t("empty")],2)]):_vm._e()],2),(_vm.$slots.footer !== undefined)?_c('tfoot',[_c('tr',{staticClass:"table-footer"},[(_vm.hasCustomFooterSlot())?_vm._t("footer"):_c('th',{attrs:{"colspan":_vm.columnCount}},[_vm._t("footer")],2)],2)]):_vm._e()]),(_vm.loading)?[_vm._t("loading",[_c('b-loading',{attrs:{"is-full-page":false,"active":_vm.loading},on:{"update:active":function($event){_vm.loading=$event;}}})])]:_vm._e()],2),((_vm.checkable && _vm.hasBottomLeftSlot()) ||
          (_vm.paginated && (_vm.paginationPosition === 'bottom' || _vm.paginationPosition === 'both')))?[_vm._t("pagination",[_c('b-table-pagination',_vm._b({attrs:{"per-page":_vm.perPage,"paginated":_vm.paginated,"rounded":_vm.paginationRounded,"icon-pack":_vm.iconPack,"total":_vm.newDataTotal,"current-page":_vm.newCurrentPage,"aria-next-label":_vm.ariaNextLabel,"aria-previous-label":_vm.ariaPreviousLabel,"aria-page-label":_vm.ariaPageLabel,"aria-current-label":_vm.ariaCurrentLabel},on:{"update:currentPage":function($event){_vm.newCurrentPage=$event;},"update:current-page":function($event){_vm.newCurrentPage=$event;},"page-change":function (event) { return _vm.$emit('page-change', event); }}},'b-table-pagination',_vm.$attrs,false),[_vm._t("bottom-left")],2)])]:_vm._e()],2)};
  var __vue_staticRenderFns__$P = [];

    /* style */
    const __vue_inject_styles__$W = undefined;
    /* scoped */
    const __vue_scope_id__$W = undefined;
    /* module identifier */
    const __vue_module_identifier__$W = undefined;
    /* functional template */
    const __vue_is_functional_template__$W = false;
    /* style inject */
    
    /* style inject SSR */
    

    
    var Table = normalizeComponent_1(
      { render: __vue_render__$P, staticRenderFns: __vue_staticRenderFns__$P },
      __vue_inject_styles__$W,
      __vue_script__$W,
      __vue_scope_id__$W,
      __vue_is_functional_template__$W,
      __vue_module_identifier__$W,
      undefined,
      undefined
    );

  var Plugin$w = {
    install: function install(Vue) {
      // individual import + extend method into Table.vue
      if (typeof VueInstance === 'undefined') {
        setVueInstance(Vue);
      }

      registerComponent(Vue, Table);
      registerComponent(Vue, TableColumn);
    }
  };
  use(Plugin$w);

  var script$X = {
    name: 'BTabs',
    mixins: [TabbedMixin('tab')],
    props: {
      expanded: {
        type: Boolean,
        default: function _default() {
          return config.defaultTabsExpanded;
        }
      },
      type: {
        type: [String, Object],
        default: function _default() {
          return config.defaultTabsType;
        }
      },
      animated: {
        type: Boolean,
        default: function _default() {
          return config.defaultTabsAnimated;
        }
      },
      multiline: Boolean
    },
    data: function data() {
      return {
        currentFocus: this.value
      };
    },
    computed: {
      mainClasses: function mainClasses() {
        return _defineProperty({
          'is-fullwidth': this.expanded,
          'is-vertical': this.vertical,
          'is-multiline': this.multiline
        }, this.position, this.position && this.vertical);
      },
      navClasses: function navClasses() {
        var _ref2;

        return [this.type, this.size, (_ref2 = {}, _defineProperty(_ref2, this.position, this.position && !this.vertical), _defineProperty(_ref2, 'is-fullwidth', this.expanded), _defineProperty(_ref2, 'is-toggle', this.type === 'is-toggle-rounded'), _ref2)];
      }
    },
    methods: {
      giveFocusToTab: function giveFocusToTab(tab) {
        if (tab.$el && tab.$el.focus) {
          tab.$el.focus();
        } else if (tab.focus) {
          tab.focus();
        }
      },
      manageTablistKeydown: function manageTablistKeydown(event) {
        // https://developer.mozilla.org/fr/docs/Web/API/KeyboardEvent/key/Key_Values#Navigation_keys
        var key = event.key;

        switch (key) {
          case this.vertical ? 'ArrowUp' : 'ArrowLeft':
          case this.vertical ? 'Up' : 'Left':
            {
              var prevIdx = this.getPrevItemIdx(this.currentFocus, true);

              if (prevIdx === null) {
                // We try to give focus back to the last visible element
                prevIdx = this.getPrevItemIdx(this.items.length, true);
              }

              if (prevIdx !== null && this.$refs.tabLink && prevIdx < this.$refs.tabLink.length && !this.items[prevIdx].disabled) {
                this.giveFocusToTab(this.$refs.tabLink[prevIdx]);
              }

              event.preventDefault();
              break;
            }

          case this.vertical ? 'ArrowDown' : 'ArrowRight':
          case this.vertical ? 'Down' : 'Right':
            {
              var nextIdx = this.getNextItemIdx(this.currentFocus, true);

              if (nextIdx === null) {
                // We try to give focus back to the first visible element
                nextIdx = this.getNextItemIdx(-1, true);
              }

              if (nextIdx !== null && this.$refs.tabLink && nextIdx < this.$refs.tabLink.length && !this.items[nextIdx].disabled) {
                this.giveFocusToTab(this.$refs.tabLink[nextIdx]);
              }

              event.preventDefault();
              break;
            }
        }
      },
      manageTabKeydown: function manageTabKeydown(event, childItem) {
        // https://developer.mozilla.org/fr/docs/Web/API/KeyboardEvent/key/Key_Values#Navigation_keys
        var key = event.key;

        switch (key) {
          case ' ':
          case 'Space':
          case 'Spacebar':
          case 'Enter':
            {
              this.childClick(childItem);
              event.preventDefault();
              break;
            }
        }
      }
    }
  };

  /* script */
  const __vue_script__$X = script$X;

  /* template */
  var __vue_render__$Q = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"b-tabs",class:_vm.mainClasses},[_c('nav',{staticClass:"tabs",class:_vm.navClasses,attrs:{"role":"tablist","aria-orientation":_vm.vertical ? 'vertical' : 'horizontal'},on:{"keydown":_vm.manageTablistKeydown}},[_c('ul',_vm._l((_vm.items),function(childItem,childIdx){return _c('li',{directives:[{name:"show",rawName:"v-show",value:(childItem.visible),expression:"childItem.visible"}],key:childItem.value,class:[ childItem.headerClass, { 'is-active': childItem.isActive,
                                                     'is-disabled': childItem.disabled }],attrs:{"role":"presentation"}},[(childItem.$scopedSlots.header)?_c('b-slot-component',{ref:"tabLink",refInFor:true,attrs:{"component":childItem,"name":"header","tag":"a","role":"tab","id":((childItem.value) + "-label"),"aria-controls":((childItem.value) + "-content"),"aria-selected":("" + (childItem.isActive)),"tabindex":childItem.isActive ? 0 : -1},on:{"keydown":function($event){return _vm.manageTabKeydown($event, childItem)}},nativeOn:{"focus":function($event){_vm.currentFocus = childIdx;},"click":function($event){return _vm.childClick(childItem)}}}):_c('a',{ref:"tabLink",refInFor:true,attrs:{"role":"tab","id":((childItem.value) + "-tab"),"aria-controls":((childItem.value) + "-content"),"aria-selected":("" + (childItem.isActive)),"tabindex":childItem.isActive ? 0 : -1},on:{"focus":function($event){_vm.currentFocus = childIdx;},"click":function($event){return _vm.childClick(childItem)},"keydown":function($event){return _vm.manageTabKeydown($event, childItem)}}},[(childItem.icon)?_c('b-icon',{attrs:{"icon":childItem.icon,"pack":childItem.iconPack,"size":_vm.size}}):_vm._e(),_c('span',[_vm._v(_vm._s(childItem.label))])],1)],1)}),0)]),_c('section',{staticClass:"tab-content",class:{'is-transitioning': _vm.isTransitioning}},[_vm._t("default")],2)])};
  var __vue_staticRenderFns__$Q = [];

    /* style */
    const __vue_inject_styles__$X = undefined;
    /* scoped */
    const __vue_scope_id__$X = undefined;
    /* module identifier */
    const __vue_module_identifier__$X = undefined;
    /* functional template */
    const __vue_is_functional_template__$X = false;
    /* style inject */
    
    /* style inject SSR */
    

    
    var Tabs = normalizeComponent_1(
      { render: __vue_render__$Q, staticRenderFns: __vue_staticRenderFns__$Q },
      __vue_inject_styles__$X,
      __vue_script__$X,
      __vue_scope_id__$X,
      __vue_is_functional_template__$X,
      __vue_module_identifier__$X,
      undefined,
      undefined
    );

  var script$Y = {
    name: 'BTabItem',
    mixins: [TabbedChildMixin('tab')],
    props: {
      disabled: Boolean
    },
    data: function data() {
      return {
        elementClass: 'tab-item',
        elementRole: 'tabpanel'
      };
    }
  };

  /* script */
  const __vue_script__$Y = script$Y;

  /* template */

    /* style */
    const __vue_inject_styles__$Y = undefined;
    /* scoped */
    const __vue_scope_id__$Y = undefined;
    /* module identifier */
    const __vue_module_identifier__$Y = undefined;
    /* functional template */
    const __vue_is_functional_template__$Y = undefined;
    /* style inject */
    
    /* style inject SSR */
    

    
    var TabItem = normalizeComponent_1(
      {},
      __vue_inject_styles__$Y,
      __vue_script__$Y,
      __vue_scope_id__$Y,
      __vue_is_functional_template__$Y,
      __vue_module_identifier__$Y,
      undefined,
      undefined
    );

  var Plugin$x = {
    install: function install(Vue) {
      registerComponent(Vue, Tabs);
      registerComponent(Vue, TabItem);
    }
  };
  use(Plugin$x);

  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  var script$Z = {
    name: 'BTag',
    props: {
      attached: Boolean,
      closable: Boolean,
      type: String,
      size: String,
      rounded: Boolean,
      disabled: Boolean,
      ellipsis: Boolean,
      tabstop: {
        type: Boolean,
        default: true
      },
      ariaCloseLabel: String,
      closeType: String,
      closeIcon: String,
      closeIconPack: String,
      closeIconType: String
    },
    methods: {
      /**
      * Emit close event when delete button is clicked
      * or delete key is pressed.
      */
      close: function close(event) {
        if (this.disabled) return;
        this.$emit('close', event);
      }
    }
  };

  /* script */
  const __vue_script__$Z = script$Z;

  /* template */
  var __vue_render__$R = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return (_vm.attached && _vm.closable)?_c('div',{staticClass:"tags has-addons"},[_c('span',{staticClass:"tag",class:[_vm.type, _vm.size, { 'is-rounded': _vm.rounded }]},[_c('span',{class:{ 'has-ellipsis': _vm.ellipsis }},[_vm._t("default")],2)]),_c('a',{staticClass:"tag",class:[_vm.size,
                   _vm.closeType,
                   {'is-rounded': _vm.rounded},
                   _vm.closeIcon ? 'has-delete-icon' : 'is-delete'],attrs:{"role":"button","aria-label":_vm.ariaCloseLabel,"tabindex":_vm.tabstop ? 0 : false,"disabled":_vm.disabled},on:{"click":_vm.close,"keyup":function($event){if(!$event.type.indexOf('key')&&_vm._k($event.keyCode,"delete",[8,46],$event.key,["Backspace","Delete","Del"])){ return null; }$event.preventDefault();return _vm.close($event)}}},[(_vm.closeIcon)?_c('b-icon',{attrs:{"custom-class":"","icon":_vm.closeIcon,"size":_vm.size,"type":_vm.closeIconType,"pack":_vm.closeIconPack}}):_vm._e()],1)]):_c('span',{staticClass:"tag",class:[_vm.type, _vm.size, { 'is-rounded': _vm.rounded }]},[_c('span',{class:{ 'has-ellipsis': _vm.ellipsis }},[_vm._t("default")],2),(_vm.closable)?_c('a',{staticClass:"delete is-small",class:_vm.closeType,attrs:{"role":"button","aria-label":_vm.ariaCloseLabel,"disabled":_vm.disabled,"tabindex":_vm.tabstop ? 0 : false},on:{"click":_vm.close,"keyup":function($event){if(!$event.type.indexOf('key')&&_vm._k($event.keyCode,"delete",[8,46],$event.key,["Backspace","Delete","Del"])){ return null; }$event.preventDefault();return _vm.close($event)}}}):_vm._e()])};
  var __vue_staticRenderFns__$R = [];

    /* style */
    const __vue_inject_styles__$Z = undefined;
    /* scoped */
    const __vue_scope_id__$Z = undefined;
    /* module identifier */
    const __vue_module_identifier__$Z = undefined;
    /* functional template */
    const __vue_is_functional_template__$Z = false;
    /* style inject */
    
    /* style inject SSR */
    

    
    var Tag = normalizeComponent_1(
      { render: __vue_render__$R, staticRenderFns: __vue_staticRenderFns__$R },
      __vue_inject_styles__$Z,
      __vue_script__$Z,
      __vue_scope_id__$Z,
      __vue_is_functional_template__$Z,
      __vue_module_identifier__$Z,
      undefined,
      undefined
    );

  //
  //
  //
  //
  //
  //
  var script$_ = {
    name: 'BTaglist',
    props: {
      attached: Boolean
    }
  };

  /* script */
  const __vue_script__$_ = script$_;

  /* template */
  var __vue_render__$S = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"tags",class:{ 'has-addons': _vm.attached }},[_vm._t("default")],2)};
  var __vue_staticRenderFns__$S = [];

    /* style */
    const __vue_inject_styles__$_ = undefined;
    /* scoped */
    const __vue_scope_id__$_ = undefined;
    /* module identifier */
    const __vue_module_identifier__$_ = undefined;
    /* functional template */
    const __vue_is_functional_template__$_ = false;
    /* style inject */
    
    /* style inject SSR */
    

    
    var Taglist = normalizeComponent_1(
      { render: __vue_render__$S, staticRenderFns: __vue_staticRenderFns__$S },
      __vue_inject_styles__$_,
      __vue_script__$_,
      __vue_scope_id__$_,
      __vue_is_functional_template__$_,
      __vue_module_identifier__$_,
      undefined,
      undefined
    );

  var Plugin$y = {
    install: function install(Vue) {
      registerComponent(Vue, Tag);
      registerComponent(Vue, Taglist);
    }
  };
  use(Plugin$y);

  var _components$9;
  var script$$ = {
    name: 'BTaginput',
    components: (_components$9 = {}, _defineProperty(_components$9, Autocomplete.name, Autocomplete), _defineProperty(_components$9, Tag.name, Tag), _components$9),
    mixins: [FormElementMixin],
    inheritAttrs: false,
    props: {
      value: {
        type: Array,
        default: function _default() {
          return [];
        }
      },
      data: {
        type: Array,
        default: function _default() {
          return [];
        }
      },
      type: String,
      closeType: String,
      rounded: {
        type: Boolean,
        default: false
      },
      attached: {
        type: Boolean,
        default: false
      },
      maxtags: {
        type: [Number, String],
        required: false
      },
      hasCounter: {
        type: Boolean,
        default: function _default() {
          return config.defaultTaginputHasCounter;
        }
      },
      field: {
        type: String,
        default: 'value'
      },
      autocomplete: Boolean,
      groupField: String,
      groupOptions: String,
      nativeAutocomplete: String,
      openOnFocus: Boolean,
      disabled: Boolean,
      ellipsis: Boolean,
      closable: {
        type: Boolean,
        default: true
      },
      ariaCloseLabel: String,
      confirmKeys: {
        type: Array,
        default: function _default() {
          return [',', 'Tab', 'Enter'];
        }
      },
      removeOnKeys: {
        type: Array,
        default: function _default() {
          return ['Backspace'];
        }
      },
      allowNew: Boolean,
      onPasteSeparators: {
        type: Array,
        default: function _default() {
          return [','];
        }
      },
      beforeAdding: {
        type: Function,
        default: function _default() {
          return true;
        }
      },
      allowDuplicates: {
        type: Boolean,
        default: false
      },
      checkInfiniteScroll: {
        type: Boolean,
        default: false
      },
      createTag: {
        type: Function,
        default: function _default(tag) {
          return tag;
        }
      },
      appendToBody: Boolean
    },
    data: function data() {
      return {
        tags: Array.isArray(this.value) ? this.value.slice(0) : this.value || [],
        newTag: '',
        isComposing: false,
        _elementRef: 'autocomplete',
        _isTaginput: true
      };
    },
    computed: {
      rootClasses: function rootClasses() {
        return {
          'is-expanded': this.expanded
        };
      },
      containerClasses: function containerClasses() {
        return {
          'is-focused': this.isFocused,
          'is-focusable': this.hasInput
        };
      },
      valueLength: function valueLength() {
        return this.newTag.trim().length;
      },
      hasDefaultSlot: function hasDefaultSlot() {
        return !!this.$scopedSlots.default;
      },
      hasEmptySlot: function hasEmptySlot() {
        return !!this.$slots.empty;
      },
      hasHeaderSlot: function hasHeaderSlot() {
        return !!this.$slots.header;
      },
      hasFooterSlot: function hasFooterSlot() {
        return !!this.$slots.footer;
      },

      /**
       * Show the input field if a maxtags hasn't been set or reached.
       */
      hasInput: function hasInput() {
        return this.maxtags == null || this.maxtags === 1 || this.tagsLength < this.maxtags;
      },
      tagsLength: function tagsLength() {
        return this.tags.length;
      },

      /**
       * If Taginput has onPasteSeparators prop,
       * returning new RegExp used to split pasted string.
       */
      separatorsAsRegExp: function separatorsAsRegExp() {
        var sep = this.onPasteSeparators;
        return sep.length ? new RegExp(sep.map(function (s) {
          return s ? s.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&') : null;
        }).join('|'), 'g') : null;
      }
    },
    watch: {
      /**
       * When v-model is changed set internal value.
       */
      value: function value(_value) {
        this.tags = Array.isArray(_value) ? _value.slice(0) : _value || [];
      },
      hasInput: function hasInput() {
        if (!this.hasInput) this.onBlur();
      }
    },
    methods: {
      addTag: function addTag(tag) {
        var tagToAdd = tag || this.newTag.trim();

        if (tagToAdd) {
          if (!this.autocomplete) {
            var reg = this.separatorsAsRegExp;

            if (reg && tagToAdd.match(reg)) {
              tagToAdd.split(reg).map(function (t) {
                return t.trim();
              }).filter(function (t) {
                return t.length !== 0;
              }).map(this.addTag);
              return;
            }
          } // Add the tag input if it is not blank
          // or previously added (if not allowDuplicates).


          var add = !this.allowDuplicates ? this.tags.indexOf(tagToAdd) === -1 : true;

          if (add && this.beforeAdding(tagToAdd)) {
            if (this.maxtags === 1) {
              this.tags = []; // replace existing tag if only 1 is allowed
            }

            this.tags.push(this.createTag(tagToAdd));
            this.$emit('input', this.tags);
            this.$emit('add', tagToAdd);
          }
        }

        this.newTag = '';
      },
      getNormalizedTagText: function getNormalizedTagText(tag) {
        if (_typeof(tag) === 'object') {
          tag = getValueByPath(tag, this.field);
        }

        return "".concat(tag);
      },
      customOnBlur: function customOnBlur(event) {
        // Add tag on-blur if not select only
        if (!this.autocomplete) this.addTag();
        this.onBlur(event);
      },
      onSelect: function onSelect(option) {
        var _this = this;

        if (!option) return;
        this.addTag(option);
        this.$nextTick(function () {
          _this.newTag = '';
        });
      },
      removeTag: function removeTag(index, event) {
        var tag = this.tags.splice(index, 1)[0];
        this.$emit('input', this.tags);
        this.$emit('remove', tag);
        if (event) event.stopPropagation();

        if (this.openOnFocus && this.$refs.autocomplete) {
          this.$refs.autocomplete.focus();
        }

        return tag;
      },
      removeLastTag: function removeLastTag() {
        if (this.tagsLength > 0) {
          this.removeTag(this.tagsLength - 1);
        }
      },
      keydown: function keydown(event) {
        var key = event.key; // cannot destructure preventDefault (https://stackoverflow.com/a/49616808/2774496)

        if (this.removeOnKeys.indexOf(key) !== -1 && !this.newTag.length) {
          this.removeLastTag();
        } // Stop if is to accept select only


        if (this.autocomplete && !this.allowNew) return;

        if (this.confirmKeys.indexOf(key) >= 0) {
          // Allow Tab to advance to next field regardless
          if (key !== 'Tab') event.preventDefault();
          if (key === 'Enter' && this.isComposing) return;
          this.addTag();
        }
      },
      onTyping: function onTyping(event) {
        this.$emit('typing', event.trim());
      },
      emitInfiniteScroll: function emitInfiniteScroll() {
        this.$emit('infinite-scroll');
      }
    }
  };

  /* script */
  const __vue_script__$$ = script$$;

  /* template */
  var __vue_render__$T = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"taginput control",class:_vm.rootClasses},[_c('div',{staticClass:"taginput-container",class:[_vm.statusType, _vm.size, _vm.containerClasses],attrs:{"disabled":_vm.disabled},on:{"click":function($event){_vm.hasInput && _vm.focus($event);}}},[_vm._t("selected",_vm._l((_vm.tags),function(tag,index){return _c('b-tag',{key:_vm.getNormalizedTagText(tag) + index,attrs:{"type":_vm.type,"close-type":_vm.closeType,"size":_vm.size,"rounded":_vm.rounded,"attached":_vm.attached,"tabstop":false,"disabled":_vm.disabled,"ellipsis":_vm.ellipsis,"closable":_vm.closable,"aria-close-label":_vm.ariaCloseLabel,"title":_vm.ellipsis && _vm.getNormalizedTagText(tag)},on:{"close":function($event){return _vm.removeTag(index, $event)}}},[_vm._t("tag",[_vm._v(" "+_vm._s(_vm.getNormalizedTagText(tag))+" ")],{"tag":tag})],2)}),{"tags":_vm.tags}),(_vm.hasInput)?_c('b-autocomplete',_vm._b({ref:"autocomplete",attrs:{"data":_vm.data,"field":_vm.field,"icon":_vm.icon,"icon-pack":_vm.iconPack,"maxlength":_vm.maxlength,"has-counter":false,"size":_vm.size,"disabled":_vm.disabled,"loading":_vm.loading,"autocomplete":_vm.nativeAutocomplete,"open-on-focus":_vm.openOnFocus,"keep-open":_vm.openOnFocus,"group-field":_vm.groupField,"group-options":_vm.groupOptions,"use-html5-validation":_vm.useHtml5Validation,"check-infinite-scroll":_vm.checkInfiniteScroll,"append-to-body":_vm.appendToBody,"confirm-keys":_vm.confirmKeys},on:{"typing":_vm.onTyping,"focus":_vm.onFocus,"blur":_vm.customOnBlur,"select":_vm.onSelect,"infinite-scroll":_vm.emitInfiniteScroll},nativeOn:{"keydown":function($event){return _vm.keydown($event)},"compositionstart":function($event){_vm.isComposing = true;},"compositionend":function($event){_vm.isComposing = false;}},scopedSlots:_vm._u([(_vm.hasHeaderSlot)?{key:"header",fn:function(){return [_vm._t("header")]},proxy:true}:null,(_vm.hasDefaultSlot)?{key:"default",fn:function(props){return [_vm._t("default",null,{"option":props.option,"index":props.index})]}}:null,(_vm.hasEmptySlot)?{key:"empty",fn:function(){return [_vm._t("empty")]},proxy:true}:null,(_vm.hasFooterSlot)?{key:"footer",fn:function(){return [_vm._t("footer")]},proxy:true}:null],null,true),model:{value:(_vm.newTag),callback:function ($$v) {_vm.newTag=$$v;},expression:"newTag"}},'b-autocomplete',_vm.$attrs,false)):_vm._e()],2),(_vm.hasCounter && (_vm.maxtags || _vm.maxlength))?_c('small',{staticClass:"help counter"},[(_vm.maxlength && _vm.valueLength > 0)?[_vm._v(" "+_vm._s(_vm.valueLength)+" / "+_vm._s(_vm.maxlength)+" ")]:(_vm.maxtags)?[_vm._v(" "+_vm._s(_vm.tagsLength)+" / "+_vm._s(_vm.maxtags)+" ")]:_vm._e()],2):_vm._e()])};
  var __vue_staticRenderFns__$T = [];

    /* style */
    const __vue_inject_styles__$$ = undefined;
    /* scoped */
    const __vue_scope_id__$$ = undefined;
    /* module identifier */
    const __vue_module_identifier__$$ = undefined;
    /* functional template */
    const __vue_is_functional_template__$$ = false;
    /* style inject */
    
    /* style inject SSR */
    

    
    var Taginput = normalizeComponent_1(
      { render: __vue_render__$T, staticRenderFns: __vue_staticRenderFns__$T },
      __vue_inject_styles__$$,
      __vue_script__$$,
      __vue_scope_id__$$,
      __vue_is_functional_template__$$,
      __vue_module_identifier__$$,
      undefined,
      undefined
    );

  var Plugin$z = {
    install: function install(Vue) {
      registerComponent(Vue, Taginput);
    }
  };
  use(Plugin$z);

  var Plugin$A = {
    install: function install(Vue) {
      registerComponent(Vue, Timepicker);
    }
  };
  use(Plugin$A);

  //
  var script$10 = {
    name: 'BToast',
    mixins: [NoticeMixin],
    data: function data() {
      return {
        newDuration: this.duration || config.defaultToastDuration
      };
    }
  };

  /* script */
  const __vue_script__$10 = script$10;

  /* template */
  var __vue_render__$U = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('transition',{attrs:{"enter-active-class":_vm.transition.enter,"leave-active-class":_vm.transition.leave}},[_c('div',{directives:[{name:"show",rawName:"v-show",value:(_vm.isActive),expression:"isActive"}],staticClass:"toast",class:[_vm.type, _vm.position],attrs:{"aria-hidden":!_vm.isActive,"role":"alert"}},[(_vm.$slots.default)?[_vm._t("default")]:[_c('div',{domProps:{"innerHTML":_vm._s(_vm.message)}})]],2)])};
  var __vue_staticRenderFns__$U = [];

    /* style */
    const __vue_inject_styles__$10 = undefined;
    /* scoped */
    const __vue_scope_id__$10 = undefined;
    /* module identifier */
    const __vue_module_identifier__$10 = undefined;
    /* functional template */
    const __vue_is_functional_template__$10 = false;
    /* style inject */
    
    /* style inject SSR */
    

    
    var Toast = normalizeComponent_1(
      { render: __vue_render__$U, staticRenderFns: __vue_staticRenderFns__$U },
      __vue_inject_styles__$10,
      __vue_script__$10,
      __vue_scope_id__$10,
      __vue_is_functional_template__$10,
      __vue_module_identifier__$10,
      undefined,
      undefined
    );

  var localVueInstance$5;
  var ToastProgrammatic = {
    open: function open(params) {
      var parent;

      if (typeof params === 'string') {
        params = {
          message: params
        };
      }

      var defaultParam = {
        position: config.defaultToastPosition || 'is-top'
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
      var vm = typeof window !== 'undefined' && window.Vue ? window.Vue : localVueInstance$5 || VueInstance;
      var ToastComponent = vm.extend(Toast);
      var component = new ToastComponent({
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
  var Plugin$B = {
    install: function install(Vue) {
      localVueInstance$5 = Vue;
      registerComponentProgrammatic(Vue, 'toast', ToastProgrammatic);
    }
  };
  use(Plugin$B);

  var Plugin$C = {
    install: function install(Vue) {
      registerComponent(Vue, Tooltip);
    }
  };
  use(Plugin$C);

  //
  var script$11 = {
    name: 'BUpload',
    mixins: [FormElementMixin],
    inheritAttrs: false,
    props: {
      value: {
        type: [Object, Function, File, Array]
      },
      multiple: Boolean,
      disabled: Boolean,
      accept: String,
      dragDrop: Boolean,
      type: {
        type: String,
        default: 'is-primary'
      },
      native: {
        type: Boolean,
        default: false
      },
      expanded: {
        type: Boolean,
        default: false
      },
      rounded: {
        type: Boolean,
        default: false
      }
    },
    data: function data() {
      return {
        newValue: this.value,
        dragDropFocus: false,
        _elementRef: 'input'
      };
    },
    watch: {
      /**
       *   When v-model is changed:
       *   1. Set internal value.
       *   2. Reset interna input file value
       *   3. If it's invalid, validate again.
       */
      value: function value(_value) {
        this.newValue = _value;

        if (!_value || Array.isArray(_value) && _value.length === 0) {
          this.$refs.input.value = null;
        }

        !this.isValid && !this.dragDrop && this.checkHtml5Validity();
      }
    },
    methods: {
      /**
      * Listen change event on input type 'file',
      * emit 'input' event and validate
      */
      onFileChange: function onFileChange(event) {
        if (this.disabled || this.loading) return;
        if (this.dragDrop) this.updateDragDropFocus(false);
        var value = event.target.files || event.dataTransfer.files;

        if (value.length === 0) {
          if (!this.newValue) return;
          if (this.native) this.newValue = null;
        } else if (!this.multiple) {
          // only one element in case drag drop mode and isn't multiple
          if (this.dragDrop && value.length !== 1) return;else {
            var file = value[0];
            if (this.checkType(file)) this.newValue = file;else if (this.newValue) this.newValue = null;else return;
          }
        } else {
          // always new values if native or undefined local
          var newValues = false;

          if (this.native || !this.newValue) {
            this.newValue = [];
            newValues = true;
          }

          for (var i = 0; i < value.length; i++) {
            var _file = value[i];

            if (this.checkType(_file)) {
              this.newValue.push(_file);
              newValues = true;
            }
          }

          if (!newValues) return;
        }

        this.$emit('input', this.newValue);
        !this.dragDrop && this.checkHtml5Validity();
      },

      /**
      * Listen drag-drop to update internal variable
      */
      updateDragDropFocus: function updateDragDropFocus(focus) {
        if (!this.disabled && !this.loading) {
          this.dragDropFocus = focus;
        }
      },

      /**
      * Check mime type of file
      */
      checkType: function checkType(file) {
        if (!this.accept) return true;
        var types = this.accept.split(',');
        if (types.length === 0) return true;
        var valid = false;

        for (var i = 0; i < types.length && !valid; i++) {
          var type = types[i].trim();

          if (type) {
            if (type.substring(0, 1) === '.') {
              // check extension
              var extIndex = file.name.lastIndexOf('.');
              var extension = extIndex >= 0 ? file.name.substring(extIndex) : '';

              if (extension.toLowerCase() === type.toLowerCase()) {
                valid = true;
              }
            } else {
              // check mime type
              if (file.type.match(type)) {
                valid = true;
              }
            }
          }
        }

        if (!valid) this.$emit('invalid');
        return valid;
      }
    }
  };

  /* script */
  const __vue_script__$11 = script$11;

  /* template */
  var __vue_render__$V = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('label',{staticClass:"upload control",class:{'is-expanded' : _vm.expanded, 'is-rounded' : _vm.rounded}},[(!_vm.dragDrop)?[_vm._t("default")]:_c('div',{staticClass:"upload-draggable",class:[_vm.type, {
              'is-loading': _vm.loading,
              'is-disabled': _vm.disabled,
              'is-hovered': _vm.dragDropFocus,
              'is-expanded': _vm.expanded,
          }],on:{"dragover":function($event){$event.preventDefault();return _vm.updateDragDropFocus(true)},"dragleave":function($event){$event.preventDefault();return _vm.updateDragDropFocus(false)},"dragenter":function($event){$event.preventDefault();return _vm.updateDragDropFocus(true)},"drop":function($event){$event.preventDefault();return _vm.onFileChange($event)}}},[_vm._t("default")],2),_c('input',_vm._b({ref:"input",attrs:{"type":"file","multiple":_vm.multiple,"accept":_vm.accept,"disabled":_vm.disabled},on:{"change":_vm.onFileChange}},'input',_vm.$attrs,false))],2)};
  var __vue_staticRenderFns__$V = [];

    /* style */
    const __vue_inject_styles__$11 = undefined;
    /* scoped */
    const __vue_scope_id__$11 = undefined;
    /* module identifier */
    const __vue_module_identifier__$11 = undefined;
    /* functional template */
    const __vue_is_functional_template__$11 = false;
    /* style inject */
    
    /* style inject SSR */
    

    
    var Upload = normalizeComponent_1(
      { render: __vue_render__$V, staticRenderFns: __vue_staticRenderFns__$V },
      __vue_inject_styles__$11,
      __vue_script__$11,
      __vue_scope_id__$11,
      __vue_is_functional_template__$11,
      __vue_module_identifier__$11,
      undefined,
      undefined
    );

  var Plugin$D = {
    install: function install(Vue) {
      registerComponent(Vue, Upload);
    }
  };
  use(Plugin$D);



  var components = /*#__PURE__*/Object.freeze({
    Autocomplete: Plugin,
    Button: Plugin$1,
    Carousel: Plugin$2,
    Checkbox: Plugin$3,
    Clockpicker: Plugin$5,
    Collapse: Plugin$4,
    Datepicker: Plugin$6,
    Datetimepicker: Plugin$7,
    Dialog: Plugin$8,
    Dropdown: Plugin$9,
    Field: Plugin$a,
    Icon: Plugin$b,
    Image: Plugin$c,
    Input: Plugin$d,
    Loading: Plugin$e,
    Menu: Plugin$f,
    Message: Plugin$g,
    Modal: Plugin$h,
    Navbar: Plugin$j,
    Notification: Plugin$i,
    Numberinput: Plugin$k,
    Pagination: Plugin$l,
    Progress: Plugin$m,
    Radio: Plugin$n,
    Rate: Plugin$o,
    Select: Plugin$p,
    Skeleton: Plugin$q,
    Sidebar: Plugin$r,
    Slider: Plugin$s,
    Snackbar: Plugin$t,
    Steps: Plugin$u,
    Switch: Plugin$v,
    Table: Plugin$w,
    Tabs: Plugin$x,
    Tag: Plugin$y,
    Taginput: Plugin$z,
    Timepicker: Plugin$A,
    Toast: Plugin$B,
    Tooltip: Plugin$C,
    Upload: Plugin$D
  });

  var ConfigComponent = {
    getOptions: function getOptions() {
      return config;
    },
    setOptions: function setOptions$1(options) {
      setOptions(merge(config, options, true));
    }
  };

  var Buefy = {
    install: function install(Vue) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      setVueInstance(Vue); // Options

      setOptions(merge(config, options, true)); // Components

      for (var componentKey in components) {
        Vue.use(components[componentKey]);
      } // Config component


      registerComponentProgrammatic(Vue, 'config', ConfigComponent);
    }
  };
  use(Buefy);

  exports.Autocomplete = Plugin;
  exports.Button = Plugin$1;
  exports.Carousel = Plugin$2;
  exports.Checkbox = Plugin$3;
  exports.Clockpicker = Plugin$5;
  exports.Collapse = Plugin$4;
  exports.ConfigProgrammatic = ConfigComponent;
  exports.Datepicker = Plugin$6;
  exports.Datetimepicker = Plugin$7;
  exports.Dialog = Plugin$8;
  exports.DialogProgrammatic = DialogProgrammatic;
  exports.Dropdown = Plugin$9;
  exports.Field = Plugin$a;
  exports.Icon = Plugin$b;
  exports.Image = Plugin$c;
  exports.Input = Plugin$d;
  exports.Loading = Plugin$e;
  exports.LoadingProgrammatic = LoadingProgrammatic;
  exports.Menu = Plugin$f;
  exports.Message = Plugin$g;
  exports.Modal = Plugin$h;
  exports.ModalProgrammatic = ModalProgrammatic;
  exports.Navbar = Plugin$j;
  exports.Notification = Plugin$i;
  exports.NotificationProgrammatic = NotificationProgrammatic;
  exports.Numberinput = Plugin$k;
  exports.Pagination = Plugin$l;
  exports.Progress = Plugin$m;
  exports.Radio = Plugin$n;
  exports.Rate = Plugin$o;
  exports.Select = Plugin$p;
  exports.Sidebar = Plugin$r;
  exports.Skeleton = Plugin$q;
  exports.Slider = Plugin$s;
  exports.Snackbar = Plugin$t;
  exports.SnackbarProgrammatic = SnackbarProgrammatic;
  exports.Steps = Plugin$u;
  exports.Switch = Plugin$v;
  exports.Table = Plugin$w;
  exports.Tabs = Plugin$x;
  exports.Tag = Plugin$y;
  exports.Taginput = Plugin$z;
  exports.Timepicker = Plugin$A;
  exports.Toast = Plugin$B;
  exports.ToastProgrammatic = ToastProgrammatic;
  exports.Tooltip = Plugin$C;
  exports.Upload = Plugin$D;
  exports.bound = bound;
  exports.createAbsoluteElement = createAbsoluteElement;
  exports.createNewEvent = createNewEvent;
  exports.default = Buefy;
  exports.escapeRegExpChars = escapeRegExpChars;
  exports.getMonthNames = getMonthNames;
  exports.getValueByPath = getValueByPath;
  exports.getWeekdayNames = getWeekdayNames;
  exports.hasFlag = hasFlag;
  exports.indexOf = indexOf;
  exports.isCustomElement = isCustomElement;
  exports.isDefined = isDefined;
  exports.isMobile = isMobile;
  exports.isVueComponent = isVueComponent;
  exports.isWebpSupported = isWebpSupported;
  exports.matchWithGroups = matchWithGroups;
  exports.merge = merge;
  exports.mod = mod;
  exports.multiColumnSort = multiColumnSort;
  exports.removeElement = removeElement;
  exports.sign = sign;
  exports.toCssWidth = toCssWidth;

  Object.defineProperty(exports, '__esModule', { value: true });

}));
