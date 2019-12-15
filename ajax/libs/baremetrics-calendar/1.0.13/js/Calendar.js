'use strict';


(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(['jquery', 'moment'], factory);
  } else if (typeof exports === 'object') {
    // Node/CommonJS
    module.exports = factory(require('jquery'), require('moment'));
  } else {
    // Browser globals
    root.Calendar = factory(jQuery, moment);
  }
} (this, function ($, moment) {
  function Calendar(settings) {
    var self = this;

    this.settings =       settings;

    this.calIsOpen =      false;
    this.presetIsOpen =   false;
    this.sameDayRange =   settings.same_day_range || false;

    this.element =        settings.element || $('.daterange');
    this.selected =       null;

    this.type =           this.element.hasClass('daterange--single') ? 'single' : 'double';
    this.required =       settings.required == false ? false : true;

    this.format =             settings.format || {};
    this.format.input =       settings.format && settings.format.input || 'MMMM D, YYYY';
    this.format.preset =      settings.format && settings.format.preset || 'll';
    this.format.jump_month =  settings.format && settings.format.jump_month || 'MMMM';
    this.format.jump_year =   settings.format && settings.format.jump_year || 'YYYY';

    this.placeholder =    settings.placeholder || this.format.input;

    this.days_array =     settings.days_array && settings.days_array.length == 7 ?
                          settings.days_array : moment.weekdaysMin();

    this.orig_start_date =    null;
    this.orig_end_date =      null;
    this.orig_current_date =  null;

    this.earliest_date =  settings.earliest_date ? moment(settings.earliest_date)
                          : moment('1900-01-01', 'YYYY-MM-DD');
    this.latest_date =    settings.latest_date ? moment(settings.latest_date)
                          : moment('2900-12-31', 'YYYY-MM-DD');
    this.end_date =       settings.end_date ? moment(settings.end_date)
                          : (this.type == 'double' ? moment() : null);
    this.start_date =     settings.start_date ? moment(settings.start_date)
                          : (this.type == 'double' ? this.end_date.clone().subtract(1, 'month') : null);
    this.current_date =   settings.current_date ? moment(settings.current_date)
                          : (this.type == 'single' ? moment() : null);

    this.presets =        settings.presets == false || this.type == 'single' ? false : true;

    this.callback =       settings.callback || this.calendarSetDates;

    this.calendarHTML(this.type);

    $('.dr-presets', this.element).click(function() {
      self.presetToggle();
    });

    $('.dr-list-item', this.element).click(function() {
      var start = $('.dr-item-aside', this).data('start');
      var end = $('.dr-item-aside', this).data('end');

      self.start_date = self.calendarCheckDate(start);
      self.end_date = self.calendarCheckDate(end);

      self.calendarSetDates();
      self.presetToggle();
      self.calendarSaveDates();
    });

    $('.dr-date', this.element).on({
      'click': function() {
        self.calendarOpen(this);
      },

      'keyup': function(event) {
        if (event.keyCode == 9 && !self.calIsOpen && !self.start_date && !self.end_date)
          self.calendarOpen(this);
      },

      'keydown': function(event) {
        switch (event.keyCode) {

          case 9: // Tab
            if ($(self.selected).hasClass('dr-date-start')) {
              event.preventDefault();
              self.calendarCheckDates();
              self.calendarSetDates();
              $('.dr-date-end', self.element).trigger('click');
            } else {
              self.calendarCheckDates();
              self.calendarSetDates();
              self.calendarSaveDates();
              self.calendarClose('force');
            }
          break;

          case 13: // Enter
            event.preventDefault();
            self.calendarCheckDates();
            self.calendarSetDates();
            self.calendarSaveDates();
            self.calendarClose('force');
          break;

          case 27: // ESC
            self.calendarSetDates();
            self.calendarClose('force');
          break;

          case 38: // Up
            event.preventDefault();
            var timeframe = 'day';

            if (event.shiftKey)
              timeframe = 'week';

            if (event.metaKey)
              timeframe = 'month';

            var back = moment(self.current_date).subtract(1, timeframe);

            $(this).html(back.format(self.format.input));
            self.current_date = back;
          break;

          case 40: // Down
            event.preventDefault();
            var timeframe = 'day';

            if (event.shiftKey)
              timeframe = 'week';

            if (event.metaKey)
              timeframe = 'month';

            var forward = moment(self.current_date).add(1, timeframe);

            $(this).html(forward.format(self.format.input));
            self.current_date = forward;
          break;
        }
      }
    });

    $('.dr-month-switcher i', this.element).click(function() {
      var m = $('.dr-month-switcher span', self.element).data('month');
      var y = $('.dr-year-switcher span', self.element).data('year');
      var this_moment = moment([y, m, 1]);
      var back = this_moment.clone().subtract(1, 'month');
      var forward = this_moment.clone().add(1, 'month').startOf('day');

      if ($(this).hasClass('dr-left')) {
        self.calendarOpen(self.selected, back);
      } else if ($(this).hasClass('dr-right')) {
        self.calendarOpen(self.selected, forward);
      }
    });

    $('.dr-year-switcher i', this.element).click(function() {
      var m = $('.dr-month-switcher span', self.element).data('month');
      var y = $('.dr-year-switcher span', self.element).data('year');
      var this_moment = moment([y, m, 1]);
      var back = this_moment.clone().subtract(1, 'year');
      var forward = this_moment.clone().add(1, 'year').startOf('day');


      if ($(this).hasClass('dr-left')) {
        self.calendarOpen(self.selected, back);
      } else if ($(this).hasClass('dr-right')) {
        self.calendarOpen(self.selected, forward);
      }
    });

    $('.dr-dates-dash', this.element).click(function() {
      $('.dr-date-start', self.element).trigger('click');
    });

    // Once you click into a selection.. this lets you click out
    this.element.on('click', function() {
      document.addEventListener('click', function (event) {
        var contains = $(event.target).parents(self.element);

        if (!contains.length) {
          if (self.presetIsOpen)
            self.presetToggle();

          if (self.calIsOpen) {
            if ($(self.selected).hasClass('dr-date-end'))
              self.calendarSaveDates();

            self.calendarSetDates();
            self.calendarClose('force');
          }
        }
      });
    });
  }


  Calendar.prototype.presetToggle = function() {
    if (this.presetIsOpen == false) {
      this.orig_start_date = this.start_date;
      this.orig_end_date = this.end_date;
      this.orig_current_date = this.current_date;

      this.presetIsOpen = true;
    } else if (this.presetIsOpen) {
      this.presetIsOpen = false;
    }

    if (this.calIsOpen == true)
      this.calendarClose();

    $('.dr-preset-list', this.element).slideToggle(200);
    $('.dr-input', this.element).toggleClass('dr-active');
    $('.dr-presets', this.element).toggleClass('dr-active');
    this.element.toggleClass('dr-active');
  }


  Calendar.prototype.presetCreate = function() {
    var self = this;
    var ul_presets = $('<ul class="dr-preset-list" style="display: none;"></ul>');
    var presets = typeof self.settings.presets === 'object' ? self.settings.presets :
    [{
      label: 'Last 30 days',
      start: moment(self.latest_date).subtract(29, 'days'),
      end: self.latest_date
    },{
      label: 'Last month',
      start: moment(self.latest_date).subtract(1, 'month').startOf('month'),
      end: moment(self.latest_date).subtract(1, 'month').endOf('month')
    },{
      label: 'Last 3 months',
      start: moment(self.latest_date).subtract(3, 'month').startOf('month'),
      end: moment(self.latest_date).subtract(1, 'month').endOf('month')
    },{
      label: 'Last 6 months',
      start: moment(self.latest_date).subtract(6, 'month').startOf('month'),
      end: moment(self.latest_date).subtract(1, 'month').endOf('month')
    },{
      label: 'Last year',
      start: moment(self.latest_date).subtract(1, 'year').startOf('year'),
      end: moment(self.latest_date).subtract(1, 'year').endOf('year')
    },{
      label: 'All time',
      start: self.earliest_date,
      end: self.latest_date
    }];

    if (moment(self.latest_date).diff(moment(self.latest_date).startOf('month'), 'days') >= 6 &&
        typeof self.settings.presets !== 'object'
    ) {
      presets.splice(1, 0, {
        label: 'This month',
        start: moment(self.latest_date).startOf('month'),
        end: self.latest_date
      });
    }

    $.each(presets, function(i, d) {
      if (moment(d.start).isBefore(self.earliest_date)) {
        d.start = self.earliest_date;
      }
      if (moment(d.start).isAfter(self.latest_date)) {
        d.start = self.latest_date;
      }
      if (moment(d.end).isBefore(self.earliest_date)) {
        d.end = self.earliest_date;
      }
      if (moment(d.end).isAfter(self.latest_date)) {
        d.end = self.latest_date;
      }

      var startISO = moment(d.start).toISOString();
      var endISO = moment(d.end).toISOString();
      var string = moment(d.start).format(self.format.preset) +' &ndash; '+ moment(d.end).format(self.format.preset);

      if ($('.dr-preset-list', self.element).length) {
        var item = $('.dr-preset-list .dr-list-item:nth-of-type('+ (i + 1) +') .dr-item-aside', self.element);
        item.data('start', startISO);
        item.data('end', endISO);
        item.html(string);
      } else {
        ul_presets.append('<li class="dr-list-item">'+ d.label +
          '<span class="dr-item-aside" data-start="'+ startISO +'" data-end="'+ endISO +'">'+ string +'</span>'+
        '</li>');
      }
    });

    return ul_presets;
  }


  Calendar.prototype.calendarSetDates = function() {
    $('.dr-date-start', this.element).html(moment(this.start_date).format(this.format.input));
    $('.dr-date-end', this.element).html(moment(this.end_date).format(this.format.input));

    if (!this.start_date && !this.end_date) {
      var old_date = $('.dr-date', this.element).html();
      var new_date = moment(this.current_date).format(this.format.input);

      if (old_date.length === 0 && !this.required)
        new_date = '';

      if (old_date != new_date)
        $('.dr-date', this.element).html(new_date);
    }
  }


  Calendar.prototype.calendarSaveDates = function() {
    if (this.type === 'double') {
      if (!moment(this.orig_end_date).isSame(this.end_date) || !moment(this.orig_start_date).isSame(this.start_date))
        return this.callback();
    } else {
      if (!this.required || !moment(this.orig_current_date).isSame(this.current_date))
        return this.callback();
    }
  }

  Calendar.prototype.calendarCheckDate = function(d) {
    // Today
    if (d === 'today' || d === 'now')
      return moment().isAfter(this.latest_date) ? this.latest_date :
              moment().isBefore(this.earliest_date) ? this.earliest_date : moment();

    // Earliest
    if (d === 'earliest')
      return this.earliest_date;

    // Latest
    if (d === 'latest')
      return this.latest_date;

    // Convert string to a date if keyword ago or ahead exists
    if (d && (/\bago\b/.test(d) || /\bahead\b/.test(d)))
      return this.stringToDate(d);

    var regex = /(?:\d)((?:st|nd|rd|th)?,?)/;
    var d_array = d ? d.replace(regex, '').split(' ') : [];

    // Add current year if year is not included
    if (d_array.length == 2) {
      d_array.push(moment().format(this.format.jump_year));
      d = d_array.join(' ');
    }

    // Convert using settings format
    var parsed_d = this.parseDate(d);

    if (!parsed_d.isValid())
        return moment(d); // occurs when parsing preset dates

    return parsed_d;
  }

  Calendar.prototype.calendarCheckDates = function() {
    var startTxt = $('.dr-date-start', this.element).html();
    var endTxt = $('.dr-date-end', this.element).html();
    var c = this.calendarCheckDate($(this.selected).html());
    var s;
    var e;

    // Modify strings via some specific keywords to create valid dates
    // Finally set all strings as dates
    if (startTxt === 'ytd' || endTxt === 'ytd') { // Year to date
      s = moment().startOf('year');
      e = moment().endOf('year');
    } else {
      s = this.calendarCheckDate(startTxt);
      e = this.calendarCheckDate(endTxt);
    }

    if (c.isBefore(this.earliest_date))
      c = this.earliest_date;
    if (s.isBefore(this.earliest_date))
      s = this.earliest_date;
    if (e.isBefore(this.earliest_date) || e.isBefore(s))
      e = s.clone().add(6, 'day');

    if (c.isAfter(this.latest_date))
      c = this.latest_date;
    if (e.isAfter(this.latest_date))
      e = this.latest_date;
    if (s.isAfter(this.latest_date) || s.isAfter(e))
      s = e.clone().subtract(6, 'day');

    // Push and save if it's valid otherwise return to previous state
    if (this.type === 'double') {

      // Is this a valid date?
      if (s.isSame(e) && !this.sameDayRange)
        return this.calendarSetDates();

      this.start_date = s.isValid() ? s : this.start_date;
      this.end_date = e.isValid() ? e : this.end_date;
    }

    this.current_date = c.isValid() ? c : this.current_date;
  }


  Calendar.prototype.stringToDate = function(str) {
    var date_arr = str.split(' ');

    if (date_arr[2] === 'ago') {
      return moment(this.current_date).subtract(date_arr[0], date_arr[1]);
    }

    else if (date_arr[2] === 'ahead') {
      return moment(this.current_date).add(date_arr[0], date_arr[1]);
    }

    return this.current_date;
  }


  Calendar.prototype.calendarOpen = function(selected, switcher) {
    var self = this;
    var other;
    var cal_width = $('.dr-dates', this.element).innerWidth() - 8;

    this.selected = selected || this.selected;

    if (this.presetIsOpen == true)
      this.presetToggle();

    if (this.calIsOpen == true) {
      this.calendarClose(switcher ? 'switcher' : undefined);
    } else if ($(this.selected).html().length) {
      this.orig_start_date = this.start_date;
      this.orig_end_date = this.end_date;
      this.orig_current_date = this.current_date;
    }

    this.calendarCheckDates();
    this.calendarCreate(switcher);
    this.calendarSetDates();

    var next_month = moment(switcher || this.current_date).add(1, 'month').startOf('month').startOf('day');
    var past_month = moment(switcher || this.current_date).subtract(1, 'month').endOf('month');
    var next_year = moment(switcher || this.current_date).add(1, 'year').startOf('month').startOf('day');
    var past_year = moment(switcher || this.current_date).subtract(1, 'year').endOf('month');
    var this_moment = moment(switcher || this.current_date);

    $('.dr-month-switcher span', this.element)
      .data('month', this_moment.month())
      .html(this_moment.format(this.format.jump_month));
    $('.dr-year-switcher span', this.element)
      .data('year', this_moment.year())
      .html(this_moment.format(this.format.jump_year));

    $('.dr-switcher i', this.element).removeClass('dr-disabled');

    if (next_month.isAfter(this.latest_date))
      $('.dr-month-switcher .dr-right', this.element).addClass('dr-disabled');

    if (past_month.isBefore(this.earliest_date))
      $('.dr-month-switcher .dr-left', this.element).addClass('dr-disabled');

    if (next_year.isAfter(this.latest_date))
      $('.dr-year-switcher .dr-right', this.element).addClass('dr-disabled');

    if (past_year.isBefore(this.earliest_date))
      $('.dr-year-switcher .dr-left', this.element).addClass('dr-disabled');

    $('.dr-day', this.element).on({
      mouseenter: function() {
        var selected = $(this);
        var start_date = moment(self.start_date);
        var end_date = moment(self.end_date);
        var current_date = moment(self.current_date);

        if ($(self.selected).hasClass("dr-date-start")) {
          selected.addClass('dr-hover dr-hover-before');
          $('.dr-start', self.element).css({'border': 'none', 'padding-left': '0.3125rem'});
          setMaybeRange('start');
        }

        if ($(self.selected).hasClass("dr-date-end")) {
          selected.addClass('dr-hover dr-hover-after');
          $('.dr-end', self.element).css({'border': 'none', 'padding-right': '0.3125rem'});
          setMaybeRange('end');
        }

        if (!self.start_date && !self.end_date)
          selected.addClass('dr-maybe');

        $('.dr-selected', self.element).css('background-color', 'transparent');

        function setMaybeRange(type) {
          other = undefined;

          self.range(6 * 7).forEach(function(i) {
            var next = selected.next().data('date');
            var prev = selected.prev().data('date');
            var curr = selected.data('date');

            if (!curr)
              return false;

            if (!prev)
              prev = curr;

            if (!next)
              next = curr;

            if (type == 'start') {
              if (moment(next).isSame(self.end_date) || (self.sameDayRange && moment(curr).isSame(self.end_date)))
                return false;

              if (moment(curr).isAfter(self.end_date)) {
                other = other || moment(curr).add(6, 'day').startOf('day');

                if (i > 5 || (next ? moment(next).isAfter(self.latest_date) : false)) {
                  $(selected).addClass('dr-end');
                  other = moment(curr);
                  return false;
                }
              }

              selected = selected.next().addClass('dr-maybe');
            } else if (type == 'end') {
              if (moment(prev).isSame(self.start_date) || (self.sameDayRange && moment(curr).isSame(self.start_date)))
                return false;

              if (moment(curr).isBefore(self.start_date)) {
                other = other || moment(curr).subtract(6, 'day');

                if (i > 5 || (prev ? moment(prev).isBefore(self.earliest_date) : false)) {
                  $(selected).addClass('dr-start');
                  other = moment(curr);
                  return false;
                }
              }

              selected = selected.prev().addClass('dr-maybe');
            }
          });
        }
      },
      mouseleave: function() {
        if ($(this).hasClass('dr-hover-before dr-end'))
          $(this).removeClass('dr-end');

        if ($(this).hasClass('dr-hover-after dr-start'))
          $(this).removeClass('dr-start');

        $(this).removeClass('dr-hover dr-hover-before dr-hover-after');
        $('.dr-start, .dr-end', self.element).css({'border': '', 'padding': ''});
        $('.dr-maybe:not(.dr-current)', self.element).removeClass('dr-start dr-end');
        $('.dr-day', self.element).removeClass('dr-maybe');
        $('.dr-selected', self.element).css('background-color', '');
      }
    });

    if (/iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream) {
      $('.dr-day', this.element).on({
        touchstart: function() {
          self.selectOneDate(other, self, $(this).data('date'));
        }
      });

      $('div[contenteditable]', this.element).removeAttr('contenteditable');
    } else {
      $('.dr-day', this.element).on({
        mousedown: function () {
          self.selectOneDate(other, self, $(this).data('date'));
        }
      });
    }

    $('.dr-calendar', this.element)
      .css('width', cal_width)
      .slideDown(200);
    $('.dr-input', this.element).addClass('dr-active');
    $(selected).addClass('dr-active').focus();
    this.element.addClass('dr-active');

    this.calIsOpen = true;
  }


  Calendar.prototype.calendarClose = function(type) {
    var self = this;

    if (!this.calIsOpen || this.presetIsOpen || type == 'force') {
      $('.dr-calendar', this.element).slideUp(200, function() {
        $('.dr-day', self.element).remove();
      });
    } else {
      $('.dr-day', this.element).remove();
    }

    if (type == 'switcher') {
      return false;
    }

    $('.dr-input, .dr-date', this.element).removeClass('dr-active');
    this.element.removeClass('dr-active');

    this.calIsOpen = false;
  }


  Calendar.prototype.calendarCreate = function(switcher) {
    var self = this;
    var array = this.calendarArray(this.start_date, this.end_date, this.current_date, switcher);

    array.forEach(function(d, i) {
      var classString = "dr-day";

      if (d.fade)
        classString += " dr-fade";

      if (d.start)
        classString += " dr-start";

      if (d.end)
        classString += " dr-end";

      if (d.current)
        classString += " dr-current";

      if (d.selected)
        classString += " dr-selected";

      if (d.outside)
        classString += " dr-outside";

      $('.dr-day-list', self.element).append('<li class="'+ classString +'" data-date="'+ d.date +'">'+ d.str +'</li>');
    });
  }


  Calendar.prototype.calendarArray = function(start, end, current, switcher) {
    var self = this;
    current = moment(current || start || end).startOf('day');

    var reference = switcher || current || start || end;

    var startRange = moment(reference).startOf('month').startOf('week');
    var endRange = moment(startRange).add(6*7 - 1, 'days').endOf('day');

    var daysInRange = [];
    var d = moment(startRange);
    while ( d.isBefore(endRange) ) {
      daysInRange.push( {
        str: +d.format('D'),
        start: start && d.isSame(start, 'day'),
        end: end && d.isSame(end, 'day'),
        current: current && d.isSame(current, 'day'),
        selected: start && end && d.isBetween(start, end),
        date: d.toISOString(),
        outside: d.isBefore(self.earliest_date) || d.isAfter(self.latest_date),
        fade: !d.isSame(reference, 'month')
      } );
      d.add(1, 'd');
    }

    return daysInRange;
  }


  Calendar.prototype.calendarHTML = function(type) {
    var ul_days_of_the_week = $('<ul class="dr-days-of-week-list"></ul>');
    var days = this.days_array.splice(moment.localeData().firstDayOfWeek()).concat(this.days_array.splice(0, moment.localeData().firstDayOfWeek()));

    $.each(days, function(i, elem) {
      ul_days_of_the_week.append('<li class="dr-day-of-week">' + elem + '</li>');
    });

    if (type == "double")
      return this.element.append('<div class="dr-input">' +
        '<div class="dr-dates">' +
          '<div class="dr-date dr-date-start" contenteditable>'+ moment(this.start_date).format(this.format.input) +'</div>' +
          '<span class="dr-dates-dash">&ndash;</span>' +
          '<div class="dr-date dr-date-end" contenteditable>'+ moment(this.end_date).format(this.format.input) +'</div>' +
        '</div>' +

        (this.presets ? '<div class="dr-presets">' +
          '<span class="dr-preset-bar"></span>' +
          '<span class="dr-preset-bar"></span>' +
          '<span class="dr-preset-bar"></span>' +
        '</div>' : '') +
      '</div>' +

      '<div class="dr-selections">' +
        '<div class="dr-calendar" style="display: none;">' +
          '<div class="dr-range-switcher">' +
            '<div class="dr-switcher dr-month-switcher">' +
              '<i class="dr-left"></i>' +
              '<span>April</span>' +
              '<i class="dr-right"></i>' +
            '</div>' +
            '<div class="dr-switcher dr-year-switcher">' +
              '<i class="dr-left"></i>' +
              '<span>2015</span>' +
              '<i class="dr-right"></i>' +
            '</div>' +
          '</div>' +
          ul_days_of_the_week[0].outerHTML +
          '<ul class="dr-day-list"></ul>' +
        '</div>' +
        (this.presets ? this.presetCreate()[0].outerHTML : '') +
      '</div>');

    return this.element.append('<div class="dr-input">' +
      '<div class="dr-dates">' +
        '<div class="dr-date" contenteditable placeholder="'+ this.placeholder +'">'+ (this.settings.current_date ? moment(this.current_date).format(this.format.input) : '') +'</div>' +
      '</div>' +
    '</div>' +

    '<div class="dr-selections">' +
      '<div class="dr-calendar" style="display: none;">' +
        '<div class="dr-range-switcher">' +
          '<div class="dr-switcher dr-month-switcher">' +
            '<i class="dr-left"></i>' +
            '<span></span>' +
            '<i class="dr-right"></i>' +
          '</div>' +
          '<div class="dr-switcher dr-year-switcher">' +
            '<i class="dr-left"></i>' +
            '<span></span>' +
            '<i class="dr-right"></i>' +
          '</div>' +
        '</div>' +
        ul_days_of_the_week[0].outerHTML +
        '<ul class="dr-day-list"></ul>' +
      '</div>' +
    '</div>');
  }


  Calendar.prototype.parseDate = function(d) {
    if (moment.defaultZone !== null && moment.hasOwnProperty('tz')) {
      return moment.tz(d, this.format.input, moment.defaultZone.name);
    } else {
      return moment(d, this.format.input);
    }
  }


  Calendar.prototype.range = function(length) {
    var range = new Array(length);

    for (var idx = 0; idx < length; idx++) {
      range[idx] = idx;
    }

    return range;
  }


  Calendar.prototype.selectOneDate = function(other, cal, date) {
    var string = moment(date).format(cal.format.input);

    if (other) {
      $('.dr-date', cal.element)
        .not(cal.selected)
        .html(other.format(cal.format.input));
    }

    $(cal.selected).html(string);
    cal.calendarOpen(cal.selected);

    if ($(cal.selected).hasClass('dr-date-start')) {
      $('.dr-date-end', cal.element).trigger('click');
    } else {
      cal.calendarSaveDates();
      cal.calendarClose('force');
    }
  }


  return Calendar;
}));
