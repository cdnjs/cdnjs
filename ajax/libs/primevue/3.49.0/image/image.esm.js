import FocusTrap from 'primevue/focustrap';
import EyeIcon from 'primevue/icons/eye';
import RefreshIcon from 'primevue/icons/refresh';
import SearchMinusIcon from 'primevue/icons/searchminus';
import SearchPlusIcon from 'primevue/icons/searchplus';
import TimesIcon from 'primevue/icons/times';
import UndoIcon from 'primevue/icons/undo';
import Portal from 'primevue/portal';
import { ZIndexUtils, DomHandler } from 'primevue/utils';
import BaseComponent from 'primevue/basecomponent';
import ImageStyle from 'primevue/image/style';
import { resolveComponent, resolveDirective, openBlock, createElementBlock, mergeProps, renderSlot, createElementVNode, createBlock, resolveDynamicComponent, createCommentVNode, createVNode, withCtx, withDirectives, normalizeProps, guardReactiveProps, Transition, normalizeClass, normalizeStyle } from 'vue';

var script$1 = {
  name: 'BaseImage',
  "extends": BaseComponent,
  props: {
    preview: {
      type: Boolean,
      "default": false
    },
    "class": {
      type: null,
      "default": null
    },
    style: {
      type: null,
      "default": null
    },
    imageStyle: {
      type: null,
      "default": null
    },
    imageClass: {
      type: null,
      "default": null
    },
    previewButtonProps: {
      type: null,
      "default": null
    },
    indicatorIcon: {
      type: String,
      "default": undefined
    },
    zoomInDisabled: {
      type: Boolean,
      "default": false
    },
    zoomOutDisabled: {
      type: Boolean,
      "default": false
    }
  },
  style: ImageStyle,
  provide: function provide() {
    return {
      $parentInstance: this
    };
  }
};

var script = {
  name: 'Image',
  "extends": script$1,
  inheritAttrs: false,
  emits: ['show', 'hide', 'error'],
  mask: null,
  data: function data() {
    return {
      maskVisible: false,
      previewVisible: false,
      rotate: 0,
      scale: 1
    };
  },
  beforeUnmount: function beforeUnmount() {
    if (this.mask) {
      ZIndexUtils.clear(this.container);
    }
  },
  methods: {
    maskRef: function maskRef(el) {
      this.mask = el;
    },
    toolbarRef: function toolbarRef(el) {
      this.toolbarRef = el;
    },
    onImageClick: function onImageClick() {
      var _this = this;
      if (this.preview) {
        DomHandler.blockBodyScroll();
        this.maskVisible = true;
        setTimeout(function () {
          _this.previewVisible = true;
        }, 25);
      }
    },
    onPreviewImageClick: function onPreviewImageClick() {
      this.previewClick = true;
    },
    onMaskClick: function onMaskClick(event) {
      var isBarActionsClicked = DomHandler.isAttributeEquals(event.target, 'data-pc-section-group', 'action') || event.target.closest('[data-pc-section-group="action"]');
      if (!this.previewClick && !isBarActionsClicked) {
        this.previewVisible = false;
        this.rotate = 0;
        this.scale = 1;
      }
      this.previewClick = false;
    },
    onMaskKeydown: function onMaskKeydown(event) {
      var _this2 = this;
      switch (event.code) {
        case 'Escape':
          this.hidePreview();
          setTimeout(function () {
            DomHandler.focus(_this2.$refs.previewButton);
          }, 200);
          event.preventDefault();
          break;
      }
    },
    onError: function onError() {
      this.$emit('error');
    },
    rotateRight: function rotateRight() {
      this.rotate += 90;
      this.previewClick = true;
    },
    rotateLeft: function rotateLeft() {
      this.rotate -= 90;
      this.previewClick = true;
    },
    zoomIn: function zoomIn() {
      this.scale = this.scale + 0.1;
      this.previewClick = true;
    },
    zoomOut: function zoomOut() {
      this.scale = this.scale - 0.1;
      this.previewClick = true;
    },
    onBeforeEnter: function onBeforeEnter() {
      ZIndexUtils.set('modal', this.mask, this.$primevue.config.zIndex.modal);
    },
    onEnter: function onEnter() {
      this.focus();
      this.$emit('show');
    },
    onBeforeLeave: function onBeforeLeave() {
      !this.isUnstyled && DomHandler.addClass(this.mask, 'p-component-overlay-leave');
    },
    onLeave: function onLeave() {
      DomHandler.unblockBodyScroll();
      this.$emit('hide');
    },
    onAfterLeave: function onAfterLeave(el) {
      ZIndexUtils.clear(el);
      this.maskVisible = false;
    },
    focus: function focus() {
      var focusTarget = this.mask.querySelector('[autofocus]');
      if (focusTarget) {
        focusTarget.focus();
      }
    },
    hidePreview: function hidePreview() {
      this.previewVisible = false;
      this.rotate = 0;
      this.scale = 1;
      DomHandler.unblockBodyScroll();
    }
  },
  computed: {
    containerClass: function containerClass() {
      return [this.cx('root'), this["class"]];
    },
    rotateClass: function rotateClass() {
      return 'p-image-preview-rotate-' + this.rotate;
    },
    imagePreviewStyle: function imagePreviewStyle() {
      return {
        transform: 'rotate(' + this.rotate + 'deg) scale(' + this.scale + ')'
      };
    },
    isZoomInDisabled: function isZoomInDisabled() {
      return this.zoomInDisabled || this.scale >= 1.5;
    },
    isZoomOutDisabled: function isZoomOutDisabled() {
      return this.zoomOutDisabled || this.scale <= 0.5;
    },
    rightAriaLabel: function rightAriaLabel() {
      return this.$primevue.config.locale.aria ? this.$primevue.config.locale.aria.rotateRight : undefined;
    },
    leftAriaLabel: function leftAriaLabel() {
      return this.$primevue.config.locale.aria ? this.$primevue.config.locale.aria.rotateLeft : undefined;
    },
    zoomInAriaLabel: function zoomInAriaLabel() {
      return this.$primevue.config.locale.aria ? this.$primevue.config.locale.aria.zoomIn : undefined;
    },
    zoomOutAriaLabel: function zoomOutAriaLabel() {
      return this.$primevue.config.locale.aria ? this.$primevue.config.locale.aria.zoomOut : undefined;
    },
    zoomImageAriaLabel: function zoomImageAriaLabel() {
      return this.$primevue.config.locale.aria ? this.$primevue.config.locale.aria.zoomImage : undefined;
    },
    closeAriaLabel: function closeAriaLabel() {
      return this.$primevue.config.locale.aria ? this.$primevue.config.locale.aria.close : undefined;
    }
  },
  components: {
    Portal: Portal,
    EyeIcon: EyeIcon,
    RefreshIcon: RefreshIcon,
    UndoIcon: UndoIcon,
    SearchMinusIcon: SearchMinusIcon,
    SearchPlusIcon: SearchPlusIcon,
    TimesIcon: TimesIcon
  },
  directives: {
    focustrap: FocusTrap
  }
};

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var _hoisted_1 = ["aria-label"];
var _hoisted_2 = ["aria-modal"];
var _hoisted_3 = ["aria-label"];
var _hoisted_4 = ["aria-label"];
var _hoisted_5 = ["disabled", "aria-label"];
var _hoisted_6 = ["disabled", "aria-label"];
var _hoisted_7 = ["aria-label"];
var _hoisted_8 = ["src"];
function render(_ctx, _cache, $props, $setup, $data, $options) {
  var _component_RefreshIcon = resolveComponent("RefreshIcon");
  var _component_UndoIcon = resolveComponent("UndoIcon");
  var _component_SearchMinusIcon = resolveComponent("SearchMinusIcon");
  var _component_SearchPlusIcon = resolveComponent("SearchPlusIcon");
  var _component_TimesIcon = resolveComponent("TimesIcon");
  var _component_Portal = resolveComponent("Portal");
  var _directive_focustrap = resolveDirective("focustrap");
  return openBlock(), createElementBlock("span", mergeProps({
    "class": $options.containerClass,
    style: _ctx.style
  }, _ctx.ptmi('root')), [renderSlot(_ctx.$slots, "image", {
    onError: $options.onError,
    errorCallback: $options.onError
  }, function () {
    return [createElementVNode("img", mergeProps({
      style: _ctx.imageStyle,
      "class": [_ctx.cx('image'), _ctx.imageClass],
      onError: _cache[0] || (_cache[0] = function () {
        return $options.onError && $options.onError.apply($options, arguments);
      })
    }, _objectSpread(_objectSpread({}, _ctx.$attrs), _ctx.ptm('image'))), null, 16)];
  }), _ctx.preview ? (openBlock(), createElementBlock("button", mergeProps({
    key: 0,
    ref: "previewButton",
    "aria-label": $options.zoomImageAriaLabel,
    type: "button",
    "class": _ctx.cx('button'),
    onClick: _cache[1] || (_cache[1] = function () {
      return $options.onImageClick && $options.onImageClick.apply($options, arguments);
    })
  }, _objectSpread(_objectSpread({}, _ctx.previewButtonProps), _ctx.ptm('button'))), [renderSlot(_ctx.$slots, "indicatoricon", {}, function () {
    return [(openBlock(), createBlock(resolveDynamicComponent(_ctx.indicatorIcon ? 'i' : 'EyeIcon'), mergeProps({
      "class": _ctx.cx('icon')
    }, _ctx.ptm('icon')), null, 16, ["class"]))];
  })], 16, _hoisted_1)) : createCommentVNode("", true), createVNode(_component_Portal, null, {
    "default": withCtx(function () {
      return [$data.maskVisible ? withDirectives((openBlock(), createElementBlock("div", mergeProps({
        key: 0,
        ref: $options.maskRef,
        role: "dialog",
        "class": _ctx.cx('mask'),
        "aria-modal": $data.maskVisible,
        onClick: _cache[8] || (_cache[8] = function () {
          return $options.onMaskClick && $options.onMaskClick.apply($options, arguments);
        }),
        onKeydown: _cache[9] || (_cache[9] = function () {
          return $options.onMaskKeydown && $options.onMaskKeydown.apply($options, arguments);
        })
      }, _ctx.ptm('mask')), [createElementVNode("div", mergeProps({
        "class": _ctx.cx('toolbar')
      }, _ctx.ptm('toolbar')), [createElementVNode("button", mergeProps({
        "class": _ctx.cx('rotateRightButton'),
        onClick: _cache[2] || (_cache[2] = function () {
          return $options.rotateRight && $options.rotateRight.apply($options, arguments);
        }),
        type: "button",
        "aria-label": $options.rightAriaLabel
      }, _ctx.ptm('rotateRightButton'), {
        "data-pc-group-section": "action"
      }), [renderSlot(_ctx.$slots, "refresh", {}, function () {
        return [createVNode(_component_RefreshIcon, normalizeProps(guardReactiveProps(_ctx.ptm('rotateRightIcon'))), null, 16)];
      })], 16, _hoisted_3), createElementVNode("button", mergeProps({
        "class": _ctx.cx('rotateLeftButton'),
        onClick: _cache[3] || (_cache[3] = function () {
          return $options.rotateLeft && $options.rotateLeft.apply($options, arguments);
        }),
        type: "button",
        "aria-label": $options.leftAriaLabel
      }, _ctx.ptm('rotateLeftButton'), {
        "data-pc-group-section": "action"
      }), [renderSlot(_ctx.$slots, "undo", {}, function () {
        return [createVNode(_component_UndoIcon, normalizeProps(guardReactiveProps(_ctx.ptm('rotateLeftIcon'))), null, 16)];
      })], 16, _hoisted_4), createElementVNode("button", mergeProps({
        "class": _ctx.cx('zoomOutButton'),
        onClick: _cache[4] || (_cache[4] = function () {
          return $options.zoomOut && $options.zoomOut.apply($options, arguments);
        }),
        type: "button",
        disabled: $options.isZoomOutDisabled,
        "aria-label": $options.zoomOutAriaLabel
      }, _ctx.ptm('zoomOutButton'), {
        "data-pc-group-section": "action"
      }), [renderSlot(_ctx.$slots, "zoomout", {}, function () {
        return [createVNode(_component_SearchMinusIcon, normalizeProps(guardReactiveProps(_ctx.ptm('zoomOutIcon'))), null, 16)];
      })], 16, _hoisted_5), createElementVNode("button", mergeProps({
        "class": _ctx.cx('zoomInButton'),
        onClick: _cache[5] || (_cache[5] = function () {
          return $options.zoomIn && $options.zoomIn.apply($options, arguments);
        }),
        type: "button",
        disabled: $options.isZoomInDisabled,
        "aria-label": $options.zoomInAriaLabel
      }, _ctx.ptm('zoomInButton'), {
        "data-pc-group-section": "action"
      }), [renderSlot(_ctx.$slots, "zoomin", {}, function () {
        return [createVNode(_component_SearchPlusIcon, normalizeProps(guardReactiveProps(_ctx.ptm('zoomInIcon'))), null, 16)];
      })], 16, _hoisted_6), createElementVNode("button", mergeProps({
        "class": _ctx.cx('closeButton'),
        type: "button",
        onClick: _cache[6] || (_cache[6] = function () {
          return $options.hidePreview && $options.hidePreview.apply($options, arguments);
        }),
        "aria-label": $options.closeAriaLabel,
        autofocus: ""
      }, _ctx.ptm('closeButton'), {
        "data-pc-group-section": "action"
      }), [renderSlot(_ctx.$slots, "close", {}, function () {
        return [createVNode(_component_TimesIcon, normalizeProps(guardReactiveProps(_ctx.ptm('closeIcon'))), null, 16)];
      })], 16, _hoisted_7)], 16), createVNode(Transition, mergeProps({
        name: "p-image-preview",
        onBeforeEnter: $options.onBeforeEnter,
        onEnter: $options.onEnter,
        onLeave: $options.onLeave,
        onBeforeLeave: $options.onBeforeLeave,
        onAfterLeave: $options.onAfterLeave
      }, _ctx.ptm('transition')), {
        "default": withCtx(function () {
          return [$data.previewVisible ? (openBlock(), createElementBlock("div", normalizeProps(mergeProps({
            key: 0
          }, _ctx.ptm('previewContainer'))), [renderSlot(_ctx.$slots, "preview", {
            "class": normalizeClass(_ctx.cx('preview')),
            style: normalizeStyle($options.imagePreviewStyle),
            onClick: $options.onPreviewImageClick,
            previewCallback: $options.onPreviewImageClick
          }, function () {
            return [createElementVNode("img", mergeProps({
              src: _ctx.$attrs.src,
              "class": _ctx.cx('preview'),
              style: $options.imagePreviewStyle,
              onClick: _cache[7] || (_cache[7] = function () {
                return $options.onPreviewImageClick && $options.onPreviewImageClick.apply($options, arguments);
              })
            }, _ctx.ptm('preview')), null, 16, _hoisted_8)];
          })], 16)) : createCommentVNode("", true)];
        }),
        _: 3
      }, 16, ["onBeforeEnter", "onEnter", "onLeave", "onBeforeLeave", "onAfterLeave"])], 16, _hoisted_2)), [[_directive_focustrap]]) : createCommentVNode("", true)];
    }),
    _: 3
  })], 16);
}

script.render = render;

export { script as default };
