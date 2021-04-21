'use strict';

var __chunk_1 = require('./chunk-14c82365.js');
var helpers = require('./helpers.js');
var __chunk_4 = require('./chunk-7f8af05c.js');
var __chunk_8 = require('./chunk-21985800.js');
var __chunk_25 = require('./chunk-d7c80b6e.js');

var TabbedMixin = (function (cmp) {
  var _components;

  return {
    mixins: [__chunk_8.ProviderParentMixin(cmp, __chunk_8.Sorted)],
    components: (_components = {}, __chunk_1._defineProperty(_components, __chunk_4.Icon.name, __chunk_4.Icon), __chunk_1._defineProperty(_components, __chunk_25.SlotComponent.name, __chunk_25.SlotComponent), _components),
    props: {
      value: {
        type: [String, Number],
        default: undefined
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
    data: function data() {
      return {
        activeId: this.value,
        // Internal state
        defaultSlots: [],
        contentHeight: 0,
        isTransitioning: false
      };
    },
    mounted: function mounted() {
      if (typeof this.value === 'number') {
        // Backward compatibility: converts the index value to an id
        var value = helpers.bound(this.value, 0, this.items.length - 1);
        this.activeId = this.items[value].value;
      } else {
        this.activeId = this.value;
      }
    },
    computed: {
      activeItem: function activeItem() {
        var _this = this;

        return this.activeId === undefined ? this.items[0] : this.activeId === null ? null : this.childItems.find(function (i) {
          return i.value === _this.activeId;
        });
      },
      items: function items() {
        return this.sortedItems;
      }
    },
    watch: {
      /**
       * When v-model is changed set the new active tab.
       */
      value: function value(_value) {
        if (typeof _value === 'number') {
          // Backward compatibility: converts the index value to an id
          _value = helpers.bound(_value, 0, this.items.length - 1);
          this.activeId = this.items[_value].value;
        } else {
          this.activeId = _value;
        }
      },

      /**
       * Sync internal state with external state
       */
      activeId: function activeId(val, oldValue) {
        var oldTab = oldValue !== undefined && oldValue !== null ? this.childItems.find(function (i) {
          return i.value === oldValue;
        }) : null;

        if (oldTab && this.activeItem) {
          oldTab.deactivate(this.activeItem.index);
          this.activeItem.activate(oldTab.index);
        }

        val = this.activeItem ? typeof this.value === 'number' ? this.items.indexOf(this.activeItem) : this.activeItem.value : undefined;

        if (val !== this.value) {
          this.$emit('input', val);
        }
      }
    },
    methods: {
      /**
      * Child click listener, emit input event and change active child.
      */
      childClick: function childClick(child) {
        this.activeId = child.value;
      },
      getNextItemIdx: function getNextItemIdx(fromIdx) {
        var skipDisabled = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
        var nextItemIdx = null;
        var idx = fromIdx + 1;

        for (; idx < this.items.length; idx++) {
          var item = this.items[idx];

          if (item.visible && (!skipDisabled || skipDisabled && !item.disabled)) {
            nextItemIdx = idx;
            break;
          }
        }

        return nextItemIdx;
      },
      getPrevItemIdx: function getPrevItemIdx(fromIdx) {
        var skipDisabled = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
        var prevItemIdx = null;

        for (var idx = fromIdx - 1; idx >= 0; idx--) {
          var item = this.items[idx];

          if (item.visible && (!skipDisabled || skipDisabled && !item.disabled)) {
            prevItemIdx = idx;
            break;
          }
        }

        return prevItemIdx;
      }
    }
  };
});

var TabbedChildMixin = (function (parentCmp) {
  return {
    mixins: [__chunk_8.InjectedChildMixin(parentCmp, __chunk_8.Sorted$1)],
    props: {
      label: String,
      icon: String,
      iconPack: String,
      visible: {
        type: Boolean,
        default: true
      },
      value: {
        type: String,
        default: function _default() {
          return this._uid.toString();
        }
      },
      headerClass: {
        type: [String, Array, Object],
        default: null
      }
    },
    data: function data() {
      return {
        transitionName: null,
        elementClass: 'item',
        elementRole: null
      };
    },
    computed: {
      isActive: function isActive() {
        return this.parent.activeItem === this;
      }
    },
    methods: {
      /**
       * Activate element, alter animation name based on the index.
       */
      activate: function activate(oldIndex) {
        this.transitionName = this.index < oldIndex ? this.parent.vertical ? 'slide-down' : 'slide-next' : this.parent.vertical ? 'slide-up' : 'slide-prev';
      },

      /**
       * Deactivate element, alter animation name based on the index.
       */
      deactivate: function deactivate(newIndex) {
        this.transitionName = newIndex < this.index ? this.parent.vertical ? 'slide-down' : 'slide-next' : this.parent.vertical ? 'slide-up' : 'slide-prev';
      }
    },
    render: function render(createElement) {
      var _this = this;

      // if destroy apply v-if
      if (this.parent.destroyOnHide) {
        if (!this.isActive || !this.visible) {
          return;
        }
      }

      var vnode = createElement('div', {
        directives: [{
          name: 'show',
          value: this.isActive && this.visible
        }],
        attrs: {
          'class': this.elementClass,
          'role': this.elementRole,
          'id': "".concat(this.value, "-content"),
          'aria-labelledby': this.elementRole ? "".concat(this.value, "-label") : null,
          'tabindex': this.isActive ? 0 : -1
        }
      }, this.$slots.default); // check animated prop

      if (this.parent.animated) {
        return createElement('transition', {
          props: {
            'name': this.parent.animation || this.transitionName,
            'appear': this.parent.animateInitially === true || undefined
          },
          on: {
            'before-enter': function beforeEnter() {
              _this.parent.isTransitioning = true;
            },
            'after-enter': function afterEnter() {
              _this.parent.isTransitioning = false;
            }
          }
        }, [vnode]);
      }

      return vnode;
    }
  };
});

exports.TabbedChildMixin = TabbedChildMixin;
exports.TabbedMixin = TabbedMixin;
