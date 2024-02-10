import { _ as _defineProperty } from './_rollupPluginBabelHelpers-df313029.js';
import { T as TimepickerMixin } from './TimepickerMixin-d736b0a9.js';
import { D as DropdownItem, a as Dropdown } from './DropdownItem-55682322.js';
import { I as Input } from './Input-20612b63.js';
import { F as Field } from './Field-3ceba31e.js';
import { S as Select } from './Select-97781d4e.js';
import { I as Icon } from './Icon-60d47b31.js';
import { n as normalizeComponent } from './plugins-218aea86.js';

var script = {
  name: 'BTimepicker',
  components: _defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty({}, Input.name, Input), Field.name, Field), Select.name, Select), Icon.name, Icon), Dropdown.name, Dropdown), DropdownItem.name, DropdownItem),
  mixins: [TimepickerMixin],
  inheritAttrs: false,
  data: function data() {
    return {
      _isTimepicker: true
    };
  },
  computed: {
    nativeStep: function nativeStep() {
      if (this.enableSeconds) return '1';
    }
  }
};

/* script */
const __vue_script__ = script;

/* template */
var __vue_render__ = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"timepicker control",class:[_vm.size, {'is-expanded': _vm.expanded}]},[(!_vm.isMobile || _vm.inline)?_c('b-dropdown',{ref:"dropdown",attrs:{"position":_vm.position,"disabled":_vm.disabled,"inline":_vm.inline,"mobile-modal":_vm.mobileModal,"append-to-body":_vm.appendToBody,"append-to-body-copy-parent":""},on:{"active-change":_vm.onActiveChange},scopedSlots:_vm._u([(!_vm.inline)?{key:"trigger",fn:function(){return [_vm._t("trigger",[_c('b-input',_vm._b({ref:"input",attrs:{"autocomplete":"off","value":_vm.formatValue(_vm.computedValue),"placeholder":_vm.placeholder,"size":_vm.size,"icon":_vm.icon,"icon-pack":_vm.iconPack,"loading":_vm.loading,"disabled":_vm.disabled,"readonly":!_vm.editable,"rounded":_vm.rounded,"use-html5-validation":_vm.useHtml5Validation},on:{"focus":_vm.handleOnFocus},nativeOn:{"keyup":function($event){if(!$event.type.indexOf('key')&&_vm._k($event.keyCode,"enter",13,$event.key,"Enter")){ return null; }return _vm.toggle(true)},"change":function($event){return _vm.onChange($event.target.value)}}},'b-input',_vm.$attrs,false))])]},proxy:true}:null],null,true)},[_c('b-dropdown-item',{attrs:{"disabled":_vm.disabled,"focusable":_vm.focusable,"custom":""}},[_c('b-field',{attrs:{"grouped":"","position":"is-centered"}},[_c('b-select',{attrs:{"disabled":_vm.disabled,"placeholder":"00"},nativeOn:{"change":function($event){return _vm.onHoursChange($event.target.value)}},model:{value:(_vm.hoursSelected),callback:function ($$v) {_vm.hoursSelected=$$v;},expression:"hoursSelected"}},_vm._l((_vm.hours),function(hour){return _c('option',{key:hour.value,attrs:{"disabled":_vm.isHourDisabled(hour.value)},domProps:{"value":hour.value}},[_vm._v(" "+_vm._s(hour.label)+" ")])}),0),_c('span',{staticClass:"control is-colon"},[_vm._v(_vm._s(_vm.hourLiteral))]),_c('b-select',{attrs:{"disabled":_vm.disabled,"placeholder":"00"},nativeOn:{"change":function($event){return _vm.onMinutesChange($event.target.value)}},model:{value:(_vm.minutesSelected),callback:function ($$v) {_vm.minutesSelected=$$v;},expression:"minutesSelected"}},_vm._l((_vm.minutes),function(minute){return _c('option',{key:minute.value,attrs:{"disabled":_vm.isMinuteDisabled(minute.value)},domProps:{"value":minute.value}},[_vm._v(" "+_vm._s(minute.label)+" ")])}),0),(_vm.enableSeconds)?[_c('span',{staticClass:"control is-colon"},[_vm._v(_vm._s(_vm.minuteLiteral))]),_c('b-select',{attrs:{"disabled":_vm.disabled,"placeholder":"00"},nativeOn:{"change":function($event){return _vm.onSecondsChange($event.target.value)}},model:{value:(_vm.secondsSelected),callback:function ($$v) {_vm.secondsSelected=$$v;},expression:"secondsSelected"}},_vm._l((_vm.seconds),function(second){return _c('option',{key:second.value,attrs:{"disabled":_vm.isSecondDisabled(second.value)},domProps:{"value":second.value}},[_vm._v(" "+_vm._s(second.label)+" ")])}),0),_c('span',{staticClass:"control is-colon"},[_vm._v(_vm._s(_vm.secondLiteral))])]:_vm._e(),(!_vm.isHourFormat24)?_c('b-select',{attrs:{"disabled":_vm.disabled},nativeOn:{"change":function($event){return _vm.onMeridienChange($event.target.value)}},model:{value:(_vm.meridienSelected),callback:function ($$v) {_vm.meridienSelected=$$v;},expression:"meridienSelected"}},_vm._l((_vm.meridiens),function(meridien){return _c('option',{key:meridien,domProps:{"value":meridien}},[_vm._v(" "+_vm._s(meridien)+" ")])}),0):_vm._e()],2),(_vm.$slots.default !== undefined && _vm.$slots.default.length)?_c('footer',{staticClass:"timepicker-footer"},[_vm._t("default")],2):_vm._e()],1)],1):_c('b-input',_vm._b({ref:"input",attrs:{"type":"time","step":_vm.nativeStep,"autocomplete":"off","value":_vm.formatHHMMSS(_vm.computedValue),"placeholder":_vm.placeholder,"size":_vm.size,"icon":_vm.icon,"icon-pack":_vm.iconPack,"rounded":_vm.rounded,"loading":_vm.loading,"max":_vm.formatHHMMSS(_vm.maxTime),"min":_vm.formatHHMMSS(_vm.minTime),"disabled":_vm.disabled,"readonly":false,"use-html5-validation":_vm.useHtml5Validation},on:{"focus":_vm.handleOnFocus,"blur":function($event){_vm.onBlur() && _vm.checkHtml5Validity();}},nativeOn:{"change":function($event){return _vm.onChange($event.target.value)}}},'b-input',_vm.$attrs,false))],1)};
var __vue_staticRenderFns__ = [];

  /* style */
  const __vue_inject_styles__ = undefined;
  /* scoped */
  const __vue_scope_id__ = undefined;
  /* module identifier */
  const __vue_module_identifier__ = undefined;
  /* functional template */
  const __vue_is_functional_template__ = false;
  /* style inject */
  
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  const __vue_component__ = /*#__PURE__*/normalizeComponent(
    { render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ },
    __vue_inject_styles__,
    __vue_script__,
    __vue_scope_id__,
    __vue_is_functional_template__,
    __vue_module_identifier__,
    false,
    undefined,
    undefined,
    undefined
  );

  var Timepicker = __vue_component__;

export { Timepicker as T };
