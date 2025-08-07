import { hasFlag } from './helpers.js';

var __defProp$1 = Object.defineProperty;
var __getOwnPropSymbols$1 = Object.getOwnPropertySymbols;
var __hasOwnProp$1 = Object.prototype.hasOwnProperty;
var __propIsEnum$1 = Object.prototype.propertyIsEnumerable;
var __defNormalProp$1 = (obj, key, value) => key in obj ? __defProp$1(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues$1 = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp$1.call(b, prop))
      __defNormalProp$1(a, prop, b[prop]);
  if (__getOwnPropSymbols$1)
    for (var prop of __getOwnPropSymbols$1(b)) {
      if (__propIsEnum$1.call(b, prop))
        __defNormalProp$1(a, prop, b[prop]);
    }
  return a;
};
const items = 1;
const sorted$1 = 3;
const Sorted$1 = sorted$1;
var ProviderParentMixin = (itemName, flags) => {
  const mixin = {
    provide() {
      return {
        ["b" + itemName]: this
      };
    }
  };
  if (hasFlag(flags, items)) {
    mixin.data = function() {
      return __spreadValues$1({
        childItems: []
      }, hasFlag(flags, sorted$1) ? { nextIndex: 0 } : {});
    };
    mixin.methods = {
      _registerItem(item) {
        if (hasFlag(flags, sorted$1)) {
          item.dynamicIndex = this.nextIndex;
          ++this.nextIndex;
        }
        this.childItems.push(item);
      },
      _unregisterItem(item) {
        this.childItems = this.childItems.filter((i) => i.uniqueValue !== item.uniqueValue);
      }
    };
    if (hasFlag(flags, sorted$1)) {
      mixin.computed = {
        /*
         * When items are added/removed sort them according to their position
         */
        sortedItems() {
          return this.childItems.slice().sort((i1, i2) => {
            return i1.index - i2.index;
          });
        }
      };
    }
  }
  return mixin;
};

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
const sorted = 1;
const optional = 2;
const Sorted = sorted;
var InjectedChildMixin = (parentItemName, flags) => {
  const mixin = {
    // FIXME: initializing `parent` with an empty string does not make
    // sense at all, but some code supposes that `parent` is non-null.
    // so I leave it as is for now.
    inject: { parent: { from: "b" + parentItemName, default: "" } },
    props: {
      // if `value` is non-null, it must be unique among all the siblings.
      // see `uniqueValue`
      value: {
        type: String,
        default: null
      }
    },
    computed: {
      // `ProviderParentMixin` uses `uniqueValue` computed value to
      // identify the child in its `childItems` collection.
      // so the value must be unique among all the siblings.
      // falls back to the `uid` internal field to ensure uniqueness.
      uniqueValue() {
        return this.value != null ? this.value : this.$.uid;
      }
    },
    created() {
      if (!this.parent) {
        if (!hasFlag(flags, optional)) {
          throw new Error("You should wrap " + this.$options.name + " in a " + parentItemName);
        }
      } else if (this.parent._registerItem) {
        this.parent._registerItem(this);
      }
    },
    beforeUnmount() {
      if (this.parent && this.parent._unregisterItem) {
        this.parent._unregisterItem(this);
      }
    }
  };
  if (hasFlag(flags, sorted)) {
    mixin.props = __spreadProps(__spreadValues({}, mixin.props), {
      order: {
        type: Number,
        required: false
      }
    });
    mixin.data = () => {
      return {
        dynamicIndex: void 0
      };
    };
    mixin.computed = __spreadProps(__spreadValues({}, mixin.computed), {
      index() {
        return this.order != null ? this.order : this.dynamicIndex;
      }
    });
  }
  return mixin;
};

export { InjectedChildMixin as I, ProviderParentMixin as P, Sorted$1 as S, Sorted as a };
