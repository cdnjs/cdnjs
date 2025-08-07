'use strict';

var vue = require('vue');
var config = require('./config-DR826Ki2.js');
var _pluginVue_exportHelper = require('./_plugin-vue_export-helper-Die8u8yB.js');
var Icon = require('./Icon-lsDKE2wQ.js');

var _sfc_main$1 = vue.defineComponent({
  name: "BPaginationButton",
  props: {
    page: {
      type: Object,
      required: true
    },
    tag: {
      type: [String, Object],
      default: "a",
      validator: (value) => {
        return typeof value === "object" || config.config.defaultLinkTags.indexOf(value) >= 0;
      }
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    href() {
      if (this.tag === "a") {
        return "#";
      } else {
        return void 0;
      }
    },
    isDisabled() {
      return this.disabled || this.page.disabled;
    },
    disabledOrUndefined() {
      return this.isDisabled || void 0;
    }
  }
});

function _sfc_render$1(_ctx, _cache, $props, $setup, $data, $options) {
  return vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent(_ctx.tag), vue.mergeProps({
    role: "button",
    href: _ctx.href,
    disabled: _ctx.disabledOrUndefined,
    class: ["pagination-link", { "is-current": _ctx.page.isCurrent, [_ctx.page.class]: true }]
  }, _ctx.$attrs, {
    onClick: vue.withModifiers(_ctx.page.click, ["prevent"]),
    "aria-label": _ctx.page["aria-label"],
    "aria-current": _ctx.page.isCurrent || void 0
  }), {
    default: vue.withCtx(() => [
      vue.renderSlot(_ctx.$slots, "default", {}, () => [
        vue.createTextVNode(
          vue.toDisplayString(_ctx.page.number),
          1
          /* TEXT */
        )
      ])
    ]),
    _: 3
    /* FORWARDED */
  }, 16, ["href", "disabled", "class", "onClick", "aria-label", "aria-current"]);
}
var PaginationButton = /* @__PURE__ */ _pluginVue_exportHelper._export_sfc(_sfc_main$1, [["render", _sfc_render$1]]);

function debounce(func, wait, immediate) {
  let timeout;
  return function(...args) {
    const context = this;
    const later = function() {
      timeout = void 0;
      func.apply(context, args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

var _sfc_main = vue.defineComponent({
  name: "BPagination",
  components: {
    BIcon: Icon.BIcon,
    BPaginationButton: PaginationButton
  },
  props: {
    total: [Number, String],
    perPage: {
      type: [Number, String],
      default: 20
    },
    modelValue: {
      type: [Number, String],
      default: 1
    },
    rangeBefore: {
      type: [Number, String],
      default: 1
    },
    rangeAfter: {
      type: [Number, String],
      default: 1
    },
    size: String,
    simple: Boolean,
    rounded: Boolean,
    order: String,
    iconPack: String,
    iconPrev: {
      type: String,
      default: () => {
        return config.config.defaultIconPrev;
      }
    },
    iconNext: {
      type: String,
      default: () => {
        return config.config.defaultIconNext;
      }
    },
    ariaNextLabel: String,
    ariaPreviousLabel: String,
    ariaPageLabel: String,
    ariaCurrentLabel: String,
    pageInput: {
      type: Boolean,
      default: false
    },
    pageInputPosition: String,
    debouncePageInput: [Number, String]
  },
  data() {
    return {
      inputValue: this.modelValue,
      debounceHandlePageInput: void 0
    };
  },
  emits: {
    /* eslint-disable @typescript-eslint/no-unused-vars */
    change: (_num) => true,
    "update:modelValue": (_num) => true
    /* eslint-enable @typescript-eslint/no-unused-vars */
  },
  computed: {
    rootClasses() {
      return [
        this.order,
        this.size,
        this.pageInputPosition,
        {
          "is-simple": this.simple,
          "is-rounded": this.rounded,
          "has-input": this.pageInput
        }
      ];
    },
    beforeCurrent() {
      return parseInt(this.rangeBefore + "");
    },
    afterCurrent() {
      return parseInt(this.rangeAfter + "");
    },
    /*
    * Total page size (count).
    */
    pageCount() {
      return Math.ceil(+this.total / +this.perPage);
    },
    /*
    * First item of the page (count).
    */
    firstItem() {
      const firstItem = +this.modelValue * +this.perPage - +this.perPage + 1;
      return firstItem >= 0 ? firstItem : 0;
    },
    /*
    * Check if previous button is available.
    */
    hasPrev() {
      return +this.modelValue > 1;
    },
    /*
     * Check if first page button should be visible.
    */
    hasFirst() {
      return +this.modelValue >= 2 + this.beforeCurrent;
    },
    /*
    * Check if first ellipsis should be visible.
    */
    hasFirstEllipsis() {
      return +this.modelValue >= this.beforeCurrent + 4;
    },
    /*
    * Check if last page button should be visible.
    */
    hasLast() {
      return +this.modelValue <= this.pageCount - (1 + this.afterCurrent);
    },
    /*
    * Check if last ellipsis should be visible.
    */
    hasLastEllipsis() {
      return +this.modelValue < this.pageCount - (2 + this.afterCurrent);
    },
    /*
    * Check if next button is available.
    */
    hasNext() {
      return +this.modelValue < this.pageCount;
    },
    /*
    * Get near pages, 1 before and 1 after the current.
    * Also add the click event to the array.
    */
    pagesInRange() {
      if (this.simple) return;
      let left = Math.max(1, +this.modelValue - this.beforeCurrent);
      if (left - 1 === 2) {
        left--;
      }
      let right = Math.min(+this.modelValue + this.afterCurrent, this.pageCount);
      if (this.pageCount - right === 2) {
        right++;
      }
      const pages = [];
      for (let i = left; i <= right; i++) {
        pages.push(this.getPage(i));
      }
      return pages;
    }
  },
  watch: {
    /*
    * If current page is trying to be greater than page count, set to last.
    */
    pageCount(value) {
      if (this.modelValue > value) this.last();
    },
    modelValue(value) {
      this.inputValue = value;
    },
    debouncePageInput: {
      handler(value) {
        this.debounceHandlePageInput = debounce(
          this.handleOnInputPageChange,
          value
        );
      },
      immediate: true
    }
  },
  methods: {
    /*
    * Previous button click listener.
    */
    prev(event) {
      this.changePage(+this.modelValue - 1, event);
    },
    /*
     * Next button click listener.
    */
    next(event) {
      this.changePage(+this.modelValue + 1, event);
    },
    /*
     * First button click listener.
    */
    first(event) {
      this.changePage(1, event);
    },
    /*
    * Last button click listener.
    */
    last(event) {
      this.changePage(this.pageCount, event);
    },
    changePage(num, event) {
      if (this.modelValue === num || num < 1 || num > this.pageCount) return;
      this.$emit("update:modelValue", num);
      this.$emit("change", num);
      if (event && event.target) {
        this.$nextTick(() => event.target.focus());
      }
    },
    getPage(num, options = {}) {
      return {
        number: num,
        isCurrent: this.modelValue === num,
        click: (event) => this.changePage(num, event),
        input: (event, inputNum) => this.changePage(+inputNum, event),
        disabled: options.disabled || false,
        class: options.class || "",
        "aria-label": options["aria-label"] || this.getAriaPageLabel(num, this.modelValue === num)
      };
    },
    /*
    * Get text for aria-label according to page number.
    */
    getAriaPageLabel(pageNumber, isCurrent) {
      if (this.ariaPageLabel && (!isCurrent || !this.ariaCurrentLabel)) {
        return this.ariaPageLabel + " " + pageNumber + ".";
      } else if (this.ariaPageLabel && isCurrent && this.ariaCurrentLabel) {
        return this.ariaCurrentLabel + ", " + this.ariaPageLabel + " " + pageNumber + ".";
      }
      return null;
    },
    handleOnInputPageChange(event) {
      this.getPage(+this.inputValue).input(event, this.inputValue);
    },
    handleOnInputDebounce(event) {
      if (this.debouncePageInput) {
        this.debounceHandlePageInput(event);
      } else {
        this.handleOnInputPageChange(event);
      }
    },
    handleOnKeyPress(event) {
      const ASCIICode = event.which || event.keyCode;
      if (ASCIICode >= 48 && ASCIICode <= 57) {
        return true;
      } else {
        return event.preventDefault();
      }
    },
    handleAllowableInputPageRange(event) {
      const target = event.target;
      if (+target.value > 0 && +target.value <= this.pageCount) {
        this.handleOnInputValue(event);
      } else {
        this.inputValue = 1;
        this.inputValue = "";
      }
    },
    handleOnInputValue(event) {
      const inputValue = +event.target.value;
      this.inputValue = inputValue;
      if (Number.isInteger(this.inputValue)) {
        this.handleOnInputDebounce(event);
      } else {
        this.inputValue = this.modelValue;
      }
    }
  }
});

const _hoisted_1 = { class: "control pagination-input" };
const _hoisted_2 = ["value", "size", "maxlength"];
const _hoisted_3 = {
  key: 4,
  class: "info"
};
const _hoisted_4 = {
  key: 5,
  class: "pagination-list"
};
const _hoisted_5 = { key: 0 };
const _hoisted_6 = { key: 1 };
const _hoisted_7 = /* @__PURE__ */ vue.createElementVNode(
  "span",
  { class: "pagination-ellipsis" },
  "…",
  -1
  /* HOISTED */
);
const _hoisted_8 = [
  _hoisted_7
];
const _hoisted_9 = { key: 2 };
const _hoisted_10 = /* @__PURE__ */ vue.createElementVNode(
  "span",
  { class: "pagination-ellipsis" },
  "…",
  -1
  /* HOISTED */
);
const _hoisted_11 = [
  _hoisted_10
];
const _hoisted_12 = { key: 3 };
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_b_icon = vue.resolveComponent("b-icon");
  const _component_BPaginationButton = vue.resolveComponent("BPaginationButton");
  return vue.openBlock(), vue.createElementBlock(
    "nav",
    {
      class: vue.normalizeClass(["pagination", _ctx.rootClasses])
    },
    [
      _ctx.$slots.previous ? vue.renderSlot(_ctx.$slots, "previous", {
        key: 0,
        page: _ctx.getPage(+_ctx.modelValue - 1, {
          disabled: !_ctx.hasPrev,
          class: "pagination-previous",
          "aria-label": _ctx.ariaPreviousLabel
        })
      }, () => [
        vue.createVNode(_component_b_icon, {
          icon: _ctx.iconPrev,
          pack: _ctx.iconPack,
          both: "",
          "aria-hidden": "true"
        }, null, 8, ["icon", "pack"])
      ]) : (vue.openBlock(), vue.createBlock(_component_BPaginationButton, {
        key: 1,
        class: "pagination-previous",
        disabled: !_ctx.hasPrev,
        page: _ctx.getPage(+_ctx.modelValue - 1),
        "aria-label": _ctx.ariaPreviousLabel
      }, {
        default: vue.withCtx(() => [
          vue.createVNode(_component_b_icon, {
            icon: _ctx.iconPrev,
            pack: _ctx.iconPack,
            both: "",
            "aria-hidden": "true"
          }, null, 8, ["icon", "pack"])
        ]),
        _: 1
        /* STABLE */
      }, 8, ["disabled", "page", "aria-label"])),
      _ctx.$slots.next ? vue.renderSlot(_ctx.$slots, "next", {
        key: 2,
        page: _ctx.getPage(+_ctx.modelValue + 1, {
          disabled: !_ctx.hasNext,
          class: "pagination-next",
          "aria-label": _ctx.ariaNextLabel
        })
      }, () => [
        vue.createVNode(_component_b_icon, {
          icon: _ctx.iconNext,
          pack: _ctx.iconPack,
          both: "",
          "aria-hidden": "true"
        }, null, 8, ["icon", "pack"])
      ]) : (vue.openBlock(), vue.createBlock(_component_BPaginationButton, {
        key: 3,
        class: "pagination-next",
        disabled: !_ctx.hasNext,
        page: _ctx.getPage(+_ctx.modelValue + 1),
        "aria-label": _ctx.ariaNextLabel
      }, {
        default: vue.withCtx(() => [
          vue.createVNode(_component_b_icon, {
            icon: _ctx.iconNext,
            pack: _ctx.iconPack,
            both: "",
            "aria-hidden": "true"
          }, null, 8, ["icon", "pack"])
        ]),
        _: 1
        /* STABLE */
      }, 8, ["disabled", "page", "aria-label"])),
      vue.createElementVNode("div", _hoisted_1, [
        _ctx.pageInput ? (vue.openBlock(), vue.createElementBlock("input", {
          key: 0,
          class: "input",
          value: _ctx.inputValue,
          onInput: _cache[0] || (_cache[0] = (...args) => _ctx.handleAllowableInputPageRange && _ctx.handleAllowableInputPageRange(...args)),
          onKeypress: _cache[1] || (_cache[1] = (...args) => _ctx.handleOnKeyPress && _ctx.handleOnKeyPress(...args)),
          size: _ctx.pageCount.toString().length,
          maxlength: _ctx.pageCount.toString().length
        }, null, 40, _hoisted_2)) : vue.createCommentVNode("v-if", true)
      ]),
      _ctx.simple ? (vue.openBlock(), vue.createElementBlock("small", _hoisted_3, [
        _ctx.perPage == 1 ? (vue.openBlock(), vue.createElementBlock(
          vue.Fragment,
          { key: 0 },
          [
            vue.createTextVNode(
              vue.toDisplayString(_ctx.firstItem) + " / " + vue.toDisplayString(_ctx.total),
              1
              /* TEXT */
            )
          ],
          64
          /* STABLE_FRAGMENT */
        )) : (vue.openBlock(), vue.createElementBlock(
          vue.Fragment,
          { key: 1 },
          [
            vue.createTextVNode(
              vue.toDisplayString(_ctx.firstItem) + "-" + vue.toDisplayString(Math.min(+_ctx.modelValue * +_ctx.perPage, +_ctx.total)) + " / " + vue.toDisplayString(_ctx.total),
              1
              /* TEXT */
            )
          ],
          64
          /* STABLE_FRAGMENT */
        ))
      ])) : (vue.openBlock(), vue.createElementBlock("ul", _hoisted_4, [
        vue.createCommentVNode("First"),
        _ctx.hasFirst ? (vue.openBlock(), vue.createElementBlock("li", _hoisted_5, [
          _ctx.$slots.default ? vue.renderSlot(_ctx.$slots, "default", {
            key: 0,
            page: _ctx.getPage(1)
          }) : (vue.openBlock(), vue.createBlock(_component_BPaginationButton, {
            key: 1,
            page: _ctx.getPage(1)
          }, null, 8, ["page"]))
        ])) : vue.createCommentVNode("v-if", true),
        _ctx.hasFirstEllipsis ? (vue.openBlock(), vue.createElementBlock("li", _hoisted_6, [..._hoisted_8])) : vue.createCommentVNode("v-if", true),
        vue.createCommentVNode("Pages"),
        (vue.openBlock(true), vue.createElementBlock(
          vue.Fragment,
          null,
          vue.renderList(_ctx.pagesInRange, (page) => {
            return vue.openBlock(), vue.createElementBlock("li", {
              key: page.number
            }, [
              _ctx.$slots.default ? vue.renderSlot(_ctx.$slots, "default", {
                key: 0,
                page
              }) : (vue.openBlock(), vue.createBlock(_component_BPaginationButton, {
                key: 1,
                page
              }, null, 8, ["page"]))
            ]);
          }),
          128
          /* KEYED_FRAGMENT */
        )),
        vue.createCommentVNode("Last"),
        _ctx.hasLastEllipsis ? (vue.openBlock(), vue.createElementBlock("li", _hoisted_9, [..._hoisted_11])) : vue.createCommentVNode("v-if", true),
        _ctx.hasLast ? (vue.openBlock(), vue.createElementBlock("li", _hoisted_12, [
          _ctx.$slots.default ? vue.renderSlot(_ctx.$slots, "default", {
            key: 0,
            page: _ctx.getPage(_ctx.pageCount)
          }) : (vue.openBlock(), vue.createBlock(_component_BPaginationButton, {
            key: 1,
            page: _ctx.getPage(_ctx.pageCount)
          }, null, 8, ["page"]))
        ])) : vue.createCommentVNode("v-if", true)
      ]))
    ],
    2
    /* CLASS */
  );
}
var BPagination = /* @__PURE__ */ _pluginVue_exportHelper._export_sfc(_sfc_main, [["render", _sfc_render]]);

exports.BPagination = BPagination;
exports.PaginationButton = PaginationButton;
exports.debounce = debounce;
