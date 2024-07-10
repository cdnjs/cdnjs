'use strict';

var utils = require('primevue/utils');
var vue = require('vue');
var BaseComponent = require('primevue/basecomponent');
var StepperStyle = require('primevue/stepper/style');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var BaseComponent__default = /*#__PURE__*/_interopDefaultLegacy(BaseComponent);
var StepperStyle__default = /*#__PURE__*/_interopDefaultLegacy(StepperStyle);

var script$4 = {
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
    },
    linear: {
      type: Boolean,
      "default": false
    }
  },
  style: StepperStyle__default["default"],
  provide: function provide() {
    return {
      $parentInstance: this
    };
  }
};

var script$3 = {
  name: 'StepperContent',
  hostName: 'Stepper',
  "extends": BaseComponent__default["default"],
  props: {
    id: null,
    template: null,
    ariaLabelledby: null,
    stepperpanel: null,
    index: null,
    active: null,
    highlighted: null,
    clickCallback: null,
    prevCallback: null,
    nextCallback: null,
    getStepPT: null
  }
};

function _typeof$1(o) { "@babel/helpers - typeof"; return _typeof$1 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof$1(o); }
function ownKeys$1(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread$1(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys$1(Object(t), !0).forEach(function (r) { _defineProperty$1(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$1(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty$1(obj, key, value) { key = _toPropertyKey$1(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey$1(t) { var i = _toPrimitive$1(t, "string"); return "symbol" == _typeof$1(i) ? i : String(i); }
function _toPrimitive$1(t, r) { if ("object" != _typeof$1(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof$1(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var _hoisted_1$2 = ["id", "aria-labelledby", "data-pc-index", "data-p-active"];
function render$3(_ctx, _cache, $props, $setup, $data, $options) {
  return vue.openBlock(), vue.createElementBlock("div", vue.mergeProps({
    id: $props.id,
    "class": _ctx.cx('stepper.content', {
      stepperpanel: $props.stepperpanel,
      index: $props.index
    }),
    role: "tabpanel",
    "aria-labelledby": $props.ariaLabelledby
  }, _objectSpread$1(_objectSpread$1({}, $props.getStepPT($props.stepperpanel, 'root', $props.index)), $props.getStepPT($props.stepperpanel, 'content', $props.index)), {
    "data-pc-name": "stepperpanel",
    "data-pc-index": $props.index,
    "data-p-active": $props.active
  }), [$props.template ? (vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent($props.template), {
    key: 0,
    index: $props.index,
    active: $props.active,
    highlighted: $props.highlighted,
    clickCallback: function clickCallback(event) {
      return _ctx.onItemClick(event, $props.index);
    },
    prevCallback: function prevCallback(event) {
      return $props.prevCallback(event, $props.index);
    },
    nextCallback: function nextCallback(event) {
      return $props.nextCallback(event, $props.index);
    }
  }, null, 8, ["index", "active", "highlighted", "clickCallback", "prevCallback", "nextCallback"])) : (vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent($props.stepperpanel), {
    key: 1
  }))], 16, _hoisted_1$2);
}

script$3.render = render$3;

var script$2 = {
  name: 'StepperHeader',
  hostName: 'Stepper',
  "extends": BaseComponent__default["default"],
  props: {
    id: null,
    template: null,
    stepperpanel: null,
    index: null,
    disabled: null,
    active: null,
    highlighted: null,
    ariaControls: null,
    clickCallback: null,
    getStepPT: null,
    getStepProp: null
  }
};

var _hoisted_1$1 = ["id", "tabindex", "aria-controls"];
function render$2(_ctx, _cache, $props, $setup, $data, $options) {
  return $props.template ? (vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent($props.template), {
    key: 0,
    index: $props.index,
    active: $props.active,
    highlighted: $props.highlighted,
    "class": vue.normalizeClass(_ctx.cx('stepper.action')),
    headerClass: _ctx.cx('stepper.action'),
    numberClass: _ctx.cx('stepper.number'),
    titleClass: _ctx.cx('stepper.title'),
    clickCallback: function clickCallback(event) {
      return $props.clickCallback(event, $props.index);
    }
  }, null, 8, ["index", "active", "highlighted", "class", "headerClass", "numberClass", "titleClass", "clickCallback"])) : (vue.openBlock(), vue.createElementBlock("button", vue.mergeProps({
    key: 1,
    id: $props.id,
    "class": _ctx.cx('stepper.action'),
    role: "tab",
    tabindex: $props.disabled ? -1 : undefined,
    "aria-controls": $props.ariaControls,
    onClick: _cache[0] || (_cache[0] = function ($event) {
      return $props.clickCallback($event, $props.index);
    })
  }, $props.getStepPT($props.stepperpanel, 'action', $props.index)), [vue.createElementVNode("span", vue.mergeProps({
    "class": _ctx.cx('stepper.number')
  }, $props.getStepPT($props.stepperpanel, 'number', $props.index)), vue.toDisplayString($props.index + 1), 17), vue.createElementVNode("span", vue.mergeProps({
    "class": _ctx.cx('stepper.title')
  }, $props.getStepPT($props.stepperpanel, 'title', $props.index)), vue.toDisplayString($props.getStepProp($props.stepperpanel, 'header')), 17)], 16, _hoisted_1$1));
}

script$2.render = render$2;

var script$1 = {
  name: 'StepperSeparator',
  hostName: 'Stepper',
  "extends": BaseComponent__default["default"],
  props: {
    template: null,
    separatorClass: null,
    stepperpanel: null,
    index: null,
    active: null,
    highlighted: null,
    getStepPT: null
  }
};

function render$1(_ctx, _cache, $props, $setup, $data, $options) {
  return $props.template ? (vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent($props.template), {
    key: 0,
    "class": vue.normalizeClass($props.separatorClass),
    index: $props.index,
    active: $props.active,
    highlighted: $props.highlighted
  }, null, 8, ["class", "index", "active", "highlighted"])) : (vue.openBlock(), vue.createElementBlock("span", vue.mergeProps({
    key: 1,
    "class": $props.separatorClass,
    "aria-hidden": "true"
  }, $props.getStepPT), null, 16));
}

script$1.render = render$1;

var script = {
  name: 'Stepper',
  "extends": script$4,
  inheritAttrs: false,
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
      return child.type.name === 'StepperPanel';
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
      var count = this.stepperpanels.length;
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
          active: this.isStepActive(index),
          highlighted: index < this.d_activeStep,
          disabled: this.isItemDisabled(index)
        }
      };
      return vue.mergeProps(this.ptm("stepperpanel.".concat(key), {
        stepperpanel: stepMetaData
      }), this.ptm("stepperpanel.".concat(key), stepMetaData), this.ptmo(this.getStepProp(step, 'pt'), key, stepMetaData));
    },
    updateActiveStep: function updateActiveStep(event, index) {
      this.d_activeStep = index;
      this.$emit('update:activeStep', index);
      this.$emit('step-change', {
        originalEvent: event,
        index: index
      });
    },
    onItemClick: function onItemClick(event, index) {
      if (this.linear) {
        event.preventDefault();
        return;
      }
      if (index !== this.d_activeStep) {
        this.updateActiveStep(event, index);
      }
    },
    isItemDisabled: function isItemDisabled(index) {
      return this.linear && !this.isStepActive(index);
    },
    prevCallback: function prevCallback(event, index) {
      if (index !== 0) {
        this.updateActiveStep(event, index - 1);
      }
    },
    nextCallback: function nextCallback(event, index) {
      if (index !== this.stepperpanels.length - 1) {
        this.updateActiveStep(event, index + 1);
      }
    }
  },
  computed: {
    stepperpanels: function stepperpanels() {
      var _this = this;
      return this.$slots["default"]().reduce(function (stepperpanels, child) {
        if (_this.isStep(child)) {
          stepperpanels.push(child);
        } else if (child.children && child.children instanceof Array) {
          child.children.forEach(function (nestedChild) {
            if (_this.isStep(nestedChild)) {
              stepperpanels.push(nestedChild);
            }
          });
        }
        return stepperpanels;
      }, []);
    }
  },
  components: {
    StepperContent: script$3,
    StepperHeader: script$2,
    StepperSeparator: script$1
  }
};

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var _hoisted_1 = ["aria-current", "data-p-highlight", "data-p-disabled", "data-pc-index", "data-p-active"];
var _hoisted_2 = ["aria-current", "data-p-highlight", "data-p-disabled", "data-pc-index", "data-p-active"];
function render(_ctx, _cache, $props, $setup, $data, $options) {
  var _component_StepperHeader = vue.resolveComponent("StepperHeader");
  var _component_StepperSeparator = vue.resolveComponent("StepperSeparator");
  var _component_StepperContent = vue.resolveComponent("StepperContent");
  return vue.openBlock(), vue.createElementBlock("div", vue.mergeProps({
    "class": _ctx.cx('root'),
    role: "tablist"
  }, _ctx.ptmi('root')), [_ctx.$slots.start ? vue.renderSlot(_ctx.$slots, "start", {
    key: 0
  }) : vue.createCommentVNode("", true), _ctx.orientation === 'horizontal' ? (vue.openBlock(), vue.createElementBlock(vue.Fragment, {
    key: 1
  }, [vue.createElementVNode("ul", vue.mergeProps({
    ref: "nav",
    "class": _ctx.cx('nav')
  }, _ctx.ptm('nav')), [(vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList($options.stepperpanels, function (step, index) {
    return vue.openBlock(), vue.createElementBlock("li", vue.mergeProps({
      key: $options.getStepKey(step, index),
      "class": _ctx.cx('stepper.header', {
        step: step,
        index: index
      }),
      "aria-current": $options.isStepActive(index) ? 'step' : undefined,
      role: "presentation"
    }, _objectSpread(_objectSpread({}, $options.getStepPT(step, 'root', index)), $options.getStepPT(step, 'header', index)), {
      "data-pc-name": "stepperpanel",
      "data-p-highlight": $options.isStepActive(index),
      "data-p-disabled": $options.isItemDisabled(index),
      "data-pc-index": index,
      "data-p-active": $options.isStepActive(index)
    }), [vue.renderSlot(_ctx.$slots, "header", {}, function () {
      var _step$children;
      return [vue.createVNode(_component_StepperHeader, {
        id: $options.getStepHeaderActionId(index),
        template: (_step$children = step.children) === null || _step$children === void 0 ? void 0 : _step$children.header,
        stepperpanel: step,
        index: index,
        disabled: $options.isItemDisabled(index),
        active: $options.isStepActive(index),
        highlighted: index < $data.d_activeStep,
        "class": vue.normalizeClass(_ctx.cx('stepper.action')),
        "aria-controls": $options.getStepContentId(index),
        clickCallback: function clickCallback(event) {
          return $options.onItemClick(event, index);
        },
        getStepPT: $options.getStepPT,
        getStepProp: $options.getStepProp,
        unstyled: _ctx.unstyled
      }, null, 8, ["id", "template", "stepperpanel", "index", "disabled", "active", "highlighted", "class", "aria-controls", "clickCallback", "getStepPT", "getStepProp", "unstyled"])];
    }), index !== $options.stepperpanels.length - 1 ? vue.renderSlot(_ctx.$slots, "separator", {
      key: 0
    }, function () {
      var _step$children2;
      return [vue.createVNode(_component_StepperSeparator, {
        template: (_step$children2 = step.children) === null || _step$children2 === void 0 ? void 0 : _step$children2.separator,
        separatorClass: _ctx.cx('stepper.separator'),
        stepperpanel: step,
        index: index,
        active: $options.isStepActive(index),
        highlighted: index < $data.d_activeStep,
        getStepPT: $options.getStepPT(step, 'separator', index),
        unstyled: _ctx.unstyled
      }, null, 8, ["template", "separatorClass", "stepperpanel", "index", "active", "highlighted", "getStepPT", "unstyled"])];
    }) : vue.createCommentVNode("", true)], 16, _hoisted_1);
  }), 128))], 16), vue.createElementVNode("div", vue.mergeProps({
    "class": _ctx.cx('panelContainer')
  }, _ctx.ptm('panelContainer')), [(vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList($options.stepperpanels, function (step, index) {
    var _step$children3;
    return vue.withDirectives((vue.openBlock(), vue.createBlock(_component_StepperContent, {
      key: $options.getStepKey(step, index),
      id: $options.getStepContentId(index),
      template: step === null || step === void 0 || (_step$children3 = step.children) === null || _step$children3 === void 0 ? void 0 : _step$children3.content,
      stepperpanel: step,
      index: index,
      active: $options.isStepActive(index),
      highlighted: index < $data.d_activeStep,
      clickCallback: function clickCallback(event) {
        return $options.onItemClick(event, index);
      },
      prevCallback: function prevCallback(event) {
        return $options.prevCallback(event, index);
      },
      nextCallback: function nextCallback(event) {
        return $options.nextCallback(event, index);
      },
      getStepPT: $options.getStepPT,
      "aria-labelledby": $options.getStepHeaderActionId(index),
      unstyled: _ctx.unstyled
    }, null, 8, ["id", "template", "stepperpanel", "index", "active", "highlighted", "clickCallback", "prevCallback", "nextCallback", "getStepPT", "aria-labelledby", "unstyled"])), [[vue.vShow, $options.isStepActive(index)]]);
  }), 128))], 16)], 64)) : _ctx.orientation === 'vertical' ? (vue.openBlock(true), vue.createElementBlock(vue.Fragment, {
    key: 2
  }, vue.renderList($options.stepperpanels, function (step, index) {
    return vue.openBlock(), vue.createElementBlock("div", vue.mergeProps({
      ref_for: true,
      ref: "nav",
      key: $options.getStepKey(step, index),
      "class": _ctx.cx('panel', {
        step: step,
        index: index
      }),
      "aria-current": $options.isStepActive(index) ? 'step' : undefined
    }, _objectSpread(_objectSpread({}, $options.getStepPT(step, 'root', index)), $options.getStepPT(step, 'panel', index)), {
      "data-pc-name": "stepperpanel",
      "data-p-highlight": $options.isStepActive(index),
      "data-p-disabled": $options.isItemDisabled(index),
      "data-pc-index": index,
      "data-p-active": $options.isStepActive(index)
    }), [vue.createElementVNode("div", vue.mergeProps({
      "class": _ctx.cx('stepper.header', {
        step: step,
        index: index
      })
    }, $options.getStepPT(step, 'header', index)), [vue.renderSlot(_ctx.$slots, "header", {}, function () {
      var _step$children4;
      return [vue.createVNode(_component_StepperHeader, {
        id: $options.getStepHeaderActionId(index),
        template: (_step$children4 = step.children) === null || _step$children4 === void 0 ? void 0 : _step$children4.header,
        stepperpanel: step,
        index: index,
        disabled: $options.isItemDisabled(index),
        active: $options.isStepActive(index),
        highlighted: index < $data.d_activeStep,
        "class": vue.normalizeClass(_ctx.cx('stepper.action')),
        "aria-controls": $options.getStepContentId(index),
        clickCallback: function clickCallback(event) {
          return $options.onItemClick(event, index);
        },
        getStepPT: $options.getStepPT,
        getStepProp: $options.getStepProp
      }, null, 8, ["id", "template", "stepperpanel", "index", "disabled", "active", "highlighted", "class", "aria-controls", "clickCallback", "getStepPT", "getStepProp"])];
    })], 16), vue.createVNode(vue.Transition, vue.mergeProps({
      name: "p-toggleable-content"
    }, $options.getStepPT(step, 'transition', index)), {
      "default": vue.withCtx(function () {
        return [vue.withDirectives(vue.createElementVNode("div", vue.mergeProps({
          "class": _ctx.cx('stepper.toggleableContent')
        }, $options.getStepPT(step, 'toggleableContent', index)), [index !== $options.stepperpanels.length - 1 ? vue.renderSlot(_ctx.$slots, "separator", {
          key: 0
        }, function () {
          var _step$children5;
          return [vue.createVNode(_component_StepperSeparator, {
            template: (_step$children5 = step.children) === null || _step$children5 === void 0 ? void 0 : _step$children5.separator,
            separatorClass: _ctx.cx('stepper.separator'),
            stepperpanel: step,
            index: index,
            active: $options.isStepActive(index),
            highlighted: index < $data.d_activeStep,
            getStepPT: $options.getStepPT(step, 'separator', index)
          }, null, 8, ["template", "separatorClass", "stepperpanel", "index", "active", "highlighted", "getStepPT"])];
        }) : vue.createCommentVNode("", true), vue.renderSlot(_ctx.$slots, "content", {}, function () {
          var _step$children6;
          return [vue.createVNode(_component_StepperContent, {
            id: $options.getStepContentId(index),
            template: step === null || step === void 0 || (_step$children6 = step.children) === null || _step$children6 === void 0 ? void 0 : _step$children6.content,
            stepperpanel: step,
            index: index,
            active: $options.isStepActive(index),
            highlighted: index < $data.d_activeStep,
            clickCallback: function clickCallback(event) {
              return $options.onItemClick(event, index);
            },
            prevCallback: function prevCallback(event) {
              return $options.prevCallback(event, index);
            },
            nextCallback: function nextCallback(event) {
              return $options.nextCallback(event, index);
            },
            getStepPT: $options.getStepPT,
            "aria-labelledby": $options.getStepHeaderActionId(index)
          }, null, 8, ["id", "template", "stepperpanel", "index", "active", "highlighted", "clickCallback", "prevCallback", "nextCallback", "getStepPT", "aria-labelledby"])];
        })], 16), [[vue.vShow, $options.isStepActive(index)]])];
      }),
      _: 2
    }, 1040)], 16, _hoisted_2);
  }), 128)) : vue.createCommentVNode("", true), _ctx.$slots.end ? vue.renderSlot(_ctx.$slots, "end", {
    key: 3
  }) : vue.createCommentVNode("", true)], 16);
}

script.render = render;

module.exports = script;
