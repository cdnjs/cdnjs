import './chunk-2452e3d3.js';
import { merge } from './helpers.js';
export { bound, createAbsoluteElement, createNewEvent, escapeRegExpChars, getMonthNames, getValueByPath, getWeekdayNames, hasFlag, indexOf, isCustomElement, isDefined, isMobile, isNil, isVueComponent, isWebpSupported, matchWithGroups, merge, mod, multiColumnSort, removeDiacriticsFromString, removeElement, sign, toCssWidth } from './helpers.js';
import { s as setVueInstance, a as setOptions, c as config } from './chunk-8cad1844.js';
import './chunk-590a6902.js';
import './chunk-ea9bc877.js';
import { a as registerComponentProgrammatic, u as use } from './chunk-cca88db8.js';
import './chunk-113685dc.js';
import './chunk-79ac4d01.js';
import Plugin from './autocomplete.js';
export { default as Autocomplete } from './autocomplete.js';
import Plugin$1 from './breadcrumb.js';
export { default as Breadcrumb } from './breadcrumb.js';
import './chunk-efec59b6.js';
import Plugin$2 from './button.js';
export { default as Button } from './button.js';
import './chunk-91404fa9.js';
import Plugin$3 from './carousel.js';
export { default as Carousel } from './carousel.js';
import './chunk-1b63211c.js';
import './chunk-2793447b.js';
import './chunk-252f2b57.js';
import Plugin$4 from './checkbox.js';
export { default as Checkbox } from './checkbox.js';
import Plugin$6 from './collapse.js';
export { default as Collapse } from './collapse.js';
import './chunk-a8516afd.js';
import './chunk-42f463e6.js';
import './chunk-b66a83ce.js';
import './chunk-97f201e0.js';
import Plugin$5 from './clockpicker.js';
export { default as Clockpicker } from './clockpicker.js';
import './chunk-40f06d9c.js';
import './chunk-5f0c3fc4.js';
import Plugin$7 from './datepicker.js';
export { default as Datepicker } from './datepicker.js';
import './chunk-03f0ac1a.js';
import Plugin$8 from './datetimepicker.js';
export { default as Datetimepicker } from './datetimepicker.js';
import './chunk-b99e83bd.js';
import Plugin$9 from './dialog.js';
export { default as Dialog, DialogProgrammatic } from './dialog.js';
import Plugin$a from './dropdown.js';
export { default as Dropdown } from './dropdown.js';
import Plugin$b from './field.js';
export { default as Field } from './field.js';
import Plugin$c from './icon.js';
export { default as Icon } from './icon.js';
import Plugin$d from './image.js';
export { default as Image } from './image.js';
import Plugin$e from './input.js';
export { default as Input } from './input.js';
import './chunk-b9bdb0e4.js';
import './chunk-9e0ae963.js';
import Plugin$f from './loading.js';
export { default as Loading, LoadingProgrammatic } from './loading.js';
import Plugin$g from './menu.js';
export { default as Menu } from './menu.js';
import './chunk-1f41edb4.js';
import Plugin$h from './message.js';
export { default as Message } from './message.js';
import Plugin$i from './modal.js';
export { default as Modal, ModalProgrammatic } from './modal.js';
import Plugin$k from './notification.js';
export { default as Notification, NotificationProgrammatic } from './notification.js';
import './chunk-e7eb83d8.js';
import Plugin$j from './navbar.js';
export { default as Navbar } from './navbar.js';
import Plugin$l from './numberinput.js';
export { default as Numberinput } from './numberinput.js';
import './chunk-bbf5d78a.js';
import Plugin$m from './pagination.js';
export { default as Pagination } from './pagination.js';
import Plugin$n from './progress.js';
export { default as Progress } from './progress.js';
import Plugin$o from './radio.js';
export { default as Radio } from './radio.js';
import Plugin$p from './rate.js';
export { default as Rate } from './rate.js';
import Plugin$q from './select.js';
export { default as Select } from './select.js';
import Plugin$r from './skeleton.js';
export { default as Skeleton } from './skeleton.js';
import Plugin$s from './sidebar.js';
export { default as Sidebar } from './sidebar.js';
import './chunk-2229e354.js';
import Plugin$t from './slider.js';
export { default as Slider } from './slider.js';
import Plugin$u from './snackbar.js';
export { default as Snackbar, SnackbarProgrammatic } from './snackbar.js';
import './chunk-0c4e4e90.js';
import './chunk-e01e9ef0.js';
import Plugin$v from './steps.js';
export { default as Steps } from './steps.js';
import Plugin$w from './switch.js';
export { default as Switch } from './switch.js';
import Plugin$x from './table.js';
export { default as Table } from './table.js';
import Plugin$y from './tabs.js';
export { default as Tabs } from './tabs.js';
import './chunk-2f2f0a74.js';
import Plugin$z from './tag.js';
export { default as Tag } from './tag.js';
import Plugin$A from './taginput.js';
export { default as Taginput } from './taginput.js';
import Plugin$B from './timepicker.js';
export { default as Timepicker } from './timepicker.js';
import Plugin$C from './toast.js';
export { default as Toast, ToastProgrammatic } from './toast.js';
import Plugin$D from './tooltip.js';
export { default as Tooltip } from './tooltip.js';
import Plugin$E from './upload.js';
export { default as Upload } from './upload.js';
import ConfigComponent from './config.js';
export { default as ConfigProgrammatic } from './config.js';



var components = /*#__PURE__*/Object.freeze({
    Autocomplete: Plugin,
    Breadcrumb: Plugin$1,
    Button: Plugin$2,
    Carousel: Plugin$3,
    Checkbox: Plugin$4,
    Clockpicker: Plugin$5,
    Collapse: Plugin$6,
    Datepicker: Plugin$7,
    Datetimepicker: Plugin$8,
    Dialog: Plugin$9,
    Dropdown: Plugin$a,
    Field: Plugin$b,
    Icon: Plugin$c,
    Image: Plugin$d,
    Input: Plugin$e,
    Loading: Plugin$f,
    Menu: Plugin$g,
    Message: Plugin$h,
    Modal: Plugin$i,
    Navbar: Plugin$j,
    Notification: Plugin$k,
    Numberinput: Plugin$l,
    Pagination: Plugin$m,
    Progress: Plugin$n,
    Radio: Plugin$o,
    Rate: Plugin$p,
    Select: Plugin$q,
    Skeleton: Plugin$r,
    Sidebar: Plugin$s,
    Slider: Plugin$t,
    Snackbar: Plugin$u,
    Steps: Plugin$v,
    Switch: Plugin$w,
    Table: Plugin$x,
    Tabs: Plugin$y,
    Tag: Plugin$z,
    Taginput: Plugin$A,
    Timepicker: Plugin$B,
    Toast: Plugin$C,
    Tooltip: Plugin$D,
    Upload: Plugin$E
});

var Buefy = {
  install: function install(Vue) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    setVueInstance(Vue); // Options

    setOptions(merge(config, options, true)); // Components

    for (var componentKey in components) {
      Vue.use(components[componentKey]);
    } // Config component


    registerComponentProgrammatic(Vue, 'config', ConfigComponent);
    Vue.prototype.$buefy.globalNoticeInterval = null;
  }
};
use(Buefy);

export default Buefy;
