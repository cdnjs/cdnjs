import Vue from 'vue';

var TYPES = {
  ALERT: 0,
  CONFIRM: 1,
  PROMPT: 2
};

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign#Polyfill
function assign (target, varArgs) {
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

function isExist (obj) {
  return typeof obj !== 'undefined' && obj !== null
}

function isFunction (obj) {
  return typeof obj === 'function'
}

function isString (obj) {
  return typeof obj === 'string'
}

function isPromiseSupported () {
  return typeof window !== 'undefined' && isExist(window.Promise)
}

function spliceIfExist (arr, item) {
  if (Array.isArray(arr)) {
    var index = arr.indexOf(item);
    if (index >= 0) {
      arr.splice(index, 1);
    }
  }
}

function nodeListToArray (nodeList) {
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
  TOUCH_END: 'touchend'
};

function isIE11 () {
  /* istanbul ignore next */
  return !!window.MSInputMethodContext && !!document.documentMode
}

function isIE10 () {
  return window.navigator.appVersion.indexOf('MSIE 10') !== -1
}

function getComputedStyle (el) {
  return window.getComputedStyle(el)
}

function getViewportSize () {
  /* istanbul ignore next */
  var width = Math.max(document.documentElement.clientWidth, window.innerWidth) || 0;
  /* istanbul ignore next */
  var height = Math.max(document.documentElement.clientHeight, window.innerHeight) || 0;
  return { width: width, height: height }
}

var scrollbarWidth = null;
var savedScreenSize = null;

function getScrollbarWidth (recalculate) {
  if ( recalculate === void 0 ) recalculate = false;

  var screenSize = getViewportSize();
  // return directly when already calculated & not force recalculate & screen size not changed
  if (scrollbarWidth !== null && !recalculate &&
    screenSize.height === savedScreenSize.height && screenSize.width === savedScreenSize.width) {
    return scrollbarWidth
  }
  /* istanbul ignore next */
  if (document.readyState === 'loading') {
    return null
  }
  var div1 = document.createElement('div');
  var div2 = document.createElement('div');
  div1.style.width = div2.style.width = div1.style.height = div2.style.height = '100px';
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

function removeFromDom (el) {
  isElement(el) && isElement(el.parentNode) && el.parentNode.removeChild(el);
}

function addClass (el, className) {
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

function removeClass (el, className) {
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

function hasScrollbar (el) {
  var SCROLL = 'scroll';
  var hasVScroll = el.scrollHeight > el.clientHeight;
  var style = getComputedStyle(el);
  return hasVScroll || style.overflow === SCROLL || style.overflowY === SCROLL
}

function toggleBodyOverflow (enable) {
  var MODAL_OPEN = 'modal-open';
  var FIXED_CONTENT = '.navbar-fixed-top, .navbar-fixed-bottom';
  var body = document.body;
  if (enable) {
    removeClass(body, MODAL_OPEN);
    body.style.paddingRight = null;
    nodeListToArray(document.querySelectorAll(FIXED_CONTENT)).forEach(function (node) {
      node.style.paddingRight = null;
    });
  } else {
    var browsersWithFloatingScrollbar = isIE10() || isIE11();
    var documentHasScrollbar = hasScrollbar(document.documentElement) || hasScrollbar(document.body);
    if (documentHasScrollbar && !browsersWithFloatingScrollbar) {
      var scrollbarWidth = getScrollbarWidth();
      body.style.paddingRight = scrollbarWidth + "px";
      nodeListToArray(document.querySelectorAll(FIXED_CONTENT)).forEach(function (node) {
        node.style.paddingRight = scrollbarWidth + "px";
      });
    }
    addClass(body, MODAL_OPEN);
  }
}

var MODAL_BACKDROP = 'modal-backdrop';

function getOpenModals () {
  return document.querySelectorAll(("." + MODAL_BACKDROP))
}

function getOpenModalNum () {
  return getOpenModals().length
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
      week7: 'Sun'
    },
    timePicker: {
      am: 'AM',
      pm: 'PM'
    },
    modal: {
      cancel: 'Cancel',
      ok: 'OK'
    },
    multiSelect: {
      placeholder: 'Select...',
      filterPlaceholder: 'Search...'
    }
  }
};

// https://github.com/ElemeFE/element/blob/dev/src/locale/index.js

var lang = defaultLang;

var i18nHandler = function () {
  var vuei18n = Object.getPrototypeOf(this).$t;
  /* istanbul ignore else */
  /* istanbul ignore next */
  if (isFunction(vuei18n)) {
    /* istanbul ignore next */
    try {
      return vuei18n.apply(this, arguments)
    } catch (err) {
      return this.$t.apply(this, arguments)
    }
  }
};

var t$1 = function (path, options) {
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
    t: function t$1$1 () {
      var arguments$1 = arguments;

      var args = [];
      for (var i = 0; i < arguments.length; ++i) {
        args.push(arguments$1[i]);
      }
      args[1] = assign({}, { $$locale: this.locale }, args[1]);
      return t$1.apply(this, args)
    }
  },
  props: {
    locale: Object
  }
};

var e=function(){return (e=Object.assign||function(e){for(var t,r=1,s=arguments.length;r<s;r++){ for(var a in t=arguments[r]){ Object.prototype.hasOwnProperty.call(t,a)&&(e[a]=t[a]); } }return e}).apply(this,arguments)},t={kebab:/-(\w)/g,styleProp:/:(.*)/,styleList:/;(?![^(]*\))/g};function r(e,t){return t?t.toUpperCase():""}function s(e){for(var s,a={},c=0,o=e.split(t.styleList);c<o.length;c++){var n=o[c].split(t.styleProp),i=n[0],l=n[1];(i=i.trim())&&("string"==typeof l&&(l=l.trim()),a[(s=i,s.replace(t.kebab,r))]=l);}return a}function a(){
var arguments$1 = arguments;
for(var t,r,a={},c=arguments.length;c--;){ for(var o=0,n=Object.keys(arguments[c]);o<n.length;o++){ switch(t=n[o]){case"class":case"style":case"directives":if(Array.isArray(a[t])||(a[t]=[]),"style"===t){var i=void 0;i=Array.isArray(arguments$1[c].style)?arguments$1[c].style:[arguments$1[c].style];for(var l=0;l<i.length;l++){var y=i[l];"string"==typeof y&&(i[l]=s(y));}arguments$1[c].style=i;}a[t]=a[t].concat(arguments$1[c][t]);break;case"staticClass":if(!arguments$1[c][t]){ break; }void 0===a[t]&&(a[t]=""),a[t]&&(a[t]+=" "),a[t]+=arguments$1[c][t].trim();break;case"on":case"nativeOn":a[t]||(a[t]={});for(var p=0,f=Object.keys(arguments[c][t]||{});p<f.length;p++){ r=f[p],a[t][r]?a[t][r]=[].concat(a[t][r],arguments$1[c][t][r]):a[t][r]=arguments$1[c][t][r]; }break;case"attrs":case"props":case"domProps":case"scopedSlots":case"staticStyle":case"hook":case"transition":a[t]||(a[t]={}),a[t]=e({},arguments$1[c][t],a[t]);break;case"slot":case"key":case"ref":case"tag":case"show":case"keepAlive":default:a[t]||(a[t]=arguments$1[c][t]);} } }return a}

var linkMixin = {
  props: {
    // <a> props
    href: String,
    target: String,
    // <router-link> props
    to: null,
    replace: {
      type: Boolean,
      default: false
    },
    append: {
      type: Boolean,
      default: false
    },
    exact: {
      type: Boolean,
      default: false
    }
  }
};

var BtnGroup = {
  functional: true,
  render: function render (h, ref) {
    var obj;

    var props = ref.props;
    var children = ref.children;
    var data = ref.data;
    return h(
      'div',
      a(data, {
        class: ( obj = {
          'btn-group': !props.vertical,
          'btn-group-vertical': props.vertical,
          'btn-group-justified': props.justified
        }, obj[("btn-group-" + (props.size))] = props.size, obj ),
        attrs: {
          role: 'group',
          'data-toggle': 'buttons'
        }
      }),
      children
    )
  },
  props: {
    size: String,
    vertical: {
      type: Boolean,
      default: false
    },
    justified: {
      type: Boolean,
      default: false
    }
  }
};

var INPUT_TYPE_CHECKBOX = 'checkbox';
var INPUT_TYPE_RADIO = 'radio';

var Btn = {
  functional: true,
  mixins: [linkMixin],
  render: function render (h, ref) {
    var children = ref.children;
    var props = ref.props;
    var data = ref.data;

    // event listeners
    var listeners = data.on || {};
    // checkbox: model contain inputValue
    // radio: model === inputValue
    var isInputActive = props.inputType === INPUT_TYPE_CHECKBOX ? props.value.indexOf(props.inputValue) >= 0 : props.value === props.inputValue;
    // button class
    var classes = {
      btn: true,
      active: props.inputType ? isInputActive : props.active,
      disabled: props.disabled,
      'btn-block': props.block
    };
    classes[("btn-" + (props.type))] = Boolean(props.type);
    classes[("btn-" + (props.size))] = Boolean(props.size);
    // prevent event for disabled links
    var on = {
      click: function click (e) {
        if (props.disabled && e instanceof Event) {
          e.preventDefault();
          e.stopPropagation();
        }
      }
    };
    // render params
    var tag, options, slot;

    if (props.href) {
      // is native link
      tag = 'a';
      slot = children;
      options = a(data, {
        on: on,
        class: classes,
        attrs: {
          role: 'button',
          href: props.href,
          target: props.target
        }
      });
    } else if (props.to) {
      // is vue router link
      tag = 'router-link';
      slot = children;
      options = a(data, {
        nativeOn: on,
        class: classes,
        props: {
          event: props.disabled ? '' : 'click', // prevent nav while disabled
          to: props.to,
          replace: props.replace,
          append: props.append,
          exact: props.exact
        },
        attrs: {
          role: 'button'
        }
      });
    } else if (props.inputType) {
      // is input checkbox or radio
      tag = 'label';
      options = a(data, {
        on: on,
        class: classes
      });
      slot = [
        h('input', {
          attrs: {
            autocomplete: 'off',
            type: props.inputType,
            checked: isInputActive ? 'checked' : null,
            disabled: props.disabled
          },
          domProps: {
            checked: isInputActive // required
          },
          on: {
            input: function input (evt) {
              evt.stopPropagation();
            },
            change: function change () {
              if (props.inputType === INPUT_TYPE_CHECKBOX) {
                var valueCopied = props.value.slice();
                if (isInputActive) {
                  valueCopied.splice(valueCopied.indexOf(props.inputValue), 1);
                } else {
                  valueCopied.push(props.inputValue);
                }
                listeners.input(valueCopied);
              } else {
                listeners.input(props.inputValue);
              }
            }
          }
        }),
        children
      ];
    } else if (props.justified) {
      // is in justified btn-group
      tag = BtnGroup;
      options = {};
      slot = [
        h('button', a(data, {
          on: on,
          class: classes,
          attrs: {
            type: props.nativeType,
            disabled: props.disabled
          }
        }), children)
      ];
    } else {
      // is button
      tag = 'button';
      slot = children;
      options = a(data, {
        on: on,
        class: classes,
        attrs: {
          type: props.nativeType,
          disabled: props.disabled
        }
      });
    }

    return h(tag, options, slot)
  },
  props: {
    justified: {
      type: Boolean,
      default: false
    },
    type: {
      type: String,
      default: 'default'
    },
    nativeType: {
      type: String,
      default: 'button'
    },
    size: String,
    block: {
      type: Boolean,
      default: false
    },
    active: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    // <input> props
    value: null,
    inputValue: null,
    inputType: {
      type: String,
      validator: function validator (value) {
        return value === INPUT_TYPE_CHECKBOX || value === INPUT_TYPE_RADIO
      }
    }
  }
};

var IN = 'in';

var script$1 = {
  mixins: [Local],
  components: { Btn: Btn },
  props: {
    value: {
      type: Boolean,
      default: false
    },
    title: String,
    size: String,
    backdrop: {
      type: Boolean,
      default: true
    },
    footer: {
      type: Boolean,
      default: true
    },
    header: {
      type: Boolean,
      default: true
    },
    cancelText: String,
    cancelType: {
      type: String,
      default: 'default'
    },
    okText: String,
    okType: {
      type: String,
      default: 'primary'
    },
    dismissBtn: {
      type: Boolean,
      default: true
    },
    transition: {
      type: Number,
      default: 150
    },
    autoFocus: {
      type: Boolean,
      default: false
    },
    keyboard: {
      type: Boolean,
      default: true
    },
    beforeClose: Function,
    zOffset: {
      type: Number,
      default: 20
    },
    appendToBody: {
      type: Boolean,
      default: false
    },
    displayStyle: {
      type: String,
      default: 'block'
    }
  },
  data: function data () {
    return {
      msg: ''
    }
  },
  computed: {
    modalSizeClass: function modalSizeClass () {
      var obj;

      return ( obj = {}, obj[("modal-" + (this.size))] = Boolean(this.size), obj )
    }
  },
  watch: {
    value: function value (v) {
      this.$toggle(v);
    }
  },
  mounted: function mounted () {
    removeFromDom(this.$refs.backdrop);
    on(window, EVENTS.MOUSE_DOWN, this.suppressBackgroundClose);
    on(window, EVENTS.KEY_UP, this.onKeyPress);
    if (this.value) {
      this.$toggle(true);
    }
  },
  beforeDestroy: function beforeDestroy () {
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
    onKeyPress: function onKeyPress (event) {
      if (this.keyboard && this.value && event.keyCode === 27) {
        var thisModal = this.$refs.backdrop;
        var thisZIndex = thisModal.style.zIndex;
        thisZIndex = thisZIndex && thisZIndex !== 'auto' ? parseInt(thisZIndex) : 0;
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
    toggle: function toggle (show, msg) {
      var this$1 = this;

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
            this$1.msg = msg;
            this$1.$emit('input', show);
          }
        });
      } else {
        // Fallback to old version if promise is not supported
        // skip the hiding while show===false & beforeClose returning falsely value
        if (!show && !shouldClose) {
          return
        }

        this.msg = msg;
        this.$emit('input', show);
      }
    },
    $toggle: function $toggle (show) {
      var this$1 = this;

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
          if (this$1.appendToBody) {
            document.body.appendChild(modal);
          }
          modal.style.display = this$1.displayStyle;
          modal.scrollTop = 0;
          backdrop.offsetHeight; // force repaint
          toggleBodyOverflow(false);
          addClass(backdrop, IN);
          addClass(modal, IN);
          // fix z-index for nested modals
          // no need to calculate if no modal is already open
          if (alreadyOpenModalNum > 0) {
            var modalBaseZ = parseInt(getComputedStyle(modal).zIndex) || 1050; // 1050 is default modal z-Index
            var backdropBaseZ = parseInt(getComputedStyle(backdrop).zIndex) || 1040; // 1040 is default backdrop z-Index
            var offset = alreadyOpenModalNum * this$1.zOffset;
            modal.style.zIndex = "" + (modalBaseZ + offset);
            backdrop.style.zIndex = "" + (backdropBaseZ + offset);
          }
          // z-index fix end
          this$1.timeoutId = setTimeout(function () {
            if (this$1.autoFocus) {
              var btn = this$1.$el.querySelector('[data-action="auto-focus"]');
              if (btn) {
                btn.focus();
              }
            }
            this$1.$emit('show');
            this$1.timeoutId = 0;
          }, this$1.transition);
        });
      } else {
        removeClass(backdrop, IN);
        removeClass(modal, IN);
        this.timeoutId = setTimeout(function () {
          modal.style.display = 'none';
          removeFromDom(backdrop);
          if (this$1.appendToBody) {
            removeFromDom(modal);
          }
          if (getOpenModalNum() === 0) {
            toggleBodyOverflow(true);
          }
          this$1.$emit('hide', this$1.msg || 'dismiss');
          this$1.msg = '';
          this$1.timeoutId = 0;
          // restore z-index for nested modals
          modal.style.zIndex = '';
          backdrop.style.zIndex = '';
          // z-index fix end
        }, this.transition);
      }
    },
    suppressBackgroundClose: function suppressBackgroundClose (event) {
      if (event && event.target === this.$el) {
        return
      }
      this.isCloseSuppressed = true;
      on(window, 'mouseup', this.unsuppressBackgroundClose);
    },
    unsuppressBackgroundClose: function unsuppressBackgroundClose () {
      var this$1 = this;

      if (this.isCloseSuppressed) {
        off(window, 'mouseup', this.unsuppressBackgroundClose);
        setTimeout(function () {
          this$1.isCloseSuppressed = false;
        }, 1);
      }
    },
    backdropClicked: function backdropClicked (event) {
      if (this.backdrop && !this.isCloseSuppressed) {
        this.toggle(false);
      }
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
var __vue_script__$1 = script$1;

/* template */
var __vue_render__$1 = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "div",
    {
      staticClass: "modal",
      class: { fade: _vm.transition > 0 },
      attrs: { tabindex: "-1", role: "dialog" },
      on: {
        click: function($event) {
          if ($event.target !== $event.currentTarget) {
            return null
          }
          return _vm.backdropClicked($event)
        }
      }
    },
    [
      _c(
        "div",
        {
          ref: "dialog",
          staticClass: "modal-dialog",
          class: _vm.modalSizeClass,
          attrs: { role: "document" }
        },
        [
          _c("div", { staticClass: "modal-content" }, [
            _vm.header
              ? _c(
                  "div",
                  { staticClass: "modal-header" },
                  [
                    _vm._t("header", [
                      _vm.dismissBtn
                        ? _c(
                            "button",
                            {
                              staticClass: "close",
                              staticStyle: {
                                position: "relative",
                                "z-index": "1060"
                              },
                              attrs: { type: "button", "aria-label": "Close" },
                              on: {
                                click: function($event) {
                                  return _vm.toggle(false)
                                }
                              }
                            },
                            [
                              _c("span", { attrs: { "aria-hidden": "true" } }, [
                                _vm._v("×")
                              ])
                            ]
                          )
                        : _vm._e(),
                      _vm._v(" "),
                      _c(
                        "h4",
                        { staticClass: "modal-title" },
                        [_vm._t("title", [_vm._v(_vm._s(_vm.title))])],
                        2
                      )
                    ])
                  ],
                  2
                )
              : _vm._e(),
            _vm._v(" "),
            _c("div", { staticClass: "modal-body" }, [_vm._t("default")], 2),
            _vm._v(" "),
            _vm.footer
              ? _c(
                  "div",
                  { staticClass: "modal-footer" },
                  [
                    _vm._t("footer", [
                      _c(
                        "btn",
                        {
                          attrs: { type: _vm.cancelType },
                          on: {
                            click: function($event) {
                              return _vm.toggle(false, "cancel")
                            }
                          }
                        },
                        [
                          _c("span", [
                            _vm._v(
                              _vm._s(
                                _vm.cancelText || _vm.t("uiv.modal.cancel")
                              )
                            )
                          ])
                        ]
                      ),
                      _vm._v(" "),
                      _c(
                        "btn",
                        {
                          attrs: {
                            type: _vm.okType,
                            "data-action": "auto-focus"
                          },
                          on: {
                            click: function($event) {
                              return _vm.toggle(false, "ok")
                            }
                          }
                        },
                        [
                          _c("span", [
                            _vm._v(_vm._s(_vm.okText || _vm.t("uiv.modal.ok")))
                          ])
                        ]
                      )
                    ])
                  ],
                  2
                )
              : _vm._e()
          ])
        ]
      ),
      _vm._v(" "),
      _c("div", {
        ref: "backdrop",
        staticClass: "modal-backdrop",
        class: { fade: _vm.transition > 0 }
      })
    ]
  )
};
var __vue_staticRenderFns__$1 = [];
__vue_render__$1._withStripped = true;

  /* style */
  var __vue_inject_styles__$1 = undefined;
  /* scoped */
  var __vue_scope_id__$1 = undefined;
  /* module identifier */
  var __vue_module_identifier__$1 = undefined;
  /* functional template */
  var __vue_is_functional_template__$1 = false;
  /* style inject */
  
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  var __vue_component__$1 = /*#__PURE__*/normalizeComponent(
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

var script = {
  mixins: [Local],
  components: { Modal: __vue_component__$1, Btn: Btn },
  props: {
    backdrop: null,
    title: String,
    content: String,
    html: {
      type: Boolean,
      default: false
    },
    okText: String,
    okType: {
      type: String,
      default: 'primary'
    },
    cancelText: String,
    cancelType: {
      type: String,
      default: 'default'
    },
    type: {
      type: Number,
      default: TYPES.ALERT
    },
    size: {
      type: String,
      default: 'sm'
    },
    cb: {
      type: Function,
      required: true
    },
    validator: {
      type: Function,
      default: function () { return null; }
    },
    customClass: null,
    defaultValue: String,
    inputType: {
      type: String,
      default: 'text'
    },
    autoFocus: {
      type: String,
      default: 'ok'
    },
    reverseButtons: {
      type: Boolean,
      default: false
    }
  },
  data: function data () {
    return {
      TYPES: TYPES,
      show: false,
      input: '',
      dirty: false
    }
  },
  mounted: function mounted () {
    if (this.defaultValue) {
      this.input = this.defaultValue;
    }
  },
  computed: {
    closeOnBackdropClick: function closeOnBackdropClick () {
      // use backdrop prop if exist
      // otherwise, only not available if render as alert
      return isExist(this.backdrop) ? Boolean(this.backdrop) : (this.type !== TYPES.ALERT)
    },
    inputError: function inputError () {
      return this.validator(this.input)
    },
    inputNotValid: function inputNotValid () {
      return this.dirty && this.inputError
    },
    okBtnText: function okBtnText () {
      return this.okText || this.t('uiv.modal.ok')
    },
    cancelBtnText: function cancelBtnText () {
      return this.cancelText || this.t('uiv.modal.cancel')
    }
  },
  methods: {
    toggle: function toggle (show, msg) {
      this.$refs.modal.toggle(show, msg);
    },
    validate: function validate () {
      this.dirty = true;
      if (!isExist(this.inputError)) {
        this.toggle(false, { value: this.input });
      }
    }
  }
};

/* script */
var __vue_script__ = script;

/* template */
var __vue_render__ = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "modal",
    {
      ref: "modal",
      class: _vm.customClass,
      attrs: {
        "auto-focus": "",
        size: _vm.size,
        title: _vm.title,
        header: !!_vm.title,
        backdrop: _vm.closeOnBackdropClick,
        "cancel-text": _vm.cancelText,
        "ok-text": _vm.okText
      },
      on: { hide: _vm.cb },
      model: {
        value: _vm.show,
        callback: function($$v) {
          _vm.show = $$v;
        },
        expression: "show"
      }
    },
    [
      _vm.html
        ? _c("div", { domProps: { innerHTML: _vm._s(_vm.content) } })
        : _c("p", [_vm._v(_vm._s(_vm.content))]),
      _vm._v(" "),
      _vm.type === _vm.TYPES.PROMPT
        ? _c("div", [
            _c(
              "div",
              {
                staticClass: "form-group",
                class: { "has-error": _vm.inputNotValid }
              },
              [
                _vm.inputType === "checkbox"
                  ? _c("input", {
                      directives: [
                        {
                          name: "model",
                          rawName: "v-model",
                          value: _vm.input,
                          expression: "input"
                        }
                      ],
                      ref: "input",
                      staticClass: "form-control",
                      attrs: {
                        required: "",
                        "data-action": "auto-focus",
                        type: "checkbox"
                      },
                      domProps: {
                        checked: Array.isArray(_vm.input)
                          ? _vm._i(_vm.input, null) > -1
                          : _vm.input
                      },
                      on: {
                        change: [
                          function($event) {
                            var $$a = _vm.input,
                              $$el = $event.target,
                              $$c = $$el.checked ? true : false;
                            if (Array.isArray($$a)) {
                              var $$v = null,
                                $$i = _vm._i($$a, $$v);
                              if ($$el.checked) {
                                $$i < 0 && (_vm.input = $$a.concat([$$v]));
                              } else {
                                $$i > -1 &&
                                  (_vm.input = $$a
                                    .slice(0, $$i)
                                    .concat($$a.slice($$i + 1)));
                              }
                            } else {
                              _vm.input = $$c;
                            }
                          },
                          function($event) {
                            _vm.dirty = true;
                          }
                        ],
                        keyup: function($event) {
                          if (
                            !$event.type.indexOf("key") &&
                            _vm._k(
                              $event.keyCode,
                              "enter",
                              13,
                              $event.key,
                              "Enter"
                            )
                          ) {
                            return null
                          }
                          return _vm.validate($event)
                        }
                      }
                    })
                  : _vm.inputType === "radio"
                  ? _c("input", {
                      directives: [
                        {
                          name: "model",
                          rawName: "v-model",
                          value: _vm.input,
                          expression: "input"
                        }
                      ],
                      ref: "input",
                      staticClass: "form-control",
                      attrs: {
                        required: "",
                        "data-action": "auto-focus",
                        type: "radio"
                      },
                      domProps: { checked: _vm._q(_vm.input, null) },
                      on: {
                        change: [
                          function($event) {
                            _vm.input = null;
                          },
                          function($event) {
                            _vm.dirty = true;
                          }
                        ],
                        keyup: function($event) {
                          if (
                            !$event.type.indexOf("key") &&
                            _vm._k(
                              $event.keyCode,
                              "enter",
                              13,
                              $event.key,
                              "Enter"
                            )
                          ) {
                            return null
                          }
                          return _vm.validate($event)
                        }
                      }
                    })
                  : _c("input", {
                      directives: [
                        {
                          name: "model",
                          rawName: "v-model",
                          value: _vm.input,
                          expression: "input"
                        }
                      ],
                      ref: "input",
                      staticClass: "form-control",
                      attrs: {
                        required: "",
                        "data-action": "auto-focus",
                        type: _vm.inputType
                      },
                      domProps: { value: _vm.input },
                      on: {
                        change: function($event) {
                          _vm.dirty = true;
                        },
                        keyup: function($event) {
                          if (
                            !$event.type.indexOf("key") &&
                            _vm._k(
                              $event.keyCode,
                              "enter",
                              13,
                              $event.key,
                              "Enter"
                            )
                          ) {
                            return null
                          }
                          return _vm.validate($event)
                        },
                        input: function($event) {
                          if ($event.target.composing) {
                            return
                          }
                          _vm.input = $event.target.value;
                        }
                      }
                    }),
                _vm._v(" "),
                _c(
                  "span",
                  {
                    directives: [
                      {
                        name: "show",
                        rawName: "v-show",
                        value: _vm.inputNotValid,
                        expression: "inputNotValid"
                      }
                    ],
                    staticClass: "help-block"
                  },
                  [_vm._v(_vm._s(_vm.inputError))]
                )
              ]
            )
          ])
        : _vm._e(),
      _vm._v(" "),
      _vm.type === _vm.TYPES.ALERT
        ? _c(
            "template",
            { slot: "footer" },
            [
              _c("btn", {
                attrs: {
                  type: _vm.okType,
                  "data-action": _vm.autoFocus === "ok" ? "auto-focus" : ""
                },
                domProps: { textContent: _vm._s(_vm.okBtnText) },
                on: {
                  click: function($event) {
                    return _vm.toggle(false, "ok")
                  }
                }
              })
            ],
            1
          )
        : _c(
            "template",
            { slot: "footer" },
            [
              _vm.reverseButtons
                ? [
                    _vm.type === _vm.TYPES.CONFIRM
                      ? _c("btn", {
                          attrs: {
                            type: _vm.okType,
                            "data-action":
                              _vm.autoFocus === "ok" ? "auto-focus" : ""
                          },
                          domProps: { textContent: _vm._s(_vm.okBtnText) },
                          on: {
                            click: function($event) {
                              return _vm.toggle(false, "ok")
                            }
                          }
                        })
                      : _c("btn", {
                          attrs: { type: _vm.okType },
                          domProps: { textContent: _vm._s(_vm.okBtnText) },
                          on: { click: _vm.validate }
                        }),
                    _vm._v(" "),
                    _c("btn", {
                      attrs: {
                        type: _vm.cancelType,
                        "data-action":
                          _vm.autoFocus === "cancel" ? "auto-focus" : ""
                      },
                      domProps: { textContent: _vm._s(_vm.cancelBtnText) },
                      on: {
                        click: function($event) {
                          return _vm.toggle(false, "cancel")
                        }
                      }
                    })
                  ]
                : [
                    _c("btn", {
                      attrs: {
                        type: _vm.cancelType,
                        "data-action":
                          _vm.autoFocus === "cancel" ? "auto-focus" : ""
                      },
                      domProps: { textContent: _vm._s(_vm.cancelBtnText) },
                      on: {
                        click: function($event) {
                          return _vm.toggle(false, "cancel")
                        }
                      }
                    }),
                    _vm._v(" "),
                    _vm.type === _vm.TYPES.CONFIRM
                      ? _c("btn", {
                          attrs: {
                            type: _vm.okType,
                            "data-action":
                              _vm.autoFocus === "ok" ? "auto-focus" : ""
                          },
                          domProps: { textContent: _vm._s(_vm.okBtnText) },
                          on: {
                            click: function($event) {
                              return _vm.toggle(false, "ok")
                            }
                          }
                        })
                      : _c("btn", {
                          attrs: { type: _vm.okType },
                          domProps: { textContent: _vm._s(_vm.okBtnText) },
                          on: { click: _vm.validate }
                        })
                  ]
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

var queue = [];

var destroy = function (instance) {
  // console.log('destroyModal')
  removeFromDom(instance.$el);
  instance.$destroy();
  spliceIfExist(queue, instance);
};

// handel cancel or ok for confirm & prompt
var shallResolve = function (type, msg) {
  if (type === TYPES.CONFIRM) {
    // is confirm
    return msg === 'ok'
  } else {
    // is prompt
    return isExist(msg) && isString(msg.value)
  }
};

var init = function (type, options, cb, resolve, reject) {
  if ( resolve === void 0 ) resolve = null;
  if ( reject === void 0 ) reject = null;

  var i18n = this.$i18n;
  var instance = new Vue({
    extends: __vue_component__,
    i18n: i18n,
    propsData: assign({}, { type: type }, options, {
      cb: function cb$1 (msg) {
        destroy(instance);
        if (isFunction(cb)) {
          if (type === TYPES.CONFIRM) {
            shallResolve(type, msg) ? cb(null, msg) : cb(msg);
          } else if (type === TYPES.PROMPT) {
            shallResolve(type, msg) ? cb(null, msg.value) : cb(msg);
          } else {
            cb(msg);
          }
        } else if (resolve && reject) {
          if (type === TYPES.CONFIRM) {
            shallResolve(type, msg) ? resolve(msg) : reject(msg);
          } else if (type === TYPES.PROMPT) {
            shallResolve(type, msg) ? resolve(msg.value) : reject(msg);
          } else {
            resolve(msg);
          }
        }
      }
    })
  });
  instance.$mount();
  document.body.appendChild(instance.$el);
  instance.show = true;
  queue.push(instance);
};

// eslint-disable-next-line default-param-last
var initModal = function (type, options, cb) {
  var this$1 = this;
  if ( options === void 0 ) options = {};

  if (isPromiseSupported()) {
    return new Promise(function (resolve, reject) {
      init.apply(this$1, [type, options, cb, resolve, reject]);
    })
  } else {
    init.apply(this, [type, options, cb]);
  }
};

var alert = function (options, cb) {
  return initModal.apply(this, [TYPES.ALERT, options, cb])
};

var confirm = function (options, cb) {
  return initModal.apply(this, [TYPES.CONFIRM, options, cb])
};

var prompt = function (options, cb) {
  return initModal.apply(this, [TYPES.PROMPT, options, cb])
};

var MessageBox = { alert: alert, confirm: confirm, prompt: prompt };

export default MessageBox;
//# sourceMappingURL=MessageBox.js.map
