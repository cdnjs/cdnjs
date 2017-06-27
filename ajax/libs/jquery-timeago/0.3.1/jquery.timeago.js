/*
 * Time Ago (for jQuery) version: 0.3.1 (07/20/2008)
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
 * Copyright (c) 2008, Ryan McGeary (ryanonjavascript -[at]- mcgeary [*dot*] org)
 */
(function($) {
  $.timeago = function(timestamp) {
    if (timestamp instanceof Date) return inWords(timestamp);
    else if (typeof timestamp == "string") return inWords($.timeago.parse(timestamp));
    else return inWords($.timeago.parse(timestamp.title));
  };

  $.extend($.timeago, {
    settings: {
      refreshMillis: 60000
    },
    inWords: function(distanceMillis) {
      var seconds = distanceMillis / 1000;
      var minutes = seconds / 60;
      var hours = minutes / 60;
      var days = hours / 24;
      var years = days / 365;

      var words = seconds < 45 && "less than a minute" ||
        seconds < 90 && "about a minute" ||
        minutes < 45 && Math.round(minutes) + " minutes" ||
        minutes < 90 && "about an hour" ||
        hours < 24 && "about " + Math.round(hours) + " hours" ||
        hours < 48 && "a day" ||
        days < 30 && Math.floor(days) + " days" ||
        days < 60 && "about a month" ||
        days < 365 && Math.floor(days / 30) + " months" ||
        years < 2 && "about a year" ||
        Math.floor(years) + " years";

      return words + " ago";
    },
    parse: function(iso8601) {
      var s = iso8601.replace(/^\s+/, '').replace(/\s+$/, '');
      s = s.replace(/-/,"/").replace(/-/,"/");
      s = s.replace(/T/," ").replace(/Z/," UTC");
      s = s.replace(/([\+-]\d\d)\:?(\d\d)/," $1$2"); // -04:00 -> -0400
      return new Date(s);
    }
  });

  $.fn.timeago = function() {
    var self = this;
    self.each(refresh);

    var $s = $.timeago.settings;
    if ($s.refreshMillis > 0) {
      setInterval(function() { self.each(refresh); }, $s.refreshMillis);
    }
    return self;
  };

  function refresh() {
    var date = $.timeago.parse(this.title);
    if (!isNaN(date)) {
      $(this).text(inWords(date));
    }
    return this;
  }

  function inWords(date) {
    return $.timeago.inWords(distance(date));
  }

  function distance(date) {
    return (new Date().getTime() - date.getTime());
  }
})(jQuery);

