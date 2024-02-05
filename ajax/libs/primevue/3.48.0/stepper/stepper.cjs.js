'use strict';

var utils = require('primevue/utils');
var vue = require('vue');
var BaseComponent = require('primevue/basecomponent');
var StepperStyle = require('primevue/stepper/style');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var BaseComponent__default = /*#__PURE__*/_interopDefaultLegacy(BaseComponent);
var StepperStyle__default = /*#__PURE__*/_interopDefaultLegacy(StepperStyle);

var script$1 = {
  name: 'BaseStepper',
  "extends": BaseComponent__default["default"],
  props: {
    activeStep: {
      type: Number,
      "default": 0
    },
    orientation: {
      type: String,
      "default": 'horizontal'
    }
  },
  style: StepperStyle__default["default"],
  provide: function provide() {
    return {
      $parentInstance: this
    };
  }
};

var script = {
  name: 'Stepper',
  "extends": script$1,
  emits: ['update:activeStep', 'step-change'],
  data: function data() {
    return {
      id: this.$attrs.id,
      d_activeStep: this.activeStep
    };
  },
  watch: {
    '$attrs.id': function $attrsId(newValue) {
      this.id = newValue || utils.UniqueComponentId();
    },
    activeStep: function activeStep(newValue) {
      this.d_activeStep = newValue;
    }
  },
  mounted: function mounted() {
    this.id = this.id || utils.UniqueComponentId();
  },
  methods: {
    isStep: function isStep(child) {
      return child.type.name === 'Step';
    },
    isStepActive: function isStepActive(index) {
      return this.d_activeStep === index;
    },
    getStepProp: function getStepProp(step, name) {
      return step.props ? step.props[name] : undefined;
    },
    getStepKey: function getStepKey(step, index) {
      return this.getStepProp(step, 'header') || index;
    },
    getStepHeaderActionId: function getStepHeaderActionId(index) {
      return "".concat(this.id, "_").concat(index, "_header_action");
    },
    getStepContentId: function getStepContentId(index) {
      return "".concat(this.id, "_").concat(index, "_content");
    },
    getStepPT: function getStepPT(step, key, index) {
      var count = this.steps.length;
      var stepMetaData = {
        props: step.props,
        parent: {
          instance: this,
          props: this.$props,
          state: this.$data
        },
        context: {
          index: index,
          count: count,
          first: index === 0,
          last: index === count - 1,
          active: this.isStepActive(index)
        }
      };
      return vue.mergeProps(this.ptm("step.".concat(key), {
        step: stepMetaData
      }), this.ptm("step.".concat(key), stepMetaData), this.ptmo(this.getStepProp(step, 'pt'), key, stepMetaData));
    },
    onItemClick: function onItemClick(event, step, index) {
      if (this.getStepProp(step, 'disabled') || this.readonly) {
        event.preventDefault();
        return;
      }
      if (index !== this.d_activeStep) {
        this.d_activeStep = index;
        this.$emit('update:activeStep', this.d_activeStep);
      }
      this.$emit('step-change', {
        originalEvent: event,
        index: index
      });
    },
    onItemKeydown: function onItemKeydown(event, tab) {
      switch (event.code) {
        case 'ArrowRight':
          {
            this.navigateToNextItem(event.target);
            event.preventDefault();
            break;
          }
        case 'ArrowLeft':
          {
            this.navigateToPrevItem(event.target);
            event.preventDefault();
            break;
          }
        case 'Home':
          {
            this.navigateToFirstItem(event.target);
            event.preventDefault();
            break;
          }
        case 'End':
          {
            this.navigateToLastItem(event.target);
            event.preventDefault();
            break;
          }
        case 'Tab':
          //no op
          break;
        case 'Enter':
        case 'NumpadEnter':
        case 'Space':
          {
            this.onItemClick(event, step);
            event.preventDefault();
            break;
          }
      }
    },
    navigateToNextItem: function navigateToNextItem(target) {
      var nextItem = this.findNextItem(target);
      nextItem && this.setFocusToMenuitem(target, nextItem);
    },
    navigateToPrevItem: function navigateToPrevItem(target) {
      var prevItem = this.findPrevItem(target);
      prevItem && this.setFocusToMenuitem(target, prevItem);
    },
    navigateToFirstItem: function navigateToFirstItem(target) {
      var firstItem = this.findFirstItem(target);
      firstItem && this.setFocusToMenuitem(target, firstItem);
    },
    navigateToLastItem: function navigateToLastItem(target) {
      var lastItem = this.findLastItem(target);
      lastItem && this.setFocusToMenuitem(target, lastItem);
    },
    findNextItem: function findNextItem(item) {
      var nextItem = item.parentElement.nextElementSibling;
      return nextItem ? nextItem.children[0] : null;
    },
    findPrevItem: function findPrevItem(item) {
      var prevItem = item.parentElement.previousElementSibling;
      return prevItem ? prevItem.children[0] : null;
    },
    findFirstItem: function findFirstItem() {
      var firstSibling = DomHandler.findSingle(this.$refs.list, '[data-pc-section="header"]');
      return firstSibling ? firstSibling.children[0] : null;
    },
    findLastItem: function findLastItem() {
      var siblings = DomHandler.find(this.$refs.list, '[data-pc-section="header"]');
      return siblings ? siblings[siblings.length - 1].children[0] : null;
    }
  },
  computed: {
    steps: function steps() {
      var _this = this;
      return this.$slots["default"]().reduce(function (steps, child) {
        if (_this.isStep(child)) {
          steps.push(child);
        } else if (child.children && child.children instanceof Array) {
          child.children.forEach(function (nestedChild) {
            if (_this.isStep(nestedChild)) {
              steps.push(nestedChild);
            }
          });
        }
        return steps;
      }, []);
    }
  }
};

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var _hoisted_1 = ["aria-current", "onClick", "onKeydown", "data-p-highlight", "data-p-disabled", "data-pc-index", "data-p-active"];
var _hoisted_2 = ["id", "aria-labelledby", "data-pc-index", "data-p-active"];
function render(_ctx, _cache, $props, $setup, $data, $options) {
  return vue.openBlock(), vue.createElementBlock("div", {
    "class": vue.normalizeClass(_ctx.cx('root')),
    role: "tablist"
  }, [vue.createElementVNode("div", {
    "class": vue.normalizeClass(_ctx.cx('navContent'))
  }, [vue.createElementVNode("ul", {
    ref: "list",
    "class": vue.normalizeClass(_ctx.cx('nav'))
  }, [(vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList($options.steps, function (step, index) {
    return vue.openBlock(), vue.createElementBlock("li", vue.mergeProps({
      key: $options.getStepKey(step, index),
      "class": _ctx.cx('step.header', {
        step: step,
        index: index
      }),
      style: $options.getStepProp(step, 'headerStyle'),
      "aria-current": $options.isStepActive(index) ? 'step' : undefined,
      onClick: function onClick($event) {
        return $options.onItemClick($event, step, index);
      },
      onKeydown: function onKeydown($event) {
        return $options.onItemKeydown($event, step, index);
      }
    }, _objectSpread(_objectSpread({}, $options.getStepPT(step, 'root', index)), $options.getStepPT(step, 'header', index)), {
      "data-pc-name": "step",
      "data-p-highlight": $options.isStepActive(index),
      "data-p-disabled": $options.getStepProp(step, 'disabled'),
      "data-pc-index": index,
      "data-p-active": $options.isStepActive(index)
    }), [vue.renderSlot(_ctx.$slots, "header", {}, function () {
      return [vue.createElementVNode("span", {
        "class": vue.normalizeClass(_ctx.cx('step.action'))
      }, [vue.createElementVNode("span", {
        "class": vue.normalizeClass(_ctx.cx('step.step'))
      }, vue.toDisplayString(index + 1), 3), vue.createElementVNode("span", {
        "class": vue.normalizeClass(_ctx.cx('step.title'))
      }, vue.toDisplayString($options.getStepProp(step, 'header')), 3)], 2)];
    })], 16, _hoisted_1);
  }), 128))], 2)], 2), vue.createElementVNode("div", {
    "class": vue.normalizeClass(_ctx.cx('stepContainer'))
  }, [(vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList($options.steps, function (step, index) {
    return vue.openBlock(), vue.createElementBlock(vue.Fragment, {
      key: $options.getStepKey(step, index)
    }, [$options.isStepActive(index) ? (vue.openBlock(), vue.createElementBlock("div", vue.mergeProps({
      key: 0,
      id: $options.getStepContentId(index),
      "class": _ctx.cx('step.content', {
        step: step
      }),
      style: $options.getStepProp(step, 'contentStyle'),
      role: "tabpanel",
      "aria-labelledby": $options.getStepHeaderActionId(index)
    }, _objectSpread(_objectSpread({}, $options.getStepPT(step, 'root', index)), $options.getStepPT(step, 'content', index)), {
      "data-pc-name": "step",
      "data-pc-index": index,
      "data-p-active": $options.isStepActive(index)
    }), [(vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent(step)))], 16, _hoisted_2)) : vue.createCommentVNode("", true)], 64);
  }), 128))], 2)], 2);
}

script.render = render;

module.exports = script;
