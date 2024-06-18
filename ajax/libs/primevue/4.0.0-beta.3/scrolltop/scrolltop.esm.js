import Button from 'primevue/button';
import ChevronUpIcon from 'primevue/icons/chevronup';
import { ZIndexUtils, DomHandler } from 'primevue/utils';
import { mergeProps, resolveComponent, openBlock, createBlock, Transition, withCtx, renderSlot, normalizeClass, resolveDynamicComponent, createCommentVNode } from 'vue';
import BaseComponent from 'primevue/basecomponent';
import ScrollTopStyle from 'primevue/scrolltop/style';

var script$1 = {
  name: 'BaseScrollTop',
  "extends": BaseComponent,
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
    },
    buttonProps: {
      type: Object,
      "default": function _default() {
        return {
          severity: 'secondary'
        };
      }
    }
  },
  style: ScrollTopStyle,
  provide: function provide() {
    return {
      $pcScrollTop: this,
      $parentInstance: this
    };
  }
};

var script = {
  name: 'ScrollTop',
  "extends": script$1,
  inheritAttrs: false,
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
      ZIndexUtils.clear(this.container);
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
        _this2.checkVisibility(DomHandler.getWindowScrollTop());
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
      ZIndexUtils.set('overlay', el, this.$primevue.config.zIndex.overlay);
    },
    onAfterLeave: function onAfterLeave(el) {
      ZIndexUtils.clear(el);
    },
    containerRef: function containerRef(el) {
      this.container = el ? el.$el : undefined;
    },
    rootPTOptions: function rootPTOptions() {
      return mergeProps(this.ptmi('root'), this.ptm('button'));
    },
    iconPTOptions: function iconPTOptions() {
      return mergeProps(this.ptmi('root')['icon'], this.ptm('button')['icon']);
    }
  },
  computed: {
    scrollTopAriaLabel: function scrollTopAriaLabel() {
      return this.$primevue.config.locale.aria ? this.$primevue.config.locale.aria.scrollTop : undefined;
    }
  },
  components: {
    ChevronUpIcon: ChevronUpIcon,
    Button: Button
  }
};

function render(_ctx, _cache, $props, $setup, $data, $options) {
  var _component_Button = resolveComponent("Button");
  return openBlock(), createBlock(Transition, mergeProps({
    name: "p-scrolltop",
    appear: "",
    onEnter: $options.onEnter,
    onAfterLeave: $options.onAfterLeave
  }, _ctx.ptm('transition')), {
    "default": withCtx(function () {
      return [$data.visible ? (openBlock(), createBlock(_component_Button, mergeProps({
        key: 0,
        ref: $options.containerRef,
        "class": _ctx.cx('root'),
        onClick: $options.onClick,
        "aria-label": $options.scrollTopAriaLabel,
        unstyled: _ctx.unstyled
      }, _ctx.buttonProps, {
        pt: $options.rootPTOptions()
      }), {
        icon: withCtx(function (slotProps) {
          return [renderSlot(_ctx.$slots, "icon", {
            "class": normalizeClass(_ctx.cx('icon'))
          }, function () {
            return [(openBlock(), createBlock(resolveDynamicComponent(_ctx.icon ? 'span' : 'ChevronUpIcon'), mergeProps({
              "class": [_ctx.cx('icon'), _ctx.icon, slotProps["class"]]
            }, $options.iconPTOptions), null, 16, ["class"]))];
          })];
        }),
        _: 3
      }, 16, ["class", "onClick", "aria-label", "unstyled", "pt"])) : createCommentVNode("", true)];
    }),
    _: 3
  }, 16, ["onEnter", "onAfterLeave"]);
}

script.render = render;

export { script as default };
