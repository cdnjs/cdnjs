'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

require('vue');
var config = require('./config.js');
var autocomplete = require('./autocomplete.js');
var breadcrumb = require('./breadcrumb.js');
var button = require('./button.js');
var carousel = require('./carousel.js');
var checkbox = require('./checkbox.js');
var collapse = require('./collapse.js');
var clockpicker = require('./clockpicker.js');
var colorpicker = require('./index-DiQy3SCb.js');
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
var config$1 = require('./config-DR826Ki2.js');
var plugins = require('./plugins-DbyYGVpp.js');
var Autocomplete = require('./Autocomplete-DEUs3z7g.js');
var Button = require('./Button-Cq7yqI8p.js');
var Checkbox = require('./Checkbox-GPzAMQqM.js');
var Datepicker = require('./Datepicker-B-9ReBe6.js');
var Dropdown = require('./Dropdown-DtpKU9qf.js');
var DropdownItem = require('./DropdownItem-IMOKyRGV.js');
var Field = require('./Field-19ZCJFF8.js');
var Icon = require('./Icon-lsDKE2wQ.js');
var Image = require('./Image-CocPwU3n.js');
var Input = require('./Input-BcloGeZ3.js');
var Loading = require('./Loading-GqqqjipO.js');
var Modal = require('./Modal-D1aZUehE.js');
var Pagination = require('./Pagination-D1MVdiLp.js');
var Progress = require('./Progress-DT9Qc8Id.js');
var Select = require('./Select-DayPKwCY.js');
var Tag = require('./Tag-BprnwJJ1.js');
var Timepicker = require('./Timepicker-CDZ3V-2J.js');
var Tooltip = require('./Tooltip-Cgighv0j.js');
require('./_plugin-vue_export-helper-Die8u8yB.js');
require('./CompatFallthroughMixin-hhK0Gkhr.js');
require('./InjectedChildMixin-CUKn09dB.js');
require('./CheckRadioMixin-CDu0SN3g.js');
require('./TimepickerMixin-C9WVvcUL.js');
require('./FormElementMixin-DavX4iOv.js');
require('./trapFocus-BlX6xykt.js');
require('./MessageMixin-bGuuzfev.js');
require('./NoticeMixin--3RjH43z.js');
require('./TabbedChildMixin-B3JUUwcf.js');
require('./SlotComponent-BruGdRW3.js');
require('./ssr-DVRFTu_P.js');

const allComponents = [
  autocomplete.default,
  breadcrumb.default,
  button.default,
  carousel.default,
  checkbox.default,
  clockpicker.default,
  collapse.default,
  colorpicker.Plugin,
  datepicker.default,
  datetimepicker.default,
  dialog.default,
  dropdown.default,
  field.default,
  icon.default,
  image.default,
  input.default,
  loading.default,
  menu.default,
  message.default,
  modal.default,
  navbar.default,
  notification.default,
  numberinput.default,
  pagination.default,
  progress.default,
  radio.default,
  rate.default,
  select.default,
  skeleton.default,
  sidebar.default,
  slider.default,
  snackbar.default,
  steps.default,
  _switch.default,
  table.default,
  tabs.default,
  tag.default,
  taginput.default,
  timepicker.default,
  toast.default,
  tooltip.default,
  upload.default
];

const Buefy = {
  install(Vue, options = {}) {
    config$1.setOptions(helpers.merge(config$1.config, options, true));
    allComponents.forEach((component) => Vue.use(component));
    plugins.registerComponentProgrammatic(Vue, "config", config.default);
    Vue.config.globalProperties.$buefy.globalNoticeInterval = void 0;
  }
};

exports.ConfigProgrammatic = config.default;
exports.Autocomplete = autocomplete.default;
exports.BBreadcrumb = breadcrumb.BBreadcrumb;
exports.BBreadcrumbItem = breadcrumb.BBreadcrumbItem;
exports.Breadcrumb = breadcrumb.default;
exports.Button = button.default;
exports.BCarousel = carousel.BCarousel;
exports.BCarouselItem = carousel.BCarouselItem;
exports.BCarouselList = carousel.BCarouselList;
exports.Carousel = carousel.default;
exports.BCheckboxButton = checkbox.BCheckboxButton;
exports.Checkbox = checkbox.default;
exports.BCollapse = collapse.BCollapse;
exports.Collapse = collapse.default;
exports.BClockpicker = clockpicker.BClockpicker;
exports.Clockpicker = clockpicker.default;
exports.BColorpicker = colorpicker.Colorpicker;
exports.Color = colorpicker.Color;
exports.Colorpicker = colorpicker.Plugin;
exports.Datepicker = datepicker.default;
exports.BDatetimepicker = datetimepicker.BDatetimepicker;
exports.Datetimepicker = datetimepicker.default;
exports.BDialog = dialog.BDialog;
exports.Dialog = dialog.default;
exports.DialogProgrammatic = dialog.DialogProgrammatic;
exports.Dropdown = dropdown.default;
exports.Field = field.default;
exports.Icon = icon.default;
exports.Image = image.default;
exports.Input = input.default;
exports.Loading = loading.default;
exports.LoadingProgrammatic = loading.LoadingProgrammatic;
exports.BMenu = menu.BMenu;
exports.BMenuItem = menu.BMenuItem;
exports.BMenuList = menu.BMenuList;
exports.Menu = menu.default;
exports.BMessage = message.BMessage;
exports.Message = message.default;
exports.Modal = modal.default;
exports.ModalProgrammatic = modal.ModalProgrammatic;
exports.BNotification = notification.BNotification;
exports.Notification = notification.default;
exports.NotificationProgrammatic = notification.NotificationProgrammatic;
exports.BNavbar = navbar.BNavbar;
exports.BNavbarDropdown = navbar.BNavbarDropdown;
exports.BNavbarItem = navbar.BNavbarItem;
exports.Navbar = navbar.default;
exports.BNumberinput = numberinput.BNumberinput;
exports.Numberinput = numberinput.default;
exports.Pagination = pagination.default;
exports.BProgressBar = progress.BProgressBar;
exports.Progress = progress.default;
exports.BRadio = radio.BRadio;
exports.BRadioButton = radio.BRadioButton;
exports.Radio = radio.default;
exports.BRate = rate.BRate;
exports.Rate = rate.default;
exports.Select = select.default;
exports.BSkeleton = skeleton.BSkeleton;
exports.Skeleton = skeleton.default;
exports.BSidebar = sidebar.BSidebar;
exports.Sidebar = sidebar.default;
exports.BSlider = slider.BSlider;
exports.BSliderTick = slider.BSliderTick;
exports.Slider = slider.default;
exports.BSnackbar = snackbar.BSnackbar;
exports.Snackbar = snackbar.default;
exports.SnackbarProgrammatic = snackbar.SnackbarProgrammatic;
exports.BStepItem = steps.BStepItem;
exports.BSteps = steps.BSteps;
exports.Steps = steps.default;
exports.BSwitch = _switch.BSwitch;
exports.Switch = _switch.default;
exports.BTable = table.BTable;
exports.BTableColumn = table.BTableColumn;
exports.Table = table.default;
exports.BTabItem = tabs.BTabItem;
exports.BTabs = tabs.BTabs;
exports.Tabs = tabs.default;
exports.BTaglist = tag.BTaglist;
exports.Tag = tag.default;
exports.BTaginput = taginput.BTaginput;
exports.Taginput = taginput.default;
exports.Timepicker = timepicker.default;
exports.BToast = toast.BToast;
exports.Toast = toast.default;
exports.ToastProgrammatic = toast.ToastProgrammatic;
exports.Tooltip = tooltip.default;
exports.BUpload = upload.BUpload;
exports.Upload = upload.default;
exports.bound = helpers.bound;
exports.copyAppContext = helpers.copyAppContext;
exports.createAbsoluteElement = helpers.createAbsoluteElement;
exports.createNewEvent = helpers.createNewEvent;
exports.escapeRegExpChars = helpers.escapeRegExpChars;
exports.getComponentFromVNode = helpers.getComponentFromVNode;
exports.getMonthNames = helpers.getMonthNames;
exports.getValueByPath = helpers.getValueByPath;
exports.getWeekdayNames = helpers.getWeekdayNames;
exports.hasFlag = helpers.hasFlag;
exports.indexOf = helpers.indexOf;
exports.isCustomElement = helpers.isCustomElement;
exports.isDefined = helpers.isDefined;
exports.isFragment = helpers.isFragment;
exports.isMobile = helpers.isMobile;
exports.isNil = helpers.isNil;
exports.isTag = helpers.isTag;
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
exports.BAutocomplete = Autocomplete.BAutocomplete;
exports.BButton = Button.BButton;
exports.BCheckbox = Checkbox.BCheckbox;
exports.BDatepicker = Datepicker.BDatepicker;
exports.BDropdown = Dropdown.BDropdown;
exports.BDropdownItem = DropdownItem.BDropdownItem;
exports.BField = Field.Field;
exports.BIcon = Icon.BIcon;
exports.BImage = Image.Image;
exports.BInput = Input.BInput;
exports.BLoading = Loading.BLoading;
exports.BModal = Modal.Modal;
exports.BPagination = Pagination.BPagination;
exports.BPaginationButton = Pagination.PaginationButton;
exports.BProgress = Progress.Progress;
exports.BSelect = Select.BSelect;
exports.BTag = Tag.BTag;
exports.BTimepicker = Timepicker.Timepicker;
exports.BTooltip = Tooltip.Tooltip;
exports.default = Buefy;
