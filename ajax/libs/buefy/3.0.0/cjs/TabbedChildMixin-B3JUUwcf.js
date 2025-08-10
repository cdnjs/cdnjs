'use strict';

var vue = require('vue');
var Icon = require('./Icon-lsDKE2wQ.js');
var SlotComponent = require('./SlotComponent-BruGdRW3.js');
var InjectedChildMixin = require('./InjectedChildMixin-CUKn09dB.js');
var helpers = require('./helpers.js');

var TabbedMixin = (cmp) => vue.defineComponent({
  components: {
    BIcon: Icon.BIcon,
    BSlotComponent: SlotComponent.BSlotComponent
  },
  mixins: [InjectedChildMixin.ProviderParentMixin(cmp, InjectedChildMixin.Sorted)],
  props: {
    modelValue: {
      type: [String, Number, null],
      default: void 0
    },
    size: String,
    animated: {
      type: Boolean,
      default: true
    },
    animation: String,
    animateInitially: Boolean,
    vertical: {
      type: Boolean,
      default: false
    },
    position: String,
    destroyOnHide: {
      type: Boolean,
      default: false
    }
  },
  emits: {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    "update:modelValue": (_value) => true
  },
  data() {
    return {
      activeId: this.modelValue,
      // Internal state
      defaultSlots: [],
      contentHeight: 0,
      isTransitioning: false
    };
  },
  computed: {
    activeItem() {
      const childItems = this.childItems;
      return this.activeId === void 0 ? this.items[0] : this.activeId === null ? null : childItems.find((i) => i.uniqueValue === this.activeId);
    },
    items() {
      return this.sortedItems;
    }
  },
  watch: {
    /*
     * When v-model is changed set the new active tab.
     */
    modelValue(value) {
      if (typeof value === "number") {
        value = helpers.bound(value, 0, this.items.length - 1);
        this.activeId = this.items[value].uniqueValue;
      } else {
        this.activeId = value;
      }
    },
    /*
     * Sync internal state with external state
     */
    activeId(val, oldValue) {
      const oldTab = oldValue !== void 0 && oldValue !== null ? this.childItems.find((i) => i.uniqueValue === oldValue) : null;
      if (oldTab && this.activeItem) {
        oldTab.deactivate(this.activeItem.index);
        this.activeItem.activate(oldTab.index);
      }
      val = this.activeItem ? typeof this.modelValue === "number" ? this.items.indexOf(this.activeItem) : this.activeItem.uniqueValue : void 0;
      if (val !== this.modelValue) {
        this.$emit("update:modelValue", val);
      }
    }
  },
  methods: {
    /*
    * Child click listener, emit input event and change active child.
    */
    childClick(child) {
      this.activeId = child.uniqueValue;
    },
    getNextItemIdx(fromIdx, skipDisabled = false) {
      let nextItemIdx = null;
      for (let i = 0; i < this.items.length; i++) {
        const item = this.items[i];
        if (fromIdx < item.index && (item.visible && (!skipDisabled || skipDisabled && !item.disabled))) {
          nextItemIdx = item.index;
          break;
        }
      }
      return nextItemIdx;
    },
    getPrevItemIdx(fromIdx, skipDisabled = false) {
      let prevItemIdx = null;
      for (let i = this.items.length - 1; i >= 0; i--) {
        const item = this.items[i];
        if (item.index < fromIdx && (item.visible && (!skipDisabled || skipDisabled && !item.disabled))) {
          prevItemIdx = item.index;
          break;
        }
      }
      return prevItemIdx;
    }
  },
  mounted() {
    if (typeof this.modelValue === "number") {
      const value = helpers.bound(this.modelValue, 0, this.items.length - 1);
      this.activeId = this.items[value].uniqueValue;
    } else {
      this.activeId = this.modelValue;
    }
  }
});

var TabbedChildMixin = (parentCmp) => vue.defineComponent({
  mixins: [InjectedChildMixin.InjectedChildMixin(parentCmp, InjectedChildMixin.Sorted$1)],
  props: {
    label: String,
    icon: String,
    iconPack: String,
    visible: {
      type: Boolean,
      default: true
    },
    headerClass: {
      type: [String, Array, Object],
      default: null
    }
  },
  data() {
    return {
      transitionName: null,
      elementClass: "item",
      elementRole: null
    };
  },
  computed: {
    isActive() {
      return this.parent.activeItem === this;
    }
  },
  methods: {
    /*
     * Activate element, alter animation name based on the index.
     */
    activate(oldIndex) {
      this.transitionName = this.index < oldIndex ? this.parent.vertical ? "slide-down" : "slide-next" : this.parent.vertical ? "slide-up" : "slide-prev";
    },
    /*
     * Deactivate element, alter animation name based on the index.
     */
    deactivate(newIndex) {
      this.transitionName = newIndex < this.index ? this.parent.vertical ? "slide-down" : "slide-next" : this.parent.vertical ? "slide-up" : "slide-prev";
    }
  },
  render() {
    var _a;
    if (this.parent.destroyOnHide) {
      if (!this.isActive || !this.visible) {
        return;
      }
    }
    const vnode = vue.withDirectives(
      vue.h(
        "div",
        {
          // NOTE: possible regression of #3272
          // https://github.com/buefy/buefy/issues/3272
          class: this.elementClass,
          role: this.elementRole,
          id: `${this.uniqueValue}-content`,
          "aria-labelledby": this.elementRole ? `${this.uniqueValue}-label` : null,
          tabindex: this.isActive ? 0 : -1
        },
        this.$slots
      ),
      [[vue.vShow, this.isActive && this.visible]]
    );
    if (this.parent.animated) {
      return vue.h(
        vue.Transition,
        {
          name: (_a = this.parent.animation || this.transitionName) != null ? _a : void 0,
          appear: this.parent.animateInitially === true || void 0,
          onBeforeEnter: () => {
            this.parent.isTransitioning = true;
          },
          onAfterEnter: () => {
            this.parent.isTransitioning = false;
          }
        },
        { default: () => vnode }
      );
    }
    return vnode;
  }
});

exports.TabbedChildMixin = TabbedChildMixin;
exports.TabbedMixin = TabbedMixin;
