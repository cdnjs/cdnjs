'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var vue = require('vue');
var helpers = require('./helpers.js');
var Tag = require('./Tag-BprnwJJ1.js');
var Autocomplete = require('./Autocomplete-DEUs3z7g.js');
var config = require('./config-DR826Ki2.js');
var CompatFallthroughMixin = require('./CompatFallthroughMixin-hhK0Gkhr.js');
var FormElementMixin = require('./FormElementMixin-DavX4iOv.js');
var _pluginVue_exportHelper = require('./_plugin-vue_export-helper-Die8u8yB.js');
var plugins = require('./plugins-DbyYGVpp.js');
require('./Icon-lsDKE2wQ.js');
require('./Input-BcloGeZ3.js');

var _sfc_main = vue.defineComponent({
  name: "BTaginput",
  components: {
    BAutocomplete: Autocomplete.BAutocomplete,
    BTag: Tag.BTag
  },
  mixins: [CompatFallthroughMixin.CompatFallthroughMixin, FormElementMixin.FormElementMixin],
  props: {
    modelValue: {
      type: Array,
      default: () => []
    },
    data: {
      type: Array,
      default: () => []
    },
    type: String,
    closeType: String,
    attached: {
      type: Boolean,
      default: false
    },
    maxtags: Number,
    hasCounter: {
      type: Boolean,
      default: () => config.config.defaultTaginputHasCounter
    },
    field: {
      type: String,
      default: "value"
    },
    autocomplete: Boolean,
    groupField: String,
    groupOptions: String,
    nativeAutocomplete: String,
    openOnFocus: Boolean,
    keepOpen: {
      type: Boolean,
      default: true
    },
    keepFirst: Boolean,
    disabled: Boolean,
    ellipsis: Boolean,
    closable: {
      type: Boolean,
      default: true
    },
    ariaCloseLabel: String,
    confirmKeys: {
      type: Array,
      default: () => [",", "Tab", "Enter"]
    },
    removeOnKeys: {
      type: Array,
      default: () => ["Backspace"]
    },
    allowNew: Boolean,
    onPasteSeparators: {
      type: Array,
      default: () => [","]
    },
    beforeAdding: {
      type: Function,
      default: () => true
    },
    allowDuplicates: {
      type: Boolean,
      default: false
    },
    checkInfiniteScroll: {
      type: Boolean,
      default: false
    },
    createTag: {
      type: Function,
      default: (tag) => tag
    },
    appendToBody: Boolean
  },
  emits: {
    /* eslint-disable @typescript-eslint/no-unused-vars */
    add: (tag) => true,
    "infinite-scroll": () => true,
    remove: (tag) => true,
    typing: (value) => true,
    "update:modelValue": (tags) => true
    /* eslint-enable @typescript-eslint/no-unused-vars */
  },
  data() {
    return {
      tags: Array.isArray(this.modelValue) ? this.modelValue.slice(0) : this.modelValue || [],
      newTag: "",
      isComposing: false,
      _elementRef: "autocomplete",
      _isTaginput: true,
      requestID: null
    };
  },
  computed: {
    rootClasses() {
      return {
        "is-expanded": this.expanded
      };
    },
    containerClasses() {
      return {
        "is-focused": this.isFocused,
        "is-focusable": this.hasInput
      };
    },
    valueLength() {
      return this.newTag.trim().length;
    },
    hasDefaultSlot() {
      return !!this.$slots.default;
    },
    hasEmptySlot() {
      return !!this.$slots.empty;
    },
    hasHeaderSlot() {
      return !!this.$slots.header;
    },
    hasFooterSlot() {
      return !!this.$slots.footer;
    },
    /*
     * Show the input field if a maxtags hasn't been set or reached.
     */
    hasInput() {
      return this.maxtags == null || this.maxtags === 1 || this.tagsLength < this.maxtags;
    },
    tagsLength() {
      return this.tags.length;
    },
    /*
     * If Taginput has onPasteSeparators prop,
     * returning new RegExp used to split pasted string.
     */
    separatorsAsRegExp() {
      const sep = this.onPasteSeparators;
      return sep.length ? new RegExp(sep.map((s) => {
        return s ? s.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&") : null;
      }).join("|"), "g") : null;
    },
    disabledOrUndefined() {
      return this.disabled || void 0;
    }
  },
  watch: {
    /*
     * When v-model is changed set internal value.
     */
    modelValue(value) {
      this.tags = Array.isArray(value) ? value.slice(0) : value || [];
    },
    hasInput() {
      if (!this.hasInput) this.onBlur();
    }
  },
  methods: {
    addTag(tag) {
      const tagToAdd = tag || this.newTag.trim();
      if (tagToAdd) {
        if (!this.autocomplete) {
          const reg = this.separatorsAsRegExp;
          if (reg && tagToAdd.match(reg)) {
            tagToAdd.split(reg).map((t) => t.trim()).filter((t) => t.length !== 0).map(this.addTag);
            return;
          }
        }
        const add = !this.allowDuplicates ? this.tags.indexOf(tagToAdd) === -1 : true;
        if (add && this.beforeAdding(tagToAdd)) {
          if (this.maxtags === 1) {
            this.tags = [];
          }
          this.tags.push(this.createTag(tagToAdd));
          this.$emit("update:modelValue", this.tags);
          this.$emit("add", tagToAdd);
        }
        this.requestID = requestAnimationFrame(() => {
          this.newTag = "";
          this.$emit("typing", "");
        });
      }
    },
    getNormalizedTagText(tag) {
      if (typeof tag === "object") {
        tag = helpers.getValueByPath(tag, this.field);
      }
      return `${tag}`;
    },
    customOnBlur(event) {
      if (!this.autocomplete) this.addTag();
      this.onBlur(event);
    },
    onSelect(option) {
      if (!option) return;
      this.addTag(option);
      this.$nextTick(() => {
        this.newTag = "";
      });
    },
    removeTag(index, event) {
      const tag = this.tags.splice(index, 1)[0];
      this.$emit("update:modelValue", this.tags);
      this.$emit("remove", tag);
      if (event) event.stopPropagation();
      if (this.openOnFocus && this.$refs.autocomplete) {
        this.$refs.autocomplete.focus();
      }
      return tag;
    },
    removeLastTag() {
      if (this.tagsLength > 0) {
        this.removeTag(this.tagsLength - 1);
      }
    },
    keydown(event) {
      const { key } = event;
      if (this.removeOnKeys.indexOf(key) !== -1 && !this.newTag.length) {
        this.removeLastTag();
      }
      if (this.autocomplete && !this.allowNew) return;
      if (this.confirmKeys.indexOf(key) >= 0) {
        if (key !== "Tab") event.preventDefault();
        if (key === "Enter" && this.isComposing) return;
        this.addTag();
      }
    },
    onTyping(event) {
      this.$emit("typing", typeof event === "number" ? event : event == null ? void 0 : event.trim());
    },
    emitInfiniteScroll() {
      this.$emit("infinite-scroll");
    }
  },
  beforeUnmount() {
    cancelAnimationFrame(this.requestID);
  }
});

const _hoisted_1 = ["disabled"];
const _hoisted_2 = {
  key: 0,
  class: "help counter"
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_b_tag = vue.resolveComponent("b-tag");
  const _component_b_autocomplete = vue.resolveComponent("b-autocomplete");
  return vue.openBlock(), vue.createElementBlock(
    "div",
    vue.mergeProps({
      class: ["taginput control", _ctx.rootClasses]
    }, _ctx.rootAttrs),
    [
      vue.createElementVNode("div", {
        class: vue.normalizeClass(["taginput-container input", [_ctx.statusType, _ctx.size, _ctx.containerClasses]]),
        disabled: _ctx.disabledOrUndefined,
        onClick: _cache[3] || (_cache[3] = ($event) => _ctx.hasInput && _ctx.focus())
      }, [
        vue.renderSlot(_ctx.$slots, "selected", { tags: _ctx.tags }, () => [
          (vue.openBlock(true), vue.createElementBlock(
            vue.Fragment,
            null,
            vue.renderList(_ctx.tags, (tag, index) => {
              return vue.openBlock(), vue.createBlock(_component_b_tag, {
                key: _ctx.getNormalizedTagText(tag) + index,
                type: _ctx.type,
                "close-type": _ctx.closeType,
                size: _ctx.size,
                rounded: _ctx.rounded,
                attached: _ctx.attached,
                tabstop: false,
                disabled: _ctx.disabledOrUndefined,
                ellipsis: _ctx.ellipsis,
                closable: _ctx.closable,
                "aria-close-label": _ctx.ariaCloseLabel,
                title: _ctx.ellipsis && _ctx.getNormalizedTagText(tag),
                onClose: ($event) => _ctx.removeTag(index, $event)
              }, {
                default: vue.withCtx(() => [
                  vue.renderSlot(_ctx.$slots, "tag", { tag }, () => [
                    vue.createTextVNode(
                      vue.toDisplayString(_ctx.getNormalizedTagText(tag)),
                      1
                      /* TEXT */
                    )
                  ])
                ]),
                _: 2
                /* DYNAMIC */
              }, 1032, ["type", "close-type", "size", "rounded", "attached", "disabled", "ellipsis", "closable", "aria-close-label", "title", "onClose"]);
            }),
            128
            /* KEYED_FRAGMENT */
          ))
        ]),
        _ctx.hasInput ? (vue.openBlock(), vue.createBlock(_component_b_autocomplete, vue.mergeProps({
          key: 0,
          ref: "autocomplete",
          modelValue: _ctx.newTag,
          "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => _ctx.newTag = $event)
        }, _ctx.fallthroughAttrs, {
          data: _ctx.data,
          field: _ctx.field,
          icon: _ctx.icon,
          "icon-pack": _ctx.iconPack,
          maxlength: _ctx.maxlength,
          "has-counter": false,
          size: _ctx.size,
          disabled: _ctx.disabledOrUndefined,
          loading: _ctx.loading,
          autocomplete: _ctx.nativeAutocomplete,
          "open-on-focus": _ctx.openOnFocus,
          "keep-open": _ctx.keepOpen,
          "keep-first": _ctx.keepFirst,
          "group-field": _ctx.groupField,
          "group-options": _ctx.groupOptions,
          "use-html5-validation": _ctx.useHtml5Validation,
          "check-infinite-scroll": _ctx.checkInfiniteScroll,
          "append-to-body": _ctx.appendToBody,
          "confirm-keys": _ctx.confirmKeys,
          onTyping: _ctx.onTyping,
          onFocus: _ctx.onFocus,
          onBlur: _ctx.customOnBlur,
          onKeydown: _ctx.keydown,
          onCompositionstart: _cache[1] || (_cache[1] = ($event) => _ctx.isComposing = true),
          onCompositionend: _cache[2] || (_cache[2] = ($event) => _ctx.isComposing = false),
          onSelect: _ctx.onSelect,
          onInfiniteScroll: _ctx.emitInfiniteScroll
        }), vue.createSlots({
          _: 2
          /* DYNAMIC */
        }, [
          _ctx.hasHeaderSlot ? {
            name: "header",
            fn: vue.withCtx(() => [
              vue.renderSlot(_ctx.$slots, "header")
            ]),
            key: "0"
          } : void 0,
          _ctx.hasDefaultSlot ? {
            name: "default",
            fn: vue.withCtx((props) => [
              vue.renderSlot(_ctx.$slots, "default", {
                option: props.option,
                index: props.index
              })
            ]),
            key: "1"
          } : void 0,
          _ctx.hasEmptySlot ? {
            name: "empty",
            fn: vue.withCtx(() => [
              vue.renderSlot(_ctx.$slots, "empty")
            ]),
            key: "2"
          } : void 0,
          _ctx.hasFooterSlot ? {
            name: "footer",
            fn: vue.withCtx(() => [
              vue.renderSlot(_ctx.$slots, "footer")
            ]),
            key: "3"
          } : void 0
        ]), 1040, ["modelValue", "data", "field", "icon", "icon-pack", "maxlength", "size", "disabled", "loading", "autocomplete", "open-on-focus", "keep-open", "keep-first", "group-field", "group-options", "use-html5-validation", "check-infinite-scroll", "append-to-body", "confirm-keys", "onTyping", "onFocus", "onBlur", "onKeydown", "onSelect", "onInfiniteScroll"])) : vue.createCommentVNode("v-if", true)
      ], 10, _hoisted_1),
      _ctx.hasCounter && (_ctx.maxtags || _ctx.maxlength) ? (vue.openBlock(), vue.createElementBlock("small", _hoisted_2, [
        _ctx.maxlength && _ctx.valueLength > 0 ? (vue.openBlock(), vue.createElementBlock(
          vue.Fragment,
          { key: 0 },
          [
            vue.createTextVNode(
              vue.toDisplayString(_ctx.valueLength) + " / " + vue.toDisplayString(_ctx.maxlength),
              1
              /* TEXT */
            )
          ],
          64
          /* STABLE_FRAGMENT */
        )) : _ctx.maxtags ? (vue.openBlock(), vue.createElementBlock(
          vue.Fragment,
          { key: 1 },
          [
            vue.createTextVNode(
              vue.toDisplayString(_ctx.tagsLength) + " / " + vue.toDisplayString(_ctx.maxtags),
              1
              /* TEXT */
            )
          ],
          64
          /* STABLE_FRAGMENT */
        )) : vue.createCommentVNode("v-if", true)
      ])) : vue.createCommentVNode("v-if", true)
    ],
    16
    /* FULL_PROPS */
  );
}
var Taginput = /* @__PURE__ */ _pluginVue_exportHelper._export_sfc(_sfc_main, [["render", _sfc_render]]);

const Plugin = {
  install(Vue) {
    plugins.registerComponent(Vue, Taginput);
  }
};

exports.BTaginput = Taginput;
exports.default = Plugin;
