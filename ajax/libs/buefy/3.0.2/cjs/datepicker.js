'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var Datepicker = require('./Datepicker-B-9ReBe6.js');
var plugins = require('./plugins-DbyYGVpp.js');
require('vue');
require('./CompatFallthroughMixin-hhK0Gkhr.js');
require('./config-DR826Ki2.js');
require('./FormElementMixin-DavX4iOv.js');
require('./helpers.js');
require('./Dropdown-DtpKU9qf.js');
require('./trapFocus-BlX6xykt.js');
require('./_plugin-vue_export-helper-Die8u8yB.js');
require('./DropdownItem-IMOKyRGV.js');
require('./Input-BcloGeZ3.js');
require('./Icon-lsDKE2wQ.js');
require('./Field-19ZCJFF8.js');
require('./Select-DayPKwCY.js');

const Plugin = {
  install(Vue) {
    plugins.registerComponent(Vue, Datepicker.BDatepicker);
  }
};

exports.BDatepicker = Datepicker.BDatepicker;
exports.default = Plugin;
