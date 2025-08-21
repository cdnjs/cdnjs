var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
var __objRest = (source, exclude) => {
  var target = {};
  for (var prop in source)
    if (__hasOwnProp.call(source, prop) && exclude.indexOf(prop) < 0)
      target[prop] = source[prop];
  if (source != null && __getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(source)) {
      if (exclude.indexOf(prop) < 0 && __propIsEnum.call(source, prop))
        target[prop] = source[prop];
    }
  return target;
};
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
var __async = (__this, __arguments, generator) => {
  return new Promise((resolve, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e) {
        reject(e);
      }
    };
    var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};
import { ref, onMounted, defineComponent, computed, createElementBlock, openBlock, normalizeClass, createCommentVNode, toDisplayString, Comment, warn, watch, withKeys, withModifiers, renderSlot, toRef, resolveComponent, createElementVNode, createBlock, resolveDynamicComponent, withCtx, createVNode, Fragment, renderList, createTextVNode, Transition, normalizeStyle, inject, mergeProps, useId, withDirectives, vModelCheckbox, createSlots, unref, shallowRef, getCurrentScope, onScopeDispose, shallowReadonly, resolveDirective, nextTick, vModelDynamic, onUnmounted, Teleport, toHandlers, vShow, provide, toRefs, reactive, vModelRadio, vModelText, getCurrentInstance } from "vue";
const H = '<path d="M11.53 2.3A1.85 1.85 0 0010 1.21 1.85 1.85 0 008.48 2.3L.36 16.36C-.48 17.81.21 19 1.88 19h16.24c1.67 0 2.36-1.19 1.52-2.64zM11 16H9v-2h2zm0-4H9V6h2z"/>', w = '<path d="M12.43 14.34A5 5 0 0110 15a5 5 0 113.95-2L17 16.09V3a2 2 0 00-2-2H5a2 2 0 00-2 2v14a2 2 0 002 2h10a2 2 0 001.45-.63z"/><circle cx="10" cy="10" r="3"/>', v1 = '<path d="M7 14.17 2.83 10l-1.41 1.41L7 17 19 5l-1.41-1.42z"/>', e1 = '<path d="M10 0a10 10 0 1010 10A10 10 0 0010 0m5.66 14.24-1.41 1.41L10 11.41l-4.24 4.25-1.42-1.42L8.59 10 4.34 5.76l1.42-1.42L10 8.59l4.24-4.24 1.41 1.41L11.41 10z"/>', z1 = '<path d="m4.34 2.93 12.73 12.73-1.41 1.41L2.93 4.35z"/><path d="M17.07 4.34 4.34 17.07l-1.41-1.41L15.66 2.93z"/>', L1 = '<path d="M10 15 2 5h16z"/>', S1 = '<path d="M13.728 1H6.272L1 6.272v7.456L6.272 19h7.456L19 13.728V6.272zM11 15H9v-2h2zm0-4H9V5h2z"/>', q1 = '<path d="m17.5 4.75-7.5 7.5-7.5-7.5L1 6.25l9 9 9-9z"/>', $1 = '<path d="M2 2a2 2 0 00-2 2v12a2 2 0 002 2h16a2 2 0 002-2V4a2 2 0 00-2-2zm-.17 13 4.09-5.25 2.92 3.51L12.92 8l5.25 7z"/>', l0 = '<path d="M19 3H1v14h18zM3 14l3.5-4.5 2.5 3L12.5 8l4.5 6z"/><path d="M19 5H1V3h18zm0 12H1v-2h18z"/>', i = '<path d="M8 19a1 1 0 001 1h2a1 1 0 001-1v-1H8zm9-12a7 7 0 10-12 4.9S7 14 7 15v1a1 1 0 001 1h4a1 1 0 001-1v-1c0-1 2-3.1 2-3.1A7 7 0 0017 7"/>', m0 = '<path d="M10 0C4.477 0 0 4.477 0 10s4.477 10 10 10 10-4.477 10-10S15.523 0 10 0M9 5h2v2H9zm0 4h2v6H9z"/>', H2 = '<path d="M3 1h2v18H3zm13.5 1.5L15 1l-9 9 9 9 1.5-1.5L9 10z"/>', g2 = '<path d="M15 1h2v18h-2zM3.5 2.5 11 10l-7.5 7.5L5 19l9-9-9-9z"/>', k2 = '<path d="M7 1 5.6 2.5 13 10l-7.4 7.5L7 19l9-9z"/>', W2 = '<path d="m4 10 9 9 1.4-1.5L7 10l7.4-7.5L13 1z"/>', a5 = '<path d="M12.2 13.6a7 7 0 111.4-1.4l5.4 5.4-1.4 1.4zM3 8a5 5 0 1010 0A5 5 0 003 8"/>', e5 = '<path d="M10 0 3 8h14zm0 18-7-8h14z"/>', L5 = '<path d="M10 20a10 10 0 010-20 10 10 0 110 20m-2-5 9-8.5L15.5 5 8 12 4.5 8.5 3 10z"/>', _5 = '<path d="m10 5 8 10H2z"/>', A3 = H, D3 = w, o4 = v1, l4 = e1, v4 = z1, g4 = L1, k4 = S1, y4 = q1, J4 = $1, c6 = l0, v6 = {
  langCodeMap: {
    ar: i
  },
  default: m0
}, t7 = {
  ltr: H2,
  shouldFlip: true
}, h7 = {
  ltr: g2,
  shouldFlip: true
}, e7 = {
  ltr: k2,
  shouldFlip: true
}, L7 = {
  ltr: W2,
  shouldFlip: true
}, U7 = a5, K7 = e5, o8 = L5, w8 = _5;
function h9(c, s, o) {
  if (typeof c == "string" || "path" in c)
    return c;
  if ("shouldFlip" in c)
    return c.ltr;
  if ("rtl" in c)
    return o === "rtl" ? c.rtl : c.ltr;
  const v = s in c.langCodeMap ? c.langCodeMap[s] : c.default;
  return typeof v == "string" || "path" in v ? v : v.ltr;
}
function o9(c, s) {
  if (typeof c == "string")
    return false;
  if ("langCodeMap" in c) {
    const o = s in c.langCodeMap ? c.langCodeMap[s] : c.default;
    if (typeof o == "string")
      return false;
    c = o;
  }
  if ("shouldFlipExceptions" in c && Array.isArray(c.shouldFlipExceptions)) {
    const o = c.shouldFlipExceptions.indexOf(s);
    return o === void 0 || o === -1;
  }
  return "shouldFlip" in c ? c.shouldFlip : false;
}
function useComputedDirection(root) {
  const computedDir = ref(null);
  onMounted(() => {
    const dir = window.getComputedStyle(root.value).direction;
    computedDir.value = dir === "ltr" || dir === "rtl" ? dir : null;
  });
  return computedDir;
}
function useComputedLanguage(root) {
  const computedLang = ref("");
  onMounted(() => {
    let ancestor = root.value;
    while (ancestor && ancestor.lang === "") {
      ancestor = ancestor.parentElement;
    }
    computedLang.value = ancestor ? ancestor.lang : null;
  });
  return computedLang;
}
function makeStringTypeValidator(allowedValues) {
  return (s) => typeof s === "string" && allowedValues.includes(s);
}
const LibraryPrefix = "cdx";
const ButtonActions = [
  "default",
  "progressive",
  "destructive"
];
const ButtonWeights = [
  "normal",
  "primary",
  "quiet"
];
const ButtonSizes = [
  "small",
  "medium",
  "large"
];
const IconSizes = [
  "x-small",
  "small",
  "medium"
];
const StatusTypes = [
  "notice",
  "warning",
  "error",
  "success"
];
const statusTypeValidator = makeStringTypeValidator(StatusTypes);
const TextInputTypes = [
  "text",
  "search",
  "number",
  "email",
  "month",
  "password",
  "tel",
  "url",
  "week",
  "date",
  "datetime-local",
  "time"
];
const ValidationStatusTypes = [
  "default",
  "warning",
  "error",
  "success"
];
const TableTextAlignments = [
  "start",
  "center",
  "end",
  // Numbers should be aligned to the right in all reading directionalities.
  "number"
];
const ImageAspectRatios = [
  "16:9",
  "3:2",
  "4:3",
  "1:1",
  "3:4",
  "2:3"
];
const imageAspectRatioValidator = makeStringTypeValidator(ImageAspectRatios);
const ObjectFitOptions = [
  "fill",
  "contain",
  "cover",
  "none",
  "scale-down"
];
const objectFitValidator = makeStringTypeValidator(ObjectFitOptions);
const ObjectPositions = [
  "top",
  "bottom",
  "left",
  "right",
  "center"
];
const imagePositionValidator = makeStringTypeValidator(ObjectPositions);
const DebounceInterval = 120;
const PendingDelay = 500;
const MenuFooterValue = "cdx-menu-footer-item";
const TabsKey = Symbol("CdxTabs");
const ActiveTabKey = Symbol("CdxActiveTab");
const AllowArbitraryKey = Symbol("CdxAllowArbitrary");
const FieldInputIdKey = Symbol("CdxFieldInputId");
const FieldDescriptionIdKey = Symbol("CdxFieldDescriptionId");
const FieldStatusKey = Symbol("CdxFieldStatus");
const DisabledKey = Symbol("CdxDisabled");
const NoInvertClass = "".concat(LibraryPrefix, "-no-invert");
const TableRowIdentifier = Symbol("CdxTableRowIdentifier");
const TablePaginationPositions = [
  "top",
  "bottom",
  "both"
];
const oppositeSides = {
  left: "right",
  "left-start": "right",
  "left-end": "right",
  top: "bottom",
  "top-start": "bottom",
  "top-end": "bottom",
  bottom: "top",
  "bottom-start": "top",
  "bottom-end": "top",
  right: "left",
  "right-start": "left",
  "right-end": "left"
};
const iconSizeValidator = makeStringTypeValidator(IconSizes);
const _sfc_main$B = defineComponent({
  name: "CdxIcon",
  props: {
    /** The SVG path or an object containing that path plus other data. */
    icon: {
      type: [String, Object],
      required: true
    },
    /**
     * Accessible label for the icon. If not included, the icon will be hidden from screen
     * readers via `aria-hidden="true"`. Browsers also display this label as a tooltip when the
     * user hovers over the icon. Note that this label is not rendered as visible text next
     * to the icon.
     */
    iconLabel: {
      type: String,
      default: ""
    },
    /**
     * Explicitly set the language code to use for the icon. See
     * https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/lang.
     * Defaults to the lang attribute of the nearest ancestor at mount time.
     */
    lang: {
      type: String,
      default: null
    },
    /**
     * Explicitly set the direction to use for the icon. See
     * https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/dir.
     * Defaults to the computed direction at mount time.
     */
    dir: {
      type: String,
      default: null
    },
    /**
     * Specify icon size by choosing one of several pre-defined size
     * options. See the type documentation for supported size options.
     * The `medium` size is used by default if no size prop is provided.
     */
    size: {
      type: String,
      default: "medium",
      validator: iconSizeValidator
    }
  },
  setup(props) {
    const rootElement = ref();
    const computedDir = useComputedDirection(rootElement);
    const computedLang = useComputedLanguage(rootElement);
    const overriddenDir = computed(() => {
      var _a;
      return (_a = props.dir) != null ? _a : computedDir.value;
    });
    const overriddenLang = computed(() => {
      var _a;
      return (_a = props.lang) != null ? _a : computedLang.value;
    });
    const rootClasses = computed(() => ({
      "cdx-icon--flipped": overriddenDir.value === "rtl" && overriddenLang.value !== null && o9(props.icon, overriddenLang.value),
      ["cdx-icon--".concat(props.size)]: true
    }));
    const resolvedIcon = computed(
      () => {
        var _a, _b;
        return h9(props.icon, (_a = overriddenLang.value) != null ? _a : "", (_b = overriddenDir.value) != null ? _b : "ltr");
      }
    );
    const iconSvg = computed(() => typeof resolvedIcon.value === "string" ? resolvedIcon.value : "");
    const iconPath = computed(() => typeof resolvedIcon.value !== "string" ? resolvedIcon.value.path : "");
    return {
      rootElement,
      rootClasses,
      iconSvg,
      iconPath
    };
  }
});
const _export_sfc = (sfc, props) => {
  const target = sfc.__vccOpts || sfc;
  for (const [key, val] of props) {
    target[key] = val;
  }
  return target;
};
const _hoisted_1$y = ["aria-hidden"];
const _hoisted_2$l = { key: 0 };
const _hoisted_3$e = ["innerHTML"];
const _hoisted_4$b = ["d"];
function _sfc_render$B(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock(
    "span",
    {
      ref: "rootElement",
      class: normalizeClass(["cdx-icon", _ctx.rootClasses])
    },
    [
      (openBlock(), createElementBlock("svg", {
        xmlns: "http://www.w3.org/2000/svg",
        width: "20",
        height: "20",
        viewBox: "0 0 20 20",
        "aria-hidden": _ctx.iconLabel ? void 0 : true
      }, [
        _ctx.iconLabel ? (openBlock(), createElementBlock(
          "title",
          _hoisted_2$l,
          toDisplayString(_ctx.iconLabel),
          1
          /* TEXT */
        )) : createCommentVNode("v-if", true),
        _ctx.iconSvg ? (openBlock(), createElementBlock("g", {
          key: 1,
          innerHTML: _ctx.iconSvg
        }, null, 8, _hoisted_3$e)) : (openBlock(), createElementBlock("path", {
          key: 2,
          d: _ctx.iconPath
        }, null, 8, _hoisted_4$b))
      ], 8, _hoisted_1$y))
    ],
    2
    /* CLASS */
  );
}
const CdxIcon = /* @__PURE__ */ _export_sfc(_sfc_main$B, [["render", _sfc_render$B]]);
function flattenSlotContents(slotContents) {
  const flattened = [];
  for (const node of slotContents) {
    if (
      // HTML tag
      typeof node.type === "string" || // Component
      typeof node.type === "object"
    ) {
      flattened.push(node);
    } else if (node.type !== Comment) {
      if (typeof node.children === "string" && node.children.trim() !== "") {
        flattened.push(node.children);
      } else if (Array.isArray(node.children)) {
        flattened.push(...flattenSlotContents(node.children));
      }
    }
  }
  return flattened;
}
function isComponentVNode(node, componentName) {
  if (typeof node.type === "object" && "name" in node.type) {
    if (componentName !== void 0) {
      return node.type.name === componentName;
    }
    return true;
  }
  return false;
}
function isTagVNode(node, tagName) {
  if (typeof node.type === "string") {
    {
      return node.type === tagName.toLowerCase();
    }
  }
  return false;
}
function useSlotContents(slot) {
  const slotContents = typeof slot === "function" ? slot() : slot;
  return slotContents ? flattenSlotContents(slotContents) : [];
}
function useWarnOnce(shouldWarn, message) {
  if (shouldWarn()) {
    warn(message);
    return;
  }
  const stop = watch(shouldWarn, (newValue) => {
    if (newValue) {
      warn(message);
      stop();
    }
  });
}
function useIconOnlyButton(slot, attrs, componentName) {
  const isIconOnly = computed(() => {
    const slotContents = useSlotContents(slot);
    if (slotContents.length !== 1) {
      return false;
    }
    const soleNode = slotContents[0];
    if (typeof soleNode === "object" && (isComponentVNode(soleNode, "CdxIcon") || isTagVNode(soleNode, "svg"))) {
      return true;
    }
    return false;
  });
  useWarnOnce(
    () => isIconOnly.value && !attrs["aria-label"] && !attrs["aria-hidden"],
    "".concat(componentName, ": Icon-only buttons require one of the following attributes: aria-label or aria-hidden. See documentation at https://doc.wikimedia.org/codex/latest/components/demos/button.html#icon-only-button")
  );
  return isIconOnly;
}
const buttonActionValidator = makeStringTypeValidator(ButtonActions);
const buttonWeightValidator = makeStringTypeValidator(ButtonWeights);
const buttonSizeValidator = makeStringTypeValidator(ButtonSizes);
const _sfc_main$A = defineComponent({
  name: "CdxButton",
  props: {
    /**
     * The kind of action that will be taken on click.
     *
     * @values 'default', 'progressive', 'destructive'
     */
    action: {
      type: String,
      default: "default",
      validator: buttonActionValidator
    },
    /**
     * Visual prominence of Button.
     *
     * @values 'normal', 'primary', 'quiet'
     */
    weight: {
      type: String,
      default: "normal",
      validator: buttonWeightValidator
    },
    /**
     * Button size.
     *
     * Medium: Default for most cases.
     * Large: Use rarely, mainly for icon-only buttons on touchscreens.
     * Small: Use in tight spaces or inline with text.
     * Avoid on touchscreens - prefer medium for better accessibility.
     *
     * @values 'small', 'medium', 'large'
     */
    size: {
      type: String,
      default: "medium",
      validator: buttonSizeValidator
    }
  },
  emits: ["click"],
  setup(props, { emit, slots, attrs }) {
    const button = ref();
    const isIconOnly = useIconOnlyButton(slots.default, attrs, "CdxButton");
    const isActive = ref(false);
    const rootClasses = computed(() => ({
      ["cdx-button--action-".concat(props.action)]: true,
      ["cdx-button--weight-".concat(props.weight)]: true,
      ["cdx-button--size-".concat(props.size)]: true,
      "cdx-button--framed": props.weight !== "quiet",
      "cdx-button--icon-only": isIconOnly.value,
      "cdx-button--is-active": isActive.value
    }));
    const onClick = (event) => {
      emit("click", event);
    };
    const setActive = (active) => {
      isActive.value = active;
    };
    function onKeyDown() {
      setActive(true);
    }
    function onKeyUp() {
      var _a;
      setActive(false);
      (_a = button.value) == null ? void 0 : _a.click();
    }
    return {
      button,
      rootClasses,
      onClick,
      onKeyDown,
      onKeyUp
    };
  }
});
function _sfc_render$A(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock(
    "button",
    {
      ref: "button",
      class: normalizeClass(["cdx-button", _ctx.rootClasses]),
      onKeydown: _cache[0] || (_cache[0] = withKeys(withModifiers((...args) => _ctx.onKeyDown && _ctx.onKeyDown(...args), ["prevent"]), ["space", "enter"])),
      onKeyup: _cache[1] || (_cache[1] = withKeys((...args) => _ctx.onKeyUp && _ctx.onKeyUp(...args), ["space", "enter"])),
      onClick: _cache[2] || (_cache[2] = (...args) => _ctx.onClick && _ctx.onClick(...args))
    },
    [
      renderSlot(_ctx.$slots, "default")
    ],
    34
    /* CLASS, NEED_HYDRATION */
  );
}
const CdxButton = /* @__PURE__ */ _export_sfc(_sfc_main$A, [["render", _sfc_render$A]]);
function useOptionalModelWrapper(internalValueRef, modelValueRef, emit, eventName) {
  return computed({
    get: () => {
      var _a;
      return (_a = modelValueRef.value) != null ? _a : internalValueRef.value;
    },
    set: (value) => {
      if (modelValueRef.value !== null) {
        emit(eventName || "update:modelValue", value);
      } else {
        internalValueRef.value = value;
      }
    }
  });
}
const _sfc_main$z = defineComponent({
  name: "CdxAccordion",
  components: { CdxButton, CdxIcon },
  props: {
    /**
     * This component accepts an optional v-model binding; use it if you
     * want to programmatically control the Accordion's open/closed state.
     * If this feature is not needed, you can omit `v-model` and just use
     * the "open" attribute if you want the component to render in the
     * expanded state.
     */
    modelValue: {
      type: [Boolean, null],
      default: null
    },
    /**
     * Forces the accordion to show the action icon.
     */
    actionAlwaysVisible: {
      type: Boolean,
      default: false
    },
    /**
     * The icon that will be displayed on the right side of the accordion header when expanded.
     *
     */
    actionIcon: {
      type: [String, Object],
      default: null
    },
    /**
     * Label for the action button. If an action icon is being used, then a label for that icon
     * should be provided for ARIA support.
     */
    actionButtonLabel: {
      type: String,
      default: ""
    },
    /**
     * The heading level of the accordion title.
     *
     * @values 'h1', 'h2', 'h3', 'h4', 'h5', 'h6'
     */
    headingLevel: {
      type: String,
      default: "h3"
    }
  },
  emits: [
    /**
     * When the action button is clicked.
     *
     */
    "action-button-click",
    /**
     * When the "open" state changes. Only emitted if v-model binding
     * is used in the parent scope.
     *
     * @param {boolean} newVal
     */
    "update:modelValue",
    /**
     * When the Accordion is toggled open or closed. Always emitted
     * regardless of v-model binding.
     *
     * @param {boolean} isOpen
     */
    "toggle"
  ],
  setup(props, { attrs, emit }) {
    const internalOpen = ref("open" in attrs);
    const computedOpen = useOptionalModelWrapper(
      internalOpen,
      toRef(props, "modelValue"),
      emit
    );
    const emitActionButtonClick = () => {
      emit("action-button-click");
    };
    const onToggle = (e) => {
      computedOpen.value = e.newState === "open";
      emit("toggle", computedOpen.value);
    };
    const shouldShowActionButton = computed(() => {
      if (props.actionIcon) {
        if (computedOpen.value) {
          return true;
        } else if (props.actionAlwaysVisible) {
          return true;
        } else {
          return false;
        }
      } else {
        return false;
      }
    });
    const rootClasses = computed(() => ({
      "cdx-accordion--has-icon": shouldShowActionButton.value
    }));
    return {
      emitActionButtonClick,
      rootClasses,
      shouldShowActionButton,
      onToggle,
      computedOpen
    };
  }
});
const _hoisted_1$x = ["open"];
const _hoisted_2$k = { class: "cdx-accordion__header__title" };
const _hoisted_3$d = { class: "cdx-accordion__header__description" };
function _sfc_render$z(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_cdx_icon = resolveComponent("cdx-icon");
  const _component_cdx_button = resolveComponent("cdx-button");
  return openBlock(), createElementBlock("details", {
    class: normalizeClass(["cdx-accordion", _ctx.rootClasses]),
    open: _ctx.computedOpen || void 0,
    onToggle: _cache[1] || (_cache[1] = (...args) => _ctx.onToggle && _ctx.onToggle(...args))
  }, [
    createElementVNode("summary", null, [
      (openBlock(), createBlock(resolveDynamicComponent(_ctx.headingLevel), { class: "cdx-accordion__header" }, {
        default: withCtx(() => [
          createElementVNode("span", _hoisted_2$k, [
            renderSlot(_ctx.$slots, "title")
          ]),
          createElementVNode("span", _hoisted_3$d, [
            renderSlot(_ctx.$slots, "description")
          ])
        ]),
        _: 3
        /* FORWARDED */
      })),
      _ctx.shouldShowActionButton ? (openBlock(), createBlock(_component_cdx_button, {
        key: 0,
        class: "cdx-accordion__action",
        "aria-label": _ctx.actionButtonLabel,
        type: "button",
        weight: "quiet",
        onClick: withModifiers(_ctx.emitActionButtonClick, ["stop"])
      }, {
        default: withCtx(() => [
          createVNode(_component_cdx_icon, {
            icon: _ctx.actionIcon,
            "icon-label": _ctx.actionButtonLabel,
            size: "medium"
          }, null, 8, ["icon", "icon-label"])
        ]),
        _: 1
        /* STABLE */
      }, 8, ["aria-label", "onClick"])) : createCommentVNode("v-if", true)
    ]),
    createElementVNode("div", {
      class: "cdx-accordion__content",
      onClick: _cache[0] || (_cache[0] = withModifiers(() => {
      }, ["stop"]))
    }, [
      renderSlot(_ctx.$slots, "default")
    ])
  ], 42, _hoisted_1$x);
}
const Accordion = /* @__PURE__ */ _export_sfc(_sfc_main$z, [["render", _sfc_render$z]]);
function getButtonLabel(button) {
  if (button.label === void 0) {
    return button.value;
  }
  if (button.label === null) {
    return "";
  }
  return button.label;
}
function useButtonGroupKeyboardNav(buttonsProp) {
  const rootElement = ref();
  const focusedButtonIndex = ref();
  const buttonRefs = ref(/* @__PURE__ */ new Map());
  const currentDirection = useComputedDirection(rootElement);
  function assignTemplateRef(templateRef, index) {
    const button = templateRef;
    if (button) {
      buttonRefs.value.set(index, button);
    }
  }
  function onFocus(index) {
    focusedButtonIndex.value = index;
  }
  function onBlur() {
    focusedButtonIndex.value = void 0;
  }
  function focusNonDisabled(index, increment) {
    var _a;
    const newIndex = index + increment;
    const targetButton = buttonsProp.value[newIndex];
    if (targetButton) {
      if (targetButton.disabled) {
        focusNonDisabled(newIndex, increment);
      } else {
        const buttonElement = (_a = buttonRefs.value.get(newIndex)) == null ? void 0 : _a.$el;
        buttonElement == null ? void 0 : buttonElement.focus();
      }
    }
  }
  function next() {
    var _a;
    focusNonDisabled((_a = focusedButtonIndex.value) != null ? _a : -1, 1);
  }
  function prev() {
    var _a;
    focusNonDisabled((_a = focusedButtonIndex.value) != null ? _a : buttonsProp.value.length, -1);
  }
  function moveRight() {
    if (currentDirection.value === "rtl") {
      prev();
    } else {
      next();
    }
  }
  function moveLeft() {
    if (currentDirection.value === "rtl") {
      next();
    } else {
      prev();
    }
  }
  function onKeydown(e) {
    switch (e.key) {
      case "ArrowRight":
        e.preventDefault();
        moveRight();
        break;
      case "ArrowLeft":
        e.preventDefault();
        moveLeft();
        break;
      case "ArrowDown":
        e.preventDefault();
        next();
        break;
      case "ArrowUp":
        e.preventDefault();
        prev();
        break;
    }
  }
  return {
    rootElement,
    assignTemplateRef,
    onFocus,
    onBlur,
    onKeydown
  };
}
const _sfc_main$y = defineComponent({
  name: "CdxButtonGroup",
  components: {
    CdxButton,
    CdxIcon
  },
  props: {
    /**
     * Objects describing the buttons in the group. See the ButtonGroupItem type.
     */
    buttons: {
      type: Array,
      required: true,
      validator: (value) => Array.isArray(value) && value.length >= 1
    },
    /**
     * Whether the entire group is disabled.
     *
     * If this is set to true, all buttons in the group are disabled. Buttons can also be
     * disabled individually by setting their `disabled` property to true.
     */
    disabled: {
      type: Boolean,
      default: false
    }
  },
  emits: [
    /**
     * Emitted when a button is clicked
     *
     * @property {string | number} value The `value` property of the button that was clicked
     */
    "click"
  ],
  setup(props) {
    const {
      rootElement,
      assignTemplateRef,
      onFocus,
      onBlur,
      onKeydown
    } = useButtonGroupKeyboardNav(toRef(props, "buttons"));
    return {
      rootElement,
      assignTemplateRef,
      onFocus,
      onBlur,
      onKeydown,
      getButtonLabel
    };
  }
});
const _hoisted_1$w = {
  ref: "rootElement",
  class: "cdx-button-group"
};
function _sfc_render$y(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_cdx_icon = resolveComponent("cdx-icon");
  const _component_cdx_button = resolveComponent("cdx-button");
  return openBlock(), createElementBlock(
    "div",
    _hoisted_1$w,
    [
      (openBlock(true), createElementBlock(
        Fragment,
        null,
        renderList(_ctx.buttons, (button, index) => {
          return openBlock(), createBlock(_component_cdx_button, {
            key: button.value,
            ref_for: true,
            ref: (ref2) => _ctx.assignTemplateRef(ref2, index),
            disabled: button.disabled || _ctx.disabled,
            "aria-label": button.ariaLabel,
            onClick: ($event) => _ctx.$emit("click", button.value),
            onFocus: ($event) => _ctx.onFocus(index),
            onBlur: _ctx.onBlur,
            onKeydown: _ctx.onKeydown
          }, {
            default: withCtx(() => [
              renderSlot(_ctx.$slots, "default", { button }, () => [
                button.icon ? (openBlock(), createBlock(_component_cdx_icon, {
                  key: 0,
                  icon: button.icon
                }, null, 8, ["icon"])) : createCommentVNode("v-if", true),
                createTextVNode(
                  " " + toDisplayString(_ctx.getButtonLabel(button)),
                  1
                  /* TEXT */
                )
              ])
            ]),
            _: 2
            /* DYNAMIC */
          }, 1032, ["disabled", "aria-label", "onClick", "onFocus", "onBlur", "onKeydown"]);
        }),
        128
        /* KEYED_FRAGMENT */
      ))
    ],
    512
    /* NEED_PATCH */
  );
}
const ButtonGroup = /* @__PURE__ */ _export_sfc(_sfc_main$y, [["render", _sfc_render$y]]);
const _sfc_main$x = defineComponent({
  name: "CdxThumbnail",
  components: { CdxIcon },
  props: {
    /**
     * Thumbnail data.
     */
    thumbnail: {
      type: [Object, null],
      default: null
    },
    /**
     * Thumbnail placeholder icon.
     */
    placeholderIcon: {
      type: [String, Object],
      default: c6
    }
  },
  setup: (props) => {
    const thumbnailLoaded = ref(false);
    const thumbnailStyle = ref({});
    const preloadThumbnail = (url) => {
      const escapedUrl = url.replace(/([\\"\n])/g, "\\$1");
      const image = new Image();
      image.onload = () => {
        thumbnailStyle.value = { backgroundImage: 'url("'.concat(escapedUrl, '")') };
        thumbnailLoaded.value = true;
      };
      image.onerror = () => {
        thumbnailLoaded.value = false;
      };
      image.src = escapedUrl;
    };
    onMounted(() => {
      var _a;
      if ((_a = props.thumbnail) == null ? void 0 : _a.url) {
        preloadThumbnail(props.thumbnail.url);
      }
    });
    watch(toRef(props, "thumbnail"), (newThumbnail, oldThumbnail) => {
      if (!(newThumbnail == null ? void 0 : newThumbnail.url)) {
        thumbnailLoaded.value = false;
        thumbnailStyle.value = {};
        return;
      }
      if ((oldThumbnail == null ? void 0 : oldThumbnail.url) !== newThumbnail.url) {
        thumbnailLoaded.value = false;
        preloadThumbnail(newThumbnail.url);
      }
    }, { deep: true });
    return {
      thumbnailStyle,
      thumbnailLoaded,
      NoInvertClass
    };
  }
});
const _hoisted_1$v = { class: "cdx-thumbnail" };
const _hoisted_2$j = {
  key: 0,
  class: "cdx-thumbnail__placeholder"
};
function _sfc_render$x(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_cdx_icon = resolveComponent("cdx-icon");
  return openBlock(), createElementBlock("span", _hoisted_1$v, [
    !_ctx.thumbnailLoaded ? (openBlock(), createElementBlock("span", _hoisted_2$j, [
      createVNode(_component_cdx_icon, {
        icon: _ctx.placeholderIcon,
        class: "cdx-thumbnail__placeholder__icon--vue"
      }, null, 8, ["icon"])
    ])) : createCommentVNode("v-if", true),
    createVNode(Transition, { name: "cdx-thumbnail__image" }, {
      default: withCtx(() => [
        _ctx.thumbnailLoaded ? (openBlock(), createElementBlock(
          "span",
          {
            key: 0,
            style: normalizeStyle(_ctx.thumbnailStyle),
            class: normalizeClass([_ctx.NoInvertClass, "cdx-thumbnail__image"])
          },
          null,
          6
          /* CLASS, STYLE */
        )) : createCommentVNode("v-if", true)
      ]),
      _: 1
      /* STABLE */
    })
  ]);
}
const CdxThumbnail = /* @__PURE__ */ _export_sfc(_sfc_main$x, [["render", _sfc_render$x]]);
const _sfc_main$w = defineComponent({
  name: "CdxCard",
  components: { CdxIcon, CdxThumbnail },
  props: {
    /**
     * If provided, the Card will be a link to this URL.
     */
    url: {
      type: String,
      default: ""
    },
    /**
     * Icon displayed at the start of the Card.
     */
    icon: {
      type: [String, Object],
      default: ""
    },
    /**
     * Thumbnail image data for the Card.
     */
    thumbnail: {
      type: [Object, null],
      default: null
    },
    /**
     * Option to force a thumbnail layout.
     *
     * When set to `true`, the Card will display a Thumbnail. If a `thumbnail` prop was also
     * provided, the thumbnail image will display. Otherwise, a placeholder icon will display.
     *
     * This is useful when displaying groups of Cards when some of the cards have thumbnail
     * images but some do not. `forceThumbnail` will provide a consistent layout for that group.
     *
     * Note that this prop is not needed to display a thumbnail image: if the `thumbnail` prop
     * is provided, it will display. This prop is only needed to enable the display of the
     * thumbnail placeholder icon when the `thumbnail` prop is not provided.
     */
    forceThumbnail: {
      type: Boolean,
      default: false
    },
    /**
     * Optional custom icon for the placeholder shown when `forceThumbnail` is true but no
     * thumbnail is provided.
     *
     * Defaults to the default placeholder icon set in the Thumbnail component.
     */
    customPlaceholderIcon: {
      type: [String, Object],
      default: void 0
    }
  },
  setup(props) {
    const isLink = computed(() => !!props.url);
    const contentTag = computed(() => isLink.value ? "a" : "span");
    const cardLink = computed(() => isLink.value ? props.url : void 0);
    return {
      isLink,
      contentTag,
      cardLink
    };
  }
});
const _hoisted_1$u = { class: "cdx-card__text" };
const _hoisted_2$i = { class: "cdx-card__text__title" };
const _hoisted_3$c = {
  key: 0,
  class: "cdx-card__text__description"
};
const _hoisted_4$a = {
  key: 1,
  class: "cdx-card__text__supporting-text"
};
function _sfc_render$w(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_cdx_thumbnail = resolveComponent("cdx-thumbnail");
  const _component_cdx_icon = resolveComponent("cdx-icon");
  return openBlock(), createBlock(resolveDynamicComponent(_ctx.contentTag), {
    href: _ctx.cardLink,
    class: normalizeClass(["cdx-card", {
      "cdx-card--is-link": _ctx.isLink,
      // Include dynamic classes in the template so that $slots is reactive.
      "cdx-card--title-only": !_ctx.$slots.description && !_ctx.$slots["supporting-text"]
    }])
  }, {
    default: withCtx(() => [
      _ctx.thumbnail || _ctx.forceThumbnail ? (openBlock(), createBlock(_component_cdx_thumbnail, {
        key: 0,
        thumbnail: _ctx.thumbnail,
        "placeholder-icon": _ctx.customPlaceholderIcon,
        class: "cdx-card__thumbnail"
      }, null, 8, ["thumbnail", "placeholder-icon"])) : _ctx.icon ? (openBlock(), createBlock(_component_cdx_icon, {
        key: 1,
        icon: _ctx.icon,
        class: "cdx-card__icon"
      }, null, 8, ["icon"])) : createCommentVNode("v-if", true),
      createElementVNode("span", _hoisted_1$u, [
        createElementVNode("span", _hoisted_2$i, [
          renderSlot(_ctx.$slots, "title")
        ]),
        _ctx.$slots.description ? (openBlock(), createElementBlock("span", _hoisted_3$c, [
          renderSlot(_ctx.$slots, "description")
        ])) : createCommentVNode("v-if", true),
        _ctx.$slots["supporting-text"] ? (openBlock(), createElementBlock("span", _hoisted_4$a, [
          renderSlot(_ctx.$slots, "supporting-text")
        ])) : createCommentVNode("v-if", true)
      ])
    ]),
    _: 3
    /* FORWARDED */
  }, 8, ["href", "class"]);
}
const Card = /* @__PURE__ */ _export_sfc(_sfc_main$w, [["render", _sfc_render$w]]);
function useComputedDisabled(disabledProp) {
  const providedDisabled = inject(DisabledKey, ref(false));
  return computed(() => providedDisabled.value || disabledProp.value);
}
function useFieldData(disabledProp, statusProp, idAttr) {
  const computedDisabled = useComputedDisabled(disabledProp);
  const providedStatus = inject(FieldStatusKey, ref("default"));
  const computedStatus = computed(() => {
    if ((statusProp == null ? void 0 : statusProp.value) && statusProp.value !== "default") {
      return statusProp.value;
    }
    return providedStatus.value;
  });
  const providedId = inject(FieldInputIdKey, void 0);
  const computedInputId = computed(() => {
    var _a;
    return (_a = providedId == null ? void 0 : providedId.value) != null ? _a : idAttr;
  });
  return {
    computedDisabled,
    computedStatus,
    computedInputId
  };
}
function useSplitAttributes(attrs, internalClasses = computed(() => ({}))) {
  const rootClasses = computed(() => {
    const classRecord = __objRest(internalClasses.value, []);
    if (attrs.class) {
      const providedClasses = attrs.class.split(" ");
      providedClasses.forEach((className) => {
        classRecord[className] = true;
      });
    }
    return classRecord;
  });
  const rootStyle = computed(() => {
    if ("style" in attrs) {
      return attrs.style;
    }
    return void 0;
  });
  const otherAttrs = computed(() => {
    const _a = attrs, { class: _ignoredClass, style: _ignoredStyle } = _a, attrsCopy = __objRest(_a, ["class", "style"]);
    return attrsCopy;
  });
  return {
    rootClasses,
    rootStyle,
    otherAttrs
  };
}
function useI18n(messageKey, defaultValue, params = []) {
  const providedI18nFunc = inject("CdxI18nFunction", void 0);
  return computed(() => {
    const unwrappedParams = params.map((p) => typeof p === "function" ? p() : p.value);
    const fromProvidedFunc = providedI18nFunc == null ? void 0 : providedI18nFunc(messageKey, ...unwrappedParams);
    if (fromProvidedFunc !== void 0 && fromProvidedFunc !== null) {
      return fromProvidedFunc;
    }
    return typeof defaultValue === "function" ? defaultValue(...unwrappedParams) : defaultValue;
  });
}
function useI18nWithOverride(override, messageKey, defaultValue, params = []) {
  const translatedMessage = useI18n(messageKey, defaultValue, params);
  return computed(() => override.value || translatedMessage.value);
}
const _sfc_main$v = defineComponent({
  name: "CdxLabel",
  components: { CdxIcon },
  /**
   * We want the label or legend to inherit attributes, not the root element.
   */
  inheritAttrs: false,
  props: {
    /**
     * Icon before the label text.
     *
     * Do not use this if including a start icon within the input component.
     */
    icon: {
      type: [String, Object],
      default: null
    },
    /**
     * Whether the field is optional.
     *
     * This will add a flag next to the label indicating that the field is optional.
     */
    optional: {
      type: Boolean,
      default: false
    },
    // DEPRECATED: set default to '(optional)' and remove validator (T368444).
    /**
     * Text to indicate that the field is optional.
     *
     * Omit this prop to use the default value, "(optional)".
     */
    optionalFlag: {
      type: String,
      default: "",
      validator: (value, props) => {
        if (value.length > 0 && !props.optional) {
          console.warn(
            "[CdxLabel]: The boolean `optional` prop is required to show the optional flag.\n\nRefer to https://doc.wikimedia.org/codex/latest/components/demos/label.html#props."
          );
          return false;
        }
        return true;
      }
    },
    /**
     * Whether the label should be visually hidden.
     */
    visuallyHidden: {
      type: Boolean,
      default: false
    },
    /**
     * Whether this component should output a `<legend>` element.
     *
     * Always set this to true when this component is used inside a `<fieldset>` element. Do not
     * set it to true otherwise.
     */
    isLegend: {
      type: Boolean,
      default: false
    },
    /**
     * The ID of the input/control this label is for.
     *
     * Will be added as the `for` attribute of the `<label>`. Not needed for `<legend>`.
     */
    inputId: {
      type: String,
      default: ""
    },
    /**
     * The ID of the description element.
     *
     * This ID can be used for the `aria-describedby` attribute of the input.
     */
    descriptionId: {
      type: String,
      default: ""
    },
    /**
     * Whether this label is for a disabled field or input.
     */
    disabled: {
      type: Boolean,
      default: false
    }
  },
  setup(props, { attrs }) {
    const { computedDisabled } = useFieldData(toRef(props, "disabled"));
    const internalClasses = computed(() => ({
      "cdx-label--visually-hidden": props.visuallyHidden,
      "cdx-label--disabled": computedDisabled.value
    }));
    const {
      rootClasses,
      rootStyle,
      otherAttrs
    } = useSplitAttributes(attrs, internalClasses);
    const translatedOptionalFlag = useI18nWithOverride(
      toRef(props, "optionalFlag"),
      "cdx-label-optional-flag",
      "(optional)"
    );
    return {
      rootClasses,
      rootStyle,
      otherAttrs,
      translatedOptionalFlag
    };
  }
});
const _hoisted_1$t = ["for"];
const _hoisted_2$h = { class: "cdx-label__label__text" };
const _hoisted_3$b = {
  key: 1,
  class: "cdx-label__label__optional-flag"
};
const _hoisted_4$9 = ["id"];
const _hoisted_5$9 = { class: "cdx-label__label" };
const _hoisted_6$7 = { class: "cdx-label__label__text" };
const _hoisted_7$3 = {
  key: 1,
  class: "cdx-label__label__optional-flag"
};
const _hoisted_8$3 = {
  key: 0,
  class: "cdx-label__description"
};
function _sfc_render$v(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_cdx_icon = resolveComponent("cdx-icon");
  return !_ctx.isLegend ? (openBlock(), createElementBlock(
    "div",
    {
      key: 0,
      class: normalizeClass(["cdx-label", _ctx.rootClasses]),
      style: normalizeStyle(_ctx.rootStyle)
    },
    [
      createElementVNode("label", mergeProps({
        class: "cdx-label__label",
        for: _ctx.inputId ? _ctx.inputId : void 0
      }, _ctx.otherAttrs), [
        _ctx.icon ? (openBlock(), createBlock(_component_cdx_icon, {
          key: 0,
          icon: _ctx.icon,
          class: "cdx-label__label__icon"
        }, null, 8, ["icon"])) : createCommentVNode("v-if", true),
        createElementVNode("span", _hoisted_2$h, [
          renderSlot(_ctx.$slots, "default")
        ]),
        _ctx.optionalFlag || _ctx.optional ? (openBlock(), createElementBlock(
          "span",
          _hoisted_3$b,
          toDisplayString(" ") + " " + toDisplayString(_ctx.translatedOptionalFlag),
          1
          /* TEXT */
        )) : createCommentVNode("v-if", true)
      ], 16, _hoisted_1$t),
      _ctx.$slots.description && _ctx.$slots.description().length > 0 ? (openBlock(), createElementBlock("span", {
        key: 0,
        id: _ctx.descriptionId || void 0,
        class: "cdx-label__description"
      }, [
        renderSlot(_ctx.$slots, "description")
      ], 8, _hoisted_4$9)) : createCommentVNode("v-if", true)
    ],
    6
    /* CLASS, STYLE */
  )) : (openBlock(), createElementBlock(
    "legend",
    mergeProps({
      key: 1,
      class: ["cdx-label", _ctx.rootClasses],
      style: _ctx.rootStyle
    }, _ctx.otherAttrs),
    [
      createElementVNode("span", _hoisted_5$9, [
        _ctx.icon ? (openBlock(), createBlock(_component_cdx_icon, {
          key: 0,
          icon: _ctx.icon,
          class: "cdx-label__label__icon"
        }, null, 8, ["icon"])) : createCommentVNode("v-if", true),
        createElementVNode("span", _hoisted_6$7, [
          renderSlot(_ctx.$slots, "default")
        ]),
        _ctx.optionalFlag || _ctx.optional ? (openBlock(), createElementBlock(
          "span",
          _hoisted_7$3,
          toDisplayString(" ") + " " + toDisplayString(_ctx.translatedOptionalFlag),
          1
          /* TEXT */
        )) : createCommentVNode("v-if", true)
      ]),
      _ctx.$slots.description && _ctx.$slots.description().length > 0 ? (openBlock(), createElementBlock("span", _hoisted_8$3, [
        renderSlot(_ctx.$slots, "description")
      ])) : createCommentVNode("v-if", true)
    ],
    16
    /* FULL_PROPS */
  ));
}
const CdxLabel = /* @__PURE__ */ _export_sfc(_sfc_main$v, [["render", _sfc_render$v]]);
function useLabelChecker(slot, attrs, componentName) {
  useWarnOnce(
    () => useSlotContents(slot).length === 0 && !(attrs == null ? void 0 : attrs["aria-label"]) && !(attrs == null ? void 0 : attrs["aria-labelledby"]),
    "".concat(componentName, ": Inputs must have an associated label. Provide one of the following:\n - A label via the appropriate slot\n - An `aria-label` attribute set to the label text\n - An `aria-labelledby` attribute set to the ID of the label element")
  );
}
function useModelWrapper(modelValueRef, emit, eventName) {
  return computed({
    get: () => modelValueRef.value,
    // If eventName is undefined, then 'update:modelValue' must be a valid EventName,
    // but TypeScript's type analysis isn't clever enough to realize that
    set: (value) => emit(eventName || "update:modelValue", value)
  });
}
const statusValidator$a = makeStringTypeValidator(ValidationStatusTypes);
const _sfc_main$u = defineComponent({
  name: "CdxCheckbox",
  components: { CdxLabel },
  props: {
    /**
     * Value of the checkbox or checkbox group.
     *
     * Provided by `v-model` binding in the parent component.
     */
    modelValue: {
      type: [Boolean, Array],
      default: false
    },
    /**
     * HTML "value" attribute to assign to the input.
     *
     * Required for input groups.
     */
    inputValue: {
      type: [String, Number, Boolean],
      default: false
    },
    /**
     * HTML "name" attribute to assign to the input.
     */
    name: {
      type: String,
      default: null
    },
    /**
     * Whether the disabled attribute should be added to the input.
     */
    disabled: {
      type: Boolean,
      default: false
    },
    /**
     * Whether the indeterminate visual state should be displayed.
     *
     * This is unrelated to the value provided by `v-model`, and the indeterminate visual state
     * will override the checked or unchecked visual state.
     */
    indeterminate: {
      type: Boolean,
      default: false
    },
    /**
     * Whether the component should display inline.
     *
     * By default, `display: block` is set and a margin exists between
     * sibling components, for a stacked layout.
     */
    inline: {
      type: Boolean,
      default: false
    },
    /**
     * Whether the label should be visually hidden.
     *
     * When true, the label will remain accessible to assistive technology.
     */
    hideLabel: {
      type: Boolean,
      default: false
    },
    /**
     * Validation status of the Checkbox.
     */
    status: {
      type: String,
      default: "default",
      validator: statusValidator$a
    }
  },
  emits: [
    /**
     * Emitted when modelValue changes.
     *
     * @property {boolean | string[] | number[]} modelValue The new model value
     */
    "update:modelValue"
  ],
  setup(props, { emit, slots, attrs }) {
    var _a;
    useLabelChecker((_a = slots.default) == null ? void 0 : _a.call(slots), attrs, "CdxCheckbox");
    const {
      computedDisabled,
      computedStatus
    } = useFieldData(
      toRef(props, "disabled"),
      toRef(props, "status")
    );
    const rootClasses = computed(() => ({
      "cdx-checkbox--inline": props.inline,
      ["cdx-checkbox--status-".concat(computedStatus.value)]: true
    }));
    const customInputClasses = computed(() => ({
      "cdx-checkbox__custom-input--inline": props.inline
    }));
    const input = ref();
    const checkboxId = useId();
    const descriptionId = useId();
    const wrappedModel = useModelWrapper(toRef(props, "modelValue"), emit);
    return {
      rootClasses,
      computedDisabled,
      input,
      checkboxId,
      descriptionId,
      wrappedModel,
      customInputClasses
    };
  }
});
const _hoisted_1$s = { class: "cdx-checkbox__wrapper" };
const _hoisted_2$g = ["id", "aria-describedby", "value", "name", "disabled", ".indeterminate"];
function _sfc_render$u(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_cdx_label = resolveComponent("cdx-label");
  return openBlock(), createElementBlock(
    "div",
    {
      class: normalizeClass(["cdx-checkbox", _ctx.rootClasses])
    },
    [
      createElementVNode("div", _hoisted_1$s, [
        withDirectives(createElementVNode("input", {
          id: _ctx.checkboxId,
          ref: "input",
          "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => _ctx.wrappedModel = $event),
          class: "cdx-checkbox__input",
          type: "checkbox",
          "aria-describedby": _ctx.$slots.description && _ctx.$slots.description().length > 0 ? _ctx.descriptionId : void 0,
          value: _ctx.inputValue,
          name: _ctx.name,
          disabled: _ctx.computedDisabled,
          ".indeterminate": _ctx.indeterminate
        }, null, 40, _hoisted_2$g), [
          [vModelCheckbox, _ctx.wrappedModel]
        ]),
        _cache[1] || (_cache[1] = createElementVNode(
          "span",
          { class: "cdx-checkbox__icon" },
          null,
          -1
          /* CACHED */
        )),
        _ctx.$slots.default && _ctx.$slots.default().length ? (openBlock(), createBlock(_component_cdx_label, {
          key: 0,
          class: "cdx-checkbox__label",
          "input-id": _ctx.checkboxId,
          "description-id": _ctx.$slots.description && _ctx.$slots.description().length > 0 ? _ctx.descriptionId : void 0,
          disabled: _ctx.computedDisabled,
          "visually-hidden": _ctx.hideLabel
        }, createSlots({
          default: withCtx(() => [
            renderSlot(_ctx.$slots, "default")
          ]),
          _: 2
          /* DYNAMIC */
        }, [
          _ctx.$slots.description && _ctx.$slots.description().length > 0 ? {
            name: "description",
            fn: withCtx(() => [
              renderSlot(_ctx.$slots, "description")
            ]),
            key: "0"
          } : void 0
        ]), 1032, ["input-id", "description-id", "disabled", "visually-hidden"])) : createCommentVNode("v-if", true)
      ]),
      _ctx.$slots["custom-input"] ? (openBlock(), createElementBlock(
        "div",
        {
          key: 0,
          class: normalizeClass(["cdx-checkbox__custom-input", _ctx.customInputClasses])
        },
        [
          renderSlot(_ctx.$slots, "custom-input")
        ],
        2
        /* CLASS */
      )) : createCommentVNode("v-if", true)
    ],
    2
    /* CLASS */
  );
}
const CdxCheckbox = /* @__PURE__ */ _export_sfc(_sfc_main$u, [["render", _sfc_render$u]]);
const sides = ["top", "right", "bottom", "left"];
const min = Math.min;
const max = Math.max;
const round = Math.round;
const floor = Math.floor;
const createCoords = (v) => ({
  x: v,
  y: v
});
const oppositeSideMap = {
  left: "right",
  right: "left",
  bottom: "top",
  top: "bottom"
};
const oppositeAlignmentMap = {
  start: "end",
  end: "start"
};
function clamp(start, value, end) {
  return max(start, min(value, end));
}
function evaluate(value, param) {
  return typeof value === "function" ? value(param) : value;
}
function getSide(placement) {
  return placement.split("-")[0];
}
function getAlignment(placement) {
  return placement.split("-")[1];
}
function getOppositeAxis(axis) {
  return axis === "x" ? "y" : "x";
}
function getAxisLength(axis) {
  return axis === "y" ? "height" : "width";
}
function getSideAxis(placement) {
  return ["top", "bottom"].includes(getSide(placement)) ? "y" : "x";
}
function getAlignmentAxis(placement) {
  return getOppositeAxis(getSideAxis(placement));
}
function getAlignmentSides(placement, rects, rtl) {
  if (rtl === void 0) {
    rtl = false;
  }
  const alignment = getAlignment(placement);
  const alignmentAxis = getAlignmentAxis(placement);
  const length = getAxisLength(alignmentAxis);
  let mainAlignmentSide = alignmentAxis === "x" ? alignment === (rtl ? "end" : "start") ? "right" : "left" : alignment === "start" ? "bottom" : "top";
  if (rects.reference[length] > rects.floating[length]) {
    mainAlignmentSide = getOppositePlacement(mainAlignmentSide);
  }
  return [mainAlignmentSide, getOppositePlacement(mainAlignmentSide)];
}
function getExpandedPlacements(placement) {
  const oppositePlacement = getOppositePlacement(placement);
  return [getOppositeAlignmentPlacement(placement), oppositePlacement, getOppositeAlignmentPlacement(oppositePlacement)];
}
function getOppositeAlignmentPlacement(placement) {
  return placement.replace(/start|end/g, (alignment) => oppositeAlignmentMap[alignment]);
}
function getSideList(side, isStart, rtl) {
  const lr = ["left", "right"];
  const rl = ["right", "left"];
  const tb = ["top", "bottom"];
  const bt = ["bottom", "top"];
  switch (side) {
    case "top":
    case "bottom":
      if (rtl) return isStart ? rl : lr;
      return isStart ? lr : rl;
    case "left":
    case "right":
      return isStart ? tb : bt;
    default:
      return [];
  }
}
function getOppositeAxisPlacements(placement, flipAlignment, direction, rtl) {
  const alignment = getAlignment(placement);
  let list = getSideList(getSide(placement), direction === "start", rtl);
  if (alignment) {
    list = list.map((side) => side + "-" + alignment);
    if (flipAlignment) {
      list = list.concat(list.map(getOppositeAlignmentPlacement));
    }
  }
  return list;
}
function getOppositePlacement(placement) {
  return placement.replace(/left|right|bottom|top/g, (side) => oppositeSideMap[side]);
}
function expandPaddingObject(padding) {
  return __spreadValues({
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  }, padding);
}
function getPaddingObject(padding) {
  return typeof padding !== "number" ? expandPaddingObject(padding) : {
    top: padding,
    right: padding,
    bottom: padding,
    left: padding
  };
}
function rectToClientRect(rect) {
  const {
    x,
    y,
    width,
    height
  } = rect;
  return {
    width,
    height,
    top: y,
    left: x,
    right: x + width,
    bottom: y + height,
    x,
    y
  };
}
function computeCoordsFromPlacement(_ref, placement, rtl) {
  let {
    reference,
    floating
  } = _ref;
  const sideAxis = getSideAxis(placement);
  const alignmentAxis = getAlignmentAxis(placement);
  const alignLength = getAxisLength(alignmentAxis);
  const side = getSide(placement);
  const isVertical = sideAxis === "y";
  const commonX = reference.x + reference.width / 2 - floating.width / 2;
  const commonY = reference.y + reference.height / 2 - floating.height / 2;
  const commonAlign = reference[alignLength] / 2 - floating[alignLength] / 2;
  let coords;
  switch (side) {
    case "top":
      coords = {
        x: commonX,
        y: reference.y - floating.height
      };
      break;
    case "bottom":
      coords = {
        x: commonX,
        y: reference.y + reference.height
      };
      break;
    case "right":
      coords = {
        x: reference.x + reference.width,
        y: commonY
      };
      break;
    case "left":
      coords = {
        x: reference.x - floating.width,
        y: commonY
      };
      break;
    default:
      coords = {
        x: reference.x,
        y: reference.y
      };
  }
  switch (getAlignment(placement)) {
    case "start":
      coords[alignmentAxis] -= commonAlign * (rtl && isVertical ? -1 : 1);
      break;
    case "end":
      coords[alignmentAxis] += commonAlign * (rtl && isVertical ? -1 : 1);
      break;
  }
  return coords;
}
const computePosition$1 = (reference, floating, config) => __async(null, null, function* () {
  const {
    placement = "bottom",
    strategy = "absolute",
    middleware = [],
    platform: platform2
  } = config;
  const validMiddleware = middleware.filter(Boolean);
  const rtl = yield platform2.isRTL == null ? void 0 : platform2.isRTL(floating);
  let rects = yield platform2.getElementRects({
    reference,
    floating,
    strategy
  });
  let {
    x,
    y
  } = computeCoordsFromPlacement(rects, placement, rtl);
  let statefulPlacement = placement;
  let middlewareData = {};
  let resetCount = 0;
  for (let i2 = 0; i2 < validMiddleware.length; i2++) {
    const {
      name,
      fn
    } = validMiddleware[i2];
    const {
      x: nextX,
      y: nextY,
      data,
      reset
    } = yield fn({
      x,
      y,
      initialPlacement: placement,
      placement: statefulPlacement,
      strategy,
      middlewareData,
      rects,
      platform: platform2,
      elements: {
        reference,
        floating
      }
    });
    x = nextX != null ? nextX : x;
    y = nextY != null ? nextY : y;
    middlewareData = __spreadProps(__spreadValues({}, middlewareData), {
      [name]: __spreadValues(__spreadValues({}, middlewareData[name]), data)
    });
    if (reset && resetCount <= 50) {
      resetCount++;
      if (typeof reset === "object") {
        if (reset.placement) {
          statefulPlacement = reset.placement;
        }
        if (reset.rects) {
          rects = reset.rects === true ? yield platform2.getElementRects({
            reference,
            floating,
            strategy
          }) : reset.rects;
        }
        ({
          x,
          y
        } = computeCoordsFromPlacement(rects, statefulPlacement, rtl));
      }
      i2 = -1;
    }
  }
  return {
    x,
    y,
    placement: statefulPlacement,
    strategy,
    middlewareData
  };
});
function detectOverflow(state, options) {
  return __async(this, null, function* () {
    var _await$platform$isEle;
    if (options === void 0) {
      options = {};
    }
    const {
      x,
      y,
      platform: platform2,
      rects,
      elements,
      strategy
    } = state;
    const {
      boundary = "clippingAncestors",
      rootBoundary = "viewport",
      elementContext = "floating",
      altBoundary = false,
      padding = 0
    } = evaluate(options, state);
    const paddingObject = getPaddingObject(padding);
    const altContext = elementContext === "floating" ? "reference" : "floating";
    const element = elements[altBoundary ? altContext : elementContext];
    const clippingClientRect = rectToClientRect(yield platform2.getClippingRect({
      element: ((_await$platform$isEle = yield platform2.isElement == null ? void 0 : platform2.isElement(element)) != null ? _await$platform$isEle : true) ? element : element.contextElement || (yield platform2.getDocumentElement == null ? void 0 : platform2.getDocumentElement(elements.floating)),
      boundary,
      rootBoundary,
      strategy
    }));
    const rect = elementContext === "floating" ? {
      x,
      y,
      width: rects.floating.width,
      height: rects.floating.height
    } : rects.reference;
    const offsetParent = yield platform2.getOffsetParent == null ? void 0 : platform2.getOffsetParent(elements.floating);
    const offsetScale = (yield platform2.isElement == null ? void 0 : platform2.isElement(offsetParent)) ? (yield platform2.getScale == null ? void 0 : platform2.getScale(offsetParent)) || {
      x: 1,
      y: 1
    } : {
      x: 1,
      y: 1
    };
    const elementClientRect = rectToClientRect(platform2.convertOffsetParentRelativeRectToViewportRelativeRect ? yield platform2.convertOffsetParentRelativeRectToViewportRelativeRect({
      elements,
      rect,
      offsetParent,
      strategy
    }) : rect);
    return {
      top: (clippingClientRect.top - elementClientRect.top + paddingObject.top) / offsetScale.y,
      bottom: (elementClientRect.bottom - clippingClientRect.bottom + paddingObject.bottom) / offsetScale.y,
      left: (clippingClientRect.left - elementClientRect.left + paddingObject.left) / offsetScale.x,
      right: (elementClientRect.right - clippingClientRect.right + paddingObject.right) / offsetScale.x
    };
  });
}
const arrow$2 = (options) => ({
  name: "arrow",
  options,
  fn(state) {
    return __async(this, null, function* () {
      const {
        x,
        y,
        placement,
        rects,
        platform: platform2,
        elements,
        middlewareData
      } = state;
      const {
        element,
        padding = 0
      } = evaluate(options, state) || {};
      if (element == null) {
        return {};
      }
      const paddingObject = getPaddingObject(padding);
      const coords = {
        x,
        y
      };
      const axis = getAlignmentAxis(placement);
      const length = getAxisLength(axis);
      const arrowDimensions = yield platform2.getDimensions(element);
      const isYAxis = axis === "y";
      const minProp = isYAxis ? "top" : "left";
      const maxProp = isYAxis ? "bottom" : "right";
      const clientProp = isYAxis ? "clientHeight" : "clientWidth";
      const endDiff = rects.reference[length] + rects.reference[axis] - coords[axis] - rects.floating[length];
      const startDiff = coords[axis] - rects.reference[axis];
      const arrowOffsetParent = yield platform2.getOffsetParent == null ? void 0 : platform2.getOffsetParent(element);
      let clientSize = arrowOffsetParent ? arrowOffsetParent[clientProp] : 0;
      if (!clientSize || !(yield platform2.isElement == null ? void 0 : platform2.isElement(arrowOffsetParent))) {
        clientSize = elements.floating[clientProp] || rects.floating[length];
      }
      const centerToReference = endDiff / 2 - startDiff / 2;
      const largestPossiblePadding = clientSize / 2 - arrowDimensions[length] / 2 - 1;
      const minPadding = min(paddingObject[minProp], largestPossiblePadding);
      const maxPadding = min(paddingObject[maxProp], largestPossiblePadding);
      const min$1 = minPadding;
      const max2 = clientSize - arrowDimensions[length] - maxPadding;
      const center = clientSize / 2 - arrowDimensions[length] / 2 + centerToReference;
      const offset2 = clamp(min$1, center, max2);
      const shouldAddOffset = !middlewareData.arrow && getAlignment(placement) != null && center !== offset2 && rects.reference[length] / 2 - (center < min$1 ? minPadding : maxPadding) - arrowDimensions[length] / 2 < 0;
      const alignmentOffset = shouldAddOffset ? center < min$1 ? center - min$1 : center - max2 : 0;
      return {
        [axis]: coords[axis] + alignmentOffset,
        data: __spreadValues({
          [axis]: offset2,
          centerOffset: center - offset2 - alignmentOffset
        }, shouldAddOffset && {
          alignmentOffset
        }),
        reset: shouldAddOffset
      };
    });
  }
});
const flip$1 = function(options) {
  if (options === void 0) {
    options = {};
  }
  return {
    name: "flip",
    options,
    fn(state) {
      return __async(this, null, function* () {
        var _middlewareData$arrow, _middlewareData$flip;
        const {
          placement,
          middlewareData,
          rects,
          initialPlacement,
          platform: platform2,
          elements
        } = state;
        const _a2 = evaluate(options, state), {
          mainAxis: checkMainAxis = true,
          crossAxis: checkCrossAxis = true,
          fallbackPlacements: specifiedFallbackPlacements,
          fallbackStrategy = "bestFit",
          fallbackAxisSideDirection = "none",
          flipAlignment = true
        } = _a2, detectOverflowOptions = __objRest(_a2, [
          "mainAxis",
          "crossAxis",
          "fallbackPlacements",
          "fallbackStrategy",
          "fallbackAxisSideDirection",
          "flipAlignment"
        ]);
        if ((_middlewareData$arrow = middlewareData.arrow) != null && _middlewareData$arrow.alignmentOffset) {
          return {};
        }
        const side = getSide(placement);
        const initialSideAxis = getSideAxis(initialPlacement);
        const isBasePlacement = getSide(initialPlacement) === initialPlacement;
        const rtl = yield platform2.isRTL == null ? void 0 : platform2.isRTL(elements.floating);
        const fallbackPlacements = specifiedFallbackPlacements || (isBasePlacement || !flipAlignment ? [getOppositePlacement(initialPlacement)] : getExpandedPlacements(initialPlacement));
        const hasFallbackAxisSideDirection = fallbackAxisSideDirection !== "none";
        if (!specifiedFallbackPlacements && hasFallbackAxisSideDirection) {
          fallbackPlacements.push(...getOppositeAxisPlacements(initialPlacement, flipAlignment, fallbackAxisSideDirection, rtl));
        }
        const placements = [initialPlacement, ...fallbackPlacements];
        const overflow = yield detectOverflow(state, detectOverflowOptions);
        const overflows = [];
        let overflowsData = ((_middlewareData$flip = middlewareData.flip) == null ? void 0 : _middlewareData$flip.overflows) || [];
        if (checkMainAxis) {
          overflows.push(overflow[side]);
        }
        if (checkCrossAxis) {
          const sides2 = getAlignmentSides(placement, rects, rtl);
          overflows.push(overflow[sides2[0]], overflow[sides2[1]]);
        }
        overflowsData = [...overflowsData, {
          placement,
          overflows
        }];
        if (!overflows.every((side2) => side2 <= 0)) {
          var _middlewareData$flip2, _overflowsData$filter;
          const nextIndex = (((_middlewareData$flip2 = middlewareData.flip) == null ? void 0 : _middlewareData$flip2.index) || 0) + 1;
          const nextPlacement = placements[nextIndex];
          if (nextPlacement) {
            return {
              data: {
                index: nextIndex,
                overflows: overflowsData
              },
              reset: {
                placement: nextPlacement
              }
            };
          }
          let resetPlacement = (_overflowsData$filter = overflowsData.filter((d) => d.overflows[0] <= 0).sort((a, b) => a.overflows[1] - b.overflows[1])[0]) == null ? void 0 : _overflowsData$filter.placement;
          if (!resetPlacement) {
            switch (fallbackStrategy) {
              case "bestFit": {
                var _overflowsData$filter2;
                const placement2 = (_overflowsData$filter2 = overflowsData.filter((d) => {
                  if (hasFallbackAxisSideDirection) {
                    const currentSideAxis = getSideAxis(d.placement);
                    return currentSideAxis === initialSideAxis || // Create a bias to the `y` side axis due to horizontal
                    // reading directions favoring greater width.
                    currentSideAxis === "y";
                  }
                  return true;
                }).map((d) => [d.placement, d.overflows.filter((overflow2) => overflow2 > 0).reduce((acc, overflow2) => acc + overflow2, 0)]).sort((a, b) => a[1] - b[1])[0]) == null ? void 0 : _overflowsData$filter2[0];
                if (placement2) {
                  resetPlacement = placement2;
                }
                break;
              }
              case "initialPlacement":
                resetPlacement = initialPlacement;
                break;
            }
          }
          if (placement !== resetPlacement) {
            return {
              reset: {
                placement: resetPlacement
              }
            };
          }
        }
        return {};
      });
    }
  };
};
function getSideOffsets(overflow, rect) {
  return {
    top: overflow.top - rect.height,
    right: overflow.right - rect.width,
    bottom: overflow.bottom - rect.height,
    left: overflow.left - rect.width
  };
}
function isAnySideFullyClipped(overflow) {
  return sides.some((side) => overflow[side] >= 0);
}
const hide$1 = function(options) {
  if (options === void 0) {
    options = {};
  }
  return {
    name: "hide",
    options,
    fn(state) {
      return __async(this, null, function* () {
        const {
          rects
        } = state;
        const _a2 = evaluate(options, state), {
          strategy = "referenceHidden"
        } = _a2, detectOverflowOptions = __objRest(_a2, [
          "strategy"
        ]);
        switch (strategy) {
          case "referenceHidden": {
            const overflow = yield detectOverflow(state, __spreadProps(__spreadValues({}, detectOverflowOptions), {
              elementContext: "reference"
            }));
            const offsets = getSideOffsets(overflow, rects.reference);
            return {
              data: {
                referenceHiddenOffsets: offsets,
                referenceHidden: isAnySideFullyClipped(offsets)
              }
            };
          }
          case "escaped": {
            const overflow = yield detectOverflow(state, __spreadProps(__spreadValues({}, detectOverflowOptions), {
              altBoundary: true
            }));
            const offsets = getSideOffsets(overflow, rects.floating);
            return {
              data: {
                escapedOffsets: offsets,
                escaped: isAnySideFullyClipped(offsets)
              }
            };
          }
          default: {
            return {};
          }
        }
      });
    }
  };
};
function convertValueToCoords(state, options) {
  return __async(this, null, function* () {
    const {
      placement,
      platform: platform2,
      elements
    } = state;
    const rtl = yield platform2.isRTL == null ? void 0 : platform2.isRTL(elements.floating);
    const side = getSide(placement);
    const alignment = getAlignment(placement);
    const isVertical = getSideAxis(placement) === "y";
    const mainAxisMulti = ["left", "top"].includes(side) ? -1 : 1;
    const crossAxisMulti = rtl && isVertical ? -1 : 1;
    const rawValue = evaluate(options, state);
    let {
      mainAxis,
      crossAxis,
      alignmentAxis
    } = typeof rawValue === "number" ? {
      mainAxis: rawValue,
      crossAxis: 0,
      alignmentAxis: null
    } : {
      mainAxis: rawValue.mainAxis || 0,
      crossAxis: rawValue.crossAxis || 0,
      alignmentAxis: rawValue.alignmentAxis
    };
    if (alignment && typeof alignmentAxis === "number") {
      crossAxis = alignment === "end" ? alignmentAxis * -1 : alignmentAxis;
    }
    return isVertical ? {
      x: crossAxis * crossAxisMulti,
      y: mainAxis * mainAxisMulti
    } : {
      x: mainAxis * mainAxisMulti,
      y: crossAxis * crossAxisMulti
    };
  });
}
const offset$1 = function(options) {
  if (options === void 0) {
    options = 0;
  }
  return {
    name: "offset",
    options,
    fn(state) {
      return __async(this, null, function* () {
        var _middlewareData$offse, _middlewareData$arrow;
        const {
          x,
          y,
          placement,
          middlewareData
        } = state;
        const diffCoords = yield convertValueToCoords(state, options);
        if (placement === ((_middlewareData$offse = middlewareData.offset) == null ? void 0 : _middlewareData$offse.placement) && (_middlewareData$arrow = middlewareData.arrow) != null && _middlewareData$arrow.alignmentOffset) {
          return {};
        }
        return {
          x: x + diffCoords.x,
          y: y + diffCoords.y,
          data: __spreadProps(__spreadValues({}, diffCoords), {
            placement
          })
        };
      });
    }
  };
};
const shift$1 = function(options) {
  if (options === void 0) {
    options = {};
  }
  return {
    name: "shift",
    options,
    fn(state) {
      return __async(this, null, function* () {
        const {
          x,
          y,
          placement
        } = state;
        const _a2 = evaluate(options, state), {
          mainAxis: checkMainAxis = true,
          crossAxis: checkCrossAxis = false,
          limiter = {
            fn: (_ref) => {
              let {
                x: x2,
                y: y2
              } = _ref;
              return {
                x: x2,
                y: y2
              };
            }
          }
        } = _a2, detectOverflowOptions = __objRest(_a2, [
          "mainAxis",
          "crossAxis",
          "limiter"
        ]);
        const coords = {
          x,
          y
        };
        const overflow = yield detectOverflow(state, detectOverflowOptions);
        const crossAxis = getSideAxis(getSide(placement));
        const mainAxis = getOppositeAxis(crossAxis);
        let mainAxisCoord = coords[mainAxis];
        let crossAxisCoord = coords[crossAxis];
        if (checkMainAxis) {
          const minSide = mainAxis === "y" ? "top" : "left";
          const maxSide = mainAxis === "y" ? "bottom" : "right";
          const min2 = mainAxisCoord + overflow[minSide];
          const max2 = mainAxisCoord - overflow[maxSide];
          mainAxisCoord = clamp(min2, mainAxisCoord, max2);
        }
        if (checkCrossAxis) {
          const minSide = crossAxis === "y" ? "top" : "left";
          const maxSide = crossAxis === "y" ? "bottom" : "right";
          const min2 = crossAxisCoord + overflow[minSide];
          const max2 = crossAxisCoord - overflow[maxSide];
          crossAxisCoord = clamp(min2, crossAxisCoord, max2);
        }
        const limitedCoords = limiter.fn(__spreadProps(__spreadValues({}, state), {
          [mainAxis]: mainAxisCoord,
          [crossAxis]: crossAxisCoord
        }));
        return __spreadProps(__spreadValues({}, limitedCoords), {
          data: {
            x: limitedCoords.x - x,
            y: limitedCoords.y - y,
            enabled: {
              [mainAxis]: checkMainAxis,
              [crossAxis]: checkCrossAxis
            }
          }
        });
      });
    }
  };
};
const size$1 = function(options) {
  if (options === void 0) {
    options = {};
  }
  return {
    name: "size",
    options,
    fn(state) {
      return __async(this, null, function* () {
        var _state$middlewareData, _state$middlewareData2;
        const {
          placement,
          rects,
          platform: platform2,
          elements
        } = state;
        const _a2 = evaluate(options, state), {
          apply = () => {
          }
        } = _a2, detectOverflowOptions = __objRest(_a2, [
          "apply"
        ]);
        const overflow = yield detectOverflow(state, detectOverflowOptions);
        const side = getSide(placement);
        const alignment = getAlignment(placement);
        const isYAxis = getSideAxis(placement) === "y";
        const {
          width,
          height
        } = rects.floating;
        let heightSide;
        let widthSide;
        if (side === "top" || side === "bottom") {
          heightSide = side;
          widthSide = alignment === ((yield platform2.isRTL == null ? void 0 : platform2.isRTL(elements.floating)) ? "start" : "end") ? "left" : "right";
        } else {
          widthSide = side;
          heightSide = alignment === "end" ? "top" : "bottom";
        }
        const maximumClippingHeight = height - overflow.top - overflow.bottom;
        const maximumClippingWidth = width - overflow.left - overflow.right;
        const overflowAvailableHeight = min(height - overflow[heightSide], maximumClippingHeight);
        const overflowAvailableWidth = min(width - overflow[widthSide], maximumClippingWidth);
        const noShift = !state.middlewareData.shift;
        let availableHeight = overflowAvailableHeight;
        let availableWidth = overflowAvailableWidth;
        if ((_state$middlewareData = state.middlewareData.shift) != null && _state$middlewareData.enabled.x) {
          availableWidth = maximumClippingWidth;
        }
        if ((_state$middlewareData2 = state.middlewareData.shift) != null && _state$middlewareData2.enabled.y) {
          availableHeight = maximumClippingHeight;
        }
        if (noShift && !alignment) {
          const xMin = max(overflow.left, 0);
          const xMax = max(overflow.right, 0);
          const yMin = max(overflow.top, 0);
          const yMax = max(overflow.bottom, 0);
          if (isYAxis) {
            availableWidth = width - 2 * (xMin !== 0 || xMax !== 0 ? xMin + xMax : max(overflow.left, overflow.right));
          } else {
            availableHeight = height - 2 * (yMin !== 0 || yMax !== 0 ? yMin + yMax : max(overflow.top, overflow.bottom));
          }
        }
        yield apply(__spreadProps(__spreadValues({}, state), {
          availableWidth,
          availableHeight
        }));
        const nextDimensions = yield platform2.getDimensions(elements.floating);
        if (width !== nextDimensions.width || height !== nextDimensions.height) {
          return {
            reset: {
              rects: true
            }
          };
        }
        return {};
      });
    }
  };
};
function hasWindow() {
  return typeof window !== "undefined";
}
function getNodeName(node) {
  if (isNode(node)) {
    return (node.nodeName || "").toLowerCase();
  }
  return "#document";
}
function getWindow(node) {
  var _node$ownerDocument;
  return (node == null || (_node$ownerDocument = node.ownerDocument) == null ? void 0 : _node$ownerDocument.defaultView) || window;
}
function getDocumentElement(node) {
  var _ref;
  return (_ref = (isNode(node) ? node.ownerDocument : node.document) || window.document) == null ? void 0 : _ref.documentElement;
}
function isNode(value) {
  if (!hasWindow()) {
    return false;
  }
  return value instanceof Node || value instanceof getWindow(value).Node;
}
function isElement(value) {
  if (!hasWindow()) {
    return false;
  }
  return value instanceof Element || value instanceof getWindow(value).Element;
}
function isHTMLElement(value) {
  if (!hasWindow()) {
    return false;
  }
  return value instanceof HTMLElement || value instanceof getWindow(value).HTMLElement;
}
function isShadowRoot(value) {
  if (!hasWindow() || typeof ShadowRoot === "undefined") {
    return false;
  }
  return value instanceof ShadowRoot || value instanceof getWindow(value).ShadowRoot;
}
function isOverflowElement(element) {
  const {
    overflow,
    overflowX,
    overflowY,
    display
  } = getComputedStyle(element);
  return /auto|scroll|overlay|hidden|clip/.test(overflow + overflowY + overflowX) && !["inline", "contents"].includes(display);
}
function isTableElement(element) {
  return ["table", "td", "th"].includes(getNodeName(element));
}
function isTopLayer(element) {
  return [":popover-open", ":modal"].some((selector) => {
    try {
      return element.matches(selector);
    } catch (e) {
      return false;
    }
  });
}
function isContainingBlock(elementOrCss) {
  const webkit = isWebKit();
  const css = isElement(elementOrCss) ? getComputedStyle(elementOrCss) : elementOrCss;
  return css.transform !== "none" || css.perspective !== "none" || (css.containerType ? css.containerType !== "normal" : false) || !webkit && (css.backdropFilter ? css.backdropFilter !== "none" : false) || !webkit && (css.filter ? css.filter !== "none" : false) || ["transform", "perspective", "filter"].some((value) => (css.willChange || "").includes(value)) || ["paint", "layout", "strict", "content"].some((value) => (css.contain || "").includes(value));
}
function getContainingBlock(element) {
  let currentNode = getParentNode(element);
  while (isHTMLElement(currentNode) && !isLastTraversableNode(currentNode)) {
    if (isContainingBlock(currentNode)) {
      return currentNode;
    } else if (isTopLayer(currentNode)) {
      return null;
    }
    currentNode = getParentNode(currentNode);
  }
  return null;
}
function isWebKit() {
  if (typeof CSS === "undefined" || !CSS.supports) return false;
  return CSS.supports("-webkit-backdrop-filter", "none");
}
function isLastTraversableNode(node) {
  return ["html", "body", "#document"].includes(getNodeName(node));
}
function getComputedStyle(element) {
  return getWindow(element).getComputedStyle(element);
}
function getNodeScroll(element) {
  if (isElement(element)) {
    return {
      scrollLeft: element.scrollLeft,
      scrollTop: element.scrollTop
    };
  }
  return {
    scrollLeft: element.scrollX,
    scrollTop: element.scrollY
  };
}
function getParentNode(node) {
  if (getNodeName(node) === "html") {
    return node;
  }
  const result = (
    // Step into the shadow DOM of the parent of a slotted node.
    node.assignedSlot || // DOM Element detected.
    node.parentNode || // ShadowRoot detected.
    isShadowRoot(node) && node.host || // Fallback.
    getDocumentElement(node)
  );
  return isShadowRoot(result) ? result.host : result;
}
function getNearestOverflowAncestor(node) {
  const parentNode = getParentNode(node);
  if (isLastTraversableNode(parentNode)) {
    return node.ownerDocument ? node.ownerDocument.body : node.body;
  }
  if (isHTMLElement(parentNode) && isOverflowElement(parentNode)) {
    return parentNode;
  }
  return getNearestOverflowAncestor(parentNode);
}
function getOverflowAncestors(node, list, traverseIframes) {
  var _node$ownerDocument2;
  if (list === void 0) {
    list = [];
  }
  if (traverseIframes === void 0) {
    traverseIframes = true;
  }
  const scrollableAncestor = getNearestOverflowAncestor(node);
  const isBody = scrollableAncestor === ((_node$ownerDocument2 = node.ownerDocument) == null ? void 0 : _node$ownerDocument2.body);
  const win = getWindow(scrollableAncestor);
  if (isBody) {
    const frameElement = getFrameElement(win);
    return list.concat(win, win.visualViewport || [], isOverflowElement(scrollableAncestor) ? scrollableAncestor : [], frameElement && traverseIframes ? getOverflowAncestors(frameElement) : []);
  }
  return list.concat(scrollableAncestor, getOverflowAncestors(scrollableAncestor, [], traverseIframes));
}
function getFrameElement(win) {
  return win.parent && Object.getPrototypeOf(win.parent) ? win.frameElement : null;
}
function getCssDimensions(element) {
  const css = getComputedStyle(element);
  let width = parseFloat(css.width) || 0;
  let height = parseFloat(css.height) || 0;
  const hasOffset = isHTMLElement(element);
  const offsetWidth = hasOffset ? element.offsetWidth : width;
  const offsetHeight = hasOffset ? element.offsetHeight : height;
  const shouldFallback = round(width) !== offsetWidth || round(height) !== offsetHeight;
  if (shouldFallback) {
    width = offsetWidth;
    height = offsetHeight;
  }
  return {
    width,
    height,
    $: shouldFallback
  };
}
function unwrapElement$2(element) {
  return !isElement(element) ? element.contextElement : element;
}
function getScale(element) {
  const domElement = unwrapElement$2(element);
  if (!isHTMLElement(domElement)) {
    return createCoords(1);
  }
  const rect = domElement.getBoundingClientRect();
  const {
    width,
    height,
    $
  } = getCssDimensions(domElement);
  let x = ($ ? round(rect.width) : rect.width) / width;
  let y = ($ ? round(rect.height) : rect.height) / height;
  if (!x || !Number.isFinite(x)) {
    x = 1;
  }
  if (!y || !Number.isFinite(y)) {
    y = 1;
  }
  return {
    x,
    y
  };
}
const noOffsets = /* @__PURE__ */ createCoords(0);
function getVisualOffsets(element) {
  const win = getWindow(element);
  if (!isWebKit() || !win.visualViewport) {
    return noOffsets;
  }
  return {
    x: win.visualViewport.offsetLeft,
    y: win.visualViewport.offsetTop
  };
}
function shouldAddVisualOffsets(element, isFixed, floatingOffsetParent) {
  if (isFixed === void 0) {
    isFixed = false;
  }
  if (!floatingOffsetParent || isFixed && floatingOffsetParent !== getWindow(element)) {
    return false;
  }
  return isFixed;
}
function getBoundingClientRect(element, includeScale, isFixedStrategy, offsetParent) {
  if (includeScale === void 0) {
    includeScale = false;
  }
  if (isFixedStrategy === void 0) {
    isFixedStrategy = false;
  }
  const clientRect = element.getBoundingClientRect();
  const domElement = unwrapElement$2(element);
  let scale = createCoords(1);
  if (includeScale) {
    if (offsetParent) {
      if (isElement(offsetParent)) {
        scale = getScale(offsetParent);
      }
    } else {
      scale = getScale(element);
    }
  }
  const visualOffsets = shouldAddVisualOffsets(domElement, isFixedStrategy, offsetParent) ? getVisualOffsets(domElement) : createCoords(0);
  let x = (clientRect.left + visualOffsets.x) / scale.x;
  let y = (clientRect.top + visualOffsets.y) / scale.y;
  let width = clientRect.width / scale.x;
  let height = clientRect.height / scale.y;
  if (domElement) {
    const win = getWindow(domElement);
    const offsetWin = offsetParent && isElement(offsetParent) ? getWindow(offsetParent) : offsetParent;
    let currentWin = win;
    let currentIFrame = getFrameElement(currentWin);
    while (currentIFrame && offsetParent && offsetWin !== currentWin) {
      const iframeScale = getScale(currentIFrame);
      const iframeRect = currentIFrame.getBoundingClientRect();
      const css = getComputedStyle(currentIFrame);
      const left = iframeRect.left + (currentIFrame.clientLeft + parseFloat(css.paddingLeft)) * iframeScale.x;
      const top = iframeRect.top + (currentIFrame.clientTop + parseFloat(css.paddingTop)) * iframeScale.y;
      x *= iframeScale.x;
      y *= iframeScale.y;
      width *= iframeScale.x;
      height *= iframeScale.y;
      x += left;
      y += top;
      currentWin = getWindow(currentIFrame);
      currentIFrame = getFrameElement(currentWin);
    }
  }
  return rectToClientRect({
    width,
    height,
    x,
    y
  });
}
function getWindowScrollBarX(element, rect) {
  const leftScroll = getNodeScroll(element).scrollLeft;
  if (!rect) {
    return getBoundingClientRect(getDocumentElement(element)).left + leftScroll;
  }
  return rect.left + leftScroll;
}
function getHTMLOffset(documentElement, scroll, ignoreScrollbarX) {
  if (ignoreScrollbarX === void 0) {
    ignoreScrollbarX = false;
  }
  const htmlRect = documentElement.getBoundingClientRect();
  const x = htmlRect.left + scroll.scrollLeft - (ignoreScrollbarX ? 0 : (
    // RTL <body> scrollbar.
    getWindowScrollBarX(documentElement, htmlRect)
  ));
  const y = htmlRect.top + scroll.scrollTop;
  return {
    x,
    y
  };
}
function convertOffsetParentRelativeRectToViewportRelativeRect(_ref) {
  let {
    elements,
    rect,
    offsetParent,
    strategy
  } = _ref;
  const isFixed = strategy === "fixed";
  const documentElement = getDocumentElement(offsetParent);
  const topLayer = elements ? isTopLayer(elements.floating) : false;
  if (offsetParent === documentElement || topLayer && isFixed) {
    return rect;
  }
  let scroll = {
    scrollLeft: 0,
    scrollTop: 0
  };
  let scale = createCoords(1);
  const offsets = createCoords(0);
  const isOffsetParentAnElement = isHTMLElement(offsetParent);
  if (isOffsetParentAnElement || !isOffsetParentAnElement && !isFixed) {
    if (getNodeName(offsetParent) !== "body" || isOverflowElement(documentElement)) {
      scroll = getNodeScroll(offsetParent);
    }
    if (isHTMLElement(offsetParent)) {
      const offsetRect = getBoundingClientRect(offsetParent);
      scale = getScale(offsetParent);
      offsets.x = offsetRect.x + offsetParent.clientLeft;
      offsets.y = offsetRect.y + offsetParent.clientTop;
    }
  }
  const htmlOffset = documentElement && !isOffsetParentAnElement && !isFixed ? getHTMLOffset(documentElement, scroll, true) : createCoords(0);
  return {
    width: rect.width * scale.x,
    height: rect.height * scale.y,
    x: rect.x * scale.x - scroll.scrollLeft * scale.x + offsets.x + htmlOffset.x,
    y: rect.y * scale.y - scroll.scrollTop * scale.y + offsets.y + htmlOffset.y
  };
}
function getClientRects(element) {
  return Array.from(element.getClientRects());
}
function getDocumentRect(element) {
  const html = getDocumentElement(element);
  const scroll = getNodeScroll(element);
  const body = element.ownerDocument.body;
  const width = max(html.scrollWidth, html.clientWidth, body.scrollWidth, body.clientWidth);
  const height = max(html.scrollHeight, html.clientHeight, body.scrollHeight, body.clientHeight);
  let x = -scroll.scrollLeft + getWindowScrollBarX(element);
  const y = -scroll.scrollTop;
  if (getComputedStyle(body).direction === "rtl") {
    x += max(html.clientWidth, body.clientWidth) - width;
  }
  return {
    width,
    height,
    x,
    y
  };
}
function getViewportRect(element, strategy) {
  const win = getWindow(element);
  const html = getDocumentElement(element);
  const visualViewport = win.visualViewport;
  let width = html.clientWidth;
  let height = html.clientHeight;
  let x = 0;
  let y = 0;
  if (visualViewport) {
    width = visualViewport.width;
    height = visualViewport.height;
    const visualViewportBased = isWebKit();
    if (!visualViewportBased || visualViewportBased && strategy === "fixed") {
      x = visualViewport.offsetLeft;
      y = visualViewport.offsetTop;
    }
  }
  return {
    width,
    height,
    x,
    y
  };
}
function getInnerBoundingClientRect(element, strategy) {
  const clientRect = getBoundingClientRect(element, true, strategy === "fixed");
  const top = clientRect.top + element.clientTop;
  const left = clientRect.left + element.clientLeft;
  const scale = isHTMLElement(element) ? getScale(element) : createCoords(1);
  const width = element.clientWidth * scale.x;
  const height = element.clientHeight * scale.y;
  const x = left * scale.x;
  const y = top * scale.y;
  return {
    width,
    height,
    x,
    y
  };
}
function getClientRectFromClippingAncestor(element, clippingAncestor, strategy) {
  let rect;
  if (clippingAncestor === "viewport") {
    rect = getViewportRect(element, strategy);
  } else if (clippingAncestor === "document") {
    rect = getDocumentRect(getDocumentElement(element));
  } else if (isElement(clippingAncestor)) {
    rect = getInnerBoundingClientRect(clippingAncestor, strategy);
  } else {
    const visualOffsets = getVisualOffsets(element);
    rect = {
      x: clippingAncestor.x - visualOffsets.x,
      y: clippingAncestor.y - visualOffsets.y,
      width: clippingAncestor.width,
      height: clippingAncestor.height
    };
  }
  return rectToClientRect(rect);
}
function hasFixedPositionAncestor(element, stopNode) {
  const parentNode = getParentNode(element);
  if (parentNode === stopNode || !isElement(parentNode) || isLastTraversableNode(parentNode)) {
    return false;
  }
  return getComputedStyle(parentNode).position === "fixed" || hasFixedPositionAncestor(parentNode, stopNode);
}
function getClippingElementAncestors(element, cache) {
  const cachedResult = cache.get(element);
  if (cachedResult) {
    return cachedResult;
  }
  let result = getOverflowAncestors(element, [], false).filter((el) => isElement(el) && getNodeName(el) !== "body");
  let currentContainingBlockComputedStyle = null;
  const elementIsFixed = getComputedStyle(element).position === "fixed";
  let currentNode = elementIsFixed ? getParentNode(element) : element;
  while (isElement(currentNode) && !isLastTraversableNode(currentNode)) {
    const computedStyle = getComputedStyle(currentNode);
    const currentNodeIsContaining = isContainingBlock(currentNode);
    if (!currentNodeIsContaining && computedStyle.position === "fixed") {
      currentContainingBlockComputedStyle = null;
    }
    const shouldDropCurrentNode = elementIsFixed ? !currentNodeIsContaining && !currentContainingBlockComputedStyle : !currentNodeIsContaining && computedStyle.position === "static" && !!currentContainingBlockComputedStyle && ["absolute", "fixed"].includes(currentContainingBlockComputedStyle.position) || isOverflowElement(currentNode) && !currentNodeIsContaining && hasFixedPositionAncestor(element, currentNode);
    if (shouldDropCurrentNode) {
      result = result.filter((ancestor) => ancestor !== currentNode);
    } else {
      currentContainingBlockComputedStyle = computedStyle;
    }
    currentNode = getParentNode(currentNode);
  }
  cache.set(element, result);
  return result;
}
function getClippingRect(_ref) {
  let {
    element,
    boundary,
    rootBoundary,
    strategy
  } = _ref;
  const elementClippingAncestors = boundary === "clippingAncestors" ? isTopLayer(element) ? [] : getClippingElementAncestors(element, this._c) : [].concat(boundary);
  const clippingAncestors = [...elementClippingAncestors, rootBoundary];
  const firstClippingAncestor = clippingAncestors[0];
  const clippingRect = clippingAncestors.reduce((accRect, clippingAncestor) => {
    const rect = getClientRectFromClippingAncestor(element, clippingAncestor, strategy);
    accRect.top = max(rect.top, accRect.top);
    accRect.right = min(rect.right, accRect.right);
    accRect.bottom = min(rect.bottom, accRect.bottom);
    accRect.left = max(rect.left, accRect.left);
    return accRect;
  }, getClientRectFromClippingAncestor(element, firstClippingAncestor, strategy));
  return {
    width: clippingRect.right - clippingRect.left,
    height: clippingRect.bottom - clippingRect.top,
    x: clippingRect.left,
    y: clippingRect.top
  };
}
function getDimensions(element) {
  const {
    width,
    height
  } = getCssDimensions(element);
  return {
    width,
    height
  };
}
function getRectRelativeToOffsetParent(element, offsetParent, strategy) {
  const isOffsetParentAnElement = isHTMLElement(offsetParent);
  const documentElement = getDocumentElement(offsetParent);
  const isFixed = strategy === "fixed";
  const rect = getBoundingClientRect(element, true, isFixed, offsetParent);
  let scroll = {
    scrollLeft: 0,
    scrollTop: 0
  };
  const offsets = createCoords(0);
  if (isOffsetParentAnElement || !isOffsetParentAnElement && !isFixed) {
    if (getNodeName(offsetParent) !== "body" || isOverflowElement(documentElement)) {
      scroll = getNodeScroll(offsetParent);
    }
    if (isOffsetParentAnElement) {
      const offsetRect = getBoundingClientRect(offsetParent, true, isFixed, offsetParent);
      offsets.x = offsetRect.x + offsetParent.clientLeft;
      offsets.y = offsetRect.y + offsetParent.clientTop;
    } else if (documentElement) {
      offsets.x = getWindowScrollBarX(documentElement);
    }
  }
  const htmlOffset = documentElement && !isOffsetParentAnElement && !isFixed ? getHTMLOffset(documentElement, scroll) : createCoords(0);
  const x = rect.left + scroll.scrollLeft - offsets.x - htmlOffset.x;
  const y = rect.top + scroll.scrollTop - offsets.y - htmlOffset.y;
  return {
    x,
    y,
    width: rect.width,
    height: rect.height
  };
}
function isStaticPositioned(element) {
  return getComputedStyle(element).position === "static";
}
function getTrueOffsetParent(element, polyfill) {
  if (!isHTMLElement(element) || getComputedStyle(element).position === "fixed") {
    return null;
  }
  if (polyfill) {
    return polyfill(element);
  }
  let rawOffsetParent = element.offsetParent;
  if (getDocumentElement(element) === rawOffsetParent) {
    rawOffsetParent = rawOffsetParent.ownerDocument.body;
  }
  return rawOffsetParent;
}
function getOffsetParent(element, polyfill) {
  const win = getWindow(element);
  if (isTopLayer(element)) {
    return win;
  }
  if (!isHTMLElement(element)) {
    let svgOffsetParent = getParentNode(element);
    while (svgOffsetParent && !isLastTraversableNode(svgOffsetParent)) {
      if (isElement(svgOffsetParent) && !isStaticPositioned(svgOffsetParent)) {
        return svgOffsetParent;
      }
      svgOffsetParent = getParentNode(svgOffsetParent);
    }
    return win;
  }
  let offsetParent = getTrueOffsetParent(element, polyfill);
  while (offsetParent && isTableElement(offsetParent) && isStaticPositioned(offsetParent)) {
    offsetParent = getTrueOffsetParent(offsetParent, polyfill);
  }
  if (offsetParent && isLastTraversableNode(offsetParent) && isStaticPositioned(offsetParent) && !isContainingBlock(offsetParent)) {
    return win;
  }
  return offsetParent || getContainingBlock(element) || win;
}
const getElementRects = function(data) {
  return __async(this, null, function* () {
    const getOffsetParentFn = this.getOffsetParent || getOffsetParent;
    const getDimensionsFn = this.getDimensions;
    const floatingDimensions = yield getDimensionsFn(data.floating);
    return {
      reference: getRectRelativeToOffsetParent(data.reference, yield getOffsetParentFn(data.floating), data.strategy),
      floating: {
        x: 0,
        y: 0,
        width: floatingDimensions.width,
        height: floatingDimensions.height
      }
    };
  });
};
function isRTL(element) {
  return getComputedStyle(element).direction === "rtl";
}
const platform = {
  convertOffsetParentRelativeRectToViewportRelativeRect,
  getDocumentElement,
  getClippingRect,
  getOffsetParent,
  getElementRects,
  getClientRects,
  getDimensions,
  getScale,
  isElement,
  isRTL
};
function observeMove(element, onMove) {
  let io = null;
  let timeoutId;
  const root = getDocumentElement(element);
  function cleanup() {
    var _io;
    clearTimeout(timeoutId);
    (_io = io) == null || _io.disconnect();
    io = null;
  }
  function refresh(skip, threshold) {
    if (skip === void 0) {
      skip = false;
    }
    if (threshold === void 0) {
      threshold = 1;
    }
    cleanup();
    const {
      left,
      top,
      width,
      height
    } = element.getBoundingClientRect();
    if (!skip) {
      onMove();
    }
    if (!width || !height) {
      return;
    }
    const insetTop = floor(top);
    const insetRight = floor(root.clientWidth - (left + width));
    const insetBottom = floor(root.clientHeight - (top + height));
    const insetLeft = floor(left);
    const rootMargin = -insetTop + "px " + -insetRight + "px " + -insetBottom + "px " + -insetLeft + "px";
    const options = {
      rootMargin,
      threshold: max(0, min(1, threshold)) || 1
    };
    let isFirstUpdate = true;
    function handleObserve(entries) {
      const ratio = entries[0].intersectionRatio;
      if (ratio !== threshold) {
        if (!isFirstUpdate) {
          return refresh();
        }
        if (!ratio) {
          timeoutId = setTimeout(() => {
            refresh(false, 1e-7);
          }, 1e3);
        } else {
          refresh(false, ratio);
        }
      }
      isFirstUpdate = false;
    }
    try {
      io = new IntersectionObserver(handleObserve, __spreadProps(__spreadValues({}, options), {
        // Handle <iframe>s
        root: root.ownerDocument
      }));
    } catch (e) {
      io = new IntersectionObserver(handleObserve, options);
    }
    io.observe(element);
  }
  refresh(true);
  return cleanup;
}
function autoUpdate(reference, floating, update, options) {
  if (options === void 0) {
    options = {};
  }
  const {
    ancestorScroll = true,
    ancestorResize = true,
    elementResize = typeof ResizeObserver === "function",
    layoutShift = typeof IntersectionObserver === "function",
    animationFrame = false
  } = options;
  const referenceEl = unwrapElement$2(reference);
  const ancestors = ancestorScroll || ancestorResize ? [...referenceEl ? getOverflowAncestors(referenceEl) : [], ...getOverflowAncestors(floating)] : [];
  ancestors.forEach((ancestor) => {
    ancestorScroll && ancestor.addEventListener("scroll", update, {
      passive: true
    });
    ancestorResize && ancestor.addEventListener("resize", update);
  });
  const cleanupIo = referenceEl && layoutShift ? observeMove(referenceEl, update) : null;
  let reobserveFrame = -1;
  let resizeObserver = null;
  if (elementResize) {
    resizeObserver = new ResizeObserver((_ref) => {
      let [firstEntry] = _ref;
      if (firstEntry && firstEntry.target === referenceEl && resizeObserver) {
        resizeObserver.unobserve(floating);
        cancelAnimationFrame(reobserveFrame);
        reobserveFrame = requestAnimationFrame(() => {
          var _resizeObserver;
          (_resizeObserver = resizeObserver) == null || _resizeObserver.observe(floating);
        });
      }
      update();
    });
    if (referenceEl && !animationFrame) {
      resizeObserver.observe(referenceEl);
    }
    resizeObserver.observe(floating);
  }
  let frameId;
  let prevRefRect = animationFrame ? getBoundingClientRect(reference) : null;
  if (animationFrame) {
    frameLoop();
  }
  function frameLoop() {
    const nextRefRect = getBoundingClientRect(reference);
    if (prevRefRect && (nextRefRect.x !== prevRefRect.x || nextRefRect.y !== prevRefRect.y || nextRefRect.width !== prevRefRect.width || nextRefRect.height !== prevRefRect.height)) {
      update();
    }
    prevRefRect = nextRefRect;
    frameId = requestAnimationFrame(frameLoop);
  }
  update();
  return () => {
    var _resizeObserver2;
    ancestors.forEach((ancestor) => {
      ancestorScroll && ancestor.removeEventListener("scroll", update);
      ancestorResize && ancestor.removeEventListener("resize", update);
    });
    cleanupIo == null || cleanupIo();
    (_resizeObserver2 = resizeObserver) == null || _resizeObserver2.disconnect();
    resizeObserver = null;
    if (animationFrame) {
      cancelAnimationFrame(frameId);
    }
  };
}
const offset = offset$1;
const shift = shift$1;
const flip = flip$1;
const size = size$1;
const hide = hide$1;
const arrow$1 = arrow$2;
const computePosition = (reference, floating, options) => {
  const cache = /* @__PURE__ */ new Map();
  const mergedOptions = __spreadValues({
    platform
  }, options);
  const platformWithCache = __spreadProps(__spreadValues({}, mergedOptions.platform), {
    _c: cache
  });
  return computePosition$1(reference, floating, __spreadProps(__spreadValues({}, mergedOptions), {
    platform: platformWithCache
  }));
};
function isComponentPublicInstance(target) {
  return target != null && typeof target === "object" && "$el" in target;
}
function unwrapElement$1(target) {
  if (isComponentPublicInstance(target)) {
    const element = target.$el;
    return isNode(element) && getNodeName(element) === "#comment" ? null : element;
  }
  return target;
}
function arrow(options) {
  return {
    name: "arrow",
    options,
    fn(args) {
      const element = unwrapElement$1(unref(options.element));
      if (element == null) {
        return {};
      }
      return arrow$1({
        element,
        padding: options.padding
      }).fn(args);
    }
  };
}
function getDPR(element) {
  if (typeof window === "undefined") {
    return 1;
  }
  const win = element.ownerDocument.defaultView || window;
  return win.devicePixelRatio || 1;
}
function roundByDPR(element, value) {
  const dpr = getDPR(element);
  return Math.round(value * dpr) / dpr;
}
function useFloating(reference, floating, options) {
  if (options === void 0) {
    options = {};
  }
  const whileElementsMountedOption = options.whileElementsMounted;
  const openOption = computed(() => {
    var _unref;
    return (_unref = unref(options.open)) != null ? _unref : true;
  });
  const middlewareOption = computed(() => unref(options.middleware));
  const placementOption = computed(() => {
    var _unref2;
    return (_unref2 = unref(options.placement)) != null ? _unref2 : "bottom";
  });
  const strategyOption = computed(() => {
    var _unref3;
    return (_unref3 = unref(options.strategy)) != null ? _unref3 : "absolute";
  });
  const transformOption = computed(() => {
    var _unref4;
    return (_unref4 = unref(options.transform)) != null ? _unref4 : true;
  });
  const referenceElement = computed(() => unwrapElement$1(reference.value));
  const floatingElement = computed(() => unwrapElement$1(floating.value));
  const x = ref(0);
  const y = ref(0);
  const strategy = ref(strategyOption.value);
  const placement = ref(placementOption.value);
  const middlewareData = shallowRef({});
  const isPositioned = ref(false);
  const floatingStyles = computed(() => {
    const initialStyles = {
      position: strategy.value,
      left: "0",
      top: "0"
    };
    if (!floatingElement.value) {
      return initialStyles;
    }
    const xVal = roundByDPR(floatingElement.value, x.value);
    const yVal = roundByDPR(floatingElement.value, y.value);
    if (transformOption.value) {
      return __spreadValues(__spreadProps(__spreadValues({}, initialStyles), {
        transform: "translate(" + xVal + "px, " + yVal + "px)"
      }), getDPR(floatingElement.value) >= 1.5 && {
        willChange: "transform"
      });
    }
    return {
      position: strategy.value,
      left: xVal + "px",
      top: yVal + "px"
    };
  });
  let whileElementsMountedCleanup;
  function update() {
    if (referenceElement.value == null || floatingElement.value == null) {
      return;
    }
    computePosition(referenceElement.value, floatingElement.value, {
      middleware: middlewareOption.value,
      placement: placementOption.value,
      strategy: strategyOption.value
    }).then((position) => {
      x.value = position.x;
      y.value = position.y;
      strategy.value = position.strategy;
      placement.value = position.placement;
      middlewareData.value = position.middlewareData;
      isPositioned.value = true;
    });
  }
  function cleanup() {
    if (typeof whileElementsMountedCleanup === "function") {
      whileElementsMountedCleanup();
      whileElementsMountedCleanup = void 0;
    }
  }
  function attach() {
    cleanup();
    if (whileElementsMountedOption === void 0) {
      update();
      return;
    }
    if (referenceElement.value != null && floatingElement.value != null) {
      whileElementsMountedCleanup = whileElementsMountedOption(referenceElement.value, floatingElement.value, update);
      return;
    }
  }
  function reset() {
    if (!openOption.value) {
      isPositioned.value = false;
    }
  }
  watch([middlewareOption, placementOption, strategyOption], update, {
    flush: "sync"
  });
  watch([referenceElement, floatingElement], attach, {
    flush: "sync"
  });
  watch(openOption, reset, {
    flush: "sync"
  });
  if (getCurrentScope()) {
    onScopeDispose(cleanup);
  }
  return {
    x: shallowReadonly(x),
    y: shallowReadonly(y),
    strategy: shallowReadonly(strategy),
    placement: shallowReadonly(placement),
    middlewareData: shallowReadonly(middlewareData),
    isPositioned: shallowReadonly(isPositioned),
    floatingStyles,
    update
  };
}
function generateHashId(content, prefix = LibraryPrefix) {
  const mask = 4294967295;
  let numericHash = Array.from(content).reduce((acc, char) => acc * 31 + char.charCodeAt(0) & mask, 0);
  numericHash = numericHash >>> 0;
  const hash = numericHash.toString(36);
  return "".concat(prefix, "-").concat(hash);
}
const contentCounters = /* @__PURE__ */ new Map();
class Tooltip {
  constructor(referenceElement, options) {
    __publicField(this, "referenceElement");
    __publicField(this, "tooltipElement");
    __publicField(this, "textContent");
    __publicField(this, "placement");
    __publicField(this, "autoUpdateCleanup");
    __publicField(this, "referenceElementHandlers");
    __publicField(this, "tooltipElementHandlers");
    __publicField(this, "escapeHandler");
    __publicField(this, "timeoutId");
    var _a, _b;
    const doc = referenceElement.ownerDocument;
    const tooltipId = this.generateTooltipId(options.textContent);
    this.referenceElement = referenceElement;
    this.textContent = options.textContent;
    this.placement = (_a = options.placement) != null ? _a : "bottom";
    this.timeoutId = null;
    this.tooltipElement = doc.createElement("div");
    this.tooltipElement.classList.add("cdx-tooltip");
    this.tooltipElement.role = "tooltip";
    this.tooltipElement.id = tooltipId;
    this.referenceElement.setAttribute("aria-describedby", tooltipId);
    this.tooltipElement.textContent = this.textContent;
    (_b = this.referenceElement.parentElement) == null ? void 0 : _b.appendChild(this.tooltipElement);
    this.referenceElementHandlers = {};
    this.referenceElementHandlers.mouseenter = this.show.bind(this);
    this.referenceElementHandlers.mouseleave = this.hideAfterDelay.bind(this);
    this.referenceElementHandlers.focus = this.show.bind(this);
    this.referenceElementHandlers.blur = this.hide.bind(this);
    this.tooltipElementHandlers = {};
    this.tooltipElementHandlers.mouseenter = this.show.bind(this);
    this.tooltipElementHandlers.mouseleave = this.hideAfterDelay.bind(this);
    this.escapeHandler = this.onKeyup.bind(this);
    this.addEventListeners();
    this.autoUpdateCleanup = autoUpdate(
      this.referenceElement,
      this.tooltipElement,
      () => this.update()
    );
  }
  /**
   * Assign each Tooltip a (reasonably) unique, deterministic, and SSR-safe ID
   * based on its content.
   *
   * @param content The tooltip content text
   * @return A unique ID for the tooltip
   */
  generateTooltipId(content) {
    var _a;
    const contentKey = content.trim();
    const count = (_a = contentCounters.get(contentKey)) != null ? _a : 0;
    contentCounters.set(contentKey, count + 1);
    return generateHashId(contentKey + "-" + count, "cdx-tooltip");
  }
  isVisible() {
    return this.tooltipElement.style.display === "block";
  }
  show() {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
    }
    this.tooltipElement.style.display = "block";
    this.tooltipElement.ownerDocument.addEventListener("keyup", this.escapeHandler);
  }
  hide() {
    this.tooltipElement.style.display = "none";
    this.tooltipElement.ownerDocument.removeEventListener("keyup", this.escapeHandler);
  }
  hideAfterDelay() {
    this.timeoutId = setTimeout(this.hide.bind(this), 250);
  }
  onKeyup(event) {
    if (event.key === "Escape" && this.isVisible()) {
      this.hide();
    }
  }
  addEventListeners() {
    Object.keys(this.referenceElementHandlers).forEach((k) => {
      this.referenceElement.addEventListener(k, this.referenceElementHandlers[k]);
    });
    Object.keys(this.tooltipElementHandlers).forEach((k) => {
      this.tooltipElement.addEventListener(k, this.tooltipElementHandlers[k]);
    });
  }
  removeEventListeners() {
    Object.keys(this.referenceElementHandlers).forEach((k) => {
      this.referenceElement.removeEventListener(k, this.referenceElementHandlers[k]);
    });
    Object.keys(this.tooltipElementHandlers).forEach((k) => {
      this.tooltipElement.removeEventListener(k, this.tooltipElementHandlers[k]);
    });
  }
  update() {
    computePosition(this.referenceElement, this.tooltipElement, {
      placement: this.placement,
      middleware: [
        offset(4),
        flip(),
        shift(),
        hide()
      ]
    }).then(({ x, y, middlewareData }) => {
      var _a, _b, _c;
      const finalPlacement = (_b = (_a = middlewareData.offset) == null ? void 0 : _a.placement) != null ? _b : this.placement;
      Object.assign(this.tooltipElement.style, {
        left: "".concat(x, "px"),
        top: "".concat(y, "px"),
        visibility: ((_c = middlewareData.hide) == null ? void 0 : _c.referenceHidden) ? "hidden" : "visible",
        transformOrigin: oppositeSides[finalPlacement]
      });
    });
  }
  updateWithOptions(options) {
    var _a;
    this.textContent = options.textContent;
    this.placement = (_a = options.placement) != null ? _a : this.placement;
    this.tooltipElement.textContent = this.textContent;
    this.update();
  }
  remove() {
    this.tooltipElement.remove();
    this.autoUpdateCleanup();
    this.removeEventListeners();
  }
}
const CdxTooltip = {
  mounted(el, { value, arg }) {
    if (!value) {
      return;
    }
    if (typeof value === "string" && value.trim() === "") {
      return;
    }
    el.tooltip = new Tooltip(el, {
      textContent: String(value),
      placement: arg
    });
  },
  updated(el, { value, arg }) {
    if (value === null) {
      return;
    }
    if (!el.tooltip) {
      el.tooltip = new Tooltip(el, {
        textContent: String(value),
        placement: arg
      });
    } else {
      el.tooltip.updateWithOptions({
        textContent: String(value),
        placement: arg
      });
    }
  },
  beforeUnmount(el) {
    if (el.tooltip) {
      el.tooltip.remove();
    }
  }
};
const _sfc_main$t = defineComponent({
  name: "CdxInputChip",
  components: {
    CdxButton,
    CdxIcon
  },
  directives: {
    tooltip: CdxTooltip
  },
  props: {
    /**
     * Custom icon.
     */
    icon: {
      type: [String, Object],
      default: null
    },
    /**
     * Whether the InputChip can be removed.
     */
    disabled: {
      type: Boolean,
      default: false
    },
    /**
     * Whether the InputChip is readonly.
     */
    readonly: {
      type: Boolean,
      default: false
    },
    /**
     * CSS class for the InputChip.
     */
    className: {
      type: String,
      default: ""
    }
  },
  // expose is temporarily disabled to work around a Vue / vue-tsc bug, see
  // https://github.com/vuejs/language-tools/issues/5069
  /*
  expose: [
  	'focus'
  ],
  */
  emits: [
    /**
     * Emitted when a chip is removed by the user.
     *
     * @property {'button'|'Backspace'|'Delete'} method How the chip was removed
     */
    "remove-chip",
    /**
     * Emitted when a chip is clicked by the user.
     */
    "click-chip",
    /**
     * Emitted when the user presses the left arrow key.
     */
    "arrow-left",
    /**
     * Emitted when the user presses the right arrow key.
     */
    "arrow-right"
  ],
  setup(props, { emit, slots }) {
    const tabIndex = computed(() => props.disabled ? -1 : 0);
    const rootElement = ref();
    const rootClasses = computed(() => ({
      "cdx-input-chip--disabled": props.disabled,
      "cdx-input-chip--readonly": props.readonly,
      [props.className]: props.className.length > 0
    }));
    const ariaDescription = useI18n(
      "cdx-input-chip-aria-description",
      "Press Enter to edit or Delete to remove"
    );
    const textElement = ref();
    const isMounted = ref(false);
    const tooltipContent = computed(() => {
      if (!isMounted.value) {
        return null;
      }
      if (textElement.value && textElement.value.scrollWidth > textElement.value.clientWidth) {
        return useSlotContents(slots == null ? void 0 : slots.default)[0];
      }
      return null;
    });
    onMounted(() => {
      isMounted.value = true;
    });
    function onKeydown(e) {
      var _a;
      switch (e.key) {
        case "Enter":
          emit("click-chip");
          e.preventDefault();
          e.stopPropagation();
          break;
        case "Escape":
          (_a = rootElement.value) == null ? void 0 : _a.blur();
          e.preventDefault();
          e.stopPropagation();
          break;
        case "Backspace":
        case "Delete":
          emit("remove-chip", e.key);
          e.preventDefault();
          e.stopPropagation();
          break;
        case "ArrowLeft":
          emit("arrow-left");
          e.preventDefault();
          e.stopPropagation();
          break;
        case "ArrowRight":
          emit("arrow-right");
          e.preventDefault();
          e.stopPropagation();
          break;
      }
    }
    return {
      rootElement,
      rootClasses,
      ariaDescription,
      onKeydown,
      cdxIconClose: v4,
      tabIndex,
      tooltipContent,
      textElement
    };
  },
  methods: {
    /**
     * Focus the chip.
     *
     * @public
     */
    focus() {
      this.$refs.rootElement.focus();
    }
  }
});
const _hoisted_1$r = ["tabindex", "aria-description"];
const _hoisted_2$f = {
  ref: "textElement",
  class: "cdx-input-chip__text"
};
function _sfc_render$t(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_cdx_icon = resolveComponent("cdx-icon");
  const _component_cdx_button = resolveComponent("cdx-button");
  const _directive_tooltip = resolveDirective("tooltip");
  return withDirectives((openBlock(), createElementBlock("div", {
    ref: "rootElement",
    class: normalizeClass(["cdx-input-chip", _ctx.rootClasses]),
    tabindex: _ctx.tabIndex,
    role: "option",
    "aria-description": _ctx.ariaDescription,
    onKeydown: _cache[1] || (_cache[1] = (...args) => _ctx.onKeydown && _ctx.onKeydown(...args)),
    onClick: _cache[2] || (_cache[2] = ($event) => _ctx.$emit("click-chip"))
  }, [
    _ctx.icon ? (openBlock(), createBlock(_component_cdx_icon, {
      key: 0,
      icon: _ctx.icon,
      size: "small"
    }, null, 8, ["icon"])) : createCommentVNode("v-if", true),
    createElementVNode(
      "span",
      _hoisted_2$f,
      [
        renderSlot(_ctx.$slots, "default")
      ],
      512
      /* NEED_PATCH */
    ),
    createVNode(_component_cdx_button, {
      class: "cdx-input-chip__button",
      weight: "quiet",
      tabindex: "-1",
      "aria-hidden": "true",
      disabled: _ctx.disabled || _ctx.readonly,
      onClick: _cache[0] || (_cache[0] = withModifiers(($event) => _ctx.$emit("remove-chip", "button"), ["stop"]))
    }, {
      default: withCtx(() => [
        createVNode(_component_cdx_icon, {
          icon: _ctx.cdxIconClose,
          size: "x-small"
        }, null, 8, ["icon"])
      ]),
      _: 1
      /* STABLE */
    }, 8, ["disabled"])
  ], 42, _hoisted_1$r)), [
    [_directive_tooltip, _ctx.tooltipContent]
  ]);
}
const CdxInputChip = /* @__PURE__ */ _export_sfc(_sfc_main$t, [["render", _sfc_render$t]]);
const statusValidator$9 = makeStringTypeValidator(ValidationStatusTypes);
const _sfc_main$s = defineComponent({
  name: "CdxChipInput",
  components: {
    CdxInputChip
  },
  /**
   * We want the input to inherit attributes, not the root element.
   */
  inheritAttrs: false,
  props: {
    /**
     * Current chips present in the input.
     *
     * Provided by `v-model` binding in the parent component.
     */
    inputChips: {
      type: Array,
      required: true
    },
    /**
     * Current value of the text input. This prop is optional and should only be used if you
     * need to keep track of the text input value for some reason (e.g. for validation).
     *
     * Optionally provided by `v-model:input-value` binding in the parent component.
     */
    inputValue: {
      type: [String, Number],
      default: null
    },
    /**
     * Whether the text input should appear below the set of input chips.
     *
     * By default, the input chips are inline with the input.
     */
    separateInput: {
      type: Boolean,
      default: false
    },
    /**
     * `status` attribute of the input.
     */
    status: {
      type: String,
      default: "default",
      validator: statusValidator$9
    },
    /**
     * Validation function for chip text. If it returns false, the chip will not be added and
     * the error status will be set.
     */
    chipValidator: {
      type: Function,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      default: (value) => true
    },
    /**
     * Whether the input is disabled.
     */
    disabled: {
      type: Boolean,
      default: false
    },
    /**
     * Whether the ChipInput is readonly.
     */
    readonly: {
      type: Boolean,
      default: false
    }
  },
  emits: [
    /**
     * When the input chips change.
     *
     * @property {ChipInputItem[]} inputChips The new set of inputChips
     */
    "update:input-chips",
    /**
     * When the input value changes. Only emitted if the inputValue prop is provided.
     *
     * @property {string | number} inputValue The new input value
     */
    "update:input-value",
    /**
     * When a chip is clicked.
     *
     * @property {ChipInputItem} chip The clicked chip
     */
    "chip-click"
  ],
  setup(props, { emit, attrs }) {
    const rootElement = ref();
    const chipsContainer = ref();
    const separateInputWrapper = ref();
    const statusMessageContent = ref("");
    const computedDirection = useComputedDirection(rootElement);
    const input = ref();
    const allowArbitrary = inject(AllowArbitraryKey, ref(true));
    const internalInputValue = ref("");
    const computedInputValue = useOptionalModelWrapper(
      internalInputValue,
      toRef(props, "inputValue"),
      emit,
      "update:input-value"
    );
    const validatedStatus = ref("default");
    const internalStatus = computed(() => {
      if (validatedStatus.value === "error" || props.status === "error") {
        return "error";
      }
      return "default";
    });
    const { computedDisabled, computedStatus } = useFieldData(toRef(props, "disabled"), internalStatus);
    const isFocused = ref(false);
    const internalClasses = computed(() => ({
      "cdx-chip-input--has-separate-input": props.separateInput,
      ["cdx-chip-input--status-".concat(computedStatus.value)]: true,
      // We need focused and disabled classes on the root element, which contains the
      // chips and the input, since it is styled to look like the input.
      "cdx-chip-input--focused": isFocused.value,
      "cdx-chip-input--disabled": computedDisabled.value,
      "cdx-chip-input--readonly": props.readonly
    }));
    const {
      rootClasses,
      rootStyle,
      otherAttrs
    } = useSplitAttributes(attrs, internalClasses);
    const chipRefs = [];
    const currentChipToRemove = ref(null);
    const computedChipToRemove = computed(() => currentChipToRemove.value ? currentChipToRemove.value.value : "");
    const chipAddedMessage = useI18n(
      "cdx-chip-input-chip-added",
      (x) => "Chip ".concat(x, " was added."),
      [computedInputValue]
    );
    const chipRemovedMessage = useI18n(
      "cdx-chip-input-chip-removed",
      (x) => "Chip ".concat(x, " was removed."),
      [computedChipToRemove]
    );
    function assignChipTemplateRef(chip, index) {
      if (chip !== null) {
        chipRefs[index] = chip;
      }
    }
    const focusInput = () => {
      input.value.focus();
    };
    function addChip() {
      if (
        // If the input value is the same as a chip's value, or...
        !!props.inputChips.find((chip) => chip.value === computedInputValue.value) || // ...validation fails, set status to error.
        !props.chipValidator(computedInputValue.value)
      ) {
        validatedStatus.value = "error";
      } else if (computedInputValue.value.toString().length > 0) {
        statusMessageContent.value = chipAddedMessage.value;
        emit("update:input-chips", props.inputChips.concat({ value: computedInputValue.value }));
        computedInputValue.value = "";
      }
    }
    function removeChip(chipToRemove) {
      if (props.readonly || computedDisabled.value) {
        return;
      }
      emit("update:input-chips", props.inputChips.filter(
        (chip) => chip.value !== chipToRemove.value
      ));
    }
    function moveChipFocus(direction, startIndex) {
      const resolvedDirection = (
        // -1 for prev (left in LTR, right in RTL), +1 for next (right in LTR, left in RTL)
        computedDirection.value === "ltr" && direction === "left" || computedDirection.value === "rtl" && direction === "right" ? -1 : 1
      );
      const newIndex = startIndex + resolvedDirection;
      if (newIndex < 0) {
        return;
      }
      if (newIndex >= props.inputChips.length) {
        focusInput();
        return;
      }
      chipRefs[newIndex].focus();
    }
    function handleChipClick(clickedChip) {
      return __async(this, null, function* () {
        var _a;
        emit("chip-click", clickedChip);
        if (props.readonly || computedDisabled.value || !allowArbitrary.value) {
          return;
        }
        addChip();
        yield nextTick();
        removeChip(clickedChip);
        computedInputValue.value = (_a = clickedChip.label) != null ? _a : clickedChip.value;
        focusInput();
      });
    }
    function handleChipRemove(chipToRemove, index, method) {
      currentChipToRemove.value = chipToRemove;
      statusMessageContent.value = chipRemovedMessage.value;
      if (method === "button") {
        focusInput();
      } else if (method === "Backspace") {
        const newIndex = index === 0 ? 1 : index - 1;
        if (newIndex < props.inputChips.length) {
          chipRefs[newIndex].focus();
        } else {
          focusInput();
        }
      } else if (method === "Delete") {
        const newIndex = index + 1;
        if (newIndex < props.inputChips.length) {
          chipRefs[newIndex].focus();
        } else {
          focusInput();
        }
      }
      removeChip(chipToRemove);
    }
    function onInputKeydown(e) {
      var _a, _b;
      const prevArrow = computedDirection.value === "rtl" ? "ArrowRight" : "ArrowLeft";
      switch (e.key) {
        case "Enter":
          if (computedInputValue.value.toString().length > 0 && allowArbitrary.value) {
            addChip();
            e.preventDefault();
            e.stopPropagation();
            return;
          }
          break;
        case "Escape":
          (_a = input.value) == null ? void 0 : _a.blur();
          e.preventDefault();
          e.stopPropagation();
          return;
        case "Backspace":
        case prevArrow:
          if (((_b = input.value) == null ? void 0 : _b.selectionStart) === 0 && input.value.selectionEnd === 0 && props.inputChips.length > 0) {
            chipRefs[props.inputChips.length - 1].focus();
            e.preventDefault();
            e.stopPropagation();
            return;
          }
          break;
      }
    }
    function onInputFocus() {
      isFocused.value = true;
    }
    function onInputBlur() {
      isFocused.value = false;
    }
    function onFocusOut(e) {
      var _a;
      if (!((_a = rootElement.value) == null ? void 0 : _a.contains(e.relatedTarget)) && allowArbitrary.value) {
        addChip();
      }
    }
    watch(toRef(props, "inputChips"), (newVal) => {
      const matchingChip = newVal.find((chip) => chip.value === computedInputValue.value);
      validatedStatus.value = matchingChip ? "error" : "default";
    });
    watch(computedInputValue, () => {
      if (validatedStatus.value === "error") {
        validatedStatus.value = "default";
      }
    });
    return {
      rootElement,
      chipsContainer,
      separateInputWrapper,
      input,
      computedInputValue,
      rootClasses,
      rootStyle,
      otherAttrs,
      assignChipTemplateRef,
      handleChipClick,
      handleChipRemove,
      moveChipFocus,
      onInputKeydown,
      focusInput,
      onInputFocus,
      onInputBlur,
      onFocusOut,
      computedDisabled,
      statusMessageContent
    };
  }
});
const _hoisted_1$q = {
  ref: "chipsContainer",
  class: "cdx-chip-input__chips",
  role: "listbox",
  "aria-orientation": "horizontal"
};
const _hoisted_2$e = ["readonly", "disabled"];
const _hoisted_3$a = {
  key: 0,
  ref: "separateInputWrapper",
  class: "cdx-chip-input__separate-input"
};
const _hoisted_4$8 = ["readonly", "disabled"];
const _hoisted_5$8 = {
  class: "cdx-chip-input__aria-status",
  role: "status",
  "aria-live": "polite"
};
function _sfc_render$s(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_cdx_input_chip = resolveComponent("cdx-input-chip");
  return openBlock(), createElementBlock(
    "div",
    {
      ref: "rootElement",
      class: normalizeClass(["cdx-chip-input", _ctx.rootClasses]),
      style: normalizeStyle(_ctx.rootStyle),
      onClick: _cache[8] || (_cache[8] = ($event) => _ctx.disabled || _ctx.readonly ? null : _ctx.focusInput),
      onFocusout: _cache[9] || (_cache[9] = (...args) => _ctx.onFocusOut && _ctx.onFocusOut(...args))
    },
    [
      createElementVNode(
        "div",
        _hoisted_1$q,
        [
          (openBlock(true), createElementBlock(
            Fragment,
            null,
            renderList(_ctx.inputChips, (chip, index) => {
              return openBlock(), createBlock(_component_cdx_input_chip, {
                key: chip.value,
                ref_for: true,
                ref: (ref2) => _ctx.assignChipTemplateRef(ref2, index),
                class: normalizeClass(["cdx-chip-input__item", chip.className]),
                icon: chip.icon,
                readonly: _ctx.readonly,
                disabled: _ctx.computedDisabled,
                onClickChip: ($event) => _ctx.handleChipClick(chip),
                onRemoveChip: (method) => _ctx.handleChipRemove(chip, index, method),
                onArrowLeft: ($event) => _ctx.moveChipFocus("left", index),
                onArrowRight: ($event) => _ctx.moveChipFocus("right", index)
              }, {
                default: withCtx(() => {
                  var _a;
                  return [
                    createTextVNode(
                      toDisplayString((_a = chip.label) != null ? _a : chip.value),
                      1
                      /* TEXT */
                    )
                  ];
                }),
                _: 2
                /* DYNAMIC */
              }, 1032, ["class", "icon", "readonly", "disabled", "onClickChip", "onRemoveChip", "onArrowLeft", "onArrowRight"]);
            }),
            128
            /* KEYED_FRAGMENT */
          )),
          !_ctx.separateInput ? withDirectives((openBlock(), createElementBlock("input", mergeProps({
            key: 0,
            ref: "input",
            "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => _ctx.computedInputValue = $event),
            class: "cdx-chip-input__input",
            readonly: _ctx.readonly,
            disabled: _ctx.computedDisabled
          }, _ctx.otherAttrs, {
            onBlur: _cache[1] || (_cache[1] = (...args) => _ctx.onInputBlur && _ctx.onInputBlur(...args)),
            onFocus: _cache[2] || (_cache[2] = (...args) => _ctx.onInputFocus && _ctx.onInputFocus(...args)),
            onKeydown: _cache[3] || (_cache[3] = (...args) => _ctx.onInputKeydown && _ctx.onInputKeydown(...args))
          }), null, 16, _hoisted_2$e)), [
            [vModelDynamic, _ctx.computedInputValue]
          ]) : createCommentVNode("v-if", true)
        ],
        512
        /* NEED_PATCH */
      ),
      _ctx.separateInput ? (openBlock(), createElementBlock(
        "div",
        _hoisted_3$a,
        [
          withDirectives(createElementVNode("input", mergeProps({
            ref: "input",
            "onUpdate:modelValue": _cache[4] || (_cache[4] = ($event) => _ctx.computedInputValue = $event),
            class: "cdx-chip-input__input",
            readonly: _ctx.readonly,
            disabled: _ctx.computedDisabled
          }, _ctx.otherAttrs, {
            onBlur: _cache[5] || (_cache[5] = (...args) => _ctx.onInputBlur && _ctx.onInputBlur(...args)),
            onFocus: _cache[6] || (_cache[6] = (...args) => _ctx.onInputFocus && _ctx.onInputFocus(...args)),
            onKeydown: _cache[7] || (_cache[7] = (...args) => _ctx.onInputKeydown && _ctx.onInputKeydown(...args))
          }), null, 16, _hoisted_4$8), [
            [vModelDynamic, _ctx.computedInputValue]
          ])
        ],
        512
        /* NEED_PATCH */
      )) : createCommentVNode("v-if", true),
      createElementVNode(
        "div",
        _hoisted_5$8,
        toDisplayString(_ctx.statusMessageContent),
        1
        /* TEXT */
      )
    ],
    38
    /* CLASS, STYLE, NEED_HYDRATION */
  );
}
const CdxChipInput = /* @__PURE__ */ _export_sfc(_sfc_main$s, [["render", _sfc_render$s]]);
function regExpEscape(value) {
  return value.replace(/([\\{}()|.?*+\-^$[\]])/g, "\\$1");
}
const COMBINING_MARK = "[̀-ͯ҃-҉֑-ׇֽֿׁׂׅׄؐ-ًؚ-ٰٟۖ-ۜ۟-۪ۤۧۨ-ܑۭܰ-݊ަ-ް߫-߽߳ࠖ-࠙ࠛ-ࠣࠥ-ࠧࠩ-࡙࠭-࡛࣓-ࣣ࣡-ःऺ-़ा-ॏ॑-ॗॢॣঁ-ঃ়া-ৄেৈো-্ৗৢৣ৾ਁ-ਃ਼ਾ-ੂੇੈੋ-੍ੑੰੱੵઁ-ઃ઼ા-ૅે-ૉો-્ૢૣૺ-૿ଁ-ଃ଼ା-ୄେୈୋ-୍ୖୗୢୣஂா-ூெ-ைொ-்ௗఀ-ఄా-ౄె-ైొ-్ౕౖౢౣಁ-ಃ಼ಾ-ೄೆ-ೈೊ-್ೕೖೢೣഀ-ഃ഻഼ാ-ൄെ-ൈൊ-്ൗൢൣංඃ්ා-ුූෘ-ෟෲෳัิ-ฺ็-๎ັິ-ູົຼ່-ໍ༹༘༙༵༷༾༿ཱ-྄྆྇ྍ-ྗྙ-ྼ࿆ါ-ှၖ-ၙၞ-ၠၢ-ၤၧ-ၭၱ-ၴႂ-ႍႏႚ-ႝ፝-፟ᜒ-᜔ᜲ-᜴ᝒᝓᝲᝳ឴-៓៝᠋-᠍ᢅᢆᢩᤠ-ᤫᤰ-᤻ᨗ-ᨛᩕ-ᩞ᩠-᩿᩼᪰-᪾ᬀ-ᬄ᬴-᭄᭫-᭳ᮀ-ᮂᮡ-ᮭ᯦-᯳ᰤ-᰷᳐-᳔᳒-᳨᳭ᳲ-᳴᳷-᳹᷀-᷹᷻-᷿⃐-⃰⳯-⵿⳱ⷠ-〪ⷿ-゙゚〯꙯-꙲ꙴ-꙽ꚞꚟ꛰꛱ꠂ꠆ꠋꠣ-ꠧꢀꢁꢴ-ꣅ꣠-꣱ꣿꤦ-꤭ꥇ-꥓ꦀ-ꦃ꦳-꧀ꧥꨩ-ꨶꩃꩌꩍꩻ-ꩽꪰꪲ-ꪴꪷꪸꪾ꪿꫁ꫫ-ꫯꫵ꫶ꯣ-ꯪ꯬꯭ﬞ︀-️︠-︯]";
function splitStringAtMatch(query, title) {
  if (!query) {
    return [title, "", ""];
  }
  const sanitizedQuery = regExpEscape(query);
  const match = new RegExp(
    // Per https://www.regular-expressions.info/unicode.html, "any code point that is not a
    // combining mark can be followed by any number of combining marks." See also the
    // discussion in https://phabricator.wikimedia.org/T35242.
    sanitizedQuery + COMBINING_MARK + "*",
    "i"
  ).exec(title);
  if (!match || match.index === void 0) {
    return [title, "", ""];
  }
  const matchStartIndex = match.index;
  const matchEndIndex = matchStartIndex + match[0].length;
  const highlightedTitle = title.slice(matchStartIndex, matchEndIndex);
  const beforeHighlight = title.slice(0, matchStartIndex);
  const afterHighlight = title.slice(matchEndIndex, title.length);
  return [beforeHighlight, highlightedTitle, afterHighlight];
}
const stringHelpers = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  regExpEscape,
  splitStringAtMatch
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$r = defineComponent({
  name: "CdxSearchResultTitle",
  props: {
    /**
     * Title text.
     */
    title: {
      type: String,
      required: true
    },
    /**
     * The current search query.
     */
    searchQuery: {
      type: String,
      default: ""
    }
  },
  setup: (props) => {
    const titleChunks = computed(
      () => splitStringAtMatch(props.searchQuery, String(props.title))
    );
    return {
      titleChunks
    };
  }
});
const _hoisted_1$p = { class: "cdx-search-result-title" };
const _hoisted_2$d = { class: "cdx-search-result-title__match" };
function _sfc_render$r(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("span", _hoisted_1$p, [
    createElementVNode("bdi", null, [
      createTextVNode(
        toDisplayString(_ctx.titleChunks[0]),
        1
        /* TEXT */
      ),
      createElementVNode(
        "span",
        _hoisted_2$d,
        toDisplayString(_ctx.titleChunks[1]),
        1
        /* TEXT */
      ),
      createTextVNode(
        toDisplayString(_ctx.titleChunks[2]),
        1
        /* TEXT */
      )
    ])
  ]);
}
const CdxSearchResultTitle = /* @__PURE__ */ _export_sfc(_sfc_main$r, [["render", _sfc_render$r]]);
const _sfc_main$q = defineComponent({
  name: "CdxMenuItem",
  components: { CdxIcon, CdxThumbnail, CdxSearchResultTitle },
  props: {
    /**
     * ID for HTML `id` attribute.
     */
    id: {
      type: String,
      required: true
    },
    /**
     * The value provided to the parent menu component when this menu item is selected.
     */
    value: {
      type: [String, Number],
      required: true
    },
    /**
     * Whether the menu item is disabled.
     */
    disabled: {
      type: Boolean,
      default: false
    },
    /**
     * Whether this menu item is selected.
     */
    selected: {
      type: Boolean,
      default: false
    },
    /**
     * Whether this menu item is being pressed.
     */
    active: {
      type: Boolean,
      default: false
    },
    /**
     * Whether this menu item is visually highlighted due to hover or keyboard navigation.
     */
    highlighted: {
      type: Boolean,
      default: false
    },
    /**
     * Label for the menu item. If this isn't provided, the value will be displayed instead.
     */
    label: {
      type: String,
      default: ""
    },
    /**
     * Text that matches current search query. Only used for search results and will be
     * displayed after the label.
     */
    match: {
      type: String,
      default: ""
    },
    /**
     * Text that supports the label. Supporting text will appear next to the label in a more
     * subtle color.
     */
    supportingText: {
      type: String,
      default: ""
    },
    /**
     * URL for the menu item. If provided, the content of the menu item will be wrapped in an
     * anchor tag.
     */
    url: {
      type: String,
      default: ""
    },
    /**
     * Icon for the menu item.
     */
    icon: {
      type: [String, Object],
      default: ""
    },
    /**
     * Whether a thumbnail (or a placeholder icon) should be displayed.
     */
    showThumbnail: {
      type: Boolean,
      default: false
    },
    /**
     * Thumbnail for the menu item.
     */
    thumbnail: {
      type: [Object, null],
      default: null
    },
    /**
     * Description of the menu item.
     */
    description: {
      type: [String, null],
      default: ""
    },
    /**
     * The search query to be highlighted within the menu item's title.
     */
    searchQuery: {
      type: String,
      default: ""
    },
    /**
     * Whether to bold menu item labels.
     */
    boldLabel: {
      type: Boolean,
      default: false
    },
    /**
     * Whether to hide description text overflow via an ellipsis.
     */
    hideDescriptionOverflow: {
      type: Boolean,
      default: false
    },
    /**
     * Optional language codes for label, match, supporting text, and description.
     *
     * If included, that language code will be added as a `lang` attribute to the element
     * wrapping that text node.
     *
     * @default {}
     */
    language: {
      type: Object,
      default: () => ({})
    },
    /**
     * MenuItems inside a MenuButton can also support an "action" prop
     */
    action: {
      type: String,
      default: "default"
    },
    /**
     * Whether this menu is in multiselect mode.
     */
    multiselect: {
      type: Boolean,
      default: false
    }
  },
  emits: [
    /**
     * Emitted when the menu item becomes selected, active or highlighted in response to
     * user interaction. Handled in the Menu component.
     *
     * @property {MenuState} menuState State to change
     * @property {boolean} setState Whether to set that state to this menu item
     */
    "change"
  ],
  setup: (props, { emit }) => {
    const onMouseMove = () => {
      if (!props.highlighted) {
        emit("change", "highlighted", true);
      }
    };
    const onMouseLeave = () => {
      emit("change", "highlighted", false);
    };
    const onMouseDown = (e) => {
      if (e.button === 0) {
        emit("change", "active", true);
      }
    };
    const onClick = () => {
      emit("change", "selected", true);
    };
    const highlightQuery = computed(() => props.searchQuery.length > 0);
    const rootClasses = computed(() => ({
      "cdx-menu-item--selected": props.selected,
      // Only show the active visual state when the menu item is both active and
      // highlighted. This means, on mousedown -> mouseleave, the menu item is still
      // technically tracked by the menu as active, but will not appear active to the
      // user. This also means in the case of mousedown -> mouseleave -> mouseenter, the
      // menu item will appear active again, and on click (releasing the mouse button),
      // the item will be selected.
      "cdx-menu-item--active": props.active && props.highlighted,
      "cdx-menu-item--highlighted": props.highlighted,
      "cdx-menu-item--destructive": props.action && props.action === "destructive",
      "cdx-menu-item--enabled": !props.disabled,
      "cdx-menu-item--disabled": props.disabled,
      "cdx-menu-item--highlight-query": highlightQuery.value,
      "cdx-menu-item--bold-label": props.boldLabel,
      "cdx-menu-item--has-description": !!props.description,
      "cdx-menu-item--hide-description-overflow": props.hideDescriptionOverflow
    }));
    const contentTag = computed(() => props.url ? "a" : "span");
    const title = computed(() => props.label || String(props.value));
    return {
      onMouseMove,
      onMouseLeave,
      onMouseDown,
      onClick,
      highlightQuery,
      rootClasses,
      contentTag,
      title,
      cdxIconCheck: o4
    };
  }
});
const _hoisted_1$o = ["id", "aria-disabled", "aria-selected", "aria-checked"];
const _hoisted_2$c = { class: "cdx-menu-item__text" };
const _hoisted_3$9 = ["lang"];
const _hoisted_4$7 = ["lang"];
const _hoisted_5$7 = ["lang"];
const _hoisted_6$6 = ["lang"];
function _sfc_render$q(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_cdx_thumbnail = resolveComponent("cdx-thumbnail");
  const _component_cdx_icon = resolveComponent("cdx-icon");
  const _component_cdx_search_result_title = resolveComponent("cdx-search-result-title");
  return openBlock(), createElementBlock("li", {
    id: _ctx.id,
    role: "option",
    class: normalizeClass(["cdx-menu-item", _ctx.rootClasses]),
    "aria-disabled": _ctx.disabled,
    "aria-selected": _ctx.selected && !_ctx.multiselect ? true : void 0,
    "aria-checked": _ctx.selected && _ctx.multiselect ? true : void 0,
    onMousemove: _cache[0] || (_cache[0] = (...args) => _ctx.onMouseMove && _ctx.onMouseMove(...args)),
    onMouseleave: _cache[1] || (_cache[1] = (...args) => _ctx.onMouseLeave && _ctx.onMouseLeave(...args)),
    onMousedown: _cache[2] || (_cache[2] = withModifiers((...args) => _ctx.onMouseDown && _ctx.onMouseDown(...args), ["prevent"])),
    onClick: _cache[3] || (_cache[3] = (...args) => _ctx.onClick && _ctx.onClick(...args))
  }, [
    renderSlot(_ctx.$slots, "default", {}, () => [
      (openBlock(), createBlock(resolveDynamicComponent(_ctx.contentTag), {
        href: _ctx.url ? _ctx.url : void 0,
        class: "cdx-menu-item__content"
      }, {
        default: withCtx(() => {
          var _a, _b, _c, _d, _e, _f;
          return [
            _ctx.showThumbnail ? (openBlock(), createBlock(_component_cdx_thumbnail, {
              key: 0,
              thumbnail: _ctx.thumbnail,
              class: "cdx-menu-item__thumbnail"
            }, null, 8, ["thumbnail"])) : _ctx.icon ? (openBlock(), createBlock(_component_cdx_icon, {
              key: 1,
              icon: _ctx.icon,
              class: "cdx-menu-item__icon"
            }, null, 8, ["icon"])) : createCommentVNode("v-if", true),
            createElementVNode("span", _hoisted_2$c, [
              _ctx.highlightQuery ? (openBlock(), createBlock(_component_cdx_search_result_title, {
                key: 0,
                title: _ctx.title,
                "search-query": _ctx.searchQuery,
                lang: (_a = _ctx.language) == null ? void 0 : _a.label
              }, null, 8, ["title", "search-query", "lang"])) : (openBlock(), createElementBlock("span", {
                key: 1,
                class: "cdx-menu-item__text__label",
                lang: (_b = _ctx.language) == null ? void 0 : _b.label
              }, [
                createElementVNode(
                  "bdi",
                  null,
                  toDisplayString(_ctx.title),
                  1
                  /* TEXT */
                )
              ], 8, _hoisted_3$9)),
              _ctx.match ? (openBlock(), createElementBlock(
                Fragment,
                { key: 2 },
                [
                  _cache[4] || (_cache[4] = createTextVNode(toDisplayString(" ") + " ")),
                  _ctx.highlightQuery ? (openBlock(), createBlock(_component_cdx_search_result_title, {
                    key: 0,
                    title: _ctx.match,
                    "search-query": _ctx.searchQuery,
                    lang: (_c = _ctx.language) == null ? void 0 : _c.match
                  }, null, 8, ["title", "search-query", "lang"])) : (openBlock(), createElementBlock("span", {
                    key: 1,
                    class: "cdx-menu-item__text__match",
                    lang: (_d = _ctx.language) == null ? void 0 : _d.match
                  }, [
                    createElementVNode(
                      "bdi",
                      null,
                      toDisplayString(_ctx.match),
                      1
                      /* TEXT */
                    )
                  ], 8, _hoisted_4$7))
                ],
                64
                /* STABLE_FRAGMENT */
              )) : createCommentVNode("v-if", true),
              _ctx.supportingText ? (openBlock(), createElementBlock(
                Fragment,
                { key: 3 },
                [
                  _cache[5] || (_cache[5] = createTextVNode(toDisplayString(" ") + " ")),
                  createElementVNode("span", {
                    class: "cdx-menu-item__text__supporting-text",
                    lang: (_e = _ctx.language) == null ? void 0 : _e.supportingText
                  }, [
                    createElementVNode(
                      "bdi",
                      null,
                      toDisplayString(_ctx.supportingText),
                      1
                      /* TEXT */
                    )
                  ], 8, _hoisted_5$7)
                ],
                64
                /* STABLE_FRAGMENT */
              )) : createCommentVNode("v-if", true),
              _ctx.description ? (openBlock(), createElementBlock("span", {
                key: 4,
                class: "cdx-menu-item__text__description",
                lang: (_f = _ctx.language) == null ? void 0 : _f.description
              }, [
                createElementVNode(
                  "bdi",
                  null,
                  toDisplayString(_ctx.description),
                  1
                  /* TEXT */
                )
              ], 8, _hoisted_6$6)) : createCommentVNode("v-if", true)
            ]),
            _ctx.multiselect && _ctx.selected ? (openBlock(), createBlock(_component_cdx_icon, {
              key: 2,
              icon: _ctx.cdxIconCheck,
              size: "small",
              class: "cdx-menu-item__selected-icon"
            }, null, 8, ["icon"])) : createCommentVNode("v-if", true)
          ];
        }),
        _: 1
        /* STABLE */
      }, 8, ["href"]))
    ])
  ], 42, _hoisted_1$o);
}
const CdxMenuItem = /* @__PURE__ */ _export_sfc(_sfc_main$q, [["render", _sfc_render$q]]);
const _sfc_main$p = defineComponent({
  name: "CdxProgressBar",
  props: {
    /**
     * Whether this is the smaller, inline variant.
     */
    inline: {
      type: Boolean,
      default: false
    },
    /**
     * Whether the progress bar is disabled.
     */
    disabled: {
      type: Boolean,
      default: false
    }
  },
  setup(props, { attrs }) {
    useWarnOnce(
      () => !props.inline && !attrs["aria-label"] && !attrs["aria-hidden"],
      "CdxProgressBar: Progress bars require one of the following attribute, aria-label or aria-hidden. See documentation on https://doc.wikimedia.org/codex/latest/components/demos/progressbar.html"
    );
    const rootClasses = computed(() => ({
      "cdx-progress-bar--block": !props.inline,
      "cdx-progress-bar--inline": props.inline,
      "cdx-progress-bar--enabled": !props.disabled,
      "cdx-progress-bar--disabled": props.disabled
    }));
    const computedAriaHidden = computed(
      // Set `aria-hidden` to `true` only when `inline` prop is true.
      // Otherwise, don't set the attribute.
      () => props.inline ? "true" : void 0
    );
    return {
      rootClasses,
      computedAriaHidden
    };
  }
});
const _hoisted_1$n = ["aria-hidden", "aria-disabled"];
function _sfc_render$p(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", {
    class: normalizeClass(["cdx-progress-bar", _ctx.rootClasses]),
    role: "progressbar",
    "aria-hidden": _ctx.computedAriaHidden,
    "aria-disabled": _ctx.disabled
  }, _cache[0] || (_cache[0] = [
    createElementVNode(
      "div",
      { class: "cdx-progress-bar__bar" },
      null,
      -1
      /* CACHED */
    )
  ]), 10, _hoisted_1$n);
}
const CdxProgressBar = /* @__PURE__ */ _export_sfc(_sfc_main$p, [["render", _sfc_render$p]]);
function useIntersectionObserver(templateRef, observerOptions) {
  const intersectionRef = ref(false);
  let mounted = false;
  if (typeof window !== "object") {
    return intersectionRef;
  }
  if (!("IntersectionObserver" in window && "IntersectionObserverEntry" in window && "intersectionRatio" in window.IntersectionObserverEntry.prototype)) {
    return intersectionRef;
  }
  const observer = new window.IntersectionObserver(
    (entries) => {
      const entry = entries[0];
      if (entry) {
        intersectionRef.value = entry.isIntersecting;
      }
    },
    observerOptions
  );
  onMounted(() => {
    mounted = true;
    if (templateRef.value) {
      observer.observe(templateRef.value);
    }
  });
  onUnmounted(() => {
    mounted = false;
    observer.disconnect();
  });
  watch(templateRef, (newElement) => {
    if (!mounted) {
      return;
    }
    observer.disconnect();
    intersectionRef.value = false;
    if (newElement) {
      observer.observe(newElement);
    }
  });
  return intersectionRef;
}
function selectedIsArray(selected) {
  return selected !== null && Array.isArray(selected);
}
function isMenuGroupData(menuEntry) {
  return "items" in menuEntry;
}
const _sfc_main$o = defineComponent({
  name: "CdxMenu",
  components: {
    CdxMenuItem,
    CdxIcon,
    CdxProgressBar
  },
  /**
   * Attributes, besides class and style, will be passed to the <ul> element.
   */
  inheritAttrs: false,
  props: {
    /**
     * Menu items and menu group definitions.
     *
     * Menu groups and individual menu items will be output in the order they appear here.
     */
    menuItems: {
      type: Array,
      required: true
    },
    /**
     * Interactive footer item.
     *
     * This is a special menu item which is pinned to the bottom of the menu. When scrolling is
     * enabled within the menu, the footer item will always be visible at the bottom of the
     * menu. When scrolling is not enabled, the footer item will simply appear as the last menu
     * item.
     *
     * The footer item is selectable, like other menu items.
     */
    footer: {
      type: Object,
      default: null
    },
    /**
     * Value(s) of the selected menu item(s). A single value for single-select, or an array of
     * values for multi-select.
     *
     * Must be bound with `v-model:selected`.
     *
     * The property should be initialized to `null` (for single-select) or an empty array (for
     * multi-select) rather than using a falsy value.
     */
    selected: {
      // eslint-disable-next-line max-len
      type: [String, Number, Array, null],
      required: true
    },
    /**
     * Whether the menu is expanded. Must be bound with `v-model:expanded`.
     */
    expanded: {
      type: Boolean,
      required: true
    },
    /**
     * Whether to display pending state indicators. Meant to indicate that new menu items are
     * being fetched or computed.
     *
     * When true, the menu will expand if not already expanded, and an inline progress bar will
     * display. If there are no menu items yet, a message can be displayed in the `pending`
     * slot, e.g. "Loading results".
     */
    showPending: {
      type: Boolean,
      default: false
    },
    /**
     * Limit the number of menu items to display before scrolling.
     *
     * Setting this prop to anything falsy will show all menu items.
     *
     * By default, all menu items are shown.
     */
    visibleItemLimit: {
      type: Number,
      default: null
    },
    /**
     * Whether menu item thumbnails (or a placeholder icon) should be displayed.
     */
    showThumbnail: {
      type: Boolean,
      default: false
    },
    /**
     * Whether to bold menu item labels.
     */
    boldLabel: {
      type: Boolean,
      default: false
    },
    /**
     * Whether to hide description text overflow via an ellipsis.
     */
    hideDescriptionOverflow: {
      type: Boolean,
      default: false
    },
    /**
     * The search query to be highlighted within the menu items' titles.
     */
    searchQuery: {
      type: String,
      default: ""
    },
    /**
     * Whether to show the `no-results` slot content.
     *
     * The Menu component automatically shows this slot when there is content in the
     * `no-results` slot and there are zero menu items. However, some components may need to
     * customize this behavior, e.g. to show the slot even when there is at least one menu item.
     * This prop can be used to override the default Menu behavior.
     *
     * Possible values:
     * `null` (default): the `no-results` slot will display only if there are zero menu items.
     * `true`: the `no-results` slot will display, regardless of number of menu items.
     * `false`: the `no-results` slot will not display, regardless of number of menu items.
     */
    showNoResultsSlot: {
      type: Boolean,
      default: null
    },
    /**
     * Whether to disable the use of teleport and render the Menu in its
     * original location in the document.
     *
     * Teleport is disabled by default for Menus, but it will be enabled if `'CdxTeleportMenus'`
     * is provided and set to true. Setting this prop prevents the Menu from being teleported
     * regardless of the value of `'CdxTeleportMenus'`.
     */
    renderInPlace: {
      type: Boolean,
      default: false
    }
  },
  emits: [
    // Don't remove the spaces in the "string | number | null" type below; removing these
    // spaces causes the documentation to render the type as "union" instead.
    // Keep property descriptions on a single line or they will get cut off.
    /**
     * When the selected menu item changes.
     *
     * Property will be a single value or `null` in single-select mode, or an array of values or
     * an empty array in multiselect mode.
     *
     * @property {MenuItemValue | MenuItemValue[] | null} selectedValue selected value or values
     */
    "update:selected",
    /**
     * When the menu opens or closes.
     *
     * @property {boolean} newValue The new expanded state (true for open, false for closed)
     */
    "update:expanded",
    /**
     * When a menu item is clicked.
     *
     * Typically, components with menus will respond to the selected value change, but
     * occasionally, a component might want to react specifically when a menu item is clicked.
     *
     * @property {MenuItemDataWithId} menuItem The menu item that was clicked
     */
    "menu-item-click",
    /**
     * When a menu item is highlighted via keyboard navigation.
     *
     * @property {MenuItemDataWithId} highlightedMenuItem The menu item
     * was highlighted
     */
    "menu-item-keyboard-navigation",
    /**
     * When the user scrolls towards the bottom of the menu.
     *
     * If it is possible to add or load more menu items, then now would be a good moment
     * so that the user can experience infinite scrolling.
     */
    "load-more"
  ],
  // expose is temporarily disabled to work around a Vue / vue-tsc bug, see
  // https://github.com/vuejs/language-tools/issues/5069
  /*
  expose: [
  	'isExpanded',
  	'getRootElement',
  	'clearActive',
  	'getHighlightedMenuItem',
  	'getHighlightedViaKeyboard',
  	'getComputedMenuItems',
  	'delegateKeyNavigation'
  ],
  */
  setup(props, { emit, slots, attrs }) {
    const menuInstanceId = useId();
    let idCounter = 0;
    const menuItemIds = /* @__PURE__ */ new Map();
    function generateId() {
      idCounter += 1;
      return "".concat(menuInstanceId, "-").concat(idCounter);
    }
    function assignIds(items) {
      items.forEach((item) => {
        if (isMenuGroupData(item)) {
          const groupKey = "group-".concat(item.label);
          if (!menuItemIds.has(groupKey)) {
            menuItemIds.set(groupKey, generateId());
          }
          item.items.forEach((subItem) => {
            if (!menuItemIds.has(subItem.value)) {
              menuItemIds.set(subItem.value, generateId());
            }
          });
        } else if (!menuItemIds.has(item.value)) {
          menuItemIds.set(item.value, generateId());
        }
      });
    }
    watch(toRef(props, "menuItems"), (newItems) => {
      function getAllItemValues(items) {
        const values = /* @__PURE__ */ new Set();
        items.forEach((item) => {
          if (isMenuGroupData(item)) {
            values.add("group-".concat(item.label));
            item.items.forEach((subItem) => values.add(subItem.value));
          } else {
            values.add(item.value);
          }
        });
        return values;
      }
      const newItemSet = getAllItemValues(newItems);
      menuItemIds.forEach((_, key) => {
        if (!newItemSet.has(key)) {
          menuItemIds.delete(key);
        }
      });
    }, { deep: true });
    const computedMenuEntries = computed(() => {
      assignIds(props.menuItems);
      if (props.footer) {
        assignIds([props.footer]);
      }
      const menuItemsWithFooter = props.footer && props.menuItems ? [...props.menuItems, props.footer] : props.menuItems;
      function getMenuItemWithId(menuItem) {
        const id = menuItemIds.get(menuItem.value);
        if (!id) {
          throw new Error("No ID found for menu item with value ".concat(menuItem.value));
        }
        return __spreadProps(__spreadValues({}, menuItem), { id });
      }
      return menuItemsWithFooter.map((menuEntry) => {
        if (isMenuGroupData(menuEntry)) {
          const groupId = menuItemIds.get("group-".concat(menuEntry.label));
          if (!groupId) {
            throw new Error("No ID found for menu item with value group-".concat(menuEntry.label));
          }
          return __spreadProps(__spreadValues({}, menuEntry), {
            id: groupId,
            items: menuEntry.items.map((subItem) => getMenuItemWithId(subItem))
          });
        } else {
          return getMenuItemWithId(menuEntry);
        }
      });
    });
    const computedMenuItems = computed(() => {
      const items = [];
      computedMenuEntries.value.forEach((menuEntry) => {
        if (isMenuGroupData(menuEntry)) {
          items.push(...menuEntry.items);
        } else {
          items.push(menuEntry);
        }
      });
      return items;
    });
    const computedShowNoResultsSlot = computed(() => {
      if (!slots["no-results"]) {
        return false;
      }
      if (props.showNoResultsSlot !== null) {
        return props.showNoResultsSlot;
      }
      return computedMenuItems.value.length === 0;
    });
    const highlightedMenuItem = ref(null);
    const highlightedViaKeyboard = ref(false);
    const activeMenuItem = ref(null);
    const providedTeleport = inject("CdxTeleportMenus", false);
    const teleportDisabled = computed(
      () => !unref(providedTeleport) || props.renderInPlace
    );
    const providedTarget = inject("CdxTeleportTarget", void 0);
    const computedTarget = computed(() => {
      var _a;
      return (_a = unref(providedTarget)) != null ? _a : "body";
    });
    const ariaRelevant = "additions removals";
    let keyBuffer = "";
    let keyBufferTimeout = null;
    function clearKeyBuffer() {
      keyBuffer = "";
      if (keyBufferTimeout !== null) {
        clearTimeout(keyBufferTimeout);
        keyBufferTimeout = null;
      }
    }
    function resetKeyBufferTimeout() {
      if (keyBufferTimeout !== null) {
        clearTimeout(keyBufferTimeout);
      }
      keyBufferTimeout = setTimeout(clearKeyBuffer, 1500);
    }
    function findFirstSelectedMenuItem() {
      var _a;
      return (_a = computedMenuItems.value.find(
        (menuItem) => selectedIsArray(props.selected) ? props.selected.includes(menuItem.value) : menuItem.value === props.selected
      )) != null ? _a : null;
    }
    const isMultiselect = computed(() => selectedIsArray(props.selected));
    function isItemSelected(value) {
      return selectedIsArray(props.selected) ? props.selected.includes(value) : value === props.selected;
    }
    function updateSelected(value) {
      if (selectedIsArray(props.selected)) {
        const newSelected = !props.selected.includes(value) ? props.selected.concat(value) : props.selected.filter((item) => item !== value);
        emit("update:selected", newSelected);
      } else {
        emit("update:selected", value);
      }
    }
    function handleMenuItemChange(menuState, menuItem) {
      if (menuItem == null ? void 0 : menuItem.disabled) {
        return;
      }
      switch (menuState) {
        case "selected":
          if (menuItem) {
            updateSelected(menuItem.value);
          }
          if (!isMultiselect.value) {
            emit("update:expanded", false);
          }
          activeMenuItem.value = null;
          break;
        case "highlighted":
          highlightedMenuItem.value = menuItem != null ? menuItem : null;
          highlightedViaKeyboard.value = false;
          break;
        case "highlightedViaKeyboard":
          highlightedMenuItem.value = menuItem != null ? menuItem : null;
          highlightedViaKeyboard.value = true;
          break;
        case "active":
          activeMenuItem.value = menuItem != null ? menuItem : null;
          break;
      }
    }
    const highlightedMenuItemIndex = computed(() => {
      if (highlightedMenuItem.value === null) {
        return;
      }
      return computedMenuItems.value.findIndex(
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        (menuItem) => menuItem.value === highlightedMenuItem.value.value
      );
    });
    function handleHighlightViaKeyboard(newHighlightedMenuItem) {
      if (!newHighlightedMenuItem) {
        return;
      }
      handleMenuItemChange("highlightedViaKeyboard", newHighlightedMenuItem);
      emit("menu-item-keyboard-navigation", newHighlightedMenuItem);
    }
    function highlightPrev(highlightedIndex) {
      var _a;
      const findPrevEnabled = (startIndex) => {
        for (let index = startIndex - 1; index >= 0; index--) {
          if (!computedMenuItems.value[index].disabled) {
            return computedMenuItems.value[index];
          }
        }
      };
      highlightedIndex = highlightedIndex != null ? highlightedIndex : computedMenuItems.value.length;
      const prev = (_a = findPrevEnabled(highlightedIndex)) != null ? _a : findPrevEnabled(computedMenuItems.value.length);
      handleHighlightViaKeyboard(prev);
    }
    function highlightNext(highlightedIndex) {
      var _a;
      const findNextEnabled = (startIndex) => computedMenuItems.value.find(
        (item, index) => !item.disabled && index > startIndex
      );
      highlightedIndex = highlightedIndex != null ? highlightedIndex : -1;
      const next = (_a = findNextEnabled(highlightedIndex)) != null ? _a : findNextEnabled(-1);
      handleHighlightViaKeyboard(next);
    }
    function handleCharacterNavigation(e) {
      if (e.key === "Clear") {
        clearKeyBuffer();
        return true;
      }
      if (e.key === "Backspace") {
        keyBuffer = keyBuffer.slice(0, -1);
        resetKeyBufferTimeout();
        return true;
      }
      if (e.key.length === 1 && !e.metaKey && !e.ctrlKey && !e.altKey) {
        if (!props.expanded) {
          emit("update:expanded", true);
        }
        if (e.key === " " && keyBuffer.length < 1) {
          return false;
        }
        keyBuffer += e.key.toLowerCase();
        const isRepeatedCharacter = keyBuffer.length > 1 && keyBuffer.split("").every((char) => char === keyBuffer[0]);
        let itemsToMatch = computedMenuItems.value;
        let stringToMatch = keyBuffer;
        if (isRepeatedCharacter && highlightedMenuItemIndex.value !== void 0) {
          itemsToMatch = itemsToMatch.slice(highlightedMenuItemIndex.value + 1).concat(itemsToMatch.slice(0, highlightedMenuItemIndex.value));
          stringToMatch = keyBuffer[0];
        }
        const matchingItem = itemsToMatch.find(
          (item) => {
            var _a;
            return !item.disabled && String((_a = item.label) != null ? _a : item.value).toLowerCase().startsWith(stringToMatch);
          }
        );
        if (matchingItem) {
          handleMenuItemChange("highlightedViaKeyboard", matchingItem);
          maybeScrollIntoView();
        }
        resetKeyBufferTimeout();
        return true;
      }
      return false;
    }
    function handleKeyNavigation(e, { prevent = true, characterNavigation = false } = {}) {
      if (characterNavigation) {
        if (handleCharacterNavigation(e)) {
          e.preventDefault();
          return true;
        }
        clearKeyBuffer();
      }
      function maybePrevent() {
        if (prevent) {
          e.preventDefault();
          e.stopPropagation();
        }
      }
      switch (e.key) {
        case "Enter":
        case " ":
          maybePrevent();
          if (props.expanded) {
            if (highlightedMenuItem.value && highlightedViaKeyboard.value) {
              updateSelected(highlightedMenuItem.value.value);
            }
            if (!isMultiselect.value) {
              emit("update:expanded", false);
            }
          } else {
            emit("update:expanded", true);
          }
          return true;
        case "Tab":
          if (props.expanded) {
            if (highlightedMenuItem.value && highlightedViaKeyboard.value && !isMultiselect.value) {
              updateSelected(highlightedMenuItem.value.value);
              emit("update:expanded", false);
            }
          }
          return true;
        case "ArrowUp":
          maybePrevent();
          if (props.expanded) {
            if (highlightedMenuItem.value === null) {
              handleMenuItemChange("highlightedViaKeyboard", findFirstSelectedMenuItem());
            }
            highlightPrev(highlightedMenuItemIndex.value);
          } else {
            emit("update:expanded", true);
          }
          maybeScrollIntoView();
          return true;
        case "ArrowDown":
          maybePrevent();
          if (props.expanded) {
            if (highlightedMenuItem.value === null) {
              handleMenuItemChange("highlightedViaKeyboard", findFirstSelectedMenuItem());
            }
            highlightNext(highlightedMenuItemIndex.value);
          } else {
            emit("update:expanded", true);
          }
          maybeScrollIntoView();
          return true;
        case "Home":
          maybePrevent();
          if (props.expanded) {
            if (highlightedMenuItem.value === null) {
              handleMenuItemChange("highlightedViaKeyboard", findFirstSelectedMenuItem());
            }
            highlightNext();
          } else {
            emit("update:expanded", true);
          }
          maybeScrollIntoView();
          return true;
        case "End":
          maybePrevent();
          if (props.expanded) {
            if (highlightedMenuItem.value === null) {
              handleMenuItemChange("highlightedViaKeyboard", findFirstSelectedMenuItem());
            }
            highlightPrev();
          } else {
            emit("update:expanded", true);
          }
          maybeScrollIntoView();
          return true;
        case "Escape":
          maybePrevent();
          emit("update:expanded", false);
          return true;
        default:
          return false;
      }
    }
    function onMouseUp() {
      handleMenuItemChange("active", null);
    }
    const menuItemElements = [];
    const loadMoreTriggerElement = ref(void 0);
    const isTriggerVisible = useIntersectionObserver(
      loadMoreTriggerElement,
      { threshold: 0.8 }
    );
    watch(isTriggerVisible, (value) => {
      if (value) {
        emit("load-more");
      }
    });
    function assignTemplateRef(templateRef, index) {
      if (templateRef) {
        menuItemElements[index] = templateRef.$el;
        const visibleItemLimit = props.visibleItemLimit;
        if (!visibleItemLimit || props.menuItems.length < visibleItemLimit) {
          return;
        }
        const loadMoreThreshold = Math.min(
          visibleItemLimit,
          Math.max(2, Math.floor(0.2 * props.menuItems.length))
        );
        if (index === props.menuItems.length - loadMoreThreshold) {
          loadMoreTriggerElement.value = templateRef.$el;
        }
      }
    }
    const rootElement = ref();
    const menuListbox = ref();
    function maybeScrollIntoView() {
      const isListboxScrollable = menuListbox.value && menuListbox.value.scrollHeight > menuListbox.value.clientHeight;
      if (highlightedMenuItemIndex.value === void 0 || !isListboxScrollable) {
        return;
      }
      const scrollIndex = highlightedMenuItemIndex.value >= 0 ? highlightedMenuItemIndex.value : 0;
      requestAnimationFrame(() => {
        menuItemElements[scrollIndex].scrollIntoView({
          behavior: "smooth",
          block: "nearest"
        });
      });
    }
    const maxMenuHeight = ref(null);
    const footerHeight = ref(null);
    function resizeMenu() {
      return __async(this, null, function* () {
        yield nextTick();
        updateFooterHeight();
        updateMaxMenuHeight();
        yield nextTick();
        maybeScrollIntoView();
      });
    }
    function updateFooterHeight() {
      if (props.footer) {
        const footerElement = menuItemElements[menuItemElements.length - 1];
        footerHeight.value = footerElement.scrollHeight;
      } else {
        footerHeight.value = null;
      }
    }
    function updateMaxMenuHeight() {
      if (!props.visibleItemLimit || menuItemElements.length <= props.visibleItemLimit) {
        maxMenuHeight.value = null;
        return;
      }
      const firstMenuItemTop = menuItemElements[0].getBoundingClientRect().top;
      const firstHiddenMenuItemTop = menuItemElements[props.visibleItemLimit].getBoundingClientRect().top;
      maxMenuHeight.value = firstHiddenMenuItemTop - firstMenuItemTop + 2;
    }
    function getGroupWrapperClasses(group) {
      return {
        "cdx-menu__group-wrapper--hide-label": !!group.hideLabel
      };
    }
    function getMenuItemIndex(menuItem) {
      return computedMenuItems.value.indexOf(menuItem);
    }
    function getMenuItemBindings(menuItem) {
      var _a, _b;
      return __spreadValues({
        selected: isItemSelected(menuItem.value),
        active: menuItem.value === ((_a = activeMenuItem.value) == null ? void 0 : _a.value),
        highlighted: menuItem.value === ((_b = highlightedMenuItem.value) == null ? void 0 : _b.value),
        showThumbnail: props.showThumbnail,
        boldLabel: props.boldLabel,
        hideDescriptionOverflow: props.hideDescriptionOverflow,
        searchQuery: props.searchQuery,
        multiselect: isMultiselect.value
      }, menuItem);
    }
    function getMenuItemHandlers(menuItem) {
      return {
        change: (menuState, setState) => handleMenuItemChange(menuState, setState ? menuItem : null),
        click: () => emit("menu-item-click", menuItem)
      };
    }
    function getSlotBindings(menuItem) {
      var _a, _b;
      return {
        menuItem,
        active: menuItem.value === ((_a = activeMenuItem.value) == null ? void 0 : _a.value) && menuItem.value === ((_b = highlightedMenuItem.value) == null ? void 0 : _b.value)
      };
    }
    onMounted(() => {
      document.addEventListener("mouseup", onMouseUp);
    });
    onUnmounted(() => {
      document.removeEventListener("mouseup", onMouseUp);
    });
    watch(toRef(props, "expanded"), (newVal) => __async(null, null, function* () {
      if (newVal) {
        const selectedMenuItem = findFirstSelectedMenuItem();
        if (selectedMenuItem && !highlightedMenuItem.value) {
          handleMenuItemChange("highlighted", selectedMenuItem);
        }
        yield resizeMenu();
      } else {
        handleMenuItemChange("highlighted", null);
      }
    }));
    watch(toRef(props, "menuItems"), (newPropMenuItems) => __async(null, null, function* () {
      if (newPropMenuItems.length < menuItemElements.length) {
        menuItemElements.length = newPropMenuItems.length;
      }
      if (props.expanded) {
        yield resizeMenu();
      }
    }), { deep: true });
    const listBoxStyle = computed(() => ({
      "max-height": maxMenuHeight.value ? "".concat(maxMenuHeight.value, "px") : void 0,
      "margin-bottom": footerHeight.value ? "".concat(footerHeight.value, "px") : void 0
    }));
    const internalClasses = computed(() => ({
      "cdx-menu--has-footer": !!props.footer
    }));
    const {
      rootClasses,
      rootStyle,
      otherAttrs
    } = useSplitAttributes(attrs, internalClasses);
    return {
      listBoxStyle,
      rootClasses,
      rootStyle,
      otherAttrs,
      assignTemplateRef,
      computedMenuEntries,
      computedMenuItems,
      computedShowNoResultsSlot,
      highlightedMenuItem,
      highlightedViaKeyboard,
      teleportDisabled,
      computedTarget,
      handleMenuItemChange,
      handleKeyNavigation,
      ariaRelevant,
      isMultiselect,
      rootElement,
      menuListbox,
      getGroupWrapperClasses,
      getMenuItemIndex,
      getMenuItemBindings,
      getMenuItemHandlers,
      getSlotBindings,
      isMenuGroupData
    };
  },
  // Public methods
  // These must be in the methods block, not in the setup function, otherwise their documentation
  // won't be picked up by vue-docgen
  methods: {
    /**
     * Returns whether the menu is expanded.
     *
     * @return {boolean}
     */
    // eslint-disable-next-line vue/no-unused-properties
    isExpanded() {
      return this.expanded;
    },
    /**
     * Get the root element of the menu. The normal `.$el` property doesn't work due to the use
     * of teleport; it returns a `<!-- teleport start -->` comment instead. This method returns
     * the real, teleported root element.
     *
     * @return {HTMLElement|undefined}
     */
    // eslint-disable-next-line vue/no-unused-properties
    getRootElement() {
      return this.rootElement;
    },
    /**
     * Get the highlighted menu item, if any.
     *
     * The parent component should set `aria-activedescendant` to the `.id` property of the
     * object returned by this method. If this method returns null, `aria-activedescendant`
     * should not be set.
     *
     * @public
     * @return {MenuItemDataWithId|null} The highlighted menu item,
     *   or null if no item is highlighted or if the menu is closed.
     */
    getHighlightedMenuItem() {
      return this.expanded ? this.highlightedMenuItem : null;
    },
    /**
     * Get whether the last highlighted item was highlighted via the keyboard.
     *
     * @public
     * @return {boolean} Whether the last highlighted menu item was highlighted via keyboard.
     */
    getHighlightedViaKeyboard() {
      return this.highlightedViaKeyboard;
    },
    /**
     * Get the computed menu items with IDs (without menu groups).
     *
     * @public
     * @return {MenuItemDataWithId[]} List of current menu items without menu groups.
     */
    getComputedMenuItems() {
      return this.computedMenuItems;
    },
    /**
     * Ensure no menu item is active. This unsets the active item if there is one.
     *
     * @public
     */
    clearActive() {
      this.handleMenuItemChange("active", null);
    },
    /**
     * Handles all necessary keyboard navigation.
     *
     * The parent component should listen for keydown events on its focusable element,
     * and pass those events to this method. Events for arrow keys, tab and enter are handled
     * by this method. If a different key was pressed, this method will return false to indicate
     * that it didn't handle the event.
     *
     * @public
     * @param event {KeyboardEvent} Keydown event object
     * @param options
     * @param options.prevent {boolean} If false, do not call e.preventDefault() or
     *   e.stopPropagation()
     * @param options.characterNavigation {boolean}
     * @return Whether the event was handled
     */
    delegateKeyNavigation(event, { prevent = true, characterNavigation = false } = {}) {
      return this.handleKeyNavigation(event, { prevent, characterNavigation });
    }
  }
});
const _hoisted_1$m = ["aria-live", "aria-relevant", "aria-multiselectable"];
const _hoisted_2$b = {
  key: 0,
  class: "cdx-menu__pending cdx-menu-item"
};
const _hoisted_3$8 = {
  key: 1,
  class: "cdx-menu__no-results cdx-menu-item",
  role: "option"
};
const _hoisted_4$6 = ["aria-labelledby", "aria-describedby"];
const _hoisted_5$6 = { class: "cdx-menu__group__meta" };
const _hoisted_6$5 = { class: "cdx-menu__group__meta__text" };
const _hoisted_7$2 = ["id"];
const _hoisted_8$2 = ["id"];
function _sfc_render$o(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_cdx_icon = resolveComponent("cdx-icon");
  const _component_cdx_menu_item = resolveComponent("cdx-menu-item");
  const _component_cdx_progress_bar = resolveComponent("cdx-progress-bar");
  return openBlock(), createBlock(Teleport, {
    to: _ctx.computedTarget,
    disabled: _ctx.teleportDisabled
  }, [
    withDirectives(createElementVNode(
      "div",
      {
        ref: "rootElement",
        class: normalizeClass(["cdx-menu", _ctx.rootClasses]),
        style: normalizeStyle(_ctx.rootStyle)
      },
      [
        createElementVNode("ul", mergeProps({
          ref: "menuListbox",
          class: "cdx-menu__listbox",
          role: "listbox",
          tabindex: "-1",
          style: _ctx.listBoxStyle,
          "aria-live": _ctx.showPending ? "polite" : void 0,
          "aria-relevant": _ctx.showPending ? _ctx.ariaRelevant : void 0,
          "aria-multiselectable": _ctx.isMultiselect ? true : void 0
        }, _ctx.otherAttrs, {
          onMousedown: _cache[0] || (_cache[0] = withModifiers(() => {
          }, ["prevent"]))
        }), [
          _ctx.showPending && _ctx.computedMenuItems.length === 0 && _ctx.$slots.pending ? (openBlock(), createElementBlock("li", _hoisted_2$b, [
            renderSlot(_ctx.$slots, "pending")
          ])) : createCommentVNode("v-if", true),
          _ctx.computedShowNoResultsSlot ? (openBlock(), createElementBlock("li", _hoisted_3$8, [
            renderSlot(_ctx.$slots, "no-results")
          ])) : createCommentVNode("v-if", true),
          (openBlock(true), createElementBlock(
            Fragment,
            null,
            renderList(_ctx.computedMenuEntries, (menuEntry, index) => {
              return openBlock(), createElementBlock(
                Fragment,
                { key: index },
                [
                  _ctx.isMenuGroupData(menuEntry) ? (openBlock(), createElementBlock(
                    "li",
                    {
                      key: 0,
                      class: normalizeClass(["cdx-menu__group-wrapper", _ctx.getGroupWrapperClasses(menuEntry)])
                    },
                    [
                      createElementVNode("ul", {
                        class: "cdx-menu__group",
                        role: "group",
                        "aria-labelledby": menuEntry.id + "-label",
                        "aria-describedby": menuEntry.id + "-description"
                      }, [
                        createElementVNode("span", _hoisted_5$6, [
                          menuEntry.icon ? (openBlock(), createBlock(_component_cdx_icon, {
                            key: 0,
                            class: "cdx-menu__group__icon",
                            icon: menuEntry.icon
                          }, null, 8, ["icon"])) : createCommentVNode("v-if", true),
                          createElementVNode("span", _hoisted_6$5, [
                            createElementVNode("span", {
                              id: menuEntry.id + "-label",
                              class: "cdx-menu__group__label"
                            }, toDisplayString(menuEntry.label), 9, _hoisted_7$2),
                            menuEntry.description ? (openBlock(), createElementBlock("span", {
                              key: 0,
                              id: menuEntry.id + "-description",
                              class: "cdx-menu__group__description"
                            }, toDisplayString(menuEntry.description), 9, _hoisted_8$2)) : createCommentVNode("v-if", true)
                          ])
                        ]),
                        (openBlock(true), createElementBlock(
                          Fragment,
                          null,
                          renderList(menuEntry.items, (menuItemInGroup) => {
                            return openBlock(), createBlock(
                              _component_cdx_menu_item,
                              mergeProps({
                                key: menuItemInGroup.value,
                                ref_for: true,
                                ref: (ref2) => _ctx.assignTemplateRef(ref2, _ctx.getMenuItemIndex(menuItemInGroup)),
                                class: "cdx-menu__group__item"
                              }, { ref_for: true }, _ctx.getMenuItemBindings(menuItemInGroup), toHandlers(_ctx.getMenuItemHandlers(menuItemInGroup))),
                              {
                                default: withCtx(() => [
                                  renderSlot(_ctx.$slots, "default", mergeProps({ ref_for: true }, _ctx.getSlotBindings(menuItemInGroup)))
                                ]),
                                _: 2
                                /* DYNAMIC */
                              },
                              1040
                              /* FULL_PROPS, DYNAMIC_SLOTS */
                            );
                          }),
                          128
                          /* KEYED_FRAGMENT */
                        ))
                      ], 8, _hoisted_4$6)
                    ],
                    2
                    /* CLASS */
                  )) : (openBlock(), createBlock(
                    _component_cdx_menu_item,
                    mergeProps({
                      key: 1,
                      ref_for: true,
                      ref: (ref2) => _ctx.assignTemplateRef(ref2, _ctx.getMenuItemIndex(menuEntry))
                    }, { ref_for: true }, _ctx.getMenuItemBindings(menuEntry), toHandlers(_ctx.getMenuItemHandlers(menuEntry))),
                    {
                      default: withCtx(() => [
                        renderSlot(_ctx.$slots, "default", mergeProps({ ref_for: true }, _ctx.getSlotBindings(menuEntry)))
                      ]),
                      _: 2
                      /* DYNAMIC */
                    },
                    1040
                    /* FULL_PROPS, DYNAMIC_SLOTS */
                  ))
                ],
                64
                /* STABLE_FRAGMENT */
              );
            }),
            128
            /* KEYED_FRAGMENT */
          )),
          _ctx.showPending ? (openBlock(), createBlock(_component_cdx_progress_bar, {
            key: 2,
            class: "cdx-menu__progress-bar",
            inline: true
          })) : createCommentVNode("v-if", true)
        ], 16, _hoisted_1$m)
      ],
      6
      /* CLASS, STYLE */
    ), [
      [vShow, _ctx.expanded]
    ])
  ], 8, ["to", "disabled"]);
}
const CdxMenu = /* @__PURE__ */ _export_sfc(_sfc_main$o, [["render", _sfc_render$o]]);
const textInputTypeValidator = makeStringTypeValidator(TextInputTypes);
const statusValidator$8 = makeStringTypeValidator(ValidationStatusTypes);
const _sfc_main$n = defineComponent({
  name: "CdxTextInput",
  components: { CdxIcon },
  /**
   * We want the input to inherit attributes, not the root element.
   */
  inheritAttrs: false,
  // expose is temporarily disabled to work around a Vue / vue-tsc bug, see
  // https://github.com/vuejs/language-tools/issues/5069
  /*
  expose: [
  	'focus',
  	'blur',
  	'checkValidity',
  	'reportValidity',
  	'setCustomValidity'
  ],
  */
  props: {
    /**
     * Current value of the input.
     *
     * Provided by `v-model` binding in the parent component.
     */
    modelValue: {
      type: [String, Number],
      default: ""
    },
    /**
     * `type` attribute of the input.
     *
     * @values 'text', 'search', 'number', 'email', 'password', 'tel', 'url',
     * 'week', 'month', 'date', 'datetime-local', 'time'
     */
    inputType: {
      type: String,
      default: "text",
      validator: textInputTypeValidator
    },
    /**
     * `status` attribute of the input.
     */
    status: {
      type: String,
      default: "default",
      validator: statusValidator$8
    },
    /**
     * Whether the input is disabled.
     */
    disabled: {
      type: Boolean,
      default: false
    },
    /**
     * An icon at the start of the input element. Similar to a `::before` pseudo-element.
     */
    startIcon: {
      type: [String, Object],
      default: void 0
    },
    /**
     * An icon at the end of the input element. Similar to an `::after` pseudo-element.
     */
    endIcon: {
      type: [String, Object],
      default: void 0
    },
    /**
     * Add a clear button at the end of the input element.
     *
     * When the clear button is pressed, the input's value is set to an empty string.
     * The clear button is displayed when input text is present.
     */
    clearable: {
      type: Boolean,
      default: false
    }
  },
  emits: [
    /**
     * When the input value changes
     *
     * @property {string | number} modelValue The new model value
     */
    "update:modelValue",
    /**
     * When the user presses a key.
     *
     * This event is not emitted when the user presses the Home or End key (T314728),
     * but is emitted for Ctrl/Cmd+Home and Ctrl/Cmd+End.
     *
     * @property {KeyboardEvent}
     */
    "keydown",
    /**
     * When the input value changes via direct use of the input
     *
     * @property {InputEvent} event
     */
    "input",
    /**
     * When an input value change is committed by the user (e.g. on blur)
     *
     * @property {Event} event
     */
    "change",
    /**
     * When the input comes into focus
     *
     * @property {FocusEvent} event
     */
    "focus",
    /**
     * When the input loses focus
     *
     * @property {FocusEvent} event
     */
    "blur",
    /**
     * When the input value is cleared through the use of the clear button
     *
     * @property {MouseEvent} event
     */
    "clear",
    /**
     * When the input value is invalid according to the input's constraint
     * attributes (e.g. min, max, pattern). See:
     * https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement/invalid_event
     *
     * @property {Event} event
     */
    "invalid"
  ],
  setup(props, { emit, attrs }) {
    const idAttribute = attrs.id;
    const {
      computedDisabled,
      computedStatus,
      computedInputId
    } = useFieldData(
      toRef(props, "disabled"),
      toRef(props, "status"),
      idAttribute
    );
    const descriptionId = inject(FieldDescriptionIdKey, void 0);
    const wrappedModel = useModelWrapper(toRef(props, "modelValue"), emit);
    const isClearable = computed(
      () => props.clearable && !!wrappedModel.value && !computedDisabled.value
    );
    const internalClasses = computed(() => ({
      "cdx-text-input--has-start-icon": !!props.startIcon,
      "cdx-text-input--has-end-icon": !!props.endIcon,
      "cdx-text-input--clearable": isClearable.value,
      ["cdx-text-input--status-".concat(computedStatus.value)]: true
    }));
    const {
      rootClasses,
      rootStyle,
      otherAttrs
    } = useSplitAttributes(attrs, internalClasses);
    const otherAttrsMinusId = computed(() => {
      const _a = otherAttrs.value, { id } = _a, everythingElse = __objRest(_a, ["id"]);
      return everythingElse;
    });
    const inputClasses = computed(() => ({
      "cdx-text-input__input--has-value": !!wrappedModel.value
    }));
    const onClear = (event) => {
      wrappedModel.value = "";
      emit("clear", event);
    };
    const onKeydown = (event) => {
      if ((event.key === "Home" || event.key === "End") && !event.ctrlKey && !event.metaKey) {
        return;
      }
      emit("keydown", event);
    };
    const onInput = (event) => {
      emit("input", event);
    };
    const onChange = (event) => {
      emit("change", event);
    };
    const onFocus = (event) => {
      emit("focus", event);
    };
    const onBlur = (event) => {
      emit("blur", event);
    };
    const shouldPreventDefault = ref(true);
    const onInvalid = (event, doPreventDefault) => {
      if (doPreventDefault) {
        event.preventDefault();
      }
      emit("invalid", event);
      shouldPreventDefault.value = true;
    };
    return {
      computedInputId,
      descriptionId,
      wrappedModel,
      isClearable,
      rootClasses,
      rootStyle,
      otherAttrsMinusId,
      inputClasses,
      computedDisabled,
      onClear,
      onInput,
      onChange,
      onKeydown,
      onFocus,
      onBlur,
      onInvalid,
      shouldPreventDefault,
      cdxIconClear: l4
    };
  },
  // Public methods
  // These must be in the methods block, not in the setup function, otherwise their documentation
  // won't be picked up by vue-docgen
  methods: {
    /**
     * Focus the component's input element.
     *
     * @public
     */
    focus() {
      const input = this.$refs.input;
      input.focus();
    },
    /**
     * Blur the component's input element.
     *
     * @public
     */
    blur() {
      const input = this.$refs.input;
      input.blur();
    },
    /**
     * Check the validity of the input element according to its constraint attributes. Emits an
     * 'invalid' event if the input is invalid. See:
     * https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement/checkValidity
     *
     * @public
     * @return {boolean} Whether the input is valid
     */
    checkValidity() {
      const input = this.$refs.input;
      return input.checkValidity();
    },
    /**
     * Check the validity of the input element and report it as a pop up on the UI. See:
     * https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement/reportValidity
     *
     * @public
     * @return {boolean} Whether the input is valid
     */
    reportValidity() {
      this.shouldPreventDefault = false;
      const input = this.$refs.input;
      return input.reportValidity();
    },
    /**
     * Set custom validity and message for the input element. See:
     * https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement/setCustomValidity
     *
     * @public
     * @param {string} message The custom validation message to set
     */
    setCustomValidity(message) {
      const input = this.$refs.input;
      input.setCustomValidity(message);
    }
  }
});
const _hoisted_1$l = ["id", "type", "aria-describedby", "disabled"];
function _sfc_render$n(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_cdx_icon = resolveComponent("cdx-icon");
  return openBlock(), createElementBlock(
    "div",
    {
      class: normalizeClass(["cdx-text-input", _ctx.rootClasses]),
      style: normalizeStyle(_ctx.rootStyle)
    },
    [
      withDirectives(createElementVNode("input", mergeProps({
        id: _ctx.computedInputId,
        ref: "input",
        "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => _ctx.wrappedModel = $event),
        class: ["cdx-text-input__input", _ctx.inputClasses]
      }, _ctx.otherAttrsMinusId, {
        type: _ctx.inputType,
        "aria-describedby": _ctx.descriptionId,
        disabled: _ctx.computedDisabled,
        size: "1",
        onInput: _cache[1] || (_cache[1] = (...args) => _ctx.onInput && _ctx.onInput(...args)),
        onChange: _cache[2] || (_cache[2] = (...args) => _ctx.onChange && _ctx.onChange(...args)),
        onFocus: _cache[3] || (_cache[3] = (...args) => _ctx.onFocus && _ctx.onFocus(...args)),
        onBlur: _cache[4] || (_cache[4] = (...args) => _ctx.onBlur && _ctx.onBlur(...args)),
        onKeydown: _cache[5] || (_cache[5] = (...args) => _ctx.onKeydown && _ctx.onKeydown(...args)),
        onInvalid: _cache[6] || (_cache[6] = (e) => _ctx.onInvalid(e, _ctx.shouldPreventDefault))
      }), null, 16, _hoisted_1$l), [
        [vModelDynamic, _ctx.wrappedModel]
      ]),
      _ctx.startIcon ? (openBlock(), createBlock(_component_cdx_icon, {
        key: 0,
        icon: _ctx.startIcon,
        class: "cdx-text-input__icon-vue cdx-text-input__start-icon"
      }, null, 8, ["icon"])) : createCommentVNode("v-if", true),
      _ctx.endIcon ? (openBlock(), createBlock(_component_cdx_icon, {
        key: 1,
        icon: _ctx.endIcon,
        class: "cdx-text-input__icon-vue cdx-text-input__end-icon"
      }, null, 8, ["icon"])) : createCommentVNode("v-if", true),
      _ctx.isClearable ? (openBlock(), createBlock(_component_cdx_icon, {
        key: 2,
        icon: _ctx.cdxIconClear,
        class: "cdx-text-input__icon-vue cdx-text-input__clear-icon",
        onMousedown: _cache[7] || (_cache[7] = withModifiers(() => {
        }, ["prevent"])),
        onClick: _ctx.onClear
      }, null, 8, ["icon", "onClick"])) : createCommentVNode("v-if", true)
    ],
    6
    /* CLASS, STYLE */
  );
}
const CdxTextInput = /* @__PURE__ */ _export_sfc(_sfc_main$n, [["render", _sfc_render$n]]);
function unwrapElement(element) {
  return element && "$el" in element ? element.$el : element;
}
const clipPadding = 16;
const minClipHeight = 128;
function useFloatingMenu(referenceElement, menu, opt) {
  var _a;
  const menuIsExpanded = () => {
    var _a2;
    return (_a2 = menu.value) == null ? void 0 : _a2.isExpanded();
  };
  const menuRootElement = computed(() => {
    var _a2;
    return (_a2 = menu.value) == null ? void 0 : _a2.getRootElement();
  });
  const middleware = [
    offset(opt == null ? void 0 : opt.offset),
    size({
      // Don't size the menu to take up exactly all of the available height, because that
      // makes it look like it's cut off. Instead, leave 16px of free space between the bottom
      // of the menu and the bottom edge of the viewport / scrollable container.
      padding: clipPadding,
      apply({ rects, elements, availableHeight, availableWidth }) {
        Object.assign(elements.floating.style, {
          // Optionally use all available width
          // Else, set the width of the menu to match the width of the triggering element.
          // This is needed in Dialogs, when the menu's position is set relative to
          // the dialog, not the triggering element.
          width: "".concat((opt == null ? void 0 : opt.useAvailableWidth) ? availableWidth : rects.reference.width, "px"),
          // Set the max-height to the available height, to prevent the menu from
          // extending past the edge of the viewport or scrollable container. But don't
          // allow the menu to be shrunk to less than 128px; this is necessary to make
          // the flip() call below work.
          maxHeight: "".concat(Math.max(minClipHeight, availableHeight), "px")
        });
      }
    }),
    // If there is not enough space to put the menu below the triggering element, put it above
    // it instead. Because of the maxHeight logic above, this happens when there is less than
    // 128px available below the triggering element.
    flip({
      // Set padding in flip middleware options as well, in order to flip before it collides
      // with the edge of the viewport. Ideally this would be the same as the value we use
      // above for size, but we need it to be 1px smaller so that there's not a flickering
      // effect as FloatingUI tries to decide whether to flip or resize. Setting the value
      // here slightly smaller ensures that there is no ambiguity about which middleware
      // behavior to apply in a given scenario.
      padding: clipPadding - 1
    }),
    // Hide the menu when it has escaped the reference element's clipping context (e.g. the menu
    // is opened down and you scroll up until the reference element just starts to leave the
    // container).
    hide({
      strategy: "escaped"
    }),
    // Hide the menu when the reference element is fully hidden (e.g. the menu is opened down
    // and you scroll down until the whole reference element is gone).
    hide()
  ];
  const { floatingStyles, placement, middlewareData, update } = useFloating(
    referenceElement,
    menuRootElement,
    {
      middleware,
      placement: (_a = opt == null ? void 0 : opt.placement) != null ? _a : "bottom"
    }
  );
  const menuVisibility = computed(() => {
    var _a2, _b;
    const isHidden = !menuIsExpanded() || !!((_a2 = middlewareData.value.hide) == null ? void 0 : _a2.escaped) || ((_b = middlewareData.value.hide) == null ? void 0 : _b.referenceHidden);
    return isHidden ? "hidden" : "visible";
  });
  watch(
    [floatingStyles, menuVisibility, placement],
    ([newStyles, newVisibility, newPlacement]) => {
      var _a2, _b, _c, _d, _e;
      Object.assign((_b = (_a2 = menuRootElement.value) == null ? void 0 : _a2.style) != null ? _b : {}, {
        visibility: newVisibility,
        position: newStyles.position,
        top: "".concat(newStyles.top, "px"),
        // `left: 0` is set in the Menu component, which gets transformed to `right: 0` for
        // RTL. For this component, we must unset `right: 0`, because the transform value
        // is relative to the left side of the screen regardless of reading direction.
        right: "unset",
        // Set `left` value to ensure the menu is translated relative to the left side of
        // the screen, which is what FloatingUI expects when it calculates the translate-x
        // value for both LTR and RTL.
        left: "".concat(newStyles.left, "px"),
        // If menuWidth is specified, transform shifts negative, for now ignore that
        transform: (_c = newStyles.transform) != null ? _c : "none",
        // Zero out border-radius on the corners of the menu where it touches the reference
        // element. Which corners these are depends on whether the menu is flipped
        borderTopLeftRadius: newPlacement === "bottom" && newVisibility === "visible" ? "0" : "",
        borderTopRightRadius: newPlacement === "bottom" && newVisibility === "visible" ? "0" : "",
        borderBottomLeftRadius: newPlacement === "top" && newVisibility === "visible" ? "0" : "",
        borderBottomRightRadius: newPlacement === "top" && newVisibility === "visible" ? "0" : ""
      });
      Object.assign((_e = (_d = unwrapElement(referenceElement.value)) == null ? void 0 : _d.style) != null ? _e : {}, {
        // Zero out border-radius on the corners of the reference element where it touches
        // the menu. Which corners these are depends on whether the menu is flipped
        borderTopLeftRadius: newPlacement === "top" && newVisibility === "visible" ? "0" : "",
        borderTopRightRadius: newPlacement === "top" && newVisibility === "visible" ? "0" : "",
        borderBottomLeftRadius: newPlacement === "bottom" && newVisibility === "visible" ? "0" : "",
        borderBottomRightRadius: newPlacement === "bottom" && newVisibility === "visible" ? "0" : ""
      });
    }
  );
  let cleanupAutoUpdate = null;
  watch(menuIsExpanded, (newExpanded) => {
    if (newExpanded) {
      if (!referenceElement.value || !menuRootElement.value) {
        return;
      }
      cleanupAutoUpdate = autoUpdate(
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        "$el" in referenceElement.value ? referenceElement.value.$el : referenceElement.value,
        menuRootElement.value,
        update
      );
    } else {
      if (cleanupAutoUpdate) {
        cleanupAutoUpdate();
        cleanupAutoUpdate = null;
      }
    }
  });
}
const statusValidator$7 = makeStringTypeValidator(ValidationStatusTypes);
const _sfc_main$m = defineComponent({
  name: "CdxCombobox",
  components: {
    CdxButton,
    CdxIcon,
    CdxMenu,
    CdxTextInput
  },
  /**
   * Attributes applied to this component by a parent will be applied
   * to the TextInput child component rather than the root element.
   */
  inheritAttrs: false,
  props: {
    /**
     * Menu items and/or menu group definitions.
     *
     * Menu groups and individual menu items will be output in the order they appear here.
     */
    menuItems: {
      type: Array,
      required: true
    },
    /**
     * Value of the current selection.
     *
     * Must be bound with `v-model:selected`.
     */
    selected: {
      type: [String, Number],
      required: true
    },
    /**
     * Whether the dropdown is disabled.
     */
    disabled: {
      type: Boolean,
      default: false
    },
    /**
     * Configuration for various menu features. All properties default to false.
     *
     * See the MenuConfig type.
     *
     * @default {}
     */
    menuConfig: {
      type: Object,
      default: () => ({})
    },
    /**
     * `status` property of the TextInput component
     */
    status: {
      type: String,
      default: "default",
      validator: statusValidator$7
    }
  },
  emits: [
    /**
     * When the selected value changes.
     *
     * @property {string | number} selected The new selected value
     */
    "update:selected",
    /**
     * When the user scrolls towards the bottom of the menu.
     *
     * If it is possible to add or load more menu items, then now would be a good moment
     * so that the user can experience infinite scrolling.
     */
    "load-more",
    /**
     * When the input value changes via direct use of the input
     *
     * @property {InputEvent} event
     */
    "input",
    /**
     * When an input value change is committed by the user (e.g. on blur)
     *
     * @property {Event} event
     */
    "change",
    /**
     * When the input comes into focus
     *
     * @property {FocusEvent} event
     */
    "focus",
    /**
     * When the input loses focus
     *
     * @property {FocusEvent} event
     */
    "blur"
  ],
  setup(props, { emit, attrs, slots }) {
    const input = ref();
    const inputWrapper = ref();
    const menu = ref();
    const menuId = useId();
    const selectedProp = toRef(props, "selected");
    const modelWrapper = useModelWrapper(selectedProp, emit, "update:selected");
    const expanded = ref(false);
    const expanderClicked = ref(false);
    const highlightedId = computed(() => {
      var _a, _b;
      return (_b = (_a = menu.value) == null ? void 0 : _a.getHighlightedMenuItem()) == null ? void 0 : _b.id;
    });
    const {
      computedDisabled,
      computedStatus
    } = useFieldData(
      toRef(props, "disabled"),
      toRef(props, "status")
    );
    const internalClasses = computed(() => ({
      "cdx-combobox--expanded": expanded.value,
      "cdx-combobox--disabled": computedDisabled.value
    }));
    const {
      rootClasses,
      rootStyle,
      otherAttrs
    } = useSplitAttributes(attrs, internalClasses);
    function onInputFocus(event) {
      if (expanderClicked.value && expanded.value) {
        expanded.value = false;
      } else if (props.menuItems.length > 0 || slots["no-results"]) {
        expanded.value = true;
      }
      emit("focus", event);
    }
    function onInputBlur(event) {
      expanded.value = expanderClicked.value && expanded.value;
      emit("blur", event);
    }
    function onButtonMousedown() {
      if (computedDisabled.value) {
        return;
      }
      expanderClicked.value = true;
    }
    function onButtonClick() {
      var _a;
      if (computedDisabled.value) {
        return;
      }
      (_a = input.value) == null ? void 0 : _a.focus();
    }
    function onKeydown(e) {
      if (!menu.value || computedDisabled.value || props.menuItems.length === 0 || e.key === " ") {
        return;
      }
      menu.value.delegateKeyNavigation(e);
    }
    useFloatingMenu(input, menu);
    watch(expanded, () => {
      expanderClicked.value = false;
    });
    return {
      input,
      inputWrapper,
      menu,
      menuId,
      modelWrapper,
      expanded,
      highlightedId,
      computedDisabled,
      computedStatus,
      onInputFocus,
      onInputBlur,
      onKeydown,
      onButtonClick,
      onButtonMousedown,
      cdxIconExpand: y4,
      rootClasses,
      rootStyle,
      otherAttrs
    };
  }
});
const _hoisted_1$k = {
  ref: "inputWrapper",
  class: "cdx-combobox__input-wrapper"
};
function _sfc_render$m(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_cdx_text_input = resolveComponent("cdx-text-input");
  const _component_cdx_icon = resolveComponent("cdx-icon");
  const _component_cdx_button = resolveComponent("cdx-button");
  const _component_cdx_menu = resolveComponent("cdx-menu");
  return openBlock(), createElementBlock(
    "div",
    {
      class: normalizeClass(["cdx-combobox", _ctx.rootClasses]),
      style: normalizeStyle(_ctx.rootStyle)
    },
    [
      createElementVNode(
        "div",
        _hoisted_1$k,
        [
          createVNode(_component_cdx_text_input, mergeProps({
            ref: "input",
            modelValue: _ctx.modelWrapper,
            "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => _ctx.modelWrapper = $event)
          }, _ctx.otherAttrs, {
            class: "cdx-combobox__input",
            "aria-activedescendant": _ctx.highlightedId,
            "aria-expanded": _ctx.expanded,
            "aria-controls": _ctx.menuId,
            disabled: _ctx.computedDisabled,
            status: _ctx.computedStatus,
            autocomplete: "off",
            role: "combobox",
            onKeydown: _ctx.onKeydown,
            onInput: _cache[1] || (_cache[1] = ($event) => _ctx.$emit("input", $event)),
            onChange: _cache[2] || (_cache[2] = ($event) => _ctx.$emit("change", $event)),
            onFocus: _ctx.onInputFocus,
            onBlur: _ctx.onInputBlur
          }), null, 16, ["modelValue", "aria-activedescendant", "aria-expanded", "aria-controls", "disabled", "status", "onKeydown", "onFocus", "onBlur"]),
          createVNode(_component_cdx_button, {
            class: "cdx-combobox__expand-button",
            "aria-hidden": "true",
            disabled: _ctx.computedDisabled,
            tabindex: "-1",
            type: "button",
            onMousedown: _ctx.onButtonMousedown,
            onClick: _ctx.onButtonClick
          }, {
            default: withCtx(() => [
              createVNode(_component_cdx_icon, {
                class: "cdx-combobox__expand-icon",
                icon: _ctx.cdxIconExpand
              }, null, 8, ["icon"])
            ]),
            _: 1
            /* STABLE */
          }, 8, ["disabled", "onMousedown", "onClick"])
        ],
        512
        /* NEED_PATCH */
      ),
      createVNode(_component_cdx_menu, mergeProps({
        id: _ctx.menuId,
        ref: "menu",
        selected: _ctx.modelWrapper,
        "onUpdate:selected": _cache[3] || (_cache[3] = ($event) => _ctx.modelWrapper = $event),
        expanded: _ctx.expanded,
        "onUpdate:expanded": _cache[4] || (_cache[4] = ($event) => _ctx.expanded = $event),
        "menu-items": _ctx.menuItems
      }, _ctx.menuConfig, {
        onLoadMore: _cache[5] || (_cache[5] = ($event) => _ctx.$emit("load-more"))
      }), {
        default: withCtx(({ menuItem }) => [
          renderSlot(_ctx.$slots, "menu-item", { menuItem })
        ]),
        "no-results": withCtx(() => [
          renderSlot(_ctx.$slots, "no-results")
        ]),
        _: 3
        /* FORWARDED */
      }, 16, ["id", "selected", "expanded", "menu-items"])
    ],
    6
    /* CLASS, STYLE */
  );
}
const Combobox = /* @__PURE__ */ _export_sfc(_sfc_main$m, [["render", _sfc_render$m]]);
function useResizeObserver(templateRef) {
  const currentDimensions = ref(
    { width: void 0, height: void 0 }
  );
  if (typeof window !== "object" || !("ResizeObserver" in window) || !("ResizeObserverEntry" in window)) {
    return currentDimensions;
  }
  const observer = new window.ResizeObserver(
    (entries) => {
      var _a, _b;
      const entry = entries == null ? void 0 : entries[0];
      if (entry) {
        currentDimensions.value = {
          width: (_a = entry.borderBoxSize) == null ? void 0 : _a[0].inlineSize,
          height: (_b = entry.borderBoxSize) == null ? void 0 : _b[0].blockSize
        };
      }
    }
  );
  let mounted = false;
  onMounted(() => {
    mounted = true;
    if (templateRef.value) {
      observer.observe(templateRef.value);
    }
  });
  onUnmounted(() => {
    mounted = false;
    observer.disconnect();
  });
  watch(templateRef, (newElement) => {
    if (!mounted) {
      return;
    }
    observer.disconnect();
    currentDimensions.value = {
      width: void 0,
      height: void 0
    };
    if (newElement) {
      observer.observe(newElement);
    }
  });
  return currentDimensions;
}
const _sfc_main$l = defineComponent({
  name: "CdxDialog",
  components: {
    CdxButton,
    CdxIcon
  },
  inheritAttrs: false,
  props: {
    /**
     * Whether the dialog is visible. Should be provided via a v-model:open
     * binding in the parent scope.
     */
    open: {
      type: Boolean,
      default: false
    },
    /**
     * Title for the dialog header. Used for ARIA purposes even if no
     * visible header element is displayed.
     */
    title: {
      type: String,
      required: true
    },
    /**
     * Optional subtitle for the dialog.
     */
    subtitle: {
      type: String,
      required: false,
      default: null
    },
    /**
     * Whether the dialog header should hide the title & subtitle
     */
    hideTitle: {
      type: Boolean,
      default: false
    },
    /**
     * Add an icon-only close button to the dialog header.
     */
    useCloseButton: {
      type: Boolean,
      default: false
    },
    // DEPRECATED: Set default to 'Close' and remove validator (T368444).
    /**
     * Visually-hidden label text for the icon-only close button in the header.
     *
     * Omit this prop to use the default value, "Close".
     */
    closeButtonLabel: {
      type: String,
      default: "",
      validator: (value, props) => {
        if (value.length > 0 && !props.useCloseButton) {
          console.warn(
            "[CdxDialog]: The boolean `useCloseButton` prop is required to show the close button.\n\nRefer to https://doc.wikimedia.org/codex/latest/components/demos/dialog.html#props."
          );
          return false;
        }
        return true;
      }
    },
    /**
     * Primary user action. This will display a primary button with the specified action
     * (progressive or destructive).
     */
    primaryAction: {
      type: Object,
      default: null
    },
    /**
     * Default user action. This will display a normal button.
     */
    defaultAction: {
      type: Object,
      default: null
    },
    /**
     * Whether action buttons should be vertically stacked and 100% width.
     */
    stackedActions: {
      type: Boolean,
      default: false
    },
    /**
     * Selector or DOM element identifying the container the dialog should
     * be rendered in. The dialog will be `<teleport>`ed to this element.
     * An ID selector is recommended, e.g. `#foo-bar`, but providing an
     * actual element is also supported.
     *
     * If this prop is not set, and the parent or one of its ancestors
     * provides a teleport target using `provide( 'CdxTeleportTarget',
     * '#foo-bar' )`, the provided target will be used. If there is no
     * provided target, the dialog will be teleported to the end of the
     * `<body>` element.
     */
    target: {
      type: String,
      default: null
    },
    /**
     * Whether to disable the use of teleport and render the Dialog in its
     * original location in the document. If this is true, the `target` prop
     * is ignored.
     */
    renderInPlace: {
      type: Boolean,
      default: false
    }
  },
  emits: [
    /**
     * When the open/close state changes, e.g. when the close button is clicked.
     *
     * @property {boolean} newValue The new open/close state (true for open, false for closed)
     */
    "update:open",
    /**
     * When the primary action button is clicked.
     */
    "primary",
    /**
     * When the default action button is clicked.
     */
    "default"
  ],
  setup(props, { emit }) {
    const labelId = useId();
    const backdrop = ref();
    const dialogElement = ref();
    const dialogBody = ref();
    const focusHolder = ref();
    const focusTrapStart = ref();
    const focusTrapEnd = ref();
    const innerTeleportTarget = ref();
    let previouslyFocused = null;
    const useCloseButtonOrLabel = computed(
      () => props.useCloseButton || props.closeButtonLabel.length > 0
    );
    const translatedCloseButtonLabel = useI18nWithOverride(
      toRef(props, "closeButtonLabel"),
      "cdx-dialog-close-button-label",
      "Close"
    );
    const showHeader = computed(() => !props.hideTitle || useCloseButtonOrLabel.value);
    const showFooterActions = computed(() => !!props.primaryAction || !!props.defaultAction);
    const bodyDimensions = useResizeObserver(dialogBody);
    const currentBodyHeight = computed(() => {
      var _a;
      return (_a = bodyDimensions.value.height) != null ? _a : 0;
    });
    const showDividers = ref(false);
    const rootClasses = computed(() => ({
      "cdx-dialog--vertical-actions": props.stackedActions,
      "cdx-dialog--horizontal-actions": !props.stackedActions,
      "cdx-dialog--dividers": showDividers.value
    }));
    const providedTarget = inject("CdxTeleportTarget", void 0);
    const computedTarget = computed(() => {
      var _a, _b;
      return (_b = (_a = props.target) != null ? _a : unref(providedTarget)) != null ? _b : "body";
    });
    provide("CdxTeleportTarget", innerTeleportTarget);
    const scrollWidth = ref(0);
    function close() {
      emit("update:open", false);
    }
    let mousedownOnBackdrop = false;
    function onBackdropMouseDown(e) {
      mousedownOnBackdrop = e.target === backdrop.value;
    }
    function onBackdropClick() {
      if (mousedownOnBackdrop) {
        close();
      }
    }
    function focusFirst() {
      focusFirstFocusableElement(dialogElement.value);
    }
    function focusLast() {
      focusFirstFocusableElement(dialogElement.value, true);
    }
    function focusFirstFocusableElement(container, backwards = false) {
      let candidates = Array.from(
        container.querySelectorAll('\n					input, select, textarea, button, object, a, area,\n					[contenteditable], [tabindex]:not([tabindex^="-"])\n				')
      );
      if (backwards) {
        candidates = candidates.reverse();
      }
      for (const candidate of candidates) {
        candidate.focus();
        if (document.activeElement === candidate) {
          return true;
        }
      }
      return false;
    }
    let ariaHiddenElements = [];
    let inertElements = [];
    function setAriaHiddenAndInert() {
      let element = backdrop.value;
      while (element.parentElement && element.nodeName !== "BODY") {
        for (const sibling of Array.from(element.parentElement.children)) {
          if (sibling === element || sibling.nodeName === "SCRIPT") {
            continue;
          }
          if (!sibling.hasAttribute("aria-hidden")) {
            sibling.setAttribute("aria-hidden", "true");
            ariaHiddenElements.push(sibling);
          }
          if (!sibling.hasAttribute("inert")) {
            sibling.setAttribute("inert", "");
            inertElements.push(sibling);
          }
        }
        element = element.parentElement;
      }
    }
    function unsetAriaHiddenAndInert() {
      for (const element of ariaHiddenElements) {
        element.removeAttribute("aria-hidden");
      }
      for (const element of inertElements) {
        element.removeAttribute("inert");
      }
      ariaHiddenElements = [];
      inertElements = [];
    }
    function onDialogOpen() {
      return __async(this, null, function* () {
        var _a;
        yield nextTick();
        scrollWidth.value = window.innerWidth - document.documentElement.clientWidth;
        document.documentElement.style.setProperty("margin-right", "".concat(scrollWidth.value, "px"));
        document.body.classList.add("cdx-dialog-open");
        setAriaHiddenAndInert();
        previouslyFocused = document.activeElement;
        if (!focusFirstFocusableElement(dialogBody.value)) {
          (_a = focusHolder.value) == null ? void 0 : _a.focus();
        }
      });
    }
    function onDialogClose() {
      document.body.classList.remove("cdx-dialog-open");
      document.documentElement.style.removeProperty("margin-right");
      unsetAriaHiddenAndInert();
      if (previouslyFocused instanceof HTMLElement && document.contains(previouslyFocused)) {
        previouslyFocused.focus();
        previouslyFocused = null;
      }
    }
    onMounted(() => __async(null, null, function* () {
      if (props.open) {
        yield onDialogOpen();
      }
    }));
    onUnmounted(() => {
      if (props.open) {
        onDialogClose();
      }
    });
    watch(toRef(props, "open"), (opened) => __async(null, null, function* () {
      if (opened) {
        yield onDialogOpen();
      } else {
        onDialogClose();
      }
    }));
    watch(currentBodyHeight, () => {
      if (dialogBody.value) {
        showDividers.value = dialogBody.value.clientHeight < dialogBody.value.scrollHeight;
      }
    });
    return {
      close,
      onBackdropClick,
      onBackdropMouseDown,
      cdxIconClose: v4,
      labelId,
      rootClasses,
      backdrop,
      dialogElement,
      focusTrapStart,
      focusTrapEnd,
      innerTeleportTarget,
      focusFirst,
      focusLast,
      dialogBody,
      focusHolder,
      showHeader,
      showFooterActions,
      useCloseButtonOrLabel,
      translatedCloseButtonLabel,
      computedTarget
    };
  }
});
const _hoisted_1$j = ["aria-label", "aria-labelledby"];
const _hoisted_2$a = {
  key: 0,
  class: "cdx-dialog__header__title-group"
};
const _hoisted_3$7 = ["id"];
const _hoisted_4$5 = {
  key: 0,
  class: "cdx-dialog__header__subtitle"
};
const _hoisted_5$5 = {
  ref: "focusHolder",
  class: "cdx-dialog-focus-trap",
  tabindex: "-1"
};
const _hoisted_6$4 = {
  key: 0,
  class: "cdx-dialog__footer__text"
};
const _hoisted_7$1 = {
  key: 1,
  class: "cdx-dialog__footer__actions"
};
const _hoisted_8$1 = { ref: "innerTeleportTarget" };
function _sfc_render$l(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_cdx_icon = resolveComponent("cdx-icon");
  const _component_cdx_button = resolveComponent("cdx-button");
  return openBlock(), createBlock(Teleport, {
    to: _ctx.computedTarget,
    disabled: _ctx.renderInPlace
  }, [
    createVNode(Transition, {
      name: "cdx-dialog-fade",
      appear: ""
    }, {
      default: withCtx(() => [
        _ctx.open ? (openBlock(), createElementBlock(
          "div",
          {
            key: 0,
            ref: "backdrop",
            class: "cdx-dialog-backdrop",
            onMousedown: _cache[5] || (_cache[5] = (...args) => _ctx.onBackdropMouseDown && _ctx.onBackdropMouseDown(...args)),
            onClick: _cache[6] || (_cache[6] = (...args) => _ctx.onBackdropClick && _ctx.onBackdropClick(...args)),
            onKeyup: _cache[7] || (_cache[7] = withKeys((...args) => _ctx.close && _ctx.close(...args), ["escape"]))
          },
          [
            createElementVNode(
              "div",
              {
                ref: "focusTrapStart",
                tabindex: "0",
                onFocus: _cache[0] || (_cache[0] = (...args) => _ctx.focusLast && _ctx.focusLast(...args))
              },
              null,
              544
              /* NEED_HYDRATION, NEED_PATCH */
            ),
            createElementVNode("div", mergeProps({
              ref: "dialogElement",
              class: ["cdx-dialog", _ctx.rootClasses],
              role: "dialog"
            }, _ctx.$attrs, {
              "aria-label": _ctx.$slots.header || _ctx.hideTitle ? _ctx.title : void 0,
              "aria-labelledby": !_ctx.$slots.header && !_ctx.hideTitle ? _ctx.labelId : void 0,
              "aria-modal": "true",
              onClick: _cache[3] || (_cache[3] = withModifiers(() => {
              }, ["stop"]))
            }), [
              _ctx.showHeader || _ctx.$slots.header ? (openBlock(), createElementBlock(
                "header",
                {
                  key: 0,
                  class: normalizeClass(["cdx-dialog__header", { "cdx-dialog__header--default": !_ctx.$slots.header }])
                },
                [
                  renderSlot(_ctx.$slots, "header", {}, () => [
                    !_ctx.hideTitle ? (openBlock(), createElementBlock("div", _hoisted_2$a, [
                      createElementVNode("h2", {
                        id: _ctx.labelId,
                        class: "cdx-dialog__header__title"
                      }, toDisplayString(_ctx.title), 9, _hoisted_3$7),
                      _ctx.subtitle ? (openBlock(), createElementBlock(
                        "p",
                        _hoisted_4$5,
                        toDisplayString(_ctx.subtitle),
                        1
                        /* TEXT */
                      )) : createCommentVNode("v-if", true)
                    ])) : createCommentVNode("v-if", true),
                    _ctx.useCloseButtonOrLabel ? (openBlock(), createBlock(_component_cdx_button, {
                      key: 1,
                      class: "cdx-dialog__header__close-button",
                      weight: "quiet",
                      type: "button",
                      "aria-label": _ctx.translatedCloseButtonLabel,
                      onClick: _ctx.close
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_cdx_icon, { icon: _ctx.cdxIconClose }, null, 8, ["icon"])
                      ]),
                      _: 1
                      /* STABLE */
                    }, 8, ["aria-label", "onClick"])) : createCommentVNode("v-if", true)
                  ])
                ],
                2
                /* CLASS */
              )) : createCommentVNode("v-if", true),
              createElementVNode(
                "div",
                _hoisted_5$5,
                null,
                512
                /* NEED_PATCH */
              ),
              createElementVNode(
                "div",
                {
                  ref: "dialogBody",
                  class: normalizeClass(["cdx-dialog__body cdx-scrollable-container", {
                    "cdx-dialog__body--no-header": !(_ctx.showHeader || _ctx.$slots.header),
                    "cdx-dialog__body--no-footer": !(_ctx.showFooterActions || _ctx.$slots.footer || _ctx.$slots["footer-text"])
                  }])
                },
                [
                  renderSlot(_ctx.$slots, "default")
                ],
                2
                /* CLASS */
              ),
              _ctx.showFooterActions || _ctx.$slots.footer || _ctx.$slots["footer-text"] ? (openBlock(), createElementBlock(
                "footer",
                {
                  key: 1,
                  class: normalizeClass(["cdx-dialog__footer", { "cdx-dialog__footer--default": !_ctx.$slots.footer }])
                },
                [
                  renderSlot(_ctx.$slots, "footer", {}, () => [
                    _ctx.$slots["footer-text"] ? (openBlock(), createElementBlock("p", _hoisted_6$4, [
                      renderSlot(_ctx.$slots, "footer-text")
                    ])) : createCommentVNode("v-if", true),
                    _ctx.showFooterActions ? (openBlock(), createElementBlock("div", _hoisted_7$1, [
                      _ctx.primaryAction ? (openBlock(), createBlock(_component_cdx_button, {
                        key: 0,
                        class: "cdx-dialog__footer__primary-action",
                        weight: "primary",
                        action: _ctx.primaryAction.actionType,
                        disabled: _ctx.primaryAction.disabled,
                        onClick: _cache[1] || (_cache[1] = ($event) => _ctx.$emit("primary"))
                      }, {
                        default: withCtx(() => [
                          createTextVNode(
                            toDisplayString(_ctx.primaryAction.label),
                            1
                            /* TEXT */
                          )
                        ]),
                        _: 1
                        /* STABLE */
                      }, 8, ["action", "disabled"])) : createCommentVNode("v-if", true),
                      _ctx.defaultAction ? (openBlock(), createBlock(_component_cdx_button, {
                        key: 1,
                        class: "cdx-dialog__footer__default-action",
                        disabled: _ctx.defaultAction.disabled,
                        onClick: _cache[2] || (_cache[2] = ($event) => _ctx.$emit("default"))
                      }, {
                        default: withCtx(() => [
                          createTextVNode(
                            toDisplayString(_ctx.defaultAction.label),
                            1
                            /* TEXT */
                          )
                        ]),
                        _: 1
                        /* STABLE */
                      }, 8, ["disabled"])) : createCommentVNode("v-if", true)
                    ])) : createCommentVNode("v-if", true)
                  ])
                ],
                2
                /* CLASS */
              )) : createCommentVNode("v-if", true)
            ], 16, _hoisted_1$j),
            createElementVNode(
              "div",
              {
                ref: "focusTrapEnd",
                tabindex: "0",
                onFocus: _cache[4] || (_cache[4] = (...args) => _ctx.focusFirst && _ctx.focusFirst(...args))
              },
              null,
              544
              /* NEED_HYDRATION, NEED_PATCH */
            ),
            createElementVNode(
              "div",
              _hoisted_8$1,
              null,
              512
              /* NEED_PATCH */
            )
          ],
          544
          /* NEED_HYDRATION, NEED_PATCH */
        )) : createCommentVNode("v-if", true)
      ]),
      _: 3
      /* FORWARDED */
    })
  ], 8, ["to", "disabled"]);
}
const Dialog = /* @__PURE__ */ _export_sfc(_sfc_main$l, [["render", _sfc_render$l]]);
const iconMap$2 = {
  notice: v6,
  error: k4,
  warning: A3,
  success: o8
};
const _sfc_main$k = defineComponent({
  name: "CdxMessage",
  components: { CdxButton, CdxIcon },
  props: {
    /**
     * Status type of Message.
     *
     * @values 'notice', 'warning', 'error', 'success'
     */
    type: {
      type: String,
      default: "notice",
      validator: statusTypeValidator
    },
    /**
     * Whether this message follows the inline design (no padding, background color, or border).
     */
    inline: {
      type: Boolean,
      default: false
    },
    /**
     * Custom message icon. Only allowed for notice messages.
     */
    icon: {
      type: [String, Object],
      default: null
    },
    /**
     * Whether the message should fade in. Should be used for messages that are dynamically
     * displayed, not present on page load.
     */
    fadeIn: {
      type: Boolean,
      default: false
    },
    /**
     * Allow the message to be dismissed by the user. Adds an icon-only dismiss button.
     */
    allowUserDismiss: {
      type: Boolean,
      default: false
    },
    // DEPRECATED: set default to 'Close' and remove validator (T368444).
    /**
     * Visually-hidden label text for the dismiss button for user-dismissable messages.
     *
     * Omit this prop to use the default value, "Close".
     */
    dismissButtonLabel: {
      type: String,
      default: "",
      validator: (value, props) => {
        if (value.length > 0 && !props.allowUserDismiss) {
          console.warn(
            "[CdxMessage]: The boolean `allowUserDismiss` prop is required to show the dismiss button.\n\nRefer to https://doc.wikimedia.org/codex/latest/components/demos/message.html#props."
          );
          return false;
        }
        return true;
      }
    },
    /**
     * Enable automatic dismissal of message after a period of time.
     *
     * This prop can be set to `true` to use the default display time of 4000 milliseconds. To
     * customize the display time, set this prop to a number of milliseconds.
     *
     * Error messages cannot be automatically dismissed. If the `type` prop is set to `error`,
     * this prop will be ignored.
     *
     * TODO: consider adding a stricter validator to set limits on this. If the time is too
     * short, the message may not be readable. If the time is too long, the message probably
     * shouldn't be auto-dismissed.
     */
    autoDismiss: {
      type: [Boolean, Number],
      default: false,
      validator: (value) => typeof value === "boolean" || typeof value === "number" && value > 0
    }
  },
  emits: [
    /**
     * Emitted when the message is dismissed by the user via the dismiss button.
     */
    "user-dismissed",
    /**
     * Emitted when the message is automatically dismissed after the display time.
     */
    "auto-dismissed"
  ],
  setup(props, { emit }) {
    const dismissed = ref(false);
    const userDismissable = computed(
      () => props.inline === false && // DEPRECATED: require use of new prop allowUserDismiss (T368444).
      (props.dismissButtonLabel.length > 0 || props.allowUserDismiss)
    );
    const translatedDismissButtonLabel = useI18nWithOverride(
      toRef(props, "dismissButtonLabel"),
      "cdx-message-dismiss-button-label",
      "Close"
    );
    const displayTime = computed(() => {
      if (props.autoDismiss === false || props.type === "error") {
        return false;
      } else if (props.autoDismiss === true) {
        return 4e3;
      }
      return props.autoDismiss;
    });
    const rootClasses = computed(() => ({
      "cdx-message--inline": props.inline,
      "cdx-message--block": !props.inline,
      "cdx-message--user-dismissable": userDismissable.value,
      ["cdx-message--".concat(props.type)]: true
    }));
    const computedIcon = computed(
      () => props.icon && props.type === "notice" ? props.icon : iconMap$2[props.type]
    );
    const leaveActiveClass = ref("");
    function onDismiss(eventName) {
      if (dismissed.value) {
        return;
      }
      leaveActiveClass.value = eventName === "user-dismissed" ? "cdx-message-leave-active-user" : "cdx-message-leave-active-system";
      dismissed.value = true;
      emit(eventName);
    }
    onMounted(() => {
      if (props.type === "error" && props.autoDismiss !== false) {
        warn('CdxMessage: Message with type="error" cannot use auto-dismiss');
      } else if (displayTime.value) {
        setTimeout(() => onDismiss("auto-dismissed"), displayTime.value);
      }
    });
    return {
      dismissed,
      userDismissable,
      translatedDismissButtonLabel,
      rootClasses,
      leaveActiveClass,
      computedIcon,
      onDismiss,
      cdxIconClose: v4
    };
  }
});
const _hoisted_1$i = ["aria-live", "role"];
const _hoisted_2$9 = { class: "cdx-message__content" };
function _sfc_render$k(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_cdx_icon = resolveComponent("cdx-icon");
  const _component_cdx_button = resolveComponent("cdx-button");
  return openBlock(), createBlock(Transition, {
    name: "cdx-message",
    appear: _ctx.fadeIn,
    "leave-active-class": _ctx.leaveActiveClass
  }, {
    default: withCtx(() => [
      !_ctx.dismissed ? (openBlock(), createElementBlock("div", {
        key: 0,
        class: normalizeClass(["cdx-message", _ctx.rootClasses]),
        "aria-live": _ctx.type !== "error" ? "polite" : void 0,
        role: _ctx.type === "error" ? "alert" : void 0
      }, [
        createVNode(_component_cdx_icon, {
          class: "cdx-message__icon--vue",
          icon: _ctx.computedIcon
        }, null, 8, ["icon"]),
        createElementVNode("div", _hoisted_2$9, [
          renderSlot(_ctx.$slots, "default")
        ]),
        _ctx.userDismissable ? (openBlock(), createBlock(_component_cdx_button, {
          key: 0,
          class: "cdx-message__dismiss-button",
          weight: "quiet",
          type: "button",
          "aria-label": _ctx.translatedDismissButtonLabel,
          onClick: _cache[0] || (_cache[0] = ($event) => _ctx.onDismiss("user-dismissed"))
        }, {
          default: withCtx(() => [
            createVNode(_component_cdx_icon, { icon: _ctx.cdxIconClose }, null, 8, ["icon"])
          ]),
          _: 1
          /* STABLE */
        }, 8, ["aria-label"])) : createCommentVNode("v-if", true)
      ], 10, _hoisted_1$i)) : createCommentVNode("v-if", true)
    ]),
    _: 3
    /* FORWARDED */
  }, 8, ["appear", "leave-active-class"]);
}
const CdxMessage = /* @__PURE__ */ _export_sfc(_sfc_main$k, [["render", _sfc_render$k]]);
const statusValidator$6 = makeStringTypeValidator(ValidationStatusTypes);
const _sfc_main$j = defineComponent({
  name: "CdxField",
  components: { CdxLabel, CdxMessage },
  props: {
    /**
     * Icon before the label text.
     *
     * Do not use this if including a start icon within the input component.
     */
    labelIcon: {
      type: [String, Object],
      default: ""
    },
    /**
     * Whether the field is optional.
     *
     * This will add a flag next to the label indicating that the field is optional.
     */
    optional: {
      type: Boolean,
      default: false
    },
    // DEPRECATED: set default to '(optional)' and remove validator (T368444).
    /**
     * Text to indicate that the field is optional.
     *
     * Omit this prop to use the default value, "(optional)".
     */
    optionalFlag: {
      type: String,
      default: "",
      validator: (value, props) => {
        if (value.length > 0 && !props.optional) {
          console.warn(
            "[CdxField]: The boolean `optional` prop is required to show the optional flag.\n\nRefer to https://doc.wikimedia.org/codex/latest/components/demos/field.html#props."
          );
          return false;
        }
        return true;
      }
    },
    /**
     * Whether the label should be visually hidden.
     *
     * Note that this will also hide the description.
     */
    hideLabel: {
      type: Boolean,
      default: false
    },
    /**
     * Whether this field contains a group of inputs.
     *
     * When true, this outputs a `<fieldset>` element with a semantic `<legend>`. When false,
     * it outputs a `<div>` with a semantic `<label>`.
     */
    isFieldset: {
      type: Boolean,
      default: false
    },
    /**
     * Whether the entire field is disabled.
     */
    disabled: {
      type: Boolean,
      default: false
    },
    /**
     * `status` attribute of the input. This also determines which validation message is shown.
     */
    status: {
      type: String,
      default: "default",
      validator: statusValidator$6
    },
    /**
     * Message text keyed on validation status type.
     *
     * @default {}
     */
    messages: {
      type: Object,
      default: () => ({})
    }
  },
  setup(props, { slots }) {
    const { disabled, status, isFieldset } = toRefs(props);
    const computedDisabled = useComputedDisabled(disabled);
    const rootClasses = computed(() => ({
      "cdx-field--disabled": computedDisabled.value,
      "cdx-field--is-fieldset": isFieldset.value
    }));
    const labelId = useId();
    const descriptionId = useId();
    const inputId = useId();
    const computedInputId = computed(() => !isFieldset.value ? inputId : void 0);
    provide(FieldInputIdKey, computedInputId);
    const computedDescriptionId = computed(
      () => !isFieldset.value && slots.description ? descriptionId : void 0
    );
    provide(FieldDescriptionIdKey, computedDescriptionId);
    provide(DisabledKey, computedDisabled);
    provide(FieldStatusKey, status);
    const validationMessage = computed(
      () => props.status !== "default" && props.status in props.messages ? props.messages[props.status] : ""
    );
    const validationMessageType = computed(() => props.status === "default" ? "notice" : props.status);
    return {
      rootClasses,
      computedDisabled,
      labelId,
      descriptionId,
      inputId,
      validationMessage,
      validationMessageType
    };
  }
});
const _hoisted_1$h = { class: "cdx-field__control" };
const _hoisted_2$8 = { class: "cdx-field__help-text" };
const _hoisted_3$6 = {
  key: 0,
  class: "cdx-field__validation-message"
};
function _sfc_render$j(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_cdx_label = resolveComponent("cdx-label");
  const _component_cdx_message = resolveComponent("cdx-message");
  return openBlock(), createBlock(resolveDynamicComponent(_ctx.isFieldset ? "fieldset" : "div"), {
    class: normalizeClass(["cdx-field", _ctx.rootClasses]),
    "aria-disabled": !_ctx.isFieldset && _ctx.computedDisabled ? true : void 0,
    disabled: _ctx.isFieldset && _ctx.computedDisabled ? true : void 0
  }, {
    default: withCtx(() => [
      createVNode(_component_cdx_label, {
        id: _ctx.labelId,
        icon: _ctx.labelIcon,
        "visually-hidden": _ctx.hideLabel,
        optional: _ctx.optional,
        "optional-flag": _ctx.optionalFlag,
        "input-id": _ctx.inputId,
        "description-id": _ctx.descriptionId,
        disabled: _ctx.computedDisabled,
        "is-legend": _ctx.isFieldset
      }, createSlots({
        default: withCtx(() => [
          renderSlot(_ctx.$slots, "label")
        ]),
        _: 2
        /* DYNAMIC */
      }, [
        _ctx.$slots.description && _ctx.$slots.description().length > 0 ? {
          name: "description",
          fn: withCtx(() => [
            renderSlot(_ctx.$slots, "description")
          ]),
          key: "0"
        } : void 0
      ]), 1032, ["id", "icon", "visually-hidden", "optional", "optional-flag", "input-id", "description-id", "disabled", "is-legend"]),
      createElementVNode("div", _hoisted_1$h, [
        renderSlot(_ctx.$slots, "default")
      ]),
      createElementVNode("div", _hoisted_2$8, [
        renderSlot(_ctx.$slots, "help-text")
      ]),
      !_ctx.computedDisabled && _ctx.validationMessage || _ctx.$slots[_ctx.validationMessageType] ? (openBlock(), createElementBlock("div", _hoisted_3$6, [
        createVNode(_component_cdx_message, {
          type: _ctx.validationMessageType,
          inline: true
        }, {
          default: withCtx(() => [
            _ctx.status === "warning" && _ctx.$slots.warning ? renderSlot(_ctx.$slots, "warning", { key: 0 }) : _ctx.status === "error" && _ctx.$slots.error ? renderSlot(_ctx.$slots, "error", { key: 1 }) : _ctx.status === "success" && _ctx.$slots.success ? renderSlot(_ctx.$slots, "success", { key: 2 }) : (openBlock(), createElementBlock(
              Fragment,
              { key: 3 },
              [
                createTextVNode(
                  toDisplayString(_ctx.validationMessage),
                  1
                  /* TEXT */
                )
              ],
              64
              /* STABLE_FRAGMENT */
            ))
          ]),
          _: 3
          /* FORWARDED */
        }, 8, ["type"])
      ])) : createCommentVNode("v-if", true)
    ]),
    _: 3
    /* FORWARDED */
  }, 8, ["class", "aria-disabled", "disabled"]);
}
const Field = /* @__PURE__ */ _export_sfc(_sfc_main$j, [["render", _sfc_render$j]]);
const _sfc_main$i = defineComponent({
  name: "CdxImage",
  components: { CdxIcon },
  /**
   * We want the image to inherit attributes, not the root element.
   */
  inheritAttrs: false,
  props: {
    /**
     * The source URL of the image.
     */
    src: {
      type: String,
      default: ""
    },
    /**
     * Alternative text for the image.
     *
     * Descriptive text must be provided unless the image is decorative or described elsewhere.
     */
    alt: {
      type: String,
      required: true,
      default: ""
    },
    /**
     * The aspect ratio of the image.
     *
     * Accepts one of the predefined aspect ratios.
     */
    aspectRatio: {
      type: String,
      validator: imageAspectRatioValidator,
      default: null
    },
    /**
     * The object-position of the image when cropping with an aspect ratio.
     *
     * Accepts 'top', 'bottom', 'left', 'right', or 'center'.
     */
    objectPosition: {
      type: String,
      validator: imagePositionValidator,
      default: "center"
    },
    /**
     * Specifies how the image should be resized to fit its container.
     * Accepts 'fill', 'contain', 'cover', 'none', or 'scale-down'.
     */
    objectFit: {
      type: String,
      validator: objectFitValidator,
      default: "cover"
    },
    /**
     * Image position on a page
     */
    position: {
      type: String,
      default: ""
    },
    /**
     * The width of the image in pixels.
     */
    width: {
      type: [String, Number],
      default: void 0
    },
    /**
     * The height of the image in pixels.
     */
    height: {
      type: [String, Number],
      default: void 0
    },
    /**
     * The loading priority of the image.
     *
     * Accepts 'lazy' or 'eager'.
     */
    loadingPriority: {
      type: String,
      default: "lazy"
    }
  },
  emits: [
    /**
     * Emitted when an error occurs loading the image.
     *
     * @param {Event} event - The error event object.
     */
    "error"
  ],
  setup(props, { emit, attrs }) {
    const imageSrc = ref(props.src);
    const isBroken = ref(false);
    const isLoaded = ref(false);
    const imageClasses = computed(() => {
      var _a;
      return {
        ["cdx-image__image--".concat((_a = props.aspectRatio) == null ? void 0 : _a.split(":").join("-"))]: !!props.aspectRatio,
        ["cdx-image__image--object-position-".concat(props.objectPosition)]: !!props.objectPosition,
        ["cdx-image__image--object-fit-".concat(props.objectFit)]: !!props.objectFit,
        "cdx-image__image--is-broken": isBroken.value,
        "cdx-image__image--is-loading": !isLoaded.value && !isBroken.value
      };
    });
    const internalRootClasses = computed(() => ({
      ["cdx-image--".concat(props.position)]: !!props.position
    }));
    const {
      rootClasses,
      rootStyle,
      otherAttrs
    } = useSplitAttributes(attrs, internalRootClasses);
    const placeholderStyles = computed(() => ({
      width: "".concat(props.width, "px"),
      height: "".concat(props.height, "px")
    }));
    const placeholderClasses = computed(() => {
      var _a;
      return {
        ["cdx-image__placeholder--".concat((_a = props.aspectRatio) == null ? void 0 : _a.split(":").join("-"))]: !!props.aspectRatio
      };
    });
    const handleError = (event) => {
      isBroken.value = true;
      emit("error", event);
    };
    const handleLoad = () => {
      isLoaded.value = true;
    };
    const iconSizeClass = computed(() => {
      const placeholderWidth = Number(props.width);
      return placeholderWidth <= 32 ? "cdx-image__placeholder__icon--size-smallest" : placeholderWidth <= 180 ? "cdx-image__placeholder__icon--size-small" : placeholderWidth <= 280 ? "cdx-image__placeholder__icon--size-medium" : "cdx-image__placeholder__icon--size-large";
    });
    return {
      imageSrc,
      isBroken,
      isLoaded,
      imageClasses,
      rootClasses,
      rootStyle,
      otherAttrs,
      placeholderStyles,
      handleError,
      handleLoad,
      cdxIconImage: J4,
      iconSizeClass,
      placeholderClasses
    };
  }
});
const _hoisted_1$g = ["src", "alt", "width", "height", "loading"];
function _sfc_render$i(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_cdx_icon = resolveComponent("cdx-icon");
  return openBlock(), createElementBlock(
    "div",
    {
      class: normalizeClass(["cdx-image", _ctx.rootClasses]),
      style: normalizeStyle(_ctx.rootStyle)
    },
    [
      _ctx.src ? (openBlock(), createElementBlock("img", mergeProps({ key: 0 }, _ctx.otherAttrs, {
        src: _ctx.imageSrc,
        alt: _ctx.alt,
        width: _ctx.width,
        height: _ctx.height,
        loading: _ctx.loadingPriority,
        class: ["cdx-image__image", _ctx.imageClasses],
        onLoad: _cache[0] || (_cache[0] = (...args) => _ctx.handleLoad && _ctx.handleLoad(...args)),
        onError: _cache[1] || (_cache[1] = (...args) => _ctx.handleError && _ctx.handleError(...args))
      }), null, 16, _hoisted_1$g)) : createCommentVNode("v-if", true),
      !_ctx.src || !_ctx.isLoaded && !_ctx.isBroken ? (openBlock(), createElementBlock(
        "div",
        {
          key: 1,
          class: normalizeClass(["cdx-image__placeholder", _ctx.placeholderClasses]),
          style: normalizeStyle(_ctx.placeholderStyles)
        },
        [
          createVNode(_component_cdx_icon, {
            icon: _ctx.cdxIconImage,
            class: normalizeClass(["cdx-image__placeholder__icon", [_ctx.iconSizeClass]])
          }, null, 8, ["icon", "class"])
        ],
        6
        /* CLASS, STYLE */
      )) : createCommentVNode("v-if", true)
    ],
    6
    /* CLASS, STYLE */
  );
}
const Image$1 = /* @__PURE__ */ _export_sfc(_sfc_main$i, [["render", _sfc_render$i]]);
const iconMap$1 = {
  notice: v6,
  error: k4,
  warning: A3,
  success: o8
};
const _sfc_main$h = defineComponent({
  name: "CdxInfoChip",
  components: { CdxIcon },
  directives: {
    tooltip: CdxTooltip
  },
  props: {
    /**
     * Status type.
     *
     * @values 'notice', 'warning', 'error', 'success'
     */
    status: {
      type: String,
      default: "notice",
      validator: statusTypeValidator
    },
    /**
     * Custom icon to use for "notice" chips. Chips with other status types
     * (warning, etc) do not allow custom icons and will ignore this option.
     */
    icon: {
      type: [String, Object],
      default: null
    }
  },
  setup(props, { slots }) {
    const rootClasses = computed(() => ({
      ["cdx-info-chip--".concat(props.status)]: true
    }));
    const computedIcon = computed(
      () => props.status === "notice" ? props.icon : iconMap$1[props.status]
    );
    const textElement = ref();
    const isMounted = ref(false);
    const tooltipContent = computed(() => {
      if (!isMounted.value) {
        return null;
      }
      if (textElement.value && textElement.value.scrollWidth > textElement.value.clientWidth) {
        return useSlotContents(slots == null ? void 0 : slots.default)[0];
      }
      return null;
    });
    onMounted(() => {
      isMounted.value = true;
    });
    return {
      rootClasses,
      computedIcon,
      tooltipContent,
      textElement
    };
  }
});
const _hoisted_1$f = {
  ref: "textElement",
  class: "cdx-info-chip__text"
};
function _sfc_render$h(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_cdx_icon = resolveComponent("cdx-icon");
  const _directive_tooltip = resolveDirective("tooltip");
  return withDirectives((openBlock(), createElementBlock(
    "div",
    {
      class: normalizeClass(["cdx-info-chip", _ctx.rootClasses])
    },
    [
      _ctx.computedIcon ? (openBlock(), createBlock(_component_cdx_icon, {
        key: 0,
        class: "cdx-info-chip__icon--vue",
        icon: _ctx.computedIcon
      }, null, 8, ["icon"])) : createCommentVNode("v-if", true),
      createElementVNode(
        "span",
        _hoisted_1$f,
        [
          renderSlot(_ctx.$slots, "default")
        ],
        512
        /* NEED_PATCH */
      )
    ],
    2
    /* CLASS */
  )), [
    [_directive_tooltip, _ctx.tooltipContent]
  ]);
}
const InfoChip = /* @__PURE__ */ _export_sfc(_sfc_main$h, [["render", _sfc_render$h]]);
const statusValidator$5 = makeStringTypeValidator(ValidationStatusTypes);
const _sfc_main$g = defineComponent({
  name: "CdxLookup",
  components: {
    CdxMenu,
    CdxTextInput
  },
  /**
   * We want the input to inherit attributes, not the root element.
   */
  inheritAttrs: false,
  props: {
    /**
     * Value of the current selection.
     *
     * Must be bound with `v-model:selected`.
     *
     * The property should be initialized to `null` rather than using a falsy value.
     */
    selected: {
      type: [String, Number, null],
      required: true
    },
    /**
     * Menu items and/or menu group definitions.
     *
     * Menu groups and individual menu items will be output in the order they appear here.
     */
    menuItems: {
      type: Array,
      required: true
    },
    /**
     * Current value of the input. This prop is optional and should only be used if you need to
     * keep track of the input value for some reason (e.g. to set an initial value).
     *
     * Optionally provided by `v-model:input-value` binding in the parent component.
     */
    inputValue: {
      type: [String, Number],
      default: null
    },
    /**
     * Whether the entire component is disabled.
     */
    disabled: {
      type: Boolean,
      default: false
    },
    /**
     * Configuration for various menu features. All properties default to false.
     *
     * See the MenuConfig type.
     *
     * @default {}
     */
    menuConfig: {
      type: Object,
      default: () => ({})
    },
    /**
     * `status` property of the TextInput component
     */
    status: {
      type: String,
      default: "default",
      validator: statusValidator$5
    }
  },
  emits: [
    /**
     * When the selected value changes.
     *
     * @property {string | number | null} selected The new selected value
     */
    "update:selected",
    /**
     * When the input value changes. Only emitted if the inputValue prop is provided.
     *
     * @property {string | number} inputValue The new input value
     */
    "update:input-value",
    /**
     * When the user scrolls towards the bottom of the menu.
     *
     * If it is possible to add or load more menu items, then now would be a good moment
     * so that the user can experience infinite scrolling.
     */
    "load-more",
    /**
     * When the text input value changes.
     *
     * @property {string | number} value The new value
     */
    "input",
    /**
     * When an input value change is committed by the user (e.g. on blur)
     *
     * @property {Event} event
     */
    "change",
    /**
     * When the input comes into focus
     *
     * @property {FocusEvent} event
     */
    "focus",
    /**
     * When the input loses focus
     *
     * @property {FocusEvent} event
     */
    "blur"
  ],
  setup: (props, { emit, attrs, slots }) => {
    const rootElement = ref();
    const textInput = ref();
    const menu = ref();
    const menuId = useId();
    const pending = ref(false);
    const expanded = ref(false);
    const isActive = ref(false);
    const initialMenuItems = ref(props.menuItems);
    const {
      computedDisabled,
      computedStatus
    } = useFieldData(
      toRef(props, "disabled"),
      toRef(props, "status")
    );
    const selectedProp = toRef(props, "selected");
    const selection = useModelWrapper(selectedProp, emit, "update:selected");
    const selectedMenuItem = computed(
      () => {
        var _a;
        return (_a = menu.value) == null ? void 0 : _a.getComputedMenuItems().find((item) => item.value === selection.value);
      }
    );
    const highlightedId = computed(() => {
      var _a, _b;
      return (_b = (_a = menu.value) == null ? void 0 : _a.getHighlightedMenuItem()) == null ? void 0 : _b.id;
    });
    const internalInputValue = ref("");
    const computedInputValue = useOptionalModelWrapper(
      internalInputValue,
      toRef(props, "inputValue"),
      emit,
      "update:input-value"
    );
    const internalClasses = computed(() => ({
      "cdx-lookup--disabled": computedDisabled.value,
      "cdx-lookup--pending": pending.value
    }));
    const {
      rootClasses,
      rootStyle,
      otherAttrs
    } = useSplitAttributes(attrs, internalClasses);
    function onUpdateInput(newVal) {
      if (selectedMenuItem.value) {
        if (selectedMenuItem.value.label !== newVal && selectedMenuItem.value.value !== newVal) {
          selection.value = null;
        }
      } else if (props.selected !== null && props.selected !== newVal) {
        selection.value = null;
      }
      if (newVal === "" && initialMenuItems.value.length === 0) {
        expanded.value = false;
        pending.value = false;
      } else {
        pending.value = true;
      }
      emit("input", newVal);
    }
    function onInputFocus(event) {
      isActive.value = true;
      const hasInput = computedInputValue.value !== null && computedInputValue.value !== "";
      const hasMenuItems = !!(props.menuItems.length > 0 || slots["no-results"]);
      if (hasMenuItems && (hasInput || initialMenuItems.value.length > 0)) {
        expanded.value = true;
      }
      emit("focus", event);
    }
    function onInputBlur(event) {
      isActive.value = false;
      expanded.value = false;
      emit("blur", event);
    }
    function onKeydown(e) {
      if (!menu.value || computedDisabled.value || props.menuItems.length === 0 && !slots["no-results"] || e.key === " ") {
        return;
      }
      menu.value.delegateKeyNavigation(e);
    }
    useFloatingMenu(textInput, menu);
    watch(selection, (newVal) => {
      var _a;
      if (newVal !== null) {
        const inputValueForSelection = selectedMenuItem.value ? (_a = selectedMenuItem.value.label) != null ? _a : selectedMenuItem.value.value : "";
        if (computedInputValue.value !== inputValueForSelection) {
          computedInputValue.value = inputValueForSelection;
          emit("input", inputValueForSelection);
        }
      }
    });
    watch(toRef(props, "menuItems"), (newVal) => {
      if (
        // Only show the menu if we were in the pending state (meaning this menuItems change
        // was in response to user input) and the menu is still focused
        isActive.value && pending.value && // Show the menu if there are either menu items or no-results content to show
        (newVal.length > 0 || slots["no-results"])
      ) {
        expanded.value = true;
      }
      if (newVal.length === 0 && !slots["no-results"]) {
        expanded.value = false;
      }
      pending.value = false;
    });
    return {
      rootElement,
      textInput,
      menu,
      menuId,
      highlightedId,
      computedInputValue,
      selection,
      expanded,
      computedDisabled,
      computedStatus,
      onInputBlur,
      rootClasses,
      rootStyle,
      otherAttrs,
      onUpdateInput,
      onInputFocus,
      onKeydown
    };
  }
});
function _sfc_render$g(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_cdx_text_input = resolveComponent("cdx-text-input");
  const _component_cdx_menu = resolveComponent("cdx-menu");
  return openBlock(), createElementBlock(
    "div",
    {
      ref: "rootElement",
      class: normalizeClass(["cdx-lookup", _ctx.rootClasses]),
      style: normalizeStyle(_ctx.rootStyle)
    },
    [
      createVNode(_component_cdx_text_input, mergeProps({
        ref: "textInput",
        modelValue: _ctx.computedInputValue,
        "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => _ctx.computedInputValue = $event)
      }, _ctx.otherAttrs, {
        class: "cdx-lookup__input",
        role: "combobox",
        autocomplete: "off",
        "aria-autocomplete": "list",
        "aria-controls": _ctx.menuId,
        "aria-expanded": _ctx.expanded,
        "aria-activedescendant": _ctx.highlightedId,
        disabled: _ctx.computedDisabled,
        status: _ctx.computedStatus,
        "onUpdate:modelValue": _ctx.onUpdateInput,
        onChange: _cache[1] || (_cache[1] = ($event) => _ctx.$emit("change", $event)),
        onFocus: _ctx.onInputFocus,
        onBlur: _ctx.onInputBlur,
        onKeydown: _ctx.onKeydown
      }), null, 16, ["modelValue", "aria-controls", "aria-expanded", "aria-activedescendant", "disabled", "status", "onUpdate:modelValue", "onFocus", "onBlur", "onKeydown"]),
      createVNode(_component_cdx_menu, mergeProps({
        id: _ctx.menuId,
        ref: "menu",
        selected: _ctx.selection,
        "onUpdate:selected": _cache[2] || (_cache[2] = ($event) => _ctx.selection = $event),
        expanded: _ctx.expanded,
        "onUpdate:expanded": _cache[3] || (_cache[3] = ($event) => _ctx.expanded = $event),
        "menu-items": _ctx.menuItems
      }, _ctx.menuConfig, {
        onLoadMore: _cache[4] || (_cache[4] = ($event) => _ctx.$emit("load-more"))
      }), {
        default: withCtx(({ menuItem }) => [
          renderSlot(_ctx.$slots, "menu-item", { menuItem })
        ]),
        "no-results": withCtx(() => [
          renderSlot(_ctx.$slots, "no-results")
        ]),
        _: 3
        /* FORWARDED */
      }, 16, ["id", "selected", "expanded", "menu-items"])
    ],
    6
    /* CLASS, STYLE */
  );
}
const Lookup = /* @__PURE__ */ _export_sfc(_sfc_main$g, [["render", _sfc_render$g]]);
const _sfc_main$f = defineComponent({
  name: "CdxToggleButton",
  props: {
    /**
     * Whether the ToggleButton should be set to "on" (true) or "off" (false).
     *
     * Provided by `v-model` binding in the parent component.
     */
    modelValue: {
      type: Boolean,
      default: false
    },
    /**
     * Whether the disabled attribute should be added to the ToggleButton, which prevents
     * it from being clicked.
     */
    disabled: {
      type: Boolean,
      default: false
    },
    /**
     * Whether the ToggleButton should be "quiet", which renders more minimally.
     */
    quiet: {
      type: Boolean,
      default: false
    }
  },
  emits: [
    /**
     * Emitted when modelValue changes (i.e. when the state is toggled)
     *
     * @property {boolean} modelValue The new model value
     */
    "update:modelValue"
  ],
  setup(props, { emit, slots, attrs }) {
    const isIconOnly = useIconOnlyButton(slots.default, attrs, "CdxToggleButton");
    const isActive = ref(false);
    const rootClasses = computed(() => ({
      // Quiet means frameless among other things
      "cdx-toggle-button--quiet": props.quiet,
      "cdx-toggle-button--framed": !props.quiet,
      // Provide --toggled-off too so that we can simplify selectors
      "cdx-toggle-button--toggled-on": props.modelValue,
      "cdx-toggle-button--toggled-off": !props.modelValue,
      "cdx-toggle-button--icon-only": isIconOnly.value,
      "cdx-toggle-button--is-active": isActive.value
    }));
    const onClick = () => {
      emit("update:modelValue", !props.modelValue);
    };
    const setActive = (active) => {
      isActive.value = active;
    };
    function onKeyDown() {
      setActive(true);
    }
    function onKeyUp() {
      setActive(false);
      onClick();
    }
    return {
      rootClasses,
      onClick,
      onKeyDown,
      onKeyUp
    };
  }
});
const _hoisted_1$e = ["aria-pressed", "disabled"];
function _sfc_render$f(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("button", {
    class: normalizeClass(["cdx-toggle-button", _ctx.rootClasses]),
    "aria-pressed": _ctx.modelValue,
    disabled: _ctx.disabled,
    type: "button",
    onClick: _cache[0] || (_cache[0] = (...args) => _ctx.onClick && _ctx.onClick(...args)),
    onKeydown: _cache[1] || (_cache[1] = withKeys(withModifiers((...args) => _ctx.onKeyDown && _ctx.onKeyDown(...args), ["prevent"]), ["space", "enter"])),
    onKeyup: _cache[2] || (_cache[2] = withKeys((...args) => _ctx.onKeyUp && _ctx.onKeyUp(...args), ["space", "enter"]))
  }, [
    renderSlot(_ctx.$slots, "default")
  ], 42, _hoisted_1$e);
}
const CdxToggleButton = /* @__PURE__ */ _export_sfc(_sfc_main$f, [["render", _sfc_render$f]]);
const _sfc_main$e = defineComponent({
  name: "CdxMenuButton",
  components: {
    CdxToggleButton,
    CdxMenu
  },
  inheritAttrs: false,
  props: {
    /**
     * Value of the current selection.
     *
     * This prop should be initialized to `null` (for single-select) or an empty array (for
     * multi-select) rather than using a falsy value.
     *
     * Must be bound with `v-model:selected`.
     */
    selected: {
      // eslint-disable-next-line max-len
      type: [String, Number, Array, null],
      required: true
    },
    /**
     * Menu items and/or menu group definitions.
     *
     * Menu groups and individual menu items will be output in the order they appear here.
     */
    menuItems: {
      type: Array,
      required: true
    },
    /**
     * Configuration for various menu features. All properties default to false.
     *
     * See the MenuConfig type.
     *
     * @default {}
     */
    menuConfig: {
      type: Object,
      default: () => ({})
    },
    /**
     * Whether the dropdown is disabled.
     */
    disabled: {
      type: Boolean,
      default: false
    },
    /**
     * Interactive footer item.
     *
     * This is a special menu item which is pinned to the bottom of the menu. When scrolling is
     * enabled within the menu, the footer item will always be visible at the bottom of the
     * menu. When scrolling is not enabled, the footer item will simply appear as the last menu
     * item.
     *
     * The footer item is selectable, like other menu items.
     */
    footer: {
      type: Object,
      default: null
    }
  },
  emits: [
    /**
     * When the selected value changes.
     *
     * @property {string | number} selected The new selected value
     */
    "update:selected"
  ],
  setup(props, { emit, attrs }) {
    const menu = ref();
    const toggle = ref();
    const selectedProp = toRef(props, "selected");
    const modelWrapper = useModelWrapper(selectedProp, emit, "update:selected");
    const expanded = ref(false);
    const toggleId = useId();
    const menuId = useId();
    const { computedDisabled } = useFieldData(toRef(props, "disabled"));
    const { rootClasses, rootStyle, otherAttrs } = useSplitAttributes(attrs);
    function onKeydown(e) {
      if (!menu.value || computedDisabled.value || props.menuItems.length === 0 || e.key === " " || e.key === "Enter") {
        return;
      }
      menu.value.delegateKeyNavigation(e);
    }
    useFloatingMenu(toggle, menu, {
      useAvailableWidth: true,
      placement: "bottom-start",
      offset: 4
    });
    return {
      computedDisabled,
      expanded,
      menu,
      menuId,
      modelWrapper,
      onKeydown,
      toggle,
      toggleId,
      rootClasses,
      rootStyle,
      otherAttrs
    };
  }
});
const _hoisted_1$d = { class: "cdx-menu-button__menu-wrapper" };
function _sfc_render$e(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_cdx_toggle_button = resolveComponent("cdx-toggle-button");
  const _component_cdx_menu = resolveComponent("cdx-menu");
  return openBlock(), createElementBlock(
    "div",
    {
      class: normalizeClass(["cdx-menu-button", _ctx.rootClasses]),
      style: normalizeStyle(_ctx.rootStyle)
    },
    [
      createVNode(_component_cdx_toggle_button, mergeProps({
        id: _ctx.toggleId,
        ref: "toggle"
      }, _ctx.otherAttrs, {
        modelValue: _ctx.expanded,
        "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => _ctx.expanded = $event),
        disabled: _ctx.computedDisabled,
        quiet: "",
        "aria-haspopup": "menu",
        "aria-controls": _ctx.menuId,
        "aria-expanded": _ctx.expanded,
        onBlur: _cache[1] || (_cache[1] = ($event) => _ctx.expanded = false),
        onKeydown: _ctx.onKeydown
      }), {
        default: withCtx(() => [
          renderSlot(_ctx.$slots, "default")
        ]),
        _: 3
        /* FORWARDED */
      }, 16, ["id", "modelValue", "disabled", "aria-controls", "aria-expanded", "onKeydown"]),
      createElementVNode("div", _hoisted_1$d, [
        createVNode(_component_cdx_menu, mergeProps({
          id: _ctx.menuId,
          ref: "menu",
          selected: _ctx.modelWrapper,
          "onUpdate:selected": _cache[2] || (_cache[2] = ($event) => _ctx.modelWrapper = $event),
          expanded: _ctx.expanded,
          "onUpdate:expanded": _cache[3] || (_cache[3] = ($event) => _ctx.expanded = $event),
          "menu-items": _ctx.menuItems
        }, _ctx.menuConfig, {
          role: "menu",
          "aria-labelledby": _ctx.toggleId,
          footer: _ctx.footer
        }), {
          default: withCtx(({ menuItem }) => [
            renderSlot(_ctx.$slots, "menu-item", { menuItem })
          ]),
          _: 3
          /* FORWARDED */
        }, 16, ["id", "selected", "expanded", "menu-items", "aria-labelledby", "footer"])
      ])
    ],
    6
    /* CLASS, STYLE */
  );
}
const MenuButton = /* @__PURE__ */ _export_sfc(_sfc_main$e, [["render", _sfc_render$e]]);
const statusValidator$4 = makeStringTypeValidator(ValidationStatusTypes);
const _sfc_main$d = defineComponent({
  name: "CdxMultiselectLookup",
  components: {
    CdxChipInput,
    CdxMenu
  },
  props: {
    /**
     * Current chips present in the input.
     *
     * Must be bound with `v-model:input-chips`. Initialize to an empty array if there are no
     * initial selections. If there are, initialize to an array of input chips matching those
     * selections.
     */
    inputChips: {
      type: Array,
      required: true
    },
    /**
     * Value(s) of the current selection(s).
     *
     * Must be bound with `v-model:selected`. Initialize to an empty array if there are no
     * initial selections.
     */
    selected: {
      type: [Array],
      required: true
    },
    /**
     * Menu items and/or menu group definitions. Initialize to an empty array if there are no
     * initial menu items.
     *
     * Menu groups and individual menu items will be output in the order they appear here.
     */
    menuItems: {
      type: Array,
      required: true
    },
    /**
     * Current value of the text input. This prop is optional and should only be used if you
     * need to keep track of the text input value for some reason (e.g. for validation).
     *
     * Optionally provided by `v-model:input-value` binding in the parent component.
     */
    inputValue: {
      type: [String, Number],
      default: null
    },
    /**
     * Whether the text input should appear below the set of input chips.
     *
     * By default, the input chips are inline with the input.
     */
    separateInput: {
      type: Boolean,
      default: false
    },
    /**
     * Whether the entire component is disabled.
     */
    disabled: {
      type: Boolean,
      default: false
    },
    /**
     * Whether the MultiselectLookup is readonly.
     */
    readonly: {
      type: Boolean,
      default: false
    },
    /**
     * `status` attribute of the input.
     */
    status: {
      type: String,
      default: "default",
      validator: statusValidator$4
    },
    /**
     * Configuration for various menu features. All properties default to false.
     *
     * See the MenuConfig type.
     *
     * @default {}
     */
    menuConfig: {
      type: Object,
      default: () => ({})
    },
    /**
     * Whether to keep the search term in the input after selection.
     */
    keepInputOnSelection: {
      type: Boolean,
      default: false
    }
  },
  emits: [
    /**
     * When the input chips change.
     *
     * @property {ChipInputItem[]} inputChips The new set of inputChips
     */
    "update:input-chips",
    /**
     * When the selected value changes.
     *
     * @property {MenuItemValue[]} selected The new set of selected values
     */
    "update:selected",
    /**
     * When the input value changes. Only emitted if the inputValue prop is provided.
     *
     * This event is emitted both when the user changes the input and when the input is changed
     * or cleared automatically (e.g. on selection).
     *
     * @property {string | number} inputValue The new input value
     */
    "update:input-value",
    /**
     * When a chip is clicked.
     *
     * @property {ChipInputItem} chip The clicked chip
     */
    "chip-click",
    /**
     * When the user scrolls towards the bottom of the menu.
     *
     * If it is possible to add or load more menu items, then now would be a good moment
     * so that the user can experience infinite scrolling.
     */
    "load-more",
    /**
     * When the user changes the value of the input. Not emitted when the input is changed
     * automatically (e.g. on selection).
     *
     * @property {string | number} value The new value
     */
    "input",
    /**
     * When an input value change is committed by the user (e.g. on blur)
     *
     * @property {Event} event
     */
    "change",
    /**
     * When the input comes into focus
     *
     * @property {FocusEvent} event
     */
    "focus",
    /**
     * When the input loses focus
     *
     * @property {FocusEvent} event
     */
    "blur"
  ],
  setup: (props, { emit, attrs, slots }) => {
    const chipInput = ref();
    const menu = ref();
    const menuId = useId();
    const highlightedId = computed(() => {
      var _a, _b;
      return (_b = (_a = menu.value) == null ? void 0 : _a.getHighlightedMenuItem()) == null ? void 0 : _b.id;
    });
    const pending = ref(false);
    const expanded = ref(false);
    const isActive = ref(false);
    provide(AllowArbitraryKey, ref(false));
    const {
      computedDisabled,
      computedStatus
    } = useFieldData(
      toRef(props, "disabled"),
      toRef(props, "status")
    );
    const internalClasses = computed(() => ({
      "cdx-multiselect-lookup--disabled": computedDisabled.value,
      "cdx-multiselect-lookup--pending": pending.value
    }));
    const {
      rootClasses,
      rootStyle,
      otherAttrs
    } = useSplitAttributes(attrs, internalClasses);
    useFloatingMenu(chipInput, menu);
    const selectedWrapper = useModelWrapper(toRef(props, "selected"), emit, "update:selected");
    const inputChipsWrapper = useModelWrapper(toRef(props, "inputChips"), emit, "update:input-chips");
    const internalInputValue = ref("");
    const computedInputValue = useOptionalModelWrapper(
      internalInputValue,
      toRef(props, "inputValue"),
      emit,
      "update:input-value"
    );
    const showNoResults = computed(() => computedInputValue.value.toString().length > 0 && slots["no-results"]);
    function onUpdateInputValue(newVal) {
      return __async(this, null, function* () {
        yield nextTick();
        pending.value = newVal !== null && newVal !== "";
        emit("input", newVal);
      });
    }
    function onInputFocus(event) {
      isActive.value = true;
      if (props.menuItems.length > 0 || showNoResults.value) {
        expanded.value = true;
      }
      emit("focus", event);
    }
    function onInputBlur(event) {
      isActive.value = false;
      expanded.value = false;
      emit("blur", event);
    }
    function onKeydown(e) {
      if (!menu.value || computedDisabled.value || props.menuItems.length === 0 && !showNoResults.value || e.key === " ") {
        return;
      }
      menu.value.delegateKeyNavigation(e);
    }
    watch(toRef(props, "selected"), (newVal) => {
      const newSelections = newVal.filter(
        (selection) => inputChipsWrapper.value.find((chip) => selection === chip.value) === void 0
      );
      if (newSelections.length > 0) {
        newSelections.forEach((newSelection) => {
          var _a;
          const newMenuItem = (_a = menu.value) == null ? void 0 : _a.getComputedMenuItems().find(
            (menuItem) => menuItem.value === newSelection
          );
          if (newMenuItem) {
            const _b = newMenuItem, { id } = _b, newMenuItemWithoutId = __objRest(_b, ["id"]);
            inputChipsWrapper.value.push(newMenuItemWithoutId);
          }
        });
        if (!props.keepInputOnSelection) {
          computedInputValue.value = "";
          emit("input", "");
        }
      }
      inputChipsWrapper.value = inputChipsWrapper.value.filter(
        (chip) => newVal.find((selection) => chip.value === selection) !== void 0
      );
    });
    watch(toRef(props, "inputChips"), (newVal) => {
      if (newVal.length < selectedWrapper.value.length) {
        selectedWrapper.value = newVal.map((chip) => chip.value);
      }
    });
    watch(toRef(props, "menuItems"), (newVal) => {
      if (newVal.length === 0 && !showNoResults.value) {
        expanded.value = false;
      } else if (isActive.value && pending.value) {
        expanded.value = true;
      }
      pending.value = false;
    });
    return {
      chipInput,
      menu,
      menuId,
      highlightedId,
      expanded,
      computedDisabled,
      computedStatus,
      rootClasses,
      rootStyle,
      otherAttrs,
      selectedWrapper,
      inputChipsWrapper,
      computedInputValue,
      onUpdateInputValue,
      onInputBlur,
      onInputFocus,
      onKeydown
    };
  }
});
function _sfc_render$d(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_cdx_chip_input = resolveComponent("cdx-chip-input");
  const _component_cdx_menu = resolveComponent("cdx-menu");
  return openBlock(), createElementBlock(
    "div",
    {
      class: normalizeClass(["cdx-multiselect-lookup", _ctx.rootClasses]),
      style: normalizeStyle(_ctx.rootStyle)
    },
    [
      createVNode(_component_cdx_chip_input, mergeProps({
        ref: "chipInput",
        "input-chips": _ctx.inputChipsWrapper,
        "onUpdate:inputChips": _cache[0] || (_cache[0] = ($event) => _ctx.inputChipsWrapper = $event),
        "input-value": _ctx.computedInputValue,
        "onUpdate:inputValue": _cache[1] || (_cache[1] = ($event) => _ctx.computedInputValue = $event)
      }, _ctx.otherAttrs, {
        class: "cdx-multiselect-lookup__chip-input",
        role: "combobox",
        autocomplete: "off",
        "aria-autocomplete": "list",
        "aria-controls": _ctx.menuId,
        "aria-expanded": _ctx.expanded,
        "aria-activedescendant": _ctx.highlightedId,
        "separate-input": _ctx.separateInput,
        readonly: _ctx.readonly,
        disabled: _ctx.computedDisabled,
        status: _ctx.computedStatus,
        "onUpdate:inputValue": _ctx.onUpdateInputValue,
        onFocus: _ctx.onInputFocus,
        onBlur: _ctx.onInputBlur,
        onKeydown: _ctx.onKeydown,
        onChipClick: _cache[2] || (_cache[2] = (chip) => _ctx.$emit("chip-click", chip))
      }), null, 16, ["input-chips", "input-value", "aria-controls", "aria-expanded", "aria-activedescendant", "separate-input", "readonly", "disabled", "status", "onUpdate:inputValue", "onFocus", "onBlur", "onKeydown"]),
      createVNode(_component_cdx_menu, mergeProps({
        id: _ctx.menuId,
        ref: "menu",
        selected: _ctx.selectedWrapper,
        "onUpdate:selected": _cache[3] || (_cache[3] = ($event) => _ctx.selectedWrapper = $event),
        expanded: _ctx.expanded,
        "onUpdate:expanded": _cache[4] || (_cache[4] = ($event) => _ctx.expanded = $event),
        "menu-items": _ctx.menuItems
      }, _ctx.menuConfig, {
        onLoadMore: _cache[5] || (_cache[5] = ($event) => _ctx.$emit("load-more"))
      }), {
        default: withCtx(({ menuItem }) => [
          renderSlot(_ctx.$slots, "menu-item", { menuItem })
        ]),
        "no-results": withCtx(() => [
          renderSlot(_ctx.$slots, "no-results")
        ]),
        _: 3
        /* FORWARDED */
      }, 16, ["id", "selected", "expanded", "menu-items"])
    ],
    6
    /* CLASS, STYLE */
  );
}
const MultiselectLookup = /* @__PURE__ */ _export_sfc(_sfc_main$d, [["render", _sfc_render$d]]);
const _sfc_main$c = defineComponent({
  name: "CdxPopover",
  components: { CdxButton, CdxIcon },
  /**
   * The popover will inherit attributes, not the root element.
   */
  inheritAttrs: false,
  props: {
    /**
     * The triggering element that opens and closes the popover. This should be a template ref,
     * which can be either an HTML element or a Vue component.
     *
     * This must be provided so the popover can be positioned relative to the triggering
     * element.
     */
    anchor: {
      type: Object,
      default: null
    },
    /**
     * Whether the popover is visible.
     * Should be provided via a v-model:open binding in the parent scope.
     */
    open: {
      type: Boolean,
      default: false
    },
    /**
     * Title text at the top of the popover.
     */
    title: {
      type: String,
      default: ""
    },
    /**
     * Icon displayed at the start of the popover.
     */
    icon: {
      type: [String, Object],
      default: ""
    },
    /**
     * Add an icon-only close button to the popover header.
     */
    useCloseButton: {
      type: Boolean,
      default: false
    },
    /**
     * Visually-hidden label text for the icon-only close button in the header.
     *
     * Omit this prop to use the default value, "Close".
     */
    closeButtonLabel: {
      type: String,
      default: "Close"
    },
    /**
     * Primary user action. This will display a primary button with the specified action
     * (progressive or destructive).
     */
    primaryAction: {
      type: Object,
      default: null
    },
    /**
     * Default user action. This will display a normal button.
     */
    defaultAction: {
      type: Object,
      default: null
    },
    /**
     * Whether action buttons should be vertically stacked and 100% width.
     */
    stackedActions: {
      type: Boolean,
      default: false
    },
    /**
     * Whether to disable the use of teleport and render the Popover in its
     * original location in the document.
     */
    renderInPlace: {
      type: Boolean,
      default: false
    },
    /**
     * Positioning options for the Popover.
     */
    placement: {
      type: String,
      default: "bottom"
    }
  },
  emits: [
    /**
     * When the open/close state changes, e.g. when the close button is clicked.
     *
     * @property {boolean} newValue The new open/close state (true for open, false for closed)
     */
    "update:open",
    /**
     * When the primary action button is clicked.
     */
    "primary",
    /**
     * When the default action button is clicked.
     */
    "default"
  ],
  setup(props, { emit }) {
    const placementRef = toRef(props, "placement");
    const floating = ref();
    const reference = toRef(props, "anchor");
    const arrowRef = ref();
    const clipPadding2 = 16;
    const minClipWidth = 192;
    const minClipHeight2 = 200;
    const maxClipWidth = 512;
    const sideA = 16;
    const sideB = 16;
    const sideC = Math.sqrt(sideA ** 2 + sideB ** 2);
    const triangleHeight = sideC / 2;
    const arrowOffset = 4;
    const offsetDistance = triangleHeight + arrowOffset;
    const computedMiddleware = computed(() => [
      offset(offsetDistance),
      // Default flip behavior will flip floating element across the main axis.
      flip(),
      size({
        // Spacing between the floating element and the viewport.
        padding: clipPadding2,
        // Apply styles based on available width/height.
        apply({ availableWidth, availableHeight, elements }) {
          const maxWidth = Math.min(maxClipWidth, availableWidth);
          Object.assign(elements.floating.style, {
            // Effective max width is the possible max width down to the min clip width.
            maxWidth: "".concat(Math.max(minClipWidth, maxWidth), "px"),
            maxHeight: "".concat(Math.max(minClipHeight2, availableHeight), "px")
          });
        }
      }),
      arrow({ element: arrowRef })
    ]);
    const {
      floatingStyles,
      middlewareData,
      placement,
      x,
      y
    } = useFloating(reference, floating, {
      whileElementsMounted: autoUpdate,
      placement: placementRef,
      middleware: computedMiddleware
    });
    const arrowStyles = reactive({
      left: "0",
      top: "0",
      right: "0",
      bottom: "0",
      transform: "none"
    });
    const oppositeSide = computed(() => oppositeSides[placement.value]);
    watch([x, y], () => {
      if (middlewareData.value.arrow) {
        const { x: arrowX, y: arrowY } = middlewareData.value.arrow;
        arrowStyles.left = arrowX ? "".concat(arrowX, "px") : "";
        arrowStyles.top = arrowY ? "".concat(arrowY, "px") : "";
        arrowStyles.right = "";
        arrowStyles.bottom = "";
        arrowStyles[oppositeSide.value] = "".concat(-16 / 2 - 1, "px");
        const arrowTransforms = {
          top: "rotate( 45deg )",
          right: "rotate( 135deg )",
          bottom: "rotate( 225deg )",
          left: "rotate( 315deg )"
        };
        arrowStyles.transform = arrowTransforms[oppositeSide.value];
      }
    });
    const providedTarget = inject("CdxTeleportTarget", void 0);
    const computedTarget = computed(() => {
      var _a;
      return (_a = unref(providedTarget)) != null ? _a : "body";
    });
    const translatedCloseButtonLabel = useI18nWithOverride(
      toRef(props, "closeButtonLabel"),
      "cdx-popover-close-button-label",
      "Close"
    );
    const showHeader = computed(() => !!props.title || !!props.icon || props.useCloseButton);
    const showFooter = computed(() => !!props.primaryAction || !!props.defaultAction);
    const footerActionsClasses = computed(() => ({
      "cdx-popover__footer__actions--vertical": props.stackedActions,
      "cdx-popover__footer__actions--horizontal": !props.stackedActions
    }));
    function close() {
      emit("update:open", false);
    }
    function onKeydown(event) {
      if (event.key === "Escape") {
        close();
      }
    }
    function onFocusOut(event) {
      const referenceEl = unwrapElement(reference.value);
      const isOutsidePopoverAndTrigger = (
        // Don't close the popover when the viewport's native scrollbar is clicked (T388302)
        event.target !== document.documentElement && // ...or when the popover or something inside it is clicked
        (floating.value && !floating.value.contains(event.target)) && // ...or when the trigger or something inside it is clicked
        !(referenceEl == null ? void 0 : referenceEl.contains(event.target))
      );
      if (isOutsidePopoverAndTrigger) {
        close();
      }
    }
    watch(() => props.open, (isOpen) => {
      if (isOpen) {
        document.addEventListener("keydown", onKeydown);
        document.addEventListener("mousedown", onFocusOut);
        document.addEventListener("focusin", onFocusOut);
      } else {
        document.removeEventListener("keydown", onKeydown);
        document.removeEventListener("mousedown", onFocusOut);
        document.removeEventListener("focusin", onFocusOut);
      }
    });
    onMounted(() => __async(null, null, function* () {
      if (props.open) {
        document.addEventListener("keydown", onKeydown);
        document.addEventListener("mousedown", onFocusOut);
        document.addEventListener("focusin", onFocusOut);
      }
      yield nextTick();
      if (props.anchor === null) {
        console.warn('[CdxPopover]: The "anchor" prop must be provided to position the CdxPopover.');
      }
    }));
    onUnmounted(() => {
      document.removeEventListener("keydown", onKeydown);
      document.removeEventListener("mousedown", onFocusOut);
      document.removeEventListener("focusin", onFocusOut);
    });
    return {
      computedTarget,
      translatedCloseButtonLabel,
      showHeader,
      showFooter,
      footerActionsClasses,
      close,
      cdxIconClose: v4,
      floating,
      floatingStyles,
      arrowRef,
      arrowStyles
    };
  }
});
const _hoisted_1$c = {
  key: 0,
  class: "cdx-popover__header"
};
const _hoisted_2$7 = {
  key: 1,
  class: "cdx-popover__header__title"
};
const _hoisted_3$5 = { class: "cdx-popover__header__button-wrapper" };
const _hoisted_4$4 = { class: "cdx-popover__body" };
const _hoisted_5$4 = {
  key: 1,
  class: "cdx-popover__footer"
};
function _sfc_render$c(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_cdx_icon = resolveComponent("cdx-icon");
  const _component_cdx_button = resolveComponent("cdx-button");
  return openBlock(), createBlock(Teleport, {
    to: _ctx.computedTarget,
    disabled: _ctx.renderInPlace
  }, [
    _ctx.open ? (openBlock(), createElementBlock(
      "div",
      mergeProps({
        key: 0,
        ref: "floating",
        class: "cdx-popover",
        style: _ctx.floatingStyles
      }, _ctx.$attrs),
      [
        _ctx.showHeader || _ctx.$slots.header ? (openBlock(), createElementBlock("header", _hoisted_1$c, [
          renderSlot(_ctx.$slots, "header", {}, () => [
            _ctx.icon ? (openBlock(), createBlock(_component_cdx_icon, {
              key: 0,
              class: "cdx-popover__header__icon",
              icon: _ctx.icon
            }, null, 8, ["icon"])) : createCommentVNode("v-if", true),
            _ctx.title ? (openBlock(), createElementBlock(
              "div",
              _hoisted_2$7,
              toDisplayString(_ctx.title),
              1
              /* TEXT */
            )) : createCommentVNode("v-if", true),
            createElementVNode("div", _hoisted_3$5, [
              _ctx.useCloseButton ? (openBlock(), createBlock(_component_cdx_button, {
                key: 0,
                class: "cdx-popover__header__close-button",
                weight: "quiet",
                type: "button",
                "aria-label": _ctx.translatedCloseButtonLabel,
                onClick: _ctx.close
              }, {
                default: withCtx(() => [
                  createVNode(_component_cdx_icon, { icon: _ctx.cdxIconClose }, null, 8, ["icon"])
                ]),
                _: 1
                /* STABLE */
              }, 8, ["aria-label", "onClick"])) : createCommentVNode("v-if", true)
            ])
          ])
        ])) : createCommentVNode("v-if", true),
        createElementVNode("div", _hoisted_4$4, [
          renderSlot(_ctx.$slots, "default")
        ]),
        _ctx.showFooter || _ctx.$slots.footer ? (openBlock(), createElementBlock("footer", _hoisted_5$4, [
          renderSlot(_ctx.$slots, "footer", {}, () => [
            createElementVNode(
              "div",
              {
                class: normalizeClass(["cdx-popover__footer__actions", _ctx.footerActionsClasses])
              },
              [
                _ctx.primaryAction ? (openBlock(), createBlock(_component_cdx_button, {
                  key: 0,
                  class: "cdx-popover__footer__primary-action",
                  weight: "primary",
                  action: _ctx.primaryAction.actionType,
                  disabled: _ctx.primaryAction.disabled,
                  onClick: _cache[0] || (_cache[0] = ($event) => _ctx.$emit("primary"))
                }, {
                  default: withCtx(() => [
                    createTextVNode(
                      toDisplayString(_ctx.primaryAction.label),
                      1
                      /* TEXT */
                    )
                  ]),
                  _: 1
                  /* STABLE */
                }, 8, ["action", "disabled"])) : createCommentVNode("v-if", true),
                _ctx.defaultAction ? (openBlock(), createBlock(_component_cdx_button, {
                  key: 1,
                  class: "cdx-popover__footer__default-action",
                  disabled: _ctx.defaultAction.disabled,
                  onClick: _cache[1] || (_cache[1] = ($event) => _ctx.$emit("default"))
                }, {
                  default: withCtx(() => [
                    createTextVNode(
                      toDisplayString(_ctx.defaultAction.label),
                      1
                      /* TEXT */
                    )
                  ]),
                  _: 1
                  /* STABLE */
                }, 8, ["disabled"])) : createCommentVNode("v-if", true)
              ],
              2
              /* CLASS */
            )
          ])
        ])) : createCommentVNode("v-if", true),
        createElementVNode(
          "div",
          {
            ref: "arrowRef",
            class: "cdx-popover__arrow",
            style: normalizeStyle(_ctx.arrowStyles)
          },
          null,
          4
          /* STYLE */
        )
      ],
      16
      /* FULL_PROPS */
    )) : createCommentVNode("v-if", true)
  ], 8, ["to", "disabled"]);
}
const Popover = /* @__PURE__ */ _export_sfc(_sfc_main$c, [["render", _sfc_render$c]]);
const _sfc_main$b = defineComponent({
  name: "CdxProgressIndicator",
  components: { CdxLabel },
  /**
   * The `<progress>` element will inherit attributes, not the root element.
   */
  inheritAttrs: false,
  props: {
    /**
     * Whether the label should be visible.
     *
     * This will show or hide the text carrying `<span>` element next to the progress indicator.
     */
    showLabel: {
      type: Boolean,
      default: false
    }
  },
  setup(props, { slots, attrs }) {
    var _a;
    useLabelChecker((_a = slots.default) == null ? void 0 : _a.call(slots), attrs, "CdxProgressIndicator");
    const internalClasses = computed(() => ({
      "cdx-progress-indicator--has-label-visible": props.showLabel
    }));
    const {
      rootClasses,
      rootStyle,
      otherAttrs
    } = useSplitAttributes(attrs, internalClasses);
    const progressIndicatorId = useId();
    return {
      rootClasses,
      rootStyle,
      progressIndicatorId,
      otherAttrs
    };
  }
});
const _hoisted_1$b = { class: "cdx-progress-indicator__indicator" };
const _hoisted_2$6 = ["id"];
function _sfc_render$b(_ctx, _cache, $props, $setup, $data, $options) {
  var _a, _b;
  const _component_cdx_label = resolveComponent("cdx-label");
  return openBlock(), createElementBlock(
    "div",
    {
      class: normalizeClass(["cdx-progress-indicator", _ctx.rootClasses]),
      style: normalizeStyle(_ctx.rootStyle)
    },
    [
      createElementVNode("span", _hoisted_1$b, [
        createElementVNode("progress", mergeProps({
          id: _ctx.progressIndicatorId,
          class: "cdx-progress-indicator__indicator__progress"
        }, _ctx.otherAttrs), null, 16, _hoisted_2$6)
      ]),
      Boolean((_b = (_a = _ctx.$slots).default) == null ? void 0 : _b.call(_a, {})) ? (openBlock(), createBlock(_component_cdx_label, {
        key: 0,
        class: "cdx-progress-indicator__label",
        "input-id": _ctx.progressIndicatorId,
        "visually-hidden": !_ctx.showLabel
      }, {
        default: withCtx(() => [
          renderSlot(_ctx.$slots, "default")
        ]),
        _: 3
        /* FORWARDED */
      }, 8, ["input-id", "visually-hidden"])) : createCommentVNode("v-if", true)
    ],
    6
    /* CLASS, STYLE */
  );
}
const ProgressIndicator = /* @__PURE__ */ _export_sfc(_sfc_main$b, [["render", _sfc_render$b]]);
const statusValidator$3 = makeStringTypeValidator(ValidationStatusTypes);
const _sfc_main$a = defineComponent({
  name: "CdxRadio",
  components: { CdxLabel },
  props: {
    /**
     * Value of the currently selected radio.
     *
     * Provided by `v-model` binding in the parent component.
     */
    modelValue: {
      type: [String, Number, Boolean],
      default: ""
    },
    /**
     * HTML "value" attribute to assign to the input.
     *
     * Required for input groups.
     */
    inputValue: {
      type: [String, Number, Boolean],
      default: false
    },
    /**
     * HTML "name" attribute to assign to the input.
     */
    name: {
      type: String,
      required: true
    },
    /**
     * Whether the disabled attribute should be added to the input.
     */
    disabled: {
      type: Boolean,
      default: false
    },
    /**
     * Whether the component should display inline.
     *
     * By default, `display: block` is set and a margin exists between
     * sibling components, for a stacked layout.
     */
    inline: {
      type: Boolean,
      default: false
    },
    /**
     * Validation status of the Radio.
     */
    status: {
      type: String,
      default: "default",
      validator: statusValidator$3
    }
  },
  emits: [
    /**
     * Emitted when modelValue changes.
     *
     * @property {string | number | boolean} modelValue The new model value
     */
    "update:modelValue"
  ],
  setup(props, { emit, slots, attrs }) {
    var _a;
    useLabelChecker((_a = slots.default) == null ? void 0 : _a.call(slots), attrs, "CdxRadio");
    const {
      computedDisabled,
      computedStatus
    } = useFieldData(
      toRef(props, "disabled"),
      toRef(props, "status")
    );
    const rootClasses = computed(() => ({
      "cdx-radio--inline": props.inline,
      ["cdx-radio--status-".concat(computedStatus.value)]: true
    }));
    const customInputClasses = computed(() => ({
      "cdx-radio__custom-input--inline": props.inline
    }));
    const input = ref();
    const radioId = useId();
    const descriptionId = useId();
    const focusInput = () => {
      input.value.focus();
    };
    const wrappedModel = useModelWrapper(toRef(props, "modelValue"), emit);
    return {
      rootClasses,
      computedDisabled,
      input,
      radioId,
      descriptionId,
      focusInput,
      wrappedModel,
      customInputClasses
    };
  }
});
const _hoisted_1$a = { class: "cdx-radio__wrapper" };
const _hoisted_2$5 = ["id", "aria-describedby", "name", "value", "disabled"];
function _sfc_render$a(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_cdx_label = resolveComponent("cdx-label");
  return openBlock(), createElementBlock(
    "div",
    {
      class: normalizeClass(["cdx-radio", _ctx.rootClasses])
    },
    [
      createElementVNode("div", _hoisted_1$a, [
        withDirectives(createElementVNode("input", {
          id: _ctx.radioId,
          ref: "input",
          "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => _ctx.wrappedModel = $event),
          class: "cdx-radio__input",
          type: "radio",
          "aria-describedby": _ctx.$slots.description && _ctx.$slots.description().length > 0 ? _ctx.descriptionId : void 0,
          name: _ctx.name,
          value: _ctx.inputValue,
          disabled: _ctx.computedDisabled
        }, null, 8, _hoisted_2$5), [
          [vModelRadio, _ctx.wrappedModel]
        ]),
        _cache[1] || (_cache[1] = createElementVNode(
          "span",
          { class: "cdx-radio__icon" },
          null,
          -1
          /* CACHED */
        )),
        _ctx.$slots.default && _ctx.$slots.default().length ? (openBlock(), createBlock(_component_cdx_label, {
          key: 0,
          class: "cdx-radio__label",
          "input-id": _ctx.radioId,
          "description-id": _ctx.$slots.description && _ctx.$slots.description().length > 0 ? _ctx.descriptionId : void 0,
          disabled: _ctx.computedDisabled,
          onClick: _ctx.focusInput
        }, createSlots({
          default: withCtx(() => [
            renderSlot(_ctx.$slots, "default")
          ]),
          _: 2
          /* DYNAMIC */
        }, [
          _ctx.$slots.description && _ctx.$slots.description().length > 0 ? {
            name: "description",
            fn: withCtx(() => [
              renderSlot(_ctx.$slots, "description")
            ]),
            key: "0"
          } : void 0
        ]), 1032, ["input-id", "description-id", "disabled", "onClick"])) : createCommentVNode("v-if", true)
      ]),
      _ctx.$slots["custom-input"] ? (openBlock(), createElementBlock(
        "div",
        {
          key: 0,
          class: normalizeClass(["cdx-radio__custom-input", _ctx.customInputClasses])
        },
        [
          renderSlot(_ctx.$slots, "custom-input")
        ],
        2
        /* CLASS */
      )) : createCommentVNode("v-if", true)
    ],
    2
    /* CLASS */
  );
}
const Radio = /* @__PURE__ */ _export_sfc(_sfc_main$a, [["render", _sfc_render$a]]);
const statusValidator$2 = makeStringTypeValidator(ValidationStatusTypes);
const _sfc_main$9 = defineComponent({
  name: "CdxSearchInput",
  components: {
    CdxButton,
    CdxTextInput
  },
  /**
   * Attributes, besides class, will be passed to the TextInput's input element.
   */
  inheritAttrs: false,
  props: {
    /**
     * Value of the search input, provided by `v-model` binding in the parent component.
     */
    modelValue: {
      type: [String, Number],
      default: ""
    },
    /**
     * Whether to display the search button.
     */
    useButton: {
      type: Boolean,
      default: false
    },
    /**
     * Whether to hide the start icon.
     */
    hideIcon: {
      type: Boolean,
      default: false
    },
    /**
     * `clearable` property of the TextInput component
     */
    clearable: {
      type: Boolean,
      default: false
    },
    // DEPRECATED: set default to 'Search' and remove validator (T368444).
    /**
     * Search button text.
     *
     * Omit this prop to use the default value, "Search".
     */
    buttonLabel: {
      type: String,
      default: "",
      validator: (value, props) => {
        if (value.length > 0 && !props.useButton) {
          console.warn(
            "[CdxSearchInput]: The boolean `useButton` prop is required to show the search button.\n\nRefer to https://doc.wikimedia.org/codex/latest/components/demos/search-input.html#props."
          );
          return false;
        }
        return true;
      }
    },
    /**
     * Whether the search input is disabled.
     */
    disabled: {
      type: Boolean,
      default: false
    },
    /**
     * `status` property of the TextInput component
     */
    status: {
      type: String,
      default: "default",
      validator: statusValidator$2
    }
  },
  emits: [
    /**
     * When the input value changes
     *
     * @property {string | number} value The new value
     */
    "update:modelValue",
    /**
     * When the submit button is clicked.
     *
     * @property {string | number} value The current input
     */
    "submit-click",
    /**
     * When the input value changes via direct use of the input
     *
     * @property {InputEvent} event
     */
    "input",
    /**
     * When an input value change is committed by the user (e.g. on blur)
     *
     * @property {Event} event
     */
    "change",
    /**
     * When the input comes into focus
     *
     * @property {FocusEvent} event
     */
    "focus",
    /**
     * When the input loses focus
     *
     * @property {FocusEvent} event
     */
    "blur"
  ],
  setup(props, { emit, attrs }) {
    const wrappedModel = useModelWrapper(toRef(props, "modelValue"), emit);
    const { computedDisabled } = useFieldData(toRef(props, "disabled"));
    const internalClasses = computed(() => ({
      "cdx-search-input--has-end-button": !!props.buttonLabel || props.useButton
    }));
    const {
      rootClasses,
      rootStyle,
      otherAttrs
    } = useSplitAttributes(attrs, internalClasses);
    const translatedSearchButtonLabel = useI18nWithOverride(
      toRef(props, "buttonLabel"),
      "cdx-search-input-search-button-label",
      // Allow custom button label via props or fallback to a default English string.
      "Search"
    );
    const useButtonOrLabel = computed(
      () => props.useButton || props.buttonLabel.length > 0
    );
    const handleSubmit = () => {
      emit("submit-click", wrappedModel.value);
    };
    return {
      wrappedModel,
      computedDisabled,
      rootClasses,
      rootStyle,
      otherAttrs,
      handleSubmit,
      searchIcon: U7,
      translatedSearchButtonLabel,
      useButtonOrLabel
    };
  },
  methods: {
    /**
     * Focus the component's input element.
     *
     * @public
     */
    focus() {
      const textInput = this.$refs.textInput;
      textInput.focus();
    }
  }
});
const _hoisted_1$9 = { class: "cdx-search-input__input-wrapper" };
function _sfc_render$9(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_cdx_text_input = resolveComponent("cdx-text-input");
  const _component_cdx_button = resolveComponent("cdx-button");
  return openBlock(), createElementBlock(
    "div",
    {
      class: normalizeClass(["cdx-search-input", _ctx.rootClasses]),
      style: normalizeStyle(_ctx.rootStyle)
    },
    [
      createElementVNode("div", _hoisted_1$9, [
        createVNode(_component_cdx_text_input, mergeProps({
          ref: "textInput",
          modelValue: _ctx.wrappedModel,
          "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => _ctx.wrappedModel = $event),
          class: "cdx-search-input__text-input",
          "input-type": "search",
          "start-icon": _ctx.hideIcon ? void 0 : _ctx.searchIcon,
          clearable: _ctx.clearable,
          disabled: _ctx.computedDisabled,
          status: _ctx.status
        }, _ctx.otherAttrs, {
          onKeydown: withKeys(_ctx.handleSubmit, ["enter"]),
          onInput: _cache[1] || (_cache[1] = ($event) => _ctx.$emit("input", $event)),
          onChange: _cache[2] || (_cache[2] = ($event) => _ctx.$emit("change", $event)),
          onFocus: _cache[3] || (_cache[3] = ($event) => _ctx.$emit("focus", $event)),
          onBlur: _cache[4] || (_cache[4] = ($event) => _ctx.$emit("blur", $event))
        }), null, 16, ["modelValue", "start-icon", "clearable", "disabled", "status", "onKeydown"]),
        renderSlot(_ctx.$slots, "default")
      ]),
      _ctx.useButtonOrLabel ? (openBlock(), createBlock(_component_cdx_button, {
        key: 0,
        class: "cdx-search-input__end-button",
        disabled: _ctx.computedDisabled,
        onClick: _ctx.handleSubmit
      }, {
        default: withCtx(() => [
          createTextVNode(
            toDisplayString(_ctx.translatedSearchButtonLabel),
            1
            /* TEXT */
          )
        ]),
        _: 1
        /* STABLE */
      }, 8, ["disabled", "onClick"])) : createCommentVNode("v-if", true)
    ],
    6
    /* CLASS, STYLE */
  );
}
const CdxSearchInput = /* @__PURE__ */ _export_sfc(_sfc_main$9, [["render", _sfc_render$9]]);
const statusValidator$1 = makeStringTypeValidator(ValidationStatusTypes);
const _sfc_main$8 = defineComponent({
  name: "CdxSelect",
  components: {
    CdxIcon,
    CdxMenu
  },
  /**
   * We want the select handle to inherit attributes, not the root element.
   */
  inheritAttrs: false,
  props: {
    /**
     * Menu items and/or menu group definitions.
     *
     * Menu groups and individual menu items will be output in the order they appear here.
     */
    menuItems: {
      type: Array,
      required: true
    },
    /**
     * Value of the current selection.
     *
     * Must be bound with `v-model:selected`.
     *
     * The property should be initialized to `null` rather than using a falsy value.
     */
    selected: {
      type: [String, Number, null],
      required: true
    },
    /**
     * Label to display when no selection has been made.
     */
    defaultLabel: {
      type: String,
      default: ""
    },
    /**
     * Name of the input, used for forms.
     */
    name: {
      type: String,
      default: void 0
    },
    /**
     * Whether the dropdown is disabled.
     */
    disabled: {
      type: Boolean,
      default: false
    },
    /**
     * Configuration for various menu features. All properties default to false.
     *
     * See the MenuConfig type.
     *
     * @default {}
     */
    menuConfig: {
      type: Object,
      default: () => ({})
    },
    /**
     * An icon at the start of the select element
     * displayed when no selection has been made.
     */
    defaultIcon: {
      type: [String, Object],
      default: void 0
    },
    /**
     * `status` attribute of the input.
     */
    status: {
      type: String,
      default: "default",
      validator: statusValidator$1
    }
  },
  emits: [
    /**
     * When the selection value changes.
     *
     * @property {string | number | null} modelValue The new model value
     */
    "update:selected",
    /**
     * When the user scrolls towards the bottom of the menu.
     *
     * If it is possible to add or load more menu items, then now would be a good moment
     * so that the user can experience infinite scrolling.
     */
    "load-more"
  ],
  setup(props, { emit, attrs }) {
    const handle = ref();
    const menu = ref();
    const descriptionId = inject(FieldDescriptionIdKey, void 0);
    const menuId = useId();
    const expanded = ref(false);
    const handleId = attrs.id || useId();
    const {
      computedDisabled,
      computedStatus,
      computedInputId: computedHandleId
    } = useFieldData(
      toRef(props, "disabled"),
      toRef(props, "status"),
      handleId
    );
    const modelWrapper = useModelWrapper(toRef(props, "selected"), emit, "update:selected");
    const selectedMenuItem = computed(
      () => {
        var _a;
        return (_a = menu.value) == null ? void 0 : _a.getComputedMenuItems().find(
          (menuItem) => menuItem.value === props.selected
        );
      }
    );
    const currentLabel = computed(() => {
      var _a;
      return selectedMenuItem.value ? (_a = selectedMenuItem.value.label) != null ? _a : selectedMenuItem.value.value : props.defaultLabel;
    });
    const startIcon = computed(() => {
      var _a;
      if (props.defaultIcon && !selectedMenuItem.value) {
        return props.defaultIcon;
      } else if ((_a = selectedMenuItem.value) == null ? void 0 : _a.icon) {
        return selectedMenuItem.value.icon;
      }
      return void 0;
    });
    const internalClasses = computed(() => ({
      "cdx-select-vue--enabled": !computedDisabled.value,
      "cdx-select-vue--disabled": computedDisabled.value,
      "cdx-select-vue--expanded": expanded.value,
      "cdx-select-vue--value-selected": !!selectedMenuItem.value,
      "cdx-select-vue--no-selections": !selectedMenuItem.value,
      "cdx-select-vue--has-start-icon": !!startIcon.value,
      ["cdx-select-vue--status-".concat(computedStatus.value)]: true
    }));
    const {
      rootClasses,
      rootStyle,
      otherAttrs
    } = useSplitAttributes(attrs, internalClasses);
    const otherAttrsMinusId = computed(() => {
      const _a = otherAttrs.value, { id } = _a, everythingElse = __objRest(_a, ["id"]);
      return everythingElse;
    });
    const highlightedId = computed(() => {
      var _a, _b;
      return (_b = (_a = menu.value) == null ? void 0 : _a.getHighlightedMenuItem()) == null ? void 0 : _b.id;
    });
    function onBlur() {
      expanded.value = false;
    }
    function onClick() {
      var _a;
      if (computedDisabled.value) {
        return;
      }
      expanded.value = !expanded.value;
      (_a = handle.value) == null ? void 0 : _a.focus();
    }
    function onKeydown(e) {
      var _a;
      if (computedDisabled.value) {
        return;
      }
      (_a = menu.value) == null ? void 0 : _a.delegateKeyNavigation(e, { characterNavigation: true });
    }
    useFloatingMenu(handle, menu);
    return {
      handle,
      menu,
      computedHandleId,
      descriptionId,
      menuId,
      modelWrapper,
      selectedMenuItem,
      highlightedId,
      expanded,
      computedDisabled,
      onBlur,
      currentLabel,
      rootClasses,
      rootStyle,
      otherAttrsMinusId,
      onClick,
      onKeydown,
      startIcon,
      cdxIconExpand: y4
    };
  }
});
const _hoisted_1$8 = ["aria-disabled"];
const _hoisted_2$4 = ["id", "aria-controls", "aria-activedescendant", "aria-expanded", "aria-describedby"];
const _hoisted_3$4 = ["name", "value"];
function _sfc_render$8(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_cdx_icon = resolveComponent("cdx-icon");
  const _component_cdx_menu = resolveComponent("cdx-menu");
  return openBlock(), createElementBlock("div", {
    class: normalizeClass(["cdx-select-vue", _ctx.rootClasses]),
    style: normalizeStyle(_ctx.rootStyle),
    "aria-disabled": _ctx.computedDisabled
  }, [
    createElementVNode("div", mergeProps({
      id: _ctx.computedHandleId,
      ref: "handle",
      class: "cdx-select-vue__handle"
    }, _ctx.otherAttrsMinusId, {
      tabindex: "0",
      role: "combobox",
      "aria-controls": _ctx.menuId,
      "aria-activedescendant": _ctx.highlightedId,
      "aria-expanded": _ctx.expanded,
      "aria-describedby": _ctx.descriptionId,
      onClick: _cache[0] || (_cache[0] = (...args) => _ctx.onClick && _ctx.onClick(...args)),
      onBlur: _cache[1] || (_cache[1] = (...args) => _ctx.onBlur && _ctx.onBlur(...args)),
      onKeydown: _cache[2] || (_cache[2] = (...args) => _ctx.onKeydown && _ctx.onKeydown(...args))
    }), [
      renderSlot(_ctx.$slots, "label", {
        selectedMenuItem: _ctx.selectedMenuItem,
        defaultLabel: _ctx.defaultLabel
      }, () => [
        createTextVNode(
          toDisplayString(_ctx.currentLabel),
          1
          /* TEXT */
        )
      ]),
      _ctx.startIcon ? (openBlock(), createBlock(_component_cdx_icon, {
        key: 0,
        icon: _ctx.startIcon,
        class: "cdx-select-vue__start-icon"
      }, null, 8, ["icon"])) : createCommentVNode("v-if", true),
      createVNode(_component_cdx_icon, {
        icon: _ctx.cdxIconExpand,
        class: "cdx-select-vue__indicator"
      }, null, 8, ["icon"])
    ], 16, _hoisted_2$4),
    createVNode(_component_cdx_menu, mergeProps({
      id: _ctx.menuId,
      ref: "menu",
      selected: _ctx.modelWrapper,
      "onUpdate:selected": _cache[3] || (_cache[3] = ($event) => _ctx.modelWrapper = $event),
      expanded: _ctx.expanded,
      "onUpdate:expanded": _cache[4] || (_cache[4] = ($event) => _ctx.expanded = $event),
      "menu-items": _ctx.menuItems
    }, _ctx.menuConfig, {
      onLoadMore: _cache[5] || (_cache[5] = ($event) => _ctx.$emit("load-more"))
    }), {
      default: withCtx(({ menuItem }) => [
        renderSlot(_ctx.$slots, "menu-item", { menuItem })
      ]),
      _: 3
      /* FORWARDED */
    }, 16, ["id", "selected", "expanded", "menu-items"]),
    _ctx.name ? (openBlock(), createElementBlock("input", {
      key: 0,
      type: "hidden",
      name: _ctx.name,
      value: _ctx.selected
    }, null, 8, _hoisted_3$4)) : createCommentVNode("v-if", true)
  ], 14, _hoisted_1$8);
}
const CdxSelect = /* @__PURE__ */ _export_sfc(_sfc_main$8, [["render", _sfc_render$8]]);
const _sfc_main$7 = defineComponent({
  name: "CdxTablePager",
  components: { CdxButton, CdxIcon, CdxSelect },
  props: {
    paginationSizeOptions: {
      type: Array,
      required: true
    },
    itemsPerPage: {
      type: Number,
      required: true
    },
    nextDisabled: {
      type: Boolean,
      default: false
    },
    prevDisabled: {
      type: Boolean,
      default: false
    },
    lastDisabled: {
      type: Boolean,
      default: false
    }
  },
  emits: [
    /**
     * When the items per page option changes
     *
     * @property {number} itemsPerPage the number of items to display
     */
    "update:itemsPerPage",
    /**
     * Emitted when the user requests the first page of data
     */
    "first",
    /**
     * Emitted when the user requests the last page of data
     */
    "last",
    /**
     * Emitted when the user requests the next page of data
     */
    "next",
    /**
     * Emitted when the user requests the previous page of data
     */
    "prev"
  ],
  setup(props, { emit }) {
    const wrappedItemsPerPage = useModelWrapper(
      toRef(props, "itemsPerPage"),
      emit,
      "update:itemsPerPage"
    );
    const defaultItemsPerPageLabel = useI18n(
      "cdx-table-pager-items-per-page-default",
      "Results per page"
    );
    const currentItemsPerPageLabel = useI18n(
      "cdx-table-pager-items-per-page-current",
      (current) => "".concat(current, " rows"),
      [wrappedItemsPerPage]
    );
    const btnLabelFirst = useI18n(
      "cdx-table-pager-button-first-page",
      "First page"
    );
    const btnLabelNext = useI18n(
      "cdx-table-pager-button-next-page",
      "Next page"
    );
    const btnLabelPrev = useI18n(
      "cdx-table-pager-button-prev-page",
      "Previous page"
    );
    const btnLabelLast = useI18n(
      "cdx-table-pager-button-last-page",
      "Last page"
    );
    return {
      defaultItemsPerPageLabel,
      currentItemsPerPageLabel,
      btnLabelFirst,
      btnLabelNext,
      btnLabelPrev,
      btnLabelLast,
      wrappedItemsPerPage,
      cdxIconPrevious: L7,
      cdxIconNext: e7,
      cdxIconMoveFirst: t7,
      cdxIconMoveLast: h7
    };
  }
});
const _hoisted_1$7 = { class: "cdx-table-pager" };
const _hoisted_2$3 = { class: "cdx-table-pager__start" };
const _hoisted_3$3 = { key: 0 };
const _hoisted_4$3 = { key: 1 };
const _hoisted_5$3 = { class: "cdx-table-pager__center" };
const _hoisted_6$3 = { class: "cdx-table-pager__end" };
function _sfc_render$7(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_cdx_select = resolveComponent("cdx-select");
  const _component_cdx_icon = resolveComponent("cdx-icon");
  const _component_cdx_button = resolveComponent("cdx-button");
  return openBlock(), createElementBlock("div", _hoisted_1$7, [
    createElementVNode("div", _hoisted_2$3, [
      createVNode(_component_cdx_select, {
        selected: _ctx.wrappedItemsPerPage,
        "onUpdate:selected": _cache[0] || (_cache[0] = ($event) => _ctx.wrappedItemsPerPage = $event),
        "default-label": _ctx.defaultItemsPerPageLabel,
        "menu-items": _ctx.paginationSizeOptions
      }, {
        label: withCtx(({ selectedMenuItem, defaultLabel }) => [
          selectedMenuItem ? (openBlock(), createElementBlock("span", _hoisted_3$3, [
            createElementVNode(
              "span",
              null,
              toDisplayString(_ctx.currentItemsPerPageLabel),
              1
              /* TEXT */
            )
          ])) : (openBlock(), createElementBlock(
            "span",
            _hoisted_4$3,
            toDisplayString(defaultLabel),
            1
            /* TEXT */
          ))
        ]),
        _: 1
        /* STABLE */
      }, 8, ["selected", "default-label", "menu-items"])
    ]),
    createElementVNode("div", _hoisted_5$3, [
      renderSlot(_ctx.$slots, "default")
    ]),
    createElementVNode("div", _hoisted_6$3, [
      createVNode(_component_cdx_button, {
        disabled: _ctx.prevDisabled,
        class: "cdx-table-pager__button-first",
        weight: "quiet",
        "aria-label": _ctx.btnLabelFirst,
        onClick: _cache[1] || (_cache[1] = ($event) => _ctx.$emit("first"))
      }, {
        default: withCtx(() => [
          createVNode(_component_cdx_icon, { icon: _ctx.cdxIconMoveFirst }, null, 8, ["icon"])
        ]),
        _: 1
        /* STABLE */
      }, 8, ["disabled", "aria-label"]),
      createVNode(_component_cdx_button, {
        disabled: _ctx.prevDisabled,
        class: "cdx-table-pager__button-prev",
        weight: "quiet",
        "aria-label": _ctx.btnLabelPrev,
        onClick: _cache[2] || (_cache[2] = ($event) => _ctx.$emit("prev"))
      }, {
        default: withCtx(() => [
          createVNode(_component_cdx_icon, { icon: _ctx.cdxIconPrevious }, null, 8, ["icon"])
        ]),
        _: 1
        /* STABLE */
      }, 8, ["disabled", "aria-label"]),
      createVNode(_component_cdx_button, {
        disabled: _ctx.nextDisabled,
        class: "cdx-table-pager__button-next",
        weight: "quiet",
        "aria-label": _ctx.btnLabelNext,
        onClick: _cache[3] || (_cache[3] = ($event) => _ctx.$emit("next"))
      }, {
        default: withCtx(() => [
          createVNode(_component_cdx_icon, { icon: _ctx.cdxIconNext }, null, 8, ["icon"])
        ]),
        _: 1
        /* STABLE */
      }, 8, ["disabled", "aria-label"]),
      createVNode(_component_cdx_button, {
        disabled: _ctx.nextDisabled || _ctx.lastDisabled,
        class: "cdx-table-pager__button-last",
        weight: "quiet",
        "aria-label": _ctx.btnLabelLast,
        onClick: _cache[4] || (_cache[4] = ($event) => _ctx.$emit("last"))
      }, {
        default: withCtx(() => [
          createVNode(_component_cdx_icon, { icon: _ctx.cdxIconMoveLast }, null, 8, ["icon"])
        ]),
        _: 1
        /* STABLE */
      }, 8, ["disabled", "aria-label"])
    ])
  ]);
}
const CdxTablePager = /* @__PURE__ */ _export_sfc(_sfc_main$7, [["render", _sfc_render$7]]);
const tableTextAlignmentsValidator = makeStringTypeValidator(TableTextAlignments);
const paginationPositionValidator = makeStringTypeValidator(TablePaginationPositions);
const iconMap = {
  none: K7,
  asc: w8,
  desc: g4
};
const sortDirectionMap = {
  none: "none",
  asc: "ascending",
  desc: "descending"
};
const _sfc_main$6 = defineComponent({
  name: "CdxTable",
  components: {
    CdxCheckbox,
    CdxIcon,
    CdxTablePager,
    CdxProgressBar
  },
  props: {
    /**
     * Table caption.
     *
     * Required to support users of assistive technology, but can be visually hidden.
     */
    caption: {
      type: String,
      required: true
    },
    /**
     * Whether to visually hide the caption.
     */
    hideCaption: {
      type: Boolean,
      default: false
    },
    /**
     * Column definitions.
     *
     * @default []
     */
    columns: {
      type: Array,
      default: () => [],
      validator: (value) => {
        const ids = value.map((column) => column.id);
        const hasUniqueIds = new Set(ids).size === ids.length;
        if (!hasUniqueIds) {
          console.warn(
            '[CdxTable]: Each column in the "columns" prop must have a unique "id".'
          );
          return false;
        }
        return true;
      }
    },
    /**
     * Table data.
     *
     * An array of objects, with each object representing the data for a table row. Item keys
     * should align with column IDs, as defined in the `columns` prop.
     *
     * @default []
     */
    data: {
      type: Array,
      default: () => [],
      validator: (value, props) => {
        if (!Array.isArray(props.columns) || props.columns.length === 0 || value.length === 0) {
          return true;
        }
        const hasSort = props.columns.some((column) => "allowSort" in column);
        const rowsHaveIds = value.every((row) => TableRowIdentifier in row);
        if (hasSort && props.useRowSelection && !rowsHaveIds) {
          console.warn(
            '[CdxTable]: With sorting and row selection, each row in the "data" prop must have a "TableRowIdentifier".'
          );
          return false;
        }
        return true;
      }
    },
    /**
     * Whether to use `<th>` for the first cell in each row.
     */
    useRowHeaders: {
      type: Boolean,
      default: false
    },
    /**
     * Whether vertical borders separating columns should be rendered.
     */
    showVerticalBorders: {
      type: Boolean,
      default: false
    },
    /**
     * Whether to enable row selection.
     */
    useRowSelection: {
      type: Boolean,
      default: false
    },
    /**
     * An array of selected row indices. Must be bound with `v-model:selected-rows`.
     *
     * If sorting is also enabled, this will be an array of TableRowIdentifiers.
     *
     * @default []
     */
    selectedRows: {
      type: Array,
      default: () => []
    },
    /**
     * Definition of sort order. Column(s) can be sorted ascending, descending, or not sorted.
     * To display data unsorted initially, set to an empty object initially.
     * Must be bound with v-model:sort
     *
     * @default {}
     */
    sort: {
      type: Object,
      default: () => ({})
    },
    /**
     * Whether the table is waiting for data to be fetched.
     */
    pending: {
      type: Boolean,
      default: false
    },
    /**
     * Whether to enable pagination.
     */
    paginate: {
      type: Boolean,
      default: false
    },
    /**
     * Whether the table is paginating through remote data. Setting this to
     * "true" will cause the table to emit events indicating that more data
     * should be loaded when the user navigates between pages.
     */
    serverPagination: {
      type: Boolean,
      default: false
    },
    /**
     * The total number of rows/results available on the server that the
     * user can access via pagination. Providing this value will make for
     * a better user experience when navigating through pages of remote
     * data, but it is not required.
     */
    totalRows: {
      type: Number,
      default: NaN
    },
    /**
     * Where the pagination controls should appear relative to the table body.
     */
    paginationPosition: {
      type: String,
      default: "bottom",
      validator: paginationPositionValidator
    },
    /**
     * Pre-defined options for how may rows should be displayed per page.
     * The value of these menu items must be a number.
     *
     * @default [ { value: 10 }, { value: 20 }, { value: 50 } ]
     */
    paginationSizeOptions: {
      type: Array,
      default: () => [
        { value: 10 },
        { value: 20 },
        { value: 50 }
      ],
      validator: (value) => {
        const hasNumberValue = (item) => typeof item.value === "number";
        if (value.every(hasNumberValue)) {
          return true;
        } else {
          console.warn('[CdxTable]: "value" property of all menu items in PaginationOptions must be a number.');
          return false;
        }
      }
    },
    /**
     * The default number of rows to show per page. For basic pagination,
     * this will default to the value of the first of the pagination options
     * if not provided. For server-side pagination, this will default to
     * the initial number of rows if no default is provided.
     *
     * @default paginationSizeOptions[ 0 ].value
     */
    paginationSizeDefault: {
      type: Number,
      default: (rawProps) => {
        if (rawProps.paginate && rawProps.serverPagination) {
          return rawProps.data.length;
        } else {
          return rawProps.paginationSizeOptions[0].value;
        }
      }
    }
  },
  emits: [
    /**
     * When the selected row(s) changes.
     *
     * @property {string[]} selectedRows The new selected rows.
     */
    "update:selectedRows",
    /**
     * When the sort order changes emit an event to update the sort order.
     *
     * @property {Object} sort The new sort order.
     */
    "update:sort",
    /**
     * When the user requests another page of data from the server.
     *
     * @property {number} offset Index of the first visible row on the new page.
     * @property {number} rows Number of rows to display.
     */
    "load-more"
  ],
  setup(props, { emit }) {
    const offset2 = ref(0);
    const pageSize = ref(props.paginationSizeDefault);
    const dataForDisplay = computed(() => {
      if (props.serverPagination && props.paginate) {
        return props.data;
      } else if (props.paginate) {
        return props.data.slice(offset2.value, pageSize.value + offset2.value);
      } else {
        return props.data;
      }
    });
    const totalCount = computed(() => {
      var _a;
      if (props.serverPagination) {
        return (_a = props.totalRows) != null ? _a : NaN;
      } else {
        return props.data.length;
      }
    });
    const indeterminate = computed(() => isNaN(totalCount.value));
    const currentCount = computed(() => dataForDisplay.value.length);
    const firstOrdinal = computed(() => offset2.value + 1);
    const lastOrdinal = computed(() => offset2.value + currentCount.value);
    const lastDisabled = computed(() => indeterminate.value);
    const prevDisabled = computed(() => offset2.value <= 0);
    const nextDisabled = computed(() => {
      if (indeterminate.value) {
        return currentCount.value < pageSize.value;
      } else {
        return offset2.value + pageSize.value >= totalCount.value;
      }
    });
    const paginationStatusMessageDeterminateShort = useI18n(
      "cdx-table-pagination-status-message-determinate-short",
      (x, y, z) => "".concat(x, "–").concat(y, " of ").concat(z),
      [firstOrdinal, lastOrdinal, totalCount]
    );
    const paginationStatusMessageDeterminateLong = useI18n(
      "cdx-table-pagination-status-message-determinate-long",
      (x, y, z) => "Showing results ".concat(x, "–").concat(y, " of ").concat(z),
      [firstOrdinal, lastOrdinal, totalCount]
    );
    const paginationStatusMessageIndeterminateShort = useI18n(
      "cdx-table-pagination-status-message-indeterminate-short",
      (x, y) => "".concat(x, "–").concat(y, " of many"),
      [firstOrdinal, lastOrdinal]
    );
    const paginationStatusMessageIndeterminateLong = useI18n(
      "cdx-table-pagination-status-message-indeterminate-long",
      (x, y) => "Showing results ".concat(x, "–").concat(y, " of many"),
      [firstOrdinal, lastOrdinal]
    );
    const paginationStatusMessageIndeterminateFinal = useI18n(
      "cdx-table-pagination-status-message-indeterminate-final",
      (x) => "Showing the last ".concat(x, " results"),
      [currentCount]
    );
    const paginationStatusMessagePending = useI18n(
      "cdx-table-pagination-status-message-pending",
      "Loading results..."
    );
    const paginationStatusMessageShort = computed(() => {
      if (props.pending) {
        return paginationStatusMessagePending.value;
      } else if (indeterminate.value && nextDisabled.value) {
        return paginationStatusMessageIndeterminateFinal.value;
      } else if (indeterminate.value) {
        return paginationStatusMessageIndeterminateShort.value;
      } else {
        return paginationStatusMessageDeterminateShort.value;
      }
    });
    const paginationStatusMessageLong = computed(() => {
      if (props.pending) {
        return paginationStatusMessagePending.value;
      } else if (indeterminate.value && nextDisabled.value) {
        return paginationStatusMessageIndeterminateFinal.value;
      } else if (indeterminate.value) {
        return paginationStatusMessageIndeterminateLong.value;
      } else {
        return paginationStatusMessageDeterminateLong.value;
      }
    });
    function onNext() {
      offset2.value += pageSize.value;
      if (props.serverPagination) {
        emit("load-more", offset2.value, pageSize.value);
      }
    }
    function onPrev() {
      if (offset2.value - pageSize.value < 1) {
        onFirst();
      } else {
        offset2.value -= pageSize.value;
        if (props.serverPagination) {
          emit("load-more", offset2.value, pageSize.value);
        }
      }
    }
    function onFirst() {
      offset2.value = 0;
      if (props.serverPagination) {
        emit("load-more", offset2.value, pageSize.value);
      }
    }
    function onLast() {
      if (totalCount.value % pageSize.value === 0) {
        offset2.value = totalCount.value - pageSize.value;
        emit("load-more", offset2.value, pageSize.value);
      } else {
        offset2.value = Math.floor(totalCount.value / pageSize.value) * pageSize.value;
        emit("load-more", offset2.value, pageSize.value);
      }
    }
    watch(pageSize, (newPageSize) => {
      if (props.serverPagination) {
        emit("load-more", offset2.value, newPageSize);
      }
    });
    const wrappedSelectedRows = useModelWrapper(toRef(props, "selectedRows"), emit, "update:selectedRows");
    const selectAll = ref(totalCount.value === wrappedSelectedRows.value.length);
    const selectAllIndeterminate = ref(false);
    const activeSortColumn = computed(() => Object.keys(props.sort)[0]);
    const hasSortableColumns = computed(
      () => props.columns.some((column) => column.allowSort)
    );
    const tableClasses = computed(() => {
      var _a;
      const useFixedLayout = (_a = props.columns) == null ? void 0 : _a.some((column) => "width" in column || "minWidth" in column);
      return {
        "cdx-table__table--layout-fixed": useFixedLayout,
        "cdx-table__table--borders-vertical": props.showVerticalBorders
      };
    });
    const tableWrapperClasses = computed(() => ({
      "cdx-table__table-wrapper--has-pending-indicator": props.pending
    }));
    const translatedSortCaption = useI18n(
      "cdx-table-sort-caption",
      (caption) => "".concat(caption, " (column headers with buttons are sortable)."),
      [toRef(props, "caption")]
    );
    const translatedSelectRowLabel = (rowIndex, totalRows) => useI18n(
      "cdx-table-select-row-label",
      (row, total) => "Select row ".concat(row, " of ").concat(total),
      [() => rowIndex, () => totalRows]
    ).value;
    const translatedSelectAllLabel = useI18n("cdx-table-select-all-label", "Select all rows");
    function getRowKey(row, index) {
      return TableRowIdentifier in row ? row[TableRowIdentifier] : index;
    }
    function getRowClass(row, rowIndex) {
      const rowKey = getRowKey(row, rowIndex);
      return {
        "cdx-table__row--selected": wrappedSelectedRows.value.includes(rowKey)
      };
    }
    function getRowHeaderScope(columnId) {
      const firstColumn = props.columns[0].id;
      if (props.useRowHeaders && columnId === firstColumn) {
        return "row";
      }
    }
    function getCellElement(columnId) {
      const firstColumn = props.columns[0].id;
      if (props.useRowHeaders && columnId === firstColumn) {
        return "th";
      }
      return "td";
    }
    function getCellClass(column, hasSort = false) {
      if ("textAlign" in column && !tableTextAlignmentsValidator(column.textAlign)) {
        console.warn('[CdxTable]: Invalid value for TableColumn "textAlign" property.');
        return void 0;
      }
      return {
        // Don't assign a class for the default value 'start'. Instead, we'll set
        // text-align: left on the td and th elements.
        ["cdx-table__table__cell--align-".concat(column.textAlign)]: "textAlign" in column && column.textAlign !== "start",
        "cdx-table__table__cell--has-sort": hasSort
      };
    }
    function getCellStyle(column) {
      const styles = {};
      if ("width" in column) {
        styles.width = column.width;
      }
      if ("minWidth" in column) {
        styles.minWidth = column.minWidth;
      }
      return styles;
    }
    function handleRowSelection(newSelectedRows) {
      if (totalCount.value === newSelectedRows.length) {
        selectAll.value = true;
        selectAllIndeterminate.value = false;
        return;
      }
      selectAll.value = false;
      if (totalCount.value > newSelectedRows.length) {
        selectAllIndeterminate.value = true;
      }
      if (newSelectedRows.length === 0) {
        selectAllIndeterminate.value = false;
      }
    }
    function handleSelectAll(newValue) {
      selectAllIndeterminate.value = false;
      if (newValue) {
        wrappedSelectedRows.value = props.data.map(
          (row, rowIndex) => getRowKey(row, rowIndex)
        );
      } else {
        wrappedSelectedRows.value = [];
      }
    }
    function handleSort(columnId) {
      var _a;
      const currentSortOrder = (_a = props.sort[columnId]) != null ? _a : "none";
      let newSortOrder = "asc";
      if (currentSortOrder === "asc") {
        newSortOrder = "desc";
      }
      if (currentSortOrder === "desc") {
        newSortOrder = "none";
      }
      emit("update:sort", { [columnId]: newSortOrder });
    }
    function getSortIcon(columnId) {
      var _a;
      const currentSortOrder = (_a = props.sort[columnId]) != null ? _a : "none";
      return iconMap[currentSortOrder];
    }
    function getSortOrder(columnId, hasSort = false) {
      var _a;
      if (hasSort) {
        const currentSortOrder = (_a = props.sort[columnId]) != null ? _a : "none";
        return currentSortOrder === "none" ? void 0 : sortDirectionMap[currentSortOrder];
      }
    }
    return {
      // pagination
      dataForDisplay,
      pageSize,
      onNext,
      onPrev,
      onFirst,
      onLast,
      nextDisabled,
      prevDisabled,
      lastDisabled,
      paginationStatusMessageShort,
      paginationStatusMessageLong,
      // Row selection constants.
      wrappedSelectedRows,
      selectAll,
      selectAllIndeterminate,
      // Sorting constants.
      activeSortColumn,
      hasSortableColumns,
      // Template helpers.
      tableClasses,
      tableWrapperClasses,
      getRowKey,
      getRowClass,
      getRowHeaderScope,
      getCellElement,
      getCellClass,
      getCellStyle,
      // Row selection methods.
      handleRowSelection,
      handleSelectAll,
      // Sorting methods.
      handleSort,
      getSortIcon,
      getSortOrder,
      // i18n
      translatedSortCaption,
      translatedSelectRowLabel,
      translatedSelectAllLabel
    };
  }
});
const _hoisted_1$6 = {
  class: "cdx-table",
  tabindex: "0"
};
const _hoisted_2$2 = {
  key: 0,
  class: "cdx-table__header"
};
const _hoisted_3$2 = ["aria-hidden"];
const _hoisted_4$2 = { class: "cdx-table__header__content" };
const _hoisted_5$2 = { class: "cdx-table__pagination-status--long" };
const _hoisted_6$2 = { class: "cdx-table__pagination-status--short" };
const _hoisted_7 = { key: 0 };
const _hoisted_8 = {
  key: 0,
  class: "cdx-table__table__select-rows"
};
const _hoisted_9 = ["aria-sort"];
const _hoisted_10 = ["aria-selected", "onClick"];
const _hoisted_11 = { class: "cdx-table__table__sort-label" };
const _hoisted_12 = { key: 0 };
const _hoisted_13 = { key: 0 };
const _hoisted_14 = { key: 1 };
const _hoisted_15 = { class: "cdx-table__table__empty-state" };
const _hoisted_16 = ["colspan"];
const _hoisted_17 = { class: "cdx-table__pagination-status--long" };
const _hoisted_18 = { class: "cdx-table__pagination-status--short" };
const _hoisted_19 = {
  key: 3,
  class: "cdx-table__footer"
};
function _sfc_render$6(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_cdx_table_pager = resolveComponent("cdx-table-pager");
  const _component_cdx_checkbox = resolveComponent("cdx-checkbox");
  const _component_cdx_icon = resolveComponent("cdx-icon");
  const _component_cdx_progress_bar = resolveComponent("cdx-progress-bar");
  return openBlock(), createElementBlock("div", _hoisted_1$6, [
    !_ctx.hideCaption || _ctx.$slots.header && _ctx.$slots.header().length > 0 ? (openBlock(), createElementBlock("div", _hoisted_2$2, [
      createElementVNode("div", {
        class: "cdx-table__header__caption",
        "aria-hidden": _ctx.$slots.header && _ctx.$slots.header().length > 0 ? void 0 : true
      }, [
        !_ctx.hideCaption ? (openBlock(), createElementBlock(
          Fragment,
          { key: 0 },
          [
            createTextVNode(
              toDisplayString(_ctx.caption),
              1
              /* TEXT */
            )
          ],
          64
          /* STABLE_FRAGMENT */
        )) : createCommentVNode("v-if", true)
      ], 8, _hoisted_3$2),
      createElementVNode("div", _hoisted_4$2, [
        renderSlot(_ctx.$slots, "header")
      ])
    ])) : createCommentVNode("v-if", true),
    _ctx.paginate && (_ctx.paginationPosition === "top" || _ctx.paginationPosition === "both") ? (openBlock(), createBlock(_component_cdx_table_pager, {
      key: 1,
      "items-per-page": _ctx.pageSize,
      "onUpdate:itemsPerPage": _cache[0] || (_cache[0] = ($event) => _ctx.pageSize = $event),
      class: "cdx-table__pagination--top",
      "pagination-size-options": _ctx.paginationSizeOptions,
      "prev-disabled": _ctx.prevDisabled,
      "next-disabled": _ctx.nextDisabled,
      "last-disabled": _ctx.lastDisabled,
      onNext: _ctx.onNext,
      onPrev: _ctx.onPrev,
      onFirst: _ctx.onFirst,
      onLast: _ctx.onLast
    }, {
      default: withCtx(() => [
        createElementVNode(
          "span",
          _hoisted_5$2,
          toDisplayString(_ctx.paginationStatusMessageLong),
          1
          /* TEXT */
        ),
        createElementVNode(
          "span",
          _hoisted_6$2,
          toDisplayString(_ctx.paginationStatusMessageShort),
          1
          /* TEXT */
        )
      ]),
      _: 1
      /* STABLE */
    }, 8, ["items-per-page", "pagination-size-options", "prev-disabled", "next-disabled", "last-disabled", "onNext", "onPrev", "onFirst", "onLast"])) : createCommentVNode("v-if", true),
    createElementVNode(
      "div",
      {
        class: normalizeClass(["cdx-table__table-wrapper cdx-scrollable-container", _ctx.tableWrapperClasses])
      },
      [
        createElementVNode(
          "table",
          {
            class: normalizeClass(["cdx-table__table", _ctx.tableClasses])
          },
          [
            createElementVNode("caption", null, [
              !_ctx.hasSortableColumns ? (openBlock(), createElementBlock(
                Fragment,
                { key: 0 },
                [
                  createTextVNode(
                    toDisplayString(_ctx.caption),
                    1
                    /* TEXT */
                  )
                ],
                64
                /* STABLE_FRAGMENT */
              )) : (openBlock(), createElementBlock(
                Fragment,
                { key: 1 },
                [
                  createTextVNode(
                    toDisplayString(_ctx.translatedSortCaption),
                    1
                    /* TEXT */
                  )
                ],
                64
                /* STABLE_FRAGMENT */
              ))
            ]),
            renderSlot(_ctx.$slots, "thead", {}, () => [
              _ctx.columns.length > 0 ? (openBlock(), createElementBlock("thead", _hoisted_7, [
                createElementVNode("tr", null, [
                  _ctx.useRowSelection ? (openBlock(), createElementBlock("th", _hoisted_8, [
                    createVNode(_component_cdx_checkbox, {
                      modelValue: _ctx.selectAll,
                      "onUpdate:modelValue": [
                        _cache[1] || (_cache[1] = ($event) => _ctx.selectAll = $event),
                        _ctx.handleSelectAll
                      ],
                      "hide-label": true,
                      indeterminate: _ctx.selectAllIndeterminate
                    }, {
                      default: withCtx(() => [
                        createTextVNode(
                          toDisplayString(_ctx.translatedSelectAllLabel),
                          1
                          /* TEXT */
                        )
                      ]),
                      _: 1
                      /* STABLE */
                    }, 8, ["modelValue", "indeterminate", "onUpdate:modelValue"])
                  ])) : createCommentVNode("v-if", true),
                  (openBlock(true), createElementBlock(
                    Fragment,
                    null,
                    renderList(_ctx.columns, (column) => {
                      return openBlock(), createElementBlock("th", {
                        key: column.id,
                        scope: "col",
                        class: normalizeClass(_ctx.getCellClass(column, column.allowSort)),
                        "aria-sort": _ctx.getSortOrder(column.id, column.allowSort),
                        style: normalizeStyle(_ctx.getCellStyle(column))
                      }, [
                        column.allowSort ? (openBlock(), createElementBlock("button", {
                          key: 0,
                          "aria-selected": column.id === _ctx.activeSortColumn,
                          class: "cdx-table__table__sort-button",
                          onClick: ($event) => _ctx.handleSort(column.id)
                        }, [
                          createElementVNode(
                            "span",
                            _hoisted_11,
                            toDisplayString(column.label),
                            1
                            /* TEXT */
                          ),
                          createVNode(_component_cdx_icon, {
                            icon: _ctx.getSortIcon(column.id),
                            size: "small",
                            class: "cdx-table__table__sort-icon--vue",
                            "aria-hidden": "true"
                          }, null, 8, ["icon"])
                        ], 8, _hoisted_10)) : (openBlock(), createElementBlock(
                          Fragment,
                          { key: 1 },
                          [
                            createTextVNode(
                              toDisplayString(column.label),
                              1
                              /* TEXT */
                            )
                          ],
                          64
                          /* STABLE_FRAGMENT */
                        ))
                      ], 14, _hoisted_9);
                    }),
                    128
                    /* KEYED_FRAGMENT */
                  ))
                ])
              ])) : createCommentVNode("v-if", true)
            ]),
            _ctx.pending ? (openBlock(), createBlock(_component_cdx_progress_bar, {
              key: 0,
              inline: true,
              class: "cdx-table__pending-indicator"
            })) : createCommentVNode("v-if", true),
            renderSlot(_ctx.$slots, "tbody", {}, () => [
              _ctx.dataForDisplay.length > 0 ? (openBlock(), createElementBlock("tbody", _hoisted_12, [
                (openBlock(true), createElementBlock(
                  Fragment,
                  null,
                  renderList(_ctx.dataForDisplay, (row, rowIndex) => {
                    return openBlock(), createElementBlock(
                      "tr",
                      {
                        key: _ctx.getRowKey(row, rowIndex),
                        class: normalizeClass(_ctx.getRowClass(row, rowIndex))
                      },
                      [
                        _ctx.useRowSelection ? (openBlock(), createElementBlock("td", _hoisted_13, [
                          createVNode(_component_cdx_checkbox, {
                            modelValue: _ctx.wrappedSelectedRows,
                            "onUpdate:modelValue": [
                              _cache[2] || (_cache[2] = ($event) => _ctx.wrappedSelectedRows = $event),
                              _ctx.handleRowSelection
                            ],
                            "input-value": _ctx.getRowKey(row, rowIndex),
                            "hide-label": true
                          }, {
                            default: withCtx(() => [
                              createTextVNode(
                                toDisplayString(_ctx.translatedSelectRowLabel(
                                  rowIndex + 1,
                                  _ctx.dataForDisplay.length
                                )),
                                1
                                /* TEXT */
                              )
                            ]),
                            _: 2
                            /* DYNAMIC */
                          }, 1032, ["modelValue", "input-value", "onUpdate:modelValue"])
                        ])) : createCommentVNode("v-if", true),
                        (openBlock(true), createElementBlock(
                          Fragment,
                          null,
                          renderList(_ctx.columns, (column) => {
                            return openBlock(), createBlock(resolveDynamicComponent(_ctx.getCellElement(column.id)), {
                              key: column.id,
                              scope: _ctx.getRowHeaderScope(column.id),
                              class: normalizeClass(_ctx.getCellClass(column))
                            }, {
                              default: withCtx(() => [
                                renderSlot(_ctx.$slots, "item-" + column.id, {
                                  item: row[column.id],
                                  row
                                }, () => [
                                  createTextVNode(
                                    toDisplayString(row[column.id]),
                                    1
                                    /* TEXT */
                                  )
                                ])
                              ]),
                              _: 2
                              /* DYNAMIC */
                            }, 1032, ["scope", "class"]);
                          }),
                          128
                          /* KEYED_FRAGMENT */
                        ))
                      ],
                      2
                      /* CLASS */
                    );
                  }),
                  128
                  /* KEYED_FRAGMENT */
                ))
              ])) : _ctx.$slots["empty-state"] && _ctx.$slots["empty-state"]().length > 0 ? (openBlock(), createElementBlock("tbody", _hoisted_14, [
                createElementVNode("tr", _hoisted_15, [
                  createElementVNode("td", {
                    colspan: _ctx.columns.length,
                    class: "cdx-table__table__empty-state-content"
                  }, [
                    renderSlot(_ctx.$slots, "empty-state")
                  ], 8, _hoisted_16)
                ])
              ])) : createCommentVNode("v-if", true)
            ]),
            renderSlot(_ctx.$slots, "tfoot")
          ],
          2
          /* CLASS */
        )
      ],
      2
      /* CLASS */
    ),
    _ctx.paginate && (_ctx.paginationPosition === "bottom" || _ctx.paginationPosition === "both") ? (openBlock(), createBlock(_component_cdx_table_pager, {
      key: 2,
      "items-per-page": _ctx.pageSize,
      "onUpdate:itemsPerPage": _cache[3] || (_cache[3] = ($event) => _ctx.pageSize = $event),
      class: "cdx-table__pagination--bottom",
      "pagination-size-options": _ctx.paginationSizeOptions,
      "prev-disabled": _ctx.prevDisabled,
      "next-disabled": _ctx.nextDisabled,
      "last-disabled": _ctx.lastDisabled,
      onNext: _ctx.onNext,
      onPrev: _ctx.onPrev,
      onFirst: _ctx.onFirst,
      onLast: _ctx.onLast
    }, {
      default: withCtx(() => [
        createElementVNode(
          "span",
          _hoisted_17,
          toDisplayString(_ctx.paginationStatusMessageLong),
          1
          /* TEXT */
        ),
        createElementVNode(
          "span",
          _hoisted_18,
          toDisplayString(_ctx.paginationStatusMessageShort),
          1
          /* TEXT */
        )
      ]),
      _: 1
      /* STABLE */
    }, 8, ["items-per-page", "pagination-size-options", "prev-disabled", "next-disabled", "last-disabled", "onNext", "onPrev", "onFirst", "onLast"])) : createCommentVNode("v-if", true),
    _ctx.$slots.footer && _ctx.$slots.footer().length > 0 ? (openBlock(), createElementBlock("div", _hoisted_19, [
      renderSlot(_ctx.$slots, "footer")
    ])) : createCommentVNode("v-if", true)
  ]);
}
const Table = /* @__PURE__ */ _export_sfc(_sfc_main$6, [["render", _sfc_render$6]]);
const _sfc_main$5 = defineComponent({
  name: "CdxTab",
  /**
   * The "label" and "disabled" props are referenced by the parent Tabs
   * component during the generation of a list of labels.
   */
  props: {
    /**
     * String name of the tab, used for programmatic selection. Each Tab
     * inside a layout must have a unique name. This prop will also be
     * used as the tab label if no "label" prop is provided.
     */
    name: {
      type: String,
      required: true
    },
    /**
     * Label that corresponds to this Tab in the Tabs component's header.
     * Lengthy labels will be truncated.
     */
    // eslint-disable-next-line vue/no-unused-properties
    label: {
      type: String,
      default: ""
    },
    /**
     * Whether or not the tab is disabled. Disabled tabs cannot be accessed
     * via label clicks or keyboard navigation.
     */
    // eslint-disable-next-line vue/no-unused-properties
    disabled: {
      type: Boolean,
      default: false
    }
  },
  setup(props) {
    var _a;
    const tabsData = inject(TabsKey);
    const activeTab = inject(ActiveTabKey);
    if (!tabsData || !activeTab) {
      throw new Error("Tab component must be used inside a Tabs component");
    }
    const tab = (_a = tabsData.value.get(props.name)) != null ? _a : {};
    const isActive = computed(() => props.name === activeTab.value);
    return {
      tab,
      isActive
    };
  }
});
const _hoisted_1$5 = ["id", "aria-hidden", "aria-labelledby"];
function _sfc_render$5(_ctx, _cache, $props, $setup, $data, $options) {
  return withDirectives((openBlock(), createElementBlock("section", {
    id: _ctx.tab.id,
    "aria-hidden": !_ctx.isActive ? true : void 0,
    "aria-labelledby": "".concat(_ctx.tab.id, "-label"),
    class: "cdx-tab",
    role: "tabpanel",
    tabindex: "-1"
  }, [
    renderSlot(_ctx.$slots, "default")
  ], 8, _hoisted_1$5)), [
    [vShow, _ctx.isActive]
  ]);
}
const CdxTab = /* @__PURE__ */ _export_sfc(_sfc_main$5, [["render", _sfc_render$5]]);
const _sfc_main$4 = defineComponent({
  name: "CdxTabs",
  components: {
    CdxButton,
    CdxIcon
  },
  props: {
    /**
     * The `name` of the currently active Tab in the layout.
     *
     * This prop is optional; if it is provided, it should be bound
     * using a `v-model:active` directive in the parent component.
     * Two-way binding the active tab is only necessary if some tab
     * other than the first should be active as soon as the component
     * renders (such as in cases where the active tab is bound to URL
     * params). If this prop is not provided, then the first tab will
     * be active by default. Regardless, the active tab can be changed
     * normally by user interaction (clicking on tab headings) or by
     * using the exposed methods "select", "next", and "prev".
     */
    active: {
      type: String,
      default: null
    },
    /**
     * Whether or not the component should be displayed in a framed
     * visual style.
     */
    framed: {
      type: Boolean,
      default: false
    }
  },
  emits: [
    /**
     * Emitted whenever the active tab changes, assuming that an `active`
     * prop has been provided in the parent.
     *
     * @property {string} active The `name` of the current active tab
     */
    "update:active"
  ],
  /**
   * Some methods are exposed to allow for programmatic selection of
   * the active tab from outside of the component.
   */
  // expose is temporarily disabled to work around a Vue / vue-tsc bug, see
  // https://github.com/vuejs/language-tools/issues/5069
  /*
  expose: [
  	'select',
  	'next',
  	'prev'
  ],
  */
  setup(props, { slots, emit }) {
    const rootElement = ref();
    const tabListElement = ref();
    const prevScroller = ref();
    const nextScroller = ref();
    const currentDirection = useComputedDirection(rootElement);
    const childTabNodes = computed(() => {
      const slotContents = useSlotContents(slots.default);
      if (!slotContents.every(
        (node) => typeof node === "object" && isComponentVNode(node, CdxTab.name)
      )) {
        throw new Error("Slot content may only contain CdxTab components");
      }
      if (slotContents.length === 0) {
        throw new Error("Slot content cannot be empty");
      }
      return slotContents;
    });
    const tabsData = computed(() => childTabNodes.value.reduce((map, item) => {
      var _a;
      if (((_a = item.props) == null ? void 0 : _a.name) && typeof item.props.name === "string") {
        if (map.get(item.props.name)) {
          throw new Error("Tab names must be unique");
        }
        map.set(item.props.name, {
          name: item.props.name,
          id: useId(),
          label: item.props.label || item.props.name,
          disabled: item.props.disabled
        });
      }
      return map;
    }, /* @__PURE__ */ new Map()));
    const internalRefForActiveTab = ref(Array.from(tabsData.value.keys())[0]);
    const activeTab = useOptionalModelWrapper(internalRefForActiveTab, toRef(props, "active"), emit, "update:active");
    const tabNames = computed(() => Array.from(tabsData.value.keys()));
    const activeTabIndex = computed(() => tabNames.value.indexOf(activeTab.value));
    const activeTabId = computed(() => {
      var _a;
      return (_a = tabsData.value.get(activeTab.value)) == null ? void 0 : _a.id;
    });
    provide(ActiveTabKey, activeTab);
    provide(TabsKey, tabsData);
    const tabButtonRefs = ref(/* @__PURE__ */ new Map());
    const firstTabLabel = ref();
    const lastTabLabel = ref();
    const firstLabelVisible = useIntersectionObserver(firstTabLabel, { threshold: 0.95 });
    const lastLabelVisible = useIntersectionObserver(lastTabLabel, { threshold: 0.95 });
    function assignTemplateRefForTabButton(templateRef, index) {
      const el = templateRef;
      if (el) {
        tabButtonRefs.value.set(index, el);
        if (index === 0) {
          firstTabLabel.value = el;
        } else if (index === tabNames.value.length - 1) {
          lastTabLabel.value = el;
        }
      }
    }
    const rootClasses = computed(() => ({
      "cdx-tabs--framed": props.framed,
      "cdx-tabs--quiet": !props.framed
    }));
    function focusActiveTab() {
      var _a;
      (_a = tabButtonRefs.value.get(activeTabIndex.value)) == null ? void 0 : _a.focus();
    }
    function getScrollDistance(tabLabel) {
      if (!tabListElement.value || !prevScroller.value || !nextScroller.value) {
        return 0;
      }
      const leftScroller = currentDirection.value === "rtl" ? nextScroller.value : prevScroller.value;
      const rightScroller = currentDirection.value === "rtl" ? prevScroller.value : nextScroller.value;
      const labelLeft = tabLabel.offsetLeft;
      const labelRight = labelLeft + tabLabel.clientWidth;
      const visibleLeft = tabListElement.value.scrollLeft + leftScroller.clientWidth;
      const visibleRight = tabListElement.value.scrollLeft + tabListElement.value.clientWidth - rightScroller.clientWidth;
      if (labelLeft < visibleLeft) {
        return labelLeft - visibleLeft;
      }
      if (labelRight > visibleRight) {
        return labelRight - visibleRight;
      }
      return 0;
    }
    function scrollTabs(logicalDirection) {
      if (!tabListElement.value || !prevScroller.value || !nextScroller.value) {
        return;
      }
      const scrollDirection = logicalDirection === "next" && currentDirection.value === "ltr" || logicalDirection === "prev" && currentDirection.value === "rtl" ? 1 : -1;
      let scrollDistance = 0;
      let tabLabel = logicalDirection === "next" ? tabListElement.value.firstElementChild : tabListElement.value.lastElementChild;
      while (tabLabel) {
        const nextTabLabel = logicalDirection === "next" ? tabLabel.nextElementSibling : tabLabel.previousElementSibling;
        scrollDistance = getScrollDistance(tabLabel);
        if (Math.sign(scrollDistance) === scrollDirection) {
          if (nextTabLabel && Math.abs(scrollDistance) < 0.25 * tabListElement.value.clientWidth) {
            scrollDistance = getScrollDistance(nextTabLabel);
          }
          break;
        }
        tabLabel = nextTabLabel;
      }
      tabListElement.value.scrollBy({
        left: scrollDistance,
        behavior: "smooth"
      });
      focusActiveTab();
    }
    watch(activeTab, () => {
      if (activeTabId.value === void 0 || !tabListElement.value || !prevScroller.value || !nextScroller.value) {
        return;
      }
      const activeTabLabel = document.getElementById("".concat(activeTabId.value, "-label"));
      if (!activeTabLabel) {
        return;
      }
      tabListElement.value.scrollBy({
        left: getScrollDistance(activeTabLabel),
        behavior: "smooth"
      });
    });
    return {
      activeTab,
      activeTabIndex,
      activeTabId,
      currentDirection,
      rootElement,
      tabListElement,
      prevScroller,
      nextScroller,
      rootClasses,
      tabNames,
      tabsData,
      firstLabelVisible,
      lastLabelVisible,
      assignTemplateRefForTabButton,
      scrollTabs,
      focusActiveTab,
      cdxIconPrevious: L7,
      cdxIconNext: e7
    };
  },
  /**
   * Some non-public methods are defined here rather than in setup because
   * they support public methods (which *must* be defined using the Options
   * API in order to show up in documentation), or are thematically related
   * (such as key handlers).
   */
  methods: {
    /**
     * Programmatically select a tab based on its "name" prop
     *
     * @param {string} tabName The name of the tab to select
     * @param {boolean} setFocus Whether or not to also set focus to the new tab
     * @public
     */
    select(tabName, setFocus) {
      const target = this.tabsData.get(tabName);
      if (target && !(target == null ? void 0 : target.disabled)) {
        this.activeTab = tabName;
        if (setFocus) {
          nextTick(() => {
            this.focusActiveTab();
          });
        }
      }
    },
    /**
     * Used to select next or previous tab in the sequence, skipping
     * over any tabs that are disabled. The provided increment should
     * be either 1 (to move forward) or -1 (to move backwards)
     *
     * @param index
     * @param increment
     * @param setFocus
     */
    selectNonDisabled(index, increment, setFocus) {
      const target = this.tabsData.get(this.tabNames[index + increment]);
      if (target) {
        if (target.disabled) {
          this.selectNonDisabled(index + increment, increment, setFocus);
        } else {
          this.select(target.name, setFocus);
        }
      }
    },
    /**
     * Set the next tab to active, if one exists
     *
     * @param {boolean} setFocus
     * @public
     */
    next(setFocus) {
      this.selectNonDisabled(this.activeTabIndex, 1, setFocus);
    },
    /**
     * Set the previous tab to active, if one exists
     *
     * @param {boolean} setFocus
     * @public
     */
    prev(setFocus) {
      this.selectNonDisabled(this.activeTabIndex, -1, setFocus);
    },
    /**
     * Handle left arrow key navigation (based on LTR/RTL direction)
     */
    onLeftArrowKeypress() {
      if (this.currentDirection === "rtl") {
        this.next(true);
      } else {
        this.prev(true);
      }
    },
    /**
     * Handle right arrow key navigation (based on LTR/RTL direction)
     */
    onRightArrowKeypress() {
      if (this.currentDirection === "rtl") {
        this.prev(true);
      } else {
        this.next(true);
      }
    },
    /**
     * Handle down arrow key navigation by moving focus to the contents
     * of the currently active tab
     */
    onDownArrowKeypress() {
      var _a;
      if (this.activeTabId) {
        (_a = document.getElementById(this.activeTabId)) == null ? void 0 : _a.focus();
      }
    }
  }
});
const _hoisted_1$4 = { class: "cdx-tabs__header" };
const _hoisted_2$1 = {
  ref: "prevScroller",
  class: "cdx-tabs__prev-scroller"
};
const _hoisted_3$1 = {
  ref: "tabListElement",
  class: "cdx-tabs__list",
  role: "tablist"
};
const _hoisted_4$1 = ["id", "disabled", "aria-controls", "aria-selected", "tabindex", "onClick", "onKeyup"];
const _hoisted_5$1 = {
  ref: "nextScroller",
  class: "cdx-tabs__next-scroller"
};
const _hoisted_6$1 = { class: "cdx-tabs__content" };
function _sfc_render$4(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_cdx_icon = resolveComponent("cdx-icon");
  const _component_cdx_button = resolveComponent("cdx-button");
  return openBlock(), createElementBlock(
    "div",
    {
      ref: "rootElement",
      class: normalizeClass(["cdx-tabs", _ctx.rootClasses])
    },
    [
      createElementVNode("div", _hoisted_1$4, [
        withDirectives(createElementVNode(
          "div",
          _hoisted_2$1,
          [
            createVNode(_component_cdx_button, {
              class: "cdx-tabs__scroll-button",
              weight: "quiet",
              type: "button",
              tabindex: "-1",
              "aria-hidden": true,
              onMousedown: _cache[0] || (_cache[0] = withModifiers(() => {
              }, ["prevent"])),
              onClick: _cache[1] || (_cache[1] = ($event) => _ctx.scrollTabs("prev"))
            }, {
              default: withCtx(() => [
                createVNode(_component_cdx_icon, { icon: _ctx.cdxIconPrevious }, null, 8, ["icon"])
              ]),
              _: 1
              /* STABLE */
            })
          ],
          512
          /* NEED_PATCH */
        ), [
          [vShow, !_ctx.firstLabelVisible]
        ]),
        createElementVNode(
          "div",
          _hoisted_3$1,
          [
            (openBlock(true), createElementBlock(
              Fragment,
              null,
              renderList(_ctx.tabsData.values(), (tab, index) => {
                return openBlock(), createElementBlock("button", {
                  id: "".concat(tab.id, "-label"),
                  key: index,
                  ref_for: true,
                  ref: (ref2) => _ctx.assignTemplateRefForTabButton(ref2, index),
                  disabled: tab.disabled ? true : void 0,
                  "aria-controls": tab.id,
                  "aria-selected": tab.name === _ctx.activeTab,
                  tabindex: tab.name === _ctx.activeTab ? void 0 : -1,
                  class: "cdx-tabs__list__item",
                  role: "tab",
                  onClick: withModifiers(($event) => _ctx.select(tab.name), ["prevent"]),
                  onKeyup: withKeys(($event) => _ctx.select(tab.name), ["enter"]),
                  onKeydown: [
                    _cache[2] || (_cache[2] = withKeys(withModifiers((...args) => _ctx.onRightArrowKeypress && _ctx.onRightArrowKeypress(...args), ["prevent"]), ["right"])),
                    _cache[3] || (_cache[3] = withKeys(withModifiers((...args) => _ctx.onDownArrowKeypress && _ctx.onDownArrowKeypress(...args), ["prevent"]), ["down"])),
                    _cache[4] || (_cache[4] = withKeys(withModifiers((...args) => _ctx.onLeftArrowKeypress && _ctx.onLeftArrowKeypress(...args), ["prevent"]), ["left"]))
                  ]
                }, [
                  createElementVNode(
                    "span",
                    null,
                    toDisplayString(tab.label),
                    1
                    /* TEXT */
                  )
                ], 40, _hoisted_4$1);
              }),
              128
              /* KEYED_FRAGMENT */
            ))
          ],
          512
          /* NEED_PATCH */
        ),
        withDirectives(createElementVNode(
          "div",
          _hoisted_5$1,
          [
            createVNode(_component_cdx_button, {
              class: "cdx-tabs__scroll-button",
              weight: "quiet",
              type: "button",
              tabindex: "-1",
              "aria-hidden": true,
              onMousedown: _cache[5] || (_cache[5] = withModifiers(() => {
              }, ["prevent"])),
              onClick: _cache[6] || (_cache[6] = ($event) => _ctx.scrollTabs("next"))
            }, {
              default: withCtx(() => [
                createVNode(_component_cdx_icon, { icon: _ctx.cdxIconNext }, null, 8, ["icon"])
              ]),
              _: 1
              /* STABLE */
            })
          ],
          512
          /* NEED_PATCH */
        ), [
          [vShow, !_ctx.lastLabelVisible]
        ])
      ]),
      createElementVNode("div", _hoisted_6$1, [
        renderSlot(_ctx.$slots, "default")
      ])
    ],
    2
    /* CLASS */
  );
}
const Tabs = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["render", _sfc_render$4]]);
const statusValidator = makeStringTypeValidator(ValidationStatusTypes);
const _sfc_main$3 = defineComponent({
  name: "CdxTextArea",
  components: { CdxIcon },
  inheritAttrs: false,
  // expose is temporarily disabled to work around a Vue / vue-tsc bug, see
  // https://github.com/vuejs/language-tools/issues/5069
  /*
  expose: [
  	'focus',
  	'blur',
  	'checkValidity',
  	'reportValidity',
  	'setCustomValidity'
  ],
  */
  props: {
    /**
     * Current value of the textarea.
     *
     * Provided by `v-model` binding in the parent component.
     */
    modelValue: {
      type: String,
      default: ""
    },
    /**
     * `status` attribute of the textarea.
     */
    status: {
      type: String,
      default: "default",
      validator: statusValidator
    },
    /**
     * Whether the textarea is disabled.
     */
    disabled: {
      type: Boolean,
      default: false
    },
    /**
     * Describes whether the textarea grows vertically to show all text.
     *
     * When autosize is true, the textarea automatically grows in height (vertically).
     * The height of the textarea expands while the user types in the textarea.
     * The content inside the textarea is visible and there's no scroll.
     */
    autosize: {
      type: Boolean,
      default: false
    },
    /**
     * An icon at the start of the textarea element. Similar to a `::before` pseudo-element.
     */
    startIcon: {
      type: [String, Object],
      default: void 0
    },
    /**
     * An icon at the end of the textarea element. Similar to an `::after` pseudo-element.
     */
    endIcon: {
      type: [String, Object],
      default: void 0
    }
  },
  emits: [
    /**
     * When the textarea value changes.
     *
     * @property {string} modelValue The new model value
     */
    "update:modelValue",
    /**
     * When the input value changes via direct use of the input
     *
     * @property {InputEvent} event
     */
    "input",
    /**
     * When an input value change is committed by the user (e.g. on blur)
     *
     * @property {Event} event
     */
    "change",
    /**
     * When the input comes into focus
     *
     * @property {FocusEvent} event
     */
    "focus",
    /**
     * When the input loses focus
     *
     * @property {FocusEvent} event
     */
    "blur",
    /**
     * When the textarea value is invalid according to the textarea's constraint
     * attributes (e.g. minlength, maxlength, or required). See:
     * https://developer.mozilla.org/en-US/docs/Web/HTML/Constraint_validation#validation-related_attributes
     *
     * @property {Event} event
     */
    "invalid"
  ],
  setup(props, { attrs, emit }) {
    const textarea = ref();
    const wrappedModel = useModelWrapper(toRef(props, "modelValue"), emit);
    const idAttribute = attrs.id;
    const {
      computedDisabled,
      computedStatus,
      computedInputId
    } = useFieldData(
      toRef(props, "disabled"),
      toRef(props, "status"),
      idAttribute
    );
    const descriptionId = inject(FieldDescriptionIdKey, void 0);
    const textareaClasses = computed(() => ({
      "cdx-text-area__textarea--has-value": !!wrappedModel.value,
      "cdx-text-area__textarea--is-autosize": props.autosize
    }));
    const internalClasses = computed(() => ({
      "cdx-text-area--status-default": computedStatus.value === "default",
      "cdx-text-area--status-error": computedStatus.value === "error",
      "cdx-text-area--has-start-icon": !!props.startIcon,
      "cdx-text-area--has-end-icon": !!props.endIcon
    }));
    const {
      rootClasses,
      rootStyle,
      otherAttrs
    } = useSplitAttributes(attrs, internalClasses);
    const otherAttrsMinusId = computed(() => {
      const _a = otherAttrs.value, { id } = _a, everythingElse = __objRest(_a, ["id"]);
      return everythingElse;
    });
    function onInput(event) {
      if (textarea.value && props.autosize) {
        textarea.value.style.height = "auto";
        textarea.value.style.height = "".concat(textarea.value.scrollHeight, "px");
      }
      emit("input", event);
    }
    const onChange = (event) => {
      emit("change", event);
    };
    const onFocus = (event) => {
      emit("focus", event);
    };
    const onBlur = (event) => {
      emit("blur", event);
    };
    const shouldPreventDefault = ref(true);
    const onInvalid = (event, doPreventDefault) => {
      if (doPreventDefault) {
        event.preventDefault();
      }
      emit("invalid", event);
      shouldPreventDefault.value = true;
    };
    return {
      textarea,
      rootClasses,
      rootStyle,
      wrappedModel,
      computedDisabled,
      computedInputId,
      descriptionId,
      textareaClasses,
      otherAttrsMinusId,
      onInput,
      onChange,
      onFocus,
      onBlur,
      onInvalid,
      shouldPreventDefault
    };
  },
  // Public methods
  // These must be in the methods block, not in the setup function, otherwise their documentation
  // won't be picked up by vue-docgen
  methods: {
    /**
     * Focus the component's textarea element.
     *
     * @public
     */
    focus() {
      const textarea = this.$refs.textarea;
      textarea.focus();
    },
    /**
     * Blur the component's textarea element.
     *
     * @public
     */
    blur() {
      const textarea = this.$refs.textarea;
      textarea.blur();
    },
    /**
     * Check the validity of the textarea element according to its constraint attributes. Emits
     * an 'invalid' event if the textarea is invalid. See:
     * https://developer.mozilla.org/en-US/docs/Web/API/HTMLTextAreaElement/checkValidity
     *
     * @public
     * @return {boolean} Whether the textarea is valid
     */
    checkValidity() {
      const textarea = this.$refs.textarea;
      return textarea.checkValidity();
    },
    /**
     * Check the validity of the textarea element and report it as a pop up on the UI. See:
     * https://developer.mozilla.org/en-US/docs/Web/API/HTMLTextAreaElement/reportValidity
     *
     * @public
     * @return {boolean} Whether the textarea is valid
     */
    reportValidity() {
      this.shouldPreventDefault = false;
      const textarea = this.$refs.textarea;
      return textarea.reportValidity();
    },
    /**
     * Set custom validity and message for the textarea element. See:
     * https://developer.mozilla.org/en-US/docs/Web/API/HTMLTextAreaElement/setCustomValidity
     *
     * @public
     * @param {string} message The custom validation message to set
     */
    setCustomValidity(message) {
      const textarea = this.$refs.textarea;
      textarea.setCustomValidity(message);
    }
  }
});
const _hoisted_1$3 = ["id", "aria-describedby", "disabled"];
function _sfc_render$3(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_cdx_icon = resolveComponent("cdx-icon");
  return openBlock(), createElementBlock(
    "div",
    {
      class: normalizeClass(["cdx-text-area", _ctx.rootClasses]),
      style: normalizeStyle(_ctx.rootStyle)
    },
    [
      withDirectives(createElementVNode("textarea", mergeProps({
        id: _ctx.computedInputId,
        ref: "textarea"
      }, _ctx.otherAttrsMinusId, {
        "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => _ctx.wrappedModel = $event),
        class: [_ctx.textareaClasses, "cdx-text-area__textarea"],
        "aria-describedby": _ctx.descriptionId,
        disabled: _ctx.computedDisabled,
        onInput: _cache[1] || (_cache[1] = (...args) => _ctx.onInput && _ctx.onInput(...args)),
        onChange: _cache[2] || (_cache[2] = (...args) => _ctx.onChange && _ctx.onChange(...args)),
        onFocus: _cache[3] || (_cache[3] = (...args) => _ctx.onFocus && _ctx.onFocus(...args)),
        onBlur: _cache[4] || (_cache[4] = (...args) => _ctx.onBlur && _ctx.onBlur(...args)),
        onInvalid: _cache[5] || (_cache[5] = (e) => _ctx.onInvalid(e, _ctx.shouldPreventDefault))
      }), null, 16, _hoisted_1$3), [
        [vModelText, _ctx.wrappedModel]
      ]),
      _ctx.startIcon ? (openBlock(), createBlock(_component_cdx_icon, {
        key: 0,
        icon: _ctx.startIcon,
        class: "cdx-text-area__icon-vue cdx-text-area__start-icon"
      }, null, 8, ["icon"])) : createCommentVNode("v-if", true),
      _ctx.endIcon ? (openBlock(), createBlock(_component_cdx_icon, {
        key: 1,
        icon: _ctx.endIcon,
        class: "cdx-text-area__icon-vue cdx-text-area__end-icon"
      }, null, 8, ["icon"])) : createCommentVNode("v-if", true)
    ],
    6
    /* CLASS, STYLE */
  );
}
const TextArea = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["render", _sfc_render$3]]);
const _sfc_main$2 = defineComponent({
  name: "CdxToggleButtonGroup",
  components: {
    CdxIcon,
    CdxToggleButton
  },
  props: {
    /**
     * Buttons to display. See the ButtonGroupItem type.
     */
    buttons: {
      type: Array,
      required: true,
      validator: (value) => Array.isArray(value) && value.length >= 1
    },
    /**
     * Selected value, or array of selected values.
     *
     * If this is a string or number, the button whose value equals that string or number is
     * selected, and only a single selection is allowed. If this is an array, the buttons whose
     * values equal any of the values in the array are selected, and multiple selections are
     * allowed. To select none of the buttons initially, set this to `null`
     * (for single-selection groups) or to `[]` (for multi-selection groups).
     *
     * Must be bound with `v-model`.
     */
    modelValue: {
      type: [String, Number, null, Array],
      required: true
    },
    /**
     * Whether the entire group is disabled.
     *
     * If this is set to true, all buttons in the group are disabled. Buttons can also be
     * disabled individually by setting their `disabled` property to true.
     */
    disabled: {
      type: Boolean,
      default: false
    }
  },
  emits: [
    /**
     * Emitted when modelValue changes.
     *
     * @property {string | number | ( string | number )[]} modelValue The new model value
     */
    "update:modelValue"
  ],
  setup(props, { emit }) {
    const {
      rootElement,
      assignTemplateRef,
      onFocus,
      onBlur,
      onKeydown
    } = useButtonGroupKeyboardNav(toRef(props, "buttons"));
    function isSelected(button) {
      if (Array.isArray(props.modelValue)) {
        return props.modelValue.includes(button.value);
      } else if (props.modelValue !== null) {
        return props.modelValue === button.value;
      }
      return false;
    }
    function onUpdate(button, nowSelected) {
      if (Array.isArray(props.modelValue)) {
        const wasSelected = props.modelValue.includes(button.value);
        if (nowSelected && !wasSelected) {
          emit("update:modelValue", props.modelValue.concat(button.value));
        } else if (!nowSelected && wasSelected) {
          emit("update:modelValue", props.modelValue.filter((v) => v !== button.value));
        }
      } else {
        if (nowSelected && props.modelValue !== button.value) {
          emit("update:modelValue", button.value);
        }
      }
    }
    return {
      rootElement,
      assignTemplateRef,
      onFocus,
      onBlur,
      onKeydown,
      getButtonLabel,
      isSelected,
      onUpdate
    };
  }
});
const _hoisted_1$2 = {
  ref: "rootElement",
  class: "cdx-toggle-button-group"
};
function _sfc_render$2(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_cdx_icon = resolveComponent("cdx-icon");
  const _component_cdx_toggle_button = resolveComponent("cdx-toggle-button");
  return openBlock(), createElementBlock(
    "div",
    _hoisted_1$2,
    [
      (openBlock(true), createElementBlock(
        Fragment,
        null,
        renderList(_ctx.buttons, (button, index) => {
          return openBlock(), createBlock(_component_cdx_toggle_button, {
            key: button.value,
            ref_for: true,
            ref: (ref2) => _ctx.assignTemplateRef(ref2, index),
            "model-value": _ctx.isSelected(button),
            disabled: button.disabled || _ctx.disabled,
            "aria-label": button.ariaLabel,
            "onUpdate:modelValue": ($event) => _ctx.onUpdate(button, $event),
            onFocus: ($event) => _ctx.onFocus(index),
            onBlur: _ctx.onBlur,
            onKeydown: _ctx.onKeydown
          }, {
            default: withCtx(() => [
              renderSlot(_ctx.$slots, "default", {
                button,
                selected: _ctx.isSelected(button)
              }, () => [
                button.icon ? (openBlock(), createBlock(_component_cdx_icon, {
                  key: 0,
                  icon: button.icon
                }, null, 8, ["icon"])) : createCommentVNode("v-if", true),
                createTextVNode(
                  " " + toDisplayString(_ctx.getButtonLabel(button)),
                  1
                  /* TEXT */
                )
              ])
            ]),
            _: 2
            /* DYNAMIC */
          }, 1032, ["model-value", "disabled", "aria-label", "onUpdate:modelValue", "onFocus", "onBlur", "onKeydown"]);
        }),
        128
        /* KEYED_FRAGMENT */
      ))
    ],
    512
    /* NEED_PATCH */
  );
}
const ToggleButtonGroup = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["render", _sfc_render$2]]);
const _sfc_main$1 = defineComponent({
  name: "CdxToggleSwitch",
  components: { CdxLabel },
  /**
   * The input element will inherit attributes, not the root element.
   */
  inheritAttrs: false,
  props: {
    /**
     * Current value of the toggle switch or toggle switch group.
     *
     * Provided by `v-model` binding in the parent component.
     */
    modelValue: {
      type: [Boolean, Array],
      default: false
    },
    /**
     * HTML "value" attribute to assign to the input element.
     *
     * Required for groups of ToggleSwitches. Can be omitted for single true/false switches.
     */
    inputValue: {
      type: [String, Number, Boolean],
      default: false
    },
    /**
     * Whether to align the switch to the end of the container.
     *
     * Useful for ToggleSwitch groups, where each switch should be aligned regardless of
     * label length.
     */
    alignSwitch: {
      type: Boolean,
      default: false
    },
    /**
     * Whether the label should be visually hidden.
     *
     * Note that this will also hide the description.
     */
    hideLabel: {
      type: Boolean,
      default: false
    },
    /**
     * Whether the disabled attribute should be added to the input.
     */
    disabled: {
      type: Boolean,
      default: false
    }
  },
  emits: [
    /**
     * Emitted when modelValue changes.
     *
     * @property {boolean} modelValue The new model value
     */
    "update:modelValue"
  ],
  setup(props, { emit, slots, attrs }) {
    var _a;
    useLabelChecker((_a = slots.default) == null ? void 0 : _a.call(slots), attrs, "CdxToggleSwitch");
    const input = ref();
    const inputId = useId();
    const descriptionId = useId();
    const internalClasses = computed(() => ({
      "cdx-toggle-switch--align-switch": props.alignSwitch
    }));
    const {
      rootClasses,
      rootStyle,
      otherAttrs
    } = useSplitAttributes(attrs, internalClasses);
    const { computedDisabled } = useFieldData(toRef(props, "disabled"));
    const wrappedModel = useModelWrapper(toRef(props, "modelValue"), emit);
    const clickInput = () => {
      input.value.click();
    };
    return {
      input,
      inputId,
      descriptionId,
      rootClasses,
      rootStyle,
      otherAttrs,
      computedDisabled,
      wrappedModel,
      clickInput
    };
  }
});
const _hoisted_1$1 = ["id", "aria-describedby", "value", "disabled"];
function _sfc_render$1(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_cdx_label = resolveComponent("cdx-label");
  return openBlock(), createElementBlock(
    "span",
    {
      class: normalizeClass(["cdx-toggle-switch", _ctx.rootClasses]),
      style: normalizeStyle(_ctx.rootStyle)
    },
    [
      withDirectives(createElementVNode("input", mergeProps({
        id: _ctx.inputId,
        ref: "input",
        "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => _ctx.wrappedModel = $event),
        class: "cdx-toggle-switch__input",
        type: "checkbox",
        role: "switch",
        "aria-describedby": _ctx.$slots.description && _ctx.$slots.description().length > 0 ? _ctx.descriptionId : void 0,
        value: _ctx.inputValue,
        disabled: _ctx.computedDisabled
      }, _ctx.otherAttrs, {
        onKeydown: _cache[1] || (_cache[1] = withKeys(withModifiers((...args) => _ctx.clickInput && _ctx.clickInput(...args), ["prevent"]), ["enter"]))
      }), null, 16, _hoisted_1$1), [
        [vModelCheckbox, _ctx.wrappedModel]
      ]),
      _cache[2] || (_cache[2] = createElementVNode(
        "span",
        { class: "cdx-toggle-switch__switch" },
        [
          createElementVNode("span", { class: "cdx-toggle-switch__switch__grip" })
        ],
        -1
        /* CACHED */
      )),
      _ctx.$slots.default && _ctx.$slots.default().length ? (openBlock(), createBlock(_component_cdx_label, {
        key: 0,
        class: "cdx-toggle-switch__label",
        "input-id": _ctx.inputId,
        "description-id": _ctx.$slots.description && _ctx.$slots.description().length > 0 ? _ctx.descriptionId : void 0,
        "visually-hidden": _ctx.hideLabel,
        disabled: _ctx.computedDisabled
      }, createSlots({
        default: withCtx(() => [
          renderSlot(_ctx.$slots, "default")
        ]),
        _: 2
        /* DYNAMIC */
      }, [
        _ctx.$slots.description && _ctx.$slots.description().length > 0 ? {
          name: "description",
          fn: withCtx(() => [
            renderSlot(_ctx.$slots, "description")
          ]),
          key: "0"
        } : void 0
      ]), 1032, ["input-id", "description-id", "visually-hidden", "disabled"])) : createCommentVNode("v-if", true)
    ],
    6
    /* CLASS, STYLE */
  );
}
const ToggleSwitch = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["render", _sfc_render$1]]);
const _sfc_main = defineComponent({
  name: "CdxTypeaheadSearch",
  components: {
    CdxIcon,
    CdxMenu,
    CdxSearchInput
  },
  /**
   * Attributes, besides class, will be passed to the TextInput's input element.
   */
  inheritAttrs: false,
  props: {
    /**
     * ID attribute for the form.
     */
    id: {
      type: String,
      required: true
    },
    /**
     * Action attribute for form.
     */
    formAction: {
      type: String,
      required: true
    },
    /**
     * List of search results. See the SearchResult type.
     */
    searchResults: {
      type: Array,
      required: true
    },
    /**
     *
     * Whether to display a submit button.
     */
    useButton: {
      type: Boolean,
      default: false
    },
    // DEPRECATED: set default to 'Search' and remove validator (T368444).
    /**
     * Custom label for the submit button.
     *
     * Omit this prop to use the default value, "Search".
     */
    buttonLabel: {
      type: String,
      default: "",
      validator: (value, props) => {
        if (value.length > 0 && !props.useButton) {
          console.warn(
            "[CdxTypeaheadSearch]: The boolean `useButton` prop is required to show the search button.\n\nRefer to https://doc.wikimedia.org/codex/latest/components/demos/typeahead-search.html#props."
          );
          return false;
        }
        return true;
      }
    },
    /**
     * Initial value for the text input.
     *
     * Triggers an initial `input` event on mount.
     */
    initialInputValue: {
      type: String,
      default: ""
    },
    /**
     * Link for the final menu item.
     *
     * This will typically be a link to the search page for the current search query.
     */
    searchFooterUrl: {
      type: String,
      default: ""
    },
    /**
     * Time interval for debouncing input events, in ms.
     */
    debounceInterval: {
      type: Number,
      default: DebounceInterval
    },
    /**
     * Whether the search query should be highlighted within a search result's title.
     */
    highlightQuery: {
      type: Boolean,
      default: false
    },
    /**
     * Whether to show search results' thumbnails (or a placeholder icon).
     */
    showThumbnail: {
      type: Boolean,
      default: false
    },
    /**
     * Contract the width of the input when unfocused and expand the width of
     * the input when focused to accommodate the extra width of the thumbnails.
     *
     * This prop is ignored if showThumbnail is false.
     */
    autoExpandWidth: {
      type: Boolean,
      default: false
    },
    /**
     * Limit the number of menu items to display before scrolling.
     *
     * Setting this prop to anything falsy will show all menu items.
     *
     * By default, all menu items are shown.
     */
    visibleItemLimit: {
      type: Number,
      default: null
    },
    /**
     * By default, search results will be shown only when the query is not empty.
     * When this prop is set to true, search results will be shown even if the query is empty
     * This is used for empty search recommendations in Vector & MinervaNeue
     */
    showEmptyQueryResults: {
      type: Boolean,
      default: false
    },
    /**
     * When this prop is set to true, the UI will be modified to accommodate mobile devices,
     * including making the button clearable and the removal of the search icon to save space
     */
    isMobileView: {
      type: Boolean,
      default: false
    }
  },
  emits: [
    /**
     * When the text input value changes. Debounced by default.
     *
     * @property {string} value The new input value
     */
    "input",
    /**
     * When a search result is selected.
     *
     * @property {SearchResultClickEvent} event Data for the selected result
     */
    "search-result-click",
    /**
     * When the form is submitted.
     *
     * @property {SearchResultClickEvent} event Data for the selected result
     */
    "submit",
    /**
     * When the user scrolls towards the bottom of the menu.
     *
     * If it is possible to add or load more menu items, then now would be a good moment
     * so that the user can experience infinite scrolling.
     */
    "load-more"
  ],
  setup(props, { attrs, emit, slots }) {
    const form = ref();
    const menu = ref();
    const menuId = useId();
    const translatedSearchResultsLabel = useI18n("cdx-typeahead-search-search-results-label", "Search results");
    const expanded = ref(false);
    const pending = ref(false);
    const showPending = ref(false);
    const isActive = ref(false);
    const inputValue = ref(props.initialInputValue);
    const searchQuery = ref("");
    const highlightedId = computed(() => {
      var _a, _b;
      return (_b = (_a = menu.value) == null ? void 0 : _a.getHighlightedMenuItem()) == null ? void 0 : _b.id;
    });
    const selection = ref(null);
    const menuMessageClass = computed(() => ({
      "cdx-typeahead-search__menu-message--has-thumbnail": props.showThumbnail
    }));
    const selectedResult = computed(
      () => props.searchResults.find(
        (searchResult) => searchResult.value === selection.value
      )
    );
    const footer = computed(
      () => props.searchFooterUrl && searchQuery.value.length > 0 ? { value: MenuFooterValue, url: props.searchFooterUrl } : void 0
    );
    const internalClasses = computed(() => ({
      "cdx-typeahead-search--expanded": expanded.value,
      "cdx-typeahead-search--is-mobile-view": props.isMobileView,
      "cdx-typeahead-search--show-thumbnail": props.showThumbnail,
      "cdx-typeahead-search--auto-expand-width": props.showThumbnail && props.autoExpandWidth && !props.isMobileView
    }));
    const {
      rootClasses,
      rootStyle,
      otherAttrs
    } = useSplitAttributes(attrs, internalClasses);
    function asSearchResult(menuItem) {
      return menuItem;
    }
    const menuConfig = computed(() => ({
      visibleItemLimit: props.visibleItemLimit,
      showThumbnail: props.showThumbnail,
      // In case search queries aren't highlighted, default to a bold label.
      boldLabel: true,
      hideDescriptionOverflow: true
    }));
    let debounceId;
    let pendingDelayId;
    function onUpdateInputValue(newVal, immediate = false) {
      if (selectedResult.value && selectedResult.value.label !== newVal && selectedResult.value.value !== newVal) {
        selection.value = null;
      }
      if (pendingDelayId !== void 0) {
        clearTimeout(pendingDelayId);
        pendingDelayId = void 0;
      }
      if (newVal === "") {
        expanded.value = false;
      } else {
        pending.value = true;
        if (slots["search-results-pending"]) {
          pendingDelayId = setTimeout(() => {
            if (isActive.value) {
              expanded.value = true;
            }
            showPending.value = true;
          }, PendingDelay);
        }
      }
      if (debounceId !== void 0) {
        clearTimeout(debounceId);
        debounceId = void 0;
      }
      const handleUpdateInputValue = () => {
        emit("input", newVal);
      };
      if (immediate) {
        handleUpdateInputValue();
      } else {
        debounceId = setTimeout(() => {
          handleUpdateInputValue();
        }, props.debounceInterval);
      }
    }
    function onUpdateMenuSelection(newVal) {
      var _a;
      if (newVal === MenuFooterValue) {
        selection.value = null;
        inputValue.value = searchQuery.value;
        return;
      }
      selection.value = newVal;
      if (newVal !== null) {
        inputValue.value = selectedResult.value ? (_a = selectedResult.value.label) != null ? _a : String(selectedResult.value.value) : "";
      }
    }
    function onFocus() {
      isActive.value = true;
      if (searchQuery.value || showPending.value || props.showEmptyQueryResults && props.searchResults.length > 0) {
        expanded.value = true;
      }
    }
    function onBlur() {
      isActive.value = false;
      expanded.value = false;
    }
    function onSearchResultClick(searchResult) {
      const _a = searchResult, { id } = _a, resultWithoutId = __objRest(_a, ["id"]);
      if (resultWithoutId.value === MenuFooterValue) {
        emit("search-result-click", {
          searchResult: null,
          index: props.searchResults.length,
          numberOfResults: props.searchResults.length
        });
        return;
      }
      emitSearchResultClick(resultWithoutId);
    }
    function emitSearchResultClick(searchResult) {
      const searchResultClickEvent = {
        searchResult,
        index: props.searchResults.findIndex(
          (r) => r.value === searchResult.value
        ),
        numberOfResults: props.searchResults.length
      };
      emit("search-result-click", searchResultClickEvent);
    }
    function onSearchResultKeyboardNavigation(searchResult) {
      var _a;
      if (searchResult.value === MenuFooterValue) {
        inputValue.value = searchQuery.value;
        return;
      }
      inputValue.value = searchResult.value ? (_a = searchResult.label) != null ? _a : String(searchResult.value) : "";
    }
    function onSearchFooterClick(footerMenuItem) {
      var _a;
      expanded.value = false;
      (_a = menu.value) == null ? void 0 : _a.clearActive();
      onSearchResultClick(footerMenuItem);
    }
    function onSubmit(e) {
      if (selectedResult.value) {
        emitSearchResultClick(selectedResult.value);
        e.stopPropagation();
        window.location.assign(selectedResult.value.url);
        e.preventDefault();
      } else {
        const submitEvent = {
          searchResult: null,
          index: -1,
          numberOfResults: props.searchResults.length
        };
        emit("submit", submitEvent);
      }
    }
    function onKeydown(e) {
      if (!menu.value || !searchQuery.value && !props.showEmptyQueryResults || e.key === " ") {
        return;
      }
      const highlightedResult = menu.value.getHighlightedMenuItem();
      const resultHighlightedViaKeyboard = menu.value.getHighlightedViaKeyboard();
      switch (e.key) {
        case "Enter":
          if (highlightedResult) {
            if (highlightedResult.value === MenuFooterValue && resultHighlightedViaKeyboard) {
              window.location.assign(props.searchFooterUrl);
            } else {
              menu.value.delegateKeyNavigation(e, { prevent: false });
            }
          }
          expanded.value = false;
          break;
        case "Tab":
          expanded.value = false;
          break;
        default:
          menu.value.delegateKeyNavigation(e);
          break;
      }
    }
    onMounted(() => {
      if (props.initialInputValue) {
        onUpdateInputValue(props.initialInputValue, true);
      }
    });
    watch(toRef(props, "searchResults"), () => {
      searchQuery.value = inputValue.value.trim();
      if (isActive.value && // The user has entered input and new results were fetched.
      (pending.value && searchQuery.value.length > 0) || // There are empty search results suggestions to show.
      props.showEmptyQueryResults && props.searchResults.length > 0) {
        expanded.value = true;
      }
      if (pendingDelayId !== void 0) {
        clearTimeout(pendingDelayId);
        pendingDelayId = void 0;
      }
      pending.value = false;
      showPending.value = false;
    });
    return {
      form,
      menu,
      menuId,
      highlightedId,
      selection,
      menuMessageClass,
      footer,
      asSearchResult,
      inputValue,
      searchQuery,
      expanded,
      showPending,
      rootClasses,
      rootStyle,
      otherAttrs,
      menuConfig,
      onUpdateInputValue,
      onUpdateMenuSelection,
      onFocus,
      onBlur,
      onSearchResultClick,
      onSearchResultKeyboardNavigation,
      onSearchFooterClick,
      onSubmit,
      onKeydown,
      MenuFooterValue,
      articleIcon: D3,
      translatedSearchResultsLabel
    };
  },
  methods: {
    /**
     * Focus the component's input element.
     *
     * @public
     */
    focus() {
      const searchInput = this.$refs.searchInput;
      searchInput.focus();
    }
  }
});
const _hoisted_1 = ["id", "action"];
const _hoisted_2 = { class: "cdx-typeahead-search__menu-message__text" };
const _hoisted_3 = { class: "cdx-typeahead-search__menu-message__text" };
const _hoisted_4 = ["href", "onClickCapture"];
const _hoisted_5 = { class: "cdx-menu-item__text cdx-typeahead-search__search-footer__text" };
const _hoisted_6 = { class: "cdx-typeahead-search__search-footer__query" };
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_cdx_icon = resolveComponent("cdx-icon");
  const _component_cdx_menu = resolveComponent("cdx-menu");
  const _component_cdx_search_input = resolveComponent("cdx-search-input");
  return openBlock(), createElementBlock(
    "div",
    {
      class: normalizeClass(["cdx-typeahead-search", _ctx.rootClasses]),
      style: normalizeStyle(_ctx.rootStyle)
    },
    [
      createElementVNode("form", {
        id: _ctx.id,
        ref: "form",
        class: "cdx-typeahead-search__form",
        action: _ctx.formAction,
        onSubmit: _cache[4] || (_cache[4] = (...args) => _ctx.onSubmit && _ctx.onSubmit(...args))
      }, [
        createVNode(_component_cdx_search_input, mergeProps({
          ref: "searchInput",
          modelValue: _ctx.inputValue,
          "onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => _ctx.inputValue = $event),
          "button-label": !_ctx.isMobileView ? _ctx.buttonLabel : void 0,
          "use-button": _ctx.useButton && !_ctx.isMobileView,
          "hide-icon": _ctx.isMobileView,
          clearable: _ctx.isMobileView
        }, _ctx.otherAttrs, {
          class: "cdx-typeahead-search__input",
          name: "search",
          role: "combobox",
          autocomplete: "off",
          "aria-autocomplete": "list",
          "aria-owns": _ctx.showEmptyQueryResults && _ctx.searchQuery.length === 0 ? _ctx.menuId : void 0,
          "aria-controls": !_ctx.showEmptyQueryResults || _ctx.searchQuery.length > 0 ? _ctx.menuId : void 0,
          "aria-expanded": _ctx.expanded,
          "aria-activedescendant": _ctx.highlightedId,
          "onUpdate:modelValue": _ctx.onUpdateInputValue,
          onFocus: _ctx.onFocus,
          onBlur: _ctx.onBlur,
          onKeydown: _ctx.onKeydown
        }), {
          default: withCtx(() => [
            createVNode(_component_cdx_menu, mergeProps({
              id: _ctx.menuId,
              ref: "menu",
              expanded: _ctx.expanded,
              "onUpdate:expanded": _cache[0] || (_cache[0] = ($event) => _ctx.expanded = $event),
              class: "cdx-typeahead-search__menu",
              "render-in-place": "",
              "show-pending": _ctx.showPending,
              selected: _ctx.selection,
              "menu-items": _ctx.searchResults,
              footer: _ctx.footer,
              "search-query": _ctx.highlightQuery ? _ctx.searchQuery : "",
              "show-no-results-slot": _ctx.searchQuery.length > 0 && _ctx.searchResults.length === 0 && _ctx.$slots["search-no-results-text"] && _ctx.$slots["search-no-results-text"]().length > 0
            }, _ctx.menuConfig, {
              "aria-label": _ctx.translatedSearchResultsLabel,
              "onUpdate:selected": _ctx.onUpdateMenuSelection,
              onMenuItemClick: _cache[1] || (_cache[1] = (menuItem) => _ctx.onSearchResultClick(_ctx.asSearchResult(menuItem))),
              onMenuItemKeyboardNavigation: _ctx.onSearchResultKeyboardNavigation,
              onLoadMore: _cache[2] || (_cache[2] = ($event) => _ctx.$emit("load-more"))
            }), {
              pending: withCtx(() => [
                createElementVNode(
                  "div",
                  {
                    class: normalizeClass(["cdx-menu-item__content cdx-typeahead-search__menu-message", _ctx.menuMessageClass])
                  },
                  [
                    createElementVNode("span", _hoisted_2, [
                      renderSlot(_ctx.$slots, "search-results-pending")
                    ])
                  ],
                  2
                  /* CLASS */
                )
              ]),
              "no-results": withCtx(() => [
                createElementVNode(
                  "div",
                  {
                    class: normalizeClass(["cdx-menu-item__content cdx-typeahead-search__menu-message", _ctx.menuMessageClass])
                  },
                  [
                    createElementVNode("span", _hoisted_3, [
                      renderSlot(_ctx.$slots, "search-no-results-text")
                    ])
                  ],
                  2
                  /* CLASS */
                )
              ]),
              default: withCtx(({ menuItem, active }) => [
                menuItem.value === _ctx.MenuFooterValue ? (openBlock(), createElementBlock("a", {
                  key: 0,
                  class: normalizeClass(["cdx-menu-item__content cdx-typeahead-search__search-footer", {
                    "cdx-typeahead-search__search-footer__active": active
                  }]),
                  href: _ctx.asSearchResult(menuItem).url,
                  onClickCapture: withModifiers(($event) => _ctx.onSearchFooterClick(_ctx.asSearchResult(menuItem)), ["stop"])
                }, [
                  createVNode(_component_cdx_icon, {
                    class: "cdx-menu-item__thumbnail cdx-typeahead-search__search-footer__icon",
                    icon: _ctx.articleIcon
                  }, null, 8, ["icon"]),
                  createElementVNode("span", _hoisted_5, [
                    renderSlot(_ctx.$slots, "search-footer-text", { searchQuery: _ctx.searchQuery }, () => [
                      createElementVNode(
                        "strong",
                        _hoisted_6,
                        toDisplayString(_ctx.searchQuery),
                        1
                        /* TEXT */
                      )
                    ])
                  ])
                ], 42, _hoisted_4)) : createCommentVNode("v-if", true)
              ]),
              _: 3
              /* FORWARDED */
            }, 16, ["id", "expanded", "show-pending", "selected", "menu-items", "footer", "search-query", "show-no-results-slot", "aria-label", "onUpdate:selected", "onMenuItemKeyboardNavigation"])
          ]),
          _: 3
          /* FORWARDED */
        }, 16, ["modelValue", "button-label", "use-button", "hide-icon", "clearable", "aria-owns", "aria-controls", "aria-expanded", "aria-activedescendant", "onUpdate:modelValue", "onFocus", "onBlur", "onKeydown"]),
        renderSlot(_ctx.$slots, "default")
      ], 40, _hoisted_1)
    ],
    6
    /* CLASS, STYLE */
  );
}
const TypeaheadSearch = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
let counter = 0;
function useGeneratedId(identifier) {
  var _a;
  const vm = getCurrentInstance();
  const externalId = (_a = vm == null ? void 0 : vm.props.id) != null ? _a : vm == null ? void 0 : vm.attrs.id;
  if (identifier) {
    return "".concat(LibraryPrefix, "-").concat(identifier, "-").concat(counter++);
  } else if (externalId) {
    return "".concat(LibraryPrefix, "-").concat(externalId, "-").concat(counter++);
  } else {
    return "".concat(LibraryPrefix, "-").concat(counter++);
  }
}
export {
  Accordion as CdxAccordion,
  CdxButton,
  ButtonGroup as CdxButtonGroup,
  Card as CdxCard,
  CdxCheckbox,
  CdxChipInput,
  Combobox as CdxCombobox,
  Dialog as CdxDialog,
  Field as CdxField,
  CdxIcon,
  Image$1 as CdxImage,
  InfoChip as CdxInfoChip,
  CdxLabel,
  Lookup as CdxLookup,
  CdxMenu,
  MenuButton as CdxMenuButton,
  CdxMenuItem,
  CdxMessage,
  MultiselectLookup as CdxMultiselectLookup,
  Popover as CdxPopover,
  CdxProgressBar,
  ProgressIndicator as CdxProgressIndicator,
  Radio as CdxRadio,
  CdxSearchInput,
  CdxSearchResultTitle,
  CdxSelect,
  CdxTab,
  Table as CdxTable,
  Tabs as CdxTabs,
  TextArea as CdxTextArea,
  CdxTextInput,
  CdxThumbnail,
  CdxToggleButton,
  ToggleButtonGroup as CdxToggleButtonGroup,
  ToggleSwitch as CdxToggleSwitch,
  CdxTooltip,
  TypeaheadSearch as CdxTypeaheadSearch,
  TableRowIdentifier,
  stringHelpers,
  useComputedDirection,
  useComputedDisabled,
  useComputedLanguage,
  useFieldData,
  useFloatingMenu,
  useGeneratedId,
  useI18n,
  useIntersectionObserver,
  useModelWrapper,
  useResizeObserver,
  useSlotContents,
  useSplitAttributes,
  useWarnOnce
};
