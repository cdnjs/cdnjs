'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var autocomplete = require('./autocomplete.js');
var breadcrumb = require('./breadcrumb.js');
var button = require('./button.js');
var carousel = require('./carousel.js');
var checkbox = require('./checkbox.js');
var collapse = require('./collapse.js');
var clockpicker = require('./clockpicker.js');
var colorpicker = require('./index-99d1c930.js');
var datepicker = require('./datepicker.js');
var datetimepicker = require('./datetimepicker.js');
var dialog = require('./dialog.js');
var dropdown = require('./dropdown.js');
var field = require('./field.js');
var icon = require('./icon.js');
var image = require('./image.js');
var input = require('./input.js');
var loading = require('./loading.js');
var menu = require('./menu.js');
var message = require('./message.js');
var modal = require('./modal.js');
var notification = require('./notification.js');
var navbar = require('./navbar.js');
var numberinput = require('./numberinput.js');
var pagination = require('./pagination.js');
var progress = require('./progress.js');
var radio = require('./radio.js');
var rate = require('./rate.js');
var select = require('./select.js');
var skeleton = require('./skeleton.js');
var sidebar = require('./sidebar.js');
var slider = require('./slider.js');
var snackbar = require('./snackbar.js');
var steps = require('./steps.js');
var _switch = require('./switch.js');
var table = require('./table.js');
var tabs = require('./tabs.js');
var tag = require('./tag.js');
var taginput = require('./taginput.js');
var timepicker = require('./timepicker.js');
var toast = require('./toast.js');
var tooltip = require('./tooltip.js');
var upload = require('./upload.js');
var helpers = require('./helpers.js');
var config$1 = require('./config-8cfb5a4a.js');
var plugins = require('./plugins-7f41b028.js');
var config = require('./config.js');
require('./Autocomplete-7a39c5ce.js');
require('./_rollupPluginBabelHelpers-8b2e54ad.js');
require('./FormElementMixin-193a88b8.js');
require('./Input-e5a72d97.js');
require('./Icon-78961800.js');
require('./Button-01827709.js');
require('./InjectedChildMixin-d6bf7f91.js');
require('./Image-c4bcd9b3.js');
require('./Checkbox-43f54cc7.js');
require('./CheckRadioMixin-c910f2ed.js');
require('./TimepickerMixin-6c1a4ab4.js');
require('./DropdownItem-422f8c34.js');
require('./trapFocus-261420b0.js');
require('./Field-4557b10c.js');
require('./Select-2b3879bc.js');
require('./Tooltip-c1df7ee3.js');
require('./Datepicker-680659bc.js');
require('./Timepicker-498fa02b.js');
require('./Modal-4cf07210.js');
require('./Loading-6f2c7075.js');
require('./ssr-20dba236.js');
require('./MessageMixin-8d959514.js');
require('./NoticeMixin-01121bd2.js');
require('./Pagination-d6b3fb85.js');
require('./TabbedChildMixin-907cad32.js');
require('./SlotComponent-4fb48389.js');
require('./Tag-437f65fb.js');

var components = /*#__PURE__*/Object.freeze({
    __proto__: null,
    Autocomplete: autocomplete["default"],
    Breadcrumb: breadcrumb["default"],
    Button: button["default"],
    Carousel: carousel["default"],
    Checkbox: checkbox["default"],
    Clockpicker: clockpicker["default"],
    Collapse: collapse["default"],
    Colorpicker: colorpicker.Plugin,
    Datepicker: datepicker["default"],
    Datetimepicker: datetimepicker["default"],
    Dialog: dialog["default"],
    Dropdown: dropdown["default"],
    Field: field["default"],
    Icon: icon["default"],
    Image: image["default"],
    Input: input["default"],
    Loading: loading["default"],
    Menu: menu["default"],
    Message: message["default"],
    Modal: modal["default"],
    Navbar: navbar["default"],
    Notification: notification["default"],
    Numberinput: numberinput["default"],
    Pagination: pagination["default"],
    Progress: progress["default"],
    Radio: radio["default"],
    Rate: rate["default"],
    Select: select["default"],
    Skeleton: skeleton["default"],
    Sidebar: sidebar["default"],
    Slider: slider["default"],
    Snackbar: snackbar["default"],
    Steps: steps["default"],
    Switch: _switch["default"],
    Table: table["default"],
    Tabs: tabs["default"],
    Tag: tag["default"],
    Taginput: taginput["default"],
    Timepicker: timepicker["default"],
    Toast: toast["default"],
    Tooltip: tooltip["default"],
    Upload: upload["default"]
});

var Buefy = {
  install: function install(Vue) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    config$1.setVueInstance(Vue);
    // Options
    config$1.setOptions(helpers.merge(config$1.config, options, true));
    // Components
    for (var componentKey in components) {
      Vue.use(components[componentKey]);
    }
    // Config component
    plugins.registerComponentProgrammatic(Vue, 'config', config["default"]);
    Vue.prototype.$buefy.globalNoticeInterval = null;
  }
};
plugins.use(Buefy);

exports.Autocomplete = autocomplete["default"];
exports.Breadcrumb = breadcrumb["default"];
exports.Button = button["default"];
exports.Carousel = carousel["default"];
exports.Checkbox = checkbox["default"];
exports.Collapse = collapse["default"];
exports.Clockpicker = clockpicker["default"];
exports.Color = colorpicker.Color;
exports.Colorpicker = colorpicker.Plugin;
exports.Datepicker = datepicker["default"];
exports.Datetimepicker = datetimepicker["default"];
exports.Dialog = dialog["default"];
exports.DialogProgrammatic = dialog.DialogProgrammatic;
exports.Dropdown = dropdown["default"];
exports.Field = field["default"];
exports.Icon = icon["default"];
exports.Image = image["default"];
exports.Input = input["default"];
exports.Loading = loading["default"];
exports.LoadingProgrammatic = loading.LoadingProgrammatic;
exports.Menu = menu["default"];
exports.Message = message["default"];
exports.Modal = modal["default"];
exports.ModalProgrammatic = modal.ModalProgrammatic;
exports.Notification = notification["default"];
exports.NotificationProgrammatic = notification.NotificationProgrammatic;
exports.Navbar = navbar["default"];
exports.Numberinput = numberinput["default"];
exports.Pagination = pagination["default"];
exports.Progress = progress["default"];
exports.Radio = radio["default"];
exports.Rate = rate["default"];
exports.Select = select["default"];
exports.Skeleton = skeleton["default"];
exports.Sidebar = sidebar["default"];
exports.Slider = slider["default"];
exports.Snackbar = snackbar["default"];
exports.SnackbarProgrammatic = snackbar.SnackbarProgrammatic;
exports.Steps = steps["default"];
exports.Switch = _switch["default"];
exports.Table = table["default"];
exports.Tabs = tabs["default"];
exports.Tag = tag["default"];
exports.Taginput = taginput["default"];
exports.Timepicker = timepicker["default"];
exports.Toast = toast["default"];
exports.ToastProgrammatic = toast.ToastProgrammatic;
exports.Tooltip = tooltip["default"];
exports.Upload = upload["default"];
exports.bound = helpers.bound;
exports.createAbsoluteElement = helpers.createAbsoluteElement;
exports.createNewEvent = helpers.createNewEvent;
exports.escapeRegExpChars = helpers.escapeRegExpChars;
exports.getMonthNames = helpers.getMonthNames;
exports.getValueByPath = helpers.getValueByPath;
exports.getWeekdayNames = helpers.getWeekdayNames;
exports.hasFlag = helpers.hasFlag;
exports.indexOf = helpers.indexOf;
exports.isCustomElement = helpers.isCustomElement;
exports.isDefined = helpers.isDefined;
exports.isMobile = helpers.isMobile;
exports.isNil = helpers.isNil;
exports.isVueComponent = helpers.isVueComponent;
exports.isWebpSupported = helpers.isWebpSupported;
exports.matchWithGroups = helpers.matchWithGroups;
exports.merge = helpers.merge;
exports.mod = helpers.mod;
exports.multiColumnSort = helpers.multiColumnSort;
exports.removeDiacriticsFromString = helpers.removeDiacriticsFromString;
exports.removeElement = helpers.removeElement;
exports.sign = helpers.sign;
exports.toCssWidth = helpers.toCssWidth;
exports.translateTouchAsDragEvent = helpers.translateTouchAsDragEvent;
exports.ConfigProgrammatic = config["default"];
exports["default"] = Buefy;
