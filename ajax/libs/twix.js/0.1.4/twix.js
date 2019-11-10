(function() {
  var Twix, datePart, extend, moment;

  if (typeof module !== "undefined") {
    moment = require('moment');
  } else {
    moment = window.moment;
  }

  if (typeof moment === "undefined") throw "Can't find moment";

  Twix = (function() {

    function Twix(start, end, allDay) {
      this.start = moment(start);
      this.end = moment(end);
      this.allDay = allDay;
    }

    Twix.prototype.sameDay = function() {
      return this.start.year() === this.end.year() && this.start.month() === this.end.month() && this.start.date() === this.end.date();
    };

    Twix.prototype.sameYear = function() {
      return this.start.year() === this.end.year();
    };

    Twix.prototype.countDays = function() {
      var endDate, startDate;
      startDate = datePart(this.start);
      endDate = datePart(this.end);
      return endDate.diff(startDate, 'days') + 1;
    };

    Twix.prototype.daysIn = function(each) {
      var endDate, iter;
      iter = datePart(this.start);
      endDate = datePart(this.end);
      return {
        next: function() {
          var val;
          if (iter > endDate) {
            return null;
          } else {
            val = iter.clone();
            iter.add('days', 1);
            return val;
          }
        },
        hasNext: function() {
          return iter <= endDate;
        }
      };
    };

    Twix.prototype.duration = function() {
      if (this.allDay) {
        if (this.sameDay()) {
          return "all day";
        } else {
          return this.start.from(this.end.clone().add('days', 1), true);
        }
      } else {
        return this.start.from(this.end, true);
      }
    };

    Twix.prototype.format = function(inopts) {
      var common_bucket, end_bucket, fold, format, fs, global_first, needDate, options, process, start_bucket, together, _i, _len,
        _this = this;
      options = {
        groupMeridiems: true,
        spaceBeforeMeridiem: true,
        showDate: true,
        showDayOfWeek: false,
        twentyFourHour: false,
        implicitMinutes: true,
        yearFormat: "YYYY",
        monthFormat: "MMM",
        weekdayFormat: "ddd",
        dayFormat: "D",
        meridiemFormat: "A",
        hourFormat: "h",
        minuteFormat: "mm",
        allDay: "all day"
      };
      extend(options, inopts || {});
      fs = [];
      if (options.twentyFourHour) {
        options.hourFormat = options.hourFormat.replace("h", "H");
      }
      needDate = options.showDate || !this.sameDay();
      if (this.allDay && this.sameDay() && !options.showDate) {
        fs.push({
          name: "all day simple",
          fn: function() {
            return options.allDay;
          },
          slot: 0,
          pre: " "
        });
      }
      if (needDate && (this.start.year() !== moment().year() || !this.sameYear())) {
        fs.push({
          name: "year",
          fn: function(date) {
            return date.format(options.yearFormat);
          },
          pre: ", ",
          slot: 4
        });
      }
      if (!this.allDay && needDate) {
        fs.push({
          name: "all day month",
          fn: function(date) {
            return date.format("" + options.monthFormat + " " + options.dayFormat);
          },
          slot: 2,
          pre: " "
        });
      }
      if (this.allDay && needDate) {
        fs.push({
          name: "month",
          fn: function(date) {
            return date.format("MMM");
          },
          slot: 2,
          pre: " "
        });
      }
      if (this.allDay && needDate) {
        fs.push({
          name: "date",
          fn: function(date) {
            return date.format(options.dayFormat);
          },
          slot: 3,
          pre: " "
        });
      }
      if (needDate && options.showDayOfWeek) {
        fs.push({
          name: "day of week",
          fn: function(date) {
            return date.format(options.weekdayFormat);
          },
          pre: " ",
          slot: 1
        });
      }
      if (options.groupMeridiems && !options.twentyFourHour && !this.allDay) {
        fs.push({
          name: "meridiem",
          fn: function(t) {
            return t.format(options.meridiemFormat);
          },
          slot: 6,
          pre: options.spaceBeforeMeridiem ? " " : ""
        });
      }
      if (!this.allDay) {
        fs.push({
          name: "time",
          fn: function(date) {
            var str;
            str = date.minutes() === 0 && options.implicitMinutes && !options.twentyFourHour ? date.format(options.hourFormat) : date.format("" + options.hourFormat + ":" + options.minuteFormat);
            if (!options.groupMeridiems && !options.twentyFourHour) {
              if (options.spaceBeforeMeridiem) str += " ";
              str += date.format(options.meridiemFormat);
            }
            return str;
          },
          pre: ", ",
          slot: 5
        });
      }
      start_bucket = [];
      end_bucket = [];
      common_bucket = [];
      together = true;
      process = function(format) {
        var end_str, start_group, start_str;
        start_str = format.fn(_this.start);
        end_str = format.fn(_this.end);
        start_group = {
          format: format,
          value: function() {
            return start_str;
          }
        };
        if (end_str === start_str && together) {
          return common_bucket.push(start_group);
        } else {
          if (together) {
            together = false;
            common_bucket.push({
              format: {
                slot: format.slot,
                pre: ""
              },
              value: function() {
                return "" + (fold(start_bucket)) + " -" + (fold(end_bucket, true));
              }
            });
          }
          start_bucket.push(start_group);
          return end_bucket.push({
            format: format,
            value: function() {
              return end_str;
            }
          });
        }
      };
      for (_i = 0, _len = fs.length; _i < _len; _i++) {
        format = fs[_i];
        if (format.skip !== true) process(format);
      }
      global_first = true;
      fold = function(array, skip_pre) {
        var local_first, section, str, _j, _len2, _ref;
        local_first = true;
        str = "";
        _ref = array.sort(function(a, b) {
          return a.format.slot - b.format.slot;
        });
        for (_j = 0, _len2 = _ref.length; _j < _len2; _j++) {
          section = _ref[_j];
          if (!global_first) {
            if (local_first && skip_pre) {
              str += " ";
            } else {
              str += section.format.pre;
            }
          }
          str += section.value();
          global_first = false;
          local_first = false;
        }
        return str;
      };
      return fold(common_bucket);
    };

    return Twix;

  })();

  extend = function(first, second) {
    var attr, _results;
    _results = [];
    for (attr in second) {
      if (typeof second[attr] !== "undefined") {
        _results.push(first[attr] = second[attr]);
      } else {
        _results.push(void 0);
      }
    }
    return _results;
  };

  datePart = function(moment) {
    return moment.clone().hours(0).minutes(0).seconds(0).milliseconds(0);
  };

  if (typeof module !== "undefined") {
    module.exports = Twix;
  } else {
    window.Twix = Twix;
  }

}).call(this);
