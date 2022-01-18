'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

require('./chunk-92621ff7.js');
var helpers = require('./helpers.js');
var __chunk_2 = require('./chunk-c0adb618.js');
require('./chunk-1061ac68.js');
require('./chunk-d7d30e52.js');
var __chunk_5 = require('./chunk-13e039f5.js');
require('./chunk-74fb31db.js');
require('./chunk-2a2403f9.js');
var autocomplete = require('./autocomplete.js');
var breadcrumb = require('./breadcrumb.js');
require('./chunk-4ebee779.js');
var button = require('./button.js');
require('./chunk-eb8d954b.js');
var carousel = require('./carousel.js');
require('./chunk-f536c03f.js');
require('./chunk-8b8384ca.js');
require('./chunk-3b43d77a.js');
var checkbox = require('./checkbox.js');
var collapse = require('./collapse.js');
require('./chunk-a268cb3d.js');
require('./chunk-ae7e641a.js');
require('./chunk-02406b6a.js');
require('./chunk-a267720d.js');
var clockpicker = require('./clockpicker.js');
require('./chunk-0d901f36.js');
require('./chunk-e8dc6270.js');
var datepicker = require('./datepicker.js');
require('./chunk-0cc2e136.js');
var datetimepicker = require('./datetimepicker.js');
require('./chunk-bb7da16a.js');
var dialog = require('./dialog.js');
var dropdown = require('./dropdown.js');
var field = require('./field.js');
var icon = require('./icon.js');
var image = require('./image.js');
var input = require('./input.js');
require('./chunk-f1df1c63.js');
require('./chunk-1d2f05e0.js');
var loading = require('./loading.js');
var menu = require('./menu.js');
require('./chunk-5a7e385c.js');
var message = require('./message.js');
var modal = require('./modal.js');
var notification = require('./notification.js');
require('./chunk-2cdb1a89.js');
var navbar = require('./navbar.js');
var numberinput = require('./numberinput.js');
require('./chunk-fbf3566e.js');
var pagination = require('./pagination.js');
var progress = require('./progress.js');
var radio = require('./radio.js');
var rate = require('./rate.js');
var select = require('./select.js');
var skeleton = require('./skeleton.js');
var sidebar = require('./sidebar.js');
require('./chunk-4a3a5cf7.js');
var slider = require('./slider.js');
var snackbar = require('./snackbar.js');
require('./chunk-ddd15f05.js');
require('./chunk-bebdaf0b.js');
var steps = require('./steps.js');
var _switch = require('./switch.js');
var table = require('./table.js');
var tabs = require('./tabs.js');
require('./chunk-bfcad370.js');
var tag = require('./tag.js');
var taginput = require('./taginput.js');
var timepicker = require('./timepicker.js');
var toast = require('./toast.js');
var tooltip = require('./tooltip.js');
var upload = require('./upload.js');
var config = require('./config.js');



var components = /*#__PURE__*/Object.freeze({
    Autocomplete: autocomplete.default,
    Breadcrumb: breadcrumb.default,
    Button: button.default,
    Carousel: carousel.default,
    Checkbox: checkbox.default,
    Clockpicker: clockpicker.default,
    Collapse: collapse.default,
    Datepicker: datepicker.default,
    Datetimepicker: datetimepicker.default,
    Dialog: dialog.default,
    Dropdown: dropdown.default,
    Field: field.default,
    Icon: icon.default,
    Image: image.default,
    Input: input.default,
    Loading: loading.default,
    Menu: menu.default,
    Message: message.default,
    Modal: modal.default,
    Navbar: navbar.default,
    Notification: notification.default,
    Numberinput: numberinput.default,
    Pagination: pagination.default,
    Progress: progress.default,
    Radio: radio.default,
    Rate: rate.default,
    Select: select.default,
    Skeleton: skeleton.default,
    Sidebar: sidebar.default,
    Slider: slider.default,
    Snackbar: snackbar.default,
    Steps: steps.default,
    Switch: _switch.default,
    Table: table.default,
    Tabs: tabs.default,
    Tag: tag.default,
    Taginput: taginput.default,
    Timepicker: timepicker.default,
    Toast: toast.default,
    Tooltip: tooltip.default,
    Upload: upload.default
});

var Buefy = {
  install: function install(Vue) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    __chunk_2.setVueInstance(Vue); // Options

    __chunk_2.setOptions(helpers.merge(__chunk_2.config, options, true)); // Components

    for (var componentKey in components) {
      Vue.use(components[componentKey]);
    } // Config component


    __chunk_5.registerComponentProgrammatic(Vue, 'config', config.default);
    Vue.prototype.$buefy.globalNoticeInterval = null;
  }
};
__chunk_5.use(Buefy);

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
exports.Autocomplete = autocomplete.default;
exports.Breadcrumb = breadcrumb.default;
exports.Button = button.default;
exports.Carousel = carousel.default;
exports.Checkbox = checkbox.default;
exports.Collapse = collapse.default;
exports.Clockpicker = clockpicker.default;
exports.Datepicker = datepicker.default;
exports.Datetimepicker = datetimepicker.default;
exports.Dialog = dialog.default;
exports.DialogProgrammatic = dialog.DialogProgrammatic;
exports.Dropdown = dropdown.default;
exports.Field = field.default;
exports.Icon = icon.default;
exports.Image = image.default;
exports.Input = input.default;
exports.Loading = loading.default;
exports.LoadingProgrammatic = loading.LoadingProgrammatic;
exports.Menu = menu.default;
exports.Message = message.default;
exports.Modal = modal.default;
exports.ModalProgrammatic = modal.ModalProgrammatic;
exports.Notification = notification.default;
exports.NotificationProgrammatic = notification.NotificationProgrammatic;
exports.Navbar = navbar.default;
exports.Numberinput = numberinput.default;
exports.Pagination = pagination.default;
exports.Progress = progress.default;
exports.Radio = radio.default;
exports.Rate = rate.default;
exports.Select = select.default;
exports.Skeleton = skeleton.default;
exports.Sidebar = sidebar.default;
exports.Slider = slider.default;
exports.Snackbar = snackbar.default;
exports.SnackbarProgrammatic = snackbar.SnackbarProgrammatic;
exports.Steps = steps.default;
exports.Switch = _switch.default;
exports.Table = table.default;
exports.Tabs = tabs.default;
exports.Tag = tag.default;
exports.Taginput = taginput.default;
exports.Timepicker = timepicker.default;
exports.Toast = toast.default;
exports.ToastProgrammatic = toast.ToastProgrammatic;
exports.Tooltip = tooltip.default;
exports.Upload = upload.default;
exports.ConfigProgrammatic = config.default;
exports.default = Buefy;
