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
import { useStyle } from 'primevue/usestyle';
import { resolveComponent, resolveDirective, openBlock, createElementBlock, mergeProps, renderSlot, createElementVNode, createBlock, resolveDynamicComponent, createCommentVNode, createVNode, withCtx, withDirectives, normalizeProps, guardReactiveProps, Transition, normalizeStyle } from 'vue';

var styles = "\n.p-image-mask {\n    display: flex;\n    align-items: center;\n    justify-content: center;\n}\n\n.p-image-preview-container {\n    position: relative;\n    display: inline-block;\n}\n\n.p-image-preview-indicator {\n    position: absolute;\n    left: 0;\n    top: 0;\n    width: 100%;\n    height: 100%;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    opacity: 0;\n    transition: opacity 0.3s;\n}\n\n.p-image-preview-container:hover > .p-image-preview-indicator {\n    opacity: 1;\n    cursor: pointer;\n}\n\n.p-image-preview-container > img {\n    cursor: pointer;\n}\n\n.p-image-toolbar {\n    position: absolute;\n    top: 0;\n    right: 0;\n    display: flex;\n}\n\n.p-image-action.p-link {\n    display: flex;\n    justify-content: center;\n    align-items: center;\n}\n\n.p-image-preview {\n    transition: transform 0.15s;\n    max-width: 100vw;\n    max-height: 100vh;\n}\n\n.p-image-preview-enter-active {\n    transition: all 150ms cubic-bezier(0, 0, 0.2, 1);\n}\n.p-image-preview-leave-active {\n    transition: all 150ms cubic-bezier(0.4, 0, 0.2, 1);\n}\n.p-image-preview-enter-from,\n.p-image-preview-leave-to {\n    opacity: 0;\n    transform: scale(0.7);\n}\n";
var classes = {
  root: function root(_ref) {
    var props = _ref.props;
    return ['p-image p-component', {
      'p-image-preview-container': props.preview
    }];
  },
  image: function image(_ref2) {
    var props = _ref2.props;
    return props.image;
  },
  button: 'p-image-preview-indicator',
  icon: 'p-image-preview-icon',
  mask: 'p-image-mask p-component-overlay p-component-overlay-enter',
  rotateRightButton: 'p-image-action p-link',
  rotateLeftButton: 'p-image-action p-link',
  zoomOutButton: function zoomOutButton(_ref3) {
    var instance = _ref3.instance;
    return ['p-image-action p-link', {
      'p-disabled': instance.isZoomOutDisabled
    }];
  },
  zoomInButton: function zoomInButton(_ref4) {
    var instance = _ref4.instance;
    return ['p-image-action p-link', {
      'p-disabled': instance.isZoomInDisabled
    }];
  },
  closeButton: 'p-image-action p-link',
  preview: 'p-image-preview'
};
var _useStyle = useStyle(styles, {
    name: 'image',
    manual: true
  }),
  loadStyle = _useStyle.load;
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
      var isActionbarTarget = [event.target.classList].includes('p-image-action') || event.target.closest('.p-image-action');
      if (isActionbarTarget) {
        return;
      }
      if (!this.previewClick) {
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
          this.onMaskClick();
          setTimeout(function () {
            DomHandler.focus(_this2.$refs.previewButton);
          }, 25);
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

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var _hoisted_1 = ["aria-modal"];
var _hoisted_2 = ["aria-label"];
var _hoisted_3 = ["aria-label"];
var _hoisted_4 = ["disabled", "aria-label"];
var _hoisted_5 = ["disabled", "aria-label"];
var _hoisted_6 = ["aria-label"];
var _hoisted_7 = ["src"];
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
  }, _ctx.ptm('root'), {
    "data-pc-name": "image"
  }), [renderSlot(_ctx.$slots, "image", {
    onError: $options.onError
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
    "class": _ctx.cx('button'),
    onClick: _cache[1] || (_cache[1] = function () {
      return $options.onImageClick && $options.onImageClick.apply($options, arguments);
    })
  }, _objectSpread(_objectSpread({}, _ctx.previewButtonProps), _ctx.ptm('button'))), [renderSlot(_ctx.$slots, "indicatoricon", {}, function () {
    return [(openBlock(), createBlock(resolveDynamicComponent(_ctx.indicatorIcon ? 'i' : 'EyeIcon'), mergeProps({
      "class": _ctx.cx('icon')
    }, _ctx.ptm('icon')), null, 16, ["class"]))];
  })], 16)) : createCommentVNode("", true), createVNode(_component_Portal, null, {
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
        "class": "p-image-toolbar"
      }, _ctx.ptm('toolbar')), [createElementVNode("button", mergeProps({
        "class": _ctx.cx('rotateRightButton'),
        onClick: _cache[2] || (_cache[2] = function () {
          return $options.rotateRight && $options.rotateRight.apply($options, arguments);
        }),
        type: "button",
        "aria-label": $options.rightAriaLabel
      }, _ctx.ptm('rotateRightButton')), [renderSlot(_ctx.$slots, "refresh", {}, function () {
        return [createVNode(_component_RefreshIcon, normalizeProps(guardReactiveProps(_ctx.ptm('rotateRightIcon'))), null, 16)];
      })], 16, _hoisted_2), createElementVNode("button", mergeProps({
        "class": _ctx.cx('rotateLeftButton'),
        onClick: _cache[3] || (_cache[3] = function () {
          return $options.rotateLeft && $options.rotateLeft.apply($options, arguments);
        }),
        type: "button",
        "aria-label": $options.leftAriaLabel
      }, _ctx.ptm('rotateLeftButton')), [renderSlot(_ctx.$slots, "undo", {}, function () {
        return [createVNode(_component_UndoIcon, normalizeProps(guardReactiveProps(_ctx.ptm('rotateLeftIcon'))), null, 16)];
      })], 16, _hoisted_3), createElementVNode("button", mergeProps({
        "class": _ctx.cx('zoomOutButton'),
        onClick: _cache[4] || (_cache[4] = function () {
          return $options.zoomOut && $options.zoomOut.apply($options, arguments);
        }),
        type: "button",
        disabled: $options.isZoomOutDisabled,
        "aria-label": $options.zoomOutAriaLabel
      }, _ctx.ptm('zoomOutButton')), [renderSlot(_ctx.$slots, "zoomout", {}, function () {
        return [createVNode(_component_SearchMinusIcon, normalizeProps(guardReactiveProps(_ctx.ptm('zoomOutIcon'))), null, 16)];
      })], 16, _hoisted_4), createElementVNode("button", mergeProps({
        "class": _ctx.cx('zoomInButton'),
        onClick: _cache[5] || (_cache[5] = function () {
          return $options.zoomIn && $options.zoomIn.apply($options, arguments);
        }),
        type: "button",
        disabled: $options.isZoomInDisabled,
        "aria-label": $options.zoomInAriaLabel
      }, _ctx.ptm('zoomInButton')), [renderSlot(_ctx.$slots, "zoomin", {}, function () {
        return [createVNode(_component_SearchPlusIcon, normalizeProps(guardReactiveProps(_ctx.ptm('zoomInIcon'))), null, 16)];
      })], 16, _hoisted_5), createElementVNode("button", mergeProps({
        "class": _ctx.cx('closeButton'),
        type: "button",
        onClick: _cache[6] || (_cache[6] = function () {
          return $options.hidePreview && $options.hidePreview.apply($options, arguments);
        }),
        "aria-label": $options.closeAriaLabel,
        autofocus: ""
      }, _ctx.ptm('closeButton')), [renderSlot(_ctx.$slots, "close", {}, function () {
        return [createVNode(_component_TimesIcon, normalizeProps(guardReactiveProps(_ctx.ptm('closeIcon'))), null, 16)];
      })], 16, _hoisted_6)], 16), createVNode(Transition, {
        name: "p-image-preview",
        onBeforeEnter: $options.onBeforeEnter,
        onEnter: $options.onEnter,
        onLeave: $options.onLeave,
        onBeforeLeave: $options.onBeforeLeave,
        onAfterLeave: $options.onAfterLeave
      }, {
        "default": withCtx(function () {
          return [$data.previewVisible ? (openBlock(), createElementBlock("div", normalizeProps(mergeProps({
            key: 0
          }, _ctx.ptm('previewContainer'))), [renderSlot(_ctx.$slots, "preview", {
            style: normalizeStyle($options.imagePreviewStyle),
            onClick: $options.onPreviewImageClick
          }, function () {
            return [createElementVNode("img", mergeProps({
              src: _ctx.$attrs.src,
              "class": _ctx.cx('preview'),
              style: $options.imagePreviewStyle,
              onClick: _cache[7] || (_cache[7] = function () {
                return $options.onPreviewImageClick && $options.onPreviewImageClick.apply($options, arguments);
              })
            }, _ctx.ptm('preview')), null, 16, _hoisted_7)];
          })], 16)) : createCommentVNode("", true)];
        }),
        _: 3
      }, 8, ["onBeforeEnter", "onEnter", "onLeave", "onBeforeLeave", "onAfterLeave"])], 16, _hoisted_1)), [[_directive_focustrap]]) : createCommentVNode("", true)];
    }),
    _: 3
  })], 16);
}

script.render = render;

export { script as default };
