// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign#Polyfill

function isExist (obj) {
  return typeof obj !== 'undefined' && obj !== null
}

function isFunction (obj) {
  return typeof obj === 'function'
}

function isString (obj) {
  return typeof obj === 'string'
}

function isBoolean (obj) {
  return typeof obj === 'boolean'
}

function hasOwnProperty (o, k) {
  return Object.prototype.hasOwnProperty.call(o, k)
}

function request (url, method) {
  if ( method === void 0 ) method = 'GET';

  var request = new window.XMLHttpRequest();
  var data = {};
  var p = {
    then: function (fn1, fn2) { return p.done(fn1).fail(fn2); },
    catch: function (fn) { return p.fail(fn); },
    always: function (fn) { return p.done(fn).fail(fn); }
  };
  var statuses = ['done', 'fail'];
  statuses.forEach(function (name) {
    data[name] = [];
    p[name] = function (fn) {
      if (fn instanceof Function) { data[name].push(fn); }
      return p
    };
  });
  p.done(JSON.parse);
  request.onreadystatechange = function () {
    if (request.readyState === 4) {
      var e = { status: request.status };
      if (request.status === 200) {
        var response = request.responseText;
        for (var i in data.done) {
          /* istanbul ignore else */
          if (hasOwnProperty(data.done, i) && isFunction(data.done[i])) {
            var value = data.done[i](response);
            if (isExist(value)) {
              response = value;
            }
          }
        }
      } else {
        data.fail.forEach(function (fail) { return fail(e); });
      }
    }
  };
  request.open(method, url);
  request.setRequestHeader('Accept', 'application/json');
  request.send();
  return p
}

var EVENTS = {
  MOUSE_ENTER: 'mouseenter',
  MOUSE_LEAVE: 'mouseleave',
  MOUSE_DOWN: 'mousedown',
  MOUSE_UP: 'mouseup',
  FOCUS: 'focus',
  BLUR: 'blur',
  CLICK: 'click',
  INPUT: 'input',
  KEY_DOWN: 'keydown',
  KEY_UP: 'keyup',
  KEY_PRESS: 'keypress',
  RESIZE: 'resize',
  SCROLL: 'scroll',
  TOUCH_START: 'touchstart',
  TOUCH_END: 'touchend'
};

function on (element, event, handler) {
  /* istanbul ignore next */
  element.addEventListener(event, handler);
}

function off (element, event, handler) {
  /* istanbul ignore next */
  element.removeEventListener(event, handler);
}

function isElement (el) {
  return el && el.nodeType === Node.ELEMENT_NODE
}

function ensureElementMatchesFunction () {
  /* istanbul ignore next */
  if (!Element.prototype.matches) {
    Element.prototype.matches =
      Element.prototype.matchesSelector ||
      Element.prototype.mozMatchesSelector ||
      Element.prototype.msMatchesSelector ||
      Element.prototype.oMatchesSelector ||
      Element.prototype.webkitMatchesSelector ||
      function (s) {
        var matches = (this.document || this.ownerDocument).querySelectorAll(s);
        var i = matches.length;
        // eslint-disable-next-line no-empty
        while (--i >= 0 && matches.item(i) !== this) {}
        return i > -1
      };
  }
}

function setDropdownPosition (dropdown, trigger, options) {
  if ( options === void 0 ) options = {};

  var doc = document.documentElement;
  var containerScrollLeft = (window.pageXOffset || doc.scrollLeft) - (doc.clientLeft || 0);
  var containerScrollTop = (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0);
  var rect = trigger.getBoundingClientRect();
  var dropdownRect = dropdown.getBoundingClientRect();
  dropdown.style.right = 'auto';
  dropdown.style.bottom = 'auto';
  if (options.menuRight) {
    dropdown.style.left = containerScrollLeft + rect.left + rect.width - dropdownRect.width + 'px';
  } else {
    dropdown.style.left = containerScrollLeft + rect.left + 'px';
  }
  if (options.dropup) {
    dropdown.style.top = containerScrollTop + rect.top - dropdownRect.height - 4 + 'px';
  } else {
    dropdown.style.top = containerScrollTop + rect.top + rect.height + 'px';
  }
}

function focus (el) {
  if (!isElement(el)) {
    return
  }
  el.getAttribute('tabindex') ? null : el.setAttribute('tabindex', '-1');
  el.focus();
}

function getElementBySelectorOrRef (q) {
  if (isString(q)) { // is selector
    return document.querySelector(q)
  } else if (isElement(q)) { // is element
    return q
  } else if (isElement(q.$el)) { // is component
    return q.$el
  } else {
    return null
  }
}

var DEFAULT_TAG = 'div';

var Dropdown = {
  render: function render (h) {
    return h(
      this.tag,
      {
        class: {
          'btn-group': this.tag === DEFAULT_TAG,
          dropdown: !this.dropup,
          dropup: this.dropup,
          open: this.show
        }
      },
      [
        this.$slots.default,
        h(
          'ul',
          {
            class: {
              'dropdown-menu': true,
              'dropdown-menu-right': this.menuRight
            },
            ref: 'dropdown'
          },
          [this.$slots.dropdown]
        )
      ]
    )
  },
  props: {
    tag: {
      type: String,
      default: DEFAULT_TAG
    },
    appendToBody: {
      type: Boolean,
      default: false
    },
    value: Boolean,
    dropup: {
      type: Boolean,
      default: false
    },
    menuRight: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    notCloseElements: Array,
    positionElement: null
  },
  data: function data () {
    return {
      show: false,
      triggerEl: undefined
    }
  },
  watch: {
    value: function value (v) {
      this.toggle(v);
    }
  },
  mounted: function mounted () {
    this.initTrigger();
    if (this.triggerEl) {
      on(this.triggerEl, EVENTS.CLICK, this.toggle);
      on(this.triggerEl, EVENTS.KEY_DOWN, this.onKeyPress);
    }
    on(this.$refs.dropdown, EVENTS.KEY_DOWN, this.onKeyPress);
    on(window, EVENTS.CLICK, this.windowClicked);
    on(window, EVENTS.TOUCH_END, this.windowClicked);
    if (this.value) {
      this.toggle(true);
    }
  },
  beforeDestroy: function beforeDestroy () {
    this.removeDropdownFromBody();
    if (this.triggerEl) {
      off(this.triggerEl, EVENTS.CLICK, this.toggle);
      off(this.triggerEl, EVENTS.KEY_DOWN, this.onKeyPress);
    }
    off(this.$refs.dropdown, EVENTS.KEY_DOWN, this.onKeyPress);
    off(window, EVENTS.CLICK, this.windowClicked);
    off(window, EVENTS.TOUCH_END, this.windowClicked);
  },
  methods: {
    getFocusItem: function getFocusItem () {
      var dropdownEl = this.$refs.dropdown;
      /* istanbul ignore next */
      return dropdownEl.querySelector('li > a:focus')
    },
    onKeyPress: function onKeyPress (event) {
      if (this.show) {
        var dropdownEl = this.$refs.dropdown;
        var keyCode = event.keyCode;
        if (keyCode === 27) {
          // esc
          this.toggle(false);
          this.triggerEl && this.triggerEl.focus();
        } else if (keyCode === 13) {
          // enter
          var currentFocus = this.getFocusItem();
          currentFocus && currentFocus.click();
        } else if (keyCode === 38 || keyCode === 40) {
          // up || down
          event.preventDefault();
          event.stopPropagation();
          var currentFocus$1 = this.getFocusItem();
          var items = dropdownEl.querySelectorAll('li:not(.disabled) > a');
          if (!currentFocus$1) {
            focus(items[0]);
          } else {
            for (var i = 0; i < items.length; i++) {
              if (currentFocus$1 === items[i]) {
                if (keyCode === 38 && i < items.length > 0) {
                  focus(items[i - 1]);
                } else if (keyCode === 40 && i < items.length - 1) {
                  focus(items[i + 1]);
                }
                break
              }
            }
          }
        }
      }
    },
    initTrigger: function initTrigger () {
      var trigger = this.$el.querySelector('[data-role="trigger"]') || this.$el.querySelector('.dropdown-toggle') || this.$el.firstChild;
      this.triggerEl = trigger && trigger !== this.$refs.dropdown ? trigger : null;
    },
    toggle: function toggle (show) {
      if (this.disabled) {
        return
      }
      if (isBoolean(show)) {
        this.show = show;
      } else {
        this.show = !this.show;
      }
      if (this.appendToBody) {
        this.show ? this.appendDropdownToBody() : this.removeDropdownFromBody();
      }
      this.$emit('input', this.show);
    },
    windowClicked: function windowClicked (event) {
      var target = event.target;
      if (this.show && target) {
        var targetInNotCloseElements = false;
        if (this.notCloseElements) {
          for (var i = 0, l = this.notCloseElements.length; i < l; i++) {
            var isTargetInElement = this.notCloseElements[i].contains(target);
            var shouldBreak = isTargetInElement;
            /* istanbul ignore else */
            if (this.appendToBody) {
              var isTargetInDropdown = this.$refs.dropdown.contains(target);
              var isElInElements = this.notCloseElements.indexOf(this.$el) >= 0;
              shouldBreak = isTargetInElement || (isTargetInDropdown && isElInElements);
            }
            if (shouldBreak) {
              targetInNotCloseElements = true;
              break
            }
          }
        }
        var targetInDropdownBody = this.$refs.dropdown.contains(target);
        var targetInTrigger = this.$el.contains(target) && !targetInDropdownBody;
        // normally, a dropdown select event is handled by @click that trigger after @touchend
        // then @touchend event have to be ignore in this case
        var targetInDropdownAndIsTouchEvent = targetInDropdownBody && event.type === 'touchend';
        if (!targetInTrigger && !targetInNotCloseElements && !targetInDropdownAndIsTouchEvent) {
          this.toggle(false);
        }
      }
    },
    appendDropdownToBody: function appendDropdownToBody () {
      try {
        var el = this.$refs.dropdown;
        el.style.display = 'block';
        document.body.appendChild(el);
        var positionElement = this.positionElement || this.$el;
        setDropdownPosition(el, positionElement, this);
      } catch (e) {
        // Silent
      }
    },
    removeDropdownFromBody: function removeDropdownFromBody () {
      try {
        var el = this.$refs.dropdown;
        el.removeAttribute('style');
        this.$el.appendChild(el);
      } catch (e) {
        // Silent
      }
    }
  }
};

var script = {
  components: { Dropdown: Dropdown },
  props: {
    value: {
      required: true
    },
    data: Array,
    itemKey: String,
    appendToBody: {
      type: Boolean,
      default: false
    },
    ignoreCase: {
      type: Boolean,
      default: true
    },
    matchStart: {
      type: Boolean,
      default: false
    },
    forceSelect: {
      type: Boolean,
      default: false
    },
    forceClear: {
      type: Boolean,
      default: false
    },
    limit: {
      type: Number,
      default: 10
    },
    asyncSrc: String,
    asyncKey: String,
    asyncFunction: Function,
    debounce: {
      type: Number,
      default: 200
    },
    openOnFocus: {
      type: Boolean,
      default: true
    },
    openOnEmpty: {
      type: Boolean,
      default: false
    },
    target: {
      required: true
    },
    preselect: {
      type: Boolean,
      default: true
    }
  },
  data: function data () {
    return {
      inputEl: null,
      items: [],
      activeIndex: 0,
      timeoutID: 0,
      elements: [],
      open: false,
      dropdownMenuEl: null
    }
  },
  computed: {
    regexOptions: function regexOptions () {
      var options = '';
      if (this.ignoreCase) {
        options += 'i';
      }
      if (!this.matchStart) {
        options += 'g';
      }
      return options
    }
  },
  mounted: function mounted () {
    var this$1 = this;

    ensureElementMatchesFunction();
    this.$nextTick(function () {
      this$1.initInputElByTarget(this$1.target);
      this$1.initListeners();
      this$1.dropdownMenuEl = this$1.$refs.dropdown.$el.querySelector('.dropdown-menu');
      // set input text if v-model not empty
      if (this$1.value) {
        this$1.setInputTextByValue(this$1.value);
      }
    });
  },
  beforeDestroy: function beforeDestroy () {
    this.removeListeners();
  },
  watch: {
    target: function target (el) {
      this.removeListeners();
      this.initInputElByTarget(el);
      this.initListeners();
    },
    value: function value (value$1) {
      this.setInputTextByValue(value$1);
    }
  },
  methods: {
    setInputTextByValue: function setInputTextByValue (value) {
      if (isString(value)) {
        // direct
        this.inputEl.value = value;
      } else if (value) {
        // is object
        this.inputEl.value = this.itemKey ? value[this.itemKey] : value;
      } else if (value === null) {
        // is null or undefined or something else not valid
        this.inputEl.value = '';
      }
    },
    hasEmptySlot: function hasEmptySlot () {
      return !!this.$slots.empty || !!this.$scopedSlots.empty
    },
    initInputElByTarget: function initInputElByTarget (target) {
      if (!target) {
        return
      }
      this.inputEl = getElementBySelectorOrRef(target);
    },
    initListeners: function initListeners () {
      if (this.inputEl) {
        this.elements = [this.inputEl];
        on(this.inputEl, EVENTS.FOCUS, this.inputFocused);
        on(this.inputEl, EVENTS.BLUR, this.inputBlured);
        on(this.inputEl, EVENTS.INPUT, this.inputChanged);
        on(this.inputEl, EVENTS.KEY_DOWN, this.inputKeyPressed);
      }
    },
    removeListeners: function removeListeners () {
      this.elements = [];
      if (this.inputEl) {
        off(this.inputEl, EVENTS.FOCUS, this.inputFocused);
        off(this.inputEl, EVENTS.BLUR, this.inputBlured);
        off(this.inputEl, EVENTS.INPUT, this.inputChanged);
        off(this.inputEl, EVENTS.KEY_DOWN, this.inputKeyPressed);
      }
    },
    prepareItems: function prepareItems (data, disableFilters) {
      if ( disableFilters === void 0 ) disableFilters = false;

      if (disableFilters) {
        this.items = data.slice(0, this.limit);
        return
      }
      this.items = [];
      this.activeIndex = this.preselect ? 0 : -1;
      for (var i = 0, l = data.length; i < l; i++) {
        var item = data[i];
        var key = this.itemKey ? item[this.itemKey] : item;
        key = key.toString();
        var index = -1;
        if (this.ignoreCase) {
          index = key.toLowerCase().indexOf(this.inputEl.value.toLowerCase());
        } else {
          index = key.indexOf(this.inputEl.value);
        }
        if (this.matchStart ? index === 0 : index >= 0) {
          this.items.push(item);
        }
        if (this.items.length >= this.limit) {
          break
        }
      }
    },
    fetchItems: function fetchItems (value, debounce) {
      var this$1 = this;

      clearTimeout(this.timeoutID);
      if (value === '' && !this.openOnEmpty) {
        this.open = false;
      } else if (this.data) {
        this.prepareItems(this.data);
        this.open = this.hasEmptySlot() || Boolean(this.items.length);
      } else if (this.asyncSrc) {
        this.timeoutID = setTimeout(function () {
          this$1.$emit('loading');
          request(this$1.asyncSrc + encodeURIComponent(value))
            .then(function (data) {
              if (this$1.inputEl.matches(':focus')) {
                this$1.prepareItems(this$1.asyncKey ? data[this$1.asyncKey] : data, true);
                this$1.open = this$1.hasEmptySlot() || Boolean(this$1.items.length);
              }
              this$1.$emit('loaded');
            })
            .catch(function (err) {
              console.error(err);
              this$1.$emit('loaded-error');
            });
        }, debounce);
      } else if (this.asyncFunction) {
        var cb = function (data) {
          if (this$1.inputEl.matches(':focus')) {
            this$1.prepareItems(data, true);
            this$1.open = this$1.hasEmptySlot() || Boolean(this$1.items.length);
          }
          this$1.$emit('loaded');
        };
        this.timeoutID = setTimeout(function () {
          this$1.$emit('loading');
          this$1.asyncFunction(value, cb);
        }, debounce);
      }
    },
    inputChanged: function inputChanged () {
      var value = this.inputEl.value;
      this.fetchItems(value, this.debounce);
      this.$emit('input', this.forceSelect ? undefined : value);
    },
    inputFocused: function inputFocused () {
      if (this.openOnFocus) {
        var value = this.inputEl.value;
        this.fetchItems(value, 0);
      }
    },
    inputBlured: function inputBlured () {
      var this$1 = this;

      if (!this.dropdownMenuEl.matches(':hover')) {
        this.open = false;
      }
      if (this.inputEl && this.forceClear) {
        this.$nextTick(function () {
          if (typeof this$1.value === 'undefined') {
            this$1.inputEl.value = '';
          }
        });
      }
    },
    inputKeyPressed: function inputKeyPressed (event) {
      event.stopPropagation();
      if (this.open) {
        switch (event.keyCode) {
          case 13:
            if (this.activeIndex >= 0) {
              this.selectItem(this.items[this.activeIndex]);
            } else {
              this.open = false;
            }
            event.preventDefault();
            break
          case 27:
            this.open = false;
            break
          case 38:
            this.activeIndex = this.activeIndex > 0 ? this.activeIndex - 1 : 0;
            break
          case 40: {
            var maxIndex = this.items.length - 1;
            this.activeIndex = this.activeIndex < maxIndex ? this.activeIndex + 1 : maxIndex;
            break
          }
        }
      }
    },
    selectItem: function selectItem (item) {
      this.$emit('input', item);
      this.open = false;
    },
    highlight: function highlight (item) {
      var value = this.itemKey ? item[this.itemKey] : item;
      var inputValue = this.inputEl.value.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
      return value.replace(new RegExp(("" + inputValue), this.regexOptions), '<b>$&</b>')
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
    var options = typeof script === 'function' ? script.options : script;
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
    var hook;
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
            var originalRender = options.render;
            options.render = function renderWithStyleInjection(h, context) {
                hook.call(context);
                return originalRender(h, context);
            };
        }
        else {
            // inject component registration as beforeCreate hook
            var existing = options.beforeCreate;
            options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
        }
    }
    return script;
}

/* script */
var __vue_script__ = script;

/* template */
var __vue_render__ = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "dropdown",
    {
      ref: "dropdown",
      attrs: {
        tag: "section",
        "append-to-body": _vm.appendToBody,
        "not-close-elements": _vm.elements,
        "position-element": _vm.inputEl
      },
      model: {
        value: _vm.open,
        callback: function($$v) {
          _vm.open = $$v;
        },
        expression: "open"
      }
    },
    [
      _c(
        "template",
        { slot: "dropdown" },
        [
          _vm._t(
            "item",
            _vm._l(_vm.items, function(item, index) {
              return _c(
                "li",
                { class: { active: _vm.activeIndex === index } },
                [
                  _c(
                    "a",
                    {
                      attrs: { href: "#" },
                      on: {
                        click: function($event) {
                          $event.preventDefault();
                          return _vm.selectItem(item)
                        }
                      }
                    },
                    [
                      _c("span", {
                        domProps: { innerHTML: _vm._s(_vm.highlight(item)) }
                      })
                    ]
                  )
                ]
              )
            }),
            {
              items: _vm.items,
              activeIndex: _vm.activeIndex,
              select: _vm.selectItem,
              highlight: _vm.highlight
            }
          ),
          _vm._v(" "),
          !_vm.items || _vm.items.length === 0 ? _vm._t("empty") : _vm._e()
        ],
        2
      )
    ],
    2
  )
};
var __vue_staticRenderFns__ = [];
__vue_render__._withStripped = true;

  /* style */
  var __vue_inject_styles__ = undefined;
  /* scoped */
  var __vue_scope_id__ = undefined;
  /* module identifier */
  var __vue_module_identifier__ = undefined;
  /* functional template */
  var __vue_is_functional_template__ = false;
  /* style inject */
  
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  var __vue_component__ = /*#__PURE__*/normalizeComponent(
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

export default __vue_component__;
//# sourceMappingURL=Typeahead.js.map
