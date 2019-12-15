(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (factory((global.DateRangePicker = {})));
}(this, (function (exports) { 'use strict';

  /**
   * @file A generic set of mutation-free date functions.
   */

  /**
   * now returns the current date without any time values
   *
   * @returns {Date}
   */
  function now() {
    var dt = new Date();
    dt.setHours(0, 0, 0, 0);
    return dt;
  }

  /**
   * dateEq compares two dates
   *
   * @param {Date} date1 the first date
   * @param {Date} date2 the second date
   * @returns {boolean}
   */
  function datesEq(date1, date2) {
    return (date1 && date1.toDateString()) === (date2 && date2.toDateString());
  }

  /**
   * shiftDay shifts the specified date by n days
   *
   * @param {Date} dt
   * @param {number} n
   * @returns {Date}
   */
  function shiftDay(dt, n) {
    dt = new Date(dt);
    dt.setDate(dt.getDate() + n);
    return dt;
  }

  /**
   * shiftMonth shifts the specified date by a specified number of months
   *
   * @param {Date} dt
   * @param {number} n
   * @param {boolean} wrap optional, if true, does not change year
   *                       value, defaults to false
   * @returns {Date}
   */
  function shiftMonth(dt, n, wrap) {
    dt = new Date(dt);

    var dayOfMonth = dt.getDate();
    var month = dt.getMonth() + n;

    dt.setDate(1);
    dt.setMonth(wrap ? (12 + month) % 12 : month);
    dt.setDate(dayOfMonth);

    // If dayOfMonth = 31, but the target month only has 30 or 29 or whatever...
    // head back to the max of the target month
    if (dt.getDate() < dayOfMonth) {
      dt.setDate(0);
    }

    return dt;
  }

  /**
   * shiftYear shifts the specified date by n years
   *
   * @param {Date} dt
   * @param {number} n
   * @returns {Date}
   */
  function shiftYear(dt, n) {
    dt = new Date(dt);
    dt.setFullYear(dt.getFullYear() + n);
    return dt;
  }

  /**
   * setYear changes the specified date to the specified year
   *
   * @param {Date} dt
   * @param {number} year
   */
  function setYear(dt, year) {
    dt = new Date(dt);
    dt.setFullYear(year);
    return dt;
  }

  /**
   * setMonth changes the specified date to the specified month
   *
   * @param {Date} dt
   * @param {number} month
   */
  function setMonth(dt, month) {
    return shiftMonth(dt, month - dt.getMonth());
  }

  /**
   * dateOrParse creates a function which, given a date or string, returns a date
   *
   * @param {function} parse the function used to parse strings
   * @returns {function}
   */
  function dateOrParse(parse) {
    return function (dt) {
      return dropTime(typeof dt === 'string' ? parse(dt) : dt);
    };
  }

  /**
   * constrainDate returns dt or min/max depending on whether dt is out of bounds (inclusive)
   *
   * @export
   * @param {Date} dt
   * @param {Date} min
   * @param {Date} max
   * @returns {Date}
   */
  function constrainDate(dt, min, max) {
    return (dt < min) ? min :
           (dt > max) ? max :
           dt;
  }

  function dropTime(dt) {
    dt = new Date(dt);
    dt.setHours(0, 0, 0, 0);
    return dt;
  }

  /**
   * @file Utility functions for function manipulation.
   */

  /**
   * bufferFn buffers calls to fn so they only happen every ms milliseconds
   *
   * @param {number} ms number of milliseconds
   * @param {function} fn the function to be buffered
   * @returns {function}
   */
  function bufferFn(ms, fn) {
    var timeout = undefined;
    return function () {
      clearTimeout(timeout);
      timeout = setTimeout(fn, ms);
    };
  }

  /**
   * noop is a function which does nothing at all.
   */
  function noop() { }

  /**
   * copy properties from object o2 to object o1.
   *
   * @params {Object} o1
   * @params {Object} o2
   * @returns {Object}
   */
  function cp() {
    var args = arguments;
    var o1 = args[0];
    for (var i = 1; i < args.length; ++i) {
      var o2 = args[i] || {};
      for (var key in o2) {
        o1[key] = o2[key];
      }
    }
    return o1;
  }

  /**
   * @file Responsible for sanitizing and creating date picker options.
   */

  var english = {
    days: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    months: [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ],
    today: 'Today',
    clear: 'Clear',
    close: 'Close',
  };

  /**
   * DatePickerOptions constructs a new date picker options object, overriding
   * default values with any values specified in opts.
   *
   * @param {DatePickerOptions} opts
   * @returns {DatePickerOptions}
   */
  function DatePickerOptions(opts) {
    opts = opts || {};
    opts = cp(defaults(), opts);
    var parse = dateOrParse(opts.parse);
    opts.lang = cp(english, opts.lang);
    opts.parse = parse;
    opts.inRange = makeInRangeFn(opts);
    opts.min = parse(opts.min || shiftYear(now(), -100));
    opts.max = parse(opts.max || shiftYear(now(), 100));
    opts.hilightedDate = opts.parse(opts.hilightedDate);

    return opts;
  }

  function defaults() {
    return {
      lang: english,

      // Possible values: dp-modal, dp-below, dp-permanent
      mode: 'dp-modal',

      // The date to hilight initially if the date picker has no
      // initial value.
      hilightedDate: now(),

      format: function (dt) {
        return (dt.getMonth() + 1) + '/' + dt.getDate() + '/' + dt.getFullYear();
      },

      parse: function (str) {
        var date = new Date(str);
        return isNaN(date) ? now() : date;
      },

      dateClass: function () { },

      inRange: function () {
        return true;
      }
    };
  }

  function makeInRangeFn(opts) {
    var inRange = opts.inRange; // Cache this version, and return a variant

    return function (dt, dp) {
      return inRange(dt, dp) && opts.min <= dt && opts.max >= dt;
    };
  }

  /**
   * @file Helper functions for dealing with dom elements.
   */

  var Key = {
    left: 37,
    up: 38,
    right: 39,
    down: 40,
    enter: 13,
    esc: 27,
  };

  /**
   * on attaches an event handler to the specified element, and returns an
   * off function which can be used to remove the handler.
   *
   * @param {string} evt the name of the event to handle
   * @param {HTMLElement} el the element to attach to
   * @param {function} handler the event handler
   * @returns {function} the off function
   */
  function on(evt, el, handler) {
    el.addEventListener(evt, handler, true);

    return function () {
      el.removeEventListener(evt, handler, true);
    };
  }

  var CustomEvent = shimCustomEvent();

  function shimCustomEvent() {
    var CustomEvent = window.CustomEvent;

    if (typeof CustomEvent !== 'function') {
      CustomEvent = function (event, params) {
        params = params || {bubbles: false, cancelable: false, detail: undefined};
        var evt = document.createEvent('CustomEvent');
        evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
        return evt;
      };

      CustomEvent.prototype = window.Event.prototype;
    }

    return CustomEvent;
  }

  /**
   * @file Manages the calendar / day-picker view.
   */

  var dayPicker = {
    onKeyDown: keyDown,
    onClick: {
      'dp-day': selectDay,
      'dp-next': gotoNextMonth,
      'dp-prev': gotoPrevMonth,
      'dp-today': selectToday,
      'dp-clear': clear,
      'dp-close': close,
      'dp-cal-month': showMonthPicker,
      'dp-cal-year': showYearPicker,
    },
    render: render
  };

  /**
   * view renders the calendar (day picker) as an HTML string.
   *
   * @param {DatePickerContext} context the date picker being rendered
   * @returns {string}
   */
  function render(dp) {
    var opts = dp.opts;
    var lang = opts.lang;
    var state = dp.state;
    var dayNames = lang.days;
    var dayOffset = opts.dayOffset || 0;
    var selectedDate = state.selectedDate;
    var hilightedDate = state.hilightedDate;
    var hilightedMonth = hilightedDate.getMonth();
    var today = now().getTime();

    return (
      '<div class="dp-cal">' +
        '<header class="dp-cal-header">' +
          '<button tabindex="-1" type="button" class="dp-prev">Prev</button>' +
          '<button tabindex="-1" type="button" class="dp-cal-month">' +
            lang.months[hilightedMonth] +
          '</button>' +
          '<button tabindex="-1" type="button" class="dp-cal-year">' +
            hilightedDate.getFullYear() +
          '</button>' +
          '<button tabindex="-1" type="button" class="dp-next">Next</button>' +
        '</header>' +
        '<div class="dp-days">' +
          dayNames.map(function (name, i) {
            return (
              '<span class="dp-col-header">' + dayNames[(i + dayOffset) % dayNames.length] + '</span>'
            );
          }).join('') +
          mapDays(hilightedDate, dayOffset, function (date) {
            var isNotInMonth = date.getMonth() !== hilightedMonth;
            var isDisabled = !opts.inRange(date);
            var isToday = date.getTime() === today;
            var className = 'dp-day';
            className += (isNotInMonth ? ' dp-edge-day' : '');
            className += (datesEq(date, hilightedDate) ? ' dp-current' : '');
            className += (datesEq(date, selectedDate) ? ' dp-selected' : '');
            className += (isDisabled ? ' dp-day-disabled' : '');
            className += (isToday ? ' dp-day-today' : '');
            className += ' ' + opts.dateClass(date, dp);

            return (
              '<button tabindex="-1" type="button" class="' + className + '" data-date="' + date.getTime() + '">' +
                date.getDate() +
              '</button>'
            );
          }) +
        '</div>' +
        '<footer class="dp-cal-footer">' +
          '<button tabindex="-1" type="button" class="dp-today">' + lang.today + '</button>' +
          '<button tabindex="-1" type="button" class="dp-clear">' + lang.clear + '</button>' +
          '<button tabindex="-1" type="button" class="dp-close">' + lang.close + '</button>' +
        '</footer>' +
      '</div>'
    );
  }

  /**
   * keyDown handles the key down event for the day-picker
   *
   * @param {Event} e
   * @param {DatePickerContext} dp
   */
  function keyDown(e, dp) {
    var key = e.keyCode;
    var shiftBy =
      (key === Key.left) ? -1 :
      (key === Key.right) ? 1 :
      (key === Key.up) ? -7 :
      (key === Key.down) ? 7 :
      0;

    if (key === Key.esc) {
      dp.close();
    } else if (shiftBy) {
      e.preventDefault();
      dp.setState({
        hilightedDate: shiftDay(dp.state.hilightedDate, shiftBy)
      });
    }
  }

  function selectToday(e, dp) {
    dp.setState({
      selectedDate: now(),
    });
  }

  function clear(e, dp) {
    dp.setState({
      selectedDate: null,
    });
  }

  function close(e, dp) {
    dp.close();
  }

  function showMonthPicker(e, dp) {
    dp.setState({
      view: 'month'
    });
  }

  function showYearPicker(e, dp) {
    dp.setState({
      view: 'year'
    });
  }

  function gotoNextMonth(e, dp) {
    var hilightedDate = dp.state.hilightedDate;
    dp.setState({
      hilightedDate: shiftMonth(hilightedDate, 1)
    });
  }

  function gotoPrevMonth(e, dp) {
    var hilightedDate = dp.state.hilightedDate;
    dp.setState({
      hilightedDate: shiftMonth(hilightedDate, -1)
    });
  }

  function selectDay(e, dp) {
    dp.setState({
      selectedDate: new Date(parseInt(e.target.getAttribute('data-date'))),
    });
  }

  function mapDays(currentDate, dayOffset, fn) {
    var result = '';
    var iter = new Date(currentDate);
    iter.setDate(1);
    iter.setDate(1 - iter.getDay() + dayOffset);

    // If we are showing monday as the 1st of the week,
    // and the monday is the 2nd of the month, the sunday won't
    // show, so we need to shift backwards
    if (dayOffset && iter.getDate() === dayOffset + 1) {
      iter.setDate(dayOffset - 6);
    }

    // We are going to have 6 weeks always displayed to keep a consistent
    // calendar size
    for (var day = 0; day < (6 * 7); ++day) {
      result += fn(iter);
      iter.setDate(iter.getDate() + 1);
    }

    return result;
  }

  /**
   * @file Manages the month-picker view.
   */

  var monthPicker = {
    onKeyDown: keyDown$1,
    onClick: {
      'dp-month': onChooseMonth
    },
    render: render$1
  };

  function onChooseMonth(e, dp) {
    dp.setState({
      hilightedDate: setMonth(dp.state.hilightedDate, parseInt(e.target.getAttribute('data-month'))),
      view: 'day',
    });
  }

  /**
   * render renders the month picker as an HTML string
   *
   * @param {DatePickerContext} dp the date picker context
   * @returns {string}
   */
  function render$1(dp) {
    var opts = dp.opts;
    var lang = opts.lang;
    var months = lang.months;
    var currentDate = dp.state.hilightedDate;
    var currentMonth = currentDate.getMonth();

    return (
      '<div class="dp-months">' +
        months.map(function (month, i) {
          var className = 'dp-month';
          className += (currentMonth === i ? ' dp-current' : '');

          return (
            '<button tabindex="-1" type="button" class="' + className + '" data-month="' + i + '">' +
              month +
            '</button>'
          );
        }).join('') +
      '</div>'
    );
  }

  /**
   * keyDown handles keydown events that occur in the month picker
   *
   * @param {Event} e
  * @param {DatePickerContext} dp
   */
  function keyDown$1(e, dp) {
    var key = e.keyCode;
    var shiftBy =
      (key === Key.left) ? -1 :
      (key === Key.right) ? 1 :
      (key === Key.up) ? -3 :
      (key === Key.down) ? 3 :
      0;

    if (key === Key.esc) {
      dp.setState({
        view: 'day',
      });
    } else if (shiftBy) {
      e.preventDefault();
      dp.setState({
        hilightedDate: shiftMonth(dp.state.hilightedDate, shiftBy, true)
      });
    }
  }

  /**
   * @file Manages the year-picker view.
   */

  var yearPicker = {
    render: render$2,
    onKeyDown: keyDown$2,
    onClick: {
      'dp-year': onChooseYear
    },
  };

  /**
   * view renders the year picker as an HTML string.
   *
   * @param {DatePickerContext} dp the date picker context
   * @returns {string}
   */
  function render$2(dp) {
    var state = dp.state;
    var currentYear = state.hilightedDate.getFullYear();
    var selectedYear = state.selectedDate.getFullYear();

    return (
      '<div class="dp-years">' +
        mapYears(dp, function (year) {
          var className = 'dp-year';
          className += (year === currentYear ? ' dp-current' : '');
          className += (year === selectedYear ? ' dp-selected' : '');

          return (
            '<button tabindex="-1" type="button" class="' + className + '" data-year="' + year + '">' +
              year +
            '</button>'
          );
        }) +
      '</div>'
    );
  }

  function onChooseYear(e, dp) {
    dp.setState({
      hilightedDate: setYear(dp.state.hilightedDate, parseInt(e.target.getAttribute('data-year'))),
      view: 'day',
    });
  }

  function keyDown$2(e, dp) {
    var key = e.keyCode;
    var opts = dp.opts;
    var shiftBy =
      (key === Key.left || key === Key.up) ? 1 :
      (key === Key.right || key === Key.down) ? -1 :
      0;

    if (key === Key.esc) {
      dp.setState({
        view: 'day',
      });
    } else if (shiftBy) {
      e.preventDefault();
      var shiftedYear = shiftYear(dp.state.hilightedDate, shiftBy);

      dp.setState({
        hilightedDate: constrainDate(shiftedYear, opts.min, opts.max),
      });
    }
  }

  function mapYears(dp, fn) {
    var result = '';
    var max = dp.opts.max.getFullYear();

    for (var i = max; i >= dp.opts.min.getFullYear(); --i) {
      result += fn(i);
    }

    return result;
  }

  /**
   * @file Defines the base date picker behavior, overridden by various modes.
   */

  var views = {
    day: dayPicker,
    year: yearPicker,
    month: monthPicker
  };

  function BaseMode(input, emit, opts) {
    var detatchInputEvents; // A function that detaches all events from the input
    var closing = false; // A hack to prevent calendar from re-opening when closing.
    var selectedDate; // The currently selected date
    var dp = {
      // The root DOM element for the date picker, initialized on first open.
      el: undefined,
      opts: opts,
      shouldFocusOnBlur: true,
      shouldFocusOnRender: true,
      state: initialState(),
      adjustPosition: noop,
      containerHTML: '<div class="dp"></div>',

      attachToDom: function () {
        document.body.appendChild(dp.el);
      },

      updateInput: function (selectedDate) {
        var e = new CustomEvent('change', {bubbles: true});
        e.simulated = true;
        input.value = selectedDate ? opts.format(selectedDate) : '';
        input.dispatchEvent(e);
      },

      computeSelectedDate: function () {
        return opts.parse(input.value);
      },

      currentView: function() {
        return views[dp.state.view];
      },

      open: function () {
        if (closing) {
          return;
        }

        if (!dp.el) {
          dp.el = createContainerElement(opts, dp.containerHTML);
          attachContainerEvents(dp);
        }

        selectedDate = constrainDate(dp.computeSelectedDate(), opts.min, opts.max);
        dp.state.hilightedDate = selectedDate || opts.hilightedDate;
        dp.state.view = 'day';

        dp.attachToDom();
        dp.render();

        emit('open');
      },

      isVisible: function () {
        return !!dp.el && !!dp.el.parentNode;
      },

      hasFocus: function () {
        var focused = document.activeElement;
        return dp.el &&
          dp.el.contains(focused) &&
          focused.className.indexOf('dp-focuser') < 0;
      },

      shouldHide: function () {
        return dp.isVisible();
      },

      close: function (becauseOfBlur) {
        var el = dp.el;

        if (!dp.isVisible()) {
          return;
        }

        if (el) {
          var parent = el.parentNode;
          parent && parent.removeChild(el);
        }

        closing = true;

        if (becauseOfBlur && dp.shouldFocusOnBlur) {
          focusInput(input);
        }

        // When we close, the input often gains refocus, which
        // can then launch the date picker again, so we buffer
        // a bit and don't show the date picker within N ms of closing
        setTimeout(function() {
          closing = false;
        }, 100);

        emit('close');
      },

      destroy: function () {
        dp.close();
        detatchInputEvents();
      },

      render: function () {
        if (!dp.el) {
          return;
        }

        var hadFocus = dp.hasFocus();
        var html = dp.currentView().render(dp);
        html && (dp.el.firstChild.innerHTML = html);

        dp.adjustPosition();

        if (hadFocus || dp.shouldFocusOnRender) {
          focusCurrent(dp);
        }
      },

      // Conceptually similar to setState in React, updates
      // the view state and re-renders.
      setState: function (state) {
        for (var key in state) {
          dp.state[key] = state[key];
        }

        emit('statechange');
        dp.render();
      },
    };

    detatchInputEvents = attachInputEvents(input, dp);

    // Builds the initial view state
    // selectedDate is a special case and causes changes to hilightedDate
    // hilightedDate is set on open, so remains undefined initially
    // view is the current view (day, month, year)
    function initialState() {
      return {
        get selectedDate() {
          return selectedDate;
        },
        set selectedDate(dt) {
          if (dt && !opts.inRange(dt)) {
            return;
          }

          if (dt) {
            selectedDate = new Date(dt);
            dp.state.hilightedDate = selectedDate;
          } else {
            selectedDate = dt;
          }

          dp.updateInput(selectedDate);
          emit('select');
          dp.close();
        },
        view: 'day',
      };
    }

    return dp;
  }

  function createContainerElement(opts, containerHTML) {
    var el = document.createElement('div');

    el.className = opts.mode;
    el.innerHTML = containerHTML;

    return el;
  }

  function attachInputEvents(input, dp) {
    var bufferShow = bufferFn(5, function () {
      if (dp.shouldHide()) {
        dp.close();
      } else {
        dp.open();
      }
    });

    var off = [
      on('blur', input, bufferFn(150, function () {
        if (!dp.hasFocus()) {
          dp.close(true);
        }
      })),

      on('mousedown', input, function () {
        if (input === document.activeElement) {
          bufferShow();
        }
      }),

      on('focus', input, bufferShow),

      on('input', input, function (e) {
        var date = dp.opts.parse(e.target.value);
        isNaN(date) || dp.setState({
          hilightedDate: date
        });
      }),
    ];

    // Unregister all events that were registered above.
    return function() {
      off.forEach(function (f) {
        f();
      });
    };
  }

  function focusCurrent(dp) {
    var current = dp.el.querySelector('.dp-current');
    return current && current.focus();
  }

  function attachContainerEvents(dp) {
    var el = dp.el;
    var calEl = el.querySelector('.dp');

    // Hack to get iOS to show active CSS states
    el.ontouchstart = noop;

    function onClick(e) {
      e.target.className.split(' ').forEach(function(evt) {
        var handler = dp.currentView().onClick[evt];
        handler && handler(e, dp);
      });
    }

    // The calender fires a blur event *every* time we redraw
    // this means we need to buffer the blur event to see if
    // it still has no focus after redrawing, and only then
    // do we return focus to the input. A possible other approach
    // would be to set context.redrawing = true on redraw and
    // set it to false in the blur event.
    on('blur', calEl, bufferFn(150, function () {
      if (!dp.hasFocus()) {
        dp.close(true);
      }
    }));

    on('keydown', el, function (e) {
      if (e.keyCode === Key.enter) {
        onClick(e);
      } else {
        dp.currentView().onKeyDown(e, dp);
      }
    });

    // If the user clicks in non-focusable space, but
    // still within the date picker, we don't want to
    // hide, so we need to hack some things...
    on('mousedown', calEl, function (e) {
      e.target.focus && e.target.focus(); // IE hack
      if (document.activeElement !== e.target) {
        e.preventDefault();
        focusCurrent(dp);
      }
    });

    on('click', el, onClick);
  }

  function focusInput(input) {
    // When the modal closes, we need to focus the original input so the
    // user can continue tabbing from where they left off.
    input.focus();

    // iOS zonks out if we don't blur the input, so...
    if (/iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream) {
      input.blur();
    }
  }

  /**
   * @file Defines the modal date picker behavior.
   */

  function ModalMode(input, emit, opts) {
    var dp = BaseMode(input, emit, opts);

    // In modal mode, users really shouldn't be able to type in
    // the input, as all input is done via the calendar.
    input.readonly = true;

    // In modal mode, we need to know when the user has tabbed
    // off the end of the calendar, and set focus to the original
    // input. To do this, we add a special element to the DOM.
    // When the user tabs off the bottom of the calendar, they
    // will tab onto this element.
    dp.containerHTML += '<a href="#" class="dp-focuser">.</a>';

    return dp;
  }

  /**
   * @file Defines the dropdown date picker behavior.
   */

  function DropdownMode(input, emit, opts) {
    var dp = BaseMode(input, emit, opts);

    dp.shouldFocusOnBlur = false;

    Object.defineProperty(dp, 'shouldFocusOnRender', {
      get: function() {
        return input !== document.activeElement;
      }
    });

    dp.adjustPosition = function () {
      autoPosition(input, dp);
    };

    return dp;
  }

  function autoPosition(input, dp) {
    var inputPos = input.getBoundingClientRect();
    var win = window;

    adjustCalY(dp, inputPos, win);
    adjustCalX(dp, inputPos, win);

    dp.el.style.visibility = '';
  }

  function adjustCalX(dp, inputPos, win) {
    var cal = dp.el;
    var scrollLeft = win.pageXOffset;
    var inputLeft = inputPos.left + scrollLeft;
    var maxRight = win.innerWidth + scrollLeft;
    var offsetWidth = cal.offsetWidth;
    var calRight = inputLeft + offsetWidth;
    var shiftedLeft = maxRight - offsetWidth;
    var left = calRight > maxRight && shiftedLeft > 0 ? shiftedLeft : inputLeft;

    cal.style.left = left + 'px';
  }

  function adjustCalY(dp, inputPos, win) {
    var cal = dp.el;
    var scrollTop = win.pageYOffset;
    var inputTop = scrollTop + inputPos.top;
    var calHeight = cal.offsetHeight;
    var belowTop = inputTop + inputPos.height + 8;
    var aboveTop = inputTop - calHeight - 8;
    var isAbove = (aboveTop > 0 && belowTop + calHeight > scrollTop + win.innerHeight);
    var top = isAbove ? aboveTop : belowTop;

    if (cal.classList) {
      cal.classList.toggle('dp-is-above', isAbove);
      cal.classList.toggle('dp-is-below', !isAbove);
    }
    cal.style.top = top + 'px';
  }

  /**
   * @file Defines the permanent date picker behavior.
   */

  function PermanentMode(root, emit, opts) {
    var dp = BaseMode(root, emit, opts);

    dp.close = noop;
    dp.destroy = noop;
    dp.updateInput = noop;
    dp.shouldFocusOnRender = opts.shouldFocusOnRender;

    dp.computeSelectedDate = function () {
      return opts.hilightedDate;
    };

    dp.attachToDom = function () {
      root.appendChild(dp.el);
    };

    dp.open();

    return dp;
  }

  /**
   * @file Defines the various date picker modes (modal, dropdown, permanent)
   */

  function Mode(input, emit, opts) {
    input = input && input.tagName ? input : document.querySelector(input);

    if (opts.mode === 'dp-modal') {
      return ModalMode(input, emit, opts);
    }

    if (opts.mode === 'dp-below') {
      return DropdownMode(input, emit, opts);
    }

    if (opts.mode === 'dp-permanent') {
      return PermanentMode(input, emit, opts);
    }
  }

  /**
   * @file Defines simple event emitter behavior.
   */

  /**
   * Emitter constructs a new emitter object which has on/off methods.
   *
   * @returns {EventEmitter}
   */
  function Emitter() {
    var handlers = {};

    function onOne(name, handler) {
      (handlers[name] = (handlers[name] || [])).push(handler);
    }

    function onMany(fns) {
      for (var name in fns) {
        onOne(name, fns[name]);
      }
    }

    return {
      on: function (name, handler) {
        if (handler) {
          onOne(name, handler);
        } else {
          onMany(name);
        }

        return this;
      },

      emit: function (name, arg) {
        (handlers[name] || []).forEach(function (handler) {
          handler(name, arg);
        });
      },

      off: function (name, handler) {
        if (!name) {
          handlers = {};
        } else if (!handler) {
          handlers[name] = [];
        } else {
          handlers[name] = (handlers[name] || []).filter(function (h) {
            return h !== handler;
          });
        }

        return this;
      }
    };
  }

  /**
   * @file The root date picker file, defines public exports for the library.
   */

  /**
  * The date picker language configuration
  * @typedef {Object} LangOptions
  * @property {Array.<string>} [days] - Days of the week
  * @property {Array.<string>} [months] - Months of the year
  * @property {string} today - The label for the 'today' button
  * @property {string} close - The label for the 'close' button
  * @property {string} clear - The label for the 'clear' button
  */

  /**
  * The configuration options for a date picker.
  *
  * @typedef {Object} DatePickerOptions
  * @property {LangOptions} [lang] - Configures the label text, defaults to English
  * @property {('dp-modal'|'dp-below'|'dp-permanent')} [mode] - The date picker mode, defaults to 'dp-modal'
  * @property {(string|Date)} [hilightedDate] - The date to hilight if no date is selected
  * @property {function(string|Date):Date} [parse] - Parses a date, the complement of the "format" function
  * @property {function(Date):string} [format] - Formats a date for displaying to user
  * @property {function(Date):string} [dateClass] - Associates a custom CSS class with a date
  * @property {function(Date):boolean} [inRange] - Indicates whether or not a date is selectable
  * @property {(string|Date)} [min] - The minimum selectable date (inclusive, default 100 years ago)
  * @property {(string|Date)} [max] - The maximum selectable date (inclusive, default 100 years from now)
  */

  /**
  * The state values for the date picker
  *
  * @typedef {Object} DatePickerState
  * @property {string} view - The current view 'day' | 'month' | 'year'
  * @property {Date} selectedDate - The date which has been selected by the user
  * @property {Date} hilightedDate - The date which is currently hilighted / active
  */

  /**
  * An instance of TinyDatePicker
  *
  * @typedef {Object} DatePicker
  * @property {DatePickerState} state - The values currently displayed.
  * @property {function} on - Adds an event handler
  * @property {function} off - Removes an event handler
  * @property {function} setState - Changes the current state of the date picker
  * @property {function} open - Opens the date picker
  * @property {function} close - Closes the date picker
  * @property {function} destroy - Destroys the date picker (removing all handlers from the input, too)
  */

  /**
   * TinyDatePicker constructs a new date picker for the specified input
   *
   * @param {HTMLElement | string} input The input or CSS selector associated with the datepicker
   * @param {DatePickerOptions} opts The options for initializing the date picker
   * @returns {DatePicker}
   */
  function TinyDatePicker(input, opts) {
    var emitter = Emitter();
    var options = DatePickerOptions(opts);
    var mode = Mode(input, emit, options);
    var me = {
      get state() {
        return mode.state;
      },
      on: emitter.on,
      off: emitter.off,
      setState: mode.setState,
      open: mode.open,
      close: mode.close,
      destroy: mode.destroy,
    };

    function emit(evt) {
      emitter.emit(evt, me);
    }

    return me;
  }

  // A date range picker built on top of TinyDatePicker;

  var TinyDatePicker$1 = TinyDatePicker;

  /**
  * The state values for the date range picker
  *
  * @typedef {Object} DateRangeState
  * @property {Date} start - The start date (can be null)
  * @property {Date} end - The end date (can be null)
  */

  /**
  * An instance of TinyDatePicker
  *
  * @typedef {Object} DateRangePickerInst
  * @property {DateRangeState} state - The start / end dates
  * @property {function} on - Adds an event handler
  * @property {function} off - Removes an event handler
  * @property {function} setState - Changes the current state of the date picker
  */

  /**
   * TinyDatePicker constructs a new date picker for the specified input
   *
   * @param {HTMLElement} input The input associated with the datepicker
   * @returns {DateRangePickerInst}
   */
  function DateRangePicker(container, opts) {
    opts = opts || {};
    var emitter = Emitter();
    var root = renderInto(container);
    var hoverDate;
    var state = {
      start: undefined,
      end: undefined,
    };
    var start = TinyDatePicker(root.querySelector('.dr-cal-start'), cp({}, opts.startOpts, {
      mode: 'dp-permanent',
      dateClass: dateClass,
    }));
    var end = TinyDatePicker(root.querySelector('.dr-cal-end'), cp({}, opts.endOpts, {
      mode: 'dp-permanent',
      hilightedDate: shiftMonth(start.state.hilightedDate, 1),
      dateClass: dateClass,
    }));
    var handlers = {
      'statechange': onStateChange,
      'select': dateSelected,
    };
    var me = {
      state: state,
      setState: setState,
      on: emitter.on,
      off: emitter.off,
    };

    start.on(handlers);
    end.on(handlers);

    function onStateChange(_, dp) {
      var d1 = start.state.hilightedDate;
      var d2 = end.state.hilightedDate;
      var diff = diffMonths(d1, d2);

      if (diff === 1) {
        return;
      }

      if (dp === start) {
        end.setState({
          hilightedDate: shiftMonth(dp.state.hilightedDate, 1),
        });
      } else {
        start.setState({
          hilightedDate: shiftMonth(dp.state.hilightedDate, -1),
        });
      }
    }

    function dateSelected(_, dp) {
      var dt = dp.state.selectedDate;

      if (!state.start || state.end) {
        setState({
          start: dt,
          end: undefined,
        });
      } else {
        setState({
          start: dt > state.start ? state.start : dt,
          end: dt > state.start ? dt : state.start,
        });
      }
    }
    function setState(newState) {
      for (var key in newState) {
        state[key] = newState[key];
      }

      emitter.emit('statechange', me);
      rerender();
    }

    function rerender() {
      start.setState({});
      end.setState({});
    }

    // Hack to avoid a situation where iOS requires double-clicking to select
    if (!/iPhone|iPad|iPod/i.test(navigator.userAgent)) {
      root.addEventListener('mouseover', function mouseOverDate(e) {
        if (e.target.classList.contains('dp-day')) {
          var dt = new Date(parseInt(e.target.dataset.date));
          var changed = !datesEq(dt, hoverDate);
    
          if (changed) {
            hoverDate = dt;
            rerender();
          }
        }
      });
    }

    function dateClass(dt) {
      var rangeClass = (state.end || hoverDate) &&
                       state.start &&
                       inRange(dt, state.end || hoverDate, state.start);
      var selectedClass = datesEq(dt, state.start) || datesEq(dt, state.end);

      return (rangeClass ? 'dr-in-range ' : '') +
             (selectedClass ? 'dr-selected ' : '');
    }

    return me;
  }

  function renderInto(container) {
    if (typeof container === 'string') {
      container = document.querySelector(container);
    }

    container.innerHTML = '<div class="dr-cals">' +
      '<div class="dr-cal-start"></div>' +
      '<div class="dr-cal-end"></div>' +
      '</div>';

    return container.querySelector('.dr-cals');
  }

  function toMonths(dt) {
    return (dt.getYear() * 12) + dt.getMonth();
  }

  function diffMonths(d1, d2) {
    return toMonths(d2) - toMonths(d1);
  }

  function inRange(dt, start, end) {
    return (dt < end && dt >= start) || (dt <= start && dt > end);
  }

  exports.TinyDatePicker = TinyDatePicker$1;
  exports.DateRangePicker = DateRangePicker;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
