'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var __chunk_1 = require('./chunk-14c82365.js');
var __chunk_5 = require('./chunk-13e039f5.js');

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
var script = {
  name: 'NavbarBurger',
  props: {
    isOpened: {
      type: Boolean,
      default: false
    }
  }
};

/* script */
const __vue_script__ = script;

/* template */
var __vue_render__ = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('a',_vm._g({staticClass:"navbar-burger burger",class:{ 'is-active': _vm.isOpened },attrs:{"role":"button","aria-label":"menu","aria-expanded":_vm.isOpened}},_vm.$listeners),[_c('span',{attrs:{"aria-hidden":"true"}}),_c('span',{attrs:{"aria-hidden":"true"}}),_c('span',{attrs:{"aria-hidden":"true"}})])};
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
  

  
  var NavbarBurger = __chunk_5.__vue_normalize__(
    { render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ },
    __vue_inject_styles__,
    __vue_script__,
    __vue_scope_id__,
    __vue_is_functional_template__,
    __vue_module_identifier__,
    undefined,
    undefined
  );

var isTouch = typeof window !== 'undefined' && ('ontouchstart' in window || navigator.msMaxTouchPoints > 0);
var events = isTouch ? ['touchstart', 'click'] : ['click'];
var instances = [];

function processArgs(bindingValue) {
  var isFunction = typeof bindingValue === 'function';

  if (!isFunction && __chunk_1._typeof(bindingValue) !== 'object') {
    throw new Error("v-click-outside: Binding value should be a function or an object, ".concat(__chunk_1._typeof(bindingValue), " given"));
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

function bind(el, _ref4) {
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

function unbind(el) {
  // `filter` instead of `find` for compat with IE
  var instance = instances.filter(function (instance) {
    return instance.el === el;
  })[0];
  toggleEventListeners(instance, 'remove');
}

var directive = {
  bind: bind,
  update: update,
  unbind: unbind,
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

var script$1 = {
  name: 'BNavbar',
  components: {
    NavbarBurger: NavbarBurger
  },
  directives: {
    clickOutside: directive
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

      return [this.type, (_ref = {}, __chunk_1._defineProperty(_ref, FIXED_TOP_CLASS, this.fixedTop), __chunk_1._defineProperty(_ref, FIXED_BOTTOM_CLASS, this.fixedBottom), __chunk_1._defineProperty(_ref, BODY_CENTERED_CLASS, this.centered), __chunk_1._defineProperty(_ref, 'is-spaced', this.spaced), __chunk_1._defineProperty(_ref, 'has-shadow', this.shadow), __chunk_1._defineProperty(_ref, 'is-transparent', this.transparent), _ref)];
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
  

  
  var Navbar = __chunk_5.__vue_normalize__(
    {},
    __vue_inject_styles__$1,
    __vue_script__$1,
    __vue_scope_id__$1,
    __vue_is_functional_template__$1,
    __vue_module_identifier__$1,
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
var script$2 = {
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
const __vue_script__$2 = script$2;

/* template */
var __vue_render__$1 = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c(_vm.tag,_vm._g(_vm._b({tag:"component",staticClass:"navbar-item",class:{
        'is-active': _vm.active
    }},'component',_vm.$attrs,false),_vm.$listeners),[_vm._t("default")],2)};
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
  

  
  var NavbarItem = __chunk_5.__vue_normalize__(
    { render: __vue_render__$1, staticRenderFns: __vue_staticRenderFns__$1 },
    __vue_inject_styles__$2,
    __vue_script__$2,
    __vue_scope_id__$2,
    __vue_is_functional_template__$2,
    __vue_module_identifier__$2,
    undefined,
    undefined
  );

//
var script$3 = {
  name: 'BNavbarDropdown',
  directives: {
    clickOutside: directive
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
const __vue_script__$3 = script$3;

/* template */
var __vue_render__$2 = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{directives:[{name:"click-outside",rawName:"v-click-outside",value:(_vm.closeMenu),expression:"closeMenu"}],staticClass:"navbar-item has-dropdown",class:{
        'is-hoverable': _vm.isHoverable,
        'is-active': _vm.newActive
    },on:{"mouseenter":_vm.checkHoverable}},[_c('a',{staticClass:"navbar-link",class:{
            'is-arrowless': _vm.arrowless,
            'is-active': _vm.newActive && _vm.collapsible
        },attrs:{"role":"menuitem","aria-haspopup":"true","href":"#"},on:{"click":function($event){$event.preventDefault();_vm.newActive = !_vm.newActive;}}},[(_vm.label)?[_vm._v(_vm._s(_vm.label))]:_vm._t("label")],2),_c('div',{directives:[{name:"show",rawName:"v-show",value:(!_vm.collapsible || (_vm.collapsible && _vm.newActive)),expression:"!collapsible || (collapsible && newActive)"}],staticClass:"navbar-dropdown",class:{
            'is-right': _vm.right,
            'is-boxed': _vm.boxed,
        }},[_vm._t("default")],2)])};
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
  

  
  var NavbarDropdown = __chunk_5.__vue_normalize__(
    { render: __vue_render__$2, staticRenderFns: __vue_staticRenderFns__$2 },
    __vue_inject_styles__$3,
    __vue_script__$3,
    __vue_scope_id__$3,
    __vue_is_functional_template__$3,
    __vue_module_identifier__$3,
    undefined,
    undefined
  );

var Plugin = {
  install: function install(Vue) {
    __chunk_5.registerComponent(Vue, Navbar);
    __chunk_5.registerComponent(Vue, NavbarItem);
    __chunk_5.registerComponent(Vue, NavbarDropdown);
  }
};
__chunk_5.use(Plugin);

exports.BNavbar = Navbar;
exports.BNavbarDropdown = NavbarDropdown;
exports.BNavbarItem = NavbarItem;
exports.default = Plugin;
