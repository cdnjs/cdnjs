// TinyDatePicker was written as an experiment to see how small a functional date picker
// utility could be. Procedural is a minification optimization.
function TinyDatePicker(input, options) {
  'use strict';

  /////////////////////////////////////////////////////////
  // Initialization and state variables
  var opts = initializeOptions(options);
  var currentDate = opts.parse(input.value);
  var el = buildCalendarElement(currentDate, opts);
  var isHiding = false; // Used to prevent the calendar from showing when transitioning to hidden
  var focusCatcher = htmlToElement('<button style="position: absolute; width: 1; height: 1; overflow: hidden; border: 0; background: transparent; top: 0;"></button>');
  var body = document.body;
  var CustomEvent = window.CustomEvent;
  input.readOnly = true;


  /////////////////////////////////////////////////////////
  // Unintrusive polyfill the custom event for IE9+
  (function () {
    if (typeof CustomEvent === 'function') return false;

    CustomEvent = function (event, params) {
      params = params || { bubbles: false, cancelable: false, detail: undefined };
      var evt = document.createEvent('CustomEvent');
      evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
      return evt;
    }

    CustomEvent.prototype = window.Event.prototype;
  })();


  /////////////////////////////////////////////////////////
  // Event handling/state management
  on(input, 'focus', show);
  on(input, 'click', show);

  on(el, 'keydown', mapKeys({
    '37': shiftDay(-1), // Left
    '38': shiftDay(-7), // Up
    '39': shiftDay(1), // Right
    '40': shiftDay(7), // Down
    '13': function () { pickDate(currentDate) }, // Enter,
    '27': hide // Esc
  }));

  on(el, 'click', mapClick({
    'dp-clear': function () { pickDate() },
    'dp-close': hide,
    'dp-wrapper': hide,
    'dp-prev': shiftMonth(-1),
    'dp-next': shiftMonth(1),
    'dp-today': function () { pickDate(new Date()) },
    'dp-day': function (e) {
      var time = e.target.getAttribute('data-dp');
      time && (pickDate(new Date(parseInt(time))));
    },
  }));

  on(el, 'mousedown', function (e) {
    if (!~['A', 'BUTTON'].indexOf(e.target.tagName)) {
      e.preventDefault(); // Prevent loss of focus
    }
  });

  on(el, 'blur', function (e) {
    setTimeout(function () {
      el.contains(document.activeElement) || hide();
    }, 1);
  });




  /////////////////////////////////////////////////////////
  // UI manipulation functions
  function show() {
    if (isHiding) return;
    setDate(opts.parse(input.value));
    body.appendChild(el);
    body.appendChild(focusCatcher);
    setTimeout(function () {
      el.className += ' dp-visible';
      focus();
    }, 1);
  }

  function hide() {
    if (!body.contains(el)) return;
    isHiding = 1;
    input.focus();
    input.selectionEnd = input.selectionStart;
    body.removeChild(el);
    body.removeChild(focusCatcher);
    el.className = el.className.replace(' dp-visible', '');
    setTimeout(function () { isHiding = 0 }, 1);
  }

  function redraw() {
    el.innerHTML = buildCalendarElement(currentDate, opts).innerHTML;
    focus();
  }

  function focus() {
    el.querySelector('.dp-selected').focus();
  }




  /////////////////////////////////////////////////////////
  // Date manipulation functions
  function pickDate(date) {
    input.value = date ? opts.format(date) : '';
    setDate(date);
    hide();

    // Make sure the input fires its change event
    input.dispatchEvent(new CustomEvent('change', { bubbles: true }));
  }

  function setDate(date) {
    if (date) {
      currentDate = date;
      redraw();
    }
  }

  function shiftDay(amount) {
    return function () {
      currentDate.setDate(currentDate.getDate() + amount);
      setDate(currentDate);
    }
  }

  function shiftMonth(direction) {
    return function () {
      var dt = new Date(currentDate);
      dt.setDate(1);

      if (direction > 0) {
        dt.setMonth(dt.getMonth() + 2);
      }

      dt.setDate(dt.getDate() - 1);

      if (currentDate.getDate() < dt.getDate()) {
        dt.setDate(currentDate.getDate());
      }

      setDate(dt);
    }
  }




  /////////////////////////////////////////////////////////
  // Event mapping helpers
  function mapKeys(map) {
    return function (e) {
      var action = map[e.which];

      if (action && /dp-selected/.test(e.target.className)) {
        e.preventDefault();
        action();
      }
    }
  }

  function mapClick(map) {
    return function (e) {
      e.target.className.split(/[\s]+/g).forEach(function (key) {
        map[key] && map[key](e);
      });
    }
  }




  /////////////////////////////////////////////////////////
  // Default options
  function initializeOptions(opts) {
    return mergeObj({
      format: function (date) {
        return (date.getMonth() + 1) + '/' + date.getDate() + '/' + date.getFullYear();
      },

      parse: function (str) {
        var date = new Date(str);
        return isNaN(date) ? new Date() : date;
      },

      days: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
      months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
      today: 'Today',
      clear: 'Clear',
      close: 'Close'
    }, opts);
  }




  /////////////////////////////////////////////////////////
  // Helper rendering functions
  function buildCalendarElement(date, opts) {
    return htmlToElement('<div class="dp-wrapper">' +
        '<div class="dp">' +
          '<header class="dp-header">' +
            '<button class="dp-prev"></button>' +
            '<span class="dp-month-year">' +
              '<span class="dp-month">' +
                opts.months[date.getMonth()] +
              '</span>' +
              '<span class="dp-year">' +
                date.getFullYear() +
              '</span>' +
            '</span>' +
            '<button class="dp-next"></button>' +
          '</header>' +
          '<div class="dp-body">' +
            renderDateHeadings() +
            renderDaysOfMonth() +
          '</div>' +
          '<footer class="dp-footer">' +
            '<button class="dp-today">' + opts.today + '</button>' +
            '<button class="dp-clear">' + opts.clear + '</button>' +
            '<button class="dp-close">' + opts.close + '</button>' +
          '</footer>' +
        '</div>' +
      '</div>');

    // Render the column headings
    function renderDateHeadings() {
      var html = '';

      // Generate headings...
      for (var i = 0; i < 7; ++i) {
        html += '<span class="dp-day-of-week">' + opts.days[i] + '</span>';
      }

      return html;
    }

    // Render the list of days in the calendar month
    function renderDaysOfMonth() {
      var iter = new Date(date);
      var html = '';

      iter.setDate(1); // First of the month
      iter.setDate(iter.getDate() - iter.getDay()); // Back to Sunday

      // We are going to have 6 weeks always displayed to keep a consistent calendar size
      for (var day = 0; day < (6 * 7); ++day) {
        var dayOfMonth = iter.getDate();
        var classes = 'dp-day';
        var isSelected = iter.toDateString() == date.toDateString();
        var isToday = iter.toDateString() === new Date().toDateString();
        var isNotInMonth = iter.getMonth() !== date.getMonth();
        var tagName = isSelected ? 'a' : 'span';

        isSelected && (classes += ' dp-selected');
        isNotInMonth && (classes += ' dp-edge-day');
        isToday && (classes += ' dp-day-today');

        html += '<' + tagName + ' href="#" class="' + classes + '" data-dp="' + iter.getTime() + '">' +
            dayOfMonth +
          '</' + tagName + '>';

        iter.setDate(dayOfMonth + 1);
      }

      return html;
    }
  }




  /////////////////////////////////////////////////////////
  // Helper functions

  // Shorthand for addEventListener
  function on(el, name, fn) {
    el.addEventListener(name, fn, true);
  }

  // Merge two objects, with the last object overwriting the first
  // Has side-effects (overwrites o1), but don't care...
  function mergeObj(o1, o2) {
    for (var key in o2) {
      o1[key] = o2[key];
    }

    return o1;
  }

  function htmlToElement(htm) {
    var div = document.createElement('div');
    div.innerHTML = htm;
    return div.firstChild;
  }
}

/////////////////////////////////////////////////////////
// Commonjs support
if (typeof module !== 'undefined' && module.exports) {
  module.exports = TinyDatePicker;
}
