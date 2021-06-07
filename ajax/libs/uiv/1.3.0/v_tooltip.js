import Vue from 'vue';

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

function hasOwnProperty (o, k) {
  return Object.prototype.hasOwnProperty.call(o, k)
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

var TRIGGERS = {
  CLICK: 'click',
  HOVER: 'hover',
  FOCUS: 'focus',
  HOVER_FOCUS: 'hover-focus',
  OUTSIDE_CLICK: 'outside-click',
  MANUAL: 'manual'
};

var PLACEMENTS = {
  TOP: 'top',
  RIGHT: 'right',
  BOTTOM: 'bottom',
  LEFT: 'left'
};

function getViewportSize () {
  /* istanbul ignore next */
  var width = Math.max(document.documentElement.clientWidth, window.innerWidth) || 0;
  /* istanbul ignore next */
  var height = Math.max(document.documentElement.clientHeight, window.innerHeight) || 0;
  return { width: width, height: height }
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

function hasClass (el, className) {
  if (!isElement(el)) {
    return false
  }
  var classes = el.className.split(' ');
  for (var i = 0, l = classes.length; i < l; i++) {
    if (classes[i] === className) {
      return true
    }
  }
  return false
}

function isAvailableAtPosition (trigger, popup, placement) {
  var triggerRect = trigger.getBoundingClientRect();
  var popupRect = popup.getBoundingClientRect();
  var viewPortSize = getViewportSize();
  var top = true;
  var right = true;
  var bottom = true;
  var left = true;
  switch (placement) {
    case PLACEMENTS.TOP:
      top = triggerRect.top >= popupRect.height;
      left = triggerRect.left + triggerRect.width / 2 >= popupRect.width / 2;
      right = triggerRect.right - triggerRect.width / 2 + popupRect.width / 2 <= viewPortSize.width;
      break
    case PLACEMENTS.BOTTOM:
      bottom = triggerRect.bottom + popupRect.height <= viewPortSize.height;
      left = triggerRect.left + triggerRect.width / 2 >= popupRect.width / 2;
      right = triggerRect.right - triggerRect.width / 2 + popupRect.width / 2 <= viewPortSize.width;
      break
    case PLACEMENTS.RIGHT:
      right = triggerRect.right + popupRect.width <= viewPortSize.width;
      top = triggerRect.top + triggerRect.height / 2 >= popupRect.height / 2;
      bottom = triggerRect.bottom - triggerRect.height / 2 + popupRect.height / 2 <= viewPortSize.height;
      break
    case PLACEMENTS.LEFT:
      left = triggerRect.left >= popupRect.width;
      top = triggerRect.top + triggerRect.height / 2 >= popupRect.height / 2;
      bottom = triggerRect.bottom - triggerRect.height / 2 + popupRect.height / 2 <= viewPortSize.height;
      break
  }
  return top && right && bottom && left
}

function setTooltipPosition (tooltip, trigger, placement, auto, appendTo, positionBy, viewport) {
  if (!isElement(tooltip) || !isElement(trigger)) {
    return
  }
  var isPopover = tooltip && tooltip.className && tooltip.className.indexOf('popover') >= 0;
  var containerScrollTop;
  var containerScrollLeft;
  if (!isExist(appendTo) || appendTo === 'body' || positionBy === 'body') {
    var doc = document.documentElement;
    containerScrollLeft = (window.pageXOffset || doc.scrollLeft) - (doc.clientLeft || 0);
    containerScrollTop = (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0);
  } else {
    var container = getElementBySelectorOrRef(positionBy || appendTo);
    containerScrollLeft = container.scrollLeft;
    containerScrollTop = container.scrollTop;
  }
  // auto adjust placement
  if (auto) {
    // Try: right -> bottom -> left -> top
    // Cause the default placement is top
    var placements = [PLACEMENTS.RIGHT, PLACEMENTS.BOTTOM, PLACEMENTS.LEFT, PLACEMENTS.TOP];
    // The class switch helper function
    var changePlacementClass = function (placement) {
      // console.log(placement)
      placements.forEach(function (placement) {
        removeClass(tooltip, placement);
      });
      addClass(tooltip, placement);
    };
    // No need to adjust if the default placement fits
    if (!isAvailableAtPosition(trigger, tooltip, placement)) {
      for (var i = 0, l = placements.length; i < l; i++) {
        // Re-assign placement class
        changePlacementClass(placements[i]);
        // Break if new placement fits
        if (isAvailableAtPosition(trigger, tooltip, placements[i])) {
          placement = placements[i];
          break
        }
      }
      changePlacementClass(placement);
    }
  }
  // fix left and top for tooltip
  var rect = trigger.getBoundingClientRect();
  var tooltipRect = tooltip.getBoundingClientRect();
  var top;
  var left;
  if (placement === PLACEMENTS.BOTTOM) {
    top = containerScrollTop + rect.top + rect.height;
    left = containerScrollLeft + rect.left + rect.width / 2 - tooltipRect.width / 2;
  } else if (placement === PLACEMENTS.LEFT) {
    top = containerScrollTop + rect.top + rect.height / 2 - tooltipRect.height / 2;
    left = containerScrollLeft + rect.left - tooltipRect.width;
  } else if (placement === PLACEMENTS.RIGHT) {
    top = containerScrollTop + rect.top + rect.height / 2 - tooltipRect.height / 2;
    // https://github.com/uiv-lib/uiv/issues/272
    // add 1px to fix above issue
    left = containerScrollLeft + rect.left + rect.width + 1;
  } else {
    top = containerScrollTop + rect.top - tooltipRect.height;
    left = containerScrollLeft + rect.left + rect.width / 2 - tooltipRect.width / 2;
  }
  var viewportEl;
  // viewport option
  if (isString(viewport)) {
    viewportEl = document.querySelector(viewport);
  } else if (isFunction(viewport)) {
    viewportEl = viewport(trigger);
  }
  if (isElement(viewportEl)) {
    var popoverFix = isPopover ? 11 : 0;
    var viewportReact = viewportEl.getBoundingClientRect();
    var viewportTop = containerScrollTop + viewportReact.top;
    var viewportLeft = containerScrollLeft + viewportReact.left;
    var viewportBottom = viewportTop + viewportReact.height;
    var viewportRight = viewportLeft + viewportReact.width;
    // fix top
    if (top < viewportTop) {
      top = viewportTop;
    } else if (top + tooltipRect.height > viewportBottom) {
      top = viewportBottom - tooltipRect.height;
    }
    // fix left
    if (left < viewportLeft) {
      left = viewportLeft;
    } else if (left + tooltipRect.width > viewportRight) {
      left = viewportRight - tooltipRect.width;
    }
    // fix for popover pointer
    if (placement === PLACEMENTS.BOTTOM) {
      top -= popoverFix;
    } else if (placement === PLACEMENTS.LEFT) {
      left += popoverFix;
    } else if (placement === PLACEMENTS.RIGHT) {
      left -= popoverFix;
    } else {
      top += popoverFix;
    }
  }
  // set position finally
  tooltip.style.top = top + "px";
  tooltip.style.left = left + "px";
}

var MODAL_BACKDROP = 'modal-backdrop';

function getOpenModals () {
  return document.querySelectorAll(("." + MODAL_BACKDROP))
}

function getOpenModalNum () {
  return getOpenModals().length
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

var SHOW_CLASS = 'in';

var popupMixin = {
  props: {
    value: {
      type: Boolean,
      default: false
    },
    tag: {
      type: String,
      default: 'span'
    },
    placement: {
      type: String,
      default: PLACEMENTS.TOP
    },
    autoPlacement: {
      type: Boolean,
      default: true
    },
    appendTo: {
      type: null,
      default: 'body'
    },
    positionBy: {
      type: null,
      default: null
    },
    transition: {
      type: Number,
      default: 150
    },
    hideDelay: {
      type: Number,
      default: 0
    },
    showDelay: {
      type: Number,
      default: 0
    },
    enable: {
      type: Boolean,
      default: true
    },
    enterable: {
      type: Boolean,
      default: true
    },
    target: null,
    viewport: null,
    customClass: String
  },
  data: function data () {
    return {
      triggerEl: null,
      hideTimeoutId: 0,
      showTimeoutId: 0,
      transitionTimeoutId: 0,
      autoTimeoutId: 0
    }
  },
  watch: {
    value: function value (v) {
      v ? this.show() : this.hide();
    },
    trigger: function trigger () {
      this.clearListeners();
      this.initListeners();
    },
    target: function target (value) {
      this.clearListeners();
      this.initTriggerElByTarget(value);
      this.initListeners();
    },
    allContent: function allContent (value) {
      var this$1 = this;

      // can not use value because it can not detect slot changes
      if (this.isNotEmpty()) {
        // reset position while content changed & is shown
        // nextTick is required
        this.$nextTick(function () {
          /* istanbul ignore else */
          if (this$1.isShown()) {
            this$1.resetPosition();
          }
        });
      } else {
        this.hide();
      }
    },
    enable: function enable (value) {
      // hide if enable changed to false
      /* istanbul ignore else */
      if (!value) {
        this.hide();
      }
    }
  },
  mounted: function mounted () {
    var this$1 = this;

    ensureElementMatchesFunction();
    removeFromDom(this.$refs.popup);
    this.$nextTick(function () {
      this$1.initTriggerElByTarget(this$1.target);
      this$1.initListeners();
      if (this$1.value) {
        this$1.show();
      }
    });
  },
  beforeDestroy: function beforeDestroy () {
    this.clearListeners();
    removeFromDom(this.$refs.popup);
  },
  methods: {
    initTriggerElByTarget: function initTriggerElByTarget (target) {
      if (target) {
        // target exist
        this.triggerEl = getElementBySelectorOrRef(target);
      } else {
        // find special element
        var trigger = this.$el.querySelector('[data-role="trigger"]');
        if (trigger) {
          this.triggerEl = trigger;
        } else {
          // use the first child
          var firstChild = this.$el.firstChild;
          this.triggerEl = firstChild === this.$refs.popup ? null : firstChild;
        }
      }
    },
    initListeners: function initListeners () {
      if (this.triggerEl) {
        if (this.trigger === TRIGGERS.HOVER) {
          on(this.triggerEl, EVENTS.MOUSE_ENTER, this.show);
          on(this.triggerEl, EVENTS.MOUSE_LEAVE, this.hide);
        } else if (this.trigger === TRIGGERS.FOCUS) {
          on(this.triggerEl, EVENTS.FOCUS, this.show);
          on(this.triggerEl, EVENTS.BLUR, this.hide);
        } else if (this.trigger === TRIGGERS.HOVER_FOCUS) {
          on(this.triggerEl, EVENTS.MOUSE_ENTER, this.handleAuto);
          on(this.triggerEl, EVENTS.MOUSE_LEAVE, this.handleAuto);
          on(this.triggerEl, EVENTS.FOCUS, this.handleAuto);
          on(this.triggerEl, EVENTS.BLUR, this.handleAuto);
        } else if (this.trigger === TRIGGERS.CLICK || this.trigger === TRIGGERS.OUTSIDE_CLICK) {
          on(this.triggerEl, EVENTS.CLICK, this.toggle);
        }
      }
      on(window, EVENTS.CLICK, this.windowClicked);
    },
    clearListeners: function clearListeners () {
      if (this.triggerEl) {
        off(this.triggerEl, EVENTS.FOCUS, this.show);
        off(this.triggerEl, EVENTS.BLUR, this.hide);
        off(this.triggerEl, EVENTS.MOUSE_ENTER, this.show);
        off(this.triggerEl, EVENTS.MOUSE_LEAVE, this.hide);
        off(this.triggerEl, EVENTS.CLICK, this.toggle);
        off(this.triggerEl, EVENTS.MOUSE_ENTER, this.handleAuto);
        off(this.triggerEl, EVENTS.MOUSE_LEAVE, this.handleAuto);
        off(this.triggerEl, EVENTS.FOCUS, this.handleAuto);
        off(this.triggerEl, EVENTS.BLUR, this.handleAuto);
      }
      off(window, EVENTS.CLICK, this.windowClicked);
      this.clearTimeouts();
    },
    clearTimeouts: function clearTimeouts () {
      if (this.hideTimeoutId) {
        clearTimeout(this.hideTimeoutId);
        this.hideTimeoutId = 0;
      }
      if (this.showTimeoutId) {
        clearTimeout(this.showTimeoutId);
        this.showTimeoutId = 0;
      }
      if (this.transitionTimeoutId) {
        clearTimeout(this.transitionTimeoutId);
        this.transitionTimeoutId = 0;
      }
      if (this.autoTimeoutId) {
        clearTimeout(this.autoTimeoutId);
        this.autoTimeoutId = 0;
      }
    },
    resetPosition: function resetPosition () {
      var popup = this.$refs.popup;
      /* istanbul ignore else */
      if (popup) {
        setTooltipPosition(popup, this.triggerEl, this.placement, this.autoPlacement, this.appendTo, this.positionBy, this.viewport);
        popup.offsetHeight;
      }
    },
    hideOnLeave: function hideOnLeave () {
      if (this.trigger === TRIGGERS.HOVER || (this.trigger === TRIGGERS.HOVER_FOCUS && !this.triggerEl.matches(':focus'))) {
        this.$hide();
      }
    },
    toggle: function toggle () {
      if (this.isShown()) {
        this.hide();
      } else {
        this.show();
      }
    },
    show: function show () {
      var this$1 = this;

      if (this.enable && this.triggerEl && this.isNotEmpty() && !this.isShown()) {
        var popUpAppendedContainer = this.hideTimeoutId > 0; // weird condition
        if (popUpAppendedContainer) {
          clearTimeout(this.hideTimeoutId);
          this.hideTimeoutId = 0;
        }
        if (this.transitionTimeoutId > 0) {
          clearTimeout(this.transitionTimeoutId);
          this.transitionTimeoutId = 0;
        }
        clearTimeout(this.showTimeoutId);
        this.showTimeoutId = setTimeout(function () {
          this$1.showTimeoutId = 0;
          var popup = this$1.$refs.popup;
          if (popup) {
            var alreadyOpenModalNum = getOpenModalNum();
            if (alreadyOpenModalNum > 1) {
              var defaultZ = this$1.name === 'popover' ? 1060 : 1070;
              var offset = (alreadyOpenModalNum - 1) * 20;
              popup.style.zIndex = "" + (defaultZ + offset);
            }
            // add to dom
            if (!popUpAppendedContainer) {
              popup.className = (this$1.name) + " " + (this$1.placement) + " " + (this$1.customClass ? this$1.customClass : '') + " fade";
              var container = getElementBySelectorOrRef(this$1.appendTo);
              container.appendChild(popup);
              this$1.resetPosition();
            }
            addClass(popup, SHOW_CLASS);
            this$1.$emit('input', true);
            this$1.$emit('show');
          }
        }, this.showDelay);
      }
    },
    hide: function hide () {
      var this$1 = this;

      if (this.showTimeoutId > 0) {
        clearTimeout(this.showTimeoutId);
        this.showTimeoutId = 0;
      }

      if (!this.isShown()) {
        return
      }
      if (this.enterable && (this.trigger === TRIGGERS.HOVER || this.trigger === TRIGGERS.HOVER_FOCUS)) {
        clearTimeout(this.hideTimeoutId);
        this.hideTimeoutId = setTimeout(function () {
          this$1.hideTimeoutId = 0;
          var popup = this$1.$refs.popup;
          if (popup && !popup.matches(':hover')) {
            this$1.$hide();
          }
        }, 100);
      } else {
        this.$hide();
      }
    },
    $hide: function $hide () {
      var this$1 = this;

      if (this.isShown()) {
        clearTimeout(this.hideTimeoutId);
        this.hideTimeoutId = setTimeout(function () {
          this$1.hideTimeoutId = 0;
          removeClass(this$1.$refs.popup, SHOW_CLASS);
          // gives fade out time
          this$1.transitionTimeoutId = setTimeout(function () {
            this$1.transitionTimeoutId = 0;
            removeFromDom(this$1.$refs.popup);
            this$1.$emit('input', false);
            this$1.$emit('hide');
          }, this$1.transition);
        }, this.hideDelay);
      }
    },
    isShown: function isShown () {
      return hasClass(this.$refs.popup, SHOW_CLASS)
    },
    windowClicked: function windowClicked (event) {
      if (this.triggerEl && isFunction(this.triggerEl.contains) && !this.triggerEl.contains(event.target) &&
        this.trigger === TRIGGERS.OUTSIDE_CLICK && !(this.$refs.popup && this.$refs.popup.contains(event.target)) &&
        this.isShown()) {
        this.hide();
      }
    },
    handleAuto: function handleAuto () {
      var this$1 = this;

      clearTimeout(this.autoTimeoutId);
      this.autoTimeoutId = setTimeout(function () {
        this$1.autoTimeoutId = 0;
        if (this$1.triggerEl.matches(':hover, :focus')) {
          this$1.show();
        } else {
          this$1.hide();
        }
      }, 20); // 20ms make firefox happy
    }
  }
};

var Tooltip = {
  mixins: [popupMixin],
  data: function data () {
    return {
      name: 'tooltip'
    }
  },
  render: function render (h) {
    return h(
      this.tag,
      [
        this.$slots.default,
        h('div',
          {
            ref: 'popup',
            attrs: {
              role: 'tooltip'
            },
            on: {
              mouseleave: this.hideOnLeave
            }
          },
          [
            h('div', { class: 'tooltip-arrow' }),
            h('div', {
              class: 'tooltip-inner',
              domProps: { innerHTML: this.text }
            })
          ]
        )
      ]
    )
  },
  props: {
    text: {
      type: String,
      default: ''
    },
    trigger: {
      type: String,
      default: TRIGGERS.HOVER_FOCUS
    }
  },
  computed: {
    allContent: function allContent () {
      return this.text
    }
  },
  methods: {
    isNotEmpty: function isNotEmpty () {
      return this.text
    }
  }
};

var INSTANCE = '_uiv_tooltip_instance';

var bind = function (el, binding) {
  // console.log('bind')
  unbind(el);
  var Constructor = Vue.extend(Tooltip);
  var vm = new Constructor({
    propsData: {
      target: el,
      appendTo: binding.arg && '#' + binding.arg,
      text: typeof binding.value === 'string' ? (binding.value && binding.value.toString()) : (binding.value && binding.value.text && binding.value.text.toString()),
      positionBy: binding.value && binding.value.positionBy && binding.value.positionBy.toString(),
      viewport: binding.value && binding.value.viewport && binding.value.viewport.toString(),
      customClass: binding.value && binding.value.customClass && binding.value.customClass.toString(),
      showDelay: binding.value && binding.value.showDelay,
      hideDelay: binding.value && binding.value.hideDelay
    }
  });
  var options = [];
  for (var key in binding.modifiers) {
    if (hasOwnProperty(binding.modifiers, key) && binding.modifiers[key]) {
      options.push(key);
    }
  }
  options.forEach(function (option) {
    if (/(top)|(left)|(right)|(bottom)/.test(option)) {
      vm.placement = option;
    } else if (/(hover)|(focus)|(click)/.test(option)) {
      vm.trigger = option;
    } else if (/unenterable/.test(option)) {
      vm.enterable = false;
    }
  });
  vm.$mount();
  el[INSTANCE] = vm;
};

var unbind = function (el) {
  // console.log('unbind')
  var vm = el[INSTANCE];
  if (vm) {
    vm.$destroy();
  }
  delete el[INSTANCE];
};

var update = function (el, binding) {
  // console.log('update')
  if (binding.value !== binding.oldValue) {
    bind(el, binding);
  }
};

var tooltip = { bind: bind, unbind: unbind, update: update };

export default tooltip;
//# sourceMappingURL=v_tooltip.js.map
