/*! Buefy v0.9.7 | MIT License | github.com/buefy/buefy */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = global || self, factory(global.Datepicker = {}));
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
  function isCustomElement(vm) {
    return 'shadowRoot' in vm.$root.$options;
  }
  var isDefined = function isDefined(d) {
    return d !== undefined;
  };

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

  var items = 1;
  var sorted = 3;
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

  var DEFAULT_CLOSE_OPTIONS = ['escape', 'outside'];
  var script = {
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
  var __vue_render__ = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{ref:"dropdown",staticClass:"dropdown dropdown-menu-animation",class:_vm.rootClasses},[(!_vm.inline)?_c('div',{ref:"trigger",staticClass:"dropdown-trigger",attrs:{"role":"button","aria-haspopup":"true"},on:{"click":_vm.onClick,"contextmenu":function($event){$event.preventDefault();return _vm.onContextMenu($event)},"mouseenter":_vm.onHover,"!focus":function($event){return _vm.onFocus($event)}}},[_vm._t("trigger",null,{"active":_vm.isActive})],2):_vm._e(),_c('transition',{attrs:{"name":_vm.animation}},[(_vm.isMobileModal)?_c('div',{directives:[{name:"show",rawName:"v-show",value:(_vm.isActive),expression:"isActive"}],staticClass:"background",attrs:{"aria-hidden":!_vm.isActive}}):_vm._e()]),_c('transition',{attrs:{"name":_vm.animation}},[_c('div',{directives:[{name:"show",rawName:"v-show",value:((!_vm.disabled && (_vm.isActive || _vm.isHoverable)) || _vm.inline),expression:"(!disabled && (isActive || isHoverable)) || inline"},{name:"trap-focus",rawName:"v-trap-focus",value:(_vm.trapFocus),expression:"trapFocus"}],ref:"dropdownMenu",staticClass:"dropdown-menu",style:(_vm.style),attrs:{"aria-hidden":!_vm.isActive}},[_c('div',{staticClass:"dropdown-content",style:(_vm.contentStyle),attrs:{"role":_vm.ariaRole}},[_vm._t("default")],2)])])],1)};
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
    

    
    var Dropdown = normalizeComponent_1(
      { render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ },
      __vue_inject_styles__,
      __vue_script__,
      __vue_scope_id__,
      __vue_is_functional_template__,
      __vue_module_identifier__,
      undefined,
      undefined
    );

  var sorted$1 = 1;
  var optional = 2;
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
  var script$1 = {
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
  const __vue_script__$1 = script$1;

  /* template */
  var __vue_render__$1 = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return (_vm.separator)?_c('hr',{staticClass:"dropdown-divider"}):(!_vm.custom && !_vm.hasLink)?_c('a',{staticClass:"dropdown-item",class:_vm.anchorClasses,attrs:{"role":_vm.ariaRoleItem,"tabindex":_vm.isFocusable ? 0 : null},on:{"click":_vm.selectItem}},[_vm._t("default")],2):_c('div',{class:_vm.itemClasses,attrs:{"role":_vm.ariaRoleItem,"tabindex":_vm.isFocusable ? 0 : null},on:{"click":_vm.selectItem}},[_vm._t("default")],2)};
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
    

    
    var DropdownItem = normalizeComponent_1(
      { render: __vue_render__$1, staticRenderFns: __vue_staticRenderFns__$1 },
      __vue_inject_styles__$1,
      __vue_script__$1,
      __vue_scope_id__$1,
      __vue_is_functional_template__$1,
      __vue_module_identifier__$1,
      undefined,
      undefined
    );

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
  var __vue_render__$2 = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('span',{staticClass:"icon",class:[_vm.newType, _vm.size]},[(!_vm.useIconComponent)?_c('i',{class:[_vm.newPack, _vm.newIcon, _vm.newCustomSize, _vm.customClass]}):_c(_vm.useIconComponent,{tag:"component",class:[_vm.customClass],attrs:{"icon":[_vm.newPack, _vm.newIcon],"size":_vm.newCustomSize}})],1)};
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
    

    
    var Icon = normalizeComponent_1(
      { render: __vue_render__$2, staticRenderFns: __vue_staticRenderFns__$2 },
      __vue_inject_styles__$2,
      __vue_script__$2,
      __vue_scope_id__$2,
      __vue_is_functional_template__$2,
      __vue_module_identifier__$2,
      undefined,
      undefined
    );

  var script$3 = {
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
  const __vue_script__$3 = script$3;

  /* template */
  var __vue_render__$3 = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"control",class:_vm.rootClasses},[(_vm.type !== 'textarea')?_c('input',_vm._b({ref:"input",staticClass:"input",class:[_vm.inputClasses, _vm.customClass],attrs:{"type":_vm.newType,"autocomplete":_vm.newAutocomplete,"maxlength":_vm.maxlength},domProps:{"value":_vm.computedValue},on:{"input":_vm.onInput,"change":_vm.onChange,"blur":_vm.onBlur,"focus":_vm.onFocus}},'input',_vm.$attrs,false)):_c('textarea',_vm._b({ref:"textarea",staticClass:"textarea",class:[_vm.inputClasses, _vm.customClass],attrs:{"maxlength":_vm.maxlength},domProps:{"value":_vm.computedValue},on:{"input":_vm.onInput,"change":_vm.onChange,"blur":_vm.onBlur,"focus":_vm.onFocus}},'textarea',_vm.$attrs,false)),(_vm.icon)?_c('b-icon',{staticClass:"is-left",class:{'is-clickable': _vm.iconClickable},attrs:{"icon":_vm.icon,"pack":_vm.iconPack,"size":_vm.iconSize},nativeOn:{"click":function($event){return _vm.iconClick('icon-click', $event)}}}):_vm._e(),(!_vm.loading && _vm.hasIconRight)?_c('b-icon',{staticClass:"is-right",class:{ 'is-clickable': _vm.passwordReveal || _vm.iconRightClickable },attrs:{"icon":_vm.rightIcon,"pack":_vm.iconPack,"size":_vm.iconSize,"type":_vm.rightIconType,"both":""},nativeOn:{"click":function($event){return _vm.rightIconClick($event)}}}):_vm._e(),(_vm.maxlength && _vm.hasCounter && _vm.type !== 'number')?_c('small',{staticClass:"help counter",class:{ 'is-invisible': !_vm.isFocused }},[_vm._v(" "+_vm._s(_vm.valueLength)+" / "+_vm._s(_vm.maxlength)+" ")]):_vm._e()],1)};
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
    

    
    var Input = normalizeComponent_1(
      { render: __vue_render__$3, staticRenderFns: __vue_staticRenderFns__$3 },
      __vue_inject_styles__$3,
      __vue_script__$3,
      __vue_scope_id__$3,
      __vue_is_functional_template__$3,
      __vue_module_identifier__$3,
      undefined,
      undefined
    );

  var script$4 = {
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
  const __vue_script__$4 = script$4;

  /* template */

    /* style */
    const __vue_inject_styles__$4 = undefined;
    /* scoped */
    const __vue_scope_id__$4 = undefined;
    /* module identifier */
    const __vue_module_identifier__$4 = undefined;
    /* functional template */
    const __vue_is_functional_template__$4 = undefined;
    /* style inject */
    
    /* style inject SSR */
    

    
    var FieldBody = normalizeComponent_1(
      {},
      __vue_inject_styles__$4,
      __vue_script__$4,
      __vue_scope_id__$4,
      __vue_is_functional_template__$4,
      __vue_module_identifier__$4,
      undefined,
      undefined
    );

  var script$5 = {
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
  const __vue_script__$5 = script$5;

  /* template */
  var __vue_render__$4 = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"field",class:_vm.rootClasses},[(_vm.horizontal)?_c('div',{staticClass:"field-label",class:[_vm.customClass, _vm.fieldLabelSize]},[(_vm.hasLabel)?_c('label',{staticClass:"label",class:_vm.customClass,attrs:{"for":_vm.labelFor}},[(_vm.$slots.label)?_vm._t("label"):[_vm._v(_vm._s(_vm.label))]],2):_vm._e()]):[(_vm.hasLabel)?_c('label',{staticClass:"label",class:_vm.customClass,attrs:{"for":_vm.labelFor}},[(_vm.$slots.label)?_vm._t("label"):[_vm._v(_vm._s(_vm.label))]],2):_vm._e()],(_vm.horizontal)?_c('b-field-body',{attrs:{"message":_vm.newMessage ? _vm.formattedMessage : '',"type":_vm.newType}},[_vm._t("default")],2):(_vm.hasInnerField)?_c('div',{staticClass:"field-body"},[_c('b-field',{class:_vm.innerFieldClasses,attrs:{"addons":false,"type":_vm.newType}},[_vm._t("default")],2)],1):[_vm._t("default")],(_vm.hasMessage && !_vm.horizontal)?_c('p',{staticClass:"help",class:_vm.newType},[(_vm.$slots.message)?_vm._t("message"):[_vm._l((_vm.formattedMessage),function(mess,i){return [_vm._v(" "+_vm._s(mess)+" "),((i + 1) < _vm.formattedMessage.length)?_c('br',{key:i}):_vm._e()]})]],2):_vm._e()],2)};
  var __vue_staticRenderFns__$4 = [];

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
    

    
    var Field = normalizeComponent_1(
      { render: __vue_render__$4, staticRenderFns: __vue_staticRenderFns__$4 },
      __vue_inject_styles__$5,
      __vue_script__$5,
      __vue_scope_id__$5,
      __vue_is_functional_template__$5,
      __vue_module_identifier__$5,
      undefined,
      undefined
    );

  var script$6 = {
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
  const __vue_script__$6 = script$6;

  /* template */
  var __vue_render__$5 = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"control",class:{ 'is-expanded': _vm.expanded, 'has-icons-left': _vm.icon }},[_c('span',{staticClass:"select",class:_vm.spanClasses},[_c('select',_vm._b({directives:[{name:"model",rawName:"v-model",value:(_vm.computedValue),expression:"computedValue"}],ref:"select",attrs:{"multiple":_vm.multiple,"size":_vm.nativeSize},on:{"blur":function($event){_vm.$emit('blur', $event) && _vm.checkHtml5Validity();},"focus":function($event){return _vm.$emit('focus', $event)},"change":function($event){var $$selectedVal = Array.prototype.filter.call($event.target.options,function(o){return o.selected}).map(function(o){var val = "_value" in o ? o._value : o.value;return val}); _vm.computedValue=$event.target.multiple ? $$selectedVal : $$selectedVal[0];}}},'select',_vm.$attrs,false),[(_vm.placeholder)?[(_vm.computedValue == null)?_c('option',{attrs:{"disabled":"","hidden":""},domProps:{"value":null}},[_vm._v(" "+_vm._s(_vm.placeholder)+" ")]):_vm._e()]:_vm._e(),_vm._t("default")],2)]),(_vm.icon)?_c('b-icon',{staticClass:"is-left",attrs:{"icon":_vm.icon,"pack":_vm.iconPack,"size":_vm.iconSize}}):_vm._e()],1)};
  var __vue_staticRenderFns__$5 = [];

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
    

    
    var Select = normalizeComponent_1(
      { render: __vue_render__$5, staticRenderFns: __vue_staticRenderFns__$5 },
      __vue_inject_styles__$6,
      __vue_script__$6,
      __vue_scope_id__$6,
      __vue_is_functional_template__$6,
      __vue_module_identifier__$6,
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
  var script$7 = {
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
  const __vue_script__$7 = script$7;

  /* template */
  var __vue_render__$6 = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"datepicker-row"},[(_vm.showWeekNumber)?_c('a',{staticClass:"datepicker-cell is-week-number",class:{'is-clickable': _vm.weekNumberClickable },on:{"click":function($event){$event.preventDefault();_vm.clickWeekNumber(_vm.getWeekNumber(_vm.week[6]));}}},[_c('span',[_vm._v(_vm._s(_vm.getWeekNumber(_vm.week[6])))])]):_vm._e(),_vm._l((_vm.week),function(weekDay,index){return [(_vm.selectableDate(weekDay) && !_vm.disabled)?_c('a',{key:index,ref:("day-" + (weekDay.getMonth()) + "-" + (weekDay.getDate())),refInFor:true,staticClass:"datepicker-cell",class:_vm.classObject(weekDay),attrs:{"role":"button","href":"#","disabled":_vm.disabled,"tabindex":_vm.day === weekDay.getDate() ? null : -1},on:{"click":function($event){$event.preventDefault();return _vm.emitChosenDate(weekDay)},"mouseenter":function($event){return _vm.setRangeHoverEndDate(weekDay)},"keydown":function($event){return _vm.manageKeydown($event, weekDay)}}},[_c('span',[_vm._v(_vm._s(weekDay.getDate()))]),(_vm.eventsDateMatch(weekDay))?_c('div',{staticClass:"events"},_vm._l((_vm.eventsDateMatch(weekDay)),function(event,index){return _c('div',{key:index,staticClass:"event",class:event.type})}),0):_vm._e()]):_c('div',{key:index,staticClass:"datepicker-cell",class:_vm.classObject(weekDay)},[_c('span',[_vm._v(_vm._s(weekDay.getDate()))]),(_vm.eventsDateMatch(weekDay))?_c('div',{staticClass:"events"},_vm._l((_vm.eventsDateMatch(weekDay)),function(event,index){return _c('div',{key:index,staticClass:"event",class:event.type})}),0):_vm._e()])]})],2)};
  var __vue_staticRenderFns__$6 = [];

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
    

    
    var DatepickerTableRow = normalizeComponent_1(
      { render: __vue_render__$6, staticRenderFns: __vue_staticRenderFns__$6 },
      __vue_inject_styles__$7,
      __vue_script__$7,
      __vue_scope_id__$7,
      __vue_is_functional_template__$7,
      __vue_module_identifier__$7,
      undefined,
      undefined
    );

  var script$8 = {
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
  const __vue_script__$8 = script$8;

  /* template */
  var __vue_render__$7 = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('section',{staticClass:"datepicker-table"},[_c('header',{staticClass:"datepicker-header"},_vm._l((_vm.visibleDayNames),function(day,index){return _c('div',{key:index,staticClass:"datepicker-cell"},[_c('span',[_vm._v(_vm._s(day))])])}),0),_c('div',{staticClass:"datepicker-body",class:{'has-events':_vm.hasEvents}},_vm._l((_vm.weeksInThisMonth),function(week,index){return _c('b-datepicker-table-row',{key:index,attrs:{"selected-date":_vm.value,"day":_vm.focused.day,"week":week,"month":_vm.focused.month,"min-date":_vm.minDate,"max-date":_vm.maxDate,"disabled":_vm.disabled,"unselectable-dates":_vm.unselectableDates,"unselectable-days-of-week":_vm.unselectableDaysOfWeek,"selectable-dates":_vm.selectableDates,"events":_vm.eventsInThisWeek(week),"indicators":_vm.indicators,"date-creator":_vm.dateCreator,"nearby-month-days":_vm.nearbyMonthDays,"nearby-selectable-month-days":_vm.nearbySelectableMonthDays,"show-week-number":_vm.showWeekNumber,"week-number-clickable":_vm.weekNumberClickable,"first-day-of-week":_vm.firstDayOfWeek,"rules-for-first-week":_vm.rulesForFirstWeek,"range":_vm.range,"hovered-date-range":_vm.hoveredDateRange,"multiple":_vm.multiple},on:{"select":_vm.updateSelectedDate,"rangeHoverEndDate":_vm.setRangeHoverEndDate,"change-focus":_vm.changeFocus}})}),1)])};
  var __vue_staticRenderFns__$7 = [];

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
    

    
    var DatepickerTable = normalizeComponent_1(
      { render: __vue_render__$7, staticRenderFns: __vue_staticRenderFns__$7 },
      __vue_inject_styles__$8,
      __vue_script__$8,
      __vue_scope_id__$8,
      __vue_is_functional_template__$8,
      __vue_module_identifier__$8,
      undefined,
      undefined
    );

  //
  var script$9 = {
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
  const __vue_script__$9 = script$9;

  /* template */
  var __vue_render__$8 = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('section',{staticClass:"datepicker-table"},[_c('div',{staticClass:"datepicker-body",class:{'has-events':_vm.hasEvents}},[_c('div',{staticClass:"datepicker-months"},[_vm._l((_vm.monthDates),function(date,index){return [(_vm.selectableDate(date) && !_vm.disabled)?_c('a',{key:index,ref:("month-" + (date.getMonth())),refInFor:true,staticClass:"datepicker-cell",class:[
                          _vm.classObject(date),
                          {'has-event': _vm.eventsDateMatch(date)},
                          _vm.indicators
                      ],attrs:{"role":"button","href":"#","disabled":_vm.disabled,"tabindex":_vm.focused.month === date.getMonth() ? null : -1},on:{"click":function($event){$event.preventDefault();return _vm.updateSelectedDate(date)},"mouseenter":function($event){return _vm.setRangeHoverEndDate(date)},"keydown":function($event){$event.preventDefault();return _vm.manageKeydown($event, date)}}},[_vm._v(" "+_vm._s(_vm.monthNames[date.getMonth()])+" "),(_vm.eventsDateMatch(date))?_c('div',{staticClass:"events"},_vm._l((_vm.eventsDateMatch(date)),function(event,index){return _c('div',{key:index,staticClass:"event",class:event.type})}),0):_vm._e()]):_c('div',{key:index,staticClass:"datepicker-cell",class:_vm.classObject(date)},[_vm._v(" "+_vm._s(_vm.monthNames[date.getMonth()])+" ")])]})],2)])])};
  var __vue_staticRenderFns__$8 = [];

    /* style */
    const __vue_inject_styles__$9 = undefined;
    /* scoped */
    const __vue_scope_id__$9 = undefined;
    /* module identifier */
    const __vue_module_identifier__$9 = undefined;
    /* functional template */
    const __vue_is_functional_template__$9 = false;
    /* style inject */
    
    /* style inject SSR */
    

    
    var DatepickerMonth = normalizeComponent_1(
      { render: __vue_render__$8, staticRenderFns: __vue_staticRenderFns__$8 },
      __vue_inject_styles__$9,
      __vue_script__$9,
      __vue_scope_id__$9,
      __vue_is_functional_template__$9,
      __vue_module_identifier__$9,
      undefined,
      undefined
    );

  var _components;

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

  var script$a = {
    name: 'BDatepicker',
    components: (_components = {}, _defineProperty(_components, DatepickerTable.name, DatepickerTable), _defineProperty(_components, DatepickerMonth.name, DatepickerMonth), _defineProperty(_components, Input.name, Input), _defineProperty(_components, Field.name, Field), _defineProperty(_components, Select.name, Select), _defineProperty(_components, Icon.name, Icon), _defineProperty(_components, Dropdown.name, Dropdown), _defineProperty(_components, DropdownItem.name, DropdownItem), _components),
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
  const __vue_script__$a = script$a;

  /* template */
  var __vue_render__$9 = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"datepicker control",class:[_vm.size, {'is-expanded': _vm.expanded}]},[(!_vm.isMobile || _vm.inline)?_c('b-dropdown',{ref:"dropdown",attrs:{"position":_vm.position,"disabled":_vm.disabled,"inline":_vm.inline,"mobile-modal":_vm.mobileModal,"trap-focus":_vm.trapFocus,"aria-role":_vm.ariaRole,"aria-modal":!_vm.inline,"append-to-body":_vm.appendToBody,"append-to-body-copy-parent":""},on:{"active-change":_vm.onActiveChange},scopedSlots:_vm._u([(!_vm.inline)?{key:"trigger",fn:function(){return [_vm._t("trigger",[_c('b-input',_vm._b({ref:"input",attrs:{"autocomplete":"off","value":_vm.formattedValue,"placeholder":_vm.placeholder,"size":_vm.size,"icon":_vm.icon,"icon-right":_vm.iconRight,"icon-pack":_vm.iconPack,"rounded":_vm.rounded,"loading":_vm.loading,"disabled":_vm.disabled,"readonly":!_vm.editable,"use-html5-validation":false},on:{"focus":_vm.handleOnFocus},nativeOn:{"click":function($event){return _vm.onInputClick($event)},"keyup":function($event){if(!$event.type.indexOf('key')&&_vm._k($event.keyCode,"enter",13,$event.key,"Enter")){ return null; }return _vm.togglePicker(true)},"change":function($event){return _vm.onChange($event.target.value)}}},'b-input',_vm.$attrs,false))])]},proxy:true}:null],null,true)},[_c('b-dropdown-item',{class:{'dropdown-horizonal-timepicker': _vm.horizontalTimePicker},attrs:{"disabled":_vm.disabled,"focusable":_vm.focusable,"custom":""}},[_c('div',[_c('header',{staticClass:"datepicker-header"},[(_vm.$slots.header !== undefined && _vm.$slots.header.length)?[_vm._t("header")]:_c('div',{staticClass:"pagination field is-centered",class:_vm.size},[_c('a',{directives:[{name:"show",rawName:"v-show",value:(!_vm.showPrev && !_vm.disabled),expression:"!showPrev && !disabled"}],staticClass:"pagination-previous",attrs:{"role":"button","href":"#","disabled":_vm.disabled,"aria-label":_vm.ariaPreviousLabel},on:{"click":function($event){$event.preventDefault();return _vm.prev($event)},"keydown":[function($event){if(!$event.type.indexOf('key')&&_vm._k($event.keyCode,"enter",13,$event.key,"Enter")){ return null; }$event.preventDefault();return _vm.prev($event)},function($event){if(!$event.type.indexOf('key')&&_vm._k($event.keyCode,"space",32,$event.key,[" ","Spacebar"])){ return null; }$event.preventDefault();return _vm.prev($event)}]}},[_c('b-icon',{attrs:{"icon":_vm.iconPrev,"pack":_vm.iconPack,"both":"","type":"is-primary is-clickable"}})],1),_c('a',{directives:[{name:"show",rawName:"v-show",value:(!_vm.showNext && !_vm.disabled),expression:"!showNext && !disabled"}],staticClass:"pagination-next",attrs:{"role":"button","href":"#","disabled":_vm.disabled,"aria-label":_vm.ariaNextLabel},on:{"click":function($event){$event.preventDefault();return _vm.next($event)},"keydown":[function($event){if(!$event.type.indexOf('key')&&_vm._k($event.keyCode,"enter",13,$event.key,"Enter")){ return null; }$event.preventDefault();return _vm.next($event)},function($event){if(!$event.type.indexOf('key')&&_vm._k($event.keyCode,"space",32,$event.key,[" ","Spacebar"])){ return null; }$event.preventDefault();return _vm.next($event)}]}},[_c('b-icon',{attrs:{"icon":_vm.iconNext,"pack":_vm.iconPack,"both":"","type":"is-primary is-clickable"}})],1),_c('div',{staticClass:"pagination-list"},[_c('b-field',[(!_vm.isTypeMonth)?_c('b-select',{attrs:{"disabled":_vm.disabled,"size":_vm.size},model:{value:(_vm.focusedDateData.month),callback:function ($$v) {_vm.$set(_vm.focusedDateData, "month", $$v);},expression:"focusedDateData.month"}},_vm._l((_vm.listOfMonths),function(month){return _c('option',{key:month.name,attrs:{"disabled":month.disabled},domProps:{"value":month.index}},[_vm._v(" "+_vm._s(month.name)+" ")])}),0):_vm._e(),_c('b-select',{attrs:{"disabled":_vm.disabled,"size":_vm.size},model:{value:(_vm.focusedDateData.year),callback:function ($$v) {_vm.$set(_vm.focusedDateData, "year", $$v);},expression:"focusedDateData.year"}},_vm._l((_vm.listOfYears),function(year){return _c('option',{key:year,domProps:{"value":year}},[_vm._v(" "+_vm._s(year)+" ")])}),0)],1)],1)])],2),(!_vm.isTypeMonth)?_c('div',{staticClass:"datepicker-content",class:{'content-horizonal-timepicker': _vm.horizontalTimePicker}},[_c('b-datepicker-table',{attrs:{"day-names":_vm.newDayNames,"month-names":_vm.newMonthNames,"first-day-of-week":_vm.firstDayOfWeek,"rules-for-first-week":_vm.rulesForFirstWeek,"min-date":_vm.minDate,"max-date":_vm.maxDate,"focused":_vm.focusedDateData,"disabled":_vm.disabled,"unselectable-dates":_vm.unselectableDates,"unselectable-days-of-week":_vm.unselectableDaysOfWeek,"selectable-dates":_vm.selectableDates,"events":_vm.events,"indicators":_vm.indicators,"date-creator":_vm.dateCreator,"type-month":_vm.isTypeMonth,"nearby-month-days":_vm.nearbyMonthDays,"nearby-selectable-month-days":_vm.nearbySelectableMonthDays,"show-week-number":_vm.showWeekNumber,"week-number-clickable":_vm.weekNumberClickable,"range":_vm.range,"multiple":_vm.multiple},on:{"range-start":function (date) { return _vm.$emit('range-start', date); },"range-end":function (date) { return _vm.$emit('range-end', date); },"close":function($event){return _vm.togglePicker(false)},"update:focused":function($event){_vm.focusedDateData = $event;}},model:{value:(_vm.computedValue),callback:function ($$v) {_vm.computedValue=$$v;},expression:"computedValue"}})],1):_c('div',[_c('b-datepicker-month',{attrs:{"month-names":_vm.newMonthNames,"min-date":_vm.minDate,"max-date":_vm.maxDate,"focused":_vm.focusedDateData,"disabled":_vm.disabled,"unselectable-dates":_vm.unselectableDates,"unselectable-days-of-week":_vm.unselectableDaysOfWeek,"selectable-dates":_vm.selectableDates,"events":_vm.events,"indicators":_vm.indicators,"date-creator":_vm.dateCreator,"range":_vm.range,"multiple":_vm.multiple},on:{"range-start":function (date) { return _vm.$emit('range-start', date); },"range-end":function (date) { return _vm.$emit('range-end', date); },"close":function($event){return _vm.togglePicker(false)},"change-focus":_vm.changeFocus,"update:focused":function($event){_vm.focusedDateData = $event;}},model:{value:(_vm.computedValue),callback:function ($$v) {_vm.computedValue=$$v;},expression:"computedValue"}})],1)]),(_vm.$slots.default !== undefined && _vm.$slots.default.length)?_c('footer',{staticClass:"datepicker-footer",class:{'footer-horizontal-timepicker': _vm.horizontalTimePicker}},[_vm._t("default")],2):_vm._e()])],1):_c('b-input',_vm._b({ref:"input",attrs:{"type":!_vm.isTypeMonth ? 'date' : 'month',"autocomplete":"off","value":_vm.formatNative(_vm.computedValue),"placeholder":_vm.placeholder,"size":_vm.size,"icon":_vm.icon,"icon-pack":_vm.iconPack,"rounded":_vm.rounded,"loading":_vm.loading,"max":_vm.formatNative(_vm.maxDate),"min":_vm.formatNative(_vm.minDate),"disabled":_vm.disabled,"readonly":false,"use-html5-validation":false},on:{"focus":_vm.onFocus,"blur":_vm.onBlur},nativeOn:{"change":function($event){return _vm.onChangeNativePicker($event)}}},'b-input',_vm.$attrs,false))],1)};
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
    

    
    var Datepicker = normalizeComponent_1(
      { render: __vue_render__$9, staticRenderFns: __vue_staticRenderFns__$9 },
      __vue_inject_styles__$a,
      __vue_script__$a,
      __vue_scope_id__$a,
      __vue_is_functional_template__$a,
      __vue_module_identifier__$a,
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
      registerComponent(Vue, Datepicker);
    }
  };
  use(Plugin);

  exports.BDatepicker = Datepicker;
  exports.default = Plugin;

  Object.defineProperty(exports, '__esModule', { value: true });

}));
