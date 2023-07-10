'use strict';

var ChevronUpIcon = require('primevue/icons/chevronup');
var utils = require('primevue/utils');
var BaseComponent = require('primevue/basecomponent');
var usestyle = require('primevue/usestyle');
var vue = require('vue');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var ChevronUpIcon__default = /*#__PURE__*/_interopDefaultLegacy(ChevronUpIcon);
var BaseComponent__default = /*#__PURE__*/_interopDefaultLegacy(BaseComponent);

var styles = "\n.p-scrolltop {\n    position: fixed;\n    bottom: 20px;\n    right: 20px;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n}\n\n.p-scrolltop-sticky {\n    position: sticky;\n}\n\n.p-scrolltop-sticky.p-link {\n    margin-left: auto;\n}\n\n.p-scrolltop-enter-from {\n    opacity: 0;\n}\n\n.p-scrolltop-enter-active {\n    transition: opacity 0.15s;\n}\n\n.p-scrolltop.p-scrolltop-leave-to {\n    opacity: 0;\n}\n\n.p-scrolltop-leave-active {\n    transition: opacity 0.15s;\n}\n";
var classes = {
  root: function root(_ref) {
    var props = _ref.props;
    return ['p-scrolltop p-link p-component', {
      'p-scrolltop-sticky': props.target !== 'window'
    }];
  },
  icon: 'p-scrolltop-icon'
};
var _useStyle = usestyle.useStyle(styles, {
    name: 'scrolltop',
    manual: true
  }),
  loadStyle = _useStyle.load;
var script$1 = {
  name: 'BaseScrollTop',
  "extends": BaseComponent__default["default"],
  props: {
    target: {
      type: String,
      "default": 'window'
    },
    threshold: {
      type: Number,
      "default": 400
    },
    icon: {
      type: String,
      "default": undefined
    },
    behavior: {
      type: String,
      "default": 'smooth'
    }
  },
  css: {
    classes: classes,
    loadStyle: loadStyle
  },
  provide: function provide() {
    return {
      $parentInstance: this
    };
  }
};

var script = {
  name: 'ScrollTop',
  "extends": script$1,
  scrollListener: null,
  container: null,
  data: function data() {
    return {
      visible: false
    };
  },
  mounted: function mounted() {
    if (this.target === 'window') this.bindDocumentScrollListener();else if (this.target === 'parent') this.bindParentScrollListener();
  },
  beforeUnmount: function beforeUnmount() {
    if (this.target === 'window') this.unbindDocumentScrollListener();else if (this.target === 'parent') this.unbindParentScrollListener();
    if (this.container) {
      utils.ZIndexUtils.clear(this.container);
      this.overlay = null;
    }
  },
  methods: {
    onClick: function onClick() {
      var scrollElement = this.target === 'window' ? window : this.$el.parentElement;
      scrollElement.scroll({
        top: 0,
        behavior: this.behavior
      });
    },
    checkVisibility: function checkVisibility(scrollY) {
      if (scrollY > this.threshold) this.visible = true;else this.visible = false;
    },
    bindParentScrollListener: function bindParentScrollListener() {
      var _this = this;
      this.scrollListener = function () {
        _this.checkVisibility(_this.$el.parentElement.scrollTop);
      };
      this.$el.parentElement.addEventListener('scroll', this.scrollListener);
    },
    bindDocumentScrollListener: function bindDocumentScrollListener() {
      var _this2 = this;
      this.scrollListener = function () {
        _this2.checkVisibility(utils.DomHandler.getWindowScrollTop());
      };
      window.addEventListener('scroll', this.scrollListener);
    },
    unbindParentScrollListener: function unbindParentScrollListener() {
      if (this.scrollListener) {
        this.$el.parentElement.removeEventListener('scroll', this.scrollListener);
        this.scrollListener = null;
      }
    },
    unbindDocumentScrollListener: function unbindDocumentScrollListener() {
      if (this.scrollListener) {
        window.removeEventListener('scroll', this.scrollListener);
        this.scrollListener = null;
      }
    },
    onEnter: function onEnter(el) {
      utils.ZIndexUtils.set('overlay', el, this.$primevue.config.zIndex.overlay);
    },
    onAfterLeave: function onAfterLeave(el) {
      utils.ZIndexUtils.clear(el);
    },
    containerRef: function containerRef(el) {
      this.container = el;
    }
  },
  computed: {
    scrollTopAriaLabel: function scrollTopAriaLabel() {
      return this.$primevue.config.locale.aria ? this.$primevue.config.locale.aria.scrollTop : undefined;
    }
  },
  components: {
    ChevronUpIcon: ChevronUpIcon__default["default"]
  }
};

var _hoisted_1 = ["aria-label"];
function render(_ctx, _cache, $props, $setup, $data, $options) {
  return vue.openBlock(), vue.createBlock(vue.Transition, {
    name: "p-scrolltop",
    appear: "",
    onEnter: $options.onEnter,
    onAfterLeave: $options.onAfterLeave
  }, {
    "default": vue.withCtx(function () {
      return [$data.visible ? (vue.openBlock(), vue.createElementBlock("button", vue.mergeProps({
        key: 0,
        ref: $options.containerRef,
        "class": _ctx.cx('root'),
        onClick: _cache[0] || (_cache[0] = function () {
          return $options.onClick && $options.onClick.apply($options, arguments);
        }),
        type: "button",
        "aria-label": $options.scrollTopAriaLabel
      }, _ctx.ptm('root'), {
        "data-pc-name": "scrolltop"
      }), [vue.renderSlot(_ctx.$slots, "icon", {
        "class": vue.normalizeClass(_ctx.cx('icon'))
      }, function () {
        return [(vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent(_ctx.icon ? 'span' : 'ChevronUpIcon'), vue.mergeProps({
          "class": [_ctx.cx('icon'), _ctx.icon]
        }, _ctx.ptm('icon')), null, 16, ["class"]))];
      })], 16, _hoisted_1)) : vue.createCommentVNode("", true)];
    }),
    _: 3
  }, 8, ["onEnter", "onAfterLeave"]);
}

script.render = render;

module.exports = script;
