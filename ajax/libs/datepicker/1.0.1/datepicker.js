import $ from 'jquery';
import DEFAULTS from './defaults';
import methods from './methods';
import handlers from './handlers';
import render from './render';
import {
  CLASS_HIDE,
  EVENT_CLICK,
  EVENT_FOCUS,
  EVENT_HIDE,
  EVENT_KEYUP,
  EVENT_PICK,
  EVENT_SHOW,
  LANGUAGES,
  NAMESPACE,
  VIEWS,
} from './constants';
import {
  getScrollParent,
  isNaN,
  parseFormat,
  selectorOf,
} from './utilities';

// Classes
const CLASS_TOP_LEFT = `${NAMESPACE}-top-left`;
const CLASS_TOP_RIGHT = `${NAMESPACE}-top-right`;
const CLASS_BOTTOM_LEFT = `${NAMESPACE}-bottom-left`;
const CLASS_BOTTOM_RIGHT = `${NAMESPACE}-bottom-right`;
const CLASS_PLACEMENTS = [
  CLASS_TOP_LEFT,
  CLASS_TOP_RIGHT,
  CLASS_BOTTOM_LEFT,
  CLASS_BOTTOM_RIGHT,
].join(' ');

class Datepicker {
  constructor(element, options = {}) {
    this.$element = $(element);
    this.element = element;
    this.options = $.extend(
      {},
      DEFAULTS,
      LANGUAGES[options.language],
      $.isPlainObject(options) && options,
    );
    this.$scrollParent = getScrollParent(element, true);
    this.built = false;
    this.shown = false;
    this.isInput = false;
    this.inline = false;
    this.initialValue = '';
    this.initialDate = null;
    this.startDate = null;
    this.endDate = null;
    this.init();
  }

  init() {
    const { $element: $this, options } = this;
    let { startDate, endDate, date } = options;

    this.$trigger = $(options.trigger);
    this.isInput = $this.is('input') || $this.is('textarea');
    this.inline = options.inline && (options.container || !this.isInput);
    this.format = parseFormat(options.format);

    const initialValue = this.getValue();

    this.initialValue = initialValue;
    this.oldValue = initialValue;
    date = this.parseDate(date || initialValue);

    if (startDate) {
      startDate = this.parseDate(startDate);

      if (date.getTime() < startDate.getTime()) {
        date = new Date(startDate);
      }

      this.startDate = startDate;
    }

    if (endDate) {
      endDate = this.parseDate(endDate);

      if (startDate && endDate.getTime() < startDate.getTime()) {
        endDate = new Date(startDate);
      }

      if (date.getTime() > endDate.getTime()) {
        date = new Date(endDate);
      }

      this.endDate = endDate;
    }

    this.date = date;
    this.viewDate = new Date(date);
    this.initialDate = new Date(this.date);
    this.bind();

    if (options.autoShow || this.inline) {
      this.show();
    }

    if (options.autoPick) {
      this.pick();
    }
  }

  build() {
    if (this.built) {
      return;
    }

    this.built = true;

    const { $element: $this, options } = this;
    const $picker = $(options.template);

    this.$picker = $picker;
    this.$week = $picker.find(selectorOf('week'));

    // Years view
    this.$yearsPicker = $picker.find(selectorOf('years picker'));
    this.$yearsPrev = $picker.find(selectorOf('years prev'));
    this.$yearsNext = $picker.find(selectorOf('years next'));
    this.$yearsCurrent = $picker.find(selectorOf('years current'));
    this.$years = $picker.find(selectorOf('years'));

    // Months view
    this.$monthsPicker = $picker.find(selectorOf('months picker'));
    this.$yearPrev = $picker.find(selectorOf('year prev'));
    this.$yearNext = $picker.find(selectorOf('year next'));
    this.$yearCurrent = $picker.find(selectorOf('year current'));
    this.$months = $picker.find(selectorOf('months'));

    // Days view
    this.$daysPicker = $picker.find(selectorOf('days picker'));
    this.$monthPrev = $picker.find(selectorOf('month prev'));
    this.$monthNext = $picker.find(selectorOf('month next'));
    this.$monthCurrent = $picker.find(selectorOf('month current'));
    this.$days = $picker.find(selectorOf('days'));

    if (this.inline) {
      $(options.container || $this).append($picker.addClass(`${NAMESPACE}-inline`));
    } else {
      $(document.body).append($picker.addClass(`${NAMESPACE}-dropdown`));
      $picker.addClass(CLASS_HIDE).css({
        zIndex: parseInt(options.zIndex, 10),
      });
    }

    this.renderWeek();
  }

  unbuild() {
    if (!this.built) {
      return;
    }

    this.built = false;
    this.$picker.remove();
  }

  bind() {
    const { options, $element: $this } = this;

    if ($.isFunction(options.show)) {
      $this.on(EVENT_SHOW, options.show);
    }

    if ($.isFunction(options.hide)) {
      $this.on(EVENT_HIDE, options.hide);
    }

    if ($.isFunction(options.pick)) {
      $this.on(EVENT_PICK, options.pick);
    }

    if (this.isInput) {
      $this.on(EVENT_KEYUP, $.proxy(this.keyup, this));
    }

    if (!this.inline) {
      if (options.trigger) {
        this.$trigger.on(EVENT_CLICK, $.proxy(this.toggle, this));
      } else if (this.isInput) {
        $this.on(EVENT_FOCUS, $.proxy(this.show, this));
      } else {
        $this.on(EVENT_CLICK, $.proxy(this.show, this));
      }
    }
  }

  unbind() {
    const { $element: $this, options } = this;

    if ($.isFunction(options.show)) {
      $this.off(EVENT_SHOW, options.show);
    }

    if ($.isFunction(options.hide)) {
      $this.off(EVENT_HIDE, options.hide);
    }

    if ($.isFunction(options.pick)) {
      $this.off(EVENT_PICK, options.pick);
    }

    if (this.isInput) {
      $this.off(EVENT_KEYUP, this.keyup);
    }

    if (!this.inline) {
      if (options.trigger) {
        this.$trigger.off(EVENT_CLICK, this.toggle);
      } else if (this.isInput) {
        $this.off(EVENT_FOCUS, this.show);
      } else {
        $this.off(EVENT_CLICK, this.show);
      }
    }
  }

  showView(view) {
    const {
      $yearsPicker,
      $monthsPicker,
      $daysPicker,
      format,
    } = this;

    if (format.hasYear || format.hasMonth || format.hasDay) {
      switch (Number(view)) {
        case VIEWS.YEARS:
          $monthsPicker.addClass(CLASS_HIDE);
          $daysPicker.addClass(CLASS_HIDE);

          if (format.hasYear) {
            this.renderYears();
            $yearsPicker.removeClass(CLASS_HIDE);
            this.place();
          } else {
            this.showView(VIEWS.DAYS);
          }

          break;

        case VIEWS.MONTHS:
          $yearsPicker.addClass(CLASS_HIDE);
          $daysPicker.addClass(CLASS_HIDE);

          if (format.hasMonth) {
            this.renderMonths();
            $monthsPicker.removeClass(CLASS_HIDE);
            this.place();
          } else {
            this.showView(VIEWS.YEARS);
          }

          break;

        // case VIEWS.DAYS:
        default:
          $yearsPicker.addClass(CLASS_HIDE);
          $monthsPicker.addClass(CLASS_HIDE);

          if (format.hasDay) {
            this.renderDays();
            $daysPicker.removeClass(CLASS_HIDE);
            this.place();
          } else {
            this.showView(VIEWS.MONTHS);
          }
      }
    }
  }

  hideView() {
    if (!this.inline && this.options.autoHide) {
      this.hide();
    }
  }

  place() {
    if (this.inline) {
      return;
    }

    const { $element: $this, options, $picker } = this;
    const containerWidth = $(document).outerWidth();
    const containerHeight = $(document).outerHeight();
    const elementWidth = $this.outerWidth();
    const elementHeight = $this.outerHeight();
    const width = $picker.width();
    const height = $picker.height();
    let { left, top } = $this.offset();
    let offset = parseFloat(options.offset);
    let placement = CLASS_TOP_LEFT;

    if (isNaN(offset)) {
      offset = 10;
    }

    if (top > height && top + elementHeight + height > containerHeight) {
      top -= height + offset;
      placement = CLASS_BOTTOM_LEFT;
    } else {
      top += elementHeight + offset;
    }

    if (left + width > containerWidth) {
      left += elementWidth - width;
      placement = placement.replace('left', 'right');
    }

    $picker.removeClass(CLASS_PLACEMENTS).addClass(placement).css({
      top,
      left,
    });
  }

  // A shortcut for triggering custom events
  trigger(type, data) {
    const e = $.Event(type, data);

    this.$element.trigger(e);

    return e;
  }

  createItem(data) {
    const { options } = this;
    const { itemTag } = options;
    const item = {
      text: '',
      view: '',
      muted: false,
      picked: false,
      disabled: false,
      highlighted: false,
    };
    const classes = [];

    $.extend(item, data);

    if (item.muted) {
      classes.push(options.mutedClass);
    }

    if (item.highlighted) {
      classes.push(options.highlightedClass);
    }

    if (item.picked) {
      classes.push(options.pickedClass);
    }

    if (item.disabled) {
      classes.push(options.disabledClass);
    }

    return (`<${itemTag} class="${classes.join(' ')}" data-view="${item.view}">${item.text}</${itemTag}>`);
  }

  getValue() {
    const $this = this.$element;

    return this.isInput ? $this.val() : $this.text();
  }

  setValue(value = '') {
    const $this = this.$element;

    if (this.isInput) {
      $this.val(value);
    } else if (!this.inline || this.options.container) {
      $this.text(value);
    }
  }

  static setDefaults(options = {}) {
    $.extend(DEFAULTS, LANGUAGES[options.language], $.isPlainObject(options) && options);
  }
}

if ($.extend) {
  $.extend(Datepicker.prototype, render, handlers, methods);
}

export default Datepicker;
