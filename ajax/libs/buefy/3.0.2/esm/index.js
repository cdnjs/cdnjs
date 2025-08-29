import 'vue';
import ConfigComponent from './config.js';
import Plugin from './autocomplete.js';
import Plugin$1 from './breadcrumb.js';
export { BBreadcrumb, BBreadcrumbItem } from './breadcrumb.js';
import Plugin$2 from './button.js';
import Plugin$3 from './carousel.js';
export { BCarousel, BCarouselItem, BCarouselList } from './carousel.js';
import Plugin$4 from './checkbox.js';
export { BCheckboxButton } from './checkbox.js';
import Plugin$6 from './collapse.js';
export { BCollapse } from './collapse.js';
import Plugin$5 from './clockpicker.js';
export { BClockpicker } from './clockpicker.js';
import { P as Plugin$7 } from './index-CQegEsxK.js';
export { a as BColorpicker, C as Color } from './index-CQegEsxK.js';
import Plugin$8 from './datepicker.js';
import Plugin$9 from './datetimepicker.js';
export { BDatetimepicker } from './datetimepicker.js';
import Plugin$a from './dialog.js';
export { BDialog, DialogProgrammatic } from './dialog.js';
import Plugin$b from './dropdown.js';
import Plugin$c from './field.js';
import Plugin$d from './icon.js';
import Plugin$e from './image.js';
import Plugin$f from './input.js';
import Plugin$g from './loading.js';
export { LoadingProgrammatic } from './loading.js';
import Plugin$h from './menu.js';
export { BMenu, BMenuItem, BMenuList } from './menu.js';
import Plugin$i from './message.js';
export { BMessage } from './message.js';
import Plugin$j from './modal.js';
export { ModalProgrammatic } from './modal.js';
import Plugin$l from './notification.js';
export { BNotification, NotificationProgrammatic } from './notification.js';
import Plugin$k from './navbar.js';
export { BNavbar, BNavbarDropdown, BNavbarItem } from './navbar.js';
import Plugin$m from './numberinput.js';
export { BNumberinput } from './numberinput.js';
import Plugin$n from './pagination.js';
import Plugin$o from './progress.js';
export { BProgressBar } from './progress.js';
import Plugin$p from './radio.js';
export { BRadio, BRadioButton } from './radio.js';
import Plugin$q from './rate.js';
export { BRate } from './rate.js';
import Plugin$r from './select.js';
import Plugin$s from './skeleton.js';
export { BSkeleton } from './skeleton.js';
import Plugin$t from './sidebar.js';
export { BSidebar } from './sidebar.js';
import Plugin$u from './slider.js';
export { BSlider, BSliderTick } from './slider.js';
import Plugin$v from './snackbar.js';
export { BSnackbar, SnackbarProgrammatic } from './snackbar.js';
import Plugin$w from './steps.js';
export { BStepItem, BSteps } from './steps.js';
import Plugin$x from './switch.js';
export { BSwitch } from './switch.js';
import Plugin$y from './table.js';
export { BTable, BTableColumn } from './table.js';
import Plugin$z from './tabs.js';
export { BTabItem, BTabs } from './tabs.js';
import Plugin$A from './tag.js';
export { BTaglist } from './tag.js';
import Plugin$B from './taginput.js';
export { BTaginput } from './taginput.js';
import Plugin$C from './timepicker.js';
import Plugin$D from './toast.js';
export { BToast, ToastProgrammatic } from './toast.js';
import Plugin$E from './tooltip.js';
import Plugin$F from './upload.js';
export { BUpload } from './upload.js';
import { merge } from './helpers.js';
export { bound, copyAppContext, createAbsoluteElement, createNewEvent, escapeRegExpChars, getComponentFromVNode, getMonthNames, getValueByPath, getWeekdayNames, hasFlag, indexOf, isCustomElement, isDefined, isFragment, isMobile, isNil, isTag, isVueComponent, isWebpSupported, matchWithGroups, mod, multiColumnSort, removeDiacriticsFromString, removeElement, sign, toCssWidth, translateTouchAsDragEvent } from './helpers.js';
import { s as setOptions, c as config } from './config-CKuo-p6e.js';
import { r as registerComponentProgrammatic } from './plugins-B172kuKE.js';
export { B as BAutocomplete } from './Autocomplete-CZ8DmXsB.js';
export { B as BButton } from './Button-DyUYShTZ.js';
export { B as BCheckbox } from './Checkbox-KUMz0sfA.js';
export { B as BDatepicker } from './Datepicker-Bl8Wfdkn.js';
export { B as BDropdown } from './Dropdown-CGTYVyoL.js';
export { B as BDropdownItem } from './DropdownItem-Cn3nM0A3.js';
export { F as BField } from './Field-B7bX_uUg.js';
export { B as BIcon } from './Icon-DPyGDeRK.js';
export { I as BImage } from './Image-DhX-4hlV.js';
export { B as BInput } from './Input-C4L520az.js';
export { B as BLoading } from './Loading-tuQoo6TU.js';
export { M as BModal } from './Modal-EiR_KNGZ.js';
export { B as BPagination, P as BPaginationButton } from './Pagination-B-LAJQay.js';
export { P as BProgress } from './Progress-BPGTVZgr.js';
export { B as BSelect } from './Select-bl4qUzij.js';
export { B as BTag } from './Tag-jS5Bcj6N.js';
export { T as BTimepicker } from './Timepicker-DnkqnOBT.js';
export { T as BTooltip } from './Tooltip-CtDSXAqa.js';
import './_plugin-vue_export-helper-OJRSZE6i.js';
import './CompatFallthroughMixin-C8LPuwDr.js';
import './InjectedChildMixin-D2K-FwuO.js';
import './CheckRadioMixin-DSD_rjC8.js';
import './TimepickerMixin-Bikh6_Fg.js';
import './FormElementMixin-Dd_wkBN5.js';
import './trapFocus-KHP_kCNE.js';
import './MessageMixin-CQ7LIdvq.js';
import './NoticeMixin-ByNlva3T.js';
import './TabbedChildMixin-C4i6WP9j.js';
import './SlotComponent-BwNpVnfH.js';
import './ssr-C7yEpGLm.js';

const allComponents = [
  Plugin,
  Plugin$1,
  Plugin$2,
  Plugin$3,
  Plugin$4,
  Plugin$5,
  Plugin$6,
  Plugin$7,
  Plugin$8,
  Plugin$9,
  Plugin$a,
  Plugin$b,
  Plugin$c,
  Plugin$d,
  Plugin$e,
  Plugin$f,
  Plugin$g,
  Plugin$h,
  Plugin$i,
  Plugin$j,
  Plugin$k,
  Plugin$l,
  Plugin$m,
  Plugin$n,
  Plugin$o,
  Plugin$p,
  Plugin$q,
  Plugin$r,
  Plugin$s,
  Plugin$t,
  Plugin$u,
  Plugin$v,
  Plugin$w,
  Plugin$x,
  Plugin$y,
  Plugin$z,
  Plugin$A,
  Plugin$B,
  Plugin$C,
  Plugin$D,
  Plugin$E,
  Plugin$F
];

const Buefy = {
  install(Vue, options = {}) {
    setOptions(merge(config, options, true));
    allComponents.forEach((component) => Vue.use(component));
    registerComponentProgrammatic(Vue, "config", ConfigComponent);
    Vue.config.globalProperties.$buefy.globalNoticeInterval = void 0;
  }
};

export { Plugin as Autocomplete, Plugin$1 as Breadcrumb, Plugin$2 as Button, Plugin$3 as Carousel, Plugin$4 as Checkbox, Plugin$5 as Clockpicker, Plugin$6 as Collapse, Plugin$7 as Colorpicker, ConfigComponent as ConfigProgrammatic, Plugin$8 as Datepicker, Plugin$9 as Datetimepicker, Plugin$a as Dialog, Plugin$b as Dropdown, Plugin$c as Field, Plugin$d as Icon, Plugin$e as Image, Plugin$f as Input, Plugin$g as Loading, Plugin$h as Menu, Plugin$i as Message, Plugin$j as Modal, Plugin$k as Navbar, Plugin$l as Notification, Plugin$m as Numberinput, Plugin$n as Pagination, Plugin$o as Progress, Plugin$p as Radio, Plugin$q as Rate, Plugin$r as Select, Plugin$t as Sidebar, Plugin$s as Skeleton, Plugin$u as Slider, Plugin$v as Snackbar, Plugin$w as Steps, Plugin$x as Switch, Plugin$y as Table, Plugin$z as Tabs, Plugin$A as Tag, Plugin$B as Taginput, Plugin$C as Timepicker, Plugin$D as Toast, Plugin$E as Tooltip, Plugin$F as Upload, Buefy as default, merge };
