import { openBlock, createElementBlock, normalizeClass, renderSlot, resolveComponent, createBlock, withCtx, createElementVNode, withModifiers, createCommentVNode, createTextVNode, toDisplayString, createVNode } from 'vue';

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign#Polyfill
function assign(target, varArgs) {
  var arguments$1 = arguments;

  if (target === null || target === undefined) {
    throw new TypeError('Cannot convert undefined or null to object')
  }
  var to = Object(target);
  for (var index = 1; index < arguments.length; index++) {
    var nextSource = arguments$1[index];
    if (nextSource !== null && nextSource !== undefined) {
      for (var nextKey in nextSource) {
        // Avoid bugs when hasOwnProperty is shadowed
        /* istanbul ignore else */
        if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
          to[nextKey] = nextSource[nextKey];
        }
      }
    }
  }
  return to
}

function isExist(obj) {
  return typeof obj !== 'undefined' && obj !== null
}

function isFunction(obj) {
  return typeof obj === 'function'
}

function isPromiseSupported() {
  return typeof window !== 'undefined' && isExist(window.Promise)
}

var defaultLang = {
  uiv: {
    datePicker: {
      clear: 'Clear',
      today: 'Today',
      month: 'Month',
      month1: 'January',
      month2: 'February',
      month3: 'March',
      month4: 'April',
      month5: 'May',
      month6: 'June',
      month7: 'July',
      month8: 'August',
      month9: 'September',
      month10: 'October',
      month11: 'November',
      month12: 'December',
      year: 'Year',
      week1: 'Mon',
      week2: 'Tue',
      week3: 'Wed',
      week4: 'Thu',
      week5: 'Fri',
      week6: 'Sat',
      week7: 'Sun',
    },
    timePicker: {
      am: 'AM',
      pm: 'PM',
    },
    modal: {
      cancel: 'Cancel',
      ok: 'OK',
    },
    multiSelect: {
      placeholder: 'Select...',
      filterPlaceholder: 'Search...',
    },
  },
};

var lang = defaultLang;

var i18nHandler = function () {
  if ('$t' in this) {
    return this.$t.apply(this, arguments)
  }
  return null
};

var t = function (path, options) {
  options = options || {};
  var value;
  try {
    value = i18nHandler.apply(this, arguments);
    /* istanbul ignore next */
    if (isExist(value) && !options.$$locale) {
      return value
    }
  } catch (e) {
    // ignore
  }
  var array = path.split('.');
  var current = options.$$locale || lang;

  for (var i = 0, j = array.length; i < j; i++) {
    var property = array[i];
    value = current[property];
    if (i === j - 1) { return value }
    if (!value) { return '' }
    current = value;
  }
  /* istanbul ignore next */
  return ''
};

var Local = {
  methods: {
    t: function t$1() {
      var arguments$1 = arguments;

      var args = [];
      for (var i = 0; i < arguments.length; ++i) {
        args.push(arguments$1[i]);
      }
      args[1] = assign({}, { $$locale: this.locale }, args[1]);
      return t.apply(this, args)
    },
  },
  props: {
    locale: Object,
  },
};

var linkMixin = {
  props: {
    // <a> props
    href: String,
    target: String,
    // <router-link> props
    to: null,
    replace: {
      type: Boolean,
      default: false,
    },
    append: {
      type: Boolean,
      default: false,
    },
    exact: {
      type: Boolean,
      default: false,
    },
  },
};

var script$2 = {
  props: {
    size: { type: String, default: undefined },
    vertical: {
      type: Boolean,
      default: false,
    },
    justified: {
      type: Boolean,
      default: false,
    },
  },
};

function render$2(_ctx, _cache, $props, $setup, $data, $options) {
  var obj;

  return (openBlock(), createElementBlock("div", {
    class: normalizeClass(( obj = {
      'btn-group': !$props.vertical,
      'btn-group-vertical': $props.vertical,
      'btn-group-justified': $props.justified
    }, obj[("btn-group-" + ($props.size))] = $props.size, obj )),
    role: "group",
    "data-toggle": "buttons"
  }, [
    renderSlot(_ctx.$slots, "default")
  ], 2 /* CLASS */))
}

script$2.render = render$2;
script$2.__file = "src/components/button/BtnGroup.vue";

var INPUT_TYPE_CHECKBOX = 'checkbox';
var INPUT_TYPE_RADIO = 'radio';

var script$1 = {
  components: { BtnGroup: script$2 },
  mixins: [linkMixin],
  props: {
    justified: {
      type: Boolean,
      default: false,
    },
    type: {
      type: String,
      default: 'default',
    },
    nativeType: {
      type: String,
      default: 'button',
    },
    size: {
      type: String,
      default: undefined,
    },
    block: {
      type: Boolean,
      default: false,
    },
    active: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    // <input> props
    modelValue: {
      type: null,
      default: null,
    },
    inputValue: {
      type: null,
      default: null,
    },
    inputType: {
      type: String,
      validator: function validator(value) {
        return value === INPUT_TYPE_CHECKBOX || value === INPUT_TYPE_RADIO
      },
      default: undefined,
    },
  },
  emits: ['update:modelValue'],
  computed: {
    isInputActive: function isInputActive() {
      return this.inputType === INPUT_TYPE_CHECKBOX
        ? this.modelValue.indexOf(this.inputValue) >= 0
        : this.modelValue === this.inputValue
    },
    classes: function classes() {
      var obj;

      return ( obj = {
        btn: true,
        active: this.inputType ? this.isInputActive : this.active,
        disabled: this.disabled,
        'btn-block': this.block
      }, obj[("btn-" + (this.type))] = Boolean(this.type), obj[("btn-" + (this.size))] = Boolean(this.size), obj )
    },
  },
  methods: {
    onClick: function onClick(e) {
      if (this.disabled && e instanceof Event) {
        e.preventDefault();
        e.stopPropagation();
      }
    },
    onInputChange: function onInputChange() {
      if (this.inputType === INPUT_TYPE_CHECKBOX) {
        var valueCopied = this.modelValue.slice();
        if (this.isInputActive) {
          valueCopied.splice(valueCopied.indexOf(this.inputValue), 1);
        } else {
          valueCopied.push(this.inputValue);
        }
        this.$emit('update:modelValue', valueCopied);
      } else {
        this.$emit('update:modelValue', this.inputValue);
      }
    },
  },
};

var _hoisted_1$1 = ["href", "target"];
var _hoisted_2$1 = ["type", "checked", "disabled"];
var _hoisted_3$1 = ["type", "disabled"];
var _hoisted_4$1 = ["type", "disabled"];

function render$1(_ctx, _cache, $props, $setup, $data, $options) {
  var _component_router_link = resolveComponent("router-link");
  var _component_BtnGroup = resolveComponent("BtnGroup");

  return (_ctx.href)
    ? (openBlock(), createElementBlock("a", {
        key: 0,
        href: _ctx.href,
        target: _ctx.target,
        role: "button",
        class: normalizeClass($options.classes),
        onClick: _cache[0] || (_cache[0] = function () {
          var args = [], len = arguments.length;
          while ( len-- ) args[ len ] = arguments[ len ];

          return ($options.onClick && $options.onClick.apply($options, args));
  })
      }, [
        renderSlot(_ctx.$slots, "default")
      ], 10 /* CLASS, PROPS */, _hoisted_1$1))
    : (_ctx.to)
      ? (openBlock(), createBlock(_component_router_link, {
          key: 1,
          to: _ctx.to,
          class: normalizeClass($options.classes),
          event: $props.disabled ? '' : 'click',
          replace: _ctx.replace,
          append: _ctx.append,
          exact: _ctx.exact,
          role: "button",
          onClick: $options.onClick
        }, {
          default: withCtx(function () { return [
            renderSlot(_ctx.$slots, "default")
          ]; }),
          _: 3 /* FORWARDED */
        }, 8 /* PROPS */, ["to", "class", "event", "replace", "append", "exact", "onClick"]))
      : ($props.inputType)
        ? (openBlock(), createElementBlock("label", {
            key: 2,
            class: normalizeClass($options.classes),
            onClick: _cache[3] || (_cache[3] = function () {
              var args = [], len = arguments.length;
              while ( len-- ) args[ len ] = arguments[ len ];

              return ($options.onClick && $options.onClick.apply($options, args));
  })
          }, [
            createElementVNode("input", {
              autocomplete: "off",
              type: $props.inputType,
              checked: $options.isInputActive,
              disabled: $props.disabled,
              onInput: _cache[1] || (_cache[1] = withModifiers(function () {}, ["stop"])),
              onChange: _cache[2] || (_cache[2] = function () {
                var args = [], len = arguments.length;
                while ( len-- ) args[ len ] = arguments[ len ];

                return ($options.onInputChange && $options.onInputChange.apply($options, args));
  })
            }, null, 40 /* PROPS, HYDRATE_EVENTS */, _hoisted_2$1),
            renderSlot(_ctx.$slots, "default")
          ], 2 /* CLASS */))
        : ($props.justified)
          ? (openBlock(), createBlock(_component_BtnGroup, { key: 3 }, {
              default: withCtx(function () { return [
                createElementVNode("button", {
                  class: normalizeClass($options.classes),
                  type: $props.nativeType,
                  disabled: $props.disabled,
                  onClick: _cache[4] || (_cache[4] = function () {
                    var args = [], len = arguments.length;
                    while ( len-- ) args[ len ] = arguments[ len ];

                    return ($options.onClick && $options.onClick.apply($options, args));
                })
                }, [
                  renderSlot(_ctx.$slots, "default")
                ], 10 /* CLASS, PROPS */, _hoisted_3$1)
              ]; }),
              _: 3 /* FORWARDED */
            }))
          : (openBlock(), createElementBlock("button", {
              key: 4,
              class: normalizeClass($options.classes),
              type: $props.nativeType,
              disabled: $props.disabled,
              onClick: _cache[5] || (_cache[5] = function () {
                var args = [], len = arguments.length;
                while ( len-- ) args[ len ] = arguments[ len ];

                return ($options.onClick && $options.onClick.apply($options, args));
  })
            }, [
              renderSlot(_ctx.$slots, "default")
            ], 10 /* CLASS, PROPS */, _hoisted_4$1))
}

script$1.render = render$1;
script$1.__file = "src/components/button/Btn.vue";

function nodeListToArray(nodeList) {
  return Array.prototype.slice.call(nodeList || [])
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
  TOUCH_END: 'touchend',
};

function isIE11() {
  /* istanbul ignore next */
  return !!window.MSInputMethodContext && !!document.documentMode
}

function isIE10() {
  return window.navigator.appVersion.indexOf('MSIE 10') !== -1
}

function getComputedStyle(el) {
  return window.getComputedStyle(el)
}

function getViewportSize() {
  /* istanbul ignore next */
  var width =
    Math.max(document.documentElement.clientWidth, window.innerWidth) || 0;
  /* istanbul ignore next */
  var height =
    Math.max(document.documentElement.clientHeight, window.innerHeight) || 0;
  return { width: width, height: height }
}

var scrollbarWidth = null;
var savedScreenSize = null;

function getScrollbarWidth(recalculate) {
  if ( recalculate === void 0 ) recalculate = false;

  var screenSize = getViewportSize();
  // return directly when already calculated & not force recalculate & screen size not changed
  if (
    scrollbarWidth !== null &&
    !recalculate &&
    screenSize.height === savedScreenSize.height &&
    screenSize.width === savedScreenSize.width
  ) {
    return scrollbarWidth
  }
  /* istanbul ignore next */
  if (document.readyState === 'loading') {
    return null
  }
  var div1 = document.createElement('div');
  var div2 = document.createElement('div');
  div1.style.width =
    div2.style.width =
    div1.style.height =
    div2.style.height =
      '100px';
  div1.style.overflow = 'scroll';
  div2.style.overflow = 'hidden';
  document.body.appendChild(div1);
  document.body.appendChild(div2);
  scrollbarWidth = Math.abs(div1.scrollHeight - div2.scrollHeight);
  document.body.removeChild(div1);
  document.body.removeChild(div2);
  // save new screen size
  savedScreenSize = screenSize;
  return scrollbarWidth
}

function on(element, event, handler) {
  /* istanbul ignore next */
  element.addEventListener(event, handler);
}

function off(element, event, handler) {
  /* istanbul ignore next */
  element.removeEventListener(event, handler);
}

function isElement(el) {
  return el && el.nodeType === Node.ELEMENT_NODE
}

function removeFromDom(el) {
  isElement(el) && isElement(el.parentNode) && el.parentNode.removeChild(el);
}

function addClass(el, className) {
  if (!isElement(el)) {
    return
  }
  if (el.className) {
    var classes = el.className.split(' ');
    if (classes.indexOf(className) < 0) {
      classes.push(className);
      el.className = classes.join(' ');
    }
  } else {
    el.className = className;
  }
}

function removeClass(el, className) {
  if (!isElement(el)) {
    return
  }
  if (el.className) {
    var classes = el.className.split(' ');
    var newClasses = [];
    for (var i = 0, l = classes.length; i < l; i++) {
      if (classes[i] !== className) {
        newClasses.push(classes[i]);
      }
    }
    el.className = newClasses.join(' ');
  }
}

function hasScrollbar(el) {
  var SCROLL = 'scroll';
  var hasVScroll = el.scrollHeight > el.clientHeight;
  var style = getComputedStyle(el);
  return hasVScroll || style.overflow === SCROLL || style.overflowY === SCROLL
}

function toggleBodyOverflow(enable) {
  var MODAL_OPEN = 'modal-open';
  var FIXED_CONTENT = '.navbar-fixed-top, .navbar-fixed-bottom';
  var body = document.body;
  if (enable) {
    removeClass(body, MODAL_OPEN);
    body.style.paddingRight = null;
    nodeListToArray(document.querySelectorAll(FIXED_CONTENT)).forEach(
      function (node) {
        node.style.paddingRight = null;
      }
    );
  } else {
    var browsersWithFloatingScrollbar = isIE10() || isIE11();
    var documentHasScrollbar =
      hasScrollbar(document.documentElement) || hasScrollbar(document.body);
    if (documentHasScrollbar && !browsersWithFloatingScrollbar) {
      var scrollbarWidth = getScrollbarWidth();
      body.style.paddingRight = scrollbarWidth + "px";
      nodeListToArray(document.querySelectorAll(FIXED_CONTENT)).forEach(
        function (node) {
          node.style.paddingRight = scrollbarWidth + "px";
        }
      );
    }
    addClass(body, MODAL_OPEN);
  }
}

var MODAL_BACKDROP = 'modal-backdrop';

function getOpenModals() {
  return document.querySelectorAll(("." + MODAL_BACKDROP))
}

function getOpenModalNum() {
  return getOpenModals().length
}

var IN = 'in';

var script = {
  components: { Btn: script$1 },
  mixins: [Local],
  props: {
    modelValue: {
      type: Boolean,
      default: false,
    },
    title: { type: String, default: undefined },
    size: { type: String, default: undefined },
    backdrop: {
      type: Boolean,
      default: true,
    },
    footer: {
      type: Boolean,
      default: true,
    },
    header: {
      type: Boolean,
      default: true,
    },
    cancelText: { type: String, default: undefined },
    cancelType: {
      type: String,
      default: 'default',
    },
    okText: { type: String, default: undefined },
    okType: {
      type: String,
      default: 'primary',
    },
    dismissBtn: {
      type: Boolean,
      default: true,
    },
    transition: {
      type: Number,
      default: 150,
    },
    autoFocus: {
      type: Boolean,
      default: false,
    },
    keyboard: {
      type: Boolean,
      default: true,
    },
    beforeClose: { type: Function, default: undefined },
    zOffset: {
      type: Number,
      default: 20,
    },
    appendToBody: {
      type: Boolean,
      default: false,
    },
    displayStyle: {
      type: String,
      default: 'block',
    },
  },
  emits: ['update:modelValue', 'show', 'hide'],
  data: function data() {
    return {
      msg: '',
    }
  },
  computed: {
    modalSizeClass: function modalSizeClass() {
      var obj;

      return ( obj = {}, obj[("modal-" + (this.size))] = Boolean(this.size), obj )
    },
  },
  watch: {
    modelValue: function modelValue(v) {
      this.$toggle(v);
    },
  },
  mounted: function mounted() {
    removeFromDom(this.$refs.backdrop);
    on(window, EVENTS.MOUSE_DOWN, this.suppressBackgroundClose);
    on(window, EVENTS.KEY_UP, this.onKeyPress);
    if (this.modelValue) {
      this.$toggle(true);
    }
  },
  beforeUnmount: function beforeUnmount() {
    clearTimeout(this.timeoutId);
    removeFromDom(this.$refs.backdrop);
    removeFromDom(this.$el);
    if (getOpenModalNum() === 0) {
      toggleBodyOverflow(true);
    }
    off(window, EVENTS.MOUSE_DOWN, this.suppressBackgroundClose);
    off(window, EVENTS.MOUSE_UP, this.unsuppressBackgroundClose);
    off(window, EVENTS.KEY_UP, this.onKeyPress);
  },
  methods: {
    onKeyPress: function onKeyPress(event) {
      if (this.keyboard && this.modelValue && event.keyCode === 27) {
        var thisModal = this.$refs.backdrop;
        var thisZIndex = thisModal.style.zIndex;
        thisZIndex =
          thisZIndex && thisZIndex !== 'auto' ? parseInt(thisZIndex) : 0;
        // Find out if this modal is the top most one.
        var modals = getOpenModals();
        var modalsLength = modals.length;
        for (var i = 0; i < modalsLength; i++) {
          if (modals[i] !== thisModal) {
            var zIndex = modals[i].style.zIndex;
            zIndex = zIndex && zIndex !== 'auto' ? parseInt(zIndex) : 0;
            // if any existing modal has higher zIndex, ignore
            if (zIndex > thisZIndex) {
              return
            }
          }
        }
        this.toggle(false);
      }
    },
    toggle: function toggle(show, msg) {
      var this$1$1 = this;

      var shouldClose = true;
      if (isFunction(this.beforeClose)) {
        shouldClose = this.beforeClose(msg);
      }

      if (isPromiseSupported()) {
        // Skip the hiding when beforeClose returning falsely value or returned Promise resolves to falsely value
        // Use Promise.resolve to accept both Boolean values and Promises
        Promise.resolve(shouldClose).then(function (shouldClose) {
          // Skip the hiding while show===false
          if (!show && shouldClose) {
            this$1$1.msg = msg;
            this$1$1.$emit('update:modelValue', show);
          }
        });
      } else {
        // Fallback to old version if promise is not supported
        // skip the hiding while show===false & beforeClose returning falsely value
        if (!show && !shouldClose) {
          return
        }

        this.msg = msg;
        this.$emit('update:modelValue', show);
      }
    },
    $toggle: function $toggle(show) {
      var this$1$1 = this;

      var modal = this.$el;
      var backdrop = this.$refs.backdrop;
      clearTimeout(this.timeoutId);
      if (show) {
        // If two modals share the same v-if condition the calculated z-index is incorrect,
        // resulting in popover misbehaviour.
        // solved by adding a nextTick.
        // https://github.com/uiv-lib/uiv/issues/342
        this.$nextTick(function () {
          var alreadyOpenModalNum = getOpenModalNum();
          document.body.appendChild(backdrop);
          if (this$1$1.appendToBody) {
            document.body.appendChild(modal);
          }
          modal.style.display = this$1$1.displayStyle;
          modal.scrollTop = 0;
          backdrop.offsetHeight; // force repaint
          toggleBodyOverflow(false);
          addClass(backdrop, IN);
          addClass(modal, IN);
          // fix z-index for nested modals
          // no need to calculate if no modal is already open
          if (alreadyOpenModalNum > 0) {
            var modalBaseZ = parseInt(getComputedStyle(modal).zIndex) || 1050; // 1050 is default modal z-Index
            var backdropBaseZ =
              parseInt(getComputedStyle(backdrop).zIndex) || 1040; // 1040 is default backdrop z-Index
            var offset = alreadyOpenModalNum * this$1$1.zOffset;
            modal.style.zIndex = "" + (modalBaseZ + offset);
            backdrop.style.zIndex = "" + (backdropBaseZ + offset);
          }
          // z-index fix end
          this$1$1.timeoutId = setTimeout(function () {
            if (this$1$1.autoFocus) {
              var btn = this$1$1.$el.querySelector('[data-action="auto-focus"]');
              if (btn) {
                btn.focus();
              }
            }
            this$1$1.$emit('show');
            this$1$1.timeoutId = 0;
          }, this$1$1.transition);
        });
      } else {
        removeClass(backdrop, IN);
        removeClass(modal, IN);
        this.timeoutId = setTimeout(function () {
          modal.style.display = 'none';
          removeFromDom(backdrop);
          if (this$1$1.appendToBody) {
            removeFromDom(modal);
          }
          if (getOpenModalNum() === 0) {
            toggleBodyOverflow(true);
          }
          this$1$1.$emit('hide', this$1$1.msg || 'dismiss');
          this$1$1.msg = '';
          this$1$1.timeoutId = 0;
          // restore z-index for nested modals
          modal.style.zIndex = '';
          backdrop.style.zIndex = '';
          // z-index fix end
        }, this.transition);
      }
    },
    suppressBackgroundClose: function suppressBackgroundClose(event) {
      if (event && event.target === this.$el) {
        return
      }
      this.isCloseSuppressed = true;
      on(window, 'mouseup', this.unsuppressBackgroundClose);
    },
    unsuppressBackgroundClose: function unsuppressBackgroundClose() {
      var this$1$1 = this;

      if (this.isCloseSuppressed) {
        off(window, 'mouseup', this.unsuppressBackgroundClose);
        setTimeout(function () {
          this$1$1.isCloseSuppressed = false;
        }, 1);
      }
    },
    backdropClicked: function backdropClicked(event) {
      if (this.backdrop && !this.isCloseSuppressed) {
        this.toggle(false);
      }
    },
  },
};

var _hoisted_1 = { class: "modal-content" };
var _hoisted_2 = {
  key: 0,
  class: "modal-header"
};
var _hoisted_3 = /*#__PURE__*/createElementVNode("span", { "aria-hidden": "true" }, "×", -1 /* HOISTED */);
var _hoisted_4 = { class: "modal-title" };
var _hoisted_5 = { class: "modal-body" };
var _hoisted_6 = {
  key: 1,
  class: "modal-footer"
};

function render(_ctx, _cache, $props, $setup, $data, $options) {
  var _component_btn = resolveComponent("btn");

  return (openBlock(), createElementBlock("div", {
    tabindex: "-1",
    role: "dialog",
    class: normalizeClass(["modal", { fade: $props.transition > 0 }]),
    onClick: _cache[3] || (_cache[3] = withModifiers(function () {
      var args = [], len = arguments.length;
      while ( len-- ) args[ len ] = arguments[ len ];

      return ($options.backdropClicked && $options.backdropClicked.apply($options, args));
  }, ["self"]))
  }, [
    createElementVNode("div", {
      ref: "dialog",
      class: normalizeClass(["modal-dialog", $options.modalSizeClass]),
      role: "document"
    }, [
      createElementVNode("div", _hoisted_1, [
        ($props.header)
          ? (openBlock(), createElementBlock("div", _hoisted_2, [
              renderSlot(_ctx.$slots, "header", {}, function () { return [
                ($props.dismissBtn)
                  ? (openBlock(), createElementBlock("button", {
                      key: 0,
                      type: "button",
                      class: "close",
                      "aria-label": "Close",
                      style: {"position":"relative","z-index":"1060"},
                      onClick: _cache[0] || (_cache[0] = function ($event) { return ($options.toggle(false)); })
                    }, [
                      createCommentVNode(" 1060 is bigger than dialog z-index 1050 because it got cover by title sometimes "),
                      _hoisted_3
                    ]))
                  : createCommentVNode("v-if", true),
                createElementVNode("h4", _hoisted_4, [
                  renderSlot(_ctx.$slots, "title", {}, function () { return [
                    createTextVNode(toDisplayString($props.title), 1 /* TEXT */)
                  ]; })
                ])
              ]; })
            ]))
          : createCommentVNode("v-if", true),
        createElementVNode("div", _hoisted_5, [
          renderSlot(_ctx.$slots, "default")
        ]),
        ($props.footer)
          ? (openBlock(), createElementBlock("div", _hoisted_6, [
              renderSlot(_ctx.$slots, "footer", {}, function () { return [
                createVNode(_component_btn, {
                  type: $props.cancelType,
                  onClick: _cache[1] || (_cache[1] = function ($event) { return ($options.toggle(false, 'cancel')); })
                }, {
                  default: withCtx(function () { return [
                    createElementVNode("span", null, toDisplayString($props.cancelText || _ctx.t('uiv.modal.cancel')), 1 /* TEXT */)
                  ]; }),
                  _: 1 /* STABLE */
                }, 8 /* PROPS */, ["type"]),
                createVNode(_component_btn, {
                  type: $props.okType,
                  "data-action": "auto-focus",
                  onClick: _cache[2] || (_cache[2] = function ($event) { return ($options.toggle(false, 'ok')); })
                }, {
                  default: withCtx(function () { return [
                    createElementVNode("span", null, toDisplayString($props.okText || _ctx.t('uiv.modal.ok')), 1 /* TEXT */)
                  ]; }),
                  _: 1 /* STABLE */
                }, 8 /* PROPS */, ["type"])
              ]; })
            ]))
          : createCommentVNode("v-if", true)
      ])
    ], 2 /* CLASS */),
    createElementVNode("div", {
      ref: "backdrop",
      class: normalizeClass(["modal-backdrop", { fade: $props.transition > 0 }])
    }, null, 2 /* CLASS */)
  ], 2 /* CLASS */))
}

script.render = render;
script.__file = "src/components/modal/Modal.vue";

export { script as default };
//# sourceMappingURL=Modal.js.map
