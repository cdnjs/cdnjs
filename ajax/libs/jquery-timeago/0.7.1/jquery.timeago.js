/*
 * timeago: a jQuery plugin, version: 0.7.1 (2009-02-18)
 * @requires jQuery v1.2 or later
 *
 * Timeago is a jQuery plugin that makes it easy to support automatically
 * updating fuzzy timestamps (e.g. "4 minutes ago" or "about 1 day ago").
 *
 * For usage and examples, visit:
 * http://timeago.yarp.com/
 *
 * Licensed under the MIT:
 * http://www.opensource.org/licenses/mit-license.php
 *
 * Copyright (c) 2008-2009, Ryan McGeary (ryanonjavascript -[at]- mcgeary [*dot*] org)
 */
(function($) {
  $.timeago = function(timestamp) {
    if (timestamp instanceof Date) return inWords(timestamp);
    else if (typeof timestamp == "string") return inWords($.timeago.parse(timestamp));
    else return inWords($.timeago.parse($(timestamp).attr("title")));
  };
  var $t = $.timeago;

  $.extend($.timeago, {
    settings: {
      refreshMillis: 60000,
      allowFuture: false,
      strings: {
        prefixAgo: null,
        prefixFromNow: null,
        suffixAgo: "ago",
        suffixFromNow: "from now",
        ago: null, // DEPRECATED, use suffixAgo
        fromNow: null, // DEPRECATED, use suffixFromNow
        seconds: "less than a minute",
        minute: "about a minute",
        minutes: "%d minutes",
        hour: "about an hour",
        hours: "about %d hours",
        day: "a day",
        days: "%d days",
        month: "about a month",
        months: "%d months",
        year: "about a year",
        years: "%d years"
      }
    },
    inWords: function(distanceMillis) {
      var $l = this.settings.strings;
      var prefix = $l.prefixAgo;
      var suffix = $l.suffixAgo || $l.ago;
      if (this.settings.allowFuture) {
        if (distanceMillis < 0) {
          prefix = $l.prefixFromNow;
          suffix = $l.suffixFromNow || $l.fromNow;
        }
        distanceMillis = Math.abs(distanceMillis);
      }

      var seconds = distanceMillis / 1000;
      var minutes = seconds / 60;
      var hours = minutes / 60;
      var days = hours / 24;
      var years = days / 365;

      var words = seconds < 45 && substitute($l.seconds, Math.round(seconds)) ||
        seconds < 90 && substitute($l.minute, 1) ||
        minutes < 45 && substitute($l.minutes, Math.round(minutes)) ||
        minutes < 90 && substitute($l.hour, 1) ||
        hours < 24 && substitute($l.hours, Math.round(hours)) ||
        hours < 48 && substitute($l.day, 1) ||
        days < 30 && substitute($l.days, Math.floor(days)) ||
        days < 60 && substitute($l.month, 1) ||
        days < 365 && substitute($l.months, Math.floor(days / 30)) ||
        years < 2 && substitute($l.year, 1) ||
        substitute($l.years, Math.floor(years));

      return $.trim([prefix, words, suffix].join(" "));
    },
    parse: function(iso8601) {
      var s = $.trim(iso8601);
      s = s.replace(/-/,"/").replace(/-/,"/");
      s = s.replace(/T/," ").replace(/Z/," UTC");
      s = s.replace(/([\+-]\d\d)\:?(\d\d)/," $1$2"); // -04:00 -> -0400
      return new Date(s);
    }
  });

  $.fn.timeago = function() {
    var self = this;
    self.each(refresh);

    var $s = $t.settings;
    if ($s.refreshMillis > 0) {
      setInterval(function() { self.each(refresh); }, $s.refreshMillis);
    }
    return self;
  };

  function refresh() {
    var date = $t.parse(this.title);
    if (!isNaN(date)) {
      $(this).text(inWords(date));
    }
    return this;
  }

  function inWords(date) {
    return $t.inWords(distance(date));
  }

  function distance(date) {
    return (new Date().getTime() - date.getTime());
  }

  function substitute(stringOrFunction, value) {
    var string = $.isFunction(stringOrFunction) ? stringOrFunction(value) : stringOrFunction;
    return string.replace(/%d/i, value);
  }

  // fix for IE6 suckage
  if ($.browser.msie && $.browser.version < 7.0) {
    document.createElement('abbr');
  }
})(jQuery);
