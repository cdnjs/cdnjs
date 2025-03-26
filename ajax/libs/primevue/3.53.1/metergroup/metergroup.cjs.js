'use strict';

var BaseComponent = require('primevue/basecomponent');
var MeterGroupStyle = require('primevue/metergroup/style');
var vue = require('vue');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var BaseComponent__default = /*#__PURE__*/_interopDefaultLegacy(BaseComponent);
var MeterGroupStyle__default = /*#__PURE__*/_interopDefaultLegacy(MeterGroupStyle);

var script$2 = {
  name: 'MeterGroup',
  "extends": BaseComponent__default["default"],
  props: {
    value: {
      type: Array,
      "default": null
    },
    min: {
      type: Number,
      "default": 0
    },
    max: {
      type: Number,
      "default": 100
    },
    orientation: {
      type: String,
      "default": 'horizontal'
    },
    labelPosition: {
      type: String,
      "default": 'end'
    },
    labelOrientation: {
      type: String,
      "default": 'horizontal'
    }
  },
  style: MeterGroupStyle__default["default"],
  provide: function provide() {
    return {
      $parentInstance: this
    };
  }
};

var script$1 = {
  name: 'MeterGroupLabel',
  hostName: 'MeterGroup',
  "extends": BaseComponent__default["default"],
  inheritAttrs: false,
  props: {
    value: {
      type: Array,
      "default": null
    },
    labelPosition: {
      type: String,
      "default": 'end'
    },
    labelOrientation: {
      type: String,
      "default": 'horizontal'
    }
  }
};

function render$1(_ctx, _cache, $props, $setup, $data, $options) {
  return vue.openBlock(), vue.createElementBlock("ol", vue.mergeProps({
    "class": _ctx.cx('labellist')
  }, _ctx.ptm('labellist')), [(vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList($props.value, function (val, index) {
    return vue.openBlock(), vue.createElementBlock("li", vue.mergeProps({
      key: index + '_label',
      "class": _ctx.cx('labellistitem')
    }, _ctx.ptm('labellistitem')), [vue.renderSlot(_ctx.$slots, "icon", {
      value: val,
      "class": vue.normalizeClass(_ctx.cx('labelicon'))
    }, function () {
      return [val.icon ? (vue.openBlock(), vue.createElementBlock("i", vue.mergeProps({
        key: 0,
        "class": [val.icon, _ctx.cx('labelicon')],
        style: {
          color: val.color
        }
      }, _ctx.ptm('labelicon')), null, 16)) : (vue.openBlock(), vue.createElementBlock("span", vue.mergeProps({
        key: 1,
        "class": _ctx.cx('labellisttype'),
        style: {
          backgroundColor: val.color
        }
      }, _ctx.ptm('labellisttype')), null, 16))];
    }), vue.createElementVNode("span", vue.mergeProps({
      "class": _ctx.cx('label')
    }, _ctx.ptm('label')), vue.toDisplayString(val.label) + " (" + vue.toDisplayString(_ctx.$parentInstance.percentValue(val.value)) + ")", 17)], 16);
  }), 128))], 16);
}

script$1.render = render$1;

var script = {
  name: 'MeterGroup',
  "extends": script$2,
  inheritAttrs: false,
  methods: {
    getPTOptions: function getPTOptions(key, value, index) {
      return this.ptm(key, {
        context: {
          value: value,
          index: index
        }
      });
    },
    percent: function percent() {
      var meter = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
      var percentOfItem = (meter - this.min) / (this.max - this.min) * 100;
      return Math.round(Math.max(0, Math.min(100, percentOfItem)));
    },
    percentValue: function percentValue(meter) {
      return this.percent(meter) + '%';
    },
    meterCalculatedStyles: function meterCalculatedStyles(val) {
      return {
        backgroundColor: val.color,
        width: this.orientation === 'horizontal' && this.percentValue(val.value),
        height: this.orientation === 'vertical' && this.percentValue(val.value)
      };
    }
  },
  computed: {
    totalPercent: function totalPercent() {
      return this.percent(this.value.reduce(function (total, val) {
        return total + val.value;
      }, 0));
    },
    percentages: function percentages() {
      var sum = 0;
      var sumsArray = [];
      this.value.forEach(function (item) {
        sum += item.value;
        sumsArray.push(sum);
      });
      return sumsArray;
    }
  },
  components: {
    MeterGroupLabel: script$1
  }
};

var _hoisted_1 = ["aria-valuemin", "aria-valuemax", "aria-valuenow"];
function render(_ctx, _cache, $props, $setup, $data, $options) {
  var _component_MeterGroupLabel = vue.resolveComponent("MeterGroupLabel");
  return vue.openBlock(), vue.createElementBlock("div", vue.mergeProps({
    "class": _ctx.cx('root'),
    role: "meter",
    "aria-valuemin": _ctx.min,
    "aria-valuemax": _ctx.max,
    "aria-valuenow": $options.totalPercent
  }, _ctx.ptmi('root')), [_ctx.labelPosition === 'start' ? vue.renderSlot(_ctx.$slots, "label", {
    key: 0,
    value: _ctx.value,
    totalPercent: $options.totalPercent,
    percentages: $options.percentages
  }, function () {
    return [vue.createVNode(_component_MeterGroupLabel, {
      value: _ctx.value,
      labelPosition: _ctx.labelPosition,
      labelOrientation: _ctx.labelOrientation,
      unstyled: _ctx.unstyled,
      pt: _ctx.pt
    }, null, 8, ["value", "labelPosition", "labelOrientation", "unstyled", "pt"])];
  }) : vue.createCommentVNode("", true), vue.renderSlot(_ctx.$slots, "start", {
    value: _ctx.value,
    totalPercent: $options.totalPercent,
    percentages: $options.percentages
  }), vue.createElementVNode("div", vue.mergeProps({
    "class": _ctx.cx('metercontainer')
  }, _ctx.ptm('metercontainer')), [(vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(_ctx.value, function (val, index) {
    return vue.renderSlot(_ctx.$slots, "meter", {
      key: index,
      value: val,
      index: index,
      "class": vue.normalizeClass(_ctx.cx('meter')),
      orientation: _ctx.orientation,
      size: $options.percentValue(val.value),
      totalPercent: $options.totalPercent
    }, function () {
      return [$options.percent(val.value) ? (vue.openBlock(), vue.createElementBlock("span", vue.mergeProps({
        key: 0,
        "class": _ctx.cx('meter'),
        style: $options.meterCalculatedStyles(val)
      }, $options.getPTOptions('meter', val, index)), null, 16)) : vue.createCommentVNode("", true)];
    });
  }), 128))], 16), vue.renderSlot(_ctx.$slots, "end", {
    value: _ctx.value,
    totalPercent: $options.totalPercent,
    percentages: $options.percentages
  }), _ctx.labelPosition === 'end' ? vue.renderSlot(_ctx.$slots, "label", {
    key: 1,
    value: _ctx.value,
    totalPercent: $options.totalPercent,
    percentages: $options.percentages
  }, function () {
    return [vue.createVNode(_component_MeterGroupLabel, {
      value: _ctx.value,
      labelPosition: _ctx.labelPosition,
      labelOrientation: _ctx.labelOrientation,
      unstyled: _ctx.unstyled,
      pt: _ctx.pt
    }, null, 8, ["value", "labelPosition", "labelOrientation", "unstyled", "pt"])];
  }) : vue.createCommentVNode("", true)], 16, _hoisted_1);
}

script.render = render;

module.exports = script;
