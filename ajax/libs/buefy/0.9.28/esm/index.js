import Plugin from './autocomplete.js';
export { default as Autocomplete } from './autocomplete.js';
import Plugin$1 from './breadcrumb.js';
export { default as Breadcrumb } from './breadcrumb.js';
import Plugin$2 from './button.js';
export { default as Button } from './button.js';
import Plugin$3 from './carousel.js';
export { default as Carousel } from './carousel.js';
import Plugin$4 from './checkbox.js';
export { default as Checkbox } from './checkbox.js';
import Plugin$6 from './collapse.js';
export { default as Collapse } from './collapse.js';
import Plugin$5 from './clockpicker.js';
export { default as Clockpicker } from './clockpicker.js';
import { P as Plugin$7 } from './index-903f63ea.js';
export { C as Color, P as Colorpicker } from './index-903f63ea.js';
import Plugin$8 from './datepicker.js';
export { default as Datepicker } from './datepicker.js';
import Plugin$9 from './datetimepicker.js';
export { default as Datetimepicker } from './datetimepicker.js';
import Plugin$a from './dialog.js';
export { default as Dialog, DialogProgrammatic } from './dialog.js';
import Plugin$b from './dropdown.js';
export { default as Dropdown } from './dropdown.js';
import Plugin$c from './field.js';
export { default as Field } from './field.js';
import Plugin$d from './icon.js';
export { default as Icon } from './icon.js';
import Plugin$e from './image.js';
export { default as Image } from './image.js';
import Plugin$f from './input.js';
export { default as Input } from './input.js';
import Plugin$g from './loading.js';
export { default as Loading, LoadingProgrammatic } from './loading.js';
import Plugin$h from './menu.js';
export { default as Menu } from './menu.js';
import Plugin$i from './message.js';
export { default as Message } from './message.js';
import Plugin$j from './modal.js';
export { default as Modal, ModalProgrammatic } from './modal.js';
import Plugin$l from './notification.js';
export { default as Notification, NotificationProgrammatic } from './notification.js';
import Plugin$k from './navbar.js';
export { default as Navbar } from './navbar.js';
import Plugin$m from './numberinput.js';
export { default as Numberinput } from './numberinput.js';
import Plugin$n from './pagination.js';
export { default as Pagination } from './pagination.js';
import Plugin$o from './progress.js';
export { default as Progress } from './progress.js';
import Plugin$p from './radio.js';
export { default as Radio } from './radio.js';
import Plugin$q from './rate.js';
export { default as Rate } from './rate.js';
import Plugin$r from './select.js';
export { default as Select } from './select.js';
import Plugin$s from './skeleton.js';
export { default as Skeleton } from './skeleton.js';
import Plugin$t from './sidebar.js';
export { default as Sidebar } from './sidebar.js';
import Plugin$u from './slider.js';
export { default as Slider } from './slider.js';
import Plugin$v from './snackbar.js';
export { default as Snackbar, SnackbarProgrammatic } from './snackbar.js';
import Plugin$w from './steps.js';
export { default as Steps } from './steps.js';
import Plugin$x from './switch.js';
export { default as Switch } from './switch.js';
import Plugin$y from './table.js';
export { default as Table } from './table.js';
import Plugin$z from './tabs.js';
export { default as Tabs } from './tabs.js';
import Plugin$A from './tag.js';
export { default as Tag } from './tag.js';
import Plugin$B from './taginput.js';
export { default as Taginput } from './taginput.js';
import Plugin$C from './timepicker.js';
export { default as Timepicker } from './timepicker.js';
import Plugin$D from './toast.js';
export { default as Toast, ToastProgrammatic } from './toast.js';
import Plugin$E from './tooltip.js';
export { default as Tooltip } from './tooltip.js';
import Plugin$F from './upload.js';
export { default as Upload } from './upload.js';
import { merge } from './helpers.js';
export { bound, createAbsoluteElement, createNewEvent, escapeRegExpChars, getMonthNames, getValueByPath, getWeekdayNames, hasFlag, indexOf, isCustomElement, isDefined, isMobile, isNil, isVueComponent, isWebpSupported, matchWithGroups, merge, mod, multiColumnSort, removeDiacriticsFromString, removeElement, sign, toCssWidth, translateTouchAsDragEvent } from './helpers.js';
import { s as setVueInstance, a as setOptions, c as config } from './config-e7d4b9c2.js';
import { u as use, r as registerComponentProgrammatic } from './plugins-218aea86.js';
import ConfigComponent from './config.js';
export { default as ConfigProgrammatic } from './config.js';
import './Autocomplete-1a6e8770.js';
import './_rollupPluginBabelHelpers-df313029.js';
import './FormElementMixin-b223d3c7.js';
import './Input-20612b63.js';
import './Icon-60d47b31.js';
import './Button-521f6efc.js';
import './InjectedChildMixin-b4220787.js';
import './Image-75808acb.js';
import './Checkbox-1d02686e.js';
import './CheckRadioMixin-e726a83c.js';
import './TimepickerMixin-d736b0a9.js';
import './DropdownItem-55682322.js';
import './trapFocus-f0736873.js';
import './Field-3ceba31e.js';
import './Select-97781d4e.js';
import './Tooltip-d98a769c.js';
import './Datepicker-0ae1e826.js';
import './Timepicker-38480bbc.js';
import './Modal-7da7641f.js';
import './Loading-ae028ea5.js';
import './ssr-b847d137.js';
import './MessageMixin-d577a9f5.js';
import './NoticeMixin-bd6f61d9.js';
import './Pagination-68f12c1e.js';
import './TabbedChildMixin-bcb13767.js';
import './SlotComponent-8871a20f.js';
import './Tag-6365aa46.js';

var components = /*#__PURE__*/Object.freeze({
    __proto__: null,
    Autocomplete: Plugin,
    Breadcrumb: Plugin$1,
    Button: Plugin$2,
    Carousel: Plugin$3,
    Checkbox: Plugin$4,
    Clockpicker: Plugin$5,
    Collapse: Plugin$6,
    Colorpicker: Plugin$7,
    Datepicker: Plugin$8,
    Datetimepicker: Plugin$9,
    Dialog: Plugin$a,
    Dropdown: Plugin$b,
    Field: Plugin$c,
    Icon: Plugin$d,
    Image: Plugin$e,
    Input: Plugin$f,
    Loading: Plugin$g,
    Menu: Plugin$h,
    Message: Plugin$i,
    Modal: Plugin$j,
    Navbar: Plugin$k,
    Notification: Plugin$l,
    Numberinput: Plugin$m,
    Pagination: Plugin$n,
    Progress: Plugin$o,
    Radio: Plugin$p,
    Rate: Plugin$q,
    Select: Plugin$r,
    Skeleton: Plugin$s,
    Sidebar: Plugin$t,
    Slider: Plugin$u,
    Snackbar: Plugin$v,
    Steps: Plugin$w,
    Switch: Plugin$x,
    Table: Plugin$y,
    Tabs: Plugin$z,
    Tag: Plugin$A,
    Taginput: Plugin$B,
    Timepicker: Plugin$C,
    Toast: Plugin$D,
    Tooltip: Plugin$E,
    Upload: Plugin$F
});

var Buefy = {
  install: function install(Vue) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    setVueInstance(Vue);
    // Options
    setOptions(merge(config, options, true));
    // Components
    for (var componentKey in components) {
      Vue.use(components[componentKey]);
    }
    // Config component
    registerComponentProgrammatic(Vue, 'config', ConfigComponent);
    Vue.prototype.$buefy.globalNoticeInterval = null;
  }
};
use(Buefy);

export { Buefy as default };
