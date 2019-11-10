// Beginning of module definition /////////////////////////////////////////////////////////////////
var TinyDatePicker = (function() {

// Indenting all the way over, since the rest of the source is really one module
'use strict';

// Constants...
var left = 37;
var up = 38;
var right = 39;
var down = 40;
var CustomEvent = getCustomEventConstructor();

// The module export...
return TinyDatePicker;

// Constructs a new instance of the tiny date picker
function TinyDatePicker(input, opts) {
  var context = buildContext(input, opts || {});

  if (context.isModal) {
    input.readOnly = true;
  } else {
    // For the dropdown calendar, we need to hide when the input loses focus
    // for the modal, we never do this.
    on('blur', input, buffer(5, function () {
      if (context.el && !context.el.contains(document.activeElement)) {
        hideCalendar(context);
      }
    }));
  }

  var bufferShow = buffer(5, function () {
    if (shouldHideModal(context)) {
      hideCalendar(context);
    } else {
      showCalendar(context);
    }
  });

  function tryUpdateDate(e) {
    var date = context.parse(e.target.value);
    isNaN(date) || context.onChange(date, true);
  }

  // With the modal, we always begin and end by setting focus to the input
  // so that tabbing works as expected. This means the focus event needs
  // to be smart. With the dropdown, we only ever show on focus.
  on('mousedown', input, function () {
    if (context.inputFocused()) {
      bufferShow();
    }
  });
  on('focus', input, bufferShow);
  on('input', input, tryUpdateDate);
}

// Builds the date picker's settings based on the opts provided.
function buildContext(input, opts) {
  var context = {
    input: input,
    mode: opts.mode || 'dp-modal',
    days: opts.days || ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    months: opts.months || ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    today: opts.today || 'Today',
    clear: opts.clear || 'Clear',
    close: opts.close || 'Close',
    format: opts.format || function (date) {
      return (date.getMonth() + 1) + '/' + date.getDate() + '/' + date.getFullYear();
    },
    parse: opts.parse || function (str) {
      var date = new Date(str);
      return isNaN(date) ? now() : date;
    },
    inputFocused: function() {
      return input === document.activeElement;
    },
    onChange: function (date, silent) {
      if (date && !inRange(context, date)) {
        return;
      }

      if (date) {
        context.selectedDate = new Date(context.currentDate = date);
      }

      if (!silent) {
        input.value = date ? context.format(date) : '';
      }

      // In modal-mode, if we are setting the value,
      // we are hiding.
      if (context.isModal) {
        input.focus();
      } else {
        render(calHtml, context);
      }

      input.dispatchEvent(new CustomEvent('change', {bubbles: true}));
    },
    weekStartsMonday: opts.weekStartsMonday,
  };

  context.min = initMinMax(context, opts.min, -100);
  context.max = initMinMax(context, opts.max, 100);
  context.isModal = context.mode === 'dp-modal';

  return context;
}

// Buffers calls to fn so they only happen once in ms milliseconds
function buffer(ms, fn) {
  var timeout = undefined;
  return function () {
    clearTimeout(timeout);
    timeout = setTimeout(fn, ms);
  };
}

function showCalendar(context) {
  if (context.el) {
    return;
  }

  var input = context.input;
  var el = document.createElement('div');

  el.className = context.mode;

  // dp-focuser allows us to capture the tab event
  // and put the focus back where it belongs,
  el.innerHTML = '<div class="dp"></div>' + (context.isModal ? '<a href="#" class="dp-focuser">.</a>' : '');

  context.el = el;

  // The calender fires a blur event *every* time we redraw
  // this means we need to buffer the blur event to see if
  // it still has no focus after redrawing, and only then
  // do we return focus to the input. A possible other approach
  // would be to set context.redrawing = true on redraw and
  // set it to false in the blur event.
  var dp = el.querySelector('.dp');
  on('blur', dp, buffer(10, function () {
    if (!dp.contains(document.activeElement)) {
      if (context.isModal) {
        input.focus();
      } else if (!context.inputFocused()) {
        hideCalendar(context);
      }
    }
  }));

  forceDatesIntoMinMax(context);

  if (context.isModal) {
    document.body.appendChild(el);
  } else {
    el.style.visibility = 'hidden'; // We need to render it, then adjust, then show
    input.parentElement.appendChild(el);
  }

  render(calHtml, context);

  if (!context.isModal) {
    autoPosition(el, input);
  }

  // Prevent clicks on the wrapper's children from closing the modal
  on('mousedown', el, function (e) {
    if (e.target !== el && e.target.tagName !== 'A') {
      e.preventDefault();
    }
  });

  on('keydown', el, function (e) {
    // Prevent the window from scrolling around
    // when we are arrowing around the calendar.
    if (e.keyCode >= left && e.keyCode <= down) {
      e.preventDefault();
    }

    if (el.querySelector('.dp-cal')) {
      calKeydown(e, el, context);
    } else if (el.querySelector('.dp-months')) {
      monthsKeydown(e, el, context);
    } else if (el.querySelector('.dp-years')) {
      yearsKeydown(e, el, context);
    }
  });

  on('click', /dp-next/, el, function () {
    shiftMonth(context.currentDate, context.currentDate.getMonth() + 1);
    render(calHtml, context);
  });

  on('click', /dp-prev/, el, function () {
    shiftMonth(context.currentDate, context.currentDate.getMonth() - 1);
    render(calHtml, context);
  });

  on('click', /dp-day/, el, function (e) {
    context.onChange(new Date(parseInt(e.target.getAttribute('data-date'))));
  });

  on('click', /dp-year/, el, function (e) {
    context.currentDate.setFullYear(parseInt(e.target.getAttribute('data-year')));
    render(calHtml, context);
  });

  on('click', /dp-month/, el, function(e) {
    context.currentDate.setMonth(parseInt(e.target.getAttribute('data-month')));
    render(calHtml, context);
  });

  on('click', /dp-cal-year/, el, function () {
    render(yearsHtml, context);
  });

  on('click', /dp-cal-month/, el, function () {
    render(monthsHtml, context);
  });

  on('click', /dp-today/, el, function () {
    context.onChange(now());
  });

  on('click', /dp-clear/, el, function () {
    context.onChange(null);
  });

  on('click', /dp-close/, el, function () {
    input.focus();

    // For dropdown calendars, we need to allow the focus
    // event to play out before hiding, or else the focus
    // event will re-show the calendar.
    !context.isModal && buffer(10, function () {
      hideCalendar(context);
    })();
  });
}

function autoPosition(cal, input) {
  var inputPos = input.getBoundingClientRect();
  var docEl = document.documentElement;

  adjustCalY(cal, input, inputPos, docEl);
  adjustCalX(cal, input, inputPos, docEl);

  cal.style.visibility = '';
}

function adjustCalX(cal, input, inputPos, docEl) {
  var viewWidth = docEl.clientWidth;
  var calWidth = cal.offsetWidth;
  var calRight = inputPos.left + calWidth;
  var shouldLeftAlign = calRight < viewWidth || inputPos.right < calWidth;
  var left = input.offsetLeft - (shouldLeftAlign ? 0 : calRight - viewWidth);

  cal.style.left = left + 'px';
}

function adjustCalY(cal, input, inputPos, docEl) {
  var viewHeight = docEl.clientHeight;
  var calHeight = cal.offsetHeight;
  var calBottom = inputPos.bottom + 8 + calHeight;
  var isAbove = calBottom > viewHeight && inputPos.top > calHeight;
  var top = input.offsetTop + (isAbove ? -calHeight - 8 : input.offsetHeight + 8);

  cal.style.top = top + 'px';
}

// Forces the context's dates to be within min/max
function forceDatesIntoMinMax(context) {
  var input = context.input;
  var parsedValue = context.parse(input.value);
  context.currentDate = (inRange(context, parsedValue) ? parsedValue : new Date(context.min));
  context.selectedDate = new Date(context.currentDate);
  input.value && (input.value = context.format(context.currentDate));
}

function calKeydown(e, el, context) {
  var key = e.keyCode;

  if (key === left) {
    shiftDate(el, context, -1);
  } else if (key === right) {
    shiftDate(el, context, 1);
  } else if (key === up) {
    shiftDate(el, context, -7);
  } else if (key === down) {
    shiftDate(el, context, 7);
  }
}

function monthsKeydown(e, el, context) {
  var key = e.keyCode;

  if (key === left) {
    selectMonth(el, context, -1);
  } else if (key === right) {
    selectMonth(el, context, 1);
  } else if (key === up) {
    selectMonth(el, context, -3);
  } else if (key === down) {
    selectMonth(el, context, 3);
  }
}

function yearsKeydown(e, el, context) {
  var key = e.keyCode;

  if (key === left || key === up) {
    selectYear(e, el, context, -1);
  } else if (key === right || key === down) {
    selectYear(e, el, context, 1);
  }
}

function selectYear(e, el, context, amount) {
  e.preventDefault();

  var newYear = context.currentDate.getFullYear() + amount;
  var validYear = Math.min(context.max.getFullYear(), Math.max(context.min.getFullYear(), newYear));

  context.currentDate.setFullYear(validYear);
  render(yearsHtml, context);
}

function selectMonth(el, context, amount) {
  // This weird formula ensures the date stays within the current year
  var month = (12 + (context.currentDate.getMonth() + amount)) % 12;
  shiftMonth(context.currentDate, month);
  render(monthsHtml, context);
}

function shiftDate(el, context, amount) {
  var dt = context.currentDate;
  dt.setDate(dt.getDate() + amount);
  render(calHtml, context);
}

function on(evt, pattern, el, fn) {
  if (!fn) {
    fn = el;
    el = pattern;
    pattern = /./;
  }

  el.addEventListener(evt, function (e) {
    if (pattern.test(e.target.className)) {
      fn(e);
    }
  }, true);
}

// Renders HTML into context.el's container.
// It keeps the focus on the input or calendar accordingly.
function render(fn, context) {
  var html = fn(context);
  html && (context.el.firstChild.innerHTML = html);
  if (context.isModal || !context.inputFocused()) {
    var current = context.el.querySelector('.dp-current');
    return current && current.focus();
  }
}

// Given the specified context, produces an HTML string
// representing years.
function yearsHtml(context) {
  var currentYear = context.currentDate.getFullYear();
  var selectedYear = context.selectedDate.getFullYear();

  return (
    '<div class="dp-years">' +
      mapYears(context, function (year) {
        var className = 'dp-year';
        className += (year === currentYear ? ' dp-current' : '');
        className += (year === selectedYear ? ' dp-selected' : '');

        return (
          '<a tabindex="-1" href="javascript:;" class="' + className + '" data-year="' + year + '">' +
            year +
          '</a>'
        );
      }) +
    '</div>'
  );
}

// Given the specified context, produces an HTML string
// representing months of the year.
function monthsHtml(context) {
  var months = context.months;
  var currentDate = context.currentDate;
  var currentMonth = currentDate.getMonth();

  return (
    '<div class="dp-months">' +
      months.map(function (month, i) {
        var className = 'dp-month';
        className += (currentMonth === i ? ' dp-current' : '');

        return (
          '<a tabindex="-1" href="javascript:;" class="' + className + '" data-month="' + i + '">' +
            month +
          '</a>'
        );
      }).join('') +
    '</div>'
  );
}

// Given the specified context, produces an HTML string
// representing a calendar.
function calHtml(context) {
  var dayNames = context.days;
  var dayOffset = context.weekStartsMonday ? 1 : 0;
  var currentDate = context.currentDate;
  var selectedDate = context.selectedDate;
  var currentMonth = currentDate.getMonth();
  var today = now().getTime();

  return (
    '<div class="dp-cal">' +
      '<header class="dp-cal-header">' +
        '<a tabindex="-1" href="javascript:;" class="dp-prev">Prev</a>' +
        '<a tabindex="-1" href="javascript:;" class="dp-cal-month">' +
          context.months[currentMonth] +
        '</a>' +
        '<a tabindex="-1" href="javascript:;" class="dp-cal-year">' +
          currentDate.getFullYear() +
        '</a>' +
        '<a tabindex="-1" href="javascript:;" class="dp-next">Next</a>' +
      '</header>' +
      '<div class="dp-days">' +
        dayNames.map(function (name, i) {
          return (
            '<span class="dp-col-header">' + dayNames[(i + dayOffset) % dayNames.length] + '</span>'
          );
        }).join('') +
        mapDays(currentDate, dayOffset, function (date) {
          var isNotInMonth = date.getMonth() !== currentMonth;
          var isDisabled = !inRange(context, date);
          var isToday = date.getTime() === today;
          var className = 'dp-day';
          className += (isNotInMonth ? ' dp-edge-day' : '');
          className += (date.getTime() === currentDate.getTime() ? ' dp-current' : '');
          className += (date.getTime() === selectedDate.getTime() ? ' dp-selected' : '');
          className += (isDisabled ? ' dp-day-disabled' : '');
          className += (isToday ? ' dp-day-today' : '');

          return (
            '<a tabindex="-1" href="javascript:;" class="' + className + '" data-date="' + date.getTime() + '">' +
              date.getDate() +
            '</a>'
          );
        }) +
      '</div>' +
      '<footer class="dp-cal-footer">' +
        '<a tabindex="-1" href="javascript:;" class="dp-today">' + context.today + '</a>' +
        '<a tabindex="-1" href="javascript:;" class="dp-clear">' + context.clear + '</a>' +
        '<a tabindex="-1" href="javascript:;" class="dp-close">' + context.close + '</a>' +
      '</footer>' +
    '</div>'
  );
}

function mapDays(currentDate, dayOffset, fn) {
  var result = '';
  var iter = new Date(currentDate);
  iter.setDate(1);
  iter.setDate(dayOffset + iter.getDate() - iter.getDay());

  // We are going to have 6 weeks always displayed to keep a consistent calendar size
  for (var day = 0; day < (6 * 7); ++day) {
    result += fn(iter);
    iter.setDate(iter.getDate() + 1);
  }

  return result;
}

function mapYears(context, fn) {
  var result = '';
  var max = context.max.getFullYear();

  for (var i = context.min.getFullYear(); i <= max; ++i) {
    result += fn(i);
  }

  return result;
}

function shiftMonth(dt, month) {
  var dayOfMonth = dt.getDate();

  dt.setDate(1);
  dt.setMonth(month);
  dt.setDate(dayOfMonth);

  // If dayOfMonth = 31, but the target month only has 30 or 29 or whatever...
  // head back to the max of the target month
  if (dt.getDate() < dayOfMonth) {
    dt.setDate(1 - dt.getDate());
  }
}

function shouldHideModal(context) {
  return context.isModal && !!context.el;
}

function hideCalendar(context) {
  var el = context.el;
  el && el.parentElement.removeChild(el);
  context.el = undefined;
}

function initMinMax(context, val, yearShift) {
  return val ? context.parse(val) : new Date(now().setFullYear(now().getFullYear() + yearShift));
}

function inRange(context, date) {
  return context.min <= date && context.max >= date;
}

function now() {
  var dt = new Date();
  dt.setHours(0, 0, 0, 0);
  return dt;
}

function getCustomEventConstructor() {
  var CustomEvent = window.CustomEvent;

  if (typeof CustomEvent !== 'function') {
    CustomEvent = function (event, params) {
      params = params || { bubbles: false, cancelable: false, detail: undefined };
      var evt = document.createEvent('CustomEvent');
      evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
      return evt;
    };

    CustomEvent.prototype = window.Event.prototype;
  }

  return CustomEvent;
}

// End of module definition /////////////////////////////////////////////////////////////////////////
}()); ///////////////////////////////////////////////////////////////////////////////////////////////

if (typeof module !== 'undefined' && module.exports) {
  module.exports = TinyDatePicker;
}
