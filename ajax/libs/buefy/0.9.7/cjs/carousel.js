'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var __chunk_1 = require('./chunk-14c82365.js');
var helpers = require('./helpers.js');
var __chunk_2 = require('./chunk-1bb51959.js');
var __chunk_4 = require('./chunk-7f8af05c.js');
var __chunk_5 = require('./chunk-13e039f5.js');
var __chunk_8 = require('./chunk-21985800.js');

var script = {
  name: 'BCarousel',
  components: __chunk_1._defineProperty({}, __chunk_4.Icon.name, __chunk_4.Icon),
  mixins: [__chunk_8.ProviderParentMixin('carousel', __chunk_8.Sorted)],
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
        return __chunk_2.config.defaultIconPrev;
      }
    },
    iconNext: {
      type: String,
      default: function _default() {
        return __chunk_2.config.defaultIconNext;
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
      }, this.interval || __chunk_2.config.defaultCarouselInterval);
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
      newIndex = this.repeat ? helpers.mod(newIndex, this.childItems.length) : helpers.bound(newIndex, 0, this.childItems.length - 1);
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
const __vue_script__ = script;

/* template */
var __vue_render__ = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"carousel",class:{'is-overlay': _vm.overlay},on:{"mouseenter":_vm.checkPause,"mouseleave":_vm.startTimer}},[(_vm.progress)?_c('progress',{staticClass:"progress",class:_vm.progressType,attrs:{"max":_vm.childItems.length - 1},domProps:{"value":_vm.activeChild}},[_vm._v(" "+_vm._s(_vm.childItems.length - 1)+" ")]):_vm._e(),_c('div',{staticClass:"carousel-items",on:{"mousedown":_vm.dragStart,"mouseup":_vm.dragEnd,"touchstart":function($event){$event.stopPropagation();return _vm.dragStart($event)},"touchend":function($event){$event.stopPropagation();return _vm.dragEnd($event)}}},[_vm._t("default"),(_vm.arrow)?_c('div',{staticClass:"carousel-arrow",class:{'is-hovered': _vm.arrowHover}},[_c('b-icon',{directives:[{name:"show",rawName:"v-show",value:(_vm.hasPrev),expression:"hasPrev"}],staticClass:"has-icons-left",attrs:{"pack":_vm.iconPack,"icon":_vm.iconPrev,"size":_vm.iconSize,"both":""},nativeOn:{"click":function($event){return _vm.prev($event)}}}),_c('b-icon',{directives:[{name:"show",rawName:"v-show",value:(_vm.hasNext),expression:"hasNext"}],staticClass:"has-icons-right",attrs:{"pack":_vm.iconPack,"icon":_vm.iconNext,"size":_vm.iconSize,"both":""},nativeOn:{"click":function($event){return _vm.next($event)}}})],1):_vm._e()],2),(_vm.autoplay && _vm.pauseHover && _vm.pauseInfo && _vm.isPause)?_c('div',{staticClass:"carousel-pause"},[_c('span',{staticClass:"tag",class:_vm.pauseInfoType},[_vm._v(" "+_vm._s(_vm.pauseText)+" ")])]):_vm._e(),(_vm.withCarouselList && !_vm.indicator)?[_vm._t("list",null,{"active":_vm.activeChild,"switch":_vm.changeActive})]:_vm._e(),(_vm.indicator)?_c('div',{staticClass:"carousel-indicator",class:_vm.indicatorClasses},_vm._l((_vm.sortedItems),function(item,index){return _c('a',{key:item._uid,staticClass:"indicator-item",class:{'is-active': item.isActive},on:{"mouseover":function($event){return _vm.modeChange('hover', index)},"click":function($event){return _vm.modeChange('click', index)}}},[_vm._t("indicators",[_c('span',{staticClass:"indicator-style",class:_vm.indicatorStyle})],{"i":index})],2)}),0):_vm._e(),(_vm.overlay)?[_vm._t("overlay")]:_vm._e()],2)};
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
  

  
  var Carousel = __chunk_5.__vue_normalize__(
    { render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ },
    __vue_inject_styles__,
    __vue_script__,
    __vue_scope_id__,
    __vue_is_functional_template__,
    __vue_module_identifier__,
    undefined,
    undefined
  );

//
var script$1 = {
  name: 'BCarouselItem',
  mixins: [__chunk_8.InjectedChildMixin('carousel', __chunk_8.Sorted$1)],
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
const __vue_script__$1 = script$1;

/* template */
var __vue_render__$1 = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('transition',{attrs:{"name":_vm.transition}},[_c('div',{directives:[{name:"show",rawName:"v-show",value:(_vm.isActive),expression:"isActive"}],staticClass:"carousel-item"},[_vm._t("default")],2)])};
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
  

  
  var CarouselItem = __chunk_5.__vue_normalize__(
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
  name: 'BCarouselList',
  components: __chunk_1._defineProperty({}, __chunk_4.Icon.name, __chunk_4.Icon),
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
        return __chunk_2.config.defaultIconPrev;
      }
    },
    iconNext: {
      type: String,
      default: function _default() {
        return __chunk_2.config.defaultIconNext;
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
      return -helpers.bound(this.delta + this.scrollIndex * this.itemWidth, 0, (this.data.length - this.settings.itemsToShow) * this.itemWidth);
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
        return __chunk_1._objectSpread2({}, this.$props, {}, this.breakpoints[breakpoint]);
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
        this.activeItem = helpers.bound(_value, 0, this.data.length - 1);
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
        newIndex = helpers.mod(newIndex, this.total + 1);
      }

      newIndex = helpers.bound(newIndex, 0, this.total);
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
        var signCheck = helpers.sign(this.delta);
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
const __vue_script__$2 = script$2;

/* template */
var __vue_render__$2 = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"carousel-list",class:{'has-shadow': _vm.scrollIndex > 0},on:{"mousedown":function($event){$event.preventDefault();return _vm.dragStart($event)},"touchstart":_vm.dragStart}},[_c('div',{staticClass:"carousel-slides",class:_vm.listClass,style:('transform:translateX('+_vm.translation+'px)')},_vm._l((_vm.data),function(list,index){return _c('div',{key:index,staticClass:"carousel-slide",class:{'is-active': _vm.asIndicator ? _vm.activeItem === index : _vm.scrollIndex === index},style:(_vm.itemStyle),on:{"mouseup":function($event){return _vm.checkAsIndicator(index, $event)},"touchend":function($event){return _vm.checkAsIndicator(index, $event)}}},[_vm._t("item",[_c('b-image',_vm._b({attrs:{"src":list.image}},'b-image',list,false))],{"index":index,"active":_vm.activeItem,"scroll":_vm.scrollIndex,"list":list},list)],2)}),0),(_vm.arrow)?_c('div',{staticClass:"carousel-arrow",class:{'is-hovered': _vm.settings.arrowHover}},[_c('b-icon',{directives:[{name:"show",rawName:"v-show",value:(_vm.hasPrev),expression:"hasPrev"}],staticClass:"has-icons-left",attrs:{"pack":_vm.settings.iconPack,"icon":_vm.settings.iconPrev,"size":_vm.settings.iconSize,"both":""},nativeOn:{"click":function($event){$event.preventDefault();return _vm.prev($event)}}}),_c('b-icon',{directives:[{name:"show",rawName:"v-show",value:(_vm.hasNext),expression:"hasNext"}],staticClass:"has-icons-right",attrs:{"pack":_vm.settings.iconPack,"icon":_vm.settings.iconNext,"size":_vm.settings.iconSize,"both":""},nativeOn:{"click":function($event){$event.preventDefault();return _vm.next($event)}}})],1):_vm._e()])};
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
  

  
  var CarouselList = __chunk_5.__vue_normalize__(
    { render: __vue_render__$2, staticRenderFns: __vue_staticRenderFns__$2 },
    __vue_inject_styles__$2,
    __vue_script__$2,
    __vue_scope_id__$2,
    __vue_is_functional_template__$2,
    __vue_module_identifier__$2,
    undefined,
    undefined
  );

var Plugin = {
  install: function install(Vue) {
    __chunk_5.registerComponent(Vue, Carousel);
    __chunk_5.registerComponent(Vue, CarouselItem);
    __chunk_5.registerComponent(Vue, CarouselList);
  }
};
__chunk_5.use(Plugin);

exports.BCarousel = Carousel;
exports.BCarouselItem = CarouselItem;
exports.BCarouselList = CarouselList;
exports.default = Plugin;
