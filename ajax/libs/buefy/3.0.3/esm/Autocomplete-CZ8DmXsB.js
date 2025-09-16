import { defineComponent, resolveComponent, createElementBlock, openBlock, mergeProps, createVNode, withKeys, withModifiers, Transition, withCtx, withDirectives, createElementVNode, normalizeStyle, normalizeClass, createCommentVNode, renderSlot, Fragment, renderList, toDisplayString, vShow } from 'vue';
import { removeElement, createAbsoluteElement, getValueByPath, isCustomElement, toCssWidth } from './helpers.js';
import { C as CompatFallthroughMixin } from './CompatFallthroughMixin-C8LPuwDr.js';
import { F as FormElementMixin } from './FormElementMixin-Dd_wkBN5.js';
import { B as BInput } from './Input-C4L520az.js';
import { _ as _export_sfc } from './_plugin-vue_export-helper-OJRSZE6i.js';

var _sfc_main = defineComponent({
  name: "BAutocomplete",
  components: { BInput },
  mixins: [CompatFallthroughMixin, FormElementMixin],
  props: {
    modelValue: [Number, String, null],
    data: {
      type: Array,
      default: () => []
    },
    field: {
      type: String,
      default: "value"
    },
    keepFirst: Boolean,
    clearOnSelect: Boolean,
    openOnFocus: Boolean,
    customFormatter: {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      type: Function
    },
    checkInfiniteScroll: Boolean,
    keepOpen: Boolean,
    selectOnClickOutside: Boolean,
    clearable: Boolean,
    maxHeight: [String, Number],
    dropdownPosition: {
      type: String,
      default: "auto"
    },
    groupField: String,
    groupOptions: String,
    iconRight: String,
    iconRightClickable: Boolean,
    appendToBody: Boolean,
    type: {
      type: String,
      default: "text"
    },
    confirmKeys: {
      type: Array,
      default: () => ["Tab", "Enter"]
    },
    selectableHeader: Boolean,
    selectableFooter: Boolean,
    // Native options to use in HTML5 validation
    autocomplete: String
  },
  emits: {
    /* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
    active: (active) => true,
    blur: (event) => true,
    focus: (event) => true,
    "icon-click": (event) => true,
    "icon-right-click": (event) => true,
    "infinite-scroll": () => true,
    select: (selected, event) => true,
    "select-footer": (event) => true,
    "select-header": (event) => true,
    typing: (value) => true,
    "update:modelValue": (value) => true
    /* eslint-enable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
  },
  data() {
    return {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      selected: null,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      hovered: null,
      headerHovered: null,
      footerHovered: null,
      isActive: false,
      newValue: this.modelValue,
      newAutocomplete: this.autocomplete || "off",
      ariaAutocomplete: this.keepFirst ? "both" : "list",
      isListInViewportVertically: true,
      hasFocus: false,
      style: {},
      _isAutocomplete: true,
      _elementRef: "input",
      _bodyEl: void 0,
      // Used to append to body
      timeOutID: void 0
    };
  },
  computed: {
    computedData() {
      const { groupField, groupOptions } = this;
      if (groupField) {
        if (groupOptions) {
          const newData = [];
          this.data.forEach((option) => {
            const group = getValueByPath(option, groupField);
            const items = getValueByPath(option, groupOptions);
            newData.push({ group, items });
          });
          return newData;
        } else {
          const tmp = {};
          this.data.forEach((option) => {
            const group = getValueByPath(option, groupField);
            if (!tmp[group]) tmp[group] = [];
            tmp[group].push(option);
          });
          const newData = [];
          Object.keys(tmp).forEach((group) => {
            newData.push({ group, items: tmp[group] });
          });
          return newData;
        }
      }
      return [{ items: this.data }];
    },
    isEmpty() {
      if (!this.computedData) return true;
      return !this.computedData.some(
        (element) => element.items && element.items.length
      );
    },
    /*
     * White-listed items to not close when clicked.
     * Add input, dropdown and all children.
     */
    whiteList() {
      var _a;
      this.computedData;
      const whiteList = [];
      whiteList.push(this.$refs.input.$el.querySelector("input"));
      whiteList.push(this.$refs.dropdown);
      if (this.$refs.dropdown != null) {
        const children = this.$refs.dropdown.querySelectorAll("*");
        for (const child of children) {
          whiteList.push(child);
        }
      }
      if (((_a = this.$parent) == null ? void 0 : _a.$data)._isTaginput) {
        whiteList.push(this.$parent.$el);
        const tagInputChildren = this.$parent.$el.querySelectorAll("*");
        for (const tagInputChild of tagInputChildren) {
          whiteList.push(tagInputChild);
        }
      }
      return whiteList;
    },
    /*
     * Check if exists default slot
     */
    hasDefaultSlot() {
      return !!this.$slots.default;
    },
    /*
     * Check if exists group slot
     */
    hasGroupSlot() {
      return !!this.$slots.group;
    },
    /*
     * Check if exists "empty" slot
     */
    hasEmptySlot() {
      return !!this.$slots.empty;
    },
    /*
     * Check if exists "header" slot
     */
    hasHeaderSlot() {
      return !!this.$slots.header;
    },
    /*
     * Check if exists "footer" slot
     */
    hasFooterSlot() {
      return !!this.$slots.footer;
    },
    /*
     * Apply dropdownPosition property
     */
    isOpenedTop() {
      return this.dropdownPosition === "top" || this.dropdownPosition === "auto" && !this.isListInViewportVertically;
    },
    newIconRight() {
      if (this.clearable && this.newValue) {
        return "close-circle";
      }
      return this.iconRight;
    },
    newIconRightClickable() {
      if (this.clearable) {
        return true;
      }
      return this.iconRightClickable;
    },
    contentStyle() {
      return {
        maxHeight: toCssWidth(this.maxHeight) || void 0
      };
    }
  },
  watch: {
    /*
     * When dropdown is toggled, check the visibility to know when
     * to open upwards.
     */
    isActive(active) {
      if (this.dropdownPosition === "auto") {
        if (active) {
          this.calcDropdownInViewportVertical();
        } else {
          this.timeOutID = setTimeout(() => {
            this.calcDropdownInViewportVertical();
          }, 100);
        }
      }
      this.$nextTick(() => {
        this.$emit("active", active);
      });
    },
    /*
     * When checkInfiniteScroll property changes scroll event should be removed or added
     */
    checkInfiniteScroll(checkInfiniteScroll) {
      if (!this.$refs.dropdown) return;
      const list = this.$refs.dropdown.querySelector(
        ".dropdown-content"
      );
      if (!list) return;
      if (checkInfiniteScroll === true) {
        list.addEventListener(
          "scroll",
          this.checkIfReachedTheEndOfScroll
        );
        return;
      }
      list.removeEventListener(
        "scroll",
        this.checkIfReachedTheEndOfScroll
      );
    },
    /*
     * When updating input's value
     *   1. Emit changes
     *   2. If value isn't the same as selected, set null
     *   3. Close dropdown if value is clear or else open it
     */
    newValue(value) {
      this.$emit("update:modelValue", value);
      const currentValue = this.getValue(this.selected);
      if (currentValue !== void 0 && currentValue !== null && currentValue !== value) {
        this.setSelected(null, false);
      }
      if (this.hasFocus && (!this.openOnFocus || value !== "")) {
        this.isActive = value !== "" && value !== void 0 && value !== null;
      }
    },
    /*
     * When v-model is changed:
     *   1. Update internal value.
     *   2. If it's invalid, validate again.
     */
    modelValue(value) {
      this.newValue = value;
    },
    keepFirst(value) {
      this.ariaAutocomplete = value ? "both" : "list";
    },
    /*
     * Select first option if "keep-first
     */
    data() {
      if (this.keepFirst) {
        this.$nextTick(() => {
          if (this.isActive) {
            this.selectFirstOption(this.computedData);
          } else {
            this.setHovered(null);
          }
        });
      } else {
        if (this.hovered) {
          const hoveredValue = this.getValue(this.hovered);
          const data = this.computedData.map((d) => d.items).reduce((a, b) => [...a, ...b], []);
          if (!data.some((d) => this.getValue(d) === hoveredValue)) {
            this.setHovered(null);
          }
        }
      }
    },
    /*
     * When appendToBody property changes, handle the transition properly
     */
    appendToBody(newValue, oldValue) {
      if (newValue && !oldValue) {
        if (this.isActive && this.$refs.dropdown && !this.$data._bodyEl) {
          this.$data._bodyEl = createAbsoluteElement(
            this.$refs.dropdown
          );
          this.updateAppendToBody();
        }
      } else if (!newValue && oldValue) {
        if (this.$data._bodyEl) {
          removeElement(this.$data._bodyEl);
          this.$data._bodyEl = void 0;
        }
      }
    }
  },
  methods: {
    /*
     * Set which option is currently hovered.
     */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    setHovered(option) {
      if (option === void 0) return;
      this.hovered = option;
    },
    /*
     * Set which option is currently selected, update v-model,
     * update input value and close dropdown.
     */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    setSelected(option, closeDropdown = true, event) {
      if (option === void 0) return;
      this.selected = option;
      this.$emit("select", this.selected, event);
      if (this.selected !== null) {
        if (this.clearOnSelect) {
          this.newValue = "";
        } else {
          this.newValue = this.getValue(this.selected);
        }
        this.setHovered(null);
      }
      closeDropdown && this.$nextTick(() => {
        this.isActive = false;
      });
      this.checkValidity();
    },
    /*
     * Select first option
     */
    selectFirstOption(computedData) {
      this.$nextTick(() => {
        const nonEmptyElements = computedData.filter(
          (element) => element.items && element.items.length
        );
        if (nonEmptyElements.length) {
          const option = nonEmptyElements[0].items[0];
          this.setHovered(option);
        } else {
          this.setHovered(null);
        }
      });
    },
    /*
     * Find index of hovered item in data array by comparing display values
     * instead of object references. This fixes the bug with computed data
     * where proxy objects cause indexOf to fail.
     */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    findHoveredIndex(data) {
      if (this.hovered === null || this.hovered === void 0) {
        return -1;
      }
      const exactIndex = data.indexOf(this.hovered);
      if (exactIndex !== -1) {
        return exactIndex;
      }
      const hoveredValue = this.getValue(this.hovered);
      if (hoveredValue === null || hoveredValue === void 0) {
        return -1;
      }
      return data.findIndex((item) => {
        if (item === null || item === void 0) {
          return hoveredValue === null || hoveredValue === void 0;
        }
        return this.getValue(item) === hoveredValue;
      });
    },
    keydown(event) {
      const { key } = event;
      if (key === "Enter") event.preventDefault();
      if (key === "Escape" || key === "Tab") {
        this.isActive = false;
      }
      if (this.confirmKeys.indexOf(key) >= 0) {
        if (key === ",") event.preventDefault();
        const closeDropdown = !this.keepOpen || key === "Tab";
        if (this.hovered === null) {
          this.checkIfHeaderOrFooterSelected(
            event,
            null,
            closeDropdown
          );
          return;
        }
        this.setSelected(this.hovered, closeDropdown, event);
      }
    },
    selectHeaderOrFoterByClick(event, origin) {
      this.checkIfHeaderOrFooterSelected(event, { origin });
    },
    /*
     * Check if header or footer was selected.
     */
    checkIfHeaderOrFooterSelected(event, triggerClick, closeDropdown = true) {
      if (this.selectableHeader && (this.headerHovered || triggerClick && triggerClick.origin === "header")) {
        this.$emit("select-header", event);
        this.headerHovered = false;
        if (triggerClick) this.setHovered(null);
        if (closeDropdown) this.isActive = false;
      }
      if (this.selectableFooter && (this.footerHovered || triggerClick && triggerClick.origin === "footer")) {
        this.$emit("select-footer", event);
        this.footerHovered = false;
        if (triggerClick) this.setHovered(null);
        if (closeDropdown) this.isActive = false;
      }
    },
    /*
     * Close dropdown if clicked outside.
     */
    clickedOutside(event) {
      const target = isCustomElement(this) ? event.composedPath()[0] : event.target;
      if (!this.hasFocus && this.whiteList.indexOf(target) < 0) {
        if (this.keepFirst && this.hovered && this.selectOnClickOutside) {
          this.setSelected(this.hovered, true);
        } else {
          this.isActive = false;
        }
      }
    },
    /*
     * Return display text for the input.
     * If object, get value from path, or else just the value.
     */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    getValue(option) {
      if (option === null) return;
      if (typeof this.customFormatter !== "undefined") {
        return this.customFormatter(option);
      }
      return typeof option === "object" ? getValueByPath(option, this.field) : option;
    },
    /*
     * Check if the scroll list inside the dropdown
     * reached it's end.
     */
    checkIfReachedTheEndOfScroll() {
      const list = this.$refs.dropdown.querySelector(
        ".dropdown-content"
      );
      const footerHeight = this.hasFooterSlot ? list.querySelectorAll("div.dropdown-footer")[0].clientHeight : 0;
      if (list.clientHeight !== list.scrollHeight && list.scrollTop + list.parentElement.clientHeight + footerHeight >= list.scrollHeight) {
        this.$emit("infinite-scroll");
      }
    },
    /*
     * Calculate if the dropdown is vertically visible when activated,
     * otherwise it is openened upwards.
     */
    calcDropdownInViewportVertical() {
      this.$nextTick(() => {
        var _a;
        if (this.$refs.dropdown == null) return;
        const rect = this.$refs.dropdown.getBoundingClientRect();
        this.isListInViewportVertically = rect.top >= 0 && rect.bottom <= ((window == null ? void 0 : window.innerHeight) || ((_a = document == null ? void 0 : document.documentElement) == null ? void 0 : _a.clientHeight));
        if (this.appendToBody) {
          this.updateAppendToBody();
        }
      });
    },
    /*
     * Arrows keys listener.
     * If dropdown is active, set hovered option, or else just open.
     */
    keyArrows(direction) {
      const sum = direction === "down" ? 1 : -1;
      if (this.isActive) {
        const data = this.computedData.map((d) => d.items).reduce((a, b) => [...a, ...b], []);
        if (this.hasHeaderSlot && this.selectableHeader) {
          data.unshift(void 0);
        }
        if (this.hasFooterSlot && this.selectableFooter) {
          data.push(void 0);
        }
        let index;
        if (this.headerHovered) {
          index = 0 + sum;
        } else if (this.footerHovered) {
          index = data.length - 1 + sum;
        } else {
          index = this.findHoveredIndex(data) + sum;
        }
        index = index > data.length - 1 ? data.length - 1 : index;
        index = index < 0 ? 0 : index;
        this.footerHovered = false;
        this.headerHovered = false;
        this.setHovered(data[index] !== void 0 ? data[index] : null);
        if (this.hasFooterSlot && this.selectableFooter && index === data.length - 1) {
          this.footerHovered = true;
        }
        if (this.hasHeaderSlot && this.selectableHeader && index === 0) {
          this.headerHovered = true;
        }
        const list = this.$refs.dropdown.querySelector(
          ".dropdown-content"
        );
        let querySelectorText = "a.dropdown-item:not(.is-disabled)";
        if (this.hasHeaderSlot && this.selectableHeader) {
          querySelectorText += ",div.dropdown-header";
        }
        if (this.hasFooterSlot && this.selectableFooter) {
          querySelectorText += ",div.dropdown-footer";
        }
        const element = list.querySelectorAll(querySelectorText)[index];
        if (!element) return;
        const visMin = list.scrollTop;
        const visMax = list.scrollTop + list.clientHeight - element.clientHeight;
        if (element.offsetTop < visMin) {
          list.scrollTop = element.offsetTop;
        } else if (element.offsetTop >= visMax) {
          list.scrollTop = element.offsetTop - list.clientHeight + element.clientHeight;
        }
      } else {
        this.isActive = true;
      }
    },
    /*
     * Focus listener.
     * If value is the same as selected, select all text.
     */
    focused(event) {
      if (this.getValue(this.selected) === this.newValue) {
        this.$el.querySelector("input").select();
      }
      if (this.openOnFocus) {
        this.isActive = true;
        if (this.keepFirst) {
          this.selectFirstOption(this.computedData);
        }
      }
      this.hasFocus = true;
      this.$emit("focus", event);
    },
    /*
     * Blur listener.
     */
    onBlur(event) {
      this.hasFocus = false;
      this.$emit("blur", event);
    },
    onInput() {
      const currentValue = this.getValue(this.selected);
      if (currentValue !== void 0 && currentValue !== null && currentValue === this.newValue) {
        return;
      }
      this.$emit("typing", this.newValue);
      this.checkValidity();
    },
    rightIconClick(event) {
      if (this.clearable) {
        this.newValue = "";
        this.setSelected(null, false);
        if (this.openOnFocus) {
          this.$refs.input.$el.focus();
        }
      } else {
        this.$emit("icon-right-click", event);
      }
    },
    checkValidity() {
      if (this.useHtml5Validation) {
        this.$nextTick(() => {
          this.checkHtml5Validity();
        });
      }
    },
    updateAppendToBody() {
      const dropdownMenu = this.$refs.dropdown;
      const trigger = this.$parent.$data._isTaginput ? this.$parent.$el : this.$refs.input.$el;
      if (dropdownMenu && trigger) {
        if (!this.$data._bodyEl) {
          this.$data._bodyEl = createAbsoluteElement(dropdownMenu);
        }
        const root = this.$data._bodyEl;
        root.classList.forEach((item) => root.classList.remove(item));
        root.classList.add("autocomplete");
        root.classList.add("control");
        if (this.expanded) {
          root.classList.add("is-expanded");
        }
        const rect = trigger.getBoundingClientRect();
        let top = rect.top + window.scrollY;
        const left = rect.left + window.scrollX;
        if (!this.isOpenedTop) {
          top += trigger.clientHeight;
        } else {
          top -= dropdownMenu.clientHeight;
        }
        this.style = {
          position: "absolute",
          top: `${top}px`,
          left: `${left}px`,
          width: `${trigger.clientWidth}px`,
          maxWidth: `${trigger.clientWidth}px`,
          zIndex: "99"
        };
      }
    }
  },
  created() {
    if (typeof window !== "undefined") {
      document.addEventListener("click", this.clickedOutside);
      if (this.dropdownPosition === "auto") {
        window.addEventListener(
          "resize",
          this.calcDropdownInViewportVertical
        );
      }
      if (this.appendToBody) {
        window.addEventListener(
          "scroll",
          this.calcDropdownInViewportVertical
        );
      }
    }
  },
  mounted() {
    if (this.checkInfiniteScroll && this.$refs.dropdown && this.$refs.dropdown.querySelector(".dropdown-content")) {
      const list = this.$refs.dropdown.querySelector(
        ".dropdown-content"
      );
      list.addEventListener("scroll", this.checkIfReachedTheEndOfScroll);
    }
    if (this.appendToBody) {
      this.$data._bodyEl = createAbsoluteElement(
        this.$refs.dropdown
      );
      this.updateAppendToBody();
    }
  },
  beforeUnmount() {
    if (typeof window !== "undefined") {
      document.removeEventListener("click", this.clickedOutside);
      if (this.dropdownPosition === "auto") {
        window.removeEventListener(
          "resize",
          this.calcDropdownInViewportVertical
        );
      }
      if (this.appendToBody) {
        window.removeEventListener(
          "scroll",
          this.calcDropdownInViewportVertical
        );
      }
    }
    if (this.checkInfiniteScroll && this.$refs.dropdown && this.$refs.dropdown.querySelector(".dropdown-content")) {
      const list = this.$refs.dropdown.querySelector(
        ".dropdown-content"
      );
      list.removeEventListener(
        "scroll",
        this.checkIfReachedTheEndOfScroll
      );
    }
    if (this.appendToBody && this.$data._bodyEl) {
      removeElement(this.$data._bodyEl);
    }
    clearTimeout(this.timeOutID);
  }
});

const _hoisted_1 = {
  key: 1,
  class: "has-text-weight-bold"
};
const _hoisted_2 = ["onClick"];
const _hoisted_3 = { key: 1 };
const _hoisted_4 = {
  key: 1,
  class: "dropdown-item is-disabled"
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_b_input = resolveComponent("b-input");
  return openBlock(), createElementBlock(
    "div",
    mergeProps({
      class: ["autocomplete control", { "is-expanded": _ctx.expanded }]
    }, _ctx.rootAttrs),
    [
      createVNode(_component_b_input, mergeProps({
        modelValue: _ctx.newValue,
        "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => _ctx.newValue = $event),
        ref: "input",
        type: _ctx.type,
        size: _ctx.size,
        loading: _ctx.loading,
        rounded: _ctx.rounded,
        icon: _ctx.icon,
        "icon-right": _ctx.newIconRight,
        "icon-right-clickable": _ctx.newIconRightClickable,
        "icon-pack": _ctx.iconPack,
        maxlength: _ctx.maxlength,
        autocomplete: _ctx.newAutocomplete,
        "use-html5-validation": false,
        "aria-autocomplete": _ctx.ariaAutocomplete
      }, _ctx.fallthroughAttrs, {
        "onUpdate:modelValue": _ctx.onInput,
        onFocus: _ctx.focused,
        onBlur: _ctx.onBlur,
        onKeydown: [
          _ctx.keydown,
          _cache[1] || (_cache[1] = withKeys(withModifiers(($event) => _ctx.keyArrows("up"), ["prevent"]), ["up"])),
          _cache[2] || (_cache[2] = withKeys(withModifiers(($event) => _ctx.keyArrows("down"), ["prevent"]), ["down"]))
        ],
        onIconRightClick: _ctx.rightIconClick,
        onIconClick: _cache[3] || (_cache[3] = (event) => _ctx.$emit("icon-click", event))
      }), null, 16, ["modelValue", "type", "size", "loading", "rounded", "icon", "icon-right", "icon-right-clickable", "icon-pack", "maxlength", "autocomplete", "aria-autocomplete", "onUpdate:modelValue", "onFocus", "onBlur", "onKeydown", "onIconRightClick"]),
      createVNode(Transition, {
        name: "fade",
        persisted: ""
      }, {
        default: withCtx(() => [
          withDirectives(createElementVNode(
            "div",
            {
              class: normalizeClass(["dropdown dropdown-menu", { "is-opened-top": _ctx.isOpenedTop && !_ctx.appendToBody }]),
              style: normalizeStyle(_ctx.style),
              ref: "dropdown"
            },
            [
              withDirectives(createElementVNode(
                "div",
                {
                  class: "dropdown-content",
                  style: normalizeStyle(_ctx.contentStyle)
                },
                [
                  _ctx.hasHeaderSlot ? (openBlock(), createElementBlock(
                    "div",
                    {
                      key: 0,
                      class: normalizeClass(["dropdown-item dropdown-header", { "is-hovered": _ctx.headerHovered }]),
                      role: "button",
                      tabindex: "0",
                      onClick: _cache[4] || (_cache[4] = ($event) => _ctx.selectHeaderOrFoterByClick($event, "header"))
                    },
                    [
                      renderSlot(_ctx.$slots, "header")
                    ],
                    2
                    /* CLASS */
                  )) : createCommentVNode("v-if", true),
                  (openBlock(true), createElementBlock(
                    Fragment,
                    null,
                    renderList(_ctx.computedData, (element, groupindex) => {
                      return openBlock(), createElementBlock(
                        Fragment,
                        null,
                        [
                          element.group ? (openBlock(), createElementBlock("div", {
                            key: groupindex + "group",
                            class: "dropdown-item"
                          }, [
                            _ctx.hasGroupSlot ? renderSlot(_ctx.$slots, "group", {
                              key: 0,
                              group: element.group,
                              index: groupindex
                            }) : (openBlock(), createElementBlock(
                              "span",
                              _hoisted_1,
                              toDisplayString(element.group),
                              1
                              /* TEXT */
                            ))
                          ])) : createCommentVNode("v-if", true),
                          (openBlock(true), createElementBlock(
                            Fragment,
                            null,
                            renderList(element.items, (option, index) => {
                              return openBlock(), createElementBlock("a", {
                                key: groupindex + ":" + index,
                                class: normalizeClass(["dropdown-item", { "is-hovered": option === _ctx.hovered }]),
                                role: "button",
                                tabindex: "0",
                                onClick: withModifiers(($event) => _ctx.setSelected(option, !_ctx.keepOpen, $event), ["stop"])
                              }, [
                                _ctx.hasDefaultSlot ? renderSlot(_ctx.$slots, "default", {
                                  key: 0,
                                  option,
                                  index
                                }) : (openBlock(), createElementBlock(
                                  "span",
                                  _hoisted_3,
                                  toDisplayString(_ctx.getValue(option)),
                                  1
                                  /* TEXT */
                                ))
                              ], 10, _hoisted_2);
                            }),
                            128
                            /* KEYED_FRAGMENT */
                          ))
                        ],
                        64
                        /* STABLE_FRAGMENT */
                      );
                    }),
                    256
                    /* UNKEYED_FRAGMENT */
                  )),
                  _ctx.isEmpty && _ctx.hasEmptySlot ? (openBlock(), createElementBlock("div", _hoisted_4, [
                    renderSlot(_ctx.$slots, "empty")
                  ])) : createCommentVNode("v-if", true),
                  _ctx.hasFooterSlot ? (openBlock(), createElementBlock(
                    "div",
                    {
                      key: 2,
                      class: normalizeClass(["dropdown-item dropdown-footer", { "is-hovered": _ctx.footerHovered }]),
                      role: "button",
                      tabindex: "0",
                      onClick: _cache[5] || (_cache[5] = ($event) => _ctx.selectHeaderOrFoterByClick($event, "footer"))
                    },
                    [
                      renderSlot(_ctx.$slots, "footer")
                    ],
                    2
                    /* CLASS */
                  )) : createCommentVNode("v-if", true)
                ],
                4
                /* STYLE */
              ), [
                [vShow, _ctx.isActive]
              ])
            ],
            6
            /* CLASS, STYLE */
          ), [
            [vShow, _ctx.isActive && (!_ctx.isEmpty || _ctx.hasEmptySlot || _ctx.hasHeaderSlot || _ctx.hasFooterSlot)]
          ])
        ]),
        _: 3
        /* FORWARDED */
      })
    ],
    16
    /* FULL_PROPS */
  );
}
var BAutocomplete = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);

export { BAutocomplete as B };
